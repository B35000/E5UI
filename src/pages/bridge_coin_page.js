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

function start_and_end(str) {
  if (str.length > 35) {
    return str.substr(0, 20) + '...' + str.substr(str.length-10, str.length);
  }
  return str;
}

function start_and_end2(str) {
  if (str.length > 18) {
    return str.substr(0, 6) + '...' + str.substr(str.length-6, str.length);
  }
  return str;
}

class BridgeCoinPage extends Component {
    
    state = {
        selected: 0, coin: null, 
        get_bridge_coins_tags_object: this.get_bridge_coins_tags_object(),
        picked_sats_amount: 0, recipient_address:'', cypher_passcode:'', picked_sats_fee_amount:0
    };



    get_bridge_coins_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['3109']/* 'bridge-coin' */], [1]
            ],
        };
    }

    set_token(item){
        this.setState({coin: item})
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
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.get_bridge_coins_tags_object} tag_size={'l'} when_tags_updated={this.when_get_bridge_coin_tags_object_updated.bind(this)} theme={this.props.theme}/>
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

    when_get_bridge_coin_tags_object_updated(tag_obj){
        this.setState({get_bridge_coins_tags_object: tag_obj})
    }





    render_everything(){
        var size = this.props.size
        if(this.state.coin == null) return;

        if(size == 's'){
            return(
                <div>
                    {this.render_bridge_details()}
                    {this.render_detail_item('0')}
                    {this.render_bridge_details2()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_bridge_details()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_bridge_details2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_bridge_details()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_bridge_details2()}
                    </div>
                </div>
            )
        }
    }

    render_bridge_details(){
        const item = this.state.coin
        const balance_decimal = this.get_balance_in_decimal(item)
        const balance_base_unit = this.get_balance_in_base_units(item)
        const data = this.props.app_state.coin_data[item['symbol']]
        const address = data['address']
        const shortened_address = start_and_end(data['address'])
        const tx_fee_decimal = this.get_transaction_fee_decimal(item)
        const tx_fee_base_units = this.get_transaction_fee_base_unit(item)

        var per = '...'
        var type = '...'
        if(data != null){
            per = data['fee'] == null ? '...' : data['fee']['per']
            type = data['fee'] == null ? '...' : data['fee']['type']
        }

        const tx_fee_decimal_per_tx = per == 'gas' ? tx_fee_decimal * 8_000_000 : tx_fee_decimal

        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3109a']/* '𖣑 Bridge Your Coin.' */, 'details':this.props.app_state.loc['3109b']/* '𖣑 Bridge some coin from your $ wallet to its corresponding EVM equivalient.' */.replace('$', item['symbol']), 'size':'l'})}
                {this.render_detail_item('10', {'text':this.props.app_state.loc['3109d']/* 'This bridge is one way. Meaning you can\'t bridge your ether back from your ether\'s wallet to $' */.replace('$', item['symbol']), 'textsize':'12px', 'font':this.props.app_state.font})}

                <div style={{height: 10}}/>
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2919']/* 'Your balance in ' */+item['base_unit'], 'number':balance_base_unit, 'relativepower':item['base_unit']})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2919']/* 'Your balance in ' */+item['symbol'], 'subtitle':this.format_power_figure(balance_decimal), 'barwidth':this.calculate_bar_width(balance_decimal), 'number':(balance_decimal), 'barcolor':'#606060', 'relativepower':item['symbol'], })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2919']/* 'Your balance in ' */+item['base_unit'], 'subtitle':this.format_power_figure(balance_base_unit), 'barwidth':this.calculate_bar_width(balance_base_unit), 'number':this.format_account_balance_figure(balance_base_unit), 'barcolor':'#606060', 'relativepower':item['base_unit'], })}
                </div>
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">{this.props.app_state.loc['2921']/* 'Transaction Fee Amount' */}</p>

                    {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(tx_fee_decimal), 'number':(tx_fee_decimal), 'barcolor':'#606060', 'relativepower':item['symbol']+' / '+(per == 'transaction' ? 'tx':per), })}
                    
                    {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(tx_fee_base_units), 'number':this.format_account_balance_figure(tx_fee_base_units), 'barcolor':'#606060', 'relativepower':item['base_unit']+' / '+(per == 'transaction' ? 'tx':per), })}

                    {per == 'gas' && this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(tx_fee_decimal_per_tx), 'number':(tx_fee_decimal_per_tx), 'barcolor':'#606060', 'relativepower':item['symbol']+' / '+(per == 'transaction' ? 'tx':'tx'), })}
                </div>
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1372']/* 'Sender Wallet Address' */, 'details':shortened_address, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1373']/* 'Receiver Wallet Address' */, 'details':this.state.recipient_address, 'size':'l'})}
                <div style={{height: 10}}/>

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['1374']/* 'Set Receiver Address Here' */} when_text_input_field_changed={this.when_text_input_field_changed.bind(this)} text={this.state.recipient_address} theme={this.props.theme}/>

                {this.props.app_state.locked_wallet_hashed_password != '' && (
                    <div>
                        {this.render_detail_item('0')}
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['2954m']/* 'Wallet Password.' */, 'details':this.props.app_state.loc['2954n']/* 'If you locked your wallet, set the password used here.' */, 'size':'l'})}
                        <div style={{height: 10}}/>

                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3055nm']/* 'Passcode...' */} when_text_input_field_changed={this.when_passcode_input_field_changed.bind(this)} text={this.state.cypher_passcode} theme={this.props.theme} adjust_height={false} type={'password'} />
                    </div>
                )}
            </div>
        )
    }

    render_bridge_details2(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3095a']/* 'Amount to Bridge.' */, 'details':this.props.app_state.loc['3109c']/* 'Set the amount you wish to bridge to the EVM address.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px', 'font-family': this.props.app_state.font}} className="fw-bold">{this.props.app_state.loc['1407i']/* Picked Amount. */}</p>
                    {this.render_detail_item('2', this.get_picked_amount_in_base_units())}
                    {this.render_detail_item('2', this.get_picked_amount_in_decimal())}
                </div>

                {this.render_amount_number_picker()}

                <div style={{'padding': '5px'}} onClick={()=>this.set_maximum()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1384']/* 'Set Maximum' */, 'action':''})}
                </div>

                {this.show_gas_price_options()}
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

    get_transaction_fee_decimal(item){
        var data = this.props.app_state.coin_data[item['symbol']]
        if(data != null){
            var amount = data['fee']['fee']
            if(amount == 0){
                return 0
            }else{
                var x = parseFloat(amount) / item['conversion']
                var y = parseFloat(parseInt(x * item['conversion'])) / item['conversion']
                return y
            }
        }else{
            return 0
        }
    }

    get_transaction_fee_base_unit(item){
        var data = this.props.app_state.coin_data[item['symbol']]
        if(data != null){
            var deposit = data['fee']['fee']
            if(deposit == 0){
                return 0
            }else{
                return parseInt(deposit).toString()
            }
        }else{
            return 0
        } 
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
                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_number_picker_value_changed.bind(this)} theme={this.props.theme} power_limit={23} decimal_count={this.get_coin_decimal_count()} pick_with_text_area={true}/>
            </div>
        )
    }

    get_coin_decimal_count(){
        return this.state.coin['decimals']
    }

    when_number_picker_value_changed(amount){
        this.setState({picked_sats_amount: amount})
    }

    set_maximum = async () => {
        var set_fee = await this.get_default_transaction_fee()
        var item = this.state.coin
        var data = this.props.app_state.coin_data[item['symbol']]
        var accounts_balance = data['balance'] - data['min_deposit']

        if(this.state.picked_sats_fee_amount != 0){
            set_fee = this.state.picked_sats_fee_amount
        }

        if(accounts_balance > set_fee){
            var remaining = accounts_balance - set_fee
            this.when_number_picker_value_changed(remaining)
        }else{
            this.props.notify(this.props.app_state.loc['2934']/* 'Your balance is too low to make a transaction.' */, 4000)
        }
    }

    get_default_transaction_fee = async () => {
        var item = this.state.coin
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

        // if(item['symbol'] == 'AR'){
        //     var target = this.props.validate_arweave_address(this.state.recipient_address) ? this.state.recipient_address : '-zdLm14FOLtTWxTEVzhh2N9AGCnW_-O_6DIcLxgk-W0'
        //     var current_network_fees = await this.props.estimate_arweave_network_fees(target)
        //     final_amount = parseInt(current_network_fees)
        // }
        return final_amount
    }

    get_utxos_that_will_be_consumed(data){
        var item = this.state.coin
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
        return utxos_count
    }

    get_utxo_tx_size(_in, out){
        if(_in == 0) return 0
        return (_in*148 + out*34 + 10 +- _in)
    }

    get_picked_amount_in_base_units(){
        var item = this.state.coin
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
        var item = this.state.coin
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

    get_account_address(){
        var e5 = 'E35'
        if(this.props.app_state.accounts[e5] != null){
            return this.format_address(this.props.app_state.accounts[e5].address, e5);
        }
    }

    format_address(address, e5){
        if(e5 == 'E45'){
            return toBech32(address)
        }
        else if(e5 == 'E115'){
            return this.replace_0x_with_xdc(address)
        }
        // else if(e5 == 'E175'){
        //     return ethToEvmos(address)
        // }
        // else if(e5 == 'E425'){
        //     return this.convert_to_iotx(address)
        // }
        return address
    }

    // convert_to_iotx(address){
    //     const addr = from(address.toString());
    //     return addr.string();
    // }

    replace_0x_with_xdc(address){
        return 'xdc'+address.toString().slice(2)
    }





    show_gas_price_options(){
        var item = this.state.coin
        var data = this.props.app_state.coin_data[item['symbol']]
        if(data['fee']['type'] == 'variable'){
            return(
                <div style={{}}>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2931']/* 'Transaction Fee.' */, 'details':this.props.app_state.loc['2932']/* 'Set the amount you wish to pay for your transaction.' */, 'size':'l'})}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px', 'font-family': this.props.app_state.font}} className="fw-bold">{this.props.app_state.loc['1407j']/* Picked Transaction fee. */}</p>
                        
                        {this.render_detail_item('2', this.get_picked_fee_amount_in_decimal())}
                        {this.render_detail_item('2', this.get_picked_fee_amount_in_base_units())}
                    </div>

                    {/* <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'details':data['fee']['per'], 'title':this.props.app_state.loc['2922']'Per', 'size':'l'})} */}

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_new_gas_price_figure_set.bind(this)} theme={this.props.theme} power_limit={17} decimal_count={this.get_coin_decimal_count()} pick_with_text_area={true}/>
                </div>
            )
        }
        
    }

    get_picked_fee_amount_in_base_units(){
        var item = this.state.coin
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(this.state.picked_sats_fee_amount),
            'number':this.format_account_balance_figure(this.state.picked_sats_fee_amount),
            'barcolor':'#606060',
            'relativepower':item['base_unit']+'s',
        }
    }

    get_picked_fee_amount_in_decimal(){
        var item = this.state.coin
        var amount = parseFloat(this.state.picked_sats_fee_amount / item['conversion'])
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

    when_new_gas_price_figure_set(amount){
        var item = this.state.coin
        var data = this.props.app_state.coin_data[item['symbol']]
        if(data['fee']['type'] == 'variable'){
            this.setState({picked_sats_fee_amount: amount})
        }
    }







    async finish(){
        var set_fee = await this.get_default_transaction_fee()
        const picked_amount = this.state.picked_sats_amount;
        const recipient_address = this.state.recipient_address;
        const fee = this.state.picked_sats_fee_amount;
        const item = this.state.coin
        const data = this.props.app_state.coin_data[item['symbol']]

        if(fee != 0){
            set_fee = fee
        }

        const money_out = bigInt(set_fee).plus(picked_amount)
        const accounts_balance = data['balance']
        const balance_decimal = this.get_balance_in_decimal(item)
        const balance_base_unit = this.get_balance_in_base_units(item)

        if(!this.isValidAddress(recipient_address)){
            this.props.notify(this.props.app_state.loc['1407']/* 'Please set a valid recipient.' */, 4500)
        }
        else if(picked_amount == 0){
            this.props.notify(this.props.app_state.loc['1406']/* 'Please set a valid amount.' */, 4500)
        }
        else if(money_out > accounts_balance){
            this.props.notify(this.props.app_state.loc['2937']/* 'You don\'t have enough coin to make that transaction.' */, 4000)
        }
        else if(this.props.app_state.locked_wallet_hashed_password != '' && this.state.cypher_passcode.trim() == ''){
            this.props.notify(this.props.app_state.loc['1593mg']/* 'You need to set your password.' */, 4000)
        }
        else if(this.props.app_state.locked_wallet_hashed_password != '' && !this.does_password_match_hash(this.state.cypher_passcode.trim())){
            this.props.notify(this.props.app_state.loc['2954o']/* 'The password you\'ve set is incorrect.' */, 4000)
        }
        else{
            this.props.show_dialog_bottomsheet({'picked_amount':picked_amount, 'coin':this.state.coin, 'recipient_address':recipient_address, 'gas_price':set_fee, 'balance_decimal':balance_decimal, 'balance_base_unit':balance_base_unit, 'sender_address':data['address']}, 'confirm_bridge_coin_dialog')
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
        var e5 = 'E35'
        try {
            const web3 = new Web3()
            web3.utils.toChecksumAddress(this.format_address(adr, e5))
            return true
        } catch (e) {
            return false
        }
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




export default BridgeCoinPage;