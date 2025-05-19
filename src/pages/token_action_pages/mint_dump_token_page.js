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
import ViewGroups from '../../components/view_groups';
import Tags from '../../components/tags';
import TextInput from '../../components/text_input';
import NumberPicker from '../../components/number_picker';

import AddStack from '../../assets/e5empty_icon3.png'; 
// import Letter from '../../assets/letter.png';

var bigInt = require("big-integer");
const Web3 = require('web3');


function number_with_commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

class NewMintActionPage extends Component {
    
    state = {
        selected: 0, id:makeid(8), type:this.props.app_state.loc['946']/* 'buy-sell' */, entered_indexing_tags:[this.props.app_state.loc['947']/* 'mint' */, this.props.app_state.loc['948']/* 'dump' */, this.props.app_state.loc['883']/* 'token' */],
        new_mint_dump_action_page_tags_object: this.get_new_mint_dump_action_page_tags_object(),
        recipient_id:'', amount:0, token_item: null, 
        upper_bound:0, lower_bound:0, e5:this.props.app_state.selected_e5, hide_number_picker:false
    };


    get_new_mint_dump_action_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['949']/* 'mint-buy' */, this.props.app_state.loc['950']/* 'dump-sell' */], [1]
            ],
        };
    }

    get_exclusive_mint_action_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['949']/* 'mint-buy' */], [1]
            ],
        };
    }

    render(){
        if(this.state.token_item == null) return;
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.new_mint_dump_action_page_tags_object} tag_size={'l'} when_tags_updated={this.when_new_mint_dump_page_tags_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img alt="" className="text-end" onClick={()=>this.finish()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div>
                
                <div style={{'margin':'0px 0px 0px 0px'}}>
                    {this.render_everything()}
                </div>
                
            </div>
        )
    }

    when_new_mint_dump_page_tags_updated(tag_obj){
        this.setState({new_mint_dump_action_page_tags_object: tag_obj})
    }

    set_exclusive(){
        this.setState({new_mint_dump_action_page_tags_object: this.get_exclusive_mint_action_page_tags_object()})
    }


    render_everything(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_data_picker_ui()}
                    {this.render_fees_and_price_data_if_buyable()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '0px 10px 10px 10px'}}>
                        {this.render_data_picker_ui()}
                    </div>
                    <div className="col-6" style={{'padding': '0px 10px 10px 10px'}}>
                        {this.render_fees_and_price_data_if_buyable()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '0px 10px 10px 10px'}}>
                        {this.render_data_picker_ui()}
                    </div>
                    <div className="col-5" style={{'padding': '0px 10px 10px 10px'}}>
                        {this.render_fees_and_price_data_if_buyable()}
                    </div>
                </div>
                
            )
        }
    }

    render_empty_views(size){
        var items = []
        for(var i=0; i<size; i++){
            items.push(i)
        }
        
        return(
            <div>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '2px'}}>
                            <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                <div style={{'margin':'10px 20px 10px 0px'}}>
                                    <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }


    render_data_picker_ui(){
        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'15px', 'text':this.props.app_state.loc['951']/* 'Buy or Sell the specified token' */})}
                <div style={{height:10}}/> 

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['952']/* 'Your Balance' */, 'number':this.state.token_item['balance'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']]})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['952']/* 'Your Balance' */, 'subtitle':this.format_power_figure(this.state.token_item['balance']), 'barwidth':this.calculate_bar_width(this.state.token_item['balance']), 'number':this.format_account_balance_figure(this.state.token_item['balance']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']], })}
                </div>

                {this.render_detail_item('0')}
                
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['953']/* 'Set the recipient of the mint/dump action' */, 'title':this.props.app_state.loc['954']/* 'Recipient of action' */})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['955']/* 'Recipient ID' */} when_text_input_field_changed={this.when_recipient_input_field_changed.bind(this)} text={this.state.recipient_id} theme={this.props.theme}/>
                {this.load_account_suggestions()}

                {this.render_detail_item('0')}
                {this.show_amount_picker_if_enabled()}

            </div>
        )
    }

    should_show_text_area(){
        var action = this.get_selected_item(this.state.new_mint_dump_action_page_tags_object, 'e')
        if(action == this.props.app_state.loc['949']/* 'mint-buy' */){
            return this.get_token_buy_limit() < 1_000_000_000
        }else{
            return this.get_token_sell_limit() < 1_000_000_000
        }
    }

    show_amount_picker_if_enabled(){
        if(this.state.hide_number_picker == false){
            return(
                <div>
                    {this.set_buy_sell_header()}

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={this.get_number_limit()} when_number_picker_value_changed={this.when_amount_set.bind(this)} theme={this.props.theme} power_limit={63} pick_with_text_area={this.should_show_text_area()} text_area_hint={'1000'}/>

                    <div style={{'padding': '5px'}} onClick={()=>this.set_maximum()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['961']/* 'Set Maximum' */, 'action':''})}
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['958']/* 'Amount' */, 'number':this.state.amount, 'relativepower':this.props.app_state.loc['92']/* tokens */})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['958']/* 'Amount' */, 'subtitle':this.format_power_figure(this.state.amount), 'barwidth':this.calculate_bar_width(this.state.amount), 'number':this.format_account_balance_figure(this.state.amount), 'barcolor':'', 'relativepower':this.props.app_state.loc['92']/* tokens */, })}
                        </div>
                    </div>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['996i']/* 'The amount you will receive may be less than this target depending on the state of the tokens demand.' */, 'textsize':'10px', 'font':this.props.app_state.font})}
                </div>
            )
        }
    }

    render_fees_and_price_data_if_buyable(){
        var buy_tokens = this.state.token_item['data'][3]
        var buy_amounts = this.state.token_item['data'][4]
        var does_price_exist = true

        if(buy_tokens.length == 1 && buy_tokens[0] == 0 && buy_amounts[0] == 0){
            does_price_exist = false
        }

        if(does_price_exist){
            return(
                <div>
                    {this.render_fees_for_action_title()}

                    {this.render_my_balances_if_buy_action()}
                    
                    {this.set_price_data()}

                    {this.calculate_and_show_buy_sell_impact_proportion()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }
    }

    set_buy_sell_header(){
        var action = this.get_selected_item(this.state.new_mint_dump_action_page_tags_object, 'e')
        var message = ''
        var token = ''
        if(action == this.props.app_state.loc['949']/* 'mint-buy' */){
            message = this.props.app_state.loc['956']/* 'Set the amount of tokens your submitting for the mint/buy action.' */
            token = this.props.app_state.loc['92']/* tokens */
        }else{
            message = this.props.app_state.loc['996b']/* 'Set the amount of tokens your submitting for the dump-sell action.' */
            token = this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']]
        }
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':message, 'title':this.props.app_state.loc['957']/* 'Amount for action' */})}

                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['958']/* 'Amount' */, 'number':this.state.amount, 'relativepower':token})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['958']/* 'Amount' */, 'subtitle':this.format_power_figure(this.state.amount), 'barwidth':this.calculate_bar_width(this.state.amount), 'number':this.format_account_balance_figure(this.state.amount), 'barcolor':'', 'relativepower':token, })}
                    </div>
                    {this.show_buy_or_sell_limit(token)}
                </div>
            </div>
        )
    }

    show_buy_or_sell_limit(token){
        var action = this.get_selected_item(this.state.new_mint_dump_action_page_tags_object, 'e')
        if(action == this.props.app_state.loc['949']/* 'mint-buy' */){
            return(
                <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['959']/* 'Buy Limit' */, 'number':this.get_token_buy_limit(), 'relativepower':token})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['959']/* 'Buy Limit' */, 'subtitle':this.format_power_figure(this.get_token_buy_limit()), 'barwidth':this.calculate_bar_width(this.get_token_buy_limit()), 'number':this.format_account_balance_figure(this.get_token_buy_limit()), 'barcolor':'', 'relativepower':token, })}
                </div>
            )
        }else{
            return(
                <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['960']/* 'Sell Limit' */, 'number':this.get_token_sell_limit(), 'relativepower':token})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['960']/* 'Sell Limit' */, 'subtitle':this.format_power_figure(this.get_token_sell_limit()), 'barwidth':this.calculate_bar_width(this.get_token_sell_limit()), 'number':this.format_account_balance_figure(this.get_token_sell_limit()), 'barcolor':'', 'relativepower':token, })}
                </div>
            )
        }
    }

    calculate_and_show_buy_sell_impact_proportion(){
        var selected_object = this.state.token_item
        var token_type = selected_object['data'][0][3]
        var selected_obj_ratio_config = selected_object['data'][2];
        if(token_type == 3 && selected_object['id'] != 3){
            var exchanges_liquidity = selected_obj_ratio_config[2]
            var amount = this.state.amount
            var action = this.get_selected_item(this.state.new_mint_dump_action_page_tags_object, 'e')
            if(action == this.props.app_state.loc['949']/* 'mint-buy' */){
                var input_amount = this.state.amount
                var input_reserve_ratio = selected_object['data'][2][1]
                var output_reserve_ratio = selected_object['data'][2][0]
                amount = this.calculate_price(input_amount, input_reserve_ratio, output_reserve_ratio)
            }
            var impact_percentage = 0
            try{
                var big_int_amount = bigInt(amount)
                var big_int_liquidity = bigInt(exchanges_liquidity)
                impact_percentage = bigInt(big_int_amount).multiply(100).divide(big_int_liquidity)
            }catch(e){
                impact_percentage = ( amount * 100 ) / exchanges_liquidity
            }
            var p = impact_percentage+'%'
            var n = action == this.props.app_state.loc['949']/* 'mint-buy' */ ? '-' : ''

            return(
                <div>
                    <div style={{height:20}}/>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['996d']/* 'The impact proportion your transaction will have in the exchanges liquidity.' */, 'title':this.props.app_state.loc['996c']/* 'Transaction Impact' */})}
                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['996c']/* 'Transaction Impact' */, 'subtitle':this.format_power_figure(impact_percentage), 'barwidth':this.calculate_bar_width(impact_percentage), 'number':n+p, 'barcolor':'', 'relativepower':this.props.app_state.loc['996e']/* 'proportion' */, })}
                    </div>
                </div>
            )
        }
    }

    set_maximum(){
        var action = this.get_selected_item(this.state.new_mint_dump_action_page_tags_object, 'e')
        if(action == this.props.app_state.loc['949']/* 'mint-buy' */){
            var max = this.get_token_buy_limit()
            this.setState({amount: max})   
        }else{
            if(!bigInt(this.state.token_item['balance']).greater(this.get_token_sell_limit())){
                var max = this.state.token_item['balance']
                this.setState({amount: max})
            }else{
                var max = this.get_token_sell_limit()
                this.setState({amount: max})
            }
        }
        
    }

    set_price_data(){
        if(this.state.token_item['id'] != 0){
            var selected_object = this.state.token_item
            var action = this.get_selected_item(this.state.new_mint_dump_action_page_tags_object, 'e')
            if(action == this.props.app_state.loc['950']/* 'dump-sell' */){
                var input_amount = this.state.amount
                var input_reserve_ratio = selected_object['data'][2][0]
                var output_reserve_ratio = selected_object['data'][2][1]
                var price = this.calculate_price(input_amount, input_reserve_ratio, output_reserve_ratio)
                var buy_tokens = [].concat(selected_object['data'][3])
                var buy_amounts = [].concat(selected_object['data'][4])
                var buy_depths = [].concat(selected_object['data'][5])

                var exchanges_balance_amounts = [].concat(selected_object['exchanges_balances'])
                return(
                    <div>
                        {this.render_space()}
                        {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['962']/* 'The amount you get when selling the token' */, 'title':this.props.app_state.loc['963']/* 'Receive Amount' */})}
                        <div style={{height:10}}/>
                        <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                            <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                                {buy_tokens.map((item, index) => (
                                    <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.token_item['e5']+item], 'number':this.calculate_price_from_sell_action(buy_amounts[index], price), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                                        {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.token_item['e5']+item], 'subtitle':this.format_power_figure(this.calculate_price_from_sell_action(buy_amounts[index], price)), 'barwidth':this.calculate_bar_width(this.calculate_price_from_sell_action(buy_amounts[index], price)), 'number':this.format_account_balance_figure(this.calculate_price_from_sell_action(buy_amounts[index], price)), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div style={{height:20}}/>
                        {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['996f']/* 'Exchanges Liquidity.' */, 'details':this.props.app_state.loc['996g']/* 'The tokens the exchange has available to send to you after the sell action.' */})}
                        <div style={{height:10}}/>
                        {this.render_exchange_liquidity_values(buy_tokens, exchanges_balance_amounts)}
                    </div>
                )
            }else{
                var input_amount = this.state.amount
                var input_reserve_ratio = selected_object['data'][2][1]
                var output_reserve_ratio = selected_object['data'][2][0]
                var price = this.calculate_price(input_amount, input_reserve_ratio, output_reserve_ratio)
                var number = ''
                if(parseInt(price) == 0){
                    number = '0'
                }else{
                    number = this.format_account_balance_figure(price)
                }
                return(
                    <div>
                        <div style={{height:20}}/>
                        {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['965']/* 'The amount youll probably get from the buy action' */, 'title':this.props.app_state.loc['966']/* 'Receive Amount' */})}
                        <div style={{height:10}}/>
                        <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.token_item['e5']+this.state.token_item['id']], 'number':number, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']]})}>
                            {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.token_item['e5']+this.state.token_item['id']], 'subtitle':this.format_power_figure(price), 'barwidth':this.calculate_bar_width(price), 'number':number, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']]})}
                        </div>
                    </div>
                    
                )
            }
        }
    }

    render_exchange_liquidity_values(buy_tokens, exchanges_balance_amounts){
        var selected_object = this.state.token_item
        if(selected_object['id'] != 3){
            return(
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                        {buy_tokens.map((item, index) => (
                            <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[selected_object['e5']+item], 'number':exchanges_balance_amounts[index], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                                {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[selected_object['e5']+item], 'subtitle':this.format_power_figure(exchanges_balance_amounts[index]), 'barwidth':this.calculate_bar_width(exchanges_balance_amounts[index]), 'number':this.format_account_balance_figure(exchanges_balance_amounts[index]), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }else{
            var e5 = selected_object['e5']
            return(
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '15px 0px 0px 5px','border-radius': '8px' }} >
                    <div>
                        {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['996j']/* 'E5 Ether balance in Ether' */, 'subtitle':this.format_power_figure(this.props.app_state.E5_balance[e5]/10**18), 'barwidth':this.calculate_bar_width(this.props.app_state.E5_balance[e5]/10**18), 'number':(this.props.app_state.E5_balance[e5]/10**18), 'relativepower':'Ether'})}
                    </div>

                    <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['2235']/* 'E5 Ether balance in Wei' */, 'number':this.props.app_state.E5_balance[e5], 'relativepower':'wei'})}>
                        {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['2235']/* 'E5 Ether balance in Wei' */, 'subtitle':this.format_power_figure(this.props.app_state.E5_balance[e5]), 'barwidth':this.calculate_bar_width(this.props.app_state.E5_balance[e5]), 'number':this.format_account_balance_figure(this.props.app_state.E5_balance[e5]), 'relativepower':'wei'})}
                    </div>
                </div>
            )
        }
    }

    render_space(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    <div style={{height:20}}/>
                </div>
            )
        }
    }

    calculate_price(input_amount, input_reserve_ratio, output_reserve_ratio){
        var selected_object = this.state.token_item
        var token_type = selected_object['data'][0][3]
        if(input_reserve_ratio == 0 || output_reserve_ratio == 0 || input_amount == 0){
            return 0
        }
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


    render_fees_for_action_title(){
        var action = this.get_selected_item(this.state.new_mint_dump_action_page_tags_object, 'e')
        if(action == this.props.app_state.loc['949']/* 'mint-buy' */){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['967']/* 'Amount set to submit for the buy action' */, 'title':this.props.app_state.loc['968']/* 'Fees for Action' */})}

                    <div style={{height:10}}/>
                    {this.render_buy_token_uis(this.state.token_item['data'][3], this.calculate_token_prices(this.state.token_item['data'][4]), this.state.token_item['data'][5])}
                </div>
            )
        }
    }

    calculate_token_prices(buy_amounts){
        var amount = this.state.amount
        var return_buy_amounts = buy_amounts.slice()
        for(var i = 0; i < buy_amounts.length; i++){
            return_buy_amounts[i] = bigInt(bigInt(buy_amounts[i]).multiply(bigInt(amount)) )
        }
        return return_buy_amounts
    }

    render_buy_token_uis(buy_tokens, buy_amounts, buy_depths){
        var bt = [].concat(buy_tokens)
        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px', 'list-style':'none'}}>
                    {bt.map((item, index) => (
                        <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.token_item['e5']+item], 'number':buy_amounts[index], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                            {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.token_item['e5']+item], 'subtitle':this.format_power_figure(buy_amounts[index]), 'barwidth':this.calculate_bar_width(buy_amounts[index]), 'number':this.format_account_balance_figure(buy_amounts[index]), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                        </li>
                    ))}
                </ul>
            </div>
            
        )
    }

    get_number_limit(){
        // if(this.state.token_item['data'] != null){
        //     return this.state.token_item['data'][1][0]
        // }
        // else 
        return bigInt('1e72')
    }

    get_token_buy_limit(){
        if(this.state.token_item['data'] != null){
            return this.state.token_item['data'][1][0]
        }
        else return 1
    }

    get_token_sell_limit(){
        if(this.state.token_item['data'] != null){
            return this.state.token_item['data'][1][11]
        }
        else return 1
    }

    when_recipient_input_field_changed(text){
        this.setState({recipient_id: text})
    }

    when_amount_set(amount){
        this.setState({amount: amount})
    }

    render_my_balances_if_buy_action(){
        var e5 = this.state.token_item['e5'];
        var buy_tokens = this.state.token_item['data'][3]
        var buy_amount_balances = []
        var buy_depths = this.state.token_item['data'][5]

        for(var i=0; i<buy_tokens.length; i++){
            var token_id = buy_tokens[i]
            // var token_balance = this.props.app_state.created_token_object_mapping[e5][token_id]
            // token_balance = token_balance == null ? 0 : token_balance['balance']
            var token_balance = this.props.calculate_actual_balance(e5, token_id)
            var my_ether_balance = this.props.app_state.account_balance[e5] == null ? 0 : this.props.app_state.account_balance[e5]
            if(token_id == 0) token_balance = my_ether_balance
            buy_amount_balances.push(token_balance)
        }
        var action = this.get_selected_item(this.state.new_mint_dump_action_page_tags_object, 'e')
        if(action == this.props.app_state.loc['949']/* 'mint-buy' */){
            return(
                <div>
                    <div style={{height:20}}/>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['969']/* 'The amounts you have available for buying the token' */, 'title':this.props.app_state.loc['970']/* 'Your balances' */})}
                    <div style={{height:10}}/>

                    {this.render_buy_token_uis(buy_tokens, buy_amount_balances, buy_depths)}
                </div>
            )
        }
    }



    get_typed_alias_id(alias){
        if(!isNaN(alias)){
            return alias
        }
        var id = (this.props.app_state.alias_owners[this.state.token_item['e5']][alias] == null ? 
            alias : this.props.app_state.alias_owners[this.state.token_item['e5']][alias])

        return id
    }

    check_if_sender_has_tokens_for_sell(){
        if(!bigInt(this.state.token_item['balance']).greaterOrEquals(this.state.amount)){
            return false
        }
        return true
    }

    check_if_sender_has_tokens_for_buy(){
        var e5 = this.state.token_item['e5']
        var buy_tokens = this.state.token_item['data'][3]
        var required_amounts = this.calculate_token_prices(this.state.token_item['data'][4])
        var affordable = true;

        for(var i=0; i<buy_tokens.length; i++){
            var token_id = buy_tokens[i]
            // var token_balance = this.props.app_state.created_token_object_mapping[e5][token_id]
            // token_balance = token_balance == null ? 0 : token_balance['balance']
            var token_balance = this.props.calculate_actual_balance(e5, token_id)
            var my_ether_balance = this.props.app_state.account_balance[e5] == null ? 0 : this.props.app_state.account_balance[e5]
            if(token_id == 0) token_balance = my_ether_balance
            var required_amount = required_amounts[i]

            if(bigInt(token_balance).lesser(required_amount)){
                affordable = false
            }
        }
        return affordable
    }


    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }


    load_account_suggestions(){
        var items = [].concat(this.get_suggested_accounts())
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                      {items.map((item, index) => (
                          <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_suggestion_clicked(item, index)}>
                              {this.render_detail_item('3', item['label'])}
                          </li>
                      ))}
                  </ul>
                </div>
        )
    }

    get_suggested_accounts(){
        return[
            {'id':'53', 'label':{'title':this.props.app_state.loc['971']/* 'My Account' */, 'details':this.props.app_state.loc['972']/* 'Account' */, 'size':'s'}},
        ].concat(this.get_account_suggestions())
    }

    get_account_suggestions(){
        var contacts = this.props.app_state.contacts[this.state.token_item['e5']]
        if(contacts == null) contacts = [];
        var return_array = []
        contacts.forEach(contact => {
            if(contact['id'].toString().includes(this.state.recipient_id)){
                return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
            }
        });
        return return_array;
    }

    get_contact_alias(contact){
        return (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[contact['id']] == null ? ((contact['address'].toString()).substring(0, 9) + "...") : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[contact['id']])
    }

    when_suggestion_clicked(item, pos){
        this.setState({recipient_id: item['id']})
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




    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
            </div>
        )

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

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
    }


    



    set_upper_lower_bounds(){
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['973']/* 'The transaction will revert if you dont receive your tokens specified in the range set below.' */, 'title':this.props.app_state.loc['974']/* 'Upper Lower Bounds (optional)' */})}

                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['975']/* 'Upper Bound' */, 'subtitle':this.format_power_figure(this.state.upper_bound), 'barwidth':this.calculate_bar_width(this.state.upper_bound), 'number':this.format_account_balance_figure(this.state.upper_bound), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']], })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_upper_bound_set.bind(this)} theme={this.props.theme} power_limit={63}/>

                <div style={{height:20}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['976']/* 'Lower Bound' */, 'subtitle':this.format_power_figure(this.state.lower_bound), 'barwidth':this.calculate_bar_width(this.state.lower_bound), 'number':this.format_account_balance_figure(this.state.lower_bound), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']], })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_lower_bound_set.bind(this)} theme={this.props.theme} power_limit={63}/>

            </div>
        )
    }

    when_upper_bound_set(number){
        this.setState({upper_bound: number})
    }

    when_lower_bound_set(number){
        this.setState({lower_bound: number})
    }





    finish(){
        var amount = this.state.amount
        var recipient = this.state.recipient_id.trim()
        var action = this.get_selected_item(this.state.new_mint_dump_action_page_tags_object, 'e')
        var stack_action = 1
        if(action == this.props.app_state.loc['949']/* 'mint-buy' */) stack_action = 0

        var selected_object = this.state.token_item
        var input_amount = amount
        var input_reserve_ratio = selected_object['data'][2][0]
        var output_reserve_ratio = selected_object['data'][2][1]
        if(action == this.props.app_state.loc['949']/* 'mint-buy' */){
            input_reserve_ratio = selected_object['data'][2][1]
            output_reserve_ratio = selected_object['data'][2][0]
        }
        var price = this.calculate_price(input_amount, input_reserve_ratio, output_reserve_ratio)
        var can_make_swap_obj = this.check_if_sender_can_make_swap();
        var can_make_swap = can_make_swap_obj.can_make_swap
        var reason = can_make_swap_obj.reason

        if(isNaN(recipient) || parseInt(recipient) < 0 || recipient == ''){
            this.props.notify(this.props.app_state.loc['977']/* 'Please put a valid account ID.' */, 3600)
        }
        else if(amount == 0){
            this.props.notify(this.props.app_state.loc['978']/* 'Please put a valid amount.' */, 3600)
        }
        else if(price < 1){
            this.props.notify(this.props.app_state.loc['979']/* 'That amount is too low.' */, 3600)
        }
        else if(stack_action == 1/* sell-action */ && !this.check_if_liquidity_is_available_for_sell(price)){
            this.props.notify(this.props.app_state.loc['996h']/* 'The exchange doesn\'t have enough liquidity to fulfil that sell.' */, 6600)
        }
        else{
            if(!this.check_if_sender_has_tokens_for_sell() && action == this.props.app_state.loc['950']/* 'dump-sell' */){
                this.props.notify(this.props.app_state.loc['980']/* 'You dont have enough tokens for that sell action.' */, 4500)
            }
            else if(!this.check_if_sender_has_tokens_for_buy() && action == this.props.app_state.loc['949']/* 'mint-buy' */){
                this.props.notify(this.props.app_state.loc['981']/* 'You dont have enough tokens to buy that much.' */, 4500)
            }
            else if(!this.check_if_sender_can_interact_with_exchange()){
                this.props.notify(this.props.app_state.loc['982']/* 'You cant interact with the same exchange twice in one run.' */, 4200)
            }
            else if(bigInt(amount).greater(this.get_token_buy_limit()) && action == 'mint-buy'){
                this.props.notify(this.props.app_state.loc['983']/* 'The amount youve set exceeds the maximum buy amount enforced by the exchange.' */, 7500)
            }
            else if(bigInt(amount).greater(this.get_token_sell_limit()) && action == 'dump-sell'){
                this.props.notify(this.props.app_state.loc['984']/* 'The amount youve set exceeds the maximum sell amount enforced by the exchange.' */, 7500)
            }
            else if(!can_make_swap){
                this.props.notify(reason, 5500)
            }
            // else if(!this.check_if_sender_can_sell_end_tokens()){
            //     this.props.notify(this.props.app_state.loc['']/* 'You cant sell end while having a withdraw balance. Withdraw your ether first.' */,7500)
            // }
            else{
                this.props.add_buy_sell_transaction_to_stack(this.state)
                this.setState({amount:0, recipient_id:''})
                this.props.notify(this.props.app_state.loc['18']/* 'transaction added to stack' */, 1600)
            }
        }
    }

    check_if_sender_can_interact_with_exchange(){
        var stack_transactions = this.props.app_state.stack_items
        for(var i=0; i<stack_transactions.length; i++){
            if(stack_transactions[i].type == this.props.app_state.loc['946']/* 'buy-sell' */ && stack_transactions[i].token_item['id'] == this.state.token_item['id'] && stack_transactions[i].id != this.state.id && stack_transactions[i].e5 == this.props.app_state.selected_e5){
                return false
            }
        }
        return true
    }

    check_if_sender_can_make_swap(){
        var selected_object = this.state.token_item
        var selected_obj_config = selected_object['data'][1];
        var e5 = selected_object['e5']

        var minimum_entered_contracts_between_swap = selected_obj_config[13]
        var minimum_transactions_between_swap = selected_obj_config[2]
        var minimum_blocks_between_swap = selected_obj_config[3]
        var minimum_time_between_swap = selected_obj_config[4]

        var minimum_transactions_for_first_buy = selected_obj_config[17]
        var minimum_entered_contracts_for_first_buy = selected_obj_config[18]

        var last_swap_block = selected_object['account_data'][0]
        var last_swap_timestamp = selected_object['account_data'][1]
        var last_swap_transaction_count = selected_object['account_data'][2]
        var last_entered_contracts_count = selected_object['account_data'][3]

        var timestamp = Date.now()/1000
        var current_block = this.props.app_state.number_of_blocks[e5];
        var current_entered_contracts_count = this.props.app_state.basic_transaction_data[e5][2]
        var current_transaction_count = this.props.app_state.basic_transaction_data[e5][3]

        var can_make_swap = true;
        var reason = ''

        if(last_swap_block != 0){
            if(minimum_entered_contracts_between_swap != 0){
                var diff = current_entered_contracts_count - last_entered_contracts_count
                // console.log('-------------------------check_if_sender_can_make_swap-----------------------')
                // console.log('current_entered_contracts_count: ',current_entered_contracts_count)
                // console.log('last_entered_contracts_count: ',last_entered_contracts_count)
                // console.log('diff: ', diff)
                // console.log('minimum_entered_contracts_between_swap: ', minimum_entered_contracts_between_swap)
                if(diff < minimum_entered_contracts_between_swap){
                    can_make_swap = false;
                    reason = this.props.app_state.loc['985']/* 'You need to enter ' */+(minimum_entered_contracts_between_swap-diff)+this.props.app_state.loc['986']/* ' more contracts first' */
                }
            }
            if(minimum_transactions_between_swap != 0){
                var diff = current_transaction_count - last_swap_transaction_count
                console.log('------------------------check_if_sender_can_make_swap-------------------------------')
                console.log('diff: ',diff)
                console.log('minimum_transactions_between_swap: ', minimum_transactions_between_swap)
                if(diff < minimum_transactions_between_swap){
                    can_make_swap = false;
                    reason = this.props.app_state.loc['987']/* 'You need to make ' */+(minimum_transactions_between_swap-diff)+this.props.app_state.loc['988']/* ' more runs first' */
                }
            }
            if(minimum_blocks_between_swap != 0){
                var diff = current_block - last_swap_block
                if(diff < minimum_blocks_between_swap){
                    can_make_swap = false
                    reason = this.props.app_state.loc['989']/* 'You need to wait ' */+(minimum_blocks_between_swap-diff)+this.props.app_state.loc['990']/* ' more blocks' */
                }
            }
            if(minimum_time_between_swap != 0){
                var diff = timestamp - last_swap_timestamp
                if(diff < minimum_time_between_swap){
                    can_make_swap = false
                    reason = this.props.app_state.loc['991']/* 'You need to wait about ' */+(this.get_time_diff(minimum_time_between_swap-diff))+this.props.app_state.loc['992']/* ' first' */
                }
            }
        }
        
        if(minimum_transactions_for_first_buy != 0){
            console.log('------------------------check_if_sender_can_make_swap-------------------------------')
            console.log('current_transaction_count: ',current_transaction_count)
            console.log('minimum_transactions_for_first_buy: ', minimum_transactions_for_first_buy)
            if(current_transaction_count < minimum_transactions_for_first_buy){
                can_make_swap = false
                reason = this.props.app_state.loc['993']/* 'You need to make ' */+(minimum_transactions_for_first_buy-current_transaction_count)+this.props.app_state.loc['994']/* ' more runs first' */
            }
        }
        if(minimum_entered_contracts_for_first_buy != 0){
            if(current_entered_contracts_count<minimum_entered_contracts_for_first_buy){
                can_make_swap = false
                reason = this.props.app_state.loc['995']/* 'You need to enter ' */+(minimum_entered_contracts_for_first_buy-current_entered_contracts_count)+this.props.app_state.loc['996']/* ' more contracts first' */
            }
        }
        


        return {can_make_swap:can_make_swap, reason: reason}
    }

    check_if_sender_can_sell_end_tokens(){
        var action = this.get_selected_item(this.state.new_mint_dump_action_page_tags_object, 'e')
        if(action == this.props.app_state.loc['950']/* 'dump-sell' */ && this.state.token_item['id'].toString() == '3'){
            var e5 = this.state.token_item['e5']
            var withdraw_balance = this.props.app_state.withdraw_balance[e5]
            if(withdraw_balance != 0){
                return false
            }
        }

        return true
    }

    check_if_liquidity_is_available_for_sell(price){
        var selected_object = this.state.token_item
        if(selected_object['id'] == 3) return true;
        var buy_tokens = [].concat(selected_object['data'][3])
        var exchanges_balance_amounts = [].concat(selected_object['exchanges_balances'])
        var buy_amounts = [].concat(selected_object['data'][4])
        var is_liquidity_available = true
        for(var i=0; i<buy_tokens.length; i++){
            var sell_amount = this.calculate_price_from_sell_action(buy_amounts[i], price)
            if(bigInt(exchanges_balance_amounts[i]).lesser(sell_amount)){
                is_liquidity_available = false
            }
        }
        return is_liquidity_available
    }


    set_token(item){
        var current_token_id = this.state.token_item == null ? 1 : this.state.token_item['id']
        if(current_token_id != item['id']){
            this.setState({
                selected: 0, id:makeid(8), type:this.props.app_state.loc['946']/* 'buy-sell' */, entered_indexing_tags:[this.props.app_state.loc['948']/* 'dump' */, this.props.app_state.loc['947']/* 'mint' */,this.props.app_state.loc['883']/* 'token' */],
                new_mint_dump_action_page_tags_object: this.get_new_mint_dump_action_page_tags_object(),
                recipient_id:'', amount:0, token_item: {'balance':1, 'data':[[],[],[],[],[]], 'id':0}
            })
        }
        this.setState({token_item: item, e5: item['e5']})

        if(this.is_token_buy_exclusive(item)){
            this.set_exclusive()
        }
        if(this.is_token_like_spend(item)){
            var mint_limit = item['data'][1][0/* <0>default_exchange_amount_buy_limit, */]
            this.setState({hide_number_picker: true, amount: mint_limit})
        }
    }

    is_token_buy_exclusive(token_item){
        var sell_limit = token_item['data'][1][11/* <11>default_exchange_amount_sell_limit */]
        if(sell_limit == 0) return true
        return false
    }

    is_token_like_spend(token_item){
        var buy_data = token_item['data'][3]
        var buy_amounts = token_item['data'][4]
        var buy_token_exists = false
        buy_data.forEach((item, index) => {
            if(buy_data[index] != 0 && buy_amounts[index] != 0){
                buy_token_exists = true
            }
        });

        if(token_item['id'] == 3){
            buy_token_exists = true
        }

        return buy_token_exists == false
    }


}




export default NewMintActionPage;