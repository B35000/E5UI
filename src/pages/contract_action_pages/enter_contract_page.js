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
import Tags from '../../components/tags';
import ViewGroups from '../../components/view_groups'
import TextInput from '../../components/text_input';
import NumberPicker from '../../components/number_picker';


import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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

class EnterContractPage extends Component {
    
    state = {
        selected: 0, type:this.props.app_state.loc['1'], id:makeid(8),
        contract_item: {'data':[[],[0,0,0,0,0,0,0,0,0,0]]}, enter_contract_title_tags_object:this.get_enter_contract_title_tags_object(), interactible_timestamp:(new Date().getTime()/1000)+64800,
        entered_indexing_tags:[this.props.app_state.loc['2'], this.props.app_state.loc['3']], job_acceptance_action_state_object:null
    };

    get_enter_contract_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1'], this.props.app_state.loc['1632c']/* 'proposals' */], [1]
            ],
        };
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

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }


    render_data(){
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
                <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], }, })}>
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
                                        <img alt="" src={this.props.app_state.static_assets['letter']} style={{height:60 ,width:'auto'}} />
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


    set_contract(contract, job_acceptance_action_state_object){
        if(this.state.contract_item['id'] != contract['id']){
            this.setState({
                selected: 0, type:this.props.app_state.loc['1'], id:makeid(8),
                contract_item: {'data':[[],[0,0,0,0,0,0,0,0,0,0]]}, enter_contract_title_tags_object:this.get_enter_contract_title_tags_object(), interactible_timestamp:(new Date().getTime()/1000)+64800,
                entered_indexing_tags:[this.props.app_state.loc['2'], this.props.app_state.loc['3']]
            })
        }
        this.setState({contract_item: contract, e5: contract['e5'], job_acceptance_action_state_object: job_acceptance_action_state_object})
      
    }


    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} font={this.props.app_state.font}/>
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


}




export default EnterContractPage;