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
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { from } from "@iotexproject/iotex-address-ts";

var bigInt = require("big-integer");
const Web3 = require('web3');
const { toBech32, fromBech32,} = require('@harmony-js/crypto');

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class SwapEtherPage extends Component {
    
    state = {
        selected: 0, get_swap_ether_tags_object: this.get_swap_ether_tags_object(), 
        cypher_passcode:'', minimum_changenow_swap_amount:{},

        picked_wei_amount: 0, filter_targets_text:'', recipient_address:'',
        picked_sats_amount: 0, filter_targets_text2:'', recipient_address2:''
    };

    get_swap_ether_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',], [0]
            ],
        };
    }



    set_ether_or_coin(item, type){
        const external_swappers = type == 'ether' ? this.props.app_state.e5s[item['e5']].external_swappers : item['external_swappers']
        const available = ['e',]
        external_swappers.forEach(swap_option => {
            if(swap_option == 'lifi'){
                available.push(this.props.app_state.loc['3110']/* 'Li.Fi' */);
            }
            else if(swap_option == 'changenow'){
                available.push(this.props.app_state.loc['3110bj']/* 'changeNOW' */)
            }
        });
        var selection = null;
        external_swappers.forEach(swap_option => {
            if(swap_option == 'lifi'){
                if(selection == null) selection = available.indexOf(this.props.app_state.loc['3110']/* 'Li.Fi' */);
            }
            else if(swap_option == 'changenow'){
                if(selection == null) selection = available.indexOf(this.props.app_state.loc['3110bj']/* 'changeNOW' */);
            }
        });
        const clone = structuredClone(this.state.get_swap_ether_tags_object)
        clone['e'][1] = available
        clone['e'][2][0] = selection || 1
        this.setState({item: item, get_swap_ether_tags_object: clone, type: type})
        

        var me = this;
        setTimeout(() => {
            if(me.number_picker.current != null){
                me.number_picker.current.reset_number_picker()
            }
            me.setState({recipient_address: me.get_account_address()})
        }, (1 * 1000));
    }

    constructor(props) {
        super(props);
        this.number_picker = React.createRef();
    }





    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px', 'overflow-x':'hidden'}}>
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.get_swap_ether_tags_object} tag_size={'l'} when_tags_updated={this.when_get_swap_ether_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            
                        </div>
                    </div>
                </div>

                {this.render_everything()}
                
            </div>
        )
    }

    when_get_swap_ether_tags_object_updated(tag_obj){
        this.setState({get_swap_ether_tags_object: tag_obj})
    }




    render_everything(){
        if(this.state.item == null) return;
        const selected_item = this.get_selected_item(this.state.get_swap_ether_tags_object, 'e')

        if(selected_item == this.props.app_state.loc['3110']/* 'Li.Fi' */){
            return this.render_lifi_swap_data()
        }
        else if(selected_item == this.props.app_state.loc['3110bj']/* 'changeNOW' */){
            return this.render_changenow_swap_data()
        }
    }




    render_lifi_swap_data(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_swap_details()}
                    {this.render_detail_item('0')}
                    {this.render_swap_details2()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_swap_details()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_swap_details2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_swap_details()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_swap_details2()}
                    </div>
                </div>
            )
        }
    }

    render_swap_details(){
        const item = this.state.item;
        const e5 = item['e5']
        const my_balance = this.props.app_state.account_balance[e5]
        const parent_symbol = item['symbol']
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2481bc']/* '💱 Swap Ether' */, 'details':this.props.app_state.loc['3110a']/* 'Convert your $ ether at current market exchange rates to another ether via LI.Fi.' */.replace('$', item['name']), 'size':'l'})}
                <div style={{height: 10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px', 'font-family': this.props.app_state.font}} className="fw-bold">{this.props.app_state.loc['3095d']/* 'Balance in $' */.replace('$', parent_symbol)}</p>

                    {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(my_balance), 'number':this.format_account_balance_figure(my_balance), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['2738cx']/* wei */, })}

                    {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(my_balance/10**18),
                    'number':(my_balance/10**18), 'barcolor':'#606060', 'relativepower':parent_symbol, })}
                </div>
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1372']/* 'Sender Wallet Address' */, 'details':this.get_account_address(), 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1373']/* 'Receiver Wallet Address' */, 'details':this.state.recipient_address, 'size':'l'})}
                <div style={{height: 10}}/>

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['1374']/* 'Set Receiver Address Here' */} when_text_input_field_changed={this.when_text_input_field_changed.bind(this)} text={this.state.recipient_address} theme={this.props.theme}/>

                {this.render_swap_targets_to_select()}

            </div>
        )
    }

    render_swap_details2(){
        const item = this.state.item;
        const e5 = item['e5']
        var gas_price = this.props.app_state.gas_price[e5]
        if(gas_price == null){
            gas_price = this.get_gas_price_from_runs(e5)
        }
        if(gas_price == 0 || gas_price > 10**18) gas_price = 10**10
        var gas_transactions = this.state.picked_wei_amount == 0 ? 0 : Math.floor((this.state.picked_wei_amount/gas_price)/2_300_000)
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3110b']/* 'Amount to Swap.' */, 'details':this.props.app_state.loc['3110c']/* 'Set the amount you wish to swap to the selected target' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px', 'font-family': this.props.app_state.font}} className="fw-bold">{this.props.app_state.loc['1383']/* Picked Amount In Ether and Wei */}</p>

                    {this.render_detail_item('2', this.get_picked_amount_in_wei())}
                    {this.render_detail_item('2', this.get_picked_amount_in_ether())}

                    {this.render_detail_item('2', { 'style':'s', 'title':this.props.app_state.loc['1377']/* 'Transactions (2.3M Gas average)' */, 'subtitle':this.format_power_figure(gas_transactions), 'barwidth':this.calculate_bar_width(gas_transactions), 'number':this.format_account_balance_figure(gas_transactions), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1378']/* 'transactions' */, })}
                </div>

                {this.render_input_vaue(item, (this.state.picked_wei_amount/10**18))}
                
                {this.render_amount_number_picker()}
                <div style={{height: 10}}/>
                <div style={{'padding': '5px'}} onClick={()=>this.set_maximum(gas_price, e5)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1384']/* 'Set Maximum' */, 'action':''})}
                </div>

                {this.props.app_state.locked_wallet_hashed_password != '' && (
                    <div>
                        {this.render_detail_item('0')}
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['2954m']/* 'Wallet Password.' */, 'details':this.props.app_state.loc['2954n']/* 'If you locked your wallet, set the password used here.' */, 'size':'l'})}
                        <div style={{height: 10}}/>

                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3055nm']/* 'Passcode...' */} when_text_input_field_changed={this.when_passcode_input_field_changed.bind(this)} text={this.state.cypher_passcode} theme={this.props.theme} adjust_height={false} type={'password'} />
                    </div>
                )}

                {this.render_detail_item('0')}
                {this.props.app_state.checking_if_swap_pair_exists != true &&  this.props.app_state.swapping_tokens_via_lifi != true && (
                    <div onClick={()=>this.finish_lifi_swap()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['3110z']/* 'Proceed.' */, 'action': ''})}
                    </div>
                )}
                {(this.props.app_state.checking_if_swap_pair_exists == true || this.props.app_state.swapping_tokens_via_lifi == true) && this.render_small_skeleton_object()}
            </div>
        )
    }

    render_input_vaue(item, balance_decimal){
        var final_balance = balance_decimal == null ? 0.0 : balance_decimal
        const used_symbol = item['symbol'].endsWith('ETH') ? 'ETH' : item['symbol']
        if(this.props.app_state.asset_price_data['BTC'] == null || this.props.app_state.asset_price_data[used_symbol] == null) return;
        var coin_price = this.props.app_state.asset_price_data[used_symbol]['price']
        var bitcoin_price = this.props.app_state.asset_price_data['BTC']['price']
        var selected_preferred_currency = this.props.app_state.preferred_currency
        if(coin_price != null){
            var balance_value_in_usd = coin_price * final_balance
            if(selected_preferred_currency == this.props.app_state.loc['1593eg']/* 'SAT' */){
                var number_of_btc_for_one_usd = 1 / bitcoin_price
                var balance_value_in_btc = number_of_btc_for_one_usd * balance_value_in_usd
                var balance_value_in_sat = parseInt(balance_value_in_btc * this.props.app_state.coins['BTC']['conversion'])
                return(
                    <div>
                        <div style={{height: 10}}/>
                        <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3110cq']/* 'Input Value' */, 'subtitle':this.format_power_figure(balance_value_in_sat), 'barwidth':this.calculate_bar_width(balance_value_in_sat), 'number':(balance_value_in_sat), 'barcolor':'#606060', 'relativepower':'SATs', })}
                        </div>
                    </div>
                )
            }else{
                return(
                    <div>
                        <div style={{height: 10}}/>
                        <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3110cq']/* 'Input Value' */, 'subtitle':this.format_power_figure(this.round_off(balance_value_in_usd)), 'barwidth':this.calculate_bar_width(this.round_off(balance_value_in_usd)), 'number':this.format_account_balance_figure(this.round_off(balance_value_in_usd)), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1593ef']/* 'USD' */, })}
                        </div>
                    </div>
                )
            }
        }
    }

    round_off(float_number){
        return (Math.round(float_number * 100) / 100)
    }


    when_passcode_input_field_changed(text){
        if(this.props.app_state.locked_wallet_hashed_password != '') this.setState({cypher_passcode: text})
    }

    when_text_input_field_changed(text){
        this.setState({recipient_address: text})
    }

    render_amount_number_picker(){
        return(
            <div>
                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_number_picker_value_changed.bind(this)} theme={this.props.theme} power_limit={23} pick_with_text_area={true} decimal_count={18}/>
            </div>
        )
    }

    when_number_picker_value_changed(amount){
        this.setState({picked_wei_amount: amount})
    }

    set_maximum(g, e5){
        var gas_price = g
        if(this.state.picked_wei_gas_price != 0){
            gas_price = this.state.picked_wei_gas_price
        }
        var tx_ether = gas_price * 35_000
        var my_balance = this.props.app_state.account_balance[e5]
        var maximum = my_balance - tx_ether
        if(maximum < 0) maximum = 0

        this.setState({picked_wei_amount: maximum})
        this.props.notify(this.props.app_state.loc['1389']/* 'Maximum amount set.' */, 1000)
    }

    get_picked_amount_in_wei(){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(this.state.picked_wei_amount),
            'number':this.format_account_balance_figure(this.state.picked_wei_amount),
            'barcolor':'#606060',
            'relativepower':this.props.app_state.loc['2738cx']/* wei */,
        }
    }

    get_picked_amount_in_ether(){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(this.state.picked_wei_amount/10**18),
            'number':(this.state.picked_wei_amount/10**18),
            'barcolor':'#606060',
            'relativepower':this.props.app_state.loc['2738cw']/* ether */,
        }
    }

    get_account_address(){
        var e5 = this.state.type == 'ether' ?  this.state.item['e5'] : 'E35';
        if(this.props.app_state.accounts[e5] != null){
            return this.format_address(this.props.app_state.accounts[e5].address, e5);
        }
    }

    format_address(address, e5){
        if(e5 == 'E305'){
            return toBech32(address)
        }
        else if(e5 == 'E115'){
            return this.replace_0x_with_xdc(address)
        }
        // else if(e5 == 'E175'){
        //     return ethToEvmos(address)
        // }
        else if(e5 == 'E425'){
            return this.convert_to_iotx(address)
        }
        return address
    }

    convert_to_iotx(address){
        const addr = from(address.toString());
        return addr.string();
    }

    replace_0x_with_xdc(address){
        return 'xdc'+address.toString().slice(2)
    }

    get_gas_price_from_runs(e5){
        var last_events = this.props.app_state.all_E5_runs[e5]
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




    render_swap_targets_to_select(){
        const item = this.state.item;
        const e5 = item['e5']
        const state_list = this.props.app_state.ether_data
        const available_swap_targets  = state_list.filter((list_item) => {
            return (
                this.props.app_state.e5s[list_item['e5']].id != null && 
                list_item['e5'] != e5
            )
        })
        .filter((list_item) => {
            const filter_targets_text = this.state.filter_targets_text.trim().toLowerCase();
            return (
                filter_targets_text == '' ||
                list_item['name'].toLowerCase().startsWith(filter_targets_text) ||
                list_item['symbol'].toLowerCase().startsWith(filter_targets_text)
            )
        })

        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3110d']/* 'Swap Target' */, 'details':this.props.app_state.loc['3110e']/* 'Select the targeted ether you wish to swap to.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3110l']/* 'Filter ethers...' */} when_text_input_field_changed={this.when_filter_targets_text_input_field_changed.bind(this)} text={this.state.filter_targets_text} theme={this.props.theme}/>
                <div style={{height: 10}}/>

                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {available_swap_targets.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_swap_target_item(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    when_filter_targets_text_input_field_changed(text){
        this.setState({filter_targets_text: text})
    }

    render_swap_target_item(item){
        const token_image = this.props.app_state.e5s[item['e5']].ether_image
        const title = item['symbol']
        const details = item['name']
        const balance = this.props.app_state.account_balance[item['e5']]
        const footer = (balance / 10**18).toFixed(5)
        return(
            <div onClick={() => this.when_swap_target_selected(item)}>
                {this.render_detail_item('14', {'title':title, 'details':details, 'size':'s', 'image':token_image, 'img_size':30})}
                {this.render_line_if_selected(item)}
            </div>
        )
    }

    render_line_if_selected(item){
        if(this.state.swap_target == item['e5']){
            return(
                <div>
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }
    }

    when_swap_target_selected(item){
        this.setState({swap_target: item['e5']})
    }









    render_changenow_swap_data(){
        const type = this.state.type
        if(type == 'ether'){
            return this.render_changenow_ether_swap_data()
        }
        else {
            return this.render_changenow_coin_swap_data()
        }
    }

    render_changenow_ether_swap_data(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_changenow_swap_details()}
                    {this.render_detail_item('0')}
                    {this.render_changenow_swap_details2()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_changenow_swap_details()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_changenow_swap_details2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_changenow_swap_details()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_changenow_swap_details2()}
                    </div>
                </div>
            )
        }
    }

    render_changenow_swap_details(){
        const item = this.state.item;//this here is an ether
        const e5 = item['e5']
        const my_balance = this.props.app_state.account_balance[e5]
        const parent_symbol = item['symbol']
        const minimum_amount = this.state.swap_target2 != null ? this.state.minimum_changenow_swap_amount[this.state.swap_target2] : 0
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3110bk']/* '💱 Swap Coin/Ether' */, 'details':this.props.app_state.loc['3110bl']/* 'Convert your $ ether at current market exchange rates to another coin or ether via ChangeNOW.' */.replace('$', item['name']), 'size':'l'})}
                <div style={{height: 10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px', 'font-family': this.props.app_state.font}} className="fw-bold">{this.props.app_state.loc['3095d']/* 'Balance in $' */.replace('$', parent_symbol)}</p>

                    {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(my_balance), 'number':this.format_account_balance_figure(my_balance), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['2738cx']/* wei */, })}

                    {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(my_balance/10**18),
                    'number':(my_balance/10**18), 'barcolor':'#606060', 'relativepower':parent_symbol, })}
                </div>
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1372']/* 'Sender Wallet Address' */, 'details':this.get_account_address(), 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1373']/* 'Receiver Wallet Address' */, 'details':this.state.recipient_address2, 'size':'l'})}
                <div style={{height: 10}}/>

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['1374']/* 'Set Receiver Address Here' */} when_text_input_field_changed={this.when_recipient_address2_input_field_changed.bind(this)} text={this.state.recipient_address2} theme={this.props.theme}/>

                {this.render_swap_targets_to_select2()}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3110bo']/* 'Minimum Amount.' */, 'details':this.props.app_state.loc['3110bp']/* 'The minimum amount of coin or ether you can swap with ChangeNow.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                {minimum_amount == 0 && this.state.loading_minimum_changenow_swap_amount == null && this.render_empty_object()}

                {minimum_amount == 0 && this.state.loading_minimum_changenow_swap_amount == true && this.render_skeleton_object()}

                {minimum_amount != 0 && (
                    <div>
                        <div style={{height: 10}}/>
                        <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                            <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px', 'font-family': this.props.app_state.font}} className="fw-bold">{this.props.app_state.loc['3110bq']/* Minimum Swap Amount. */}</p>

                            {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(minimum_amount), 'number':this.format_account_balance_figure(minimum_amount), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['2738cx']/* wei */, })}

                            {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(parseFloat(minimum_amount) / 10**18), 'number':(parseFloat(minimum_amount) / 10**18), 'barcolor':'#606060', 'relativepower':item['symbol'], })}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    render_changenow_swap_details2(){
        const item = this.state.item; //its an ether here
        const e5 = item['e5']
        var gas_price = this.props.app_state.gas_price[e5]
        if(gas_price == null){
            gas_price = this.get_gas_price_from_runs(e5)
        }
        if(gas_price == 0 || gas_price > 10**18) gas_price = 10**10
        var gas_transactions = this.state.picked_wei_amount == 0 ? 0 : Math.floor((this.state.picked_wei_amount/gas_price)/2_300_000)

        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3110b']/* 'Amount to Swap.' */, 'details':this.props.app_state.loc['3110c']/* 'Set the amount you wish to swap to the selected target' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px', 'font-family': this.props.app_state.font}} className="fw-bold">{this.props.app_state.loc['1383']/* Picked Amount In Ether and Wei */}</p>

                    {this.render_detail_item('2', this.get_picked_amount_in_wei())}
                    {this.render_detail_item('2', this.get_picked_amount_in_ether())}

                    {this.render_detail_item('2', { 'style':'s', 'title':this.props.app_state.loc['1377']/* 'Transactions (2.3M Gas average)' */, 'subtitle':this.format_power_figure(gas_transactions), 'barwidth':this.calculate_bar_width(gas_transactions), 'number':this.format_account_balance_figure(gas_transactions), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1378']/* 'transactions' */, })}
                </div>

                {this.render_input_vaue(item, (this.state.picked_wei_amount/10**18))}

                {this.render_amount_number_picker()}
                <div style={{height: 10}}/>
                <div style={{'padding': '0px 10px 0px 10px'}}>
                    <div className="row">
                        <div className="col-6" style={{}}>
                            <div onClick={()=>this.set_minimum_amount2()}>
                                {this.render_detail_item('5', {'text':this.props.app_state.loc['3110bt']/* 'Set Minimum' */, 'action':''})}
                            </div>
                        </div>
                        <div className="col-6" style={{}}>
                            <div onClick={()=>this.set_maximum(gas_price, e5)}>
                                {this.render_detail_item('5', {'text':this.props.app_state.loc['1384']/* 'Set Maximum' */, 'action':''})}
                            </div>
                        </div>
                    </div>
                </div>

                {this.props.app_state.locked_wallet_hashed_password != '' && (
                    <div>
                        {this.render_detail_item('0')}
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['2954m']/* 'Wallet Password.' */, 'details':this.props.app_state.loc['2954n']/* 'If you locked your wallet, set the password used here.' */, 'size':'l'})}
                        <div style={{height: 10}}/>

                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3055nm']/* 'Passcode...' */} when_text_input_field_changed={this.when_passcode_input_field_changed.bind(this)} text={this.state.cypher_passcode} theme={this.props.theme} adjust_height={false} type={'password'} />
                    </div>
                )}

                {this.render_detail_item('0')}
                {this.props.app_state.swapping_tokens_via_changenow != true && (
                    <div onClick={()=>this.finish_changenow_swap()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['3110z']/* 'Proceed.' */, 'action': ''})}
                    </div>
                )}
                {(this.props.app_state.swapping_tokens_via_changenow == true) && this.render_small_skeleton_object()}

                <div style={{height: 10}}/>
                {this.render_current_swap_status_if_any()}
            </div>
        )
    }

    when_recipient_address2_input_field_changed(text){
        this.setState({recipient_address2: text})
    }
    
    render_current_swap_status_if_any(){
        const transaction_status = this.state.transaction_status
        if(transaction_status != null){
            const status = transaction_status.status;
            const obj = {
                'new':this.props.app_state.loc['3110cb']/* The transaction was just created. */,
                'waiting':this.props.app_state.loc['3110cc']/* ChangeNOW is waiting for the deposit to be included in the blockchain. */,
                'confirming':this.props.app_state.loc['3110cd']/* ChangeNOW is waiting for the transaction to achieve cryptographic finality. */,
                'exchanging':this.props.app_state.loc['3110ce']/* Your sent amount is being exchange for the targeted token. */,
                'sending':this.props.app_state.loc['3110cf']/* Your promised coin or ether is being sent to your wallet address. */,
                'finished':this.props.app_state.loc['3110cg']/* The swap is completely finalized. */,
                'failed':this.props.app_state.loc['3110ch']/* Something went wrong with the swap. */,
                'refunded':this.props.app_state.loc['3110ci']/* Your funds were refunded back to your wallet. */,
                'verifying':this.props.app_state.loc['3110cj']/* The transaction is being verified. */,
            }
            const title = this.props.app_state.loc['3110ck']/* 'Status: $' */.replace('$', status.toUpperCase())
            const details = obj[status]

            return (
                <div>
                    {this.render_detail_item('3', {'title':title, 'details':details, 'size':'l', 'footer':transaction_status.id})}
                </div>
            )
        }
    }




    render_changenow_coin_swap_data(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_changenow_coin_swap_details()}
                    {this.render_detail_item('0')}
                    {this.render_changenow_coin_swap_details2()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_changenow_coin_swap_details()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_changenow_coin_swap_details2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_changenow_coin_swap_details()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_changenow_coin_swap_details2()}
                    </div>
                </div>
            )
        }
    }

    render_changenow_coin_swap_details(){
        const item = this.state.item;//this here is a coin
        const balance_decimal = this.get_balance_in_decimal(item)
        const balance_base_unit = this.get_balance_in_base_units(item)
        const unlocked_balance_decimal = this.get_unlocked_balance_in_decimal(item)
        const unlocked_balance_base_unit = this.get_unlocked_balance_in_base_units(item)
        const parent_symbol = item['symbol']
        const data = this.props.app_state.coin_data[item['symbol']]
        const minimum_amount = this.state.swap_target2 != null ? this.state.minimum_changenow_swap_amount[this.state.swap_target2] : 0

        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3110bk']/* '💱 Swap Coin/Ether' */, 'details':this.props.app_state.loc['3110cr']/* 'Convert your $ coin at current market exchange rates to another coin or ether via ChangeNOW.' */.replace('$', item['name']), 'size':'l'})}
                <div style={{height: 10}}/>
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}
                onClick={() => this.props.view_number({'title':this.props.app_state.loc['2919']/* 'Your balance in ' */+item['base_unit'], 'number':balance_base_unit, 'relativepower':item['base_unit']})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2919']/* 'Your balance in ' */+item['symbol'], 'subtitle':this.format_power_figure(balance_decimal), 'barwidth':this.calculate_bar_width(balance_decimal), 'number':(balance_decimal), 'barcolor':'#606060', 'relativepower':item['symbol'], })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2919']/* 'Your balance in ' */+item['base_unit'], 'subtitle':this.format_power_figure(balance_base_unit), 'barwidth':this.calculate_bar_width(balance_base_unit), 'number':this.format_account_balance_figure(balance_base_unit), 'barcolor':'#606060', 'relativepower':item['base_unit'], })}
                </div>

                {data != null && data['unlocked_balance'] != null && (
                    <div>
                        <div style={{height: 10}}/>
                        <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}
                        onClick={() => this.props.view_number({'title':this.props.app_state.loc['2927bl']/* 'Your unlocked balance in ' */+item['base_unit'], 'number':unlocked_balance_base_unit, 'relativepower':item['base_unit']})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2927bl']/* 'Your unlocked balance in ' */+item['symbol'], 'subtitle':this.format_power_figure(unlocked_balance_decimal), 'barwidth':this.calculate_bar_width(unlocked_balance_decimal), 'number':(unlocked_balance_decimal), 'barcolor':'#606060', 'relativepower':item['symbol'], })}

                            {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2927bl']/* 'Your unlocked balance in ' */+item['base_unit'], 'subtitle':this.format_power_figure(unlocked_balance_base_unit), 'barwidth':this.calculate_bar_width(unlocked_balance_base_unit), 'number':this.format_account_balance_figure(unlocked_balance_base_unit), 'barcolor':'#606060', 'relativepower':item['base_unit'], })}
                        </div>
                    </div>
                )}
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1372']/* 'Sender Wallet Address' */, 'details':data['address'], 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1373']/* 'Receiver Wallet Address' */, 'details':this.state.recipient_address2, 'size':'l'})}
                <div style={{height: 10}}/>

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['1374']/* 'Set Receiver Address Here' */} when_text_input_field_changed={this.when_recipient_address2_input_field_changed.bind(this)} text={this.state.recipient_address2} theme={this.props.theme}/>

                {this.render_swap_targets_to_select2()}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3110bo']/* 'Minimum Amount.' */, 'details':this.props.app_state.loc['3110bp']/* 'The minimum amount of coin or ether you can swap with ChangeNow.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                {minimum_amount == 0 && this.state.loading_minimum_changenow_swap_amount == null && this.render_empty_object()}

                {minimum_amount == 0 && this.state.loading_minimum_changenow_swap_amount == true && this.render_skeleton_object()}

                {minimum_amount != 0 && (
                    <div>
                        <div style={{height: 10}}/>
                        <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                            <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px', 'font-family': this.props.app_state.font}} className="fw-bold">{this.props.app_state.loc['3110bq']/* Minimum Swap Amount.. */}</p>

                            {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(minimum_amount), 'number':this.format_account_balance_figure(minimum_amount), 'barcolor':'#606060', 'relativepower':item['base_unit']+'s', })}

                            {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(parseFloat(minimum_amount) / item['conversion']), 'number':(parseFloat(minimum_amount) / item['conversion']), 'barcolor':'#606060', 'relativepower':item['symbol'], })}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    render_changenow_coin_swap_details2(){
        const item = this.state.item; //its a coin here
        const parent_symbol = item['symbol']
        const data = this.props.app_state.coin_data[item['symbol']]

        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3110b']/* 'Amount to Swap.' */, 'details':this.props.app_state.loc['3110c']/* 'Set the amount you wish to swap to the selected target' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px', 'font-family': this.props.app_state.font}} className="fw-bold">{this.props.app_state.loc['1407i']/* Picked Amount. */}</p>
                    {this.render_detail_item('2', this.get_picked_amount_in_base_units())}
                    {this.render_detail_item('2', this.get_picked_amount_in_decimal())}
                </div>

                {this.render_input_vaue(item, this.state.picked_sats_amount / item['conversion'])}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_number_picker_value_changed2.bind(this)} theme={this.props.theme} power_limit={23} decimal_count={this.get_coin_decimal_count()} pick_with_text_area={true}/>

                <div style={{height: 10}}/>
                <div style={{'padding': '0px 10px 0px 10px'}}>
                    <div className="row">
                        <div className="col-6" style={{}}>
                            <div onClick={()=>this.set_minimum_amount()}>
                                {this.render_detail_item('5', {'text':this.props.app_state.loc['3110bt']/* 'Set Minimum' */, 'action':''})}
                            </div>
                        </div>
                        <div className="col-6" style={{}}>
                            <div onClick={()=>this.set_maximum()}>
                                {this.render_detail_item('5', {'text':this.props.app_state.loc['1384']/* 'Set Maximum' */, 'action':''})}
                            </div>
                        </div>
                    </div>
                </div>

                {this.props.app_state.locked_wallet_hashed_password != '' && (
                    <div>
                        {this.render_detail_item('0')}
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['2954m']/* 'Wallet Password.' */, 'details':this.props.app_state.loc['2954n']/* 'If you locked your wallet, set the password used here.' */, 'size':'l'})}
                        <div style={{height: 10}}/>

                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3055nm']/* 'Passcode...' */} when_text_input_field_changed={this.when_passcode_input_field_changed.bind(this)} text={this.state.cypher_passcode} theme={this.props.theme} adjust_height={false} type={'password'} />
                    </div>
                )}

                {this.render_detail_item('0')}

                {this.props.app_state.swapping_tokens_via_changenow != true && (
                    <div onClick={()=>this.finish_changenow_swap()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['3110z']/* 'Proceed.' */, 'action': ''})}
                    </div>
                )}
                {(this.props.app_state.swapping_tokens_via_changenow == true) && this.render_small_skeleton_object()}

                <div style={{height: 10}}/>
                {this.render_current_swap_status_if_any()}
            </div>
        )
    }

    get_balance_in_decimal(item){
        var data = this.props.app_state.coin_data[item['symbol']]
        if(data != null){
            var balance = data['balance']
            if(balance == 0){
                return 0
            }else{
                return parseFloat(balance) / item['conversion']
            }
        }else{
            return 0
        }
    }

    get_balance_in_base_units(item){
        var data = this.props.app_state.coin_data[item['symbol']]
        if(data != null && data['balance'] != null){
            return bigInt(data['balance']).toString()
        }else{
            return 0
        }
    }

    get_unlocked_balance_in_decimal(item){
        var data = this.props.app_state.coin_data[item['symbol']]
        if(data != null && data['unlocked_balance'] != null){
            var balance = data['unlocked_balance']
            if(balance == 0){
                return 0
            }else{
                return parseFloat(balance) / item['conversion']
            }
        }else{
            return 0
        }
    }

    get_unlocked_balance_in_base_units(item){
        var data = this.props.app_state.coin_data[item['symbol']]
        if(data != null && data['unlocked_balance'] != null){
            return bigInt(data['unlocked_balance']).toString()
        }else{
            return 0
        }
    }

    get_coin_decimal_count(){
        return this.state.item['decimals']
    }

    get_picked_amount_in_base_units(){
        var item = this.state.item
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(this.state.picked_sats_amount),
            'number':this.format_account_balance_figure(this.state.picked_sats_amount),
            'barcolor':'#606060',
            'relativepower':item['base_unit']+'s',
        }
    }

    get_picked_amount_in_decimal(){
        var item = this.state.item
        var amount = parseFloat(this.state.picked_sats_amount) / item['conversion']
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(amount),
            'number':(amount),
            'barcolor':'#606060',
            'relativepower':item['symbol'],
        }
    }

    when_number_picker_value_changed2(number){
        this.setState({picked_sats_amount: number})
    }

    set_maximum = async () => {
        var set_fee = await this.get_default_transaction_fee()
        var item = this.state.item
        var data = this.props.app_state.coin_data[item['symbol']]
        var accounts_balance = data['balance'] - data['min_deposit']

        if(this.state.picked_sats_fee_amount != 0){
            set_fee = this.state.picked_sats_fee_amount
        }

        if(accounts_balance > set_fee){
            var remaining = accounts_balance - set_fee
            this.when_number_picker_value_changed2(remaining)
        }else{
            this.props.notify(this.props.app_state.loc['2934']/* 'Your balance is too low to make a transaction.' */, 4000)
        }
    }

    get_default_transaction_fee = async () => {
        var item = this.state.item
        var data = this.props.app_state.coin_data[item['symbol']]
        var fee = data['fee']['fee']
        var per = data['fee']['per']
        var final_amount = 0
        if(per == 'gas'){
            final_amount = 50_000 * fee
        }
        else if(per == 'byte'){
            final_amount = parseInt(fee * (this.get_utxo_tx_size(this.get_utxos_that_will_be_consumed(data), 1)))
        }
        else if(per == 'transaction'){
            final_amount = fee
        }

        if(item['symbol'] == 'AR'){
            var target = this.props.validate_arweave_address(this.state.recipient_address2) ? this.state.recipient_address : '-zdLm14FOLtTWxTEVzhh2N9AGCnW_-O_6DIcLxgk-W0'
            var current_network_fees = await this.props.estimate_arweave_network_fees(target)
            final_amount = parseInt(current_network_fees)
        }
        return final_amount
    }

    get_utxos_that_will_be_consumed(data){
        var item = this.state.item
        var utxos = data['utxos']
        if(utxos == null) return 0;
        var transfer_amount = this.state.picked_sats_amount == 0 ? 1 : this.state.picked_sats_amount
        var utxos_count = 0
        var bal = 0
        if(item['symbol'] == 'BTC'){
            if(utxos['unspent_outputs'] == null) return 0
            var should_add = true;
            utxos['unspent_outputs'].forEach(utxo => {
                if(should_add)bal += utxo['value'];
                if(should_add)utxos_count++
                if(bal >= transfer_amount){
                    should_add = false;
                }
            });
        }
        else if(item['symbol'] == 'BCH'){
            if(utxos['utxos'] == null) return 0
            var should_add = true;
            utxos['utxos'].forEach(utxo => {
                if(should_add)bal += utxo['value'];
                if(should_add)utxos_count++
                if(bal >= transfer_amount){
                    should_add = false;
                }
            });
        }
        else if(item['symbol'] == 'LTC'){
            var should_add = true;
            utxos.forEach(utxo => {
                if(should_add)bal += utxo['value'];
                if(should_add)utxos_count++
                if(bal >= transfer_amount){
                    should_add = false;
                }
            });
        }
        else if(item['symbol'] == 'DOGE'){
            if(utxos['data'] == null) return 0;
            var should_add = true;
            utxos['data'].forEach(utxo => {
               if(should_add) bal += parseInt(utxo['satoshis']);
               if(should_add) utxos_count++
                if(bal >= transfer_amount){
                    should_add = false;
                }
            });
        }
        else if(item['symbol'] == 'DASH'){
            var should_add = true;
            utxos.forEach(utxo => {
                if(should_add)bal += parseInt(utxo['satoshis']);
                if(should_add)utxos_count++
                if(bal >= transfer_amount){
                    should_add = false;
                }
            });
        }
        else if(item['symbol'] == 'ZEC'){
            var should_add = true;
            utxos.forEach(utxo => {
                if(should_add)bal += parseInt(utxo['value']);
                if(should_add)utxos_count++
                if(bal >= transfer_amount){
                    should_add = false;
                }
            });
        }
        return utxos_count
    }

    get_utxo_tx_size(_in, out){
        if(_in == 0) return 0
        return (_in*148 + out*34 + 10 +- _in)
    }

    set_minimum_amount(){
        const minimum_amount = this.state.swap_target2 != null ? this.state.minimum_changenow_swap_amount[this.state.swap_target2] : 0
        this.when_number_picker_value_changed2(minimum_amount)
    }

    set_minimum_amount2(){
        const minimum_amount = this.state.swap_target2 != null ? this.state.minimum_changenow_swap_amount[this.state.swap_target2] : 0
        this.when_number_picker_value_changed(minimum_amount)
    }







    get_coins_and_ethers_swap_data(external_exchange, source_symbol){
        const all_data = []
        const ethers_state_list = this.props.app_state.ether_data
        ethers_state_list.forEach(ether_object => {
            const external_swappers = this.props.app_state.e5s[ether_object['e5']].external_swappers
            if(external_swappers.includes(external_exchange)){
                const filter_name = ether_object['name']
                const filter_symbol = ether_object['symbol']
                if(filter_symbol != source_symbol){
                    all_data.push({
                        'e5': ether_object['e5'],
                        'name':filter_name,
                        'symbol': filter_symbol,
                        'type': 'ether',
                        'image':this.props.app_state.e5s[ether_object['e5']].ether_image,
                        'item': ether_object,
                        'my_address': this.get_account_address(),
                        'decimals': 18,
                        'base_units': this.props.app_state.loc['2738cx']/* wei */
                    })
                }
            }
        });

        const coins = this.props.app_state.coins
        for (const coin in coins) {
            if (coins.hasOwnProperty(coin)) {
                const coin_object = coins[coin]
                const external_swappers = coin_object['external_swappers']
                if(external_swappers.includes(external_exchange)){
                    const filter_name = coin_object['name']
                    const filter_symbol = coin_object['symbol']
                    if(filter_symbol != source_symbol && this.props.app_state.coin_data[coin_object['symbol']] != null){
                        all_data.push({
                            'e5': filter_symbol,
                            'name':filter_name,
                            'symbol': filter_symbol,
                            'type': 'coin',
                            'image': coin_object['image'],
                            'item': coin_object,
                            'my_address': this.props.app_state.coin_data[coin_object['symbol']]['address'],
                            'decimals': coin_object['decimals'],
                            'base_units': coin_object['base_units']
                        })
                    }
                }
            }
        }

        return this.sortByAttributeDescending(all_data, 'name').reverse()
    }

    render_swap_targets_to_select2(){
        const item = this.state.item;
        const available_swap_targets = this.get_coins_and_ethers_swap_data('changenow', item['symbol']).filter((list_item) => {
            const filter_targets_text = this.state.filter_targets_text2.trim().toLowerCase();
            return (
                filter_targets_text == '' ||
                list_item['name'].toLowerCase().startsWith(filter_targets_text) ||
                list_item['symbol'].toLowerCase().startsWith(filter_targets_text)
            )
        })

        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3110d']/* 'Swap Target' */, 'details':this.props.app_state.loc['3110bm']/* 'Select the targeted coin or ether you wish to swap to.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3110l']/* 'Filter ethers...' */} when_text_input_field_changed={this.when_filter_targets_text2_input_field_changed.bind(this)} text={this.state.filter_targets_text2} theme={this.props.theme}/>
                <div style={{height: 10}}/>

                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {available_swap_targets.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_swap_target_item2(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    when_filter_targets_text2_input_field_changed(text){
        this.setState({filter_targets_text2: text})
    }

    render_swap_target_item2(item){
        const token_image = item['image']
        const title = item['symbol']
        const details = item['name']
        return(
            <div onClick={() => this.when_swap_target_selected2(item)}>
                {this.render_detail_item('14', {'title':title, 'details':details, 'size':'s', 'image':token_image, 'img_size':30})}
                {this.render_line_if_selected2(item)}
            </div>
        )
    }

    render_line_if_selected2(item){
        if(this.state.swap_target2 == item['e5']){
            return(
                <div>
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }
    }

    async when_swap_target_selected2(item){
        this.setState({swap_target2: item['e5']})
        if(this.state.recipient_address2 == ''){
            this.setState({recipient_address2: item['my_address']})
        }

        if(this.state.minimum_changenow_swap_amount[item['e5']] == null || this.state.minimum_changenow_swap_amount[item['e5']] == 0){
            this.setState({loading_minimum_changenow_swap_amount: true})
            const minimum_amount = await this.props.get_minimum_amount_for_exchange_pair(this.state.item, item['e5'], item, this.state.type)

            const clone = structuredClone(this.state.minimum_changenow_swap_amount)
            clone[item['e5']] = minimum_amount
            this.setState({minimum_changenow_swap_amount: clone, loading_minimum_changenow_swap_amount: null})
        }
    }















    finish_lifi_swap(){
        const e5 = this.state.item['e5']
        const recipient_address = this.state.recipient_address.trim()
        const picked_amount = this.state.picked_wei_amount
        const my_balance = this.props.app_state.account_balance[e5]
        const swap_target = this.state.swap_target

        var gas_price = this.props.app_state.gas_price[e5]
        if(gas_price == null){
            gas_price = this.get_gas_price_from_runs(e5)
        }

        if(!this.isValidAddress(recipient_address)){
            this.props.notify(this.props.app_state.loc['1407']/* 'Please set a valid recipient.' */, 4500)
        }
        else if(picked_amount == 0){
            this.props.notify(this.props.app_state.loc['1406']/* 'Please set a valid amount.' */, 4500)
        }
        else if((picked_amount+gas_price) > my_balance){
            this.props.notify(this.props.app_state.loc['1404']/* 'Your ether balance is insufficient to fulfil that transaction.' */, 7200)
        }
        else if(swap_target == null){
            this.props.notify(this.props.app_state.loc['3110f']/* 'You need to select a target ether for the swap' */, 7200)
        }
        else if(this.props.app_state.locked_wallet_hashed_password != '' && this.state.cypher_passcode.trim() == ''){
            this.props.notify(this.props.app_state.loc['1593mg']/* 'You need to set your password.' */, 4000)
        }
        else if(this.props.app_state.locked_wallet_hashed_password != '' && !this.does_password_match_hash(this.state.cypher_passcode.trim())){
            this.props.notify(this.props.app_state.loc['2954o']/* 'The password you\'ve set is incorrect.' */, 4000)
        }
        else{
            this.props.show_dialog_bottomsheet({'picked_amount':picked_amount, 'item':this.state.item, 'recipient_address':recipient_address, 'gas_price':gas_price, 'my_balance':my_balance, 'sender_address':this.get_account_address(), 'swap_target':swap_target}, 'confirm_swap_ether_dialog')
            this.props.check_if_ether_swap_pair_exists(this.state.item, swap_target, picked_amount, recipient_address, this.get_account_address())
        }
        
    }

    does_password_match_hash(passcode){
        if(this.props.app_state.locked_wallet_hashed_password != ''){
            const provided_hash = this.props.hash_data_with_randomizer(passcode);
            return provided_hash == this.props.app_state.locked_wallet_hashed_password
        }
        else return true
    }

    isValidAddress = (adr) => {
        var e5 = this.state.item['e5']
        try {
            const web3 = new Web3()
            web3.utils.toChecksumAddress(this.format_address(adr, e5))
            return true
        } catch (e) {
            return false
        }
    }



    async finish_changenow_swap(){
        const type = this.state.type
        if(type == 'ether'){
            const item = this.state.item
            const e5 = item['e5']
            const recipient_address = this.state.recipient_address2.trim()
            const picked_amount = this.state.picked_wei_amount
            const my_balance = this.props.app_state.account_balance[e5]
            const swap_target = this.state.swap_target2
            const minimum_amount = swap_target != null ? this.state.minimum_changenow_swap_amount[swap_target] : 0

            var gas_price = this.props.app_state.gas_price[e5]
            if(gas_price == null){
                gas_price = this.get_gas_price_from_runs(e5)
            }

            if(!await this.validate_recipient(recipient_address, swap_target)){
                this.props.notify(this.props.app_state.loc['1407']/* 'Please set a valid recipient.' */, 4500)
            }
            else if(picked_amount == 0){
                this.props.notify(this.props.app_state.loc['1406']/* 'Please set a valid amount.' */, 4500)
            }
            else if((picked_amount+gas_price) > my_balance){
                this.props.notify(this.props.app_state.loc['1404']/* 'Your ether balance is insufficient to fulfil that transaction.' */, 7200)
            }
            else if(swap_target == null){
                this.props.notify(this.props.app_state.loc['3110f']/* 'You need to select a target ether for the swap' */, 7200)
            }
            else if(minimum_amount == 0){
                this.props.notify(this.props.app_state.loc['3110br']/* 'The pair youve selected to swap is unavailable.' */, 7200)
            }
            else if(picked_amount < minimum_amount){
                this.props.notify(this.props.app_state.loc['3110bs']/* 'The amount you\'ve set is less than the minimum required.' */, 7200)
            }
            else if(this.props.app_state.locked_wallet_hashed_password != '' && this.state.cypher_passcode.trim() == ''){
                this.props.notify(this.props.app_state.loc['1593mg']/* 'You need to set your password.' */, 4000)
            }
            else if(this.props.app_state.locked_wallet_hashed_password != '' && !this.does_password_match_hash(this.state.cypher_passcode.trim())){
                this.props.notify(this.props.app_state.loc['2954o']/* 'The password you\'ve set is incorrect.' */, 4000)
            }
            else{
                const swap_target_data = this.get_swap_target_data(swap_target)

                this.props.show_dialog_bottomsheet({'picked_amount':picked_amount, 'item':item, 'recipient_address':recipient_address, 'gas_price':gas_price, 'my_balance':my_balance, 'sender_address':this.get_account_address(), 'swap_target':swap_target, 'swap_target_data': swap_target_data, 'type': type}, 'confirm_swap_coin_ether_via_changenow_dialog')
                
                await this.props.get_changenow_transaction_object_from_pair(item, picked_amount, recipient_address, gas_price, my_balance, this.get_account_address(), swap_target, type, swap_target_data)
            }
        }
        else{
            const set_fee = await this.get_default_transaction_fee()
            const item = this.state.item
            const data = this.props.app_state.coin_data[item['symbol']]
            const recipient_address = this.state.recipient_address2.trim()
            const picked_amount = this.state.picked_sats_amount
            const swap_target = this.state.swap_target2
            const minimum_amount = swap_target != null ? this.state.minimum_changenow_swap_amount[swap_target] : 0
            
            const money_out = bigInt(set_fee).plus(picked_amount)
            const accounts_balance = data['balance']

            if(picked_amount == 0){
                this.props.notify(this.props.app_state.loc['1406']/* 'Please set a valid amount.' */, 4500)
            }
            else if(!await this.validate_recipient(recipient_address, swap_target)){
                this.props.notify(this.props.app_state.loc['1407']/* 'Please set a valid recipient.' */, 4500)
            }
            else if(money_out > (accounts_balance - data['min_deposit'])){
                this.props.notify(this.props.app_state.loc['3110bn']/* 'Your coin balance is insufficient to fulfil that transaction.' */, 7200)
            }
            else if(swap_target == null){
                this.props.notify(this.props.app_state.loc['3110f']/* 'You need to select a target ether for the swap' */, 7200)
            }
            else if(minimum_amount == 0){
                this.props.notify(this.props.app_state.loc['3110br']/* 'The pair youve selected to swap is unavailable.' */, 7200)
            }
            else if(picked_amount < minimum_amount){
                this.props.notify(this.props.app_state.loc['3110bs']/* 'The amount you\'ve set is less than the minimum required.' */, 7200)
            }
            else if(this.props.app_state.locked_wallet_hashed_password != '' && this.state.cypher_passcode.trim() == ''){
                this.props.notify(this.props.app_state.loc['1593mg']/* 'You need to set your password.' */, 4000)
            }
            else if(this.props.app_state.locked_wallet_hashed_password != '' && !this.does_password_match_hash(this.state.cypher_passcode.trim())){
                this.props.notify(this.props.app_state.loc['2954o']/* 'The password you\'ve set is incorrect.' */, 4000)
            }
            else{
                const swap_target_data = this.get_swap_target_data(swap_target)
                const sender_address = this.props.app_state.coin_data[item['symbol']]['address']

                this.props.show_dialog_bottomsheet({'picked_amount':picked_amount, 'item':item, 'recipient_address':recipient_address, 'gas_price':set_fee, 'my_balance':accounts_balance, 'sender_address':sender_address, 'swap_target':swap_target, 'swap_target_data': this.get_swap_target_data(swap_target), 'type': type}, 'confirm_swap_coin_ether_via_changenow_dialog')

                await this.props.get_changenow_transaction_object_from_pair(item, picked_amount, recipient_address, set_fee, accounts_balance, sender_address, swap_target, type, swap_target_data)
            }
        }
    }

    async validate_recipient(recipient_address, swap_target){
        const swap_target_data = this.get_swap_target_data(swap_target)
        if(swap_target_data['type'] == 'ether'){
            return this.isValidAddress(recipient_address)
        }else{
            return await this.props.check_if_recipient_address_is_valid(recipient_address, swap_target_data['item'])
        }
    }

    get_swap_target_data(swap_target){
        const item = this.state.item;
        const available_swap_targets = this.get_coins_and_ethers_swap_data('changenow', item['symbol'])
        const filtered_data = available_swap_targets.filter((target) => {
            return target['e5'] == swap_target
        })
        // console.log('get_swap_target_data','filtered_data', filtered_data, swap_target)
        if(filtered_data.length > 0){
            return filtered_data[0]
        }
    }






    render_skeleton_object(){
        const styles = {
            container: {
                position: 'relative',
                width: '100%',
                height: 160,
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
                height: 60,
                objectFit: 'contain',
                opacity: 0.9,
            },
        };
        return(
            <div>
                <SkeletonTheme baseColor={this.props.theme['loading_base_color']} highlightColor={this.props.theme['loading_highlight_color']}>
                    <div style={styles.container}>
                        <Skeleton style={styles.skeletonBox} />
                        <img src={this.props.app_state.theme['letter']} alt="" style={styles.centerImage} />
                    </div>
                </SkeletonTheme>
            </div>
        )
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
                <SkeletonTheme baseColor={this.props.theme['loading_base_color']} highlightColor={this.props.theme['loading_highlight_color']}>
                    <div style={styles.container}>
                        <Skeleton style={styles.skeletonBox} />
                        <img src={this.props.app_state.theme['letter']} alt="" style={styles.centerImage} />
                    </div>
                </SkeletonTheme>
            </div>
        )
    }

    render_empty_object(){
        var background_color = this.props.theme['card_background_color']
        return(
                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:60 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                </div>
            );
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
        if(item_id == '8' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12')uploaded_data = this.props.app_state.uploaded_data
        return(
            <div>
                <ViewGroups token_name_thumbnail_directory={this.props.app_state?.token_name_thumbnail_directory} e5s={this.props.app_state?.e5s} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
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




export default SwapEtherPage;