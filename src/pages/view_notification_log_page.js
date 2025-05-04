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

class ViewNotificationLogPage extends Component {
    
    state = {
        selected: 0, data: null, get_notification_log_tags_object:this.get_notification_log_tags_object('?')
    };


    set_data(data){
        this.setState({get_notification_log_tags_object: this.get_notification_log_tags_object(data), data: data})
    }

    get_notification_log_tags_object(page){
        if(page == '?'){
            //mail, message, proposal, job_application, job_request, job_application_response, job_request_response, contract
            return{
                'i':{
                    active:'e', 
                },
                'e':[
                    ['or','',0], ['e', this.props.app_state.loc['3067a']/* 'mail' */, this.props.app_state.loc['3067b']/* 'proposals' */, this.props.app_state.loc['3067c']/* 'jobs' */, this.props.app_state.loc['3067d']/* 'contractors' */, this.props.app_state.loc['3067e']/* 'contracts' */], [0]
                ],
            };
        }
        else if(page == 'e'){
            //bag, storefront, bag_application_response
            return{
                'i':{
                    active:'e', 
                },
                'e':[
                    ['or','',0], ['e', this.props.app_state.loc['3067f']/* 'bags' */, this.props.app_state.loc['3067g']/* 'storefronts' */], [0]
                ],
            };
        }
        else{
            return{
                'i':{
                    active:'e', 
                },
                'e':[
                    ['or','',0], ['e', this.props.app_state.loc['3067']/* 'wallet' */, this.props.app_state.loc['1264aj']/* 'bills' */], [0]
                ],
            };
        }
        
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_notification_log_tags_object} tag_size={'l'} when_tags_updated={this.when_get_notification_log_tags_object_updated.bind(this)} theme={this.props.theme}/>
                
