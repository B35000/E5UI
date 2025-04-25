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
var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class SubscriptionDetailsSection extends Component {
    
    state = {
        selected: 0, navigate_view_subscriptions_list_detail_tags_object: this.get_navigate_view_subscriptions_list_detail_tags(), subscription_payment_search_text: '', subscription_cancellation_search_text:'', typed_search_id:'', searched_account:'0'
    };

    componentDidMount() {
        this.interval = setInterval(() => this.check_for_new_responses_and_messages(), this.props.app_state.details_section_syncy_time);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    check_for_new_responses_and_messages() {
        if (this.props.selected_subscription_item != null) {
            var object = this.get_item_in_array(this.get_subscription_items(),this.props.selected_subscription_item)
            if(object == null) return;
            this.props.get_subscription_event_data(object['id'], object['e5'])
            this.props.get_moderator_event_data(object['id'], object['e5'])
        }
    }

    get_navigate_view_subscriptions_list_detail_tags(){
        var obj = {
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e',this.props.app_state.loc['2118']/* 'details' */,this.props.app_state.loc['2643']/* 'search' */, 'e.'+this.props.app_state.loc['2119']/* 'e.events' */, 'e.'+this.props.app_state.loc['2120']/* 'e.moderator-events' */],[1]
          ],
          'events': [
                ['xor', 'e', 1], [this.props.app_state.loc['2119']/* 'events' */, this.props.app_state.loc['2121']/* 'transfers' */, this.props.app_state.loc['2644']/* 'payments' */, this.props.app_state.loc['2645']/* 'cancellations' */, this.props.app_state.loc['2646']/* 'collections' */,this.props.app_state.loc['2647']/* 'modifications' */], [1], [1]
            ],
            'moderator-events': [
                ['xor', 'e', 1], [this.props.app_state.loc['2120']/* 'moderator-events' */, this.props.app_state.loc['2066']/* 'modify-moderators' */, this.props.app_state.loc['2067']/* 'interactable-checkers' */, this.props.app_state.loc['2068']/* 'interactable-accounts' */, this.props.app_state.loc['2069']/* 'block-accounts' */], [1], [1]
            ],
        }

        obj[this.props.app_state.loc['2119']] = [
                ['xor', 'e', 1], [this.props.app_state.loc['2119']/* 'events' */, this.props.app_state.loc['2121']/* 'transfers' */, this.props.app_state.loc['2644']/* 'payments' */, this.props.app_state.loc['2645']/* 'cancellations' */, this.props.app_state.loc['2646']/* 'collections' */,this.props.app_state.loc['2647']/* 'modifications' */], [1], [1]
            ]
        obj[this.props.app_state.loc['2120']] = [
                ['xor', 'e', 1], [this.props.app_state.loc['2120']/* 'moderator-events' */, this.props.app_state.loc['2066']/* 'modify-moderators' */, this.props.app_state.loc['2067']/* 'interactable-checkers' */, this.props.app_state.loc['2068']/* 'interactable-accounts' */, this.props.app_state.loc['2069']/* 'block-accounts' */], [1], [1]
            ]

        return obj
    }

    render(){
        return(
            <div>
                {this.render_subscription_list_detail()}
            </div>
        )
    }



    render_subscription_list_detail(){
        if(this.props.selected_subscription_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_subscription_details_section()}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 0px 0px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.navigate_view_subscriptions_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_subscriptions_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
    }

    when_navigate_view_subscriptions_list_detail_tags_object_updated(tag_obj){
        this.setState({navigate_view_subscriptions_list_detail_tags_object: tag_obj})
    }

    get_item_in_array(object_array, id){
        var object = object_array.find(x => x['e5_id'] === id);
        return object
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

    render_subscription_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_subscriptions_list_detail_tags_object, this.state.navigate_view_subscriptions_list_detail_tags_object['i'].active)
        var object = this.get_item_in_array(this.get_subscription_items(),this.props.selected_subscription_item)
        if(object == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }

        if(selected_item == this.props.app_state.loc['2118']/* 'details' */){
            return(
                <div>
                    {this.render_subscription_main_details_section(object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2121']/* 'transfers' */){
            return(
                <div>
                    {this.render_transfer_logs(object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2644']/* 'payments' */){
            return(
                <div>
                    {this.render_subscription_payment_logs(object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2645']/* 'cancellations' */){
            return(
                <div>
                    {this.render_subscription_cancellations(object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2646']/* 'collections' */){
            return(
                <div>
                    {this.render_subscription_collections(object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2647']/* 'modifications' */){
            return(
                <div>
                    {this.render_modification_events(object)}
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

        else if(selected_item == this.props.app_state.loc['2643']/* 'search' */){
            return(
                <div>
                    {this.render_search_ui(object)}
                </div>
            )
        }
    }

    render_subscription_main_details_section(object){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-50
        var size = this.props.screensize
        
        var item = this.get_subscription_details_data(object)
        // var object = this.get_subscription_items()[this.props.selected_subscription_item]
        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 2px 10px', 'padding':'0px 10px 0px 10px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':''+this.get_senders_name(object['event'].returnValues.p3, object), 'details':this.props.app_state.loc['2070']/* 'Author' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['570']/* 'Access Rights' */, 'title':this.get_access_rights_status(object['access_rights_enabled'])})}

                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['target_authority_id'])}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['minimum_buy_amount']['title'], 'number':item['minimum_buy_amount']['n'], 'relativepower':item['minimum_buy_amount']['relativepower']})}>
                        {this.render_detail_item('2', item['minimum_buy_amount'])}
                    </div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['can_cancel_subscription'])}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['maximum_buy_amount']['title'], 'number':item['maximum_buy_amount']['n'], 'relativepower':item['maximum_buy_amount']['relativepower']})}>
                        {this.render_detail_item('2', item['maximum_buy_amount'])}
                    </div>
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['minimum_cancellable_balance_amount']['title'], 'number':item['minimum_cancellable_balance_amount']['n'], 'relativepower':item['minimum_cancellable_balance_amount']['relativepower']})}>
                        {this.render_detail_item('2', item['minimum_cancellable_balance_amount'])}
                    </div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['time_unit'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['subscription_beneficiary'])}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', item['entry_fees'])}
                    <div style={{height: 10}}/>
                    {this.render_buy_token_uis(object['data'][2], object['data'][3], object['data'][4], object)}
                    <div style={{height: 10}}/>
                    
                    {this.render_revoke_author_privelages_event(object)}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', item['payment_amount'])}
                    <div style={{height: 10}}/>

                    {this.render_pay_subscription_button(object)}

                    {this.render_cancel_button(object)}

                    {this.render_collect_button(object)}

                    {this.render_auth_modify_button(object)}

                    {this.render_moderator_button(object)}

                    {this.render_pin_post_button(object)}
                    
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_pay_subscription_button(object){
        if(object['hidden'] == true) return;
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2648']/* 'Pay Subscription' */, 'details':this.props.app_state.loc['2649']/* 'Pay for the subscription for your account' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_pay_subscription_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2648']/* 'Pay Subscription' */, 'action':''})}
                    </div>
            </div>
        )
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

    render_pin_post_button(object){
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2650']/* 'Pin the subscription to your feed' */, 'title':this.props.app_state.loc['2651']/* 'Pin Subscription' */})}
                <div style={{height:10}}/>
                <div onClick={()=> this.when_pin_subscription_clicked(object)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2652']/* 'Pin/Unpin Subscription' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_pin_subscription_clicked(object){
        this.props.pin_subscription(object)
    }

    render_revoke_author_privelages_event(object){
        // var object = this.get_subscription_items()[this.props.selected_subscription_item]
        var events = this.get_moderator_item_logs(object, 'revoke_privelages')

        if(events.length != 0){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2653']/* 'Author Moderator Privelages Disabled' */, 'details':this.props.app_state.loc['2654']/* Author of Object is not a Moderator by default' */, 'size':'l'})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2655']/* 'Author Moderator Privelages Enabled' */, 'details':this.props.app_state.loc['2656']/* 'Author of Object is a Moderator by default' */, 'size':'l'})}
                </div>
            )
        }
    }

    get_access_rights_status(value){
        if(value == true){
            return 'Enabled'
        }else{
            return 'Disabled'
        }
    }

    open_pay_subscription_ui(object){
        // var object = this.get_subscription_items()[this.props.selected_subscription_item]
        this.props.open_pay_subscription_ui(object)
    }

    open_cancel_subscription_ui(object){
        // var object = this.get_subscription_items()[this.props.selected_subscription_item]
        this.props.open_cancel_subscription_ui(object)
    }

    open_collect_subscription_ui(object){
        // var object = this.get_subscription_items()[this.props.selected_subscription_item]
        this.props.open_collect_subscription_ui(object)
    }
    
    open_modify_subscription_ui(object){
        // var object = this.get_subscription_items()[this.props.selected_subscription_item]
        this.props.open_modify_subscription_ui(object)
    }

    open_moderator_ui(object){
        // var object = this.get_subscription_items()[this.props.selected_subscription_item]
        this.props.open_moderator_ui(object)
    }

    render_cancel_button(object){
        // var object = this.get_subscription_items()[this.props.selected_subscription_item]
        var subscription_config = object['data'][1]
        var minimum_cancellable_balance_amount = subscription_config[4/* minimum_cancellable_balance_amount */]
        // var time_unit = subscription_config[5] == 0 ? 60*53 : subscription_config[5]

        if(object['hidden'] == true) return;

        if(subscription_config[2] == 1/* cancellable */ && object['payment'] > bigInt(minimum_cancellable_balance_amount)){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2657']/* Cancel Subscription' */, 'details':this.props.app_state.loc['2658']/* 'Cancel your subscription payment and receive your tokens back' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_cancel_subscription_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2657']/* 'Cancel Subscription' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    render_collect_button(object){
        // var object = this.get_subscription_items()[this.props.selected_subscription_item]
        var subscription_config = object['data'][1]
        var my_account = this.props.app_state.user_account_id[object['e5']]

        if(subscription_config[0] == my_account && subscription_config[2] == 1){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2659']/* 'Collect Subscription' */, 'details':this.props.app_state.loc['2660']/* 'Collect the subscription payments from the subscription account' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_collect_subscription_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2659']/* 'Collect Subscription' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    render_auth_modify_button(object){
        // var object = this.get_subscription_items()[this.props.selected_subscription_item]
        var subscription_config = object['data'][1]
        var my_account = this.props.app_state.user_account_id[object['e5']]

        if(subscription_config[0] == my_account){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2661']/* 'Modify Subscription' */, 'details':this.props.app_state.loc['2662']/* 'Modify the configuration of the subscription.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_modify_subscription_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2661']/* 'Modify Subscription' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    render_moderator_button(object){
        // var object = this.get_subscription_items()[this.props.selected_subscription_item]
        var my_account = this.props.app_state.user_account_id[object['e5']]

        if(object['id'] != 5 && (object['moderators'].includes(my_account) || object['event'].returnValues.p3 == my_account)){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2663']/* 'Perform Moderator Actions' */, 'details':this.props.app_state.loc['2664']/* 'Set an accounts access rights, moderator privelages or block an account' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_moderator_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2665']/* 'Perform Action' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    render_buy_token_uis(buy_tokens, buy_amounts, buy_depths, object){
        var bt = [].concat(buy_tokens)
        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                    {bt.map((item, index) => (
                        <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+item], 'number':buy_amounts[index], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                            {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+item], 'subtitle':this.format_power_figure(buy_amounts[index]), 'barwidth':this.calculate_bar_width(buy_amounts[index]), 'number':this.format_account_balance_figure(buy_amounts[index]), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item] })}
                        </li>
                    ))}
                </ul>
            </div>
            
        )
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

    get_subscription_details_data(object){
        // var object = this.get_subscription_items()[this.props.selected_subscription_item]
        var tags = object['ipfs'] == null ? ['Subscription'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? this.props.app_state.loc['1756']/* 'Subscription ID' */ : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var time = object['event'] == null ? 0 : object['event'].returnValues.p4
        var subscription_config = object['data'][1]
        var can_cancel_subscription = subscription_config[2] == 0 ? this.props.app_state.loc['1827']/* 'non-cancellable' */: this.props.app_state.loc['1828']/* 'cancellable' */
        var time_unit = subscription_config[5] == 0 ? 60*53 : subscription_config[5]
        var subscription_beneficiary = subscription_config[6] == 0 ? subscription_config[0] : subscription_config[6]
        return{
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['e5']+' • '+object['id'], 'details':title, 'size':'l'},
            
            'age':{ 'style':'l', 'title':this.props.app_state.loc['2206']/* 'Block Number' */, 'subtitle':'age', 'barwidth':this.get_number_width(age), 'number':`${this.format_account_balance_figure(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)} `+this.props.app_state.loc['2495']/* ago */, },
            
            'target_authority_id': {'title':this.get_senders_name(subscription_config[0], object), 'details':this.props.app_state.loc['1830']/* 'Authority ID' */, 'size':'l'},
            
            'minimum_buy_amount':{ 'style':'l', 'title':this.props.app_state.loc['1831']/* 'Minimum Buy Amount' */, 'subtitle':this.format_power_figure(subscription_config[1]), 'barwidth':this.get_number_width(subscription_config[1]), 'number':`${this.format_account_balance_figure(subscription_config[1])}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['1832']/* 'time-units' */, 'n':subscription_config[1]},

            'can_cancel_subscription': {'title':can_cancel_subscription, 'details':this.props.app_state.loc['1833']/* 'Subscription Type' */, 'size':'l'},

            'maximum_buy_amount':{ 'style':'l', 'title':this.props.app_state.loc['1834']/* 'Maximum Buy Amount' */, 'subtitle':this.format_power_figure(subscription_config[3]), 'barwidth':this.get_number_width(subscription_config[3]), 'number':`${this.format_account_balance_figure(subscription_config[3])}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['1832']/* 'time-units' */, 'n':subscription_config[3]},

            'minimum_cancellable_balance_amount':{ 'style':'l', 'title':this.props.app_state.loc['1836']/* 'Minimum Cancellable Amount' */, 'subtitle':this.format_power_figure(subscription_config[4]), 'barwidth':this.get_number_width(subscription_config[4]), 'number':`${this.format_account_balance_figure(subscription_config[4])}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['1832']/* 'time-units' */,'n':subscription_config[4] },

            'time_unit': {'title':this.get_time_diff(time_unit), 'details':this.props.app_state.loc['1837']/* 'Time Unit' */, 'size':'l'},

            'payment_amount': {'title':this.get_time_diff(object['payment']), 'details':this.props.app_state.loc['1838']/* 'Remaining Subscription Time' */, 'size':'l'},

            'subscription_beneficiary': {'title':this.get_senders_name(subscription_beneficiary, object), 'details':this.props.app_state.loc['1839']/* 'Subscription Beneficiary' */, 'size':'l'},

            'entry_fees': {'title':this.props.app_state.loc['1840']/* 'Entry Fees' */, 'details':object['data'][2].length+this.props.app_state.loc['1841']/* ' tokens used' */, 'size':'l'},
        }
    }

    get_subscription_items(){
        return this.props.get_subscription_items('')
    }













    //ctrl-c, ctrl-v
    render_transfer_logs(object){
        var he = this.props.height - 45
        // var object = this.get_subscription_items()[this.props.selected_subscription_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2666']/* 'In Subscription ' */ + object['id'], 'details': this.props.app_state.loc['2667']/* 'Subscription Transfer Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                    {this.render_contract_transfer_item_logs(object)}
                </div>
            </div>
        )
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
                <div style={{  }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index}>
                                    {this.render_contract_transfer_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    get_item_logs(object, event) {
        if (this.props.app_state.subscription_events[object['id']] == null) {
            return []
        }
        return this.props.app_state.subscription_events[object['id']][event]
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
                        {this.render_detail_item('3', { 'title': from_to, 'details': this.props.app_state.loc['2413']/* 'Action: ' */+item['action'], 'size': 's' })}
                    </div>
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+exchange_id], 'number':number, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id]})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+exchange_id], 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], })}
                    </div>

                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item['event'].returnValues.p5), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item['event'].returnValues.p6, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div onClick={() => this.when_contract_transfer_item_clicked(index)}>
                    {this.render_detail_item('3', { 'title': from_to, 'details':this.format_account_balance_figure(number)+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], 'size': 's' })}
                </div>
            )
        }
    }

    get_actual_number(number, depth){
        var p = (bigInt(depth).times(72)).toString().toLocaleString('fullwide', {useGrouping:false})
        var depth_vaule = bigInt(('1e'+p))
        return (bigInt(number).times(depth_vaule)).toString().toLocaleString('fullwide', {useGrouping:false})
    }













    render_subscription_payment_logs(object){
        var he = this.props.height - 45
        // var object = this.get_subscription_items()[this.props.selected_subscription_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2666']/* 'In Subscription ' */ + object['id'], 'details': this.props.app_state.loc['2668']/* 'Pay Subscription Events' */, 'size': 'l' })}
                    </div>
                    <div style={{margin:'5px 10px 0px 10px'}}>
                        <TextInput font={this.props.app_state.font} height={20} placeholder={this.props.app_state.loc['2669']/* Search account ID...' */} when_text_input_field_changed={this.when_subscription_payment_search_text_input_field_changed.bind(this)} text={this.state.subscription_payment_search_text} theme={this.props.theme}/>
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                    {this.render_pay_subscription_item_logs(object)}
                </div>
            </div>
        )
    }

    when_subscription_payment_search_text_input_field_changed(text){
        this.setState({subscription_payment_search_text: text})
    }

    //inefficient
    filter_subscription_payment_event_logs(logs, typed_id, object){
        var results = []
        if(typed_id == '') return logs;
        logs.forEach(log => {
            if(log.returnValues.p2.includes(typed_id.trim()) || this.get_sender_title_text(log.returnValues.p2, object).includes(typed_id.trim())){
                results.push(log)
            }
        });
        return results
    }

    render_pay_subscription_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.filter_subscription_payment_event_logs(this.get_item_logs(object, 'pay'), this.state.subscription_payment_search_text, object))
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
                <div>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index}>
                                    {this.render_pay_subscription_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_pay_subscription_item_clicked(index){
        if (this.state.selected_pay_subscription_event_item == index) {
            this.setState({ selected_pay_subscription_event_item: null })
        } else {
            this.setState({ selected_pay_subscription_event_item: index })
        }
    }

    render_pay_subscription_event_item(item, object, index){
        var number = item.returnValues.p3
        if (this.state.selected_pay_subscription_event_item == index) {
            return (
                <div>
                    <div onClick={() => this.when_pay_subscription_item_clicked(index)}>
                        {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': 'Paying Account', 'size': 's' })}
                    </div>
                    <div style={{ height: 2 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1757']/* 'Time Units: ' */, 'number':number, 'relativepower':this.props.app_state.loc['1628']/* 'units' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title':this.props.app_state.loc['1757']/* 'Time Units: ' */, 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': this.props.app_state.loc['1628']/* 'units' */, })}
                    </div>

                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p5), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p4, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div onClick={() => this.when_pay_subscription_item_clicked(index)}>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': this.props.app_state.loc['2670']/* 'Paying Account' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
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











    render_subscription_cancellations(object){
        var he = this.props.height - 45
        // var object = this.get_subscription_items()[this.props.selected_subscription_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2666']/* 'In Subscription ' */ + object['id'], 'details': this.props.app_state.loc['2671']/* 'Cancel Subscription Events' */, 'size': 'l' })}
                    </div>
                    <div style={{margin:'5px 10px 0px 10px'}}>
                        <TextInput font={this.props.app_state.font} height={20} placeholder={this.props.app_state.loc['2669']/* 'Search account ID...' */} when_text_input_field_changed={this.when_subscription_cancellation_search_text_input_field_changed.bind(this)} text={this.state.subscription_cancellation_search_text} theme={this.props.theme}/>
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                    {this.render_cancel_subscription_item_logs(object)}
                </div>
            </div>
        )
    }

    when_subscription_cancellation_search_text_input_field_changed(text){
        this.setState({subscription_cancellation_search_text: text})
    }

    //inefficient
    filter_subscription_cancellation_event_logs(logs, typed_id, object){
        var results = []
        if(typed_id == '') return logs;
        logs.forEach(log => {
            if(log.returnValues.p2.includes(typed_id.trim()) || this.get_sender_title_text(log.returnValues.p2, object).includes(typed_id.trim())){
                results.push(log)
            }
        });
        return results
    }

    render_cancel_subscription_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.filter_subscription_cancellation_event_logs(this.get_item_logs(object, 'cancel'), this.state.subscription_cancellation_search_text, object))
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
                                <div key={index} onClick={() => this.when_cancel_subscription_item_clicked(index)}>
                                    {this.render_cancel_subscription_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_cancel_subscription_item_clicked(index){
        if (this.state.selected_cancel_subscription_event_item == index) {
            this.setState({ selected_cancel_subscription_event_item: null })
        } else {
            this.setState({ selected_cancel_subscription_event_item: index })
        } 
    }

    render_cancel_subscription_event_item(item, object, index){
        var number = item.returnValues.p3
        if (this.state.selected_cancel_subscription_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': this.props.app_state.loc['2672']/* 'Cancelling Account' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1758']/* 'Subscription ID:  ' */+item.returnValues.p1, 'number':number, 'relativepower':this.props.app_state.loc['1628']/* 'units' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title':this.props.app_state.loc['1758']/* 'Subscription ID:  ' */+item.returnValues.p1, 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': this.props.app_state.loc['1628']/* 'units' */, })}
                    </div>

                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p5), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p4, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': this.props.app_state.loc['2672']/* 'Cancelling Account' */, 'size': 's' })}
                </div>
            )
        }
    }












    render_subscription_collections(object){
        var he = this.props.height - 45
        // var object = this.get_subscription_items()[this.props.selected_subscription_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2666']/* 'In Subscription ' */ + object['id'], 'details': this.props.app_state.loc['2673']/* 'Collect Subscription Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                    {this.render_collect_subscription_item_logs(object)}
                </div>
            </div>
        )
    }

    render_collect_subscription_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.get_item_logs(object, 'collect'))
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
                                    {this.render_collect_subscription_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }


    when_collect_subscription_item_clicked(index){
        if (this.state.selected_collect_subscription_event_item == index) {
            this.setState({ selected_collect_subscription_event_item: null })
        } else {
            this.setState({ selected_collect_subscription_event_item: index })
        } 
    }


    render_collect_subscription_event_item(item, object, index){
        var number = item.returnValues.p3
        if (this.state.selected_collect_subscription_event_item == index) {
            return (
                <div>
                    <div onClick={() => this.when_collect_subscription_item_clicked(index)}>
                        {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': this.props.app_state.loc['2674']/* 'Collecting Account' */, 'size': 's' })}
                    </div>
                    <div style={{ height: 2 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2675']/* 'Total Time Units Collected' */, 'number':number, 'relativepower':this.props.app_state.loc['2676']/* 'units' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title':this.props.app_state.loc['2675']/* 'Total Time Units Collected' */, 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': this.props.app_state.loc['2676']/* 'units' */, })}
                    </div>

                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p5), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p4, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div onClick={() => this.when_collect_subscription_item_clicked(index)}>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': this.format_account_balance_figure(number)+' '+this.props.app_state.loc['2676']/* 'units' */, 'size': 's' })}
                </div>
            )
        }
    }















    render_modification_events(object){
        var he = this.props.height - 45
        // var object = this.get_subscription_items()[this.props.selected_subscription_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2666']/* 'In Subscription ' */ + object['id'], 'details': this.props.app_state.loc['2677']/* 'Modify Subscription Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                    {this.render_modify_subscription_item_logs(object)}
                </div>
            </div>
        )
    }


    render_modify_subscription_item_logs(object){
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
                                <div key={index} onClick={() => this.when_modify_subscription_item_clicked(index)}>
                                    {this.render_modify_subscription_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }


    when_modify_subscription_item_clicked(index){
        if (this.state.selected_modify_subscription_event_item == index) {
            this.setState({ selected_modify_subscription_event_item: null })
        } else {
            this.setState({ selected_modify_subscription_event_item: index })
        } 
    }


    render_modify_subscription_event_item(item, object, index){
        if (this.state.selected_modify_subscription_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': this.props.app_state.loc['2179']/* 'Modifier' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_target_identifier(item), 'details': this.props.app_state.loc['2183']/* 'Targeted Modify Item' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.get_value_ui(item, object)}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['2198']/* 'Age' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p7, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_target_identifier(item), 'details': this.props.app_state.loc['2183']/* 'Targeted Modify Item' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                </div>
            )
        }
    }

    //ctrl-c, ctrl-v
    get_target_identifier(item) {
        var obj = this.get_contract_modify_details()

        var target_array_pos = item.returnValues.p3
        var target_array_item = item.returnValues.p4

        if(target_array_pos == 3/* contract_entry_amounts */){
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
        var subscription = object['data']
        var exchange_id = subscription[2][target_array_item]

        var title = identifier == 'price' ? this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+exchange_id] : identifier

        if (type == 'proportion') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.format_proportion(number), 'details': this.props.app_state.loc['1881']/* 'proportion' */, 'size': 'l' })}
                </div>
            )
        }
        else if (type == 'time') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_time_diff(number), 'details': this.props.app_state.loc['1882']/* 'duration' */, 'size': 'l' })}
                </div>
            )
        }
        else if (type == 'number') {
            return (
                <div>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':title, 'number':number, 'relativepower':this.props.app_state.loc['1904']/* 'units' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': title, 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': this.props.app_state.loc['1904']/* 'units' */, })}
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
                    {this.render_detail_item('3', { 'title': number, 'details': this.props.app_state.loc['1884']/* 'target ID' */, 'size': 'l' })}
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
            'Target Authority':{'position':[1,0], 'picker':'id', 'powerlimit':63},
            'Target Beneficiary':{'position':[1,6], 'picker':'id', 'powerlimit':63},
            'Minimum Buy Amount':{'position':[1,1], 'picker':'number', 'powerlimit':63},
            'Maximum Buy Amount':{'position':[1,3], 'picker':'number', 'powerlimit':63}, 
            'Minimum Cancellable Balance Amount':{'position':[1,4], 'picker':'number', 'powerlimit':63},
        }

        obj[this.props.app_state.loc['438a']]/* 'Target Authority' */ = {'position':[1,0], 'picker':'id', 'powerlimit':63}
        obj[this.props.app_state.loc['438b']]/* 'Target Beneficiary' */ = {'position':[1,6], 'picker':'id', 'powerlimit':63}
        obj[this.props.app_state.loc['438c']]/* 'Minimum Buy Amount' */ = {'position':[1,1], 'picker':'number', 'powerlimit':63}
        obj[this.props.app_state.loc['438d']]/* 'Maximum Buy Amount' */ = {'position':[1,3], 'picker':'number', 'powerlimit':63}
        obj[this.props.app_state.loc['438e']]/* 'Minimum Cancellable Balance Amount' */ = {'position':[1,4], 'picker':'number', 'powerlimit':63}


        return obj
    }












    render_modify_moderator_logs(object){
        var he = this.props.height - 45
        // var object = this.get_subscription_items()[this.props.selected_subscription_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2666']/* 'In Subscription ' */ + object['id'], 'details': this.props.app_state.loc['2678']/* 'Subscription Modify Moderator Events' */, 'size': 'l' })}
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
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': this.props.app_state.loc['2198']/* 'Age' */, 'size': 's' })}
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














    render_interactable_checker_logs(object){
        var he = this.props.height - 45
        // var object = this.get_subscription_items()[this.props.selected_subscription_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2666']/* 'In Subscription ' */ + object['id'], 'details': this.props.app_state.loc['2679']/* 'Subscription Access Rights Settings Events' */, 'size': 'l' })}
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
        // var object = this.get_subscription_items()[this.props.selected_subscription_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2666']/* 'In Subscription ' */ + object['id'], 'details': this.props.app_state.loc['2680']/* 'Subscription Account Access Settings Events' */, 'size': 'l' })}
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
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2106']/* 'Targeted Account' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': this.props.app_state.loc['2107']/* 'Moderator Account' */, 'size': 's' })}
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
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2106']/* Targeted Account' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['2117']/* 'Until: ' */+(new Date(item.returnValues.p6*1000)), 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
    }











    render_blocked_accounts_logs(object){
        var he = this.props.height - 45
        // var object = this.get_subscription_items()[this.props.selected_subscription_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2666']/* 'In Subscription '  */+ object['id'], 'details': this.props.app_state.loc['2681']/* 'Subscription Blocked Account Events' */, 'size': 'l' })}
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
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2115']/* 'Targeted Account' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': this.props.app_state.loc['2113']/* 'Moderator Account' */, 'size': 's' })}
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['2117']/* 'Until: ' */+(new Date(item.returnValues.p6*1000)), 'size': 's' })}
                    
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': this.props.app_state.loc['1748']/* Age' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2115']/* 'Targeted Account' */, 'size': 's' })}
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['2117']/* 'Until: ' */+(new Date(item.returnValues.p6*1000)), 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
    }













    render_search_ui(object){
       var he = this.props.height - 45
        // var object = this.get_subscription_items()[this.props.selected_subscription_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2666']/* 'In Subscription ' */ + object['id'], 'details': this.props.app_state.loc['2682']/* 'Search Subscription Payment' */, 'size': 'l' })}
                    </div>
                    <div className="row" style={{ padding: '5px 10px 5px 10px', width:'103%' }}>
                        <div className="col-9" style={{'margin': '0px 0px 0px 0px'}}>
                            <TextInput font={this.props.app_state.font} height={25} placeholder={this.props.app_state.loc['2682']/* 'Enter ID or Alias...' */} when_text_input_field_changed={this.when_text_input_field_changed.bind(this)} text={this.state.typed_search_id} theme={this.props.theme}/>
                        </div>
                        <div className="col-3" style={{'padding': '0px 0px 0px 0px'}} onClick={()=> this.perform_search(object)}>
                            {this.render_detail_item('5',{'text':'Search','action':''})}
                        </div>
                    </div>
                    {this.render_search_results_if_any(object)}
                </div>
            </div>
        ) 
    }

    when_text_input_field_changed(text){
        this.setState({typed_search_id: text})
    }


    perform_search(object){
        var typed_account = this.get_typed_alias_id(this.state.typed_search_id.trim())

        if(typed_account == ''){
            this.props.notify(this.props.app_state.loc['128']/* 'Type something.' */, 3800)
        }
        else if(isNaN(typed_account)){
            this.props.notify(this.props.app_state.loc['1576']/* 'That ID is not valid.' */, 3800)
        }
        else if(parseInt(typed_account) < 1001){
            this.props.notify(this.props.app_state.loc['1576']/* 'That ID is not valid.' */, 3800)
        }else{
            // this.props.notify(this.props.app_state.loc['2509']/* 'Searching...' */, 800)
            this.setState({searched_account: typed_account})
            this.props.get_accounts_payment_information(object['id'], object['e5'], typed_account)
        }
        
    }

    get_typed_alias_id(alias){
        if(!isNaN(alias)){
            return alias
        }
        var id = (this.props.app_state.alias_owners[this.props.app_state.selected_e5][alias] == null ? alias : this.props.app_state.alias_owners[this.props.app_state.selected_e5][alias])

        return id
    }


    render_search_results_if_any(object){
        const result = this.props.app_state.subscription_search_result[object['id']+this.state.searched_account]
        if(result == null || result['events'].length == 0){
            var items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto'}}>
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
        }else{
            const result_events = [].concat(result['events'])
            var first_payment_time = result_events[0].returnValues.p5
            var latest_payment_time = result_events[result_events.length-1].returnValues.p5
            var time_unit = object['data'][1][5] == 0 ? 60*53 : object['data'][1][5]
            var remaining_time_units = Math.floor(result['payment'] / time_unit)
            return(
                <div style={{ margin: '5px 10px 5px 10px' }}>
                    {this.render_detail_item('3', {'title':this.get_time_diff(result['payment']), 'details':this.props.app_state.loc['2683']/* 'Remaining Subscription Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2684']/* 'Remaining Time Units (As of Now)' */, 'number':remaining_time_units, 'relativepower':this.props.app_state.loc['2685']/* time-units' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title':this.props.app_state.loc['2684']/* 'Remaining Time Units (As of Now)' */, 'subtitle': this.format_power_figure(remaining_time_units), 'barwidth': this.calculate_bar_width(remaining_time_units), 'number': this.format_account_balance_figure(remaining_time_units), 'barcolor': '', 'relativepower': this.props.app_state.loc['2685']/* time-units' */, })}
                    </div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':''+(new Date(latest_payment_time*1000))+', '+(this.get_time_difference(latest_payment_time))+this.props.app_state.loc['1698a']/* ago. */, 'details':this.props.app_state.loc['2686']/* 'Latest Payment Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
    
                    {this.render_detail_item('3', {'title':''+(new Date(first_payment_time*1000))+', '+(this.get_time_difference(first_payment_time))+this.props.app_state.loc['1698a']/* ago. */, 'details':this.props.app_state.loc['2688']/* 'First Payment Time' */, 'size':'s'})}
                    
                    {this.render_chart_data_if_size_works(result)}
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2804']/* Payment History */,'details':this.props.app_state.loc['2805']/* Their payment history is shown below. */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    {this.render_searched_accounts_payment_history(result_events)}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    render_searched_accounts_payment_history(events){
        var items = events.reverse()
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
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
                <div>
                    <ul style={{ 'padding': '0px 0px 0px 0px' ,'list-style':'none'}}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index}>
                                    {this.render_searched_account_event_item(item, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_searched_account_paid_item_clicked(index){
        if (this.state.selected_pay_subscription_event_item2 == index) {
            this.setState({ selected_pay_subscription_event_item2: null })
        } else {
            this.setState({ selected_pay_subscription_event_item2: index })
        }
    }

    render_searched_account_event_item(item, index){
        var number = item.returnValues.p3
        var payment_time = item.returnValues.p5
        if (this.state.selected_pay_subscription_event_item2 == index) {
            return (
                <div>
                    <div onClick={() => this.when_searched_account_paid_item_clicked(index)}>
                        {this.render_detail_item('3', { 'title': ''+(this.get_time_difference(payment_time))+this.props.app_state.loc['1698a']/* ago. */, 'details': ''+(new Date(payment_time*1000)), 'size': 's' })}
                    </div>
                    <div style={{ height: 2 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1757']/* 'Time Units: ' */, 'number':number, 'relativepower':this.props.app_state.loc['1628']/* 'units' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title':this.props.app_state.loc['1757']/* 'Time Units: ' */, 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': this.props.app_state.loc['1628']/* 'units' */, })}
                    </div>

                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p5), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p4, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div onClick={() => this.when_searched_account_paid_item_clicked(index)}>
                    {this.render_detail_item('3', { 'title': ''+this.format_account_balance_figure(number)+ ' '+ this.props.app_state.loc['2685']/* time-units' */, 'details': ''+(new Date(payment_time*1000))+', '+(this.get_time_difference(payment_time))+this.props.app_state.loc['1698a']/* ago. */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                </div>
            )
        }
    }   

    render_chart_data_if_size_works(result){
        if(result['events'].length > 23){
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2692']/* 'Time Units Paid For' */, 'details':this.props.app_state.loc['2693']/* 'Chart containing the amount in time units that have been accumulated.' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('6', {'dataPoints':this.get_search_result_data_points(result['events']), 'interval':110, 'hide_label':true})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2694']/* 'Y-Axis: Time Units' */, 'details':this.props.app_state.loc['2695']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                </div>
            )
        }
    }


    get_search_result_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i==0){
                    // data.push(parseInt(events[i].returnValues.p3))
                    data.push(bigInt(events[i].returnValues.p3))
                }else{
                    // data.push(data[data.length-1]+bigInt(events[i].returnValues.p3))
                    data.push(bigInt(data[data.length-1]).add(bigInt(events[i].returnValues.p3)))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p5
                    for(var t=0; t<diff; t+=60){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p5 - events[i].returnValues.p5
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
        var largest_number = this.get_interval_figure(events)
        for(var i = 0; i < noOfDps; i++) {
            yVal = parseInt(bigInt(data[factor * xVal]).multiply(100).divide(largest_number))
            // yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null && data[factor * xVal] != null){
                if(i%(Math.round(noOfDps/10)) == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(data[factor * xVal])});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }


    get_interval_figure(events){
        var data = []
        events.forEach(event => {
            data.push(bigInt(event.returnValues.p3))
        });
        var largest = Math.max.apply(Math, data);
        return largest
    }

    get_lowest_figure(events){
        var data = []
        events.forEach(event => {
            data.push(bigInt(event.returnValues.p3))
        });
        var largest = Math.min.apply(Math, data);
        return largest
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
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={width}/>
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

    format_power_figure(amount) {
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

    get_future_time_difference(time) {
        var number_date = Math.round(parseInt(time));
        var now = Math.round(new Date().getTime() / 1000);

        var diff = number_date - now;
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




export default SubscriptionDetailsSection;