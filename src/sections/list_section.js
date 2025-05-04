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
                <div>{this.render_proposal_list_group()}</div>
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
        }
        else if(selected_page == 'w'){
            var selected_option_name = this.get_selected_item(this.props.wallet_page_tags_object, this.props.wallet_page_tags_object['i'].active)

            if(selected_option_name == this.props.app_state.loc['1217']/* 'ethers ⚗️' */ || selected_option_name == 'e'){
                return(
                <div>{this.render_ethers_list_group()}</div>
                )
            }
            else if(selected_option_name == this.props.app_state.loc['1218']/* 'ends ☝️' */ ){
                return(
                <div>{this.render_ends_list_group()}</div>
                )
            }
            else if(selected_option_name == this.props.app_state.loc['1219']/* 'spends 🫰' */ ){
                return(
                <div>{this.render_spends_list_group()}</div>
                )
            }
            else if(selected_option_name == this.props.app_state.loc['1264i']/* 'wallet-notifications' */ ){
                return(
                <div>{this.render_my_notifications(this.props.app_state.loc['1264i']/* 'wallet-notifications' */)}</div>
                )
            }
            else if(selected_option_name == this.props.app_state.loc['1264j']/* 'coins 🪙' */){
                return(
                    <div>
                        {this.render_coins_list_group()}
                    </div>
                )
            }
            else if(this.props.wallet_page_tags_object['i'].active == this.props.app_state.loc['1264aj']/* 'bills' */ && (selected_option_name == this.props.app_state.loc['1264ak']/* 'received' */ || selected_option_name == this.props.app_state.loc['1264am']/* 'sent' */ || selected_option_name == this.props.app_state.loc['1222']/* 'pinned' */ || this.props.app_state.loc['1264an']/* 'reucrring' */)){
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

        this.coin_list = React.createRef();
        this.ether_list = React.createRef();
        this.end_list = React.createRef();
        this.spend_list = React.createRef();
        this.bill_list = React.createRef();
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
            return(
                <div onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[item['e5']+exchange], 'number':this.get_actual_number(amount, depth), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange]})} /* onClick={() => this.open_object(exchange, item['e5'], 'token')} */>
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

    set_jobs_list(pos){
        this.jobs_list.current?.scrollTo(0, pos);
    }

    set_contract_list(pos){
        this.contract_list.current?.scrollTo(0, pos);
    }

    set_contractor_list(pos){
        this.contractor_list.current?.scrollTo(0, pos);
    }

    set_proposal_list(pos){
        this.proposal_list.current?.scrollTo(0, pos);
    }

    set_subscription_list(pos){
        this.subscription_list.current?.scrollTo(0, pos);
    }

    set_mail_list(pos){
        this.mail_list.current?.scrollTo(0, pos);
    }



    set_e5_list(pos){
        this.e5_list.current?.scrollTo(0, pos);
    }

    set_searched_account_list(pos){
        this.searched_account_list.current?.scrollTo(0, pos)
    }

    set_post_list(pos){
        this.post_list.current?.scrollTo(0, pos);
    }

    set_channel_list(pos){
        this.channel_list.current?.scrollTo(0, pos);
    }

    set_storefront_list(pos){
        this.storefront_list.current?.scrollTo(0, pos);
    }

    set_bag_list(pos){
        this.bag_list.current?.scrollTo(0, pos);
    }

    set_audio_list(pos){
        this.audio_list.current?.scrollTo(0, pos)
    }

    set_video_list(pos){
        this.video_list.current?.scrollTo(0, pos)
    }



    set_coin_list(pos){
        this.coin_list.current?.scrollTo(0, pos)
    }

    set_ether_list(pos){
        this.ether_list.current?.scrollTo(0, pos);
    }

    set_end_list(pos){
        this.end_list.current?.scrollTo(0, pos);
    }

    set_spend_list(pos){
        this.spend_list.current?.scrollTo(0, pos);
    }

    set_bills_list(pos){
        this.bill_list.current?.scrollTo(0, pos);
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
        var obj = {'subscriptions':this.props.app_state.load_subscription_metrics, 'contracts':this.props.app_state.load_contracts_metrics, 'proposals':this.props.app_state.load_proposal_metrics, 'tokens':this.props.app_state.load_tokens_metrics, 'posts':this.props.app_state.load_posts_metrics, 'channels':this.props.app_state.load_channels_metrics, 'jobs':this.props.app_state.load_jobs_metrics, 'sent_mail':this.props.app_state.load_sent_mail_metrics, 'received_mail':this.props.app_state.load_received_mail_metrics, 'storefront':this.props.app_state.load_storefront_metrics, 'bags':this.props.app_state.load_bags_metrics, 'contractor':this.props.app_state.load_contractors_metrics, 'audioport':this.props.app_state.load_audio_metrics, 'videoport':this.props.app_state.load_video_metrics, 'nitro':this.props.app_state.load_nitro_metrics}
        
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









    render_jobs_list_group(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_job_items()

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics([], 'jobs')}
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
        var responses_text = object['responses']+this.props.app_state.loc['2509c']/* ' responses' */
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id']+sender+' • '+responses_text, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },
            'min':{'details':object['e5']+' • '+object['id']+sender+' • '+responses_text, 'title':title, 'size':'l', 'border_radius':'0%'}
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
        var items = this.get_contract_items()

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics([], 'contracts')}
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
        var title = object['ipfs'] == null ? 'Contract ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var time = object['event'] == null ? 0 : object['event'].returnValues.p4
        var id_text = ' • '+object['id']
        if(object['id'] == 2) id_text = ' • '+'Main Contract'
        var sender = object['event'] == null ? '' : this.get_senders_name(object['event'].returnValues.p3, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':id_text+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{ 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':this.get_time_difference(time), },
            'min':{'details':object['e5']+' • '+object['id']+sender, 'title':title, 'size':'l', 'border_radius':'0%'}
        }
    }

    when_contract_item_clicked(index, object){
        // if(object['hidden'] == true){
        //     this.props.notify(this.props.app_state.loc['2509d']/* 'That object is not available for you to access.' */, 9000)
        //     return;
        // }
        this.props.when_contract_item_clicked(index, object['id'], object['e5'], null, object)
    }






    render_proposal_list_group(){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']

        var middle = this.props.height
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_my_proposals()

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics([], 'proposals')}
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
        var items = this.get_nitro_items()

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics([], 'nitro')}
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
        var items = this.get_subscription_items()

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics([], 'subscriptions')}
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
        this.props.show_pay_upcoming_subscriptions_bottomsheet(items)
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
        var items = this.get_mail_items()

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
                        {this.show_load_metrics([], object_type)}
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
        var items = this.get_contractor_items()

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics([], 'contractor')}
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
                        <TextInput font={this.props.app_state.font} height={25} placeholder={this.props.app_state.loc['3068']/* Object or Account ID, Alias, "tag" or title..' */} when_text_input_field_changed={this.when_text_input_field_changed.bind(this)} text={this.state.typed_search_id} theme={this.props.theme}/>
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

    perform_search(){
        var typed_search = this.state.typed_search_id.trim()
        var typed_account = this.get_typed_alias_id(typed_search)

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

    get_typed_alias_id(alias){
        if(!isNaN(alias)){
            return alias
        }
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
            <div onClick={() => this.props.when_searched_account_clicked(item, this.state.searched_account)}>
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

        var required_subscriptions = object['ipfs'].selected_subscriptions
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1

        var selector_item = type == 31/* token */ || type == 19/* audioport */ || type == 20/* videoport */ || type == 21/* nitro */ ? '8' : '3'
        
        if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || this.is_post_preview_enabled(object) || post_author == me){
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
            var required_subscriptions = object['ipfs'].selected_subscriptions
            var post_author = object['event'].returnValues.p5
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            
            if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || post_author == me){
                this.props.when_link_object_clicked(object, object_type, this.is_post_nsfw(object))
            }else{
                this.props.show_post_item_preview_with_subscription(object, 'post')
            }
        }
        else if(object_type == 36/* channel */){
            var required_subscriptions = object['ipfs'].selected_subscriptions
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
            
            if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || post_author == me){
                this.props.when_link_object_clicked(object, object_type)
            }else{
                this.props.show_post_item_preview_with_subscription(object, 'channel')
            }
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
            var required_subscriptions = object['ipfs'].selected_subscriptions
            var post_author = object['event'].returnValues.p5
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            
            if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || post_author == me){
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
            
            if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || post_author == me){
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
        var type = object_array[0][3/* <3>token_type */] == 3 ? 'END': 'SPEND'
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
        var items = this.get_post_items()

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics([], 'posts')}
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
        var required_subscriptions = item['ipfs'].selected_subscriptions
        var post_author = item['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[item['e5']]
        if(me == null) me = 1
        if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || this.is_post_preview_enabled(item) || post_author == me){
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

    check_if_sender_has_paid_subscriptions(required_subscriptions){
        var has_sender_paid_all_subs = true
        if(required_subscriptions == null) return true
        required_subscriptions.forEach(subscription_id => {
            // var subscription_item = this.get_all_sorted_objects_mappings(this.props.app_state.created_subscription_object_mapping)[subscription_id]
            // if(subscription_item == null) return false
            // if(subscription_item['payment'] == 0){
            //     has_sender_paid_all_subs = false
            // }
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
        var required_subscriptions = object['ipfs'].selected_subscriptions
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        if(!this.check_if_sender_has_paid_subscriptions(required_subscriptions) && post_author != me){
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
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id']+sender, 'details':extra+title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },
            'min':{'details':object['e5']+' • '+object['id']+sender, 'title':extra+title, 'size':'l', 'border_radius':'0%'}
        }
    }

    is_post_nsfw(object){
        if(object['ipfs'].get_post_nsfw_option == null) return false
        var selected_nsfw_option = this.get_selected_item2(object['ipfs'].get_post_nsfw_option, 'e')
        if(selected_nsfw_option == 1) return true
    }

    when_post_item_clicked(index, object){
        var required_subscriptions = object['ipfs'].selected_subscriptions
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        
        if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || post_author == me){
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
        var items = this.get_channel_items()

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics([], 'channels')}
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
        var required_subscriptions = object['ipfs'].selected_subscriptions == null ? [] : object['ipfs'].selected_subscriptions
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
        if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || this.is_post_preview_enabled(object) || post_author == me){
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
        var required_subscriptions = object['ipfs'].selected_subscriptions
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        if(!this.check_if_sender_has_paid_subscriptions(required_subscriptions) && post_author != me){
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
        var required_subscriptions = object['ipfs'].selected_subscriptions == null ? [] : object['ipfs'].selected_subscriptions
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

        if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || post_author == me){
            this.props.when_channel_item_clicked(index, object['id'], object['e5'], object)
        }else{
            this.props.show_post_item_preview_with_subscription(object, 'channel')
        }
        
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






    render_storefront_item_list_group(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_storefront_items()

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics([], 'storefront')}
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
        if(this.is_object_sender_blocked(object) || !this.is_item_listed(object) || this.is_object_blocked_for_sender(object)){
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
        var items = this.get_bag_items()

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics([], 'bags')}
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
        var title = object['ipfs'] == null ? '' : object['ipfs']['bag_orders'].length + this.props.app_state.loc['2509b']/* ' items' */+' • '+ object['responses']+this.props.app_state.loc['2509c']/* ' responses' */+sender
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
        var items = this.get_audio_items()

        if(selected_item == this.props.app_state.loc['1264l']/* 'acquired' */){
            return(
                <div style={{ 'padding': '7px 0px 0px 0px'}}>
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

    render_my_bought_albums(items){
        var background_color = this.props.theme['card_background_color']
        var col = Math.round(400 / 200)
        var w = (this.state.screen_width / 2) - 5
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
                        {items.map((item, index) => (
                            <ImageListItem key={index}>
                                <div>
                                    {this.render_bought_audio_item_plus_buttons(item, index, w)}
                                </div>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            )
        }
    }

    render_bought_audio_item_plus_buttons(object, index, w){
        return(
            <div style={{'position': 'relative'}}>
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
        var required_subscriptions = item['ipfs'].selected_subscriptions
        var post_author = item['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[item['e5']]
        if(me == null) me = 1
        if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || this.is_post_preview_enabled(item) || post_author == me){
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

    format_audio_item(object){
        var tags = object['ipfs'] == null ? ['Audiopost'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(object['ipfs'].audio_type != null){
            tags = [object['ipfs'].audio_type].concat(tags)
        }
        var extra = ''
        var required_subscriptions = object['ipfs'].selected_subscriptions
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        if(!this.check_if_sender_has_paid_subscriptions(required_subscriptions) && post_author != me){
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
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':/* object['e5']+' • '+object['id']+' • '+ *//* listing_type+' • '+ */author, 'details':extra+title, 'size':'l', 'image':image, 'border_radius':'7px', 'image_click': 'when_audio_image_clicked', 'text_click':'when_audio_text_clicked', 'object':object},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },
            'min':{'details': author+' • '+this.get_time_difference(time), 'title':extra+title, 'size':'l','image':image, 'border_radius':'7px', 'image_click': 'when_audio_image_clicked', 'text_click':'when_audio_text_clicked', 'object':object}
        }
    }

    when_audio_item_clicked(index, object){
        var required_subscriptions = object['ipfs'].selected_subscriptions
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        
        if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || post_author == me){
            this.props.when_audio_item_clicked(index, object['id'], object['e5'], object)
        }else{
            this.props.show_post_item_preview_with_subscription(object, 'audio')
        }
    }

    when_audio_image_clicked(object){
        var required_subscriptions = object['ipfs'].selected_subscriptions
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        var index = 0
        if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || post_author == me){
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
        var items = this.get_video_items()

        if(selected_item == this.props.app_state.loc['1264l']/* 'acquired' */){
            return(
                <div style={{ 'padding': '7px 0px 0px 0px'}}>
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

    render_my_bought_videos(items){
        var background_color = this.props.theme['card_background_color']
        var col = Math.round(400 / 200)
        var w = (this.state.screen_width / 2) - 5
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
                        {items.map((item, index) => (
                            <ImageListItem key={index}>
                                <div onClick={() => this.when_video_item_clicked(index, item)}>
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

    get_video_items(){
        return this.remove_duplicates(this.props.get_video_items())
    }

    render_video_object_if_locked(item, index){
        var required_subscriptions = item['ipfs'].selected_subscriptions
        var post_author = item['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[item['e5']]
        if(me == null) me = 1
        if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || this.is_post_preview_enabled(item) || post_author == me){
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

    format_video_item(object){
        var tags = object['ipfs'] == null ? ['Videopost'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(object['ipfs'].video_type != null){
            tags = [object['ipfs'].video_type].concat(tags)
        }
        var extra = ''
        var required_subscriptions = object['ipfs'].selected_subscriptions
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        if(!this.check_if_sender_has_paid_subscriptions(required_subscriptions) && post_author != me){
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
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':author, 'details':extra+title, 'size':'l', 'image':image, 'border_radius':'7px', 'image_click': 'when_video_image_clicked', 'text_click':'when_video_text_clicked', 'object':object},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },
            'min':{'details': author+' • '+this.get_time_difference(time), 'title':extra+title, 'size':'l','image':image, 'border_radius':'7px', 'image_click': 'when_video_image_clicked', 'text_click':'when_video_text_clicked', 'object':object}
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
        var required_subscriptions = object['ipfs'].selected_subscriptions
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        
        if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || post_author == me){
            this.props.when_video_item_clicked(index, object['id'], object['e5'], this.is_post_nsfw(object), object)
        }else{
            this.props.show_post_item_preview_with_subscription(object, 'video')
        }
    }

    when_video_image_clicked(object){
        var required_subscriptions = object['ipfs'].selected_subscriptions
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        var index = 0
        if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || post_author == me){
            this.props.when_video_item_clicked(index, object['id'], object['e5'], this.is_post_nsfw(object), object)
            this.props.play_videopost_from_list_section(object)
        }else{
            this.props.show_post_item_preview_with_subscription(object, 'video')
        }
    }

    when_video_text_clicked(object){
        var required_subscriptions = object['ipfs'].selected_subscriptions
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        var index = 0
        if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || post_author == me){
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
                        <TextInput font={this.props.app_state.font} height={25} placeholder={this.props.app_state.loc['2509a']/* 'Enter Name or Symbol...' */} when_text_input_field_changed={this.when_coin_search_coin_input_field_changed.bind(this)} text={this.state.typed_search_coin_id} theme={this.props.theme} />
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
                    <TextInput font={this.props.app_state.font} height={25} placeholder={this.props.app_state.loc['2509a']/* 'Enter Name or Symbol...' */} when_text_input_field_changed={this.when_coin_search_coin_input_field_changed.bind(this)} text={this.state.typed_search_coin_id} theme={this.props.theme} />
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
                        <TextInput font={this.props.app_state.font} height={25} placeholder={this.props.app_state.loc['2509a']/* 'Enter Name or Symbol...' */} when_text_input_field_changed={this.when_search_ether_input_field_changed.bind(this)} text={this.state.typed_search_ether_id} theme={this.props.theme}/>
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
                    <TextInput font={this.props.app_state.font} height={25} placeholder={this.props.app_state.loc['2509a']/* 'Enter Name or Symbol...' */} when_text_input_field_changed={this.when_search_ether_input_field_changed.bind(this)} text={this.state.typed_search_ether_id} theme={this.props.theme} />
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
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return ( 
            <div onClick={() => this.when_ether_object_clicked(index, item)}>
                {this.render_detail_item('8', item['label'])}
            </div>
        );
    }

    get_ethers_data(){
        var state_list = this.props.app_state.ether_data
        var list = []
        state_list.forEach(ether_desc => {
            if(ether_desc['disabled'] == false) list.push(this.get_token_data(ether_desc['symbol'], ether_desc['name'], ether_desc['e5']));
        });

        var sorted_list =  this.sortByAttributeDescending(list, 'name')
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

    get_token_data(symbol, name,  e5){
        return {
            'id':symbol,
            'e5':e5,
            'name': name,
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

    get_number_width(number){
        if(number == null) return '0%'
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
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
        var items = this.get_exchange_tokens(3)
        var items2 = items.concat(this.get_exchange_tokens(5))

        if(items.length == 0){
            items = ['0','1'];
            return (
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics([], 'tokens')}
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
                        {this.show_load_metrics(items2, 'tokens')}
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
        var type = object_array[0][3/* <3>token_type */] == 3 ? 'END': 'SPEND'
        var supply = object_array[2][2/* <2>token_exchange_liquidity/total_supply */]
        var active_tags = item['ipfs'] == null ? [''+type, 'token'] : item['ipfs'].entered_indexing_tags
        var name = item['ipfs'] == null ? 'Token ID: '+token_id : item['ipfs'].entered_title_text
        if(token_id == 3){
            // var obj = {'E15':'E15', 'E25':'E25', 'E35':'E35'}
            name = item['e5']
        } else if(token_id == 5){
            // var obj = {'E15':'315', 'E25':'325', 'E35':'335'}
            // name = obj[item['e5']]
            name = item['e5'].replace('E','3')
        }
        var symbol = item['ipfs'] == null ? ''+type : item['ipfs'].entered_symbol_text
        // var image = item['ipfs'] == null ? img : item['ipfs'].token_image
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
            'label':{'title':name,'details':symbol, 'size':'l', 'image':image, 'border_radius':'15%'},
            'number_label':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(balance), 'number':`${this.format_account_balance_figure(balance)}`, 'barcolor':'#606060', 'relativepower':'balance',},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },
            'min':{'details':symbol, 'title':name, 'size':'l','image':image, 'border_radius':'15%'}
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
        var items = this.get_exchange_tokens(5)
        var items2 = items.concat(this.get_exchange_tokens(3))

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics(items2, 'tokens')}
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
                        {this.show_load_metrics(items2, 'tokens')}
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
        var items = this.props.get_bill_items()

        if(items.length == 0){
            items = ['0','1'];
            return (
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
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
                    <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_bill_item_clicked(index, object)}>
                        {this.render_detail_item('3', item['author_title'])}
                    </div>
                    <div style={{'padding': '15px 0px 0px 0px'}} onClick={() => this.when_bill_item_clicked(index, object)}>
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

    when_bill_item_clicked(index, object){
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