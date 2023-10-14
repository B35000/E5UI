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


    componentDidMount() {
        this.interval = setInterval(() => this.check_for_new_responses_and_messages(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    check_for_new_responses_and_messages() {
        if (this.props.selected_end_item != null) {
            var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
            this.props.get_exchange_event_data(object['id'], object['e5'])
            this.props.get_moderator_event_data(object['id'], object['e5'])
        }
    }


    get_navigate_view_end_list_detail_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['or','',0], ['e','details','e.events', 'e.moderator-events'],[0]
          ],
            'events': [
                ['xor', 'e', 1], ['events', 'transfers', 'exchange-transfers', 'updated-balances', 'updated-exchange-ratios', 'modify-exchange' ,'freeze-unfreeze'], [1], [1]
            ],
            'moderator-events': [
                ['xor', 'e', 1], ['moderator-events', 'modify-moderators', 'interactable-checkers', 'interactable-accounts', 'block-accounts'], [1], [1]
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
        }
        else if(selected_item == 'updated-exchange-ratios'){
            return(
                <div>
                    {this.render_updated_exchange_ratio_logs()}
                </div>
            )
        }
        else if(selected_item == 'transfers'){
            return(
                <div>
                    {this.render_transfer_logs()}
                </div>
            )
        }
        else if(selected_item == 'modify-exchange'){
            return(
                <div>
                    {this.render_modify_exchange_logs()}
                </div>
            )
        }
        else if(selected_item == 'exchange-transfers'){
            return(
                <div>
                    {this.render_exchange_transfers_logs()}
                </div>
            )
        }
        else if(selected_item == 'updated-balances'){
            return(
                <div>
                    {this.render_update_balance_logs()}
                </div>
            )
        }
        else if(selected_item == 'freeze-unfreeze'){
            return(
                <div>
                    {this.render_freeze_unfreeze_logs()}
                </div>
            )
        }

        else if(selected_item == 'modify-moderators'){
            return(
                <div>
                    {this.render_modify_moderator_logs()}
                </div>
            )
        }
        else if(selected_item == 'interactable-checkers'){
            return(
                <div>
                    {this.render_interactable_checker_logs()}
                </div>
            )
        }
        else if(selected_item == 'interactable-accounts'){
            return(
                <div>
                    {this.render_interactable_accounts_logs()}
                </div>
            )
        }
        else if(selected_item == 'block-accounts'){
            return(
                <div>
                    {this.render_blocked_accounts_logs()}
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

                    {this.render_revoke_author_privelages_event()}

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

                    {this.render_edit_object_button()}

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

    render_revoke_author_privelages_event(){
        var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        var events = this.get_moderator_item_logs(object, 'revoke_privelages')

        if(object['id'] == 3) return;

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
                                {this.render_detail_item('2', {'style':'l','title':'Token ID: '+item, 'subtitle':'depth:'+buy_depths[index], 'barwidth':this.calculate_bar_width(this.calculate_price_from_sell_action(buy_amounts[index], price)), 'number':this.format_account_balance_figure(this.calculate_price_from_sell_action(buy_amounts[index], price)), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
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
        var my_account = this.props.app_state.user_account_id[object['e5']]
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
        var my_account = this.props.app_state.user_account_id[object['e5']]
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
        var my_account = this.props.app_state.user_account_id[object['e5']]
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
        var my_account = this.props.app_state.user_account_id[object['e5']]
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


    render_edit_object_button(){
        var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        var my_account = this.props.app_state.user_account_id[object['e5']]

        if(object['id'] != 3 && object['event'].returnValues.p3 == my_account){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':'Edit Token Post', 'details':'Change the basic details for your Token Post', 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_basic_edit_token_ui()}>
                        {this.render_detail_item('5', {'text':'Perform Action', 'action':''})}
                    </div>
                </div>
            )
        }
    }

    open_basic_edit_token_ui(){
        var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        this.props.open_edit_object('8', object)
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
        var spend_type = selected_object['data'][0][3/* <3>token_type */] == 3 ? 'END': 'SPEND'
        var is_auth_main_contract = selected_obj_config[9] == 2 ? '2 (Main Contract)': selected_obj_config[9]
        var is_trust_fee_target_main_contract = selected_obj_config[10] == 2 ? '2 (Main Contract)': (selected_obj_config[10] == 0 ? '0 (Burn Account)': selected_obj_config[10])

        if(title == 3){
            var obj = {'E15':'E15'}
            title = obj[selected_object['e5']]
        }

        var item = selected_object;
        var active_tags = item['ipfs'] == null ? [''+title, ''+type, 'token'] : item['ipfs'].entered_indexing_tags
        var name = item['ipfs'] == null ? ''+title : item['ipfs'].entered_title_text
        var symbol = item['ipfs'] == null ? ''+spend_type : item['ipfs'].entered_symbol_text
        if(symbol == null){
            symbol = EndImg
        }
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
                            {this.render_detail_item('2', {'style':'l','title':'Token ID: '+item, 'subtitle':'depth:'+buy_depths[index], 'barwidth':this.calculate_bar_width(buy_amounts[index]), 'number':this.format_account_balance_figure(buy_amounts[index]), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                        </li>
                    ))}
                </ul>
            </div>
            
        )
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







    render_updated_exchange_ratio_logs(){
        var he = this.props.height - 45
        var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Exchange ' + object['id'], 'details': 'Updated Exchange Ratio Events', 'size': 'l' })}
                    </div>
                    
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                    {this.render_updated_exchange_ratio_item_logs(object)}
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


    render_updated_exchange_ratio_item_logs(object){
        var middle = this.props.height - 120;
        var items = this.get_item_logs(object, 'exchange_ratio')
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
                                <div key={index} onClick={() => this.when_exchange_ratio_item_clicked(index)}>
                                    {this.render_exchange_ratio_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }


    when_exchange_ratio_item_clicked(index){
        if (this.state.selected_exchange_ratio_event_item == index) {
            this.setState({ selected_exchange_ratio_event_item: null })
        } else {
            this.setState({ selected_exchange_ratio_event_item: index })
        }
    }


    render_exchange_ratio_event_item(item, object, index){
        var action_obj = {'0':'Buy', '1':'Sell'}
        var action = action_obj[item.returnValues.p2]
        var token_exchange_liquidity = item.returnValues.p4
        var updated_exchange_ratio_x = item.returnValues.p5
        var updated_exchange_ratio_y = item.returnValues.p6
        var parent_tokens_balance = item.returnValues.p7
        var amount = item.returnValues.p8
        if (this.state.selected_exchange_ratio_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': 'Swapping Account ID', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': action, 'details': 'Action', 'size': 's' })}
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Amount Swapped', 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], })}
                    </div>
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Updted Token Exchange Liquidity', 'subtitle': this.format_power_figure(token_exchange_liquidity), 'barwidth': this.calculate_bar_width(token_exchange_liquidity), 'number': this.format_account_balance_figure(token_exchange_liquidity), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], })}
                    </div>
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Updated Exchange Ratio X', 'subtitle': this.format_power_figure(updated_exchange_ratio_x), 'barwidth': this.calculate_bar_width(updated_exchange_ratio_x), 'number': this.format_account_balance_figure(updated_exchange_ratio_x), 'barcolor': '', 'relativepower': 'units', })}
                    </div>
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Updated Exchange Ratio Y', 'subtitle': this.format_power_figure(updated_exchange_ratio_y), 'barwidth': this.calculate_bar_width(updated_exchange_ratio_y), 'number': this.format_account_balance_figure(updated_exchange_ratio_y), 'barcolor': '', 'relativepower': 'units', })}
                    </div>
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', {'title':this.format_exchange_ratio(updated_exchange_ratio_x, updated_exchange_ratio_y), 'details':'Updated Exchange Ratios X:Y', 'size':'l'},)}
                    <div style={{ height: 2 }} />


                    {/* <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Updated Parent Tokens Aggregated Balance', 'subtitle': this.format_power_figure(parent_tokens_balance), 'barwidth': this.calculate_bar_width(parent_tokens_balance), 'number': this.format_account_balance_figure(parent_tokens_balance), 'barcolor': '', 'relativepower': 'units', })}
                    </div>
                    <div style={{ height: 2 }} /> */}

                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p9), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p10, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': 'Swapping Account ID', 'size': 's' })}
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Amount Swapped', 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], })}
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










    //ctrl-c, ctrl-v
    render_transfer_logs(){
        var he = this.props.height - 45
        var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
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


    render_contract_transfer_item_logs(object){
        var middle = this.props.height - 120;
        var items = this.get_item_logs(object, 'transfer')
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

                    <div style={{ 'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
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














    render_modify_exchange_logs(){
        var he = this.props.height - 45
        var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
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
        var items = this.get_item_logs(object, 'modify')
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













    render_exchange_transfers_logs(){
        var he = this.props.height - 45
        var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
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
        var items = this.get_item_logs(object, 'exchange-transfer')
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
        if (this.state.selected_exchange_transfer_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': from_to, 'details': 'Action: '+item['action'], 'size': 's' })}
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
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













    render_update_balance_logs(){
        var he = this.props.height - 45
        var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
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
        var items = this.get_item_logs(object, 'update_balance')
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















    render_freeze_unfreeze_logs(){
        var he = this.props.height - 45
        var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
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
        var items = this.get_item_logs(object, 'freeze_unfreeze')
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








    render_modify_moderator_logs(){
        var he = this.props.height - 45
        var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
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
        var items = this.get_moderator_item_logs(object, 'modify_moderator')
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













    render_interactable_checker_logs(){
        var he = this.props.height - 45
        var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
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
        var items = this.get_moderator_item_logs(object, 'enable_interactible')
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











    render_interactable_accounts_logs(){
        var he = this.props.height - 45
        var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
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
        var items = this.get_moderator_item_logs(object, 'add_interactible')
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











    render_blocked_accounts_logs(){
        var he = this.props.height - 45
        var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
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
        var items = this.get_moderator_item_logs(object, 'block_account')
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