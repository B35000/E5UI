import React, { Component } from 'react';
import ViewGroups from '../../components/view_groups'
import Tags from '../../components/tags';
import TextInput from '../../components/text_input';
import NumberPicker from '../../components/number_picker';

import Letter from '../../assets/letter.png';

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
        selected: 0,id:makeid(8), type: 'authmint', entered_indexing_tags:['auth', 'mint', 'token'], token_item: {'balance':1, 'data':[[],[],[],[],[]], 'id':0}, new_authmint_action_page_tags_object: this.get_new_authmint_action_page_tags_object(),

        recipient_id:'', amount:0, authmint_actions:[]
    };


    get_new_authmint_action_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','authmint'], [1]
            ],
        };
    }

    render(){
        return(
            <div style={{'padding':'10px 20px 0px 10px'}}>
                
                <div className="row">
                    <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                        <Tags page_tags_object={this.state.new_authmint_action_page_tags_object} tag_size={'l'} when_tags_updated={this.when_new_authmint_action_page_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'padding': '5px'}} onClick={()=>this.finish()}>
                            {this.render_detail_item('5', {'text':'Finish', 'action':''})}
                        </div>
                        
                    </div>
                </div>

                {this.render_detail_item('4', {'font':'Sans-serif', 'textsize':'15px', 'text':'AuthMint your token '+this.state.token_item['id']+' for a specified target'})}
                <div style={{height:10}}/>
                {this.render_everything()}

            </div>
        )
    }

    when_new_authmint_action_page_tags_object_updated(tag_obj){
        this.setState({new_authmint_action_page_tags_object: tag_obj})
    }

    render_everything(){
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':'Set the recipient of the authmint action', 'title':'Recipient'})}

                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Account ID'} when_text_input_field_changed={this.when_recipient_input_field_changed.bind(this)} text={this.state.recipient_id} theme={this.props.theme}/>

                {this.load_account_suggestions()}

                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'details':'Set the amount to authmint', 'title':'Action Amount.'})}

                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Transfer Amount', 'subtitle':this.format_power_figure(this.state.amount), 'barwidth':this.calculate_bar_width(this.state.amount), 'number':this.format_account_balance_figure(this.state.amount), 'barcolor':'', 'relativepower':this.props.app_state.token_directory[this.state.token_item['id']], })}
                </div>

                <div style={{height:10}}/>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_amount_set.bind(this)} theme={this.props.theme} power_limit={63}/>

                <div style={{'padding': '5px'}} onClick={()=>this.add_transaction()}>
                    {this.render_detail_item('5', {'text':'Add Action', 'action':''})}
                </div>

                {this.render_authmint_transactions()}
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
        var recipient = this.state.recipient_id.trim()

        if(isNaN(recipient) || recipient == ''){
            this.props.notify('please put a valid account id', 600)
        }
        else if(amount == 0){
            this.props.notify('please put a valid amount', 600)
        }
        else{
            var tx = {'amount':amount, 'recipient':recipient}
            clone.push(tx)
            this.setState({authmint_actions: clone, recipient_id: '', amount:0})
            this.props.notify('authmint action added!', 600)
        }
    }




    render_authmint_transactions(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = this.state.authmint_actions

        if(items.length == 0){
            items = [0, 1]
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
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>this.when_item_clicked(item)}>
                                {this.render_detail_item('3', {'title':this.format_account_balance_figure(item['amount']), 'details':'Target Recipient ID: '+item['recipient'], 'size':'s'})}
                            </li>
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
        this.props.notify('action removed!', 600)
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


    set_token(token_item){
        if(this.state.token_item['id'] != token_item['id']){
            this.setState({
                selected: 0,id:makeid(8), type: 'authmint', entered_indexing_tags:['auth', 'mint', 'token'], token_item: {'balance':1, 'data':[[],[],[],[],[]], 'id':0}, new_authmint_action_page_tags_object: this.get_new_authmint_action_page_tags_object(),
                recipient_id:'', amount:0, authmint_actions:[]
            })
        }
        this.setState({token_item: token_item})
    }


    finish(){
        if(this.state.authmint_actions.length == 0){
            this.props.notify('you cant stack no changes', 700)
        }else{
            this.props.add_authmint_to_stack(this.state)
            this.setState({authmint_actions:[]})
            this.props.notify('transaction added to stack', 700);
        }
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


}




export default AuthMintPage;