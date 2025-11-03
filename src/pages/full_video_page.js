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
import TextInput from './../components/text_input';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import Linkify from "linkify-react";
import { motion, AnimatePresence } from "framer-motion";

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

function start_and_end(str) {
  if (str.length > 13) {
    return str.substr(0, 6) + '...' + str.substr(str.length-6, str.length);
  }
  return str;
}

function TreeNode(data) {
    this.data     = data;
    this.parent   = null;
    this.children = [];
}

TreeNode.comparer = function (a, b) { 
return a.data.sort < b.data.sort ? 0 : 1; 
};

TreeNode.prototype.sortRecursive = function () {
this.children.sort(TreeNode.comparer);
for (var i=0, l=this.children.length; i<l; i++) {
    this.children[i].sortRecursive();
}
return this;
};

function toTree(data) {
var nodeById = {}, i = 0, l = data.length, node;

nodeById[0] = new TreeNode(); // that's the root node

for (i=0; i<l; i++) {  // make TreeNode objects for each item
    nodeById[ data[i].index ] = new TreeNode(data[i]);
}
for (i=0; i<l; i++) {  // link all TreeNode objects
    node = nodeById[ data[i].index ];
    node.parent = nodeById[node.data.parent];
    node.parent.children.push(node);
}
return nodeById[0].sortRecursive();
}

class FullVideoPage extends Component {
    
    state = {
        selected: 0, videos:null, object:null, pos:null,
        detials_or_queue_tags:this.detials_or_queue_tags(), is_player_resetting:false,
        subtitle_option_tags:null, queue_or_comments_tags:this.queue_or_comments_tags(),
        entered_text:'', focused_message:{'tree':{}}, e5: this.props.app_state.selected_e5, comment_structure_tags: this.get_comment_structure_tags(), hidden_message_children_array:[], 
        value:0, lastTap: 0, tapTimeout: null, seekFeedback: null,
    };


    componentDidMount(){
        this.setState({screen_width: this.screen.current.offsetWidth})
        this.interval = setInterval(() => this.check_for_new_responses_and_messages(), this.props.app_state.details_section_syncy_time);
        // this.video_worker = WorkerFactory.create(myWorker);
    }

    componentWillUnmount(){
        this.video_player.current?.removeEventListener('leavepictureinpicture', this.when_pip_closed);
        this.video_player.current?.removeEventListener('timeupdate', this.when_time_updated);
        clearInterval(this.interval);
        // this.video_worker.terminate()
    }

    check_for_new_responses_and_messages() {
        if(this.state.object != null && this.state.object['ipfs'] != null){
            this.props.load_video_messages(this.state.videos[this.state.pos], this.state.object)
        }
    }

    // constructor(props) {
    //     super(props);
    //     this.screen = React.createRef()
    //     this.video_player = React.createRef();
    //     this.messagesEnd = React.createRef();
    //     this.sourceRef = React.createRef();
    //     this.has_user_scrolled = {}

    //     this.mediaSourceRef = null;
    //     this.sourceBufferRef = null;
    //     this.isStreamingActive = false;
    // }


