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
import Tags from '../../components/tags';
import ViewGroups from '../../components/view_groups'
import TextInput from '../../components/text_input';
import NumberPicker from '../../components/number_picker';


import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

var bigInt = require("big-integer");

function number_with_commas(x) {
    if(x == null) x = '';
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

function start_and_end(str) {
  if (str.length > 13) {
    return str.substr(0, 6) + '...' + str.substr(str.length-6, str.length);
  }
  return str;
}

class EnterContractPage extends Component {
    
    state = {
        selected: 0, type:this.props.app_state.loc['1'], id:makeid(8),
        contract_item: null, enter_contract_title_tags_object:this.get_enter_contract_title_tags_object(), interactible_timestamp:Math.floor(new Date().getTime()/1000)+64800,
        entered_indexing_tags:[this.props.app_state.loc['2'], this.props.app_state.loc['3']], job_acceptance_action_state_object:null, 

        exchange_transfer_amount:0, exchange_transfer_values:[], token_target:'', 
        selected_certificate_target:null, proportion_amount:0, typed_search_fractionalized_tokens:'', fractionalization_data:{},
    };

    get_enter_contract_title_tags_object(){
        const obj = {
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1'], this.props.app_state.loc['1632c']/* 'proposals' */, 'e.'+this.props.app_state.loc['18b']/* extra-stake */], [1]
            ],
        };

        obj[this.props.app_state.loc['18b']/* extra-stake */] = [
            ['xor','',0], [this.props.app_state.loc['18b']/* extra-stake */,this.props.app_state.loc['3103c']/* 'tokens' */, this.props.app_state.loc['3103d']/* 'certificate' */], [1]
        ]

        return obj
    }



    set_contract(contract, job_acceptance_action_state_object){
        if(this.state.contract_item != null && this.state.contract_item['id'] != contract['id']){
            this.setState({
                selected: 0, type:this.props.app_state.loc['1'], id:makeid(8),
                contract_item: null, enter_contract_title_tags_object:this.get_enter_contract_title_tags_object(), interactible_timestamp:(new Date().getTime()/1000)+64800,
                entered_indexing_tags:[this.props.app_state.loc['2'], this.props.app_state.loc['3']]
            })
        }
        this.setState({contract_item: contract, e5: contract['e5'], job_acceptance_action_state_object: job_acceptance_action_state_object})
      
    }






    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.enter_contract_title_tags_object} tag_size={'l'} when_tags_updated={this.when_enter_contract_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img className="text-end" onClick={()=>this.finish_entering_contract_ui()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div>

                <div style={{height:10}}/>
                {this.render_data()}

            </div>
        )
    }

    when_enter_contract_title_tags_object_updated(tag_obj){
        this.setState({enter_contract_title_tags_object:tag_obj})
    }

    render_data(){
        if(this.state.contract_item == null) return;
        var selected_item = this.get_selected_item(this.state.enter_contract_title_tags_object, this.state.enter_contract_title_tags_object['i'].active)

        if(selected_item == this.props.app_state.loc['1']){
            return(
                <div>
                    {this.render_everything()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1632c']/* 'proposals' */){
            return(
                <div>
                    {this.render_proposal_ui()}
                </div>
            )
        }
        if(selected_item == this.props.app_state.loc['3103c']/* 'tokens' */){
            return this.add_tokens_ui()
        }
        else if(selected_item == this.props.app_state.loc['3103d']/* 'certificate' */){
            return this.add_certificates_ui()
        }
    }

    render_everything(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_date_picker_ui()}
                    {this.render_contract_entry_fees()}
                    {this.render_detail_item('0')}
                    {this.render_my_balances()}
                    <div style={{height:10}}/>
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_date_picker_ui()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_contract_entry_fees()}
                        {this.render_detail_item('0')}
                        {this.render_my_balances()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_date_picker_ui()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_contract_entry_fees()}
                        {this.render_detail_item('0')}
                        {this.render_my_balances()}
                    </div>
                </div>
                
            )
        }
    }

    render_date_picker_ui(){
        var contract_config = this.state.contract_item['data'][1]
        return(
            <div>
                {this.render_detail_item('3', {'title':this.get_time_diff(contract_config[6]), 'details':this.props.app_state.loc['5'], 'size':'l'})}

                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.get_time_diff(this.state.interactible_timestamp - Date.now()/1000), 'details':this.props.app_state.loc['6'], 'size':'l'})}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['7'], 'details':this.props.app_state.loc['8'], 'size':'l'})}

                <div style={{height:10}}/>
                <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], primary: { main: this.props.theme['primary_text_color'] }   }, })}>
                    <CssBaseline />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_new_dat_time_value_set(newValue)}/>
                    </LocalizationProvider>
                </ThemeProvider>
                <div style={{height:10}}/>

                <div onClick={()=>this.set_maximum_time()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['18a']/* 'Set Maximum Time.' */, 'action': ''})}
                </div>
                <div style={{height:10}}/>
            </div>
        )
    }

    when_new_dat_time_value_set(value){
        const selectedDate = value instanceof Date ? value : new Date(value);
        const timeInSeconds = Math.floor(selectedDate.getTime() / 1000);
        this.setState({interactible_timestamp: timeInSeconds})
    }

    set_maximum_time(){
        var contract_config = this.state.contract_item['data'][1]
        var now = Math.floor(Date.now()/1000)
        var max = bigInt(now).plus(contract_config[6])
        this.setState({interactible_timestamp: max})
    }

    render_contract_entry_fees(){
        var entry_tokens = this.state.contract_item['data'][2]
        var entry_amounts = this.state.contract_item['data'][3]
        var entry_amount_depths = this.state.contract_item['data'][4]
        if(entry_tokens != null && entry_tokens.length != 0){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['9'], 'title':this.props.app_state.loc['10']})}
                    <div style={{height:10}}/>
                    {this.render_buy_token_uis(entry_tokens, entry_amounts, entry_amount_depths)}
                </div>
            )
        }
    }

    render_my_balances(){
        var entry_tokens = this.state.contract_item['data'][2]
        var buy_amount_balances = []
        var entry_amount_depths = this.state.contract_item['data'][4]

        if(entry_tokens != null && entry_tokens.length != 0){
            for(var i=0; i<entry_tokens.length; i++){
                var token_id = entry_tokens[i]
                var token_balance = this.props.app_state.created_token_object_mapping[this.state.contract_item['e5']][token_id]
                token_balance = token_balance == null ? 0 : token_balance['balance']
                buy_amount_balances.push(token_balance)
            }
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['11'], 'title':this.props.app_state.loc['12']})}
                    <div style={{height:10}}/>

                    {this.render_buy_token_uis(entry_tokens, buy_amount_balances, entry_amount_depths)}
                </div>
            )
        }
    }

    render_buy_token_uis(buy_tokens, buy_amounts, buy_depths){
        var bt = [].concat(buy_tokens)
        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px', 'list-style':'none'}}>
                    {bt.map((item, index) => (
                        <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'number':buy_amounts[index], 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                            {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item], 'subtitle':this.format_power_figure(buy_amounts[index]), 'barwidth':this.calculate_bar_width(buy_amounts[index]), 'number':this.format_account_balance_figure(buy_amounts[index]), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                        </li>
                    ))}
                </ul>
            </div>  
        )
    }




    render_proposal_ui(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'14px','text':this.props.app_state.loc['1632d']/* 'The proposals that have been sent to the contract are shown below.' */})}
                    <div style={{height:10}}/>
                    {this.render_proposals_data()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'14px','text':this.props.app_state.loc['1632d']/* 'The proposals that have been sent to the contract are shown below.' */})}
                        <div style={{height:10}}/>
                        {this.render_proposals_data()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_contract_entry_fees()}
                        {this.render_detail_item('0')}
                        {this.render_my_balances()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'14px','text':this.props.app_state.loc['1632d']/* 'The proposals that have been sent to the contract are shown below.' */})}
                        <div style={{height:10}}/>
                        {this.render_proposals_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_contract_entry_fees()}
                        {this.render_detail_item('0')}
                        {this.render_my_balances()}
                    </div>
                </div>
                
            )
        }
    }

    render_proposals_data(){
        var background_color = this.props.theme['card_background_color']
        var items = this.props.app_state.contracts_proposals[this.state.contract_item['id']] == null ? [] : this.props.app_state.contracts_proposals[this.state.contract_item['id']]
        var middle = this.props.height
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-150;
        }
        if(items.length == 0){
            items = ['0','1'];
            return (
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 0px 2px 0px'}}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:60 ,width:'auto'}} />
                                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }else{
            return (
                <div ref={this.proposal_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                {this.render_proposal_object(item, index)}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }

    render_proposal_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_proposal_item(object)

        if(this.state.selected_proposal != index){
            return(
                <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}} onClick={() => this.when_proposal_item_clicked(index)}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{'padding': '20px 0px 0px 0px'}}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                </div>         
            </div>
            )
        }
        return(
            <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}} onClick={() => this.when_proposal_item_clicked(index)}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['proposal_expiry_time'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['proposal_expiry_time_from_now'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['consensus_submit_expiry_time'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['proposal_submit_expiry_time_from_now'])}
                    
                    {this.render_detail_item('0')}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['vote_wait'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['vote_yes'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['vote_no'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['status'])}
                    <div style={{height:10}}/>
                </div>         
            </div>
        )
    }

    when_proposal_item_clicked(index){
        if(this.state.selected_proposal == index){
            this.setState({selected_proposal: null})
        }else{
            this.setState({selected_proposal: index})
        }
    }

    format_proposal_item(object){
        var tags = object['ipfs'] == null ? ['Proposal'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Proposal ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p6
        var time = object['event'] == null ? 0 : object['event'].returnValues.p5
        var consensus_obj = {0:this.props.app_state.loc['316']/* spend' */,1:this.props.app_state.loc['317']/* 'reconfig' */, 6:this.props.app_state.loc['318']/* 'exchange-transfer' */}
        var proposal_config = object['data'][1]
        var consensus_type = consensus_obj[proposal_config[0]]
        var status = object['submitted'] == true ? this.props.app_state.loc['1632e']/* submitted */:this.props.app_state.loc['1632f']/* Un-submitted */
        return {
            'tags':{'active_tags':[consensus_type].concat(tags), 'index_option':'indexed', 'when_tapped':''},
            'id':{'title':object['e5']+' • '+object['id'], 'details':title, 'size':'l', 'image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },

            'proposal_expiry_time':{'title':this.props.app_state.loc['1862']/* 'Proposal Expiry time' */, 'details':''+(new Date(proposal_config[1]*1000)), 'size':'l'},
            'proposal_expiry_time_from_now':{'title':this.get_time_from_now(proposal_config[1]), 'details':this.props.app_state.loc['1863']/* 'Proposal expiry time from now' */, 'size':'l'},

            'consensus_submit_expiry_time':{'title':this.props.app_state.loc['1864']/* 'Proposal Submit Expiry time' */, 'details':''+(new Date(proposal_config[3]*1000)), 'size':'l'},
            'proposal_submit_expiry_time_from_now':{'title':this.get_time_from_now(proposal_config[3]), 'details':this.props.app_state.loc['1865']/* 'Proposal submit expiry time from now' */, 'size':'l'},

            'vote_wait':{'title':''+this.format_account_balance_figure(object['consensus_data'][0])+this.props.app_state.loc['787']/* ' WAIT votes' */, 'details':this.get_proportion_of_total(object, object['consensus_data'][0])+'%', 'size':'l'},

            'vote_yes':{'title':''+this.format_account_balance_figure(object['consensus_data'][1])+this.props.app_state.loc['788']/* ' YES votes' */, 'details':this.get_proportion_of_total(object, object['consensus_data'][1])+'%', 'size':'l'},

            'vote_no':{'title':''+this.format_account_balance_figure(object['consensus_data'][2])+this.props.app_state.loc['789']/* ' NO votes' */, 'details':this.get_proportion_of_total(object, object['consensus_data'][2])+'%', 'size':'l'},

            'status':{'title':status, 'details':this.props.app_state.loc['1632g']/* 'Status' */, 'size':'l'},
        }
    }

    get_time_from_now(time){
        var number_date = Math.round(parseInt(time));
        var now = Math.round(new Date().getTime()/1000);

        var diff = number_date - now;
        return this.get_time_diff(diff)
    }

    get_proportion_of_total(object, vote_count){
        var sum = bigInt(object['consensus_data'][0]) + bigInt(object['consensus_data'][1]) + bigInt(object['consensus_data'][2]);

        if(sum == bigInt(0)){
            return 0
        }

        var prop = (bigInt(vote_count).divide(sum)).multiply(100)

        if(isNaN(prop)){
            return 0
        }
        return prop
    }












    add_tokens_ui(){
        var size = this.props.app_state.size
        if(size == 's'){
            return(
                <div>
                    {this.render_select_tokens_data()}
                    {this.render_detail_item('0')}
                    {this.render_set_tokens_list_part()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_select_tokens_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_tokens_list_part()}
                    </div>
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_select_tokens_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_tokens_list_part()}
                    </div>
                </div>
            )
        }
    }

    render_select_tokens_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['914']/* 'Token Targets' */, 'details':this.props.app_state.loc['3103e']/* 'Set the targeted token ID your transfering to the contract' */, 'size':'l'})}
                <div style={{height:20}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['916']/* 'Token Target ID...' */} when_text_input_field_changed={this.when_token_target_text_input_field_changed.bind(this)} text={this.state.token_target} theme={this.props.theme}/>

                {this.load_token_suggestions('token_target')}
                {this.render_detail_item('0')}


                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['917']/* 'Targeted Amount' */, 'number':this.state.exchange_transfer_amount, 'relativepower':this.props.app_state.loc['918']/* 'units' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['917']/* 'Targeted Amount' */, 'subtitle':this.format_power_figure(this.state.exchange_transfer_amount), 'barwidth':this.calculate_bar_width(this.state.exchange_transfer_amount), 'number':this.format_account_balance_figure(this.state.exchange_transfer_amount), 'barcolor':'', 'relativepower':this.props.app_state.loc['918']/* 'units' */, })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_exchange_transfer_amount_changed.bind(this)} theme={this.props.theme} power_limit={63}/>

                <div style={{height:20}}/>
                <div style={{'padding': '5px'}} onClick={()=>this.add_exchange_transfer_item()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['919']/* 'Add Transfer Action' */, 'action':''})}
                </div>
            </div>
        )
    }

    when_token_target_text_input_field_changed(text){
        this.setState({token_target: text})
    }

    when_exchange_transfer_amount_changed(amount){
        this.setState({exchange_transfer_amount:amount})
    }

    add_exchange_transfer_item(){
        var target_amount = this.state.exchange_transfer_amount
        var targeted_token = this.state.token_target.trim()

        if(isNaN(targeted_token) || parseInt(targeted_token) < 0 || targeted_token == '' || !this.does_exchange_exist(targeted_token)){
            this.props.notify(this.props.app_state.loc['921']/* 'Please put a valid token ID.' */, 2600)
        }
        else if(target_amount == 0){
            this.props.notify(this.props.app_state.loc['922']/* 'Please put a valid amount.' */, 2600)
        }
        else{
            var exchange_transfer_values_clone = this.state.exchange_transfer_values.slice()
            var tx = { 'amount':target_amount, 'token':targeted_token }
            exchange_transfer_values_clone.push(tx)
            this.setState({exchange_transfer_values: exchange_transfer_values_clone,  exchange_transfer_amount:0, token_target:''})

            this.props.notify(this.props.app_state.loc['923']/* 'transfer action added' */, 1600)
        }
    }

    does_exchange_exist(exchange_id){
        if(this.props.app_state.created_token_object_mapping[this.state.contract_item['e5']][parseInt(exchange_id)] == null){
            return false
        }
        return true
    }

    render_set_tokens_list_part(){
        var items = [].concat(this.state.exchange_transfer_values)
        
        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{}}>
                    {this.render_empty_views(4)}
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
                                    action: () =>this.when_transfer_action_value_clicked(item)
                                    }}>
                                    <div style={{width:'100%', /* 'background-color':this.props.theme['send_receive_ether_background_color'] */}}>
                                        <li style={{'padding': '5px'}}>
                                            <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['token']]+':'+item['token'], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['token']]})}>
                                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['token']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['token']], })}
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

    when_transfer_action_value_clicked(item){
        var cloned_array = this.state.exchange_transfer_values.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({exchange_transfer_values: cloned_array})
        // this.props.notify(this.props.app_state.loc['925']/* 'transfer action removed!' */, 1600)
    }












    add_certificates_ui(){
        var size = this.props.app_state.size
        if(size == 's'){
            return(
                <div>
                    {this.render_select_certificates_data()}
                    {this.render_detail_item('0')}
                    {this.render_set_certificates_list_part()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_select_certificates_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_certificates_list_part()}
                    </div>
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_select_certificates_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_certificates_list_part()}
                    </div>
                </div>
            )
        }
    }

    render_select_certificates_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3103f']/* 'Certificate Targets' */, 'details':this.props.app_state.loc['3103g']/* 'Select the certificates you wish to transfer to the contract. Only fractionalized certificates will show here.' */, 'size':'l'})}
                {this.render_detail_item('10', {'font':this.props.app_state.font, 'textsize':'12px', 'text':this.props.app_state.loc['3103h']/* 'Only fractionalized certificates will show here.' */})}

                <div style={{margin:'5px 10px 0px 10px'}}>
                    <TextInput font={this.props.app_state.font} height={20} placeholder={this.props.app_state.loc['3098v']/* 'Search a certificate...' */} when_text_input_field_changed={this.when_typed_search_fractionalized_tokens_text_input_field_changed.bind(this)} text={this.state.typed_search_fractionalized_tokens} theme={this.props.theme}/>
                </div>
                <div style={{height:10}}/>
                {this.load_certificates()}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3103i']/* 'Set the number of shares the contract will receive as a proportion of the total.' */, 'title':this.props.app_state.loc['3101e']/* 'Proportion of Shares.' */})}
                                
                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.format_proportion(this.state.proportion_amount), 'details':this.props.app_state.loc['3101g']/* 'Fractionalized Proportion to Receive.' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_proportion_amount_proportion.bind(this)} power_limit={9} theme={this.props.theme} decimal_count={16} pick_with_text_area={true} text_area_hint={'5.3%'}/>

                <div style={{height:20}}/>
                <div style={{'padding': '5px'}} onClick={()=>this.add_certificate_transfer_item()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['919']/* 'Add Transfer Action' */, 'action':''})}
                </div>
            </div>
        )
    }

    when_typed_search_fractionalized_tokens_text_input_field_changed(text){
        this.setState({typed_search_fractionalized_tokens: text})
    }

    when_proportion_amount_proportion(number){
        this.setState({proportion_amount: number})
    }

    add_certificate_transfer_item(){
        const selected_certificate = this.state.selected_certificate
        const proportion = this.state.proportion_amount
        const clone = structuredClone(this.state.fractionalization_data)

        if(selected_certificate == null){
            this.props.notify(this.props.app_state.loc['3098bc']/* 'Please select a certificate first.' */, 2600)
        }
        else if(proportion == 0){
            this.props.notify(this.props.app_state.loc['3101k']/* 'You need to speficy a proportion.' */, 3600)
        }
        else if(this.get_remainder(selected_certificate).lesserOrEquals(0)){
            this.props.notify(this.props.app_state.loc['3098bd']/* 'The shares youve set is higher than your balance.' */, 3600)
        }
        else{
            clone[selected_certificate['e5_id']] = {
                'object':selected_certificate,
                'proportion': proportion
            }
            this.setState({fractionalization_data: clone, selected_certificate: null, selected_certificate_target: null})
            this.props.notify(this.props.app_state.loc['3101l']/* 'recipient\'s proportion set.' */, 900)
        }
    }

    get_remainder(selected_certificate){
        const values = Object.values(this.state.fractionalization_data)
        var total = bigInt(0)
        values.forEach(proportion => {
            total = total.plus(proportion)
        });
        return bigInt(selected_certificate['balance']).minus(total)
    }

    render_set_certificates_list_part(){
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
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3103j']/* 'When you specify some shares to transfer, they will show here.' */, 'title':this.props.app_state.loc['3103k']/* 'No set transfers.' */})}
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
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['438by']/* 'The proportions set for reception by the contract.' */, 'title':this.props.app_state.loc['438bz']/* 'Your set proportions' */})}
                    <div style={{height:10}}/>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.reverse().map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_transfer_clicked(item)
                                    }}>
                                    <div style={{width:'100%', /* 'background-color':this.props.theme['send_receive_ether_background_color'] */}}>
                                        {this.render_transfer_item(item)}
                                    </div>
                                </SwipeableListItem>
                            </SwipeableList>
                            
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_transfer_item(item){
        const data = this.state.fractionalization_data[item]
        const object = data['object']
        const model_data = object['ipfs']['model_data']
        const class_name = model_data['class_name']
        const time = object['ipfs']['depth_item']['time']
        const details = class_name + ' • ' + this.props.app_state.loc['3098y']/* 'Minted on $' */.replace('$', (new Date(time * 1000).toLocaleString()))
        const proportion = data['proportion']
        const title = this.format_proportion(proportion)
        return(
            <div>
                {this.render_detail_item('3', {'title':title, 'details':details, 'size':'l'})}
            </div>
        )
    }

    when_transfer_clicked(item){
        const clone = structuredClone(this.state.fractionalization_data)
        delete clone[item]
        this.setState({fractionalization_data: clone})
    }











    load_certificates(){
        const unfiltered_items = [].concat(this.get_suggested_certificates())
        const items = unfiltered_items.filter((render_item) => {
            const t = this.state.typed_search_fractionalized_tokens.trim().toLowerCase()
            const item = render_item['object']
            const depth_data = item['ipfs']['depth_item']['depth_data']
            const model_config = item['ipfs']['model_data']
            const class_name = model_config['class_name']
            const ipfs = item['ipfs']['depth_item']['ipfs']
            const markdown = ipfs['markdown']
            const class_markdown = model_config['class_markdown']
            return (
                t == '' ||
                class_name.toLowerCase().startsWith(t) ||
                markdown.toLowerCase().includes(t) ||
                class_markdown.toLowerCase().includes(t)
            )
        })
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_suggestion_clicked(item, index)}>
                            {this.render_detail_item('3', item['label'])}
                            {this.show_line_if_selected(item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    show_line_if_selected(item){
        if(item['object']['e5_id'] == this.state.selected_certificate_target){
            return(
                <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
            )
        }
    }

    get_suggested_certificates(){
        const certificate_ids = Object.keys(this.props.app_state.fractionalized_assets)
        const exchanges_from_sync = []
        certificate_ids.forEach(certificate_id => {
            const exchange_ids = Object.keys(this.props.app_state.fractionalized_assets[certificate_id])
            exchange_ids.forEach(exchange_id => {
                exchanges_from_sync.push(this.props.app_state.fractionalized_assets[certificate_id][exchange_id])
            });
        });
        var sorted_token_exchange_data = []
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
        const items = []
        for (let i = 0; i < sorted_token_exchange_data.length; i++) {
            const object = sorted_token_exchange_data[i]
            const model_data = object['ipfs']['model_data']
            const class_name = model_data['class_name']
            const time = object['ipfs']['depth_item']['time']
            const footer = this.props.app_state.loc['3098y']/* 'Minted on $' */.replace('$', (new Date(time * 1000).toLocaleString()))
            items.push({'object':object, 'label':{'title':start_and_end(class_name), 'details':this.format_proportion(object['balance']), 'footer':footer, 'size':'l'}})
        }
        return items;
    }

    when_suggestion_clicked(item, index){
        this.setState({selected_certificate_target: item['object']['e5_id'], selected_certificate: item['object']})
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
            {'id':'3', 'label':{'title':this.props.app_state.loc['3078']/* END */, 'details':this.state.e5, 'size':'s', 'image':this.props.app_state.e5s[this.state.e5].end_image, 'img_size':30}},
            {'id':'5', 'label':{'title':this.props.app_state.loc['3079']/* SPEND */, 'details':this.state.e5.replace('E', '3'), 'size':'s', 'image':this.props.app_state.e5s[this.state.e5].spend_image, 'img_size':30}},
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
            items.push({'id':sorted_token_exchange_data[i]['id'], 'label':{'title':sorted_token_exchange_data[i]['ipfs'].entered_symbol_text, 'details':sorted_token_exchange_data[i]['ipfs'].entered_title_text, 'size':'s', 'image':(sorted_token_exchange_data[i]['ipfs'].token_image == null ? (sorted_token_exchange_data[i]['data'][0][3/* <3>token_type */] == 3 ? this.props.app_state.static_assets['end_img']:this.props.app_state.static_assets['spend_img']) : sorted_token_exchange_data[i]['ipfs'].token_image), 'img_size':30}})
        }

        return items;
    }

    when_price_suggestion_clicked(item, pos, target_type){
        if(target_type == 'token_target'){
            this.setState({token_target: item['id']})
        }
    }








    finish_entering_contract_ui(){
        var picked_time = this.state.interactible_timestamp
        var now = Date.now()/1000
        var contracts_limit = this.state.contract_item['data'][1][6]
        
        var expiry_time_in_seconds = this.state.contract_item['entry_expiry']
        var time_to_expiry = expiry_time_in_seconds - Math.floor(new Date() / 1000);

        if(picked_time < now){
            this.props.notify(this.props.app_state.loc['14'], 3500);
        }
        else if(picked_time - now > contracts_limit){
            this.props.notify(this.props.app_state.loc['15'], 3600);
        }
        else if(expiry_time_in_seconds != 0 && time_to_expiry > 0){
            if(this.state.job_acceptance_action_state_object != null){
                this.props.accept_job_without_entering_contract(this.state.job_acceptance_action_state_object)
                this.props.notify(this.props.app_state.loc['18'], 700);
            }else{
                this.props.notify(this.props.app_state.loc['16'], 3700);
            }
        }
        else if(!this.check_if_sender_can_enter_contract()){
            this.props.notify(this.props.app_state.loc['17'], 5700);
        }
        else if(!this.check_if_sender_has_enough_balance_for_awards()){
            this.props.notify(this.props.app_state.loc['3094c']/* 'One of your token balances is insufficient for the transfers specified.' */, 7700)
        }
        else{
            // var clone = structuredClone(this.state)
            // clone.e5 = this.props.app_state.selected_e5
            
            this.props.enter_contract(this.state, this.state.job_acceptance_action_state_object)
            this.props.notify(this.props.app_state.loc['18'], 700);
        }
        
    }

    check_if_sender_can_enter_contract(){
        var can_enter = true;
        var entry_tokens = this.state.contract_item['data'][2]
        var entry_amounts = this.state.contract_item['data'][3]

        for(var i=0; i<entry_tokens.length; i++){
            var token_id = entry_tokens[i]
            // var token_balance = this.props.app_state.created_token_object_mapping[this.state.contract_item['e5']][token_id]
            // token_balance = token_balance == null ? 0 : token_balance['balance']
            var token_balance = this.props.calculate_actual_balance(this.state.contract_item['e5'],token_id)
            if(bigInt(token_balance) < bigInt(entry_amounts[i])){
                can_enter = false
                // console.log('check_if_sender', 'token balance: ',token_balance, 'entry amounts', entry_amounts[i])
            }
        }
        return can_enter
    }

    check_if_sender_has_enough_balance_for_awards(){
        var has_enough = true
        var price_data = this.state.exchange_transfer_values
        for(var i=0; i<price_data.length; i++){
            var bounty_item_exchange = price_data[i]['token']
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
                    for(var j=0; j<t.price_data.length; j++){
                        var exchange = t.price_data[j]['id']
                        var amount = t.price_data[j]['amount']
                        if(exchange == token_id){
                            total_amount = bigInt(total_amount).add(amount)
                        }
                    }
                }
            }
        }
        return total_amount
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

    get_number_width(number){
        if(number == null) return '0%'
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
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
                <ViewGroups token_name_thumbnail_directory={this.props.app_state?.token_name_thumbnail_directory} e5s={this.props.app_state?.e5s} graph_type={this.props.app_state.graph_type} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} font={this.props.app_state.font}/>
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

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
    }


}




export default EnterContractPage;