                {this.render_everything()}
            </div>
        )
    }

    when_get_notification_log_tags_object_updated(tag_obj){
        this.setState({get_notification_log_tags_object: tag_obj})
    }

    render_everything(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_notifications()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_notifications()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_notifications()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_notifications(){
        var selected_item = this.get_selected_item(this.state.get_notification_log_tags_object, this.state.get_notification_log_tags_object['i'].active)
        
        const page = this.state.data
        if(page == null) return;
        if(selected_item == 'e'){
            if(page == '?'){
                return(
                    <div>
                        {this.render_work_notifications([])}
                    </div>
                )
            }
            else if(page == 'e'){
                return(
                    <div>
                        {this.render_explore_notifications([])}
                    </div>
                )
            }
            else if(page == 'w'){
                return(
                    <div>
                        {this.render_wallet_data([])}
                    </div>
                )
            }
        }
        else if(selected_item == this.props.app_state.loc['3067a']/* 'mail' */){
            return(
                <div>
                    {this.render_work_notifications(['mail','message'])}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['3067b']/* 'proposals' */){
            return(
                <div>
                    {this.render_work_notifications(['proposal'])}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['3067c']/* 'jobs' */){
            return(
                <div>
                    {this.render_work_notifications(['job_application', 'job_application_response'])}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['3067d']/* 'contractors' */){
            return(
                <div>
                    {this.render_work_notifications(['job_request', 'job_request_response'])}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['3067e']/* 'contracts' */){
            return(
                <div>
                    {this.render_work_notifications(['contract'])}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['3067f']/* 'bags' */){
            //bag, storefront, bag_application_response
            return(
                <div>
                    {this.render_explore_notifications(['bag', 'bag_application_response'])}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['3067g']/* 'storefronts' */){
            return(
                <div>
                    {this.render_explore_notifications(['storefront'])}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['3067']/* 'wallet' */){
            return(
                <div>
                    {this.render_wallet_data(['token'])}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1264aj']/* 'bills' */){
            return(
                <div>
                    {this.render_wallet_data(['bill_request'])}
                </div>
            )
        }
    }


    render_work_notifications(type){
        var items = this.get_all_work_notification_items(type)
        if(items.length == 0){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['3067h']/* 'Youre notification history.' */, 'details':this.props.app_state.loc['3067i']/* 'Below are the most recent events were recorded in relation to your account.' */})}
                    <div style={{height:10}}/>
                    <div style={{overflow: 'auto'}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                            {items.map((item, index) => (
                                <div style={{'margin':'3px 0px 3px 0px'}} onClick={() => this.when_event_clicked(item)}>
                                    {this.render_work_notification_item(item, index)}
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }
    }

    render_work_notification_item(item, index){
        const obj = {
            'mail':this.props.app_state.loc['3067j'],/* '📬 You received new mail from $' */
            'message':this.props.app_state.loc['3067k'],/* '📧 You received a new message from $' */
            'proposal':this.props.app_state.loc['3067l'],/* '🧎 $ sent you a proposal in one of your contracts.' */
            'job_application':this.props.app_state.loc['3067m'],/* '📝 $ applied for one of your jobs.' */
            'job_request':this.props.app_state.loc['3067n'],/* '📥 $ sent you a job in your contractor post.' */
            'job_application_response':this.props.app_state.loc['3067o'],/* '📲 $ responded to your application in their job.' */
            'job_request_response':this.props.app_state.loc['3067p'],/* '👷 $ accepted your job request in their contractor post' */
            'contract':this.props.app_state.loc['3067q'],/* '↪📑 $ entered your contract.' */
        }
        const event_type = item['event_type']
        const sender_alias_or_account = this.get_senders_name_or_you(item['sender'], item['e5'])
        var message = obj[event_type]
        if(event_type == 'proposal' && item.returnValues.p1 == 2){
            message = this.props.app_state.loc['3067u']/* '🧎 $ sent a proposal to one of the  main contracts' */
        }
        const processed_message = message.replace('$', sender_alias_or_account)
        const timestamp = item['time']
        const e5 = item['e5']
        
        return(
            <div>
                {this.render_detail_item('3', {'title':processed_message, 'details':''+(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'l',})}
            </div>
        )
    }

    get_all_work_notification_items(types){
        // mail, message, proposal, job_application, job_request, job_application_response, job_request_response, contract
        const notification_object = this.props.app_state.notification_object
        const mail = notification_object['mail'] == null ? [] : notification_object['mail']
        const message = notification_object['message'] == null ? [] : notification_object['message']
        const proposal = notification_object['proposal'] == null ? [] : notification_object['proposal']
        const job_application = notification_object['job_application'] == null ? [] : notification_object['job_application']
        const job_request = notification_object['job_request'] == null ? [] : notification_object['job_request']
        const job_application_response = notification_object['job_application_response'] == null ? [] : notification_object['job_application_response']
        const job_request_response = notification_object['job_request_response'] == null ? [] : notification_object['job_request_response']
        const contract = notification_object['contract'] == null ? [] : notification_object['contract']
        
        const all_events = mail.concat(message, proposal, job_application, job_request, job_application, job_application_response, job_request_response, contract)

        const filtered_events = all_events.filter(function (event) {
            return (types.includes(event['event_type'])  || types.length == 0)
        });

        return this.sortByAttributeDescending(filtered_events, 'time')
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

    get_senders_name_or_you(sender, e5){
        if(sender == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* You. */
        }
        var bucket = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
        var alias = (bucket[sender] == null ? sender : bucket[sender])
            return alias
    }

    when_event_clicked(event){
        console.log('when_event_clicked', event)
        this.props.when_event_clicked(event)
    }





    render_explore_notifications(type){
        var items = this.get_all_explore_notification_items(type)
        if(items.length == 0){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['3067h']/* 'Youre notification history.' */, 'details':this.props.app_state.loc['3067i']/* 'Below are the most recent events were recorded in relation to your account.' */})}
                    <div style={{height:10}}/>
                    <div style={{overflow: 'auto'}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                            {items.map((item, index) => (
                                <div style={{'margin':'3px 0px 3px 0px'}} onClick={() => this.when_event_clicked(item)}>
                                    {this.render_explore_notification_item(item, index)}
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }
    }

    render_explore_notification_item(item, index){
        const obj = {
            'bag':this.props.app_state.loc['3067r'],/* '🛍️ $ applied to fulfil one of your bags.' */
            'bag_application_response':this.props.app_state.loc['3067s'],/* '📥 $ accepted your bag application.' */
            'storefront':this.props.app_state.loc['3067t'],/* '🏪 $ purchased an item from one of your stores.' */
        }
        const event_type = item['event_type']
        const sender_alias_or_account = this.get_senders_name_or_you(item['sender'], item['e5'])
        const message = obj[event_type]
        const processed_message = message.replace('$', sender_alias_or_account)
        const timestamp = item['time']
        const e5 = item['e5']
        return(
            <div>
                {this.render_detail_item('3', {'title':processed_message, 'details':''+(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'l'})}
            </div>
        )
    }

    get_all_explore_notification_items(types){
        //bag, storefront, bag_application_response
        const notification_object = this.props.app_state.notification_object
        const bag = notification_object['bag'] == null ? [] : notification_object['bag']
        const bag_application_response = notification_object['bag_application_response'] == null ? [] : notification_object['bag_application_response']
        const storefront = notification_object['storefront'] == null ? [] : notification_object['storefront']
        
        const all_events = bag.concat(bag_application_response, storefront)

        const filtered_events = all_events.filter(function (event) {
            return (types.includes(event['event_type'])  || types.length == 0)
        });

        return this.sortByAttributeDescending(filtered_events, 'time')
    }






    render_wallet_data(types){
        var items = this.get_all_wallet_notification_items(types)
        if(items.length == 0){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['3067h']/* 'Youre notification history.' */, 'details':this.props.app_state.loc['3067i']/* 'Below are the most recent events were recorded in relation to your account.' */})}
                    <div style={{height:10}}/>
                    <div style={{overflow: 'auto'}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                            {items.map((item, index) => (
                                <div style={{'margin':'3px 0px 3px 0px'}}>
                                    {this.render_token_notification_item(item, index)}
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }
    }

    render_token_notification_item(item, index){
        if(item['event_type'] == 'token'){
            var sender = item.returnValues.p2
            var amount = item.returnValues.p4
            var depth = item.returnValues.p7
            var exchange = item.returnValues.p1
            var timestamp = item.returnValues.p5
            var e5 = item['e5']
            return(
                <div onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+exchange], 'number':this.get_actual_number(amount, depth), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange]})}>
                    {this.render_detail_item('3', {'title':'💸 '+this.get_senders_name_or_you(sender, item['e5'])+this.props.app_state.loc['1593fg']/* ' sent you ' */+this.format_account_balance_figure(this.get_actual_number(amount, depth))+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange], 'details':''+(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'l'})}
                </div>
            )
        }else{
            const obj = {
                'bill_request':this.props.app_state.loc['3067w'],/* '🧾 $ sent you a bill to pay.' */
            }
            const event_type = item['event_type']
            const sender_alias_or_account = this.get_senders_name_or_you(item['sender'], item['e5'])
            const message = obj[event_type]
            const processed_message = message.replace('$', sender_alias_or_account)
            const timestamp = item['time']
            const e5 = item['e5']
            return(
                <div>
                    {this.render_detail_item('3', {'title':processed_message, 'details':''+(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'l'})}
                </div>
            )
        }
        
    }

    get_all_wallet_notification_items(types){
        const notification_object = this.props.app_state.notification_object
        const token = notification_object['token'] == null ? [] : notification_object['token']
        const bill_request = notification_object['bill_request'] == null ? [] : notification_object['bill_request']
        
        
        const all_events = token.concat(bill_request)

        const filtered_events = all_events.filter(function (event) {
            return (types.includes(event['event_type'])  || types.length == 0)
        });

        return this.sortByAttributeDescending(filtered_events, 'time')
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

    get_actual_number(number, depth){
        var p = (bigInt(depth).times(72)).toString().toLocaleString('fullwide', {useGrouping:false})
        var depth_vaule = bigInt(('1e'+p))
        return (bigInt(number).times(depth_vaule)).toString().toLocaleString('fullwide', {useGrouping:false})
    }










    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
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

    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var uploaded_data = {}
        if(item_id == '8' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12') uploaded_data = this.props.app_state.uploaded_data
        return(
            <div>
                <ViewGroups uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
            </div>
        )
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

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
    }

    get_number_width(number){
        if(number == null) return '0%'
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
    }


}




export default ViewNotificationLogPage;