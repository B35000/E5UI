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

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

// import Letter from '../../assets/letter.png';

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

function start_and_end(str) {
  if (str.length > 13) {
    return str.substr(0, 6) + '...' + str.substr(str.length-6, str.length);
  }
  return str;
}

class ExchangeTransferPage extends Component {
    
    state = {
        selected: 0,id: makeid(8), type:this.props.app_state.loc['907']/* 'exchange-transfer' */, entered_indexing_tags:[this.props.app_state.loc['908']/* 'exchange' */, this.props.app_state.loc['909']/* 'transfer' */],
        token_item: {'data':[[],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],]},
        new_transfer_title_tags_object:this.get_new_transfer_title_tags_object(),

        exchange_transfer_target:'', exchange_transfer_amount:0, exchange_transfer_values:[], exchange_transfer_receiver:'', token_target:'',

        new_exchange_or_certificate_target_title_tags_object:this.new_exchange_or_certificate_target_title_tags_object(), typed_search_fractionalized_tokens:'', proportion_amount:0,
    };


    get_new_transfer_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['907']/* 'exchange-transfer' */], [1]
            ],
        };
    }

    new_exchange_or_certificate_target_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['e311h']/* 'exchange' */, this.props.app_state.loc['3103d']/* 'certificate' */], [1]
            ],
        };
    }




    render(){
        return(
            <div style={{'padding':'10px 20px 0px 10px'}}>
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.new_transfer_title_tags_object} tag_size={'l'} when_tags_updated={this.when_new_transfer_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img className="text-end" onClick={()=>this.finish()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div>

                <div style={{'margin':'10px 0px 0px 0px'}}>
                    {this.render_everything()}   
                </div>
                
            </div>
        )
    }

    when_new_transfer_title_tags_object_updated(tag_obj){
        this.setState({new_transfer_title_tags_object: tag_obj})
    }

    render_everything(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_transfer_data_pickers()}
                    {this.render_detail_item('0')}
                    {this.load_transfer_actions()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_transfer_data_pickers()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.load_transfer_actions()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_transfer_data_pickers()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.load_transfer_actions()}
                    </div>
                </div>
                
            )
        }
    }



    render_transfer_data_pickers(){
        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'13px', 'text':this.props.app_state.loc['910']/* 'Run an exchange transfer for : ' */+this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+this.state.token_item['id']]})}
                <div style={{height:20}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['929b']/* 'Withdraw Target.' */, 'details':this.props.app_state.loc['929c']/* 'You may specify which transfer type you are dealing with, a normal token or a certificate.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.new_exchange_or_certificate_target_title_tags_object} tag_size={'l'} when_tags_updated={this.when_new_exchange_or_certificate_target_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>

                {this.render_transfer_token_or_certificate_pickers()} 
            </div>
        )
    }

    when_new_exchange_or_certificate_target_title_tags_object_updated(tag_obj){
        this.setState({new_exchange_or_certificate_target_title_tags_object: tag_obj})
    }

    render_transfer_token_or_certificate_pickers(){
        const selected_item = this.get_selected_item(this.state.new_exchange_or_certificate_target_title_tags_object, 'e')

        if(selected_item == this.props.app_state.loc['e311h']/* 'exchange' */){
            return this.render_exchange_target_picker()
        }
        else if(selected_item == this.props.app_state.loc['3103d']/* 'certificate' */){
            return this.render_certificate_target_picker()
        }
    }



    render_exchange_target_picker(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['911']/* 'Target Receiver' */, 'details':this.props.app_state.loc['912']/* 'Set the account set to receive the token amounts' */, 'size':'l'})}
                <div style={{height:20}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['913']/* 'Target Receiver...' */} when_text_input_field_changed={this.when_exchange_transfer_receiver_text_input_field_changed.bind(this)} text={this.state.exchange_transfer_receiver} theme={this.props.theme}/>

                {this.load_account_suggestions('exchange_transfer_receiver')}
                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['914']/* 'Token Targets' */, 'details':this.props.app_state.loc['915']/* 'Set the targeted token ID your transfering from the exchange' */, 'size':'l'})}
                <div style={{height:20}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['916']/* 'Token Target ID...' */} when_text_input_field_changed={this.when_token_target_text_input_field_changed.bind(this)} text={this.state.token_target} theme={this.props.theme}/>

                {this.load_account_suggestions('token_target')}
                {this.render_detail_item('0')}


                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['917']/* 'Targeted Amount' */, 'number':this.state.exchange_transfer_amount, 'relativepower':this.props.app_state.loc['918']/* 'units' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['917']/* 'Targeted Amount' */, 'subtitle':this.format_power_figure(this.state.exchange_transfer_amount), 'barwidth':this.calculate_bar_width(this.state.exchange_transfer_amount), 'number':this.format_account_balance_figure(this.state.exchange_transfer_amount), 'barcolor':'', 'relativepower':this.props.app_state.loc['918']/* 'units' */, })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_exchange_transfer_amount_changed.bind(this)} theme={this.props.theme} power_limit={63}/>

                <div style={{height:20}}/>
                <div style={{'padding': '5px'}} onClick={()=>this.add_exchange_transfer_item()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['919']/* 'Add Transfer Action' */, 'action':''})}
                </div>

            </div>
        )
    }

    render_certificate_target_picker(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['911']/* 'Target Receiver' */, 'details':this.props.app_state.loc['912']/* 'Set the account set to receive the token amounts' */, 'size':'l'})}
                <div style={{height:20}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['913']/* 'Target Receiver...' */} when_text_input_field_changed={this.when_exchange_transfer_receiver_text_input_field_changed.bind(this)} text={this.state.exchange_transfer_receiver} theme={this.props.theme}/>

                {this.load_account_suggestions('exchange_transfer_receiver')}
                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['e311k']/* 'Certificate Target' */, 'details':this.props.app_state.loc['3094l']/* 'Select the certificate you wish to be the target for the exchange deposit.' */, 'size':'l'})}
                {this.render_detail_item('10', {'font':this.props.app_state.font, 'textsize':'12px', 'text':this.props.app_state.loc['3103h']/* 'Only fractionalized certificates will show here.' */})}

                <div style={{margin:'5px 10px 0px 10px'}}>
                    <TextInput font={this.props.app_state.font} height={20} placeholder={this.props.app_state.loc['3098v']/* 'Search a certificate...' */} when_text_input_field_changed={this.when_typed_search_fractionalized_tokens_text_input_field_changed.bind(this)} text={this.state.typed_search_fractionalized_tokens} theme={this.props.theme}/>
                </div>
                <div style={{height:10}}/>
                {this.load_certificates()}


                {this.render_detail_item('0')}
                                
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['929d']/* 'Set the amount of stake you wish to transfer out of the exchange.' */, 'title':this.props.app_state.loc['929e']/* 'Transfer Amount' */})}
                                
                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.format_proportion(this.state.proportion_amount), 'details':this.props.app_state.loc['929f']/* 'Fractionalized Proportion to be Transferred.' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_proportion_amount_proportion.bind(this)} power_limit={9} theme={this.props.theme} decimal_count={16} pick_with_text_area={true} text_area_hint={'5.3%'}/>


                <div style={{height:20}}/>
                <div style={{'padding': '5px'}} onClick={()=>this.add_exchange_certificate_transfer_item()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['919']/* 'Add Transfer Action' */, 'action':''})}
                </div>
            </div>
        )
    }

    when_typed_search_fractionalized_tokens_text_input_field_changed(text){
        this.setState({typed_search_fractionalized_tokens: text})
    }

    when_proportion_amount_proportion(number){
        this.setState({proportion_amount: number})
    }



    when_exchange_transfer_target_text_input_field_changed(text){
        this.setState({exchange_transfer_target: text})
    }

    when_exchange_transfer_amount_changed(amount){
        this.setState({exchange_transfer_amount:amount})
    }

    when_exchange_transfer_receiver_text_input_field_changed(text){
        this.setState({exchange_transfer_receiver: text})
    }

    when_token_target_text_input_field_changed(text){
        this.setState({token_target: text})
    }


    async get_typed_alias_id(alias){
        if(!isNaN(alias)){
            return alias
        }
        await this.props.get_account_id_from_alias(alias)
        var id = (this.props.app_state.alias_owners[this.state.token_item['e5']][alias] == null ? 
            alias : this.props.app_state.alias_owners[this.state.token_item['e5']][alias])

        return id
    }


    async add_exchange_transfer_item(){
        var target_exchange = this.get_token_id_from_symbol(this.state.token_item['id'])
        var target_amount = this.state.exchange_transfer_amount
        var target_receiver = await this.get_typed_alias_id(this.state.exchange_transfer_receiver.trim())
        var targeted_token = this.state.token_target.trim()

        if(isNaN(target_receiver) || parseInt(target_receiver) < 0 || target_receiver == ''){
            this.props.notify(this.props.app_state.loc['920']/* 'Please put a valid receiver ID.' */, 2600)
        }
        else if(isNaN(targeted_token) || parseInt(targeted_token) < 0 || targeted_token == '' || !this.does_exchange_exist(targeted_token)){
            this.props.notify(this.props.app_state.loc['921']/* 'Please put a valid token ID.' */, 2600)
        }
        else if(target_amount == 0){
            this.props.notify(this.props.app_state.loc['922']/* 'Please put a valid amount.' */, 2600)
        }
        else{
            var exchange_transfer_values_clone = this.state.exchange_transfer_values.slice()
            var tx = {
                'exchange':target_exchange, 
                'amount':target_amount, 
                'receiver':target_receiver, 
                'token':targeted_token
            }
            exchange_transfer_values_clone.push(tx)
            this.setState({
                exchange_transfer_values: exchange_transfer_values_clone, 
                exchange_transfer_target:'', 
                exchange_transfer_amount:0, 
                exchange_transfer_receiver:'', 
                token_target:'',
                targeted_token: null,
                proportion_amount:0
            })

            this.props.notify(this.props.app_state.loc['923']/* 'transfer action added' */, 1600)
        }
    }

    async add_exchange_certificate_transfer_item(){
        var target_exchange = this.get_token_id_from_symbol(this.state.token_item['id'])
        var target_amount = this.state.proportion_amount
        var target_receiver = await this.get_typed_alias_id(this.state.exchange_transfer_receiver.trim())
        var targeted_token = this.state.selected_certificate

        if(isNaN(target_receiver) || parseInt(target_receiver) < 0 || target_receiver == ''){
            this.props.notify(this.props.app_state.loc['920']/* 'Please put a valid receiver ID.' */, 2600)
        }
        else if(targeted_token == null){
            this.props.notify(this.props.app_state.loc['929g']/* 'Please select a valid certificate.' */, 4600)
        }
        else if(target_amount == 0){
            this.props.notify(this.props.app_state.loc['922']/* 'Please put a valid amount.' */, 5600)
        }
        else{
            var exchange_transfer_values_clone = this.state.exchange_transfer_values.slice()
            var tx = {
                'exchange':target_exchange, 
                'amount':target_amount, 
                'receiver':target_receiver, 
                'token':targeted_token['id']
            }
            const model_data = targeted_token['ipfs']['model_data']
            const class_name = model_data['class_name']
            const time = targeted_token['ipfs']['depth_item']['time']
            const footer = this.props.app_state.loc['3098y']/* 'Minted on $' */.replace('$', (new Date(time * 1000).toLocaleString()))
            tx['label'] = {'title':start_and_end(class_name), 'details':this.format_proportion(target_amount)+', '+this.props.app_state.loc['924']/* 'Receiver ID: ' */+target_receiver, 'footer':footer, 'size':'l'}

            exchange_transfer_values_clone.push(tx)

            this.setState({
                exchange_transfer_values: exchange_transfer_values_clone, 
                exchange_transfer_target:'', 
                exchange_transfer_amount:0, 
                exchange_transfer_receiver:'', 
                token_target:'',
                targeted_token: null,
                proportion_amount:0
            })

            this.props.notify(this.props.app_state.loc['923']/* 'transfer action added' */, 1600)
        }
    }

    

    does_exchange_exist(exchange_id){
        if(this.props.app_state.created_token_object_mapping[this.state.token_item['e5']][parseInt(exchange_id)] == null){
            return false
        }
        return true
    }

    get_token_id_from_symbol(typed_search){
        if(!isNaN(typed_search)){
            return typed_search
        }
        var id = this.props.app_state.token_directory[this.state.token_item['e5']][typed_search.toUpperCase()] == null ? typed_search : this.props.app_state.token_directory[this.state.token_item['e5']][typed_search.toUpperCase()]

        return id
    }






    load_transfer_actions(){
        var items = [].concat(this.state.exchange_transfer_values)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
                                <div style={{height:140, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 20px 0px 0px'}}>
                                        <img src={this.props.app_state.theme['letter']} style={{height:40 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.reverse().map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_transfer_action_value_clicked(item)
                                    }}>
                                    <div style={{width:'100%', /* 'background-color':this.props.theme['send_receive_ether_background_color'] */}}>
                                        <li style={{'padding': '5px'}}>
                                            {this.render_transfer_item(item)}
                                        </li>
                                    </div>
                                </SwipeableListItem>
                            </SwipeableList>
                            
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_transfer_item(item){
        if(item['label'] != null){
            return(
                <div>
                    {this.render_detail_item('3', item['label'])}
                </div>
            )
        }else{
            const title = this.format_account_balance_figure(item['amount'])+' '+ this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['token']]
            return(
                <div>
                    {this.render_detail_item('3', {'title':title, 'details':this.props.app_state.loc['924']/* 'Receiver ID: ' */+item['receiver'], 'size':'l'})}
                </div>
            )
        }
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

    when_transfer_action_value_clicked(item){
        var cloned_array = this.state.exchange_transfer_values.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({exchange_transfer_values: cloned_array})
        this.props.notify(this.props.app_state.loc['925']/* 'transfer action removed!' */, 1600)
    }








    load_account_suggestions(type){
        var items = [].concat(this.get_suggested_accounts(type))
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_suggestion_clicked(item, index, type)}>
                            {this.render_detail_item((type == 'token_target' ? '8':'3'), item['label'])}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_suggested_accounts(type){
        if(type == 'exchange_transfer_target'){
            return[
                {'id':'3', 'label':{'title':this.props.app_state.loc['926']/* 'End Token' */, 'details':this.props.app_state.loc['928']/* 'Exchange ID 3' */, 'size':'s'}},
                {'id':'5', 'label':{'title':this.props.app_state.loc['927']/* 'Spend Token' */, 'details':this.props.app_state.loc['929']/* 'Exchange ID 5' */, 'size':'s'}},
            ]
        }
        else if(type == 'exchange_transfer_receiver'){
            return[
                {'id':'53', 'label':{'title':this.props.app_state.loc['854']/* 'My Account' */, 'details':this.props.app_state.loc['857']/* 'Account' */, 'size':'s'}},
                {'id':'2', 'label':{'title':this.props.app_state.loc['855']/* 'Main Contract' */, 'details':this.props.app_state.loc['858']/* 'Contract ID 2' */, 'size':'s'}},
                {'id':'0','label':{'title':this.props.app_state.loc['856']/* 'Burn Account' */, 'details':this.props.app_state.loc['859']/* 'Account ID 0' */, 'size':'s'}},
            ].concat(this.get_account_suggestions())
        }
        else if(type == 'token_target'){
            var exchange_object = this.state.token_item
            var buy_exchanges = exchange_object['data'][3].slice()
            var targets = []
            var name_directory = this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)
            var symbol_directory = this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)
            
            if(exchange_object['data'][2][18/* <18>classic_swap_exchange_parent_token */] != null && exchange_object['data'][2][18/* <18>classic_swap_exchange_parent_token */] != 0 && symbol_directory[exchange_object['data'][2][18/* <18>classic_swap_exchange_parent_token */]] != null){
                buy_exchanges.push(exchange_object['data'][2][18/* <18>classic_swap_exchange_parent_token */])
            }
            buy_exchanges.forEach(exchange_id => {
                var title = name_directory[this.state.e5+exchange_id]
                var details = symbol_directory[exchange_id]
                const thumbnail = this.props.app_state.token_thumbnail_directory[this.state.e5][exchange_id]
                targets.push({'id':exchange_id+'', 'label':{'title':title, 'details':details, 'image':thumbnail, 'size':'s'}})
            });
            return targets;

            // return[
            //     {'id':'3', 'label':{'title':this.props.app_state.loc['926']/* 'End Token' */, 'details':this.props.app_state.loc['928']/* 'Exchange ID 3' */, 'size':'s'}},
            //     {'id':'5', 'label':{'title':this.props.app_state.loc['927']/* 'Spend Token' */, 'details':this.props.app_state.loc['929']/* 'Exchange ID 5' */, 'size':'s'}},
            // ]
        }
        
    }

    get_account_suggestions(){
        var contacts = this.props.app_state.contacts[this.state.token_item['e5']]
        if(contacts == null) contacts = [];
        var return_array = []
        contacts.forEach(contact => {
            if(contact['id'].toString().includes(this.state.exchange_transfer_receiver)){
                return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
            }
        });
        return_array = this.filter_and_add_other_accounts(this.state.exchange_transfer_receiver, return_array)
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
        // const e5s = Object.keys(this.props.app_state.alias_bucket)
        // e5s.forEach(e5 => {
        //     const accounts = Object.keys(this.props.app_state.alias_bucket[e5])
        //     accounts.forEach(account_id => {
        //         const alias = this.props.app_state.alias_bucket[e5][account_id]
        //         if(!added_aliases.includes(alias) && alias.startsWith(typed_name.toLowerCase())){
        //             aliases.push({'id':account_id,'label':{'title':account_id, 'details':alias, 'size':'s'}})
        //         }
        //     });
        // });
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

    when_suggestion_clicked(item, pos, type){
        if(type == 'exchange_transfer_target'){
            this.setState({exchange_transfer_target: item['id']})
        }
        else if(type == 'exchange_transfer_receiver'){
            this.setState({exchange_transfer_receiver: item['id']})
        }
        else if(type == 'token_target'){
            this.setState({token_target: item['id']})
        }
    }






    load_certificates(){
        const unfiltered_items = [].concat(this.get_suggested_certificates())
        const items = unfiltered_items.filter((render_item) => {
            const t = this.state.typed_search_fractionalized_tokens.trim().toLowerCase()
            const item = render_item['object']
            const depth_data = item['ipfs']['depth_item']['depth_data']
            const model_config = item['ipfs']['model_data']
            const class_name = model_config['class_name']
            const ipfs = item['ipfs']['depth_item']['ipfs']
            const markdown = ipfs['markdown']
            const class_markdown = model_config['class_markdown']
            return (
                t == '' ||
                class_name.toLowerCase().startsWith(t) ||
                markdown.toLowerCase().includes(t) ||
                class_markdown.toLowerCase().includes(t)
            )
        })
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_suggestion_clicked(item, index)}>
                            {this.render_detail_item('3', item['label'])}
                            {this.show_line_if_selected(item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    show_line_if_selected(item){
        if(item['object']['e5_id'] == this.state.selected_certificate_target){
            return(
                <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
            )
        }
    }

    get_suggested_certificates(){
        const certificate_ids = Object.keys(this.props.app_state.fractionalized_assets)
        const exchanges_from_sync = []
        certificate_ids.forEach(certificate_id => {
            const exchange_ids = Object.keys(this.props.app_state.fractionalized_assets[certificate_id])
            exchange_ids.forEach(exchange_id => {
                exchanges_from_sync.push(this.props.app_state.fractionalized_assets[certificate_id][exchange_id])
            });
        });
        var sorted_token_exchange_data = []
        for (let i = 0; i < exchanges_from_sync.length; i++) {
            var exchange_e5 = exchanges_from_sync[i]['e5']
            var myid = this.props.app_state.user_account_id[exchange_e5]

            var author_account = exchanges_from_sync[i]['event'] == null ? '':exchanges_from_sync[i]['event'].returnValues.p3.toString() 
            if(author_account == myid.toString()){
                sorted_token_exchange_data.push(exchanges_from_sync[i])
            }
        }
        sorted_token_exchange_data.reverse()
        for (let i = 0; i < exchanges_from_sync.length; i++) {
            if(!sorted_token_exchange_data.includes(exchanges_from_sync[i]) && exchanges_from_sync[i]['balance'] != 0 && exchanges_from_sync[i]['event'] != null){
                sorted_token_exchange_data.push(exchanges_from_sync[i])
            }
        }
        const items = []
        for (let i = 0; i < sorted_token_exchange_data.length; i++) {
            const object = sorted_token_exchange_data[i]
            const model_data = object['ipfs']['model_data']
            const class_name = model_data['class_name']
            const time = object['ipfs']['depth_item']['time']
            const footer = this.props.app_state.loc['3098y']/* 'Minted on $' */.replace('$', (new Date(time * 1000).toLocaleString()))
            items.push({'object':object, 'label':{'title':start_and_end(class_name), 'details':this.format_proportion(object['balance']), 'footer':footer, 'size':'l'}})
        }
        return items;
    }

    when_suggestion_clicked(item, index){
        this.setState({selected_certificate_target: item['object']['e5_id'], selected_certificate: item['object']})
    }








    set_token(token_item){
        if(this.state.token_item['id'] != token_item['id']){
            this.setState({
                selected: 0,id: makeid(8), type:this.props.app_state.loc['907']/* 'exchange-transfer' */, entered_indexing_tags:[this.props.app_state.loc['908']/* 'exchange' */, this.props.app_state.loc['909']/* 'transfer' */],
                token_item: {'data':[[],[0,0,0,0,0,0,0,0,0,0]]},
                new_transfer_title_tags_object:this.get_new_transfer_title_tags_object(),
                exchange_transfer_target:'', exchange_transfer_amount:0, exchange_transfer_values:[], exchange_transfer_receiver:'', token_target:'',
            })
        }
        this.setState({token_item: token_item, e5: token_item['e5']})
    }

    finish(){
        if(this.state.exchange_transfer_values.length == 0){
            this.props.notify(this.props.app_state.loc['897']/* 'you cant stack no changes' */, 3700)
        }
        else if(this.has_transfer_amounts_exceeded_balance()){
            this.props.notify(this.props.app_state.loc['929a']/* 'The amounts youve set exceed the exchanges balance.' */, 5700)
        }
        else{
            this.props.add_exchange_transfer_to_stack(this.state)
            this.setState({exchange_transfer_values:[]})
            this.props.notify(this.props.app_state.loc['18']/* 'transaction added to stack' */, 1700);
        }
    }

    has_transfer_amounts_exceeded_balance(){
        var token_id = this.state.token_item['id']
        var exchange_transfer_values = this.state.exchange_transfer_values
        var debit_object = {}
        var exchanges_targeted = []
        exchange_transfer_values.forEach(transfer => {
            if(debit_object[transfer['token']] == null){
                debit_object[transfer['token']] = 0
                exchanges_targeted.push(transfer['token'])
            }
            debit_object[transfer['token']] = bigInt(debit_object[transfer['token']]).plus(bigInt(transfer['amount']))
        });

        //load all the exchange transfer actions from the stack
        var txs = this.props.app_state.stack_items
        for(var i=0; i<txs.length; i++){
            var t = txs[i]
            if(txs[i].type == this.props.app_state.loc['907']/* 'exchange-transfer' */){
                if(txs[i].token_item['id'] == token_id){
                    var tx_exchange_transfer_values = t.exchange_transfer_values
                    
                    tx_exchange_transfer_values.forEach(transfer => {
                    if(debit_object[transfer['token']] == null){
                        debit_object[transfer['token']] = 0
                        exchanges_targeted.push(transfer['token'])
                    }
                    debit_object[transfer['token']] = bigInt(debit_object[transfer['token']]).plus(bigInt(transfer['amount']))
                });
                }
            }
        }

        var selected_object = this.state.token_item
        var buy_tokens = [].concat(selected_object['data'][3])
        var buy_amounts = [].concat(selected_object['exchanges_balances'])
        var balance_obj = {}
        for(var i=0; i<buy_tokens.length; i++){
            balance_obj[''+buy_tokens[i]] = buy_amounts[i]
        }

        console.log('balance_obj: ', balance_obj)
        var has_exceeded = false
        exchanges_targeted.forEach(exchange => {
            console.log('debit_object ',exchange, debit_object[exchange])
            console.log('balance_obj ',exchange, balance_obj[exchange])
            if(bigInt(debit_object[exchange]).greater(bigInt(balance_obj[exchange]))){
                has_exceeded = true
            }
        });

        return has_exceeded
    }


    







    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }

    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
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




export default ExchangeTransferPage;