const readChunk = async (file, offset, size) => {
    const actualSize = Math.min(size, file.size - offset);
    const slice = file.slice(offset, offset + actualSize);
    return await slice.arrayBuffer();
};




const getFrameSize = (header) => {
    // Updated bitrate tables for different MPEG versions and layers
    const bitrates = {
        // MPEG-1, Layer I
        'v1l1': [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448],
        // MPEG-1, Layer II
        'v1l2': [0, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384],
        // MPEG-1, Layer III (MP3)
        'v1l3': [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320],
        // MPEG-2/2.5, Layer I
        'v2l1': [0, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256],
        // MPEG-2/2.5, Layer II & III
        'v2l23': [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160]
    };

    const sampleRates = {
        // MPEG-1
        'v1': [44100, 48000, 32000],
        // MPEG-2
        'v2': [22050, 24000, 16000],
        // MPEG-2.5
        'v25': [11025, 12000, 8000]
    };

    const version = (header >> 19) & 0x3;
    const layer = (header >> 17) & 0x3;
    const bitrateIndex = (header >> 12) & 0xF;
    const sampleRateIndex = (header >> 10) & 0x3;
    const padding = (header >> 9) & 0x1;

    // Determine version key
    let versionKey;
    if (version === 3) versionKey = 'v1';      // MPEG-1
    else if (version === 2) versionKey = 'v2'; // MPEG-2
    else if (version === 0) versionKey = 'v25'; // MPEG-2.5
    else return 0;

    // Determine bitrate table key
    let bitrateKey;
    if (versionKey === 'v1') {
        if (layer === 3) bitrateKey = 'v1l1';      // Layer I
        else if (layer === 2) bitrateKey = 'v1l2'; // Layer II
        else if (layer === 1) bitrateKey = 'v1l3'; // Layer III
        else return 0;
    } else {
        if (layer === 3) bitrateKey = 'v2l1';      // Layer I
        else if (layer === 2 || layer === 1) bitrateKey = 'v2l23'; // Layer II/III
        else return 0;
    }

    const bitrate = bitrates[bitrateKey][bitrateIndex] * 1000;
    const sampleRate = sampleRates[versionKey][sampleRateIndex];

    if (!bitrate || !sampleRate) return 0;

    // Calculate frame size
    if (layer === 3) { // Layer I
        return Math.floor((12 * bitrate) / sampleRate + padding) * 4;
    } else { // Layer II & III
        const samplesPerFrame = (versionKey === 'v1' && layer === 1) ? 1152 : 576;
        return Math.floor((samplesPerFrame * bitrate) / (8 * sampleRate)) + padding;
    }
}

const getAACFrameSize = (arrayBuffer, offset) => {
    const view = new DataView(arrayBuffer);
    
    // Need at least 7 bytes for ADTS header
    if (offset + 6 >= arrayBuffer.byteLength) return 0;
    
    // AAC ADTS frame length is stored in bits 30-42 (13 bits total)
    // This spans bytes 3-5 in the ADTS header
    
    const byte4 = view.getUint8(offset + 3);  // Contains bits 30-31 of frame length
    const byte5 = view.getUint8(offset + 4);  // Contains bits 22-29 of frame length  
    const byte6 = view.getUint8(offset + 5);  // Contains bits 21-17 of frame length
    
    // Extract 13-bit frame length
    // Bits: [byte4 & 0x03][byte5][byte6 >> 5]
    const frameLength = ((byte4 & 0x03) << 11) | (byte5 << 3) | (byte6 >> 5);
    
    return frameLength;
};





const isValidMP3Header = (header) => {
    if (((header & 0xFFE00000) >>> 0) !== 0xFFE00000) return false;
    const version = (header >> 19) & 0x3;
    if (version === 1) return false;
    const layer = (header >> 17) & 0x3;
    if (layer === 0) return false;
    const bitrateIndex = (header >> 12) & 0xF;
    if (bitrateIndex === 0 || bitrateIndex === 15) return false;
    const sampleRateIndex = (header >> 10) & 0x3;
    if (sampleRateIndex === 3) return false;
    return true;
};

const isValidAACHeader = (header) => {
    // AAC uses 12-bit sync pattern: 0xFFF
    if (((header & 0xFFF00000) >>> 0) !== 0xFFF00000) return false;
    
    // Extract fields for AAC ADTS header
    const id = (header >> 19) & 0x1;          // MPEG identifier: 0=MPEG-4, 1=MPEG-2
    const layer = (header >> 17) & 0x3;       // Should be 00
    const protectionAbsent = (header >> 16) & 0x1;
    const profile = (header >> 14) & 0x3;     // AAC profile
    const sampleRateIndex = (header >> 10) & 0xF;
    const channelConfig = (header >> 6) & 0x7;
    
    // Validation checks
    if (layer !== 0) return false;            // Layer should be 0 for AAC
    if (profile === 3) return false;          // Profile 3 is reserved
    if (sampleRateIndex === 15) return false; // Sample rate index 15 is reserved
    if (channelConfig === 0) return false;    // Channel config 0 is reserved
    
    return true;
};

