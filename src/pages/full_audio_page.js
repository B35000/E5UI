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

        get_next_or_previous_songs_tags_object:this.get_next_or_previous_songs_tags_object()
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

    set_data(queue, pos, play_pause_state, value, is_repeating, is_shuffling, original_song_list){
        this.setState({songs: queue, original_song_list: original_song_list, pos:pos, play_pause_state: play_pause_state, value: value, is_repeating: is_repeating, is_shuffling: is_shuffling})
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

                <div style={{'padding':'0px 20px 0px 20px', 'margin':'0px 0px 0px 0px'}}>
                    {this.render_detail_item('3', {'title':song_title, 'details':song_details, 'size':'l'})}
                </div>
                
                <div style={{height:24}}/>

                <div style={{'padding':'0px 25px 0px 25px', 'margin':'0px 0px 0px 0px'}}>
                    {this.render_seek_bar()}
                </div>

                <div className="row" style={{'margin':'7px 0px 0px 0px', 'padding':'0px 25px 0px 25px'}}>
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

                <div style={{'padding':'10px 10px 0px 10px', 'margin':'0px 0px 0px 0px'}}>
                    {this.render_detail_item('0')}
                </div>

                <div style={{'padding':'0px 20px 0px 20px', 'margin':'0px 0px 0px 0px'}}>
                    {this.render_track_details()}
                </div>
            </div>
        )
    }

    render_seek_bar(){
        var value = this.get_bar_length()
        var height = 4
        return(
            <div style={{ height: height, width: '100%', 'border-radius': '17px', 'box-shadow': '0px 0px 1px 1px #CECDCD', 'margin': '0px 0px 0px 0px' , 'position': 'relative'}}>
                
                <div className="progress" style={{ height: height, width: '100%', 'background-color': this.props.theme['bar_background_color'] , 'z-index':'1' , 'border-radius': '17px', 'position': 'absolute'}}>
                    <div className="progress-bar" role="progressbar" style={{ width: (value)+"%", 'background-image': 'none','background-color': this.props.theme['bar_color'] }} aria-valuenow="5" aria-valuemin="0" aria-valuemax="10"></div>
                </div>
                <input type="range" value={value} min="0" max="99" className="form-range" onChange={this.handleNumber} style={{opacity: 0, width: '100%', height: height, 'position': 'absolute', 'z-index':'10'}}/>
            </div>
        )
    }

    get_bar_length(){
        var current_time = this.state.value
        var current_song = this.state.songs[this.state.pos]
        var current_song_length = current_song['basic_data']['metadata']['format']['duration']

        return ((current_time * 100) / current_song_length)
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
        var current_song_length = parseInt(current_song['basic_data']['metadata']['format']['duration'])
        
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
        if(song['lyrics'] != null){
            const index = this.syncLyric(song['lyrics'], time);
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
        var current_song_length = parseInt(current_song['basic_data']['metadata']['format']['duration'])
        
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





    has_file_loaded(){
        var current_song = this.state.songs[this.state.pos]
        var audio_file = current_song['track']
        var ecid_obj = this.get_cid_split(audio_file)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        if(data['data'] == null) return false
        return true
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




    render_track_details(){
        var song = this.state.songs[this.state.pos]
        var object = song['object']
        // console.log('song', song)

        var metadata = song['basic_data']['metadata']
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
        return(
            <div>
                {this.render_detail_item('3', {'title':object['ipfs'].entered_title_text, 'details':this.props.app_state.loc['2977']/* Taken from */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':fs, 'details':this.props.app_state.loc['2978']/* File size */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':metadata['common']['composer'][0], 'details':this.props.app_state.loc['2979']/* Composers */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':metadata['format']['bitrate'], 'details':this.props.app_state.loc['2980']/* Bitrate */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':metadata['format']['codec'], 'details':this.props.app_state.loc['2981']/* Codec */, 'size':'l'})}
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

            </div>
        )
    }

    format_data_size(size){
        if(size > 1_000_000_000){
            return {'size':Math.round(size/1_000_000_000), 'unit':'GBs'}
        }
        else if(size > 1_000_000){
            return {'size':Math.round(size/1_000_000), 'unit':'MBs'}
        }
        else if(size > 1_000){
            return {'size':Math.round(size/1_000), 'unit':'KBs'}
        }
        else{
            return {'size':size, 'unit':'bytes'}
        }
    }






    handleScroll = () => {
        // var pos = event.currentTarget.scrollTop
        this.setState({has_scrolled: true})
    };


    render_lyrics(){
        var song = this.state.songs[this.state.pos]
        
        if(song['lyrics'] == null){
            return(
                <div>
                    {this.render_empty_views(4)}
                </div>
            )
        }else{
            var middle = this.state.has_scrolled == true ? this.props.height-200 : this.props.height-180
            var items = song['lyrics']
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
        var current_song_length = parseInt(current_song['basic_data']['metadata']['format']['duration'])
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



    render_song_thats_currently_playing(){
        var item = this.state.songs[this.state.pos]
        var border_radius = '7px';
        var text_align = 'left'
        var padding = '10px 15px 10px 15px'
        var font_size = ['15px', '12px', 19, 50];
        var song_title = item['song_title']
        var song_details = item['song_composer']
        var song_length = '▶ '+this.get_song_duration(item['basic_data'])
        return(
            <div>
                <div style={{'display': 'flex','flex-direction': 'row','padding': padding,'margin':'0px 0px 0px 0px', 'background-color': this.props.theme['view_group_card_item_background'],'border-radius': border_radius}}>
                        <div style={{height:'100%', width:'100%'}}>
                            <div>
                                <div className="row">
                                    <div className="col-10" style={{'padding': '0px 0px 0px 13px' }}> 
                                        <p style={{'font-size': font_size[0],'color': this.props.theme['primary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none', height:'auto', 'word-wrap': 'break-word', 'overflow-wrap':'break-word', 'word-break': 'break-all', 'text-align':text_align}}>{song_title}</p>
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
                    {this.render_empty_views(4)}
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
                    {this.render_empty_views(4)}
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
        if(item['metadata'] != null && item['metadata']['format'] != null){
            var format = item['metadata']['format']
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
        var song_title = item['song_title']
        var song_details = item['song_composer']
        var image = item['album_art']
        return(
            <div onClick={() => this.when_song_item_clicked(item)}>
                {this.render_detail_item('8', {'title':song_title, 'details':song_details, 'size':'l', 'image':image, 'border_radius':'7px'})}
            </div>
        )
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
                                    <img src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
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