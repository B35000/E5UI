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
                        {this.render_detail_item('2', { 'style':'l', 'title':'Your Balance', 'subtitle':this.format_power_figure(this.state.token_item['balance']), 'barwidth':this.calculate_bar_width(this.state.token_item['balance']), 'number':this.format_account_balance_figure(this.state.token_item['balance']), 'barcolor':'', 'relativepower':this.props.app_state.token_directory[this.state.token_item['id']], })}

                        {this.render_detail_item('2', { 'style':'l', 'title':'Your Balance after Set Transfers', 'subtitle':this.format_power_figure(this.state.token_item['balance'] - this.state.debit_balance), 'barwidth':this.calculate_bar_width(this.state.token_item['balance'] - this.state.debit_balance), 'number':this.format_account_balance_figure(this.state.token_item['balance'] - this.state.debit_balance), 'barcolor':'', 'relativepower':this.props.app_state.token_directory[this.state.token_item['id']], })}
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
                {this.render_detail_item('3', {'size':'l', 'details':'Amount set to submit/receive for the buy/sell action', 'title':'Fees for Action'})}

                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Transfer Amount', 'subtitle':this.format_power_figure(this.state.amount), 'barwidth':this.calculate_bar_width(this.state.amount), 'number':this.format_account_balance_figure(this.state.amount), 'barcolor':'', 'relativepower':this.props.app_state.token_directory[this.state.token_item['id']], })}
                </div>

                <div style={{height:10}}/>

                <NumberPicker number_limit={this.get_number_limit()} when_number_picker_value_changed={this.when_amount_set.bind(this)} theme={this.props.theme} power_limit={63}/>

                <div style={{'padding': '5px'}} onClick={()=>this.add_transaction()}>
                    {this.render_detail_item('5', {'text':'Add Transaction', 'action':''})}
                </div>

                {this.render_stack_transactions()}

            </div>
        )
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
        var recipient = this.state.recipient_id.trim()

        if(isNaN(recipient) || recipient == ''){
            this.props.notify('please put a valid account id', 600)
        }
        else if(amount == 0){
            this.props.notify('please put a valid amount', 600)
        }
        else{
            var tx = {id:makeid(8), type:'transfer', 'amount':''+amount, 'recipient':recipient, 'exchange':this.state.token_item, entered_indexing_tags:['transfer', 'send', 'token']}

            clone.push(tx)
            this.setState({stack_items: clone, debit_balance: this.state.debit_balance + amount, recipient_id:'', amount:0})
            this.props.notify('transaction added!', 600)
        }
    }

    render_stack_transactions(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = this.state.stack_items

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
            var items = this.state.stack_items
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>this.when_stack_item_clicked(item, index)}>
                                {this.render_detail_item('3', {'title':''+this.format_account_balance_figure(item['amount'])+' '+this.props.app_state.token_directory[this.state.token_item['id']], 'details':'recipient account: '+item['recipient'], 'size':'l'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }


    when_stack_item_clicked(item, index){
        var cloned_array = this.state.stack_items.slice()
        cloned_array.splice(index, 1);
        this.setState({stack_items: cloned_array, debit_balance: this.state.debit_balance - bigInt(item.amount)})
        this.props.notify('transaction removed!', 600)
    }


    load_account_suggestions(){
        var items = this.get_suggested_accounts()
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
            {'id':'0','label':{'title':'Burn Account', 'details':'Account ID 0', 'size':'s'}},
        ]
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



    set_token(item){
        if(this.state.token_item['id'] != item['id']){
            this.setState({
                selected: 0,id:makeid(8), type: 'transfer',
                new_transfer_action_page_tags_object: this.get_new_transfer_action_page_tags_object(),
                recipient_id:'', amount:0, token_item: {'balance':1, 'id':0}, stack_items:[], debit_balance:0,
                entered_indexing_tags:['transfer', 'send', 'token']
            })
        }
        this.setState({token_item: item})
    }


    add_transactions_to_stack(){
        this.props.add_transfer_transactions_to_stack(this.state)
        this.props.notify('transactions added to stack!', 600)
    }


}




export default template;