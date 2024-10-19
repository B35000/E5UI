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
                    <img src={this.props.app_state.static_assets['letter']} style={{height:70 ,width:'auto'}} />
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

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['377']/* 'End Balance' */, 'number':this.props.app_state.end_balance_of_E5[e5], 'relativepower':'END'})}>
                        {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['377']/* 'End Balance' */, 'subtitle':this.format_power_figure(this.props.app_state.end_balance_of_E5[e5]), 'barwidth':this.calculate_bar_width(this.props.app_state.end_balance_of_E5[e5]), 'number':this.format_account_balance_figure(this.props.app_state.end_balance_of_E5[e5]), 'relativepower':'END'})}
                    </div>

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['378']/* Spend Balance' */, 'number':this.props.app_state.spend_balance_of_E5[e5], 'relativepower':'SPEND'})}>
                        {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['378']/* Spend Balance' */, 'subtitle':this.format_power_figure(this.props.app_state.spend_balance_of_E5[e5]), 'barwidth':this.calculate_bar_width(this.props.app_state.spend_balance_of_E5[e5]), 'number':this.format_account_balance_figure(this.props.app_state.spend_balance_of_E5[e5]), 'relativepower':'SPEND'})}
                    </div>
                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2233']/* 'End Balance of Burn Account' */, 'number':this.props.app_state.end_balance_of_burn_account[e5], 'relativepower':'END'})}>
                        {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['2233']/* 'End Balance of Burn Account' */, 'subtitle':this.format_power_figure(this.props.app_state.end_balance_of_burn_account[e5]), 'barwidth':this.calculate_bar_width(this.props.app_state.end_balance_of_burn_account[e5]), 'number':this.format_account_balance_figure(this.props.app_state.end_balance_of_burn_account[e5]), 'relativepower':'END'})}
                    </div>

                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '15px 0px 0px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2234']/* 'E5 Ether balance in Ether' */, 'number':this.props.app_state.E5_balance[e5], 'relativepower':'wei'})}>
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px', 'font-family': this.props.app_state.font}} className="fw-bold">{this.props.app_state.loc['2234']}</p>
                    
                        {this.render_detail_item('2', {'style':'s','title':this.props.app_state.loc['2234']/* 'E5 Ether balance in Ether' */, 'subtitle':this.format_power_figure(this.props.app_state.E5_balance[e5]/10**18), 'barwidth':this.calculate_bar_width(this.props.app_state.E5_balance[e5]/10**18), 'number':(this.props.app_state.E5_balance[e5]/10**18), 'relativepower':'Ether'})}

                        {this.render_detail_item('2', {'style':'s','title':this.props.app_state.loc['2235']/* 'E5 Ether balance in Wei' */, 'subtitle':this.format_power_figure(this.props.app_state.E5_balance[e5]), 'barwidth':this.calculate_bar_width(this.props.app_state.E5_balance[e5]), 'number':this.format_account_balance_figure(this.props.app_state.E5_balance[e5]), 'relativepower':'wei'})}
                    </div>

                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.get_last_transaction_block(e5), 'details':this.props.app_state.loc['2236']/* 'Last Transaction Block' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'title':this.get_time_difference(this.get_last_transaction_time(e5)), 'details':this.props.app_state.loc['2237']/* 'Last Transaction age' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'title':this.get_last_entered_contracts_count(e5), 'details':this.props.app_state.loc['2238']/* 'Number of entered contracts' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'title':this.get_number_of_e5_runs(e5), 'details':this.props.app_state.loc['2239']/* 'Number of E5 runs' */, 'size':'l'})}


                    {this.render_detail_item('0')}

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
        return{
            'label':{'header':obj['id'], 'subtitle':chain, 'size':'l', 'image': image},
            'tags':{'active_tags':[obj['id'],this.props.app_state.loc['2244']/* 'E5' */, this.props.app_state.loc['2245']/* 'Main' */, this.props.app_state.loc['361']/* 'Contract' */], 'index_option':'indexed'},
            
            'address': {'title':this.props.app_state.loc['2246']/* 'E5 Address:' */, 'details':address, 'size':'l'},

            'default_vote_bounty_split_proportion': {'title':this.format_proportion(contract_config[1]), 'details':this.props.app_state.loc['2247']/* 'Vote Bounty Split Proportion' */, 'size':'l'},
            
            'default_end_minimum_contract_amount':{'style':'l','title':this.props.app_state.loc['2248']/* 'Minimum End Contract Amount' */, 'subtitle':this.format_power_figure(contract_config[3]), 'barwidth':this.calculate_bar_width(contract_config[3]), 'number':this.format_account_balance_figure(contract_config[3]), 'relativepower':this.props.app_state.loc['1885']/* 'tokens' */, 'n':contract_config[3]},

            'default_minimum_end_vote_bounty_amount':{'style':'l','title':this.props.app_state.loc['70']/* 'Minimum End Bounty Amount' */, 'subtitle':this.format_power_figure(contract_config[4]), 'barwidth':this.calculate_bar_width(contract_config[4]), 'number':this.format_account_balance_figure(contract_config[4]), 'relativepower':this.props.app_state.loc['483']/* 'tokens' */, 'n':contract_config[4]},

            'default_proposal_expiry_duration_limit': {'title':this.get_time_diff(contract_config[5]), 'details':this.props.app_state.loc['71']/* 'Proposal Expiry Duration Limit' */, 'size':'l'},

            'default_spend_minimum_contract_amount':{'style':'l','title':this.props.app_state.loc['240']/* Minimum Spend Contract Amount' */, 'subtitle':this.format_power_figure(contract_config[9]), 'barwidth':this.calculate_bar_width(contract_config[9]), 'number':this.format_account_balance_figure(contract_config[9]), 'relativepower':this.props.app_state.loc['483']/* 'tokens' */, 'n':contract_config[9]},

            'default_minimum_spend_vote_bounty_amount':{'style':'l','title':this.props.app_state.loc['421']/* 'Minimum Spend Bounty Amount' */, 'subtitle':this.format_power_figure(contract_config[10]), 'barwidth':this.calculate_bar_width(contract_config[10]), 'number':this.format_account_balance_figure(contract_config[10]), 'relativepower':this.props.app_state.loc['483']/* 'tokens' */, 'n':contract_config[10]},

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

            'invite_only_e5': {'title':this.enabled_disabled(contract_config[32]), 'details':'Invite Only E5', 'size':'l'},

            'primary_tx_account': {'title':contract_config[39], 'details':this.props.app_state.loc['2260']/* 'Primary Transaction Account' */, 'size':'l'},

            'primary_account_tx_period': {'title':this.get_time_diff(contract_config[40]), 'details':this.props.app_state.loc['2261']/* 'Primary Account Transaction Period' */, 'size':'l'},
        }
    }

    
    
    
    
    
    load_E5_charts(obj){
        var e5_chart_data = this.props.app_state.all_data[obj['id']]
        if(e5_chart_data != null){
           return(
               <div>
                    {/* {this.show_subscription_transaction_count_chart(e5_chart_data)} */}
                    {/* {this.show_contract_transaction_count_chart(e5_chart_data)} */}
                    {/* {this.show_proposal_transaction_count_chart(e5_chart_data)} */}
                    {/* {this.show_exchange_transaction_count_chart(e5_chart_data)} */}
                    {/* {this.show_post_transaction_count_chart(e5_chart_data)} */}
                    {/* {this.show_channel_transaction_count_chart(e5_chart_data)} */}
                    {/* {this.show_job_transaction_count_chart(e5_chart_data)} */}
                    {/* {this.show_stores_transaction_count_chart(e5_chart_data)} */}
                    {/* {this.show_bag_transaction_count_chart(e5_chart_data)} */}
                    {/* {this.show_contractor_transaction_count_chart(e5_chart_data)} */}
                    {this.show_data_transaction_count_chart(e5_chart_data)}
                    {/* {this.show_metadata_transaction_count_chart(e5_chart_data)} */}
                    {/* {this.show_withdraw_amount_data_chart(e5_chart_data)} */}
                    {/* {this.show_deposit_amount_data_chart(e5_chart_data)} */}
                    {this.show_transfer_events_chart(e5_chart_data)}
                    {this.show_transaction_transaction_count_chart(e5_chart_data)}
                    {this.show_deflation_events_chart(obj['id'])}
               </div>
           ) 
        }
    }


    show_subscription_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['subscription']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2262']/* Subscriptions Created' */, 'details':this.props.app_state.loc['2263']/* `Chart containing the total number of subscriptions made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_transaction_count_data_points(events), 'interval':this.get_transaction_count_interval_figure(events)})}
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




    show_contract_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['contract']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2272']/* 'Contracts Created' */, 'details':this.props.app_state.loc['2273']/* `Chart containing the total number of contracts made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_transaction_count_data_points(events), 'interval':this.get_transaction_count_interval_figure(events)})}
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

    show_proposal_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['proposal']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2278']/* 'Proposals Created' */, 'details':this.props.app_state.loc['2279']/* `Chart containing the total number of proposals made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_transaction_count_data_points(events), 'interval':this.get_transaction_count_interval_figure(events)})}
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

    show_exchange_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['exchange']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2283']/* 'Exchanges Created' */, 'details':this.props.app_state.loc['2284']/* `Chart containing the total number of exchanges made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_transaction_count_data_points(events), 'interval':this.get_transaction_count_interval_figure(events)})}
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




    show_post_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['post']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2288']/* 'Indexed Posts Created' */, 'details':this.props.app_state.loc['2289']/* `Chart containing the total number of indexed posts made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_post_transaction_count_data_points(events), 'interval':this.get_post_transaction_count_interval_figure(events)})}
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





    show_channel_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['channel']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2293']/* 'Indexed Channels Created' */, 'details':this.props.app_state.loc['2294']/* `Chart containing the total number of indexed channels made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_post_transaction_count_data_points(events), 'interval':this.get_post_transaction_count_interval_figure(events)})}
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
    
    show_job_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['job']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2298']/* 'Indexed Jobs Created' */, 'details':this.props.app_state.loc['2299']/* `Chart containing the total number of indexed jobs made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_post_transaction_count_data_points(events), 'interval':this.get_post_transaction_count_interval_figure(events)})}
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

    show_stores_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['store']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2303']/* 'Indexed Storefront Items Created' */, 'details':this.props.app_state.loc['2304']/* `Chart containing the total number of indexed storefront items made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_post_transaction_count_data_points(events), 'interval':this.get_post_transaction_count_interval_figure(events)})}
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

    show_bag_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['bag']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2308']/* 'Bags Created' */, 'details':this.props.app_state.loc['2309']/* `Chart containing the total number of bags made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_transaction_count_data_points(events), 'interval':this.get_transaction_count_interval_figure(events)})}
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

    show_contractor_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['contractor']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2313']/* 'Indexed Contractors Created' */, 'details':this.props.app_state.loc['2314']/* `Chart containing the total number of indexed contractors made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_post_transaction_count_data_points(events), 'interval':this.get_post_transaction_count_interval_figure(events)})}
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

    show_data_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['data']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2317']/* 'Data Throughput' */, 'details':this.props.app_state.loc['2318']/* `Chart containing the data throughput over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_post_transaction_count_data_points(events), 'interval':this.get_post_transaction_count_interval_figure(events)})}
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




    show_metadata_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['metadata']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2321']/* 'Metadata Throughput' */, 'details':this.props.app_state.loc['2322']/* `Chart containing the total number of metadata events made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_metadata_transaction_count_data_points(events), 'interval':this.get_metadata_transaction_count_interval_figure(events)})}
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








    show_deposit_amount_data_chart(e5_chart_data){
        var events = e5_chart_data['transaction']
        if(events.length > 3){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2329']/* 'Deposited Ether' */, 'details':this.props.app_state.loc['2330']/* `The total amount of ether thats been deposited into the E5 over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_deposit_amount_data_points(events), 'interval':110, 'hide_label': true})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2331']/* 'Y-Axis: Total Deposited Ether' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_deposit_amount_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i == 0){
                    data.push(bigInt(events[i].returnValues.p6))
                }else{
                    data.push(bigInt(data[data.length-1]).add(bigInt(events[i].returnValues.p6)))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p8
                    for(var t=0; t<diff; t+=(61*265100)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p8 - events[i].returnValues.p8
                    for(var t=0; t<diff; t+=(61*265100)){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }


        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        var largest_number = this.get_deposit_amount_interval_figure(events)
        var recorded = false;
        for(var i = 0; i < noOfDps; i++) {
            if(largest_number == 0) yVal = 0
            else yVal = parseInt(bigInt(data[factor * xVal]).multiply(100).divide(largest_number))
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

    get_deposit_amount_interval_figure(events){
        var data = []
        events.forEach(event => {
            data.push(bigInt(event.returnValues.p6))
        });
        var largest = Math.max.apply(Math, data);
        return largest
    }


    




    show_transaction_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['transaction']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2332']/* 'Transaction Runs' */, 'details':this.props.app_state.loc['2333']/* `Chart containing the total number of E5 runs made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_transaction_transaction_count_data_points(events), 'interval':this.get_transaction_transaction_count_interval_figure(events)})}
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




    show_transfer_events_chart(e5_chart_data){
        var events = e5_chart_data['transfer']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2336a']/* 'Transfers' */, 'details':this.props.app_state.loc['2336b']/* `Chart containing the total number of transfers made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_transfers_data_points(events), 'interval':this.get_transfers_interval_figure(events)})}
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
        if(data == null || data.length < 10) return;
        return(
            <div>
                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2336f']/* 'Deflation.' */, 'details':this.props.app_state.loc['2336g']/* `The amount of end that has been sent to the burn account over time.` */, 'size':'l'})}
                
                {this.render_detail_item('6', {'dataPoints':this.get_deflation_amount_data_points(data), 'interval':110, 'hide_label': true})}
                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2214c']/* 'Y-Axis: Total in ' */+'END', 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                {this.render_detail_item('0')}
            </div>
        )
    }


    get_deflation_amount_data_points(events){
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
            console.log(e)
        }

        

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
            return 'enabled'
        }
        return 'disabled'
    }

}




export default E5DetailsSection;