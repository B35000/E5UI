import React, { Component } from 'react';
import Tags from './../components/tags';
import ViewGroups from './../components/view_groups'
import QRCode from "react-qr-code";
import NumberPicker from './../components/number_picker';
import TextInput from './../components/text_input';
import Html5QrcodePlugin from '../externals/Html5QrcodePlugin'
import Dialog from "@mui/material/Dialog";
import Letter from './../assets/letter.png';

// import { ethToEvmos, evmosToEth } from '@evmos/address-converter'
import { from } from "@iotexproject/iotex-address-ts";

var bigInt = require("big-integer");
const Web3 = require('web3');
const { toBech32, fromBech32,} = require('@harmony-js/crypto');

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

class SendReceiveEtherPage extends Component {

    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback.
        this.onNewScanResult = this.onNewScanResult.bind(this);
        this.number_picker = React.createRef();
    }
    
    state = {
        selected: 0,
        send_receive_ether_page_tags_object: this.get_send_receive_ether_page_tags_object(),
        picked_wei_amount: 0,
        picked_wei_gas_price: 0,
        recipient_address:'',
        confirmation_dialog_box: false,
        ether:{'e5':this.props.app_state.selected_e5}
    };

    set_object(item){
        this.setState({ether: item})
        var me = this;
        setTimeout(function() {
            if(me.number_picker.current != null){
                me.number_picker.current.reset_number_picker()
            }
        }, (1 * 1000));
    }

    get_send_receive_ether_page_tags_object(){
        if(this.props.size == 's'){
            return{
                'i':{
                    active:'e', 
                },
                'e':[
                    ['xor','',0], ['e',this.props.app_state.loc['1369']/* 'send' */, this.props.app_state.loc['1370']/* 'receive' */], [1]
                ],
            };
        }else{
            return{
                'i':{
                    active:'e', 
                },
                'e':[
                    ['xor','',0], ['e',this.props.app_state.loc['1369']/* 'send' */, this.props.app_state.loc['1370']/* 'receive' */], [1]
                ],
            };
        }
        
    }

    render(){
        var selected_item = this.get_selected_item(this.state.send_receive_ether_page_tags_object, this.state.send_receive_ether_page_tags_object['i'].active)

        if(selected_item == this.props.app_state.loc['1369']/* 'send' */ || selected_item == 'e'){
            return(
                <div>
                    <div style={{'margin':'10px 0px 0px 10px', 'overflow-x':'hidden'}}>
                        {this.render_top_tag_bar_group()}
                        {this.render_send_ether_ui()}
                    </div> 
                </div>
            )
        }
        // else if(selected_item == this.props.app_state.loc['']/* 'logs' */){
        //     return(
        //         <div>
        //             <div style={{'margin':'10px 0px 0px 20px', 'overflow-x':'hidden'}}>
        //                 {this.render_top_tag_bar_group()}
        //                 {this.render_transaction_history()}
        //             </div>
        //         </div>
        //     )
        // }
        else{
            return(
                <div>
                    <div style={{'margin':'10px 0px 0px 10px', 'overflow-x':'hidden'}}>
                        {this.render_top_tag_bar_group()}
                        {this.render_receive_ether_ui()}
                    </div>

                </div>
            )
        }
        
    }


    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }


    render_top_tag_bar_group(){
        return(
            <div>
                <Tags page_tags_object={this.state.send_receive_ether_page_tags_object} tag_size={'l'} when_tags_updated={this.when_tags_updated.bind(this)} theme={this.props.theme}/>
            </div>
        )
    }


    when_tags_updated(tag_group){
        this.setState({send_receive_ether_page_tags_object: tag_group})
    }


    render_send_ether_ui(){
        return(
            <div style={{'padding':'10px 10px 0px 0px', width:'100%', overflow: 'auto', maxHeight: this.props.height-120}}>
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px', 'text':this.props.app_state.loc['1371']/* 'Send Ether using the address shown below.' */, 'color':'dark-grey'})}
                {this.render_medium_screen_ui()}
                {this.render_dialog_ui()}
            </div>
        )
    }

    render_medium_screen_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_send_ether_middle_part()}
                </div>
            )
        }
        else{
            return(
                <div className="row">
                    <div className="col-6">
                        {this.render_send_ether_middle_part()}
                    </div>
                    <div className="col-6">
                        {this.render_transaction_history()}
                    </div>
                </div>
            )
        }
    }

    render_send_ether_middle_part(){
        var e5 = this.state.ether['e5']

        var gas_price = this.props.app_state.gas_price[this.props.app_state.selected_e5]
        if(gas_price == null){
            gas_price = this.get_gas_price_from_runs()
        }
        if(gas_price == 0 || gas_price > 10**18) gas_price = 10**10
        var gas_transactions = this.state.picked_wei_amount == 0 ? 0 : Math.floor((this.state.picked_wei_amount/gas_price)/2_300_000)

        var balance_gas_transactions = this.props.app_state.account_balance[e5] == 0 ? 0 : Math.floor((this.props.app_state.account_balance[e5]/gas_price)/2_300_000)

        return(
            <div>
                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1372']/* 'Sender Wallet Address' */, 'details':this.get_account_address(), 'size':'s'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1373']/* 'Receiver Wallet Address' */, 'details':this.state.recipient_address, 'size':'s'})}
                <div style={{height: 10}}/>

                <TextInput height={30} placeholder={this.props.app_state.loc['1374']/* 'Set Receiver Address Here' */} when_text_input_field_changed={this.when_text_input_field_changed.bind(this)} text={this.state.recipient_address} theme={this.props.theme}/>
                <div style={{height: 10}} theme={this.props.theme}/>

                
                {/* <Html5QrcodePlugin 
                    fps={10}
                    qrbox={250}
                    disableFlip={false}
                    qrCodeSuccessCallback={this.onNewScanResult}/> */}
                
                {this.render_qr_code_scanner()}
                {this.render_detail_item('0')}


                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.get_wallet_data_for_specific_e5(e5)}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1375']/* 'Balance in Wei' */, 'subtitle':this.format_power_figure(this.props.app_state.account_balance[e5]), 'barwidth':this.calculate_bar_width(this.props.app_state.account_balance[e5]), 'number':this.format_account_balance_figure(this.props.app_state.account_balance[e5]), 'barcolor':'#606060', 'relativepower':'wei', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1376']/* 'Balance in Ether' */, 'subtitle':this.format_power_figure(this.props.app_state.account_balance[e5]/10**18), 'barwidth':this.calculate_bar_width(this.props.app_state.account_balance[e5]/10**18), 'number':(this.props.app_state.account_balance[e5]/10**18), 'barcolor':'#606060', 'relativepower':'ether', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1377']/* 'Transactions (2.3M Gas average)' */, 'subtitle':this.format_power_figure(balance_gas_transactions), 'barwidth':this.calculate_bar_width(balance_gas_transactions), 'number':this.format_account_balance_figure(balance_gas_transactions), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1378']/* 'transactions' */, })}
                </div>

                <div style={{height: 30}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1379']/* 'Gas Price' */, 'subtitle':this.format_power_figure(gas_price), 'barwidth':this.calculate_bar_width(gas_price), 'number':this.format_account_balance_figure(gas_price), 'barcolor':'#606060', 'relativepower':'wei', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1380']/* 'Gas Price in Gwei' */, 'subtitle':this.format_power_figure(gas_price/10**9), 'barwidth':this.calculate_bar_width(gas_price/10**9), 'number':this.format_account_balance_figure(gas_price/10**9), 'barcolor':'#606060', 'relativepower':'gwei', })}
                </div>

                <div style={{height: 30}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1381']/* 'Amount to Send' */, 'details':this.props.app_state.loc['1382']/* 'Set the amount to send in the number picker below.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">{this.props.app_state.loc['1383']/* Picked Amount In Ether and Wei */}</p>

                    {this.render_detail_item('2', this.get_picked_amount_in_wei())}
                    {this.render_detail_item('2', this.get_picked_amount_in_ether())}

                    {this.render_detail_item('2', { 'style':'s', 'title':this.props.app_state.loc['1377']/* 'Transactions (2.3M Gas average)' */, 'subtitle':this.format_power_figure(gas_transactions), 'barwidth':this.calculate_bar_width(gas_transactions), 'number':this.format_account_balance_figure(gas_transactions), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1378']/* 'transactions' */, })}
                </div>
                
                {this.render_amount_number_picker()}

                <div style={{'padding': '5px'}} onClick={()=>this.set_maximum(gas_price, e5)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1384']/* 'Set Maximum' */, 'action':''})}
                </div>

                {this.render_detail_item('0')}
                
                {/* <div style={{height: 10}}/> */}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1385']/* 'Transaction Gas Price' */, 'details':this.props.app_state.loc['1386']/* 'Set the gas price for your transaction below.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">{this.props.app_state.loc['1387']/* Picked Gas Price in Ether and Gwei. */}</p>
                    {this.render_detail_item('2', this.get_picked_gas_price_in_wei())}
                    {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(this.state.picked_wei_gas_price/10**9), 'number':(this.state.picked_wei_gas_price/10**9), 'barcolor':'#606060', 'relativepower':'gwei', })}
                    {/* {this.render_detail_item('2', this.get_picked_gas_price_in_ether())} */}
                </div>

                {this.render_gas_price_number_picker()}

                {this.render_detail_item('0')}
                
                {this.render_detail_item('5', {'text':this.props.app_state.loc['1388']/* 'Send Ether to Address' */, 'action':'send_ether'})}

                {this.render_detail_item('0')}
                {this.render_detail_item('0')}
            </div>
        )
    }

    set_maximum(g, e5){
        var gas_price = g
        if(this.state.picked_wei_gas_price != 0){
            gas_price = this.state.picked_wei_gas_price
        }
        var tx_ether = gas_price * 35_000
        var my_balance = this.props.app_state.account_balance[e5]
        var maximum = my_balance - tx_ether
        if(maximum < 0) maximum = 0

        this.setState({picked_wei_amount: maximum})
        this.props.notify(this.props.app_state.loc['1389']/* 'Maximum amount set.' */, 1000)
    }

    get_gas_price_from_runs(){
        var e5 = this.state.ether['e5']
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

    render_qr_code_scanner(){
        return(
            <div>
                {this.render_detail_item('3', {'size':'s', 'title':this.props.app_state.loc['1390']/* 'Open Scanner' */, 'details':this.props.app_state.loc['1391']/* 'Scan for an address using a built in scanner' */})}
                <div style={{height:10}}/>
                <div style={{'padding': '5px'}} onClick={()=>this.start_scan()}>
                    {this.render_detail_item('5',{'text':this.props.app_state.loc['1392']/* 'Scan' */, 'action':''})}
                </div>
            </div>
        )
    }
    
    start_scan(){
        this.props.start_scan('send_receive_ether_page')
    }

     set_scan_data(data){
        this.setState({recipient_address:data})
    }

    render_dialog_ui(){
        return(
            <Dialog onClose = {() => this.cancel_dialog_box()} open = {this.state.confirmation_dialog_box}>
                <div style={{'padding': '10px', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                    <h3 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>Confirmation</h3>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1393']/* 'Send Ether Confirmation' */, 'details':this.props.app_state.loc['1394']/* 'Confirm that you want to send Ether to the targeted recipient' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">{this.props.app_state.loc['1395']/* Picked Amount In Ether and Wei */}</p>
                        {this.render_detail_item('2', this.get_picked_amount_in_wei())}
                        {this.render_detail_item('2', this.get_picked_amount_in_ether())}
                    </div>
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1396']/* 'Sender Wallet Address' */, 'details':this.get_account_address(), 'size':'s'})}
                    <div style={{height: 10}}/>
                    
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1397']/* 'Receiver Wallet Address' */, 'details':this.state.recipient_address, 'size':'s'})}

                    <div style={{height: 10}}/>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1398']/* 'Send Ether' */, 'action':'confirm_send_ether'})}
                </div>
                
            </Dialog>
        )
    }

    render_transaction_history(){
        var middle = this.props.app_state.height-200;
        var size = this.props.size;
        var items = []
        if(this.props.transaction_history != null){
            var items = this.props.transaction_history == null ? [] : [].concat(this.props.transaction_history)
        }

        if(items.length == 0){
            return(
                <div style={{'padding':'10px 0px 0px 0px'}}>
                    {this.render_empty_detail_object()}
                    <div style={{height: 5}}/>
                    {this.render_empty_detail_object()}
                </div>
            )
        }
        
        return (
            <div style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '5px'}}>
                            {this.render_transaction_history_item(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    render_empty_detail_object(){
        var he = this.props.app_state.height
        var size = this.props.size
        if(size == 'm'){
            he = this.props.app_state.height-190;
        }
        return(
            <div style={{height:150, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center','margin':'0px 0px 10px 0px'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={Letter} style={{height:70 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                    
                </div>
        );
    }

    render_transaction_history_item(item, index){
        if(item.from == null || item.to == null){
            return(
                <div/>
            )
        }
        var item_object = this.get_block_history_log_item_object(item)
        return ( 
            <div onClick={() => console.log()} style={{height:'auto', width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+this.props.theme['card_shadow_color']}}>
                <div style={{'padding': '5px 0px 5px 5px'}}>
                    <div style={{'padding': '0px 10px 0px 10px'}} onClick={() => this.copy_text_to_clipboard(item.blockHash)}>
                        {this.render_detail_item('3', item_object['title'])}
                    </div>
                    <div style={{height: 10}}/>
                    
                    <div style={{'padding': '0px 10px 0px 10px'}} onClick={() => this.copy_text_to_clipboard(item.from)}>
                        {this.render_detail_item('3', item_object['from'])}
                    </div>
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 10px 0px 10px'}} onClick={() => this.copy_text_to_clipboard(item.to)}>
                        {this.render_detail_item('3', item_object['to'])}
                    </div>
                    <div style={{height: 10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 10px 0px 10px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 20px'}} className="fw-bold">{this.props.app_state.loc['1399']/* Value in Ether and Wei */}</p>
                        {this.render_detail_item('2', item_object['value_in_wei'])}
                        {this.render_detail_item('2', item_object['value_in_ether'])}
                    </div>
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 10px 0px 10px'}}>
                        {this.render_detail_item('3', item_object['gas_gasprice'])}
                    </div>
                    <div style={{height: 10}}/>
                </div>         
            </div>
        );
    }

    get_block_history_log_item_object(item){
        var blockhash = item.blockHash == null? '':item.blockHash.toString().substring(0, 20).concat('...')
        return{
            'title':{'title':'Block: '+item.blockNumber, 'details':blockhash, 'size':'s'},
            'from':{'title':'From: ', 'details':this.format_hash_or_address(item.from), 'size':'s'},
            'to':{'title':'To: ', 'details':this.format_hash_or_address(item.to), 'size':'s'},
            'value_in_wei':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(item.value),'number':this.format_account_balance_figure(item.value), 'barcolor':'#606060', 'relativepower':'wei',},
            'value_in_ether':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(item.value/10**18),'number':this.format_account_balance_figure((item.value/10**18).toFixed(8)), 'barcolor':'#606060', 'relativepower':'ether',},
            'gas_gasprice':{'title':'Gas: '+this.format_account_balance_figure(item.gas), 'details':' Gas Price(Wei): '+this.format_account_balance_figure(item.gasPrice), 'size':'s'},
        }
    }

    format_hash_or_address(string){
        if(string == null){
            string = '0x00000000000000000000000000000000000000000'
        }
        return string.toString().replace(string.substring(9,18), "....")
    }

    onNewScanResult(decodedText, decodedResult) {
        // Handle the result here.
        this.setState({recipient_address: decodedText})
        this.props.notify('Address Set!', 400)
    }

    get_picked_amount_in_wei(){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(this.state.picked_wei_amount),
            'number':this.format_account_balance_figure(this.state.picked_wei_amount),
            'barcolor':'#606060',
            'relativepower':'wei',
        }
    }


    get_picked_amount_in_ether(){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(this.state.picked_wei_amount/10**18),
            'number':(this.state.picked_wei_amount/10**18),
            'barcolor':'#606060',
            'relativepower':'ether',
        }
    }


    get_picked_gas_price_in_ether(){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(this.state.picked_wei_gas_price/10**18),
            'number':this.format_account_balance_figure(this.state.picked_wei_gas_price/10**18),
            'barcolor':'#606060',
            'relativepower':'ether',
        }
    }

    get_picked_gas_price_in_wei(){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(this.state.picked_wei_gas_price),
            'number':this.format_account_balance_figure(this.state.picked_wei_gas_price),
            'barcolor':'#606060',
            'relativepower':'wei',
        }
    }

    get_account_address(){
        var e5 = this.state.ether['e5']
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

    render_amount_number_picker(){
        var e5 = this.state.ether['e5']
        var limit = this.props.app_state.account_balance[e5] == null ? 0 : this.props.app_state.account_balance[e5]
        return(
            <div>
                <NumberPicker ref={this.number_picker} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_number_picker_value_changed.bind(this)} theme={this.props.theme} power_limit={23}/>
            </div>
        )
    }

    render_gas_price_number_picker(){
        var e5 = this.state.ether['e5']
        var limit = this.props.app_state.account_balance[e5] == null ? 0 : this.props.app_state.account_balance[e5]
        return(
            <div>
                <NumberPicker ref={this.number_picker} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_new_gas_price_figure_set.bind(this)} theme={this.props.theme} power_limit={23}/>
            </div>
        )
    }

    get_balance_power_limit(balance){        
        if(balance < 1_000_000_000){
            return 0
        }else{
            var power = balance.toString().length - 9
            return power
        }
    }

    when_new_gas_price_figure_set(amount){
        this.setState({picked_wei_gas_price: amount})
    }

    when_number_picker_value_changed(amount){
        this.setState({picked_wei_amount: amount})
    }







    render_receive_ether_ui(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div>
                    {this.render_scan_qr_code_ui()}
                </div>
            )
        }
        else{
            return(
                <div className="row">
                    <div className="col-6">
                        {this.render_scan_qr_code_ui()}
                    </div>
                    <div className="col-6" style={{'margin':'0px 10px 0px 0px', width:'47%'}}>
                        {this.render_transaction_history()}
                    </div>
                </div> 
            )
        }
        
    }

    render_scan_qr_code_ui(){
        return(
            <div style={{'padding':'10px 10px 0px 0px'}}>
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px', 'text':this.props.app_state.loc['1400']/* 'Receive Ether using the address shown below' */, 'color':'dark-grey'})}
                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1401']/* 'Wallet Address' */, 'details':this.get_account_address(), 'size':'s'})}
                <div style={{height: 10}}/>
                {this.render_detail_item('5',{'text':this.props.app_state.loc['1402']/* 'Copy to Clipboard' */, 'action':'copy_to_clipboard'})}
                <div style={{height: 200, width:'100%','display': 'flex', 'align-items':'center','justify-content':'center', 'margin':'30px 0px 0px 0px'}}>
                    <QRCode
                        size={150}
                        style={{ height: "auto", maxWidth: "100%", width: "50%" }}
                        value={this.get_account_address()}
                        viewBox={`0 0 100 100`}
                    />
                    
                </div>
                <p style={{'margin':'5% 0% 0% 0%', 'text-align': 'center', 'color':this.props.theme['primary_text_color']}}>Qr Code</p>
                
            </div>
        )
    }




    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data} copy_to_clipboard={this.copy_address_to_clipboard.bind(this)} when_send_ether_button_tapped={this.when_send_ether_button_tapped.bind(this)} when_send_ether_confirmation_received={this.when_send_ether_confirmation_received.bind(this)} theme={this.props.theme}/>
            </div>
        )

    }

    copy_address_to_clipboard(){
        var e5 = this.state.ether['e5']
        navigator.clipboard.writeText(this.format_address(this.props.app_state.accounts[e5].address, e5))
        this.props.notify(this.props.app_state.loc['1403']/* 'copied to clipboard!' */, 600)
    }


    when_send_ether_button_tapped(){
        var e5 = this.state.ether['e5']
        var picked_amount = this.state.picked_wei_amount
        var my_balance = this.props.app_state.account_balance[e5]
        
        var gas_price_picked = 30_000 * this.state.picked_wei_gas_price
        
        if((picked_amount+gas_price_picked) > my_balance){
            this.props.notify(this.props.app_state.loc['1404']/* 'Your ether balance is insufficient to fulfil that transaction.' */, 7200)
            return;
        }

        this.open_confirmation_dialog_box()
    }


    when_text_input_field_changed(text){
        var final_text = text == '' ? '' : text
        this.setState({recipient_address: final_text})
    }







    cancel_dialog_box(){
        this.setState({confirmation_dialog_box: false})
    }

    when_send_ether_confirmation_received = () => {
        this.setState({confirmation_dialog_box: false})
        var e5 = this.state.ether['e5']
        this.props.notify(this.props.app_state.loc['1045']/* 'running your sendtransaction...' */, 600)
        this.props.send_ether_to_target(this.format_to_address(this.state.recipient_address, e5), this.state.picked_wei_amount, this.set_gas_price(), this.props.app_state, e5);
        
    };

    set_gas_price(){
        if(this.state.picked_wei_gas_price == 0){
            var gas_price = this.props.app_state.gas_price[this.props.app_state.selected_e5]
            if(gas_price == null){
                gas_price = this.get_gas_price_from_runs()
            }
            return gas_price;
        }else return this.state.picked_wei_gas_price
    }

    isValidAddress = (adr) => {
        // if(adr == ''){
        //     return false
        // }
        // return true
        var e5 = this.state.ether['e5']
        try {
            const web3 = new Web3()
            web3.utils.toChecksumAddress(this.format_to_address(adr, e5))
        return true
        } catch (e) {
        return false
        }
    }

    format_to_address(address, e5){
        if(e5 == 'E45'){
            return fromBech32(address)
        }
        if(e5 == 'E115'){
            return this.replace_xdc_with_0x(address)
        }
        // if(e5 == 'E175'){
        //     return evmosToEth(address)
        // }
        if(e5 == 'E425'){
            return this.convert_from_iotx(address)
        }
        return address
    }


    replace_xdc_with_0x(address){
        if(address.toString().startsWith('0x')) return address
        return '0x'+address.toString().slice(3)
    }

    convert_from_iotx(address){
        const addr2 = from(address.toString());
        return addr2.stringEth()
    }



    open_confirmation_dialog_box = () => {
        if(this.state.picked_wei_amount == 0){
            this.props.notify(this.props.app_state.loc['1406']/* 'Please set a valid amount.' */, 4500)
        }
        // else if(this.state.picked_wei_gas_price == 0){
        //     this.props.notify('please set a valid gas price', 500)
        // }
        else if(!this.isValidAddress(this.state.recipient_address)){
            this.props.notify(this.props.app_state.loc['1407']/* 'Please set a valid recipient.' */, 4500)
        }
        else{
            this.setState({confirmation_dialog_box: true}) 
        }
       
    };

    copy_text_to_clipboard(text){
        navigator.clipboard.writeText(text)
        this.props.notify(this.props.app_state.loc['1403']/* 'copied to clipboard!' */, 600)
    }

}




export default SendReceiveEtherPage;