const findFramesInChunk = (arrayBuffer) => {
    const frames = [];
    const view = new DataView(arrayBuffer);

    let i = 0;
    for (; i < arrayBuffer.byteLength - 4; i++) {
        const header = (
            (view.getUint8(i) << 24) |
            (view.getUint8(i + 1) << 16) |
            (view.getUint8(i + 2) << 8) |
            view.getUint8(i + 3)
        );
        if (isValidMP3Header(header) || isValidAACHeader(header)) {
            const frameSize = isValidAACHeader(header) ? getAACFrameSize(arrayBuffer, i) : getFrameSize(header);
            if (frameSize > 0 && frameSize < arrayBuffer.byteLength - i) {
                frames.push({
                    offset: i,
                    header: header,
                    size: frameSize
                });
                i += Math.max(frameSize - 1, 0);
            }else{
                // console.log('findFramesInChunk', 'invalid frameSize', frameSize)
            }
        }
    }

    return frames;
};



const getFrameBitrate = (header) => {
    const bitrates = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320];
    const bitrateIndex = (header >> 12) & 0xF;
    return bitrates[bitrateIndex];
};

const getAACFrameBitrate = (view, offset = 0) => {
    // Read first 7 bytes (ADTS header min size)
    const b0 = view.getUint8(offset);
    const b1 = view.getUint8(offset + 1);
    const b2 = view.getUint8(offset + 2);
    const b3 = view.getUint8(offset + 3);
    const b4 = view.getUint8(offset + 4);
    const b5 = view.getUint8(offset + 5);
    const b6 = view.getUint8(offset + 6);

    // Sampling frequency index (4 bits)
    const sampleRateIndex = (b2 >> 2) & 0x0F;
    const sampleRates = [
        96000, 88200, 64000, 48000, 44100, 32000,
        24000, 22050, 16000, 12000, 11025, 8000, 7350
    ];
    const sampleRate = sampleRates[sampleRateIndex] || null;

    // Frame length (13 bits)
    const frameLength = ((b3 & 0x03) << 11) | (b4 << 3) | (b5 >> 5);

    // AAC-LC → usually 1024 samples per frame
    const samplesPerFrame = 1024;

    if (!sampleRate || frameLength <= 0) return null;

    const bitrate = Math.floor((frameLength * 8 * sampleRate) / samplesPerFrame);
    return bitrate; // in bits per second
};



const parseFrameHeader = (header) => {
    const version = (header >> 19) & 0x3;
    const layer = (header >> 17) & 0x3;
    const bitrateIndex = (header >> 12) & 0xF;
    const sampleRateIndex = (header >> 10) & 0x3;
    const channelMode = (header >> 6) & 0x3;

    const bitrates = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320];
    const sampleRates = [44100, 48000, 32000];
    const channelModes = ['Stereo', 'Joint Stereo', 'Dual Channel', 'Mono'];

    return {
        version,
        layer,
        bitrate: bitrates[bitrateIndex],
        sampleRate: sampleRates[sampleRateIndex],
        channelMode: channelModes[channelMode]
    };
};

const parseAACHeader = (view, offset = 0) => {
    const header = view.getUint32(offset, false) >>> 0;

    const syncword = (header >> 20) & 0xFFF;
    if (syncword !== 0xFFF) return null; // not an AAC header

    const id = (header >> 19) & 0x1;
    const layer = (header >> 17) & 0x3; // always 0
    const protectionAbsent = (header >> 16) & 0x1;
    const profile = (header >> 14) & 0x3;
    const sampleRateIndex = (header >> 10) & 0xF;
    const channelConfig = (header >> 6) & 0x7;

    const sampleRates = [
        96000, 88200, 64000, 48000, 44100, 32000,
        24000, 22050, 16000, 12000, 11025, 8000, 7350
    ];
    const profiles = ['Main', 'LC', 'SSR', 'Reserved'];
    const channelModes = [
        'Defined in PCE', 'Mono', 'Stereo', '3 channels',
        '4 channels', '5 channels', '5.1', '7.1'
    ];

    return {
        version: id,
        layer, // AAC always 0
        bitrate: null, // not in header (can be estimated separately)
        sampleRate: sampleRates[sampleRateIndex],
        channelMode: channelModes[channelConfig] || `Unknown (${channelConfig})`
    };
};




const getSideInfoSize = (header) => {
    const version = (header >> 19) & 0x3;
    const mode = (header >> 6) & 0x3;
    
    if (version === 3) { // MPEG 1
        return mode === 3 ? 17 : 32;
    } else { // MPEG 2/2.5
        return mode === 3 ? 9 : 17;
    }
};

const parseXingHeader = (arrayBuffer, offset) => {
    const view = new DataView(arrayBuffer);
    const flags = view.getUint32(offset + 4, false);
    let pos = offset + 8;
    
    const vbrInfo = { type: 'Xing' };
    
    if (flags & 0x01) {
        vbrInfo.frames = view.getUint32(pos, false);
        pos += 4;
    }
    
    if (flags & 0x02) {
        vbrInfo.bytes = view.getUint32(pos, false);
        pos += 4;
    }
    
    return vbrInfo;
};

