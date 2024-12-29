import React, { Component } from 'react';
import ViewGroups from './../components/view_groups';
import TextInput from './../components/text_input';

import EndImg from './../assets/end_token_icon.png';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


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
                                        <img src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
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
            return 'You'
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
                            <li style={{'padding': '2px 0px 2px 0px'}}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={this.props.app_state.static_assets['letter']} style={{height:60 ,width:'auto'}} />
                                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }else{
            return (
                <div>
                    <div ref={this.jobs_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style': 'none'}}>
                            {this.show_load_metrics(items, 'jobs')}
                            {items.map((item, index) => (
                                <li style={{'padding': '5px'}}>
                                    {this.render_job_object(item, index)}
                                </li>
                            ))}
                            {this.render_loading_screen_card()}
                        </ul>
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
                        <img src={this.props.app_state.static_assets['letter']} style={{height:60 ,width:'auto'}} />
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
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id']+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
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

        var object_tags = object['ipfs'].entered_indexing_tags
        var all_censored_phrases = this.props.app_state.censored_keyword_phrases.concat(this.props.app_state.censored_keywords_by_my_following)
        var includes = all_censored_phrases.some(r=> object_tags.includes(r.toLowerCase()))
        if(includes){
           is_object_blocked_for_sender = true 
        }

        var author = object['author']
        if(all_censored_phrases.includes(author.toString())){
            is_object_blocked_for_sender = true 
        }

        var entered_title_text = object['ipfs'].entered_title_text
        var includes2 = all_censored_phrases.some(r=> entered_title_text.toLowerCase().includes(r.toLowerCase()))
        if(includes2){
           is_object_blocked_for_sender = true 
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
                            <li style={{'padding': '2px 0px 2px 0px'}}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={this.props.app_state.static_assets['letter']} style={{height:60 ,width:'auto'}} />
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
                <div ref={this.contract_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}} >
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics(items, 'contracts')}
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                {this.render_contract_item(item, index)}
                            </li>
                        ))}
                    {this.render_loading_screen_card()}
                    </ul>
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
        return(
            <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
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
            'age':{ 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':this.get_time_difference(time), }
        }
    }

    when_contract_item_clicked(index, object){
        this.props.when_contract_item_clicked(index, object['id'], object['e5'], object)
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
                            <li style={{'padding': '2px 0px 2px 0px'}}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={this.props.app_state.static_assets['letter']} style={{height:60 ,width:'auto'}} />
                                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }else{
            return (
                <div ref={this.proposal_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics(items, 'proposals')}
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                {this.render_proposal_object(item, index)}
                            </li>
                        ))}
                    {this.render_loading_screen_card()}
                    </ul>
                </div>
            );
        }
    }

    render_proposal_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_proposal_item(object)
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
            'age':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
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
                            <li style={{'padding': '2px 0px 2px 0px'}}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img alt="" src={this.props.app_state.static_assets['letter']} style={{height:60 ,width:'auto'}} />
                                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        else{
            var background_color = this.props.theme['card_background_color']
            var card_shadow_color = this.props.theme['card_shadow_color']
            return ( 
                <div ref={this.nitro_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics([], 'nitro')}
                        {items.map((item, index) => (
                            <li style={{'padding': '5px 3px 5px 3px'}}>
                                {this.render_nitro_object_if_locked(item, index)}
                            </li>
                        ))}
                        {this.render_loading_screen_card()}
                    </ul>
                    
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
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
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
                            <li style={{'padding': '2px 0px 2px 0px'}}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={this.props.app_state.static_assets['letter']} style={{height:60 ,width:'auto'}} />
                                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }else{
            return ( 
                <div ref={this.subscription_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics(items, 'subscriptions')}
                        {this.render_pay_all_upcoming_subscriptions_button(items)}
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                {this.render_subscription_object(item, index)}
                            </li>
                        ))}
                    {this.render_loading_screen_card()}
                    </ul>
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
        return(
            <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
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
        this.props.when_subscription_item_clicked(index, object['id'], object['e5'])
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
            'age':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
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
                            <li style={{'padding': '2px 0px 2px 0px'}}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={this.props.app_state.static_assets['letter']} style={{height:60 ,width:'auto'}} />
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
                <div ref={this.mail_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics(items, object_type)}
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                {this.render_mail_object_or_null(item, index)}
                            </li>
                        ))}
                    </ul>
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
        var tags_to_use = [object['type']];
        var tags = object['ipfs'] == null ? ['Mail'] : [object['e5']].concat(object['ipfs'].entered_indexing_tags)
        var final_tags = tags_to_use.concat(tags)
        var details = object['ipfs'] == null ? 'Mail ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var myid = this.props.app_state.user_account_id[object['e5']]
        if(myid == null) myid = 1;
        var sender = object['event'].returnValues.p2
        var recipient = object['event'].returnValues.p1
        var title = 'From '+ this.get_sender_title_text(sender, object)
        if(myid == sender){
            title = 'To '+ this.get_sender_title_text(recipient, object)
        }
        return {
            'tags':{'active_tags':final_tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'textsize':'14px', 'text':details, 'font':this.props.app_state.font},
            'author_title':{'title':title, 'details':details, 'size':'l'},
            'age':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':this.props.app_state.loc['1317']/* block */+` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    get_sender_title_text(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return 'You'
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
                            <li style={{'padding': '5px'}}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={this.props.app_state.static_assets['letter']} style={{height:60 ,width:'auto'}} />
                                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        else{
            var background_color = this.props.theme['card_background_color']
            var card_shadow_color = this.props.theme['card_shadow_color']
            return ( 
                <div ref={this.contractor_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics(items, 'contractor')}
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                {this.render_contractor_object(item, index)}
                            </li>
                        ))}
                    {this.render_loading_screen_card()}
                    </ul>
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
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
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
                        <TextInput font={this.props.app_state.font} height={25} placeholder={'Enter ID or Alias...'} when_text_input_field_changed={this.when_text_input_field_changed.bind(this)} text={this.state.typed_search_id} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}} onClick={()=> this.perform_search()}>
                        <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                            <img alt="" className="text-end" src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                        </div>
                    </div>
                </div>
                <div style={{height: 10}}/>
                {this.render_search_results()}
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
        else if(isNaN(typed_account)){
            this.props.notify(this.props.app_state.loc['2508']/* 'That ID is not valid.' */, 3800)
        }
        else if(parseInt(typed_account) < 1001){
            this.props.notify(this.props.app_state.loc['2508']/* 'That ID is not valid.' */, 3800)
        }else{
            this.props.notify(this.props.app_state.loc['2509']/* 'Searching...' */, 1000)
            this.setState({searched_account: typed_account})
            this.props.get_searched_account_data(typed_account, typed_search)
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

    render_search_results(){
        var middle = this.props.height-153;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_search_results()
        if(items.length == 0){
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
                            <li style={{'padding': '2px 0px 2px 0px'}}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={this.props.app_state.static_assets['letter']} style={{height:60 ,width:'auto'}} />
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
                <div ref={this.post_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics(items, 'posts')}
                        {items.map((item, index) => (
                            <li style={{'padding': '5px 3px 5px 3px'}}>
                                {this.render_post_object_if_locked(item, index)}
                            </li>
                        ))}
                        {this.render_loading_screen_card()}
                    </ul>
                    
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
        if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || this.is_post_preview_enabled(item) || post_author==me){
            return this.render_post_object(item, index)
        }
        else{
            return(
                <div>
                    <div style={{height:160, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                        <div style={{'margin':'10px 20px 0px 0px'}}>
                            <img src={this.props.app_state.static_assets['letter']} style={{height:60 ,width:'auto'}} />
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
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
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
                            <li style={{'padding': '2px 0px 2px 0px'}}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={this.props.app_state.static_assets['letter']} style={{height:60 ,width:'auto'}} />
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
                <div ref={this.channel_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics(items, 'channels')}
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                {this.render_channel_object(item, index)}
                            </li>
                        ))}
                    {this.render_loading_screen_card()}
                    </ul>
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
            return(
                <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
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
        var required_subscriptions = object['ipfs'].selected_subscriptions
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        if(!this.check_if_sender_has_paid_subscriptions(required_subscriptions) && post_author != me){
            extra = extra+'🔏 '
        }
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id']+sender, 'details':extra+title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    when_channel_item_clicked(index, object){
        var required_subscriptions = object['ipfs'].selected_subscriptions == null ? [] : object['ipfs'].selected_subscriptions
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1

        if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || post_author == me){
            this.props.when_channel_item_clicked(index, object['id'], object['e5'], object)
        }else{
            this.props.show_post_item_preview_with_subscription(object, 'channel')
        }
        
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
                            <li style={{'padding': '2px 0px 2px 0px'}}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={this.props.app_state.static_assets['letter']} style={{height:60 ,width:'auto'}} />
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
                <div ref={this.storefront_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics(items, 'storefront')}
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                {this.render_storefront_object(item, index)}
                            </li>
                        ))}
                    {this.render_loading_screen_card()}
                    </ul>
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
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
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
                            <li style={{'padding': '2px 0px 2px 0px'}}>
                                {this.render_empty_object()}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }else{
            return ( 
                <div ref={this.bag_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics(items, 'bags')}
                        {items.map((item, index) => (
                            <li style={{'margin': '10px 2px 10px 2px'}}>
                                {this.render_bag_object(item, index)}
                            </li>
                        ))}
                    {/* {this.render_small_empty_object_loading_card()} */}
                    </ul>
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
        // return(
        //     <div onClick={() => this.when_bag_item_clicked(index, object)}>
        //         {this.render_bag_data(object, item, index)}
        //     </div>
        // )
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

    // render_bag_data(object, item, index){
    //     var images = this.get_bag_images(object)

    //     return(
    //         <div>
    //             <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_bag_item_clicked(index, object)}>
    //                 {this.render_detail_item('3', item['id'])}
    //             </div>
    //         </div>
    //     )
    //     if(images.length == 0){
    //         return(
    //             <div>
    //                 <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_bag_item_clicked(index, object)}>
    //                     {this.render_detail_item('3', item['id'])}
    //                 </div>
    //             </div>
    //         )
    //     }
    //     else if(images.length == 1){
    //         return(
    //             <div>
    //                 <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_bag_item_clicked(index, object)}>
    //                     {this.render_detail_item('8', item['id_with_image'])}
    //                 </div>
    //             </div>
    //         )
    //     }else{
    //         return(
    //             <div>
    //                 <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_bag_item_clicked(index, object)}>
    //                     {this.render_detail_item('3', item['id'])}
    //                 </div>
    //                 <div style={{padding:'0px 0px 0px 0px'}}>
    //                     {this.render_images(object)}
    //                 </div>
    //             </div>
    //         )
    //     }
    // }

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
                                        <img alt="" src={this.props.app_state.static_assets['letter']} style={{height:15 ,width:'auto'}} />
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
        if(object['ipfs'].selected_device_city != null && object['ipfs'].selected_device_city != ''){
            tags = [object['ipfs'].selected_device_city].concat(tags)
        }
        var sender = this.get_senders_name(object['event'].returnValues.p3, object);
        var title = object['ipfs'] == null ? '' : object['ipfs']['bag_orders'].length+this.props.app_state.loc['2509b']/* ' items ordered' */+' • '+ object['responses']+this.props.app_state.loc['2509c']/* ' responses' */+sender
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var time = object['event'] == null ? 0 : object['event'].returnValues.p4
        var item_images = this.get_bag_images(object)
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':' • '+object['id'], 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img},
            // 'id_with_image':{'title':object['id'], 'details':title, 'size':'l', 'image':image},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)} ago`, },
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
                            <li style={{'padding': '2px 0px 2px 0px'}}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={this.props.app_state.static_assets['letter']} style={{height:60 ,width:'auto'}} />
                                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        else{
            var background_color = this.props.theme['card_background_color']
            var card_shadow_color = this.props.theme['card_shadow_color']
            return ( 
                <div ref={this.audio_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics(items, 'audioport')}
                        {items.map((item, index) => (
                            <li style={{'padding': '5px 3px 5px 3px'}}>
                                {this.render_audio_object_if_locked(item, index)}
                            </li>
                        ))}
                        {this.render_loading_screen_card()}
                    </ul>
                    
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
                                        <img alt="" src={this.props.app_state.static_assets['letter']} style={{height:50 ,width:'auto'}} />
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
                                <div onClick={() => this.when_audio_item_clicked(index, item)}>
                                    {this.render_my_bought_audio_item(item, index, w)}
                                </div> 
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            )
        }
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
                                        <img alt="" src={this.props.app_state.static_assets['letter']} style={{height:20 ,width:'auto'}} />
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
                    <div style={{height:160, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                        <div style={{'margin':'10px 20px 0px 0px'}}>
                            <img alt="" src={this.props.app_state.static_assets['letter']} style={{height:60 ,width:'auto'}} />
                            <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray', 'font-size': '13px'}}></p>
                        </div>
                    </div>
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
        // var default_image = this.props.app_state.static_assets['music_label']
        // var image = object['ipfs'] == null ? default_image :object['ipfs'].album_art
        // return(
        //     <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
        //         <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 5px', 'padding':'0px 0px 5px 0px'}}>
        //             <div onClick={() => this.when_audio_item_clicked(index, object)}>
        //                 <img src={image} alt="" style={{height:105 ,width:105,'border-radius': '10px'}}/>
        //             </div>
        //             <div style={{width:15}}/>
        //             <div style={{width:'50%'}}>
        //                 {this.render_detail_item('1', item['tags'])}
        //                 <div style={{height: 10}}/>
        //                 <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_audio_item_clicked(index, object)}>
        //                     {this.render_detail_item('3', item['id'])}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // )
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
            'id':{'title':/* object['e5']+' • '+object['id']+' • '+ *//* listing_type+' • '+ */author, 'details':extra+title, 'size':'l', 'image':image, 'border_radius':'7px'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
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
                            <li style={{'padding': '2px 0px 2px 0px'}}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img alt="" src={this.props.app_state.static_assets['letter']} style={{height:60 ,width:'auto'}} />
                                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        else{
            var background_color = this.props.theme['card_background_color']
            var card_shadow_color = this.props.theme['card_shadow_color']
            return ( 
                <div ref={this.video_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.show_load_metrics(items, 'videoport')}
                        {items.map((item, index) => (
                            <li style={{'padding': '5px 3px 5px 3px'}}>
                                {this.render_video_object_if_locked(item, index)}
                            </li>
                        ))}
                        {this.render_loading_screen_card()}
                    </ul>
                    
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
                                        <img alt="" src={this.props.app_state.static_assets['letter']} style={{height:50 ,width:'auto'}} />
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
                            <img alt="" src={this.props.app_state.static_assets['letter']} style={{height:60 ,width:'auto'}} />
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
        // var default_image = this.props.app_state.static_assets['music_label']
        // var image = object['ipfs'] == null ? default_image :object['ipfs'].album_art
        // return(
        //     <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
        //         <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 5px', 'padding':'0px 0px 5px 0px'}}>
        //             <div onClick={() => this.when_audio_item_clicked(index, object)}>
        //                 <img src={image} alt="" style={{height:105 ,width:105,'border-radius': '10px'}}/>
        //             </div>
        //             <div style={{width:15}}/>
        //             <div style={{width:'50%'}}>
        //                 {this.render_detail_item('1', item['tags'])}
        //                 <div style={{height: 10}}/>
        //                 <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_audio_item_clicked(index, object)}>
        //                     {this.render_detail_item('3', item['id'])}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // )
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
            'id':{'title':author, 'details':extra+title, 'size':'l', 'image':image, 'border_radius':'7px'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
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
            // <div onClick={() => this.when_ether_object_clicked(index, item)} style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
            //     <div style={{'padding': '0px 0px 0px 5px'}}>
            //         {this.render_detail_item('1', item['tags'])}
            //         <div style={{height: 10}}/>
            //         <div style={{'padding': '0px 10px 0px 10px'}}>
            //             {this.render_detail_item('8', item['label'])}
            //         </div>
            //         <div style={{height: 20}}/>
            //         {this.render_detail_item('2', item['number_label'])}
            //     </div>         
            // </div>
            <div onClick={() => this.when_ether_object_clicked(index, item)}>
                {this.render_detail_item('8', item['label'])}
            </div>
        );
    }

    get_ethers_data(){
        var list = [
            // this.get_token_data('ETHT', 'Ethereum Testnet', 'E15'),
            this.get_token_data('ETC', 'Ethereum Classic', 'E35'),
            this.get_token_data('ONE', 'Harmony', 'E45'),
            this.get_token_data('CELO', 'Celo', 'E55'),
            this.get_token_data('FLR', 'Flare', 'E65'),
            this.get_token_data('XDAI', 'Gnosis', 'E75'),
            this.get_token_data('FUSE', 'Fuse', 'E85'),
            this.get_token_data('GLMR', 'Moonbeam', 'E95'),
            this.get_token_data('MOVR', 'Moonriver', 'E105'),
            this.get_token_data('XDC', 'Xinfin Network', 'E115'),
            this.get_token_data('MATIC', 'Polygon', 'E125'),
            this.get_token_data('BNB', 'Binance Smart Chain', 'E135'),
            this.get_token_data('TT', 'ThunderCore', 'E155'),
            // this.get_token_data('NRG', 'Energi', 'E145'),
            this.get_token_data('VIC', 'Viction', 'E165'),
            this.get_token_data('EVMOS', 'Evmos EVM', 'E175'),

            this.get_token_data('ETH', 'Ethereum', 'E185'),
            this.get_token_data('OETH', 'Optimism', 'E195'),
            this.get_token_data('BETH', 'Base', 'E205'),
            this.get_token_data('AETH', 'Arbitrum One', 'E215'),
            this.get_token_data('ASTR', 'Astar EVM', 'E225'),
            this.get_token_data('CRO', 'Cronos EVM', 'E235'),
            this.get_token_data('KAVA', 'Kava EVM', 'E245'),
            this.get_token_data('NEON', 'Neon EVM', 'E255'),
            this.get_token_data('mADA', 'Milkomeda', 'E265'),
            this.get_token_data('FTM', 'Fantom Opera', 'E275'),
            this.get_token_data('BRISE', 'Bitgert', 'E285'),
            this.get_token_data('SYS', 'Syscoin EVM', 'E295'),
            this.get_token_data('AVAX', 'Avalanche C-Chain', 'E305'),
            this.get_token_data('FRA', 'Findora', 'E315'),
            this.get_token_data('FDX', '5Dax', 'E325'),
            this.get_token_data('ROSE', 'Oasis Emerald', 'E335'),
            this.get_token_data('OZO', 'Ozone Chain', 'E345'),
            this.get_token_data('PIX', 'Pixie', 'E355'),
            this.get_token_data('REI', 'Rei Network', 'E365'),
            this.get_token_data('KLAY', 'Klaytn Mainnet Cypress', 'E375'),
            this.get_token_data('MNT', 'Mantle', 'E385'),
            this.get_token_data('PLS', 'Pulse Chain', 'E395'),
            this.get_token_data('CANTO', 'Canto', 'E405'),
            this.get_token_data('EOS', 'EOS EVM', 'E415'),
            this.get_token_data('IOTX', 'IoTeX', 'E425'),
            this.get_token_data('SGB', 'Songbird Canary Network', 'E435'),
            this.get_token_data('ULX', 'Ultron Mainnet', 'E445'),
            this.get_token_data('CET', 'CoinEx Smart Chain', 'E455'),
            this.get_token_data('TFUEL', 'Theta Mainnet', 'E465'),
            this.get_token_data('FITFI', 'Step Network', 'E475'),
            this.get_token_data('EWT', 'Energy Web Chain', 'E485'),
            // this.get_token_data('CLO', 'Callisto', 'E495'),
            this.get_token_data('SDN', 'Shiden', 'E505'),
            this.get_token_data('TENET', 'Tenet', 'E515'),
            this.get_token_data('UBQ', 'Ubiq', 'E525'),
            this.get_token_data('GO', 'GoChain', 'E535'),
            this.get_token_data('OMAX', 'Omax Mainnet', 'E545'),
            this.get_token_data('WEMIX', 'Wemix3.0 Mainnet', 'E555'),
            this.get_token_data('CFX', 'Conflux eSpace', 'E565'),
            this.get_token_data('TLOS', 'Telos EVM', 'E575'),
            this.get_token_data('RSK', 'RSK Mainnet', 'E585'),
            this.get_token_data('META', 'Metadium', 'E595'),
            this.get_token_data('KAI', 'Kardiachain', 'E605'),
            this.get_token_data('CMP', 'Caduceus', 'E615'),
            this.get_token_data('SEELE', 'Seele', 'E625'),
            this.get_token_data('BTT', 'BitTorrent Chain', 'E635'),
            this.get_token_data('AAC', 'Double-A Chain', 'E645'),
            this.get_token_data('KAR', 'Karura EVM', 'E655'),
            this.get_token_data('ACA', 'Acala EVM', 'E665'),
            // this.get_token_data('EDG', 'Edgeware EVM', 'E675'),
            this.get_token_data('BERG', 'Bloxberg', 'E685'),
            this.get_token_data('PHOENIX', 'Phoenix', 'E695'),
            this.get_token_data('OMC', 'Omchain', 'E705'),
            this.get_token_data('OM', 'Om', 'E715'),
            this.get_token_data('MINTME', 'MintMe.com Coin', 'E725'),
            this.get_token_data('ECS', 'eCredits', 'E735'),
            this.get_token_data('ELV', 'Eluv.io', 'E745'),
            this.get_token_data('ETHO', 'Etho Protocol', 'E755'),
            this.get_token_data('OLT', 'One Ledger', 'E765'),
        ]

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
                            <li style={{'padding': '2px', 'margin':'0px 0px 0px 0px'}}>
                                {this.render_empty_object()}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        return ( 
            <div ref={this.end_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {this.show_load_metrics(items2, 'tokens')}
                    {items.map((item, index) => (
                        <div style={{'padding': '5px 3px 5px 3px'}}>
                            {this.render_ends_object(item['data'], index, item['id'], item['img'], item)}
                        </div>
                    ))}
                    <div style={{'padding': '5px 3px 5px 3px'}}>
                        {this.render_empty_object()}
                    </div>
                </ul>
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
        if(!is_active){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        return ( 
            <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
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
            // <div style={{'padding': '1px 5px 1px 5px'}} onClick={() => this.when_ends_object_clicked(index, object)}>
            //     {this.render_detail_item('8', item['label'])}
            // </div>
        );
    }

    when_ends_object_clicked(index, item){
        this.props.when_ends_object_clicked(index, item['id'], item['e5'])
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
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
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
                        <img src={this.props.app_state.static_assets['letter']} style={{ height: 30, width: 'auto' }} />
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
                            <li style={{'padding': '2px', 'margin':'0px 0px 0px 0px'}}>
                                {this.render_empty_object()}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }

        return ( 
            <div ref={this.spend_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {this.show_load_metrics(items2, 'tokens')}
                    {items.map((item, index) => (
                        <div style={{'padding': '5px 3px 5px 3px'}}>
                            {this.render_spends_object(item['data'], index, item['id'], item['img'], item)}
                        </div>
                    ))}
                    <div style={{'padding': '5px 3px 5px 3px'}}>
                        {this.render_empty_object()}
                    </div>
                </ul>
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
        if(!is_active){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        return (
            <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
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
            // <div style={{'padding': '1px 5px 1px 5px'}}>
            //     {this.render_detail_item('8', item['label'])}
            // </div>
        );
    }

    when_spends_object_item_clicked(index, item){
        this.props.when_spends_object_clicked(index, item['id'], item['e5'])
    }





    render_small_empty_object(){
        return(
            <div>
                <div style={{ height: 75, 'background-color': this.props.theme['card_background_color'], 'border-radius': '7px', 'padding': '10px 0px 10px 10px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                    <div style={{ 'margin': '10px 20px 10px 0px' }}>
                        <img alt="" src={this.props.app_state.static_assets['letter']} style={{ height: 30, width: 'auto' }} />
                    </div>
                </div>
            </div>
        )
    }

    render_empty_object(){
        var background_color = this.props.theme['card_background_color']
        return(
                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={this.props.app_state.static_assets['letter']} style={{height:60 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                </div>
            );
    }

    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var uploaded_data = {}
        if(item_id == '8' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12')uploaded_data = this.props.app_state.uploaded_data
        return(
            <div>
                <ViewGroups uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} width={this.props.width} theme={this.props.theme} show_images={this.show_images.bind(this)} select_deselect_tag={this.select_deselect_tag.bind(this)}/>
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