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

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Draggable } from "react-drag-reorder";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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

class TransferStakePage extends Component {
    
    state = {
        selected: 0, token_item: null, item:null,
        id: makeid(8), type: this.props.app_state.loc['3102']/* 'transfer-stake' */, 
        entered_indexing_tags:[this.props.app_state.loc['3102a']/* 'stake' */, this.props.app_state.loc['3100a']/* 'transfer' */, this.props.app_state.loc['3100b']/* 'ownership' */],
        new_transfer_stake_title_tags_object:this.new_transfer_stake_title_tags_object(), 
        
        recipient_id:'', proportion_amount:0, fractionalization_data:{},
    };


    new_transfer_stake_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['3102']/* 'transfer-stake' */], [1]
            ],
        };
    }

    set_token(item, object){
        this.setState({token_item: object, item: item, e5: object['e5']})
    }



    render(){
        return(
            <div style={{'padding':'10px 20px 0px 10px'}}>
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.new_transfer_stake_title_tags_object} tag_size={'l'} when_tags_updated={this.when_new_transfer_stake_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img alt="" className="text-end" onClick={()=>this.finish()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div>

                <div style={{'margin':'10px 0px 0px 0px'}}>
                    {this.render_everything()}   
                </div>
            </div>
        )
    }

    when_new_transfer_stake_title_tags_object_updated(tag_obj){
        this.setState({new_transfer_stake_title_tags_object: tag_obj})
    }



    render_everything(){
        var size = this.props.app_state.size
        if(this.state.token_item == null) return;
        if(size == 's'){
            return(
                <div>
                    {this.render_select_target_data()}
                    {this.render_detail_item('0')}
                    {this.render_set_recipients_list_part()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_select_target_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_recipients_list_part()}
                    </div>
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_select_target_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_recipients_list_part()}
                    </div>
                </div>
            )
        }
    }


    render_select_target_data(){
        const item = this.state.item
        const object = this.state.token_item

        const depth = item['ipfs']['depth_item']['depth']
        const depth_data = item['ipfs']['depth_item']['depth_data']
        const ipfs = item['ipfs']['depth_item']['ipfs']
        const event = item['ipfs']['depth_item']['event']
        const time = item['ipfs']['depth_item']['time']

        const data = item['ipfs']['model_data']
        const name = data['class_name']
        const maximum_supply = data['maximum_supply']
        const purchase_start_time = data['purchase_start_time']
        const purchase_end_time = data['purchase_end_time']
        
        const my_balance = item['balance']
        const my_stake = (my_balance / 10**18) * 100
        const posession_rights = (data['posession_rights']/ 10**18) * 100

        const remainder = this.get_remainder_as_proportion()
        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'15px', 'text':this.props.app_state.loc['3102b']/* 'Transfer some of your stake in this certificate to another account.' */})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':name, 'details':this.props.app_state.loc['3055ow']/* 'Class Name' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['3055pp']/* 'Your Fractionalized Stake.' */, 'subtitle':this.format_power_figure(my_stake), 'barwidth':this.calculate_bar_width(my_stake), 'number':(my_stake)+'%', 'relativepower':this.props.app_state.loc['1881']/* proportion */})}

                    {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['3102d']/* 'Remaining Stake after Set Transfers' */, 'subtitle':this.format_power_figure(remainder), 'barwidth':this.calculate_bar_width(remainder), 'number':(remainder)+'%', 'relativepower':this.props.app_state.loc['1881']/* proportion */})}

                    {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['3055ps']/* 'Posession Rights Proportion' */, 'subtitle':this.format_power_figure(posession_rights), 'barwidth':this.calculate_bar_width(posession_rights), 'number':(posession_rights)+'%', 'relativepower':this.props.app_state.loc['1881']/* proportion */})}
                </div>

                <div style={{height:10}}/> 
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3102c']/* 'Set a new recipient to receive a share of your fractionalized asset stake.' */, 'title':this.props.app_state.loc['1024']/* 'Recipient of action' */})}
                
                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1025']/* 'Recipient ID' */} when_text_input_field_changed={this.when_recipient_input_field_changed.bind(this)} text={this.state.recipient_id} theme={this.props.theme}/>
                {this.load_account_suggestions()}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3101f']/* 'Set the number of shares the set recipient will receive as a proportion of the total.' */, 'title':this.props.app_state.loc['3101e']/* 'Proportion of Shares.' */})}
                
                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.format_proportion(this.state.proportion_amount), 'details':this.props.app_state.loc['3101g']/* 'Fractionalized Proportion to Receive.' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_proportion_amount_proportion.bind(this)} power_limit={9} theme={this.props.theme} decimal_count={16} pick_with_text_area={true} text_area_hint={'5.3%'}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3101h']/* Set Proportion' */, 'details':this.props.app_state.loc['3101i']/* 'Set the share specified for the new recipient.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={()=>this.add_share_and_recipient()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3101j']/* 'Add Recipient' */, 'action':''})}
                </div>
            </div>
        )
    }

    when_recipient_input_field_changed(text){
        this.setState({recipient_id: text})
    }
    
    when_proportion_amount_proportion(number){
        this.setState({proportion_amount: number})
    }

    async add_share_and_recipient(){
        var recipient = await this.get_typed_alias_id(this.state.recipient_id.toString().trim())
        const proportion = this.state.proportion_amount
        const clone = structuredClone(this.state.fractionalization_data)
        const my_account = this.props.app_state.user_account_id[this.state.e5]
        if(isNaN(recipient) || parseInt(recipient) < 0 || recipient == ''){
            this.props.notify(this.props.app_state.loc['1030']/* 'Please put a valid account ID.' */, 2600)
        }
        else if(proportion == 0){
            this.props.notify(this.props.app_state.loc['3101k']/* 'You need to speficy a proportion.' */, 3600)
        }
        else if(this.get_remainder().lesserOrEquals(0)){
            this.props.notify(this.props.app_state.loc['3101m']/* 'You\'ve run out of shares to distribute.' */, 3600)
        }
        else{
            clone[recipient] = proportion
            this.setState({fractionalization_data: clone, recipient_id:''})
            this.props.notify(this.props.app_state.loc['3101l']/* 'recipient\'s proportion set.' */, 900)
        }
    }



    get_remainder(){
        const values = Object.values(this.state.fractionalization_data).concat(this.get_values_from_stack())
        var total = bigInt(0)
        values.forEach(proportion => {
            total = total.plus(proportion)
        });
        return bigInt(this.state.item['balance']).minus(total)
    }

    get_values_from_stack(){
        var stack_transactions = this.props.app_state.stack_items
        var values = []
        for(var i=0; i<stack_transactions.length; i++){
            if(
                stack_transactions[i].type == this.props.app_state.loc['3102']/* 'transfer-stake' */ &&
                stack_transactions[i].token_item['id'] == this.state.token_item['id'] && 
                stack_transactions[i].id != this.state.id && 
                stack_transactions[i].e5 == this.props.app_state.selected_e5 &&
                stack_transactions[i].item['ipfs']['depth_item']['depth'] == this.state.item['ipfs']['depth_item']['depth']
            ){
                values = values.concat(Object.values(stack_transactions[i].fractionalization_data))
            }
        }
        return values
    }

    get_remainder_as_proportion(){
        const my_balance = this.get_remainder()
        return (my_balance / 10**18) * 100
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





    render_set_recipients_list_part(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(Object.keys(this.state.fractionalization_data))

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{}}>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3101r']/* 'When you speicfy a recipient, it will show here.' */, 'title':this.props.app_state.loc['3101q']/* 'No set recipients' */})}
                    <div style={{height:10}}/>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                    <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                        <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
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
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3101p']/* 'The recipients of the new shares and their respective proportions.' */, 'title':this.props.app_state.loc['3101o']/* 'Your set recipients' */})}
                    <div style={{height:10}}/>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.reverse().map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_recipient_clicked(item)
                                    }}>
                                    <div style={{width:'100%', /* 'background-color':this.props.theme['send_receive_ether_background_color'] */}}>
                                        {this.render_recipient_item(item)}
                                    </div>
                                </SwipeableListItem>
                            </SwipeableList>
                            
                        ))}
                    </ul>
                </div>
            )
        }
        
    }

    render_recipient_item(item){
        const proportion = this.state.fractionalization_data[item]
        const alias = this.get_account_alias2(item) 
        const title = item + (alias == '' ? '' : ' • '+ alias)
        const details = this.format_proportion(proportion)
        return(
            <div>
                {this.render_detail_item('3', {'title':title, 'details':details, 'size':'l'})}
            </div>
        )
    }

    when_recipient_clicked(item){
        const clone = structuredClone(this.state.fractionalization_data)
        delete clone[item]
        this.setState({fractionalization_data: clone})
    }

    get_account_alias2(account_id){
        const alias = this.props.app_state.alias_bucket[this.state.e5][account_id]
        if(alias == null) return '';
        else return alias;
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
        var contacts = this.props.app_state.contacts[this.state.token_item['e5']]
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

    get_account_alias(account){
        var obj = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
        return obj[account] == null ? this.props.app_state.loc['1037a']/* 'Account' */: obj[account]
    }

    when_suggestion_clicked(item, pos){
        this.setState({recipient_id: item['id']})
    }






    finish(){
        this.props.add_transfer_stake_to_stack(this.state)
        this.setState({fractionalization_data: {}})
        this.props.notify(this.props.app_state.loc['18']/* 'transaction added to stack' */, 1600)
    }






    set_recipients_data = async () => {
        var recipients_data = await this.props.get_local_storage_data_if_enabled("transfer_data");
        if(recipients_data != null && recipients_data != ""){
            this.setState({recipients_data: recipients_data})
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




export default TransferStakePage;