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

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

class FullAudioPage extends Component {
    
    state = {
        selected: 0, songs:[], pos:0,
        value:0, play_pause_state:0,

        get_full_audio_tags_object:this.get_full_audio_tags_object(), active_lyric: -1,
        has_scrolled:false, is_shuffling:false, is_repeating:false, original_song_list:[],

        get_next_or_previous_songs_tags_object:this.get_next_or_previous_songs_tags_object(),
        buffer:0
    };

    get_full_audio_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['2988']/* 'data' */, this.props.app_state.loc['2990']/* 'queue' */, this.props.app_state.loc['2989']/* 'lyrics' */], [1]
            ],
        };
    }

    get_next_or_previous_songs_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['2996']/* 'up-next' */, this.props.app_state.loc['2997']/* 'previous' */], [1]
            ],
        };
    }

    set_data(queue, pos, play_pause_state, value, is_repeating, is_shuffling, original_song_list, buffer){
        this.setState({songs: queue, original_song_list: original_song_list, pos:pos, play_pause_state: play_pause_state, value: value, is_repeating: is_repeating, is_shuffling: is_shuffling, buffer:buffer})
    }

    constructor(props) {
        super(props);
        this.messagesEnd = React.createRef();
        this.itemRefs = [];
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_full_audio_tags_object} tag_size={'l'} when_tags_updated={this.when_get_full_audio_tags_object_updated.bind(this)} theme={this.props.theme}/>

                {this.render_everything()}
            </div>
        )
    }

    when_get_full_audio_tags_object_updated(tag_obj){
        this.setState({get_full_audio_tags_object: tag_obj})

        // var selected = this.get_selected_item(tag_obj, tag_obj['i'].active)
        // if (selected == this.props.app_state.loc['2990']/* 'queue' */ &&this.messagesEnd.current){
        //     this.messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
        // }
    }


    render_everything(){
        var size = this.props.app_state.size
        if(this.state.songs == null || this.state.songs.length == 0) return;
        if(size == 's'){
            return(
                <div>
                    {this.render_selector()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_player()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_selector2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-4" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_player()}
                    </div>
                    <div className="col-4" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_queue()}
                    </div>
                    <div className="col-4" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_lyrics()}
                    </div>
                </div>
                
            )
        }
    }

    render_selector(){
        var selected = this.get_selected_item(this.state.get_full_audio_tags_object, this.state.get_full_audio_tags_object['i'].active)

        if(selected == this.props.app_state.loc['2988']/* 'data' */){
            return(
                <div>
                    {this.render_player()}
                </div>
            )
        }
        else if(selected == this.props.app_state.loc['2989']/* 'lyrics' */){
            return(
                <div>
                    {this.render_lyrics()}
                </div>
            )
        }
        else if(selected == this.props.app_state.loc['2990']/* 'queue' */){
            return(
                <div>
                    {this.render_queue()}
                </div>
            )
        }
    }

    render_selector2(){
        var selected = this.get_selected_item(this.state.get_full_audio_tags_object, this.state.get_full_audio_tags_object['i'].active)

        if(selected == this.props.app_state.loc['2988']/* 'data' */ || selected == this.props.app_state.loc['2990']/* 'queue' */){
            return(
                <div>
                    {this.render_queue()}
                </div>
            )
        }
        else if(selected == this.props.app_state.loc['2989']/* 'lyrics' */){
            return(
                <div>
                    {this.render_lyrics()}
                </div>
            )
        }
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }





    render_player(){
        var song = this.state.songs[this.state.pos]
        var object = song['object']
        var default_image = this.props.app_state.static_assets['music_label']
        var image = object['ipfs'] == null ? default_image :object['ipfs'].album_art
        var song_title = song['song_title']
        var song_details = song['song_composer']
        return(
            <div>
                {this.render_detail_item('7', {'header':'', 'subtitle':'', 'image':image})}

                <div style={{'padding':'0px 10px 0px 10px', 'margin':'0px 0px 0px 0px'}}>
                    {this.render_detail_item('3', {'title':song_title, 'details':song_details, 'size':'l'})}
                </div>
                
                <div style={{height:24}}/>

                <div style={{'padding':'0px 15px 0px 15px', 'margin':'0px 0px 0px 0px'}}>
                    {this.render_seek_bar()}
                </div>

                <div className="row" style={{'margin':'7px 0px 0px 0px', 'padding':'0px 15px 0px 15px'}}>
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        <p style={{'font-size': '11px','color': this.props.theme['primary_text_color'],'font-family': this.props.font,'text-decoration': 'none'}}>{this.get_current_time()}</p>
                    </div>
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        <p className="text-end" style={{'font-size': '11px', 'color': this.props.theme['primary_text_color'],'font-family': this.props.font,'text-decoration': 'none', 'text-align':'right'}}>{this.get_remaining_time()}</p>
                    </div>
                </div>


                <div className="row" style={{'margin':'0px 0px 0px 0px', 'padding':'0% 10% 0% 10%'}}>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px', 'text-align':'center'}}>
                        
                    </div>
                    <div className="col-2" style={{'padding': '0px 0px 0px 0px', 'text-align':'center'}}>
                        {this.render_shuffle_button()}
                    </div>
                    <div className="col-2" style={{'padding': '0px 0px 0px 0px', 'text-align':'center'}}>
                        {this.render_previous_button()}
                    </div>
                    <div className="col-2" style={{'padding': '0px 0px 0px 0px', 'text-align':'center'}}>
                        {this.render_pause_button()}
                    </div>
                    <div className="col-2" style={{'padding': '0px 0px 0px 0px', 'text-align':'center'}}>
                        {this.render_next_button()}
                    </div>
                    <div className="col-2" style={{'padding': '0px 0px 0px 0px', 'text-align':'center'}}>
                        {this.render_repeat_button()}
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px', 'text-align':'center'}}>
                       
                    </div>
                </div>

                <div style={{'margin':'0px 0px 0px 0px'}}>
                    {this.render_detail_item('0')}
                </div>

                <div style={{'padding':'0px 0px 0px 0px', 'margin':'0px 0px 0px 0px'}}>
                    {this.render_track_details()}
                </div>
            </div>
        )
    }

    render_seek_bar(){
        var value = this.get_bar_length()
        var buffer = this.state.buffer
        var height = 4
        return(
            <div style={{ height: height, width: '100%', 'border-radius': '17px', 'box-shadow': '0px 0px 1px 1px '+this.props.theme['bar_shadow'], 'margin': '0px 0px 0px 0px' , 'position': 'relative'}}>
                
                <div className="progress" style={{ height: height, width: '100%', 'background-color': this.props.theme['bar_background_color'] , 'z-index':'1' , 'border-radius': '17px', 'position': 'absolute'}}>
                    <div className="progress-bar" role="progressbar" style={{ width: (value)+"%", 'background-image': 'none','background-color': this.props.theme['bar_color'] }} aria-valuenow="5" aria-valuemin="0" aria-valuemax="10"></div>

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

    when_buffer_updated(buffer){
        this.setState({buffer: buffer})
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




    when_time_updated(time){
        this.setState({value: time})
        var song = this.state.songs[this.state.pos]
        if(song != null && song['lyrics'] != null){
            var file_lyrics = null
            if(song['subtitle_type'] == 'upload'){
                const ecid_obj = this.get_cid_split(song['lyrics'])
                if(this.props.app_state.uploaded_data[ecid_obj['filetype']] != null){
                    var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
                    file_lyrics = data['lyrics']
                }
            }else{
                file_lyrics = song['lyrics']
            }
            const index = this.syncLyric(file_lyrics, time);
            if (this.itemRefs[index] != null && this.state.active_lyric != index && !this.state.has_scrolled){
                this.itemRefs[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            this.setState({active_lyric: index})
        }else{
            this.setState({active_lyric: -1})
        }
    }

    syncLyric(lyrics, time) {
        const scores = [];
        lyrics.forEach(lyric => {
            // get the gap or distance or we call it score
            const score = time - lyric.time;
            // only accept score with positive values
            if (score >= 0) scores.push(score);
        });
        if (scores.length == 0) return null;
        // get the smallest value from scores
        const closest = Math.min(...scores);
        // return the index of closest lyric
        return scores.indexOf(closest);
    }

    handleNumber = (number) => {
        var new_value = number.target.value
        var current_song = this.state.songs[this.state.pos]
        var current_song_length = parseInt(current_song['basic_data']['format']['duration'])
        
        var new_time = (new_value / 100) * current_song_length
        this.setState({value: new_time})
        this.props.update_time(number)
    }

    render_pause_button(){
        var image = this.state.play_pause_state == 1/* playing */ ? this.props.theme['pause']: this.props.theme['play']     
        var translate = this.state.play_pause_state == 1/* playing */ ? '0px 0px':'5px 0px'
        return(
            <img onClick={()=>this.play_pause()} alt="" src={image} style={{height:40 ,width:'auto', 'text-align':'center', 'translate': translate}}/>
        )
    }

    render_next_button(){
        var alpha = this.state.pos != this.state.songs.length - 1 ? 1.0 : 0.3
        return(
            <img onClick={()=>this.play_next()} alt="" src={this.props.theme['next']} style={{height:29 ,width:'auto', 'text-align':'center', 'opacity':alpha, 'margin':'6px 0px 0px 0px'}}/>
        )
    }

    render_previous_button(){
        var alpha = this.state.pos > 0 ? 1.0 : 0.3
        return(
            <img onClick={()=>this.play_previous()} alt="" src={this.props.theme['previous']} style={{height:29,width:'auto', 'text-align':'center', 'opacity':alpha, 'margin':'6px 0px 0px 0px'}}/>
        )
    }

    render_shuffle_button(){
        var alpha = this.state.is_shuffling == true ? 1.0 : 0.3
        return(
            <img onClick={()=>this.shuffle_songs()} alt="" src={this.props.theme['shuffle']} style={{height:23,width:'auto', 'text-align':'center', 'opacity':alpha, 'margin':'9px 0px 0px 0px'}}/>
        )
    }

    render_repeat_button(){
        var alpha = this.state.is_repeating == true ? 1.0 : 0.3
        return(
            <img onClick={()=>this.repeat_song()} alt="" src={this.props.theme['repeat']} style={{height:23,width:'auto', 'text-align':'center', 'opacity':alpha, 'margin':'9px 0px 0px 0px'}}/>
        )
    }







    play_pause(){
        this.props.play_pause()
        if(this.state.play_pause_state == 0/* paused */){
            console.log('playing')
            this.setState({play_pause_state: 1})
        }else{
            console.log('pausing')
            this.setState({play_pause_state: 0})
        }
    }

    play_previous(){
        if(this.state.pos > 0){
            this.props.play_previous()
            this.setState({pos: this.state.pos -1})
        }
    }

    play_next(){
        if(this.state.pos != this.state.songs.length - 1){
            this.props.play_next()
            this.setState({pos: this.state.pos +1})
        }
    }

    when_next_track_reached(){
        if(this.state.pos != this.state.songs.length - 1){
            this.setState({pos: this.state.pos +1})
        }
    }

    shuffle_songs(){
        if(this.state.is_shuffling == false){
            var next_songs = this.get_next_songs()
            var previous_songs = this.get_previous_songs()
            var current_song = this.state.songs[this.state.pos]
            var shuffled_list = [].concat(previous_songs)
            shuffled_list.push(current_song)
            if(next_songs.length > 0) {
                shuffled_list.push(shuffle(next_songs))
            }
            var its_pos = this.get_pos_of_item(current_song, shuffled_list)
            this.props.shuffle_songs_in_pip(shuffled_list, its_pos)
            this.setState({songs: shuffled_list, is_shuffling: !this.state.is_shuffling, pos:its_pos})
            this.props.notify(this.props.app_state.loc['2995']/* 'Your queue has been shuffled.' */, 1200)
        }else{
            var current_song = this.state.songs[this.state.pos]
            var its_pos = this.get_pos_of_item(current_song, this.state.original_song_list)
            this.props.shuffle_songs_in_pip(this.state.original_song_list, its_pos)
            this.setState({songs: this.state.original_song_list, is_shuffling: !this.state.is_shuffling, pos:its_pos})
        }
    }

    repeat_song(){
        if(this.state.is_repeating == false){
            this.props.notify(this.props.app_state.loc['2994']/* 'Repeating current song.' */, 1200)
        }
        this.props.repeat_current_song()
        this.setState({is_repeating: !this.state.is_repeating})
    }


    get_audio_file(){
        var current_song = this.state.songs[this.state.pos]
        var audio_file = current_song['track']
        var ecid_obj = this.get_cid_split(audio_file)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        if(data != null && data['data'] == null) return null
        return encodeURI(data['data'])
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

    render_track_details(){
        var song = this.state.songs[this.state.pos]
        var object = song['object']
        // console.log('song', song)

        var metadata = song['basic_data']
        var formatted_size = this.format_data_size(song['basic_data']['size'])
        var fs = formatted_size['size']+' '+formatted_size['unit']
        if(metadata == null){
            metadata = {common:{}, format:{}}
        }
        if(metadata['common'] == null){
           metadata['common'] = {} 
        }
        if(metadata['format'] == null){
           metadata['format'] = {} 
        }
        var track_url = this.get_audio_file()

        var audio_file = song['track']
        var view_count = this.get_file_view_count(audio_file)
        
        return(
            <div>
                {this.render_buy_album_button()}
                {this.render_detail_item('3', {'title':object['ipfs'].entered_title_text, 'details':this.props.app_state.loc['2977']/* Taken from */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_views_if_any(view_count)}

                {this.render_detail_item('3', {'title':fs, 'details':this.props.app_state.loc['2978']/* File size */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':(metadata['common']['composer'] == null ? '':(metadata['common']['composer'].length > 0 ? metadata['common']['composer'][0]: '')), 'details':this.props.app_state.loc['2979']/* Composers */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':(metadata['format']['bitrate'] == null ? '':metadata['format']['bitrate']), 'details':this.props.app_state.loc['2980']/* Bitrate */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':(metadata['format']['codec'] == null ? '':metadata['format']['codec']), 'details':this.props.app_state.loc['2981']/* Codec */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':metadata['format']['codecProfile'], 'details':this.props.app_state.loc['2982']/* Codec Profile */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':metadata['format']['container'], 'details':this.props.app_state.loc['2983']/* Container */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':''+metadata['format']['lossless'], 'details':this.props.app_state.loc['2984']/* Lossless */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':metadata['format']['numberOfChannels'], 'details':this.props.app_state.loc['2985']/* Number of Channels */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':metadata['format']['numberOfSamples'], 'details':this.props.app_state.loc['2986']/* Number of Samples */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':metadata['format']['sampleRate'], 'details':this.props.app_state.loc['2987']/* Sample Rate */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'details':(song['credits'] == null ? '': song['credits']), 'title':this.props.app_state.loc['a311bz']/* Credits */, 'size':'l'})}
                
                {this.render_detail_item('0')} 

                {/* {this.render_detail_item('4', {'text':track_url, 'textsize':'13px', 'font':'Sans-serif'})} */}

                {this.render_track_nitro()}
                <div style={{height:10}}/>
            </div>
        )
    }

    render_track_nitro(){
        var current_song = this.state.songs[this.state.pos]
        var audio_file = current_song['track']
        var ecid_obj = this.get_cid_split(audio_file)
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

    render_views_if_any(view_count){
        if(view_count > 0){
            var views_text = this.props.app_state.loc['2509n']/* views */
            if(view_count == 1){
                views_text = this.props.app_state.loc['2509o']/* view */
            }
            var view_count_message = `${number_with_commas(view_count)} ${views_text}`

            return(
                <div>
                    {this.render_detail_item('4', {'text':view_count_message, 'textsize':'13px', 'font':this.props.app_state.font})}
                    <div style={{height:10}}/>
                </div>
            )
        }
        
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


    is_song_available_for_playing(song){
        var plays = this.props.app_state.song_plays[song['song_id']] == null ? 0 : this.props.app_state.song_plays[song['song_id']].length
        if(!this.is_song_available_for_adding_to_playlist(song) && plays >= song['songs_free_plays_count']){
            return false
        }
        return true
    }
    
    is_song_available_for_adding_to_playlist(song){
        var my_songs = this.props.app_state.my_tracks
        if(my_songs.includes(song['song_id'])){
            return true
        }
        return false
    }

    render_buy_album_button(){
        var song = this.state.songs[this.state.pos]
        var object = song['object']
        if(this.is_song_available_for_playing(song)){
            return;
        }
        var listing_type = object['ipfs'] == null ? 'Audiopost' :this.get_selected_item(object['ipfs'].get_listing_type_tags_option, 'e')
        var title = this.props.app_state.loc['a2527e']/* 'Buy' */+ ' '+listing_type
        return(
            <div>
                {this.render_detail_item('3', {'title':title, 'details':this.props.app_state.loc['a2527f']/* `Purchase unlimited access to add it to your collection and playlists.` */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={()=>this.open_purchase_album_ui(object)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['a2527e']/* 'Buy' */, 'action':''})}
                </div>
                {this.render_detail_item('0')}
            </div>
        )
    }

    open_purchase_album_ui(object){
        this.props.open_purchase_album_ui(object)
    }






    handleScroll = () => {
        // var pos = event.currentTarget.scrollTop
        this.setState({has_scrolled: true})
    };


    render_lyrics(){
        var song = this.state.songs[this.state.pos]
        var file_lyrics = null
        
        if(song['subtitle_type'] == 'upload'){
            const ecid_obj = this.get_cid_split(song['lyrics'])
            if(this.props.app_state.uploaded_data[ecid_obj['filetype']] != null){
                var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
                file_lyrics = data['lyrics']
            }
        }else{
            file_lyrics = song['lyrics']
        }
    
        if(file_lyrics == null){
            return(
                <div>
                    {this.render_empty_views(4)}
                </div>
            )
        }else{
            var middle = this.state.has_scrolled == true ? this.props.height-200 : this.props.height-180
            var items = file_lyrics
            return(
                <div>
                    {this.render_reset_button()}
                    <div style={{height:10}}/>
                    <div onTouchStart={() => this.handleScroll()} onClick={() => this.handleScroll()} style={{overflow: 'auto', maxHeight: middle}}>
                        {items.map((item, index) => (
                            <div key={index} ref={(el) => (this.itemRefs[index] = el)}>
                                {this.render_lyric_line(item, index)} 
                                <div style={{height:2}}/>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    }

    render_reset_button(){
        if(this.state.has_scrolled == true){
            return(
                <div onClick={() => this.when_reset_button()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2993']/* synchronize */, 'action':''})}
                </div>
            )
        }
    }

    when_reset_button(){
        this.setState({has_scrolled: false})
    }

    render_lyric_line(item, index){
        var text = item.text
        var size = this.state.active_lyric == index ? '25px':'14px'
        return(
            <div onClick={() => this.when_lyric_clicked(item)}>
                {this.render_detail_item('4', {'text':text, 'textsize':size, 'font':this.props.app_state.font})}
            </div>
        )
    }

    when_lyric_clicked(item){
        var time = parseInt(item['time'])+1
        var current_song = this.state.songs[this.state.pos]
        var current_song_length = parseInt(current_song['basic_data']['format']['duration'])
        var number = parseInt((time * 100) / current_song_length)
        
        var amount = { target: {value: number } }
        this.props.update_time(amount)
        this.setState({value: time})
        
        var me = this;
        setTimeout(function() {
            me.when_reset_button()
        }, (1 * 140));
    }


    render_queue(){
        return(
            <div>
                {this.render_song_thats_currently_playing()}
                {this.render_detail_item('0')}
                
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_next_or_previous_songs_tags_object} tag_size={'l'} when_tags_updated={this.when_get_next_or_previous_songs_tags_object_updated.bind(this)} theme={this.props.theme}/>
                
                {this.render_upcoming_songs()}
            </div>
        )
    }

    when_get_next_or_previous_songs_tags_object_updated(tag_obj){
        this.setState({get_next_or_previous_songs_tags_object:tag_obj})
    }


    get_selected_item2(object, option){
        return object[option][2][0]
    }

    render_song_thats_currently_playing(){
        var item = this.state.songs[this.state.pos]
        var border_radius = '7px';
        var text_align = 'left'
        var padding = '10px 15px 10px 15px'
        var font_size = ['15px', '12px', 19, 50];
        var explicit_selection = item['explicit'] == null ? 0 : this.get_selected_item2(item['explicit'], 'e')
        var explicit_text = explicit_selection == 1 ? '🅴 ' : ''
        var song_title = explicit_text + item['song_title'] + ( this.is_song_available_for_adding_to_playlist(item) ? ' ✅':'')
        var song_details = item['song_composer']
        var song_length = '▶ '+this.get_song_duration(item['basic_data'])
        var word_wrap_value = this.longest_word_length(song_title) > 53 ? 'break-word' : 'normal'
        return(
            <div>
                <div style={{'display': 'flex','flex-direction': 'row','padding': padding,'margin':'0px 0px 0px 0px', 'background-color': this.props.theme['view_group_card_item_background'],'border-radius': border_radius}}>
                        <div style={{height:'100%', width:'100%'}}>
                            <div>
                                <div className="row">
                                    <div className="col-10" style={{'padding': '0px 0px 0px 13px' }}> 
                                        <p style={{'font-size': font_size[0],'color': this.props.theme['primary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none', height:'auto', 'word-wrap': word_wrap_value, 'overflow-wrap':word_wrap_value, 'text-align':text_align}}>{song_title}</p>
                                    </div>
                                    <div className="col-2" style={{'padding': '5px 15px 0px 0px' }}>
                                        <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '10px', height: 7, 'padding-top':' 0.5px', 'font-family': this.props.font}} className="text-end">{song_length}</p>
                                    </div>
                                </div>

                                <p style={{'font-size': font_size[1],'color': this.props.theme['secondary_text_color'],'margin': '-5px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none', 'white-space': 'pre-line', 'overflow-wrap':'break-word', 'text-align':text_align}} >{song_details}</p>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }

    longest_word_length(text) {
        if(text == null) {
            return 0
        }
        return text.toString()
            .split(/\s+/) // Split by whitespace (handles multiple spaces & newlines)
            .reduce((maxLength, word) => Math.max(maxLength, word.length), 0);
    }

    render_upcoming_songs(){
        var selected = this.get_selected_item(this.state.get_next_or_previous_songs_tags_object, this.state.get_next_or_previous_songs_tags_object['i'].active)
        
        if(selected == this.props.app_state.loc['2996']/* 'up-next' */){
            return(
                <div>
                    {this.render_next_songs()}
                </div>
            )
        }
        else if(selected == this.props.app_state.loc['2997']/* 'previous' */){
            return(
                <div>
                    {this.render_previous_songs()}
                </div>
            )
        }
    }

    render_next_songs(){
        var items = this.get_next_songs()
        var middle = this.props.height-270;
        if(items.length == 0){
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    {this.render_empty_views(3)}
                </div>
            )
        }
        return(
            <div style={{overflow: 'auto', maxHeight: middle}}>
                {items.map((item, index) => (
                    <div key={index}>
                        {this.render_song(item, index)} 
                        <div style={{height:2}}/>
                    </div>
                ))}
                {this.render_empty_views(2)}
            </div>
        )
    }

    render_previous_songs(){
        var items2 = this.get_previous_songs()
        var middle = this.props.height-270;
        if(items2.length == 0){
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    {this.render_empty_views(3)}
                </div>
            )
        }
        
        return(
            <div style={{overflow: 'auto', maxHeight: middle}}>
                {items2.map((item, index) => (
                    <div key={index}>
                        {this.render_song(item, index)} 
                        <div style={{height:2}}/>
                    </div>
                ))}
                {this.render_empty_views(2)}
            </div>
        )
    }

    get_song_duration(item){
        var duration = '0:00'
        if(item != null && item['format'] != null){
            var format = item['format']
            if(format['duration'] != null){
               var min = Math.floor(parseInt(format['duration']) / 60)
               var sec = parseInt(format['duration']) % 60
               duration = min+':'+sec
            }
        }
        return duration
    }

    get_next_songs(){
        var songs = []
        for(var i=this.state.pos+1; i<this.state.songs.length; i++){
            songs.push(this.state.songs[i])
        }
        return songs;
    }

    get_previous_songs(){
        var songs = []
        for(var i=0; i<this.state.pos; i++){
            songs.push(this.state.songs[i])
        }
        return songs
    }

    render_song(item){
        var audio_file = item['track']
        var song_title = item['song_title'] + (this.is_song_available_for_adding_to_playlist(item) ? ' ✅':'')
        var song_details = item['song_composer']
        var image = item['album_art']
        var view_count = this.get_file_view_count(audio_file)
        var view_count_message = ''
        if(view_count > 0){
            var views_text = this.props.app_state.loc['2509n']/* views */
            if(view_count == 1){
                views_text = this.props.app_state.loc['2509o']/* view */
            }
            view_count_message = ` • ${this.format_view_count(view_count)} ${views_text}`
        }
        return(
            <div style={{'opacity':(this.is_song_available_for_playing(item) == true ? 1.0 : 0.4)}} onClick={() => this.when_song_item_clicked(item)}>
                {this.render_detail_item('8', {'title':song_title, 'details':song_details+view_count_message, 'size':'l', 'image':image, 'border_radius':'7px'})}
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

    when_song_item_clicked(item){
        var object = item['object']
        let me = this;
        if(Date.now() - this.last_all_click_time3 < 200){
            clearTimeout(this.all_timeout3);
            //double tap
            me.props.show_dialog_bottomsheet({'item':item, 'object':object, 'from':'full_audio_page'}, 'song_options')
        }else{
            this.all_timeout3 = setTimeout(function() {
                clearTimeout(this.all_timeout3);
                // single tap
                me.when_song_clicked(item)
            }, 200);
        }
        this.last_all_click_time3 = Date.now();
    }

    when_song_clicked(item){
        var its_pos = this.get_pos_of_item(item, this.state.songs)
        if(its_pos != null){
            this.setState({pos: its_pos})
            this.props.skip_to(its_pos)
        }
    }

    get_pos_of_item(item, songs){
        for(var i=0; i<songs.length; i++){
            var song = songs[i]
            if(song['song_id'] == item['song_id']){
                return i
            }
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
                                    <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
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
                <ViewGroups uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
            </div>
        )

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

    calculate_bar_width(num){
        if(num == null) return '0%'
        var last_two_digits = num.toString().slice(0, 1)+'0';
        if(num > 10){
            last_two_digits = num.toString().slice(0, 2);
        }
        return last_two_digits+'%'
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




export default FullAudioPage;