const findVBRHeader = (arrayBuffer) => {
    const view = new DataView(arrayBuffer);
    for (let i = 0; i < arrayBuffer.byteLength - 8; i++) {
        const header = view.getUint32(i, false);
        
        if (((header & 0xFFE00000) >>> 0) === 0xFFE00000) {
            const frameStart = i;
            let vbrOffset = frameStart + 4 + getSideInfoSize(header);
            
            if (vbrOffset + 4 < arrayBuffer.byteLength) {
                const tag = new TextDecoder().decode(
                    new Uint8Array(arrayBuffer, vbrOffset, 4)
                );
                
                if (tag === 'Xing' || tag === 'Info') {
                    return parseXingHeader(arrayBuffer, vbrOffset);
                }
            }
        }
    }
    return null;
};

const findAACVBRHeader = (arrayBuffer) => {
    const view = new DataView(arrayBuffer);
    let offset = 0;
    let frames = 0;
    let bytes = 0;
    let firstFrameLength = null;
    let isVBR = false;

    while (offset + 7 < arrayBuffer.byteLength) {
        // Check syncword (12 bits of 1s)
        const b0 = view.getUint8(offset);
        const b1 = view.getUint8(offset + 1);
        if (b0 !== 0xFF || (b1 & 0xF0) !== 0xF0) {
            offset++; // not a frame, move forward
            continue;
        }

        // Extract frame length (13 bits)
        const b3 = view.getUint8(offset + 3);
        const b4 = view.getUint8(offset + 4);
        const b5 = view.getUint8(offset + 5);
        const frameLength = ((b3 & 0x03) << 11) | (b4 << 3) | (b5 >> 5);

        if (frameLength < 7) {
            offset++;
            continue; // invalid frame, skip
        }

        // Track frame length consistency
        if (firstFrameLength === null) {
            firstFrameLength = frameLength;
        } else if (frameLength !== firstFrameLength) {
            isVBR = true;
        }

        frames++;
        bytes += frameLength;
        offset += frameLength;
    }

    if (frames === 0) return null;

    return {
        type: isVBR ? 'AAC-VBR' : 'AAC-CBR',
        frames,
        bytes
    };
};






const buildVBRSeekTable = async (file, intervalSeconds, file_type) => {
    const timeToByteMap = [];
    let currentTime = 0;
    let nextTargetTime = 0;
    
    const SCAN_CHUNK_SIZE = 64 * 1024;
    let fileOffset = 0;
    const totalSize = file.size;

    while (fileOffset < totalSize && currentTime < nextTargetTime + intervalSeconds * 10) {
        const chunk = await readChunk(file, fileOffset, SCAN_CHUNK_SIZE);
        const frames = findFramesInChunk(chunk);
        
        for (const frame of frames) {
            const absoluteBytePos = fileOffset + frame.offset;

            if (currentTime >= nextTargetTime) {
                timeToByteMap.push([nextTargetTime, absoluteBytePos]);
                nextTargetTime += intervalSeconds;
            }
            currentTime += (file_type == 'aac' ? getAACFrameDuration(chunk, frame.offset) : getFrameDuration(frame.header));
            if (timeToByteMap.length >= 50) break; // Reasonable limit
        }

        fileOffset += SCAN_CHUNK_SIZE;
    }

    return timeToByteMap;
};

const getFrameDuration = (header) => {
    const sampleRates = [44100, 48000, 32000];
    const sampleRateIndex = (header >> 10) & 0x3;
    const sampleRate = sampleRates[sampleRateIndex];
    return 1152 / sampleRate;
};

const getAACFrameDuration = (arrayBuffer, offset = 0) => {
    const view = new DataView(arrayBuffer);
    const b2 = view.getUint8(offset + 2);
    const sampleRateIndex = (b2 >> 2) & 0x0F;
    const sampleRates = [
        96000, 88200, 64000, 48000, 44100, 32000,
        24000, 22050, 16000, 12000, 11025, 8000, 7350
    ];
    const sampleRate = sampleRates[sampleRateIndex];
    const samplesPerFrame = 1024; // AAC-LC default
    return sampleRate ? samplesPerFrame / sampleRate : null;
};

const buildCBRSeekTable = async (file, fileInfo, intervalSeconds) => {
    const timeToByteMap = [];
    
    // Calculate basic parameters
    const bytesPerSecond = (fileInfo.bitrate * 1000) / 8; // Convert kbps to bytes/sec
    const duration = (file.size * 8) / (fileInfo.bitrate * 1000); // Total duration in seconds

    // Find first frame to get accurate starting position
    const headerChunk = await readChunk(file, 0, 4096);
    const frames = findFramesInChunk(headerChunk);
    const audioStart = frames.length > 0 ? frames[0].offset : 0;

    // Generate seek points mathematically
    for (let time = 0; time <= duration; time += intervalSeconds) {
        const bytePosition = audioStart + Math.floor(time * bytesPerSecond);
        
        // Ensure we don't exceed file size
        if (bytePosition < file.size) {
            timeToByteMap.push([time, bytePosition]);
        }
    }

    return timeToByteMap;
};





