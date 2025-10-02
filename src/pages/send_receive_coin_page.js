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
import Tags from './../components/tags';
import ViewGroups from './../components/view_groups'
import QRCode from "react-qr-code";
import NumberPicker from './../components/number_picker';
import TextInput from './../components/text_input';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class SendReceiveCoinPage extends Component {
    
    state = {
        selected: 0,
        coin:null,
        get_send_receive_coin_tags_obj:this.get_send_receive_coin_tags_obj(),
        recipient_address:'', picked_sats_amount:0, picked_sats_fee_amount:0,
        memo_text:'',
        get_kill_substrate_wallet_tags_obj:this.get_kill_substrate_wallet_tags_obj()
    };


    get_send_receive_coin_tags_obj(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1369']/* 'send' */, this.props.app_state.loc['1370']/* 'receive' */], [1]
            ],
        };
    }

    get_kill_substrate_wallet_tags_obj(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['1407k']/* 'transfer-all' */], [0]
            ],
        };
    }

    set_object(item){
        this.setState({coin: item})
    }

    render(){
        return(
            <div style={{'margin':'10px 10px 0px 10px'}}>
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.get_send_receive_coin_tags_obj} tag_size={'l'} when_tags_updated={this.when_get_send_receive_coin_tags_obj_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            {this.render_send_button()}
                        </div>
                    </div>
                </div>
                
                
                {this.render_everything()}
            </div> 
        )
    }

    when_get_send_receive_coin_tags_obj_updated(tag_obj){
        this.setState({get_send_receive_coin_tags_obj: tag_obj})
    }

    render_send_button(){
        var selected_item = this.get_selected_item(this.state.get_send_receive_coin_tags_obj, this.state.get_send_receive_coin_tags_obj['i'].active)
        if(selected_item == this.props.app_state.loc['1369']/* 'send' */ || selected_item == 'e'){
            return(
                <div>
                    <img alt="" className="text-end" onClick={()=>this.open_confirm_send()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                </div>
            )
        }
    }


    render_everything(){
        var selected_item = this.get_selected_item(this.state.get_send_receive_coin_tags_obj, this.state.get_send_receive_coin_tags_obj['i'].active)

        if(this.state.coin == null) return;

        if(selected_item == this.props.app_state.loc['1369']/* 'send' */ || selected_item == 'e'){
            return(
                <div>
                    {this.render_send_coin_ui()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_receive_coin_ui()}
                </div>
            )
        }

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


    render_send_coin_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_send_coin_parts()}
                    <div style={{height: 30}}/>
                    {this.render_send_coin_parts2()}
                    <div style={{height: 30}}/>
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_send_coin_parts()}
                        <div style={{height: 10}}/>
                        {this.show_empty_views_if_needbe()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_send_coin_parts2()}
                        <div style={{height: 10}}/>
                        {this.show_empty_views_if_needbe2()}
                    </div>
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_send_coin_parts()}
                        <div style={{height: 10}}/>
                        {this.show_empty_views_if_needbe()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_send_coin_parts2()}
                        <div style={{height: 10}}/>
                        {this.show_empty_views_if_needbe2()}
                    </div>
                </div>
            )
        }
    }

    show_empty_views_if_needbe(){
        var item = this.state.coin
        var data = this.props.app_state.coin_data[item['symbol']]
        if(data['fee']['type'] == 'variable'){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }
    }

    show_empty_views_if_needbe2(){
        var item = this.state.coin
        var data = this.props.app_state.coin_data[item['symbol']]
        if(data['fee']['type'] != 'variable'){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }
    }

    render_send_coin_parts(){
        var item = this.state.coin
        var balance_decimal = this.get_balance_in_decimal()
        var balance_base_unit = this.get_balance_in_base_units()
        var tx_fee_decimal = this.get_transaction_fee_decimal(item)
        var tx_fee_base_units = this.get_transaction_fee_base_unit(item)
        var data = this.props.app_state.coin_data[item['symbol']]
        var per = '...'
        var type = '...'
        if(data != null){
            per = data['fee'] == null ? '...' : data['fee']['per']
            type = data['fee'] == null ? '...' : data['fee']['type']
        }
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px', 'text':this.props.app_state.loc['2929']/* 'Send the coin using the address shown below.' */, 'color':'dark-grey'})}

                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1372']/* 'Sender Wallet Address' */, 'details':this.get_account_address(), 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1373']/* 'Receiver Wallet Address' */, 'details':this.state.recipient_address, 'size':'l'})}
                <div style={{height: 10}}/>

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['1374']/* 'Set Receiver Address Here' */} when_text_input_field_changed={this.when_text_input_field_changed.bind(this)} text={this.state.recipient_address} theme={this.props.theme}/>

                {this.render_detail_item('0')}
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} 
                onClick={() => this.props.view_number({'title':this.props.app_state.loc['2919']/* 'Your balance in ' */+item['base_unit']+'s', 'number':balance_base_unit, 'relativepower':item['base_unit']+'s'})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2919']/* 'Your balance in ' */+item['symbol'], 'subtitle':this.format_power_figure(balance_decimal), 'barwidth':this.calculate_bar_width(balance_decimal), 'number':(balance_decimal), 'barcolor':'#606060', 'relativepower':item['symbol'], })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2919']/* 'Your balance in ' */+item['base_unit']+'s', 'subtitle':this.format_power_figure(balance_base_unit), 'barwidth':this.calculate_bar_width(balance_base_unit), 'number':this.format_account_balance_figure(balance_base_unit), 'barcolor':'#606060', 'relativepower':item['base_unit']+'', })}
                </div>
                <div style={{height: 10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">{this.props.app_state.loc['2930']/* 'Default Transaction Fee' */}</p>

                    {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(tx_fee_decimal), 'number':(tx_fee_decimal), 'barcolor':'#606060', 'relativepower':item['symbol']+' / '+(per == 'transaction' ? 'tx':per), })}
                    
                    {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(tx_fee_base_units), 'number':this.format_account_balance_figure(tx_fee_base_units), 'barcolor':'#606060', 'relativepower':item['base_unit']+' / '+(per == 'transaction' ? 'tx':per), })}

                    {this.render_default_fee_for_utxo_chains()}
                </div>
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'details':per, 'title':this.props.app_state.loc['2922']/* Per' */, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'details':type, 'title':this.props.app_state.loc['2923']/* Fee Type' */, 'size':'l'})}

                {this.show_memo_textarea_if_required()}
            </div>
        )
    }

    show_memo_textarea_if_required(){
        var item = this.state.coin
        if(item['symbol'] == 'XLM' || item['symbol'] == 'ALGO' || item['symbol'] == 'ATOM'|| item['symbol'] == 'STX' || item['symbol'] == 'TIA'){
            return(
                <div>
                    <div style={{height: 10}}/>
                    <TextInput font={this.props.app_state.font} height={20} placeholder={this.props.app_state.loc['2954']/* 'Memo (Optional)' */} when_text_input_field_changed={this.when_memo_text_input_field_changed.bind(this)} text={this.state.memo_text} theme={this.props.theme}/>
                </div>
            )
        }
    }

    when_memo_text_input_field_changed(text){
        this.setState({memo_text: text})
    }

    when_text_input_field_changed(text){
        this.setState({recipient_address: text})
    }

    get_balance_in_decimal(){
        var item = this.state.coin
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

    get_balance_in_base_units(){
        var item = this.state.coin
        var data = this.props.app_state.coin_data[item['symbol']]
        if(data != null && data['balance'] != null){
            return bigInt(data['balance']).toString()
        }else{
            return 0
        }
    }

    get_transaction_fee_decimal(){
        var item = this.state.coin
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

    get_transaction_fee_base_unit(){
        var item = this.state.coin
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
    
    render_default_fee_for_utxo_chains(){
        var item = this.state.coin
        if(item['symbol'] == 'BTC' || item['symbol'] == 'BCH' || item['symbol'] == 'LTC' || item['symbol'] == 'DOGE' || item['symbol'] == 'DASH'){
            var data = this.props.app_state.coin_data[item['symbol']]
            if(data == null || data['fee'] == null || data['fee']['fee'] == null) return;
            var fee = data['fee']['fee']
            var utxo_count = this.get_utxos_that_will_be_consumed(data)
            if(utxo_count == 0) utxo_count = 1
            var default_fee = parseInt(fee * (this.get_utxo_tx_size(utxo_count, 1)))
            var defualt_fee_in_decimal = default_fee / item['conversion']
            return(
                <div>
                    <div style={{height: 10}}/>

                    {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(default_fee), 'number':this.format_account_balance_figure(default_fee), 'barcolor':'#606060', 'relativepower':item['base_unit']+' / '+'tx', })}

                    {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(defualt_fee_in_decimal), 'number':(defualt_fee_in_decimal), 'barcolor':'#606060', 'relativepower':item['symbol']+' / tx', })}
                </div>
            )
        }
    }




    render_send_coin_parts2(){
        var item = this.state.coin
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1381']/* 'Amount to Send' */, 'details':this.props.app_state.loc['1382']/* 'Set the amount to send in the number picker below.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px', 'font-family': this.props.app_state.font}} className="fw-bold">{this.props.app_state.loc['1407i']/* Picked Amount. */}</p>
                    {this.render_detail_item('2', this.get_picked_amount_in_base_units())}
                    {this.render_detail_item('2', this.get_picked_amount_in_decimal())}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_number_picker_value_changed.bind(this)} theme={this.props.theme} power_limit={23} decimal_count={this.get_coin_decimal_count()} pick_with_text_area={true}/>

                <div style={{'padding': '5px'}} onClick={()=>this.set_maximum()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1384']/* 'Set Maximum' */, 'action':''})}
                </div>


                {(item['symbol'] == 'KSM' || item['symbol'] == 'DOT' || item['symbol'] == 'XRP'|| item['symbol'] == 'XLM') && (
                    <div>
                        <div style={{height: 20}}/>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['1407m']/* 'Transfer and Kill' */, 'details':this.props.app_state.loc['1407l']/* 'Transfer all the coin in your address, including the existential deposit, to another address.' */, 'size':'l'})}
                        <div style={{height: 10}}/>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.get_kill_substrate_wallet_tags_obj} tag_size={'l'} when_tags_updated={this.when_get_kill_substrate_wallet_tags_obj_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                )}

                
                {this.show_gas_price_options()}
            </div>
        )
    }

    when_get_kill_substrate_wallet_tags_obj_updated(tag_obj){
        this.setState({get_kill_substrate_wallet_tags_obj: tag_obj})
    }

    get_coin_decimal_count(){
        return this.state.coin['decimals']
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

    when_number_picker_value_changed(number){
        this.setState({picked_sats_amount: number})
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

        if(item['symbol'] == 'AR'){
            var target = this.props.validate_arweave_address(this.state.recipient_address) ? this.state.recipient_address : '-zdLm14FOLtTWxTEVzhh2N9AGCnW_-O_6DIcLxgk-W0'
            var current_network_fees = await this.props.estimate_arweave_network_fees(target)
            final_amount = parseInt(current_network_fees) * 1.5
        }
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

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_new_gas_price_figure_set.bind(this)} theme={this.props.theme} power_limit={17} decimal_count={this.get_coin_decimal_count()}/>
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
        var amount = parseFloat(this.state.picked_sats_fee_amount) / item['conversion']
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

    open_confirm_send = async () => {
        var set_fee = await this.get_default_transaction_fee()
        const transfer_amount = this.state.picked_sats_amount
        const recipient = this.state.recipient_address
        const memo_text = this.state.memo_text
        var item = this.state.coin
        var data = this.props.app_state.coin_data[item['symbol']]
        const kill_wallet = this.get_selected_item(this.state.get_kill_substrate_wallet_tags_obj, 'e')
        if(this.state.picked_sats_fee_amount != 0){
            set_fee = this.state.picked_sats_fee_amount
        }

        const money_out = set_fee + transfer_amount
        const accounts_balance = data['balance']

        if(transfer_amount == 0 && kill_wallet != this.props.app_state.loc['1407k']/* 'transfer-all' */){
            this.props.notify(this.props.app_state.loc['2935']/* 'Please Set an amount to transfer.' */, 4000)
        }
        else if(recipient == ''){
            this.props.notify(this.props.app_state.loc['2938']/* 'Please set a recipient for the transfer.' */, 4000)
        }
        else if((money_out > (accounts_balance - data['min_deposit']) && money_out < accounts_balance) || ((item['symbol'] == 'KSM' || item['symbol'] == 'DOT'|| item['symbol'] == 'XRP'|| item['symbol'] == 'XLM') && kill_wallet != this.props.app_state.loc['1407k']/* 'transfer-all' */)){
            this.props.notify(this.props.app_state.loc['2936']/* 'You can\'t include the minimum deposit in your transaction.' */, 4000)
        }
        else if(money_out > accounts_balance){
            this.props.notify(this.props.app_state.loc['2937']/* 'You don\'t have enough coin to make that transaction.' */, 4000)
        }
        else if(!this.props.check_if_recipient_address_is_valid(recipient, item)){
            this.props.notify(this.props.app_state.loc['2939']/* 'That recipient address is not valid.' */, 4000)
        }
        else if(set_fee == 0){
            this.props.notify(this.props.app_state.loc['2940']/* 'That transaction fee is invalid.' */, 4000)
        }
        else{
            this.props.show_dialog_bottomsheet({'coin':item, 'fee':set_fee, 'amount':transfer_amount,'recipient':recipient, 'sender':this.get_account_address(), 'memo':memo_text, 'kill_wallet': kill_wallet}, 'confirm_send_coin_dialog')
        }
    }


    when_send_coin_confirmation_received = async () => {
        var item = this.state.coin
        // if(item['symbol'] != 'BTC' && item['symbol'] != 'LTC' && item['symbol'] != 'DOGE' && item['symbol'] != 'DASH'){
        //     this.props.notify(this.props.app_state.loc['2951']/* 'Broadcasting your Transaction...' */, 1000)
        // }
        this.props.notify(this.props.app_state.loc['2951']/* 'Broadcasting your Transaction...' */, 1000)
        var set_fee = await this.get_default_transaction_fee()
        const transfer_amount = parseInt(this.state.picked_sats_amount)
        const recipient = this.state.recipient_address
        const memo_text = this.state.memo_text
        const kill_wallet = this.get_selected_item(this.state.get_kill_substrate_wallet_tags_obj, 'e')
        if(this.state.picked_sats_fee_amount != 0){
            set_fee = this.state.picked_sats_fee_amount
        }
        this.props.broadcast_transaction(item, set_fee, transfer_amount, recipient, this.get_account_address(),memo_text, kill_wallet)
        this.setState({recipient_address:''})
    }









    render_receive_coin_ui(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_scan_qr_code_ui()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_scan_qr_code_ui()}
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
                        {this.render_scan_qr_code_ui()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }


    render_scan_qr_code_ui(){
        var item = this.state.coin
        var address = this.get_account_address()
        return(
            <div style={{'padding':'10px 10px 0px 0px'}}>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px', 'text':this.props.app_state.loc['2928']/* 'Receive Coin using the address shown below.' */, 'color':'dark-grey'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['2917']/* Wallet Address.' */, 'details':address, 'size':'l'})}
                <div style={{height: 10}}/>

                <div onClick={() => this.copy_to_clipboard(address)}>
                    {this.render_detail_item('5',{'text':this.props.app_state.loc['1402']/* 'Copy to Clipboard' */, 'action':''})}
                </div>

                <div style={{height: 20}}/>

                <div style={{height: 200, width:'100%','display': 'flex', 'align-items':'center','justify-content':'center', 'margin':'30px 0px 0px 0px'}}>
                    <QRCode
                        size={150}
                        style={{ height: "auto", maxWidth: "100%", width: "50%" }}
                        value={address}
                        viewBox={`0 0 100 100`}
                    />
                </div>

                <p style={{'margin':'5% 0% 0% 0%', 'text-align': 'center', 'color':this.props.theme['primary_text_color']}}>{item['symbol']}</p>
            </div>
        )
    }

    copy_to_clipboard(signature_data){
        navigator.clipboard.writeText(signature_data)
        this.props.notify(this.props.app_state.loc['2475']/* 'copied address to clipboard' */, 600)
    }

    get_account_address(){
        var item = this.state.coin
        var data = this.props.app_state.coin_data[item['symbol']]
        return data['address']
    }







    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }


    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme}/>
            </div>
        )
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


}




export default SendReceiveCoinPage;