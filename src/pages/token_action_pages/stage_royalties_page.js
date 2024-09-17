import React, { Component } from 'react';
import ViewGroups from '../../components/view_groups'
import Tags from '../../components/tags';
import TextInput from '../../components/text_input';
import NumberPicker from '../../components/number_picker';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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

class StageRoyaltiesPage extends Component {
    
    state = {
        selected: 0,
        id:makeid(8), type: this.props.app_state.loc['2846']/* 'stage-royalty' */, entered_indexing_tags:[this.props.app_state.loc['2847']/* 'stage' */, this.props.app_state.loc['2848']/* 'royalty' */, this.props.app_state.loc['2849']/* 'payouts' */], token_item: {'balance':1, 'data':[[],[],[],[],[]], 'id':0}, get_new_stageroyalties_action_page_tags_object: this.get_new_stageroyalties_action_page_tags_object(),

        payout_start_timestamp:(new Date().getTime()/1000)+64800, royalty_payout_account:'',
        get_transaction_ordering_tags_object: this.get_transaction_ordering_tags_object(),
        payout_amount:0, payout_title:'', batch_size:0,

        get_individual_or_batch_tags_object:this.get_individual_or_batch_tags_object(),
    };

    set_token(token_item){
        if(this.state.token_item['id'] != token_item['id']){
            this.setState({
                selected: 0,id:makeid(8), type: this.props.app_state.loc['2846']/* 'stage-royalty' */, entered_indexing_tags:[this.props.app_state.loc['2847']/* 'stage' */, this.props.app_state.loc['2848']/* 'royalty' */, this.props.app_state.loc['2849']/* 'payouts' */], token_item: {'balance':1, 'data':[[],[],[],[],[]], 'id':0}, 
                get_new_stageroyalties_action_page_tags_object: this.get_new_stageroyalties_action_page_tags_object(),

                payout_start_timestamp:(new Date().getTime()/1000)+64800,
                get_transaction_ordering_tags_object:this.get_transaction_ordering_tags_object(),
                payout_amount:0, payout_title:'', batch_size:0,

                get_individual_or_batch_tags_object:this.get_individual_or_batch_tags_object(),
            })
        }
        this.setState({token_item: token_item, e5: token_item['e5']})
    }

