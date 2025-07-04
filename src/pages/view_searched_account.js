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
import TextInput from './../components/text_input';
// import Letter from './../assets/letter.png'; 
import Linkify from "linkify-react";

import EndImg from './../assets/end_token_icon.png';
import SpendImg from './../assets/spend_token_icon.png';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function start_and_end(str) {
  if (str.length > 35) {
    return str.substr(0, 20) + '...' + str.substr(str.length-10, str.length);
  }
  return str;
}

class SearchedAccountPage extends Component {
    
    state = {
        selected: 0, searched_account: null, searched_account_id:0,
        searched_account_page_tags_object: this.get_searched_account_page_tags_object(),
        typed_search_exchange_id:'', searched_exchange:'', typed_search_id:{},
        get_account_balance_history_tag_object:this.get_account_balance_history_tag_object()
    };

    constructor(props) {
        super(props);
        this.creations_ref = React.createRef();
        this.withdraws_ref = React.createRef();
        this.pending_withdraws_ref = React.createRef();
        this.runs_ref = React.createRef();
        this.payments_ref = React.createRef();
        this.cancellations_ref = React.createRef();
        this.entries_ref = React.createRef();
        this.exits_ref = React.createRef();
        this.votes_ref = React.createRef();
        this.swaps_ref = React.createRef();
        this.transfers_ref = React.createRef();
        this.activity_ref = React.createRef();
    }

    get_searched_account_page_tags_object(){
        var obj = {
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e','e.'+this.props.app_state.loc['1699']/* 'e.main-data' */,'e.'+this.props.app_state.loc['1700']/* 'e.subscription-data' */,'e.'+this.props.app_state.loc['1701']/* 'e.contract-data' */,'e.'+this.props.app_state.loc['1702']/* 'e.exchange-data' */], [0]
            ],
            'main-data':[
              ['xor','',0], [this.props.app_state.loc['1699']/* 'main-data' */ ,this.props.app_state.loc['1703']/* 'creations' */, this.props.app_state.loc['1770i']/* 'activity' */,this.props.app_state.loc['1704']/* 'withdraws' */,this.props.app_state.loc['1705']/* 'pending-withdraws' */,this.props.app_state.loc['1706']/* 'runs' */], [1],[1]
            ],
            'subscription-data':[
              ['xor','',0], [this.props.app_state.loc['1700']/* 'subscription-data' */,this.props.app_state.loc['1707']/* 'payments' */,this.props.app_state.loc['1708']/* cancellations' */], [1],[1]
            ],
            'contract-data':[
              ['xor','',0], [this.props.app_state.loc['1701']/* 'contract-data' */,this.props.app_state.loc['1709']/* 'entries' */,this.props.app_state.loc['1710']/* 'exits' */,this.props.app_state.loc['1711']/* 'votes' */], [1],[1]
            ],
            'exchange-data':[
              ['xor','',0], [this.props.app_state.loc['1702']/* 'exchange-data' */,this.props.app_state.loc['1712']/* 'swaps' */,this.props.app_state.loc['1713']/* 'transfers' */], [1],[1]
            ],
        };

        obj[this.props.app_state.loc['1699']/* 'main-data' */] = [
              ['xor','',0], [this.props.app_state.loc['1699']/* 'main-data' */ ,this.props.app_state.loc['1703']/* 'creations' */, this.props.app_state.loc['1770i']/* 'activity' */,this.props.app_state.loc['1704']/* 'withdraws' */,this.props.app_state.loc['1705']/* 'pending-withdraws' */,this.props.app_state.loc['1706']/* 'runs' */], [1],[1]
            ]
        obj[this.props.app_state.loc['1700']/* 'subscription-data' */] = [
              ['xor','',0], [this.props.app_state.loc['1700']/* 'subscription-data' */,this.props.app_state.loc['1707']/* 'payments' */,this.props.app_state.loc['1708']/* cancellations' */], [1],[1]
            ]
        obj[this.props.app_state.loc['1701']/* 'contract-data' */] = [
              ['xor','',0], [this.props.app_state.loc['1701']/* 'contract-data' */,this.props.app_state.loc['1709']/* 'entries' */,this.props.app_state.loc['1710']/* 'exits' */,this.props.app_state.loc['1711']/* 'votes' */], [1],[1]
            ]
        obj[this.props.app_state.loc['1702']/* 'exchange-data' */] = [
              ['xor','',0], [this.props.app_state.loc['1702']/* 'exchange-data' */,this.props.app_state.loc['1712']/* 'swaps' */,this.props.app_state.loc['1713']/* 'transfers' */], [1],[1]
            ]


