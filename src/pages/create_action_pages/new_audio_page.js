import React, { Component } from 'react';
import ViewGroups from '../../components/view_groups';
import Tags from '../../components/tags';
import TextInput from '../../components/text_input';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import NumberPicker from '../../components/number_picker';


import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import imageCompression from 'browser-image-compression';
import MDEditor from '@uiw/react-md-editor';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
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

class NewAudioPage extends Component {
    
    state = {
        selected: 0,
        id: makeid(8), type:this.props.app_state.loc['a311a']/* audio */, e5:this.props.app_state.selected_e5,
        get_new_job_page_tags_object: this.get_new_job_page_tags_object(),
        entered_tag_text: '', entered_title_text:'', entered_text:'',
        entered_indexing_tags:[], entered_text_objects:[], entered_image_objects:[],
        entered_objects:[], selected_subscriptions:[],

        content_channeling_setting: this.props.app_state.content_channeling, 
        device_language_setting: this.props.app_state.device_language, 
        device_country: this.props.app_state.device_country,
        device_region: this.props.app_state.device_region,
        device_city: '', selected_device_city:'',
        
        typed_link_text:'', link_search_results:[], added_links:[],
        get_post_preview_option:this.get_post_preview_option(),

        edit_text_item_pos:-1,

        // get_sort_links_tags_object:this.get_sort_links_tags_object(), 
        // get_post_nsfw_option:this.get_post_nsfw_option(),
        get_masked_from_outsiders_option:this.get_masked_from_outsiders_option(),
        get_disabled_comments_section:this.get_disabled_comments_section(),
        get_post_anonymously_tags_option:this.get_post_anonymously_tags_option(),
        chatroom_enabled_tags_object:this.get_chatroom_enabled_tags_object(),
        get_album_item_listing_option:this.get_album_item_listing_option(),
        get_listing_type_tags_option:this.get_listing_type_tags_option(),
        get_content_channeling_object:this.get_content_channeling_object(),

        exchange_id:'', price_amount:0, price_data:[], 
        exchange_id2:'', price_amount2:0, price_data2:[], 
        song_title:'', song_composer:'', songs_free_plays_count:0,
        
        songs:[], edit_song_item_pos:-1,

        entered_genre_text:'', entered_year_recorded_text:'',entered_author_text:'', entered_copyright_text:'',entered_comment_text:'', purchase_recipient:'',

        album_art:null, audio_type: this.props.app_state.loc['a311ar']/* 'Album' */, entered_pdf_objects:[],
        markdown:''
    };

    get_new_job_page_tags_object(){
        var obj = {
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e', this.props.app_state.loc['a311bg']/* 'metadata' */,this.props.app_state.loc['110'], this.props.app_state.loc['112'], this.props.app_state.loc['162r']/* 'pdfs' */, this.props.app_state.loc['a311bq']/* 'markdown' */, this.props.app_state.loc['298'], this.props.app_state.loc['a311b']/* 'album-fee' */, this.props.app_state.loc['a311c']/* 'track-list' */], [0]
            ],
            'text':[
                ['or','',0], [this.props.app_state.loc['115'],this.props.app_state.loc['120'], this.props.app_state.loc['121']], [0]
            ],
            'font':[
                ['xor','e',1], [this.props.app_state.loc['116'],'Sans-serif','Courier New','Times New Roman','ComicSans','papyrus'], [1],[1]
            ],
            'size':[
                ['xor','e',1], [this.props.app_state.loc['117'],'15px','11px','25px','40px'], [1],[1]
            ],
        };

