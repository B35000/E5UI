import React, { Component } from 'react';
import ViewGroups from '../../components/view_groups';
import Tags from '../../components/tags';
import TextInput from '../../components/text_input';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Draggable } from "react-drag-reorder";

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import imageCompression from 'browser-image-compression';
import MDEditor from '@uiw/react-md-editor';


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

class NewPostPage extends Component {
    
    state = {
        id: makeid(8), type:this.props.app_state.loc['297'], e5:this.props.app_state.selected_e5,
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

        get_sort_links_tags_object:this.get_sort_links_tags_object(), 
        get_post_nsfw_option:this.get_post_nsfw_option(),
        get_masked_from_outsiders_option:this.get_masked_from_outsiders_option(),
        get_disabled_comments_section:this.get_disabled_comments_section(),
        get_post_anonymously_tags_option:this.get_post_anonymously_tags_option(),
        get_content_channeling_object:this.get_content_channeling_object(), entered_pdf_objects:[],

        markdown:''
    };

    get_new_job_page_tags_object(){
        var obj = {
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['110']/* ,this.props.app_state.loc['111'] */, this.props.app_state.loc['112'], this.props.app_state.loc['162r']/* 'pdfs' */, this.props.app_state.loc['a311bq']/* 'markdown' */, this.props.app_state.loc['298']], [0]
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

    get_new_job_text_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e','e.font', 'e.size'], [0]
            ],
            'font':[
                ['xor','e',1], ['font','Sans-serif','Courier New','Times New Roman','ComicSans','papyrus'], [1],[1]
            ],
            'size':[
                ['xor','e',1], ['size','15px','11px','25px','40px'], [1],[1]
            ],
        };
    }

    get_sort_links_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['162a']/* '📑 contract' */, this.props.app_state.loc['162b']/* '💼 job' */, this.props.app_state.loc['162c']/* '👷🏻‍♀️ contractor' */, this.props.app_state.loc['162d']/* '🏪 storefront' */, this.props.app_state.loc['162e']/* '🎫 subscription' */,this.props.app_state.loc['162f']/* '📰 post' */,this.props.app_state.loc['162g'] /* '📡 channel' */, this.props.app_state.loc['162h']/* '🪙 token' */, this.props.app_state.loc['162i']/* '🧎 proposal' */], [0]
            ],
        };
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
        else if(selected_item == this.props.app_state.loc['111']){
            return(
                <div>
                    {this.render_enter_links_part()}
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
                                    <img src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
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
                <div style={{height:10}}/>



                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311bl']/* 'Content Channeling' */, 'details':this.props.app_state.loc['a311bm']/* 'Specify the conetnt channel you wish to publish your new post. This setting cannot be changed.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_content_channeling_object} tag_size={'l'} when_tags_updated={this.when_get_content_channeling_object_updated.bind(this)} theme={this.props.theme}/>





                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311bn']/* 'Channeling City (Optional)' */, 'details':this.props.app_state.loc['a311bo']/* 'If you\'ve set local channeling, you can restrict your post to a specific city.' */, 'size':'l'})}
                <div style={{height:10}}/>

                <TextInput height={30} placeholder={this.props.app_state.loc['a311bp']/* 'Enter City...' */} when_text_input_field_changed={this.when_device_city_input_field_changed.bind(this)} text={this.state.device_city} theme={this.props.theme}/>
                
                <div style={{height:5}}/>
                {this.render_detail_item('1',{'active_tags':this.get_cities_from_typed_text(), 'indexed_option':'indexed', 'when_tapped':'when_city_selected'})}
                
                <div style={{height:10}}/>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'14px','text':this.state.selected_device_city})}

            </div>
        )
    }

    render_title_tags_part2(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['311c']/* Mark as NSFW. */, 'details':this.props.app_state.loc['311d']/* If set to nsfw, post will be marked as not safe for work. */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_post_nsfw_option} tag_size={'l'} when_tags_updated={this.when_get_post_nsfw_option.bind(this)} theme={this.props.theme}/>



                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['311e']/* Masked for Outsiders. */, 'details':this.props.app_state.loc['311f']/* If set to masked, your post will not be visible to users without accounts. */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_masked_from_outsiders_option} tag_size={'l'} when_tags_updated={this.when_get_masked_from_outsiders_option.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>




                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2757']/* Disable Activity Section. */, 'details':this.props.app_state.loc['2758']/* If set to disabled, activity and comments will be disabled for all users except you. */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_disabled_comments_section} tag_size={'l'} when_tags_updated={this.when_get_disabled_comments_section_option.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>



                
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['311h']/* Post Anonymously. */, 'details':this.props.app_state.loc['311i']/* If set to enabled, your alias and account id will be masked in your posts details and comment section. */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_post_anonymously_tags_option} tag_size={'l'} when_tags_updated={this.when_get_post_anonymously_tags_option_option.bind(this)} theme={this.props.theme}/>
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

    when_get_content_channeling_object_updated(tag_obj){
        var selected_item = this.get_selected_item(tag_obj, tag_obj['i'].active)
        this.setState({get_content_channeling_object: tag_obj, content_channeling_setting: selected_item})
    }

    when_device_city_input_field_changed(text){
        this.setState({device_city: text.toLowerCase()})
    }

    get_cities_from_typed_text(){
        var selected_cities = []
        var typed_text = this.state.device_city
        var all_cities = this.props.app_state.all_cities
        var specific_cities = []
        var device_country = this.props.app_state.device_country_code

        if(typed_text != ''){
            specific_cities = all_cities.filter(function (el) {
                return (el['city'].startsWith(typed_text) || el['city'] == typed_text) && el['country'].startsWith(device_country)
            });
        }else{
            specific_cities = all_cities.filter(function (el) {
                return el['country'].startsWith(device_country)
            });
        }

        var l = specific_cities.length > 7 ? 7 : specific_cities.length
        for(var i=0; i<l; i++){
            selected_cities.push(specific_cities[i]['city'])
        }
        return selected_cities;
    }

    when_city_selected(tag, pos){
        if(tag != 'e') this.setState({selected_device_city: tag, device_city:''})
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
        else if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(typed_word)){
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
                                        <img src={this.props.app_state.static_assets['letter']} style={{height:70 ,width:'auto'}} />
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









    render_enter_links_part(){
        return(
            <div style={{'margin':'10px 0px 0px 0px'}}>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['308']})}
                <div style={{height:10}}/>
                <div className="row" style={{width:'103%'}}>
                    <div className="col-9" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['292']} when_text_input_field_changed={this.when_typed_link_text_changed.bind(this)} text={this.state.typed_link_text} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 10px 0px 0px'}} onClick={()=> this.search_object()} >
                        {this.render_detail_item('5',{'text':this.props.app_state.loc['140'],'action':'', 'prevent_default':true})}
                    </div>
                </div>
                <div style={{height:10}}/>
                {this.render_selected_links()}

                {this.render_detail_item('0')}
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_sort_links_tags_object} tag_size={'l'} when_tags_updated={this.when_get_sort_links_tags_object_updated.bind(this)} theme={this.props.theme}/>

                <div style={{height:10}}/>
                {this.render_searched_link_results()}

            </div>
        )
    }

    when_get_sort_links_tags_object_updated(tag_obj){
        this.setState({get_sort_links_tags_object: tag_obj})
    }

    when_typed_link_text_changed(text){
        this.setState({typed_link_text: text})
    }


    search_object(){
        var typed_text = this.state.typed_link_text

        if(typed_text == ''){
            this.props.notify(this.props.app_state.loc['128'], 1800)
        }else{
            this.props.notify(this.props.app_state.loc['141'], 600)
            var return_data = this.search_for_object(typed_text)
            this.setState({link_search_results: return_data})
        }
    }


    search_for_object(typed_text){
        var contracts = this.get_all_sorted_objects(this.props.app_state.created_contracts)
        var channels = this.get_all_sorted_objects(this.props.app_state.created_channels)
        var contractors = this.get_all_sorted_objects(this.props.app_state.created_contractors)
        var jobs = this.get_all_sorted_objects(this.props.app_state.created_jobs)
        var posts = this.get_all_sorted_objects(this.props.app_state.created_posts)
        var proposals = this.get_all_sorted_objects(this.props.app_state.my_proposals)
        var storefronts = this.get_all_sorted_objects(this.props.app_state.created_stores)
        var subscriptions = this.get_all_sorted_objects(this.props.app_state.created_subscriptions)
        var tokens = this.get_all_sorted_objects(this.props.app_state.created_tokens)
    

        var return_objects = []
        var my_objects = []
        contracts.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            console.log(object['id'])
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'contract'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'contract'})
            }
        });

        channels.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'channel'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'channel'})
            }
        });

        contractors.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'contractor'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'contractor'})
            }
        });

        jobs.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'job'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'job'})
            }
        });


        posts.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'post'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'post'})
            }
        });


        proposals.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'proposal'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'proposal'})
            }
        });

        storefronts.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'storefront'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'storefront'})
            }
        });


        subscriptions.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'subscription'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'subscription'})
            }
        });

        tokens.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'token'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'token'})
            }
        });

        if(return_objects.length == 0 || typed_text == '') return my_objects;
        return return_objects
    }

    // get_all_sorted_objects(object){
    //     var all_objects = []
    //     for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
    //         var e5 = this.props.app_state.e5s['data'][i]
    //         var e5_objects = object[e5]
    //         if(e5_objects != null){
    //             all_objects = all_objects.concat(e5_objects)
    //         }
    //     }

    //     return this.sortByAttributeDescending(all_objects, 'timestamp')
    // }

    // sortByAttributeDescending(array, attribute) {
    //   return array.sort((a, b) => {
    //       if (a[attribute] < b[attribute]) {
    //       return 1;
    //       }
    //       if (a[attribute] > b[attribute]) {
    //       return -1;
    //       }
    //       return 0;
    //   });
    // }


    render_selected_links(){
        var items = [].concat(this.state.added_links).reverse()
        var background_color = this.props.theme['card_background_color']

        if(items.length == 0){
            items = [1, 2, 3]
            return(
                <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                <div style={{height:47, width:97, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img src={this.props.app_state.static_assets['letter']} style={{height:20 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_link_item_clicked(item)}>
                            {this.render_detail_item('3', {'title':this.get_title(item), 'details':this.truncate(item['title'], 15), 'size':'s', 'padding':'5px 12px 5px 12px'})}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }

    get_title(item){
        var obj = {'contract':'📑', 'job':'💼', 'contractor':'👷🏻‍♀️', 'storefront':'🏪','subscription':'🎫', 'post':'📰','channel':'📡','token':'🪙', 'proposal':'🧎'}
        var item_id = ((item['e5']).toUpperCase()+' • '+item['id'])
        return `${obj[item['type']]} ${item_id}`
    }


    when_link_item_clicked(item){
        var clone = this.state.added_links.slice()
        var pos = clone.indexOf(item)
        if(pos > -1){
            clone.splice(pos, 1)
        }
        this.setState({added_links: clone})
        // this.props.notify('Link removed from object', 700)
    }


    render_searched_link_results(){
        var middle = this.props.height-400;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.link_search_results)

        if(items.length == 0){
            items = this.search_for_object('')
        }

        items = this.sort_searched_link_results(items)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
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
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 0px 2px 0px'}} onClick={()=>this.when_searched_link_tapped(item)}>
                                {this.render_detail_item('3', {'title':''+this.get_title(item), 'details':item['title'], 'size':'s'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    sort_searched_link_results(items){
        var selected_item = this.get_selected_item2(this.state.get_sort_links_tags_object, 'e')
        var results = []
        if(selected_item == 0/* e */){
            return items
        }
        else if(selected_item == 1/* 📑 contract */){
            items.forEach(item => {
                if(item['type'] == 'contract'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 2/* 💼 job */){
            items.forEach(item => {
                if(item['type'] == 'job'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 3/* 👷🏻‍♀️ contractor */){
            items.forEach(item => {
                if(item['type'] == 'contractor'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 4/* 🏪 storefront */){
            items.forEach(item => {
                if(item['type'] == 'storefront'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 5/* 🎫 subscription */){
            items.forEach(item => {
                if(item['type'] == 'subscription'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 6/* 📰 post */){
            items.forEach(item => {
                if(item['type'] == 'post'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 7/* 📡 channel */){
            items.forEach(item => {
                if(item['type'] == 'channel'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 8/* 🪙 token */){
            items.forEach(item => {
                if(item['type'] == 'token'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 9/* 🧎 proposal */){
            items.forEach(item => {
                if(item['type'] == 'proposal'){
                    results.push(item)
                }
            });
        }

        return results;
    }

    get_selected_item2(object, option){
        return object[option][2][0]
    }

    when_searched_link_tapped(item){
        var clone = this.state.added_links.slice()
        var pos = this.position_of(item, clone)

        if(pos > -1){
            this.props.notify(this.props.app_state.loc['143'], 1700)
        }else{
            clone.push(item)
            this.setState({added_links: clone})
            this.props.notify(this.props.app_state.loc['144'], 1400)
        }
    }

    position_of(item, added_links){
        var pos = -1
        added_links.forEach(element => {
            if(element['id'] == item['id'] && element['e5'] == item['e5']){
                pos = added_links.indexOf(element)
            }
        });
        return pos
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
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['146']})}
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
                                        <img src={this.props.app_state.static_assets['letter']} style={{height:40 ,width:'auto'}} />
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






    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} add_indexing_tag_for_new_job={this.add_indexing_tag_for_new_job.bind(this)} delete_entered_tag={this.delete_entered_tag_word.bind(this)} when_add_text_button_tapped={this.when_add_text_button_tapped.bind(this)} width={this.props.app_state.width} when_city_selected={this.when_city_selected.bind(this)} />
            </div>
        )

    }



    finish_creating_object(){
        var index_tags = this.state.entered_indexing_tags
        var title = this.state.entered_title_text
        var texts = this.state.entered_text_objects
        var images = this.state.entered_image_objects

        if(index_tags.length < 3){
            this.props.notify(this.props.app_state.loc['270'], 2700)
        }
        else if(title == ''){
            this.props.notify(this.props.app_state.loc['311'], 2700)
        }
        else if(title.length > this.props.app_state.title_size){
            this.props.notify(this.props.app_state.loc['272'], 2700)
        }
        else{

            // var images_to_add = this.state.entered_image_objects
            // var id = Math.round(new Date().getTime()/1000);
            // if(images_to_add.length != 0){
            //     var cloned_array = this.state.entered_objects.slice()
            //     cloned_array.push({'data':{'images':images_to_add}, 'type':'9', 'id':id})
            //     this.setState({entered_objects: cloned_array, entered_image_objects:[]})
            // }
            
            var me = this;
            // this.setState({content_channeling_setting: me.props.app_state.content_channeling,
            //     device_language_setting :me.props.app_state.device_language,
            //     device_country :me.props.app_state.device_country,
            //     e5 :me.props.app_state.selected_e5,})
            setTimeout(function() {
                me.props.when_add_new_object_to_stack(me.state)
        
                me.setState({ id: makeid(8), type:me.props.app_state.loc['297'], get_new_job_page_tags_object: me.get_new_job_page_tags_object(), get_new_job_text_tags_object: me.get_new_job_text_tags_object(), entered_tag_text: '', entered_title_text:'', entered_text:'', entered_indexing_tags:[], entered_text_objects:[], entered_image_objects:[], entered_objects:[],typed_link_text:'', link_search_results:[], added_links:[], entered_pdf_objects:[], markdown:''})
            }, (1 * 1000));

            
            this.props.notify(this.props.app_state.loc['18'], 1700);
            
        }
    }


    set_fileds_for_edit_action(obj){
        this.setState({entered_indexing_tags: obj['tags'], entered_title_text: obj['title'], entered_text_objects: obj['texts'], entered_image_objects: obj['images']})
    }

    set_action(action){
        this.setState({action: action})
    }


}




export default NewPostPage;