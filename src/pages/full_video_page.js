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

class FullVideoPage extends Component {
    
    state = {
        selected: 0, videos:null, object:null, pos:null,
        detials_or_queue_tags:this.detials_or_queue_tags(), is_player_resetting:false,
        subtitle_option_tags:null
    };


    componentDidMount(){
        this.setState({screen_width: this.screen.current.offsetWidth})
    }

    componentWillUnmount(){
        this.video_player.current?.removeEventListener('leavepictureinpicture', this.when_pip_closed);
        this.video_player.current?.removeEventListener('timeupdate', this.when_time_updated);
    }

    constructor(props) {
        super(props);
        this.screen = React.createRef()
        this.video_player = React.createRef();
    }


    detials_or_queue_tags(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['3026']/* 'details' */, this.props.app_state.loc['3027']/* 'queue' */], [1]
            ],
        };
    }


    set_data(videos, object, pos){
        this.setState({videos:videos, object:object, pos:pos, is_player_resetting:true, subtitle_option_tags: this.subtitle_option_tags(videos[pos]['subtitles'] == null ? [] : videos[pos]['subtitles']) })
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
                    <div style={{height: 15}}/>
                    {this.render_details_or_queue_tags_then_option()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div>
                    {this.render_player()}
                    <div style={{height: 15}}/>
                    <div className="row">
                        <div className="col-6" style={{}}>
                            {this.render_video_details()}
                        </div>
                        <div className="col-6" style={{}}>
                            {this.render_queue()}
                        </div>
                    </div>
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-7" style={{}}>
                        {this.render_player()}
                        <div style={{height: 15}}/>
                        {this.render_video_details()}
                    </div>
                    <div className="col-5" style={{}}>
                        {this.render_queue()}
                    </div>
                </div>
                
            )
        }
    }


    render_details_or_queue_tags_then_option(){
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
    }






    render_player(){
        return(
            <div ref={this.screen} style={{}}>
                <div style={{}}>
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
        if(data['data'] == null) return false
        return true
    }

    get_video_file(){
        if(this.state.videos == null || this.state.videos.length == 0) return null;
        var current_video = this.state.videos[this.state.pos]
        var video_file = current_video['video']
        var ecid_obj = this.get_cid_split(video_file)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return null;
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


    video_object(){
        if(!this.has_file_loaded() || this.state.is_player_resetting == true){
            return(
                <div style={{height: 350, width: this.state.screen_width, 'background-color':this.props.theme['view_group_card_item_background'], 'border-radius':'10px', 'display': 'flex', 'align-items':'center','justify-content':'center' }}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:60 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 4px', 'color': this.props.app_state.theme['primary_text_color'], 'font-size':'11px'}}>{this.props.app_state.loc['3028'/* 'Loading...' */]}</p>
                    </div>
                </div>
            )
        }else{
            var video = this.get_video_file()
            var current_video = this.state.videos[this.state.pos]
            var subtitles = current_video['subtitles'] == null ? [] : current_video['subtitles']
            return(
                <div style={{}}>
                    <video ref={this.video_player} width={this.state.screen_width} style={{'border-radius':'10px'}} controls>
                        <source src={video} type="video/mp4"/>
                        <source src={video} type="video/ogg"/>
                        {subtitles.map((item, index) => (
                            <track label={item['subtitle_language_name']} kind="subtitles" srclang={item['subtitle_language_object']['code']} src={this.get_subtitle_file(item)}/>
                        ))}
                        Your browser does not support the video tag.
                    </video>
                    <div style={{height:10}}/>
                    {this.render_subtitle_options(subtitles)}
                </div>
            )
        }
        
    }

    get_subtitle_file(item){
        const blob = new Blob([item['subtitle_file']], { type: 'text/vtt' });
        return URL.createObjectURL(blob);
    }

    start_playing(){
        this.setState({is_player_resetting:false})
        var me = this;
        setTimeout(function() {
            var current_video_id = me.state.videos[me.state.pos]['video_id']
            var last_time = me.props.app_state.video_timestamp_data[current_video_id]
            
            if(last_time != null && last_time != 0 && me.video_player.current != null){
                me.video_player.current.currentTime = last_time 
            }
            me.video_player.current?.play()
            me.video_player.current?.addEventListener('leavepictureinpicture', me.when_pip_closed);
            me.video_player.current?.addEventListener('timeupdate', me.when_time_updated);
        }, (1 * 300));
    }

    when_pip_closed = () => {
        this.props.when_picture_in_picture_exited()
    }

    when_time_updated = () => {
        var time = this.video_player.current?.currentTime
        this.props.update_video_time_for_future_reference(time, this.state.videos[this.state.pos])
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
        this.hideTracks()
        var me = this;
        setTimeout(function() {
            if(selected_item !== 'e') me.show_selected_track(selected_item)
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
        var item = this.get_post_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects
        return(
            <div>
                {this.render_detail_item('3', {'details':current_video['video_composer'], 'title':current_video['video_title'], 'size':'l'})}
                {this.render_detail_item('0')}


                {this.render_detail_item('1', item['tags'])}
                <div style={{height: 10}}/>
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

                {this.render_detail_item('0')}
                {this.render_detail_item('0')}
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
            'id2':{'title':author, 'details':title, 'size':'l', 'image':image, 'border_radius':'7px'},
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
        var items = this.state.videos
        var object_item = this.get_post_details_data(object)
        return(
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px'}}>
                <div style={{padding:'10px 10px 5px 10px'}}>
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
        return(
            <div onClick={() => this.when_video_item_clicked(item, object, index)}>
                {this.render_detail_item('3', {'details':item['video_composer'], 'title':item['video_title'], 'size':'l'})}
            </div>
        )
    }

    when_video_item_clicked(video, object, index){
        if(index == this.state.pos){
            this.props.notify(this.props.app_state.loc['3029']/* e is already playing the video. */, 1500)
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
                <ViewGroups uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={width} show_images={this.props.show_images.bind(this)}/>
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