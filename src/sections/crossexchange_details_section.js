// Copyright (c) 2023 - Present, Bry Onyoni
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
import { VList } from "virtua";

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

class CrossexchangeDetailsSection extends Component {
    
    state = {
        selected: 0, navigate_view_post_list_detail_tags_object: this.get_navigate_view_post_list_detail_tags_object_tags(),
    };


    reset_tags(){
        this.setState({navigate_view_post_list_detail_tags_object: this.get_navigate_view_post_list_detail_tags_object_tags()})
    }

    componentDidMount() {
        this.interval = setInterval(() => this.check_for_new_responses_and_messages(), this.props.app_state.details_section_syncy_time);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    check_for_new_responses_and_messages() {
        if(this.props.selected_crossexchang_item != null){
            var object = this.get_item_in_array(this.get_crossexchange_items(), this.props.selected_crossexchang_item);
            if(object == null) return;
            this.props.get_exchange_event_data(object['id'], object['e5'])
            this.props.get_moderator_event_data(object['id'], object['e5'])
        }
    }

    get_navigate_view_post_list_detail_tags_object_tags(){
        var obj = {
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e',this.props.app_state.loc['2028']/* 'metadata' */, 'e.'+this.props.app_state.loc['2119']/* 'e.events' */, 'e.'+this.props.app_state.loc['2120']/* 'e.moderator-events' */],[1]
          ],
        }

        obj[this.props.app_state.loc['2119']/* events */] = [
            ['xor', 'e', 1], [this.props.app_state.loc['2119']/* 'events' *//* , this.props.app_state.loc['2121'] *//* 'transfers' */, this.props.app_state.loc['2338']/* 'exchange-transfers' */, this.props.app_state.loc['2339']/* 'updated-balances' */, this.props.app_state.loc['2340']/* 'updated-exchange-ratios' */, this.props.app_state.loc['2341']/* 'modify-exchange' *//* ,this.props.app_state.loc['2342'] *//* 'freeze-unfreeze' */], [1], [1]
        ]
        obj[this.props.app_state.loc['2120']/* moderator-events */] = [
            ['xor', 'e', 1], [this.props.app_state.loc['2120']/* 'moderator-events' */, this.props.app_state.loc['2066']/* 'modify-moderators' */, this.props.app_state.loc['2067']/* 'interactable-checkers' */, this.props.app_state.loc['2068']/* 'interactable-accounts' */, this.props.app_state.loc['2069']/* 'block-accounts' */], [1], [1]
        ]

        return obj
    }





    render(){
        return(
            <div ref={(el) => (this.screen = el)}>
                {this.render_posts_list_detail()}
            </div>
        )
    }

    render_posts_list_detail(){
        if(this.props.selected_crossexchange_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_post_details_section()}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 0px 0px', 'max-width':'470px'}}>
                        <Tags ref={c => this.bottom_tags = c} app_state={this.props.app_state} font={this.props.app_state.font} page_tags_object={this.state.navigate_view_post_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_post_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
    }

    render_empty_detail_object(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height - 70
        return(
            <div>
                <div style={{height:he, 'background-color': 'transparent', 'border-radius': '15px','padding':'10px 5px 5px 10px','display': 'flex', 'align-items':'center','justify-content':'center','margin':'0px 0px 10px 0px'}}>
                    <img alt="" src={this.props.app_state.theme['letter']} style={{height:70 ,width:'auto'}} />
                </div>
            </div>
        )
    }

    when_navigate_view_post_list_detail_tags_object_updated(tag_obj){
        this.setState({navigate_view_post_list_detail_tags_object: tag_obj})
    }

    get_item_in_array(object_array, id){
        var object = object_array.find(x => x['e5_id'] === id);
        return object
    }

    render_post_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_post_list_detail_tags_object, this.state.navigate_view_post_list_detail_tags_object['i'].active)
        var object = this.get_item_in_array(this.get_crossexchange_items(), this.props.selected_crossexchange_item);
        