// Function to parse ID3 header and find where audio data starts
const parseID3Header = (arrayBuffer) => {
    const view = new DataView(arrayBuffer);
    
    // Check for ID3v2 header
    if (arrayBuffer.byteLength < 10) {
        return null;
    }
    
    const id3Identifier = String.fromCharCode(view.getUint8(0), view.getUint8(1), view.getUint8(2));
    if (id3Identifier !== 'ID3') {
        return null;
    }
    
    // Get ID3 version
    const majorVersion = view.getUint8(3);
    const minorVersion = view.getUint8(4);
    const flags = view.getUint8(5);
    
    // Parse the size (synchsafe integer - 7 bits per byte)
    const sizeByte1 = view.getUint8(6) & 0x7F;
    const sizeByte2 = view.getUint8(7) & 0x7F;
    const sizeByte3 = view.getUint8(8) & 0x7F;
    const sizeByte4 = view.getUint8(9) & 0x7F;
    
    const id3Size = (sizeByte1 << 21) | (sizeByte2 << 14) | (sizeByte3 << 7) | sizeByte4;
    
    // The total ID3 tag size is 10 bytes (header) + the size value
    const totalID3Size = 10 + id3Size;
    
    console.log('=== ID3 HEADER ANALYSIS ===');
    console.log('ID3 Version:', `2.${majorVersion}.${minorVersion}`);
    console.log('Flags:', flags.toString(2).padStart(8, '0'));
    console.log('ID3 tag size (excluding header):', id3Size, 'bytes');
    console.log('Total ID3 section size:', totalID3Size, 'bytes');
    console.log('Audio should start at offset:', totalID3Size);
    
    return {
        version: `2.${majorVersion}.${minorVersion}`,
        flags,
        tagSize: id3Size,
        totalSize: totalID3Size,
        audioStartOffset: totalID3Size
    };
};

const analyzeMP3File = async (file) => {
    const SAMPLE_SIZE = 256 * 1024; // Sample first 128KB
    var chunk = await readChunk(file, 0, SAMPLE_SIZE);

    // Parse ID3 to find audio start
    const id3Info = parseID3Header(chunk);
    const audioStartOffset = id3Info ? id3Info.audioStartOffset : 0;
    console.log(`Audio data starts at offset: ${audioStartOffset}`);
    var file_type = ''
    
    // Check what format it actually is
    const view = new DataView(chunk);
    if (audioStartOffset < chunk.byteLength - 4) {
        const header = view.getUint32(audioStartOffset, false);
        console.log(`Header at audio start: 0x${header.toString(16).toUpperCase().padStart(8, '0')}`);
        
        // Check for different formats
        if (((header & 0xFFF00000) >>> 0) === 0xFFF00000) {
            console.log('🎵 Detected: AAC format (not MP3!)');
            file_type = 'aac'
        }else if (((header & 0xFFE00000) >>> 0) === 0xFFE00000) {
            console.log('🎵 Detected: MP3 format');
            file_type = 'mp3'
        } else {
            console.log('❓ Unknown audio format');
            console.log('First few bytes:', Array.from(new Uint8Array(chunk, audioStartOffset, 16))
                .map(b => b.toString(16).padStart(2, '0')).join(' '));
            return null;
        }
    }
    
    // Look for VBR header first
    const vbrHeader = file_type == 'aac' ? findAACVBRHeader(chunk) : findVBRHeader(chunk);
    if (vbrHeader && vbrHeader.type != 'AAC-CBR') {
        return {
            file_type,
            isCBR: false,
            hasVBRHeader: true,
            vbrInfo: vbrHeader,
            totalFrames: vbrHeader.frames,
            totalBytes: vbrHeader.bytes || file.size
        };
    }

    // Sample multiple frames to check bitrate consistency
    const frames = findFramesInChunk(chunk);
    console.log('frames', frames)
    if (frames.length < 3) {
        console.log('stackpage','Could not find enough MP3 frames to analyze');
        return;
    }

    const bitrates = frames.slice(0, 10).map(frame => (file_type == 'aac' ? getAACFrameBitrate(frame.header): getFrameBitrate(frame.header)));
    const uniqueBitrates = [...new Set(bitrates)];
    
    const firstFrame = frames[0];
    const frameInfo = file_type == 'aac' ? parseAACHeader(firstFrame.header) : parseFrameHeader(firstFrame.header);

    return {
        file_type,
        isCBR: uniqueBitrates.length === 1,
        hasVBRHeader: false,
        bitrate: bitrates[0],
        sampleRate: frameInfo.sampleRate,
        channelMode: frameInfo.channelMode,
        samplesPerFrame: 1152, // Standard for MP3
        frameSize: file_type == 'aac' ? getAACFrameSize(firstFrame.header) : getFrameSize(firstFrame.header),
        averageBitrate: bitrates.reduce((a, b) => a + b, 0) / bitrates.length
    };
};

