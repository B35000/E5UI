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

class SpendDetailSection extends Component {
    
    state = {
        selected: 0, navigate_view_spend_list_detail_tags_object: this.get_navigate_view_spend_list_detail_tags(), block_limit_chart_tags_object: this.block_limit_chart_tags_object(), total_supply_chart_tags_object: this.total_supply_chart_tags_object(), trading_volume_chart_tags_object: this.trading_volume_chart_tags_object()
    };

    componentDidMount() {
        this.interval = setInterval(() => this.check_for_new_responses_and_messages(), this.props.app_state.details_section_syncy_time);
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
        var obj = {
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e',this.props.app_state.loc['2118']/* 'details' */,'e.'+this.props.app_state.loc['2119']/* 'e.events' */, 'e.'+this.props.app_state.loc['2120']/* 'e.moderator-events' */],[1]
          ],
          'events': [
                ['xor', 'e', 1], [this.props.app_state.loc['2119']/* 'events' */, this.props.app_state.loc['2121']/* 'transfers' */, this.props.app_state.loc['2338']/* 'exchange-transfers' */, this.props.app_state.loc['2339']/* 'updated-balances' */, this.props.app_state.loc['2559']/* 'updated-proportion-ratios' */, this.props.app_state.loc['2341']/* 'modify-exchange' */,this.props.app_state.loc['2342']/* 'freeze-unfreeze' */], [1], [1]
           ],
           'moderator-events': [
                ['xor', 'e', 1], [this.props.app_state.loc['2120']/* 'moderator-events' */, this.props.app_state.loc['2066']/* 'modify-moderators' */, this.props.app_state.loc['2067']/* 'interactable-checkers' */, this.props.app_state.loc['2068']/* 'interactable-accounts' */, this.props.app_state.loc['2069']/* 'block-accounts' */], [1], [1]
            ],
        }

        obj[this.props.app_state.loc['2119']/* events */] = [
                ['xor', 'e', 1], [this.props.app_state.loc['2119']/* 'events' */, this.props.app_state.loc['2121']/* 'transfers' */, this.props.app_state.loc['2338']/* 'exchange-transfers' */, this.props.app_state.loc['2339']/* 'updated-balances' */, this.props.app_state.loc['2559']/* 'updated-proportion-ratios' */, this.props.app_state.loc['2341']/* 'modify-exchange' */,this.props.app_state.loc['2342']/* 'freeze-unfreeze' */], [1], [1]
           ]
        obj[this.props.app_state.loc['2120']/* moderator-events */] = [
                ['xor', 'e', 1], [this.props.app_state.loc['2120']/* 'moderator-events' */, this.props.app_state.loc['2066']/* 'modify-moderators' */, this.props.app_state.loc['2067']/* 'interactable-checkers' */, this.props.app_state.loc['2068']/* 'interactable-accounts' */, this.props.app_state.loc['2069']/* 'block-accounts' */], [1], [1]
            ]

