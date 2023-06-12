import React, { Component } from 'react';
import Tags from './../components/tags';
import ViewGroups from './../components/view_groups'
import QRCode from "react-qr-code";
import NumberPicker from './../components/number_picker';
import TextInput from './../components/text_input';
import Html5QrcodePlugin from './../externals/Html5QrcodePlugin'
import Dialog from "@mui/material/Dialog";

var bigInt = require("big-integer");

function number_with_commas(x) {
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
        recipient_address:'0x00000000000000000000',
        confirmation_dialog_box: false
    };

    get_send_receive_ether_page_tags_object(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['or','',0], ['e','send', 'receive'], [0]
          ],
        };
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
        }else{
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
                <Tags page_tags_object={this.state.send_receive_ether_page_tags_object} tag_size={'l'} when_tags_updated={this.when_tags_updated.bind(this)}/>
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
        return(
            <div className="row">
                <div className="col-6">
                    <div style={{height: 10}}/>
                    <div style={{'background-color': 'rgb(217, 217, 217,.6)', 'box-shadow': '0px 0px 0px 0px #CECDCD','margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', this.get_number_balance_object())}
                    </div>
                    {this.render_number_picker()}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': 'rgb(217, 217, 217,.6)', 'box-shadow': '0px 0px 0px 0px #CECDCD','margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                        <p style={{'color': '#444444', 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 20px'}} className="fw-bold">Picked Amount In Ether and Wei</p>

                        {this.render_detail_item('2', this.get_picked_amount_in_wei())}
                        {this.render_detail_item('2', this.get_picked_amount_in_ether())}
                    </div>
                    
                    {this.render_detail_item('5', {'text':'Send Ether to Address', 'action':'send_ether'})}
                    
                </div>
                <div className="col-6">
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Sender Wallet Address', 'details':this.get_account_address(), 'size':'s'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':'Receiver Wallet Address', 'details':this.state.recipient_address, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <TextInput height={30} placeholder={'Set Receiver Address Here'} when_text_input_field_changed={this.when_text_input_field_changed.bind(this)} text={this.state.recipient_address}/>
                    <div style={{height: 10}}/>
                    <Html5QrcodePlugin 
                        fps={10}
                        qrbox={250}
                        disableFlip={false}
                        qrCodeSuccessCallback={this.onNewScanResult}/>
                </div>
            </div>
        )
    }

    render_dialog_ui(){
        return(
            <Dialog onClose = {() => this.cancel_dialog_box()} open = {this.state.confirmation_dialog_box}>
                <div style={{'padding': '10px'}}>
                    <h3 style={{'margin':'0px 0px 5px 5px'}}>Confirmation</h3>
                    {this.render_detail_item('3', {'title':'Send Ether Confirmation', 'details':'Confirm that you want to send Ether to the targeted recipient', 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': 'rgb(217, 217, 217,.6)', 'box-shadow': '0px 0px 0px 0px #CECDCD','margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                        <p style={{'color': '#444444', 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 20px'}} className="fw-bold">Picked Amount In Ether and Wei</p>

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

    render_number_picker(){
        return(
            <div>
                <NumberPicker number_limit={this.props.app_state.account_balance} when_number_picker_value_changed={this.when_number_picker_value_changed.bind(this)}/>
            </div>
        )
    }

    when_number_picker_value_changed(amount){
        this.setState({picked_wei_amount: amount})
    }


    render_receive_ether_ui(){
        return(
            <div style={{'padding':'10px 30px 0px 0px', width:'85%'}}>
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
                <p style={{'margin':'5% 0% 0% 47%'}}>Qr Code</p>
                
            </div>
        )
    }




    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data} copy_to_clipboard={this.copy_address_to_clipboard.bind(this)} when_send_ether_button_tapped={this.when_send_ether_button_tapped.bind(this)} when_send_ether_confirmation_received={this.when_send_ether_confirmation_received.bind(this)}/>
            </div>
        )

    }

    copy_address_to_clipboard(){
        console.log('copied to clipboard')
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

    };

    open_confirmation_dialog_box = () => {
       this.setState({confirmation_dialog_box: true})
    };


}




export default SendReceiveEtherPage;