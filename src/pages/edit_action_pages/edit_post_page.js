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
import ViewGroups from '../../components/view_groups';
import Tags from '../../components/tags';
import TextInput from '../../components/text_input';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Draggable } from "react-drag-reorder";

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import imageCompression from 'browser-image-compression';


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

class EditPostPage extends Component {
    
    state = {
        id: makeid(8), object_type:18, type:this.props.app_state.loc['765']/* 'edit-post' */,
        get_new_job_page_tags_object: this.get_new_job_page_tags_object(),
        get_take_down_option: this.get_take_down_option(),
        entered_tag_text: '', entered_title_text:'', entered_text:'',
        entered_indexing_tags:[], entered_text_objects:[], entered_image_objects:[],
        entered_objects:[], selected_subscriptions:[], edit_text_item_pos:-1,

        get_sort_links_tags_object:this.get_sort_links_tags_object(), 
        get_post_nsfw_option:this.get_post_nsfw_option(),
        get_masked_from_outsiders_option:this.get_masked_from_outsiders_option(),
        get_disabled_comments_section:this.get_disabled_comments_section(), markdown:'', entered_zip_objects:[]
    };

    get_new_job_page_tags_object(){
        var obj = {
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e', 'e.'+this.props.app_state.loc['110']/* ,this.props.app_state.loc['111'] */, this.props.app_state.loc['112'], this.props.app_state.loc['162r']/* 'pdfs' */, this.props.app_state.loc['162q']/* 'zip-files' */, this.props.app_state.loc['a311bq']/* 'markdown' */,/*  this.props.app_state.loc['298'] */], [0]
            ],
            'text':[
                ['or','',0], [this.props.app_state.loc['115'], 'e.'+this.props.app_state.loc['120'], 'e.'+this.props.app_state.loc['121']], [0]
            ],
            'font':[
                ['xor','e',1], [this.props.app_state.loc['116'],'Sans-serif','Courier New','Times New Roman','ComicSans','papyrus'], [1],[1]
            ],
            'size':[
                ['xor','e',1], [this.props.app_state.loc['117'],'15px','11px','25px','40px'], [1],[1]
            ],
        };

