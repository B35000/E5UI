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

class DirectMessageDetailsSection extends Component {
    
    state = {
        selected: 0, navigate_view_mail_list_detail_tags_object: this.get_navigate_view_mail_list_detail_tags_object_tags(), entered_text:'', entered_image_objects:[],
        stacked_messages:[{}], focused_message:{'tree':{}}
    };

    get_navigate_view_mail_list_detail_tags_object_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e', this.props.app_state.loc['1674']/* 'activity' */],[1]
          ],
        }
    }

    reset_tags(){
        this.setState({navigate_view_mail_list_detail_tags_object: this.get_navigate_view_mail_list_detail_tags_object_tags()})
    }

    render(){
        return(
            <div>
                {this.render_mail_list_detail()}
            </div>
        )
    }

    render_mail_list_detail(){
        if(this.props.selected_direct_message_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_mail_details_section()}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 0px 0px', 'max-width':'470px'}}>
                        <Tags ref={c => this.bottom_tags = c} font={this.props.app_state.font} page_tags_object={this.state.navigate_view_mail_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_mail_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
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

    when_navigate_view_mail_list_detail_tags_object_updated(tag_obj){
        this.setState({navigate_view_mail_list_detail_tags_object: tag_obj})
    }

    get_my_direct_message_objects(){
        const messages = []
        Object.keys(this.props.app_state.direct_messages).forEach(e5_account => {
            messages.push(this.props.app_state.direct_messages[e5_account])
        });

        return messages;
    }



    render_mail_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_mail_list_detail_tags_object, this.state.navigate_view_mail_list_detail_tags_object['i'].active)
        var object = this.get_item_in_array(this.get_my_direct_message_objects(), this.props.selected_direct_message_item);
        if(object == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }

        if(object!=null){
            if(selected_item == this.props.app_state.loc['1674']/* 'activity' */){
                return(
                    <div>
                        {this.render_mail_responses(object)}
                    </div>
                )
                
            }
        }
    }











    render_mail_responses(object){
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
        if(object != null){
            return(
                <div>
                    <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px'}}>
                        <div onScroll={event => this.handleScroll(event, object)} style={{ 'overflow-y': 'auto', height: he, padding:'5px 0px 5px 0px'}}>
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
        
    }

    when_text_input_field_height_changed(height){
        this.setState({text_input_field_height: height})
    }

    when_entered_text_input_field_changed(text){
        var object = this.get_item_in_array(this.get_my_direct_message_objects(), this.props.selected_direct_message_item);
       
        if(text.length > this.props.app_state.max_input_text_length){
            this.show_add_comment_bottomsheet(object)
        }else{
            this.setState({entered_text: text})
            var recipients_e5 = object['account_e5']
            this.props.emit_new_chat_typing_notification(object['convo_id'], object['account_id'], recipients_e5, true)

            var me = this;
            setTimeout(function() {
                if(me.state.entered_text == text){
                    //done typing
                    me.props.emit_new_chat_typing_notification(object['convo_id'], object['account_id'], recipients_e5, false)
                }
            }, (1 * 2000));
        }
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
        if(!this.is_auto_scrolling) this.has_user_scrolled[object['convo_id']] = true
    };

    render_focused_message(object){
        var item_arg = this.get_focused_message(object);
        var item = item_arg
        if(item != null && item['ipfs'] != null){
            item = item_arg['ipfs']
        }
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
    
    show_add_comment_bottomsheet(object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        var focused_message_id = this.get_focused_message(object) != null ? this.get_focused_message(object) : 0
        this.props.show_add_comment_bottomsheet(object, focused_message_id, 'direct_message', null, this.state.entered_text)
    }

    render_top_title(mail){
        // var mail = this.get_mail_items()[this.props.selected_mail_item];
        var sender = this.props.app_state.loc['2785']/* 'You' */
        var recipient = this.get_account_alias(mail['account_id'], mail['account_e5'])
        const online_text = this.is_recipient_online(mail) ? this.props.app_state.loc['2738bi']/* 'online' */ : null/* this.props.app_state.loc['2738bj'] *//* 'offline' */
        return(
            <div style={{padding:'5px 5px 5px 5px'}}>
                {this.render_detail_item('3', {'title':sender+this.props.app_state.loc['2512']/* ' with ' */+recipient, 'details':this.props.app_state.loc['2513']/* 'conversation' */, 'size':'l', 'footer':online_text})} 
            </div>
        )
    }

    is_recipient_online(object){
        const tracked_online_accounts = this.props.app_state.tracked_online_accounts
        var recipients_e5 = object['account_e5']
        const recipient = object['account_id']
        const e5_id = recipient+recipients_e5

        if(tracked_online_accounts[e5_id] == null){
            return false
        }
        else{
            return tracked_online_accounts[e5_id]['online']
        }
    }

    get_account_alias(sender, e5){
        if(sender == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['2785']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    constructor(props) {
        super(props);
        this.messagesEnd = React.createRef();
        this.has_user_scrolled = {}
    }

    componentDidUpdate(){
        var has_scrolled = this.has_user_scrolled[this.props.selected_mail_item]
        if(has_scrolled == null){
            this.scroll_to_bottom()
        }
    }

    render_sent_received_messages(object, he){
        // var middle = this.props.height-240;
        // if(this.get_focused_message(object) != null) middle = this.props.height-290
        var middle = he - 135
        // if(this.get_focused_message(object) != null) middle = he - 185
        // var size = this.props.size;
        // if(size == 'm'){
        //     middle = this.props.height-100;
        // }
        var items = [].concat(this.get_convo_messages(object)).reverse()
        var stacked_items = []
        var final_items_without_divider = stacked_items.concat(items)
        var final_items = this.append_divider_between_old_messages_and_new_ones(final_items_without_divider)

        
        if(items.length == 0 && stacked_items.length == 0){
            items = [0,1]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    {this.render_small_empty_object()}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {this.render_bubble_if_typing(object)}
                    {this.render_last_opened_time(object)}
                </div>
            )
        }
        else{
            return(
                <div onScroll={event => this.handleScroll(event, object)} style={{overflow: 'scroll', height: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.render_messages(final_items, object, middle-50)}
                        {this.render_bubble_if_typing(object)}
                        {this.render_last_opened_time(object)}
                        {/* <div ref={this.messagesEnd} style={{display:'none'}}/> */}
                    </ul>
                </div>
            )
        }
    }

    render_last_opened_time(object){
        const convo_read_receipts_info = this.props.app_state.convo_read_receipts_info
        const last_opened_time_object = convo_read_receipts_info[object['convo_id']]
        if(last_opened_time_object != null){
            const last_opened_time = last_opened_time_object['last_read_time']
            return(
                <div style={{'margin':'0px 0px 0px 10px'}}>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['2738bg']/* Last opened on $ */.replace('$', new Date(last_opened_time).toLocaleString()), 'textsize':'8px', 'font':this.props.app_state.font})}
                </div>
            )
        }
    }

    render_bubble_if_typing(object){
        const convo_typing_info = this.props.app_state.convo_typing_info
        const convo_typing_object = convo_typing_info[object['convo_id']]
        if(convo_typing_object != null && convo_typing_object['keyboard_active'] == true && convo_typing_object['time'] > Date.now() - (10*1000)){
            const typing_message = this.props.app_state.loc['2738bk']/* '$ is typing...' */.replace('$', this.get_account_alias(convo_typing_object['author'], object))
            return(
                <div style={{'width':135}}>
                    {this.render_detail_item('4', {'text':typing_message, 'textsize':'13px', 'font':this.props.app_state.font})}
                </div>
            )
        }
    }

    append_divider_between_old_messages_and_new_ones(items){
        if(items.length == 0) return [];
        const last_login_time = this.props.app_state.last_login_time
        const newElement = 'e';
        let closestIndex = 0;
        let minDiff = Infinity;
        items.forEach((obj, i) => {
            const diff = Math.abs(obj['message_id'] - last_login_time);
            if (diff < minDiff) {
                minDiff = diff;
                closestIndex = i;
            }
        });
        if(closestIndex == 0){
            return items
        }
        const clone = items.slice()
        clone.splice(closestIndex + 1, 0, newElement);
        return clone;
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
                                    {this.render_small_empty_object()}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }
        else{
            const reversed_items = items.slice().reverse()
            return(
                <div style={{}}>
                    <Virtuoso
                        ref={(el) => (this.virtuoso_list = el)}
                        style={{ height: middle }}
                        totalCount={items.length}
                        initialTopMostItemIndex={items.length-1}
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
        if(this.is_message_expired(item)){
            return;
        }
        var clone = JSON.parse(JSON.stringify(this.state.focused_message))
        // var object = this.get_mail_items()[this.props.selected_mail_item];

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
        // var object = this.get_mail_items()[this.props.selected_mail_item];
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
        // var object = this.get_mail_items()[this.props.selected_mail_item];
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
        if(item == 'e'){
            return(
                <div>
                    {this.render_detail_item('16', {'message':this.props.app_state.loc['2117w']/* new */})}
                </div>
            )
        }
        return(
            <div>
                <SwipeableList>
                        <SwipeableListItem
                            swipeLeft={{
                            content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2507a']/* Reply */}</p>,
                            action: () => this.focus_message(item, object)
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
        if(!this.is_message_expired(item)) this.copy_to_clipboard(message)
    }

    copy_to_clipboard(signature_data){
        navigator.clipboard.writeText(signature_data)
        this.props.notify(this.props.app_state.loc['1692']/* 'Copied message to clipboard.' */, 600)
    }

    is_message_expired(item){
        const includes = this.props.app_state.stacked_message_ids.find(e => e['id'] === item['message_id'])
        if(item['expiry_time'] != null && (Date.now()/1000) > (item['time']+item['expiry_time']) && includes == null){
            return true;
        }
        return false;
    }

    render_stack_message_item(item_arg, object){
        var item = item_arg
        if(item['ipfs'] != null){
            item = item_arg['ipfs']
        }

        if(this.is_message_expired(item)){
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
        var word_wrap_value = this.longest_word_length(item['message']) > 53 ? 'break-all' : 'normal'
        var line_color = item['sender'] == this.props.app_state.user_account_id[item['my_preferred_e5']] ? this.props.theme['secondary_text_color'] : this.props.theme['send_receive_ether_background_color']
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
                                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} onClick={()=>this.props.add_id_to_contacts(item['sender'], object)} >{this.get_sender_title_text(item, object)}</p>
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
                            {this.render_image_if_image_message(item)}

                            {this.get_then_render_my_awards(item, object)}
                            {/* <p style={{'font-size': '8px','color': this.props.theme['primary_text_color'],'margin': '1px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'white-space': 'pre-line'}} className="fw-bold">{this.get_message_replies(item, object).length} responses</p> */}
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
        // console.log(_item)
        const focused_message_id = _item['ipfs'] != null ? _item['ipfs']['focused_message_id'] : _item['focused_message_id']
        // console.log('mail_details_section','message', _item)
        if(focused_message_id == 0 || focused_message_id == null) return;
        // if(this.get_focused_message(object) != null) return;
        var message_items = this.get_convo_messages(object)
        var item = this.get_item_in_message_array(focused_message_id, message_items)
        // console.log('mail_details_section','focused message', focused_message_id, item)
        if(item == null) return;
        if(item['ipfs'] != null){
            item = item['ipfs']
        }
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
        var message_items = this.get_convo_messages(object)
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
        if(object == null){
            try{
                object = object_array.find(x => x['ipfs']['message_id'] === message_id);
            }catch(e){
                console.log(e)
            } 
        } 
        return object
    }

    render_image_if_image_message(item){
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
                    {this.render_files_part(item['pdf-data'])}
                    <div style={{height:5}}/>
                </div>
            )
        }
    }

    render_files_part(items){
        if(items.length == 0) return;
        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_uploaded_file_item_clicked(item, index)}>
                            {this.render_uploaded_comment_file(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    when_uploaded_file_item_clicked(item){
        var ecid_obj = this.get_cid_split(item)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null || this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        if(data != null){
            if(data['type'] == 'audio'){
                this.props.play_individual_track(item)
            }
            else if(data['type'] == 'video'){
                this.props.play_individual_video(item, data['width'], data['height'])
            }
            else if(data['type'] == 'pdf'){
                this.props.when_pdf_file_opened(item)
            }
            else if(data['type'] == 'zip'){
                this.props.when_zip_file_opened(item)
            }
        }
    }

    render_uploaded_comment_file(item, index){
        var ecid_obj = this.get_cid_split(item)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        const minified = true;
        
        if(data != null){
            if(data['type'] == 'audio'){
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
                var title = data['name']
                var size = 'l'
                var thumbnail = data['thumbnail'] == '' ? this.props.app_state.static_assets['music_label'] : data['thumbnail']
                 if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    size = 's'
                }
                return(
                    <div>
                        {this.render_detail_item('8', {'details':details,'title':title, 'size':size, 'image':thumbnail, 'border_radius':'15%'})}
                    </div>
                )
            }
            else if(data['type'] == 'video'){
                var video = data['data']
                var font_size = ['15px', '12px', 19];
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */
                var title = data['name']
                var video_height = "50"
                if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    font_size = ['12px', '10px', 16];
                    video_height = "40"
                }

                if(this.props.app_state.video_thumbnails[ecid_obj['full']] != null){
                    var thumbnail = this.props.app_state.video_thumbnails[ecid_obj['full']]
                    return(
                        <div>
                            {this.render_detail_item('8', {'title':title,'details':details, 'size':size, 'image':thumbnail, 'border_radius':'15%', 'image_width':'auto'})}
                        </div>
                    )
                }else{
                    var thumbnail = this.props.app_state.static_assets['video_label']
                    return(
                        <div>
                            {this.render_detail_item('8', {'title':title,'details':details, 'size':size, 'image':thumbnail, 'border_radius':'15%', 'image_width':'auto'})}
                        </div>
                    )
                }
            }
            else if(data['type'] == 'pdf'){
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
                var title = data['name']
                var size = 'l'
                var thumbnail = data['thumbnail']
                 if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    size = 's'
                }
                return(
                    <div>
                        {this.render_detail_item('8', {'details':details,'title':title, 'size':size, 'image':thumbnail, 'border_radius':'15%'})}
                    </div>
                )
            }
            else if(data['type'] == 'zip'){
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
                var title = data['name']
                var size = 'l'
                var thumbnail = this.props.app_state.static_assets['zip_file']
                if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    size = 's'
                }
                return(
                    <div>
                        {this.render_detail_item('8', {'details':details,'title':title, 'size':size, 'image':thumbnail, 'border_radius':'15%'})}
                    </div>
                )
            }
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

    get_sender_title_text(item){
        if(item['sender'] == this.props.app_state.user_account_id[item['my_preferred_e5']]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[item['sender']] == null ? item['sender'] : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[item['sender']])
            return alias
        }
    }

    format_message(message){
        if(message == ''){
            return '...'
        }
        return message
    }
    
    get_convo_messages(mail){
        return this.sortByAttributeDescending(mail['messages'], 'time').reverse()
    }

    get_focused_message_replies(object){
        var all_messages = this.get_convo_messages(object)
        var focused_message_message_id = this.get_focused_message_message_id(object)
        var replies = []
        for(var i=0; i<all_messages.length; i++){
            var focused_message_id = this.get_focused_message_id(all_messages[i])
            if(focused_message_id != null && focused_message_message_id != null &&  focused_message_id == focused_message_message_id){
                replies.push(all_messages[i])
            }
        }
        
        return replies
    }

    get_focused_message_message_id(object){
        var focused_message = this.get_focused_message(object)
        var focused_message_message_id = 0
        if(focused_message['ipfs'] != null){
            focused_message_message_id = focused_message['ipfs']['message_id'];
        }else{
            focused_message_message_id = focused_message['message_id'];
        }
        return focused_message_message_id
    }

    get_focused_message_id(message){
        if(message['ipfs'] != null){
            return message['ipfs']['focused_message_id']
        }else{
            return message['focused_message_id']
        }
    }

    get_message_replies(item, object){
        var all_messages = this.get_convo_messages(object)
        var replies = []
    
        for(var i=0; i<all_messages.length; i++){
            var focused_message_id = this.get_focused_message_id(all_messages[i])
            if(focused_message_id != null && item['message_id'] != null &&  focused_message_id == item['message_id']){
                replies.push(all_messages[i])
            }
            
        }
        return replies
    }

    get_focused_message(object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        return this.state.focused_message[object['id']]
    }

    add_message_to_stack(mail){
        var message = this.state.entered_text.trim()
        // var mail = this.get_mail_items()[this.props.selected_mail_item];
        var message_id = Date.now()

        console.log('-------------------add_message_to_stack----------------------')
        const focused_message = this.get_focused_message(mail)
        console.log(focused_message)
        console.log('mail objects e5', mail['ipfs']['recipients_e5'])
        var focused_message_id = focused_message != null ? focused_message['ipfs']['message_id'] : 0
        // if(focused_message_id == null){
        //     focused_message_id = focused_message['ipfs']['message_id']
        // }
        console.log('mail_details_section','focused message id',focused_message_id)
        
        if(message == ''){
            this.props.notify(this.props.app_state.loc['1695']/* 'Type something first.' */, 3600)
        }else{
            var convo_id = mail['convo_id']
            var recipients_e5 = mail['account_e5']

            var tx = {convo_id: convo_id, type:'message', entered_indexing_tags:['send', 'message'], 'message':message, 'sender':this.props.app_state.user_account_id[this.props.app_state.selected_e5], 'recipient':mail['account_id'], 'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id, 'e5':mail['account_e5'], 'my_pub_key':this.props.app_state.my_pub_key, 'my_preferred_account_id':this.props.app_state.user_account_id[this.props.app_state.selected_e5], 'my_preferred_e5':this.props.app_state.selected_e5, 'recipients_e5':recipients_e5, 'lan':this.props.app_state.device_language, 'markdown':'', 'object':mail}
            this.props.send_direct_message(tx)

            this.setState({entered_text:''})
            

            // if (this.messagesEnd.current){
            //     this.messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
            // }
        }
    }



    render_focus_list(object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        var items = this.state.focused_message['tree'][object['id']]

        if(items != null && items.length > 0){
            return(
                <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_focus_chain_item_clicked(item, index, object)}>
                                {this.render_detail_item('3', {'title':this.get_sender_title_text(item, object), 'details':this.shorten_message_item(this.format_message(item, object), object), 'size':'s'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    shorten_message_item(item){
        var final_item = item
        if(item['ipfs']!= null){
            final_item = item['ipfs']
        }
        var message = final_item['message']
        var return_val = message
        if(message.length > 10){
            return_val = message.substring(0, 10).concat('...');
        }
        return return_val
    }

    when_focus_chain_item_clicked(item, pos, object){
        var clone = JSON.parse(JSON.stringify(this.state.focused_message))
        // var object = this.get_mail_items()[this.props.selected_mail_item];

        var new_array = []
        for(var i=0; i<=pos; i++){
            new_array.push(clone['tree'][object['id']][i])
        }
        clone[object['id']] = item
        clone['tree'][object['id']] = new_array
        
        this.setState({focused_message: clone})
    }
    










    sortByAttributeDescending(array, attribute) {
      return array.sort((a, b) => {
          if (parseInt(a[attribute]) < parseInt(b[attribute])) {
          return 1;
          }
          if (parseInt(a[attribute]) > parseInt(b[attribute])) {
          return -1;
          }
          if(parseInt(a[attribute]) == parseInt(b[attribute])){
              if(a['ipfs']['time'] < b['ipfs']['time']){
                  return 1
              }
              if(a['ipfs']['time'] > b['ipfs']['time']){
                  return -1
              }
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

    
    truncate(source, size) {
        var firstLine = source.includes("\n") ? source.split("\n")[0] : source;
        return firstLine.length > size ? firstLine.slice(0, size - 1) + "…" : firstLine;
    }

    get_item_in_array(object_array, id){
        var object = object_array.find(x => x['convo_id'] === id);
        return object
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




export default DirectMessageDetailsSection;