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
import TextInput from './../components/text_input';
import Dialog from "@mui/material/Dialog";
import NumberPicker from './../components/number_picker';
import DurationPicker from './../components/duration_picker';

// import Letter from './../assets/letter.png'; 
import { from } from "@iotexproject/iotex-address-ts";

var bigInt = require("big-integer");
const Web3 = require('web3');
const { toBech32, fromBech32, } = require('@harmony-js/crypto');

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function start_and_end(str) {
  if (str.length > 30) {
    return str.substr(0, 20) + '...' + str.substr(str.length-10, str.length);
  }
  return str;
}

class WithdrawEtherPage extends Component {
    
    state = {
        selected: 0, withdraw_ether_page_tags_object: this.get_withdraw_ether_page_tags_object(),
        recipient_address:'', confirmation_dialog_box: false, e5:{'data':[], 'id':this.props.app_state.selected_e5},
        run_time_expiry:0, run_gas_price:0, picked_max_priority_per_gas_amount:0, picked_max_fee_per_gas_amount:0
    };

    get_withdraw_ether_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1990']/* 'withdraw-ether' */, this.props.app_state.loc['1991']/* 'pending-withdraws' */, this.props.app_state.loc['1992']/* 'withdraw-history' */], [1]
            ],
        };
    }

    render(){
        
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                {this.render_top_title()}

                <div style={{height:10}}/>

                {this.render_everything()}

                {this.render_dialog_ui()}

            </div>
        )
    }


    when_withdraw_ether_page_tags_object_updated(tag_obj){
        this.setState({withdraw_ether_page_tags_object: tag_obj})
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }

    render_top_title(){
        var selected_item = this.get_selected_item(this.state.withdraw_ether_page_tags_object, this.state.withdraw_ether_page_tags_object['i'].active)

        if(selected_item == this.props.app_state.loc['1993']/* 'withdraw-ether' */){
            return(
                <div>
                    <div className="row">
                        <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                            <Tags font={this.props.app_state.font} page_tags_object={this.state.withdraw_ether_page_tags_object} tag_size={'l'} when_tags_updated={this.when_withdraw_ether_page_tags_object_updated.bind(this)} theme={this.props.theme}/>
                        </div>
                        <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                            <div className="text-end" style={{'padding': '0px 10px 0px 0px'}}>
                                <img className="text-end" onClick={()=>this.finish()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.withdraw_ether_page_tags_object} tag_size={'l'} when_tags_updated={this.when_withdraw_ether_page_tags_object_updated.bind(this)} theme={this.props.theme}/>
                </div>
            )
        }
    }


    render_everything(){
        var selected_item = this.get_selected_item(this.state.withdraw_ether_page_tags_object, this.state.withdraw_ether_page_tags_object['i'].active)

        if(selected_item == this.props.app_state.loc['1995']/* 'withdraw-ether' */){
            return(
                <div>
                    {this.render_withdraw_ether_part()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1996']/* 'pending-withdraws' */){
            return(
                <div>
                    {this.render_pending_withdraws_item_logs()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1997']/* 'withdraw-history' */){
            return(
                <div>
                    {this.render_withdraws_item_logs()}
                </div>
            )
        }
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



    render_withdraw_ether_part(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_withdraw_ether_part_data()}
                    {this.show_network_fee()}
                    {this.render_detail_item('0')}
                    {this.show_gas_price_or_eip_options()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_withdraw_ether_part_data()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.show_network_fee()}
                        <div style={{height:10}}/>
                        {this.show_gas_price_or_eip_options()}
                        <div style={{height:10}}/>
                        {this.render_empty_views()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_withdraw_ether_part_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.show_network_fee()}
                        <div style={{height:10}}/>
                        {this.show_gas_price_or_eip_options()}
                        <div style={{height:10}}/>
                        {this.render_empty_views()}
                    </div>
                </div>
                
            )
        }
    }

    render_withdraw_ether_part_data(){
        var e5 = this.state.e5
        var gas_price = this.props.app_state.gas_price[e5['id']]
        if(gas_price == null){
            gas_price = this.get_gas_price_from_runs(e5)
        }

        var x = (this.props.app_state.withdraw_balance[e5['id']] / this.props.app_state.account_balance[e5['id']]) * 100

        var impact_percetage = Math.round(x * 1000) / 1000

        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['1998']/* 'Your withdraw balance is shown below' */, 'title':this.props.app_state.loc['1999']/* 'Withdraw balance' */})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2000']/* 'Withdraw balance in Wei' */, 'number':this.props.app_state.withdraw_balance[e5['id']], 'relativepower':'wei'})}>
                    {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['2000']/* 'Withdraw balance in Wei' */, 'subtitle':this.format_power_figure(this.props.app_state.withdraw_balance[e5['id']]), 'barwidth':this.calculate_bar_width(this.props.app_state.withdraw_balance[e5['id']]), 'number':this.format_account_balance_figure(this.props.app_state.withdraw_balance[e5['id']]), 'relativepower':'wei'})}

                    {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['2001']/* 'Withdraw balance in Ether' */, 'subtitle':this.format_power_figure(this.props.app_state.withdraw_balance[e5['id']]/10**18), 'barwidth':this.calculate_bar_width(this.props.app_state.withdraw_balance[e5['id']]/10**18), 'number':(this.props.app_state.withdraw_balance[e5['id']]/10**18), 'relativepower':'Ether'})}

                    {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['2002']/* 'Impact' */, 'subtitle':this.format_power_figure(impact_percetage), 'barwidth':this.calculate_bar_width(impact_percetage), 'number':'+'+(impact_percetage)+'%', 'relativepower':this.props.app_state.loc['400']/* Proportion' */})}
                </div>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['2003']/* 'Receiver Wallet Address' */, 'details':this.state.recipient_address, 'size':'s'})}
                <div style={{height: 10}}/>

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['2004']/* Set Receiver Address Here' */} when_text_input_field_changed={this.when_text_input_field_changed.bind(this)} text={this.state.recipient_address} theme={this.props.theme}/>
                <div style={{height: 10}} theme={this.props.theme}/>


                <div onClick={() => this.set_my_address()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2005']/* 'Set My Address' */, 'action':''})}
                </div>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['2006']/* 'Withdraw Transaction Expiry Duration' */, 'details':this.props.app_state.loc['2007']/* 'The duration of time after which your withdrawal transaction will be reverted if it stays too long in the mempool. The default duration used is 1 hour.' */, 'size':'l'})}
                <div style={{height:20}}/>
                
                {this.render_detail_item('3', {'title':this.get_time_diff(this.state.run_time_expiry), 'details':this.props.app_state.loc['2008']/* 'Estimated Time.' */, 'size':'l'})}

                <DurationPicker font={this.props.app_state.font} when_number_picker_value_changed={this.when_run_expiry_time_set.bind(this)} theme={this.props.theme} loc={this.props.app_state.loc}/>   
            </div>
        )
    }

    show_network_fee(){
        var e5 = this.state.e5
        var gas_price = this.props.app_state.gas_price[e5['id']]
        if(gas_price == null){
            gas_price = this.get_gas_price_from_runs(e5)
        }

        return(
            <div>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2013']/* 'Network Gas Price in Wei' */, 'number':gas_price, 'relativepower':'wei'})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2013']/* 'Network Gas Price in Wei' */, 'subtitle':this.format_power_figure(gas_price), 'barwidth':this.calculate_bar_width(gas_price), 'number':this.format_account_balance_figure(gas_price), 'barcolor':'', 'relativepower':'wei', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2014']/* 'Network Gas Price in Gwei' */, 'subtitle':this.format_power_figure(gas_price/10**9), 'barwidth':this.calculate_bar_width(gas_price/10**9), 'number':this.format_account_balance_figure(gas_price/10**9), 'barcolor':'', 'relativepower':'gwei', })}
                </div>
                <div style={{height: 10}}/>
            </div>
        )
    }

    show_gas_price_or_eip_options(){
        var e5 = this.state.e5['id']
        if(this.props.app_state.e5s[e5] == null) return;
        
        if(this.props.app_state.e5s[e5].type == '1559'){
            return;
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1593q']/* 'Transaction Max Priority Fee Per Gas.' */, 'details':this.props.app_state.loc['2027a']/* 'The max priority fee per gas(miner tip) for your next wirdraw run.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1593q']/* 'Transaction Max Priority Fee Per Gas.' */, 'number':this.state.picked_max_priority_per_gas_amount, 'relativepower':'wei'})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1593q']/* 'Transaction Max Priority Fee Per Gas.' */, 'subtitle':this.format_power_figure(this.state.picked_max_priority_per_gas_amount), 'barwidth':this.calculate_bar_width(this.state.picked_max_priority_per_gas_amount), 'number':this.format_account_balance_figure(this.state.picked_max_priority_per_gas_amount), 'barcolor':'', 'relativepower':'wei', })}
                    </div>

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_max_priority_amount.bind(this)} theme={this.props.theme} power_limit={63}/>




                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1593s']/* 'Max Fee per Gas.' */, 'details':this.props.app_state.loc['2027b']/* 'The maximum amount of gas fee your willing to pay for your next withdraw run.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1593s']/* 'Max Fee per Gas.' */, 'number':this.state.picked_max_fee_per_gas_amount, 'relativepower':'wei'})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1593s']/* 'Max Fee per Gas.' */, 'subtitle':this.format_power_figure(this.state.picked_max_fee_per_gas_amount), 'barwidth':this.calculate_bar_width(this.state.picked_max_fee_per_gas_amount), 'number':this.format_account_balance_figure(this.state.picked_max_fee_per_gas_amount), 'barcolor':'', 'relativepower':'wei', })}
                    </div>

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_max_fee_per_gas_amount.bind(this)} theme={this.props.theme} power_limit={63}/>

                    <div style={{height:10}}/>
                    {this.render_gas_price_options()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2009']/* 'Transaction Gas Price' */, 'details':this.props.app_state.loc['2010']/* 'The gas price for your withdraw run. The default is set to the amount set by the network.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1433']/* 'Transaction Gas Price' */, 'number':this.state.run_gas_price, 'relativepower':'wei'})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1433']/* 'Transaction Gas Price' */, 'subtitle':this.format_power_figure(this.state.run_gas_price), 'barwidth':this.calculate_bar_width(this.state.run_gas_price), 'number':this.format_account_balance_figure(this.state.run_gas_price), 'barcolor':'', 'relativepower':'wei', })}
                    </div>

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_run_gas_price.bind(this)} theme={this.props.theme} power_limit={63} decimal_count={9} pick_with_text_area={true}/>

                    <div style={{height:10}}/>
                    {this.render_gas_price_options()}
                </div>
            )
        }
    }

    render_gas_price_options(){
        var e5 = this.state.e5['id']
        var gas_price = this.props.app_state.gas_price[e5]
        if(gas_price == null){
            gas_price = this.get_gas_price_from_runs()
        }

        if(gas_price == null || isNaN(gas_price)) return;
        
        var items = [
            {'title':this.props.app_state.loc['1593cg']/* 'slow' */, 'price':Math.round(1.2 * gas_price)},
            {'title':this.props.app_state.loc['1593ch']/* 'average' */, 'price':Math.round(1.7 * gas_price)},
            {'title':this.props.app_state.loc['1593ci']/* 'fast' */, 'price':Math.round(2.6 * gas_price)},
            {'title':this.props.app_state.loc['1593cj']/* 'asap' */, 'price':Math.round(4.1 * gas_price)},
        ]

        if(this.props.app_state.e5s[e5].type == '1559'){
            items = [
                {'title':this.props.app_state.loc['1593cg']/* 'slow' */, 'price':Math.round(1.2 * gas_price), 'max_priority_fee':2_000_000_000 },
                {'title':this.props.app_state.loc['1593ch']/* 'average' */, 'price':Math.round(1.8 * gas_price), 'max_priority_fee':3_000_000_000},
                {'title':this.props.app_state.loc['1593ci']/* 'fast' */, 'price':Math.round(2.9 * gas_price), 'max_priority_fee':4_000_000_000},
                {'title':this.props.app_state.loc['1593cj']/* 'asap' */, 'price':Math.round(4.6 * gas_price), 'max_priority_fee':5_000_000_000},
            ]
        }

        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_custom_price_picked(item)}>
                            {this.render_detail_item('3', {'title':item['title'], 'details':this.round_off(item['price']/10**9)+' gwei', 'size':'s'})}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    round_off(float_number){
        return (Math.round(float_number * 100) / 100)
    }

    when_custom_price_picked(item){
        this.props.notify(item['title']+this.props.app_state.loc['1593cf']/* ' price set.' */, 1200)
        var e5 = this.state.e5['id']
        if(this.props.app_state.e5s[e5].type == '1559'){
            this.when_max_fee_per_gas_amount(item['price'] + item['max_priority_fee'])
            this.when_max_priority_amount(item['max_priority_fee'])
        }else{
            this.when_run_gas_price(item['price'])
        }
    }


    when_text_input_field_changed(text){
        this.setState({recipient_address: text})
    }

    when_run_expiry_time_set(number){
        this.setState({run_time_expiry: number})
    }

    when_run_gas_price(number){
        this.setState({run_gas_price: number})
    }

    when_max_priority_amount(number){
        this.setState({picked_max_priority_per_gas_amount: number+0})
    }

    when_max_fee_per_gas_amount(number){
        this.setState({picked_max_fee_per_gas_amount: number+0})
    }

    isValidAddress = (adr) => {
        try {
            const web3 = new Web3()
            web3.utils.toChecksumAddress(adr)
            return true
        } catch (e) {
            return false
        }
    }


    set_my_address(){
        if(this.props.app_state.has_wallet_been_set){
            this.setState({recipient_address: this.get_account_address()})
        }else{
            this.props.notify(this.props.app_state.loc['2015']/* 'Please set your wallet first.' */, 4500)
        }
    }

    get_account_address(){
        var e5 = this.state.e5
        
        if(this.props.app_state.accounts[e5['id']] != null){
            return this.format_address(this.props.app_state.accounts[e5['id']].address, e5['id']);
        }
    }

    format_address(address, e5){
        if(e5 == 'E45'){
            return toBech32(address)
        }
        else if(e5 == 'E115'){
            return this.replace_0x_with_xdc(address)
        }
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



    finish(){
        var e5 = this.state.e5
        

        if(!this.isValidAddress(this.state.recipient_address)){
            this.props.notify(this.props.app_state.loc['2016']/* 'Please set a valid receiver' */, 3500)
        }
        else if(this.props.app_state.withdraw_balance[e5['id']] == 0){
            this.props.notify(this.props.app_state.loc['2017']/* 'You cant withdraw 0 ether.' */, 3500)
        }
        else if(!this.props.app_state.has_wallet_been_set){
            this.props.notify(this.props.app_state.loc['2906']/* 'You need to set your wallet first.' */, 5000)
        }
        else{
            // this.setState({confirmation_dialog_box: true}) 
            this.props.show_dialog_bottomsheet({'e5':this.state.e5, 'recipient_address':this.state.recipient_address}, 'confirm_withdraw_ether')
        }
    }



    render_dialog_ui(){
        var e5 = this.state.e5
        return(
            <Dialog PaperProps={{ sx: { borderRadius: "15px" } }} onClose = {() => this.cancel_dialog_box()} open = {this.state.confirmation_dialog_box}>
                <div style={{'padding': '10px', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                    <h3 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2027c']/* Confirmation */}</h3>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2018']/* 'Withdraw Ether Confirmation' */, 'details':this.props.app_state.loc['2019']/* 'Confirm that you want to withdraw Ether to the set address' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['2020']/* 'Withdraw balance in Wei' */, 'subtitle':this.format_power_figure(this.props.app_state.withdraw_balance[e5['id']]), 'barwidth':this.calculate_bar_width(this.props.app_state.withdraw_balance[e5['id']]), 'number':this.format_account_balance_figure(this.props.app_state.withdraw_balance[e5['id']]), 'relativepower':'wei'})}

                        {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['2021']/* 'Withdraw balance in Ether' */, 'subtitle':this.format_power_figure(this.props.app_state.withdraw_balance[e5['id']]/10**18), 'barwidth':this.calculate_bar_width(this.props.app_state.withdraw_balance[e5['id']]/10**18), 'number':(this.props.app_state.withdraw_balance[e5['id']]/10**18), 'relativepower':'Ether'})}
                    </div>
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2022']/* 'Target Wallet Address' */, 'details':start_and_end(this.state.recipient_address), 'size':'s'})}
                    <div style={{height: 10}}/>

                    <div style={{height: 10}}/>
                    <div onClick={() => this.when_withdraw_ether_confirmation_received()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2023']/* 'Withdraw Ether' */, 'action':''})}
                    </div>
                </div>
                
            </Dialog>
        )
    }

    cancel_dialog_box(){
        this.setState({confirmation_dialog_box: false})
    }

    when_withdraw_ether_confirmation_received(){
        this.setState({confirmation_dialog_box: false})
        var e5 = this.state.e5['id']
        var run_expiry_duration = this.state.run_time_expiry == 0 ? (60*60*1/* 1 hour */) : this.state.run_time_expiry
        var addr = this.format_to_address(this.state.recipient_address, e5)
        this.props.withdraw_ether_to_address(addr, e5, run_expiry_duration, this.state.run_gas_price, this.state.picked_max_priority_per_gas_amount, this.state.picked_max_fee_per_gas_amount)
    }


    set_object(item){
        this.setState({e5: item})
    }


    format_to_address(address, e5){
        if(e5 == 'E45'){
            return fromBech32(address)
        }
        if(e5 == 'E115'){
            return this.replace_xdc_with_0x(address)
        }
        // if(e5 == 'E175'){
        //     return evmosToEth(address)
        // }
        if(e5 == 'E425'){
            return this.convert_from_iotx(address)
        }
        return address
    }


    replace_xdc_with_0x(address){
        if(address.toString().startsWith('0x')) return address
        return '0x'+address.toString().slice(3)
    }

    convert_from_iotx(address){
        const addr2 = from(address.toString());
        return addr2.stringEth()
    }









    render_withdraws_item_logs(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_withdraws_item_logs_data()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_withdraws_item_logs_data()}
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
                        {this.render_withdraws_item_logs_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }



    render_withdraws_item_logs_data(){
        var items = this.props.app_state.withdraw_event_data[this.state.e5['id']]
        var middle = this.props.height - 170;
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
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
                <div style={{ overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_withdraws_item_clicked(index)}>
                                    {this.render_withdraws_event_item(item, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_withdraws_item_clicked(index){
        if (this.state.selected_withdraws_event_item == index) {
            this.setState({ selected_withdraws_event_item: null })
        } else {
            this.setState({ selected_withdraws_event_item: index })
        }
    }

    copy_to_clipboard(signature_data){
        navigator.clipboard.writeText(signature_data)
        this.props.notify(this.props.app_state.loc['2024']/* 'copied address to clipboard' */, 1600)
    }

    render_withdraws_event_item(item, index){
        var amount = item.returnValues.p5
        var e5 = this.state.e5['id']

        var gas_price = this.props.app_state.gas_price[e5]
        if(gas_price == null || gas_price > 10**18){
            gas_price = this.get_gas_price_from_runs()
        }
        var gas_transactions = amount == 0 ? 0 : Math.floor((amount/gas_price)/2_300_000)

        if (this.state.selected_withdraws_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': item.returnValues.p4, 'details': this.props.app_state.loc['2025']/* 'transaction ID' */, 'size': 's' })}
                    <div style={{ height: 2 }}/>
                    <div onClick={() => this.copy_to_clipboard(item.returnValues.p3)}>
                        {this.render_detail_item('3', { 'details': (item.returnValues.p3), 'title': this.props.app_state.loc['2026']/* 'target' */, 'size': 's' })}
                    </div>
                    <div style={{ height: 2 }}/>

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title':this.props.app_state.loc['1746']/* 'Amount in Wei' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': 'wei', })}

                        {this.render_detail_item('2', { 'style': 'l', 'title':this.props.app_state.loc['1747']/* 'Amount in Ether' */, 'subtitle': this.format_power_figure(amount/10**18), 'barwidth': this.calculate_bar_width(amount/10**18), 'number': (amount/10**18), 'barcolor': '', 'relativepower': 'ether', })}

                        {/* {this.render_detail_item('2', { 'style': 'l', 'title':'Transactions (2.3M Gas average)', 'subtitle': this.format_power_figure(gas_transactions), 'barwidth': this.calculate_bar_width(gas_transactions), 'number': this.format_account_balance_figure(gas_transactions), 'barcolor': '', 'relativepower': 'transactions', })} */}
                    </div>
                    <div style={{ height: 2 }}/>

                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 's' })}
                    <div style={{ height: 2 }}/>
                    {this.render_detail_item('3', { 'title': item.returnValues.p7, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title':this.props.app_state.loc['1746']/* 'Amount in Wei' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': 'wei', })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '5px 20px 5px 20px' }} />
                </div>
            )
        }
    }




    render_pending_withdraws_item_logs(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_pending_withdraws_item_logs_data()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_pending_withdraws_item_logs_data()}
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
                        {this.render_pending_withdraws_item_logs_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }


    render_pending_withdraws_item_logs_data(){
        var items = this.props.app_state.pending_withdraw_event_data[this.state.e5['id']]
        var middle = this.props.height - 120;
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px' }}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
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
                <div style={{ overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' , 'list-style':'none'}}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_pending_withdraws_item_clicked(index)}>
                                    {this.render_pending_withdraws_event_item(item, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_pending_withdraws_item_clicked(index){
        if (this.state.selected_pending_withdraws_event_item == index) {
            this.setState({ selected_pending_withdraws_event_item: null })
        } else {
            this.setState({ selected_pending_withdraws_event_item: index })
        }
    }

    render_pending_withdraws_event_item(item, index){
        var amount = item.returnValues.p2
        var e5 = this.state.e5['id']

        var gas_price = this.props.app_state.gas_price[e5]
        if(gas_price == null || gas_price > 10**18){
            gas_price = this.get_gas_price_from_runs()
        }
        var gas_transactions = amount == 0 ? 0 : Math.floor((amount/gas_price)/2_300_000)

        if (this.state.selected_pending_withdraws_event_item == index) {
            return (
                <div>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title':this.props.app_state.loc['1746']/* 'Amount in Wei' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': 'wei', })}

                        {this.render_detail_item('2', { 'style': 'l', 'title':this.props.app_state.loc['1747']/* 'Amount in Ether' */, 'subtitle': this.format_power_figure(amount/10**18), 'barwidth': this.calculate_bar_width(amount/10**18), 'number': (amount/10**18), 'barcolor': '', 'relativepower': 'ether', })}

                        {/* {this.render_detail_item('2', { 'style': 'l', 'title':'Transactions (2.3M Gas average)', 'subtitle': this.format_power_figure(gas_transactions), 'barwidth': this.calculate_bar_width(gas_transactions), 'number': this.format_account_balance_figure(gas_transactions), 'barcolor': '', 'relativepower': 'transactions', })} */}
                    </div>
                    <div style={{ height: 2 }}/>

                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p3), 'details':this.props.app_state.loc['1748']/* 'Age' */, 'size': 's' })}
                    <div style={{ height: 2 }}/>
                    {this.render_detail_item('3', { 'title': item.returnValues.p4, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title':this.props.app_state.loc['2027']/* 'Amount Added in Wei' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': 'wei', })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '5px 20px 5px 20px' }} />
                </div>
            )
        }
    }










    get_gas_price_from_runs(){
        var last_events = this.props.app_state.all_E5_runs[this.state.e5['id']]
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

    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var size = this.props.screensize
        var width = size == 'm' ? this.props.app_state.width/2 : this.props.app_state.width
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data}  theme={this.props.theme} width={width}/>
            </div>
        )

    }


    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
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




export default WithdrawEtherPage;