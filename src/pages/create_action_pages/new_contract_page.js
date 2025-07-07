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
import ViewGroups from '../../components/view_groups';
import Tags from '../../components/tags';
import NumberPicker from '../../components/number_picker';
import TextInput from '../../components/text_input';
import DurationPicker from '../../components/duration_picker';

// import Letter from '../../assets/letter.png';

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Draggable } from "react-drag-reorder";

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

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

class NewContractPage extends Component {
    
    state = {
        id: makeid(8), object_type:30, type:this.props.app_state.loc['66'], e5:this.props.app_state.selected_e5,
        entered_tag_text: '',entered_indexing_tags:[],entered_title_text:'',
        new_contract_tags_object: this.get_new_contract_tags_object(), 
        
        new_contract_type_tags_object:this.get_new_contract_type_tags_object(),
        default_vote_bounty_split_proportion:0, max_extend_enter_contract_limit:0, default_minimum_end_vote_bounty_amount:0, default_proposal_expiry_duration_limit:0, max_enter_contract_duration:0, 
        
        auto_wait_tags_object:this.get_auto_wait_tags_object(), default_minimum_spend_vote_bounty_amount:0, proposal_modify_expiry_duration_limit:0, can_modify_contract_as_moderator: this.get_can_modify_contract_as_moderator(), can_extend_enter_contract_at_any_time: this.get_can_extend_enter_contract_at_any_time(),maximum_proposal_expiry_submit_expiry_time_difference:0, bounty_limit_type: this.get_bounty_limit_type(), contract_force_exit_enabled: this.get_contract_force_exit_enabled(), include_enter_contract_action_tags_object: this.get_include_enter_contract_action_tags_object(),

        new_token_interactible_moderator_tags_object: this.get_new_token_interactible_moderator_tags_object(),
        moderator_id:'', moderators:[], interactible_id:'', interactible_timestamp:0, interactibles:[],
        exchange_id:'', price_amount:0, price_data:[], 

        page:0, 

        content_channeling_setting: this.props.app_state.content_channeling, device_language_setting: this.props.app_state.device_language, device_country: this.props.app_state.device_country,

        default_consensus_majority_limit:0, voter_weight_exchange_id:''
    };

    constructor(props) {
        super(props);
        this.number_picker_ref = React.createRef();
    }

