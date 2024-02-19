import React, { Component } from 'react';
import ViewGroups from '../../components/view_groups'
import Tags from '../../components/tags';
import NumberPicker from '../../components/number_picker';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

class PaySubscriptionPage extends Component {
    
    state = {
        selected: 0,id:makeid(8), type:this.props.app_state.loc['862']/* 'pay-subscription' */, entered_indexing_tags:[this.props.app_state.loc['863']/* 'pay' */, this.props.app_state.loc['864']/* 'subscription' */],
        subscription_item:{'data':[[],[0,0,0,0,0,0,0], [],[],[]]}, pay_subscription_title_tags_object:this.get_pay_subscription_title_tags_object(), time_units:0
    };

    get_pay_subscription_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['862']/* 'pay-subscription' */], [1]
            ],
        };
    }

    render(){
        return(
            <div style={{'padding':'10px 20px 0px 10px'}}>

                <div className="row">
                    <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.pay_subscription_title_tags_object} tag_size={'l'} when_tags_updated={this.when_pay_subscription_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'padding': '5px'}} onClick={()=>this.finish()}>
                            {this.render_detail_item('5', {'text':this.props.app_state.loc['4']/* 'Finish' */, 'action':''})}
                        </div>
                    </div>
                </div>

                {this.render_everything()}

            </div>
        )
    }

    when_pay_subscription_title_tags_object_updated(tag_obj){
        this.setState({pay_subscription_title_tags_object: tag_obj})
    }




    render_everything(){
        var subscription_config = this.state.subscription_item['data'][1]
        var time_unit = subscription_config[5] == 0 ? 60*53 : subscription_config[5]
        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'13px', 'text':this.props.app_state.loc['865']/* 'Pay for the subscription ID: ' */+this.state.subscription_item['id']})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.get_time_diff(time_unit), 'details':this.props.app_state.loc['866']/* 'Time Unit' */, 'size':'s'})}

                {this.render_minimum_buy_amount()}

                {this.render_maximum_buy_amount()}

                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['867']/* 'Time Units' */, 'subtitle':this.format_power_figure(this.state.time_units), 'barwidth':this.calculate_bar_width(this.state.time_units), 'number':this.format_account_balance_figure(this.state.time_units), 'barcolor':'', 'relativepower':this.get_time_units_time(), })}
                </div>

                <NumberPicker font={this.props.app_state.font} number_limit={bigInt('1e36')} when_number_picker_value_changed={this.when_time_units_set.bind(this)} theme={this.props.theme} power_limit={10}/>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['868']/* 'Total Debit Amount' */, 'details':this.props.app_state.loc['869']/* 'The amount youll pay for the subscription payment is shown below' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_buy_token_uis(this.state.subscription_item['data'][2], this.state.subscription_item['data'][3], this.state.subscription_item['data'][4])}
                <div style={{height:10}}/>

                {this.render_my_balances()}

                {this.render_detail_item('0')}
                {this.render_detail_item('0')}
            </div>
        )
    }

    render_my_balances(){
        var entry_tokens = this.state.subscription_item['data'][2]
        var buy_amount_balances = []
        var entry_amount_depths = this.state.subscription_item['data'][4]

        if(entry_tokens != null && entry_tokens.length != 0){
            for(var i=0; i<entry_tokens.length; i++){
                var token_id = entry_tokens[i]
                var token_balance = this.props.app_state.created_token_object_mapping[this.state.subscription_item['e5']][token_id]
                token_balance = token_balance == null ? 0 : token_balance['balance']
                buy_amount_balances.push(token_balance)
            }
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['870']/* 'The amounts you have available for paying the subscription' */, 'title':this.props.app_state.loc['871']/* 'Your balances' */})}
                    <div style={{height:10}}/>

                    {this.render_buy_token_uis2(entry_tokens, buy_amount_balances, entry_amount_depths)}
                </div>
            )
        }
    }

    render_buy_token_uis2(buy_tokens, buy_amounts, buy_depths){
        var bt = [].concat(buy_tokens)
        var e5 = this.state.subscription_item['e5']
        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px', 'list-style':'none'}}>
                    {bt.map((item, index) => (
                        <li style={{'padding': '1px'}}>
                            {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'subtitle':this.format_power_figure(buy_amounts[index]), 'barwidth':this.calculate_bar_width(buy_amounts[index]), 'number':this.format_account_balance_figure(buy_amounts[index]), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                        </li>
                    ))}
                </ul>
            </div>
            
        )
    }

    render_minimum_buy_amount(){
        var subscription_config = this.state.subscription_item['data'][1]
        if(subscription_config[1] != 0){
            return(
                <div>
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['873']/* 'Minimum Buy Amount' */, 'subtitle':this.format_power_figure(subscription_config[1]), 'barwidth':this.get_number_width(subscription_config[1]), 'number':`${this.format_account_balance_figure(subscription_config[1])}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['874']/* 'time-units' */, })}
                    </div>
                </div>
            )
        }
    }

    render_maximum_buy_amount(){
        var subscription_config = this.state.subscription_item['data'][1]
        if(subscription_config[3] != 0){
            return(
                <div>
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['875']/* 'Maximum Buy Amount' */, 'subtitle':this.format_power_figure(subscription_config[3]), 'barwidth':this.get_number_width(subscription_config[3]), 'number':`${this.format_account_balance_figure(subscription_config[3])}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['874']/* 'time-units' */, })}
                    </div>
                </div>
            )
        }
    }

    get_time_units_time(){
        var subscription_config = this.state.subscription_item['data'][1]
        var time_unit = subscription_config[5] == 0 ? 60*53 : subscription_config[5]
        var final_time = bigInt(time_unit).multiply(this.state.time_units)
        return this.get_time_diff(final_time)
    }

    when_time_units_set(number){
        this.setState({time_units: number})
    }


    render_buy_token_uis(buy_tokens, buy_amounts, buy_depths){
        var bt = [].concat(buy_tokens)
        var e5 = this.state.subscription_item['e5']
        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                    {bt.map((item, index) => (
                        <li style={{'padding': '1px'}}>
                            {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'subtitle':this.format_power_figure(buy_amounts[index]), 'barwidth':this.calculate_bar_width(this.calculate_final_amount(buy_amounts[index])), 'number':this.format_account_balance_figure(this.calculate_final_amount(buy_amounts[index])), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
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

    calculate_final_amount(price){
        return bigInt(price).multiply(this.state.time_units)
    }



    set_subscription(subscription_item){
        if(this.state.subscription_item['id'] != subscription_item['id']){
            this.setState({
                selected: 0,id:makeid(8), type:this.props.app_state.loc['862']/* 'pay-subscription' */, entered_indexing_tags:[this.props.app_state.loc['863']/* 'pay' */,this.props.app_state.loc['864']/* 'subscription' */],
                subscription_item:{'data':[[],[0,0,0,0,0,0,0], [],[],[]]}, pay_subscription_title_tags_object:this.get_pay_subscription_title_tags_object(), time_units:0
            })
        }
        this.setState({subscription_item: subscription_item, e5: subscription_item['e5']})
    }

    finish(){
        var time_units_picked = this.state.time_units
        var minimum_amount = this.state.subscription_item['data'][1][1]
        var maximum_amount = this.state.subscription_item['data'][1][3]
        if(time_units_picked == 0){
            this.props.notify(this.props.app_state.loc['876']/* 'Set a valid time unit amount.' */, 3700)
        }
        else if(time_units_picked < minimum_amount){
            this.props.notify(this.props.app_state.loc['877']/* 'The amount youve set is less than the minimum requirement.' */, 3200)
        }
        else if(time_units_picked > maximum_amount){
            this.props.notify(this.props.app_state.loc['878']/* 'The amount youve set exceeds the maximum that you can pay for.' */, 3400)
        }
        else if(!this.can_sender_pay_for_subscription()){
            this.props.notify(this.props.app_state.loc['879']/* 'Your token balance is insufficient for that time unit purchase.' */, 4500)
        }
        else{
            this.props.add_pay_subscription_to_stack(this.state)
            this.props.notify(this.props.app_state.loc['18']/* 'transaction added to stack' */, 1700);
        }
    }



    can_sender_pay_for_subscription(){
        var can_pay = true;
        var entry_tokens = this.state.subscription_item['data'][2]
        var entry_fees = this.state.subscription_item['data'][3]

        for(var i=0; i<entry_tokens.length; i++){
            var token_id = entry_tokens[i]
            var token_balance = this.props.app_state.created_token_object_mapping[this.state.subscription_item['e5']][token_id]['balance']
            var final_amount = this.calculate_final_amount(entry_fees[i])

            if(token_balance < final_amount){
                can_pay = false
            }
        }

        return can_pay;
            
    }




    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
            </div>
        )

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




export default PaySubscriptionPage;