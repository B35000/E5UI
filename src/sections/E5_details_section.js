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

import End35 from './../assets/end35.png';
import End25 from './../assets/E25.png';
// import Letter from './../assets/letter.png'; 

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class E5DetailsSection extends Component {
    
    state = {
        selected: 0, navigate_view_e5_list_detail_tags_object: this.get_navigate_view_e5_list_detail_tags(),
        get_selected_chart_item_tags_object:this.get_selected_chart_item_tags_object(),
        get_selected_contract_chart_item_tags_object: this.get_selected_contract_chart_item_tags_object(),
    };

    get_navigate_view_e5_list_detail_tags(){
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
                {this.render_E5s_list_detail()}
            </div>
        )
    }

    render_E5s_list_detail(){
        if(this.props.selected_e5_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_e5_details_section()}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 0px 0px', 'max-width':'470px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.navigate_view_e5_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_e5_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
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
                    <img src={this.props.app_state.theme['letter']} style={{height:70 ,width:'auto'}} />
                </div>
            </div>
        )
    }

    when_navigate_view_e5_list_detail_tags_object_updated(tag_group){
        this.setState({navigate_view_e5_list_detail_tags_object: tag_group})
    }

    get_item_in_array(object_array, id){
        var object = object_array.find(x => x['id'] === id);
        return object
    }

    render_e5_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_e5_list_detail_tags_object, this.state.navigate_view_e5_list_detail_tags_object['i'].active)
        var obj = this.get_item_in_array(this.get_e5_data(), this.props.selected_e5_item)

        if(obj == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }

        if(selected_item == this.props.app_state.loc['2232']/* 'details' */ || selected_item == 'e'){
            return(
                <div>
                    {this.render_e5_main_details_section(obj)}
                </div>
            )
        }
    }

    render_e5_main_details_section(obj){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-55
        var size = this.props.screensize

        var item = this.get_e5_details_data(obj)
        // var obj = this.get_e5_data()[this.props.selected_e5_item]
        var e5 = obj['id']
        var spent_end = bigInt('1e72').minus(bigInt('1e70')).minus(bigInt(this.props.app_state.end_balance_of_E5[e5]))
        return(
            <div style={{ 'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 5px 10px', 'padding':'0px 10px 0px 10px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    
                    {this.render_detail_item('7', item['label'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height:10}}/>
                    <div onClick={() => this.when_address_tapped(obj)}>
                        {this.render_detail_item('3', item['address'])}
                    </div>

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['e5_tx_height']['title'], 'number':item['e5_tx_height']['n'], 'relativepower':item['e5_tx_height']['relativepower']})}>
                        {this.render_detail_item('2', item['e5_tx_height'])}
                    </div>
                    
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['default_vote_bounty_split_proportion'])}
                   <div style={{height:10}}/>
                    {this.render_detail_item('3', item['default_proposal_expiry_duration_limit'])}

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['default_end_minimum_contract_amount']['title'], 'number':item['default_end_minimum_contract_amount']['n'], 'relativepower':item['default_end_minimum_contract_amount']['relativepower']})}>
                        {this.render_detail_item('2', item['default_end_minimum_contract_amount'])}
                    </div>

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['default_spend_minimum_contract_amount']['title'], 'number':item['default_spend_minimum_contract_amount']['n'], 'relativepower':item['default_spend_minimum_contract_amount']['relativepower']})}>
                        {this.render_detail_item('2', item['default_spend_minimum_contract_amount'])}
                    </div>

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['default_minimum_end_vote_bounty_amount']['title'], 'number':item['default_minimum_end_vote_bounty_amount']['n'], 'relativepower':item['default_minimum_end_vote_bounty_amount']['relativepower']})}>
                        {this.render_detail_item('2', item['default_minimum_end_vote_bounty_amount'])}
                    </div>

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['default_minimum_spend_vote_bounty_amount']['title'], 'number':item['default_minimum_spend_vote_bounty_amount']['n'], 'relativepower':item['default_minimum_spend_vote_bounty_amount']['relativepower']})}>
                        {this.render_detail_item('2', item['default_minimum_spend_vote_bounty_amount'])}
                    </div>
                    
                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['tx_gas_limit']['title'], 'number':item['tx_gas_limit']['n'], 'relativepower':item['tx_gas_limit']['relativepower']})}>
                        {this.render_detail_item('2', item['tx_gas_limit'])}
                    </div>

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['contract_block_invocation_limit'])}

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['contract_time_invocation_limit'])}

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['minimum_entered_contracts'])}

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['tag_indexing_limit'])}

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['minimum_transaction_count'])}

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['gas_anchor_price']['title'], 'number':item['gas_anchor_price']['n'], 'relativepower':item['gas_anchor_price']['relativepower']})}>
                        {this.render_detail_item('2', item['gas_anchor_price'])}
                    </div>

                    
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['tx_gas_reduction_proportion'])}

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['tx_gas_anchor_price']['title'], 'number':item['tx_gas_anchor_price']['n'], 'relativepower':item['tx_gas_anchor_price']['relativepower']})}>
                        {this.render_detail_item('2', item['tx_gas_anchor_price'])}
                    </div>


                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['tx_gas_lower_limit']['title'], 'number':item['tx_gas_lower_limit']['n'], 'relativepower':item['tx_gas_lower_limit']['relativepower']})}>
                        {this.render_detail_item('2', item['tx_gas_lower_limit'])}
                    </div>

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['absolute_proposal_expiry_duration_limit'])}
                    

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['invite_only_e5'])}

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['primary_tx_account'])}

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['primary_account_tx_period'])}

                    {this.render_detail_item('0')}

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['377']/* 'End Balance' */, 'number':this.props.app_state.end_balance_of_E5[e5], 'relativepower':this.props.app_state.loc['3078']/* END */})}>
                        {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['377']/* 'End Balance' */, 'subtitle':this.format_power_figure(this.props.app_state.end_balance_of_E5[e5]), 'barwidth':this.calculate_bar_width(this.props.app_state.end_balance_of_E5[e5]), 'number':this.format_account_balance_figure(this.props.app_state.end_balance_of_E5[e5]), 'relativepower':this.props.app_state.loc['3078']/* END */})}
                    </div>

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['378']/* Spend Balance' */, 'number':this.props.app_state.spend_balance_of_E5[e5], 'relativepower':this.props.app_state.loc['3079']/* SPEND */})}>
                        {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['378']/* Spend Balance' */, 'subtitle':this.format_power_figure(this.props.app_state.spend_balance_of_E5[e5]), 'barwidth':this.calculate_bar_width(this.props.app_state.spend_balance_of_E5[e5]), 'number':this.format_account_balance_figure(this.props.app_state.spend_balance_of_E5[e5]), 'relativepower':this.props.app_state.loc['3079']/* SPEND */})}
                    </div>
                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2233']/* 'End Balance of Burn Account' */, 'number':this.props.app_state.end_balance_of_burn_account[e5], 'relativepower':this.props.app_state.loc['3078']/* END */})}>
                        {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['2233']/* 'End Balance of Burn Account' */, 'subtitle':this.format_power_figure(this.props.app_state.end_balance_of_burn_account[e5]), 'barwidth':this.calculate_bar_width(this.props.app_state.end_balance_of_burn_account[e5]), 'number':this.format_account_balance_figure(this.props.app_state.end_balance_of_burn_account[e5]), 'relativepower':this.props.app_state.loc['3078']/* END */})}
                    </div>
                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2336k']/* 'Spent End' */, 'number':spent_end, 'relativepower':this.props.app_state.loc['3078']/* END */})}>
                        {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['2336k']/* 'Spent End' */, 'subtitle':this.format_power_figure(spent_end), 'barwidth':this.calculate_bar_width(spent_end), 'number':this.format_account_balance_figure(spent_end), 'relativepower':this.props.app_state.loc['3078']/* END */})}
                    </div>
                    <div style={{height:10}}/>

                    {this.render_end_to_spend_use_ratio(obj)}

                    {this.render_channeling_depth_data(obj)}

                    {this.render_spend_bottom_80_dominance(obj)}

                    {this.render_traffic_distribution_number(obj)}


                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '15px 0px 0px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2234']/* 'E5 Ether balance in Ether' */, 'number':this.props.app_state.E5_balance[e5], 'relativepower':'wei'})}>
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px', 'font-family': this.props.app_state.font}} className="fw-bold">{this.props.app_state.loc['2234']}</p>
                    
                        {this.render_detail_item('2', {'style':'s','title':this.props.app_state.loc['2234']/* 'E5 Ether balance in Ether' */, 'subtitle':this.format_power_figure(this.round_off_to_nearest_gwei(this.props.app_state.E5_balance[e5]/10**18)), 'barwidth':this.calculate_bar_width(this.props.app_state.E5_balance[e5]/10**18), 'number':(this.round_off_to_nearest_gwei(this.props.app_state.E5_balance[e5]/10**18)), 'relativepower':'Ether'})}

                        {this.render_detail_item('2', {'style':'s','title':this.props.app_state.loc['2235']/* 'E5 Ether balance in Wei' */, 'subtitle':this.format_power_figure(this.props.app_state.E5_balance[e5]), 'barwidth':this.calculate_bar_width(this.props.app_state.E5_balance[e5]), 'number':this.format_account_balance_figure(this.props.app_state.E5_balance[e5]), 'relativepower':'wei'})}
                    </div>

                    {this.render_detail_item('0')}

                    {this.render_last_transaction_time_data(e5)}

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2240']/* 'Withdraw balance' */, 'number':this.props.app_state.withdraw_balance[e5], 'relativepower':'wei'})}>
                        {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['2240']/* 'Withdraw balance' */, 'subtitle':this.format_power_figure(this.props.app_state.withdraw_balance[e5]), 'barwidth':this.calculate_bar_width(this.props.app_state.withdraw_balance[e5]), 'number':this.format_account_balance_figure(this.props.app_state.withdraw_balance[e5]), 'relativepower':'wei'})}
                    </div>

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2241']/* 'Withdraw your Ether to a specified address' */, 'title':this.props.app_state.loc['2242']/* 'Withdraw Ether' */})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_withdraw_ether_ui(obj)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2243']/* 'Withdraw' */, 'action':''})}
                    </div>

                    {this.render_detail_item('0')}

                    {this.load_E5_charts(obj)}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_last_transaction_time_data(e5){
        if(this.props.app_state.has_wallet_been_set || this.props.app_state.user_account_id[this.props.app_state.selected_e5] != 1){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.get_last_transaction_block(e5), 'details':this.props.app_state.loc['2236']/* 'Last Transaction Block' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'title':this.get_time_difference(this.get_last_transaction_time(e5)), 'details':this.props.app_state.loc['2237']/* 'Last Transaction age' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'title':this.get_last_entered_contracts_count(e5), 'details':this.props.app_state.loc['2238']/* 'Number of entered contracts' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'title':this.get_number_of_e5_runs(e5), 'details':this.props.app_state.loc['2239']/* 'Number of E5 runs' */, 'size':'l'})}
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    round_off_to_nearest_gwei(number){
        return (Math.round(number * 10**9) / 10**9)
    }

    when_address_tapped(obj){
        var address = this.props.app_state.e5s[obj['id']].e5_address
        this.copy_to_clipboard(address)
    }

    copy_to_clipboard(signature_data){
        navigator.clipboard.writeText(signature_data)
        this.props.notify(this.props.app_state.loc['1564']/* 'copied address to clipboard' */, 600)
    }

    get_last_transaction_block(e5){
        if(this.props.app_state.basic_transaction_data[e5] == null){
            return 0
        }
        return this.props.app_state.basic_transaction_data[e5][0]
    }

    get_last_transaction_time(e5){
        if(this.props.app_state.basic_transaction_data[e5] == null){
            return 0
        }
        return this.props.app_state.basic_transaction_data[e5][1]
    }

    get_last_entered_contracts_count(e5){
        if(this.props.app_state.basic_transaction_data[e5] == null){
            return 0
        }
        return this.props.app_state.basic_transaction_data[e5][2]
    }

    get_number_of_e5_runs(e5){
        if(this.props.app_state.basic_transaction_data[e5] == null){
            return 0
        }
        return this.props.app_state.basic_transaction_data[e5][3]
    }


    open_withdraw_ether_ui(obj){
        // var obj = this.get_e5_data()[this.props.selected_e5_item]
        this.props.show_withdraw_ether_bottomsheet(obj)
    }

    get_e5_data(){
        return this.props.get_e5_data()
    }

    get_e5_details_data(obj){
        var image = this.props.app_state.e5s[obj['id']].e5_img
        var chain = this.props.app_state.e5s[obj['id']].token
        var address = this.props.app_state.e5s[obj['id']].e5_address
        var contract_config = obj['data'][1]
        var e5_height = this.props.app_state.e5s_transaction_height[obj['id']]
        return{
            'label':{'header':obj['id'], 'subtitle':chain, 'size':'l', 'image': image},
            'tags':{'active_tags':[obj['id'],this.props.app_state.loc['2244']/* 'E5' */, this.props.app_state.loc['2245']/* 'Main' */, this.props.app_state.loc['361']/* 'Contract' */], 'index_option':'indexed'},
            
            'address': {'title':this.props.app_state.loc['2246']/* 'E5 Address:' */, 'details':address, 'size':'l'},

            'default_vote_bounty_split_proportion': {'title':this.format_proportion(contract_config[1]), 'details':this.props.app_state.loc['2247']/* 'Vote Bounty Split Proportion' */, 'size':'l'},
            
            'default_end_minimum_contract_amount':{'style':'l','title':this.props.app_state.loc['2248']/* 'Minimum End Contract Amount' */, 'subtitle':this.format_power_figure(contract_config[3]), 'barwidth':this.calculate_bar_width(contract_config[3]), 'number':this.format_account_balance_figure(contract_config[3]), 'relativepower':this.props.app_state.loc['3078']/* 'END' */, 'n':contract_config[3]},

            'default_minimum_end_vote_bounty_amount':{'style':'l','title':this.props.app_state.loc['70']/* 'Minimum End Bounty Amount' */, 'subtitle':this.format_power_figure(contract_config[4]), 'barwidth':this.calculate_bar_width(contract_config[4]), 'number':this.format_account_balance_figure(contract_config[4]), 'relativepower':this.props.app_state.loc['3078']/* 'END' */, 'n':contract_config[4]},

            'default_proposal_expiry_duration_limit': {'title':this.get_time_diff(contract_config[5]), 'details':this.props.app_state.loc['71']/* 'Proposal Expiry Duration Limit' */, 'size':'l'},

            'default_spend_minimum_contract_amount':{'style':'l','title':this.props.app_state.loc['240']/* Minimum Spend Contract Amount' */, 'subtitle':this.format_power_figure(contract_config[9]), 'barwidth':this.calculate_bar_width(contract_config[9]), 'number':this.format_account_balance_figure(contract_config[9]), 'relativepower':this.props.app_state.loc['3079']/* 'SPEND' */, 'n':contract_config[9]},

            'default_minimum_spend_vote_bounty_amount':{'style':'l','title':this.props.app_state.loc['421']/* 'Minimum Spend Bounty Amount' */, 'subtitle':this.format_power_figure(contract_config[10]), 'barwidth':this.calculate_bar_width(contract_config[10]), 'number':this.format_account_balance_figure(contract_config[10]), 'relativepower':this.props.app_state.loc['3079']/* 'SPEND' */, 'n':contract_config[10]},

            'tx_gas_limit':{'style':'l','title':this.props.app_state.loc['1429']/* Transaction Gas Limit' */, 'subtitle':this.format_power_figure(contract_config[11]), 'barwidth':this.calculate_bar_width(contract_config[11]), 'number':this.format_account_balance_figure(contract_config[11]), 'relativepower':'gas', 'n':contract_config[11]},

            'contract_block_invocation_limit': {'title':contract_config[12], 'details':this.props.app_state.loc['2249']/* 'E5 block invocation Limit' */, 'size':'l'},

            'contract_time_invocation_limit': {'title':contract_config[13], 'details':this.props.app_state.loc['2250']/* 'E5 time invocation Limit' */, 'size':'l'},

            'minimum_entered_contracts': {'title':contract_config[14], 'details':this.props.app_state.loc['2251']/* 'Minimum Entered Contracts for Consensus Participation' */, 'size':'l'},

            'tag_indexing_limit': {'title':contract_config[16], 'details':this.props.app_state.loc['2253']/* 'Tag Indexing Limit' */, 'size':'l'},
            'minimum_transaction_count': {'title':contract_config[19], 'details':this.props.app_state.loc['2254']/* 'Minimum Transaction Count for Consensus Particiation' */, 'size':'l'},

            'gas_anchor_price':{'style':'l','title':this.props.app_state.loc['2255']/* 'Gas Anchor Price' */, 'subtitle':this.format_power_figure(contract_config[23]), 'barwidth':this.calculate_bar_width(contract_config[23]), 'number':this.format_account_balance_figure(contract_config[23]), 'relativepower':'wei', 'n':contract_config[23]},

            'tx_gas_reduction_proportion': {'title':this.format_proportion(contract_config[24]), 'details':this.props.app_state.loc['2256']/* 'Transaction Gas Reduction Proportion' */, 'size':'l'},

            'tx_gas_anchor_price':{'style':'l','title':this.props.app_state.loc['2257']/* 'Transaction Gas Anchor Price' */, 'subtitle':this.format_power_figure(contract_config[25]), 'barwidth':this.calculate_bar_width(contract_config[25]), 'number':this.format_account_balance_figure(contract_config[25]), 'relativepower':'wei', 'n':contract_config[25]},

            'tx_gas_lower_limit':{'style':'l','title':this.props.app_state.loc['2258']/* 'Transaction Gas Lower Limit' */, 'subtitle':this.format_power_figure(contract_config[26]), 'barwidth':this.calculate_bar_width(contract_config[26]), 'number':this.format_account_balance_figure(contract_config[26]), 'relativepower':'wei', 'n':contract_config[26]},

            'absolute_proposal_expiry_duration_limit': {'title':this.get_time_diff(contract_config[30]), 'details':this.props.app_state.loc['2259']/* 'Absolute Proposal Expiry Duration Limit' */, 'size':'l'},

            'invite_only_e5': {'title':this.enabled_disabled(contract_config[32]), 'details':this.props.app_state.loc['2336h']/* Invite Only E5  */, 'size':'l'},

            'primary_tx_account': {'title':contract_config[39], 'details':this.props.app_state.loc['2260']/* 'Primary Transaction Account' */, 'size':'l'},

            'primary_account_tx_period': {'title':this.get_time_diff(contract_config[40]), 'details':this.props.app_state.loc['2261']/* 'Primary Account Transaction Period' */, 'size':'l'},

            'e5_tx_height':{'style':'l','title':this.props.app_state.loc['2336r']/* 'E5 Transaction Height' */, 'subtitle':this.format_power_figure(e5_height), 'barwidth':this.calculate_bar_width(e5_height), 'number':this.format_account_balance_figure(e5_height), 'relativepower':'???', 'n':e5_height},
        }
    }


    render_end_to_spend_use_ratio(obj){
        var e5_chart_data = this.props.app_state.all_data[obj['id']]
        if(e5_chart_data != null){
            var end_percentage = null;
            var spend_percentage = null;

            if(this.props.app_state.saved_pre_launch_events[obj['id']] != null){
                const render_end_to_spend_use_ratio_obj = this.props.app_state.saved_pre_launch_events[obj['id']]['e5_charts_data']['render_end_to_spend_use_ratio']
                end_percentage = render_end_to_spend_use_ratio_obj['end_percentage']
                spend_percentage = render_end_to_spend_use_ratio_obj['spend_percentage']
            }else{
                var transfer_events = this.filter_transfer_events_for_end_and_spend_transactions(e5_chart_data['transfer'])
                var total = transfer_events.end_events.length + transfer_events.spend_events.length
                end_percentage = this.round_off((transfer_events.end_events.length / total) * 100)
                spend_percentage = this.round_off((transfer_events.spend_events.length / total) * 100)
            }

            var end_barwidth = end_percentage
            var spend_barwidth = spend_percentage

            if(end_barwidth > 97){
                end_barwidth = 97
            }
            else if(end_barwidth < 3){
                end_barwidth = 3
            }

            if(spend_barwidth > 97){
                spend_barwidth = 97
            }
            else if(spend_barwidth < 3){
                spend_barwidth = 3
            }

            return (
                <div>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        <div style={{'margin': '5px 20px 0px 15px'}}>
                            <div className="row">
                                <div className="col-10" style={{'padding': '0px 0px 0px 14px' }}> 
                                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'font-family': this.props.app_state.font}} className="fw-bold">END</p>
                                </div>
                                <div className="col-2" style={{'padding': '0px 15px 0px 0px' }}>
                                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'font-family': this.props.app_state.font}} className="text-end">SPEND</p>
                                </div>
                            </div>
                            
                            <div style={{ height: 3, width: "100%", 'border-radius': '5px', 'box-shadow': '0px 0px 2px 1px '+this.props.theme['bar_shadow'], 'margin': '0px 0px 4px 0px' }}>
                                <div className="progress" style={{ height: 3, width: "100%", 'background-color': this.props.theme['linebar_background_color'] }}>
                                    <div className="progress-bar" role="progressbar" style={{ width: end_barwidth+'%', 'background-image': 'none','background-color': 'black', 'border-radius': '0px 3px 3px 0px' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>

                                    <div className="progress-bar" role="progressbar" style={{ width: spend_barwidth+'%', 'background-image': 'none','background-color': 'white', 'border-radius': '0px 3px 3px 0px' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-9" style={{'padding': '0px 0px 0px 14px' }}> 
                                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: '100%', 'font-family': this.props.app_state.font}} className="fw-bold">{end_percentage+'%'}</p>
                                </div>
                                <div className="col-3" style={{'padding': '0px 15px 0px 0px' }}>
                                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: '100%', 'padding-top':' 1px', 'font-family': this.props.app_state.font}} className="text-end">{spend_percentage+'%'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{height:10}}/>
                </div>
            );
        }
    }

    round_off(number){
        return (Math.round(number * 100) / 100)
    }

    filter_transfer_events_for_end_and_spend_transactions(events){
        var end_events = []
        var spend_events = []

        events.forEach(event => {
            if(event.returnValues.p1 == 3){
                end_events.push(event)
            }
            else if(event.returnValues.p1 == 5){
                spend_events.push(event)
            }
        });

        return {end_events, spend_events}
    }






    render_channeling_depth_data(obj){
        var e5_chart_data = this.props.app_state.all_data[obj['id']]

        if(e5_chart_data != null){
            var transfer_events = null;

            if(this.props.app_state.saved_pre_launch_events[obj['id']] != null){
                transfer_events = this.props.app_state.saved_pre_launch_events[obj['id']]['e5_charts_data']['filter_and_sort_channeling_events']
            }else{
                transfer_events = this.filter_and_sort_channeling_events(e5_chart_data['all_indexed_events'], obj['id'])
            }

            var total = transfer_events.local_events + transfer_events.language_events + transfer_events.international_events

            var local_percentage = this.round_off((transfer_events.local_events / total) * 100)
            var language_percentage = this.round_off((transfer_events.language_events / total) * 100)
            var international_percentage = this.round_off((transfer_events.international_events / total) * 100)

            var numbers = this.normalize(local_percentage, language_percentage, international_percentage)
            var local_barwidth = numbers.a
            var language_barwidth = numbers.b
            var international_barwidth = numbers.c

            

            const color_obj_directory = {'g':'green', 'r':'red', 'b':'cyan', 'y':'yellow', 'o':'orange', 'p':'pink'}
            const color_obj_icon_directory = {'g':'🟢', 'r':'🔴', 'b':'🔵', 'y':'🟡', 'o':'🟠', 'p':'🟣'}
            const country_data = this.props.app_state.country_data
            const object_country = this.props.app_state.device_country
            const country_item_data = country_data.find(e => e.name === object_country)
            const country_color = country_item_data == null ? 'grey' : color_obj_directory[country_item_data.color[0]]
            const country_color_circle = country_item_data == null ? '⚪' : color_obj_icon_directory[country_item_data.color[0]]
            return (
                <div>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        <div style={{'margin': '5px 20px 0px 15px'}}>
                            <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'font-family': this.props.app_state.font}} className="fw-bold">{this.props.app_state.loc['2336l']/* 'Content Channeling Distribution.' */}</p>
                            
                            <div style={{ height: 3, width: "100%", 'border-radius': '5px', 'box-shadow': '0px 0px 2px 1px '+this.props.theme['bar_shadow'], 'margin': '0px 0px 4px 0px' }}>
                                <div className="progress" style={{ height: 3, width: "100%", 'background-color': this.props.theme['linebar_background_color'] }}>
                                    <div className="progress-bar" role="progressbar" style={{ width: international_barwidth+'%', 'background-image': 'none','background-color': 'black', 'border-radius': '0px 3px 3px 0px' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>

                                    <div className="progress-bar" role="progressbar" style={{ width: language_barwidth+'%', 'background-image': 'none','background-color': 'white', 'border-radius': '0px 3px 3px 0px' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>

                                    <div className="progress-bar" role="progressbar" style={{ width: local_barwidth+'%', 'background-image': 'none','background-color': country_color, 'border-radius': '0px 3px 3px 0px' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>

                            <div style={{height:7}}/>

                            <div className="row">
                                <div className="col-9" style={{'padding': '0px 0px 0px 14px' }}> 
                                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: '100%', 'font-family': this.props.app_state.font}} className="fw-bold">{this.props.app_state.loc['2336m']/* 'Local Channeling Content' */}</p>
                                </div>
                                <div className="col-3" style={{'padding': '0px 15px 0px 0px' }}>
                                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: '100%', 'padding-top':' 1px', 'font-family': this.props.app_state.font}} className="text-end">{local_percentage+'%'}</p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-9" style={{'padding': '0px 0px 0px 14px' }}> 
                                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: '100%', 'font-family': this.props.app_state.font}} className="fw-bold">{this.props.app_state.loc['2336n']/* 'Language Channeling Content.' */}</p>
                                </div>
                                <div className="col-3" style={{'padding': '0px 15px 0px 0px' }}>
                                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: '100%', 'padding-top':' 1px', 'font-family': this.props.app_state.font}} className="text-end">{language_percentage+'%'}</p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-9" style={{'padding': '0px 0px 0px 14px' }}> 
                                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: '100%', 'font-family': this.props.app_state.font}} className="fw-bold">{this.props.app_state.loc['2336o']/* 'International Channeling Content.' */}</p>
                                </div>
                                <div className="col-3" style={{'padding': '0px 15px 0px 0px' }}>
                                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: '100%', 'padding-top':' 1px', 'font-family': this.props.app_state.font}} className="text-end">{international_percentage+'%'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{height:10}}/>
                </div>
            );
        }
    }

    normalize(a, b, c) {
        let vars = { a, b, c };
        const keys = Object.keys(vars);

        // Step 1: Find who needs more
        const needy = keys.filter(k => vars[k] < 2.5);
        if (needy.length === 0) return vars;

        const totalNeeded = needy.reduce((sum, k) => sum + (2.5 - vars[k]), 0);

        // Step 2: Find who can give
        const givers = keys.filter(k => vars[k] > 2.5);
        const sharePerGiver = totalNeeded / givers.length;

        givers.forEach(k => {
            vars[k] -= sharePerGiver;
        });

        needy.forEach(k => {
            vars[k] = 2.5;
        });

        return vars;
    }

    filter_and_sort_channeling_events(events, e5){
        const local_events = []
        const language_events = []
        const international_events = []

        const language_hash = this.props.hash_data_with_specific_e5('language', e5)
        const international_hash = this.props.hash_data_with_specific_e5('international', e5)
        const international_hash2 = this.props.hash_data_with_specific_e5('en', e5)

        events.forEach(event => {
            var index_string = event.returnValues.p1/* tag */
            if(index_string == international_hash || index_string == international_hash2){
                international_events.push(event)
            }
            else if(index_string == language_hash){
                language_events.push(event)
            }
            else{
                local_events.push(event)
            }
        });

        return { local_events: local_events.length, language_events: language_events.length, international_events: international_events.length }
    }





    render_spend_bottom_80_dominance(obj){
        const e5_chart_data = this.props.app_state.all_data[obj['id']]
        if(e5_chart_data != null){
            var proportion = null;
            if(this.props.app_state.saved_pre_launch_events[obj['id']] != null){
                proportion = this.props.app_state.saved_pre_launch_events[obj['id']]['e5_charts_data']['filter_transfer_events_for_end_and_spend_transactions2']
            }else{
                proportion = this.filter_transfer_events_for_end_and_spend_transactions2(e5_chart_data['transfer'])
            }
            if(proportion == 0) return;

            return (
                <div>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2336p']/* 'Bottom 80% Income Earners Dominance.' */, 'subtitle':this.format_power_figure(proportion), 'barwidth':Math.floor(proportion)+'%', 'number':proportion+'%', 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1881']/* 'proportion' */,})}
                    </div>
                    <div style={{height:10}}/>
                </div>
            );
        }
    }

    filter_transfer_events_for_end_and_spend_transactions2(events){
        var spend_events = []
        const time_limit = (Date.now()/1000) - (60*60*24*7*53)
        const income_stream_data = {}
        const income_stream_records = {}
        var total_volume = bigInt(0)
        events.forEach(event => {
            if(event.returnValues.p1 == 5 && event.returnValues.p5/* timestamp */ > time_limit){
                if(income_stream_records[event.returnValues.p2/* sender */] == null){
                    income_stream_records[event.returnValues.p2/* sender */] = {}
                }
                if(income_stream_records[event.returnValues.p2/* sender */][event.returnValues.p3/* receiver */] == null){
                    income_stream_records[event.returnValues.p2/* sender */][event.returnValues.p3/* receiver */] = []
                }
                const receivers_time_array = income_stream_records[event.returnValues.p2/* sender */][event.returnValues.p3/* receiver */]
                if(receivers_time_array.length == 0 || event.returnValues.p5/* timestamp */ - receivers_time_array[receivers_time_array.length-1] > (60*60*2.3)){
                    spend_events.push(event)
                    if(income_stream_data[event.returnValues.p3/* receiver */] == null){
                        income_stream_data[event.returnValues.p3/* receiver */] = bigInt(0) 
                    }
                    income_stream_data[event.returnValues.p3/* receiver */] = bigInt(income_stream_data[event.returnValues.p3/* receiver */]).plus(event.returnValues.p4/* amount */)
                    total_volume = bigInt(total_volume).plus(event.returnValues.p4/* amount */)

                    income_stream_records[event.returnValues.p2/* sender */][event.returnValues.p3/* receiver */].push(event.returnValues.p5/* timestamp */)
                } 
            }
        });

        if(spend_events.length == 0){
            return 0
        }

        const filtered_income_stream_data = this.getBottomPercentAccounts(income_stream_data)
        const bottom_volume = Object.values(filtered_income_stream_data).reduce((total, value) => bigInt(total).plus(bigInt(value)), bigInt(0));
        
        const proportion = bigInt(bottom_volume).multiply(bigInt(100)).divide(bigInt(total_volume))
        const decimals = bigInt(bottom_volume).multiply(bigInt(100)).mod(bigInt(total_volume))

        const percentage_string = proportion.toString().toLocaleString('fullwide', {useGrouping:false})+'.'+decimals.toString().toLocaleString('fullwide', {useGrouping:false})

        return parseFloat(percentage_string).toFixed(2)
    }

    getBottomPercentAccounts(obj) {
        const percent = 0.8
        const entries = Object.entries(obj);
        
        entries.sort((a, b) => a[1] - b[1]);
        const count = Math.floor(entries.length * percent);
        const bottomEntries = entries.slice(0, count);
        
        return Object.fromEntries(bottomEntries);
    }





    render_traffic_distribution_number(obj){
        var item = null;
        if(this.props.app_state.saved_pre_launch_events[obj['id']] != null){
            item = this.props.app_state.saved_pre_launch_events[obj['id']]['load_traffic_proportion_data']
        }else{
            item = this.load_traffic_proportion_data(obj)
        }
        return(
            <div>
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':obj['id']+this.props.app_state.loc['2336q']/* E5\'s Traffic Dominance */, 'subtitle':'e0', 'barwidth':(item['percentage']+'%'), 'number':item['percentage']+'%', 'relativepower':this.props.app_state.loc['1881']/* 'proportion' */, })}  
                </div>
                <div style={{height: 10}}/>
            </div>
        )
    }

    load_all_event_data(chart_id){
        var all_objects = []
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]

            var e5_chart_data = this.props.app_state.all_data[e5]
            if(e5_chart_data != null){
                var e5s_events = e5_chart_data[chart_id]
                all_objects = all_objects.concat(e5s_events)
            }
        }

        return all_objects
    }

    load_traffic_proportion_data(obj){
        var all_data = this.load_all_event_data('data').length
        var return_data = {}
        var e5 = obj['id']
        var e5_chart_data = this.props.app_state.all_data[e5]
        if(e5_chart_data != null){
            var e5s_events = e5_chart_data['data'].length
            var x = ((e5s_events * 100) / all_data)
            var rounded_proportion = Math.round(x * 1000) / 1000
            return_data = {'e5':e5, 'percentage':rounded_proportion}
        }
        else{
            return_data = {'e5':e5, 'percentage':0}
        }

        return return_data
    }
    

    
    
    
    




    get_selected_chart_item_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1196']/* 'e.jobs' */,this.props.app_state.loc['1197']/* 'e.contracts' */,this.props.app_state.loc['1198']/* 'e.contractors' */, this.props.app_state.loc['1199']/* 'e.proposals' */, this.props.app_state.loc['1200']/* 'e.subscriptions' */, this.props.app_state.loc['1213']/* 'e.posts' */,this.props.app_state.loc['1214']/* 'e.channels' */,this.props.app_state.loc['1264ao']/* 'polls' */,this.props.app_state.loc['1215']/* 'e.storefront' */, this.props.app_state.loc['1216']/* 'e.bags' */, this.props.app_state.loc['1264k']/* 'e.audioport' */, this.props.app_state.loc['1264p']/* 'videoport' */, this.props.app_state.loc['1264bj']/* 'exchanges' */], [1]
            ],
        };
    }

    get_selected_contract_chart_item_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','E5', 'E52', 'F5', 'G5', 'G52', 'H5', 'H52'], [1]
            ],
        };
    }
    
    
    load_E5_charts(obj){
        var e5_chart_data = this.props.app_state.all_data[obj['id']]
        if(e5_chart_data != null || (this.props.app_state.saved_pre_launch_events[obj['id']] != null && this.props.app_state.saved_pre_launch_events[obj['id']]['e5_charts_data'] != null)){
           return(
               <div>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.get_selected_chart_item_tags_object} tag_size={'l'} when_tags_updated={this.when_get_selected_chart_item_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    
                    {this.render_selected_chart_item(e5_chart_data, obj['id'])}

                    <Tags font={this.props.app_state.font} page_tags_object={this.state.get_selected_contract_chart_item_tags_object} tag_size={'l'} when_tags_updated={this.when_get_selected_contract_chart_item_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    {this.render_selected_contract_chart_item(obj['id'])}

                    {this.show_data_transaction_count_chart(e5_chart_data, obj['id'])}
                    {this.show_metadata_transaction_count_chart(e5_chart_data, obj['id'])}
                    {/* {this.show_withdraw_amount_data_chart(e5_chart_data, obj['id'])} */}
                    {this.show_deposit_amount_data_chart(e5_chart_data, obj['id'])}
                    {this.show_transfer_events_chart(e5_chart_data, obj['id'])}
                    {this.show_transaction_transaction_count_chart(e5_chart_data, obj['id'])}
                    {this.show_deflation_events_chart(obj['id'])}
               </div>
           )
        }
    }

    when_get_selected_contract_chart_item_tags_object_updated(tag_obj){
        this.setState({get_selected_contract_chart_item_tags_object: tag_obj})
    }

    when_get_selected_chart_item_tags_object_updated(tag_obj){
        this.setState({get_selected_chart_item_tags_object: tag_obj})
    }

    render_selected_chart_item(e5_chart_data, e5){
        var selected_item = this.get_selected_item(this.state.get_selected_chart_item_tags_object, 'e')
        
        if(selected_item == this.props.app_state.loc['1196']/* 'e.jobs' */){
            return(
                <div>
                    {this.show_job_transaction_count_chart(e5_chart_data, e5)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1197']/* 'e.contracts' */){
            return(
                <div>
                    {this.show_contract_transaction_count_chart(e5_chart_data, e5)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1198']/* 'e.contractors' */){
            return(
                <div>
                    {this.show_contractor_transaction_count_chart(e5_chart_data, e5)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1199']/* 'e.proposals' */){
            return(
                <div>
                    {this.show_proposal_transaction_count_chart(e5_chart_data, e5)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1200']/* 'e.subscriptions' */){
            return(
                <div>
                    {this.show_subscription_transaction_count_chart(e5_chart_data, e5)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1213']/* 'e.posts' */){
            return(
                <div>
                    {this.show_post_transaction_count_chart(e5_chart_data, e5)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1214']/* 'e.channels' */){
            return(
                <div>
                    {this.show_channel_transaction_count_chart(e5_chart_data, e5)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1264ao']/* 'polls' */){
            return(
                <div>
                    {this.show_poll_transaction_count_chart(e5_chart_data, e5)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1215']/* 'e.storefront' */){
            return(
                <div>
                    {this.show_stores_transaction_count_chart(e5_chart_data, e5)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1216']/* 'e.bags' */){
            return(
                <div>
                    {this.show_bag_transaction_count_chart(e5_chart_data, e5)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1264k']/* 'e.audioport' */){
            return(
                <div>
                    {this.show_audio_transaction_count_chart(e5_chart_data, e5)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1264p']/* 'videoport' */){
            return(
                <div>
                    {this.show_video_transaction_count_chart(e5_chart_data, e5)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1264bj']/* 'exchanges' */){
            return(
                <div>
                    {this.show_exchange_transaction_count_chart(e5_chart_data, e5)}
                </div>
            )
        }
    }

    render_selected_contract_chart_item(e5){
        var selected_item = this.get_selected_item(this.state.get_selected_contract_chart_item_tags_object, 'e')
        var nitro_graphs_data = this.props.app_state.saved_pre_launch_events[e5] != null ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['get_all_contracts_data_points'] : {}

        if(nitro_graphs_data[selected_item] == null) return;

        var graph_data = nitro_graphs_data[selected_item]        
        const dataPoints1 = graph_data['total']['dps']
        const start_time1 = graph_data['total']['chart_starting_time']

        const dataPoints2 = graph_data['average']['dps']
        const start_time2 = graph_data['average']['chart_starting_time']
        const amount = graph_data['event_count']

        const detailer_obj = {
            'E5':this.props.app_state.loc['2336bm']/* Primary Data Contract */, 
            'E52':this.props.app_state.loc['2336bn']/* Secondary Data Contract */, 
            'F5':this.props.app_state.loc['2336bo']/* Subscription Data Contract */, 
            'G5':this.props.app_state.loc['2336bp']/* Primary Contract & Proposal Contract */, 
            'G52':this.props.app_state.loc['2336bq']/* Secondary Contract & Proposal Contract */, 
            'H5':this.props.app_state.loc['2336br']/* Primary Exchange Contract */, 
            'H52':this.props.app_state.loc['2336bs']/* Secondary Exchange Contract */
        }
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2336bh']/* Logged Events.' */.replace('$', detailer_obj[selected_item]), 'details':this.props.app_state.loc['2336bi']/* `Chart containing the total number of logged events in the selected contract $ over time.` */.replace('$', selected_item), 'size':'l'})}
                
                {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                <div style={{height: 10}}/>

                {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['2336bj']/* 'Y-Axis: Total Logged Events.' */, 'details':this.props.app_state.loc['2269']/* 'X-Axis: Time' */, 'size':'s'})}
                <div style={{height: 10}}/>

                <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2336bk']/* 'Total Logged Events.' */, 'number':amount, 'relativepower':this.props.app_state.loc['2336bl']/* 'events' */})}>
                    {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2336bk']/* 'Total Logged Events.' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2336bl']/* 'events' */, })}
                </div>
                {this.render_detail_item('0')}
            </div>
        )
    }


    show_subscription_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['subscription']
        var amount = events.length
        var nitro_graphs_data = this.props.app_state.saved_pre_launch_events[e5] != null ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_subscription_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p4')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2262']/* Subscriptions Created' */, 'details':this.props.app_state.loc['2263']/* `Chart containing the total number of subscriptions made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2269e']/* 'Y-Axis: Total Subscriptions Made' */, 'details':this.props.app_state.loc['2269']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2270']/* 'Total Subscriptions' */, 'number':amount, 'relativepower':this.props.app_state.loc['2271']/* 'subscriptions' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2270']/* 'Total Subscriptions' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2271']/* 'subscriptions' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_transaction_count_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i==0){
                    data.push(1)
                }
                else{
                    data.push(parseInt(data[data.length-1]) + (1))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p4
                    for(var t=0; t<diff; t+=(61*265100)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p4 - events[i].returnValues.p4
                    for(var t=0; t<diff; t+=(61*265100)){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }
        

        data = data.slice(Math.floor(data.length * this.props.app_state.graph_slice_proportion))


        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(yVal)});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_transaction_count_interval_figure(events){
        return events.length
    }




    show_contract_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['contract']
        var amount = events.length
        var nitro_graphs_data = this.props.app_state.saved_pre_launch_events[e5] != null ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_contract_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p4')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2272']/* 'Contracts Created' */, 'details':this.props.app_state.loc['2273']/* `Chart containing the total number of contracts made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2274']/* 'Y-Axis: Total Contracts Made' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2276']/* 'Total Contracts' */, 'number':amount, 'relativepower':this.props.app_state.loc['2277']/* 'contracts' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2276']/* 'Total Contracts' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2277']/* 'contracts' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_proposal_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['proposal']
        var amount = events.length
        var nitro_graphs_data = this.props.app_state.saved_pre_launch_events[e5] != null ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_proposal_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p4')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : events.length

            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2278']/* 'Proposals Created' */, 'details':this.props.app_state.loc['2279']/* `Chart containing the total number of proposals made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2280']/* 'Y-Axis: Total Proposals Made' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2281']/* 'Total Proposals' */, 'number':amount, 'relativepower':this.props.app_state.loc['2282']/* 'proposals' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2281']/* 'Total Proposals' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2282']/* 'proposals' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_exchange_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['exchange']
        var amount = events.length
        var nitro_graphs_data = this.props.app_state.saved_pre_launch_events[e5] != null ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_exchange_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p4')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length

            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2283']/* 'Exchanges Created' */, 'details':this.props.app_state.loc['2284']/* `Chart containing the total number of exchanges made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2285']/* 'Y-Axis: Total Exchanges Made' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2286']/* 'Total Exchanges' */, 'number':amount, 'relativepower':this.props.app_state.loc['2287']/* 'exchanges' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2286']/* 'Total Exchanges' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2287']/* 'exchanges' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }




    show_post_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['post']
        var amount = events.length
        var nitro_graphs_data = this.props.app_state.saved_pre_launch_events[e5] != null ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_post_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_post_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p6')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2288']/* 'Indexed Posts Created' */, 'details':this.props.app_state.loc['2289']/* `Chart containing the total number of indexed posts made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2290']/* 'Y-Axis: Total Posts Made' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2291']/* 'Total Posts' */, 'number':amount, 'relativepower':this.props.app_state.loc['2292']/* 'posts' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2291']/* 'Total Posts' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2292']/* 'posts' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_post_transaction_count_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i==0){
                    data.push(1)
                }
                else{
                    data.push(parseInt(data[data.length-1]) + (1))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p6
                    for(var t=0; t<diff; t+=(60*60*3)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p6 - events[i].returnValues.p6
                    for(var t=0; t<diff; t+=(60*60*3)){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }


        data = data.slice(Math.floor(data.length * this.props.app_state.graph_slice_proportion))
        


        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(yVal)});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_post_transaction_count_interval_figure(events){
        return events.length
    }





    show_channel_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['channel']
        var amount = events.length
        var nitro_graphs_data = this.props.app_state.saved_pre_launch_events[e5] != null ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_channel_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_post_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p6')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2293']/* 'Indexed Channels Created' */, 'details':this.props.app_state.loc['2294']/* `Chart containing the total number of indexed channels made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2295']/* 'Y-Axis: Total Channels Made' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2296']/* 'Total Channels' */, 'number':amount, 'relativepower':this.props.app_state.loc['2297']/* 'channels' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2296']/* 'Total Channels' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2297']/* 'channels' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }
    
    show_job_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['job']
        var amount = events.length
        var nitro_graphs_data = this.props.app_state.saved_pre_launch_events[e5] != null ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_job_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_post_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p6')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length

            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2298']/* 'Indexed Jobs Created' */, 'details':this.props.app_state.loc['2299']/* `Chart containing the total number of indexed jobs made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2300']/* 'Y-Axis: Total Jobs Made' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2301']/* 'Total Jobs' */, 'number':amount, 'relativepower':this.props.app_state.loc['2302']/* 'jobs' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2301']/* 'Total Jobs' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2302']/* 'jobs' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_stores_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['store']
        var amount = events.length
        var nitro_graphs_data = this.props.app_state.saved_pre_launch_events[e5] != null ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_stores_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_post_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p6')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2303']/* 'Indexed Storefront Items Created' */, 'details':this.props.app_state.loc['2304']/* `Chart containing the total number of indexed storefront items made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2305']/* 'Y-Axis: Total Storefront Items Made' */, 'details':this.props.app_state.loc['2269']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2306']/* 'Total Storefront Items' */, 'number':amount, 'relativepower':this.props.app_state.loc['445']/* 'items' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2306']/* 'Total Storefront Items' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['445']/* 'items' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_bag_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['bag']
        var amount = events.length
        var nitro_graphs_data = this.props.app_state.saved_pre_launch_events[e5] != null ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_bag_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p4')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2308']/* 'Bags Created' */, 'details':this.props.app_state.loc['2309']/* `Chart containing the total number of bags made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2310']/* 'Y-Axis: Total Bags Made' */, 'details':this.props.app_state.loc['1461']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2311']/* 'Total Bags' */, 'number':amount, 'relativepower':this.props.app_state.loc['2312']/* 'bags' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2311']/* 'Total Bags' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2312']/* 'bags' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_contractor_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['contractor']
        var amount = events.length
        var nitro_graphs_data = this.props.app_state.saved_pre_launch_events[e5] != null ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_contractor_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_post_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p6')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2313']/* 'Indexed Contractors Created' */, 'details':this.props.app_state.loc['2314']/* `Chart containing the total number of indexed contractors made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2315']/* 'Y-Axis: Total Contractor Posts' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2316']/* 'Total Contractor Posts' */, 'number':amount, 'relativepower':this.props.app_state.loc['1198']/* 'contractors' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2316']/* 'Total Contractor Posts' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['1198']/* 'contractors' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_audio_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['audio']
        var amount = events.length
        var nitro_graphs_data = this.props.app_state.saved_pre_launch_events[e5] != null ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_audio_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_post_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p6')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2336s']/* 'Indexed Audioposts Created' */, 'details':this.props.app_state.loc['2336t']/* `Chart containing the total number of indexed audioposts made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2336u']/* 'Y-Axis: Total Audio Posts' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2336v']/* 'Total Audio Posts' */, 'number':amount, 'relativepower':this.props.app_state.loc['2336w']/* 'audioposts' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2336v']/* 'Total Audio Posts' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2336w']/* 'audioposts' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_video_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['video']
        var amount = events.length
        var nitro_graphs_data = this.props.app_state.saved_pre_launch_events[e5] != null ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_video_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_post_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p6')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2336x']/* 'Indexed Videoposts Created' */, 'details':this.props.app_state.loc['2336y']/* `Chart containing the total number of indexed videoposts made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2336z']/* 'Y-Axis: Total Video Posts' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2336ba']/* 'Total Video Posts' */, 'number':amount, 'relativepower':this.props.app_state.loc['2336bb']/* 'videoposts' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2336ba']/* 'Total Video Posts' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2336bb']/* 'videoposts' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_poll_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['poll']
        var amount = events.length
        var nitro_graphs_data = this.props.app_state.saved_pre_launch_events[e5] != null ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_poll_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_post_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p6')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2336bc']/* 'Indexed Polls Created' */, 'details':this.props.app_state.loc['2336bd']/* `Chart containing the total number of indexed polls made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2336be']/* 'Y-Axis: Total Polls' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2336bf']/* 'Total Polls' */, 'number':amount, 'relativepower':this.props.app_state.loc['2336bg']/* 'polls' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2336bf']/* 'Total Polls' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2336bg']/* 'polls' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_data_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['data']
        var amount = events.length
        var nitro_graphs_data = this.props.app_state.saved_pre_launch_events[e5] != null ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_bag_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_post_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p6')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2317']/* 'Data Throughput' */, 'details':this.props.app_state.loc['2318']/* `Chart containing the data throughput over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2319']/* 'Y-Axis: Total Data Events' */, 'details':this.props.app_state.loc['1461']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2320']/* 'Total Data Events' */, 'number':amount, 'relativepower':this.props.app_state.loc['1263']/* 'events' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2320']/* 'Total Data Events' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['1263']/* 'events' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_transaction_data_points_as_average(events, time_p){
        const return_data_object = {}

        events.forEach(event_item => {
            const event_time = event_item.returnValues[time_p]
            const pos = (Math.floor(event_time/(60*60*3)))*(60*60*3)
            if(return_data_object[pos] == null){
                return_data_object[pos] = []
            }
            return_data_object[pos].push(event_item)
        });

        return this.get_steaming_stats_data_points(return_data_object)
    }

    get_steaming_stats_data_points(memory_stats_data){
        var data = []
        var timestamp_datapoints = Object.keys(memory_stats_data)
        for(var i=0; i<timestamp_datapoints.length; i++){
            const focused_item = memory_stats_data[timestamp_datapoints[i]].length
            data.push(focused_item)

            if(i==timestamp_datapoints.length-1){
                var diff = Date.now()/1000 - timestamp_datapoints[i]
                for(var t=0; t<diff; t+=60*60*3){
                    if(data[data.length-1] == 0){
                        data.push(0)
                    }else{
                        data.push(data[data.length-1]*0.999)    
                    }
                }
            }
            else{
                var diff = timestamp_datapoints[i+1] - timestamp_datapoints[i]
                for(var t=0; t<diff; t+=60*60*3){
                    if(data[data.length-1] == 0){
                        data.push(0)
                    }else{
                        data.push(data[data.length-1]*0.999)    
                    }
                }
            }
        }

        const starting_time = timestamp_datapoints.length == 0 ? (1000*60*60*24) : timestamp_datapoints[0]*1000

        var xVal = 1, yVal = 0, original_y_val = 0;
        var dps = [];
        var largest = 0;
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        for(var i = 0; i < noOfDps; i++) {
            if(i < 100 && data.length > 200 && xVal < 100 && (factor * (xVal+1)) < data.length){
                var sum = 0
                var slice = data.slice(factor * xVal, factor * (xVal+1))
                for(var j = 0; j < slice.length; j++) {
                    sum += slice[j]
                }
                var result = sum / (slice.length)
                original_y_val = result;
                // yVal =  parseInt(bigInt(result).multiply(100).divide(largest))
                yVal = result
            }
            else{
                original_y_val = data[factor * xVal]
                // yVal = parseInt(bigInt(data[factor * xVal]).multiply(100).divide(largest))
                yVal = data[factor * xVal]
            }
            if((largest) < (yVal)){
                largest = (yVal)
            }
            var indicator = Math.round(yVal) +' '+ this.props.app_state.loc['665']/* 'transactions' */
            if(yVal != null && !isNaN(yVal)){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0 && yVal != 0){
                    dps.push({x: xVal,y: yVal, indexLabel:""+indicator});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
        }

        // for(var e=0; e<dps.length; e++){
        //     dps[e].y = (dps[e].y) * (100) / (largest)
        //     if(e>97 && dps[e].y == 0){
        //         dps[e].y = dps[e-1].y
        //     }
        // }

        return { dps, starting_time }
    }




    show_metadata_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['metadata']
        var amount = events.length
        var nitro_graphs_data = this.props.app_state.saved_pre_launch_events[e5] != null ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_metadata_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_metadata_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p5')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2321']/* 'Metadata Throughput' */, 'details':this.props.app_state.loc['2322']/* `Chart containing the total number of metadata events made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2323']/* 'Y-Axis: Total Metadata Events' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2324']/* 'Total Metadata Events' */, 'number':amount, 'relativepower':this.props.app_state.loc['2325']/* 'events' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2324']/* 'Total Metadata Events' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2325']/* 'events' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_metadata_transaction_count_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i==0){
                    data.push(1)
                }
                else{
                    data.push(parseInt(data[data.length-1]) + (1))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p5
                    for(var t=0; t<diff; t+=(61*265100)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p5 - events[i].returnValues.p5
                    for(var t=0; t<diff; t+=(61*265100)){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }
        


        data = data.slice(Math.floor(data.length * this.props.app_state.graph_slice_proportion))


        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(yVal)});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_metadata_transaction_count_interval_figure(events){
        return events.length
    }






    show_withdraw_amount_data_chart(e5_chart_data){
        var events = e5_chart_data['withdraw']
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2326']/* 'Withdrawn Ether' */, 'details':this.props.app_state.loc['2327']/* `The total amount of ether thats been withdrawn from the E5 over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_withdraw_amount_data_points(events), 'interval':110, 'hide_label': true})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2328']/* 'Y-Axis: Total Withdrawn Ether' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_withdraw_amount_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i == 0){
                    data.push(bigInt(events[i].returnValues.p5))
                }else{
                    data.push(bigInt(data[data.length-1]).add(bigInt(events[i].returnValues.p5)))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p6
                    for(var t=0; t<diff; t+=(61*265100)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p6 - events[i].returnValues.p6
                    for(var t=0; t<diff; t+=(61*265100)){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }


        data = data.slice(Math.floor(data.length * this.props.app_state.graph_slice_proportion))

        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        var largest_number = this.get_withdraw_amount_interval_figure(events)
        var recorded = false
        for(var i = 0; i < noOfDps; i++) {
            yVal = parseInt(bigInt(data[factor * xVal]).multiply(100).divide(largest_number))
            // yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null && data[factor * xVal] != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0 && !recorded){
                    recorded = true
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(data[factor * xVal])});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_withdraw_amount_interval_figure(events){
        var data = []
        events.forEach(event => {
            data.push(bigInt(event.returnValues.p5))
        });
        var largest = Math.max.apply(Math, data);
        return largest
    }








    show_deposit_amount_data_chart(e5_chart_data, e5){
        var events = e5_chart_data['transaction']
        var withdraw_events = e5_chart_data['withdraw']
        var nitro_graphs_data = this.props.app_state.saved_pre_launch_events[e5] != null ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_deposit_amount_data_chart'] : {}
        var data = nitro_graphs_data['event_count'] != 0 ? [] : this.format_deposit_witdraw_ether_events(events, withdraw_events)
        if(data.length > 3 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_deposit_amount_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null
            const scale = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['scale'] : null
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2329']/* 'Deposited Ether' */, 'details':this.props.app_state.loc['2330']/* `The total amount of ether thats been deposited into the E5 over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1, 'hide_label': scale == null,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1, 'scale':scale})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2331']/* 'Y-Axis: Total Deposited Ether' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_deposit_amount_data_points(events){
        var data = []
        var largest_number = bigInt(0)
        try{
            for(var i=0; i<events.length; i++){
                if(i == 0){
                    if(events[i]['type'] == 'deposit'){
                        var amount = bigInt(events[i]['event'].returnValues.p6)
                        data.push(amount)
                        if(largest_number.lesser(amount)) largest_number = amount
                    }else{
                        data.push(0)
                    }
                }else{
                    if(events[i]['type'] == 'deposit'){
                        var amount = bigInt(data[data.length-1]).add(bigInt(events[i]['event'].returnValues.p6))
                        data.push(amount)
                        if(largest_number.lesser(amount)) largest_number = amount
                    }else{
                        var amount = bigInt(data[data.length-1]).minus(bigInt(events[i]['event'].returnValues.p5))
                        data.push(amount)
                        if(largest_number.lesser(amount)) largest_number = amount
                    }
                    
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i]['timestamp']
                    for(var t=0; t<diff; t+=(61*26510)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1]['timestamp'] - events[i]['timestamp']
                    for(var t=0; t<diff; t+=(61*26510)){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }


        data = data.slice(Math.floor(data.length * this.props.app_state.graph_slice_proportion))

        // console.log('deposit_amount_data', 'largest_number', largest_number)
        // console.log('deposit_amount_data', 'data', data)

        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        // var largest_number = this.get_deposit_amount_interval_figure(events)
        var recorded = false;
        for(var i = 0; i < noOfDps; i++) {
            if(largest_number == 0) yVal = 0
            else yVal = parseInt(bigInt(data[factor * xVal]).multiply(100).divide(largest_number))
            // yVal = data[factor * xVal]
            // yVal = data[i]

            
            if(yVal != null && data[factor * xVal] != null){
                if(i%(Math.round(noOfDps/10)) == 0 && i != 0 && !recorded){
                    recorded = true
                    var label = ""+this.format_account_balance_figure(data[factor * xVal])
                    dps.push({x: xVal,y: yVal, indexLabel: label});
                }else{
                    dps.push({x: xVal, y: yVal});
                }
                xVal++;
            }
        }

        return dps
    }

    get_deposit_amount_interval_figure(events){
        var data = []
        events.forEach(event => {
            data.push(bigInt(event.returnValues.p6))
        });
        var largest = Math.max.apply(Math, data);
        return largest
    }

    format_deposit_witdraw_ether_events(deposit_events, withdraw_events){
        var all_events = []
        deposit_events.forEach(event => {
            if(!bigInt(event.returnValues.p6/* msg_value */).equals(0)){
                all_events.push({'type':'deposit', 'event':event, 'timestamp':parseInt(event.returnValues.p8/* timestamp */)})
            }
        });

        withdraw_events.forEach(event => {
            all_events.push({'type':'withdraw', 'event':event, 'timestamp':parseInt(event.returnValues.p6/* timestamp */)})
        });

        var sorted_events = this.sortByAttributeDescending(all_events, 'timestamp')
        return sorted_events.reverse()
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


    




    show_transaction_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['transaction']
        var amount = events.length
        var nitro_graphs_data = this.props.app_state.saved_pre_launch_events[e5] != null ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_transaction_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_transaction_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p8')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2332']/* 'Transaction Runs' */, 'details':this.props.app_state.loc['2333']/* `Chart containing the total number of E5 runs made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2334']/* 'Y-Axis: Total Runs Made' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2335']/* 'Total Runs' */, 'number':amount, 'relativepower':this.props.app_state.loc['2336']/* 'runs' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2335']/* 'Total Runs' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2336']/* 'runs' */, })}
                    </div>
                    {/* {this.render_detail_item('0')} */}
                </div>
            )
        }
    }

    get_transaction_transaction_count_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i==0){
                    data.push(1)
                }
                else{
                    data.push(parseInt(data[data.length-1]) + (1))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p8
                    for(var t=0; t<diff; t+=(60*60*3)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p8 - events[i].returnValues.p8
                    for(var t=0; t<diff; t+=(60*60*3)){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }
        


        data = data.slice(Math.floor(data.length * this.props.app_state.graph_slice_proportion))


        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(yVal)});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_transaction_transaction_count_interval_figure(events){
        return events.length
    }




    show_transfer_events_chart(e5_chart_data, e5){
        var events = e5_chart_data['transfer']
        var amount = events.length
        var nitro_graphs_data = this.props.app_state.saved_pre_launch_events[e5] != null ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_transfer_events_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_transfers_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p5')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2336a']/* 'Transfers' */, 'details':this.props.app_state.loc['2336b']/* `Chart containing the total number of transfers made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2336c']/* 'Y-Axis: Total Transfers Made' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2336d']/* 'Total Transfers' */, 'number':amount, 'relativepower':this.props.app_state.loc['2336e']/* 'transfers' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2336d']/* 'Total Transfers' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2336e']/* 'transfers' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_transfers_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i==0){
                    data.push(1)
                }
                else{
                    data.push(parseInt(data[data.length-1]) + (1))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p5
                    for(var t=0; t<diff; t+=(60*60*3)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p5 - events[i].returnValues.p5
                    for(var t=0; t<diff; t+=(60*60*3)){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }
        

        data = data.slice(Math.floor(data.length * this.props.app_state.graph_slice_proportion))


        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(yVal)});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_transfers_interval_figure(events){
        return events.length
    }



    show_deflation_events_chart(e5){
        var data = this.props.app_state.e5_deflation_data[e5]
        var nitro_graphs_data = this.props.app_state.saved_pre_launch_events[e5] != null ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['get_deflation_amount_data_points'] : {}
        if((data == null || data[3] == null || data[3].length < 10) && nitro_graphs_data['average'] == null) return;
        const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_deflation_amount_data_points(data)
        const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

        const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(data, 'p5')
        const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null

        if(dataPoints1 == null || dataPoints1.length == 0 || dataPoints2 == null || dataPoints2.length == 0 || nitro_graphs_data['event_count'] < 10) return;
        
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2336f']/* 'Account Zero Credit.' */, 'details':this.props.app_state.loc['2336g']/* `The amount of end that has been sent to the burn account over time.` */, 'size':'l'})}

                {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1, 'hide_label': true})}
                <div style={{height: 10}}/>

                {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2, 'hide_label': true})}
                <div style={{height: 10}}/>

                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2214c']/* 'Y-Axis: Total in ' */+this.props.app_state.loc['3078']/* END */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                
            </div>
        )
    }

    get_deflation_amount_data_points(events){
        // console.log('deflation_dps','events', events)
        var data = []
        var max_amount = bigInt(0);
        try{
            for(var i=0; i<events.length; i++){
                if(i == 0){
                    if(events[i]['action'] == 'Received'){
                        data.push(bigInt(this.get_actual_number(events[i]['event'].returnValues.p4/* amount */, events[i]['event'].returnValues.p7/* depth */)))
                    }
                    max_amount = bigInt(data[data.length-1])
                }else{
                    if(events[i]['action'] == 'Received'){
                        data.push(bigInt(data[data.length-1]).add(bigInt(this.get_actual_number(events[i]['event'].returnValues.p4/* amount */, events[i]['event'].returnValues.p7/* depth */))))
                    }
                    if(bigInt(max_amount).lesser(data[data.length-1])){
                       max_amount = bigInt(data[data.length-1]) 
                    }
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i]['event'].returnValues.p5
                    for(var t=0; t<diff; t+=(61*2651)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1]['event'].returnValues.p5 - events[i]['event'].returnValues.p5
                    for(var t=0; t<diff; t+=(61*2651)){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){
            console.log('deflation_dps','error', e)
        }


        data = data.slice(Math.floor(data.length * this.props.app_state.graph_slice_proportion))

        // console.log('deflation_dps', 'data', data)

        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        var largest_number = max_amount
        var recorded = false;
        for(var i = 0; i < noOfDps; i++) {
            if(largest_number == 0) yVal = 0
            else yVal = parseInt(bigInt(data[factor * xVal]).multiply(100).divide(largest_number))
            
            if(yVal != null && data[factor * xVal] != null){
                if(i%(Math.round(noOfDps/4)) == 0 && i != 0 && !recorded){
                    // recorded = true
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(data[factor * xVal])});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
        }

        // console.log('deflation_dps', 'dps', dps)
        
        return dps
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
                <ViewGroups show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data}  theme={this.props.theme} width={width} transactions_text={this.props.app_state.loc['2867']/* 'transactions' */}/>
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


    enabled_disabled(value){
        if(value == 1){
            return this.props.app_state.loc['2336i']/* 'enabled' */
        }
        return this.props.app_state.loc['2336j']/* 'disabled' */
    }

}




export default E5DetailsSection;