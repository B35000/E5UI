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
// import Letter from './../assets/letter.png'; 
import TextInput from './../components/text_input';
// import E5EmptyIcon from './../assets/e5empty_icon.png';
// import E5EmptyIcon3 from './../assets/e5empty_icon3.png';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import Linkify from "linkify-react";

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

class ChannelDetailsSection extends Component {
    
    state = {
        selected: 0, navigate_view_channel_list_detail_tags: this.get_navigate_view_channel_list_detail_tags(), entered_text:'', focused_message:{'tree':{}}, comment_structure_tags: this.get_comment_structure_tags(), hidden_message_children_array:[]
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

    reset_tags(){
        this.setState({navigate_view_channel_list_detail_tags: this.get_navigate_view_channel_list_detail_tags()})
    }

    componentDidMount() {
        this.interval = setInterval(() => this.check_for_new_responses_and_messages(), this.props.app_state.details_section_syncy_time);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    check_for_new_responses_and_messages() {
        if(this.props.selected_channel_item != null){
            var object = this.get_item_in_array(this.get_channel_items(), this.props.selected_channel_item);
            if(object == null) return;
            this.props.get_objects_messages(object['id'], object['e5'], object)
            this.props.get_channel_event_data(object['id'], object['e5'])
            // this.props.get_moderator_event_data(object['id'], object['e5'])
        }
    }

    get_navigate_view_channel_list_detail_tags(){
        var obj = {
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e',this.props.app_state.loc['2028']/* 'metadata' */,this.props.app_state.loc['2030']/* 'activity' *//* , 'e.'+this.props.app_state.loc['2065']'e.moderator-events' */],[1]
          ],
          'moderator-events': [
                ['xor', 'e', 1], [this.props.app_state.loc['2065']/* 'moderator-events' */, this.props.app_state.loc['2066']/* 'modify-moderators' */, this.props.app_state.loc['2067']/* 'interactable-checkers' */, this.props.app_state.loc['2068']/* 'interactable-accounts' */, this.props.app_state.loc['2069']/* 'block-accounts' */], [1], [1]
            ],
        }

        obj[this.props.app_state.loc['2065']/* moderator-events */] = [
                ['xor', 'e', 1], [this.props.app_state.loc['2065']/* 'moderator-events' */, this.props.app_state.loc['2066']/* 'modify-moderators' */, this.props.app_state.loc['2067']/* 'interactable-checkers' */, this.props.app_state.loc['2068']/* 'interactable-accounts' */, this.props.app_state.loc['2069']/* 'block-accounts' */], [1], [1]
            ]

        return obj
    }

    render(){
        return(
            <div>
                {this.render_channels_list_detail()}
            </div>
        )
    }


    render_channels_list_detail(){
        if(this.props.selected_channel_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    {this.render_channel_details_section()}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 0px 0px', }}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.navigate_view_channel_list_detail_tags} tag_size={'l'} when_tags_updated={this.when_navigate_view_channel_list_detail_tags_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
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

    when_navigate_view_channel_list_detail_tags_updated(tag_obj){
        this.setState({navigate_view_channel_list_detail_tags: tag_obj})
    }

    get_item_in_array(object_array, id){
        var object = object_array.find(x => x['e5_id'] === id);
        return object
    }

    render_channel_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_channel_list_detail_tags, this.state.navigate_view_channel_list_detail_tags['i'].active)
        var object = this.get_item_in_array(this.get_channel_items(), this.props.selected_channel_item);
        if(object == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }

        if(object != null){
            if(selected_item == this.props.app_state.loc['2028']/* 'metadata' */){
                return(
                    <div>
                        {this.render_channel_main_details_section(object)}
                    </div>
                )
            }
            else if(selected_item == this.props.app_state.loc['2030']/* 'activity' */){
                return(
                    <div>
                        {this.render_channel_activity(object)}
                    </div>
                )
                
            }
            else if(selected_item == this.props.app_state.loc['2066']/* 'modify-moderators' */){
                return(
                    <div>
                        {this.render_modify_moderator_logs(object)}
                    </div>
                )
            }
            else if(selected_item == this.props.app_state.loc['2067']/* 'interactable-checkers' */){
                return(
                    <div>
                        {this.render_interactable_checker_logs(object)}
                    </div>
                )
            }
            else if(selected_item == this.props.app_state.loc['2068']/* 'interactable-accounts' */){
                return(
                    <div>
                        {this.render_interactable_accounts_logs(object)}
                    </div>
                )
            }
            else if(selected_item == this.props.app_state.loc['2069']/* 'block-accounts' */){
                return(
                    <div>
                        {this.render_blocked_accounts_logs(object)}
                    </div>
                )
            }
        }
    }


    render_channel_main_details_section(object){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-50
        var size = this.props.screensize
       
        // var object = this.get_channel_items()[this.props.selected_channel_item];
        var item = this.get_channel_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects
        return(
            <div style={{ 'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 2px 10px', 'padding':'0px 10px 0px 10px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':''+this.get_senders_name(object['event'].returnValues.p5, object), 'details':this.props.app_state.loc['2070']/* 'Author' */, 'size':'l'})}
                    <div style={{height: 10}}/>
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

                    <div style={{height: 10}}/>
                    {this.render_chatroom_enabled_message(object)}
                    <div style={{height: 10}}/>
                    {this.show_channel_transaction_count_chart(object)}

                    {/* {this.render_revoke_author_privelages_event(object)} */}
                    {/* <div style={{height: 10}}/> */}
                    {/* {this.render_moderator_button(object)} */}
                    {/* <div style={{height: 10}}/> */}
                    {this.render_edit_object_button(object)}
                    {this.render_pin_channel_button(object)}

                    {this.render_follow_unfollow_author_button(object)}

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
                {this.render_detail_item('8', {'details':title,'title':details, 'size':'s', 'image':thumbnail, 'border_radius':'15%',})}
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




    render_chatroom_enabled_message(object){
        var channel_lock = object['ipfs'].get_channel_locked_tag_setting_object == null ? 'unlocked' : this.get_selected_item(object['ipfs'].get_channel_locked_tag_setting_object, 'e')

        if(channel_lock == 'locked'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2071']/* 'Channel Locked' */, 'details':this.props.app_state.loc['2072']/* 'Channel activity has been restricted to existing participants' */, 'size':'l'})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2073']/* 'Channel Unlocked' */, 'details':this.props.app_state.loc['2075']/* 'Channel activity is not restricted to existing participants' */, 'size':'l'})}
                </div>
            )
        }
    }

    get_senders_name(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return 'You'
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    render_pin_channel_button(object){
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2076']/* 'Pin the channel to your feed' */, 'title':this.props.app_state.loc['2077']/* 'Pin Channel' */})}
                <div style={{height:10}}/>
                <div onClick={()=> this.when_pin_channel_clicked(object)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2078']/* 'Pin/Unpin Channel' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_pin_channel_clicked(object){
        this.props.pin_channel(object)
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

    render_moderator_button(object){
        // var object = this.get_channel_items()[this.props.selected_channel_item];
        var my_account = this.props.app_state.user_account_id[object['e5']]

        if((object['moderators'].includes(my_account) || object['event'].returnValues.p5 == my_account)){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2079']/* 'Perform Moderator Actions' */, 'details':this.props.app_state.loc['2080']/* 'Set an accounts access rights, moderator privelages or block an account' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_moderator_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2081']/* 'Perform Action' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }


    render_edit_object_button(object){
        // var object = this.get_channel_items()[this.props.selected_channel_item];
        var my_account = this.props.app_state.user_account_id[object['e5']]

        if(object['moderators'].includes(my_account) || object['event'].returnValues.p5 == my_account){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2082']/* 'Edit Channel Post' */, 'details':this.props.app_state.loc['2083']/* 'Change the basic details for your Channel' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_edit_channel_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2084']/* 'Edit' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }


    open_edit_channel_ui(object){
        // var object = this.get_channel_items()[this.props.selected_channel_item];
        this.props.open_edit_object('7', object)
    }

    open_moderator_ui(object){
        // var object = this.get_channel_items()[this.props.selected_channel_item];
        this.props.open_moderator_ui(object)
    }

    get_channel_items(){
        return this.props.get_channel_items('')
    }

    get_channel_details_data(object){
        var tags = object['ipfs'] == null ? ['Post'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['e5']+' • '+object['id'], 'details':title, 'size':'l'},
            'age':{'style':'l', 'title':this.props.app_state.loc['1744']/* 'Block Number' */, 'subtitle':'age', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)} `+this.props.app_state.loc['2047']/* ago */, }
        }
    }


    render_revoke_author_privelages_event(object){
        // var object = this.get_channel_items()[this.props.selected_channel_item];
        var events = this.get_moderator_item_logs(object, 'revoke_privelages')

        if(events.length != 0){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2085']/* 'Author Moderator Privelages Disabled' */, 'details':this.props.app_state.loc['2086']/* 'Author of Object is not a Moderator by default' */, 'size':'l'})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2087']/* 'Author Moderator Privelages Enabled' */, 'details':this.props.app_state.loc['2088']/* 'Author of Object is a Moderator by default' */, 'size':'l'})}
                </div>
            )
        }
    }





    show_channel_transaction_count_chart(object){
        var events = this.props.app_state.channel_events[object['id']]
        if(events != null){
            events = events['channel_data']
            if(events.length > 35){
                var amount = events.length
                return(
                    <div>
                        <div style={{height: 10}}/>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['2089']/* 'Channel Traffic' */, 'details':this.props.app_state.loc['2090']/* `Chart containing the total number of messages made over time.` */, 'size':'l'})}
                        
                        {this.render_detail_item('6', {'dataPoints':this.get_transaction_count_data_points(events), 'interval':this.get_transaction_count_interval_figure(events)})}
                        <div style={{height: 10}}/>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['2091']/* 'Y-Axis: Total Messages Made' */, 'details':this.props.app_state.loc['2092']/* 'X-Axis: Time' */, 'size':'s'})}
                        <div style={{height: 10}}/>
                        <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                            {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2093']/* 'Total Channel Messages' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2094']/* 'messages' */, })}
                        </div>
                        {this.render_detail_item('0')}
                    </div>
                )
            }
        }
    }

    get_transaction_count_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i==0){
                    data.push(1)
                }
                else{
                    data.push(parseInt(data[data.length-1]) + (1))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p4
                    for(var t=0; t<diff; t+=60){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p4 - events[i].returnValues.p4
                    for(var t=0; t<diff; t+=60){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }
        


        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(yVal)});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_transaction_count_interval_figure(events){
        return events.length
    }





    
    
    



    
    
    constructor(props) {
        super(props);
        this.messagesEnd = React.createRef();
        this.message_list = React.createRef();
        this.has_user_scrolled = {}
    }

    componentDidUpdate(){
        // var has_scrolled = this.has_user_scrolled[this.props.selected_channel_item]
        // if(has_scrolled == null){
        //     this.scroll_to_bottom()
        // }
    }
    
    render_channel_activity(object){
        var he = this.props.height-100
        if(this.get_focused_message(object) != null) he = this.props.height-165
        var size = this.props.screensize
        var ww = '80%'
        if(size == 'l') ww = '90%'
        if(this.props.app_state.width > 1100){
            ww = '80%'
        }
        return(
            <div>
                <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px', }}>
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
                    <div style={{'margin':'0px 0px 0px 0px'}}>
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
                            <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} >{this.get_sender_title_text2(item, object)}</p>
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
        // var object = this.get_channel_items()[this.props.selected_channel_item];
        var focused_message_id = this.get_focused_message(object) != null ? this.get_focused_message(object) : 0

        if(!this.is_object_interactable(object)){
            return
        }
        else {
            this.props.show_add_comment_bottomsheet(object, focused_message_id, 'channel')
        }
    }


    render_top_title(object){
        // var object = this.get_channel_items()[this.props.selected_channel_item];
        var top_title = object['ipfs'] == null ? '': object['ipfs'].entered_title_text
        return(
            <div style={{padding:'5px 5px 5px 5px'}}>
                {this.render_detail_item('3', {'title':'In '+object['id'], 'details':this.truncate(top_title, 40), 'size':'l'})} 
            </div>
        )
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
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'display': 'flex', 'align-items':'center','justify-content':'center'}}>
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
                    {items.map((item, index) => (
                        <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                            <div>
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
        // var object = this.get_channel_items()[this.props.selected_channel_item]

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
        // var object = this.get_channel_items()[this.props.selected_channel_item]
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
        // var object = this.get_channel_items()[this.props.selected_channel_item]
        var focused_item = this.state.focused_message[object['id']]
        var focused_items = this.state.focused_message['tree'][object['id']]
        for(var i=0; i<focused_items.length; i++){
            if(focused_items[i]['message_id'] == focused_item['message_id']){
                return i
            }
        }
        return -1
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
                            action: () => this.props.delete_message_from_stack(item, this.props.app_state.loc['1510']/* 'channel-messages' */)
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
        this.props.notify('copied message to clipboard', 600)
    }



    render_stack_message_item(item, object){
        if(this.is_sender_in_blocked_accounts(item)){
            return(
                <div>
                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'display': 'flex', 'align-items':'center','justify-content':'center'}}>
                        <div style={{'margin':'10px 20px 10px 0px'}}>
                            <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
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
        const parts = text.split(' ');
        return(
            <div>
                <div style={{'background-color': line_color,'margin': '0px 0px 0px 0px','border-radius': '0px 0px 0px 0px'}}>
                    <div style={{'background-color': this.props.theme['send_receive_ether_background_color'],'margin': '0px 0px 0px 1px','border-radius': '0px 0px 0px 0px'}}>
                        <div style={{'padding': '7px 15px 10px 15px','margin':'0px 0px 0px 0px', 'background-color': this.props.theme['view_group_card_item_background'],'border-radius': '7px'}}>
                            <div className="row" style={{'padding':'0px 0px 0px 0px'}}>
                                <div className="col-9" style={{'padding': '0px 0px 0px 14px', 'height':'20px' }}> 
                                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} onClick={()=>this.props.add_id_to_contacts(item['sender'], item, object)} >{this.get_sender_title_text2(item, object)}</p>
                                    </div>
                                    <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                                    <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{this.get_time_difference(item['time'], object)}</p>
                                </div>
                            </div>
                            <p style={{'font-size': size,'color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': font,'text-decoration': 'none', 'white-space': 'pre-line', 'word-break': word_wrap_value}} onClick={(e) => this.when_message_clicked(e, item)}><Linkify options={{target: '_blank'}}>{
                                parts.map((part, index) => {
                                    const num = parseInt(part, 10);
                                    const isId = !isNaN(num) && num > 1000;
                                    if (isId) {
                                        return (
                                            <span
                                                key={index}
                                                style={{ textDecoration: "underline", cursor: "pointer", color: this.props.theme['secondary_text_color'] }}
                                                onClick={() => this.when_e5_link_tapped(num)}>
                                                    {part}{index == parts.length-1 ? '':' '}
                                            </span>
                                        );
                                    }
                                    return <span key={index}>{part}{index == parts.length-1 ? '':' '}</span>;
                                })
                            }</Linkify></p>
                            {this.render_markdown_in_message_if_any(item)}
                            {this.render_images_if_any(item)}
                            {this.get_then_render_my_awards(item, object)}
                            {/* <p style={{'font-size': '8px','color': this.props.theme['primary_text_color'],'margin': '1px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'white-space': 'pre-line'}} className="fw-bold">{this.get_message_replies(item, object).length} {this.props.app_state.loc['2064']}</p> */}
                        </div>
                    </div>
                </div>
                {this.render_pdfs_if_any(item)}
                {this.render_response_if_any(item, object)}
            </div>
        )
        
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
        if(selected_view_option == this.props.app_state.loc['1672']/* 'comment-structure' */) return;
        var size = item['size'] == null ? '11px' : item['size'];
        var font = item['font'] == null ? this.props.app_state.font : item['font']
        return(
            <div style={{'padding': '7px 15px 10px 15px','margin':'2px 5px 0px 20px', 'background-color': this.props.theme['messsage_reply_background'],'border-radius': '0px 0px 10px 10px'}}> 
                <div className="row" style={{'padding':'0px 0px 0px 10px'}}>
                    <div className="col-9" style={{'padding': '0px 0px 0px 0px', 'height':'20px' }}> 
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} onClick={()=>this.props.add_id_to_contacts(item['sender'], item, object)} >{this.get_sender_title_text2(item, object)}</p>
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

    get_sender_title_text2(item, object){
        // var object = this.get_channel_items()[this.props.selected_channel_item];
        if(item['sender'] == this.props.app_state.user_account_id[item['sender_e5']]){
            return 'You'
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[item['sender']] == null ? item['sender'] : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[item['sender']])
            if(object['event'].returnValues.p5 == item['sender']){
                alias = alias+' • '+this.props.app_state.loc['2064c']/* 'Creator' */
            }
            if(object['moderators'].includes(item['sender']) && object['event'].returnValues.p5 != item['sender']){
                //if sender is moderator and not author
                alias = alias+' • '+this.props.app_state.loc['2064d']/* 'moderator' */
            }
            return alias
        }
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

    format_message(message){
        if(message == ''){
            return '...'
        }
        return message
    }

    get_convo_messages(object){
        // var object = this.get_channel_items()[this.props.selected_channel_item];
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

    get_stacked_items(object){
        // var object = this.get_channel_items()[this.props.selected_channel_item];
        var convo_id = object['id']

        var stack = this.props.app_state.stack_items
        var stacked_items = []
        for(var i=0; i<stack.length; i++){
            if(stack[i].type == 'channel-messages'){
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
        // var object = this.get_channel_items()[this.props.selected_channel_item];
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
        this.setState({entered_text: text})
    }

    add_message_to_stack(object){
        var message = this.state.entered_text.trim()
        // var object = this.get_channel_items()[this.props.selected_channel_item];
        var message_id = Date.now()
        var focused_message_id = this.get_focused_message(object) != null ? this.get_focused_message(object)['message_id'] : 0
        if(message == ''){
            this.props.notify(this.props.app_state.loc['1695']/* 'Type something first.' */, 1600)
        }
        else if(this.props.app_state.user_account_id[this.props.app_state.selected_e5] == 1){
            this.props.notify(this.props.app_state.loc['1696']/* 'You need to make at least 1 transaction to participate.' */, 1200)
        }
        else if(!this.is_object_interactable(object)){
            return
        }
        else{
            var unencrypted_keys = object['unencrypted_keys']
            console.log('channel_details_section', 'unencrypted_keys', unencrypted_keys)
            var key_to_use = ''
            var key_index = 0
            if(unencrypted_keys != null && unencrypted_keys.length > 0){
                key_to_use = unencrypted_keys[unencrypted_keys.length-1]
                key_index = unencrypted_keys.length-1
            }
            var tx = {'id':object['id'], type:'message', entered_indexing_tags:['send', 'message'], 'message':message, 'sender':this.props.app_state.user_account_id[this.props.app_state.selected_e5], 'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id, 'e5':object['e5'], 'sender_e5':this.props.app_state.selected_e5, 'key_to_use':key_to_use, 'key_index':key_index}

            this.props.add_channel_message_to_stack_object(tx)

            this.setState({entered_text:''})
            this.props.notify(this.props.app_state.loc['1697']/* 'message added to stack' */, 1600)
            
            if (this.messagesEnd.current){
                this.messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }

    add_image_to_stack(image){
        var object = this.get_channel_items()[this.props.selected_channel_item];
        if(this.props.app_state.user_account_id[object['e5']] == 1){
            this.props.notify('you need to make at least 1 transaction to participate', 1200)
            return
        }
        else if(!this.is_object_interactable()){
            return
        }
        var message = this.state.entered_text.trim()
        var message_id = Date.now()
        var focused_message_id = this.get_focused_message() != null ? this.get_focused_message()['message_id'] : 0

        var tx = {'id':object['id'], type:'image', 'message': message, entered_indexing_tags:['send', 'image'], 'image-data':{'images':[image],'pos':0}, 'sender':this.props.app_state.user_account_id[object['e5']],'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id, 'e5':object['e5']}

        this.props.add_channel_message_to_stack_object(tx)

        this.setState({entered_text:''})
        this.props.notify('message added to stack', 600)

        if (this.messagesEnd.current){
            this.messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    is_object_interactable(object){
        // var object = this.get_channel_items()[this.props.selected_channel_item];
        var access_rights_setting =  object['access_rights_enabled']
        var my_account = this.props.app_state.user_account_id[object['e5']]

        if(access_rights_setting == true && (object['my_interactible_time_value'] < Date.now()/1000 && !object['moderators'].includes(my_account)) ){
            this.props.notify(this.props.app_state.loc['2100']/* 'You cant do that. The channel is access restricted.' */, 6600)
            return false
        }
        else if(object['my_blocked_time_value'] > Date.now()/1000){
            this.props.notify(this.props.app_state.loc['2101']/* 'You cant do that. Youve been blocked from the channel for ' */+(this.get_time_diff(object['my_blocked_time_value'] - Date.now()/1000)), 3600)
            return false
        }
        
        var channel_lock = object['ipfs'].get_channel_locked_tag_setting_object == null ? 'unlocked' : this.get_selected_item(object['ipfs'].get_channel_locked_tag_setting_object, 'e')

        if(channel_lock == 'locked'){
            var participants = this.get_channel_participants(object)
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(!participants.includes(me)){
                this.props.notify(this.props.app_state.loc['2101;']/* 'The channel has been locked by its moderators' */, 6500)
                return false
            }
        }

        return true
    }

    

    get_channel_participants(object){
        var items = this.get_convo_messages(object)
        var participants = []

        if(!participants.includes(object['event'].returnValues.p5)){
            participants.push(object['event'].returnValues.p5)
        }

        items.forEach(message => {
            if(!participants.includes(message['sender'])){
                participants.push(message['sender'])
            }
        });

        var mods = object['moderators'] == null ? [] : object['moderators']
        mods.forEach(mod => {
            if(!participants.includes(mod)){
                participants.push(mod)
            }
        })
        return participants;
    }


    render_focus_list(object){
        // var object = this.get_channel_items()[this.props.selected_channel_item];
        var items = this.state.focused_message['tree'][object['id']]

        if(items != null && items.length > 0){
            return(
                <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_focus_chain_item_clicked(item, index, object)}>
                                {this.render_detail_item('3', {'title':this.get_sender_title_text2(item, object), 'details':this.shorten_message_item(this.format_message(item['message'], object), object), 'size':'s'})}
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
        // var object = this.get_channel_items()[this.props.selected_channel_item]

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
            <div style={{'display': 'flex', 'flex-direction': 'column-reverse'}}>
                {sorted_messages_in_tree.children.map((item, index) => (
                    <li style={{'padding': '1px 5px 0px 5px'}} onClick={()=>console.log()}>
                        <div>
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














    render_modify_moderator_logs(object){
        var he = this.props.height - 45
        // var object = this.get_channel_items()[this.props.selected_channel_item];
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2102']/* 'In Channel ' */ + object['id'], 'details': this.props.app_state.loc['2103']/* 'Channel Modify Moderator Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                    {this.render_modify_moderator_item_logs(object)}
                </div>
            </div>
        )
    }

    get_moderator_item_logs(object, event){
        if (this.props.app_state.moderator_events[object['id']] == null) {
            return []
        }
        return this.props.app_state.moderator_events[object['id']][event]
    }

    render_modify_moderator_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.get_moderator_item_logs(object, 'modify_moderator'))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse' }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_modify_moderator_item_clicked(index)}>
                                    {this.render_modify_moderator_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_modify_moderator_item_clicked(index){
        if (this.state.selected_modify_moderator_event_item == index) {
            this.setState({ selected_modify_moderator_event_item: null })
        } else {
            this.setState({ selected_modify_moderator_event_item: index })
        }
    }

    render_modify_moderator_event_item(item, object, index){
        var authority_val_obj = {'0':this.props.app_state.loc['2104']/* 'Not Moderator' */, '1':this.props.app_state.loc['2105']/* 'Moderator' */}
        var authority_val = authority_val_obj[item.returnValues.p6]
        if (this.state.selected_modify_moderator_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2106']/* 'Targeted Account' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': this.props.app_state.loc['2107']/* 'Moderator Account' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': authority_val, 'details': this.props.app_state.loc['2108']/* 'Authority value' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2106']/* 'Targeted Account' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', {'title': authority_val, 'details': this.props.app_state.loc['2108']/* 'Authority value' */, 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
    }

    get_sender_title_text(sender, object) {
        if (sender == this.props.app_state.user_account_id[object['e5']]) {
            return 'You'
        } else {
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }













    render_interactable_checker_logs(object){
        var he = this.props.height - 45
        // var object = this.get_channel_items()[this.props.selected_channel_item];
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2102']/* 'In Channel ' */ + object['id'], 'details': this.props.app_state.loc['2109']/* 'Channel Access Rights Settings Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                    {this.render_interactable_checker_item_logs(object)}
                </div>
            </div>
        )
    }

    render_interactable_checker_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.get_moderator_item_logs(object, 'enable_interactible'))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse' }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_interactable_checker_item_clicked(index)}>
                                    {this.render_interactable_checker_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_interactable_checker_item_clicked(index){
        if (this.state.selected_interactable_checker_event_item == index) {
            this.setState({ selected_interactable_checker_event_item: null })
        } else {
            this.setState({ selected_interactable_checker_event_item: index })
        }
    }

    render_interactable_checker_event_item(item, object, index){
        var interactable_checker_obj = {'0':this.props.app_state.loc['2110']/* 'Access Rights Disabled(Public)' */,'1':this.props.app_state.loc['2111']/* 'Access Rights Enabled(Private)' */}
        var interactable_checker = interactable_checker_obj[item.returnValues.p6]
        if (this.state.selected_interactable_checker_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': interactable_checker, 'details': this.props.app_state.loc['2112']/* 'Access Rights Status' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': this.props.app_state.loc['2113']/* 'Moderator Account' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': interactable_checker, 'details': this.props.app_state.loc['2112']/* 'Acces Rights Status' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                </div>
            )
        }
    }











    render_interactable_accounts_logs(object){
        var he = this.props.height - 45
        // var object = this.get_channel_items()[this.props.selected_channel_item];
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Channel ' + object['id'], 'details': this.props.app_state.loc['2114']/* 'Channel Account Access Settings Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                    {this.render_interactable_accounts_item_logs(object)}
                </div>
            </div>
        )
    }

    render_interactable_accounts_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.get_moderator_item_logs(object, 'add_interactible'))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse' }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_interactable_account_item_clicked(index)}>
                                    {this.render_interactable_account_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_interactable_account_item_clicked(index){
        if (this.state.selected_interactable_account_event_item == index) {
            this.setState({ selected_interactable_account_event_item: null })
        } else {
            this.setState({ selected_interactable_account_event_item: index })
        }
    }

    render_interactable_account_event_item(item, object, index){
        if (this.state.selected_interactable_account_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2115']/* 'Targeted Account' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': this.props.app_state.loc['2116']/* 'Moderator Account' */, 'size': 's' })}
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['2117']/* 'Until: ' */+(new Date(item.returnValues.p6*1000)), 'size': 's' })}
                    
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2106']/* 'Targeted Account' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': 'Until: '+(new Date(item.returnValues.p6*1000)), 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
    }











    render_blocked_accounts_logs(object){
        var he = this.props.height - 45
        // var object = this.get_channel_items()[this.props.selected_channel_item];
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Channel ' + object['id'], 'details': this.props.app_state.loc['2124']/* 'Channel Blocked Account Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                    {this.render_blocked_accounts_item_logs(object)}
                </div>
            </div>
        )
    }

    render_blocked_accounts_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.get_moderator_item_logs(object, 'block_account'))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse' }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_blocked_account_item_clicked(index)}>
                                    {this.render_blocked_account_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_blocked_account_item_clicked(index){
        if (this.state.selected_blocked_account_event_item == index) {
            this.setState({ selected_blocked_account_event_item: null })
        } else {
            this.setState({ selected_blocked_account_event_item: index })
        }
    }

    render_blocked_account_event_item(item, object, index){
        if (this.state.selected_blocked_account_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2106']/* 'Targeted Account' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': this.props.app_state.loc['2116']/* 'Moderator Account' */, 'size': 's' })}
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['2117']/* 'Until: ' */+(new Date(item.returnValues.p6*1000)), 'size': 's' })}
                    
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2106']/* 'Targeted Account' */, 'size': 's' })}
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['2117']/* 'Until: ' */+(new Date(item.returnValues.p6*1000)), 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
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
                <ViewGroups uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={width} show_images={this.props.show_images.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)}/>
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

    get_future_time_difference(time) {
        var number_date = Math.round(parseInt(time));
        var now = Math.round(new Date().getTime() / 1000);

        var diff = number_date - now;
        return this.get_time_diff(diff)
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

}




export default ChannelDetailsSection;