    get_new_contract_tags_object(){
        var obj = {
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['163'], 'e.'+this.props.app_state.loc['113'], this.props.app_state.loc['164']], [0]
            ],
            'authorities':[
              ['xor','e',1], [this.props.app_state.loc['114'],this.props.app_state.loc['118'], this.props.app_state.loc['119']], [1],[1]
          ],
        };

        obj[this.props.app_state.loc['114']] = [
              ['xor','e',1], [this.props.app_state.loc['114'],this.props.app_state.loc['118'], this.props.app_state.loc['119']], [1],[1]
          ];
        return obj
    }

    get_auto_wait_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['81'], this.props.app_state.loc['82']], [1]
            ],
        };
    }

    get_can_modify_contract_as_moderator(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['83'], this.props.app_state.loc['84']], [1]
            ],
        };
    }

    get_can_extend_enter_contract_at_any_time(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['85'], this.props.app_state.loc['86']], [1]
            ],
        };
    }

    get_bounty_limit_type(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['87'], this.props.app_state.loc['88']], [2]
            ],
        };
    }

    get_contract_force_exit_enabled(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['85'], this.props.app_state.loc['86']], [1]
            ],
        };
    }


    get_new_token_interactible_moderator_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['118'], this.props.app_state.loc['119']], [1]
            ],
        };
    }


    get_new_contract_type_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['165'], this.props.app_state.loc['166']], [2]
            ],
        };
    }


    get_include_enter_contract_action_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['1']], [0]
            ],
        };
    }





    render(){
        return(
            <div>
                <div style={{'padding':'10px 10px 0px 10px'}}>
                    <div className="row" style={{'width':'102%'}}>
                        <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                            <Tags font={this.props.app_state.font} page_tags_object={this.state.new_contract_tags_object} tag_size={'l'} when_tags_updated={this.when_new_contract_tags_object.bind(this)} theme={this.props.theme}/>
                        </div>
                        <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                            <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                                <img alt="" className="text-end" onClick={()=>this.finish_creating_object()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                            </div>
                        </div>
                    </div>
                    
                    
                    <div style={{'margin':'5px 0px 0px 0px'}}>
                        {this.render_everything()}   
                    </div>
                    
                </div>
            </div>
        )
    }

    set_state(state){
        this.setState(state)
    }

    when_new_contract_tags_object(tag_obj){
        this.setState({new_contract_tags_object: tag_obj, page:0})
    }


    render_everything(){
        var selected_item = this.get_selected_item(this.state.new_contract_tags_object, this.state.new_contract_tags_object['i'].active)

        if(selected_item == 'e'){
            return(
                <div>
                    {this.render_enter_tags_part()}
                </div>
            )    
        }else
        if(selected_item == this.props.app_state.loc['163']){
            return(
                <div>
                    {this.render_contract_list()}
                </div>
            ) 
        }
        else if(selected_item == this.props.app_state.loc['118'] || selected_item == this.props.app_state.loc['119']){
            return(
                <div>
                    {this.render_authorities_part()}
                </div>
            ) 
        }
        else if(selected_item == this.props.app_state.loc['164']){
            return(
                <div>
                    {this.render_prices_part()}
                </div>
            ) 
        }
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }

    render_enter_tags_part(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div>
                    {this.render_title_tags_part()}
                    {this.render_detail_item('0')}
                    {this.render_presets_menu()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}                  
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 0px 0px 0px'}}>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_title_tags_part()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_presets_menu()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_title_tags_part()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_presets_menu()}
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

    render_title_tags_part(){
        return(
            <div style={{'padding':'0px 10px 0px 10px'}}>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['167']})}
                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['123']} when_text_input_field_changed={this.when_title_text_input_field_changed.bind(this)} text={this.state.entered_title_text} theme={this.props.theme}/>
                <div style={{height:10}}/>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.state.entered_title_text})}
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']+(this.props.app_state.title_size - this.state.entered_title_text.length)})}

                {this.render_detail_item('0')}
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['168']})}
                <div style={{height:10}}/>

                <div className="row" style={{'width':'99%'}}>
                    <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['126']} when_text_input_field_changed={this.when_index_text_input_field_changed.bind(this)} text={this.state.entered_tag_text} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 10px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                            <img alt="" className="text-end" onClick={()=>this.add_indexing_tag_for_new_job()} src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                        </div>
                    </div>
                </div>
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']+(this.props.app_state.tag_size - this.state.entered_tag_text.length)})}

                {this.render_detail_item('1',{'active_tags':this.state.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':'delete_entered_tag_word'})}

                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['170'], 'details':this.props.app_state.loc['171'], 'size':'l'})}
                <div style={{height:20}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.include_enter_contract_action_tags_object} tag_size={'l'} when_tags_updated={this.when_include_enter_contract_action_tags_object.bind(this)} theme={this.props.theme}/>


                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311dc']/* 'Current post size.' */, 'details':this.props.app_state.loc['a311dd']/* 'Below is the size of your new post with all the details youve set.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_transaction_size_indicator()}
                <div style={{height:20}}/>
                
                
            </div>
        )
    }

    when_include_enter_contract_action_tags_object(tag_obj){
        this.setState({include_enter_contract_action_tags_object: tag_obj})
    }

    when_title_text_input_field_changed(text){
        this.setState({entered_title_text: text})
    }

    when_index_text_input_field_changed(text){
        this.setState({entered_tag_text: text})
    }

    add_indexing_tag_for_new_job(){
        var typed_word = this.state.entered_tag_text.trim().toLowerCase();

        if(typed_word == ''){
            this.props.notify(this.props.app_state.loc['128'], 400)
        }
        else if(this.hasWhiteSpace(typed_word)){
            this.props.notify(this.props.app_state.loc['129'], 400)
        }
        else if(typed_word.length > this.props.app_state.tag_size){
            this.props.notify(this.props.app_state.loc['130'], 400)
        }
        else if(typed_word.length < 3){
            this.props.notify(this.props.app_state.loc['131'], 400)
        }
        else if(this.state.entered_indexing_tags.includes(typed_word)){
            this.props.notify(this.props.app_state.loc['132'], 400)
        }
        else if(this.state.entered_indexing_tags.length == this.props.app_state.max_tags_count){
            this.props.notify(this.props.app_state.loc['162l']/* The maximum number of tags you can use is 7. */, 5400)
        }
        else if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(typed_word)){
            this.props.notify(this.props.app_state.loc['162m'], 4400)/* You cant use special characters. */
        }
        else{
            var cloned_seed_array = this.state.entered_indexing_tags.slice()
            cloned_seed_array.push(typed_word)
            this.setState({entered_indexing_tags: cloned_seed_array, entered_tag_text:''})
            // this.props.notify('tag added!', 200)
        }
    }

    hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
    }

    delete_entered_tag_word(word, pos){
        var cloned_seed_array = this.state.entered_indexing_tags.slice()
        const index = cloned_seed_array.indexOf(word);
        if (index > -1) { // only splice array when item is found
            cloned_seed_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_indexing_tags: cloned_seed_array})
        // this.props.notify('tag removed', 200)
    }







    render_presets_menu(){
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['172']})}
                <div style={{height:10}}/>

                <div onClick={()=>this.preset_workgroup_contract()}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['173'], 'details':this.props.app_state.loc['174'], 'size':'l'})}
                </div>
                <div style={{height:3}}/>

                <div  onClick={()=>this.preset_personal_contract()}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['175'], 'details':this.props.app_state.loc['176'], 'size':'l'})}
                </div>
                <div style={{height:3}}/>

                <div onClick={()=>this.preset_work_contract()}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['177'], 'details':this.props.app_state.loc['178'], 'size':'l'})}
                </div>
                <div style={{height:3}}/>

                <div onClick={()=>this.preset_life_contract()}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['179'], 'details':this.props.app_state.loc['180'], 'size':'l'})}
                </div>
                <div style={{height:3}}/>
            </div>
        )
    }

    get_mint_limit(token_id){
        if(this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5] == null || this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][token_id] == null){
            if(this.props.app_state.selected_e5 == 'E25') return bigInt('35000000')
            else if(this.props.app_state.selected_e5 == 'E35') return bigInt('3500000')
            else return bigInt('72000000')
        }else{
            return this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][token_id]['data'][1][0/* <0>default_exchange_amount_buy_limit */]
        }
    }

    preset_workgroup_contract(is_checking_type){
        var end_mint_limit = this.get_mint_limit(3)
        var spend_mint_limit = this.get_mint_limit(5)

        var end_price = bigInt((Math.round(end_mint_limit * 0.01)).toString())
        var spend_price = bigInt((Math.round(spend_mint_limit * 0.001)).toString())

        var auto_wait = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['81'], this.props.app_state.loc['82']], [1] ], };
        var can_modify_contrac_as_mod = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['83'], this.props.app_state.loc['84']], [1] ], };
        var can_extend_enter_contract_at_any_time = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['89'], this.props.app_state.loc['90']], [1] ], };
        var bounty_limit_type = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['87'], this.props.app_state.loc['88']], [2] ], };
        var force_exit_enabled = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['89'], this.props.app_state.loc['90']], [1] ], };
        var contract_type = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['165'], this.props.app_state.loc['166']], [1] ], };
        var price = [{'id':'3', 'amount':end_price}, {'id':'5', 'amount':spend_price}]

        var set_object = {
            new_contract_type_tags_object: contract_type,
            default_vote_bounty_split_proportion: bigInt('3e16'),/* 3% */
            max_extend_enter_contract_limit: (60*60*24*7*53),/* 1 year */
            default_minimum_end_vote_bounty_amount: bigInt('5000'),
            default_proposal_expiry_duration_limit: (60*60*24), /* 1 day */
            max_enter_contract_duration: (60*60*24*7*53),/* 1 year */

            auto_wait_tags_object:auto_wait,
            default_minimum_spend_vote_bounty_amount:bigInt('1000'),
            proposal_modify_expiry_duration_limit: (60*60*3), /* 3 hrs */
            can_modify_contract_as_moderator: can_modify_contrac_as_mod,
            can_extend_enter_contract_at_any_time: can_extend_enter_contract_at_any_time,
            maximum_proposal_expiry_submit_expiry_time_difference: (60*60*24*7*2),/* 2 weeks */
            bounty_limit_type:bounty_limit_type,
            contract_force_exit_enabled: force_exit_enabled,
            price_data:price, default_consensus_majority_limit: bigInt('75e16')
        }

        if(is_checking_type != null && is_checking_type == true){
            var keys = Object.keys(set_object)
            var is_matching = true;
            keys.forEach(setting => {
                if(this.state[setting] != set_object[setting]){
                    is_matching = false
                }
            });
            return is_matching
        }
        else{
            this.setState(set_object);
            this.props.notify(this.props.app_state.loc['181'], 2500)
        }

    }

    preset_personal_contract(is_checking_type){
        var auto_wait = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['81'], this.props.app_state.loc['82']], [2] ], };
        var can_modify_contrac_as_mod = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['83'], this.props.app_state.loc['84']], [1] ], };
        var can_extend_enter_contract_at_any_time = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['89'], this.props.app_state.loc['90']], [1] ], };
        var bounty_limit_type = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['87'], this.props.app_state.loc['88']], [2] ], };
        var force_exit_enabled = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['89'], this.props.app_state.loc['90']], [1] ], };
        var contract_type = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['165'], this.props.app_state.loc['166']], [1] ], };
        var price = [{'id':'3', 'amount':bigInt('3500')}]

        var set_object = {
            new_contract_type_tags_object: contract_type,
            default_vote_bounty_split_proportion: bigInt('3e16'),/* 3% */
            max_extend_enter_contract_limit: (60*60*24*7*53),/* 1 year */
            default_minimum_end_vote_bounty_amount: bigInt('0'),
            default_proposal_expiry_duration_limit: (60*60*24), /* 1 day */
            max_enter_contract_duration: bigInt('1e72'),/* forever */

            auto_wait_tags_object:auto_wait,
            default_minimum_spend_vote_bounty_amount:bigInt('0'),
            proposal_modify_expiry_duration_limit: bigInt('1e72'), /* forever */
            can_modify_contract_as_moderator: can_modify_contrac_as_mod,
            can_extend_enter_contract_at_any_time: can_extend_enter_contract_at_any_time,
            maximum_proposal_expiry_submit_expiry_time_difference: bigInt('1e72'),/* forever */
            bounty_limit_type:bounty_limit_type,
            contract_force_exit_enabled: force_exit_enabled,
            price_data:price, default_consensus_majority_limit: 0
        }

        if(is_checking_type != null && is_checking_type == true){
            var keys = Object.keys(set_object)
            var is_matching = true;
            keys.forEach(setting => {
                if(this.state[setting] != set_object[setting]){
                    is_matching = false
                }
            });
            return is_matching
        }
        else{
            this.setState(set_object);
            this.props.notify(this.props.app_state.loc['182'], 2500)
        }

    }

    preset_work_contract(is_checking_type){
        var end_mint_limit = this.get_mint_limit(3)
        var spend_mint_limit = this.get_mint_limit(5)

        var end_price = bigInt((Math.round(end_mint_limit * 0.01)).toString())
        var spend_price = bigInt((Math.round(spend_mint_limit * 0.006)).toString())

        var auto_wait = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['81'], this.props.app_state.loc['82']], [1] ], };
        var can_modify_contrac_as_mod = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['83'], this.props.app_state.loc['84']], [2] ], };
        var can_extend_enter_contract_at_any_time = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['85'], this.props.app_state.loc['86']], [1] ], };
        var bounty_limit_type = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['87'], this.props.app_state.loc['88']], [2] ], };

        var force_exit_enabled = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['85'], this.props.app_state.loc['86']], [1] ], };
        var contract_type = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['165'], this.props.app_state.loc['166']], [2] ], };
        var price = [{'id':'3', 'amount':end_price}, {'id':'5', 'amount':spend_price}]

        var set_object = {
            new_contract_type_tags_object: contract_type,
            default_vote_bounty_split_proportion: bigInt('3e16'),/* 3% */
            max_extend_enter_contract_limit: (60*60*24*120),/* 4m0 */
            default_minimum_end_vote_bounty_amount: bigInt('0'),
            default_proposal_expiry_duration_limit: (60*60*9), /* 5 hr */
            max_enter_contract_duration: (60*60*24*120),/* 4 mo */

            auto_wait_tags_object:auto_wait,
            default_minimum_spend_vote_bounty_amount:bigInt('0'),
            proposal_modify_expiry_duration_limit: (60*60*3), /* 3 hrs */
            can_modify_contract_as_moderator: can_modify_contrac_as_mod,
            can_extend_enter_contract_at_any_time: can_extend_enter_contract_at_any_time,
            maximum_proposal_expiry_submit_expiry_time_difference: (60*60*24*7),/* 1 week */
            bounty_limit_type:bounty_limit_type,
            contract_force_exit_enabled: force_exit_enabled,
            price_data:price, default_consensus_majority_limit: 0
        }

        if(is_checking_type != null && is_checking_type == true){
            var keys = Object.keys(set_object)
            var is_matching = true;
            keys.forEach(setting => {
                if(this.state[setting] != set_object[setting]){
                    is_matching = false
                }
            });
            return is_matching
        }
        else{
            this.setState(set_object);
            this.props.notify(this.props.app_state.loc['183'], 2500)
        }

    }
   
    preset_life_contract(is_checking_type){
        var end_mint_limit = this.get_mint_limit(3)
        var spend_mint_limit = this.get_mint_limit(5)
        
        var end_price = bigInt((Math.round(end_mint_limit * 0.01)).toString())
        var spend_price = bigInt((Math.round(spend_mint_limit * 0.01)).toString())

        var auto_wait = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['81'], this.props.app_state.loc['82']], [2] ], };
        var can_modify_contrac_as_mod = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['83'], this.props.app_state.loc['84']], [2] ], };
        var can_extend_enter_contract_at_any_time = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['89'], this.props.app_state.loc['90']], [1] ], };
        var bounty_limit_type = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['87'], this.props.app_state.loc['88']], [2] ], };
        var force_exit_enabled = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['89'], this.props.app_state.loc['90']], [2] ], };
        var contract_type = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['165'], this.props.app_state.loc['166']], [1] ], };
        var price = [{'id':'3', 'amount':end_price}, {'id':'5', 'amount':spend_price}]



        var set_object = {
            new_contract_type_tags_object: contract_type,
            default_vote_bounty_split_proportion: bigInt('3e16'),/* 3% */
            max_extend_enter_contract_limit: bigInt('1e72'),/* forever */
            default_minimum_end_vote_bounty_amount: bigInt('0'),
            default_proposal_expiry_duration_limit: (60*60*24), /* 1 hr */
            max_enter_contract_duration: bigInt('1e72'),/* forever */

            auto_wait_tags_object:auto_wait,
            default_minimum_spend_vote_bounty_amount:bigInt('0'),
            proposal_modify_expiry_duration_limit: (60*60*10), /* 10 hrs */
            can_modify_contract_as_moderator: can_modify_contrac_as_mod,
            can_extend_enter_contract_at_any_time: can_extend_enter_contract_at_any_time,
            maximum_proposal_expiry_submit_expiry_time_difference: (60*60*24*7),/* 1 week */
            bounty_limit_type:bounty_limit_type,
            contract_force_exit_enabled: force_exit_enabled,
            price_data:price, default_consensus_majority_limit: 0
        }

        if(is_checking_type != null && is_checking_type == true){
            var keys = Object.keys(set_object)
            var is_matching = true;
            keys.forEach(setting => {
                if(this.state[setting] != set_object[setting]){
                    is_matching = false
                }
            });
            return is_matching
        }
        else{
            this.setState(set_object);
            this.props.notify(this.props.app_state.loc['184'], 2500)
        }

    }



    get_contract_type(){
        if(this.preset_workgroup_contract(true) == true){
            return 'workgroup'
        }
        else if(this.preset_personal_contract(true) == true){
            return 'personal'
        }
        else if(this.preset_work_contract(true) == true){
            return 'work'
        }
        else if(this.preset_life_contract(true) == true){
            return 'life'
        }
        else{
            return 'custom'
        }
    }






    render_transaction_size_indicator(){
        var current_stack_size = this.props.app_state.stack_size_in_bytes[this.state.e5] == null ? 50 : this.props.app_state.stack_size_in_bytes[this.state.e5]
        if(current_stack_size != -1){
            const size = this.lengthInUtf8Bytes(JSON.stringify(this.state))
            const stack_size_in_bytes_formatted_data_size = this.format_data_size2(size)
            
            var existing_percentage = this.round_off((current_stack_size / this.props.app_state.upload_object_size_limit) * 100)
            var additional_percentage = this.round_off((size / this.props.app_state.upload_object_size_limit) * 100)
            
            if(existing_percentage >= 100){
                existing_percentage = 99.99
                additional_percentage = 0.01
            }

            if(existing_percentage + additional_percentage >= 100){
                additional_percentage = 100 - existing_percentage;
            }

            return(
                <div>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['a311da']/* 'Post Size.' */, 'subtitle':this.format_power_figure(stack_size_in_bytes_formatted_data_size['size']), 'barwidth':this.calculate_bar_width(stack_size_in_bytes_formatted_data_size['size']), 'number':(stack_size_in_bytes_formatted_data_size['size']), 'barcolor':'#606060', 'relativepower':stack_size_in_bytes_formatted_data_size['unit'], })}

                        {this.render_impact_value({'title':this.props.app_state.loc['a311db']/* 'Impact on Run.' */, 'subtitle':'e0', 'barwidth':existing_percentage+'%', 'barwidth2':additional_percentage+'%', 'number':(existing_percentage + additional_percentage)+'%', 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1881']/* 'proportion' */,})}
                    </div>
                </div>
            )
        }
    }

    render_impact_value(object_data){
        var title = object_data != null ? object_data['title']:'Post Block Number'
        var subtitle = object_data != null ? object_data['subtitle']:'depth'
        var barwidth = object_data != null ? object_data['barwidth']:'84%'
        var barwidth2 = object_data != null ? object_data['barwidth2']:'5%'
        var number = object_data != null ? object_data['number']:'123,445,555'
        var barcolor = this.props.theme['bar_color']
        var relativepower = object_data != null ? object_data['relativepower']:'500 blocks'
        return(
            <div style={{'margin': '5px 20px 0px 15px'}}>
                <div className="row">
                    <div className="col-10" style={{'padding': '0px 0px 0px 14px' }}> 
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'font-family': this.props.app_state.font}} className="fw-bold">{title}</p>
                    </div>
                    <div className="col-2" style={{'padding': '0px 15px 0px 0px' }}>
                        <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '11px', height: 7, 'padding-top':' 0.5px', 'font-family': this.props.app_state.font}} className="text-end">{subtitle}</p>
                    </div>
                </div>
                
                <div style={{ height: 3, width: "100%", 'border-radius': '5px', 'box-shadow': '0px 0px 2px 1px '+this.props.theme['bar_shadow'], 'margin': '0px 0px 4px 0px' }}>
                    <div className="progress" style={{ height: 3, width: "100%", 'background-color': this.props.theme['linebar_background_color'] }}>
                        <div className="progress-bar" role="progressbar" style={{ width: barwidth, 'background-image': 'none','background-color': 'white', 'border-radius': '0px 0px 0px 0px' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"/>

                        <div className="progress-bar" role="progressbar" style={{ width: barwidth2, 'background-image': 'none','background-color': barcolor, 'border-radius': '0px 0px 0px 0px' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-9" style={{'padding': '0px 0px 0px 14px' }}> 
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: '100%', 'font-family': this.props.app_state.font}} className="fw-bold">{number}</p>
                    </div>
                    <div className="col-3" style={{'padding': '0px 15px 0px 0px' }}>
                        <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '10px', height: '100%', 'padding-top':' 1px', 'font-family': this.props.app_state.font}} className="text-end">{relativepower}</p>
                    </div>
                </div>
            </div>
        )
    }

    format_data_size2(size){
        if(size > 1_000_000_000){
            return {'size':this.round_off(parseFloat(size)/(1_024*1_024*1_024)), 'unit':'GBs'}
        }
        else if(size > 1_000_000){
            return {'size':this.round_off(parseFloat(size)/(1_024*1_024)), 'unit':'MBs'}
        }
        else if(size > 1_000){
            return {'size':this.round_off(parseFloat(size)/1024), 'unit':'KBs'}
        }
        else{
            return {'size':parseFloat(size), 'unit':'bytes'}
        }
    }

    round_off(float_number){
        return (Math.round(float_number * 100) / 100)
    }

    lengthInUtf8Bytes(str) {
        // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
        var m = encodeURIComponent(str).match(/%[89ABab]/g);
        return str.length + (m ? m.length : 0);
    }
    
    render_new_job_object(){
        return;
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return ( 
            <div onClick={() => console.log()} style={{height:'auto', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color, 'margin':'0px 10px 10px 10px'}}>
                <div style={{'padding': '5px 0px 5px 0px'}}>
                    {this.render_detail_item('1',{'active_tags':this.state.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':'delete_entered_tag_word'})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.state.entered_title_text})}
                    {this.render_detail_item('0')}

                </div>         
            </div>
        );
    }






    when_new_contract_type_tags_object(tag_obj){
        this.setState({new_contract_type_tags_object: tag_obj})
    }

    when_default_vote_bounty_split_proportion(number){
        this.setState({default_vote_bounty_split_proportion: number})
    }

    when_max_extend_enter_contract_limit(number){
        this.setState({max_extend_enter_contract_limit: number})
    }

    when_default_minimum_end_vote_bounty_amount(number){
        this.setState({default_minimum_end_vote_bounty_amount: number})
    }

    when_default_proposal_expiry_duration_limit(number){
        this.setState({default_proposal_expiry_duration_limit: number})
    }

    when_max_enter_contract_duration(number){
        this.setState({max_enter_contract_duration: number})
    }

    when_auto_wait_tags_object(tag_obj){
        this.setState({auto_wait_tags_object: tag_obj})
    }

    when_default_minimum_spend_vote_bounty_amount(number){
        this.setState({default_minimum_spend_vote_bounty_amount: number})
    }


    when_proposal_modify_expiry_duration_limit(number){
        this.setState({proposal_modify_expiry_duration_limit: number})
    }

    when_can_modify_contract_as_moderator(tag_obj){
        this.setState({can_modify_contract_as_moderator: tag_obj})
    }

    when_can_extend_enter_contract_at_any_time(tag_obj){
        this.setState({can_extend_enter_contract_at_any_time: tag_obj})
    }

    when_maximum_proposal_expiry_submit_expiry_time_difference(number){
        this.setState({maximum_proposal_expiry_submit_expiry_time_difference: number})
    }

    when_bounty_limit_type(tag_obj){
        this.setState({bounty_limit_type: tag_obj})
    }

    when_contract_force_exit_enabled(tag_obj){
        this.setState({contract_force_exit_enabled: tag_obj})
    }




    render_contract_list(){
         var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_contract_list_small_screen()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row"> 
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_contract_list_medium_screen()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_contract_list_medium_screen2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_contract_list_medium_screen()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_contract_list_medium_screen2()}
                    </div>
                </div>
                
            )
        }
    }


    render_contract_list_medium_screen(){
        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['185']})}
                <div style={{height:20}}/>

                {this.render_contract_section_parts(0)}
                {this.render_detail_item('0')}
                {this.render_contract_section_parts(1)}
                {this.render_detail_item('0')}
                {this.render_contract_section_parts(2)}
                {this.render_detail_item('0')}
                {this.render_contract_section_parts(3)}
                {this.render_detail_item('0')}
                {this.render_contract_section_parts(4)}
                {this.render_detail_item('0')}
                {this.render_contract_section_parts(5)}
                {this.render_detail_item('0')}
                
                
            </div>
        )
    }

    render_contract_list_medium_screen2(){
        return(
            <div>
                {this.render_contract_section_parts(8)}
                {this.render_detail_item('0')}
                {this.render_contract_section_parts(9)}
                {this.render_detail_item('0')}
                {this.render_contract_section_parts(10)}
                {this.render_detail_item('0')}
                {this.render_contract_section_parts(11)}
                {this.render_detail_item('0')}
                {this.render_contract_section_parts(12)}
                {this.render_detail_item('0')}
                {this.render_contract_section_parts(13)}
                {this.render_detail_item('0')}
                {this.render_contract_section_parts(14)}
                {this.render_detail_item('0')}
                {this.render_contract_section_parts(6)}
                {this.render_detail_item('0')}
                {this.render_contract_section_parts(7)}
                {this.render_detail_item('0')}
            </div>
        )
    }


    render_contract_list_small_screen(){
        var page = this.state.page
        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['185']})}
                <div style={{height:20}}/>
                {this.render_contract_section_parts(page)}

                <div style={{height:20}}/>
                <div className="row">
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.show_previous_button()}
                    </div>
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.show_next_button()}
                    </div>
                </div>
                <div style={{height:20}}/>
            </div>
        )
    }

    show_next_button(){
        var page = this.state.page
        if(page < 14){
            return(
                <div style={{'padding': '5px'}} onClick={()=>this.enter_next_page()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['186'], 'action':''})}
                </div>
            )
        }
    }

    show_previous_button(){
        var page = this.state.page
        if(page != 0){
            return(
                <div style={{'padding': '5px'}} onClick={()=>this.enter_previous_page()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['187'], 'action':''})}
                </div>
            )
        }
    }



    render_contract_section_parts(page){
        // var page = this.state.page

        if(page == 0){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['188'], 'details':this.props.app_state.loc['189'], 'size':'l'})}
                    <div style={{height:20}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.new_contract_type_tags_object} tag_size={'l'} when_tags_updated={this.when_new_contract_type_tags_object.bind(this)} theme={this.props.theme}/>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['190'], 'textsize':'10px', 'font':this.props.app_state.font})}
                </div>
            )
        }
        else if(page == 1){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['191'], 'details':this.props.app_state.loc['192'], 'size':'l'})}
                    <div style={{height:20}}/>

                    {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_vote_bounty_split_proportion), 'details':this.props.app_state.loc['193'], 'size':'l'})}

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['194'], 'textsize':'10px', 'font':this.props.app_state.font})}

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_default_vote_bounty_split_proportion.bind(this)} power_limit={9} theme={this.props.theme} decimal_count={16} pick_with_text_area={true} text_area_hint={'5.3%'}/>
                </div>
            )
        }
        else if(page == 2){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['195'], 'details':this.props.app_state.loc['196'], 'size':'l'})}
                    <div style={{height:20}}/>

                    {this.render_detail_item('3', {'title':this.get_time_diff(this.state.max_extend_enter_contract_limit), 'details':this.props.app_state.loc['195'], 'size':'l'})}

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['197'], 'textsize':'10px', 'font':this.props.app_state.font})}

                    <DurationPicker font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_max_extend_enter_contract_limit.bind(this)} theme={this.props.theme} power_limit={63} loc={this.props.app_state.loc}/>
                </div>
            )
        }
        else if(page == 3){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['198'], 'details':this.props.app_state.loc['199'], 'size':'l'})}
                    <div style={{height:20}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'number':this.state.default_minimum_end_vote_bounty_amount, 'title':this.props.app_state.loc['200'], 'relativepower':'END'})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['200'], 'subtitle':this.format_power_figure(this.state.default_minimum_end_vote_bounty_amount), 'barwidth':this.calculate_bar_width(this.state.default_minimum_end_vote_bounty_amount), 'number':this.format_account_balance_figure(this.state.default_minimum_end_vote_bounty_amount), 'barcolor':'', 'relativepower':'END', })}
                    </div>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'', 'textsize':'10px', 'font':this.props.app_state.font})}

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_default_minimum_end_vote_bounty_amount.bind(this)} theme={this.props.theme} power_limit={63}/>
                </div>
            )
        }
        else if(page == 4){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['201'], 'details':this.props.app_state.loc['202'], 'size':'l'})}
                    <div style={{height:20}}/>
                    
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['203'], 'number':this.state.default_minimum_spend_vote_bounty_amount, 'relativepower':'SPEND'})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['203'], 'subtitle':this.format_power_figure(this.state.default_minimum_spend_vote_bounty_amount), 'barwidth':this.calculate_bar_width(this.state.default_minimum_spend_vote_bounty_amount), 'number':this.format_account_balance_figure(this.state.default_minimum_spend_vote_bounty_amount), 'barcolor':'', 'relativepower':'SPEND', })}
                    </div>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'', 'textsize':'10px', 'font':this.props.app_state.font})}

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_default_minimum_spend_vote_bounty_amount.bind(this)} theme={this.props.theme} power_limit={63}/>
                </div>
            )
        }
        else if(page == 5){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['204'], 'details':this.props.app_state.loc['205'], 'size':'l'})}
                    <div style={{height:20}}/>
                    
                    {this.render_detail_item('3', {'title':this.get_time_diff(this.state.max_enter_contract_duration), 'details':this.props.app_state.loc['204'], 'size':'l'})}

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['206'], 'textsize':'10px', 'font':this.props.app_state.font})}

                    <DurationPicker font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_max_enter_contract_duration.bind(this)} theme={this.props.theme} power_limit={63} loc={this.props.app_state.loc}/>
                </div>
            )
        }
        else if(page == 6){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['207'], 'details':this.props.app_state.loc['208'], 'size':'l'})}

                    <div style={{height:20}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.auto_wait_tags_object} tag_size={'l'} when_tags_updated={this.when_auto_wait_tags_object.bind(this)} theme={this.props.theme}/>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['209'], 'textsize':'10px', 'font':this.props.app_state.font})}

                </div>
            )
        }
        // else if(page == 7){
        //     return(
        //         <div>
        //             {this.render_detail_item('3', {'title':this.props.app_state.loc['210'], 'details':this.props.app_state.loc['211'], 'size':'l'})}
        //             <div style={{height:20}}/>
                    
        //             {this.render_detail_item('3', {'title':this.get_time_diff(this.state.proposal_modify_expiry_duration_limit), 'details':this.props.app_state.loc['210'], 'size':'l'})}

        //             <div style={{height:2}}/>
        //             {this.render_detail_item('10', {'text':this.props.app_state.loc['212'], 'textsize':'10px', 'font':this.props.app_state.font})}

        //             <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_proposal_modify_expiry_duration_limit.bind(this)} theme={this.props.theme} power_limit={63}/>
        //         </div>
        //     )
        // }
        else if(page == 7){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['213'], 'details':this.props.app_state.loc['214'], 'size':'l'})}

                    <div style={{height:20}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.can_modify_contract_as_moderator} tag_size={'l'} when_tags_updated={this.when_can_modify_contract_as_moderator.bind(this)} theme={this.props.theme}/>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['215'], 'textsize':'10px', 'font':this.props.app_state.font})}

                </div>
            )
        }
        else if(page == 8){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['216'], 'details':this.props.app_state.loc['217'], 'size':'l'})}

                    <div style={{height:20}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.can_extend_enter_contract_at_any_time} tag_size={'l'} when_tags_updated={this.when_can_extend_enter_contract_at_any_time.bind(this)} theme={this.props.theme}/>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['218'], 'textsize':'10px', 'font':this.props.app_state.font})}
                    
                </div>
            )
        }
        else if(page == 9){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['219'], 'details':this.props.app_state.loc['220'], 'size':'l'})}
                    <div style={{height:20}}/>
                    
                    {this.render_detail_item('3', {'title':this.get_time_diff(this.state.maximum_proposal_expiry_submit_expiry_time_difference), 'details':this.props.app_state.loc['219'], 'size':'l'})}

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['221'], 'textsize':'10px', 'font':this.props.app_state.font})}

                    <DurationPicker font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_maximum_proposal_expiry_submit_expiry_time_difference.bind(this)} theme={this.props.theme} power_limit={63} loc={this.props.app_state.loc}/>
                </div>
            )
        }
        else if(page == 10){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['222'], 'details':this.props.app_state.loc['223'], 'size':'l'})}

                    <div style={{height:20}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.bounty_limit_type} tag_size={'l'} when_tags_updated={this.when_bounty_limit_type.bind(this)} theme={this.props.theme}/>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['224'], 'textsize':'10px', 'font':this.props.app_state.font})}
                    
                </div>
            )
        }
        else if(page == 11){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['225'], 'details':this.props.app_state.loc['226'], 'size':'l'})}

                    <div style={{height:20}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.contract_force_exit_enabled} tag_size={'l'} when_tags_updated={this.when_contract_force_exit_enabled.bind(this)} theme={this.props.theme}/>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['227'], 'textsize':'10px', 'font':this.props.app_state.font})}
                    
                </div>
            )
        }
        else if(page == 12){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['228'], 'details':this.props.app_state.loc['229'], 'size':'l'})}
                    <div style={{height:20}}/>

                    {this.render_detail_item('3', {'title':this.get_time_diff(this.state.default_proposal_expiry_duration_limit), 'details':this.props.app_state.loc['228'], 'size':'l'})}

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['230'], 'textsize':'10px', 'font':this.props.app_state.font})}

                    <DurationPicker font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_default_proposal_expiry_duration_limit.bind(this)} theme={this.props.theme} power_limit={63} loc={this.props.app_state.loc}/>
                </div>
            )
        }
        else if(page == 13){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['231'], 'details':this.props.app_state.loc['232'], 'size':'l'})}
                    <div style={{height:20}}/>

                    {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_consensus_majority_limit), 'details':this.props.app_state.loc['231'], 'size':'l'})}

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['233'], 'textsize':'10px', 'font':this.props.app_state.font})}

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_default_consensus_majority_limit.bind(this)} power_limit={9} theme={this.props.theme} decimal_count={16} pick_with_text_area={true} text_area_hint={'5.3%'}/>
                </div>
            )
        }
        else if(page == 14){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['234'], 'details':this.props.app_state.loc['235'], 'size':'l'})}
                    <div style={{height:20}}/>

                    <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['237']/* 'Exchange ID' */} when_text_input_field_changed={this.when_exchange_voter_weight_id_changed.bind(this)} text={this.state.voter_weight_exchange_id} theme={this.props.theme}/>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['252a'], 'textsize':'10px', 'font':this.props.app_state.font})}

                    {this.load_token_suggestions('weight_exchange_id')}
                </div>
            )
        }
    }


    when_default_consensus_majority_limit(number){
        this.setState({default_consensus_majority_limit: number})
    }

    when_exchange_voter_weight_id_changed(id){
        this.setState({voter_weight_exchange_id: id})
    }

    
    enter_next_page(){
        var page = this.state.page
        if(page < 18){
            this.setState({page: this.state.page+1})
            this.reset_the_number_picker()
        }
    }

    enter_previous_page(){
        var page = this.state.page
        if(page > 0){
            this.setState({page: this.state.page-1})
            this.reset_the_number_picker()
        }
    }

    reset_the_number_picker(){
        var me = this;
        setTimeout(function() {
            if(me.number_picker_ref.current != null){
                me.number_picker_ref.current.reset_number_picker()
            }
        }, (1 * 1000));  
    }














    render_authorities_part(){
        return(
            <div style={{}}>
                {this.render_moderator_interactible_ui()}
            </div>
        )
    }



    render_moderator_interactible_ui(){
        return(
            <div>
                {/* <Tags font={this.props.app_state.font} page_tags_object={this.state.new_token_interactible_moderator_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_interactible_moderator_tags_object.bind(this)} theme={this.props.theme}/> */}

                {this.render_moderator_or_interactible_setting()}
            </div>
        )
    }

    when_new_token_interactible_moderator_tags_object(tag_obj){
        this.setState({new_token_interactible_moderator_tags_object: tag_obj})
    }

    render_moderator_or_interactible_setting(){
        var selected_item = this.get_selected_item(this.state.new_contract_tags_object, this.props.app_state.loc['114'])

        if(selected_item == this.props.app_state.loc['118'] || selected_item == 'e'){
            return(
                <div>
                    {this.render_moderator_settings()}
                </div>
            )    
        }
        else if(selected_item == this.props.app_state.loc['119']){
            return(
                <div>
                    {this.render_interactible_settings()}
                </div>
            ) 
        }
    }


    render_moderator_settings(){
        var size = this.props.size
         var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_moderator_ui()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_moderator_ui()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_moderator_ui()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_moderator_ui(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['149'], 'details':this.props.app_state.loc['150'], 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['149']} when_text_input_field_changed={this.when_moderator_id_input_field_changed.bind(this)} text={this.state.moderator_id} theme={this.props.theme}/>

                {this.load_account_suggestions('moderator_id')}

                <div style={{height: 10}}/>
                <div style={{'padding': '5px'}} onClick={() => this.when_add_moderator_button_tapped()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['151'], 'action':''})}
                </div>

                {this.render_added_moderators()}
            </div>
        )
    }

    when_moderator_id_input_field_changed(text){
        this.setState({moderator_id: text})
    }

    when_add_moderator_button_tapped(){
        var moderator_id = this.get_typed_alias_id(this.state.moderator_id.trim())
        var moderators_clone = this.state.moderators.slice()
        if(isNaN(moderator_id) || parseInt(moderator_id) < 0 || moderator_id == ''){
            this.props.notify(this.props.app_state.loc['98'], 3600)
        }
        else if(moderators_clone.includes(parseInt(moderator_id))){
            this.props.notify(this.props.app_state.loc['162n'], 4600)
        }
        else{
            moderators_clone.push(parseInt(moderator_id))
            this.setState({moderators: moderators_clone, moderator_id:''});
            this.props.notify(this.props.app_state.loc['152'], 1400)
        }
    }

    get_typed_alias_id(alias){
        if(!isNaN(alias)){
            return alias
        }
        var id = (this.props.app_state.alias_owners[this.props.app_state.selected_e5][alias] == null ? 
            alias : this.props.app_state.alias_owners[this.props.app_state.selected_e5][alias])

        return id
    }

    render_added_moderators(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.moderators)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 10px 0px'}}>
                                        <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
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
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_moderator_account_clicked(item)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '5px'}}>
                                            {this.render_detail_item('3', {'title':''+item, 'details':this.props.app_state.loc['153'], 'size':'l'})}
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

    when_moderator_account_clicked(item){
        var cloned_array = this.state.moderators.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({moderators: cloned_array})
    }

    render_interactible_settings(){
         var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_interactable_calendar_picker()}
                    <div style={{height:20}}/>
                    {this.render_set_interactible_accounts()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_interactable_calendar_picker()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_interactible_accounts()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_interactable_calendar_picker()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_interactible_accounts()}
                    </div>
                </div>
                
            )
        }
    }

    render_interactable_calendar_picker(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['154'], 'details':this.props.app_state.loc['155'], 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['154']} when_text_input_field_changed={this.when_interactible_id_input_field_changed.bind(this)} text={this.state.interactible_id} theme={this.props.theme}/>

                {this.load_account_suggestions('interactible_id')}

                <div style={{height:5}}/>

                <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], }, })}>
                    <CssBaseline />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_new_dat_time_value_set(newValue)}/>
                    </LocalizationProvider>
                </ThemeProvider>

                <div style={{height:20}}/>
                <div style={{'padding': '5px'}} onClick={() => this.when_add_interactible_button_tapped()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['157'], 'action':''})}
                </div>
            </div>
        )
    }

    when_interactible_id_input_field_changed(text){
        this.setState({interactible_id: text})
    }

    when_new_dat_time_value_set(value){
        const selectedDate = value instanceof Date ? value : new Date(value);
        const timeInSeconds = Math.floor(selectedDate.getTime() / 1000);
        this.setState({interactible_timestamp: timeInSeconds})
    }

    when_add_interactible_button_tapped(){
        var interactible_id = this.get_typed_alias_id(this.state.interactible_id.trim())
        var interactibles_clone = this.state.interactibles.slice()
        if(isNaN(interactible_id) || parseInt(interactible_id) < 0 || interactible_id == ''){
            this.props.notify(this.props.app_state.loc['98'], 2600)
        }
        else if(this.state.interactible_timestamp < (new Date().getTime()/1000)){
            this.props.notify(this.props.app_state.loc['236'], 2600)
        }
        else if(this.is_interactable_included(interactible_id, interactibles_clone)){
            this.props.notify(this.props.app_state.loc['162n'], 3600)
        }
        else{
            interactibles_clone.push({'id': interactible_id, 'timestamp':this.state.interactible_timestamp})
            this.setState({interactibles: interactibles_clone, interactible_id: ''});
            this.props.notify(this.props.app_state.loc['157'], 1400)
        }
    }

    is_interactable_included(id, clone){
        var has_been_added = false
        clone.forEach(item => {
            var added_id = item['id']
            if(id == added_id){
                has_been_added = true
            }
        });
        return has_been_added
    }

    // get_typed_alias_id(alias){
    //     if(!isNaN(alias)){
    //         return alias
    //     }
    //     var id = (this.props.app_state.alias_owners[this.props.app_state.selected_e5][alias] == null ? 
    //         alias : this.props.app_state.alias_owners[this.props.app_state.selected_e5][alias])

    //     return id
    // }

    render_set_interactible_accounts(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.interactibles)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
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
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_interactible_account_clicked(item)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '5px'}}>
                                            {this.render_detail_item('3', {'title':this.props.app_state.loc['158']+item['id'], 'details':this.props.app_state.loc['159']+(new Date(item['timestamp']*1000)), 'size':'l'})}
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

    when_interactible_account_clicked(item){
        var cloned_array = this.state.interactibles.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({interactibles: cloned_array})
    }











    render_prices_part(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div>
                    {this.render_set_token_and_amount_part()}
                    <div style={{height: 20}}/>
                    {this.render_set_prices_list_part()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_token_and_amount_part()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_prices_list_part()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_token_and_amount_part()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_prices_list_part()}
                    </div>
                </div>
                
            )
        }
    }

    calculate_minimum_end_amount(){
        var amount = 0
        if(this.props.app_state.created_contract_mapping[this.props.app_state.selected_e5] != null){
            var main_contract_data = this.props.app_state.created_contract_mapping[this.props.app_state.selected_e5][2]['data']
            var default_end_minimum_contract_amount = main_contract_data[1][3/* <3>default_end_minimum_contract_amount */]
            return default_end_minimum_contract_amount
            // var gas_price = parseInt(this.props.app_state.gas_price[this.props.app_state.selected_e5])
            // if(gas_price == null){
            //     return default_end_minimum_contract_amount
            // }
            // var gas_anchor_price = parseInt(main_contract_data[1][23/* <23>gas_anchor_price */])
            // var a = (gas_price * default_end_minimum_contract_amount)/gas_anchor_price
            // if(a < 1) a = 1;
            // amount = a
        }
        return parseInt(amount)
    }

    calculate_minimum_spend_amount(){
        var amount = 0
        if(this.props.app_state.created_contract_mapping[this.props.app_state.selected_e5] != null){
            var main_contract_data = this.props.app_state.created_contract_mapping[this.props.app_state.selected_e5][2]['data']
            var default_spend_minimum_contract_amount = main_contract_data[1][9/* <9>default_spend_minimum_contract_amount */]
            var rp = this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5] == null ? bigInt('1e18') : bigInt(this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][5] == null ? bigInt('1e18') : this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][5]['data'][2][6])
            amount = bigInt(rp).multiply(bigInt(default_spend_minimum_contract_amount)).divide(bigInt('1e18'))
        }
        return amount
    }

    render_set_token_and_amount_part(){
        var minimum_end_amount = this.calculate_minimum_end_amount()
        var minimum_spend_amount = this.calculate_minimum_spend_amount()
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['237'], 'details':this.props.app_state.loc['238'], 'size':'l'})}
                
                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['239'], 'subtitle':this.format_power_figure(minimum_end_amount), 'barwidth':this.calculate_bar_width(minimum_end_amount), 'number':this.format_account_balance_figure(minimum_end_amount), 'barcolor':'', 'relativepower':'END', })}
                </div>
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['240'], 'subtitle':this.format_power_figure(minimum_spend_amount), 'barwidth':this.calculate_bar_width(minimum_spend_amount), 'number':this.format_account_balance_figure(minimum_spend_amount), 'barcolor':'', 'relativepower':'SPEND', })}
                </div>

                {this.render_detail_item('0')}

                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['237']} when_text_input_field_changed={this.when_exchange_id_input_field_changed.bind(this)} text={this.state.exchange_id} theme={this.props.theme}/>

                {this.load_token_suggestions('exchange_id')}
                <div style={{height: 20}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['241'], 'number':this.state.price_amount, 'relativepower':this.props.app_state.loc['483']/* tokens */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['241'], 'subtitle':this.format_power_figure(this.state.price_amount), 'barwidth':this.calculate_bar_width(this.state.price_amount), 'number':this.format_account_balance_figure(this.state.price_amount), 'barcolor':'', 'relativepower':this.props.app_state.loc['483']/* tokens */, })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_price_amount.bind(this)} theme={this.props.theme} power_limit={63}/>

                <div style={{'padding': '5px'}} onClick={() => this.when_add_price_set()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['242'], 'action':''})}
                </div>
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
        var exchange_id = this.get_token_id_from_symbol(this.state.exchange_id.trim())
        var amount = this.state.price_amount

        var target_exchange_data = this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][exchange_id]
        var default_depth = 0;
        if(target_exchange_data != null){
            target_exchange_data = target_exchange_data['ipfs']
            if(target_exchange_data != null){
                default_depth = target_exchange_data.default_depth == null ? 0 : target_exchange_data.default_depth
            }
        }

        if(isNaN(exchange_id) || parseInt(exchange_id) < 0 || exchange_id == '' || !this.does_exchange_exist(exchange_id)){
            this.props.notify(this.props.app_state.loc['243'], 2600)
        }
        else if(default_depth != 0){
            this.props.notify(this.props.app_state.loc['2762']/* 'You cant use that exchange.' */, 3600)
        }
        else if(amount == 0){
            this.props.notify(this.props.app_state.loc['244'], 2600)
        }
        else if(this.state.price_data.length == 0 && (exchange_id != '3' && exchange_id != '5')){
            this.props.notify(this.props.app_state.loc['245'], 4100)
        }
        else if(!this.check_if_amount_exceeds_minimum(amount, exchange_id)){
            return;
        }
        else if(this.is_exchange_already_added(exchange_id)){
            this.props.notify(this.props.app_state.loc['246'], 3600)
        }
        else{
            var price_data_clone = this.state.price_data.slice()
            price_data_clone.push({'id':exchange_id, 'amount':amount})
            this.setState({price_data: price_data_clone, exchange_id:'', amount:0});
            this.props.notify(this.props.app_state.loc['247'], 1000)
        }
    }

    is_exchange_already_added(exchange_id){
        if(this.get_item_in_array(exchange_id, this.state.price_data) == null){
            return false
        }
        return true
    }

    get_item_in_array(exchange_id, object_array){
        var object = object_array.find(x => x['id'] === exchange_id);
        return object
    }

    does_exchange_exist(exchange_id){
        if(this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][parseInt(exchange_id)] == null){
            return false
        }
        return true
    }

    get_token_id_from_symbol(typed_search){
        if(!isNaN(typed_search)){
            return typed_search
        }
        var id = this.props.app_state.token_directory[this.props.app_state.selected_e5][typed_search.toUpperCase()] == null ? typed_search : this.props.app_state.token_directory[this.props.app_state.selected_e5][typed_search.toUpperCase()]

        return id
    }

    check_if_amount_exceeds_minimum(amount, exchange){
        var minimum_end_amount = this.calculate_minimum_end_amount()
        var minimum_spend_amount = this.calculate_minimum_spend_amount()

        if(exchange == '3'){
            if(amount < minimum_end_amount){
                this.props.notify(this.props.app_state.loc['248'], 6500)
                return false
            }
        }
        if(exchange == '5'){
            if(amount < minimum_spend_amount){
                this.props.notify(this.props.app_state.loc['249'], 6500)
                return false
            }
        }
        return true
    }

    render_set_prices_list_part(){
        var middle = this.props.height-100;
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
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
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
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_amount_clicked(item)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '5px'}}>
                                            <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.selected_e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.selected_e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
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
        var items = [].concat(this.get_suggested_tokens(target_type))
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

    get_suggested_tokens(target_type){
        var items = [
            {'id':'3', 'label':{'title':'END', 'details':this.props.app_state.selected_e5, 'size':'s', 'image':this.props.app_state.e5s[this.props.app_state.selected_e5].end_image, 'img_size':30}},
            {'id':'5', 'label':{'title':'SPEND', 'details':this.props.app_state.selected_e5.replace('E', '3'), 'size':'s', 'image':this.props.app_state.e5s[this.props.app_state.selected_e5].spend_image, 'img_size':30}},
        ];
        var exchanges_from_sync = this.props.app_state.created_tokens[this.props.app_state.selected_e5]
        if(exchanges_from_sync == null) exchanges_from_sync = []
        exchanges_from_sync = exchanges_from_sync.filter(function (exchange) {
            return (this.is_exchange_searched(exchange, target_type))
        })
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
                if(this.is_exchange_searched(exchanges_from_sync[i], target_type))sorted_token_exchange_data.push(exchanges_from_sync[i])
            }
        }

        for (let i = 0; i < sorted_token_exchange_data.length; i++) {
            if(sorted_token_exchange_data[i]['ipfs'] == null || sorted_token_exchange_data[i]['ipfs'].default_depth == null || sorted_token_exchange_data[i]['ipfs'].default_depth == 0){
                items.push({'id':sorted_token_exchange_data[i]['id'], 'label':{'title':sorted_token_exchange_data[i]['ipfs'].entered_symbol_text, 'details':sorted_token_exchange_data[i]['ipfs'].entered_title_text, 'size':'s', 'image':(sorted_token_exchange_data[i]['ipfs'].token_image == null ? (sorted_token_exchange_data[i]['data'][0][3/* <3>token_type */] == 3 ? this.props.app_state.static_assets['end_img']:this.props.app_state.static_assets['spend_img']) : sorted_token_exchange_data[i]['ipfs'].token_image), 'img_size':30}})
            }
        }

        return items;
    }

    is_exchange_searched(exchange, target_type){
        var filter_text = ''
        if(target_type == 'weight_exchange_id'){
            filter_text = this.state.voter_weight_exchange_id
        }
        else if(target_type == 'exchange_id'){
            filter_text = this.state.exchange_id
        }

        if(filter_text == ''){
            return true
        }
        var token_name = exchange['ipfs'].entered_title_text
        var entered_symbol_text = exchange['ipfs'].entered_symbol_text
        if(token_name.toLowerCase().includes(filter_text.toLowerCase()) || entered_symbol_text.toLowerCase().includes(filter_text.toLowerCase())){
            return true
        }
        else if(!isNaN(filter_text) && exchange['id'].startsWith(filter_text)){
            return true
        }
        return false
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

    when_price_suggestion_clicked(item, pos, target_type){
        if(target_type == 'weight_exchange_id'){
            this.setState({voter_weight_exchange_id: item['id']})
        }
        else if(target_type == 'exchange_id'){
            this.setState({exchange_id: item['id']})
        }
    }




    load_account_suggestions(target_type){
        var items = [].concat(this.get_suggested_accounts(target_type))
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 7px 0px', width: '97%', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 5px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                      {items.map((item, index) => (
                          <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_suggestion_clicked(item, index, target_type)}>
                              {this.render_detail_item('3', item['label'])}
                          </li>
                      ))}
                  </ul>
                </div>
        )
    }

    get_suggested_accounts(target_type){
        return[
            {'id':'53', 'label':{'title':this.props.app_state.loc['c311l']/* My Account. */, 'details':this.props.app_state.loc['c311m']/* 'Account' */, 'size':'s'}},
        ].concat(this.get_account_suggestions(target_type))
    }

    get_account_suggestions(target_type){
        var contacts = this.props.app_state.contacts[this.props.app_state.selected_e5]
        var return_array = []

        if(target_type == 'moderator_id'){
            contacts.forEach(contact => {
                if(contact['id'].toString().includes(this.state.moderator_id)){
                    return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
                }
            });
        }
        else if(target_type == 'interactible_id'){
            contacts.forEach(contact => {
                if(contact['id'].toString().includes(this.state.interactible_id)){
                    return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
                }
            });
        }
        
        return return_array;
    }

    get_contact_alias(contact){
        var obj = this.props.app_state.alias_bucket[this.state.e5]
        return (obj[contact['id']] == null ? ((contact['address'].toString()).substring(0, 9) + "...") : obj[contact['id']])
    }


    when_suggestion_clicked(item, pos, target_type){
        if(target_type == 'authority_id'){
            this.setState({authority_id: item['id']})
        }
        else if(target_type == 'moderator_id'){
            this.setState({moderator_id: item['id']})
        }
        else if(target_type == 'interactible_id'){
            this.setState({interactible_id: item['id']})
        }
    }


    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} delete_entered_tag={this.delete_entered_tag_word.bind(this)} add_indexing_tag_for_new_job={this.add_indexing_tag_for_new_job.bind(this)}/>
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



    finish_creating_object(){
        var index_tags = this.state.entered_indexing_tags
        var title = this.state.entered_title_text
        var voter_weight_exchange_target = ''
        if(this.state.voter_weight_exchange_id.trim() != ''){
            var voter_weight_exchange_id = this.get_token_id_from_symbol(this.state.voter_weight_exchange_id.trim())
            
            var target_exchange_data = this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][voter_weight_exchange_id]
            var default_depth = 0;
            if(target_exchange_data != null){
                target_exchange_data = target_exchange_data['ipfs']
                if(target_exchange_data != null){
                    default_depth = target_exchange_data.default_depth == null ? 0 : target_exchange_data.default_depth
                }
            }

            if(isNaN(voter_weight_exchange_id) || parseInt(voter_weight_exchange_id) < 0 || !this.does_exchange_exist(voter_weight_exchange_id)){
                this.props.notify(this.props.app_state.loc['250'], 4600)
                return;
            }
            else if(default_depth != 0){
                this.props.notify(this.props.app_state.loc['2763']/* 'You cant use that exchange for the voter weights feature.' */, 3600)
            }
            else{
                voter_weight_exchange_target = voter_weight_exchange_id
            }
        }

        if(index_tags.length == 0){
            this.props.notify(this.props.app_state.loc['160'], 1700)
        }
        else if(title == ''){
            this.props.notify(this.props.app_state.loc['251'], 1700)
        }
        else if(title.length > this.props.app_state.title_size){
            this.props.notify(this.props.app_state.loc['252'], 1700)
        }
        else{
            var me = this
            this.setState({content_channeling_setting: me.props.app_state.content_channeling,
                device_language_setting :me.props.app_state.device_language,
                device_country :me.props.app_state.device_country,
                e5 :me.props.app_state.selected_e5,
                voter_weight_exchange_id: voter_weight_exchange_target,
                contract_type:this.get_contract_type(),
            })

            setTimeout(function() {
                me.props.when_add_new_object_to_stack(me.state)
            
                me.setState({ id: makeid(8), type:me.props.app_state.loc['3'], entered_tag_text: '',entered_indexing_tags:[],entered_title_text:'', new_contract_tags_object: me.get_new_contract_tags_object(), default_vote_bounty_split_proportion:0, max_extend_enter_contract_limit:0, default_minimum_end_vote_bounty_amount:0, default_proposal_expiry_duration_limit:0, max_enter_contract_duration:0, auto_wait_tags_object:me.get_auto_wait_tags_object(), default_minimum_spend_vote_bounty_amount:0, proposal_modify_expiry_duration_limit:0, can_modify_contract_as_moderator: me.get_can_modify_contract_as_moderator(), can_extend_enter_contract_at_any_time: me.get_can_extend_enter_contract_at_any_time(),maximum_proposal_expiry_submit_expiry_time_difference:0, bounty_limit_type: me.get_bounty_limit_type(), contract_force_exit_enabled: me.get_contract_force_exit_enabled(), new_token_interactible_moderator_tags_object: me.get_new_token_interactible_moderator_tags_object(), moderator_id:'', moderators:[], interactible_id:'', interactible_timestamp:0, interactibles:[], exchange_id:'', price_amount:0, price_data:[], voter_weight_exchange_id:''})

                me.props.notify(me.props.app_state.loc['18'], 1700);
            }, (1 * 1000));
        }
    }


}




export default NewContractPage;