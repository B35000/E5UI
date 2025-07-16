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

import SwipeableViews from 'react-swipeable-views';
import { motion, AnimatePresence } from "framer-motion";

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

class BagDetailsSection extends Component {
    
    state = {
        selected: 0, navigate_view_bag_list_detail_tags_object: this.get_navigate_bag_list_detail_tags_object_tags(), entered_text:'', focused_message:{'tree':{}}, comment_structure_tags: this.get_comment_structure_tags(), hidden_message_children_array:[], selected_variant:{}, visible_hidden_messages:[],
    };

    reset_tags(){
        this.setState({navigate_view_bag_list_detail_tags_object: this.get_navigate_bag_list_detail_tags_object_tags()})
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

    componentDidMount() {
        this.interval = setInterval(() => this.check_for_new_responses_and_messages(), this.props.app_state.details_section_syncy_time);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    check_for_new_responses_and_messages() {
        if(this.props.selected_bag_item != null){
            var object = this.get_item_in_array(this.get_bag_items(), this.props.selected_bag_item);
            if(object == null) return;
            this.props.get_job_objects_responses(object['id'], object['e5'])
            this.props.get_objects_messages(object['id'], object['e5'])
        }
    }

    

    get_navigate_bag_list_detail_tags_object_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e',this.props.app_state.loc['2028']/* 'metadata' */,this.props.app_state.loc['2029']/* 'responses' */,this.props.app_state.loc['2030']/* 'activity' */],[1]
          ],
        }
    }

    render(){
        return(
            <div>{this.render_bag_list_detail()}</div>
        )
    }

    render_bag_list_detail(){
        if(this.props.selected_bag_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_bag_details_section()}
                    <div style={{width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 0px 0px', 'max-width':'470px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.navigate_view_bag_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_bag_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
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

    when_navigate_view_bag_list_detail_tags_object_updated(tag_obj){
        this.setState({navigate_view_bag_list_detail_tags_object: tag_obj})
    }

    get_item_in_array(object_array, id){
        var object = object_array.find(x => x['e5_id'] === id);
        return object
    }

    render_bag_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_bag_list_detail_tags_object, this.state.navigate_view_bag_list_detail_tags_object['i'].active)
        var object = this.get_item_in_array(this.get_bag_items(), this.props.selected_bag_item);
        

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
                        {this.render_bag_main_details_section(object)}
                    </div>
                )
            }
            else if(selected_item == this.props.app_state.loc['2029']/* 'responses' */){
                return(
                    <div>
                        {this.render_bag_post_responses(object)}
                    </div>
                )
                
            }
            else if(selected_item == this.props.app_state.loc['2030']/* 'activity' */){
                return(
                    <div>
                        {this.render_bag_message_activity(object)}
                    </div>
                ) 
            }
        }
    }


    render_bag_main_details_section(object){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-45
        // var object = this.get_bag_items()[this.props.selected_bag_item];
        var item = this.get_bag_details_data(object)
        
        return(
            <div style={{'border-radius': '15px', 'padding':'0px 10px 0px 10px'}}>
                <div style={{ 'overflow-y': 'scroll', width:'100%', height: he, padding:'0px 0px 0px 0px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['sender_account'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{height: 10}}/>
                    {this.render_post_state(object)}
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'size':'l', 'title':object['ipfs'].device_city, 'details':this.props.app_state.loc['2064g']/* Delivery General Location. */})}

                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['delivery'])}
                    <div style={{height: 10}}/>

                    {this.render_bag_frequency_setting_in_days(object)}

                    {this.render_detail_item('0')}

                    {this.render_bag_value(object)}

                    {this.render_all_variants(object)}

                    {this.render_fulfil_order_button(object)}
                    {this.render_pin_order_button(object)}
                    {this.render_follow_unfollow_author_button(object)}
                    
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_post_state(object){
        const country_data = this.props.app_state.country_data
        const object_country = object['ipfs'].device_country
        const country_item_data = country_data.find(e => e.name === object_country)
        if(country_item_data != null){
            var obj = {'g':'🟢', 'r':'🔴', 'b':'🔵', 'y':'🟡', 'o':'🟠', 'p':'🟣'}
            var country_color = obj[country_item_data.color[0]]
            var title = country_item_data.code/*  +' '+country_item_data.emoji */
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

    get_selected_item2(object, option){
        return object[option][2][0]
    }

    render_follow_unfollow_author_button(object){
        var author_id = object['event'].returnValues.p3
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

    get_senders_name(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return 'You'
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    render_pin_order_button(object){
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2031']/* 'Pin the bag for future reference.' */, 'title':this.props.app_state.loc['2032']/* 'Pin the Bag Order.' */})}
                <div style={{height:10}}/>
                <div onClick={()=> this.when_pin_bag_clicked(object)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2042']/* 'Pin/Unpin Bag' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_pin_bag_clicked(object){
        this.props.pin_bag(object)
    }


    render_fulfil_order_button(object){
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2043']/* 'Fulfil the delivery request for the sender account' */, 'title':this.props.app_state.loc['2044']/* 'Fulfil Bag' */})}
                <div style={{height:10}}/>
                <div onClick={()=> this.open_fulfil_bag_request(object)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2044']/* 'Fulfil Bag' */, 'action':''},)}
                </div>
            </div>
        )
    }

    open_fulfil_bag_request(object){
        // var object = this.get_bag_items()[this.props.selected_bag_item];
        this.props.open_fulfil_bag_request(object)
    }

    get_bag_items(){
        return this.props.get_bag_items('')
    }


    get_bag_details_data(object){
        var tags = [object['event'].returnValues.p3]
        if(object['ipfs']['tags'] != null){
            tags = object['ipfs']['tags']
        }
        if(object['ipfs'].device_city != null){
            tags = [object['ipfs'].device_city].concat(tags)
        }
        var title = object['ipfs'] == null ? '' : object['ipfs']['bag_orders'].length + this.props.app_state.loc['2509b']/* ' items' */
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var time = object['event'] == null ? 0 : object['event'].returnValues.p4
        var delivery_location = this.get_delivery_location_data_if_allowed(object)
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags,'when_tapped':'select_deselect_tag'},
            'sender_account':{'title':''+this.get_senders_name(object['event'].returnValues.p3, object), 'details':this.props.app_state.loc['2045']/* 'Sender Account' */, 'size':'l'},
            'id':{'title':object['e5']+' • '+object['id'], 'details':title, 'size':'l'},
            'delivery':{'title':this.props.app_state.loc['1058d']/* 'Delivery Location' */, 'details':delivery_location, 'size':'l'},
            'age':{'style':'l', 'title':this.props.app_state.loc['1744']/* 'Block Number' */, 'subtitle':this.props.app_state.loc['1748']/* 'age' */, 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)} `+this.props.app_state.loc['2047']/* ago */, }
        }
    }

    get_delivery_location_data_if_allowed(object){
        if(object['event'].returnValues.p3 == this.props.app_state.user_account_id[object['e5']]){
            return object['ipfs'].delivery_location
        }
        var responses = this.get_bag_details_responses(object)
        var allowed = false
        responses.forEach(item => {
            var is_application_accepted = item['is_response_accepted'];
            if(is_application_accepted == true){
                allowed = true;
            }
        });
        if(allowed == true){
            return object['ipfs'].delivery_location
        }else{
            return this.props.app_state.loc['2064h']/* 'Masked.' */
        }
    }

    render_bag_frequency_setting_in_days(object){
        var transaction_item = object['ipfs'];
        if(transaction_item['frequency_enabled'] == true){
            var time_in_days = Math.round(transaction_item['delivery_frequency_time'] / (60*60*24))
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1058w']/* '♺ Reocurring Bag' */, 'details':this.props.app_state.loc['1058x']/* 'The bags is to be fulfilled periodically.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':this.get_time_diff(transaction_item['delivery_frequency_time']), 'details':this.props.app_state.loc['1058u']/* 'Estimated time between deliveries.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':time_in_days+this.props.app_state.loc['32']+(time_in_days > 1 ? 's':''), 'details':this.props.app_state.loc['1058v']/* 'Estimated time in Days.' */, 'size':'l'})}
                </div>
            )
        }
    }

    render_bag_value(object){
        var items_to_deliver = [].concat(object['ipfs']['bag_orders'])
        if(items_to_deliver.length != 0){
            var total_amounts = this.get_total_bag_value(items_to_deliver, object)
            if(total_amounts != null){
                return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2064a']/* 'Bag Value.' */, 'details':this.props.app_state.loc['2064b']/* 'The total amount to be paid by the bag owner in the respective denominations.' */, 'size':'l'})}
                    <div style={{height: 10}}/>
                    {total_amounts.map((units, index) => (
                        <div style={{'padding': '2px 0px 2px 0px'}}>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+units['id']], 'subtitle':this.format_power_figure(units['amount']), 'barwidth':this.calculate_bar_width(units['amount']), 'number':this.format_account_balance_figure(units['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[units['id']], })}
                            </div>
                        </div>
                    ))}
                    {this.render_detail_item('0')}
                </div>
            )
            }
        }
    }

    get_total_bag_value(items_to_deliver, object){
        var obj = {}
        items_to_deliver.forEach(item => {
            // var storefront = this.props.app_state.created_store_mappings[object['e5']][item['storefront_item_id']]
            var storefront_e5 = item['storefront_item_e5'] == null ? 'E25' : item['storefront_item_e5']
            var storefront = this.get_storefront(item['storefront_item_id'], storefront_e5)
            var variant_in_store = this.get_variant_object_from_storefront(storefront, item['storefront_variant_id'])
            if(variant_in_store == null) return null
            var price_items = variant_in_store['price_data']
            
            for(var i=0; i<price_items.length; i++){
                var units = price_items[i];
                var amount = this.get_amounts_to_be_paid(units['amount'], item.purchase_unit_count)
                var token_id = units['id']

                if(obj[token_id] == null){
                    obj[token_id] = bigInt(0);
                }
                obj[token_id] = bigInt(obj[token_id]).add(amount)
            }

            if(item['storefront_options'] != null && item['storefront_options'].length > 0){
                var options = item['storefront_options']

                for(var i=0; i<item['options'].length; i++){
                    var tag_obj = item['options'][i]
                    var selected_items = []
                    for(var j=0; j<tag_obj['e'][2].length; j++){
                        var selected_item_pos = tag_obj['e'][2][j]
                        if(selected_item_pos != 0){
                            selected_items.push(selected_item_pos-1)
                        }
                    }
                    for(var k=0; k<selected_items.length; k++){
                        var selected_pos = selected_items[k]
                        var option_prices = options[i]['options'][selected_pos]['price']
                        option_prices.forEach(price => {
                            if(obj[price['id']] == null){
                                obj[price['id']] = bigInt(0)
                            }
                            obj[price['id']] = bigInt(obj[price['id']]).plus(price['amount'])
                        });
                    } 
                }
            }
        });
        
        var arr = []
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                arr.push({'id':key, 'amount':obj[key]})
            }
        }

        return arr
    }

    get_storefront(storefront_id, e5){
        // var all_stores = this.get_all_sorted_objects(this.props.app_state.created_stores)
        // var store = this.get_item_in_array_using_id(storefront_id, all_stores)
        // return store
        var item = this.props.app_state.created_store_mappings[e5] == null ? null : this.props.app_state.created_store_mappings[e5][storefront_id]
        return item
    }

    get_item_in_array_using_id(id, object_array){
        var object = object_array.find(x => x['id'] === id);
        return object
    }

    render_all_variants(object){
        var items_to_deliver = [].concat(object['ipfs']['bag_orders'])
        if(items_to_deliver.length == 0){
            items_to_deliver = [1, 2, 3]
            return(
                <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items_to_deliver.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                <div style={{height:47, width:97, 'background-color': this.props.theme['card_background_color'], 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
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
                    {items_to_deliver.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=> this.when_variant_item_clicked(item, object)}>
                            {this.render_variant_item_if_selected(item, object)}
                        </li>
                    ))}
                </ul>
                <div style={{height: 5}}/>
                {this.render_variant_details(object)}
            </div>
        )
    }

    render_variant_item_if_selected(item, object){
        // var storefront = this.get_all_sorted_objects_mappings(this.props.app_state.created_store_mappings)[item['storefront_item_id']]
        var storefront_e5 = item['storefront_item_e5'] == null ? 'E25' : item['storefront_item_e5']
        var storefront = this.get_storefront(item['storefront_item_id'], storefront_e5)
        if(storefront == null){
            return(
                <div>
                    <div style={{height:47, width:97, 'background-color': this.props.theme['card_background_color'], 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                        <div style={{'margin':'0px 0px 0px 0px'}}>
                            <img src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                        </div>
                    </div>
                </div>
            )
        }
        // var storefront = this.props.app_state.created_store_mappings[object['e5']][item['storefront_item_id']]
        var variant_in_store = this.get_variant_object_from_storefront(storefront, item['storefront_variant_id'])
        if(variant_in_store == null){
            return(
                <div>
                    <div style={{height:47, width:97, 'background-color': this.props.theme['card_background_color'], 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                        <div style={{'margin':'0px 0px 0px 0px'}}>
                            <img alt="" src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                        </div>
                    </div>
                </div>
            )
        }
        // var items = variant_in_store['price_data']
        // var composition_type = storefront['ipfs'].composition_type == null ? 'items' : this.get_selected_item(storefront['ipfs'].composition_type, 'e')

        if(this.state.selected_variant[object['id']] == item){
            return(
                <div>
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '0px 5px 3px 5px'}}/>
                    {this.render_detail_item('3',{'title':this.truncate(storefront['ipfs'].entered_title_text, 10), 'details':this.truncate(variant_in_store['variant_description'], 15),'size':'s'})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3',{'title':this.truncate(storefront['ipfs'].entered_title_text, 10), 'details':this.truncate(variant_in_store['variant_description'], 15),'size':'s'})}
                </div>
            )
        }
    }


    when_variant_item_clicked(item, object){
        var clone = structuredClone(this.state.selected_variant)
        if(clone[object['id']] == item){
            clone[object['id']] = null
            this.setState({selected_variant: clone})
        }else{
            clone[object['id']] = item
            this.setState({selected_variant: clone})
        }
        
    }


    render_variant_details(object){
        var item = this.state.selected_variant[object['id']]
        if(item != null){
            var storefront_e5 = item['storefront_item_e5'] == null ? 'E25' : item['storefront_item_e5']
            var storefront = this.get_storefront(item['storefront_item_id'], storefront_e5)
            var variant_in_store = this.get_variant_object_from_storefront(storefront, item['storefront_variant_id'])
            if(variant_in_store == null) return null
            var composition_type = storefront['ipfs'].composition_type == null ? 'items' : this.get_selected_item(storefront['ipfs'].composition_type, 'e')

            return(
                <div>
                    {this.render_detail_item('3', {'title':storefront['ipfs'].entered_title_text, 'details':this.props.app_state.loc['2048']/* 'Store ID:' */+storefront['id'] , 'size':'s'})}
                    <div style={{height: 3}}/>
                    {this.render_detail_item('3', {'title':item['purchase_unit_count'], 'details':composition_type+this.props.app_state.loc['2049']/* ' ordered.' */ , 'size':'s'})}
                    <div style={{height: 3}}/>
                    {this.render_detail_item('3', {'title':variant_in_store['variant_description'], 'details':this.props.app_state.loc['2050']/* 'Variant Description' */, 'size':'s'})}
                    <div style={{height: 3}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2051']/* 'Pick-up Location' */, 'details':storefront['ipfs'].fulfilment_location, 'size':'s'})}
                    <div style={{height: 3}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1058j']/* 'Custom Specifications.' */, 'details':(item['custom_specifications'] == null ? '...':item['custom_specifications']), 'size':'s'})}
                    {this.render_variant_image_if_any(variant_in_store)}
                    <div style={{height: 3}}/>
                    {this.render_purchase_options_if_any(item)}
                    {this.render_variant_final_prices(variant_in_store, item, object)}
                </div>
            )
        }
    }

    render_variant_final_prices(variant_in_store, item, object){
        var price_items = variant_in_store['price_data']
        var price_obj = {}
        price_items.forEach(price => {
            if(price_obj[price['id']] == null) price_obj[price['id']] = bigInt(0)
            price_obj[price['id']] = bigInt(price_obj[price['id']]).plus(price['amount'])
        });

        if(item['storefront_options'] != null && item['storefront_options'].length > 0){
            var options = item['storefront_options']

            for(var i=0; i<item['options'].length; i++){
                var tag_obj = item['options'][i]
                var selected_items = []
                for(var j=0; j<tag_obj['e'][2].length; j++){
                    var selected_item_pos = tag_obj['e'][2][j]
                    if(selected_item_pos != 0){
                        selected_items.push(selected_item_pos-1)
                    }
                }
                for(var k=0; k<selected_items.length; k++){
                    var selected_pos = selected_items[k]
                    var option_prices = options[i]['options'][selected_pos]['price']
                    option_prices.forEach(price => {
                        if(price_obj[price['id']] == null){
                            price_obj[price['id']] = bigInt(0)
                        }
                        price_obj[price['id']] = bigInt(price_obj[price['id']]).plus(price['amount'])
                    });
                } 
            }
        }

        var price_array = []
        for (const id in price_obj) {
            if (price_obj.hasOwnProperty(id)) {
                price_array.push({'id':id, 'amount':price_obj[id]})
            }
        }

        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                {price_array.map((item, index) => (
                        <div style={{'padding': '2px 0px 2px 0px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                        </div>
                    ))}
            </div>
        )
    }

    render_purchase_options_if_any(item){
        var items = item['options']
        if(items == null || items.length == 0) return;
        var storefront_options = item['storefront_options']
        if(storefront_options == null || storefront_options.length == 0) return;
        return(
                <div>
                    {items.map((item, index) => (
                        <div style={{'padding': '0px 0px 0px 0px'}}>
                            {this.render_detail_item('3', {'title':storefront_options[index]['title'], 'details':storefront_options[index]['details'], 'size':'l'})}
                            <div style={{height:3}}/>
                            <Tags font={this.props.app_state.font} page_tags_object={item} tag_size={'l'} when_tags_updated={this.when_purchase_option_tag_selected.bind(this)} theme={this.props.theme} locked={true}/>
                            <div style={{height:3}}/>
                        </div>
                    ))}
                </div>
            )
    }

    when_purchase_option_tag_selected(tag_item){
        //do nothing
    }


    render_variant_image_if_any(variant_in_store){
        if(variant_in_store['image_data']['data'] != null && variant_in_store['image_data']['data']['images'] != null && variant_in_store['image_data']['data']['images'].length > 0){
            return(
                <div style={{padding:'0px 0px 0px 0px'}}>
                    {this.render_detail_item('9', variant_in_store['image_data']['data'])}
                </div>
            )
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

    get_amounts_to_be_paid(amount, count){
        return bigInt(amount).multiply(bigInt(count))
    }


    get_variant_object_from_storefront(storefront, id){
        if(storefront == null) return null;
        for(var i=0; i<storefront['ipfs'].variants.length; i++){
            if(storefront['ipfs'].variants[i]['variant_id'] == id){
                return storefront['ipfs'].variants[i]
            }
        }
    }








    render_bag_post_responses(object){
        var he = this.props.height-50
        return(
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px'}}>
                <div style={{ 'overflow-y': 'auto', height: he, padding:'5px 0px 5px 0px'}}>
                    {this.render_bag_post_top_title(object)}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px'}}/>
                    {this.render_bag_post_sent_received_messages(object)}
                </div>
            </div>
        )
    }

    render_bag_post_top_title(object){
        // var object = this.get_bag_items()[this.props.selected_bag_item];
        return(
            <div style={{padding:'5px 5px 5px 5px'}}>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2052']/* 'In ' */+object['id'], 'details':this.props.app_state.loc['2053']/* 'Bag Responses' */, 'size':'l'})} 
            </div>
        )
    }

    render_bag_post_sent_received_messages(object){
        var middle = this.props.height-200;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.get_bag_details_responses(object))

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
                <div style={{overflow: 'auto'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 5px 2px 5px'}}>
                                <div key={index}>
                                    {this.render_bag_response_item(item, object)}
                                </div>
                            </li> 
                        ))}
                    </ul>
                </div>
            )
        }
    }

    get_bag_details_responses(object){
        // var object = this.get_bag_items()[this.props.selected_bag_item];
        if(object['event'].returnValues.p3 == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.job_responses[object['id']]
        }else{
            var filtered_responses = []
            var all_responses = this.props.app_state.job_responses[object['id']] == null ? [] : this.props.app_state.job_responses[object['id']]
            for(var i=0; i<all_responses.length; i++){
                if(all_responses[i]['applicant_id'] == this.props.app_state.user_account_id[object['e5']]){
                    filtered_responses.push(all_responses[i])
                }
            }
            return filtered_responses
        }
    }

    render_bag_response_item(item, object){
        if(item == null) return;
        var is_application_accepted = item['is_response_accepted'];

        if(this.is_applicant_in_blocked_accounts(item)){
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

        if(is_application_accepted == true){
            return(
                <div onClick={() => this.view_contract(item, object)}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2054']/* 'Expiry time from now: ' */+this.get_expiry_time(item), 'details':''+(new Date(item['application_expiry_time'] * 1000)), 'size':'l'})}
                    <div style={{height:3}}/>

                    {this.render_detail_item('3', {'title':''+(new Date(item['time']*1000)), 'details':this.get_time_diff((Date.now()/1000) - (parseInt(item['time'])))+this.props.app_state.loc['1698a']/* ' ago' */, 'size':'l'})}
                    <div style={{height:3}}/>
                    
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2055']/* 'Contract ID: ' */+item['picked_contract_id'], 'details':this.props.app_state.loc['2056']/* 'Sender ID: ' */+item['applicant_id']+', '+this.get_senders_name2(item['applicant_id'], object), 'size':'l'})}
                    <div style={{height:3}}/>
                    

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2057']/* 'Accepted' */, 'details':this.props.app_state.loc['2058']/* 'The bag owner picked this fulfilment application' */, 'size':'l'})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px'}}/>
                    {/* <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px'}}/> */}
                </div>
            )
        }else{
            return(
                <div onClick={() => this.view_contract(item, object)}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2059']/* 'Expiry time from now: ' */+this.get_expiry_time(item), 'details':''+(new Date(item['application_expiry_time'] * 1000)), 'size':'l'})}
                    <div style={{height:3}}/>

                    {this.render_detail_item('3', {'title':''+(new Date(item['time']*1000)), 'details':this.get_time_diff((Date.now()/1000) - (parseInt(item['time'])))+this.props.app_state.loc['1698a']/* ' ago' */, 'size':'l'})}
                    <div style={{height:3}}/>
                    
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2060']/* 'Contract ID: ' */+item['picked_contract_id'], 'details':this.props.app_state.loc['2061']/* 'Sender ID: ' */+item['applicant_id']+', '+ this.get_senders_name2(item['applicant_id'], object), 'size':'l'})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px'}}/>
                </div>
            )
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

    get_senders_name2(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return 'You'
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? '' : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    is_applicant_in_blocked_accounts(item){
        var blocked_account_obj = this.get_all_sorted_objects(this.props.app_state.blocked_accounts)
        var blocked_accounts = []
        blocked_account_obj.forEach(account => {
            if(!blocked_accounts.includes(account['id'])){
                blocked_accounts.push(account['id'])
            }
        });

        if(blocked_accounts.includes(item['applicant_id'])){
            return true
        }
        return false
    }

    get_applicant_alias_if_any(account, object){
        // var object = this.get_bag_items()[this.props.selected_bag_item];
        if(account == this.props.app_state.user_account_id[object['e5']]){
            return 'You'
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[account] == null ? account : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[account])
            return alias
        }
    }

    view_contract(item, object){
        // var object = this.get_bag_items()[this.props.selected_bag_item];
        if(object['event'].returnValues.p3 == this.props.app_state.user_account_id[object['e5']]){
            this.props.view_bag_application_contract(item)
        }
    }













    render_bag_message_activity(object){
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
        // var object = this.get_bag_items()[this.props.selected_bag_item];
        var focused_message_id = this.get_focused_message(object) != null ? this.get_focused_message(object) : 0
        this.props.show_add_comment_bottomsheet(object, focused_message_id, 'bag', null, this.state.entered_text)
    }
  

    render_top_title(object){
        // var object = this.get_bag_items()[this.props.selected_bag_item];
        return(
            <div style={{padding:'5px 5px 5px 5px'}}>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2052']/* 'In ' */+object['id'], 'details':this.props.app_state.loc['2064e']/* 'Bag Activity.' */, 'size':'l'})} 
            </div>
        )
    }

    constructor(props) {
        super(props);
        this.messagesEnd = React.createRef();
        this.has_user_scrolled = {}
    }

    componentDidUpdate(){
        var has_scrolled = this.has_user_scrolled[this.props.selected_bag_item]
        if(has_scrolled == null){
            this.scroll_to_bottom()
        }
    }

    render_sent_received_messages(object){
        var middle = this.props.height-240;
        if(this.get_focused_message(object) != null) middle = this.props.height-290
        // var size = this.props.size;
        // if(size == 'm'){
        //     middle = this.props.height-100;
        // }
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
                    <AnimatePresence initial={false}>
                        {items.map((item, index) => (
                            <motion.li initial={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
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

    focus_message(item, object){
        var clone = JSON.parse(JSON.stringify(this.state.focused_message))
        // var object = this.get_bag_items()[this.props.selected_bag_item];

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
        // var object = this.get_bag_items()[this.props.selected_bag_item];
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
        // var object = this.get_bag_items()[this.props.selected_bag_item];
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
                            action: () => this.props.delete_message_from_stack(item, this.props.app_state.loc['1501']/* 'bag-messages' */)
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
        this.props.notify(this.props.app_state.loc['2063']/* 'copied message to clipboard' */, 1600)
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
                                <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} onClick={()=>this.props.add_id_to_contacts(item['sender'], item, object)}>{this.get_sender_title_text(item, object)}</p>
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
                            {/* <p style={{'font-size': '8px','color': this.props.theme['primary_text_color'],'margin': '1px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'white-space': 'pre-line'}} className="fw-bold">{this.get_message_replies(item, object).length} {this.props.app_state.loc['2064']}</p> */}
                        </div>
                    </div>
                </div>
                
                {this.render_pdfs_if_any(item)}
                {this.render_response_if_any(item, object)}
            </div>
        )
        
    }

    split_text(text){
        if(text == null) return []
        var split = text.split(' ')
        var final_string = []
        split.forEach((word, index) => {
            final_string.push(word)
            if(split.length-1 != index){
                final_string.push(' ')
            }
        });
        return final_string
    }

    mask_word_if_censored(word, object){
        var all_censored_phrases = this.props.app_state.censored_keyword_phrases.concat(this.props.app_state.censored_keywords_by_my_following)
        const sender = object['author']
        const sender_e5 = object['e5']
        if(this.props.app_state.post_censored_data[sender+sender_e5] != null){
            var censor_data = this.props.app_state.post_censored_data[sender+sender_e5]
            all_censored_phrases = all_censored_phrases.concat(censor_data['censored_keywords'])
        }
        if(all_censored_phrases.includes(word.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, ''))){
            if (word == null || word.length <= 1) return word; // nothing to mask
            return word[0] + '*'.repeat(word.length - 1);
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

    truncate(source, size) {
        var firstLine = source.includes("\n") ? source.split("\n")[0] : source;
        return firstLine.length > size ? firstLine.slice(0, size - 1) + "…" : firstLine;
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

    get_sender_title_text(item, object){
        // var object = this.get_bag_items()[this.props.selected_bag_item];
        if(item['sender'] == this.props.app_state.user_account_id[item['sender_e5']]){
            return 'You'
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[item['sender']] == null ? item['sender'] : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[item['sender']])
            if(object['event'].returnValues.p3 == item['sender']){
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
        // var object = this.get_bag_items()[this.props.selected_bag_item];
        // return object['messages']
        var messages = this.props.app_state.object_messages[object['id']]==null?[]:this.props.app_state.object_messages[object['id']]
        return this.filter_messages_for_blocked_accounts(messages)
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
        // var object = this.get_bag_items()[this.props.selected_bag_item];
        var convo_id = object['id']

        var stack = this.props.app_state.stack_items
        var stacked_items = []
        for(var i=0; i<stack.length; i++){
            if(stack[i].type == this.props.app_state.loc['1501']/* 'bag-messages' */){
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
        // var object = this.get_bag_items()[this.props.selected_bag_item];
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
            var object =  this.get_item_in_array(this.get_bag_items(), this.props.selected_bag_item);
            this.show_add_comment_bottomsheet(object)
        }else{
            this.setState({entered_text: text})
        }
    }

    add_message_to_stack(object){
        var message = this.state.entered_text.trim()
        // var object = this.get_bag_items()[this.props.selected_bag_item];
        var message_id = Date.now()
        var focused_message_id = this.get_focused_message(object) != null ? this.get_focused_message(object)['message_id'] : 0
        if(message == ''){
            this.props.notify(this.props.app_state.loc['1695']/* 'Type something first.' */, 4600)
        }
        else if(this.props.app_state.user_account_id[this.props.app_state.selected_e5] == 1){
            this.props.notify(this.props.app_state.loc['1696']/* 'You need to make at least 1 transaction to participate.' */, 5200)
        }
        else{
            var tx = {'id':object['id'], type:'message', entered_indexing_tags:['send', 'message'], 'message':message, 'sender':this.props.app_state.user_account_id[this.props.app_state.selected_e5], 'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id, 'e5':object['e5'], 'sender_e5':this.props.app_state.selected_e5, 'lan':this.props.app_state.device_language}

            this.props.add_bag_message_to_stack_object(tx)

            this.setState({entered_text:''})
            this.props.notify(this.props.app_state.loc['1697']/* 'message added to stack' */, 1600)
            
            if (this.messagesEnd.current){
                this.messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }

    add_image_to_stack(image){
        var object = this.get_bag_items()[this.props.selected_bag_item];
        if(this.props.app_state.user_account_id[object['e5']] == 1){
            this.props.notify('you need to make at least 1 transaction to participate', 1200)
            return
        }
        var message_id = Date.now()
        var focused_message_id = this.get_focused_message() != null ? this.get_focused_message()['message_id'] : 0
        var message = this.state.entered_text.trim()
        var tx = {'id':object['id'], type:'image', 'message': message, entered_indexing_tags:['send', 'image'], 'image-data':{'images':[image],'pos':0}, 'sender':this.props.app_state.user_account_id[object['e5']],'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id, 'e5':object['e5']}

        this.props.add_bag_message_to_stack_object(tx)

        this.setState({entered_text:''})
        this.props.notify('message added to stack', 600)

        if (this.messagesEnd.current){
            this.messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }


    render_focus_list(object){
        // var object = this.get_bag_items()[this.props.selected_bag_item];
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
        // var object = this.get_bag_items()[this.props.selected_bag_item];

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

        var censor_list = this.props.app_state.censored_keyword_phrases.concat(this.props.app_state.censored_keywords_by_my_following)
        return(
            <div>
                <ViewGroups uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={width} show_images={this.props.show_images.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} censored_keyword_phrases={censor_list} select_deselect_tag={this.props.select_deselect_tag.bind(this)}
                
                />
            </div>
        )

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

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
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




export default BagDetailsSection;