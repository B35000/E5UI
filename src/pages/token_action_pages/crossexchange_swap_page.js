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
import ViewGroups from '../../components/view_groups'
import Tags from '../../components/tags';
import TextInput from '../../components/text_input';
import NumberPicker from '../../components/number_picker';
import DurationPicker from '../../components/duration_picker';
import Slider from '../../components/slider'
import MySwipeableViews from '../../components/my_swipeable_views';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Draggable } from "react-drag-reorder";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

class CrossexchangeSwapPage extends Component {
    
    state = {
        selected: 0, token_item: null,
        id: makeid(8), type:this.props.app_state.loc['3108']/* 'crossexchange-swap' */, entered_indexing_tags:[this.props.app_state.loc['947']/* 'mint' */, this.props.app_state.loc['948']/* 'dump' */, this.props.app_state.loc['3108a']/* 'crossexchange' */, this.props.app_state.loc['3108b']/* swap */],
        new_mint_dump_action_page_tags_object:this.new_mint_dump_action_page_tags_object(),

        recipient_id:'', amount:0
    };


    new_mint_dump_action_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['949']/* 'mint-buy' */, this.props.app_state.loc['950']/* 'dump-sell' */], [1]
            ],
        };
    }


    set_token(object){
        this.setState({token_item: object, e5: object['e5']})
    }






    render(){
        return(
            <div style={{'padding':'10px 20px 0px 10px'}}>
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.new_mint_dump_action_page_tags_object} tag_size={'l'} when_tags_updated={this.when_new_transfer_stake_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img alt="" className="text-end" onClick={()=>this.finish()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div>

                <div style={{'margin':'10px 0px 0px 0px'}}>
                    {this.render_everything()}   
                </div>
            </div>
        )
    }

    when_new_transfer_stake_title_tags_object_updated(tag_obj){
        this.setState({new_mint_dump_action_page_tags_object: tag_obj})
    }




    render_everything(){
        if(this.state.token_item == null) return;
        const selected_item = this.get_selected_item(this.state.new_mint_dump_action_page_tags_object, 'e')

        if(selected_item == this.props.app_state.loc['949']/* 'mint-buy' */){
            return this.render_mint_buy_action_data()
        }
        else if(selected_item == this.props.app_state.loc['950']/* 'dump-sell' */){
            return this.render_dump_sell_action_data()
        }
    }


    render_mint_buy_action_data(){
        var size = this.props.app_state.size
        if(size == 's'){
            return(
                <div>
                    {this.render_mint_buy_action_ui()}
                    {this.render_detail_item('0')}
                    {this.render_mint_buy_action_ui2()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_mint_buy_action_ui()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_mint_buy_action_ui2()}
                    </div>
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_mint_buy_action_ui()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_mint_buy_action_ui2()}
                    </div>
                </div>
            )
        }
    }


    render_mint_buy_action_ui(){
        const object = this.state.token_item
        const token_target = object['ipfs'].token_target
        const target_symbol = this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[token_target]
        const my_balance = this.get_my_target_balance()
        const target_type = this.get_selected_item2(object['ipfs'].new_exchange_or_certificate_target_title_tags_object, 'e')
        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'15px', 'text':this.props.app_state.loc['3108c']/* 'Swap and acquire the cross-exchange\'s target token $' */.replace('$', target_symbol)})}
                <div style={{height:10}}/>

                {target_type == 1/* exchange */ && (
                    <div>
                        <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['952']/* 'Your Balance' */, 'number':my_balance, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[token_target]})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['952']/* 'Your Balance' */, 'subtitle':this.format_power_figure(my_balance), 'barwidth':this.calculate_bar_width(my_balance), 'number':this.format_account_balance_figure(my_balance), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[token_target], })}
                        </div>

                    </div>
                )}

                {target_type == 2/* certificate */ && (
                    <div>
                        <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                            {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['3055pp']/* 'Your Fractionalized Stake.' */, 'subtitle':this.format_power_figure((my_balance / 10**18) * 100), 'barwidth':this.calculate_bar_width((my_balance / 10**18) * 100), 'number':((my_balance / 10**18) * 100)+'%', 'relativepower':this.props.app_state.loc['1881']/* proportion */})}
                        </div>
                    </div>
                )}

                {this.render_detail_item('0')}
                
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['953']/* 'Set the recipient of the mint/dump action' */, 'title':this.props.app_state.loc['954']/* 'Recipient of action' */})}
                
                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['955']/* 'Recipient ID' */} when_text_input_field_changed={this.when_recipient_input_field_changed.bind(this)} text={this.state.recipient_id} theme={this.props.theme}/>
                {this.load_account_suggestions()}


                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['956']/* 'Set the amount of tokens your submitting for the mint/buy action.' */, 'title':this.props.app_state.loc['957']/* 'Amount for action' */})}
                <div style={{height:10}}/>
                
                {this.render_buy_token_uis(object, this.state.amount)}
                <div style={{height:10}}/>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_amount_set.bind(this)} theme={this.props.theme} power_limit={63} pick_with_text_area={this.should_show_text_area()} text_area_hint={target_type == 1/* exchange */ ? '1000' : '2.3%'}/>

                <div style={{'padding': '5px'}} onClick={()=>this.set_buy_maximum()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['961']/* 'Set Maximum' */, 'action':''})}
                </div>
            </div>
        )
    }

    when_amount_set(number){
        this.setState({amount: number})
    }

    when_recipient_input_field_changed(text){
        this.setState({recipient_id: text})   
    }

    get_my_target_balance(){
        const object = this.state.token_item
        const token_target = object['ipfs'].token_target

        const target_type = this.get_selected_item2(object['ipfs'].new_exchange_or_certificate_target_title_tags_object, 'e')

        if(target_type == 1/* exchange */){
            return this.props.calculate_actual_balance(object['e5'], token_target)
        }
        else if(target_type == 2/* certificate */){
            const certificate = this.get_fractionalized_certificate_object_by_id(token_target, object['e5'])
            if(certificate == null) return 0;
            return certificate['balance']
        }
    }

    get_fractionalized_certificate_object_by_id(id, e5){
        const certificate_ids = Object.keys(this.props.app_state.fractionalized_assets)
        const exchanges_from_sync = []
        certificate_ids.forEach(certificate_id => {
            const exchange_ids = Object.keys(this.props.app_state.fractionalized_assets[certificate_id])
            exchange_ids.forEach(exchange_id => {
                exchanges_from_sync.push(this.props.app_state.fractionalized_assets[certificate_id][exchange_id])
            });
        });

        const filtered_objects = exchanges_from_sync.filter((cert_object) => {
            return (cert_object['id'] == id && cert_object['e5'] == e5)
        });

        if(filtered_objects.length == 0) return;
        return filtered_objects[0]
    }

    render_buy_token_uis(object, amount){
        var buy_tokens = [].concat(object['data'][3])
        var buy_amounts = [].concat(object['data'][4])
        var buy_depths = [].concat(object['data'][5])
        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                <div style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                    {buy_tokens.map((item, index) => (
                        <div style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+item], 'number':this.calculate_submit_price(buy_amounts[index], amount), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                            {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+item], 'subtitle':this.format_power_figure(this.calculate_submit_price(buy_amounts[index], amount)), 'barwidth':this.calculate_bar_width(this.calculate_submit_price(buy_amounts[index], amount)), 'number':this.format_account_balance_figure(this.calculate_submit_price(buy_amounts[index], amount)), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                        </div>
                    ))}
                </div>
            </div>
            
        )
    }

    calculate_submit_price(buy_amount, selected_proportion){
        return bigInt(buy_amount).times(selected_proportion)
    }

    should_show_text_area(){
        var action = this.get_selected_item(this.state.new_mint_dump_action_page_tags_object, 'e')
        if(action == this.props.app_state.loc['949']/* 'mint-buy' */){
            return this.get_token_buy_limit() < 1_000_000_000
        }else{
            return this.get_token_sell_limit() < 1_000_000_000
        }
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

    set_buy_maximum(){
        var max = this.get_token_buy_limit()
        this.setState({amount: max})  
    }




    render_mint_buy_action_ui2(){
        const object = this.state.token_item
        const token_target = object['ipfs'].token_target
        const target_symbol = this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[token_target]
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3108d']/* 'The buy limit for swapping for the cross-exchange target token $' */.replace('$', target_symbol), 'title':this.props.app_state.loc['959']/* 'Buy Limit' */})}
                <div style={{height:10}}/>
                
                {this.render_buy_token_uis(object, this.get_token_buy_limit())}
                
                {this.render_my_balances_if_buy_action()}
                
                {this.set_price_data()}
                
                {this.calculate_and_show_buy_sell_impact_proportion()}
            </div>
        )
    }

    render_buy_token_uis2(buy_tokens, buy_amounts, buy_depths){
        const e5 = this.state.token_item['e5']
        var bt = [].concat(buy_tokens)
        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px', 'list-style':'none'}}>
                    {bt.map((item, index) => (
                        <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'number':buy_amounts[index], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                            {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'subtitle':this.format_power_figure(buy_amounts[index]), 'barwidth':this.calculate_bar_width(buy_amounts[index]), 'number':this.format_account_balance_figure(buy_amounts[index]), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                        </li>
                    ))}
                </ul>
            </div>
            
        )
    }

    render_my_balances_if_buy_action(){
        var e5 = this.state.token_item['e5'];
        var buy_tokens = this.state.token_item['data'][3]
        var buy_amount_balances = []
        var buy_depths = this.state.token_item['data'][5]

        for(var i=0; i<buy_tokens.length; i++){
            var token_id = buy_tokens[i]
            var token_balance = this.props.calculate_actual_balance(e5, token_id)
            var my_ether_balance = this.props.app_state.account_balance[e5] == null ? 0 : this.props.app_state.account_balance[e5]
            buy_amount_balances.push(token_balance)
        }
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3108e']/* 'The amounts you have available for the swap.' */, 'title':this.props.app_state.loc['970']/* 'Your balances' */})}
                <div style={{height:10}}/>
                {this.render_buy_token_uis2(buy_tokens, buy_amount_balances, buy_depths)}
            </div>
        )
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
                        {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3108f']/* 'The amount youll probably get from the sell action.' */, 'title':this.props.app_state.loc['963']/* 'Receive Amount' */})}
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
                const object = this.state.token_item
                const token_target = object['ipfs'].token_target
                const target_symbol = this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[token_target]
                return(
                    <div>
                        {this.render_detail_item('0')}
                        {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['965']/* 'The amount youll probably get from the buy action' */, 'title':this.props.app_state.loc['966']/* 'Receive Amount' */})}
                        <div style={{height:10}}/>
                        <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.token_item['e5']+token_target], 'number':number, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[token_target]})}>
                            {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.token_item['e5']+token_target], 'subtitle':this.format_power_figure(price), 'barwidth':this.calculate_bar_width(price), 'number':number, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[token_target]})}
                        </div>
                    </div>
                    
                )
            }
        }
    }

    render_space(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_detail_item('0')}
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
                if(amount > 10**13){
                    var big_int_amount = bigInt(amount)
                    var big_int_liquidity = bigInt(exchanges_liquidity)
                    impact_percentage = bigInt(big_int_amount).multiply(100).divide(big_int_liquidity)
                }else{
                    impact_percentage = parseFloat((amount * 100) / exchanges_liquidity).toFixed(3)
                }
            }catch(e){
                impact_percentage = 99.999
            }
            var p = impact_percentage+'%'
            var n = action == this.props.app_state.loc['949']/* 'mint-buy' */ ? '-' : ''

            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['996d']/* 'The impact proportion your transaction will have in the exchanges liquidity.' */, 'title':this.props.app_state.loc['996c']/* 'Transaction Impact' */})}
                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['996c']/* 'Transaction Impact' */, 'subtitle':this.format_power_figure(impact_percentage), 'barwidth':this.calculate_bar_width(impact_percentage), 'number':n+p, 'barcolor':'', 'relativepower':this.props.app_state.loc['996e']/* 'proportion' */, })}
                    </div>
                </div>
            )
        }
    }

    render_exchange_liquidity_values(buy_tokens, exchanges_balance_amounts){
        const selected_object = this.state.token_item
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
    }







    render_dump_sell_action_data(){
        var size = this.props.app_state.size
        if(size == 's'){
            return(
                <div>
                    {this.render_dump_sell_action_ui()}
                    {this.render_detail_item('0')}
                    {this.render_dump_sell_action_ui2()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_dump_sell_action_ui()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_dump_sell_action_ui2()}
                    </div>
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_dump_sell_action_ui()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_dump_sell_action_ui2()}
                    </div>
                </div>
            )
        }
    }


    render_dump_sell_action_ui(){
        const object = this.state.token_item
        const token_target = object['ipfs'].token_target
        const target_symbol = this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[token_target]
        const my_balance = this.get_my_target_balance()
        const target_type = this.get_selected_item2(object['ipfs'].new_exchange_or_certificate_target_title_tags_object, 'e')

        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'15px', 'text':this.props.app_state.loc['3108g']/* 'Swap and dump the cross-exchange\'s target token $' */.replace('$', target_symbol)})}
                <div style={{height:10}}/>

                {target_type == 1/* exchange */ && (
                    <div>
                        <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['952']/* 'Your Balance' */, 'number':my_balance, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[token_target]})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['952']/* 'Your Balance' */, 'subtitle':this.format_power_figure(my_balance), 'barwidth':this.calculate_bar_width(my_balance), 'number':this.format_account_balance_figure(my_balance), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[token_target], })}
                        </div>

                    </div>
                )}

                {target_type == 2/* certificate */ && (
                    <div>
                        <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                            {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['3055pp']/* 'Your Fractionalized Stake.' */, 'subtitle':this.format_power_figure((my_balance / 10**18) * 100), 'barwidth':this.calculate_bar_width((my_balance / 10**18) * 100), 'number':((my_balance / 10**18) * 100)+'%', 'relativepower':this.props.app_state.loc['1881']/* proportion */})}
                        </div>
                    </div>
                )}

                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['953']/* 'Set the recipient of the mint/dump action' */, 'title':this.props.app_state.loc['954']/* 'Recipient of action' */})}
                
                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['955']/* 'Recipient ID' */} when_text_input_field_changed={this.when_recipient_input_field_changed.bind(this)} text={this.state.recipient_id} theme={this.props.theme}/>
                {this.load_account_suggestions()}


                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3108h']/* 'Set the amount of tokens your submitting for the dump/sell action.' */, 'title':this.props.app_state.loc['957']/* 'Amount for action' */})}
                <div style={{height:10}}/>
                
                {target_type == 1/* exchange */ && (
                    <div>
                        <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['952']/* 'Your Balance' */, 'number':this.state.amount, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[token_target]})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['952']/* 'Your Balance' */, 'subtitle':this.format_power_figure(this.state.amount), 'barwidth':this.calculate_bar_width(this.state.amount), 'number':this.format_account_balance_figure(this.state.amount), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[token_target], })}
                        </div>

                    </div>
                )}

                {target_type == 2/* certificate */ && (
                    <div>
                        <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                            {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['3108i']/* 'Fractionalized Stake Proportion.' */, 'subtitle':this.format_power_figure((this.state.amount / 10**18) * 100), 'barwidth':this.calculate_bar_width((this.state.amount / 10**18) * 100), 'number':((this.state.amount / 10**18) * 100)+'%', 'relativepower':this.props.app_state.loc['1881']/* proportion */})}
                        </div>
                    </div>
                )}
                <div style={{height:10}}/>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_amount_set.bind(this)} theme={this.props.theme} power_limit={63} pick_with_text_area={this.should_show_text_area()} text_area_hint={target_type == 1/* exchange */ ? '1000' : '2.3%'}/>

                <div style={{'padding': '5px'}} onClick={()=>this.set_sell_maximum()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['961']/* 'Set Maximum' */, 'action':''})}
                </div>
            </div>
        )
    }

    set_sell_maximum(){
        const my_balance = this.get_my_target_balance()
        if(!bigInt(my_balance).greater(this.get_token_sell_limit())){
            var max = my_balance
            this.setState({amount: max})
        }else{
            var max = this.get_token_sell_limit()
            this.setState({amount: max})
        }
    }


    render_dump_sell_action_ui2(){
        return(
            <div>
                {this.set_price_data()}
                
                {this.calculate_and_show_buy_sell_impact_proportion()}
            </div>
        )
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
        return_array = this.filter_and_add_other_accounts(this.state.recipient_id, return_array)
        return return_array;
    }

    filter_and_add_other_accounts(typed_name, return_array){
        if(typed_name.length < 3){
            return return_array
        }
        const added_aliases = []
        return_array.forEach(item => {
            added_aliases.push(item['label']['details'])
        });

        return return_array.concat(this.get_all_aliases(added_aliases, typed_name))
    }

    get_all_aliases(added_aliases, typed_name){
        const aliases = []
        const e5 = this.state.token_item['e5']
        if(this.props.app_state.alias_bucket[e5] == null) return []
        const accounts = Object.keys(this.props.app_state.alias_bucket[e5])
        accounts.forEach(account_id => {
            const alias = this.props.app_state.alias_bucket[e5][account_id]
            if(!added_aliases.includes(alias) && alias.startsWith(typed_name.toLowerCase())){
                aliases.push({'id':account_id,'label':{'title':account_id, 'details':alias, 'size':'s'}})
            }
        });

        return aliases
    }

    get_contact_alias(contact){
        return (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[contact['id']] == null ? ((contact['address'].toString()).substring(0, 9) + "...") : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[contact['id']])
    }

    when_suggestion_clicked(item, pos){
        this.setState({recipient_id: item['id']})
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
            this.props.notify(this.props.app_state.loc['996h']/* 'The exchange doesn\'t have enough funds to fulfil that sell.' */, 6600)
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
            else if(bigInt(amount).greater(this.get_token_buy_limit()) && action == this.props.app_state.loc['949']/* 'mint-buy' */){
                this.props.notify(this.props.app_state.loc['983']/* 'The amount youve set exceeds the maximum buy amount enforced by the exchange.' */, 7500)
            }
            else if(bigInt(amount).greater(this.get_token_sell_limit()) && action == this.props.app_state.loc['950']/* 'dump-sell' */){
                this.props.notify(this.props.app_state.loc['984']/* 'The amount youve set exceeds the maximum sell amount enforced by the exchange.' */, 7500)
            }
            else if(!can_make_swap){
                this.props.notify(reason, 5500)
            }
            else{
                this.props.add_crossexchange_swap_to_stack(this.state)
                this.setState({amount:0, recipient_id:''})
                this.props.notify(this.props.app_state.loc['18']/* 'transaction added to stack' */, 1600)
            }
        }
    }


    check_if_sender_has_tokens_for_sell(){
        const my_balance = this.get_my_target_balance()
        if(!bigInt(my_balance).greaterOrEquals(this.state.amount)){
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
            var token_balance = this.props.calculate_actual_balance(e5, token_id)
            var required_amount = required_amounts[i]

            if(bigInt(token_balance).lesser(required_amount)){
                affordable = false
            }
        }
        return affordable
    }

    calculate_token_prices(buy_amounts){
        var amount = this.state.amount
        var return_buy_amounts = buy_amounts.slice()
        for(var i = 0; i < buy_amounts.length; i++){
            return_buy_amounts[i] = bigInt(bigInt(buy_amounts[i]).multiply(bigInt(amount)) )
        }
        return return_buy_amounts
    }

    check_if_sender_can_interact_with_exchange(){
        var stack_transactions = this.props.app_state.stack_items
        for(var i=0; i<stack_transactions.length; i++){
            if(
                stack_transactions[i].type == this.props.app_state.loc['3108']/* 'crossexchange-swap' */ && 
                stack_transactions[i].token_item['id'] == this.state.token_item['id'] && 
                stack_transactions[i].id != this.state.id && 
                stack_transactions[i].e5 == this.props.app_state.selected_e5
            ){
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

    check_if_liquidity_is_available_for_sell(price){
        var selected_object = this.state.token_item
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










    get_selected_item2(object, option){
        return object[option][2][0]
    }

    render_empty_object(){
        var background_color = this.props.theme['card_background_color']
        return(
                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={this.props.app_state.theme['letter']} style={{height:60 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                </div>
            );
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
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
        var uploaded_data = {}
        if(item_id == '3' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12' || item_id == '13' || item_id == '14') uploaded_data = this.props.app_state.uploaded_data
        return(
            <div>
                <ViewGroups uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} show_images={this.props.show_images.bind(this)}
                
                />
            </div>
        )

    }

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
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

    get_time_from_now(time){
        var number_date = Math.round(parseInt(time));
        var now = Math.round(new Date().getTime()/1000);

        var diff = number_date - now;
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


}




export default CrossexchangeSwapPage;