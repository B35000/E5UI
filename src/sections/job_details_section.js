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
import LocationViewer from './../components/location_viewer';
// import Letter from './../assets/letter.png'; 
// import E5EmptyIcon3 from './../assets/e5empty_icon3.png';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import Linkify from "linkify-react";
import { motion, AnimatePresence } from "framer-motion";

import words from 'profane-words'
import * as naughtyWords from 'naughty-words';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ViewPager, Frame, Track, View } from 'react-view-pager'

import { Virtuoso } from "react-virtuoso";

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

class JobDetailsSection extends Component {
    
    state = {
        selected: 0, navigate_view_jobs_list_detail_tags_object: this.get_navigate_view_jobs_list_detail_tags(), entered_text:'', focused_message:{'tree':{}}, comment_structure_tags: this.get_comment_structure_tags(), hidden_message_children_array:[],visible_hidden_messages:[], selected_price_tag:{}, selected_token_tag:{}
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

    componentDidMount() {
        this.interval = setInterval(() => this.check_for_new_responses_and_messages(), this.props.app_state.details_section_syncy_time);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    check_for_new_responses_and_messages() {
        if(this.props.selected_job_post_item != null){
            var object = this.get_item_in_array(this.get_job_items(), this.props.selected_job_post_item)
            if(object == null) return;
            this.perform_fetch_work(object)
        }
    }

    perform_fetch_work(object){
        const active = this.state.navigate_view_jobs_list_detail_tags_object['i'].active
        const selected_item = this.get_selected_item(this.state.navigate_view_jobs_list_detail_tags_object, active)

        if(selected_item == this.props.app_state.loc['2030']/* 'activity' */){
            this.props.get_objects_messages(object['id'], object['e5'])
        }
        else if(active == this.props.app_state.loc['1693']/* 'responses' */){
            this.props.get_job_objects_responses(object['id'], object['e5'], 'job')
        }
    }

    reset_tags(){
        this.setState({navigate_view_jobs_list_detail_tags_object: this.get_navigate_view_jobs_list_detail_tags()})
    }
    

    get_navigate_view_jobs_list_detail_tags(){
        var obj = {
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e',this.props.app_state.loc['2118']/* 'details' */,'e.'+this.props.app_state.loc['1693']/* 'responses' */, this.props.app_state.loc['2030']/* 'activity' */],[1]
          ],
        }

        obj[this.props.app_state.loc['1693']/* 'responses' */] = [
            ['xor','e',1], [this.props.app_state.loc['1693']/* 'responses' */,this.props.app_state.loc['2695g']/* 'all' */,this.props.app_state.loc['2507c']/* 'unaccepted' */,this.props.app_state.loc['2507d']/* 'accepted' */], [1],[1]
        ]

        return obj
    }

    render(){
        return(
        <div>{this.render_jobs_list_detail()}</div>
        )
    }


    render_jobs_list_detail(){
        if(this.props.selected_job_post_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    {this.render_jobs_details_section()}
                    <div style={{'height':'50px', width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 0px 0px'}}>
                        <Tags ref={c => this.bottom_tags = c} font={this.props.app_state.font} app_state={this.props.app_state} page_tags_object={this.state.navigate_view_jobs_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_jobs_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
    }

    when_navigate_view_jobs_list_detail_tags_object_updated(tag_group){
        this.setState({navigate_view_jobs_list_detail_tags_object: tag_group})
        var me = this;
        setTimeout(function() {
            me.check_for_new_responses_and_messages()
        }, (1 * 300));
    }


    render_empty_detail_object(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height
        return(
            <div>
                <div style={{height:he, 'background-color': 'transparent', 'border-radius': '15px','padding':'10px 5px 5px 10px','display': 'flex', 'align-items':'center','justify-content':'center','margin':'0px 0px 10px 0px'}}>
                    <img src={this.props.app_state.theme['letter']} style={{height:70 ,width:'auto'}} />
                </div>
            </div>
        )
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }


    get_item_in_array(object_array, id){
        var object = object_array.find(x => x['e5_id'] === id);
        return object
    }

    render_jobs_details_section(){
        const active = this.state.navigate_view_jobs_list_detail_tags_object['i'].active
        var selected_item = this.get_selected_item(this.state.navigate_view_jobs_list_detail_tags_object, active)
        var object = this.get_item_in_array(this.get_job_items(), this.props.selected_job_post_item)

        if(object == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }

        if(object != null){
            // if(this.props.screensize != 'l'){
            //     return this.render_post_list_group_if_touch_screen(object)
            // }
            if(selected_item == this.props.app_state.loc['2118']/* 'details' */ || selected_item == 'e'){
                return(
                    <div key={selected_item}>
                        {this.render_job_posts_main_details_section(object)}
                    </div>
                )
            }
            else if(active == this.props.app_state.loc['1693']/* 'responses' */){
                return(
                    <div key={selected_item}>
                        {this.render_job_post_responses(object)}
                    </div>
                )
                
            }
            else if(selected_item == this.props.app_state.loc['2030']/* 'activity' */){
                return(
                    <div key={selected_item}>
                        {this.render_job_message_activity(object)}
                    </div>
                )
            }
        }
    }

    render_post_list_group_if_touch_screen(object){
        var pos = this.state.navigate_view_jobs_list_detail_tags_object['e'][2][0] - 1
        if(this.state.navigate_view_jobs_list_detail_tags_object['i'].active == this.props.app_state.loc['1693']/* 'responses' */){
            pos = 1
        }
        const handle_change = (value) => {
            const tag_name = this.state.navigate_view_jobs_list_detail_tags_object['e'][1][value+1]
            const current_tag_group = this.state.navigate_view_jobs_list_detail_tags_object['i'].active 
            const first_tag = this.state.navigate_view_jobs_list_detail_tags_object[current_tag_group][1][0]
            
            const clone = structuredClone(this.state.navigate_view_jobs_list_detail_tags_object)
            const tag_object_clone = this.bottom_tags.when_tag_button_clicked(0, first_tag, true, clone)
            const tag_object_clone2 = this.bottom_tags.when_tag_button_clicked(value+1, tag_name, true, tag_object_clone)
            console.log('handle_change', 'tag_object_clone2', tag_object_clone2)
            var me = this;
            setTimeout(function() {
                me.setState({navigate_view_jobs_list_detail_tags_object: tag_object_clone2})
            }, (1 * 200));
        }
        return(
            <div>
                <ViewPager tag="main">
                    <Frame className="frame">
                        <Track ref={c => this.track = c} viewsToShow={1} currentView={pos} onViewChange={(e) => handle_change(parseInt(e))} className="track">
                            <View className="view">
                                <div>
                                    {this.render_job_posts_main_details_section(object)}
                                </div>
                            </View>
                            <View className="view">
                                <div>
                                    {this.render_job_post_responses(object)}
                                </div>
                            </View>
                            <View className="view">
                                <div>
                                    {this.render_job_message_activity(object)}
                                </div>
                            </View>
                            
                        </Track>
                    </Frame>
                </ViewPager>
            </div>
        )
        
    }

    render_job_posts_main_details_section(object){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-50
        var size = this.props.screensize
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        var item = this.get_job_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects

        const responses = this.props.app_state.job_responses[object['id']] == null ? object['responses'] : this.props.app_state.job_responses[object['id']].length

        return(
            <div style={{ 'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 2px 10px', 'padding':'0px 10px 0px 10px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div onClick={() => this.copy_id_to_clipboard(object)}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    
                    <div style={{height: 10}}/>
                    {this.show_moderator_note_if_any(object)}
                    {this.render_post_state(object)}
                    <div onClick={() => this.add_to_contacts2(object)}>
                        {this.render_detail_item('3', {'title':''+this.get_senders_name(object['event'].returnValues.p5, object), 'details':this.props.app_state.loc['2070']/* 'Author' */, 'size':'l'})}
                    </div>
                    <div style={{height: 10}}/>

                    {responses > 0 && (
                        <div>
                            {this.render_detail_item('4', {'text':number_with_commas(responses)+this.props.app_state.loc['2509c']/* ' responses' */, 'textsize':'14px', 'font':'Sans-serif'})}
                            <div style={{height: 10}}/>
                        </div>
                    )}
                    
                    {this.render_taken_down_message_if_post_is_down(object)}
                    {this.render_message_if_blocked_by_sender(object)}

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    {this.render_detail_item('0')}
                    {this.render_item_data(items, object)}
                    {this.render_item_images(object)}
                    {this.render_pdf_files_if_any(object)}

                    {this.render_zip_files_if_any(object)}

                    {this.render_markdown_if_any(object)}

                    {this.render_detail_item('0')}
                    {this.render_job_location_info(object)}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2482']/* 'Job Offers' */, 'details':this.props.app_state.loc['2483']/* 'The amounts they are offering for the job.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_price_amounts(object)}

                    {this.render_object_tag_price_info(object)}
                    
                    {this.render_apply_for_job_button(object)}

                    {this.render_edit_object_button(object)}

                    {this.render_pin_job_button(object)}

                    {this.render_block_post_button(object)}

                    {this.render_follow_unfollow_author_button(object)}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    copy_id_to_clipboard(object){
        navigator.clipboard.writeText(object['id'])
        this.props.notify(this.props.app_state.loc['1403']/* Copied to clipboard. */, 800)
    }

    show_moderator_note_if_any(object){
        if(this.props.app_state.moderator_notes_by_my_following.length == 0  || this.props.app_state.user_account_id[object['e5']] == object['author']) return;
        var note_to_apply = []
        for(var n=0; n<this.props.app_state.moderator_notes_by_my_following.length; n++){
            const focused_note = this.props.app_state.moderator_notes_by_my_following[n]
            var hit_count = 0
            for(var k=0; k<focused_note['keywords'].length; k++){
                const keyword_target = focused_note['keywords'][k]
                if(object['ipfs'].entered_title_text.includes(keyword_target)){
                    hit_count ++
                }
                else if(this.get_senders_name(object['author'], object) == keyword_target || object['author'] == keyword_target){
                    hit_count++
                }
                else if(object['ipfs'].entered_indexing_tags.includes(keyword_target)){
                    hit_count ++
                }
                else{
                    const matching_entered_text_objects = object['ipfs'].entered_text_objects.filter(text_object => text_object['text'].includes(keyword_target));
                    
                    if(matching_entered_text_objects.length > 0){
                        hit_count ++
                    }
                    else if(object['ipfs'].markdown != null && object['ipfs'].markdown.includes(keyword_target)){
                        hit_count++
                    }
                    else if(object['ipfs'].entered_genre_text != null && object['ipfs'].entered_genre_text.includes(keyword_target)){
                        hit_count++
                    }
                    else if(object['ipfs'].entered_year_recorded_text != null && object['ipfs'].entered_year_recorded_text.includes(keyword_target)){
                        hit_count++
                    }
                    else if(object['ipfs'].entered_author_text != null && object['ipfs'].entered_author_text.includes(keyword_target)){
                        hit_count++
                    }
                    else if(object['ipfs'].entered_copyright_text != null && object['ipfs'].entered_copyright_text.includes(keyword_target)){
                        hit_count++
                    }
                    else if(object['ipfs'].entered_comment_text != null && object['ipfs'].entered_comment_text.includes(keyword_target)){
                        hit_count++
                    }
                    else{
                        if(object['ipfs'].songs != null){
                            const matching_songs = object['ipfs'].songs.filter(song => (song['song_title'].includes(keyword_target) || song['song_composer'].includes(keyword_target) || song['credits'].includes(keyword_target)));
                            
                            if(matching_songs.length > 0){
                                hit_count ++
                            }
                        }
                        else if(object['ipfs'].videos != null){
                            const matching_videos = object['ipfs'].videos.filter(video => (video['video_title'].includes(keyword_target) || video['video_composer'].includes(keyword_target)));
                            
                            if(matching_videos.length > 0){
                                hit_count ++
                            }
                        }
                    }
                }
            }

            if(((focused_note['type'] == 'all' && hit_count == focused_note['keywords'].length) || (focused_note['type'] == 'one' && hit_count != 0)) && focused_note['visibility_end_time'] >= (Date.now()/1000)){
                note_to_apply.push(focused_note)
            }
        }
        if(note_to_apply.length != 0){
            const identifier = object['e5_id']
            const note_index = this.state.note_index == null || this.state.note_index[identifier] == null ? 0 : this.state.note_index[identifier];
            const note_count_message = `(${note_index+1}/${note_to_apply.length})`
            return(
                <div>
                    <div onClick={() => this.update_note_object_index(note_to_apply, identifier)}>
                        {this.render_detail_item('3', {'size':'s', 'title':this.props.app_state.loc['1593is']/* '⚠️ Moderator Note $' */.replace('$', note_count_message), 'details':note_to_apply[note_index]['message']})}
                        {this.props.render_files_part(note_to_apply[note_index]['entered_file_objects'])}
                    </div>
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    update_note_object_index(note_to_apply, identifier){
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

    add_to_contacts2(object){
        this.props.add_id_to_contacts(object['author'], object)
    }

    render_post_state(object){
        const country_data = this.props.app_state.country_data
        const object_country = object['ipfs'].device_country
        const country_item_data = country_data.find(e => e.name === object_country)
        if(country_item_data != null){
            var obj = {'g':'🟢', 'r':'🔴', 'b':'🔵', 'y':'🟡', 'o':'🟠', 'p':'🟣'}
            var country_color = obj[country_item_data.color[0]]
            var title = country_item_data.code /* +' '+country_item_data.emoji */
            var details = country_color+' '+country_item_data.call_code
            var channeling_id = object['ipfs'].get_content_channeling_object == null ? 3 : this.get_selected_item2(object['ipfs'].get_content_channeling_object, 'e')
            if(channeling_id == 1){
                return(
                    <div>
                        {this.render_detail_item('3', {'size':'l', 'title':title, 'details':details})}
                        <div style={{height:10}}/>
                    </div>
                )
            }
            else if(channeling_id == 2){
                var text = country_color+' '+object['ipfs'].device_language_setting
                return(
                    <div>
                        {this.render_detail_item('4', {'text':text, 'textsize':'13px', 'font':this.props.app_state.font})}
                        <div style={{height:10}}/>
                    </div>
                )
            }
            else{
                var text = '⚫ '+this.props.app_state.loc['1233']/* 'international' */
                return(
                    <div>
                        {this.render_detail_item('4', {'text':text, 'textsize':'13px', 'font':this.props.app_state.font})}
                        <div style={{height:10}}/>
                    </div>
                )
            }
        }
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
                    <div style={{height: 10}}/>
                    {this.render_detail_item('13', {'source':state.markdown})}
                </div>
            )
        }
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

    render_uploaded_file(item, index){
        var ecid_obj = this.get_cid_split(item)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null || this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']] == null) return
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
                {this.render_detail_item('8', {'details':title,'title':details, 'size':'s', 'image':thumbnail, 'border_radius':'15%',})}
            </div>
        )
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
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null || this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']] == null) return
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

    render_selected_links(object){
        if(object['ipfs'].added_links == null) return;
        var items = [].concat(object['ipfs'].added_links).reverse()

        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_link_item_clicked(item, object)}>
                            {this.render_detail_item('3', {'title':this.get_title(item), 'details':this.truncate(item['title'], 15), 'size':'s', 'padding':'7px 12px 7px 12px'})}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    truncate(source, size) {
        var firstLine = source.includes("\n") ? source.split("\n")[0] : source;
        return firstLine.length > size ? firstLine.slice(0, size - 1) + "…" : firstLine;
    }

    get_title(item){
        var obj = {'contract':'📑', 'job':'💼', 'contractor':'👷🏻‍♀️', 'storefront':'🏪','subscription':'🎫', 'post':'📰','channel':'📡','token':'🪙', 'proposal':'🧎'}
        var item_id = ((item['e5']).toUpperCase()+' • '+item['id'])
        return `${obj[item['type']]} ${item_id}`
    }


    when_link_item_clicked(item, object){
        this.props.open_e5_link(item, object)
    }

    get_senders_name(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['2785']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    render_pin_job_button(object){
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2487']/* 'Pin the job to your feed' */, 'title':this.props.app_state.loc['2488']/* 'Pin Job' */})}
                <div style={{height:10}}/>
                <div onClick={()=> this.when_pin_job_clicked(object)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2489']/* 'Pin/Unpin Job' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_pin_job_clicked(object){
        this.props.pin_job(object)
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
                    <div style={{overflow: 'auto'}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['view_group_card_item_background'], 'border-radius': '15px','padding':'10px 0px 10px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
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
                        <div key={'d'+index}>
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

    open_respond_to_job_ui(object){
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        this.props.open_respond_to_job_ui(object)
    }

    render_edit_object_button(object){
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        var my_account = this.props.app_state.user_account_id[object['e5']]

        const is_socket_job = object['ipfs'].get_chain_or_indexer_job_object != null ? this.get_selected_item2(object['ipfs'].get_chain_or_indexer_job_object, 'e') == 1 : false

        if(object['event'].returnValues.p5 == my_account && !is_socket_job){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2490']/* 'Edit Job Post' */, 'details':this.props.app_state.loc['2491']/* 'Change the basic details for your Job Post' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_basic_edit_object_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2492']/* 'Perform Action' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    render_apply_for_job_button(object){
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if(object['event'].returnValues.p5 != my_account){
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2484']/* 'Apply for the job' */, 'details':this.props.app_state.loc['2485']/* 'Respond to the ad with a contract and apply for the job' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_respond_to_job_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2486']/* 'Apply' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    open_basic_edit_object_ui(object){
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        this.props.open_edit_object('0', object)
    }






    render_job_location_info(object){
        if(this.is_job_location_ok_to_show(object) && object['ipfs'].pins != null && object['ipfs'].pins.length > 0){
            const pins = object['ipfs'].pins
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2064k']/* 'Included Locations Pins.' */, 'details':this.props.app_state.loc['2064l']/* 'Some locations have been included in the object. */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <div onClick={() => this.props.show_view_map_location_pins(pins)}>
                        <LocationViewer ref={this.locationPickerRef} height={270} theme={this.props.theme['map_theme']} center={this.get_default_center()} pins={pins} size={'l'} input_enabled={false}
                        />
                    </div>
                    <div style={{height:10}}/>
                    {this.render_selected_pins(pins)}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(object['ipfs'].pins != null && object['ipfs'].pins.length > 0){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2064k']/* 'Included Locations Pins.' */, 'details':this.props.app_state.loc['2064l']/* 'Some locations have been included in the object. */, 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_hidden_card(this.props.app_state.loc['284bk']/* Hidden */)}
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    render_hidden_card(text){
        return(
            <div style={{height:160, width:'100%', 'background-color': this.props.theme['view_group_card_item_background'], 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                <div style={{'margin':'10px 20px 0px 0px'}}>
                    <img alt="" src={this.props.app_state.theme['letter']} style={{height:55 ,width:'auto'}}/>
                    <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'font-size': '8px', 'color': this.props.theme['primary_text_color']}}></p>
                </div>
            </div>
        );
    }

    is_job_location_ok_to_show(object){
        if(object['author'] == this.props.app_state.user_account_id[object['e5']]){
            return true
        }
        var responses = this.get_job_details_responses(object)
        var allowed = false
        responses.forEach(item => {
            var is_application_accepted = item['is_response_accepted'];
            if(is_application_accepted == true){
                allowed = true;
            }
        });
        return allowed
    }

    get_default_center(){
        const my_city = this.props.app_state.device_city.toLowerCase()
        var all_cities = this.props.app_state.all_cities
        var specific_cities_objects = all_cities.filter(function (el) {
            return (el['city'].startsWith(my_city) || el['city'] == my_city)
        });

        if(specific_cities_objects.length > 0){
            var city_obj = specific_cities_objects[0];
            return { lat: city_obj['lat'], lon: city_obj['lon'] }
        }
        else{
            return { lat: 51.505, lon: -0.09 }
        }
    }

    render_selected_pins(pins){
        var items = [].concat(pins)
        return(
            <div>
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_pin_item(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    render_pin_item(item){
        const title = item['id']
        const details = item['description'] == '' ? this.props.app_state.loc['284q']/* 'latitude: $, longitude: %' */.replace('$', item['lat']).replace('%', item['lng']) : this.truncate(item['description'], 17)
        return(
            <div onClick={() => this.when_pin_item_clicked(item)}>
                {this.render_detail_item('3', {'title':title, 'details':details, 'size':'s'})}
            </div>
        )
    }

    when_pin_item_clicked(item){
        const location_data = { lat: item['lat'], lon: item['lng'] }
        this.locationPickerRef.current?.set_center(location_data);
    }






    render_price_amounts(object){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        var items = [].concat(object['ipfs'].price_data)
        if(items.length == 0){
            items = [0, 1, 2]
            return(
                <div>
                    <div style={{overflow: 'auto'}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['view_group_card_item_background'], 'border-radius': '15px','padding':'10px 0px 10px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div> 
            )
        }
        return(
            <div style={{}}>
                <div style={{'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <div style={{'padding': '3px 0px 3px 0px'}}>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
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


    get_job_details_data(object){
        var tags = object['ipfs'] == null ? ['Job'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Job ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6

        const is_socket_job = object['ipfs'].get_chain_or_indexer_job_object != null ? this.get_selected_item2(object['ipfs'].get_chain_or_indexer_job_object, 'e') == 1 : false

        const title_image = is_socket_job == true ? (this.props.app_state.nitro_album_art[object['event']['nitro_e5_id']] == null ? this.props.app_state.static_assets['empty_image'] : this.props.app_state.nitro_album_art[object['event']['nitro_e5_id']]) : this.props.app_state.e5s[object['e5']].e5_img

        const title_space = is_socket_job == true ? ' • ' : '• '

        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags,'when_tapped':'select_deselect_tag'},
            'id':{'title':title_space+number_with_commas(object['id']), 'details':title, 'size':'l', 'title_image':title_image, 'border_radius':'0%', 'text_image_border_radius':'6px'},
            'age':{'style':'l', 'title':this.props.app_state.loc['2493']/* 'Block Number' */, 'subtitle':this.props.app_state.loc['2494']/* 'age' */, 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)} `+this.props.app_state.loc['2495']/* ago */, }
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
            var num = parseInt(diff)
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

    get_job_items(){
        return this.props.get_job_items('')
    }






    render_object_tag_price_info(object){
        const tag_price_data = this.get_available_tag_data(object)
        const available_tags = Object.keys(tag_price_data)
        if(available_tags.length == 0) return;

        const selected_tag_pos = this.get_selected_tag(object)
        const get_selected_tags = () => {
            const return_array = []
            selected_tag_pos.forEach(pos => {
                return_array.push(available_tags[pos])
            });
            return return_array
        }
        const selected_tags = get_selected_tags()
        const get_selected_price_data = () => {
            const first_price_data = tag_price_data[selected_tags[0]]
            const other_tags_hashes = () => {
                const return_data = [];
                selected_tags.slice(1).forEach(word => {
                    return_data.push(this.props.app_state.hash_keyord_mapping_data[word])
                });
                return return_data
            }
            const other_tags = other_tags_hashes()

            const filter_all_fun = (target_array, filter_tags) => {
                const setA = new Set(target_array);
                return filter_tags.every(el => setA.has(el));
            }
            const return_array = first_price_data.filter(function (price_hit) {
                const other_tags_array = price_hit['tag_data']['other_tags']
                return (filter_all_fun(other_tags_array, other_tags))
            });
            return return_array
        }
        const price_data = get_selected_price_data()
        const sorted_price_data = this.sortByAttributeDescending(price_data, 'time').reverse()
        const { used_token_ids, used_token_price_data, used_tokens_max } = this.get_tags_used_tokens_and_price_data(sorted_price_data, object['e5'])

        const selected_token_pos = this.get_selected_token(object)
        const selected_token = used_token_ids[selected_token_pos]

        const new_dps = this.get_transaction_tag_data_points(used_token_price_data, selected_token, used_tokens_max)

        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2507e']/* 'Price Distribution.' */, 'details':this.props.app_state.loc['2507f']/* `A chart containing hits at certain price points for your selected tag.` */, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_used_tokens(used_token_ids, object, selected_token)}
                <div style={{height: 10}}/>

                {this.render_detail_item('6', {'final_data_points':new_dps.new_dps, 'y_axis_units':' '+this.props.app_state.loc['2507i']/* hits */})}
                <div style={{height: 10}}/>

                {this.render_used_tags(available_tags, object, selected_tags)}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['2642cg']/* 'Y-Axis: ' */+this.props.app_state.loc['2507h']/* Transaction Hits */, 'details':this.props.app_state.loc['2507g']/* 'X-Axis: Price' */, 'size':'s'})}
            </div>
        )
    }

    get_selected_tag(object){
        if(this.state.selected_price_tag[object['e5_id']] == null){
            return [0]
        }else{
            return this.state.selected_price_tag[object['e5_id']]
        }
    }

    get_selected_token(object){
        if(this.state.selected_token_tag[object['e5_id']] == null){
            return 0
        }else{
            return this.state.selected_token_tag[object['e5_id']]
        }
    }

    get_available_tag_data(object){
        const payment_tags = object['ipfs'].entered_indexing_tags.concat(object['ipfs'].entered_title_text.replace(/[^\w\s]|_/g, '').trim().split(/\s+/).filter(word => word.length >= 3))

        const filter_words = this.props.get_stop_words()

        const final_payment_tags = payment_tags.filter(function (tag) {
            return (!filter_words.includes(tag))
        });

        const return_object = {}
        final_payment_tags.forEach(tag => {
            if(this.props.app_state.tag_price_data[tag] != null && this.props.app_state.tag_price_data[tag].length > 0){
                return_object[tag] = this.props.app_state.tag_price_data[tag]
            }
        });

        return return_object
    }

    get_tags_used_tokens_and_price_data(sorted_price_data, filter_e5){
        const used_token_ids = []
        const used_token_price_data = {}
        const used_tokens_max = {}
        const sorted_price_data_to_use = sorted_price_data.filter(function (data_point) {
            return (data_point['e5'] == filter_e5)
        });
        sorted_price_data_to_use.forEach(data_point => {
            const tag_data = data_point['tag_data']
            const amounts = tag_data['amounts']
            amounts.forEach(item => {
                const exchange_id = item['id']
                const amount = item['amount']
                if(!used_token_ids.includes(exchange_id)){
                    used_token_ids.push(exchange_id) 
                    used_tokens_max[exchange_id] = 0   
                }
                if(used_token_price_data[exchange_id] == null){
                    used_token_price_data[exchange_id] = []
                }
                used_token_price_data[exchange_id].push(amount)
                if(bigInt(used_tokens_max[exchange_id]).lesser(amount)){
                    used_tokens_max[exchange_id] = bigInt(amount)
                }
            });
        });

        return { used_token_ids, used_token_price_data, used_tokens_max }
    }

    get_transaction_tag_data_points(used_token_price_data, selected_token, used_tokens_max){
        const data = []
        const price_datapoints = used_token_price_data[selected_token]
        const used_token_max = used_tokens_max[selected_token]
        const price_datapoint_object = {}
        price_datapoints.forEach(data_item => {
            const step = bigInt(used_token_max).divide(1000).plus(1)
            const final_item = bigInt(data_item).divide(step).multiply(step)
            if(price_datapoint_object[final_item] == null){
                price_datapoint_object[final_item] = 0
            }
            price_datapoint_object[final_item]++
        });
        const price_data = Object.keys(price_datapoint_object)
        const price_datapoint_object_as_list = []
        price_data.forEach(price_target_set => {
            price_datapoint_object_as_list.push({'price': price_target_set, 'count': price_datapoint_object[price_target_set]})
        });

        const sorted_price_datapoint_object_as_list = this.sortByAttributeDescending(price_datapoint_object_as_list, 'price').reverse()

        var diff2 = 0.001
        data.push(diff2)
        while(diff2 < sorted_price_datapoint_object_as_list[0]['count']){
            diff2 = (data[data.length-1])*1.001
            data.push(diff2)
        }

        for(var i=0; i<sorted_price_datapoint_object_as_list.length; i++){
            const focused_item = sorted_price_datapoint_object_as_list[i]['count']
            data.push(focused_item)

            if(i==sorted_price_datapoint_object_as_list.length-1){
                var diff = sorted_price_datapoint_object_as_list[i]['count']
                while(diff > 0.0001){
                    diff = data[data.length-1]*0.999
                    data.push(diff)
                }
            }
            else{
                var diff = sorted_price_datapoint_object_as_list[i+1]['count'] - sorted_price_datapoint_object_as_list[i]['count']
                while(diff > 0.0001){
                    diff = data[data.length-1]*0.999
                    data.push(diff)
                }
            }
        }

        const starting_price = bigInt(sorted_price_datapoint_object_as_list[0]['price']).minus(bigInt(sorted_price_datapoint_object_as_list[0]['price']).divide(10000))

        const ending_price = bigInt(sorted_price_datapoint_object_as_list[sorted_price_datapoint_object_as_list.length - 1]['price']).divide(10000).plus(bigInt(sorted_price_datapoint_object_as_list[sorted_price_datapoint_object_as_list.length - 1]['price']))

        var xVal = 1, yVal = 0, original_y_val = 0;
        var dps = [];
        var largest = 0;
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        for(var i = 0; i < noOfDps; i++) {
            if(i < 100 && data.length > 200 && xVal < 100 && (factor * (xVal+1)) < data.length){
                var sum = 0
                var slice = data.slice(factor * xVal, factor * (xVal+1))
                for(var j = 0; j < slice.length; j++) {
                    sum += slice[j]
                }
                var result = sum / (slice.length)
                original_y_val = result;
                // yVal =  parseInt(bigInt(result).multiply(100).divide(largest))
                yVal = result
            }
            else{
                original_y_val = data[factor * xVal]
                // yVal = parseInt(bigInt(data[factor * xVal]).multiply(100).divide(largest))
                yVal = data[factor * xVal]
            }
            if((largest) < (yVal)){
                largest = (yVal)
            }
            var indicator = Math.round(yVal) +' '+ this.props.app_state.loc['2507i']/* 'hits' */
            if(yVal != null && !isNaN(yVal)){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0 && yVal != 0){
                    dps.push({x: xVal,y: yVal, indexLabel:""+indicator});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
        }


        const new_dps = []
        const diff_price = ending_price.minus(starting_price)
        const time_chunk_period = diff_price.divide(dps.length - 1);
        const token_symbol = this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[selected_token]
        dps.forEach((dp, index) => {
            const period_of_x = starting_price.plus(bigInt(dp.x).times(time_chunk_period))
            const final_x = this.format_account_balance_figure_minimized(period_of_x) /* + ' '+token_symbol */
            const new_label = dp['indexLabel'] == null ? null : dp['indexLabel']
            
            if(this.props.app_state.graph_type == 2){
                if(index % 3 == 0 || new_label != null){
                    new_dps.push({x: final_x, y: dp.y, label: new_label})
                }
            }else{
                new_dps.push({x: final_x, y: dp.y, label: new_label})
            }
        });

        return { new_dps }
    }

    render_used_tags(items, object, selected_tags){
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_used_tag_item(item, object, index, selected_tags)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_used_tag_item(item, object, index, selected_tags){
        if(selected_tags.includes(item)){
            return(
                <div onClick={() => this.when_used_tag_clicked(item, object, index)}>
                    {this.render_detail_item('4', {'text':item, 'textsize':'13px', 'font':this.props.app_state.font})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }
        return(
            <div onClick={() => this.when_used_tag_clicked(item, object, index)}>
                {this.render_detail_item('4', {'text':item, 'textsize':'13px', 'font':this.props.app_state.font})}
            </div>
        )
    }

    when_used_tag_clicked(item, object, index){
        const clone = structuredClone(this.state.selected_price_tag)
        if(clone[object['e5_id']] == null){
            clone[object['e5_id']] = [0]
        }
        const position_of_included_tag = clone[object['e5_id']].indexOf(index)
        if(position_of_included_tag != -1){
            clone[object['e5_id']].splice(position_of_included_tag, 1)
        }else{
            clone[object['e5_id']].push(index)
        }
        if(clone[object['e5_id']].length > 0){
            this.setState({selected_price_tag: clone})
        }
    }

    render_used_tokens(items, object, selected_token){
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_used_token_item(item, object, index, selected_token)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_used_token_item(item, object, index, selected_token){
        const title = this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+item]
        const details = this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]
        const image = this.props.app_state.token_thumbnail_directory[object['e5']][item]
        if(item == selected_token){
            return(
                <div onClick={() => this.when_used_token_clicked(item, object, index)}>
                    {this.render_detail_item('14', {'title':title, 'image':image, 'details':details, 'size':'s', 'img_size':30})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }
        return(
            <div onClick={() => this.when_used_token_clicked(item, object, index)}>
                {this.render_detail_item('14', {'title':title, 'image':image, 'details':details, 'size':'s', 'img_size':30})}
            </div>
        )
    }

    when_used_token_clicked(item, object, index){
        const clone = structuredClone(this.state.selected_token_tag)
        clone[object['e5_id']] = index
        this.setState({selected_token_tag: clone})
    }







    render_job_post_responses(object){
        var he = this.props.height-45
        return(
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px', }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding:'5px 0px 5px 0px'}}>
                    {this.render_job_post_top_title(object)}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px'}}/>
                    {this.render_job_post_sent_received_messages(object)}
                </div>
            </div>
        )
    }

    render_job_post_top_title(object){
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        return(
            <div style={{padding:'5px 5px 5px 5px'}}>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2496']/* 'In ' */+number_with_commas(object['id']), 'details':this.props.app_state.loc['2497']/* 'Job Responses' */, 'size':'l'})} 
            </div>
        )
    }

    render_job_post_sent_received_messages(object){
        var middle = this.props.height-200;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.get_job_details_responses(object))

        if(items.length == 0){
            items = [0,1]
            return(
                <div>
                    <div style={{overflow: 'auto'}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    {this.props.app_state.job_responses[object['id']] == null || this.props.app_state.socket_job_responses[object['id']] == null ? this.render_small_skeleton_object() : this.render_small_empty_object()}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }else{
            return(
                <div style={{overflow: 'auto', 'display': 'flex', 'flex-direction': 'column-reverse'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 5px 2px 5px'}}>
                                <div key={'i'+index}>
                                    {this.render_job_response_item(item, object)}
                                </div>
                            </li> 
                        ))}
                    </ul>
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

    get_job_details_responses(object){
        if(object['event'].returnValues.p5 == this.props.app_state.user_account_id[object['e5']]){
            const chain_messages = this.props.app_state.job_responses[object['id']] == null ? [] : this.props.app_state.job_responses[object['id']]
            const socket_messages = this.props.app_state.socket_job_responses[object['id']] == null ? [] : this.props.app_state.socket_job_responses[object['id']]
            const all_responses = this.sortByAttributeDescending(chain_messages.concat(socket_messages), 'time')
            return this.filter_using_bottom_tags(all_responses)
        }else{
            var filtered_responses = []
            const chain_messages = this.props.app_state.job_responses[object['id']] == null ? [] : this.props.app_state.job_responses[object['id']]
            const socket_messages = this.props.app_state.socket_job_responses[object['id']] == null ? [] : this.props.app_state.socket_job_responses[object['id']]
            const all_responses = this.sortByAttributeDescending(chain_messages.concat(socket_messages), 'time')
            for(var i=0; i<all_responses.length; i++){
                if(all_responses[i]['applicant_id'] == this.props.app_state.user_account_id[object['e5']]){
                    filtered_responses.push(all_responses[i])
                }
            }
            return this.filter_using_bottom_tags(filtered_responses)
        }
    }

    filter_using_bottom_tags(filtered_responses){
        var selected_item = this.get_selected_item(this.state.navigate_view_jobs_list_detail_tags_object, this.props.app_state.loc['1693']/* 'responses' */)

        if(selected_item == this.props.app_state.loc['2695g']/* 'all' */){
            return filtered_responses
        }
        else if(selected_item == this.props.app_state.loc['2507c']/* 'unaccepted' */){
            var unfulfilled_items = []
            filtered_responses.forEach(item => {
                if(item['is_response_accepted'] == false){
                    //item is unfulfilled
                    unfulfilled_items.push(item)
                }
            });
            return unfulfilled_items
        }
        else if(selected_item == this.props.app_state.loc['2507d']/* 'accepted' */){
            var fulfilled_items = []
            filtered_responses.forEach(item => {
                if(item['is_response_accepted'] == true){
                    //item is unfulfilled
                    fulfilled_items.push(item)
                }
            });
            return fulfilled_items
        }
    }

    render_job_response_item(item, object){
        const accepted_title = item['is_response_accepted'] == true ? '🤝 • ':''
        return(
            <div onClick={() => this.view_contract(item, object)}>
                {this.render_detail_item('3', {'details':this.get_senders_name2(item['applicant_id'], object)+' • '+this.format_custom_specifications(item['custom_specifications'])+' • '+this.get_time_diff((Date.now()/1000) - (parseInt(item['time'])))+this.props.app_state.loc['1698a']/* ' ago' */, 'title':accepted_title+(new Date(item['application_expiry_time'] * 1000).toLocaleString()), 'size':'l'})}
            </div>
        )
    }

    format_custom_specifications(supplied_spec){
        if(supplied_spec == ''){
            return this.props.app_state.loc['2507b']/* ready when you are! */
        }
        return supplied_spec
    }

    get_senders_name2(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['2785']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    get_expiry_time(item){
        var time_diff = item['application_expiry_time'] - Math.round(Date.now()/1000)
        var t = ''
        if(time_diff < 0){
            t = this.get_time_diff(time_diff*-1) +this.props.app_state.loc['1698a']/* ' ago.' */
        }else{
            t = this.props.app_state.loc['1698b']/* 'In ' */+this.get_time_diff(time_diff)
        }

        return t
    }

    view_contract(item, object){
        this.props.show_dialog_bottomsheet({item, object}, 'view_job_application_details')
    }






    



    render_job_message_activity(object){
        var he = this.props.height-100
        if(this.get_focused_message(object) != null) he = this.props.height-165;
        he = he+30-(this.state.text_input_field_height == null ? 30 : 
            (this.state.text_input_field_height < 30 ? 30 : this.state.text_input_field_height));
        var side_buttons_margin_top = (this.state.text_input_field_height == null ? 0 : 
            (this.state.text_input_field_height-35 < 0 ? 0 : this.state.text_input_field_height-35))
        
        var size = this.props.screensize
        var ww = '80%'
        if(size == 'l') ww = '90%'
        if(this.props.app_state.width > 1100){
            ww = '80%'
        }
        return(
            <div style={{}}>
                <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px'}}>
                    <div onScroll={event => this.handleScroll(event, object)} style={{ 'overflow-y': 'scroll', height: he, padding:'5px 0px 5px 0px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.comment_structure_tags} tag_size={'l'} when_tags_updated={this.when_comment_structure_tags_updated.bind(this)} theme={this.props.theme}/>

                        {this.render_top_title(object)}
                        {/* {this.render_focus_list(object)} */}
                        <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px'}}/>
                        {this.render_sent_received_messages(object, he)}
                    </div>
                </div>
                <div style={{height:5}}/>
                {this.render_focused_message(object)}
                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 5px 5px', width: '99%'}}>
                    <div style={{'margin':`${side_buttons_margin_top}px 0px 0px 0px`}}>
                        {/* {this.render_image_picker()} */}
                        <div>
                            <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}} onClick={()=> this.when_circle_clicked(object)}>
                                <img alt="" src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}}/>
                            </div>
                        </div>
                    </div>
                    <div style={{width:10}}/>
                    <div className="row" style={{width:ww}}>
                        <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                            <TextInput font={this.props.app_state.font} height={20} placeholder={this.props.app_state.loc['1039']/* 'Enter Message...' */} when_text_input_field_changed={this.when_entered_text_input_field_changed.bind(this)} when_text_input_field_height_changed={this.when_text_input_field_height_changed.bind(this)} text={this.state.entered_text} theme={this.props.theme}/>
                        </div>
                        <div className="col-1" style={{'padding': '0px 10px 0px 0px'}}>
                            <div className="text-end" style={{'padding': '5px 0px 0px 0px', 'margin':`${side_buttons_margin_top}px 0px 0px 0px`}}>
                                <img alt="" className="text-end" onClick={()=>this.add_message_to_stack(object)} src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
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
        this.virtuoso_list?.scrollToIndex({
            index: "LAST",
            behavior: "smooth"
        });
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
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        var focused_message_id = this.get_focused_message(object) != null ? this.get_focused_message(object) : 0
        this.props.show_add_comment_bottomsheet(object, focused_message_id, 'job', null, this.state.entered_text)
    }
  

    render_top_title(object){
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        var top_title = object['ipfs'] == null ? '': object['ipfs'].entered_title_text
        return(
            <div style={{padding:'5px 5px 5px 5px'}}>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2524']/* 'In ' */+number_with_commas(object['id']), 'details':this.truncate(top_title, 40), 'size':'l'})} 
            </div>
        )
    }

    constructor(props) {
        super(props);
        this.messagesEnd = React.createRef();
        this.has_user_scrolled = {}
        this.locationPickerRef = React.createRef();
    }

    componentDidUpdate(){
        var has_scrolled = this.has_user_scrolled[this.props.selected_job_post_item]
        if(has_scrolled == null){
            this.scroll_to_bottom()
        }
    }

    render_sent_received_messages(object, he){
        // var middle = this.props.height-240;
        // if(this.get_focused_message(object) != null) middle = this.props.height-290
        var middle = he - 135
        // if(this.get_focused_message(object) != null) middle = he - 185
        var size = this.props.size;
        var items = [].concat(this.get_convo_messages(object))
        var stacked_items = [].concat(this.get_stacked_items(object)).reverse()
        var final_items = stacked_items.concat(items)

        if(items.length == 0 && stacked_items.length == 0){
            items = [0,1]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    {this.props.app_state.object_messages[object['e5_id']] == null || this.props.app_state.socket_object_messages[object['e5_id']] == null ? this.render_small_skeleton_object() : this.render_small_empty_object()}
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
                <div onScroll={event => this.handleScroll(event, object)} style={{overflow: 'hidden', height: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.render_messages(final_items, object, middle)}
                        {/* <div ref={this.messagesEnd} style={{display:'none'}}/> */}
                    </ul>
                </div>
            )
            }else{
                return(
                    <div onScroll={event => this.handleScroll(event, object)} style={{overflow: 'hidden', height: middle}} >
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            <div ref={this.messagesEnd} style={{display:'none'}}/>
                            {this.render_all_comments(object, middle)}
                        </ul>
                    </div>
                )
            }
        }
    }

    render_messages(items, object, middle){
        // var middle = this.props.height-200;        
        if(items.length == 0){
            var items = [0,1]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    {this.props.app_state.object_messages[object['e5_id']] == null || this.props.app_state.socket_object_messages[object['e5_id']] == null ? this.render_small_skeleton_object() : this.render_small_empty_object()}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }else{
            const reversed_items = items.slice().reverse()
            return(
                <div style={{}}>
                    <Virtuoso
                        ref={(el) => (this.virtuoso_list = el)}
                        style={{ height: middle }}
                        totalCount={items.length}
                        initialTopMostItemIndex={items.length-1}
                        rangeChanged={(range) => {
                            this.handleScroll('event', object)
                        }}
                        itemContent={(index) => {
                            const item = reversed_items[index]
                            const ref_item = index == items.length - 1 ? this.messagesEnd : null;
                            return (
                                <div>
                                    <AnimatePresence initial={true} mode="popLayout">
                                        <motion.div key={item['message_id']} initial={{ opacity: 0, scale:0.95 }} animate={{ opacity: 1, scale:1 }} exit={{ opacity: 0, scale:0.95 }} layout={true} transition={{ duration: 0.3 }} style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                            <div>
                                                {this.render_message_as_focused_if_so(item, object)}
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

    focus_message(item, object){
        var clone = JSON.parse(JSON.stringify(this.state.focused_message))
        // var object = this.get_job_items()[this.props.selected_job_post_item];

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

    // includes_function(array, item){
    //     var return_value = false;
    //     array.forEach(element => {
    //         if(element['id'] == item['id']){
    //             console.log('found clone: '+item['id'])
    //             return_value = true
    //         }
    //     });
    //     return return_value
    // }

    unfocus_message(object){
        var clone = JSON.parse(JSON.stringify(this.state.focused_message))
        // var object = this.get_job_items()[this.props.selected_job_post_item];
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
        // var object = this.get_job_items()[this.props.selected_job_post_item];
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
                            action: () => this.props.delete_message_from_stack(item, this.props.app_state.loc['1514']/* 'job-messages' */)
                            }}
                            >
                            <div style={{width:'100%', /* 'background-color':this.props.theme['send_receive_ether_background_color'] */}}>{this.render_stack_message_item(item, object)}</div>
                        </SwipeableListItem>
                </SwipeableList>
            </div>
        )

        // var focused_message = this.get_focused_message(object)
        // if(item == focused_message){
        //     return(
        //         <div>
        //             <SwipeableList>
        //                 <SwipeableListItem
        //                     swipeLeft={{
        //                     content: <div>Focus</div>,
        //                     action: () => console.log()
        //                     }}
        //                     swipeRight={{
        //                     content: <div>Unfocus</div>,
        //                     action: () => this.unfocus_message(object)
        //                     }}>
        //                     <div style={{width:'100%', /* 'background-color':this.props.theme['send_receive_ether_background_color'] */}}>{this.render_stack_message_item(item, object)}</div>
        //                 </SwipeableListItem>
        //             </SwipeableList>
        //             {/* <div onClick={(e) => this.when_message_clicked(e, item, 'focused_message')}>
        //                 {this.render_stack_message_item(item)}
        //             </div> */}
        //             {/* <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '5px 20px 5px 20px'}}/> */}
        //         </div>
        //     )
        // }else{
        //     return(
        //         <div>
        //             <SwipeableList>
        //                 <SwipeableListItem
        //                     swipeLeft={{
        //                     content: <div>Focus</div>,
        //                     action: () => this.focus_message(item, object)
        //                     }}
        //                     swipeRight={{
        //                     content: <div>Unfocus</div>,
        //                     action: () => this.unfocus_message(object)
        //                     }}>
        //                     <div style={{width:'100%', /* 'background-color':this.props.theme['send_receive_ether_background_color'] */}}>{this.render_stack_message_item(item, object)}</div>
        //                 </SwipeableListItem>
        //             </SwipeableList>

        //             {/* <div onClick={(e) => this.when_message_clicked(e, item)}>
        //                 {this.render_stack_message_item(item)}
        //             </div> */}
        //         </div>
        //     )
        // }
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
        this.props.notify(this.props.app_state.loc['2506']/* 'copied message to clipboard' */, 600)
    }


    show_visible(item){
        var clone = this.state.visible_hidden_messages.slice()
        if(!clone.includes(item['message_id'])){
            clone.push(item['message_id'])
        }
        this.setState({visible_hidden_messages: clone})
    }


    render_stack_message_item(item, object){
        if(this.is_sender_in_blocked_accounts(item, object)){
            return(
                <div onClick={()=>this.show_visible(item)}>
                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
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
        var line_color = item['sender'] == this.props.app_state.user_account_id[item['sender_e5']] ? this.props.theme['secondary_text_color'] : this.props.theme['send_receive_ether_background_color']
        var text = this.format_message(item['message'], object)
        // const parts = text.split(/(\d+)/g);
        const parts = this.split_text(text);
        const border_radii = item['sender'] == this.props.app_state.user_account_id[item['sender_e5']] ? '0px 7px 7px 0px': '7px'
        return(
            <div>
                <div style={{'background-color': line_color,'margin': '0px 0px 0px 0px','border-radius': border_radii}}>
                    <div style={{'background-color': this.props.theme['send_receive_ether_background_color'],'margin': '0px 0px 0px 1px','border-radius': border_radii}}>
                        <div style={{'padding': '7px 15px 10px 15px','margin':'0px 0px 0px 0px', 'background-color': this.props.theme['view_group_card_item_background'],'border-radius': '7px'}}>
                            <div className="row" style={{'padding':'0px 0px 0px 0px'}}>
                                <div className="col-9" style={{'padding': '0px 0px 0px 14px', 'height':'20px' }}> 
                                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} onClick={()=>this.props.add_id_to_contacts(item['sender'], item, object)} >{this.get_sender_title_text(item, object)}</p>
                                </div>
                                <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                                    <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{this.get_time_difference(item['time'], object)}</p>
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
                                    return <span key={index}>{this.mask_word_if_censored(part, object)}</span>;
                                })
                            }</Linkify></p>
                            {this.render_markdown_in_message_if_any(item)}
                            
                            {this.render_images_if_any(item)}
                            {this.get_then_render_my_awards(item, object)}
                            {/* <p style={{'font-size': '8px','color': this.props.theme['primary_text_color'],'margin': '1px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'white-space': 'pre-line'}} className="fw-bold">{this.get_message_replies(item, object).length} {this.props.app_state.loc['2507']}</p> */}
                        </div>
                    </div>
                </div>
                        
                {this.render_pdfs_if_any(item)}
                {this.render_response_if_any(item, object)}
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
                        {this.props.render_files_part(note_to_apply[note_index]['entered_file_objects'])}
                    </div>
                </div>
            )
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
        var split = this.mask_profane_words(text).split(' ')
        var final_string = []
        split.forEach((word, index) => {
            final_string.push(word)
            if(split.length-1 != index){
                final_string.push(' ')
            }
        });
        return final_string
    }

    mask_profane_words(string){
        if(string == null) return;
        var result_string = string
        var all_censored_phrases = this.props.app_state.censored_keyword_phrases == null ? [] : this.props.app_state.censored_keyword_phrases
        // var leetspeek = result_string.match(/\b[a-zA-Z]*[0-9@!$%^&*()_\-+=?/\\#.,';:"`~|<>]+[a-zA-Z]*\b/g) || []
        // leetspeek.forEach(phrase => {
        //     if(isNaN(phrase)) result_string = result_string.replace(phrase, phrase[0] + '?'.repeat(phrase.length - 1))
        // });
        all_censored_phrases.forEach(phrase_ => {
            const phrase = phrase_
            if(result_string.includes(phrase) && phrase.includes(' ')){
                result_string = result_string.replace(phrase, phrase[0] + '?'.repeat(phrase.length - 1))
            }
        });
        return result_string
    }

    mask_word_if_censored(word, object){
        var all_censored_phrases = this.props.app_state.censored_keyword_phrases.concat(this.props.app_state.censored_keywords_by_my_following)
        const sender = object['author']
        const sender_e5 = object['e5']
        if(this.props.app_state.post_censored_data[sender+sender_e5] != null){
            var censor_data = this.props.app_state.post_censored_data[sender+sender_e5]
            all_censored_phrases = all_censored_phrases.concat(censor_data['censored_keywords'])
        }
        
        const specific_word = word.toLowerCase().replace(/[^\p{L}\p{N} ]/gu, '')
        if(all_censored_phrases.includes(specific_word) || words.includes(specific_word)){
            if (word == null || word.length <= 1) return word; // nothing to mask
            return word[0] + '?'.repeat(word.length - 1);;
        }else{
            return word
        }
    }

    when_e5_link_tapped(id){
        this.props.when_e5_link_tapped(id)
    }

    longest_word_length(text) {
        return text
            .split(/\s+/) // Split by whitespace (handles multiple spaces & newlines)
            .reduce((maxLength, word) => Math.max(maxLength, word.length), 0);
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

                {/* {this.render_award_object_if_any(_item)} */}
                {this.get_then_render_my_awards(item, object)}
            </div>
        )
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

    get_then_render_my_awards(item, object){
        var message_items = this.get_convo_messages(object).concat(this.get_stacked_items(object))
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

    get_item_in_message_array(message_id, object_array){
        var object = object_array.find(x => x['message_id'] === message_id);
        return object
    }


    is_sender_in_blocked_accounts(item, object){
        var value = false
        var blocked_account_obj = this.get_all_sorted_objects(this.props.app_state.blocked_accounts)
        var blocked_accounts = []
        blocked_account_obj.forEach(account => {
            if(!blocked_accounts.includes(account['id'])){
                blocked_accounts.push(account['id'])
            }
        });

        const sender = object['author']
        const sender_e5 = object['e5']
        if(this.props.app_state.post_censored_data[sender+sender_e5] != null){
            var censor_data = this.props.app_state.post_censored_data[sender+sender_e5]
            blocked_accounts = blocked_accounts.concat(censor_data['blocked_contacts'])
        }

        if(blocked_accounts.includes(item['sender'])){
            value = true
        }
        if(this.props.app_state.blocked_accounts_data.includes(item['sender']+item['sender_e5'])){
            value = true;
        }
        if(this.state.visible_hidden_messages.includes(item['message_id'])){
            value = false
        }

        return value
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
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        if(item['sender'] == this.props.app_state.user_account_id[item['sender_e5']]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[item['sender']] == null ? item['sender'] : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[item['sender']])
            if(object['event'].returnValues.p5 == item['sender']){
                alias = alias+' • '+this.props.app_state.loc['2064c']/* 'Creator' */
            }
            return alias
        }
    }

    format_message(message){
        if(message == ''){
            return '...'
        }
        return message
    }

    get_convo_messages(object){
        const chain_messages = this.props.app_state.object_messages[object['e5_id']] == null ? [] : this.props.app_state.object_messages[object['e5_id']]
        const socket_messages = this.props.app_state.socket_object_messages[object['e5_id']] == null ? [] : this.props.app_state.socket_object_messages[object['e5_id']]
        const all_messages = this.sortByAttributeDescending(chain_messages.concat(socket_messages), 'time')
        
        return this.filter_messages_for_blocked_accounts(all_messages)
    }

    filter_messages_for_blocked_accounts(objects){
        var blocked_account_obj = this.get_all_sorted_objects(this.props.app_state.blocked_accounts)
        var blocked_accounts = []
        blocked_account_obj.forEach(account => {
            var e5_id = account['id']+account['e5']
            if(!blocked_accounts.includes(e5_id)){
                blocked_accounts.push(e5_id)
            }
        });
        var filtered_objects = [];
        objects.forEach(object => {
            var e5_id = object['sender']+object['e5']
            if(!blocked_accounts.includes(e5_id)){
                filtered_objects.push(object)
            }
        })

        if(this.props.app_state.masked_content == 'hide'){
            return filtered_objects
        }
        return objects;
    }

    get_stacked_items(object){
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        var convo_id = object['id']

        var stack = this.props.app_state.stack_items
        var stacked_items = []
        for(var i=0; i<stack.length; i++){
            if(stack[i].type == this.props.app_state.loc['1514']/* 'job-messages' */){
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
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        return this.state.focused_message[object['id']]
    }





    render_image_picker(){
        return(
            <div>
                <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                    <img src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                    <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept ="image/*" onChange ={this.when_image_gif_picked.bind(this)} />
                </div>
            </div>
        )
    }

    /* called when images have been picked from picker */
    when_image_gif_picked = (e) => {
        if(e.target.files && e.target.files[0]){
            for(var i = 0; i < e.target.files.length; i++){ 
                let reader = new FileReader();
                reader.onload = function(ev){
                    var image = ev.target.result
                    this.add_image_to_stack(image)
                }.bind(this);
                reader.readAsDataURL(e.target.files[i]);
            }
            // var image = e.target.files.length == 1 ? 'image has' : 'images have';
            // this.props.notify('Your selected '+e.target.files.length+image+' been staged.',500);
        }
    }

    when_entered_text_input_field_changed(text){
        if(text.length > this.props.app_state.max_input_text_length){
            var object =  this.get_item_in_array(this.get_job_items(), this.props.selected_job_post_item);
            this.show_add_comment_bottomsheet(object)
        }else{
            this.setState({entered_text: text})
        }
    }

    add_message_to_stack(object){
        var message = this.state.entered_text.trim()
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        var message_id = Date.now()
        var focused_message_id = this.get_focused_message(object) != null ? this.get_focused_message(object)['message_id'] : 0
        if(message == ''){
            this.props.notify(this.props.app_state.loc['1695']/* 'Type something first.' */, 4600)
        }
        else if(this.props.app_state.user_account_id[this.props.app_state.selected_e5] == 1){
            this.props.notify(this.props.app_state.loc['1696']/* 'You need to make at least 1 transaction to participate.' */, 5200)
        }
        else{
            var tx = {'id':object['id'], type:'message', entered_indexing_tags:['send', 'message'], 'message':message, 'sender':this.props.app_state.user_account_id[this.props.app_state.selected_e5], 'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id, 'e5':object['e5'], 'sender_e5':this.props.app_state.selected_e5, 'lan':this.props.app_state.device_language, 'markdown':''}

            this.props.add_job_message_to_stack_object(tx)

            this.setState({entered_text:'', text_input_field_height: 30})
            // this.props.notify(this.props.app_state.loc['1697']/* 'Message added to stack.' */, 1600)
            
            if (this.messagesEnd.current){
                this.messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }

    add_image_to_stack(image){
        var object = this.get_job_items()[this.props.selected_job_post_item];
        if(this.props.app_state.user_account_id[object['e5']] == 1){
            this.props.notify('you need to make at least 1 transaction to participate', 1200)
            return
        }
        var message_id = Date.now()
        var focused_message_id = this.get_focused_message() != null ? this.get_focused_message()['message_id'] : 0
        var message = this.state.entered_text.trim()
        var object = this.get_job_items()[this.props.selected_job_post_item];

        var tx = {'id':object['id'], type:'image', 'message': message, entered_indexing_tags:['send', 'image'], 'image-data':{'images':[image],'pos':0}, 'sender':this.props.app_state.user_account_id[object['e5']],'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id, 'e5':object['e5']}

        this.props.add_job_message_to_stack_object(tx)

        this.setState({entered_text:''})
        this.props.notify('message added to stack', 600)

        if (this.messagesEnd.current){
            this.messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }


    render_focus_list(object){
        // var object = this.get_job_items()[this.props.selected_job_post_item];
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
        // var object = this.get_job_items()[this.props.selected_job_post_item];

        var new_array = []
        for(var i=0; i<=pos; i++){
            new_array.push(clone['tree'][object['id']][i])
        }
        clone[object['id']] = item
        clone['tree'][object['id']] = new_array
        
        this.setState({focused_message: clone})
    }




    render_all_comments(object, middle){
        var sorted_messages_in_tree = this.get_message_replies_in_sorted_object(object)
        const items = sorted_messages_in_tree.children.map((item, index) => {
            return item
        })
        return(
            <div style={{/* 'display': 'flex', 'flex-direction': 'column-reverse' */}}>
                <Virtuoso
                    ref={(el) => (this.virtuoso_list = el)}
                    style={{ height: middle }}
                    initialTopMostItemIndex={0}
                    totalCount={items.length}
                    itemContent={(index) => {
                        const item = items[index]
                        return (
                            <div>
                                <AnimatePresence initial={true} mode="popLayout">
                                    <motion.div key={item['message_id']} initial={{ opacity: 0, scale:0.95 }} animate={{ opacity: 1, scale:1 }} exit={{ opacity: 0, scale:0.95 }} layout={true} transition={{ duration: 0.3 }} style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                        <div>
                                            {this.render_main_comment(item, 0, object)}
                                            <div style={{height:3}}/>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        );
                    }}
                />
                {/* {sorted_messages_in_tree.children.map((item, index) => (
                    <li style={{'padding': '1px 5px 0px 5px'}} onClick={()=>console.log()}>
                        <div>
                            {this.render_main_comment(item, 0, object)}
                            <div style={{height:3}}/>
                        </div>
                    </li>
                ))}     */}
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










    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var size = this.props.screensize
        var width = size == 'm' ? this.props.app_state.width/2 : this.props.app_state.width
        var uploaded_data = {}
        if(item_id == '3' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12')uploaded_data = this.props.app_state.uploaded_data

        var censor_list = this.props.app_state.censored_keyword_phrases.concat(this.props.app_state.censored_keywords_by_my_following)
        return(
            <div>
                <ViewGroups show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme}  width={width} show_images={this.props.show_images.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} censored_keyword_phrases={censor_list} select_deselect_tag={this.props.select_deselect_tag.bind(this)}/>
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

    format_account_balance_figure_minimized(amount){
        if(amount == null){
            amount = 0;
        }
        if(amount < 1_000_000){
            return number_with_commas(amount.toString())
        }else{
            var power = amount.toString().length - 6
            return number_with_commas(amount.toString().substring(0, 6)) +'e'+power
        }
        
    }

    /* gets a formatted time diffrence from now to a given time */
    // get_time_difference(time){
    //     var number_date = Math.round(parseInt(time));
    //     var now = Math.round(new Date().getTime()/1000);

    //     var diff = now - number_date;
    //     return this.get_time_diff(diff)
    // }

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
    }


}




export default JobDetailsSection;