const buildTimeToByteMap = async (file, intervalSeconds) => {
    try{
        const fileInfo = await analyzeMP3File(file);
        let seekTable;
        if (fileInfo.isCBR) {
            seekTable = await buildCBRSeekTable(file, fileInfo, intervalSeconds);
        } else {
            seekTable = await buildVBRSeekTable(file, intervalSeconds, fileInfo.file_type);
        }
        const seek_table = new Map(seekTable)
        return seek_table
    }
    catch(e){
        console.log('stackpage', 'something went wrong while building timeToByteMap', e)
    }
}













//-----------------------------------------VIDEO-----------------------------------------------
const buildSeekTableLinear = async (file, intervalSeconds) => {
    const timeToByteMap = [];
    const estimatedDuration = file.size / (2 * 1024 * 1024); // Assume ~2MB/s average
    for (let time = 0; time <= estimatedDuration; time += intervalSeconds) {
        const timeRatio = time / estimatedDuration;
        const bytePosition = Math.floor(timeRatio * file.size);
        timeToByteMap.push([time, bytePosition]);
    }
    return timeToByteMap;
};

// Build seek table using sample-based estimation
const buildSeekTableFromSamples = async (file, mp4Info, intervalSeconds) => {
    const timeToByteMap = [];
    const duration = mp4Info.duration;
    
    if (!duration || duration <= 0) {
        console.log('Falling back to linear estimation');
        // Fallback to linear byte estimation
        return buildSeekTableLinear(file, intervalSeconds);
    }
    
    // Calculate approximate data rate
    const dataSize = file.size - mp4Info.moovPosition; // Approximate data size

    for (let time = 0; time <= duration; time += intervalSeconds) {
        // Estimate byte position based on time ratio and average bitrate
        const timeRatio = time / duration;
        // Start from mdat position (actual video data)
        const estimatedBytePos = mp4Info.mdatPosition + Math.floor(timeRatio * dataSize);
        // Ensure we don't exceed file size
        const bytePosition = Math.min(estimatedBytePos, file.size - 1);
        
        timeToByteMap.push([time, bytePosition]);
    }

    return timeToByteMap;
};

// Build seek table using keyframe analysis (most accurate)
const buildSeekTableFromKeyFrames = async (file, mp4Info, intervalSeconds) => {
    // This would require parsing stss (sync sample) box for keyframes
    // For now, fall back to sample-based approach
    return buildSeekTableFromSamples(file, mp4Info, intervalSeconds);
};

// Updated parseFtypBox to work with the new structure
const parseFtypBox = (buffer, ftypBox) => {
    const majorBrand = new TextDecoder().decode(
        buffer.slice(ftypBox.dataOffset, ftypBox.dataOffset + 4)
    );
    const minorVersion = new DataView(buffer).getUint32(ftypBox.dataOffset + 4, false);
    return { majorBrand, minorVersion };
};

// Enhanced parseMoovBox with better logging
const parseMoovBox = (moovBuffer) => {
    console.log('Parsing moov box, buffer size:', moovBuffer.byteLength);
    
    const boxes = parseMP4Boxes(moovBuffer);
    console.log('Found boxes in moov:', boxes.map(b => b.type));
    
    const mvhdBox = boxes.find(box => box.type === 'mvhd');
    const trakBoxes = boxes.filter(box => box.type === 'trak');
    
    let duration = 0;
    let timescale = 1000;
    
    // Parse movie header
    if (mvhdBox) {
        try {
            const mvhdData = moovBuffer.slice(mvhdBox.dataOffset, mvhdBox.dataOffset + mvhdBox.size - 8);
            const mvhdView = new DataView(mvhdData);
            const version = mvhdView.getUint8(0);
            
            console.log('mvhd version:', version);
            
            if (version === 0) {
                // Skip version(1) + flags(3) + creation_time(4) + modification_time(4) = 12 bytes
                timescale = mvhdView.getUint32(12, false);
                duration = mvhdView.getUint32(16, false);
            } else {
                // Skip version(1) + flags(3) + creation_time(8) + modification_time(8) = 20 bytes
                timescale = mvhdView.getUint32(20, false);
                duration = Number(mvhdView.getBigUint64(24, false));
            }
            
            console.log('Raw duration:', duration, 'timescale:', timescale);
        } catch (error) {
            console.error('Error parsing mvhd box:', error);
        }
    } else {
        console.log('No mvhd box found');
    }

    // Parse tracks
    const tracks = [];
    trakBoxes.forEach((trakBox, index) => {
        try {
            const trakData = moovBuffer.slice(trakBox.dataOffset, trakBox.dataOffset + trakBox.size - 8);
            const track = parseTrakBox(trakData, index);
            if (track) {
                tracks.push(track);
            }
        } catch (error) {
            console.error(`Error parsing track ${index}:`, error);
        }
    });

    const finalDuration = duration / timescale;
    console.log('Final calculated duration (seconds):', finalDuration);

    return {
        duration: finalDuration,
        timescale,
        tracks,
        hasKeyFrameIndex: tracks.some(track => track.hasKeyFrames)
    };
};

