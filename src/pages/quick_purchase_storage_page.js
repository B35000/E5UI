// Copyright (c) 2023 - Present, Bry Onyoni
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
import NumberPicker from './../components/number_picker';
import TextInput from './../components/text_input';

import EndImg from './../assets/end_token_icon.png';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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

class QuickPurchaseStoragePage extends Component {
    
    state = {
        selected: 0, amount:0, nitro_object:null, cypher_passcode:''
    };


    set_data(object){
        const node_details = this.props.app_state.nitro_node_details[object['e5_id']]
        const e5_to_use = (node_details['target_storage_recipient_accounts'][this.props.app_state.selected_e5] == null ? object['e5'] : this.props.app_state.selected_e5)

        this.setState({nitro_object: object, e5: e5_to_use})
    }







    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                {this.render_everything()}
            </div>
        )
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
                    {this.render_detail_item('0')}
                    {this.render_gas_prices_to_use()}
                    {this.render_detail_item('0')}
                    {this.render_finish_button()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_title_and_storage_amount()}
                        {this.render_detail_item('0')}
                        {this.render_gas_prices_to_use()}
                        {this.render_detail_item('0')}
                        {this.render_finish_button()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
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
                        {this.render_detail_item('0')}
                        {this.render_gas_prices_to_use()}
                        {this.render_detail_item('0')}
                        {this.render_finish_button()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_payment_amounts()}
                        
                    </div>
                </div>
                
            )
        }
    }


    render_title_and_storage_amount(){
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['3034']/* 'Set the amount of space you wish to buy in the node.' */})}
                <div style={{height:10}}/>
                {this.render_nitro_item()}
                <div style={{height:10}}/>
                {this.render_storage_payment_amount_options()}
            </div>
        )
    }

    when_passcode_input_field_changed(text){
        if(this.props.app_state.locked_wallet_hashed_password != '') this.setState({cypher_passcode: text})
    }

    render_nitro_item(){
        var object = this.state.nitro_object
        const item = this.format_nitro_item(object)
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']

        // var default_image = EndImg
        // var image = object['ipfs'] == null ? default_image : (object['ipfs'].album_art == null ? default_image : object['ipfs'].album_art)
        // var title = object['e5']+' • '+object['id']
        // var details = object['ipfs'] == null ? 'Nitropost ID' : start_and_end(object['ipfs'].entered_title_text)

        // return(
        //     <div>
        //         {this.render_detail_item('12', {'title':title, 'image':image, 'details':details, 'size':'s', 'border_radius':'9px'})}
        //     </div>
        // )

        return(
            <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_detail_item('8', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}}>
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
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        var author = sender
        var default_image = EndImg
        var image = object['ipfs'] == null ? default_image : (object['ipfs'].album_art == null ? default_image : object['ipfs'].album_art)

        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':number_with_commas(object['id'])+' • '+author, 'details':title, 'size':'l', 'image':image, 'border_radius':'7px', 'image_width':'auto'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, 'number_when_tapped':`${new Date(time*1000).toLocaleDateString(undefined, { weekday: 'short' })} ${(new Date(time*1000).toLocaleString())}` }
        }
    }

    get_senders_name(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            const obj = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
            var alias = (obj[sender] == null ? sender : obj[sender])
            return alias
        }
    }

    render_storage_payment_amount_options(){
        const items = this.calculate_payment_unit_options()
        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_custom_time_unit_picked(item)}>
                            {this.render_detail_item('3', {'title': item.formatted_size['size']+' '+item.formatted_size['unit'], 'details':this.props.app_state.loc['3115']/* '$ Space-Units' */.replace('$', number_with_commas(item['units']))})}
                            {this.render_line_if_selected(item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    calculate_payment_unit_options(){
        const object = this.state.nitro_object
        var node_details = this.props.app_state.nitro_node_details[object['e5_id']]
        const space_unit_size = node_details['target_storage_space_unit_denomination_multiplier'] || 1
        const max_buyable_capacity = node_details['max_buyable_capacity']
        const proportions = [0.01, 0.03, 0.05, 0.1, 0.23, 0.35, 0.53, 0.65, 0.72, 0.99]
        const final_amounts = []
        proportions.forEach(proportion => {
            const size_in_mbs = (Math.floor(proportion * max_buyable_capacity)) * space_unit_size
            const size_in_bytes = parseInt(size_in_mbs * (1024 * 1024))
            final_amounts.push({
                amount: size_in_mbs,
                units: (Math.floor(proportion * max_buyable_capacity)),
                formatted_size: this.format_data_size(size_in_bytes)
            })
        });

        return final_amounts.filter((size_obj) => {
            return size_obj.units > 1.0
        });
    }

    when_custom_time_unit_picked(item){
        this.setState({selected_space_unit_item: item})
    }

    render_line_if_selected(item){
        if(this.state.selected_space_unit_item != null && this.state.selected_space_unit_item['units'] == item['units']){
            return(
                <div>
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }
    }

    



    render_payment_amounts(){
        var object = this.state.nitro_object
        var node_details = this.props.app_state.nitro_node_details[object['e5_id']]
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['3037']/* 'Final Fees.' */, 'details':this.props.app_state.loc['3038']/* 'The final price of the storage amounts you wish to purchase is shown.' */})}
                <div style={{height:10}}/>

                {this.render_price_amounts(node_details['price_per_megabyte'][this.state.e5], this.state.e5)}
            </div>
        )
    }

    render_price_amounts(price_data, e5){
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
        const amount = this.state.selected_space_unit_item?.['units'] || 0
        var selected_amount = amount > max_buyable_capacity ? max_buyable_capacity : amount

        return bigInt(selected_amount).multiply(price)
    }




    render_gas_prices_to_use(){
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3055qs']/* 'You may optionally set the gas price, or how quickly your transfers are to be validated. Slow is the default used.' */, 'title':this.props.app_state.loc['3055qr']/* 'Select Gas Price.' */})}
                <div style={{height:10}}/>

                {this.render_gas_price_options()}
                <div style={{height:10}}/>
            </div>
        )
    }

    get_gas_price_from_runs(e5){
        var last_events = this.props.app_state.all_E5_runs[e5['id']]
        var sum = 0
        if(last_events != null){
            var last_check = last_events.length < 50 ? last_events.length : 50
            for(var i=0; i<last_check; i++){
                sum += last_events[i].returnValues.p7
            }
            sum = sum/last_check;
        }
        return sum
    }

    render_gas_price_options(){
        const items = this.get_gas_price_items()
        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_custom_price_picked(item)}>
                            {this.render_detail_item('3', {'title':item['title'], 'details':this.round_off(item['price']/10**9)+' gwei', 'size':'s'})}
                            {this.render_line_if_selected2(item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    round_off(float_number){
        return (Math.round(float_number * 100) / 100)
    }

    get_gas_price_items(){
        var e5 = this.state.e5
        var gas_price = this.props.app_state.gas_price[e5]
        if(gas_price == null){
            gas_price = this.get_gas_price_from_runs()
        }

        if(gas_price == null || isNaN(gas_price)) return [];
        
        var items = [
            {'title':this.props.app_state.loc['3115h']/* 'sluggish' */, 'price':Math.round(0.75 * gas_price)},
            {'title':this.props.app_state.loc['1593cg']/* 'slow' */, 'price':Math.round(1.2 * gas_price)},
            {'title':this.props.app_state.loc['1593ch']/* 'average' */, 'price':Math.round(1.7 * gas_price)},
            {'title':this.props.app_state.loc['1593ci']/* 'fast' */, 'price':Math.round(2.6 * gas_price)},
            {'title':this.props.app_state.loc['1593cj']/* 'asap' */, 'price':Math.round(4.1 * gas_price)},
        ]

        if(this.props.app_state.e5s[e5].type == '1559'){
            items = [
                {'title':this.props.app_state.loc['3115h']/* 'sluggish' */, 'price':Math.round(0.75 * gas_price), 'max_priority_fee':1_100_000_000 },
                {'title':this.props.app_state.loc['1593cg']/* 'slow' */, 'price':Math.round(1.2 * gas_price), 'max_priority_fee':2_000_000_000 },
                {'title':this.props.app_state.loc['1593ch']/* 'average' */, 'price':Math.round(1.8 * gas_price), 'max_priority_fee':3_000_000_000},
                {'title':this.props.app_state.loc['1593ci']/* 'fast' */, 'price':Math.round(2.9 * gas_price), 'max_priority_fee':4_000_000_000},
                {'title':this.props.app_state.loc['1593cj']/* 'asap' */, 'price':Math.round(4.6 * gas_price), 'max_priority_fee':5_000_000_000},
            ]
        }

        return items;
    }

    render_line_if_selected2(item){
        if(this.state.custom_quick_transfer_price != null && this.state.custom_quick_transfer_price['title'] == item['title']){
            return(
                <div>
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }
    }

    when_custom_price_picked(item){
        this.setState({custom_quick_transfer_price: item})
    }




    render_finish_button(){
        return(
            <div>
                {this.props.app_state.locked_wallet_hashed_password != '' && (
                    <div>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['2954m']/* 'Wallet Password.' */, 'details':this.props.app_state.loc['2954n']/* 'If you locked your wallet, set the password used here.' */, 'size':'l'})}
                        <div style={{height: 10}}/>

                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3055nm']/* 'Passcode...' */} when_text_input_field_changed={this.when_passcode_input_field_changed.bind(this)} text={this.state.cypher_passcode} theme={this.props.theme} adjust_height={false} type={'password'} />
                        {this.render_detail_item('0')}
                    </div>
                )}

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3115c']/* 'Confirm all the details first before beginning the storage purchase.' */, 'title':this.props.app_state.loc['3115b']/* 'Begin Storage Purchase.' */})}
                {this.render_detail_item('10', {'text':this.props.app_state.loc['3115g']/* 'The storage purchase will need a few minutes to be verified by the indexer before file uploads.' */, 'textsize':'12px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                {this.props.app_state.is_confirming_storage_purchase == true ? (
                    <div onClick={() => this.forget_quick_run()}>
                        {this.render_small_skeleton_object()}

                        {this.props.app_state.quick_purchase_waiting_for_indexer_confirmation == true ? this.render_detail_item('10', {'text':this.props.app_state.loc['3115j']/* 'The run was successful. Please wait a few more minutes for the indexers to update your balance first.' */, 'textsize':'12px', 'font':this.props.app_state.font}) : this.render_detail_item('10', {'text':this.props.app_state.loc['3115i']/* 'If you feel like the run has stalled, just tap the loader to forget it and try again.' */, 'textsize':'12px', 'font':this.props.app_state.font})}
                    </div>
                ) : (
                    <div style={{'padding': '5px'}} onClick={() => this.finish()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['3115a']/* 'Begin Purchase.' */, 'action':''})}
                    </div>
                )}
                <div style={{height:10}}/>
                {this.props.app_state.quick_purchase_transaction_hash != null && (
                    <div style={{'padding': '5px'}} onClick={() => this.props.open_hash()}>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['3115k']/* 'Isolated Run Hash.' */, 'details':this.props.app_state.quick_purchase_transaction_hash, 'size':'l', 'footer':this.props.app_state.loc['3115l']/* 'Tap this to track the run in a blockexplorer' */})}
                    </div>
                )}
                
            </div>
        )
    }

    forget_quick_run(){
        let me = this;
        if(Date.now() - this.last_all_click_time < 200){
            //double tap
            me.props.forget_quick_run()
            clearTimeout(this.all_timeout);
        }else{
            this.all_timeout = setTimeout(function() {
                clearTimeout(this.all_timeout);
                // single tap
                
            }, 200);
        }
        this.last_all_click_time = Date.now();
    }





    async finish(){
        const selected_storage = this.state.selected_space_unit_item?.['units'] || 0

        if(selected_storage == 0){
            this.props.notify(this.props.app_state.loc['3039']/* 'Please set an amount of storage to purchase.' */, 6500)
        }
        else if(!this.check_if_sender_can_afford_payments()){
            this.props.notify(this.props.app_state.loc['2970']/* 'You don\'t have enough money to fulfil this purchase.' */, 4500)
        }
        else if(this.props.app_state.locked_wallet_hashed_password != '' && this.state.cypher_passcode.trim() == ''){
            this.props.notify(this.props.app_state.loc['1593mg']/* 'You need to set your password.' */, 4000)
        }
        else if(this.props.app_state.locked_wallet_hashed_password != '' && !this.does_password_match_hash(this.state.cypher_passcode.trim())){
            this.props.notify(this.props.app_state.loc['2954o']/* 'The password you\'ve set is incorrect.' */, 4000)
        }
        else{
            const object = this.state.nitro_object;
            const node_details = this.props.app_state.nitro_node_details[object['e5_id']]
            const amounts_to_transfer = this.get_final_amounts(node_details['price_per_megabyte'][this.state.e5])
            const selected_gas_prices = this.get_selected_gas_price_data()
            await this.props.begin_quick_purchase_for_storage(object, selected_gas_prices, amounts_to_transfer)
        }

    }

    get_selected_gas_price_data(){
        const item = this.state.custom_quick_transfer_price || this.get_gas_price_items()[0];
        var picked_max_fee_per_gas_amount = 0
        var picked_max_priority_per_gas_amount = 0;
        var run_gas_price = 0

        const e5 = this.state.e5
        if(this.props.app_state.e5s[e5].type == '1559'){
            picked_max_fee_per_gas_amount = item['price'] + item['max_priority_fee']
            picked_max_priority_per_gas_amount = item['max_priority_fee']
        }else{
            run_gas_price = item['price']
        }

        return { picked_max_fee_per_gas_amount, picked_max_priority_per_gas_amount, run_gas_price }
    }

    check_if_sender_can_afford_payments(){
        var object = this.state.nitro_object
        var node_details = this.props.app_state.nitro_node_details[object['e5_id']]
        var amounts_to_transfer = this.get_final_amounts(node_details['price_per_megabyte'][this.state.e5])
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

    does_password_match_hash(passcode){
        if(this.props.app_state.locked_wallet_hashed_password != ''){
            const provided_hash = this.props.hash_data_with_randomizer(passcode);
            return provided_hash == this.props.app_state.locked_wallet_hashed_password
        }
        else return true
    }











    format_data_size(size){
        if(bigInt(size).greater(bigInt(1024).pow(8))){
            var mod = bigInt(size).mod(bigInt(1024).pow(8)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(8)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'YBs'}
        }
        else if(bigInt(size).greater(bigInt(1024).pow(7))){
            var mod = bigInt(size).mod(bigInt(1024).pow(7)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(7)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'ZBs'}
        }
        else if(bigInt(size).greater(bigInt(1024).pow(6))){
            var mod = bigInt(size).mod(bigInt(1024).pow(6)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(6)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'EBs'}
        }
        else if(bigInt(size).greater(bigInt(1024).pow(5))){
            var mod = bigInt(size).mod(bigInt(1024).pow(5)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(5)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'PBs'}
        }
        else if(size > (1024*1024*1024*1024)){
            return {'size':parseFloat(size/(1024*1024*1024*1024)).toFixed(3), 'unit':'TBs'}
        }
        else if(size > (1024*1024*1024)){
            return {'size':parseFloat(size/(1024*1024*1024)).toFixed(3), 'unit':'GBs'}
        }
        else if(size > (1024*1024)){
            return {'size':parseFloat(size/(1024*1024)).toFixed(3), 'unit':'MBs'}
        }
        else if(size > 1024){
            return {'size':parseFloat(size/1024).toFixed(3), 'unit':'KBs'}
        }
        else{
            return {'size':size, 'unit':'bytes'}
        }
    }

    render_small_skeleton_object(){
        const styles = {
            container: {
                position: 'relative',
                width: '100%',
                height: 60,
                borderRadius: '15px',
                overflow: 'hidden',
            },
            skeletonBox: {
                width: '100%',
                height: '100%',
                borderRadius: '15px',
            },
            centerImage: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'auto',
                height: 30,
                objectFit: 'contain',
                opacity: 0.9,
            },
        };
        return(
            <div>
                <SkeletonTheme baseColor={this.props.theme['view_group_card_item_background']} highlightColor={this.props.theme['loading_highlight_color']}>
                    <div style={styles.container}>
                        <Skeleton style={styles.skeletonBox} />
                        <img src={this.props.app_state.theme['letter']} alt="" style={styles.centerImage} />
                    </div>
                </SkeletonTheme>
            </div>
        )
    }

    render_empty_horizontal_list_item2(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div>
                <div style={{height:43, width:90, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
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
                        <img src={this.props.app_state.theme['letter']} style={{height:60 ,width:'auto'}} />
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

    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var uploaded_data = {}
        if(item_id == '3' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12' || item_id == '13' || item_id == '14') uploaded_data = this.props.app_state.uploaded_data
        return(
            <div>
                <ViewGroups token_name_thumbnail_directory={this.props.app_state?.token_name_thumbnail_directory} e5s={this.props.app_state?.e5s} uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} show_images={this.props.show_images.bind(this)}
                
                />
            </div>
        )

    }

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
    }

    format_account_balance_figure(amount){
        if(amount == null){
            amount = 0;
        }
        if(amount < 1_000_000_000){
            return number_with_commas(amount.toString())
        }else{
            var power = amount.toLocaleString('fullwide', {useGrouping:false}).length - 9
            return number_with_commas(amount.toLocaleString('fullwide', {useGrouping:false}).substring(0, 9)) +'e'+power
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
            var power = amount.toLocaleString('fullwide', {useGrouping:false}).length - 9
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

    get_time_from_now(time){
        var number_date = Math.round(parseInt(time));
        var now = Math.round(new Date().getTime()/1000);

        var diff = number_date - now;
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

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }

    get_number_width(number){
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
    }

}




export default QuickPurchaseStoragePage;