import React, { Component } from 'react';
import ViewGroups from '../../components/view_groups';
import Tags from '../../components/tags';
import TextInput from '../../components/text_input';
import NumberPicker from '../../components/number_picker';

import Letter from '../../assets/letter.png';

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

class template extends Component {
    
    state = {
        selected: 0,id:makeid(8), type: 'transfer',
        new_transfer_action_page_tags_object: this.get_new_transfer_action_page_tags_object(),
        recipient_id:'', amount:0, token_item: {'balance':1, 'id':0}, stack_items:[], debit_balance:0,
        entered_indexing_tags:['transfer', 'send', 'token']
    };

    get_new_transfer_action_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','transfer'], [1]
            ],
        };
    }

    render(){
        return(
            <div style={{'padding':'10px 20px 0px 10px'}}>

                <div className="row">
                    <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                        <Tags page_tags_object={this.state.new_transfer_action_page_tags_object} tag_size={'l'} when_tags_updated={this.when_new_transfer_action_page_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'padding': '5px'}} onClick={()=>this.add_transactions_to_stack()}>
                            {this.render_detail_item('5', {'text':'Finish', 'action':'finish_creating_object'})}
                        </div>
                        
                    </div>
                </div>
                
                <div style={{'margin':'0px 0px 0px 0px'}}>
                    {this.render_detail_item('4', {'font':'Sans-serif', 'textsize':'15px', 'text':'Transfer the specified token'})}

                    <div style={{height:10}}/> 

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':'Your Balance', 'subtitle':this.format_power_figure(this.state.token_item['balance']), 'barwidth':this.calculate_bar_width(this.state.token_item['balance']), 'number':this.format_account_balance_figure(this.state.token_item['balance']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']], })}

                        {this.render_detail_item('2', { 'style':'l', 'title':'Your Balance after Set Transfers', 'subtitle':this.format_power_figure(this.state.token_item['balance'] - this.state.debit_balance), 'barwidth':this.calculate_bar_width(this.state.token_item['balance'] - this.state.debit_balance), 'number':this.format_account_balance_figure(this.state.token_item['balance'] - this.state.debit_balance), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']], })}
                    </div>

                    {this.render_everything()}
                </div>
                
            </div>
        )
    }

    when_new_transfer_action_page_tags_object_updated(tag_obj){
        this.setState({new_transfer_action_page_tags_object: tag_obj})
    }


    render_everything(){
        return(
            <div> 
                <div style={{height:10}}/>
                {this.render_detail_item('3', {'size':'l', 'details':'Set the recipient of the transfer action', 'title':'Recipient of action'})}

                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Recipient ID'} when_text_input_field_changed={this.when_recipient_input_field_changed.bind(this)} text={this.state.recipient_id} theme={this.props.theme}/>
                {this.load_account_suggestions()}

                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'details':'Amount to transfer to the speicified target account', 'title':'Amount for Transfer'})}

                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Transfer Amount', 'subtitle':this.format_power_figure(this.state.amount), 'barwidth':this.calculate_bar_width(this.state.amount), 'number':this.format_account_balance_figure(this.state.amount), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']], })}
                </div>

                <div style={{height:10}}/>
                <div style={{'padding': '5px'}} onClick={()=>this.set_maximum()}>
                    {this.render_detail_item('5', {'text':'Set Maximum', 'action':''})}
                </div>

                <div style={{height:10}}/>
                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_amount_set.bind(this)} theme={this.props.theme} power_limit={63}/>

                <div style={{'padding': '5px'}} onClick={()=>this.add_transaction()}>
                    {this.render_detail_item('5', {'text':'Add Transaction', 'action':''})}
                </div>

                {this.render_stack_transactions()}

            </div>
        )
    }

    set_maximum(){
        var max = this.state.token_item['balance']
        this.setState({amount: max})
    }

    get_number_limit(){
        if(this.state.token_item['balance'] != null){
            var balance =  this.state.token_item['balance']
            var balance_after_transfers = balance - this.state.debit_balance
            return balance_after_transfers;
        }
        else return bigInt('1e72')
    }

    when_recipient_input_field_changed(text){
        this.setState({recipient_id: text})
    }

    when_amount_set(amount){
        this.setState({amount: amount})
    }


    add_transaction(){
        var clone = this.state.stack_items.slice()
        var amount = this.state.amount
        var recipient = this.get_typed_alias_id(this.state.recipient_id.toString().trim())

        if(isNaN(recipient) || parseInt(recipient) < 0 || recipient == ''){
            this.props.notify('please put a valid account id', 1600)
        }
        else if(amount == 0){
            this.props.notify('please put a valid amount', 1600)
        }
        else if(!this.check_if_sender_has_balance()){
            this.props.notify('you dont have enough tokens to add that transaction', 4200)
        }
        else{
            var tx = {id:makeid(8), type:'transfer', 'amount':''+amount, 'recipient':recipient, 'exchange':this.state.token_item, entered_indexing_tags:['transfer', 'send', 'token']}

            clone.push(tx)
            this.setState({stack_items: clone, debit_balance: this.state.debit_balance + amount, recipient_id:'', amount:0})
            this.props.notify('transaction added!', 1600)
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

    check_if_sender_has_balance(){
        var picked_amount = this.state.amount
        var limit = this.get_number_limit()

        if(picked_amount > limit){
            return false
        }
        return true
    }

    render_stack_transactions(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.stack_items)

        if(items.length == 0){
            items = [0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 10px 0px'}}>
                                        <img src={Letter} style={{height:30 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }else{
            var items = [].concat(this.state.stack_items)
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>this.when_stack_item_clicked(item, index)}>
                                {this.render_detail_item('3', {'title':''+this.format_account_balance_figure(item['amount'])+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']], 'details':'recipient account: '+item['recipient'], 'size':'l'})}
                            </li>
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


    when_stack_item_clicked(item, index){
        var cloned_array = this.state.stack_items.slice()
        cloned_array.splice(index, 1);
        this.setState({stack_items: cloned_array, debit_balance: this.state.debit_balance - bigInt(item.amount)})
        this.props.notify('transaction removed!', 600)
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
            {'id':'53', 'label':{'title':'My Account', 'details':'Account', 'size':'s'}},
            {'id':'2', 'label':{'title':'Main Contract', 'details':'Contract ID 2', 'size':'s'}},
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


    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
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



    set_token(item){
        if(this.state.token_item['id'] != item['id']){
            this.setState({
                selected: 0,id:makeid(8), type: 'transfer',
                new_transfer_action_page_tags_object: this.get_new_transfer_action_page_tags_object(),
                recipient_id:'', amount:0, token_item: {'balance':1, 'id':0}, stack_items:[], debit_balance:0,
                entered_indexing_tags:['transfer', 'send', 'token']
            })
        }
        this.setState({token_item: item, e5: item['e5']})

        var stack_items = this.props.app_state.stack_items
        for(var i=0; i<stack_items.length; i++){
            if(stack_items[i].type == 'transfer' && stack_items[i].token_item['id'] == item['id']){
                this.setState({debit_balance: this.state.debit_balance + stack_items[i].debit_balance})
            }
        }
    }


    add_transactions_to_stack(){
        this.props.add_transfer_transactions_to_stack(this.state)
        this.props.notify('transactions added to stack!', 600)
        this.setState({recipient_id:'', stack_items:[]})
    }


}




export default template;