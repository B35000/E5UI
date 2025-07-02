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
import TextInput from './../components/text_input';

import { from } from "@iotexproject/iotex-address-ts";
import EndImg from './../assets/end_token_icon.png';
import SpendImg from './../assets/spend_token_icon.png';
import ReactJson from 'react-json-view'

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
  if (str.length > 30) {
    return str.substr(0, 20) + '...' + str.substr(str.length-10, str.length);
  }
  return str;
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

class DialogPage extends Component {
    
    state = {
        selected: 0,
        data:null,
        id:'',
        ignored_bills:[],
        searched_user:'',
        ignored_nitro_files_items:[],
        made_id:makeid(8),
        selected_e5_renewal_items:[this.props.app_state.selected_e5],
    };


    set_data(data, id){
        this.setState({data: data, id: id})
    }


    render(){
        return(
            <div style={{'padding':'10px 15px 0px 15px'}}>
                {this.render_everything()}
            </div>
        )
    }


    render_everything(){
        var option = this.state.id
        if(option == 'invalid_ether_amount_dialog_box'){
            return(
                <div>
                    {this.render_issue_with_run_dialog()}
                </div>
            )
        }
        else if(option == 'confirm_clear_stack_dialog'){
            return(
                <div>
                    {this.render_confirm_clear_dialog()}
                </div>
            )
        }
        else if(option == 'confirm_send_ether_dialog'){
            return(
                <div>
                    {this.render_confirm_send_ether_dialog()}
                </div>
            )
        }
        else if(option == 'confirm_delete_dialog_box'){
            return(
                <div>
                    {this.render_confirm_delete_transaction_dialog()}
                </div>
            )
        }
        else if(option == 'confirm_withdraw_ether'){
            return(
                <div>
                    {this.render_confirm_withdraw_ether_dialog()}
                </div>
            )
        }
        else if(option == 'confirm_send_coin_dialog'){
            return(
                <div>
                    {this.render_confirm_send_coin_dialog()}
                </div>
            )
        }
        else if(option == 'song_options'){
            return(
                <div>
                    {this.render_song_options()}
                </div>
            )
        }
        else if(option == 'confirm_upload_file_to_arweave'){
            return(
                <div>
                    {this.render_confirm_arweave_upload()}
                </div>
            )
        }
        else if(option == 'view_uploaded_file'){
            return(
                <div>
                    {this.render_view_uploaded_file()}
                </div>
            )
        }
        else if(option == 'view_item_purchase'){
            return(
                <div>
                    {this.render_view_item_purchase()}
                </div>
            )
        }
        else if(option == 'view_incoming_receipts'){
            return(
                <div>
                    {this.render_view_incoming_transactions()}
                </div>
            )
        }
        else if(option == 'view_incoming_transactions'){
            return(
                <div>
                    {this.render_view_event_objects()}
                </div>
            )
        }
        else if(option == 'view_e5_link'){
            return(
                <div>
                    {this.render_view_e5_link_objects()}
                </div>
            )
        }
        else if(option == 'account_options'){
            return(
                <div>
                    {this.render_account_options_data()}
                </div>
            )
        }
        else if(option == 'confirm_pay_bill'){
            return(
                <div>
                    {this.render_cofirm_pay_bill()}
                </div>
            )
        }
        else if(option == 'invalid_stack_size_dialog_box'){
            return(
                <div>
                    {this.render_invalid_stack_size()}
                </div>
            )
        }
        else if(option == 'file_type_picker'){
            return(
                <div>
                    {this.render_file_type_picker()}
                </div>
            )
        }
        else if(option == 'home_page_view_options'){
            return(
                <div>
                    {this.render_home_page_view_options()}
                </div>
            )
        }
        else if(option == 'view_json_example'){
            return(
                <div>
                    {this.render_poll_json_example()}
                </div>
            )
        }
        else if(option == 'poll_results'){
            return(
                <div>
                    {this.render_poll_results()}
                </div>
            )
        }
        else if(option == 'channel_payout_results'){
            return(
                <div>
                    {this.render_creator_payout_info()}
                </div>
            )
        }
        else if(option == 'confirm_upload_nitro_files'){
            return(
                <div>
                    {this.render_confirm_upload_nitro_files()}
                </div>
            )
        }
        else if(option == 'renew_nitro_uploads'){
            return(
                <div>
                    {this.render_renew_nitro_upload_ui()}
                </div>
            )
        }
    }





    render_issue_with_run_dialog(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_issue_with_run()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_issue_with_run()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_issue_with_run()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_issue_with_run(){
        var run_gas_limit = this.state.data['run_gas_limit']
        var run_gas_price = this.props.app_state.gas_price[this.props.app_state.selected_e5]
        var required_ether = (run_gas_limit * run_gas_price);
        if(this.state.data != null){
            return(
                <div style={{}}>
                    <h4 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>{this.props.app_state.loc['1522']/* Issue With Run */}</h4>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1523']/* 'Theres an issue with your Balance' */, 'details':this.props.app_state.loc['1524']/* 'You need more ether to run your transactions' */, 'size':'s'})}
                    <div style={{height: 10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">{this.props.app_state.loc['1525']/* Wallet Balance in Ether and Wei */}</p>
                        {this.render_detail_item('2', this.get_balance_amount_in_wei())}
                        {this.render_detail_item('2', this.get_balance_amount_in_ether())}
                    </div>

                    <div style={{height: 10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">{this.props.app_state.loc['1526']/* Required Balance in Ether and Wei */}</p>
                        
                        {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(required_ether), 'number':this.format_account_balance_figure(required_ether), 'barcolor':'#606060', 'relativepower':'wei', })}

                        {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(required_ether/10**18), 'number':required_ether/10**18, 'barcolor':'#606060', 'relativepower':'ether', })}
                    </div>

                </div>
            )
        }
    }

    get_balance_amount_in_wei(){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(this.props.app_state.account_balance[this.props.app_state.selected_e5]),
            'number':this.format_account_balance_figure(this.props.app_state.account_balance[this.props.app_state.selected_e5]),
            'barcolor':'#606060',
            'relativepower':'wei',
        }
    }

