import React, { Component } from 'react';
import ViewGroups from '../../components/view_groups'
import Tags from '../../components/tags';
import DurationPicker from '../../components/duration_picker';
import { red } from '@mui/material/colors';

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

class PayUpcomingSubscriptions extends Component {
    
    state = {
        selected: 0, id: makeid(8),type:this.props.app_state.loc['2896']/* 'upcoming-subscriptions' */,
        upcoming_subs:null,
        entered_indexing_tags:[this.props.app_state.loc['863']/* 'pay' */, this.props.app_state.loc['864']/* 'subscription' */],
        get_pay_upcoming_subscription_title_tags_object:this.get_pay_upcoming_subscription_title_tags_object(),
        time_amount:0,
        selected_subscriptions:[]
    };

    get_pay_upcoming_subscription_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['2896']/* 'upcoming-subscription' */], [0]
            ],
        };
    }

    set_data(data){
        var e5 = this.props.app_state.selected_e5
        this.setState({upcoming_subs: data, e5: e5})
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.get_pay_upcoming_subscription_title_tags_object} tag_size={'l'} when_tags_updated={this.when_get_pay_upcoming_subscription_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img alt="" className="text-end" onClick={()=>this.finish()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div>

                {this.render_everything()}
            </div>
        )
    }


    when_get_pay_upcoming_subscription_title_tags_object_updated(tag_obj){
        this.setState({get_pay_upcoming_subscription_title_tags_object: tag_obj})
    }


    render_everything(){
        var size = this.props.app_state.size
        if(this.state.upcoming_subs == null) return;
        if(size == 's'){
            return(
                <div>
                    {this.render_data_or_upcoming_subs_ui()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_data_part()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_upcoming_subscriptions()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_data_part()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_upcoming_subscriptions()}
                    </div>
                </div>
                
            )
        }
    }





    render_data_or_upcoming_subs_ui(){
        var selected_option_name = this.get_selected_item(this.state.get_pay_upcoming_subscription_title_tags_object, this.state.get_pay_upcoming_subscription_title_tags_object['i'].active)

        if(selected_option_name == 'e'){
            this.render_data_part()
        }
        else if(selected_option_name == this.props.app_state.loc['2896']/* 'upcoming-subscription' */){
            this.render_upcoming_subscriptions()
        }
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }






    render_data_part(){
        var upcoming_subs = this.state.upcoming_subs
        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'13px', 'text':upcoming_subs.length+ this.props.app_state.loc['2897']/* ' upcoming subscriptions.' */})}
                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2898']/* 'Total Subscription Payment Amounts.' */, 'details':this.props.app_state.loc['2899']/* 'Here\'s the total amount of money you\'ll be paying for the subscriptions.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                {this.render_total_payments()}

                <div style={{height:20}}/>

                {this.render_detail_item('3', {'title':this.get_time_diff(this.state.time_amount), 'details':this.props.app_state.loc['2900']/* 'Your set time.' */, 'size':'l'})}

                <DurationPicker font={this.props.app_state.font} when_number_picker_value_changed={this.when_time_amount_time_set.bind(this)} theme={this.props.theme} loc={this.props.app_state.loc}/>
            </div>
        )
    }

    when_time_amount_time_set(amount){
        this.setState({time_amount: amount})
    }


    render_total_payments(){
        var data = this.get_total_payment_amounts()
        var exchanges_used = [].concat(data.exchanges_used)
        var exchange_amounts = data.exchange_amounts
        var e5 = this.state.e5

        if(exchanges_used.length == 0){
            return(
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                    {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+5], 'subtitle':this.format_power_figure(0), 'barwidth':this.calculate_bar_width((0)), 'number':this.format_account_balance_figure((0)), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[5]})}
                </div>
            )
        }

        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                    {exchanges_used.map((item, index) => (
                        <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'number':exchange_amounts[item], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                            {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'subtitle':this.format_power_figure(exchange_amounts[item]), 'barwidth':this.calculate_bar_width((exchange_amounts[item])), 'number':this.format_account_balance_figure((exchange_amounts[item])), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                        </li>
                    ))}
                </ul>
            </div>  
        )
    }

    get_total_payment_amounts(){
        var upcoming_subs = this.get_selected_subscriptions(this.state.upcoming_subs)
        var exchanges_used = []
        var exchange_amounts = {}
        var time_units_to_pay_array = []
        var subscriptions = []
        upcoming_subs.forEach(subscription_obj => {
            var time_units_to_pay = this.get_time_unit(subscription_obj)
            if(time_units_to_pay != 0){
                subscriptions.push(subscription_obj['id'])
                time_units_to_pay_array.push(time_units_to_pay)
                
                var exchanges = subscription_obj['data'][2]
                var amounts = subscription_obj['data'][3]
                for(var i=0; i<exchanges.length; i++){
                    var exchange_id = exchanges[i]
                    var amount = bigInt(amounts[i]).multiply(time_units_to_pay)
                    if(exchange_amounts[exchange_id] == null){
                        exchange_amounts[exchange_id] = bigInt(0)
                        exchanges_used.push(exchange_id)
                    }
                    exchange_amounts[exchange_id] = bigInt(exchange_amounts[exchange_id]).plus(amount)
                }
            }
        });

        // console.log('pay_upcoming', time_units_to_pay_array, exchange_amounts)

        return {exchanges_used: exchanges_used, exchange_amounts: exchange_amounts, time_units_to_pay: time_units_to_pay_array, subscriptions: subscriptions}
    }

    get_time_unit(subscription_obj){
        var subscription_config = subscription_obj['data'][1]
        var time_unit = subscription_config[5/* time_unit */] == 0 ? 60*53 : subscription_config[5/* time_unit */]
        var time_units_to_pay = bigInt(this.state.time_amount).divide(time_unit)
        if(subscription_config[1/* minimum_buy_amount */] != 0){
            if(time_units_to_pay < subscription_config[1/* minimum_buy_amount */]){
                time_units_to_pay = subscription_config[1/* minimum_buy_amount */]
            }
        }
        // if(subscription_config[3/* maximum_buy_amount */] != 0){
        //     if(time_units_to_pay > subscription_config[3/* maximum_buy_amount */]){
        //         time_units_to_pay = subscription_config[3/* maximum_buy_amount */]
        //     }
        // }
        var t = time_units_to_pay
        return t
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

    get_selected_subscriptions(upcoming_subs){
        var selected_subs = []
        for(var i=0; i<upcoming_subs.length; i++){
            if(!this.state.selected_subscriptions.includes(i)){
                selected_subs.push(upcoming_subs[i])
            }
        }
        return selected_subs
    }







    render_upcoming_subscriptions(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height - 250
        var items = this.state.upcoming_subs
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
        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'13px', 'text': this.props.app_state.loc['2905']/* 'Your upcoming subscriptions. Select a subscription to ignore it in the transaction.' */})}
                <div style={{height: 10}}/>

                <div style={{overflow: 'auto',maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                {this.render_subscription_object(item, index)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
        );
    }

    render_subscription_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_subscription_item(object)
        var alpha = this.state.selected_subscriptions.includes(index) ? 0.3 : 1.0
        return(
            <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color, 'opacity':alpha}}>
                <div style={{'padding': '0px 0px 0px 5px'}} onClick={() => this.when_subscription_item_clicked(index, object)}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}} >
                        {this.render_detail_item('2', item['age'])}
                    </div>
                </div>        
            </div>
        )
    }

    format_subscription_item(object){
        var tags = object['ipfs'] == null ? ['Subscription'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Subscription ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var time = object['event'] == null ? 0 : object['event'].returnValues.p4
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':object['e5']+' • '+object['id'], 'details':title, 'size':'l', 'image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    when_subscription_item_clicked(index, object){
        var clone = this.state.selected_subscriptions.slice()
        if(clone.includes(index)){
            const index_of_item = clone.indexOf(index);
            clone.splice(index_of_item, 1);
        }else{
            clone.push(index)
        }
        this.setState({selected_subscriptions: clone})
    }





    finish(){
        var time_amount = this.state.time_amount
        var upcoming_subs = this.get_selected_subscriptions(this.state.upcoming_subs)

        var data = this.get_total_payment_amounts()
        var exchanges_used = [].concat(data.exchanges_used)
        var exchange_amounts = data.exchange_amounts
        var time_units_to_pay = data.time_units_to_pay
        var subscriptions = data.subscriptions

        if(time_amount == 0){
            this.props.notify(this.props.app_state.loc['2901']/* 'Please set a valid time.' */, 3700)
        }
        else if(!this.check_if_sender_can_afford_payments(data)){
            this.props.notify(this.props.app_state.loc['2902']/* 'You dont have enough money to fulfil those subscription payments.' */, 4500)
        }
        else if(upcoming_subs.length == 0){
            this.props.notify(this.props.app_state.loc['2904']/* 'You can\'t target no subscriptions.' */, 4500)
        }
        else{
            this.setState({exchanges_used: exchanges_used, exchange_amounts: exchange_amounts, time_units_to_pay: time_units_to_pay, subscriptions: subscriptions})
            
            var me = this;
            setTimeout(function() {
                me.props.add_pay_upcoming_subscriptions_to_stack(me.state)
        
                me.setState({ id: makeid(8), entered_indexing_tags:[me.props.app_state.loc['863']/* 'pay' */, me.props.app_state.loc['864']/* 'subscription' */],get_pay_upcoming_subscription_title_tags_object:me.get_pay_upcoming_subscription_title_tags_object(), time_amount:0, selected_subscriptions:[]})
            }, (1 * 1000));

            this.props.notify(this.props.app_state.loc['18'], 1700);
        }
    }

    check_if_sender_can_afford_payments(data){
        var exchanges_used = [].concat(data.exchanges_used)
        var exchange_amounts = data.exchange_amounts
        var e5 = this.state.e5

        var can_pay = true;
        for(var i=0; i<exchanges_used.length; i++){
            var token_id = exchanges_used[i]
            var token_balance = this.props.app_state.created_token_object_mapping[e5][token_id]['balance'];
            var final_amount = exchange_amounts[token_id]

            if(token_balance < final_amount){
                can_pay = false
            }
        }
        return can_pay
    }









    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
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




export default PayUpcomingSubscriptions;