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

class AuthMintPage extends Component {
    
    state = {
        selected: 0,id:makeid(8), type: this.props.app_state.loc['880']/* 'authmint' */, entered_indexing_tags:[this.props.app_state.loc['881']/* 'auth' */, this.props.app_state.loc['882']/* 'mint' */, this.props.app_state.loc['883']/* 'token' */], token_item: {'balance':1, 'data':[[],[],[],[],[]], 'id':0}, new_authmint_action_page_tags_object: this.get_new_authmint_action_page_tags_object(),

        recipient_id:'', amount:0, authmint_actions:[]
    };


    get_new_authmint_action_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['880']/* 'authmint' */], [1]
            ],
        };
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.new_authmint_action_page_tags_object} tag_size={'l'} when_tags_updated={this.when_new_authmint_action_page_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img className="text-end" onClick={()=>this.finish()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div>
                
                {this.render_everything()}

            </div>
        )
    }

    when_new_authmint_action_page_tags_object_updated(tag_obj){
        this.setState({new_authmint_action_page_tags_object: tag_obj})
    }

    render_everything(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_amount_pickers()}
                    {this.render_authmint_transactions()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_amount_pickers()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_authmint_transactions()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_amount_pickers()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_authmint_transactions()}
                    </div>
                </div>
                
            )
        }
    }

    render_amount_pickers(){
        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'15px', 'text':this.props.app_state.loc['884']/* 'Auth-Mint your token ' */+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']]+this.props.app_state.loc['885']/* ' for a specified target' */})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['886']/* 'Set the recipient of the authmint action' */, 'title':this.props.app_state.loc['888']/* 'Recipient' */})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['887']/* 'Account ID' */} when_text_input_field_changed={this.when_recipient_input_field_changed.bind(this)} text={this.state.recipient_id} theme={this.props.theme}/>

                {this.load_account_suggestions()}

                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['889']/* 'Set the amount to authmint' */, 'title':this.props.app_state.loc['890']/* 'Action Amount.' */})}

                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['891']/* 'Transfer Amount' */, 'number':this.state.amount, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']]})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['891']/* 'Transfer Amount' */, 'subtitle':this.format_power_figure(this.state.amount), 'barwidth':this.calculate_bar_width(this.state.amount), 'number':this.format_account_balance_figure(this.state.amount), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']], })}
                </div>

                <div style={{height:10}}/>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_amount_set.bind(this)} theme={this.props.theme} power_limit={63}/>

                <div style={{'padding': '5px'}} onClick={()=>this.add_transaction()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['892']/* 'Add Action' */, 'action':''})}
                </div>

                
            </div>
        )
    }

    when_recipient_input_field_changed(text){
        this.setState({recipient_id: text})
    }

    when_amount_set(amount){
        this.setState({amount: amount})
    }


    add_transaction(){
        var clone = this.state.authmint_actions.slice()
        var amount = this.state.amount
        var recipient = this.get_typed_alias_id(this.state.recipient_id.trim())

        if(isNaN(recipient) || parseInt(recipient) < 0 || recipient == ''){
            this.props.notify(this.props.app_state.loc['893']/* 'Please put a valid account ID.' */, 600)
        }
        else if(amount == 0){
            this.props.notify(this.props.app_state.loc['893a']/* 'Please put a valid amount.' */, 600)
        }
        else{
            var tx = {'amount':amount, 'recipient':recipient}
            clone.push(tx)
            this.setState({authmint_actions: clone, recipient_id: '', amount:0})
            this.props.notify(this.props.app_state.loc['894']/* 'auth-mint action added!' */, 600)
        }
    }

    get_typed_alias_id(alias){
        if(!isNaN(alias)){
            return alias
        }
        var id = (this.props.app_state.alias_owners[this.state.token_item['e5']][alias] == null ? 
            alias : this.props.app_state.alias_owners[this.state.token_item['e5']][alias])

        return id
    }




    render_authmint_transactions(){
        var items = [].concat(this.state.authmint_actions)

        if(items.length == 0){
            items = [0, 1]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 10px 0px'}}>
                                        <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
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
                                    action: () =>this.when_item_clicked(item)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '5px'}}>
                                            {this.render_detail_item('3', {'title':this.format_account_balance_figure(item['amount']) + ' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']], 'details':this.props.app_state.loc['895']/* 'Target Recipient ID: ' */+item['recipient'], 'size':'s'})}
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


    when_item_clicked(item){
        var cloned_array = this.state.authmint_actions.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({authmint_actions: cloned_array})
        this.props.notify(this.props.app_state.loc['896']/* 'action removed!' */, 600)
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
        return[
            {'id':'53', 'label':{'title':this.props.app_state.loc['854']/* 'My Account' */, 'details':this.props.app_state.loc['857']/* 'Account' */, 'size':'s'}},
            {'id':'2', 'label':{'title':this.props.app_state.loc['855']/* 'Main Contract' */, 'details':this.props.app_state.loc['858']/* 'Contract ID 2' */, 'size':'s'}},
            {'id':'0','label':{'title':this.props.app_state.loc['856']/* 'Burn Account' */, 'details':this.props.app_state.loc['859']/* 'Account ID 0' */, 'size':'s'}},
        ].concat(this.get_account_suggestions())
    }

    get_account_suggestions(){
        var contacts = this.props.app_state.contacts[this.state.token_item['e5']]
        if(contacts == null) contacts = [];
        var return_array = []
        contacts.forEach(contact => {
            if(contact['id'].toString().includes(this.state.recipient_id)){
                return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
            }
        });
        return return_array;
    }

    get_contact_alias(contact){
        return (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[contact['id']] == null ? ((contact['address'].toString()).substring(0, 9) + "...") : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[contact['id']])
    }

    when_suggestion_clicked(item, pos){
        this.setState({recipient_id: item['id']})
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


    set_token(token_item){
        if(this.state.token_item['id'] != token_item['id']){
            this.setState({
                selected: 0,id:makeid(8), type: this.props.app_state.loc['880']/* 'authmint' */, entered_indexing_tags:[this.props.app_state.loc['881']/* 'auth' */, this.props.app_state.loc['882']/* 'mint' */, this.props.app_state.loc['883']/* 'token' */], token_item: {'balance':1, 'data':[[],[],[],[],[]], 'id':0}, new_authmint_action_page_tags_object: this.get_new_authmint_action_page_tags_object(),
                recipient_id:'', amount:0, authmint_actions:[]
            })
        }
        this.setState({token_item: token_item, e5: token_item['e5']})
    }


    finish(){
        if(this.state.authmint_actions.length == 0){
            this.props.notify(this.props.app_state.loc['897']/* 'You cant stack no changes.' */, 3700)
        }else{
            this.props.add_authmint_to_stack(this.state)
            this.setState({authmint_actions:[]})
            this.props.notify(this.props.app_state.loc['18']/* 'transaction added to stack' */, 1700);
        }
    }







    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
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




export default AuthMintPage;