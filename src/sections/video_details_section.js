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

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import Linkify from "linkify-react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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




class VideoDetailsSection extends Component {
    
    state = {
        selected: 0, navigate_view_post_list_detail_tags_object: this.get_navigate_view_post_list_detail_tags_object_tags(), focused_message:{'tree':{}}, comment_structure_tags: this.get_comment_structure_tags(), hidden_message_children_array:[],
        screen_width:0,
    };

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

    get_navigate_view_post_list_detail_tags_object_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e',this.props.app_state.loc['2028']/* 'metadata' */, this.props.app_state.loc['a2527d']/* 'media' */,this.props.app_state.loc['b2527k']/* videography */,this.props.app_state.loc['2514']/* awards */,this.props.app_state.loc['a2527a']/* 'comments' */,this.props.app_state.loc['a2527bh']/* 'similar' */],[1]
          ],
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.check_for_new_responses_and_messages(), this.props.app_state.details_section_syncy_time);
        this.setState({screen_width: this.screen.current.offsetWidth})
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    check_for_new_responses_and_messages() {
        if(this.props.selected_video_item != null){
            var object = this.get_item_in_array(this.get_video_items(), this.props.selected_video_item);

            if(object == null || object['ipfs'] == null) return;
            this.props.get_objects_messages(object['id'],  object['e5'])
            this.props.get_post_award_data(object['id'], object['e5'])
        }
    }




    render(){
        return(
            <div ref={this.screen}>
                {this.render_posts_list_detail()}
            </div>
        )
    }

    render_posts_list_detail(){
        var object = this.get_item_in_array(this.get_video_items(), this.props.selected_video_item);
        if(object == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }
        else{
            return(
                <div>
                    {this.render_post_details_section(object)}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 0px 0px', 'max-width':'470px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.navigate_view_post_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_post_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
    }

    when_navigate_view_post_list_detail_tags_object_updated(tag_obj){
        this.setState({navigate_view_post_list_detail_tags_object: tag_obj})
    }

    render_empty_detail_object(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height
        return(
            <div>
                <div style={{height:he, 'background-color': 'transparent', 'border-radius': '15px','padding':'10px 5px 5px 10px','display': 'flex', 'align-items':'center','justify-content':'center','margin':'0px 0px 10px 0px'}}>
                    <img alt="" src={this.props.app_state.theme['letter']} style={{height:70 ,width:'auto'}} />
                </div>
            </div>
        )
    }

    get_item_in_array(object_array, id){
        var object = object_array.find(x => x['e5_id'] === id);
        return object
    }

    render_post_details_section(object){
        var selected_item = this.get_selected_item(this.state.navigate_view_post_list_detail_tags_object, this.state.navigate_view_post_list_detail_tags_object['i'].active)
        
        if(object == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }

        if(selected_item ==this.props.app_state.loc['2028']/*  'metadata' */){
            return(
                <div>
                    {this.render_post_main_details_section(object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['a2527a']/* 'comments' */){
            return(
                <div>
                    {this.render_post_responses(object)}
                </div>
            )  
        }
        else if(selected_item == this.props.app_state.loc['2514']/* 'awards' */){
            return(
                <div>
                    {this.render_post_awards(object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['a2527d']/* 'media' */){
            return(
                <div>
                    {this.render_videos(object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['b2527k']/* videography */){
            return(
                <div>
                    {this.render_videography(object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['a2527bh']/* 'similar' */){
            return(
                <div>
                    {this.render_similar_videoposts_section(object)}
                </div>
            )
        }
    }


    render_post_main_details_section(object){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-50
        var size = this.props.screensize
        var item = this.get_post_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects
        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 2px 10px', 'padding':'0px 10px 0px 10px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    <div onClick={()=> this.play_album(object)}>
                        {this.render_detail_item('7', item['banner-icon'])}
                    </div>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['listing_type'])}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':''+this.get_senders_name(object['event'].returnValues.p5, object), 'details':this.props.app_state.loc['a2527g']/* 'Poster' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_taken_down_message_if_post_is_down(object)}
                    {this.render_message_if_blocked_by_sender(object)}
                    {this.render_comment_section_disabled(object)}
                    
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    {this.render_detail_item('0')}
                    {this.render_item_data(items, object)}
                    {this.render_item_images(object)}
                    {this.render_pdf_files_if_any(object)}
                    {this.render_zip_files_if_any(object)}
                    
                    <div style={{height: 10}}/>
                    {this.render_markdown_if_any(object)}


                    {this.render_detail_item('3', item['reply_count'])}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', item['award_count'])}
                    <div style={{height: 10}}/>

                    {this.render_video_sales_data(object, item)}
                    <div style={{height: 10}}/>

                    {this.render_discography(object)}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['b2527a']/* 'Play Videopost' */, 'details':this.props.app_state.loc['b2527b']/* 'Play all the videos in this videopost.' */})}
                    <div style={{height:10}}/>
                    <div onClick={()=> this.play_album(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['b2527a']/* 'Play Videopost.' */, 'action':''},)}
                    </div>

                    {this.render_edit_object_button(object)}

                    {this.render_award_button(object)}

                    {this.render_pin_post_button(object)}

                    {this.render_follow_unfollow_author_button(object)}

                    {this.render_buy_album_button(object)}

                    {this.render_block_post_button(object)}

                    {this.render_similar_videoposts(object)}
                    
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_follow_unfollow_author_button(object){
        var author_id = object['event'].returnValues.p5
        var follow_id = object['e5'] + ':' + author_id
        var followed_accounts = this.props.app_state.followed_accounts

        if(followed_accounts.includes(follow_id)){
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['a2527bp']/* 'Unfollow Post Author' */, 'details':this.props.app_state.loc['a2527bo']/* 'Stop showing posts made by this author in my following feed.' */})}
                    <div style={{height:10}}/>
                    <div onClick={()=> this.props.follow_unfollow_post_author(author_id, object['e5'])}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['a2527bp']/* 'Unfollow Post Author' */, 'action':''},)}
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['a2527bn']/* 'Follow Post Author' */, 'details':this.props.app_state.loc['a2527bo']/* 'Show posts made by this author in my following feed.' */})}
                    <div style={{height:10}}/>
                    <div onClick={()=> this.props.follow_unfollow_post_author(author_id, object['e5']) }>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['a2527bn']/* 'Follow Post Author' */, 'action':''},)}
                    </div>
                </div>
            )
        }
    }

    is_object_blocked_by_me(object){
        return this.props.app_state.posts_blocked_by_me.includes(object['e5_id'])
    }

    render_message_if_blocked_by_sender(object){
        if(!this.is_object_blocked_by_me(object)){
            return;
        }
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['c2527bk']/* '🙅 Post Blocked */, 'details':this.props.app_state.loc['c2527bl']/* 'The post has been blocked for you and your followers. */, 'size':'l'})}
                <div style={{height: 10}}/>
            </div>
        )
    }

    render_block_post_button(object){
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['c2527bh']/* 'Block Post. */, 'details':this.props.app_state.loc['c2527bi']/* 'Block this post from being viewed by your followers.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={()=>this.block_post(object)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['c2527bj']/* 'Block' */, 'action':''})}
                </div>
            </div>
        )
    }

    block_post(object){
        this.props.block_post(object)
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

    play_album(object){
        var items = this.get_videos_to_display(object)
        var item = items[0]
        if(!this.props.app_state.has_wallet_been_set && !this.props.app_state.has_account_been_loaded_from_storage){
            this.props.notify(this.props.app_state.loc['a2527p']/* 'You need to set your account first.' */, 5000)
        }else if(!this.is_video_available_for_viewing(item)){
            this.props.notify(this.props.app_state.loc['b2527f']/* 'You need to purchase access to the video first.' */, 5000)
        }
        else{
            this.props.play_video(item, object)
        }
    }


    render_zip_files_if_any(object){
        var state = object['ipfs']
        if(state.entered_zip_objects != null && state.entered_zip_objects.length > 0){
            return(
                <div>
                    {this.render_zips_part(state.entered_zip_objects)}
                </div>
            )
        }
    }

    render_zips_part(entered_zip_objects){
        var items = [].concat(entered_zip_objects)

        if(items.length == 0) return;
        
        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_uploaded_zip_item_clicked(item)}>
                            {this.render_uploaded_zip_file(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_uploaded_zip_file(item, index){
        var ecid_obj = this.get_cid_split(item)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        //
        var formatted_size = this.format_data_size(data['size'])
        var fs = formatted_size['size']+' '+formatted_size['unit']
        var title = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
        title = fs;
        var details = start_and_end(data['name'])
        var thumbnail = this.props.app_state.static_assets['zip_file']

        return(
            <div>
                {this.render_detail_item('8', {'details':title,'title':details, 'size':'s', 'image':thumbnail, 'border_radius':'15%',})}
            </div>
        )
    }

    when_uploaded_zip_item_clicked(item){
        this.props.when_zip_file_opened(item)
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




    render_pin_post_button(object){
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['1306e']/* 'Pin the Audiopost to  your feed.' */, 'title':this.props.app_state.loc['1306d']/* 'Pin Videopost' */})}
                <div style={{height:10}}/>
                <div onClick={()=> this.when_pin_post_clicked(object)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1306f']/* 'Pin/Unpin Videopost' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_pin_post_clicked(object){
        this.props.pin_video(object)
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


    get_video_items(){
        return this.props.get_video_items('')
    }

    get_post_details_data(object){
        var tags = object['ipfs'] == null ? ['Videopost'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(this.is_post_nsfw(object)){
            tags = object['ipfs'] == null ? ['Videopost'] : ['🔞🔞🔞'].concat(object['ipfs'].entered_indexing_tags)
        }
        var title = object['ipfs'] == null ? 'Videopost ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var number_of_replies = this.get_convo_messages(object).length
        var number_of_awards = this.get_post_awards(object).length
        var author = this.get_senders_name(object['event'].returnValues.p5, object)
        var listing_type = object['ipfs'] == null ? 'Videopost' :this.get_selected_item(object['ipfs'].get_listing_type_tags_option, 'e')
        var default_image = this.props.app_state.static_assets['video_label']
        var image = object['ipfs'] == null ? default_image :object['ipfs'].album_art
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['e5']+' • '+object['id'], 'details':title, 'size':'l'},
            'age':{'style':'l', 'title':this.props.app_state.loc['1744']/* 'Block Number' */, 'subtitle':this.props.app_state.loc['2494']/* 'age' */, 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)} `+this.props.app_state.loc['2495']/* ago */, },
            
            'reply_count':{'title':`${number_with_commas(number_of_replies)}`, 'details': this.props.app_state.loc['2815']/* 'Number of Replies.' */, 'size':'l'},
            'award_count':{'title':`${number_with_commas(number_of_awards)}`, 'details': this.props.app_state.loc['2816']/* 'Number of Awards.' */, 'size':'l'},

            'listing_type':{'title':listing_type, 'details':this.props.app_state.loc['a311aw']/* 'Post Type.' */, 'size':'l'},
            'banner-icon':{'header':'', 'subtitle':'', 'image':image, 'height':'auto'},
            'id2':{'title':author, 'details':title, 'size':'l', 'image':image, 'border_radius':'7px'},

            'videopost_sales':{'title':number_with_commas(object['videopost_sales']), 'details':this.props.app_state.loc['3024']/* 'Videopost Sales' */, 'size':'l'},
            'video_sales':{'title':number_with_commas(object['video_sales']), 'details':this.props.app_state.loc['3025']/* 'Video Sales' */, 'size':'l'},
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

    render_edit_object_button(object){
        // var object = this.get_post_items()[this.props.selected_audio_item];
        var my_account = this.props.app_state.user_account_id[object['e5']]

        if(object['event'].returnValues.p5 == my_account){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['b2527c']/* Edit Indexed Videopost' */, 'details':this.props.app_state.loc['b2527d']/* 'Change the basic details for your Indexed Videopost' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_basic_edit_object_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2520']/* 'Perform Action' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    open_basic_edit_object_ui(object){
        this.props.open_edit_object('11', object)
    }

    render_award_button(object){
        var my_account = this.props.app_state.user_account_id[object['e5']]

        if(object['event'].returnValues.p5 != my_account){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2521']/* 'Give Award' */, 'details':this.props.app_state.loc['2522']/* `Send a tip to the post's author` */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_award_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2523']/* 'Send Award' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    open_award_ui(object){
        // var object = this.get_post_items()[this.props.selected_audio_item];
        this.props.open_award_ui(object)
    }


    render_buy_album_button(object){
        var listing_type = object['ipfs'] == null ? 'Videopost' :this.get_selected_item(object['ipfs'].get_listing_type_tags_option, 'e')
        var title = this.props.app_state.loc['a2527e']/* 'Buy' */+ ' '+listing_type
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':title, 'details':this.props.app_state.loc['b2527e']/* `Purchase access to this videopost and its content.` */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={()=>this.open_purchase_video_ui(object)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['a2527e']/* 'Buy' */, 'action':''})}
                </div>
            </div>
        )
    }

    open_purchase_video_ui(object){
        this.props.open_purchase_video_ui(object)
    }












    render_videos(object){
        var he = this.props.height-45
        var items = this.get_videos_to_display(object)
        var object_item = this.get_post_details_data(object)
        return(
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px'}}>
                <div style={{ 'overflow-y': 'auto', height: he, padding:'10px 10px 5px 10px'}}>
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
            <div onClick={() => this.when_video_item_clicked(item, object)}>
                {this.render_detail_item('3', {'details':item['video_composer'], 'title':item['video_title'], 'size':'l'})}
            </div>
        )
    }

    get_videos_to_display(object){
        if(this.is_page_my_collection_page()){
            var videos_to_display = []
            var items = object['ipfs'].videos
            items.forEach(video => {
                videos_to_display.push(video)
            });
            return videos_to_display
        }else{
            return object['ipfs'].videos
        }
    }

    is_video_available_for_viewing(video){
        if(video['price_data'].length == 0) return true;
        var my_video = this.props.app_state.my_videos
        if(my_video.includes(video['video_id'])){
        return true
        }
        return false
    }

    is_page_my_collection_page(){
        var page_id = this.props.get_page_id()
        var my_collection_page_id = this.props.app_state.loc['1264p']/* 'videoport' */ + this.props.app_state.loc['1264l']/* 'acquired' */
        if(page_id == my_collection_page_id){
            return true
        }
        return false
    }

    when_video_item_clicked(item, object){
        if(!this.props.app_state.has_wallet_been_set && !this.props.app_state.has_account_been_loaded_from_storage){
            this.props.notify(this.props.app_state.loc['a2527p']/* 'You need to set your account first.' */, 5000)
        }
        else if(!this.is_video_available_for_viewing(item)){
            this.props.notify(this.props.app_state.loc['b2527f']/* 'You need to purchase access to the video first.' */, 5000)
        }
        else{
            this.props.play_video(item, object)
        }
    }









    render_discography(object){
        var items = [].concat(this.get_authors_discography(object))
        if(items.length == 0) return;
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a2527bb']/* 'Discography.' */, 'details':this.props.app_state.loc['b2527h']/* 'Videoposts by ' */+this.get_senders_name(object['event'].returnValues.p5, object), 'size':'l'})}
                <div style={{height:10}}/>

                <div style={{'margin':'3px 5px 0px 5px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={() => this.when_discography_item_clicked(index, item)}>
                                {this.render_discography_item(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    render_discography_item(object){
        var default_image = this.props.app_state.static_assets['music_label']
        var image = object['ipfs'] == null ? default_image :object['ipfs'].album_art
        var title = object['ipfs'] == null ? 'Videopost ID' : object['ipfs'].entered_title_text
        return(
            <div style={{width:100, height:'auto'}}>
                <img src={this.get_image_from_file(image)} alt="" style={{height:'auto' ,width:100,'border-radius': '10px'}}/>
                <div style={{height:5}}/>
                <p style={{'color': this.props.theme['primary_text_color'], width:100, 'font-size': '12px', 'margin':'0px'}} className="fw-bold">{this.truncate(title, 15)}</p>
            </div>
        )
    }

    when_discography_item_clicked(index, object){
        this.setState({navigate_view_post_list_detail_tags_object: this.get_navigate_view_post_list_detail_tags_object_tags()})
        this.props.when_discography_video_item_clicked(object)
    }

    get_authors_discography(object){
        return this.filter_for_taken_down_posts(this.sort_by_author(this.props.get_video_items('discography'), object))
    }

    sort_by_author(objects, current_album){
        var filtered_objects = [];
        filtered_objects = objects.filter(function (object) {
            return (current_album['author'] == object['author'] && current_album['e5_id'] != object['e5_id'])
        });
        return filtered_objects
    }

    filter_for_taken_down_posts(objects){
        var filtered_objects = []
        objects.forEach(object => {
            if(!this.is_post_taken_down_for_sender(object) && this.check_if_sender_has_paid_subscriptions(object)){
                filtered_objects.push(object)
            }
        });
        return filtered_objects
    }

    check_if_sender_has_paid_subscriptions(object){
        var has_sender_paid_all_subs = true
        var required_subscriptions = object['ipfs'].selected_subscriptions
        if(required_subscriptions == null) return true
        required_subscriptions.forEach(subscription_id => {
            if(!this.has_paid_subscription(parseInt(subscription_id))){
                has_sender_paid_all_subs=  false
            }
        });

        return has_sender_paid_all_subs
    }

    has_paid_subscription(required_subscription_set){
        var my_payment = this.get_all_sorted_objects_mappings(this.props.app_state.my_subscription_payment_mappings)[required_subscription_set]
        if(my_payment == null || my_payment == 0) return false;
        return true
    }

    get_image_from_file(ecid){
        if(!ecid.startsWith('image')) return ecid
        var ecid_obj = this.get_cid_split(ecid)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return 'https://bafkreihhphkul4fpsqougigu4oenl3nbbnjjav4fzkgpjlwfya5ie2tu2u.ipfs.w3s.link/'
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]

        if(data == null) return 'https://bafkreihhphkul4fpsqougigu4oenl3nbbnjjav4fzkgpjlwfya5ie2tu2u.ipfs.w3s.link/'

        return data['data']
    }










    render_similar_videoposts(object){
        var items = [].concat(this.get_similar_posts(object))
        if(items.length == 0) return;
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['b2527i']/* 'Similar Videoposts.' */, 'details':this.props.app_state.loc['b2527j']/* 'Some posts similar to the videopost by its tags' */, 'size':'l'})}
                <div style={{height:10}}/>

                <div style={{'margin':'3px 5px 0px 5px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={() => this.when_discography_item_clicked(index, item)}>
                                {this.render_similar_videopost_item(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    render_similar_videopost_item(object){
        var default_image = this.props.app_state.static_assets['music_label']
        var image = object['ipfs'] == null ? default_image :object['ipfs'].album_art
        var title = object['ipfs'] == null ? 'Videopost ID' : object['ipfs'].entered_title_text
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        var author = sender
        return(
            <div style={{width:100, height:'auto'}}>
                <img src={this.get_image_from_file(image)} alt="" style={{height:'auto' ,width:100,'border-radius': '10px'}}/>
                <div style={{height:5}}/>
                <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '12px', 'margin':'0px'}} className="fw-bold">{this.truncate(title, 15)}</p>
                <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin':'0px'}}>{this.truncate(author, 15)}</p>
            </div>
        )
    }

    get_similar_posts(object){
        return this.filter_for_taken_down_posts(this.sort_feed_based_on_my_section_tags(this.props.get_video_items('discography'), object))
    }

    sort_feed_based_on_my_section_tags(objects, current_album){
        var feed_objs = []
        var section_tags = current_album['ipfs'].entered_indexing_tags

        feed_objs = objects.filter(function (object) {
            var object_tags = object['ipfs'].entered_indexing_tags
            var includes = section_tags.some(r=> object_tags.includes(r))
            return (includes && current_album['e5_id'] != object['e5_id'])
        });

        var selected_objects = []
        feed_objs.forEach(object => {
            var object_tags = object['ipfs'].entered_indexing_tags
            var exact_count = 0
            section_tags.forEach(tag => {
                if(object_tags.includes(tag)){
                    exact_count++
                }
            });
            if(exact_count >= 2){
                selected_objects.push(object)
            }
        });


        return selected_objects
    }










    render_videography(object){
        var he = this.props.height-47
        return(
            <div>
                <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px'}}>
                    <div style={{ 'overflow-y': 'auto', height: he, padding:'5px 0px 5px 0px'}}>
                        <div style={{padding:'5px 5px 5px 5px'}}>
                            {this.render_detail_item('3', {'title':this.props.app_state.loc['b2527l']/* 'Discography.' */, 'details':this.props.app_state.loc['b2527m']/* 'All the available videoposts by the author are listed below. */, 'size':'l'})} 
                        </div>
                        <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px'}}/>
                        <div style={{padding:'5px 10px 5px 10px'}}>
                            {this.render_author_videography_items(object)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render_author_videography_items(object){
        var items = [].concat(this.get_authors_discography(object))
        var background_color = this.props.theme['card_background_color']
        var col = Math.round(400 / 200)
        var w = (this.state.screen_width / 2) - 10
        var rowHeight = w+40;
        if(items.length == 0){
            var items = ['1','1']
            return(
                <div>
                    <ImageList sx={{ width: 'auto', height: 'auto' }} cols={col} rowHeight={rowHeight}>
                        {items.map((item, index) => (
                            <ImageListItem key={index}>
                                <div style={{height:w, width:w, 'background-color': background_color, 'border-radius': '5px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:50 ,width:'auto'}} />
                                    </div>
                                    
                                </div>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            )
        }else{
            return(
                <div>
                    <ImageList sx={{ width: 'auto', height: 'auto' }} cols={col} rowHeight={rowHeight}>
                        {items.reverse().map((item, index) => (
                            <ImageListItem key={index}>
                                <div onClick={() => this.when_discography_item_clicked(index, item)}>
                                    {this.render_my_bought_video_item(item, index, w)}
                                </div> 
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            )
        }
    }

    render_my_bought_video_item(object, index, w){
        var default_image = this.props.app_state.static_assets['video_label']
        var image = object['ipfs'] == null ? default_image :object['ipfs'].album_art
        var title = object['ipfs'] == null ? 'Videopost ID' : object['ipfs'].entered_title_text
        var sender = this.get_senders_name2(object['event'].returnValues.p5, object);
        var author = sender
        return(
            <div style={{width:w, height:'auto'}}>
                <img src={this.get_image_from_file(image)} alt="" style={{height:w ,width:w,'border-radius': '10px'}}/>
                <div style={{height:5}}/>
                <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '12px', 'margin':'0px'}} className="fw-bold">{this.truncate(title, 20)}</p>
                <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin':'0px'}}>{this.truncate(author, 20)}</p>
            </div>
        )
    }

    get_senders_name2(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? '' : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }








    render_similar_videoposts_section(object){
        var he = this.props.height-47
        return(
            <div>
                <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px'}}>
                    <div style={{ 'overflow-y': 'auto', height: he, padding:'5px 0px 5px 0px'}}>
                        <div style={{padding:'5px 5px 5px 5px'}}>
                            {this.render_detail_item('3', {'title':this.props.app_state.loc['a2527bi']/* 'Similar Posts.' */, 'details':this.props.app_state.loc['b2527n']/* 'Posts similar to the Videopost. */, 'size':'l'})} 
                        </div>
                        <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px'}}/>
                        {this.render_similar_videoposts_in_list(object)}
                    </div>
                </div>
            </div>
        )
    }

    render_similar_videoposts_in_list(object){
        var middle = this.props.height-200;
        var items = [].concat(this.get_similar_posts(object))

        if(items.length == 0){
            items = [0,1]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'display': 'flex', 'align-items':'center','justify-content':'center'}}>
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
                <div style={{overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        <div>
                            {items.reverse().map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={() => this.when_discography_item_clicked(index, item)}>
                                    <div>
                                        {this.render_similar_videopost_item_in_list(item)}
                                        <div style={{height: 4}}/>
                                    </div>
                                </li>
                            ))}    
                        </div>
                    </ul>
                </div>
            )
        }
    }

    render_similar_videopost_item_in_list(object){
        var title = object['ipfs'] == null ? 'Videopost ID' : object['ipfs'].entered_title_text
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        var author = sender
        if(this.is_post_anonymous(object)){
            author = 'Anonymous'
        }
        var default_image = this.props.app_state.static_assets['video_label']
        var image = object['ipfs'] == null ? default_image :object['ipfs'].album_art
        return(
            <div>
                {this.render_detail_item('8', {'title':author, 'details':title, 'size':'l', 'image':image, 'border_radius':'7px'})}
            </div>
        )
    }











    render_post_awards(object){
        var he = this.props.height-47
        return(
            <div>
                <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px'}}>
                    <div style={{ 'overflow-y': 'auto', height: he, padding:'5px 0px 5px 0px'}}>
                        {this.render_award_top_title(object)}
                        <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px'}}/>
                        {this.render_award_items(object)}
                    </div>
                </div>
            </div> 
        )
    }

    render_award_top_title(object){
        // var object = this.get_post_items()[this.props.selected_audio_item];
        return(
            <div style={{padding:'5px 5px 5px 5px'}}>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2524']/* 'In ' */+object['id'], 'details':this.props.app_state.loc['2525']/* 'Awards.' */, 'size':'l'})} 
            </div>
        )
    }

    render_award_items(object){
        var middle = this.props.height-200;
        var items = [].concat(this.get_post_awards(object))

        if(items.length == 0){
            items = [0,1]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'display': 'flex', 'align-items':'center','justify-content':'center'}}>
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
                <div style={{overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        <div>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div>
                                        {this.render_detail_item('3', {'title':item['selected_tier_object']['label']['title']+' x'+item['multiplier'], 'details':item['entered_message'], 'size':'l'})}
                                        <div style={{height: 1}}/>
                                    </div>
                                </li>
                            ))}    
                        </div>
                    </ul>
                </div>
            )
        }
    }

    get_post_awards(object){
        // var object = this.get_post_items()[this.props.selected_audio_item];
        if(this.props.app_state.award_data[object['id']] == null) return []
        return this.props.app_state.award_data[object['id']]
    }












    render_post_responses(object){
        var he = this.props.height-100
        if(this.get_focused_message(object) != null) he = this.props.height-150
        var size = this.props.screensize
        var ww = '80%'
        if(size == 'l') ww = '90%'
        if(this.props.app_state.width > 1100){
            ww = '80%'
        }
        return(
            <div>
                <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px'}}>
                    <div onScroll={event => this.handleScroll(event, object)} style={{ 'overflow-y': 'scroll', height: he, padding:'5px 0px 5px 0px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.comment_structure_tags} tag_size={'l'} when_tags_updated={this.when_comment_structure_tags_updated.bind(this)} theme={this.props.theme}/>
                        {this.render_top_title(object)}
                        {/* {this.render_focus_list(object)} */}
                        <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px'}}/>
                        {this.render_sent_received_messages(object)}
                    </div>
                </div>
                <div style={{height:5}}/>
                {this.render_focused_message(object)}
                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 5px 5px', width: '99%'}}>
                    <div style={{'margin':'1px 0px 0px 0px'}}>
                        <div>
                            <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}} onClick={()=> this.when_circle_clicked(object)}>
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
                                <img alt="" className="text-end" onClick={()=>this.add_message_to_stack(object)} src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }

    when_circle_clicked = (object) => {
        let me = this;
        if(Date.now() - this.last_all_click_time2 < 200){
            clearTimeout(this.all_timeout);
            //double tap
            me.scroll_to_bottom()
        }else{
            this.all_timeout = setTimeout(function() {
                clearTimeout(this.all_timeout);
                // single tap
                me.show_add_comment_bottomsheet(object)
            }, 200);
        }
        this.last_all_click_time2 = Date.now();
    }

    scroll_to_bottom(){
        this.is_auto_scrolling = true
        this.messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
        var me = this;
        setTimeout(function() {
            me.is_auto_scrolling = false
        }, (1 * 500));
    }

    handleScroll = (event, object) => {
        if(!this.is_auto_scrolling) this.has_user_scrolled[object['e5_id']] = true
    };

    render_focused_message(object){
        var item = this.get_focused_message(object);
        if(item != null){
            return(
                <div style={{'padding': '7px 15px 10px 15px','margin':'0px 70px 5px 50px', 'background-color': this.props.theme['messsage_reply_background'],'border-radius': '10px 10px 10px 10px'}} onClick={()=>this.unfocus_message(object)}> 
                    <div className="row" style={{'padding':'0px 0px 0px 0px'}}>
                        <div className="col-9" style={{'padding': '0px 0px 0px 14px', 'height':'20px' }}> 
                            <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} >{this.get_sender_title_text(item, object)}</p>
                        </div>
                        <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                            <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{this.get_time_difference(item['time'], object)}</p>
                        </div>
                    </div>
                    <p style={{'font-size': '11px','color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'white-space': 'pre-line'}}>{this.truncate(item['message'], 37)}</p>
                </div>
            )
        }
    }

    when_comment_structure_tags_updated(tag_obj){
        this.setState({comment_structure_tags: tag_obj})
    }

    show_add_comment_bottomsheet(object){
        var comments_disabled_option = this.get_selected_item2(object['ipfs'].get_disabled_comments_section, 'e')
        var posts_author = object['author']
        var me = this.props.app_state.user_account_id[object['e5']]
        if(comments_disabled_option == 1 && me != posts_author){
            this.props.notify(this.props.app_state.loc['2759']/* The comment section has been disabled by the posts author. */, 4500)
            return
        }
        var focused_message_id = this.get_focused_message(object) != null ? this.get_focused_message(object) : 0
        this.props.show_add_comment_bottomsheet(object, focused_message_id, 'video')
    }


    render_top_title(object){
        var top_title = object['ipfs'] == null ? '': object['ipfs'].entered_title_text
        return(
            <div style={{padding:'5px 5px 5px 5px'}}>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2524']/* 'In ' */+object['id'], 'details':this.truncate(top_title, 40), 'size':'l'})} 
            </div>
        )
    }

    constructor(props) {
        super(props);
        this.messagesEnd = React.createRef();
        this.has_user_scrolled = {}
        this.screen = React.createRef()
    }

    componentDidUpdate(){
        var has_scrolled = this.has_user_scrolled[this.props.selected_audio_item]
        if(has_scrolled == null){
            this.scroll_to_bottom()
        }
    }

    render_sent_received_messages(object){
        var middle = this.props.height-240;
        if(this.get_focused_message(object) != null) middle = this.props.height-290
        var items = [].concat(this.get_convo_messages(object))
        var stacked_items = [].concat(this.get_stacked_items(object))

        if(items.length == 0 && stacked_items.length == 0){
            items = [0,1]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'display': 'flex', 'align-items':'center','justify-content':'center'}}>
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
                <div onScroll={event => this.handleScroll(event, object)} style={{overflow: 'scroll', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.render_messages(items.concat(stacked_items), object)}
                        <div ref={this.messagesEnd}/>
                    </ul>
                </div>
            )
            }else{
                return(
                    <div onScroll={event => this.handleScroll(event, object)} style={{overflow: 'scroll', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            <div ref={this.messagesEnd}/>
                            {this.render_all_comments(object)}
                        </ul>
                    </div>
                )
            }
        }
    }

    render_messages(items, object){
        var middle = this.props.height-200;        
        if(items.length == 0){
            var items = [0,1]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'display': 'flex', 'align-items':'center','justify-content':'center'}}>
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
                <div style={{'display': 'flex', 'flex-direction': 'column-reverse'}}>
                    {items.reverse().map((item, index) => (
                        <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                            <div >
                                {this.render_message_as_focused_if_so(item, object)}
                                <div style={{height:3}}/>
                            </div>
                        </li>
                    ))}    
                </div>
            )
        }
        
    }

    focus_message(item, object){
        var clone = JSON.parse(JSON.stringify(this.state.focused_message))

        if(this.state.focused_message[object['id']] != item){
            clone[object['id']] = item
            if(clone['tree'][object['id']] == null) {
                clone['tree'][object['id']] = []
            }
            // if(!this.includes_function(clone['tree'][object['id']], item)){
            // }
            clone['tree'][object['id']].push(item)
        }
        this.setState({focused_message: clone})
    }

    unfocus_message(object){
        var clone = JSON.parse(JSON.stringify(this.state.focused_message))
        if(clone['tree'][object['id']] != null){
            var index = this.get_index_of_item(object)
            if(index != -1){
                clone['tree'][object['id']].splice(index, 1)
            }
        }

        var latest_message = clone['tree'][object['id']].length > 0 ? clone['tree'][object['id']][clone['tree'][object['id']].length -1] : null
        clone[object['id']] = latest_message
        this.setState({focused_message: clone})
    }

    get_index_of_item(object){
        // var object = this.get_post_items()[this.props.selected_audio_item];
        var focused_item = this.state.focused_message[object['id']]
        var focused_items = this.state.focused_message['tree'][object['id']]
        var pos = -1
        for(var i=0; i<focused_items.length; i++){
            if(focused_items[i]['message_id'] == focused_item['message_id']){
                pos = i
                break
            }
        }
        return pos
    }

    render_message_as_focused_if_so(item, object){
        return(
            <div>
                <SwipeableList>
                        <SwipeableListItem
                            swipeLeft={{
                            content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2507a']/* Reply */}</p>,
                            action: () => this.focus_message(item, object)
                            }}
                            swipeRight={{
                            content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2908']/* Delete. */}</p>,
                            action: () => this.props.delete_message_from_stack(item, this.props.app_state.loc['1593ct']/* 'video-messages' */)
                            }}
                            >
                            <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>{this.render_stack_message_item(item, object)}</div>
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

    render_stack_message_item(item, object){
        if(this.is_sender_in_blocked_accounts(item)){
            return(
                <div>
                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'display': 'flex', 'align-items':'center','justify-content':'center'}}>
                        <div style={{'margin':'10px 20px 10px 0px'}}>
                            <img alt="" src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                        </div>
                    </div>
                </div>
            )
        }
        var size = item['size'] == null ? '15px' : item['size'];
        var font = item['font'] == null ? this.props.app_state.font : item['font']
        return(
            <div>
                <div style={{'padding': '7px 15px 10px 15px','margin':'0px 0px 0px 0px', 'background-color': this.props.theme['view_group_card_item_background'],'border-radius': '7px'}}> 
                    <div className="row" style={{'padding':'0px 0px 0px 0px'}}>
                        <div className="col-9" style={{'padding': '0px 0px 0px 14px', 'height':'20px' }}> 
                            <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} onClick={()=>this.props.add_id_to_contacts(item['sender'], item, object)} >{this.get_sender_title_text(item, object)}</p>
                        </div>
                        <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                            <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{this.get_time_difference(item['time'], object)}</p>
                        </div>
                    </div>
                    <p style={{'font-size': size,'color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': font,'text-decoration': 'none', 'white-space': 'pre-line', 'word-break': 'break-all'}} onClick={(e) => this.when_message_clicked(e, item)}><Linkify options={{target: '_blank'}}>{this.format_message(item['message'], object)}</Linkify></p>
                    {this.render_markdown_in_message_if_any(item)}
                    {this.render_images_if_any(item)}
                    
                    <p style={{'font-size': '8px','color': this.props.theme['primary_text_color'],'margin': '1px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'white-space': 'pre-line'}} className="fw-bold">{this.get_message_replies(item, object).length} {this.props.app_state.loc['1693']}</p>
                </div>
                {this.render_pdfs_if_any(item)}
                {this.render_response_if_any(item, object)}
            </div>
        )
        
    }

    render_response_if_any(_item, object){
        if(_item['focused_message_id'] == 0) return;
        // if(this.get_focused_message(object) != null) return;
        var message_items = this.get_convo_messages(object).concat(this.get_stacked_items(object))
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
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} onClick={()=>this.props.add_id_to_contacts(item['sender'], item, object)} >{this.get_sender_title_text(item, object)}</p>
                    </div>
                    <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                        <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{this.get_time_difference(item['time'], object)}</p>
                    </div>
                </div>
                <p style={{'font-size': size,'color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': font,'text-decoration': 'none', 'white-space': 'pre-line'}}>{this.truncate(item['message'], 53)}</p>

                {this.render_award_object_if_any(_item)}
            </div>
        )
    }

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }

    render_award_object_if_any(item){
        if(item['award_tier'] != null && item['award_tier'] != ''){
            return(
                <div style={{}}>
                    <p style={{'margin': '0px 0px 0px 0px', 'font-size': '8px'}}>{item['award_tier']['label']['title']}</p>
                </div>
            )
        }
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

    get_sender_title_text(item, object){
        // var object = this.get_post_items()[this.props.selected_audio_item];
        if(item['sender'] == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[item['sender']] == null ? item['sender'] : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[item['sender']])
            if(object['event'].returnValues.p5 == item['sender'] && !this.is_post_anonymous(object)){
                alias = alias+' • '+this.props.app_state.loc['2064c']/* 'Creator' */
            }
            return alias
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

    format_message(message){
        if(message == ''){
            return '...'
        }
        return message
    }

    get_convo_messages(object){
        // var object = this.get_post_items()[this.props.selected_audio_item];
        if(this.props.app_state.object_messages[object['id']] == null) return [];
        return this.filter_messages_for_blocked_accounts(this.props.app_state.object_messages[object['id']])
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

    get_stacked_items(object){
        // var object = this.get_post_items()[this.props.selected_audio_item];
        var convo_id = object['id']

        var stack = this.props.app_state.stack_items
        var stacked_items = []
        for(var i=0; i<stack.length; i++){
            if(stack[i].type == this.props.app_state.loc['1593ct']/* 'video-messages' */){
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

    get_focused_message_replies(object){
        var focused_message = this.get_focused_message(object)
        var all_messages = this.get_convo_messages(object).concat(this.get_stacked_items(object))
        var replies = []
        for(var i=0; i<all_messages.length; i++){
            if(all_messages[i]['focused_message_id'] != null && focused_message['message_id'] != null &&  all_messages[i]['focused_message_id'] == focused_message['message_id']){
                replies.push(all_messages[i])
            }
        }
        return replies
    }

    get_message_replies(item, object){
        var all_messages = this.get_convo_messages(object).concat(this.get_stacked_items(object))
        var replies = []
        for(var i=0; i<all_messages.length; i++){
            if(all_messages[i]['focused_message_id'] != null && item['message_id'] != null &&  all_messages[i]['focused_message_id'] == item['message_id']){
                replies.push(all_messages[i])
            }
        }
        return replies
    }

    get_focused_message(object){
        // var object = this.get_post_items()[this.props.selected_audio_item];
        return this.state.focused_message[object['id']]
    }

    when_entered_text_input_field_changed(text){
        this.setState({entered_text: text})
    }

    add_message_to_stack(object){
        var message = this.state.entered_text.trim()
        var message_id = Date.now()
        var focused_message_id = this.get_focused_message(object) != null ? this.get_focused_message(object)['message_id'] : 0

        var comments_disabled_option = this.get_selected_item2(object['ipfs'].get_disabled_comments_section, 'e')
        var posts_author = object['author']
        var me = this.props.app_state.user_account_id[object['e5']]
        if(comments_disabled_option == 1 && me != posts_author){
            this.props.notify(this.props.app_state.loc['2759']/* The comment section has been disabled by the posts author. */, 4500)
            return
        }

        if(message == ''){
            this.props.notify(this.props.app_state.loc['1695']/* 'type something first' */, 600)
        }
        else if(this.props.app_state.user_account_id[object['e5']] == 1){
            this.props.notify(this.props.app_state.loc['1696']/* 'You need to make at least 1 transaction to participate.' */, 1200)
        }
        else{
            var tx = {'id':object['id'], type:'message', entered_indexing_tags:['send', 'message'], 'message':message, 'sender':this.props.app_state.user_account_id[object['e5']], 'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id, 'e5':object['e5']}

            this.props.add_video_reply_to_stack(tx)

            this.setState({entered_text:''})
            this.props.notify(this.props.app_state.loc['1697']/* 'Message added to stack.' */, 1600)
            
            if (this.messagesEnd.current){
                this.messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }

    render_focus_list(object){
        // var object = this.get_post_items()[this.props.selected_audio_item];
        var items = this.state.focused_message['tree'][object['id']]

        if(items != null && items.length > 0){
            return(
                <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_focus_chain_item_clicked(item, index, object)}>
                                {this.render_detail_item('3', {'title':this.get_sender_title_text(item, object), 'details':this.shorten_message_item(this.format_message(item['message'], object), object), 'size':'s'})}
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

    when_focus_chain_item_clicked(item, pos, object){
        var clone = JSON.parse(JSON.stringify(this.state.focused_message))
        // var object = this.get_post_items()[this.props.selected_audio_item];

        var new_array = []
        for(var i=0; i<=pos; i++){
            new_array.push(clone['tree'][object['id']][i])
        }
        clone[object['id']] = item
        clone['tree'][object['id']] = new_array
        
        this.setState({focused_message: clone})
    }

    render_all_comments(object){
        var sorted_messages_in_tree = this.get_message_replies_in_sorted_object(object)
        return(
            <div  style={{'display': 'flex', 'flex-direction': 'column-reverse'}}>
                {sorted_messages_in_tree.children.map((item, index) => (
                    <li style={{'padding': '1px 5px 0px 5px'}} onClick={()=>console.log()}>
                        <div >
                            {this.render_main_comment(item, 0, object)}
                            <div style={{height:3}}/>
                        </div>
                    </li>
                ))}    
            </div>
        )
    }

    render_main_comment(comment, depth, object){
        return(
            <div>
                <div style={{'padding': '1px 0px 0px 0px'}} onClick={()=> this.when_message_item_clicked(comment.data.message, object)}>
                    {this.render_message_as_focused_if_so(comment.data.message, object)}
                </div>

                {this.render_message_children(comment, depth, object)}
            </div>
        )
    }

    render_message_children(comment, depth, object){
        var padding = depth > 4 ? '0px 0px 0px 5px' : '0px 0px 0px 20px'
        if(this.state.hidden_message_children_array.includes(comment.data.message['message_id'])){
            return(
                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px'}}>
                    <div style={{width:'100%'}}>
                        <ul style={{ 'padding': padding, 'listStyle':'none'}}>
                            {comment.children.map((item, index) => (
                                <li style={{'padding': '4px 0px 0px 0px'}}>
                                    <div>
                                        {this.render_main_comment(item, depth+1, object)}
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

    get_message_replies_in_sorted_object(object){
        var messages = this.get_convo_messages(object).concat(this.get_stacked_items(object))
        var data = []
        messages.forEach(message => {
            data.push({ index : message['message_id'], sort : message['time'], parent : message['focused_message_id'], message: message })
        });
        var tree = toTree(data);
        return tree;
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




export default VideoDetailsSection;