        return obj
    }

    get_account_balance_history_tag_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1770a']/* 'balances' */,this.props.app_state.loc['1770b']/* 'income' */, this.props.app_state.loc['1770h']/* 'expenditure' */], [1]
            ],
        };
    }



    set_searched_item(item, searched_id){
        this.setState({searched_account: item, searched_account_id: searched_id, searched_account_page_tags_object: this.get_searched_account_page_tags_object()})

        var me = this;
        setTimeout(function() {
            me.set_default_balance_year()
        }, (1 * 700));
    }








    render(){
        var selected_item = this.get_selected_item(this.state.searched_account_page_tags_object, this.state.searched_account_page_tags_object['i'].active)
        var f = 110
        if(selected_item == this.props.app_state.loc['1705']/* 'pending-withdraws' */ || selected_item == 'e' || selected_item == this.props.app_state.loc['1770i']/* 'activity' */){
            f = 90
        }

        f+=60

        if(this.state.searched_account == null){
            return(
                <div style={{'padding':'10px 10px 0px 10px'}}>
                    {this.render_empty_everything()}
                </div>
            )
        }
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.searched_account_page_tags_object} tag_size={'l'} when_tags_updated={this.when_searched_account_page_tags_object_updated.bind(this)} theme={this.props.theme}/>
                {this.render_search_tabs()}
                <div style={{'margin':'0px 0px 0px 0px', overflow: 'auto', maxHeight: this.props.height-f}}>
                    {this.render_everything()}
                </div>
            </div>
        )
    }

    when_searched_account_page_tags_object_updated(tag_obj){
        this.setState({searched_account_page_tags_object: tag_obj})
        var me = this;
        setTimeout(function() {
            me.update_scroll_position()
        }, (1 * 10));
    }

    render_search_tabs(){
        var items = this.get_searched_accounts()
        if(items.length == 0){
            items = [1, 2, 3]
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_empty_horizontal_list_item2()}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }else{
            var items2 = [0, 1]
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_searched_account_item(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_empty_horizontal_list_item2(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div>
                <div style={{height:43, width:90, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                    </div>
                </div>
            </div>
        )
    }

    get_searched_accounts(){
        var keys = Object.keys(this.props.app_state.searched_accounts_data)
        var items = []
        keys.forEach(key => {
            items = items.concat(this.props.app_state.searched_accounts_data[key])
        });

        return items
    }

    render_searched_account_item(item){
        var details = item['alias'] == 'Unknown' ? this.truncate(item['address'], 23) : item['alias']
        var title = item['id']
        var image = this.props.app_state.e5s[item['e5']].e5_img

        if(this.state.searched_account['id'] == item['id'] && this.state.searched_account['e5'] == item['e5']){
            return(
                <div onClick={() => this.props.when_searched_account_reclicked(item, item['id'])}>
                    {this.render_detail_item('14', {'title':title, 'image':image, 'details':details, 'size':'s', 'img_size':30})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }
        return(
            <div onClick={() => this.props.when_searched_account_reclicked(item, item['id'])}>
                {this.render_detail_item('14', {'title':title, 'image':image, 'details':details, 'size':'s', 'img_size':30})}
            </div>
        )
    }

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }


    render_empty_everything(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(2)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(2)}
                    </div>
                </div>
                
            )
        }
    }




    render_everything(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_search_bar()}
                    
                    {this.render_content()}
                    {this.render_search_account_balances_ui()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_search_bar()}
                        {this.render_content()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_search_account_balances_ui()}
                       
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_search_bar()}
                        {this.render_content()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_search_account_balances_ui()}
                        
                    </div>
                </div>
                
            )
        }
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

    render_content(){
        var selected_item = this.get_selected_item(this.state.searched_account_page_tags_object, this.state.searched_account_page_tags_object['i'].active)

        if(this.state.searched_account == null) return;

        if(selected_item == 'e'){
            return(
                <div>
                    {this.render_main_page_data()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1703']/* 'creations' */){
            return(
                <div>
                    {this.render_created_items()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1770i']/* 'activity' */){
            return(
                <div>
                    {this.render_activity_items()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1704']/* 'withdraws' */){
            return(
                <div>
                    {this.render_withdraws_item_logs()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1705']/* 'pending-withdraws' */){
            return(
                <div>
                    {this.render_pending_withdraws_item_logs()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1706']/* 'runs' */){
            return(
                <div>
                    {this.render_transactions_item_logs()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1707']/* 'payments' */){
            return(
                <div>
                    {this.render_pay_subscription_item_logs()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1708']/* 'cancellations' */){
            return(
                <div>
                    {this.render_cancellations_item_logs()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1709']/* 'entries' */){
            return(
                <div>
                    {this.render_entry_item_logs()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1710']/* 'exits' */){
            return(
                <div>
                    {this.render_exit_item_logs()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1711']/* 'votes' */){
            return(
                <div>
                    {this.render_vote_item_logs()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1712']/* 'swaps' */){
            return(
                <div>
                    {this.render_swap_item_logs()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1713']/* 'transfers' */){
            return(
                <div>
                    {this.render_transfers_item_logs()}
                </div>
            )
        }
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }

    render_search_bar(){
        var selected_item = this.get_selected_item(this.state.searched_account_page_tags_object, this.state.searched_account_page_tags_object['i'].active)
        var search_id_text = this.state.typed_search_id[selected_item]
        if(search_id_text == null) search_id_text = ''
        var obj = {'creations':'Title','withdraws':'Address','runs':'Transaction ID', 'payments':'Subscription ID','cancellations':'Subscription ID', 'entries':'Contract ID','exits':'Contract ID','votes':'Contract ID', 'swaps':'Exchange ID','transfers':'Account ID'}

        obj[this.props.app_state.loc['1703']/* creations */] = 'Title'
        obj[this.props.app_state.loc['1704']/* withdraws */] = 'Address'
        obj[this.props.app_state.loc['1706']/* runs */] = 'Transaction ID'
        obj[this.props.app_state.loc['1707']/* payments */] = 'Subscription ID'
        obj[this.props.app_state.loc['1708']/* cancellations */] = 'Subscription ID'
        obj[this.props.app_state.loc['1709']/* entries */] = 'Contract ID'
        obj[this.props.app_state.loc['1710']/* exits */] = 'Contract ID'
        obj[this.props.app_state.loc['1711']/* votes */] = 'Contract ID'
        obj[this.props.app_state.loc['1712']/* swaps */] = 'Exchange ID'
        obj[this.props.app_state.loc['1713']/* transfers */] = 'Account ID'

        if(selected_item == this.props.app_state.loc['1705']/* 'pending-withdraws' */ || selected_item == 'e' || selected_item == this.props.app_state.loc['1770i']/* 'activity' */) return;

        return(
            <div>
                <div style={{ padding: '5px 10px 0px 10px'}}>
                    <TextInput font={this.props.app_state.font} height={25} placeholder={obj[selected_item]} when_text_input_field_changed={this.when_typed_search_changed.bind(this)} text={search_id_text} theme={this.props.theme}/>
                </div>
                <div style={{height: 10}}/>
            </div>
        )
    }


    when_typed_search_changed(text){
        var clone = structuredClone(this.state.typed_search_id)
        var selected_item = this.get_selected_item(this.state.searched_account_page_tags_object, this.state.searched_account_page_tags_object['i'].active)
        clone[selected_item] = text
        this.setState({typed_search_id: clone})
    }


    handleScroll = (event, id) => {
        var pos = event.currentTarget.scrollTop
        var selected_item = this.get_selected_item(this.state.searched_account_page_tags_object, this.state.searched_account_page_tags_object['i'].active)
        
        if(this.page_scroll_data == null) this.page_scroll_data = {}
        
        var id = selected_item
        if(pos == 0){
            if(this.page_scroll_data[id] != null && this.page_scroll_data[id] <= 65){
                this.page_scroll_data[id] = pos
            }
        }else{
            this.page_scroll_data[id] = pos
        }
    }

    update_scroll_position(){
        if(this.page_scroll_data == null) this.page_scroll_data = {}
        var selected_item = this.get_selected_item(this.state.searched_account_page_tags_object, this.state.searched_account_page_tags_object['i'].active)
        var id = selected_item

        var scroll_pos = this.page_scroll_data[id]
        if(scroll_pos == null) scroll_pos = 0;

        var pos = scroll_pos

        if(selected_item == this.props.app_state.loc['1703']/* 'creations' */){
            this.creations_ref.current?.scrollTo(0, pos);
        }
        else if(selected_item == this.props.app_state.loc['1770i']/* 'activity' */){
            this.activity_ref.current?.scrollTo(0, pos);
        }
        else if(selected_item == this.props.app_state.loc['1704']/* 'withdraws' */){
            this.withdraws_ref.current?.scrollTo(0, pos);
        }
        else if(selected_item == this.props.app_state.loc['1705']/* 'pending-withdraws' */){
            this.pending_withdraws_ref.current?.scrollTo(0, pos);
        }
        else if(selected_item == this.props.app_state.loc['1706']/* 'runs' */){
            this.runs_ref.current?.scrollTo(0, pos);
        }
        else if(selected_item == this.props.app_state.loc['1707']/* 'payments' */){
            this.payments_ref.current?.scrollTo(0, pos);
        }
        else if(selected_item == this.props.app_state.loc['1708']/* 'cancellations' */){
            this.cancellations_ref.current?.scrollTo(0, pos);
        }
        else if(selected_item == this.props.app_state.loc['1709']/* 'entries' */){
            this.entries_ref.current?.scrollTo(0, pos);
        }
        else if(selected_item == this.props.app_state.loc['1710']/* 'exits' */){
            this.exits_ref.current?.scrollTo(0, pos);
        }
        else if(selected_item == this.props.app_state.loc['1711']/* 'votes' */){
            this.votes_ref.current?.scrollTo(0, pos);
        }
        else if(selected_item == this.props.app_state.loc['1712']/* 'swaps' */){
            this.swaps_ref.current?.scrollTo(0, pos);
        }
        else if(selected_item == this.props.app_state.loc['1713']/* 'transfers' */){
            this.transfers_ref.current?.scrollTo(0, pos);
        }
        
    }





    render_main_page_data(){
        var item = this.state.searched_account
        var ether_balance = item['ether_balance']
        var e5 = item['e5']
        var e5_img = this.props.app_state.e5s[e5].end_image
        var alias = item['alias']

        var gas_price = this.props.app_state.gas_price[e5]
        if(gas_price == null || gas_price > 10**18){
            gas_price = this.get_gas_price_from_runs()
        }
        var gas_transactions = ether_balance == 0 ? 0 : Math.floor((ether_balance/gas_price)/2_300_000)

        var address = item['address']
        var run_data = item['run_data']
        return(
            <div>
                {this.render_detail_item('3', {'title':alias, 'details':item['id'], 'size':'l'})}
                <div style={{height: 10}}/>

                <div onClick={()=> this.copy_address_to_clipboard(address)}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1714']/* 'Address' */, 'details':(address), 'size':'l'})}
                </div>
                <div style={{height: 10}}/>

                <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1716']/* 'Ether Balance in Wei' */, 'number':ether_balance, 'relativepower':'wei'})}>
                    {this.render_detail_item('2', { 'style': 'l', 'title':this.props.app_state.loc['1715']/* 'Ether Balance in Ether' */, 'subtitle': this.format_power_figure(ether_balance/10**18), 'barwidth': this.calculate_bar_width(ether_balance/10**18), 'number': (ether_balance/10**18), 'barcolor': '', 'relativepower': 'ether', })}
                    
                    {this.render_detail_item('2', { 'style': 'l', 'title':this.props.app_state.loc['1716']/* 'Ether Balance in Wei' */, 'subtitle': this.format_power_figure(ether_balance), 'barwidth': this.calculate_bar_width(ether_balance), 'number': this.format_account_balance_figure(ether_balance), 'barcolor': '', 'relativepower': 'wei', })}
                    
                    {this.render_detail_item('2', { 'style': 'l', 'title':this.props.app_state.loc['1377']/* 'Transactions (2.3M Gas average)' */, 'subtitle': this.format_power_figure(gas_transactions), 'barwidth': this.calculate_bar_width(gas_transactions), 'number': this.format_account_balance_figure(gas_transactions), 'barcolor': '', 'relativepower': this.props.app_state.loc['1378']/* 'transactions' */, })}
                </div>
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['377']/* 'End Balance' */, 'number':item['end_balance'], 'relativepower':'END'})}>
                        {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['377']/* 'End Balance' */, 'subtitle':this.format_power_figure(item['end_balance']), 'barwidth':this.calculate_bar_width(item['end_balance']), 'number':this.format_account_balance_figure(item['end_balance']), 'relativepower':'END'})}
                    </div>

                    <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['378']/* 'Spend Balance' */, 'number':item['spend_balance'], 'relativepower':'SPEND'})}>
                        {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['378']/* 'Spend Balance' */, 'subtitle':this.format_power_figure(item['spend_balance']), 'barwidth':this.calculate_bar_width(item['spend_balance']), 'number':this.format_account_balance_figure(item['spend_balance']), 'relativepower':'SPEND'})}
                    </div>
                </div>

                {this.render_end_to_spend_use_ratio()}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':run_data[0], 'details':this.props.app_state.loc['1717']/* 'Last Transaction Block' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.get_time_difference(run_data[1]), 'details':this.props.app_state.loc['1718']/* 'Last Transaction age' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':run_data[2], 'details':this.props.app_state.loc['1719']/* 'Number of entered contracts' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':run_data[3], 'details':this.props.app_state.loc['1720']/* 'Number of E5 runs' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.show_transaction_transaction_count_chart(item['transactions'])}

            </div>
        )
    }

    render_end_to_spend_use_ratio(){
        var item = this.state.searched_account
        var transfer_event_data = item['accounts_token_transfer_event_data']
        if(transfer_event_data != null){
            var transfer_events = this.filter_transfer_events_for_end_and_spend_transactions(transfer_event_data)

            var total = transfer_events.end_events.length + transfer_events.spend_events.length

            var end_percentage = this.round_off((transfer_events.end_events.length / total) * 100)
            var spend_percentage = this.round_off((transfer_events.spend_events.length / total) * 100)

            var end_barwidth = end_percentage
            var spend_barwidth = spend_percentage

            if(end_barwidth > 97){
                end_barwidth = 97
            }
            else if(end_barwidth < 3){
                end_barwidth = 3
            }

            if(spend_barwidth > 97){
                spend_barwidth = 97
            }
            else if(spend_barwidth < 3){
                spend_barwidth = 3
            }

            return (
                <div>
                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        <div style={{'margin': '5px 20px 0px 15px'}}>
                            <div className="row">
                                <div className="col-10" style={{'padding': '0px 0px 0px 14px' }}> 
                                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'font-family': this.props.app_state.font}} className="fw-bold">END</p>
                                </div>
                                <div className="col-2" style={{'padding': '0px 15px 0px 0px' }}>
                                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'font-family': this.props.app_state.font}} className="text-end">SPEND</p>
                                </div>
                            </div>
                            
                            <div style={{ height: 3, width: "100%", 'border-radius': '5px', 'box-shadow': '0px 0px 2px 1px '+this.props.theme['bar_shadow'], 'margin': '0px 0px 4px 0px' }}>
                                <div className="progress" style={{ height: 3, width: "100%", 'background-color': this.props.theme['linebar_background_color'] }}>
                                    <div className="progress-bar" role="progressbar" style={{ width: end_barwidth+'%', 'background-image': 'none','background-color': 'black', 'border-radius': '0px 3px 3px 0px' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>

                                    <div className="progress-bar" role="progressbar" style={{ width: spend_barwidth+'%', 'background-image': 'none','background-color': 'white', 'border-radius': '0px 3px 3px 0px' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-9" style={{'padding': '0px 0px 0px 14px' }}> 
                                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: '100%', 'font-family': this.props.app_state.font}} className="fw-bold">{end_percentage+'%'}</p>
                                </div>
                                <div className="col-3" style={{'padding': '0px 15px 0px 0px' }}>
                                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: '100%', 'padding-top':' 1px', 'font-family': this.props.app_state.font}} className="text-end">{spend_percentage+'%'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            );
        }
    }

    round_off(number){
        return (Math.round(number * 100) / 100)
    }

    filter_transfer_events_for_end_and_spend_transactions(events){
        var end_events = []
        var spend_events = []

        events.forEach(event => {
            if(event.returnValues.p1 == 3){
                end_events.push(event)
            }
            else if(event.returnValues.p1 == 5){
                spend_events.push(event)
            }
        });

        return {end_events, spend_events}
    }

    copy_address_to_clipboard(signature_data){
        navigator.clipboard.writeText(signature_data)
        this.props.notify(this.props.app_state.loc['1564']/* 'Copied address to clipboard.' */, 3600)
    }

    render_search_account_balances_ui(){
        var selected_item = this.get_selected_item(this.state.searched_account_page_tags_object, this.state.searched_account_page_tags_object['i'].active)

        if(this.state.searched_account == null) return;

        if(selected_item == 'e'){
            return(
                <div>
                    {this.render_search_account_ui()}
                    {this.render_detail_item('0')}

                    {this.show_token_balance_data_chart()}
                    

                    <Tags font={this.props.app_state.font} page_tags_object={this.state.get_account_balance_history_tag_object} tag_size={'l'} when_tags_updated={this.when_get_account_balance_history_tag_object_updated.bind(this)} theme={this.props.theme}/>
                    <div style={{height:10}}/>

                    {this.render_account_balance_or_yearly_balance_change_data()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }
    }

    when_get_account_balance_history_tag_object_updated(tag_obj){
        this.setState({get_account_balance_history_tag_object: tag_obj})
    }


    render_account_balance_or_yearly_balance_change_data(){
        var selected_item = this.get_selected_item(this.state.get_account_balance_history_tag_object, this.state.get_account_balance_history_tag_object['i'].active)
        
        if(selected_item == this.props.app_state.loc['1770a']/* 'balances' */){
            return(
                <div>
                    {this.render_account_balance_data()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1770b']/* 'income' */){
            return(
                <div>
                    {this.render_yearly_balance_change_data('Received')}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1770h']/* 'expenditure' */){
            return(
                <div>
                    {this.render_yearly_balance_change_data('Sent')}
                </div>
            )
        }
    }




    render_account_balance_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2808']/* 'Accounts Balances' */, 'details':this.props.app_state.loc['2809']/* 'Heres all the tokens the account is in posession of.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_accounts_balances()}
            </div>
        )
    }

    render_accounts_balances(){
        var searched_item_data = this.state.searched_account
        var e5 = searched_item_data['e5']
        var interacted_exchanges = [].concat(searched_item_data['interacted_exchanges'])
        var interacted_exchanges_balances = [].concat(searched_item_data['interacted_exchanges_balances'])
        if(interacted_exchanges.length == 0){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div> 
            )
        }
        return(
            <div style={{}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {interacted_exchanges.map((item, index) => (
                        <li style={{'padding': '3px 0px 3px 0px'}}>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'number':interacted_exchanges_balances[index], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'subtitle':this.format_power_figure(interacted_exchanges_balances[index]), 'barwidth':this.calculate_bar_width(interacted_exchanges_balances[index]), 'number':this.format_account_balance_figure(interacted_exchanges_balances[index]), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item], })}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }



    render_yearly_balance_change_data(target_action){
        var data = this.get_yearly_balance_change_data(target_action)
        var active_years = this.get_years(data)

        return(
            <div>
                {this.render_yearly_balance_change_title(target_action)}
                <div style={{height:5}}/>
                {this.render_balance_years(data, active_years)}
                <div style={{height:20}}/>
                {this.render_years_balance_data(data)}
            </div>
        )
    }

    render_yearly_balance_change_title(target_action){
        if(target_action == 'Received'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1770d']/* 'Yearly Income.' */, 'details':this.props.app_state.loc['1770e']/* 'Heres how much money the account has made in the last few years.' */, 'size':'l'})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1770f']/* 'Yearly Expenditure' */, 'details':this.props.app_state.loc['1770g']/* 'Heres how much money the account has spent in the last few years.' */, 'size':'l'})}
                </div>
            )
        }
    }
    

    render_balance_years(data, active_years){
        var items = active_years;
        var background_color = this.props.theme['card_background_color']
        if(items.length == 0){
            items = [1, 2, 3]
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden', 'scrollbar-width': 'none'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                <div style={{height:47, width:97, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
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
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={() => this.when_balance_year_clicked(item)}>
                            {this.render_year_item(data, item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_year_item(data, item){
        if(this.state.active_balance_year == item){
            return(
                <div>
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '0px 5px 3px 5px'}}/>
                    {this.render_detail_item('3',{'title':''+item, 'details':this.get_years_exchanges(data, item).length+this.props.app_state.loc['1770c']/* ' exchanges' */,'size':'l'})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3',{'title':''+item, 'details':this.get_years_exchanges(data, item).length+this.props.app_state.loc['1770c']/* ' exchanges' */,'size':'l'})}
                </div>
            )
        }
    }

    when_balance_year_clicked(year){
        this.setState({active_balance_year: year})
    }

    set_default_balance_year(){
        var data = this.get_yearly_balance_change_data('Received')
        var active_years = this.get_years(data)
        if(active_years.length > 0){
            this.setState({active_balance_year: active_years[0]})
        }else{
            this.setState({active_balance_year: 0})
        }
    }


    render_years_balance_data(data){
        var searched_item_data = this.state.searched_account
        var year = this.state.active_balance_year
        var years_exchanges = this.get_years_exchanges(data, year)
        var e5 = searched_item_data['e5']
        if(years_exchanges.length == 0 || year == 0){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }else{
            return(
                <div>
                    <div style={{ 'padding': '0px 0px 0px 0px'}}>
                        {years_exchanges.map((item, index) => (
                            <div style={{'padding': '3px 0px 3px 0px'}}>
                                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'number':this.format_account_balance_figure(data[year][years_exchanges[index]]), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'subtitle':this.format_power_figure(data[year][years_exchanges[index]]), 'barwidth':this.calculate_bar_width(data[year][years_exchanges[index]]), 'number':this.format_account_balance_figure(data[year][years_exchanges[index]]), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item], })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    }


    get_yearly_balance_change_data(target_action){
        var items = this.state.searched_account['tokens']
        var data = {}

        items.forEach(item => {
            var exchange_id = item['event'].returnValues.p1;
            var amount = item['event'].returnValues.p4
            var depth = item['event'].returnValues.p7
            amount = this.get_actual_number(amount, depth)
            var timestamp = item['timestamp'];
            
            if(item['action'] == target_action){
                var year = (Math.floor(parseInt(timestamp) / (31556952))) + 1970
                if(data[year] == null) data[year] = {}
                if(data[year][exchange_id] == null) data[year][exchange_id] = bigInt(0);
                data[year][exchange_id] = bigInt(data[year][exchange_id]).plus(amount)
            }
        });

        return data
    }


    get_years(data){
        var years = []
        for (const year in data) {
            if (data.hasOwnProperty(year)) {
                years.push(year)
            }
        }
        return years
    }

    get_years_exchanges(data, year){
        var exchanges = []
        var reference = data[year]
        if(reference == null) return [];
        for (const exchange in reference) {
            if (reference.hasOwnProperty(exchange)) {
                exchanges.push(exchange)
            }
        }
        return exchanges
    }









    show_token_balance_data_chart(){
        var data = this.state.searched_account['searched_accounts_exchange_interactions_data']
        if(data == null) return;
        var interacted_exchange_data = this.get_interacted_exchanges(data)
        if(interacted_exchange_data.length == 0) return;
        var selected_exchange = this.get_selected_interacted_exchange(data)[0]
        var event_data = this.get_selected_exchange_data(data, selected_exchange)
        return(
            <div>
                {/* {this.render_detail_item('1', {'active_tags':interacted_exchange_data, 'index_option':'indexed', 'when_tapped': 'when_view_account_exchange_tapped', 'selected_tags':this.get_selected_interacted_exchange(data)})} */}
                {this.load_my_used_exchange_objects(interacted_exchange_data, selected_exchange)}
                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2214a']/* 'Balance Changes.' */, 'details':this.props.app_state.loc['2214b']/* `The changes in balance for the selected token.` */, 'size':'l'})}
                
                {this.render_detail_item('6', {'dataPoints':this.get_deposit_amount_data_points(event_data), 'interval':110, 'hide_label': true})}
                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2214c']/* 'Y-Axis: Total in ' */+selected_exchange, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'l'})}
               
                {this.render_detail_item('0')}
            </div>
        )
    }

    load_my_used_exchange_objects(items, selected_exchange){
        var items2 = [0, 1, 2]
        if(items.length == 0){
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items2.map(() => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_empty_horizontal_list_item2()}
                        </li>
                    ))}
                </ul>
            </div>
            )
        }
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_view_account_exchange_tapped(item.symbol)}>
                            {this.render_exchange_item(item, selected_exchange)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_exchange_item(item, selected_exchange){
        var search_account = this.state.searched_account
        var e5 = search_account['e5']
        var title = item.name
        var details = item.symbol
        var image = this.props.app_state.token_thumbnail_directory[e5][item.exchange_id]
        if(selected_exchange == item.symbol){
            return(
                <div>
                    {this.render_detail_item('14', {'title':title, 'image':image,'details':details, 'size':'s', 'border_radius':'9px', 'img_size':30})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('14', {'title':title, 'image':image, 'details':details, 'size':'s', 'border_radius':'9px', 'img_size':30})}
                </div>
            )
        }
    }

    get_token_symbol_from_id(exchange_id){
        var item = this.state.searched_account
        var e5 = item['e5']
        var symbol = this.props.app_state.token_directory[e5][exchange_id]
        if(symbol == null) return exchange_id
        return symbol
    }

    get_token_name_from_id(exchange_id){
        var item = this.state.searched_account
        var e5 = item['e5']
        var name = this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+exchange_id]
        if(name == null) return exchange_id
        return name
    }

    get_interacted_exchanges(data){
        var keys = Object.keys(data)
        var exchange_data = []
        keys.forEach(key => {
            var symbol = this.get_token_symbol_from_id(key)
            var name = this.get_token_name_from_id(key)
            if(this.is_exchange_valid(data[key], name, key)){
                exchange_data.push({name, exchange_id: key, symbol})
            }
        });
        return exchange_data
    }

    get_balance_of(exchange_id){
        var balance = bigInt(0)
        var searched_item_data = this.state.searched_account
        var interacted_exchanges = searched_item_data['interacted_exchanges']
        var interacted_exchanges_balances = searched_item_data['interacted_exchanges_balances']
        for(var i=0; i<interacted_exchanges.length; i++){
            var item = interacted_exchanges[i]
            if(item == exchange_id){
                balance = interacted_exchanges_balances[i]
                return balance
            }
        }
        return balance
    }

    is_exchange_valid(events, key, exchange_id){
        for(var i=0; i<events.length; i++){
            if(events[i]['action'] === 'DepthMint' && events[i]['event'].returnValues.p4/* depth_val */ !== 0){
                return false
            }
        }
        var item = this.state.searched_account
        var e5 = item['e5']

        if(this.props.app_state.end_tokens[e5] != null && this.props.app_state.end_tokens[e5].includes(exchange_id)){
            return false
        }
        return true
    }

    get_selected_interacted_exchange(data){
        if(this.state.selected_exchange == null){
            var name = data[3] == null ? this.get_token_symbol_from_id(5) : this.get_token_symbol_from_id(3)
            return [name]
        }
        return [this.state.selected_exchange]
    }

    get_selected_exchange_data(data, selected_exchange_name){
        var id = parseInt(this.get_token_id_from_symbol(selected_exchange_name))
        return data[id]
    }


    when_view_account_exchange_tapped(tag, pos){
        this.setState({selected_exchange: tag})
    }

    get_deposit_amount_data_points(events){
        var data = []
        var max_amount = bigInt(0);
        var active_balance = bigInt(0)
        try{
            for(var i=0; i<events.length; i++){
                if(i == 0){
                    if(events[i]['action'] == 'Received'){
                        data.push(bigInt(this.get_actual_number(events[i]['event'].returnValues.p4/* amount */, events[i]['event'].returnValues.p7/* depth */)))
                    }
                    else if(events[i]['action'] == 'Update'){
                        data.push(bigInt(events[i]['event'].returnValues.p3/* new_balance */))
                    }
                    else if(events[i]['action'] == 'DepthMint'){
                        var val = bigInt(this.get_actual_number(events[i]['event'].returnValues.p5/* amount */, events[i]['event'].returnValues.p4/* depth_val */))
                        data.push(val)
                        active_balance = val
                    }
                    max_amount = bigInt(data[data.length-1])
                }else{
                    if(events[i]['action'] == 'Received'){
                        data.push(bigInt(data[data.length-1]).add(bigInt(this.get_actual_number(events[i]['event'].returnValues.p4/* amount */, events[i]['event'].returnValues.p7/* depth */))))
                    }
                    else if(events[i]['action'] == 'Update'){
                        var val = bigInt(events[i]['event'].returnValues.p3/* new_balance */)
                        if(!active_balance.greater(bigInt('1e72'))){
                            data.push(val)
                        }
                    }
                    else if(events[i]['action'] == 'DepthMint'){
                        var val = bigInt(this.get_actual_number(events[i]['event'].returnValues.p5/* amount */, events[i]['event'].returnValues.p4/* depth_val */))
                        data.push(active_balance.plus(val))
                        active_balance = active_balance.plus(val)
                    }
                    else{
                        if(bigInt(data[data.length-1]).greaterOrEquals(bigInt(this.get_actual_number(events[i]['event'].returnValues.p4/* amount */, events[i]['event'].returnValues.p7/* depth */)))){
                            var val = bigInt(data[data.length-1]).minus(bigInt(this.get_actual_number(events[i]['event'].returnValues.p4/* amount */, events[i]['event'].returnValues.p7/* depth */)))
                            data.push(val)
                        }
                    }
                    if(bigInt(max_amount).lesser(data[data.length-1])){
                       max_amount = bigInt(data[data.length-1]) 
                    }
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i]['event'].returnValues.p5
                    for(var t=0; t<diff; t+=(61*265100)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1]['event'].returnValues.p5 - events[i]['event'].returnValues.p5
                    for(var t=0; t<diff; t+=(61*265100)){
                        data.push(data[data.length-1])      
                    }
                }
            }
        }catch(e){
            console.log(e)
        }

        
        console.log('data_points',events)

        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        var largest_number = max_amount
        var recorded = false;
        for(var i = 0; i < noOfDps; i++) {
            if(largest_number == 0) yVal = 0
            else yVal = parseInt(bigInt(data[factor * xVal]).multiply(100).divide(largest_number))
            
            if(yVal != null && data[factor * xVal] != null){
                if(i%(Math.round(noOfDps/4)) == 0 && i != 0 && !recorded){
                    // recorded = true
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(data[factor * xVal])});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
        }
        
        return dps
    }







    render_search_account_ui(){
        var item = this.state.searched_account
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1721']/* 'Balance Search' */, 'details':this.props.app_state.loc['1722']/* 'Search the accounts balance in a specified exchange' */, 'size':'l'})}
                <div style={{height:10}}/>

                <div className="row" style={{ padding: '5px 10px 0px 10px', width:'103%' }}>
                    <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput font={this.props.app_state.font} height={25} placeholder={this.props.app_state.loc['1723']/* 'Exchange ID...' */} when_text_input_field_changed={this.when_typed_search_exchange_id_changed.bind(this)} text={this.state.typed_search_exchange_id} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}} onClick={()=> this.perform_search()}>
                        <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                            <img alt="" className="text-end" src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                        </div>
                    </div>
                </div>
                <div style={{height:10}}/>
                {this.render_searched_balance_if_any()}
            </div>
        )
    }

    when_typed_search_exchange_id_changed(text){
        this.setState({typed_search_exchange_id: text})
    }

    perform_search(){
        var exchange_id = this.get_token_id_from_symbol(this.state.typed_search_exchange_id.trim())
        if(isNaN(exchange_id) || parseInt(exchange_id) < 0 || exchange_id == '' || !this.does_exchange_exist(exchange_id)){
            this.props.notify(this.props.app_state.loc['414']/* 'Please put a valid exchange ID.' */, 4600)
        }else{
            this.props.notify(this.props.app_state.loc['2509']/* 'Searching...' */, 1000)
            this.setState({searched_exchange: exchange_id})
            this.props.perform_searched_account_balance_search(exchange_id, this.state.searched_account['id'], this.state.searched_account['e5'])

        }
    }

    get_token_id_from_symbol(typed_search){
        if(!isNaN(typed_search)){
            return typed_search
        }
        var id = this.props.app_state.token_directory[this.state.searched_account['e5']][typed_search.toUpperCase()] == null ? typed_search : this.props.app_state.token_directory[this.state.searched_account['e5']][typed_search.toUpperCase()]

        return id
    }

    does_exchange_exist(exchange_id){
        if(this.props.app_state.created_token_object_mapping[this.state.searched_account['e5']][parseInt(exchange_id)] == null){
            return false
        }
        return true
    }

    render_searched_balance_if_any(){
        var search_text = this.state.searched_exchange + this.state.searched_account['id'] + this.state.searched_account['e5']
        var balance = this.props.app_state.searched_account_exchange_balances[search_text]
        var exchange_symbol = this.get_token_symbol(this.state.searched_exchange)

        if(balance == null){
            balance = 0;
            exchange_symbol = this.props.app_state.loc['483']/* 'tokens' */
        }
        return(
            <div>
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1724']/* 'Balance' */, 'number':balance, 'relativepower':exchange_symbol})}>
                    {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['1724']/* 'Balance' */, 'subtitle':this.format_power_figure(balance), 'barwidth':this.calculate_bar_width(balance), 'number':this.format_account_balance_figure(balance), 'relativepower':exchange_symbol})}
                </div>
            </div>
        )
    }

    get_token_symbol(id){
       return this.props.app_state.token_directory[this.state.searched_account['e5']][id] == null ? this.props.app_state.loc['483']/* 'tokens' */ : this.props.app_state.token_directory[this.state.searched_account['e5']][id]
    }


    show_transaction_transaction_count_chart(events){
        var amount = events.length
        if(events.length != 0){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1725']/* 'Transaction Runs' */, 'details':this.props.app_state.loc['1726']/* `Chart containing the total number of E5 runs theyve made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_transaction_transaction_count_data_points(events), 'interval':this.get_transaction_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1727']/* 'Y-Axis: Total Runs Made' */, 'details':this.props.app_state.loc['1728']/* 'X-Axis: Time' */, 'size':'l'})}
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_transaction_transaction_count_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i==0){
                    data.push(1)
                }
                else{
                    data.push(parseInt(data[data.length-1]) + (1))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p8
                    for(var t=0; t<diff; t+=60){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p8 - events[i].returnValues.p8
                    for(var t=0; t<diff; t+=60){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }
        


        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(yVal)});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_transaction_transaction_count_interval_figure(events){
        return events.length
    }










    render_creations_item_logs(){
        var items = this.creations_filter(this.state.searched_account['make_object'])
        var middle = this.props.height - 170;
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto',  }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div ref={this.creations_ref} onScroll={event => this.handleScroll(event)} style={{ overflow: 'auto', }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_creations_item_clicked(index)}>
                                    {this.render_creations_event_item(item, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_creations_item_clicked(index){
        if (this.state.selected_creations_event_item == index) {
            this.setState({ selected_creations_event_item: null })
        } else {
            this.setState({ selected_creations_event_item: index })
        }
    }

    render_creations_event_item(item, index){
        var object_id_obj = {'17':this.props.app_state.loc['1729']/* 'job object' */,'18':this.props.app_state.loc['1730']/* 'post object' */,'24':this.props.app_state.loc['1731']/* 'shadow object' */,'25':this.props.app_state.loc['1732']/* 'storefront bag object' */,'26':this.props.app_state.loc['1733']/* 'contractor object' */,'27':this.props.app_state.loc['1734']/* 'storefront item object' */,'28':this.props.app_state.loc['1735']/* 'storefront object' */,'29':this.props.app_state.loc['1736']/* 'account object' */,'30':this.props.app_state.loc['1737']/* 'contract object' */,'31':this.props.app_state.loc['1738']/* 'token exchange object' */,'32':this.props.app_state.loc['1739']/* 'consensus object' */,'33':this.props.app_state.loc['1740']/* 'subscription object' */,'34':this.props.app_state.loc['1741']/* 'custom object' */,'36':this.props.app_state.loc['1742']/* 'channel object' */}
        var object_type = object_id_obj[item.returnValues.p2]
        if (this.state.selected_creations_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': item.returnValues.p1, 'details': this.props.app_state.loc['1743']/* 'Object ID' */, 'size': 'l' })}
                    <div style={{ height: 2 }}/>
                    {this.render_detail_item('3', { 'title': object_type, 'details': 'Object Type', 'size': 'l' })}
                    <div style={{ height: 2 }}/>
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p4), 'details': 'Age', 'size': 'l' })}
                    <div style={{ height: 2 }}/>
                    {this.render_detail_item('3', { 'title': item.returnValues.p5, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': item.returnValues.p1, 'details': object_type, 'size': 'l' })}
                </div>
            )
        }
    }

    creations_filter(items){
        var search = this.state.typed_search_id['creations']
        var object_id_obj = {'17':this.props.app_state.loc['1729']/* 'job object' */,'18':this.props.app_state.loc['1730']/* 'post object' */,'24':this.props.app_state.loc['1731']/* 'shadow object' */,'25':this.props.app_state.loc['1732']/* 'storefront bag object' */,'26':this.props.app_state.loc['1733']/* 'contractor object' */,'27':this.props.app_state.loc['1734']/* 'storefront item object' */,'28':this.props.app_state.loc['1735']/* 'storefront object' */,'29':this.props.app_state.loc['1736']/* 'account object' */,'30':this.props.app_state.loc['1737']/* 'contract object' */,'31':this.props.app_state.loc['1738']/* 'token exchange object' */,'32':this.props.app_state.loc['1739']/* 'consensus object' */,'33':this.props.app_state.loc['1740']/* 'subscription object' */,'34':this.props.app_state.loc['1741']/* 'custom object' */,'36':this.props.app_state.loc['1742']/* 'channel object' */}
        var objects_to_filter_with = []
        Object.entries(object_id_obj).forEach(([key, value]) => {
            if(value.includes(search)){
                objects_to_filter_with.push(key)
            }
        });

        if(objects_to_filter_with.length == 0){
            return items
        }

        var filtered_events = []
        items.forEach(event => {
            if(objects_to_filter_with.includes(event.returnValues.p2)){
                filtered_events.push(event)
            }
        });
        return filtered_events
    }








    render_created_items(){
        var account_id = this.state.searched_account['id']
        var items = this.filter_objects(this.props.app_state.account_post_history[account_id])
        var middle = this.props.height - 170;
        if(items != null){
            if(items.length == 0){
                items = ['0','1','2'];
                return ( 
                    <div style={{overflow: 'auto', }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 0px 2px 0px'}}>
                                    {this.render_empty_object()}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            }else{
                return(
                    <div ref={this.creations_ref} onScroll={event => this.handleScroll(event)} style={{ overflow: 'auto', }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '5px 3px 5px 3px' }}>
                                    <div key={index}>
                                        {this.render_object(item, index)}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }
        }else{
            items = ['0','1','2'];
            return ( 
                <div style={{overflow: 'auto', }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 0px 2px 0px'}}>
                                {this.render_empty_object()}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }

    render_empty_object(){
        var background_color = this.props.theme['card_background_color']
        return(
            <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                <div style={{'margin':'10px 20px 0px 0px'}}>
                    <img alt="" src={this.props.app_state.theme['letter']} style={{height:60 ,width:'auto'}} />
                    <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                </div>
            </div>
        )
    }

    is_post_anonymous(object){
        var is_anonymous = false;
        if(object['ipfs'].get_post_anonymously_tags_option != null){
            var option = this.get_selected_item2(object['ipfs'].get_post_anonymously_tags_option, 'e')
            if(option == 1){
                is_anonymous = true
            }
        }
        return is_anonymous
    }

    get_selected_item2(object, option){
        return object[option][2][0]
    }

    render_object(object){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_item(object)
        var object_type = object['type']
        
         if(this.get_object_type(object_type) == this.props.app_state.loc['1732']/* 'storefront bag object' */ || this.get_object_type(object_type) == this.props.app_state.loc['1741']/* 'custom object' */ || this.get_object_type(object_type) == this.props.app_state.loc['1731']/* 'shadow object' */ || this.is_post_anonymous(object)) {
                return(
                    <div>
                        {this.render_empty_object()}
                    </div>
                )
        }

        return(
            <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div>
                        <div style={{'padding': '0px 0px 0px 0px'}} >
                            {this.render_title_or_image_title(object_type, item)}
                        </div>
                        <div style={{'padding': '20px 0px 0px 0px'}}>
                            {this.render_detail_item('2', item['age'])}
                        </div>
                    </div>
                </div>         
            </div>
        )
    }

    render_title_or_image_title(object_type, item){
        if(object_type == 31/* token_exchange */){
            return(
                <div>
                    {this.render_detail_item('8', item['label'])}
                </div>
            )
        }
        else if(object_type == 19 || object_type == 20 || object_type == 21){
            return(
                <div>
                    {this.render_detail_item('8', item['id'])}
                </div>
            )
        }
        else{
            return(
                <div>
                    {this.render_detail_item('3', item['id'])}
                </div>
            )
        }
    }


    format_item(object){
        var tags = object['ipfs'] == null ? ['Object'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Object ID' : object['ipfs'].entered_title_text
        var age = object['block']
        var time = object['timestamp']
        var object_type = object['type']

        var default_img_obj = {'31':EndImg, '19':this.props.app_state.static_assets['music_label'], '20':this.props.app_state.static_assets['video_label'], '21':EndImg}
        var image = default_img_obj[(object_type.toString())]
        var name = object['ipfs'] == null ? 'Token' : object['ipfs'].entered_title_text
        var symbol = object['ipfs'] == null ? 'tokens' : object['ipfs'].entered_symbol_text
        if(object['ipfs'].token_image != null){
            image = this.get_image_from_file(object['ipfs'].token_image)
        }
        if(object['ipfs'].album_art != null){
            image = this.get_image_from_file(object['ipfs'].album_art)
        }      
        
        if(object_type == 31/* token_exchange */){
            return{
                'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':[], 'when_tapped':''},
                'label':{'title':name,'details':symbol, 'size':'l', 'image':image, 'border_radius':'15%'},
                'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
            }
        }
        else if(object_type == 19 || object_type == 20 || object_type == 21){
            return{
                'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':[], 'when_tapped':''},
                'id':{'title':this.get_object_type(object_type)+' • '+object['id'], 'details':title, 'size':'l', 'image':image, 'border_radius':'7px'},
                'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
            }
        }
        else{
            return{
                'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':[], 'when_tapped':''},
                'id':{'title':' • '+this.get_object_type(object_type)+' • '+object['id'], 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img},
                'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
            }
        }
    }

    get_number_width(number){
        if(number == null) return '0%'
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
    }

    get_object_type(object_type){
        var object_id_obj = {'17':this.props.app_state.loc['1729']/* 'job object' */,'18':this.props.app_state.loc['1730']/* 'post object' */,'24':this.props.app_state.loc['1731']/* 'shadow object' */,'25':this.props.app_state.loc['1732']/* 'storefront bag object' */,'26':this.props.app_state.loc['1733']/* 'contractor object' */,'27':this.props.app_state.loc['1734']/* 'storefront item object' */,'28':this.props.app_state.loc['1735']/* 'storefront object' */,'29':this.props.app_state.loc['1736']/* 'account object' */,'30':this.props.app_state.loc['1737']/* 'contract object' */,'31':this.props.app_state.loc['1738']/* 'token exchange object' */,'32':this.props.app_state.loc['1739']/* 'consensus object' */,'33':this.props.app_state.loc['1740']/* 'subscription object' */,'34':this.props.app_state.loc['1741']/* 'custom object' */,'36':this.props.app_state.loc['1742']/* 'channel object' */, '19':this.props.app_state.loc['1770k']/* 'audio object' */, '20':this.props.app_state.loc['1770l']/* 'video object' */, '21':this.props.app_state.loc['1770j']/* 'nitro object' */}
        return object_id_obj[(object_type.toString())]
    }

    filter_objects(items){
        var search = this.state.typed_search_id['creations']
        if(search == null || items == null) return items;
        var return_items = []
        items.forEach(item => {
            var title = item['ipfs'].entered_title_text == null ? '' : item['ipfs'].entered_title_text
            var object_type = this.get_object_type(item['type'])
            var id = item['id']
            if(title.includes(search) || id.toString() == search){
                return_items.push(item)
            }
        });
        return return_items;
    }

    get_image_from_file(ecid){
        if(!ecid.startsWith('image')) return ecid
        var ecid_obj = this.get_cid_split(ecid)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        if(data == null) return
return data['data']
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








    render_activity_items(){
        var account_id = this.state.searched_account['id']
        var account_activity = this.props.app_state.account_message_history[account_id]
        var middle = this.props.height - 170;
        if(account_activity != null && account_activity.length != 0 ){
            var items = account_activity;
            return(
                <div>
                    <div ref={this.activity_ref} onScroll={event => this.handleScroll(event)} style={{ overflow: 'auto', }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 0px 2px 0px' }}>
                                    <div>
                                        {this.render_message_item(item)}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }else{
            var items = ['0','1','2'];
            return ( 
                <div style={{overflow: 'auto', }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 0px 2px 0px'}}>
                                {this.render_empty_message()}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }

    render_empty_message(){
        return(
            <div>
                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'10px 20px 10px 0px'}}>
                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                    </div>
                </div>
            </div>
        )
    }

    render_message_item(item){
        var title = ''+this.get_sender_title_text2(item)
        var time = ''+this.get_time_difference(item['time'])
        var message = ''+this.format_message(item['message'])
        var word_wrap_value = this.longest_word_length(message) > 53 ? 'break-all' : 'normal'
        var size = item['size'] == null ? '15px' : item['size'];
        var font = item['font'] == null ? this.props.app_state.font : item['font']
        return(
            <div>
                <div style={{'padding': '7px 15px 10px 15px','margin':'0px 0px 0px 0px', 'background-color': this.props.theme['view_group_card_item_background'],'border-radius': '7px'}}>
                    <div className="row" style={{'padding':'0px 0px 0px 0px'}}>
                        <div className="col-9" style={{'padding': '0px 0px 0px 14px', 'height':'20px' }}> 
                            <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}}>{title}</p>
                        </div>
                        <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                            <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{time}</p>
                        </div>
                    </div>
                    <p style={{'font-size': size,'color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': font,'text-decoration': 'none', 'white-space': 'pre-line', 'word-break': word_wrap_value}}><Linkify options={{target: '_blank'}}>{message}</Linkify></p>
                    {this.render_images_if_any(item)}
                </div>
            </div>
        )
    }

    longest_word_length(text) {
        return text
            .split(/\s+/) // Split by whitespace (handles multiple spaces & newlines)
            .reduce((maxLength, word) => Math.max(maxLength, word.length), 0);
    }

    get_sender_title_text2(item){
        var e5 = this.state.searched_account['e5']
        if(item['sender'] == this.props.app_state.user_account_id[e5]){
            return 'You'
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[item['sender']] == null ? item['sender'] : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[item['sender']])
            return alias
        }
    }

    format_message(message){
        if(message == ''){
            return '...'
        }
        return message
    }

    render_images_if_any(item){
        if(item.type == 'image'){
            return(
                <div>
                    {this.render_detail_item('9',item['image-data'])}
                </div>
            )
        }
    }











    render_withdraws_item_logs(){
        var items = this.withdraws_filter(this.state.searched_account['withdraw'])
        var middle = this.props.height - 170;
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto',  }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div ref={this.withdraws_ref} onScroll={event => this.handleScroll(event)} style={{ overflow: 'auto', }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_withdraws_item_clicked(index)}>
                                    {this.render_withdraws_event_item(item, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_withdraws_item_clicked(index){
        if (this.state.selected_withdraws_event_item == index) {
            this.setState({ selected_withdraws_event_item: null })
        } else {
            this.setState({ selected_withdraws_event_item: index })
        }
    }

    render_withdraws_event_item(item, index){
        var amount = item.returnValues.p5
        var e5 = this.state.searched_account['e5']

        var gas_price = this.props.app_state.gas_price[e5]
        if(gas_price == null || gas_price > 10**18){
            gas_price = this.get_gas_price_from_runs()
        }
        var gas_transactions = amount == 0 ? 0 : Math.floor((amount/gas_price)/2_300_000)

        if (this.state.selected_withdraws_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': item.returnValues.p4, 'details': this.props.app_state.loc['1745']/* 'transaction ID' */, 'size': 'l' })}
                    <div style={{ height: 2 }}/>
                    {this.render_detail_item('3', { 'details': start_and_end(item.returnValues.p3), 'title': 'target', 'size': 'l' })}
                    <div style={{ height: 2 }}/>

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title':this.props.app_state.loc['1746']/* 'Amount in Wei' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': 'wei', })}

                        {this.render_detail_item('2', { 'style': 'l', 'title':this.props.app_state.loc['1747']/* 'Amount in Ether' */, 'subtitle': this.format_power_figure(amount/10**18), 'barwidth': this.calculate_bar_width(amount/10**18), 'number': (amount/10**18), 'barcolor': '', 'relativepower': 'ether', })}

                        
                    </div>
                    <div style={{ height: 2 }}/>

                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }}/>
                    {this.render_detail_item('3', { 'title': item.returnValues.p7, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title':this.props.app_state.loc['1746']/* 'Amount in Wei' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': 'wei', })}
                    </div>
                    {/* <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '5px 20px 5px 20px' }} /> */}
                </div>
            )
        }
    }

    withdraws_filter(items){
        var search = this.state.typed_search_id['withdraws']
        var filtered_events = []
        if(search == '' || search == null){
            return items
        }
        items.forEach(event => {
            if(event.returnValues.p3.toString().includes(search)){
                filtered_events.push(event)
            }
        });
        return filtered_events
    }







    render_pending_withdraws_item_logs(){
        var items = this.state.searched_account['pending_withdraw']
        var middle = this.props.height - 120;
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto',  }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div ref={this.pending_withdraws_ref} onScroll={event => this.handleScroll(event)} style={{ overflow: 'auto', }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_pending_withdraws_item_clicked(index)}>
                                    {this.render_pending_withdraws_event_item(item, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_pending_withdraws_item_clicked(index){
        if (this.state.selected_pending_withdraws_event_item == index) {
            this.setState({ selected_pending_withdraws_event_item: null })
        } else {
            this.setState({ selected_pending_withdraws_event_item: index })
        }
    }

    render_pending_withdraws_event_item(item, index){
        var amount = item.returnValues.p2
        var e5 = this.state.searched_account['e5']

        var gas_price = this.props.app_state.gas_price[e5]
        if(gas_price == null || gas_price > 10**18){
            gas_price = this.get_gas_price_from_runs()
        }
        var gas_transactions = amount == 0 ? 0 : Math.floor((amount/gas_price)/2_300_000)

        if (this.state.selected_pending_withdraws_event_item == index) {
            return (
                <div>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title':this.props.app_state.loc['1746']/* 'Amount in Wei' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': 'wei', })}

                        {this.render_detail_item('2', { 'style': 'l', 'title':this.props.app_state.loc['1747']/* 'Amount in Ether' */, 'subtitle': this.format_power_figure(amount/10**18), 'barwidth': this.calculate_bar_width(amount/10**18), 'number': (amount/10**18), 'barcolor': '', 'relativepower': 'ether', })}

                    </div>
                    <div style={{ height: 2 }}/>

                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p3), 'details': 'Age', 'size': 'l' })}
                    <div style={{ height: 2 }}/>
                    {this.render_detail_item('3', { 'title': item.returnValues.p4, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title':this.props.app_state.loc['1749']/* 'Amount Added in Wei' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': 'wei', })}
                    </div>
                    {/* <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '5px 20px 5px 20px' }} /> */}
                </div>
            )
        }
    }









    render_transactions_item_logs(){
        var items = this.transactions_filter(this.state.searched_account['transactions'])
        var middle = this.props.height - 170;
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto',  }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div ref={this.runs_ref} onScroll={event => this.handleScroll(event)} style={{ overflow: 'auto', }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index}>
                                    {this.render_transactions_event_item(item, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_transactions_item_clicked(index){
        if (this.state.selected_transactions_event_item == index) {
            this.setState({ selected_transactions_event_item: null })
        } else {
            this.setState({ selected_transactions_event_item: index })
        }
    }

    render_transactions_event_item(item, index){
        var estimated_gas_consumed = item.returnValues.p5
        var msg_value = item.returnValues.p6
        var gas_price_paid = item.returnValues.p7
        if (this.state.selected_transactions_event_item == index) {
            return (
                <div>
                    <div onClick={() => this.when_transactions_item_clicked(index)}>
                        {this.render_detail_item('3', { 'title': item.returnValues.p3, 'details': this.props.app_state.loc['1750']/* 'Transaction ID' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: 2 }}/>
                    {this.render_detail_item('3', { 'title': item.returnValues.p4, 'details': this.props.app_state.loc['1751']/* 'Transaction Stack Size' */, 'size': 'l' })}
                    <div style={{ height: 2 }}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['1752']/* 'Estimated Gas Consumed' */, 'number':estimated_gas_consumed, 'relativepower':'Gas'})}>
                            {this.render_detail_item('2', { 'style': 'l', 'title':this.props.app_state.loc['1752']/* 'Estimated Gas Consumed' */, 'subtitle': this.format_power_figure(estimated_gas_consumed), 'barwidth': this.calculate_bar_width(estimated_gas_consumed), 'number': this.format_account_balance_figure(estimated_gas_consumed), 'barcolor': '', 'relativepower': 'Gas', })}
                        </div>

                        <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['1753']/* Included Wei' */, 'number':msg_value, 'relativepower':'Wei'})}>
                            {this.render_detail_item('2', { 'style': 'l', 'title':this.props.app_state.loc['1753']/* Included Wei' */, 'subtitle': this.format_power_figure(msg_value), 'barwidth': this.calculate_bar_width(msg_value), 'number': this.format_account_balance_figure(msg_value), 'barcolor': '', 'relativepower': 'Wei', })}
                        </div>

                        <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['1754']/* 'Gas Price Paid' */, 'number':gas_price_paid, 'relativepower':'Wei'})}>
                            {this.render_detail_item('2', { 'style': 'l', 'title':this.props.app_state.loc['1754']/* 'Gas Price Paid' */, 'subtitle': this.format_power_figure(gas_price_paid), 'barwidth': this.calculate_bar_width(gas_price_paid), 'number': this.format_account_balance_figure(gas_price_paid), 'barcolor': '', 'relativepower': 'Wei', })}
                        </div>
                    </div>
                    <div style={{ height: 2 }}/>
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p8), 'details': 'Age', 'size': 'l' })}
                    <div style={{ height: 2 }}/>
                    {this.render_detail_item('3', { 'title': item.returnValues.p9, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: 2 }}/>
                    {this.render_detail_item('3', { 'details': start_and_end(item.returnValues.p10), 'title':this.props.app_state.loc['1755'] /* 'Coinbase (Miner)' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div onClick={() => this.when_transactions_item_clicked(index)}>
                    {this.render_detail_item('3', { 'title': this.props.app_state.loc['1750']/* 'Transaction ID' */+': '+item.returnValues.p3, 'details': this.format_account_balance_figure(estimated_gas_consumed)+' gas', 'size': 'l' })}
                </div>
            )
        }
    }

    transactions_filter(items){
        var search = this.state.typed_search_id['runs']
        var filtered_events = []
        if(search == '' || search == null){
            return items
        }
        items.forEach(event => {
            if(event.returnValues.p3.toString().includes(search)){
                filtered_events.push(event)
            }
        });
        return filtered_events
    }










    render_pay_subscription_item_logs(){
        var items = this.pay_subscription_filter(this.state.searched_account['pay_subscription'])
        var middle = this.props.height - 170;
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto',  }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div ref={this.payments_ref} onScroll={event => this.handleScroll(event)} style={{ overflow: 'auto', }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index}>
                                    {this.render_pay_subscription_event_item(item, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_pay_subscription_item_clicked(index){
        if (this.state.selected_pay_subscription_event_item == index) {
            this.setState({ selected_pay_subscription_event_item: null })
        } else {
            this.setState({ selected_pay_subscription_event_item: index })
        }
    }

    render_pay_subscription_event_item(item, index){
        var number = item.returnValues.p3
        if (this.state.selected_pay_subscription_event_item == index) {
            return (
                <div>
                    <div onClick={() => this.when_pay_subscription_item_clicked(index)}>
                        {this.render_detail_item('3', { 'title': (item.returnValues.p1), 'details': this.props.app_state.loc['1756']/* 'Subscription ID' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: 2 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2807']/* 'Time Units: ' */, 'number':number, 'relativepower':'units'})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title':this.props.app_state.loc['2807']/* 'Time Units: ' */, 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': 'units', })}
                    </div>

                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p5), 'details': 'Age', 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p4, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div onClick={() => this.when_pay_subscription_item_clicked(index)}>
                    {this.render_detail_item('3', { 'title': this.props.app_state.loc['1756']/* 'Subscription ID' */+': '+(item.returnValues.p1), 'details': this.format_account_balance_figure(number), 'size': 'l' })}
                </div>
            )
        }
    }

    pay_subscription_filter(items){
        var search = this.state.typed_search_id['payments']
        var filtered_events = []
        if(search == '' || search == null){
            return items
        }
        items.forEach(event => {
            if(event.returnValues.p1.toString().includes(search)){
                filtered_events.push(event)
            }
        });
        return filtered_events
    }








    render_cancellations_item_logs(){
        var items = this.cancellations_filter(this.state.searched_account['cancel_subscription'])
        var middle = this.props.height - 170;
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto',  }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div ref={this.cancellations_ref} onScroll={event => this.handleScroll(event)} style={{ overflow: 'auto',  }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index}>
                                    {this.render_cancellations_event_item(item, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_cancellations_item_clicked(index){
        if (this.state.selected_cancellations_event_item == index) {
            this.setState({ selected_cancellations_event_item: null })
        } else {
            this.setState({ selected_cancellations_event_item: index })
        }
    }

    render_cancellations_event_item(item, index){
        var number = item.returnValues.p3
        if (this.state.selected_cancellations_event_item == index) {
            return (
                <div>
                    <div onClick={() => this.when_cancellations_item_clicked(index)}>
                        {this.render_detail_item('3', { 'title': (item.returnValues.p1), 'details': this.props.app_state.loc['1756']/* 'Subscription ID' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: 2 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1758']/* 'Subscription ID:  ' */+item.returnValues.p1, 'number':number, 'relativepower': 'units'})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title':this.props.app_state.loc['1758']/* 'Subscription ID:  ' */+item.returnValues.p1, 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': 'units', })}
                    </div>

                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p5), 'details': 'Age', 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p4, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div onClick={() => this.when_cancellations_item_clicked(index)}>
                    {this.render_detail_item('3', { 'title': this.props.app_state.loc['1756']/* 'Subscription ID' */+': '+(item.returnValues.p1), 'details': this.format_account_balance_figure(number)+' units.', 'size': 'l' })}
                </div>
            )
        }
    }

    cancellations_filter(items){
        var search = this.state.typed_search_id['cancellations']
        var filtered_events = []
        if(search == '' || search == null){
            return items
        }
        items.forEach(event => {
            if(event.returnValues.p1.toString().includes(search)){
                filtered_events.push(event)
            }
        });
        return filtered_events
    }


    





    render_entry_item_logs(){
        var items = this.entry_filter(this.state.searched_account['enter_contract'])
        var middle = this.props.height - 170;
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto',  }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div ref={this.entries_ref} onScroll={event => this.handleScroll(event)} style={{ overflow: 'auto',  }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_entry_item_clicked(index)}>
                                    {this.render_entry_event_item(item, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_entry_item_clicked(index){
        if (this.state.selected_entry_event_item == index) {
            this.setState({ selected_entry_event_item: null })
        } else {
            this.setState({ selected_entry_event_item: index })
        }
    }

    render_entry_event_item(item, index){
        if (this.state.selected_entry_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title':item.returnValues.p1, 'details': this.props.app_state.loc['1759']/* 'Contract ID' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_diff((Date.now() / 1000) - item.returnValues.p4), 'details': 'Entry Expiry', 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': 'Age', 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p6, 'details':this.props.app_state.loc['1744'] /* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title':item.returnValues.p1, 'details':this.props.app_state.loc['1759'] /* 'Contract ID' */, 'size': 'l' })}
                    {/* <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '5px 20px 5px 20px' }} /> */}
                </div>
            )
        }
    }

    entry_filter(items){
        var search = this.state.typed_search_id['entries']
        var filtered_events = []
        if(search == '' || search == null){
            return items
        }
        items.forEach(event => {
            if(event.returnValues.p1.toString().includes(search)){
                filtered_events.push(event)
            }
        });
        return filtered_events
    }







    render_exit_item_logs(){
        var items = this.exit_filter(this.state.searched_account['exit_contract'])
        var middle = this.props.height - 170;
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto',  }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div ref={this.exits_ref} onScroll={event => this.handleScroll(event)} style={{ overflow: 'auto',  }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_exit_item_clicked(index)}>
                                    {this.render_exit_event_item(item, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_exit_item_clicked(index){
        if (this.state.selected_exit_event_item == index) {
            this.setState({ selected_exit_event_item: null })
        } else {
            this.setState({ selected_exit_event_item: index })
        }
    }

    render_exit_event_item(item, index){
        if (this.state.selected_exit_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title':item.returnValues.p1, 'details': this.props.app_state.loc['1759']/* 'Contract ID' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': 'Age', 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p6, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title':item.returnValues.p1, 'details': this.props.app_state.loc['1759']/* 'Contract ID' */, 'size': 'l' })}
                    {/* <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '5px 20px 5px 20px' }} /> */}
                </div>
            )
        }
    }

    exit_filter(items){
        var search = this.state.typed_search_id['exits']
        var filtered_events = []
        if(search == '' || search == null){
            return items
        }
        items.forEach(event => {
            if(event.returnValues.p1.toString().includes(search)){
                filtered_events.push(event)
            }
        });
        return filtered_events
    }







    render_vote_item_logs(){
        var items = this.vote_filter(this.state.searched_account['vote'])
        var middle = this.props.height - 170;
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto',  }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div ref={this.votes_ref} onScroll={event => this.handleScroll(event)} style={{ overflow: 'auto',  }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_vote_item_clicked(index)}>
                                    {this.render_vote_event_item(item, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_vote_item_clicked(index){
        if (this.state.selected_vote_event_item == index) {
            this.setState({ selected_vote_event_item: null })
        } else {
            this.setState({ selected_vote_event_item: index })
        }
    }

    render_vote_event_item(item, index){
        var obj = {'1':'Yes!', '2':'Wait..', '3':'No.'}
        var vote = obj[item.returnValues.p4]

        if (this.state.selected_vote_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': vote , 'details': this.props.app_state.loc['1760']/* 'Contract ID: ' */+item.returnValues.p1, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p2 , 'details': this.props.app_state.loc['1761']/* 'Proposal ID' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p5), 'details': 'Age', 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p6, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': vote , 'details': this.props.app_state.loc['1762']/* 'Contract ID: ' */+item.returnValues.p1, 'size': 'l' })}
                    {/* <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '5px 20px 5px 20px' }} /> */}
                </div>
            )
        }
    }

    vote_filter(items){
        var search = this.state.typed_search_id['votes']
        var filtered_events = []
        if(search == '' || search == null){
            return items
        }
        items.forEach(event => {
            if(event.returnValues.p1.toString().includes(search) || event.returnValues.p2.toString().includes(search)){
                filtered_events.push(event)
            }
        });
        return filtered_events
    }






    render_swap_item_logs(){
        var items = this.swap_filter(this.state.searched_account['exchange_ratio'])
        var middle = this.props.height - 170;
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto',}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div ref={this.swaps_ref} onScroll={event => this.handleScroll(event)} style={{ overflow: 'auto', }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index}>
                                    {this.render_swap_event_item(item, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_swap_item_clicked(index){
        if (this.state.selected_swap_event_item == index) {
            this.setState({ selected_swap_event_item: null })
        } else {
            this.setState({ selected_swap_event_item: index })
        }
    }

    render_swap_event_item(item, index){
        var action_obj = {'0':'Buy', '1':'Sell'}
        var action = action_obj[item.returnValues.p2]
        var token_exchange_liquidity = item.returnValues.p4
        var updated_exchange_ratio_x = item.returnValues.p5
        var updated_exchange_ratio_y = item.returnValues.p6
        var parent_tokens_balance = item.returnValues.p7
        var amount = item.returnValues.p8
        var e5 = this.state.searched_account['e5']
        var exchange_id = item.returnValues.p1
        var thumbnail = this.props.app_state.token_thumbnail_directory[e5] == null ? this.props.app_state.static_assets['end_img'] : (this.props.app_state.token_thumbnail_directory[e5][exchange_id] == null ? this.props.app_state.static_assets['end_img'] : this.props.app_state.token_thumbnail_directory[e5][exchange_id])

        if (this.state.selected_swap_event_item == index) {
            return (
                <div>
                    <div onClick={() => this.when_swap_item_clicked(index)}>
                        {this.render_detail_item('8', { 'title': (exchange_id), 'details': this.props.app_state.loc['1763']/* 'Exchange ID' */, 'size': 'l', 'image':thumbnail, 'border_radius':'5px' })}
                    </div>
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': action, 'details': 'Action', 'size': 'l' })}
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1764']/* 'Amount Swapped' */, 'number':amount, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id]})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['1764']/* 'Amount Swapped' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], })}
                    </div>
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1765']/* 'Updted Token Exchange Liquidity' */, 'number':token_exchange_liquidity, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1]})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['1765']/* 'Updted Token Exchange Liquidity' */, 'subtitle': this.format_power_figure(token_exchange_liquidity), 'barwidth': this.calculate_bar_width(token_exchange_liquidity), 'number': this.format_account_balance_figure(token_exchange_liquidity), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], })}
                    </div>
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1766']/* 'Updated Exchange Ratio X' */, 'number':updated_exchange_ratio_x, 'relativepower':'units'})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['1766']/* 'Updated Exchange Ratio X' */, 'subtitle': this.format_power_figure(updated_exchange_ratio_x), 'barwidth': this.calculate_bar_width(updated_exchange_ratio_x), 'number': this.format_account_balance_figure(updated_exchange_ratio_x), 'barcolor': '', 'relativepower': 'units', })}
                    </div>
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1767']/* 'Updated Exchange Ratio Y' */, 'number':updated_exchange_ratio_y, 'relativepower':'units'})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['1767']/* 'Updated Exchange Ratio Y' */, 'subtitle': this.format_power_figure(updated_exchange_ratio_y), 'barwidth': this.calculate_bar_width(updated_exchange_ratio_y), 'number': this.format_account_balance_figure(updated_exchange_ratio_y), 'barcolor': '', 'relativepower': 'units', })}
                    </div>
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', {'title':this.format_exchange_ratio(updated_exchange_ratio_x, updated_exchange_ratio_y), 'details':this.props.app_state.loc['1768']/* 'Updated Exchange Ratios X:Y' */, 'size':'l'},)}
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p9), 'details': 'Age', 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p10, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div onClick={() => this.when_swap_item_clicked(index)}>
                    {this.render_detail_item('8', { 'title': this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.searched_account['e5']+item.returnValues.p1], 'details': this.format_account_balance_figure(amount)+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.returnValues.p1], 'size': 'l', 'image':thumbnail, 'border_radius':'5px' })}
                    
                </div>
            )
        }
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

    swap_filter(items){
        var search = this.state.typed_search_id['swaps']
        var filtered_events = []
        if(search == '' || search == null){
            return items
        }
        items.forEach(event => {
            if(event.returnValues.p1.toString().includes(search)){
                filtered_events.push(event)
            }
        });
        return filtered_events
    }
    
    
    






    render_transfers_item_logs(){
        var items = this.transfers_filter(this.state.searched_account['tokens'])
        var middle = this.props.height - 170;
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div ref={this.transfers_ref} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto',}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index}>
                                    {this.render_transfers_event_item(item, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_transfers_item_clicked(index){
        if (this.state.selected_transfers_event_item == index) {
            this.setState({ selected_transfers_event_item: null })
        } else {
            this.setState({ selected_transfers_event_item: index })
        }
    }

    render_transfers_event_item(item, index){
        var searched_account = this.state.searched_account
        var e5 = item['e5']
        var exchange_id = item['event'].returnValues.p1;
        var number = item['event'].returnValues.p4
        var depth = item['event'].returnValues.p7
        number = this.get_actual_number(number, depth)
        var from_to = item['action'] == 'Sent' ? 'To: '+this.get_sender_title_text(item['event'].returnValues.p3): 'From: '+this.get_sender_title_text(item['event'].returnValues.p2)

        var other_party = item['action'] == 'Sent' ? item['event'].returnValues.p3 : item['event'].returnValues.p2
        var thumbnail = this.props.app_state.token_thumbnail_directory[e5] == null ? this.props.app_state.static_assets['end_img'] : (this.props.app_state.token_thumbnail_directory[e5][exchange_id] == null ? this.props.app_state.static_assets['end_img'] : this.props.app_state.token_thumbnail_directory[e5][exchange_id])

        if (this.state.selected_transfers_event_item == index) {
            return (
                <div>
                    <div onClick={() => this.props.when_account_in_data_clicked(other_party, e5, this.get_sender_title_text(other_party))}>
                        {this.render_detail_item('8', { 'title': from_to, 'details': this.props.app_state.loc['1770']/* 'Action: ' */+item['action'], 'size': 'l', 'image':thumbnail, 'border_radius':'5px'})}
                    </div>
                    <div onClick={() => this.when_transfers_item_clicked(index)}>
                        <div style={{ height: 2 }} />
                        <div style={{ 'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+exchange_id], 'number':number, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id]})}>
                            {this.render_detail_item('2', { 'style': 'l', 'title': this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+exchange_id], 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], })}
                        </div>

                        <div style={{ height: 2 }} />
                        {this.render_detail_item('3', { 'title': this.get_time_difference(item['event'].returnValues.p5), 'details': 'Age', 'size': 'l' })}
                        <div style={{ height: 2 }} />
                        {this.render_detail_item('3', { 'title': item['event'].returnValues.p6, 'details': 'Block Number', 'size': 'l' })}
                        <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                    </div>
                    
                </div>
            )
        } else {
            
            return (
                <div onClick={() => this.when_transfers_item_clicked(index)}>
                    {this.render_detail_item('8', { 'title': from_to, 'details': this.format_account_balance_figure(number)+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], 'size': 'l', 'image':thumbnail, 'border_radius':'5px' })}
                </div>
            )
        }
    }

    get_sender_title_text(sender) {
        if (sender == this.props.app_state.user_account_id[this.state.searched_account['e5']]) {
            return this.props.app_state.loc['1694']/* 'You' */
        } else {
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }
    
    transfers_filter(items){
        var search = this.state.typed_search_id['transfers']
        var filtered_events = []
        if(search == '' || search == null){
            return items
        }
        items.forEach(item => {
            if(item['event'].returnValues.p1.toString().includes(search) || item['event'].returnValues.p2.toString().includes(search) || item['event'].returnValues.p3.toString().includes(search) || this.get_sender_title_text(item['event'].returnValues.p3).includes(search) || this.get_sender_title_text(item['event'].returnValues.p2).includes(search)){
                filtered_events.push(item)
            }
        });
        return filtered_events
    }

    get_actual_number(number, depth){
        var p = (bigInt(depth).times(72)).toString().toLocaleString('fullwide', {useGrouping:false})
        var depth_vaule = bigInt(('1e'+p))
        return (bigInt(number).times(depth_vaule)).toString().toLocaleString('fullwide', {useGrouping:false})
    }







    
    
    get_gas_price_from_runs(){
        var last_events = this.props.app_state.all_E5_runs[this.state.searched_account['e5']]
        var sum = 0
        if(last_events != null){
            var last_check = last_events.length < 50 ? last_events.length : 50
            for(var i=0; i<last_check; i++){
                sum += last_events[i].returnValues.p7
            }
            sum = sum/last_check;
        }
        return sum
    }
    
    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var uploaded_data = {}
        if(item_id == '8' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12')uploaded_data = this.props.app_state.uploaded_data
        return(
            <div>
                <ViewGroups uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} when_view_account_exchange_tapped={this.when_view_account_exchange_tapped.bind(this)}/>
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

    format_exchange_ratio(ratio_x, ratio_y){
        // Calculate the ratio
        const gcd = this.calculateGCD(ratio_x, ratio_y);
        const ratio = `${this.format_account_balance_figure(ratio_x / gcd)} : ${this.format_account_balance_figure(ratio_y / gcd)}`;
        return ratio;
    }

    calculateGCD(a, b) {
        if (b === 0) {
            return a;
        }
        return this.calculateGCD(b, a % b);
    }

}




export default SearchedAccountPage;