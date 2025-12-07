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
import React, { Component, useEffect, useRef, useState, useCallback } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import Slider from './../components/slider'
import { LiveAudioVisualizer } from "react-audio-visualize";
import TextInput from './../components/text_input';
import { motion, AnimatePresence } from "framer-motion";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import Linkify from "linkify-react";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Virtuoso } from "react-virtuoso";

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

// Component for visualizing local microphone audio
const LocalAudioVisualizer = ({ stream, theme, width }) => {
  const [mediaRecorder, setMediaRecorder] = useState(null);

  useEffect(() => {
    if (!stream){
        console.error('socket_call_stuff','LocalAudioVisualizer', 'stream is null.');
        return;
    } 

    try {
      // Create MediaRecorder from the stream
      const recorder = new MediaRecorder(stream);
      recorder.start(100);
      setMediaRecorder(recorder);

      return () => {
        if (recorder.state !== 'inactive') {
          recorder.stop();
        }
      };
    } catch (error) {
      console.error('Error creating MediaRecorder:', error);
    }
  }, [stream]);

  if (!mediaRecorder || !stream) {
    return (
      <div style={{ padding: '1px' }}>
        <p style={{ margin: 0, color: theme['primary_text_color'] }}>
          {stream ? '...' : 'xxxxxxxxxxxxxxxxxxxxx'}
        </p>
      </div>
    );
  }

  return (
    <div>
      <LiveAudioVisualizer mediaRecorder={mediaRecorder} width={width-35} height={67} barWidth={3} gap={2} barColor={theme['slider_color']} backgroundColor="transparent" />
    </div>
  );
};

// Component for visualizing remote peer audio
const RemotePeerAudio = ({ peer, theme, peerId, onVolumeChange, isTalking, onStreamReceived, width }) => {
    const audioRef = useRef();
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const animationFrameRef = useRef(null);
    const [has_set_streams, set_has_set_streams] = useState(false);

    const handleStream = useCallback(async (stream) => {
        // console.log('socket_stuff2', 'Received remote stream from:', peerId, stream);
        const audioTracks = stream.getAudioTracks();
        // console.log('socket_stuff2', 'Audio tracks:', audioTracks);
        if (audioTracks.length === 0) {
            // console.error('socket_stuff2', 'No audio tracks in remote stream!');
        }
        audioTracks.forEach((track, i) => {
            if (!track.enabled) {
                track.enabled = true;
                console.log('socket_stuff2','Enabled disabled track');
            }
        });

        if (audioRef.current) {
            // console.log('socket_stuff2', 'audioRef is not null', audioRef.current)
            audioRef.current.srcObject = stream;
            audioRef.current.volume = 1.0;

            audioRef.current.load();

            // Add loadedmetadata event listener
            audioRef.current.addEventListener('loadedmetadata', () => {
                // console.log('socket_stuff2', 'Audio metadata loaded for', peerId);
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            console.log('socket_stuff2','✅ Audio playing successfully for', peerId);
                        })
                        .catch(err => {
                            console.error('socket_stuff2','❌ Error playing audio:', err);
                            // Try again on next user interaction
                            document.addEventListener('click', () => {
                                audioRef.current?.play();
                            }, { once: true });
                        });
                }else{
                    console.error('socket_stuff2','Audio playPromise is undefined');
                }
            });
        }else{
            console.log('socket_stuff2', 'audioRef.current is null', audioRef.current)
        }

        // Create MediaRecorder for visualization
        try {
            const recorder = new MediaRecorder(stream);
            recorder.start(250);
            setMediaRecorder(recorder);
            console.log('socket_stuff2','set media recorder', recorder, stream);

            // Create audio context for volume analysis
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            if (audioContext.state === 'suspended') {
                audioContext.resume().then(() => {
                    console.log('socket_stuff2','AudioContext resumed');
                });
            }
            const analyser = audioContext.createAnalyser();
            const source = audioContext.createMediaStreamSource(stream);
            analyser.fftSize = 256;
            source.connect(analyser);
            audioContextRef.current = audioContext;
            analyserRef.current = analyser;

            // Start volume monitoring
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            const checkVolume = () => {
                analyser.getByteFrequencyData(dataArray);
                
                // Calculate average volume
                const sum = dataArray.reduce((a, b) => a + b, 0);
                const average = sum / dataArray.length;
                
                if (onVolumeChange) {
                    onVolumeChange(peerId, average);
                }
                
                animationFrameRef.current = requestAnimationFrame(checkVolume);
            };
            checkVolume();

            if (onStreamReceived) {
                onStreamReceived(stream);
            }
        } catch (error) {
            console.error('socket_stuff2','Error creating MediaRecorder for remote stream:', error);
        }

        if(has_set_streams != true){
            set_has_set_streams(true)
        }

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close();
            }
        };
    }, [peerId, onVolumeChange, onStreamReceived, set_has_set_streams, has_set_streams]);

    useEffect(() => {
        if (!peer) return;

        peer.off("stream", handleStream);
        peer.on("stream", handleStream);

        const onClick = () => audioRef.current?.play().catch(()=>{});
        document.body.addEventListener('click', onClick);

        if(peer.stream != null && has_set_streams != true){
            handleStream(peer.stream)
            set_has_set_streams(true)
        }

        return () => {
            peer.off("stream", handleStream);
            document.body.removeEventListener('click', onClick);
        };
    }, [peer, handleStream, set_has_set_streams, has_set_streams]);

    return (
        <div style={{}}>
            {mediaRecorder == null ? (
                <div>
                    <div style={{ padding: '10px', borderRadius: '5px' }}>
                        <p style={{ margin: 0, color: theme['primary_text_color'] }}> ....... </p>
                    </div>
                </div>
            ) : (
                <div>
                    <div style={{}}>
                        <LiveAudioVisualizer mediaRecorder={mediaRecorder} width={width-35} height={44} barWidth={3} gap={2} barColor={theme['slider_color']} backgroundColor="transparent" />
                    </div>
                </div>
            )}
            <audio ref={audioRef} autoPlay controls playsInline style={{ width: 0, height: 0, opacity: 0, display: 'none' }}/>
        </div>
    );
};

