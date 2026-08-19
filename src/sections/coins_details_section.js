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
import { motion, AnimatePresence } from "framer-motion";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toLocaleString('fullwide', {useGrouping:false}).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
              ['xor','',0], ['e',this.props.app_state.loc['2232']/* 'details' */, this.props.app_state.loc['2481d']/* 'requests' */, this.props.app_state.loc['2481f']/* 'E5-Transfers ⚫' */],[1]
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
        if(selected_item == this.props.app_state.loc['2481d']/* 'requests' */){
            return(
                <div>
                    {this.render_coin_requests_section(item)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2481f']/* 'E5-Transfers' */){
            return(
                <div>
                    {this.render_coin_send_receipts_section(item)}
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









    render_line_loader_if_loading(){
        const styles = {
             skeletonBox: {
                display: 'block',
                width: '100%',
                height: '6px',
                borderRadius: '3px',
                lineHeight: '0',
                margin: 0,
            },
        };
        return(
            <AnimatePresence initial={true}>
                <motion.div key={'line_loader'} initial={{ opacity: 0, scale:0.95 }} animate={{ opacity: 1, scale:1 }} exit={{ opacity: 0, scale:0.95 }} transition={{ duration: 0.3 }}
                style={{height:'6px', 'margin':'0px 15px 3px 15px', overflow: 'hidden', borderRadius: '3px',}}>
                    <SkeletonTheme borderRadius={'3px'} baseColor={this.props.theme['loading_base_color']} highlightColor={this.props.theme['loading_highlight_color']}>
                        <Skeleton style={styles.skeletonBox}/>
                    </SkeletonTheme>
                </motion.div>
            </AnimatePresence>
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
        var unlocked_balance_decimal = this.get_unlocked_balance_in_decimal(item)
        var unlocked_balance_base_unit = this.get_unlocked_balance_in_base_units(item)

        const data = this.props.app_state.coin_data[item['symbol']]
        var per = '...'
        var type = '...'
        if(data != null){
            per = data['fee'] == null ? '...' : data['fee']['per']
            type = data['fee'] == null ? '...' : data['fee']['type']
        }

        const symbol = item['symbol']
        const supply_data = this.props.app_state.asset_supply_data[symbol]
        const supply = supply_data == null ? null : parseInt(supply_data)
        const atomic_supply = supply_data == null ? null : bigInt(supply).multiply(item['conversion'])

        const market_cap_data = this.props.app_state.asset_price_data[item['symbol']]
        const market_cap = market_cap_data == null ? null : parseInt(market_cap_data['cap'])

        const get_market_cap_in_sats = (denom_coin_name, conversion, supply) => {
            const total_supply = supply == null ? 0.0 : supply
            if(this.props.app_state.asset_price_data['BTC'] == null || this.props.app_state.asset_price_data[item['symbol']] == null) return;
            const coin_price = this.props.app_state.asset_price_data[item['symbol']]['price']
            const bitcoin_price = this.props.app_state.asset_price_data[denom_coin_name]['price']
            const balance_value_in_usd = coin_price * total_supply;
            const number_of_btc_for_one_usd = 1 / bitcoin_price
            const balance_value_in_btc = number_of_btc_for_one_usd * balance_value_in_usd
            if(supply == 1.0){
                const balance_value_in_sat = parseFloat(balance_value_in_btc * conversion).toFixed(4)
                return balance_value_in_sat
            }else{
                const balance_value_in_sat = parseInt(balance_value_in_btc * conversion)
                return balance_value_in_sat
            }
        }
        const market_cap_in_sats = get_market_cap_in_sats('BTC', this.props.app_state.coins['BTC']['conversion'], supply)

        const decimal_price = market_cap_data == null ? null : parseFloat(market_cap / supply).toFixed(2)
        const decimal_price_in_sats = get_market_cap_in_sats('BTC', this.props.app_state.coins['BTC']['conversion'], 1.0)

        const format_decimal_price_value = (value) => {
            if(value < 1_000_000){
                const split = value.toString().split('.')
                const main = number_with_commas(split[0])
                const deci = split[1]
                return main+'.'+deci
            }else{
                return this.format_account_balance_figure(parseInt(value))
            }
        }
        return(
            <div style={{ 'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 5px 10px', 'padding':'0px 15px 0px 15px'}}>
                <div style={{ 'overflow-y': 'auto', 'overflow-x': 'hidden', height: he, padding:'0px 0px 0px 0px'}}>
                    {this.render_detail_item('7', item['banner-icon'])}
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 20}}/>
                    {this.show_moderator_note_if_any(item)}
                    {this.render_object_views(item)}
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

                    {this.render_detail_item('3', {'title':number_with_commas(item['throughput'])+' TPS', 'details':this.props.app_state.loc['2927d']/* Ledger Throughput. */, 'size':'l'})}
                    
                    {this.render_block_size_metric(item['block_size'])}

                    {supply != null && (
                        <div>
                            <div style={{height: 10}}/>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['2927s']/* 'Coin\'s Supply.' */, 'number':supply, 'relativepower':item['symbol']})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2927s']/* 'Coin\'s Supply.' */, 'subtitle':this.format_power_figure(supply), 'barwidth':this.calculate_bar_width(supply), 'number':''+this.format_account_balance_figure(supply), 'barcolor':'#606060', 'relativepower':item['symbol'], })}
                                </div>

                                <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['2927t']/* 'Coin\'s Atomic Supply.' */, 'number':atomic_supply, 'relativepower':item['base_unit']})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2927t']/* 'Coin\'s Atomic Supply.' */, 'subtitle':this.format_power_figure(atomic_supply), 'barwidth':this.calculate_bar_width(atomic_supply), 'number':''+this.format_account_balance_figure(atomic_supply), 'barcolor':'#606060', 'relativepower':item['base_unit'], })}
                                </div>
                            </div>
                        </div>
                    )}

                    {decimal_price != null && (
                        <div>
                            <div style={{height:10}}/>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                <div>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2927ba']/* 'Coin\'s Decimal Price.' */, 'subtitle':this.format_power_figure(decimal_price), 'barwidth':this.calculate_bar_width(decimal_price), 'number':''+format_decimal_price_value(decimal_price), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1593ef']/* 'USD' */, })}
                                </div>

                                <div>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2927bb']/* 'Coin\'s Decimal Price in $' */.replace('$', 'SATs'), 'subtitle':this.format_power_figure(decimal_price_in_sats), 'barwidth':this.calculate_bar_width(decimal_price_in_sats), 'number':''+format_decimal_price_value(decimal_price_in_sats), 'barcolor':'#606060', 'relativepower':'SATs', })}
                                </div>
                            </div>
                        </div>
                    )}

                    {market_cap != null && (
                        <div>
                            <div style={{height:10}}/>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['2927u']/* 'Coin\'s Market Capitalization.' */, 'number':market_cap, 'relativepower':this.props.app_state.loc['1593ef']/* 'USD' */})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2927u']/* 'Coin\'s Market Capitalization.' */, 'subtitle':this.format_power_figure(market_cap), 'barwidth':this.calculate_bar_width(market_cap), 'number':''+this.format_account_balance_figure(market_cap), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1593ef']/* 'USD' */, })}
                                </div>

                                <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['2927v']/* 'Coin\'s Market Cap in $' */.replace('$', 'SATs'), 'number':market_cap_in_sats, 'relativepower':this.props.app_state.loc['1593ef']/* 'USD' */})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2927v']/* 'Coin\'s Market Cap in $' */.replace('$', 'SATs'), 'subtitle':this.format_power_figure(market_cap_in_sats), 'barwidth':this.calculate_bar_width(market_cap_in_sats), 'number':''+this.format_account_balance_figure(market_cap_in_sats), 'barcolor':'#606060', 'relativepower':'SATs', })}
                                </div>
                            </div>
                        </div>
                    )}

                    {this.render_coin_ether_chart_data(item)}
                    
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':item['decimals'].toString(), 'details':this.props.app_state.loc['2912']/* Coin Decimal.' */, 'size':'l'})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':item['base_unit'], 'details':this.props.app_state.loc['2913']/* Atomic Unit Name.' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':'1 : '+number_with_commas(item['conversion']), 'details':this.props.app_state.loc['2914']/* Decimal Conversion Ratio.' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {existential_deposit_base_unit > 0 && (
                        <div>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                                <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">{this.props.app_state.loc['2920']/* 'Existential Deposit Amount' */}</p>

                                {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(existential_deposit_decimal), 'number':(existential_deposit_decimal), 'barcolor':'#606060', 'relativepower':item['symbol'], })}
                            
                                {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(existential_deposit_base_unit), 'number':this.format_account_balance_figure(existential_deposit_base_unit), 'barcolor':'#606060', 'relativepower':item['base_unit']+'', })}
                            </div>
                            <div style={{height:10}}/>
                        </div>
                    )}
                    


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
            
                    {this.render_wallet_vaue(item, balance_decimal)}

                    {this.render_coin_blockexplorer_link(item)}

                    <div style={{height: 10}}/>
                    
                    {this.props.app_state.loading_individual_coin == item['symbol'] && this.render_small_skeleton_object()}

                    {this.props.app_state.loading_individual_coin != item['symbol'] && (
                        <div style={{'padding': '0px 10px 0px 10px'}}>
                            <div className="row">
                                <div className="col-6" style={{}}>
                                    <div style={{opacity: this.props.app_state.updating_individual_coin[item['symbol']] == true ? 0.5 : 1.0}} onClick={()=>this.update_coin_balance(item)}>
                                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2927f']/* 'Refresh Balance.' */, 'action': ''})}
                                    </div>
                                </div>
                                <div className="col-6" style={{}}>
                                    <div onClick={()=>this.refresh_wallet(item)}>
                                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2927bc']/* 'Reload Wallet.' */, 'action': ''})}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {this.render_send_receive_coin(item)}

                    {balance_base_unit > 0 && this.props.app_state.has_wallet_been_set == true && (
                        <div>
                            {this.render_bridge_button_if_enabled(item)}
                        </div>
                    )}

                    {this.render_begin_sync_if_xmr(item)}

                    {this.show_swap_coin_button(item)}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    show_swap_coin_button(item){
        const external_swappers = item['external_swappers']
        if(external_swappers != null && external_swappers.length > 0){
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2927bm']/* '💱 Swap Coin' */, 'details':this.props.app_state.loc['2927bn']/* 'Convert your coin at current market exchange rates to another ether or coin.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_external_swappers(external_swappers)}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_swap_ether_page(item)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2481bh']/* 'Begin Swap' */, 'action': ''})}
                    </div>
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    render_external_swappers(external_swappers){
        const swappers = {
            'lifi': 'LiFi',
            'changenow': 'ChangeNOW'
        }
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {external_swappers.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_detail_item('4', {'text':swappers[item], 'textsize':'12px', 'font':this.props.app_state.font})}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    open_swap_ether_page(item){
        if(!this.props.app_state.has_wallet_been_set){
            this.props.open_wallet_guide_bottomsheet('action')
        }else{
            this.props.show_swap_ether_bottomsheet(item, 'coin')
        }
    }

    render_send_receive_coin(item){
        var data = this.props.app_state.coin_data[item['symbol']]
        const is_address_set = data == null ? false : this.is_address_set(data['address'])
        // if(item['symbol'] == '???' && this.props.app_state.xmr_wallet_set != true && is_address_set == true){
        //     return(
        //         <div>
        //             {this.render_detail_item('0')}
        //             {this.render_detail_item('3', {'title':this.props.app_state.loc['2924']/* '💵 Send/Receive ' */+item['symbol'], 'details':this.props.app_state.loc['2925']/* 'Send or receive the coin from a specified account.' */, 'size':'l'})}
        //             <div style={{height:10}}/>
        //             {this.render_small_empty_object()}
        //         </div>
        //     )
        // }
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2924']/* '💵 Send/Receive ' */+item['symbol'], 'details':this.props.app_state.loc['2925']/* 'Send or receive the coin from a specified account.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={()=>this.open_send_receive_coin_page(item)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2459']/* 'Send/Receive' */, 'action': ''})}
                </div>
            </div>
        )
    }

    render_begin_sync_if_xmr(item){
        var data = this.props.app_state.coin_data[item['symbol']]
        if(data == null) return;
        if(data['address'] == null || !this.is_address_set(data['address'])) return;
        if(item['symbol'] == '???'){
            const percentage_done = this.props.app_state.xmr_restore_percentage || 0
            const xmr_sync_remaining_blocks = this.props.app_state.xmr_sync_remaining_blocks || 0
            const percentage = (percentage_done * 100).toFixed(3)
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2927be']/* '🔄 Begin ??? Synchronization.' */, 'details':this.props.app_state.loc['2927bf']/* 'Your ??? wallet need to fully sync to obtain your spendable balance before performing transactions.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    {percentage > 0 && percentage < 99 && (
                        <div>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2927bg']/* 'Synchronization Process.' */, 'subtitle':this.format_power_figure(percentage), 'barwidth':percentage+'%', 'number':percentage+'%', 'barcolor':'', 'relativepower':this.props.app_state.loc['1881']/* proportion */, })}
                                
                                {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2927bj']/* 'Remaining Blocks' */, 'subtitle':this.format_power_figure(xmr_sync_remaining_blocks), 'barwidth':this.calculate_bar_width(xmr_sync_remaining_blocks), 'number':this.format_account_balance_figure(xmr_sync_remaining_blocks), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['2927bk']/* 'blocks' */, })}
                            </div>
                            <div style={{height:10}}/>
                        </div>
                    )}
                    {percentage > 99 && (
                        <div>
                            {this.render_detail_item('4', {'text':this.props.app_state.loc['2927bi']/* '⚡ Wallet Synchronized.' */, 'textsize':'13px', 'font':this.props.app_state.font})}
                            <div style={{height:10}}/>
                        </div>
                    )}
                    <div onClick={()=>this.props.show_dialog_bottomsheet({'coin':item}, 'get_height_to_use_before_sync')}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2927bh']/* 'Synchronize Coin' */, 'action': ''})}
                    </div>
                </div>
            )
        }
    }

    render_bridge_button_if_enabled(item){
        const obj = {
            'FIL': 'FILE',
            'XRP':'XRPE',
            'IOTA': 'IOTAE',
            'HBAR':'HBARE',
            'XTZ': 'XTZE'
        }
        if(obj[item['symbol']] != null){
            const evm_symbol = obj[item['symbol']]
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2927w']/* '𖣑 Bridge To FILE ' */.replace('FILE', evm_symbol), 'details':this.props.app_state.loc['2927x']/* 'Bridge your coin from this wallet\'s address to your FILE wallet.' */.replace('FILE', evm_symbol), 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.props.show_bridge_coin_bottomsheet(item)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2927y']/* 'Bridge Coin' */, 'action': ''})}
                    </div>
                </div>
            )
        }
    }

    render_object_views(object){
        const e5_id = object['id']
        const hits = this.props.app_state.object_view_data[e5_id] == null ? 0 : this.props.app_state.object_view_data[e5_id]['all_hits']
        if(hits > 0){
            return(
                <div>
                    <div onClick={() => this.when_object_views_clicked(e5_id)}>
                        {this.props.render_object_view_count_message(hits, e5_id, this.get_object_views_footer(object))}
                    </div>
                    <div style={{height: 10}}/>
                    {this.render_object_views_chart_if_enabled(e5_id)}
                </div>
            )
        }
    }

    get_object_views_footer(object){
        return;
        // const my_country =  this.props.app_state.obligation_subscriptions[this.props.app_state.accounts[this.props.app_state.selected_e5].address] != null ? this.props.app_state.obligation_subscriptions[this.props.app_state.accounts[this.props.app_state.selected_e5].address].my_original_country : this.props.app_state.device_country;

        // const my_city = this.props.app_state.obligation_subscriptions[this.props.app_state.accounts[this.props.app_state.selected_e5].address] != null ? this.props.app_state.obligation_subscriptions[this.props.app_state.accounts[this.props.app_state.selected_e5].address].my_original_city : this.props.app_state.device_city;

        // const post_country = object['ipfs']['my_country']
        // const post_city = object['ipfs']['my_city']

        // if(post_country == null || post_city == null) return;

        // if(post_country == my_country) return;

        // return `${post_city} • ${post_country}`
    }

    when_object_views_clicked(e5_id){
        const clone = (this.state.viewed_objects_views_full || []).slice()
        const pos = clone.indexOf(e5_id)
        if(pos == -1){
            clone.push(e5_id)
        }
        else {
            clone.splice(pos, 1)
        }
        this.setState({viewed_objects_views_full: clone})
    }

    render_object_views_chart_if_enabled(e5_id){
        if(this.state.viewed_objects_views_full != null && this.state.viewed_objects_views_full.includes(e5_id)){
            const view_data = this.props.app_state.object_view_data[e5_id]['entries']
            const sorted_view_data = this.sortByAttributeDescending(view_data, 'time').reverse()//from least recent to most recent
            const time_filter_tags_object = this.state.selected_time_filter_chart_tags_object2 || this.selected_time_filter_chart_tags_object()
            const filter_time = this.get_filter_end_time(time_filter_tags_object)
            const upload_data_filtered = sorted_view_data.filter(function (trend_hit) {
                return (trend_hit['time'] > filter_time)
            });
            const upload_data_dps = this.props.get_upload_data_datapoints(upload_data_filtered)
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2927q']/* 'Coins Views.' */, 'details':this.props.app_state.loc['2927r']/* 'Chart containing the coin\'s views over time.' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':upload_data_dps.dps, 'start_time': upload_data_dps.starting_time, 'end_time':upload_data_dps.ending_time})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['a2527co']/* 'Y-Axis: Views' */, 'details':this.props.app_state.loc['2391']/* 'X-Axis: Time' */, 'size':'s'})}

                    <Tags font={this.props.app_state.font} page_tags_object={time_filter_tags_object} tag_size={'l'} when_tags_updated={this.when_selected_time_filter_chart_tags_object_updated2.bind(this)} theme={this.props.theme}/>

                    {this.render_detail_item('0')}
                    {this.props.render_object_metadata_if_exists(e5_id)}
                </div>
            )
        }
    }

    when_selected_time_filter_chart_tags_object_updated2(tag_obj){
        this.setState({selected_time_filter_chart_tags_object2: tag_obj})
    }

    selected_time_filter_chart_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','1h','24h', '7d', '30d', '6mo', this.props.app_state.loc['1416']/* 'all-time' */], [6]
            ],
        };
    }

    get_filter_end_time(selected_time_filter_chart_tags_object){
        var selected_item = this.get_selected_item(selected_time_filter_chart_tags_object, selected_time_filter_chart_tags_object['i'].active)

        var filter_value = 60*60
        if(selected_item == '1h'){
            filter_value = 60*60
        }
        else if(selected_item == '24h'){
            filter_value = 60*60*24
        }
        else if(selected_item == '7d'){
            filter_value = 60*60*24*7
        }
        else if(selected_item == '30d'){
            filter_value = 60*60*24*30
        }
        else if(selected_item == '6mo'){
            filter_value = 60*60*24*30*6
        }
        else if(selected_item == this.props.app_state.loc['1416']/* 'all-time' */){
            filter_value = 10**10
        }

        return Date.now() - (filter_value * 1000)
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
        if(item['symbol'] == 'BTC' || item['symbol'] == 'BCH' || item['symbol'] == 'LTC' || item['symbol'] == 'DOGE' || item['symbol'] == 'DASH' || item['symbol'] == 'ZEC'){
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
            // this.props.notify(this.props.app_state.loc['2927n']/* Refreshing your wallet...' */, 2000)
            if(this.props.app_state.updating_individual_coin[item['symbol']] != true) this.props.update_coin_balances(item['symbol'], false)
        }
        
    }

    refresh_wallet(item){
        if(!this.props.app_state.has_wallet_been_set){
            this.props.notify(this.props.app_state.loc['2906']/* You need to set your wallet first.' */, 2000)
        }
        else{
            this.props.notify(this.props.app_state.loc['2927bd']/* Reloading Your Wallet...' */, 2000)
            this.props.refresh_wallet(item['symbol'])
        }
    }

    render_coin_ether_chart_data(item){
        const symbol = item['symbol']
        const chart_data = this.props.app_state.coin_ether_chart_info[symbol];
        if(chart_data != null){
            const datapoints1 = this.get_coin_ether_chart_data(item);
            const datapoints2 = this.get_dominance_change_datapoints(item)
            let dominance_target = this.state.dominance_target || 'BTC'
            if(dominance_target == symbol){
                dominance_target = this.get_next_dominance_target(dominance_target)
            }
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2927bq']/* 'Price History.' */, 'details':this.props.app_state.loc['2927br']/* 'Chart containing the price history for $ overtime.' */.replace('$', item['symbol']), 'size':'l'})}
                    {this.render_detail_item('6', {'dataPoints':datapoints1.dps, 'start_time':datapoints1.starting_time,})}

                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2927bs']/* Y-Axis: Price' */, 'details':this.props.app_state.loc['1461']/* 'X-Axis: Time' */, 'size':'s'})}

                    {symbol != dominance_target && (
                        <div>
                            <div style={{height: 10}}/>
                            {this.render_detail_item('3', {'title':this.props.app_state.loc['2927bu']/* 'Relative Dominance Change.' */, 'details':this.props.app_state.loc['2927bv']/* 'Chart containing the relative change in dominance of $ against % over the last year.' */.replace('$', item['symbol']).replace('%', dominance_target), 'size':'l'})}
                            {this.render_detail_item('6', {'dataPoints':datapoints2.dps, 'start_time':datapoints2.starting_time,})}
                            <div style={{height: 10}}/>
                            {this.render_dominance_targets(item)}

                            <div style={{height: 10}}/>
                            {this.render_detail_item('3', {'title':this.props.app_state.loc['2927bw']/* Y-Axis: Dominance Points' */, 'details':this.props.app_state.loc['1461']/* 'X-Axis: Time' */, 'size':'s'})}
                        </div>
                    )}
                </div>
            )
        }
    }

    render_dominance_targets(item){
        const selected_items = this.get_all_dominance_targets()
        const items = []
        selected_items.forEach(selected_item => {
            if(item['symbol'] != selected_item){
                items.push(selected_item)
            }
        });
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={() => this.set_dominance_target(item)}>
                            {this.render_detail_item('4', {'text':item, 'textsize':'12px', 'font':this.props.app_state.font})}
                            {this.render_line_if_selected(item, item['symbol'])}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_line_if_selected(item, symbol){
        let dominance_target = this.state.dominance_target
        if(dominance_target == null){
            dominance_target = 'BTC'
        }
        if(dominance_target == symbol){
            dominance_target = this.get_next_dominance_target(dominance_target)
        }
        if(dominance_target == item){
            return(
                <div>
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }
    }

    set_dominance_target(item){
        this.props.get_token_chart_data(item)
        this.setState({dominance_target: item})
    }




    get_coin_ether_chart_data(item){
        const selected_preferred_currency = this.props.app_state.preferred_currency
        const symbol = item['symbol'];
        const chart_data = this.props.app_state.coin_ether_chart_info[symbol];
        const btc_chart_data = this.props.app_state.coin_ether_chart_info['BTC'];
        const data = []
        const starting_time = chart_data != null && chart_data.length > 0 ? chart_data[0]['time'] : Date.now()
        if(chart_data != null){
            for(var j=0; j<chart_data.length; j++){
                const data_point = chart_data[j];
                const price_in_usd = parseFloat(data_point['price']);
                const time = data_point['time']
                if(selected_preferred_currency == this.props.app_state.loc['1593eg']/* 'SAT' */){
                    const price_of_bitcoin_at_time = this.findClosestSorted(btc_chart_data, time)
                    if(price_of_bitcoin_at_time != null){
                        const bitcoin_price = price_of_bitcoin_at_time['price']
                        const number_of_btc_for_one_usd = 1 / bitcoin_price
                        const balance_value_in_btc = number_of_btc_for_one_usd * price_in_usd
                        const balance_value_in_sat = balance_value_in_btc * this.props.app_state.coins['BTC']['conversion']

                        data.push(parseFloat(balance_value_in_sat).toFixed(4))
                    }
                }else{
                    const point = price_in_usd * this.props.app_state.my_currency_exchange_rate
                    data.push(point.toFixed(2))
                }
            }
        }


        // console.log('get_coin_ether_chart_data','data', data, chart_data)

        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 366;
        // var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[i]
            
            if(yVal != null){
                var indicator = data[i] > 1000 ? this.format_account_balance_figure(data[i]) : data[i]
                const token_name = selected_preferred_currency == this.props.app_state.loc['1593eg']/* 'SAT' */ ? 'SATs' : this.props.app_state.loc['1593ef']/* 'USD' */
                var final_indicator = '$ %'.replace('$', indicator).replace('%', token_name)
                
                if(i == 100 || i == 200){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+final_indicator});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
        }

        return { dps, starting_time: starting_time }
    }

    findClosestSorted(objects, targetTime) {
        if (!objects || objects.length === 0) return null;

        let left = 0, right = objects.length - 1;
        let closest = objects[0];

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const midTime = objects[mid].time;

            if (Math.abs(midTime - targetTime) < Math.abs(closest.time - targetTime)) {
                closest = objects[mid];
            }

            if (midTime === targetTime) {
                return objects[mid];
            } else if (midTime < targetTime) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return closest;
    }



    get_all_dominance_targets(){
        return this.props.app_state.dominance_targets
    }

    get_next_dominance_target(selected_target){
        const selected_items = this.get_all_dominance_targets()
        for(var i=0; i<selected_items.length; i++){
            if(selected_items[i] != selected_target){
                return selected_items[i]
            }
        }
    }

    get_dominance_change_datapoints(item){
        const symbol = item['symbol'];
        const chart_data = this.props.app_state.coin_ether_chart_info[symbol];
        let dominance_target = this.state.dominance_target || 'BTC'
        if(dominance_target == symbol){
            dominance_target = this.get_next_dominance_target(dominance_target)
        }
        const btc_chart_data = this.props.app_state.coin_ether_chart_info[dominance_target]
        const data = []
        const starting_time = chart_data != null && chart_data.length > 0 ? chart_data[0]['time'] : Date.now()

        if(chart_data != null && chart_data.length > 0 && btc_chart_data != null && btc_chart_data.length > 0){
            const anchor_price_in_usd = chart_data[0]['price'];
            const anchor_bitcoin_price = btc_chart_data[0]['price']

            for(var j=0; j<chart_data.length; j++){
                const data_point = chart_data[j];
                const price_in_usd = data_point['price'];
                const equivalent_bitcoin_price = btc_chart_data[j]['price']

                const last_data_point = j==0 ? chart_data[j] : chart_data[j-1];
                const last_price_in_usd = last_data_point['price'];
                const last_equivalent_bitcoin_price = j==0 ? btc_chart_data[j]['price'] : btc_chart_data[j-1]['price']

                const price_proportion = ((price_in_usd - last_price_in_usd) / last_price_in_usd) * 100
                const bitcoin_price_proportion = ((equivalent_bitcoin_price - last_equivalent_bitcoin_price) / last_equivalent_bitcoin_price) * 100

                const relative_dominance_change = price_proportion.toFixed(2) - bitcoin_price_proportion.toFixed(2)

                if(data.length == 0){
                    data.push(parseFloat(relative_dominance_change))
                }else{
                    const previous_value = parseFloat(data[data.length-1])
                    data.push(previous_value+parseFloat(relative_dominance_change))
                }
            }
        }


        // console.log('get_dominance_change_datapoints', 'data', data)


        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 366;
        // var factor = Math.round(data.length/noOfDps) +1;
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[i]
            
            if(yVal != null){
                var indicator = yVal > 1000 ? this.format_account_balance_figure(yVal.toFixed(2)) : yVal.toFixed(2)
                
                var final_indicator = '$ %'.replace('$', indicator).replace('%', this.props.app_state.loc['2927bt']/* 'points' */)
                if(i == 100 || i == 200){
                    dps.push({x: xVal, y: yVal, indexLabel: ""+final_indicator});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
        }

        // console.log('get_dominance_change_datapoints', 'dps', dps)

        return { dps, starting_time: starting_time }
        
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
            return `https://blockchair.com/dogecoin/address/${hash}`
            // return `https://explorer.doged.io/address/${hash}`
            // return `https://blockexplorers.nownodes.io/dogecoin/address/${hash}`
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
        else if(item['symbol'] == 'IOTA'){
            return `https://explorer.iota.org/address/${hash}`
        }
        else if(item['symbol'] == 'HBAR'){
            return `https://hashscan.io/mainnet/account/${hash}`
        }
        else if(item['symbol'] == 'INJ'){
            return `https://injscan.com/account/${hash}/`
        }
        else if(item['symbol'] == 'NEAR'){
            return `https://nearblocks.io/address/${hash}`
        }
        else if(item['symbol'] == 'ICP'){
            return `https://dashboard.internetcomputer.org/account/${hash}`
        }
        else if(item['symbol'] == 'ZEC'){
            return `https://blockchair.com/zcash/address/${hash}`
        }
        else if(item['symbol'] == 'GRAM'){
            return `https://tonscan.org/address/${hash}`
        }

    }










    render_coin_requests_section(item){
        var he = this.props.height-47
        return(
            <div>
                <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px'}}>
                    <div style={{ 'overflow-y': 'auto', height: he, padding:'5px 0px 5px 0px'}}>
                        <div style={{padding:'5px 5px 5px 5px'}}>
                            {this.render_detail_item('3', {'title':this.props.app_state.loc['2927l']/* 'Coin Requests' */, 'details':this.props.app_state.loc['2927m']/* 'All the Coin transfer reqests sent to your account.' */, 'size':'l'})} 
                        </div>
                        <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px'}}/>
                        <div style={{padding:'5px 10px 5px 10px'}}>
                            {this.render_coin_request_items(item)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render_coin_request_items(coin_item){
        var middle = this.props.height-200;
        var items = [].concat(this.get_requests(coin_item))

        if(items.length == 0){
            items = [0,1]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}}>
                                    {this.render_small_empty_object()}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }else{
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        <div>
                            {items.map((item, index) => (
                                <li style={{}} onClick={() => this.when_request_item_clicked(item, coin_item)}>
                                    <div>
                                        {this.render_request_item(item, coin_item)}
                                        <div style={{height: 4}}/>
                                    </div>
                                </li>
                            ))}    
                        </div>
                    </ul>
                </div>
            )
        }
    }

    get_requests(coin_item){
        if(this.props.app_state.has_wallet_been_set == false){
            return [];
        }
        const id = coin_item['symbol']
        const data = this.props.app_state.received_coin_ether_requests[id] || {}
        const requets = [];
        Object.keys(data).forEach(request_id => {
            if(data[request_id]['sender_account'] != this.props.app_state.user_account_id[data[request_id]['sender_account_e5']]){
                requets.push(data[request_id])
            }
        });
        return this.sortByAttributeDescending(requets, 'time')
    }

    render_small_empty_object(){
        return(
            <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'display': 'flex', 'align-items':'center','justify-content':'center'}}>
                <div style={{'margin':'10px 20px 10px 0px'}}>
                    <img alt="" src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                </div>
            </div>
        );
    }

    render_request_item(ipfs, coin_item){
        const time = ipfs['time']/1000
        const sender_account = ipfs['sender_account']
        const sender_account_e5 = ipfs['sender_account_e5']
        const e5_image = this.props.app_state.e5s[sender_account_e5].e5_img
        const base_unit_amount = bigInt(ipfs['message_obj']['picked_base_unit_amount'])
        const decimal_amount = base_unit_amount / coin_item['conversion']
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2481c']/* 'From $' */.replace('$', sender_account).replace('%', this.get_time_diff((Date.now()/1000) - (parseInt(time)))), 'details':''+(new Date(time*1000).toLocaleString())+' • '+decimal_amount+' '+ipfs['message_obj']['ether_id']+' • '+this.format_account_balance_figure(base_unit_amount)+' '+coin_item['base_unit'], 'size':'l', 'title_image': e5_image})}
            </div>
        )
    }

    when_request_item_clicked(ipfs, coin_item){
        this.props.show_dialog_bottomsheet(ipfs, 'view_coin_ether_request')
    }








    render_coin_send_receipts_section(item){
        var he = this.props.height-47
        return(
            <div>
                <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px'}}>
                    <div style={{ 'overflow-y': 'auto', height: he, padding:'5px 0px 5px 0px'}}>
                        <div style={{padding:'5px 5px 5px 5px'}}>
                            {this.render_detail_item('3', {'title':this.props.app_state.loc['2927o']/* 'Coin Sends And Receipts.' */, 'details':this.props.app_state.loc['2927p']/* 'All the Coin transfer recepits recorded in your account sent via E5.' */, 'size':'l'})}
                        </div>
                        <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px'}}/>
                        <div style={{padding:'5px 10px 5px 10px'}}>
                            {this.render_coin_send_receipts_items(item)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render_coin_send_receipts_items(coin_item){
        var middle = this.props.height-200;
        var items = [].concat(this.get_send_receipts(coin_item))

        if(items.length == 0){
            items = [0,1]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}}>
                                    {this.render_small_empty_object()}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }else{
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        <div>
                            {items.map((item, index) => (
                                <li style={{}} onClick={() => this.when_send_receipts_item_clicked(item, coin_item)}>
                                    <div>
                                        {this.render_send_receipts_item(item, coin_item)}
                                        <div style={{height: 4}}/>
                                    </div>
                                </li>
                            ))}    
                        </div>
                    </ul>
                </div>
            )
        }
    }

    get_send_receipts(coin_item){
        if(this.props.app_state.has_wallet_been_set == false){
            return [];
        }
        const id = coin_item['symbol']
        const data = this.props.app_state.received_coin_ether_sends[id] || {}
        const requets = [];
        Object.keys(data).forEach(request_id => {
            requets.push(data[request_id])
        });
        return this.sortByAttributeDescending(requets, 'time')
    }

    render_send_receipts_item(ipfs, coin_item){
        if(ipfs['hash']['type'] == 'lifi_swap' || ipfs['hash']['type'] == 'changenow_swap'){
            return this.render_swap_item(ipfs, coin_item)
        }
        const time = ipfs['time']/1000
        const data = this.props.app_state.coin_data[coin_item['symbol']]
        const sender_or_recipient_account = ipfs['sender_address'] == data['address'] ? ipfs['recipient_address'] : ipfs['sender_address'];
        const base_unit_amount = bigInt(ipfs['hash']['amount'])
        const decimal_amount = base_unit_amount / coin_item['conversion']

        const sender_or_receiver = ipfs['sender_address'] == data['address'] ? this.props.app_state.loc['2481e']/* 'To $, % ago.' */ :  this.props.app_state.loc['2481c']/* 'From $, % ago.' */
        return(
            <div>
                {this.render_detail_item('3', {'title':sender_or_receiver.replace('$', start_and_end2(sender_or_recipient_account)).replace('%', this.get_time_diff((Date.now()/1000) - (parseInt(time)))), 'details':''+(new Date(time*1000).toLocaleString())+' • '+decimal_amount+' '+ipfs['ether_id']+' • '+this.format_account_balance_figure(base_unit_amount)+' '+coin_item['base_unit'], 'size':'l'})}
            </div>
        )
    }

    render_swap_item(ipfs, ether_item){
        const time = ipfs['time']/1000
        const my_address = this.props.app_state.accounts[ether_item['e5']].address
        const sender_or_recipient_account = ipfs['sender_address']

        const amount = ipfs['hash']['final_amount'] || 0
        const base_unit_amount = bigInt(amount)
        const received_amount_decimals = ipfs['hash']['received_amount_decimals'] || 18
        const decimal_amount = base_unit_amount / 10**received_amount_decimals

        const sender_or_receiver = this.props.app_state.loc['2481bi']/* 'From $, % ago.' */
        const type = ipfs['hash']['type']
        const message_object = {
            'lifi_swap': this.props.app_state.loc['2927bo']/* 'exchanged via Li.Fi' */,
            'changenow_swap': this.props.app_state.loc['2927bp']/* 'exchanged via ChangeNOW' */
        }
        const footer = message_object[ipfs['hash']['type']]
        return(
            <div>
                {this.render_detail_item('3', {'title':sender_or_receiver.replace('$', start_and_end2(sender_or_recipient_account)).replace('%', this.get_time_diff((Date.now()/1000) - (parseInt(time)))), 'details':''+(new Date(time*1000).toLocaleString())+' • '+decimal_amount+' '+ipfs['ether_id']+' • '+this.format_account_balance_figure(base_unit_amount)+' wei', 'size':'l', 'footer':footer})}
            </div>
        )
    }

    when_send_receipts_item_clicked(ipfs){
        this.props.show_successful_send_bottomsheet(ipfs['hash'], false)
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
                <ViewGroups token_name_thumbnail_directory={this.props.app_state?.token_name_thumbnail_directory} e5s={this.props.app_state?.e5s} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme}  width={width}/>
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

    sortByAttributeDescending(array, attribute) {
      return array.sort((a, b) => {
          if (a[attribute] > b[attribute]) {
          return 1;
          }
          if (a[attribute] < b[attribute]) {
          return -1;
          }
          return 0;
      });
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
            //.toLocaleString('fullwide', {useGrouping:false})
            var power = amount.toLocaleString('fullwide', {useGrouping:false}).length - 9
            return number_with_commas(amount.toLocaleString('fullwide', {useGrouping:false}).substring(0, 9)) +'e'+power
        }
        
    }

}




export default CoinsDetailsSection;