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
import ViewGroups from './../components/view_groups';
import TextInput from './../components/text_input';

import EndImg from './../assets/end_token_icon.png';
import SpendImg from './../assets/spend_token_icon.png';
import e5_empty_icon from './../assets/e5empty_icon.png'

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { motion, AnimatePresence } from "framer-motion";


var bigInt = require("big-integer");

function number_with_commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function start_and_end(str) {
  if (str.length > 35) {
    return str.substr(0, 20) + '...' + str.substr(str.length-10, str.length);
  }
  return str;
}

class PostListSection extends Component {
    
    state = {
        selected: 0,
        viewed_posts:[],
        scroll_positions:{}, typed_search_id:'', searched_account:'', typed_search_ether_id:'',
        loading_screen_opacity:1.0,
        direction:'positive',
        typed_search_coin_id:'',
        screen_width:0,
        current_load_time:{},
    };


    componentDidMount(){
        // if(this.interval != null) clearInterval(this.interval);
        
        // var me = this;
        // setTimeout(function() {
        //     me.interval = setInterval(() => me.set_screen_opacity(), 50);
        // }, (1 * 100));

        this.setState({screen_width: this.screen.current.offsetWidth})
    }

    componentWillUnmount(){
        if(this.interval != null) clearInterval(this.interval);
    }

    set_screen_opacity(){
        var current_value = this.state.loading_screen_opacity
        if(this.state.direction == 'positive'){
            var new_value = current_value + 0.03
            if(new_value >= 1.0){
                this.setState({direction:'negative'})
            }else{
                this.setState({loading_screen_opacity: new_value})
            }
        }else{
            //negative
            var new_value = current_value - 0.03
            if(new_value <= 0.3){
                this.setState({direction:'positive'})
            }else{
                this.setState({loading_screen_opacity: new_value})
            }
        }
    }


    render(){
        return(
            <div ref={this.screen}>
                {this.render_post_list_group()}
            </div>
        )
    }

    render_post_list_group(){
        var selected_page = this.props.page;
        if(selected_page == '?'){
            var selected_tag = this.props.work_page_tags_object['i'].active
            var selected_item = this.get_selected_item(this.props.work_page_tags_object, selected_tag)
            
            if(selected_tag == this.props.app_state.loc['1196']/* 'jobs' */ || selected_tag == 'e'){
                if(selected_item == this.props.app_state.loc['1264c']/* 'job-notifications' */){
                    return(
                        <div>
                            {this.render_my_notifications(this.props.app_state.loc['1264c']/* 'job-notifications' */)}
                        </div>
                    )
                }
                return(
                <div>{this.render_jobs_list_group()}</div>
                )
            }
            else if(selected_tag == this.props.app_state.loc['1197']/* 'contracts' */){
                if(selected_item == this.props.app_state.loc['1264d']/* 'contract-notifications' */){
                    return(
                        <div>
                            {this.render_my_notifications(this.props.app_state.loc['1264d']/* 'contract-notifications' */)}
                        </div>
                    )
                }
                return(
                <div>{this.render_contracts_list_group()}</div>
                )
            }
            else if(selected_tag == this.props.app_state.loc['1199']/* 'proposals' */ ){
                return(
                <div>{this.render_proposal_list_group(selected_item)}</div>
                )
            }
            else if(selected_tag == this.props.app_state.loc['1200']/* 'subscriptions' */ ){
                return(
                    <div>{this.render_subscription_list_group()}</div>
                )
            }
            else if(selected_tag == this.props.app_state.loc['1201']/* 'mail' */){
                if(selected_item == this.props.app_state.loc['1264f']/* 'mail-notifications' */){
                    return(
                        <div>
                            {this.render_my_notifications(this.props.app_state.loc['1264f']/* 'mail-notifications' */)}
                        </div>
                    )
                }
                return(
                <div>{this.render_mail_list_group()}</div>
                )
            }
            else if(selected_tag == this.props.app_state.loc['1198']/* 'contractors' */){
                if(selected_item == this.props.app_state.loc['1264e']/* 'contractor-notifications' */){
                    return(
                        <div>
                            {this.render_my_notifications(this.props.app_state.loc['1264e']/* 'contractor-notifications' */)}
                        </div>
                    )
                }
                return(
                <div>{this.render_contractor_list_group()}</div>
                )
            }
            else if(selected_tag == this.props.app_state.loc['1264s']/* 'nitro' */){
                return(
                    <div>{this.render_nitro_list_group()}</div>
                )
            }
        }
        else if(selected_page == 'e'){
            var selected_tag = this.props.explore_page_tags_object['i'].active
            var selected_item = this.get_selected_item(this.props.explore_page_tags_object, selected_tag)
            if(selected_tag == 'E5s' || selected_tag == 'e'){
                var selected_item = this.get_selected_item(this.props.explore_page_tags_object, selected_tag)

                if(selected_item == this.props.app_state.loc['1221']/* 'blockexplorer 🗺️' */){
                    return(
                        <div>
                            {this.render_search_user_data()}
                        </div>
                    )
                }
                else{
                    return(
                        <div>{this.render_E5s_list_group()}</div>
                    )
                }
            }
            else if(selected_tag == this.props.app_state.loc['1213']/* 'posts' */ ){
                return(
                    <div>{this.render_posts_list_group()}</div>
                )
            }
            else if(selected_tag == this.props.app_state.loc['1214']/* 'channels' */ ){
                return(
                <div>{this.render_channels_list_group()}</div>
                )
            }
            else if(selected_tag == this.props.app_state.loc['1215']/* 'storefront' */){
                if(selected_item == this.props.app_state.loc['1264g']/* 'storefront-notifications' */){
                    return(
                        <div>
                            {this.render_my_notifications(this.props.app_state.loc['1264g']/* 'storefront-notifications' */)}
                        </div>
                    )
                }
                return(
                <div>{this.render_storefront_item_list_group()}</div>
                )
            }
            else if(selected_tag == this.props.app_state.loc['1216']/* 'bags' */){
                if(selected_item == this.props.app_state.loc['1264h']/* 'bag-notifications' */){
                    return(
                        <div>
                            {this.render_my_notifications(this.props.app_state.loc['1264h']/* 'bag-notifications' */)}
                        </div>
                    )
                }
                return(
                <div>{this.render_bag_item_list_group()}</div>
                )
            }
            else if(selected_tag == this.props.app_state.loc['1264k']/* 'audioport' */ ){
                return(
                    <div>{this.render_audio_list_group(selected_item)}</div>
                )
            }
            else if(selected_tag == this.props.app_state.loc['1264p']/* 'videoport' */ ){
                return(
                    <div>{this.render_video_list_group(selected_item)}</div>
                )
            }
            else if(selected_tag == this.props.app_state.loc['1264ao']/* 'polls' */){
                return(
                    <div>{this.render_poll_list_group()}</div>
                )
            }
        }
        else if(selected_page == 'w'){
            var selected_option_name = this.get_selected_item(this.props.wallet_page_tags_object, this.props.wallet_page_tags_object['i'].active)

            if(selected_option_name == this.props.app_state.loc['1217']/* 'ethers ⚗️' */ || selected_option_name == 'e'){
                return(
                <div>{this.render_ethers_list_group()}</div>
                )
            }
            else if(this.props.wallet_page_tags_object['i'].active == this.props.app_state.loc['1218']/* 'ends' */ ){
                return(
                    <div>{this.render_ends_list_group()}</div>
                )
            }
            else if(this.props.wallet_page_tags_object['i'].active == this.props.app_state.loc['1219']/* 'spends' */ ){
                return(
                    <div>{this.render_spends_list_group()}</div>
                )
            }
            else if(selected_option_name == this.props.app_state.loc['1264i']/* 'wallet-notifications' */ ){
                return(
                    <div>
                        {this.render_my_notifications(this.props.app_state.loc['1264i']/* 'wallet-notifications' */)}
                    </div>
                )
            }
            else if(selected_option_name == this.props.app_state.loc['1264j']/* 'coins 🪙' */){
                return(
                    <div>
                        {this.render_coins_list_group()}
                    </div>
                )
            }
            else if(this.props.wallet_page_tags_object['i'].active == this.props.app_state.loc['1264aj']/* 'bills' */){
                return(
                    <div>
                        {this.render_bills_list_group()}
                    </div>
                )
            }
        }

    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }

    is_object_sender_blocked(object){
        var blocked_account_obj = this.get_all_sorted_objects(this.props.app_state.blocked_accounts)
        var blocked_accounts = []
        blocked_account_obj.forEach(account => {
            if(!blocked_accounts.includes(account['id'])){
                blocked_accounts.push(account['id'])
            }
        });

        if(blocked_accounts.includes(object['author'])){
            return true
        }
        return false
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

        return all_objects
    }


    constructor(props) {
        super(props);
        this.screen = React.createRef()

        this.jobs_list = React.createRef();
        this.contract_list = React.createRef();
        this.contractor_list = React.createRef();
        this.proposal_list = React.createRef();
        this.subscription_list = React.createRef();
        this.mail_list = React.createRef();

        this.e5_list = React.createRef();
        this.searched_account_list = React.createRef();
        this.post_list = React.createRef();
        this.channel_list = React.createRef();
        this.storefront_list = React.createRef();
        this.bag_list = React.createRef();
        this.audio_list = React.createRef();
        this.video_list = React.createRef();
        this.poll_list = React.createRef();

        this.coin_list = React.createRef();
        this.ether_list = React.createRef();
        this.end_list = React.createRef();
        this.spend_list = React.createRef();
        this.bill_list = React.createRef();

        this.current_load_time = {}
    }



    render_my_notifications(tag_id){
        var items = [].concat(this.props.get_all_sorted_notifications(tag_id))
        if(items == null){
            items = []
        }
        items = [].concat(items)
        
        var middle = this.props.height
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }

        if(tag_id == this.props.app_state.loc['1264i']/* 'wallet-notifications' */){
            var first_event_block = items.length == 0 ? 0 : items[0]['event'].returnValues.p6/* block_number */
            var most_recent_events = this.props.app_state.notification_object['token']
            if(most_recent_events != null){
                var newer_events = []
                most_recent_events.forEach(new_event => {
                    var block = new_event.returnValues.p6/* block_number */
                    if(block > first_event_block){
                        newer_events.push({'type':'token_event_notification', 'event':new_event, 'e5':new_event['e5'], 'timestamp':new_event.returnValues.p5})
                    }
                });
                items = newer_events.concat(items)
            }
        }

