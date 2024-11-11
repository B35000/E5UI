import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import { from } from "@iotexproject/iotex-address-ts";

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

class DialogPage extends Component {
    
    state = {
        selected: 0,
        data:null,
        id:''
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
        }else if(option == 'confirm_clear_stack_dialog'){
            return(
                <div>
                    {this.render_confirm_clear_dialog()}
                </div>
            )
        }else if(option == 'confirm_send_ether_dialog'){
            return(
                <div>
                    {this.render_confirm_send_ether_dialog()}
                </div>
            )
        }else if(option == 'confirm_delete_dialog_box'){
            return(
                <div>
                    {this.render_confirm_delete_transaction_dialog()}
                </div>
            )
        }else if(option == 'confirm_withdraw_ether'){
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
            <div style={{'padding': '10px', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
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
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_song_options_items()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_song_options_items()}
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
                        {this.render_song_options_items()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_song_options_items(){
        var data = this.state.data
        var from = data['from']
        
        if(from == 'audio_details_section'){
            return(
                <div>
                    {this.render_audio_details_section_song_option_items()}
                </div>
            )
        }
        else if(from == 'full_audio_page'){
            return(
                <div>
                    {this.render_full_audio_page_song_option_items()}
                </div>
            )
        }
        else if(from == 'audio_details_section2'){
            return(
                <div>
                    {this.render_audio_details_section_song_option_items2()}
                </div>
            )
        }
        else if(from == 'audio_details_section3'){
            return(
                <div>
                    {this.render_audio_details_section_song_option_items3()}
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


                {this.render_detail_item('3', {'title':this.props.app_state.loc['3000']/* 'Play Last.' */, 'details':this.props.app_state.loc['3006c']/* 'Play the track last. */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_play_last_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3000']/* 'Play Last.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>

                
                {this.render_detail_item('0')}
                {this.render_detail_item('0')}
            </div>
        )
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
                {this.render_detail_item('0')}
                {this.render_detail_item('0')}
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
                {this.render_detail_item('0')}
                {this.render_detail_item('0')}
            </div>
        )
    }


    when_remove_from_playlist_clicked(){
        var item = this.state.data['item']
        var object = this.state.data['object']
        this.props.when_remove_from_playlist(item, object)
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

                {this.render_detail_item('0')}
                {this.render_detail_item('0')}
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
                                        <img alt="" src={this.props.app_state.static_assets['letter']} style={{height:20 ,width:'auto'}} />
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
                                    <img alt="" src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
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


}




export default DialogPage;