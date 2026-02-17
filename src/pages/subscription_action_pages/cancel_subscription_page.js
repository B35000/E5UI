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

class CancelSubscriptionPage extends Component {
    
    state = {
        selected: 0,id:makeid(8), type:this.props.app_state.loc['821']/* 'cancel-subscription' */, entered_indexing_tags:[this.props.app_state.loc['822']/* 'cancel' */, this.props.app_state.loc['823']/* 'subscription' */],
        subscription_item:{'data':[[],[0,0,0,0,0,0,0], [],[],[]], 'payment':0}, cancel_subscription_title_tags_object:this.get_cancel_subscription_title_tags_object(), time_units:0
    };

    get_cancel_subscription_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['821']/* 'cancel-subscription' */], [1]
            ],
        };
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>

                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.cancel_subscription_title_tags_object} tag_size={'l'} when_tags_updated={this.when_cancel_subscription_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img className="text-end" onClick={()=>this.finish()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div>

                <div style={{'margin':'10px 0px 0px 0px'}}>
                    {this.render_everything()}   
                </div>

            </div>
        )
    }

    when_cancel_subscription_title_tags_object_updated(tag_obj){
        this.setState({cancel_subscription_title_tags_object: tag_obj})
    }

    render_everything(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_time_unit_picker()}
                    {this.render_detail_item('0')}
                    {this.render_cancel_credit_part()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_time_unit_picker()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_cancel_credit_part()}
                        <div style={{height: 10}}/>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_time_unit_picker()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_cancel_credit_part()}
                        <div style={{height: 10}}/>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_time_unit_picker(){
        var subscription_config = this.state.subscription_item['data'][1]
        var time_unit = subscription_config[5] == 0 ? 60*53 : subscription_config[5]
        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'13px', 'text':this.props.app_state.loc['824']/* 'Cancel the subscription ID: ' */+this.state.subscription_item['id']})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.get_time_diff(time_unit), 'details':this.props.app_state.loc['828c']/* 'Time Unit' */, 'size':'l'})}

                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':this.get_time_diff(this.state.subscription_item['payment']), 'details':this.props.app_state.loc['825']/* 'Remaining Subscription Time' */, 'size':'l'})}

                <div style={{height: 10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['828g']/* 'Remaining Time Units.' */, 'number':this.get_remaining_time_units(), 'relativepower':this.props.app_state.loc['828h']/* 'Units.' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['828g']/* 'Remaining Time Units.' */, 'subtitle':this.format_power_figure(this.get_remaining_time_units()), 'barwidth':this.calculate_bar_width(this.get_remaining_time_units()), 'number':this.format_account_balance_figure(this.get_remaining_time_units()), 'barcolor':'', 'relativepower':this.props.app_state.loc['828h']/* 'Units.' */, })}
                </div>

                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':number_with_commas(subscription_config[4])+this.props.app_state.loc['828e']/* ' Time Units.' */, 'details':this.props.app_state.loc['828d']/* 'Minimum Cancellable Balance Amount.' */, 'size':'l'})}

                {this.render_detail_item('0')}

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['826']/* 'Time Units To Cancel' */, 'number':this.state.time_units, 'relativepower':this.get_time_units_time()})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['826']/* 'Time Units To Cancel' */, 'subtitle':this.format_power_figure(this.state.time_units), 'barwidth':this.calculate_bar_width(this.state.time_units), 'number':this.format_account_balance_figure(this.state.time_units), 'barcolor':'', 'relativepower':this.get_time_units_time(), })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e36')} when_number_picker_value_changed={this.when_time_units_set.bind(this)} theme={this.props.theme} power_limit={27}/>

            </div>
        )
    }

    get_remaining_time_units(){
        var subscription_config = this.state.subscription_item['data'][1]
        var time_unit = subscription_config[5] == 0 ? 60*53 : subscription_config[5]
        var current_time_unit_balance = bigInt(this.state.subscription_item['payment']).divide(bigInt(time_unit))
        return current_time_unit_balance
    }

    render_cancel_credit_part(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['828a']/* 'Credit Amounts.' */, 'details':this.props.app_state.loc['828b']/* 'Heres everything youll be getting for your cancellation.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                {this.render_buy_token_uis(this.state.subscription_item['data'][2], this.state.subscription_item['data'][3], this.state.subscription_item['data'][4])}
            </div>
        )
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
                        <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'number':buy_amounts[index], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
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
                selected: 0,id:makeid(8), type:this.props.app_state.loc['821']/* 'cancel-subscription' */, entered_indexing_tags:[this.props.app_state.loc['822']/* 'cancel' */, this.props.app_state.loc['823']/* 'subscription' */],
                subscription_item:{'data':[[],[0,0,0,0,0,0,0], [],[],[]], 'payment':0}, cancel_subscription_title_tags_object:this.get_cancel_subscription_title_tags_object(), time_units:0
            })
        }
        this.setState({subscription_item: subscription_item, e5: subscription_item['e5']})
    }

    finish(){
        var time_units_picked = this.state.time_units
        if(time_units_picked == 0){
            this.props.notify(this.props.app_state.loc['828']/* 'set a valid time unit amount!' */, 3700)
        }
        else if(!this.is_minimum_cancellable_amount_left()){
            this.props.notify(this.props.app_state.loc['828f']/* 'You cant cancel that much. Theres a minimum number of time units thats supposed to remain.' */, 7700)
        }
        else{
            this.props.add_cancel_subscription_to_stack(this.state)
            this.props.notify(this.props.app_state.loc['18']/* 'transaction added to stack' */, 1700);
        }
    }

    is_minimum_cancellable_amount_left(){
        var time_units_picked = this.state.time_units
        var subscription_config = this.state.subscription_item['data'][1]
        var minimum_cancellable_balance_amount = subscription_config[4]
        if(bigInt(minimum_cancellable_balance_amount).greater(bigInt(time_units_picked))){
            return false
        }
        return true
    }


    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
            </div>
        )

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
                                    <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
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



}




export default CancelSubscriptionPage;