        if(items.length == 0){
            items = [0, 0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
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
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <div style={{'margin':'3px 0px 3px 0px'}}>
                                {this.render_notification_item(item, index)}
                            </div>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_notification_item(item, index){
        if(item['type'] == 'token_event_notification'){
            var sender = item['event'].returnValues.p2
            var amount = item['event'].returnValues.p4
            var depth = item['event'].returnValues.p7
            var exchange = item['event'].returnValues.p1
            var timestamp = item['event'].returnValues.p5
            var now = Date.now()/1000
            var opacity = timestamp > (now - (60 * 5)) ? 0.7 : 1.0;
            return(
                <div style={{'opacity':opacity}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[item['e5']+exchange], 'number':this.get_actual_number(amount, depth), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange]})} /* onClick={() => this.open_object(exchange, item['e5'], 'token')} */>
                    {this.render_detail_item('3', {'title':'💸 '+this.get_senders_name_or_you(sender, item['e5'])+' sent you '+this.format_account_balance_figure(this.get_actual_number(amount, depth))+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange], 'details':''+/* (new Date(timestamp*1000))+', '+ */(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'l'})}
                </div>
            )
        }
        else if(item['type'] == 'my_job_application_response_notification'){
            var timestamp = item['timestamp']
            var sender = item['event'].returnValues.p2
            var job_id = item['event'].returnValues.p1
            return(
                <div onClick={() => this.open_object(job_id, item['e5'], 'job')}>
                    {this.render_detail_item('3', {'title':'💼 '+this.get_senders_name_or_you(sender, item['e5'])+' selected your application for the job '+job_id, 'details':''+/* (new Date(timestamp*1000))+', '+ */(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'l'})}
                </div>
            )
        }
        else if(item['type'] == 'job_response_notification'){
            var timestamp = item['timestamp']
            var sender = item['event'].returnValues.p2
            var job_id = item['event'].returnValues.p1
            return(
                <div onClick={() => this.open_object(job_id, item['e5'], 'job')}>
                    {this.render_detail_item('3', {'title':'💼 '+this.get_senders_name_or_you(sender, item['e5'])+' applied for your job '+job_id, 'details':''+/* (new Date(timestamp*1000))+', '+ */(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'l'})}
                </div>
            )
        }
        else if(item['type'] == 'bag_response_notification'){
            var timestamp = item['timestamp']
            var sender = item['event'].returnValues.p2
            var bag_id = item['event'].returnValues.p1
            return(
                <div onClick={() => this.open_object(bag_id, item['e5'], 'bag')}>
                    {this.render_detail_item('3', {'title':'🛍 '+this.get_senders_name_or_you(sender, item['e5'])+' requested to fulfil your bag '+bag_id, 'details':''+/* (new Date(timestamp*1000))+', '+ */(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'l'})}
                </div>
            )
        }
        else if(item['type'] == 'my_bag_application_response_notification'){
            var timestamp = item['timestamp']
            var sender = item['event'].returnValues.p2
            var bag_id = item['event'].returnValues.p1
            return(
                <div onClick={() => this.open_object(bag_id, item['e5'], 'bag')}>
                    {this.render_detail_item('3', {'title':'🛍 '+this.get_senders_name_or_you(sender, item['e5'])+' selected you to fulfil their bag '+bag_id, 'details':''+/* (new Date(timestamp*1000))+', '+ */(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'l'})}
                </div>
            )
        }
        else if(item['type'] == 'contractor_request_notification'){
            var timestamp = item['timestamp']
            var sender = item['event'].returnValues.p2
            var contractor_id = item['event'].returnValues.p1
            return(
                <div onClick={() => this.open_object(contractor_id, item['e5'], 'contractor')}>
                    {this.render_detail_item('3', {'title':'👷🏻‍♀️ '+this.get_senders_name_or_you(sender, item['e5'])+' sent a job request to your contractor post '+contractor_id, 'details':''+/* (new Date(timestamp*1000))+', '+ */(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'l'})}
                </div>
            )
        }
        else if(item['type'] == 'contract_entry_notification'){
            var timestamp = item['event'].returnValues.p7
            var sender = item['event'].returnValues.p2
            var contract_id = item['event'].returnValues.p1
            return(
                <div onClick={() => this.open_object(contract_id, item['e5'], 'contract')}>
                    {this.render_detail_item('3', {'title':'📑 '+this.get_senders_name_or_you(sender, item['e5'])+' entered your contract '+contract_id, 'details':''+/* (new Date(timestamp*1000))+', '+ */(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'l'})}
                </div>
            )
        }
        else if(item['type'] == 'contract_exit_notification'){
            var timestamp = item['event'].returnValues.p7
            var sender = item['event'].returnValues.p2
            var contract_id = item['event'].returnValues.p1
            return(
                <div onClick={() => this.open_object(contract_id, item['e5'], 'contract')}>
                    {this.render_detail_item('3', {'title':'📜 '+this.get_senders_name_or_you(sender, item['e5'])+' exited your contract '+contract_id, 'details':''+/* (new Date(timestamp*1000))+', '+ */(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'l'})}
                </div>
            )
        }
        else if(item['type'] == 'direct_purchase_notification'){
            var timestamp = item['timestamp']
            var sender = item['event'].returnValues.p1
            var storefront_id = item['event'].returnValues.p3
            return(
                <div onClick={() => this.open_object(storefront_id, item['e5'], 'storefront')}>
                    {this.render_detail_item('3', {'title':'🏪 '+this.get_senders_name_or_you(sender, item['e5'])+' purchased your storefront item '+storefront_id, 'details':''+/* (new Date(timestamp*1000))+', '+ */(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'l'})}
                </div>
            )
        }
        else if(item['type'] == 'mail_message_notification'){
            var timestamp = item['timestamp']
            var sender = item['event'].returnValues.p2
            var message = this.truncate(item['ipfs']['message'], 53)
            var id = item['convo_id']
            return(
                <div onClick={() => this.open_object(id, item['e5'], 'mail')}>
                    {this.render_detail_item('3', {'title':'📩 '+this.get_senders_name_or_you(sender, item['e5'])+': '+message, 'details':''+/* (new Date(timestamp*1000))+', '+ */(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'l'})}
                </div>
            )
        }
    }

    get_actual_number(number, depth){
        var p = (bigInt(depth).times(72)).toString().toLocaleString('fullwide', {useGrouping:false})
        var depth_vaule = bigInt(('1e'+p))
        return (bigInt(number).times(depth_vaule)).toString().toLocaleString('fullwide', {useGrouping:false})
    }

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }

    get_senders_name_or_you(sender, e5){
        if(sender == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* You. */
        }
        var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
    }

    open_object(target, e5, type){
        this.props.open_object_in_homepage(target, e5, type)
    }







    handleScroll = (event, id) => {
        var pos = event.currentTarget.scrollTop
        this.props.set_page_scroll(pos)
    };

    set_jobs_list(pos, smooth){
        if(smooth == null || smooth == false){
            this.jobs_list.current?.scrollTo(0, pos);
        }else{
            this.jobs_list.current?.scrollTo({ top: pos, behavior: 'smooth' })
        }
    }

    set_contract_list(pos, smooth){
        if(smooth == null || smooth == false) this.contract_list.current?.scrollTo(0, pos);
        else this.contract_list.current?.scrollTo({ top: pos, behavior: 'smooth' })
    }

    set_contractor_list(pos, smooth){
        if(smooth == null || smooth == false) this.contractor_list.current?.scrollTo(0, pos);
        else this.contractor_list.current?.scrollTo({ top: pos, behavior: 'smooth' })
    }

    set_proposal_list(pos, smooth){
        if(smooth == null || smooth == false) this.proposal_list.current?.scrollTo(0, pos);
        else this.proposal_list.current?.scrollTo({ top: pos, behavior: 'smooth' })
    }

    set_subscription_list(pos, smooth){
        if(smooth == null || smooth == false) this.subscription_list.current?.scrollTo(0, pos);
        else this.subscription_list.current?.scrollTo({ top: pos, behavior: 'smooth' })
    }

    set_mail_list(pos, smooth){
        if(smooth == null || smooth == false) this.mail_list.current?.scrollTo(0, pos);
        else this.mail_list.current?.scrollTo({ top: pos, behavior: 'smooth' })
    }



    set_e5_list(pos, smooth){
        if(smooth == null || smooth == false) this.e5_list.current?.scrollTo(0, pos);
        else this.e5_list.current?.scrollTo({ top: pos, behavior: 'smooth' })
    }

    set_searched_account_list(pos, smooth){
        if(smooth == null || smooth == false) this.searched_account_list.current?.scrollTo(0, pos);
        else this.searched_account_list.current?.scrollTo({ top: pos, behavior: 'smooth' })
    }

    set_post_list(pos, smooth){
        if(smooth == null || smooth == false) this.post_list.current?.scrollTo(0, pos);
        else this.post_list.current?.scrollTo({ top: pos, behavior: 'smooth' })
    }

    set_channel_list(pos, smooth){
        if(smooth == null || smooth == false) this.channel_list.current?.scrollTo(0, pos);
        else this.channel_list.current?.scrollTo({ top: pos, behavior: 'smooth' })
    }

    set_storefront_list(pos, smooth){
        if(smooth == null || smooth == false) this.storefront_list.current?.scrollTo(0, pos);
        else this.storefront_list.current?.scrollTo({ top: pos, behavior: 'smooth' })
    }

    set_bag_list(pos, smooth){
        if(smooth == null || smooth == false) this.bag_list.current?.scrollTo(0, pos);
        else this.bag_list.current?.scrollTo({ top: pos, behavior: 'smooth' })
    }

    set_audio_list(pos, smooth){
        if(smooth == null || smooth == false) this.audio_list.current?.scrollTo(0, pos);
        else this.audio_list.current?.scrollTo({ top: pos, behavior: 'smooth' })
    }

    set_video_list(pos, smooth){
        if(smooth == null || smooth == false) this.video_list.current?.scrollTo(0, pos);
        else this.video_list.current?.scrollTo({ top: pos, behavior: 'smooth' })
    }
    
    set_poll_list(pos, smooth){
        if(smooth == null || smooth == false) this.poll_list.current?.scrollTo(0, pos);
        else this.poll_list.current?.scrollTo({ top: pos, behavior: 'smooth' })
    }



    set_coin_list(pos, smooth){
        if(smooth == null || smooth == false) this.coin_list.current?.scrollTo(0, pos)
        else this.coin_list.current?.scrollTo({ top: pos, behavior: 'smooth' })
    }

    set_ether_list(pos, smooth){
        if(smooth == null || smooth == false) this.ether_list.current?.scrollTo(0, pos);
        else this.ether_list.current?.scrollTo({ top: pos, behavior: 'smooth' })
    }

    set_end_list(pos, smooth){
        if(smooth == null || smooth == false) this.end_list.current?.scrollTo(0, pos);
        else this.end_list.current?.scrollTo({ top: pos, behavior: 'smooth' })
    }

    set_spend_list(pos, smooth){
        if(smooth == null || smooth == false) this.spend_list.current?.scrollTo(0, pos);
        else this.spend_list.current?.scrollTo({ top: pos, behavior: 'smooth' })
    }

    set_bills_list(pos, smooth){
        if(smooth == null || smooth == false) this.bill_list.current?.scrollTo(0, pos);
        else this.bill_list.current?.scrollTo({ top: pos, behavior: 'smooth' })
    }






    show_load_metrics(objects, object_type){
        var selected_page = this.props.page;
        if(selected_page == '?'){
            var selected_item = this.get_selected_item(this.props.work_page_tags_object, this.props.work_page_tags_object['i'].active)

            if(selected_item == this.props.app_state.loc['1202']/* 'all' */ || selected_item == this.props.app_state.loc['1211']/* 'my-proposals' */ || selected_item == this.props.app_state.loc['1208']/* 'received' */ || selected_item == this.props.app_state.loc['1209']/* 'sent' */ || this.props.work_page_tags_object['i'].active == 'e'){
                return(
                    <div>
                        {this.load_metric_status_item(objects, object_type)}
                    </div>
                )
            }
        }
        else if(selected_page == 'e'){
            var selected_item = this.get_selected_item(this.props.explore_page_tags_object, this.props.explore_page_tags_object['i'].active)

            if(selected_item == this.props.app_state.loc['1202']/* 'all' */){
                return(
                    <div>
                        {this.load_metric_status_item(objects, object_type)}
                    </div>
                )
            }
        }
        else if(selected_page == 'w'){
            return(
                <div>
                    {this.load_metric_status_item(objects, object_type)}
                </div>
            )
        }
    }

    load_metric_status_item(objects, object_type){
        return;
        var total_count = this.get_total_count_for_object_type(object_type)
        var loaded_objects = objects.length
        var p = ((loaded_objects*100)/total_count)
        var per = Math.round(p * 1000) / 1000
        var percentage = per + '%'
        var obj = {'subscriptions':'Subscriptions Indexed.', 'contracts':'Contracts Indexed.', 'proposals':'Proposals Indexed.', 'tokens':'Tokens Indexed.', 'posts':'Posts Indexed.', 'channels':'Channels Indexed.', 'jobs':'Jobs Indexed.', 'sent_mail':'Sent Mail Indexed.', 'received_mail':'Received Mail Indexed.', 'storefront':'Storefront Items Indexed.', 'bags':'Bags Indexed.', 'contractor':'Contractors Indexed.',  'audioport':'Audioposts Indexed.', 'videoport':'Videoposts Indexed', 'nitro':'Nitroposts Indexed'}
        var title = obj[object_type]
        var number = this.format_account_balance_figure(loaded_objects) +' out of '+ this.format_account_balance_figure(total_count)
        return(
            <div>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':title, 'subtitle':this.format_power_figure(total_count), 'barwidth':percentage, 'number':number, 'barcolor':'', 'relativepower':percentage, })}
                </div>
                <div style={{height: 3}}/>
            </div>
        )
    }

    get_total_count_for_object_type(object_type){
        var obj = {'subscriptions':this.props.app_state.load_subscription_metrics, 'contracts':this.props.app_state.load_contracts_metrics, 'proposals':this.props.app_state.load_proposal_metrics, 'tokens':this.props.app_state.load_tokens_metrics, 'posts':this.props.app_state.load_posts_metrics, 'channels':this.props.app_state.load_channels_metrics, 'jobs':this.props.app_state.load_jobs_metrics, 'sent_mail':this.props.app_state.load_sent_mail_metrics, 'received_mail':this.props.app_state.load_received_mail_metrics, 'storefront':this.props.app_state.load_storefront_metrics, 'bags':this.props.app_state.load_bags_metrics, 'contractor':this.props.app_state.load_contractors_metrics, 'audioport':this.props.app_state.load_audio_metrics, 'videoport':this.props.app_state.load_video_metrics, 'nitro':this.props.app_state.load_nitro_metrics, 'polls':this.props.app_state.load_poll_metrics}
        
        var load_metrics = obj[object_type]
        var total_count = 0        
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]
            if(load_metrics[e5] != null) {
                total_count += load_metrics[e5]
            }
        }
        return total_count
    }






    show_new_objects_message_if_any(objects){
        const page_id = this.props.get_page_id()

        if(this.state.current_load_time[page_id] == null){
            const clone = structuredClone(this.state.current_load_time)
            clone[page_id] = Date.now()/1000
            this.setState({current_load_time:clone})
        }else{
            const current_pages_load_time = this.state.current_load_time[page_id]
            var new_objects = objects.filter(function (object) {
                return (object['timestamp'] >= current_pages_load_time)
            })

            if(new_objects.length > 0){
                const title = this.props.app_state.loc['2509r']/* $ new % loaded. */.replace('$', number_with_commas(new_objects.length)).replace('%', this.get_section_name())
                return(
                    <div onClick={() => this.when_refresh_feed_tapped(page_id)}>
                        {this.render_detail_item('3', {'title':title, 'details':this.props.app_state.loc['2509s']/* 'Tap this to refresh your feed and show them.' */, 'size':'l'})}
                        <div style={{height:10}}/>
                    </div>
                )
            }
        }
    }

    when_refresh_feed_tapped(page_id){
        this.props.update_scroll_position2(true)
        const clone = structuredClone(this.state.current_load_time)
        clone[page_id] = Date.now()/1000
        this.setState({current_load_time:clone})
    }

    get_section_name(){
        var selected_page = this.props.page;
        if(selected_page == '?'){
            if(this.props.work_page_tags_object['i'].active == 'e'){
                return this.props.app_state.loc['1196']/* 'jobs' */
            }
            return this.props.work_page_tags_object['i'].active
        }
        else if(selected_page == 'e'){
            if(this.props.explore_page_tags_object['i'].active == 'e'){
                return 'E5s'
            }
            return this.props.explore_page_tags_object['i'].active
        }
        else if(selected_page == 'w'){
            return this.props.wallet_page_tags_object['i'].active
        }
    }

    filter_objects_and_remove_very_new_entries(objects){
        const page_id = this.props.get_page_id()
        const current_pages_load_time = this.state.current_load_time[page_id] || Date.now()/1000
        return objects.filter(function (object) {
            return (object['timestamp'] < current_pages_load_time)
        })
    }









    render_jobs_list_group(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var all_items = this.get_job_items()
        var items = this.filter_objects_and_remove_very_new_entries(all_items)

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics([], 'jobs')}
                        {this.show_new_objects_message_if_any(all_items)}
                        {items.map((item, index) => (
                            <div>
                                {this.render_empty_object()}
                                <div style={{height: 4}}/>
                            </div>
                        ))}
                    </ul>
                </div>
            );
        }else{
            var padding = this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */ ? '2px' : '5px'
            return (
                <div>
                    <div ref={this.jobs_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                        <AnimatePresence initial={false}>
                            <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style': 'none'}}>
                                {this.show_load_metrics(items, 'jobs')}
                                {this.show_new_objects_message_if_any(all_items)}
                                {items.map((item, index) => (
                                    <motion.li initial={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                                    style={{'padding': padding}}>
                                        {this.render_job_object(item, index)}
                                    </motion.li>
                                ))}
                            </ul>
                        </AnimatePresence>
                    </div>
                </div>
            );
        } 
    }

    render_loading_screen_card(){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div>
                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px','margin':'5px 0px 0px 0px','display': 'flex', 'align-items':'center','justify-content':'center',/*  'opacity':this.state.loading_screen_opacity */}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={this.props.app_state.theme['letter']} style={{height:60 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                </div>
            </div>
        )
    }

    get_job_items(){
        return this.remove_duplicates(this.props.get_job_items())
    }

    render_job_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_job_item(object)
        if(this.is_object_sender_blocked(object) || this.is_post_taken_down_for_sender(object) || this.is_object_blocked_for_sender(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        if(this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */){
            return(
                <div onClick={() => this.when_job_item_clicked(index, object)}>
                    {this.render_detail_item('3', item['min'])}
                </div>
            )
        }
        return(
            <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div onClick={() => this.when_job_item_clicked(index, object)}>
                        <div style={{'padding': '0px 0px 0px 0px'}} >
                            {this.render_detail_item('3', item['id'])}
                        </div>
                        <div style={{'padding': '20px 0px 0px 0px'}}>
                            {this.render_detail_item('2', item['age'])}
                        </div>
                    </div>
                </div>         
            </div>
        )
    }

    format_job_item(object){
        var tags = object['ipfs'] == null ? ['Job'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(object['ipfs'].selected_device_city != null && object['ipfs'].selected_device_city != ''){
            tags = [object['ipfs'].selected_device_city].concat(tags)
        }
        var title = object['ipfs'] == null ? 'Job ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        var responses_text = ' • '+object['responses']+this.props.app_state.loc['2509c']/* ' responses' */
        if(object['responses'] == 0){
            responses_text = ''
        }
        const is_socket_job = object['ipfs'].get_chain_or_indexer_job_object != null ? this.get_selected_item2(object['ipfs'].get_chain_or_indexer_job_object, 'e') == 1 : false

        const title_image = is_socket_job == true ? (this.props.app_state.nitro_album_art[object['event']['nitro_e5_id']] == null ? this.props.app_state.static_assets['empty_image'] : this.props.app_state.nitro_album_art[object['event']['nitro_e5_id']]) : this.props.app_state.e5s[object['e5']].e5_img

        const id_to_show = is_socket_job == true ? this.format_account_balance_figure2(object['id']) : object['id']

        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+id_to_show+sender+responses_text, 'details':title, 'size':'l', 'title_image':title_image, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },
            'min':{'details':object['e5']+' • '+object['id']+sender+responses_text, 'title':title, 'size':'l', 'border_radius':'0%'}
        }
    }

    when_job_item_clicked(index, object){
        this.props.when_job_post_item_clicked(index, object['id'], object['e5'], object)
    }

    remove_duplicates(list){
        var filtered = []
        var item_mapping = {}
        list.forEach(element => {
            if(!filtered.includes(element) && item_mapping[element['e5_id']] == null){
                filtered.push(element)
                item_mapping[element['e5_id']] = element['e5_id']
            }
        });
        return filtered
    }

    is_object_blocked_for_sender(object){
        var is_object_blocked_for_sender = false;
        if(this.props.app_state.posts_blocked_by_my_following.includes(object['e5_id'])){
            is_object_blocked_for_sender = true
        }

        // var object_tags = object['ipfs'].entered_indexing_tags
        // var all_censored_phrases = this.props.app_state.censored_keyword_phrases.concat(this.props.app_state.censored_keywords_by_my_following)
        // var includes = all_censored_phrases.some(r=> object_tags.includes(r.toLowerCase()))
        // if(includes){
        //    is_object_blocked_for_sender = true 
        // }

        var author = object['author']
        // if(all_censored_phrases.includes(author.toString())){
        //     is_object_blocked_for_sender = true 
        // }

        // var entered_title_text = object['ipfs'].entered_title_text
        // var includes2 = all_censored_phrases.some(r=> entered_title_text.toLowerCase().includes(r.toLowerCase()))
        // if(includes2){
        //    is_object_blocked_for_sender = true 
        // }
    
        var myid = this.props.app_state.user_account_id[object['e5']]
        if(myid == null) myid = 1
        if(author == myid){
            is_object_blocked_for_sender = false
        }


        return is_object_blocked_for_sender
    }







    
    render_contracts_list_group(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var all_items = this.get_contract_items()
        var items = this.filter_objects_and_remove_very_new_entries(all_items)

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics([], 'contracts')}
                        {this.show_new_objects_message_if_any(all_items)}
                        {items.map((item, index) => (
                            <div>
                                {this.render_empty_object()}
                                <div style={{height: 4}}/>
                            </div>
                        ))}
                    </ul>
                </div>
            );
        }else{
            var padding = this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */ ? '2px' : '5px'
            return ( 
                <div ref={this.contract_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}} >
                    <AnimatePresence initial={false}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style': 'none'}}>
                            {this.show_load_metrics(items, 'contracts')}
                            {this.show_new_objects_message_if_any(all_items)}
                            {items.map((item, index) => (
                                <motion.li initial={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                                style={{'padding': padding}}>
                                    {this.render_contract_item(item, index)}
                                </motion.li>
                            ))}
                        </ul>
                    </AnimatePresence>
                </div>
            );
        }
        
    }

    get_contract_items(){
        return this.remove_duplicates(this.props.get_contract_items())
    }

