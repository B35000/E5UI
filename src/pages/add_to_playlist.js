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

class AddToPlaylist extends Component {
    
    state = {
        selected: 0, song:null, 
        get_existing_or_new_playlist_tags_object: this.get_existing_or_new_playlist_tags_object(),
        title_text:'', description_text:'',
    };

    set_data(song){
        this.setState({song:song})
    }

    get_existing_or_new_playlist_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['3010']/* 'new' */,this.props.app_state.loc['3009']/* 'existing' */], [1]
            ],
        };
    }

    render(){
        return(
            <div style={{'padding':'10px 15px 0px 15px'}}>
                {this.render_everything()}
            </div>
        )
    }



    render_everything(){
        if(this.state.song == null) return;
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_song_options_items()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_song_options_items()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_song_options_items()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }



    render_song_options_items(){
        var song = this.state.song
        var song_title = song['song_title']
        var song_details = song['song_composer']
        var image = song['album_art']
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3007']/* Add to playlist. */, 'details':this.props.app_state.loc['3008']/* You can add to an existing playlist or a new playlist. */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_detail_item('8', {'title':song_title, 'details':song_details, 'size':'l', 'image':image, 'border_radius':'7px'})}

                {this.render_detail_item('0')}

                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_existing_or_new_playlist_tags_object} tag_size={'l'} when_tags_updated={this.when_get_existing_or_new_playlist_tags_object_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>
                
                {this.render_existing_or_new_playlist_ui()}
            </div>
        )
    }


    when_get_existing_or_new_playlist_tags_object_updated(tag_obj){
        this.setState({get_existing_or_new_playlist_tags_object: tag_obj})
    }



    render_existing_or_new_playlist_ui(){
        var selected = this.get_selected_item(this.state.get_existing_or_new_playlist_tags_object, this.state.get_existing_or_new_playlist_tags_object['i'].active)
        
        if(selected == this.props.app_state.loc['3010']/* 'new' */){
            return(
                <div>
                    {this.render_new_playlist_ui()}
                </div>
            )
        }
        else if(selected == this.props.app_state.loc['3009']/* 'existing' */){
            return(
                <div>
                    {this.render_existing_playlist_ui()}
                </div>
            )
        }
    }



    render_new_playlist_ui(){
        return(
            <div>
                {this.render_detail_item('4', {'text':this.props.app_state.loc['3011']/* 'Youre creating a new Playlist.' */, 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:20}}/>

                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3012']/* 'Playlist Title' */} when_text_input_field_changed={this.when_title_input_filed_changed.bind(this)} text={this.state.title_text} theme={this.props.theme}/>
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']+(this.props.app_state.title_size - this.state.title_text.length)})}

                <div style={{height:20}}/>

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['3013']/* 'Playlist Description (optional)' */} when_text_input_field_changed={this.when_details_input_filed_changed.bind(this)} text={this.state.description_text} theme={this.props.theme}/>

                <div style={{height:20}}/>
                <div onClick={() => this.create_and_add()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3014']/* Create and Add. */, 'action':''})}
                </div>
            </div>
        )
    }

    when_title_input_filed_changed(text){
        this.setState({title_text: text})
    }

    when_details_input_filed_changed(text){
        this.setState({description_text: text})
    }

    create_and_add(){
        var title = this.state.title_text.trim()
        var details = this.state.description_text.trim()

        if(title == ''){
            this.props.notify(this.props.app_state.loc['3015']/* You need a title for your new playlist. */, 4000)
        }
        else if(title.length > this.props.app_state.title_size){
            this.props.notify(this.props.app_state.loc['3016']/* That title is too long. */, 4000)
        }
        else if(this.does_playlist_with_similar_title_exist(title)){
            this.props.notify(this.props.app_state.loc['3018']/* A playlist with a similar title exists in your library. */, 5000)
        }
        else{
            var now = new Date().getTime();
            var new_playlist = {'id':makeid(8), 'time':now, 'title':title, 'details':details, 'songs':[this.state.song]}
            this.props.create_new_playlist_with_song(new_playlist)
            this.props.notify(this.props.app_state.loc['3017']/* Added your song to the new playlist. */, 4000)
        }
        
    }

    does_playlist_with_similar_title_exist(title){
        var does_playlist_exist = false
        var my_playlists = this.props.app_state.my_playlists
        my_playlists.forEach(playlist => {
            if(playlist['title'] == title){
                does_playlist_exist = true
            }
        });
        return does_playlist_exist
    }





    render_existing_playlist_ui(){
        return(
            <div>
                {this.render_detail_item('4', {'text':this.props.app_state.loc['3019']/* 'You\'re adding the song to an existing playlist.' */, 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                {this.render_my_playlists()}
            </div>
        )
    }

    render_my_playlists(){
        var items = this.props.app_state.my_playlists
        
        if(items.length == 0){
            return(
                <div>
                    {this.render_empty_views(4)}
                </div>
            )
        }
        return(
            <div>
                {items.map((item, index) => (
                    <div key={index}>
                        {this.render_playlist_item(item, index)} 
                        <div style={{height:7}}/>
                    </div>
                ))}
            </div>
        )
    }

    render_playlist_item(item, index){
        var title = item['title']
        var details = item['details']
        return(
            <div>
                <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_playlist_selected(item, index)}>
                    {this.render_detail_item('3', {'title':title, 'details':details, 'size':'l'})}
                </div>
                <div style={{padding:'0px 0px 0px 0px'}}>
                    {this.render_images(item)}
                </div>
            </div>
        )
    }

    render_images(item){
        var items = this.get_playlist_images(item)
        if(items.length == 0){
            items = [1, 2, 3]
            var background_color = this.props.theme['card_background_color']
            return(
                <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                <div style={{height:50, width:50, 'background-color': background_color, 'border-radius': '10px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}}>
                            <img alt="" src={this.get_image_from_file(item)} style={{height:25 ,width:25, 'border-radius': '50%'}}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_playlist_images(item){
        var images = []
        var item_songs = item['songs']
        item_songs.forEach(element => {
            images.push(element['album_art'])
        });
        return images
    }

    when_playlist_selected(item, index){
        this.props.add_song_to_existing_playlist(item, this.state.song, index)
        this.props.notify(this.props.app_state.loc['3020']/* Added your song to the playlist. */, 4000)
    }

    get_image_from_file(ecid){
        if(!ecid.startsWith('image')) return ecid
        var ecid_obj = this.get_cid_split(ecid)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return 'https://bafkreihhphkul4fpsqougigu4oenl3nbbnjjav4fzkgpjlwfya5ie2tu2u.ipfs.w3s.link/'
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]

        if(data == null) return 'https://bafkreihhphkul4fpsqougigu4oenl3nbbnjjav4fzkgpjlwfya5ie2tu2u.ipfs.w3s.link/'

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




export default AddToPlaylist;