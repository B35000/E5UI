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

// import { ethToEvmos, evmosToEth } from '@evmos/address-converter'
import { from } from "@iotexproject/iotex-address-ts";

var bigInt = require("big-integer");
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

class EthersDetailsSection extends Component {
    
    state = {
        selected: 0, 
        navigate_view_ethers_list_detail_tags_object: this.get_navigate_view_ethers_list_detail_tags(),
        get_ethers_traffic_datapoint_type_detail_tags:this.get_ethers_traffic_datapoint_type_detail_tags()
    };

    get_navigate_view_ethers_list_detail_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e',this.props.app_state.loc['2232']/* 'details' *//* ,this.props.app_state.loc['2448'] *//* 'transactions' */, this.props.app_state.loc['2481d']/* 'requests' */, this.props.app_state.loc['2481i']/* 'E5-Transfers ⚪' */],[1]
          ],
        }
    }

    get_ethers_traffic_datapoint_type_detail_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e',this.props.app_state.loc['2481bp']/* 'gas-average' */, this.props.app_state.loc['2481bq']/* 'proportion' */],[1]
          ],
        }
    }

    render(){
        return(
            <div>
                {this.render_ethers_list_detail()}
            </div>
        )
    }


    render_ethers_list_detail(){
        if(this.props.selected_ether_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_ether_details_section()}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 0px 0px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.navigate_view_ethers_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_ethers_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
        
    }

    get_item_in_array(object_array, id){
        var object = object_array.find(x => x['id'] === id);
        return object
    }

    render_ether_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_ethers_list_detail_tags_object, this.state.navigate_view_ethers_list_detail_tags_object['i'].active)
        var item = this.get_item_in_array(this.get_ethers_data(), this.props.selected_ether_item)

        if(item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }

        if(selected_item == this.props.app_state.loc['2232']/* 'details' */ || selected_item == 'e'){
            return(
                <div>
                    {this.render_ethers_main_details_section(item)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2448']/* 'transactions' */){
            return(
                <div>
                    {this.render_block_history_logs(item)}
                </div>
            )
            
        }
        else if(selected_item == this.props.app_state.loc['2481d']/* 'requests' */){
            return(
                <div>
                    {this.render_ether_requests_section(item)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2481i']/* 'E5-Transfers ⚪' */){
            return(
                <div>
                    {this.render_ether_send_receipts_section(item)}
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

    get_gas_price_from_runs(item){
        var last_events = this.props.app_state.all_E5_runs[item['e5']]
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

    render_ethers_main_details_section(item){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-55
        
        var gas_price = this.get_gas_price(item['e5'])
        // console.log('render_ethers_main_details_section', this.props.app_state.account_balance[item['e5']], gas_price)
        // var gas_transactions = this.props.app_state.account_balance[item['e5']] == 0 ? 0 : Math.floor((this.props.app_state.account_balance[item['e5']]/gas_price)/2_300_000)

        if(gas_price == 0){
            gas_price = 1;
        }

        var gas_transactions = 0;
        if(this.props.app_state.account_balance[item['e5']] != null && parseInt(this.props.app_state.account_balance[item['e5']]) > 0){
            const gas_payable = bigInt(this.props.app_state.account_balance[item['e5']]).divide(gas_price)
            gas_transactions = bigInt(gas_payable).divide(2_300_000)
        }

        var e5_transactions_per_ether = bigInt('1e18').divide(gas_price).divide(2_300_000)
        var gas_transactions_per_ether =  bigInt('1e18').divide(gas_price).divide(23_000)

        const supply_data = this.props.app_state.asset_supply_data[item['symbol']]
        const supply = supply_data == null ? null : parseInt(supply_data)
        const atomic_supply = supply_data == null ? null : bigInt(supply).multiply('1e18')

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
            if(supply == 1){
                const balance_value_in_sat = parseFloat(balance_value_in_btc * conversion).toFixed(4)
                return balance_value_in_sat
            }else{
                const balance_value_in_sat = parseInt(balance_value_in_btc * conversion)
                return balance_value_in_sat
            }
        }
        const market_cap_in_sats = get_market_cap_in_sats('BTC', this.props.app_state.coins['BTC']['conversion'], supply)

        const decimal_price = market_cap_data == null ? null : parseFloat(market_cap / supply).toFixed(2)
        const decimal_price_in_sats = get_market_cap_in_sats('BTC', this.props.app_state.coins['BTC']['conversion'], 1)

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

        const ledger_age = this.props.app_state.ether_ages[item['e5']]
        return(
            <div style={{ 'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 5px 10px', 'padding':'0px 15px 0px 15px'}}>
                <div style={{ 'overflow-y': 'auto', 'overflow-x': 'hidden', height: he, padding:'0px 0px 0px 0px'}}>
                    <div onClick={() => this.props.get_wallet_data_for_specific_e5(item['e5'])}>
                        {this.render_detail_item('7', item['banner-icon'])}
                    </div>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 20}}/>
                    {this.show_moderator_note_if_any(item)}
                    {this.render_object_views(item)}
                    
                    {this.render_detail_item('3', item['ether_name'])}
                    
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['ether_symbol'])}
                    
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['number_label_large'])}
                    </div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['block_time'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['gas_limit'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['network_utilization'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['runs_per_second'])}
                    <div style={{height:10}}/>
                    <div onClick={() => this.props.get_wallet_data_for_specific_e5(item['e5'])}>
                        {this.render_wallet_status(item)}
                    </div>

                    {!isNaN(ledger_age) && (
                        <div>
                            <div style={{height: 10}}/>
                            {this.render_detail_item('3', {'title':this.get_time_difference(ledger_age), 'details':this.props.app_state.loc['2927c']/* Ledger Age. */, 'size':'l'})}
                        </div>
                    )}
                    
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3113w']/* Ledger Consensus Mechanisms */[item['symbol']], 'details':this.props.app_state.loc['2927a']/* Ledger Consensus Mechanism.' */, 'size':'l'})}

                    {this.render_nakamoto_coefficient(item)}
                    
                    {/* {this.render_detail_item('3', item['chain_id'])} */}
                    {/* <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['peer_count'])} */}
                    

                    {supply != null && (
                        <div>
                            <div style={{height: 10}}/>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['2481u']/* 'Ether\'s Supply.' */, 'number':supply, 'relativepower':this.props.app_state.loc['2738cw']/* ether */})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2481u']/* 'Ether\'s Supply.' */, 'subtitle':this.format_power_figure(supply), 'barwidth':this.calculate_bar_width(supply), 'number':''+this.format_account_balance_figure(supply), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['2738cw']/* ether */, })}
                                </div>

                                <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['2481v']/* 'Ether\'s Atomic Supply.' */, 'number':atomic_supply, 'relativepower':this.props.app_state.loc['2738cx']/* wei */})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2481v']/* 'Ether\'s Atomic Supply.' */, 'subtitle':this.format_power_figure(atomic_supply), 'barwidth':this.calculate_bar_width(atomic_supply), 'number':''+this.format_account_balance_figure(atomic_supply), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['2738cx']/* wei */, })}
                                </div>
                            </div>
                        </div>
                    )}

                    {decimal_price != null && (
                        <div>
                            <div style={{height: 10}}/>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                <div>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2481y']/* 'Ether\'s Decimal Price.' */, 'subtitle':this.format_power_figure(decimal_price), 'barwidth':this.calculate_bar_width(decimal_price), 'number':''+format_decimal_price_value(decimal_price), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1593ef']/* 'USD' */, })}
                                </div>

                                <div>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2481z']/* 'Ether\'s Decimal Price in $' */.replace('$', 'SATs'), 'subtitle':this.format_power_figure(decimal_price_in_sats), 'barwidth':this.calculate_bar_width(decimal_price_in_sats), 'number':''+format_decimal_price_value(decimal_price_in_sats), 'barcolor':'#606060', 'relativepower':'SATs', })}
                                </div>
                            </div>
                        </div>
                    )}

                    {market_cap != null && (
                        <div>
                            <div style={{height: 10}}/>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['2481w']/* 'Ether\'s Market Capitalization.' */, 'number':market_cap, 'relativepower':this.props.app_state.loc['1593ef']/* 'USD' */})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2481w']/* 'Ether\'s Market Capitalization.' */, 'subtitle':this.format_power_figure(market_cap), 'barwidth':this.calculate_bar_width(market_cap), 'number':''+this.format_account_balance_figure(market_cap), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1593ef']/* 'USD' */, })}
                                </div>

                                <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['2481x']/* 'Ether\'s Market Cap in $' */.replace('$', 'SATs'), 'number':market_cap_in_sats, 'relativepower':this.props.app_state.loc['1593ef']/* 'USD' */})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2481x']/* 'Ether\'s Market Cap in $' */.replace('$', 'SATs'), 'subtitle':this.format_power_figure(market_cap_in_sats), 'barwidth':this.calculate_bar_width(market_cap_in_sats), 'number':''+this.format_account_balance_figure(market_cap_in_sats), 'barcolor':'#606060', 'relativepower':'SATs', })}
                                </div>
                            </div>
                        </div>
                    )}

                    {this.render_coin_ether_chart_data(item)}

                    {this.render_ether_gas_chart_info(item)}

                    {this.render_detail_item('0')}

                    {/* {this.render_detail_item('3', item['gas_used_chart_data_label'])} */}
                    {/* {this.render_detail_item('6', item['gas_used_chart_data'])} */}
                    {/* <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['gas_used_chart_data_average'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['highest_gas_consumed'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['lowest_gas_consumed'])}
                    {this.render_detail_item('0')} */}

                    
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2453']/* 'Gas Price in Wei' */, 'number':this.get_gas_price(item['e5']), 'relativepower':this.props.app_state.loc['2738cx']/* wei */})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2453']/* 'Gas Price in Wei' */, 'subtitle':this.format_power_figure(this.get_gas_price(item['e5'])), 'barwidth':this.calculate_bar_width(this.get_gas_price(item['e5'])), 'number':this.format_account_balance_figure(this.get_gas_price(item['e5'])), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['2738cx']/* wei */, })}

                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2454']/* 'Gas Price in Gwei' */, 'subtitle':this.format_power_figure(this.get_gas_price(item['e5'])/10**9), 'barwidth':this.calculate_bar_width(this.get_gas_price(item['e5'])/10**9), 'number':(this.get_gas_price(item['e5'])/10**9), 'barcolor':'#606060', 'relativepower':'gwei', })}
                    </div>

                    {this.get_base_fee_in_wei(item['e5']) > 0 && (
                        <div>
                            <div style={{height: 10}}/>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} >
                                {this.render_detail_item('2', item['base_fee_per_gas_unit_in_gwei'])}
                                {this.render_detail_item('2', item['base_fee_per_gas_unit'])}
                            </div>
                        </div>
                    )}

                    
                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2455']/* 'E5 txs/ether (2.3M Gas average)' */, 'subtitle':'', 'barwidth':this.calculate_bar_width(e5_transactions_per_ether), 'number':this.format_account_balance_figure(e5_transactions_per_ether), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['665']/* 'transactions' */, })}

                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2456']/* 'Gas txs/ether (23K Gas average)' */, 'subtitle':'', 'barwidth':this.calculate_bar_width(gas_transactions_per_ether), 'number':this.format_account_balance_figure(gas_transactions_per_ether), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['665']/* 'transactions' */, })}
                    </div>


                    {this.render_detail_item('0')}
                    {this.render_wallet_address(item, item['e5'])}

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2450']/* 'Your Balance in Wei' */, 'number':this.props.app_state.account_balance[item['e5']], 'relativepower':this.props.app_state.loc['2738cx']/* wei */})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2450']/* 'Your Balance in Wei' */, 'subtitle':this.format_power_figure(this.props.app_state.account_balance[item['e5']]), 'barwidth':this.calculate_bar_width(this.props.app_state.account_balance[item['e5']]), 'number':this.format_account_balance_figure(this.props.app_state.account_balance[item['e5']]), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['2738cx']/* wei */, })}

                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2451']/* 'Your Balance in Ether' */, 'subtitle':this.format_power_figure(this.props.app_state.account_balance[item['e5']]/10**18), 'barwidth':this.calculate_bar_width(this.props.app_state.account_balance[item['e5']]/10**18), 'number':(this.props.app_state.account_balance[item['e5']]/10**18), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['2738cw']/* ether */, })}

                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2452']/* Transactions (2.3M Gas average)' */, 'subtitle':this.format_power_figure(gas_transactions), 'barwidth':this.calculate_bar_width(gas_transactions), 'number':this.format_account_balance_figure(gas_transactions), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1378']/* 'transactions' */, })}
                    </div>

                    {this.render_wallet_vaue(item, (this.props.app_state.account_balance[item['e5']]/10**18))}
                    
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2457']/* '💸 Send/Receive Ether' */, 'details':this.props.app_state.loc['2458']/* 'Send or receive ether from a specified account.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_send_receive_ether_bottomsheet(item)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2459']/* 'Send/Receive' */, 'action': ''})}
                    </div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2460']/* '⚙️ Node Settings' */, 'details':this.props.app_state.loc['2461']/* 'Change the remote procedure call (RPC) provider setting for making your transactions.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_rpc_settings(item)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2462']/* 'Open' */, 'action': ''})}
                    </div>

                    {this.show_bridge_button(item)}

                    {this.show_swap_ether_button(item)}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }


    render_nakamoto_coefficient(item){
        const symbol = item['symbol']
        const coefficient_data = this.props.app_state.decentralization_metrics[symbol]
        const time = new Date(this.props.app_state.decentralization_metrics['time'])

        if(coefficient_data != null){
            const validator_text = coefficient_data['validators'] > 0 ? number_with_commas(coefficient_data['validators']) : '???'
            return(
                <div>
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'title':number_with_commas(coefficient_data['coefficient']), 'details':this.props.app_state.loc['2927bx']/* 'Nakamoto Coefficient.' */, 'size':'l'})}

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'title':validator_text, 'details':this.props.app_state.loc['2927by']/* 'Active Validators/Miners' */, 'size':'l'})}
                    
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['2927bz']/* 'As of $' */.replace('$', time.toLocaleString()), 'textsize':'11px', 'font':this.props.app_state.font})}
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
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2481r']/* 'Ethers Views.' */, 'details':this.props.app_state.loc['2481s']/* 'Chart containing the ether\'s views over time.' */, 'size':'l'})}
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





    show_swap_ether_button(item){
        const external_swappers = this.props.app_state.e5s[item['e5']].external_swappers
        if(external_swappers != null && external_swappers.length > 0){
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2481bc']/* '💱 Swap Ether' */, 'details':this.props.app_state.loc['2481bd']/* 'Convert your ether at current market exchange rates to another ether or coin.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_external_swappers(external_swappers)}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_swap_ether_page(item)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2481bh']/* 'Begin Swap' */, 'action': ''})}
                    </div>
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
            this.props.show_swap_ether_bottomsheet(item, 'ether')
        }
    }

    show_bridge_button(item){
        if(this.props.app_state.e5s[item['e5']].bridge_enabled == true){
            const layer1e5 = this.props.app_state.e5s[item['e5']].parent
            var state_list = this.props.app_state.ether_data
            const parent_ether_object = state_list.filter((list_item) => {
                return list_item['e5'] == layer1e5
            })[0]
            const parent_ether_name = parent_ether_object['name']
            const l1_balance = this.props.app_state.account_balance[layer1e5]
            if(l1_balance == null || l1_balance == 0) return;
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2481o']/* 'Bridge Your Ether.' */, 'details':this.props.app_state.loc['2481p']/* '𖣑 Bridge some Ether from your $ wallet into this Layer 2 wallet.' */.replace('$', parent_ether_name), 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_bridge_settings(item)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2481q']/* 'Bridge' */, 'action': ''})}
                    </div>
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    open_bridge_settings(item){
        if(!this.props.app_state.has_wallet_been_set){
            this.props.open_wallet_guide_bottomsheet('action')
        }else{
            this.props.show_bridge_ether_bottomsheet(item)
        }
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
                            {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2927j']/* 'Wallet Value' */, 'subtitle':this.format_power_figure(balance_value_in_sat), 'barwidth':this.calculate_bar_width(balance_value_in_sat), 'number':(balance_value_in_sat), 'barcolor':'#606060', 'relativepower':'SATs', })}
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

    render_wallet_status(item){
        if(this.get_gas_limit(item['e5']) == 0){
            if(this.props.app_state.wallet_status[item['e5']] == 'synchronizing'){
                return(
                    <div>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['2463']/* 'Wallet Status' */, 'details':this.props.app_state.loc['2464']/* Syncronizing wallet, please wait...' */, 'size' :'l'})}
                    </div>
                )
            }else{
                return(
                    <div>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['2463']/* 'Wallet Status' */, 'details':this.props.app_state.loc['2465']/* 'Wallet sync failed. Please reload the wallet.' */, 'size' :'l'})}
                    </div>
                )
            }
            
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2466']/* 'Wallet Status' */, 'details':this.props.app_state.loc['2467']/* 'Syncronized.' */, 'size' :'l'})}
                </div>
            )
        }
    }


    open_send_receive_ether_bottomsheet(item){
        if(!this.props.app_state.has_wallet_been_set){
            // this.props.notify('You need to set your wallet first', 800)
            this.props.open_wallet_guide_bottomsheet('action')
        }else{
            // var item = this.get_ethers_data()[this.props.selected_ether_item];
            this.props.open_send_receive_ether_bottomsheet(item)
        }
    }

    open_rpc_settings(item){
        this.props.open_rpc_settings(item)
    }

    when_navigate_view_ethers_list_detail_tags_object_updated(tag_group){
        this.setState({navigate_view_ethers_list_detail_tags_object: tag_group})
    }

    get_ethers_data(){
        var state_list = this.props.app_state.ether_data
        var list = []
        state_list.forEach(ether_desc => {
            if(ether_desc['disabled'] == false) list.push(this.get_token(ether_desc['symbol'], ether_desc['name'], ether_desc['e5']));
        });

        var sorted_list =  this.sortByAttributeDescending(list, 'name')
        var prioritized_list = []
        sorted_list.forEach(token => {
            if(this.does_account_have_balance(token['e5'])){
                prioritized_list.push(token)
            }
        });
        sorted_list.forEach(token => {
            if(!prioritized_list.includes(token)){
                prioritized_list.push(token)
            }
        });
        return prioritized_list;
    }

    does_account_have_balance(e5){
        if(this.props.app_state.account_balance[e5] != null && this.props.app_state.account_balance[e5]!=0){
            return true
        }
        return false
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

    

    get_token(symbol, name, e5){
        const other_tags = []
        if(this.props.app_state.e5s[e5].class == 'L2'){
            other_tags.push(this.props.app_state.loc['2481j']/* Layer-2 */)
            other_tags.push(this.props.app_state.loc['2481m']/* Rollup */)
            if(this.props.app_state.e5s[e5].rollup_type == 'op'){
                other_tags.push(this.props.app_state.loc['2481k']/* Optimistic */)
                other_tags.push(this.props.app_state.loc['2481l']/* Superchain */)
            }
            else if(this.props.app_state.e5s[e5].rollup_type == 'zk'){
                other_tags.push(this.props.app_state.loc['2481n']/* zero-knowledge */)
            }
        }
        let ether_symbol_footer = null
        const layer1e5 = this.props.app_state.e5s[e5].parent
        if(layer1e5 != null && layer1e5 != ''){
            const token = this.props.app_state.e5s[layer1e5].token
            ether_symbol_footer = this.props.app_state.loc['2481be']/* Internal alias for $ */.replace('$', token)
        }
        const parent_coin = this.props.app_state.e5s[e5].parent_coin
        if(parent_coin != null && parent_coin != ''){
            ether_symbol_footer = this.props.app_state.loc['2481be']/* Internal alias for $ */.replace('$', parent_coin)
        }

        const gas_limit_per_block = this.get_latest_block_data(e5).gasLimit
        const average_block_time = this.get_average_block_time_from_blocks2(e5)
        const runs_per_second = (gas_limit_per_block / (average_block_time)) / (2_300_000)
        const runs_per_second_final = runs_per_second > 1000 ? this.format_account_balance_figure(parseInt(runs_per_second)) : parseFloat(runs_per_second).toFixed(3)

        return {
                'id':symbol,
                'name': name,
                'symbol': symbol,
                'e5': e5,
                'image': this.props.app_state.e5s[e5].ether_image,
                'label':{'title':symbol, 'details':name, 'size':'l', 'image': this.props.app_state.e5s[e5].ether_image},
                'tags':{'active_tags':[name, 'EVM', symbol].concat(other_tags), 'index_option':'indexed'},
                'ether_name':{'title':name, 'details':this.props.app_state.loc['2481ba']/* 'Ether Name.' */, 'size' :'l'},
                'ether_symbol':{'title':symbol, 'details':this.props.app_state.loc['2481bb']/* 'Ether Symbol.' */, 'size' :'l', 'footer':ether_symbol_footer},
                'runs_per_second':{'title':this.props.app_state.loc['2481bg']/* '$ runs/sec' */.replace('$', runs_per_second_final), 'details':this.props.app_state.loc['2481bf']/* 'Run Throughput (2.3M gas average)' */, 'size' :'l'},
                
                'number_label':this.get_blockchain_data('s', e5),
                'number_label_large': this.get_blockchain_data('l', e5),
                'banner-icon':{'header':symbol, 'subtitle':name, 'image':this.props.app_state.e5s[e5].ether_image},
                'chain_id':{'title':this.props.app_state.chain_id[e5], 'details':this.props.app_state.loc['2468']/* 'Chain ID' */, 'size' :'l'},
                'peer_count':{'title':''+this.props.app_state.number_of_peers[e5], 'details':'Number of Peers', 'size' :'l'},
                
                'gas_used_chart_data_label':{'title':'Gas Used', 'details':'Amount of gas used in the last 100 blocks', 'size' :'l'},
                'gas_used_chart_data':{'chart_color':'#FCFCFC', 'background_color':'#D5D5D5', 'dataPoints':this.get_gas_used_data_points(e5)},
                'gas_used_chart_data_average':{'title':number_with_commas(this.get_gas_used_data_point_average(e5)), 'details':'Average Gas Used in the last 100 blocks', 'size' :'l'},
                'highest_gas_consumed':{'title':number_with_commas(this.get_highest_gas_figure(e5)), 'details':'Highest amount of Gas Consumed for Last 100 Blocks', 'size' :'l'},
                'lowest_gas_consumed':{'title':number_with_commas(this.get_lowest_gas_figure(e5)), 'details':'Lowest amount of Gas Consumed for Last 100 Blocks', 'size' :'l'},

                'transaction_count_chart_data_label':{'title':'Transactions Processed', 'details':'Amount of transactions processed in the last 100 blocks', 'size' :'l'},
                'transaction_count_chart_data':{'interval':0, 'background_color':'#D5D5D5', 'dataPoints':this.get_transaction_count_data_points(e5)},
                

                'gas_limit':{'title':this.get_gas_limit(e5), 'details':this.props.app_state.loc['2469']/* 'Gas Limit per Block' */, 'size' :'l'},

                'base_fee_per_gas_unit':{ 'style':'l', 'title':this.props.app_state.loc['2470']/* Base Fee in wei' */, 'subtitle':this.format_power_figure(this.get_base_fee_in_wei(e5)), 'barwidth':this.calculate_bar_width(this.get_base_fee_in_wei(e5)), 'number':this.format_account_balance_figure(this.get_base_fee_in_wei(e5)), 'barcolor':'', 'relativepower':this.props.app_state.loc['2738cx']/* wei */, 'n':this.get_base_fee_in_wei(e5)},

                'base_fee_per_gas_unit_in_gwei':{ 'style':'l', 'title':this.props.app_state.loc['2471']/* 'Base Fee in gwei' */, 'subtitle':this.format_power_figure(this.get_base_fee_in_wei(e5)/10**9), 'barwidth':this.calculate_bar_width(this.get_base_fee_in_wei(e5)/10**9), 'number':(this.get_base_fee_in_wei(e5)/10**9), 'barcolor':'', 'relativepower':'gwei', },

                'supply':{'style': 'l', 'title':'Ether Supply', 'subtitle': this.format_power_figure(this.get_supply_figure(e5)), 'barwidth': this.calculate_bar_width(this.get_supply_figure(e5)), 'number': this.format_account_balance_figure(this.get_supply_figure(e5)), 'barcolor': '', 'relativepower': this.props.app_state.loc['2738cw']/* ether */},

                'address':{'details':start_and_end(this.get_account_address(e5)), 'title':this.props.app_state.loc['2472']/* 'Your Address' */, 'size' :'l'},
                'block_time':{'title':this.get_average_block_time_from_blocks(e5), 'details':this.props.app_state.loc['2473']/* 'Average block time for the last 5 blocks' */, 'size' :'l'},

                'network_utilization':{'title':this.get_network_utilization_rate_average(e5)+'%', 'details':this.props.app_state.loc['2481t']/* 'The network\'s average utilization rate.' */, 'size' :'l'}
        }
    }

    get_supply_figure(e5){
        var value = this.props.app_state.e5_ether_supply_data[e5]
        if(value == null || value['available_supply'] == null){
            return 0
        }
        return parseInt(value['available_supply'])
    }


    render_wallet_address(item, e5){
        if(this.props.app_state.has_wallet_been_set){
            return(
                <div>
                    <div onClick={() => this.copy_to_clipboard(this.get_account_address(e5))}>
                        {this.render_detail_item('3', item['address'])}
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    <div>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['2474']/* 'Wallet Address' */, 'details':start_and_end(this.format_address_if_harmony('0x0000000000000000000000000000000000000000', e5)), 'size':'l'})}
                    </div>
                </div>
            )
        }
    }

    get_account_address(e5){
        if(this.props.app_state.accounts[e5] != null){
            return this.format_address_if_harmony(this.props.app_state.accounts[e5].address, e5);
        }
    }

    format_address_if_harmony(address, e5){
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

    replace_0x_with_xdc(address){
        return 'xdc'+address.toString().slice(2)
    }

    convert_to_iotx(address){
        const addr = from(address.toString());
        return addr.string();
    }

    copy_to_clipboard(signature_data){
        navigator.clipboard.writeText(signature_data)
        this.props.notify(this.props.app_state.loc['2475']/* 'copied address to clipboard' */, 600)
    }


    get_gas_price(e5){
        var gas_price = this.props.app_state.gas_price[e5]
        if(gas_price == null){
            gas_price = this.get_gas_price_from_runs(e5)
        }
        return gas_price
    }


    // get_gas_price_from_runs(e5){
    //     var last_events = this.props.app_state.all_E5_runs[e5]
    //     var sum = 0
    //     if(last_events != null){
    //         var last_check = last_events.length < 50 ? last_events.length : 50
    //         for(var i=0; i<last_check; i++){
    //             sum += last_events[i].returnValues.p7
    //         }
    //         sum = sum/last_check;
    //     }
    //     return sum
    // }

    get_average_block_time_from_blocks(e5){
        var blocks = this.props.app_state.last_blocks[e5]== null ? [] : this.props.app_state.last_blocks[e5]        
        var total_time = 0
        var is = 0
        for(var i=1; i<blocks.length; i++){
            var block = blocks[i];
            try{
                if(block != null && block.timestamp != null && blocks[i-1].timestamp != null){
                    let time = block.timestamp - blocks[i-1].timestamp
                    total_time += time
                    is++
                }
            }catch(e){
                // console.log(e)
            }
            
        }
        var av_time = total_time / is
        return av_time+this.props.app_state.loc['2476']/* ' seconds' */
    }

    get_average_block_time_from_blocks2(e5){
        var blocks = this.props.app_state.last_blocks[e5]== null ? [] : this.props.app_state.last_blocks[e5]        
        var total_time = 0
        var is = 0
        for(var i=1; i<blocks.length; i++){
            var block = blocks[i];
            try{
                if(block != null && block.timestamp != null && blocks[i-1].timestamp != null){
                    let time = block.timestamp - blocks[i-1].timestamp
                    total_time += time
                    is++
                }
            }catch(e){
                // console.log(e)
            }
            
        }
        var av_time = total_time / is
        return av_time
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
                const price_in_usd = data_point['price'];
                const time = data_point['time']
                if(selected_preferred_currency == this.props.app_state.loc['1593eg']/* 'SAT' */){
                    const price_of_bitcoin_at_time = this.findClosestSorted(btc_chart_data, time)
                    if(price_of_bitcoin_at_time != null){
                        const bitcoin_price = price_of_bitcoin_at_time['price']
                        const number_of_btc_for_one_usd = 1 / bitcoin_price
                        const balance_value_in_btc = number_of_btc_for_one_usd * price_in_usd
                        const balance_value_in_sat = parseInt(balance_value_in_btc * this.props.app_state.coins['BTC']['conversion'])

                        data.push(parseFloat(balance_value_in_sat).toFixed(4))
                    }
                }else{
                    const point = price_in_usd * this.props.app_state.my_currency_exchange_rate
                    data.push(point.toFixed(2))
                }
            }
        }

        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 366;
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

        // console.log('get_dominance_change_datapoints', 'btc_chart_data length: ', btc_chart_data.length, 'chart_data length: ', chart_data.length)

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
                    dps.push({x: xVal,y: yVal, indexLabel: ""+final_indicator});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
        }

        return { dps, starting_time: starting_time }
        
    }




    render_ether_gas_chart_info(item){
        const symbol = item['symbol']
        const chart_data = this.props.app_state.ether_gas_chart_info[symbol];
        if(chart_data != null && chart_data.length > 0){
            const datapoints1 = this.get_ether_gas_chart_data(item);
            const datapoints2 = this.get_ether_gas_proportion_chart_data(item)
            const selected_item = this.get_selected_item(this.state.get_ethers_traffic_datapoint_type_detail_tags, 'e')

            if(selected_item == this.props.app_state.loc['2481bp']/* 'gas-average' */){
                return(
                    <div>
                        <div style={{height: 10}}/>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['2481bj']/* 'Network Traffic History.' */, 'details':this.props.app_state.loc['2481bk']/* 'Chart containing the amount of gas used in each block in the last day or so.' */.replace('$', item['symbol']), 'size':'l'})}
                        <div style={{height: 10}}/>
                        {this.render_gas_or_proportion_tags()}

                        {this.render_detail_item('6', {'dataPoints':datapoints1.dps, 'start_time':datapoints1.starting_time, 'y_axis_units':'gas'})}

                        <div style={{height: 10}}/>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['2481bl']/* Y-Axis: Gas' */, 'details':this.props.app_state.loc['1461']/* 'X-Axis: Time' */, 'size':'s'})}
                    </div>
                )
            }
            else{
                return(
                    <div>
                        <div style={{height: 10}}/>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['2481bm']/*  'Network Traffic.' */, 'details':this.props.app_state.loc['2481bn'] /* 'Chart containing the amount of gas used as a proportion of the networks block gas limit over the last day or so.' */, 'size':'l'})}
                        <div style={{height: 10}}/>
                        {this.render_gas_or_proportion_tags()}

                        {this.render_detail_item('6', {'dataPoints':datapoints2.dps, 'start_time':datapoints2.starting_time, 'y_axis_units':'%'})}

                        <div style={{height: 10}}/>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['2481bo']/* ' Y-Axis: Proportion' */ , 'details':this.props.app_state.loc['1461'] /* 'X-Axis: Time' */, 'size':'s'})}
                    </div>
                )
            }
        }
    }

    render_gas_or_proportion_tags(){
        return(
            <Tags font={this.props.app_state.font} page_tags_object={this.state.get_ethers_traffic_datapoint_type_detail_tags} tag_size={'l'} when_tags_updated={this.when_get_ethers_traffic_datapoint_type_detail_tags_updated.bind(this)} theme={this.props.theme}/>
        )
    }

    when_get_ethers_traffic_datapoint_type_detail_tags_updated(tags){
        this.setState({get_ethers_traffic_datapoint_type_detail_tags: tags})
    }

    get_ether_gas_chart_data(item){
        const symbol = item['symbol'];
        const chart_data = this.props.app_state.ether_gas_chart_info[symbol];
        const data = []
        const starting_time = chart_data != null && chart_data.length > 0 ? chart_data[0]['time']*1000 : Date.now()

        if(chart_data != null){
            for(var j=0; j<chart_data.length; j++){
                const data_point = chart_data[j];
                const gas = data_point['gas'];
                const time = data_point['time']
                data.push(parseInt(gas))
            }
        }

        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = data.length;
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[i]
            
            if(yVal != null){
                var indicator = this.format_account_balance_figure(data[i])
                var final_indicator = '$ %'.replace('$', indicator).replace('%', 'gas')
                
                if(i == parseInt(0.35*noOfDps) || i == parseInt(0.65*noOfDps)){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+final_indicator});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
        }

        return { dps, starting_time: starting_time }
    }

    get_ether_gas_proportion_chart_data(item){
        const symbol = item['symbol'];
        const chart_data = this.props.app_state.ether_gas_chart_info[symbol];
        const data = []
        const starting_time = chart_data != null && chart_data.length > 0 ? chart_data[0]['time']*1000 : Date.now()

        if(chart_data != null){
            for(var j=0; j<chart_data.length; j++){
                const data_point = chart_data[j];
                const proportion = data_point['proportion'];
                const time = data_point['time']
                data.push(parseFloat(proportion))
            }
        }

        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = data.length;
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[i]
            
            if(yVal != null){
                var indicator = data[i].toFixed(4)
                var final_indicator = '$%'.replace('$', indicator)
                
                if(i == parseInt(0.35*noOfDps) || i == parseInt(0.65*noOfDps)){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+final_indicator});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
        }

        return { dps, starting_time: starting_time }
    }











    render_block_history_logs(object){
        var middle = this.props.height-55;
        var size = this.props.screensize;
        if(size == 'm'){
            middle = this.props.height-190;
        }
        var tx_history = this.props.app_state.e5_ether_tx_history[object['e5']]

        // if(tx_history == null){
        //     return(
        //         <div style={{height: middle, 'margin':'10px 5px 0px 5px'}}>
        //             {this.render_detail_item('4', {'text':'Transaction history Unavailable', 'textsize':'15px', 'font':this.props.app_state.font})}
        //         </div>
        //     )
        // }

        if(tx_history == null || this.get_txs_history_txs(tx_history, object['e5']) == null || this.get_txs_history_txs(tx_history, object['e5']).length == 0){
            var items = [0, 1]
            return(
                <div style={{height: middle, 'margin':'10px 5px 0px 5px'}}>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 5px 0px 5px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px'}}>
                                    <div style={{ height: 80, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '7px', 'padding': '10px 0px 10px 10px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
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
        }
        var items = [].concat(this.get_txs_history_txs(tx_history, object['e5']))
        var middle = this.props.height;
        return ( 
            <div style={{overflow: 'auto',height: middle, 'margin':'10px 5px 5px 0px'}}>
                <ul style={{ 'padding': '0px 5px 0px 5px', 'list-style': 'none'}}>
                    {items.map((item, index) => (
                        <div>
                            {this.render_block_history_log_item(item, index, object['e5'])}
                        </div>
                    ))}
                </ul>
            </div>
        );
    }

    get_txs_history_txs(tx_history, e5){
        if(e5 == 'E25' || e5 == 'E35' || e5 == 'E115' || e5 == 'E85' || e5 == 'E185' || e5 == 'E195' || e5 == 'E205' || e5 == 'E255' || e5 == 'E285' || e5 == 'E305' || e5 == 'E395'){
            return tx_history['items']
        }
        else if(e5 == 'E305'){
            var data =  tx_history['result']['transactions']
            return data
        }
        else if(e5 == 'E55' || e5 == 'E65'|| e5 == 'E75' || e5 == 'E95' || e5 == 'E105' || e5 == 'E125' || e5 == 'E135' || e5 == 'E155' || e5 == 'E145' || e5 == 'E215' || e5 == 'E225' || e5 == 'E235' || e5 == 'E245' || e5 == 'E265' || e5 == 'E275' || e5 == 'E295' || e5 == 'E315' || e5 == 'E325' || e5 == 'E335' || e5 == 'E345' || e5 == 'E355' || e5 == 'E365' || e5 == 'E385' || e5 == 'E485' || e5 == 'E495'|| e5 == 'E505'|| e5 == 'E515' || e5 == 'E565' || e5 == 'E625' || e5 == 'E675' || e5 == 'E685' || e5 == 'E695' || e5 == 'E705' || e5 == 'E735' || e5 == 'E755'){
            return tx_history['result']
        }
        else if(e5 == 'E165'){
            return tx_history['data']
        }

    }


    when_tx_history_item_clicked(index){
        if (this.state.selected_tx_history_event_item == index) {
            this.setState({ selected_tx_history_event_item: null })
        } else {
            this.setState({ selected_tx_history_event_item: index })
        }
    }

    render_block_history_log_item(item, index, e5){
        var item_object = this.get_block_history_log_item_object(item, e5)
        // var to = this.get_from_value(item, e5)['to']
        // var e5_address = this.props.app_state.e5s[e5].e5_address
        // if(e5 == 'E35') e5_address = this.props.app_state.e5s['E25'].e5_address
        // if(to == e5_address){
        //     return;
        // }
        if(this.state.selected_tx_history_event_item == index){
            return ( 
                <div>
                    <div style={{'padding': '1px'}}>
                        <div onClick={()=> this.when_tx_history_item_clicked(index)}>
                            {this.from_to_filter(item, e5)}
                        </div>
                        {this.render_gas_used_value(item_object, e5)}
                        <div style={{height: 2}}/>
                        <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':item_object['gas_price']['title'], 'number':item_object['gas_price']['n'], 'relativepower':item_object['gas_price']['relativepower']})}>
                            {this.render_detail_item('2', item_object['gas_price'])}
                            {this.render_detail_item('2', item_object['gas_price_gwei'])}
                        </div>
                        <div style={{height: 2}}/>
                        <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':item_object['value']['title'], 'number':item_object['value']['n'], 'relativepower':item_object['value']['relativepower']})}>
                            {this.render_detail_item('2', item_object['value'])}
                            {this.render_detail_item('2', item_object['value_ether'])}
                        </div>
                        <div style={{height: 2}}/>
                        {this.render_detail_item('3', item_object['time'])}
                        <div style={{height: 2}}/>
                        {this.render_detail_item('3', item_object['block'])}
                        <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }}/>
                    </div>         
                </div>
            );
        }else{
            return ( 
                <div>
                    <div style={{'padding': '1px'}} onClick={()=> this.when_tx_history_item_clicked(index)}>
                        {this.from_to_filter2(item, e5)}
                    </div>         
                </div>
            );
        }
        
    }

    get_gas_used(item_object, e5){
        if(e5 != 'E45'){
            return parseInt(item_object['gas_used'])
        }
        return 0
    }

    render_gas_used_value(item_object, e5){
        if(e5 != 'E45'){
            return(
                <div>
                    <div style={{height: 2}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':item_object['gas_used']['title'], 'number':item_object['gas_used']['n'], 'relativepower':item_object['gas_used']['relativepower']})}>
                        {this.render_detail_item('2', item_object['gas_used'])}
                    </div>
                </div>
            )
        }
    }

    get_from_value(item, e5){
        if(e5 == 'E25' || e5 == 'E35' || e5 == 'E85' || e5 == 'E185'|| e5 == 'E195' || e5 == 'E205' || e5 == 'E255' || e5 == 'E285' || e5 == 'E395'){
            var relative_time = this.get_time_difference(new Date(item['timestamp']).getTime()/1000)
            return {'from':item['from']['hash'], 'to':item['to']['hash'], 'gas_used':item['gas_used'], 'gas_price':item['gas_price'], 'value':item['value'], 'time':''+(new Date(item['timestamp'])), 'block':number_with_commas(item['block']), 'relative_time':''+(relative_time)}
        }
        else if(e5 == 'E305'){
            var relative_time = this.get_time_difference(item['timestamp'])
            return {'from':item['from'], 'to':item['to'], 'gas_used':item['gas'], 'gas_price':item['gasPrice'], 'value':item['value'], 'time':''+(new Date(item['timestamp']*1000)), 'block':number_with_commas(item['blockNumber']), 'relative_time':''+(relative_time)}
        }
        else if(e5 == 'E55' || e5 == 'E65' || e5 == 'E225' || e5 == 'E235' || e5 == 'E245' || e5 == 'E265'){
            var relative_time = this.get_time_difference(item['timeStamp'])
            return {'from':item['from'], 'to':item['to'], 'gas_used':item['gasUsed'], 'gas_price':item['gasPrice'], 'value':item['value'], 'time':''+(new Date(item['timeStamp']*1000)), 'block':number_with_commas(item['blockNumber']), 'relative_time':''+(relative_time)}
        }
        else if(e5 == 'E75' || e5 == 'E95' || e5 == 'E105' || e5 == 'E125' || e5 == 'E135'|| e5 == 'E155' || e5 == 'E145' || e5 == 'E215' || e5 == 'E275' || e5 == 'E295' || e5 == 'E315' || e5 == 'E325' || e5 == 'E335' || e5 == 'E345' || e5 == 'E355' || e5 == 'E365' || e5 == 'E385' || e5 == 'E485'|| e5 == 'E495'|| e5 == 'E505'|| e5 == 'E515' || e5 == 'E625' || e5 == 'E675' || e5 == 'E685' || e5 == 'E695' || e5 == 'E705'|| e5 == 'E735'|| e5 == 'E755'){
            var relative_time = this.get_time_difference(item['timeStamp'])
            return {'from':item['from'], 'to':item['to'], 'gas_used':item['gasUsed'], 'gas_price':item['gasPrice'], 'value':item['value'], 'time':''+(new Date(item['timeStamp']*1000)), 'block':number_with_commas(item['blockNumber']), 'relative_time':''+(relative_time)}
        }
        else if(e5 == 'E115' || e5 == 'E165'|| e5 == 'E565'){
            var relative_time = this.get_time_difference(item['timestamp'])
            return {'from':item['from'], 'to':item['to'], 'gas_used':item['gasUsed'], 'gas_price':item['gasPrice'], 'value':item['value'], 'time':''+(new Date(item['timestamp']*1000)), 'block':number_with_commas(item['blockNumber']), 'relative_time':''+(relative_time)}
        }
        else if(e5 == 'E305'){
            var relative_time = this.get_time_difference(new Date(item['timestamp']).getTime()/1000)
            return {'from':item['from'], 'to':item['to'], 'gas_used':item['gasUsed'], 'gas_price':item['gasPrice'], 'value':item['value'], 'time':''+(new Date(item['timestamp'])), 'block':number_with_commas(item['blockNumber']), 'relative_time':''+(relative_time)}
        }
    }

    from_to_filter(item, e5){
        var from = this.get_from_value(item, e5)['from']
        var to = this.get_from_value(item, e5)['to']
        if(this.format_address(from, e5) == 'You'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2419']/* 'To: ' */,'details':this.format_address(to, e5), 'size':'l'})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2420']/* 'From: ' */,'details':this.format_address(from, e5), 'size':'l'})}
                </div>
            )
        }
    }

    from_to_filter2(item, e5){
        var from = this.get_from_value(item, e5)['from']
        var to = this.get_from_value(item, e5)['to']
        var value = parseInt(this.get_from_value(item, e5)['value'])
        if(this.format_address(from, e5) == 'You'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2419']/* 'To: ' */+this.format_address(to, e5),'details':this.format_account_balance_figure(value)+' wei', 'size':'s'})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2420']/* 'From: ' */+this.format_address(to, e5),'details':this.format_account_balance_figure(value)+' wei', 'size':'s'})}
                </div>
            )
        }
    }

    get_block_history_log_item_object(item, e5){
        var from = this.get_from_value(item, e5)['from']
        var to = this.get_from_value(item, e5)['to']
        var gas_used = parseInt(this.get_from_value(item, e5)['gas_used'])
        var gas_price = parseInt(this.get_from_value(item, e5)['gas_price'])
        var value = parseInt(this.get_from_value(item, e5)['value'])
        var block = this.get_from_value(item, e5)['block']
        var time = this.get_from_value(item, e5)['time']
        var relative_time = this.get_from_value(item, e5)['relative_time']
        return{
            'from':{'title':this.props.app_state.loc['2420']/* 'From: ' */,'details':this.format_address(from, e5), 'size':'l'},
            'to':{'title':this.props.app_state.loc['2419']/* 'To: ' */,'details':this.format_address(to, e5), 'size':'l'},
            
            'gas_used':{'style': 'l', 'title':this.props.app_state.loc['2477']/* 'Gas Used' */, 'subtitle': this.format_power_figure(gas_used), 'barwidth': this.calculate_bar_width(gas_used), 'number': this.format_account_balance_figure(gas_used), 'barcolor': '', 'relativepower': 'gas', 'n':gas_used},
            
            'gas_price':{'style': 'l', 'title':this.props.app_state.loc['2478']/* 'Gas Price Paid in Wei' */, 'subtitle': this.format_power_figure(gas_price), 'barwidth': this.calculate_bar_width(gas_price), 'number': this.format_account_balance_figure(gas_price), 'barcolor': '', 'relativepower': this.props.app_state.loc['2738cx']/* wei */, 'n':gas_price},
            
            'gas_price_gwei':{'style': 'l', 'title':this.props.app_state.loc['2479']/* 'Gas Price Paid in Gwei' */, 'subtitle': this.format_power_figure(gas_price/10**9), 'barwidth': this.calculate_bar_width(gas_price/10**9), 'number': gas_price/10**9, 'barcolor': '', 'relativepower': 'gwei',},
            
            'value':{'style': 'l', 'title':this.props.app_state.loc['2480']/* 'Value' */, 'subtitle': this.format_power_figure(value), 'barwidth': this.calculate_bar_width(value), 'number': this.format_account_balance_figure(value), 'barcolor': '', 'relativepower': this.props.app_state.loc['2738cx']/* wei */, 'n':value},

            'value_ether':{'style': 'l', 'title':this.props.app_state.loc['2480']/* 'Value' */, 'subtitle': this.format_power_figure(value/10**18), 'barwidth': this.calculate_bar_width(value/10**18), 'number': (value/10**18), 'barcolor': '', 'relativepower': this.props.app_state.loc['2738cw']/* ether */,},

            'block':{ 'details': block, 'title': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' },
            'time':{ 'details': time+', '+relative_time+' ago', 'title': 'Timestamp', 'size': 'l' },

            
        }
    }

    format_address(address, e5){
        var my_address = this.format_address_if_harmony(this.props.app_state.accounts[e5].address, e5)
        if(my_address.toString().toLowerCase() == address.toString().toLowerCase()){
            return this.props.app_state.loc['2785']/* 'You' */
        }
        return start_and_end(address)
    }


    get_blockchain_data(size, e5){
        var number_of_blocks = this.props.app_state.number_of_blocks[e5] == null ? 0 : this.props.app_state.number_of_blocks[e5]
        return{
            'style':size,
            'title':this.props.app_state.loc['2481']/* 'Number of Blocks Mined' */,
            'subtitle':this.format_power_figure(number_of_blocks),
            'barwidth':this.get_number_width(number_of_blocks),
            'number':`${number_with_commas(number_of_blocks)}`,
            'barcolor':'#606060',
            'relativepower':'blocks',
        }
    }

    get_gas_used_data_points(e5){
        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = this.props.app_state.last_blocks[e5] == null ? 0 :this.props.app_state.last_blocks[e5].length;
        var highest_gas_figure = this.get_highest_gas_figure(e5);
        for(var i = noOfDps-1; i >= 0; i--) {
            if(this.props.app_state.last_blocks[e5][i] != null){
                var gas_used = this.props.app_state.last_blocks[e5][i].gasUsed;
                // var final_val = Math.floor((gas_used/highest_gas_figure)*100)
                var final_val = gas_used;
                if(final_val > (highest_gas_figure*0.8)){
                    yVal = final_val;
                }else{
                    yVal = (highest_gas_figure*0.9999999999999)
                }
                
                if(yVal != null && yVal != 0){
                    if(i%3 == 0 && i != 0){
                        dps.push({x: xVal,y: yVal, indexLabel: ""+number_with_commas(gas_used)});//
                    }else{
                        dps.push({x: xVal,y: yVal});//
                    }
                }
            }
            
            xVal++;
        }

        return dps;
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

    get_transaction_count_data_points(e5){
        return [];
        // var xVal = 1, yVal = 0;
        // var dps = [];
        // var noOfDps = this.props.app_state.last_blocks[e5] == null ? 0 : this.props.app_state.last_blocks[e5].length;
        // for(var i = noOfDps-1; i >= 0; i--) {
        //     if(this.props.app_state.last_blocks[e5][i] != null){
        //         var transaction_count = this.props.app_state.last_blocks[e5][i].transactions.length;
        //         yVal = transaction_count;
        //         if(yVal != null){
        //             if(i%20 == 0 && i != 0){
        //                 dps.push({x: xVal,y: yVal, indexLabel: ""+transaction_count});//
        //             }else{
        //                 dps.push({x: xVal,y: yVal});//
        //             }
        //         }
                
        //     }
            
        //     xVal++;
        // }

        // return dps;
    }   

    get_highest_gas_figure(e5){
        var highest = 0
        var noOfDps = this.props.app_state.last_blocks[e5] == null ? 0 : this.props.app_state.last_blocks[e5].length;
        for(var i = 0; i < noOfDps; i++) {
            if(this.props.app_state.last_blocks[e5][i] != null){
                if(highest < this.props.app_state.last_blocks[e5][i].gasUsed){
                    highest = this.props.app_state.last_blocks[e5][i].gasUsed;
                }
            }
            
        }
        return highest
    }

    get_lowest_gas_figure(e5){
        var lowest = 3000000000
        var noOfDps = this.props.app_state.last_blocks[e5] == null ? 0 : this.props.app_state.last_blocks[e5].length;
        for(var i = 0; i < noOfDps; i++) {
            if(this.props.app_state.last_blocks[e5][i] != null){
                if(this.props.app_state.last_blocks[e5][i].gasUsed < lowest && this.props.app_state.last_blocks[e5][i].gasUsed != 0){
                    lowest = this.props.app_state.last_blocks[e5][i].gasUsed;
                }
            }
            
        }
        return lowest
    }

    get_gas_used_data_point_average(e5){
        var noOfDps = this.props.app_state.last_blocks[e5] == null ? 0 : this.props.app_state.last_blocks[e5].length-1;
        var total = 0
        for(var i = 0; i < noOfDps; i++) {
            if(this.props.app_state.last_blocks[e5][i] != null){
                total += this.props.app_state.last_blocks[e5][i].gasUsed
            }
            
        }

        if(total == 0) return 0;
        return Math.floor(total / noOfDps)
    }

    get_network_utilization_rate_average(e5){
        var noOfDps = this.props.app_state.last_blocks[e5] == null ? 0 : this.props.app_state.last_blocks[e5].length-1;
        var total = 0
        for(var i = 0; i < noOfDps; i++) {
            if(this.props.app_state.last_blocks[e5][i] != null){
                const block_gas_used = this.props.app_state.last_blocks[e5][i].gasUsed
                const block_gas_limit = this.props.app_state.last_blocks[e5][i].gasLimit
                total += ((block_gas_used * 100) / block_gas_limit)
            }
        }
        if(total == 0) return 0;
        return (total / noOfDps).toFixed(6)
    }

    get_latest_block_data(e5){
        if(this.props.app_state.last_blocks[e5] == null || this.props.app_state.last_blocks[e5].length  ==  0){
            return {}
        }
        return this.props.app_state.last_blocks[e5][0];
    }

    get_gas_limit(e5){
        try{
            return this.format_account_balance_figure(this.get_latest_block_data(e5).gasLimit)
        }catch(e){
            // console.log(e)
            return 0
        }
    }

    get_base_fee_in_wei(e5){
        try{
            return this.get_latest_block_data(e5).baseFeePerGas
        }catch(e){
            // console.log(e)
            return 0
        }
    }









    render_ether_requests_section(item){
        var he = this.props.height-47
        return(
            <div>
                <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px'}}>
                    <div style={{ 'overflow-y': 'auto', height: he, padding:'5px 0px 5px 0px'}}>
                        <div style={{padding:'5px 5px 5px 5px'}}>
                            {this.render_detail_item('3', {'title':this.props.app_state.loc['2481a']/* 'Ether Requests.' */, 'details':this.props.app_state.loc['2481b']/* 'All the Ether transfer reqests sent to your account.' */, 'size':'l'})} 
                        </div>
                        <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px'}}/>
                        <div style={{padding:'5px 10px 5px 10px'}}>
                            {this.render_ether_request_items(item)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render_ether_request_items(ether_item){
        var middle = this.props.height-200;
        var items = [].concat(this.get_requests(ether_item))

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
                <div style={{overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        <div>
                            {items.map((item, index) => (
                                <li style={{}} onClick={() => this.when_request_item_clicked(item, ether_item)}>
                                    <div>
                                        {this.render_request_item(item)}
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

    get_requests(ether_item){
        if(this.props.app_state.has_wallet_been_set == false){
            return [];
        }
        const id = ether_item['id']
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

    render_request_item(ipfs){
        const time = ipfs['time']/1000
        const sender_account = ipfs['sender_account']
        const sender_account_e5 = ipfs['sender_account_e5']
        const e5_image = this.props.app_state.e5s[sender_account_e5].e5_img
        const base_unit_amount = bigInt(ipfs['message_obj']['picked_base_unit_amount'])
        const decimal_amount = base_unit_amount / 10**18
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2481c']/* 'From $' */.replace('$', sender_account).replace('%', this.get_time_diff((Date.now()/1000) - (parseInt(time)))), 'details':''+(new Date(time*1000).toLocaleString())+' • '+decimal_amount+' '+ipfs['message_obj']['ether_id']+' • '+this.format_account_balance_figure(base_unit_amount)+' wei', 'size':'l', 'title_image': e5_image})}
            </div>
        )
    }

    when_request_item_clicked(ipfs, ether_item){
        this.props.show_dialog_bottomsheet(ipfs, 'view_coin_ether_request')
    }





    render_ether_send_receipts_section(item){
        var he = this.props.height-47
        return(
            <div>
                <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px'}}>
                    <div style={{ 'overflow-y': 'auto', height: he, padding:'5px 0px 5px 0px'}}>
                        <div style={{padding:'5px 5px 5px 5px'}}>
                            {this.render_detail_item('3', {'title':this.props.app_state.loc['2481g']/* 'Ether Sends And Receipts.' */, 'details':this.props.app_state.loc['2481h']/* 'All the Ether transfer recepits recorded in your account sent via E5.' */, 'size':'l'})} 
                        </div>
                        <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px'}}/>
                        <div style={{padding:'5px 10px 5px 10px'}}>
                            {this.render_ether_send_receipts_items(item)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render_ether_send_receipts_items(ether_item){
        var middle = this.props.height-200;
        var items = [].concat(this.get_send_receipts(ether_item))

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
                <div style={{overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        <div>
                            {items.map((item, index) => (
                                <li style={{}} onClick={() => this.when_send_receipts_item_clicked(item, ether_item)}>
                                    <div>
                                        {this.render_send_receipts_item(item, ether_item)}
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

    get_send_receipts(ether_item){
        if(this.props.app_state.has_wallet_been_set == false){
            return [];
        }
        const id = ether_item['id']
        const data = this.props.app_state.received_coin_ether_sends[id] || {}
        const requets = [];
        Object.keys(data).forEach(request_id => {
            requets.push(data[request_id])
        });
        return this.sortByAttributeDescending(requets, 'time').reverse()
    }

    render_send_receipts_item(ipfs, ether_item){
        if(ipfs['hash']['type'] == 'lifi_swap' || ipfs['hash']['type'] == 'changenow_swap'){
            return this.render_swap_item(ipfs, ether_item)
        }
        const time = ipfs['time']/1000
        const my_address = this.props.app_state.accounts[ether_item['e5']].address
        const sender_or_recipient_account = ipfs['sender_address'] == my_address ? ipfs['recipient_address'] : ipfs['sender_address'];
        const convert_to_bigint = (value) => {
            if(value.includes('x')){
                return bigInt(value.slice(2), 16)
            }else{
                return bigInt(value)
            }
        }
        const base_unit_amount = ipfs['hash']['type'] == 'ether' ? convert_to_bigint(ipfs['hash']['tx'].value) : bigInt(ipfs['hash']['amount'])
        const decimal_amount = base_unit_amount / 10**18
        const sender_or_receiver = ipfs['recipient_address'] == my_address ? this.props.app_state.loc['2481c']/* 'From $, % ago.' */ : this.props.app_state.loc['2481e']/* 'To $, % ago.' */

        return(
            <div>
                {this.render_detail_item('3', {'title':sender_or_receiver.replace('$', start_and_end2(sender_or_recipient_account)).replace('%', this.get_time_diff((Date.now()/1000) - (parseInt(time)))), 'details':''+(new Date(time*1000).toLocaleString())+' • '+decimal_amount+' '+ipfs['ether_id']+' • '+this.format_account_balance_figure(base_unit_amount)+' wei', 'size':'l'})}
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
            var power = amount.toLocaleString('fullwide', {useGrouping:false}).length - 9
            return number_with_commas(amount.toLocaleString('fullwide', {useGrouping:false}).substring(0, 9)) +'e'+power
        }
        
    }


}




export default EthersDetailsSection;