    detials_or_queue_tags(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['3026']/* 'details' */, this.props.app_state.loc['3027']/* 'queue' */, this.props.app_state.loc['3030a']/* 'comments' */], [1]
            ],
        };
    }

    queue_or_comments_tags(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', this.props.app_state.loc['3027']/* 'queue' */, this.props.app_state.loc['3030a']/* 'comments' */], [1]
            ],
        };
    }

    get_comment_structure_tags(){
        return{
            'i':{
                active:'e',
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1671']/* 'channel-structure' */, this.props.app_state.loc['1672']/* 'comment-structure' */], [1]
            ],
        };
    }





    set_data(videos, object, pos){
        this.setState({videos:videos, object:object, pos:pos, is_player_resetting:true, subtitle_option_tags: this.subtitle_option_tags(videos[pos]['subtitles'] == null ? [] : videos[pos]['subtitles']) })

        if(object['ipfs'] == null){
            return;
        }
        this.props.load_video_messages(videos[pos], object)
        if (this.messagesEnd.current){
            this.messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    render(){
        return(
            <div style={{padding:'15px 15px 0px 15px'}}>
                {this.render_everything()}
            </div>
        )
    }



    render_everything(){
        var size = this.props.app_state.size
        if(size == 's'){
            return(
                <div>
                    {this.render_player()}
                    <div style={{height: 5}}/>
                    {this.render_details_or_queue_tags_then_option()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div>
                    {this.render_player()}
                    <div style={{height: 5}}/>
                    <div className="row">
                        <div className="col-6" style={{}}>
                            {this.render_video_details()}
                        </div>
                        <div className="col-6" style={{}}>
                            {this.render_queue_then_comments_tags_option()}
                        </div>
                    </div>
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-8" style={{}}>
                        {this.render_player()}
                        <div style={{height: 5}}/>
                        {this.render_video_details()}
                    </div>
                    <div className="col-4" style={{}}>
                        {this.render_queue_then_comments_tags_option()}
                    </div>
                </div>
                
            )
        }
    }


    render_details_or_queue_tags_then_option(){
        if(this.state.object != null && this.state.object['ipfs'] != null){
            return;
        }
        if(this.get_video_object() != null && this.get_video_object()['ipfs'] != null && this.get_video_object()['ipfs'].selected == null){
            return;
        }
        return(
            <div>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.detials_or_queue_tags} tag_size={'l'} when_tags_updated={this.when_detials_or_queue_tags_object_updated.bind(this)} theme={this.props.theme}/>

                <div style={{height: 10}}/>
                {this.render_details_or_queue()}
            </div>
        )
    }

    when_detials_or_queue_tags_object_updated(tag_obj){
        this.setState({detials_or_queue_tags: tag_obj})
    }

    

    render_details_or_queue(){
        var selected_item = this.get_selected_item(this.state.detials_or_queue_tags, this.state.detials_or_queue_tags['i'].active)

        if(selected_item == this.props.app_state.loc['3026']/* 'details' */){
            return(
                <div>
                    {this.render_video_details()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['3027']/* 'queue' */){
            return(
                <div>
                    {this.render_queue()}
                </div>
            )  
        }
        else if(selected_item == this.props.app_state.loc['3030a']/* 'comments' */){
            return(
                <div>
                    {this.render_comments_section()}
                </div>
            ) 
        }
    }



    render_queue_then_comments_tags_option(){
        if(this.state.object != null && this.state.object['ipfs'] != null){
            return;
        }
        if(this.get_video_object() != null && this.get_video_object()['ipfs'] != null && this.get_video_object()['ipfs'].selected == null){
            return;
        }
        return(
            <div>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.queue_or_comments_tags} tag_size={'l'} when_tags_updated={this.when_queue_or_comments_tags_object_updated.bind(this)} theme={this.props.theme}/>
                
                <div style={{height: 10}}/>
                {this.render_queue_or_comments()}
            </div>
        )
    }

    when_queue_or_comments_tags_object_updated(tags_obj){
        this.setState({queue_or_comments_tags: tags_obj})
    }

    render_queue_or_comments(){
        var selected_item = this.get_selected_item(this.state.queue_or_comments_tags, this.state.queue_or_comments_tags['i'].active)

        if(selected_item == this.props.app_state.loc['3027']/* 'queue' */){
            return(
                <div>
                    {this.render_queue()}
                </div>
            )  
        }
        else if(selected_item == this.props.app_state.loc['3030a']/* 'comments' */){
            return(
                <div>
                    {this.render_comments_section()}
                </div>
            ) 
        }
    }






    render_player(){
        return(
            <div ref={this.screen} style={{}}>
                <div style={{'maxHeight':this.props.height-100}}>
                    {this.video_object()}
                </div>
            </div>
        )
    }

    has_file_loaded(){
        if(this.state.videos == null || this.state.videos.length == 0) return false;

        var current_video = this.state.videos[this.state.pos]
        var video_file = current_video['video']
        var ecid_obj = this.get_cid_split(video_file)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return false;
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        if(data == null || data['data'] == null) return false
        return true
    }

    get_video_object(){
        if(this.state.videos == null || this.state.videos.length == 0) return this.state.object;
        var current_video = this.state.videos[this.state.pos]
        return current_video['object']
    }

    get_video_file(){
        if(this.state.videos == null || this.state.videos.length == 0) return null;
        var current_video = this.state.videos[this.state.pos]
        var video_file = current_video['video']
        var ecid_obj = this.get_cid_split(video_file)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return null;
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        if(data['encrypted'] == true){
            return;
        }
        return encodeURI(data['data'])
    }

    get_video_file_data(){
        if(this.state.videos == null || this.state.videos.length == 0) return null;
        var current_video = this.state.videos[this.state.pos]
        var video_file = current_video['video']
        var ecid_obj = this.get_cid_split(video_file)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return null;
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        return data
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


    video_object(){
        // console.log('full_video_page', this.has_file_loaded(), this.state.is_player_resetting)
        const default_height = this.props.app_state.full_video_window_height == 0 ? 350 : this.props.app_state.full_video_window_height;

        if(!this.has_file_loaded() || this.state.is_player_resetting == true){
            return(
                <div style={{height: default_height, width: this.state.screen_width, 'background-color':this.props.theme['view_group_card_item_background'], 'border-radius':'10px', 'display': 'flex', 'align-items':'center','justify-content':'center' }}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:60 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 4px', 'color': this.props.app_state.theme['primary_text_color'], 'font-size':'11px'}}>{this.props.app_state.loc['3028'/* 'Loading...' */]}</p>
                    </div>
                </div>
            )
        }
        else{
            var video = this.get_video_file()
            const video_file_data = this.get_video_file_data()
            const video_type = video_file_data['video_type'] == null ? "video/mp4" : video_file_data['video_type']
            var current_video = this.state.videos[this.state.pos]
            var subtitles = current_video['subtitles'] == null ? [] : current_video['subtitles']
            if(current_video['release_time'] != null && current_video['release_time'] > (Date.now()/1000)){
                return(
                    <div style={{height: default_height, width: this.state.screen_width, 'background-color':this.props.theme['view_group_card_item_background'], 'border-radius':'10px', 'display': 'flex', 'align-items':'center','justify-content':'center' }}>
                        <div style={{'margin':'10px 20px 0px 0px'}}>
                            <img alt="" src={this.props.app_state.theme['letter']} style={{height:60,width:'auto'}}/>
                            <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 4px', 'color': this.props.app_state.theme['primary_text_color'], 'font-size':'11px'}}>{''+(new Date(current_video['release_time']*1000))}</p>
                        </div>
                    </div>
                )
            }
            const tracks = []
            for(var t=0; t<subtitles.length; t++){
                const subtitle_track = subtitles[t]
                tracks.push({
                    kind: 'subtitles', 
                    label: subtitle_track['subtitle_language_name'],
                    src: this.get_subtitle_file(subtitle_track, current_video),
                    srcLang: subtitle_track['subtitle_language_object']['code']
                })
            }
            if(this.props.app_state.os == 'iOS'){
                return(
                    <div style={{}}>
                        <div onTouchEnd={this.handleVideoTap} onClick={this.handleVideoTap} style={{ position: 'relative', cursor: 'pointer' }}>
                            <video ref={this.video_player} controlsList="nodownload" width={this.state.screen_width} style={{'border-radius':'10px'}} controls disablePictureInPicture>
                            {video_file_data['encrypted'] != true && (<source ref={this.sourceRef} src={video} type={video_type}/>)}
                                {tracks.map((item, index) => (
                                    <track
                                        label={item.label} 
                                        kind={item.kind}
                                        srclang={item.srcLang} 
                                        src={item.src}
                                    />
                                ))}
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        
                        <div style={{height:10}}/>
                        {this.render_subtitle_options(subtitles)}
                    </div>
                )
            }
            return(
                <div style={{}}>
                    <div onTouchEnd={this.handleVideoTap} onClick={this.handleVideoTap} style={{ position: 'relative', cursor: 'pointer' }}>
                        <video ref={this.video_player} controlsList="nodownload" width={this.state.screen_width} style={{'border-radius':'10px'}} controls>
                        {video_file_data['encrypted'] != true && (<source ref={this.sourceRef} src={video} type={video_type}/>)}
                            {tracks.map((item, index) => (
                                <track
                                    label={item.label} 
                                    kind="subtitles" 
                                    srclang={item.srcLang} 
                                    src={item.src}
                                />
                            ))}
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    
                    <div style={{height:10}}/>
                    {this.render_subtitle_options(subtitles)}
                </div>
            )
        }
        
    }

    handleVideoTap = (e) => {
        const currentTime = new Date().getTime();
        const tapDelay = currentTime - this.state.lastTap;
        
        // Clear any existing timeout
        if (this.state.tapTimeout) {
            clearTimeout(this.state.tapTimeout);
        }
        
        // Double tap detected (within 300ms)
        if (tapDelay < 300 && tapDelay > 0) {
            this.handleDoubleTap(e);
            this.setState({ lastTap: 0, tapTimeout: null });
        } else {
            // Single tap - set timeout to reset
            const timeout = setTimeout(() => {
                this.setState({ lastTap: 0 });
            }, 300);
            
            this.setState({ 
                lastTap: currentTime,
                tapTimeout: timeout 
            });
        }
    }

    handleDoubleTap = (e) => {
        const video = this.video_player.current;
        if (!video) return;
        
        // Get tap position relative to video width
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const tapPosition = x - rect.left;
        const videoWidth = rect.width;
        
        // Determine if tap was on left or right side (divide video into thirds)
        if (tapPosition < videoWidth / 3) {
            // Left side - rewind 5 seconds
            video.currentTime = Math.max(0, video.currentTime - 5);
        } 
        else if (tapPosition > (videoWidth * 2) / 3) {
            // Right side - fast forward 5 seconds
            video.currentTime = Math.min(video.duration, video.currentTime + 5);
        }
        this.update_stream_start_value_after_scrub(video.currentTime)
        this.setState({value: video.currentTime})

        
        if(tapPosition < videoWidth / 3){
            this.props.notify(this.props.app_state.loc['3083']/* '5 second rewind' */, 800)
        }else{
            this.props.notify(this.props.app_state.loc['3084']/* '5 second forward' */, 800)
        }
        // this.setState({ seekFeedback: tapPosition < videoWidth / 3 ? 'backward' : 'forward' });
        // setTimeout(() => this.setState({ seekFeedback: null }), 500)
    }

    get_subtitle_file(item, current_video){
        if(item['subtitle_type'] == 'upload'){
            const ecid_obj = this.get_cid_split(item['subtitle_file'])
            if(this.props.app_state.uploaded_data[ecid_obj['filetype']] != null){
                const data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
                const file_lyrics = data['subtitles']
                return file_lyrics
            }else{
                return null
            }
        }else{
            const id = current_video['video_id']+item['subtitle_language_name']
            if(this.subtitles_container == null){
                this.subtitles_container = {}
            }
            if(this.subtitles_container[id] != null){
                return this.subtitles_container[id]
            }
            const blob = new Blob([item['subtitle_file']], { type: 'text/vtt' });
            const subtitle_url = URL.createObjectURL(blob);
            this.subtitles_container[id] = subtitle_url
            return subtitle_url
        }
    }

    start_playing(){
        this.setState({is_player_resetting:false})
        var me = this;
        setTimeout(function() {
            me.video_player.current?.addEventListener('leavepictureinpicture', me.when_pip_closed);
            me.video_player.current?.addEventListener('timeupdate', me.when_time_updated);
            me.video_player.current?.addEventListener('seeked', me.handleTimeUpdate);
            me.when_metadata_loaded()
            me.streamAndPlayEncryptedVideo()
            me.video_player.current?.addEventListener("canplay", () => {
                me.video_player.current?.play();
            });
        }, (1 * 300));
    }




    // streamAndPlayEncryptedVideo = async (should_reset_everything) => {
    //     if(should_reset_everything !== false){
    //         await this.reset_stream_decryptor_function()
    //     }
        
    //     const track_data = this.get_video_file_data()
    //     if(track_data['encrypted'] !== true){
    //         return;
    //     }

    //     var current_video = this.state.videos[this.state.pos]
    //     if(current_video['release_time'] != null && current_video['release_time'] > (Date.now()/1000)){
    //         return;
    //     }

    //     const mediaSource = new MediaSource();
    //     const videoElement = this.video_player.current;
        
    //     // Validate video element exists
    //     if (!videoElement) {
    //         console.error('Video element not found');
    //         return;
    //     }
        
    //     const codec = track_data['codec']
    //     const video_type = track_data['video_type'] == null ? "video/mp4" : track_data['video_type']
    //     const mimeType = `${video_type}; codecs="${codec}"`;

    //     console.log('streamAndPlayEncryptedVideo', video_type, codec, mimeType)

    //     // Check if the browser supports the codec
    //     if (!MediaSource.isTypeSupported(mimeType)) {
    //         console.error('Codec not supported:', mimeType);
    //         return;
    //     }

    //     this.is_loading_and_decrypting_track = true;
        
    //     // Store MediaSource reference for state checking
    //     this.mediaSourceRef = mediaSource;
        
    //     mediaSource.addEventListener('sourceopen', async () => {
    //         console.log('MediaSource opened, ready state:', mediaSource.readyState);
            
    //         let sourceBuffer;
    //         try {
    //             sourceBuffer = mediaSource.addSourceBuffer(mimeType);
    //             console.log('SourceBuffer created successfully');
    //         } catch (error) {
    //             console.error('Failed to create SourceBuffer:', error);
    //             this.is_loading_and_decrypting_track = false;
    //             return;
    //         }

    //         // Add error handling for sourceBuffer
    //         sourceBuffer.addEventListener('error', (e) => {
    //             console.error('SourceBuffer error:', e);
    //         });

    //         sourceBuffer.addEventListener('abort', (e) => {
    //             console.warn('SourceBuffer aborted:', e);
    //         });

    //         const key = await this.props.get_key_from_password(track_data['password'], 'e');
    //         const timestamp_keys = Object.keys(track_data['encrypted_file_data_info']);
            
    //         // Sort timestamp keys numerically
    //         timestamp_keys.sort((a, b) => parseInt(a) - parseInt(b));
            
    //         var current_timestamp_key_pos = 0;
            
    //         if(this.update_start_time_pos != null){
    //             current_timestamp_key_pos = this.update_start_time_pos;
    //             const load_time_to_set = track_data['encrypted_file_data_info'][timestamp_keys[current_timestamp_key_pos]].timestamp;
                
    //             // Validate timestamp offset
    //             if (load_time_to_set >= 0) {
    //                 sourceBuffer.timestampOffset = load_time_to_set;
    //                 console.log('Set timestampOffset to:', load_time_to_set);
    //             } else {
    //                 console.warn('Invalid timestamp offset:', load_time_to_set);
    //             }
    //             delete this.update_start_time_pos;
    //         }

    //         while (current_timestamp_key_pos < timestamp_keys.length && this.current_file == track_data['data']) {
    //             if(this.should_continue_loading(track_data) && !this.has_already_loaded_current_timestamp_key_pos(current_timestamp_key_pos)){
    //                 const focused_timestamp_info = track_data['encrypted_file_data_info'][timestamp_keys[current_timestamp_key_pos]];
    //                 const start = focused_timestamp_info.encryptedStartByte;
    //                 const end = start + focused_timestamp_info.encryptedSize - 1;
                    
    //                 console.log(`Loading chunk ${current_timestamp_key_pos}: bytes ${start}-${end}`);
                    
    //                 if(this.update_start_time_pos == null){
    //                     try {
    //                         const link = await this.props.construct_encrypted_link_from_ecid_object(track_data, 'data');
    //                         const response = await fetch(encodeURI(link), {
    //                             headers: { Range: `bytes=${start}-${end}` },
    //                         });
                            
    //                         if (response.status === 206 || response.status === 200) {
    //                             const value = await response.arrayBuffer();
    //                             const chunk = new Uint8Array(value);
                                
    //                             console.log(`Received chunk size: ${chunk.length} bytes`);
                                
    //                             try {
    //                                 // Validate chunk structure
    //                                 if (chunk.length < 12) {
    //                                     throw new Error('Chunk too small for IV extraction');
    //                                 }
                                    
    //                                 const iv = chunk.slice(0, 12);
    //                                 const encryptedData = chunk.slice(12);
                                    
    //                                 console.log(`IV length: ${iv.length}, Encrypted data length: ${encryptedData.length}`);
                                    
    //                                 const decrypted = await window.crypto.subtle.decrypt(
    //                                     { name: 'AES-GCM', iv },
    //                                     key,
    //                                     encryptedData
    //                                 );
                                    
    //                                 const decryptedArray = new Uint8Array(decrypted);
    //                                 console.log(`Decrypted chunk size: ${decryptedArray.length} bytes`);
                                    
    //                                 if(this.current_file == track_data['data']){
    //                                     // Check MediaSource and SourceBuffer state before appending
    //                                     if (mediaSource.readyState !== 'open') {
    //                                         console.error('MediaSource not in open state:', mediaSource.readyState);
    //                                         break;
    //                                     }
                                        
    //                                     if (sourceBuffer.updating) {
    //                                         console.log('SourceBuffer is updating, waiting...');
    //                                         await new Promise(resolve => {
    //                                             sourceBuffer.addEventListener('updateend', resolve, { once: true });
    //                                         });
    //                                     }
                                        
    //                                     await this.appendBufferAsync(sourceBuffer, decryptedArray);
    //                                     console.log(`Successfully appended chunk ${current_timestamp_key_pos}`);
                                        
    //                                     if(this.loaded_timestamp_key_pos == null){
    //                                         this.loaded_timestamp_key_pos = [];
    //                                     }
    //                                     this.loaded_timestamp_key_pos.push(current_timestamp_key_pos);
    //                                     current_timestamp_key_pos++;
    //                                 } else {
    //                                     console.log('Current file changed, ending stream');
    //                                     if (mediaSource.readyState === 'open') {
    //                                         mediaSource.endOfStream();
    //                                     }
    //                                     return;
    //                                 }
    //                             } catch(decryptionError) {
    //                                 console.error('Decryption or buffer append error:', decryptionError);
    //                                 // Consider whether to continue or abort
    //                                 break;
    //                             }
    //                         } else {
    //                             console.error('Failed to fetch file chunk:', response.status, response.statusText);
    //                             break;
    //                         }
    //                     } catch (fetchError) {
    //                         console.error('Network error while fetching chunk:', fetchError);
    //                         break;
    //                     }
    //                 }
    //             }
                
    //             if(this.current_file == track_data['data']){
    //                 if(this.update_start_time_pos != null){
    //                     current_timestamp_key_pos = this.update_start_time_pos;
    //                     const load_time_to_set = track_data['encrypted_file_data_info'][timestamp_keys[current_timestamp_key_pos]].timestamp;
                        
    //                     // Wait for any pending updates before changing timestamp offset
    //                     if (sourceBuffer.updating) {
    //                         await new Promise(resolve => {
    //                             sourceBuffer.addEventListener('updateend', resolve, { once: true });
    //                         });
    //                     }
                        
    //                     sourceBuffer.timestampOffset = load_time_to_set;
    //                     console.log('Updated timestampOffset to:', load_time_to_set);
    //                     delete this.update_start_time_pos;
    //                 } else {
    //                     const pause_time = this.should_continue_loading(track_data) ? 50 : 150;
    //                     await new Promise(resolve => setTimeout(resolve, pause_time));
    //                 }
    //             }
    //         }
            
    //         // Only end stream if MediaSource is still open
    //         if (mediaSource.readyState === 'open') {
    //             try {
    //                 mediaSource.endOfStream();
    //                 console.log('Stream ended successfully');
    //             } catch (endError) {
    //                 console.error('Error ending stream:', endError);
    //             }
    //         }
            
    //         this.is_loading_and_decrypting_track = false;
    //     });

    //     mediaSource.addEventListener('sourceended', () => {
    //         console.log('MediaSource ended');
    //     });

    //     mediaSource.addEventListener('sourceclose', () => {
    //         console.log('MediaSource closed - cleaning up');
    //         this.mediaSourceRef = null;
    //         this.is_loading_and_decrypting_track = false;
    //     });

    //     mediaSource.addEventListener('error', (e) => {
    //         console.error('MediaSource error:', e);
    //         this.mediaSourceRef = null;
    //         this.is_loading_and_decrypting_track = false;
    //     });

    //     // Set the MediaSource as video source
    //     try {
    //         videoElement.src = URL.createObjectURL(mediaSource);
    //         console.log('MediaSource URL set on video element');
    //     } catch (error) {
    //         console.error('Failed to set MediaSource URL:', error);
    //         this.is_loading_and_decrypting_track = false;
    //     }
    // }

    has_already_loaded_current_timestamp_key_pos(pos){
        if(this.loaded_timestamp_key_pos != null && this.loaded_timestamp_key_pos.includes(pos)){
            return true
        }
        return false;
    }

    constructor(props) {
        super(props);
        this.screen = React.createRef()
        this.video_player = React.createRef();
        this.messagesEnd = React.createRef();
        this.sourceRef = React.createRef();
        this.has_user_scrolled = {}

        this.mediaSourceRef = null;
        this.sourceBufferRef = null;
        this.isStreamingActive = false;
    }

    appendBufferAsync(sourceBuffer, chunk) {
        return new Promise((resolve, reject) => {
            // Validate inputs
            if (!sourceBuffer || !chunk) {
                reject(new Error('Invalid sourceBuffer or chunk'));
                return;
            }
            
            if (chunk.byteLength === 0) {
                console.warn('Empty chunk, skipping append');
                resolve();
                return;
            }
            
            // Check if SourceBuffer is still attached to MediaSource
            try {
                // Accessing buffered will throw if SourceBuffer is removed
                const bufferedLength = sourceBuffer.buffered.length;
                console.log(`SourceBuffer has ${bufferedLength} buffered ranges`);
            } catch (error) {
                console.error('SourceBuffer has been removed from MediaSource:', error);
                reject(new Error('SourceBuffer detached from MediaSource'));
                return;
            }
            
            // Check MediaSource state through the SourceBuffer's parent
            if (!this.mediaSourceRef || this.mediaSourceRef.readyState !== 'open') {
                console.error('MediaSource is not in open state:', this.mediaSourceRef?.readyState);
                reject(new Error('MediaSource not available or not open'));
                return;
            }
            
            console.log(`Attempting to append ${chunk.byteLength} bytes to buffer`);
            
            const tryAppend = () => {
                // Double-check SourceBuffer state before each operation
                try {
                    if (sourceBuffer.updating) {
                        console.log('SourceBuffer is updating, waiting...');
                        const onUpdateEnd = () => {
                            sourceBuffer.removeEventListener('error', onError);
                            tryAppend();
                        };
                        const onError = (e) => {
                            sourceBuffer.removeEventListener('updateend', onUpdateEnd);
                            console.error('SourceBuffer update error while waiting:', e);
                            reject(e);
                        };
                        
                        sourceBuffer.addEventListener('updateend', onUpdateEnd, { once: true });
                        sourceBuffer.addEventListener('error', onError, { once: true });
                    } else {
                        // Check if we need to remove old buffered data to prevent quota exceeded errors
                        if (sourceBuffer.buffered.length > 0) {
                            const bufferedStart = sourceBuffer.buffered.start(0);
                            const bufferedEnd = sourceBuffer.buffered.end(sourceBuffer.buffered.length - 1);
                            const bufferedDuration = bufferedEnd - bufferedStart;
                            
                            // If we have more than 5 minutes buffered, remove some old data
                            if (bufferedDuration > 300) {
                                const removeEnd = bufferedStart + 60; // Remove first 60 seconds
                                console.log(`Removing buffer from ${bufferedStart} to ${removeEnd}`);
                                
                                const onRemoveComplete = () => {
                                    sourceBuffer.removeEventListener('error', onRemoveError);
                                    this.actuallyAppendBuffer(sourceBuffer, chunk, resolve, reject);
                                };
                                const onRemoveError = (e) => {
                                    sourceBuffer.removeEventListener('updateend', onRemoveComplete);
                                    console.error('Buffer remove error:', e);
                                    reject(e);
                                };
                                
                                sourceBuffer.addEventListener('updateend', onRemoveComplete, { once: true });
                                sourceBuffer.addEventListener('error', onRemoveError, { once: true });
                                sourceBuffer.remove(bufferedStart, removeEnd);
                                return;
                            }
                        }
                        
                        this.actuallyAppendBuffer(sourceBuffer, chunk, resolve, reject);
                    }
                } catch (error) {
                    console.error('SourceBuffer operation error:', error);
                    reject(error);
                }
            };
            tryAppend();
        });
    }

    actuallyAppendBuffer(sourceBuffer, chunk, resolve, reject) {
        try {
            sourceBuffer.appendBuffer(chunk);
            
            sourceBuffer.addEventListener('updateend', () => {
                console.log('Buffer append completed successfully');
                resolve();
            }, { once: true });
            
            sourceBuffer.addEventListener('error', (e) => {
                console.error('SourceBuffer append error:', e);
                reject(e);
            }, { once: true });
            
        } catch (error) {
            console.error('Failed to append buffer:', error);
            reject(error);
        }
    }



    streamAndPlayEncryptedVideo = async (should_reset_everything) => {
        // Prevent multiple concurrent streaming operations
        if (this.isStreamingActive && should_reset_everything !== false) {
            console.log('Stream already active, skipping...');
            return;
        }

        if(should_reset_everything !== false){
            await this.reset_stream_decryptor_function()
        }
        
        const track_data = this.get_video_file_data()
        if(track_data['encrypted'] !== true){
            return;
        }

        var current_video = this.state.videos[this.state.pos]
        if(current_video['release_time'] != null && current_video['release_time'] > (Date.now()/1000)){
            return;
        }

        const videoElement = this.video_player.current;
        
        // Validate video element exists
        if (!videoElement) {
            console.error('Video element not found');
            return;
        }

        // If we already have an active MediaSource for this file, don't create a new one
        if (this.mediaSourceRef && this.mediaSourceRef.readyState === 'open' && 
            this.current_file === track_data['data'] && this.sourceBufferRef) {
            console.log('Reusing existing MediaSource');
            // Continue with existing MediaSource
            this.continueStreamingWithExistingSource(track_data);
            return;
        }

        // Clean up any existing MediaSource
        this.cleanupMediaSource();
        
        const mediaSource = new MediaSource();
        const codec = track_data['codec']
        const video_type = track_data['video_type'] == null ? "video/mp4" : track_data['video_type']
        const mimeType = `${video_type}; codecs="${codec}"`;

        console.log('Creating new MediaSource:', video_type, codec, mimeType)

        // Check if the browser supports the codec
        if (!MediaSource.isTypeSupported(mimeType)) {
            console.error('Codec not supported:', mimeType);
            return;
        }

        this.isStreamingActive = true;
        this.mediaSourceRef = mediaSource;
        this.current_file = track_data['data'];
        
        mediaSource.addEventListener('sourceopen', async () => {
            console.log('MediaSource opened, ready state:', mediaSource.readyState);
            
            let sourceBuffer;
            try {
                sourceBuffer = mediaSource.addSourceBuffer(mimeType);
                this.sourceBufferRef = sourceBuffer;
                console.log('SourceBuffer created successfully');
            } catch (error) {
                console.error('Failed to create SourceBuffer:', error);
                this.isStreamingActive = false;
                return;
            }

            // Add error handling for sourceBuffer
            sourceBuffer.addEventListener('error', (e) => {
                console.error('SourceBuffer error:', e);
            });

            sourceBuffer.addEventListener('abort', (e) => {
                console.warn('SourceBuffer aborted:', e);
            });

            await this.streamChunks(track_data, sourceBuffer, mediaSource);
        });

        mediaSource.addEventListener('sourceended', () => {
            console.log('MediaSource ended');
        });

        // mediaSource.addEventListener('sourceclose', () => {
        //     console.log('MediaSource closed - cleaning up');
        //     this.cleanupMediaSource();
        // });

        mediaSource.addEventListener('error', (e) => {
            console.error('MediaSource error:', e);
            this.cleanupMediaSource();
        });

        // Set the MediaSource as video source
        try {
            videoElement.src = URL.createObjectURL(mediaSource);
            console.log('MediaSource URL set on video element');
        } catch (error) {
            console.error('Failed to set MediaSource URL:', error);
            this.cleanupMediaSource();
        }
    }

    streamChunks = async (track_data, sourceBuffer, mediaSource) => {
        const key = await this.props.get_key_from_password(track_data['password'], 'e');
        const timestamp_keys = Object.keys(track_data['encrypted_file_data_info']);
        
        // Sort timestamp keys numerically
        timestamp_keys.sort((a, b) => parseInt(a) - parseInt(b));
        
        var current_timestamp_key_pos = 0;
        
        if(this.update_start_time_pos != null){
            current_timestamp_key_pos = this.update_start_time_pos;
            const load_time_to_set = track_data['encrypted_file_data_info'][timestamp_keys[current_timestamp_key_pos]].timestamp;
            
            if (load_time_to_set >= 0) {
                sourceBuffer.timestampOffset = load_time_to_set;
                console.log('Set timestampOffset to:', load_time_to_set);
            }
            delete this.update_start_time_pos;
        }

        console.log('streamChunks', 'encrypted_file_data_info', track_data['encrypted_file_data_info'])

        while (current_timestamp_key_pos < timestamp_keys.length && 
            this.current_file == track_data['data'] && 
            this.mediaSourceRef === mediaSource && 
            this.isStreamingActive) {
            
            if(this.should_continue_loading(track_data) && 
            !this.has_already_loaded_current_timestamp_key_pos(current_timestamp_key_pos)){
                
                const focused_timestamp_info = track_data['encrypted_file_data_info'][timestamp_keys[current_timestamp_key_pos]];
                const start = focused_timestamp_info.encryptedStartByte;
                const end = start + focused_timestamp_info.encryptedSize - 1;
                
                console.log(`Loading chunk ${current_timestamp_key_pos}: bytes ${start}-${end}`);
                
                if(this.update_start_time_pos == null){
                    const success = await this.loadAndAppendChunk(track_data, sourceBuffer, mediaSource, start, end, current_timestamp_key_pos, key);
                    if (success) {
                        current_timestamp_key_pos++;
                    } else {
                        break; // Stop on error
                    }
                }
            }
            
            // Check if we're still using the same MediaSource instance
            if(this.current_file == track_data['data'] && this.mediaSourceRef === mediaSource && this.isStreamingActive){
                if(this.update_start_time_pos != null){
                    current_timestamp_key_pos = this.update_start_time_pos;
                    const load_time_to_set = track_data['encrypted_file_data_info'][timestamp_keys[current_timestamp_key_pos]].timestamp;
                    
                    if (sourceBuffer.updating) {
                        await new Promise(resolve => {
                            sourceBuffer.addEventListener('updateend', resolve, { once: true });
                        });
                    }
                    
                    sourceBuffer.timestampOffset = load_time_to_set;
                    console.log('Updated timestampOffset to:', load_time_to_set);
                    delete this.update_start_time_pos;
                } else {
                    const pause_time = this.should_continue_loading(track_data) ? 50 : 150;
                    await new Promise(resolve => setTimeout(resolve, pause_time));
                }
            }
        }
        
        // Only end stream if we're still using the same MediaSource
        if (this.mediaSourceRef === mediaSource && mediaSource.readyState === 'open') {
            try {
                mediaSource.endOfStream();
                console.log('Stream ended successfully');
            } catch (endError) {
                console.error('Error ending stream:', endError);
            }
        }
        
        this.isStreamingActive = false;
    }

    loadAndAppendChunk = async (track_data, sourceBuffer, mediaSource, start, end, chunkIndex, key) => {
        try {
            const link = await this.props.construct_encrypted_link_from_ecid_object(track_data, 'data');
            const response = await fetch(encodeURI(link), {
                headers: { Range: `bytes=${start}-${end}` },
            });
            
            if (response.status === 206 || response.status === 200) {
                const value = await response.arrayBuffer();
                const chunk = new Uint8Array(value);
                
                console.log(`Received chunk size: ${chunk.length} bytes`);
                
                if (chunk.length < 12) {
                    throw new Error('Chunk too small for IV extraction');
                }
                
                const decryptedArray = await this.decrypt_chunk(chunk, key)
                console.log(`Decrypted chunk size: ${decryptedArray.length} bytes`);
                
                // Double-check we're still using the same MediaSource
                if(this.current_file == track_data['data'] && this.mediaSourceRef === mediaSource && this.isStreamingActive){
                    if (mediaSource.readyState !== 'open') {
                        console.error('MediaSource not in open state:', mediaSource.readyState);
                        return false;
                    }

                    if (decryptedArray.length < 100) { // Minimum reasonable chunk size
                        console.warn(`Skipping tiny chunk ${chunkIndex}: only ${decryptedArray.length} bytes`);
                        return true; // Skip this chunk but continue processing
                    }
                    
                    await this.appendBufferAsync(sourceBuffer, decryptedArray);
                    console.log(`Successfully appended chunk ${chunkIndex}`);
                    
                    if(this.loaded_timestamp_key_pos == null){
                        this.loaded_timestamp_key_pos = [];
                    }
                    this.loaded_timestamp_key_pos.push(chunkIndex);
                    return true;
                } else {
                    console.log('MediaSource changed during operation, aborting chunk');
                    return false;
                }
            } else {
                console.error('Failed to fetch file chunk:', response.status, response.statusText);
                return false;
            }
        } catch (error) {
            console.error('Error loading chunk:', error);
            return false;
        }
    }

    decrypt_chunk = async (chunk, key) => {
        return await this.props.decrypt_chunk(chunk, key)
        // return new Promise((resolve, reject) => {
        //     const worker = this.video_worker;
        //     const message_id = makeid(9)

        //     worker.postMessage({
        //         type: 'decrypt_chunk',
        //         payload: {
        //             chunk, 
        //             key,
        //             message_id
        //         }
        //     });
            
        //     worker.onmessage = (e) => {
        //         if (e.data.type === 'SUCCESS'&& e.data.message_id == message_id) {
        //             resolve(e.data.data);
        //         } else if (e.data.type === 'ERROR'&& e.data.message_id == message_id) {
        //             reject(e.data.error);
        //         }
        //     };
            
        //     worker.onerror = (error) => {
        //         reject(error);
        //     };
        // });
    }

    // Updated reset function
    reset_stream_decryptor_function = async () => {
        delete this.update_start_time_pos;
        delete this.loaded_timestamp_key_pos;
        const track_data = this.get_video_file_data()
        this.current_file = track_data['data'];

        // Clean up MediaSource
        this.cleanupMediaSource();

        // Wait for any ongoing operations to complete
        while (this.isStreamingActive) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    cleanupMediaSource = () => {
        if (this.mediaSourceRef) {
            try {
                if (this.mediaSourceRef.readyState === 'open') {
                    this.mediaSourceRef.endOfStream();
                }
            } catch (e) {
                console.log('Error during MediaSource cleanup:', e);
            }
        }
        this.mediaSourceRef = null;
        this.sourceBufferRef = null;
        this.isStreamingActive = false;
    }

    continueStreamingWithExistingSource = (track_data) => {
        if (!this.isStreamingActive) {
            this.isStreamingActive = true;
            this.streamChunks(track_data, this.sourceBufferRef, this.mediaSourceRef);
        }
    }




    update_stream_start_value_after_scrub(time){
        const track_data = this.get_video_file_data()
        const seek_data = this.seekToTime(time, track_data['encrypted_file_data_info'])
        this.update_start_time_pos = seek_data.pos

        if(this.is_loading_and_decrypting_track != true){
            this.streamAndPlayEncryptedVideo(false)
        }
    }

    seekToTime = (targetSeconds, seekTable) => {
        const entries = Array.from(Object.keys(seekTable)).sort((a, b) => a[0] - b[0]);
        if (entries.length === 0) return 0;
        let closestEntry = entries[0];
        for(var e=0; e<entries.length; e++){
            const time = parseInt(entries[e])
            if (time <= parseInt(targetSeconds)) {
                closestEntry = [time, seekTable[time].originalStartByte, e];
            }
        }

        return { time: closestEntry[0], byte: closestEntry[1], pos: closestEntry[2]}
    };

    // reset_stream_decryptor_function = async () => {
    //     delete this.update_start_time_pos;
    //     delete this.loaded_timestamp_key_pos;
    //     const track_data = this.get_video_file_data()
    //     this.current_file = track_data['data'];

    //     while (this.is_loading_and_decrypting_track == true) {
    //         if (this.is_loading_and_decrypting_track != true) break
    //         await new Promise(resolve => setTimeout(resolve, 1000))
    //     }
    // }

    should_continue_loading(track_data){
        // const track_duration = track_data['duration']
        // const value = ((this.state.value  * 100) / track_duration)
        // const buffer = this.state.buffer
        // const buffer_difference_percentage = buffer - value
        // const remaining_time = (buffer_difference_percentage / 100) * track_duration;
        // return remaining_time < 23

        const videoElement = this.video_player.current;
        
        // If video element doesn't exist or no buffered data, continue loading
        if (!videoElement || !videoElement.buffered.length) {
            return true;
        }
        
        const currentTime = videoElement.currentTime;
        const bufferedEnd = videoElement.buffered.end(videoElement.buffered.length - 1);
        const remainingBuffer = bufferedEnd - currentTime;
        const bufferThreshold = 72;
        
        // Additional checks for video-specific scenarios
        const isPlaying = !videoElement.paused && !videoElement.ended;
        const isNearEnd = track_data['duration'] && 
            (currentTime + bufferThreshold) >= track_data['duration'];
        
        // Don't continue loading if we're near the end of the video
        if (isNearEnd) {
            return false;
        }
        
        // If video is playing, be more aggressive about buffering
        const effectiveThreshold = isPlaying ? bufferThreshold : bufferThreshold * 0.7;
        
        console.log('Video buffer status:', {
            currentTime: currentTime.toFixed(2),
            bufferedEnd: bufferedEnd.toFixed(2),
            remainingBuffer: remainingBuffer.toFixed(2),
            threshold: effectiveThreshold,
            shouldLoad: remainingBuffer < effectiveThreshold,
            isPlaying
        });
        
        return remainingBuffer < effectiveThreshold;
    }

    when_pip_closed = () => {
        this.props.when_picture_in_picture_exited()
    }

    when_time_updated = () => {
        var time = this.video_player.current?.currentTime
        this.setState({value: time})
        this.props.update_video_time_for_future_reference(time, this.state.videos[this.state.pos])
    }

    onProgress = () => {
        if (this.video_player.current?.buffered.length > 0) {
            const loaded = this.video_player.current?.buffered.end(this.video_player.current?.buffered.length - 1); // Last buffered time
            const track_data = this.get_video_file_data()
            var current_song_length = track_data['duration']
            var buffer = (loaded / current_song_length) * 100
            this.setState({buffer: buffer});
        }
    }

    when_metadata_loaded = () => {
        var current_video_id = this.state.videos[this.state.pos]['video_id']
        var last_time = this.props.app_state.video_timestamp_data[current_video_id]
        const video_file_data = this.get_video_file_data()

        if(last_time != null && last_time != 0 && this.video_player.current != null && video_file_data['duration'] != null){
            const watch_time_proportion = last_time / video_file_data['duration']
            if(watch_time_proportion < 0.96) this.video_player.current.currentTime = last_time;
        }
    }

    handleTimeUpdate = () => {
        var current_time = this.video_player.current?.currentTime
        this.update_stream_start_value_after_scrub(current_time)
        this.setState({value: current_time})
    }




    render_subtitle_options(subtitles){
        if(subtitles.length > 0 && this.state.subtitle_option_tags != null){
            return(
                <div>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.subtitle_option_tags} tag_size={'l'} when_tags_updated={this.when_subtitle_option_tags_object_updated.bind(this)} theme={this.props.theme}/>
                </div>
            )
        }
    }

    when_subtitle_option_tags_object_updated(tags_obj){
        this.setState({subtitle_option_tags: tags_obj})
        var selected_item = this.get_selected_item(tags_obj, tags_obj['i'].active)
        var me = this;
        this.hideTracks()
        setTimeout(function() {
            if(selected_item != 'e'){
                me.show_selected_track(selected_item)
            } 
        }, (1 * 500));
    }

    subtitle_option_tags(subtitles){
        var array = ['e',]
        subtitles.forEach(subtitle => {
            array.push(subtitle['subtitle_language_name'])
        });
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], array, [0]
            ],
        };
    }

    hideTracks() {
        if(this.video_player.current != null){
            for (var i = 0; i < this.video_player.current.textTracks.length; i++) {
                this.video_player.current.textTracks[i].mode = 'hidden';
            }
        }
    }

    show_selected_track(selected_item){
        if(this.video_player.current != null){
            for (var i = 0; i < this.video_player.current.textTracks.length; i++) {
                if(this.video_player.current.textTracks[i].language === this.get_language_from_selected_item(selected_item)){
                    this.video_player.current.textTracks[i].mode = 'showing';
                }
            }
        }
    }

    get_language_from_selected_item(selected_item){
        var current_video = this.state.videos[this.state.pos]
        var subtitles = current_video['subtitles'] == null ? [] : current_video['subtitles']
        var object = subtitles.find(x => x['subtitle_language_name'] === selected_item);
        return object['subtitle_language_object']['code']
    }







    render_video_details(){
        if(this.state.videos == null || this.state.videos.length == 0) return null;
        var current_video = this.state.videos[this.state.pos]
        var object = current_video['object']
        if(object['ipfs'].selected == null){
            if(this.props.size == 'm'){
                return;
            }
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }
        var item = this.get_post_details_data(object)
        var items = object['ipfs'].selected == null ? [] : object['ipfs'].entered_objects
        return(
            <div>
                {this.render_video_element(current_video)}
                
                <div style={{height:'1px', 'background-color':this.props.theme['line_color'], 'margin': '20px 20px 10px 20px', 'border-radius': '1px'}}/>

                {/* {this.render_detail_item('1', item['tags'])}
                <div style={{height: 10}}/> */}
                {this.render_detail_item('3', item['id'])}
                <div style={{height: 10}}/>
                {this.render_detail_item('3', item['listing_type'])}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':''+this.get_senders_name(object['event'].returnValues.p5, object), 'details':this.props.app_state.loc['a2527g']/* 'Poster' */, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_taken_down_message_if_post_is_down(object)}
                {this.render_comment_section_disabled(object)}
                
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', item['age'])}
                </div>
                <div style={{height: 20}}/>
                {this.render_item_data(items, object)}
                {this.render_item_images(object)}
                {this.render_pdf_files_if_any(object)}
                
                <div style={{height: 10}}/>
                {this.render_markdown_if_any(object)}
                
                <div style={{height: 10}}/>
                {this.render_track_nitro()}

                {this.render_detail_item('0')}
                {this.render_detail_item('0')}
            </div>
        )
    }

    render_track_nitro(){
        var current_video = this.state.videos[this.state.pos]
        var video_file = current_video['video']
        var ecid_obj = this.get_cid_split(video_file)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        if(data != null && data['data'] == null) return null
        var nitro_e5_id = data['nitro']
        if(nitro_e5_id == null) return;
        var nitro_id = nitro_e5_id.split('E')[0]
        var nitro_e5 = 'E'+nitro_e5_id.split('E')[1]

        var object = this.props.app_state.created_nitro_mappings[nitro_e5] == null ? null : this.props.app_state.created_nitro_mappings[nitro_e5][nitro_id]

        if(object != null){
            var default_image = this.props.app_state.static_assets['empty_image']
            var image = object['ipfs'] == null ? default_image : (object['ipfs'].album_art == null ? default_image : object['ipfs'].album_art)
            var title = object['e5']+' • '+object['id']
            var details = object['ipfs'] == null ? 'Nitropost ID' : (object['ipfs'].entered_title_text)
            return(
                <div>
                    {this.render_detail_item('12', {'title':title, 'image':image, 'details':details, 'size':'s', 'border_radius':'9px'})}
                </div>
            )
        }
    }

    render_video_element(item){
        var video_file = item['video']
        var ecid_obj = this.get_cid_split(video_file)
        var view_count = this.get_file_view_count(video_file)
        var view_count_message = ''
        if(view_count > 0){
            var views_text = this.props.app_state.loc['2509n']/* views */
            if(view_count == 1){
                views_text = this.props.app_state.loc['2509o']/* view */
            }
            view_count_message = ` • ${number_with_commas(view_count)} ${views_text}`
        }

        if(this.props.app_state.video_thumbnails[ecid_obj['full']] != null){
            var thumbnail = this.props.app_state.video_thumbnails[ecid_obj['full']]
            return(
                <div>
                    {this.render_detail_item('8', {'details':item['video_composer']+view_count_message,'title':item['video_title']+(this.is_video_available_for_viewing(item) ? ' ✅':''), 'size':'l', 'image':thumbnail, 'border_radius':'9px', 'image_width':'auto'})}
                </div>
            )
        }
        return(
            <div>
                {this.render_detail_item('3', {'details':item['video_composer']+view_count_message, 'title':item['video_title']+(this.is_video_available_for_viewing(item) ? ' ✅':''), 'size':'l'})}
            </div>
        )
    }

    render_markdown_if_any(object){
        var state = object['ipfs']
        if(state.markdown != null && state.markdown != ''){
            return(
                <div>
                    {this.render_detail_item('13', {'source':state.markdown})}
                </div>
            )
        }
    }

    render_taken_down_message_if_post_is_down(object){
        if(this.is_post_taken_down_for_sender(object)){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2526b']/* The object has been taken down.' */, 'title':this.props.app_state.loc['2526a']/* '🔒 Taken Down' */})}
                    <div style={{height: 10}}/>
                </div>
            )
        }
    }

    is_post_taken_down_for_sender(object){
        if(object['ipfs'].get_take_down_option == null) return false
        var selected_take_down_option = this.get_selected_item2(object['ipfs'].get_take_down_option, 'e')
        if(selected_take_down_option == 1) return true
    }

    get_selected_item2(object, option){
        return object[option][2][0]
    }

    render_comment_section_disabled(object){
        if(object['ipfs'].get_disabled_comments_section == null) return;
        var comments_disabled_option = this.get_selected_item2(object['ipfs'].get_disabled_comments_section, 'e')
        if(comments_disabled_option == 1){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2761']/* The responses section has been disabled by the posts author.' */, 'title':this.props.app_state.loc['2760']/* '🤐 Activity Section Disabled' */})}
                    <div style={{height: 10}}/>
                </div>
            )
        }
    }

    render_item_data(items, object){
        var middle = this.props.height-200;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        if(items.length == 0){
            items = [0, 1, 2]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['view_group_card_item_background'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img alt="" src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    {items.map((item, index) => (
                        <div key={index}>
                            {this.render_detail_item(item['type'], item['data'])} 
                            <div style={{height:2}}/>
                        </div>
                    ))}
                </div>
            )
        }
    }

    render_item_images(object){
        var images_to_add = object['ipfs'].entered_image_objects
        if(images_to_add.length == 0) return;
        return(
            <div>
                {this.render_detail_item('9', {'images':images_to_add, 'pos':0})}
            </div>
        )
    }

    render_pdf_files_if_any(object){
        var state = object['ipfs']
        if(state.entered_pdf_objects != null && state.entered_pdf_objects.length > 0){
            return(
                <div>
                    {this.render_pdfs_part(state.entered_pdf_objects)}
                </div>
            )
        }
    }

    render_pdfs_part(entered_pdf_objects){
        var items = [].concat(entered_pdf_objects)

        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_uploaded_pdf_item_clicked(item)}>
                            {this.render_uploaded_file(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_uploaded_file(item, index){
        var ecid_obj = this.get_cid_split(item)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        //
        var formatted_size = this.format_data_size(data['size'])
        var fs = formatted_size['size']+' '+formatted_size['unit']
        var title = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
        title = fs;
        var details = start_and_end(data['name'])
        var thumbnail = data['thumbnail']

        return(
            <div>
                {this.render_detail_item('8', {'details':title,'title':details, 'size':'s', 'image':thumbnail, 'border_radius':'15%'})}
            </div>
        )
    }

    format_data_size(size){
        if(bigInt(size).greater(bigInt(1024).pow(8))){
            var mod = bigInt(size).mod(bigInt(1024).pow(8)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(8)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'YBs'}
        }
        else if(bigInt(size).greater(bigInt(1024).pow(7))){
            var mod = bigInt(size).mod(bigInt(1024).pow(7)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(7)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'ZBs'}
        }
        else if(bigInt(size).greater(bigInt(1024).pow(6))){
            var mod = bigInt(size).mod(bigInt(1024).pow(6)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(6)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'EBs'}
        }
        else if(bigInt(size).greater(bigInt(1024).pow(5))){
            var mod = bigInt(size).mod(bigInt(1024).pow(5)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(5)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'PBs'}
        }
        else if(size > (1024*1024*1024*1024)){
            return {'size':parseFloat(size/(1024*1024*1024*1024)).toFixed(3), 'unit':'TBs'}
        }
        else if(size > (1024*1024*1024)){
            return {'size':parseFloat(size/(1024*1024*1024)).toFixed(3), 'unit':'GBs'}
        }
        else if(size > (1024*1024)){
            return {'size':parseFloat(size/(1024*1024)).toFixed(3), 'unit':'MBs'}
        }
        else if(size > 1024){
            return {'size':parseFloat(size/1024).toFixed(3), 'unit':'KBs'}
        }
        else{
            return {'size':size, 'unit':'bytes'}
        }
    }

    when_uploaded_pdf_item_clicked(item){
        this.props.when_pdf_file_opened(item)
    }






    get_post_details_data(object){
        var tags = object['ipfs'] == null ? ['Videopost'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(this.is_post_nsfw(object)){
            tags = object['ipfs'] == null ? ['Videopost'] : ['🔞🔞🔞'].concat(object['ipfs'].entered_indexing_tags)
        }
        var title = object['ipfs'] == null ? 'Videopost ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var author = this.get_senders_name(object['event'].returnValues.p5, object)
        var listing_type = object['ipfs'] == null ? 'Videopost' :this.get_selected_item(object['ipfs'].get_listing_type_tags_option, 'e')
        var default_image = this.props.app_state.static_assets['video_label']
        var image = object['ipfs'] == null ? default_image :object['ipfs'].album_art
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['e5']+' • '+object['id'], 'details':title, 'size':'l'},
            'age':{'style':'l', 'title':this.props.app_state.loc['1744']/* 'Block Number' */, 'subtitle':this.props.app_state.loc['2494']/* 'age' */, 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)} `+this.props.app_state.loc['2495']/* ago */, },

            'listing_type':{'title':listing_type, 'details':this.props.app_state.loc['a311aw']/* 'Post Type.' */, 'size':'l'},
            'id2':{'title':author, 'details':title, 'size':'l', 'image':image, 'border_radius':'7px', 'image_width':'auto'},
        }
    }

    render_video_sales_data(object, item){
        var my_account = this.props.app_state.user_account_id[object['e5']]

        if(object['event'].returnValues.p5 == my_account){
            return(
                <div>
                    {this.render_detail_item('3', item['videopost_sales'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['video_sales'])}
                    <div style={{height: 10}}/>
                </div>
            )
        }
    }

    is_post_nsfw(object){
        if(object['ipfs'].get_post_nsfw_option == null) return false
        var selected_nsfw_option = this.get_selected_item2(object['ipfs'].get_post_nsfw_option, 'e')
        if(selected_nsfw_option == 1) return true
    }

    get_senders_name(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            if(this.is_post_anonymous(object)) return this.props.app_state.loc['311m']/* 'Hidden' */
            return alias
        }
    }

    is_post_anonymous(object){
        var is_anonymous = false;
        if(object['ipfs'].get_post_anonymously_tags_option != null){
            var option = this.get_selected_item2(object['ipfs'].get_post_anonymously_tags_option, 'e')
            if(option == 1){
                is_anonymous = true
            }
        }
        return is_anonymous
    }


    




    render_queue(){
        if(this.state.videos == null || this.state.videos.length == 0) return null;
        var current_video = this.state.videos[this.state.pos]
        var object = current_video['object']
        if(object['ipfs'].selected == null){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }
        var items = this.state.videos
        var object_item = this.get_post_details_data(object)
        return(
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px'}}>
                <div style={{padding:'0px 5px 5px 5px'}}>
                    {this.render_detail_item('8', object_item['id2'])}
                    {this.render_detail_item('0')}
                    <div>
                        {items.map((item, index) => (
                            <div key={index}>
                                {this.render_video(item, object, index)} 
                                <div style={{height:5}}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    render_video(item, object, index){
        var video_file = item['video']
        var ecid_obj = this.get_cid_split(video_file)

        var view_count = this.get_file_view_count(video_file)
        var view_count_message = ''
        if(view_count > 0){
            var views_text = this.props.app_state.loc['2509n']/* views */
            if(view_count == 1){
                views_text = this.props.app_state.loc['2509o']/* view */
            }
            view_count_message = ` • ${this.format_view_count(view_count)} ${views_text}`
        }
        if(this.props.app_state.video_thumbnails[ecid_obj['full']] != null){
            var thumbnail = this.props.app_state.video_thumbnails[ecid_obj['full']]
            return(
                <div onClick={() => this.when_video_item_clicked(item, object, index)}>
                    {this.render_detail_item('8', {'details':item['video_composer']+view_count_message,'title':item['video_title']+(this.is_video_available_for_viewing(item) ? ' ✅':''), 'size':'l', 'image':thumbnail, 'border_radius':'9px', 'image_width':'auto'})}
                </div>
            )
        }
        return(
            <div onClick={() => this.when_video_item_clicked(item, object, index)}>
                {this.render_detail_item('3', {'details':item['video_composer']+view_count_message, 'title':item['video_title']+(this.is_video_available_for_viewing(item) ? ' ✅':''), 'size':'l'})}
            </div>
        )
    }

    format_view_count(view_count){
        if(view_count > 1_000_000_000){
            var val = (view_count/1_000_000_000).toFixed(1)
            if(val > 10) val = val.toFixed(0)
            return `${val}B`
        } 
        else if(view_count > 1_000_000){
            var val = (view_count/1_000_000).toFixed(1)
            if(val > 10) val = val.toFixed(0)
            return `${val}M`
        }
        else if(view_count > 1_000){
            var val = (view_count/1_000).toFixed(1)
            if(val > 10) val = val.toFixed(0)
            return `${val}K`
        }
        else {
            return view_count
        }
    }

    get_file_view_count(track){
        var ecid_obj = this.get_cid_split(track)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] != null && this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']] != null){
            var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
            var file = data['hash']
            var stream_data = this.props.app_state.file_streaming_data[file]
            if(stream_data != null){
                return stream_data.files_view_count
            }
        }
        return 0
    }

    when_video_item_clicked(video, object, index){
        if(index == this.state.pos){
            this.props.notify(this.props.app_state.loc['3029']/* e is already playing the video. */, 1500)
            return;
        }
        else if(!this.is_video_available_for_viewing(video)){
            this.props.notify(this.props.app_state.loc['b2527f']/* 'You need to purchase access to the video first.' */, 5000)
            return;
        }
        this.setState({
            is_player_resetting:true, 
            pos: index, 
            subtitle_option_tags: this.subtitle_option_tags(this.state.videos[index]['subtitles'] == null ? [] : this.state.videos[index]['subtitles']) 
        })
        var me = this;
        setTimeout(function() {
            me.props.load_video_queue(me.state.videos, me.state.pos)
        }, (1 * 500));
    }

    is_video_available_for_viewing(video){
        if(video['price_data'].length == 0) return true;
        var my_video = this.props.app_state.my_videos
        if(my_video.includes(video['video_id'])){
            return true
        }
        return false
    }











    render_comments_section(){
        if(this.state.object == null) return;
        if(this.state.object['ipfs'].selected == null){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }
        var he = this.props.height-180
        if(this.get_focused_message() != null) he = this.props.height-250
        var size = this.props.screensize
        var ww = '80%'
        if(size == 'l') ww = '90%'
        if(this.props.app_state.width > 1100){
            ww = '80%'
        }
        return(
            <div>
                {this.render_top_title()}
                {this.render_detail_item('0')}
                <Tags font={this.props.app_state.font} page_tags_object={this.state.comment_structure_tags} tag_size={'l'} when_tags_updated={this.when_comment_structure_tags_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>
                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 5px 0px', width: '99%'}}>
                    <div style={{'margin':'1px 5px 0px 0px'}}>
                        {/* {this.render_image_picker()} */}
                        <div>
                            <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}} onClick={()=> this.when_circle_clicked()}>
                                <img alt="" src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}}/>
                            </div>
                        </div>
                    </div>
                    <div style={{width:10}}/>
                    <div className="row" style={{width:ww}}>
                        <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                            <TextInput font={this.props.app_state.font} height={20} placeholder={this.props.app_state.loc['1039']/* 'Enter Message...' */} when_text_input_field_changed={this.when_entered_text_input_field_changed.bind(this)} text={this.state.entered_text} theme={this.props.theme}/>
                        </div>
                        <div className="col-1" style={{'padding': '0px 10px 0px 0px'}}>
                            <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                                <img alt="" className="text-end" onClick={()=>this.add_message_to_stack()} src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                            </div>
                        </div>
                    </div>
                </div>
                {this.render_focused_message()}
                <div style={{height:5}}/>
                <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px', 'max-width':'470px'}}>
                    <div onScroll={event => this.handleScroll(event)} style={{ 'overflow-y': 'auto', height: 'auto', padding:'0px 0px 5px 0px'}}>
                        {this.render_sent_received_messages()}
                    </div>
                </div>
            </div> 
        )
    }

    when_circle_clicked = () => {
        let me = this;
        if(Date.now() - this.last_all_click_time2 < 200){
            clearTimeout(this.all_timeout);
            //double tap
            me.scroll_to_bottom()
        }else{
            this.all_timeout = setTimeout(function() {
                clearTimeout(this.all_timeout);
                // single tap
                me.show_add_comment_bottomsheet()
            }, 200);
        }
        this.last_all_click_time2 = Date.now();
    }

    scroll_to_bottom(){
        this.messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
    }

    handleScroll = (event) => {
        var video = this.state.videos[this.state.pos];      
        this.has_user_scrolled[video['video_id']] = true
    };

    render_focused_message(){
        var item = this.get_focused_message();
        if(item != null){
            return(
                <div style={{'padding': '7px 15px 10px 15px','margin':'5px 70px 0px 60px', 'background-color': this.props.theme['messsage_reply_background'],'border-radius': '10px 10px 10px 10px'}} onClick={()=>this.unfocus_message()}> 
                    <div className="row" style={{'padding':'0px 0px 0px 0px'}}>
                        <div className="col-9" style={{'padding': '0px 0px 0px 14px', 'height':'20px' }}> 
                            <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} >{this.get_sender_title_text(item)}</p>
                        </div>
                        <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                            <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{this.get_time_difference(item['time'])}</p>
                        </div>
                    </div>
                    <p style={{'font-size': '11px','color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'white-space': 'pre-line'}}>{this.truncate(item['message'], 35)}</p>
                </div>
            )
        }
    }

    when_comment_structure_tags_updated(tag_obj){
        this.setState({comment_structure_tags: tag_obj})
    }

    show_add_comment_bottomsheet(){
        var object = this.state.object
        var video = this.state.videos[this.state.pos]; 
        var focused_message_id = this.get_focused_message() != null ? this.get_focused_message() : 0
        this.props.show_add_comment_bottomsheet(video, focused_message_id, 'video-comment', object['id'], this.state.entered_text)
    }

    render_top_title(){
        var video = this.state.videos[this.state.pos]
        return(
            <div style={{padding:'0px 5px 5px 5px'}}>
                {this.render_video_element(video)} 
            </div>
        )
    }

    componentDidUpdate(){
        if(this.state.videos != null){
            var video = this.state.videos[this.state.pos];      
            var has_scrolled = this.has_user_scrolled[video['video_id']]
            if(has_scrolled == null){
                // this.scroll_to_bottom()
            }
        }
    }

    render_sent_received_messages(){
        // var middle = this.props.height-240;
        // if(this.get_focused_message() != null) middle = this.props.height-290
        // var size = this.props.size;
        // if(size == 'm'){
        //     middle = this.props.height-100;
        // }
        var items = [].concat(this.get_convo_messages())
        var stacked_items = [].concat(this.get_stacked_items()).reverse()
        var final_items = stacked_items.concat(items)

        if(items.length == 0 && stacked_items.length == 0){
            items = [0,1]
            return(
                <div>
                    <div style={{}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img alt="" src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }
        else{
            var selected_view_option = this.get_selected_item(this.state.comment_structure_tags, 'e')
            if(selected_view_option == this.props.app_state.loc['1671']/* 'channel-structure' */){
                return(
                <div /* onScroll={event => this.handleScroll(event)} */ style={{ 'display': 'flex', 'flex-direction': 'column-reverse', /* overflow: 'scroll', maxHeight: middle */}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        <div ref={this.messagesEnd}/>
                        {this.render_messages(final_items)}
                    </ul>
                </div>
            )
            }else{
                return(
                    <div /* onScroll={event => this.handleScroll(event)} */ style={{ 'display': 'flex', 'flex-direction': 'column-reverse', /* overflow: 'scroll', maxHeight: middle */}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            <div ref={this.messagesEnd}/>
                            {this.render_all_comments()}
                        </ul>
                    </div>
                )
            }
        }
    }

    render_messages(items){
        var middle = this.props.height-200;        
        if(items.length == 0){
            var items = [0,1]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img alt="" src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    <AnimatePresence initial={false} mode="popLayout">
                        {items.map((item, index) => (
                            <motion.li key={item['message_id']} initial={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} layout={true} transition={{ duration: 0.3 }} style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                <div>
                                    {this.render_message_as_focused_if_so(item)}
                                    <div style={{height:3}}/>
                                </div>
                            </motion.li>
                        ))} 
                    </AnimatePresence>     
                </div>
            )
        }
        
    }

    focus_message(item){
        var clone = JSON.parse(JSON.stringify(this.state.focused_message))
        var video = this.state.videos[this.state.pos];

        if(this.state.focused_message[video['video_id']] != item){
            clone[video['video_id']] = item
            if(clone['tree'][video['video_id']] == null) {
                clone['tree'][video['video_id']] = []
            }
            // if(!this.includes_function(clone['tree'][object['job_request_id']], item)){
            //     console.log('pushing item')
            // }
            clone['tree'][video['video_id']].push(item)
        }
        this.setState({focused_message: clone})
    }

    unfocus_message(){
        var clone = JSON.parse(JSON.stringify(this.state.focused_message))
        var video = this.state.videos[this.state.pos];
        if(clone['tree'][video['video_id']] != null){
            var index = this.get_index_of_item()
            if(index != -1){
                clone['tree'][video['video_id']].splice(index, 1)
            }
        }

        var latest_message = clone['tree'][video['video_id']].length > 0 ? clone['tree'][video['video_id']][clone['tree'][video['video_id']].length -1] : null
        clone[video['video_id']] = latest_message
        this.setState({focused_message: clone})
    }

    get_index_of_item(){
        var video = this.state.videos[this.state.pos];
        var focused_item = this.state.focused_message[video['video_id']]
        var focused_items = this.state.focused_message['tree'][video['video_id']]
        var pos = -1
        for(var i=0; i<focused_items.length; i++){
            if(focused_items[i]['message_id'] == focused_item['message_id']){
                pos = i
                break
            }
        }
        return pos
    }


    render_message_as_focused_if_so(item){
        return(
            <div>
                <SwipeableList>
                        <SwipeableListItem
                            swipeLeft={{
                            content: <div>{this.props.app_state.loc['2507a']/* Reply */}</div>,
                            action: () => this.focus_message(item)
                            }}
                            swipeRight={{
                            content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2908']/* Delete. */}</p>,
                            action: () => this.props.delete_message_from_stack(item, this.props.app_state.loc['3030b']/* 'video-comment-messages' */)
                            }}
                            >
                            <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>{this.render_stack_message_item(item)}</div>
                        </SwipeableListItem>
                    </SwipeableList>
            </div>
        )
    }

    when_message_clicked = (event, item, focused_message) => {
        let me = this;
        if(Date.now() - this.last_all_click_time < 200){
            //double tap
            me.when_message_double_tapped(item)
            clearTimeout(this.all_timeout);
        }else{
            this.all_timeout = setTimeout(function() {
                clearTimeout(this.all_timeout);
                // single tap
                
            }, 200);
        }
        this.last_all_click_time = Date.now();
    }

    when_message_double_tapped(item){
        var message = item['message'];
        this.copy_to_clipboard(message)
    }

    copy_to_clipboard(signature_data){
        navigator.clipboard.writeText(signature_data)
        this.props.notify(this.props.app_state.loc['1692']/* 'Copied message to clipboard.' */, 1600)
    }


    render_stack_message_item(item){
        if(this.is_sender_in_blocked_accounts(item)){
            return(
                <div>
                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                        <div style={{'margin':'10px 20px 10px 0px'}}>
                            <img alt="" src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                        </div>
                    </div>
                </div>
            )
        }
        var size = item['size'] == null ? '11px' : item['size'];
        var font = item['font'] == null ? this.props.app_state.font : item['font']
        var word_wrap_value = this.longest_word_length(item['message']) > 53 ? 'break-all' : 'normal'
        var e5 = item['sender_e5'] == null ? item['e5'] : item['sender_e5']
        var line_color = item['sender'] == this.props.app_state.user_account_id[e5] ? this.props.theme['secondary_text_color'] : this.props.theme['send_receive_ether_background_color']
        var text = this.format_message(item['message'])
        // const parts = text.split(/(\d+)/g);
        const parts = this.split_text(text);
        return(
            <div>
                <div style={{'background-color': line_color,'margin': '0px 0px 0px 0px','border-radius': '0px 0px 0px 0px'}}>
                    <div style={{'background-color': this.props.theme['send_receive_ether_background_color'],'margin': '0px 0px 0px 1px','border-radius': '0px 0px 0px 0px'}}>
                        <div style={{'padding': '7px 15px 10px 15px','margin':'0px 0px 0px 0px', 'background-color': this.props.theme['view_group_card_item_background'],'border-radius': '7px'}}>
                            <div className="row" style={{'padding':'0px 0px 0px 0px'}}>
                                <div className="col-9" style={{'padding': '0px 0px 0px 14px', 'height':'20px' }}> 
                                <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} > {this.get_sender_title_text(item)}</p>
                                </div>
                                <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                                <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{this.get_time_difference(item['time'])}</p>
                                </div>
                            </div>
                            <p style={{'font-size': size,'color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': font,'text-decoration': 'none', 'white-space': 'pre-line', 'word-break': word_wrap_value}} onClick={(e) => this.when_message_clicked(e, item)}><Linkify options={this.linkifyOptions}  /* options={{target: '_blank'}} */>{
                                parts.map((part, index) => {
                                    const num = parseInt(part, 10);
                                    const isId = !isNaN(num) && num > 1000;
                                    if (isId) {
                                        return (
                                            <span
                                                key={index}
                                                style={{ textDecoration: "underline", cursor: "pointer", color: this.props.theme['secondary_text_color'] }}
                                                onClick={() => this.when_e5_link_tapped(num)}>
                                                    {part}
                                            </span>
                                        );
                                    }
                                    return <span key={index}>{part}</span>;
                                })
                            }</Linkify></p>
                            {this.render_markdown_in_message_if_any(item)}
                            {this.render_images_if_any(item)}
                            {this.get_then_render_my_awards(item)}
                            {/* <p style={{'font-size': '8px','color': this.props.theme['primary_text_color'],'margin': '1px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'white-space': 'pre-line'}} className="fw-bold">{this.get_message_replies(item).length} {this.props.app_state.loc['1693']} </p> */}
                        </div>
                    </div>
                </div>
                    
                {this.render_pdfs_if_any(item)}
                {this.render_response_if_any(item)}
                {this.show_moderator_note_for_comment_if_any(item)}
            </div>
        )
    }

    linkifyOptions = {
        render: {
            url: ({ attributes, content }) => (
                <a
                {...attributes}
                onClick={(e) => this.handleLinkClick(e.target.href, e)}
                style={{ color: this.props.theme['secondary_text_color'], cursor: "pointer" }}
                className="custom-link"
                >
                {content}
                </a>
            )
        }
    };

    handleLinkClick = (url, e) => {
        e.preventDefault(); // stop normal navigation
        this.props.show_view_iframe_link_bottomsheet(url)
    };

    show_moderator_note_for_comment_if_any(item){
        if(this.props.app_state.moderator_notes_by_my_following.length == 0 || item['sender'] == this.props.app_state.user_account_id[item['sender_e5']]) return;
        var note_to_apply = []
        for(var n=0; n<this.props.app_state.moderator_notes_by_my_following.length; n++){
            const focused_note = this.props.app_state.moderator_notes_by_my_following[n]
            var hit_count = 0
            for(var k=0; k<focused_note['keywords'].length; k++){
                const keyword_target = focused_note['keywords'][k]
                if(item['message'].includes(keyword_target)){
                    hit_count ++
                }
                else if(item['markdown'] != null && item['markdown'].includes(keyword_target)){
                    hit_count++
                }
            }

            if(((focused_note['type'] == 'all' && hit_count == focused_note['keywords'].length) || (focused_note['type'] == 'one' && hit_count != 0)) && focused_note['visibility_end_time'] >= (Date.now()/1000)){
                note_to_apply.push(focused_note)
            }
        }
        if(note_to_apply.length != 0){
            const identifier = item['message_id']
            const note_index = this.state.note_index == null || this.state.note_index[identifier] == null ? 0 : this.state.note_index[identifier];
            const note_count_message = `(${note_index+1}/${note_to_apply.length})`
            return(
                <div>
                    <div style={{height:5}}/>
                    <div onClick={() => this.update_note_index(note_to_apply, identifier)}>
                        {this.render_detail_item('3', {'size':'s', 'title':this.props.app_state.loc['1593is']/* '⚠️ Moderator Note $' */.replace('$', note_count_message), 'details':note_to_apply[note_index]['message']})}
                        {this.render_files_part(note_to_apply[note_index]['entered_file_objects'])}
                    </div>
                </div>
            )
        }
    }

    render_files_part(entered_file_objects){
        var items = [].concat(entered_file_objects)
        if(items.length == 0) return;
        return(
            <div style={{'margin':'7px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_uploaded_file_item_clicked(item, index)}>
                            {this.render_uploaded_moderator_file(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    when_uploaded_file_item_clicked(item, index){
        this.props.when_file_link_tapped(item)
    }

    render_uploaded_moderator_file(item, index){
        var ecid_obj = this.get_cid_split(item)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        const minified = false;
        
        if(data != null){
            if(data['type'] == 'image'){
                var img = data['data']
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */
                var title = data['name']
                var size = 'l'
                if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    size = 's'
                }
                return(
                    <div>
                        {this.render_detail_item('8', {'details':details,'title':title, 'size':size, 'image':img, 'border_radius':'15%'})}
                    </div>
                )
            }
            else if(data['type'] == 'audio'){
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
                var title = data['name']
                var size = 'l'
                var thumbnail = data['thumbnail'] == '' ? this.props.app_state.static_assets['music_label'] : data['thumbnail']
                 if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    size = 's'
                }
                return(
                    <div>
                        {this.render_detail_item('8', {'details':details,'title':title, 'size':size, 'image':thumbnail, 'border_radius':'15%'})}
                    </div>
                )
            }
            else if(data['type'] == 'video'){
                var video = data['data']
                var font_size = ['15px', '12px', 19];
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */
                var title = data['name']
                var video_height = "50"
                if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    font_size = ['12px', '10px', 16];
                    video_height = "40"
                }

                if(this.props.app_state.video_thumbnails[ecid_obj['full']] != null){
                    var thumbnail = this.props.app_state.video_thumbnails[ecid_obj['full']]
                    return(
                        <div>
                            {this.render_detail_item('8', {'title':title,'details':details, 'size':size, 'image':thumbnail, 'border_radius':'15%', 'image_width':'auto'})}
                        </div>
                    )
                }else{
                    var thumbnail = this.props.app_state.static_assets['video_label']
                    return(
                        <div>
                            {this.render_detail_item('8', {'title':title,'details':details, 'size':size, 'image':thumbnail, 'border_radius':'15%', 'image_width':'auto'})}
                        </div>
                    )
                }
            }
            else if(data['type'] == 'pdf'){
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
                var title = data['name']
                var size = 'l'
                var thumbnail = data['thumbnail']
                 if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    size = 's'
                }
                return(
                    <div>
                        {this.render_detail_item('8', {'details':details,'title':title, 'size':size, 'image':thumbnail, 'border_radius':'15%'})}
                    </div>
                )
            }
            else if(data['type'] == 'zip'){
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
                var title = data['name']
                var size = 'l'
                var thumbnail = this.props.app_state.static_assets['zip_file']
                if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    size = 's'
                }
                return(
                    <div>
                        {this.render_detail_item('8', {'details':details,'title':title, 'size':size, 'image':thumbnail, 'border_radius':'15%'})}
                    </div>
                )
            }
            else if(data['type'] == 'lyric'){
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
                var title = data['name']
                var size = 'l'
                var thumbnail = this.props.app_state.static_assets['lyric_icon']
                if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    size = 's'
                }
                return(
                    <div>
                        {this.render_detail_item('8', {'details':details,'title':title, 'size':size, 'image':thumbnail, 'border_radius':'15%'})}
                    </div>
                )
            }
            else if(data['type'] == 'subtitle'){
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
                var title = data['name']
                var size = 'l'
                var thumbnail = this.props.app_state.static_assets['subtitle_icon']
                if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    size = 's'
                }
                return(
                    <div>
                        {this.render_detail_item('8', {'details':details,'title':title, 'size':size, 'image':thumbnail, 'border_radius':'15%'})}
                    </div>
                )
            }
        }
    }

    update_note_index(note_to_apply, identifier){
        var clone = this.state.note_index == null ? {} : structuredClone(this.state.note_index)
        if(clone[identifier] == null){
            clone[identifier] = 0
        }
        if(clone[identifier] + 1 == note_to_apply.length){
            clone[identifier] = 0
        }
        else{
            clone[identifier] ++
        }
        this.setState({note_index: clone})
    }

    split_text(text){
        if(text == null) return []
        var split = text.split(' ')
        var final_string = []
        split.forEach((word, index) => {
            final_string.push(word)
            if(split.length-1 != index){
                final_string.push(' ')
            }
        });
        return final_string
    }

    when_e5_link_tapped(id){
        this.props.when_e5_link_tapped(id)
    }

    longest_word_length(text) {
        return text
            .split(/\s+/) // Split by whitespace (handles multiple spaces & newlines)
            .reduce((maxLength, word) => Math.max(maxLength, word.length), 0);
    }

    render_response_if_any(_item){
        if(_item['focused_message_id'] == 0) return;
        // if(this.get_focused_message(object) != null) return;
        var message_items = this.get_convo_messages().concat(this.get_stacked_items())
        var item = this.get_item_in_message_array(_item['focused_message_id'], message_items)
        if(item == null) return;
        var selected_view_option = this.get_selected_item(this.state.comment_structure_tags, 'e')
        if(selected_view_option == this.props.app_state.loc['1672']/* 'comment-structure' */) return
        var size = item['size'] == null ? '11px' : item['size'];
        var font = item['font'] == null ? this.props.app_state.font : item['font']
        return(
            <div style={{'padding': '7px 15px 10px 15px','margin':'2px 5px 0px 20px', 'background-color': this.props.theme['messsage_reply_background'],'border-radius': '0px 0px 10px 10px'}}> 
                <div className="row" style={{'padding':'0px 0px 0px 10px'}}>
                    <div className="col-9" style={{'padding': '0px 0px 0px 0px', 'height':'20px' }}> 
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}}>{this.get_sender_title_text(item)}</p>
                    </div>
                    <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                        <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{this.get_time_difference(item['time'])}</p>
                    </div>
                </div>
                <p style={{'font-size': size,'color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': font,'text-decoration': 'none', 'white-space': 'pre-line'}}>{this.truncate(item['message'], 53)}</p>

                {/* {this.render_award_object_if_any(_item)} */}
                {this.get_then_render_my_awards(item)}
            </div>
        )
    }

    render_award_object_if_any(item){
        if(item['award_tier'] != null && item['award_tier'] != ''){
            return(
                <div style={{'font-size': '8px'}}>
                    <p>{item['award_tier']['label']['title']}</p>
                </div>
            )
        }
    }

    get_then_render_my_awards(item){
        var message_items = this.get_convo_messages().concat(this.get_stacked_items())
        var award_obj = {}
        message_items.forEach(message => {
            if(message['focused_message_id'] == item['message_id']){
                if(message['award_tier'] != null && message['award_tier'] != ''){
                    if(award_obj[message['award_tier']['label']['title']] == null){
                       award_obj[message['award_tier']['label']['title']] = 0
                    }
                    award_obj[message['award_tier']['label']['title']]++
                }
            }
        });
        if(Object.keys(award_obj).length > 0){
            var text = ''
            for(const award in award_obj){
                if(award_obj.hasOwnProperty(award)){
                    if(text != ''){
                        text = text + ' '
                    }
                    if(award_obj[award] > 1){
                        text = `${text}${award}x${award_obj[award]}`
                    }else{
                        text = `${text}${award}`
                    }
                }
            }
            var font = item['font'] == null ? this.props.app_state.font : item['font']
            return(
                <div>
                    <p style={{'color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': font,'text-decoration': 'none', 'white-space': 'pre-line', 'font-size': '8px'}}>{text}</p>
                </div>
            )
        }
    }

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }

    get_item_in_message_array(message_id, object_array){
        var object = object_array.find(x => x['message_id'] === message_id);
        return object
    }

    is_sender_in_blocked_accounts(item){
        var blocked_account_obj = this.get_all_sorted_objects(this.props.app_state.blocked_accounts)
        var blocked_accounts = []
        blocked_account_obj.forEach(account => {
            if(!blocked_accounts.includes(account['id'])){
                blocked_accounts.push(account['id'])
            }
        });

        if(blocked_accounts.includes(item['sender'])){
            return true
        }
        return false
    }

    render_images_if_any(item){
        if(item.type == 'image'){
            return(
                <div>
                    {this.render_detail_item('9',item['image-data'])}
                </div>
            )
        }
    }

    render_pdfs_if_any(item){
        if(item.type == 'image' && item['pdf-data'] != null && item['pdf-data'].length > 0){
            return(
                <div>
                    <div style={{height:5}}/>
                    {this.render_pdfs_part(item['pdf-data'])}
                    <div style={{height:5}}/>
                </div>
            )
        }
    }

    render_markdown_in_message_if_any(item){
        if(item['markdown'] != null && item['markdown'] != ''){
            return(
                <div>
                    <div style={{height:5}}/>
                    {this.render_detail_item('13', {'source':item['markdown']})}
                </div>
            )
        }
    }

    get_sender_title_text(item){
        var e5 = item['sender_e5'] == null ? item['e5'] : item['sender_e5']
        if(item['sender'] == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var obj = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
            var sender = item['sender']
            var alias = obj[sender] == null ? sender.toString() : obj[sender]
            return alias
        }
    }

    format_message(message){
        if(message == ''){
            return '...'
        }
        return message
    }

    get_convo_messages(){
        var video = this.state.videos[this.state.pos];
        const chain_messages = this.props.app_state.object_messages[video['video_id']] == null ? [] : this.props.app_state.object_messages[video['video_id']]
        const socket_messages = this.props.app_state.socket_object_messages[video['video_id']+video['object']['e5_id']] == null ? [] : this.props.app_state.socket_object_messages[video['video_id']+video['object']['e5_id']]
        const all_messages = this.sortByAttributeDescending(chain_messages.concat(socket_messages), 'time')
        return this.filter_messages_for_blocked_accounts(all_messages)
    }

    filter_messages_for_blocked_accounts(objects){
        var blocked_account_obj = this.get_all_sorted_objects(this.props.app_state.blocked_accounts)
        var blocked_accounts = []
        blocked_account_obj.forEach(account => {
            if(!blocked_accounts.includes(account['id'])){
                blocked_accounts.push(account['id'])
            }
        });
        var filtered_objects = [];
        objects.forEach(object => {
            if(!blocked_accounts.includes(object['sender'])){
                filtered_objects.push(object)
            }
        })

        if(this.props.app_state.masked_content == 'hide'){
            return filtered_objects
        }
        return objects;
    }

    get_stacked_items(){
        var video = this.state.videos[this.state.pos];
        var convo_id = video['video_id']

        var stack = this.props.app_state.stack_items
        var stacked_items = []
        for(var i=0; i<stack.length; i++){
            if(stack[i].type == this.props.app_state.loc['3030b']/* 'video-comment-messages' */){
                for(var e=0; e<stack[i].messages_to_deliver.length; e++){
                    var message_obj = stack[i].messages_to_deliver[e]
                    if(message_obj['id'] == convo_id){
                        stacked_items.push(message_obj)
                    }
                }
            }
        }
        return stacked_items
    }

    get_focused_message_replies(){
        var focused_message = this.get_focused_message()
        var all_messages = this.get_convo_messages().concat(this.get_stacked_items())
        var replies = []
        for(var i=0; i<all_messages.length; i++){
            if(all_messages[i]['focused_message_id'] != null && focused_message['message_id'] != null &&  all_messages[i]['focused_message_id'] == focused_message['message_id']){
                replies.push(all_messages[i])
            }
        }
        return replies
    }

    get_message_replies(item){
        var all_messages = this.get_convo_messages().concat(this.get_stacked_items())
        var replies = []
        for(var i=0; i<all_messages.length; i++){
            if(all_messages[i]['focused_message_id'] != null && item['message_id'] != null &&  all_messages[i]['focused_message_id'] == item['message_id']){
                replies.push(all_messages[i])
            }
        }
        return replies
    }

    get_focused_message(){
        var video = this.state.videos[this.state.pos];
        return this.state.focused_message[video['video_id']]
    }

    when_entered_text_input_field_changed(text){
        if(text.length > this.props.app_state.max_input_text_length){
            this.show_add_comment_bottomsheet()
        }else{
            this.setState({entered_text: text})
        }
    }

    add_message_to_stack(){
        var message = this.state.entered_text.trim()
        var video = this.state.videos[this.state.pos];
        var object = this.state.object
        var message_id = Date.now()
        var focused_message_id = this.get_focused_message() != null ? this.get_focused_message()['message_id'] : 0

        var comments_disabled_option = this.get_selected_item2(object['ipfs'].get_disabled_comments_section, 'e')
        var posts_author = object['author']
        var me = this.props.app_state.user_account_id[object['e5']]
        if(comments_disabled_option == 1 && me != posts_author){
            this.props.notify(this.props.app_state.loc['2759']/* The comment section has been disabled by the posts author. */, 4500)
            return
        }

        if(message == ''){
            this.props.notify(this.props.app_state.loc['1695']/* 'Type something first.' */, 1600)
        }
        else if(this.props.app_state.user_account_id[this.props.app_state.selected_e5] == 1){
            this.props.notify(this.props.app_state.loc['1696']/* 'You need to make at least 1 transaction to participate.' */, 1200)
        }
        else{
            var tx = {'id':video['video_id'], type:'message', entered_indexing_tags:['send', 'message'], 'message':message, 'sender':this.props.app_state.user_account_id[this.props.app_state.selected_e5], 'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id, 'videopost_id':object['id'], 'e5':object['e5'], 'sender_e5':this.props.app_state.selected_e5, 'lan':this.props.app_state.device_language, 'markdown':''}

            this.props.add_video_message_to_stack_object(tx)

            this.setState({entered_text:''})
            // this.props.notify(this.props.app_state.loc['1697']/* 'Message added to stack.' */, 1600)
            
            if (this.messagesEnd.current){
                this.messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }






    render_all_comments(){
        var sorted_messages_in_tree = this.get_message_replies_in_sorted_object()
        return(
            <div>
                {sorted_messages_in_tree.children.map((item, index) => (
                    <li style={{'padding': '1px 5px 0px 5px'}} onClick={()=>console.log()}>
                        <div >
                            {this.render_main_comment(item, 0)}
                            <div style={{height:3}}/>
                        </div>
                    </li>
                ))}    
            </div>
        )
    }

    render_main_comment(comment, depth){
        return(
            <div>
                <div style={{'padding': '1px 0px 0px 0px'}} onClick={()=> this.when_message_item_clicked(comment.data.message)}>
                    {this.render_message_as_focused_if_so(comment.data.message)}
                </div>

                {this.render_message_children(comment, depth)}
            </div>
        )
    }

    render_message_children(comment, depth){
        var padding = depth > 4 ? '0px 0px 0px 5px' : '0px 0px 0px 20px'
        if(!this.state.hidden_message_children_array.includes(comment.data.message['message_id'])){
            return(
                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px'}}>
                    <div style={{width:'100%'}}>
                        <ul style={{ 'padding': padding, 'listStyle':'none'}}>
                            {comment.children.map((item, index) => (
                                <li style={{'padding': '4px 0px 0px 0px'}}>
                                    <div>
                                        {this.render_main_comment(item, depth+1)}
                                        <div style={{height:3}}/>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }
    }

    when_message_item_clicked(message){
        var clone = this.state.hidden_message_children_array.slice();
        
        if(clone.includes(message['message_id'])){
            var index = clone.indexOf(message['message_id']);
            if(index > -1){
                clone.splice(index, 1);
            }
        }else{
            clone.push(message['message_id'])
        }

        this.setState({hidden_message_children_array:clone})
    }

    get_message_replies_in_sorted_object(){
        var messages = this.get_convo_messages().concat(this.get_stacked_items())
        var data = []
        messages.forEach(message => {
            data.push({ index : message['message_id'], sort : message['time'], parent : message['focused_message_id'], message: message })
        });
        var tree = toTree(data);
        return tree;
    }















    get_all_sorted_objects(object){
        var all_objects = []
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]
            var e5_objects = object[e5]
            if(e5_objects != null){
                all_objects = all_objects.concat(e5_objects)
            }
        }
        return this.sortByAttributeDescending(all_objects, 'timestamp')
    }

    sortByAttributeDescending(array, attribute) {
      return array.sort((a, b) => {
          if (a[attribute] < b[attribute]) {
          return 1;
          }
          if (a[attribute] > b[attribute]) {
          return -1;
          }
          return 0;
      });
    }

    get_all_sorted_objects_mappings(object){
        var all_objects = {}
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]
            var e5_objects = object[e5]
            var all_objects_clone = structuredClone(all_objects)
            all_objects = { ...all_objects_clone, ...e5_objects}
        }

        return all_objects
    }


    render_empty_views(size){
        var items = []
        for(var i=0; i<size; i++){
            items.push(i)
        }
        
        return(
            <div>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '2px'}}>
                            <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                <div style={{'margin':'10px 20px 10px 0px'}}>
                                    <img alt="" src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }

    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var size = this.props.screensize
        var width = size == 'm' ? this.props.app_state.width/2 : this.props.app_state.width
        var uploaded_data = {}
        if(item_id == '8' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12')uploaded_data = this.props.app_state.uploaded_data
        return(
            <div>
                <ViewGroups show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={width} show_images={this.props.show_images.bind(this)}/>
            </div>
        )

    }

    get_number_width(number){
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
    }


    /* gets a formatted time diffrence from now to a given time */
    get_time_difference(time){
        var number_date = Math.round(parseInt(time));
        var now = Math.round(new Date().getTime()/1000);

        var diff = now - number_date;
        return this.get_time_diff(diff)
    }

    get_time_diff(diff){
        if(diff < 60){//less than 1 min
            var num = diff
            var s = num > 1 ? 's': '';
            return num+ this.props.app_state.loc['29']
        }
        else if(diff < 60*60){//less than 1 hour
            var num = Math.floor(diff/(60));
            var s = num > 1 ? 's': '';
            return num + this.props.app_state.loc['30'] 
        }
        else if(diff < 60*60*24){//less than 24 hours
            var num = Math.floor(diff/(60*60));
            var s = num > 1 ? 's': '';
            return num + this.props.app_state.loc['31'] + s;
        }
        else if(diff < 60*60*24*7){//less than 7 days
            var num = Math.floor(diff/(60*60*24));
            var s = num > 1 ? 's': '';
            return num + this.props.app_state.loc['32'] + s;
        }
        else if(diff < 60*60*24*7*53){//less than 1 year
            var num = Math.floor(diff/(60*60*24*7));
            var s = num > 1 ? 's': '';
            return num + this.props.app_state.loc['33'] + s;
        }
        else {//more than a year
            var num = Math.floor(diff/(60*60*24*7*53));
            var s = num > 1 ? 's': '';
            return num + this.props.app_state.loc['34'] + s;
        }
    }

}




export default FullVideoPage;