    get_new_stageroyalties_action_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['2850']/* 'staged-transactions' */], [0]
            ],
        };
    }

    get_transaction_ordering_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['2857']/* 'ascending' */,this.props.app_state.loc['2858']/* 'descending' */,this.props.app_state.loc['2859']/* 'random' */], [1]
            ],
        };
    }

    get_individual_or_batch_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['2869']/* 'all' */,this.props.app_state.loc['2870']/* 'batches' */], [1]
            ],
        };
    }






    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.get_new_stageroyalties_action_page_tags_object} tag_size={'l'} when_tags_updated={this.when_get_new_stageroyalties_action_page_tags_object_updated.bind(this)} theme={this.props.theme}/>
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

    when_get_new_stageroyalties_action_page_tags_object_updated(tag_obj){
        this.setState({get_new_stageroyalties_action_page_tags_object: tag_obj})
    }

    render_everything(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_stage_royalty_tag_data()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_main_stag_royalties_page_part()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_transactions_part()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_main_stag_royalties_page_part()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_transactions_part()}
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
                                    <img src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }


    render_stage_royalty_tag_data(){
        var selected_item = this.get_selected_item(this.state.get_new_stageroyalties_action_page_tags_object, this.state.get_new_stageroyalties_action_page_tags_object['i'].active)

        if(selected_item == 'e'){
            return(
                <div>
                    {this.render_main_stag_royalties_page_part()}
                </div>
            )    
        }
        else if(selected_item == this.props.app_state.loc['2850']/* staged-transactions */){
            return(
                <div>
                    {this.render_transactions_part()}
                </div>
            )
        }
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }


    render_main_stag_royalties_page_part(){
        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'15px', 'text':this.props.app_state.loc['2851']/* 'Stage a royalty payout to your tokens stakeholders.' */})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2863']/* 'Set a short title for your payout staging.' */, 'title':this.props.app_state.loc['2862']/* 'Payout Description.' */})}
                <div style={{height:10}}/>

                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['135']} when_text_input_field_changed={this.when_entered_text_input_field_changed.bind(this)} text={this.state.payout_title} theme={this.props.theme}/>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2861']/* 'The aggregate of the total number of tokens being issued out as payouts.' */, 'title':this.props.app_state.loc['2860']/* 'Total Payout Amount.' */})}
                <div style={{height:10}}/>
                {this.render_payout_tokens()}

                <NumberPicker font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_amount_set.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2852']/* 'Set the date and time that the payout will begin' */, 'title':this.props.app_state.loc['2852b']/* 'Schedule Date and Time.' */})}
                <div style={{height:10}}/>

                <div style={{height:10}}/>
                <div style={{}}>
                    <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], }, })}>
                        <CssBaseline />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_new_dat_time_value_set(newValue)}/>
                        </LocalizationProvider>
                    </ThemeProvider>
                </div>
                
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.get_time_diff(this.state.payout_start_timestamp - Date.now()/1000), 'details':this.props.app_state.loc['2853']/* Starting time. */, 'size':'l'})}
                
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2856']/* 'Set the account that will handle the payout transactions.' */, 'title':this.props.app_state.loc['2855']/* 'Payout Account.' */})}

                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['904']/* 'Account ID' */} when_text_input_field_changed={this.when_royalty_payout_account_input_field_changed.bind(this)} text={this.state.royalty_payout_account} theme={this.props.theme}/>
                {/* {this.load_account_suggestions()} */}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2865']/* 'Set the total number of transactions per payout batch.' */, 'title':this.props.app_state.loc['2864']/* 'Transactions Per Batch.' */})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2874']/* 'transactions per batch' */, 'number':this.state.batch_size, 'relativepower':this.props.app_state.loc['2867']/* 'transactions' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2874']/* 'transactions per batch' */, 'subtitle':this.format_power_figure(this.state.batch_size), 'barwidth':this.calculate_bar_width(this.state.batch_size), 'number':this.format_account_balance_figure(this.state.batch_size), 'barcolor':'', 'relativepower':this.props.app_state.loc['2867']/* 'transactions' */, })}
                </div>

                <NumberPicker font={this.props.app_state.font} number_limit={999} when_number_picker_value_changed={this.when_transactions_per_batch_value_picked.bind(this)} theme={this.props.theme} power_limit={63}/>

            </div>
        )
    }

    when_new_dat_time_value_set(value){
        const selectedDate = value instanceof Date ? value : new Date(value);
        const timeInSeconds = Math.floor(selectedDate.getTime() / 1000);
        var now = (new Date().getTime()/1000)+1000
        if(timeInSeconds < now){
            this.props.notify(this.props.app_state.loc['2854']/* You cant schedule a time before now. */, 7800)
        }
        this.setState({payout_start_timestamp: timeInSeconds})
    }

    when_royalty_payout_account_input_field_changed(text){
        this.setState({royalty_payout_account: text})
    }

    when_get_transaction_ordering_tags_object_updated(tag_obj){
        this.setState({get_transaction_ordering_tags_object: tag_obj})
    }

    when_entered_text_input_field_changed(text){
        this.setState({payout_title: text})
    }

    when_transactions_per_batch_value_picked(number){
        this.setState({batch_size: number})
    }


    render_payout_tokens(){
        var selected_object = this.state.token_item;
        var buy_tokens = [].concat(selected_object['data'][3])
        var buy_amounts = [].concat(selected_object['data'][4])
        return(
            <div>
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                        {buy_tokens.map((item, index) => (
                            <div style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[selected_object['e5']+item], 'number':this.format_price(this.calculate_payout_amount(buy_amounts[index])), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                                {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[selected_object['e5']+item], 'subtitle':this.format_power_figure(this.calculate_payout_amount(buy_amounts[index])), 'barwidth':this.calculate_bar_width(this.calculate_payout_amount(buy_amounts[index])), 'number':this.format_price(this.calculate_payout_amount(buy_amounts[index])), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    calculate_payout_amount(price){
        return bigInt(price).multiply(this.state.payout_amount);
    }

    when_amount_set(amount){
        this.setState({payout_amount: amount})
    }

    format_price(price_value){
        return this.format_account_balance_figure(price_value)
        // if(price_value > 1000){
        //     return this.format_account_balance_figure(price_value)
        // }
        // else{
        //     let roundedNumber = parseFloat(price_value.toFixed(7));
        //     return roundedNumber
        // }
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
        this.setState({royalty_payout_account: item['id']})
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







    render_transactions_part(){
        var exchange_royalty_data = this.props.app_state.exchange_royalty_data[this.state.token_item['id']]
        // console.log('hella',this.props.app_state.exchange_royalty_data)
        if(exchange_royalty_data == null){
            return(
                <div>
                    {this.render_empty_views(4)}
                </div>
            )
        }
        var total_number_of_transactions = exchange_royalty_data['balance_data'].length
        var time = (new Date(exchange_royalty_data['time']*1000))+''
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':(time), 'title':this.props.app_state.loc['2866']/* 'Balance Snapshot Time.' */})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2868']/* 'Total Payout Transactions.' */, 'number':total_number_of_transactions, 'relativepower':this.props.app_state.loc['2867']/* 'transactions.' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2868']/* 'Total Payout Transactions.' */, 'subtitle':this.format_power_figure(total_number_of_transactions), 'barwidth':this.calculate_bar_width(total_number_of_transactions), 'number':this.format_account_balance_figure(total_number_of_transactions), 'barcolor':'', 'relativepower':this.props.app_state.loc['2867']/* 'transactions.' */, })}
                </div>
                <div style={{height:10}}/>
                
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_individual_or_batch_tags_object} tag_size={'l'} when_tags_updated={this.when_get_individual_or_batch_tags_object_updated.bind(this)} theme={this.props.theme}/>

                {this.render_individual_or_batch_transactions()}
            </div>
        )
    }

    when_get_individual_or_batch_tags_object_updated(tag_obj){
        this.setState({get_individual_or_batch_tags_object: tag_obj})
    }

    render_individual_or_batch_transactions(){
        var selected_item = this.get_selected_item(this.state.get_individual_or_batch_tags_object, this.state.get_individual_or_batch_tags_object['i'].active)

        if(selected_item == this.props.app_state.loc['2869']/* 'all' */){
            return(
                <div>
                    {this.render_all_transactions_to_royalties()}
                </div>
            )    
        }
        else if(selected_item == this.props.app_state.loc['2870']/* 'batches' */){
            return(
                <div>
                    {this.render_transaction_batches_to_royalties()}
                </div>
            )
        }
    }


    render_all_transactions_to_royalties(){
        var exchange_royalty_data = this.props.app_state.exchange_royalty_data[this.state.token_item['id']]
        var total_number_of_transactions = exchange_royalty_data['balance_data']
        var total_held_shares = this.total_held_shares(total_number_of_transactions)
        if(total_number_of_transactions.length == 0 ||  total_held_shares.equals(0)){
            return(
                <div>
                    {this.render_empty_views(4)}
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {total_number_of_transactions.map((item, index) => (
                            <li style={{'padding': '5px 0px 5px 0px'}}>
                                {this.render_detail_item('3', {'details':item['account'], 'title':this.get_account_alias(item['account']), 'size':'s'})}
                                <div style={{height:3}}/>
                                {this.render_tokens_to_receive_from_shares(total_held_shares, item['balance'])}
                                <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    total_held_shares(total_number_of_transactions){
        var total = bigInt(0)
        total_number_of_transactions.forEach(transaction => {
            total = total.plus(transaction['balance']);
        });
        return total
    }

    get_account_alias(account_id){
        return (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[account_id] == null ? (this.props.app_state.loc['2871']/* 'Alias Unknown.' */) : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[account_id])
    }

    render_tokens_to_receive_from_shares(total_shares, shareholder_amount){
        var selected_object = this.state.token_item;
        var buy_tokens = [].concat(selected_object['data'][3])
        var buy_amounts = [].concat(selected_object['data'][4])
        return(
            <div>
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                        {buy_tokens.map((item, index) => (
                            <div style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[selected_object['e5']+item], 'number':this.format_price(this.calculate_payout_amount_for_individual_shareholder(buy_amounts[index], total_shares, shareholder_amount)), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                                {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[selected_object['e5']+item], 'subtitle':this.format_power_figure(this.calculate_payout_amount_for_individual_shareholder(buy_amounts[index], total_shares, shareholder_amount)), 'barwidth':this.calculate_bar_width(this.calculate_payout_amount_for_individual_shareholder(buy_amounts[index], total_shares, shareholder_amount)), 'number':this.format_price(this.calculate_payout_amount_for_individual_shareholder(buy_amounts[index], total_shares, shareholder_amount)), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    calculate_payout_amount_for_individual_shareholder(price, total_shares, shareholder_amount){
        var total_amount_of_token_being_distributed =  bigInt(price).multiply(this.state.payout_amount);
        return bigInt(total_amount_of_token_being_distributed).multiply(bigInt(shareholder_amount)).divide(total_shares)
    }




    render_transaction_batches_to_royalties(){
        var exchange_royalty_data = this.props.app_state.exchange_royalty_data[this.state.token_item['id']]
        var total_number_of_transactions = exchange_royalty_data['balance_data']
        var batches = this.get_batch_data(total_number_of_transactions, false)
        if(total_number_of_transactions.length == 0){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {batches.map((item, index) => (
                            <li style={{'padding': '5px 0px 5px 0px'}}>
                                {this.render_detail_item('3', {'details':item['data'].length+this.props.app_state.loc['2872']/* ' transactions.' */, 'title':this.props.app_state.loc['2873']/* 'Batch: ' */+ item['id'], 'size':'s'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    get_batch_data(total_number_of_transactions, should_use_string_id){
        var batches = []
        var batch_size = this.state.batch_size
        if(batch_size == 0) batch_size = 1;
        for(var i=0; i<total_number_of_transactions.length; i+=batch_size){
            var batch_data = []
            for(var j=0; j<batch_size; j++){
                if(total_number_of_transactions[i+j] != null){
                    batch_data.push(total_number_of_transactions[i+j])
                }
            }
            var id = i
            if(should_use_string_id){
                id = makeid(5)
            }
            batches.push({'data':batch_data, 'id':id})
        }
        return batches
    }




    finish(){
        var payout_title = this.state.payout_title;
        var payout_amount = this.state.payout_amount;
        var payout_start_timestamp = this.state.payout_start_timestamp;
        var royalty_payout_account = this.state.royalty_payout_account;
        var batch_size = this.state.batch_size;
        var now = (new Date().getTime()/1000)+1000

        var exchange_royalty_data = this.props.app_state.exchange_royalty_data[this.state.token_item['id']]
        var total_number_of_transactions = exchange_royalty_data['balance_data']
        var total_held_shares = this.total_held_shares(total_number_of_transactions)

        if(payout_title == ''){
            this.props.notify(this.props.app_state.loc['2875']/* You need to set a title for your payout staging. */, 6700)
        }
        else if(payout_amount == 0){
            this.props.notify(this.props.app_state.loc['2876']/* That payout amount is invalid */, 6700)
        }
        else if(payout_start_timestamp < now){
            this.props.notify(this.props.app_state.loc['2877']/* that payout date is invalid. */, 6700)
        }
        else if(parseInt(royalty_payout_account) < 1000){
            this.props.notify(this.props.app_state.loc['2878']/* That payout account is invalid. */, 6700)
        }
        else if(batch_size == 0){
            this.props.notify(this.props.app_state.loc['2879']/* That batch size is invalid. */, 6700)
        }
        else if(total_number_of_transactions.length == 0){
            this.props.notify(this.props.app_state.loc['2883']/* You cant stage no transactions. */, 6700)
        }
        else{
            var me = this;
            
            var batches = this.get_batch_data(total_number_of_transactions, true)
            var payout_data = {'payout_id':parseInt(Date.now()),'exchange_royalty_data':exchange_royalty_data, 'batches':batches, 'payout_title':payout_title, 'payout_amount':payout_amount, 'payout_start_timestamp':payout_start_timestamp, 'royalty_payout_account':royalty_payout_account, 'batch_size':batch_size, 'token_id':this.state.token_item['id'], 'sender':this.props.app_state.user_account_id[this.state.token_item['e5']], 'total_held_shares':total_held_shares}

            this.setState({payout_data:payout_data})

            setTimeout(function(){
                me.props.add_stage_royalties_to_stack(me.state)
        
                me.setState({selected: 0,
                id:makeid(8), type: me.props.app_state.loc['2846']/* 'stageroyalty' */, entered_indexing_tags:[me.props.app_state.loc['2847']/* 'stage' */, me.props.app_state.loc['2848']/* 'royalty' */, me.props.app_state.loc['2849']/* 'payouts' */], get_new_stageroyalties_action_page_tags_object: me.get_new_stageroyalties_action_page_tags_object(),

                payout_start_timestamp:(new Date().getTime()/1000)+64800, royalty_payout_account:'',
                get_transaction_ordering_tags_object: me.get_transaction_ordering_tags_object(),
                payout_amount:0, payout_title:'', batch_size:0,

                get_individual_or_batch_tags_object:me.get_individual_or_batch_tags_object(),})
            }, (1 * 1000));

            this.props.notify(this.props.app_state.loc['18'], 1700);
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




export default StageRoyaltiesPage;