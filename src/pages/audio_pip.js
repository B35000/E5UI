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
        play_pause_state:0, is_full_screen_open:false,
    };

    set_data(songs, pos){
        // console.log('set_data', songs, pos)
        this.setState({songs:songs, pos:pos})
    }

    constructor(props) {
        super(props);
        this.audio = React.createRef();
    }

    render(){
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

                <div style={{width:200, height:40, 'z-index':'8', 'position': 'absolute','background-image': 'linear-gradient(rgb(0, 0, 0,.9), rgb(0, 0, 0,.0))', 'border-radius': '15px 15px 0px 0px',}}/>

                <div style={{width:200, height:40, 'margin':'160px 0px 0px 0px', 'z-index':'10', 'position': 'absolute','background-image': 'linear-gradient(rgb(0, 0, 0,.0), rgb(0, 0, 0,.9))', 'border-radius': '0px 0px 15px 15px',}}/>

                <strong className="cursor" style={{width:120, height:50, 'opacity':0.0,'z-index':'20', 'position': 'absolute', 'margin':'10px 60px 0px 40px', 'background-color':'red'}}><div></div></strong>

                <div style={{width:200, height:200,'z-index':'15', 'position': 'absolute', 'padding':'6px 0px 10px 0px'}}>
                    <div className="row" style={{'padding':'0px 31px 0px 20px'}}>
                        <div className="col-11" style={{'padding': '0px 0px 0px 0px'}}>
                            <img alt=""  onClick={()=>this.expand_player()} src={this.props.app_state.static_assets['expand_icon']} style={{height:25, width:'auto', 'margin': '-3px 0px 0px 0px'}} />
                        </div>
                        <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                            <img alt="" className="text-end" onClick={()=>this.close_and_stop_playing()} src={this.props.app_state.static_assets['close_pip']} style={{height:21, width:'auto'}} />
                        </div>
                    </div>

                    <div style={{'margin': '50px 0px 0px 0px','display': 'flex', 'align-items':'center','justify-content':'center', 'height':50}} >
                        {this.pause_button()}
                    </div>

                    <div style={{'padding':'0px 15px 0px 15px', 'margin':'41px 0px 0px 0px'}}>
                        {this.render_seek_bar()}
                    </div>

                    <div className="row" style={{'margin':'3px 0px 0px 0px', 'padding':'0px 15px 0px 15px', 'width':'100%'}}>
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
            </div>
        )
    }

    render_backgorund_image(image){
        if(this.state.play_pause_state == 0/* paused */){
            return(
                <img alt="" src={image} style={{height:200 ,width:200, 'border-radius': '15px', 'position': 'absolute', 'z-index':'1', 'filter': 'blur(8px)', '-webkit-filter': 'blur(8px)'}}/>
            )
        }else{
            return(
                <img alt="" src={image} style={{height:200 ,width:200, 'border-radius': '15px', 'position': 'absolute', 'z-index':'1'}}/>
            )
        }
    }

    render_seek_bar(){
        var value = this.get_bar_length()
        var height = 3
        return(
            <div style={{ height: height, width: '100%', 'border-radius': '17px', 'box-shadow': '0px 0px 1px 1px #CECDCD', 'margin': '0px 0px 0px 0px' , 'position': 'relative'}}>
                
                <div className="progress" style={{ height: height, width: '100%', 'background-color': this.props.theme['bar_background_color'] , 'z-index':'1' , 'border-radius': '17px', 'position': 'absolute'}}>
                    <div className="progress-bar" role="progressbar" style={{ width: (value)+"%", 'background-image': 'none','background-color': 'white' }} aria-valuenow="5" aria-valuemin="0" aria-valuemax="10"></div>
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

    pause_button(){
        var play_pause_text = this.has_file_loaded() ? '▐▐' : '⚬⚬⚬⚬'
        var opacity = this.state.play_pause_state == 0/* paused */ ? 1.0 : 0.0
        return(
            <p onClick={()=>this.play_pause()} style={{'font-size': '30px', width:50,'opacity':opacity}}>{play_pause_text}</p>
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


    expand_player(){
        this.setState({is_full_screen_open: true})
        this.props.open_full_player(this.state.songs, this.state.pos, this.state.play_pause_state, this.state.value)
    }

    when_expanded_player_closed(){
        this.setState({is_full_screen_open: false})
    }






    get_audio_file(){
        var current_song = this.state.songs[this.state.pos]
        var audio_file = current_song['track']
        var ecid_obj = this.get_cid_split(audio_file)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        if(data != null && data['data'] == null) return null
        return data['data']
    }

    render_audio(){
        if(!this.has_file_loaded()) return;
        return(
            <div style={{width:2, height:2,'z-index':'2', 'opacity':0.0, 'position': 'absolute', 'margin':'100px 0px 0px 0px'}}>
                <div style={{'position': 'relative'}}>
                    <div style={{width:200, height:40, 'margin':'0px 0px 0px 0px', 'z-index':'3', 'position': 'absolute'}}/>
                    <div style={{width:2, height:2, 'margin':'px 0px 0px 0px', 'z-index':'2', 'position': 'absolute'}}>
                        <audio onEnded={this.handleAudioEnd} onTimeUpdate={this.handleTimeUpdate} controls ref={this.audio}>
                            <source src={this.get_audio_file()} type="audio/ogg"></source>
                            <source src={this.get_audio_file()} type="audio/mpeg"></source>
                            <source src={this.get_audio_file()} type="audio/wav"></source>
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </div>
                
            </div>
        )
    }


    close_and_stop_playing(){
        this.audio.current?.pause()
        this.props.close_audio_pip()
    }

    play_pause(){
        if(this.state.play_pause_state == 0/* paused */){
            console.log('playing')
            this.setState({play_pause_state: 1})
            this.audio.current?.play()
        }else{
            console.log('pausing')
            this.setState({play_pause_state: 0})
            this.audio.current?.pause()
        }
        
    }

    handleNumber = (number) => {
        if(this.audio.current == null) return
        var new_value = number.target.value
        var current_song = this.state.songs[this.state.pos]
        var current_song_length = parseInt(current_song['basic_data']['metadata']['format']['duration'])
        
        var new_time = (new_value / 100) * current_song_length
        this.audio.current.currentTime = parseFloat(new_time)
        this.setState({value: new_time})
    }


    start_playing(){
        this.setState({play_pause_state: 1})
        // this.audio = new Audio(this.get_audio_file())
        var me = this;
        setTimeout(function() {
            me.audio.current?.play()
        }, (1 * 300));
        
    }


    handleTimeUpdate = () => {
        var current_time = this.audio.current?.currentTime
        this.setState({value: current_time})
        this.props.when_time_updated(current_time, this.state.songs[this.state.pos])
    }

    handleAudioEnd = () => {
        if(this.state.pos == this.state.songs.length - 1){
            //it was the last song
            this.setState({play_pause_state: 0})
            this.audio.current?.pause()
        }else{
            this.play_next()
            this.props.when_next_track_reached()
        }
    };


    render_blocker(){
        if(!this.state.is_full_screen_open) return
        return(
            <div style={{width:200, height:200, 'margin':'0px 0px 0px 0px', 'z-index':'100', 'position': 'absolute'}}/>
        )
    }

    play_previous(){
        if(this.state.pos > 0){
            this.audio.current.currentTime = 0
            this.setState({value: 0, pos: this.state.pos -1})
            var me = this;
            setTimeout(function() {
                me.audio.current?.play()
                me.props.load_queue(me.state.songs, me.state.pos)
            }, (1 * 300));
        }
    }

    play_next(){
        if(this.state.pos != this.state.songs.length - 1){
            this.audio.current.currentTime = 0
            this.setState({value: 0, pos: this.state.pos + 1})
            
            var me = this;
            setTimeout(function() {
                me.audio.current?.play()
                me.props.load_queue(me.state.songs, me.state.pos)
            }, (1 * 300));
        }
    }

    skip_to(index){
        this.audio.current.currentTime = 0
        this.setState({value: 0, pos: index})
        
        var me = this;
        setTimeout(function() {
            me.props.load_queue(me.state.songs, me.state.pos)
        }, (1 * 300));
    }
    






    get_image_from_file(ecid){
        if(!ecid.startsWith('image')) return ecid
        var ecid_obj = this.get_cid_split(ecid)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
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