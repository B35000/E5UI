import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import TextInput from './../components/text_input';
import Dialog from "@mui/material/Dialog";

var bigInt = require("big-integer");
const Web3 = require('web3');

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class WithdrawEtherPage extends Component {
    
    state = {
        selected: 0, withdraw_ether_page_tags_object: this.get_withdraw_ether_page_tags_object(),
        recipient_address:'', confirmation_dialog_box: false, e5:{'data':[], 'id':this.props.app_state.selected_e5}
    };

    get_withdraw_ether_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','withdraw-ether'], [1]
            ],
        };
    }

    render(){
        var e5 = this.state.e5
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
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

                <div style={{height:10}}/>

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

                {this.render_dialog_ui()}

            </div>
        )
    }


    when_withdraw_ether_page_tags_object_updated(tag_obj){
        this.setState({withdraw_ether_page_tags_object: tag_obj})
    }


    when_text_input_field_changed(text){
        this.setState({recipient_address: text})
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
        this.setState({recipient_address: this.get_account_address()})
    }

    get_account_address(){
        var e5 = this.state.e5
        if(this.props.app_state.accounts[e5['id']] != null){
            return this.props.app_state.accounts[e5['id']].address;
        }
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
                <div style={{'padding': '10px', 'background-color':this.props.theme['card_background_color']}}>
                    <h3 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>Confirmation</h3>
                    {this.render_detail_item('3', {'title':'Withdraw Ether Confirmation', 'details':'Confirm that you want to withdraw Ether to the set address', 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', {'style':'l','title':'Withdraw balance in Wei', 'subtitle':this.format_power_figure(this.props.app_state.withdraw_balance[e5['id']]), 'barwidth':this.calculate_bar_width(this.props.app_state.withdraw_balance[e5['id']]), 'number':this.format_account_balance_figure(this.props.app_state.withdraw_balance[e5['id']]), 'relativepower':'tokens'})}

                        {this.render_detail_item('2', {'style':'l','title':'Withdraw balance in Ether', 'subtitle':this.format_power_figure(this.props.app_state.withdraw_balance[e5['id']]/10**18), 'barwidth':this.calculate_bar_width(this.props.app_state.withdraw_balance[e5['id']]/10**18), 'number':(this.props.app_state.withdraw_balance[e5['id']]/10**18), 'relativepower':'Ether'})}
                    </div>
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':'Target Wallet Address', 'details':this.state.recipient_address, 'size':'s'})}
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
        this.props.withdraw_ether_to_address(this.state.recipient_address)
    }


    set_object(item){
        this.setState({e5: item})
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