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
import EndImg from './../assets/end_token_icon.png';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import Linkify from "linkify-react";
import { motion, AnimatePresence } from "framer-motion";
import words from 'profane-words'
import * as naughtyWords from 'naughty-words';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ViewPager, Frame, Track, View } from 'react-view-pager'

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

class NitroDetailsSection extends Component {
    
    state = {
        selected: 0, navigate_view_post_list_detail_tags_object: this.get_navigate_view_post_list_detail_tags_object_tags(), focused_message:{'tree':{}}, comment_structure_tags: this.get_comment_structure_tags(), hidden_message_children_array:[], visible_hidden_messages:[], memory_stats_chart_tags_object: this.memory_stats_chart_tags_object(), request_stats_chart_tags_object:this.request_stats_chart_tags_object(),
    };

    reset_tags(){
        this.setState({navigate_view_post_list_detail_tags_object: this.get_navigate_view_post_list_detail_tags_object_tags()})
    }

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

    memory_stats_chart_tags_object(){
        return{
            'i':{
                active:'e',
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['c2527ci']/* 'consumed-rom' */, this.props.app_state.loc['c2527cj']/* 'rss' */, this.props.app_state.loc['c2527ck']/* 'heap-total' */, this.props.app_state.loc['c2527cl']/* 'heap-used' */, this.props.app_state.loc['c2527cm']/* 'external' */, this.props.app_state.loc['c2527cn']/* 'free_ram' */, this.props.app_state.loc['c2527co']/* 'data-sent' */, this.props.app_state.loc['c2527cp']/* 'data-received' */], [1]
            ],
        };
    }

    request_stats_chart_tags_object(){
        return{
            'i':{
                active:'e',
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['c2527cr']/* '/events' */, this.props.app_state.loc['c2527cs']/* '/data' */, this.props.app_state.loc['c2527ct']/* '/tags' */, this.props.app_state.loc['c2527cu']/* '/marco' */, this.props.app_state.loc['c2527cv']/* '/traffic_stats' */, this.props.app_state.loc['c2527cw']/* '/trends' */, this.props.app_state.loc['c2527cx']/* '/reserve_upload' */, this.props.app_state.loc['c2527cy']/* '/upload' */, this.props.app_state.loc['c2527cz']/* '/account_storage_data' */, this.props.app_state.loc['c2527da']/* '/stream_file' */, this.props.app_state.loc['c2527db']/* '/store_data' */, this.props.app_state.loc['c2527dc']/* '/streams' */, this.props.app_state.loc['c2527dd']/* '/itransfers' */, this.props.app_state.loc['c2527de']/* '/bill_payments' */, this.props.app_state.loc['c2527df']/* '/subscription' */, this.props.app_state.loc['c2527dg']/* '/count_votes' */, this.props.app_state.loc['c2527dh']/* '/subscription_income_stream_datapoints' */, this.props.app_state.loc['c2527di']/* '/creator_group_payouts' */, this.props.app_state.loc['c2527dj']/* '/delete_files' */, this.props.app_state.loc['c2527dn']/* '/token_price' */], [1]
            ],
        };
    }

    get_navigate_view_post_list_detail_tags_object_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e',this.props.app_state.loc['2028']/* 'metadata' */,this.props.app_state.loc['a2527a']/* 'comments' */,this.props.app_state.loc['c2527ds']/* 'logs 🗃️' */, this.props.app_state.loc['c2527eb']/* 'reorgs 🔀' */],[1]
          ],
        }
    }



    componentDidMount() {
        this.interval = setInterval(() => this.check_for_new_responses_and_messages(), this.props.app_state.details_section_syncy_time);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    check_for_new_responses_and_messages() {
        if(this.props.selected_video_item != null){
            var object = this.get_item_in_array(this.get_nitro_items(), this.props.selected_nitro_item);

            if(object == null || object['ipfs'] == null) return;
            this.props.get_objects_messages(object['id'], object['e5'])
            this.props.load_nitro_node_details(object, true)
            this.props.load_my_account_storage_info(object)
            this.props.get_nitro_purchases(object)
        }
    }




    render(){
        return(
            <div>
                {this.render_posts_list_detail()}
            </div>
        )
    }

    render_posts_list_detail(){
        var object = this.get_item_in_array(this.get_nitro_items(), this.props.selected_nitro_item);
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
                        <Tags ref={c => this.bottom_tags = c} font={this.props.app_state.font} page_tags_object={this.state.navigate_view_post_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_post_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
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
                <div key={selected_item}>
                    {this.render_empty_detail_object()}
                </div>
            )
        }
        if(this.props.screensize != 'l'){
            return this.render_post_list_group_if_touch_screen(object)
        }
        if(selected_item ==this.props.app_state.loc['2028']/*  'metadata' */){
            return(
                <div key={selected_item}>
                    {this.render_post_main_details_section(object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['a2527a']/* 'comments' */){
            return(
                <div key={selected_item}>
                    {this.render_post_responses(object)}
                </div>
            )  
        }
        else if(selected_item == this.props.app_state.loc['c2527ds']/* 'logs 🗃️' */){
            return(
                <div key={selected_item}>
                    {this.render_nitro_error_logs(object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['c2527eb']/* 'reorgs 🔀' */){
            return(
                <div key={selected_item}>
                    {this.render_nitro_reorg_logs(object)}
                </div>
            )
        }
    }

    render_post_list_group_if_touch_screen(object){
        var pos = this.state.navigate_view_post_list_detail_tags_object['e'][2][0] - 1
        const handle_change = (value) => {
            const tag_name = this.state.navigate_view_post_list_detail_tags_object['e'][1][value+1]
            const current_tag_group = this.state.navigate_view_post_list_detail_tags_object['i'].active 
            const first_tag = this.state.navigate_view_post_list_detail_tags_object[current_tag_group][1][0]
            
            const clone = structuredClone(this.state.navigate_view_post_list_detail_tags_object)
            const tag_object_clone = this.bottom_tags.when_tag_button_clicked(0, first_tag, true, clone)
            const tag_object_clone2 = this.bottom_tags.when_tag_button_clicked(value+1, tag_name, true, tag_object_clone)
            var me = this;
            setTimeout(function() {
                me.setState({navigate_view_post_list_detail_tags_object: tag_object_clone2})
            }, (1 * 200));
        }
        return(
            <div>
                <ViewPager tag="main">
                    <Frame className="frame">
                        <Track ref={c => this.track = c} viewsToShow={1} currentView={pos} onViewChange={(e) => handle_change(parseInt(e))} className="track">
                            <View className="view">
                                <div>
                                    {this.render_post_main_details_section(object)}
                                </div>
                            </View>
                            <View className="view">
                                <div>
                                    {this.render_post_responses(object)}
                                </div>
                            </View>
                            <View className="view">
                                <div>
                                    {this.render_nitro_error_logs(object)}
                                </div>
                            </View>
                            <View className="view">
                                <div>
                                    {this.render_nitro_reorg_logs(object)}
                                </div>
                            </View>
                        </Track>
                    </Frame>
                </ViewPager>
            </div>
        )
        
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
                    {this.render_detail_item('7', item['banner-icon'])}
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div onClick={() => this.copy_id_to_clipboard(object)}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{height: 10}}/>
                    {this.show_moderator_note_if_any(object)}
                    {/* {this.render_post_state(object)} */}

                    <div onClick={() => this.add_to_contacts2(object)}>
                        {this.render_detail_item('3', {'title':''+this.get_senders_name(object['event'].returnValues.p5, object), 'details':this.props.app_state.loc['a2527g']/* 'Poster' */, 'size':'l'})}
                    </div>
                    <div style={{height: 10}}/>

                    {this.render_taken_down_message_if_post_is_down(object)}
                    {this.render_comment_section_disabled(object)}
                    
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['age'])}
                    </div>

                    <div style={{height: 10}}/>
                    {this.render_nitro_node_details(object)}
                    
                    <div style={{height: 10}}/>
                    {this.render_node_account_storage_details(object)}
                    

                    {this.render_detail_item('0')}
                    {this.render_item_data(items, object)}
                    {this.render_item_images(object)}
                    {this.render_pdf_files_if_any(object)}
                    {this.render_zip_files_if_any(object)}
                    
                    <div style={{height: 10}}/>
                    {this.render_markdown_if_any(object)}


                    {/* {this.render_detail_item('3', item['reply_count'])}
                    <div style={{height: 10}}/> */}

                    {this.render_memory_stats(object)}

                    {this.render_requests_stats(object)}


                    {this.render_view_access_info(object)}

                    {this.render_edit_object_button(object)}

                    {this.render_pin_post_button(object)}

                    {this.render_buy_storage_button(object)}

                    {this.render_configure_nitro_node(object)}

                    {this.render_subscribe_to_nitro_button(object)}
                    
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
        return;
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
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null  || this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']] == null) return
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
                {this.render_detail_item('8', {'details':title,'title':details, 'size':'s', 'image':thumbnail, 'border_radius':'15%'})}
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
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['c2527a']/* 'Pin the Audiopost to  your feed.' */, 'title':this.props.app_state.loc['c2527b']/* 'Pin Nitropost' */})}
                <div style={{height:10}}/>
                <div onClick={()=> this.when_pin_post_clicked(object)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['c2527c']/* 'Pin/Unpin Nitropost' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_pin_post_clicked(object){
        this.props.pin_nitro(object)
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


    get_nitro_items(){
        return this.props.get_nitro_items('')
    }


    get_post_details_data(object){
        var tags = object['ipfs'] == null ? ['Nitropost'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Nitropost ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var number_of_replies = this.get_convo_messages(object).length
        var default_image = EndImg
        var image = object['ipfs'] == null ? default_image : (object['ipfs'].album_art == null ? default_image : object['ipfs'].album_art)

        const is_socket_job = object['ipfs'].get_chain_or_indexer_job_object != null ? this.get_selected_item2(object['ipfs'].get_chain_or_indexer_job_object, 'e') == 1 : false

        const title_image = is_socket_job == true ? (this.props.app_state.nitro_album_art[object['event']['nitro_e5_id']] == null ? this.props.app_state.static_assets['empty_image'] : this.props.app_state.nitro_album_art[object['event']['nitro_e5_id']]) : this.props.app_state.e5s[object['e5']].e5_img

        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags,'when_tapped':'select_deselect_tag'},
            'id':{'title':'• '+number_with_commas(object['id']), 'details':title, 'size':'l', 'title_image':title_image, 'border_radius':'0%', 'text_image_border_radius':'6px'},
            
            'age':{'style':'l', 'title':this.props.app_state.loc['1744']/* 'Block Number' */, 'subtitle':this.props.app_state.loc['2494']/* 'age' */, 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)} `+this.props.app_state.loc['2495']/* ago */, },
            
            'reply_count':{'title':`${number_with_commas(number_of_replies)}`, 'details': this.props.app_state.loc['2815']/* 'Number of Replies.' */, 'size':'l'},

            'banner-icon':{'header':'', 'subtitle':'', 'image':image, 'height':'auto'},
        }
    }

    render_edit_object_button(object){
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if(object['event'].returnValues.p5 == my_account){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['c2527d']/* Edit Indexed Nitropost' */, 'details':this.props.app_state.loc['c2527e']/* 'Change the basic details for your Indexed Nitropost' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_basic_edit_object_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2520']/* 'Perform Action' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    open_basic_edit_object_ui(object){
        this.props.open_edit_object('12', object)
    }

    render_view_access_info(object){
        const my_account = this.props.app_state.user_account_id[object['e5']]
        const telemetry_data = this.props.app_state.nitro_telemetry_data_object[object['e5_id']]
        const node_details = this.props.app_state.nitro_node_details[object['e5_id']]

        if(object['event'].returnValues.p5 == my_account && telemetry_data != null && telemetry_data['access_info'] != null && telemetry_data['access_info'] != '' && node_details != null && node_details != 'unavailable' && node_details['platform'] == 'linux'){
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['c2527do']/* Veiw Access Logs' */, 'details':this.props.app_state.loc['c2527dp']/* 'Veiw the access logs for any logins made through ssh or directly.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_view_access_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2520']/* 'Perform Action' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    open_view_access_ui(object){
        this.props.show_dialog_bottomsheet({'object':object}, 'view_access_logs')
    }

    render_subscribe_to_nitro_button(object){
        var node_details = this.props.app_state.nitro_node_details[object['e5_id']]
        if(object['bought'] == true && node_details != null && node_details != 'unavailable'){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['c2527br']/* Connect with Node.' */, 'details':this.props.app_state.loc['c2527bs']/* 'Load all your content via this node.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.props.connect_to_node(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2520']/* 'Perform Action' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }



    render_nitro_node_details(object){
        var node_details = this.props.app_state.nitro_node_details[object['e5_id']]
        if(node_details == null){
            return(
                <div>
                    {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['c2527f']/* 'Loading Node Details...' */})}
                </div>
            )
        }
        else if(node_details == 'unavailable'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['c2527g']/* 'Node Unavailable.' */, 'details':this.props.app_state.loc['c2527h']/* 'The node is unavailable or down.' */, 'size':'l'})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['c2527j']/* 'Online.' */, 'details':this.props.app_state.loc['c2527i']/* 'Status' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':node_details['booted'].toString(), 'details':this.props.app_state.loc['c2527k']/* 'Booted' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_version_if_available(node_details)}
                    
                    {this.render_detail_item('3', {'title':''+(new Date(node_details['start_up_time']).toLocaleString()), 'details':this.props.app_state.loc['c2527l']/* 'Start Up Time' */, 'size':'l'})}
                    

                    {this.render_nitro_private_details(node_details, object)}

                    {this.render_nitro_storage_details_if_set(node_details)}

                </div>
            )
        }
    }

    render_version_if_available(node_details){
        if(node_details['version'] == null) return;
        return(
            <div>
                {this.render_detail_item('3', {'title':node_details['version'], 'details':this.props.app_state.loc['c2527bv']/* 'Nitro Version.' */, 'size':'l'})}
                <div style={{height:10}}/>
                
            </div>
        )
    }

    render_nitro_private_details(node_details, object){
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if(my_account == object['author']){
            return(
                <div>
                    {this.render_detail_item('0')}
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['c2527bw']/* 'Total Main Memory.' */, 'subtitle':this.format_power_figure(node_details['total_ram']), 'barwidth':this.get_number_width(node_details['total_ram']), 'number':`${number_with_commas(node_details['total_ram'].toFixed(3))}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['c2527p']/* Mbs */, })}
                    </div>
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':node_details['platform'], 'details':this.props.app_state.loc['c2527bx']/* 'Platform.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':node_details['auto_certificte_renewal_enabled'] != true ? this.props.app_state.loc['90']/* 'disabled' */ : this.props.app_state.loc['89']/* 'enabled' */, 'details':this.props.app_state.loc['c2527by']/* 'Auto Https Certificate Renewal.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':node_details['endpoint_updates_enabled'] != true ? this.props.app_state.loc['90']/* 'disabled' */ : this.props.app_state.loc['89']/* 'enabled' */, 'details':this.props.app_state.loc['c2527bz']/* 'Endpoints Update Enabled.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title': ''+(new Date(node_details['certificate_expiry_time']).toLocaleString()), 'details':this.props.app_state.loc['c2527ca']/* 'Https Certificate Expiry Time.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':node_details['network_interface'], 'details':this.props.app_state.loc['c2527cd']/* 'Active Network Interface.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                </div>
            )
        }
    }


    render_nitro_storage_details_if_set(node_details){
        if(node_details['max_buyable_capacity'] == 0){
            return(
                <div>
                    {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['c2527m']/* 'Node Storage Service Offline.' */})}
                </div>
            )
        }else{
            var ipfs_hashes = node_details['ipfs_hashes'].includes('out of') ? node_details['ipfs_hashes'].split(' ')[0] : node_details['ipfs_hashes']
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':number_with_commas(node_details['total_files_stored']), 'details':this.props.app_state.loc['c2527bf']/* 'Total Files Stored' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['c2527bg']/* 'Total Space Utilized' */, 'subtitle':this.format_power_figure(node_details['total_space_utilized']), 'barwidth':this.get_number_width(node_details['total_space_utilized']), 'number':`${number_with_commas(node_details['total_space_utilized'].toFixed(3))}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['c2527p']/* Mbs */, })}
                    </div>
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':number_with_commas(node_details['storage_accounts']), 'details':this.props.app_state.loc['c2527q']/* 'Accounts Served.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':this.get_senders_name2(node_details['target_storage_purchase_recipient_account'], node_details['target_account_e5']), 'details':this.props.app_state.loc['c2527n']/* 'Storage Purchase Recipient' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['c2527o']/* 'Storage Purchase Limit.' */, 'subtitle':this.format_power_figure(node_details['max_buyable_capacity']), 'barwidth':this.get_number_width(node_details['max_buyable_capacity']), 'number':`${number_with_commas(node_details['max_buyable_capacity'])}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['c2527p']/* Mbs */, })}
                    </div>
                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['3054dl']/* 'Default Free Storage' */, 'subtitle':this.format_power_figure(node_details['free_default_storage']), 'barwidth':this.get_number_width(node_details['free_default_storage']), 'number':`${number_with_commas(node_details['free_default_storage'])}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['c2527p']/* Mbs */, })}
                    </div>
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':ipfs_hashes, 'details':this.props.app_state.loc['c2527r']/* 'Tracked Hashes.' */, 'size':'l'})}
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['c2527s']/* 'Tracked E5s.' */, 'details':this.props.app_state.loc['c2527ce']/* 'Below are the E5s tracked by the node.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.load_preferred_e5_ui(node_details['tracked_E5s'])}
                    
                    {this.render_space_unit_or_default(node_details)}
                    <div style={{height:10}}/>
                    {this.render_streaming_fees_if_any(node_details)}
                    {this.render_price_per_megabyte_data(node_details)}
                </div>
            )
        }
    }

    render_price_per_megabyte_data(node_details){
        var price_data = node_details['price_per_megabyte'][this.props.app_state.selected_e5]
        if(price_data != null){
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['c2527cf']/* 'Storage Price.' */, 'details':this.props.app_state.loc['c2527t']/* 'Below is the price per megabyte of storage on the indexer.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_price_amounts(price_data, this.props.app_state.selected_e5)}
                </div>
            )
        }
    }

    render_space_unit_or_default(node_details){
        const space_unit_size = node_details['target_storage_space_unit_denomination_multiplier'] || 1
        return(
            <div>
                {this.render_detail_item('0')}
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['3054ed']/* 'Space Unit size.' */, 'subtitle':this.format_power_figure(space_unit_size), 'barwidth':this.get_number_width(space_unit_size), 'number':`${this.format_account_balance_figure(space_unit_size)}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['c2527p']/* Mbs */, })}
                </div>
            </div>
        )
    }

    render_streaming_fees_if_any(node_details){
        const streaming_multiplier = node_details['target_storage_streaming_multiplier']
        if(streaming_multiplier == null || streaming_multiplier == 0) return;

        const details = this.props.app_state.loc['c2527dy']/* 'The prices listed below are also charged for every $ streams, for every space unit consumed by your files in this node.' */.replace('$', number_with_commas(streaming_multiplier))
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['c2527dx']/* 'Steaming Charges Enabled.' */, 'details':details, 'size':'l'})}
                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['3054eh']/* 'Streaming Multiplier' */, 'subtitle':this.format_power_figure(streaming_multiplier), 'barwidth':this.get_number_width(streaming_multiplier), 'number':`${this.format_account_balance_figure(streaming_multiplier)}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['3054ei']/* Multiplier Units */, })}
                </div>
            </div>
        )
    }


    get_senders_name2(sender, e5){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    load_preferred_e5_ui(items){
        if(items.length == 0){
            var items2 = [1,1,1]
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items2.map(() => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_empty_horizontal_list_item()}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_e5_item(item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_e5_item(item){
        var image = this.props.app_state.e5s[item].e5_img
        var details = this.props.app_state.e5s[item].token
        return(
            <div>
                {this.render_detail_item('12', {'title':item, 'image':image, 'details':details, 'size':'s'})}
            </div>
        )
    }

    render_empty_horizontal_list_item(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div style={{'padding':'0px 0px 0px 0px'}}>
                <div style={{height:54, width:85, 'background-color': background_color, 'border-radius': '8px','padding':'10px','margin':'0px 0px 0px 0px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                    </div>
                </div>
            </div>
        )
    }




    render_price_amounts(price_data, e5){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var prices = []
        price_data.forEach(item => {
            prices.push({'exchange':parseInt(item['exchange']),'amount': bigInt(item['amount']) })
        });
        var items = [].concat(prices)
        if(items.length == 0){
            items = [0, 1, 2]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['view_group_card_item_background'], 'border-radius': '15px','padding':'10px 0px 10px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
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
        return(
            <div style={{}}>
                {items.map((item, index) => (
                    <div style={{'padding': '2px 0px 2px 0px'}}>
                        <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item['exchange']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['exchange']]})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item['exchange']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['exchange']], })}
                        </div>
                    </div>
                ))}
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






    render_node_account_storage_details(object){
        var node_details = this.props.app_state.nitro_node_storage_payment_info[object['e5_id']]
        if(node_details == null){
            return(
                <div>
                    {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['c2527u']/* 'Loading Your Storage Info...' */})}
                </div>
            )
        }
        else if(node_details == 'unavailable'){
            return(
                <div>
                    {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['c2527v']/* 'Your account doesnt exist in the node.' */})}
                </div>
            )
        }
        else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.format_account_balance_figure(node_details['acquired_space'])+' Mbs', 'details':this.props.app_state.loc['c2527y']/* 'Acquired Space.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':this.round_off(node_details['utilized_space'])+' Mbs', 'details':this.props.app_state.loc['c2527z']/* 'Utilized Space.' */, 'size':'l'})}

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['c2527w']/* 'Files Stored.' */, 'subtitle':this.format_power_figure(node_details['files']), 'barwidth':this.get_number_width(node_details['files']), 'number':`${number_with_commas(node_details['files'])}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['c2527x']/* files */, })}
                    </div>
                </div>
            )
        }
    }

    round_off(number){
        return (Math.round(number * 100) / 100)
    }




    render_buy_storage_button(object){
        var node_details = this.props.app_state.nitro_node_details[object['e5_id']]
        var purchase_history = this.props.app_state.current_nitro_purchases[object['e5_id']]
        var last_purchase_time = 0
        if(purchase_history != null && purchase_history.length > 0){
            const last_event = purchase_history[purchase_history.length - 1]
            last_purchase_time = last_event.returnValues.p6/* timestamp */
        }
        if(
            node_details != null && 
            node_details != 'unavailable' && 
            node_details['max_buyable_capacity'] !== 0 && 
            node_details['price_per_megabyte'] != null && 
            node_details['price_per_megabyte'][this.props.app_state.selected_e5] != null &&
            purchase_history != null &&
            (Date.now()/1000) - last_purchase_time > (200)
        ){
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['c2527ba']/* 'Buy storage' */, 'details':this.props.app_state.loc['c2527bb']/* 'Acquire storage from the provider in their respective node.' */})}
                    <div style={{height:10}}/>
                    <div onClick={()=> this.buy_storage(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['c2527ba']/* 'Buy Storage' */, 'action':''},)}
                    </div>
                </div>
            )
        }
    }

    buy_storage(object){
        this.props.show_buy_nitro_storage_bottomsheet(object)
    }



    render_configure_nitro_node(object){
        var node_details = this.props.app_state.nitro_node_details[object['e5_id']]
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if(node_details != null && node_details !== 'unavailable' && object['event'].returnValues.p5 == my_account && this.props.app_state.has_wallet_been_set == true){
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['c2527bc']/* 'Configure Node.' */, 'details':this.props.app_state.loc['c2527bd']/* 'Configure your nitro node directly from E5.' */})}
                    <div style={{height:10}}/>
                    <div onClick={()=> this.configure_node(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['c2527be']/* 'configure' */, 'action':''},)}
                    </div>
                </div>
            )
        }
    }

    configure_node(object){
        this.props.show_configure_nitro_node_bottomsheet(object)
    }






    render_memory_stats(object){
        const telemetry_data = this.props.app_state.nitro_telemetry_data_object[object['e5_id']]
        if(telemetry_data != null){
            const memory_stats_data = telemetry_data['memory_stats']
            const data_points_data = this.get_memory_stats_data_points(memory_stats_data, object)
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['c2527cg']/* 'Node Memory Stats.' */, 'details':this.props.app_state.loc['c2527ch']/* 'Chart containing the memory usage of your indexer node over the last 24hrs.' */, 'size':'l'})}
                    <div style={{height: 10}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.memory_stats_chart_tags_object} tag_size={'l'} when_tags_updated={this.when_memory_stats_chart_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':data_points_data.dps, 'start_time': data_points_data.starting_time, 'interval':110, 'end_time':data_points_data.ending_time, /* 'hide_label': true */})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['c2527cq']/* 'Y-Axis: ' */+this.capitalize_first(this.get_selected_item(this.state.memory_stats_chart_tags_object, 'e')), 'details':this.props.app_state.loc['2391']/* 'X-Axis: Time' */, 'size':'s'})}
                </div>
            )
        }
    }

    capitalize_first(str) {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    when_memory_stats_chart_tags_object_updated(tag_obj){
        this.setState({memory_stats_chart_tags_object: tag_obj})   
    }

    get_memory_stats_data_points(memory_stats_data, object){
        var data = []
        const data_point = this.get_selected_memory_stat_position()
        var timestamp_datapoints = Object.keys(memory_stats_data)
        const start_time = Date.now() - (1000*60*60*24)
        if(start_time - timestamp_datapoints[0] > (1000*60*5)){
            var diff = start_time - timestamp_datapoints[0]
            for(var t=0; t<diff; t+=2300){
                data.push(0);    
            }
        }
        for(var i=0; i<timestamp_datapoints.length; i++){
            const focused_item = memory_stats_data[timestamp_datapoints[i]][data_point]
            data.push(focused_item)

            if(i==timestamp_datapoints.length-1){
                if(data.length > 100){
                    var diff = Date.now() - timestamp_datapoints[i]
                    for(var t=0; t<diff; t+=2300){
                        data.push(data[data.length-1]*0.999)     
                    }
                }
                
            }
            else{
                var diff = timestamp_datapoints[i+1] - timestamp_datapoints[i]
                for(var t=0; t<diff; t+=2300){
                    data.push(data[data.length-1]*0.999)      
                }
            }
        }


        var xVal = 1, yVal = 0, original_y_val = 0;
        var dps = [];
        var largest = 0;
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        for(var i = 0; i < noOfDps; i++) {
            if(i < 100 && data.length > 200){
                var sum = 0
                var slice = data.slice(factor * xVal, factor * (xVal+1))
                for(var j = 0; j < slice.length; j++) {
                    sum += slice[j]
                }
                var result = isNaN(parseInt(sum / slice.length)) ? 0 : parseInt(sum / slice.length)
                original_y_val = result;
                // yVal =  parseInt(bigInt(result).multiply(100).divide(largest))
                yVal = result
            }
            else{
                original_y_val = data[factor * xVal]
                // yVal = parseInt(bigInt(data[factor * xVal]).multiply(100).divide(largest))
                yVal = data[factor * xVal]
            }
            if(largest < yVal){
                largest = yVal
            }
            var indicator = this.get_selected_memory_stat_indicator(original_y_val)
            if(yVal != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0 && yVal != 0){
                    dps.push({x: xVal,y: yVal, indexLabel:""+indicator});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            } 
        }

        // for(var e=0; e<dps.length; e++){
        //     dps[e].y = (dps[e].y / largest) * 100
        //     if(e>97 && dps[e].y == 0){
        //         dps[e].y = dps[e-1].y
        //     }
        // }

        const chart_starting_time = timestamp_datapoints.length == 0 ? 1000*60*60*24 : timestamp_datapoints[0]

        const chart_ending_time = timestamp_datapoints.length == 0 ? Date.now() : timestamp_datapoints[timestamp_datapoints.length-1]

        return { dps, largest, starting_time: chart_starting_time, ending_time: chart_ending_time }
    }

    get_selected_memory_stat_position(){
        const obj = {}
        obj[this.props.app_state.loc['c2527ci']/* 'consumed-rom' */] = 1
        obj[this.props.app_state.loc['c2527cj']/* 'rss' */] = 3
        obj[this.props.app_state.loc['c2527ck']/* 'heap-total' */] = 4
        obj[this.props.app_state.loc['c2527cl']/* 'heap-used' */] = 5
        obj[this.props.app_state.loc['c2527cm']/* 'external' */] = 6
        obj[this.props.app_state.loc['c2527cn']/* 'free_ram' */] = 7
        obj[this.props.app_state.loc['c2527co']/* 'data-sent' */] = 8
        obj[this.props.app_state.loc['c2527cp']/* 'data-received' */] = 9

        return obj[this.get_selected_item(this.state.memory_stats_chart_tags_object, 'e')]
    }

    get_selected_memory_stat_indicator(data_point){
        const stat_item = this.get_selected_item(this.state.memory_stats_chart_tags_object, 'e')
        if(stat_item == this.props.app_state.loc['c2527ci']/* 'consumed-rom' */){
            return number_with_commas(data_point) +' '+ this.props.app_state.loc['c2527p']/* Mbs */
        }
        else {
            var val = (data_point / (1024 * 1024)).toFixed(2)
            if(val > 1000){
                val = val.toFixed(0)
                val = number_with_commas(val)
            }
            return val +' '+ this.props.app_state.loc['c2527p']/* Mbs */
        }
    }







    render_requests_stats(object){
        const telemetry_data = this.props.app_state.nitro_telemetry_data_object[object['e5_id']]
        if(telemetry_data != null){
            const request_stats_data = telemetry_data['request_stats']
            const data_points_data = this.get_request_stats_data_points(request_stats_data, object)
            
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['c2527dk']/* 'Node Endpoint Stats.' */, 'details':this.props.app_state.loc['c2527dl']/* 'Chart containing the request counts for each of your node\'s endpoints over the last 24hrs.' */, 'size':'l'})}
                    <div style={{height: 10}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.request_stats_chart_tags_object} tag_size={'l'} when_tags_updated={this.when_request_stats_chart_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':data_points_data.dps, 'start_time': data_points_data.starting_time, 'interval':110, 'end_time':data_points_data.ending_time, /* 'hide_label': true */})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['c2527cq']/* 'Y-Axis: ' */+this.get_selected_item(this.state.request_stats_chart_tags_object, 'e'), 'details':this.props.app_state.loc['2391']/* 'X-Axis: Time' */, 'size':'s'})}
                </div>
            )
        }
    }

    when_request_stats_chart_tags_object_updated(tag_obj){
        this.setState({request_stats_chart_tags_object: tag_obj})
    }

    get_request_stats_data_points(memory_stats_data, object){
        var data = []
        const data_point = this.get_selected_request_stat_position()
        var timestamp_datapoints = Object.keys(memory_stats_data)
        const start_time = Date.now() - (1000*60*60*24)
        if(start_time - timestamp_datapoints[0] > (1000*60*5)){
            var diff = start_time - timestamp_datapoints[0]
            for(var t=0; t<diff; t+=2300){
                data.push(0);    
            }
        }
        for(var i=0; i<timestamp_datapoints.length; i++){
            const focused_item = memory_stats_data[timestamp_datapoints[i]][data_point]
            data.push(focused_item)

            if(i==timestamp_datapoints.length-1){
                if(data.length > 100){
                    var diff = Date.now() - timestamp_datapoints[i]
                    for(var t=0; t<diff; t+=2300){
                        data.push(data[data.length-1]*0.999)      
                    }
                }
            }
            else{
                var diff = timestamp_datapoints[i+1] - timestamp_datapoints[i]
                for(var t=0; t<diff; t+=2300){
                    data.push(data[data.length-1]*0.999)      
                }
            }
        }



        var xVal = 1, yVal = 0, original_y_val = 0;
        var dps = [];
        var noOfDps = 100;
        var largest = 0;
        var factor = Math.round(data.length/noOfDps) +1;
        for(var i = 0; i < noOfDps; i++) {
            if(i < 100 && data.length > 200){
                var sum = 0
                var slice = data.slice(factor * xVal, factor * (xVal+1))
                for(var j = 0; j < slice.length; j++) {
                    sum += slice[j]
                }
                var result = isNaN(parseInt(sum / slice.length)) ? 0 : parseInt(sum / slice.length)
                original_y_val = result
                // yVal =  parseInt(bigInt(result).multiply(100).divide(largest))
                yVal = result
            }
            else{
                original_y_val = data[factor * xVal]
                // yVal = parseInt(bigInt(data[factor * xVal]).multiply(100).divide(largest))
                yVal = data[factor * xVal]
            }
            if(yVal > largest){
                largest = yVal
            }
            var indicator = number_with_commas(original_y_val)+' '+this.props.app_state.loc['c2527dm']/* requests */
            if(yVal != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0 && yVal != 0){
                    dps.push({x: xVal,y: yVal, indexLabel:""+indicator});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            } 
        }

        // for(var e=0; e<dps.length; e++){
        //     dps[e].y = (dps[e].y / largest) * 100
        //     if(e>97 && dps[e].y == 0){
        //         dps[e].y = dps[e-1].y
        //     }
        // }

        const chart_starting_time = timestamp_datapoints.length == 0 ? 1000*60*60*24 : timestamp_datapoints[0]

        const chart_ending_time = timestamp_datapoints.length == 0 ? Date.now() : timestamp_datapoints[timestamp_datapoints.length-1]

        return { dps, largest, starting_time: chart_starting_time, ending_time: chart_ending_time }
    }

    get_selected_request_stat_position(){
        const obj = {}
        obj[this.props.app_state.loc['c2527cr']/* '/events' */] = '/events' 
        obj[this.props.app_state.loc['c2527cs']/* '/data' */] = '/data'
        obj[this.props.app_state.loc['c2527ct']/* '/tags' */] = '/tags'
        obj[this.props.app_state.loc['c2527cu']/* '/marco' */] = '/marco'
        obj[this.props.app_state.loc['c2527cv']/* '/traffic_stats' */] = '/traffic_stats'
        obj[this.props.app_state.loc['c2527cw']/* '/trends' */] = '/trends'
        obj[this.props.app_state.loc['c2527cx']/* '/reserve_upload' */] = '/reserve_upload'
        obj[this.props.app_state.loc['c2527cy']/* '/upload' */] = '/upload'
        obj[this.props.app_state.loc['c2527cz']/* '/account_storage_data' */] = '/account_storage_data'
        obj[this.props.app_state.loc['c2527da']/* '/stream_file' */] = '/stream_file' 
        obj[this.props.app_state.loc['c2527db']/* '/store_data' */] = '/store_data'
        obj[this.props.app_state.loc['c2527dc']/* '/streams' */] = '/streams'
        obj[this.props.app_state.loc['c2527dd']/* '/itransfers' */] = '/itransfers'
        obj[this.props.app_state.loc['c2527de']/* '/bill_payments' */] = '/bill_payments'
        obj[this.props.app_state.loc['c2527df']/* '/subscription' */] = '/subscription'
        obj[this.props.app_state.loc['c2527dg']/* '/count_votes' */] = '/count_votes'
        obj[this.props.app_state.loc['c2527dh']/* '/subscription_income_stream_datapoints' */] = '/subscription_income_stream_datapoints'
        obj[this.props.app_state.loc['c2527di']/* '/creator_group_payouts' */] = '/creator_group_payouts'
        obj[this.props.app_state.loc['c2527dj']/* '/delete_files' */] = '/delete_files'

        return obj[this.get_selected_item(this.state.request_stats_chart_tags_object, 'e')]
    }










    render_nitro_error_logs(object){
        var he = this.props.height-47
        return(
            <div>
                <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px'}}>
                    <div style={{ 'overflow-y': 'auto', height: he, padding:'5px 0px 5px 0px'}}>
                        {this.render_error_logs_top_title(object)}
                        <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px'}}/>
                        {this.render_log_items(object)}
                    </div>
                </div>
            </div> 
        )
    }

    render_error_logs_top_title(object){
        return(
            <div style={{padding:'5px 5px 5px 5px'}}>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2524']/* 'In ' */+object['id'], 'details':this.props.app_state.loc['c2527dt']/* 'Log Files..' */, 'size':'l'})} 
            </div>
        )
    }

    render_log_items(object){
        var middle = this.props.height-150;
        const log_item_data = this.get_nitro_error_logs(object)
        var items = log_item_data.sorted_log_timestamps;

        const my_account = this.props.app_state.user_account_id[object['e5']]
        if(object['event'].returnValues.p5 != my_account){
            items = []
        }

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
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        <div>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}}>
                                    <div onClick={() => this.when_nitro_node_error_log_clicked(item, log_item_data.log_file_references, object)}>
                                        {this.render_detail_item('3', {'title':''+new Date(item).toLocaleString(), 'details':this.get_time_diff(Date.now()/1000 - item/1000), 'size':'l'})}
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

    get_nitro_error_logs(object){
        const telemetry_data = this.props.app_state.nitro_telemetry_data_object[object['e5_id']]
        if(telemetry_data == null){
            return { sorted_log_timestamps:[], log_file_references:{} }
        }
        const log_data = telemetry_data['files']['log_data']
        const log_timestamps = []
        const log_file_references = {}
        log_data.forEach((log_file, index) => {
            const untampered_log_file_name = log_file.slice();
            const log_file_id = log_file.replace('.log', '')
            const file_element_name = log_file_id.split(':')
            log_timestamps.push(parseInt(file_element_name[3]))
            log_file_references[file_element_name[3]] = untampered_log_file_name
        });
        const sorted_log_timestamps = log_timestamps.sort((a, b) => b - a)

        return { sorted_log_timestamps, log_file_references }
    }

    when_nitro_node_error_log_clicked(item, log_file_references, object){
        this.props.get_nitro_log_stream_data(object, log_file_references[item.toString()])
        this.props.show_dialog_bottomsheet({'object':object, 'file':log_file_references[item.toString()], 'time': item}, 'view_error_logs')
    }












    render_nitro_reorg_logs(object){
        var he = this.props.height-47
        return(
            <div>
                <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px'}}>
                    <div style={{ 'overflow-y': 'auto', height: he, padding:'5px 0px 5px 0px'}}>
                        {this.render_nitro_reorg_top_title(object)}
                        <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px'}}/>
                        <div style={{'padding':'0px 7px 0px 7px'}}>
                            {this.load_preferred_e5_ui2()}
                            <div style={{height: 10}}/>
                            {this.render_reorg_items(object)}
                        </div>
                    </div>
                </div>
            </div> 
        )
    }

    render_nitro_reorg_top_title(object){
        return(
            <div style={{padding:'5px 5px 5px 5px'}}>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2524']/* 'In ' */+object['id'], 'details':this.props.app_state.loc['c2527dz']/* 'Logged Reorgs.' */, 'size':'l'})}
            </div>
        )
    }

    load_active_e5s(){
        var active_e5s = []
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]
            if(this.props.app_state.e5s[e5].active == true){
                active_e5s.push(e5)
            }
        }
        return active_e5s
    }

    load_preferred_e5_ui2(){
        var items = this.load_active_e5s()
        var items2 = [0, 1]
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_e5_clicked2(item)}>
                            {this.render_e5_item2(item)}
                        </li>
                    ))}
                    {items2.map(() => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_empty_horizontal_list_item()}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_e5_item2(item){
        var image = this.props.app_state.e5s[item].e5_img
        var details = this.props.app_state.e5s[item].token
        const selected_item = this.state.selected_e5 || this.props.app_state.selected_e5
        if(selected_item == item){
            return(
                <div>
                    {this.render_detail_item('12', {'title':item, 'image':image,'details':details, 'size':'s'})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('12', {'title':item, 'image':image, 'details':details, 'size':'s'})}
                </div>
            )
        }
    }

    when_e5_clicked2(item){
        this.setState({selected_e5: item})
    }

    render_reorg_items(object){
        var middle = this.props.height-220;
        const log_item_data = this.get_nitro_reorg_logs(object)
        var items = log_item_data;

        // const my_account = this.props.app_state.user_account_id[object['e5']]
        // if(object['event'].returnValues.p5 != my_account){
        //     items = []
        // }

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
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        <div>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}}>
                                    <div>
                                        {this.render_detail_item('3', {'title':''+new Date(item['now']).toLocaleString()+ ' • '+this.get_time_diff(Date.now()/1000 - item['now']/1000), 'details':this.props.app_state.loc['c2527ea']/* 'Affected $ Blocks.' */.replace('$', number_with_commas(item['affected_blocks'])), 'size':'l'})}
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

    get_nitro_reorg_logs(object){
        const telemetry_data = this.props.app_state.nitro_telemetry_data_object[object['e5_id']]
        if(telemetry_data == null){
            return []
        }
        const selected_e5 = this.state.selected_e5 || this.props.app_state.selected_e5
        const e5_reorg_items = telemetry_data['reorgs'][selected_e5]
        if(e5_reorg_items == null){
            return []
        }

        return this.sortByAttributeDescending(e5_reorg_items['reorgs'], 'now')
    }
    










    render_post_responses(object){
        var he = this.props.height-100
        if(this.get_focused_message(object) != null) he = this.props.height-165
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
                    <div style={{'margin':`${side_buttons_margin_top}px 0px 0px 0px`}}>
                        <div>
                            <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}} onClick={()=> this.when_circle_clicked(object)}>
                                <img alt="" src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}}/>
                            </div>
                        </div>
                    </div>
                    <div style={{width:10}}/>
                    <div className="row" style={{width:ww}}>
                        <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                            <TextInput font={this.props.app_state.font} height={20} placeholder={this.props.app_state.loc['1039']/* 'Enter Message...' */} when_text_input_field_changed={this.when_entered_text_input_field_changed.bind(this)} when_text_input_field_height_changed={this.when_text_input_field_height_changed.bind(this)}  text={this.state.entered_text} theme={this.props.theme}/>
                        </div>
                        <div className="col-1" style={{'padding': '0px 10px 0px 0px'}}>
                            <div className="text-end" style={{'padding': '5px 0px 0px 0px', 'margin':`${side_buttons_margin_top}px 0px 0px 0px`}} >
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
        this.props.show_add_comment_bottomsheet(object, focused_message_id, 'nitro', null, this.state.entered_text)
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
                <div onScroll={event => this.handleScroll(event, object)} style={{overflow: 'scroll', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.render_messages(final_items, object)}
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
                                    {this.props.app_state.object_messages[object['e5_id']]  == null || this.props.app_state.socket_object_messages[object['e5_id']] == null ? this.render_small_skeleton_object() : this.render_small_empty_object()}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    <AnimatePresence initial={true} mode="popLayout">
                        {items.reverse().map((item, index) => (
                            <motion.li key={item['message_id']} initial={{ opacity: 0, scale:0.95 }} animate={{ opacity: 1, scale:1 }} exit={{ opacity: 0, scale:0.95 }} layout={true} transition={{ duration: 0.3 }} style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                <div>
                                    {this.render_message_as_focused_if_so(item, object)}
                                    <div style={{height:3}}/>
                                </div>
                            </motion.li>
                        ))} 
                    </AnimatePresence>   
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
                            action: () => this.props.delete_message_from_stack(item, this.props.app_state.loc['1593cu']/* 'nitro-messages' */)
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
        var word_wrap_value = this.longest_word_length(item['message']) > 53 ? 'break-all' : 'normal'
        var line_color = item['sender'] == this.props.app_state.user_account_id[item['sender_e5']] ? this.props.theme['secondary_text_color'] : this.props.theme['send_receive_ether_background_color']
        var text = this.format_message(item['message'], object)
        // const parts = text.split(/(\d+)/g);
        const parts = this.split_text(text);
        return(
            <div>
                <div style={{'background-color': line_color,'margin': '0px 0px 0px 0px','border-radius': '0px 0px 0px 0px'}}>
                    <div style={{'background-color': this.props.theme['send_receive_ether_background_color'],'margin': '0px 0px 0px 1px','border-radius': '0px 0px 0px 0px'}}>
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
                            {/* <p style={{'font-size': '8px','color': this.props.theme['primary_text_color'],'margin': '1px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'white-space': 'pre-line'}} className="fw-bold">{this.get_message_replies(item, object).length} {this.props.app_state.loc['1693']}</p> */}
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

    truncate(source, size) {
        var firstLine = source.includes("\n") ? source.split("\n")[0] : source;
        return firstLine.length > size ? firstLine.slice(0, size - 1) + "…" : firstLine;
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
        // var object = this.get_post_items()[this.props.selected_audio_item];
        if(item['sender'] == this.props.app_state.user_account_id[item['sender_e5']]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[item['sender']] == null ? item['sender'] : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[item['sender']])
            if(object['event'].returnValues.p5 == item['sender'] && !this.is_post_anonymous(object)){
                alias = alias+' • '+this.props.app_state.loc['2064c']/* 'Creator' */
            }
            return alias
        }
    }

    // get_all_sorted_objects_mappings(object){
    //     var all_objects = {}
    //     for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
    //         var e5 = this.props.app_state.e5s['data'][i]
    //         var e5_objects = object[e5]
    //         var all_objects_clone = structuredClone(all_objects)
    //         all_objects = { ...all_objects_clone, ...e5_objects}
    //     }

    //     return all_objects
    // }

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

    get_stacked_items(object){
        // var object = this.get_post_items()[this.props.selected_audio_item];
        var convo_id = object['id']

        var stack = this.props.app_state.stack_items
        var stacked_items = []
        for(var i=0; i<stack.length; i++){
            if(stack[i].type == this.props.app_state.loc['1593cu']/* 'nitro-messages' */){
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
        if(text.length > this.props.app_state.max_input_text_length){
            var object =  this.get_item_in_array(this.get_post_items(), this.props.selected_audio_item);
            this.show_add_comment_bottomsheet(object)
        }else{
            this.setState({entered_text: text})
        }
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
        else if(this.props.app_state.user_account_id[this.props.app_state.selected_e5] == 1){
            this.props.notify(this.props.app_state.loc['1696']/* 'You need to make at least 1 transaction to participate.' */, 1200)
        }
        else{
            var tx = {'id':object['id'], type:'message', entered_indexing_tags:['send', 'message'], 'message':message, 'sender':this.props.app_state.user_account_id[this.props.app_state.selected_e5], 'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id, 'e5':object['e5'], 'sender_e5':this.props.app_state.selected_e5, 'lan':this.props.app_state.device_language, 'markdown':''}

            this.props.add_nitro_reply_to_stack(tx)

            this.setState({entered_text:''})
            // this.props.notify(this.props.app_state.loc['1697']/* 'Message added to stack.' */, 1600)
            
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
        if(item_id == '3' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12')uploaded_data = this.props.app_state.uploaded_data

        var censor_list = this.props.app_state.censored_keyword_phrases.concat(this.props.app_state.censored_keywords_by_my_following)
        return(
            <div>
                <ViewGroups show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={width} show_images={this.props.show_images.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} censored_keyword_phrases={censor_list} select_deselect_tag={this.props.select_deselect_tag.bind(this)}/>
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




export default NitroDetailsSection;