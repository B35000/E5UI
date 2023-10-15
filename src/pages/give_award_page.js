import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import NumberPicker from './../components/number_picker';
import TextInput from './../components/text_input';

import Letter from './../assets/letter.png';

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

class GiveAwardPage extends Component {
    
    state = {
        selected: 0,type:'award', id:makeid(8),
        post_item: null, give_award_title_tags_object:this.get_give_award_title_tags_object(),
        entered_indexing_tags:['give', 'award', 'reward'], entered_message_text: '', selected_tier:null, selected_tier_object: null, multiplier:1,
        exchange_id:'', price_amount:0, price_data:[], e5: this.props.app_state.selected_e5
    };

    get_give_award_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','message', 'award-tier', 'custom-amounts'], [1]
            ],
        };
    }

    set_post(item){
        this.setState({post_item: item, e5: item['e5']})
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>

                <div className="row">
                    <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                        <Tags page_tags_object={this.state.give_award_title_tags_object} tag_size={'l'} when_tags_updated={this.when_give_award_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'padding': '5px'}} onClick={()=>this.finish()}>
                            {this.render_detail_item('5', {'text':'Finish', 'action':''})}
                        </div>
                        
                    </div>
                </div>

                {this.render_everything()}

            </div>
        )
    }


    when_give_award_title_tags_object_updated(tag_obj){
        this.setState({give_award_title_tags_object: tag_obj})
    }


    render_everything(){
        if(this.state.post_item != null){
            var selected_item = this.get_selected_item(this.state.give_award_title_tags_object, this.state.give_award_title_tags_object['i'].active)

            if(selected_item == 'message'){
                return(
                    <div>
                        {this.render_post_part()}
                    </div>
                )
            }
            else if(selected_item == 'award-tier'){
                return(
                    <div>
                        {this.render_amounts()}
                    </div>
                )
            }
            else if(selected_item == 'custom-amounts'){
                return(
                    <div>
                        {this.render_custom_amounts()}
                    </div>
                )
            }
        }
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }


    render_post_part(){
        return(
            <div>
                {this.render_detail_item('3', {'title':'Message', 'details':'Add a award message for your new award. Mind the character limit.', 'size':'l'})}
                <div style={{height:10}}/>
                <TextInput height={60} placeholder={'This post is awesome blah blah blah...'} when_text_input_field_changed={this.when_message_input_filed_changed.bind(this)} text={this.state.entered_message_text} theme={this.props.theme}/>
                {this.render_detail_item('10',{'font':'Sans-serif', 'textsize':'10px','text':'remaining character count: '+(250 - this.state.entered_message_text.length)})}
                
                {this.render_detail_item('0')}
                {this.render_post_object(this.state.post_item)}

            </div>
        )
    }

    when_message_input_filed_changed(text){
        this.setState({entered_message_text: text})
    }


    render_post_object(object){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_post_item(object)
        return(
            <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 0px 0px '+card_shadow_color}}>
                <div style={{'padding': '5px 0px 5px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    format_post_item(object){
        var tags = object['ipfs'] == null ? ['Post'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`block ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }





    render_amounts(){
        var award_amount = this.state.award_amount
        return(
            <div>
                {this.render_detail_item('3', {'title':'Award Tiers', 'details':'Pick an award tier you wish to send to the post author', 'size':'l'})}
                {this.load_award_tiers()}


                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':'Total Amount', 'details':'The total amount of SPEND youll be including in the award', 'size':'l'})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l', 'title':'Total amount of SPEND', 'subtitle':this.format_power_figure(award_amount), 'barwidth':this.calculate_bar_width(award_amount), 'number':this.format_account_balance_figure(award_amount), 'barcolor':'', 'relativepower':'spend', })}
                </div>


                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':'Multiplier', 'details':'Multiply the award your sending to the post author', 'size':'l'})}

                <NumberPicker number_limit={999} when_number_picker_value_changed={this.when_multiplier.bind(this)} theme={this.props.theme} power_limit={3}/>

            </div>
        )
    }

    when_multiplier(number){
        if(number == 0) {
            this.setState({multiplier: bigInt(1)})
        }else{
            this.setState({multiplier: number})
        }
        this.set_award_amount(this.state.selected_tier)
    }


    load_award_tiers(){
        var items = this.get_award_tiers()
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden', 'scrollbar-width': 'none'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_tier_clicked(item, index)}>
                            {this.render_tier_element(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }


    get_award_tiers(){
        var tiers = [
            {'id':'1', 'label':{'title':'🌕🌕🌕', 'details':'Gold', 'size':'l'}},
            {'id':'2', 'label':{'title':'💎💎💎', 'details':'Diamond', 'size':'l'}},
            {'id':'3', 'label':{'title':'🪙🪙🪙', 'details':'Silver', 'size':'l'}},
            {'id':'4', 'label':{'title':'🛢️🛢️🛢️', 'details':'Oil', 'size':'l'}},
            {'id':'5', 'label':{'title':'🪵🪵🪵', 'details':'Wood', 'size':'l'}},
            {'id':'6', 'label':{'title':'🍺🍺🍺', 'details':'Beer', 'size':'l'}},
            {'id':'7', 'label':{'title':'🌽🌽🌽', 'details':'Corn', 'size':'l'}},
            {'id':'8', 'label':{'title':'🥩🥩🥩', 'details':'Beef', 'size':'l'}},
            {'id':'9', 'label':{'title':'🍫🍫🍫', 'details':'Chocolate', 'size':'l'}},
        ]

        return tiers
    }

    get_award_amount(tier){
        var spend_exchange = this.props.app_state.created_token_object_mapping[this.state.post_item['e5']][5]
        var min_amount = bigInt(spend_exchange['data'][1][0]).divide(bigInt(10000))
        var obj = {'1':5000, '2':1000, '3':600, '4':300, '5':100, '6':50, '7':10, '8':5, '9':1}
        return bigInt(obj[tier]).multiply(min_amount).multiply(this.state.multiplier)
    }


    render_tier_element(item, index){
        if(this.state.selected_tier == index){
            return(
                <div>
                    {this.render_detail_item('3', item['label'])}
                    <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '5px 0px 0px 0px'}}/>
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', item['label'])}
                </div>
            )
        }
    }


    when_tier_clicked(item, index){
        this.setState({selected_tier: index, selected_tier_object: item})
        this.set_award_amount(index)
    }


    set_award_amount(selected_tier){
        if(selected_tier != null){
            var award_amount = this.get_award_amount(this.get_award_tiers()[selected_tier]['id'])
            this.setState({award_amount: award_amount})
        }
    }







    render_custom_amounts(){
        return(
            <div>
                {this.render_detail_item('3', {'title':'Exchange ID', 'details':'Select an exchange by its id, then the desired amount and click add', 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Exchange ID'} when_text_input_field_changed={this.when_exchange_id_input_field_changed.bind(this)} text={this.state.exchange_id} theme={this.props.theme}/>

                {this.load_token_suggestions('exchange_id')}

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Amount', 'subtitle':this.format_power_figure(this.state.price_amount), 'barwidth':this.calculate_bar_width(this.state.price_amount), 'number':this.format_account_balance_figure(this.state.price_amount), 'barcolor':'', 'relativepower':'tokens', })}
                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_price_amount.bind(this)} theme={this.props.theme} power_limit={63}/>

                <div style={{'padding': '5px'}} onClick={() => this.when_add_price_set()}>
                    {this.render_detail_item('5', {'text':'Add Amount', 'action':''})}
                </div>

                <div style={{height: 10}}/>
                {this.render_set_prices_list_part()}
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
        var exchange_id = this.state.exchange_id.trim()
        var amount = this.state.price_amount
        if(isNaN(exchange_id) || parseInt(exchange_id) < 0 || exchange_id == ''){
            this.props.notify('please put a valid exchange id', 600)
        }
        else if(amount == 0){
            this.props.notify('please put a valid amount', 600)
        }
        else{
            var price_data_clone = this.state.price_data.slice()
            price_data_clone.push({'id':exchange_id, 'amount':amount})
            this.setState({price_data: price_data_clone});
            this.props.notify('added amount!', 400)
        }
    }


    render_set_prices_list_part(){
        var middle = this.props.height-300;
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
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
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
                            <li style={{'padding': '5px'}} onClick={()=>this.when_amount_clicked(item)}>
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':'Exchange ID: '+item['id'], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                </div>
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
        var exchanges_from_sync = this.props.app_state.created_tokens[this.state.e5]
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
            items.push({'id':sorted_token_exchange_data[i]['id'], 'label':{'title':sorted_token_exchange_data[i]['id'], 'details':sorted_token_exchange_data[i]['ipfs'].entered_title_text, 'size':'s'}})
        }

        return items;
    }

    when_price_suggestion_clicked(item, pos, target_type){
        this.setState({exchange_id: item['id']})
    }




    finish(){
        var selected_tier = this.state.selected_tier
        var message = this.state.entered_message_text.trim()
        if(selected_tier == null){
            this.props.notify('please pick an award tier', 700);
        }
        else if(message == '') {
            this.props.notify('You have to leave a message', 700);
        }
        else if(message.length < 5){
            this.props.notify('that message is too short', 700);
        }
        else if(message.length > 250){
            this.props.notify('that message is too long', 700);
        }
        else{
            this.props.add_award_transaction_to_stack(this.state)
            this.props.notify('Transaction added to stack', 700)
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

    get_number_width(number){
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
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
}




export default GiveAwardPage;