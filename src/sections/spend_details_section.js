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

class SpendDetailSection extends Component {
    
    state = {
        selected: 0, navigate_view_spend_list_detail_tags_object: this.get_navigate_view_spend_list_detail_tags(), block_limit_chart_tags_object: this.block_limit_chart_tags_object(), total_supply_chart_tags_object: this.total_supply_chart_tags_object()
    };

    componentDidMount() {
        this.interval = setInterval(() => this.check_for_new_responses_and_messages(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    check_for_new_responses_and_messages() {
        if (this.props.selected_spend_item != null) {
            var object = this.get_item_in_array(this.get_exchange_tokens(5), this.props.selected_spend_item)
            if(object == null) return;
            this.props.get_exchange_event_data(object['id'], object['e5'])
            this.props.get_moderator_event_data(object['id'], object['e5'])
        }
    }

    get_navigate_view_spend_list_detail_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['or','',0], ['e','details','e.events', 'e.moderator-events'],[0]
          ],
          'events': [
                ['xor', 'e', 1], ['events', 'transfers', 'exchange-transfers', 'updated-balances', 'updated-proportion-ratios', 'modify-exchange','freeze-unfreeze'], [1], [1]
           ],
           'moderator-events': [
                ['xor', 'e', 1], ['moderator-events', 'modify-moderators', 'interactable-checkers', 'interactable-accounts', 'block-accounts'], [1], [1]
            ],
        }
    }

