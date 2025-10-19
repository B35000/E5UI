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
import ViewGroups from '../../components/view_groups'
import Tags from '../../components/tags';
import TextInput from '../../components/text_input';
import NumberPicker from '../../components/number_picker';
import DurationPicker from '../../components/duration_picker';

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import imageCompression from 'browser-image-compression';

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

class NewProposalPage extends Component {
    
    state = {
        selected: 0, id: makeid(8), object_type:32, type:this.props.app_state.loc['312'], e5:this.props.app_state.selected_e5,
        contract_item: {'data':[[],[0,0,0,0,0,0,0,0,0,0]]},
        entered_tag_text: '',entered_indexing_tags:[],entered_title_text:'',

        new_proposal_title_tags_object:this.get_new_proposal_title_tags_object(), new_proposal_type_tags_object:this.get_new_proposal_type_tags_object(),
        reconfig_items_tags_object:this.get_reconfig_items_tags_object(),

        auto_wait_tags_object:this.get_auto_wait_tags_object(),
        can_modify_contract_as_moderator: this.get_can_modify_contract_as_moderator(),
        can_extend_enter_contract_at_any_time: this.get_can_extend_enter_contract_at_any_time(),
        bounty_limit_type: this.get_bounty_limit_type(),
        contract_force_exit_enabled: this.get_contract_force_exit_enabled(),
        new_token_halving_type_tags_object: this.get_new_token_halving_type_tags_object(),
        new_token_block_limit_sensitivity_tags_object: this.get_new_token_block_limit_sensitivity_tags_object(),

        page:0, proposal_expiry_time:Math.round(new Date().getTime()/1000), 
        proposal_submit_expiry_time:Math.round(new Date().getTime()/1000), 
        
        modify_target_id:'', modify_target_data:null,
        
        spend_target_input_text:'', spend_token_input_text:'', 
        spend_amount:0, spend_actions:[], 
        
        reconfig_number:0, reconfig_proportion:0, reconfig_duration:0, reconfig_target_id:'',
        reconfig_values:[],

        exchange_transfer_target:'', exchange_transfer_amount:0, exchange_transfer_values:[], exchange_transfer_receiver:'', token_target:'',

        bounty_exchange_target:'', bounty_amount:0, bounty_values:[],

        content_channeling_setting: this.props.app_state.content_channeling, 
        device_language_setting: this.props.app_state.device_language, 
        device_country: this.props.app_state.device_country,

        entered_text_objects:[], entered_image_objects:[],
        entered_objects:[], entered_text:'',

        typed_link_text:'', link_search_results:[], added_links:[], 
        edit_text_item_pos:-1, new_price_number:0, get_auto_vote_yes_object:this.get_auto_vote_yes_object(),

        get_sort_links_tags_object:this.get_sort_links_tags_object(), entered_pdf_objects:[],
        markdown:'',get_markdown_preview_or_editor_object: this.get_markdown_preview_or_editor_object(), entered_zip_objects:[]
    };

    


