import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import Letter from './../assets/letter.png'; 
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
        selected: 0, navigate_view_subscriptions_list_detail_tags_object: this.get_navigate_view_subscriptions_list_detail_tags(),
    };

    get_navigate_view_subscriptions_list_detail_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e','details','transactions'],[1]
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
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 20px 0px', 'max-width':'470px'}}>
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
        }else if(selected_item == 'transactions'){
            return(
                <div>
                    {this.render_subscription_logs()}
                </div>
            )
            
        }
    }

    render_subscription_main_details_section(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-70
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        var item = this.get_subscription_details_data()
        var object = this.get_subscription_items()[this.props.selected_subscription_item]
        return(
            <div style={{ width:'99%', 'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 20px 10px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
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
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['payment_amount'])}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', item['entry_fees'])}
                    <div style={{height: 10}}/>
                    {this.render_buy_token_uis(object['data'][2], object['data'][3], object['data'][4])}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':'Pay Subscription', 'details':'Pay for the subscription for your account', 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_pay_subscription_ui()}>
                        {this.render_detail_item('5', {'text':'Pay Subscription', 'action':''})}
                    </div>

                    {this.render_cancel_button()}

                    {this.render_collect_button()}

                    {this.render_auth_modify_button()}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
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

    render_cancel_button(){
        var object = this.get_subscription_items()[this.props.selected_subscription_item]
        var subscription_config = object['data'][1]

        if(subscription_config[2] == 1/* cancellable */){
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
        var my_account = this.props.app_state.user_account_id

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
        var my_account = this.props.app_state.user_account_id

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

    render_buy_token_uis(buy_tokens, buy_amounts, buy_depths){
        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                    {buy_tokens.map((item, index) => (
                        <li style={{'padding': '1px'}}>
                            {this.render_detail_item('2', {'style':'l','title':'Token ID: '+item, 'subtitle':'depth: '+buy_depths[index], 'barwidth':this.calculate_bar_width(buy_amounts[index]), 'number':this.format_account_balance_figure(buy_amounts[index]), 'relativepower':'tokens'})}
                        </li>
                    ))}
                </ul>
            </div>
            
        )
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
        // var items = this.props.app_state.created_subscriptions
        // return items.reverse()

        var selected_option_name = this.get_selected_item(this.props.work_page_tags_object, this.props.work_page_tags_object['i'].active)

        if(this.props.work_page_tags_object['i'].active != 'subscriptions'){
            return this.props.app_state.created_subscriptions.reverse()
        }

        if(selected_option_name == 'all'){
            return this.props.app_state.created_subscriptions.reverse()
        }
        else if(selected_option_name == 'viewed'){
            var my_viewed_subscriptions = []
            for(var i=0; i<this.props.viewed_subscriptions.length; i++){
                my_viewed_subscriptions.push(this.props.app_state.created_subscriptions[this.props.viewed_subscriptions[i]])
            }
            return my_viewed_subscriptions.reverse()
        }
        else if(selected_option_name == 'paid'){
            return this.props.app_state.created_subscriptions.reverse()
        }
        else {
            var my_subscriptions = []
            var myid = this.props.app_state.user_account_id
            for(var i = 0; i < this.props.app_state.created_subscriptions.length; i++){
                var post_author = this.props.app_state.created_subscriptions[i]['event'] == null ? 0 : this.props.app_state.created_subscriptions[i]['event'].returnValues.p3
                if(post_author.toString() == myid.toString()){
                    my_subscriptions.push(this.props.app_state.created_subscriptions[i])
                }else{
                    console.log('sender not post author: author->'+post_author+', sender id->'+myid)
                }
            }
            return my_subscriptions.reverse()
        }
    }

    render_subscription_logs(){

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