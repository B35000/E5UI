import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import TextInput from './../components/text_input';
import Dialog from "@mui/material/Dialog";
import NumberPicker from './../components/number_picker';

import Letter from './../assets/letter.png'; 

var bigInt = require("big-integer");
const Web3 = require('web3');
const { toBech32, fromBech32, } = require('@harmony-js/crypto');

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

class WithdrawEtherPage extends Component {
    
    state = {
        selected: 0, withdraw_ether_page_tags_object: this.get_withdraw_ether_page_tags_object(),
        recipient_address:'', confirmation_dialog_box: false, e5:{'data':[], 'id':this.props.app_state.selected_e5},
        run_time_expiry:0, run_gas_price:0,
    };

    get_withdraw_ether_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','withdraw-ether', 'pending-withdraws', 'withdraw-history'], [1]
            ],
        };
    }

    render(){
        
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                {this.render_top_title()}

                <div style={{height:10}}/>

                {this.render_everything()}

                {this.render_dialog_ui()}

            </div>
        )
    }


    when_withdraw_ether_page_tags_object_updated(tag_obj){
        this.setState({withdraw_ether_page_tags_object: tag_obj})
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }

    render_top_title(){
        var selected_item = this.get_selected_item(this.state.withdraw_ether_page_tags_object, this.state.withdraw_ether_page_tags_object['i'].active)

        if(selected_item == 'withdraw-ether'){
            return(
                <div>
                    <div className="row">
                        <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                            <Tags page_tags_object={this.state.withdraw_ether_page_tags_object} tag_size={'l'} when_tags_updated={this.when_withdraw_ether_page_tags_object_updated.bind(this)} theme={this.props.theme}/>
                        </div>
                        <div className="col-3" style={{'padding': '0px 0px 0px 0px'}}>
                            <div style={{'padding': '5px'}} onClick={()=>this.finish()}>
                                {this.render_detail_item('5', {'text':'Withdraw', 'action':''})}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    <Tags page_tags_object={this.state.withdraw_ether_page_tags_object} tag_size={'l'} when_tags_updated={this.when_withdraw_ether_page_tags_object_updated.bind(this)} theme={this.props.theme}/>
                </div>
            )
        }
    }


    render_everything(){
        var selected_item = this.get_selected_item(this.state.withdraw_ether_page_tags_object, this.state.withdraw_ether_page_tags_object['i'].active)

        if(selected_item == 'withdraw-ether'){
            return(
                <div>
                    {this.render_withdraw_ether_part()}
                </div>
            )
        }
        else if(selected_item == 'pending-withdraws'){
            return(
                <div>
                    {this.render_pending_withdraws_item_logs()}
                </div>
            )
        }
        else if(selected_item == 'withdraw-history'){
            return(
                <div>
                    {this.render_withdraws_item_logs()}
                </div>
            )
        }
    }


    get_gas_price_from_runs(e5){
        var last_events = this.props.app_state.all_E5_runs[e5]
        var sum = 0
        if(last_events != null){
            var last_check = last_events.length < 50 ? last_events.length : 50
            for(var i=0; i<last_check; i++){
                sum += last_events[i].returnValues.p7
            }
            sum = sum/last_check;
        }
        return sum
    }

    render_withdraw_ether_part(){
        var e5 = this.state.e5
        var gas_price = this.props.app_state.gas_price[e5]
        if(gas_price == null){
            gas_price = this.get_gas_price_from_runs(e5)
        }

        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':'Your withdraw balance is shown below', 'title':'Withdraw balance'})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l','title':'Withdraw balance in Wei', 'subtitle':this.format_power_figure(this.props.app_state.withdraw_balance[e5['id']]), 'barwidth':this.calculate_bar_width(this.props.app_state.withdraw_balance[e5['id']]), 'number':this.format_account_balance_figure(this.props.app_state.withdraw_balance[e5['id']]), 'relativepower':'tokens'})}

                    {this.render_detail_item('2', {'style':'l','title':'Withdraw balance in Ether', 'subtitle':this.format_power_figure(this.props.app_state.withdraw_balance[e5['id']]/10**18), 'barwidth':this.calculate_bar_width(this.props.app_state.withdraw_balance[e5['id']]/10**18), 'number':(this.props.app_state.withdraw_balance[e5['id']]/10**18), 'relativepower':'Ether'})}
                </div>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':'Receiver Wallet Address', 'details':this.state.recipient_address, 'size':'s'})}
                <div style={{height: 10}}/>

                <TextInput height={30} placeholder={'Set Receiver Address Here'} when_text_input_field_changed={this.when_text_input_field_changed.bind(this)} text={this.state.recipient_address} theme={this.props.theme}/>
                <div style={{height: 10}} theme={this.props.theme}/>


                <div onClick={() => this.set_my_address()}>
                    {this.render_detail_item('5', {'text':'Set My Address', 'action':''})}
                </div>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':'Withdraw Transaction Expiry Duration', 'details':'The duration of time after which your withdrawal transaction will be reverted if it stays too long in the mempool. The default duration used is 1 hour.', 'size':'l'})}
                <div style={{height:20}}/>
                
                {this.render_detail_item('3', {'title':this.get_time_diff(this.state.run_time_expiry), 'details':'Estimated Time.', 'size':'l'})}

                <NumberPicker number_limit={bigInt('1e36')} when_number_picker_value_changed={this.when_run_expiry_time_set.bind(this)} theme={this.props.theme} power_limit={12}/>


                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':'Transaction Gas Price', 'details':'The gas price for your next run with E5. The default is set to the amount set by the network.', 'size':'l'})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Transaction Gas Price in Wei', 'subtitle':this.format_power_figure(this.state.run_gas_price), 'barwidth':this.calculate_bar_width(this.state.run_gas_price), 'number':this.format_account_balance_figure(this.state.run_gas_price), 'barcolor':'', 'relativepower':'wei', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':'Transaction Gas Price in Gwei', 'subtitle':this.format_power_figure(this.state.run_gas_price/10**9), 'barwidth':this.calculate_bar_width(this.state.run_gas_price/10**9), 'number':this.format_account_balance_figure(this.state.run_gas_price/10**9), 'barcolor':'', 'relativepower':'wei', })}
                </div>
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Network Gas Price in Wei', 'subtitle':this.format_power_figure(this.state.gas_price), 'barwidth':this.calculate_bar_width(this.state.gas_price), 'number':this.format_account_balance_figure(this.state.gas_price), 'barcolor':'', 'relativepower':'wei', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':'Network Gas Price in Gwei', 'subtitle':this.format_power_figure(this.state.gas_price/10**9), 'barwidth':this.calculate_bar_width(this.state.gas_price/10**9), 'number':this.format_account_balance_figure(this.state.gas_price/10**9), 'barcolor':'', 'relativepower':'wei', })}
                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_run_gas_price.bind(this)} theme={this.props.theme} power_limit={63}/>
            </div>
        )
    }


    when_text_input_field_changed(text){
        this.setState({recipient_address: text})
    }

    when_run_expiry_time_set(number){
        this.setState({run_time_expiry: number})
    }

    when_run_gas_price(number){
        this.setState({run_gas_price: number})
    }

    isValidAddress = (adr) => {
        try {
            const web3 = new Web3()
            web3.utils.toChecksumAddress(adr)
            return true
        } catch (e) {
            return false
        }
    }


    set_my_address(){
        if(this.props.app_state.has_wallet_been_set){
            this.setState({recipient_address: this.get_account_address()})
        }else{
            this.props.notify('Please set your wallet first', 2500)
        }
    }

    get_account_address(){
        var e5 = this.state.e5
        
        if(this.props.app_state.accounts[e5['id']] != null){
            return this.format_address(this.props.app_state.accounts[e5['id']].address, e5['id']);
        }
    }

    format_address(address, e5){
        if(e5 == 'E45'){
            return toBech32(address)
        }

        return address
    }



    finish(){
        var e5 = this.state.e5
        if(!this.isValidAddress(this.state.recipient_address)){
            this.props.notify('please set a valid receiver', 500)
        }
        else if(this.props.app_state.withdraw_balance[e5['id']] == 0){
            this.props.notify('you cant withdraw 0 ether', 500)
        }
        else{
            this.setState({confirmation_dialog_box: true}) 
        }
    }



    render_dialog_ui(){
        var e5 = this.state.e5
        return(
            <Dialog onClose = {() => this.cancel_dialog_box()} open = {this.state.confirmation_dialog_box}>
                <div style={{'padding': '10px', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                    <h3 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>Confirmation</h3>
                    {this.render_detail_item('3', {'title':'Withdraw Ether Confirmation', 'details':'Confirm that you want to withdraw Ether to the set address', 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', {'style':'l','title':'Withdraw balance in Wei', 'subtitle':this.format_power_figure(this.props.app_state.withdraw_balance[e5['id']]), 'barwidth':this.calculate_bar_width(this.props.app_state.withdraw_balance[e5['id']]), 'number':this.format_account_balance_figure(this.props.app_state.withdraw_balance[e5['id']]), 'relativepower':'tokens'})}

                        {this.render_detail_item('2', {'style':'l','title':'Withdraw balance in Ether', 'subtitle':this.format_power_figure(this.props.app_state.withdraw_balance[e5['id']]/10**18), 'barwidth':this.calculate_bar_width(this.props.app_state.withdraw_balance[e5['id']]/10**18), 'number':(this.props.app_state.withdraw_balance[e5['id']]/10**18), 'relativepower':'Ether'})}
                    </div>
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':'Target Wallet Address', 'details':start_and_end(this.state.recipient_address), 'size':'s'})}
                    <div style={{height: 10}}/>

                    <div style={{height: 10}}/>
                    <div onClick={() => this.when_withdraw_ether_confirmation_received()}>
                        {this.render_detail_item('5', {'text':'Withdraw Ether', 'action':''})}
                    </div>
                </div>
                
            </Dialog>
        )
    }

    cancel_dialog_box(){
        this.setState({confirmation_dialog_box: false})
    }

    when_withdraw_ether_confirmation_received(){
        this.setState({confirmation_dialog_box: false})
        var e5 = this.state.e5['id']
        var run_expiry_duration = this.state.run_time_expiry == 0 ? (60*60*1/* 1 hour */) : this.state.run_time_expiry
        this.props.withdraw_ether_to_address(this.state.recipient_address, e5, run_expiry_duration, this.state.run_gas_price)
    }


    set_object(item){
        this.setState({e5: item})
    }






    render_withdraws_item_logs(){
        var items = this.props.app_state.withdraw_event_data[this.state.e5['id']]
        var middle = this.props.height - 170;
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
                <div style={{ overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_withdraws_item_clicked(index)}>
                                    {this.render_withdraws_event_item(item, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_withdraws_item_clicked(index){
        if (this.state.selected_withdraws_event_item == index) {
            this.setState({ selected_withdraws_event_item: null })
        } else {
            this.setState({ selected_withdraws_event_item: index })
        }
    }

    copy_to_clipboard(signature_data){
        navigator.clipboard.writeText(signature_data)
        this.props.notify('copied address to clipboard', 600)
    }

    render_withdraws_event_item(item, index){
        var amount = item.returnValues.p5
        var e5 = this.state.e5['id']

        var gas_price = this.props.app_state.gas_price[e5]
        if(gas_price == null || gas_price > 10**18){
            gas_price = this.get_gas_price_from_runs()
        }
        var gas_transactions = amount == 0 ? 0 : Math.floor((amount/gas_price)/2_300_000)

        if (this.state.selected_withdraws_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': item.returnValues.p4, 'details': 'transaction ID', 'size': 's' })}
                    <div style={{ height: 2 }}/>
                    <div onClick={() => this.copy_to_clipboard(item.returnValues.p3)}>
                        {this.render_detail_item('3', { 'details': (item.returnValues.p3), 'title': 'target', 'size': 's' })}
                    </div>
                    <div style={{ height: 2 }}/>

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title':'Amount in Wei', 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': 'wei', })}

                        {this.render_detail_item('2', { 'style': 'l', 'title':'Amount in Ether', 'subtitle': this.format_power_figure(amount/10**18), 'barwidth': this.calculate_bar_width(amount/10**18), 'number': (amount/10**18), 'barcolor': '', 'relativepower': 'ether', })}

                        {/* {this.render_detail_item('2', { 'style': 'l', 'title':'Transactions (2.3M Gas average)', 'subtitle': this.format_power_figure(gas_transactions), 'barwidth': this.calculate_bar_width(gas_transactions), 'number': this.format_account_balance_figure(gas_transactions), 'barcolor': '', 'relativepower': 'transactions', })} */}
                    </div>
                    <div style={{ height: 2 }}/>

                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p6), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }}/>
                    {this.render_detail_item('3', { 'title': item.returnValues.p7, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title':'Amount in Wei', 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': 'wei', })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '5px 20px 5px 20px' }} />
                </div>
            )
        }
    }







    render_pending_withdraws_item_logs(){
        var items = this.props.app_state.pending_withdraw_event_data[this.state.e5['id']]
        var middle = this.props.height - 120;
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
                <div style={{ overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_pending_withdraws_item_clicked(index)}>
                                    {this.render_pending_withdraws_event_item(item, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_pending_withdraws_item_clicked(index){
        if (this.state.selected_pending_withdraws_event_item == index) {
            this.setState({ selected_pending_withdraws_event_item: null })
        } else {
            this.setState({ selected_pending_withdraws_event_item: index })
        }
    }

    render_pending_withdraws_event_item(item, index){
        var amount = item.returnValues.p2
        var e5 = this.state.e5['id']

        var gas_price = this.props.app_state.gas_price[e5]
        if(gas_price == null || gas_price > 10**18){
            gas_price = this.get_gas_price_from_runs()
        }
        var gas_transactions = amount == 0 ? 0 : Math.floor((amount/gas_price)/2_300_000)

        if (this.state.selected_pending_withdraws_event_item == index) {
            return (
                <div>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title':'Amount in Wei', 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': 'wei', })}

                        {this.render_detail_item('2', { 'style': 'l', 'title':'Amount in Ether', 'subtitle': this.format_power_figure(amount/10**18), 'barwidth': this.calculate_bar_width(amount/10**18), 'number': (amount/10**18), 'barcolor': '', 'relativepower': 'ether', })}

                        {/* {this.render_detail_item('2', { 'style': 'l', 'title':'Transactions (2.3M Gas average)', 'subtitle': this.format_power_figure(gas_transactions), 'barwidth': this.calculate_bar_width(gas_transactions), 'number': this.format_account_balance_figure(gas_transactions), 'barcolor': '', 'relativepower': 'transactions', })} */}
                    </div>
                    <div style={{ height: 2 }}/>

                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p3), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }}/>
                    {this.render_detail_item('3', { 'title': item.returnValues.p4, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title':'Amount Added in Wei', 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': 'wei', })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '5px 20px 5px 20px' }} />
                </div>
            )
        }
    }










    get_gas_price_from_runs(){
        var last_events = this.props.app_state.all_E5_runs[this.state.e5['id']]
        var sum = 0
        if(last_events != null){
            var last_check = last_events.length < 50 ? last_events.length : 50
            for(var i=0; i<last_check; i++){
                sum += last_events[i].returnValues.p7
            }
            sum = sum/last_check;
        }
        return sum
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




export default WithdrawEtherPage;