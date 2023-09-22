import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';

import Letter from './../assets/letter.png';
import EndImg from './../assets/end_token_icon.png';
import SpendImg from './../assets/spend_token_icon.png';
import E35EndImg from './../assets/e35_end_token.png';
import E35SpendImg from './../assets/e35_spend_token.png';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class EndDetailSection extends Component {
    
    state = {
        selected: 0, navigate_view_end_list_detail_tags_object: this.get_navigate_view_end_list_detail_tags(),
    };


    get_navigate_view_end_list_detail_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['or','',0], ['e','details','transactions'],[0]
          ],
        }
    }

    render(){
        return(
        <div>{this.render_ends_list_detail()}</div>
        )
    }


    render_ends_list_detail(){
        if(this.props.selected_end_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    {this.render_end_details_section()}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 0px 0px', 'max-width':'470px'}}>
                        <Tags page_tags_object={this.state.navigate_view_end_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_end_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
    }

    render_empty_detail_object(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        return(
            <div style={{height:he, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center','margin':'0px 0px 20px 0px'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={Letter} style={{height:70 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                    
                </div>
        );
    }

    when_navigate_view_end_list_detail_tags_object_updated(tag_group){
        this.setState({navigate_view_end_list_detail_tags_object: tag_group})
    }

    render_end_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_end_list_detail_tags_object, this.state.navigate_view_end_list_detail_tags_object['i'].active)

        if(selected_item == 'details' || selected_item == 'e'){
            return(
                <div>
                    {this.render_end_main_details_section()}
                </div>
            )
        }else if(selected_item == 'transactions'){
            return(
                <div>
                    {this.render_end_block_history_logs()}
                </div>
            )
            
        }
    }

    get_exchange_tokens(exchange_type){
        return this.props.get_exchange_tokens(exchange_type)
    }

    render_end_main_details_section(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-60
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        var item = this.get_end_data();
        var selected_item = this.props.selected_end_item
        var selected_object = this.get_exchange_tokens(3)[selected_item]
        var symbol = selected_object['ipfs'] == null ? 'tokens' : selected_object['ipfs'].entered_symbol_text
        var author = selected_object['event'] != null ? selected_object['event'].returnValues.p3 :'Unknown'
        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 5px 10px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    
                    {this.render_detail_item('7', item['banner-icon'])}
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'title':''+author, 'details':'Author', 'size':'l'})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['token_id'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'details':'Access Rights', 'title':this.get_access_rights_status(selected_object['access_rights_enabled'])})}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', item['token_type'])}
                    <div style={{height:10}}/>
                    
                    {this.render_detail_item('3', item['unlocked_supply'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['unlocked_liquidity'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['fully_custom'])}
                    <div style={{height:10}}/>

                    {this.render_detail_item('0')}

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['buy_limit'])}
                    </div>
                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['sell_limit'])}
                    </div>
                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['exchanges_liquidity'])}
                    </div>
                    <div style={{height:10}}/>

                    

                    {this.render_detail_item('0')}
                    
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['minimum_transactions_between_swap'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['minimum_blocks_between_swap'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['minimum_time_between_swap'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['minimum_entered_contracts_between_swap'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['minimum_transactions_for_first_buy'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['minimum_entered_contracts_for_first_buy'])}
                    <div style={{height:10}}/>

                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', item['trust_fee_proportion'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['exchange_authority'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['trust_fee_target'])}
                    <div style={{height:10}}/>

                    {this.render_detail_item('0')}

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['ratio_x'])}
                    </div>
                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['ratio_y'])}
                    </div>
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', item['combined_exchange_ratio'])}

                    {this.render_detail_item('0')}
                    {this.render_price_of_token()}


                    {this.render_detail_item('0')}

                    {this.render_last_swap_block()}
                    {this.render_last_swap_timestamp()}
                    {this.render_last_swap_transaction_count()}
                    {this.render_last_entered_contracts_count()}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'details':'Buy or Sell the token for a specified account', 'title':'Buy/Sell'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_mint_burn_token_ui()}>
                        {this.render_detail_item('5', item['mint_burn_button'])}
                    </div>
                    {this.render_detail_item('0')}
                    
                    {this.render_detail_item('3', {'size':'l', 'details':'Transfer some tokens to  a specified account', 'title':'Transfer'})}
                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>

                        {this.render_detail_item('2', { 'style':'l', 'title':'Your Balance', 'subtitle':this.format_power_figure(selected_object['balance']), 'barwidth':this.calculate_bar_width(selected_object['balance']), 'number':this.format_account_balance_figure(selected_object['balance']), 'barcolor':'', 'relativepower':symbol, })}
                    </div>

                    <div style={{height:10}}/>

                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_end_transfer_ui()}>
                        {this.render_detail_item('5', {'text':'Transfer', 'action':''},)}
                    </div>

                    {this.render_auth_modify_button()}

                    {this.render_exchange_transfer_button()}

                    {this.render_freeze_unfreeze_tokens_button()}

                    {this.render_moderator_button()}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    get_access_rights_status(value){
        if(value == true){
            return 'Enabled'
        }else{
            return 'Disabled'
        }
    }


    render_price_of_token(){
        var selected_item = this.props.selected_end_item
        var selected_object = this.get_exchange_tokens(3)[selected_item]

        var input_amount = 1
        var input_reserve_ratio = selected_object['data'][2][0]
        var output_reserve_ratio = selected_object['data'][2][1]
        var price = this.calculate_price(input_amount, input_reserve_ratio, output_reserve_ratio)
        var buy_tokens = selected_object['data'][3]
        var buy_amounts = selected_object['data'][4]
        var buy_depths = selected_object['data'][5]
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':'The amount you get when selling one unit of the token', 'title':'Token Price'})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                        {buy_tokens.map((item, index) => (
                            <li style={{'padding': '1px'}}>
                                {this.render_detail_item('2', {'style':'l','title':'Token ID: '+item, 'subtitle':'depth:'+buy_depths[index], 'barwidth':this.calculate_bar_width(this.calculate_price_from_sell_action(buy_amounts[index], price)), 'number':this.format_account_balance_figure(this.calculate_price_from_sell_action(buy_amounts[index], price)), 'relativepower':this.props.app_state.token_directory[item]})}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    calculate_price(input_amount, input_reserve_ratio, output_reserve_ratio){
        var selected_item = this.props.selected_end_item
        var selected_object = this.get_exchange_tokens(3)[selected_item]
        var token_type = selected_object['data'][0][3]
        if(token_type == 3){
            var price = (bigInt(input_amount).times(bigInt(output_reserve_ratio))).divide(bigInt(input_reserve_ratio).plus(input_amount))
            if(price == 0){
                price = (input_amount * output_reserve_ratio) / (input_reserve_ratio + input_amount)
            }
            return price
        }else{
            var price = (bigInt(input_amount).times(bigInt(output_reserve_ratio))).divide(bigInt(input_reserve_ratio))
            if(price == 0){
                price = (input_amount * output_reserve_ratio) / (input_reserve_ratio)
            }
            return price
        }
    }

    calculate_price_from_sell_action(amount, price){
        if(amount >10**18 || price >10**18){
            return bigInt(amount).times(bigInt(price))
        }else{
            return amount*price
        }
    }

    open_mint_burn_token_ui(){
        this.props.open_mint_burn_token_ui(this.get_exchange_tokens(3)[this.props.selected_end_item])
    }

    open_end_transfer_ui(){
        this.props.open_transfer_ui(this.get_exchange_tokens(3)[this.props.selected_end_item])
    }

    open_modify_token_ui(){
        this.props.open_modify_token_ui(this.get_exchange_tokens(3)[this.props.selected_end_item])
    }

    open_exchange_transfers_ui(){
        this.props.open_exchange_transfers_ui(this.get_exchange_tokens(3)[this.props.selected_end_item])
    }

    open_freeze_unfreeze_ui(){
        this.props.open_freeze_unfreeze_ui(this.get_exchange_tokens(3)[this.props.selected_end_item])
    }

    open_moderator_ui(){
        this.props.open_moderator_ui(this.get_exchange_tokens(3)[this.props.selected_end_item])
    }


    render_last_swap_block(){
        var selected_item = this.props.selected_end_item
        var selected_object = this.get_exchange_tokens(3)[selected_item]

        if(selected_object['account_data'][0] != 0){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':'Last Swap Block', 'title':selected_object['account_data'][0]})}
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    render_last_swap_timestamp(){
        var selected_item = this.props.selected_end_item
        var selected_object = this.get_exchange_tokens(3)[selected_item]

        if(selected_object['account_data'][1] != 0){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':'Last Swap Timestamp', 'title': this.get_time_difference(selected_object['account_data'][1]) })}
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    render_last_swap_transaction_count(){
        var selected_item = this.props.selected_end_item
        var selected_object = this.get_exchange_tokens(3)[selected_item]

        if(selected_object['account_data'][2] != 0){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':'Last Swap Transactions Count', 'title':selected_object['account_data'][2]})}
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    render_last_entered_contracts_count(){
        var selected_item = this.props.selected_end_item
        var selected_object = this.get_exchange_tokens(3)[selected_item]

        if(selected_object['account_data'][3] !=0){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':'Last Entered Contracts Count', 'title':selected_object['account_data'][3]})}
                    <div style={{height:10}}/>
                </div>
            )
        }
    }




    render_auth_modify_button(){
        var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        var contract_config = object['data'][1]
        var my_account = this.props.app_state.user_account_id
        if(object['id'] != 3 && contract_config[9/* exchange_authority */] == my_account){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':'Modify Token', 'details':'Modify the configuration of the exchange directly.', 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_modify_token_ui()}>
                        {this.render_detail_item('5', {'text':'Modify Exchange', 'action':''})}
                    </div>
                </div>
            )
        }
    }

    render_exchange_transfer_button(){
        var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        var contract_config = object['data'][1]
        var my_account = this.props.app_state.user_account_id
        if(object['id'] != 3 && contract_config[9/* exchange_authority */] == my_account){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':'Exchange Transfer', 'details':'Transfer tokens from the exchanges account to a specified target.', 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_buy_token_uis()}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_exchange_transfers_ui()}>
                        {this.render_detail_item('5', {'text':'Run Transfers', 'action':''})}
                    </div>
                </div>
            )
        }
    }

    render_freeze_unfreeze_tokens_button(){
        var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        var contract_config = object['data'][1]
        var my_account = this.props.app_state.user_account_id
        if(object['id'] != 3 && contract_config[9/* exchange_authority */] == my_account){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':'Freeze/Unfreeze Tokens', 'details':'Freeze or unfreeze a given accounts balance.', 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_freeze_unfreeze_ui()}>
                        {this.render_detail_item('5', {'text':'Freeze/Unfreeze', 'action':''})}
                    </div>
                </div>
            )
        }
    }

    render_moderator_button(){
        var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        var my_account = this.props.app_state.user_account_id
        if(object['id'] != 3 && (object['moderators'].includes(my_account) || object['event'].returnValues.p3 == my_account)){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':'Perform Moderator Actions', 'details':'Set an accounts access rights, moderator privelages or block an account', 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_moderator_ui()}>
                        {this.render_detail_item('5', {'text':'Perform Action', 'action':''})}
                    </div>
                </div>
            )
        }
    }

    get_end_data(){
        var selected_item = this.props.selected_end_item
        var selected_object = this.get_exchange_tokens(3)[selected_item]
        var title = selected_object['id'];
        var img = selected_object['img']
        
        var selected_obj_root_config = selected_object['data'][0];
        var selected_obj_config = selected_object['data'][1];
        var selected_obj_ratio_config = selected_object['data'][2];

        var type = selected_obj_root_config[3] == 3 ? 'Capped' : 'Uncapped'
        var is_auth_main_contract = selected_obj_config[9] == 2 ? '2 (Main Contract)': selected_obj_config[9]
        var is_trust_fee_target_main_contract = selected_obj_config[10] == 2 ? '2 (Main Contract)': (selected_obj_config[10] == 0 ? '0 (Burn Account)': selected_obj_config[10])

        if(title == 3){
            title = 'END'
        }

        var item = selected_object;
        var active_tags = item['ipfs'] == null ? [''+title, ''+type, 'token'] : item['ipfs'].entered_indexing_tags
        var name = item['ipfs'] == null ? ''+title : item['ipfs'].entered_title_text
        var symbol = item['ipfs'] == null ? ''+type : item['ipfs'].entered_symbol_text
        var image = item['ipfs'] == null ? img : item['ipfs'].token_image


        
        return{
            'tags':{'active_tags':active_tags, 'index_option':'indexed', 'when_tapped':''},
            'banner-icon':{'header':name, 'subtitle':symbol, 'image':image},
            'token_id': {'title':'ID: '+selected_object['id'], 'details':'Token Identifier', 'size':'l'},
            'token_type': {'title':'Token Type', 'details':type, 'size':'l'},

            'unlocked_supply': {'title':'Unlocked Supply', 'details':this.enabled_disabled(selected_obj_root_config[0]), 'size':'l'},
            'unlocked_liquidity': {'title':'Unlocked Liquidity', 'details':this.enabled_disabled(selected_obj_root_config[1]), 'size':'l'},
            'fully_custom': {'title':'Fully Custom', 'details':this.enabled_disabled(selected_obj_root_config[2]), 'size':'l'},

            'buy_limit':{'style':'l','title':'Buy Limit', 'subtitle':this.format_power_figure(selected_obj_config[0]), 'barwidth':this.calculate_bar_width(selected_obj_config[0]), 'number':this.format_account_balance_figure(selected_obj_config[0]), 'relativepower':symbol},
            
            'minimum_transactions_between_swap': {'title':selected_obj_config[2], 'details':'Minimum Transactions Between Swap', 'size':'l'},
            'minimum_blocks_between_swap': {'title':selected_obj_config[3], 'details':'Minimum Blocks Between Swap', 'size':'l'},
            'minimum_time_between_swap': {'title':this.get_time_diff(selected_obj_config[4]), 'details':'Minimum Time Between Swap', 'size':'l'},
            
            'trust_fee_proportion': {'title':this.format_proportion(selected_obj_config[7]), 'details':'Trust Fee', 'size':'l'},
            'exchange_authority': {'title':'Authority: '+is_auth_main_contract, 'details':'Exchange Authority Identifier', 'size':'l'},
            'trust_fee_target': {'title':'Target: '+is_trust_fee_target_main_contract, 'details':'Trust Fee Target Identifier', 'size':'l'},

            'sell_limit':{'style':'l','title':'Sell Limit', 'subtitle':this.format_power_figure(selected_obj_config[11]), 'barwidth':this.calculate_bar_width(selected_obj_config[11]), 'number':this.format_account_balance_figure(selected_obj_config[11]), 'relativepower':symbol},

            'minimum_entered_contracts_between_swap': {'title':selected_obj_config[13], 'details':'Minimum Entered Contracts Between Swap', 'size':'l'},
            'minimum_transactions_for_first_buy': {'title':selected_obj_config[17], 'details':'Minimum Transactions For First Buy', 'size':'l'},
            'minimum_entered_contracts_for_first_buy': {'title':selected_obj_config[18], 'details':'Minimum Entered Contracts For First Buy', 'size':'l'},

            'ratio_x':{'style':'l','title':'Exchange Ratio X', 'subtitle':this.format_power_figure(selected_obj_ratio_config[0]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[0]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[0]), 'relativepower':''},
            'ratio_y':{'style':'l','title':'Exchange Ratio Y', 'subtitle':this.format_power_figure(selected_obj_ratio_config[1]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[1]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[1]), 'relativepower':''},
            'combined_exchange_ratio': {'title':this.format_exchange_ratio(selected_obj_ratio_config[0], selected_obj_ratio_config[1]), 'details':'Exchange Ratio X:Y', 'size':'l'},

            'exchanges_liquidity':{'style':'l','title':'Exchanges Liquidity', 'subtitle':this.format_power_figure(selected_obj_ratio_config[2]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[2]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[2]), 'relativepower':symbol},
            'mint_burn_button':{'text':'Buy/Sell Token', 'action':''},
            '':{},
            '':{},
            '':{},
            '':{},
            '':{},

        }
    }


    render_buy_token_uis(){
        var selected_item = this.props.selected_end_item
        var selected_object = this.get_exchange_tokens(3)[selected_item]
        var buy_tokens = selected_object['data'][3]
        var buy_amounts = selected_object['exchanges_balances']
        var buy_depths = selected_object['data'][5]
        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                    {buy_tokens.map((item, index) => (
                        <li style={{'padding': '1px'}}>
                            {this.render_detail_item('2', {'style':'l','title':'Token ID: '+item, 'subtitle':'depth:'+buy_depths[index], 'barwidth':this.calculate_bar_width(buy_amounts[index]), 'number':this.format_account_balance_figure(buy_amounts[index]), 'relativepower':this.props.app_state.token_directory[item]})}
                        </li>
                    ))}
                </ul>
            </div>
            
        )
    }







    render_end_block_history_logs(){

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
                <ViewGroups item_id={item_id} object_data={object_data}  theme={this.props.theme} width={width}/>
            </div>
        )

    }


    format_power_figure(amount){
        var power = 'e72'
        if(amount < bigInt('1e9')){
            power = 'e9'
        }
        else if(amount < bigInt('1e18')){
            power = 'e18'
        }
        else if(amount < bigInt('1e36')){
            power = 'e36'
        }
        else{
            power = 'e72'
        }
        return power
    }

    calculate_bar_width(amount){
        var figure = ''
        if(amount == null){
            amount = 0
        }
        if(amount < bigInt('1e9')){
            figure = Math.round((amount.toString().length * 100) / bigInt('1e9').toString().length)
        }
        else if(amount < bigInt('1e18')){
            figure = Math.round((amount.toString().length * 100) / bigInt('1e18').toString().length)
        }
        else if(amount < bigInt('1e36')){
            figure = Math.round((amount.toString().length * 100) / bigInt('1e36').toString().length)
        }
        else{
            figure = Math.round((amount.toString().length * 100) / bigInt('1e72').toString().length)
        }

        return figure+'%'
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

    enabled_disabled(value){
        if(value == 1){
            return 'enabled'
        }
        return 'disabled'
    }

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
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
            return num+ ' sec'
        }
        else if(diff < 60*60){//less than 1 hour
            var num = Math.floor(diff/(60));
            var s = num > 1 ? 's': '';
            return num + ' min' 
        }
        else if(diff < 60*60*24){//less than 24 hours
            var num = Math.floor(diff/(60*60));
            var s = num > 1 ? 's': '';
            return num + ' hr' + s;
        }
        else if(diff < 60*60*24*7){//less than 7 days
            var num = Math.floor(diff/(60*60*24));
            var s = num > 1 ? 's': '';
            return num + ' dy' + s;
        }
        else if(diff < 60*60*24*7*53){//less than 1 year
            var num = Math.floor(diff/(60*60*24*7));
            var s = num > 1 ? 's': '';
            return num + ' wk' + s;
        }
        else {//more than a year
            var num = Math.floor(diff/(60*60*24*7*53));
            var s = num > 1 ? 's': '';
            return number_with_commas(num) + ' yr' + s;
        }
    }


    format_exchange_ratio(ratio_x, ratio_y){
        // Calculate the ratio
        const gcd = this.calculateGCD(ratio_x, ratio_y);
        const ratio = `${this.format_account_balance_figure(ratio_x / gcd)} : ${this.format_account_balance_figure(ratio_y / gcd)}`;
        return ratio;
    }

    calculateGCD(a, b) {
        if (b === 0) {
            return a;
        }
        return this.calculateGCD(b, a % b);
    }


}




export default EndDetailSection;