// Fixed parseTrakBox with correct offset calculations
const parseTrakBox = (trakBuffer, trackIndex) => {
    const boxes = parseMP4Boxes(trakBuffer);
    const tkhdBox = boxes.find(box => box.type === 'tkhd');
    const mdiaBox = boxes.find(box => box.type === 'mdia');
    
    if (!tkhdBox || !mdiaBox) {
        console.log('Missing required boxes in track:', {tkhdBox: !!tkhdBox, mdiaBox: !!mdiaBox});
        return null;
    }

    let trackId, duration;
    
    try {
        // Parse track header
        const tkhdData = trakBuffer.slice(tkhdBox.dataOffset, tkhdBox.dataOffset + tkhdBox.size - 8);
        const tkhdView = new DataView(tkhdData);
        const version = tkhdView.getUint8(0);
        
        if (version === 0) {
            // Version 0 structure: version(1) + flags(3) + creation_time(4) + modification_time(4) + track_ID(4) + reserved(4) + duration(4)
            trackId = tkhdView.getUint32(12, false);
            duration = tkhdView.getUint32(20, false);
        } else {
            // Version 1 structure: version(1) + flags(3) + creation_time(8) + modification_time(8) + track_ID(4) + reserved(4) + duration(8)
            trackId = tkhdView.getUint32(20, false);
            duration = Number(tkhdView.getBigUint64(28, false));
        }
    } catch (error) {
        console.error('Error parsing tkhd:', error);
        return null;
    }

    let mediaType = 'unknown';
    
    try {
        // Parse media box
        const mdiaData = trakBuffer.slice(mdiaBox.dataOffset, mdiaBox.dataOffset + mdiaBox.size - 8);
        const mdiaBoxes = parseMP4Boxes(mdiaData);
        const hdlrBox = mdiaBoxes.find(box => box.type === 'hdlr');
        
        if (hdlrBox) {
            const hdlrData = mdiaData.slice(hdlrBox.dataOffset, hdlrBox.dataOffset + hdlrBox.size - 8);
            // Skip version(1) + flags(3) + pre_defined(4) = 8 bytes to get to handler_type
            if (hdlrData.byteLength >= 12) {
                mediaType = new TextDecoder().decode(hdlrData.slice(8, 12));
            }
        }
    } catch (error) {
        console.error('Error parsing mdia/hdlr:', error);
    }

    const track = {
        trackId: Number(trackId),
        trackIndex,
        mediaType,
        duration: Number(duration),
        hasKeyFrames: false
    };
    
    // console.log('Parsed track:', track);
    return track;
};

// Parse MP4 boxes from buffer
const parseMP4Boxes = (buffer) => {
    const boxes = [];
    const view = new DataView(buffer);
    let offset = 0;

    while (offset < buffer.byteLength - 8) {
        const size = view.getUint32(offset, false);
        const type = new TextDecoder().decode(buffer.slice(offset + 4, offset + 8));
        
        if (size === 0) break; // Size 0 means box extends to end of file
        if (size < 8) break; // Invalid box size
        
        boxes.push({
            type,
            size,
            offset,
            dataOffset: offset + 8
        });
        
        offset += size;
    }

    return boxes;
};

// Parse MP4 container structure using the efficient file structure analyzer
const parseMP4Structure = async (file) => {
    // First, scan the file structure efficiently
    const fileStructure = await analyzeMP4Structure(file);
    
    const ftypBox = fileStructure.boxes.find(box => box.type === 'ftyp');
    const moovBox = fileStructure.moov;
    const mdatBox = fileStructure.mdat;
    
    if (!ftypBox) {
        throw new Error('Not a valid MP4 file (missing ftyp box)');
    }
    
    if (!moovBox) {
        throw new Error('No moov box found in MP4 file');
    }

    // Read the ftyp box data for file type info
    const ftypBuffer = await readChunk(file, ftypBox.dataOffset, ftypBox.size - 8);
    const fileType = parseFtypBox(ftypBuffer, { dataOffset: 0 });

    let videoInfo = {
        fileType,
        tracks: [],
        duration: 0,
        hasKeyFrameIndex: false,
        moovPosition: moovBox.offset,
        mdatPosition: mdatBox ? mdatBox.offset : 0
    };

    // Read and parse the moov box
    const moovBuffer = await readChunk(file, moovBox.dataOffset, moovBox.size - 8);
    const moovInfo = parseMoovBox(moovBuffer);
    videoInfo = { ...videoInfo, ...moovInfo };

    console.log('Parsed MP4 structure:', {
        fileSize: file.size,
        ftypPosition: ftypBox.offset,
        moovPosition: moovBox.offset,
        mdatPosition: mdatBox?.offset || 'not found',
        duration: videoInfo.duration,
        tracks: videoInfo.tracks.length
    });

    return videoInfo;
};