    render_contract_item(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_contract_item(object)
        if(this.is_object_sender_blocked(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        var opacity =  1.0
        if(this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */){
            return(
                <div onClick={() => this.when_contract_item_clicked(index, object)}>
                    {this.render_detail_item('3', item['min'])}
                </div>
            )
        }
        return(
            <div style={{height:'auto',opacity:opacity, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_contract_item_clicked(index, object)}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_contract_item_clicked(index, object)}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    format_contract_item(object){
        var main_contract_tags = ['Contract', 'main', object['e5'] ]
        var tags = object['ipfs'] == null ? (object['id'] == 2 ? main_contract_tags : ['Contract']) : [object['e5']].concat(object['ipfs'].entered_indexing_tags)

        var title = object['ipfs'] == null ? (object['id'] == 2 ? this.props.app_state.loc['2509v']/* 'The Main Contract for $' */.replace('$', object['e5']) :this.props.app_state.loc['2509u']/* Contract */) : object['ipfs'].entered_title_text
        var age = object['event'] == null ? this.props.app_state.boot_times[object['e5']]['block'] : object['event'].returnValues.p5
        var time = object['event'] == null ? this.props.app_state.boot_times[object['e5']]['time'] : object['event'].returnValues.p4
        var id_text = ' • '+object['id']
        if(object['id'] == 2) id_text = ' • '+'Main Contract'
        var sender = object['event'] == null ? '' : this.get_senders_name(object['event'].returnValues.p3, object);
        var number = number_with_commas(age)
        var barwidth = this.get_number_width(age)
        var relativepower = this.get_time_difference(time)
        var object_id = object['id']
        if(this.should_hide_contract_info_because_private(object)){
            sender = '????'
            id_text = ' • ????'
            object_id = '????'
            number = '????'
            relativepower = '????'
        }
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':id_text+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{ 'style':'s', 'title':'', 'subtitle':'', 'barwidth':barwidth, 'number':`${number}`, 'barcolor':'', 'relativepower':relativepower, },
            'min':{'details':object['e5']+' • '+object_id+sender, 'title':title, 'size':'l', 'border_radius':'0%'}
        }
    }

    when_contract_item_clicked(index, object){
        // if(object['hidden'] == true){
        //     this.props.notify(this.props.app_state.loc['2509d']/* 'That object is not available for you to access.' */, 9000)
        //     return;
        // }
        this.props.when_contract_item_clicked(index, object['id'], object['e5'], null, object)
    }

    should_hide_contract_info_because_private(object){
        if(object['ipfs'] == null){
            return false
        }
        var should_show =  object['ipfs'].contract_type == 'personal' || object['ipfs'].contract_type == 'life';
        if(this.props.app_state.user_account_id[object['e5']] == object['author']){
            return false
        }
        return should_show
    }






    render_proposal_list_group(selected_item){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']

        var middle = this.props.height
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var all_items = this.get_my_proposals()
        var items = this.filter_objects_and_remove_very_new_entries(all_items)

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics([], 'proposals')}
                        {this.show_new_objects_message_if_any(all_items)}
                        {items.map((item, index) => (
                            <div>
                                {this.render_empty_object()}
                                <div style={{height: 4}}/>
                            </div>
                        ))}
                    </ul>
                </div>
            );
        }else{
            var padding = this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */ ? '2px' : '5px'
            return (
                <div ref={this.proposal_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <AnimatePresence initial={false}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style': 'none'}}>
                            {this.show_load_metrics(items, 'proposals')}
                            {this.show_new_objects_message_if_any(all_items)}
                            {this.render_vote_wait_in_all_proposals_button(all_items, selected_item)}
                            {items.map((item, index) => (
                                <motion.li initial={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                                style={{'padding': padding}}>
                                    {this.render_proposal_object(item, index)}
                                </motion.li>
                            ))}
                        </ul>
                    </AnimatePresence>
                </div>
            );
        }
    }

    render_vote_wait_in_all_proposals_button(all_items, selected_item){
        if(selected_item == this.props.app_state.loc['1264aa']/* 'main-contract' */){
            const selected_proposals = this.filter_proposals_by_not_participated_in(all_items)
            if(selected_proposals.length > 0){
                return(
                <div style={{'margin':'5px 0px 10px 0px'}} onClick={() => this.vote_wait_in_all_proposals(selected_proposals)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2509t']/* vote in all */, 'action':''})}
                </div>
            )
            }
        }
    }

    vote_wait_in_all_proposals(selected_proposals){
        this.props.show_dialog_bottomsheet({'selected_proposals': selected_proposals}, 'vote_wait_bottomsheet')
    }

    filter_proposals_by_not_participated_in(all_items){
        const saved_pre_launch_data_object = this.props.app_state.saved_pre_launch_events
        const selected_proposals = all_items.filter(function (object) {
            const e5 = object['e5']
            const proposal_id = object['id']
            const time = object['timestamp']
            const my_vote_events_in_that_e5_contract = saved_pre_launch_data_object[e5]['all_contracts_proposals']
            const my_vote_events_for_focused_proposal = my_vote_events_in_that_e5_contract.filter(function (event_item) {
                return (event_item.returnValues.p2/* consensus_id */ == proposal_id)
            })
            return (my_vote_events_for_focused_proposal.length == 0 && time > (Date.now()/1000) - (60*60*24*3))
        })
        return selected_proposals
    }

    render_proposal_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_proposal_item(object)
        if(this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */){
            return(
                <div onClick={() => this.when_proposal_item_clicked(index, object)}>
                    {this.render_detail_item('3', item['min'])}
                </div>
            )
        }
        return(
            <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_proposal_item_clicked(index, object)}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_proposal_item_clicked(index, object)}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    get_my_proposals(){
        return this.remove_duplicates(this.props.get_proposal_items())
    }

    format_proposal_item(object){
        var tags = object['ipfs'] == null ? ['Proposal'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Proposal ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p6
        var time = object['event'] == null ? 0 : object['event'].returnValues.p5
        var sender = this.get_senders_name(object['event'].returnValues.p4, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id']+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },
            'min':{'details':object['e5']+' • '+object['id']+sender, 'title':title, 'size':'l', 'border_radius':'0%'}
        }
    }

    when_proposal_item_clicked(index, object){
        this.props.when_proposal_item_clicked(index, object['id'], object['e5'], object)
    }








    render_nitro_list_group(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var all_items = this.get_nitro_items()
        var items = this.filter_objects_and_remove_very_new_entries(all_items)

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics([], 'nitro')}
                        {this.show_new_objects_message_if_any(all_items)}
                        {items.map((item, index) => (
                            <div>
                                {this.render_empty_object()}
                                <div style={{height: 4}}/>
                            </div>
                        ))}
                    </ul>
                </div>
            );
        }
        else{
            var padding = this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */ ? '2px' : '5px'
            return ( 
                <div ref={this.nitro_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <AnimatePresence initial={false}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style': 'none'}}>
                            {this.show_load_metrics([], 'nitro')}
                            {this.show_new_objects_message_if_any(all_items)}
                            {items.map((item, index) => (
                                <motion.li initial={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                                style={{'padding': padding}}>
                                    {this.render_nitro_object_if_locked(item, index)}
                                </motion.li>
                            ))}
                        </ul>
                    </AnimatePresence>
                </div>
            );
        }
    }

    get_nitro_items(){
        return this.remove_duplicates(this.props.get_nitro_items())
    }

    render_nitro_object_if_locked(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_nitro_item(object)
        if(this.is_post_taken_down_for_sender(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        if(this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */){
            return(
                <div onClick={() => this.when_nitro_item_clicked(index, object)}>
                    {this.render_detail_item('8', item['min'])}
                </div>
            )
        }
        return(
            <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_nitro_item_clicked(index, object)}>
                        {this.render_detail_item('8', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_nitro_item_clicked(index, object)}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    format_nitro_item(object){
        var tags = object['ipfs'] == null ? ['NitroPost'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'NitroPost ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name2(object['event'].returnValues.p5, object);
        var author = sender
        var default_image = EndImg
        var image = object['ipfs'] == null ? default_image : (object['ipfs'].album_art == null ? default_image : object['ipfs'].album_art)

        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':object['id']+' • '+author, 'details':title, 'size':'l', 'image':image, 'border_radius':'7px'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },
            'min':{'details':object['e5']+' • '+object['id']+' • '+sender, 'title':title, 'size':'l', 'border_radius':'7px', 'image':image}
        }
    }

    when_nitro_item_clicked(index, object){
        this.props.when_nitro_item_clicked(index, object['id'], object['e5'], object)
    }






    render_subscription_list_group(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var all_items = this.get_subscription_items()
        var items = this.filter_objects_and_remove_very_new_entries(all_items)

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics([], 'subscriptions')}
                        {this.show_new_objects_message_if_any(all_items)}
                        {items.map((item, index) => (
                            <div>
                                {this.render_empty_object()}
                                <div style={{height: 4}}/>
                            </div>
                        ))}
                    </ul>
                </div>
            );
        }else{
            var padding = this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */ ? '2px' : '5px'
            return ( 
                <div ref={this.subscription_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <AnimatePresence initial={false}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style': 'none'}}>
                            {this.show_load_metrics(items, 'subscriptions')}
                            {this.show_new_objects_message_if_any(all_items)}
                            {this.render_pay_all_upcoming_subscriptions_button(items)}
                            {items.map((item, index) => (
                                <motion.li initial={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                                style={{'padding': padding}}>
                                    {this.render_subscription_object(item, index)}
                                </motion.li>
                            ))}
                        </ul>
                    </AnimatePresence>
                </div>
            );
        }
    }

    render_pay_all_upcoming_subscriptions_button(items){
        var selected_option_name = this.get_selected_item(this.props.work_page_tags_object, this.props.work_page_tags_object['i'].active)
        if(selected_option_name == this.props.app_state.loc['1264b']/* upcoming */ && items.length != 0){
            return(
                <div style={{'margin':'5px 0px 10px 0px'}} onClick={() => this.when_pay_all_upcoming_subscriptions_button_tapped(items)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2895']/* pay all. */, 'action':''})}
                </div>
            )
        }
    }

    when_pay_all_upcoming_subscriptions_button_tapped(items){
        var my_valid_subscriptions = items.filter(function (object) {
            return (bigInt(object['data'][1][3/* <3>maximum_buy_amount */]).greater(bigInt(0)))
        })
        this.props.show_pay_upcoming_subscriptions_bottomsheet(my_valid_subscriptions)
    }

    get_subscription_items(){
        return this.remove_duplicates(this.props.get_subscription_items())
    }

    render_subscription_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_subscription_item(object)
        if(this.is_object_sender_blocked(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        if(this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */){
            return(
                <div onClick={() => this.when_subscription_item_clicked(index, object)}>
                    {this.render_detail_item('3', item['min'])}
                </div>
            )
        }
        var opacity = 1.0
        return(
            <div  style={{height:'auto', opacity:opacity, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_subscription_item_clicked(index, object)}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_subscription_item_clicked(index, object)}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    when_subscription_item_clicked(index, object){
        // if(object['hidden'] == true){
        //     this.props.notify(this.props.app_state.loc['2509d']/* 'That object is not available for you to access.' */, 9000)
        //     return;
        // }
        this.props.when_subscription_item_clicked(index, object['id'], object['e5'], object)
    }

    format_subscription_item(object){
        var tags = object['ipfs'] == null ? ['Subscription'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Subscription ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var time = object['event'] == null ? 0 : object['event'].returnValues.p4
        var sender = this.get_senders_name(object['event'].returnValues.p3, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id']+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },
            'min':{'details':object['e5']+' • '+object['id']+sender, 'title':title, 'size':'l', 'border_radius':'0%'}
        }
    }





    render_mail_list_group(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var all_items = this.get_mail_items()
        var items = this.filter_objects_and_remove_very_new_entries(all_items)

        var selected_item = this.get_selected_item(this.props.work_page_tags_object, this.props.work_page_tags_object['i'].active)

        var object_type = 'sent_mail'
        if(selected_item == this.props.app_state.loc['1208']/* 'received' */){
            object_type = 'received_mail'
        }

        if(items.length == 0){
            items = ['0','1'];
            return( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_mail_message_if_wallet_not_set()}
                        {this.show_load_metrics([], object_type)}
                        {this.show_new_objects_message_if_any(all_items)}
                        {items.map((item, index) => (
                            <div>
                                {this.render_empty_object()}
                                <div style={{height: 4}}/>
                            </div>
                        ))}
                    </ul>
                </div>
            );
        }else{
            var padding = this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */ ? '2px' : '5px'
            return (
                <div ref={this.mail_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <AnimatePresence initial={false}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style': 'none'}}>
                            {this.show_load_metrics(items, object_type)}
                            {this.show_new_objects_message_if_any(all_items)}
                            {items.map((item, index) => (
                                <motion.li initial={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                                style={{'padding': padding}}>
                                    {this.render_mail_object_or_null(item, index)}
                                </motion.li>
                            ))}
                        </ul>
                    </AnimatePresence>
                </div>
            );
        }
    }

    show_mail_message_if_wallet_not_set(){
        if(this.props.app_state.has_wallet_been_set == false){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2509g']/* 'You need to set your wallet to see your mail.' */, 'title':this.props.app_state.loc['2509f']/* 'Wallet Unset.' */})}
                    <div style={{height: 10}}/>
                </div>
            )
        }
    }

    get_mail_items(){
        return this.remove_duplicates(this.props.get_mail_items())
    }

    render_mail_object_or_null(object, index){
        if(object['ipfs'] == null){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_mail_object(object, index)}
                </div>
            )
        }
    }

    render_mail_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_mail_item(object)
        if(this.is_object_sender_blocked(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        if(this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */){
            return(
                <div onClick={() => this.when_mail_item_clicked(index, object)}>
                    {this.render_detail_item('3', item['min'])}
                </div>
            )
        }
        return(
            <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_mail_item_clicked(index, object)}>
                        {this.render_detail_item('3', item['author_title'])}
                    </div>
                    <div style={{'padding': '15px 0px 0px 0px'}} onClick={() => this.when_mail_item_clicked(index, object)}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                </div>         
            </div>
        )
    }

    when_mail_item_clicked(item, object){
        this.props.when_mail_item_clicked(item, object['id'], object)
    }

    format_mail_item(object){
        // var tags_to_use = [object['type']];
        var tags_to_use = []
        var tags = object['ipfs'] == null ? ['Mail'] : [].concat(object['ipfs'].entered_indexing_tags)
        var final_tags = tags_to_use.concat(tags)
        var details = object['ipfs'] == null ? 'Mail ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var myid = this.props.app_state.user_account_id[object['e5']]
        if(myid == null) myid = 1;
        var sender = object['event'].returnValues.p2
        var recipient = object['event'].returnValues.p1
        var title = this.props.app_state.loc['2738ab']/* 'From $' */
        title = title.replace('$', this.get_sender_title_text(sender, object))
        if(myid == sender){
            title = this.props.app_state.loc['2738ac']/* 'To $' */
            title = title.replace('$',this.get_sender_title_text(recipient, object))
        }
        
        return {
            'tags':{'active_tags':final_tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'textsize':'14px', 'text':details, 'font':this.props.app_state.font},
            'author_title':{'title':title, 'details':details, 'size':'l'},
            'age':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },
            'min':{'details':title+' • '+this.get_time_difference(time), 'title':details, 'size':'l', 'border_radius':'0%'}
        }
    }

    get_sender_title_text(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }






    render_contractor_list_group(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var all_items = this.get_contractor_items()
        var items = this.filter_objects_and_remove_very_new_entries(all_items)

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics([], 'contractor')}
                        {this.show_new_objects_message_if_any(all_items)}
                        {items.map((item, index) => (
                            <div>
                                {this.render_empty_object()}
                                <div style={{height: 4}}/>
                            </div>
                        ))}
                    </ul>
                </div>
            );
        }
        else{
            var padding = this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */ ? '2px' : '5px'
            return ( 
                <div ref={this.contractor_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <AnimatePresence initial={false}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style': 'none'}}>
                            {this.show_load_metrics(items, 'contractor')}
                            {this.show_new_objects_message_if_any(all_items)}
                            {items.map((item, index) => (
                                <motion.li initial={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                                style={{'padding': padding}}>
                                    {this.render_contractor_object(item, index)}
                                </motion.li>
                            ))}
                        </ul>
                    </AnimatePresence>
                </div>
            );
        }
    }

    get_contractor_items(){
        return this.remove_duplicates(this.props.get_contractor_items())
    }

    render_contractor_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_contractor_item(object)
        if(this.is_object_sender_blocked(object) || this.is_post_taken_down_for_sender(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        if(this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */){
            return(
                <div onClick={() => this.when_contractor_item_clicked(index, object)}>
                    {this.render_detail_item('3', item['min'])}
                </div>
            )
        }
        return(
            <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_contractor_item_clicked(index, object)}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_contractor_item_clicked(index, object)}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    format_contractor_item(object){
        var tags = object['ipfs'] == null ? ['Contractor'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(object['ipfs'].selected_device_city != null && object['ipfs'].selected_device_city != ''){
            tags = [object['ipfs'].selected_device_city].concat(tags)
        }
        var title = object['ipfs'] == null ? 'Contractor ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id']+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },
            'min':{'details':object['e5']+' • '+object['id']+sender, 'title':title, 'size':'l', 'border_radius':'0%'}
        }
    }

    when_contractor_item_clicked(index, object){
        this.props.when_contractor_post_item_clicked(index, object['id'], object['e5'], object)
    }






    render_E5s_list_group(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_e5_data()

        if(items.length == 0){
            items = ['0','1'];
            return (
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '1px 5px 1px 5px'}}>
                                {this.render_small_empty_object()}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        return (
            <div ref={this.e5_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '1px 5px 1px 5px'}}>
                            {this.render_E5s_object(item['data'], index, item['id'])}
                        </li>
                    ))}
                    {/* <div style={{'padding': '1px 5px 1px 5px'}}>
                        {this.render_small_empty_object()}
                    </div> */}
                </ul>
            </div>
        );
    }

    get_e5_data(){
        return this.remove_duplicates(this.props.get_e5_data())
    }

    render_E5s_object(item_data, index, name){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.get_e5_data_item_object(item_data, name)
        var is_active = this.props.app_state.e5s[name].active
        if(!is_active){
            return(
                <div>
                    {this.render_small_empty_object()}
                </div>
            )
        }
        return ( 
            // <div onClick={() => this.when_E5_item_clicked(index, name)} style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
            //     <div style={{'padding': '0px 0px 0px 5px'}}>
            //         {this.render_detail_item('1', item['tags'])}
            //         <div style={{height: 10}}/>
            //         <div style={{'padding': '0px 10px 0px 10px'}}>
            //             {this.render_detail_item('8', item['label'])}
            //         </div>
            //         <div style={{height: 10}}/>
            //         <div style={{'margin':'0px 10px 0px 10px'}}>
            //             {this.render_detail_item('10', item['address'])}
            //         </div>
            //         <div style={{height: 10}}/>
            //     </div>         
            // </div>
            <div onClick={() => this.when_E5_item_clicked(index, name)}>
                {this.render_detail_item('8', item['data'])}
            </div>
        );
    }

    get_address(e5){
        return this.props.app_state.addresses[e5] == null ? '0x0000000000000000000000000000000000000000' : this.props.app_state.addresses[e5][0]
    }

    get_e5_data_item_object(item_data, name){
        var image = this.props.app_state.e5s[name].e5_img
        return {
            'label':{'title':name, 'details':'Main Contract', 'size':'l', 'image': image},
            'tags':{'active_tags':['E5', 'Main', 'Contract'], 'index_option':'indexed'},
            'address':{'font':this.props.app_state.font, 'text':this.get_address(name), 'textsize':'12px'},
            'data':{'title':name, 'details':start_and_end(this.get_address(name)), 'size':'l', 'image': image, 'border_radius':'0%'}
        }
    }

    when_E5_item_clicked(index, name){
        this.props.when_E5_item_clicked(index, name)
    }







    render_search_user_data(){
        return(
            <div>
                <div className="row" style={{ padding: '5px 10px 0px 10px', width:'103%' }}>
                    <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput font={this.props.app_state.font} height={25} placeholder={this.props.app_state.loc['3068']/* Object or Account ID, Alias, "tag" or title..' */} when_text_input_field_changed={this.when_text_input_field_changed.bind(this)} text={this.state.typed_search_id} adjust_height={false} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}} onClick={()=> this.perform_search()}>
                        <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                            <img alt="" className="text-end" src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                        </div>
                    </div>
                </div>
                <div style={{height: 10}}/>
                {this.render_search_results()}
                {this.render_searched_object_results()}
            </div>
        )
    }

    when_text_input_field_changed(text){
        this.setState({typed_search_id: text})
    }

    async perform_search(){
        var typed_search = this.state.typed_search_id.trim()
        var typed_account = await this.get_typed_alias_id(typed_search)

        if(typed_account == ''){
            this.props.notify(this.props.app_state.loc['1337']/* 'Type something.' */, 3800)
        }
        // else if(isNaN(typed_account)){
        //     this.props.notify(this.props.app_state.loc['2508']/* 'That ID is not valid.' */, 3800)
        // }
        // else if(parseInt(typed_account) < 1001){
        //     this.props.notify(this.props.app_state.loc['2508']/* 'That ID is not valid.' */, 3800)
        // }
        else{
            this.props.notify(this.props.app_state.loc['2509']/* 'Searching...' */, 1000)
            this.setState({searched_account: typed_account})
            // this.props.get_searched_account_data(typed_account, typed_search)
            this.props.get_searched_account_data_trimmed(typed_account, typed_search)
        }
    }

    async get_typed_alias_id(alias){
        if(!isNaN(alias)){
            return alias
        }
        await this.props.get_account_id_from_alias(alias)
        var id = (this.props.app_state.alias_owners[this.props.app_state.selected_e5][alias] == null ? alias : this.props.app_state.alias_owners[this.props.app_state.selected_e5][alias])

        return id
    }

    get_search_results(){
        var data = this.props.app_state.searched_accounts_data[this.state.searched_account]
        if(data == null) return []
        return this.remove_duplicates(data)
    }

    get_searched_object_results(){
        var data = this.props.app_state.searched_objects_data[this.state.searched_account]
        const link_items = []
        const link_item_types = []
        if(data == null) return { link_items, link_item_types }
        var data_without_duplicates = this.remove_duplicates(data)
        for(var i=0; i<data_without_duplicates.length; i++){
            const id = data_without_duplicates[i]['id']
            const e5 = data_without_duplicates[i]['e5']
            const object_type = data_without_duplicates[i]['object_type']
            if(object_type != null && object_type != 0){
                const obj = {
                    17/* jobs */: this.props.app_state.created_jobs[e5],
                    30/* contracts */: this.props.app_state.created_contracts[e5],
                    32/* proposal */: this.props.app_state.my_proposals[e5],
                    26/* contractor */: this.props.app_state.created_contractors[e5],
                    33/* subscription */: this.props.app_state.created_subscriptions[e5],
                    18/* post */: this.props.app_state.created_posts[e5],
                    36/* channel */: this.props.app_state.created_channels[e5],
                    27/* storefront */: this.props.app_state.created_stores[e5],
                    25/* bag */: this.props.app_state.created_bags[e5],
                    31/* token */: this.props.app_state.created_tokens[e5],
                    19/* audioport */: this.props.app_state.created_audios[e5],
                    20/* videoport */: this.props.app_state.created_videos[e5],
                    21/* nitro */: this.props.app_state.created_nitros[e5]
                }
                const items = obj[object_type]
                const e5_object = items.find(e => e['id'] == id)
                if(e5_object != null && object_type != null && object_type != 0){
                    //found an object
                    link_items.push(e5_object)
                    link_item_types.push(object_type)
                }
            }
        }
        return { link_items, link_item_types }
    }

    render_search_results(){
        var middle = this.props.height-153;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_search_results()
        var object_data = this.props.app_state.searched_objects_data[this.state.searched_account]
        var objects_available = true
        if(object_data == null || object_data.length == 0){
            objects_available = false
        }

        if(items.length == 0 && !objects_available){
            items = ['0','1'];
            return (
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '1px'}}>
                                {this.render_small_empty_object()}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }else{
            return(
                <div ref={this.searched_account_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '1px'}}>
                                {this.render_searched_account_item(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_searched_account_item(item){
        var address = item['address']
        var ether_balance = item['ether_balance']
        var e5 = item['e5']
        var e5_img = this.props.app_state.e5s[e5].e5_img
        var alias = item['alias']
        
        return(
            <div onClick={() => this.props.when_searched_account_clicked(item, item['typed_search'])}>
                {this.render_detail_item('3', {'title':' • '+alias+' • '+this.state.searched_account, 'details':start_and_end(address), 'size':'l','title_image':e5_img})}
            </div>
        )
    }

    render_searched_object_results(){
        var data = this.get_searched_object_results()
        var items = data.link_items
        var item_types = data.link_item_types
        var padding = this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */ ? '2px 0px 2px 0px' : '4px 0px 4px 0px'
        return(
            <div>
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <div style={{'margin':padding}}>
                                {this.render_link_object_item(item, index, item_types[index])}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    render_link_object_item(object, index, type){
        const item = this.format_link_item(object, type)
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']

        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1

        var selector_item = type == 31/* token */ || type == 19/* audioport */ || type == 20/* videoport */ || type == 21/* nitro */ ? '8' : '3'
        
        if((this.check_if_sender_has_paid_subscriptions(object) || this.is_post_preview_enabled(object) || post_author == me) && !this.is_post_anonymous(object)){
            if(this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */){
                return(
                    <div onClick={() => this.when_link_object_clicked(index, object, type)}>
                        {this.render_detail_item(selector_item, item['min'])}
                    </div>
                )
            }
            return(
                <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                    <div style={{'padding': '0px 0px 0px 5px'}}>
                        {this.render_detail_item('1', item['tags'])}
                        <div style={{height: 10}}/>
                        <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_link_object_clicked(index, object, type)}>
                            {this.render_detail_item(selector_item, item['id'])}
                        </div>
                        <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_link_object_clicked(index, object, type)}>
                            {this.render_detail_item('2', item['age'])}
                        </div>
                    </div>         
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
    }

    format_link_item(object, object_type){
        if(object_type == 17/* jobs */){
            return this.format_job_item(object)
        }
        else if(object_type == 30/* contracts */){
            return this.format_contract_item(object)
        }
        else if(object_type == 32/* proposal */){
            return this.format_proposal_item(object)
        }
        else if(object_type == 26/* contractor */){
            return this.format_contractor_item(object)
        }
        else if(object_type == 33/* subscription */){
            return this.format_subscription_item(object)
        }
        else if(object_type == 18/* post */){
            return this.format_post_item(object)
        }
        else if(object_type == 36/* channel */){
            return this.format_channel_item(object)
        }
        else if(object_type == 27/* storefront */){
            return this.format_storefront_item(object)
        }
        else if(object_type == 25/* bag */){
            return this.format_bag_item(object)
        }
        else if(object_type == 31/* token */){
            return this.format_token_item(object)
        }
        else if(object_type == 19/* audioport */){
            return this.format_audio_item(object)
        }
        else if(object_type == 20/* videoport */){
            return this.format_video_item(object)
        }
        else if(object_type == 21/* nitro */){
            return this.format_nitro_item(object)
        }
    }

    when_link_object_clicked = async (index, object, object_type) => {
        if(object_type == 17/* jobs */){
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 30/* contracts */){
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 32/* proposal */){
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 26/* contractor */){
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 33/* subscription */){
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 18/* post */){
            var post_author = object['event'].returnValues.p5
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            
            if(this.check_if_sender_has_paid_subscriptions(object) || post_author == me){
                this.props.when_link_object_clicked(object, object_type, this.is_post_nsfw(object))
            }else{
                this.props.show_post_item_preview_with_subscription(object, 'post')
            }
        }
        else if(object_type == 36/* channel */){
            var post_author = object['event'].returnValues.p5
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1

            var is_blocked = false
            if(object['ipfs']['blocked_data'] != null){
                var my_identifier = await this.get_my_unique_crosschain_identifier_number()
                if(object['ipfs']['blocked_data']['identifiers'][my_identifier] != null){
                    //ive been blocked
                    is_blocked = true
                }
            }

            if(object['hidden'] == true || is_blocked == true){
                this.props.notify(this.props.app_state.loc['2509d']/* 'That object is not available for you to access.' */, 9000)
                return;
            }
            
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 27/* storefront */){
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 25/* bag */){
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 31/* token */){
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 19/* audioport */){
            var post_author = object['event'].returnValues.p5
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            
            if(this.check_if_sender_has_paid_subscriptions(object) || post_author == me){
                this.props.when_link_object_clicked(object, object_type)
            }else{
                this.props.show_post_item_preview_with_subscription(object, 'audio')
            }
        }
        else if(object_type == 20/* videoport */){
            var required_subscriptions = object['ipfs'].selected_subscriptions
            var post_author = object['event'].returnValues.p5
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            
            if(this.check_if_sender_has_paid_subscriptions(object) || post_author == me){
                this.props.when_link_object_clicked(object, object_type, this.is_post_nsfw(object))
            }else{
                this.props.show_post_item_preview_with_subscription(object, 'video')
            }
        }
        else if(object_type == 21/* nitro */){
            this.props.when_link_object_clicked(object, object_type)
        }
    }

    format_token_item(object){
        var object_array = object['data']
        var token_id = object['id']
        var item = object
        var type = object_array[0][3/* <3>token_type */] == 3 ? this.props.app_state.loc['3078']/* END */: this.props.app_state.loc['3079']/* SPEND */
        var active_tags = item['ipfs'] == null ? [''+type, 'token'] : item['ipfs'].entered_indexing_tags
        var name = item['ipfs'] == null ? 'Token ID: '+token_id : item['ipfs'].entered_title_text
        var img = EndImg
        if(token_id == 3){
            name = item['e5']
        } else if(token_id == 5){
            name = item['e5'].replace('E','3')
            img = SpendImg
        }
        var symbol = item['ipfs'] == null ? ''+type : item['ipfs'].entered_symbol_text
        var image = img
        if(item['ipfs']!= null){
            if(item['ipfs'].token_image!= null){
                image = item['ipfs'].token_image
            }
        }

        var balance = item['balance']
        var age = item['event'] == null ? 0 : item['event'].returnValues.p5
        var time = item['event'] == null ? 0 : item['event'].returnValues.p4
        return{
            'tags':{'active_tags':[].concat(active_tags), 'index_option':'indexed', 'when_tapped':'select_deselect_tag', 'selected_tags':this.props.app_state.explore_section_tags},
            'id':{'title':name,'details':symbol, 'size':'l', 'image':image, 'border_radius':'15%'},
            'number_label':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(balance), 'number':`${this.format_account_balance_figure(balance)}`, 'barcolor':'#606060', 'relativepower':'balance',},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }












    
    render_posts_list_group(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var all_items = this.get_post_items()
        var items = this.filter_objects_and_remove_very_new_entries(all_items)

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics([], 'posts')}
                        {this.show_new_objects_message_if_any(all_items)}
                        {items.map((item, index) => (
                            <div>
                                {this.render_empty_object()}
                                <div style={{height: 4}}/>
                            </div>
                        ))}
                    </ul>
                </div>
            );
        }else{
            var padding = this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */ ? '2px' : '5px'
            return ( 
                <div ref={this.post_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <AnimatePresence initial={false}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style': 'none'}}>
                            {this.show_load_metrics(items, 'posts')}
                            {this.show_new_objects_message_if_any(all_items)}
                            {items.map((item, index) => (
                                <motion.li initial={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                                style={{'padding': padding}}>
                                    {this.render_post_object_if_locked(item, index)}
                                </motion.li>
                            ))}
                        </ul>
                    </AnimatePresence>
                </div>
            );
        }
    }

    get_post_items(){
        return this.remove_duplicates(this.props.get_post_items())
    }


    render_post_object_if_locked(item, index){
        var post_author = item['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[item['e5']]
        if(me == null) me = 1
        if(this.check_if_sender_has_paid_subscriptions(item) || this.is_post_preview_enabled(item) || post_author == me){
            return this.render_post_object(item, index)
        }
        else{
            return(
                <div>
                    <div style={{height:160, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                        <div style={{'margin':'10px 20px 0px 0px'}}>
                            <img src={this.props.app_state.theme['letter']} style={{height:60 ,width:'auto'}} />
                            <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray', 'font-size': '13px'}}></p>
                        </div>
                    </div>
                </div>
            )
        }
    }

    check_if_sender_has_paid_subscriptions(object){
        var required_subscriptions = object['ipfs'].selected_subscriptions
        var creator_group_subscriptions = object['ipfs'].creator_group_subscriptions
        
        if(creator_group_subscriptions != null && creator_group_subscriptions.length > 0){
            var has_sender_paid_all_subs = false
            creator_group_subscriptions.forEach(subscription_e5_id => {
                var subscription_id = subscription_e5_id.split('E')[0]
                var subscription_e5 = 'E'+subscription_e5_id.split('E')[1]
                if(this.has_paid_subscription(parseInt(subscription_id), subscription_e5)){
                    //if at least one subscription has been paid
                    has_sender_paid_all_subs=  true
                }
            });
            return has_sender_paid_all_subs
        }
        else if(required_subscriptions != null && required_subscriptions.length > 0){
            var has_sender_paid_all_subs2 = false
            required_subscriptions.forEach(subscription_e5_id => {
                var subscription_id = subscription_e5_id
                var subscription_e5 = 'E25'
                if(subscription_e5_id.includes('E')){
                    subscription_id = subscription_e5_id.split('E')[0]
                    subscription_e5 = 'E'+subscription_e5_id.split('E')[1]
                }
                if(this.has_paid_subscription(parseInt(subscription_id), subscription_e5)){
                    has_sender_paid_all_subs2 =  true
                }
            });
            return has_sender_paid_all_subs2
        }else{
            return true
        }
    }

    has_paid_subscription(subscription_id, e5){
        var my_payment = this.props.app_state.my_subscription_payment_mappings[e5][subscription_id]
        if(my_payment == null || my_payment == 0) return false;
        return true
    }

    is_post_preview_enabled(object){
        if(object['ipfs'] == null || object['ipfs'].get_post_preview_option == null) return false
        var selected_post_preview_option = this.get_selected_item2(object['ipfs'].get_post_preview_option, 'e')
        if(selected_post_preview_option == 2) return true
        return false
    }

    get_selected_item2(object, option){
        return object[option][2][0]
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

    render_post_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_post_item(object)
        if(this.is_object_sender_blocked(object) || this.is_post_taken_down_for_sender(object) || !this.should_show_post_if_masked_for_outsiders(object) || this.is_object_blocked_for_sender(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        if(this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */){
            return(
                <div onClick={() => this.when_post_item_clicked(index, object)}>
                    {this.render_detail_item('3', item['min'])}
                </div>
            )
        }
        return(
            <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_post_item_clicked(index, object)}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_post_item_clicked(index, object)}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    is_post_taken_down_for_sender(object){
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        if(post_author == me) return false

        if(object['ipfs'].get_take_down_option == null) return false
        var selected_take_down_option = this.get_selected_item2(object['ipfs'].get_take_down_option, 'e')
        if(selected_take_down_option == 1) return true
    }

    should_show_post_if_masked_for_outsiders(object){
        var selected_option = this.is_post_marked_as_masked_for_outsiders(object)
        if(selected_option == false) return true
        else{
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(me <1000){
                return false
            }else{
                return true
            }
        }
    }

    is_post_marked_as_masked_for_outsiders(object){
        if(object['ipfs'].get_masked_from_outsiders_option == null) return false
        var selected_masked_option = this.get_selected_item2(object['ipfs'].get_masked_from_outsiders_option, 'e')
        if(selected_masked_option == 1) return true
        else return false
    }

    format_post_item(object){
        var tags = object['ipfs'] == null ? ['Post'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(object['ipfs'].selected_device_city != null && object['ipfs'].selected_device_city != ''){
            tags = [object['ipfs'].selected_device_city].concat(tags)
        }
        var extra = ''
        if(this.is_post_nsfw(object)){
            extra = extra+'🔞'
        }
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        if(!this.check_if_sender_has_paid_subscriptions(object) && post_author != me){
            extra = extra+'🔏'
        }
        if(extra != '') extra = extra + ' '
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        if(this.is_post_anonymous(object)){
            sender = ''
        }
        var number = this.is_post_anonymous(object) ? '???,???,???' : number_with_commas(age)
        var relativepower = this.is_post_anonymous(object) ? '???' : this.get_time_difference(time)
        var objectid = this.is_post_anonymous(object) ? '???' : object['id']

        const is_socket_job = object['ipfs'].get_chain_or_indexer_job_object != null ? this.get_selected_item2(object['ipfs'].get_chain_or_indexer_job_object, 'e') == 1 : false

        const title_image = is_socket_job == true ? (this.props.app_state.nitro_album_art[object['event']['nitro_e5_id']] == null ? this.props.app_state.static_assets['empty_image'] : this.props.app_state.nitro_album_art[object['event']['nitro_e5_id']]) : this.props.app_state.e5s[object['e5']].e5_img

        const id_to_show = is_socket_job == true && !this.is_post_anonymous(object) ? this.format_account_balance_figure2(objectid) : objectid

        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+id_to_show+sender, 'details':extra+title, 'size':'l', 'title_image':title_image, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number}`, 'barcolor':'', 'relativepower':`${relativepower}`, },
            'min':{'details':object['e5']+' • '+objectid+sender, 'title':extra+title, 'size':'l', 'border_radius':'0%'}
        }
    }

    is_post_nsfw(object){
        if(object['ipfs'].get_post_nsfw_option == null) return false
        var selected_nsfw_option = this.get_selected_item2(object['ipfs'].get_post_nsfw_option, 'e')
        if(selected_nsfw_option == 1) return true
    }

    when_post_item_clicked(index, object){
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        
        if(this.check_if_sender_has_paid_subscriptions(object) || post_author == me){
            this.props.when_post_item_clicked(index, object['id'], object['e5'], this.is_post_nsfw(object), object)
        }else{
            this.props.show_post_item_preview_with_subscription(object, 'post')
        }
    }

    get_senders_name(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return ' • '+this.props.app_state.loc['1694']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? '' : ' • '+this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
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






    render_channels_list_group(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var all_items = this.get_channel_items()
        var items = this.filter_objects_and_remove_very_new_entries(all_items)

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics([], 'channels')}
                        {this.show_new_objects_message_if_any(all_items)}
                        {items.map((item, index) => (
                            <div>
                                {this.render_empty_object()}
                                <div style={{height: 4}}/>
                            </div>
                        ))}
                    </ul>
                </div>
            );
        }else{
            var padding = this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */ ? '2px' : '5px'
            return ( 
                <div ref={this.channel_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <AnimatePresence initial={false}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style': 'none'}}>
                            {this.show_load_metrics(items, 'channels')}
                            {this.show_new_objects_message_if_any(all_items)}
                            {items.map((item, index) => (
                                <motion.li initial={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                                style={{'padding': padding}}>
                                    {this.render_channel_object(item, index)}
                                </motion.li>
                            ))}
                        </ul>
                    </AnimatePresence>
                </div>
            );
        }
    }

    render_channel_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_channel_item(object)
        if(this.is_object_sender_blocked(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        if(this.check_if_sender_has_paid_subscriptions(object) || this.is_post_preview_enabled(object) || post_author == me){
            if(this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */){
                return(
                    <div onClick={() => this.when_channel_item_clicked(index, object)}>
                        {this.render_detail_item('3', item['min'])}
                    </div>
                )
            }
            var opacity = 1.0
            return(
                <div  style={{height:'auto', opacity:opacity, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                    <div style={{'padding': '0px 0px 0px 5px'}}>
                        {this.render_detail_item('1', item['tags'])}
                        <div style={{height: 10}}/>
                        <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_channel_item_clicked(index, object)}>
                            {this.render_detail_item('3', item['id'])}
                        </div>
                        <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_channel_item_clicked(index, object)}>
                            {this.render_detail_item('2', item['age'])}
                        </div>
                        
                    </div>         
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
    }

    get_channel_items(){
        return this.remove_duplicates(this.props.get_channel_items())
    }

    format_channel_item(object){
        var tags = object['ipfs'] == null ? ['Post'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(object['ipfs'].selected_device_city != null && object['ipfs'].selected_device_city != ''){
            tags = [object['ipfs'].selected_device_city].concat(tags)
        }
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        var extra = ''
        if(object['ipfs']['blocked_data'] != null){
            extra = extra+'🗝️'
        }
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        if(!this.check_if_sender_has_paid_subscriptions(object) && post_author != me){
            extra = extra+'🔏'
        }
        if(extra != ''){
            extra = extra+' '
        }
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id']+sender, 'details':extra+title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },
            'min':{'details':object['e5']+' • '+object['id']+sender, 'title':extra+title, 'size':'l', 'border_radius':'0%'}
        }
    }

    when_channel_item_clicked = async (index, object) => {
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1

        var is_blocked = false
        if(object['ipfs']['blocked_data'] != null){
            var my_identifier = await this.get_my_unique_crosschain_identifier_number()
            if(object['ipfs']['blocked_data']['identifiers'][my_identifier] != null){
                //ive been blocked
                is_blocked = true
            }
        }

        if(object['hidden'] == true || is_blocked == true){
            this.props.notify(this.props.app_state.loc['2509d']/* 'That object is not available for you to access.' */, 9000)
            return;
        }

        this.props.when_channel_item_clicked(index, object['id'], object['e5'], object)
        
    }

    get_my_unique_crosschain_identifier_number = async () => {
        var uint8array_string = await this.props.get_my_entire_public_key() 
        var uint8array = Uint8Array.from(uint8array_string.split(',').map(x=>parseInt(x,10)));
        var arr = uint8array.toString().replaceAll(',','')
        if(arr.length > 36){
            arr = arr.slice(0, 36);
        }
        return arr
    }










    render_poll_list_group(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }

        var all_items = this.get_poll_items()
        var items = this.filter_objects_and_remove_very_new_entries(all_items)

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics([], 'polls')}
                        {this.show_new_objects_message_if_any(all_items)}
                        {items.map((item, index) => (
                            <div>
                                {this.render_empty_object()}
                                <div style={{height: 4}}/>
                            </div>
                        ))}
                    </ul>
                </div>
            );
        }else{
            var padding = this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */ ? '2px' : '5px'
            return ( 
                <div ref={this.poll_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <AnimatePresence initial={false}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style': 'none'}}>
                            {this.show_load_metrics(items, 'polls')}
                            {this.show_new_objects_message_if_any(all_items)}
                            {items.map((item, index) => (
                                <motion.li initial={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                                style={{'padding': padding}}>
                                    {this.render_poll_object(item, index)}
                                </motion.li>
                            ))}
                        </ul>
                    </AnimatePresence>
                </div>
            );
        }
    }

    render_poll_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_poll_item(object)
        if(this.is_object_sender_blocked(object) || !this.can_sender_view_poll(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        if(this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */){
            return(
                <div onClick={() => this.when_poll_item_clicked(index, object)}>
                    {this.render_detail_item('3', item['min'])}
                </div>
            )
        }
        var opacity = 1.0
        return(
            <div  style={{height:'auto', opacity:opacity, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_poll_item_clicked(index, object)}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_poll_item_clicked(index, object)}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    can_sender_view_poll(object){
        var viewers = object['ipfs'].viewers
        if(viewers == null || viewers.length == 0) return true;
        var my_active_accounts = this.load_my_active_accounts(object)
        return my_active_accounts.some(r=> viewers.includes(r))
    }

    load_my_active_accounts(object){
        var active_e5s = []
        var preferred_e5s = object['ipfs'].poll_e5s
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]
            if(this.props.app_state.e5s[e5].active == true && preferred_e5s.includes(e5)){
                var id = this.props.app_state.user_account_id[e5]
                if(id != null && id != 1){
                    var account = e5+':'+id
                    active_e5s.push(account)
                }
            }
        }
        return active_e5s
    }

    get_poll_items(){
        return this.remove_duplicates(this.props.get_poll_items())
    }

    format_poll_item(object){
        var tags = object['ipfs'] == null ? ['Post'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id']+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },
            'min':{'details':object['e5']+' • '+object['id']+sender, 'title':title, 'size':'l', 'border_radius':'0%'}
        }
    }

    when_poll_item_clicked = async (index, object) => {
        this.props.when_poll_item_clicked(index, object['id'], object['e5'], object)
    }






    render_storefront_item_list_group(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var all_items = this.get_storefront_items()
        var items = this.filter_objects_and_remove_very_new_entries(all_items)

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics([], 'storefront')}
                        {this.show_new_objects_message_if_any(all_items)}
                        {items.map((item, index) => (
                            <div>
                                {this.render_empty_object()}
                                <div style={{height: 4}}/>
                            </div>
                        ))}
                    </ul>
                </div>
            );
        }else{
            var padding = this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */ ? '2px' : '5px'
            return ( 
                <div ref={this.storefront_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <AnimatePresence initial={false}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style': 'none'}}>
                            {this.show_load_metrics(items, 'storefront')}
                            {this.show_new_objects_message_if_any(all_items)}
                            {items.map((item, index) => (
                                <motion.li initial={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                                style={{'padding': padding}}>
                                    {this.render_storefront_object(item, index)}
                                </motion.li>
                            ))}
                        </ul>
                    </AnimatePresence>
                </div>
            );
        }
    }

    get_storefront_items(){
        return this.remove_duplicates(this.props.get_storefront_items())
    }

    render_storefront_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_storefront_item(object)
        if(this.is_object_sender_blocked(object) || !this.is_item_listed(object) || this.is_object_blocked_for_sender(object) || !this.can_sender_view_poll(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        if(this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */){
            return(
                <div onClick={() => this.when_storefront_item_clicked(index, object)}>
                    {this.render_detail_item('3', item['min'])}
                </div>
            )
        }
        if(this.props.app_state.explore_display_type == this.props.app_state.loc['1593gw']/* 'image-oriented' */){
            var image = object['ipfs'].storefront_item_art == null ? this.props.app_state.static_assets['empty_image']: object['ipfs'].storefront_item_art
            var title = object['ipfs'] == null ? 'Storefront ID' : object['ipfs'].entered_title_text
            title = this.truncate(title, 35)
            var sender = this.get_senders_name(object['event'].returnValues.p5, object);
            
            var variants_available = this.props.app_state.loc['2509j']/* $ variants available. */.replace('$', object['ipfs'].variants.length)
            var e5_img = this.props.app_state.e5s[object['e5']].e5_img
            return(
                <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '11px','padding':'9px 5px 9px 10px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                    <div style={{'display': 'flex','flex-direction': 'row','padding': '0px 5px 0px 5px', width: '99%'}}>
                        <div style={{'padding':'1px 0px 0px 0px'}}>
                            <img src={this.get_image_from_file(image)} alt="" style={{height:90 ,width:90, 'border-radius': '7px', 'background-image':this.props.app_state.static_assets['empty_image'], 'max-width':170}} onClick={() => this.when_storefront_item_clicked(index, object)}/>
                        </div>
                        <div style={{'margin':'0px 0px 0px 10px', width: '99%'}} onClick={() => this.when_storefront_item_clicked(index, object)}>
                            <div style={{height: 3}}/>

                            <p style={{'font-size': '14px','color': this.props.theme['primary_text_color'],'margin': '1px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', height:'auto', 'word-wrap': 'normal'}}>{title}</p>
                            <div style={{height: 3}}/>

                            <div style={{'display': 'flex','flex-direction': 'row','padding': '0px 0px 0px 0px', width: '99%'}}>
                                <div style={{'display': 'flex','flex-direction': 'row', 'padding':'1.5px 0px 0px 0px'}}>
                                    <img src={e5_img} alt={object['e5']} style={{height:15,width:15}}/>
                                    <div style={{width:2}}/>
                                </div>
                                <p style={{'font-size': '11px','color': this.props.theme['secondary_text_color'],'margin': '1px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', height:'auto', 'word-wrap': 'normal'}}>{object['id']+sender}</p>
                            </div>
                            
                            <div style={{height: 3}}/>

                            <p style={{'font-size': '11px','color': this.props.theme['secondary_text_color'],'margin': '1px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', height:'auto', 'word-wrap': 'normal'}}>{variants_available}</p>
                            <div style={{height: 3}}/>

                            {this.render_storefront_price_data(object)}
                        </div>
                    </div>
                </div>
            )
        }

        return(
            <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_storefront_item_clicked(index, object)}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    {/* {this.render_storefront_item_images(object)} */}
                    <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_storefront_item_clicked(index, object)}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    render_storefront_price_data(object){
        var variants = object['ipfs'].variants
        var spend_price = 0;
        variants.forEach(variant => {
            var price_data = variant['price_data']
            price_data.forEach(price_item => {
                if(price_item['id'] == 5){
                    if(price_item['amount'] < spend_price || spend_price == 0){
                        spend_price = price_item['amount']
                    }
                }
            });
        });

        if(spend_price == 0){
            var id = ''
            variants.forEach(variant => {
                var price_data = variant['price_data']
                price_data.forEach(price_item => {
                    if(spend_price == 0){
                        spend_price = price_item['amount']
                        id = price_item['id']
                    }
                });
            });
            var text = this.props.app_state.loc['2509i']/* From $ SPEND */
            text = text.replace('$', this.format_account_balance_figure(spend_price))
            text = text.replace(this.props.app_state.loc['3079']/* SPEND */, this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[id])
            
            return(
                <div>
                    <p style={{'font-size': '11px','color': this.props.theme['primary_text_color'],'margin': '1px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', height:'auto', 'word-wrap': 'normal'}}>{text}</p>
                </div>
            )
        }
        var text = this.props.app_state.loc['2509i']/* From $ SPEND */.replace('$', this.format_account_balance_figure(spend_price))
        return(
            <div>
                <p style={{'font-size': '11px','color': this.props.theme['primary_text_color'],'margin': '1px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', height:'auto', 'word-wrap': 'normal'}}>{text}</p>
            </div>
        )
    }

    format_storefront_item(object){
        var tags = object['ipfs'] == null ? ['Storefront'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(object['ipfs'].selected_device_city != null && object['ipfs'].selected_device_city != ''){
            tags = [object['ipfs'].selected_device_city].concat(tags)
        }
        var title = object['ipfs'] == null ? 'Storefront ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id']+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },
            'min':{'details':object['e5']+' • '+object['id']+sender, 'title':title, 'size':'l', 'border_radius':'0%'}
        }
    }

    when_storefront_item_clicked(index, object){
        this.props.when_storefront_post_item_clicked(index, object['id'], object['e5'], object)
    }

    is_item_listed(object){
        if(object['ipfs'].get_storefront_item_listing_option == null) return true

        var selected_option = this.get_selected_item2(object['ipfs'].get_storefront_item_listing_option, 'e')
        var myid = this.props.app_state.user_account_id[object['e5']]
        if(myid == null) myid = 1
        if(selected_option == 2 && object['event'].returnValues.p5 != myid){
            return false
        }
        return true
    }

    render_storefront_item_images(object){
        var items = object['ipfs'].entered_image_objects
        if(items == null || items.length == 0) return;

        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}}>
                            <img src={item} style={{height:45 ,width:45, 'border-radius': '50%'}} onClick={() => this.when_image_tapped(items, index)}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    when_image_tapped(items, index){
        this.props.when_view_image_clicked(index, items)
    }








    render_bag_item_list_group(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var all_items = this.get_bag_items()
        var items = this.filter_objects_and_remove_very_new_entries(all_items)

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics([], 'bags')}
                        {this.show_new_objects_message_if_any(all_items)}
                        {items.map((item, index) => (
                            <div>
                                {this.render_empty_object()}
                                <div style={{height: 4}}/>
                            </div>
                        ))}
                    </ul>
                </div>
            );
        }else{
            var padding = this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */ ? '2px' : '5px'
            return( 
                <div ref={this.bag_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <AnimatePresence initial={false}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style': 'none'}}>
                            {this.show_load_metrics(items, 'bags')}
                            {this.show_new_objects_message_if_any(all_items)}
                            {items.map((item, index) => (
                                <motion.li initial={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                                style={{'padding':padding}}>
                                    {this.render_bag_object(item, index)}
                                </motion.li>
                            ))}
                        </ul>
                    </AnimatePresence>
                </div>
            );
        } 
    }

    get_bag_items(){
        return this.remove_duplicates(this.props.get_bag_items())
    }

    render_bag_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_bag_item(object)
        if(this.is_object_sender_blocked(object)){
            return(
                <div>
                    {this.render_small_empty_object()}
                </div>
            )
        }
        if(object['ipfs'] == null) return;
        if(this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */){
            return(
                <div onClick={() => this.when_bag_item_clicked(index, object)}>
                    {this.render_detail_item('3', item['min'])}
                </div>
            )
        }
        return(
            <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_tags_or_images(item, object)}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_bag_item_clicked(index, object)}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_bag_item_clicked(index, object)}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    
    render_tags_or_images(item, object){
        var images = this.get_bag_images(object)
        return(
            <div>
                {this.render_detail_item('1', item['tags'])}
            </div>
        )
        if(images.length == 0){
            return(
                <div>
                    {this.render_detail_item('1', item['tags'])}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_bag_images(images)}
                </div>
            )
        }
    }

    render_bag_images(items){
        if(items.length == 0){
            items = [1, 2, 3]
            var background_color = this.props.theme['card_background_color']
            return(
                <div style={{'margin':'0px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:40}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                <div style={{height:40, width:40, 'background-color': background_color, 'border-radius': '10px','padding':'7px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:15 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '0px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}}>
                            <img alt="" src={this.get_image_from_file(item)} style={{height:37 ,width:37, 'border-radius': '50%'}}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    format_bag_item(object){
        var tags = [object['event'].returnValues.p3]
        if(object['ipfs']['tags'] != null){
            tags = object['ipfs']['tags']
        }
        if(object['ipfs'].device_city != null){
            tags = [object['ipfs'].device_city].concat(tags)
        }
        var sender = this.get_senders_name(object['event'].returnValues.p3, object);
        var responses_text = ' • '+ object['responses']+this.props.app_state.loc['2509c']/* ' responses' */
        if(object['responses'] == 0){
            responses_text = ''
        }
        var title = object['ipfs'] == null ? '' : object['ipfs']['bag_orders'].length + this.props.app_state.loc['2509b']/* ' items' */+ responses_text + sender
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var time = object['event'] == null ? 0 : object['event'].returnValues.p4
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id'], 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img},
            // 'id_with_image':{'title':object['id'], 'details':title, 'size':'l', 'image':image},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)} ago`, },
            'min':{'details':object['e5']+' • '+object['id'], 'title':title, 'size':'l', 'border_radius':'0%'}
        }
    }

    get_bag_images(object){
        var images = []
        for(var i=0; i<object['ipfs']['bag_orders'].length; i++){
            var bag_order = object['ipfs']['bag_orders'][i]
            var variant_images = bag_order['variant_images']
            if(variant_images != null && variant_images.length > 0){
                images = images.concat(variant_images)
            }
        }

        return images

    }

    get_variant_object_from_storefront(storefront, id){
        for(var i=0; i<storefront['ipfs'].variants.length; i++){
            if(storefront['ipfs'].variants[i]['variant_id'] == id){
                return storefront['ipfs'].variants[i]
            }
        }
    }

    when_bag_item_clicked(index, object){
        this.props.when_bag_post_item_clicked(index, object['id'], object['e5'], object)
    }







    render_audio_list_group(selected_item){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var all_items = this.get_audio_items()
        var items = this.filter_objects_and_remove_very_new_entries(all_items)

        if(selected_item == this.props.app_state.loc['1264l']/* 'acquired' */){
            return(
                <div style={{ 'padding': '7px 0px 0px 0px'}}>
                    {this.render_search_songs(items)}
                    {this.render_my_bought_albums(items)}
                </div>
            )
        }

        if(selected_item == this.props.app_state.loc['1264m']/* 'playlists' */){
            return(
                <div style={{ 'padding': '7px 0px 0px 0px'}}>
                    {this.render_my_playlists(items)}
                </div>
            )
        }

        if(items.length == 0){
            items = ['0','1'];
            return (
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics([], 'audioport')}
                        {this.show_new_objects_message_if_any(all_items)}
                        {items.map((item, index) => (
                            <div>
                                {this.render_empty_object()}
                                <div style={{height: 4}}/>
                            </div>
                        ))}
                    </ul>
                </div>
            );
        }
        else{
            var padding = this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */ ? '2px' : '5px'
            return ( 
                <div ref={this.audio_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <AnimatePresence initial={false}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style': 'none'}}>
                            {this.show_load_metrics(items, 'audioport')}
                            {this.show_new_objects_message_if_any(all_items)}
                            {this.render_search_songs(items)}
                            {items.map((item, index) => (
                                <motion.li initial={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                                style={{'padding': padding}}>
                                    {this.render_audio_object_if_locked(item, index)}
                                </motion.li>
                            ))}
                        </ul>
                    </AnimatePresence>
                </div>
            );
        }
    }

    render_search_songs(audioposts){
        var items = this.get_searched_audio_items(audioposts)
        if(items.length == 0){
            return;
        }
        var data_to_search = []
        if(this.searched_data == null){
            this.searched_data = []
        }
        items.forEach(song => {
            if(!this.searched_data.includes(song['song']['track'])){
                data_to_search.push(song['song']['track'])
                if(song['song']['subtitle_type'] == 'upload'){
                    data_to_search.push(song['song']['lyrics'])
                }
                this.searched_data.push(song['song']['track'])
            }
        });
        if(data_to_search.length > 0){
            this.props.fetch_uploaded_data_from_ipfs(data_to_search, false)
        }

        return(
            <div>
                {items.map((item, index) => (
                    <div key={index}>
                        {this.render_song(item['song'], item['object'], index, 'album')} 
                        {this.render_space_if_not_last(index, items.length)}
                    </div>
                ))}
                <div style={{height:10}}/>
            </div>
        )
    }

    get_searched_audio_items(audioposts){
        const search = this.props.current_search
        if(search == null || search == ''){
            return []
        }
        var searched_string_words = search.trim().split(/\s+/).filter(word => word.length >= 3)
        var selected_songs = []
        var similar_songs = []
        audioposts.forEach(audiopost => {
            var audiopost_songs = audiopost['ipfs'].songs
            audiopost_songs.forEach(song => {
                var song_title = song['song_title']
                var song_composer = song['song_composer']

                if(
                    this.containsAllWords(song_title, searched_string_words, 'all') || 
                    this.containsAllWords(song_composer, searched_string_words, 'all')
                ){
                    selected_songs.push({'song':song, 'object':audiopost})
                }else if(
                    this.containsAllWords(song_title, searched_string_words, 'some') || 
                    this.containsAllWords(song_composer, searched_string_words, 'some')
                ){
                    similar_songs.push({'song':song, 'object':audiopost})
                }
            });
        });

        return selected_songs.concat(similar_songs)
    }
    
    render_space_if_not_last(index, length){
        if(index != length-1){
            return(
                <div>
                    <div style={{height:5}}/>
                </div>
            )
        }
    }

    render_song(item, object, index, type){
        var audio_file = item['track']
        if(!this.has_file_loaded(audio_file)){
            return(
                <div>
                    {this.render_small_empty_object()}
                </div>
            )
        }
        var border_radius = '10px';
        var text_align = 'left'
        var padding = '10px 15px 10px 15px'
        var font_size = ['15px', '12px', 19, 50];
        var explicit_selection = item['explicit'] == null ? 0 : this.get_selected_item2(item['explicit'], 'e')
        var explicit_text = explicit_selection == 1 ? '🅴 ' : ''

        var song_title = explicit_text + item['song_title'] + ( this.is_song_available_for_adding_to_playlist(item) ? ' ✅':'')
        var song_details = item['song_composer']
        var song_length = this.get_song_duration(item['basic_data'])
        var text_color = this.props.theme['secondary_text_color']
        if(this.is_song_playing(item)){
            song_length = '▶ '+song_length
            text_color = this.props.theme['primary_text_color']
        }
        var word_wrap_value = this.longest_word_length(song_title) > 53 ? 'break-word' : 'normal'
        return(
            <div onClick={() => this.when_song_item_clicked_selector(item, object, type)}>
                <div style={{'display': 'flex','flex-direction': 'row','padding': padding,'margin':'0px 0px 0px 0px', 'background-color': this.props.theme['view_group_card_item_background'],'border-radius': border_radius}}>
                    {this.render_image_if_playlist_item(item, type, object)}
                    {this.render_space_if_playlist_item(type)}
                    <div style={{height:'100%', width:'100%'}}>
                        <div>
                            <div className="row">
                                <div className="col-10" style={{'padding': '0px 0px 0px 13px' }}> 
                                    <p style={{'font-size': font_size[0],'color': this.props.theme['primary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none', height:'auto', 'word-wrap': word_wrap_value, 'overflow-wrap':word_wrap_value, 'text-align':text_align}}>{song_title}</p>
                                </div>
                                <div className="col-2" style={{'padding': '5px 15px 0px 0px' }}>
                                    <p style={{'color': text_color, 'font-size': '10px', height: 7, 'padding-top':' 0.5px', 'font-family': this.props.font}} className="text-end">{song_length}</p>
                                </div>
                            </div>
                            <p style={{'font-size': font_size[1],'color': this.props.theme['secondary_text_color'],'margin': '-3px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none', 'white-space': 'pre-line', 'overflow-wrap':'break-word', 'text-align':text_align}} >{song_details}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    longest_word_length(text) {
        if(text == null) {
            return 0
        }
        return text.toString()
            .split(/\s+/) // Split by whitespace (handles multiple spaces & newlines)
            .reduce((maxLength, word) => Math.max(maxLength, word.length), 0);
    }

    render_image_if_playlist_item(item, type, object){
        var img = item['album_art'] || object['ipfs'].album_art
        return(
            <div>
                <img src={this.get_image_from_file(img)} alt="" style={{height:43 ,width:'auto', 'border-radius': '10px'}}/>
            </div>
        )
    }

    render_space_if_playlist_item(type){
        return(
            <div style={{width:10}}></div>
        )
    }

    get_song_duration(item){
        var duration = '0:00'
        if(item['metadata'] != null && item['metadata']['format'] != null){
            var format = item['metadata']['format']
            if(format['duration'] != null){
               var min = Math.floor(parseInt(format['duration']) / 60)
               var sec = parseInt(format['duration']) % 60
               duration = min+':'+sec
            }
        }
        return duration
    }

    is_song_playing(item){
        if(this.props.app_state.current_playing_song != null && this.props.app_state.current_playing_song['song_id'] == item['song_id']){
            return true
        }
        return false
    }

    is_song_available_for_adding_to_playlist(song){
        var my_songs = this.props.app_state.my_tracks
        if(my_songs.includes(song['song_id'])){
            return true
        }
        return false
    }

    when_song_item_clicked_selector(item, object, type){
        if(type == 'album'){
            this.when_song_item_clicked(item, object)
        }else{
            this.when_song_item_clicked2(item, object)
        }
    }

    when_song_item_clicked2(item, object){
        let me = this;
        if(Date.now() - this.last_all_click_time3 < 200){
            clearTimeout(this.all_timeout3);
            //double tap
            me.props.show_dialog_bottomsheet({'item':item, 'object':object, 'from':'audio_details_section2'}, 'song_options')
        }else{
            this.all_timeout3 = setTimeout(function() {
                clearTimeout(this.all_timeout3);
                // single tap
                me.play_song_in_playlist(item, object)
            }, 200);
        }
        this.last_all_click_time3 = Date.now();
    }

    play_song_in_playlist(item, object){
        if(!this.props.app_state.has_wallet_been_set && !this.props.app_state.has_account_been_loaded_from_storage){
            this.props.notify(this.props.app_state.loc['a2527p']/* 'You need to set your account first.' */, 5000)
        }else{
            this.props.play_song_in_playlist(item, object, false)
        }
        
    }

    when_song_item_clicked(item, object){
        let me = this;
        if(Date.now() - this.last_all_click_time3 < 200){
            clearTimeout(this.all_timeout3);
            //double tap
            item['object'] = object
            item['album_art'] = object['ipfs'].album_art
            me.props.show_dialog_bottomsheet({'item':item, 'object':object, 'from':'audio_details_section'}, 'song_options')
        }else{
            this.all_timeout3 = setTimeout(function() {
                clearTimeout(this.all_timeout3);
                // single tap
                me.play_song(item, object)
            }, 200);
        }
        this.last_all_click_time3 = Date.now();
    }

    play_song(item, object){
        if(!this.props.app_state.has_wallet_been_set && !this.props.app_state.has_account_been_loaded_from_storage){
            this.props.notify(this.props.app_state.loc['a2527p']/* 'You need to set your account first.' */, 5000)
        }else{
            var post_author = object['event'].returnValues.p5
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            
            if(this.check_if_sender_has_paid_subscriptions(object) || post_author == me){
                this.props.play_song_from_list_section(item, object, this.get_preferred_audio_items(), this.is_page_my_collection_page(), false)
            }else{
                this.props.show_post_item_preview_with_subscription(object, 'audio')
            }
        }
    }

    get_preferred_audio_items(){
        var all_audios = this.get_audio_items()
        if(this.is_page_my_collection_page()){
            return this.props.app_state.my_acquired_audios.reverse()
        }
        return all_audios
    }

    is_page_my_collection_page(){
        var page_id = this.props.get_page_id()
        var my_collection_page_id = this.props.app_state.loc['1264k']/* 'audioport' */ + this.props.app_state.loc['1264l']/* 'acquired' */
        if(page_id == my_collection_page_id){
            return true
        }
        return false
    }



    render_my_bought_albums(items){
        var background_color = this.props.theme['card_background_color']
        var col = Math.round(400 / 200)
        var w = (this.state.screen_width / 2) - 5
        var rowHeight = w+40;
        var my_stacked_albums = this.get_stack_albums()
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
                        {items.map((item, index) => (
                            <ImageListItem key={index}>
                                <div>
                                    {this.render_bought_audio_item_plus_buttons(item, index, w, my_stacked_albums)}
                                </div>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            )
        }
    }

    render_bought_audio_item_plus_buttons(object, index, w, my_stacked_albums){
        var opacity = my_stacked_albums.includes(object['e5_id']) ? 0.6 : 1.0
        if(!this.check_if_sender_has_paid_subscriptions(object)){
            opacity = 0.6
        }
        return(
            <div style={{'position': 'relative', 'opacity':opacity}}>
                <div onClick={() => this.when_audio_item_clicked(index, object)} style={{width:w, height:'auto', 'z-index':'1', 'position': 'absolute',}}>
                    {this.render_my_bought_audio_item(object, index, w)}
                </div>

                <img src={this.props.app_state.static_assets['video_label']} alt="" style={{height:28 ,width:28, 'z-index':'3', 'position': 'absolute', 'margin':`${w-35}px 0px 0px 5px`, 'border-radius': '15px'}} onClick={() => this.play_audio_object(object)}/>
            </div>
        )
    }

    play_audio_object(object){
        this.when_audio_image_clicked(object)
    }

    render_my_bought_audio_item(object, index, w){
        var default_image = this.props.app_state.static_assets['music_label']
        var image = object['ipfs'] == null ? default_image :object['ipfs'].album_art
        var title = object['ipfs'] == null ? 'Audiopost ID' : object['ipfs'].entered_title_text
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        var author = object['ipfs'] == null ? sender : object['ipfs'].entered_author_text
        return(
            <div style={{width:w, height:'auto'}}>
                <img src={this.get_image_from_file(image)} alt="" style={{height:w ,width:w,'border-radius': '10px'}}/>
                <div style={{height:5}}/>
                <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '12px', 'margin':'0px'}} className="fw-bold">{this.truncate(title, 20)}</p>
                <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin':'0px'}}>{this.truncate(author, 20)}</p>
            </div>
        )
    }

    get_stack_albums(){
        const txs = this.props.app_state.stack_items
        var albums = []
        txs.forEach(transaction => {
            if(transaction.type == this.props.app_state.loc['2962']/* 'buy-album' */){
                var existing_bought_item = this.props.app_state.my_acquired_audios.find(e => e['e5_id'] === transaction.album['e5_id'])
                if(existing_bought_item == null){
                    albums.push(transaction.album['e5_id'])
                }
            }
        });

        return albums
    }


    render_my_playlists(items){
        var middle = this.props.height
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 0px 2px 0px'}}>
                                {this.render_small_empty_object()}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }else{
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 0px 2px 0px'}}>
                                {this.render_playlist_item(item, index)}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_playlist_item(item, index){
        var title = item['title']
        var details = item['details']
        return(
            <div>
                <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_playlist_selected(item, index)}>
                    {this.render_detail_item('8', {'title':title, 'details':details, 'size':'l', 'image':this.get_playlist_images(item)[0], 'border_radius':'9px'})}
                </div>
                {/* <div style={{padding:'0px 0px 0px 0px'}}>
                    {this.render_playlist_images(item)}
                </div> */}
            </div>
        )
    }

    render_playlist_images(item){
        var items = this.get_playlist_images(item)
        if(items.length == 0){
            items = [1, 2, 3]
            var background_color = this.props.theme['card_background_color']
            return(
                <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                <div style={{height:50, width:50, 'background-color': background_color, 'border-radius': '10px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}}>
                            <img alt="" src={this.get_image_from_file(item)} style={{height:25 ,width:25, 'border-radius': '50%'}}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_playlist_images(item){
        var images = []
        var item_songs = item['songs']
        item_songs.forEach(element => {
            images.push(element['album_art'])
        });

        if(images.length == 0){
            images.push(this.props.app_state.static_assets['music_label'])
        }

        return images
    }

    get_image_from_file(ecid){
        if(!ecid.startsWith('image')) return ecid
        var ecid_obj = this.get_cid_split(ecid)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return 'https://bafkreihhphkul4fpsqougigu4oenl3nbbnjjav4fzkgpjlwfya5ie2tu2u.ipfs.w3s.link/'
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]

        if(data == null) return 'https://bafkreihhphkul4fpsqougigu4oenl3nbbnjjav4fzkgpjlwfya5ie2tu2u.ipfs.w3s.link/'

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

    when_playlist_selected(item, index){
        this.props.when_playlist_selected(item, index)
    }


    get_audio_items(){
        return this.remove_duplicates(this.props.get_audio_items())
    }

    render_audio_object_if_locked(item, index){
        var post_author = item['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[item['e5']]
        if(me == null) me = 1
        if(this.check_if_sender_has_paid_subscriptions(item) || this.is_post_preview_enabled(item) || post_author == me){
            return this.render_audio_object(item, index)
        }
        else{
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
    }

    render_audio_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_audio_item(object)
        if(this.is_object_sender_blocked(object) || this.is_post_taken_down_for_sender(object) || !this.should_show_post_if_masked_for_outsiders(object) || this.is_object_blocked_for_sender(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        if(this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */){
            return(
                <div onClick={() => this.when_audio_item_clicked(index, object)}>
                    {this.render_detail_item('8', item['min'])}
                </div>
            )
        }


        if(this.props.app_state.explore_display_type == this.props.app_state.loc['1593gw']/* 'image-oriented' */){
            var image = object['ipfs'].album_art == null ? this.props.app_state.static_assets['music_label']: object['ipfs'].album_art
            var title = object['ipfs'] == null ? 'Audiopost ID' : object['ipfs'].entered_title_text
            title = this.truncate(title, 35)
            var sender = this.get_senders_name(object['event'].returnValues.p5, object);
            var author = object['ipfs'] == null ? sender : ' • '+object['ipfs'].entered_author_text
            if(this.is_post_anonymous(object)){
                author = ' • '+this.props.app_state.loc['2509k']/* '🥸 Anonymous' */
            }
            var e5_img = this.props.app_state.e5s[object['e5']].e5_img

            var extra = ''
            var post_author = object['event'].returnValues.p5
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(!this.check_if_sender_has_paid_subscriptions(object) && post_author != me){
                extra = extra+'🔏'
            }
            if(extra != '') extra = extra + ' '
            var songs_available = this.props.app_state.loc['2509l']/* '$ songs available.' */.replace('$', object['ipfs'].songs.length)

            var year = object['ipfs'] == null ? 'Audiopost' :object['ipfs'].entered_year_recorded_text

            var listing_type = object['ipfs'] == null ? 'Audiopost' :this.get_selected_item(object['ipfs'].get_listing_type_tags_option, 'e')

            var view_count_message = this.get_audio_files_view_counts(object)
            var objectid = this.is_post_anonymous(object) ? '???' : object['id']

            return(
                <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '11px','padding':'9px 5px 9px 10px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                    <div style={{'display': 'flex','flex-direction': 'row','padding': '0px 5px 0px 5px', width: '99%'}}>
                        <div style={{'padding':'1px 0px 0px 0px'}}>
                            <img src={this.get_image_from_file(image)} alt="" style={{height:90 ,width:90, 'border-radius': '7px', 'background-image':this.props.app_state.static_assets['empty_image'], 'max-width':170}} onClick={() => this.when_audio_image_clicked(object)}/>
                        </div>
                        <div style={{'margin':'0px 0px 0px 10px', width: '99%'}} onClick={() => this.when_audio_item_clicked(index, object)}>
                            <div style={{height: 3}}/>

                            <p style={{'font-size': '14px','color': this.props.theme['primary_text_color'],'margin': '1px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', height:'auto', 'word-wrap': 'normal'}}>{extra+title}</p>
                            <div style={{height: 3}}/>

                            <div style={{'display': 'flex','flex-direction': 'row','padding': '0px 0px 0px 0px', width: '99%'}}>
                                <div style={{'display': 'flex','flex-direction': 'row', 'padding':'1.5px 0px 0px 0px'}}>
                                    <img src={e5_img} alt={object['e5']} style={{height:15,width:15}}/>
                                    <div style={{width:2}}/>
                                </div>
                                <p style={{'font-size': '11px','color': this.props.theme['secondary_text_color'],'margin': '1px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', height:'auto', 'word-wrap': 'normal'}}>{objectid+author}</p>
                            </div>
                            
                            <div style={{height: 3}}/>

                            <p style={{'font-size': '11px','color': this.props.theme['secondary_text_color'],'margin': '1px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', height:'auto', 'word-wrap': 'normal'}}>{songs_available}</p>
                            <div style={{height: 3}}/>

                            <p style={{'font-size': '11px','color': this.props.theme['primary_text_color'],'margin': '1px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', height:'auto', 'word-wrap': 'normal'}}>{listing_type+' • '+ year+view_count_message}</p>
                        </div>
                    </div>
                </div>
            )
        }

        return(
            <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_audio_item_clicked(index, object)}>
                        {this.render_detail_item('8', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_audio_item_clicked(index, object)}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    get_audio_files_view_counts(object){
        var view_count = 0
        var songs = object['ipfs'].songs
        if(songs == null) return view_count;
        songs.forEach(song => {
            const track = song['track']
            var ecid_obj = this.get_cid_split(track)
            if(this.props.app_state.uploaded_data[ecid_obj['filetype']] != null && this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']] != null){
                var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
                var file = data['hash']
                var stream_data = this.props.app_state.file_streaming_data[file]
                if(stream_data != null){
                    const views = stream_data.files_view_count
                    view_count = bigInt(view_count).plus(views)
                }
            }
        });

        if(view_count > 0){
            var views_text = this.props.app_state.loc['2509n']/* views */
            if(view_count == 1){
                views_text = this.props.app_state.loc['2509o']/* view */
            }
            return ` • ${this.format_view_count(view_count)} ${views_text}`
        }
        else{
            return ''
        }
    }

    format_view_count(view_count){
        if(view_count > 1_000_000_000){
            var val = (view_count/1_000_000_000).toFixed(1)
            if(val > 10) val = val.toFixed(0)
            return `${val}B`
        } 
        else if(view_count > 1_000_000){
            var val = (view_count/1_000_000).toFixed(1)
            if(val > 10) val = val.toFixed(0)
            return `${val}M`
        }
        else if(view_count > 1_000){
            var val = (view_count/1_000).toFixed(1)
            if(val > 10) val = val.toFixed(0)
            return `${val}K`
        }
        else {
            return view_count
        }
    }

    format_audio_item(object){
        var tags = object['ipfs'] == null ? ['Audiopost'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(object['ipfs'].audio_type != null){
            tags = [object['ipfs'].audio_type].concat(tags)
        }
        var extra = ''
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        if(!this.check_if_sender_has_paid_subscriptions(object) && post_author != me){
            extra = extra+'🔏'
        }
        if(extra != '') extra = extra + ' '
        var title = object['ipfs'] == null ? 'Audiopost ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        var author = object['ipfs'] == null ? sender : object['ipfs'].entered_author_text
        if(this.is_post_anonymous(object)){
            author = ''
        }
        var listing_type = object['ipfs'] == null ? 'Audiopost' :this.get_selected_item(object['ipfs'].get_listing_type_tags_option, 'e')
        var default_image = this.props.app_state.static_assets['music_label']
        var image = object['ipfs'] == null ? default_image :object['ipfs'].album_art
        var view_count_message = this.get_audio_files_view_counts(object)

        var number = this.is_post_anonymous(object) ? '???,???,???' : number_with_commas(age)
        var relativepower = this.is_post_anonymous(object) ? '???' : this.get_time_difference(time)
        var objectid = this.is_post_anonymous(object) ? '???' : object['id']
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':/* object['e5']+' • '+object['id']+' • '+ *//* listing_type+' • '+ */author+view_count_message, 'details':extra+title, 'size':'l', 'image':image, 'border_radius':'7px', 'image_click': 'when_audio_image_clicked', 'text_click':'when_audio_text_clicked', 'object':object},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number}`, 'barcolor':'', 'relativepower':`${relativepower}`, },
            'min':{'details': author+' • '+relativepower+view_count_message, 'title':extra+title, 'size':'l','image':image, 'border_radius':'7px', 'image_click': 'when_audio_image_clicked', 'text_click':'when_audio_text_clicked', 'object':object}
        }
    }

    when_audio_item_clicked(index, object){
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        
        if(this.check_if_sender_has_paid_subscriptions(object) || post_author == me){
            this.props.when_audio_item_clicked(index, object['id'], object['e5'], object)
        }else{
            this.props.show_post_item_preview_with_subscription(object, 'audio')
        }
    }

    when_audio_image_clicked(object){
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        var index = 0
        if(this.check_if_sender_has_paid_subscriptions(object) || post_author == me){
            this.props.when_audio_item_clicked(index, object['id'], object['e5'], object)
            this.props.play_album_from_list_section(object)
        }else{
            this.props.show_post_item_preview_with_subscription(object, 'audio')
        }
    }

    when_audio_text_clicked(object){
        this.when_audio_item_clicked(0, object)
    }










    render_video_list_group(selected_item){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var all_items = this.get_video_items()
        var items = this.filter_objects_and_remove_very_new_entries(all_items)

        if(selected_item == this.props.app_state.loc['1264l']/* 'acquired' */){
            return(
                <div style={{ 'padding': '7px 0px 0px 0px'}}>
                    {this.render_search_videos(items)}
                    {this.render_my_bought_videos(items)}
                </div>
            )
        }

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics([], 'videoport')}
                        {this.show_new_objects_message_if_any(all_items)}
                        {items.map((item, index) => (
                            <div>
                                {this.render_empty_object()}
                                <div style={{height: 4}}/>
                            </div>
                        ))}
                    </ul>
                </div>
            );
        }
        else{
            var padding = this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */ ? '2px' : '5px'
            return ( 
                <div ref={this.video_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <AnimatePresence initial={false}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style': 'none'}}>
                            {this.show_load_metrics(items, 'videoport')}
                            {this.show_new_objects_message_if_any(all_items)}
                            {this.render_search_videos(items)}
                            {items.map((item, index) => (
                                <motion.li initial={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                                style={{'padding': padding}}>
                                    {this.render_video_object_if_locked(item, index)}
                                </motion.li>
                            ))}
                        </ul>
                    </AnimatePresence>
                </div>
            );
        }
    }

    render_search_videos(vieoposts){
        var items = this.get_searched_video_items(vieoposts)
        if(items.length == 0){
            return;
        }
        var data_to_search = []
        if(this.searched_data == null){
            this.searched_data = []
        }
        items.forEach(song => {
            if(!this.searched_data.includes(song['video']['video'])){
                data_to_search.push(song['video']['video'])
                this.searched_data.push(song['video']['video'])
            }
        });
        if(data_to_search.length > 0){
            this.props.fetch_uploaded_data_from_ipfs(data_to_search, false)
        }

        return(
            <div>
                {items.map((item, index) => (
                    <div key={index}>
                        {this.render_video(item['video'], item['object'], index)} 
                        {this.render_space_if_not_last(index, items.length)}
                    </div>
                ))}
                <div style={{height:10}}/>
            </div>
        )
    }

    has_file_loaded(file){
        var ecid_obj = this.get_cid_split(file)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return false;
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        if(data == null || data['data'] == null) return false
        return true
    }

    get_searched_video_items(videoposts){
        var search = this.props.current_search
        if(search == null || search == ''){
            return []
        }
        var searched_string_words = search.trim().split(/\s+/).filter(word => word.length >= 3)
        var selected_videos = []
        var similar_videos = []
        videoposts.forEach(videopost => {
            var videopost_videos = videopost['ipfs'].videos
            videopost_videos.forEach(video => {
                var video_title = video['video_title'];
                var video_composer = video['video_composer']
                console.log('get_searched_video_items', video_title, video_composer, searched_string_words)
                if(
                    this.containsAllWords(video_title, searched_string_words, 'all') || 
                    this.containsAllWords(video_composer, searched_string_words, 'all')
                ){
                    selected_videos.push({'video':video, 'object':videopost})
                }else if(
                    this.containsAllWords(video_title, searched_string_words, 'some') || 
                    this.containsAllWords(video_composer, searched_string_words, 'some')
                ){
                    similar_videos.push({'video':video, 'object':videopost})
                }
            });
        });

        return selected_videos.concat(similar_videos)
    }

    containsAllWords(text, requiredWords, type) {
        const lowerText = text.toLowerCase();
        if(type == 'all'){
            return requiredWords.every(word => lowerText.includes(word.trim().toLowerCase()));
        }
        if(requiredWords.length > 1){
            const matchCount = requiredWords.filter(word => lowerText.includes(word.toLowerCase())).length;
            return matchCount >= 2;
        }
        return requiredWords.some(word => lowerText.includes(word.trim().toLowerCase()));
    }

    render_video(item, object, index){
        var video_file = item['video']
        var ecid_obj = this.get_cid_split(video_file)
        if(!this.has_file_loaded(video_file)){
            return(
                <div>
                    {this.render_small_empty_object()}
                </div>
            )
        }
        var default_image = this.props.app_state.static_assets['video_label']
        var image = object['ipfs'] == null ? default_image : object['ipfs'].album_art
        return(
            <div onClick={() => this.when_searched_video_item_clicked(item, object)}>
                {this.render_detail_item('8', {'details':item['video_composer'],'title':item['video_title']+(this.is_video_available_for_viewing(item) ? ' ✅':''), 'size':'l', 'image':image, 'border_radius':'9px', 'image_width':'auto'})}
            </div>
        )
    }

    is_video_available_for_viewing(video){
        if(video['price_data'].length == 0) return true;
        var my_video = this.props.app_state.my_videos
        if(my_video.includes(video['video_id'])){
            return true
        }
        return false
    }

    when_searched_video_item_clicked(item, object){
        if(!this.props.app_state.has_wallet_been_set && !this.props.app_state.has_account_been_loaded_from_storage){
            this.props.notify(this.props.app_state.loc['a2527p']/* 'You need to set your account first.' */, 5000)
        }
        else if(!this.is_video_available_for_viewing(item)){
            this.props.notify(this.props.app_state.loc['b2527f']/* 'You need to purchase access to the video first.' */, 5000)
        }
        else{
            var post_author = object['event'].returnValues.p5
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            var index = 0
            if(this.check_if_sender_has_paid_subscriptions(object) || post_author == me){
                this.props.play_video_from_list_section(item, object)
            }else{
                this.props.show_post_item_preview_with_subscription(object, 'video')
            }
        }
    }




    render_my_bought_videos(items){
        var background_color = this.props.theme['card_background_color']
        var col = Math.round(400 / 200)
        var w = (this.state.screen_width / 2) - 5
        var rowHeight = w+40;
        var stacked_videoposts = this.get_stack_videposts()
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
                        {items.map((item, index) => (
                            <ImageListItem key={index}>
                                <div onClick={() => this.when_video_item_clicked(index, item)}>
                                    {this.render_my_bought_video_item(item, index, w, stacked_videoposts)}
                                </div> 
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            )
        }
    }

    get_stack_videposts(){
        const txs = this.props.app_state.stack_items
        var videoposts = []
        txs.forEach(transaction => {
            if(transaction.type == this.props.app_state.loc['a2962a']/* 'buy-video' */){
                var existing_bought_item = this.props.app_state.my_acquired_videos.find(e => e['e5_id'] === transaction.videopost['e5_id'])
                if(existing_bought_item == null){
                    videoposts.push(transaction.videopost['e5_id'])
                }
            }
        });

        return videoposts
    }

    render_my_bought_video_item(object, index, w, stacked_videoposts){
        var default_image = this.props.app_state.static_assets['video_label']
        var image = object['ipfs'] == null ? default_image :object['ipfs'].album_art
        var title = object['ipfs'] == null ? 'Videopost ID' : object['ipfs'].entered_title_text
        var sender = this.get_senders_name2(object['event'].returnValues.p5, object);
        var author = sender
        var opacity = stacked_videoposts.includes(object['e5_id']) ? 0.6 : 1.0
        return(
            <div style={{width:w, height:'auto', 'opacity':opacity}}>
                <img src={this.get_image_from_file(image)} alt="" style={{height:w ,width:w,'border-radius': '10px'}}/>
                <div style={{height:5}}/>
                <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '12px', 'margin':'0px'}} className="fw-bold">{this.truncate(title, 20)}</p>
                <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin':'0px'}}>{this.truncate(author, 20)}</p>
            </div>
        )
    }

    get_video_items(){
        return this.remove_duplicates(this.props.get_video_items())
    }

    render_video_object_if_locked(item, index){
        var post_author = item['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[item['e5']]
        if(me == null) me = 1
        if(this.check_if_sender_has_paid_subscriptions(item) || this.is_post_preview_enabled(item) || post_author == me){
            return this.render_video_object(item, index)
        }
        else{
            return(
                <div>
                    <div style={{height:160, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                        <div style={{'margin':'10px 20px 0px 0px'}}>
                            <img alt="" src={this.props.app_state.theme['letter']} style={{height:60 ,width:'auto'}} />
                            <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray', 'font-size': '13px'}}></p>
                        </div>
                    </div>
                </div>
            )
        }
    }

    render_video_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_video_item(object)
        if(this.is_object_sender_blocked(object) || this.is_post_taken_down_for_sender(object) || !this.should_show_post_if_masked_for_outsiders(object) || this.is_object_blocked_for_sender(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        if(this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */){
            return(
                <div onClick={() => this.when_video_item_clicked(index, object)}>
                    {this.render_detail_item('8', item['min'])}
                </div>
            )
        }

        if(this.props.app_state.explore_display_type == this.props.app_state.loc['1593gw']/* 'image-oriented' */){
            var image = object['ipfs'].album_art == null ? this.props.app_state.static_assets['video_label']: object['ipfs'].album_art
            var title = object['ipfs'] == null ? 'Videopost ID' : object['ipfs'].entered_title_text
            title = this.truncate(title, 35)
            var author = this.get_senders_name(object['event'].returnValues.p5, object);
            if(this.is_post_anonymous(object)){
                author = ' • '+this.props.app_state.loc['2509k']/* '🥸 Anonymous' */
            }
            var e5_img = this.props.app_state.e5s[object['e5']].e5_img

            var extra = ''
            var post_author = object['event'].returnValues.p5
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(!this.check_if_sender_has_paid_subscriptions(object) && post_author != me){
                extra = extra+'🔏'
            }
            if(extra != '') extra = extra + ' '
            var videos_available = this.props.app_state.loc['2509m']/* '$ videos available.' */.replace('$', object['ipfs'].videos.length)

            var listing_type = object['ipfs'] == null ? 'Videopost' :this.get_selected_item(object['ipfs'].get_listing_type_tags_option, 'e')

            var time = object['event'] == null ? 0 : object['event'].returnValues.p6
            var blur = this.is_post_nsfw(object)

            var view_count_message = this.get_video_files_view_counts(object)
            var relativepower = this.is_post_anonymous(object) ? '???' : this.get_time_difference(time)
            var objectid = this.is_post_anonymous(object) ? '???' : object['id']
            return(
                <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '11px','padding':'9px 5px 9px 10px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                    <div style={{'display': 'flex','flex-direction': 'row','padding': '0px 5px 0px 5px', width: '99%'}}>
                        <div style={{'padding':'1px 0px 0px 0px'}}>
                            {this.render_video_image(image, object, blur)}
                        </div>
                        <div style={{'margin':'0px 0px 0px 10px', width: '99%'}} onClick={() => this.when_video_text_clicked(object)}>
                            <div style={{height: 3}}/>

                            <p style={{'font-size': '14px','color': this.props.theme['primary_text_color'],'margin': '1px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', height:'auto', 'word-wrap': 'normal'}}>{extra+title}</p>
                            <div style={{height: 3}}/>

                            <div style={{'display': 'flex','flex-direction': 'row','padding': '0px 0px 0px 0px', width: '99%'}}>
                                <div style={{'display': 'flex','flex-direction': 'row', 'padding':'1.5px 0px 0px 0px'}}>
                                    <img src={e5_img} alt={object['e5']} style={{height:15,width:15}}/>
                                    <div style={{width:2}}/>
                                </div>
                                <p style={{'font-size': '11px','color': this.props.theme['secondary_text_color'],'margin': '1px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', height:'auto', 'word-wrap': 'normal'}}>{objectid+author}</p>
                            </div>
                            
                            <div style={{height: 3}}/>

                            <p style={{'font-size': '11px','color': this.props.theme['secondary_text_color'],'margin': '1px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', height:'auto', 'word-wrap': 'normal'}}>{videos_available}</p>
                            <div style={{height: 3}}/>

                            <p style={{'font-size': '11px','color': this.props.theme['primary_text_color'],'margin': '1px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', height:'auto', 'word-wrap': 'normal'}}>{listing_type+' • '+ relativepower+view_count_message}</p>
                        </div>
                    </div>
                </div>
            )
        }

        return(
            <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_video_item_clicked(index, object)}>
                        {this.render_detail_item('8', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_video_item_clicked(index, object)}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    get_video_files_view_counts(object){
        var view_count = 0
        var videos = object['ipfs'].videos
        if(videos == null) return view_count;
        videos.forEach(video => {
            const video_link = video['video']
            var ecid_obj = this.get_cid_split(video_link)
            if(this.props.app_state.uploaded_data[ecid_obj['filetype']] != null && this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']] != null){
                var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
                var file = data['hash']
                var stream_data = this.props.app_state.file_streaming_data[file]
                if(stream_data != null){
                    const views = stream_data.files_view_count
                    view_count = bigInt(view_count).plus(views)
                }
            }
        });

        if(view_count > 0){
            var views_text = this.props.app_state.loc['2509n']/* views */
            if(view_count == 1){
                views_text = this.props.app_state.loc['2509o']/* view */
            }
            return ` • ${this.format_view_count(view_count)} ${views_text}`
        }
        else{
            return ''
        }
    }

    render_video_image(image, object, blur){
        if(blur == true){
            return(
                <div>
                    <img src={this.get_image_from_file(image)} alt="" style={{height:90 ,width:'auto', 'border-radius': '7px', 'background-image':this.props.app_state.static_assets['empty_image'], 'max-width':170, 'filter': 'blur(3px)', '-webkit-filter': 'blur(3px)'}} onClick={() => this.when_video_image_clicked(object)}/>
                </div>
            )
        }else{
            return(
                <div>
                    <img src={this.get_image_from_file(image)} alt="" style={{height:90 ,width:'auto', 'border-radius': '7px', 'background-image':this.props.app_state.static_assets['empty_image'], 'max-width':170}} onClick={() => this.when_video_image_clicked(object)}/>
                </div>
            )
        }
    }

    format_video_item(object){
        var tags = object['ipfs'] == null ? ['Videopost'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(object['ipfs'].video_type != null){
            tags = [object['ipfs'].video_type].concat(tags)
        }
        var extra = ''
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        if(!this.check_if_sender_has_paid_subscriptions(object) && post_author != me){
            extra = extra+'🔏'
        }
        if(extra != '') extra = extra + ' '
        var title = object['ipfs'] == null ? 'Videopost ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name2(object['event'].returnValues.p5, object);
        var author = sender
        if(this.is_post_anonymous(object)){
            author = ''
        }
        var default_image = this.props.app_state.static_assets['video_label']
        var image = object['ipfs'] == null ? default_image : object['ipfs'].album_art
        var view_count_message = this.get_video_files_view_counts(object)
        var number = this.is_post_anonymous(object) ? '???,???,???' : number_with_commas(age)
        var relativepower = this.is_post_anonymous(object) ? '???' : this.get_time_difference(time)
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':author+view_count_message, 'details':extra+title, 'size':'l', 'image':image, 'border_radius':'7px', 'image_click': 'when_video_image_clicked', 'text_click':'when_video_text_clicked', 'object':object, 'image_width':'auto', 'blur_image':this.is_post_nsfw(object)},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number}`, 'barcolor':'', 'relativepower':`${relativepower}`, },
            'min':{'details': author+' • '+relativepower+view_count_message, 'title':extra+title, 'size':'l','image':image, 'border_radius':'7px', 'image_click': 'when_video_image_clicked', 'text_click':'when_video_text_clicked', 'object':object, 'blur_image':this.is_post_nsfw(object)}
        }
    }

    get_senders_name2(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    when_video_item_clicked(index, object){
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        
        if(this.check_if_sender_has_paid_subscriptions(object) || post_author == me){
            this.props.when_video_item_clicked(index, object['id'], object['e5'], this.is_post_nsfw(object), object)
        }else{
            this.props.show_post_item_preview_with_subscription(object, 'video')
        }
    }

    when_video_image_clicked(object){
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        var index = 0
        if(this.check_if_sender_has_paid_subscriptions(object) || post_author == me){
            this.props.when_video_item_clicked(index, object['id'], object['e5'], this.is_post_nsfw(object), object)
            this.props.play_videopost_from_list_section(object)
        }else{
            this.props.show_post_item_preview_with_subscription(object, 'video')
        }
    }

    when_video_text_clicked(object){
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        var index = 0
        if(this.check_if_sender_has_paid_subscriptions(object) || post_author == me){
            this.props.when_video_item_clicked(index, object['id'], object['e5'], this.is_post_nsfw(object), object)
        }else{
            this.props.show_post_item_preview_with_subscription(object, 'video')
        }
    }









    render_coins_list_group(){
        var middle = this.props.height;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_coins_data()
        var x = this.props.app_state.os == 'iOS' ? 60 : 53

        if(items.length == 0){
            items = ['0','1'];
            return (
                <div>
                    <div style={{ 'margin': '5px 5px 5px 5px'}}>
                        <TextInput font={this.props.app_state.font} height={25} placeholder={this.props.app_state.loc['2509a']/* 'Enter Name or Symbol...' */} adjust_height={false} when_text_input_field_changed={this.when_coin_search_coin_input_field_changed.bind(this)} text={this.state.typed_search_coin_id} theme={this.props.theme} />
                    </div>
                    <div style={{overflow: 'auto', height: middle-x}}>
                        <ul style={{'list-style-type':'none', 'margin': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '1px 5px 1px 5px'}}>
                                    {this.render_small_empty_object()}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <div style={{ 'margin': '5px 5px 5px 5px'}}>
                    <TextInput font={this.props.app_state.font} height={25} placeholder={this.props.app_state.loc['2509a']/* 'Enter Name or Symbol...' */} adjust_height={false} when_text_input_field_changed={this.when_coin_search_coin_input_field_changed.bind(this)} text={this.state.typed_search_coin_id} theme={this.props.theme} />
                </div>
                <div ref={this.coin_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', height: middle-x}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '1px 5px 1px 5px'}}>
                                {this.render_coin_item(item, index)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    when_coin_search_coin_input_field_changed(text){
        this.setState({typed_search_coin_id: text})
    }

    render_coin_item(item, index){
        if(item == 'e'){
            return(
                <div>
                    {this.render_detail_item('0')} 
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_coin_object(item, index)}
                </div>
            )
        }
    }

    render_coin_object(item, index){
        return ( 
            <div onClick={() => this.when_coin_object_clicked(index, item)}>
                {this.render_detail_item('8', item['label'])}
            </div>
        );
    }

    get_coins_data(){
        var list = []
        var coins = this.props.app_state.coins
        for (const coin in coins) {
            if (coins.hasOwnProperty(coin)) {
                list.push(coins[coin])
            }
        }

        var sorted_list =  this.sortByAttributeDescending(list, 'name')
        var prioritized_list = []
        sorted_list.forEach(token => {
            if(this.does_coin_have_balance(token['id'])){
                prioritized_list.push(token)
            }
        });
        if(prioritized_list.length != 0) {
            prioritized_list.push('e')
        }
        sorted_list.forEach(token => {
            if(!prioritized_list.includes(token)){
                prioritized_list.push(token)
            }
        });



        if(this.state.typed_search_coin_id == '') return prioritized_list;
        else{
            var filtered_list = []
            prioritized_list.forEach(token => {
                var name = token['name'] == null ? '' : token['name']
                var symbol = token['id'] == null ? '' : token['id']
                var typed_word = this.state.typed_search_coin_id.toLowerCase()
                if(name.toLowerCase().startsWith(typed_word) || symbol.toLowerCase().startsWith(typed_word)){
                    filtered_list.push(token)
                }
            });
            return filtered_list;
        }
    }

    does_coin_have_balance(symbol){
        if(this.props.app_state.coin_data[symbol] == null) return false
        var coin_balance = this.props.app_state.coin_data[symbol]['balance']
        if(coin_balance == null || coin_balance == 0) return false
        return true
    }

    when_coin_object_clicked(index, item){
        this.props.when_coin_object_clicked(item['id'])
    }







    render_ethers_list_group(){
        var middle = this.props.height;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_ethers_data()
        if(items.length == 0){
            items = ['0','1'];
            return (
                <div>
                    <div style={{ 'margin': '5px 5px 5px 5px'}}>
                        <TextInput font={this.props.app_state.font} height={25} placeholder={this.props.app_state.loc['2509a']/* 'Enter Name or Symbol...' */} when_text_input_field_changed={this.when_search_ether_input_field_changed.bind(this)} text={this.state.typed_search_ether_id} adjust_height={false} theme={this.props.theme}/>
                    </div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'margin': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '1px 5px 1px 5px'}}>
                                    {this.render_small_empty_object()}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            );
        }

        var x = this.props.app_state.os == 'iOS' ? 60 : 53

        return ( 
            <div>
                <div style={{ 'margin': '5px 5px 5px 5px'}}>
                    <TextInput font={this.props.app_state.font} height={25} placeholder={this.props.app_state.loc['2509a']/* 'Enter Name or Symbol...' */} when_text_input_field_changed={this.when_search_ether_input_field_changed.bind(this)} adjust_height={false} text={this.state.typed_search_ether_id} theme={this.props.theme} />
                </div>

                <div ref={this.ether_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', height: middle-x}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '1px 5px 1px 5px'}}>
                                {this.render_ether_item(item, index)}
                            </li>
                        ))}
                        {/* <div style={{'padding': '1px 5px 1px 5px'}}>
                            {this.render_small_empty_object()}
                        </div> */}
                    </ul>
                </div>
            </div>
        );
    }

    render_ether_item(item, index){
        if(item == 'e'){
            return(
                <div>
                    {this.render_detail_item('0')} 
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_ethers_object(item, index)}
                </div>
            )
        }
    }

    when_search_ether_input_field_changed(text){
        this.setState({typed_search_ether_id: text})
    }

    render_ethers_object(item, index){
        var clone = structuredClone(item['label'])
        clone['title'] = this.get_ethers_wallet_status_icon(item)+clone['title']
        return (
            <div onClick={() => this.when_ether_object_clicked(index, item)}>
                {this.render_detail_item('8', item['label'])}
            </div>
        );
    }

    get_ethers_wallet_status_icon(item){
        if(this.get_gas_limit(item['e5']) == 0){
            if(this.props.app_state.wallet_status[item['e5']] == 'synchronizing'){
                return '⏳ '/* synchronizing... */
            }else{
                return '⚠️ ' /* failed to load data */
            }
        }else{
            return '' /* synchronized */
        }
    }

    get_gas_limit(e5){
        try{
            return this.format_account_balance_figure(this.get_latest_block_data(e5).gasLimit)
        }catch(e){
            // console.log(e)
            return 0
        }
    }

    get_latest_block_data(e5){
        if(this.props.app_state.last_blocks[e5] == null || this.props.app_state.last_blocks[e5].length  ==  0){
            return {}
        }
        return this.props.app_state.last_blocks[e5][0];
    }

    get_ethers_data(){
        var state_list = this.props.app_state.ether_data
        var list = []
        state_list.forEach(ether_desc => {
            if(ether_desc['disabled'] == false) list.push(this.get_token_data(ether_desc['symbol'], ether_desc['name'], ether_desc['e5']));
        });

        var sorted_list =  this.sortByAttributeDescending(list, 'sortname')
        var prioritized_list = []
        sorted_list.forEach(token => {
            if(this.does_account_have_balance(token['e5'])){
                prioritized_list.push(token)
            }
        });
        if(prioritized_list.length != 0) {
            prioritized_list.push('e')
        }
        sorted_list.forEach(token => {
            if(!prioritized_list.includes(token)){
                prioritized_list.push(token)
            }
        });

        
        if(this.state.typed_search_ether_id == '') return prioritized_list;
        else{
            var filtered_list = []
            prioritized_list.forEach(token => {
                var name = token['name'] == null ? '' : token['name']
                var symbol = token['id'] == null ? '' : token['id']
                var typed_word = this.state.typed_search_ether_id.toLowerCase()
                if(name.toLowerCase().startsWith(typed_word) || symbol.toLowerCase().startsWith(typed_word)){
                    filtered_list.push(token)
                }
            });
            return filtered_list;
        }
    }

    does_account_have_balance(e5){
        if(this.props.app_state.account_balance[e5] != null && this.props.app_state.account_balance[e5]!=0){
            return true
        }
        return false
    }

    sortByAttributeDescending(array, attribute) {
      return array.sort((a, b) => {
          if (a[attribute] > b[attribute]) {
          return 1;
          }
          if (a[attribute] < b[attribute]) {
          return -1;
          }
          return 0;
      });
    }

    get_token_data(symbol, name, e5){
        return {
            'id':symbol,
            'e5':e5,
            'name': name,
            'sortname':name.toLowerCase(),
            'symbol': symbol,
            'image': this.props.app_state.e5s[e5].ether_image,
            'label':{'title':symbol, 'details':name, 'size':'l', 'image': this.props.app_state.e5s[e5].ether_image},
            'tags':{'active_tags':[name, 'EVM', symbol], 'index_option':'indexed'},
            'number_label':this.get_blockchain_data('s', e5),
            'number_label_large': this.get_blockchain_data('l', e5),
            'banner-icon':{'header':symbol, 'subtitle':name, 'image':this.props.app_state.e5s[e5].ether_image},
        }
    }

    get_blockchain_data(size, e5){
        var number_of_blocks = this.props.app_state.number_of_blocks[e5]
        if(number_of_blocks == null){
            number_of_blocks = 0
        }
        return{
            'style':size,
            'title':'Number of Blocks Mined',
            'subtitle':this.format_power_figure(number_of_blocks),
            'barwidth':this.get_number_width(number_of_blocks),
            'number':`${number_with_commas(number_of_blocks)} blocks`,
            'barcolor':'#606060',
            'relativepower':'ledger size',
        }
    }

    when_ether_object_clicked(index, item){
        this.props.when_ether_object_clicked(index, item['id'])
    }







    render_ends_list_group(){
        var middle = this.props.height
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var all_items = this.get_end_exchange_tokens()
        var items = this.filter_objects_and_remove_very_new_entries(all_items)

        if(items.length == 0){
            items = ['0','1'];
            return (
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics([], 'tokens')}
                        {this.show_new_objects_message_if_any(all_items)}
                        {items.map((item, index) => (
                            <div>
                                {this.render_empty_object()}
                                <div style={{height: 4}}/>
                            </div>
                        ))}
                    </ul>
                </div>
            );
        }
        var padding = this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */ ? '2px 1px 2px 1px' : '5px 3px 5px 3px'
        return (
            <div ref={this.end_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                <AnimatePresence initial={false}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style': 'none'}}>
                        {this.show_load_metrics(items, 'tokens')}
                        {this.show_new_objects_message_if_any(all_items)}
                        {items.map((item, index) => (
                            <motion.li initial={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                            style={{'padding': padding}}>
                                {this.render_ends_object(item['data'], index, item['id'], item['img'], item)}
                            </motion.li>
                        ))}
                    </ul>
                </AnimatePresence>
            </div>
        );
    }

    get_end_exchange_tokens(){
        return this.remove_duplicates(this.props.get_end_token_items())
    }

    get_exchange_tokens(exchange_type){
        return this.remove_duplicates(this.props.get_exchange_tokens(exchange_type))
    }

    render_ends_object(object_array, index, token_id, img, object){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.get_exchanges_data(object_array, token_id, img, object)
        if(this.is_object_sender_blocked(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        var is_active = this.props.app_state.e5s[object['e5']].active
        if(!is_active && token_id == 3){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        if(this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */){
            return(
                <div onClick={() => this.when_ends_object_clicked(index, object)}>
                    {this.render_detail_item('8', item['min'])}
                </div>
            )
        }
        var opacity = 1.0
        return (
            <div  style={{height:'auto', opacity:opacity, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div onClick={() => this.when_ends_object_clicked(index, object)}>
                        <div style={{'padding': '0px 10px 0px 10px'}}>
                            {this.render_detail_item('8', item['label'])}
                        </div>
                        <div style={{height: 20}}/>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        );
    }

    when_ends_object_clicked(index, item){
        this.props.when_ends_object_clicked(index, item['id'], item['e5'], item)
    }

    get_exchanges_data(object_array, token_id, img, item){
        var type = object_array[0][3/* <3>token_type */] == 3 ? this.props.app_state.loc['3078']/* END */: this.props.app_state.loc['3079']/* SPEND */
        var supply = object_array[2][2/* <2>token_exchange_liquidity/total_supply */]
        var name = item['ipfs'] == null ? 'Token ID: '+token_id : item['ipfs'].entered_title_text
        if(token_id == 3){
            // var obj = {'E15':'E15', 'E25':'E25', 'E35':'E35'}
            name = item['e5']
        } else if(token_id == 5){
            // var obj = {'E15':'315', 'E25':'325', 'E35':'335'}
            // name = obj[item['e5']]
            name = item['e5'].replace('E','3')
        }
        var active_tags = item['ipfs'] == null ? [''+type, this.props.app_state.loc['601']/* token */, name] : item['ipfs'].entered_indexing_tags
        var symbol = item['ipfs'] == null ? ''+type : item['ipfs'].entered_symbol_text
        // var image = item['ipfs'] == null ? img : item['ipfs'].token_image
        var image = img
        if(item['ipfs']!= null){
            if(item['ipfs'].token_image!= null){
                image = item['ipfs'].token_image
            }
        }

        var balance = item['balance']
        var age = item['event'] == null ? this.props.app_state.boot_times[item['e5']]['block'] : item['event'].returnValues.p5
        var time = item['event'] == null ? this.props.app_state.boot_times[item['e5']]['time'] : item['event'].returnValues.p4

        var buy_tokens = [].concat(object_array[3])
        var buy_amounts = [].concat(object_array[4])
        var input_amount = 1
        var input_reserve_ratio = object_array[2][0]
        var output_reserve_ratio = object_array[2][1]

        var price = 0
        var subtitle = ''
        var subdetails = ''
        var includes_subtitle_text = false
        if((buy_tokens.length == 1 && buy_tokens[0] == 0 && buy_amounts[0] == 0) || token_id == 5){
            //
        }else{
            // includes_subtitle_text = true;
            // var price = this.calculate_price(input_amount, input_reserve_ratio, output_reserve_ratio, object_array[0][3])

            // const max_supply = this.calculate_maximum_supply(item)
            // subtitle = this.format_price(this.calculate_total_cap_amount(buy_amounts[0], price, max_supply))+ ' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[buy_tokens[0]]

            // subdetails = this.format_price(this.calculate_price_from_sell_action(buy_amounts[0], price)) + ' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[buy_tokens[0]]

            // // subtitle = ''
            // // subdetails = ''
            // includes_subtitle_text = false;
        }

        return{
            'tags':{'active_tags':[].concat(active_tags), 'index_option':'indexed', 'when_tapped':'select_deselect_tag', 'selected_tags':this.props.app_state.explore_section_tags},
            'label':{'title':name,'details':symbol, 'size':'l', 'image':image, 'border_radius':'15%', 'includes_subtitle_text':includes_subtitle_text, 'subtitle':'', 'subdetails':''},
            'number_label':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(balance), 'number':`${this.format_account_balance_figure(balance)}`, 'barcolor':'#606060', 'relativepower':'balance',},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },
            'min':{'details':symbol, 'title':name, 'size':'l','image':image, 'border_radius':'15%', 'includes_subtitle_text':includes_subtitle_text, 'subtitle':'', 'subdetails':''}
        }
    }

    calculate_price(input_amount, input_reserve_ratio, output_reserve_ratio, token_type){
        // var selected_item = this.props.selected_end_item
        // var selected_object = this.get_exchange_tokens(3)[selected_item]
        if(token_type == 3){
            var price = (bigInt(input_amount).times(bigInt(output_reserve_ratio))).divide(bigInt(input_reserve_ratio).plus(input_amount))
            if(price == 0){
                price = (input_amount * output_reserve_ratio) / (input_reserve_ratio + input_amount)
            }
            return price
        }else{
            var price = (bigInt(input_amount).times(bigInt(output_reserve_ratio))).divide(bigInt(input_reserve_ratio))
            if(price == 0){
                price = (input_amount * output_reserve_ratio) / (input_reserve_ratio)
            }
            return price
        }
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

    calculate_maximum_supply(object){
        if(object['id'] == 3) return bigInt('1e72');
        var total = object['ipfs'].token_exchange_liquidity_total_supply <= 100_000 ? 1_000_000_000 : object['ipfs'].token_exchange_liquidity_total_supply
        var set_max_supply = bigInt(total)
        var depthminted_amount = 0;

        var final_max_supply = bigInt(depthminted_amount).add(set_max_supply)
        return final_max_supply
    }

    calculate_total_cap_amount(buy_amounts, price, cap){
        var price_per_unit = this.calculate_price_from_sell_action(buy_amounts, price)
        var powered_cap =  (Math.round(price_per_unit * cap)).toString().toLocaleString('fullwide', {useGrouping:false})
        return bigInt(powered_cap)
    }

    render_small_empty_object_loading_card(){
        return(
            <div>
                <div style={{ height: 65, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '7px','margin':'0px 0px 0px 0px', 'padding': '10px 0px 10px 10px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center', /* 'opacity':this.state.loading_screen_opacity */}}>
                    <div style={{ 'margin': '10px 20px 10px 0px' }}>
                        <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
                    </div>
                </div>
            </div>
        )
    }







    render_spends_list_group(){
        var middle = this.props.height
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var all_items = this.get_spend_exchange_tokens()
        var items = this.filter_objects_and_remove_very_new_entries(all_items)

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics(items, 'tokens')}
                        {this.show_new_objects_message_if_any(all_items)}
                        {items.map((item, index) => (
                            <div>
                                {this.render_empty_object()}
                                <div style={{height: 4}}/>
                            </div>
                        ))}
                    </ul>
                </div>
            );
        }
        var padding = this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */ ? '2px 1px 2px 1px' : '5px 3px 5px 3px'
        return ( 
            <div ref={this.spend_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                <AnimatePresence initial={false}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style': 'none'}}>
                        {this.show_load_metrics(items, 'tokens')}
                        {this.show_new_objects_message_if_any(all_items)}
                        {items.map((item, index) => (
                            <motion.li initial={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                            style={{'padding': padding}}>
                                {this.render_spends_object(item['data'], index, item['id'], item['img'], item)}
                            </motion.li>
                        ))}
                    </ul>
                </AnimatePresence>
            </div>
        );
    }

    get_spend_exchange_tokens(){
        return this.remove_duplicates(this.props.get_spend_token_items())
    }

    render_spends_object(object_array, index, token_id, img, object){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.get_exchanges_data(object_array, token_id, img, object)
        if(this.is_object_sender_blocked(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        var is_active = this.props.app_state.e5s[object['e5']].active
        if(!is_active && token_id == 5){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        if(this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */){
            return(
                <div onClick={() => this.when_spends_object_item_clicked(index, object)}>
                    {this.render_detail_item('8', item['min'])}
                </div>
            )
        }
        var opacity = 1.0
        return (
            <div style={{height:'auto', opacity: opacity, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div onClick={() => this.when_spends_object_item_clicked(index, object)}>
                        <div style={{'padding': '0px 10px 0px 10px'}}>
                            {this.render_detail_item('8', item['label'])}
                        </div>
                        <div style={{height: 20}}/>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                </div>         
            </div>
        );
    }

    when_spends_object_item_clicked(index, item){
        this.props.when_spends_object_clicked(index, item['id'], item['e5'], item)
    }











    render_bills_list_group(){
        var middle = this.props.height
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var all_items = this.props.get_bill_items()
        var items = this.filter_objects_and_remove_very_new_entries(all_items)

        if(items.length == 0){
            items = ['0','1'];
            return (
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_bills_message_if_wallet_not_set()}
                        {this.show_new_objects_message_if_any(all_items)}
                        {items.map((item, index) => (
                            <div>
                                {this.render_empty_object()}
                                <div style={{height: 4}}/>
                            </div>
                        ))}
                    </ul>
                </div>
            );
        }else{
            var padding = this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */ ? '2px' : '5px'
            return ( 
                <div ref={this.bill_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <AnimatePresence initial={false}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style': 'none'}}>
                            {this.render_pay_all_bills_button(items)}
                            {this.show_new_objects_message_if_any(all_items)}
                            {items.map((item, index) => (
                                <motion.li initial={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                                style={{'padding': padding}}>
                                    {this.render_bill_object(item, index)}
                                </motion.li>
                            ))}
                        </ul>
                    </AnimatePresence>
                </div>
            );
        }
    }

    show_bills_message_if_wallet_not_set(){
        if(this.props.app_state.has_wallet_been_set == false){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2509h']/* 'You need to set your wallet to see your bills.' */, 'title':this.props.app_state.loc['2509f']/* 'Wallet Unset.' */})}
                    <div style={{height: 10}}/>
                </div>
            )
        }
    }

    render_bill_object(object, index){
        var item = this.format_bill_object(object)
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        if(this.is_object_sender_blocked(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        if(this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */){
            return(
                <div onClick={() => this.when_bill_item_clicked(index, object)}>
                    {this.render_detail_item('3', item['min'])}
                </div>
            )
        }
        return(
            <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_bill_clicked(index, object)}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '15px 0px 0px 0px'}} onClick={() => this.when_bill_clicked(index, object)}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                </div>         
            </div>
        )
    }

    format_bill_object(object){
        var tags = []
        var exchanges = object['ipfs'].price_data
        var obj = this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)
        exchanges.forEach(exchange_transfer => {
            var exchange = exchange_transfer['id']
            var exchange_name = obj[object['e5']+exchange]
            tags.push(exchange_name)
        });
        var details = object['ipfs'] == null ? 'Identifier' : object['ipfs'].identifier
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var myid = this.props.app_state.user_account_id[object['e5']]
        if(myid == null) myid = 1;
        var sender = object['event'].returnValues.p2
        var recipient = object['event'].returnValues.p1
        var title = this.props.app_state.loc['2738ab']/* 'From $' */
        title = title.replace('$', this.get_sender_title_text(sender, object))
        if(myid == sender){
            title = this.props.app_state.loc['2738ac']/* 'To $' */
            title = title.replace('$',this.get_sender_title_text(recipient, object))
        }
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':[], 'when_tapped':''},
            'id':{'title':' • '+title, 'details':details, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },
            'min':{'details':object['e5']+' • '+details, 'title':title, 'size':'l', 'border_radius':'0%'}
        }
    }

    when_bill_clicked(index, object){
        this.props.when_bill_item_clicked(object)
    }

    render_pay_all_bills_button(items){
        var selected_option_name = this.get_selected_item(this.props.wallet_page_tags_object, this.props.wallet_page_tags_object['i'].active)
        if(selected_option_name == this.props.app_state.loc['1264an']/* 'reucrring' */ && items.length != 0){
            return(
                <div style={{'margin':'5px 0px 10px 0px'}} onClick={() => this.when_pay_all_bills_tapped(items)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2895']/* pay all. */, 'action':''})}
                </div>
            )
        }
    }

    when_pay_all_bills_tapped(items){
        this.props.show_dialog_bottomsheet({'objects':items }, 'confirm_pay_bill')
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

    format_account_balance_figure2(amount){
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

    get_number_width(number){
        if(number == null) return '0%'
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
    }

    render_small_empty_object(){
        return(
            <div>
                <div style={{ height: 65, 'background-color': this.props.theme['card_background_color'], 'border-radius': '7px', 'padding': '10px 0px 10px 10px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                    <div style={{ 'margin': '10px 20px 10px 0px' }}>
                        <img alt="" src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
                    </div>
                </div>
            </div>
        )
    }

    render_empty_object(){
        var background_color = this.props.theme['card_background_color']
        if(this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */){
            return(
                <div>
                    {this.render_small_empty_object()}
                </div>
            )
        }
        return(
            <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                <div style={{'margin':'10px 20px 0px 0px'}}>
                    <img alt="" src={this.props.app_state.theme['letter']} style={{height:60 ,width:'auto'}} />
                    <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                </div>
            </div>
        );
    }

    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var uploaded_data = {}
        if(item_id == '8' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12')uploaded_data = this.props.app_state.uploaded_data
        
        var censor_list = this.props.app_state.censored_keyword_phrases.concat(this.props.app_state.censored_keywords_by_my_following)
        return(
            <div>
                <ViewGroups uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} width={this.props.width} theme={this.props.theme} show_images={this.show_images.bind(this)} select_deselect_tag={this.select_deselect_tag.bind(this)} censored_keyword_phrases={censor_list} when_audio_image_clicked={this.when_audio_image_clicked.bind(this)} when_audio_text_clicked={this.when_audio_text_clicked.bind(this)} when_video_image_clicked={this.when_video_image_clicked.bind(this)} when_video_text_clicked={this.when_video_text_clicked.bind(this)}
                
                />
            </div>
        )

    }

    show_images(){

    }

    select_deselect_tag(tag, pos){
        this.props.select_deselect_tag(tag, pos)
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


}




export default PostListSection;