        obj[this.props.app_state.loc['115']] = [
                ['or','',0], [this.props.app_state.loc['115'],this.props.app_state.loc['120'], this.props.app_state.loc['121']], [0]
            ]
        obj[this.props.app_state.loc['116']] = [
                ['xor','e',1], [this.props.app_state.loc['116'],'Sans-serif','Courier New','Times New Roman','ComicSans','papyrus'], [1],[1]
            ]
        obj[this.props.app_state.loc['117']] = [
                ['xor','e',1], [this.props.app_state.loc['117'],'15px','11px','25px','40px'], [1],[1]
            ]
        return obj;
    }


    get_post_preview_option(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['299'], this.props.app_state.loc['300']], [1]
            ],
        };
    }


    get_post_nsfw_option(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['311a']/* nsfw */], [0]
            ],
        };
    }


    get_masked_from_outsiders_option(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['311b']/* masked */], [0]
            ],
        };
    }


    get_disabled_comments_section(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['2756']/* disabled */], [0]
            ],
        };
    }


    get_post_anonymously_tags_option(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['311g']/* enabled */], [0]
            ],
        };
    }

    get_chatroom_enabled_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', this.props.app_state.loc['89']/* 'enabled' */, this.props.app_state.loc['90']/* 'disabled' */], [1]
            ],
        };
    }

    get_album_item_listing_option(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', this.props.app_state.loc['457']/* 'listed' */, this.props.app_state.loc['458'] /* 'delisted' */], [1]
            ],
        };
    }


    get_listing_type_tags_option(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', this.props.app_state.loc['a311ar']/* 'Album' */, this.props.app_state.loc['a311av']/* 'Single' */, this.props.app_state.loc['a311as'] /* 'EP' */, this.props.app_state.loc['a311at']/* 'Audiobook' */, this.props.app_state.loc['a311au']/* 'Podcast' */], [1]
            ],
        };
    }


    get_content_channeling_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1233']/* 'international' */, this.props.app_state.loc['1232']/* 'language' */, this.props.app_state.loc['1231']/* 'local' */], [1]
            ],
        };
    }











    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <div className="row" style={{'width':'102%'}}>
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.get_new_job_page_tags_object} tag_size={'l'} when_tags_updated={this.when_new_job_page_tags_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img alt="" className="text-end" onClick={()=>this.finish_creating_object()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div>
                
                <div style={{'margin':'0px 0px 0px 0px', overflow: 'auto', maxHeight: this.props.height-120}}>
                    {this.render_everything()}   
                </div>
                
            </div>
        )
    }

    when_new_job_page_tags_updated(tag_group){
        this.setState({get_new_job_page_tags_object: tag_group})
    }


    render_everything(){
        var selected_item = this.get_selected_item(this.state.get_new_job_page_tags_object, this.state.get_new_job_page_tags_object['i'].active)

        if(selected_item == 'e'){
            return(
                <div>
                    {this.render_enter_tags_part()}
                </div>
            )    
        }
        else if(this.is_text_selected_item(selected_item)){
            return(
                <div>
                    {this.render_enter_text_part()}
                </div>
            ) 
        }
        else if(selected_item == this.props.app_state.loc['112']){
            return(
                <div>
                    {this.render_enter_image_part()}
                </div>
            ) 
        }
        else if(selected_item == this.props.app_state.loc['298']){
            return(
                <div>
                    {this.render_subscription_lock()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['a311b']/* 'album-fee' */){
            return(
                <div>
                    {this.render_album_fee()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['a311c']/* 'track-list' */){
            return(
                <div>
                    {this.render_track_list_ui()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['a311bg']/* 'metadata' */){
            return(
                <div>
                    {this.render_metadata_ui()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['162r']/* 'pdfs' */){
            return(
                <div>
                    {this.render_enter_pdf_part()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['a311bq']/* 'markdown' */){
            return(
                <div>
                    {this.render_enter_markdown_part()}
                </div>
            )
        }
    }

    is_text_selected_item(selected_item){
        var obj = [this.props.app_state.loc['115'],this.props.app_state.loc['116'],this.props.app_state.loc['117'],'Sans-serif','Courier New','Times New Roman','ComicSans','papyrus', '15px','11px','25px','40px']
        if(obj.includes(selected_item)){
            return true
        }
        return false
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }









    render_enter_tags_part(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div>
                    {this.render_title_tags_part()}
                    {this.render_detail_item('0')}
                    {this.render_title_tags_part2()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_title_tags_part()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_title_tags_part2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_title_tags_part()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_title_tags_part2()}
                    </div>
                </div>
                
            )
        }
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
                                    <img alt="" src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_title_tags_part(){
        return(
            <div style={{'padding':'0px 0px 0px 0px'}}>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'14px','text':this.props.app_state.loc['301']})}
                
                <div style={{height:10}}/>
                <TextInput height={30} placeholder={this.props.app_state.loc['123']} when_text_input_field_changed={this.when_title_text_input_field_changed.bind(this)} text={this.state.entered_title_text} theme={this.props.theme}/>
                <div style={{height: 10}}/>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.state.entered_title_text})}
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']+(this.props.app_state.title_size - this.state.entered_title_text.length)})}

                {this.render_detail_item('0')}
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'14px','text':this.props.app_state.loc['302']})}
                <div style={{height:10}}/>

                <div className="row" style={{width:'99%'}}>
                    <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput height={30} placeholder={this.props.app_state.loc['126']} when_text_input_field_changed={this.when_index_text_input_field_changed.bind(this)} text={this.state.entered_tag_text} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 10px 0px 0px'}}>
                        {/* {this.render_detail_item('5', {'text':this.props.app_state.loc['127'], 'action':'add_indexing_tag', 'prevent_default':true})} */}
                        <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                            <img alt="" className="text-end" onClick={()=>this.add_indexing_tag_for_new_job()} src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                        </div>
                    </div>
                </div>
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']+(this.props.app_state.tag_size - this.state.entered_tag_text.length)})}

                {this.render_detail_item('1',{'active_tags':this.state.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':'delete_entered_tag_word'})}


                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['303'], 'details':this.props.app_state.loc['304'], 'size':'l'})}
                <div style={{height:10}}/>
                <Tags page_tags_object={this.state.get_post_preview_option} tag_size={'l'} when_tags_updated={this.when_get_post_preview_option.bind(this)} theme={this.props.theme}/>



                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['311e']/* Masked for Outsiders. */, 'details':this.props.app_state.loc['311f']/* If set to masked, your post will not be visible to users without accounts. */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_masked_from_outsiders_option} tag_size={'l'} when_tags_updated={this.when_get_masked_from_outsiders_option.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>



                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311bl']/* 'Content Channeling' */, 'details':this.props.app_state.loc['a311bm']/* 'Specify the conetnt channel you wish to publish your new post. This setting cannot be changed.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_content_channeling_object} tag_size={'l'} when_tags_updated={this.when_get_content_channeling_object_updated.bind(this)} theme={this.props.theme}/>



                {this.render_detail_item('0')}
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['a311ay']/* 'Set the album art for your new post. The art will be rendered in a 1:1 aspect ratio.' */})}
                <div style={{height:10}}/>
                {this.render_create_image_ui_buttons_part2()}

            </div>
        )
    }

    render_title_tags_part2(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2757']/* Disable Activity Section. */, 'details':this.props.app_state.loc['2758']/* If set to disabled, activity and comments will be disabled for all users except you. */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_disabled_comments_section} tag_size={'l'} when_tags_updated={this.when_get_disabled_comments_section_option.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>


                
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['311h']/* Post Anonymously. */, 'details':this.props.app_state.loc['311i']/* If set to enabled, your alias and account id will be masked in your posts details and comment section. */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_post_anonymously_tags_option} tag_size={'l'} when_tags_updated={this.when_get_post_anonymously_tags_option_option.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>



                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311ai']/* 'Post Comment Section.' */, 'details':this.props.app_state.loc['a311aj']/* 'If set to disabled, senders cannot add comments in the post.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.chatroom_enabled_tags_object} tag_size={'l'} when_tags_updated={this.when_chatroom_enabled_tags_object_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>



                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311ak']/* 'Post Listing.' */, 'details':this.props.app_state.loc['476']/* 'If set to delisted, the item will not be visible for purchasing' */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_album_item_listing_option} tag_size={'l'} when_tags_updated={this.when_get_album_item_listing_option_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>



                
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311aw']/* 'Post Type.' */, 'details':this.props.app_state.loc['476']/* 'Set the type of post your'e uploading to the audioport section.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_listing_type_tags_option} tag_size={'l'} when_tags_updated={this.when_get_listing_type_tags_option_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>
            </div>
        )
    }

    when_get_disabled_comments_section_option(tag_obj){
        this.setState({get_disabled_comments_section: tag_obj})
    }

    when_get_masked_from_outsiders_option(tag_obj){
        this.setState({get_masked_from_outsiders_option: tag_obj})
    }

    when_get_post_nsfw_option(tag_obj){
        this.setState({get_post_nsfw_option: tag_obj})
    }

    when_get_post_preview_option(tag_obj){
        this.setState({get_post_preview_option: tag_obj})
    }

    when_title_text_input_field_changed(text){
        this.setState({entered_title_text: text})
    }

    when_index_text_input_field_changed(text){
        this.setState({entered_tag_text: text})
    }

    when_get_post_anonymously_tags_option_option(tag_obj){
        this.setState({get_post_anonymously_tags_option: tag_obj})
    }

    when_entered_genre_text_input_field_changed(text){
        this.setState({entered_genre_text: text})
    }

    when_entered_year_recorded_text_input_field_changed(text){
        if(isNaN(text)) return;
        this.setState({entered_year_recorded_text: text})
    }

    when_purchase_recipient_input_field_changed(text){
        if(isNaN(text)) return;
        this.setState({purchase_recipient: text})
    }

    when_entered_author_text_input_field_changed(text){
        this.setState({entered_author_text: text})
    }

    when_entered_copyright_text_input_field_changed(text){
        this.setState({entered_copyright_text: text})
    }

    when_entered_comment_text_input_field_changed(text){
        this.setState({entered_comment_text: text})
    }

    when_chatroom_enabled_tags_object_updated(tag_obj){
        this.setState({chatroom_enabled_tags_object: tag_obj})
    }

    when_get_album_item_listing_option_updated(tag_obj){
        this.setState({get_album_item_listing_option: tag_obj})
    }

    when_get_listing_type_tags_option_updated(tag_obj){
        var selected_item = this.get_selected_item(tag_obj, tag_obj['i'].active)
        this.setState({get_listing_type_tags_option: tag_obj, audio_type: selected_item})
    }

    when_get_content_channeling_object_updated(tag_obj){
        var selected_item = this.get_selected_item(tag_obj, tag_obj['i'].active)
        this.setState({get_content_channeling_object: tag_obj, content_channeling_setting: selected_item})
    }

    
    




    add_indexing_tag_for_new_job(){
        var typed_word = this.state.entered_tag_text.trim().toLowerCase();

        if(typed_word == ''){
            this.props.notify(this.props.app_state.loc['128'], 1400)
        }
        else if(this.hasWhiteSpace(typed_word)){
            this.props.notify(this.props.app_state.loc['129'], 1400)
        }
        else if(typed_word.length > this.props.app_state.tag_size){
            this.props.notify(this.props.app_state.loc['130'], 1400)
        }
        else if(typed_word.length < 3){
            this.props.notify(this.props.app_state.loc['131'], 1400)
        }
        else if(this.state.entered_indexing_tags.includes(typed_word)){
            this.props.notify(this.props.app_state.loc['132'], 1400)
        }
        else if(this.state.entered_indexing_tags.length == this.props.app_state.max_tags_count){
            this.props.notify(this.props.app_state.loc['162l']/* The maximum number of tags you can use is 7. */, 5400)
        }
        else if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(typed_word) /* || /\p{Emoji}/u.test(typed_word) */){
            this.props.notify(this.props.app_state.loc['162m'], 4400)/* You cant use special characters. */
        }
        else{
            var cloned_seed_array = this.state.entered_indexing_tags.slice()
            cloned_seed_array.push(typed_word)
            this.setState({entered_indexing_tags: cloned_seed_array, entered_tag_text:''})
            // this.props.notify('tag added!', 200)
        }
    }

    hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
    }

    delete_entered_tag_word(word, pos){
        var cloned_seed_array = this.state.entered_indexing_tags.slice()
        const index = cloned_seed_array.indexOf(word);
        if (index > -1) { // only splice array when item is found
            cloned_seed_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_indexing_tags: cloned_seed_array})
        // this.props.notify('tag removed', 200)
    }


    /* renders the buttons for pick images, set images and clear images */
    render_create_image_ui_buttons_part2(){
        var default_image = this.props.app_state.static_assets['music_label']
        var image = this.state.album_art == null ? default_image : this.get_image_from_file(this.state.album_art)
        return(
            <div>
                <div style={{'margin':'5px 0px 0px 0px','padding': '0px 5px 0px 10px', width: '99%'}}>
                    <div style={{'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img alt="" src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto'}} onClick={() => this.props.show_pick_file_bottomsheet('image', 'create_audio_album_art', 1)}/>
                    </div>

                    <div style={{'margin': '10px 0px 0px 0px'}}>
                        <img alt="" src={image} style={{height:100 ,width:100, 'border-radius':'10px'}} onClick={()=> this.when_icon_image_tapped()}/>
                    </div>
                </div>
            </div>
        )
    }

    when_icon_image_tapped(){
        this.setState({album_art: null})
    }

    when_album_art_selected(files){
        this.setState({album_art: files[0]});
    }








    render_metadata_ui(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div>
                    {this.render_metadata_section()}
                    {this.render_detail_item('0')}
                    {this.render_metadata_section2()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_metadata_section()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_metadata_section2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_metadata_section()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_metadata_section2()}
                    </div>
                </div>
                
            )
        }
    }

    render_metadata_section(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311bd']/* 'Purchase Recipient' */, 'details':this.props.app_state.loc['a311be']/* 'Set the recipient account ID for all the purchases of this object.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <TextInput height={30} placeholder={this.props.app_state.loc['a311bd']/* 'Purchase Recipient' */} when_text_input_field_changed={this.when_purchase_recipient_input_field_changed.bind(this)} text={this.state.purchase_recipient} theme={this.props.theme}/>
                <div style={{height: 10}}/>


                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311y']/* 'Album Genre.' */, 'details':this.props.app_state.loc['a311z']/* 'Set the genre for your new album.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <TextInput height={30} placeholder={this.props.app_state.loc['a311y']/* 'Album Genre.' */} when_text_input_field_changed={this.when_entered_genre_text_input_field_changed.bind(this)} text={this.state.entered_genre_text} theme={this.props.theme}/>




                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311aa']/* 'Year Recorded.' */, 'details':this.props.app_state.loc['a311ab']/* 'Set the year the album was recorded or released.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <TextInput height={30} placeholder={this.props.app_state.loc['a311aa']/* 'Year Recorded.' */} when_text_input_field_changed={this.when_entered_year_recorded_text_input_field_changed.bind(this)} text={this.state.entered_year_recorded_text} theme={this.props.theme}/>
                <div style={{height: 10}}/>

            </div>
        )
    }

    render_metadata_section2(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311ac']/* 'Author' */, 'details':this.props.app_state.loc['a311ad']/* 'Set the author of the Album.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <TextInput height={30} placeholder={this.props.app_state.loc['a311ac']/* 'Author' */} when_text_input_field_changed={this.when_entered_author_text_input_field_changed.bind(this)} text={this.state.entered_author_text} theme={this.props.theme}/>
                <div style={{height: 10}}/>




                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311ae']/* 'Copyright' */, 'details':this.props.app_state.loc['a311af']/* 'Set the copyright holder for the album.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <TextInput height={30} placeholder={this.props.app_state.loc['a311ae']/* 'Copyright' */} when_text_input_field_changed={this.when_entered_copyright_text_input_field_changed.bind(this)} text={this.state.entered_copyright_text} theme={this.props.theme}/>
                <div style={{height: 10}}/>



                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311ag']/* 'Comment' */, 'details':this.props.app_state.loc['a311ah']/* 'Add a comment for the album from its author.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <TextInput height={60} placeholder={this.props.app_state.loc['a311ag']/* 'Comment' */} when_text_input_field_changed={this.when_entered_comment_text_input_field_changed.bind(this)} text={this.state.entered_comment_text} theme={this.props.theme}/>
                <div style={{height: 10}}/>
            </div>
        )
    }









    render_subscription_lock(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_subscription_lock_content()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_subscription_lock_content()}
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
                        {this.render_subscription_lock_content()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_subscription_lock_content(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['305'], 'details':this.props.app_state.loc['306'], 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_subscription_list_group()}
            </div>
        )
    }

    render_subscription_list_group(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = [].concat(this.get_subscription_items())

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                <div style={{height:180, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img alt="" src={this.props.app_state.static_assets['letter']} style={{height:70 ,width:'auto'}} />
                                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }else{
            var background_color = this.props.theme['card_background_color']
            var card_shadow_color = this.props.theme['card_shadow_color']
            return ( 
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                {this.render_subscription_object(item, index)}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }

    get_subscription_items(){
        var my_subscriptions = []
        var myid = this.props.app_state.user_account_id[this.props.app_state.selected_e5]
        if(myid == null) myid = 1;
        var created_subs = this.get_all_sorted_objects(this.props.app_state.my_created_subscriptions)
        for(var i = 0; i < created_subs.length; i++){
            var post_author = created_subs[i]['event'] == null ? 0 : created_subs[i]['event'].returnValues.p3
            if(post_author.toString() == myid.toString()){
                my_subscriptions.push(created_subs[i])
            }
        }
        return my_subscriptions
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

    render_subscription_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_subscription_item(object)

        if(this.state.selected_subscriptions.includes(object['id']+object['e5'])){
            return(
                <div onClick={() => this.when_subscription_item_clicked(object)} style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                    <div style={{'padding': '5px 0px 5px 5px'}}>
                        {this.render_detail_item('1', item['tags'])}
                        <div style={{height: 10}}/>
                        <div style={{'padding': '0px 0px 0px 0px'}}>
                            {this.render_detail_item('3', item['id'])}
                        </div>
                        <div style={{'padding': '20px 0px 0px 0px'}}>
                            {this.render_detail_item('2', item['age'])}
                        </div>
                        <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '0px 10px 15px 10px'}}/>
                        <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '0px 10px 15px 10px'}}/>
                    </div>         
                </div>
            )
        }
        return(
            <div onClick={() => this.when_subscription_item_clicked(object)} style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '5px 0px 5px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                </div>         
            </div>
        )
    }

    when_subscription_item_clicked(object){
        var selected_clone = this.state.selected_subscriptions.slice()
        if(!selected_clone.includes(object['id']+object['e5'])){
            selected_clone.push(object['id']+object['e5'])
        }else{
            const index = selected_clone.indexOf(object['id']+object['e5']);
            if (index > -1) { // only splice array when item is found
                selected_clone.splice(index, 1); // 2nd parameter means remove one item only
            }
        }
        this.setState({selected_subscriptions:selected_clone})
    }

    format_subscription_item(object){
        var tags = object['ipfs'] == null ? ['Subscription'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Subscription ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var time = object['event'] == null ? 0 : object['event'].returnValues.p4
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }












    render_enter_text_part(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div style={{}}>
                    {this.render_text_part()}
                    {this.render_entered_texts()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_text_part()}
                        {this.render_entered_texts()}
                    </div>
                    <div className="col-6">
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_text_part()}
                        {this.render_entered_texts()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_text_part(){
        var add_text_button = this.state.edit_text_item_pos == -1 ? this.props.app_state.loc['136'] : this.props.app_state.loc['137']
        return(
            <div style={{'margin':'10px 0px 0px 10px'}}>
                {/* {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['307']})}
                {this.render_detail_item('0')} */}
                
                {/* <Tags font={this.props.app_state.font} page_tags_object={this.state.get_new_job_text_tags_object} tag_size={'l'} when_tags_updated={this.when_new_job_font_style_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/> */}

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['135']} when_text_input_field_changed={this.when_entered_text_input_field_changed.bind(this)} text={this.state.entered_text} theme={this.props.theme}/>
                <div style={{height:10}}/>

                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '7px 5px 10px 10px', width: '99%'}}>
                    {/* <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img src={this.props.app_state.static_assets['e5_empty_icon']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                        <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".gif" onChange ={this.when_banner_image_picked.bind(this)} />
                    </div> */}

                    {/* <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                        <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept ="image/*" onChange ={this.when_banner_image_picked.bind(this)} />
                    </div> */}

                    <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img alt="" src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} onClick={() => this.props.show_pick_file_bottomsheet('image', 'create_text_banner_image', 1)}/>
                    </div>

                    <div style={{'padding': '5px', width:205}}>
                        {this.render_detail_item('5', {'text':add_text_button, 'action':'when_add_text_button_tapped', 'prevent_default':true})}
                    </div>
                </div>
                <div style={{height:10}}/>
                {this.render_detail_item('4',this.get_edited_text_object())}
                <div style={{height:10}}/>
                {this.render_kaomoji_list()}
                {this.render_detail_item('0')}
            </div>
        )
    }

    when_entered_text_input_field_changed(text){
        this.setState({entered_text: text})
    }

    when_new_job_font_style_updated(tag_group){
        this.setState({get_new_job_text_tags_object: tag_group})
    }

    get_edited_text_object(){
        var font = this.get_selected_item(this.state.get_new_job_page_tags_object, 'font')
        var size = this.get_selected_item(this.state.get_new_job_page_tags_object, 'size')
        return{
            'font':font, 'textsize':size, 'text':this.state.entered_text
        }
    }

    when_add_text_button_tapped(){
        var typed_word = this.state.entered_text.trim();

        if(typed_word == ''){
            this.props.notify(this.props.app_state.loc['128'], 1400)
        }else{
            var entered_text = this.get_edited_text_object()
            if(this.state.edit_text_item_pos != -1){
                this.finish_editing_text_item(entered_text)
            }else{
                var cloned_entered_text_array = this.state.entered_text_objects.slice()
                cloned_entered_text_array.push(entered_text);
                this.setState({entered_text_objects: cloned_entered_text_array, entered_text:''})

                var cloned_array = this.state.entered_objects.slice()
                cloned_array.push({'data':entered_text, 'type':'4' })
                this.setState({entered_objects: cloned_array})
            }
            
        }
    }

    render_entered_texts(){
        var middle = this.props.height-420;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.entered_objects)
        return ( 
            <div style={{}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <SwipeableList>
                            <SwipeableListItem
                                swipeLeft={{
                                content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2908']/* Delete. */}</p>,
                                action: () => this.delete_text_item(item)
                                }}>
                                <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}><li style={{'padding': '5px'}} onClick={()=>this.edit_text_item(item)}>
                                    {this.render_text_or_banner_if_any(item, index)}
                                </li></div>
                            </SwipeableListItem>
                        </SwipeableList>
                        
                    ))}
                </ul>
            </div>
        );
    }

    render_text_or_banner_if_any(item, index){
        if(item['type'] == '11'){
            return(
                <div>
                    <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '7px 5px 10px 10px', width: '99%'}}>
                        <div>
                            {/* <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                                <img src={this.props.app_state.static_assets['e5_empty_icon']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                                <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".gif" onChange ={(e) => this.when_banner_image_updated(e, index)} />
                            </div> */}

                            {/* <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                                <img src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                                <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept ="image/*" onChange ={(e) => this.when_banner_image_updated(e, index)} />
                            </div> */}
                        </div>
                        <div style={{width:2}}/>
                        {this.render_detail_item('11',item['data'])}
                    </div>
                </div>
            )
        }
        else if(item['type'] == '4'){
            var object = structuredClone(item['data'])
            if(this.state.edit_text_item_pos == index) object['text'] = ''
            return(
                <div>
                    {this.render_detail_item('4', object)}
                </div>
            )
        }
    }


    delete_text_item(item){
        var cloned_array = this.state.entered_text_objects.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_text_objects: cloned_array})

        var entered_objects_pos = -1;
        for(var i=0; i<this.state.entered_objects.length; i++){
            if(this.state.entered_objects[i]['data'] == item['data']){
                entered_objects_pos = i;
            }
        }

        var cloned_array = this.state.entered_objects.slice()
        if (entered_objects_pos > -1) { // only splice array when item is found
            cloned_array.splice(entered_objects_pos, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_objects: cloned_array})

        // this.props.notify('item removed!', 600)
    }


    when_banner_image_picked = (e) => {
        if(e.target.files && e.target.files[0]){
            for(var i = 0; i < e.target.files.length; i++){ 
                let reader = new FileReader();
                reader.onload = function(ev){
                    if(ev.total < this.props.app_state.image_size_limit){
                        this.add_banner_to_object(ev.target.result)
                        // this.setState({selected_banner_image: ev.target.result});
                    }
                }.bind(this);
                var imageFile = e.target.files[i];
                imageCompression(imageFile, { maxSizeMB: 0.35, maxWidthOrHeight: 1920, useWebWorker: true }).then(function (compressedFile) {
                    reader.readAsDataURL(compressedFile);
                })
                .catch(function (error) {
                    console.log(error.message);
                });
            }
            var image = e.target.files.length == 1 ? 'image has' : 'images have';
            // this.props.notify('Your selected '+e.target.files.length+image+' been staged.',500);
        }
    }

    when_banner_selected(files){
        this.add_banner_to_object(files[0])
    }

    when_banner_image_updated = (e, index) => {
        if(e.target.files && e.target.files[0]){
            for(var i = 0; i < e.target.files.length; i++){ 
                let reader = new FileReader();
                reader.onload = function(ev){
                    if(ev.total < this.props.app_state.image_size_limit){
                        this.update_banner_in_object(ev.target.result, index)
                        // this.setState({selected_banner_image: ev.target.result});
                    }
                }.bind(this);
                var imageFile = e.target.files[i];
                imageCompression(imageFile, { maxSizeMB: 0.35, maxWidthOrHeight: 1920, useWebWorker: true }).then(function (compressedFile) {
                    reader.readAsDataURL(compressedFile);
                })
                .catch(function (error) {
                    console.log(error.message);
                });
            }
            var image = e.target.files.length == 1 ? 'image has' : 'images have';
            // this.props.notify('Your selected '+e.target.files.length+image+' been staged.',500);
        }
    }

    add_banner_to_object(image){
        var entered_text = this.get_edited_text_object()
        entered_text['textsize'] = '10px'
        var obj = {'image':this.get_image_from_file(image), 'caption':entered_text}
        var cloned_array = this.state.entered_objects.slice()
        cloned_array.push({'data':obj, 'type':'11' }) 
        this.setState({entered_objects: cloned_array, entered_text:''})
    }

    update_banner_in_object(image, index){
        var entered_text = this.get_edited_text_object()
        entered_text['textsize'] = '10px'
        var obj = {'image':image, 'caption':entered_text}
        var cloned_array = this.state.entered_objects.slice()
        var pos = index
        cloned_array[pos] = {'data':obj, 'type':'11' }
        this.setState({entered_objects: cloned_array, entered_text:''})
    }


    edit_text_item(item){
        var entered_objects_pos = -1;
        for(var i=0; i<this.state.entered_objects.length; i++){
            if(this.state.entered_objects[i]['data'] == item['data']){
                entered_objects_pos = i;
            }
        }
        if(item['type'] == '11'){
            return;
        }else{
            var text = item['data']['text']
            this.setState({edit_text_item_pos: entered_objects_pos, entered_text:text})
        }
        // this.props.notify('editing item', 600)
    }


    finish_editing_text_item(item){
        var cloned_array = this.state.entered_objects.slice()
        var pos = this.state.edit_text_item_pos
        cloned_array[pos] = {'data':item, 'type':'4' }
        console.log(cloned_array)
        this.setState({entered_objects: cloned_array, entered_text:'', edit_text_item_pos: -1})
    }


    render_kaomoji_list(){
        var items = ['⸜(｡˃ ᵕ ˂ )⸝♡','( ˶ˆᗜˆ˵ )','(๑>◡<๑)','ദ്ദി ˉ͈̀꒳ˉ͈́ )✧','( ˶°ㅁ°) !!','(*ᴗ͈ˬᴗ͈)ꕤ*.ﾟ','(｡>﹏<)','(๑-﹏-๑)','ᓚ₍ ^. .^₎','(˵ •̀ ᴗ - ˵ ) ✧','ᕙ(  •̀ ᗜ •́  )ᕗ','( ｡ •̀ ᴖ •́ ｡)','৻(  •̀ ᗜ •́  ৻)','( ˶ˆ꒳ˆ˵ )','(¬`‸´¬)','≽^•⩊•^≼','(ó﹏ò｡)']

        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={() => this.when_kamoji_clicked(item)}>
                            {this.render_detail_item('4',this.get_kamoji_text_object(item))}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_kamoji_text_object(text){
        return{
            'font':'Sans-serif', 'textsize':'15px','text':text
        }
    }

    when_kamoji_clicked(text){
        this.setState({entered_text: this.state.entered_text+' '+text})
    }








    render_enter_image_part(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_pick_images_parts()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_pick_images_parts()}
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
                        {this.render_pick_images_parts()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_pick_images_parts(){
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'13px','text':this.props.app_state.loc['145']})}
                {this.render_create_image_ui_buttons_part()}
                {this.render_image_part()}
            </div>
        )
    }

    /* renders the buttons for pick images, set images and clear images */
    render_create_image_ui_buttons_part(){
      return(
        <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '7px 5px 10px 10px', width: '99%'}}>
            {/* <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                <img src={this.props.app_state.static_assets['e5_empty_icon']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".gif" onChange ={this.when_image_gif_picked.bind(this)} multiple/>
            </div> */}

            {/* <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                <img src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept ="image/*" onChange ={this.when_image_gif_picked.bind(this)} multiple/>
            </div> */}

            <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                <img alt="" src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} onClick={() => this.props.show_pick_file_bottomsheet('image', 'create_image', 10**16)}/>
            </div>

            {/* <div style={{'padding': '5px', width:205}} onClick={()=>this.add_images_to_object()}>
                {this.render_detail_item('5', {'text':'Add Images', 'action':'-'})}
            </div> */}

        </div>
      )
    }

    add_images_to_object(){
        var images_to_add = this.state.entered_image_objects
        var id = Math.round(new Date().getTime()/1000);
        if(images_to_add.length == 0){
            this.props.notify('add some images or gifs first!', 800)
        }else{
            var cloned_array = this.state.entered_objects.slice()
            cloned_array.push({'data':{'images':images_to_add}, 'type':'9', 'id':id})
            this.setState({entered_objects: cloned_array, entered_image_objects:[]})
            this.props.notify('images added!', 800)
        }
    }

    /* called when images have been picked from picker */
    when_image_gif_picked = (e) => {
        if(e.target.files && e.target.files[0]){
            for(var i = 0; i < e.target.files.length; i++){ 
                let reader = new FileReader();
                reader.onload = function(ev){
                    const clonedArray = this.state.entered_image_objects == null ? [] : this.state.entered_image_objects.slice();
                    if(ev.total < this.props.app_state.image_size_limit){
                        clonedArray.push(ev.target.result);
                        this.setState({entered_image_objects: clonedArray});
                    }
                }.bind(this);
                var imageFile = e.target.files[i];
                imageCompression(imageFile, { maxSizeMB: 0.35, maxWidthOrHeight: 1920, useWebWorker: true }).then(function (compressedFile) {
                    reader.readAsDataURL(compressedFile);
                })
                .catch(function (error) {
                    console.log(error.message);
                });
            }
            var image = e.target.files.length == 1 ? 'image has' : 'images have';
            // this.props.notify('Your selected '+e.target.files.length+image+' been staged.',500);
        }
    }

    when_image_gif_files_picked(files){
        var clonedArray = this.state.entered_image_objects == null ? [] : this.state.entered_image_objects.slice();
        files.forEach(file => {
            clonedArray.push(file);
        });
        this.setState({entered_image_objects: clonedArray});
    }

    render_all_images_part(){
        var items = [].concat(this.get_image_objects())

        return(
            <div>
                {items.map((item, index) => (
                    <div onClick={()=>this.remove_image_group(item)}>
                        {this.render_detail_item('9', item['data'])} 
                    </div>
                ))}
            </div>
        )
    }

    get_image_objects(){
        var all_objs = this.state.entered_objects
        var image_objs = []
        for(var i = 0; i < all_objs.length; i++){
            var obj_in_focus = all_objs[i]
            if(obj_in_focus['type'] == '9'){
                image_objs.push(obj_in_focus)
            }
        }
        return image_objs
    }

    remove_image_group(item){
        var cloned_array = this.state.entered_objects.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_objects: cloned_array})
        this.props.notify('items removed!',600)
    }

    render_image_part(){
        var background_color = this.props.theme['card_background_color']
        var size = this.props.size
        var col = Math.round(400 / 100)
        var rowHeight = 100;

        if(this.state.entered_image_objects.length == 0){
            var items = ['1','1','1']
            return(
                <div>
                    <ImageList sx={{ width: 'auto', height: 'auto' }} cols={col} rowHeight={rowHeight}>
                        {items.map((item, index) => (
                            <ImageListItem key={item.img}>
                                <div style={{height:100, width:100, 'background-color': background_color, 'border-radius': '5px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img alt="" src={this.props.app_state.static_assets['letter']} style={{height:40 ,width:'auto'}} />
                                    </div>
                                    
                                </div>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            )
        }else{
            var items = [].concat(this.state.entered_image_objects);
            return(
                <div>
                    <ImageList sx={{ width: 'auto', height: 'auto' }} cols={col} rowHeight={rowHeight}>
                        {items.map((item, index) => (
                            <ImageListItem key={item}>
                                {this.render_image_item(item, index)}
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            )
        }
    }

    render_image_item(ecid, index){
        return(
            <div onClick={() => this.when_image_clicked(index)}>
                <img alt="" src={this.get_image_from_file(ecid)} style={{height:100 ,width:100}} />
            </div> 
        )
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

    when_image_clicked(index){
        var cloned_array = this.state.entered_image_objects.slice()
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_image_objects: cloned_array})
    }









    render_enter_pdf_part(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_pick_pdf_parts()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_pick_pdf_parts()}
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
                        {this.render_pick_pdf_parts()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_pick_pdf_parts(){
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'13px','text':this.props.app_state.loc['162o']/* 'The gray circle stages a pdf file. Then swipe it to remove.' */})}
                {this.render_create_pdf_ui_buttons_part()}
                {this.render_pdfs_part()}
            </div>
        )
    }

    render_create_pdf_ui_buttons_part(){
        return(
        <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '7px 5px 10px 10px', width: '99%'}}>
            <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                <img alt="" src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} onClick={() => this.props.show_pick_file_bottomsheet('pdf', 'create_pdf', 10**16)}/>
            </div>
        </div>
      )
    }

    when_pdf_files_picked(files){
        var clonedArray = this.state.entered_pdf_objects == null ? [] : this.state.entered_pdf_objects.slice();
        files.forEach(file => {
            clonedArray.push(file);
        });
        this.setState({entered_pdf_objects: clonedArray});
    }

    render_pdfs_part(){
        var items = [].concat(this.state.entered_pdf_objects)

        if(items.length == 0){
            return(
                <div style={{}}>
                    {this.render_empty_views(3)}
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_pdf_clicked(item, index)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <div style={{'margin':'3px 0px 3px 0px'}}>
                                            {this.render_uploaded_file(item, index)}
                                        </div>
                                    </div>
                                </SwipeableListItem>
                            </SwipeableList>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_uploaded_file(item, index){
        var ecid_obj = this.get_cid_split(item)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        //
        var formatted_size = this.format_data_size(data['size'])
        var fs = formatted_size['size']+' '+formatted_size['unit']
        var title = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
        var details = data['name']
        var thumbnail = data['thumbnail']

        return(
            <div>
                {this.render_detail_item('8', {'details':title,'title':details, 'size':'l', 'image':thumbnail, 'border_radius':'15%'})}
            </div>
        )
    }

    when_pdf_clicked(item, index){
        var cloned_array = this.state.entered_pdf_objects.slice()
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_pdf_objects: cloned_array})
    }







    render_enter_markdown_part(){
        var size = this.props.size
        if(size == 's' || size == 'm'){
            return(
                <div>
                    {this.render_edit_markdown_parts()}
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-8" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_edit_markdown_parts()}
                    </div>
                    <div className="col-4" style={{'padding': '10px 10px 10px 10px'}}>
                        
                    </div>
                </div>
                
            )
        }
    }

    render_edit_markdown_parts(){
        var theme = this.props.app_state.theme['markdown_theme']
        return(
            <div data-color-mode={theme}>
                <MDEditor
                    value={this.state.markdown}
                    height={this.props.height-200}
                    onChange={(val) => {
                        this.setState({markdown: val})
                    }}
                />
            </div>
        )
    }



    




    render_album_fee(){
        var size = this.props.app_state.size
        if(size == 's'){
            return(
                <div>
                    {this.render_set_token_and_amount_part()}
                    <div style={{height: 20}}/>
                    {this.render_set_prices_list_part()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_token_and_amount_part()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_prices_list_part()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_token_and_amount_part()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_prices_list_part()}
                    </div>
                </div>
                
            )
        }
    }

    render_set_token_and_amount_part(){
        return(
            <div style={{'overflow-x':'hidden'}}>
                {this.render_detail_item('4', {'text':this.props.app_state.loc['a311d']/* 'Set an fee for buying the entire audio catalog.' */, 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['237']/* 'Exchange ID.' */, 'details':this.props.app_state.loc['260']/* 'Select an exchange by its ID.' */, 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['237']/* 'Exchange ID.' */} when_text_input_field_changed={this.when_exchange_id_input_field_changed.bind(this)} text={this.state.exchange_id} theme={this.props.theme}/>

                {this.load_token_suggestions('exchange_id')}

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['261'], 'number':this.state.price_amount, 'relativepower':this.props.app_state.loc['483']/* tokens */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['261'], 'subtitle':this.format_power_figure(this.state.price_amount), 'barwidth':this.calculate_bar_width(this.state.price_amount), 'number':this.format_account_balance_figure(this.state.price_amount), 'barcolor':'', 'relativepower':this.props.app_state.loc['483']/* tokens */, })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} ref={this.amount_picker} font={this.props.app_state.font} number_limit={bigInt('1e'+(this.get_power_limit_for_exchange(this.state.exchange_id)+9))} when_number_picker_value_changed={this.when_price_amount.bind(this)} theme={this.props.theme} power_limit={this.get_power_limit_for_exchange(this.state.exchange_id)}/>

                <div style={{'padding': '5px'}} onClick={() => this.when_add_price_set()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['263'], 'action':''})}
                </div>
            </div>
        )
    }

    constructor(props) {
        super(props);
        this.amount_picker = React.createRef();
        this.amount_picker2 = React.createRef();
    }

    get_power_limit_for_exchange(exchange){
        var exchange_id = this.get_token_id_from_symbol(exchange.trim())

        if(!isNaN(exchange_id) && parseInt(exchange_id) > 0 && exchange_id != '' && this.does_exchange_exist(exchange_id)){
            var target_exchange_data = this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][exchange_id]
            var default_depth = 0;
            if(target_exchange_data != null){
                target_exchange_data = target_exchange_data['ipfs']
                if(target_exchange_data != null){
                    default_depth = target_exchange_data.default_depth == null ? 0 : target_exchange_data.default_depth
                }
            }

            return (default_depth*72)+63
        }
        else{
            return 63
        }
    }

    when_exchange_id_input_field_changed(text){
        this.setState({exchange_id: text})
        this.reset_the_number_picker()
    }

    reset_the_number_picker(){
        var me = this;
        setTimeout(function() {
            if(me.amount_picker.current != null){
                me.amount_picker.current.reset_number_picker()
            }
        }, (1 * 1000));  
    }

    when_price_amount(amount){
        this.setState({price_amount: amount})
    }

    when_add_price_set(){
        var exchange_id = this.get_token_id_from_symbol(this.state.exchange_id.trim())
        var amount = this.state.price_amount
        if(isNaN(exchange_id) || parseInt(exchange_id) < 0 || exchange_id == '' || !this.does_exchange_exist(exchange_id)){
            this.props.notify(this.props.app_state.loc['264'], 2600)
        }
        else if(amount == 0){
            this.props.notify(this.props.app_state.loc['265'], 2600)
        }
        else if(this.is_exchange_already_added(exchange_id, this.state.price_data)){
            this.props.notify(this.props.app_state.loc['266'], 3600)
        }
        else{
            var price_data_clone = this.state.price_data.slice()
            price_data_clone.push({'id':exchange_id, 'amount':amount})
            this.setState({price_data: price_data_clone, exchange_id:'', price_amount:0});
            this.props.notify(this.props.app_state.loc['267'], 1000)
        }
    }

    is_exchange_already_added(exchange_id, array){
        if(this.get_item_in_array(exchange_id, array) == null){
            return false
        }
        return true
    }

    get_item_in_array(exchange_id, object_array){
        var object = object_array.find(x => x['id'] === exchange_id);
        return object
    }

    get_token_id_from_symbol(typed_search){
        if(!isNaN(typed_search)){
            return typed_search
        }
        var id = this.props.app_state.token_directory[this.props.app_state.selected_e5][typed_search.toUpperCase()] == null ? typed_search : this.props.app_state.token_directory[this.props.app_state.selected_e5][typed_search.toUpperCase()]

        return id
    }

    does_exchange_exist(exchange_id){
        if(this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][parseInt(exchange_id)] == null){
            return false
        }
        return true
    }

    render_set_prices_list_part(){
        var middle = this.props.height-300;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.price_data)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img alt="" src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
            )
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_amount_clicked(item)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '5px'}}>
                                            <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.selected_e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.selected_e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                            </div>
                                        </li>
                                    </div>
                                </SwipeableListItem>
                            </SwipeableList>
                        ))}
                    </ul>
                </div>
            )
        } 
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

    when_amount_clicked(item){
        var cloned_array = this.state.price_data.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({price_data: cloned_array})
    }

    load_token_suggestions(target_type){
        var items = [].concat(this.get_suggested_tokens())
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 7px 0px', width: '97%', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 5px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                      {items.map((item, index) => (
                          <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_price_suggestion_clicked(item, index, target_type)}>
                              {this.render_detail_item('3', item['label'])}
                          </li>
                      ))}
                  </ul>
                </div>
        )
    }

    get_suggested_tokens(){
        var items = [
            {'id':'3', 'label':{'title':'END', 'details':this.props.app_state.loc['268'], 'size':'s'}},
            {'id':'5', 'label':{'title':'SPEND', 'details':this.props.app_state.loc['269'], 'size':'s'}},
        ];
        var exchanges_from_sync = this.props.app_state.created_tokens[this.props.app_state.selected_e5]
        if(exchanges_from_sync == null) exchanges_from_sync = []
        var sorted_token_exchange_data = []
        // var myid = this.props.app_state.user_account_id
        for (let i = 0; i < exchanges_from_sync.length; i++) {
            var exchange_e5 = exchanges_from_sync[i]['e5']
            var myid = this.props.app_state.user_account_id[exchange_e5]
            var author_account = exchanges_from_sync[i]['event'] == null ? '':exchanges_from_sync[i]['event'].returnValues.p3.toString() 
            if(author_account == myid.toString()){
                sorted_token_exchange_data.push(exchanges_from_sync[i])
            }
        }
        sorted_token_exchange_data.reverse()
        for (let i = 0; i < exchanges_from_sync.length; i++) {
            if(!sorted_token_exchange_data.includes(exchanges_from_sync[i]) && exchanges_from_sync[i]['balance'] != 0 && exchanges_from_sync[i]['event'] != null){
                sorted_token_exchange_data.push(exchanges_from_sync[i])
            }
        }

        for (let i = 0; i < sorted_token_exchange_data.length; i++) {
            items.push({'id':sorted_token_exchange_data[i]['id'], 'label':{'title':sorted_token_exchange_data[i]['id'], 'details':sorted_token_exchange_data[i]['ipfs'].entered_title_text, 'size':'s'}})
        }

        return items;
    }

    when_price_suggestion_clicked(item, pos, target_type){
        if(target_type == 'exchange_id') {
            this.setState({exchange_id: item['id']})
            this.reset_the_number_picker()
        }else if(target_type == 'exchange_id2'){
            this.setState({exchange_id2: item['id']})
            this.reset_the_number_picker2()
        }
    }








    render_track_list_ui(){
        var size = this.props.app_state.size
        if(size == 's'){
            return(
                <div style={{'overflow-x':'hidden'}}>
                    {this.render_song_details_picker_part()}
                    {this.render_enter_item_price_part()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'overflow-x':'hidden'}}>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_song_details_picker_part()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_enter_item_price_part()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row" style={{'overflow-x':'hidden'}}>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_song_details_picker_part()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_enter_item_price_part()}
                    </div>
                </div>
                
            )
        }
    }

    render_enter_item_price_part(){
        return(
            <div style={{}}>
                {this.render_set_token_and_amount_part2()}
                <div style={{height: 20}}/>
                {this.render_set_prices_list_part2()}
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311e']/* 'Add Audio.' */, 'details':this.props.app_state.loc['a311f']/* 'Add a new audio item with the specified details set.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div style={{'padding': '0px 0px 0px 0px'}} onClick={()=>this.when_add_song_tapped()}>
                    {/* <img src={this.props.app_state.static_assets['e5_empty_icon']} style={{height:45, width:'auto'}} /> */}
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['a311g']/* 'Add Audio.' */, 'action':''})}
                </div>
            </div>
        )
    }


    render_set_token_and_amount_part2(){
        return(
            <div style={{'overflow-x':'hidden'}}>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311h']/* 'Audio Price' */, 'details':this.props.app_state.loc['a311i']/* 'Specify the price for accessing this audio if added individually.' */, 'size':'l'})}
                <div style={{height:10}}/>

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['504']/* 'Exchange ID' */} when_text_input_field_changed={this.when_exchange_id_input_field_changed2.bind(this)} text={this.state.exchange_id2} theme={this.props.theme}/>

                {this.load_token_suggestions('exchange_id2')}
 

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['505']/* 'Price' */, 'number':this.state.price_amount2, 'relativepower':this.props.app_state.loc['506']/* 'tokens' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['505']/* 'Price' */, 'subtitle':this.format_power_figure(this.state.price_amount2), 'barwidth':this.calculate_bar_width(this.state.price_amount2), 'number':this.format_account_balance_figure(this.state.price_amount2), 'barcolor':'', 'relativepower':this.props.app_state.loc['506']/* 'tokens' */, })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} ref={this.amount_picker2} font={this.props.app_state.font} number_limit={bigInt('1e'+(this.get_power_limit_for_exchange(this.state.exchange_id)+9))} when_number_picker_value_changed={this.when_price_amount2.bind(this)} theme={this.props.theme} power_limit={this.get_power_limit_for_exchange(this.state.exchange_id)}/>

                <div style={{'padding': '5px'}} onClick={() => this.when_add_price_set2()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['507']/* 'Add Price' */, 'action':''})}
                </div>
            </div>
        )
    }

    when_exchange_id_input_field_changed2(text){
        this.setState({exchange_id: text})
        this.reset_the_number_picker2()
    }

    reset_the_number_picker2(){
        var me = this;
        setTimeout(function() {
            if(me.amount_picker.current != null){
                me.amount_picker.current.reset_number_picker()
            }
        }, (1 * 1000));  
    }

    when_price_amount2(amount){
        this.setState({price_amount2: amount})
    }


    when_add_price_set2(){
        var exchange_id = this.get_token_id_from_symbol(this.state.exchange_id2.trim())
        var amount = this.state.price_amount2
        if(isNaN(exchange_id) || parseInt(exchange_id) < 0 || exchange_id == '' || !this.does_exchange_exist(exchange_id)){
            this.props.notify(this.props.app_state.loc['508']/* 'please put a valid exchange id' */, 1600)
        }
        else if(amount == 0){
            this.props.notify(this.props.app_state.loc['509']/* 'please put a valid amount' */, 1600)
        }
        else if(this.is_exchange_already_added(exchange_id, this.state.price_data2)){
            this.props.notify(this.props.app_state.loc['510']/* 'You cant use the same exchange twice' */, 3600)
        }
        else{
            var price_data_clone = this.state.price_data2.slice()
            price_data_clone.push({'id':exchange_id, 'amount':amount})
            this.setState({price_data2: price_data_clone, price_amount:0, exchange_id:''});
            this.props.notify(this.props.app_state.loc['511']/* 'added price!' */, 1000)
        }
    }


    render_set_prices_list_part2(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.price_data2)

        if(items.length == 0){
            items = [0, 1]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 0px 2px 0px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 10px 0px'}}>
                                        <img alt="" src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_amount_clicked2(item)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '5px'}}>
                                            <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.selected_e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.selected_e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                            </div>
                                        </li>
                                    </div>
                                </SwipeableListItem>
                            </SwipeableList>
                            
                        ))}
                    </ul>
                </div>
            )
        }
        
    }

    when_amount_clicked2(item){
        var cloned_array = this.state.price_data2.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({price_data2: cloned_array})
    }






    render_song_details_picker_part(){
        return(
            <div>
                {this.render_detail_item('4', {'text':this.props.app_state.loc['a311j']/* Set the details for a new audio item in your collection or album. */, 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                {this.render_song_tabs()}
                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311k']/* 'Audio Title.' */, 'details':this.props.app_state.loc['513']/* 'Set the details for a new audio item in your album.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['a311m']/* 'Title...' */} when_text_input_field_changed={this.when_song_title_input_field_changed.bind(this)} text={this.state.song_title} theme={this.props.theme}/>
                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311n']/* 'Audio Composer.' */, 'details':this.props.app_state.loc['a311o']/* 'Set the composers of the auido file.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['a311p']/* 'Composer...' */} when_text_input_field_changed={this.when_song_composer_input_field_changed.bind(this)} text={this.state.song_composer} theme={this.props.theme}/>
                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311u']/* 'Audio Track.' */, 'details':this.props.app_state.loc['a311v']/* 'Pick the track from your uploaded files.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_audio_picker_ui()}
                <div style={{height:10}}/>
                {this.render_song_audio()}
                {this.render_detail_item('0')}




                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311bh']/* 'Audio Lyrics.' */, 'details':this.props.app_state.loc['a311bi']/* 'You may add lyrics to your uploaded track. Keep in mind that the file has to be a .lrc file.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_audio_lyric_picker_ui()}
                <div style={{height:10}}/>
                {this.render_song_lyrics()}
                {this.render_detail_item('0')}




                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311ba']/* 'Track Free Plays.' */, 'details':this.props.app_state.loc['a311bb']/* 'Set the number of free plays for your track before a purchase is required.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['261'], 'number':this.state.songs_free_plays_count, 'relativepower':this.props.app_state.loc['a311bc']/* plays */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['a311ba']/* 'Track Free Plays.' */, 'subtitle':this.format_power_figure(this.state.songs_free_plays_count), 'barwidth':this.calculate_bar_width(this.state.songs_free_plays_count), 'number':this.format_account_balance_figure(this.state.songs_free_plays_count), 'barcolor':'', 'relativepower':this.props.app_state.loc['a311bc']/* plays */, })}
                </div>
                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={999} when_number_picker_value_changed={this.when_free_plays_amount_picked.bind(this)} theme={this.props.theme} power_limit={0}/>
            </div>
        )
    }

    when_song_title_input_field_changed(text){
        this.setState({song_title: text})
    }

    when_song_composer_input_field_changed(text){
        this.setState({song_composer: text})
    }

    when_free_plays_amount_picked(number){
        this.setState({songs_free_plays_count: number})
    }

    render_audio_picker_ui(){
        return(
            <div>
                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '7px 5px 10px 10px', width: '99%'}}>
                    <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img alt="" src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} onClick={() => this.props.show_pick_file_bottomsheet('audio', 'create_audio_pick_audio_file', 1)}/>
                    </div>
                </div>
                
            </div>
        )
    }

    when_audio_file_picked(files){
        this.setState({audio_file: files[0]});

        if(this.state.album_art == null){
            var ecid_obj = this.get_cid_split(files[0])
            if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
            var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
            var thumbnail = data['thumbnail']
            if(thumbnail != null){
                this.setState({album_art: thumbnail})
            }
        }
    }

    render_song_audio(){
        var audio_file = this.state.audio_file
        if(audio_file == null){
            return(
                <div>
                    {this.render_empty_views(1)}
                </div>
            )
        }else{
            var ecid_obj = this.get_cid_split(audio_file)
            if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
            var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
            var formatted_size = this.format_data_size(data['size'])
            var fs = formatted_size['size']+' '+formatted_size['unit']
            var title = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
            var details = data['name']
            var thumbnail = data['thumbnail']
            return(
                <div>
                    {this.render_detail_item('8', {'details':title,'title':details, 'size':'l', 'image':thumbnail, 'border_radius':'15%', 'image_width':50})}
                </div>
            )
        }
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




    render_audio_lyric_picker_ui(){
        return(
            <div>
                <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 10px'}}>
                    <img alt="" src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                    
                    <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".lrc" onChange ={this.when_lyric_file_picked.bind(this)}/>
                </div>
            </div>
        )
    }

    when_lyric_file_picked = (e) => {
        if(e.target.files && e.target.files[0]){
            for(var i = 0; i < e.target.files.length; i++){ 
                let reader = new FileReader();
                reader.onload = function(ev){
                    var data = ev.target.result
                    var lyrics_data = this.parseLyric(data)
                    this.setState({song_lyrics: lyrics_data})
                }.bind(this);
                var audioFile = e.target.files[i];
                reader.readAsText(audioFile);
            }
        }
    }

    parseLyric(lrc) {
        const regex = /^\[(?<time>\d{2}:\d{2}(.\d{2})?)\](?<text>.*)/;
        // split lrc string to individual lines
        const lines = lrc.split("\n");
        const output = [];

        lines.forEach(line => {
            const match = line.match(regex);
            if (match == null) return;
            const { time, text } = match.groups;
            output.push({
                time: this.parseTime(time),
                text: text.trim()
            });
        });
        return output
    }

    parseTime(time) {
        const minsec = time.split(":");

        const min = parseInt(minsec[0]) * 60;
        const sec = parseFloat(minsec[1]);

        return min + sec;
    }

    render_song_lyrics(){
        var song_lyrics = this.state.song_lyrics
        if(song_lyrics == null){
            return(
                <div>
                    {this.render_empty_views(1)}
                </div>
            )
        }else{
            var title = this.props.app_state.loc['a311bk']/* 'Lyrics Added' */
            var details = song_lyrics.length + this.props.app_state.loc['a311bj']/* ' lines.' */
            return(
                <div>
                    {this.render_detail_item('3', {'details':details,'title':title, 'size':'l'})}
                </div>
            )
        }
    }


    when_add_song_tapped(){
        var song_title = this.state.song_title.trim()
        var song_composer = this.state.song_composer.trim()
        var price_data2 = this.state.price_data2
        var audio_file = this.state.audio_file
        var songs_free_plays_count = this.state.songs_free_plays_count
        var song_lyrics = this.state.song_lyrics

        if(song_title == ''){
            this.props.notify(this.props.app_state.loc['a311q']/* 'You need to set a title for the track.' */, 3800)
        }
        else if(song_composer == ''){
            this.props.notify(this.props.app_state.loc['a311r']/* 'You need to set a composer of the track.' */, 3800)
        }
        else if(audio_file == null){
            this.props.notify(this.props.app_state.loc['a311w']/* 'You need to add an audio track.' */, 3800)
        }
        else{
            var song = {'song_id':makeid(8), 'song_title':song_title, 'song_composer':song_composer, 'price_data':price_data2, 'track':audio_file, 'songs_free_plays_count':songs_free_plays_count, 'basic_data':this.get_song_basic_data(audio_file), 'lyrics':song_lyrics}

            var clone = this.state.songs.slice()
            if(this.state.edit_song_item_pos != -1){
                clone[this.state.edit_song_item_pos] = song
                this.props.notify(this.props.app_state.loc['a311s']/* 'Edited the track item.' */, 2600)
            }else{
                clone.push(song)
                this.props.notify(this.props.app_state.loc['a311t']/* 'Added the track item.' */, 2600)
            }
            this.setState({songs: clone, song_title:'', song_composer:'', price_data2:[], edit_song_item_pos: -1, audio_file:null, song_lyrics:null})
            
        }
    }

    get_song_basic_data(audio_file){
        var ecid_obj = this.get_cid_split(audio_file)
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        var clone = structuredClone(data)
        clone['thumbnail'] = null
        clone['data'] = null
        return clone
    }


    render_song_tabs(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.songs)

        if(items.length == 0){
            items = [1, 2, 3]
            return(
                <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                <div style={{height:47, width:97, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img alt="" src={this.props.app_state.static_assets['letter']} style={{height:20 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        return(
            <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_tab_clicked(item, index)}>
                            {this.render_tab_item(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_tab_item(item, index){
        if(this.is_tab_active(index)){
            return(
                <div>
                    {this.render_detail_item('3', {'title':item['song_id'], 'details':'', 'size':'s', 'padding':'5px 12px 5px 12px'})}
                    <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '0px 5px 3px 5px'}}/>
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':item['song_id'], 'details':this.truncate(item['song_title'], 15), 'size':'s', 'padding':'5px 12px 5px 12px'})}
                </div>
            )
        }
    }

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }

    is_tab_active(index){
        return this.state.edit_song_item_pos == index
    }

    when_tab_clicked(item, index){
        let me = this;
        if(Date.now() - this.last_all_click_time < 200){
            //double tap
            me.remove_tab_item(index)
            clearTimeout(this.all_timeout);
        }else{
            this.all_timeout = setTimeout(function() {
                clearTimeout(this.all_timeout);
                // single tap
                me.focus_tab(index)
            }, 200);
        }
        this.last_all_click_time = Date.now();
    }

    remove_tab_item(index){
        var cloned_array = this.state.songs.slice()
        // const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only

            var prev_index = index -1;
            if(this.is_tab_active(index) && prev_index > -1){
                this.focus_tab(prev_index)
            }
            this.setState({songs: cloned_array})
        }
    }

    focus_tab(item_pos){
        if(this.is_tab_active(item_pos)){
            this.setState({song_title:'', song_composer:'', price_data2:[], edit_song_item_pos: -1, audio_file:null, song_lyrics:null, songs_free_plays_count:0})
        }else{
            this.props.notify(this.props.app_state.loc['a311x']/* 'Editing that Track.' */, 2000)
            this.set_focused_song_data(item_pos)
        }
    }

    set_focused_song_data(item_pos){
        var song = this.state.songs[item_pos]
        this.setState({song_title: song['song_title'], song_composer: song['song_composer'], price_data2: song['price_data'], audio_file: song['track'], edit_song_item_pos: item_pos, songs_free_plays_count: song['songs_free_plays_count'], song_lyrics: song['lyrics']});
    }






    finish_creating_object(){
        var index_tags = this.state.entered_indexing_tags
        var title = this.state.entered_title_text
        var genre = this.state.entered_genre_text
        var year = this.state.entered_year_recorded_text
        var author = this.state.entered_author_text
        var copyright = this.state.entered_copyright_text
        var comment = this.state.entered_comment_text
        var album_price_data = this.state.price_data
        var tracks = this.state.songs
        var album_art = this.state.album_art
        var purchase_recipient = this.state.purchase_recipient

        if(index_tags.length < 3){
            this.props.notify(this.props.app_state.loc['270'], 4700)
        }
        else if(title == ''){
            this.props.notify(this.props.app_state.loc['311'], 4700)
        }
        else if(title.length > this.props.app_state.title_size){
            this.props.notify(this.props.app_state.loc['272'], 4700)
        }
        else if(genre == ''){
            this.props.notify(this.props.app_state.loc['a311al']/* 'You need to specify the albums genre.' */, 4700)
        }
        else if(year == ''){
            this.props.notify(this.props.app_state.loc['a311am']/* You need to speicfy the albums year. */, 4700)
        }
        else if(author == ''){
            this.props.notify(this.props.app_state.loc['a311an']/* You need to specify the albums author. */, 4700)
        }
        else if(copyright == ''){
            this.props.notify(this.props.app_state.loc['a311ao']/* You need to specify the albums copyright holder. */, 4700)
        }
        else if(comment == ''){
            this.props.notify(this.props.app_state.loc['a311ap']/* You need to add the authors comment for the album. */, 4700)
        }
        else if(tracks.length == 0){
            this.props.notify(this.props.app_state.loc['a311aq']/* You need to add some tracks to the new album. */, 4700)
        }
        else if(album_art == null){
            this.props.notify(this.props.app_state.loc['a311az']/* You need to set the album art for your new post. */, 4700)
        }
        else if(purchase_recipient == ''){
            this.props.notify(this.props.app_state.loc['a311bf']/* You need to set a purchase recipient for your new audiopost. */, 4700)
        } 
        else{
            // var me = this;
            // this.setState({content_channeling_setting: me.props.app_state.content_channeling,
            //     device_language_setting :me.props.app_state.device_language,
            //     device_country :me.props.app_state.device_country,
            //     e5 :me.props.app_state.selected_e5,})

            var me = this;
            setTimeout(function() {
                me.props.when_add_new_object_to_stack(me.state)
        
                me.setState({id: makeid(8), type:me.props.app_state.loc['a311a']/* audio */, e5:me.props.app_state.selected_e5, get_new_job_page_tags_object: me.get_new_job_page_tags_object(), entered_tag_text: '', entered_title_text:'', entered_text:'', entered_indexing_tags:[], entered_text_objects:[], entered_image_objects:[], entered_objects:[], selected_subscriptions:[], content_channeling_setting: me.props.app_state.content_channeling, device_language_setting: me.props.app_state.device_language, device_country: me.props.app_state.device_country, typed_link_text:'', link_search_results:[], added_links:[], get_post_preview_option:me.get_post_preview_option(), edit_text_item_pos:-1, get_masked_from_outsiders_option:me.get_masked_from_outsiders_option(), get_disabled_comments_section:me.get_disabled_comments_section(), get_post_anonymously_tags_option:me.get_post_anonymously_tags_option(), chatroom_enabled_tags_object:me.get_chatroom_enabled_tags_object(), get_album_item_listing_option:me.get_album_item_listing_option(), exchange_id:'', price_amount:0, price_data:[], exchange_id2:'', price_amount2:0, price_data2:[], song_title:'', song_composer:'', songs:[], edit_song_item_pos:-1, entered_genre_text:'', entered_year_recorded_text:'',entered_author_text:'', entered_copyright_text:'',entered_comment_text:'', album_art:null, entered_pdf_objects:[], markdown:''})
            }, (1 * 1000));

            
            this.props.notify(this.props.app_state.loc['18'], 1700);
        }
    }










    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} add_indexing_tag_for_new_job={this.add_indexing_tag_for_new_job.bind(this)} delete_entered_tag={this.delete_entered_tag_word.bind(this)} when_add_text_button_tapped={this.when_add_text_button_tapped.bind(this)} width={this.props.app_state.width} show_images={this.show_images.bind(this)}/>
            </div>
        )

    }

    show_images(){

    }

    get_number_width(number){
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
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


}




export default NewAudioPage;