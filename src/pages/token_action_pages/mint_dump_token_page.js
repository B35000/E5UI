import React, { Component } from 'react';
import ViewGroups from '../../components/view_groups';
import Tags from '../../components/tags';
import TextInput from '../../components/text_input';
import NumberPicker from '../../components/number_picker';

import AddStack from '../../assets/e5empty_icon3.png'; 
import Letter from '../../assets/letter.png';

var bigInt = require("big-integer");
const Web3 = require('web3');


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

class NewMintActionPage extends Component {
    
    state = {
        selected: 0, id:makeid(8), type:'buy-sell', entered_indexing_tags:['mint', 'dump', 'token'],
        new_mint_dump_action_page_tags_object: this.get_new_mint_dump_action_page_tags_object(),
        recipient_id:'', amount:0, token_item: {'balance':1, 'data':[[],[],[],[],[]], 'id':0}, 
        upper_bound:0, lower_bound:0, e5:this.props.app_state.selected_e5
    };


    get_new_mint_dump_action_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','mint-buy', 'dump-sell'], [1]
            ],
        };
    }

    render(){
        return(
            <div style={{'padding':'10px 20px 0px 10px'}}>

                <div className="row">
                    <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                        <Tags page_tags_object={this.state.new_mint_dump_action_page_tags_object} tag_size={'l'} when_tags_updated={this.when_new_mint_dump_page_tags_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'padding': '5px'}} onClick={()=>this.finish()}>
                            {this.render_detail_item('5', {'text':'Finish', 'action':''})}
                        </div>
                    </div>
                </div>
                
                <div style={{'margin':'20px 0px 0px 0px'}}>
                    {this.render_detail_item('4', {'font':'Sans-serif', 'textsize':'15px', 'text':'Buy or Sell the specified token'})}

                    <div style={{height:10}}/> 

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':'Your Balance', 'subtitle':this.format_power_figure(this.state.token_item['balance']), 'barwidth':this.calculate_bar_width(this.state.token_item['balance']), 'number':this.format_account_balance_figure(this.state.token_item['balance']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']], })}
                    </div>

                    {this.render_everything()}
                </div>
                
            </div>
        )
    }

    when_new_mint_dump_page_tags_updated(tag_obj){
        this.setState({new_mint_dump_action_page_tags_object: tag_obj})
    }

    render_everything(){
        return(
            <div>
                <div style={{height:10}}/>
                {this.render_detail_item('3', {'size':'l', 'details':'Set the recipient of the mint/dump action', 'title':'Recipient of action'})}

                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Recipient ID'} when_text_input_field_changed={this.when_recipient_input_field_changed.bind(this)} text={this.state.recipient_id} theme={this.props.theme}/>
                {this.load_account_suggestions()}

                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'details':'Set the amount for the mint/dump action', 'title':'Amount for action'})}

                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Amount', 'subtitle':this.format_power_figure(this.state.amount), 'barwidth':this.calculate_bar_width(this.state.amount), 'number':this.format_account_balance_figure(this.state.amount), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']], })}

                    {this.render_detail_item('2', { 'style':'l', 'title':'Buy Limit', 'subtitle':this.format_power_figure(this.get_token_buy_limit()), 'barwidth':this.calculate_bar_width(this.get_token_buy_limit()), 'number':this.format_account_balance_figure(this.get_token_buy_limit()), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']], })}

                    {this.render_detail_item('2', { 'style':'l', 'title':'Sell Limit', 'subtitle':this.format_power_figure(this.get_token_sell_limit()), 'barwidth':this.calculate_bar_width(this.get_token_sell_limit()), 'number':this.format_account_balance_figure(this.get_token_sell_limit()), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']], })}

                </div>

                <div style={{height:10}}/>
                <div style={{'padding': '5px'}} onClick={()=>this.set_maximum()}>
                    {this.render_detail_item('5', {'text':'Set Maximum', 'action':''})}
                </div>

                <NumberPicker number_limit={this.get_number_limit()} when_number_picker_value_changed={this.when_amount_set.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}
                {this.render_fees_for_action_title()}

                <div style={{height:10}}/>
                {this.render_buy_token_uis(this.state.token_item['data'][3], this.calculate_token_prices(this.state.token_item['data'][4]), this.state.token_item['data'][5])}

                <div style={{height:20}}/>
                {this.render_my_balances_if_buy_action()}
                
                <div style={{height:20}}/>
                {this.set_price_data()}

                {this.render_detail_item('0')}
                {this.set_upper_lower_bounds()}

                {/* <div style={{'padding': '5px'}} onClick={()=>  this.add_transaction()}>
                    {this.render_detail_item('5', {'text':'Add Transaction To Stack', 'action':''})}
                </div> */}

            </div>
        )
    }

    set_maximum(){
        var max = this.get_token_buy_limit()
        this.setState({amount: max})
    }

    set_price_data(){
        if(this.state.token_item['id'] != 0){
            var selected_object = this.state.token_item
            var action = this.get_selected_item(this.state.new_mint_dump_action_page_tags_object, 'e')
            if(action == 'dump-sell'){
                var input_amount = this.state.amount
                var input_reserve_ratio = selected_object['data'][2][0]
                var output_reserve_ratio = selected_object['data'][2][1]
                var price = this.calculate_price(input_amount, input_reserve_ratio, output_reserve_ratio)
                var buy_tokens = [].concat(selected_object['data'][3])
                var buy_amounts = [].concat(selected_object['data'][4])
                var buy_depths = [].concat(selected_object['data'][5])
                return(
                    <div>
                        {this.render_detail_item('3', {'size':'l', 'details':'The amount you get when selling the token', 'title':'Receive Amount'})}
                        <div style={{height:10}}/>
                        <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                            <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                                {buy_tokens.map((item, index) => (
                                    <li style={{'padding': '1px'}}>
                                        {this.render_detail_item('2', {'style':'l','title':'Token ID: '+item, 'subtitle':'depth:'+buy_depths[index], 'barwidth':this.calculate_bar_width(this.calculate_price_from_sell_action(buy_amounts[index], price)), 'number':this.format_account_balance_figure(this.calculate_price_from_sell_action(buy_amounts[index], price)), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )
            }else{
                var input_amount = this.state.amount
                var input_reserve_ratio = selected_object['data'][2][1]
                var output_reserve_ratio = selected_object['data'][2][0]
                var price = this.calculate_price(input_amount, input_reserve_ratio, output_reserve_ratio)
                var buy_tokens = selected_object['data'][3]
                var buy_amounts = selected_object['data'][4]
                var buy_depths = selected_object['data'][5]
                return(
                    <div>
                        {this.render_detail_item('3', {'size':'l', 'details':'The amount youll probably get from the buy action', 'title':'Receive Amount'})}
                        <div style={{height:10}}/>
                        <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                            {this.render_detail_item('2', {'style':'l','title':'Token ID: '+this.state.token_item['id'], 'subtitle':'depth:'+selected_object['data'][2][7], 'barwidth':this.calculate_bar_width(price), 'number':''+this.format_account_balance_figure(price), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']]})}
                        </div>
                    </div>
                    
                )
            }
        }
    }

    calculate_price(input_amount, input_reserve_ratio, output_reserve_ratio){
        var selected_object = this.state.token_item
        var token_type = selected_object['data'][0][3]
        if(input_reserve_ratio == 0 || output_reserve_ratio == 0 || input_amount == 0){
            return 0
        }
        if(token_type == 3){
            var price = (bigInt(input_amount).times(bigInt(output_reserve_ratio))).divide(bigInt(input_reserve_ratio).plus(input_amount))
            if(price == 0){
                price = (input_amount * output_reserve_ratio) / (input_reserve_ratio + input_amount)
            }
            return price
        }else{
            var price = (bigInt(input_amount).times(bigInt(output_reserve_ratio))).divide(bigInt(input_reserve_ratio))
            if(price == 0){
                price = (input_amount * output_reserve_ratio) / (input_reserve_ratio)
            }
            return price
        }
    }

    calculate_price_from_sell_action(amount, price){
        if(amount >10**18 || price >10**18){
            return bigInt(amount).times(bigInt(price))
        }else{
            return amount*price
        }
    }


    render_fees_for_action_title(){
        var action = this.get_selected_item(this.state.new_mint_dump_action_page_tags_object, 'e')
        if(action == 'mint-buy'){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':'Amount set to submit for the buy action', 'title':'Fees for Action'})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':'Amount set to receive for the sell action', 'title':'Receive Amount'})}
                </div>
            )
        }
    }

    calculate_token_prices(buy_amounts){
        var amount = this.state.amount
        var return_buy_amounts = buy_amounts.slice()
        for(var i = 0; i < buy_amounts.length; i++){
            return_buy_amounts[i] = bigInt(bigInt(buy_amounts[i]).multiply(bigInt(amount)) )
        }
        return return_buy_amounts
    }

    render_buy_token_uis(buy_tokens, buy_amounts, buy_depths){
        var bt = [].concat(buy_tokens)
        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px', 'list-style':'none'}}>
                    {bt.map((item, index) => (
                        <li style={{'padding': '1px'}}>
                            {this.render_detail_item('2', {'style':'l','title':'Token ID: '+item, 'subtitle':'depth:'+buy_depths[index], 'barwidth':this.calculate_bar_width(buy_amounts[index]), 'number':this.format_account_balance_figure(buy_amounts[index]), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                        </li>
                    ))}
                </ul>
            </div>
            
        )
    }

    get_number_limit(){
        if(this.state.token_item['data'] != null){
            return this.state.token_item['data'][1][0]
        }
        else return bigInt('1e72')
    }

    get_token_buy_limit(){
        if(this.state.token_item['data'] != null){
            return this.state.token_item['data'][1][0]
        }
        else return 1
    }

    get_token_sell_limit(){
        if(this.state.token_item['data'] != null){
            return this.state.token_item['data'][1][11]
        }
        else return 1
    }

    when_recipient_input_field_changed(text){
        this.setState({recipient_id: text})
    }

    when_amount_set(amount){
        this.setState({amount: amount})
    }

    render_my_balances_if_buy_action(){
        var e5 = this.state.token_item['e5'];
        var buy_tokens = this.state.token_item['data'][3]
        var buy_amount_balances = []
        var buy_depths = this.state.token_item['data'][5]

        for(var i=0; i<buy_tokens.length; i++){
            var token_id = buy_tokens[i]
            var token_balance = this.props.app_state.created_token_object_mapping[e5][token_id]
            token_balance = token_balance == null ? 0 : token_balance['balance']
            var my_ether_balance = this.props.app_state.account_balance[e5] == null ? 0 : this.props.app_state.account_balance[e5]
            if(token_id == 0) token_balance = my_ether_balance
            buy_amount_balances.push(token_balance)
        }
        var action = this.get_selected_item(this.state.new_mint_dump_action_page_tags_object, 'e')
        if(action == 'mint-buy'){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':'The amounts you have available for buying the token', 'title':'Your balances'})}
                    <div style={{height:10}}/>

                    {this.render_buy_token_uis(buy_tokens, buy_amount_balances, buy_depths)}
                </div>
            )
        }
    }




    add_transaction() {
        var amount = this.state.amount
        var recipient = this.get_typed_alias_id(this.state.recipient_id.trim())
        var action = this.get_selected_item(this.state.new_mint_dump_action_page_tags_object, 'e')
        var stack_action = 1
        if(action == 'mint-buy') stack_action = 0

        if(isNaN(recipient) || parseInt(recipient) < 0 || recipient == ''){
            this.props.notify('please put a valid account id', 600)
        }
        else if(amount == 0){
            this.props.notify('please put a valid amount', 600)
        }
        else{
            if(!this.check_if_sender_has_tokens_for_sell() && action == 'dump-sell'){
                this.props.notify('you dont have enough tokens for that')
            }
            
            else{
                this.props.notify('transaction added!', 600)
            }
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

    check_if_sender_has_tokens_for_sell(){
        if(this.state.token_item['balance'] < this.state.amount){
            return false
        }
        return true
    }

    check_if_sender_has_tokens_for_buy(){
        var e5 = this.state.token_item['e5']
        var buy_tokens = this.state.token_item['data'][3]
        var required_amounts = this.calculate_token_prices(this.state.token_item['data'][4])
        var affordable = true;

        for(var i=0; i<buy_tokens.length; i++){
            var token_id = buy_tokens[i]
            var token_balance = this.props.app_state.created_token_object_mapping[e5][token_id]
            token_balance = token_balance == null ? 0 : token_balance['balance']
            var my_ether_balance = this.props.app_state.account_balance[e5] == null ? 0 : this.props.app_state.account_balance[e5]
            if(token_id == 0) token_balance = my_ether_balance
            var required_amount = required_amounts[i]

            if(token_balance < required_amount){
                affordable = false
            }
        }
        return affordable
    }


    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
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


    



    set_upper_lower_bounds(){
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':'The transaction will revert if you dont receive your tokens specified in the range set below. This is useful in avoiding MEV sandwitch attacks while making large transactions', 'title':'Upper Lower Bounds (optional)'})}

                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Upper Bound', 'subtitle':this.format_power_figure(this.state.upper_bound), 'barwidth':this.calculate_bar_width(this.state.upper_bound), 'number':this.format_account_balance_figure(this.state.upper_bound), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']], })}
                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_upper_bound_set.bind(this)} theme={this.props.theme} power_limit={63}/>

                <div style={{height:20}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Lower Bound', 'subtitle':this.format_power_figure(this.state.lower_bound), 'barwidth':this.calculate_bar_width(this.state.lower_bound), 'number':this.format_account_balance_figure(this.state.lower_bound), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']], })}
                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_lower_bound_set.bind(this)} theme={this.props.theme} power_limit={63}/>

            </div>
        )
    }

    when_upper_bound_set(number){
        this.setState({upper_bound: number})
    }

    when_lower_bound_set(number){
        this.setState({lower_bound: number})
    }





    finish(){
        var amount = this.state.amount
        var recipient = this.state.recipient_id.trim()
        var action = this.get_selected_item(this.state.new_mint_dump_action_page_tags_object, 'e')
        var stack_action = 1
        if(action == 'mint-buy') stack_action = 0

        var selected_object = this.state.token_item
        var input_amount = amount
        var input_reserve_ratio = selected_object['data'][2][0]
        var output_reserve_ratio = selected_object['data'][2][1]
        if(action == 'mint-buy'){
            input_reserve_ratio = selected_object['data'][2][1]
            output_reserve_ratio = selected_object['data'][2][0]
        }
        var price = this.calculate_price(input_amount, input_reserve_ratio, output_reserve_ratio)

        var can_make_swap_obj = this.check_if_sender_can_make_swap();
        var can_make_swap = can_make_swap_obj.can_make_swap
        var reason = can_make_swap_obj.reason

        if(isNaN(recipient) || parseInt(recipient) < 0 || recipient == ''){
            this.props.notify('please put a valid account id', 600)
        }
        else if(amount == 0){
            this.props.notify('please put a valid amount', 600)
        }
        else if(price < 1){
            this.props.notify('that amount is too low', 600)
        }
        else{
            if(!this.check_if_sender_has_tokens_for_sell() && action == 'dump-sell'){
                this.props.notify('you dont have enough tokens for that')
            }
            else if(!this.check_if_sender_has_tokens_for_buy() && action == 'mint-buy'){
                this.props.notify('you dont have enough tokens to buy that much')
            }
            else if(!this.check_if_sender_can_interact_with_exchange()){
                this.props.notify('you cant interact with the same exchange twice in one run', 1200)
            }
            else if(!can_make_swap){
                this.props.notify(reason, 1500)
            }
            else{
                this.props.add_buy_sell_transaction_to_stack(this.state)
                this.setState({amount:0, recipient_id:''})
                this.props.notify('transaction added to stack', 600)
            }
        }
    }

    check_if_sender_can_interact_with_exchange(){
        var stack_transactions = this.props.app_state.stack_items
        for(var i=0; i<stack_transactions.length; i++){
            if(stack_transactions[i].type == 'buy-sell' && stack_transactions[i].token_item['id'] == this.state.token_item['id'] && stack_transactions[i].id != this.state.id && stack_transactions[i].e5 == this.props.app_state.selected_e5){
                return false
            }
        }
        return true
    }

    check_if_sender_can_make_swap(){
        var selected_object = this.state.token_item
        var selected_obj_config = selected_object['data'][1];
        var e5 = selected_object['e5']

        var minimum_entered_contracts_between_swap = selected_obj_config[13]
        var minimum_transactions_between_swap = selected_obj_config[2]
        var minimum_blocks_between_swap = selected_obj_config[3]
        var minimum_time_between_swap = selected_obj_config[4]

        var minimum_transactions_for_first_buy = selected_obj_config[17]
        var minimum_entered_contracts_for_first_buy = selected_obj_config[18]

        var last_swap_block = selected_object['account_data'][0]
        var last_swap_timestamp = selected_object['account_data'][1]
        var last_swap_transaction_count = selected_object['account_data'][2]
        var last_entered_contracts_count = selected_object['account_data'][3]

        var timestamp = Date.now()/1000
        var current_block = this.props.app_state.number_of_blocks[e5];
        var current_entered_contracts_count = this.props.app_state.basic_transaction_data[e5][2]
        var current_transaction_count = this.props.app_state.basic_transaction_data[e5][3]

        var can_make_swap = true;
        var reason = ''

        if(last_swap_block != 0){
            if(minimum_entered_contracts_between_swap != 0){
                var diff = current_entered_contracts_count - last_entered_contracts_count
                // console.log('-------------------------check_if_sender_can_make_swap-----------------------')
                // console.log('current_entered_contracts_count: ',current_entered_contracts_count)
                // console.log('last_entered_contracts_count: ',last_entered_contracts_count)
                // console.log('diff: ', diff)
                // console.log('minimum_entered_contracts_between_swap: ', minimum_entered_contracts_between_swap)
                if(diff < minimum_entered_contracts_between_swap){
                    can_make_swap = false;
                    reason = 'You need to enter '+(minimum_entered_contracts_between_swap-diff)+' more contracts first'
                }
            }
            if(minimum_transactions_between_swap != 0){
                var diff = current_transaction_count - last_swap_transaction_count
                console.log('------------------------check_if_sender_can_make_swap-------------------------------')
                console.log('diff: ',diff)
                console.log('minimum_transactions_between_swap: ', minimum_transactions_between_swap)
                if(diff < minimum_transactions_between_swap){
                    can_make_swap = false;
                    reason = 'You need to make '+(minimum_transactions_between_swap-diff)+' more runs first'
                }
            }
            if(minimum_blocks_between_swap != 0){
                var diff = current_block - last_swap_block
                if(diff < minimum_blocks_between_swap){
                    can_make_swap = false
                    reason = 'You need to wait '+(minimum_blocks_between_swap-diff)+' more blocks'
                }
            }
            if(minimum_time_between_swap != 0){
                var diff = timestamp - last_swap_timestamp
                if(diff < minimum_time_between_swap){
                    can_make_swap = false
                    reason = 'You need to wait about '+(this.get_time_diff(minimum_time_between_swap-diff))+' first'
                }
            }
        }
        
        if(minimum_transactions_for_first_buy != 0){
            console.log('------------------------check_if_sender_can_make_swap-------------------------------')
            console.log('current_transaction_count: ',current_transaction_count)
            console.log('minimum_transactions_for_first_buy: ', minimum_transactions_for_first_buy)
            if(current_transaction_count < minimum_transactions_for_first_buy){
                can_make_swap = false
                reason = 'You need to make '+(minimum_transactions_for_first_buy-current_transaction_count)+' more runs first'
            }
        }
        if(minimum_entered_contracts_for_first_buy != 0){
            if(current_entered_contracts_count<minimum_entered_contracts_for_first_buy){
                can_make_swap = false
                reason = 'You need to enter '+(minimum_entered_contracts_for_first_buy-current_entered_contracts_count)+' more contracts first'
            }
        }
        


        return {can_make_swap:can_make_swap, reason: reason}
    }


    set_token(item){
        if(this.state.token_item['id'] != item['id']){
            this.setState({
                selected: 0, id:makeid(8), type:'buy-sell', entered_indexing_tags:['buy', 'mint', 'token'],
                new_mint_dump_action_page_tags_object: this.get_new_mint_dump_action_page_tags_object(),
                recipient_id:'', amount:0, token_item: {'balance':1, 'data':[[],[],[],[],[]], 'id':0}
            })
        }
        this.setState({token_item: item, e5: item['e5']})
    }


}




export default NewMintActionPage;