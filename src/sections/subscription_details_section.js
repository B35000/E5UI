import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import Letter from './../assets/letter.png'; 
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
        selected: 0, navigate_view_subscriptions_list_detail_tags_object: this.get_navigate_view_subscriptions_list_detail_tags(), subscription_payment_search_text: '', subscription_cancellation_search_text:''
    };

    componentDidMount() {
        this.interval = setInterval(() => this.check_for_new_responses_and_messages(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    check_for_new_responses_and_messages() {
        if (this.props.selected_subscription_item != null) {
            var object = this.get_subscription_items()[this.props.selected_subscription_item]
            this.props.get_subscription_event_data(object['id'], object['e5'])
        }
    }

    get_navigate_view_subscriptions_list_detail_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e','details','e.events'],[1]
          ],
          'events': [
                ['xor', 'e', 1], ['events', 'transfers', 'payments', 'cancellations', 'collections','modifications'], [1], [1]
            ],
        }
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
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 0px 0px', 'max-width':'470px'}}>
                        <Tags page_tags_object={this.state.navigate_view_subscriptions_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_subscriptions_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
    }

    when_navigate_view_subscriptions_list_detail_tags_object_updated(tag_obj){
        this.setState({navigate_view_subscriptions_list_detail_tags_object: tag_obj})
    }

    render_subscription_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_subscriptions_list_detail_tags_object, this.state.navigate_view_subscriptions_list_detail_tags_object['i'].active)

        if(selected_item == 'details'){
            return(
                <div>
                    {this.render_subscription_main_details_section()}
                </div>
            )
        }
        else if(selected_item == 'transfers'){
            return(
                <div>
                    {this.render_transfer_logs()}
                </div>
            )
        }
        else if(selected_item == 'payments'){
            return(
                <div>
                    {this.render_subscription_payment_logs()}
                </div>
            )
        }
        else if(selected_item == 'cancellations'){
            return(
                <div>
                    {this.render_subscription_cancellations()}
                </div>
            )
        }
        else if(selected_item == 'collections'){
            return(
                <div>
                    {this.render_subscription_collections()}
                </div>
            )
        }
        else if(selected_item == 'modifications'){
            return(
                <div>
                    {this.render_modification_events()}
                </div>
            )
        }
    }

    render_subscription_main_details_section(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-50
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        var item = this.get_subscription_details_data()
        var object = this.get_subscription_items()[this.props.selected_subscription_item]
        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 2px 10px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':''+object['event'].returnValues.p3, 'details':'Author', 'size':'l'})}
                    <div style={{height: 10}}/>

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'details':'Access Rights', 'title':this.get_access_rights_status(object['access_rights_enabled'])})}

                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['target_authority_id'])}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['minimum_buy_amount'])}
                    </div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['can_cancel_subscription'])}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['maximum_buy_amount'])}
                    </div>
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['minimum_cancellable_balance_amount'])}
                    </div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['time_unit'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['subscription_beneficiary'])}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', item['entry_fees'])}
                    <div style={{height: 10}}/>
                    {this.render_buy_token_uis(object['data'][2], object['data'][3], object['data'][4])}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', item['payment_amount'])}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':'Pay Subscription', 'details':'Pay for the subscription for your account', 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_pay_subscription_ui()}>
                        {this.render_detail_item('5', {'text':'Pay Subscription', 'action':''})}
                    </div>

                    {this.render_cancel_button()}

                    {this.render_collect_button()}

                    {this.render_auth_modify_button()}

                    {this.render_moderator_button()}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    get_access_rights_status(value){
        if(value == true){
            return 'Enabled'
        }else{
            return 'Disabled'
        }
    }

    open_pay_subscription_ui(){
        var object = this.get_subscription_items()[this.props.selected_subscription_item]
        this.props.open_pay_subscription_ui(object)
    }

    open_cancel_subscription_ui(){
        var object = this.get_subscription_items()[this.props.selected_subscription_item]
        this.props.open_cancel_subscription_ui(object)
    }

    open_collect_subscription_ui(){
        var object = this.get_subscription_items()[this.props.selected_subscription_item]
        this.props.open_collect_subscription_ui(object)
    }
    
    open_modify_subscription_ui(){
        var object = this.get_subscription_items()[this.props.selected_subscription_item]
        this.props.open_modify_subscription_ui(object)
    }

    open_moderator_ui(){
        var object = this.get_subscription_items()[this.props.selected_subscription_item]
        this.props.open_moderator_ui(object)
    }

    render_cancel_button(){
        var object = this.get_subscription_items()[this.props.selected_subscription_item]
        var subscription_config = object['data'][1]
        var minimum_cancellable_balance_amount = subscription_config[4/* minimum_cancellable_balance_amount */]
        var time_unit = subscription_config[5/* time_unit */]

        if(subscription_config[2] == 1/* cancellable */ && object['payment'] > bigInt(minimum_cancellable_balance_amount).multiply(bigInt(time_unit))){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':'Cancel Subscription', 'details':'Cancel your subscription payment and receive your tokens back', 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_cancel_subscription_ui()}>
                        {this.render_detail_item('5', {'text':'Cancel Subscription', 'action':''})}
                    </div>
                </div>
            )
        }
    }

    render_collect_button(){
        var object = this.get_subscription_items()[this.props.selected_subscription_item]
        var subscription_config = object['data'][1]
        var my_account = this.props.app_state.user_account_id[object['e5']]

        if(subscription_config[0] == my_account){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':'Collect Subscription', 'details':'Collect the subscription payments from the subscription account', 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_collect_subscription_ui()}>
                        {this.render_detail_item('5', {'text':'Collect Subscription', 'action':''})}
                    </div>
                </div>
            )
        }
    }

    render_auth_modify_button(){
        var object = this.get_subscription_items()[this.props.selected_subscription_item]
        var subscription_config = object['data'][1]
        var my_account = this.props.app_state.user_account_id[object['e5']]

        if(subscription_config[0] == my_account){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':'Modify Subscription', 'details':'Modify the configuration of the subscription.', 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_modify_subscription_ui()}>
                        {this.render_detail_item('5', {'text':'Modify Subscription', 'action':''})}
                    </div>
                </div>
            )
        }
    }

    render_moderator_button(){
        var object = this.get_subscription_items()[this.props.selected_subscription_item]
        var my_account = this.props.app_state.user_account_id[object['e5']]

        if(object['id'] != 5 && (object['moderators'].includes(my_account) || object['event'].returnValues.p3 == my_account)){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':'Perform Moderator Actions', 'details':'Set an accounts access rights, moderator privelages or block an account', 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_moderator_ui()}>
                        {this.render_detail_item('5', {'text':'Perform Action', 'action':''})}
                    </div>
                </div>
            )
        }
    }

    render_buy_token_uis(buy_tokens, buy_amounts, buy_depths){
        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                    {buy_tokens.map((item, index) => (
                        <li style={{'padding': '1px'}}>
                            {this.render_detail_item('2', {'style':'l','title':'Token ID: '+item, 'subtitle':'depth:'+buy_depths[index], 'barwidth':this.calculate_bar_width(buy_amounts[index]), 'number':this.format_account_balance_figure(buy_amounts[index]), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item] })}
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

    get_subscription_details_data(){
        var object = this.get_subscription_items()[this.props.selected_subscription_item]
        var tags = object['ipfs'] == null ? ['Subscription'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Subscription ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var subscription_config = object['data'][1]
        var can_cancel_subscription = subscription_config[2] == 0 ? 'non-cancellable': 'cancellable'
        var time_unit = subscription_config[5] == 0 ? 60*53 : subscription_config[5]
        var subscription_beneficiary = subscription_config[6] == 0 ? subscription_config[0] : subscription_config[6]
        return{
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            
            'age':{ 'style':'l', 'title':'Block ID', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':'block', },
            
            'target_authority_id': {'title':subscription_config[0], 'details':'Authority ID', 'size':'l'},
            
            'minimum_buy_amount':{ 'style':'l', 'title':'Minimum Buy Amount', 'subtitle':'??', 'barwidth':this.get_number_width(subscription_config[1]), 'number':`${number_with_commas(subscription_config[1])}`, 'barcolor':'', 'relativepower':'time-units', },

            'can_cancel_subscription': {'title':can_cancel_subscription, 'details':'Subscription Type', 'size':'l'},

            'maximum_buy_amount':{ 'style':'l', 'title':'Maximum Buy Amount', 'subtitle':'??', 'barwidth':this.get_number_width(subscription_config[3]), 'number':`${number_with_commas(subscription_config[3])}`, 'barcolor':'', 'relativepower':'time-units', },

            'minimum_cancellable_balance_amount':{ 'style':'l', 'title':'Maximum Buy Amount', 'subtitle':'??', 'barwidth':this.get_number_width(subscription_config[4]), 'number':`${number_with_commas(subscription_config[4])}`, 'barcolor':'', 'relativepower':'time-units', },

            'time_unit': {'title':this.get_time_diff(time_unit), 'details':'Time Unit', 'size':'l'},

            'payment_amount': {'title':this.get_time_diff(object['payment']), 'details':'Remaining Subscription Time', 'size':'l'},

            'subscription_beneficiary': {'title':subscription_beneficiary, 'details':'Subscription Beneficiary', 'size':'l'},

            'entry_fees': {'title':'Entry Fees', 'details':object['data'][2].length+' tokens used', 'size':'l'},
        }
    }

    get_subscription_items(){
        return this.props.get_subscription_items()
    }













    //ctrl-c, ctrl-v
    render_transfer_logs(){
        var he = this.props.height - 45
        var object = this.get_subscription_items()[this.props.selected_subscription_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Subscription ' + object['id'], 'details': 'Subscription Transfer Events', 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                    {this.render_contract_transfer_item_logs(object)}
                </div>
            </div>
        )
    }

    render_contract_transfer_item_logs(object){
        var middle = this.props.height - 120;
        var items = this.get_item_logs(object, 'transfer')
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
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
                                <div key={index} onClick={() => this.when_contract_transfer_item_clicked(index)}>
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
        var from_to = item['action'] == 'Sent' ? 'To: '+this.get_sender_title_text(item['event'].returnValues.p3, object) : 'From: '+this.get_sender_title_text(item['event'].returnValues.p2, object)
        if (this.state.selected_contract_transfer_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': from_to, 'details': 'Action: '+item['action'], 'size': 's' })}
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Token ID:  '+exchange_id+', depth: '+depth, 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], })}
                    </div>

                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item['event'].returnValues.p5), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item['event'].returnValues.p6, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': from_to, 'details': 'Action: '+item['action'], 'size': 's' })}
                    <div style={{ height: 2 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Token ID:  '+exchange_id+', depth: '+depth, 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
    }













    render_subscription_payment_logs(){
        var he = this.props.height - 45
        var object = this.get_subscription_items()[this.props.selected_subscription_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Subscription ' + object['id'], 'details': 'Pay Subscription Events', 'size': 'l' })}
                    </div>
                    <div style={{margin:'5px 10px 0px 10px'}}>
                        <TextInput height={20} placeholder={'Search account ID...'} when_text_input_field_changed={this.when_subscription_payment_search_text_input_field_changed.bind(this)} text={this.state.subscription_payment_search_text} theme={this.props.theme}/>
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
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
        var items = this.filter_subscription_payment_event_logs(this.get_item_logs(object, 'pay'), this.state.subscription_payment_search_text, object)
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
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
                                <div key={index} onClick={() => this.when_pay_subscription_item_clicked(index)}>
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
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': 'Paying Account', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title':'Time Units: ', 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': 'units', })}
                    </div>

                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p5), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p4, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': 'Paying Account', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {/* <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title':'Time Units: ', 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': 'units', })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} /> */}
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











    render_subscription_cancellations(){
        var he = this.props.height - 45
        var object = this.get_subscription_items()[this.props.selected_subscription_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Subscription ' + object['id'], 'details': 'Cancel Subscription Events', 'size': 'l' })}
                    </div>
                    <div style={{margin:'5px 10px 0px 10px'}}>
                        <TextInput height={20} placeholder={'Search account ID...'} when_text_input_field_changed={this.when_subscription_cancellation_search_text_input_field_changed.bind(this)} text={this.state.subscription_cancellation_search_text} theme={this.props.theme}/>
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
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
        var items = this.filter_subscription_cancellation_event_logs(this.get_item_logs(object, 'cancel'), this.state.subscription_cancellation_search_text, object)
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
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
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': 'Cancelling Account', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title':'Subscription ID:  '+item.returnValues.p1, 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': 'units', })}
                    </div>

                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p5), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p4, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': 'Cancelling Account', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {/* <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title':'Subscription ID:  '+item.returnValues.p1, 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': 'units', })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} /> */}
                </div>
            )
        }
    }












    render_subscription_collections(){
        var he = this.props.height - 45
        var object = this.get_subscription_items()[this.props.selected_subscription_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Subscription ' + object['id'], 'details': 'Collect Subscription Events', 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                    {this.render_collect_subscription_item_logs(object)}
                </div>
            </div>
        )
    }

    render_collect_subscription_item_logs(object){
        var middle = this.props.height - 120;
        var items = this.get_item_logs(object, 'collect')
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
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
                                <div key={index} onClick={() => this.when_collect_subscription_item_clicked(index)}>
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
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': 'Collecting Account', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title':'Total Time Units Collected', 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': 'units', })}
                    </div>

                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p5), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p4, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': 'Collecting Account', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title':'Total Time Units Collected', 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': 'units', })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
    }















    render_modification_events(){
        var he = this.props.height - 45
        var object = this.get_subscription_items()[this.props.selected_subscription_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Subscription ' + object['id'], 'details': 'Modify Subscription Events', 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                    {this.render_modify_subscription_item_logs(object)}
                </div>
            </div>
        )
    }


    render_modify_subscription_item_logs(object){
        var middle = this.props.height - 120;
        var items = this.get_item_logs(object, 'modify')
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
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
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': 'Modifier', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_target_identifier(item), 'details': 'Targeted Modify Item', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.get_value_ui(item)}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p6), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p7, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_target_identifier(item), 'details': 'Targeted Modify Item', 'size': 's' })}
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
        var selected_key = ''
        for (let key in obj) {
            if (obj[key]['position'][0] == target_array_pos && obj[key]['position'][1] == target_array_item) {
                selected_key = key
                break;
            }
        }

        return selected_key
    }


    get_value_ui(item) {
        var identifier = this.get_target_identifier(item)
        var type = this.get_contract_modify_details()[identifier]['picker']
        var number = item.returnValues.p5

        if (type == 'proportion') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.format_proportion(number), 'details': 'proportion', 'size': 'l' })}
                </div>
            )
        }
        else if (type == 'time') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_time_diff(number), 'details': 'duration', 'size': 'l' })}
                </div>
            )
        }
        else if (type == 'number') {
            return (
                <div>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': identifier, 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': 'units', })}
                    </div>
                </div>
            )
        }
        else if (type == 'tag') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_tag_selected_item(identifier, number), 'details': 'value: ' + number, 'size': 'l' })}
                </div>
            )
        }
        else if (type == 'id') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': number, 'details': 'target ID', 'size': 'l' })}
                </div>
            )
        }
    }

    get_tag_selected_item(title, number) {
        var obj = { 'Auto Wait': { 0: 'no', 1: 'yes' }, 'Moderator Modify Privelage': { 1: 'modifiable', 0: 'non-modifiable' }, 'Unlimited Extend Contract Time': { 1: 'enabled', 0: 'disabled' }, 'Bounty Limit Type': { 0: 'relative', 1: 'absolute' }, 'Force Exit Enabled': { 1: 'enabled', 0: 'disabled' }, 'Halving type': { 0: 'fixed', 1: 'spread' }, 'Block Limit Sensitivity': { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' } }

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
        return obj
    }
















    
    render_empty_detail_object(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        return(
            <div style={{height:he, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center','margin':'0px 0px 20px 0px'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={Letter} style={{height:70 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                    
                </div>
        );
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
                <ViewGroups item_id={item_id} object_data={object_data} theme={this.props.theme} width={width}/>
            </div>
        )

    }


    calculate_bar_width(amount){
        var figure = ''
        if(amount == null){
            amount = 0
        }
        if(amount < bigInt('1e9')){
            figure = Math.round((amount.toString().length * 100) / bigInt('1e9').toString().length)
        }
        else if(amount < bigInt('1e18')){
            figure = Math.round((amount.toString().length * 100) / bigInt('1e18').toString().length)
        }
        else if(amount < bigInt('1e36')){
            figure = Math.round((amount.toString().length * 100) / bigInt('1e36').toString().length)
        }
        else{
            figure = Math.round((amount.toString().length * 100) / bigInt('1e72').toString().length)
        }

        return figure+'%'
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
        var power = 'e72'
        if (amount < bigInt('1e9')) {
            power = 'e9'
        }
        else if (amount < bigInt('1e18')) {
            power = 'e18'
        }
        else if (amount < bigInt('1e36')) {
            power = 'e36'
        }
        else {
            power = 'e72'
        }
        return power
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
            return num+ ' sec'
        }
        else if(diff < 60*60){//less than 1 hour
            var num = Math.floor(diff/(60));
            var s = num > 1 ? 's': '';
            return num + ' min' 
        }
        else if(diff < 60*60*24){//less than 24 hours
            var num = Math.floor(diff/(60*60));
            var s = num > 1 ? 's': '';
            return num + ' hr' + s;
        }
        else if(diff < 60*60*24*7){//less than 7 days
            var num = Math.floor(diff/(60*60*24));
            var s = num > 1 ? 's': '';
            return num + ' dy' + s;
        }
        else if(diff < 60*60*24*7*53){//less than 1 year
            var num = Math.floor(diff/(60*60*24*7));
            var s = num > 1 ? 's': '';
            return num + ' wk' + s;
        }
        else {//more than a year
            var num = Math.floor(diff/(60*60*24*7*53));
            var s = num > 1 ? 's': '';
            return number_with_commas(num) + ' yr' + s;
        }
    }

}




export default SubscriptionDetailsSection;