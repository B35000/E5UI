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

class FreezeUnfreezePage extends Component {
    
    state = {
        selected: 0, id:makeid(8), type: this.props.app_state.loc['930']/* 'freeze/unfreeze' */, token_item:{'id':0}, entered_indexing_tags:[this.props.app_state.loc['931']/* 'freeze' */, this.props.app_state.loc['932']/* 'unfreeze' */, this.props.app_state.loc['933']/* 'account' */], freeze_unfreeze_action_page_tags_object: this.get_freeze_unfreeze_action_page_tags_object(),
        recipient_id:'',  freeze_unfreeze_amount:0, freeze_unfreeze_actions:[]
    };

    get_freeze_unfreeze_action_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['931']/* 'freeze' */, this.props.app_state.loc['932']/* 'unfreeze' */], [1]
            ],
        };
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.freeze_unfreeze_action_page_tags_object} tag_size={'l'} when_tags_updated={this.when_freeze_unfreeze_action_page_tags_object_updated.bind(this)} theme={this.props.theme}/>
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

    when_freeze_unfreeze_action_page_tags_object_updated(tag_obj){
        this.setState({freeze_unfreeze_action_page_tags_object: tag_obj})
    }


    render_everything(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_freeze_unfreeze_number_picker()}
                    {this.render_freeze_unfreeze_transactions()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_freeze_unfreeze_number_picker()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_freeze_unfreeze_transactions()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_freeze_unfreeze_number_picker()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_freeze_unfreeze_transactions()}
                    </div>
                </div>
                
            )
        }
    }


    render_freeze_unfreeze_number_picker(){
        var balance = this.get_typed_accounts_balance()
        var frozen_balance = this.get_typed_accounts_frozen_balance()
        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'15px', 'text':this.props.app_state.loc['934']/* 'Freeze or Unfreeze the token ' */+this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+this.state.token_item['id']]+this.props.app_state.loc['935']/* ' for a specified set of accounts' */})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['936']/* 'Set the account to be frozen or unfrozen' */, 'title':this.props.app_state.loc['937']/* 'Account ID' */})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['937']/* 'Account ID' */} when_text_input_field_changed={this.when_recipient_input_field_changed.bind(this)} text={this.state.recipient_id} theme={this.props.theme}/>

                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['945a']/* 'Accounts balance.' */, 'number':balance, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']]})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['945a']/* 'Accounts balance.' */, 'subtitle':this.format_power_figure(balance), 'barwidth':this.calculate_bar_width(balance), 'number':this.format_account_balance_figure(balance), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']], })}
                </div>

                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['945b']/* 'Accounts frozen balance.' */, 'number':frozen_balance, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']]})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['945b']/* 'Accounts frozen balance.' */, 'subtitle':this.format_power_figure(frozen_balance), 'barwidth':this.calculate_bar_width(frozen_balance), 'number':this.format_account_balance_figure(frozen_balance), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']], })}
                </div>

                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['938']/* 'Set the amount to freeze or unfreeze.' */, 'title':this.props.app_state.loc['939']/* 'Action Amount.' */})}

                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['940']/* 'Freeze/Unfreeze Amount' */, 'number':this.state.freeze_unfreeze_amount, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']]})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['940']/* 'Freeze/Unfreeze Amount' */, 'subtitle':this.format_power_figure(this.state.freeze_unfreeze_amount), 'barwidth':this.calculate_bar_width(this.state.freeze_unfreeze_amount), 'number':this.format_account_balance_figure(this.state.freeze_unfreeze_amount), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']], })}
                </div>
                <div style={{height:10}}/>

                <div style={{'padding': '5px'}} onClick={()=>this.set_max()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['945e']/* 'Set Maximum Amount.' */, 'action':''})}
                </div>

                <div style={{height:10}}/>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_amount_set.bind(this)} theme={this.props.theme} power_limit={63}/>

                <div style={{'padding': '5px'}} onClick={()=>this.add_transaction()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['941']/* 'Add Action' */, 'action':''})}
                </div>

            </div>
        )
    }

    set_max(){
        var balance = this.get_typed_accounts_balance()
        var frozen_balance = this.get_typed_accounts_frozen_balance()
        var action = this.get_selected_item(this.state.freeze_unfreeze_action_page_tags_object, 'e')
        if(action == this.props.app_state.loc['932']/* 'unfreeze' */){
            this.when_amount_set(frozen_balance)
        }else{
            //action freeze
            this.when_amount_set(balance)
        }
    }

    get_typed_accounts_balance(){
        var recipient = this.get_typed_alias_id(this.state.recipient_id.trim())
        if(!isNaN(recipient) && parseInt(recipient) > 1000 && recipient != ''){
            var exchange_id = this.state.token_item['id']
            var e5 = this.state.token_item['e5']
            var pointer = e5+exchange_id+recipient
            var data = this.props.app_state.frozen_unfrozen_account_balance_data[pointer]
            if(data != null){
                var balance = data['balance']
                return balance
            }else{
                return 0
            }
            
        }else{
            return 0
        }
    }

     get_typed_accounts_frozen_balance(){
        var recipient = this.get_typed_alias_id(this.state.recipient_id.trim())
        if(!isNaN(recipient) && parseInt(recipient) > 1000 && recipient != ''){
            var exchange_id = this.state.token_item['id']
            var e5 = this.state.token_item['e5']
            var pointer = e5+exchange_id+recipient
            var data = this.props.app_state.frozen_unfrozen_account_balance_data[pointer]
            if(data != null){
                var frozen_balance = data['frozen_balance']
                return frozen_balance
            }else{
                return 0
            }
            
        }else{
            return 0
        }
    }

    when_recipient_input_field_changed(text){
        this.setState({recipient_id: text})

        var recipient = this.get_typed_alias_id(text.trim())
        if(!isNaN(recipient) && parseInt(recipient) > 1000 && recipient != ''){
            this.props.get_account_frozen_unfroozen_balance(this.state.token_item['id'], recipient, this.state.token_item['e5'])
        }
    }

    when_amount_set(amount){
        this.setState({freeze_unfreeze_amount: amount})
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }

    add_transaction(){
        var clone = this.state.freeze_unfreeze_actions.slice()
        var amount = this.state.freeze_unfreeze_amount
        var recipient = this.get_typed_alias_id(this.state.recipient_id.trim())

        if(isNaN(recipient) || parseInt(recipient) < 0 || recipient == ''){
            this.props.notify(this.props.app_state.loc['942']/* 'Please put a valid account ID' */, 3600)
        }
        else if(amount == 0){
            this.props.notify(this.props.app_state.loc['943']/* 'Please put a valid amount.' */, 3600)
        }
        else if(this.check_if_amount_exceeds_balance(amount, recipient)){
            this.props.notify(this.props.app_state.loc['945c']/* 'The amount youve set exceeds the specified accounts frozen balance.' */, 6600)
        }
        else{
            var action = this.get_selected_item(this.state.freeze_unfreeze_action_page_tags_object, 'e')
            var stack_action = 1
            if(action == this.props.app_state.loc['932']/* 'unfreeze' */) stack_action = 0

            var tx = {'amount':amount, 'recipient':recipient, 'action':stack_action, 'action-name':action}
            clone.push(tx)
            this.setState({freeze_unfreeze_actions: clone, recipient_id: '', freeze_unfreeze_amount:0})
            this.props.notify(this.props.app_state.loc['944']/* 'action added!' */, 1600)
        }
    }


    check_if_amount_exceeds_balance(amount, recipient){
        var action = this.get_selected_item(this.state.freeze_unfreeze_action_page_tags_object, 'e')
        var frozen_balance = this.get_typed_account_updated_balance(recipient)
        if(action == this.props.app_state.loc['932']/* 'unfreeze' */){
            if(bigInt(amount).greater(frozen_balance)){
                return true
            }
            return false
        }
        return false
    }

    get_typed_account_updated_balance(recipient){
        var frozen_balance = this.get_typed_accounts_frozen_balance()
        var freeze_unfreeze_actions = this.state.freeze_unfreeze_actions
        freeze_unfreeze_actions.forEach(action => {
            if(action['recipient'] == recipient){
                if(action['action'] == 1/* freeze */){
                    frozen_balance = bigInt(frozen_balance).plus(bigInt(action['amount']))
                }else{
                    frozen_balance = bigInt(frozen_balance).minus(bigInt(action['amount']))
                }
            }
        });

        var txs = this.props.app_state.stack_items
        for(var i=0; i<txs.length; i++){
            var t = txs[i]
            if(t.type == this.props.app_state.loc['930']/* 'freeze/unfreeze' */){
                var exchange_id = t.token_item['id']
                if(exchange_id == this.state.token_item['id']){
                    var stack_freeze_unfreeze_actions = t.freeze_unfreeze_actions
                    stack_freeze_unfreeze_actions.forEach(action => {
                        if(action['recipient'] == recipient){
                            if(action['action'] == 1/* freeze */){
                                frozen_balance = bigInt(frozen_balance).plus(bigInt(action['amount']))
                            }else{
                                frozen_balance = bigInt(frozen_balance).minus(bigInt(action['amount']))
                            }
                        }
                    });
                }
            }
        }

        return frozen_balance
    }


    get_typed_alias_id(alias){
        if(!isNaN(alias)){
            return alias
        }
        var id = (this.props.app_state.alias_owners[this.state.token_item['e5']][alias] == null ? 
            alias : this.props.app_state.alias_owners[this.state.token_item['e5']][alias])

        return id
    }


    render_freeze_unfreeze_transactions(){
        var items = [].concat(this.state.freeze_unfreeze_actions)

        if(items.length == 0){
            items = [0, 1, 2]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'display': 'flex', 'align-items':'center','justify-content':'center'}}>
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
                                    action: () => this.when_freeze_unfreeze_item_clicked(item)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '5px'}}>
                                            {this.render_detail_item('3', {'title':''+item['action-name']+' '+this.format_account_balance_figure(item['amount'])+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']], 'details':this.props.app_state.loc['945d']/* 'Target Account ID: ' */+item['recipient'], 'size':'s'})}
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


    when_freeze_unfreeze_item_clicked(item){
        var cloned_array = this.state.freeze_unfreeze_actions.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({freeze_unfreeze_actions: cloned_array})
        this.props.notify(this.props.app_state.loc['945']/* 'action removed!' */, 600)
    }





    set_token(token_item){
        if(this.state.token_item['id'] != token_item['id']){
            this.setState({
                selected: 0, id:makeid(8), type: this.props.app_state.loc['930']/* 'freeze/unfreeze' */, token_item:{'id':0}, entered_indexing_tags:[this.props.app_state.loc['931']/* 'freeze' */, this.props.app_state.loc['932']/* 'unfreeze' */, this.props.app_state.loc['933']/* 'account' */], freeze_unfreeze_action_page_tags_object: this.get_freeze_unfreeze_action_page_tags_object(),
                recipient_id:'',  freeze_unfreeze_amount:0, freeze_unfreeze_actions:[]
            })
        }
        this.setState({token_item: token_item, e5: token_item['e5']})
    }

    finish(){
        if(this.state.freeze_unfreeze_actions.length == 0){
            this.props.notify(this.props.app_state.loc['897']/* 'you cant stack no changes' */, 3700)
        }else{
            this.props.add_freeze_unfreeze_to_stack(this.state)
            this.setState({freeze_unfreeze_actions:[]})
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




export default FreezeUnfreezePage;