        return obj
    }

    block_limit_chart_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','1h','24h', '7d', '30d', '6mo', this.props.app_state.loc['1416']/* 'all-time' */], [6]
            ],
        };
    }

    total_supply_chart_tags_object(){
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
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 20px 0px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.navigate_view_spend_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_spend_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
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
            <div>
                <div style={{height:he, 'background-color': 'transparent', 'border-radius': '15px','padding':'10px 5px 5px 10px','display': 'flex', 'align-items':'center','justify-content':'center','margin':'0px 0px 10px 0px'}}>
                    <img src={this.props.app_state.theme['letter']} style={{height:70 ,width:'auto'}} />
                </div>
            </div>
        )
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
        
        if(selected_item ==this.props.app_state.loc['2118']/* 'details' */ || selected_item == 'e'){
            return(
                <div key={selected_item}>
                    {this.render_spend_main_details_section(selected_object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2121']/* 'transfers' */){
            return(
                <div key={selected_item}>
                    {this.render_transfer_logs(selected_object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2559']/* 'updated-proportion-ratios' */){
            return(
                <div key={selected_item}>
                    {this.render_updated_proportion_ratio_logs(selected_object)}
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
    }

    get_exchange_tokens(exchange_type){
        return this.props.get_exchange_tokens(exchange_type, '')
    }

    get_senders_name(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    render_spend_main_details_section(selected_object){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-60
        var size = this.props.screensize

        // var selected_item = this.props.selected_spend_item
        // var selected_object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        var item = this.get_spend_data(selected_object);
        var symbol = selected_object['ipfs'] == null ? this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[selected_object['id']] : selected_object['ipfs'].entered_symbol_text
        var author = selected_object['event'] != null ? this.get_senders_name(selected_object['event'].returnValues.p3, selected_object) :this.props.app_state.loc['1591']/* 'Unknown' */
        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 5px 10px', 'padding':'0px 10px 0px 10px'}}>
                <div style={{'overflow-y': 'auto', width:'100%', height: he,padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('7', item['banner-icon'])}
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height:10}}/>
                    <div onClick={() => this.add_to_contacts2(selected_object)}>
                        {this.render_detail_item('3', {'title':''+author, 'details':this.props.app_state.loc['2070']/* 'Author' */, 'size':'l'})}
                    </div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['token_id'])}
                    <div style={{height:10}}/>
                    {this.show_moderator_note_if_any(selected_object)}
                    {/* {this.render_post_state(selected_object)} */}
                    {this.render_token_type(selected_object)}
                    {this.render_object_age(selected_object, item)}
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

                    {this.show_total_supply_chart(item, selected_object, symbol)}
                    
                    {this.render_detail_item('0')}
                    {this.show_transaction_count_chart(selected_object, symbol)}
                    
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


                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['wallet_dominance']['title'], 'number':item['wallet_dominance']['n'], 'relativepower':item['wallet_dominance']['relativepower']})}>
                        {this.render_detail_item('2', item['wallet_dominance'])}
                    </div>
                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['ratio_x']['title'], 'number': item['ratio_x']['n'], 'relativepower': item['ratio_x']['relativepower']})}>
                        {this.render_detail_item('2', item['ratio_x'])}
                    </div>
                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['ratio_y']['title'], 'number':item['ratio_y']['n'], 'relativepower':item['ratio_y']['relativepower']})}>
                        {this.render_detail_item('2', item['ratio_y'])}
                    </div>
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['combined_exchange_ratio'])}
                    {/* <div style={{height:10}}/> */}
                    {/* {this.show_24_hour_volume_data(selected_object, symbol)} */}

                    {this.render_detail_item('0')}
                    {this.render_price_of_token(selected_object)}
                    {this.render_detail_item('0')}

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['block_limit']['title'], 'number':item['block_limit']['n'], 'relativepower':item['block_limit']['relativepower']})}>
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
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['maturity_limit']['title'], 'number':item['maturity_limit']['n'], 'relativepower':item['maturity_limit']['relativepower']})}>
                        {this.render_detail_item('2', item['maturity_limit'])}
                    </div>
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['active_block_limit_reduction_proportion'])}

                    <div style={{height:10}}/>
                    {this.render_proportion_ratio_chart(selected_object)}
                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['active_mint_limit']['title'], 'number':item['active_mint_limit']['n'], 'relativepower':item['active_mint_limit']['relativepower']})}>
                        {this.render_detail_item('2', item['active_mint_limit'])}
                    </div>
                    
                    <div style={{height:10}}/>

                    {this.render_token_liquidity_balance(selected_object, symbol)}
      

                    {this.render_last_swap_block(selected_object)}
                    {this.render_last_swap_timestamp(selected_object)}
                    {this.render_last_swap_transaction_count(selected_object)}
                    {this.render_last_entered_contracts_count(selected_object)}

                    <div style={{height:10}}/>
                    {this.render_mint_dump_token_button(selected_object, item)}

                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2562']/* 'Make a token transfer to a specified account' */, 'title':this.props.app_state.loc['2563']/* 'Send/Transfer' */})}

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1849']/* 'Your Balance' */, 'number':selected_object['balance'], 'relativepower':symbol})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1849']/* 'Your Balance' */, 'subtitle':this.format_power_figure(selected_object['balance']), 'barwidth':this.calculate_bar_width(selected_object['balance']), 'number':this.format_account_balance_figure(selected_object['balance']), 'barcolor':'', 'relativepower':symbol, })}
                    </div>

                    {this.render_transfer_button(selected_object)}
                    
                    {this.render_auth_modify_button(selected_object)}

                    {this.render_exchange_transfer_button(selected_object)}

                    {this.render_freeze_unfreeze_tokens_button(selected_object)}

                    {this.render_authmint_tokens_button(selected_object)}

                    {this.render_moderator_button(selected_object)}

                    {this.render_basic_edit_object_button(selected_object)}

                    {this.render_pin_exchange_button(selected_object)}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    show_moderator_note_if_any(object){
        if(this.props.app_state.moderator_notes_by_my_following.length == 0 || this.props.app_state.user_account_id[object['e5']] == object['author']) return;
        var note_to_apply = []
        for(var n=0; n<this.props.app_state.moderator_notes_by_my_following.length; n++){
            const focused_note = this.props.app_state.moderator_notes_by_my_following[n]
            var hit_count = 0
            for(var k=0; k<focused_note['keywords'].length; k++){
                const keyword_target = focused_note['keywords'][k]
                if(object['ipfs'] != null && object['ipfs'].entered_title_text.includes(keyword_target)){
                    hit_count ++
                }
                else if(this.get_senders_name(object['author'], object) == keyword_target || object['author'] == keyword_target){
                    hit_count++
                }
                else if(object['ipfs'] != null && object['ipfs'].entered_indexing_tags.includes(keyword_target)){
                    hit_count ++
                }
                else if(object['ipfs'] != null && object['ipfs'].entered_symbol_text.includes(keyword_target)){
                    hit_count ++
                }
            }

            if(((focused_note['type'] == 'all' && hit_count == focused_note['keywords'].length) || (focused_note['type'] == 'one' && hit_count != 0)) && focused_note['visibility_end_time'] >= (Date.now()/1000)){
                note_to_apply.push(focused_note)
            }
        }
        if(note_to_apply.length != 0){
            const identifier = object['e5_id']
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

    add_to_contacts2(object){
        this.props.add_id_to_contacts(object['author'], object)
    }

    render_post_state(object){
        return;
        // const country_data = this.props.app_state.country_data
        // const object_country = object['ipfs'].device_country
        // const country_item_data = country_data.find(e => e.name === object_country)
        // if(country_item_data != null){
        //     var obj = {'g':'🟢', 'r':'🔴', 'b':'🔵', 'y':'🟡', 'o':'🟠', 'p':'🟣'}
        //     var country_color = obj[country_item_data.color[0]]
        //     var title = country_item_data.code /* +' '+country_item_data.emoji */
        //     var details = country_color+' '+country_item_data.call_code
        //     var channeling_id = object['ipfs'].get_content_channeling_object == null ? 3 : this.get_selected_item2(object['ipfs'].get_content_channeling_object, 'e')
        //     if(channeling_id == 1){
        //         return(
        //             <div>
        //                 {this.render_detail_item('3', {'size':'l', 'title':title, 'details':details})}
        //                 <div style={{height:10}}/>
        //             </div>
        //         )
        //     }
        //     else if(channeling_id == 2){
        //         var text = country_color+' '+object['ipfs'].device_language_setting
        //         return(
        //             <div>
        //                 {this.render_detail_item('4', {'text':text, 'textsize':'13px', 'font':this.props.app_state.font})}
        //                 <div style={{height:10}}/>
        //             </div>
        //         )
        //     }
        //     else{
        //         var text = '⚫ '+this.props.app_state.loc['1233']/* 'international' */
        //         return(
        //             <div>
        //                 {this.render_detail_item('4', {'text':text, 'textsize':'13px', 'font':this.props.app_state.font})}
        //                 <div style={{height:10}}/>
        //             </div>
        //         )
        //     }
        // }
    }

    get_selected_item2(object, option){
        return object[option][2][0]
    }

    render_token_type(object){
        if(object['ipfs'] != null && object['ipfs'].token_type != null){
            var obj = {
                'e':this.props.app_state.loc['629']/* '📈 e-Token' */,
                'paid':this.props.app_state.loc['631']/* '☝️ Paid Token' */,
                'free':this.props.app_state.loc['633']/* '🫰 Free Token' */,
                'utility':this.props.app_state.loc['635']/* '🔧 Utility Token' */,
                'end':this.props.app_state.loc['2769'],
                'custom':this.props.app_state.loc['2447p']/* 'Custom Token.' */,
            }
            const title = this.props.app_state.loc['2447q']/* 'Token Type.' */
            const details = obj[object['ipfs'].token_type]
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'title':title, 'details':details})}
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    render_pin_exchange_button(object){
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2447r']/* Pin the exchange to your feed' */, 'title':this.props.app_state.loc['2447s']/* 'Pin Exchange' */})}
                <div style={{height:10}}/>
                <div onClick={()=> this.when_pin_exchange_clicked(object)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2447t']/* 'Pin/Unpin Exchange' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_pin_exchange_clicked(object){
        this.props.pin_token(object)
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

    render_mint_dump_token_button(object, item){
        var user_country = this.props.app_state.device_country
        if(object['id'] == 5 && this.props.app_state.e5s[object['e5']].spend_access != null && !this.props.app_state.e5s[object['e5']].spend_access.includes(user_country)) return;
        
        if(object['hidden'] == true || !this.is_token_in_my_channeling(object)){
            return;
        }
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2560']/* 'Mint or Dump the token for a specified account' */, 'title':this.props.app_state.loc['2561']/* 'Mint/Dump' */})}
                <div style={{height:10}}/>
                <div onClick={()=>this.open_mint_burn_spend_token_ui(object)}>
                    {this.render_detail_item('5', item['mint_burn_button'])}
                </div>
                {this.render_detail_item('0')}
            </div>
        )
    }

    is_token_in_my_channeling(object){
        var device_country = this.props.app_state.device_country
        var ipfs = object['ipfs']
        if(
            ipfs == null || 
            ipfs.spend_exchange_allowed_countries == null || 
            ipfs.spend_exchange_allowed_countries.includes(device_country) || 
            ipfs.spend_exchange_allowed_countries.length == 0
        ){
            return true
        }

        return false
    }

    render_object_age(object, item){
        if(object['id'] != 5){
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

    render_token_liquidity_balance(selected_object, symbol){
        var buy_exchanges_count = selected_object['data'][3].length
        var is_type_spend = false

        if(buy_exchanges_count == 1 && selected_object['data'][3][0] == 0){
            is_type_spend = true
        }
        if(selected_object['id'] != 5 && !is_type_spend){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2564']/* 'The exchanges balance for each of the tokens used to buy ' */+symbol, 'title':this.props.app_state.loc['2565']/* 'Buy Token Liquidity' */})}
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
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2566']/* 'Author Moderator Privelages Disabled' */, 'details':this.props.app_state.loc['2567']/* 'Author of Object is not a Moderator by default' */, 'size':'l'})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2568']/* 'Author Moderator Privelages Enabled' */, 'details':this.props.app_state.loc['2569']/* 'Author of Object is a Moderator by default' */, 'size':'l'})}
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
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2570']/* 'The amount you get when selling one unit of the token.' */, 'title':this.props.app_state.loc['2571']/* 'Token Price' */})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                        {buy_tokens.map((item, index) => (
                            <li style={{'padding': '1px'}}>
                                {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[selected_object['e5']+item], 'subtitle':this.format_power_figure(this.calculate_price_from_sell_action(buy_amounts[index], price)), 'barwidth':this.calculate_bar_width(this.calculate_price_from_sell_action(buy_amounts[index], price)), 'number':this.format_price(this.calculate_price_from_sell_action(buy_amounts[index], price)), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
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
            return (amount*price)
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

    get_access_rights_status(value){
        if(value == true){
            return this.props.app_state.loc['2140']/* 'Enabled' */
        }else{
            return this.props.app_state.loc['2141']/* 'Disabled' */
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
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2357']/* 'Last Swap Block' */, 'title':selected_object['account_data'][0]})}
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
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2358']/* 'Last Swap Age' */, 'title': this.get_time_difference(selected_object['account_data'][1]) })}
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
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2359']/* 'Last Swap Transactions Count' */, 'title':selected_object['account_data'][2]})}
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
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2360']/* 'Last Entered Contracts Count' */, 'title':selected_object['account_data'][3]})}
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

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2361']/* 'Modify Token' */, 'details':this.props.app_state.loc['2362']/* 'Modify the configuration of the exchange directly.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_modify_token_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2572']/* 'Modify Exchanage' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    render_exchange_transfer_button(object){
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        var contract_config = object['data'][1]
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if(object['id'] != 5 && contract_config[9/* exchange_authority */] == my_account && object['hidden'] == false){
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
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        var contract_config = object['data'][1]
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if(object['id'] != 5 && contract_config[9/* exchange_authority */] == my_account){
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


    render_authmint_tokens_button(object){
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        var contract_config = object['data'][1]
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if(object['id'] != 5 && contract_config[9/* exchange_authority */] == my_account){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2573']/* 'AuthMint Tokens' */, 'details':this.props.app_state.loc['2574']/* 'Bypass the exchanges restrictions and mint your token as an authority' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_authmint_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2575']/* 'AuthMint' */, 'action':''})}
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

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2369']/* 'Perform Moderator Actions' */, 'details':this.props.app_state.loc['2576']/* 'Set an accounts access rights, moderator privelages or block an account' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_moderator_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2370']/* 'Perform Action' */, 'action':''})}
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
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        this.props.open_edit_object('8', object)
    }


    get_spend_data(selected_object){
        // var selected_item = this.props.selected_spend_item
        // var selected_object = this.get_exchange_tokens(5)[selected_item]
        var title = selected_object['id'];
        var img = selected_object['img']
        var age = selected_object['event'] == null ? this.props.app_state.boot_times[selected_object['e5']]['block'] : selected_object['event'].returnValues.p5
        var time = selected_object['event'] == null ? this.props.app_state.boot_times[selected_object['e5']]['time'] : selected_object['event'].returnValues.p4
        
        var selected_obj_root_config = selected_object['data'][0];
        var selected_obj_config = selected_object['data'][1];
        var selected_obj_ratio_config = selected_object['data'][2];

        var type = selected_obj_root_config[3] == 3 ? this.props.app_state.loc['1808']/* 'Capped' */ : this.props.app_state.loc['1809']/* 'Uncapped' */
        var spend_type = selected_object['data'][0][3/* <3>token_type */] == 3 ? this.props.app_state.loc['3078']/* END */: this.props.app_state.loc['3079']/* SPEND */
        var is_auth_main_contract = selected_obj_config[9] == 2 ? this.props.app_state.loc['1810']/* '2 (Main Contract)' */: selected_obj_config[9]
        var is_trust_fee_target_main_contract = selected_obj_config[10] == 2 ? this.props.app_state.loc['1810']/* '2 (Main Contract)' */: (selected_obj_config[10] == 0 ? this.props.app_state.loc['2374']/* '0 (Burn Account)' */: selected_obj_config[10])
        var halfing_type = selected_obj_config[15] == 0 ? this.props.app_state.loc['1811']/* 'Fixed'  */: this.props.app_state.loc['1812']/* 'Spread' */

        if(title == 5){
            title = selected_object['e5'].replace('E', '3')
        }

        var item = selected_object;
        var active_tags = item['ipfs'] == null ? [''+title, ''+type, 'token'] : [].concat(item['ipfs'].entered_indexing_tags)
        var name = item['ipfs'] == null ? ''+title : item['ipfs'].entered_title_text
        var symbol = item['ipfs'] == null ? ''+spend_type : item['ipfs'].entered_symbol_text
        
        // var image = item['ipfs'] == null ? img : item['ipfs'].token_image
        var image = img
        if(item['ipfs']!= null){
            if(item['ipfs'].token_image!= null){
                image = this.get_image_from_file(item['ipfs'].token_image)
            }
        }
        var proportion_ratio_events = selected_object['proportion_ratio_data']
        var wallet_dominance = this.calculate_wallet_dominance(selected_object)

        var circulating_supply = this.get_circulating_supply(selected_object)
        return{
            'tags':{'active_tags':active_tags, 'index_option':'indexed', 'when_tapped':''},
            'banner-icon':{'header':name, 'subtitle':symbol, 'image':image},
            'token_id': {'title':selected_object['e5']+' • '+selected_object['id'], 'details':this.props.app_state.loc['2376']/* 'Token Identifier' */, 'size':'l'},
            'token_type': {'title':this.props.app_state.loc['2377']/* 'Token Type' */, 'details':type, 'size':'l'},
            'age': { 'style': 'l', 'title': this.props.app_state.loc['2378']/* 'Block Number' */, 'subtitle': this.props.app_state.loc['2494']/* 'age' */, 'barwidth': this.get_number_width(age), 'number': `${number_with_commas(age)}`, 'barcolor': '', 'relativepower': `${this.get_time_difference(time)} `+this.props.app_state.loc['2495']/* ago */, },

            'unlocked_supply': {'title':this.props.app_state.loc['679']/* 'Unlocked Supply' */, 'details':this.enabled_disabled(selected_obj_root_config[0]), 'size':'l'},
            'unlocked_liquidity': {'title':this.props.app_state.loc['1815']/* 'Unlocked Liquidity' */, 'details':this.enabled_disabled(selected_obj_root_config[1]), 'size':'l'},
            'fully_custom': {'title':this.props.app_state.loc['1816']/* 'Fully Custom' */, 'details':this.enabled_disabled(selected_obj_root_config[2]), 'size':'l'},

            'buy_limit':{'style':'l','title':this.props.app_state.loc['1817']/* Mint Limit' */, 'subtitle':this.format_power_figure(selected_obj_config[0]), 'barwidth':this.calculate_bar_width(selected_obj_config[0]), 'number':this.format_account_balance_figure(selected_obj_config[0]), 'relativepower':symbol, 'n':selected_obj_config[0]},
            
            'minimum_transactions_between_swap': {'title':selected_obj_config[2], 'details':this.props.app_state.loc['330']/* 'Minimum Transactions Between Swap' */, 'size':'l'},
            'minimum_blocks_between_swap': {'title':selected_obj_config[3], 'details':this.props.app_state.loc['331']/* 'Minimum Blocks Between Swap' */, 'size':'l'},
            'minimum_time_between_swap': {'title':this.get_time_diff(selected_obj_config[4]), 'details':this.props.app_state.loc['658']/* 'Minimum Time Between Swap' */, 'size':'l'},
            
            'trust_fee_proportion': {'title':this.format_proportion(selected_obj_config[7]), 'details':this.props.app_state.loc['660']/* 'Trust Fee' */, 'size':'l'},
            'exchange_authority': {'title':this.props.app_state.loc['1818']/* 'Authority: ' */+is_auth_main_contract, 'details':this.props.app_state.loc['1819']/* 'Exchange Authority Identifier' */, 'size':'l'},
            'trust_fee_target': {'title':this.props.app_state.loc['1293e']/* 'Target: ' */+is_trust_fee_target_main_contract, 'details':this.props.app_state.loc['1821']/* 'Trust Fee Target Identifier' */, 'size':'l'},

            'sell_limit':{'style':'l','title':this.props.app_state.loc['328']/* 'Sell Limit' */, 'subtitle':this.format_power_figure(selected_obj_config[11]), 'barwidth':this.calculate_bar_width(selected_obj_config[11]), 'number':this.format_account_balance_figure(selected_obj_config[11]), 'relativepower':symbol, 'n':selected_obj_config[11]},

            'minimum_entered_contracts_between_swap': {'title':selected_obj_config[13], 'details':this.props.app_state.loc['332']/* 'Minimum Entered Contracts Between Swap' */, 'size':'l'},
            'minimum_transactions_for_first_buy': {'title':selected_obj_config[17], 'details':this.props.app_state.loc['333']/* 'Minimum Transactions For First Buy' */, 'size':'l'},
            'minimum_entered_contracts_for_first_buy': {'title':selected_obj_config[18], 'details':this.props.app_state.loc['334']/* 'Minimum Entered Contracts For First Buy' */, 'size':'l'},

            'ratio_x':{'style':'l','title':this.props.app_state.loc['395']/* 'Exchange Ratio X' */, 'subtitle':this.format_power_figure(selected_obj_ratio_config[0]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[0]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[0]), 'relativepower':'', 'n':selected_obj_ratio_config[0]},
            'ratio_y':{'style':'l','title':this.props.app_state.loc['396']/* 'Exchange Ratio Y' */, 'subtitle':this.format_power_figure(selected_obj_ratio_config[1]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[1]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[1]), 'relativepower':'', 'n':selected_obj_ratio_config[1]},
            'combined_exchange_ratio': {'title':this.format_exchange_ratio(selected_obj_ratio_config[0], selected_obj_ratio_config[1]), 'details':this.props.app_state.loc['712']/* 'Exchange Ratio X:Y' */, 'size':'l'},

            'exchanges_liquidity':{'style':'l','title':this.props.app_state.loc['2579']/* 'Circulating Supply' */, 'subtitle':this.format_power_figure(circulating_supply), 'barwidth':this.calculate_bar_width(circulating_supply), 'number':this.format_account_balance_figure(circulating_supply), 'relativepower':symbol, 'n':circulating_supply},
            'mint_burn_button':{'text':this.props.app_state.loc['1822']/* 'Mint/Burn Token' */, 'action':''},

            'block_limit':{'style':'l','title':this.props.app_state.loc['335']/* 'Block Limit' */, 'subtitle':this.format_power_figure(selected_obj_config[1]), 'barwidth':this.calculate_bar_width(selected_obj_config[1]), 'number':this.format_account_balance_figure(selected_obj_config[1]), 'relativepower':symbol, 'n':selected_obj_config[1]},
            'internal_block_halfing_proportion': {'title':this.format_proportion(selected_obj_config[5]), 'details':this.props.app_state.loc['338']/* 'Internal Block Halving Proportion' */, 'size':'l'},
            'block_limit_reduction_proportion': {'title':this.format_proportion(selected_obj_config[6]), 'details':this.props.app_state.loc['339']/* 'Block Limit Reduction Proportion' */, 'size':'l'},
            
            'block_reset_limit': {'title':selected_obj_config[8], 'details':this.props.app_state.loc['340']/* 'Block Reset Limit' */, 'size':'l'},
            'block_limit_sensitivity': {'title':selected_obj_config[12], 'details':this.props.app_state.loc['341']/* 'Block Limit Sensitivity' */, 'size':'l'},
            'default_authority_mint_limit': {'title':this.format_proportion(selected_obj_config[14]), 'details':this.props.app_state.loc['1823']/* 'Authority Mint Limit (percentage of supply)' */, 'size':'l'},
            'block_halfing_type': {'title':halfing_type, 'details':this.props.app_state.loc['336']/* 'Halving Type' */, 'size':'l'},
            'maturity_limit':{'style':'l','title':this.props.app_state.loc['337']/* 'Maturity Limit' */, 'subtitle':this.format_power_figure(selected_obj_config[16]), 'barwidth':this.calculate_bar_width(selected_obj_config[16]), 'number':this.format_account_balance_figure(selected_obj_config[16]), 'relativepower':symbol, 'n':selected_obj_config[16]},

            'current_block_mint_total':{'style':'l','title':this.props.app_state.loc['1824']/* 'Current Block Mint Total' */, 'subtitle':this.format_power_figure(selected_obj_ratio_config[4]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[4]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[4]), 'relativepower':symbol, 'n':selected_obj_ratio_config[4]},
            'active_block_limit_reduction_proportion': {'title':this.format_proportion(selected_obj_ratio_config[6]), 'details':this.props.app_state.loc['1825']/* 'Active Block Limit Reduction Proportion' */, 'size':'l'},
            
            'active_mint_limit':{'style':'l','title':this.props.app_state.loc['2602a']/* 'Active Mint Limit.' */, 'subtitle':this.format_power_figure(this.calculate_active_mint_limit(selected_object)), 'barwidth':this.calculate_bar_width(this.calculate_active_mint_limit(selected_object)), 'number':this.format_account_balance_figure(this.calculate_active_mint_limit(selected_object)), 'relativepower':symbol, 'n':this.calculate_active_mint_limit(selected_object)},

            'wallet_dominance':{'style':'l','title':this.props.app_state.loc['2447a']/* 'Wallet Dominance' */, 'subtitle':this.format_power_figure(wallet_dominance), 'barwidth':this.calculate_bar_width(wallet_dominance), 'number':(wallet_dominance)+'%', 'relativepower':this.props.app_state.loc['1881']/* proportion */},
            '':{},
            '':{},
        }
    }

    calculate_wallet_dominance(object){
        var max_supply = this.get_circulating_supply(object) 
        var my_balance = object['balance'];
        if(my_balance == 0) return 0
        // var percentage = (my_balance * 100) / max_supply
        var percentage = (bigInt(my_balance).multiply(100)).divide(max_supply)
        return percentage
    }

    get_circulating_supply(object){
        var selected_obj_ratio_config = object['data'][2];
        var active_supply = selected_obj_ratio_config[2]
        if(object['ipfs'] != null){
            var depth = object['ipfs'].default_depth == null ? 0 : object['ipfs'].default_depth
            if(depth != 0){
                active_supply = bigInt(object['ipfs'].token_exchange_liquidity_total_supply).add(active_supply)
            }
        }
        return active_supply
    }

    calculate_active_mint_limit(selected_object){
        var selected_obj_config = selected_object['data'][1];
        var selected_obj_ratio_config = selected_object['data'][2];
        var mint_limit = selected_obj_config[0]
        var active_block_limit_reduction_proportion = selected_obj_ratio_config[6]

        var active_mint_limit =  ((active_block_limit_reduction_proportion / 10**18) * mint_limit).toLocaleString('fullwide', {useGrouping:false})
        return bigInt(active_mint_limit)

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
                        <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[selected_object['e5']+item], 'number':buy_amounts[index], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                            {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[selected_object['e5']+item], 'subtitle':this.format_power_figure(buy_amounts[index]), 'barwidth':this.calculate_bar_width(buy_amounts[index]), 'number':this.format_account_balance_figure(buy_amounts[index]), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
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
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2602b']/* 'Inverse Demand Pressure' */, 'details':this.props.app_state.loc['2602c']/* 'Chart containing the inverse demand pressure over time.' */, 'size':'l'})}
                    {this.render_detail_item('6', {'dataPoints':this.get_proportion_ratio_data_points(proportion_ratio_events), 'interval':this.get_interval_for_proportion_ratio_chart(proportion_ratio_events)})}
                    <div style={{height: 10}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.block_limit_chart_tags_object} tag_size={'l'} when_tags_updated={this.when_block_limit_chart_tags_objectt_updated.bind(this)} theme={this.props.theme}/>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2578']/* Y-Axis: Proportion' */, 'details':this.props.app_state.loc['1461']/* 'X-Axis: Time' */, 'size':'s'})}
                </div>
            )
        }
    }

    get_proportion_ratio_data_points(event_data){
        var events = this.filter_proportion_ratio_events(event_data);
        var data = []
        for(var i=0; i<events.length; i++){
            data.push((Math.round(events[i].returnValues.p2/10**18) * 100))

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
            data.push((Math.round(event.returnValues.p2/10**18) * 100))
        });
        var largest = Math.max.apply(Math, data);
        return largest
    }

    get_interval_for_proportion_ratio_chart(events){
        if(events.length == 0) return 110
        return this.get_proportion_ratio_interval_figure(this.filter_proportion_ratio_events(events)) + 10
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
        else if(selected_item == this.props.app_state.loc['1416']/* 'all-time' */){
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
                    <div style={{height: 10}}/>
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

        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;

        var recorded = false;
        for(var i = 0; i < noOfDps; i++) {
            if(largest_number == 0) yVal = 0
            else yVal = parseInt(bigInt(data[factor * xVal]).multiply(100).divide(largest_number))
            
            if(yVal != null && data[factor * xVal] != null){
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










    show_total_supply_chart(item, selected_object, symbol){
        // var selected_object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        var total_supply = selected_object['data'][2][2]
        var proportion_ratio_events = selected_object['exchange_ratio_data']
        var amount = total_supply
        var is_end_token = false
        var token_ipfs = selected_object['ipfs']
        if(token_ipfs != null) {
            var depth = token_ipfs.default_depth == null ? 0 : token_ipfs.default_depth
            if(depth != 0) is_end_token = true
        }
        if(proportion_ratio_events.length >= 5 && !is_end_token){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2580']/* Total Supply' */, 'details':this.props.app_state.loc['2397']/* `Chart containing the total supply of ` */ +symbol+this.props.app_state.loc['2389']/* ` over time.` */, 'size':'l'})}
                    {this.render_detail_item('6', {'dataPoints':this.get_total_supply_data_points(proportion_ratio_events), 'interval':110, 'hide_label':true})}
                    <div style={{height: 10}}/>
                    {/* <Tags font={this.props.app_state.font} page_tags_object={this.state.total_supply_chart_tags_object} tag_size={'l'} when_tags_updated={this.when_total_supply_chart_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    <div style={{height: 10}}/> */}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2581']/* 'Y-Axis: Total Supply' */, 'details':this.props.app_state.loc['2391']/* 'X-Axis: Time' */, 'size':'s'})}
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
                    for(var t=0; t<diff; t+=(6000*100)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p9 - events[i].returnValues.p9
                    for(var t=0; t<diff; t+=(6000*100)){
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
        var largest_number = this.get_total_supply_interval_figure(events)
        for(var i = 0; i < noOfDps; i++) {
            yVal = parseInt(bigInt(data[factor * xVal]).multiply(100).divide(largest_number))
            // yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null && data[factor * xVal] != null){
                if(i == 25 || i == 76){
                //if(i%(Math.round(noOfDps/2)) == 0 && i != 0){
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
        var is_end_token = false
        var token_ipfs = selected_object['ipfs']
        if(token_ipfs != null) {
            var depth = token_ipfs.default_depth == null ? 0 : token_ipfs.default_depth
            if(depth != 0) is_end_token = true
        }
        if(exchange_ratio_events.length > 10 && !is_end_token){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2582']/* Total Transactions' */, 'details':this.props.app_state.loc['2583']/* `Chart containing the total number of buy/sell transactions over time.` */, 'size':'l'})}
                    {this.render_detail_item('6', {'dataPoints':this.get_transaction_count_data_points(exchange_ratio_events), 'interval':this.get_transaction_count_interval_figure(exchange_ratio_events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2584']/* 'Y-Axis: Total Transactions' */, 'details':this.props.app_state.loc['2585']/* 'X-Axis: Time' */, 'size':'s'})}

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










    render_transfer_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2407']/* 'In Exchange ' */ + object['id'], 'details': this.props.app_state.loc['2412']/* 'Your Transfer Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
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
                <div style={{ }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} >
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
                        {this.render_detail_item('3', { 'title': from_to, 'details': this.props.app_state.loc['2421']/* 'Action: ' */+item['action'], 'size': 'l' })}
                    </div>
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+exchange_id], 'number':number, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id]})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+exchange_id], 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], })}
                    </div>

                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item['event'].returnValues.p5), 'details': this.props.app_state.loc['2198']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item['event'].returnValues.p6, 'details': this.props.app_state.loc['2206']/* 'Block Number' */, 'size': 'l' })}
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

    get_sender_title_text(sender, object) {
        if (sender == this.props.app_state.user_account_id[object['e5']]) {
            return this.props.app_state.loc['1694']/* 'You' */
        } else {
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    get_actual_number(number, depth){
        var p = (bigInt(depth).times(72)).toString().toLocaleString('fullwide', {useGrouping:false})
        var depth_vaule = bigInt(('1e'+p))
        return (bigInt(number).times(depth_vaule)).toString().toLocaleString('fullwide', {useGrouping:false})
    }












    render_updated_proportion_ratio_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2407']/* 'In Exchange ' */ + object['id'], 'details': this.props.app_state.loc['2586']/* 'Exchange Mint Limit Proportion Ratio Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                    {this.render_proportion_ratio_item_logs(object)}
                </div>
            </div>
        )
    }

    filter_for_my_logs(logs, p, object){
        var me = this.props.app_state.user_account_id[object['e5']] == null ? 1 : this.props.app_state.user_account_id[object['e5']]
        if(me == object['author']){
            return logs
        }else{
            var filtered_logs = []
            logs.forEach(log => {
                var account = log['returnValues'][p]
                if(me == account){
                    filtered_logs.push(log)
                }
            });
            return filtered_logs
        }
    }

    render_proportion_ratio_item_logs(object){
        var middle = this.props.height - 120;
        var items = this.get_item_logs(object, 'proportion_ratio')
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
                    <div onClick={() => this.when_proportion_ratio_item_clicked(index)}>
                        {this.render_detail_item('3', { 'title': this.format_proportion(new_active_limit), 'details': this.props.app_state.loc['2588']/* 'Updated Active Limit' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2587']/* 'Tokens Received' */, 'number':tokens_to_receive, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1]})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2587']/* 'Tokens Received' */, 'subtitle': this.format_power_figure(tokens_to_receive), 'barwidth': this.calculate_bar_width(tokens_to_receive), 'number': this.format_account_balance_figure(tokens_to_receive), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], })}
                    </div>
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p5), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }}/>

                    {this.render_detail_item('3', { 'title': item.returnValues.p4, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div onClick={() => this.when_proportion_ratio_item_clicked(index)}>
                    {this.render_detail_item('3', { 'title': this.format_proportion(new_active_limit), 'details': this.props.app_state.loc['2588']/* 'Updated Active Limit' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                </div>
            )
        }
    }















    render_modify_exchange_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2407']/* 'In Exchange ' */ + object['id'], 'details': this.props.app_state.loc['2589']/* 'Exchange Modification Events' */, 'size': 'l' })}
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
                    {this.render_detail_item('3', { 'title': this.get_target_identifier(item), 'details': this.props.app_state.loc['2590']/* 'Targeted Modify Item' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.get_value_ui(item, object)}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p7, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_target_identifier(item), 'details': this.props.app_state.loc['2590']/* 'Targeted Modify Item' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                </div>
            )
        }
    }

    get_target_identifier(item) {
        var obj = this.get_contract_modify_details()

        var target_array_pos = item.returnValues.p3
        var target_array_item = item.returnValues.p4

        if(target_array_pos == 4/* exchange_entry_amounts */){
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
                    {this.render_detail_item('3', { 'title': this.format_proportion(number), 'details': this.props.app_state.loc['1881']/* 'proportion' */, 'size': 'l' })}
                </div>
            )
        }
        else if (type == 'time') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_time_diff(number), 'details': this.props.app_state.loc['1882']/* 'duration' */, 'size': 'l' })}
                </div>
            )
        }
        else if (type == 'number') {
            return (
                <div>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':title, 'number':number, 'relativepower':this.props.app_state.loc['1880']/* 'units' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': title, 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': this.props.app_state.loc['1880']/* 'units' */, })}
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
                    {this.render_detail_item('3', { 'title': number, 'details': this.props.app_state.loc['1884']/* 'target ID' */, 'size': 'l' })}
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
            'Exchange Authority':{'position':[1,9], 'picker':'number', 'powerlimit':9},
            'Trust Fee Target':{'position':[1,10], 'picker':'number', 'powerlimit':9}
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
        obj[this.props.app_state.loc['2811']/* Exchange Authority */] = {'position':[1,9], 'picker':'number', 'powerlimit':9}
        obj[this.props.app_state.loc['2812']/* Trust Fee Target */] = {'position':[1,10], 'picker':'number', 'powerlimit':9}

        return obj
    }














    render_exchange_transfers_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2407']/* 'In Exchange ' */ + object['id'], 'details': this.props.app_state.loc['2591']/* 'Exchange Transfer Events' */, 'size': 'l' })}
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
        console.log('click@bry')
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
        var from_to = item['action'] == 'Sent' ? this.props.app_state.loc['2419']/* 'To: ' */+this.get_sender_title_text(item['event'].returnValues.p3, object) : this.props.app_state.loc['2420']/* 'From: ' */+this.get_sender_title_text(item['event'].returnValues.p2, object)
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
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item['event'].returnValues.p5), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item['event'].returnValues.p6, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div onClick={() => this.when_exchange_transfer_item_clicked(index)}>
                    {this.render_detail_item('3', { 'title': from_to, 'details': this.format_account_balance_figure(number)+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], 'size': 'l' })}
                </div>
            )
        }
    }













    render_update_balance_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2407']/* 'In Exchange ' */ + object['id'], 'details': this.props.app_state.loc['2592']/* 'Update Balance Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                    {this.render_update_balance_item_logs(object)}
                </div>
            </div>
        )
    }

    render_update_balance_item_logs(object){
        var middle = this.props.height - 120;
        var logs = this.get_item_logs(object, 'update_balance')
        var items = [].concat(this.filter_for_my_logs(logs, 'p2', object))
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
                                <div key={index} >
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
                        {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object)/*  */, 'details': this.props.app_state.loc['2593']/* 'Receiver Account' */, 'size': 'l' })}
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
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object)/*  */, 'details': this.format_account_balance_figure(new_balance)+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], 'size': 'l' })}
                </div>
            )
        }
    }














    render_freeze_unfreeze_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2407']/* 'In Exchange ' */ + object['id'], 'details': this.props.app_state.loc['2594']/* 'Freeze-Unfreeze Events' */, 'size': 'l' })}
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
        var freeze_unfreeze_obj = {'1':this.props.app_state.loc['2595']/* 'Action: Freeze' */,'0':this.props.app_state.loc['2596']/* Action: Unfreeze' */}
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
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': this.props.app_state.loc['2597']/* 'Authority Account' */, 'size': 'l' })}
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
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2440']/* 'In Exchange ' */ + object['id'], 'details': this.props.app_state.loc['2598']/* 'Exchange Modify Moderator Events' */, 'size': 'l' })}
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
        var authority_val_obj = {'0':this.props.app_state.loc['2104']/* 'Not Moderator' */, '1':this.props.app_state.loc['2105']/* 'Moderator' */}
        var authority_val = authority_val_obj[item.returnValues.p6]
        if (this.state.selected_modify_moderator_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2106']/* 'Targeted Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': this.props.app_state.loc['2107']/* 'Moderator Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': authority_val, 'details': this.props.app_state.loc['2108']/* 'Authority value' */, 'size': 'l' })}
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
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2106']/* 'Targeted Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', {'title': authority_val, 'details': this.props.app_state.loc['2108']/* 'Authority value' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
    }














    render_interactable_checker_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
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
        var interactable_checker_obj = {'0':this.props.app_state.loc['2433']/* 'Access Rights Disabled(Public)' */,'1':this.props.app_state.loc['2434']/* Access Rights Enabled(Private)' */}
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
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2407']/* 'In Exchange ' */ + object['id'], 'details': this.props.app_state.loc['2599']/* 'Exchange Account Access Settings Events' */, 'size': 'l' })}
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
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2600']/* 'Targeted Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': this.props.app_state.loc['2601']/* 'Moderator Account' */, 'size': 'l' })}
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
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2600']/* 'Targeted Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['159']/* 'Until: ' */+(new Date(item.returnValues.p6*1000)), 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
    }











    render_blocked_accounts_logs(object){
        var he = this.props.height - 45
        // var object = this.get_exchange_tokens(5)[this.props.selected_spend_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2407']/* 'In Exchange ' */ + object['id'], 'details': this.props.app_state.loc['2602']/* 'Exchange  Blocked Account Events' */, 'size': 'l' })}
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
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2429']/* 'Targeted Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': this.props.app_state.loc['2430']/* 'Moderator Account' */, 'size': 'l' })}
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
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2429']/* 'Targeted Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['159']/* 'Until: ' */+(new Date(item.returnValues.p6*1000)), 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
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


}




export default SpendDetailSection;