import React, { Component } from 'react';
import ViewGroups from '../../components/view_groups'
import Tags from '../../components/tags';
import NumberPicker from '../../components/number_picker';

import Letter from '../../assets/letter.png';

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

class CollectSubscriptionPage extends Component {
    
    state = {
        selected: 0, id:makeid(8),type:'collect-subscription', entered_indexing_tags:['collect', 'subscription', 'payments'],
        subscription_item:{'data':[[],[0,0,0,0,0,0,0], [],[],[]], 'paid_accounts':[], 'paid_amounts':[]}, collect_subscription_title_tags_object:this.get_collect_subscription_title_tags_object()
    };

    get_collect_subscription_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','collect-subscription'], [1]
            ],
        };
    }

    render(){
        return(
            <div style={{'padding':'10px 20px 0px 10px'}}>

                <div className="row">
                    <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                        <Tags page_tags_object={this.state.collect_subscription_title_tags_object} tag_size={'l'} when_tags_updated={this.when_collect_subscription_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'padding': '5px'}} onClick={()=>this.finish()}>
                            {this.render_detail_item('5', {'text':'Finish', 'action':''})}
                        </div>
                    </div>
                </div>

                {this.render_everything()}

            </div>
        )
    }

    when_collect_subscription_title_tags_object_updated(tag_obj){
        this.setState({collect_subscription_title_tags_object: tag_obj})
    }


    render_everything(){
        return(
            <div>
                {this.render_detail_item('4', {'font':'Sans-serif', 'textsize':'13px', 'text':'Collect token payments for the subscription ID: '+this.state.subscription_item['id']})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':''+this.get_time_diff(this.get_total_subscription_collectible_time()), 'details':'Total Collectible Time', 'size':'s'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':''+this.get_total_subscription_collectible_timeunits(), 'details':'Total Collectible Time Units', 'size':'s'})}
                <div style={{height: 10}}/>

                {this.render_buy_token_uis(this.state.subscription_item['data'][2], this.state.subscription_item['data'][3], this.state.subscription_item['data'][4])}

                {this.render_detail_item('0')}

                {this.render_paid_subscriptions()}
            </div>
        )
    }

    get_total_subscription_collectible_time(){
        var paid_amount_items = this.state.subscription_item['paid_amounts']
        var total_time = 0;
        for(var i=0; i<paid_amount_items.length; i++){
            total_time += paid_amount_items[i]
        }
        return total_time;
    }

    get_total_subscription_collectible_timeunits(){
        var subscription_config = this.state.subscription_item['data'][1]
        var time_unit = subscription_config[5] == 0 ? 60*53 : subscription_config[5]

        return bigInt(this.get_total_subscription_collectible_time()).divide(bigInt(time_unit))
    }


    render_buy_token_uis(buy_tokens, buy_amounts, buy_depths){
        var bt = [].concat(buy_tokens)
        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                    {bt.map((item, index) => (
                        <li style={{'padding': '1px'}}>
                            {this.render_detail_item('2', {'style':'l','title':'Token ID: '+item, 'subtitle':'depth:'+buy_depths[index], 'barwidth':this.calculate_bar_width(this.calculate_final_amount(buy_amounts[index])), 'number':this.format_account_balance_figure(this.calculate_final_amount(buy_amounts[index])), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
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
        return bigInt(price).multiply(this.get_total_subscription_collectible_timeunits())
    }







    set_subscription(subscription_item){
        if(this.state.subscription_item['id'] != subscription_item['id']){
            this.setState({
                selected: 0, id:makeid(8),type:'collect-subscription', entered_indexing_tags:['collect', 'subscription', 'payments'],
                subscription_item:{'data':[[],[0,0,0,0,0,0,0], [],[],[]], 'paid_accounts':[], 'paid_amounts':[]}, collect_subscription_title_tags_object:this.get_collect_subscription_title_tags_object()
            })
        }
        this.setState({subscription_item: subscription_item, e5: subscription_item['e5']})
    }

    render_paid_subscriptions(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.subscription_item['paid_accounts'])
        var paid_amount_items = this.state.subscription_item['paid_amounts']

        if(items.length == 0){
            items = [0,3]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '3px'}} onClick={()=>console.log()}>
                                <div style={{height:50, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'0px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:20 ,width:'auto'}} />
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
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>this.when_transfer_action_value_clicked(item)}>
                                {this.render_detail_item('3', {'title':'Account ID: '+item, 'details':'Collectible time: '+this.get_time_diff(paid_amount_items[index]), 'size':'s'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    finish(){
        var time_units = this.get_total_subscription_collectible_timeunits()
        if(time_units == 0){
            this.props.notify('you cant collect no time units', 2700)
        }else{
            var clone = structuredClone(this.state)
            // clone.e5 = this.props.app_state.selected_e5
            this.props.add_collect_subscription_to_stack(clone)
            this.props.notify('transaction added to stack', 1700);
        }
    }





    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
            </div>
        )

    }

    format_power_figure(amount){
        var power = 'e72'
        if(amount < bigInt('1e9')){
            power = 'e9'
        }
        else if(amount < bigInt('1e18')){
            power = 'e18'
        }
        else if(amount < bigInt('1e36')){
            power = 'e36'
        }
        else{
            power = 'e72'
        }
        return power
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




export default CollectSubscriptionPage;