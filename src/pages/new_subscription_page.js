import React, { Component } from 'react';
import ViewGroups from './../components/view_groups';
import Tags from './../components/tags';
import NumberPicker from './../components/number_picker';
import TextInput from './../components/text_input';

import Letter from './../assets/letter.png';

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

var bigInt = require("big-integer");

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

class NewSubscriptionPage extends Component {
    
    state = {
        id: makeid(32), type:'subscription',
        new_subscription_tags_object: this.get_new_subscription_tags_object(),
        authority_id:'', minimum_buy_amount:0, cancellable_tags_object:this.get_cancellable_tags_object(),
        maximum_buy_amount:0, minimum_cancellable_balance_amount:0, time_unit:0, subscription_beneficiary:'',

        new_token_access_rights_tags_object: this.get_new_token_access_rights_tags_object(), 
        new_token_interactible_moderator_tags_object: this.get_new_token_interactible_moderator_tags_object(),
        moderator_id:'', moderators:[], interactible_id:'', interactible_timestamp:0, interactibles:[],
        exchange_id:'', price_amount:0, price_data:[],
    };


    get_new_subscription_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','configuration', 'authorities', 'prices'], [1]
            ],
        };
    }


    get_cancellable_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','false', 'true'], [1]
            ],
        };
    }

    get_new_token_interactible_moderator_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','moderators', 'interactible'], [1]
            ],
        };
    }

    get_new_token_access_rights_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','enabled', 'disabled'], [1]
            ],
        };
    }

    render(){
        return(
            <div>
                <div style={{'padding':'10px 20px 0px 10px'}}>
                    <div className="row">
                        <div className="col-10" style={{'padding': '5px 0px 0px 10px'}}>
                            <Tags page_tags_object={this.state.new_subscription_tags_object} tag_size={'l'} when_tags_updated={this.when_new_subscription_tags_object.bind(this)} theme={this.props.theme}/>
                        </div>
                        <div className="col-2" style={{'padding': '0px 0px 0px 0px'}}>
                            <div style={{'padding': '5px'}} onClick={()=>this.finish_creating_object()}>
                                {this.render_detail_item('5', {'text':'Finish', 'action':''})}
                            </div>
                            
                        </div>
                    </div>
                    
                    
                    <div style={{'margin':'20px 0px 0px 0px'}}>
                        {this.render_everything()}   
                    </div>
                    
                </div>
            </div>
        )
    }

    when_new_subscription_tags_object(tag_obj){
        this.setState({when_new_subscription_tags_object: tag_obj})
    }


    render_everything(){
        var selected_item = this.get_selected_item(this.state.new_subscription_tags_object, this.state.new_subscription_tags_object['i'].active)

        if(selected_item == 'configuration'){
            return(
                <div>
                    {this.render_configuration_part()}
                </div>
            ) 
        }
        else if(selected_item == 'authorities'){
            return(
                <div>
                    {this.render_authorities_part()}
                </div>
            ) 
        }
        else if(selected_item == 'prices'){
            return(
                <div>
                    {this.render_prices_part()}
                </div>
            ) 
        }
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }


    render_configuration_part(){
        var size = this.props.size
        var height = this.props.height-150

        if(size == 's'){
            return(
                <div style={{overflow: 'auto', maxHeight: height}}>
                    {this.render_configuration_part_one()}
                    <div style={{height: 20}}/>
                    {this.render_configuration_part_two()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 0px 0px 20px', overflow: 'auto', maxHeight: height}}>
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_configuration_part_one()}
                    </div>
                    <div className="col-6">
                        {this.render_configuration_part_two()}
                    </div>
                </div>
                
            )
        }
    }

    render_configuration_part_one(){
        return(
            <div style={{'padding':'0px 0px 0px 0px'}}>  

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Minimum Buy Amount', 'subtitle':this.format_power_figure(this.state.minimum_buy_amount), 'barwidth':this.calculate_bar_width(this.state.minimum_buy_amount), 'number':this.format_account_balance_figure(this.state.minimum_buy_amount), 'barcolor':'', 'relativepower':'units', })}
                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_minimum_buy_amount.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':'Cancellable', 'details':'If set to true, subscription payers can refund their subscription payments', 'size':'l'})}

                <div style={{height:20}}/>
                <Tags page_tags_object={this.state.cancellable_tags_object} tag_size={'l'} when_tags_updated={this.when_cancellable_tags_object.bind(this)} theme={this.props.theme}/>

                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.get_time_diff(this.state.time_unit), 'details':'Time Unit', 'size':'l'})}

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_time_unit.bind(this)} theme={this.props.theme} power_limit={12}/>

                {this.render_detail_item('0')}
            </div>
        )
    }

   

    when_minimum_buy_amount(amount){
        this.setState({minimum_buy_amount: amount})
    }

    when_cancellable_tags_object(tag_obj){
        this.setState({cancellable_tags_object: tag_obj})
    }

    when_time_unit(amount){
        this.setState({time_unit: amount})
    }

    render_configuration_part_two(){
        return(
            <div style={{'padding':'0px 0px 0px 0px'}}>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Maximum Buy Amount', 'subtitle':this.format_power_figure(this.state.maximum_buy_amount), 'barwidth':this.calculate_bar_width(this.state.maximum_buy_amount), 'number':this.format_account_balance_figure(this.state.maximum_buy_amount), 'barcolor':'', 'relativepower':'units', })}
                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_maximum_buy_amount.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Minimum Cancellable Balance Amount', 'subtitle':this.format_power_figure(this.state.minimum_cancellable_balance_amount), 'barwidth':this.calculate_bar_width(this.state.minimum_cancellable_balance_amount), 'number':this.format_account_balance_figure(this.state.minimum_cancellable_balance_amount), 'barcolor':'', 'relativepower':'units', })}
                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_minimum_cancellable_balance_amount.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}
            </div>
        )
    }

    when_maximum_buy_amount(amount){
        this.setState({maximum_buy_amount:amount})
    }

    when_minimum_cancellable_balance_amount(amount){
        this.setState({minimum_cancellable_balance_amount: amount})
    }


    render_authorities_part(){
        var size = this.props.size
        var height = this.props.height-150

        if(size == 's'){
            return(
                <div style={{overflow: 'auto', maxHeight: height}}>
                    {this.render_subscription_authority_target()}
                    {this.render_moderator_interactible_ui()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 0px 0px 20px', overflow: 'auto', maxHeight: height}}>
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_subscription_authority_target()}
                    </div>
                    <div className="col-6">
                        {this.render_moderator_interactible_ui()}
                    </div>
                </div>
                
            )
        }
    }

    render_subscription_authority_target(){
        return(
            <div>
                 {this.render_detail_item('3', {'title':'Access Rights', 'details':'If enabled, access to the exchange will be restricted to moderators and specified accounts', 'size':'l'})}

                <div style={{height:20}}/>
                <Tags page_tags_object={this.state.new_token_access_rights_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_access_rights_tags_object.bind(this)} theme={this.props.theme}/>
                {this.render_detail_item('0')}

                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':'Set the authority ID for your new subscription'})}
                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Enter Authority...'} when_text_input_field_changed={this.when_authority_text_input_field_changed.bind(this)} text={this.state.authority_id} theme={this.props.theme}/>

                {this.load_account_suggestions('authority_id')}
                {this.render_detail_item('0')}


                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':'Set the subscription beneficiary ID for your new subscription'})}
                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Enter Beneficiary ID...'} when_text_input_field_changed={this.when_subscription_beneficiary.bind(this)} text={this.state.subscription_beneficiary} theme={this.props.theme}/>

                {this.load_account_suggestions('subscription_beneficiary')}

                {this.render_detail_item('0')}

               
            </div>
        )
    }

    when_authority_text_input_field_changed(text){
        this.setState({authority_id: text})
    }

    when_subscription_beneficiary(text){
        this.setState({subscription_beneficiary: text})
    }

    when_new_token_access_rights_tags_object(tag_obj){
        this.setState({new_token_access_rights_tags_object: tag_obj})
    }


    render_moderator_interactible_ui(){
        return(
            <div>
                <Tags page_tags_object={this.state.new_token_interactible_moderator_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_interactible_moderator_tags_object.bind(this)} theme={this.props.theme}/>

                {this.render_moderator_or_interactible_setting()}
            </div>
        )
    }

    when_new_token_interactible_moderator_tags_object(tag_obj){
        this.setState({new_token_interactible_moderator_tags_object: tag_obj})
    }

    render_moderator_or_interactible_setting(){
        var selected_item = this.get_selected_item(this.state.new_token_interactible_moderator_tags_object, this.state.new_token_interactible_moderator_tags_object['i'].active)

        if(selected_item == 'moderators' || selected_item == 'e'){
            return(
                <div>
                    {this.render_moderator_settings()}
                </div>
            )    
        }
        else if(selected_item == 'interactible'){
            return(
                <div>
                    {this.render_interactible_settings()}
                </div>
            ) 
        }
    }


    render_moderator_settings(){
        return(
            <div>
                <div style={{height:20}}/>
                {this.render_detail_item('3', {'title':'Moderator ID', 'details':'Set the account id for your targeted moderator', 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Moderator ID'} when_text_input_field_changed={this.when_moderator_id_input_field_changed.bind(this)} text={this.state.moderator_id} theme={this.props.theme}/>

                {this.load_account_suggestions('moderator_id')}

                <div style={{height: 10}}/>
                <div style={{'padding': '5px'}} onClick={() => this.when_add_moderator_button_tapped()}>
                    {this.render_detail_item('5', {'text':'Add Moderator', 'action':''})}
                </div>

                {this.render_added_moderators()}
            </div>
        )
    }

    when_moderator_id_input_field_changed(text){
        this.setState({moderator_id: text})
    }

    when_add_moderator_button_tapped(){
        var moderator_id = this.state.moderator_id
        if(isNaN(moderator_id)){
            this.props.notify('please put a valid account id', 600)
        }
        else{
            var moderators_clone = this.state.moderators.slice()
            moderators_clone.push(parseInt(moderator_id))
            this.setState({moderators: moderators_clone});
            this.props.notify('added moderator!', 400)
        }
    }

    render_added_moderators(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = this.state.moderators

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
                                <div style={{height:140, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:40 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }else{
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>this.when_moderator_account_clicked(item)}>
                                {this.render_detail_item('3', {'title':''+item, 'details':'Account ID', 'size':'l'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_moderator_account_clicked(item){
        var cloned_array = this.state.moderators.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({moderators: cloned_array})
    }

    render_interactible_settings(){
        return(
            <div>
                <div style={{height:20}}/>
                {this.render_detail_item('3', {'title':'Interactible ID', 'details':'Set the account id for your targeted account, and expiry time for their interactibility', 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Interactible ID'} when_text_input_field_changed={this.when_interactible_id_input_field_changed.bind(this)} text={this.state.interactible_id} theme={this.props.theme}/>

                {this.load_account_suggestions('interactible_id')}

                <div style={{height:20}}/>

                <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], }, })}>
                    <CssBaseline />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_new_dat_time_value_set(newValue)}/>
                    </LocalizationProvider>
                </ThemeProvider>

                <div style={{height:20}}/>
                <div style={{'padding': '5px'}} onClick={() => this.when_add_interactible_button_tapped()}>
                    {this.render_detail_item('5', {'text':'Add Interactible Account', 'action':''})}
                </div>
                
                <div style={{height:20}}/>
                {this.render_set_interactible_accounts()}
            </div>
        )
    }

    when_interactible_id_input_field_changed(text){
        this.setState({interactible_id: text})
    }

    when_new_dat_time_value_set(value){
        const selectedDate = value instanceof Date ? value : new Date(value);
        const timeInSeconds = Math.floor(selectedDate.getTime() / 1000);
        this.setState({interactible_timestamp: timeInSeconds})
    }

    when_add_interactible_button_tapped(){
        var interactible_id = this.state.interactible_id
        if(isNaN(interactible_id)){
            this.props.notify('please put a valid account id', 600)
        }
        else{
            var interactibles_clone = this.state.interactibles.slice()
            interactibles_clone.push({'id': interactible_id, 'timestamp':this.state.interactible_timestamp})
            this.setState({interactibles: interactibles_clone});
            this.props.notify('added interactible account!', 400)
        }
    }

    render_set_interactible_accounts(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = this.state.interactibles

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
                                <div style={{height:140, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:40 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }else{
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>this.when_interactible_account_clicked(item)}>
                                {this.render_detail_item('3', {'title':'Interactible Account ID: '+item['id'], 'details':'Until: '+(new Date(item['timestamp']*1000)), 'size':'l'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_interactible_account_clicked(item){
        var cloned_array = this.state.interactibles.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({interactibles: cloned_array})
    }




    render_prices_part(){
        var size = this.props.size
        var height = this.props.height-150

        if(size == 's'){
            return(
                <div style={{overflow: 'auto', maxHeight: height}}>
                    {this.render_set_token_and_amount_part()}
                    <div style={{height: 20}}/>
                    {this.render_set_prices_list_part()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 0px 0px 20px', overflow: 'auto', maxHeight: height}}>
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_set_token_and_amount_part()}
                    </div>
                    <div className="col-6">
                        {this.render_set_prices_list_part()}
                    </div>
                </div>
                
            )
        }
    }

    render_set_token_and_amount_part(){
        return(
            <div>
                {this.render_detail_item('3', {'title':'Exchange ID', 'details':'The an exchange by its id, then the desired price and click add', 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Exchange ID'} when_text_input_field_changed={this.when_exchange_id_input_field_changed.bind(this)} text={this.state.exchange_id} theme={this.props.theme}/>

                {this.load_token_suggestions('exchange_id')}
                <div style={{height: 20}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Price', 'subtitle':this.format_power_figure(this.state.price_amount), 'barwidth':this.calculate_bar_width(this.state.price_amount), 'number':this.format_account_balance_figure(this.state.price_amount), 'barcolor':'', 'relativepower':'transactions', })}
                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_price_amount.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}

                <div style={{'padding': '5px'}} onClick={() => this.when_add_price_set()}>
                    {this.render_detail_item('5', {'text':'Add Price', 'action':''})}
                </div>
            </div>
        )
    }

    when_exchange_id_input_field_changed(text){
        this.setState({exchange_id: text})
    }

    when_price_amount(amount){
        this.setState({price_amount: amount})
    }

    when_add_price_set(){
        var exchange_id = this.state.exchange_id
        var amount = this.state.price_amount
        if(isNaN(exchange_id)){
            this.props.notify('please put a valid exchange id', 600)
        }
        else if(amount == 0){
            this.props.notify('please put a valid amount', 600)
        }
        else{
            var price_data_clone = this.state.price_data.slice()
            price_data_clone.push({'id':exchange_id, 'amount':amount})
            this.setState({price_data: price_data_clone});
            this.props.notify('added price!', 400)
        }
    }

    render_set_prices_list_part(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = this.state.price_data

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
                                <div style={{height:140, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:40 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }else{
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>this.when_amount_clicked(item)}>
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':'Exchange ID: '+item['id'], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':'tokens', })}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        
    }

    when_amount_clicked(item){
        var cloned_array = this.state.price_data.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({price_data: cloned_array})
    }






    load_token_suggestions(target_type){
        var items = this.get_suggested_tokens()
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 7px 0px', width: '97%', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 5px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                      {items.map((item, index) => (
                          <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_price_suggestion_clicked(item, index, target_type)}>
                              {this.render_detail_item('3', item['label'])}
                          </li>
                      ))}
                  </ul>
                </div>
        )
    }

    get_suggested_tokens(){
        var items = [
            {'id':'3', 'label':{'title':'END', 'details':'Account 3', 'size':'s'}},
            {'id':'5', 'label':{'title':'SPEND', 'details':'Account 5', 'size':'s'}},
        ];
        var stack_items = this.props.app_state.stack_items;
        for(var i=0; i<stack_items.length; i++){
            if(stack_items[i].type == 'token'){
                items.push({'id':'-'+i, 'label':{'title':'TOKEN', 'details':'Stack Account '+i, 'size':'s'}})
            }
        }

        return items;
    }

    when_price_suggestion_clicked(item, pos, target_type){
        this.setState({exchange_id: item['id']})
    }




    load_account_suggestions(target_type){
        var items = this.get_suggested_accounts()
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 7px 0px', width: '97%', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 5px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                      {items.map((item, index) => (
                          <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_suggestion_clicked(item, index, target_type)}>
                              {this.render_detail_item('3', item['label'])}
                          </li>
                      ))}
                  </ul>
                </div>
        )
    }

    get_suggested_accounts(){
        return[
            {'id':'53', 'label':{'title':'My Account', 'details':'Account', 'size':'s'}},
            {'id':'2', 'label':{'title':'Main Contract', 'details':'Contract ID 2', 'size':'s'}},
            {'id':'0','label':{'title':'Burn Account', 'details':'Account ID 0', 'size':'s'}},
        ]
    }

    when_suggestion_clicked(item, pos, target_type){
        if(target_type == 'authority_id'){
            this.setState({authority_id: item['id']})
        }
        else if(target_type == 'subscription_beneficiary'){
            this.setState({subscription_beneficiary: item['id']})
        }
        else if(target_type == 'moderator_id'){
            this.setState({moderator_id: item['id']})
        }
        else if(target_type == 'interactible_id'){
            this.setState({interactible_id: item['id']})
        }
    }


    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data} theme={this.props.theme} />
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
            return num + ' yr' + s;
        }
    }

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
    }


    finish_creating_object(){
        this.props.when_add_new_object_to_stack(this.state)

        this.setState({ id: makeid(32), type:'subscription', new_subscription_tags_object: this.get_new_subscription_tags_object(), authority_id:'', minimum_buy_amount:0, cancellable_tags_object:this.get_cancellable_tags_object(), maximum_buy_amount:0, minimum_cancellable_balance_amount:0, time_unit:0, subscription_beneficiary:'', new_token_access_rights_tags_object: this.get_new_token_access_rights_tags_object(), new_token_interactible_moderator_tags_object: this.get_new_token_interactible_moderator_tags_object(), moderator_id:'', moderators:[], interactible_id:'', interactible_timestamp:0, interactibles:[], exchange_id:'', price_amount:0, price_data:[], })

        this.props.notify('transaction added to stack', 700);
    }




}




export default NewSubscriptionPage;