// Main method to build time-to-byte mapping for MP4 videos
const buildVideoTimeToByteMap = async (file, intervalSeconds) => {
    try {
        // Parse MP4 structure to find moov box and track info
        const mp4Info = await parseMP4Structure(file);
        console.log('MP4 Info:', mp4Info);

        let seekTable;
        if (mp4Info.hasKeyFrameIndex) {
            // Use keyframe index for precise seeking
            seekTable = await buildSeekTableFromKeyFrames(file, mp4Info, intervalSeconds);
        } else {
            // Fallback to sample-based estimation
            seekTable = await buildSeekTableFromSamples(file, mp4Info, intervalSeconds);
        }

        const seek_table = new Map(seekTable);
        console.log('buildVideoTimeToByteMap', 'seek_table', seek_table)

        return seek_table;
    }
    catch (error) {
        console.log('stackpage', 'something went wrong with the buildVideoTimeToByteMap function', error)
    }
};







//-----------------------------------------VIDEO-CODEC-----------------------------------------------
// Parse HEVC (H.265) codec string
const parseHEVCCodec = (stsdData, offset) => {
    // Look for hvcC box
    let pos = offset + 78; // Skip sample entry header
    const maxPos = stsdData.byteLength - 8;
    
    while (pos < maxPos) {
        const view = new DataView(stsdData);
        const boxSize = view.getUint32(pos, false);
        const boxType = new TextDecoder().decode(stsdData.slice(pos + 4, pos + 8));
        
        if (boxType === 'hvcC' && boxSize > 23) {
            // Parse hvcC content
            const hvcCOffset = pos + 8;
            const configByte1 = view.getUint8(hvcCOffset + 1);
            const levelId = view.getUint8(hvcCOffset + 12);
            
            const profileSpace = (configByte1 >> 6) & 0x3;
            const tierFlag = (configByte1 >> 5) & 0x1;
            const profileId = configByte1 & 0x1f;
            
            return `hev1.${profileSpace}.${profileId}.${tierFlag}.L${levelId}.B0`;
        }
        
        pos += boxSize || 8;
    }
    
    return 'hev1.1.6.L93.B0'; // Default main profile
};

// Parse AVC (H.264) codec string
const parseAVCCodec = (stsdData, offset) => {
    // Look for avcC box
    let pos = offset + 78; // Skip sample entry header
    const maxPos = stsdData.byteLength - 8;
    
    while (pos < maxPos) {
        const view = new DataView(stsdData);
        const boxSize = view.getUint32(pos, false);
        const boxType = new TextDecoder().decode(stsdData.slice(pos + 4, pos + 8));
        
        if (boxType === 'avcC' && boxSize > 11) {
            // Parse avcC content
            const avcCOffset = pos + 8;
            const profile = view.getUint8(avcCOffset + 1);
            const compatibility = view.getUint8(avcCOffset + 2);
            const level = view.getUint8(avcCOffset + 3);
            
            const profileHex = profile.toString(16).padStart(2, '0');
            const compatHex = compatibility.toString(16).padStart(2, '0');
            const levelHex = level.toString(16).padStart(2, '0');
            
            return `avc1.${profileHex}${compatHex}${levelHex}`;
        }
        
        pos += boxSize || 8;
    }
    
    return 'avc1.42001e'; // Default baseline
};

const extractTrackCodec = (trakBuffer) => {
    const boxes = parseMP4Boxes(trakBuffer);
    const mdiaBox = boxes.find(box => box.type === 'mdia');
    
    if (!mdiaBox) return null;
    
    const mdiaData = trakBuffer.slice(mdiaBox.dataOffset, mdiaBox.dataOffset + mdiaBox.size - 8);
    const mdiaBoxes = parseMP4Boxes(mdiaData);
    
    // Get media type
    const hdlrBox = mdiaBoxes.find(box => box.type === 'hdlr');
    let mediaType = 'unknown';
    if (hdlrBox) {
        const hdlrData = mdiaData.slice(hdlrBox.dataOffset, hdlrBox.dataOffset + hdlrBox.size - 8);
        mediaType = new TextDecoder().decode(hdlrData.slice(8, 12));
    }
    
    // Find stsd box for codec info
    const minfBox = mdiaBoxes.find(box => box.type === 'minf');
    if (!minfBox) return null;
    
    const minfData = mdiaData.slice(minfBox.dataOffset, minfBox.dataOffset + minfBox.size - 8);
    const minfBoxes = parseMP4Boxes(minfData);
    const stblBox = minfBoxes.find(box => box.type === 'stbl');
    
    if (!stblBox) return null;
    
    const stblData = minfData.slice(stblBox.dataOffset, stblBox.dataOffset + stblBox.size - 8);
    const stblBoxes = parseMP4Boxes(stblData);
    const stsdBox = stblBoxes.find(box => box.type === 'stsd');
    
    if (!stsdBox) return null;
    
    const stsdData = stblData.slice(stsdBox.dataOffset, stsdBox.dataOffset + stsdBox.size - 8);
    const view = new DataView(stsdData);
    
    // Skip version/flags and entry count
    if (stsdData.byteLength < 16) return null;
    
    const codecType = new TextDecoder().decode(stsdData.slice(12, 16));
    
    // Generate codec string based on type
    switch (codecType) {
        case 'avc1':
        case 'avc3':
        return parseAVCCodec(stsdData, 16);
        case 'hev1':
        case 'hvc1':
        return parseHEVCCodec(stsdData, 16);
        case 'mp4a':
        return 'mp4a.40.2'; // Default AAC-LC
        case 'vp09':
        return 'vp09.00.10.08';
        default:
        return codecType;
    }
};

