import React, { Component } from 'react';
import Tags from './../components/tags';
import ViewGroups from './../components/view_groups'
import QRCode from "react-qr-code";
import NumberPicker from './../components/number_picker';
import TextInput from './../components/text_input';
import Html5QrcodePlugin from './../externals/Html5QrcodePlugin'
import Dialog from "@mui/material/Dialog";
import Letter from './../assets/letter.png';

var bigInt = require("big-integer");
const Web3 = require('web3');

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
    }
    
    state = {
        selected: 0,
        send_receive_ether_page_tags_object: this.get_send_receive_ether_page_tags_object(),
        picked_wei_amount: 0,
        picked_wei_gas_price: 0,
        recipient_address:'0x00000000000000000000',
        confirmation_dialog_box: false
    };

    get_send_receive_ether_page_tags_object(){
        if(this.props.size == 's'){
            return{
                'i':{
                    active:'e', 
                },
                'e':[
                    ['or','',0], ['e','send', 'receive', 'logs'], [0]
                ],
            };
        }else{
            return{
                'i':{
                    active:'e', 
                },
                'e':[
                    ['or','',0], ['e','send', 'receive'], [0]
                ],
            };
        }
        
    }

    render(){
        var selected_item = this.get_selected_item(this.state.send_receive_ether_page_tags_object, this.state.send_receive_ether_page_tags_object['i'].active)

        if(selected_item == 'send' || selected_item == 'e'){
            return(
                <div>
                    <div style={{'margin':'20px 0px 0px 20px'}}>
                        {this.render_top_tag_bar_group()}
                        {this.render_send_ether_ui()}
                    </div> 
                </div>
            )
        }
        else if(selected_item == 'logs'){
            return(
                <div>
                    <div style={{'margin':'20px 0px 0px 20px'}}>
                        {this.render_top_tag_bar_group()}
                        {this.render_transaction_history()}
                    </div>
                </div>
            )
        }
        else{
            return(
                <div>
                    <div style={{'margin':'20px 0px 0px 20px'}}>
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
            <div style={{'padding':'10px 30px 0px 0px', width:'100%'}}>
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px', 'text':'Send Ether using the address shown below', 'color':'dark-grey'})}
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
        return(
            <div>
                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':'Sender Wallet Address', 'details':this.get_account_address(), 'size':'s'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':'Receiver Wallet Address', 'details':this.state.recipient_address, 'size':'s'})}
                <div style={{height: 10}}/>

                <TextInput height={30} placeholder={'Set Receiver Address Here'} when_text_input_field_changed={this.when_text_input_field_changed.bind(this)} text={this.state.recipient_address} theme={this.props.theme}/>
                <div style={{height: 10}} theme={this.props.theme}/>

                <Html5QrcodePlugin 
                    fps={10}
                    qrbox={250}
                    disableFlip={false}
                    qrCodeSuccessCallback={this.onNewScanResult}/>

                {this.render_detail_item('0')}


                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', this.get_number_balance_object())}
                </div>
                {this.render_amount_number_picker()}
                <div style={{height: 10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">Picked Amount In Ether and Wei</p>

                    {this.render_detail_item('2', this.get_picked_amount_in_wei())}
                    {this.render_detail_item('2', this.get_picked_amount_in_ether())}
                </div>
                <div style={{height: 10}}/>



                {this.render_detail_item('0')}

                {this.render_gas_price_number_picker()}
                <div style={{height: 10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">Picked Gas Price in Ether and Wei</p>

                    {this.render_detail_item('2', this.get_picked_gas_price_in_wei())}
                    {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(this.state.picked_wei_gas_price/10**9), 'number':this.format_account_balance_figure(this.state.picked_wei_gas_price/10**9), 'barcolor':'#606060', 'relativepower':'gwei', })}
                    {this.render_detail_item('2', this.get_picked_gas_price_in_ether())}
                    
                </div>

                {this.render_detail_item('0')}
                
                {this.render_detail_item('5', {'text':'Send Ether to Address', 'action':'send_ether'})}

                {this.render_detail_item('0')}
                {this.render_detail_item('0')}
            </div>
        )
    }

    render_dialog_ui(){
        return(
            <Dialog onClose = {() => this.cancel_dialog_box()} open = {this.state.confirmation_dialog_box}>
                <div style={{'padding': '10px', 'background-color':this.props.theme['card_background_color']}}>
                    <h3 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>Confirmation</h3>
                    {this.render_detail_item('3', {'title':'Send Ether Confirmation', 'details':'Confirm that you want to send Ether to the targeted recipient', 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 20px'}} className="fw-bold">Picked Amount In Ether and Wei</p>

                        {this.render_detail_item('2', this.get_picked_amount_in_wei())}
                        {this.render_detail_item('2', this.get_picked_amount_in_ether())}
                    </div>
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':'Sender Wallet Address', 'details':this.get_account_address(), 'size':'s'})}
                    <div style={{height: 10}}/>
                    
                    {this.render_detail_item('3', {'title':'Receiver Wallet Address', 'details':this.state.recipient_address, 'size':'s'})}

                    <div style={{height: 10}}/>
                    {this.render_detail_item('5', {'text':'Send Ether', 'action':'confirm_send_ether'})}
                </div>
                
            </Dialog>
        )
    }

    render_transaction_history(){
        var middle = this.props.app_state.height-200;
        var size = this.props.size;
        var items = []
        if(this.props.transaction_history != null){
            var items = this.props.transaction_history == null ? [] : this.props.transaction_history
        }

        if(items.length == 0){
            return(
                <div>
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
            <div style={{height:he, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center','margin':'0px 0px 20px 0px'}}>
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
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 20px'}} className="fw-bold">Value in Ether and Wei</p>
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
            'number':this.format_account_balance_figure(this.state.picked_wei_amount/10**18),
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
        if(this.props.app_state.account != null){
            return this.props.app_state.account.address;
        }
    }

    get_number_balance_object(){
        return{
            'style':'l',
            'title':'Balance in Ether',
            'subtitle':this.format_power_figure(this.props.app_state.account_balance),
            'barwidth':this.calculate_bar_width(this.props.app_state.account_balance),
            'number':this.format_account_balance_figure(this.props.app_state.account_balance),
            'barcolor':'#606060',
            'relativepower':'wei',
        }
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

    render_amount_number_picker(){
        return(
            <div>
                <NumberPicker number_limit={this.props.app_state.account_balance} when_number_picker_value_changed={this.when_number_picker_value_changed.bind(this)} theme={this.props.theme} power_limit={this.get_balance_power_limit(this.props.app_state.account_balance)}/>
            </div>
        )
    }

    render_gas_price_number_picker(){
        return(
            <div>
                <NumberPicker number_limit={this.props.app_state.account_balance} when_number_picker_value_changed={this.when_new_gas_price_figure_set.bind(this)} theme={this.props.theme} power_limit={this.get_balance_power_limit(this.props.app_state.account_balance)}/>
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
            <div style={{'padding':'10px 30px 0px 0px'}}>
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px', 'text':'Receive Ether using the address shown below', 'color':'dark-grey'})}
                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':'Wallet Address', 'details':this.get_account_address(), 'size':'l'})}
                {this.render_detail_item('5',{'text':'Copy to Clipboard', 'action':'copy_to_clipboard'})}
                <div style={{height: this.props.height, width:'100%','display': 'flex', 'align-items':'center','justify-content':'center', 'margin':'30px 0px 0px 0px'}}>
                    <QRCode
                        size={100}
                        style={{ height: "auto", maxWidth: "100%", width: "50%" }}
                        value={this.get_account_address()}
                        viewBox={`0 0 100 100`}
                    />
                    
                </div>
                <p style={{'margin':'5% 0% 0% 47%', 'color':this.props.theme['primary_text_color']}}>Qr Code</p>
                
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
        navigator.clipboard.writeText(this.props.app_state.account.address)
        this.props.notify('copied to clipboard!', 600)
    }


    when_send_ether_button_tapped(){
        this.open_confirmation_dialog_box()
    }


    when_text_input_field_changed(text){
        var final_text = text == '' ? '0x' : text
        this.setState({recipient_address: final_text})
    }







    cancel_dialog_box(){
        this.setState({confirmation_dialog_box: false})
    }

    when_send_ether_confirmation_received = () => {
        this.setState({confirmation_dialog_box: false})

        this.props.notify('running transaction...', 600)
        this.props.send_ether_to_target(this.state.recipient_address, this.state.picked_wei_amount, this.state.picked_wei_gas_price, this.props.app_state);
        
    };

    isValidAddress = (adr) => {
        try {
        const web3 = new Web3()
        web3.utils.toChecksumAddress(adr)
        return true
        } catch (e) {
        return false
        }
    }

    open_confirmation_dialog_box = () => {
        if(this.state.picked_wei_amount == 0){
            this.props.notify('please set a valid amount', 500)
        }
        else if(this.state.picked_wei_gas_price == 0){
            this.props.notify('please set a valid gas price', 500)
        }
        else if(!this.isValidAddress(this.state.recipient_address)){
            this.props.notify('please set a valid recipient', 500)
        }
        else{
            this.setState({confirmation_dialog_box: true}) 
        }
       
    };

    copy_text_to_clipboard(text){
        navigator.clipboard.writeText(text)
        this.props.notify('copied to clipboard!', 600)
    }

}




export default SendReceiveEtherPage;