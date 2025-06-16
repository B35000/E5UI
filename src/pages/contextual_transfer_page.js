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
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import NumberPicker from './../components/number_picker';
import TextInput from './../components/text_input';

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

function start_and_end(str) {
  if (str.length > 13) {
    return str.substr(0, 6) + '...' + str.substr(str.length-6, str.length);
  }
  return str;
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

class ContextualTransferPage extends Component {
    
    state = {
        selected: 0, get_title_tags_object:this.get_title_tags_object(), e5: this.props.app_state.selected_e5,

        identifier:'', exchange_id:'', price_amount:0, price_data:[], recipient_id:'',
        
        search_identifier:'', search_identifier_account:'', searches:[], search_identifier_recipient:'', pos:-1, selected_e5:this.props.app_state.selected_e5,

        identifier2:'', exchange_id2:'', price_amount2:0, price_data2:[], recipient_id2:'', transfer_recipient_id2:'', get_reocurring_tags_object:this.get_reocurring_tags_object(), entered_pdf_objects:[],
    };

    constructor(props) {
        super(props);
        this.amount_picker = React.createRef();
        this.amount_picker2 = React.createRef();
    }

    componentDidMount() {
        this.interval = setInterval(() => this.check_for_new_payments(), this.props.app_state.details_section_syncy_time);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    get_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['3068a']/* 'create-itransfer' */, this.props.app_state.loc['3068b']/* 'verify-itransfer' */ ], [1]
            ],
        };
    }

    get_title_tags_object_for_send_bill(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', this.props.app_state.loc['3068c']/* 'send-bill' */, ], [1]
            ],
        };
    }

    get_reocurring_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['3068ay']/* 'recurring-bill' */ ], [0]
            ],
        };
    }

    set_data(item){
        var me = this.props.app_state.user_account_id[this.props.app_state.selected_e5] == null ? '' : this.props.app_state.user_account_id[this.props.app_state.selected_e5].toString()
        if(me == '1') me = ''
        
        if(item == 'bills'){
            this.setState({selected:1, e5: this.props.app_state.selected_e5, search_identifier_recipient: me, transfer_recipient_id2: me, get_title_tags_object: this.get_title_tags_object_for_send_bill()})
        }else{
            this.setState({selected:1, e5: this.props.app_state.selected_e5, search_identifier_recipient: me, transfer_recipient_id2:me, get_title_tags_object: this.get_title_tags_object()})
        }
    }

    render(){
        if(this.state.selected == 0){
            return;
        }
        return(
            <div style={{'padding':'10px 15px 0px 15px'}}>
                <div className="row" style={{'width':'102%'}}>
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.get_title_tags_object} tag_size={'l'} when_tags_updated={this.when_get_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            {this.render_top_tag_bar_finish_button()}
                        </div>
                    </div>
                </div>

                {this.render_everything()}
            </div>
        )
    }

    render_top_tag_bar_finish_button(){
        var selected_item = this.get_selected_item(this.state.get_title_tags_object, 'e')
        if(selected_item == this.props.app_state.loc['3068a']/* 'create-itransfer' */){
            return(
                <div>
                    <img alt="" className="text-end" onClick={()=>this.finish_create_itransfer()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['3068c']/* 'send-bill' */){
            return(
                <div>
                    <img alt="" className="text-end" onClick={()=>this.finish_send_bill()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                </div>
            )
        }
    }

    when_get_title_tags_object_updated(tag_obj){
        this.setState({get_title_tags_object: tag_obj})
    }


    render_everything(){
        var selected_item = this.get_selected_item(this.state.get_title_tags_object, 'e')
        if(selected_item == this.props.app_state.loc['3068a']/* 'create-itransfer' */){
            return(
                <div>
                    {this.render_create_itransfer_ui()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['3068b']/* 'verify-itransfer' */){
            return(
                <div>
                    {this.verify_itransfer_ui()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['3068c']/* 'send-bill' */){
            return(
                <div>
                    {this.render_send_bill_ui()}
                </div>
            )
        }
    }





    render_create_itransfer_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_create_itransfer_data()}
                    {this.render_detail_item('0')}
                    {this.render_create_itransfer_data2()}
                    {this.render_set_prices_list_part()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_create_itransfer_data()}
                        {this.render_detail_item('0')}
                        {this.render_empty_views(4)}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_create_itransfer_data2()}
                        {this.render_set_prices_list_part()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_create_itransfer_data()}
                        {this.render_detail_item('0')}
                        {this.render_empty_views(4)}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_create_itransfer_data2()}
                        {this.render_set_prices_list_part()}
                    </div>
                </div>
                
            )
        }
    }

    render_create_itransfer_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3068d']/* 'iTransfer Identifier.' */, 'details':this.props.app_state.loc['3068e']/* 'Type a unique identifier for the transfers.' */, 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3068f']/* 'Unique Identifier...' */} when_text_input_field_changed={this.when_identifier_input_field_changed.bind(this)} text={this.state.identifier} theme={this.props.theme}/>
                {/* {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']+(this.props.app_state.iTransfer_identifier_size - this.state.identifier.length)})} */}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3068g']/* 'Set the recipient of the iTransfer action.' */, 'title':this.props.app_state.loc['1024']/* 'Recipient of action' */})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1025']/* 'Recipient ID' */} when_text_input_field_changed={this.when_recipient_input_field_changed.bind(this)} text={this.state.recipient_id} theme={this.props.theme}/>
                {this.load_account_suggestions('create_itransfer')}
                
            </div>
        )
    }

    render_create_itransfer_data2(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1180']/* 'Exchange ID' */, 'details':this.props.app_state.loc['1181']/* 'Select an exchange by its id, then the desired amount and click add.' */, 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1180']/* 'Exchange ID' */} when_text_input_field_changed={this.when_exchange_id_input_field_changed.bind(this)} text={this.state.exchange_id} theme={this.props.theme}/>

                {this.load_token_suggestions('create_itransfer')}

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1182']/* 'Amount' */, 'number':this.state.price_amount, 'relativepower':this.props.app_state.loc['1183']/* 'tokens' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1182']/* 'Amount' */, 'subtitle':this.format_power_figure(this.state.price_amount), 'barwidth':this.calculate_bar_width(this.state.price_amount), 'number':this.format_account_balance_figure(this.state.price_amount), 'barcolor':'', 'relativepower':this.props.app_state.loc['1183']/* 'tokens' */, })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} ref={this.amount_picker} font={this.props.app_state.font} number_limit={bigInt('1e'+(this.get_power_limit_for_exchange(this.state.exchange_id)+9))} when_number_picker_value_changed={this.when_price_amount.bind(this)} theme={this.props.theme} power_limit={this.get_power_limit_for_exchange(this.state.exchange_id)}/>

                <div style={{'padding': '5px'}} onClick={() => this.when_add_price_set()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1184']/* Add Amount' */, 'action':''})}
                </div>
                <div style={{height: 10}}/>
            </div>
        )
    }

    when_recipient_input_field_changed(text){
        this.setState({recipient_id: text})
    }

    when_identifier_input_field_changed(text){
        this.setState({identifier: text})
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

    when_exchange_id_input_field_changed(text){
        this.setState({exchange_id: text})
        this.reset_the_number_picker()
    }

    reset_the_number_picker(){
        var me = this;
        setTimeout(function() {
            if(me.amount_picker.current != null){
                me.amount_picker.current.reset_number_picker()
            }
        }, (1 * 1000));  
    }

    when_price_amount(amount){
        this.setState({price_amount: amount})
    }


    when_add_price_set(){
        var exchange_id = this.get_token_id_from_symbol(this.state.exchange_id.trim())
        var amount = this.state.price_amount
        const includes = this.state.price_data.find(e => e['id'] == exchange_id)
        if(isNaN(exchange_id) || parseInt(exchange_id) < 0 || exchange_id == '' || !this.does_exchange_exist(exchange_id)){
            this.props.notify(this.props.app_state.loc['1185']/* 'Please put a valid exchange ID.' */, 3600)
        }
        else if(amount == 0){
            this.props.notify(this.props.app_state.loc['1186']/* 'Please put a valid amount.' */, 3600)
        }
        else if(includes != null){
            this.props.notify(this.props.app_state.loc['3068aw']/* 'You cant use the same exchange twice.' */, 5600)
        }
        else{
            var price_data_clone = this.state.price_data.slice()
            price_data_clone.push({'id':exchange_id, 'amount':amount})
            this.setState({price_data: price_data_clone, exchange_id:'', price_amount:0});
            this.props.notify(this.props.app_state.loc['1187']/* 'Added amount.' */, 1400)
        }
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



    render_set_prices_list_part(){
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
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.reverse().map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_amount_clicked(item)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '5px'}}>
                                            <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                            </div>
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

    when_amount_clicked(item){
        var cloned_array = this.state.price_data.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({price_data: cloned_array})
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
            {'id':'3', 'label':{'title':'END', 'details':this.props.app_state.selected_e5, 'size':'s', 'image':this.props.app_state.e5s[this.props.app_state.selected_e5].end_image, 'img_size':30}},
            {'id':'5', 'label':{'title':'SPEND', 'details':this.props.app_state.selected_e5.replace('E', '3'), 'size':'s', 'image':this.props.app_state.e5s[this.props.app_state.selected_e5].spend_image, 'img_size':30}},
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

    when_price_suggestion_clicked(item, pos, target_type){
        if(target_type == 'create_itransfer'){
            this.setState({exchange_id: item['id']})
            this.reset_the_number_picker()
        }
        else if(target_type == 'create_bill'){
            this.setState({exchange_id2: item['id']})
            this.reset_the_number_picker2()
        }
    }




    load_account_suggestions(target_type){
        var items = [].concat(this.get_suggested_accounts())
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
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
        return return_array;
    }

    get_contact_alias(contact){
        return (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[contact['id']] == null ? ((contact['address'].toString()).substring(0, 9) + "...") : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[contact['id']])
    }

    get_account_alias(account){
        var obj = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
        return obj[account] == null ? this.props.app_state.loc['1037a']/* 'Account' */: obj[account]
    }

    when_suggestion_clicked(item, pos, target_type){
        if(target_type == 'create_itransfer'){
            this.setState({recipient_id: item['id']})
        }
        else if(target_type == 'create_bill'){
            this.setState({recipient_id2: item['id']})
        }
    }


    finish_create_itransfer(){
        var identifier = this.state.identifier.trim()
        var recipient = this.state.recipient_id.trim()
        var price_data = this.state.price_data

        if(isNaN(recipient)){
            recipient = this.get_recipient_id(recipient)
        }

        if(identifier == ''){
            this.props.notify(this.props.app_state.loc['3068o']/* 'You need to set an identifier first.' */, 6000)
        }
        // else if(identifier.length > this.props.app_state.iTransfer_identifier_size){
        //     this.props.notify(this.props.app_state.loc['3068p']/* 'That identifier is too long.' */, 6000)
        // }
        else if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(identifier) || /\p{Emoji}/u.test(identifier)){
            this.props.notify(this.props.app_state.loc['162m'], 4400)/* You cant use special characters. */
        }
        else if(isNaN(recipient) || parseInt(recipient) < 1000 || recipient == '' || recipient.includes('.')){
            this.props.notify(this.props.app_state.loc['3068u']/* You need to set the recipient account or alias for the iTransfer. */, 8700)
        }
        else if(price_data.length == 0){
            this.props.notify(this.props.app_state.loc['3068z']/* You need to add some transfers first. */, 8700)
        }
        else if(!this.check_if_sender_has_enough_balance_for_awards()){
            this.props.notify(this.props.app_state.loc['3068aa']/* 'One of your token balances is insufficient for the transfer amounts specified.' */, 6900)
        }
        else{
            var obj = {
                id:makeid(8), type:this.props.app_state.loc['3068ac']/* 'iTransfer' */,
                entered_indexing_tags:[this.props.app_state.loc['3068ae']/* 'transfer' */, this.props.app_state.loc['3068ac']/* 'iTransfer' */, this.props.app_state.loc['3068ad']/* 'send' */],
                e5:this.state.e5, recipient: recipient, price_data: price_data, identifier:identifier
            }
            this.props.add_itransfer_transaction_to_stack(obj)
            this.props.notify(this.props.app_state.loc['18']/* 'Transaction added to stack' */, 700)
            this.setState({identifier:'', price_data:[], recipient_id:''})
        }

    }

    check_if_sender_has_enough_balance_for_awards(){
        var has_enough = true
        var price_data = this.state.price_data
        for(var i=0; i<price_data.length; i++){
            var bounty_item_exchange = price_data[i]['id']
            var bounty_item_amount = price_data[i]['amount']
            var my_balance = this.props.calculate_actual_balance(this.props.app_state.selected_e5, bounty_item_exchange)
            my_balance = bigInt(my_balance).minus(this.get_debit_balance_in_stack(bounty_item_exchange, this.props.app_state.selected_e5))
            if(bigInt(my_balance).lesser(bigInt(bounty_item_amount))){
                has_enough = false
            }
        }
        return has_enough
    }

    get_debit_balance_in_stack(token_id, e5){
        var txs = this.props.app_state.stack_items
        var total_amount = bigInt(0)
        for(var i=0; i<txs.length; i++){
            var t = txs[i]
            if(txs[i].e5 == e5){
                if(txs[i].type == this.props.app_state.loc['946']/* 'buy-sell' */){
                    var amount = bigInt(txs[i].amount)
                    var exchange = t.token_item['id']
                    var action = this.get_action(t)
                    if(token_id == exchange && action == 1){
                        total_amount = bigInt(total_amount).add(amount)
                    }
                }
                else 
                if(txs[i].type == this.props.app_state.loc['1018']/* 'transfer' */){
                    if(txs[i].token_item['id'] == token_id){
                        total_amount = bigInt(total_amount).add(txs[i].debit_balance)
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['1499']/* 'direct-purchase' */){
                    for(var i=0; i<t.selected_variant['price_data'].length; i++){
                        var exchange = t.selected_variant['price_data'][i]['id']
                        var amount = this.get_amounts_to_be_paid(t.selected_variant['price_data'][i]['amount'], t.purchase_unit_count)
                        if(exchange == token_id){
                            total_amount = bigInt(total_amount).add(amount)
                        }
                    }
                    for(var i=0; i<t.storefront_item['ipfs'].shipping_price_data.length; i++){
                        var exchange = t.storefront_item['ipfs'].shipping_price_data[i]['id']
                        var amount = this.get_amounts_to_be_paid(t.storefront_item['ipfs'].shipping_price_data[i]['amount'], t.purchase_unit_count)
                        if(exchange == token_id){
                            total_amount = bigInt(total_amount).add(amount)
                        }
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['1155']/* 'award' */){
                    if(token_id == 5){
                        total_amount = bigInt(total_amount).add(t.award_amount)
                    }
                    for(var i=0; i<t.price_data.length; i++){
                        var exchange = t.price_data[i]['id']
                        var amount = t.price_data[i]['amount']
                        if(exchange == token_id){
                            total_amount = bigInt(total_amount).add(amount)
                        }
                    }
                }
                // else if(txs[i].type == this.props.app_state.loc['946']/* 'buy-sell' */){
                //     var buy_tokens = t.token_item['data'][3]
                //     var required_amounts = this.calculate_token_prices(t, t.token_item['data'][4])
                //     for(var i=0; i<buy_tokens.length; i++){
                //         var buy_token_id = buy_tokens[i]
                //         if(buy_token_id == token_id){
                //             var required_amount = required_amounts[i]
                //             total_amount = bigInt(total_amount).add(required_amount)
                //         }
                //     }
                // }
                // else if(txs[i].type == this.props.app_state.loc['1']/* 'enter-contract' */){
                //     var entry_tokens = t.contract_item['data'][2]
                //     var entry_amounts = t.contract_item['data'][3]
                //     for(var i=0; i<entry_tokens.length; i++){
                //         var entry_token_id = entry_tokens[i]
                //         if(entry_token_id == token_id){
                //             var required_amount = entry_amounts[i]
                //             total_amount = bigInt(total_amount).add(required_amount)
                //         }
                //     }
                // }
                // else if(txs[i].type == this.props.app_state.loc['312']/* 'proposal' */){
                //     for(var i = 0; i<t.bounty_values.length; i++){
                //         if(t.bounty_values[i]['exchange'] == token_id){
                //             var required_amount = t.bounty_values[i]['amount']
                //             total_amount = bigInt(total_amount).add(required_amount)
                //         }
                //     }
                // }
                // else if(txs[i].type == this.props.app_state.loc['862']/* 'pay-subscription' */){
                //     var entry_tokens = this.state.subscription_item['data'][2]
                //     var entry_fees = this.state.subscription_item['data'][3]
                //     for(var i=0; i<entry_tokens.length; i++){
                //         if(token_id == entry_tokens[i]){
                //             var required_amount = this.calculate_final_amount(entry_fees[i], t)
                //             total_amount = bigInt(total_amount).add(required_amount)
                //         }
                //     }
                // }
                // else if(txs[i].type == this.props.app_state.loc['2896']/* 'upcoming-subscriptions' */){
                //     var exchanges_used = t.data.exchanges_used
                //     var exchange_amounts = t.data.exchange_amounts
                //     for(var i=0; i<exchanges_used.length; i++){
                //         if(token_id == exchanges_used[i]){
                //             var required_amount = exchange_amounts[token_id]
                //             total_amount = bigInt(total_amount).add(required_amount)
                //         }
                //     }
                // }
            }
        }
        return total_amount
    }

    get_action(t){
        var action = this.get_selected_item(t.new_mint_dump_action_page_tags_object, 'e')
        var stack_action = 1
        if(action == this.props.app_state.loc['949']/* 'mint-buy' */) stack_action = 0
        return stack_action
    }
    
    get_amounts_to_be_paid(amount, count){
        return bigInt(amount).multiply(bigInt(count))
    }












    verify_itransfer_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_verify_itransfer_data()}
                    {this.render_detail_item('0')}
                    {this.render_search_history_and_itransfer_search_results()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_verify_itransfer_data()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_search_history_and_itransfer_search_results()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_verify_itransfer_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_search_history_and_itransfer_search_results()}
                    </div>
                </div>
                
            )
        }
    }

    render_verify_itransfer_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3068h']/* 'Verify iTransfer.' */, 'details':this.props.app_state.loc['3068i']/* 'Verify that a set of transfers with a given identifier have been made.' */, 'size':'l'})}
                <div style={{height:20}}/>



                {this.render_detail_item('4', {'text':this.props.app_state.loc['3068r']/* 'Set the identifier for the iTransfer your verifying.' */, 'textsize':'13px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3068f']/* 'Unique Identifier...' */} when_text_input_field_changed={this.when_search_identifier_input_field_changed.bind(this)} text={this.state.search_identifier} theme={this.props.theme}/>
                {/* {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']+(this.props.app_state.iTransfer_identifier_size - this.state.search_identifier_account.length)})} */}



                {this.render_detail_item('0')}
                {this.render_detail_item('4', {'text':this.props.app_state.loc['3068t']/* 'Set the recipient account of the iTransfer.' */, 'textsize':'13px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3068bf']/* 'Account ID...' */} when_text_input_field_changed={this.when_search_identifier_recipient_input_field_changed.bind(this)} text={this.state.search_identifier_recipient} theme={this.props.theme}/>



                {this.render_detail_item('0')}
                {this.render_detail_item('4', {'text':this.props.app_state.loc['3068s']/* 'Set the account ID or Alias that made the iTransfer.' */, 'textsize':'13px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3068j']/* 'Account ID (Optional)...' */} when_text_input_field_changed={this.when_search_identifier_account_input_field_changed.bind(this)} text={this.state.search_identifier_account} theme={this.props.theme}/>

                <div style={{height:20}}/>
                {this.load_preferred_e5_ui()}

                <div style={{height:15}}/>
                <div style={{'padding': '5px'}} onClick={() => this.perform_verify_itransfer_search()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3068k']/* Perform Search.' */, 'action':''})}
                </div>
                
            </div>
        )
    }

    render_search_history_and_itransfer_search_results(){
        return(
            <div>
                {this.load_search_history_objects()}
                <div style={{height:10}}/>
                {this.load_itransfer_search_results()}
            </div>
        )
    }

    when_search_identifier_input_field_changed(text){
        this.setState({search_identifier: text})
    }

    when_search_identifier_account_input_field_changed(text){
        this.setState({search_identifier_account: text})
    }

    when_search_identifier_recipient_input_field_changed(text){
        this.setState({search_identifier_recipient: text})
    }

    

    load_preferred_e5_ui(){
        var items = this.load_active_e5s()
        var items2 = [0, 1]
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_e5_clicked(item)}>
                            {this.render_e5_item(item)}
                        </li>
                    ))}
                    {items2.map(() => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_empty_horizontal_list_item2()}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    load_active_e5s(){
        var active_e5s = []
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]
            if(this.props.app_state.e5s[e5].active == true){
                active_e5s.push(e5)
            }
        }
        return active_e5s
    }

    render_empty_horizontal_list_item2(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div>
                <div style={{height:57, width:85, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                    </div>
                </div>
            </div>
        )
    }

    render_e5_item(item){
        var image = this.props.app_state.e5s[item].e5_img
        var details = this.props.app_state.e5s[item].token
        if(this.state.selected_e5 == item){
            return(
                <div>
                    {this.render_detail_item('12', {'title':item, 'image':image,'details':details, 'size':'s'})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('12', {'title':item, 'image':image, 'details':details, 'size':'s'})}
                </div>
            )
        }
    }

    when_e5_clicked(item){
        this.setState({selected_e5: item})
    }

    perform_verify_itransfer_search(){
        var identifier = this.state.search_identifier.trim()
        var account = this.state.search_identifier_account.trim()
        var recipient = this.state.search_identifier_recipient.trim()
        var e5 = this.state.selected_e5

        if(isNaN(recipient)){
            recipient = this.get_recipient_id(recipient)
        }

        if(isNaN(account)){
            account = this.get_recipient_id(account)
        }

        if(identifier == ''){
            this.props.notify(this.props.app_state.loc['3068o']/* 'You need to set an identifier first.' */, 6000)
        }
        // else if(identifier.length > this.props.app_state.iTransfer_identifier_size){
        //     this.props.notify(this.props.app_state.loc['3068p']/* 'That identifier is too long.' */, 6000)
        // }
        else if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(identifier) || /\p{Emoji}/u.test(identifier)){
            this.props.notify(this.props.app_state.loc['162m'], 4400)/* You cant use special characters. */
        }
        else if(account != '' && (isNaN(account) || parseInt(account) < 1000 || account.includes('.'))){
            this.props.notify(this.props.app_state.loc['3068v']/* That account youve specified isnt valid. */, 8700)
        }
        else if(isNaN(recipient) || parseInt(recipient) < 1000 || recipient == '' || recipient.includes('.')){
            this.props.notify(this.props.app_state.loc['3068be']/* You need to set a valid recipient that received the iTransfer. */, 8700)
        }
        else{
            this.props.notify(this.props.app_state.loc['3068q']/* 'Performing Search...' */, 4000)
            var clone = this.state.searches.slice()
            const includes = clone.find(e => (e['identifier'] == identifier && e['account']== account && e['recipient'] == recipient))
            var pos = -1
            if(includes == null){
                clone.push({'identifier':identifier, 'account':account, 'recipient':recipient, 'e5':e5})
                pos = clone.length-1
            }else{
                clone.forEach((element, index) => {
                    if(element['identifier'] == identifier && element['account'] == account && element['recipient'] == recipient && element['e5'] == e5){
                        pos = index
                    }
                });
            }
            this.setState({searches: clone, pos: pos})
            console.log('itransfer_data', identifier, account, recipient, e5)
            this.props.perform_itransfer_search(identifier, account, recipient, e5, false)
        }
    }

    get_recipient_id(recipient){
        var id = (this.props.app_state.alias_owners[this.state.e5][recipient] == null ? recipient : this.props.app_state.alias_owners[this.state.e5][recipient])
        return id
    }

    load_search_history_objects(){
        var items = [].concat(this.state.searches)
        var items2 = [0, 1, 2]
        if(items.length == 0){
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items2.map(() => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_empty_horizontal_list_item()}
                        </li>
                    ))}
                </ul>
            </div>
            )
        }
        return(
            <div>
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=> this.when_search_object_tapped(item)}>
                                {this.render_detail_item('3', {'title':item['recipient']+`, ${this.get_senders_name_or_you2(item['recipient'], item['e5'])}`, 'details':start_and_end(item['identifier']), 'size':'l', 'border_radius':'0%'},)}
                                {this.render_line_if_selected(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    render_line_if_selected(item){
        if(this.is_item_focused(item)){
            return(
                <div>
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }
    }

    is_item_focused(item){
        var pos = -1
        this.state.searches.forEach((element, index) => {
            if(element['identifier'] == item['identifier'] && element['account'] == item['account'] && element['recipient'] == item['recipient'] && element['e5'] == item['e5']){
                pos = index
            }
        });
        
        return pos == this.state.pos
    }

    when_search_object_tapped(item){
        var pos = -1
        this.state.searches.forEach((element, index) => {
            if(element['identifier'] == item['identifier'] && element['account'] == item['account'] && element['recipient'] == item['recipient'] && element['e5'] == item['e5']){
                pos = index
            }
        });
        this.setState({pos: pos})
        this.props.perform_itransfer_search(item['identifier'], item['account'], item['recipient'], item['e5'], true)
    }

    load_itransfer_search_results(){
        var items = [].concat(this.load_itransfer_result_items())
        if(items.length == 0){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }else{
            var pos = this.state.pos
            var selected_search = this.state.searches[pos]
            var identifier = selected_search['identifier']
            var recipient = selected_search['recipient']
            var e5 = selected_search['e5']
            var recpient_name = this.get_senders_name_or_you(recipient, e5)
            return(
                <div>
                    {items.map((item, index) => (
                        <div key={index}>
                            {this.render_itransfer_item(item)}
                        </div>
                    ))}
                </div>
            )
        }
    }

    get_senders_name_or_you(sender, e5){
        if(sender == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* You. */
        }
        var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
        return alias
    }

    get_senders_name_or_you2(sender, e5){
        if(sender == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* You. */
        }
        var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? this.props.app_state.loc['1591']/* Unknown */ : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
        return alias
    }

    render_empty_horizontal_list_item(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div>
                <div style={{height:50, width:85, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                    </div>
                </div>
            </div>
        )
    }

    load_itransfer_result_items(){
        var pos = this.state.pos
        if(pos == -1) return []

        var selected_search = this.state.searches[pos]
        var key = selected_search['identifier'] + selected_search['account'] + selected_search['recipient'] + selected_search['e5']
        var object = this.props.app_state.searched_itransfer_results[key]
        console.log('itransfer_data', object)
        if(object == null) return []

        var blocks = Object.keys(object)
        var object_array = []
        blocks.forEach(block => {
            var sender_accounts = Object.keys(object[block])
            sender_accounts.forEach(account => {
                var transfers = this.process_transfers(object[block][account])
                var time = object[block][account][0].returnValues.p5/* timestamp */
                object_array.push({'account':account, 'block':block, 'transfers':transfers, 'time':time, 'e5':selected_search['e5']})
            });
        });

        return this.sortByAttributeDescending(object_array, 'time')
    }

    process_transfers(transfers){
        var obj = {}
        transfers.forEach(transfer => {
            var exchange = transfer.returnValues.p1
            var amount = transfer.returnValues.p4/* amount */
            var depth = transfer.returnValues.p7/* depth */
            if(obj[exchange] == null){
                obj[exchange] = bigInt('0')
            }
            var actual_amount = this.get_actual_number(amount, depth)
            obj[exchange] = bigInt(obj[exchange]).plus(bigInt(actual_amount))
        });

        var exchange_transfers = Object.keys(obj)
        var final_transfers = []
        exchange_transfers.forEach(key => {
            final_transfers.push({'amount':obj[key], 'exchange':key})
        });

        return final_transfers
    }

    get_actual_number(number, depth){
        var p = (bigInt(depth).times(72)).toString().toLocaleString('fullwide', {useGrouping:false})
        var depth_vaule = bigInt(('1e'+p))
        return (bigInt(number).times(depth_vaule)).toString().toLocaleString('fullwide', {useGrouping:false})
    }

    render_itransfer_item(item){
        var alias = this.get_senders_name_or_you2(item['account'], item['e5'])
        return(
            <div>
                {this.render_detail_item('3', {'title':alias, 'details':item['account'], 'size':'l', 'border_radius':'0%'},)}
                <div style={{height: 3}}/>

                {/* {this.render_detail_item('3', {'title':number_with_commas(item['block']), 'details':this.props.app_state.loc['3068x'] Block Number, 'size':'l', 'border_radius':'0%'},)}
                <div style={{height: 3}}/> */}

                {this.render_detail_item('3', {'title':''+(new Date(item['time']*1000)), 'details':this.get_time_diff((Date.now()/1000) - (parseInt(item['time'])))+this.props.app_state.loc['1698a']/* ' ago' */, 'size':'l'})}
                <div style={{height: 3}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['view_group_card_item_background'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    <div style={{'margin':'0px 0px 0px 5px'}}>
                        {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'12px','text':this.props.app_state.loc['3068y']/* All Transfers */})}
                    </div>

                    {item['transfers'].map((transfer, index) => (
                        <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['1182']/* 'Amount' */, 'number':transfer['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[transfer['exchange']]})}>
                            {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(transfer['amount']), 'number':this.format_account_balance_figure(transfer['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[transfer['exchange']], })}
                        </div>
                    ))}
                </div>
                {this.render_detail_item('0')}
            </div>
        )
    }

    check_for_new_payments(){
        if(this.state.pos != -1){
            var item = this.state.searches[this.state.pos]
            this.props.perform_itransfer_search(item['identifier'], item['account'], item['recipient'], item['e5'], true)
        }
    }









    render_send_bill_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_send_bill_data()}
                    {this.render_detail_item('0')}
                    {this.render_amount_picker_ui()}
                    {this.render_set_prices_list_part2()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_send_bill_data()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_amount_picker_ui()}
                        {this.render_set_prices_list_part2()}
                    </div>
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_send_bill_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_amount_picker_ui()}
                        {this.render_set_prices_list_part2()}
                    </div>
                </div>
                
            )
        }
    }

    render_send_bill_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3068l']/* 'Bill Identifier.' */, 'details':this.props.app_state.loc['3068m']/* 'Type a unique identifier for the bill.' */, 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3068f']/* 'Unique Identifier...' */} when_text_input_field_changed={this.when_identifier2_input_field_changed.bind(this)} text={this.state.identifier2} theme={this.props.theme}/>
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']+(this.props.app_state.iTransfer_identifier_size - this.state.identifier2.length)})}
                
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3068n']/* 'Set the recipient for the bill.' */, 'title':this.props.app_state.loc['1024']/* 'Recipient of action' */})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1025']/* 'Recipient ID' */} when_text_input_field_changed={this.when_recipient2_input_field_changed.bind(this)} text={this.state.recipient_id2} theme={this.props.theme}/>
                {this.load_account_suggestions('create_bill')}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3068aq']/* 'Set the account that will receive the payments when the bill is fulfilled by the recipient.' */, 'title':this.props.app_state.loc['3068ap']/* 'Transfer Recipient.' */})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3068ar']/* 'Transfer Receiver ID' */} when_text_input_field_changed={this.when_transfer_recipient_id2_input_field_changed.bind(this)} text={this.state.transfer_recipient_id2} theme={this.props.theme}/>
                {this.load_account_suggestions('create_bill')}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3068ba']/* 'Specify if the bill is to be paid periodically.' */, 'title':this.props.app_state.loc['3068az']/* 'Reocurring Bill' */})}
                <div style={{height:10}}/>

                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_reocurring_tags_object} tag_size={'l'} when_tags_updated={this.when_get_reocurring_tags_object_updated.bind(this)} theme={this.props.theme}/>
                


                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3068bg']/* 'Attach some pdf documents to the bill.' */, 'title':this.props.app_state.loc['3068bh']/* 'Attach PDFs.' */})}
                {this.render_create_pdf_ui_buttons_part()}
                {this.render_selected_files()}
                <div style={{height:10}}/>
            </div>
        )
    }

    render_create_pdf_ui_buttons_part(){
        return(
        <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '5px 5px 5px 10px', width: '99%'}}>
            <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                <img alt="" src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} onClick={() => this.props.show_pick_file_bottomsheet('pdf', 'create_pdf', 10**16)}/>
            </div>
        </div>
      )
    }

    when_pdf_files_picked(files){
        var clonedArray = this.state.entered_pdf_objects == null ? [] : this.state.entered_pdf_objects.slice();
        files.forEach(file => {
            clonedArray.push(file);
        });
        this.setState({entered_pdf_objects: clonedArray});
    }

    render_selected_files(){
        var items = this.state.entered_pdf_objects
        if(items.length == 0){
            items = [1, 2, 3]
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden', 'scrollbar-width': 'none'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                <div style={{height:47, width:97, 'background-color': this.props.theme['card_background_color'], 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={() => this.when_selected_file_tapped(index)}>
                            {this.render_uploaded_file(this.get_cid_split(item), index, true)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    when_selected_file_tapped(index){
        var cloned_array = this.state.entered_pdf_objects.slice()
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_pdf_objects: cloned_array})
    }

    get_cid_split(ecid){
        var split_cid_array = ecid.split('_');
        var filetype = split_cid_array[0]
        var cid_with_storage = split_cid_array[1]
        var cid = cid_with_storage
        var storage = 'ch'
        if(cid_with_storage.includes('.')){
            var split_cid_array2 = cid_with_storage.split('.')
            cid = split_cid_array2[0]
            storage = split_cid_array2[1]
        }

        return{'filetype':filetype, 'cid':cid, 'storage':storage, 'full':ecid}
    }

    render_uploaded_file(ecid_obj, index, minified){
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        if(data != null){
            if(data['type'] == 'pdf'){
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
                var title = data['name']
                var size = 'l'
                var thumbnail = data['thumbnail']
                 if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    size = 's'
                }
                return(
                    <div>
                        {this.render_detail_item('8', {'details':details,'title':title, 'size':size, 'image':thumbnail, 'border_radius':'15%'})}
                    </div>
                )
            }
        }
    }

    format_data_size(size){
        if(bigInt(size).greater(bigInt(1024).pow(8))){
            var mod = bigInt(size).mod(bigInt(1024).pow(8)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(8)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'YBs'}
        }
        else if(bigInt(size).greater(bigInt(1024).pow(7))){
            var mod = bigInt(size).mod(bigInt(1024).pow(7)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(7)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'ZBs'}
        }
        else if(bigInt(size).greater(bigInt(1024).pow(6))){
            var mod = bigInt(size).mod(bigInt(1024).pow(6)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(6)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'EBs'}
        }
        else if(bigInt(size).greater(bigInt(1024).pow(5))){
            var mod = bigInt(size).mod(bigInt(1024).pow(5)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(5)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'PBs'}
        }
        else if(size > (1024^4)){
            return {'size':Math.round(size/(1024^4)), 'unit':'TBs'}
        }
        else if(size > (1024^3)){
            return {'size':Math.round(size/(1024^3)), 'unit':'GBs'}
        }
        else if(size > (1024^2)){
            return {'size':Math.round(size/(1024^2)), 'unit':'MBs'}
        }
        else if(size > 1024){
            return {'size':Math.round(size/1024), 'unit':'KBs'}
        }
        else{
            return {'size':size, 'unit':'bytes'}
        }
    }


    render_amount_picker_ui(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1180']/* 'Exchange ID' */, 'details':this.props.app_state.loc['1181']/* 'Select an exchange by its id, then the desired amount and click add.' */, 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1180']/* 'Exchange ID' */} when_text_input_field_changed={this.when_exchange_id2_input_field_changed.bind(this)} text={this.state.exchange_id2} theme={this.props.theme}/>

                {this.load_token_suggestions('create_bill')}

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1182']/* 'Amount' */, 'number':this.state.price_amount2, 'relativepower':this.props.app_state.loc['1183']/* 'tokens' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1182']/* 'Amount' */, 'subtitle':this.format_power_figure(this.state.price_amount2), 'barwidth':this.calculate_bar_width(this.state.price_amount2), 'number':this.format_account_balance_figure(this.state.price_amount2), 'barcolor':'', 'relativepower':this.props.app_state.loc['1183']/* 'tokens' */, })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} ref={this.amount_picker2} font={this.props.app_state.font} number_limit={bigInt('1e'+(this.get_power_limit_for_exchange(this.state.exchange_id)+9))} when_number_picker_value_changed={this.when_price_amount2.bind(this)} theme={this.props.theme} power_limit={this.get_power_limit_for_exchange(this.state.exchange_id2)}/>

                <div style={{'padding': '5px'}} onClick={() => this.when_add_price_set2()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1184']/* Add Amount' */, 'action':''})}
                </div>
                <div style={{height: 10}}/>
            </div>
        )
    }

    when_recipient2_input_field_changed(text){
        this.setState({recipient_id2: text})
    }

    when_identifier2_input_field_changed(text){
        this.setState({identifier2: text})
    }

    when_transfer_recipient_id2_input_field_changed(text){
        this.setState({transfer_recipient_id2: text})
    }

    when_get_reocurring_tags_object_updated(tag_obj){
        this.setState({get_reocurring_tags_object: tag_obj})
    }


    when_exchange_id2_input_field_changed(text){
        this.setState({exchange_id2: text})
        this.reset_the_number_picker2()
    }

    reset_the_number_picker2(){
        var me = this;
        setTimeout(function() {
            if(me.amount_picker2.current != null){
                me.amount_picker2.current.reset_number_picker()
            }
        }, (1 * 1000));  
    }

    when_price_amount2(amount){
        this.setState({price_amount2: amount})
    }

    when_add_price_set2(){
        var exchange_id = this.get_token_id_from_symbol(this.state.exchange_id2.trim())
        var amount = this.state.price_amount2
        const includes = this.state.price_data2.find(e => e['id'] == exchange_id)

        if(isNaN(exchange_id) || parseInt(exchange_id) < 0 || exchange_id == '' || !this.does_exchange_exist(exchange_id)){
            this.props.notify(this.props.app_state.loc['1185']/* 'Please put a valid exchange ID.' */, 3600)
        }
        else if(amount == 0){
            this.props.notify(this.props.app_state.loc['1186']/* 'Please put a valid amount.' */, 3600)
        }
        else if(includes != null){
            this.props.notify(this.props.app_state.loc['3068aw']/* 'You cant use the same exchange twice.' */, 5600)
        }
        else{
            var price_data_clone = this.state.price_data2.slice()
            price_data_clone.push({'id':exchange_id, 'amount':amount})
            this.setState({price_data2: price_data_clone, exchange_id2:'', price_amount2:0});
            this.props.notify(this.props.app_state.loc['1187']/* 'Added amount.' */, 1400)
        }
    }


    render_set_prices_list_part2(){
        var middle = this.props.height-300;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.price_data2)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{}}>
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
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.reverse().map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_amount_clicked2(item)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '5px'}}>
                                            <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                            </div>
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

    when_amount_clicked2(item){
        var cloned_array = this.state.price_data2.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({price_data2: cloned_array})
    }

    finish_send_bill(){
        var identifier = this.state.identifier2.trim()
        var recipient = this.state.recipient_id2.trim()
        var transfer_recipient = this.state.transfer_recipient_id2.trim()
        var price_data = this.state.price_data2
        var entered_pdf_objects = this.state.entered_pdf_objects
        var my_id = this.props.app_state.user_account_id[this.state.e5]

        if(isNaN(recipient)){
            recipient = this.get_recipient_id(recipient)
        }
        if(isNaN(transfer_recipient)){
            transfer_recipient = this.get_recipient_id(transfer_recipient)
        }

        if(identifier == ''){
            this.props.notify(this.props.app_state.loc['3068o']/* 'You need to set an identifier first.' */, 6000)
        }
        else if(identifier.length > this.props.app_state.iTransfer_identifier_size){
            this.props.notify(this.props.app_state.loc['3068p']/* 'That identifier is too long.' */, 6000)
        }
        else if(isNaN(recipient) || parseInt(recipient) < 1000 || recipient == '' || recipient.includes('.')){
            this.props.notify(this.props.app_state.loc['3068as']/* You need to set the recipient for the bill. */, 8700)
        }
        else if(isNaN(transfer_recipient) || parseInt(transfer_recipient) < 1000 || transfer_recipient == '' || transfer_recipient.includes('.')){
            this.props.notify(this.props.app_state.loc['3068at']/* You need to set a valid account for the recipient of the payments. */, 8700)
        }
        else if(recipient == my_id){
            this.props.notify(this.props.app_state.loc['3068av']/* You cant send a bill to yourself. */, 8700)
        }
        else if(price_data.length == 0){
            this.props.notify(this.props.app_state.loc['3068z']/* You need to add some transfers first. */, 8700)
        }
        else{
            var selected_obj = this.get_selected_item(this.state.get_reocurring_tags_object, 'e')
            var recurring_enabled = selected_obj == this.props.app_state.loc['3068ay']/* 'recurring-bill' */
            var obj = {
                id:makeid(8), type:this.props.app_state.loc['3068af']/* 'bill' */,
                entered_indexing_tags:[this.props.app_state.loc['3068ag']/* 'request' */, this.props.app_state.loc['3068af']/* 'bill' */, this.props.app_state.loc['3068ah']/* 'payment' */],
                e5:this.state.e5, recipient: recipient, price_data: price_data, identifier:identifier, transfer_recipient: transfer_recipient, recurring_enabled: recurring_enabled, entered_pdf_objects: entered_pdf_objects
            }
            this.props.add_bill_transaction_to_stack(obj)
            this.props.notify(this.props.app_state.loc['18']/* 'Transaction added to stack' */, 700)
            this.setState({identifier2:'', price_data2:[]})
        }
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
                                    <img alt="" src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var uploaded_data = {}
        if(item_id == '8' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12')uploaded_data = this.props.app_state.uploaded_data
        return(
            <div>
                <ViewGroups uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
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

    get_number_width(number){
        if(number == null) return '0%'
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
    }

    add_recipients_to_memory(stack_items){
        var recipient_acc_ids = this.get_recipients_from_memory()
        stack_items.forEach(item => {
            var recipient = item['recipient']
            if(!recipient_acc_ids.includes(recipient)) recipient_acc_ids.push(recipient);
        });

        var trimmed = recipient_acc_ids.slice(-7)
        var obj = {'data':trimmed}
        localStorage.setItem("transfer_data", JSON.stringify(obj));
    }

    get_recipients_from_memory(){
        return localStorage.getItem("transfer_data") == null ? [] : JSON.parse(localStorage.getItem("transfer_data"))['data']
    }


}




export default ContextualTransferPage;