    get_balance_amount_in_ether(){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(this.props.app_state.account_balance[this.props.app_state.selected_e5]/10**18),
            'number':this.props.app_state.account_balance[this.props.app_state.selected_e5]/10**18,
            'barcolor':'#606060',
            'relativepower':'ether',
        }
    }






    render_confirm_clear_dialog(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_confirm_clear()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_confirm_clear()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(2)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_confirm_clear()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(2)}
                    </div>
                </div>
                
            )
        }
    }

    render_confirm_clear(){
        return(
            <div style={{}}>
                <h4 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>{this.props.app_state.loc['1443']/* Confirm Action */}</h4>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1445']/* 'Confirm Clear Stack Action' */, 'details':'This action cannot be undone.', 'size':'l'})}

                <div style={{height: 10}}/>

                <div style={{'padding': '5px'}} onClick={()=> this.props.clear_stack()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1444']/* 'Confirm' */, 'action':''})}
                </div>
            </div>
        )
    }




    render_confirm_send_ether_dialog(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_confirm_send_ether()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_confirm_send_ether()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_confirm_send_ether()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_confirm_send_ether(){
        var picked_wei_amount = this.state.data['picked_wei_amount'] //this.state.picked_wei_amount
        var e5 = this.state.data['e5'] //this.state.ether['e5']
        var recipient_address = this.state.data['recipient_address']//this.state.recipient_address
        return(
            <div style={{}}>
                <h3 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>{this.props.app_state.loc['1407f']}{/* Confirmation */}</h3>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1393']/* 'Send Ether Confirmation' */, 'details':this.props.app_state.loc['1394']/* 'Confirm that you want to send Ether to the targeted recipient' */, 'size':'s'})}
                <div style={{height: 10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">{this.props.app_state.loc['1395']/* Picked Amount In Ether and Wei */}</p>
                    {this.render_detail_item('2', this.get_picked_amount_in_wei(picked_wei_amount))}
                    {this.render_detail_item('2', this.get_picked_amount_in_ether(picked_wei_amount))}
                </div>
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1396']/* 'Sender Wallet Address' */, 'details':this.get_account_address(e5), 'size':'s'})}
                <div style={{height: 10}}/>
                
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1397']/* 'Receiver Wallet Address' */, 'details':recipient_address, 'size':'s'})}

                <div style={{height: 10}}/>
                
                <div style={{'padding': '5px'}} onClick={()=>this.send_ether_to_target()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1398']/* 'Send Ether' */, 'action':''})}
                </div>
            </div>
        )
    }

    get_picked_amount_in_wei(picked_wei_amount){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(picked_wei_amount),
            'number':this.format_account_balance_figure(picked_wei_amount),
            'barcolor':'#606060',
            'relativepower':'wei',
        }
    }

    get_picked_amount_in_ether(picked_wei_amount){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(picked_wei_amount/10**18),
            'number':(picked_wei_amount/10**18),
            'barcolor':'#606060',
            'relativepower':'ether',
        }
    }

    get_account_address(e5){
        if(this.props.app_state.accounts[e5] != null){
            return this.format_address(this.props.app_state.accounts[e5].address, e5);
        }
    }

    format_address(address, e5){
        if(e5 == 'E45'){
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

    convert_to_iotx(address){
        const addr = from(address.toString());
        return addr.string();
    }

    replace_0x_with_xdc(address){
        return 'xdc'+address.toString().slice(2)
    }

    send_ether_to_target(){
        this.props.send_ether_to_target_confirmation()
    }






    render_confirm_delete_transaction_dialog(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_confirm_delete_transaction()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_confirm_delete_transaction()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(2)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_confirm_delete_transaction()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(2)}
                    </div>
                </div>
                
            )
        }
    }

    render_confirm_delete_transaction(){
        return(
            <div style={{}}>
                <h5 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color'], 'font-family': this.props.app_state.font}}>{this.props.app_state.loc['1786']/* Confirm Delete Action */}</h5>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1787']/* 'Are you sure?' */, 'details':'You cannot undo this action', 'size':'s'})}
                <div style={{height:20}}/>

                <div onClick={()=> this.props.open_delete_action()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1785']/* 'Delete' */, 'action':''},)}
                </div>

            </div>
        )
    }







    render_confirm_withdraw_ether_dialog(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_confirm_withdraw_ether()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_confirm_withdraw_ether()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(2)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_confirm_withdraw_ether()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(2)}
                    </div>
                </div>
                
            )
        }
    }

    render_confirm_withdraw_ether(){
        var e5 = this.state.data['e5']//this.state.e5
        var recipient_address = this.state.data['recipient_address']//this.state.recipient_address
        return(
            <div style={{'padding': '10px'}}>
                    <h3 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2027c']/* Confirmation */}</h3>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2018']/* 'Withdraw Ether Confirmation' */, 'details':this.props.app_state.loc['2019']/* 'Confirm that you want to withdraw Ether to the set address' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['2020']/* 'Withdraw balance in Wei' */, 'subtitle':this.format_power_figure(this.props.app_state.withdraw_balance[e5['id']]), 'barwidth':this.calculate_bar_width(this.props.app_state.withdraw_balance[e5['id']]), 'number':this.format_account_balance_figure(this.props.app_state.withdraw_balance[e5['id']]), 'relativepower':'wei'})}

                        {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['2021']/* 'Withdraw balance in Ether' */, 'subtitle':this.format_power_figure(this.props.app_state.withdraw_balance[e5['id']]/10**18), 'barwidth':this.calculate_bar_width(this.props.app_state.withdraw_balance[e5['id']]/10**18), 'number':(this.props.app_state.withdraw_balance[e5['id']]/10**18), 'relativepower':'Ether'})}
                    </div>
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2022']/* 'Target Wallet Address' */, 'details':start_and_end(recipient_address), 'size':'s'})}
                    <div style={{height: 10}}/>

                    <div style={{height: 10}}/>
                    <div onClick={() => this.props.when_withdraw_ether_confirmation_received()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2023']/* 'Withdraw Ether' */, 'action':''})}
                    </div>
            </div>
        )
    }







    render_confirm_send_coin_dialog(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_confirm_send_coin()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_confirm_send_coin()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_confirm_send_coin()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }


    render_confirm_send_coin(){
        var picked_transfer_amount = this.state.data['amount']
        var recipient_address = this.state.data['recipient']
        var sender_address = this.state.data['sender']
        var fee = this.state.data['fee']
        var coin = this.state.data['coin']
        var memo_text = this.state.data['memo_text']
        return(
            <div>
                <h3 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>{this.props.app_state.loc['1407f']}{/* Confirmation */}</h3>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2941']/* 'Send Coin Confirmation' */, 'details':this.props.app_state.loc['2942']/* 'Confirm that you want to send the coin to the target recipient.' */, 'size':'s'})}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">{this.props.app_state.loc['2943']/* Picked Amount. */}</p>
                    {this.render_detail_item('2', this.get_picked_amount_in_base_units(coin, picked_transfer_amount))}
                    {this.render_detail_item('2', this.get_picked_amount_in_decimal(coin, picked_transfer_amount))}
                </div>
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">{this.props.app_state.loc['2944']/* Picked Fee. */}</p>
                    {this.render_detail_item('2', this.get_picked_fee_amount_in_base_units(coin, fee))}
                    {this.render_detail_item('2', this.get_picked_fee_amount_in_decimal(coin, fee))}
                </div>
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1396']/* 'Sender Wallet Address' */, 'details':sender_address, 'size':'s'})}
                <div style={{height: 10}}/>
                
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1397']/* 'Receiver Wallet Address' */, 'details':recipient_address, 'size':'s'})}

                {this.show_memo_if_included(memo_text)}

                <div style={{height: 10}}/>
                <div style={{'padding': '5px'}} onClick={()=>this.send_coin_to_target()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2945']/* 'Broadcast Transaction.' */, 'action':''})}
                </div>
            </div>
        )
    }


    get_picked_amount_in_base_units(item, picked_sats_amount){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(picked_sats_amount),
            'number':this.format_account_balance_figure(picked_sats_amount),
            'barcolor':'#606060',
            'relativepower':item['base_unit']+'s',
        }
    }

    get_picked_amount_in_decimal(item, picked_sats_amount){
        var amount = parseFloat(picked_sats_amount) / item['conversion']
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(amount),
            'number':(amount),
            'barcolor':'#606060',
            'relativepower':item['symbol'],
        }
    }

    get_picked_fee_amount_in_base_units(item, picked_sats_fee_amount){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(picked_sats_fee_amount),
            'number':this.format_account_balance_figure(picked_sats_fee_amount),
            'barcolor':'#606060',
            'relativepower':item['base_unit']+'s',
        }
    }

    get_picked_fee_amount_in_decimal(item, picked_sats_fee_amount){
        var amount = parseFloat(picked_sats_fee_amount) / item['conversion']
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(amount),
            'number':(amount),
            'barcolor':'#606060',
            'relativepower':item['symbol'],
        }
    }

    show_memo_if_included(memo_text){
        if(memo_text != null && memo_text != ''){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2953']/* 'Included Memo.' */, 'details':memo_text, 'size':'s'})}
                </div>
            )
        }
    }


    send_coin_to_target(){
        this.props.send_coin_to_target()
    }











    render_song_options(){
        var data = this.state.data
        var from = data['from']
        
        if(from == 'audio_details_section'){
            return(
                <div>
                    {this.render_audio_details_section_song_option_items_data()}
                </div>
            )
        }
        else if(from == 'full_audio_page'){
            return(
                <div>
                    {this.render_full_audio_page_song_option_items_data()}
                </div>
            )
        }
        else if(from == 'audio_details_section2'){
            return(
                <div>
                    {this.render_audio_details_section_song_option_items2_data()}
                </div>
            )
        }
        else if(from == 'audio_details_section3'){
            return(
                <div>
                    {this.render_audio_details_section_song_option_items3_data()}
                </div>
            )
        }
    }

    render_audio_details_section_song_option_items_data(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_audio_details_section_song_option_items()}
                    {this.render_audio_details_section_song_option_items_2()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_audio_details_section_song_option_items()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_audio_details_section_song_option_items_2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_audio_details_section_song_option_items()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_audio_details_section_song_option_items_2()}
                    </div>
                </div>
                
            )
        }
    }

    render_audio_details_section_song_option_items(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2998']/* 'Add to Playlist' */, 'details':this.props.app_state.loc['3006a']/* 'Add the track to one of your playlists.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_add_to_playlist_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2998']/* 'Add to Playlist' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['3006k']/* 'Download Track.' */, 'details':this.props.app_state.loc['3006l']/* 'Cache the track in your cookies to load it faster in the future.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_add_to_cache_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3006k']/* 'Download Track.'' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['2999']/* 'Play Next.' */, 'details':this.props.app_state.loc['3006b']/* 'Play the track next.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_play_next_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2999']/* 'Play Next.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}
            </div>
        )
    }

    render_audio_details_section_song_option_items_2(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3000']/* 'Play Last.' */, 'details':this.props.app_state.loc['3006c']/* 'Play the track last. */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_play_last_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3000']/* 'Play Last.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>


                {this.render_buy_track_option_if_unbought()}
            </div>
        )
    }

    render_buy_track_option_if_unbought(){
        if(!this.can_show_buy_track_option()) return;
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055dm']/* 'Buy Track.' */, 'details':this.props.app_state.loc['3055dn']/* 'Buy the track and add it to your collection.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_buy_track_option_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055dm']/* 'Buy Track.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
            </div>
        )
    }

    can_show_buy_track_option(){
        const available_songs_data = this.get_available_songs()
        const song = this.state.data['item']['song_id']
        return !available_songs_data.available_songs.includes(song)
    }

    get_available_songs(){
        var object = this.state.data['object']
        var txs = this.props.app_state.stack_items
        var selected_songs = [].concat(this.props.app_state.my_tracks)
        for(var i=0; i<txs.length; i++){
            var t = txs[i]
            if(t.type == this.props.app_state.loc['2962']/* 'buy-album' */ && t.album['id'] == object['id']){
                var its_selected_songs = t.selected_tracks;
                its_selected_songs.forEach(song => {
                    selected_songs.push(song['song_id'])
                });
            }
        }

        var items = object['ipfs'].songs
        var available_songs = []
        var unavailable_tracks = []
        items.forEach(item => {
            if(!selected_songs.includes(item['song_id'])){
                available_songs.push(item)
            }else{
                unavailable_tracks.push(item)
            }
        });

        return {available_songs:available_songs, unavailable_tracks:unavailable_tracks}
    }

    when_buy_track_option_clicked(){
        var data = this.get_total_payment_amounts()
        var exchanges_used = [].concat(data.exchanges_used)
        var exchange_amounts = data.exchange_amounts
        var ignore_transfers = false;
        var object = this.state.data['object']
        
        if(this.does_subscriptions_exist_in_object(this.state.data['object']) && this.check_if_sender_has_paid_subscriptions(this.state.data['object'])){
            ignore_transfers = true
        }

        if(!this.check_if_sender_can_afford_payments(data) && ignore_transfers == false){
            this.props.notify(this.props.app_state.loc['2970']/* 'You don\'t have enough money to fulfil this purchase.' */, 4500)
        }else{
            var txs = this.props.app_state.stack_items
            var existing_buy_object = null
            for(var i=0; i<txs.length; i++){
                var t = txs[i]
                if(t.type == this.props.app_state.loc['2962']/* 'buy-album' */ && t.album['e5_id'] == object['e5_id']){
                    existing_buy_object = structuredClone(t)
                }
            }

            if(existing_buy_object == null){
                existing_buy_object = {
                    selected: 0, id: makeid(8), type:this.props.app_state.loc['2962']/* 'buy-album' */, entered_indexing_tags:[this.props.app_state.loc['2963']/* 'buy' */, this.props.app_state.loc['2964']/* 'album' */,this.props.app_state.loc['2965']/* 'track' */], selected_tracks:[this.state.data['item']], exchanges_used: exchanges_used, exchange_amounts: exchange_amounts, data: data, album: object, e5: object['e5']
                }
            }
            else{
                existing_buy_object.selected_tracks.push(this.state.data['item'])
                existing_buy_object.exchanges_used = exchanges_used
                existing_buy_object.exchange_amounts = exchange_amounts
                existing_buy_object.data = data
            }

            this.props.add_buy_album_transaction_to_stack_from_dialog_page(existing_buy_object)
            this.props.notify(this.props.app_state.loc['18'], 1700);
        }
    }

    get_total_payment_amounts(){
        var exchanges_used = []
        var exchange_amounts = {}
        var selected_tracks = [this.state.data['item']]
        var object = this.state.data['object']

        var txs = this.props.app_state.stack_items
        for(var i=0; i<txs.length; i++){
            var t = txs[i]
            if(t.type == this.props.app_state.loc['2962']/* 'buy-album' */ && t.album['id'] == object['id']){
                var its_selected_songs = t.selected_tracks;
                its_selected_songs.forEach(song => {
                    selected_tracks.push(song)
                });
            }
        }

        selected_tracks.forEach(track => {
            var track_price_data = track['price_data']
            track_price_data.forEach(price => {
                var exchange_id = price['id']
                var amount = price['amount']
                if(!exchanges_used.includes(exchange_id)){
                    exchanges_used.push(exchange_id)
                    exchange_amounts[exchange_id] = bigInt(0)
                }
                exchange_amounts[exchange_id] = bigInt(exchange_amounts[exchange_id]).add(amount)
            });
        });

        return {exchanges_used:exchanges_used, exchange_amounts:exchange_amounts}
    }

    check_if_sender_can_afford_payments(data){
        var exchanges_used = [].concat(data.exchanges_used)
        var exchange_amounts = data.exchange_amounts
        var e5 = this.state.e5

        var can_pay = true;
        for(var i=0; i<exchanges_used.length; i++){
            var token_id = exchanges_used[i]
            var token_balance = this.props.calculate_actual_balance(e5, token_id)
            var final_amount = exchange_amounts[token_id]

            if(bigInt(token_balance).lesser(final_amount)){
                can_pay = false
            }
        }
        return can_pay
    }

    does_subscriptions_exist_in_object(object){
        var required_subscriptions = object['ipfs'].selected_subscriptions
        var creator_group_subscriptions = object['ipfs'].creator_group_subscriptions
        if((creator_group_subscriptions != null && creator_group_subscriptions.length > 0) || (required_subscriptions != null && required_subscriptions.length > 0)){
            return true
        }
        return false
    }

    check_if_sender_has_paid_subscriptions(object){
        var required_subscriptions = object['ipfs'].selected_subscriptions
        var creator_group_subscriptions = object['ipfs'].creator_group_subscriptions
        
        if(creator_group_subscriptions != null && creator_group_subscriptions.length > 0){
            var has_sender_paid_all_subs = false
            creator_group_subscriptions.forEach(subscription_e5_id => {
                var subscription_id = subscription_e5_id.split('E')[0]
                var subscription_e5 = 'E'+subscription_e5_id.split('E')[1]
                if(this.has_paid_subscription(parseInt(subscription_id), subscription_e5)){
                    //if at least one subscription has been paid
                    has_sender_paid_all_subs=  true
                }
            });
            return has_sender_paid_all_subs
        }
        else if(required_subscriptions != null && required_subscriptions.length > 0){
            var has_sender_paid_all_subs2 = false
            required_subscriptions.forEach(subscription_e5_id => {
                var subscription_id = subscription_e5_id
                var subscription_e5 = 'E25'
                if(subscription_e5_id.includes('E')){
                    subscription_id = subscription_e5_id.split('E')[0]
                    subscription_e5 = 'E'+subscription_e5_id.split('E')[1]
                }
                if(this.has_paid_subscription(parseInt(subscription_id), subscription_e5)){
                    has_sender_paid_all_subs2 =  true
                }
            });
            return has_sender_paid_all_subs2
        }else{
            return true
        }
    }

    has_paid_subscription(subscription_id, e5){
        var my_payment = this.props.app_state.my_subscription_payment_mappings[e5][subscription_id]
        if(my_payment == null || my_payment == 0) return false;
        return true
    }

    

    when_add_to_playlist_clicked(){
        if(this.is_song_available_for_adding_to_playlist()){
            var song = this.state.data['item']
            this.props.add_to_playlist(song)
        }else{
            this.props.notify(this.props.app_state.loc['3021']/* 'You need to buy the track to add it to your playlists' */, 6000)
        }
        
    }

    when_play_next_clicked(){
        var song = this.state.data['item']
        this.props.play_next_clicked(song)
    }

    when_play_last_clicked(){
        var song = this.state.data['item']
        this.props.play_last_clicked(song)
    }

    when_add_to_cache_clicked(){
        var song = this.state.data['item']
        this.props.add_song_to_cache(song)
    }



    render_full_audio_page_song_option_items_data(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_full_audio_page_song_option_items()}
                    {this.render_full_audio_page_song_option_items2()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_full_audio_page_song_option_items()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_full_audio_page_song_option_items2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_full_audio_page_song_option_items()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_full_audio_page_song_option_items2()}
                    </div>
                </div>
                
            )
        }
    }

    render_full_audio_page_song_option_items(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2998']/* 'Add to Playlist' */, 'details':this.props.app_state.loc['3006a']/* 'Add the track to one of your playlists.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_add_to_playlist_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2998']/* 'Add to Playlist' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['3006k']/* 'Download Track.' */, 'details':this.props.app_state.loc['3006l']/* 'Cache the track in your cookies to load it faster in the future.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_add_to_cache_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3006k']/* 'Download Track.'' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['2999']/* 'Play Next.' */, 'details':this.props.app_state.loc['3006b']/* 'Play the track next.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_play_next_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2999']/* 'Play Next.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}
            </div>
        )
    }

    render_full_audio_page_song_option_items2(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3000']/* 'Play Last.' */, 'details':this.props.app_state.loc['3006c']/* 'Play the track last. */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_play_last_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3000']/* 'Play Last.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['3001']/* 'Remove from queue.' */, 'details':this.props.app_state.loc['3006d']/* 'Remove track from queue.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_remove_from_queue_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3001']/* 'Remove from queue.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
            </div>
        )
    }

    when_remove_from_queue_clicked(){
        var song = this.state.data['item']
        this.props.when_remove_from_queue(song)
    }


    is_song_available_for_adding_to_playlist(){
        var my_songs = this.props.app_state.my_tracks
        var song = this.state.data['item']
        console.log('my_collection_data', my_songs, song['song_id'])
        if(my_songs.includes(song['song_id'])){
            return true
        }
        return false
    }




    render_audio_details_section_song_option_items2_data(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_audio_details_section_song_option_items2()}
                    {this.render_audio_details_section_song_option_items22()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_audio_details_section_song_option_items2()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_audio_details_section_song_option_items22()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_audio_details_section_song_option_items2()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_audio_details_section_song_option_items22()}
                    </div>
                </div>
                
            )
        }
    }

    render_audio_details_section_song_option_items2(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2998']/* 'Add to Playlist' */, 'details':this.props.app_state.loc['3006a']/* 'Add the track to one of your playlists.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_add_to_playlist_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2998']/* 'Add to Playlist' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['3006k']/* 'Download Track.' */, 'details':this.props.app_state.loc['3006l']/* 'Cache the track in your cookies to load it faster in the future.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_add_to_cache_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3006k']/* 'Download Track.'' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['3006e']/* 'Remove from Playlist.' */, 'details':this.props.app_state.loc['3006f']/* 'Remove the track from your playlist.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_remove_from_playlist_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3006e']/* 'Remove from Playlist.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}

            </div>
        )
    }

    render_audio_details_section_song_option_items22(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2999']/* 'Play Next.' */, 'details':this.props.app_state.loc['3006b']/* 'Play the track next.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_play_next_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2999']/* 'Play Next.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['3000']/* 'Play Last.' */, 'details':this.props.app_state.loc['3006c']/* 'Play the track last. */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_play_last_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3000']/* 'Play Last.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
            </div>
        )
    }


    when_remove_from_playlist_clicked(){
        var item = this.state.data['item']
        var object = this.state.data['object']
        this.props.when_remove_from_playlist(item, object)
    }


    

    render_audio_details_section_song_option_items3_data(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_audio_details_section_song_option_items3()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_audio_details_section_song_option_items3()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_audio_details_section_song_option_items3()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_audio_details_section_song_option_items3(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3006h']/* 'Confirm Deletion.' */, 'details':this.props.app_state.loc['3006i']/* 'Are you sure you want to delete the playlist?' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_delete_playlist_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3006h']/* 'Confirm Deletion.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                <div style={{height:15}}/>
                {this.render_playlist_item(this.state.data['object'])}
            </div>
        )
    }

    render_playlist_item(item){
        var title = item['title']
        var details = item['details']
        return(
            <div>
                <div style={{'padding': '0px 0px 0px 0px'}}>
                    {this.render_detail_item('3', {'title':title, 'details':details, 'size':'l'})}
                </div>
                <div style={{padding:'0px 0px 0px 0px'}}>
                    {this.render_playlist_images(item)}
                </div>
            </div>
        )
    }

    render_playlist_images(item){
        var items = this.get_playlist_images(item)
        if(items.length == 0){
            items = [1, 2, 3]
            var background_color = this.props.theme['card_background_color']
            return(
                <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                <div style={{height:50, width:50, 'background-color': background_color, 'border-radius': '10px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}}>
                            <img alt="" src={this.get_image_from_file(item)} style={{height:25 ,width:25, 'border-radius': '50%'}}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_playlist_images(item){
        var images = []
        var item_songs = item['songs']
        item_songs.forEach(element => {
            images.push(element['album_art'])
        });
        return images
    }

    get_image_from_file(ecid){
        if(!ecid.startsWith('image')) return ecid
        var ecid_obj = this.get_cid_split(ecid)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return 'https://bafkreihhphkul4fpsqougigu4oenl3nbbnjjav4fzkgpjlwfya5ie2tu2u.ipfs.w3s.link/'
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]

        if(data == null) return 'https://bafkreihhphkul4fpsqougigu4oenl3nbbnjjav4fzkgpjlwfya5ie2tu2u.ipfs.w3s.link/'

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

    when_delete_playlist_clicked(){
        var playlist = this.state.data['object']
        this.props.delete_playlist(playlist)
    }









    render_confirm_arweave_upload(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_confirm_arweave()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_confirm_arweave()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_confirm_arweave()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_confirm_arweave(){
        var hash = this.state.data['hash']
        var address = this.state.data['address']
        var type = this.state.data['type']
        var reward = this.state.data['reward']
        var balance = this.state.data['balance']
        var balance_in_ar = this.state.data['balance_in_ar']
        var transaction_reward_in_ar = this.state.data['transaction_reward_in_ar']
        var impact = reward > balance ? 100 : this.round_off((reward / balance) * 100)
        var opacity = reward > balance ? 0.55 : 1.0
        var formatted_size = this.format_data_size(this.state.data['data']['size'])
        var fs = formatted_size['size']+' '+formatted_size['unit']

        return(
            <div style={{'padding': '0px'}}>
                <h3 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2027c']/* Confirmation */}</h3>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055']/* 'Upload File Confirmation.' */, 'details':this.props.app_state.loc['3055a']/* 'Confirm that you want to upload the file to Arweave.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['3055d']/* 'Upload fee in winston.' */, 'subtitle':this.format_power_figure(reward), 'barwidth':this.calculate_bar_width(reward), 'number':this.format_account_balance_figure(reward), 'relativepower':'winston'})}

                    {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['3055e']/* 'Upload fee in Arweave.' */, 'subtitle':this.format_power_figure(transaction_reward_in_ar), 'barwidth':this.calculate_bar_width(transaction_reward_in_ar), 'number':(transaction_reward_in_ar), 'relativepower':'Arweave'})}

                    {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['3055j']/* 'Transaction Impact on your Wallet.' */, 'subtitle':'', 'barwidth':impact+'%', 'number':impact+'%', 'relativepower':this.props.app_state.loc['3055k']/* 'proportion' */})}
                </div>
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['3055b']/* 'Wallet Balance in Winston.' */, 'subtitle':this.format_power_figure(balance), 'barwidth':this.calculate_bar_width(balance), 'number':this.format_account_balance_figure(balance), 'relativepower':'winston'})}

                    {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['3055c']/* 'Wallet Balance in Arweave.' */, 'subtitle':this.format_power_figure(balance_in_ar), 'barwidth':this.calculate_bar_width(balance_in_ar), 'number':(balance_in_ar), 'relativepower':'Arweave'})}
                </div>
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['3055f']/* 'Upload File type.' */, 'title':type+' : '+this.state.data['data']['name'], 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['3055m']/* 'Upload File size.' */, 'title':fs, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['2022']/* 'Target Wallet Address' */, 'details':address, 'size':'l'})}
                <div style={{height: 10}}/>

                <div style={{opacity:opacity}} onClick={() => this.props.upload_file_to_arweave_confirmed(this.state.data)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055i']/* 'Upload File.' */, 'action':''})}
                </div>
            </div>
        )
    }

    copy_hash_to_clipboard(text){
        navigator.clipboard.writeText(text)
        this.props.notify(this.props.app_state.loc['3055h']/* 'Copied Hash to Clipboard.' */, 1600)
    }

    round_off(number){
        return (Math.round(number * 100) / 100)
    }

    format_data_size(size){
        if(bigInt(size).greater(bigInt(1024).pow(8))){
            var mod = bigInt(size).mod(bigInt(1024).pow(8)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(8)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'YBs'}
        }
        else if(bigInt(size).greater(bigInt(1024).pow(7))){
            var mod = bigInt(size).mod(bigInt(1024).pow(7)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(7)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'ZBs'}
        }
        else if(bigInt(size).greater(bigInt(1024).pow(6))){
            var mod = bigInt(size).mod(bigInt(1024).pow(6)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(6)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'EBs'}
        }
        else if(bigInt(size).greater(bigInt(1024).pow(5))){
            var mod = bigInt(size).mod(bigInt(1024).pow(5)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(5)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'PBs'}
        }
        else if(size > (1024*1024*1024*1024)){
            return {'size':parseFloat(size/(1024*1024*1024*1024)).toFixed(3), 'unit':'TBs'}
        }
        else if(size > (1024*1024*1024)){
            return {'size':parseFloat(size/(1024*1024*1024)).toFixed(3), 'unit':'GBs'}
        }
        else if(size > (1024*1024)){
            return {'size':parseFloat(size/(1024*1024)).toFixed(3), 'unit':'MBs'}
        }
        else if(size > 1024){
            return {'size':parseFloat(size/1024).toFixed(3), 'unit':'KBs'}
        }
        else{
            return {'size':size, 'unit':'bytes'}
        }
    }







    render_view_uploaded_file(){
       var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_file_image()}
                    {this.render_file_data()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        <div style={{height: 60}}/>
                        {this.render_file_image()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_file_data()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        <div style={{height: 60}}/>
                        {this.render_file_image()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_file_data()}
                    </div>
                </div>
                
            )
        } 
    }

    render_file_image(){
        var ecid_obj = this.state.data['ecid_obj']
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]

        if(data != null){
            var wh = this.props.size == 's' ? '180px':'241px'
            
            if(data['type'] == 'image'){
                var img = data['data']
                if(data['nitro'] != null && !this.is_file_available(data['hash'])){
                    img = this.props.app_state.static_assets['empty_image']
                }
                return(
                    <div>
                        {this.render_detail_item('7', {'header':'', 'subtitle':'', 'image':img, 'width_height':'auto', 'height':wh, 'border_radius':'25px'})}
                    </div>
                )
            }
            else if(data['type'] == 'audio'){
                var img = data['thumbnail'] == '' ? this.props.app_state.static_assets['music_label'] : data['thumbnail']
                return(
                    <div>
                        {this.render_detail_item('7', {'header':'', 'subtitle':'', 'image':img, 'width_height':wh})}
                    </div>
                )
            }
            else if(data['type'] == 'video'){
                var video = encodeURI(data['data'])
                console.log('videoimage', ''+video)
                if(this.props.app_state.video_thumbnails[ecid_obj['full']] != null){
                    var thumbnail = this.props.app_state.video_thumbnails[ecid_obj['full']]
                    return(
                        <div>
                            {this.render_detail_item('7', {'header':'', 'subtitle':'', 'image':thumbnail, 'width_height':'auto', 'height':wh, 'border_radius':'15px'})}
                        </div>
                    )
                }else{
                    var thumbnail = this.props.app_state.static_assets['video_label']
                    return(
                        <div>
                            {this.render_detail_item('7', {'header':'', 'subtitle':'', 'image':thumbnail, 'width_height':'auto', 'height':wh, 'border_radius':'15px'})}
                        </div>
                    )
                }
                return(
                    <div style={{'display': 'flex', 'align-items':'center','justify-content':'center','padding': '0px 0px 0px 5px', width: '99%'}}>
                        <div>
                            <video height="240" style={{'border-radius':'7px'}}>
                                <source src={video} type="video/mp4"/>
                                <source src={video} type="video/ogg"/>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                )
            }
            else if(data['type'] == 'pdf'){
                var img = data['thumbnail']
                return(
                    <div>
                        {this.render_detail_item('7', {'header':'', 'subtitle':'', 'image':img, 'width_height':wh})}
                    </div>
                )
            }
            else if(data['type'] == 'zip'){
                var img = this.props.app_state.static_assets['zip_file']
                return(
                    <div>
                        {this.render_detail_item('7', {'header':'', 'subtitle':'', 'image':img, 'width_height':wh})}
                    </div>
                )
            }
            else if(data['type'] == 'lyric'){
                var img = this.props.app_state.static_assets['lyric_icon']
                return(
                    <div>
                        {this.render_detail_item('7', {'header':'', 'subtitle':'', 'image':img, 'width_height':wh})}
                    </div>
                )
            }
            else if(data['type'] == 'subtitle'){
                var img = this.props.app_state.static_assets['subtitle_icon']
                return(
                    <div>
                        {this.render_detail_item('7', {'header':'', 'subtitle':'', 'image':img, 'width_height':wh})}
                    </div>
                )
            }
        }
    }

    render_file_data(){
        var ecid_obj = this.state.data['ecid_obj']
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]

        if(data != null){
            var formatted_size = this.format_data_size(data['size'])
            var size = formatted_size['size']+' '+formatted_size['unit']
            var age = this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */
            var name = data['name']
            var link = data['data'].startsWith('http') ? encodeURI(data['data']) : ''
            var hash = data['hash']
            
            return(
                <div>
                    <h4 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>{this.props.app_state.loc['3055x']/* File Details. */}</h4>

                    {this.render_detail_item('3', {'details':this.props.app_state.loc['3055n']/* 'File Name.' */, 'title':name, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'details':this.props.app_state.loc['3055o']/* 'File Age.' */, 'title':age, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'details':this.props.app_state.loc['3055p']/* 'File Size.' */, 'title':size, 'size':'l'})}

                    {this.render_streamed_bytes_if_any(data)}

                    {this.render_file_stream_count_if_any(data)}

                    {this.render_detail_item('0')}
                    {this.render_not_on_e5_message(ecid_obj)}
                    {this.render_file_verified_message(ecid_obj)}
                    {this.render_deleted_file_message_if_deleted(hash)}
                    {/* {this.render_detail_item('4', {'text':link, 'textsize':'10px', 'font':this.props.app_state.font})} */}
                    {/* <div onClick={() => this.props.delete_file(ecid_obj)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['3055r'] 'Forget File.' , 'action':''})}
                    </div> */}
                    {this.render_verify_file_button(hash, ecid_obj)}
                    {this.render_delete_file_button(hash, data)}
                </div>
            )
        }
    }

    render_file_stream_count_if_any(data){
        var view_count = this.get_file_view_count(data)
        var view_count_message = ''
        if(view_count > 0){
            var views_text = this.props.app_state.loc['2509n']/* views */
            if(view_count == 1){
                views_text = this.props.app_state.loc['2509o']/* view */
            }
            view_count_message = ` • ${number_with_commas(view_count)} ${views_text}`

            return(
                <div>
                    {this.render_detail_item('4', {'text':view_count_message, 'textsize':'13px', 'font':this.props.app_state.font})}
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    render_streamed_bytes_if_any(data){
        var stream_bytes_count = this.calculate_total_streaming(data)
        if(stream_bytes_count != 0){
            var formatted_size = this.format_data_size(stream_bytes_count)
            var size = formatted_size['size']+' '+formatted_size['unit']
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'details':this.props.app_state.loc['2509p']/* 'Streamed.' */, 'title':size, 'size':'l'})}
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    calculate_total_streaming(data){
        var file = data['hash']
        var stream_data = this.props.app_state.file_streaming_data[file]
        if(stream_data != null){
            var stream_data_object = stream_data.files_stream_count
            var time_keys = Object.keys(stream_data_object)
            var bytes_treamed = 0
            time_keys.forEach(key => {
                bytes_treamed += stream_data_object[key]
            });

            return bytes_treamed
        }
        return 0
    }

    get_file_view_count(data){
        var file = data['hash']
        var stream_data = this.props.app_state.file_streaming_data[file]
        if(stream_data != null){
            return stream_data.files_view_count
        }
        return 0
    }

    render_not_on_e5_message(ecid_obj){
        if(this.props.app_state.uncommitted_upload_cids.includes(ecid_obj['full'])){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3055s']/* 'Not On Chain.' */, 'details':this.props.app_state.loc['3055t']/* 'You need to make an E5 run to record this file on E5.' */, 'size':'l'})}
                    <div style={{height: 10}}/>
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3055v']/* 'On Chain.' */, 'details':this.props.app_state.loc['3055w']/* 'A link to the file is permanently stored on chain.' */, 'size':'l'})}
                    <div style={{height: 10}}/>
                </div>
            )
        }
    }

    render_file_verified_message(ecid_obj){
        var verified = this.props.app_state.verified_file_statuses[ecid_obj['full']]
        if(verified != null){
            if(verified == true){
                return(
                    <div>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['3055ce']/* 'File Verified.' */, 'details':this.props.app_state.loc['3055cf']/* 'The file has not been tampered with.' */, 'size':'l'})}
                        <div style={{height: 10}}/>
                    </div>
                )
            }else{
                return(
                    <div>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['3055cg']/* 'File Not Verified.' */, 'details':this.props.app_state.loc['3055ch']/* 'The file might have been tampered with.' */, 'size':'l'})}
                        <div style={{height: 10}}/>
                    </div>
                )
            }
        }
    }

    render_deleted_file_message_if_deleted(hash){
        if(hash != null && !this.is_file_available(hash)){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3055di']/* '🗑️ File Deleted.' */, 'details':this.props.app_state.loc['3055dj']/* 'The file was deleted by youre nitro storage provider.' */, 'size':'l'})}
                    <div style={{height: 10}}/>
                </div>
            )
        }
    }

    render_verify_file_button(hash, ecid_obj){
        if(hash != null && this.is_file_available(hash)){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3055by']/* 'Verify File' */, 'details':this.props.app_state.loc['3055bz']/* 'Verify that the entire file has not been tampered with.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={() => this.props.verify_file(ecid_obj)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['3055by']/* 'Verify File' */, 'action':'', 'font':this.props.app_state.font})}
                    </div>
                    <div style={{height: 10}}/>
                </div>
            )
        }
    }

    render_delete_file_button(hash, data){
        if(hash != null && this.is_file_available(hash) && data['nitro'] != null && this.props.app_state.file_streaming_data[hash] != null){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3055do']/* '🗑️ Delete File' */, 'details':this.props.app_state.loc['3055dp']/* 'Delete the file from the node and halt its streaming immediately and forever. This action cannot be undone.' */, 'size':'l'})}
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['3055dq']/* 'You wont get the file\'s space back but you wont pay for the files renewal.' */, 'textsize':'11px', 'font':this.props.app_state.font})}
                    <div style={{height:10}}/>
                    <div onClick={() => this.props.delete_nitro_file(hash, data)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['3055do']/* '🗑️ Delete File' */, 'action':'', 'font':this.props.app_state.font})}
                    </div>
                    <div style={{height: 10}}/>
                </div>
            )
        }
    }











    render_view_item_purchase(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_view_purchase_data()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_view_purchase_data()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_view_purchase_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        } 
    }

    render_view_purchase_data(){
        var item = this.state.data['item']
        var sender_type = this.state.data['sender_type']
        var object = this.state.data['object']

        return(
            <div>
                <div>
                    <h4 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>{this.props.app_state.loc['1979a']/* Order Details. */}</h4>

                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['1948']/* 'Shipping Details' */, 'details':item['shipping_detail']})}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['1958']/* 'Variant ID: ' */+item['variant_id'], 'details':this.get_variant_from_id(item['variant_id'], object)['variant_description'] })}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['1114c']/* 'custom_specifications ' */, 'details':item['custom_specifications']})}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['1063']/* 'Quantity: ' */+this.format_account_balance_figure(item['purchase_unit_count']), 'details':this.props.app_state.loc['1064']/* 'Sender Account ID: ' */+item['sender_account'] })}
                    <div style={{height:10}}/>
                    {this.render_purchase_options_if_any(item)}
                    {this.render_fulfilment_signature_if_any(item, object)}
                </div>
                {this.render_clear_purchase_button(item, object, sender_type)}
            </div>
        )
    }

    get_variant_from_id(variant_id, object){
        for(var i=0; i<object['ipfs'].variants.length; i++){
            if(object['ipfs'].variants[i]['variant_id'] == variant_id){
                return object['ipfs'].variants[i]
            }
        }
    }

    render_purchase_options_if_any(item){
        var items = item['options']
        if(items == null || items.length == 0) return;
        var storefront_options = item['storefront_options']
        if(storefront_options == null || storefront_options.length == 0) return;
        return(
            <div>
                {items.map((item, index) => (
                    <div style={{'padding': '0px 0px 0px 0px'}}>
                        {/* {this.render_detail_item('3', {'title':storefront_options[index]['title'], 'details':storefront_options[index]['details'], 'size':'l'})}
                        <div style={{height:3}}/> */}
                        <Tags font={this.props.app_state.font} page_tags_object={item} tag_size={'l'} when_tags_updated={this.when_purchase_option_tag_selected.bind(this)} theme={this.props.theme} locked={true}/>
                        <div style={{height:3}}/>
                    </div>
                ))}
            </div>
        )
    }

    when_purchase_option_tag_selected(tag_item){
        //do nothing
    }

    render_fulfilment_signature_if_any(item, object){
        var signature = this.props.app_state.direct_purchase_fulfilments[object['id']]
        if(signature != null && signature[item['signature_data']] != null){
            signature = signature[item['signature_data']]
            return(
                <div>
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['2639']/* 'Fulfilment Signature: ' */, 'details':start_and_end(signature['signature']) })}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['2640']/* 'Signature Data: ' */, 'details':start_and_end(signature['signature_data']) })}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['2641']/* 'Signature Address: ' */, 'details':start_and_end(signature['sender_address']) })}
                </div>
            )
        }
    }

    render_clear_purchase_button(item, object, sender_type){
        var signature = this.props.app_state.direct_purchase_fulfilments[object['id']]
        if(signature == null || signature[item['signature_data']] == null){
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['2642b']/* 'Clear purchase.' */, 'details':this.props.app_state.loc['2642c']/* 'Clear the purchase to finalize its fulfilment.' */})}
                    <div style={{height:10}}/>
                    <div style={{'padding': '1px'}} onClick={() => this.clear_purchase(item, sender_type, object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2638']/* 'Clear Purchase' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    clear_purchase(item, sender_type, object){
        this.props.open_dialog_bottomsheet()
        this.props.open_clear_purchase(item, sender_type, object)
    }











    render_view_incoming_transactions(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_incoming_transactions_data()}
                    {this.render_detail_item('0')}
                    {this.render_recent_pending_transactions()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_incoming_transactions_data()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_recent_pending_transactions()}
                    </div>
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_incoming_transactions_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_recent_pending_transactions()}
                    </div>
                </div>
                
            )
        }
    }

    render_incoming_transactions_data(){
        var items = this.state.data['events']
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['2738l']/* 'Incoming transactions.' */, 'details':this.props.app_state.loc['2738s']/* 'The transactions should reflect on your end after a few minutes.' */})}
                <div style={{height:10}}/>
                <div style={{overflow: 'auto'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <div style={{'margin':'3px 0px 3px 0px'}}>
                                {this.render_notification_item(item, index)}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    render_notification_item(item, index){
        var sender = item.returnValues.p2
        var amount = item.returnValues.p4
        var depth = item.returnValues.p7
        var exchange = item.returnValues.p1
        var timestamp = item.returnValues.p5
        var e5 = item['e5']
        return(
            <div onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+exchange], 'number':this.get_actual_number(amount, depth), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange]})}>
                {this.render_detail_item('3', {'title':'💸 '+this.get_senders_name_or_you(sender, item['e5'])+this.props.app_state.loc['1593fg']/* ' sent you ' */+this.format_account_balance_figure(this.get_actual_number(amount, depth))+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange], 'details':''+(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'l'})}
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

    get_actual_number(number, depth){
        var p = (bigInt(depth).times(72)).toString().toLocaleString('fullwide', {useGrouping:false})
        var depth_vaule = bigInt(('1e'+p))
        return (bigInt(number).times(depth_vaule)).toString().toLocaleString('fullwide', {useGrouping:false})
    }

    get_senders_name_or_you(sender, e5){
        if(sender == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* You. */
        }
        var bucket = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
        var alias = (bucket[sender] == null ? sender : bucket[sender])
            return alias
    }

    render_recent_pending_transactions(){
        var items = this.state.data['previous_events']
        if(items.length == 0){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }
        return(
            <div>
                <div style={{overflow: 'auto'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <div style={{'margin':'3px 0px 3px 0px'}}>
                                {this.render_notification_item(item, index)}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }








    render_view_event_objects(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_transaction_object_data()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_transaction_object_data()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_transaction_object_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
            )
        }
    }

    render_transaction_object_data(){
        var items = this.state.data['events']
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['2738y']/* 'Affected Objects.' */, 'details':this.props.app_state.loc['2738z']/* 'Below are the objects that are in focus. They should take a few seconds to load.' */})}
                <div style={{height:10}}/>
                <div style={{overflow: 'auto'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <div style={{'margin':'3px 0px 3px 0px'}}>
                                {this.render_object_item(item, index)}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    render_object_item(event, index){
        const object = this.load_object(event)
        if(object == null){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }else{
            const item = this.format_item(object, event)
            var background_color = this.props.theme['card_background_color']
            var card_shadow_color = this.props.theme['card_shadow_color']
            return(
                <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                    <div style={{'padding': '0px 0px 0px 5px'}}>
                        {this.render_detail_item('1', item['tags'])}
                        <div style={{height: 10}}/>
                        <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_object_clicked(index, object)}>
                            {this.render_detail_item('3', item['id'])}
                        </div>
                        <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_object_clicked(index, object)}>
                            {this.render_detail_item('2', item['age'])}
                        </div>
                    </div>         
                </div>
            )
        }
    }

    load_object(event){
        var e5 = event['e5']
        var p = this.state.data['p']
        var type = this.state.data['type']
        var id = event.returnValues[p]
        var items = []
        if(type == 'storefront'){
            items = this.props.app_state.created_stores[e5]
        }
        else if(type == 'bag'){
            items = this.props.app_state.created_bags[e5]
        }
        else if(type == 'contract'){
            items = this.props.app_state.created_contracts[e5]
        }
        else if(type == 'contractor'){
            items = this.props.app_state.created_contractors[e5]
        }
        else if(type == 'job'){
            items = this.props.app_state.created_jobs[e5]
        }
        else if(type == 'message'){
            items = this.get_all_mail()
            return items.find(e => e['convo_id'] === id)
        }
        else if(type == 'proposal'){
            items = this.props.app_state.my_proposals[e5]
        }
        else if(type == 'bill'){
            items = this.props.app_state.created_bills[e5]
        }
        else if(type == 'comment'){
            const id_type = event['id_type']
            e5 = event['target_e5'] == null ? e5 : event['target_e5']
            const dir = {
                17/* 17(job object) */:this.props.app_state.created_jobs[e5], 
                18/* 18(post object) */:this.props.app_state.created_posts[e5], 
                19/* 19(audio_object) */:this.props.app_state.created_audios[e5], 
                20/* 20(video_object) */:this.props.app_state.created_videos[e5],
                21/* 21(nitro_object) */:this.props.app_state.created_nitros[e5], 
                25/* 25(storefront_bag_object) */:this.props.app_state.created_bags[e5], 
                27/* 27(storefront-item) */: this.props.app_state.created_stores[e5], 
                32/* 32(consensus_request) */:this.props.app_state.my_proposals[e5], 
                36/* 36(type_channel_target) */:this.props.app_state.created_channels[e5],
            }
            items = dir[id_type];
        }
        console.log('when_event_clicked', items)
        if(items == null) items = [];

        return items.find(e => e['id'] === id)
    }

    get_all_mail(){
        var mail_objects = []
        var all_messages = this.props.app_state.all_mail
        for(const convo_id in all_messages){
            if(all_messages.hasOwnProperty(convo_id)){
                var convo_messages = all_messages[convo_id]
                convo_messages.forEach(message => {
                    if(message['ipfs'] != null && message['ipfs'].entered_title_text != null){
                        mail_objects.push(message)
                    }
                });
            }
        }
        return mail_objects.reverse()
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

    format_item(object, event){
        if(this.state.data['type'] == 'comment'){
            const id_type = event['id_type']
            if(id_type == 17/* 17(job object) */){
                return this.format_job_item(object)
            }
            else if(id_type == 18/* 18(post object) */){
                return this.format_post_item(object)
            }
            else if(id_type == 19/* 19(audio_object) */){
                return this.format_audio_item(object)
            }
            else if(id_type == 20/* 20(video_object) */){
                return this.format_video_item(object)
            }
            else if(id_type == 21/* 21(nitro_object) */){
                return this.format_nitro_item(object)
            }
            else if(id_type == 25/* 25(storefront_bag_object) */){
                return this.format_bag_item(object)
            }
            else if(id_type == 27/* 27(storefront-item) */){
                return this.format_storefront_item(object)
            }
            else if(id_type == 32/* 32(consensus_request) */){
                return this.format_proposal_item(object)
            }
            else if(id_type == 36/* 36(type_channel_target) */){
                return this.format_channel_item(object)
            }
        }
        var tags = []
        if(this.state.data['type'] == 'bag'){
            tags = [object['event'].returnValues.p3]
            if(object['ipfs']['tags'] != null){
                tags = object['ipfs']['tags']
            }
            if(object['ipfs'].device_city != null){
                tags = [object['ipfs'].device_city].concat(tags)
            }
        }
        else if(this.state.data['type'] == 'bill'){
            var exchanges = object['ipfs'].price_data
            var obj = this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)
            exchanges.forEach(exchange_transfer => {
                var exchange = exchange_transfer['id']
                var exchange_name = obj[object['e5']+exchange]
                tags.push(exchange_name)
            });
        }
        else{
            tags = object['ipfs'] == null ? ['Object'] : [].concat(object['ipfs'].entered_indexing_tags)
            if(object['ipfs'].selected_device_city != null && object['ipfs'].selected_device_city != ''){
                tags = [object['ipfs'].selected_device_city].concat(tags)
            }
        }
        var timep = this.state.data['time']
        var blockp = this.state.data['block']
        var senderp = this.state.data['sender']

        var myid = this.props.app_state.user_account_id[object['e5']]
        if(myid == null) myid = 1;
        var sender = this.get_senders_name_or_you(event.returnValues[senderp], event['e5']);

        var details = object['ipfs'] == null ? 'Object ID' : object['ipfs'].entered_title_text
        if(this.state.data['type'] == 'bag'){
            details = object['ipfs'] == null ? '' : object['ipfs']['bag_orders'].length + this.props.app_state.loc['2509b']/* ' items' */+' • '+ object['responses']+this.props.app_state.loc['2509c']/* ' responses' */+' • '+sender
        }
        var title = ' • '+object['id']+' • '+sender
        if(this.state.data['type'] == 'message' || this.state.data['type'] == 'bill'){
            var recipient = object['event'].returnValues.p1
            title = ' • '+this.props.app_state.loc['2738ab']/* 'From $' */
            title = title.replace('$', sender)
            if(myid == event.returnValues[senderp]){
                title = ' • '+this.props.app_state.loc['2738ac']/* 'To $' */
                title = title.replace('$',this.get_senders_name_or_you(recipient, event['e5']))
            }
        }
        if(this.state.data['type'] == 'bill'){
            details = object['ipfs'] == null ? 'Identifier' : object['ipfs'].identifier
        }
        var age = event == null ? 0 : event.returnValues[blockp]
        var time = object['event'] == null ? 0 : event.returnValues[timep]
        
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'when_tapped':''},
            'id':{'details':details, 'title':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    when_object_clicked(index, object){
        this.props.when_notification_object_clicked(index, object, this.state.data, this.is_post_nsfw(object))
    }










    render_view_e5_link_objects(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_e5_link_objects()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_e5_link_objects()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_e5_link_objects()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
            )
        }
    }

    render_e5_link_objects(){
        var data = this.get_e5_link_items()
        var items = data.link_items
        var item_types = data.link_item_types
        var entry_text = this.props.app_state.loc['3067v']/* '$ entries found.' */
        entry_text = entry_text.replace('$', items.length)
        if(items.length == 0){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['2738ae']/* 'Found Objects matching that link.' */, 'details':this.props.app_state.loc['2738af']/* 'below are the objects that have been located by e matching the link. They should load in a few moments.' */})}
                    {this.render_detail_item('10', {'text':entry_text, 'textsize':'9px', 'font':this.props.app_state.font})}
                    <div style={{height:10}}/>
                    {this.render_empty_object()}
                </div>
            )
        }
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['2738ae']/* 'Found Objects matching that link.' */, 'details':this.props.app_state.loc['2738af']/* 'below are the objects that have been located by e matching the link. They should load in a few moments.' */})}
                {this.render_detail_item('10', {'text':entry_text, 'textsize':'9px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                <div style={{overflow: 'auto'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <div style={{'margin':'3px 0px 3px 0px'}}>
                                {this.render_link_object_item(item, index, item_types[index])}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    get_e5_link_items(){
        const id = this.state.data['id']
        const link_items = []
        const link_item_types = []
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            const e5 = this.props.app_state.e5s['data'][i]
            const object_type = this.props.app_state.link_type_data[e5]
            if(object_type != null && object_type != 0){
                const obj = {
                    17/* jobs */: this.props.app_state.created_jobs[e5],
                    30/* contracts */: this.props.app_state.created_contracts[e5],
                    32/* proposal */: this.props.app_state.my_proposals[e5],
                    26/* contractor */: this.props.app_state.created_contractors[e5],
                    33/* subscription */: this.props.app_state.created_subscriptions[e5],
                    18/* post */: this.props.app_state.created_posts[e5],
                    36/* channel */: this.props.app_state.created_channels[e5],
                    27/* storefront */: this.props.app_state.created_stores[e5],
                    25/* bag */: this.props.app_state.created_bags[e5],
                    31/* token */: this.props.app_state.created_tokens[e5],
                    19/* audioport */: this.props.app_state.created_audios[e5],
                    20/* videoport */: this.props.app_state.created_videos[e5],
                    21/* nitro */: this.props.app_state.created_nitros[e5],
                    28/* 28(poll-object) */: this.props.app_state.created_polls[e5]
                }
                const items = obj[object_type]
                const e5_object = items.find(e => e['id'] == id)
                if(e5_object != null && object_type != null && object_type != 0){
                    //found an object
                    link_items.push(e5_object)
                    link_item_types.push(object_type)
                }
            }
        }
        return { link_items, link_item_types }
    }

    render_link_object_item(object, index, type){
        const item = this.format_link_item(object, type)
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']

        var required_subscriptions = object['ipfs'].selected_subscriptions
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1

        if(!this.can_sender_view_poll(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        
        if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || this.is_post_preview_enabled(object) || post_author == me){
            return(
                <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                    <div style={{'padding': '0px 0px 0px 5px'}}>
                        {this.render_detail_item('1', item['tags'])}
                        <div style={{height: 10}}/>
                        <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_link_object_clicked(index, object, type)}>
                            {this.render_detail_item('3', item['id'])}
                        </div>
                        <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_link_object_clicked(index, object, type)}>
                            {this.render_detail_item('2', item['age'])}
                        </div>
                    </div>         
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
    }

    can_sender_view_poll(object){
        var viewers = object['ipfs'].viewers
        if(viewers.length == 0) return true;
        var my_active_accounts = this.load_my_active_accounts(object)
        return my_active_accounts.some(r=> viewers.includes(r))
    }

    load_my_active_accounts(object){
        var active_e5s = []
        var preferred_e5s = object['ipfs'].poll_e5s
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]
            if(this.props.app_state.e5s[e5].active == true && preferred_e5s.includes(e5)){
                var id = this.props.app_state.user_account_id[e5]
                if(id != null && id != 1){
                    var account = e5+':'+id
                    active_e5s.push(account)
                }
            }
        }
        return active_e5s
    }

    when_link_object_clicked = async (index, object, object_type) => {
        if(object_type == 17/* jobs */){
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 30/* contracts */){
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 32/* proposal */){
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 26/* contractor */){
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 33/* subscription */){
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 18/* post */){
            var required_subscriptions = object['ipfs'].selected_subscriptions
            var post_author = object['event'].returnValues.p5
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            
            if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || post_author == me){
                this.props.when_link_object_clicked(object, object_type, this.is_post_nsfw(object))
            }else{
                this.props.show_post_item_preview_with_subscription(object, 'post')
            }
        }
        else if(object_type == 36/* channel */){
            var required_subscriptions = object['ipfs'].selected_subscriptions
            var post_author = object['event'].returnValues.p5
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1

            var is_blocked = false
            if(object['ipfs']['blocked_data'] != null){
                var my_identifier = await this.get_my_unique_crosschain_identifier_number()
                if(object['ipfs']['blocked_data']['identifiers'][my_identifier] != null){
                    //ive been blocked
                    is_blocked = true
                }
            }

            if(object['hidden'] == true || is_blocked == true){
                this.props.notify(this.props.app_state.loc['2509d']/* 'That object is not available for you to access.' */, 9000)
                return;
            }
            
            if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || post_author == me){
                this.props.when_link_object_clicked(object, object_type)
            }else{
                this.props.show_post_item_preview_with_subscription(object, 'channel')
            }
        }
        else if(object_type == 27/* storefront */){
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 25/* bag */){
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 31/* token */){
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 19/* audioport */){
            var required_subscriptions = object['ipfs'].selected_subscriptions
            var post_author = object['event'].returnValues.p5
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            
            if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || post_author == me){
                this.props.when_link_object_clicked(object, object_type)
            }else{
                this.props.show_post_item_preview_with_subscription(object, 'audio')
            }
        }
        else if(object_type == 20/* videoport */){
            var required_subscriptions = object['ipfs'].selected_subscriptions
            var post_author = object['event'].returnValues.p5
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            
            if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || post_author == me){
                this.props.when_link_object_clicked(object, object_type, this.is_post_nsfw(object))
            }else{
                this.props.show_post_item_preview_with_subscription(object, 'video')
            }
        }
        else if(object_type == 21/* nitro */){
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 28/* 28(poll-object) */){
            this.props.when_link_object_clicked(object, object_type)
        }
    }

    get_my_unique_crosschain_identifier_number = async () => {
        var uint8array_string = await this.props.get_my_entire_public_key() 
        var uint8array = Uint8Array.from(uint8array_string.split(',').map(x=>parseInt(x,10)));
        var arr = uint8array.toString().replaceAll(',','')
        if(arr.length > 36){
            arr = arr.slice(0, 36);
        }
        return arr
    }

    format_link_item(object, object_type){
        if(object_type == 17/* jobs */){
            return this.format_job_item(object)
        }
        else if(object_type == 30/* contracts */){
            return this.format_contract_item(object)
        }
        else if(object_type == 32/* proposal */){
            return this.format_proposal_item(object)
        }
        else if(object_type == 26/* contractor */){
            return this.format_contractor_item(object)
        }
        else if(object_type == 33/* subscription */){
            return this.format_subscription_item(object)
        }
        else if(object_type == 18/* post */){
            return this.format_post_item(object)
        }
        else if(object_type == 36/* channel */){
            return this.format_channel_item(object)
        }
        else if(object_type == 27/* storefront */){
            return this.format_storefront_item(object)
        }
        else if(object_type == 25/* bag */){
            return this.format_bag_item(object)
        }
        else if(object_type == 31/* token */){
            return this.format_token_item(object)
        }
        else if(object_type == 19/* audioport */){
            return this.format_audio_item(object)
        }
        else if(object_type == 20/* videoport */){
            return this.format_video_item(object)
        }
        else if(object_type == 21/* nitro */){
            return this.format_nitro_item(object)
        }
        else if(object_type == 28 /* 28(poll-object) */){
            return this.format_poll_item(object)
        }
    }

    format_job_item(object){
        var tags = object['ipfs'] == null ? ['Job'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(object['ipfs'].selected_device_city != null && object['ipfs'].selected_device_city != ''){
            tags = [object['ipfs'].selected_device_city].concat(tags)
        }
        var title = object['ipfs'] == null ? 'Job ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        var responses_text = object['responses']+this.props.app_state.loc['2509c']/* ' responses' */
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id']+sender+' • '+responses_text, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    format_contract_item(object){
        var main_contract_tags = ['Contract', 'main', object['e5'] ]
        var tags = object['ipfs'] == null ? (object['id'] == 2 ? main_contract_tags : ['Contract']) : [object['e5']].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Contract ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var time = object['event'] == null ? 0 : object['event'].returnValues.p4
        var id_text = ' • '+object['id']
        if(object['id'] == 2) id_text = ' • '+'Main Contract'
        var sender = object['event'] == null ? '' : this.get_senders_name(object['event'].returnValues.p3, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':id_text+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{ 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':this.get_time_difference(time), }
        }
    }

    format_proposal_item(object){
        var tags = object['ipfs'] == null ? ['Proposal'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Proposal ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p6
        var time = object['event'] == null ? 0 : object['event'].returnValues.p5
        var sender = this.get_senders_name(object['event'].returnValues.p4, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id']+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    get_senders_name(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return ' • '+this.props.app_state.loc['1694']/* 'You' */
        }else{
            var obj = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
            var alias = (obj[sender] == null ? '' : ' • '+obj[sender])
            return alias
        }
    }

    format_nitro_item(object){
        var tags = object['ipfs'] == null ? ['NitroPost'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'NitroPost ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name2(object['event'].returnValues.p5, object);
        var author = sender
        var default_image = EndImg
        var image = object['ipfs'] == null ? default_image : (object['ipfs'].album_art == null ? default_image : object['ipfs'].album_art)

        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':object['id']+' • '+author, 'details':title, 'size':'l', 'image':image, 'border_radius':'7px'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    format_subscription_item(object){
        var tags = object['ipfs'] == null ? ['Subscription'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Subscription ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var time = object['event'] == null ? 0 : object['event'].returnValues.p4
        var sender = this.get_senders_name(object['event'].returnValues.p3, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id']+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    format_contractor_item(object){
        var tags = object['ipfs'] == null ? ['Contractor'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(object['ipfs'].selected_device_city != null && object['ipfs'].selected_device_city != ''){
            tags = [object['ipfs'].selected_device_city].concat(tags)
        }
        var title = object['ipfs'] == null ? 'Contractor ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id']+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    format_post_item(object){
        var tags = object['ipfs'] == null ? ['Post'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(object['ipfs'].selected_device_city != null && object['ipfs'].selected_device_city != ''){
            tags = [object['ipfs'].selected_device_city].concat(tags)
        }
        var extra = ''
        if(this.is_post_nsfw(object)){
            extra = extra+'🔞'
        }
        var required_subscriptions = object['ipfs'].selected_subscriptions
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        if(!this.check_if_sender_has_paid_subscriptions(required_subscriptions) && post_author != me){
            extra = extra+'🔏'
        }
        if(extra != '') extra = extra + ' '
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        if(this.is_post_anonymous(object)){
            sender = ''
        }
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id']+sender, 'details':extra+title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    is_post_nsfw(object){
        if(object['ipfs'].get_post_nsfw_option == null) return false
        var selected_nsfw_option = this.get_selected_item2(object['ipfs'].get_post_nsfw_option, 'e')
        if(selected_nsfw_option == 1) return true
    }

    check_if_sender_has_paid_subscriptions(required_subscriptions){
        var has_sender_paid_all_subs = true
        if(required_subscriptions == null) return true
        required_subscriptions.forEach(subscription_id => {
            if(!this.has_paid_subscription(parseInt(subscription_id))){
                has_sender_paid_all_subs=  false
            }
        });

        return has_sender_paid_all_subs
    }

    has_paid_subscription(required_subscription_set){
        var my_payment = this.get_all_sorted_objects_mappings(this.props.app_state.my_subscription_payment_mappings)[required_subscription_set]
        if(my_payment == null || my_payment == 0) return false;
        return true
    }

    is_post_preview_enabled(object){
        if(object['ipfs'] == null || object['ipfs'].get_post_preview_option == null) return false
        var selected_post_preview_option = this.get_selected_item2(object['ipfs'].get_post_preview_option, 'e')
        if(selected_post_preview_option == 2) return true
        return false
    }

    get_selected_item2(object, option){
        return object[option][2][0]
    }

    is_post_anonymous(object){
        var is_anonymous = false;
        if(object['ipfs'].get_post_anonymously_tags_option != null){
            var option = this.get_selected_item2(object['ipfs'].get_post_anonymously_tags_option, 'e')
            if(option == 1){
                is_anonymous = true
            }
        }
        return is_anonymous
    }

    format_channel_item(object){
        var tags = object['ipfs'] == null ? ['Post'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(object['ipfs'].selected_device_city != null && object['ipfs'].selected_device_city != ''){
            tags = [object['ipfs'].selected_device_city].concat(tags)
        }
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        var extra = ''
        if(object['ipfs']['blocked_data'] != null){
            extra = extra+'🗝️'
        }
        var required_subscriptions = object['ipfs'].selected_subscriptions
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        if(!this.check_if_sender_has_paid_subscriptions(required_subscriptions) && post_author != me){
            extra = extra+'🔏'
        }
        if(extra != ''){
            extra = extra+' '
        }
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id']+sender, 'details':extra+title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    format_storefront_item(object){
        var tags = object['ipfs'] == null ? ['Storefront'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(object['ipfs'].selected_device_city != null && object['ipfs'].selected_device_city != ''){
            tags = [object['ipfs'].selected_device_city].concat(tags)
        }
        var title = object['ipfs'] == null ? 'Storefront ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id']+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    format_bag_item(object){
        var tags = [object['event'].returnValues.p3]
        if(object['ipfs']['tags'] != null){
            tags = object['ipfs']['tags']
        }
        if(object['ipfs'].device_city != null){
            tags = [object['ipfs'].device_city].concat(tags)
        }
        var sender = this.get_senders_name(object['event'].returnValues.p3, object);
        var title = object['ipfs'] == null ? '' : object['ipfs']['bag_orders'].length + this.props.app_state.loc['2509b']/* ' items' */+' • '+ object['responses']+this.props.app_state.loc['2509c']/* ' responses' */+sender
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var time = object['event'] == null ? 0 : object['event'].returnValues.p4
        // var item_images = this.get_bag_images(object)
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id'], 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img},
            // 'id_with_image':{'title':object['id'], 'details':title, 'size':'l', 'image':image},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)} ago`, },
        }
    }

    format_audio_item(object){
        var tags = object['ipfs'] == null ? ['Audiopost'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(object['ipfs'].audio_type != null){
            tags = [object['ipfs'].audio_type].concat(tags)
        }
        var extra = ''
        var required_subscriptions = object['ipfs'].selected_subscriptions
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        if(!this.check_if_sender_has_paid_subscriptions(required_subscriptions) && post_author != me){
            extra = extra+'🔏'
        }
        if(extra != '') extra = extra + ' '
        var title = object['ipfs'] == null ? 'Audiopost ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        var author = object['ipfs'] == null ? sender : object['ipfs'].entered_author_text
        if(this.is_post_anonymous(object)){
            author = ''
        }
        var listing_type = object['ipfs'] == null ? 'Audiopost' :this.get_selected_item(object['ipfs'].get_listing_type_tags_option, 'e')
        var default_image = this.props.app_state.static_assets['music_label']
        var image = object['ipfs'] == null ? default_image :object['ipfs'].album_art
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':/* object['e5']+' • '+object['id']+' • '+ *//* listing_type+' • '+ */author, 'details':extra+title, 'size':'l', 'image':image, 'border_radius':'7px'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },
            'min':{'details': author+' • '+this.get_time_difference(time), 'title':extra+title, 'size':'l','image':image, 'border_radius':'7px',}
        }
    }

    format_video_item(object){
        var tags = object['ipfs'] == null ? ['Videopost'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(object['ipfs'].video_type != null){
            tags = [object['ipfs'].video_type].concat(tags)
        }
        var extra = ''
        var required_subscriptions = object['ipfs'].selected_subscriptions
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        if(!this.check_if_sender_has_paid_subscriptions(required_subscriptions) && post_author != me){
            extra = extra+'🔏'
        }
        if(extra != '') extra = extra + ' '
        var title = object['ipfs'] == null ? 'Videopost ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name2(object['event'].returnValues.p5, object);
        var author = sender
        if(this.is_post_anonymous(object)){
            author = ''
        }
        var default_image = this.props.app_state.static_assets['video_label']
        var image = object['ipfs'] == null ? default_image : object['ipfs'].album_art
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':author, 'details':extra+title, 'size':'l', 'image':image, 'border_radius':'7px', 'image_width':'auto'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    get_senders_name2(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            const obj = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
            var alias = (obj[sender] == null ? sender : obj[sender])
            return alias
        }
    }

    format_token_item(object){
        var object_array = object['data']
        var token_id = object['id']
        var item = object
        var type = object_array[0][3/* <3>token_type */] == 3 ? 'END': 'SPEND'
        var active_tags = item['ipfs'] == null ? [''+type, 'token'] : item['ipfs'].entered_indexing_tags
        var name = item['ipfs'] == null ? 'Token ID: '+token_id : item['ipfs'].entered_title_text
        var img = EndImg
        if(token_id == 3){
            name = item['e5']
        } else if(token_id == 5){
            name = item['e5'].replace('E','3')
            img = SpendImg
        }
        var symbol = item['ipfs'] == null ? ''+type : item['ipfs'].entered_symbol_text
        var image = img
        if(item['ipfs']!= null){
            if(item['ipfs'].token_image!= null){
                image = item['ipfs'].token_image
            }
        }

        var balance = item['balance']
        var age = item['event'] == null ? 0 : item['event'].returnValues.p5
        var time = item['event'] == null ? 0 : item['event'].returnValues.p4
        return{
            'tags':{'active_tags':[].concat(active_tags), 'index_option':'indexed', 'when_tapped':'select_deselect_tag', 'selected_tags':this.props.app_state.explore_section_tags},
            'id':{'title':name,'details':symbol, 'size':'l', 'image':image, 'border_radius':'15%'},
            'number_label':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(balance), 'number':`${this.format_account_balance_figure(balance)}`, 'barcolor':'#606060', 'relativepower':'balance',},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    format_poll_item(object){
        var tags = object['ipfs'] == null ? ['Post'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id']+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },
            'min':{'details':object['e5']+' • '+object['id']+sender, 'title':title, 'size':'l', 'border_radius':'0%'}
        }
    }










    render_account_options_data(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_account_option_items()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_account_option_items()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_account_option_items()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_account_option_items(){
        var account_id = this.state.data['account']
        var e5 = this.state.data['e5']
        var alias = (this.props.app_state.alias_bucket[e5][account_id] == null ? this.props.app_state.loc['1584']/* 'Alias Unknown' */ : this.props.app_state.alias_bucket[e5][account_id])
        return(
            <div>
                {this.render_detail_item('3', {'title':account_id, 'details':alias, 'size':'l'})}
                {this.render_detail_item('0')}
                
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055y']/* 'Add to Contacts' */, 'details':this.props.app_state.loc['3055z']/* 'Add the account to your contact list for easier access in the future.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_add_to_contacts_selected()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055y']/* 'Add to Contacts' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055ba']/* 'Block Account' */, 'details':this.props.app_state.loc['3055bb']/* 'Hide the acccounts content from your feed, your content and the feed of your followers.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_block_contact_selected()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055ba']/* 'Block Account' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                <div style={{height:5}}/>
                {this.render_detail_item('10', {'text':this.props.app_state.loc['3055bi']/* 'If you do this, the changes will reflect on other feeds after your next run.' */ , 'textsize':'10px', 'font':this.props.app_state.font})}
                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055bc']/* 'View Account' */, 'details':this.props.app_state.loc['3055bd']/* 'View the accounts entire activity on e.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_view_account_selected()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055bc']/* 'View Account' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055be']/* 'Copy Account' */, 'details':this.props.app_state.loc['3055bf']/* 'Copy the accounts ID to your clipboard' */, 'size':'l'})}
                {this.render_copy_alias_if_exists()}
                
                {this.render_detail_item('0')}
                {this.render_detail_item('0')}
            </div>
        )
    }

    render_copy_alias_if_exists(){
        var account_id = this.state.data['account']
        var e5 = this.state.data['e5']
        var alias = (this.props.app_state.alias_bucket[e5][account_id] == null ? null : this.props.app_state.alias_bucket[e5][account_id])
        if(alias != null){
            return(
                <div>
                    <div className="row">
                        <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                            <div onClick={() => this.when_copy_to_clipboard_selected(account_id)}>
                                {this.render_detail_item('5', {'text':this.props.app_state.loc['3055be']/* 'Copy Account' */, 'action':'', 'font':this.props.app_state.font})}
                            </div>
                        </div>
                        <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                            <div onClick={() => this.when_copy_to_clipboard_selected(alias)}>
                                {this.render_detail_item('5', {'text':this.props.app_state.loc['3055bg']/* 'Copy Alias' */, 'action':'', 'font':this.props.app_state.font})}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return(
            <div>
                <div style={{height:10}}/>
                <div onClick={() => this.when_copy_to_clipboard_selected(account_id)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055be']/* 'Copy Account' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
            </div>
        )
    }

    when_copy_to_clipboard_selected(data){
        navigator.clipboard.writeText(data)
        this.props.notify(this.props.app_state.loc['3055bh']/* 'Copied to Clipboard.' */, 1200)
    }

    when_block_contact_selected(){
        var account_id = this.state.data['account']
        var e5 = this.state.data['e5']
        if(!this.props.app_state.has_wallet_been_set){
            this.props.notify(this.props.app_state.loc['1577']/* 'Please set your wallet first.' */, 3200);
            return;
        }
        this.props.when_block_contact_selected(account_id, e5)
    }

    when_add_to_contacts_selected(){
        var account_id = this.state.data['account']
        var e5 = this.state.data['e5']
        if(!this.props.app_state.has_wallet_been_set){
            this.props.notify(this.props.app_state.loc['1577']/* 'Please set your wallet first.' */, 3200);
            return;
        }
        this.props.when_add_to_contact_selected(account_id, e5)
    }

    when_view_account_selected(){
        var account_id = this.state.data['account']
        var e5 = this.state.data['e5']
        this.props.when_view_account_details_selected(account_id, e5)
    }








    render_cofirm_pay_bill(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_render_cofirm_pay_bill_items()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_render_cofirm_pay_bill_items()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_my_balances_bit_if_medium_or_large()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_render_cofirm_pay_bill_items()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_my_balances_bit_if_medium_or_large()}
                    </div>
                </div>
                
            )
        }
    }

    render_render_cofirm_pay_bill_items(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3071g']/* 'Confirm Bill Payments' */, 'details':this.props.app_state.loc['3071h']/* 'Confirm that you want to fulfill all the bill payments listed below.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_bills_objects()}
                <div style={{height:10}}/>
                {this.render_bills_list_part()}
                {this.render_my_balances_bit_if_small()}
                <div onClick={()=> this.confirm_bill_payments()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3071i']/* 'Confirm Payments.' */, 'action':''},)}
                </div>
            </div>
        )
    }

    render_my_balances_bit_if_small(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_detail_item('4', {'text':this.props.app_state.loc['3055cn']/* Your balance. */, 'textsize':'13px', 'font':this.props.app_state.font})}
                    <div style={{height:10}}/>
                    {this.render_my_balances()}
                    <div style={{height:20}}/>
                </div>
            )
        }
    }

    render_my_balances_bit_if_medium_or_large(){
        return(
            <div>
                {this.render_detail_item('4', {'text':this.props.app_state.loc['3055cn']/* Your balance. */, 'textsize':'13px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                {this.render_my_balances()}
                <div style={{height:10}}/>
            </div>
        )
    }

    render_bills_objects(){
        var items = [].concat(this.get_bill_object_items())
        var items2 = [0, 1, 2]
        if(items.length == 0){
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items2.map(() => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_empty_horizontal_list_item()}
                        </li>
                    ))}
                </ul>
            </div>
            )
        }
        return(
            <div>
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none', 'opacity':this.get_opacity(item)}} onClick={() => this.when_bill_clicked(item)}>
                                {this.render_detail_item('3', {'title':item['title'], 'details':item['details'], 'size':'l', 'border_radius':'0%'},)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    get_opacity(item){
        var index = item['object']['e5_id']
        var opacity = this.state.ignored_bills.includes(index) ? 0.6 : 1.0
        return opacity
    }

    get_bill_object_items(){
        var objects = this.state.data['objects']
        var items = []
        objects.forEach(object => {
            var details = object['ipfs'] == null ? 'Identifier' : start_and_end(object['ipfs'].identifier)
            var myid = this.props.app_state.user_account_id[object['e5']]
            if(myid == null) myid = 1;
            var sender = object['event'].returnValues.p2
            var recipient = object['event'].returnValues.p1
            var title = this.props.app_state.loc['2738ab']/* 'From $' */
            title = title.replace('$', this.get_sender_title_text(sender, object))
            if(myid == sender){
                title = this.props.app_state.loc['2738ac']/* 'To $' */
                title = title.replace('$',this.get_sender_title_text(recipient, object))
            }
            items.push({'object':object, 'title':title, 'details':details})
        });
        return items
    }

    get_sender_title_text(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    render_empty_horizontal_list_item(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div>
                <div style={{height:50, width:65, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                    </div>
                </div>
            </div>
        )
    }

    when_bill_clicked(item){
        var index = item['object']['e5_id']
        var clone = this.state.ignored_bills.slice()
        if(clone.includes(index)){
            var pos = clone.indexOf(index)
            if(pos != -1){
                clone.splice(pos, 1)
            }
        }else{
            clone.push(index)
        }
        if(clone.length != this.state.data['objects'].length){
            this.setState({ignored_bills: clone})
        }
    }

    render_bills_list_part(){
        var items = [].concat(this.get_all_bill_transactions())
        if(items.length == 0){
            items = [0,3,0]
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }else{
            return(
                <div style={{overflow: 'auto'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '1px 1px 1px 1px'}}>
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[item['e5']+item['exchange']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['exchange']]})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[item['e5']+item['exchange']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['exchange']], })}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        } 
    }

    render_my_balances(){
        var items = [].concat(this.get_all_bill_transactions())
        if(items.length > 0){
            var buy_amounts = []
            var bt = []
            var token_e5s = []
            for(var i=0; i<items.length; i++){
                var token_id = items[i]['exchange']
                var token_balance = this.props.app_state.created_token_object_mapping[items[i]['e5']][token_id]
                token_balance = token_balance == null ? 0 : token_balance['balance']
                buy_amounts.push(token_balance)
                bt.push(token_id)
                token_e5s.push(items[i]['e5'])
            }

            return(
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px', 'list-style':'none'}}>
                        {bt.map((item, index) => (
                            <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'number':buy_amounts[index], 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[token_e5s[index]+item], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                                {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[token_e5s[index]+item], 'subtitle':this.format_power_figure(buy_amounts[index]), 'barwidth':this.calculate_bar_width(buy_amounts[index]), 'number':this.format_account_balance_figure(buy_amounts[index]), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                            </li>
                        ))}
                    </ul>
                </div>  
            )
        }
    }

    get_all_bill_transactions(){
        var objects = this.state.data['objects']
        var selected_objects = []
        objects.forEach(object => {
            var index = object['e5_id']
            if(!this.state.ignored_bills.includes(index)){
                selected_objects.push(object)
            }
        });

        var transaction_object = {}
        selected_objects.forEach(object => {
            var price_data = object['ipfs'].price_data
            if(transaction_object[object['e5']] == null){
                transaction_object[object['e5']] = {}
            }
            price_data.forEach(price_element => {
                if(transaction_object[object['e5']][price_element['id']] == null){
                   transaction_object[object['e5']][price_element['id']] = bigInt(0) 
                }
                transaction_object[object['e5']][price_element['id']] = bigInt(transaction_object[object['e5']][price_element['id']]).plus(price_element['amount'])
            });
        });

        var e5_keys = Object.keys(transaction_object)
        var all_transfers = []
        e5_keys.forEach(e5 => {
            var exchanges = Object.keys(transaction_object[e5])
            exchanges.forEach(exchange => {
                all_transfers.push({'e5':e5, 'exchange':exchange, 'amount':transaction_object[e5][exchange]})
            });
        });

        return all_transfers
    }

    confirm_bill_payments(){
        var objects = this.state.data['objects']
        var selected_objects = []
        objects.forEach(object => {
            var index = object['e5_id']
            if(!this.state.ignored_bills.includes(index)){
                selected_objects.push(object)
            }
        });

        if(!this.check_if_sender_has_enough_money()){
            this.props.notify(this.props.app_state.loc['3068aa']/* 'One of your token balances is insufficient for the transfer amounts specified.' */, 6900)
            return;
        }
        this.props.add_bill_payments_to_stack(selected_objects)
    }

    check_if_sender_has_enough_money(){
        var price_data = this.get_all_bill_transactions()
        var has_enough = true;
        for(var i=0; i<price_data.length; i++){
            var e5 = price_data[i]['e5']
            var amount = price_data[i]['amount']
            var exchange = price_data[i]['exchange']
            var my_balance = this.props.calculate_actual_balance(e5, exchange)
            my_balance = bigInt(my_balance).minus(this.get_debit_balance_in_stack(exchange, e5))
            if(bigInt(my_balance).lesser(bigInt(amount))){
                has_enough = false
            }
        }
        return has_enough
    }

    get_debit_balance_in_stack(token_id, e5){
        var txs = this.props.app_state.stack_items
        var total_amount = bigInt(0)
        for(var i=0; i<txs.length; i++){
            var t = txs[i]
            if(txs[i].e5 == e5){
                if(txs[i].type == this.props.app_state.loc['946']/* 'buy-sell' */){
                    var amount = bigInt(txs[i].amount)
                    var exchange = t.token_item['id']
                    var action = this.get_action(t)
                    if(token_id == exchange && action == 1){
                        total_amount = bigInt(total_amount).add(amount)
                    }
                }
                else 
                if(txs[i].type == this.props.app_state.loc['1018']/* 'transfer' */){
                    if(txs[i].token_item['id'] == token_id){
                        total_amount = bigInt(total_amount).add(txs[i].debit_balance)
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['1499']/* 'direct-purchase' */){
                    for(var i=0; i<t.selected_variant['price_data'].length; i++){
                        var exchange = t.selected_variant['price_data'][i]['id']
                        var amount = this.get_amounts_to_be_paid(t.selected_variant['price_data'][i]['amount'], t.purchase_unit_count)
                        if(exchange == token_id){
                            total_amount = bigInt(total_amount).add(amount)
                        }
                    }
                    for(var i=0; i<t.storefront_item['ipfs'].shipping_price_data.length; i++){
                        var exchange = t.storefront_item['ipfs'].shipping_price_data[i]['id']
                        var amount = this.get_amounts_to_be_paid(t.storefront_item['ipfs'].shipping_price_data[i]['amount'], t.purchase_unit_count)
                        if(exchange == token_id){
                            total_amount = bigInt(total_amount).add(amount)
                        }
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['1155']/* 'award' */){
                    if(token_id == 5){
                        total_amount = bigInt(total_amount).add(t.award_amount)
                    }
                    for(var i=0; i<t.price_data.length; i++){
                        var exchange = t.price_data[i]['id']
                        var amount = t.price_data[i]['amount']
                        if(exchange == token_id){
                            total_amount = bigInt(total_amount).add(amount)
                        }
                    }
                }
                // else if(txs[i].type == this.props.app_state.loc['946']/* 'buy-sell' */){
                //     var buy_tokens = t.token_item['data'][3]
                //     var required_amounts = this.calculate_token_prices(t, t.token_item['data'][4])
                //     for(var i=0; i<buy_tokens.length; i++){
                //         var buy_token_id = buy_tokens[i]
                //         if(buy_token_id == token_id){
                //             var required_amount = required_amounts[i]
                //             total_amount = bigInt(total_amount).add(required_amount)
                //         }
                //     }
                // }
                // else if(txs[i].type == this.props.app_state.loc['1']/* 'enter-contract' */){
                //     var entry_tokens = t.contract_item['data'][2]
                //     var entry_amounts = t.contract_item['data'][3]
                //     for(var i=0; i<entry_tokens.length; i++){
                //         var entry_token_id = entry_tokens[i]
                //         if(entry_token_id == token_id){
                //             var required_amount = entry_amounts[i]
                //             total_amount = bigInt(total_amount).add(required_amount)
                //         }
                //     }
                // }
                // else if(txs[i].type == this.props.app_state.loc['312']/* 'proposal' */){
                //     for(var i = 0; i<t.bounty_values.length; i++){
                //         if(t.bounty_values[i]['exchange'] == token_id){
                //             var required_amount = t.bounty_values[i]['amount']
                //             total_amount = bigInt(total_amount).add(required_amount)
                //         }
                //     }
                // }
                // else if(txs[i].type == this.props.app_state.loc['862']/* 'pay-subscription' */){
                //     var entry_tokens = this.state.subscription_item['data'][2]
                //     var entry_fees = this.state.subscription_item['data'][3]
                //     for(var i=0; i<entry_tokens.length; i++){
                //         if(token_id == entry_tokens[i]){
                //             var required_amount = this.calculate_final_amount(entry_fees[i], t)
                //             total_amount = bigInt(total_amount).add(required_amount)
                //         }
                //     }
                // }
                // else if(txs[i].type == this.props.app_state.loc['2896']/* 'upcoming-subscriptions' */){
                //     var exchanges_used = t.data.exchanges_used
                //     var exchange_amounts = t.data.exchange_amounts
                //     for(var i=0; i<exchanges_used.length; i++){
                //         if(token_id == exchanges_used[i]){
                //             var required_amount = exchange_amounts[token_id]
                //             total_amount = bigInt(total_amount).add(required_amount)
                //         }
                //     }
                // }
            }
        }
        return total_amount
    }

    get_action(t){
        var action = this.get_selected_item(t.new_mint_dump_action_page_tags_object, 'e')
        var stack_action = 1
        if(action == this.props.app_state.loc['949']/* 'mint-buy' */) stack_action = 0
        return stack_action
    }
    
    get_amounts_to_be_paid(amount, count){
        return bigInt(amount).multiply(bigInt(count))
    }












    render_invalid_stack_size(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_invalid_stack_size_items()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_invalid_stack_size_items()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_invalid_stack_size_items()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_invalid_stack_size_items(){
        var upload_limit = this.format_data_size(this.props.app_state.upload_object_size_limit)
        var stack_size = this.format_data_size(this.state.data['stack_size'])
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055bk']/* 'Stack Too Large.' */, 'details':this.props.app_state.loc['3055bl']/* 'The amount of data your uploading to E5 is too much for one transaction. Try splitting it into multiple runs.' */, 'size':'l'})}
                {this.render_detail_item('0')}
                
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3055bm']/* 'Upload Size Limit.' */, 'subtitle':this.format_power_figure(upload_limit['size']), 'barwidth':this.calculate_bar_width(upload_limit['size']), 'number':this.format_account_balance_figure(upload_limit['size']), 'barcolor':'#606060', 'relativepower':upload_limit['unit'], })}
                </div>
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3055bn']/* 'Stack Size' */, 'subtitle':this.format_power_figure(stack_size['size']), 'barwidth':this.calculate_bar_width(stack_size['size']), 'number':this.format_account_balance_figure(stack_size['size']), 'barcolor':'#606060', 'relativepower':stack_size['unit'], })}
                </div>
            </div>
        )
    }












    render_file_type_picker(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_file_type_picker_buttons()}
                    {this.render_detail_item('0')}
                    {this.render_file_type_picker_buttons2()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_file_type_picker_buttons()}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_file_type_picker_buttons2()}
                        <div style={{height:10}}/>
                        {this.render_empty_views(2)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_file_type_picker_buttons()}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_file_type_picker_buttons2()}
                        <div style={{height:10}}/>
                        {this.render_empty_views(2)}
                    </div>
                </div>
                
            )
        }
    }

    render_file_type_picker_buttons(){
        return(
            <div>
                {this.render_detail_item('8', {'title':this.props.app_state.loc['3055bo']/* 'Pick Image' */, 'details':this.props.app_state.loc['3055bp']/* 'Images with the .png .jpg and .jpeg extensions are supported as well as .gif files.' */, 'size':'l', 'image':this.props.app_state.static_assets['empty_image'],'border_radius':'9px'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_file_type_selected('image')}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055bo']/* 'Pick Image' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}

                {this.render_detail_item('8', {'title':this.props.app_state.loc['3055bq']/* 'Pick Audio' */, 'details':this.props.app_state.loc['3055br']/* 'Audio files with the .mp3 extensions are supported.' */, 'size':'l', 'image':this.props.app_state.static_assets['music_label'],'border_radius':'9px'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_file_type_selected('audio')}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055bq']/* 'Pick Audio' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}

                {this.render_detail_item('8', {'title':this.props.app_state.loc['3055bs']/* 'Pick Video' */, 'details':this.props.app_state.loc['3055bt']/* 'Video files with the .mp4 extensions are supported.' */, 'size':'l', 'image':this.props.app_state.static_assets['video_label'],'border_radius':'9px'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_file_type_selected('video')}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055bs']/* 'Pick Video' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}


                {this.render_detail_item('8', {'title':this.props.app_state.loc['3055cp']/* 'Pick Lyric File.' */, 'details':this.props.app_state.loc['3055cq']/* 'Lyric files with the .lrc extensions are supported.' */, 'size':'l', 'image':this.props.app_state.static_assets['lyric_icon'],'border_radius':'9px'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_file_type_selected('lyric')}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055cp']/* 'Pick Lyric File.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
            </div>
        )
    }

    render_file_type_picker_buttons2(){
        return(
            <div>
                {this.render_detail_item('8', {'title':this.props.app_state.loc['3055bu']/* 'Pick PDF' */, 'details':this.props.app_state.loc['3055bv']/* 'Pdf files with the .pdf extensions are supported.' */, 'size':'l', 'image':this.props.app_state.static_assets['pdf_icon'],'border_radius':'9px'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_file_type_selected('pdf')}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055bu']/* 'Pick PDF' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}

                {this.render_detail_item('8', {'title':this.props.app_state.loc['3055bw']/* 'Pick Zip' */, 'details':this.props.app_state.loc['3055bx']/* 'Compressed files with the .zip extensions are supported.' */, 'size':'l', 'image':this.props.app_state.static_assets['zip_file'],'border_radius':'9px'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_file_type_selected('zip')}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055bw']/* 'Pick Zip' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}


                {this.render_detail_item('8', {'title':this.props.app_state.loc['3055cr']/* 'Pick Subtitle File.' */, 'details':this.props.app_state.loc['3055cs']/* 'Subtitle files with the .vtt extensions are supported' */, 'size':'l', 'image':this.props.app_state.static_assets['subtitle_icon'],'border_radius':'9px'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_file_type_selected('subtitle')}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055cr']/* 'Pick Subtitle File.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
            </div>
        )
    }

    when_file_type_selected(type){
        this.props.when_file_type_to_select_is_selected(type)
    }












    render_home_page_view_options(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_home_page_view_items()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_home_page_view_items()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_home_page_view_items()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        } 
    }

    render_home_page_view_items(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055ck']/* 'Scroll to Top.' */, 'details':this.props.app_state.loc['3055cl']/* 'Scroll to the top of the section.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_scroll_to_top_section_selected()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055ck']/* 'Scroll to Top' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055ci']/* 'Reload Section.' */, 'details':this.props.app_state.loc['3055cj']/* 'Reload the section and scroll to the top.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_reload_section_selected()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055ci']/* 'Reload Section.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>

            </div>
        )
    }

    when_scroll_to_top_section_selected(){
        this.props.when_scroll_to_top_section(this.state.data)
    }

    when_reload_section_selected(){
        this.props.when_reload_section(this.state.data)
    }









    render_poll_json_example(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_poll_json_example_item()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_poll_json_example_item()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_poll_json_example_item()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        } 
    }

    render_poll_json_example_item(){
        var data = {
            'E25':[1002, 1003, 1004, 1005], 
            'E35':[1032, 7003, 29304, 39205], 
            'E45':[1032, 10009, 19829, 182928]
        }
        var view_theme = this.props.app_state.theme['json_view_theme']
        return(
            <div>
                {this.render_detail_item('4', {'text':this.props.app_state.loc['3055co']/* The JSON object in the file should look something like this. Make sure the format matches exactly, otherwise it wont work. */, 'textsize':'13px', 'font':this.props.app_state.font})}
                <div style={{height:15}}/>
                <ReactJson src={data} theme={view_theme} collapsed={false} iconStyle={'circle'} displayObjectSize={false} displayDataTypes={false}
                />
            </div>
        )
    }







    render_poll_results(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_poll_result_items()}
                    {this.render_detail_item('0')}
                    {this.render_poll_result_item2()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_poll_result_items()}
                        <div style={{height:10}}/>
                        {this.render_empty_views(2)}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_poll_result_item2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_poll_result_items()}
                        <div style={{height:10}}/>
                        {this.render_empty_views(2)}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_poll_result_item2()}
                    </div>
                </div>
                
            )
        }
    }

    render_poll_result_items(){
        return(
            <div>
                {this.load_my_used_nitro_objects()}
                <div style={{height:10}}/>
                {this.render_poll_result_item()}
            </div>
        )
    }

    load_my_used_nitro_objects(){
        var items = this.load_used_nitros()
        var items2 = [0, 1, 2]
        if(items.length == 0){
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items2.map(() => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_empty_horizontal_list_item2()}
                        </li>
                    ))}
                </ul>
            </div>
            )
        }
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_used_nitro_item_clicked(item)}>
                            {this.render_nitro_item(item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_empty_horizontal_list_item2(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div>
                <div style={{height:43, width:127, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                    </div>
                </div>
            </div>
        )
    }

    allElementsAppearOnce(arr1, arr2) {
        const countMap = {};
        for (const el of arr2) {
            countMap[el] = (countMap[el] || 0) + 1;
        }
        return arr1.every(el => countMap[el] >= 1);
    }

    render_nitro_item(item){
        var object = item
        var default_image = this.props.app_state.static_assets['end_img']
        var image = object['ipfs'] == null ? default_image : (object['ipfs'].album_art == null ? default_image : object['ipfs'].album_art)
        var title = item['e5']+' • '+item['id']
        var details = object['ipfs'] == null ? 'Nitropost ID' : start_and_end(object['ipfs'].entered_title_text)
        if(this.state.selected_nitro_item == item['e5_id']){
            return(
                <div>
                    {this.render_detail_item('12', {'title':title, 'image':image,'details':details, 'size':'s', 'border_radius':'9px'})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('12', {'title':title, 'image':image, 'details':details, 'size':'s', 'border_radius':'9px'})}
                </div>
            )
        }
    }

    load_used_nitros(){
        var results_obj = this.state.data['item']['ipfs']['results_object']
        var used_nitro_ids = results_obj == null ? [] : Object.keys(results_obj)
        var all_nitros = this.get_all_sorted_objects(this.props.app_state.created_nitros)
        var nitro_objects_used = []
        for(var i=0; i<all_nitros.length; i++){
            var obj = all_nitros[i]
            if(used_nitro_ids.includes(obj['e5_id'])){
                nitro_objects_used.push(obj)
            }
        }
        return nitro_objects_used
    }

    when_used_nitro_item_clicked(item){
        this.setState({selected_nitro_item: item['e5_id'], selected_nitro_object: item})
    }

    render_poll_result_item(){
        var results_obj = this.state.data['item']['ipfs']['results_object']
        var poll_object = this.state.data['object']
        var nitro_item_to_use = this.state.selected_nitro_item
        var nitro_objects_used = this.load_used_nitros()
        if(nitro_item_to_use == null && nitro_objects_used.length != 0){
            nitro_item_to_use = nitro_objects_used[0]['e5_id']
        }
        var results_object = nitro_item_to_use == null ? null : results_obj[nitro_item_to_use]
        if(results_object == null){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }
        var time = results_object.time
        var registered_voters = results_object.registered_voters
        var valid_vote_count = results_object.valid_vote_count
        var targeted_winners = poll_object['ipfs'].winner_count
        var consensus_snapshots = results_object.consensus_snapshots
        var quota = results_object.quota
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3074t']/* 'Poll Results' */, 'details':this.props.app_state.loc['3074u']/* 'As of $' */.replace('$', (''+(new Date(time)))), 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_voter_count_message(registered_voters)}
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3074x']/* Valid Votes Counted. */, 'subtitle':this.format_power_figure(valid_vote_count), 'barwidth':this.calculate_bar_width(valid_vote_count), 'number':this.format_account_balance_figure(valid_vote_count), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['3074y']/* 'votes' */, })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3074bz']/* Quota Used. */, 'subtitle':this.format_power_figure(quota), 'barwidth':this.calculate_bar_width(quota), 'number':this.format_account_balance_figure(quota), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['3074y']/* 'votes' */, })}

                    {this.render_turnout_message(registered_voters, valid_vote_count)}
                </div>
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3074z']/* Targeted Winners. */, 'subtitle':this.format_power_figure(targeted_winners), 'barwidth':this.calculate_bar_width(targeted_winners), 'number':this.format_account_balance_figure(targeted_winners), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['3074ba']/* 'candidates' */, })}
                </div>
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3074bb']/* '$ consensus cycles' */.replace('$', consensus_snapshots.length), 'details':this.props.app_state.loc['3074bc']/* '$ runoffs.' */.replace('$', (''+(consensus_snapshots.length - 1))), 'size':'l'})}
            </div>
        )
    }

    render_poll_result_item2(){
        var results_obj = this.state.data['item']['ipfs']['results_object']
        var poll_object = this.state.data['object']
        var nitro_item_to_use = this.state.selected_nitro_item
        var nitro_objects_used = this.load_used_nitros()
        if(nitro_item_to_use == null && nitro_objects_used.length != 0){
            nitro_item_to_use = nitro_objects_used[0]['e5_id']
        }
        var results_object = nitro_item_to_use == null ? null : results_obj[nitro_item_to_use]
        if(results_object == null){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }
        var time = results_object.time
        var registered_voters = results_object.registered_voters
        var valid_vote_count = results_object.valid_vote_count
        var targeted_winners = poll_object['ipfs'].winner_count
        var consensus_snapshots = results_object.consensus_snapshots
        var elimination_snapshot = results_object.elimination_snapshot
        var vote_transfer_snapshots = results_object.vote_transfer_snapshots
        var current_winners = results_object.current_winners
        var vote_donation_snapshots = results_object.vote_donation_snapshots
        var tie_breaker = results_object.tie_breaker
        var inconclusive_ballot = results_object.inconclusive_ballot
        var quota = results_object.quota

        if(inconclusive_ballot == true){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3074bd']/* 'Counting Results.' */, 'details':this.props.app_state.loc['3074be']/* 'Below are the figures obtained at each cycle and runoff.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_consensus_snapshot_data(consensus_snapshots, elimination_snapshot, valid_vote_count, vote_transfer_snapshots, vote_donation_snapshots, quota)}

                {this.render_final_winners_if_voting_period_over(current_winners, time, tie_breaker)}
                
                <div style={{height: 10}}/>
                {this.calculate_consistency_metric(results_object)}
            </div>
        )
    }

    render_voter_count_message(registered_voters){
        if(registered_voters != 0){
            return(
                <div>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3074v']/* Number of Registered Voters. */, 'subtitle':this.format_power_figure(registered_voters), 'barwidth':this.calculate_bar_width(registered_voters), 'number':this.format_account_balance_figure(registered_voters), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['3074w']/* 'voters' */, })}
                    </div>
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    render_turnout_message(registered_voters, vote_count){
        if(registered_voters == 0) return;
        var percentage = vote_count > 0 ? this.round_off((vote_count / registered_voters) * 100) : 0
        if(percentage >= 100){
            percentage = 99.99
        }
        return(
            <div>
                {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3074bf']/* Turnout Proprtion. */, 'subtitle':this.format_power_figure(percentage), 'barwidth':percentage+'%', 'number':percentage+'%', 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1881']/* 'proportion' */, })}
            </div>
        )
    }

    render_consensus_snapshot_data(consensus_snapshots, elimination_snapshot, valid_vote_count, vote_transfer_snapshots, vote_donation_snapshots, quota){
        var selected_index = this.state.selected_stage == null ? 0 : this.state.selected_stage
        var snapshot = consensus_snapshots[selected_index]
        return(
            <div>
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {consensus_snapshots.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_consensus_snapshot_item_selected(index)}>
                                {this.render_stage_item(index)}
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{height: 10}}/>
                {this.render_consensus_cycle(snapshot, elimination_snapshot[selected_index], valid_vote_count, vote_transfer_snapshots[selected_index], vote_donation_snapshots[selected_index], quota )}
            </div>
        )
    }

    render_stage_item(index){
        var text = this.props.app_state.loc['3074cc']/* 'Primary Stage.' */
        if(index == 0){
            text = this.props.app_state.loc['3074cc']/* 'Runoff $' */.replace('$', index)
        }
        if(this.state.selected_stage == index){
            return(
                <div>
                    {this.render_detail_item('4', {'text':text, 'textsize':'15px', 'font':this.props.app_state.font})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('4', {'text':text, 'textsize':'15px', 'font':this.props.app_state.font})}
                </div>
            )
        }
    }

    when_consensus_snapshot_item_selected(index){
        this.setState({selected_stage: index})
    }

    render_consensus_cycle(snapshot, eliminated_candidate, vote_count, vote_transfer_snapshot, vote_donation_snapshot, quota){
        var figures = []
        var candidate_index = {}
        var poll_object = this.state.data['object']
        poll_object['ipfs'].candidates.forEach(candidate => {
            candidate_index[candidate['id']] = candidate['name']
        });
        var candidate_ids = Object.keys(snapshot)

        candidate_ids.forEach(candidate_id => {
            var candidates_votes = snapshot[candidate_id]
            var percentage = candidates_votes > 0 ? this.round_off((candidates_votes / vote_count) * 100) : 0
            if(percentage >= 100){
                percentage = 99.99
            }
            var title = candidate_index[candidate_id]
            var number = number_with_commas(candidates_votes)
            if(candidates_votes >= quota){
                var donated_vote_count = vote_donation_snapshot[candidate_id]
                title = '✅ '+title
                if(donated_vote_count > 0){
                    number = number + this.props.app_state.loc['3074bu']/* ' ---> $ surplus votes donated.' */.replace('$', number_with_commas(donated_vote_count))
                }
            }
            figures.push({'name':title, 'number': number, 'votes':candidates_votes, 'surplus':donated_vote_count, 'percentage':percentage})
        });
        figures = this.sortByAttributeDescending(figures, 'votes')
        return(
            <div>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    {figures.map((item, index) => (
                        <div>
                            {this.render_detail_item('2', { 'style':'l', 'title':item['name'], 'subtitle':this.format_power_figure(item['votes']), 'barwidth':item['percentage']+'%', 'number':item['number'], 'barcolor':'#606060', 'relativepower':item['percentage']+'%',})}
                        </div>
                    ))}
                </div>
                <div style={{height:10}}/>
                {this.render_eliminated_candidate_data_if_not_null(eliminated_candidate, vote_transfer_snapshot, candidate_index)}
            </div>
        )
    }


    render_eliminated_candidate_data_if_not_null(eliminated_candidate, vote_transfer_snapshot, candidate_index){
        if(eliminated_candidate != null){
            var receivers = Object.keys(vote_transfer_snapshot)
            var items = []
            var transferred_vote_count = 0
            receivers.forEach(candidate_recipient => {
                items.push({'name':candidate_index[candidate_recipient], 'votes_received':vote_transfer_snapshot[candidate_recipient]})
                transferred_vote_count += vote_transfer_snapshot[candidate_recipient]
            });
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3074bi']/* $ was eliminated. */.replace('$', items['name']), 'details':this.props.app_state.loc['3074bj']/* $ votes were transferred to the following candidates. */.replace('$', number_with_commas(transferred_vote_count)), 'size':'l'})}
                    <div style={{height:10}}/>
                    <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                        <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                            {items.map((item, index) => (
                                <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                    {this.render_detail_item('3', {'title':items['name'], 'details':this.props.app_state.loc['3074bh']/* + $ votes */.replace('$', number_with_commas(items['votes_received'])), 'size':'s'})}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }
    }

    render_final_winners_if_voting_period_over(current_winners, time, tie_breaker){
        var now = time
        var poll_object = this.state.data['object']
        if(now/1000 < poll_object['ipfs'].end_time){
            return;
        }
        var items = tie_breaker != '' ? [tie_breaker] : current_winners
        var candidate_index = {}
        poll_object['ipfs'].candidates.forEach(candidate => {
            candidate_index[candidate['id']] = candidate['name']
        });
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3074bk']/* 'Current Winners 🎉' */, 'details':this.props.app_state.loc['3074bl']/* 'Below are the current and final winners of the poll.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_detail_item('4', {'text':candidate_index[item]+' 🏅', 'textsize':'15px', 'font':this.props.app_state.font})}
                            </li>
                        ))}
                    </ul>
                </div>
                {this.render_tie_breaker_message(tie_breaker)}
                {this.render_detail_item('0')}
            </div>
        )
    }

    render_tie_breaker_message(tie_breaker){
        if(tie_breaker != ''){
            return(
                <div>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['3074bv']/* 'There was a tie, so the randomizer was used to pick the winner.' */, 'textsize':'11px', 'font':this.props.app_state.font})}
                </div>
            )
        }
    }

    calculate_consistency_metric(results_object){
        var poll_object = this.state.data['object']
        var focused_results_obj = this.props.app_state.poll_consensus_results[poll_object['e5_id']]
        var used_nitro_ids = focused_results_obj == null ? [] : Object.keys(focused_results_obj)
        if(used_nitro_ids.length < 2){
            return;
        }
        var consistency_count = 0

        var time = results_object.time
        var end_time = poll_object['ipfs'].end_time
        if(time < end_time){
            return;
        }
        
        used_nitro_ids.forEach(used_nitro_id => {
            var results_obj = this.props.app_state.poll_consensus_results[poll_object['e5_id']][used_nitro_id]
            var registered_voters = results_obj.registered_voters
            var valid_vote_count = results_obj.valid_vote_count
            var current_winners = results_obj.current_winners
            var tie_breaker = results_obj.tie_breaker
            var quota = results_obj.quota
            var tied_candidates = results_obj.tied_candidates
            var inconclusive_ballot = results_obj.inconclusive_ballot
            if(
                registered_voters == results_object.registered_voters &&
                valid_vote_count == results_object.valid_vote_count &&
                current_winners.length == results_object.current_winners.length &&
                this.allElementsAppearOnce(current_winners, results_object.current_winners) &&
                tie_breaker == results_object.tie_breaker &&
                quota == results_object.quota &&
                this.allElementsAppearOnce(tied_candidates, results_object.tied_candidates) &&
                inconclusive_ballot == results_object.inconclusive_ballot
            ){
                consistency_count++
            }
        });

        var percentage = this.round_off((consistency_count / used_nitro_ids.length) * 100)
        if(percentage >= 100){
            percentage = 100
        }

        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3074bw']/* 'Consistency levels.' */, 'details':this.props.app_state.loc['3074bx']/* 'The similarity in results returned by the randomly selected nitros.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3074by']/* 'Consistency proportion' */, 'subtitle':this.format_power_figure(percentage), 'barwidth':percentage+'%', 'number':percentage+'%', 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1881']/* 'proportion' */, })}
                </div>
            </div>
        )
    }











    render_creator_payout_info(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_creator_payout_ui()}
                    {this.render_detail_item('0')}
                    {this.render_creator_payout_ui2()}
                    {this.render_detail_item('0')}
                    {this.render_make_payout_button()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_creator_payout_ui()}
                        {this.render_detail_item('0')}
                        {this.render_make_payout_button()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_creator_payout_ui2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_creator_payout_ui()}
                        {this.render_detail_item('0')}
                        {this.render_make_payout_button()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_creator_payout_ui2()}
                    </div>
                </div>
                
            )
        }
    }

    render_creator_payout_ui(){
        const object = this.state.data['object']
        const focused_item = this.state.data['item']
        const payout_information = focused_item['ipfs'].payout_information
        const payout_transaction_data = focused_item['ipfs'].payout_transaction_data
        const payout_subscriptions_used = focused_item['ipfs'].payout_subscriptions_used

        const final_payment_info = payout_information.final_payment_info
        const total_payment_data_for_subscriptions = payout_information.total_payment_data_for_subscriptions
        const start_time = payout_information.start_time
        const end_time = payout_information.end_time
        const total_data_bytes_streamed = payout_information.total_data_bytes_streamed

        const formatted_size = this.format_data_size(total_data_bytes_streamed)
        const fs = formatted_size['size']+' '+formatted_size['unit']

        return(
            <div>
                {this.render_detail_item('3', {'details':this.props.app_state.loc['3075j']/* 'Starting Time.' */, 'title':''+(new Date(start_time)), 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['3075k']/* 'Ending Time.' */, 'title':''+(new Date(end_time)), 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['3075l']/* 'Total Data Streamed.' */, 'title':fs, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('0')}
                {this.render_total_payment_data_for_subscriptions_data(total_payment_data_for_subscriptions, payout_subscriptions_used)}

            </div>
        )
    }

    render_creator_payout_ui2(){
        const object = this.state.data['object']
        const focused_item = this.state.data['item']
        const payout_information = focused_item['ipfs'].payout_information
        const payout_transaction_data = focused_item['ipfs'].payout_transaction_data
        const payout_subscriptions_used = focused_item['ipfs'].payout_subscriptions_used

        const final_payment_info = payout_information.final_payment_info
        const total_data_bytes_streamed = payout_information.total_data_bytes_streamed
        const valid_user_stream_data = payout_information.valid_user_stream_data

        return(
            <div>
                {this.render_final_payment_info(final_payment_info, valid_user_stream_data, total_data_bytes_streamed)}
            </div>
        )
    }




    render_total_payment_data_for_subscriptions_data(total_payment_data_for_subscriptions, payout_subscriptions_used){
        return(
            <div>
                {this.render_detail_item('3', {'details':this.props.app_state.loc['3075m']/* 'Subscription Payout Amounts.' */, 'title':this.props.app_state.loc['3075n']/* 'The total amount of tokens collected from each subscription is shown below.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_subscriptions2(payout_subscriptions_used)}
                <div style={{height:10}}/>
                {this.render_total_subscription_payment_data_for_specific_subscription(total_payment_data_for_subscriptions, payout_subscriptions_used)}
            </div>
        )
    }

    render_subscriptions2(items){
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_used_subscription_clicked(item)}>
                            {this.render_subscription_item2(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    when_used_subscription_clicked(item){
        if(item == this.state.selected_subscription_item){
            this.setState({selected_subscription_item: null})
        }else{
            this.setState({selected_subscription_item: item})
        }
    }

    render_subscription_item2(item, pos){
        var e5 = 'E'+item.split('E')[1]
        var id = item.split('E')[0]
        var subscription_item = this.props.app_state.created_subscription_object_mapping[e5][id]
        var e5_id = item
        var opacity = 0.7
        var details = '????';
        if(subscription_item != null){
            opacity = 1.0
            details = this.truncate(subscription_item['ipfs'].entered_title_text, 17)
        }
        
        if(this.state.selected_subscription_item == e5_id || (pos == 0 && this.state.selected_subscription_item == null)){
            return(
                <div style={{'opacity':opacity}}>
                    {this.render_detail_item('3', {'title':' • '+id, 'details':details, 'size':'l', 'title_image':this.props.app_state.e5s[e5].e5_img})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }
        return(
            <div style={{'opacity':opacity}}>
                {this.render_detail_item('3', {'title':' • '+id, 'details':details, 'size':'l', 'title_image':this.props.app_state.e5s[e5].e5_img})}
            </div>
        )
    }

    render_total_subscription_payment_data_for_specific_subscription(total_payment_data_for_subscriptions, payout_subscriptions_used){
        const default_subscription = payout_subscriptions_used.selected_creator_group_subscriptions[0]
        const selected_subscription_e5_id = this.state.selected_subscription_item == null ? default_subscription : this.state.selected_subscription_item
        const specific_subscription_data = total_payment_data_for_subscriptions[selected_subscription_e5_id]
        if(specific_subscription_data == null || Object.keys(specific_subscription_data).length == 0){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }
        const e5 = 'E'+selected_subscription_e5_id.split('E')[1]
        const focused_exchanges = Object.keys(specific_subscription_data)
        return(
            <div>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    {focused_exchanges.map((item, index) => (
                        <div onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'number':specific_subscription_data[item], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'subtitle':this.format_power_figure(specific_subscription_data[item]), 'barwidth':this.calculate_bar_width(specific_subscription_data[item]), 'number':this.format_account_balance_figure(specific_subscription_data[item]), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item], })}
                        </div>
                    ))}
                </div>
            </div>
        )
    }


    get_data(item){
        var obj = item.split(':')
        return { e5: obj[0], id: obj[1]}
    }

    get_senders_name3(item){
        var data_item = this.get_data(item)
        var sender = data_item.id
        var e5 = data_item.e5
        if(sender == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var obj = this.props.app_state.alias_bucket[e5]
            var alias = (obj[sender] == null ? this.props.app_state.loc['c311m']/* 'Account' */ : obj[sender])
            return alias
        }
    }



    render_final_payment_info(final_payment_info, valid_user_stream_data, total_data_bytes_streamed){
        var user_id_keys = this.filter_user_id_keys_by_searched_text(Object.keys(final_payment_info))
        return(
            <div>
                {this.render_detail_item('3', {'details':this.props.app_state.loc['3075o']/* 'Creator Payout Info' */, 'title':this.props.app_state.loc['3075p']/* 'Below is the payout information for each creator.' */, 'size':'l'})}
                <div style={{height:10}}/>

                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['904']/* 'Account ID' */} when_text_input_field_changed={this.when_searched_user_input_changed.bind(this)} text={this.state.searched_user} theme={this.props.theme}/>
                <div style={{height:10}}/>
                {this.render_creators2(user_id_keys)}
                <div style={{height:10}}/>
                {this.render_selected_creator_payout_information(final_payment_info, valid_user_stream_data, total_data_bytes_streamed)}
            </div>
        )
    }

    filter_user_id_keys_by_searched_text(user_id_keys){
        var selected_keys = []
        var searched_text = this.state.searched_user
        user_id_keys.forEach(user_id => {
            if(searched_text == ''){
                selected_keys.push(user_id)
            }else{
                var user_name = this.get_senders_name3(user_id)
                var account_id = this.get_data(user_id).id
                if(user_name.toLowerCase().startsWith(searched_text.toLowerCase())){
                    selected_keys.push(user_id)
                }
                else if(account_id.startsWith(searched_text)){
                    selected_keys.push(user_id)
                }
            }
        });

        return selected_keys
    }

    when_searched_user_input_changed(text){
        this.setState({searched_user: text})
    }

    render_creators2(items){
        if(items.length == 0){
            items = [1, 2, 3]
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_empty_horizontal_list_item2()}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.reverse().map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_creator_item_clicked(item)}>
                            {this.render_creator_item2(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_creator_item2(item, pos){
        if(this.state.selected_creator_item == item || (pos == 0 && this.state.selected_creator_item == null)){
            return(
                <div>
                    {this.render_detail_item('3', {'title':' • '+this.get_data(item).id, 'details':this.get_senders_name3(item), 'size':'l', 'title_image':this.props.app_state.e5s[this.get_data(item).e5].e5_img})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }
        return(
            <div>
                {this.render_detail_item('3', {'title':' • '+this.get_data(item).id, 'details':this.get_senders_name3(item), 'size':'l', 'title_image':this.props.app_state.e5s[this.get_data(item).e5].e5_img})}
            </div>
        )
    }

    when_creator_item_clicked(item){
        if(item == this.state.selected_creator_item){
            this.setState({selected_creator_item: null})
        }else{
            this.setState({selected_creator_item: item})
        }
    }

    render_selected_creator_payout_information(final_payment_info, valid_user_stream_data, total_data_bytes_streamed){
        const all_creators = Object.keys(final_payment_info)
        if(all_creators.length == 0){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }
        const selected_creator_item = this.state.selected_creator_item == null ? all_creators[0] : this.state.selected_creator_item
        const selected_creator_payout_data = final_payment_info[selected_creator_item]
        const selected_creator_payout_exchanges = Object.keys(selected_creator_payout_data)
        const selected_creator_streaming_total = valid_user_stream_data[selected_creator_item]
        var proportion = bigInt(selected_creator_streaming_total).multiply(100).divide(total_data_bytes_streamed)
        if(bigInt(selected_creator_streaming_total).lesser(bigInt('1e14')) && bigInt(total_data_bytes_streamed).lesser(bigInt('1e14'))){
            proportion = ((selected_creator_streaming_total * 100) / total_data_bytes_streamed).toFixed(2)
        }
        if(proportion >= 100){
            proportion = 99.99
        }
        const formatted_size = this.format_data_size(selected_creator_streaming_total)
        const fs = formatted_size['size']+' '+formatted_size['unit']

        var transfer_data = []
        selected_creator_payout_exchanges.forEach(exchange_e5_id => {
            var item_data = this.get_data(exchange_e5_id)
            var transfer_amount = selected_creator_payout_data[exchange_e5_id]
            transfer_data.push({'exchange':item_data.id, 'e5':item_data.e5, 'amount':transfer_amount})
        });

        return(
            <div>
                {this.render_detail_item('3', {'details':this.props.app_state.loc['3075r']/* 'Total Data Sreamed for Creators Files.' */, 'title':fs, 'size':'l'})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3075q']/* 'Streaming proportion' */, 'subtitle':this.format_power_figure(proportion), 'barwidth':Math.floor(proportion)+'%', 'number':proportion+'%', 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1881']/* 'proportion' */,})}
                </div>
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    {transfer_data.map((item, index) => (
                        <div onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[item['e5']+item['exchange']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['exchange']]})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[item['e5']+item['exchange']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['exchange']], })}
                        </div>
                    ))}
                </div>
            </div>
        )
    }



    render_make_payout_button(){
        const object = this.state.data['object']
        var my_account = this.props.app_state.user_account_id[object['e5']]

        if(object['author'] != my_account){
            return;
        }

        const focused_item = this.state.data['item']
        const payout_transaction_data = focused_item['ipfs'].payout_transaction_data

        const payout_e5s_used = Object.keys(payout_transaction_data)
        const focused_e5 = this.state.selected_payout_e5 == null ? payout_e5s_used[0] : this.state.selected_payout_e5

        var focused_e5_transaction_info = payout_transaction_data[focused_e5]
        var recorded_batches = this.get_recorded_batches()
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2117f']/* 'E5s Used.' */, 'details':this.props.app_state.loc['2117g']/* 'Below are the E5s used in the payouts.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                {this.load_creator_payout_e5s(payout_e5s_used)}
                <div style={{height: 10}}/>
                {this.render_detail_item('4', {'text':this.props.app_state.loc['2117h']/* 'You also need to select a batch and its set transfers.' */, 'textsize':'13px', 'font':this.props.app_state.font})}
                <div style={{height: 10}}/>
                {this.load_transfer_batches_staged(focused_e5_transaction_info, recorded_batches)}
                <div style={{height: 10}}/>

                {this.render_total_batch_transfers_and_my_balances(focused_e5, focused_e5_transaction_info)}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['2117j']/* 'Stack transfers.' */, 'details':this.props.app_state.loc['2117k']/* 'Stack the transfers for the selected batch in your selected E5.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <div style={{'padding': '5px'}} onClick={() => this.when_stack_transfers_tapped(recorded_batches)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2117l']/* Stack transfers */, 'action':''})}
                </div>
            </div>
        )
    }

    load_creator_payout_e5s(items){
        var items2 = [0, 1]
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_e5_clicked(item)}>
                            {this.render_e5_item(item)}
                        </li>
                    ))}
                    {items2.map(() => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_empty_horizontal_list_item3()}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_empty_horizontal_list_item3(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div>
                <div style={{height:57, width:85, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                    </div>
                </div>
            </div>
        )
    }

    render_e5_item(item){
        var image = this.props.app_state.e5s[item].e5_img
        var details = this.props.app_state.e5s[item].token
        if(this.state.selected_payout_e5 == item){
            return(
                <div>
                    {this.render_detail_item('12', {'title':item, 'image':image,'details':details, 'size':'s'})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('12', {'title':item, 'image':image, 'details':details, 'size':'s'})}
                </div>
            )
        }
    }

    when_e5_clicked(item){
        this.setState({selected_payout_e5: item})
    }


    load_transfer_batches_staged(focused_e5_transaction_info, recorded_batches){
        var items = Object.keys(focused_e5_transaction_info)
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_transfer_batch_clicked(item)}>
                            {this.render_batch_item(item, focused_e5_transaction_info[item].length, recorded_batches)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_batch_item(item, count, recorded_batches){
        var details = this.props.app_state.loc['2117i']/* '$ transfers.' */.replace('$', count)
        var opacity = recorded_batches.includes(item) ? 0.6 : 1.0
        if(this.does_batch_exist_in_stack(item)){
            opacity = 0.6
        }
        if(this.state.selected_batch_item == item){
            return(
                <div style={{'opacity': opacity}}>
                    {this.render_detail_item('3', {'title':item, 'details':details, 'size':'s'})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }else{
            return(
                <div style={{'opacity': opacity}}>
                    {this.render_detail_item('3', {'title':item, 'details':details, 'size':'s'})}
                </div>
            )
        }
    }

    does_batch_exist_in_stack(selected_batch_id){
        const focused_item = this.state.data['item']
        const payout_transaction_data = focused_item['ipfs'].payout_transaction_data
        const payout_e5s_used = Object.keys(payout_transaction_data)
        const e5_used = this.state.selected_payout_e5 == null ? payout_e5s_used[0] : this.state.selected_payout_e5
        const stack_transactions = this.props.app_state.stack_items
        for(var i=0; i<stack_transactions.length; i++){
            if(stack_transactions[i].type == this.props.app_state.loc['2117p']/* 'creator-payout' */ && stack_transactions[i].id == selected_batch_id && stack_transactions[i].e5 == e5_used){
                return true
            }
        }
        return false
    }

    get_recorded_batches(){
        const object = this.state.data['object']
        const records = this.props.app_state.channel_creator_payout_records[object['e5_id']]
        const recorded_batches = []
        if(records != null && records.length > 0){
            records.forEach(record => {
                var batch_id = record['event'].returnValues.p4/* string_data */
                if(!recorded_batches.includes(batch_id)) recorded_batches.push(batch_id);
            });
        }
        return recorded_batches
    }

    when_transfer_batch_clicked(item){
        if(this.state.selected_batch_item == item){
            this.setState({selected_batch_item: null})
        }else{
            this.setState({selected_batch_item: item})
        }
        
    }

    render_total_batch_transfers_and_my_balances(e5, payout_transaction_data){
        const selected_batch_id = this.state.selected_batch_item
        if(selected_batch_id != null){
            const transfer_data = payout_transaction_data[e5][selected_batch_id]
            const total_transfer_obj = {}
            transfer_data.forEach(transfer_object => {
                if(total_transfer_obj[transfer_object['exchange']] == null){
                    total_transfer_obj[transfer_object['exchange']] = bigInt(0)
                }
                total_transfer_obj[transfer_object['exchange']] = bigInt(total_transfer_obj[transfer_object['exchange']]).plus(bigInt(transfer_object['amount']))
            });

            const exchanges_used = Object.keys(total_transfer_obj)
            const my_balances = {}
            exchanges_used.forEach(exchange_id => {
                my_balances[exchange_id] = this.props.calculate_actual_balance(e5, exchange_id)
            });
            if(exchanges_used.length == 0){
                return(
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                        {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+5], 'subtitle':this.format_power_figure(0), 'barwidth':this.calculate_bar_width((0)), 'number':this.format_account_balance_figure((0)), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[5]})}
                    </div>
                )
            }
            return(
                <div>
                    {this.render_detail_item('4', {'text':this.props.app_state.loc['3055ct']/* 'The total amounts to be tranferred.' */, 'textsize':'13px', 'font':this.props.app_state.font})}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                            {exchanges_used.map((item, index) => (
                                <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'number':total_transfer_obj[item], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                                    {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'subtitle':this.format_power_figure(total_transfer_obj[item]), 'barwidth':this.calculate_bar_width((total_transfer_obj[item])), 'number':this.format_account_balance_figure((total_transfer_obj[item])), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                                </li>
                            ))}
                        </ul>
                    </div> 
                    <div style={{height: 10}}/>
                    {this.render_detail_item('4', {'text':this.props.app_state.loc['3055cu']/* 'Your balances for the exchanges used.' */, 'textsize':'13px', 'font':this.props.app_state.font})}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                            {exchanges_used.map((item, index) => (
                                <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'number':my_balances[item], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                                    {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'subtitle':this.format_power_figure(my_balances[item]), 'barwidth':this.calculate_bar_width((my_balances[item])), 'number':this.format_account_balance_figure((my_balances[item])), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                                </li>
                            ))}
                        </ul>
                    </div> 
                    <div style={{height: 10}}/>
                </div> 
            )
        }
    }




    when_stack_transfers_tapped(recorded_batches){
        const object = this.state.data['object']
        const focused_e5 = this.state.selected_payout_e5
        const selected_batch_id = this.state.selected_batch_item
        const focused_item = this.state.data['item']
        const payout_transaction_data = focused_item['ipfs'].payout_transaction_data

        if(focused_e5 == null){
            this.props.notify(this.props.app_state.loc['2117n']/* 'You need to select an E5 to use.' */, 6700)
        }
        else if(selected_batch_id == null){
            this.props.notify(this.props.app_state.loc['2117m']/* 'You need to select a batch first.' */, 6700)
        }
        else if(recorded_batches.includes(selected_batch_id)){
            this.props.notify(this.props.app_state.loc['3075ac']/* 'You already made the transfers for that batch.' */, 6700)
        }
        else{
            const transfer_data_array = payout_transaction_data[focused_e5][selected_batch_id]
            if(!this.check_if_sender_can_afford_payouts(transfer_data_array, focused_e5)){
                this.props.notify(this.props.app_state.loc['2117o']/* 'Your account balance is insufficient to make all of the transfers.' */, 6700)
                return;
            }
            else if(!this.can_sender_make_creator_payout_staged(selected_batch_id, focused_e5)){
                this.props.notify(this.props.app_state.loc['2117r']/* 'You cant stack the same payout batch twice.' */, 7700)
                return;
            }

            const obj = {
                id: selected_batch_id, 
                type: this.props.app_state.loc['2117p']/* 'creator-payout' */,
                entered_indexing_tags:[
                    this.props.app_state.loc['3075z']/* 'creator' */,
                    this.props.app_state.loc['3075y']/* 'payout' */,
                    this.props.app_state.loc['2117q']/* 'transfers' */, 
                ],
                e5: focused_e5, 
                payout_transfers_array: transfer_data_array, 
                channel_object: object
            }

            this.props.add_creator_payouts_to_stack(obj)
            this.props.notify(this.props.app_state.loc['18']/* 'Transaction added to stack' */, 700)
        }
    }

    check_if_sender_can_afford_payouts(transfer_data, e5){
        var total_transfer_obj = {}

        transfer_data.forEach(transfer_object => {
            if(total_transfer_obj[transfer_object['exchange']] == null){
                total_transfer_obj[transfer_object['exchange']] = bigInt(0)
            }
            total_transfer_obj[transfer_object['exchange']] = bigInt(total_transfer_obj[transfer_object['exchange']]).plus(bigInt(transfer_object['amount']))
        });

        var exchanges_used = Object.keys(total_transfer_obj)

        var can_pay = true;
        for(var i=0; i<exchanges_used.length; i++){
            var token_id = exchanges_used[i]
            var token_balance = this.props.calculate_actual_balance(e5, token_id)
            var final_amount = total_transfer_obj[token_id]

            if(bigInt(token_balance).lesser(bigInt(final_amount))){
                can_pay = false
            }
        }
        return can_pay
    }

    can_sender_make_creator_payout_staged(selected_batch_id, e5_used){
        const stack_transactions = this.props.app_state.stack_items
        for(var i=0; i<stack_transactions.length; i++){
            if(stack_transactions[i].type == this.props.app_state.loc['2117p']/* 'creator-payout' */ && stack_transactions[i].id == selected_batch_id && stack_transactions[i].e5 == e5_used){
                return false
            }
        }
        return true
    }














    render_confirm_upload_nitro_files(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_confirm_upload_nitro_files_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_confirm_upload_nitro_files_data()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_confirm_upload_nitro_files_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        } 
    }

    render_confirm_upload_nitro_files_data(){
        var selected_files_type = this.state.data['selected_files_type']
        var files = this.state.data['files']
        var size_total = this.state.data['size_total']
        var obj = this.state.data['obj']
        var formatted_size = this.format_data_size(size_total)
        var fs = formatted_size['size']+' '+formatted_size['unit']
        var available_storage_space = this.state.data['available_storage_space']
        var impact = this.round_off((size_total / available_storage_space) * 100)
        return(
            <div>
                <h3 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2027c']/* Confirmation */}</h3>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055']/* 'Upload File Confirmation.' */, 'details':this.props.app_state.loc['3055cv']/* 'Confirm that you wan to upload your selected files to nitro.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':number_with_commas(files.length.toString()), 'details':this.props.app_state.loc['3055cy']/* 'File Count.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':selected_files_type, 'details':this.props.app_state.loc['3055cw']/* 'Selected File Type' */, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['3055cx']/* 'Total Space to be Consumed' */, 'title':fs, 'size':'l'})}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['3055cz']/* 'Impact on your Storage Space.' */, 'subtitle':'', 'barwidth':impact+'%', 'number':impact+'%', 'relativepower':this.props.app_state.loc['3055k']/* 'proportion' */})}
                </div>
                <div style={{height: 10}}/>
                
                {this.render_track_nitro(obj)}
                <div style={{height: 10}}/>
                

                <div onClick={() => this.props.upload_file_to_nitro_confirmed(this.state.data)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055i']/* 'Upload File.' */, 'action':''})}
                </div>
            </div>
        )
    }

    render_track_nitro(object){
        var default_image = this.props.app_state.static_assets['empty_image']
        var image = object['ipfs'] == null ? default_image : (object['ipfs'].album_art == null ? default_image : object['ipfs'].album_art)
        var title = object['e5']+' • '+object['id']
        var details = object['ipfs'] == null ? 'Nitropost ID' : (object['ipfs'].entered_title_text)
        return(
            <div>
                {this.render_detail_item('8', {'title':title, 'image':image, 'details':details, 'size':'l', 'border_radius':'9px'})}
            </div>
        )
    }











    render_renew_nitro_upload_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_renew_nitro_upload_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_renew_nitro_upload_data()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_renew_nitro_upload_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        } 
    }

    render_renew_nitro_upload_data(){
        const files_to_be_renewed_data = this.fetch_files_to_be_renewed()
        var opacity = files_to_be_renewed_data.has_all_nitro_metadata_loaded == true ? 1.0 : 0.6
        var has_all_objects_loaded = this.has_all_nitro_objects_loaded(files_to_be_renewed_data.files_to_renew)
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3055dc']/* 'Below is the total amount of money youre set to pay for your files.' */, 'title':this.props.app_state.loc['1593hd']/* 'Renew Uploaded Files.' */})}
                <div style={{height:10}}/>
                {this.render_nitro_items(files_to_be_renewed_data.files_to_renew)}
                <div style={{height:10}}/>
                {this.render_total_payment_amounts_for_all_the_selected_nitros_and_e5_selector(files_to_be_renewed_data.files_to_renew)}
                <div style={{height:10}}/>
                <div style={{'opacity':opacity}} onClick={()=> this.add_renew_files_transaction_to_stack(files_to_be_renewed_data.has_all_nitro_metadata_loaded, files_to_be_renewed_data.files_to_renew, has_all_objects_loaded)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1593hf']/* 'Renew Files' */, 'action':''},)}
                </div>
            </div>
        )
    }

    load_active_e5s(){
        var active_e5s = []
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]
            if(this.props.app_state.e5s[e5].active == true){
                active_e5s.push(e5)
            }
        }
        return active_e5s
    }

    load_preferred_e5_ui(){
        var items = this.load_active_e5s()
        var items2 = [0, 1]
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_e5_clicked2(item)}>
                            {this.render_e5_item2(item)}
                        </li>
                    ))}
                    {items2.map(() => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_empty_horizontal_list_item()}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_e5_item2(item){
        var image = this.props.app_state.e5s[item].e5_img
        var details = this.props.app_state.e5s[item].token
        if(this.state.selected_e5_renewal_items.includes(item)){
            return(
                <div>
                    {this.render_detail_item('12', {'title':item, 'image':image,'details':details, 'size':'s'})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('12', {'title':item, 'image':image, 'details':details, 'size':'s'})}
                </div>
            )
        }
    }

    when_e5_clicked2(item){
        var clone = this.state.selected_e5_renewal_items.slice()
        const index = clone.indexOf(item)
        if(index != -1){
            clone.splice(index, 1)
        }
        else{
            clone.push(item)
        }
        if(clone.length != 0){
            this.setState({selected_e5_renewal_items: clone})
        }
    }




    has_all_nitro_objects_loaded(files_to_be_renewed_data){
        var items = Object.keys(files_to_be_renewed_data)
        var has_all_loaded = true

        items.forEach(item => {
            var nitro_id = item.split('E')[0]
            var nitro_e5 = 'E'+item.split('E')[1]
            var object = this.props.app_state.created_nitro_mappings[nitro_e5] == null ? null : this.props.app_state.created_nitro_mappings[nitro_e5][nitro_id]

            if(object == null){
                has_all_loaded = true
            }
        });

        return has_all_loaded
    }

    fetch_files_to_be_renewed(){
        var my_files = this.props.app_state.uploaded_data_cids
        var files_to_renew = {}
        const startOfYear = new Date(new Date().getFullYear(), 0, 1).getTime()
        var has_files_all_loaded = true
        var has_all_nitro_metadata_loaded = true;
        var total_files_to_renew = 0
        my_files.forEach(ecid => {
            const data = this.get_cid_split(ecid)
            if(data != null){
                if(this.props.app_state.uploaded_data[data['filetype']] != null){
                    const file_data = this.props.app_state.uploaded_data[data['filetype']][data['full']]
                    if(file_data != null){
                        const time = file_data['id']
                        const nitro = file_data['nitro']
                        const binary_size = file_data['binary_size']
                        if(binary_size != null){
                            if(nitro != null){
                                const nitro_node_data = this.props.app_state.nitro_node_details[nitro]
                                if(nitro_node_data != null && nitro_node_data != 'unavailable'){
                                    if(time < startOfYear && nitro != null && this.is_file_available(file_data['hash']) && !this.has_nitro_already_been_renewed(nitro)){
                                        if(files_to_renew[nitro] == null){
                                            files_to_renew[nitro] = []
                                        }
                                        files_to_renew[nitro].push({'data':data, 'file_data':file_data, 'time':time, 'binary_size':binary_size})
                                        total_files_to_renew++
                                    }
                                }
                                else{
                                    has_all_nitro_metadata_loaded = false;
                                }
                            }
                        }
                        else{
                            has_files_all_loaded = false
                        }
                    }
                    else{
                        has_files_all_loaded = false
                    }
                }
                else{
                    has_files_all_loaded = false
                }
            }
            else{
                has_files_all_loaded = false
            }
        });

        return { files_to_renew, has_files_all_loaded, total_files_to_renew, has_all_nitro_metadata_loaded}
    }

    is_file_available(file){
        if(file == null) return true;
        var is_file_available = this.props.app_state.file_streaming_data == null ? true : (this.props.app_state.file_streaming_data[file] == null ? true : this.props.app_state.file_streaming_data[file].is_file_deleted)
        return is_file_available
    }

    has_nitro_already_been_renewed(nitro){
        const startOfYear = new Date(new Date().getFullYear(), 0, 1).getTime()
        const latest_file_renewal_time = this.props.app_state.latest_file_renewal_time
        var has_been_renewed = false;
        const e5s = Object.keys(latest_file_renewal_time)
        e5s.forEach(e5 => {
            const renewal_data = latest_file_renewal_time[e5]
            const paid_nitros = renewal_data['paid_nitros']
            const time = renewal_data['time']

            if(paid_nitros.includes(nitro) && time > startOfYear){
                has_been_renewed = true
            }
        });
        return has_been_renewed
    }

    render_nitro_items(files_to_be_renewed_data){
        var items = Object.keys(files_to_be_renewed_data)
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.reverse().map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_nitro_files_item(item, files_to_be_renewed_data[item], items.length)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_nitro_files_item(item, renew_data, nitro_count){
        var nitro_id = item.split('E')[0]
        var nitro_e5 = 'E'+item.split('E')[1]

        var size_count = 0
        renew_data.forEach(file_data => {
            size_count += file_data['binary_size']
        });

        var object = this.props.app_state.created_nitro_mappings[nitro_e5] == null ? null : this.props.app_state.created_nitro_mappings[nitro_e5][nitro_id]

        if(object != null){
            var default_image = this.props.app_state.static_assets['empty_image']
            var image = object['ipfs'] == null ? default_image : (object['ipfs'].album_art == null ? default_image : object['ipfs'].album_art)
            var formatted_size = this.format_data_size(size_count)
            var fs = formatted_size['size']+' '+formatted_size['unit']
            var title = this.props.app_state.loc['3055da']/* '$ consumed.' */.replace('$', fs)
            var details = this.props.app_state.loc['3055db']/* '$ files.' */.replace('$', number_with_commas(renew_data.length))

            var opacity = this.state.ignored_nitro_files_items.includes(item) ? 0.6 : 1.0
            return(
                <div style={{'opacity': opacity}} onClick={() => this.when_nitro_file_item_clicked(item, nitro_count)}>
                    {this.render_detail_item('14', {'title':title, 'image':image, 'details':details, 'size':'s', 'img_size':30})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_empty_horizontal_list_item2()}
                </div>
            )
        }
    }

    when_nitro_file_item_clicked(item, nitro_count){
        var clone = this.state.ignored_nitro_files_items.slice()
        const index = clone.indexOf(item)
        if(index != -1){
            clone.splice(index, 1)
        }
        else{
            clone.push(item)
            if(clone.length == nitro_count){
                this.props.notify(this.props.app_state.loc['3055dd']/* You cant ignore all of the nodes. */, 4000)
                return;
            }
        }
        
        this.setState({ignored_nitro_files_items: clone})
    }




    render_total_payment_amounts_for_all_the_selected_nitros_and_e5_selector(files_to_renew){
        const price_data_object = this.get_total_payments_to_be_made(files_to_renew).total_price_amounts
        var items = Object.keys(price_data_object)
        return(
            <div>
                {this.render_detail_item('4', {'text':this.props.app_state.loc['3055dk']/* 'Youll need to select youre preferred E5s to make the renewal purchases.' */, 'textsize':'13px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                {this.load_preferred_e5_ui()}
                <div style={{height:10}}/>
                {items.map((item, index) => (
                    <div>
                        {this.render_total_payment_amounts_for_all_the_selected_nitros(price_data_object[item], item)}
                    </div>
                ))}
            </div>
        )
    }

    render_total_payment_amounts_for_all_the_selected_nitros(total_price_amounts, e5){
        const items = Object.keys(total_price_amounts)
        
        if(items.length == 0){
            return(
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                    {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+5], 'subtitle':this.format_power_figure(0), 'barwidth':this.calculate_bar_width((0)), 'number':this.format_account_balance_figure((0)), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[5]})}
                </div>
            )
        }
        return(
            <div style={{}}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style-type': 'none'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '3px 0px 3px 0px'}}>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'number':this.get_amount(total_price_amounts[item]), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'subtitle':this.format_power_figure(this.get_amount(total_price_amounts[item])), 'barwidth':this.calculate_bar_width(this.get_amount(total_price_amounts[item])), 'number':this.format_account_balance_figure(this.get_amount(total_price_amounts[item])), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item], })}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_total_payments_to_be_made(files_to_be_renewed_data){
        var items = Object.keys(files_to_be_renewed_data)
        var selected_items = []
        items.forEach(nitro_e5_id => {
            if(!this.state.ignored_nitro_files_items.includes(nitro_e5_id)){
                selected_items.push(nitro_e5_id)
            }
        });
        var total_price_amounts = {}
        var ignored_nitro_e5_ids = []
        selected_items.forEach(nitro_e5_id => {
            var nitro_node_data = this.props.app_state.nitro_node_details[nitro_e5_id]
            var total_storage_consumed_in_mbs = 0.0
            files_to_be_renewed_data[nitro_e5_id].forEach(file_object => {
                total_storage_consumed_in_mbs += file_object['binary_size'] / (1024 * 1024)
            });
            if(nitro_node_data != null && nitro_node_data != 'unavailable'){
                var price_data_object = this.get_price_data_to_be_used(nitro_node_data)
                if(price_data_object != null){
                    var price_data = price_data_object.price_data
                    var e5_used = price_data_object.e5
                    if(price_data != null){
                        if(total_price_amounts[e5_used] == null){
                            total_price_amounts[e5_used] = {}
                        }
                        price_data.forEach(price_item => {
                            var exchange = price_item['exchange']
                            var amount = price_item['amount']
                            if(total_price_amounts[e5_used][exchange] == null){
                                total_price_amounts[e5_used][exchange] = bigInt(0)
                            }
                            total_price_amounts[e5_used][exchange] = bigInt(total_price_amounts[e5_used][exchange]).plus(bigInt(amount).multiply(bigInt(Math.ceil(total_storage_consumed_in_mbs))))
                        });
                    } 
                }
                else{
                    ignored_nitro_e5_ids.push(nitro_e5_id)
                }
            }
        });

        return {total_price_amounts, ignored_nitro_e5_ids}
    }

    get_price_data_to_be_used(nitro_node_data){
        var items = this.state.selected_e5_renewal_items
        for(var i=0; i<items.length; i++){
            const e5 = items[i]
            if(nitro_node_data['price_per_megabyte'][e5]){
                return { price_data: nitro_node_data['price_per_megabyte'][e5], e5}
            }
        }
    }

    add_renew_files_transaction_to_stack(has_all_price_data_loaded, files_to_renew, has_all_objects_loaded){
        const price_data_object = this.get_total_payments_to_be_made(files_to_renew).total_price_amounts
        if(has_all_price_data_loaded == false || has_all_objects_loaded == false){
            this.props.notify(this.props.app_state.loc['3055de']/* You need to wait for all the nodes to finish loading first. */, 5000)
            return;
        }
        else if(!this.check_if_transfers_exist(price_data_object)){
            this.props.notify(this.props.app_state.loc['3055dl']/* 'No payments to make.' */, 4700)
            return;
        }
        else if(!this.check_if_sender_can_afford_renewal_payouts(price_data_object)){
            this.props.notify(this.props.app_state.loc['2117o']/* 'Your account balance is insufficient to make all of the transfers.' */, 6700)
            return;
        }
        
        const total_payments_with_recepients_data = this.get_total_payments_to_be_made_with_recipients(files_to_renew)
        const e5s_used = Object.keys(total_payments_with_recepients_data)

        e5s_used.forEach(e5_used => {
            const total_payments_with_recepients = total_payments_with_recepients_data[e5_used]
            const amounts_to_transfer = []
            const nitro_storage_account_recipients = {}
            Object.keys(total_payments_with_recepients).forEach(nitro_e5_id => {
                var node_details = this.props.app_state.nitro_node_details[nitro_e5_id]
                var purchase_recipient = node_details['target_storage_recipient_accounts'] == null ? node_details['target_storage_purchase_recipient_account'] : node_details['target_storage_recipient_accounts'][this.props.app_state.selected_e5]
                nitro_storage_account_recipients[nitro_e5_id] = purchase_recipient
                
                Object.keys(total_payments_with_recepients[nitro_e5_id]).forEach(exchange_item => {
                    if(total_payments_with_recepients[nitro_e5_id][exchange_item] != 0){
                        amounts_to_transfer.push({
                            'exchange':exchange_item, 
                            'amount':total_payments_with_recepients[nitro_e5_id][exchange_item], 
                            'recipient': purchase_recipient,
                        })
                    }
                });
            });

            const obj = {
                id:e5_used+this.state.made_id, type:this.props.app_state.loc['3055df']/* 'nitro-renewal' */,
                entered_indexing_tags:[this.props.app_state.loc['3055dg']/* 'nitro' */, this.props.app_state.loc['3055dh']/* 'renewal' */, this.props.app_state.loc['3068ah']/* 'payment' */],
                e5:e5_used, price_data_object, files_to_renew, ignored_nitros: this.state.ignored_nitro_files_items, amounts_to_transfer, total_payments_with_recepients, nitro_storage_account_recipients
            }
            this.props.add_nitro_renewal_transaction_to_stack(obj)
        });
        
        this.props.notify(this.props.app_state.loc['18']/* 'Transaction added to stack' */, 700)
    }

    get_total_payments_to_be_made_with_recipients(files_to_be_renewed_data){
        var items = Object.keys(files_to_be_renewed_data)
        var selected_items = []
        items.forEach(nitro_e5_id => {
            if(!this.state.ignored_nitro_files_items.includes(nitro_e5_id)){
                selected_items.push(nitro_e5_id)
            }
        });
        var total_price_amounts = {}
        selected_items.forEach(nitro_e5_id => {
            var nitro_node_data = this.props.app_state.nitro_node_details[nitro_e5_id]
            var total_storage_consumed_in_mbs = 0.0
            files_to_be_renewed_data[nitro_e5_id].forEach(file_object => {
                total_storage_consumed_in_mbs += file_object['binary_size'] / (1024 * 1024)
            });
            if(nitro_node_data != null && nitro_node_data != 'unavailable'){
                var price_data_object = this.get_price_data_to_be_used(nitro_node_data)
                if(price_data_object != null){
                    var price_data = price_data_object.price_data
                    var e5_used = price_data_object.e5
                    if(price_data != null){
                        if(total_price_amounts[e5_used] == null){
                            total_price_amounts[e5_used] = {}
                        }
                        if(total_price_amounts[e5_used][nitro_e5_id] == null){
                            total_price_amounts[e5_used][nitro_e5_id] = {}
                        }
                        price_data.forEach(price_item => {
                            var exchange = price_item['exchange']
                            var amount = price_item['amount']
                            if(total_price_amounts[e5_used][nitro_e5_id][exchange] == null){
                                total_price_amounts[e5_used][nitro_e5_id][exchange] = bigInt(0)
                            }
                            total_price_amounts[e5_used][nitro_e5_id][exchange] = bigInt(total_price_amounts[e5_used][nitro_e5_id][exchange]).plus(bigInt(amount).multiply(bigInt(Math.ceil(total_storage_consumed_in_mbs))))
                        });
                    }
                }
            }
        });

        return total_price_amounts
    }

    check_if_sender_can_afford_renewal_payouts(price_data_object){
        var e5s_used = Object.keys(price_data_object)
        
        var can_pay = true;
        for(var e=0; e<e5s_used.length; e++){
            const e5 = e5s_used[e]
            const exchanges_used = Object.keys(price_data_object[e5])
            for(var i=0; i<exchanges_used.length; i++){
                var token_id = exchanges_used[i]
                var token_balance = this.props.calculate_actual_balance(e5, token_id)
                var final_amount = price_data_object[e5][token_id]
    
                if(bigInt(token_balance).lesser(bigInt(final_amount))){
                    can_pay = false
                }
            }
        }
        
        return can_pay
    }

    check_if_transfers_exist(price_data_object){
        var e5s_used = Object.keys(price_data_object)
        var transfers_exist = false;
        for(var e=0; e<e5s_used.length; e++){
            const e5 = e5s_used[e]
            const exchanges_used = Object.keys(price_data_object[e5])
            for(var i=0; i<exchanges_used.length; i++){
                if(price_data_object[e5][exchanges_used[i]] != 0){
                    transfers_exist = true;
                }
            }
        }
        
        return transfers_exist
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
                                    <img alt="" src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var uploaded_data = {}
        if(item_id == '8' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12')uploaded_data = this.props.app_state.uploaded_data
        return(
            <div>
                <ViewGroups uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
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

    get_number_width(number){
        if(number == null) return '0%'
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
    }


}




export default DialogPage;