const analyzeMP4Structure = async (file) => {
    const structure = { boxes: [], moov: null, mdat: null };
    let offset = 0;
    
    while (offset < file.size - 8) {
        // Read just the box header (8 bytes)
        const headerBuffer = await readChunk(file, offset, 8);
        const view = new DataView(headerBuffer);
        
        const size = view.getUint32(0, false);
        const type = new TextDecoder().decode(headerBuffer.slice(4, 8));
        
        if (size < 8) break; // Invalid box
        
        const boxInfo = { type, size, offset, dataOffset: offset + 8 };
        structure.boxes.push(boxInfo);
        
        // Track important boxes
        if (type === 'moov') {
            structure.moov = boxInfo;
        } else if (type === 'mdat') {
            structure.mdat = boxInfo;
        }
        
        offset += size;
    }
    
    return structure;
};

// Simple MP4 codec extractor - returns just the codec string
const extractMP4Codec = async (file) => {
    try {
        // First, scan the file structure efficiently
        const fileStructure = await analyzeMP4Structure(file);
        
        if (!fileStructure.moov) {
            throw new Error('No moov box found');
        }
        
        // Read only the moov box
        const moovBuffer = await readChunk(file, fileStructure.moov.offset + 8, fileStructure.moov.size - 8);
        
        // Parse tracks from moov
        const moovBoxes = parseMP4Boxes(moovBuffer);
        const trakBoxes = moovBoxes.filter(box => box.type === 'trak');
        
        const codecs = [];
        
        for (const trakBox of trakBoxes) {
            const trakData = moovBuffer.slice(trakBox.dataOffset, trakBox.dataOffset + trakBox.size - 8);
            const codec = extractTrackCodec(trakData);
            if (codec) {
                codecs.push(codec);
            }
        }
        const found_codec = codecs.length > 0 ? codecs.join(', ') : null;
        console.log('media_processor', 'found codec', found_codec)
        return found_codec;        
    } catch (error) {
        console.error('Fast codec extraction failed:', error);
        return null;
    }
    // try {
    //     // Read first 1MB to find moov box
    //     const headerSize = Math.min(1024 * 1024, file.size);
    //     const headerBuffer = await readChunk(file, 0, headerSize);
        
    //     let moovBuffer = null;
        
    //     // Find moov box in header
    //     const headerBoxes = parseMP4Boxes(headerBuffer);
    //     console.log('extractMP4Codec', 'headerBoxes', headerBoxes)
    //     const moovBox = headerBoxes.find(box => box.type === 'moov');
        
    //     if (moovBox) {
    //         moovBuffer = headerBuffer.slice(moovBox.offset, moovBox.offset + moovBox.size);
    //     } else {
    //         // Try end of file (some MP4s have moov at end)
    //         const tailSize = Math.min(1024 * 1024, file.size);
    //         const tailBuffer = await readChunk(file, file.size - tailSize, tailSize);
    //         const tailBoxes = parseMP4Boxes(tailBuffer);
    //         const tailMoovBox = tailBoxes.find(box => box.type === 'moov');
            
    //         if (tailMoovBox) {
    //             moovBuffer = tailBuffer.slice(tailMoovBox.offset, tailMoovBox.offset + tailMoovBox.size);
    //         }
    //     }
        
    //     if (!moovBuffer) {
    //     throw new Error('No moov box found');
    //     }
        
    //     // Parse tracks from moov
    //     const moovBoxes = parseMP4Boxes(moovBuffer);
    //     const trakBoxes = moovBoxes.filter(box => box.type === 'trak');
        
    //     const codecs = [];
        
    //     for (const trakBox of trakBoxes) {
    //         const trakData = moovBuffer.slice(trakBox.dataOffset, trakBox.dataOffset + trakBox.size - 8);
    //         const codec = extractTrackCodec(trakData);
    //         if (codec) {
    //             codecs.push(codec);
    //         }
    //     }
        
    //     const found_codec = codecs.length > 0 ? codecs.join(', ') : null;

    //     console.log('media_processor', 'found codec', found_codec)
    //     return found_codec;
        
    // } catch (error) {
    //     console.error('Codec extraction failed:', error);
    //     return null;
    // }
};



const media_processors = { buildTimeToByteMap, extractMP4Codec, buildVideoTimeToByteMap };

export default media_processors;