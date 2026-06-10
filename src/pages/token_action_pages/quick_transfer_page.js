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

class QuickTransferPage extends Component {
    
    state = {
        selected: 0, new_transfers_title_tags_object:this.new_transfers_title_tags_object(), 
        price_data:[], recipient_id:'', amount:0, exchange_id:'', e5: this.props.app_state.selected_e5,
        cypher_passcode:'',
    };

    new_transfers_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['3106']/* 'quick-transfer' */], [1]
            ],
        };
    }

    render(){
        return(
            <div style={{'padding':'10px 20px 0px 10px'}}>
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.new_transfers_title_tags_object} tag_size={'l'} when_tags_updated={this.when_new_transfers_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            {this.render_finish_button_if_not_running()}
                        </div>
                    </div>
                </div>

                <div style={{'margin':'10px 0px 0px 0px'}}>
                    {this.render_everything()}   
                </div>
            </div>
        )
    }

    when_new_transfers_title_tags_object_updated(tag_obj){
        this.setState({new_transfers_title_tags_object: tag_obj})
    }

    render_finish_button_if_not_running(){
        if(this.props.app_state.is_running[this.props.app_state.selected_e5] != true){
            return(
                <div>
                    <img alt="" className="text-end" onClick={()=>this.finish()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                </div>
            )
        }
    }



    render_everything(){
        var size = this.props.app_state.size
        if(size == 's'){
            return(
                <div>
                    {this.render_select_amount_data()}
                    {this.render_detail_item('0')}
                    {this.render_select_amount_data2()}
                    {this.render_detail_item('0')}
                    {this.render_set_amounts_list_part()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_select_amount_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_select_amount_data2()}
                        {this.render_detail_item('0')}
                        {this.render_set_amounts_list_part()}
                    </div>
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_select_amount_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_select_amount_data2()}
                        {this.render_detail_item('0')}
                        {this.render_set_amounts_list_part()}
                    </div>
                </div>
            )
        }
    }

    render_select_amount_data(){
        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'15px', 'text':this.props.app_state.loc['3106a']/* 'Quickly transfer some end or spend from your account to another account.' */})}
                <div style={{height:10}}/> 

                {this.render_my_balances()}
                <div style={{height:10}}/> 

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1180']/* 'Exchange ID' */, 'details':this.props.app_state.loc['3106d']/* 'Select a token by its exchange id you wish to transfer.' */, 'size':'l'})}
                
                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1180']/* 'Exchange ID' */} when_text_input_field_changed={this.when_exchange_id_input_field_changed.bind(this)} text={this.state.exchange_id} theme={this.props.theme}/>

                {this.load_token_suggestions('exchange')}


                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3106c']/* 'Set a recipient to receive your transfer.' */, 'title':this.props.app_state.loc['3106b']/* 'Send Recipient.' */})}
                
                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1025']/* 'Recipient ID' */} when_text_input_field_changed={this.when_recipient_input_field_changed.bind(this)} text={this.state.recipient_id} theme={this.props.theme}/>
                {this.load_account_suggestions()}                
                
                

                {this.props.app_state.locked_wallet_hashed_password != '' && (
                    <div>
                        {this.render_detail_item('0')}
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['2954m']/* 'Wallet Password.' */, 'details':this.props.app_state.loc['2954n']/* 'If you locked your wallet, set the password used here.' */, 'size':'l'})}
                        <div style={{height: 10}}/>

                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3055nm']/* 'Passcode...' */} when_text_input_field_changed={this.when_passcode_input_field_changed.bind(this)} text={this.state.cypher_passcode} theme={this.props.theme} adjust_height={false} type={'password'} />
                        <div style={{height: 10}}/>
                    </div>
                )}

            </div>
        )
    }

    render_select_amount_data2(){
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3106m']/* 'Specify an amount you wish to transfer.' */, 'title':this.props.app_state.loc['3106l']/* 'Transfer Amount.' */})}
                
                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1182']/* 'Amount' */, 'number':this.state.amount, 'relativepower':this.props.app_state.loc['1183']/* 'tokens' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1182']/* 'Amount' */, 'subtitle':this.format_power_figure(this.state.amount), 'barwidth':this.calculate_bar_width(this.state.amount), 'number':this.format_account_balance_figure(this.state.amount), 'barcolor':'', 'relativepower':this.props.app_state.loc['1183']/* 'tokens' */, })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} ref={(el) => (this.amount_picker = el)} font={this.props.app_state.font} number_limit={bigInt('1e'+(this.get_power_limit_for_exchange(this.state.exchange_id)+9))} when_number_picker_value_changed={this.when_amount.bind(this)} theme={this.props.theme} power_limit={this.get_power_limit_for_exchange(this.state.exchange_id)} pick_with_text_area={true} text_area_hint={'1000'}
                />

                <div style={{'padding': '5px'}} onClick={() => this.when_add_price_set()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3106e']/* Add Transfer' */, 'action':''})}
                </div>
            </div>
        )
    }

    when_passcode_input_field_changed(text){
        if(this.props.app_state.locked_wallet_hashed_password != '') this.setState({cypher_passcode: text})
    }

    when_recipient_input_field_changed(text){
        this.setState({recipient_id: text})
    }

    when_exchange_id_input_field_changed(text){
        this.setState({exchange_id: text})   
    }

    when_amount(number){
        this.setState({amount: number})
    }

    get_power_limit_for_exchange(exchange){
        var exchange_id = this.get_token_id_from_symbol(exchange.trim())

        if(!isNaN(exchange_id) && parseInt(exchange_id) > 0 && exchange_id != '' && this.does_exchange_exist(exchange_id)){
            var target_exchange_data = this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][exchange_id]
            var default_depth = 0;
            if(target_exchange_data != null){
                target_exchange_data = target_exchange_data['ipfs']
                if(target_exchange_data != null){
                    default_depth = target_exchange_data.default_depth == null ? 0 : target_exchange_data.default_depth
                }
            }

            return (default_depth*72)+63
        }
        else{
            return 63
        }
    }

    reset_the_number_picker(){
        var me = this;
        setTimeout(function() {
            if(me.amount_picker != null){
                me.amount_picker.reset_number_picker()
            }
        }, (1 * 1000));  
    }

    get_token_id_from_symbol(typed_search){
        if(!isNaN(typed_search)){
            return typed_search
        }
        var id = this.props.app_state.token_directory[this.props.app_state.selected_e5][typed_search.toUpperCase()] == null ? typed_search : this.props.app_state.token_directory[this.props.app_state.selected_e5][typed_search.toUpperCase()]

        return id
    }

    does_exchange_exist(exchange_id){
        if(this.props.app_state.created_token_object_mapping[this.state.e5][parseInt(exchange_id)] == null){
            return false
        }
        return true
    }

    render_my_balances(){
        const end_balance = this.props.app_state.created_token_object_mapping[this.state.e5][3]['balance']
        const spend_balance = this.props.app_state.created_token_object_mapping[this.state.e5][5]['balance']
        var entry_tokens = [3, 5]
        var buy_amount_balances = [end_balance, spend_balance]
        var entry_amount_depths = [0, 0]

        for(var i=0; i<this.state.price_data.length; i++){
            var token_id = this.state.price_data[i]['id']
            if(token_id != 3 && token_id != 5){
                var token_balance = this.props.app_state.created_token_object_mapping[this.state.e5][token_id]
                token_balance = token_balance == null ? 0 : token_balance['balance']
                entry_tokens.push(token_balance)
                buy_amount_balances.push(token_balance)
                entry_amount_depths.push(0)
            }
        }
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3106g']/* How much you have avalable for your transfers. */, 'title':this.props.app_state.loc['3106f']/* 'Your balances.' */})}
                <div style={{height:10}}/>

                {this.render_buy_token_uis(entry_tokens, buy_amount_balances, entry_amount_depths)}
            </div>
        )
    }

    render_buy_token_uis(buy_tokens, buy_amounts, buy_depths){
        var bt = [].concat(buy_tokens)
        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px', 'list-style':'none'}}>
                    {bt.map((item, index) => (
                        <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'number':buy_amounts[index], 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                            {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item], 'subtitle':this.format_power_figure(buy_amounts[index]), 'barwidth':this.calculate_bar_width(buy_amounts[index]), 'number':this.format_account_balance_figure(buy_amounts[index]), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                        </li>
                    ))}
                </ul>
            </div>  
        )
    }


    async when_add_price_set(){
        var exchange_id = this.get_token_id_from_symbol(this.state.exchange_id.trim())
        var recipient = await this.get_typed_alias_id(this.state.recipient_id.toString().trim())
        var amount = this.state.amount
        // const includes = this.state.price_data.find(e => e['id'] == exchange_id)
        
        if(isNaN(exchange_id) || parseInt(exchange_id) < 0 || exchange_id == '' || !this.does_exchange_exist(exchange_id)){
            this.props.notify(this.props.app_state.loc['1185']/* 'Please put a valid exchange ID.' */, 3600)
        }
        else if(isNaN(recipient) || parseInt(recipient) < 0 || recipient == ''){
            this.props.notify(this.props.app_state.loc['1030']/* 'Please put a valid account ID.' */, 2600)
        }
        else if(amount == 0){
            this.props.notify(this.props.app_state.loc['1186']/* 'Please put a valid amount.' */, 3600)
        }
        else if(this.state.price_data.length == 23){
            this.props.notify(this.props.app_state.loc['3106o']/* 'You cant make more than 35 multi-transfers here.' */, 5600)
        }
        else{
            var price_data_clone = this.state.price_data.slice()
            price_data_clone.push({'id':exchange_id, 'amount':amount, 'recipient': recipient})
            this.setState({price_data: price_data_clone, exchange_id:'', amount:0, recipient_id:''});
            this.props.notify(this.props.app_state.loc['1187']/* 'Added amount.' */, 1400)
            this.reset_the_number_picker()
        }
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




    render_set_amounts_list_part(){
        var middle = this.props.height-300;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.price_data)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{}}>
                        {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3106k']/* 'The actions youve set for your quick transfer run.' */, 'title':this.props.app_state.loc['3106j']/* 'Set Transfers.' */})}
                        <div style={{height:10}}/>

                        <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img alt="" src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
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
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3106k']/* 'The actions youve set for your quick transfer run.' */, 'title':this.props.app_state.loc['3106j']/* 'Set Transfers.' */})}
                    <div style={{height:10}}/>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.reverse().map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_amount_clicked(item)
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
        const title = item['amount'] + ' '+ this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]
        const alias = this.get_account_alias2(item['recipient']) 
        const details = this.props.app_state.loc['3106n']/* 'To $' */.replace('$', (item['recipient'] + (alias == '' ? '' : ' • '+ alias))) 
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':details, 'title':title})}
            </div>
        )
    }

    get_account_alias2(account_id){
        const alias = this.props.app_state.alias_bucket[this.state.e5][account_id]
        if(alias == null) return '';
        else return alias;
    }

    when_amount_clicked(item){
        var cloned_array = this.state.price_data.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({price_data: cloned_array})
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
        var memory_accounts = this.get_recipients_from_memory()
        var defaults = []
        memory_accounts.forEach(account => {
            defaults.push({'id':account,'label':{'title':account, 'details':this.get_account_alias(account), 'size':'s'}})
        });
        return this.get_account_suggestions().concat(defaults)
    }

    get_account_suggestions(){
        var contacts = this.props.app_state.contacts[this.state.e5]
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
        const e5 = this.state.e5
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

    get_account_alias(account){
        var obj = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
        return obj[account] == null ? this.props.app_state.loc['1037a']/* 'Account' */: obj[account]
    }

    when_suggestion_clicked(item, pos){
        this.setState({recipient_id: item['id']})
    }





    load_token_suggestions(target_type){
        var items = [].concat(this.get_suggested_tokens())
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 7px 0px', width: '97%', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 5px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                      {items.map((item, index) => (
                          <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_price_suggestion_clicked(item, index, target_type)}>
                              {this.render_detail_item('14', item['label'])}
                          </li>
                      ))}
                  </ul>
                </div>
        )
    }

    get_suggested_tokens(){
        var items = [
            {'id':'3', 'label':{'title':this.props.app_state.loc['3078']/* END */, 'details':this.props.app_state.selected_e5, 'size':'s', 'image':this.props.app_state.e5s[this.props.app_state.selected_e5].end_image, 'img_size':30}},
            {'id':'5', 'label':{'title':this.props.app_state.loc['3079']/* SPEND */, 'details':this.props.app_state.selected_e5.replace('E', '3'), 'size':'s', 'image':this.props.app_state.e5s[this.props.app_state.selected_e5].spend_image, 'img_size':30}},
        ];
        var exchanges_from_sync = this.props.app_state.created_tokens[this.props.app_state.selected_e5]
        var sorted_token_exchange_data = []
        // var myid = this.props.app_state.user_account_id
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

        for (let i = 0; i < sorted_token_exchange_data.length; i++) {
            items.push({'id':sorted_token_exchange_data[i]['id'], 'label':{'title':sorted_token_exchange_data[i]['ipfs'].entered_symbol_text, 'details':sorted_token_exchange_data[i]['ipfs'].entered_title_text, 'size':'s', 'image':(sorted_token_exchange_data[i]['ipfs'].token_image == null ? (sorted_token_exchange_data[i]['data'][0][3/* <3>token_type */] == 3 ? this.props.app_state.static_assets['end_img']:this.props.app_state.static_assets['spend_img']) : sorted_token_exchange_data[i]['ipfs'].token_image), 'img_size':30}})
        }

        return items;
    }

    when_price_suggestion_clicked(item, pos){
        this.setState({exchange_id: item['id'].toString()})
        this.reset_the_number_picker()
    }






    set_recipients_data = async () => {
        var recipients_data = await this.props.get_local_storage_data_if_enabled("transfer_data");
        if(recipients_data != null && recipients_data != ""){
            this.setState({recipients_data: recipients_data['data']})
        }
    }

    componentDidMount(){
        this.set_recipients_data()
    }

    get_recipients_from_memory(){
        const recipients_data = this.state.recipients_data;
        if(recipients_data != null){
            const data = JSON.parse(recipients_data)['data']
            if(data != null) return data;
            else return []
        }
        else return []
    }

    add_recipients_to_memory(stack_items){
        var recipient_acc_ids = this.state.recipients_data || []
        stack_items.forEach(item => {
            var recipient = item['recipient']
            if(!recipient_acc_ids.includes(recipient)) recipient_acc_ids.push(recipient);
        });

        var trimmed = recipient_acc_ids.slice(-7)
        var obj = {'data':trimmed}
        this.props.set_local_storage_data_if_enabled("transfer_data", JSON.stringify(obj));
    }








    finish(){
        const price_data = this.state.price_data
        
        if(price_data.length == 0){
            this.props.notify(this.props.app_state.loc['3106h']/* 'You havent set any transfers.' */, 5600)
        }
        else if(!this.check_if_sender_has_enough_balance_for_awards()){
            this.props.notify(this.props.app_state.loc['3106h']/* 'You havent set any transfers.' */, 5600)
        }
        else if(this.props.app_state.locked_wallet_hashed_password != '' && this.state.cypher_passcode.trim() == ''){
            this.props.notify(this.props.app_state.loc['1593mg']/* 'You need to set your password.' */, 4000)
        }
        else if(this.props.app_state.locked_wallet_hashed_password != '' && !this.does_password_match_hash(this.state.cypher_passcode.trim())){
            this.props.notify(this.props.app_state.loc['2954o']/* 'The password you\'ve set is incorrect.' */, 4000)
        }
        else{

            this.props.show_dialog_bottomsheet({'price_data':price_data}, 'confirm_quick_transfer_data')
            // this.add_recipients_to_memory(price_data)
            // this.props.start_quick_transfers(price_data)
        }
    }

    check_if_sender_has_enough_balance_for_awards(){
        var has_enough = true
        var price_data = this.state.price_data
        for(var i=0; i<price_data.length; i++){
            var bounty_item_exchange = price_data[i]['id']
            var bounty_item_amount = price_data[i]['amount']
            var my_balance = this.props.calculate_actual_balance(this.props.app_state.selected_e5, bounty_item_exchange)
            if(bigInt(my_balance).lesser(bigInt(bounty_item_amount))){
                has_enough = false
            }
        }
        return has_enough
    }

    does_password_match_hash(passcode){
        if(this.props.app_state.locked_wallet_hashed_password != ''){
            const provided_hash = this.props.hash_data_with_randomizer(passcode);
            return provided_hash == this.props.app_state.locked_wallet_hashed_password
        }
        else return true
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




export default QuickTransferPage;