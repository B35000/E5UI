/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-anonymous-default-export */
export default () => {
    self.addEventListener('message', async (e) => {
        const { type, payload } = e.data;
        if (type === 'DECRYPT') {
            try {
            const decryptedData = await decrypt_secure_data(payload.encrypted, payload.password, payload.ready_made_key, payload.REACT_APP_ENCRYPTION_SALT_KEY);
            
            // Send results back to main thread
            self.postMessage({
                type: 'SUCCESS',
                message: type,
                message_id: payload.message_id,
                data: decryptedData
            });
            } catch (error) {
            self.postMessage({
                type: 'ERROR',
                message: type,
                message_id: payload.message_id,
                error: error.message
            });
            }
        }
        else if(type == 'ENCRYPT'){
            try {
            const decryptedData = await encrypt_secure_data(payload.text, payload.password, payload.ready_made_key, payload.REACT_APP_ENCRYPTION_SALT_KEY);
            
            // Send results back to main thread
            self.postMessage({
                type: 'SUCCESS',
                message: type,
                message_id: payload.message_id,
                data: decryptedData
            });
            } catch (error) {
            self.postMessage({
                type: 'ERROR',
                message: type,
                message_id: payload.message_id,
                error: error.message
            });
            }
        }
        else if(type == 'DECRYPT-BUFFER'){
            try {
            const decryptedData = await decryptFile(payload.encryptedBuffer, payload.password, payload.salt, payload.REACT_APP_ENCRYPTION_SALT_KEY);
            
            // Send results back to main thread
            self.postMessage({
                type: 'SUCCESS',
                message: type,
                message_id: payload.message_id,
                data: decryptedData
            });
            } catch (error) {
            self.postMessage({
                type: 'ERROR',
                message: type,
                message_id: payload.message_id,
                error: error.message
            });
            }
        }
        else if(type == 'encrypt_singular_file'){
            try {
            const encrypteddata = await encrypt_singular_file(payload.file, payload.password, payload.salt, payload.REACT_APP_ENCRYPTION_SALT_KEY);
            
            // Send results back to main thread
            self.postMessage({
                type: 'SUCCESS',
                message: type,
                message_id: payload.message_id,
                data: encrypteddata
            });
            } catch (error) {
            self.postMessage({
                type: 'ERROR',
                message: type,
                message_id: payload.message_id,
                error: error.message
            });
            }
        }
        else if(type == 'encrypt_file_in_chunks2'){
            try {
            const encrypteddata = await encrypt_file_in_chunks2(payload.combined, payload.password, payload.salt, payload.timeToByteMap, payload.REACT_APP_ENCRYPTION_SALT_KEY);
            
            // Send results back to main thread
            self.postMessage({
                type: 'SUCCESS',
                message: type,
                message_id: payload.message_id,
                data: encrypteddata
            });
            } catch (error) {
            self.postMessage({
                type: 'ERROR',
                message: type,
                message_id: payload.message_id,
                error: error.message
            });
            }
        }
        else if(type == 'encrypt_file_in_chunks'){
            try {
            const encrypteddata = await encrypt_file_in_chunks(payload.file, payload.password, payload.salt, payload.timeToByteMap, payload.REACT_APP_ENCRYPTION_SALT_KEY, payload.filesize);
            
            // Send results back to main thread
            self.postMessage({
                type: 'SUCCESS',
                message: type,
                message_id: payload.message_id,
                data: encrypteddata
            });
            } catch (error) {
            self.postMessage({
                type: 'ERROR',
                message: type,
                message_id: payload.message_id,
                error: error.message
            });
            }
        }
        else if(type == 'decrypt_chunk'){
            try {
            const encrypteddata = await decrypt_chunk(payload.chunk, payload.key);

            self.postMessage({
                type: 'SUCCESS',
                message: type,
                message_id: payload.message_id,
                data: encrypteddata
            });
            } catch (error) {
            self.postMessage({
                type: 'ERROR',
                message: type,
                message_id: payload.message_id,
                error: error.message
            });
            }
        }
        else if(type == 'transform_image'){
            try {
            const processeddata = transform_image(payload.imageData, payload.main_rgba);

            self.postMessage({
                type: 'SUCCESS',
                message: type,
                message_id: payload.message_id,
                data: processeddata
            });
            } catch (error) {
            self.postMessage({
                type: 'ERROR',
                message: type,
                error: error.message
            });
            }
        }
        
    });

    async function decrypt_secure_data(encrypted, password, ready_made_key, REACT_APP_ENCRYPTION_SALT_KEY){
        const data = (encrypted);
        const iv = data.slice(0, 12);
        const ciphertext = data.slice(12);

        const key = ready_made_key == null ? await get_key_from_password(password, 'f', REACT_APP_ENCRYPTION_SALT_KEY) : ready_made_key;
        const decrypted = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: iv },
            key,
            ciphertext
        );
        const decoder = new TextDecoder();
        const encoded_data = new Uint8Array(decrypted)
        return decoder.decode(encoded_data)
    }

    async function encrypt_secure_data(text, password, ready_made_key, REACT_APP_ENCRYPTION_SALT_KEY){
        const iv = crypto.getRandomValues(new Uint8Array(12)); // AES-GCM needs 12-byte IV
        const key = ready_made_key == null ? await get_key_from_password(password, 'f', REACT_APP_ENCRYPTION_SALT_KEY) : ready_made_key;
        const encoder = new TextEncoder();
        const encoded = encoder.encode(text);

        const ciphertext = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        encoded
        );

        const result = new Uint8Array(iv.length + ciphertext.byteLength);
        result.set(iv, 0);
        result.set(new Uint8Array(ciphertext), iv.length);

        return (result);
    }

    async function decryptFile(encryptedBuffer, password, salt, REACT_APP_ENCRYPTION_SALT_KEY){
        const iv = encryptedBuffer.slice(0, 12); // First 12 bytes
        const data = encryptedBuffer.slice(12);  // Remaining bytes
        const key = await get_key_from_password(password, salt, REACT_APP_ENCRYPTION_SALT_KEY);

        const decrypted = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv: new Uint8Array(iv) },
            key,
            data
        );

        return new Uint8Array(decrypted)
    }

    async function decrypt_chunk(chunk, key){
        const iv = chunk.slice(0, 12);
        const encryptedData = chunk.slice(12);
        const decrypted = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv },
            key,
            encryptedData
        );

        return new Uint8Array(decrypted)
    }




    async function encrypt_singular_file(file, password, salt, REACT_APP_ENCRYPTION_SALT_KEY){
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const key = await get_key_from_password(password, salt, REACT_APP_ENCRYPTION_SALT_KEY);

        const fileBuffer = file;
        const encrypted = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            key,
            fileBuffer
        );

        // Combine IV + encrypted data
        const ivBuffer = new Uint8Array(iv);
        const encryptedBuffer = new Uint8Array(encrypted);
        const result = new Uint8Array(ivBuffer.length + encryptedBuffer.length);
        result.set(ivBuffer, 0);
        result.set(encryptedBuffer, ivBuffer.length);

        return result;
    }

    async function encrypt_file_in_chunks2(combined, password, salt, timeToByteMap, REACT_APP_ENCRYPTION_SALT_KEY) {
        const key = await get_key_from_password(password, salt, REACT_APP_ENCRYPTION_SALT_KEY);
        const encryptedChunks = [];
        const encryptedChunksInfo = {}
        const chunkSeekMap = new Map();
        const fileSize = combined.length;

        const seekPoints = Array.from(timeToByteMap.entries()).sort((a, b) => a[0] - b[0]);
        let encryptedBytePosition = 0;

        for (let i = 0; i < seekPoints.length; i++) {
            const [currentTime, currentBytePos] = seekPoints[i];
            let chunkEndPos;
            if (i < seekPoints.length - 1) {
                chunkEndPos = seekPoints[i + 1][1];
            } else {
                chunkEndPos = fileSize;
            }
            const chunkSize = chunkEndPos - currentBytePos;
            if (chunkSize <= 0) continue;
            chunkSeekMap.set(currentTime, encryptedBytePosition);

            const chunk = combined.slice(currentBytePos, chunkEndPos);
            
            const iv = crypto.getRandomValues(new Uint8Array(12));
            // Encrypt the chunk
            const encrypted = await crypto.subtle.encrypt(
                { name: 'AES-GCM', iv },
                key,
                chunk
            );

            const chunkWithIV = new Uint8Array(iv.length + encrypted.byteLength);
            chunkWithIV.set(iv);
            chunkWithIV.set(new Uint8Array(encrypted), iv.length);
            encryptedChunks.push(chunkWithIV);
            encryptedChunksInfo[currentTime] = {
                timestamp: currentTime,
                originalStartByte: currentBytePos,
                originalEndByte: chunkEndPos,
                originalSize: chunkSize,
                encryptedSize: chunkWithIV.length,
                encryptedStartByte: encryptedBytePosition
            }

            // Update encrypted byte position for next chunk
            encryptedBytePosition += chunkWithIV.length;
        }

        return { encryptedChunks, encryptedChunksInfo };
    }

    async function encrypt_file_in_chunks(file, password, salt, timeToByteMap, REACT_APP_ENCRYPTION_SALT_KEY, filesize){
        const key = await get_key_from_password(password, salt, REACT_APP_ENCRYPTION_SALT_KEY);
        const encryptedChunks = [];
        const encryptedChunksInfo = {}
        const chunkSeekMap = new Map();
        const fileSize = filesize;

        const seekPoints = Array.from(timeToByteMap.entries()).sort((a, b) => a[0] - b[0]);
        let encryptedBytePosition = 0;

        for (let i = 0; i < seekPoints.length; i++) {
            const [currentTime, currentBytePos] = seekPoints[i];
            let chunkEndPos;
            if (i < seekPoints.length - 1) {
                chunkEndPos = seekPoints[i + 1][1];
            } else {
                chunkEndPos = fileSize;
            }
            const chunkSize = chunkEndPos - currentBytePos;
            if (chunkSize <= 0) continue;
            chunkSeekMap.set(currentTime, encryptedBytePosition);

            const chunkBuffer = file.slice(currentBytePos, chunkEndPos);

            const iv = crypto.getRandomValues(new Uint8Array(12));
            // Encrypt the chunk
            const encrypted = await crypto.subtle.encrypt(
                { name: 'AES-GCM', iv },
                key,
                chunkBuffer
            );

            const chunkWithIV = new Uint8Array(iv.length + encrypted.byteLength);
            chunkWithIV.set(iv);
            chunkWithIV.set(new Uint8Array(encrypted), iv.length);
            encryptedChunks.push(chunkWithIV);
            encryptedChunksInfo[currentTime] = {
                timestamp: currentTime,
                originalStartByte: currentBytePos,
                originalEndByte: chunkEndPos,
                originalSize: chunkSize,
                encryptedSize: chunkWithIV.length,
                encryptedStartByte: encryptedBytePosition
            }

            // Update encrypted byte position for next chunk
            encryptedBytePosition += chunkWithIV.length;
        }

        return { encryptedChunks, encryptedChunksInfo };
    }




    async function get_key_from_password(password, salt, REACT_APP_ENCRYPTION_SALT_KEY){
        const final_salt = salt == 'e' ? REACT_APP_ENCRYPTION_SALT_KEY : salt
        const encoder = new TextEncoder();
        const keyMaterial = await crypto.subtle.importKey(
        'raw',
        encoder.encode(password),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
        );
        return crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: encoder.encode(final_salt),
            iterations: 100000,
            hash: 'SHA-256',
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
        );
    }

    function transform_image(imageData, main_rgba){
        const data = imageData.data
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          if (is_close_to(r, 179) && is_close_to(g, 179) && is_close_to(b, 179) && a > 0) {
            //if ring color
            data[i]     = main_rgba.r;   // R -> green
            data[i + 1] = main_rgba.g; // G
            data[i + 2] = main_rgba.b;   // B
          }
          else if (is_close_to(r, 128) && is_close_to(g, 128) && is_close_to(b, 128) && a > 0) {
            //if ring color
            data[i]     = main_rgba.r;   // R -> green
            data[i + 1] = main_rgba.g; // G
            data[i + 2] = main_rgba.b;   // B
          }
          else if (is_close_to(r, 255) && is_close_to(g, 255) && is_close_to(b, 255) && a > 0) {
            //if ring color
            data[i]     = main_rgba.r;   // R -> green
            data[i + 1] = main_rgba.g; // G
            data[i + 2] = main_rgba.b;   // B
          }
        }
        return data
    }

    function is_close_to(number, target){
        return Math.abs(number-target) <= 6
    }

};