    block_limit_chart_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','1h','24h', '7d', '30d', '6mo', 'all-time'], [4]
            ],
        };
    }

    total_supply_chart_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','1h','24h', '7d', '30d', '6mo', 'all-time'], [4]
            ],
        };
    }

    render(){
        return(
        <div>{this.render_spends_list_detail()}</div>
        )
    }



    render_spends_list_detail(){
        if(this.props.selected_spend_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_spend_details_section()}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 20px 0px', 'max-width':'470px'}}>
                        <Tags page_tags_object={this.state.navigate_view_spend_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_spend_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
    }

    when_navigate_view_spend_list_detail_tags_object_updated(tag_group){
        this.setState({navigate_view_spend_list_detail_tags_object: tag_group})
    }

    get_item_in_array(object_array, id){
        var object = object_array.find(x => x['e5_id'] === id);
        return object
    }

    render_empty_detail_object(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height
        return(
            <div style={{height:this.props.height-45, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center','margin':'0px 0px 20px 0px'}}>
                <div style={{'margin':'10px 20px 0px 0px'}}>
                    <img src={Letter} style={{height:70 ,width:'auto'}} />
                    <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                </div>
            </div>
        );
    }

    render_spend_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_spend_list_detail_tags_object, this.state.navigate_view_spend_list_detail_tags_object['i'].active)
        var selected_object = this.get_item_in_array(this.get_exchange_tokens(5), this.props.selected_spend_item)
        if(selected_object == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }
        
        if(selected_item == 'details' || selected_item == 'e'){
            return(
                <div>
                    {this.render_spend_main_details_section(selected_object)}
                </div>
            )
        }
        else if(selected_item == 'transfers'){
            return(
                <div>
                    {this.render_transfer_logs(selected_object)}
                </div>
            )
        }
        else if(selected_item == 'updated-proportion-ratios'){
            return(
                <div>
                    {this.render_updated_proportion_ratio_logs(selected_object)}
                </div>
            )
        }
        else if(selected_item == 'modify-exchange'){
            return(
                <div>
                    {this.render_modify_exchange_logs(selected_object)}
                </div>
            )
        }
        else if(selected_item == 'exchange-transfers'){
            return(
                <div>
                    {this.render_exchange_transfers_logs(selected_object)}
                </div>
            )
        }
        else if(selected_item == 'updated-balances'){
            return(
                <div>
                    {this.render_update_balance_logs(selected_object)}
                </div>
            )
        }
        else if(selected_item == 'freeze-unfreeze'){
            return(
                <div>
                    {this.render_freeze_unfreeze_logs(selected_object)}
                </div>
            )
        }

        else if(selected_item == 'modify-moderators'){
            return(
                <div>
                    {this.render_modify_moderator_logs(selected_object)}
                </div>
            )
        }
        else if(selected_item == 'interactable-checkers'){
            return(
                <div>
                    {this.render_interactable_checker_logs(selected_object)}
                </div>
            )
        }
        else if(selected_item == 'interactable-accounts'){
            return(
                <div>
                    {this.render_interactable_accounts_logs(selected_object)}
                </div>
            )
        }
        else if(selected_item == 'block-accounts'){
            return(
                <div>
                    {this.render_blocked_accounts_logs(selected_object)}
                </div>
            )
        }
    }

    get_exchange_tokens(exchange_type){
        return this.props.get_exchange_tokens(exchange_type)
    }

    get_senders_name(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return 'You'
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    render_spend_main_details_section(selected_object){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-70
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        // var selected_item = this.props.selected_spend_item
        // var selected_object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        var item = this.get_spend_data(selected_object);
        var symbol = selected_object['ipfs'] == null ? this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[selected_object['id']] : selected_object['ipfs'].entered_symbol_text
        var author = selected_object['event'] != null ? this.get_senders_name(selected_object['event'].returnValues.p3, selected_object) :'Unknown'
        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 20px 10px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
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

                    {this.show_total_supply_chart(item, selected_object, symbol)}
                    
                    {this.render_detail_item('0')}
                    {this.show_transaction_count_chart(selected_object, symbol)}

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

                    {this.render_revoke_author_privelages_event(selected_object)}

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

                    <div style={{height:10}}/>
                    {this.render_detail_item('0')}
                    {this.render_price_of_token(selected_object)}
                    {this.render_detail_item('0')}

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['block_limit'])}
                    </div>
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['internal_block_halfing_proportion'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['block_limit_reduction_proportion'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['block_reset_limit'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['block_limit_sensitivity'])}
                    {/* <div style={{height:10}}/> */}
                    {/* {this.render_detail_item('3', item['default_authority_mint_limit'])} */}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['block_halfing_type'])}


                    {this.render_detail_item('0')}
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['maturity_limit'])}
                    </div>
                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['current_block_mint_total'])}
                    </div>
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['active_block_limit_reduction_proportion'])}

                    <div style={{height:10}}/>
                    {this.render_proportion_ratio_chart(selected_object)}
                    
                    {this.render_detail_item('0')}

                    {this.render_token_liquidity_balance(selected_object, symbol)}

                    {this.render_detail_item('0')}

                    {this.render_last_swap_block(selected_object)}
                    {this.render_last_swap_timestamp(selected_object)}
                    {this.render_last_swap_transaction_count(selected_object)}
                    {this.render_last_entered_contracts_count(selected_object)}

                    {this.render_detail_item('3', {'size':'l', 'details':'Mint or Dump the token for a specified account', 'title':'Mint/Dump'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_mint_burn_spend_token_ui(selected_object)}>
                        {this.render_detail_item('5', item['mint_burn_button'])}
                    </div>

                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'size':'l', 'details':'Make a token transfer to a specified account', 'title':'Send/Transfer'})}

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>

                        {this.render_detail_item('2', { 'style':'l', 'title':'Your Balance', 'subtitle':this.format_power_figure(selected_object['balance']), 'barwidth':this.calculate_bar_width(selected_object['balance']), 'number':this.format_account_balance_figure(selected_object['balance']), 'barcolor':'', 'relativepower':symbol, })}
                    </div>

                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_transfer_ui(selected_object)}>
                        {this.render_detail_item('5', {'text':'Transfer', 'action':''},)}
                    </div>
                    
                    {this.render_auth_modify_button(selected_object)}

                    {this.render_exchange_transfer_button(selected_object)}

                    {this.render_freeze_unfreeze_tokens_button(selected_object)}

                    {this.render_authmint_tokens_button(selected_object)}

                    {this.render_moderator_button(selected_object)}

                    {this.render_basic_edit_object_button(selected_object)}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_token_liquidity_balance(selected_object, symbol){
        var buy_exchanges_count = selected_object['data'][3].length
        var is_type_spend = false

        if(buy_exchanges_count == 1 && selected_object['data'][3][0] == 0){
            is_type_spend = true
        }
        if(selected_object['id'] != 5 && !is_type_spend){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':'The exchanges balance for each of the tokens used to buy '+symbol, 'title':'Buy Token Liquidity'})}
                    <div style={{height:10}}/>
                    {this.render_buy_token_uis(selected_object)}

                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    when_block_limit_chart_tags_objectt_updated(tag_obj){
        this.setState({block_limit_chart_tags_object: tag_obj})
    }
    
    when_total_supply_chart_tags_object_updated(tag_obj){
        this.setState({total_supply_chart_tags_object: tag_obj})
    }

    render_revoke_author_privelages_event(object){
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        var events = this.get_moderator_item_logs(object, 'revoke_privelages')

        if(object['id'] == 5) return;

        if(events.length != 0){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Author Moderator Privelages Disabled', 'details':'Author of Object is not a Moderator by default', 'size':'l'})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Author Moderator Privelages Enabled', 'details':'Author of Object is a Moderator by default', 'size':'l'})}
                </div>
            )
        }
    }

    render_price_of_token(selected_object){
        // var selected_item = this.props.selected_spend_item
        // var selected_object = this.get_exchange_tokens(5)[selected_item]

        var input_amount = 1
        var input_reserve_ratio = selected_object['data'][2][0]
        var output_reserve_ratio = selected_object['data'][2][1]
        var price = this.calculate_price(input_amount, input_reserve_ratio, output_reserve_ratio, selected_object)
        var buy_tokens = [].concat(selected_object['data'][3])
        var buy_amounts = [].concat(selected_object['data'][4])
        var buy_depths = [].concat(selected_object['data'][5])
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':'The amount you get when selling one unit of the token', 'title':'Token Price'})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                        {buy_tokens.map((item, index) => (
                            <li style={{'padding': '1px'}}>
                                {this.render_detail_item('2', {'style':'l','title':'Token ID: '+item, 'subtitle':'depth:'+buy_depths[index], 'barwidth':this.calculate_bar_width(this.calculate_price_from_sell_action(buy_amounts[index], price)), 'number':this.format_account_balance_figure(this.calculate_price_from_sell_action(buy_amounts[index], price)), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    calculate_price(input_amount, input_reserve_ratio, output_reserve_ratio, selected_object){
        // var selected_item = this.props.selected_spend_item
        // var selected_object = this.get_exchange_tokens(5)[selected_item]
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
            return Math.round(amount*price)
        }
    }

    get_access_rights_status(value){
        if(value == true){
            return 'Enabled'
        }else{
            return 'Disabled'
        }
    }

    open_mint_burn_spend_token_ui(selected_object){
        this.props.open_mint_burn_token_ui(selected_object)
    }

    open_transfer_ui(selected_object){
        this.props.open_transfer_ui(selected_object)
    }

    open_modify_token_ui(selected_object){
        this.props.open_modify_token_ui(selected_object)
    }

    open_exchange_transfers_ui(selected_object){
        this.props.open_exchange_transfers_ui(selected_object)
    }

    open_freeze_unfreeze_ui(selected_object){
        this.props.open_freeze_unfreeze_ui(selected_object)
    }

    open_authmint_ui(selected_object){
        this.props.open_authmint_ui(selected_object)
    }

    open_moderator_ui(selected_object){
        this.props.open_moderator_ui(selected_object)
    }


    render_last_swap_block(selected_object){
        // var selected_item = this.props.selected_spend_item
        // var selected_object = this.get_exchange_tokens(5)[selected_item]

        if(selected_object['account_data'][0] != 0){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':'Last Swap Block', 'title':selected_object['account_data'][0]})}
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    render_last_swap_timestamp(selected_object){
        // var selected_item = this.props.selected_spend_item
        // var selected_object = this.get_exchange_tokens(5)[selected_item]

        if(selected_object['account_data'][1] != 0){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':'Last Swap Age', 'title': this.get_time_difference(selected_object['account_data'][1]) })}
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    render_last_swap_transaction_count(selected_object){
        // var selected_item = this.props.selected_spend_item
        // var selected_object = this.get_exchange_tokens(5)[selected_item]

        if(selected_object['account_data'][2] != 0){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':'Last Swap Transactions Count', 'title':selected_object['account_data'][2]})}
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    render_last_entered_contracts_count(selected_object){
        // var selected_item = this.props.selected_spend_item
        // var selected_object = this.get_exchange_tokens(5)[selected_item]

        if(selected_object['account_data'][3] !=0){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':'Last Entered Contracts Count', 'title':selected_object['account_data'][3]})}
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    render_auth_modify_button(object){
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        var contract_config = object['data'][1]
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if(object['id'] != 5 && contract_config[9/* exchange_authority */] == my_account){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':'Modify Token', 'details':'Modify the configuration of the exchange directly.', 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_modify_token_ui(object)}>
                        {this.render_detail_item('5', {'text':'Modify Exchanage', 'action':''})}
                    </div>
                </div>
            )
        }
    }

    render_exchange_transfer_button(object){
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        var contract_config = object['data'][1]
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if(object['id'] != 5 && contract_config[9/* exchange_authority */] == my_account){
            return(
                <div>
                    {this.render_detail_item('0')}         
                    
                    {this.render_detail_item('3', {'title':'Exchange Transfer', 'details':'Transfer tokens from the exchanges account to a specified target.', 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_buy_token_uis(object)}
                    <div style={{height:10}}/>
                    
                    <div onClick={()=>this.open_exchange_transfers_ui(object)}>
                        {this.render_detail_item('5', {'text':'Run Transfers', 'action':''})}
                    </div>
                </div>
            )
        }
    }

    render_freeze_unfreeze_tokens_button(object){
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        var contract_config = object['data'][1]
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if(object['id'] != 5 && contract_config[9/* exchange_authority */] == my_account){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':'Freeze/Unfreeze Tokens', 'details':'Freeze or unfreeze a given accounts balance.', 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_freeze_unfreeze_ui(object)}>
                        {this.render_detail_item('5', {'text':'Freeze/Unfreeze', 'action':''})}
                    </div>
                </div>
            )
        }
    }


    render_authmint_tokens_button(object){
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        var contract_config = object['data'][1]
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if(object['id'] != 5 && contract_config[9/* exchange_authority */] == my_account){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':'AuthMint Tokens', 'details':'Bypass the exchanges restrictions and mint your token as an authority', 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_authmint_ui(object)}>
                        {this.render_detail_item('5', {'text':'AuthMint', 'action':''})}
                    </div>
                </div>
            )
        }
    }

    render_moderator_button(object){
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if(object['id'] != 5 && (object['moderators'].includes(my_account) || object['event'].returnValues.p3 == my_account)){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':'Perform Moderator Actions', 'details':'Set an accounts access rights, moderator privelages or block an account', 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_moderator_ui(object)}>
                        {this.render_detail_item('5', {'text':'Perform Action', 'action':''})}
                    </div>
                </div>
            )
        }
    }


    render_basic_edit_object_button(object){
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if(object['id'] != 5 && (object['event'].returnValues.p3 == my_account)){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':'Edit Token Post', 'details':'Change the basic details for your Token Post', 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_basic_edit_token_ui(object)}>
                        {this.render_detail_item('5', {'text':'Perform Action', 'action':''})}
                    </div>
                </div>
            )
        }
    }

    open_basic_edit_token_ui(object){
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        this.props.open_edit_object('8', object)
    }


    get_spend_data(selected_object){
        // var selected_item = this.props.selected_spend_item
        // var selected_object = this.get_exchange_tokens(5)[selected_item]
        var title = selected_object['id'];
        var img = selected_object['img']
        
        var selected_obj_root_config = selected_object['data'][0];
        var selected_obj_config = selected_object['data'][1];
        var selected_obj_ratio_config = selected_object['data'][2];

        var type = selected_obj_root_config[3] == 3 ? 'Capped' : 'Uncapped'
        var spend_type = selected_object['data'][0][3/* <3>token_type */] == 3 ? 'END': 'SPEND'
        var is_auth_main_contract = selected_obj_config[9] == 2 ? '2 (Main Contract)': selected_obj_config[9]
        var is_trust_fee_target_main_contract = selected_obj_config[10] == 2 ? '2 (Main Contract)': (selected_obj_config[10] == 0 ? '0 (Burn Account)': selected_obj_config[10])
        var halfing_type = selected_obj_config[15] == 0 ? 'Fixed' : 'Spread'

        if(title == 5){
            // var obj = {'E15':'315', 'E25':'325'}
            // title = obj[selected_object['e5']]
            title = selected_object['e5'].replace('E', '3')
        }

        var item = selected_object;
        var active_tags = item['ipfs'] == null ? [''+title, ''+type, 'token'] : [item['e5']].concat(item['ipfs'].entered_indexing_tags)
        var name = item['ipfs'] == null ? ''+title : item['ipfs'].entered_title_text
        var symbol = item['ipfs'] == null ? ''+spend_type : item['ipfs'].entered_symbol_text
        
        var image = item['ipfs'] == null ? img : item['ipfs'].token_image
        var proportion_ratio_events = selected_object['proportion_ratio_data']
        return{
            'tags':{'active_tags':active_tags, 'index_option':'indexed', 'when_tapped':''},
            'banner-icon':{'header':name, 'subtitle':symbol, 'image':image},
            'token_id': {'title':'ID: '+selected_object['id'], 'details':'Token Identifier', 'size':'l'},
            'token_type': {'title':'Token Type', 'details':type, 'size':'l'},

            'unlocked_supply': {'title':'Unlocked Supply', 'details':this.enabled_disabled(selected_obj_root_config[0]), 'size':'l'},
            'unlocked_liquidity': {'title':'Unlocked Liquidity', 'details':this.enabled_disabled(selected_obj_root_config[1]), 'size':'l'},
            'fully_custom': {'title':'Fully Custom', 'details':this.enabled_disabled(selected_obj_root_config[2]), 'size':'l'},

            'buy_limit':{'style':'l','title':'Mint Limit', 'subtitle':this.format_power_figure(selected_obj_config[0]), 'barwidth':this.calculate_bar_width(selected_obj_config[0]), 'number':this.format_account_balance_figure(selected_obj_config[0]), 'relativepower':symbol},
            
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

            'exchanges_liquidity':{'style':'l','title':'Circulating Supply', 'subtitle':this.format_power_figure(selected_obj_ratio_config[2]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[2]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[2]), 'relativepower':symbol},
            'mint_burn_button':{'text':'Mint/Burn Token', 'action':''},

            'block_limit':{'style':'l','title':'Block Limit', 'subtitle':this.format_power_figure(selected_obj_config[1]), 'barwidth':this.calculate_bar_width(selected_obj_config[1]), 'number':this.format_account_balance_figure(selected_obj_config[1]), 'relativepower':symbol},
            'internal_block_halfing_proportion': {'title':this.format_proportion(selected_obj_config[5]), 'details':'Internal Block Halving Proportion', 'size':'l'},
            'block_limit_reduction_proportion': {'title':this.format_proportion(selected_obj_config[6]), 'details':'Block Limit Reduction Proportion', 'size':'l'},
            
            'block_reset_limit': {'title':selected_obj_config[8], 'details':'Block Reset Limit', 'size':'l'},
            'block_limit_sensitivity': {'title':selected_obj_config[12], 'details':'Block Limit Sensitivity', 'size':'l'},
            'default_authority_mint_limit': {'title':this.format_proportion(selected_obj_config[14]), 'details':'Authority Mint Limit (percentage of supply)', 'size':'l'},
            'block_halfing_type': {'title':halfing_type, 'details':'Halving Type', 'size':'l'},
            'maturity_limit':{'style':'l','title':'Maturity Limit', 'subtitle':this.format_power_figure(selected_obj_config[16]), 'barwidth':this.calculate_bar_width(selected_obj_config[16]), 'number':this.format_account_balance_figure(selected_obj_config[16]), 'relativepower':symbol},

            'current_block_mint_total':{'style':'l','title':'Current Block Mint Total', 'subtitle':this.format_power_figure(selected_obj_ratio_config[4]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[4]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[4]), 'relativepower':symbol},
            'active_block_limit_reduction_proportion': {'title':this.format_proportion(selected_obj_ratio_config[6]), 'details':'Active Block Limit Reduction Proportion', 'size':'l'},
            
            '':{},
            '':{},
            '':{},
            '':{},
        }
    }

    render_buy_token_uis(selected_object){
        // var selected_item = this.props.selected_spend_item
        // var selected_object = this.get_exchange_tokens(5)[selected_item]
        var buy_tokens = [].concat(selected_object['data'][3])
        var buy_amounts = [].concat(selected_object['exchanges_balances'])
        var buy_depths = [].concat(selected_object['data'][5])
        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                    {buy_tokens.map((item, index) => (
                        <li style={{'padding': '1px'}}>
                            {this.render_detail_item('2', {'style':'l','title':'Token ID: '+item, 'subtitle':'depth:'+buy_depths[index], 'barwidth':this.calculate_bar_width(buy_amounts[index]), 'number':this.format_account_balance_figure(buy_amounts[index]), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                        </li>
                    ))}
                </ul>
            </div>
            
        )
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



    render_proportion_ratio_chart(selected_object){
        var proportion_ratio_events = selected_object['proportion_ratio_data']
        if(proportion_ratio_events.length != 0){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Block Limit Reduction Proportion', 'details':'Chart containing the block limit reduction proportion over time.', 'size':'l'})}
                    {this.render_detail_item('6', {'dataPoints':this.get_proportion_ratio_data_points(proportion_ratio_events), 'interval':110})}
                    <div style={{height: 10}}/>
                    <Tags page_tags_object={this.state.block_limit_chart_tags_object} tag_size={'l'} when_tags_updated={this.when_block_limit_chart_tags_objectt_updated.bind(this)} theme={this.props.theme}/>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Y-Axis: Proportion', 'details':'X-Axis: Time', 'size':'s'})}
                </div>
            )
        }
    }

    get_proportion_ratio_data_points(event_data){
        var events = this.filter_proportion_ratio_events(event_data);
        var data = []
        for(var i=0; i<events.length; i++){
            data.push(Math.round(events[i].returnValues.p2/10**18) * 100)

            if(i==events.length-1){
                var diff = Date.now()/1000 - events[i].returnValues.p5
                for(var t=0; t<diff; t+=60){
                    data.push(data[data.length-1])      
                }
            }
            else{
                var diff = events[i+1].returnValues.p5 - events[i].returnValues.p5
                for(var t=0; t<diff; t+=60){
                    data.push(data[data.length-1])      
                }
            }
            
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
                    dps.push({x: xVal,y: yVal, indexLabel: ""+yVal+"%"});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_proportion_ratio_interval_figure(events){
        var data = []
        events.forEach(event => {
            data.push(Math.round(event.returnValues.p2/10**18) * 100)
        });
        var largest = Math.max.apply(Math, data);
        return largest
    }

    get_lowest_proportion_ratio_figure(events){
        var data = []
        events.forEach(event => {
            data.push(Math.round(event.returnValues.p2/10**18) *100)
        });
        var largest = Math.min.apply(Math, data);
        return largest
    }

    filter_proportion_ratio_events(events){
        var selected_item = this.get_selected_item(this.state.block_limit_chart_tags_object, this.state.block_limit_chart_tags_object['i'].active)

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
        else if(selected_item == 'all-time'){
            filter_value = 10**10
        }
        var data = []
        var cutoff_time = Date.now()/1000 - filter_value
        events.forEach(event => {
            if(event.returnValues.p5 > cutoff_time){
                data.push(event)
            }
        });

        return data
    }





    show_total_supply_chart(item, selected_object, symbol){
        // var selected_object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        var total_supply = selected_object['data'][2][2]
        var proportion_ratio_events = selected_object['exchange_ratio_data']
        var amount = total_supply
        if(proportion_ratio_events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Total Supply', 'details':`Chart containing the total supply of ${symbol} over time.`, 'size':'l'})}
                    {this.render_detail_item('6', {'dataPoints':this.get_total_supply_data_points(proportion_ratio_events), 'interval':110, 'hide_label':true})}
                    <div style={{height: 10}}/>
                    {/* <Tags page_tags_object={this.state.total_supply_chart_tags_object} tag_size={'l'} when_tags_updated={this.when_total_supply_chart_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    <div style={{height: 10}}/> */}
                    {this.render_detail_item('3', {'title':'Y-Axis: Total Supply', 'details':'X-Axis: Time', 'size':'s'})}
                </div>
            )
        }
        
    }

    get_total_supply_data_points(events){
        // var events = this.filter_proportion_ratio_events(event_data);
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                data.push(bigInt(events[i].returnValues.p4))

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p9
                    for(var t=0; t<diff; t+=60){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p9 - events[i].returnValues.p9
                    for(var t=0; t<diff; t+=60){
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
        var largest_number = this.get_total_supply_interval_figure(events)
        for(var i = 0; i < noOfDps; i++) {
            yVal = parseInt(bigInt(data[factor * xVal]).multiply(100).divide(largest_number))
            // yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null && data[factor * xVal] != null){
                if(i%(Math.round(noOfDps/5)) == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(data[factor * xVal])});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_total_supply_interval_figure(events){
        var data = []
        events.forEach(event => {
            data.push(bigInt(event.returnValues.p4))
        });
        var largest = Math.max.apply(Math, data);
        return largest
    }

    get_lowest_total_supply_figure(events){
        var data = []
        events.forEach(event => {
            data.push(bigInt(event.returnValues.p4))
        });
        var largest = Math.min.apply(Math, data);
        return largest
    }





    show_transaction_count_chart(selected_object, symbol){
        var exchange_ratio_events = selected_object['exchange_ratio_data']
        if(exchange_ratio_events.length != 0){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Total Transactions', 'details':`Chart containing the total number of buy/sell transactions over time.`, 'size':'l'})}
                    {this.render_detail_item('6', {'dataPoints':this.get_transaction_count_data_points(exchange_ratio_events), 'interval':this.get_transaction_count_interval_figure(exchange_ratio_events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Y-Axis: Total Transactions', 'details':'X-Axis: Time', 'size':'s'})}
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
                    var diff = Date.now()/1000 - events[i].returnValues.p9
                    for(var t=0; t<diff; t+=60){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p9 - events[i].returnValues.p9
                    for(var t=0; t<diff; t+=60){
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

    get_lowest_transaction_count_figure(events){
        var data = []
        events.forEach(event => {
            data.push(bigInt(event.returnValues.p3))
        });
        var largest = Math.min.apply(Math, data);
        return largest
    }










    render_transfer_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Exchange ' + object['id'], 'details': 'Your Transfer Events', 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                    {this.render_contract_transfer_item_logs(object)}
                </div>
            </div>
        )
    }

    get_item_logs(object, event) {
        if (this.props.app_state.exchange_events[object['id']] == null) {
            return []
        }
        return this.props.app_state.exchange_events[object['id']][event]
    }


    render_contract_transfer_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.get_item_logs(object, 'transfer'))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
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
                <div style={{ overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse' }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_contract_transfer_item_clicked(index)}>
                                    {this.render_contract_transfer_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }


    when_contract_transfer_item_clicked(index){
        if (this.state.selected_contract_transfer_event_item == index) {
            this.setState({ selected_contract_transfer_event_item: null })
        } else {
            this.setState({ selected_contract_transfer_event_item: index })
        }
    }


    render_contract_transfer_event_item(item, object, index){
        var exchange_id = item['event'].returnValues.p1;
        var number = item['event'].returnValues.p4
        var depth = item['event'].returnValues.p7
        var from_to = item['action'] == 'Sent' ? 'To: '+this.get_sender_title_text(item['event'].returnValues.p3, object) : 'From: '+this.get_sender_title_text(item['event'].returnValues.p2, object)
        if (this.state.selected_contract_transfer_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': from_to, 'details': 'Action: '+item['action'], 'size': 's' })}
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Token ID:  '+exchange_id+', depth: '+depth, 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], })}
                    </div>

                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item['event'].returnValues.p5), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item['event'].returnValues.p6, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': from_to, 'details': 'Action: '+item['action'], 'size': 's' })}
                    <div style={{ height: 2 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Token ID:  '+exchange_id+', depth: '+depth, 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
    }

    get_sender_title_text(sender, object) {
        if (sender == this.props.app_state.user_account_id[object['e5']]) {
            return 'You'
        } else {
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }












    render_updated_proportion_ratio_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Exchange ' + object['id'], 'details': 'Exchange Mint Limit Proportion Ratio Events', 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                    {this.render_proportion_ratio_item_logs(object)}
                </div>
            </div>
        )
    }



    render_proportion_ratio_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.get_item_logs(object, 'proportion_ratio'))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
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
                <div style={{ overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse' }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_proportion_ratio_item_clicked(index)}>
                                    {this.render_proportion_ratio_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }


    when_proportion_ratio_item_clicked(index){
        if (this.state.selected_proportion_ratio_event_item == index) {
            this.setState({ selected_proportion_ratio_event_item: null })
        } else {
            this.setState({ selected_proportion_ratio_event_item: index })
        }
    }


    render_proportion_ratio_event_item(item, object, index){
        var new_active_limit = item.returnValues.p2
        var tokens_to_receive = item.returnValues.p3
        if (this.state.selected_proportion_ratio_event_item == index) {
            return (
                <div>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Tokens Received', 'subtitle': this.format_power_figure(tokens_to_receive), 'barwidth': this.calculate_bar_width(tokens_to_receive), 'number': this.format_account_balance_figure(tokens_to_receive), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], })}
                    </div>
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.format_proportion(new_active_limit), 'details': 'Updated Active Limit', 'size': 'l' })}
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p5), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }}/>
                    {this.render_detail_item('3', { 'title': item.returnValues.p4, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.format_proportion(new_active_limit), 'details': 'Updated Active Limit', 'size': 'l' })}
                    <div style={{ height: 2 }} />
                </div>
            )
        }
    }















    render_modify_exchange_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Exchange ' + object['id'], 'details': 'Exchange Modification Events', 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                    {this.render_exchange_modification_item_logs(object)}
                </div>
            </div>
        )
    }

    render_exchange_modification_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.get_item_logs(object, 'modify'))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
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
                <div style={{ overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse' }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_modify_item_clicked(index)}>
                                    {this.render_modified_exchange_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_modify_item_clicked(index){
         if (this.state.selected_modify_event_item == index) {
            this.setState({ selected_modify_event_item: null })
        } else {
            this.setState({ selected_modify_event_item: index })
        }
    }

    render_modified_exchange_event_item(item, object, index){
        if (this.state.selected_modify_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': 'Modifier', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_target_identifier(item), 'details': 'Targeted Modify Item', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.get_value_ui(item)}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p6), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p7, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_target_identifier(item), 'details': 'Targeted Modify Item', 'size': 's' })}
                    <div style={{ height: 2 }} />
                </div>
            )
        }
    }

    get_target_identifier(item) {
        var obj = this.get_contract_modify_details()

        var target_array_pos = item.returnValues.p3
        var target_array_item = item.returnValues.p4
        var selected_key = ''
        for (let key in obj) {
            if (obj[key]['position'][0] == target_array_pos && obj[key]['position'][1] == target_array_item) {
                selected_key = key
                break;
            }
        }

        return selected_key
    }

    get_value_ui(item) {
        var identifier = this.get_target_identifier(item)
        var type = this.get_contract_modify_details()[identifier]['picker']
        var number = item.returnValues.p5

        if (type == 'proportion') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.format_proportion(number), 'details': 'proportion', 'size': 'l' })}
                </div>
            )
        }
        else if (type == 'time') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_time_diff(number), 'details': 'duration', 'size': 'l' })}
                </div>
            )
        }
        else if (type == 'number') {
            return (
                <div>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': identifier, 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': 'units', })}
                    </div>
                </div>
            )
        }
        else if (type == 'tag') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_tag_selected_item(identifier, number), 'details': 'value: ' + number, 'size': 'l' })}
                </div>
            )
        }
        else if (type == 'id') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': number, 'details': 'target ID', 'size': 'l' })}
                </div>
            )
        }
    }

    get_tag_selected_item(title, number) {
        var obj = { 'Auto Wait': { 0: 'no', 1: 'yes' }, 'Moderator Modify Privelage': { 1: 'modifiable', 0: 'non-modifiable' }, 'Unlimited Extend Contract Time': { 1: 'enabled', 0: 'disabled' }, 'Bounty Limit Type': { 0: 'relative', 1: 'absolute' }, 'Force Exit Enabled': { 1: 'enabled', 0: 'disabled' }, 'Halving type': { 0: 'fixed', 1: 'spread' }, 'Block Limit Sensitivity': { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' } }

        return obj[title][number]
    }

    get_contract_modify_details() {
        var obj = {
            'Buy Limit':{'position':[1,0], 'picker':'number', 'powerlimit':63},
            'Trust Fee':{'position':[1,7], 'picker':'proportion', 'powerlimit':9}, 
            'Sell Limit':{'position':[1,11], 'picker':'number', 'powerlimit':63}, 
            'Minimum Time Between Swap':{'position':[1,4], 'picker':'time', 'powerlimit':63}, 
            'Minimum Transactions Between Swap':{'position':[1,2], 'picker':'number', 'powerlimit':63}, 
            'Minimum Blocks Between Swap':{'position':[1,3], 'picker':'number', 'powerlimit':63}, 
            'Minimum Entered Contracts Between Swap':{'position':[1,13], 'picker':'number', 'powerlimit':63}, 
            'Minimum Transactions For First Buy':{'position':[1,17], 'picker':'number', 'powerlimit':63}, 
            'Minimum Entered Contracts For First Buy':{'position':[1,18], 'picker':'number', 'powerlimit':63}, 
            'Block Limit':{'position':[1,1], 'picker':'number', 'powerlimit':63}, 
            'Halving type':{'position':[1,15], 'picker':'tag', 'powerlimit':63}, 
            'Maturity Limit':{'position':[1,16], 'picker':'number', 'powerlimit':63}, 
            'Internal Block Halving Proportion':{'position':[1,5], 'picker':'proportion', 'powerlimit':9}, 
            'Block Limit Reduction Proportion':{'position':[1,6], 'picker':'proportion', 'powerlimit':9}, 
            'Block Reset Limit':{'position':[1,8], 'picker':'number', 'powerlimit':63}, 
            'Block Limit Sensitivity':{'position':[1,12], 'picker':'tag', 'powerlimit':63}, 
            'Exchange Ratio X':{'position':[2,0], 'picker':'number', 'powerlimit':63}, 
            'Exchange Ratio Y':{'position':[2,1], 'picker':'number', 'powerlimit':63},
        }
        return obj
    }














    render_exchange_transfers_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Exchange ' + object['id'], 'details': 'Exchange Transfer Events', 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                    {this.render_exchange_transfer_item_logs(object)}
                </div>
            </div>
        )
    }


    render_exchange_transfer_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.get_item_logs(object, 'exchange-transfer'))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
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
                <div style={{ overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse' }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_exchange_transfer_item_clicked(index)}>
                                    {this.render_exchange_transfer_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }


    when_exchange_transfer_item_clicked(index){
        if (this.state.selected_exchange_transfer_event_item == index) {
            this.setState({ selected_exchange_transfer_event_item: null })
        } else {
            this.setState({ selected_exchange_transfer_event_item: index })
        }
    }


    render_exchange_transfer_event_item(item, object, index){
        var exchange_id = item['event'].returnValues.p1;
        var number = item['event'].returnValues.p4
        var depth = item['event'].returnValues.p7
        var from_to = item['action'] == 'Sent' ? 'To: '+this.get_sender_title_text(item['event'].returnValues.p3, object) : 'From: '+this.get_sender_title_text(item['event'].returnValues.p2, object)
        if (this.state.selected_contract_transfer_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': from_to, 'details': 'Action: '+item['action'], 'size': 's' })}
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Token ID:  '+exchange_id, 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], })}
                    </div>

                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item['event'].returnValues.p5), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item['event'].returnValues.p6, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': from_to, 'details': 'Action: '+item['action'], 'size': 's' })}
                    <div style={{ height: 2 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Token ID:  '+exchange_id, 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
    }













    render_update_balance_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Exchange ' + object['id'], 'details': 'Update Balance Events', 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                    {this.render_update_balance_item_logs(object)}
                </div>
            </div>
        )
    }


    render_update_balance_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.get_item_logs(object, 'update_balance'))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
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
                <div style={{ overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse' }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_update_balance_item_clicked(index)}>
                                    {this.render_update_balance_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }


    when_update_balance_item_clicked(index){
        if (this.state.selected_update_balance_event_item == index) {
            this.setState({ selected_update_balance_event_item: null })
        } else {
            this.setState({ selected_update_balance_event_item: index })
        }
    }


    render_update_balance_event_item(item, object, index){
        var new_balance = item.returnValues.p3
        if (this.state.selected_update_balance_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': 'Receiver Account', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'New Balance ', 'subtitle': this.format_power_figure(new_balance), 'barwidth': this.calculate_bar_width(new_balance), 'number': this.format_account_balance_figure(new_balance), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], })}
                    </div>
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p4), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p5, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': 'Receiver Account', 'size': 's' })}
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'New Balance ', 'subtitle': this.format_power_figure(new_balance), 'barwidth': this.calculate_bar_width(new_balance), 'number': this.format_account_balance_figure(new_balance), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
    }














    render_freeze_unfreeze_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Exchange ' + object['id'], 'details': 'Freeze-Unfreeze Events', 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                    {this.render_freeze_unfreeze_item_logs(object)}
                </div>
            </div>
        )
    }


    render_freeze_unfreeze_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.get_item_logs(object, 'freeze_unfreeze'))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
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
                <div style={{ overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse' }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_freeze_unfreeze_item_clicked(index)}>
                                    {this.render_freeze_unfreeze_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }


    when_freeze_unfreeze_item_clicked(index){
        if (this.state.selected_freeze_unfreeze_event_item == index) {
            this.setState({ selected_freeze_unfreeze_event_item: null })
        } else {
            this.setState({ selected_freeze_unfreeze_event_item: index })
        }
    }


    render_freeze_unfreeze_event_item(item, object, index){
        var freeze_unfreeze_obj = {'1':'Action: Freeze','0':'Action: Unfreeze'}
        var amount = item.returnValues.p5
        var action = freeze_unfreeze_obj[item.returnValues.p2]
        var depth = item.returnValues.p6
        if (this.state.selected_freeze_unfreeze_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': action, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Amount, depth: '+depth, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], })}
                    </div>
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': 'Authority Account', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': action, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Amount, depth: '+depth, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
    }













    render_modify_moderator_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Exchange ' + object['id'], 'details': 'Exchange Modify Moderator Events', 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                    {this.render_modify_moderator_item_logs(object)}
                </div>
            </div>
        )
    }

    get_moderator_item_logs(object, event){
        if (this.props.app_state.moderator_events[object['id']] == null) {
            return []
        }
        return this.props.app_state.moderator_events[object['id']][event]
    }

    render_modify_moderator_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.get_moderator_item_logs(object, 'modify_moderator'))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
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
                <div style={{ overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse' }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_modify_moderator_item_clicked(index)}>
                                    {this.render_modify_moderator_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_modify_moderator_item_clicked(index){
        if (this.state.selected_modify_moderator_event_item == index) {
            this.setState({ selected_modify_moderator_event_item: null })
        } else {
            this.setState({ selected_modify_moderator_event_item: index })
        }
    }

    render_modify_moderator_event_item(item, object, index){
        var authority_val_obj = {'0':'Not Moderator', '1':'Moderator'}
        var authority_val = authority_val_obj[item.returnValues.p6]
        if (this.state.selected_modify_moderator_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': 'Targeted Account', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': 'Moderator Account', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': authority_val, 'details': 'Authority value', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': 'Targeted Account', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', {'title': authority_val, 'details': 'Authority value', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
    }














    render_interactable_checker_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Exchange ' + object['id'], 'details': 'Exchange Access Rights Settings Events', 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                    {this.render_interactable_checker_item_logs(object)}
                </div>
            </div>
        )
    }

    render_interactable_checker_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.get_moderator_item_logs(object, 'enable_interactible'))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
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
                <div style={{ overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse' }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_interactable_checker_item_clicked(index)}>
                                    {this.render_interactable_checker_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_interactable_checker_item_clicked(index){
        if (this.state.selected_interactable_checker_event_item == index) {
            this.setState({ selected_interactable_checker_event_item: null })
        } else {
            this.setState({ selected_interactable_checker_event_item: index })
        }
    }

    render_interactable_checker_event_item(item, object, index){
        var interactable_checker_obj = {'0':'Access Rights Disabled(Public)','1':'Access Rights Enabled(Private)'}
        var interactable_checker = interactable_checker_obj[item.returnValues.p6]
        if (this.state.selected_interactable_checker_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': interactable_checker, 'details': 'Access Rights Status', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': 'Moderator Account', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': interactable_checker, 'details': 'Acces Rights Status', 'size': 's' })}
                    <div style={{ height: 2 }} />
                </div>
            )
        }
    }











    render_interactable_accounts_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Exchange ' + object['id'], 'details': 'Exchange  Account Access Settings Events', 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                    {this.render_interactable_accounts_item_logs(object)}
                </div>
            </div>
        )
    }

    render_interactable_accounts_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.get_moderator_item_logs(object, 'add_interactible'))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
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
                <div style={{ overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse' }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_interactable_account_item_clicked(index)}>
                                    {this.render_interactable_account_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_interactable_account_item_clicked(index){
        if (this.state.selected_interactable_account_event_item == index) {
            this.setState({ selected_interactable_account_event_item: null })
        } else {
            this.setState({ selected_interactable_account_event_item: index })
        }
    }

    render_interactable_account_event_item(item, object, index){
        if (this.state.selected_interactable_account_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': 'Targeted Account', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': 'Moderator Account', 'size': 's' })}
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': 'Until: '+(new Date(item.returnValues.p6*1000)), 'size': 's' })}
                    
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': 'Targeted Account', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': 'Until: '+(new Date(item.returnValues.p6*1000)), 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
    }











    render_blocked_accounts_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Exchange ' + object['id'], 'details': 'Exchange  Blocked Account Events', 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                    {this.render_blocked_accounts_item_logs(object)}
                </div>
            </div>
        )
    }

    render_blocked_accounts_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.get_moderator_item_logs(object, 'block_account'))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
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
                <div style={{ overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse' }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_blocked_account_item_clicked(index)}>
                                    {this.render_blocked_account_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_blocked_account_item_clicked(index){
        if (this.state.selected_blocked_account_event_item == index) {
            this.setState({ selected_blocked_account_event_item: null })
        } else {
            this.setState({ selected_blocked_account_event_item: index })
        }
    }

    render_blocked_account_event_item(item, object, index){
        if (this.state.selected_blocked_account_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': 'Targeted Account', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': 'Moderator Account', 'size': 's' })}
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': 'Until: '+(new Date(item.returnValues.p6*1000)), 'size': 's' })}
                    
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': 'Targeted Account', 'size': 's' })}
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': 'Until: '+(new Date(item.returnValues.p6*1000)), 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
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

    enabled_disabled(value){
        if(value == 1){
            return 'enabled'
        }
        return 'disabled'
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

    calculate_bar_width(num){
        if(num == null) return '0%'
        var last_two_digits = num.toString().slice(0, 1)+'0';
        if(num > 10){
            last_two_digits = num.toString().slice(0, 2);
        }
        return last_two_digits+'%'
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

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
    }

    format_exchange_ratio(ratio_x, ratio_y){
        // Calculate the ratio
        const gcd = this.calculateGCD(ratio_x, ratio_y);
        const ratio = `${ratio_x / gcd}:${ratio_y / gcd}`;
        return ratio;
    }

    calculateGCD(a, b) {
        if (b === 0) {
            return a;
        }
        return this.calculateGCD(b, a % b);
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

    get_future_time_difference(time) {
        var number_date = Math.round(parseInt(time));
        var now = Math.round(new Date().getTime() / 1000);

        var diff = number_date - now;
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


}




export default SpendDetailSection;