        obj[this.props.app_state.loc['115']] = [
                ['or','',0], [this.props.app_state.loc['115'], 'e.'+this.props.app_state.loc['120'], 'e.'+this.props.app_state.loc['121']], [0]
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

    get_post_preview_option(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['299']/* invisible */, this.props.app_state.loc['300']/* visible */], [1]
            ],
        };
    }


    get_take_down_option(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['767c']], [0]
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

    get_markdown_preview_or_editor_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['a311bt']/* 'Editor' */, this.props.app_state.loc['a311bu']/* 'preview' */], [1]
            ],
        };
    }


    set(){
        if(this.state.get_post_nsfw_option == null){
            this.setState({get_post_nsfw_option:this.get_post_nsfw_option()})
        }
        if(this.state.get_masked_from_outsiders_option == null){
            this.setState({get_masked_from_outsiders_option:this.get_masked_from_outsiders_option()})
        }
        if(this.state.get_disabled_comments_section == null){
            this.setState({get_disabled_comments_section:this.get_disabled_comments_section()})
        }
        if(this.state.get_post_preview_option == null){
            this.setState({get_post_preview_option:this.get_post_preview_option()})
        }
        if(this.state.get_post_anonymously_tags_option == null){
            this.setState({get_post_anonymously_tags_option:this.get_post_anonymously_tags_option(),})
        }
        if(this.state.markdown == null){
            this.setState({markdown:''})
        }
        if(this.state.get_markdown_preview_or_editor_object == null){
            this.setState({get_markdown_preview_or_editor_object: this.get_markdown_preview_or_editor_object()})
        }
        this.setState({get_new_job_page_tags_object: this.get_new_job_page_tags_object(), edit_text_item_pos:-1,get_sort_links_tags_object:this.get_sort_links_tags_object()})
    }


    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px', width: this.props.app_state.width}}>
                    <div style={{'padding': '0px 0px 0px 0px', width:this.props.app_state.width-50}}>
                        <Tags font={this.props.app_state.font} app_state={this.props.app_state} page_tags_object={this.state.get_new_job_page_tags_object} tag_size={'l'} when_tags_updated={this.when_new_job_page_tags_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div style={{'padding': '0px 10px 0px 0px', width:40}}>
                        <img alt="" className="text-end" onClick={()=>this.finish_creating_object()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                    </div>
                </div>

                {/* <div className="row" style={{'width':'102%'}}>
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags app_state={this.props.app_state} page_tags_object={this.state.get_new_job_page_tags_object} tag_size={'l'} when_tags_updated={this.when_new_job_page_tags_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img className="text-end" onClick={()=>this.finish_creating_object()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div> */}
                
                
                <div style={{'margin':'0px 0px 0px 0px'}}>
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
        else if(selected_item == this.props.app_state.loc['162q']/* 'zip-files' */){
            return(
                <div>
                    {this.render_enter_zip_part()}
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







    componentDidMount(){
        this.setState({screen_width: this.screen.current?.offsetWidth})
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

    render_title_tags_part(){
        return(
            <div ref={this.screen} style={{'padding':'0px 0px 0px 0px'}}>
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


                {/* {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['303'], 'details':this.props.app_state.loc['304'], 'size':'l'})}
                <div style={{height:10}}/>
                <Tags page_tags_object={this.state.get_post_preview_option} tag_size={'l'} when_tags_updated={this.when_get_post_preview_option.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/> */}


                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['767a']/* Take down post. */, 'details':this.props.app_state.loc['767b']/* Take down the post from the explore section. */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags page_tags_object={this.state.get_take_down_option} tag_size={'l'} when_tags_updated={this.when_get_take_down_option.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>

            </div>
        )
    }

    render_title_tags_part2(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['311c']/* Mark as NSFW. */, 'details':this.props.app_state.loc['311d']/* If set to nsfw, post will be marked as not safe for work. */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_post_nsfw_option} tag_size={'l'} when_tags_updated={this.when_get_post_nsfw_option.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>



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





                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311dc']/* 'Current post size.' */, 'details':this.props.app_state.loc['a311dd']/* 'Below is the size of your new post with all the details youve set.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_transaction_size_indicator()}
            </div>
        )
    }

    when_get_disabled_comments_section_option(tag_obj){
        this.setState({get_disabled_comments_section: tag_obj})
    }

    when_get_post_nsfw_option(tag_group){
        this.setState({get_post_nsfw_option: tag_group})
    }

    when_get_masked_from_outsiders_option(tag_group){
        this.setState({get_masked_from_outsiders_option: tag_group})
    }

    when_get_take_down_option(tag_group){
        this.setState({get_take_down_option: tag_group})
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

   



    render_transaction_size_indicator(){
        var current_stack_size = this.props.app_state.stack_size_in_bytes[this.state.e5] == null ? 50 : this.props.app_state.stack_size_in_bytes[this.state.e5]
        if(current_stack_size != -1){
            const size = this.lengthInUtf8Bytes(JSON.stringify(this.state))
            const stack_size_in_bytes_formatted_data_size = this.format_data_size2(size)
            
            var existing_percentage = this.round_off((current_stack_size / this.props.app_state.upload_object_size_limit) * 100)
            var additional_percentage = this.round_off((size / this.props.app_state.upload_object_size_limit) * 100)
            
            if(existing_percentage >= 100){
                existing_percentage = 99.99
                additional_percentage = 0.01
            }

            if(existing_percentage + additional_percentage >= 100){
                additional_percentage = 100 - existing_percentage;
            }

            return(
                <div>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['a311da']/* 'Post Size.' */, 'subtitle':this.format_power_figure(stack_size_in_bytes_formatted_data_size['size']), 'barwidth':this.calculate_bar_width(stack_size_in_bytes_formatted_data_size['size']), 'number':(stack_size_in_bytes_formatted_data_size['size']), 'barcolor':'#606060', 'relativepower':stack_size_in_bytes_formatted_data_size['unit'], })}

                        {this.render_impact_value({'title':this.props.app_state.loc['a311db']/* 'Impact on Run.' */, 'subtitle':'e0', 'barwidth':existing_percentage+'%', 'barwidth2':additional_percentage+'%', 'number':(existing_percentage + additional_percentage)+'%', 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1881']/* 'proportion' */,})}
                    </div>
                </div>
            )
        }
    }

    render_impact_value(object_data){
        var title = object_data != null ? object_data['title']:'Post Block Number'
        var subtitle = object_data != null ? object_data['subtitle']:'depth'
        var barwidth = object_data != null ? object_data['barwidth']:'84%'
        var barwidth2 = object_data != null ? object_data['barwidth2']:'5%'
        var number = object_data != null ? object_data['number']:'123,445,555'
        var barcolor = this.props.theme['bar_color']
        var relativepower = object_data != null ? object_data['relativepower']:'500 blocks'
        return(
            <div style={{'margin': '5px 20px 0px 15px'}}>
                <div className="row">
                    <div className="col-10" style={{'padding': '0px 0px 0px 14px' }}> 
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'font-family': this.props.app_state.font}} className="fw-bold">{title}</p>
                    </div>
                    <div className="col-2" style={{'padding': '0px 15px 0px 0px' }}>
                        <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '11px', height: 7, 'padding-top':' 0.5px', 'font-family': this.props.app_state.font}} className="text-end">{subtitle}</p>
                    </div>
                </div>
                
                <div style={{ height: 3, width: "100%", 'border-radius': '5px', 'box-shadow': '0px 0px 2px 1px '+this.props.theme['bar_shadow'], 'margin': '0px 0px 4px 0px' }}>
                    <div className="progress" style={{ height: 3, width: "100%", 'background-color': this.props.theme['linebar_background_color'] }}>
                        <div className="progress-bar" role="progressbar" style={{ width: barwidth, 'background-image': 'none','background-color': 'white', 'border-radius': '0px 0px 0px 0px' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"/>

                        <div className="progress-bar" role="progressbar" style={{ width: barwidth2, 'background-image': 'none','background-color': barcolor, 'border-radius': '0px 0px 0px 0px' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-9" style={{'padding': '0px 0px 0px 14px' }}> 
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: '100%', 'font-family': this.props.app_state.font}} className="fw-bold">{number}</p>
                    </div>
                    <div className="col-3" style={{'padding': '0px 15px 0px 0px' }}>
                        <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '10px', height: '100%', 'padding-top':' 1px', 'font-family': this.props.app_state.font}} className="text-end">{relativepower}</p>
                    </div>
                </div>
            </div>
        )
    }

    format_data_size2(size){
        if(size > 1_000_000_000){
            return {'size':this.round_off(parseFloat(size)/(1_024*1_024*1_024)), 'unit':'GBs'}
        }
        else if(size > 1_000_000){
            return {'size':this.round_off(parseFloat(size)/(1_024*1_024)), 'unit':'MBs'}
        }
        else if(size > 1_000){
            return {'size':this.round_off(parseFloat(size)/1024), 'unit':'KBs'}
        }
        else{
            return {'size':parseFloat(size), 'unit':'bytes'}
        }
    }

    round_off(float_number){
        return (Math.round(float_number * 100) / 100)
    }

    lengthInUtf8Bytes(str) {
        // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
        var m = encodeURIComponent(str).match(/%[89ABab]/g);
        return str.length + (m ? m.length : 0);
    }

    render_new_job_object(){
        return;
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var items = [].concat(this.state.entered_objects);
        return ( 
            <div onClick={() => console.log()} style={{height:'auto', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color, 'margin':'0px 10px 10px 10px'}}>
                <div style={{'padding': '5px 0px 5px 0px'}}>
                    {this.render_detail_item('1',{'active_tags':this.state.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':'delete_entered_tag_word'})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.state.entered_title_text})}
                    {this.render_detail_item('0')}

                    <Draggable>
                        {items.map((item, index) => (
                            <div key={index}>
                                {this.render_detail_item(item['type'], item['data'])} 
                                <div style={{height:10}}/>
                            </div>
                        ))}
                    </Draggable>
                </div>         
            </div>
        );
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
                                <div style={{height:180, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={this.props.app_state.theme['letter']} style={{height:70 ,width:'auto'}} />
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
        var myid = this.props.app_state.user_account_id[this.state.e5]
        if(myid == null) myid = 1;
        var created_subs = this.get_all_sorted_objects(this.props.app_state.my_created_subscriptions)
        console.log('created_subs: ', this.props.app_state.my_created_subscriptions, ' my_id: ', myid)
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
                        <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '0px 10px 15px 10px'}}/>
                        <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '0px 10px 15px 10px'}}/>
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
                <div>
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
                {/* {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['307']})} */}
                
                {/* <Tags page_tags_object={this.state.get_new_job_text_tags_object} tag_size={'l'} when_tags_updated={this.when_new_job_font_style_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/> */}

                <TextInput height={60} placeholder={this.props.app_state.loc['135']} when_text_input_field_changed={this.when_entered_text_input_field_changed.bind(this)} text={this.state.entered_text} theme={this.props.theme}/>
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
                                content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
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
        var cloned_ecid_encryption_passwords = this.state.ecid_encryption_passwords == null ? {} : structuredClone(this.state.ecid_encryption_passwords)
        cloned_ecid_encryption_passwords[files[0]] = this.props.get_ecid_file_password_if_any(files[0])
        this.setState({ecid_encryption_passwords: cloned_ecid_encryption_passwords});
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
                        <TextInput height={30} placeholder={this.props.app_state.loc['292']} when_text_input_field_changed={this.when_typed_link_text_changed.bind(this)} text={this.state.typed_link_text} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 10px 0px 0px'}} onClick={()=> this.search_object()} >
                        {this.render_detail_item('5',{'text':this.props.app_state.loc['140'],'action':'', 'prevent_default':true})}
                    </div>
                </div>
                <div style={{height:10}}/>
                {this.render_selected_links()}

                {this.render_detail_item('0')}
                <Tags page_tags_object={this.state.get_sort_links_tags_object} tag_size={'l'} when_tags_updated={this.when_get_sort_links_tags_object_updated.bind(this)} theme={this.props.theme}/>

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
                                        <img src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
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
                                            <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
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
        var cloned_ecid_encryption_passwords = this.state.ecid_encryption_passwords == null ? {} : structuredClone(this.state.ecid_encryption_passwords)
        files.forEach(file => {
            clonedArray.push(file);
            cloned_ecid_encryption_passwords[file] = this.props.get_ecid_file_password_if_any(file)
        });
        this.setState({entered_image_objects: clonedArray, ecid_encryption_passwords: cloned_ecid_encryption_passwords});
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

    constructor(props) {
        super(props);
        this.screen = React.createRef()
    }

    render_image_part(){
        var background_color = this.props.theme['card_background_color']
        var col = Math.round((this.state.screen_width-25) / 100)
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
                                        <img src={this.props.app_state.theme['letter']} style={{height:40 ,width:'auto'}} />
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

        var cloned_ecid_encryption_passwords = this.state.ecid_encryption_passwords == null ? {} : structuredClone(this.state.ecid_encryption_passwords)
        files.forEach(file => {
            cloned_ecid_encryption_passwords[file] = this.props.get_ecid_file_password_if_any(file)
        });
        this.setState({entered_pdf_objects: clonedArray, ecid_encryption_passwords: cloned_ecid_encryption_passwords});
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







    render_enter_zip_part(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_pick_zip_parts()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_pick_zip_parts()}
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
                        {this.render_pick_zip_parts()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }
    
    render_pick_zip_parts(){
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'13px','text':this.props.app_state.loc['162p']/* 'The gray circle stages a pdf file. Then swipe it to remove.' */})}
                {this.render_create_zip_ui_buttons_part()}
                {this.render_zips_part()}
            </div>
        )
    }
    
    render_create_zip_ui_buttons_part(){
        return(
        <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '7px 5px 10px 10px', width: '99%'}}>
            <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                <img alt="" src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} onClick={() => this.props.show_pick_file_bottomsheet('zip', 'create_zip', 10**16)}/>
            </div>
        </div>
        )
    }
    
    when_zip_files_picked(files){
        var clonedArray = this.state.entered_zip_objects == null ? [] : this.state.entered_zip_objects.slice();
        files.forEach(file => {
            clonedArray.push(file);
        });
        var cloned_ecid_encryption_passwords = this.state.ecid_encryption_passwords == null ? {} : structuredClone(this.state.ecid_encryption_passwords)
        files.forEach(file => {
            cloned_ecid_encryption_passwords[file] = this.props.get_ecid_file_password_if_any(file)
        });
        this.setState({entered_zip_objects: clonedArray, ecid_encryption_passwords: cloned_ecid_encryption_passwords});
    }
    
    render_zips_part(){
        var items = [].concat(this.state.entered_zip_objects)
    
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
                                    action: () =>this.when_zip_clicked(item, index)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <div style={{'margin':'3px 0px 3px 0px'}}>
                                            {this.render_uploaded_zip_file(item, index)}
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
    
    render_uploaded_zip_file(item, index){
        var ecid_obj = this.get_cid_split(item)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        //
        var formatted_size = this.format_data_size(data['size'])
        var fs = formatted_size['size']+' '+formatted_size['unit']
        var title = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
        var details = data['name']
        var thumbnail = this.props.app_state.static_assets['zip_file']
    
        return(
            <div>
                {this.render_detail_item('8', {'details':title,'title':details, 'size':'l', 'image':thumbnail, 'border_radius':'15%'})}
            </div>
        )
    }
    
    when_zip_clicked(item, index){
        var cloned_array = this.state.entered_zip_objects.slice()
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_zip_objects: cloned_array})
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
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_detail_item('4', {'text':this.props.app_state.loc['a311bv']/* 'You can add some Markdown text below. */, 'textsize':'13px', 'font':this.props.app_state.font})}
                        <div style={{height:10}}/>

                        <TextInput height={this.props.height-350} placeholder={this.props.app_state.loc['a311bs']/* 'New Markdown here...' */} when_text_input_field_changed={this.when_markdown_field_changed.bind(this)} text={this.state.markdown} theme={this.props.theme}/>

                        {this.render_markdown_shortcut_list()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_markdown_or_empty()}
                    </div>
                </div>
                
            )
        }
    }

    render_markdown_or_empty(){
        if(this.state.markdown.trim() == ''){
            return(
                <div>
                    {this.render_empty_views(2)}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('13', {'source':this.state.markdown})}
                </div>
            )
        }
    }

    render_edit_markdown_parts(){
        return(
            <div>
                {this.render_detail_item('4', {'text':this.props.app_state.loc['a311bv']/* 'You can add some Markdown text below. */, 'textsize':'13px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>

                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_markdown_preview_or_editor_object} tag_size={'l'} when_tags_updated={this.when_get_markdown_preview_or_editor_object_updated.bind(this)} theme={this.props.theme}/>

                {this.render_preview_or_editor_option_ui()}
            </div>
        )
    }

    when_get_markdown_preview_or_editor_object_updated(tags_obj){
        this.setState({get_markdown_preview_or_editor_object: tags_obj})
    }

    render_preview_or_editor_option_ui(){
        var selected_item = this.get_selected_item(this.state.get_markdown_preview_or_editor_object, this.state.get_markdown_preview_or_editor_object['i'].active)

        if(selected_item == this.props.app_state.loc['a311bt']/* 'Editor' */){
            return(
                <div>
                    <TextInput height={this.props.height-350} placeholder={this.props.app_state.loc['a311bs']/* 'New Markdown here...' */} when_text_input_field_changed={this.when_markdown_field_changed.bind(this)} text={this.state.markdown} theme={this.props.theme}/>

                    {this.render_markdown_shortcut_list()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['a311bu']/* 'preview' */){
            return(
                <div>
                    {this.render_markdown_or_empty()}
                </div>
            )
        }
    }

    when_markdown_field_changed(text){
        this.setState({markdown: text})
    }

    render_markdown_shortcut_list(){
        var items = [
            {'title':this.props.app_state.loc['a311ca']/* 'Headings' */, 'details':'# H1 \n## H2 \n### H3', 'size':'l'},
            {'title':this.props.app_state.loc['a311cd']/* 'Bold' */, 'details':'**bold text**', 'size':'l'},
            {'title':this.props.app_state.loc['a311ce']/* 'Italic' */, 'details':'*italicized text*', 'size':'l'},
            {'title':this.props.app_state.loc['a311cf']/* 'Blockquote' */, 'details':'> blockquote', 'size':'l'},
            {'title':this.props.app_state.loc['a311cg']/* 'Ordered List' */, 'details':'1. First item \n2. Second item \n3. Third item', 'size':'l'},
            {'title':this.props.app_state.loc['a311ch']/* 'Unordered List' */, 'details':'- First item \n- Second item \n- Third item', 'size':'l'},
            {'title':this.props.app_state.loc['a311ci']/* 'Code' */, 'details':'`code`', 'size':'l'},
            {'title':this.props.app_state.loc['a311cj']/* 'Horizontal rule' */, 'details':'---', 'size':'l'},
            {'title':this.props.app_state.loc['a311ck']/* 'Link' */, 'details':'[title](https://www.example.com)', 'size':'l'},
            {'title':this.props.app_state.loc['a311cl']/* 'Image' */, 'details':'![alt text](image.jpg)', 'size':'l'},
        ]

        return(
            <div>
                {this.render_detail_item('0')}
                <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={() => this.when_markdown_shortcut_clicked(item['details'])}>
                                {this.render_detail_item('3', item)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    when_markdown_shortcut_clicked(text){
        this.setState({markdown: this.state.markdown+'\n'+text})
    }


    






    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} add_indexing_tag_for_new_job={this.add_indexing_tag_for_new_job.bind(this)} delete_entered_tag={this.delete_entered_tag_word.bind(this)} when_add_text_button_tapped={this.when_add_text_button_tapped.bind(this)} width={this.props.app_state.width} />
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
            
            this.props.when_add_edit_object_to_stack(this.state)

            // this.setState({ id: makeid(8), type:'post', get_new_job_page_tags_object: this.get_new_job_page_tags_object(), get_new_job_text_tags_object: this.get_new_job_text_tags_object(), entered_tag_text: '', entered_title_text:'', entered_text:'', entered_indexing_tags:[], entered_text_objects:[], entered_image_objects:[], entered_objects:[], })
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




export default EditPostPage;