    get_new_proposal_title_tags_object(){
        var obj = {
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['313'], 'e.'+this.props.app_state.loc['110']/* 'e.text' *//* ,this.props.app_state.loc['111'] *//* 'links' */, this.props.app_state.loc['112']/* 'images' */, this.props.app_state.loc['162r']/* 'pdfs' */, this.props.app_state.loc['162q']/* 'zip-files' */, this.props.app_state.loc['a311bq']/* 'markdown' */,this.props.app_state.loc['314'],this.props.app_state.loc['315']], [0]
            ],
            'text':[
                ['or','',0], [this.props.app_state.loc['115']/* 'text' */, 'e.'+this.props.app_state.loc['120']/* 'e.font' */, 'e.'+this.props.app_state.loc['121']/* 'e.size' */], [0]
            ],
            'font':[
                ['xor','e',1], [this.props.app_state.loc['116']/* 'font' */,'Sans-serif','Courier New','Times New Roman','ComicSans','papyrus'], [1],[1]
            ],
            'size':[
                ['xor','e',1], [this.props.app_state.loc['117']/* 'size' */,'15px','11px','25px','40px'], [1],[1]
            ],
        };

        obj[this.props.app_state.loc['115']] = [
                ['or','',0], [this.props.app_state.loc['115']/* 'text' */, 'e.'+this.props.app_state.loc['120']/* 'e.font' */, 'e.'+this.props.app_state.loc['121']/* 'e.size' */], [0]
            ];
        obj[this.props.app_state.loc['116']] = [
                ['xor','e',1], [this.props.app_state.loc['116']/* 'font' */,'Sans-serif','Courier New','Times New Roman','ComicSans','papyrus'], [1],[1]
            ];
        obj[this.props.app_state.loc['117']] = [
                ['xor','e',1], [this.props.app_state.loc['117']/* 'size' */,'15px','11px','25px','40px'], [1],[1]
            ];

        return obj
    }

    get_new_proposal_type_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['316']/* 'spend' */,this.props.app_state.loc['317']/* 'reconfig' */, this.props.app_state.loc['318']/* 'exchange-transfer' */], [1]
            ],
        };
    }


    get_reconfig_items_tags_object(){
        var obj = {
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e','e.'+this.props.app_state.loc['3']/* contract */,'e.'+this.props.app_state.loc['319']/* subscription */, 'e.'+this.props.app_state.loc['320']/* exchange */, this.props.app_state.loc['861a']/* 'prices' */], [0]
            ],
            'contract':[
                ['xor','',0], [this.props.app_state.loc['3']/* contract */,this.props.app_state.loc['68']/* 'Vote Bounty Split Proportion' */,this.props.app_state.loc['69']/* 'Maximum Extend Enter Contract Limit' */,this.props.app_state.loc['70'] /* 'Minimum End Bounty Amount' */,this.props.app_state.loc['71'] /* 'Proposal Expiry Duration Limit' */, this.props.app_state.loc['72']/* 'Maximum Enter Contract Duration' */,this.props.app_state.loc['73'] /* 'Auto Wait' */, this.props.app_state.loc['74']/* 'Proposal Modify Expiry Duration Limit' */,this.props.app_state.loc['75'] /* 'Moderator Modify Privelage' */, this.props.app_state.loc['76']/* 'Unlimited Extend Contract Time' */, this.props.app_state.loc['77']/* 'Maximum Proposal Expiry Submit Expiry time difference' */, this.props.app_state.loc['78']/* 'Bounty Limit Type' */,this.props.app_state.loc['79'] /* 'Force Exit Enabled' */, this.props.app_state.loc['80']/* 'Minimum Spend Bounty Amount' */, this.props.app_state.loc['438h']/* Transaction Gas Limit */], [1]
            ],
            'subscription':[
                ['xor','',0], [this.props.app_state.loc['319']/* 'subscription' */,this.props.app_state.loc['321']/* 'Minimum Buy Amount' */,this.props.app_state.loc['322']/* 'Target Authority' */, this.props.app_state.loc['323']/* 'Target Beneficiary' */, this.props.app_state.loc['324']/* 'Maximum Buy Amount' */, this.props.app_state.loc['325']/* 'Minimum Cancellable Balance Amount' */], [1]
            ],
            'exchange':[
                ['xor','',0], [this.props.app_state.loc['320']/* 'exchange' */,this.props.app_state.loc['326']/* 'Buy Limit' */,this.props.app_state.loc['327']/* 'Trust Fee' */, this.props.app_state.loc['328']/* 'Sell Limit' */, this.props.app_state.loc['329']/* 'Minimum Time Between Swap' */, this.props.app_state.loc['330']/* 'Minimum Transactions Between Swap' */, this.props.app_state.loc['331']/* 'Minimum Blocks Between Swap' */, this.props.app_state.loc['332']/* 'Minimum Entered Contracts Between Swap' */, this.props.app_state.loc['333']/* 'Minimum Transactions For First Buy' */, this.props.app_state.loc['334']/* 'Minimum Entered Contracts For First Buy' */, this.props.app_state.loc['335']/* 'Block Limit' */, this.props.app_state.loc['336']/* 'Halving type' */, this.props.app_state.loc['337']/* 'Maturity Limit' */, this.props.app_state.loc['338']/* 'Internal Block Halving Proportion' */, this.props.app_state.loc['339']/* 'Block Limit Reduction Proportion' */, this.props.app_state.loc['340']/* 'Block Reset Limit' */, this.props.app_state.loc['341']/* 'Block Limit Sensitivity' */], [1]
            ],
        };

        obj[this.props.app_state.loc['3']/* contract */] = [
                ['xor','',0], [this.props.app_state.loc['3']/* contract */,this.props.app_state.loc['68']/* 'Vote Bounty Split Proportion' */,this.props.app_state.loc['69']/* 'Maximum Extend Enter Contract Limit' */,this.props.app_state.loc['70'] /* 'Minimum End Bounty Amount' */,this.props.app_state.loc['71'] /* 'Proposal Expiry Duration Limit' */, this.props.app_state.loc['72']/* 'Maximum Enter Contract Duration' */,this.props.app_state.loc['73'] /* 'Auto Wait' */, this.props.app_state.loc['74']/* 'Proposal Modify Expiry Duration Limit' */,this.props.app_state.loc['75'] /* 'Moderator Modify Privelage' */, this.props.app_state.loc['76']/* 'Unlimited Extend Contract Time' */, this.props.app_state.loc['77']/* 'Maximum Proposal Expiry Submit Expiry time difference' */, this.props.app_state.loc['78']/* 'Bounty Limit Type' */,this.props.app_state.loc['79'] /* 'Force Exit Enabled' */, this.props.app_state.loc['80']/* 'Minimum Spend Bounty Amount' */, this.props.app_state.loc['438h']/* Transaction Gas Limit */], [1]
            ];
        obj[this.props.app_state.loc['319']/* 'subscription' */] = [
                ['xor','',0], [this.props.app_state.loc['319']/* 'subscription' */,this.props.app_state.loc['321']/* 'Minimum Buy Amount' */,this.props.app_state.loc['322']/* 'Target Authority' */, this.props.app_state.loc['323']/* 'Target Beneficiary' */, this.props.app_state.loc['324']/* 'Maximum Buy Amount' */, this.props.app_state.loc['325']/* 'Minimum Cancellable Balance Amount' */], [1]
            ];
        obj[this.props.app_state.loc['320']/* 'exchange' */] = [
                ['xor','',0], [this.props.app_state.loc['320']/* 'exchange' */,this.props.app_state.loc['326']/* 'Buy Limit' */,this.props.app_state.loc['327']/* 'Trust Fee' */, this.props.app_state.loc['328']/* 'Sell Limit' */, this.props.app_state.loc['329']/* 'Minimum Time Between Swap' */, this.props.app_state.loc['330']/* 'Minimum Transactions Between Swap' */, this.props.app_state.loc['331']/* 'Minimum Blocks Between Swap' */, this.props.app_state.loc['332']/* 'Minimum Entered Contracts Between Swap' */, this.props.app_state.loc['333']/* 'Minimum Transactions For First Buy' */, this.props.app_state.loc['334']/* 'Minimum Entered Contracts For First Buy' */, this.props.app_state.loc['335']/* 'Block Limit' */, this.props.app_state.loc['336']/* 'Halving type' */, this.props.app_state.loc['337']/* 'Maturity Limit' */, this.props.app_state.loc['338']/* 'Internal Block Halving Proportion' */, this.props.app_state.loc['339']/* 'Block Limit Reduction Proportion' */, this.props.app_state.loc['340']/* 'Block Reset Limit' */, this.props.app_state.loc['341']/* 'Block Limit Sensitivity' */], [1]
            ];

        return obj;
    }

    get_auto_wait_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['81']/* 'no' */,this.props.app_state.loc['82'] /* 'yes' */], [1]
            ],
        };
    }

    get_can_modify_contract_as_moderator(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['83']/* 'modifiable' */, this.props.app_state.loc['84']/* 'non-modifiable' */], [1]
            ],
        };
    }

    get_can_extend_enter_contract_at_any_time(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['89']/* 'enabled' */,this.props.app_state.loc['90'] /* 'disabled' */], [1]
            ],
        };
    }

    get_bounty_limit_type(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['87']/* 'relative' */, this.props.app_state.loc['88']/* 'absolute' */], [2]
            ],
        };
    }

    get_contract_force_exit_enabled(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['89']/* 'enabled' */, this.props.app_state.loc['90']/* 'disabled' */], [1]
            ],
        };
    }

    get_new_token_halving_type_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['342']/* 'fixed' */, this.props.app_state.loc['343']/* 'spread' */], [1]
            ],
        };
    }

    get_new_token_block_limit_sensitivity_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','1', '2', '3', '4', '5'], [1]
            ],
        };
    }



    get_auto_vote_yes_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['438o']/* 'vote' */], [0]
            ],
        };
    }


    get_sort_links_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['162a']/* '📑 contract' */, this.props.app_state.loc['162b']/* '💼 job' */, this.props.app_state.loc['162c']/* '👷🏻‍♀️ contractor' */, this.props.app_state.loc['162d']/* '🏪 storefront' */, this.props.app_state.loc['162e']/* '🎫 subscription' */,this.props.app_state.loc['162f']/* '📰 post' */,this.props.app_state.loc['162g'] /* '📡 channel' */, this.props.app_state.loc['162h']/* '🪙 token' */, this.props.app_state.loc['162i']/* '🧎 proposal' */], [0]
            ],
        };
    }


    get_markdown_preview_or_editor_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['a311bt']/* 'Editor' */, this.props.app_state.loc['a311bu']/* 'preview' */], [1]
            ],
        };
    }





    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px', width: this.props.app_state.width}}>
                    <div style={{'padding': '0px 0px 0px 0px', width:this.props.app_state.width-50}}>
                        <Tags font={this.props.app_state.font} app_state={this.props.app_state} page_tags_object={this.state.new_proposal_title_tags_object} tag_size={'l'} when_tags_updated={this.when_new_proposal_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div style={{'padding': '0px 10px 0px 0px', width:40}}>
                        <img alt="" className="text-end" onClick={()=>this.finish_creating_object()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                    </div>
                </div>
                {/* <div className="row" style={{'width':'102%'}}>
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} app_state={this.props.app_state} page_tags_object={this.state.new_proposal_title_tags_object} tag_size={'l'} when_tags_updated={this.when_new_proposal_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img className="text-end" onClick={()=>this.finish_creating_object()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div> */}

                <div style={{'margin':'10px 0px 0px 0px', overflow: 'auto', maxHeight: this.props.height-120}}>
                    {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'13px', 'text':this.props.app_state.loc['344']+this.state.contract_item['id']})}
                    <div style={{height: 10}}/>

                    {this.render_everything()}   
                </div>
                
            </div>
        )
    }

    when_new_proposal_title_tags_object_updated(tag_obj){
        this.setState({new_proposal_title_tags_object: tag_obj})
    }


    render_everything(){
        var selected_item = this.get_selected_item(this.state.new_proposal_title_tags_object, this.state.new_proposal_title_tags_object['i'].active)

        if(selected_item == 'e'){
            return(
                <div>
                    {this.render_enter_tags_part()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['313']/* 'proposal-configuration' */){
            return(
                <div>
                    {this.render_proposal_configuration_data()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['314']/* 'proposal-data' */){
            return(
                <div>
                    {this.render_proposal_data_ui()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['315']/* 'bounty-data' */){
            return(
                <div>
                    {this.render_bounty_data_ui()}
                </div>
            )   
        }
        else if(this.is_text_selected_item(selected_item)){
            return(
                <div>
                    {this.render_enter_text_part()}
                </div>
            ) 
        }
        else if(selected_item == this.props.app_state.loc['111']/* 'links' */){
            return(
                <div>
                    {this.render_enter_links_part()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['112']/* 'images' */){
            return(
                <div>
                    {this.render_enter_image_part()}
                </div>
            ) 
        }
        else if(selected_item == this.props.app_state.loc['162r']/* 'pdfs' */){
            return(
                <div>
                    {this.render_enter_pdf_part()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['a311bq']/* 'markdown' */){
            return(
                <div>
                    {this.render_enter_markdown_part()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['162q']/* 'zip-files' */){
            return(
                <div>
                    {this.render_enter_zip_part()}
                </div>
            )
        }
    }

    is_text_selected_item(selected_item){
        var obj = [this.props.app_state.loc['115']/* 'text' */,this.props.app_state.loc['116']/* 'font' */,this.props.app_state.loc['117']/* 'size' */,'Sans-serif','Courier New','Times New Roman','ComicSans','papyrus', '15px','11px','25px','40px']
        if(obj.includes(selected_item)){
            return true
        }
        return false
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









    componentDidMount(){
        this.setState({screen_width: this.screen.current.offsetWidth})
        if(this.interval != null) clearInterval(this.interval);
        var me = this;
        setTimeout(function() {
            me.interval = setInterval(() => me.update_object_in_background(), 10*1000);
        }, (1 * 100));
    }

    componentWillUnmount() {
        if(this.interval != null)clearInterval(this.interval);
    }

    render_enter_tags_part(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_title_tags_part()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_title_tags_part()}
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
                        {this.render_title_tags_part()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_title_tags_part(){
        return(
            <div ref={this.screen} style={{'padding':'0px 10px 0px 10px'}}>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['123']/* 'Enter Title...' */} when_text_input_field_changed={this.when_title_text_input_field_changed.bind(this)} text={this.state.entered_title_text} theme={this.props.theme}/>

                <div style={{height: 10}}/>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.state.entered_title_text})}
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']/* 'remaining character count: ' */+(this.props.app_state.title_size - this.state.entered_title_text.length)})}

                {this.render_detail_item('0')}
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['345']/* 'Set tags for indexing your new Proposal' */})}
                <div style={{height:10}}/>

                <div className="row" style={{'width':'99%'}}>
                    <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput font={this.props.app_state.font} height={30} placeholder={'Enter Tag...'} when_text_input_field_changed={this.when_index_text_input_field_changed.bind(this)} text={this.state.entered_tag_text} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 10px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                            <img alt="" className="text-end" onClick={()=>this.add_indexing_tag_for_new_job()} src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                        </div>
                    </div>
                </div>
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']/* 'remaining character count: ' */+(this.props.app_state.tag_size - this.state.entered_tag_text.length)})}

                {this.render_detail_item('1',{'active_tags':this.state.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':'delete_entered_tag_word'})}


                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['438m']/* 'Auto-Vote Yes.' */, 'details':this.props.app_state.loc['438n']/* 'If set to vote, e will automatically vote yes for you in this new proposal.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_auto_vote_yes_object} tag_size={'l'} when_tags_updated={this.when_get_auto_vote_yes_object_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>


                {this.render_previous_edits_if_existing()}



                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311dc']/* 'Current post size.' */, 'details':this.props.app_state.loc['a311dd']/* 'Below is the size of your new post with all the details youve set.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_transaction_size_indicator()}
                
                {this.render_detail_item('0')}
                {this.render_detail_item('0')}
            </div>
        )
    }

    when_get_auto_vote_yes_object_updated(tag_obj){
        this.setState({get_auto_vote_yes_object: tag_obj})
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
            this.props.notify(this.props.app_state.loc['128']/* 'type something!' */, 1400)
        }
        else if(this.hasWhiteSpace(typed_word)){
            this.props.notify(this.props.app_state.loc['129']/* 'enter one word!' */, 1400)
        }
        else if(typed_word.length > this.props.app_state.tag_size){
            this.props.notify(this.props.app_state.loc['130']/* 'That tag is too long' */, 1400)
        }
        else if(typed_word.length < 3){
            this.props.notify(this.props.app_state.loc['131']/* 'That tag is too short' */, 1400)
        }
        else if(this.state.entered_indexing_tags.includes(typed_word)){
            this.props.notify(this.props.app_state.loc['132']/* 'you cant enter the same word twice' */, 1400)
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



    render_previous_edits_if_existing(){
        const previous_edits = this.props.fetch_objects_from_db(this.state.object_type)
        const unfiltered_items = Object.keys(previous_edits)
        if(unfiltered_items.length == 0){
            return;
        }
        const items = this.sort_items(unfiltered_items, previous_edits)
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311ds']/* 'Set to previous changes.' */, 'details':this.props.app_state.loc['a311dt']/* 'You can continue where you left off in a pevious edit.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_previous_edit_item(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    sort_items(items, previous_edits_data){
        const return_data = []
        const current_id = this.state.id
        items.forEach(identifier => {
            if(identifier != current_id){
                return_data.push(previous_edits_data[identifier])
            }
        });
        return this.sortByAttributeDescending(return_data, 'last_modified')
    }

    render_previous_edit_item(data){
        const title = this.truncate(data.entered_title_text, 17);
        const details = (new Date(data.last_modified))+''
        return(
            <div onClick={() => this.when_previous_edit_tapped(data)}>
                {this.render_detail_item('3', {'title':title, 'details':details, 'size':'s'})}
            </div>
        )
    }

    when_previous_edit_tapped(data){
        this.setState(data)
    }

    update_object_in_background(){
        if(this.state.entered_title_text != ''){
            this.props.update_object_change_in_db(this.state, this.state.object_type)
        }
    }









    render_enter_text_part(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div style={{}}>
                    {this.render_text_part()}
                    {this.render_entered_texts()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_text_part()}
                        {this.render_entered_texts()}
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
                        {this.render_text_part()}
                        {this.render_entered_texts()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_text_part(){
        var add_text_button = this.state.edit_text_item_pos == -1 ? this.props.app_state.loc['136']/* 'Add Text' */ : this.props.app_state.loc['137']/* 'Edit Text' */
        return(
            <div style={{'margin':'10px 0px 0px 10px'}}>
                {/* {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['438i']})}
                {this.render_detail_item('0')} */}
                
                {/* <Tags font={this.props.app_state.font} page_tags_object={this.state.get_new_job_text_tags_object} tag_size={'l'} when_tags_updated={this.when_new_job_font_style_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/> */}

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['135']/* 'Type Something...' */} when_text_input_field_changed={this.when_entered_text_input_field_changed.bind(this)} text={this.state.entered_text} theme={this.props.theme}/>
                <div style={{height:10}}/>
                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '7px 5px 10px 10px', width: '99%'}}>
                    {/* <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img src={this.props.app_state.static_assets['e5_empty_icon']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                        <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".gif" onChange ={this.when_banner_image_picked.bind(this)} />
                    </div> */}

                    {/* <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                        <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept ="image/*" onChange ={this.when_banner_image_picked.bind(this)} />
                    </div> */}

                    <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img alt="" src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} onClick={() => this.props.show_pick_file_bottomsheet('image', 'create_text_banner_image', 1)}/>
                    </div>

                    <div style={{'padding': '5px', width:205}}>
                        {this.render_detail_item('5', {'text':add_text_button, 'action':'when_add_text_button_tapped', 'prevent_default':true})}
                    </div>
                </div>

                <div style={{height:10}}/>    
                {this.render_detail_item('4',this.get_edited_text_object())}
                <div style={{height:10}}/>
                {this.render_kaomoji_list()}
                {this.render_detail_item('0')}
            </div>
        )
    }

    when_entered_text_input_field_changed(text){
        this.setState({entered_text: text})
    }

    when_new_job_font_style_updated(tag_group){
        this.setState({get_new_job_text_tags_object: tag_group})
    }

    get_edited_text_object(){
        var font = this.get_selected_item(this.state.new_proposal_title_tags_object, this.props.app_state.loc['116']/* 'font' */)
        var size = this.get_selected_item(this.state.new_proposal_title_tags_object, this.props.app_state.loc['117']/* 'size' */)
        if(this.props.app_state.kaomojis.includes(this.state.entered_text.trim())){
            font = 'Sans-serif'
            size = '40px'
        }
        return{
            'font':font, 'textsize':size,'text':this.state.entered_text
        }
    }

    when_add_text_button_tapped(){
        var typed_word = this.state.entered_text.trim();

        if(typed_word == ''){
            this.props.notify(this.props.app_state.loc['128']/* 'type something!' */, 1400)
        }else{
            var entered_text = this.get_edited_text_object()
            if(this.state.edit_text_item_pos != -1){
                this.finish_editing_text_item(entered_text)
            }else{
                var cloned_entered_text_array = this.state.entered_text_objects.slice()
                cloned_entered_text_array.push(entered_text);
                this.setState({entered_text_objects: cloned_entered_text_array, entered_text:''})

                var cloned_array = this.state.entered_objects.slice()
                cloned_array.push({'data':entered_text, 'type':'4' })
                this.setState({entered_objects: cloned_array})
            }
            
        }
    }

    render_entered_texts(){
        var middle = this.props.height-420;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.entered_objects)
        return ( 
            <div style={{}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <SwipeableList>
                            <SwipeableListItem
                                swipeLeft={{
                                content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2908']/* Delete. */}</p>,
                                action: () => this.delete_text_item(item)
                                }}>
                                <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}><li style={{'padding': '5px'}} onClick={()=>this.edit_text_item(item)}>
                                    {this.render_text_or_banner_if_any(item, index)}
                                </li></div>
                            </SwipeableListItem>
                        </SwipeableList>
                        
                    ))}
                </ul>
            </div>
        );
    }

    render_text_or_banner_if_any(item, index){
        if(item['type'] == '11'){
            return(
                <div>
                    <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '7px 5px 10px 10px', width: '99%'}}>
                        <div>
                            {/* <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                                <img src={this.props.app_state.static_assets['e5_empty_icon']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                                <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".gif" onChange ={(e) => this.when_banner_image_updated(e, index)} />
                            </div> */}

                            {/* <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                                <img src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                                <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept ="image/*" onChange ={(e) => this.when_banner_image_updated(e, index)} />
                            </div> */}
                        </div>
                        <div style={{width:2}}/>
                        {this.render_detail_item('11',item['data'])}
                    </div>
                </div>
            )
        }
        else if(item['type'] == '4'){
            var object = structuredClone(item['data'])
            if(this.state.edit_text_item_pos == index) object['text'] = ''
            return(
                <div>
                    {this.render_detail_item('4', object)}
                </div>
            )
        }
    }

    delete_text_item(item){
        var cloned_array = this.state.entered_text_objects.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_text_objects: cloned_array})

        var entered_objects_pos = -1;
        for(var i=0; i<this.state.entered_objects.length; i++){
            if(this.state.entered_objects[i]['data'] == item['data']){
                entered_objects_pos = i;
            }
        }

        var cloned_array = this.state.entered_objects.slice()
        if (entered_objects_pos > -1) { // only splice array when item is found
            cloned_array.splice(entered_objects_pos, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_objects: cloned_array})

        // this.props.notify('item removed!', 600)
    }

    when_banner_image_picked = (e) => {
        if(e.target.files && e.target.files[0]){
            for(var i = 0; i < e.target.files.length; i++){ 
                let reader = new FileReader();
                reader.onload = function(ev){
                    if(ev.total < this.props.app_state.image_size_limit){
                        this.add_banner_to_object(ev.target.result)
                        // this.setState({selected_banner_image: ev.target.result});
                    }
                }.bind(this);
                var imageFile = e.target.files[i];
                imageCompression(imageFile, { maxSizeMB: 0.35, maxWidthOrHeight: 1920, useWebWorker: true }).then(function (compressedFile) {
                    reader.readAsDataURL(compressedFile);
                })
                .catch(function (error) {
                    console.log(error.message);
                });
            }
            var image = e.target.files.length == 1 ? 'image has' : 'images have';
            // this.props.notify('Your selected '+e.target.files.length+image+' been staged.',500);
        }
    }

    when_banner_selected = async (files) => {
        this.add_banner_to_object(files[0])
        var cloned_ecid_encryption_passwords = this.state.ecid_encryption_passwords == null ? {} : structuredClone(this.state.ecid_encryption_passwords)
        for(var f=0; f<files.length; f++){
            const file = files[f]
            cloned_ecid_encryption_passwords[file] = await this.props.get_ecid_file_password_if_any(file)
        }
        this.setState({ecid_encryption_passwords: cloned_ecid_encryption_passwords});
    }

    when_banner_image_updated = (e, index) => {
        if(e.target.files && e.target.files[0]){
            for(var i = 0; i < e.target.files.length; i++){ 
                let reader = new FileReader();
                reader.onload = function(ev){
                    if(ev.total < this.props.app_state.image_size_limit){
                        this.update_banner_in_object(ev.target.result, index)
                        // this.setState({selected_banner_image: ev.target.result});
                    }
                }.bind(this);
                var imageFile = e.target.files[i];
                imageCompression(imageFile, { maxSizeMB: 0.35, maxWidthOrHeight: 1920, useWebWorker: true }).then(function (compressedFile) {
                    reader.readAsDataURL(compressedFile);
                })
                .catch(function (error) {
                    console.log(error.message);
                });
            }
            var image = e.target.files.length == 1 ? 'image has' : 'images have';
            // this.props.notify('Your selected '+e.target.files.length+image+' been staged.',500);
        }
    }

    add_banner_to_object(image){
        var entered_text = this.get_edited_text_object()
        entered_text['textsize'] = '10px'
        var obj = {'image':this.get_image_from_file(image), 'caption':entered_text}
        var cloned_array = this.state.entered_objects.slice()
        cloned_array.push({'data':obj, 'type':'11' }) 
        this.setState({entered_objects: cloned_array, entered_text:''})
    }


    update_banner_in_object(image, index){
        var entered_text = this.get_edited_text_object()
        entered_text['textsize'] = '10px'
        var obj = {'image':image, 'caption':entered_text}
        var cloned_array = this.state.entered_objects.slice()
        var pos = index
        cloned_array[pos] = {'data':obj, 'type':'11' }
        this.setState({entered_objects: cloned_array, entered_text:''})
    }


    edit_text_item(item){
        var entered_objects_pos = -1;
        for(var i=0; i<this.state.entered_objects.length; i++){
            if(this.state.entered_objects[i]['data'] == item['data']){
                entered_objects_pos = i;
            }
        }
        if(item['type'] == '11'){
            return;
        }else{
            var text = item['data']['text']
            this.setState({edit_text_item_pos: entered_objects_pos, entered_text:text})
        }
        // this.props.notify('editing item', 600)
    }


    finish_editing_text_item(item){
        var cloned_array = this.state.entered_objects.slice()
        var pos = this.state.edit_text_item_pos
        cloned_array[pos] = {'data':item, 'type':'4' }
        console.log(cloned_array)
        this.setState({entered_objects: cloned_array, entered_text:'', edit_text_item_pos: -1})
    }

    render_kaomoji_list(){
        var items = this.props.app_state.kaomojis

        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={() => this.when_kamoji_clicked(item)}>
                            {this.render_detail_item('4',this.get_kamoji_text_object(item))}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_kamoji_text_object(text){
        return{
            'font':'Sans-serif', 'textsize':'15px','text':text
        }
    }

    when_kamoji_clicked(text){
        this.setState({entered_text: this.state.entered_text+' '+text})
    }








    render_enter_links_part(){
        return(
            <div style={{'margin':'10px 0px 0px 0px'}}>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['438f']/* 'Search an object by its title or id, then tap it to add it to the new channel' */})}
                <div style={{height:10}}/>
                <div className="row" style={{width:'103%'}}>
                    <div className="col-9" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['292']} when_text_input_field_changed={this.when_typed_link_text_changed.bind(this)} text={this.state.typed_link_text} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 10px 0px 0px'}} onClick={()=> this.search_object()} >
                        {this.render_detail_item('5',{'text':this.props.app_state.loc['499']/* 'Search' */,'action':'', 'prevent_default':true})}
                    </div>
                </div>
                <div style={{height:10}}/>
                {this.render_selected_links()}

                {this.render_detail_item('0')}
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_sort_links_tags_object} tag_size={'l'} when_tags_updated={this.when_get_sort_links_tags_object_updated.bind(this)} theme={this.props.theme}/>

                <div style={{height:10}}/>
                {this.render_searched_link_results()}

            </div>
        )
    }

    when_get_sort_links_tags_object_updated(tag_obj){
        this.setState({get_sort_links_tags_object: tag_obj})
    }

    when_typed_link_text_changed(text){
        this.setState({typed_link_text: text})
    }

    search_object(){
        var typed_text = this.state.typed_link_text

        if(typed_text == ''){
            this.props.notify(this.props.app_state.loc['128']/* 'Type something' */, 1800)
        }else{
            this.props.notify(this.props.app_state.loc['141']/* 'Searching...' */, 600)
            var return_data = this.search_for_object(typed_text)
            this.setState({link_search_results: return_data})
        }
    }

    search_for_object(typed_text){
        var contracts = this.get_all_sorted_objects(this.props.app_state.created_contracts)
        var channels = this.get_all_sorted_objects(this.props.app_state.created_channels)
        var contractors = this.get_all_sorted_objects(this.props.app_state.created_contractors)
        var jobs = this.get_all_sorted_objects(this.props.app_state.created_jobs)
        var posts = this.get_all_sorted_objects(this.props.app_state.created_posts)
        var proposals = this.get_all_sorted_objects(this.props.app_state.my_proposals)
        var storefronts = this.get_all_sorted_objects(this.props.app_state.created_stores)
        var subscriptions = this.get_all_sorted_objects(this.props.app_state.created_subscriptions)
        var tokens = this.get_all_sorted_objects(this.props.app_state.created_tokens)
    

        var return_objects = []
        var my_objects = []
        contracts.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            console.log(object['id'])
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'contract'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'contract'})
            }
        });

        channels.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'channel'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'channel'})
            }
        });

        contractors.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'contractor'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'contractor'})
            }
        });

        jobs.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'job'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'job'})
            }
        });


        posts.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'post'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'post'})
            }
        });


        proposals.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'proposal'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'proposal'})
            }
        });

        storefronts.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'storefront'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'storefront'})
            }
        });


        subscriptions.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'subscription'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'subscription'})
            }
        });

        tokens.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'token'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'token'})
            }
        });

        if(return_objects.length == 0 || typed_text == '') return my_objects;
        return return_objects
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

    render_selected_links(){
        var items = [].concat(this.state.added_links).reverse()
        var background_color = this.props.theme['card_background_color']

        if(items.length == 0){
            items = [1, 2, 3]
            return(
                <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
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
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_link_item_clicked(item)}>
                            {this.render_detail_item('3', {'title':this.get_title(item), 'details':this.truncate(item['title'], 15), 'size':'s', 'padding':'5px 12px 5px 12px'})}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }

    get_title(item){
        var obj = {'contract':'📑', 'job':'💼', 'contractor':'👷🏻‍♀️', 'storefront':'🏪','subscription':'🎫', 'post':'📰','channel':'📡','token':'🪙', 'proposal':'🧎'}
        var item_id = ((item['e5']).toUpperCase()+' • '+item['id'])
        return `${obj[item['type']]} ${item_id}`
    }

    when_link_item_clicked(item){
        var clone = this.state.added_links.slice()
        var pos = clone.indexOf(item)
        if(pos > -1){
            clone.splice(pos, 1)
        }
        this.setState({added_links: clone})
        // this.props.notify('Link removed from object', 700)
    }

    render_searched_link_results(){
        var middle = this.props.height-400;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.link_search_results)

        if(items.length == 0){
            items = this.search_for_object('')
        }

        items = this.sort_searched_link_results(items)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
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
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 0px 2px 0px'}} onClick={()=>this.when_searched_link_tapped(item)}>
                                {this.render_detail_item('3', {'title':''+this.get_title(item), 'details':item['title'], 'size':'s'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    sort_searched_link_results(items){
        var selected_item = this.get_selected_item2(this.state.get_sort_links_tags_object, 'e')
        var results = []
        if(selected_item == 0/* e */){
            return items
        }
        else if(selected_item == 1/* 📑 contract */){
            items.forEach(item => {
                if(item['type'] == 'contract'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 2/* 💼 job */){
            items.forEach(item => {
                if(item['type'] == 'job'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 3/* 👷🏻‍♀️ contractor */){
            items.forEach(item => {
                if(item['type'] == 'contractor'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 4/* 🏪 storefront */){
            items.forEach(item => {
                if(item['type'] == 'storefront'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 5/* 🎫 subscription */){
            items.forEach(item => {
                if(item['type'] == 'subscription'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 6/* 📰 post */){
            items.forEach(item => {
                if(item['type'] == 'post'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 7/* 📡 channel */){
            items.forEach(item => {
                if(item['type'] == 'channel'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 8/* 🪙 token */){
            items.forEach(item => {
                if(item['type'] == 'token'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 9/* 🧎 proposal */){
            items.forEach(item => {
                if(item['type'] == 'proposal'){
                    results.push(item)
                }
            });
        }

        return results;
    }

    get_selected_item2(object, option){
        return object[option][2][0]
    }

    when_searched_link_tapped(item){
        var clone = this.state.added_links.slice()
        var pos = this.position_of(item, clone)

        if(pos > -1){
            this.props.notify(this.props.app_state.loc['143'], 1700)
        }else{
            clone.push(item)
            this.setState({added_links: clone})
            this.props.notify(this.props.app_state.loc['144'], 1400)
        }
    }

    position_of(item, added_links){
        var pos = -1
        added_links.forEach(element => {
            if(element['id'] == item['id'] && element['e5'] == item['e5']){
                pos = added_links.indexOf(element)
            }
        });
        return pos
    }









    render_enter_image_part(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_pick_images_parts()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_pick_images_parts()}
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
                        {this.render_pick_images_parts()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_pick_images_parts(){
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'13px','text':this.props.app_state.loc['145']})}
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['146']})}
                {this.render_create_image_ui_buttons_part()}
                {this.render_image_part()}
            </div>
        )
    }

    /* renders the buttons for pick images, set images and clear images */
    render_create_image_ui_buttons_part(){
      return(
        <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '7px 5px 10px 10px', width: '99%'}}>
            {/* <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                <img src={this.props.app_state.static_assets['e5_empty_icon']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".gif" onChange ={this.when_image_gif_picked.bind(this)} multiple/>
            </div> */}

            {/* <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                <img src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept ="image/*" onChange ={this.when_image_gif_picked.bind(this)} multiple/>
            </div> */}

            <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                <img alt="" src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} onClick={() => this.props.show_pick_file_bottomsheet('image', 'create_image', 10**16)}/>
            </div>

            {/* <div style={{'padding': '5px', width:205}} onClick={()=>this.add_images_to_object()}>
                {this.render_detail_item('5', {'text':'Add Images', 'action':'-'})}
            </div> */}

        </div>
      )
    }

    add_images_to_object(){
        var images_to_add = this.state.entered_image_objects
        var id = Math.round(new Date().getTime()/1000);
        if(images_to_add.length == 0){
            this.props.notify('add some images or gifs first!', 800)
        }else{
            var cloned_array = this.state.entered_objects.slice()
            cloned_array.push({'data':{'images':images_to_add}, 'type':'9', 'id':id})
            this.setState({entered_objects: cloned_array, entered_image_objects:[]})
            this.props.notify('images added!', 800)
        }
    }

    /* called when images have been picked from picker */
    when_image_gif_picked = (e) => {
        if(e.target.files && e.target.files[0]){
            for(var i = 0; i < e.target.files.length; i++){ 
                let reader = new FileReader();
                reader.onload = function(ev){
                    const clonedArray = this.state.entered_image_objects == null ? [] : this.state.entered_image_objects.slice();
                    if(ev.total < this.props.app_state.image_size_limit){
                        clonedArray.push(ev.target.result);
                        this.setState({entered_image_objects: clonedArray});
                    }
                }.bind(this);
                var imageFile = e.target.files[i];
                imageCompression(imageFile, { maxSizeMB: 0.35, maxWidthOrHeight: 1920, useWebWorker: true }).then(function (compressedFile) {
                    reader.readAsDataURL(compressedFile);
                })
                .catch(function (error) {
                    console.log(error.message);
                });
            }
            var image = e.target.files.length == 1 ? 'image has' : 'images have';
            // this.props.notify('Your selected '+e.target.files.length+image+' been staged.',500);
        }
    }

    when_image_gif_files_picked = async (files) => {
        var clonedArray = this.state.entered_image_objects == null ? [] : this.state.entered_image_objects.slice();
        var cloned_ecid_encryption_passwords = this.state.ecid_encryption_passwords == null ? {} : structuredClone(this.state.ecid_encryption_passwords)
        files.forEach(file => {
            clonedArray.push(file);
        });
        for(var f=0; f<files.length; f++){
            const file = files[f]
            cloned_ecid_encryption_passwords[file] = await this.props.get_ecid_file_password_if_any(file)
        }
        this.setState({entered_image_objects: clonedArray, ecid_encryption_passwords: cloned_ecid_encryption_passwords});
    }

    render_all_images_part(){
        var items = this.get_image_objects()

        return(
            <div>
                {items.map((item, index) => (
                    <div onClick={()=>this.remove_image_group(item)}>
                        {this.render_detail_item('9', item['data'])} 
                    </div>
                ))}
            </div>
        )
    }

    get_image_objects(){
        var all_objs = this.state.entered_objects
        var image_objs = []
        for(var i = 0; i < all_objs.length; i++){
            var obj_in_focus = all_objs[i]
            if(obj_in_focus['type'] == '9'){
                image_objs.push(obj_in_focus)
            }
        }
        return image_objs
    }

    remove_image_group(item){
        var cloned_array = this.state.entered_objects.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_objects: cloned_array})
        this.props.notify('items removed!',600)
    }

    render_image_part(){
        var background_color = this.props.theme['card_background_color']
        var col = Math.round((this.state.screen_width-25) / 100)
        var rowHeight = 100;

        if(this.state.entered_image_objects.length == 0){
            var items = ['1','1','1']
            return(
                <div>
                    <ImageList sx={{ width: 'auto', height: 'auto' }} cols={col} rowHeight={rowHeight}>
                        {items.map((item, index) => (
                            <ImageListItem key={item.img}>
                                <div style={{height:100, width:100, 'background-color': background_color, 'border-radius': '5px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img src={this.props.app_state.theme['letter']} style={{height:40 ,width:'auto'}} />
                                    </div>
                                    
                                </div>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            )
        }else{
            var items = [].concat(this.state.entered_image_objects);
            return(
                <div>
                    <ImageList sx={{ width: 'auto', height: 'auto' }} cols={col} rowHeight={rowHeight}>
                        {items.map((item, index) => (
                            <ImageListItem key={item}>
                                {this.render_image_item(item, index)}
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            )
        }
    }

    render_image_item(ecid, index){
        return(
            <div onClick={() => this.when_image_clicked(index)}>
                <img alt="" src={this.get_image_from_file(ecid)} style={{height:100 ,width:100}} />
            </div> 
        )
    }


    get_image_from_file(ecid){
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

    when_image_clicked(index){
        var cloned_array = this.state.entered_image_objects.slice()
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_image_objects: cloned_array})
    }









    render_enter_pdf_part(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_pick_pdf_parts()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_pick_pdf_parts()}
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
                        {this.render_pick_pdf_parts()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_pick_pdf_parts(){
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'13px','text':this.props.app_state.loc['162o']/* 'The gray circle stages a pdf file. Then swipe it to remove.' */})}
                {this.render_create_pdf_ui_buttons_part()}
                {this.render_pdfs_part()}
            </div>
        )
    }

    render_create_pdf_ui_buttons_part(){
        return(
        <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '7px 5px 10px 10px', width: '99%'}}>
            <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                <img alt="" src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} onClick={() => this.props.show_pick_file_bottomsheet('pdf', 'create_pdf', 10**16)}/>
            </div>
        </div>
      )
    }

    when_pdf_files_picked = async (files) => {
        var clonedArray = this.state.entered_pdf_objects == null ? [] : this.state.entered_pdf_objects.slice();
        files.forEach(file => {
            clonedArray.push(file);
        });

        var cloned_ecid_encryption_passwords = this.state.ecid_encryption_passwords == null ? {} : structuredClone(this.state.ecid_encryption_passwords)
        for(var f=0; f<files.length; f++){
            const file = files[f]
            cloned_ecid_encryption_passwords[file] = await this.props.get_ecid_file_password_if_any(file)
        }
        this.setState({entered_pdf_objects: clonedArray, ecid_encryption_passwords: cloned_ecid_encryption_passwords});
    }

    render_pdfs_part(){
        var items = [].concat(this.state.entered_pdf_objects)

        if(items.length == 0){
            return(
                <div style={{}}>
                    {this.render_empty_views(3)}
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_pdf_clicked(item, index)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <div style={{'margin':'3px 0px 3px 0px'}}>
                                            {this.render_uploaded_file(item, index)}
                                        </div>
                                    </div>
                                </SwipeableListItem>
                            </SwipeableList>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_uploaded_file(item, index){
        var ecid_obj = this.get_cid_split(item)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        //
        var formatted_size = this.format_data_size(data['size'])
        var fs = formatted_size['size']+' '+formatted_size['unit']
        var title = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
        var details = data['name']
        var thumbnail = data['thumbnail']

        return(
            <div>
                {this.render_detail_item('8', {'details':title,'title':details, 'size':'l', 'image':thumbnail, 'border_radius':'15%'})}
            </div>
        )
    }

    when_pdf_clicked(item, index){
        var cloned_array = this.state.entered_pdf_objects.slice()
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_pdf_objects: cloned_array})
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
        else if(size > (1024*1024*1024*1024)){
            return {'size':parseFloat(size/(1024*1024*1024*1024)).toFixed(3), 'unit':'TBs'}
        }
        else if(size > (1024*1024*1024)){
            return {'size':parseFloat(size/(1024*1024*1024)).toFixed(3), 'unit':'GBs'}
        }
        else if(size > (1024*1024)){
            return {'size':parseFloat(size/(1024*1024)).toFixed(3), 'unit':'MBs'}
        }
        else if(size > 1024){
            return {'size':parseFloat(size/1024).toFixed(3), 'unit':'KBs'}
        }
        else{
            return {'size':size, 'unit':'bytes'}
        }
    }






    render_enter_zip_part(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_pick_zip_parts()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_pick_zip_parts()}
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
                        {this.render_pick_zip_parts()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }
    
    render_pick_zip_parts(){
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'13px','text':this.props.app_state.loc['162p']/* 'The gray circle stages a pdf file. Then swipe it to remove.' */})}
                {this.render_create_zip_ui_buttons_part()}
                {this.render_zips_part()}
            </div>
        )
    }
    
    render_create_zip_ui_buttons_part(){
        return(
        <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '7px 5px 10px 10px', width: '99%'}}>
            <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                <img alt="" src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} onClick={() => this.props.show_pick_file_bottomsheet('zip', 'create_zip', 10**16)}/>
            </div>
        </div>
        )
    }
    
    when_zip_files_picked = async (files) => {
        var clonedArray = this.state.entered_zip_objects == null ? [] : this.state.entered_zip_objects.slice();
        files.forEach(file => {
            clonedArray.push(file);
        });
        var cloned_ecid_encryption_passwords = this.state.ecid_encryption_passwords == null ? {} : structuredClone(this.state.ecid_encryption_passwords)
        for(var f=0; f<files.length; f++){
            const file = files[f]
            cloned_ecid_encryption_passwords[file] = await this.props.get_ecid_file_password_if_any(file)
        }
        this.setState({entered_zip_objects: clonedArray, ecid_encryption_passwords: cloned_ecid_encryption_passwords});
    }
    
    render_zips_part(){
        var items = [].concat(this.state.entered_zip_objects)
    
        if(items.length == 0){
            return(
                <div style={{}}>
                    {this.render_empty_views(3)}
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_zip_clicked(item, index)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <div style={{'margin':'3px 0px 3px 0px'}}>
                                            {this.render_uploaded_zip_file(item, index)}
                                        </div>
                                    </div>
                                </SwipeableListItem>
                            </SwipeableList>
                        ))}
                    </ul>
                </div>
            )
        }
    }
    
    render_uploaded_zip_file(item, index){
        var ecid_obj = this.get_cid_split(item)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        //
        var formatted_size = this.format_data_size(data['size'])
        var fs = formatted_size['size']+' '+formatted_size['unit']
        var title = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
        var details = data['name']
        var thumbnail = this.props.app_state.static_assets['zip_file']
    
        return(
            <div>
                {this.render_detail_item('8', {'details':title,'title':details, 'size':'l', 'image':thumbnail, 'border_radius':'15%'})}
            </div>
        )
    }
    
    when_zip_clicked(item, index){
        var cloned_array = this.state.entered_zip_objects.slice()
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_zip_objects: cloned_array})
    }








    render_enter_markdown_part(){
        var size = this.props.size
        if(size == 's' || size == 'm'){
            return(
                <div>
                    {this.render_edit_markdown_parts()}
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_detail_item('4', {'text':this.props.app_state.loc['a311bv']/* 'You can add some Markdown text below. */, 'textsize':'13px', 'font':this.props.app_state.font})}
                        <div style={{height:10}}/>

                        <div style={{'margin':'0px 0px 0px 10px'}}>
                            <TextInput height={this.props.height-350} placeholder={this.props.app_state.loc['a311bs']/* 'New Markdown here...' */} when_text_input_field_changed={this.when_markdown_field_changed.bind(this)} text={this.state.markdown} theme={this.props.theme}/>
                        </div>

                        {this.render_markdown_shortcut_list()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_markdown_or_empty()}
                    </div>
                </div>
                
            )
        }
    }

    render_markdown_or_empty(){
        if(this.state.markdown.trim() == ''){
            return(
                <div>
                    {this.render_empty_views(2)}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('13', {'source':this.state.markdown})}
                </div>
            )
        }
    }

    render_edit_markdown_parts(){
        return(
            <div>
                {this.render_detail_item('4', {'text':this.props.app_state.loc['a311bv']/* 'You can add some Markdown text below. */, 'textsize':'13px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>

                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_markdown_preview_or_editor_object} tag_size={'l'} when_tags_updated={this.when_get_markdown_preview_or_editor_object_updated.bind(this)} theme={this.props.theme}/>

                {this.render_preview_or_editor_option_ui()}
            </div>
        )
    }

    when_get_markdown_preview_or_editor_object_updated(tags_obj){
        this.setState({get_markdown_preview_or_editor_object: tags_obj})
    }

    render_preview_or_editor_option_ui(){
        var selected_item = this.get_selected_item(this.state.get_markdown_preview_or_editor_object, this.state.get_markdown_preview_or_editor_object['i'].active)

        if(selected_item == this.props.app_state.loc['a311bt']/* 'Editor' */){
            return(
                <div>
                    <div style={{'margin':'0px 0px 0px 10px'}}>
                        <TextInput height={this.props.height-350} placeholder={this.props.app_state.loc['a311bs']/* 'New Markdown here...' */} when_text_input_field_changed={this.when_markdown_field_changed.bind(this)} text={this.state.markdown} theme={this.props.theme}/>
                    </div>

                    {this.render_markdown_shortcut_list()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['a311bu']/* 'preview' */){
            return(
                <div>
                    {this.render_markdown_or_empty()}
                </div>
            )
        }
    }

    when_markdown_field_changed(text){
        this.setState({markdown: text})
    }

    render_markdown_shortcut_list(){
        var items = [
            {'title':this.props.app_state.loc['a311ca']/* 'Headings' */, 'details':'# H1 \n## H2 \n### H3', 'size':'l'},
            {'title':this.props.app_state.loc['a311cd']/* 'Bold' */, 'details':'**bold text**', 'size':'l'},
            {'title':this.props.app_state.loc['a311ce']/* 'Italic' */, 'details':'*italicized text*', 'size':'l'},
            {'title':this.props.app_state.loc['a311cf']/* 'Blockquote' */, 'details':'> blockquote', 'size':'l'},
            {'title':this.props.app_state.loc['a311cg']/* 'Ordered List' */, 'details':'1. First item \n2. Second item \n3. Third item', 'size':'l'},
            {'title':this.props.app_state.loc['a311ch']/* 'Unordered List' */, 'details':'- First item \n- Second item \n- Third item', 'size':'l'},
            {'title':this.props.app_state.loc['a311ci']/* 'Code' */, 'details':'`code`', 'size':'l'},
            {'title':this.props.app_state.loc['a311cj']/* 'Horizontal rule' */, 'details':'---', 'size':'l'},
            {'title':this.props.app_state.loc['a311ck']/* 'Link' */, 'details':'[title](https://www.example.com)', 'size':'l'},
            {'title':this.props.app_state.loc['a311cl']/* 'Image' */, 'details':'![alt text](image.jpg)', 'size':'l'},
        ]

        return(
            <div>
                {this.render_detail_item('0')}
                <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={() => this.when_markdown_shortcut_clicked(item['details'])}>
                                {this.render_detail_item('3', item)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    when_markdown_shortcut_clicked(text){
        this.setState({markdown: this.state.markdown+'\n'+text})
    }







    render_proposal_configuration_data(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_small_screen_proposal_config_ui()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_mid_screen_proposal_config_ui()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_mid_screen_proposal_config_ui2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_mid_screen_proposal_config_ui()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_mid_screen_proposal_config_ui2()}
                    </div>
                </div>
                
            )
        }
    }


    render_mid_screen_proposal_config_ui(){
        return(
            <div>
                {this.render_configuration_section_parts(0)}
                {this.render_detail_item('0')}
                {this.render_configuration_section_parts(1)}
                {this.render_detail_item('0')}
                
            </div>
        )
    }

    render_mid_screen_proposal_config_ui2(){
        return(
            <div>
                {this.render_configuration_section_parts(2)}
                {this.render_detail_item('0')}
                {this.render_configuration_section_parts(3)}
                {this.render_detail_item('0')}
            </div>
        )
    }


    render_small_screen_proposal_config_ui(){
        var page = this.state.page
        return(
            <div>
                {this.render_configuration_section_parts(page)}

                <div style={{height:20}}/>
                <div className="row">
                    <div className="col-6" style={{'padding': '0px 0px 0px 10px'}}>
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
        if(page < 3){
            return(
                <div style={{'padding': '5px'}} onClick={()=>this.enter_next_page()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['186']/* 'Next' */, 'action':''})}
                </div>
            )
        }
    }

    show_previous_button(){
        var page = this.state.page
        if(page != 0){
            return(
                <div style={{'padding': '5px'}} onClick={()=>this.enter_previous_page()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['187']/* 'Previous' */, 'action':''})}
                </div>
            )
        }
    }


    render_configuration_section_parts(page){
        // var page = this.state.page

        if(page == 0){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['346']/* 'Consensus Type' */, 'details':this.props.app_state.loc['347']/* 'Set the type of action you wish to perform with the contract through your new proposal' */, 'size':'l'})}
                    <div style={{height:20}}/>

                    <Tags font={this.props.app_state.font} page_tags_object={this.state.new_proposal_type_tags_object} tag_size={'l'} when_tags_updated={this.when_new_proposal_type_tags_object_updated.bind(this)} theme={this.props.theme}/>
                </div>
            )
        }
        else if(page == 1){
            var contract_config = this.state.contract_item['data'][1]
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['348']/* 'Proposal Exipry Time' */, 'details':this.props.app_state.loc['349']/* 'Set the time after which youre set to submit the new proposal during which no new votes can be cast.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', { 'title': this.get_time_diff(contract_config[5]), 'details': this.props.app_state.loc['350']/* 'Proposal Expiry Duration Limit' */, 'size': 'l'})}
                    <div style={{height:10}}/>
                    <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], }, })}>
                        <CssBaseline />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_new_dat_time_value_set(newValue)}/>
                        </LocalizationProvider>
                    </ThemeProvider>

                    <div style={{height:20}}/>
                    {this.render_detail_item('3', {'title':this.get_time_from_now(this.state.proposal_expiry_time), 'details':this.props.app_state.loc['1294']/* 'Time from now' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.set_max_expiry_time()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['438p']/* 'Set Expiry Limit.' */, 'action': ''})}
                    </div>
                    
                </div>
            )
        }
        else if(page == 2){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['352']/* 'Modify Target' */, 'details':this.props.app_state.loc['353']/* 'The target object thats being modified if the consensus type is reconfig' */, 'size':'l'})}
                    <div style={{height:20}}/>

                    <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['354']/* 'Object ID...' */} when_text_input_field_changed={this.when_modify_target_text_input_field_changed.bind(this)} text={this.state.modify_target_id} theme={this.props.theme}/>

                    {this.load_account_suggestions('modify_target')}

                </div>
            )
        }
        else if(page == 3){
            var contract_config = this.state.contract_item['data'][1]
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['355']/* 'Consensus Submit Expiry Time' */, 'details':this.props.app_state.loc['356']/* 'The time after which you cannot sumbit your new proposal.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title': this.get_time_diff(contract_config[36]), 'details': this.props.app_state.loc['357']/* 'Maximum Proposal Expiry Submit Expiry Time Difference' */, 'size': 'l'})}
                    <div style={{height:10}}/>

                    <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], }, })}>
                        <CssBaseline />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_new_submit_time_value_set(newValue)}/>
                        </LocalizationProvider>
                    </ThemeProvider>

                    <div style={{height:20}}/>
                    {this.render_detail_item('3', {'title':this.get_time_from_now(this.state.proposal_submit_expiry_time), 'details':this.props.app_state.loc['351']/* 'Time from now' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.set_max_submit_expiry_time()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['438q']/* 'Set Submit Limit.' */, 'action': ''})}
                    </div>
                </div>
            )
        }
    }

    when_new_dat_time_value_set(value){
        const selectedDate = value instanceof Date ? value : new Date(value);
        const timeInSeconds = Math.floor(selectedDate.getTime() / 1000);
        this.setState({proposal_expiry_time: timeInSeconds})
    }

    set_max_expiry_time(){
        var contract_config = this.state.contract_item['data'][1]
        var now = Math.floor(Date.now()/1000)
        var max = bigInt(now).plus(contract_config[5]).plus(6*60*60)
        this.setState({proposal_expiry_time: max})
    }

    when_new_submit_time_value_set(value){
        const selectedDate = value instanceof Date ? value : new Date(value);
        const timeInSeconds = Math.floor(selectedDate.getTime() / 1000);
        
        var proposal_submit_expiry_time_difference = this.state.contract_item['data'][1][36]
        var set_submit_timestamp = timeInSeconds
        var set_timestamp = this.state.proposal_expiry_time
        var now_in_sec = Date.now()/1000
        
        if(set_submit_timestamp <= now_in_sec){
            this.props.notify(this.props.app_state.loc['358']/* 'You cant use a time before now' */, 3200)
        }
        else if(set_submit_timestamp - set_timestamp > proposal_submit_expiry_time_difference && proposal_submit_expiry_time_difference != 0){
            this.props.notify(this.props.app_state.loc['359']/* 'That submit time is invalid' */, 4200)
        }else{
            this.setState({proposal_submit_expiry_time: timeInSeconds})
        }
    }

    set_max_submit_expiry_time(){
        var contract_config = this.state.contract_item['data'][1]
        var max = bigInt(this.state.proposal_expiry_time).plus(contract_config[36]).plus(6*60*60)
        if(contract_config[36] == 0){
            max = bigInt(max).plus((60*60*24*7*3))
        }
        this.setState({proposal_submit_expiry_time: max})
    }


    when_new_proposal_type_tags_object_updated(tag_obj){
        this.setState({new_proposal_type_tags_object: tag_obj})
    }


    when_modify_target_text_input_field_changed = async (text) =>{
        this.setState({modify_target_id: text})
        this.fetch_modify_target_data(text)
    }

    fetch_modify_target_data = async (text) =>{
        if(text.trim() != '' && !isNaN(text)){
            var modify_target_data = await this.props.load_modify_item_data(text, this.props.app_state.selected_e5)
            this.setState({modify_target_data: modify_target_data})
        }
    }

    check_if_page_details_are_valid(){
        var is_valid = true
        if(this.state.page == 1){
            var proposal_expiry_time = this.state.contract_item['data'][1][5]
            var set_timestamp = this.state.proposal_expiry_time
            var now_in_sec = Date.now()/1000
            if(set_timestamp < parseInt(now_in_sec)+parseInt(proposal_expiry_time)){
                this.props.notify(this.props.app_state.loc['360']/* 'That proposal expiry time is less than the minimum required by the contract' */, 3500)
                is_valid = false;
            }
            else if(set_timestamp <= now_in_sec){
                this.props.notify(this.props.app_state.loc['358']/* 'You cant use a time before now' */, 4200)
                is_valid = false;
            }
        }
        return is_valid
    }


    enter_next_page(){
        var page = this.state.page
        if(page < 18 && this.check_if_page_details_are_valid()){
            this.setState({page: this.state.page+1})
        }
    }

    enter_previous_page(){
        var page = this.state.page
        if(page > 0){
            this.setState({page: this.state.page-1})
        }
    }


    load_account_suggestions(type){
        var items = [].concat(this.get_suggested_accounts(type))
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                      {items.map((item, index) => (
                          <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_suggestion_clicked(item, index, type)}>
                              {this.render_detail_item('3', item['label'])}
                          </li>
                      ))}
                  </ul>
                </div>
        )
    }

    get_suggested_accounts(type){
        if(type == 'modify_target'){
            return[
                {'id':''+this.state.contract_item['id'], 'label':{'title':this.props.app_state.loc['362']/* 'This Contract' */, 'details':this.props.app_state.loc['361']/* 'Contract' */, 'size':'s'}},
                {'id':'2', 'label':{'title':this.props.app_state.loc['363']/* 'Main Contract' */, 'details':this.props.app_state.loc['364']/* 'Contract ID 2' */, 'size':'s'}},
                {'id':'3','label':{'title':this.props.app_state.loc['365']/* 'End Exchange' */, 'details':this.props.app_state.loc['366']/* 'Account ID 3' */, 'size':'s'}},
                {'id':'5','label':{'title':this.props.app_state.loc['367']/* 'Spend Exchange' */, 'details':this.props.app_state.loc['368']/* 'Account ID 5' */, 'size':'s'}},
            ]
        }
        else if(type == 'spend_target'){
            return[
                {'id':'53', 'label':{'title':this.props.app_state.loc['369']/* 'My Account' */, 'details':this.props.app_state.loc['370']/* 'Account' */, 'size':'s'}},
            ].concat(this.get_account_suggestions(type))
        }
        else if(type == 'spend_token'){
            return[
                {'id':'3', 'label':{'title':this.props.app_state.loc['371']/* 'End Token' */, 'details':this.props.app_state.loc['373']/* 'Exchange ID 3' */, 'size':'s'}},
                {'id':'5', 'label':{'title':this.props.app_state.loc['372']/* 'Spend Token' */, 'details':this.props.app_state.loc['374']/* 'Exchange ID 5' */, 'size':'s'}},
            ]
        }
        else if(type == 'reconfig_target_id'){
            return[
                {'id':'53', 'label':{'title':this.props.app_state.loc['369']/* 'My Account' */, 'details':this.props.app_state.loc['370']/* 'Account' */, 'size':'s'}},
                {'id':'2', 'label':{'title':this.props.app_state.loc['363']/* 'Main Contract' */, 'details':this.props.app_state.loc['364']/* 'Contract ID 2' */, 'size':'s'}},
                {'id':'0','label':{'title':this.props.app_state.loc['375']/* 'Burn Account' */, 'details':this.props.app_state.loc['376']/* 'Account ID 0' */, 'size':'s'}},
            ]
        }
        else if(type == 'exchange_transfer_target'){
            return[
                {'id':'3', 'label':{'title':this.props.app_state.loc['371']/* 'End Token' */, 'details':this.props.app_state.loc['373']/* 'Exchange ID 3' */, 'size':'s'}},
                {'id':'5', 'label':{'title':this.props.app_state.loc['372']/* 'Spend Token' */, 'details':this.props.app_state.loc['374']/* 'Exchange ID 5' */, 'size':'s'}},
            ]
        }
        else if(type =='bounty_exchange_target'){
            return[
                {'id':'3', 'label':{'title':this.props.app_state.loc['371']/* 'End Token' */, 'details':this.props.app_state.loc['373']/* 'Exchange ID 3' */, 'size':'s'}},
                {'id':'5', 'label':{'title':this.props.app_state.loc['372']/* 'Spend Token' */, 'details':this.props.app_state.loc['374']/* 'Exchange ID 5' */, 'size':'s'}},
            ]
        }
        else if(type == 'exchange_transfer_receiver'){
            return[
                {'id':'53', 'label':{'title':this.props.app_state.loc['369']/* 'My Account' */, 'details':this.props.app_state.loc['370']/* 'Account' */, 'size':'s'}},
                {'id':'2', 'label':{'title':this.props.app_state.loc['363']/* 'Main Contract' */, 'details':this.props.app_state.loc['364']/* 'Contract ID 2' */, 'size':'s'}},
                {'id':'0','label':{'title':this.props.app_state.loc['375']/* 'Burn Account' */, 'details':this.props.app_state.loc['376']/* 'Account ID 0' */, 'size':'s'}},
            ].concat(this.get_account_suggestions(type))
        }
        else if(type == 'token_target'){
            return[
                {'id':'3', 'label':{'title':this.props.app_state.loc['371']/* 'End Token' */, 'details':this.props.app_state.loc['373']/* 'Exchange ID 3' */, 'size':'s'}},
                {'id':'5', 'label':{'title':this.props.app_state.loc['372']/* 'Spend Token' */, 'details':this.props.app_state.loc['374']/* 'Exchange ID 5' */, 'size':'s'}},
            ]
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

    get_account_suggestions(type){
        var contacts = this.props.app_state.contacts[this.props.app_state.selected_e5]
        var return_array = []

        if(type == 'spend_target'){
            contacts.forEach(contact => { 
                if(contact['id'].toString().includes(this.state.spend_target_input_text)){
                    return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
                }
            });
        }
        else if(type == 'exchange_transfer_receiver'){
            contacts.forEach(contact => {
                if(contact['id'].toString().includes(this.state.exchange_transfer_receiver)){
                    return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
                }
            });
        }
        return return_array;
    }

    get_contact_alias(contact){
        return (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[contact['id']] == null ? ((contact['address'].toString()).substring(0, 9) + "...") : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[contact['id']])
    }

    when_suggestion_clicked(item, pos, type){
        if(type == 'modify_target'){
            this.setState({modify_target_id: item['id']})
            this.fetch_modify_target_data(item['id'])
        }
        else if(type == 'spend_target'){
            this.setState({spend_target_input_text: item['id']})
        }
        else if(type == 'spend_token'){
            this.setState({spend_token_input_text: item['id']})
        }
        else if(type == 'reconfig_target_id'){
            this.setState({reconfig_target_id: item['id']})
        }
        else if(type == 'exchange_transfer_target'){
            this.setState({exchange_transfer_target: item['id']})
        }
        else if(type == 'bounty_exchange_target'){
            this.setState({bounty_exchange_target: item['id']})
        }
        else if(type == 'exchange_transfer_receiver'){
            this.setState({exchange_transfer_receiver: item['id']})
        }
        else if(type == 'token_target'){
            this.setState({token_target: item['id']})
        }
    }









    render_proposal_data_ui(){
        var selected_item = this.get_selected_item(this.state.new_proposal_type_tags_object, this.state.new_proposal_type_tags_object['i'].active)

        if(selected_item == this.props.app_state.loc['316']/* 'spend' */){
            return(
                <div>
                    {this.render_spend_proposal_ui()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['317']/* 'reconfig' */){
            return(
                <div>
                    {this.render_reconfig_proposal_ui()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['318']/* 'exchange-transfer' */){
            return(
                <div>
                    {this.render_exchange_transfer_ui()}
                </div>
            )
        }
    }


    render_spend_proposal_ui(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.spend_action_data_ui()}
                    <div style={{height:20}}/>
                    {this.render_spend_actions()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.spend_action_data_ui()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_spend_actions()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.spend_action_data_ui()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_spend_actions()}
                    </div>
                </div>
                
            )
        }
    }

    spend_action_data_ui(){
        return(
            <div>
                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['377']/* 'End Balance' */, 'subtitle':this.format_power_figure(this.state.contract_item['end_balance']), 'barwidth':this.calculate_bar_width(this.state.contract_item['end_balance']), 'number':this.format_account_balance_figure(this.state.contract_item['end_balance']), 'barcolor':'', 'relativepower':this.props.app_state.loc['3078']/* END */, })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['378']/* 'Spend Balance' */, 'subtitle':this.format_power_figure(this.state.contract_item['spend_balance']), 'barwidth':this.calculate_bar_width(this.state.contract_item['spend_balance']), 'number':this.format_account_balance_figure(this.state.contract_item['spend_balance']), 'barcolor':'', 'relativepower':this.props.app_state.loc['3079']/* SPEND */, })}

                </div>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['379']/* 'Spend Target' */, 'details':this.props.app_state.loc['380']/* 'Set a target for the spend action' */, 'size':'l'})}
                <div style={{height:20}}/>

                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['381']/* 'Target ID...' */} when_text_input_field_changed={this.when_spend_target_text_input_field_changed.bind(this)} text={this.state.spend_target_input_text} theme={this.props.theme}/>

                {this.load_account_suggestions('spend_target')}


                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['382']/* 'Exchange' */, 'details':this.props.app_state.loc['383']/* 'Set the token exchange your spending' */, 'size':'l'})}
                <div style={{height:20}}/>

                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['381']/* 'Target ID...' */} when_text_input_field_changed={this.when_spend_token_text_input_field_changed.bind(this)} text={this.state.spend_token_input_text} theme={this.props.theme}/>

                {this.load_account_suggestions('spend_token')}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['384']/* 'Spend Amount' */, 'details':this.props.app_state.loc['385']/* 'Set an amount for the spend action' */, 'size':'l'})}

                <div style={{height:20}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['386']/* 'Picked Amount' */, 'number':this.state.spend_amount, 'relativepower':this.props.app_state.loc['438r']/* 'tokens' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['386']/* 'Picked Amount' */, 'subtitle':this.format_power_figure(this.state.spend_amount), 'barwidth':this.calculate_bar_width(this.state.spend_amount), 'number':this.format_account_balance_figure(this.state.spend_amount), 'barcolor':'', 'relativepower':this.props.app_state.loc['438r']/* 'tokens' */, })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_spend_amount_set.bind(this)} theme={this.props.theme} power_limit={63}/>

                <div style={{'padding': '5px'}} onClick={()=>this.add_spend_action_to_list()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['127']/* 'Add' */, 'action':''})}
                </div>
            </div>
        )
    }


    when_spend_target_text_input_field_changed(new_text){
        this.setState({spend_target_input_text: new_text})
    }


    when_spend_token_text_input_field_changed(new_text){
        this.setState({spend_token_input_text: new_text})
    }


    when_spend_amount_set(amount){
        this.setState({spend_amount: amount})
    }


    add_spend_action_to_list(){
        var spend_target = this.state.spend_target_input_text.trim()
        var spend_token = this.get_token_id_from_symbol(this.state.spend_token_input_text.trim())
        var amount = this.state.spend_amount;

        if(isNaN(spend_target) || parseInt(spend_target) < 0 || spend_target == ''){
            this.props.notify(this.props.app_state.loc['387']/* 'please put a valid spend target' */, 4600)
        }
        else if(isNaN(spend_token) || parseInt(spend_token) < 0 || spend_token == '' || !this.does_exchange_exist(spend_token)){
            this.props.notify(this.props.app_state.loc['388']/* 'please put a valid exchange id' */, 4600)
        }
        else if(amount == 0){
            this.props.notify(this.props.app_state.loc['389']/* 'please put a valid amount' */, 4600)
        }
        else{
            var tx = {'amount': amount, 'spend_token':spend_token, 'spend_target':spend_target}
            var spend_actions_clone = this.state.spend_actions.slice()
            spend_actions_clone.push(tx)
            this.setState({spend_actions: spend_actions_clone, spend_token_input_text:'', spend_amount:0})
            this.props.notify(this.props.app_state.loc['390']/* 'spend action added to proposal!' */, 2600)
        }
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



    render_spend_actions(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.spend_actions)

        if(items.length == 0){
            items = [0, 1]
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
            var items = this.state.spend_actions
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.reverse().map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () => this.when_when_spend_action_clicked(item)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '5px'}}>
                                            {this.render_detail_item('3', {'title':''+this.format_account_balance_figure(item['amount'])+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['spend_token']], 'details':'target: '+item['spend_target']+', token: '+item['spend_token'], 'size':'s'})}
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

    when_when_spend_action_clicked(item){
        var cloned_array = this.state.spend_actions.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({spend_actions: cloned_array})
        // this.props.notify('spend action removed!', 1600)
    }












    render_reconfig_proposal_ui(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_reconfig_selector_part()}
                    {this.load_reconfig_items()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_reconfig_selector_part()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.load_reconfig_items()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_reconfig_selector_part()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.load_reconfig_items()}
                    </div>
                </div>
                
            )
        }
    }

    render_reconfig_selector_part(){
        return(
            <div>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.reconfig_items_tags_object} tag_size={'l'} when_tags_updated={this.when_reconfig_items_tags_object_updated.bind(this)} theme={this.props.theme}/>

                {this.load_reconfig_item_selectors()}
            </div>
        )
    }

    when_reconfig_items_tags_object_updated(tag_obj){
        this.setState({reconfig_items_tags_object:tag_obj})
        this.reset_the_number_picker()
    }

    constructor(props) {
        super(props);
        this.number_picker_ref = React.createRef();
        this.screen = React.createRef()
    }

    reset_the_number_picker(){
        var me = this;
        setTimeout(function() {
            if(me.number_picker_ref.current != null){
                me.number_picker_ref.current.reset_number_picker()
            }
        }, (1 * 1000));  
    }


    load_reconfig_item_selectors(){
        var selected_item = this.get_selected_item(this.state.reconfig_items_tags_object, this.state.reconfig_items_tags_object['i'].active)


        if(selected_item == 'e'){
            return(
                <div>
                    <div style={{height:10}}/>
                    {this.render_empty_views(4)}
                </div>
            )
        }

        if(selected_item == this.props.app_state.loc['861a']/* 'prices' */){
            return(
                <div>
                    {this.render_prices_picker()}
                </div>
            )
        }

        var properties = this.get_target_configuration(selected_item)
        var ui = properties['picker']

        if(ui == 'number'){
            return(
                <div>
                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px'}} onClick={() => this.props.view_number({'title':selected_item, 'number':this.state.reconfig_number, 'relativepower':this.props.app_state.loc['391']/* 'units' */})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':selected_item, 'subtitle':this.format_power_figure(this.state.reconfig_number), 'barwidth':this.calculate_bar_width(this.state.reconfig_number), 'number':this.format_account_balance_figure(this.state.reconfig_number), 'barcolor':'', 'relativepower':this.props.app_state.loc['391']/* 'units' */, })}
                    </div>
                    <div style={{height:10}}/>
                    {this.render_current_items(properties, selected_item)}

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_amount_changed.bind(this)} theme={this.props.theme} power_limit={properties['powerlimit']}/>

                    <div style={{height:20}}/>
                    <div style={{'padding': '5px'}} onClick={()=>this.add_reconfiguration_item()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['392']/* 'Add Change' */, 'action':''})}
                    </div>

                    
                </div>
            )
        }
        else if(ui == 'proportion'){
            return(
                <div>
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'title':this.format_proportion(this.state.reconfig_proportion), 'details':selected_item, 'size':'l'})}

                    <div style={{height:10}}/>
                    {this.render_current_items(properties, selected_item)}

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_proportion_changed.bind(this)} power_limit={properties['powerlimit']} theme={this.props.theme} decimal_count={16} pick_with_text_area={true} text_area_hint={'5.3%'}/>

                    <div style={{height:20}}/>
                    <div style={{'padding': '5px'}} onClick={()=>this.add_reconfiguration_item()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['392']/* 'Add Change' */, 'action':''})}
                    </div>
                    
                </div>
            )
        }
        else if(ui == 'time'){
            return(
                <div>
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'title':this.get_time_diff(this.state.reconfig_duration), 'details':selected_item, 'size':'l'})}

                    <div style={{height:10}}/>
                    {this.render_current_items(properties, selected_item)}

                    <DurationPicker font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_time_changed.bind(this)} theme={this.props.theme} power_limit={properties['powerlimit']} loc={this.props.app_state.loc}/>
                    
                    <div style={{height:20}}/>
                    <div style={{'padding': '5px'}} onClick={()=>this.add_reconfiguration_item()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['392']/* 'Add Change' */, 'action':''})}
                    </div>
                    
                </div>
            )
        }
        else if(ui == 'tag'){
            return(
                <div>
                    <div style={{height:10}}/>
                    {this.load_tags_ui()}
                    <div style={{height:10}}/>
                    {this.render_current_items(properties, selected_item)}
                    <div style={{'padding': '5px'}} onClick={()=>this.add_reconfiguration_item()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['392']/* 'Add Change' */, 'action':''})}
                    </div>
                    
                </div>
            )
        }
        else if(ui == 'id'){
            return(
                <div>
                    <div style={{height:10}}/>
                    <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['381']/* 'Target ID...' */} when_text_input_field_changed={this.when_reconfig_target_id_text_input_field_changed.bind(this)} text={this.state.reconfig_target_id} theme={this.props.theme}/>

                    {this.load_account_suggestions('reconfig_target_id')}

                    <div style={{height:10}}/>
                    {this.render_current_items(properties, selected_item)}

                    <div style={{height:20}}/>
                    <div style={{'padding': '5px'}} onClick={()=>this.add_reconfiguration_item()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['392']/* 'Add Change' */, 'action':''})}
                    </div>

                    
                </div>
            )
        }
    }

    render_current_items(properties, selected_item){
        if(this.state.modify_target_data != null){
            var selected_option = this.state.reconfig_items_tags_object['i'].active
            var o = {'contract':30/* 30(contract_obj_id) */, 'subscription':33/* 33(subscription_object) */, 'exchange':31/* 31(token_exchange) */}
            var modify_target_type = this.state.modify_target_data['type']
            if((modify_target_type == o[selected_option]) || (this.state.modify_target_id == '2' && selected_option == 'contract')){
                var ui = properties['picker']
                var current_value = this.state.modify_target_data['data'][properties['position'][0]][properties['position'][1]]
                if(ui == 'number'){
                    return(
                        <div>
                            <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px'}} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2806']/* 'Current ' */+selected_item, 'number':current_value, 'relativepower':this.props.app_state.loc['391']/* 'units' */})}>
                                {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2806']/* 'Current ' */+selected_item, 'subtitle':this.format_power_figure(current_value), 'barwidth':this.calculate_bar_width(current_value), 'number':this.format_account_balance_figure(current_value), 'barcolor':'', 'relativepower':this.props.app_state.loc['391']/* 'units' */, })}
                            </div>
                        </div>
                    )
                }
                else if(ui == 'proportion'){
                    return(
                        <div>
                            {this.render_detail_item('3', {'title':this.format_proportion(current_value), 'details':this.props.app_state.loc['393']/* 'Current ' */+selected_item, 'size':'l'})}
                        </div>
                    )
                }
                else if(ui == 'time'){
                    return(
                        <div>
                            {this.render_detail_item('3', {'title':this.get_time_diff(current_value), 'details':this.props.app_state.loc['394']/* 'Current Value' */, 'size':'l'})}
                        </div>
                    )
                }
                else if(ui == 'tag'){
                    return(
                        <div>
                            {this.render_detail_item('3', {'title':this.get_tag_selected_item(selected_item, current_value), 'details':this.props.app_state.loc['394']/* 'Current Value' */, 'size':'l'})}
                        </div>
                    )
                }
                else if(ui == 'id'){
                    return(
                        <div>
                            {this.render_detail_item('3', {'title':current_value, 'details':this.props.app_state.loc['394']/* 'Current Value' */, 'size':'l'})}
                        </div>
                    )
                }
            }
        }
    }

    when_amount_changed(number){
        this.setState({reconfig_number: number})
    }

    when_proportion_changed(number){
        this.setState({reconfig_proportion: number})
    }

    when_time_changed(number){
        this.setState({reconfig_duration: number})
    }

    when_reconfig_target_id_text_input_field_changed(text){
        this.setState({reconfig_target_id: text})
    }

    get_target_configuration(property){
        var obj = {
            'Vote Bounty Split Proportion':{'position':[1,1], 'picker':'proportion', 'powerlimit':9},
            'Maximum Extend Enter Contract Limit':{'position':[1,2], 'picker':'time', 'powerlimit':63}, 
            'Minimum End Bounty Amount':{'position':[1,4], 'picker':'number', 'powerlimit':63}, 
            'Proposal Expiry Duration Limit':{'position':[1,5], 'picker':'time', 'powerlimit':63}, 
            'Maximum Enter Contract Duration':{'position':[1,6], 'picker':'time', 'powerlimit':63}, 
            'Auto Wait':{'position':[1,8], 'picker':'tag', 'powerlimit':63}, 
            'Proposal Modify Expiry Duration Limit':{'position':[1,27], 'picker':'time', 'powerlimit':63},
            'Moderator Modify Privelage':{'position':[1,28], 'picker':'tag', 'powerlimit':9}, 
            'Unlimited Extend Contract Time':{'position':[1,29], 'picker':'tag', 'powerlimit':9}, 
            'Maximum Proposal Expiry Submit Expiry time difference':{'position':[1,36], 'picker':'time', 'powerlimit':63}, 
            'Bounty Limit Type':{'position':[1,37], 'picker':'tag', 'powerlimit':9}, 
            'Force Exit Enabled':{'position':[1,38], 'picker':'tag', 'powerlimit':9}, 
            'Minimum Spend Bounty Amount':{'position':[1,10], 'picker':'number', 'powerlimit':63},
            'Transaction Gas Limit':{'position':[1,11], 'picker':'number', 'powerlimit':63},


            'Target Authority':{'position':[1,0], 'picker':'id', 'powerlimit':63},
            'Target Beneficiary':{'position':[1,6], 'picker':'id', 'powerlimit':63},
            'Minimum Buy Amount':{'position':[1,1], 'picker':'number', 'powerlimit':63},
            'Maximum Buy Amount':{'position':[1,3], 'picker':'number', 'powerlimit':63}, 
            'Minimum Cancellable Balance Amount':{'position':[1,4], 'picker':'number', 'powerlimit':63},


            'Buy Limit':{'position':[1,0], 'picker':'number', 'powerlimit':63},
            'Trust Fee':{'position':[1,7], 'picker':'proportion', 'powerlimit':9}, 
            'Sell Limit':{'position':[1,11], 'picker':'number', 'powerlimit':63}, 
            'Minimum Time Between Swap':{'position':[1,4], 'picker':'time', 'powerlimit':63}, 
            'Minimum Transactions Between Swap':{'position':[1,2], 'picker':'number', 'powerlimit':63}, 
            'Minimum Blocks Between Swap':{'position':[1,3], 'picker':'number', 'powerlimit':63}, 
            'Minimum Entered Contracts Between Swap':{'position':[1,13], 'picker':'number', 'powerlimit':63}, 
            'Minimum Transactions For First Buy':{'position':[1,17], 'picker':'number', 'powerlimit':63}, 
            'Minimum Entered Contracts For First Buy':{'position':[1,18], 'picker':'number', 'powerlimit':63}, 
            'Block Limit':{'position':[1,1], 'picker':'number', 'powerlimit':63}, 
            'Halving type':{'position':[1,15], 'picker':'tag', 'powerlimit':63}, 
            'Maturity Limit':{'position':[1,16], 'picker':'number', 'powerlimit':63}, 
            'Internal Block Halving Proportion':{'position':[1,5], 'picker':'proportion', 'powerlimit':9}, 
            'Block Limit Reduction Proportion':{'position':[1,6], 'picker':'proportion', 'powerlimit':9}, 
            'Block Reset Limit':{'position':[1,8], 'picker':'number', 'powerlimit':63}, 
            'Block Limit Sensitivity':{'position':[1,12], 'picker':'tag', 'powerlimit':63}, 
            'Exchange Ratio X':{'position':[2,0], 'picker':'number', 'powerlimit':63}, 
            'Exchange Ratio Y':{'position':[2,1], 'picker':'number', 'powerlimit':63},
        }

        obj[this.props.app_state.loc['68']]/* 'Vote Bounty Split Proportion' */ = {'position':[1,1], 'picker':'proportion', 'powerlimit':9}
        obj[this.props.app_state.loc['69']]/* 'Maximum Extend Enter Contract Limit' */ = {'position':[1,2], 'picker':'time', 'powerlimit':63} 
        obj[this.props.app_state.loc['70']]/* 'Minimum End Bounty Amount' */ = {'position':[1,4], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['71']]/* 'Proposal Expiry Duration Limit' */ = {'position':[1,5], 'picker':'time', 'powerlimit':63} 
        obj[this.props.app_state.loc['72']]/* 'Maximum Enter Contract Duration' */ = {'position':[1,6], 'picker':'time', 'powerlimit':63} 
        obj[this.props.app_state.loc['73']]/* 'Auto Wait' */ = {'position':[1,8], 'picker':'tag', 'powerlimit':63}
        obj[this.props.app_state.loc['74']]/* 'Proposal Modify Expiry Duration Limit' */ = {'position':[1,27], 'picker':'time', 'powerlimit':63}
        obj[this.props.app_state.loc['75']]/* 'Moderator Modify Privelage' */ = {'position':[1,28], 'picker':'tag', 'powerlimit':9}
        obj[this.props.app_state.loc['76']]/* 'Unlimited Extend Contract Time' */ = {'position':[1,29], 'picker':'tag', 'powerlimit':9}
        obj[this.props.app_state.loc['77']]/* 'Maximum Proposal Expiry Submit Expiry time difference' */ = {'position':[1,36], 'picker':'time', 'powerlimit':63} 
        obj[this.props.app_state.loc['78']]/* 'Bounty Limit Type' */ = {'position':[1,37], 'picker':'tag', 'powerlimit':9} 
        obj[this.props.app_state.loc['79']]/* 'Force Exit Enabled' */ = {'position':[1,38], 'picker':'tag', 'powerlimit':9} 
        obj[this.props.app_state.loc['80']]/* 'Minimum Spend Bounty Amount' */ = {'position':[1,10], 'picker':'number', 'powerlimit':63}
        obj[this.props.app_state.loc['438h']]/* 'Transaction Gas Limit' */ = {'position':[1,11], 'picker':'number', 'powerlimit':63}




        obj[this.props.app_state.loc['438a']]/* 'Target Authority' */ = {'position':[1,0], 'picker':'id', 'powerlimit':63}
        obj[this.props.app_state.loc['438b']]/* 'Target Beneficiary' */ = {'position':[1,6], 'picker':'id', 'powerlimit':63}
        obj[this.props.app_state.loc['438c']]/* 'Minimum Buy Amount' */ = {'position':[1,1], 'picker':'number', 'powerlimit':63}
        obj[this.props.app_state.loc['438d']]/* 'Maximum Buy Amount' */ = {'position':[1,3], 'picker':'number', 'powerlimit':63}
        obj[this.props.app_state.loc['438e']]/* 'Minimum Cancellable Balance Amount' */ = {'position':[1,4], 'picker':'number', 'powerlimit':63}


        obj[this.props.app_state.loc['326']]/* 'Buy Limit' */ = {'position':[1,0], 'picker':'number', 'powerlimit':63}
        obj[this.props.app_state.loc['327']]/* 'Trust Fee' */ = {'position':[1,7], 'picker':'proportion', 'powerlimit':9}
        obj[this.props.app_state.loc['328']]/* 'Sell Limit' */ = {'position':[1,11], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['329']]/* 'Minimum Time Between Swap' */ = {'position':[1,4], 'picker':'time', 'powerlimit':63}
        obj[this.props.app_state.loc['330']]/* 'Minimum Transactions Between Swap' */ = {'position':[1,2], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['331']]/* 'Minimum Blocks Between Swap' */ = {'position':[1,3], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['332']]/* 'Minimum Entered Contracts Between Swap' */ = {'position':[1,13], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['333']]/* 'Minimum Transactions For First Buy' */ = {'position':[1,17], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['334']]/* 'Minimum Entered Contracts For First Buy' */ = {'position':[1,18], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['335']]/* 'Block Limit' */ = {'position':[1,1], 'picker':'number', 'powerlimit':63}
        obj[this.props.app_state.loc['336']]/* 'Halving type' */ = {'position':[1,15], 'picker':'tag', 'powerlimit':63}
        obj[this.props.app_state.loc['337']]/* 'Maturity Limit' */ = {'position':[1,16], 'picker':'number', 'powerlimit':63}
        obj[this.props.app_state.loc['338']]/* 'Internal Block Halving Proportion' */ = {'position':[1,5], 'picker':'proportion', 'powerlimit':9} 
        obj[this.props.app_state.loc['339']]/* 'Block Limit Reduction Proportion' */ = {'position':[1,6], 'picker':'proportion', 'powerlimit':9} 
        obj[this.props.app_state.loc['340']]/* 'Block Reset Limit' */ = {'position':[1,8], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['341']]/* 'Block Limit Sensitivity' */ = {'position':[1,12], 'picker':'tag', 'powerlimit':63} 
        obj[this.props.app_state.loc['395']]/* 'Exchange Ratio X' */ = {'position':[2,0], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['396']]/* 'Exchange Ratio Y' */ = {'position':[2,1], 'picker':'number', 'powerlimit':63}

        return obj[property]
    }


    load_tags_ui(){
        var selected_item = this.get_selected_item(this.state.reconfig_items_tags_object, this.state.reconfig_items_tags_object['i'].active)

        if(selected_item == this.props.app_state.loc['73']/* 'Auto Wait' */){
            return(
                <div>
                    {this.render_detail_item('4', {'text':selected_item, 'textsize':'15px', 'font':this.props.app_state.font})}

                    <div style={{height:20}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.auto_wait_tags_object} tag_size={'l'} when_tags_updated={this.when_auto_wait_tags_object.bind(this)} theme={this.props.theme}/>
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['75']/* 'Moderator Modify Privelage' */){
            return(
                <div>
                    {this.render_detail_item('4', {'text':selected_item, 'textsize':'15px', 'font':this.props.app_state.font})}

                    <div style={{height:20}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.can_modify_contract_as_moderator} tag_size={'l'} when_tags_updated={this.when_can_modify_contract_as_moderator.bind(this)} theme={this.props.theme}/>
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['76']/* 'Unlimited Extend Contract Time' */){
            return(
                <div>
                    {this.render_detail_item('4', {'text':selected_item, 'textsize':'15px', 'font':this.props.app_state.font})}

                    <div style={{height:20}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.can_extend_enter_contract_at_any_time} tag_size={'l'} when_tags_updated={this.when_can_extend_enter_contract_at_any_time.bind(this)} theme={this.props.theme}/>
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['78']/* 'Bounty Limit Type' */){
            return(
                <div>
                    {this.render_detail_item('4', {'text':selected_item, 'textsize':'15px', 'font':this.props.app_state.font})}

                    <div style={{height:20}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.bounty_limit_type} tag_size={'l'} when_tags_updated={this.when_bounty_limit_type.bind(this)} theme={this.props.theme}/>
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['79']/* 'Force Exit Enabled' */){
            return(
                <div>
                    {this.render_detail_item('4', {'text':selected_item, 'textsize':'15px', 'font':this.props.app_state.font})}

                    <div style={{height:20}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.contract_force_exit_enabled} tag_size={'l'} when_tags_updated={this.when_contract_force_exit_enabled.bind(this)} theme={this.props.theme}/>
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['336']/* 'Halving type' */){
            return(
                <div>
                    {this.render_detail_item('4', {'text':selected_item, 'textsize':'15px', 'font':this.props.app_state.font})}
                    
                    <div style={{height:20}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.new_token_halving_type_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_halving_type_tags_object.bind(this)} theme={this.props.theme}/>
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['341']/* 'Block Limit Sensitivity' */){
            return(
                <div>
                    {this.render_detail_item('4', {'text':selected_item, 'textsize':'15px', 'font':this.props.app_state.font})}
                    
                    <div style={{height:20}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.new_token_block_limit_sensitivity_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_block_limit_sensitivity_tags_object.bind(this)} theme={this.props.theme}/>
                </div>
            )
        }
    }

    when_auto_wait_tags_object(tag_obj){
        this.setState({auto_wait_tags_object: tag_obj})
    }

    when_can_modify_contract_as_moderator(tag_obj){
        this.setState({can_modify_contract_as_moderator: tag_obj})
    }

    when_can_extend_enter_contract_at_any_time(tag_obj){
        this.setState({can_extend_enter_contract_at_any_time: tag_obj})
    }

    when_bounty_limit_type(tag_obj){
        this.setState({bounty_limit_type: tag_obj})
    }

    when_contract_force_exit_enabled(tag_obj){
        this.setState({contract_force_exit_enabled: tag_obj})
    }

    when_new_token_halving_type_tags_object(tag_obj){
        this.setState({new_token_halving_type_tags_object: tag_obj})
    }

    when_new_token_block_limit_sensitivity_tags_object(tag_obj){
        this.setState({new_token_block_limit_sensitivity_tags_object: tag_obj})
    }


    async add_reconfiguration_item(){
        var selected_item = this.get_selected_item(this.state.reconfig_items_tags_object, this.state.reconfig_items_tags_object['i'].active)

        var properties = this.get_target_configuration(selected_item)
        var ui = properties['picker']
        var position = properties['position']
        var reconfig_vaules_clone = this.state.reconfig_values.slice()

        if(ui == 'number'){
            var number = this.state.reconfig_number;
            reconfig_vaules_clone.push({'value':number, 'pos':position, 'title': selected_item, 'type':ui})
            this.setState({reconfig_values: reconfig_vaules_clone, reconfig_number:0})
            this.props.notify(this.props.app_state.loc['397']/* 'reconfig action added!' */, 1600)
        }
        else if(ui == 'proportion'){
            var number = this.state.reconfig_proportion;
            reconfig_vaules_clone.push({'value':number, 'pos':position, 'title': selected_item, 'type':ui})
            this.setState({reconfig_values: reconfig_vaules_clone, reconfig_proportion: 0})
            this.props.notify(this.props.app_state.loc['397']/* 'reconfig action added!' */, 1600)
        }
        else if(ui == 'time'){
            var number = this.state.reconfig_duration;
            reconfig_vaules_clone.push({'value':number, 'pos':position, 'title': selected_item, 'type':ui})
            this.setState({reconfig_values: reconfig_vaules_clone, reconfig_duration:0})
            this.props.notify(this.props.app_state.loc['397']/* 'reconfig action added!' */, 1600)
        }
        else if(ui == 'tag'){
            var number = this.get_tag_value()
            reconfig_vaules_clone.push({'value':number, 'pos':position, 'title': selected_item, 'type':ui})
            this.setState({reconfig_values: reconfig_vaules_clone})
            this.props.notify(this.props.app_state.loc['397']/* 'reconfig action added!' */, 1600)
        }
        else if(ui == 'id'){
            var number = await this.get_typed_alias_id(this.state.reconfig_target_id.trim())
            if(isNaN(number) || parseInt(number) < 0 || number == ''){
                this.props.notify(this.props.app_state.loc['398']/* 'please put a valid account id' */, 3600)
            }
            else{
                reconfig_vaules_clone.push({'value':number, 'pos':position, 'title': selected_item, 'type':ui})
                this.setState({reconfig_values: reconfig_vaules_clone, reconfig_duration:0})
                this.props.notify(this.props.app_state.loc['397']/* 'reconfig action added!' */, 1600)
            }
        }
    }


    get_tag_value(){
        var selected_item = this.get_selected_item(this.state.reconfig_items_tags_object, this.state.reconfig_items_tags_object['i'].active)

        if(selected_item == this.props.app_state.loc['73']/* 'Auto Wait' */){
            var item = this.get_selected_item(this.state.auto_wait_tags_object, this.state.auto_wait_tags_object['i'].active)
            var value = item == this.props.app_state.loc['81']/* 'no' */ ? 0 : 1
            return value;
        }
        else if(selected_item == this.props.app_state.loc['75']/* 'Moderator Modify Privelage' */){
            var item = this.get_selected_item(this.state.can_modify_contract_as_moderator, this.state.can_modify_contract_as_moderator['i'].active)
            var value = item == this.props.app_state.loc['84']/* 'non-modifiable' */ ? 0 : 1
            return value;
        }
        else if(selected_item == this.props.app_state.loc['76']/* 'Unlimited Extend Contract Time' */){
            var item = this.get_selected_item(this.state.can_extend_enter_contract_at_any_time, this.state.can_extend_enter_contract_at_any_time['i'].active)
            var value = item == this.props.app_state.loc['86']/* 'disabled' */ ? 0 : 1
            return value;
        }
        else if(selected_item == this.props.app_state.loc['78']/* 'Bounty Limit Type' */){
            var item = this.get_selected_item(this.state.bounty_limit_type, this.state.bounty_limit_type['i'].active)
            var value = item == this.props.app_state.loc['87']/* 'relative' */ ? 0 : 1
            return value;
        }
        else if(selected_item == this.props.app_state.loc['79']/* 'Force Exit Enabled' */){
            var item = this.get_selected_item(this.state.contract_force_exit_enabled, this.state.contract_force_exit_enabled['i'].active)
            var value = item == this.props.app_state.loc['90']/* 'disabled' */ ? 0 : 1
            return value;
        }
        else if(selected_item == this.props.app_state.loc['336']/* 'Halving type' */){
            var item = this.get_selected_item(this.state.new_token_halving_type_tags_object, this.state.new_token_halving_type_tags_object['i'].active)
            var value = item == this.props.app_state.loc['342']/* 'fixed' */ ? 0 : 1
            return value;
        }
        else if(selected_item == this.props.app_state.loc['341']/* 'Block Limit Sensitivity' */){
            var item = this.get_selected_item(this.state.new_token_block_limit_sensitivity_tags_object, this.state.new_token_block_limit_sensitivity_tags_object['i'].active)
            var value = parseInt(item)
            return value;
        }
    }


    load_reconfig_items(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.reconfig_values)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
                                <div style={{height:140, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={this.props.app_state.theme['letter']} style={{height:40 ,width:'auto'}} />
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
                        {items.map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_added_modify_item_clicked(item)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '5px'}}>
                                            {this.render_detail_item('3', {'title':''+item['title'], 'details':this.props.app_state.loc['861f']/* 'Modify Target' */, 'size':'l'})}
                                            <div style={{height:5}}/>
                                            {this.render_detail_item('3', {'title':''+item['pos'], 'details':this.props.app_state.loc['399']/* 'position' */, 'size':'l'})}
                                            <div style={{height:5}}/>
                                            {this.render_reconfig_value(item)}
                                            <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '5px 20px 5px 20px'}}/>
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


    render_reconfig_value(item){
        var title = item['title'];
        var ui = item['type']
        var number = item['value']
        if(ui == 'number'){
            return(
                <div>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px'}} onClick={() => this.props.view_number({'title':title, 'number':number, 'relativepower':this.props.app_state.loc['391']/* 'units' */})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':title, 'subtitle':this.format_power_figure(number), 'barwidth':this.calculate_bar_width(number), 'number':this.format_account_balance_figure(number), 'barcolor':'', 'relativepower':this.props.app_state.loc['391']/* 'units' */, })}
                    </div>
                </div>
            )
        }
        else if(ui == 'proportion'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.format_proportion(number), 'details':this.props.app_state.loc['400']/* 'proportion' */, 'size':'l'})}
                </div>
            )
        }
        else if(ui == 'time'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.get_time_diff(number), 'details':this.props.app_state.loc['401']/* 'duration' */, 'size':'l'})}
                </div>
            )
        }
        else if(ui == 'tag'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.get_tag_selected_item(title, number), 'details':this.props.app_state.loc['402']/* 'value: ' */+number, 'size':'l'})}
                </div>
            )
        }
        else if(ui == 'id'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':number, 'details':this.props.app_state.loc['403']/* 'target ID' */, 'size':'l'})}
                </div>
            )
        }
    }

    get_tag_selected_item(title, number){
        var obj = {'Auto Wait':{0:'no', 1:'yes'}, 'Moderator Modify Privelage':{1:'modifiable', 0:'non-modifiable'}, 'Unlimited Extend Contract Time':{1:'enabled', 0:'disabled'}, 'Bounty Limit Type':{0:'relative', 1:'absolute'}, 'Force Exit Enabled':{1:'enabled', 0:'disabled'}, 'Halving type':{0:'fixed', 1:'spread'}, 'Block Limit Sensitivity':{1:'1', 2:'2', 3:'3', 4:'4', 5:'5'}}

        obj[this.props.app_state.loc['73']]/* 'Auto Wait' */ = {0:'no', 1:'yes'}
        obj[this.props.app_state.loc['75']]/* 'Moderator Modify Privelage' */ = {1:'modifiable', 0:'non-modifiable'} 
        obj[this.props.app_state.loc['76']]/* 'Unlimited Extend Contract Time' */ = {1:'enabled', 0:'disabled'} 
        obj[this.props.app_state.loc['78']]/* 'Bounty Limit Type' */ = {0:'relative', 1:'absolute'}
        obj[this.props.app_state.loc['79']]/* 'Force Exit Enabled' */ = {1:'enabled', 0:'disabled'} 
        obj[this.props.app_state.loc['336']]/* 'Halving type' */ = {0:'fixed', 1:'spread'} 
        obj[this.props.app_state.loc['341']]/* 'Block Limit Sensitivity' */ = {1:'1', 2:'2', 3:'3', 4:'4', 5:'5'}

        return obj[title][number]
    }


    when_added_modify_item_clicked(item){
        var cloned_array = this.state.reconfig_values.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({reconfig_values: cloned_array})
        // this.props.notify('reconfig action removed!', 600)
    }








    render_prices_picker(){
        return(
            <div>
                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['438j']/* 'Edit Reconfig Prices' */, 'details':this.props.app_state.loc['438k']/* 'Change the prices of your target reconfig object.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_current_subscription_fees()}
                <div style={{height:10}}/>

                {this.render_subscription_picker_amount()}
            </div>
        )
    }


    render_current_subscription_fees(){
        if(this.state.modify_target_data != null){
            var modify_target_type = this.state.modify_target_data['type']

            var o = {30/* 30(contract_obj_id) */:[2, 3], 33/* 33(subscription_object) */:[2,3], 31/* 31(token_exchange) */:[3,4]}
            var position_array = o[modify_target_type]
            
            if(position_array != null){
                var items = this.get_my_current_subscription_fees()
                return(
                    <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                        <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                            {items.map((item, index) => (
                                <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_subscription_price_clicked(item, index)}>
                                    {this.render_subscription_price_item(item, index)}
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }
        }
        
    }

    get_my_current_subscription_fees(){
        var o = {30/* 30(contract_obj_id) */:[2, 3], 33/* 33(subscription_object) */:[2,3], 31/* 31(token_exchange) */:[3,4]}
        var modify_target_type = this.state.modify_target_data['type']
        var subscription_contract_token = this.state.modify_target_data

        var position_array = o[modify_target_type]
        var price_exchanges = subscription_contract_token['data'][position_array[0]]
        var price_amounts = subscription_contract_token['data'][position_array[1]]
        var fees_objects = []

        for(var i=0; i<price_exchanges.length; i++){
            fees_objects.push({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+price_exchanges[i]], 'details':this.format_account_balance_figure(price_amounts[i])+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[price_exchanges[i]], 'subtitle':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[price_exchanges[i]], 'pos': [position_array[1], i], 'size':'s'})
        }

        return fees_objects
    }


    render_subscription_price_item(item, index){
        if(this.state.selected_subscription_price_pos == index){
            return(
                <div>
                    {this.render_detail_item('3', item)}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', item)}
                </div>
            )
        }
    }

    when_subscription_price_clicked(item, index){
        if(this.state.selected_subscription_price_pos == index){
            this.setState({selected_subscription_price: null, selected_subscription_price_pos: null});
        }else{
            this.setState({selected_subscription_price: item, selected_subscription_price_pos: index})
        }
    }

    render_subscription_picker_amount(){
        if(this.state.selected_subscription_price != null){
            var item = this.state.selected_subscription_price
            var token_price = item['title']
            var token_name = item['subtitle']
            return(
                <div>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px'}} onClick={() => this.props.view_number({'title':token_price, 'number':this.state.new_price_number, 'relativepower':token_name})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':token_price, 'subtitle':this.format_power_figure(this.state.new_price_number), 'barwidth':this.calculate_bar_width(this.state.new_price_number), 'number':this.format_account_balance_figure(this.state.new_price_number), 'barcolor':'', 'relativepower':token_name, })}
                    </div>
                    <div style={{height:10}}/>

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_new_price_changed.bind(this)} theme={this.props.theme} power_limit={63}/>

                    <div style={{height:20}}/>
                    <div style={{'padding': '5px'}} onClick={()=>this.add_price_change_item()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['846']/* 'Add Change' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }


    when_new_price_changed(amount){
        this.setState({new_price_number: amount})
    }


    add_price_change_item(){
        var item = this.state.selected_subscription_price
        var token_price = item['title']
        var position = item['pos']

        var modify_target_type = this.state.modify_target_data['type']
        var subscription_contract_token = this.state.modify_target_data
        if(modify_target_type == 30/* 30(contract_obj_id) */){
            if(position[1] == 0){
                this.props.notify(this.props.app_state.loc['108c']/* 'You cant change the first price-value of the entry fees used' */, 6600)
                return;
            }
        }
        else if(modify_target_type == 33/* 33(subscription_object) */){
            var subscription_type = subscription_contract_token['data'][1][2]
            if(subscription_type == 1){
                this.props.notify(this.props.app_state.loc['861e']/* 'You cant modify a subscription price if its cancellable.' */, 6600)
                return;
            }
        }
        else if(modify_target_type == 31/* 31(token_exchange) */){
            var token_type = subscription_contract_token['data'][0][2]
            if(token_type == 0){
                this.props.notify(this.props.app_state.loc['1017c']/* 'You cant modify an exchange price if its cancellable.' */, 6600)
                return;
            }
        }
        
        var number = this.state.new_price_number;
        var reconfig_vaules_clone = this.state.reconfig_values.slice()

        reconfig_vaules_clone.push({'value':number, 'pos':position, 'title':token_price, 'type':'number'})
        this.setState({reconfig_values: reconfig_vaules_clone, new_price_number:0})
        this.props.notify(this.props.app_state.loc['850']/* 'reconfig action added!' */, 1600)
    }








    render_exchange_transfer_ui(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.load_exchange_transfer_config_ui()}
                    {this.load_transfer_actions()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.load_exchange_transfer_config_ui()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.load_transfer_actions()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.load_exchange_transfer_config_ui()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.load_transfer_actions()}
                    </div>
                </div>
                
            )
        }
    }

    load_exchange_transfer_config_ui(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['404']/* 'Target Exchange' */, 'details':this.props.app_state.loc['405']/* 'Set the exchange id you wish to run the exchange transfer from' */, 'size':'l'})}
                <div style={{height:20}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['381']/* 'Target ID...' */} when_text_input_field_changed={this.when_exchange_transfer_target_text_input_field_changed.bind(this)} text={this.state.exchange_transfer_target} theme={this.props.theme}/>

                {/* {this.load_account_suggestions('exchange_transfer_target')} */}
                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['406']/* 'Target Receiver' */, 'details':this.props.app_state.loc['413']/* 'Set the account set to receive the token amounts' */, 'size':'l'})}
                <div style={{height:20}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['407']/* 'Target Receiver...' */} when_text_input_field_changed={this.when_exchange_transfer_receiver_text_input_field_changed.bind(this)} text={this.state.exchange_transfer_receiver} theme={this.props.theme}/>

                {this.load_account_suggestions('exchange_transfer_receiver')}
                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['408']/* 'Token Targets' */, 'details':this.props.app_state.loc['409']/* 'Set the targeted token ID your transfering from the exchange' */, 'size':'l'})}
                <div style={{height:20}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['410']/* 'Token Target ID...' */} when_text_input_field_changed={this.when_token_target_text_input_field_changed.bind(this)} text={this.state.token_target} theme={this.props.theme}/>

                {this.load_account_suggestions('token_target')}
                {this.render_detail_item('0')}


                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px'}} onClick={() => this.props.view_number({'title':this.props.app_state.loc['411']/* 'Targeted Amount' */, 'number':this.state.exchange_transfer_amount, 'relativepower':this.props.app_state.loc['391']/* 'units' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['411']/* 'Targeted Amount' */, 'subtitle':this.format_power_figure(this.state.exchange_transfer_amount), 'barwidth':this.calculate_bar_width(this.state.exchange_transfer_amount), 'number':this.format_account_balance_figure(this.state.exchange_transfer_amount), 'barcolor':'', 'relativepower':this.props.app_state.loc['391']/* 'units' */, })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_exchange_transfer_amount_changed.bind(this)} theme={this.props.theme} power_limit={63}/>

                <div style={{height:20}}/>
                <div style={{'padding': '5px'}} onClick={()=>this.add_exchange_transfer_item()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['412']/* 'Add Transfer Action' */, 'action':''})}
                </div>
            </div>
        )
    }

    when_exchange_transfer_target_text_input_field_changed(text){
        this.setState({exchange_transfer_target: text})
    }

    when_exchange_transfer_amount_changed(amount){
        this.setState({exchange_transfer_amount:amount})
    }

    when_exchange_transfer_receiver_text_input_field_changed(text){
        this.setState({exchange_transfer_receiver: text})
    }

    when_token_target_text_input_field_changed(text){
        this.setState({token_target: text})
    }

    async get_typed_alias_id(alias){
        if(!isNaN(alias)){
            return alias
        }
        await this.props.get_account_id_from_alias(alias)
        var id = (this.props.app_state.alias_owners[this.props.app_state.selected_e5][alias] == null ? 
            alias : this.props.app_state.alias_owners[this.props.app_state.selected_e5][alias])

        return id
    }


    async add_exchange_transfer_item(){
        var target_exchange = this.get_token_id_from_symbol(this.state.exchange_transfer_target.trim())
        var target_amount = this.state.exchange_transfer_amount
        var target_receiver = await this.get_typed_alias_id(this.state.exchange_transfer_receiver.trim())
        var targeted_token = this.get_token_id_from_symbol(this.state.token_target.trim())

        if(isNaN(target_exchange)  || parseInt(target_exchange) < 0 || target_exchange == '' || !this.does_exchange_exist(target_exchange)){
            this.props.notify(this.props.app_state.loc['414']/* 'please put a valid exchange id' */, 3600)
        }
        else if(isNaN(target_receiver) || parseInt(target_receiver) < 0 || target_receiver == ''){
            this.props.notify(this.props.app_state.loc['415']/* 'please put a valid receiver id' */, 3600)
        }
        else if(isNaN(targeted_token) || parseInt(targeted_token) < 0 || targeted_token == '' || !this.does_exchange_exist(targeted_token)){
            this.props.notify(this.props.app_state.loc['416']/* 'please put a valid token id' */, 3600)
        }
        else if(target_amount == 0){
            this.props.notify(this.props.app_state.loc['417']/* 'please put a valid amount' */, 3600)
        }
        else{
            var exchange_transfer_values_clone = this.state.exchange_transfer_values.slice()
            var tx = {'exchange':target_exchange, 'amount':target_amount, 'receiver':target_receiver, 'token':targeted_token}
            exchange_transfer_values_clone.push(tx)
            this.setState({exchange_transfer_values: exchange_transfer_values_clone, exchange_transfer_target:'', exchange_transfer_amount:0, exchange_transfer_receiver:'', token_target:''})

            this.props.notify(this.props.app_state.loc['418']/* 'transfer action added' */, 600)
        }
    }


    load_transfer_actions(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.exchange_transfer_values)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
                                <div style={{height:140, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={this.props.app_state.theme['letter']} style={{height:40 ,width:'auto'}} />
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
                                    action: () =>this.when_transfer_action_value_clicked(item)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '5px'}}>
                                            <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.selected_e5+item['token']]+':'+item['token'], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['token']]})}>
                                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.selected_e5+item['token']]+':'+item['token'], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['token']], })}
                                            </div>
                                            <div style={{height:5}}/>
                                            {this.render_detail_item('3', {'title':this.props.app_state.loc['419']+item['receiver'], 'details':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.selected_e5+item['exchange']]+':'+item['exchange'], 'size':'s'})}
                                            <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '5px 20px 5px 20px'}}/>
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
        // this.props.notify('transfer action removed!', 600)
    }








    render_bounty_data_ui(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_bounty_amount_picker_ui()}
                    {this.render_bounty_amounts()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_bounty_amount_picker_ui()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_bounty_amounts()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_bounty_amount_picker_ui()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_bounty_amounts()}
                    </div>
                </div>
                
            )
        }
    }

    render_bounty_amount_picker_ui(){
        var minimum_spend_bounty_amount = this.state.contract_item['data'][1][10/* <10>default_minimum_spend_vote_bounty_amount */]
        var minimum_end_bounty_amount = this.state.contract_item['data'][1][4/* <4>default_minimum_end_vote_bounty_amount */]

        // var end_token_balance = this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][3]['balance']
        var end_token_balance = this.props.calculate_actual_balance(this.props.app_state.selected_e5, 3)
        // var spend_token_balance = this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][5]['balance']
        var spend_token_balance = this.props.calculate_actual_balance(this.props.app_state.selected_e5, 5)
        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'13px', 'text':this.props.app_state.loc['420']/* 'The first bounty exchange should be the End or Spend Exchange' */})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['421']/* 'Minimum Spend Bounty Amount' */, 'subtitle':this.format_power_figure(minimum_spend_bounty_amount), 'barwidth':this.calculate_bar_width(minimum_spend_bounty_amount), 'number':this.format_account_balance_figure(minimum_spend_bounty_amount), 'barcolor':'', 'relativepower':this.props.app_state.loc['3079']/* SPEND */, })}
                </div>
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['422']/* 'Minimum End Bounty Amount' */, 'subtitle':this.format_power_figure(minimum_end_bounty_amount), 'barwidth':this.calculate_bar_width(minimum_end_bounty_amount), 'number':this.format_account_balance_figure(minimum_end_bounty_amount), 'barcolor':'', 'relativepower':this.props.app_state.loc['3078']/* END */, })}
                </div>

                <div style={{height:20}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['423']/* 'Spend Balance' */, 'number':spend_token_balance, 'relativepower':this.props.app_state.loc['3079']/* SPEND */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['423']/* 'Spend Balance' */, 'subtitle':this.format_power_figure(spend_token_balance), 'barwidth':this.calculate_bar_width(spend_token_balance), 'number':this.format_account_balance_figure(spend_token_balance), 'barcolor':'', 'relativepower':this.props.app_state.loc['3079']/* SPEND */, })}
                </div>
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px'}} onClick={() => this.props.view_number({'title':this.props.app_state.loc['424']/* 'End Balance' */, 'number':end_token_balance, 'relativepower':this.props.app_state.loc['3078']/* END */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['424']/* 'End Balance' */, 'subtitle':this.format_power_figure(end_token_balance), 'barwidth':this.calculate_bar_width(end_token_balance), 'number':this.format_account_balance_figure(end_token_balance), 'barcolor':'', 'relativepower':this.props.app_state.loc['3078']/* END */, })}
                </div>

                {this.render_detail_item('0')}

                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['381']/* 'Target ID...' */} when_text_input_field_changed={this.when_bounty_exchange_target_text_input_field_changed.bind(this)} text={this.state.bounty_exchange_target} theme={this.props.theme}/>

                {this.load_account_suggestions('bounty_exchange_target')}
                {this.render_detail_item('0')}

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px'}} onClick={() => this.props.view_number({'title':this.props.app_state.loc['425']/* 'Targeted Amount' */, 'number':this.state.bounty_amount, 'relativepower':this.props.app_state.loc['391']/* 'units' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['425']/* 'Targeted Amount' */, 'subtitle':this.format_power_figure(this.state.bounty_amount), 'barwidth':this.calculate_bar_width(this.state.bounty_amount), 'number':this.format_account_balance_figure(this.state.bounty_amount), 'barcolor':'', 'relativepower':this.props.app_state.loc['391']/* 'units' */, })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_bounty_amount_changed.bind(this)} theme={this.props.theme} power_limit={63}/>

                <div style={{height:20}}/>
                <div style={{'padding': '5px'}} onClick={()=>this.add_bounty_item()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['426']/* 'Add Bounty' */, 'action':''})}
                </div>
            </div>
        )
    }

    when_bounty_exchange_target_text_input_field_changed(text){
        this.setState({bounty_exchange_target: text})
    }

    when_bounty_amount_changed(amount){
        this.setState({bounty_amount: amount})
    }

    add_bounty_item(){
        var target_exchange = this.get_token_id_from_symbol(this.state.bounty_exchange_target.trim())
        var target_amount = this.state.bounty_amount
        
        var target_exchange_data = this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][target_exchange]
        var default_depth = 0;
        if(target_exchange_data != null){
            target_exchange_data = target_exchange_data['ipfs']
            if(target_exchange_data != null){
                default_depth = target_exchange_data.default_depth == null ? 0 : target_exchange_data.default_depth
            }
        }

        if(isNaN(target_exchange) || parseInt(target_exchange) < 0 || target_exchange == '' || !this.does_exchange_exist(target_exchange)){
            this.props.notify(this.props.app_state.loc['388']/* 'please put a valid exchange id' */, 3600)
        }
        else if(default_depth != 0){
            this.props.notify(this.props.app_state.loc['2762']/* 'You cant use that exchange.' */, 3600)
        }
        else if(target_amount == 0){
            this.props.notify(this.props.app_state.loc['389']/* 'please put a valid amount' */, 3600)
        }
        else if(this.is_exchange_already_added(target_exchange)){
            this.props.notify(this.props.app_state.loc['427']/* 'You cant use the same exchange twice' */, 3600)
        }
        else{
            var bounty_values_clone = this.state.bounty_values.slice()
            var tx = {'exchange':target_exchange, 'amount':target_amount}
            bounty_values_clone.push(tx)

            this.setState({bounty_values: bounty_values_clone, bounty_exchange_target:'', bounty_amount:0})

            this.props.notify(this.props.app_state.loc['428']/* 'bounty amount added' */, 1600)
        }
    }

    is_exchange_already_added(exchange_id){
        if(this.get_item_in_array(exchange_id, this.state.bounty_values) == null){
            return false
        }
        return true
    }

    get_item_in_array(exchange_id, object_array){
        var object = object_array.find(x => x['exchange'] === exchange_id);
        return object
    }

    get_token_id_from_symbol(typed_search){
        if(!isNaN(typed_search)){
            return typed_search
        }
        var id = this.props.app_state.token_directory[this.props.app_state.selected_e5][typed_search.toUpperCase()] == null ? typed_search : this.props.app_state.token_directory[this.props.app_state.selected_e5][typed_search.toUpperCase()]

        return id
    }

    does_exchange_exist(exchange_id){
        if(this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][parseInt(exchange_id)] == null){
            return false
        }
        return true
    }


    render_bounty_amounts(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.bounty_values)

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
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.reverse().map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_bounty_value_clicked(item)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '5px'}}>
                                            <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.selected_e5+item['exchange']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['exchange']]})}>
                                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.selected_e5+item['exchange']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['exchange']], })}
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

    when_bounty_value_clicked(item){
        var cloned_array = this.state.bounty_values.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({bounty_values: cloned_array})
        // this.props.notify('bounty action removed!', 600)
    }











    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} when_add_text_button_tapped={this.when_add_text_button_tapped.bind(this)}/>
            </div>
        )

    }


    set_contract(contract){
        this.setState({contract_item: contract, e5: contract['e5']})
    }

    finish_creating_object(){
        var index_tags = this.state.entered_indexing_tags
        var title = this.state.entered_title_text
        var is_data_valid = this.check_if_sender_has_put_valid_data_for_proposal()
        var modify_target_id = this.state.modify_target_id

        if(index_tags.length == 0){
            this.props.notify(this.props.app_state.loc['430']/* 'add some tags first!' */, 4700)
        }
        else if(title == ''){
            this.props.notify(this.props.app_state.loc['431']/* 'add a title first!' */, 4700)
        }
        else if(title.length > this.props.app_state.title_size){
            this.props.notify(this.props.app_state.loc['432']/* 'that title is too long' */, 4700)
        }
        else if(!this.check_if_bounty_is_required()){
            this.props.notify(this.props.app_state.loc['433']/* 'You need to specify bounty for your new proposal' */, 5500)
        }
        else if(!this.check_if_sender_has_enough_balance_for_bounties()){
            this.props.notify(this.props.app_state.loc['434']/* 'One of your token balances is insufficient for the bounty amounts specified' */, 5900)
        }
        else if(!is_data_valid.is_valid){
            this.props.notify(is_data_valid.message, 5000)
        }
        else if(modify_target_id != '' && !this.is_valid_modify_target()){
            this.props.notify(this.props.app_state.loc['438l']/* 'The modify target youve set is invalid.' */, 5500)
        }
        else if(/!\[.*?\]\(.*?\)/.test(this.state.markdown) == true && this.props.can_sender_include_image_in_markdown() == false){
            this.props.notify(this.props.app_state.loc['2738au']/* 'You cant use media links in markdown right now.' */, 4000)
        }
        else{
            var me = this
            this.setState({content_channeling_setting: me.props.app_state.content_channeling,
                device_language_setting :me.props.app_state.device_language,
                device_country :me.props.app_state.device_country,
                e5 :me.props.app_state.selected_e5,})
            
            setTimeout(function() {
                me.props.when_add_new_proposal_to_stack(me.state)

                me.setState({selected: 0, id: makeid(8), type:me.props.app_state.loc['312']/* 'proposal' */,
                entered_tag_text: '',entered_indexing_tags:[],entered_title_text:'',

                new_proposal_title_tags_object:me.get_new_proposal_title_tags_object(), new_proposal_type_tags_object:me.get_new_proposal_type_tags_object(),
                reconfig_items_tags_object:me.get_reconfig_items_tags_object(),

                auto_wait_tags_object:me.get_auto_wait_tags_object(),
                can_modify_contract_as_moderator: me.get_can_modify_contract_as_moderator(),
                can_extend_enter_contract_at_any_time: me.get_can_extend_enter_contract_at_any_time(),
                bounty_limit_type: me.get_bounty_limit_type(),
                contract_force_exit_enabled: me.get_contract_force_exit_enabled(),
                new_token_halving_type_tags_object: me.get_new_token_halving_type_tags_object(),
                new_token_block_limit_sensitivity_tags_object: me.get_new_token_block_limit_sensitivity_tags_object(),

                page:0, proposal_expiry_time:Math.round(new Date().getTime()/1000), 
                proposal_submit_expiry_time:Math.round(new Date().getTime()/1000), 
                modify_target_id:'', modify_target_data:null, spend_target_input_text:'', spend_token_input_text:'', 
                spend_amount:0, spend_actions:[], 
                
                reconfig_number:0, reconfig_proportion:0, reconfig_duration:0, reconfig_target_id:'',
                reconfig_values:[],

                exchange_transfer_target:'', exchange_transfer_amount:0, exchange_transfer_values:[], exchange_transfer_receiver:'', token_target:'',

                entered_text_objects:[], entered_image_objects:[],
                entered_objects:[], entered_text:'',

                typed_link_text:'', link_search_results:[], added_links:[], 
                edit_text_item_pos:-1,

                bounty_exchange_target:'', bounty_amount:0, bounty_values:[], entered_pdf_objects:[], markdown:''})

                me.props.notify(me.props.app_state.loc['18']/* 'transaction added to stack' */, 700);
            }, (1 * 1000));
        }
    }

    is_valid_modify_target(){
        if(this.state.modify_target_data['type'] == 30/* 30(contract_obj_id) */ || this.state.modify_target_data['type'] == 33/* 33(subscription_object) */ || this.state.modify_target_data['type'] == 31/* 31(token_exchange) */){
            return true
        }
        return false
    }


    reset_state(){
        this.setState({
            selected: 0, id: makeid(8)
        })
    }

    check_if_sender_has_enough_balance_for_bounties(){
        var has_enough = true
        var bounty_values = this.state.bounty_values
        for(var i=0; i<bounty_values.length; i++){
            var bounty_item_exchange = bounty_values[i]['exchange']
            var bounty_item_amount = bounty_values[i]['amount']
            // var my_balance = this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][bounty_item_exchange]['balance']
            var my_balance = this.props.calculate_actual_balance(this.props.app_state.selected_e5, bounty_item_exchange)
            if(my_balance < bounty_item_amount){
                has_enough = false
            }
        }
        return has_enough
    }

    check_if_sender_has_put_valid_data_for_proposal(){
        var is_valid = true
        var message = ''
        var proposal_submit_expiry_time_difference = this.state.contract_item['data'][1][36]
        var set_submit_timestamp = this.state.proposal_submit_expiry_time
        var set_timestamp = this.state.proposal_expiry_time
        var now_in_sec = Date.now()/1000
        
        if(set_submit_timestamp <= now_in_sec){
            is_valid = false
            message = this.props.app_state.loc['435']/* 'The proposal submit expiry time youve set cant be before now' */
        }
        else if(set_submit_timestamp - set_timestamp > proposal_submit_expiry_time_difference && proposal_submit_expiry_time_difference != 0){
            is_valid = false
            message = this.props.app_state.loc['436']/* 'The proposal submit expiry time youve set is less than time difference required by the contract' */
        }

        var proposal_expiry_time = this.state.contract_item['data'][1][5]
        var set_timestamp2 = this.state.proposal_expiry_time
        if(set_timestamp2 < parseInt(now_in_sec)+parseInt(proposal_expiry_time)){
            is_valid = false;
            message = this.props.app_state.loc['437']/* 'That proposal expiry time youve set is less than the minimum required by the contract' */
        }
        else if(set_timestamp2 <= now_in_sec){
            is_valid = false;
            message = this.props.app_state.loc['438']/* 'The proposal expiry time youve set cant be before now' */
        }

        return {is_valid: is_valid, message: message}
    }


    check_if_bounty_is_required(){
        var has_correctly_been_specified = true
        var minimum_spend_bounty_amount = this.state.contract_item['data'][1][10/* <10>default_minimum_spend_vote_bounty_amount */]
        var minimum_end_bounty_amount = this.state.contract_item['data'][1][4/* <4>default_minimum_end_vote_bounty_amount */]
        if(minimum_spend_bounty_amount != 0 || minimum_end_bounty_amount != 0){
            if(this.state.bounty_values.length == 0){
                has_correctly_been_specified = false
            }
        }
        return has_correctly_been_specified
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
    




}




export default NewProposalPage;