class CallPage extends Component {
    
    state = {
        selected: 0, get_call_page_tags_object: this.get_call_page_tags_object(), 
        localVolume: 0, peerVolumes: {}, loudestSpeaker: null, volumeThreshold: 20,
        get_pitch_shift_tags_object: this.get_pitch_shift_tags_object(this.props.app_state.pitchShift), entered_text:'', focused_message:{'tree':{}}, comment_structure_tags: this.get_comment_structure_tags(), screen_width:0
    };


    get_call_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['3091']/* 'metadata' */, this.props.app_state.loc['3091a']/* 'participants' */, this.props.app_state.loc['3091b']/* 'chat' */], [1]
            ],
        };
    }

    get_pitch_shift_tags_object(shift){
        var pitch_obj = { '-6': 1,'-3': 2,'-1': 3, '0': 4, '1': 5,'3': 6,'6': 7 }
        const p = pitch_obj[shift.toString()] || 0
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], [ 'e', this.props.app_state.loc['3091y']/* 'very-low' */, this.props.app_state.loc['3091z']/* 'low' */, this.props.app_state.loc['3091ba']/* 'slightly-low' */, this.props.app_state.loc['3091bb']/* 'normal' */, this.props.app_state.loc['3091bc']/* 'slightly-high' */, this.props.app_state.loc['3091bd']/* 'high' */, this.props.app_state.loc['3091be']/* 'very-high' */, ], [p]
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







    set_data(){
        
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_call_page_tags_object} tag_size={'l'} when_tags_updated={this.when_get_call_page_tags_object_updated.bind(this)} theme={this.props.theme}/>

                {this.render_everything()}
            </div>
        )
    }

    when_get_call_page_tags_object_updated(tag_obj){
        this.setState({get_call_page_tags_object: tag_obj})
    }

    render_everything(){
        var size = this.props.app_state.size
        if(size == 's'){
            return(
                <div ref={this.screen}>
                    {this.render_small_selector()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 0px 10px'}}>
                        {this.render_metadata_stuff()}
                    </div>
                    <div ref={this.screen} className="col-6" style={{'padding': '10px 10px 0px 10px'}}>
                        {this.render_medium_selector()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-4" style={{'padding': '10px 10px 0px 10px'}}>
                        {this.render_metadata_stuff()}
                    </div>
                    <div ref={this.screen} className="col-4" style={{'padding': '10px 10px 0px 10px'}}>
                        {this.render_participants_stuff()}
                    </div>
                    <div className="col-4" style={{'padding': '10px 10px 0px 10px'}}>
                        {this.render_chat_stuff()}
                    </div>
                </div>
                
            )
        }
    }

    render_small_selector(){
        const selected_item = this.get_selected_item(this.state.get_call_page_tags_object, 'e')

        if(selected_item == this.props.app_state.loc['3091']/* 'metadata' */){
            return(
                <div>
                    {this.render_metadata_stuff()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['3091a']/* 'participants' */){
            return(
                <div>
                    {this.render_participants_stuff()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['3091b']/* 'chat' */){
            return(
                <div>
                    {this.render_chat_stuff()}
                </div>
            )
        }
    }

    render_medium_selector(){
        const selected_item = this.get_selected_item(this.state.get_call_page_tags_object, 'e')

        if(selected_item == this.props.app_state.loc['3091']/* 'metadata' */ || selected_item == this.props.app_state.loc['3091a']/* 'participants' */){
            return(
                <div>
                    {this.render_participants_stuff()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['3091b']/* 'chat' */){
            return(
                <div>
                    {this.render_chat_stuff()}
                </div>
            )
        }
    }





    get_max_height(){
        const index = this.props.app_state.opened_bottomsheets.indexOf('open_view_call_interface_bottomsheet')
        if(index > 0){
            return this.props.height-190
        }
        else{
            return this.props.height-145
        }
    }

    render_metadata_stuff(){
        const formatted_call_id = (str) => {
            if(str.startsWith('e')){
                return str.slice(0, 4) + " " + str.slice(4, 8) + " " + str.slice(8, 12)+ " " + str.slice(12);
            }else{
                return str.slice(0, 3) + " " + str.slice(3, 7) + " " + str.slice(7, 11)+ " " + str.slice(11);
            }
        }
        const format_call_duration = () => {
            if(this.props.app_state.call_duration == null){
                return '00:00:00'
            }
            const totalSeconds = Math.floor(this.props.app_state.call_duration / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            return `${hours<10 ? (hours<1 ? '0': '0'):''}${hours}:${minutes<10 ? (minutes<1 ? '0': '0'):''}${minutes}:${seconds<10 ? (seconds<1 ? '0': '0'):''}${seconds}`
        }
        const maxheight = this.get_max_height()
        return(
            <div style={{maxHeight: maxheight, 'overflow':'auto'}}>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    <div onClick={() => this.copy_call_id_to_clipboard(this.props.app_state.current_call_id)}>
                        {this.render_detail_item('10', {'text':formatted_call_id(this.props.app_state.current_call_id), 'textsize':'25px', 'font':this.props.app_state.font})}
                    </div>
                    <div style={{'padding':'0px 0px 0px 0px'}}>
                        {this.render_detail_item('10', {'text':this.props.app_state.loc['3055ib']/* Call Identifier. */, 'textsize':'12px', 'font':this.props.app_state.font})} 
                    </div>
                </div>
                
                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':''+(new Date(this.props.app_state.call_join_time).toLocaleString()), 'details':this.get_time_diff(Math.round(Date.now()/1000) - (parseInt(this.props.app_state.call_join_time/1000)))+this.props.app_state.loc['1698a']/* ' ago' */, 'size':'l'})}
                
                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    <div>
                        {this.render_detail_item('10', {'text':format_call_duration(), 'textsize':'20px', 'font':this.props.app_state.font})}
                    </div>
                    <div style={{'padding':'0px 0px 0px 0px'}}>
                        {this.render_detail_item('10', {'text':this.props.app_state.loc['3091r']/* Call Duration. */, 'textsize':'12px', 'font':this.props.app_state.font})} 
                    </div>
                </div>
                
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.current_call_password == '' ? this.props.app_state.loc['3091e']/* 'Disabled */ : this.props.app_state.loc['3091d']/* 'Enabled */, 'details':this.props.app_state.loc['3091c']/* 'Encrypted */, 'size':'l'})}
                
                {this.props.app_state.isRecording == true && (
                    <div>
                        <div style={{height:10}}/>
                        {this.render_detail_item('3', {'details': this.props.app_state.loc['3091bo']/* 'You\'re recording this call. */, 'title':this.props.app_state.loc['3091bp']/* '🔴 Call Record. */, 'size':'l'})}
                    </div>
                )}

                {this.props.app_state.isMuted == true && (
                    <div>
                        <div style={{height:10}}/>
                        {this.render_detail_item('3', {'details': this.props.app_state.loc['3091bs']/* 'Youre muted and the others cant hear you. */, 'title':this.props.app_state.loc['3091br']/* 'You\'re Muted. */, 'size':'l'})}
                    </div>
                )}

                <div style={{height:10}}/>
                {this.render_socket()}

                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3091v']/* 'Pitch Shift. */, 'details':this.props.app_state.loc['3091w']/* 'You can shift the pitch of your voice to be high or low. */, 'size':'l'})}
                {this.render_detail_item('10', {'text':this.props.app_state.loc['3091x']/* This does NOT anonymise you. */, 'textsize':'9px', 'font':this.props.app_state.font})}

                <Slider value={this.get_pitch_shift()}  whenNumberChanged={(e)=>this.when_number_input_slider_changed(e)} unitIncrease={()=>this.when_number_slider_button_tapped()} unitDecrease={()=>this.when_number_slider_button_double_tapped()} theme={this.props.theme}/>
                
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_pitch_shift_tags_object} tag_size={'l'} when_tags_updated={this.when_get_pitch_shift_tags_object_updated.bind(this)} theme={this.props.theme}/>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3091f']/* 'Mute Youreself. */, 'details':this.props.app_state.loc['3091g']/* 'Mute yourself from being heard by others on the call. */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.props.toggleMute()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.isMuted == true ? this.props.app_state.loc['3091h']/* 'Unmute' */: this.props.app_state.loc['3091i']/* 'Mute' */, 'action':''},)}
                </div>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3091k']/* 'Leave Call. */, 'details':this.props.app_state.loc['3091l']/* 'Leave the call and close your connection with your peers. */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.props.leave_call_confirmation()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3091m']/* 'Leave Call' */, 'action':''},)}
                </div>

                {this.render_detail_item('0')}
                {this.render_detail_item('0')}
            </div>
        )
    }

    get_pitch_shift(){
        return ((this.props.app_state.pitchShift + 6) / 12) * 999
    }

    when_number_input_slider_changed(e){
        const new_number = parseInt(e.target.value)
        const new_pitch = ((new_number / 999) * 12) - 6
        this.props.setPitchShift(new_pitch)
        if(this.get_selected_item(this.state.get_pitch_shift_tags_object, 'e') != 'e'){
            this.setState({get_pitch_shift_tags_object: this.get_pitch_shift_tags_object(new_pitch)})
        }
    }

    when_number_slider_button_tapped(){
        const current_pitch_shift = this.get_pitch_shift()
        const new_number = (current_pitch_shift + 1) > 999 ? current_pitch_shift : current_pitch_shift + 1;
        const new_pitch = ((new_number / 999) * 12) - 6
        this.props.setPitchShift(new_pitch)
        if(this.get_selected_item(this.state.get_pitch_shift_tags_object, 'e') != 'e'){
            this.setState({get_pitch_shift_tags_object: this.get_pitch_shift_tags_object(new_pitch)})
        }
    }

    when_number_slider_button_double_tapped(){
        const current_pitch_shift = this.get_pitch_shift()
        const new_number = (current_pitch_shift - 1) < 0 ? current_pitch_shift : current_pitch_shift - 1;
        const new_pitch = ((new_number / 999) * 12) - 6
        this.props.setPitchShift(new_pitch)
        if(this.get_selected_item(this.state.get_pitch_shift_tags_object, 'e') != 'e'){
            this.setState({get_pitch_shift_tags_object: this.get_pitch_shift_tags_object(new_pitch)})
        }
    }

    copy_call_id_to_clipboard(text){
        navigator.clipboard.writeText(text)
        this.props.notify(this.props.app_state.loc['3055ia']/* 'Call ID copied to clipboard.' */, 1600)
    }

    render_socket(){
        const item = this.load_my_socket_nitro_object()
        var object = item
        var default_image = this.props.app_state.static_assets['empty_image']
        var image = object['ipfs'] == null ? default_image : (object['ipfs'].album_art == null ? default_image : object['ipfs'].album_art)
        var title = this.props.app_state.loc['3091q']/* Socket Connection */+' • '+item['id']
        var details = object['ipfs'] == null ? '' : (object['ipfs'].entered_title_text)
        return(
            <div>
                {this.render_detail_item('8', {'title':title, 'image':image,'details':details, 'size':'l', 'border_radius':'9px'})}
            </div>
        )
    }

    load_my_socket_nitro_object(){
        const preferred_nitro = this.props.app_state.my_preferred_nitro == '' ? this.props.app_state.default_nitro_e5_id : this.props.app_state.my_preferred_nitro
        var all_nitros = this.get_all_sorted_objects(this.props.app_state.created_nitros)
        const index = all_nitros.findIndex(item => item['e5_id'] == preferred_nitro);
        return all_nitros[index]
    }

    when_get_pitch_shift_tags_object_updated(tag_obj){
        this.setState({get_pitch_shift_tags_object: tag_obj})
        const selected_item = this.get_selected_item(tag_obj, 'e')
        
        const pitch_obj = {}
        pitch_obj[this.props.app_state.loc['3091y']/* 'very-low' */] = -6
        pitch_obj[this.props.app_state.loc['3091z']/* 'low' */] = -3
        pitch_obj[this.props.app_state.loc['3091ba']/* 'slightly-low' */] = -1
        pitch_obj[this.props.app_state.loc['3091bb']/* 'normal' */] = 0
        pitch_obj[this.props.app_state.loc['3091bc']/* 'slightly-high' */] = 1
        pitch_obj[this.props.app_state.loc['3091bd']/* 'high' */] = 3
        pitch_obj[this.props.app_state.loc['3091be']/* 'very-high' */] = 6
        pitch_obj['e'] = 0

        const new_pitch = pitch_obj[selected_item]
        this.props.setPitchShift(new_pitch)
    }






    componentDidMount(){
        this.setState({screen_width: this.screen.current.offsetWidth})
    }

    render_participants_stuff(){
        const my_account = this.props.app_state.user_account_id[this.props.app_state.selected_e5]
        const maxheight = this.get_max_height()
        const width = this.props.screensize == 'm' ? this.state.screen_width - 20 : this.state.screen_width
        return(
            <div style={{maxHeight: maxheight, 'overflow':'auto'}}>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3091s']/* 'Call Participants.' */, 'details':this.props.app_state.loc['3091t']/* 'The call participants are shown below. */, 'size':'l'})}
                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    <LocalAudioVisualizer stream={this.props.app_state.processedStream} theme={this.props.theme} width={width}/>
                    <div style={{'padding':'0px 0px 0px 0px'}}>
                        {this.render_detail_item('10', {'text':this.props.app_state.loc['3091u']/* $ • you */.replace('$', my_account), 'textsize':'12px', 'font':this.props.app_state.font})} 
                    </div>
                </div>
                {this.render_detail_item('0')}
                {this.render_other_connected_peers()}
            </div>
        )
    }

    render_other_connected_peers(){
        const width = this.props.screensize == 'm' ? this.state.screen_width - 20 : this.state.screen_width
        var w = (width / 2) - 5
        var col = 2
        var rowHeight = 130
        if(this.props.app_state.peers.length == 0){
            var items = ['1','1']
            return(
                <div>
                    <ImageList sx={{ width: 'auto', height: 'auto' }} cols={col} rowHeight={rowHeight}>
                        {items.map((item, index) => (
                            <ImageListItem key={index}>
                                {this.render_peer_empty_item(w)}
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            )
        }

        const peer_items = this.props.app_state.peers
        return(
            <div>
                <ImageList sx={{ width: 'auto', height: 'auto' }} cols={col} rowHeight={rowHeight}>
                    <Virtuoso
                        style={{ height: this.props.height-300 }}
                        totalCount={peer_items.length}
                        itemContent={(index) => {
                            const peerObj = peer_items[index];
                            return (
                                <div>
                                    <AnimatePresence initial={true}>
                                        <motion.div key={peerObj.peerId} initial={{ opacity: 0, scale:0.95 }} animate={{ opacity: 1, scale:1 }} exit={{ opacity: 0, scale:0.95 }} transition={{ duration: 0.3 }} onClick={() => console.log()} whileTap={{ scale: 0.9, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] } }} style={{'padding': '0px'}}>
                                            <ImageListItem key={index}>
                                                <div>
                                                    {this.render_peer_item(peerObj, w)}
                                                </div>
                                            </ImageListItem>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            );
                        }}
                    />
                </ImageList>
            </div>
        )
    }

    render_peer_empty_item(w){
        var background_color = this.props.theme['card_background_color']
        return(
            <div style={{height:130, width:w, 'background-color': background_color, 'border-radius': '5px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                <div style={{'margin':'0px 0px 0px 0px'}}>
                    <img alt="" src={this.props.app_state.theme['letter']} style={{height:40 ,width:'auto'}} />
                </div>
            </div>
        )
    }

    render_peer_item(peerObj, width){
        return(
            <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '5px 3px 5px 3px','padding': '10px 5px 5px 5px','border-radius': '8px', border: this.state.loudestSpeaker === peerObj.peerId ? `3px solid ${this.props.theme['slider_color']}` : '3px solid transparent', borderRadius: '8px', transition: 'border 0.2s ease'}}>
                <RemotePeerAudio peer={peerObj.peer} theme={this.props.theme} peerId={peerObj.peerId} onVolumeChange={this.handlePeerVolumeChange} isTalking={this.state.loudestSpeaker === peerObj.peerId} onStreamReceived={(stream) => this.props.handleRemoteStreamReceived(peerObj.peerId, stream)} width={width}
                />
                {this.render_added_accounts(peerObj.peerId)}
            </div>
        )
    }

    render_added_accounts(address){
        const room_participants = this.props.app_state.my_active_call_room_participants[this.props.app_state.current_call_id] || {}
        const address_accounts = room_participants[address] || []
        var items = [].concat(address_accounts)
        if(items.length == 0){
            items = [1, 2]
            return(
                <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_empty_horizontal_list_item()}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }else{
            var items2 = [0, 1]
            return(
                <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_included_account_item(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_included_account_item(item){
        const title = item['e5']+' • '+ item['id']
        const details = this.get_sender_title_text2(item['id'], item['e5']) || this.props.app_state.loc['3055ht']/* Unknown */
        return(
            <div>
                {this.render_detail_item('3', {'title':title, 'details':details, 'size':'s'})}
            </div>
        )
    }

    get_sender_title_text2(account, e5){
        if(account == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            const bucket = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
            var alias = (bucket[account] == null ? null : bucket[account])
            return alias
        }
    }

    get_sender_title_text(item){
        const account = item['sender']
        const e5 = item['e5']
        if(account == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            const bucket = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
            var alias = (bucket[account] == null ? account : bucket[account])
            return alias
        }
    }

    render_empty_horizontal_list_item(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div>
                <div style={{height:43, width:127, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                    </div>
                </div>
            </div>
        )
    }

    handlePeerVolumeChange = (peerId, volume) => {
        this.setState(prevState => ({
            peerVolumes: {
                ...prevState.peerVolumes,
                [peerId]: volume
            }
        }), () => {
            this.updateLoudestSpeaker();
        });
    }

    updateLoudestSpeaker = () => {
        const { localVolume, peerVolumes, volumeThreshold } = this.state;
        
        // Only consider volumes above threshold
        if (localVolume < volumeThreshold && Object.values(peerVolumes).every(v => v < volumeThreshold)) {
            this.setState({ loudestSpeaker: null });
            return;
        }

        let maxVolume = localVolume;
        let loudest = 'local';

        Object.entries(peerVolumes).forEach(([peerId, volume]) => {
            if (volume > maxVolume) {
                maxVolume = volume;
                loudest = peerId;
            }
        });

        if (this.state.loudestSpeaker !== loudest) {
            this.setState({ loudestSpeaker: loudest });
        }
    }









    render_chat_stuff(){
        var he = this.get_max_height()-55
        if(this.get_focused_message() != null) he = this.get_max_height()-125
        he = he+30-(this.state.text_input_field_height == null ? 30 : 
            (this.state.text_input_field_height < 30 ? 30 : this.state.text_input_field_height));
        var side_buttons_margin_top = (this.state.text_input_field_height == null ? 0 : 
            (this.state.text_input_field_height-35 < 0 ? 0 : this.state.text_input_field_height-35))
        var size = this.props.size
        var ww = this.state.screen_width-50
        if(size == 's'){
            he+=10
        }
        if(size == 'm' || size == 'l'){
            ww = this.state.screen_width - 80
        }

        return(
            <div>
                <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px'}}>
                    <div onScroll={event => this.handleScroll(event)} style={{ 'overflow-y': 'auto', height: he, padding:'0px 0px 5px 0px'}}>
                        {this.render_top_title()}
                        <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px'}}/>
                        {this.render_sent_received_messages()}
                    </div>
                </div>
                <div style={{height:5}}/>
                {this.render_focused_message()}
                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 5px 0px', width: '99%'}}>
                    <div style={{'margin':`${side_buttons_margin_top}px 0px 0px 0px`}}>
                        <div>
                            <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}} onClick={()=> this.when_circle_clicked()}>
                                <img alt="" src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}}/>
                            </div>
                        </div>
                    </div>
                    <div style={{width:10}}/>
                    <div className="row" style={{width:ww}}>
                        <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                            <TextInput font={this.props.app_state.font} height={20} placeholder={this.props.app_state.loc['1039']/* 'Enter Message...' */} when_text_input_field_changed={this.when_entered_text_input_field_changed.bind(this)} when_text_input_field_height_changed={this.when_text_input_field_height_changed.bind(this)}  text={this.state.entered_text} theme={this.props.theme}/>
                        </div>
                        <div className="col-1" style={{'padding': '0px 10px 0px 0px'}}>
                            <div className="text-end" style={{'padding': '5px 0px 0px 0px', 'margin':`${side_buttons_margin_top}px 0px 0px 0px`}} >
                                <img alt="" className="text-end" onClick={()=>this.add_message_to_stack()} src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }

    when_text_input_field_height_changed(height){
        this.setState({text_input_field_height: height})
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
        this.has_user_scrolled = true
    };

    render_focused_message(){
        var item = this.get_focused_message();
        if(item != null){
            return(
                <div style={{'padding': '7px 15px 10px 15px','margin':'0px 70px 5px 50px', 'background-color': this.props.theme['messsage_reply_background'],'border-radius': '10px 10px 10px 10px'}} onClick={()=>this.unfocus_message()}> 
                    <div className="row" style={{'padding':'0px 0px 0px 0px'}}>
                        <div className="col-9" style={{'padding': '0px 0px 0px 14px', 'height':'20px' }}> 
                            <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} >{this.get_sender_title_text(item)}</p>
                        </div>
                        <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                            <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{this.get_time_difference(item['time'])}</p>
                        </div>
                    </div>
                    <p style={{'font-size': '11px','color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'white-space': 'pre-line'}}>{this.truncate(item['message'], 41)}</p>
                </div>
            )
        }
    }

    when_comment_structure_tags_updated(tag_obj){
        this.setState({comment_structure_tags: tag_obj})
    }

    show_add_comment_bottomsheet(){
        var focused_message_id = this.get_focused_message() != null ? this.get_focused_message() : 0
        this.props.show_add_comment_bottomsheet({'e5':this.props.app_state.selected_e5}, focused_message_id, 'call', this.props.app_state.current_call_id, this.state.entered_text)
    }

    render_top_title(){
        const formatted_call_id = (str) => {
            if(str.startsWith('e')){
                return str.slice(0, 4) + " " + str.slice(4, 8) + " " + str.slice(8, 12)+ " " + str.slice(12);
            }else{
                return str.slice(0, 3) + " " + str.slice(3, 7) + " " + str.slice(7, 11)+ " " + str.slice(11);
            }
        }
        return(
            <div style={{padding:'0px 5px 5px 5px'}}>
                {this.render_detail_item('3', {'title':formatted_call_id(this.props.app_state.current_call_id), 'details':this.props.app_state.loc['3091bf']/* 'Voice Call' */, 'size':'l'})}
            </div>
        )
    }

    constructor(props) {
        super(props);
        this.messagesEnd = React.createRef();
        this.screen = React.createRef()
        this.has_user_scrolled = false
    }

    componentDidUpdate(prevProps){
        var has_scrolled = this.has_user_scrolled;
        if(has_scrolled == null){
            this.scroll_to_bottom()
        }
        if(prevProps.width != this.props.width){
            this.setState({screen_width: this.screen.current.offsetWidth})
        }
    }

    render_sent_received_messages(){
        var items = [].concat(this.get_convo_messages())
        var final_items = this.append_divider_between_old_messages_and_new_ones(items)

        if(items.length == 0){
            items = [0,1]
            return(
                <div>
                    <div style={{}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    {this.props.app_state.socket_object_messages[this.props.app_state.current_call_id] == null ? this.render_small_skeleton_object() : this.render_small_empty_object()}
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
                        {this.render_messages(final_items)}
                        <div ref={this.messagesEnd}/>
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
    
    append_divider_between_old_messages_and_new_ones(items){
        if(items.length == 0) return [];
        const last_login_time = this.props.app_state.last_login_time
        const newElement = 'e';
        let closestIndex = 0;
        let minDiff = Infinity;
        items.forEach((obj, i) => {
            const diff = Math.abs(obj['message_id'] - last_login_time);
            if (diff < minDiff) {
                minDiff = diff;
                closestIndex = i;
            }
        });
        if(closestIndex == items.length - 1){
            return items
        }
        const clone = items.slice()
        clone.splice(closestIndex + 1, 0, newElement);
        return clone;
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
                                    {this.props.app_state.socket_object_messages[this.props.app_state.current_call_id] == null ? this.render_small_skeleton_object() : this.render_small_empty_object()}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    <Virtuoso
                        style={{ height: middle }}
                        totalCount={items.length}
                        itemContent={(index) => {
                            const item = items[index];
                            return (
                                <div>
                                    <AnimatePresence initial={true} mode="popLayout">
                                        <motion.div key={item['message_id']} initial={{ opacity: 0, scale:0.95 }} animate={{ opacity: 1, scale:1 }} exit={{ opacity: 0, scale:0.95 }} layout={true} transition={{ duration: 0.3 }} style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                            <div>
                                                {this.render_message_as_focused_if_so(item)}
                                                <div style={{height:3}}/>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            );
                        }}
                    />   
                </div>
            )
        }
        
    }

    render_small_empty_object(){
        return(
            <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'display': 'flex', 'align-items':'center','justify-content':'center'}}>
                <div style={{'margin':'10px 20px 10px 0px'}}>
                    <img alt="" src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                </div>
            </div>
        );
    }

    render_small_skeleton_object(){
        const styles = {
            container: {
                position: 'relative',
                width: '100%',
                height: 60,
                borderRadius: '15px',
                overflow: 'hidden',
            },
            skeletonBox: {
                width: '100%',
                height: '100%',
                borderRadius: '15px',
            },
            centerImage: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'auto',
                height: 30,
                objectFit: 'contain',
                opacity: 0.9,
            },
        };
        return(
            <div>
                <SkeletonTheme baseColor={this.props.theme['loading_base_color']} highlightColor={this.props.theme['loading_highlight_color']}>
                    <div style={styles.container}>
                        <Skeleton style={styles.skeletonBox} />
                        <img src={this.props.app_state.theme['letter']} alt="" style={styles.centerImage} />
                    </div>
                </SkeletonTheme>
            </div>
        )
    }

    focus_message(item){
        var clone = JSON.parse(JSON.stringify(this.state.focused_message))

        if(this.state.focused_message[this.props.app_state.current_call_id] != item){
            clone[this.props.app_state.current_call_id] = item
            if(clone['tree'][this.props.app_state.current_call_id] == null) {
                clone['tree'][this.props.app_state.current_call_id] = []
            }
            clone['tree'][this.props.app_state.current_call_id].push(item)
        }
        this.setState({focused_message: clone})
    }

    unfocus_message(){
        var clone = JSON.parse(JSON.stringify(this.state.focused_message))
        if(clone['tree'][this.props.app_state.current_call_id] != null){
            var index = this.get_index_of_item()
            if(index != -1){
                clone['tree'][this.props.app_state.current_call_id].splice(index, 1)
            }
        }

        var latest_message = clone['tree'][this.props.app_state.current_call_id].length > 0 ? clone['tree'][this.props.app_state.current_call_id][clone['tree'][this.props.app_state.current_call_id].length -1] : null
        clone[this.props.app_state.current_call_id] = latest_message
        this.setState({focused_message: clone})
    }

    get_index_of_item(){
        var focused_item = this.state.focused_message[this.props.app_state.current_call_id]
        var focused_items = this.state.focused_message['tree'][this.props.app_state.current_call_id]
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
        if(item == 'e'){
            return(
                <div>
                    {this.render_detail_item('16', {'message':this.props.app_state.loc['2117w']/* new */})}
                </div>
            )
        }
        
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
                            action: () => this.props.delete_message_from_stack(item, this.props.app_state.loc['1505']/* 'job-request-messages' */)
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
        var size = item['size'] == null ? '15px' : item['size'];
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

    format_message(message){
        if(message == ''){
            return '...'
        }
        return message
    }

    get_convo_messages(){
        const socket_messages = this.props.app_state.socket_object_messages[this.props.app_state.current_call_id] == null ? [] : this.props.app_state.socket_object_messages[this.props.app_state.current_call_id]
        const all_messages = this.sortByAttributeDescending(socket_messages, 'time').reverse()
        
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
        return []
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
        return this.state.focused_message[this.props.app_state.current_call_id]
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
        var message_id = Date.now()
        var focused_message_id = this.get_focused_message() != null ? this.get_focused_message()['message_id'] : 0
        if(message == ''){
            this.props.notify(this.props.app_state.loc['1695']/* 'Type something first.' */, 1600)
        }
        else if(this.props.app_state.user_account_id[this.props.app_state.selected_e5] == 1){
            this.props.notify(this.props.app_state.loc['1696']/* 'You need to make at least 1 transaction to participate.' */, 1200)
        }
        else{
            var tx = {'id':this.props.app_state.current_call_id, type:'message', entered_indexing_tags:['send', 'message'], 'message':message, 'sender':this.props.app_state.user_account_id[this.props.app_state.selected_e5], 'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id, 'e5':this.props.app_state.selected_e5, 'sender_e5':this.props.app_state.selected_e5, 'lan':this.props.app_state.device_language, 'markdown':''}

            this.props.add_call_page_message_to_stack_object(tx)

            this.setState({entered_text:''})
            // this.props.notify(this.props.app_state.loc['1697']/* 'Message added to stack.' */, 1600)
            
            if (this.messagesEnd.current){
                this.messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }

    render_focus_list(){
        var items = this.state.focused_message['tree'][this.props.app_state.current_call_id]

        if(items != null && items.length > 0){
            return(
                <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_focus_chain_item_clicked(item, index)}>
                                {this.render_detail_item('3', {'title':this.get_sender_title_text(item), 'details':this.shorten_message_item(this.format_message(item['message'])), 'size':'s'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    shorten_message_item(message){
        var return_val = message
        if(message.length > 10){
            return_val = message.substring(0, 10).concat('...');
        }
        return return_val
    }

    when_focus_chain_item_clicked(item, pos){
        var clone = JSON.parse(JSON.stringify(this.state.focused_message))

        var new_array = []
        for(var i=0; i<=pos; i++){
            new_array.push(clone['tree'][this.props.app_state.current_call_id][i])
        }
        clone[this.props.app_state.current_call_id] = item
        clone['tree'][this.props.app_state.current_call_id] = new_array
        
        this.setState({focused_message: clone})
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
  
    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
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

    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var uploaded_data = {}
        if(item_id == '8' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12')uploaded_data = this.props.app_state.uploaded_data
        return(
            <div>
                <ViewGroups show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
            </div>
        )
    }

    format_account_balance_figure(amount){
        if(amount == null){
            amount = 0;
        }
        if(amount < 1_000_000_000){
            return number_with_commas(amount.toString())
        }else{
            var power = amount.toString().length - 9
            return number_with_commas(amount.toString().substring(0, 9)) +'e'+power
        }
        
    }

    calculate_bar_width(num){
        if(num == null) return '0%'
        var last_two_digits = num.toString().slice(0, 1)+'0';
        if(num > 10){
            last_two_digits = num.toString().slice(0, 2);
        }
        return last_two_digits+'%'
    }

    format_power_figure(amount){
        if(amount == null){
            amount = 0;
        }
        if(amount < 1_000_000_000){
            return 'e0'
        }
        else{
            var power = amount.toString().length - 9
            return 'e'+(power+1)
        }
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

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
    }

    get_number_width(number){
        if(number == null) return '0%'
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
    }
}




export default CallPage;