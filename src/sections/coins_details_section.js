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

var bigInt = require("big-integer");

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

class CoinsDetailsSection extends Component {
    
    state = {
        selected: 0,
        navigate_view_coins_list_detail_tags_object: this.navigate_view_coins_list_detail_tags_object(),
    };

    navigate_view_coins_list_detail_tags_object(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e',this.props.app_state.loc['2232']/* 'details' */],[1]
          ],
        }
    }

    render(){
        return(
            <div>
                {this.render_coins_list_detail()}
            </div>
        )
    }



    render_coins_list_detail(){
        if(this.props.selected_coin_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_coins_details_section()}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 0px 0px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.navigate_view_coins_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_coins_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
    }

    when_navigate_view_coins_list_detail_tags_object_updated(tag_obj){
        this.setState({navigate_view_coins_list_detail_tags_object: tag_obj})
    }

    get_item_in_array(object_array, id){
        var object = object_array.find(x => x['id'] === id);
        return object
    }


    render_coins_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_coins_list_detail_tags_object, this.state.navigate_view_coins_list_detail_tags_object['i'].active)
        var item = this.get_item_in_array(this.get_coins_data(), this.props.selected_coin_item)

        if(item == null){
            // console.log('item is null')
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }

        if(selected_item == this.props.app_state.loc['2232']/* 'details' */ || selected_item == 'e'){
            return(
                <div>
                    {this.render_coins_main_details_section(item)}
                </div>
            )
        }
    }

    render_empty_detail_object(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height
        return(
            <div>
                <div style={{height:he, 'background-color': 'transparent', 'border-radius': '15px','padding':'10px 5px 5px 10px','display': 'flex', 'align-items':'center','justify-content':'center','margin':'0px 0px 10px 0px'}}>
                    <img alt="" src={this.props.app_state.theme['letter']} style={{height:70 ,width:'auto'}} />
                </div>
            </div>
        )
    }


    render_coins_main_details_section(item){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-55
        var balance_decimal = this.get_balance_in_decimal(item)
        var balance_base_unit = this.get_balance_in_base_units(item)
        var existential_deposit_decimal = this.get_existential_deposit_decimal(item)
        var existential_deposit_base_unit = this.get_existential_deposit_base_unit(item)
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
            <div style={{ 'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 5px 10px', 'padding':'0px 10px 0px 10px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 0px 0px 10px'}}>
                    {this.render_detail_item('7', item['banner-icon'])}
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 20}}/>
                    {this.show_moderator_note_if_any(item)}
                    {this.render_detail_item('3', {'title':item['name'], 'details':this.props.app_state.loc['2910']/* Coin Name' */, 'size':'l'})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':item['symbol'], 'details':this.props.app_state.loc['2911']/* Coin Symbol' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':item['consensus_mechanism'], 'details':this.props.app_state.loc['2927a']/* Ledger Consensus Mechanism.' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':item['block_time'], 'details':this.props.app_state.loc['2927b']/* Block Time */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':item['account_type'], 'details':this.props.app_state.loc['2915']/* Ledger Account Type.' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':item['ledger_age'], 'details':this.props.app_state.loc['2927c']/* Ledger Age. */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':item['throughput']+' TPS', 'details':this.props.app_state.loc['2927d']/* Ledger Throughput. */, 'size':'l'})}
                    
                    {this.render_block_size_metric(item['block_size'])}
                    
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':item['decimals'].toString(), 'details':this.props.app_state.loc['2912']/* Coin Decimal.' */, 'size':'l'})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':item['base_unit'], 'details':this.props.app_state.loc['2913']/* Base Unit Name.' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':'1 : '+number_with_commas(item['conversion']), 'details':this.props.app_state.loc['2914']/* Decimal Conversion Ratio.' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">{this.props.app_state.loc['2920']/* 'Existential Deposit Amount' */}</p>

                        {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(existential_deposit_decimal), 'number':(existential_deposit_decimal), 'barcolor':'#606060', 'relativepower':item['symbol'], })}
                       
                        {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(existential_deposit_base_unit), 'number':this.format_account_balance_figure(existential_deposit_base_unit), 'barcolor':'#606060', 'relativepower':item['base_unit']+'', })}
                    </div>
                    <div style={{height:10}}/>


                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">{this.props.app_state.loc['2921']/* 'Transaction Fee Amount' */}</p>

                        {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(tx_fee_decimal), 'number':(tx_fee_decimal), 'barcolor':'#606060', 'relativepower':item['symbol']+' / '+(per == 'transaction' ? 'tx':per), })}
                       
                        {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(tx_fee_base_units), 'number':this.format_account_balance_figure(tx_fee_base_units), 'barcolor':'#606060', 'relativepower':item['base_unit']+' / '+(per == 'transaction' ? 'tx':per), })}

                        {this.render_default_fee_for_utxo_chains(item)}
                    </div>
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'details':per, 'title':this.props.app_state.loc['2922']/* Per' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'details':type, 'title':this.props.app_state.loc['2923']/* Fee Type' */, 'size':'l'})}
                    

                    {this.render_detail_item('0')}
                    {this.render_address(item)}

                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} 
                    onClick={() => this.props.view_number({'title':this.props.app_state.loc['2919']/* 'Your balance in ' */+item['base_unit'], 'number':balance_base_unit, 'relativepower':item['base_unit']})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2919']/* 'Your balance in ' */+item['symbol'], 'subtitle':this.format_power_figure(balance_decimal), 'barwidth':this.calculate_bar_width(balance_decimal), 'number':(balance_decimal), 'barcolor':'#606060', 'relativepower':item['symbol'], })}

                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2919']/* 'Your balance in ' */+item['base_unit'], 'subtitle':this.format_power_figure(balance_base_unit), 'barwidth':this.calculate_bar_width(balance_base_unit), 'number':this.format_account_balance_figure(balance_base_unit), 'barcolor':'#606060', 'relativepower':item['base_unit'], })}
                    </div>
            
                    {this.render_wallet_vaue(item, balance_decimal)}

                    {this.render_coin_blockexplorer_link(item)}

                    <div style={{height: 10}}/>
                    <div onClick={()=>this.update_coin_balance(item)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2927f']/* 'Refresh Wallet.' */, 'action': ''})}
                    </div>

                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2924']/* 'Send/Receive ' */+item['symbol'], 'details':this.props.app_state.loc['2925']/* 'Send or receive the coin from a specified account.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_send_receive_coin_page(item)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2459']/* 'Send/Receive' */, 'action': ''})}
                    </div>

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    show_moderator_note_if_any(item){
        if(this.props.app_state.moderator_notes_by_my_following.length == 0) return;
        var note_to_apply = []
        for(var n=0; n<this.props.app_state.moderator_notes_by_my_following.length; n++){
            const focused_note = this.props.app_state.moderator_notes_by_my_following[n]
            var hit_count = 0
            for(var k=0; k<focused_note['keywords'].length; k++){
                const keyword_target = focused_note['keywords'][k]
                if(item['name'] == (keyword_target)){
                    hit_count ++
                }
                else if(item['symbol'] == (keyword_target)){
                    hit_count ++
                }
            }

            if(((focused_note['type'] == 'all' && hit_count == focused_note['keywords'].length) || (focused_note['type'] == 'one' && hit_count != 0)) && focused_note['visibility_end_time'] >= (Date.now()/1000)){
                note_to_apply.push(focused_note)
            }
        }
        if(note_to_apply.length != 0){
            const identifier = item['name']
            const note_index = this.state.note_index == null || this.state.note_index[identifier] == null ? 0 : this.state.note_index[identifier];
            const note_count_message = `(${note_index+1}/${note_to_apply.length})`
            return(
                <div>
                    <div onClick={() => this.update_note_object_index(note_to_apply, identifier)}>
                        {this.render_detail_item('3', {'size':'s', 'title':this.props.app_state.loc['1593is']/* '⚠️ Moderator Note $' */.replace('$', note_count_message), 'details':note_to_apply[note_index]['message']})}
                        {this.props.render_files_part(note_to_apply[note_index]['entered_file_objects'])}
                    </div>
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    update_note_object_index(note_to_apply, identifier){
        var clone = this.state.note_index == null ? {} : structuredClone(this.state.note_index)
        if(clone[identifier] == null){
            clone[identifier] = 0
        }
        if(clone[identifier] + 1 == note_to_apply.length){
            clone[identifier] = 0
        }
        else{
            clone[identifier] ++
        }
        this.setState({note_index: clone})
    }

    render_wallet_vaue(item, balance_decimal){
        var final_balance = balance_decimal == null ? 0.0 : balance_decimal
        if(this.props.app_state.asset_price_data['BTC'] == null || this.props.app_state.asset_price_data[item['symbol']] == null) return;
        var coin_price = this.props.app_state.asset_price_data[item['symbol']]['price']
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
                            {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2927j']/* 'Wallet Value' */, 'subtitle':this.format_power_figure(balance_value_in_sat), 'barwidth':this.calculate_bar_width(balance_value_in_sat), 'number':this.format_account_balance_figure(balance_value_in_sat), 'barcolor':'#606060', 'relativepower':'SATs', })}
                        </div>
                    </div>
                )
            }else{
                return(
                    <div>
                        <div style={{height: 10}}/>
                        <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2927j']/* 'Wallet Value' */, 'subtitle':this.format_power_figure(this.round_off(balance_value_in_usd)), 'barwidth':this.calculate_bar_width(this.round_off(balance_value_in_usd)), 'number':this.format_account_balance_figure(this.round_off(balance_value_in_usd)), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1593ef']/* 'USD' */, })}
                        </div>
                    </div>
                )
            }
        }
    }

    round_off(float_number){
        return (Math.round(float_number * 100) / 100)
    }

    render_block_size_metric(block_size){
        if(block_size != '~~~'){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':block_size+' Mb.', 'details':this.props.app_state.loc['2927e']/* Block Size. */, 'size':'l'})}
                </div>
            )
        }
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

    get_existential_deposit_decimal(item){
        var data = this.props.app_state.coin_data[item['symbol']]
        if(data != null){
            var deposit = data['min_deposit']
            if(deposit == 0){
                return 0
            }else{
                return parseFloat(deposit) / item['conversion']
            }
        }else{
            return 0
        }
    }

    get_existential_deposit_base_unit(item){
        var data = this.props.app_state.coin_data[item['symbol']]
        if(data != null){
            var deposit = data['min_deposit']
            if(deposit == 0){
                return 0
            }else{
                return bigInt(deposit).toString()
            }
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

    render_default_fee_for_utxo_chains(item){
        if(item['symbol'] == 'BTC' || item['symbol'] == 'BCH' || item['symbol'] == 'LTC' || item['symbol'] == 'DOGE' || item['symbol'] == 'DASH'){
            var data = this.props.app_state.coin_data[item['symbol']]
            if(data == null || data['fee'] == null || data['fee']['fee'] == null) return;
            var fee = data['fee']['fee']
            var utxo_count = 1
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

    get_utxo_tx_size(_in, out){
        if(_in == 0) return 0
        return (_in*148 + out*34 + 10 +- _in)
    }




    get_coins_data(){
        var list = []
        var coins = this.props.app_state.coins
        for (const coin in coins) {
            if (coins.hasOwnProperty(coin)) {
                list.push(coins[coin])
            }
        }
        return list
    }

    get_coin_info(symbol, name, image_url, base_unit, decimals, conversion, account_type, consensus_mechanism, block_time, ledger_age, throughput, block_size){
        return{
            'name':name,
            'id':symbol,
            'symbol':symbol,
            'base_unit':base_unit,
            'decimals':decimals,
            'conversion':conversion,
            'label':{'title':symbol, 'details':name, 'size':'l', 'image': image_url},
            'banner-icon':{'header':symbol, 'subtitle':name, 'image':image_url},
            'tags':{'active_tags':[name, 'Coin', symbol], 'index_option':'indexed'},
            'account_type':account_type,
            'consensus_mechanism':consensus_mechanism,
            'block_time':block_time,
            'ledger_age':ledger_age,
            'throughput':throughput,
            'block_size':block_size
        }
    }

    render_address(item){
        var data = this.props.app_state.coin_data[item['symbol']]
        var status = this.props.app_state.coin_data_status
        if(data != null && data['address'] != null && this.is_address_set(data['address'])){
            var address = data['address']
            var shortened_address = start_and_end(data['address'])
            return(
                <div onClick={() => this.copy_to_clipboard(address)}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2917']/* Wallet Address.' */, 'details':shortened_address, 'size':'l'})}
                </div>
            )
        }
        else if(status == 'pending'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2917']/* Wallet Address.' */, 'details':this.props.app_state.loc['2926']/* Pending...' */, 'size':'l'})}
                </div>
            )
        }
        else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2917']/* Wallet Address.' */, 'details':this.props.app_state.loc['2918']/* Unset' */, 'size':'l'})}
                </div>
            )
        }
    }

    is_address_set(address){
        // return true
        var default_addresses = this.props.app_state.default_addresses
        if(default_addresses.includes(address)){
            return false
        }
        return true;
    }

    copy_to_clipboard(signature_data){
        navigator.clipboard.writeText(signature_data)
        this.props.notify(this.props.app_state.loc['2475']/* 'copied address to clipboard' */, 600)
    }

    open_send_receive_coin_page(item){
        var data = this.props.app_state.coin_data[item['symbol']]
        if(!this.props.app_state.has_wallet_been_set){
            this.props.open_wallet_guide_bottomsheet('action')
        }
        else if(data['address'] == null || !this.is_address_set(data['address'])){
            this.props.notify(this.props.app_state.loc['2927']/* Wait first, the wallet is pending.' */, 2800)
        }
        else{
            this.props.start_send_receive_coin_bottomsheet(item)
        }
    }

    update_coin_balance(item){
        var data = this.props.app_state.coin_data[item['symbol']]
        if(!this.props.app_state.has_wallet_been_set){
            this.props.notify(this.props.app_state.loc['2906']/* You need to set your wallet first.' */, 2000)
        }
        else if(data['address'] == null || !this.is_address_set(data['address'])){
            this.props.notify(this.props.app_state.loc['2927']/* Wait first, the wallet is pending.' */, 2800)
        }
        else{
            this.props.update_coin_balances(item['symbol'], false)
        }
        
    }





    render_coin_blockexplorer_link(item){
        var data = this.props.app_state.coin_data[item['symbol']]
        if(data == null) return;
        if(data['address'] == null || !this.is_address_set(data['address'])) return;
        var link = this.get_coin_blockexplorer_link(item)

        if(link != null){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2927h']/* View Wallet on Explorer */,'details':this.props.app_state.loc['2927i']/* View your wallet on its Blockexplorer. */, 'size':'l'})}
                    
                    <div style={{height: 10}}/>
                    {this.render_detail_item('4', {'text':link, 'textsize':'13px', 'font':'Sans-serif'})}
                </div>
            )
        }
    }

    get_coin_blockexplorer_link(item){
        var data = this.props.app_state.coin_data[item['symbol']]
        var hash = data['address']
        if(item['symbol'] == 'BTC'){
            return `https://www.blockchain.com/explorer/addresses/btc/${hash}`
        }
        else if(item['symbol'] == 'BCH'){
            return `https://www.blockchain.com/explorer/addresses/bch/${hash}`
        }
        else if(item['symbol'] == 'LTC'){
            return `https://litecoinspace.org/address/${hash}`
        }
        else if(item['symbol'] == 'DOGE'){
            return `https://blockexplorers.nownodes.io/dogecoin/address/${hash}`
        }
        else if(item['symbol'] == 'DASH'){
            return `https://blockchair.com/dash/address/${hash}`
        }
        else if(item['symbol'] == 'TRX'){
            return `https://tronscan.org/#/address/${hash}`
        }
        else if(item['symbol'] == 'XRP'){
            return `https://xrpscan.com/account/${hash}`
        }
        else if(item['symbol'] == 'XLM'){
            return `https://stellar.expert/explorer/public/account/${hash}`
        }
        else if(item['symbol'] == 'DOT'){
            return `https://assethub-polkadot.subscan.io/account/${hash}`
        }
        else if(item['symbol'] == 'KSM'){
            return `https://kusama.subscan.io/account/${hash}`
        }
        else if(item['symbol'] == 'ALGO'){
            return `https://allo.info/account/${hash}`
        }
        else if(item['symbol'] == 'XTZ'){
            return `https://tzkt.io/${hash}`
        }
        else if(item['symbol'] == 'ATOM'){
            return `https://www.mintscan.io/cosmos/address/${hash}`
        }
        else if(item['symbol'] == 'FIL'){
            return `https://filfox.info/en/address/${hash}`
        }
        else if(item['symbol'] == 'SOL'){
            return `https://explorer.solana.com/address/${hash}`
        }
        else if(item['symbol'] == 'APT'){
            return `https://explorer.aptoslabs.com/account/${hash}`
        }
        else if(item['symbol'] == 'ADA'){
            return `https://cardanoscan.io/address/${hash}`
        }
        else if(item['symbol'] == 'STX'){
            return `https://explorer.hiro.so/address/${hash}?chain=mainnet`
        }
        else if(item['symbol'] == 'AR'){
            return `https://viewblock.io/arweave/address/${hash}`
        }
        else if(item['symbol'] == 'SUI'){
            return `https://suiscan.xyz/mainnet/account/${hash}`
        }
        else if(item['symbol'] == 'TIA'){
            return `https://celenium.io/address/${hash}`
        }
    }








    render_empty_object(){
        var background_color = this.props.theme['card_background_color']
        return(
            <div style={{height:180, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                <div style={{'margin':'10px 20px 0px 0px'}}>
                    <img src={this.props.app_state.theme['letter']} style={{height:70 ,width:'auto'}} />
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

    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var size = this.props.screensize
        var width = size == 'm' ? this.props.app_state.width/2 : this.props.app_state.width
        return(
            <div>
                <ViewGroups show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme}  width={width}/>
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




export default CoinsDetailsSection;