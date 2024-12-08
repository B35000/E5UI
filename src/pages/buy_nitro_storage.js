import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import NumberPicker from './../components/number_picker';

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

class BuyNitroPage extends Component {
    
    state = {
        selected: 0, nitro_object:null, id: makeid(8), type:this.props.app_state.loc['3031']/* 'buy-storage' */, get_buy_storage_title_tags_object:this.get_buy_storage_title_tags_object(), entered_indexing_tags:[this.props.app_state.loc['2963']/* 'buy' */, this.props.app_state.loc['3032']/* 'nitro' */,this.props.app_state.loc['3033']/* 'storage' */],
        amount:0
    };


    get_buy_storage_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['3031']/* 'buy-storage' */], [1]
            ],
        };
    }



    set_data(object){
        this.setState({nitro_object: object, e5: object['e5']})
    }


    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.get_buy_storage_title_tags_object} tag_size={'l'} when_tags_updated={this.when_get_buy_storage_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
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


    when_get_buy_storage_title_tags_object_updated(tag_obj){
        this.setState({get_buy_storage_title_tags_object: tag_obj})
    }



    render_everything(){
        var size = this.props.app_state.size
        if(this.state.nitro_object == null) return;
        if(size == 's'){
            return(
                <div>
                    {this.render_title_and_storage_amount()}
                    {this.render_detail_item('0')}
                    {this.render_payment_amounts()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_title_and_storage_amount()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_payment_amounts()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_title_and_storage_amount()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_payment_amounts()}
                    </div>
                </div>
                
            )
        }
    }

    render_title_and_storage_amount(){
        var object = this.state.nitro_object
        var node_details = this.props.app_state.nitro_node_details[object['e5_id']]
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['3034']/* 'Set the amount of space you wish to buy in the node.' */})}
                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['c2527o']/* 'Storage Purchase Limit.' */, 'subtitle':this.format_power_figure(node_details['max_buyable_capacity']), 'barwidth':this.get_number_width(node_details['max_buyable_capacity']), 'number':`${number_with_commas(node_details['max_buyable_capacity'])}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['c2527p']/* Mbs */, })}
                </div>
                <div style={{height:20}}/>
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['3035']/* 'Selected Space.' */, 'subtitle':this.format_power_figure(this.state.amount), 'barwidth':this.get_number_width(this.state.amount), 'number':`${this.format_account_balance_figure(this.state.amount)}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['c2527p']/* Mbs */, })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt(this.get_number_limit())} when_number_picker_value_changed={this.when_amount_set.bind(this)} theme={this.props.theme} power_limit={63}/>

                <div style={{'padding': '5px'}} onClick={()=>this.set_max()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3036']/* 'Set Maximum' */, 'action':''})}
                </div>
            </div>
        )
    }

    get_number_limit(){
        var object = this.state.nitro_object
        var node_details = this.props.app_state.nitro_node_details[object['e5_id']]
        var max_buyable_capacity = node_details['max_buyable_capacity']
        return max_buyable_capacity
    }

    set_max(){
        var object = this.state.nitro_object
        var node_details = this.props.app_state.nitro_node_details[object['e5_id']]
        var max_buyable_capacity = node_details['max_buyable_capacity']
        this.setState({amount: max_buyable_capacity})
    }

    when_amount_set(amount){
        this.setState({amount: amount})
    }

    render_payment_amounts(){
        var object = this.state.nitro_object
        var node_details = this.props.app_state.nitro_node_details[object['e5_id']]
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['3037']/* 'Final Fees.' */, 'details':this.props.app_state.loc['3038']/* 'The final price of the storage amounts you wish to purchase is shown.' */})}
                <div style={{height:10}}/>

                {this.render_price_amounts(node_details['price_per_megabyte'], node_details['target_account_e5'])}
            </div>
        )
    }

    render_price_amounts(price_data, e5){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        var items = [].concat(price_data)
        return(
            <div style={{}}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style-type': 'none'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '3px 0px 3px 0px'}}>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item['exchange']], 'number':this.get_amount(item['amount']), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['exchange']]})}>
                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item['exchange']], 'subtitle':this.format_power_figure(this.get_amount(item['amount'])), 'barwidth':this.calculate_bar_width(this.get_amount(item['amount'])), 'number':this.format_account_balance_figure(this.get_amount(item['amount'])), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['exchange']], })}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_amount(price){
        var object = this.state.nitro_object
        var node_details = this.props.app_state.nitro_node_details[object['e5_id']]
        var max_buyable_capacity = node_details['max_buyable_capacity']
        var selected_amount = this.state.amount > max_buyable_capacity ? max_buyable_capacity : this.state.amount

        return bigInt(selected_amount).multiply(price)
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
        return this.sortByAttributeDescending(all_objects, 'timestamp')
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





    finish(){
        var selected_storage = this.state.amount

        if(selected_storage == 0){
            this.props.notify(this.props.app_state.loc['3039']/* 'Please set an amount of storage to purchase.' */, 6500)
        }
        else if(!this.check_if_sender_can_afford_payments()){
            this.props.notify(this.props.app_state.loc['2970']/* 'You don\'t have enough money to fulfil this purchase.' */, 4500)
        }else{
            var object = this.state.nitro_object
            var node_details = this.props.app_state.nitro_node_details[object['e5_id']]
            var amounts_to_transfer = this.get_final_amounts(node_details['price_per_megabyte'])
            
            this.setState({amounts_to_transfer: amounts_to_transfer})

            var me = this;
            setTimeout(function() {
                me.props.add_buy_nitro_storage_to_stack(me.state)
        
                me.setState({ 
                    selected: 0, id: makeid(8), type:me.props.app_state.loc['3031']/* 'buy-storage' */, get_buy_storage_title_tags_object:me.get_buy_storage_title_tags_object(), entered_indexing_tags:[me.props.app_state.loc['2963']/* 'buy' */, me.props.app_state.loc['3032']/* 'nitro' */,me.props.app_state.loc['3033']/* 'storage' */], amount:0
                })
            }, (1 * 1000));

            this.props.notify(this.props.app_state.loc['18'], 1700);
        }
    }

    check_if_sender_can_afford_payments(){
        var object = this.state.nitro_object
        var node_details = this.props.app_state.nitro_node_details[object['e5_id']]
        var amounts_to_transfer = this.get_final_amounts(node_details['price_per_megabyte'])
        var e5 = this.state.e5

        var can_pay = true;
        for(var i=0; i<amounts_to_transfer.length; i++){
            var token_id = amounts_to_transfer[i]['exchange']
            var token_balance = this.props.calculate_actual_balance(e5, token_id)
            var final_amount = amounts_to_transfer[i]['amount']

            if(bigInt(token_balance).lesser(final_amount)){
                can_pay = false
            }
        }
        return can_pay
    }

    get_final_amounts(price_data){
        var data = []
        price_data.forEach(item => {
            var exchange = item['exchange']
            var amount = item['amount']
            var final_amount = this.get_amount(amount)
            data.push({'exchange':exchange, 'amount':final_amount})
        });
        return data
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
                                    <img src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
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
        if(item_id == '8' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12')uploaded_data = this.props.app_state.uploaded_data
        return(
            <div>
                <ViewGroups uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
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




export default BuyNitroPage;