        if(object == null || object['ipfs'] == null){
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
        else if(selected_item == this.props.app_state.loc['2121']/* 'transfers' */){
            return(
                <div key={selected_item}>
                    {this.render_transfer_logs(object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2340']/* 'updated-exchange-ratios' */){
            return(
                <div key={selected_item}>
                    {this.render_updated_exchange_ratio_logs(object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2341']/* 'modify-exchange' */){
            return(
                <div key={selected_item}>
                    {this.render_modify_exchange_logs(object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2338']/* 'exchange-transfers' */){
            return(
                <div key={selected_item}>
                    {this.render_exchange_transfers_logs(object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2339']/* 'updated-balances' */){
            return(
                <div key={selected_item}>
                    {this.render_update_balance_logs(object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2342']/* 'freeze-unfreeze' */){
            return(
                <div key={selected_item}>
                    {this.render_freeze_unfreeze_logs(object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2066']/* 'modify-moderators' */){
            return(
                <div key={selected_item}>
                    {this.render_modify_moderator_logs(object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2067']/* 'interactable-checkers' */){
            return(
                <div key={selected_item}>
                    {this.render_interactable_checker_logs(object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2068']/* 'interactable-accounts' */){
            return(
                <div key={selected_item}>
                    {this.render_interactable_accounts_logs(object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2069']/* 'block-accounts' */){
            return(
                <div key={selected_item}>
                    {this.render_blocked_accounts_logs(object)}
                </div>
            )
        }
        
    }

    get_crossexchange_items(){
        return this.props.get_crossexchange_items('')
    }










    render_line_loader_if_loading(){
        const styles = {
                skeletonBox: {
                display: 'block',
                width: '100%',
                height: '6px',
                borderRadius: '3px',
                lineHeight: '0',
                margin: 0,
            },
        };
        return(
            <AnimatePresence initial={true}>
                <motion.div key={'line_loader'} initial={{ opacity: 0, scale:0.95 }} animate={{ opacity: 1, scale:1 }} exit={{ opacity: 0, scale:0.95 }} transition={{ duration: 0.3 }}
                style={{height:'6px', 'margin':'0px 15px 3px 15px', overflow: 'hidden', borderRadius: '3px',}}>
                    <SkeletonTheme borderRadius={'3px'} baseColor={this.props.theme['loading_base_color']} highlightColor={this.props.theme['loading_highlight_color']}>
                        <Skeleton style={styles.skeletonBox}/>
                    </SkeletonTheme>
                </motion.div>
            </AnimatePresence>
        )
    }

    render_post_main_details_section(object){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-50
        var size = this.props.screensize
        var item = this.get_post_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects
        const target_type = this.get_selected_item2(object['ipfs'].new_exchange_or_certificate_target_title_tags_object, 'e')
        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 2px 10px', 'padding':'0px 15px 0px 15px'}}>
                <div style={{ 'overflow-y': 'auto', 'overflow-x': 'hidden', height: he, padding:'0px 0px 0px 0px'}}>
                    {object['hidden'] == true && (
                        <div>
                            <div style={{ height: 10 }} />
                            {this.render_line_loader_if_loading()}
                        </div>
                    )}
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div onClick={() => this.copy_id_to_clipboard(object)}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{height: 10}}/>
                    {this.render_object_views(object)}
                    {this.show_moderator_note_if_any(object)}
                    {this.render_post_state(object)}
                    <div onClick={() => this.add_to_contacts2(object)}>
                        {this.render_detail_item('3', {'title':''+this.get_senders_name(object['author'], object), 'details':this.props.app_state.loc['2070']/* 'Author' */, 'size':'l'})}
                    </div>
                    <div style={{height: 10}}/>
                    
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['570']/* 'Access Rights' */, 'title':this.get_access_rights_status(object['access_rights_enabled'])})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', item['exchange_authority'])}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('0')}

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['buy_limit'])}
                    </div>
                    <div style={{height: 10}}/>
                    
                    {target_type == 1/* exchange */ && (
                        <div>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                                {this.render_detail_item('2', item['sell_limit'])}
                            </div>
                        </div>
                    )}

                    {target_type == 2/* certificate */ && (
                        <div>
                            {this.render_detail_item('3', item['sell_limit_proportion'])}
                        </div>
                    )}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', item['minimum_transactions_between_swap'])}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', item['minimum_time_between_swap'])}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', item['minimum_transactions_for_first_buy'])}
                    <div style={{height: 10}}/>

                    {this.render_revoke_author_privelages_event(object)}
                    <div style={{height: 10}}/>

                    {this.render_price_of_token(object)}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3108m']/* 'The available balances for fulfilling any swap action.' */, 'title':this.props.app_state.loc['3108l']/* 'Current Exchange\'s Liquidity' */})}
                    <div style={{height: 10}}/>
                    
                    {target_type == 1/* exchange */ && (
                        <div>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                                {this.render_detail_item('2', item['token_starting_liquidity'])}
                            </div>
                        </div>
                    )}

                    {target_type == 2/* certificate */ && (
                        <div>
                            {this.render_detail_item('3', item['certificate_starting_liquidity'])}
                        </div>
                    )}
                    <div style={{height: 10}}/>

                    {this.render_buy_token_uis(object)}

                    {this.render_detail_item('0')}

                    {this.render_item_data(items, object)}
                    {this.render_item_images(object)}
                    {this.render_pdf_files_if_any(object)}
                    {this.render_zip_files_if_any(object)}
                    {this.render_markdown_if_any(object)}


                    {this.render_swap_token_button(object)}

                    {this.render_edit_object_button(object)}

                    {this.render_exchange_transfer_button(object)}

                    {this.render_exchange_deposit_button(object)}

                    {this.render_moderator_button(object)}

                    {this.render_auth_modify_button(object)}

                    {this.render_pin_post_button(object)}

                    {this.render_follow_unfollow_author_button(object)}
                    
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_object_views(object){
        const e5_id = object['e5_id']
        const hits = this.props.app_state.object_view_data[e5_id] == null ? 0 : this.props.app_state.object_view_data[e5_id]['all_hits']
        if(hits > 0){
            return(
                <div>
                    <div onClick={() => this.when_object_views_clicked(e5_id)}>
                        {this.props.render_object_view_count_message(hits, e5_id, this.get_object_views_footer(object))}
                    </div>
                    <div style={{height: 10}}/>
                    {this.render_object_views_chart_if_enabled(e5_id)}
                </div>
            )
        }
    }

    get_object_views_footer(object){
        const my_country =  this.props.app_state.obligation_subscriptions[this.props.app_state.accounts[this.props.app_state.selected_e5].address] != null ? this.props.app_state.obligation_subscriptions[this.props.app_state.accounts[this.props.app_state.selected_e5].address].my_original_country : this.props.app_state.device_country;

        const my_city = this.props.app_state.obligation_subscriptions[this.props.app_state.accounts[this.props.app_state.selected_e5].address] != null ? this.props.app_state.obligation_subscriptions[this.props.app_state.accounts[this.props.app_state.selected_e5].address].my_original_city : this.props.app_state.device_city;

        const post_country = object['ipfs']['my_country']
        const post_city = object['ipfs']['my_city']

        if(post_country == null || post_city == null) return;

        if(post_country == my_country) return;

        return `${post_city} • ${post_country}`
    }

    when_object_views_clicked(e5_id){
        const clone = (this.state.viewed_objects_views_full || []).slice()
        const pos = clone.indexOf(e5_id)
        if(pos == -1){
            clone.push(e5_id)
        }
        else {
            clone.splice(pos, 1)
        }
        this.setState({viewed_objects_views_full: clone})
    }

    render_object_views_chart_if_enabled(e5_id){
        if(this.state.viewed_objects_views_full != null && this.state.viewed_objects_views_full.includes(e5_id)){
            const view_data = this.props.app_state.object_view_data[e5_id]['entries']
            const sorted_view_data = this.sortByAttributeDescending(view_data, 'time').reverse()//from least recent to most recent
            const time_filter_tags_object = this.state.selected_time_filter_chart_tags_object2 || this.selected_time_filter_chart_tags_object()
            const filter_time = this.get_filter_end_time(time_filter_tags_object)
            const upload_data_filtered = sorted_view_data.filter(function (trend_hit) {
                return (trend_hit['time'] > filter_time)
            });
            const upload_data_dps = this.props.get_upload_data_datapoints(upload_data_filtered)
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3107d']/* 'Cross-Exchange Views.' */, 'details':this.props.app_state.loc['3107e']/* 'Chart containing the cross-exchange\'s views over time.' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':upload_data_dps.dps, 'start_time': upload_data_dps.starting_time, 'end_time':upload_data_dps.ending_time})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['a2527co']/* 'Y-Axis: Views' */, 'details':this.props.app_state.loc['2391']/* 'X-Axis: Time' */, 'size':'s'})}

                    <Tags font={this.props.app_state.font} page_tags_object={time_filter_tags_object} tag_size={'l'} when_tags_updated={this.when_selected_time_filter_chart_tags_object_updated2.bind(this)} theme={this.props.theme}/>

                    {this.render_detail_item('0')}
                    {this.props.render_object_metadata_if_exists(e5_id)}
                </div>
            )
        }
    }

    when_selected_time_filter_chart_tags_object_updated2(tag_obj){
        this.setState({selected_time_filter_chart_tags_object2: tag_obj})
    }

    selected_time_filter_chart_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','1h','24h', '7d', '30d', '6mo', this.props.app_state.loc['1416']/* 'all-time' */], [6]
            ],
        };
    }

    get_filter_end_time(selected_time_filter_chart_tags_object){
        var selected_item = this.get_selected_item(selected_time_filter_chart_tags_object, selected_time_filter_chart_tags_object['i'].active)

        var filter_value = 60*60
        if(selected_item == '1h'){
            filter_value = 60*60
        }
        else if(selected_item == '24h'){
            filter_value = 60*60*24
        }
        else if(selected_item == '7d'){
            filter_value = 60*60*24*7
        }
        else if(selected_item == '30d'){
            filter_value = 60*60*24*30
        }
        else if(selected_item == '6mo'){
            filter_value = 60*60*24*30*6
        }
        else if(selected_item == this.props.app_state.loc['1416']/* 'all-time' */){
            filter_value = 10**10
        }

        return Date.now() - (filter_value * 1000)
    }

    copy_id_to_clipboard(object){
        navigator.clipboard.writeText('e'+object['id'])
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
                    if(!this.is_post_anonymous(object))hit_count++
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
        if(this.is_post_anonymous(object)) return;
        this.props.add_id_to_contacts(object['author'], object)
    }

    render_post_state(object){
        const country_data = this.props.app_state.country_data
        const object_country = object['ipfs'].device_country
        const country_item_data = country_data.find(e => e.name === object_country)
        if(country_item_data != null && !this.is_post_anonymous(object)){
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
        const me = this.props.app_state.user_account_id[object['e5']] || 1
        if(object['author'] == me) return;

        var author_id = object['event'].returnValues.p5
        var follow_id = object['e5'] + ':' + author_id
        var followed_accounts = this.props.app_state.followed_accounts

        if(this.is_post_anonymous(object)) return;

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
        if(data == null) return;
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
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3107c']/* Pin the cross-exchange to your feed.' */, 'title':this.props.app_state.loc['3107b']/* '📌 Pin Cross-Exchange' */})}
                <div style={{height:10}}/>
                <div onClick={()=> this.when_pin_post_clicked(object)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3107f']/* 'Pin/Unpin Cross-Exchange' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_pin_post_clicked(object){
        this.props.pin_crossexchange(object)
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












    get_post_details_data(object){
        var tags = object['ipfs'] == null ? ['Cross-Exchange'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Cross-Exchange ID' : object['ipfs'].entered_title_text
        var age = object['event'].returnValues.p5
        var time = object['event'].returnValues.p4

        var number = this.is_post_anonymous(object) ? '???,???,???' : number_with_commas(age)
        var relativepower = this.is_post_anonymous(object) ? '???' : this.get_time_difference(time)
        var objectid = this.is_post_anonymous(object) ? '???' : number_with_commas(object['id'])


        const is_socket_job = false
        const title_image = this.props.app_state.e5s[object['e5']].e5_img
        const title_space = '• '

        var selected_obj_root_config = object['data'][0];
        var selected_obj_config = object['data'][1];
        var selected_obj_ratio_config = object['data'][2];
        var is_auth_main_contract = selected_obj_config[9] == 2 ? this.props.app_state.loc['1810']/* '2 (Main Contract)' */: (selected_obj_config[9])

        const target_type = this.get_selected_item(object['ipfs'].new_exchange_or_certificate_target_title_tags_object, 'e')

        const token_target = object['ipfs'].token_target
        const exchange_transfer_amount = selected_obj_ratio_config[2/* <2>token_exchange_liquidity/total_supply */]
        
        const selected_certificate = object['ipfs'].selected_certificate
        const proportion_amount = selected_obj_ratio_config[2/* <2>token_exchange_liquidity/total_supply */]

        const starting_liquidity_stake_text = this.props.app_state.loc['3108j']/* 'Starting Liquidity Stake: $' */.replace('$', this.format_proportion(proportion_amount))
        const model_data = selected_certificate == null ? null : selected_certificate['ipfs']['model_data']
        const class_name = selected_certificate == null ? '' : model_data['class_name']
        const time2 = selected_certificate == null ? null : selected_certificate['ipfs']['depth_item']['time']
        const footer = selected_certificate == null ? '' : this.props.app_state.loc['3098y']/* 'Minted on $' */.replace('$', (new Date(time2 * 1000).toLocaleString()))

        const default_exchange_amount_buy_limit = selected_obj_config[0]
        const default_exchange_amount_sell_limit = selected_obj_config[11]
        const minimum_time_between_swap = selected_obj_config[4]
        const minimum_transactions_between_swap = selected_obj_config[2]
        const minimum_transactions_for_first_buy = selected_obj_config[17]

        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags,'when_tapped':'select_deselect_tag'},
            'id':{'title':title_space+objectid, 'details':title, 'size':'l', 'title_image':title_image, 'border_radius':'0%', 'text_image_border_radius':'6px'},
            'age':{'style':'l', 'title':this.props.app_state.loc['1744']/* 'Block Number' */, 'subtitle':this.props.app_state.loc['2494']/* 'age' */, 'barwidth':this.get_number_width(age), 'number':`${number}`, 'barcolor':'', 'relativepower':`${relativepower} `+this.props.app_state.loc['2495']/* ago */, 'number_when_tapped':`${(new Date(time*1000).toLocaleString())}`},
            'exchange_authority': {'title':is_auth_main_contract, 'details':this.props.app_state.loc['3107g']/* 'Cross-Exchange Authority' */, 'size':'l'},

            'token_starting_liquidity':{ 'style':'l', 'title':this.props.app_state.loc['3108k']/* 'Current Liquidity' */, 'subtitle':this.format_power_figure(exchange_transfer_amount), 'barwidth':this.calculate_bar_width(exchange_transfer_amount), 'number':this.format_account_balance_figure(exchange_transfer_amount), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[token_target], 'n':exchange_transfer_amount },

            'certificate_starting_liquidity':{'title':start_and_end(class_name), 'details':starting_liquidity_stake_text, 'footer':footer, 'size':'l'},

            
            'buy_limit':{'style':'l','title':this.props.app_state.loc['1817']/* 'Mint Limit' */, 'subtitle':this.format_power_figure(default_exchange_amount_buy_limit), 'barwidth':this.calculate_bar_width(default_exchange_amount_buy_limit), 'number':this.format_account_balance_figure(default_exchange_amount_buy_limit), 'relativepower':this.props.app_state.loc['918']/* 'units' */, 'n':default_exchange_amount_buy_limit},
            
            'minimum_transactions_between_swap': {'title':minimum_transactions_between_swap, 'details':this.props.app_state.loc['330']/* 'Minimum Transactions Between Swap' */, 'size':'l'},
            'minimum_time_between_swap': {'title':this.get_time_diff(minimum_time_between_swap), 'details':this.props.app_state.loc['658']/* 'Minimum Time Between Swap' */, 'size':'l'},

            'sell_limit':{'style':'l','title':this.props.app_state.loc['328']/* 'Sell Limit' */, 'subtitle':this.format_power_figure(default_exchange_amount_sell_limit), 'barwidth':this.calculate_bar_width(default_exchange_amount_sell_limit), 'number':this.format_account_balance_figure(default_exchange_amount_sell_limit), 'relativepower':this.props.app_state.loc['918']/* 'units' */, 'n':default_exchange_amount_sell_limit},

            'sell_limit_proportion':{'title':this.format_proportion(default_exchange_amount_sell_limit), 'details':this.props.app_state.loc['653']/* 'Sell Limit' */, 'size':'l'},

            'minimum_transactions_for_first_buy': {'title':minimum_transactions_for_first_buy, 'details':this.props.app_state.loc['333']/* 'Minimum Transactions For First Buy' */, 'size':'l'},
        }
    }

    is_post_nsfw(object){
        if(object['ipfs'].get_post_nsfw_option == null) return false
        var selected_nsfw_option = this.get_selected_item2(object['ipfs'].get_post_nsfw_option, 'e')
        if(selected_nsfw_option == 1) return true
    }

    get_access_rights_status(value){
        if(value == true){
            return this.props.app_state.loc['2140']/* 'Enabled' */
        }else{
            return this.props.app_state.loc['2141']/* 'Disabled' */
        }
    }








    render_price_of_token(selected_object){
        const target_type = this.get_selected_item2(selected_object['ipfs'].new_exchange_or_certificate_target_title_tags_object, 'e')

        var input_amount = target_type == 1/* exchange */ ? 1 : bigInt('1e16')
        var input_reserve_ratio = selected_object['data'][2][0]
        var output_reserve_ratio = selected_object['data'][2][1]
        var price = this.calculate_price(input_amount, input_reserve_ratio, output_reserve_ratio, selected_object)
        var buy_tokens = [].concat(selected_object['data'][3])
        var buy_amounts = [].concat(selected_object['data'][4])
        var buy_depths = [].concat(selected_object['data'][5])

        const token_target = selected_object['ipfs'].token_target
        const details = target_type == 1/* exchange */ ? this.props.app_state.loc['3107j']/* 'The amount you get when you swap one unit of $' */.replace('$', this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[token_target]) : this.props.app_state.loc['3107k']/* 'The amount you get when you swap 1% stake of the certificate' */;
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':details, 'title':this.props.app_state.loc['3107i']/* 'Swap Price' */})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                        {buy_tokens.map((item, index) => (
                            <div style={{'padding': '1px'}}>
                                {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[selected_object['e5']+item], 'subtitle':this.format_power_figure(this.calculate_price_from_sell_action(buy_amounts[index], price)), 'barwidth':this.calculate_bar_width(this.calculate_price_from_sell_action(buy_amounts[index], price)), 'number':this.format_price(this.calculate_price_from_sell_action(buy_amounts[index], price)), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    calculate_price(input_amount, input_reserve_ratio, output_reserve_ratio, selected_object){
        var price = (bigInt(input_amount).times(bigInt(output_reserve_ratio))).divide(bigInt(input_reserve_ratio).plus(input_amount))
        if(price == 0){
            price = (input_amount * output_reserve_ratio) / (input_reserve_ratio + input_amount)
        }
        return price
    }

    calculate_price_from_sell_action(amount, price){
        if(amount >10**18 || price >10**18){
            return bigInt(amount).times(bigInt(price))
        }else{
            return amount*price
        }
    }

    format_price(price_value){
        if(price_value > 1000){
            return this.format_account_balance_figure(price_value)
        }
        else{
            let roundedNumber = parseFloat(price_value.toFixed(7));
            return roundedNumber
        }
    }








    render_edit_object_button(object){
        var my_account = this.props.app_state.user_account_id[object['e5']]

        if(object['author'] == my_account){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3107']/* ✏️ Edit Indexed Cross-Exchange' */, 'details':this.props.app_state.loc['3107a']/* 'Change the basic details for your Indexed Cross-Exchange' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.props.open_edit_object('15', object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2520']/* 'Perform Action' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    render_revoke_author_privelages_event(object){
        var events = this.get_moderator_item_logs(object, 'revoke_privelages')

        if(object['id'] == 5) return;

        if(events.length != 0){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2566']/* 'Author Moderator Privelages Disabled' */, 'details':this.props.app_state.loc['2567']/* 'Author of Object is not a Moderator by default' */, 'size':'l'})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2568']/* 'Author Moderator Privelages Enabled' */, 'details':this.props.app_state.loc['2569']/* 'Author of Object is a Moderator by default' */, 'size':'l'})}
                </div>
            )
        }
    }

    render_exchange_transfer_button(object){
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        var contract_config = object['data'][1]
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if(object['id'] != 5 && contract_config[9/* exchange_authority */] == my_account && object['hidden'] == false){
            return(
                <div>
                    {this.render_detail_item('0')}         
                    
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2363']/* 'Exchange Transfer' */, 'details':this.props.app_state.loc['3098l']/* 'Transfer the exchange\'s account balances to a specified target.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_buy_token_uis(object)}
                    <div style={{height:10}}/>
                    
                    <div onClick={()=>this.props.open_exchange_transfers_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2365']/* 'Run Transfers' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    render_buy_token_uis(object){
        var buy_tokens = [].concat(object['data'][3])
        var buy_amounts = [].concat(object['exchanges_balances'])
        var buy_depths = [].concat(object['data'][5])
        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                <div style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                    {buy_tokens.map((item, index) => (
                        <div style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+item], 'number':buy_amounts[index], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                            {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+item], 'subtitle':this.format_power_figure(buy_amounts[index]), 'barwidth':this.calculate_bar_width(buy_amounts[index]), 'number':this.format_account_balance_figure(buy_amounts[index]), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                        </div>
                    ))}
                </div>
            </div>
            
        )
    }

    render_moderator_button(object){
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if(object['id'] != 5 && (object['moderators'].includes(my_account) || object['event'].returnValues.p3 == my_account)){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2369']/* 'Perform Moderator Actions' */, 'details':this.props.app_state.loc['2576']/* 'Set an accounts access rights, moderator privelages or block an account' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.props.open_moderator_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2370']/* 'Perform Action' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    render_exchange_deposit_button(object){
        if(object['id'] != 3 && object['hidden'] == false){
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2447bc']/* '💵 Exchange Deposit' */, 'details':this.props.app_state.loc['2447bd']/* 'Deposit tokens in the exchange\'s account.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_exchange_deposit_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2447be']/* 'Deposit' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    open_exchange_deposit_ui(object){
        this.props.show_exchange_deposit_bottomsheet(object)
    }

    render_auth_modify_button(object){
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        var contract_config = object['data'][1]
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if(object['id'] != 3 && contract_config[9/* exchange_authority */] == my_account){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3107n']/* '🛠️ Modify Cross-Exchange' */, 'details':this.props.app_state.loc['2362']/* 'Modify the configuration of the exchange directly.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.props.open_modify_token_ui(object)}>
                        {this.render_detail_item('5', {'text':'Modify Exchange', 'action':''})}
                    </div>
                </div>
            )
        }
    }

    render_swap_token_button(selected_object){
        if(selected_object['hidden'] == true || selected_object['interactible_hidden'] == true){
            return;
        }
        return(
            <div>
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3107l']/* ⇄ Swap Tokens' */, 'details':this.props.app_state.loc['3107m']/* 'Initiate a cross-exchange swap action for or against the targeted token.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={()=>this.props.show_crossexchange_swap_bottomsheet(selected_object)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2520']/* 'Perform Action' */, 'action':''})}
                </div>
            </div>
        )

    }










    render_transfer_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2407']/* 'In Exchange ' */ + object['id'], 'details': this.props.app_state.loc['2412']/* 'Your Transfer Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                    {this.render_contract_transfer_item_logs(object)}
                </div>
            </div>
        )
    }

    get_item_logs(object, event) {
        if (this.props.app_state.exchange_events[object['id']] == null) {
            return []
        }
        return this.props.app_state.exchange_events[object['id']][event]
    }

    render_contract_transfer_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.get_item_logs(object, 'transfer'))
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
                <div style={{ }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} >
                                    {this.render_contract_transfer_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_contract_transfer_item_clicked(index){
        if (this.state.selected_contract_transfer_event_item == index) {
            this.setState({ selected_contract_transfer_event_item: null })
        } else {
            this.setState({ selected_contract_transfer_event_item: index })
        }
    }

    render_contract_transfer_event_item(item, object, index){
        var exchange_id = item['event'].returnValues.p1;
        var number = item['event'].returnValues.p4
        var depth = item['event'].returnValues.p7
        number = this.get_actual_number(number, depth)
        var from_to = item['action'] == 'Sent' ? this.props.app_state.loc['2419']/* 'To: ' */+this.get_sender_title_text(item['event'].returnValues.p3, object) : this.props.app_state.loc['2420']/* 'From: ' */+this.get_sender_title_text(item['event'].returnValues.p2, object)
        if (this.state.selected_contract_transfer_event_item == index) {
            return (
                <div>
                    <div onClick={() => this.when_contract_transfer_item_clicked(index)}>
                        {this.render_detail_item('3', { 'title': from_to, 'details': this.props.app_state.loc['2421']/* 'Action: ' */+item['action'], 'size': 'l' })}
                    </div>
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+exchange_id], 'number':number, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id]})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+exchange_id], 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], })}
                    </div>

                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item['event'].returnValues.p5), 'details': this.props.app_state.loc['2198']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item['event'].returnValues.p6, 'details': this.props.app_state.loc['2206']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div onClick={() => this.when_contract_transfer_item_clicked(index)}>
                    {this.render_detail_item('3', { 'title': from_to, 'details': this.format_account_balance_figure(number)+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], 'size': 'l' })}
                </div>
            )
        }
    }

    get_sender_title_text(sender, object) {
        if (sender == this.props.app_state.user_account_id[object['e5']]) {
            return this.props.app_state.loc['1694']/* 'You' */
        } else {
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    get_actual_number(number, depth){
        if(bigInt(depth).greater(1_000_000)){
            return bigInt(number).toString().toLocaleString('fullwide', {useGrouping:false})
        }
        var p = (bigInt(depth).times(72)).toString().toLocaleString('fullwide', {useGrouping:false})
        var depth_vaule = bigInt(('1e'+p))
        return (bigInt(number).times(depth_vaule)).toString().toLocaleString('fullwide', {useGrouping:false})
    }











    render_updated_exchange_ratio_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2407']/* 'In Exchange '  */+ object['id'], 'details': this.props.app_state.loc['2408']/* 'Updated Exchange Ratio Events' */, 'size': 'l' })}
                    </div>
                    
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                    {this.render_updated_exchange_ratio_item_logs(object)}
                </div>
            </div>
        )
    }

    filter_for_my_logs(logs, p, object){
        var me = this.props.app_state.user_account_id[object['e5']] == null ? 1 : this.props.app_state.user_account_id[object['e5']]
        if(me == object['author']){
            return logs
        }else{
            var filtered_logs = []
            logs.forEach(log => {
                var account = log['returnValues'][p]
                if(me == account){
                    filtered_logs.push(log)
                }
            });
            return filtered_logs
        }
    }

    render_updated_exchange_ratio_item_logs(object){
        var middle = this.props.height - 120;
        var logs = this.get_item_logs(object, 'exchange_ratio')
        var items = [].concat(this.filter_for_my_logs(logs, 'p3', object))
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
                <div style={{  }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index}>
                                    {this.render_exchange_ratio_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_exchange_ratio_item_clicked(index){
        if (this.state.selected_exchange_ratio_event_item == index) {
            this.setState({ selected_exchange_ratio_event_item: null })
        } else {
            this.setState({ selected_exchange_ratio_event_item: index })
        }
    }

    render_exchange_ratio_event_item(item, object, index){
        var action_obj = {'0':this.props.app_state.loc['2409']/* 'Buy' */, '1':this.props.app_state.loc['2410']/* 'Sell' */}
        var action = action_obj[item.returnValues.p2]
        var token_exchange_liquidity = item.returnValues.p4
        var updated_exchange_ratio_x = item.returnValues.p5
        var updated_exchange_ratio_y = item.returnValues.p6
        var parent_tokens_balance = item.returnValues.p7
        var amount = item.returnValues.p8
        if (this.state.selected_exchange_ratio_event_item == index) {
            return (
                <div>
                    <div onClick={() => this.when_exchange_ratio_item_clicked(index)}>
                        {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object)/*  */, 'details': this.props.app_state.loc['2400']/* 'Swapping Account ID' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': action, 'details': this.props.app_state.loc['2400']/* 'Action' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2401']/* 'Amount Swapped' */, 'number':amount, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1]})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2401']/* 'Amount Swapped' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], })}
                    </div>
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2402']/* 'Updted Token Exchange Liquidity' */, 'number':token_exchange_liquidity, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1]})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2402']/* 'Updted Token Exchange Liquidity' */, 'subtitle': this.format_power_figure(token_exchange_liquidity), 'barwidth': this.calculate_bar_width(token_exchange_liquidity), 'number': this.format_account_balance_figure(token_exchange_liquidity), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], })}
                    </div>
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2403']/* 'Updated Exchange Ratio X' */, 'number':updated_exchange_ratio_x, 'relativepower':this.props.app_state.loc['92']/* 'units' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2403']/* 'Updated Exchange Ratio X' */, 'subtitle': this.format_power_figure(updated_exchange_ratio_x), 'barwidth': this.calculate_bar_width(updated_exchange_ratio_x), 'number': this.format_account_balance_figure(updated_exchange_ratio_x), 'barcolor': '', 'relativepower': this.props.app_state.loc['92']/* 'units' */, })}
                    </div>
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2404']/* 'Updated Exchange Ratio Y' */, 'number':updated_exchange_ratio_y, 'relativepower':this.props.app_state.loc['92']/* 'units' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2404']/* 'Updated Exchange Ratio Y' */, 'subtitle': this.format_power_figure(updated_exchange_ratio_y), 'barwidth': this.calculate_bar_width(updated_exchange_ratio_y), 'number': this.format_account_balance_figure(updated_exchange_ratio_y), 'barcolor': '', 'relativepower': this.props.app_state.loc['92']/* 'units' */, })}
                    </div>
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', {'title':this.format_exchange_ratio(updated_exchange_ratio_x, updated_exchange_ratio_y), 'details':this.props.app_state.loc['2405']/* 'Updated Exchange Ratios X:Y' */, 'size':'l'},)}
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p9), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p10, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div onClick={() => this.when_exchange_ratio_item_clicked(index)}>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object)/*  */, 'details': this.format_account_balance_figure(amount)+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], 'size': 'l' })}
                </div>
            )
        }
    }












    render_modify_exchange_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2407']/* 'In Exchange ' */ + object['id'], 'details': this.props.app_state.loc['2414']/* 'Exchange Modification Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                    {this.render_exchange_modification_item_logs(object)}
                </div>
            </div>
        )
    }

    render_exchange_modification_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.get_item_logs(object, 'modify'))
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
                <div style={{  }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_modify_item_clicked(index)}>
                                    {this.render_modified_exchange_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_modify_item_clicked(index){
        if (this.state.selected_modify_event_item == index) {
            this.setState({ selected_modify_event_item: null })
        } else {
            this.setState({ selected_modify_event_item: index })
        }
    }

    render_modified_exchange_event_item(item, object, index){
        if (this.state.selected_modify_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': this.props.app_state.loc['2415']/* 'Modifier' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_target_identifier(item), 'details': this.props.app_state.loc['2416']/* 'Targeted Modify Item' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.get_value_ui(item, object)}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['2198']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p7, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_target_identifier(item), 'details': this.props.app_state.loc['2416']/* 'Targeted Modify Item' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                </div>
            )
        }
    }

    get_target_identifier(item) {
        var obj = this.get_contract_modify_details()

        var target_array_pos = item.returnValues.p3
        var target_array_item = item.returnValues.p4

        if(target_array_pos == 4/* contract_entry_amounts */){
            return 'price'
        }
        var selected_key = ''
        for (let key in obj) {
            if (obj[key]['position'][0] == target_array_pos && obj[key]['position'][1] == target_array_item) {
                selected_key = key
                break;
            }
        }

        return selected_key
    }

    get_value_ui(item, object) {
        var identifier = this.get_target_identifier(item)
        var number = item.returnValues.p5
        
        var target_array_pos = item.returnValues.p3
        var target_array_item = item.returnValues.p4

        var type = identifier == 'price' ? 'number' : this.get_contract_modify_details()[identifier]['picker']
        var exchange = object['data']
        var exchange_id = exchange[3][target_array_item]

        var title = identifier == 'price' ? this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+exchange_id] : identifier

        if (type == 'proportion') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.format_proportion(number), 'details': this.props.app_state.loc['1013']/* 'proportion' */, 'size': 'l' })}
                </div>
            )
        }
        else if (type == 'time') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_time_diff(number), 'details': this.props.app_state.loc['1014']/* 'duration' */, 'size': 'l' })}
                </div>
            )
        }
        else if (type == 'number') {
            return (
                <div>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':title, 'number':number, 'relativepower':this.props.app_state.loc['1430']/* 'units' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': title, 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': this.props.app_state.loc['1430']/* 'units' */, })}
                    </div>
                </div>
            )
        }
        else if (type == 'tag') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_tag_selected_item(identifier, number), 'details': this.props.app_state.loc['1883']/* 'value: ' */ + number, 'size': 'l' })}
                </div>
            )
        }
        else if (type == 'id') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': number, 'details': this.props.app_state.loc['2417']/* 'target ID' */, 'size': 'l' })}
                </div>
            )
        }
    }

    get_tag_selected_item(title, number) {
        var obj = { 'Auto Wait': { 0: 'no', 1: 'yes' }, 'Moderator Modify Privelage': { 1: 'modifiable', 0: 'non-modifiable' }, 'Unlimited Extend Contract Time': { 1: 'enabled', 0: 'disabled' }, 'Bounty Limit Type': { 0: 'relative', 1: 'absolute' }, 'Force Exit Enabled': { 1: 'enabled', 0: 'disabled' }, 'Halving type': { 0: 'fixed', 1: 'spread' }, 'Block Limit Sensitivity': { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' } }

        obj[this.props.app_state.loc['73']]/* 'Auto Wait' */ = {0:'no', 1:'yes'}
        obj[this.props.app_state.loc['75']]/* 'Moderator Modify Privelage' */ = {1:'modifiable', 0:'non-modifiable'} 
        obj[this.props.app_state.loc['76']]/* 'Unlimited Extend Contract Time' */ = {1:'enabled', 0:'disabled'} 
        obj[this.props.app_state.loc['78']]/* 'Bounty Limit Type' */ = {0:'relative', 1:'absolute'}
        obj[this.props.app_state.loc['79']]/* 'Force Exit Enabled' */ = {1:'enabled', 0:'disabled'} 
        obj[this.props.app_state.loc['336']]/* 'Halving type' */ = {0:'fixed', 1:'spread'} 
        obj[this.props.app_state.loc['341']]/* 'Block Limit Sensitivity' */ = {1:'1', 2:'2', 3:'3', 4:'4', 5:'5'}


        return obj[title][number]
    }

    get_contract_modify_details() {
        var obj = {
            'Buy Limit':{'position':[1,0], 'picker':'number', 'powerlimit':63},
            'Trust Fee':{'position':[1,7], 'picker':'proportion', 'powerlimit':9}, 
            'Sell Limit':{'position':[1,11], 'picker':'number', 'powerlimit':63}, 
            'Minimum Time Between Swap':{'position':[1,4], 'picker':'time', 'powerlimit':63}, 
            'Minimum Transactions Between Swap':{'position':[1,2], 'picker':'number', 'powerlimit':63}, 
            'Minimum Blocks Between Swap':{'position':[1,3], 'picker':'number', 'powerlimit':63}, 
            'Minimum Entered Contracts Between Swap':{'position':[1,13], 'picker':'number', 'powerlimit':63}, 
            'Minimum Transactions For First Buy':{'position':[1,17], 'picker':'number', 'powerlimit':63}, 
            'Minimum Entered Contracts For First Buy':{'position':[1,18], 'picker':'number', 'powerlimit':63}, 
            'Block Limit':{'position':[1,1], 'picker':'number', 'powerlimit':63}, 
            'Halving type':{'position':[1,15], 'picker':'tag', 'powerlimit':63}, 
            'Maturity Limit':{'position':[1,16], 'picker':'number', 'powerlimit':63}, 
            'Internal Block Halving Proportion':{'position':[1,5], 'picker':'proportion', 'powerlimit':9}, 
            'Block Limit Reduction Proportion':{'position':[1,6], 'picker':'proportion', 'powerlimit':9}, 
            'Block Reset Limit':{'position':[1,8], 'picker':'number', 'powerlimit':63}, 
            'Block Limit Sensitivity':{'position':[1,12], 'picker':'tag', 'powerlimit':63}, 
            'Exchange Ratio X':{'position':[2,0], 'picker':'number', 'powerlimit':63}, 
            'Exchange Ratio Y':{'position':[2,1], 'picker':'number', 'powerlimit':63},
        }

        obj[this.props.app_state.loc['326']]/* 'Buy Limit' */ = {'position':[1,0], 'picker':'number', 'powerlimit':63}
        obj[this.props.app_state.loc['327']]/* 'Trust Fee' */ = {'position':[1,7], 'picker':'proportion', 'powerlimit':9}
        obj[this.props.app_state.loc['328']]/* 'Sell Limit' */ = {'position':[1,11], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['329']]/* 'Minimum Time Between Swap' */ = {'position':[1,4], 'picker':'time', 'powerlimit':63}
        obj[this.props.app_state.loc['330']]/* 'Minimum Transactions Between Swap' */ = {'position':[1,2], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['331']]/* 'Minimum Blocks Between Swap' */ = {'position':[1,3], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['332']]/* 'Minimum Entered Contracts Between Swap' */ = {'position':[1,13], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['333']]/* 'Minimum Transactions For First Buy' */ = {'position':[1,17], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['334']]/* 'Minimum Entered Contracts For First Buy' */ = {'position':[1,18], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['335']]/* 'Block Limit' */ = {'position':[1,1], 'picker':'number', 'powerlimit':63}
        obj[this.props.app_state.loc['336']]/* 'Halving type' */ = {'position':[1,15], 'picker':'tag', 'powerlimit':63}
        obj[this.props.app_state.loc['337']]/* 'Maturity Limit' */ = {'position':[1,16], 'picker':'number', 'powerlimit':63}
        obj[this.props.app_state.loc['338']]/* 'Internal Block Halving Proportion' */ = {'position':[1,5], 'picker':'proportion', 'powerlimit':9} 
        obj[this.props.app_state.loc['339']]/* 'Block Limit Reduction Proportion' */ = {'position':[1,6], 'picker':'proportion', 'powerlimit':9} 
        obj[this.props.app_state.loc['340']]/* 'Block Reset Limit' */ = {'position':[1,8], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['341']]/* 'Block Limit Sensitivity' */ = {'position':[1,12], 'picker':'tag', 'powerlimit':63} 
        obj[this.props.app_state.loc['395']]/* 'Exchange Ratio X' */ = {'position':[2,0], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['396']]/* 'Exchange Ratio Y' */ = {'position':[2,1], 'picker':'number', 'powerlimit':63}

        
        return obj
    }











    render_exchange_transfers_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['3098m']/* '✦ ' */ + object['id'], 'details': this.props.app_state.loc['3107h']/* 'Exchange Transfer Events.' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                    {this.render_exchange_transfer_item_logs(object)}
                </div>
            </div>
        )
    }

    render_exchange_transfer_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.get_item_logs(object, 'exchange-transfer'))
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
                <div style={{  }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index}>
                                    {this.render_exchange_transfer_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_exchange_transfer_item_clicked(index){
        if (this.state.selected_exchange_transfer_event_item == index) {
            this.setState({ selected_exchange_transfer_event_item: null })
        } else {
            this.setState({ selected_exchange_transfer_event_item: index })
        }
    }

    render_exchange_transfer_event_item(item, object, index){
        var exchange_id = item['event'].returnValues.p1;
        var number = item['event'].returnValues.p4
        var depth = item['event'].returnValues.p7
        number = this.get_actual_number(number, depth)

        var from_to = item['action'] == 'Sent' ? this.props.app_state.loc['2419']/* 'To: ' */+this.get_sender_title_text(item['event'].returnValues.p3, object) : this.props.app_state.loc['2420']/* From:  */+this.get_sender_title_text(item['event'].returnValues.p2, object)
        if (this.state.selected_exchange_transfer_event_item == index) {
            return (
                <div>
                    <div onClick={() => this.when_exchange_transfer_item_clicked(index)}>
                        {this.render_detail_item('3', { 'title': from_to, 'details': this.props.app_state.loc['2421']/* 'Action: ' */+item['action'], 'size': 'l' })}
                    </div>
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+exchange_id], 'number':number, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id]})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+exchange_id], 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], })}
                    </div>

                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item['event'].returnValues.p5), 'details':this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item['event'].returnValues.p6, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div onClick={() => this.when_exchange_transfer_item_clicked(index)}>
                    {this.render_detail_item('3', { 'title': from_to, 'details': this.format_account_balance_figure(number)+ ' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], 'size': 'l' })}
                </div>
            )
        }
    }










    render_update_balance_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['3098m']/* '✦  ' */ + object['id'], 'details': this.props.app_state.loc['2447bf']/* 'Update Balance Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                    {this.render_update_balance_item_logs(object)}
                </div>
            </div>
        )
    }

    render_update_balance_item_logs(object){
        var middle = this.props.height - 120;
        var logs = this.get_item_logs(object, 'update_balance')
        var items = [].concat(this.filter_for_my_logs(logs, 'p2', object))
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
                <div style={{  }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index}>
                                    {this.render_update_balance_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_update_balance_item_clicked(index){
        if (this.state.selected_update_balance_event_item == index) {
            this.setState({ selected_update_balance_event_item: null })
        } else {
            this.setState({ selected_update_balance_event_item: index })
        }
    }

    render_update_balance_event_item(item, object, index){
        var new_balance = item.returnValues.p3
        if (this.state.selected_update_balance_event_item == index) {
            return (
                <div>
                    <div onClick={() => this.when_update_balance_item_clicked(index)}>
                        {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': this.props.app_state.loc['2447n']/* 'Receiver Account' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: 2 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2422']/* 'New Balance ' */, 'number':new_balance, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1]})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2422']/* 'New Balance ' */, 'subtitle': this.format_power_figure(new_balance), 'barwidth': this.calculate_bar_width(new_balance), 'number': this.format_account_balance_figure(new_balance), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], })}
                    </div>
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p4), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p5, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div onClick={() => this.when_update_balance_item_clicked(index)}>
                    {this.render_detail_item('3', { 'title':this.get_sender_title_text(item.returnValues.p2, object)/*  */, 'details': this.format_account_balance_figure(new_balance)+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], 'size': 'l' })}
                </div>
            )
        }
    }











    render_freeze_unfreeze_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['3098m']/* '✦ ' */ + object['id'], 'details': this.props.app_state.loc['2447bg']/* 'Freeze-Unfreeze Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                    {this.render_freeze_unfreeze_item_logs(object)}
                </div>
            </div>
        )
    }

    render_freeze_unfreeze_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.get_item_logs(object, 'freeze_unfreeze'))
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
                <div style={{  }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index}>
                                    {this.render_freeze_unfreeze_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_freeze_unfreeze_item_clicked(index){
        if (this.state.selected_freeze_unfreeze_event_item == index) {
            this.setState({ selected_freeze_unfreeze_event_item: null })
        } else {
            this.setState({ selected_freeze_unfreeze_event_item: index })
        }
    }

    render_freeze_unfreeze_event_item(item, object, index){
        var freeze_unfreeze_obj = {'1':this.props.app_state.loc['2423']/* 'Action: Freeze' */,'0':this.props.app_state.loc['2424']/* 'Action: Unfreeze' */}
        var amount = item.returnValues.p5
        var action = freeze_unfreeze_obj[item.returnValues.p2]
        var depth = item.returnValues.p6
        amount = this.get_actual_number(amount, depth)
        if (this.state.selected_freeze_unfreeze_event_item == index) {
            return (
                <div>
                    <div onClick={() => this.when_freeze_unfreeze_item_clicked(index)}>
                        {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': action, 'size': 'l' })}
                    </div>
                    <div style={{ height: 2 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2425']/* 'Amount, depth: ' */+depth, 'number':amount, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1]})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2425']/* 'Amount, depth: ' */+depth, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], })}
                    </div>
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': 'Authority Account', 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div onClick={() => this.when_freeze_unfreeze_item_clicked(index)}>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object)+' • '+action, 'details': this.format_account_balance_figure(amount)+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], 'size': 'l' })}
                </div>
            )
        }
    }










    render_modify_moderator_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['3098m']/* '✦ ' */ + object['id'], 'details': this.props.app_state.loc['3098p']/* ' Modify Moderator Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                    {this.render_modify_moderator_item_logs(object)}
                </div>
            </div>
        )
    }

    get_moderator_item_logs(object, event){
        if (this.props.app_state.moderator_events[object['id']] == null || this.props.app_state.moderator_events[object['id']][event] == null) {
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
                <div style={{  }}>
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
        var authority_val_obj = {'0':this.props.app_state.loc['2427']/* 'Not Moderator' */, '1':this.props.app_state.loc['2428']/* 'Moderator' */}
        var authority_val = authority_val_obj[item.returnValues.p6]
        if (this.state.selected_modify_moderator_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2429']/* 'Targeted Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': this.props.app_state.loc['2430']/* 'Moderator Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': authority_val, 'details': this.props.app_state.loc['2431']/* 'Authority value' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2429']/* 'Targeted Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', {'title': authority_val, 'details': this.props.app_state.loc['2431']/* 'Authority value' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
    }











    render_interactable_checker_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['3098m']/* '✦ ' */ + object['id'], 'details': this.props.app_state.loc['3098q']/* ' Access Rights Settings Events' */, 'size': 'l' })}
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
                <div style={{  }}>
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
        var interactable_checker_obj = {'0':this.props.app_state.loc['2433']/* 'Access Rights Disabled(Public)' */,'1':this.props.app_state.loc['2434']/* 'Access Rights Enabled(Private) */}
        var interactable_checker = interactable_checker_obj[item.returnValues.p6]
        if (this.state.selected_interactable_checker_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': interactable_checker, 'details': this.props.app_state.loc['2435']/* 'Access Rights Status' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': this.props.app_state.loc['2436']/* 'Moderator Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': interactable_checker, 'details': this.props.app_state.loc['2435']/* 'Acces Rights Status' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                </div>
            )
        }
    }










    render_interactable_accounts_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['3098m']/* '✦ ' */ + object['id'], 'details': this.props.app_state.loc['3098r']/* 'Account Access Settings Events' */, 'size': 'l' })}
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
                <div style={{  }}>
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
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2438']/* 'Targeted Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': this.props.app_state.loc['2439']/* 'Moderator Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['159']/* 'Until: ' */+(new Date(item.returnValues.p6*1000)), 'size': 'l' })}
                    
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2438']/* 'Targeted Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['2117']/* 'Until: ' */+(new Date(item.returnValues.p6*1000)), 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
    }










    render_blocked_accounts_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['3098m']/* '✦ ' */ + object['id'], 'details': this.props.app_state.loc['3098s']/* 'Blocked Account Events' */, 'size': 'l' })}
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
                <div style={{  }}>
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
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2442']/* 'Targeted Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': this.props.app_state.loc['2443']/* 'Moderator Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['2208']/* 'Until: ' */+(new Date(item.returnValues.p6*1000)), 'size': 'l' })}
                    
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2442']/* 'Targeted Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['2208']/* 'Until: ' */+(new Date(item.returnValues.p6*1000)), 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
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
                                    <img alt="" src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
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

    get_selected_item2(object, option){
        return object[option][2][0]
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
        if(item_id == '3' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12') uploaded_data = this.props.app_state.uploaded_data

        var censor_list = this.props.app_state.censored_keyword_phrases.concat(this.props.app_state.censored_keywords_by_my_following)
        return(
            <div>
                <ViewGroups token_name_thumbnail_directory={this.props.app_state?.token_name_thumbnail_directory} e5s={this.props.app_state?.e5s} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={width} show_images={this.props.show_images.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} censored_keyword_phrases={censor_list} select_deselect_tag={this.props.select_deselect_tag.bind(this)}/>
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

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
    }

}




export default CrossexchangeDetailsSection;