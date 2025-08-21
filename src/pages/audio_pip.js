// Copyright (c) 2023 Bry Onyoni
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO EVENT
// SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
// OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.
import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
// import SwipeableViews from 'react-swipeable-views';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class AudioPip extends Component {
    
    state = {
        selected: 0, songs:[], pos:0, value:0,
        play_pause_state:0, is_full_screen_open:false, is_repeating:false, is_shuffling:false,
        original_song_list:[], isloading:false, buffer:0
    };

    set_data(songs, pos, unshuffled_songs, is_shuffling){
        // console.log('set_data', songs, pos)
        this.setState({songs: songs, pos: pos, original_song_list: unshuffled_songs, is_shuffling: is_shuffling})
       
        if(this.state.play_pause_state == 1){
            this.setState({value: 0, play_pause_state: 0/* paused */, isloading:true})
            this.props.when_audio_play_paused_from_pip(0)

            var me = this;
            setTimeout(function() {
            me.setState({isloading:false})
            }, (1 * 200));
        }

        var current_song = songs[pos]
        if(current_song['basic_data']['data'] != null){
            this.play_this_first = encodeURI(current_song['basic_data']['data'])
        }
    }

    constructor(props) {
        super(props);
        this.audio = React.createRef();
        this.mpegRef = React.createRef();
    }

    render(){
        if(this.props.app_state.hide_pip != 'e'){
            return;
        }
        return(
            <div>
                {this.render_everything()}
            </div>
        )
    }


    render_everything(){
        if(this.state.songs == null || this.state.songs.length == 0) return;
        var current_song = this.state.songs[this.state.pos]
        var image = this.get_image_from_file(current_song['album_art'])
        //'filter': 'blur(8px)', '-webkit-filter': 'blur(8px)'
        return(
            <div style={{'position': 'relative'}}>
                {this.render_backgorund_image(image)}

                <div style={{width:this.props.player_size, height:(this.props.size == 's' ? 40 : 40), 'z-index':'8', 'position': 'absolute','background-image': 'linear-gradient(rgb(0, 0, 0,.9), rgb(0, 0, 0,.0))', 'border-radius': '15px 15px 0px 0px',}}/>

                <div style={{width:this.props.player_size, height:(this.props.size == 's' ? 40 : 40), 'margin':(this.props.size == 's' ? '110px 0px 0px 0px' : '160px 0px 0px 0px'), 'z-index':'10', 'position': 'absolute','background-image': 'linear-gradient(rgb(0, 0, 0,.0), rgb(0, 0, 0,.9))', 'border-radius': '0px 0px 15px 15px',}}/>

                <strong className="cursor" style={{width:(this.props.size == 's' ? 58 : 120), height:(this.props.size == 's' ? 24 : 50), 'opacity':0.0,'z-index':'20', 'position': 'absolute', 'margin':'10px 60px 0px 40px', 'background-color':'red'}}><div></div></strong>

                <div style={{width:this.props.player_size, height:this.props.player_size,'z-index':'15', 'position': 'absolute', 'padding':(this.props.size == 's' ? '3px 0px 5px 0px' : '6px 0px 10px 0px')}}>
                    <div className="row" style={{'padding':(this.props.size == 's' ? '0px 25px 0px 15px' : '0px 31px 0px 20px')}}>
                        <div className="col-11" style={{'padding': '0px 0px 0px 0px'}}>
                            {this.render_expand_player_icon()}
                        </div>
                        <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                            <img alt="" className="text-end" onClick={()=>this.close_and_stop_playing()} src={this.props.app_state.static_assets['close_pip']} style={{height:21, width:'auto'}} />
                        </div>
                    </div>

                    <div style={{height:(this.props.size == 's' ? 25 : 50)}}/>
                    <div style={{'margin': '0px 0px 0px 0px','display': 'flex', 'align-items':'center','justify-content':'center', 'height':50}}>
                        {this.pause_button()}
                    </div>

                    <div style={{height:(this.props.size == 's' ? 19 : 41)}}/>
                    <div style={{'padding':'0px 15px 0px 15px', 'margin':'0px 0px 0px 0px'}}>
                        {this.render_seek_bar()}
                    </div>

                    <div style={{height:(this.props.size == 's' ? 2 : 3)}}/>
                    <div className="row" style={{'margin':'0px 0px 0px 0px', 'padding':'0px 15px 0px 15px', 'width':'100%'}}>
                        <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                            <p style={{'font-size': '11px','color': 'white','font-family': this.props.font,'text-decoration': 'none'}}>{this.get_current_time()}</p>
                        </div>
                        <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                            <p className="text-end" style={{'font-size': '11px', 'color': 'white','font-family': this.props.font,'text-decoration': 'none', 'text-align':'right'}}>{this.get_remaining_time()}</p>
                        </div>
                    </div>
                </div>

                {this.render_audio()}

                {this.render_blocker()}

                {this.render_inactivity_blocker()}
            </div>
        )
    }

    render_backgorund_image(image){
        if(this.state.play_pause_state == 0/* paused */ || this.state.buffer == 0){
            return(
                <img alt="" src={image} style={{height:this.props.player_size ,width:this.props.player_size, 'border-radius': '15px', 'position': 'absolute', 'z-index':'1', 'filter': 'blur(3px)', '-webkit-filter': 'blur(3px)'}}/>
            )
        }else{
            return(
                <img alt="" src={image} style={{height:this.props.player_size ,width:this.props.player_size, 'border-radius': '15px', 'position': 'absolute', 'z-index':'1'}}/>
            )
        }
    }

    render_seek_bar(){
        var value = this.get_bar_length()
        var buffer = this.state.buffer
        var height = 3
        return(
            <div style={{ height: height, width: '100%', 'border-radius': '17px', 'box-shadow': '0px 0px 1px 1px '+this.props.theme['bar_shadow'], 'margin': '0px 0px 0px 0px' , 'position': 'relative'}}>
                
                <div className="progress" style={{ height: height, width: '100%', 'background-color': this.props.theme['bar_background_color'] , 'z-index':'5' , 'border-radius': '17px', 'position': 'absolute'}}>
                    <div className="progress-bar" role="progressbar" style={{ width: (value)+"%", 'background-image': 'none','background-color': 'white' }} aria-valuenow="5" aria-valuemin="0" aria-valuemax="10"></div>

                    <div className="progress-bar" role="progressbar" style={{ width: (buffer - value)+"%", 'background-image': 'none','background-color': '#b3b3b3' }} aria-valuenow="5" aria-valuemin="0" aria-valuemax="10"></div>

                </div>
                <input type="range" value={value} min="0" max="99" className="form-range" onChange={this.handleNumber} style={{opacity: 0, width: '100%', height: height, 'position': 'absolute', 'z-index':'10'}}/>
            </div>
        )
    }

    get_bar_length(){
        var current_time = this.state.value
        var current_song = this.state.songs[this.state.pos]
        var current_song_length = current_song['basic_data']['format']['duration']

        return ((current_time * 100) / current_song_length)
    }

    onProgress = () => {
        if (this.audio.current?.buffered.length > 0) {
            const loaded = this.audio.current?.buffered.end(this.audio.current?.buffered.length - 1); // Last buffered time
            var current_song = this.state.songs[this.state.pos]
            var current_song_length = current_song['basic_data']['format']['duration']
            var buffer = (loaded / current_song_length) * 100
            // if(this.state.buffer == 0 && (this.props.app_state.os == 'iOS' || this.props.app_state.os == 'Android')){
            //     this.play_pause()
            // }
            this.setState({buffer: buffer});
            this.props.when_buffer_updated(buffer)
        }
    }

    get_current_time(){
        var current_time = this.state.value
        var min = Math.floor(parseInt(current_time) / 60)
        var sec = parseInt(current_time) % 60
        if(sec < 10) sec = '0'+sec
        var duration = min+':'+sec
        return duration
    }

    get_remaining_time(){
        var current_time = parseInt(this.state.value)
        var current_song = this.state.songs[this.state.pos]
        var current_song_length = parseInt(current_song['basic_data']['format']['duration'])
        
        var remaining_time = current_song_length - current_time
        var min = Math.floor(parseInt(remaining_time) / 60)
        var sec = parseInt(remaining_time) % 60
        if(sec < 10) sec = '0'+sec
        var duration = '-'+min+':'+sec
        return duration
    }

    pause_button(){
        var play_pause_text = (this.has_file_loaded() && this.state.buffer != 0) ? '▶' : '⚬⚬⚬⚬'
        var font_size = (this.has_file_loaded() && this.state.buffer != 0) ? '65px' : '30px'
        var opacity = (this.state.play_pause_state == 0/* paused */ || this.state.buffer == 0) ? 1.0 : 0.0
        return(
            <p onClick={()=>this.play_pause()} style={{'font-size': font_size, width:50,'opacity':opacity}}>{play_pause_text}</p>
        )
    }

    render_expand_player_icon(){
        var opacity = !this.has_file_metadata_loaded() || this.is_mock_track() ? 0.0 : 1.0
        return(
            <img alt=""  onClick={()=>this.expand_player()} src={this.props.app_state.static_assets['expand_icon']} style={{height:25, width:'auto', 'margin': '-3px 0px 0px 0px', 'opacity':opacity}} />
        )
    }

    is_mock_track(){
        if(this.state.isloading) return false
        var current_song = this.state.songs[this.state.pos]
        return current_song['mock'] == true;
    }

    has_file_loaded(){
        if(this.state.isloading) return false
        var current_song = this.state.songs[this.state.pos]
        var audio_file = current_song['track']
        var ecid_obj = this.get_cid_split(audio_file)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return false
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        if(data == null) return false
        if(data['data'] == null) return false
        return true
    }

    has_file_metadata_loaded(){
        if(this.state.isloading) return false
        var current_song = this.state.songs[this.state.pos]
        var audio_file = current_song['track']
        var ecid_obj = this.get_cid_split(audio_file)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return false
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        if(data == null) return false
        if(data['data'] == null) return false
        return true
    }


    expand_player(){
        if(this.props.app_state.hide_audio_pip_due_to_inactivity == true){
            this.props.restore_audio_pip_visibility_because_of_touch()
            return;
        }
        if(!this.has_file_metadata_loaded() || this.is_mock_track()) return;
        this.setState({is_full_screen_open: true})
        this.props.open_full_player(this.state.songs, this.state.pos, this.state.play_pause_state, this.state.value, this.state.is_repeating, this.state.is_shuffling, this.state.original_song_list, this.state.buffer)
    }

    when_expanded_player_closed(){
        this.setState({is_full_screen_open: false})
        this.props.schedule_audio_pip_visibility_because_of_inactivity()
    }






    get_audio_file(){
        var current_song = this.state.songs[this.state.pos]
        var audio_file = current_song['track']
        var ecid_obj = this.get_cid_split(audio_file)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        if(data != null && data['data'] == null) return null
        if(data['encrypted'] == true){
            return;
        }
        return encodeURI(data['data'])
    }

    get_audio_file_data(){
        var current_song = this.state.songs[this.state.pos]
        var audio_file = current_song['track']
        var ecid_obj = this.get_cid_split(audio_file)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        return data
    }

    render_audio(){
        if(!this.has_file_loaded()) return;
        const track_data = this.get_audio_file_data()
        const audio_type = track_data['audio_type'] == null ? 'audio/mpeg' : track_data['audio_type']
        return(
            <div style={{width:2, height:2,'z-index':'2', 'opacity':0.0, 'position': 'absolute', 'margin':'100px 0px 0px 0px'}}>
                <div style={{'position': 'relative'}}>
                    <div style={{width:this.props.player_size, height:40, 'margin':'0px 0px 0px 0px', 'z-index':'3', 'position': 'absolute'}}/>
                    <div style={{width:2, height:2, 'margin':'px 0px 0px 0px', 'z-index':'2', 'position': 'absolute'}}>
                        <audio onEnded={this.handleAudioEnd} onTimeUpdate={this.handleTimeUpdate} onProgress={this.onProgress} controlsList="nodownload" controls ref={this.audio}>
                            <source ref={this.mpegRef} src={this.get_audio_file()} type={audio_type}></source>
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </div>
            </div>
        )
    }

    streamAndPlayEncryptedAudio = async (should_reset_everything) => {
        if(should_reset_everything != false){
            await this.reset_stream_decryptor_function()
        }
        const track_data = this.get_audio_file_data()
        if(track_data['encrypted'] != true){
            return;
        }
        const mediaSource = new MediaSource();
        const audioElement = this.mpegRef.current;
        audioElement.src = URL.createObjectURL(mediaSource);

        this.is_loading_and_decrypting_track = true;
        mediaSource.addEventListener('sourceopen', async () => {
            const sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');
            const key = await this.props.get_key_from_password(track_data['password'], 'e');
            const timestamp_keys = Object.keys(track_data['encrypted_file_data_info'])
            var current_timestamp_key_pos = 0;
            if(this.update_start_time_pos != null){
                current_timestamp_key_pos = this.update_start_time_pos
                const load_time_to_set = track_data['encrypted_file_data_info'][timestamp_keys[current_timestamp_key_pos]].timestamp;
                sourceBuffer.timestampOffset = load_time_to_set;
                delete this.update_start_time_pos;
            }
            while (current_timestamp_key_pos < timestamp_keys.length && this.current_file == track_data['data']) {
                if(this.should_continue_loading(track_data) && !this.has_already_loaded_current_timestamp_key_pos(current_timestamp_key_pos)){
                    const focused_timestamp_info = track_data['encrypted_file_data_info'][timestamp_keys[current_timestamp_key_pos]]
                    const start = focused_timestamp_info.encryptedStartByte
                    const end = start + focused_timestamp_info.encryptedSize - 1;
                    if(this.update_start_time_pos == null){
                        const link = await this.props.construct_encrypted_link_from_ecid_object(track_data, 'data')
                        const response = await fetch(encodeURI(link), {
                            headers: { Range: `bytes=${start}-${end}` },
                        });
                        if (response.status === 206 || response.status === 200) {
                            const value = await response.arrayBuffer()
                            const chunk = new Uint8Array(value.length);
                            chunk.set(value);
                            try{
                                const iv = chunk.slice(0, 12);
                                const encryptedData = chunk.slice(12);
                                const decrypted = await crypto.subtle.decrypt(
                                    { name: 'AES-GCM', iv },
                                    key,
                                    encryptedData
                                );
                                if(this.current_file == track_data['data']){
                                    await this.appendBufferAsync(sourceBuffer, new Uint8Array(decrypted));
                                }else{
                                    mediaSource.endOfStream();
                                    return;
                                }
                            }
                            catch(e){
                                console.log('audio_pip', 'something went wrong with the decryption or appending to buffer', e)
                                mediaSource.endOfStream('decode');
                                return;
                            }
                            if(this.loaded_timestamp_key_pos == null){
                                this.loaded_timestamp_key_pos = []
                            }
                            this.loaded_timestamp_key_pos.push(current_timestamp_key_pos)
                            current_timestamp_key_pos++;
                        }
                        else{
                            console.log('failed to fetch file chunk from node', response.status, response.statusText)
                        }
                    }
                }
                if(this.current_file == track_data['data']){
                    if(this.update_start_time_pos != null){
                        current_timestamp_key_pos = this.update_start_time_pos
                        const load_time_to_set = track_data['encrypted_file_data_info'][timestamp_keys[current_timestamp_key_pos]].timestamp;
                        sourceBuffer.timestampOffset = load_time_to_set;
                        delete this.update_start_time_pos;
                    }else{
                        const pause_time = this.should_continue_loading(track_data) ? 1000 : 1500
                        await new Promise(resolve => setTimeout(resolve, pause_time))
                    }
                }
            }
            mediaSource.endOfStream();
            this.is_loading_and_decrypting_track = false;
        });
    }

    has_already_loaded_current_timestamp_key_pos(pos){
        if(this.loaded_timestamp_key_pos != null && this.loaded_timestamp_key_pos.includes(pos)){
            return true
        }
        return false;
    }

    update_stream_start_value_after_scrub(time){
        const track_data = this.get_audio_file_data()
        const seek_data = this.seekToTime(time, track_data['timeToByteMap'])
        this.update_start_time_pos = Object.keys(track_data['encrypted_file_data_info']).indexOf(seek_data.time)

        if(this.is_loading_and_decrypting_track != true){
            this.streamAndPlayEncryptedAudio(false)
        }
    }

    reset_stream_decryptor_function = async () => {
        delete this.update_start_time_pos;
        delete this.loaded_timestamp_key_pos;
        const track_data = this.get_audio_file_data()
        this.current_file = track_data['data'];

        while (this.is_loading_and_decrypting_track == true) {
            if (this.is_loading_and_decrypting_track != true) break
            await new Promise(resolve => setTimeout(resolve, 1000))
        }
    }

    seekToTime = (targetSeconds, seekTable) => {
        const entries = Array.from(seekTable.entries()).sort((a, b) => a[0] - b[0]);
        if (entries.length === 0) return 0;
        let closestEntry = entries[0];
        for (const [time, byte] of entries) {
            if (time <= targetSeconds) {
                closestEntry = [time, byte];
            } else {
                break;
            }
        }

        return { time: closestEntry[0], byte: closestEntry[1] }
    };

    should_continue_loading(track_data){
        const value = this.get_bar_length()
        const buffer = this.state.buffer
        const track_duration = track_data['duration']
        const buffer_difference_percentage = buffer - value
        const remaining_time = (buffer_difference_percentage / 100) * track_duration;
        return remaining_time < 23
    }

    appendBufferAsync(sourceBuffer, chunk) {
        return new Promise((resolve, reject) => {
            const tryAppend = () => {
                if (sourceBuffer.updating) {
                    sourceBuffer.addEventListener('updateend', tryAppend, { once: true });
                } else {
                    sourceBuffer.appendBuffer(chunk);
                    sourceBuffer.addEventListener('updateend', resolve, { once: true });
                }
            };
            tryAppend();
        });
    }




    close_and_stop_playing(){
        if(this.props.app_state.hide_audio_pip_due_to_inactivity == true){
            this.props.restore_audio_pip_visibility_because_of_touch()
            return;
        }
        this.audio.current?.pause()
        this.props.close_audio_pip()
    }

    play_pause(){
        if(this.props.app_state.hide_audio_pip_due_to_inactivity == true){
            this.props.restore_audio_pip_visibility_because_of_touch()
            return;
        }
        if(!this.has_file_loaded() || this.is_song_available_for_playing()){
            this.setState({play_pause_state: 0})
            this.audio.current?.pause()
            this.props.when_audio_play_paused_from_pip(0)
        }
        if(this.state.play_pause_state == 0/* paused */){
            console.log('playing')
            this.setState({play_pause_state: 1})
            this.audio.current?.play()
            this.props.when_audio_play_paused_from_pip(1)
        }else{
            console.log('pausing')
            this.setState({play_pause_state: 0})
            this.audio.current?.pause()
            this.props.when_audio_play_paused_from_pip(0)
        }
        this.props.schedule_audio_pip_visibility_because_of_inactivity()
    }

    handleNumber = (number) => {
        if(this.props.app_state.hide_audio_pip_due_to_inactivity == true){
            this.props.restore_audio_pip_visibility_because_of_touch()
            return;
        }
        if(this.audio.current == null) return
        var new_value = number.target.value
        var current_song = this.state.songs[this.state.pos]
        var current_song_length = parseInt(current_song['basic_data']['format']['duration'])
        
        var new_time = (new_value / 100) * current_song_length
        this.audio.current.currentTime = parseFloat(new_time)
        this.setState({value: new_time})
    }


    start_playing(){
        this.setState({play_pause_state: 1})
        this.props.when_audio_play_paused_from_pip(1)
        console.log(this.state.songs)
        var song = this.state.songs[this.state.pos]
        var song_object = song['object'];
        if(this.should_start_from_last_timestamp(song_object)){
            var last_timestamp = this.props.app_state.audio_timestamp_data[song['song_id']]
            if(last_timestamp != null){
                this.audio.current.currentTime = last_timestamp
                this.setState({value: last_timestamp})
            }
        }
        var me = this;
        setTimeout(function() {
            me.streamAndPlayEncryptedAudio()
            me.audio.current?.play()
            me.check_if_plays_are_available_and_pause_otherwise()
            me.props.schedule_audio_pip_visibility_because_of_inactivity()
        }, (1 * 700));
        
    }

    should_start_from_last_timestamp(object){
        var listing_type = object['ipfs'] == null ? this.props.app_state.loc['a311ar']/* 'Album' */ :this.get_selected_item(object['ipfs'].get_listing_type_tags_option, 'e')
        if(listing_type == this.props.app_state.loc['a311at']/* 'Audiobook' */ || listing_type == this.props.app_state.loc['a311au']/* 'Podcast' */){
            return true
        }
        return false
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }


    handleTimeUpdate = () => {
        if(!this.is_song_available_for_playing()){
            this.audio.current.currentTime = 0
            this.setState({value: 0, play_pause_state: 0/* paused */})
            this.props.when_audio_play_paused_from_pip(0)
            this.audio.current?.pause()
            this.props.notify_account_to_make_purchase()
        }
        var current_time = this.audio.current?.currentTime
        this.update_stream_start_value_after_scrub(current_time)
        this.setState({value: current_time})
        this.props.when_time_updated(current_time, this.state.songs[this.state.pos])
    }

    handleAudioEnd = () => {
        if(this.state.is_repeating){
            this.audio.current.currentTime = 0
            this.setState({value: 0})
            
            var me = this;
            setTimeout(function() {
                me.audio.current?.play()
                me.props.load_queue(me.state.songs, me.state.pos)
                me.check_if_plays_are_available_and_pause_otherwise()
            }, (1 * 700));
        }else{
            if(this.state.pos == this.state.songs.length - 1){
                //it was the last song
                this.setState({play_pause_state: 0})
                this.props.when_audio_play_paused_from_pip(0)
                this.audio.current?.pause()
            }else{
                this.play_next()
                this.props.when_next_track_reached()
            }
        }
    };

    restart_song(){
        this.audio.current.currentTime = 0
        this.setState({value: 0})
        
        var me = this;
        setTimeout(function() {
            me.audio.current?.play()
            me.props.load_queue(me.state.songs, me.state.pos)
            me.check_if_plays_are_available_and_pause_otherwise()
            me.props.schedule_audio_pip_visibility_because_of_inactivity()
        }, (1 * 700));
    }


    render_blocker(){
        if(!this.state.is_full_screen_open) return
        return(
            <div style={{width:this.props.player_size, height:this.props.player_size, 'margin':'0px 0px 0px 0px', 'z-index':'100', 'position': 'absolute'}}/>
        )
    }

    render_inactivity_blocker(){
        if(!this.props.app_state.hide_audio_pip_due_to_inactivity) return;
        return(
            <div onClick={() => this.when_inactivity_blocker_tapped()} style={{width:this.props.player_size, height:this.props.player_size, 'margin':'0px 0px 0px 0px', 'z-index':'120', 'position': 'absolute'}}/>
        )
    }

    when_inactivity_blocker_tapped(){
        if(this.props.app_state.hide_audio_pip_due_to_inactivity == true){
            this.props.restore_audio_pip_visibility_because_of_touch()
            return;
        }
    }

    play_previous(){
        if(this.state.pos > 0){
            this.audio.current.currentTime = 0
            this.setState({value: 0, pos: this.state.pos -1, isloading:true, buffer:1})
            var me = this;
            setTimeout(function() {
                me.setState({isloading:false})
                setTimeout(function() {
                    me.streamAndPlayEncryptedAudio()
                    me.audio.current?.play()
                    me.props.load_queue(me.state.songs, me.state.pos)
                    me.check_if_plays_are_available_and_pause_otherwise()
                }, (1 * 700));
            }, (1 * 300));
        }
        this.props.schedule_audio_pip_visibility_because_of_inactivity()
    }

    play_next(){
        if(this.state.pos != this.state.songs.length - 1){
            this.audio.current.currentTime = 0
            this.setState({value: 0, pos: this.state.pos + 1, isloading:true, buffer:1})
            
            var me = this;
            setTimeout(function() {
                me.setState({isloading:false})
                setTimeout(function() {
                    me.streamAndPlayEncryptedAudio()
                    me.audio.current?.play()
                    me.props.load_queue(me.state.songs, me.state.pos)
                    me.check_if_plays_are_available_and_pause_otherwise()
                }, (1 * 700));
            }, (1 * 300));
        }
        this.props.schedule_audio_pip_visibility_because_of_inactivity()
    }

    skip_to(index){
        if(this.state.play_pause_state == 1){
            this.setState({value: 0, isloading:true})

            var me = this;
            setTimeout(function() {
                me.setState({isloading:false})
                setTimeout(function() {
                    me.audio.current?.play()
                }, (1 * 200));
            }, (1 * 200));
        }
        this.audio.current.currentTime = 0
        this.setState({value: 0, pos: index, buffer:1})
        
        var me = this;
        setTimeout(function() {
            me.streamAndPlayEncryptedAudio()
            me.props.load_queue(me.state.songs, me.state.pos)
            me.check_if_plays_are_available_and_pause_otherwise()
            me.props.schedule_audio_pip_visibility_because_of_inactivity()
        }, (1 * 300));
    }

    repeat_current_song(){
        this.setState({is_repeating: !this.state.is_repeating})
    }

    shuffle_songs_in_pip(shuffle_list, its_pos){
        if(this.state.is_shuffling == true){
            this.setState({is_shuffling: !this.state.is_shuffling, songs: shuffle_list, pos:its_pos})
        }else{
            this.setState({is_shuffling: !this.state.is_shuffling, songs: shuffle_list})
        }
    }

    add_song_to_queue_as_next(song){
        var clone = this.state.songs.slice()
        var original_clone = this.state.original_song_list.slice()
        clone.splice(this.state.pos+1, 0, song);
        original_clone.push(song)
        this.setState({songs: clone, original_song_list: original_clone})
    }

    add_song_to_queue_as_last(song){
        var clone = this.state.songs.slice()
        var original_clone = this.state.original_song_list.slice()
        clone.push(song)
        original_clone.push(song)
        this.setState({songs: clone, original_song_list: original_clone})
    }

    remove_song_from_queue(song){
        var clone = this.state.songs.slice()
        var original_clone = this.state.original_song_list.slice()

        var clone_index = this.get_pos_of_item(song, clone)
        var original_clone_index = this.get_pos_of_item(song, original_clone)

        clone.splice(clone_index, 1);
        original_clone.splice(original_clone_index, 1);

        this.setState({songs: clone, original_song_list: original_clone})
    }

    get_pos_of_item(item, songs){
        for(var i=0; i<songs.length; i++){
            var song = songs[i]
            if(song['song_id'] == item['song_id']){
                return i
            }
        }
    }



    check_if_plays_are_available_and_pause_otherwise(){
        var song = this.state.songs[this.state.pos]
        if(!this.is_song_available_for_playing()){
            this.audio.current.currentTime = 0
            this.setState({value: 0, play_pause_state: 0/* paused */})
            this.props.when_audio_play_paused_from_pip(0)
            this.audio.current?.pause()
            this.props.notify_account_to_make_purchase()
        }else{
            this.props.update_song_plays(song)
        }
    }

    is_song_available_for_playing(){
        var song = this.state.songs[this.state.pos]
        if(song['mock'] == true) return true;
        var song_object = song['object']
        if(this.does_subscriptions_exist_in_object(song_object)){
            return this.check_if_sender_has_paid_subscriptions(song_object)
        }else{
            var plays = this.props.app_state.song_plays[song['song_id']] == null ? 0 : this.props.app_state.song_plays[song['song_id']].length
            if(!this.is_song_available_for_adding_to_playlist(song) && plays >= song['songs_free_plays_count']){
                return false
            }
            return true
        }
        
    }

    does_subscriptions_exist_in_object(object){
        var required_subscriptions = object['ipfs'].selected_subscriptions
        var creator_group_subscriptions = object['ipfs'].creator_group_subscriptions
        if((creator_group_subscriptions != null && creator_group_subscriptions.length > 0) || (required_subscriptions != null && required_subscriptions.length > 0)){
            return true
        }
        return false
    }

    check_if_sender_has_paid_subscriptions(object){
        var required_subscriptions = object['ipfs'].selected_subscriptions
        var creator_group_subscriptions = object['ipfs'].creator_group_subscriptions
        
        if(creator_group_subscriptions != null && creator_group_subscriptions.length > 0){
            var has_sender_paid_all_subs = false
            creator_group_subscriptions.forEach(subscription_e5_id => {
                var subscription_id = subscription_e5_id.split('E')[0]
                var subscription_e5 = 'E'+subscription_e5_id.split('E')[1]
                if(this.has_paid_subscription(parseInt(subscription_id), subscription_e5)){
                    //if at least one subscription has been paid
                    has_sender_paid_all_subs=  true
                }
            });
            return has_sender_paid_all_subs
        }
        else if(required_subscriptions != null && required_subscriptions.length > 0){
            var has_sender_paid_all_subs2 = false
            required_subscriptions.forEach(subscription_e5_id => {
                var subscription_id = subscription_e5_id
                var subscription_e5 = 'E25'
                if(subscription_e5_id.includes('E')){
                    subscription_id = subscription_e5_id.split('E')[0]
                    subscription_e5 = 'E'+subscription_e5_id.split('E')[1]
                }
                if(this.has_paid_subscription(parseInt(subscription_id), subscription_e5)){
                    has_sender_paid_all_subs2 =  true
                }
            });
            return has_sender_paid_all_subs2
        }else{
            return true
        }
    }

    has_paid_subscription(subscription_id, e5){
        var my_payment = this.props.app_state.my_subscription_payment_mappings[e5][subscription_id]
        if(my_payment == null || my_payment == 0) return false;
        return true
    }
    
    is_song_available_for_adding_to_playlist(song){
        var my_songs = this.props.app_state.my_tracks
        if(my_songs.includes(song['song_id'])){
            return true
        }
        return false
    }






    get_image_from_file(ecid){
        if(!ecid.startsWith('image')) return ecid
        var ecid_obj = this.get_cid_split(ecid)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        if(data == null) return
        return data['data']
    }

    get_cid_split(ecid){
        var split_cid_array = ecid.split('_');
        var filetype = split_cid_array[0]
        var cid_with_storage = split_cid_array[1]
        var cid = cid_with_storage
        var storage = 'ch'
        if(cid_with_storage.includes('.')){
            var split_cid_array2 = cid_with_storage.split('.')
            cid = split_cid_array2[0]
            storage = split_cid_array2[1]
        }

        return{'filetype':filetype, 'cid':cid, 'storage':storage, 'full':ecid}
    }


}




export default AudioPip;