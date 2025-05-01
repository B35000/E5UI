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

// import Letter from './../assets/letter.png';
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
        selected: 0, navigate_view_end_list_detail_tags_object: this.get_navigate_view_end_list_detail_tags(), y_aggregate_chart_tags_object: this.y_aggregate_chart_tags_object(), trading_volume_chart_tags_object: this.trading_volume_chart_tags_object()
    };

    y_aggregate_chart_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','1h','24h', '7d', '30d', '6mo', this.props.app_state.loc['1416']/* 'all-time' */], [4]
            ],
        };
    }

    trading_volume_chart_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','1h','24h', '7d', '30d', '6mo', this.props.app_state.loc['1416']/* 'all-time' */], [6]
            ],
        };
    }


    componentDidMount() {
        this.interval = setInterval(() => this.check_for_new_responses_and_messages(), this.props.app_state.details_section_syncy_time);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    check_for_new_responses_and_messages() {
        if (this.props.selected_end_item != null) {
            var object = this.get_item_in_array(this.get_exchange_tokens(3), this.props.selected_end_item)
            if(object == null) return;
            this.props.get_exchange_event_data(object['id'], object['e5'])
            this.props.get_moderator_event_data(object['id'], object['e5'])
            this.props.load_exchanges_royalty_event_data(object['id'], object['e5'])
            this.props.load_exchanges_royalty_payout_event_data(object['id'], object['e5'])
        }
    }


    get_navigate_view_end_list_detail_tags(){
        var obj = {
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e',this.props.app_state.loc['2118']/* 'details' */,'e.'+this.props.app_state.loc['2119']/* 'e.events' */, 'e.'+this.props.app_state.loc['2120']/* 'e.moderator-events' */, this.props.app_state.loc['2447d']/* 'royalty-stagings' */],[1]
          ],
            'events': [
                ['xor', 'e', 1], [this.props.app_state.loc['2119']/* 'events' */, this.props.app_state.loc['2337']/* 'transfers' */, this.props.app_state.loc['2338']/* 'exchange-transfers' */, this.props.app_state.loc['2339']/* 'updated-balances' */, this.props.app_state.loc['2340']/* 'updated-exchange-ratios' */, this.props.app_state.loc['2341']/* 'modify-exchange' */ ,this.props.app_state.loc['2342']/* 'freeze-unfreeze' */, this.props.app_state.loc['2343']/* 'depth-mints' */], [1], [1]
            ],
            'moderator-events': [
                ['xor', 'e', 1], [this.props.app_state.loc['2120']/* 'moderator-events' */, this.props.app_state.loc['2066']/* 'modify-moderators' */, this.props.app_state.loc['2067']/* 'interactable-checkers' */, this.props.app_state.loc['2068']/* 'interactable-accounts' */, this.props.app_state.loc['2069']/* 'block-accounts' */], [1], [1]
            ],
        }

        obj[this.props.app_state.loc['2119']] = [
                ['xor', 'e', 1], [this.props.app_state.loc['2119']/* 'events' */, this.props.app_state.loc['2337']/* 'transfers' */, this.props.app_state.loc['2338']/* 'exchange-transfers' */, this.props.app_state.loc['2339']/* 'updated-balances' */, this.props.app_state.loc['2340']/* 'updated-exchange-ratios' */, this.props.app_state.loc['2341']/* 'modify-exchange' */ ,this.props.app_state.loc['2342']/* 'freeze-unfreeze' */, this.props.app_state.loc['2343']/* 'depth-mints' */], [1], [1]
            ]
        obj[this.props.app_state.loc['2120']] = [
                ['xor', 'e', 1], [this.props.app_state.loc['2120']/* 'moderator-events' */, this.props.app_state.loc['2066']/* 'modify-moderators' */, this.props.app_state.loc['2067']/* 'interactable-checkers' */, this.props.app_state.loc['2068']/* 'interactable-accounts' */, this.props.app_state.loc['2069']/* 'block-accounts' */], [1], [1]
            ]

        return obj
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
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 0px 0px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.navigate_view_end_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_end_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
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

    when_navigate_view_end_list_detail_tags_object_updated(tag_group){
        this.setState({navigate_view_end_list_detail_tags_object: tag_group})
    }

    get_item_in_array(object_array, id){
        var object = object_array.find(x => x['e5_id'] === id);
        return object
    }

    render_end_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_end_list_detail_tags_object, this.state.navigate_view_end_list_detail_tags_object['i'].active)
        var selected_object = this.get_item_in_array(this.get_exchange_tokens(3), this.props.selected_end_item)
        
        if(selected_object == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }
        if(selected_item == this.props.app_state.loc['2118']/* 'details' */ || selected_item == 'e'){
            return(
                <div key={selected_item}>
                    {this.render_end_main_details_section(selected_object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2340']/* 'updated-exchange-ratios' */){
            return(
                <div key={selected_item}>
                    {this.render_updated_exchange_ratio_logs(selected_object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2337']/* 'transfers' */){
            return(
                <div key={selected_item}>
                    {this.render_transfer_logs(selected_object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2341']/* 'modify-exchange' */){
            return(
                <div key={selected_item}>
                    {this.render_modify_exchange_logs(selected_object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2338']/* 'exchange-transfers' */){
            return(
                <div key={selected_item}>
                    {this.render_exchange_transfers_logs(selected_object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2339']/* 'updated-balances' */){
            return(
                <div key={selected_item}>
                    {this.render_update_balance_logs(selected_object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2342']/* 'freeze-unfreeze' */){
            return(
                <div key={selected_item}>
                    {this.render_freeze_unfreeze_logs(selected_object)}
                </div>
            )
        }

        else if(selected_item == this.props.app_state.loc['2066']/* 'modify-moderators' */){
            return(
                <div key={selected_item}>
                    {this.render_modify_moderator_logs(selected_object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2067']/* 'interactable-checkers' */){
            return(
                <div key={selected_item}>
                    {this.render_interactable_checker_logs(selected_object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2068']/* 'interactable-accounts' */){
            return(
                <div key={selected_item}>
                    {this.render_interactable_accounts_logs(selected_object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2069']/* 'block-accounts' */){
            return(
                <div key={selected_item}>
                    {this.render_blocked_accounts_logs(selected_object)}
                </div>
            )
        }

        else if(selected_item == this.props.app_state.loc['2343']/* 'depth-mints' */){
            return(
                <div key={selected_item}>
                    {this.render_depth_mint_logs(selected_object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2447d']/* 'royalty-stagings' */){
            return(
                <div key={selected_item}>
                    {this.render_royalty_payment_staging_information(selected_object)}
                </div>
            )
        }
    }

    get_exchange_tokens(exchange_type){
        return this.props.get_exchange_tokens(exchange_type)
    }

    render_end_main_details_section(selected_object){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-60
        var size = this.props.screensize
        
        var item = this.get_end_data(selected_object);
        // var selected_item = this.props.selected_end_item
        // var selected_object = this.get_exchange_tokens(3)[selected_item]
        var symbol = selected_object['ipfs'] == null ? this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[selected_object['id']] : selected_object['ipfs'].entered_symbol_text
        var author = selected_object['event'] != null ? this.get_senders_name(selected_object['event'].returnValues.p3, selected_object) :this.props.app_state.loc['1591']/* 'Unknown' */
        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 5px 10px', 'padding':'0px 10px 0px 10px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    
                    {this.render_detail_item('7', item['banner-icon'])}
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'title':''+author, 'details':this.props.app_state.loc['2070']/* 'Author */, 'size':'l'})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['token_id'])}
                    <div style={{height:10}}/>
                    {this.render_object_age(selected_object, item)}

                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['570']/* 'Access Rights' */, 'title':this.get_access_rights_status(selected_object['access_rights_enabled'])})}
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

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['buy_limit']['title'], 'number':item['buy_limit']['n'], 'relativepower':item['buy_limit']['relativepower']})}>
                        {this.render_detail_item('2', item['buy_limit'])}
                    </div>
                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['sell_limit']['title'], 'number':item['sell_limit']['n'], 'relativepower':item['sell_limit']['relativepower']})}>
                        {this.render_detail_item('2', item['sell_limit'])}
                    </div>

                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['exchanges_liquidity']['title'], 'number':item['exchanges_liquidity']['n'], 'relativepower':item['exchanges_liquidity']['relativepower']})}>
                        {this.render_detail_item('2', item['exchanges_liquidity'])}
                    </div>
                    <div style={{height:10}}/>

                    {this.show_exchange_liquidity_chart(item, selected_object, symbol)}

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

                    
                    <div style={{height:10}}/>
                    {this.render_token_cap(selected_object)}


                    {this.render_detail_item('0')}

                    
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['max_supply']['title'], 'number':item['max_supply']['n'], 'relativepower':item['max_supply']['relativepower']})}>
                        {this.render_detail_item('2', item['max_supply'])}
                    </div>

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['wallet_dominance'])}
                    </div>

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['ratio_x']['title'], 'number':item['ratio_x']['n'], 'relativepower':item['ratio_x']['relativepower']})}>
                        {this.render_detail_item('2', item['ratio_x'])}
                    </div>
                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['ratio_y']['title'], 'number':item['ratio_y']['n'], 'relativepower':item['ratio_y']['relativepower']})}>
                        {this.render_detail_item('2', item['ratio_y'])}
                    </div>
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', item['combined_exchange_ratio'])}

                    {this.show_y_aggregate_chart(selected_object, symbol)}
                    <div style={{height:10}}/>

                    {this.render_price_of_token(selected_object)}

                    {this.render_detail_item('0')}

                    {this.show_24_hour_volume_data(selected_object, symbol)}

                    {this.show_transaction_count_chart(selected_object, symbol)}
                    
                    {this.render_detail_item('0')}

                    {this.render_token_liquidity_balance(selected_object, symbol)}

                    {this.render_exchange_balance_proportions(selected_object)}

                    {this.render_last_swap_block(selected_object)}
                    {this.render_last_swap_timestamp(selected_object)}
                    {this.render_last_swap_transaction_count(selected_object)}
                    {this.render_last_entered_contracts_count(selected_object)}
                    <div style={{height:10}}/>
                    {this.render_buy_sell_token_button(selected_object, item)}
                    
                    
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2346']/* 'Transfer some tokens to  a specified account' */, 'title':this.props.app_state.loc['2347']/* 'Transfer' */})}
                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['952']/* 'Your Balance' */, 'number':selected_object['balance'], 'relativepower':symbol})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['952']/* 'Your Balance' */, 'subtitle':this.format_power_figure(selected_object['balance']), 'barwidth':this.calculate_bar_width(selected_object['balance']), 'number':this.format_account_balance_figure(selected_object['balance']), 'barcolor':'', 'relativepower':symbol, })}
                    </div>

                    {this.render_transfer_button(selected_object)}

                    {this.render_auth_modify_button(selected_object)}

                    {this.render_exchange_transfer_button(selected_object)}

                    {this.render_freeze_unfreeze_tokens_button(selected_object)}


                    {this.render_moderator_button(selected_object)}

                    {this.render_edit_object_button(selected_object)}

                    {this.render_depth_tokens_button(selected_object)}

                    {this.render_royalty_staging_page(selected_object)}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_transfer_button(selected_object){
        if(bigInt(selected_object['balance']).equals(bigInt('0'))) return;
        return(
            <div>
                <div style={{height:10}}/>
                <div onClick={()=>this.open_transfer_ui(selected_object)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2347']/* 'Transfer' */, 'action':''},)}
                </div>
            </div>
        )
    }

    render_buy_sell_token_button(selected_object, item){
        if(selected_object['hidden'] == true){
            return;
        }
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2344']/* 'Buy or Sell the token for a specified account' */, 'title':this.props.app_state.loc['2345']/* 'Buy/Sell' */})}
                <div style={{height:10}}/>
                <div onClick={()=>this.open_mint_burn_token_ui(selected_object)}>
                    {this.render_detail_item('5', item['mint_burn_button'])}
                </div>
                {this.render_detail_item('0')}
            </div>
        )
    }

    render_object_age(object, item){
        if(object['id'] != 3){
            return(
                <div>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 0px 5px 0px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    <div style={{ height: 10 }} />
                </div>
            )
        }
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


    render_token_liquidity_balance(selected_object, symbol){
        var buy_exchanges_count = selected_object['data'][3].length
        var is_type_end = false

        if(buy_exchanges_count == 1 && selected_object['data'][3][0] == 0){
            is_type_end = true
        }
        if(selected_object['id'] != 3 && !is_type_end){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2348']/* 'The exchanges balance for each of the tokens used to buy. ' */+symbol, 'title':this.props.app_state.loc['2349']/* 'Buy Token Liquidity' */})}
                    <div style={{height:10}}/>
                    {this.render_buy_token_uis(selected_object)}

                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_access_rights_status(value){
        if(value == true){
            return this.props.app_state.loc['1629']/* 'Enabled' */
        }else{
            return this.props.app_state.loc['1630']/* 'Disabled' */
        }
    }

    render_revoke_author_privelages_event(object){
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        var events = this.get_moderator_item_logs(object, 'revoke_privelages')

        if(object['id'] == 3) return;
        
        if(events.length != 0){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2351']/* 'Author Moderator Privelages Disabled' */, 'details':this.props.app_state.loc['2352']/* 'Author of Object is not a Moderator by default' */, 'size':'l'})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2353']/* 'Author Moderator Privelages Enabled' */, 'details':this.props.app_state.loc['2354']/* 'Author of Object is a Moderator by default' */, 'size':'l'})}
                </div>
            )
        }
    }


    render_price_of_token(selected_object){
        // var selected_item = this.props.selected_end_item
        // var selected_object = this.get_exchange_tokens(3)[selected_item]

        var input_amount = 1
        var input_reserve_ratio = selected_object['data'][2][0]
        var output_reserve_ratio = selected_object['data'][2][1]
        var price = this.calculate_price(input_amount, input_reserve_ratio, output_reserve_ratio, selected_object)
        var buy_tokens = [].concat(selected_object['data'][3])
        var buy_amounts = [].concat(selected_object['data'][4])
        var buy_depths = [].concat(selected_object['data'][5])
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2355']/* 'The amount you get when selling one unit of the token' */, 'title':this.props.app_state.loc['2356']/* 'Token Price' */})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                        {buy_tokens.map((item, index) => (
                            <div style={{'padding': '1px'}}>
                                {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[selected_object['e5']+item], 'subtitle':this.format_power_figure(this.calculate_price_from_sell_action(buy_amounts[index], price)), 'barwidth':this.calculate_bar_width(this.calculate_price_from_sell_action(buy_amounts[index], price)), 'number':this.format_price(this.calculate_price_from_sell_action(buy_amounts[index], price)), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    calculate_price(input_amount, input_reserve_ratio, output_reserve_ratio, selected_object){
        // var selected_item = this.props.selected_end_item
        // var selected_object = this.get_exchange_tokens(3)[selected_item]
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

    format_price(price_value){
        if(price_value > 1000){
            return this.format_account_balance_figure(price_value)
        }
        else{
            let roundedNumber = parseFloat(price_value.toFixed(7));
            return roundedNumber
        }
    }

    open_mint_burn_token_ui(selected_object){
        this.props.open_mint_burn_token_ui(selected_object)
    }

    open_end_transfer_ui(selected_object){
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

    open_moderator_ui(selected_object){
        this.props.open_moderator_ui(selected_object)
    }

    open_royalty_staging_page(selected_object){
        this.props.open_royalty_staging_ui(selected_object)
    }


    render_last_swap_block(selected_object){
        // var selected_item = this.props.selected_end_item
        // var selected_object = this.get_exchange_tokens(3)[selected_item]

        if(selected_object['account_data'][0] != 0){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2357']/* 'Last Swap Block' */, 'title':selected_object['account_data'][0]})}
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    render_last_swap_timestamp(selected_object){
        // var selected_item = this.props.selected_end_item
        // var selected_object = this.get_exchange_tokens(3)[selected_item]

        if(selected_object['account_data'][1] != 0){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2358']/* 'Last Swap Age' */, 'title': this.get_time_difference(selected_object['account_data'][1]) })}
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    render_last_swap_transaction_count(selected_object){
        // var selected_item = this.props.selected_end_item
        // var selected_object = this.get_exchange_tokens(3)[selected_item]

        if(selected_object['account_data'][2] != 0){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2359']/* 'Last Swap Transactions Count' */, 'title':selected_object['account_data'][2]})}
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    render_last_entered_contracts_count(selected_object){
        // var selected_item = this.props.selected_end_item
        // var selected_object = this.get_exchange_tokens(3)[selected_item]

        if(selected_object['account_data'][3] !=0){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2360']/* 'Last Entered Contracts Count' */, 'title':selected_object['account_data'][3]})}
                    <div style={{height:10}}/>
                </div>
            )
        }
    }




    render_auth_modify_button(object){
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        var contract_config = object['data'][1]
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if(object['id'] != 3 && contract_config[9/* exchange_authority */] == my_account){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2361']/* 'Modify Token' */, 'details':this.props.app_state.loc['2362']/* 'Modify the configuration of the exchange directly.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_modify_token_ui(object)}>
                        {this.render_detail_item('5', {'text':'Modify Exchange', 'action':''})}
                    </div>
                </div>
            )
        }
    }

    render_exchange_transfer_button(object){
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        var contract_config = object['data'][1]
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if(object['id'] != 3 && contract_config[9/* exchange_authority */] == my_account && object['data'][0][1/* unlocked_liquidity */] == 1 && object['hidden'] == false){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2363']/* 'Exchange Transfer' */, 'details':this.props.app_state.loc['2364']/* 'Transfer tokens from the exchanges account to a specified target.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_buy_token_uis(object)}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_exchange_transfers_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2365']/* 'Run Transfers' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    render_freeze_unfreeze_tokens_button(object){
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        var contract_config = object['data'][1]
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if(object['id'] != 3 && contract_config[9/* exchange_authority */] == my_account){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2366']/* 'Freeze/Unfreeze Tokens' */, 'details':this.props.app_state.loc['2367']/* 'Freeze or unfreeze a given accounts balance.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_freeze_unfreeze_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2368']/* 'Freeze/Unfreeze' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    render_moderator_button(object){
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if(object['id'] != 3 && (object['moderators'].includes(my_account) || object['event'].returnValues.p3 == my_account)){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2369']/* 'Perform Moderator Actions' */, 'details':this.props.app_state.loc['2406']/* 'Set an accounts access rights, moderator privelages or block an account' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_moderator_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2370']/* 'Perform Action' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    render_royalty_staging_page(object){
        var my_account = this.props.app_state.user_account_id[object['e5']]
        var events = this.get_moderator_item_logs(object, 'revoke_privelages')
        var can_stage_royalty_as_author_moderator = false
        if(object['id'] != 3){
            if(events.length == 0 && object['event'].returnValues.p3 == my_account){
                can_stage_royalty_as_author_moderator = true;
            }
        }
        
        if(object['id'] != 3 && (object['moderators'].includes(my_account) || can_stage_royalty_as_author_moderator)){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2447b']/* 'Stage Royalties.' */, 'details':this.props.app_state.loc['2447c']/* 'Stage payouts to the token-holders.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_royalty_staging_page(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2370']/* 'Perform Action' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }


    render_edit_object_button(object){
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        var my_account = this.props.app_state.user_account_id[object['e5']]

        if(object['id'] != 3 && object['event'].returnValues.p3 == my_account){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2371']/* 'Edit Token Post' */, 'details':this.props.app_state.loc['2372']/* 'Change the basic details for your Token Post' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_basic_edit_token_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2373']/* 'Perform Action' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    open_basic_edit_token_ui(object){
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        this.props.open_edit_object('8', object)
    }

    get_end_data(selected_object){
        // var selected_item = this.props.selected_end_item
        // var selected_object = this.get_exchange_tokens(3)[selected_item]
        var title = selected_object['id'];
        var img = selected_object['img']
        var age = selected_object['event'] == null ? 0 : selected_object['event'].returnValues.p5
        var time = selected_object['event'] == null ? 0 : selected_object['event'].returnValues.p4
        
        var selected_obj_root_config = selected_object['data'][0];
        var selected_obj_config = selected_object['data'][1];
        var selected_obj_ratio_config = selected_object['data'][2];

        var type = selected_obj_root_config[3] == 3 ? this.props.app_state.loc['1808']/* 'Capped' */ : this.props.app_state.loc['1809']/* 'Uncapped' */
        var spend_type = selected_object['data'][0][3/* <3>token_type */] == 3 ? 'END': 'SPEND'
        var is_auth_main_contract = selected_obj_config[9] == 2 ? this.props.app_state.loc['1810']/* '2 (Main Contract)' */: selected_obj_config[9]
        var is_trust_fee_target_main_contract = selected_obj_config[10] == 2 ? this.props.app_state.loc['1810']/* '2 (Main Contract)' */: (selected_obj_config[10] == 0 ? this.props.app_state.loc['2374']/* '0 (Burn Account)' */: selected_obj_config[10])

        if(title == 3){
            // var obj = {'E15':'E15', 'E25':'E25'}
            // title = obj[selected_object['e5']]
            title = selected_object['e5']
        }

        var item = selected_object;
        var active_tags = item['ipfs'] == null ? [''+title, ''+type, 'token'] : [].concat(item['ipfs'].entered_indexing_tags)
        var name = item['ipfs'] == null ? ''+title : item['ipfs'].entered_title_text
        var symbol = item['ipfs'] == null ? ''+spend_type : item['ipfs'].entered_symbol_text
        // if(symbol == null){
        //     symbol = EndImg
        // }
        // var image = item['ipfs'] == null ? img : item['ipfs'].token_image
        var image = img
        if(item['ipfs']!= null){
            if(item['ipfs'].token_image!= null){
                image = this.get_image_from_file(item['ipfs'].token_image)
            }
        }
        var max_supply = this.calculate_maximum_supply(selected_object)
        var wallet_dominance = this.calculate_wallet_dominance(max_supply, selected_object)
        return{
            'tags':{'active_tags':active_tags, 'index_option':'indexed', 'when_tapped':''},
            'banner-icon':{'header':name, 'subtitle':symbol, 'image':image},
            'token_id': {'title':selected_object['e5']+' • '+selected_object['id'], 'details':this.props.app_state.loc['2376']/* 'Token Identifier' */, 'size':'l'},
            'token_type': {'title':this.props.app_state.loc['2377']/* 'Token Type' */, 'details':type, 'size':'l'},
            'age': { 'style': 'l', 'title': this.props.app_state.loc['2378']/* 'Block Number' */, 'subtitle': this.props.app_state.loc['2198']/* 'age' */, 'barwidth': this.get_number_width(age), 'number': `${number_with_commas(age)}`, 'barcolor': '', 'relativepower': `${this.get_time_difference(time)} ago`, },

            'unlocked_supply': {'title':this.props.app_state.loc['679']/* 'Unlocked Supply' */, 'details':this.enabled_disabled(selected_obj_root_config[0]), 'size':'l'},
            'unlocked_liquidity': {'title':this.props.app_state.loc['1815']/* 'Unlocked Liquidity' */, 'details':this.enabled_disabled(selected_obj_root_config[1]), 'size':'l'},
            'fully_custom': {'title':this.props.app_state.loc['1816']/* 'Fully Custom' */, 'details':this.enabled_disabled(selected_obj_root_config[2]), 'size':'l'},

            'buy_limit':{'style':'l','title':this.props.app_state.loc['326']/* 'Buy Limit' */, 'subtitle':this.format_power_figure(selected_obj_config[0]), 'barwidth':this.calculate_bar_width(selected_obj_config[0]), 'number':this.format_account_balance_figure(selected_obj_config[0]), 'relativepower':symbol, 'e':selected_obj_config[0]},
            
            'minimum_transactions_between_swap': {'title':selected_obj_config[2], 'details':this.props.app_state.loc['330']/* 'Minimum Transactions Between Swap' */, 'size':'l'},
            'minimum_blocks_between_swap': {'title':selected_obj_config[3], 'details':this.props.app_state.loc['331']/* 'Minimum Blocks Between Swap' */, 'size':'l'},
            'minimum_time_between_swap': {'title':this.get_time_diff(selected_obj_config[4]), 'details':this.props.app_state.loc['658']/* 'Minimum Time Between Swap' */, 'size':'l'},
            
            'trust_fee_proportion': {'title':this.format_proportion(selected_obj_config[7]), 'details':this.props.app_state.loc['660']/* 'Trust Fee' */, 'size':'l'},
            'exchange_authority': {'title':this.props.app_state.loc['1818']/* 'Authority: ' */+is_auth_main_contract, 'details':this.props.app_state.loc['1819']/* 'Exchange Authority Identifier' */, 'size':'l'},
            'trust_fee_target': {'title':this.props.app_state.loc['1820']/* 'Target: ' */+is_trust_fee_target_main_contract, 'details':this.props.app_state.loc['1821']/*Trust Fee Target Identifier' */, 'size':'l'},

            'sell_limit':{'style':'l','title':this.props.app_state.loc['328']/* 'Sell Limit' */, 'subtitle':this.format_power_figure(selected_obj_config[11]), 'barwidth':this.calculate_bar_width(selected_obj_config[11]), 'number':this.format_account_balance_figure(selected_obj_config[11]), 'relativepower':symbol, 'n':selected_obj_config[11]},

            'minimum_entered_contracts_between_swap': {'title':selected_obj_config[13], 'details':this.props.app_state.loc['332']/* 'Minimum Entered Contracts Between Swap' */, 'size':'l'},
            'minimum_transactions_for_first_buy': {'title':selected_obj_config[17], 'details':this.props.app_state.loc['333']/* 'Minimum Transactions For First Buy' */, 'size':'l'},
            'minimum_entered_contracts_for_first_buy': {'title':selected_obj_config[18], 'details':this.props.app_state.loc['334']/* 'Minimum Entered Contracts For First Buy' */, 'size':'l'},

            'ratio_x':{'style':'l','title':this.props.app_state.loc['395']/* 'Exchange Ratio X' */, 'subtitle':this.format_power_figure(selected_obj_ratio_config[0]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[0]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[0]), 'relativepower':'', 'n':selected_obj_ratio_config[0]},
            'ratio_y':{'style':'l','title':this.props.app_state.loc['396']/* 'Exchange Ratio Y' */, 'subtitle':this.format_power_figure(selected_obj_ratio_config[1]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[1]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[1]), 'relativepower':'', 'n':selected_obj_ratio_config[1]},
            'combined_exchange_ratio': {'title':this.format_exchange_ratio(selected_obj_ratio_config[0], selected_obj_ratio_config[1]), 'details':this.props.app_state.loc['712']/* 'Exchange Ratio X:Y' */, 'size':'l'},

            'exchanges_liquidity':{'style':'l','title':this.props.app_state.loc['2379']/* 'Exchanges Liquidity' */, 'subtitle':this.format_power_figure(selected_obj_ratio_config[2]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[2]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[2]), 'relativepower':symbol, 'n':selected_obj_ratio_config[2]},
            'mint_burn_button':{'text':this.props.app_state.loc['2380']/* 'Buy/Sell Token' */, 'action':''},
            
            'max_supply':{'style':'l','title':this.props.app_state.loc['2381']/* 'Tokens Total Supply' */, 'subtitle':this.format_power_figure(max_supply), 'barwidth':this.calculate_bar_width(max_supply), 'number':this.format_account_balance_figure(max_supply), 'relativepower':symbol, 'n':max_supply},
            
            'wallet_dominance':{'style':'l','title':this.props.app_state.loc['2447a']/* 'Wallet Dominance' */, 'subtitle':this.format_power_figure(wallet_dominance), 'barwidth':this.calculate_bar_width(wallet_dominance), 'number':(wallet_dominance)+'%', 'relativepower':this.props.app_state.loc['1881']/* proportion */},
            '':{},
            '':{},
            '':{},

        }
    }

    calculate_wallet_dominance(max_supply, object){
        var my_balance = object['balance'];
        if(my_balance == 0) return 0
        var percentage = (my_balance * 100) / max_supply
        return percentage
    }

    calculate_maximum_supply(object){
        if(object['id'] == 3) return bigInt('1e72');
        var total = object['ipfs'].token_exchange_liquidity_total_supply <= 100_000 ? 1_000_000_000 : object['ipfs'].token_exchange_liquidity_total_supply
        var set_max_supply = bigInt(total)
        var items = [].concat(this.get_item_logs(object, 'depth_mint'))
        var depthminted_amount = 0;
        items.forEach(item => {
            var amount = bigInt(item.returnValues.p5)
            depthminted_amount = bigInt(depthminted_amount).add(amount)
        });

        var final_max_supply = bigInt(depthminted_amount).add(set_max_supply)
        return final_max_supply
    }

    render_token_cap(selected_object){
        var max_supply = this.calculate_maximum_supply(selected_object)
        var input_amount = 1
        var input_reserve_ratio = selected_object['data'][2][0]
        var output_reserve_ratio = selected_object['data'][2][1]
        var price = this.calculate_price(input_amount, input_reserve_ratio, output_reserve_ratio, selected_object)
        var buy_tokens = [].concat(selected_object['data'][3])
        var buy_amounts = [].concat(selected_object['data'][4])
        var buy_depths = [].concat(selected_object['data'][5])

        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2382']/* 'The Market Capitalization of the token in its respective denominations.' */, 'title':this.props.app_state.loc['2383']/* 'Token Market Cap' */})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                        {buy_tokens.map((item, index) => (
                            <div style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[selected_object['e5']+item], 'number':this.calculate_total_cap_amount(buy_amounts[index], price, max_supply), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                                {this.render_detail_item('2', {'style':'l',
                                'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[selected_object['e5']+item], 'subtitle':this.format_power_figure(this.calculate_total_cap_amount(buy_amounts[index], price, max_supply)), 'barwidth':this.calculate_bar_width(this.calculate_total_cap_amount(buy_amounts[index], price, max_supply)), 'number':this.format_price(this.calculate_total_cap_amount(buy_amounts[index], price, max_supply)), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    calculate_total_cap_amount(buy_amounts, price, cap){
        var price_per_unit = this.calculate_price_from_sell_action(buy_amounts, price)
        var powered_cap =  (Math.round(price_per_unit * cap)).toString().toLocaleString('fullwide', {useGrouping:false})
        return bigInt(powered_cap)
    }


    render_buy_token_uis(selected_object){
        // var selected_item = this.props.selected_end_item
        // var selected_object = this.get_exchange_tokens(3)[selected_item]
        var buy_tokens = [].concat(selected_object['data'][3])
        var buy_amounts = [].concat(selected_object['exchanges_balances'])
        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                    {buy_tokens.map((item, index) => (
                        <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[selected_object['e5']+item], 'number':buy_amounts[index], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                            {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[selected_object['e5']+item], 'subtitle':this.format_power_figure(buy_amounts[index]), 'barwidth':this.calculate_bar_width(buy_amounts[index]), 'number':this.format_account_balance_figure(buy_amounts[index]), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
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


    render_depth_tokens_button(object){
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        var contract_config = object['data'][1]
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if(object['id'] != 3 && contract_config[9/* exchange_authority */] == my_account && object['data'][0][0/* <0>unlocked_supply */] == 1){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2384']/* 'Depth-Mint Tokens' */, 'details':this.props.app_state.loc['2385']/* 'Mint your token from outside its exchange.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_depth_mint_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2386']/* 'Depth-Mint' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    open_depth_mint_ui(selected_object){
        this.props.show_depthmint_bottomsheet(selected_object)
    }


    render_exchange_balance_proportions(selected_object){
        if(selected_object['ipfs'] == null) return;
        var original_exchange_ratio_y = selected_object['ipfs'].token_exchange_ratio_y
        var current_exchange_ratio_y = selected_object['data'][2][1/* <1>token_exchange_ratio_y */];
        var difference = bigInt(current_exchange_ratio_y).minus(original_exchange_ratio_y)
        if(difference.isPositive()){
            var buy_tokens = [].concat(selected_object['data'][3])
            var exchange_balances = [].concat(selected_object['exchanges_balances'])
            var expected_balances = this.get_expected_balances(selected_object['data'][4],difference)
            var proportion_differences = this.get_proportion_differences(expected_balances, exchange_balances)

            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2447g']/* 'Exchange Liquidity Proportions.' */, 'details':this.props.app_state.loc['2447h']/* 'Proportions of the exchange\'s balances that have not been transfered out by its moderators.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                            {buy_tokens.map((item, index) => (
                                <li style={{'padding': '1px'}}>
                                    {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[selected_object['e5']+item], 'subtitle':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item], 'barwidth':(proportion_differences)+'%', 'number':(proportion_differences)+'%', 'relativepower':this.props.app_state.loc['996e']/* 'proportion' */})}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_expected_balances(prices, difference){
        var data = []
        prices.forEach(price => {
            data.push(bigInt(price).multiply(difference))
        });
        return data
    }

    get_proportion_differences(expected_balances, actual_balances){
        var data = []
        for(var i=0; i<expected_balances.length; i++){
            var expected_balance = expected_balances[i]
            var actual_balance = actual_balances[i]

            data.push(bigInt(actual_balance).multiply(100).divide(expected_balance))
        }
        return data
    }


    get_image_from_file(ecid){
        if(!ecid.startsWith('image')) return ecid
        var ecid_obj = this.get_cid_split(ecid)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        if(data == null) return
return data['data']
    }

    get_cid_split(ecid){
        var split_cid_array = ecid.split('_');
        var filetype = split_cid_array[0]
        var cid_with_storage = split_cid_array[1]
        var cid = cid_with_storage
        var storage = 'ch'
        if(cid_with_storage.includes('.')){
            var split_cid_array2 = cid_with_storage.split('.')
            cid = split_cid_array2[0]
            storage = split_cid_array2[1]
        }

        return{'filetype':filetype, 'cid':cid, 'storage':storage, 'full':ecid}
    }



    show_24_hour_volume_data(selected_object, symbol){
        var exchange_ratio_events = selected_object['exchange_ratio_data']
        if(exchange_ratio_events.length != 0){
            var average_volume = this.get_average_trading_volume(exchange_ratio_events)
            var selected_item = this.get_selected_item(this.state.trading_volume_chart_tags_object, 'e')
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2447i']/* 'Trading Volume' */, 'details':this.props.app_state.loc['2388']/* 'Chart containing the trading volume of ' */+ symbol+this.props.app_state.loc['2389']/* ' over time.' */, 'size':'l'})}

                    {this.render_detail_item('6', {'dataPoints':this.get_trading_volume_data_points(exchange_ratio_events, selected_object), 'interval':110, 'hide_label': true})}
                    <div style={{height: 10}}/>

                    <Tags font={this.props.app_state.font} page_tags_object={this.state.trading_volume_chart_tags_object} tag_size={'l'} when_tags_updated={this.when_trading_volume_chart_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2447k']/* 'Y-Axis: Volume' */, 'details':this.props.app_state.loc['2391']/* 'X-Axis: Time' */, 'size':'s'})}

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':selected_item+' '+this.props.app_state.loc['2447l']/* 'trading volume average.' */, 'number':average_volume, 'relativepower':symbol})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':selected_item+' '+this.props.app_state.loc['2447l']/* 'trading volume average.' */, 'subtitle':this.format_power_figure(average_volume), 'barwidth':this.calculate_bar_width(average_volume), 'number':this.format_account_balance_figure(average_volume), 'barcolor':'', 'relativepower':symbol, })}
                    </div>
                </div>
            )
        }
    }

    when_trading_volume_chart_tags_object_updated(tag_obj){
        this.setState({trading_volume_chart_tags_object: tag_obj})
    }

    get_trading_volume_data_points(event_data, selected_object){
        var events = this.filter_exchange_ratio_events(event_data, this.state.trading_volume_chart_tags_object, false);
        var data = []
        var largest_number = bigInt(0)
        for(var i=0; i<events.length; i++){
            var amount = events[i].returnValues.p8/* amount */
            data.push(amount)
            if(largest_number.lesser(amount)) largest_number = bigInt(amount)

            if(i==events.length-1){
                var diff = Date.now()/1000 - events[i].returnValues.p9
                for(var t=0; t<diff; t+=(61*2650)){
                    data.push(data[data.length-1])      
                }
            }
            else{
                var diff = events[i+1].returnValues.p9 - events[i].returnValues.p9
                for(var t=0; t<diff; t+=(61*2650)){
                    data.push(data[data.length-1])      
                }
            }  
        }



        // data = data.slice(Math.floor(data.length * this.props.app_state.graph_slice_proportion))


        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;

        var recorded = false;
        for(var i = 0; i < noOfDps; i++) {
            if(largest_number == 0) yVal = 0
            else yVal = parseInt(bigInt(data[factor * xVal]).multiply(100).divide(largest_number))
            
            if(yVal != null && data[factor * xVal] != null){
                // if(i == 76){
                if(i%(Math.round(noOfDps/5)) == 0 && i != 0 && !recorded){
                    // recorded = true
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

    get_trading_volume_interval_figure(events){
        var data = []
        events.forEach(event => {
            data.push(bigInt(event.returnValues.p8/* amount */))
        });
        var largest = Math.max.apply(Math, data);
        return largest
    }

    get_average_trading_volume(event_data){
        var events = this.filter_exchange_ratio_events(event_data, this.state.trading_volume_chart_tags_object, false);
        if(events.length == 0) return bigInt(0)
        var total = bigInt(0)
        events.forEach(event => {
            total = total.plus(bigInt(event.returnValues.p8/* amount */))
        });
        return total.divide(events.length)
    }







    


    show_y_aggregate_chart(selected_object, symbol){
        var exchange_ratio_events = selected_object['exchange_ratio_data']
        if(exchange_ratio_events.length != 0){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2387']/* 'Y-Aggregate' */, 'details':this.props.app_state.loc['2388']/* 'Chart containing the y-aggregate of ' */+ symbol+this.props.app_state.loc['2389']/* ' over time.' */, 'size':'l'})}
                    {this.render_detail_item('6', {'dataPoints':this.get_exchange_ratio_data_points(exchange_ratio_events, selected_object), 'interval':this.get_exchange_ratio_interval_figure(exchange_ratio_events, selected_object)})}
                    <div style={{height: 10}}/>

                    <Tags font={this.props.app_state.font} page_tags_object={this.state.y_aggregate_chart_tags_object} tag_size={'l'} when_tags_updated={this.when_y_aggregate_chart_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2390']/* 'Y-Axis: Y-aggregate' */, 'details':this.props.app_state.loc['2391']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    {this.render_chart_changes(exchange_ratio_events, selected_object)}
                </div>
            )
        }
    }

    render_chart_changes(event_data, selected_object){
        var data = this.get_chart_change(event_data, selected_object)
        if(data['1h'] == 0 && data['24h'] == 0 && data['7d'] == 0) return;
        return(
            <div>
                <div style={{'background-color': this.props.theme['view_group_card_item_background'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">{this.props.app_state.loc['2447m']/* 'Price Change over time.' */}</p>

                    {this.render_chart_item(data, '1h')}
                    {this.render_chart_item(data, '24h')}
                    {this.render_chart_item(data, '7d')}
                </div>
            </div>
        )
    }

    render_chart_item(data, identifier){
        if(data[identifier] != 0){
            return(
                <div>
                    {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':(data[identifier] < 0 ? data[identifier]* -1 : data[identifier])+'%', 'number':(data[identifier]+'%'), 'relativepower':identifier, })}
                </div>
            )
        }
    }

    round_off(float_number){
        return (Math.round(float_number * 100) / 100)
    }

    when_y_aggregate_chart_tags_object_updated(tag_obj){
        this.setState({y_aggregate_chart_tags_object: tag_obj})
    }

    get_chart_change(event_data, selected_object){
        var events = []
        var cutoff_time = Date.now()/1000 - (60*60*24*7)
        event_data.forEach(event => {
            if(event.returnValues.p9 > cutoff_time){
                events.push(event)
            }
        });

        if(events.length == 0 && event_data.length != 0){
            events.push(event_data[event_data.length-1])
        }

        var data = []
        var times = []
        for(var i=0; i<events.length; i++){
            var input_amount = 1
            var input_reserve_ratio = events[i].returnValues.p5/* exchange_ratio_x */
            var output_reserve_ratio = events[i].returnValues.p6/* exchange_ratio_y */
            var price = this.calculate_price(input_amount, input_reserve_ratio, output_reserve_ratio, selected_object)
            if(price < 1){
                data.push(Math.round(price * 100000) / 100000)
            }else{
                data.push(parseInt(price))
            }
            times.push(parseInt(events[i].returnValues.p9))

            if(i==events.length-1){
                var diff = Date.now()/1000 - events[i].returnValues.p9
                for(var t=0; t<diff; t+=60){
                    data.push(data[data.length-1]) 
                    times.push(parseInt(events[i].returnValues.p9)+t)     
                }
            }
            else{
                var diff = events[i+1].returnValues.p9 - events[i].returnValues.p9
                for(var t=0; t<diff; t+=60){
                    data.push(data[data.length-1])
                    times.push(parseInt(events[i].returnValues.p9)+t)     
                }
            } 
        }

        const now = Math.floor(Date.now() / 1000); // Current time in seconds
        const target_1h = now - (60*60);
        const target_24h = now - (60*60*24);
        const target_7d = now - (60*60*24*7);
        const record_age = times[0] - now

        var pos_1h = record_age > target_1h ? this.find_valid_timestamp_for_selected_age(data, target_1h) : 0;
        var pos_24h = record_age > target_24h ? this.find_valid_timestamp_for_selected_age(data, target_24h) : 0;
        var pos_7d = record_age > target_7d ? this.find_valid_timestamp_for_selected_age(data, target_7d) : 0;

        const current_price = data[data.length - 1]
        var p_1h  = ((current_price - data[pos_1h]) / current_price) * 100
        var p_24h  = ((current_price - data[pos_24h]) / current_price) * 100
        var p_7d  = ((current_price - data[pos_7d]) / current_price) * 100

        return {'1h': this.round_off(p_1h), '24h':this.round_off(p_24h), '7d':this.round_off(p_7d)}
    }

    find_valid_timestamp_for_selected_age(timestamps, target) {
        let left = 0, right = timestamps.length - 1;
        let result = -1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (timestamps[mid] <= target) {
                result = mid; // Store candidate
                left = mid + 1; // Search for a later timestamp
            } else {
                right = mid - 1;
            }
        }

        return result !== -1 ? result : 0; // Return found timestamp or null if none
    }

    get_exchange_ratio_data_points(event_data, selected_object){
        var events = this.filter_exchange_ratio_events(event_data, this.state.y_aggregate_chart_tags_object, true);
        var data = []
        for(var i=0; i<events.length; i++){
            var input_amount = 1
            var input_reserve_ratio = events[i].returnValues.p5/* exchange_ratio_x */
            var output_reserve_ratio = events[i].returnValues.p6/* exchange_ratio_y */
            var price = this.calculate_price(input_amount, input_reserve_ratio, output_reserve_ratio, selected_object)
            if(price < 1){
                data.push(Math.round(price * 100000) / 100000)
            }else{
                data.push(parseInt(price))
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


        // data = data.slice(Math.floor(data.length * this.props.app_state.graph_slice_proportion))

        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[factor * xVal]
            var indicator = yVal > 1000 ? this.format_account_balance_figure(yVal) : yVal
            // yVal = data[i]
            if(yVal != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel:""+indicator});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            } 
        }

        return dps
    }

    get_exchange_ratio_interval_figure(events, selected_object){
        var data = []
        events.forEach(event => {
            var input_amount = 1
            var input_reserve_ratio = event.returnValues.p5/* exchange_ratio_x */
            var output_reserve_ratio = event.returnValues.p6/* exchange_ratio_y */
            var price = this.calculate_price(input_amount, input_reserve_ratio, output_reserve_ratio, selected_object)
            data.push(price)
        });
        var largest = Math.max.apply(Math, data);
        return largest
    }

    filter_exchange_ratio_events(events, tags, add_if_empty){
        var selected_item = this.get_selected_item(tags, 'e')

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
        var data = []
        var cutoff_time = Date.now()/1000 - filter_value
        events.forEach(event => {
            if(event.returnValues.p9 > cutoff_time){
                data.push(event)
            }
        });

        if(data.length == 0 && events.length != 0 && add_if_empty == true){
            data.push(events[events.length-1])
        }

        return data
    }







    show_transaction_count_chart(selected_object, symbol){
        var exchange_ratio_events = selected_object['exchange_ratio_data']
        var amount = exchange_ratio_events.length;

        if(exchange_ratio_events.length != 0){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2392']/* 'Total Transactions' */, 'details':this.props.app_state.loc['2393']/* `Chart containing the total number of buy/sell transactions over time.` */, 'size':'l'})}
                    {this.render_detail_item('6', {'dataPoints':this.get_transaction_count_data_points(exchange_ratio_events), 'interval':this.get_transaction_count_interval_figure(exchange_ratio_events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2394']/* 'Y-Axis: Total Transactions' */, 'details':this.props.app_state.loc['2391']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2395']/* 'Total Transactions' */, 'number':amount, 'relativepower':this.props.app_state.loc['665']/* 'transactions' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2395']/* 'Total Transactions' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['665']/* 'transactions' */, })}
                    </div>
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
                    for(var t=0; t<diff; t+=(60*100)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p9 - events[i].returnValues.p9
                    for(var t=0; t<diff; t+=(60*100)){
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

    get_lowest_transaction_count_figure(events){
        var data = []
        events.forEach(event => {
            data.push(bigInt(event.returnValues.p3))
        });
        var largest = Math.min.apply(Math, data);
        return largest
    }










    show_exchange_liquidity_chart(item, selected_object, symbol){
        // var selected_object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        var total_supply = selected_object['data'][2][2]
        var exchange_ratio_events = selected_object['exchange_ratio_data']
        var amount = total_supply
        if(exchange_ratio_events.length > 72 && selected_object['id'] != 3){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2396']/* 'Exchange Liquidity' */, 'details':this.props.app_state.loc['2397']/* `Chart containing the total supply of ` */ +symbol+this.props.app_state.loc['2398']/* ` in the exchange over time.` */, 'size':'l'})}
                    {this.render_detail_item('6', {'dataPoints':this.get_exchange_liquidity_data_points(exchange_ratio_events), 'interval':110})}
                    <div style={{height: 10}}/>
                    {/* <Tags font={this.props.app_state.font} page_tags_object={this.state.total_supply_chart_tags_object} tag_size={'l'} when_tags_updated={this.when_total_supply_chart_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    <div style={{height: 10}}/> */}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2399']/* 'Y-Axis: Exchange Liquidity' */, 'details':this.props.app_state.loc['2391']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2396']/* 'Exchange Liquidity' */, 'number':amount, 'relativepower':this.props.app_state.loc['665']/* 'transactions' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2396']/* 'Exchange Liquidity' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['665']/* 'transactions' */, })}
                    </div>
                </div>
            )  
        }       
    }

    get_exchange_liquidity_data_points(events){
        // var events = this.filter_proportion_ratio_events(event_data);
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                data.push(bigInt(events[i].returnValues.p4))

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p9
                    for(var t=0; t<diff; t+=(60*100)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p9 - events[i].returnValues.p9
                    for(var t=0; t<diff; t+=(60*100)){
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
        var largest_number = this.get_exchange_liquidity_interval_figure(events)
        for(var i = 0; i < noOfDps; i++) {
            if(data[factor * xVal] != null){
                yVal = parseInt(bigInt(data[factor * xVal]).multiply(100).divide(largest_number))
                // yVal = data[factor * xVal]
                // yVal = data[i]
                if(yVal != null && data[factor * xVal] != null){
                    if(i%(Math.round(noOfDps/3)) == 0 && i != 0){
                        dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(data[factor * xVal])});//
                    }else{
                        dps.push({x: xVal, y: yVal});//
                    }
                    xVal++;
                }
            }
        }


        return dps
    }

    get_exchange_liquidity_interval_figure(events){
        var data = []
        events.forEach(event => {
            data.push(bigInt(event.returnValues.p4))
        });
        var largest = Math.max.apply(Math, data);
        return largest
    }

    get_exchange_liquidity_supply_figure(events){
        var data = []
        events.forEach(event => {
            data.push(bigInt(event.returnValues.p4))
        });
        var largest = Math.min.apply(Math, data);
        return largest
    }










    render_royalty_payment_staging_information(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2407']/* 'In Exchange '  */+ object['id'], 'details': this.props.app_state.loc['2447e']/* 'Exchange Royalty Payment Stagings.' */, 'size': 'l' })}
                    </div>
                    
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                    {this.render_royalty_staging_item_logs(object)}
                </div>
            </div>
        )
    }


    render_royalty_staging_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.get_royalty_payout_logs(object))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
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
        } else {
            return (
                <div style={{  }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index}>
                                    {this.render_royalty_staging_event_item(item, object)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    get_royalty_payout_logs(object) {
        if (this.props.app_state.token_royalty_data_staging_data[object['id']] == null) {
            return []
        }
        return this.props.app_state.token_royalty_data_staging_data[object['id']]
    }


    render_royalty_staging_event_item(item, object){
        var title = item['payout_title']
        var date_time = (this.props.app_state.loc['2447f']/* Scheduled for:  */+(new Date(item['payout_start_timestamp']*1000)))
        return(
            <div onClick={() => this.props.view_royalty_staging(item, object)}>
                {this.render_detail_item('3', {'size':'l', 'details':date_time, 'title':title})}
            </div>
        )
    }
    













    render_updated_exchange_ratio_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2407']/* 'In Exchange '  */+ object['id'], 'details': this.props.app_state.loc['2408']/* 'Updated Exchange Ratio Events' */, 'size': 'l' })}
                    </div>
                    
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
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
        var items = [].concat(this.get_item_logs(object, 'exchange_ratio'))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
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
        } else {
            return (
                <div style={{  }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index}>
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
        var action_obj = {'0':this.props.app_state.loc['2409']/* 'Buy' */, '1':this.props.app_state.loc['2410']/* 'Sell' */}
        var action = action_obj[item.returnValues.p2]
        var token_exchange_liquidity = item.returnValues.p4
        var updated_exchange_ratio_x = item.returnValues.p5
        var updated_exchange_ratio_y = item.returnValues.p6
        var parent_tokens_balance = item.returnValues.p7
        var amount = item.returnValues.p8
        if (this.state.selected_exchange_ratio_event_item == index) {
            return (
                <div>
                    <div onClick={() => this.when_exchange_ratio_item_clicked(index)}>
                        {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2400']/* 'Swapping Account ID' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': action, 'details': this.props.app_state.loc['2400']/* 'Action' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2401']/* 'Amount Swapped' */, 'number':amount, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1]})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2401']/* 'Amount Swapped' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], })}
                    </div>
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2402']/* 'Updted Token Exchange Liquidity' */, 'number':token_exchange_liquidity, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1]})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2402']/* 'Updted Token Exchange Liquidity' */, 'subtitle': this.format_power_figure(token_exchange_liquidity), 'barwidth': this.calculate_bar_width(token_exchange_liquidity), 'number': this.format_account_balance_figure(token_exchange_liquidity), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], })}
                    </div>
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2403']/* 'Updated Exchange Ratio X' */, 'number':updated_exchange_ratio_x, 'relativepower':this.props.app_state.loc['92']/* 'units' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2403']/* 'Updated Exchange Ratio X' */, 'subtitle': this.format_power_figure(updated_exchange_ratio_x), 'barwidth': this.calculate_bar_width(updated_exchange_ratio_x), 'number': this.format_account_balance_figure(updated_exchange_ratio_x), 'barcolor': '', 'relativepower': this.props.app_state.loc['92']/* 'units' */, })}
                    </div>
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2404']/* 'Updated Exchange Ratio Y' */, 'number':updated_exchange_ratio_y, 'relativepower':this.props.app_state.loc['92']/* 'units' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2404']/* 'Updated Exchange Ratio Y' */, 'subtitle': this.format_power_figure(updated_exchange_ratio_y), 'barwidth': this.calculate_bar_width(updated_exchange_ratio_y), 'number': this.format_account_balance_figure(updated_exchange_ratio_y), 'barcolor': '', 'relativepower': this.props.app_state.loc['92']/* 'units' */, })}
                    </div>
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', {'title':this.format_exchange_ratio(updated_exchange_ratio_x, updated_exchange_ratio_y), 'details':this.props.app_state.loc['2405']/* 'Updated Exchange Ratios X:Y' */, 'size':'l'},)}
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p9), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p10, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div onClick={() => this.when_exchange_ratio_item_clicked(index)}>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.format_account_balance_figure(amount)+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], 'size': 'l' })}
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
    render_transfer_logs(object){
        var he = this.props.height - 45
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2407']/* 'In Exchange '  */+ object['id'], 'details': this.props.app_state.loc['2412']/* 'Your Transfer Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                    {this.render_contract_transfer_item_logs(object)}
                </div>
            </div>
        )
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
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
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
        } else {
            return (
                <div style={{  }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index}>
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
        number = this.get_actual_number(number, depth)
        var from_to = item['action'] == 'Sent' ? this.props.app_state.loc['2419']/* 'To: ' */+this.get_sender_title_text(item['event'].returnValues.p3, object) : this.props.app_state.loc['2420']/* 'From: ' */+this.get_sender_title_text(item['event'].returnValues.p2, object)
        if (this.state.selected_contract_transfer_event_item == index) {
            return (
                <div>
                    <div onClick={() => this.when_contract_transfer_item_clicked(index)}>
                        {this.render_detail_item('3', { 'title': from_to, 'details': this.props.app_state.loc['2413']/* 'Action: ' */+item['action'], 'size': 'l' })}
                    </div>
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+exchange_id], 'number':number, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id]})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+exchange_id], 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], })}
                    </div>

                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item['event'].returnValues.p5), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item['event'].returnValues.p6, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div onClick={() => this.when_contract_transfer_item_clicked(index)}>
                    {this.render_detail_item('3', { 'title': from_to, 'details': this.format_account_balance_figure(number)+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], 'size': 'l' })}
                </div>
            )
        }
    }

    get_actual_number(number, depth){
        var p = (bigInt(depth).times(72)).toString().toLocaleString('fullwide', {useGrouping:false})
        var depth_vaule = bigInt(('1e'+p))
        return (bigInt(number).times(depth_vaule)).toString().toLocaleString('fullwide', {useGrouping:false})
    }













    render_modify_exchange_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2407']/* 'In Exchange ' */ + object['id'], 'details': this.props.app_state.loc['2414']/* 'Exchange Modification Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
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
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
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
        } else {
            return (
                <div style={{  }}>
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
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': this.props.app_state.loc['2415']/* 'Modifier' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_target_identifier(item), 'details': this.props.app_state.loc['2416']/* 'Targeted Modify Item' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.get_value_ui(item, object)}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['2198']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p7, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_target_identifier(item), 'details': this.props.app_state.loc['2416']/* 'Targeted Modify Item' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                </div>
            )
        }
    }

    get_target_identifier(item) {
        var obj = this.get_contract_modify_details()

        var target_array_pos = item.returnValues.p3
        var target_array_item = item.returnValues.p4

        if(target_array_pos == 4/* contract_entry_amounts */){
            return 'price'
        }
        var selected_key = ''
        for (let key in obj) {
            if (obj[key]['position'][0] == target_array_pos && obj[key]['position'][1] == target_array_item) {
                selected_key = key
                break;
            }
        }

        return selected_key
    }

    get_value_ui(item, object) {
        var identifier = this.get_target_identifier(item)
        var number = item.returnValues.p5
        
        var target_array_pos = item.returnValues.p3
        var target_array_item = item.returnValues.p4

        var type = identifier == 'price' ? 'number' : this.get_contract_modify_details()[identifier]['picker']
        var exchange = object['data']
        var exchange_id = exchange[3][target_array_item]

        var title = identifier == 'price' ? this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+exchange_id] : identifier

        if (type == 'proportion') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.format_proportion(number), 'details': this.props.app_state.loc['1013']/* 'proportion' */, 'size': 'l' })}
                </div>
            )
        }
        else if (type == 'time') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_time_diff(number), 'details': this.props.app_state.loc['1014']/* 'duration' */, 'size': 'l' })}
                </div>
            )
        }
        else if (type == 'number') {
            return (
                <div>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':title, 'number':number, 'relativepower':this.props.app_state.loc['1430']/* 'units' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': title, 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': this.props.app_state.loc['1430']/* 'units' */, })}
                    </div>
                </div>
            )
        }
        else if (type == 'tag') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_tag_selected_item(identifier, number), 'details': this.props.app_state.loc['1883']/* 'value: ' */ + number, 'size': 'l' })}
                </div>
            )
        }
        else if (type == 'id') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': number, 'details': this.props.app_state.loc['2417']/* 'target ID' */, 'size': 'l' })}
                </div>
            )
        }
    }

    get_tag_selected_item(title, number) {
        var obj = { 'Auto Wait': { 0: 'no', 1: 'yes' }, 'Moderator Modify Privelage': { 1: 'modifiable', 0: 'non-modifiable' }, 'Unlimited Extend Contract Time': { 1: 'enabled', 0: 'disabled' }, 'Bounty Limit Type': { 0: 'relative', 1: 'absolute' }, 'Force Exit Enabled': { 1: 'enabled', 0: 'disabled' }, 'Halving type': { 0: 'fixed', 1: 'spread' }, 'Block Limit Sensitivity': { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' } }

        obj[this.props.app_state.loc['73']]/* 'Auto Wait' */ = {0:'no', 1:'yes'}
        obj[this.props.app_state.loc['75']]/* 'Moderator Modify Privelage' */ = {1:'modifiable', 0:'non-modifiable'} 
        obj[this.props.app_state.loc['76']]/* 'Unlimited Extend Contract Time' */ = {1:'enabled', 0:'disabled'} 
        obj[this.props.app_state.loc['78']]/* 'Bounty Limit Type' */ = {0:'relative', 1:'absolute'}
        obj[this.props.app_state.loc['79']]/* 'Force Exit Enabled' */ = {1:'enabled', 0:'disabled'} 
        obj[this.props.app_state.loc['336']]/* 'Halving type' */ = {0:'fixed', 1:'spread'} 
        obj[this.props.app_state.loc['341']]/* 'Block Limit Sensitivity' */ = {1:'1', 2:'2', 3:'3', 4:'4', 5:'5'}


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

        obj[this.props.app_state.loc['326']]/* 'Buy Limit' */ = {'position':[1,0], 'picker':'number', 'powerlimit':63}
        obj[this.props.app_state.loc['327']]/* 'Trust Fee' */ = {'position':[1,7], 'picker':'proportion', 'powerlimit':9}
        obj[this.props.app_state.loc['328']]/* 'Sell Limit' */ = {'position':[1,11], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['329']]/* 'Minimum Time Between Swap' */ = {'position':[1,4], 'picker':'time', 'powerlimit':63}
        obj[this.props.app_state.loc['330']]/* 'Minimum Transactions Between Swap' */ = {'position':[1,2], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['331']]/* 'Minimum Blocks Between Swap' */ = {'position':[1,3], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['332']]/* 'Minimum Entered Contracts Between Swap' */ = {'position':[1,13], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['333']]/* 'Minimum Transactions For First Buy' */ = {'position':[1,17], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['334']]/* 'Minimum Entered Contracts For First Buy' */ = {'position':[1,18], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['335']]/* 'Block Limit' */ = {'position':[1,1], 'picker':'number', 'powerlimit':63}
        obj[this.props.app_state.loc['336']]/* 'Halving type' */ = {'position':[1,15], 'picker':'tag', 'powerlimit':63}
        obj[this.props.app_state.loc['337']]/* 'Maturity Limit' */ = {'position':[1,16], 'picker':'number', 'powerlimit':63}
        obj[this.props.app_state.loc['338']]/* 'Internal Block Halving Proportion' */ = {'position':[1,5], 'picker':'proportion', 'powerlimit':9} 
        obj[this.props.app_state.loc['339']]/* 'Block Limit Reduction Proportion' */ = {'position':[1,6], 'picker':'proportion', 'powerlimit':9} 
        obj[this.props.app_state.loc['340']]/* 'Block Reset Limit' */ = {'position':[1,8], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['341']]/* 'Block Limit Sensitivity' */ = {'position':[1,12], 'picker':'tag', 'powerlimit':63} 
        obj[this.props.app_state.loc['395']]/* 'Exchange Ratio X' */ = {'position':[2,0], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['396']]/* 'Exchange Ratio Y' */ = {'position':[2,1], 'picker':'number', 'powerlimit':63}

        
        return obj
    }













    render_exchange_transfers_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2407']/* 'In Exchange ' */ + object['id'], 'details': this.props.app_state.loc['2418']/* 'Exchange Transfer Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
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
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
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
        } else {
            return (
                <div style={{  }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index}>
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
        number = this.get_actual_number(number, depth)

        var from_to = item['action'] == 'Sent' ? this.props.app_state.loc['2419']/* 'To: ' */+this.get_sender_title_text(item['event'].returnValues.p3, object) : this.props.app_state.loc['2420']/* From:  */+this.get_sender_title_text(item['event'].returnValues.p2, object)
        if (this.state.selected_exchange_transfer_event_item == index) {
            return (
                <div>
                    <div onClick={() => this.when_exchange_transfer_item_clicked(index)}>
                        {this.render_detail_item('3', { 'title': from_to, 'details': this.props.app_state.loc['2421']/* 'Action: ' */+item['action'], 'size': 'l' })}
                    </div>
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+exchange_id], 'number':number, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id]})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+exchange_id], 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], })}
                    </div>

                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item['event'].returnValues.p5), 'details':this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item['event'].returnValues.p6, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div onClick={() => this.when_exchange_transfer_item_clicked(index)}>
                    {this.render_detail_item('3', { 'title': from_to, 'details': this.format_account_balance_figure(number)+ ' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], 'size': 'l' })}
                </div>
            )
        }
    }













    render_update_balance_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Exchange ' + object['id'], 'details': 'Update Balance Events', 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
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
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
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
        } else {
            return (
                <div style={{  }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index}>
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
                    <div onClick={() => this.when_update_balance_item_clicked(index)}>
                        {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': 'Receiver Account', 'size': 'l' })}
                    </div>
                    <div style={{ height: 2 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2422']/* 'New Balance ' */, 'number':new_balance, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1]})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2422']/* 'New Balance ' */, 'subtitle': this.format_power_figure(new_balance), 'barwidth': this.calculate_bar_width(new_balance), 'number': this.format_account_balance_figure(new_balance), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], })}
                    </div>
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p4), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p5, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div onClick={() => this.when_update_balance_item_clicked(index)}>
                    {this.render_detail_item('3', { 'title':this.get_sender_title_text(item.returnValues.p2, object), 'details': this.format_account_balance_figure(new_balance)+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], 'size': 'l' })}
                </div>
            )
        }
    }















    render_freeze_unfreeze_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Exchange ' + object['id'], 'details': 'Freeze-Unfreeze Events', 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
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
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
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
        } else {
            return (
                <div style={{  }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index}>
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
        var freeze_unfreeze_obj = {'1':this.props.app_state.loc['2423']/* 'Action: Freeze' */,'0':this.props.app_state.loc['2424']/* 'Action: Unfreeze' */}
        var amount = item.returnValues.p5
        var action = freeze_unfreeze_obj[item.returnValues.p2]
        var depth = item.returnValues.p6
        amount = this.get_actual_number(amount, depth)
        if (this.state.selected_freeze_unfreeze_event_item == index) {
            return (
                <div>
                    <div onClick={() => this.when_freeze_unfreeze_item_clicked(index)}>
                        {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': action, 'size': 'l' })}
                    </div>
                    <div style={{ height: 2 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2425']/* 'Amount, depth: ' */+depth, 'number':amount, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1]})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2425']/* 'Amount, depth: ' */+depth, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], })}
                    </div>
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': 'Authority Account', 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div onClick={() => this.when_freeze_unfreeze_item_clicked(index)}>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object)+' • '+action, 'details': this.format_account_balance_figure(amount)+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], 'size': 'l' })}
                </div>
            )
        }
    }








    render_modify_moderator_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2407']/* 'In Exchange ' */ + object['id'], 'details': this.props.app_state.loc['2426']/* 'Exchange Modify Moderator Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
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
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
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
        } else {
            return (
                <div style={{  }}>
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
        var authority_val_obj = {'0':this.props.app_state.loc['2427']/* 'Not Moderator' */, '1':this.props.app_state.loc['2428']/* 'Moderator' */}
        var authority_val = authority_val_obj[item.returnValues.p6]
        if (this.state.selected_modify_moderator_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2429']/* 'Targeted Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': this.props.app_state.loc['2430']/* 'Moderator Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': authority_val, 'details': this.props.app_state.loc['2431']/* 'Authority value' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2429']/* 'Targeted Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', {'title': authority_val, 'details': this.props.app_state.loc['2431']/* 'Authority value' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
    }













    render_interactable_checker_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2407']/* 'In Exchange ' */ + object['id'], 'details': this.props.app_state.loc['2432']/* 'Exchange Access Rights Settings Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
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
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
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
        } else {
            return (
                <div style={{  }}>
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
        var interactable_checker_obj = {'0':this.props.app_state.loc['2433']/* 'Access Rights Disabled(Public)' */,'1':this.props.app_state.loc['2434']/* 'Access Rights Enabled(Private) */}
        var interactable_checker = interactable_checker_obj[item.returnValues.p6]
        if (this.state.selected_interactable_checker_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': interactable_checker, 'details': this.props.app_state.loc['2435']/* 'Access Rights Status' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': this.props.app_state.loc['2436']/* 'Moderator Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': interactable_checker, 'details': this.props.app_state.loc['2435']/* 'Acces Rights Status' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                </div>
            )
        }
    }











    render_interactable_accounts_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2407']/* 'In Exchange ' */ + object['id'], 'details': this.props.app_state.loc['2437']/* 'Exchange  Account Access Settings Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
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
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
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
        } else {
            return (
                <div style={{  }}>
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
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2438']/* 'Targeted Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': this.props.app_state.loc['2439']/* 'Moderator Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['159']/* 'Until: ' */+(new Date(item.returnValues.p6*1000)), 'size': 'l' })}
                    
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2438']/* 'Targeted Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['2117']/* 'Until: ' */+(new Date(item.returnValues.p6*1000)), 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
    }











    render_blocked_accounts_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2440']/* 'In Exchange ' */ + object['id'], 'details': this.props.app_state.loc['2441']/* 'Exchange  Blocked Account Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
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
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
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
        } else {
            return (
                <div style={{  }}>
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
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2442']/* 'Targeted Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': this.props.app_state.loc['2443']/* 'Moderator Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['2208']/* 'Until: ' */+(new Date(item.returnValues.p6*1000)), 'size': 'l' })}
                    
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2442']/* 'Targeted Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['2208']/* 'Until: ' */+(new Date(item.returnValues.p6*1000)), 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
    }











    render_depth_mint_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(3)[this.props.selected_end_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2407']/* 'In Exchange ' */ + object['id'], 'details': this.props.app_state.loc['2444']/* 'Exchange  Depth-Mint Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                    {this.render_depth_mint_event_item_logs(object)}
                </div>
            </div>
        )
    }

    render_depth_mint_event_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.get_item_logs(object, 'depth_mint'))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
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
        } else {
            return (
                <div style={{  }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index}>
                                    {this.render_depth_mint_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }


    when_depth_mint_item_clicked(index){
        if (this.state.selected_depth_mint_event_item == index) {
            this.setState({ selected_depth_mint_event_item: null })
        } else {
            this.setState({ selected_depth_mint_event_item: index })
        }
    }

    render_depth_mint_event_item(item, object, index){
        var amount = item.returnValues.p5
        var depth = item.returnValues.p4
        amount = this.get_actual_number(amount, depth)
        if (this.state.selected_depth_mint_event_item == index) {
            return (
                <div>
                    <div onClick={() => this.when_depth_mint_item_clicked(index)}>
                        {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': this.props.app_state.loc['2445']/* 'Targeted Receiver' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p6, object), 'details': this.props.app_state.loc['2446']/* 'Moderator Sender' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2447']/* 'Amount, depth: ' */+depth, 'number':amount, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1]})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2447']/* 'Amount, depth: ' */+depth, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], })}
                    </div>
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div onClick={() => this.when_depth_mint_item_clicked(index)}>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': this.format_account_balance_figure(amount)+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], 'size': 'l' })}
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
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data}  theme={this.props.theme} width={width}/>
            </div>
        )

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

    enabled_disabled(value){
        if(value == 1){
            return this.props.app_state.loc['85']/* 'enabled' */
        }
        return this.props.app_state.loc['86']/* disabled' */
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

    get_number_width(number) {
        var last_two_digits = number.toString().slice(0, 1) + '0';
        if (number > 10) {
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits + '%'
    }


}




export default EndDetailSection;