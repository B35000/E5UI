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
import NumberPicker from './../components/number_picker';
import LocationViewer from './../components/location_viewer';

import { from } from "@iotexproject/iotex-address-ts";
import EndImg from './../assets/end_token_icon.png';
import SpendImg from './../assets/spend_token_icon.png';
import ReactJson from 'react-json-view'

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

var bigInt = require("big-integer");
const { toBech32, fromBech32,} = require('@harmony-js/crypto');
const { getDomain } = require("tldjs");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function start_and_end(str) {
  if (str.length > 30) {
    return str.substr(0, 20) + '...' + str.substr(str.length-10, str.length);
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

function make_number_id(length) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return parseInt(result);
}

function make_number_id_str(length) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return (result);
}

class DialogPage extends Component {
    
    state = {
        selected: 0,
        data:null,
        id:'',
        ignored_bills:[],
        searched_user:'',
        ignored_nitro_files_items:[],
        made_id:makeid(8),
        selected_e5_renewal_items:[this.props.app_state.selected_e5],

        get_keyword_target_type_object:this.get_keyword_target_type_object(), keyword_text:'', staged_keywords_for_new_note:[], moderator_note_message:'', moderator_note_id:'', visibility_end_time: ((Date.now()/1000) + 60*60*24), entered_file_objects: [], entered_video_object_dimensions: {}, ecid_encryption_passwords:{},

        export_start_time:0, following_search_text:'', 
        
        new_vote_tags_object: this.get_new_vote_tags_object(), ignore_vote_wait_proposals:[],
        vote_tx_bundle_size:10, get_collect_bounties_tags_object: this.get_collect_bounties_tags_object(),

        songs_to_hide_while_showing:[], videos_to_hide_while_showing:[], selected_pins:[],
        get_show_job_after_broadcasted_object:this.get_show_job_after_broadcasted_object(),

        new_call_recepients:[], call_receiver_account_id:'', call_password:'', call_identifier:'',enter_call_password:'', get_record_call_tags_object:this.get_record_call_tags_object(), new_voice_call_number_id: make_number_id_str(15),

        credit_spend_amount:0, typed_transaction_note:'', prepurchase_request_recipient:'', dm_recipient:''
    };




    get_keyword_target_type_object(type){
        const set_type = (type != null && type == 'all') ? 1 : 2
        return{
           'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', this.props.app_state.loc['1593ij']/* 'all-words' */, this.props.app_state.loc['1593ik']/* 'one-word' */], [set_type]
            ], 
        }
    }

    get_new_vote_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['800']/* 'wait' */, this.props.app_state.loc['801']/* 'yes' */, this.props.app_state.loc['802']/* 'no' */], [1]
            ],
        };
    }

    get_collect_bounties_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['3055fk']/* 'collect' */], [0]
            ],
        };
    }

    get_show_job_after_broadcasted_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e', this.props.app_state.loc['284be']/* 'show' */], [0]
            ],
        };
    }

    get_record_call_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['3091bn']/* 'record' */], [0]
            ],
        };
    }







    set_data(data, id){
        if(id == 'create_moderator_note' && Object.keys(data).length > 0){
            const item = data['item']
            const moderator_note_message = item['message']
            const staged_keywords_for_new_note = item['keywords']
            const type_object = this.get_keyword_target_type_object(item['type'])
            const note_id = item['id']
            const note_visibility_end_time = item['visibility_end_time']
            
            this.setState({
                data: data, id: id, 
                staged_keywords_for_new_note: staged_keywords_for_new_note, 
                moderator_note_message: moderator_note_message, 
                moderator_note_id: note_id, 
                get_keyword_target_type_object: type_object, 
                visibility_end_time: note_visibility_end_time,
                entered_file_objects: item['entered_file_objects'], 
                entered_video_object_dimensions: item['entered_video_object_dimensions'], 
                ecid_encryption_passwords: item['ecid_encryption_passwords'],
            })
        }else{
            this.setState({data: data, id: id})
            
            if(id == 'hide_audiopost_confirmation'){
                this.auto_select_tracks_already_hidden(data)
            }
            else if(id == 'hide_videopost_confirmation'){
                this.auto_select_videos_already_hidden(data)
            }
            else if(id == 'pick_from_my_locations'){
                this.setState({selected_pins: data['pins']})
            }
            else if(id == 'start_voice_call'){
                this.setState({new_voice_call_number_id: make_number_id_str(15)})
            }
        }
    }







    render(){
        return(
            <div style={{'padding':'10px 15px 0px 15px'}}>
                {this.render_everything()}
            </div>
        )
    }


    render_everything(){
        var option = this.state.id
        if(option == 'invalid_ether_amount_dialog_box'){
            return(
                <div>
                    {this.render_issue_with_run_dialog()}
                </div>
            )
        }
        else if(option == 'confirm_clear_stack_dialog'){
            return(
                <div>
                    {this.render_confirm_clear_dialog()}
                </div>
            )
        }
        else if(option == 'confirm_send_ether_dialog'){
            return(
                <div>
                    {this.render_confirm_send_ether_dialog()}
                </div>
            )
        }
        else if(option == 'confirm_delete_dialog_box'){
            return(
                <div>
                    {this.render_confirm_delete_transaction_dialog()}
                </div>
            )
        }
        else if(option == 'confirm_withdraw_ether'){
            return(
                <div>
                    {this.render_confirm_withdraw_ether_dialog()}
                </div>
            )
        }
        else if(option == 'confirm_send_coin_dialog'){
            return(
                <div>
                    {this.render_confirm_send_coin_dialog()}
                </div>
            )
        }
        else if(option == 'song_options'){
            return(
                <div>
                    {this.render_song_options()}
                </div>
            )
        }
        else if(option == 'confirm_upload_file_to_arweave'){
            return(
                <div>
                    {this.render_confirm_arweave_upload()}
                </div>
            )
        }
        else if(option == 'view_uploaded_file'){
            return(
                <div>
                    {this.render_view_uploaded_file()}
                </div>
            )
        }
        else if(option == 'view_item_purchase'){
            return(
                <div>
                    {this.render_view_item_purchase()}
                </div>
            )
        }
        else if(option == 'view_incoming_receipts'){
            return(
                <div>
                    {this.render_view_incoming_transactions()}
                </div>
            )
        }
        else if(option == 'view_incoming_transactions'){
            return(
                <div>
                    {this.render_view_event_objects()}
                </div>
            )
        }
        else if(option == 'view_e5_link'){
            return(
                <div>
                    {this.render_view_e5_link_objects()}
                </div>
            )
        }
        else if(option == 'account_options'){
            return(
                <div>
                    {this.render_account_options_data()}
                </div>
            )
        }
        else if(option == 'confirm_pay_bill'){
            return(
                <div>
                    {this.render_cofirm_pay_bill()}
                </div>
            )
        }
        else if(option == 'invalid_stack_size_dialog_box'){
            return(
                <div>
                    {this.render_invalid_stack_size()}
                </div>
            )
        }
        else if(option == 'file_type_picker'){
            return(
                <div>
                    {this.render_file_type_picker()}
                </div>
            )
        }
        else if(option == 'home_page_view_options'){
            return(
                <div>
                    {this.render_home_page_view_options()}
                </div>
            )
        }
        else if(option == 'view_json_example'){
            return(
                <div>
                    {this.render_poll_json_example()}
                </div>
            )
        }
        else if(option == 'poll_results'){
            return(
                <div>
                    {this.render_poll_results()}
                </div>
            )
        }
        else if(option == 'channel_payout_results'){
            return(
                <div>
                    {this.render_creator_payout_info()}
                </div>
            )
        }
        else if(option == 'confirm_upload_nitro_files'){
            return(
                <div>
                    {this.render_confirm_upload_nitro_files()}
                </div>
            )
        }
        else if(option == 'renew_nitro_uploads'){
            return(
                <div>
                    {this.render_renew_nitro_upload_ui()}
                </div>
            )
        }
        else if(option == 'view_bid_item'){
            return(
                <div>
                    {this.render_bid_for_item_ui()}
                </div>
            )
        }
        else if(option == 'manual_transaction_broadcast'){
            return(
                <div>
                    {this.render_manual_transaction_broadcast_ui()}
                </div>
            )
        }
        else if(option == 'confirm_new_wallet'){
            return(
                <div>
                    {this.render_confirm_new_wallet_ui()}
                </div>
            )
        }
        else if(option == 'create_moderator_note'){
            return(
                <div>
                    {this.render_create_edit_moderator_note_ui()}
                </div>
            )
        }
        else if(option == 'export_direct_purchases'){
            return(
                <div>
                    {this.render_export_direct_purchases_ui()}
                </div>
            )
        }
        else if(option == 'view_access_logs'){
            return(
                <div>
                    {this.render_access_logs_ui()}
                </div>
            )
        }
        else if(option == 'view_error_logs'){
            return(
                <div>
                    {this.render_error_logs_ui()}
                </div>
            )
        }
        else if(option == 'view_link_option'){
            return(
                <div>
                    {this.render_view_link_options_ui()}
                </div>
            )
        }
        else if(option == 'vote_wait_bottomsheet'){
            return(
                <div>
                    {this.render_vote_wait_options_ui()}
                </div>
            )
        }
        else if(option == 'hide_audiopost_confirmation'){
            return(
                <div>
                    {this.render_hide_audiopost_confirmation_ui()}
                </div>
            )
        }
        else if(option == 'hide_videopost_confirmation'){
            return(
                <div>
                    {this.render_hide_videopost_confirmation_ui()}
                </div>
            )
        }
        else if(option == 'pick_from_my_locations'){
            return(
                <div>
                    {this.render_select_my_locations_ui()}
                </div>
            )
        }
        else if(option == 'transfer_alias_ui'){
            return(
                <div>
                    {this.render_transfer_alias_ui()}
                </div>
            )
        }
        else if(option == 'confirm_emit_new_object'){
            return(
                <div>
                    {this.render_confirm_emit_new_object_ui()}
                </div>
            )
        }
        else if(option == 'view_job_application_details'){
            return(
                <div>
                    {this.render_view_job_application_ui()}
                </div>
            )
        }
        else if(option == 'view_bag_application_details'){
            return(
                <div>
                    {this.render_view_bag_application_ui()}
                </div>
            )
        }
        else if(option == 'confirm_respond_to_signature_request'){
            return(
                <div>
                    {this.render_signature_request_ui()}
                </div>
            )
        }
        else if(option == 'request_cookies_permission'){
            return(
                <div>
                    {this.render_cookies_permission_request_ui()}
                </div>
            )
        }
        else if(option == 'start_voice_call'){
            return(
                <div>
                    {this.render_start_voice_call_ui()}
                </div>
            )
        }
        else if(option == 'enter_voice_call'){
            return(
                <div>
                    {this.render_enter_voice_call_ui()}
                </div>
            )
        }
        else if(option == 'confirm_leave_call'){
            return(
                <div>
                    {this.render_confirm_leave_call_ui()}
                </div>
            )
        }
        else if(option == 'spend_prepurchase_credits'){
            return(
                <div>
                    {this.render_spend_prepurchase_credits_ui()}
                </div>
            )
        }
        else if(option == 'export_prepurchase_transactions'){
            return(
                <div>
                    {this.render_export_prepurchase_transactions_ui()}
                </div>
            )
        }
        else if(option == 'view_ordered_variant_details'){
            return(
                <div>
                    {this.render_view_ordered_variant_details_ui()}
                </div>
            )
        }
        else if(option == 'view_coin_ether_request'){
            return(
                <div>
                    {this.render_received_ether_coin_request_details_ui()}
                </div>
            )
        }
        else if(option == 'prompt_spend_prepurchase_credits'){
            return(
                <div>
                    {this.render_promopt_spend_prepurchase_credits_ui()}
                </div>
            )
        }
        else if(option == 'view_pre_purchase_request'){
            return(
                <div>
                    {this.render_view_request_spend_prepurchase_credits_ui()}
                </div>
            )
        }
        else if(option == 'new_direct_message_chat'){
            return(
                <div>
                    {this.render_new_direct_message_chat_ui()}
                </div>
            )
        }
    }





    render_issue_with_run_dialog(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_issue_with_run()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_issue_with_run()}
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
                        {this.render_issue_with_run()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_issue_with_run(){
        var run_gas_limit = this.state.data['run_gas_limit']
        var run_gas_price = this.props.app_state.gas_price[this.props.app_state.selected_e5]
        var required_ether = (run_gas_limit * run_gas_price);
        if(this.state.data != null){
            return(
                <div style={{}}>
                    <h4 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>{this.props.app_state.loc['1522']/* Issue With Run */}</h4>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1523']/* 'Theres an issue with your Balance' */, 'details':this.props.app_state.loc['1524']/* 'You need more ether to run your transactions' */, 'size':'s'})}
                    <div style={{height: 10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">{this.props.app_state.loc['1525']/* Wallet Balance in Ether and Wei */}</p>
                        {this.render_detail_item('2', this.get_balance_amount_in_wei())}
                        {this.render_detail_item('2', this.get_balance_amount_in_ether())}
                    </div>

                    <div style={{height: 10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">{this.props.app_state.loc['1526']/* Required Balance in Ether and Wei */}</p>
                        
                        {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(required_ether), 'number':this.format_account_balance_figure(required_ether), 'barcolor':'#606060', 'relativepower':'wei', })}

                        {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(required_ether/10**18), 'number':required_ether/10**18, 'barcolor':'#606060', 'relativepower':'ether', })}
                    </div>

                </div>
            )
        }
    }

    get_balance_amount_in_wei(){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(this.props.app_state.account_balance[this.props.app_state.selected_e5]),
            'number':this.format_account_balance_figure(this.props.app_state.account_balance[this.props.app_state.selected_e5]),
            'barcolor':'#606060',
            'relativepower':'wei',
        }
    }

    get_balance_amount_in_ether(){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(this.props.app_state.account_balance[this.props.app_state.selected_e5]/10**18),
            'number':this.props.app_state.account_balance[this.props.app_state.selected_e5]/10**18,
            'barcolor':'#606060',
            'relativepower':'ether',
        }
    }






    render_confirm_clear_dialog(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_confirm_clear()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_confirm_clear()}
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
                        {this.render_confirm_clear()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(2)}
                    </div>
                </div>
                
            )
        }
    }

    render_confirm_clear(){
        return(
            <div style={{}}>
                <h4 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>{this.props.app_state.loc['1443']/* Confirm Action */}</h4>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1445']/* 'Confirm Clear Stack Action' */, 'details':'This action cannot be undone.', 'size':'l'})}

                <div style={{height: 10}}/>

                <div style={{'padding': '5px'}} onClick={()=> this.props.clear_stack()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1444']/* 'Confirm' */, 'action':''})}
                </div>
            </div>
        )
    }




    render_confirm_send_ether_dialog(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_confirm_send_ether()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_confirm_send_ether()}
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
                        {this.render_confirm_send_ether()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_confirm_send_ether(){
        var picked_wei_amount = this.state.data['picked_wei_amount'] //this.state.picked_wei_amount
        var e5 = this.state.data['e5'] //this.state.ether['e5']
        var recipient_address = this.state.data['recipient_address']//this.state.recipient_address
        return(
            <div style={{}}>
                <h3 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>{this.props.app_state.loc['1407f']}{/* Confirmation */}</h3>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1393']/* 'Send Ether Confirmation' */, 'details':this.props.app_state.loc['1394']/* 'Confirm that you want to send Ether to the targeted recipient' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">{this.props.app_state.loc['1395']/* Picked Amount In Ether and Wei */}</p>
                    {this.render_detail_item('2', this.get_picked_amount_in_wei(picked_wei_amount))}
                    {this.render_detail_item('2', this.get_picked_amount_in_ether(picked_wei_amount))}
                </div>
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1396']/* 'Sender Wallet Address' */, 'details':this.get_account_address(e5), 'size':'l'})}
                <div style={{height: 10}}/>
                
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1397']/* 'Receiver Wallet Address' */, 'details':recipient_address, 'size':'l'})}

                <div style={{height: 10}}/>
                
                <div style={{'padding': '5px'}} onClick={()=>this.send_ether_to_target()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1398']/* 'Send Ether' */, 'action':''})}
                </div>
            </div>
        )
    }

    get_picked_amount_in_wei(picked_wei_amount){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(picked_wei_amount),
            'number':this.format_account_balance_figure(picked_wei_amount),
            'barcolor':'#606060',
            'relativepower':'wei',
        }
    }

    get_picked_amount_in_ether(picked_wei_amount){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(picked_wei_amount/10**18),
            'number':(picked_wei_amount/10**18),
            'barcolor':'#606060',
            'relativepower':'ether',
        }
    }

    get_account_address(e5){
        if(this.props.app_state.accounts[e5] != null){
            return this.format_address(this.props.app_state.accounts[e5].address, e5);
        }
    }

    format_address(address, e5){
        if(e5 == 'E45'){
            return toBech32(address)
        }
        else if(e5 == 'E115'){
            return this.replace_0x_with_xdc(address)
        }
        // else if(e5 == 'E175'){
        //     return ethToEvmos(address)
        // }
        else if(e5 == 'E425'){
            return this.convert_to_iotx(address)
        }
        return address
    }

    convert_to_iotx(address){
        const addr = from(address.toString());
        return addr.string();
    }

    replace_0x_with_xdc(address){
        return 'xdc'+address.toString().slice(2)
    }

    send_ether_to_target(){
        this.props.send_ether_to_target_confirmation()
    }






    render_confirm_delete_transaction_dialog(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_confirm_delete_transaction()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_confirm_delete_transaction()}
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
                        {this.render_confirm_delete_transaction()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(2)}
                    </div>
                </div>
                
            )
        }
    }

    render_confirm_delete_transaction(){
        return(
            <div style={{}}>
                <h5 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color'], 'font-family': this.props.app_state.font}}>{this.props.app_state.loc['1786']/* Confirm Delete Action */}</h5>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1787']/* 'Are you sure?' */, 'details':'You cannot undo this action', 'size':'s'})}
                <div style={{height:20}}/>

                <div onClick={()=> this.props.open_delete_action()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1785']/* 'Delete' */, 'action':''},)}
                </div>

            </div>
        )
    }







    render_confirm_withdraw_ether_dialog(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_confirm_withdraw_ether()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_confirm_withdraw_ether()}
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
                        {this.render_confirm_withdraw_ether()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(2)}
                    </div>
                </div>
                
            )
        }
    }

    render_confirm_withdraw_ether(){
        var e5 = this.state.data['e5']//this.state.e5
        var recipient_address = this.state.data['recipient_address']//this.state.recipient_address
        return(
            <div style={{'padding': '10px'}}>
                    <h3 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2027c']/* Confirmation */}</h3>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2018']/* 'Withdraw Ether Confirmation' */, 'details':this.props.app_state.loc['2019']/* 'Confirm that you want to withdraw Ether to the set address' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['2020']/* 'Withdraw balance in Wei' */, 'subtitle':this.format_power_figure(this.props.app_state.withdraw_balance[e5['id']]), 'barwidth':this.calculate_bar_width(this.props.app_state.withdraw_balance[e5['id']]), 'number':this.format_account_balance_figure(this.props.app_state.withdraw_balance[e5['id']]), 'relativepower':'wei'})}

                        {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['2021']/* 'Withdraw balance in Ether' */, 'subtitle':this.format_power_figure(this.props.app_state.withdraw_balance[e5['id']]/10**18), 'barwidth':this.calculate_bar_width(this.props.app_state.withdraw_balance[e5['id']]/10**18), 'number':(this.props.app_state.withdraw_balance[e5['id']]/10**18), 'relativepower':'Ether'})}
                    </div>
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2022']/* 'Target Wallet Address' */, 'details':start_and_end(recipient_address), 'size':'s'})}
                    <div style={{height: 10}}/>

                    <div style={{height: 10}}/>
                    <div onClick={() => this.props.when_withdraw_ether_confirmation_received()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2023']/* 'Withdraw Ether' */, 'action':''})}
                    </div>
            </div>
        )
    }







    render_confirm_send_coin_dialog(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_confirm_send_coin()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_confirm_send_coin()}
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
                        {this.render_confirm_send_coin()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }


    render_confirm_send_coin(){
        var picked_transfer_amount = this.state.data['amount']
        var recipient_address = this.state.data['recipient']
        var sender_address = this.state.data['sender']
        var fee = this.state.data['fee']
        var coin = this.state.data['coin']
        var memo_text = this.state.data['memo_text']
        var kill_wallet = this.state.data['kill_wallet'] != 'e' 
        return(
            <div>
                <h3 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>{this.props.app_state.loc['1407f']}{/* Confirmation */}</h3>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2941']/* 'Send Coin Confirmation' */, 'details':this.props.app_state.loc['2942']/* 'Confirm that you want to send the coin to the target recipient.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">{this.props.app_state.loc['2943']/* Picked Amount. */}</p>
                    {this.render_detail_item('2', this.get_picked_amount_in_base_units(coin, picked_transfer_amount))}
                    {this.render_detail_item('2', this.get_picked_amount_in_decimal(coin, picked_transfer_amount))}
                </div>
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">{this.props.app_state.loc['2944']/* Picked Fee. */}</p>
                    {this.render_detail_item('2', this.get_picked_fee_amount_in_base_units(coin, fee))}
                    {this.render_detail_item('2', this.get_picked_fee_amount_in_decimal(coin, fee))}
                </div>
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1396']/* 'Sender Wallet Address' */, 'details':sender_address, 'size':'l'})}
                <div style={{height: 10}}/>
                
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1397']/* 'Receiver Wallet Address' */, 'details':recipient_address, 'size':'l'})}

                {kill_wallet == true && (
                    <div>
                        <div style={{height: 10}}/>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['1407n']/* 'Transfer and Kill Enabled.' */, 'details':this.props.app_state.loc['1407o']/* 'Your address will not be kept alive.'' */, 'size':'l'})}
                    </div>
                )}

                {this.show_memo_if_included(memo_text)}

                <div style={{height: 10}}/>
                <div style={{'padding': '5px'}} onClick={()=>this.send_coin_to_target()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2945']/* 'Broadcast Transaction.' */, 'action':''})}
                </div>
            </div>
        )
    }


    get_picked_amount_in_base_units(item, picked_sats_amount){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(picked_sats_amount),
            'number':this.format_account_balance_figure(picked_sats_amount),
            'barcolor':'#606060',
            'relativepower':item['base_unit']+'s',
        }
    }

    get_picked_amount_in_decimal(item, picked_sats_amount){
        var amount = parseFloat(picked_sats_amount) / item['conversion']
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(amount),
            'number':(amount),
            'barcolor':'#606060',
            'relativepower':item['symbol'],
        }
    }

    get_picked_fee_amount_in_base_units(item, picked_sats_fee_amount){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(picked_sats_fee_amount),
            'number':this.format_account_balance_figure(picked_sats_fee_amount),
            'barcolor':'#606060',
            'relativepower':item['base_unit']+'s',
        }
    }

    get_picked_fee_amount_in_decimal(item, picked_sats_fee_amount){
        var amount = parseFloat(picked_sats_fee_amount) / item['conversion']
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(amount),
            'number':(amount),
            'barcolor':'#606060',
            'relativepower':item['symbol'],
        }
    }

    show_memo_if_included(memo_text){
        if(memo_text != null && memo_text != ''){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2953']/* 'Included Memo.' */, 'details':memo_text, 'size':'l'})}
                </div>
            )
        }
    }


    send_coin_to_target(){
        this.props.send_coin_to_target()
    }











    render_song_options(){
        var data = this.state.data
        var from = data['from']
        
        if(from == 'audio_details_section'){
            return(
                <div>
                    {this.render_audio_details_section_song_option_items_data()}
                </div>
            )
        }
        else if(from == 'full_audio_page'){
            return(
                <div>
                    {this.render_full_audio_page_song_option_items_data()}
                </div>
            )
        }
        else if(from == 'audio_details_section2'){
            return(
                <div>
                    {this.render_audio_details_section_song_option_items2_data()}
                </div>
            )
        }
        else if(from == 'audio_details_section3'){
            return(
                <div>
                    {this.render_audio_details_section_song_option_items3_data()}
                </div>
            )
        }
    }

    render_audio_details_section_song_option_items_data(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_audio_details_section_song_option_items()}
                    {this.render_audio_details_section_song_option_items_2()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_audio_details_section_song_option_items()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_audio_details_section_song_option_items_2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_audio_details_section_song_option_items()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_audio_details_section_song_option_items_2()}
                    </div>
                </div>
                
            )
        }
    }

    render_audio_details_section_song_option_items(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2998']/* 'Add to Playlist' */, 'details':this.props.app_state.loc['3006a']/* 'Add the track to one of your playlists.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_add_to_playlist_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2998']/* 'Add to Playlist' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}


                {/* {this.render_detail_item('3', {'title':this.props.app_state.loc['3006k'] 'Download Track.', 'details':this.props.app_state.loc['3006l']'Cache the track in your cookies to load it faster in the future.', 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_add_to_cache_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3006k'] 'Download Track.', 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')} */}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['2999']/* 'Play Next.' */, 'details':this.props.app_state.loc['3006b']/* 'Play the track next.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_play_next_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2999']/* 'Play Next.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}
            </div>
        )
    }

    render_audio_details_section_song_option_items_2(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3000']/* 'Play Last.' */, 'details':this.props.app_state.loc['3006c']/* 'Play the track last. */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_play_last_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3000']/* 'Play Last.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>


                {this.render_buy_track_option_if_unbought()}
            </div>
        )
    }

    render_buy_track_option_if_unbought(){
        if(!this.can_show_buy_track_option()) return;
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055dm']/* 'Buy Track.' */, 'details':this.props.app_state.loc['3055dn']/* 'Buy the track and add it to your collection.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_buy_track_option_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055dm']/* 'Buy Track.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
            </div>
        )
    }

    can_show_buy_track_option(){
        const available_songs_data = this.get_available_songs()
        const song = this.state.data['item']['song_id']
        return !available_songs_data.available_songs.includes(song)
    }

    get_available_songs(){
        var object = this.state.data['object']
        var txs = this.props.app_state.stack_items
        var selected_songs = [].concat(this.props.app_state.my_tracks)
        for(var i=0; i<txs.length; i++){
            var t = txs[i]
            if(t.type == this.props.app_state.loc['2962']/* 'buy-album' */ && t.album['id'] == object['id']){
                var its_selected_songs = t.selected_tracks;
                its_selected_songs.forEach(song => {
                    selected_songs.push(song['song_id'])
                });
            }
        }

        var items = object['ipfs'].songs
        var available_songs = []
        var unavailable_tracks = []
        items.forEach(item => {
            if(!selected_songs.includes(item['song_id'])){
                available_songs.push(item)
            }else{
                unavailable_tracks.push(item)
            }
        });

        return {available_songs:available_songs, unavailable_tracks:unavailable_tracks}
    }

    when_buy_track_option_clicked(){
        var data = this.get_total_payment_amounts()
        var exchanges_used = [].concat(data.exchanges_used)
        var exchange_amounts = data.exchange_amounts
        var ignore_transfers = false;
        var object = this.state.data['object']
        
        if(this.does_subscriptions_exist_in_object(this.state.data['object']) && this.check_if_sender_has_paid_subscriptions(this.state.data['object'])){
            ignore_transfers = true
        }

        if(!this.check_if_sender_can_afford_payments(data, object['e5']) && ignore_transfers == false){
            this.props.notify(this.props.app_state.loc['2970']/* 'You don\'t have enough money to fulfil this purchase.' */, 4500)
        }else{
            var txs = this.props.app_state.stack_items
            var existing_buy_object = null
            for(var i=0; i<txs.length; i++){
                var t = txs[i]
                if(t.type == this.props.app_state.loc['2962']/* 'buy-album' */ && t.album['e5_id'] == object['e5_id']){
                    existing_buy_object = structuredClone(t)
                }
            }

            if(existing_buy_object == null){
                existing_buy_object = {
                    selected: 0, id: makeid(8), type:this.props.app_state.loc['2962']/* 'buy-album' */, entered_indexing_tags:[this.props.app_state.loc['2963']/* 'buy' */, this.props.app_state.loc['2964']/* 'album' */,this.props.app_state.loc['2965']/* 'track' */], selected_tracks:[this.state.data['item']], exchanges_used: exchanges_used, exchange_amounts: exchange_amounts, data: data, album: object, e5: object['e5']
                }
            }
            else{
                existing_buy_object.selected_tracks.push(this.state.data['item'])
                existing_buy_object.exchanges_used = exchanges_used
                existing_buy_object.exchange_amounts = exchange_amounts
                existing_buy_object.data = data
            }

            this.props.add_buy_album_transaction_to_stack_from_dialog_page(existing_buy_object)
            this.props.notify(this.props.app_state.loc['18'], 1700);
        }
    }

    get_total_payment_amounts(){
        var exchanges_used = []
        var exchange_amounts = {}
        var selected_tracks = [this.state.data['item']]
        var object = this.state.data['object']

        var txs = this.props.app_state.stack_items
        for(var i=0; i<txs.length; i++){
            var t = txs[i]
            if(t.type == this.props.app_state.loc['2962']/* 'buy-album' */ && t.album['id'] == object['id']){
                var its_selected_songs = t.selected_tracks;
                its_selected_songs.forEach(song => {
                    selected_tracks.push(song)
                });
            }
        }

        selected_tracks.forEach(track => {
            var track_price_data = track['price_data']
            track_price_data.forEach(price => {
                var exchange_id = price['id']
                var amount = price['amount']
                if(!exchanges_used.includes(exchange_id)){
                    exchanges_used.push(exchange_id)
                    exchange_amounts[exchange_id] = bigInt(0)
                }
                exchange_amounts[exchange_id] = bigInt(exchange_amounts[exchange_id]).add(amount)
            });
        });

        return {exchanges_used:exchanges_used, exchange_amounts:exchange_amounts}
    }

    check_if_sender_can_afford_payments(data, e5){
        var exchanges_used = [].concat(data.exchanges_used)
        var exchange_amounts = data.exchange_amounts

        var can_pay = true;
        for(var i=0; i<exchanges_used.length; i++){
            var token_id = exchanges_used[i]
            var token_balance = this.props.calculate_actual_balance(e5, token_id)
            var final_amount = exchange_amounts[token_id]

            if(bigInt(token_balance).lesser(final_amount)){
                can_pay = false
            }
        }
        return can_pay
    }

    does_subscriptions_exist_in_object(object){
        var required_subscriptions = object['ipfs'].selected_subscriptions
        var creator_group_subscriptions = object['ipfs'].creator_group_subscriptions
        if((creator_group_subscriptions != null && creator_group_subscriptions.length > 0) || (required_subscriptions != null && required_subscriptions.length > 0)){
            return true
        }
        return false
    }

    check_if_sender_has_paid_subscriptions(object){
        var required_subscriptions = object['ipfs'].selected_subscriptions
        var creator_group_subscriptions = object['ipfs'].creator_group_subscriptions
        
        if(creator_group_subscriptions != null && creator_group_subscriptions.length > 0){
            var has_sender_paid_all_subs = false
            creator_group_subscriptions.forEach(subscription_e5_id => {
                var subscription_id = subscription_e5_id.split('E')[0]
                var subscription_e5 = 'E'+subscription_e5_id.split('E')[1]
                if(this.has_paid_subscription(parseInt(subscription_id), subscription_e5)){
                    //if at least one subscription has been paid
                    has_sender_paid_all_subs=  true
                }
            });
            return has_sender_paid_all_subs
        }
        else if(required_subscriptions != null && required_subscriptions.length > 0){
            var has_sender_paid_all_subs2 = false
            required_subscriptions.forEach(subscription_e5_id => {
                var subscription_id = subscription_e5_id
                var subscription_e5 = 'E25'
                if(subscription_e5_id.includes('E')){
                    subscription_id = subscription_e5_id.split('E')[0]
                    subscription_e5 = 'E'+subscription_e5_id.split('E')[1]
                }
                if(this.has_paid_subscription(parseInt(subscription_id), subscription_e5)){
                    has_sender_paid_all_subs2 =  true
                }
            });
            return has_sender_paid_all_subs2
        }else{
            return true
        }
    }

    has_paid_subscription(subscription_id, e5){
        var my_payment = this.props.app_state.my_subscription_payment_mappings[e5][subscription_id]
        if(my_payment == null || my_payment == 0) return false;
        return true
    }

    

    when_add_to_playlist_clicked(){
        if(this.is_song_available_for_adding_to_playlist()){
            var song = this.state.data['item']
            this.props.add_to_playlist(song)
        }else{
            this.props.notify(this.props.app_state.loc['3021']/* 'You need to buy the track to add it to your playlists' */, 6000)
        }
        
    }

    when_play_next_clicked(){
        var song = this.state.data['item']
        this.props.play_next_clicked(song)
    }

    when_play_last_clicked(){
        var song = this.state.data['item']
        this.props.play_last_clicked(song)
    }

    when_add_to_cache_clicked(){
        var song = this.state.data['item']
        this.props.add_song_to_cache(song)
    }



    render_full_audio_page_song_option_items_data(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_full_audio_page_song_option_items()}
                    {this.render_full_audio_page_song_option_items2()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_full_audio_page_song_option_items()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_full_audio_page_song_option_items2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_full_audio_page_song_option_items()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_full_audio_page_song_option_items2()}
                    </div>
                </div>
                
            )
        }
    }

    render_full_audio_page_song_option_items(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2998']/* 'Add to Playlist' */, 'details':this.props.app_state.loc['3006a']/* 'Add the track to one of your playlists.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_add_to_playlist_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2998']/* 'Add to Playlist' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}


                {/* {this.render_detail_item('3', {'title':this.props.app_state.loc['3006k'] 'Download Track.', 'details':this.props.app_state.loc['3006l']'Cache the track in your cookies to load it faster in the future.', 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_add_to_cache_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3006k'] 'Download Track.', 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')} */}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['2999']/* 'Play Next.' */, 'details':this.props.app_state.loc['3006b']/* 'Play the track next.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_play_next_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2999']/* 'Play Next.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}
            </div>
        )
    }

    render_full_audio_page_song_option_items2(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3000']/* 'Play Last.' */, 'details':this.props.app_state.loc['3006c']/* 'Play the track last. */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_play_last_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3000']/* 'Play Last.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['3001']/* 'Remove from queue.' */, 'details':this.props.app_state.loc['3006d']/* 'Remove track from queue.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_remove_from_queue_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3001']/* 'Remove from queue.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
            </div>
        )
    }

    when_remove_from_queue_clicked(){
        var song = this.state.data['item']
        this.props.when_remove_from_queue(song)
    }


    is_song_available_for_adding_to_playlist(){
        var my_songs = this.props.app_state.my_tracks
        var song = this.state.data['item']
        console.log('my_collection_data', my_songs, song['song_id'])
        if(my_songs.includes(song['song_id'])){
            return true
        }
        return false
    }




    render_audio_details_section_song_option_items2_data(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_audio_details_section_song_option_items2()}
                    {this.render_audio_details_section_song_option_items22()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_audio_details_section_song_option_items2()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_audio_details_section_song_option_items22()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_audio_details_section_song_option_items2()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_audio_details_section_song_option_items22()}
                    </div>
                </div>
                
            )
        }
    }

    render_audio_details_section_song_option_items2(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2998']/* 'Add to Playlist' */, 'details':this.props.app_state.loc['3006a']/* 'Add the track to one of your playlists.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_add_to_playlist_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2998']/* 'Add to Playlist' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}


                {/* {this.render_detail_item('3', {'title':this.props.app_state.loc['3006k'] 'Download Track.', 'details':this.props.app_state.loc['3006l']'Cache the track in your cookies to load it faster in the future.', 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_add_to_cache_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3006k'] 'Download Track.', 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')} */}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['3006e']/* 'Remove from Playlist.' */, 'details':this.props.app_state.loc['3006f']/* 'Remove the track from your playlist.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_remove_from_playlist_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3006e']/* 'Remove from Playlist.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}

            </div>
        )
    }

    render_audio_details_section_song_option_items22(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2999']/* 'Play Next.' */, 'details':this.props.app_state.loc['3006b']/* 'Play the track next.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_play_next_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2999']/* 'Play Next.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['3000']/* 'Play Last.' */, 'details':this.props.app_state.loc['3006c']/* 'Play the track last. */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_play_last_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3000']/* 'Play Last.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
            </div>
        )
    }


    when_remove_from_playlist_clicked(){
        var item = this.state.data['item']
        var object = this.state.data['object']
        this.props.when_remove_from_playlist(item, object)
    }


    

    render_audio_details_section_song_option_items3_data(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_audio_details_section_song_option_items3()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_audio_details_section_song_option_items3()}
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
                        {this.render_audio_details_section_song_option_items3()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_audio_details_section_song_option_items3(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3006h']/* 'Confirm Deletion.' */, 'details':this.props.app_state.loc['3006i']/* 'Are you sure you want to delete the playlist?' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_delete_playlist_clicked()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3006h']/* 'Confirm Deletion.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                <div style={{height:15}}/>
                {this.render_playlist_item(this.state.data['object'])}
            </div>
        )
    }

    render_playlist_item(item){
        var title = item['title']
        var details = item['details']
        return(
            <div>
                <div style={{'padding': '0px 0px 0px 0px'}}>
                    {this.render_detail_item('3', {'title':title, 'details':details, 'size':'l'})}
                </div>
                <div style={{padding:'0px 0px 0px 0px'}}>
                    {this.render_playlist_images(item)}
                </div>
            </div>
        )
    }

    render_playlist_images(item){
        var items = this.get_playlist_images(item)
        if(items.length == 0){
            items = [1, 2, 3]
            var background_color = this.props.theme['card_background_color']
            return(
                <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                <div style={{height:50, width:50, 'background-color': background_color, 'border-radius': '10px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
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
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}}>
                            <img alt="" src={this.get_image_from_file(item)} style={{height:25 ,width:25, 'border-radius': '50%'}}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_playlist_images(item){
        var images = []
        var item_songs = item['songs']
        item_songs.forEach(element => {
            images.push(element['album_art'])
        });
        return images
    }

    get_image_from_file(ecid){
        if(!ecid.startsWith('image')) return ecid
        var ecid_obj = this.get_cid_split(ecid)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return 'https://bafkreihhphkul4fpsqougigu4oenl3nbbnjjav4fzkgpjlwfya5ie2tu2u.ipfs.w3s.link/'
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]

        if(data == null) return 'https://bafkreihhphkul4fpsqougigu4oenl3nbbnjjav4fzkgpjlwfya5ie2tu2u.ipfs.w3s.link/'

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

    when_delete_playlist_clicked(){
        var playlist = this.state.data['object']
        this.props.delete_playlist(playlist)
    }









    render_confirm_arweave_upload(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_confirm_arweave()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_confirm_arweave()}
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
                        {this.render_confirm_arweave()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_confirm_arweave(){
        var hash = this.state.data['hash']
        var address = this.state.data['address']
        var type = this.state.data['type']
        var reward = this.state.data['reward']
        var balance = this.state.data['balance']
        var balance_in_ar = this.state.data['balance_in_ar']
        var transaction_reward_in_ar = this.state.data['transaction_reward_in_ar']
        var impact = reward > balance ? 100 : this.round_off((reward / balance) * 100)
        var opacity = reward > balance ? 0.55 : 1.0
        var formatted_size = this.format_data_size(this.state.data['data']['size'])
        var fs = formatted_size['size']+' '+formatted_size['unit']

        return(
            <div style={{'padding': '0px'}}>
                <h3 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2027c']/* Confirmation */}</h3>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055']/* 'Upload File Confirmation.' */, 'details':this.props.app_state.loc['3055a']/* 'Confirm that you want to upload the file to Arweave.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['3055d']/* 'Upload fee in winston.' */, 'subtitle':this.format_power_figure(reward), 'barwidth':this.calculate_bar_width(reward), 'number':this.format_account_balance_figure(reward), 'relativepower':'winston'})}

                    {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['3055e']/* 'Upload fee in Arweave.' */, 'subtitle':this.format_power_figure(transaction_reward_in_ar), 'barwidth':this.calculate_bar_width(transaction_reward_in_ar), 'number':(transaction_reward_in_ar), 'relativepower':'Arweave'})}

                    {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['3055j']/* 'Transaction Impact on your Wallet.' */, 'subtitle':'', 'barwidth':impact+'%', 'number':impact+'%', 'relativepower':this.props.app_state.loc['3055k']/* 'proportion' */})}
                </div>
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['3055b']/* 'Wallet Balance in Winston.' */, 'subtitle':this.format_power_figure(balance), 'barwidth':this.calculate_bar_width(balance), 'number':this.format_account_balance_figure(balance), 'relativepower':'winston'})}

                    {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['3055c']/* 'Wallet Balance in Arweave.' */, 'subtitle':this.format_power_figure(balance_in_ar), 'barwidth':this.calculate_bar_width(balance_in_ar), 'number':(balance_in_ar), 'relativepower':'Arweave'})}
                </div>
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['3055f']/* 'Upload File type.' */, 'title':type+' : '+this.state.data['data']['name'], 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['3055m']/* 'Upload File size.' */, 'title':fs, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['2022']/* 'Target Wallet Address' */, 'details':address, 'size':'l'})}
                <div style={{height: 10}}/>

                <div style={{opacity:opacity}} onClick={() => this.props.upload_file_to_arweave_confirmed(this.state.data)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055i']/* 'Upload File.' */, 'action':''})}
                </div>
            </div>
        )
    }

    copy_hash_to_clipboard(text){
        navigator.clipboard.writeText(text)
        this.props.notify(this.props.app_state.loc['3055h']/* 'Copied Hash to Clipboard.' */, 1600)
    }

    round_off(number){
        return (Math.round(number * 100) / 100)
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







    render_view_uploaded_file(){
       var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_file_image()}
                    {this.render_file_data()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        <div style={{height: 60}}/>
                        {this.render_file_image()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        <div style={{'maxHeight':360, 'overflow-y': 'auto'}}>
                            {this.render_file_data()}
                        </div>
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        <div style={{height: 60}}/>
                        {this.render_file_image()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        <div style={{'maxHeight':360, 'overflow-y': 'auto'}}>
                            {this.render_file_data()}
                        </div>
                    </div>
                </div>
                
            )
        } 
    }

    render_file_image(){
        var ecid_obj = this.state.data['ecid_obj']
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]

        if(data != null){
            var wh = this.props.size == 's' ? '180px':'241px'
            
            if(data['type'] == 'image'){
                var img = data['data']
                if(data['nitro'] != null && !this.is_file_available(data['hash'])){
                    img = this.props.app_state.static_assets['empty_image']
                }
                return(
                    <div onClick={() => this.open_file()}>
                        {this.render_detail_item('7', {'header':'', 'subtitle':'', 'image':img, 'width_height':'auto', 'height':wh, 'border_radius':'25px'})}
                    </div>
                )
            }
            else if(data['type'] == 'audio'){
                var img = data['thumbnail'] == '' ? this.props.app_state.static_assets['music_label'] : data['thumbnail']
                return(
                    <div onClick={() => this.open_file()}>
                        {this.render_detail_item('7', {'header':'', 'subtitle':'', 'image':img, 'width_height':wh})}
                    </div>
                )
            }
            else if(data['type'] == 'video'){
                if(this.props.app_state.video_thumbnails[ecid_obj['full']] != null){
                    var thumbnail = this.props.app_state.video_thumbnails[ecid_obj['full']]
                    return(
                        <div onClick={() => this.open_file()}>
                            {this.render_detail_item('7', {'header':'', 'subtitle':'', 'image':thumbnail, 'width_height':'auto', 'height':wh, 'border_radius':'15px'})}
                        </div>
                    )
                }else{
                    var thumbnail = this.props.app_state.static_assets['video_label']
                    return(
                        <div onClick={() => this.open_file()}>
                            {this.render_detail_item('7', {'header':'', 'subtitle':'', 'image':thumbnail, 'width_height':'auto', 'height':wh, 'border_radius':'15px'})}
                        </div>
                    )
                }
            }
            else if(data['type'] == 'pdf'){
                var img = data['thumbnail']
                return(
                    <div onClick={() => this.open_file()}>
                        {this.render_detail_item('7', {'header':'', 'subtitle':'', 'image':img, 'width_height':wh})}
                    </div>
                )
            }
            else if(data['type'] == 'zip'){
                var img = this.props.app_state.static_assets['zip_file']
                return(
                    <div onClick={() => this.open_file()}>
                        {this.render_detail_item('7', {'header':'', 'subtitle':'', 'image':img, 'width_height':wh})}
                    </div>
                )
            }
            else if(data['type'] == 'lyric'){
                var img = this.props.app_state.static_assets['lyric_icon']
                return(
                    <div>
                        {this.render_detail_item('7', {'header':'', 'subtitle':'', 'image':img, 'width_height':wh})}
                    </div>
                )
            }
            else if(data['type'] == 'subtitle'){
                var img = this.props.app_state.static_assets['subtitle_icon']
                return(
                    <div>
                        {this.render_detail_item('7', {'header':'', 'subtitle':'', 'image':img, 'width_height':wh})}
                    </div>
                )
            }
        }
    }

    open_file(){
        const ecid_obj = this.state.data['ecid_obj']
        const ecid = ecid_obj['full']
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        if(data == null) return;
        if(!this.is_file_available(data['hash'])){
            this.props.notify(this.props.app_state.loc['3055fx']/* 'You deleted that file.' */, 1200)
            return;
        } 

        if(data['type'] == 'image'){
            this.props.show_images([ecid], 0)
        }
        else if(data['type'] == 'audio'){
            this.props.play_individual_track(ecid)
        }
        else if(data['type'] == 'video'){
            const width = data['width'];
            const height = data['height'];
            this.props.play_individual_video(ecid, width, height)
        }
        else if(data['type'] == 'pdf'){
            this.props.when_pdf_file_opened(ecid)
        }
        else if(data['type'] == 'zip'){
            this.props.when_zip_file_opened(ecid)
        }
    }

    render_file_data(){
        var ecid_obj = this.state.data['ecid_obj']
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]

        if(data != null){
            var formatted_size = this.format_data_size(data['size'])
            var size = formatted_size['size']+' '+formatted_size['unit']
            var age = this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */
            var name = data['name']
            // var link = data['data'].startsWith('http') ? encodeURI(data['data']) : ''
            var hash = data['hash']
            const am_i_author = this.props.app_state.uploaded_data_cids.includes(ecid_obj['full']);

            var location = data['nitro'] == null ? this.props.app_state.loc['1593ew']/* arweave */ : this.props.app_state.loc['1593cw']/* 'nitro 🛰️' */

            return(
                <div>
                    <h4 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>{this.props.app_state.loc['3055x']/* File Details. */}</h4>

                    {this.render_detail_item('3', {'details':this.props.app_state.loc['3055n']/* 'File Name.' */, 'title':name, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'details':this.props.app_state.loc['3055o']/* 'File Age.' */, 'title':age, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'details':this.props.app_state.loc['3055p']/* 'File Size.' */, 'title':size, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'details':this.props.app_state.loc['3055eb']/* 'File Location.' */, 'title':location, 'size':'l'})}

                    {this.render_streamed_bytes_if_any(data)}

                    {this.render_file_stream_count_if_any(data)}

                    {this.render_detail_item('0')}
                    {this.render_not_on_e5_message(ecid_obj)}
                    {this.render_file_verified_message(ecid_obj)}
                    {this.render_deleted_file_message_if_deleted(hash)}

                    {this.render_verify_file_button(hash, ecid_obj, am_i_author)}
                    {this.render_delete_file_button(hash, data, am_i_author)}
                </div>
            )
        }
    }

    render_file_stream_count_if_any(data){
        var view_count = this.get_file_view_count(data)
        var view_count_message = ''
        if(view_count > 0){
            var views_text = this.props.app_state.loc['2509n']/* views */
            if(view_count == 1){
                views_text = this.props.app_state.loc['2509o']/* view */
            }
            view_count_message = ` • ${number_with_commas(view_count)} ${views_text}`

            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('4', {'text':view_count_message, 'textsize':'13px', 'font':this.props.app_state.font})}
                </div>
            )
        }
    }

    render_streamed_bytes_if_any(data){
        var stream_bytes_count = this.calculate_total_streaming(data)
        if(stream_bytes_count != 0){
            var formatted_size = this.format_data_size(stream_bytes_count)
            var size = formatted_size['size']+' '+formatted_size['unit']
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'details':this.props.app_state.loc['2509p']/* 'Streamed.' */, 'title':size, 'size':'l'})}
                </div>
            )
        }
    }

    calculate_total_streaming(data){
        var file = data['hash']
        var stream_data = this.props.app_state.file_streaming_data[file]
        if(stream_data != null){
            var stream_data_object = stream_data.files_stream_count
            var time_keys = Object.keys(stream_data_object)
            var bytes_treamed = bigInt(0)
            time_keys.forEach(key => {
                bytes_treamed = bigInt(bytes_treamed).plus(stream_data_object[key])
            });

            return bytes_treamed
        }
        return 0
    }

    get_file_view_count(data){
        var file = data['hash']
        var stream_data = this.props.app_state.file_streaming_data[file]
        if(stream_data != null){
            return stream_data.files_view_count
        }
        return 0
    }

    render_not_on_e5_message(ecid_obj){
        if(this.props.app_state.uncommitted_upload_cids.includes(ecid_obj['full'])){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3055s']/* 'Not On Chain.' */, 'details':this.props.app_state.loc['3055t']/* 'You need to make an E5 run to record this file on E5.' */, 'size':'l'})}
                    <div style={{height: 10}}/>
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3055v']/* 'On Chain.' */, 'details':this.props.app_state.loc['3055w']/* 'A link to the file is permanently stored on chain.' */, 'size':'l'})}
                    <div style={{height: 10}}/>
                </div>
            )
        }
    }

    render_file_location_message(data){

    }

    render_file_verified_message(ecid_obj){
        var verified = this.props.app_state.verified_file_statuses[ecid_obj['full']]
        if(verified != null){
            if(verified == true){
                return(
                    <div>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['3055ce']/* 'File Verified.' */, 'details':this.props.app_state.loc['3055cf']/* 'The file has not been tampered with.' */, 'size':'l'})}
                        <div style={{height: 10}}/>
                    </div>
                )
            }else{
                return(
                    <div>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['3055cg']/* 'File Not Verified.' */, 'details':this.props.app_state.loc['3055ch']/* 'The file might have been tampered with.' */, 'size':'l'})}
                        <div style={{height: 10}}/>
                    </div>
                )
            }
        }
    }

    render_deleted_file_message_if_deleted(hash){
        if(hash != null && !this.is_file_available(hash)){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3055di']/* '🗑️ File Deleted.' */, 'details':this.props.app_state.loc['3055dj']/* 'The file was deleted by youre nitro storage provider.' */, 'size':'l'})}
                    <div style={{height: 10}}/>
                </div>
            )
        }
    }

    render_verify_file_button(hash, ecid_obj, am_i_author){
        if(hash != null && this.is_file_available(hash) && am_i_author == true){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3055by']/* 'Verify File' */, 'details':this.props.app_state.loc['3055bz']/* 'Verify that the entire file has not been tampered with.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={() => this.props.verify_file(ecid_obj)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['3055by']/* 'Verify File' */, 'action':'', 'font':this.props.app_state.font})}
                    </div>
                    <div style={{height: 10}}/>
                </div>
            )
        }
    }

    render_delete_file_button(hash, data, am_i_author){
        if(hash != null && this.is_file_available(hash) && data['nitro'] != null && this.props.app_state.file_streaming_data[hash] != null && am_i_author == true){
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3055do']/* '🗑️ Delete File' */, 'details':this.props.app_state.loc['3055dp']/* 'Delete the file from the node and halt its streaming immediately and forever. This action cannot be undone.' */, 'size':'l'})}
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['3055dq']/* 'You wont get the file\'s space back but you wont pay for the files renewal.' */, 'textsize':'11px', 'font':this.props.app_state.font})}
                    <div style={{height:10}}/>
                    <div onClick={() => this.props.delete_nitro_file(hash, data)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['3055do']/* '🗑️ Delete File' */, 'action':'', 'font':this.props.app_state.font})}
                    </div>
                    <div style={{height: 10}}/>
                </div>
            )
        }
    }











    render_view_item_purchase(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_view_purchase_data()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_view_purchase_data()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(6)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_view_purchase_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(6)}
                    </div>
                </div>
                
            )
        } 
    }

    constructor(props) {
        super(props);
        this.locationPickerRef = React.createRef();
    }

    render_view_purchase_data(){
        var item = this.state.data['item']
        var sender_type = this.state.data['sender_type']
        var object = this.state.data['object']

        return(
            <div>
                <div>
                    <h4 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>{this.props.app_state.loc['1979a']/* Order Details. */}</h4>
                    {this.render_detail_item('3', {'size':'l', 'title':''+(new Date(item['time']*1000).toLocaleString())+' • '+this.get_time_diff((Date.now()/1000) - item['time']), 'details':this.props.app_state.loc['2642ca']/* Order Time. */})}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['1948']/* 'Shipping Details' */, 'details':item['shipping_detail']})}
                    <div style={{height:10}}/>
                    {this.render_direct_purchase_location_pins(item['pins'])}
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['1958']/* 'Variant ID: ' */+item['variant_id'], 'details':this.get_variant_from_id(item['variant_id'], object)['variant_description'] })}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['1114c']/* 'custom_specifications ' */, 'details':item['custom_specifications']})}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['1063']/* 'Quantity: ' */+this.format_account_balance_figure(item['purchase_unit_count']), 'details':this.props.app_state.loc['1064']/* 'Sender Account ID: ' */+item['sender_account'] })}
                    
                    {this.render_purchase_options_if_any(item)}
                    {this.render_fulfilment_signature_if_any(item, object)}

                    {this.render_purchase_order_status_if_any(item, object)}
                    {this.render_purchase_order_status_options_if_storefront_owner(item, object, sender_type)}
                </div>
                {this.render_clear_purchase_button(item, object, sender_type)}
            </div>
        )
    }

    get_variant_from_id(variant_id, object){
        for(var i=0; i<object['ipfs'].variants.length; i++){
            if(object['ipfs'].variants[i]['variant_id'] == variant_id){
                return object['ipfs'].variants[i]
            }
        }
    }

    render_purchase_options_if_any(item){
        var items = item['options']
        if(items == null || items.length == 0) return;
        var storefront_options = item['storefront_options']
        if(storefront_options == null || storefront_options.length == 0) return;
        return(
            <div>
                <div style={{height:10}}/>
                {items.map((item, index) => (
                    <div style={{'padding': '0px 0px 0px 0px'}}>
                        {/* {this.render_detail_item('3', {'title':storefront_options[index]['title'], 'details':storefront_options[index]['details'], 'size':'l'})}
                        <div style={{height:3}}/> */}
                        <Tags font={this.props.app_state.font} page_tags_object={item} tag_size={'l'} when_tags_updated={this.when_purchase_option_tag_selected.bind(this)} theme={this.props.theme} locked={true}/>
                        <div style={{height:3}}/>
                    </div>
                ))}
            </div>
        )
    }

    when_purchase_option_tag_selected(tag_item){
        //do nothing
    }

    render_fulfilment_signature_if_any(item, object){
        var signature = this.props.app_state.direct_purchase_fulfilments[object['id']]
        if(signature != null && signature[item['signature_data']] != null){
            signature = signature[item['signature_data']]
            return(
                <div>
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['2639']/* 'Fulfilment Signature: ' */, 'details':start_and_end(signature['signature']) })}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['2640']/* 'Signature Data: ' */, 'details':start_and_end(signature['signature_data']) })}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['2641']/* 'Signature Address: ' */, 'details':start_and_end(signature['sender_address']) })}
                </div>
            )
        }
    }

    render_clear_purchase_button(item, object, sender_type){
        if(item['indexer_order'] == true && sender_type == 'storefront_client'){
            if(this.has_this_order_been_fulfilled(item, object)){
                return(
                    <div>
                        <div style={{height:10}}/>
                        {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['2642bo']/* 'Order Finalized.' */, 'details':this.props.app_state.loc['2642bp']/* 'Youve already finalized this order and a record of your payment is on E5.' */})}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                )
            }
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['2642bk']/* 'Finalize Order.' */, 'details':this.props.app_state.loc['2642bl']/* 'Finish the order by making the requred payment after verifying fulfilment.' */})}
                    <div style={{height:10}}/>
                    <div style={{'padding': '1px'}} onClick={() => this.finalize_order(item, object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2638']/* 'Clear Purchase' */, 'action':''})}
                    </div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(item['indexer_order'] == true && sender_type == 'storefront_owner'){
            if(this.has_this_order_been_fulfilled(item, object)){
                return(
                    <div>
                        <div style={{height:10}}/>
                        {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['2642bo']/* 'Order Finalized.' */, 'details':this.props.app_state.loc['2642bt']/* 'Youre client finalized this order and a record of their payment is on E5.' */})}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                )
            }else{
                return(
                    <div>
                        <div style={{height:10}}/>
                        {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['2642bu']/* 'Order Pending.' */, 'details':this.props.app_state.loc['2642bv']/* 'No record exists on E5 for the payment of the order made by your client.' */})}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                )
            }
        }
        var signature = this.props.app_state.direct_purchase_fulfilments[object['id']]
        if(signature == null || signature[item['signature_data']] == null){
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['2642b']/* 'Clear purchase.' */, 'details':this.props.app_state.loc['2642c']/* 'Clear the purchase to finalize its fulfilment.' */})}
                    <div style={{height:10}}/>
                    <div style={{'padding': '1px'}} onClick={() => this.clear_purchase(item, sender_type, object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2638']/* 'Clear Purchase' */, 'action':''})}
                    </div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    has_this_order_been_fulfilled(item, object){
        const direct_order_fulfilment_items = []
        const fulfilments = this.props.app_state.direct_order_fulfilments[object['id']] || []
        fulfilments.forEach(event_item => {
            direct_order_fulfilment_items.push(event_item.returnValues.p4)
        });
        return direct_order_fulfilment_items.includes(item['purchase_identifier'])
    }

    clear_purchase(item, sender_type, object){
        this.props.open_dialog_bottomsheet()
        this.props.open_clear_purchase(item, sender_type, object)
    }

    render_direct_purchase_location_pins(pins){
        if(pins != null && pins.length > 0){
            return(
                <div>
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2064k']/* 'Included Locations Pins.' */, 'details':this.props.app_state.loc['2064l']/* 'Some locations have been included in the object. */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <div onClick={() => this.props.show_view_map_location_pins(pins)}>
                        <LocationViewer ref={this.locationPickerRef} height={270} theme={this.props.theme['map_theme']} center={this.get_default_center()} pins={pins} size={this.props.size} input_enabled={false}
                        />
                    </div>
                    {this.render_selected_pins(pins)}
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_default_center(){
        const my_city = this.props.app_state.device_city.toLowerCase()
        var all_cities = this.props.app_state.all_cities
        var specific_cities_objects = all_cities.filter(function (el) {
            return (el['city'].startsWith(my_city) || el['city'] == my_city)
        });

        if(specific_cities_objects.length > 0){
            var city_obj = specific_cities_objects[0];
            return { lat: city_obj['lat'], lon: city_obj['lon'] }
        }
        else{
            return { lat: 51.505, lon: -0.09 }
        }
    }

    render_selected_pins(pins){
        var items = [].concat(pins)
        return(
            <div>
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_pin_item(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    render_pin_item(item){
        const title = item['id']
        const details = item['description'] == '' ? this.props.app_state.loc['284q']/* 'latitude: $, longitude: %' */.replace('$', item['lat']).replace('%', item['lng']) : this.truncate(item['description'], 17)
        return(
            <div onClick={() => this.when_pin_item_clicked(item)}>
                {this.render_detail_item('3', {'title':title, 'details':details, 'size':'s'})}
            </div>
        )
    }

    when_pin_item_clicked(item){
        const location_data = { lat: item['lat'], lon: item['lng'] }
        this.locationPickerRef.current?.set_center(location_data);
    }

    finalize_order(item, object){
        if(this.does_transaction_already_exist_in_stack(object, item)){
            this.props.notify(this.props.app_state.loc['2642bq']/* 'Order payment already in stack.' */, 5700)
            return;
        }

        var obj = {
            id:makeid(8), type:this.props.app_state.loc['2642bm']/* 'order-payment' */,
            entered_indexing_tags:[this.props.app_state.loc['2642bn']/* 'order' */, this.props.app_state.loc['3068af']/* 'bill' */, this.props.app_state.loc['3068ah']/* 'payment' */],
            e5:object['e5'], direct_purchase_item: item, object: object, purchase_unit_count: item['purchase_unit_count']
        }
        this.props.add_order_payment_to_stack(obj)
        this.props.notify(this.props.app_state.loc['18']/* 'Transaction added to Stack' */, 1700)
    }

    does_transaction_already_exist_in_stack(object, item){
        const stack_transactions = this.props.app_state.stack_items
        for(var i=0; i<stack_transactions.length; i++){
            if(
                stack_transactions[i].type == this.props.app_state.loc['2642bm']/* 'order-payment' */ && 
                stack_transactions[i].object['e5_id'] == object['e5_id'] && 
                stack_transactions[i].direct_purchase_item['purchase_identifier'] == item['purchase_identifier']){
                return true
            }
        }
        return false
    }

    render_purchase_order_status_options_if_storefront_owner(item, object, sender_type){
        if(sender_type != 'storefront_owner') return;
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['3055gw']/* 'Order Status Settings' */, 'details':this.props.app_state.loc['3055gx']/* 'You can specify the status of this order or direct purchase.' */})}
                <div style={{height:10}}/>
                {this.render_status_options()}
                <div style={{height:10}}/>
                {this.state.status_option_selected != null && (
                    <div>
                        {this.render_detail_item('3', {'title':this.state.status_option_selected['title'], 'details':this.state.status_option_selected['details'], 'size':'l'})}
                        <div style={{height:10}}/>
                        <div style={{'padding': '1px'}} onClick={() => this.set_order_status(item, object, this.state.status_option_selected)}>
                            {this.render_detail_item('5', {'text':this.props.app_state.loc['3055hm']/* 'Set Status' */, 'action':''})}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    render_status_options(){
        const items = this.get_status_options()
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_status_option_item(item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_status_options(){
        return[
            {'title':this.props.app_state.loc['3055gy']/* 'acknowledged' */, 'details':this.props.app_state.loc['3055gz']/* 'The order has been recognised by the storefront owner.' */, 'id':'acknowledged'},
            {'title':this.props.app_state.loc['3055ha']/* 'rejected' */, 'details':this.props.app_state.loc['3055hb']/* 'The order has been rejected by the storefront owner.' */, 'id':'rejected'},
            {'title':this.props.app_state.loc['3055hc']/* 'processing' */, 'details':this.props.app_state.loc['3055hd']/* 'The order is being processed by the storefront owner.' */, 'id':'processing'},
            {'title':this.props.app_state.loc['3055he']/* 'delayed' */, 'details':this.props.app_state.loc['3055hf']/* 'The order has been delayed due to unspecified reasons.' */, 'id':'delayed'},
            {'title':this.props.app_state.loc['3055hg']/* 'shipping' */, 'details':this.props.app_state.loc['3055hh']/* 'The order is being shipped to your specified address.' */, 'id':'shipping'},
            {'title':this.props.app_state.loc['3055hi']/* 'finalized' */, 'details':this.props.app_state.loc['3055hj']/* 'The order is being finalized after being fulfilled by the storefront owner.' */, 'id':'finalized'},
            {'title':this.props.app_state.loc['3055hk']/* 'complete' */, 'details':this.props.app_state.loc['3055hl']/* 'The order has been fulfilled and completed.' */, 'id':'complete'},
        ]
    }

    render_status_option_item(item){
        const title = item['title']
        const details = this.truncate(item['details'], 25)
        if(this.state.status_option_item == item['id']){
            return(
                <div onClick={() => this.when_status_option_tapped(item)}>
                    {this.render_detail_item('3', {'title':title, 'details':details, 'size':'l'})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }
        return(
            <div onClick={() => this.when_status_option_tapped(item)}>
                {this.render_detail_item('3', {'title':title, 'details':details, 'size':'l'})}
            </div>
        )
    }

    when_status_option_tapped(item){
        if(this.state.status_option_item == item['id']){
            this.setState({status_option_item: null, status_option_selected:null})
        }else{
            this.setState({status_option_item: item['id'], status_option_selected: item})
        }
    }

    set_order_status(item, object, status_option_selected){
        this.props.emit_storefront_order_status_notification(item, object, status_option_selected['id'])
    }

    render_purchase_order_status_if_any(item, object){
        const purchase_identifier = item['purchase_identifier']
        // console.log('render_purchase_order_status_if_any', this.props.app_state.storefront_order_status_info)
        return(
            <div>
                {this.props.app_state.storefront_order_status_info[purchase_identifier] == null && (
                    <div>
                        <div style={{height:10}}/>
                        {this.render_small_skeleton_object2()}
                    </div>
                )}
                {this.props.app_state.storefront_order_status_info[purchase_identifier] != null && (
                    <div>
                        <div style={{height:10}}/>
                        {this.render_detail_item('3', {'title':(this.get_purchase_order_status_details(this.props.app_state.storefront_order_status_info[purchase_identifier])), 'details':this.props.app_state.loc['3055hn']/* 'Current Status Of The Order.' */, 'size':'l'})}
                    </div>
                )}
            </div>
        )
    }

    get_purchase_order_status_details(supplied_status){
        const all = this.get_status_options()
        var details = null
        all.forEach(element => {
            if(element['id'] == supplied_status){
                details = element['details']
            }
        });
        if(details != null) return details;
        return this.props.app_state.loc['3055ho']/* Status Unset.' */
    }

    render_small_skeleton_object2(){
        const styles = {
            container: {
                position: 'relative',
                width: '100%',
                height: 60,
                borderRadius: '15px',
                overflow: 'hidden',
            },
            skeletonBox: {
                width: '100%',
                height: '100%',
                borderRadius: '15px',
            },
            centerImage: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'auto',
                height: 30,
                objectFit: 'contain',
                opacity: 0.9,
            },
        };
        return(
            <div>
                <SkeletonTheme baseColor={this.props.theme['view_group_card_item_background']} highlightColor={this.props.theme['loading_highlight_color']}>
                    <div style={styles.container}>
                        <Skeleton style={styles.skeletonBox} />
                        <img src={this.props.app_state.theme['letter']} alt="" style={styles.centerImage} />
                    </div>
                </SkeletonTheme>
            </div>
        )
    }










    render_view_incoming_transactions(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_incoming_transactions_data()}
                    {this.render_detail_item('0')}
                    {this.render_recent_pending_transactions()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_incoming_transactions_data()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_recent_pending_transactions()}
                    </div>
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_incoming_transactions_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_recent_pending_transactions()}
                    </div>
                </div>
                
            )
        }
    }

    render_incoming_transactions_data(){
        var items = this.state.data['events']
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['2738l']/* 'Incoming transactions.' */, 'details':this.props.app_state.loc['2738s']/* 'The transactions should reflect on your end after a few minutes.' */})}
                <div style={{height:10}}/>
                <div style={{overflow: 'auto'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <div style={{'margin':'3px 0px 3px 0px'}}>
                                {this.render_notification_item(item, index)}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    render_notification_item(item, index){
        var sender = item.returnValues.p2
        var amount = item.returnValues.p4
        var depth = item.returnValues.p7
        var exchange = item.returnValues.p1
        var timestamp = item.returnValues.p5
        var e5 = item['e5']
        return(
            <div onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+exchange], 'number':this.get_actual_number(amount, depth), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange]})}>
                {this.render_detail_item('3', {'title':'💸 '+this.get_senders_name_or_you(sender, item['e5'])+this.props.app_state.loc['1593fg']/* ' sent you ' */+this.format_account_balance_figure(this.get_actual_number(amount, depth))+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange], 'details':''+(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'l'})}
            </div>
        )
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

    get_actual_number(number, depth){
        var p = (bigInt(depth).times(72)).toString().toLocaleString('fullwide', {useGrouping:false})
        var depth_vaule = bigInt(('1e'+p))
        return (bigInt(number).times(depth_vaule)).toString().toLocaleString('fullwide', {useGrouping:false})
    }

    get_senders_name_or_you(sender, e5){
        if(sender == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* You. */
        }
        var bucket = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
        var alias = (bucket[sender] == null ? sender : bucket[sender])
            return alias
    }

    render_recent_pending_transactions(){
        var items = this.state.data['previous_events']
        if(items.length == 0){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }
        return(
            <div>
                <div style={{overflow: 'auto'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <div style={{'margin':'3px 0px 3px 0px'}}>
                                {this.render_notification_item(item, index)}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }








    render_view_event_objects(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_transaction_object_data()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_transaction_object_data()}
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
                        {this.render_transaction_object_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
            )
        }
    }

    render_transaction_object_data(){
        var items = this.state.data['events']
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['2738y']/* 'Affected Objects.' */, 'details':this.props.app_state.loc['2738z']/* 'Below are the objects that are in focus. They should take a few seconds to load.' */})}
                <div style={{height:10}}/>
                <div style={{overflow: 'auto'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <div style={{'margin':'3px 2px 3px 2px'}}>
                                {this.render_object_item(item, index)}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    render_object_item(event, index){
        const object = this.load_object(event)
        if(object == null){
            return(
                <div>
                    {this.render_skeleton_object()}
                </div>
            )
        }else{
            const item = this.format_item(object, event)
            var background_color = this.props.theme['card_background_color']
            var card_shadow_color = this.props.theme['card_shadow_color']
            return(
                <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                    <div style={{'padding': '0px 0px 0px 5px'}}>
                        {this.render_detail_item('1', item['tags'])}
                        <div style={{height: 10}}/>
                        <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_object_clicked(index, object, event)}>
                            {this.render_detail_item('3', item['id'])}
                        </div>
                        <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_object_clicked(index, object, event)}>
                            {this.render_detail_item('2', item['age'])}
                        </div>
                    </div>         
                </div>
            )
        }
    }

    render_skeleton_object(){
        const styles = {
            container: {
                position: 'relative',
                width: '100%',
                height: 160,
                borderRadius: '15px',
                overflow: 'hidden',
            },
            skeletonBox: {
                width: '100%',
                height: '100%',
                borderRadius: '15px',
            },
            centerImage: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'auto',
                height: 60,
                objectFit: 'contain',
                opacity: 0.9,
            },
        };
        return(
            <div>
                <SkeletonTheme baseColor={this.props.theme['loading_base_color']} highlightColor={this.props.theme['loading_highlight_color']}>
                    <div style={styles.container}>
                        <Skeleton style={styles.skeletonBox} />
                        <img src={this.props.app_state.theme['letter']} alt="" style={styles.centerImage} />
                    </div>
                </SkeletonTheme>
            </div>
        )
    }

    load_object(event){
        var e5 = event['e5']
        var p = this.state.data['p']
        var type = this.state.data['type']
        var id = event.returnValues[p]
        var items = []
        if(type == 'storefront' || type == 'auctionbids'){
            items = this.props.app_state.created_stores[e5]
        }
        else if(type == 'bag'){
            items = this.props.app_state.created_bags[e5]
        }
        else if(type == 'contract'){
            items = this.props.app_state.created_contracts[e5]
        }
        else if(type == 'contractor'){
            items = this.props.app_state.created_contractors[e5]
        }
        else if(type == 'job'){
            const socket_jobs = this.props.app_state.socket_created_jobs[e5]
            items = this.props.app_state.created_jobs[e5]
            if(items != null && socket_jobs != null){
                items = items.concat(socket_jobs)
            }
        }
        else if(type == 'message'){
            items = this.get_all_mail()
            return items.find(e => e['convo_id'] === id)
        }
        else if(type == 'proposal'){
            items = this.props.app_state.my_proposals[e5]
        }
        else if(type == 'bill'){
            const socket_bills = this.props.app_state.socket_created_bills[e5]
            items = this.props.app_state.created_bills[e5]
            if(items != null && socket_bills != null){
                items = items.concat(socket_bills)
            }
        }
        else if(type == 'comment'){
            const id_type = event['view']['id_type']
            e5 = event['view']['target_e5'] == null ? e5 : event['view']['target_e5']
            const socket_jobs = this.props.app_state.socket_created_jobs[e5]
            const socket_posts = this.props.app_state.socket_created_posts[e5]
            const dir = {
                17/* 17(job object) */:this.props.app_state.created_jobs[e5], 
                18/* 18(post object) */:this.props.app_state.created_posts[e5], 
                19/* 19(audio_object) */:this.props.app_state.created_audios[e5], 
                20/* 20(video_object) */:this.props.app_state.created_videos[e5],
                21/* 21(nitro_object) */:this.props.app_state.created_nitros[e5], 
                25/* 25(storefront_bag_object) */:this.props.app_state.created_bags[e5], 
                27/* 27(storefront-item) */: this.props.app_state.created_stores[e5], 
                32/* 32(consensus_request) */:this.props.app_state.my_proposals[e5], 
                36/* 36(type_channel_target) */:this.props.app_state.created_channels[e5],
            }
            console.log('when_event_clicked', event, id_type)
            items = dir[parseInt(id_type)];
            if(items != null && socket_jobs != null && id_type == 17/* 17(job object) */){
                items = items.concat(socket_jobs)
            }
            else if(items != null && socket_posts != null && id_type == 18/* 18(post object) */){
                items = items.concat(socket_posts)
            }
        }
        else if(type == 'post'){
            const socket_posts = this.props.app_state.socket_created_posts[e5]
            items = this.props.app_state.created_posts[e5]
            if(items != null && socket_posts != null){
                items = items.concat(socket_posts)
            }
        }
        else if(type == 'audio'){
            items = this.props.app_state.created_audios[e5]
        }
        else if(type == 'video'){
            items = this.props.app_state.created_videos[e5]
        }
        else if(type == 'poll'){
            items = this.props.app_state.created_polls[e5]
        }

        console.log('when_event_clicked', id, type, items)
        if(items == null) items = [];

        return items.find(e => e['id'] == id)
    }

    get_all_mail(){
        var mail_objects = []
        var all_messages = this.props.app_state.all_mail
        var all_messages2 = this.props.app_state.socket_all_mail
        for(const convo_id in all_messages){
            if(all_messages.hasOwnProperty(convo_id)){
                var convo_messages = all_messages[convo_id]
                convo_messages.forEach(message => {
                    if(message['ipfs'] != null && message['ipfs'].entered_title_text != null){
                        mail_objects.push(message)
                    }
                });
            }
        }
        for(const convo_id in all_messages2){
            if(all_messages2.hasOwnProperty(convo_id)){
                var convo_messages = all_messages2[convo_id]
                convo_messages.forEach(message => {
                    if(message['ipfs'] != null && message['ipfs'].entered_title_text != null){
                        mail_objects.push(message)
                    }
                });
            }
        }
        return mail_objects.reverse()
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

    format_item(object, event){
        if(this.state.data['type'] == 'comment'){
            const id_type = event['id_type']
            if(id_type == 17/* 17(job object) */){
                return this.format_job_item(object)
            }
            else if(id_type == 18/* 18(post object) */){
                return this.format_post_item(object)
            }
            else if(id_type == 19/* 19(audio_object) */){
                return this.format_audio_item(object)
            }
            else if(id_type == 20/* 20(video_object) */){
                return this.format_video_item(object)
            }
            else if(id_type == 21/* 21(nitro_object) */){
                return this.format_nitro_item(object)
            }
            else if(id_type == 25/* 25(storefront_bag_object) */){
                return this.format_bag_item(object)
            }
            else if(id_type == 27/* 27(storefront-item) */){
                return this.format_storefront_item(object)
            }
            else if(id_type == 32/* 32(consensus_request) */){
                return this.format_proposal_item(object)
            }
            else if(id_type == 36/* 36(type_channel_target) */){
                return this.format_channel_item(object)
            }
        }
        var tags = []
        if(this.state.data['type'] == 'bag'){
            tags = [object['event'].returnValues.p3]
            if(object['ipfs']['tags'] != null){
                tags = object['ipfs']['tags']
            }
            if(object['ipfs'].device_city != null){
                tags = [object['ipfs'].device_city].concat(tags)
            }
        }
        else if(this.state.data['type'] == 'bill'){
            var exchanges = object['ipfs'].price_data
            var obj = this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)
            exchanges.forEach(exchange_transfer => {
                var exchange = exchange_transfer['id']
                var exchange_name = obj[object['e5']+exchange]
                tags.push(exchange_name)
            });
        }
        else{
            tags = object['ipfs'] == null ? ['Object'] : [].concat(object['ipfs'].entered_indexing_tags)
            if(object['ipfs'].selected_device_city != null && object['ipfs'].selected_device_city != ''){
                tags = [object['ipfs'].selected_device_city].concat(tags)
            }
        }
        var timep = this.state.data['time']
        var blockp = this.state.data['block']
        var senderp = this.state.data['sender']

        var myid = this.props.app_state.user_account_id[object['e5']]
        if(myid == null) myid = 1;
        var sender = this.get_senders_name_or_you(event.returnValues[senderp], event['e5']);
        var object_id = number_with_commas(object['id'])
        if(this.should_hide_contract_info_because_private(object)){
            sender = '????'
            object_id = '????'
        }

        var details = object['ipfs'] == null ? 'Object ID' : object['ipfs'].entered_title_text
        if(this.state.data['type'] == 'bag'){
            details = object['ipfs'] == null ? '' : object['ipfs']['bag_orders'].length + this.props.app_state.loc['2509b']/* ' items' */+' • '+ object['responses']+this.props.app_state.loc['2509c']/* ' responses' */+' • '+sender
        }
        var title = '• '+object_id+' • '+sender
        if(this.state.data['type'] == 'message' || this.state.data['type'] == 'bill'){
            var recipient = object['event'].returnValues.p1
            title = '• '+this.props.app_state.loc['2738ab']/* 'From $' */
            title = title.replace('$', sender)
            if(myid == event.returnValues[senderp]){
                title = '• '+this.props.app_state.loc['2738ac']/* 'To $' */
                title = title.replace('$',this.get_senders_name_or_you(recipient, event['e5']))
            }
        }
        if(this.state.data['type'] == 'bill'){
            details = object['ipfs'] == null ? 'Identifier' : object['ipfs'].identifier
        }
        var age = event == null ? 0 : event.returnValues[blockp]
        var time = object['event'] == null ? 0 : event.returnValues[timep]

        var number = number_with_commas(age)
        var barwidth = this.get_number_width(age)
        var relativepower = this.get_time_difference(time)
        if(this.should_hide_contract_info_because_private(object)){
            number = '????'
            relativepower = '????'
        }
        
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'when_tapped':''},
            'id':{'details':details, 'title':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':barwidth, 'number':` ${number}`, 'barcolor':'', 'relativepower':`${relativepower}`, }
        }
    }

    when_object_clicked(index, object, event){
        this.props.when_notification_object_clicked(index, object, this.state.data, this.is_post_nsfw(object), event)
    }










    render_view_e5_link_objects(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_e5_link_objects()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_e5_link_objects()}
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
                        {this.render_e5_link_objects()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
            )
        }
    }

    render_e5_link_objects(){
        var data = this.get_e5_link_items()
        var items = data.link_items
        var item_types = data.link_item_types
        var entry_text = this.props.app_state.loc['3067v']/* '$ entries found.' */
        entry_text = entry_text.replace('$', items.length)
        if(items.length == 0){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['2738ae']/* 'Found Objects matching that link.' */, 'details':this.props.app_state.loc['2738af']/* 'below are the objects that have been located by e matching the link. They should load in a few moments.' */})}
                    {this.render_detail_item('10', {'text':entry_text, 'textsize':'9px', 'font':this.props.app_state.font})}
                    <div style={{height:10}}/>
                    {this.render_empty_object()}
                </div>
            )
        }
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['2738ae']/* 'Found Objects matching that link.' */, 'details':this.props.app_state.loc['2738af']/* 'below are the objects that have been located by e matching the link. They should load in a few moments.' */})}
                {this.render_detail_item('10', {'text':entry_text, 'textsize':'9px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                <div style={{overflow: 'auto'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <div style={{'margin':'3px 0px 3px 0px'}}>
                                {this.render_link_object_item(item, index, item_types[index])}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    get_e5_link_items(){
        const id = this.state.data['id']
        const link_items = []
        const link_item_types = []
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            const e5 = this.props.app_state.e5s['data'][i]
            const object_type = this.props.app_state.link_type_data[e5]
            if(object_type != null && object_type != 0){
                const obj = {
                    17/* jobs */: this.props.app_state.created_jobs[e5],
                    30/* contracts */: this.props.app_state.created_contracts[e5],
                    32/* proposal */: this.props.app_state.my_proposals[e5],
                    26/* contractor */: this.props.app_state.created_contractors[e5],
                    33/* subscription */: this.props.app_state.created_subscriptions[e5],
                    18/* post */: this.props.app_state.created_posts[e5],
                    36/* channel */: this.props.app_state.created_channels[e5],
                    27/* storefront */: this.props.app_state.created_stores[e5],
                    25/* bag */: this.props.app_state.created_bags[e5],
                    31/* token */: this.props.app_state.created_tokens[e5],
                    19/* audioport */: this.props.app_state.created_audios[e5],
                    20/* videoport */: this.props.app_state.created_videos[e5],
                    21/* nitro */: this.props.app_state.created_nitros[e5],
                    28/* 28(poll-object) */: this.props.app_state.created_polls[e5]
                }
                const items = obj[object_type]
                const e5_object = items.find(e => e['id'] == id)
                if(e5_object != null && object_type != null && object_type != 0){
                    //found an object
                    link_items.push(e5_object)
                    link_item_types.push(object_type)
                }
            }
        }
        return { link_items, link_item_types }
    }

    render_link_object_item(object, index, type){
        const item = this.format_link_item(object, type)
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']

        var required_subscriptions = object['ipfs'].selected_subscriptions
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1

        if(!this.can_sender_view_poll(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        
        if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || this.is_post_preview_enabled(object) || post_author == me){
            return(
                <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                    <div style={{'padding': '0px 0px 0px 5px'}}>
                        {this.render_detail_item('1', item['tags'])}
                        <div style={{height: 10}}/>
                        <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_link_object_clicked(index, object, type)}>
                            {this.render_detail_item('3', item['id'])}
                        </div>
                        <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_link_object_clicked(index, object, type)}>
                            {this.render_detail_item('2', item['age'])}
                        </div>
                    </div>         
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
    }

    can_sender_view_poll(object){
        var viewers = object['ipfs'].viewers
        if(viewers == null || viewers.length == 0) return true;
        var my_active_accounts = this.load_my_active_accounts(object)
        return my_active_accounts.some(r=> viewers.includes(r))
    }

    load_my_active_accounts(object){
        var active_e5s = []
        var preferred_e5s = object['ipfs'].poll_e5s
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]
            if(this.props.app_state.e5s[e5].active == true && preferred_e5s.includes(e5)){
                var id = this.props.app_state.user_account_id[e5]
                if(id != null && id != 1){
                    var account = e5+':'+id
                    active_e5s.push(account)
                }
            }
        }
        return active_e5s
    }

    when_link_object_clicked = async (index, object, object_type) => {
        if(object_type == 17/* jobs */){
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 30/* contracts */){
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 32/* proposal */){
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 26/* contractor */){
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 33/* subscription */){
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 18/* post */){
            var required_subscriptions = object['ipfs'].selected_subscriptions
            var post_author = object['event'].returnValues.p5
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            
            if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || post_author == me){
                this.props.when_link_object_clicked(object, object_type, this.is_post_nsfw(object))
            }else{
                this.props.show_post_item_preview_with_subscription(object, 'post')
            }
        }
        else if(object_type == 36/* channel */){
            var required_subscriptions = object['ipfs'].selected_subscriptions
            var post_author = object['event'].returnValues.p5
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1

            var is_blocked = false
            if(object['ipfs']['blocked_data'] != null){
                var my_identifier = await this.get_my_unique_crosschain_identifier_number()
                if(object['ipfs']['blocked_data']['identifiers'][my_identifier] != null){
                    //ive been blocked
                    is_blocked = true
                }
            }

            if(object['hidden'] == true || is_blocked == true){
                this.props.notify(this.props.app_state.loc['2509d']/* 'That object is not available for you to access.' */, 9000)
                return;
            }
            
            if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || post_author == me){
                this.props.when_link_object_clicked(object, object_type)
            }else{
                this.props.show_post_item_preview_with_subscription(object, 'channel')
            }
        }
        else if(object_type == 27/* storefront */){
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 25/* bag */){
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 31/* token */){
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 19/* audioport */){
            var required_subscriptions = object['ipfs'].selected_subscriptions
            var post_author = object['event'].returnValues.p5
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            
            if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || post_author == me){
                this.props.when_link_object_clicked(object, object_type)
            }else{
                this.props.show_post_item_preview_with_subscription(object, 'audio')
            }
        }
        else if(object_type == 20/* videoport */){
            var required_subscriptions = object['ipfs'].selected_subscriptions
            var post_author = object['event'].returnValues.p5
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            
            if(this.check_if_sender_has_paid_subscriptions(required_subscriptions) || post_author == me){
                this.props.when_link_object_clicked(object, object_type, this.is_post_nsfw(object))
            }else{
                this.props.show_post_item_preview_with_subscription(object, 'video')
            }
        }
        else if(object_type == 21/* nitro */){
            this.props.when_link_object_clicked(object, object_type)
        }
        else if(object_type == 28/* 28(poll-object) */){
            this.props.when_link_object_clicked(object, object_type)
        }
    }

    get_my_unique_crosschain_identifier_number = async () => {
        var uint8array_string = await this.props.get_my_entire_public_key() 
        var uint8array = Uint8Array.from(uint8array_string.split(',').map(x=>parseInt(x,10)));
        var arr = uint8array.toString().replaceAll(',','')
        if(arr.length > 36){
            arr = arr.slice(0, 36);
        }
        return arr
    }

    format_link_item(object, object_type){
        if(object_type == 17/* jobs */){
            return this.format_job_item(object)
        }
        else if(object_type == 30/* contracts */){
            return this.format_contract_item(object)
        }
        else if(object_type == 32/* proposal */){
            return this.format_proposal_item(object)
        }
        else if(object_type == 26/* contractor */){
            return this.format_contractor_item(object)
        }
        else if(object_type == 33/* subscription */){
            return this.format_subscription_item(object)
        }
        else if(object_type == 18/* post */){
            return this.format_post_item(object)
        }
        else if(object_type == 36/* channel */){
            return this.format_channel_item(object)
        }
        else if(object_type == 27/* storefront */){
            return this.format_storefront_item(object)
        }
        else if(object_type == 25/* bag */){
            return this.format_bag_item(object)
        }
        else if(object_type == 31/* token */){
            return this.format_token_item(object)
        }
        else if(object_type == 19/* audioport */){
            return this.format_audio_item(object)
        }
        else if(object_type == 20/* videoport */){
            return this.format_video_item(object)
        }
        else if(object_type == 21/* nitro */){
            return this.format_nitro_item(object)
        }
        else if(object_type == 28 /* 28(poll-object) */){
            return this.format_poll_item(object)
        }
    }

    format_job_item(object){
        var tags = object['ipfs'] == null ? ['Job'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(object['ipfs'].selected_device_city != null && object['ipfs'].selected_device_city != ''){
            tags = [object['ipfs'].selected_device_city].concat(tags)
        }
        var title = object['ipfs'] == null ? 'Job ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        var responses_text = object['responses']+this.props.app_state.loc['2509c']/* ' responses' */

        const is_socket_job = object['ipfs'].get_chain_or_indexer_job_object != null ? this.get_selected_item2(object['ipfs'].get_chain_or_indexer_job_object, 'e') == 1 : false

        const title_image = is_socket_job == true ? (this.props.app_state.nitro_album_art[object['event']['nitro_e5_id']] == null ? this.props.app_state.static_assets['empty_image'] : this.props.app_state.nitro_album_art[object['event']['nitro_e5_id']]) : this.props.app_state.e5s[object['e5']].e5_img

        const title_space = is_socket_job == true ? ' • ' : '• '

        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':title_space+number_with_commas(object['id'])+sender+' • '+responses_text, 'details':title, 'size':'l', 'title_image':title_image, 'border_radius':'0%', 'text_image_border_radius':'6px'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    format_contract_item(object){
        var main_contract_tags = ['Contract', 'main', object['e5'] ]
        var tags = object['ipfs'] == null ? (object['id'] == 2 ? main_contract_tags : ['Contract']) : [object['e5']].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Contract ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var time = object['event'] == null ? 0 : object['event'].returnValues.p4
        var object_id = number_with_commas(object['id'])
        if(this.should_hide_contract_info_because_private(object)){
            object_id = '????'
        }
        var id_text = '• '+object_id
        if(object['id'] == 2) id_text = '• '+'Main Contract'
        var sender = object['event'] == null ? '' : this.get_senders_name(object['event'].returnValues.p3, object);
        if(this.should_hide_contract_info_because_private(object)){
            sender = '????'
        }
        var number = number_with_commas(age)
        var barwidth = this.get_number_width(age)
        var relativepower = this.get_time_difference(time)
        if(this.should_hide_contract_info_because_private(object)){
            sender = '????'
            id_text = '• ????'
            object_id = '????'
            number = '????'
            relativepower = '????'
        }
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':id_text+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{ 'style':'s', 'title':'', 'subtitle':'', 'barwidth':barwidth, 'number':`${number}`, 'barcolor':'', 'relativepower':relativepower, }
        }
    }

    should_hide_contract_info_because_private(object){
        if(object['ipfs'] == null){
            return false
        }
        var should_show =  object['ipfs'].contract_type == 'personal' || object['ipfs'].contract_type == 'life';
        if(this.props.app_state.user_account_id[object['e5']] == object['author']){
            return false
        }
        return should_show
    }

    format_proposal_item(object){
        var tags = object['ipfs'] == null ? ['Proposal'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Proposal ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p6
        var time = object['event'] == null ? 0 : object['event'].returnValues.p5
        var sender = this.get_senders_name(object['event'].returnValues.p4, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':'• '+number_with_commas(object['id'])+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    get_senders_name(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return ' • '+this.props.app_state.loc['1694']/* 'You' */
        }else{
            var obj = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
            var alias = (obj[sender] == null ? '' : ' • '+obj[sender])
            return alias
        }
    }

    format_nitro_item(object){
        var tags = object['ipfs'] == null ? ['NitroPost'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'NitroPost ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name2(object['event'].returnValues.p5, object);
        var author = sender
        var default_image = EndImg
        var image = object['ipfs'] == null ? default_image : (object['ipfs'].album_art == null ? default_image : object['ipfs'].album_art)

        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':number_with_commas(object['id'])+' • '+author, 'details':title, 'size':'l', 'image':image, 'border_radius':'7px'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    format_subscription_item(object){
        var tags = object['ipfs'] == null ? ['Subscription'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Subscription ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var time = object['event'] == null ? 0 : object['event'].returnValues.p4
        var sender = this.get_senders_name(object['event'].returnValues.p3, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':'• '+number_with_commas(object['id'])+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    format_contractor_item(object){
        var tags = object['ipfs'] == null ? ['Contractor'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(object['ipfs'].selected_device_city != null && object['ipfs'].selected_device_city != ''){
            tags = [object['ipfs'].selected_device_city].concat(tags)
        }
        var title = object['ipfs'] == null ? 'Contractor ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':'• '+number_with_commas(object['id'])+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    format_post_item(object){
        var tags = object['ipfs'] == null ? ['Post'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(object['ipfs'].selected_device_city != null && object['ipfs'].selected_device_city != ''){
            tags = [object['ipfs'].selected_device_city].concat(tags)
        }
        var extra = ''
        if(this.is_post_nsfw(object)){
            extra = extra+'🔞'
        }
        var required_subscriptions = object['ipfs'].selected_subscriptions
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        if(!this.check_if_sender_has_paid_subscriptions(required_subscriptions) && post_author != me){
            extra = extra+'🔏'
        }
        if(extra != '') extra = extra + ' '
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        if(this.is_post_anonymous(object)){
            sender = ''
        }
        var number = this.is_post_anonymous(object) ? '???,???,???' : number_with_commas(age)
        var relativepower = this.is_post_anonymous(object) ? '???' : this.get_time_difference(time)
        var objectid = this.is_post_anonymous(object) ? '???' : number_with_commas(object['id'])

        const is_socket_job = object['ipfs'].get_chain_or_indexer_job_object != null ? this.get_selected_item2(object['ipfs'].get_chain_or_indexer_job_object, 'e') == 1 : false

        const title_image = is_socket_job == true ? (this.props.app_state.nitro_album_art[object['event']['nitro_e5_id']] == null ? this.props.app_state.static_assets['empty_image'] : this.props.app_state.nitro_album_art[object['event']['nitro_e5_id']]) : this.props.app_state.e5s[object['e5']].e5_img

        const title_space = is_socket_job == true ? ' • ' : '• '
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':title_space+objectid+sender, 'details':extra+title, 'size':'l', 'title_image':title_image, 'border_radius':'0%', 'text_image_border_radius':'6px'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number}`, 'barcolor':'', 'relativepower':`${relativepower}`, }
        }
    }

    is_post_nsfw(object){
        if(object['ipfs'].get_post_nsfw_option == null) return false
        var selected_nsfw_option = this.get_selected_item2(object['ipfs'].get_post_nsfw_option, 'e')
        if(selected_nsfw_option == 1) return true
    }

    is_post_preview_enabled(object){
        if(object['ipfs'] == null || object['ipfs'].get_post_preview_option == null) return false
        var selected_post_preview_option = this.get_selected_item2(object['ipfs'].get_post_preview_option, 'e')
        if(selected_post_preview_option == 2) return true
        return false
    }

    get_selected_item2(object, option){
        return object[option][2][0]
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

    format_channel_item(object){
        var tags = object['ipfs'] == null ? ['Post'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(object['ipfs'].selected_device_city != null && object['ipfs'].selected_device_city != ''){
            tags = [object['ipfs'].selected_device_city].concat(tags)
        }
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        var extra = ''
        if(object['ipfs']['blocked_data'] != null){
            extra = extra+'🗝️'
        }
        var required_subscriptions = object['ipfs'].selected_subscriptions
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        if(!this.check_if_sender_has_paid_subscriptions(required_subscriptions) && post_author != me){
            extra = extra+'🔏'
        }
        if(extra != ''){
            extra = extra+' '
        }
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':'• '+number_with_commas(object['id'])+sender, 'details':extra+title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    format_storefront_item(object){
        var tags = object['ipfs'] == null ? ['Storefront'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(object['ipfs'].selected_device_city != null && object['ipfs'].selected_device_city != ''){
            tags = [object['ipfs'].selected_device_city].concat(tags)
        }
        var title = object['ipfs'] == null ? 'Storefront ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':'• '+number_with_commas(object['id'])+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    format_bag_item(object){
        var tags = [object['event'].returnValues.p3]
        if(object['ipfs']['tags'] != null){
            tags = object['ipfs']['tags']
        }
        if(object['ipfs'].device_city != null){
            tags = [object['ipfs'].device_city].concat(tags)
        }
        var sender = this.get_senders_name(object['event'].returnValues.p3, object);
        var title = object['ipfs'] == null ? '' : object['ipfs']['bag_orders'].length + this.props.app_state.loc['2509b']/* ' items' */+' • '+ object['responses']+this.props.app_state.loc['2509c']/* ' responses' */+sender
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var time = object['event'] == null ? 0 : object['event'].returnValues.p4
        // var item_images = this.get_bag_images(object)
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':'• '+number_with_commas(object['id']), 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img},
            // 'id_with_image':{'title':object['id'], 'details':title, 'size':'l', 'image':image},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)} ago`, },
        }
    }

    format_audio_item(object){
        var tags = object['ipfs'] == null ? ['Audiopost'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(object['ipfs'].audio_type != null){
            tags = [object['ipfs'].audio_type].concat(tags)
        }
        var extra = ''
        var required_subscriptions = object['ipfs'].selected_subscriptions
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        if(!this.check_if_sender_has_paid_subscriptions(required_subscriptions) && post_author != me){
            extra = extra+'🔏'
        }
        if(extra != '') extra = extra + ' '
        var title = object['ipfs'] == null ? 'Audiopost ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        var author = object['ipfs'] == null ? sender : object['ipfs'].entered_author_text
        if(this.is_post_anonymous(object)){
            author = ''
        }
        var listing_type = object['ipfs'] == null ? 'Audiopost' :this.get_selected_item(object['ipfs'].get_listing_type_tags_option, 'e')
        var default_image = this.props.app_state.static_assets['music_label']
        var image = object['ipfs'] == null ? default_image :object['ipfs'].album_art
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':/* object['e5']+' • '+object['id']+' • '+ *//* listing_type+' • '+ */author, 'details':extra+title, 'size':'l', 'image':image, 'border_radius':'7px'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },
            'min':{'details': author+' • '+this.get_time_difference(time), 'title':extra+title, 'size':'l','image':image, 'border_radius':'7px',}
        }
    }

    format_video_item(object){
        var tags = object['ipfs'] == null ? ['Videopost'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(object['ipfs'].video_type != null){
            tags = [object['ipfs'].video_type].concat(tags)
        }
        var extra = ''
        var required_subscriptions = object['ipfs'].selected_subscriptions
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        if(!this.check_if_sender_has_paid_subscriptions(required_subscriptions) && post_author != me){
            extra = extra+'🔏'
        }
        if(extra != '') extra = extra + ' '
        var title = object['ipfs'] == null ? 'Videopost ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name2(object['event'].returnValues.p5, object);
        var author = sender
        if(this.is_post_anonymous(object)){
            author = ''
        }
        var default_image = this.props.app_state.static_assets['video_label']
        var image = object['ipfs'] == null ? default_image : object['ipfs'].album_art
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':author, 'details':extra+title, 'size':'l', 'image':image, 'border_radius':'7px', 'image_width':'auto'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    get_senders_name2(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            const obj = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
            var alias = (obj[sender] == null ? sender : obj[sender])
            return alias
        }
    }

    format_token_item(object){
        var object_array = object['data']
        var token_id = object['id']
        var item = object
        var type = object_array[0][3/* <3>token_type */] == 3 ? this.props.app_state.loc['3078']/* END */: this.props.app_state.loc['3079']/* SPEND */
        var active_tags = item['ipfs'] == null ? [''+type, 'token'] : item['ipfs'].entered_indexing_tags
        var name = item['ipfs'] == null ? 'Token ID: '+token_id : item['ipfs'].entered_title_text
        var img = EndImg
        if(token_id == 3){
            name = item['e5']
        } else if(token_id == 5){
            name = item['e5'].replace('E','3')
            img = SpendImg
        }
        var symbol = item['ipfs'] == null ? ''+type : item['ipfs'].entered_symbol_text
        var image = img
        if(item['ipfs']!= null){
            if(item['ipfs'].token_image!= null){
                image = item['ipfs'].token_image
            }
        }

        var balance = item['balance']
        var age = item['event'] == null ? 0 : item['event'].returnValues.p5
        var time = item['event'] == null ? 0 : item['event'].returnValues.p4
        return{
            'tags':{'active_tags':[].concat(active_tags), 'index_option':'indexed', 'when_tapped':'select_deselect_tag', 'selected_tags':this.props.app_state.explore_section_tags},
            'id':{'title':name,'details':symbol, 'size':'l', 'image':image, 'border_radius':'15%'},
            'number_label':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(balance), 'number':`${this.format_account_balance_figure(balance)}`, 'barcolor':'#606060', 'relativepower':'balance',},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    format_poll_item(object){
        var tags = object['ipfs'] == null ? ['Post'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':'• '+number_with_commas(object['id'])+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },
            'min':{'details':object['e5']+' • '+number_with_commas(object['id'])+sender, 'title':title, 'size':'l', 'border_radius':'0%'}
        }
    }










    render_account_options_data(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_account_option_items()}
                    {this.render_detail_item('0')}
                    {this.render_account_option_items2()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_account_option_items()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_account_option_items2()}
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_account_option_items()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_account_option_items2()}
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_account_option_items(){
        var account_id = this.state.data['account']
        var e5 = this.state.data['e5']
        var alias = (this.props.app_state.alias_bucket[e5][account_id] == null ? this.props.app_state.loc['1584']/* 'Alias Unknown' */ : this.props.app_state.alias_bucket[e5][account_id])
        return(
            <div>
                {this.render_detail_item('3', {'title':account_id, 'details':alias, 'size':'l'})}
                {this.render_detail_item('0')}
                
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055y']/* 'Add to Contacts' */, 'details':this.props.app_state.loc['3055z']/* 'Add the account to your contact list for easier access in the future.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_add_to_contacts_selected()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055y']/* 'Add to Contacts' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055ba']/* 'Block Account' */, 'details':this.props.app_state.loc['3055bb']/* 'Hide the acccounts content from your feed, your content and the feed of your followers.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_block_contact_selected()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055ba']/* 'Block Account' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                <div style={{height:5}}/>
                {this.render_detail_item('10', {'text':this.props.app_state.loc['3055bi']/* 'If you do this, the changes will reflect on other feeds after your next run. This action cannot be undone.' */ , 'textsize':'10px', 'font':this.props.app_state.font})}
            </div>
        )
    }

    render_account_option_items2(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055bc']/* 'View Account' */, 'details':this.props.app_state.loc['3055bd']/* 'View the accounts entire activity on e.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_view_account_selected()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055bc']/* 'View Account' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055be']/* 'Copy Account' */, 'details':this.props.app_state.loc['3055bf']/* 'Copy the accounts ID to your clipboard' */, 'size':'l'})}
                {this.render_copy_alias_if_exists()}
            </div>
        )
    }

    render_copy_alias_if_exists(){
        var account_id = this.state.data['account']
        var e5 = this.state.data['e5']
        var alias = (this.props.app_state.alias_bucket[e5][account_id] == null ? null : this.props.app_state.alias_bucket[e5][account_id])
        if(alias != null){
            return(
                <div>
                    <div className="row">
                        <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                            <div onClick={() => this.when_copy_to_clipboard_selected(account_id)}>
                                {this.render_detail_item('5', {'text':this.props.app_state.loc['3055be']/* 'Copy Account' */, 'action':'', 'font':this.props.app_state.font})}
                            </div>
                        </div>
                        <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                            <div onClick={() => this.when_copy_to_clipboard_selected(alias)}>
                                {this.render_detail_item('5', {'text':this.props.app_state.loc['3055bg']/* 'Copy Alias' */, 'action':'', 'font':this.props.app_state.font})}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return(
            <div>
                <div style={{height:10}}/>
                <div onClick={() => this.when_copy_to_clipboard_selected(account_id)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055be']/* 'Copy Account' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
            </div>
        )
    }

    when_copy_to_clipboard_selected(data){
        navigator.clipboard.writeText(data)
        this.props.notify(this.props.app_state.loc['3055bh']/* 'Copied to Clipboard.' */, 1200)
    }

    when_block_contact_selected(){
        var account_id = this.state.data['account']
        var e5 = this.state.data['e5']
        if(!this.props.app_state.has_wallet_been_set){
            this.props.notify(this.props.app_state.loc['1577']/* 'Please set your wallet first.' */, 3200);
            return;
        }
        this.props.when_block_contact_selected(account_id, e5)
    }

    when_add_to_contacts_selected(){
        var account_id = this.state.data['account']
        var e5 = this.state.data['e5']
        if(!this.props.app_state.has_wallet_been_set){
            this.props.notify(this.props.app_state.loc['1577']/* 'Please set your wallet first.' */, 3200);
            return;
        }
        this.props.when_add_to_contact_selected(account_id, e5)
    }

    when_view_account_selected(){
        var account_id = this.state.data['account']
        var e5 = this.state.data['e5']
        this.props.when_view_account_details_selected(account_id, e5)
    }








    render_cofirm_pay_bill(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_render_cofirm_pay_bill_items()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_render_cofirm_pay_bill_items()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_my_balances_bit_if_medium_or_large()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_render_cofirm_pay_bill_items()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_my_balances_bit_if_medium_or_large()}
                    </div>
                </div>
                
            )
        }
    }

    render_render_cofirm_pay_bill_items(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3071g']/* 'Confirm Bill Payments' */, 'details':this.props.app_state.loc['3071h']/* 'Confirm that you want to fulfill all the bill payments listed below.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_bills_objects()}
                <div style={{height:10}}/>
                {this.render_bills_list_part()}
                {this.render_my_balances_bit_if_small()}
                <div onClick={()=> this.confirm_bill_payments()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3071i']/* 'Confirm Payments.' */, 'action':''},)}
                </div>
            </div>
        )
    }

    render_my_balances_bit_if_small(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_detail_item('4', {'text':this.props.app_state.loc['3055cn']/* Your balance. */, 'textsize':'13px', 'font':this.props.app_state.font})}
                    <div style={{height:10}}/>
                    {this.render_my_balances()}
                    <div style={{height:20}}/>
                </div>
            )
        }
    }

    render_my_balances_bit_if_medium_or_large(){
        return(
            <div>
                {this.render_detail_item('4', {'text':this.props.app_state.loc['3055cn']/* Your balance. */, 'textsize':'13px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                {this.render_my_balances()}
                <div style={{height:10}}/>
            </div>
        )
    }

    render_bills_objects(){
        var items = [].concat(this.get_bill_object_items())
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
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none', 'opacity':this.get_opacity(item)}} onClick={() => this.when_bill_clicked(item)}>
                                {this.render_detail_item('3', {'title':item['title'], 'details':item['details'], 'size':'l', 'border_radius':'0%'},)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    get_opacity(item){
        var index = item['object']['e5_id']
        var opacity = this.state.ignored_bills.includes(index) ? 0.6 : 1.0
        return opacity
    }

    get_bill_object_items(){
        var objects = this.state.data['objects']
        var items = []
        objects.forEach(object => {
            var details = object['ipfs'] == null ? 'Identifier' : start_and_end(object['ipfs'].identifier)
            var myid = this.props.app_state.user_account_id[object['e5']]
            if(myid == null) myid = 1;
            var sender = object['event'].returnValues.p2
            var recipient = object['event'].returnValues.p1
            var title = this.props.app_state.loc['2738ab']/* 'From $' */
            title = title.replace('$', this.get_sender_title_text(sender, object))
            if(myid == sender){
                title = this.props.app_state.loc['2738ac']/* 'To $' */
                title = title.replace('$',this.get_sender_title_text(recipient, object))
            }
            items.push({'object':object, 'title':title, 'details':details})
        });
        return items
    }

    get_sender_title_text(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    render_empty_horizontal_list_item(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div>
                <div style={{height:50, width:65, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                    </div>
                </div>
            </div>
        )
    }

    when_bill_clicked(item){
        var index = item['object']['e5_id']
        var clone = this.state.ignored_bills.slice()
        if(clone.includes(index)){
            var pos = clone.indexOf(index)
            if(pos != -1){
                clone.splice(pos, 1)
            }
        }else{
            clone.push(index)
        }
        if(clone.length != this.state.data['objects'].length){
            this.setState({ignored_bills: clone})
        }
    }

    render_bills_list_part(){
        var items = [].concat(this.get_all_bill_transactions())
        if(items.length == 0){
            items = [0,3,0]
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }else{
            return(
                <div style={{overflow: 'auto'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '1px 1px 1px 1px'}}>
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[item['e5']+item['exchange']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['exchange']]})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[item['e5']+item['exchange']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['exchange']], })}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        } 
    }

    render_my_balances(){
        var items = [].concat(this.get_all_bill_transactions())
        if(items.length > 0){
            var buy_amounts = []
            var bt = []
            var token_e5s = []
            for(var i=0; i<items.length; i++){
                var token_id = items[i]['exchange']
                var token_balance = this.props.app_state.created_token_object_mapping[items[i]['e5']][token_id]
                token_balance = token_balance == null ? 0 : token_balance['balance']
                buy_amounts.push(token_balance)
                bt.push(token_id)
                token_e5s.push(items[i]['e5'])
            }

            return(
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px', 'list-style':'none'}}>
                        {bt.map((item, index) => (
                            <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'number':buy_amounts[index], 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[token_e5s[index]+item], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                                {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[token_e5s[index]+item], 'subtitle':this.format_power_figure(buy_amounts[index]), 'barwidth':this.calculate_bar_width(buy_amounts[index]), 'number':this.format_account_balance_figure(buy_amounts[index]), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                            </li>
                        ))}
                    </ul>
                </div>  
            )
        }
    }

    get_all_bill_transactions(){
        var objects = this.state.data['objects']
        var selected_objects = []
        objects.forEach(object => {
            var index = object['e5_id']
            if(!this.state.ignored_bills.includes(index)){
                selected_objects.push(object)
            }
        });

        var transaction_object = {}
        selected_objects.forEach(object => {
            var price_data = object['ipfs'].price_data
            if(transaction_object[object['e5']] == null){
                transaction_object[object['e5']] = {}
            }
            price_data.forEach(price_element => {
                if(transaction_object[object['e5']][price_element['id']] == null){
                   transaction_object[object['e5']][price_element['id']] = bigInt(0) 
                }
                transaction_object[object['e5']][price_element['id']] = bigInt(transaction_object[object['e5']][price_element['id']]).plus(price_element['amount'])
            });
        });

        var e5_keys = Object.keys(transaction_object)
        var all_transfers = []
        e5_keys.forEach(e5 => {
            var exchanges = Object.keys(transaction_object[e5])
            exchanges.forEach(exchange => {
                all_transfers.push({'e5':e5, 'exchange':exchange, 'amount':transaction_object[e5][exchange]})
            });
        });

        return all_transfers
    }

    confirm_bill_payments(){
        var objects = this.state.data['objects']
        var selected_objects = []
        objects.forEach(object => {
            var index = object['e5_id']
            if(!this.state.ignored_bills.includes(index)){
                selected_objects.push(object)
            }
        });

        if(!this.check_if_sender_has_enough_money()){
            this.props.notify(this.props.app_state.loc['3068aa']/* 'One of your token balances is insufficient for the transfer amounts specified.' */, 6900)
            return;
        }
        this.props.add_bill_payments_to_stack(selected_objects)
    }

    check_if_sender_has_enough_money(){
        var price_data = this.get_all_bill_transactions()
        var has_enough = true;
        for(var i=0; i<price_data.length; i++){
            var e5 = price_data[i]['e5']
            var amount = price_data[i]['amount']
            var exchange = price_data[i]['exchange']
            var my_balance = this.props.calculate_actual_balance(e5, exchange)
            my_balance = bigInt(my_balance).minus(this.get_debit_balance_in_stack(exchange, e5))
            if(bigInt(my_balance).lesser(bigInt(amount))){
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












    render_invalid_stack_size(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_invalid_stack_size_items()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_invalid_stack_size_items()}
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
                        {this.render_invalid_stack_size_items()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_invalid_stack_size_items(){
        var upload_limit = this.format_data_size(this.props.app_state.upload_object_size_limit)
        var stack_size = this.format_data_size(this.state.data['stack_size'])
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055bk']/* 'Stack Too Large.' */, 'details':this.props.app_state.loc['3055bl']/* 'The amount of data your uploading to E5 is too much for one transaction. Try splitting it into multiple runs.' */, 'size':'l'})}
                {this.render_detail_item('0')}
                
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3055bm']/* 'Upload Size Limit.' */, 'subtitle':this.format_power_figure(upload_limit['size']), 'barwidth':this.calculate_bar_width(upload_limit['size']), 'number':this.format_account_balance_figure(upload_limit['size']), 'barcolor':'#606060', 'relativepower':upload_limit['unit'], })}
                </div>
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3055bn']/* 'Stack Size' */, 'subtitle':this.format_power_figure(stack_size['size']), 'barwidth':this.calculate_bar_width(stack_size['size']), 'number':this.format_account_balance_figure(stack_size['size']), 'barcolor':'#606060', 'relativepower':stack_size['unit'], })}
                </div>
            </div>
        )
    }












    render_file_type_picker(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_file_type_picker_buttons()}
                    {this.render_detail_item('0')}
                    {this.render_file_type_picker_buttons2()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_file_type_picker_buttons()}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_file_type_picker_buttons2()}
                        <div style={{height:10}}/>
                        {this.render_empty_views(2)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_file_type_picker_buttons()}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_file_type_picker_buttons2()}
                        <div style={{height:10}}/>
                        {this.render_empty_views(2)}
                    </div>
                </div>
                
            )
        }
    }

    render_file_type_picker_buttons(){
        return(
            <div>
                {this.render_detail_item('8', {'title':this.props.app_state.loc['3055bo']/* 'Pick Image' */, 'details':this.props.app_state.loc['3055bp']/* 'Images with the .png .jpg and .jpeg extensions are supported as well as .gif files.' */, 'size':'l', 'image':this.props.app_state.static_assets['empty_image'],'border_radius':'9px'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_file_type_selected('image')}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055bo']/* 'Pick Image' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}

                {this.render_detail_item('8', {'title':this.props.app_state.loc['3055bq']/* 'Pick Audio' */, 'details':this.props.app_state.loc['3055br']/* 'Audio files with the .mp3 extensions are supported.' */, 'size':'l', 'image':this.props.app_state.static_assets['music_label'],'border_radius':'9px'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_file_type_selected('audio')}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055bq']/* 'Pick Audio' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}

                {this.render_detail_item('8', {'title':this.props.app_state.loc['3055bs']/* 'Pick Video' */, 'details':this.props.app_state.loc['3055bt']/* 'Video files with the .mp4 extensions are supported.' */, 'size':'l', 'image':this.props.app_state.static_assets['video_label'],'border_radius':'9px'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_file_type_selected('video')}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055bs']/* 'Pick Video' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}


                {this.render_detail_item('8', {'title':this.props.app_state.loc['3055cp']/* 'Pick Lyric File.' */, 'details':this.props.app_state.loc['3055cq']/* 'Lyric files with the .lrc extensions are supported.' */, 'size':'l', 'image':this.props.app_state.static_assets['lyric_icon'],'border_radius':'9px'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_file_type_selected('lyric')}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055cp']/* 'Pick Lyric File.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
            </div>
        )
    }

    render_file_type_picker_buttons2(){
        return(
            <div>
                {this.render_detail_item('8', {'title':this.props.app_state.loc['3055bu']/* 'Pick PDF' */, 'details':this.props.app_state.loc['3055bv']/* 'Pdf files with the .pdf extensions are supported.' */, 'size':'l', 'image':this.props.app_state.static_assets['pdf_icon'],'border_radius':'9px'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_file_type_selected('pdf')}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055bu']/* 'Pick PDF' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}

                {this.render_detail_item('8', {'title':this.props.app_state.loc['3055bw']/* 'Pick Zip' */, 'details':this.props.app_state.loc['3055bx']/* 'Compressed files with the .zip extensions are supported.' */, 'size':'l', 'image':this.props.app_state.static_assets['zip_file'],'border_radius':'9px'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_file_type_selected('zip')}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055bw']/* 'Pick Zip' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}


                {this.render_detail_item('8', {'title':this.props.app_state.loc['3055cr']/* 'Pick Subtitle File.' */, 'details':this.props.app_state.loc['3055cs']/* 'Subtitle files with the .vtt extensions are supported' */, 'size':'l', 'image':this.props.app_state.static_assets['subtitle_icon'],'border_radius':'9px'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_file_type_selected('subtitle')}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055cr']/* 'Pick Subtitle File.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
            </div>
        )
    }

    when_file_type_selected(type){
        this.props.when_file_type_to_select_is_selected(type)
    }












    render_home_page_view_options(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_home_page_view_items()}
                    {this.render_detail_item('0')}
                    {this.render_home_page_view_items2()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_home_page_view_items()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_home_page_view_items2()}
                        <div style={{height:10}}/>
                        {this.render_empty_views(2)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_home_page_view_items()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_home_page_view_items2()}
                        <div style={{height:10}}/>
                        {this.render_empty_views(2)}
                    </div>
                </div>
                
            )
        } 
    }

    render_home_page_view_items(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055ck']/* 'Scroll to Top.' */, 'details':this.props.app_state.loc['3055cl']/* 'Scroll to the top of the section.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_scroll_to_top_section_selected()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055ck']/* 'Scroll to Top' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055ci']/* 'Reload Section.' */, 'details':this.props.app_state.loc['3055cj']/* 'Reload the section and scroll to the top.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.when_reload_section_selected()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055ci']/* 'Reload Section.' */, 'action':'', 'font':this.props.app_state.font})}
                </div>
                
            </div>
        )
    }

    render_home_page_view_items2(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055ec']/* 'Filter By Following' */, 'details':this.props.app_state.loc['3055ed']/* 'Filter the content in the section by an account your following.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div style={{margin:'0px 1px 0px 1px'}}>
                    <TextInput font={this.props.app_state.font} height={20} placeholder={this.props.app_state.loc['2669']/* Search account ID...' */} when_text_input_field_changed={this.when_account_search_text_input_field_changed.bind(this)} text={this.state.following_search_text} theme={this.props.theme}/>
                </div>
                <div style={{height:10}}/>
                {this.render_followed_accounts()}
            </div>
        )
    }

    when_account_search_text_input_field_changed(text){
        this.setState({following_search_text: text})
    }

    filter_followed_accounts_by_searched(accounts){
        const typed_id = this.state.following_search_text.trim().toLowerCase()
        if(typed_id == '') return accounts;
        var filtered_accounts = accounts.filter(function (item) {
            var split_account_array = item.split(':')
            var e5 = split_account_array[0]
            var account = split_account_array[1]
            var alias = this.get_followed_account_name_from_id(account, e5).toLowerCase()
            return (account.includes(typed_id) || alias.includes(typed_id))
        })
        return filtered_accounts
    }


    when_scroll_to_top_section_selected(){
        this.props.when_scroll_to_top_section(this.state.data)
    }

    when_reload_section_selected(){
        this.props.when_reload_section(this.state.data)
    }

    render_followed_accounts(){
        var items = [].concat(this.filter_followed_accounts_by_searched(this.props.app_state.followed_accounts))
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
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={() => this.filter_by_selected_account(item)}>
                                {this.render_followed_account_item(item)} 
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_followed_account_item(item){
        var split_account_array = item.split(':')
        var e5 = split_account_array[0]
        var account = split_account_array[1]
        var alias = this.get_followed_account_name_from_id(account, e5)
        return(
            <div>
                {this.render_detail_item('3', {'title':''+(account), 'details':alias, 'title_image':this.props.app_state.e5s[e5].e5_img, 'size':'l'})}
            </div>
        )
    }

    get_followed_account_name_from_id(account, e5) {
        if (account == this.props.app_state.user_account_id[e5]) {
            return this.props.app_state.loc['1694']/* 'You' */
        } else {
            var alias = (this.props.app_state.alias_bucket[e5][account] == null ? account : this.props.app_state.alias_bucket[e5][account])
            return alias
        }
    }

    filter_by_selected_account(item){
        this.props.filter_by_selected_account(item, this.state.data)
    }









    render_poll_json_example(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_poll_json_example_item()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_poll_json_example_item()}
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
                        {this.render_poll_json_example_item()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        } 
    }

    render_poll_json_example_item(){
        var data = {
            'E25':[1002, 1003, 1004, 1005], 
            'E35':[1032, 7003, 29304, 39205], 
            'E45':[1032, 10009, 19829, 182928]
        }
        var view_theme = this.props.app_state.theme['json_view_theme']
        return(
            <div>
                {this.render_detail_item('4', {'text':this.props.app_state.loc['3055co']/* The JSON object in the file should look something like this. Make sure the format matches exactly, otherwise it wont work. */, 'textsize':'13px', 'font':this.props.app_state.font})}
                <div style={{height:15}}/>
                <ReactJson src={data} theme={view_theme} collapsed={false} iconStyle={'circle'} displayObjectSize={false} displayDataTypes={false}
                />
            </div>
        )
    }







    render_poll_results(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_poll_result_items()}
                    {this.render_detail_item('0')}
                    {this.render_poll_result_item2()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_poll_result_items()}
                        <div style={{height:10}}/>
                        {this.render_empty_views(2)}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_poll_result_item2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_poll_result_items()}
                        <div style={{height:10}}/>
                        {this.render_empty_views(2)}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_poll_result_item2()}
                    </div>
                </div>
                
            )
        }
    }

    render_poll_result_items(){
        return(
            <div>
                {this.load_my_used_nitro_objects()}
                <div style={{height:10}}/>
                {this.render_poll_result_item()}
            </div>
        )
    }

    load_my_used_nitro_objects(){
        var items = this.load_used_nitros()
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
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_used_nitro_item_clicked(item)}>
                            {this.render_nitro_item(item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_empty_horizontal_list_item2(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div>
                <div style={{height:43, width:127, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                    </div>
                </div>
            </div>
        )
    }

    allElementsAppearOnce(arr1, arr2) {
        const countMap = {};
        for (const el of arr2) {
            countMap[el] = (countMap[el] || 0) + 1;
        }
        return arr1.every(el => countMap[el] >= 1);
    }

    render_nitro_item(item){
        var object = item
        var default_image = this.props.app_state.static_assets['end_img']
        var image = object['ipfs'] == null ? default_image : (object['ipfs'].album_art == null ? default_image : object['ipfs'].album_art)
        var title = item['e5']+' • '+item['id']
        var details = object['ipfs'] == null ? 'Nitropost ID' : start_and_end(object['ipfs'].entered_title_text)
        if(this.state.selected_nitro_item == item['e5_id']){
            return(
                <div>
                    {this.render_detail_item('12', {'title':title, 'image':image,'details':details, 'size':'s', 'border_radius':'9px'})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('12', {'title':title, 'image':image, 'details':details, 'size':'s', 'border_radius':'9px'})}
                </div>
            )
        }
    }

    load_used_nitros(){
        var results_obj = this.state.data['item']['ipfs']['results_object']
        var used_nitro_ids = results_obj == null ? [] : Object.keys(results_obj)
        var all_nitros = this.get_all_sorted_objects(this.props.app_state.created_nitros)
        var nitro_objects_used = []
        for(var i=0; i<all_nitros.length; i++){
            var obj = all_nitros[i]
            if(used_nitro_ids.includes(obj['e5_id'])){
                nitro_objects_used.push(obj)
            }
        }
        return nitro_objects_used
    }

    when_used_nitro_item_clicked(item){
        this.setState({selected_nitro_item: item['e5_id'], selected_nitro_object: item})
    }

    render_poll_result_item(){
        var results_obj = this.state.data['item']['ipfs']['results_object']
        var poll_object = this.state.data['object']
        var nitro_item_to_use = this.state.selected_nitro_item
        var nitro_objects_used = this.load_used_nitros()
        if(nitro_item_to_use == null && nitro_objects_used.length != 0){
            nitro_item_to_use = nitro_objects_used[0]['e5_id']
        }
        var results_object = nitro_item_to_use == null ? null : results_obj[nitro_item_to_use]
        if(results_object == null){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }
        var time = results_object.time
        var registered_voters = results_object.registered_voters
        var valid_vote_count = results_object.valid_vote_count
        var targeted_winners = poll_object['ipfs'].winner_count
        var consensus_snapshots = results_object.consensus_snapshots
        var quota = results_object.quota
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3074t']/* 'Poll Results' */, 'details':this.props.app_state.loc['3074u']/* 'As of $' */.replace('$', (''+(new Date(time)))), 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_voter_count_message(registered_voters)}
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3074x']/* Valid Votes Counted. */, 'subtitle':this.format_power_figure(valid_vote_count), 'barwidth':this.calculate_bar_width(valid_vote_count), 'number':this.format_account_balance_figure(valid_vote_count), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['3074y']/* 'votes' */, })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3074bz']/* Quota Used. */, 'subtitle':this.format_power_figure(quota), 'barwidth':this.calculate_bar_width(quota), 'number':this.format_account_balance_figure(quota), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['3074y']/* 'votes' */, })}

                    {this.render_turnout_message(registered_voters, valid_vote_count)}
                </div>
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3074z']/* Targeted Winners. */, 'subtitle':this.format_power_figure(targeted_winners), 'barwidth':this.calculate_bar_width(targeted_winners), 'number':this.format_account_balance_figure(targeted_winners), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['3074ba']/* 'candidates' */, })}
                </div>
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3074bb']/* '$ consensus cycles' */.replace('$', consensus_snapshots.length), 'details':this.props.app_state.loc['3074bc']/* '$ runoffs.' */.replace('$', (''+(consensus_snapshots.length - 1))), 'size':'l'})}
            </div>
        )
    }

    render_poll_result_item2(){
        var results_obj = this.state.data['item']['ipfs']['results_object']
        var poll_object = this.state.data['object']
        var nitro_item_to_use = this.state.selected_nitro_item
        var nitro_objects_used = this.load_used_nitros()
        if(nitro_item_to_use == null && nitro_objects_used.length != 0){
            nitro_item_to_use = nitro_objects_used[0]['e5_id']
        }
        var results_object = nitro_item_to_use == null ? null : results_obj[nitro_item_to_use]
        if(results_object == null){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }
        var time = results_object.time
        var registered_voters = results_object.registered_voters
        var valid_vote_count = results_object.valid_vote_count
        var targeted_winners = poll_object['ipfs'].winner_count
        var consensus_snapshots = results_object.consensus_snapshots
        var elimination_snapshot = results_object.elimination_snapshot
        var vote_transfer_snapshots = results_object.vote_transfer_snapshots
        var current_winners = results_object.current_winners
        var vote_donation_snapshots = results_object.vote_donation_snapshots
        var tie_breaker = results_object.tie_breaker
        var inconclusive_ballot = results_object.inconclusive_ballot
        var quota = results_object.quota

        if(inconclusive_ballot == true){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3074bd']/* 'Counting Results.' */, 'details':this.props.app_state.loc['3074be']/* 'Below are the figures obtained at each cycle and runoff.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_consensus_snapshot_data(consensus_snapshots, elimination_snapshot, valid_vote_count, vote_transfer_snapshots, vote_donation_snapshots, quota)}

                {this.render_final_winners_if_voting_period_over(current_winners, time, tie_breaker)}
                
                <div style={{height: 10}}/>
                {this.calculate_consistency_metric(results_object)}
            </div>
        )
    }

    render_voter_count_message(registered_voters){
        if(registered_voters != 0){
            return(
                <div>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3074v']/* Number of Registered Voters. */, 'subtitle':this.format_power_figure(registered_voters), 'barwidth':this.calculate_bar_width(registered_voters), 'number':this.format_account_balance_figure(registered_voters), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['3074w']/* 'voters' */, })}
                    </div>
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    render_turnout_message(registered_voters, vote_count){
        if(registered_voters == 0) return;
        var percentage = vote_count > 0 ? this.round_off((vote_count / registered_voters) * 100) : 0
        if(percentage >= 100){
            percentage = 99.99
        }
        return(
            <div>
                {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3074bf']/* Turnout Proprtion. */, 'subtitle':this.format_power_figure(percentage), 'barwidth':percentage+'%', 'number':percentage+'%', 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1881']/* 'proportion' */, })}
            </div>
        )
    }

    render_consensus_snapshot_data(consensus_snapshots, elimination_snapshot, valid_vote_count, vote_transfer_snapshots, vote_donation_snapshots, quota){
        var selected_index = this.state.selected_stage == null ? 0 : this.state.selected_stage
        var snapshot = consensus_snapshots[selected_index]
        return(
            <div>
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {consensus_snapshots.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_consensus_snapshot_item_selected(index)}>
                                {this.render_stage_item(index)}
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{height: 10}}/>
                {this.render_consensus_cycle(snapshot, elimination_snapshot[selected_index], valid_vote_count, vote_transfer_snapshots[selected_index], vote_donation_snapshots[selected_index], quota )}
            </div>
        )
    }

    render_stage_item(index){
        var text = this.props.app_state.loc['3074cc']/* 'Primary Stage.' */
        if(index == 0){
            text = this.props.app_state.loc['3074cc']/* 'Runoff $' */.replace('$', index)
        }
        if(this.state.selected_stage == index){
            return(
                <div>
                    {this.render_detail_item('4', {'text':text, 'textsize':'15px', 'font':this.props.app_state.font})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('4', {'text':text, 'textsize':'15px', 'font':this.props.app_state.font})}
                </div>
            )
        }
    }

    when_consensus_snapshot_item_selected(index){
        this.setState({selected_stage: index})
    }

    render_consensus_cycle(snapshot, eliminated_candidate, vote_count, vote_transfer_snapshot, vote_donation_snapshot, quota){
        var figures = []
        var candidate_index = {}
        var poll_object = this.state.data['object']
        poll_object['ipfs'].candidates.forEach(candidate => {
            candidate_index[candidate['id']] = candidate['name']
        });
        var candidate_ids = Object.keys(snapshot)

        candidate_ids.forEach(candidate_id => {
            var candidates_votes = snapshot[candidate_id]
            var percentage = candidates_votes > 0 ? this.round_off((candidates_votes / vote_count) * 100) : 0
            if(percentage >= 100){
                percentage = 99.99
            }
            var title = candidate_index[candidate_id]
            var number = number_with_commas(candidates_votes)
            if(candidates_votes >= quota){
                var donated_vote_count = vote_donation_snapshot[candidate_id]
                title = '✅ '+title
                if(donated_vote_count > 0){
                    number = number + this.props.app_state.loc['3074bu']/* ' ---> $ surplus votes donated.' */.replace('$', number_with_commas(donated_vote_count))
                }
            }
            figures.push({'name':title, 'number': number, 'votes':candidates_votes, 'surplus':donated_vote_count, 'percentage':percentage})
        });
        figures = this.sortByAttributeDescending(figures, 'votes')
        return(
            <div>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    {figures.map((item, index) => (
                        <div>
                            {this.render_detail_item('2', { 'style':'l', 'title':item['name'], 'subtitle':this.format_power_figure(item['votes']), 'barwidth':item['percentage']+'%', 'number':item['number'], 'barcolor':'#606060', 'relativepower':item['percentage']+'%',})}
                        </div>
                    ))}
                </div>
                <div style={{height:10}}/>
                {this.render_eliminated_candidate_data_if_not_null(eliminated_candidate, vote_transfer_snapshot, candidate_index)}
            </div>
        )
    }


    render_eliminated_candidate_data_if_not_null(eliminated_candidate, vote_transfer_snapshot, candidate_index){
        if(eliminated_candidate != null){
            var receivers = Object.keys(vote_transfer_snapshot)
            var items = []
            var transferred_vote_count = 0
            receivers.forEach(candidate_recipient => {
                items.push({'name':candidate_index[candidate_recipient], 'votes_received':vote_transfer_snapshot[candidate_recipient]})
                transferred_vote_count += vote_transfer_snapshot[candidate_recipient]
            });
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3074bi']/* $ was eliminated. */.replace('$', items['name']), 'details':this.props.app_state.loc['3074bj']/* $ votes were transferred to the following candidates. */.replace('$', number_with_commas(transferred_vote_count)), 'size':'l'})}
                    <div style={{height:10}}/>
                    <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                        <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                            {items.map((item, index) => (
                                <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                    {this.render_detail_item('3', {'title':items['name'], 'details':this.props.app_state.loc['3074bh']/* + $ votes */.replace('$', number_with_commas(items['votes_received'])), 'size':'s'})}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }
    }

    render_final_winners_if_voting_period_over(current_winners, time, tie_breaker){
        var now = time
        var poll_object = this.state.data['object']
        if(now/1000 < poll_object['ipfs'].end_time){
            return;
        }
        var items = tie_breaker != '' ? [tie_breaker] : current_winners
        var candidate_index = {}
        poll_object['ipfs'].candidates.forEach(candidate => {
            candidate_index[candidate['id']] = candidate['name']
        });
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3074bk']/* 'Current Winners 🎉' */, 'details':this.props.app_state.loc['3074bl']/* 'Below are the current and final winners of the poll.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_detail_item('4', {'text':candidate_index[item]+' 🏅', 'textsize':'15px', 'font':this.props.app_state.font})}
                            </li>
                        ))}
                    </ul>
                </div>
                {this.render_tie_breaker_message(tie_breaker)}
                {this.render_detail_item('0')}
            </div>
        )
    }

    render_tie_breaker_message(tie_breaker){
        if(tie_breaker != ''){
            return(
                <div>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['3074bv']/* 'There was a tie, so the randomizer was used to pick the winner.' */, 'textsize':'11px', 'font':this.props.app_state.font})}
                </div>
            )
        }
    }

    calculate_consistency_metric(results_object){
        var poll_object = this.state.data['object']
        var focused_results_obj = this.props.app_state.poll_consensus_results[poll_object['e5_id']]
        var used_nitro_ids = focused_results_obj == null ? [] : Object.keys(focused_results_obj)
        if(used_nitro_ids.length < 2){
            return;
        }
        var consistency_count = 0

        var time = results_object.time
        var end_time = poll_object['ipfs'].end_time
        if(time < end_time){
            return;
        }
        
        used_nitro_ids.forEach(used_nitro_id => {
            var results_obj = this.props.app_state.poll_consensus_results[poll_object['e5_id']][used_nitro_id]
            var registered_voters = results_obj.registered_voters
            var valid_vote_count = results_obj.valid_vote_count
            var current_winners = results_obj.current_winners
            var tie_breaker = results_obj.tie_breaker
            var quota = results_obj.quota
            var tied_candidates = results_obj.tied_candidates
            var inconclusive_ballot = results_obj.inconclusive_ballot
            if(
                registered_voters == results_object.registered_voters &&
                valid_vote_count == results_object.valid_vote_count &&
                current_winners.length == results_object.current_winners.length &&
                this.allElementsAppearOnce(current_winners, results_object.current_winners) &&
                tie_breaker == results_object.tie_breaker &&
                quota == results_object.quota &&
                this.allElementsAppearOnce(tied_candidates, results_object.tied_candidates) &&
                inconclusive_ballot == results_object.inconclusive_ballot
            ){
                consistency_count++
            }
        });

        var percentage = this.round_off((consistency_count / used_nitro_ids.length) * 100)
        if(percentage >= 100){
            percentage = 100
        }

        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3074bw']/* 'Consistency levels.' */, 'details':this.props.app_state.loc['3074bx']/* 'The similarity in results returned by the randomly selected nitros.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3074by']/* 'Consistency proportion' */, 'subtitle':this.format_power_figure(percentage), 'barwidth':percentage+'%', 'number':percentage+'%', 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1881']/* 'proportion' */, })}
                </div>
            </div>
        )
    }











    render_creator_payout_info(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_creator_payout_ui()}
                    {this.render_detail_item('0')}
                    {this.render_creator_payout_ui2()}
                    {this.render_detail_item('0')}
                    {this.render_make_payout_button()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_creator_payout_ui()}
                        {this.render_detail_item('0')}
                        {this.render_make_payout_button()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_creator_payout_ui2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_creator_payout_ui()}
                        {this.render_detail_item('0')}
                        {this.render_make_payout_button()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_creator_payout_ui2()}
                    </div>
                </div>
                
            )
        }
    }

    render_creator_payout_ui(){
        const object = this.state.data['object']
        const focused_item = this.state.data['item']
        const payout_information = focused_item['ipfs'].payout_information
        const payout_transaction_data = focused_item['ipfs'].payout_transaction_data
        const payout_subscriptions_used = focused_item['ipfs'].payout_subscriptions_used

        const final_payment_info = payout_information.final_payment_info
        const total_payment_data_for_subscriptions = payout_information.total_payment_data_for_subscriptions
        const start_time = payout_information.start_time
        const end_time = payout_information.end_time
        const total_data_bytes_streamed = payout_information.total_data_bytes_streamed

        const formatted_size = this.format_data_size(total_data_bytes_streamed)
        const fs = formatted_size['size']+' '+formatted_size['unit']

        return(
            <div>
                {this.render_detail_item('3', {'details':this.props.app_state.loc['3075j']/* 'Starting Time.' */, 'title':''+(new Date(start_time)), 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['3075k']/* 'Ending Time.' */, 'title':''+(new Date(end_time)), 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['3075l']/* 'Total Data Streamed.' */, 'title':fs, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('0')}
                {this.render_total_payment_data_for_subscriptions_data(total_payment_data_for_subscriptions, payout_subscriptions_used)}

            </div>
        )
    }

    render_creator_payout_ui2(){
        const object = this.state.data['object']
        const focused_item = this.state.data['item']
        const payout_information = focused_item['ipfs'].payout_information
        const payout_transaction_data = focused_item['ipfs'].payout_transaction_data
        const payout_subscriptions_used = focused_item['ipfs'].payout_subscriptions_used

        const final_payment_info = payout_information.final_payment_info
        const total_data_bytes_streamed = payout_information.total_data_bytes_streamed
        const valid_user_stream_data = payout_information.valid_user_stream_data

        return(
            <div>
                {this.render_final_payment_info(final_payment_info, valid_user_stream_data, total_data_bytes_streamed)}
            </div>
        )
    }




    render_total_payment_data_for_subscriptions_data(total_payment_data_for_subscriptions, payout_subscriptions_used){
        return(
            <div>
                {this.render_detail_item('3', {'details':this.props.app_state.loc['3075m']/* 'Subscription Payout Amounts.' */, 'title':this.props.app_state.loc['3075n']/* 'The total amount of tokens collected from each subscription is shown below.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_subscriptions2(payout_subscriptions_used)}
                <div style={{height:10}}/>
                {this.render_total_subscription_payment_data_for_specific_subscription(total_payment_data_for_subscriptions, payout_subscriptions_used)}
            </div>
        )
    }

    render_subscriptions2(items){
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_used_subscription_clicked(item)}>
                            {this.render_subscription_item2(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    when_used_subscription_clicked(item){
        if(item == this.state.selected_subscription_item){
            this.setState({selected_subscription_item: null})
        }else{
            this.setState({selected_subscription_item: item})
        }
    }

    render_subscription_item2(item, pos){
        var e5 = 'E'+item.split('E')[1]
        var id = item.split('E')[0]
        var subscription_item = this.props.app_state.created_subscription_object_mapping[e5][id]
        var e5_id = item
        var opacity = 0.7
        var details = '????';
        if(subscription_item != null){
            opacity = 1.0
            details = this.truncate(subscription_item['ipfs'].entered_title_text, 17)
        }
        
        if(this.state.selected_subscription_item == e5_id || (pos == 0 && this.state.selected_subscription_item == null)){
            return(
                <div style={{'opacity':opacity}}>
                    {this.render_detail_item('3', {'title':' • '+id, 'details':details, 'size':'l', 'title_image':this.props.app_state.e5s[e5].e5_img})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }
        return(
            <div style={{'opacity':opacity}}>
                {this.render_detail_item('3', {'title':' • '+id, 'details':details, 'size':'l', 'title_image':this.props.app_state.e5s[e5].e5_img})}
            </div>
        )
    }

    render_total_subscription_payment_data_for_specific_subscription(total_payment_data_for_subscriptions, payout_subscriptions_used){
        const default_subscription = payout_subscriptions_used.selected_creator_group_subscriptions[0]
        const selected_subscription_e5_id = this.state.selected_subscription_item == null ? default_subscription : this.state.selected_subscription_item
        const specific_subscription_data = total_payment_data_for_subscriptions[selected_subscription_e5_id]
        if(specific_subscription_data == null || Object.keys(specific_subscription_data).length == 0){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }
        const e5 = 'E'+selected_subscription_e5_id.split('E')[1]
        const focused_exchanges = Object.keys(specific_subscription_data)
        return(
            <div>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    {focused_exchanges.map((item, index) => (
                        <div onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'number':specific_subscription_data[item], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'subtitle':this.format_power_figure(specific_subscription_data[item]), 'barwidth':this.calculate_bar_width(specific_subscription_data[item]), 'number':this.format_account_balance_figure(specific_subscription_data[item]), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item], })}
                        </div>
                    ))}
                </div>
            </div>
        )
    }


    get_data(item){
        var obj = item.split(':')
        return { e5: obj[0], id: obj[1]}
    }

    get_senders_name3(item){
        var data_item = this.get_data(item)
        var sender = data_item.id
        var e5 = data_item.e5
        if(sender == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var obj = this.props.app_state.alias_bucket[e5]
            var alias = (obj[sender] == null ? this.props.app_state.loc['c311m']/* 'Account' */ : obj[sender])
            return alias
        }
    }



    render_final_payment_info(final_payment_info, valid_user_stream_data, total_data_bytes_streamed){
        var user_id_keys = this.filter_user_id_keys_by_searched_text(Object.keys(final_payment_info))
        return(
            <div>
                {this.render_detail_item('3', {'details':this.props.app_state.loc['3075o']/* 'Creator Payout Info' */, 'title':this.props.app_state.loc['3075p']/* 'Below is the payout information for each creator.' */, 'size':'l'})}
                <div style={{height:10}}/>

                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['904']/* 'Account ID' */} when_text_input_field_changed={this.when_searched_user_input_changed.bind(this)} text={this.state.searched_user} theme={this.props.theme}/>
                <div style={{height:10}}/>
                {this.render_creators2(user_id_keys)}
                <div style={{height:10}}/>
                {this.render_selected_creator_payout_information(final_payment_info, valid_user_stream_data, total_data_bytes_streamed)}
            </div>
        )
    }

    filter_user_id_keys_by_searched_text(user_id_keys){
        var selected_keys = []
        var searched_text = this.state.searched_user
        user_id_keys.forEach(user_id => {
            if(searched_text == ''){
                selected_keys.push(user_id)
            }else{
                var user_name = this.get_senders_name3(user_id)
                var account_id = this.get_data(user_id).id
                if(user_name.toLowerCase().startsWith(searched_text.toLowerCase())){
                    selected_keys.push(user_id)
                }
                else if(account_id.startsWith(searched_text)){
                    selected_keys.push(user_id)
                }
            }
        });

        return selected_keys
    }

    when_searched_user_input_changed(text){
        this.setState({searched_user: text})
    }

    render_creators2(items){
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
        }
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.reverse().map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_creator_item_clicked(item)}>
                            {this.render_creator_item2(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_creator_item2(item, pos){
        if(this.state.selected_creator_item == item || (pos == 0 && this.state.selected_creator_item == null)){
            return(
                <div>
                    {this.render_detail_item('3', {'title':' • '+this.get_data(item).id, 'details':this.get_senders_name3(item), 'size':'l', 'title_image':this.props.app_state.e5s[this.get_data(item).e5].e5_img})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }
        return(
            <div>
                {this.render_detail_item('3', {'title':' • '+this.get_data(item).id, 'details':this.get_senders_name3(item), 'size':'l', 'title_image':this.props.app_state.e5s[this.get_data(item).e5].e5_img})}
            </div>
        )
    }

    when_creator_item_clicked(item){
        if(item == this.state.selected_creator_item){
            this.setState({selected_creator_item: null})
        }else{
            this.setState({selected_creator_item: item})
        }
    }

    render_selected_creator_payout_information(final_payment_info, valid_user_stream_data, total_data_bytes_streamed){
        const all_creators = Object.keys(final_payment_info)
        if(all_creators.length == 0){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }
        const selected_creator_item = this.state.selected_creator_item == null ? all_creators[0] : this.state.selected_creator_item
        const selected_creator_payout_data = final_payment_info[selected_creator_item]
        const selected_creator_payout_exchanges = Object.keys(selected_creator_payout_data)
        const selected_creator_streaming_total = valid_user_stream_data[selected_creator_item]
        var proportion = bigInt(selected_creator_streaming_total).multiply(100).divide(total_data_bytes_streamed)
        if(bigInt(selected_creator_streaming_total).lesser(bigInt('1e14')) && bigInt(total_data_bytes_streamed).lesser(bigInt('1e14'))){
            proportion = ((selected_creator_streaming_total * 100) / total_data_bytes_streamed).toFixed(2)
        }
        if(proportion >= 100){
            proportion = 99.99
        }
        const formatted_size = this.format_data_size(selected_creator_streaming_total)
        const fs = formatted_size['size']+' '+formatted_size['unit']

        var transfer_data = []
        selected_creator_payout_exchanges.forEach(exchange_e5_id => {
            var item_data = this.get_data(exchange_e5_id)
            var transfer_amount = selected_creator_payout_data[exchange_e5_id]
            transfer_data.push({'exchange':item_data.id, 'e5':item_data.e5, 'amount':transfer_amount})
        });

        return(
            <div>
                {this.render_detail_item('3', {'details':this.props.app_state.loc['3075r']/* 'Total Data Sreamed for Creators Files.' */, 'title':fs, 'size':'l'})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3075q']/* 'Streaming proportion' */, 'subtitle':this.format_power_figure(proportion), 'barwidth':Math.floor(proportion)+'%', 'number':proportion+'%', 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1881']/* 'proportion' */,})}
                </div>
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    {transfer_data.map((item, index) => (
                        <div onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[item['e5']+item['exchange']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['exchange']]})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[item['e5']+item['exchange']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['exchange']], })}
                        </div>
                    ))}
                </div>
            </div>
        )
    }



    render_make_payout_button(){
        const object = this.state.data['object']
        var my_account = this.props.app_state.user_account_id[object['e5']]

        if(object['author'] != my_account){
            return;
        }

        const focused_item = this.state.data['item']
        const payout_transaction_data = focused_item['ipfs'].payout_transaction_data

        const payout_e5s_used = Object.keys(payout_transaction_data)
        const focused_e5 = this.state.selected_payout_e5 == null ? payout_e5s_used[0] : this.state.selected_payout_e5

        var focused_e5_transaction_info = payout_transaction_data[focused_e5]
        var recorded_batches = this.get_recorded_batches()
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2117f']/* 'E5s Used.' */, 'details':this.props.app_state.loc['2117g']/* 'Below are the E5s used in the payouts.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                {this.load_creator_payout_e5s(payout_e5s_used)}
                <div style={{height: 10}}/>
                {this.render_detail_item('4', {'text':this.props.app_state.loc['2117h']/* 'You also need to select a batch and its set transfers.' */, 'textsize':'13px', 'font':this.props.app_state.font})}
                <div style={{height: 10}}/>
                {this.load_transfer_batches_staged(focused_e5_transaction_info, recorded_batches)}
                <div style={{height: 10}}/>

                {this.render_total_batch_transfers_and_my_balances(focused_e5, focused_e5_transaction_info)}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['2117j']/* 'Stack transfers.' */, 'details':this.props.app_state.loc['2117k']/* 'Stack the transfers for the selected batch in your selected E5.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <div style={{'padding': '5px'}} onClick={() => this.when_stack_transfers_tapped(recorded_batches)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2117l']/* Stack transfers */, 'action':''})}
                </div>
            </div>
        )
    }

    load_creator_payout_e5s(items){
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
                            {this.render_empty_horizontal_list_item3()}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_empty_horizontal_list_item3(){
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
        if(this.state.selected_payout_e5 == item){
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
        this.setState({selected_payout_e5: item})
    }


    load_transfer_batches_staged(focused_e5_transaction_info, recorded_batches){
        var items = Object.keys(focused_e5_transaction_info)
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_transfer_batch_clicked(item)}>
                            {this.render_batch_item(item, focused_e5_transaction_info[item].length, recorded_batches)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_batch_item(item, count, recorded_batches){
        var details = this.props.app_state.loc['2117i']/* '$ transfers.' */.replace('$', count)
        var opacity = recorded_batches.includes(item) ? 0.6 : 1.0
        if(this.does_batch_exist_in_stack(item)){
            opacity = 0.6
        }
        if(this.state.selected_batch_item == item){
            return(
                <div style={{'opacity': opacity}}>
                    {this.render_detail_item('3', {'title':item, 'details':details, 'size':'s'})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }else{
            return(
                <div style={{'opacity': opacity}}>
                    {this.render_detail_item('3', {'title':item, 'details':details, 'size':'s'})}
                </div>
            )
        }
    }

    does_batch_exist_in_stack(selected_batch_id){
        const focused_item = this.state.data['item']
        const payout_transaction_data = focused_item['ipfs'].payout_transaction_data
        const payout_e5s_used = Object.keys(payout_transaction_data)
        const e5_used = this.state.selected_payout_e5 == null ? payout_e5s_used[0] : this.state.selected_payout_e5
        const stack_transactions = this.props.app_state.stack_items
        for(var i=0; i<stack_transactions.length; i++){
            if(stack_transactions[i].type == this.props.app_state.loc['2117p']/* 'creator-payout' */ && stack_transactions[i].id == selected_batch_id && stack_transactions[i].e5 == e5_used){
                return true
            }
        }
        return false
    }

    get_recorded_batches(){
        const object = this.state.data['object']
        const records = this.props.app_state.channel_creator_payout_records[object['e5_id']]
        const recorded_batches = []
        if(records != null && records.length > 0){
            records.forEach(record => {
                var batch_id = record['event'].returnValues.p4/* string_data */
                if(!recorded_batches.includes(batch_id)) recorded_batches.push(batch_id);
            });
        }
        return recorded_batches
    }

    when_transfer_batch_clicked(item){
        if(this.state.selected_batch_item == item){
            this.setState({selected_batch_item: null})
        }else{
            this.setState({selected_batch_item: item})
        }
        
    }

    render_total_batch_transfers_and_my_balances(e5, payout_transaction_data){
        const selected_batch_id = this.state.selected_batch_item
        if(selected_batch_id != null){
            const transfer_data = payout_transaction_data[e5][selected_batch_id]
            const total_transfer_obj = {}
            transfer_data.forEach(transfer_object => {
                if(total_transfer_obj[transfer_object['exchange']] == null){
                    total_transfer_obj[transfer_object['exchange']] = bigInt(0)
                }
                total_transfer_obj[transfer_object['exchange']] = bigInt(total_transfer_obj[transfer_object['exchange']]).plus(bigInt(transfer_object['amount']))
            });

            const exchanges_used = Object.keys(total_transfer_obj)
            const my_balances = {}
            exchanges_used.forEach(exchange_id => {
                my_balances[exchange_id] = this.props.calculate_actual_balance(e5, exchange_id)
            });
            if(exchanges_used.length == 0){
                return(
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                        {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+5], 'subtitle':this.format_power_figure(0), 'barwidth':this.calculate_bar_width((0)), 'number':this.format_account_balance_figure((0)), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[5]})}
                    </div>
                )
            }
            return(
                <div>
                    {this.render_detail_item('4', {'text':this.props.app_state.loc['3055ct']/* 'The total amounts to be tranferred.' */, 'textsize':'13px', 'font':this.props.app_state.font})}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                            {exchanges_used.map((item, index) => (
                                <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'number':total_transfer_obj[item], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                                    {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'subtitle':this.format_power_figure(total_transfer_obj[item]), 'barwidth':this.calculate_bar_width((total_transfer_obj[item])), 'number':this.format_account_balance_figure((total_transfer_obj[item])), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                                </li>
                            ))}
                        </ul>
                    </div> 
                    <div style={{height: 10}}/>
                    {this.render_detail_item('4', {'text':this.props.app_state.loc['3055cu']/* 'Your balances for the exchanges used.' */, 'textsize':'13px', 'font':this.props.app_state.font})}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                            {exchanges_used.map((item, index) => (
                                <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'number':my_balances[item], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                                    {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'subtitle':this.format_power_figure(my_balances[item]), 'barwidth':this.calculate_bar_width((my_balances[item])), 'number':this.format_account_balance_figure((my_balances[item])), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                                </li>
                            ))}
                        </ul>
                    </div> 
                    <div style={{height: 10}}/>
                </div> 
            )
        }
    }




    when_stack_transfers_tapped(recorded_batches){
        const object = this.state.data['object']
        const focused_e5 = this.state.selected_payout_e5
        const selected_batch_id = this.state.selected_batch_item
        const focused_item = this.state.data['item']
        const payout_transaction_data = focused_item['ipfs'].payout_transaction_data

        if(focused_e5 == null){
            this.props.notify(this.props.app_state.loc['2117n']/* 'You need to select an E5 to use.' */, 6700)
        }
        else if(selected_batch_id == null){
            this.props.notify(this.props.app_state.loc['2117m']/* 'You need to select a batch first.' */, 6700)
        }
        else if(recorded_batches.includes(selected_batch_id)){
            this.props.notify(this.props.app_state.loc['3075ac']/* 'You already made the transfers for that batch.' */, 6700)
        }
        else{
            const transfer_data_array = payout_transaction_data[focused_e5][selected_batch_id]
            if(!this.check_if_sender_can_afford_payouts(transfer_data_array, focused_e5)){
                this.props.notify(this.props.app_state.loc['2117o']/* 'Your account balance is insufficient to make all of the transfers.' */, 6700)
                return;
            }
            else if(!this.can_sender_make_creator_payout_staged(selected_batch_id, focused_e5)){
                this.props.notify(this.props.app_state.loc['2117r']/* 'You cant stack the same payout batch twice.' */, 7700)
                return;
            }

            const obj = {
                id: selected_batch_id, 
                type: this.props.app_state.loc['2117p']/* 'creator-payout' */,
                entered_indexing_tags:[
                    this.props.app_state.loc['3075z']/* 'creator' */,
                    this.props.app_state.loc['3075y']/* 'payout' */,
                    this.props.app_state.loc['2117q']/* 'transfers' */, 
                ],
                e5: focused_e5, 
                payout_transfers_array: transfer_data_array, 
                channel_object: object
            }

            this.props.add_creator_payouts_to_stack(obj)
            this.props.notify(this.props.app_state.loc['18']/* 'Transaction added to stack' */, 700)
        }
    }

    check_if_sender_can_afford_payouts(transfer_data, e5){
        var total_transfer_obj = {}

        transfer_data.forEach(transfer_object => {
            if(total_transfer_obj[transfer_object['exchange']] == null){
                total_transfer_obj[transfer_object['exchange']] = bigInt(0)
            }
            total_transfer_obj[transfer_object['exchange']] = bigInt(total_transfer_obj[transfer_object['exchange']]).plus(bigInt(transfer_object['amount']))
        });

        var exchanges_used = Object.keys(total_transfer_obj)

        var can_pay = true;
        for(var i=0; i<exchanges_used.length; i++){
            var token_id = exchanges_used[i]
            var token_balance = this.props.calculate_actual_balance(e5, token_id)
            var final_amount = total_transfer_obj[token_id]

            if(bigInt(token_balance).lesser(bigInt(final_amount))){
                can_pay = false
            }
        }
        return can_pay
    }

    can_sender_make_creator_payout_staged(selected_batch_id, e5_used){
        const stack_transactions = this.props.app_state.stack_items
        for(var i=0; i<stack_transactions.length; i++){
            if(stack_transactions[i].type == this.props.app_state.loc['2117p']/* 'creator-payout' */ && stack_transactions[i].id == selected_batch_id && stack_transactions[i].e5 == e5_used){
                return false
            }
        }
        return true
    }














    render_confirm_upload_nitro_files(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_confirm_upload_nitro_files_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_confirm_upload_nitro_files_data()}
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
                        {this.render_confirm_upload_nitro_files_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        } 
    }

    render_confirm_upload_nitro_files_data(){
        var selected_files_type = this.state.data['selected_files_type']
        var files = this.state.data['files']
        var size_total = this.state.data['size_total']
        var obj = this.state.data['obj']
        var formatted_size = this.format_data_size(size_total)
        var fs = formatted_size['size']+' '+formatted_size['unit']
        var available_storage_space = this.state.data['available_storage_space']
        var impact = this.round_off((size_total / available_storage_space) * 100)
        return(
            <div>
                <h3 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2027c']/* Confirmation */}</h3>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055']/* 'Upload File Confirmation.' */, 'details':this.props.app_state.loc['3055cv']/* 'Confirm that you wan to upload your selected files to nitro.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':number_with_commas(files.length.toString()), 'details':this.props.app_state.loc['3055cy']/* 'File Count.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':selected_files_type, 'details':this.props.app_state.loc['3055cw']/* 'Selected File Type' */, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['3055cx']/* 'Total Space to be Consumed' */, 'title':fs, 'size':'l'})}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['3055cz']/* 'Impact on your Storage Space.' */, 'subtitle':'', 'barwidth':impact+'%', 'number':impact+'%', 'relativepower':this.props.app_state.loc['3055k']/* 'proportion' */})}
                </div>
                <div style={{height: 10}}/>
                
                {this.render_track_nitro(obj)}
                <div style={{height: 10}}/>
                

                <div onClick={() => this.props.upload_file_to_nitro_confirmed(this.state.data)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055i']/* 'Upload File.' */, 'action':''})}
                </div>
            </div>
        )
    }

    render_track_nitro(object){
        var default_image = this.props.app_state.static_assets['empty_image']
        var image = object['ipfs'] == null ? default_image : (object['ipfs'].album_art == null ? default_image : object['ipfs'].album_art)
        var title = object['e5']+' • '+object['id']
        var details = object['ipfs'] == null ? 'Nitropost ID' : (object['ipfs'].entered_title_text)
        return(
            <div>
                {this.render_detail_item('8', {'title':title, 'image':image, 'details':details, 'size':'l', 'border_radius':'9px'})}
            </div>
        )
    }











    render_renew_nitro_upload_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_renew_nitro_upload_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_renew_nitro_upload_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
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
                        {this.render_renew_nitro_upload_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        } 
    }

    render_renew_nitro_upload_data(){
        const files_to_be_renewed_data = this.fetch_files_to_be_renewed()
        var opacity = files_to_be_renewed_data.has_all_nitro_metadata_loaded == true ? 1.0 : 0.6
        var has_all_objects_loaded = this.has_all_nitro_objects_loaded(files_to_be_renewed_data.files_to_renew)
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3055dc']/* 'Below is the total amount of money youre set to pay for your files.' */, 'title':this.props.app_state.loc['1593hd']/* 'Renew Uploaded Files.' */})}
                {this.render_detail_item('10', {'text':this.props.app_state.loc['3055ex']/* 'If the indexer charges streaming fees on your files, the data streamed is combined with the displayed file size.' */, 'textsize':'12px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                {this.render_nitro_items(files_to_be_renewed_data.files_to_renew)}
                {this.render_detail_item('0')}
                {this.render_total_payment_amounts_for_all_the_selected_nitros_and_e5_selector(files_to_be_renewed_data.files_to_renew)}

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3055ju']/* 'Stack all the payments to each of the indexers for storage of all the files specified for renewal.' */, 'title':this.props.app_state.loc['3055jt']/* 'Stack Payment Transactions.' */})}
                <div style={{height:10}}/>

                <div style={{'opacity':opacity}} onClick={()=> this.add_renew_files_transaction_to_stack(files_to_be_renewed_data.has_all_nitro_metadata_loaded, files_to_be_renewed_data.files_to_renew, has_all_objects_loaded)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1593hf']/* 'Renew Files' */, 'action':''},)}
                </div>
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

    load_preferred_e5_ui(){
        var items = this.load_active_e5s()
        var items2 = [0, 1]
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_e5_clicked2(item)}>
                            {this.render_e5_item2(item)}
                        </li>
                    ))}
                    {items2.map(() => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_empty_horizontal_list_item()}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_e5_item2(item){
        var image = this.props.app_state.e5s[item].e5_img
        var details = this.props.app_state.e5s[item].token
        if(this.state.selected_e5_renewal_items.includes(item)){
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

    when_e5_clicked2(item){
        var clone = this.state.selected_e5_renewal_items.slice()
        const index = clone.indexOf(item)
        if(index != -1){
            clone.splice(index, 1)
        }
        else{
            clone.push(item)
        }
        if(clone.length != 0){
            this.setState({selected_e5_renewal_items: clone})
        }
    }




    has_all_nitro_objects_loaded(files_to_be_renewed_data){
        var items = Object.keys(files_to_be_renewed_data)
        var has_all_loaded = true

        items.forEach(item => {
            var nitro_id = item.split('E')[0]
            var nitro_e5 = 'E'+item.split('E')[1]
            var object = this.props.app_state.created_nitro_mappings[nitro_e5] == null ? null : this.props.app_state.created_nitro_mappings[nitro_e5][nitro_id]

            if(object == null){
                has_all_loaded = true
            }
        });

        return has_all_loaded
    }

    fetch_files_to_be_renewed(){
        var my_files = this.props.app_state.uploaded_data_cids
        var files_to_renew = {}
        const startOfYear = new Date(new Date().getFullYear(), 0, 1).getTime()
        const startOfLastYear = new Date(new Date().getFullYear()-1, 0, 1).getTime()
        var has_files_all_loaded = true
        var has_all_nitro_metadata_loaded = true;
        var total_files_to_renew = 0
        my_files.forEach(ecid => {
            const data = this.get_cid_split(ecid)
            if(data != null){
                if(this.props.app_state.uploaded_data[data['filetype']] != null){
                    const file_data = this.props.app_state.uploaded_data[data['filetype']][data['full']]
                    if(file_data != null){
                        const time = file_data['id']
                        const nitro = file_data['nitro']
                        const binary_size = file_data['binary_size']
                        const file_hash = file_data['hash']
                        if(binary_size != null){
                            if(nitro != null){
                                const nitro_node_data = this.props.app_state.nitro_node_details[nitro]
                                if(nitro_node_data != null && nitro_node_data != 'unavailable'){
                                    if(time < startOfYear && nitro != null && this.is_file_available(file_hash) && !this.has_nitro_already_been_renewed(nitro) && this.does_streaming_data_exist(file_hash)){
                                        if(files_to_renew[nitro] == null){
                                            files_to_renew[nitro] = []
                                        }
                                        const files_years_stream_count = this.fetch_file_streaming_count(file_hash, startOfYear-1)

                                        const file_data_item = {'data':data, 'file_data':file_data, 'time':time, 'binary_size':binary_size, 'time_multiplier':1}

                                        if(time > startOfLastYear){
                                            //it was uploaded last year
                                            const difference = time - startOfLastYear
                                            file_data_item['time_multiplier'] = 1 - (difference / 31556952000)
                                        }

                                        if(nitro_node_data['target_storage_streaming_multiplier'] != 0 && !bigInt(files_years_stream_count).isZero()){
                                            file_data_item['streaming_multiplier'] = (bigInt(files_years_stream_count).divide(binary_size)).divide(nitro_node_data['target_storage_streaming_multiplier'])
                                        }
                                        files_to_renew[nitro].push(file_data_item)
                                        total_files_to_renew++
                                    }
                                }
                                else{
                                    has_all_nitro_metadata_loaded = false;
                                }
                            }
                        }
                        else{
                            has_files_all_loaded = false
                        }
                    }
                    else{
                        has_files_all_loaded = false
                    }
                }
                else{
                    has_files_all_loaded = false
                }
            }
            else{
                has_files_all_loaded = false
            }
        });

        return { files_to_renew, has_files_all_loaded, total_files_to_renew, has_all_nitro_metadata_loaded}
    }

    does_streaming_data_exist(current_file){
        return this.props.app_state.file_streaming_data[current_file] != null
    }

    fetch_file_streaming_count(current_file, startOfCurrentYear){
        const files_stream_count_data = this.props.app_state.file_streaming_data[current_file] == null ? {} : this.props.app_state.file_streaming_data[current_file]['files_stream_count']
        const stream_times = Object.keys(files_stream_count_data)
        const start_time = startOfCurrentYear - 31_556_952_000/* year in milliseconds */
        var focused_files_streaming_totals = bigInt(0)
        stream_times.forEach(stream_time => {
            if(stream_time >= start_time && stream_time < startOfCurrentYear){
                focused_files_streaming_totals = bigInt(focused_files_streaming_totals).plus(files_stream_count_data[stream_time])
            }
        });
        return focused_files_streaming_totals
    }

    is_file_available(file){
        if(file == null) return true;
        var is_file_available = this.props.app_state.file_streaming_data == null ? true : (this.props.app_state.file_streaming_data[file] == null ? true : this.props.app_state.file_streaming_data[file].is_file_deleted == false)
        return is_file_available
    }

    has_nitro_already_been_renewed(nitro){
        const startOfYear = new Date(new Date().getFullYear(), 0, 1).getTime()
        const latest_file_renewal_time = this.props.app_state.latest_file_renewal_time
        var has_been_renewed = false;
        const e5s = Object.keys(latest_file_renewal_time)
        e5s.forEach(e5 => {
            const renewal_data = latest_file_renewal_time[e5]
            const paid_nitros = renewal_data['paid_nitros']
            const time = renewal_data['time']

            if(paid_nitros.includes(nitro) && time > startOfYear){
                has_been_renewed = true
            }
        });
        return has_been_renewed
    }

    render_nitro_items(files_to_be_renewed_data){
        var items = Object.keys(files_to_be_renewed_data)
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.reverse().map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_nitro_files_item(item, files_to_be_renewed_data[item], items.length)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_nitro_files_item(item, renew_data, nitro_count){
        var nitro_id = item.split('E')[0]
        var nitro_e5 = 'E'+item.split('E')[1]

        var size_count = 0
        renew_data.forEach(file_data => {
            size_count += file_data['binary_size']
            if(file_data['streaming_multiplier'] != null){
                size_count += file_data['streaming_multiplier']
            }
        });

        var object = this.props.app_state.created_nitro_mappings[nitro_e5] == null ? null : this.props.app_state.created_nitro_mappings[nitro_e5][nitro_id]

        if(object != null){
            var default_image = this.props.app_state.static_assets['empty_image']
            var image = object['ipfs'] == null ? default_image : (object['ipfs'].album_art == null ? default_image : object['ipfs'].album_art)
            var formatted_size = this.format_data_size(size_count)
            var fs = formatted_size['size']+' '+formatted_size['unit']
            var title = this.props.app_state.loc['3055da']/* '$ consumed.' */.replace('$', fs)
            var details = this.props.app_state.loc['3055db']/* '$ files.' */.replace('$', number_with_commas(renew_data.length))

            var opacity = this.state.ignored_nitro_files_items.includes(item) ? 0.6 : 1.0
            return(
                <div style={{'opacity': opacity}} onClick={() => this.when_nitro_file_item_clicked(item, nitro_count)}>
                    {this.render_detail_item('8', {'title':title, 'image':image, 'details':details, 'size':'s', 'img_size':23})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_empty_horizontal_list_item2()}
                </div>
            )
        }
    }

    when_nitro_file_item_clicked(item, nitro_count){
        var clone = this.state.ignored_nitro_files_items.slice()
        const index = clone.indexOf(item)
        if(index != -1){
            clone.splice(index, 1)
        }
        else{
            clone.push(item)
            if(clone.length == nitro_count){
                this.props.notify(this.props.app_state.loc['3055dd']/* You cant ignore all of the nodes. */, 4000)
                return;
            }
        }
        
        this.setState({ignored_nitro_files_items: clone})
    }




    render_total_payment_amounts_for_all_the_selected_nitros_and_e5_selector(files_to_renew){
        const price_data_object = this.get_total_payments_to_be_made(files_to_renew).total_price_amounts
        var items = Object.keys(price_data_object)
        return(
            <div>
                {this.render_detail_item('4', {'text':this.props.app_state.loc['3055dk']/* 'Youll need to select youre preferred E5s to make the renewal purchases.' */, 'textsize':'13px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                {this.load_preferred_e5_ui()}
                <div style={{height:10}}/>
                {items.map((item, index) => (
                    <div>
                        {this.render_total_payment_amounts_for_all_the_selected_nitros(price_data_object[item], item)}
                    </div>
                ))}
            </div>
        )
    }

    render_total_payment_amounts_for_all_the_selected_nitros(total_price_amounts, e5){
        const items = Object.keys(total_price_amounts)
        
        if(items.length == 0){
            return(
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                    {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+5], 'subtitle':this.format_power_figure(0), 'barwidth':this.calculate_bar_width((0)), 'number':this.format_account_balance_figure((0)), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[5]})}
                </div>
            )
        }
        return(
            <div style={{}}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style-type': 'none'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '3px 0px 3px 0px'}}>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'number':this.get_amount(total_price_amounts[item]), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'subtitle':this.format_power_figure(this.get_amount(total_price_amounts[item])), 'barwidth':this.calculate_bar_width(this.get_amount(total_price_amounts[item])), 'number':this.format_account_balance_figure(this.get_amount(total_price_amounts[item])), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item], })}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_amount(exchange_value){
        return bigInt(exchange_value)
    }

    get_total_payments_to_be_made(files_to_be_renewed_data){
        var items = Object.keys(files_to_be_renewed_data)
        var selected_items = []
        items.forEach(nitro_e5_id => {
            if(!this.state.ignored_nitro_files_items.includes(nitro_e5_id)){
                selected_items.push(nitro_e5_id)
            }
        });
        var total_price_amounts = {}
        var ignored_nitro_e5_ids = []
        selected_items.forEach(nitro_e5_id => {
            var nitro_node_data = this.props.app_state.nitro_node_details[nitro_e5_id]
            var total_storage_consumed_in_mbs = 0.0
            files_to_be_renewed_data[nitro_e5_id].forEach(file_object => {
                total_storage_consumed_in_mbs += (file_object['binary_size'] / (1024 * 1024)) * (file_object['time_multiplier'])
                if(file_object['streaming_multiplier'] != null){
                    total_storage_consumed_in_mbs += file_object['streaming_multiplier']
                }
            });
            if(nitro_node_data != null && nitro_node_data != 'unavailable'){
                var price_data_object = this.get_price_data_to_be_used(nitro_node_data)
                if(price_data_object != null){
                    var price_data = price_data_object.price_data
                    var e5_used = price_data_object.e5
                    if(price_data != null){
                        if(total_price_amounts[e5_used] == null){
                            total_price_amounts[e5_used] = {}
                        }
                        price_data.forEach(price_item => {
                            var exchange = price_item['exchange']
                            var amount = price_item['amount']
                            if(total_price_amounts[e5_used][exchange] == null){
                                total_price_amounts[e5_used][exchange] = bigInt(0)
                            }
                            total_price_amounts[e5_used][exchange] = bigInt(total_price_amounts[e5_used][exchange]).plus(bigInt(amount).multiply(bigInt(Math.ceil(total_storage_consumed_in_mbs))))
                        });
                    } 
                }
                else{
                    ignored_nitro_e5_ids.push(nitro_e5_id)
                }
            }
        });

        return {total_price_amounts, ignored_nitro_e5_ids}
    }

    get_price_data_to_be_used(nitro_node_data){
        var items = this.state.selected_e5_renewal_items
        for(var i=0; i<items.length; i++){
            const e5 = items[i]
            if(nitro_node_data['price_per_megabyte'][e5]){
                return { price_data: nitro_node_data['price_per_megabyte'][e5], e5}
            }
        }
    }

    add_renew_files_transaction_to_stack(has_all_price_data_loaded, files_to_renew, has_all_objects_loaded){
        const price_data_object = this.get_total_payments_to_be_made(files_to_renew).total_price_amounts
        if(has_all_price_data_loaded == false || has_all_objects_loaded == false){
            this.props.notify(this.props.app_state.loc['3055de']/* You need to wait for all the nodes to finish loading first. */, 5000)
            return;
        }
        else if(!this.check_if_transfers_exist(price_data_object)){
            this.props.notify(this.props.app_state.loc['3055dl']/* 'No payments to make.' */, 4700)
            return;
        }
        else if(!this.check_if_sender_can_afford_renewal_payouts(price_data_object)){
            this.props.notify(this.props.app_state.loc['2117o']/* 'Your account balance is insufficient to make all of the transfers.' */, 6700)
            return;
        }
        
        const total_payments_with_recepients_data = this.get_total_payments_to_be_made_with_recipients(files_to_renew)
        const e5s_used = Object.keys(total_payments_with_recepients_data)

        e5s_used.forEach(e5_used => {
            const total_payments_with_recepients = total_payments_with_recepients_data[e5_used]
            const amounts_to_transfer = []
            const nitro_storage_account_recipients = {}
            Object.keys(total_payments_with_recepients).forEach(nitro_e5_id => {
                var node_details = this.props.app_state.nitro_node_details[nitro_e5_id]
                var purchase_recipient = node_details['target_storage_recipient_accounts'] == null ? node_details['target_storage_purchase_recipient_account'] : node_details['target_storage_recipient_accounts'][this.props.app_state.selected_e5]
                nitro_storage_account_recipients[nitro_e5_id] = purchase_recipient
                
                Object.keys(total_payments_with_recepients[nitro_e5_id]).forEach(exchange_item => {
                    if(total_payments_with_recepients[nitro_e5_id][exchange_item] != 0){
                        amounts_to_transfer.push({
                            'exchange':exchange_item, 
                            'amount':total_payments_with_recepients[nitro_e5_id][exchange_item], 
                            'recipient': purchase_recipient,
                        })
                    }
                });
            });

            const obj = {
                id:e5_used+this.state.made_id, type:this.props.app_state.loc['3055df']/* 'nitro-renewal' */,
                entered_indexing_tags:[this.props.app_state.loc['3055dg']/* 'nitro' */, this.props.app_state.loc['3055dh']/* 'renewal' */, this.props.app_state.loc['3068ah']/* 'payment' */],
                e5:e5_used, price_data_object, files_to_renew, ignored_nitros: this.state.ignored_nitro_files_items, amounts_to_transfer, total_payments_with_recepients, nitro_storage_account_recipients
            }
            this.props.add_nitro_renewal_transaction_to_stack(obj)
        });
        
        this.props.notify(this.props.app_state.loc['18']/* 'Transaction added to stack' */, 700)
    }

    get_total_payments_to_be_made_with_recipients(files_to_be_renewed_data){
        var items = Object.keys(files_to_be_renewed_data)
        var selected_items = []
        items.forEach(nitro_e5_id => {
            if(!this.state.ignored_nitro_files_items.includes(nitro_e5_id)){
                selected_items.push(nitro_e5_id)
            }
        });
        var total_price_amounts = {}
        selected_items.forEach(nitro_e5_id => {
            var nitro_node_data = this.props.app_state.nitro_node_details[nitro_e5_id]
            var total_storage_consumed_in_mbs = 0.0
            files_to_be_renewed_data[nitro_e5_id].forEach(file_object => {
                total_storage_consumed_in_mbs += (file_object['binary_size'] / (1024 * 1024)) * (file_object['time_multiplier'])
                if(file_object['streaming_multiplier'] != null){
                    total_storage_consumed_in_mbs += file_object['streaming_multiplier']
                }
            });
            if(nitro_node_data != null && nitro_node_data != 'unavailable'){
                var price_data_object = this.get_price_data_to_be_used(nitro_node_data)
                if(price_data_object != null){
                    var price_data = price_data_object.price_data
                    var e5_used = price_data_object.e5
                    if(price_data != null){
                        if(total_price_amounts[e5_used] == null){
                            total_price_amounts[e5_used] = {}
                        }
                        if(total_price_amounts[e5_used][nitro_e5_id] == null){
                            total_price_amounts[e5_used][nitro_e5_id] = {}
                        }
                        price_data.forEach(price_item => {
                            var exchange = price_item['exchange']
                            var amount = price_item['amount']
                            if(total_price_amounts[e5_used][nitro_e5_id][exchange] == null){
                                total_price_amounts[e5_used][nitro_e5_id][exchange] = bigInt(0)
                            }
                            total_price_amounts[e5_used][nitro_e5_id][exchange] = bigInt(total_price_amounts[e5_used][nitro_e5_id][exchange]).plus(bigInt(amount).multiply(bigInt(Math.ceil(total_storage_consumed_in_mbs))))
                        });
                    }
                }
            }
        });

        return total_price_amounts
    }

    check_if_sender_can_afford_renewal_payouts(price_data_object){
        var e5s_used = Object.keys(price_data_object)
        
        var can_pay = true;
        for(var e=0; e<e5s_used.length; e++){
            const e5 = e5s_used[e]
            const exchanges_used = Object.keys(price_data_object[e5])
            for(var i=0; i<exchanges_used.length; i++){
                var token_id = exchanges_used[i]
                var token_balance = this.props.calculate_actual_balance(e5, token_id)
                var final_amount = price_data_object[e5][token_id]
    
                if(bigInt(token_balance).lesser(bigInt(final_amount))){
                    can_pay = false
                }
            }
        }
        
        return can_pay
    }

    check_if_transfers_exist(price_data_object){
        var e5s_used = Object.keys(price_data_object)
        var transfers_exist = false;
        for(var e=0; e<e5s_used.length; e++){
            const e5 = e5s_used[e]
            const exchanges_used = Object.keys(price_data_object[e5])
            for(var i=0; i<exchanges_used.length; i++){
                if(price_data_object[e5][exchanges_used[i]] != 0){
                    transfers_exist = true;
                }
            }
        }
        
        return transfers_exist
    }












    render_bid_for_item_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_bid_for_item_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_bid_for_item_data()}
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
                        {this.render_bid_for_item_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_bid_for_item_data(){
        const item = this.state.data['item']
        const object = this.state.data['object']
        const variant = this.get_variant_item(item['ipfs']['variant'], object)
        const index = this.state.data['index']
        return(
            <div>
                {this.render_selected_variant(variant)}
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'size':'l', 'title':this.get_senders_name4(item['event'].returnValues.p2/* sender_acc_id */, object), 'details':this.props.app_state.loc['2642n']/* Bid Author */ })}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'size':'l', 'title':this.get_time_diff(object['ipfs'].auction_expiry_time - Date.now()/1000), 'details':''+(new Date(item['event'].returnValues.p6/* timestamp */*1000)) })}
                <div style={{height: 10}}/>
                {this.render_bid_amounts(item['ipfs']['bid_data'], object['e5'])}
            </div>
        )
    }

    get_senders_name4(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var obj = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
            var alias = (obj[sender] == null ? sender : obj[sender])
            return alias
        }
    }

    get_variant_item(variant_id, object){
        return object['ipfs'].variants.find(e => e['variant_id'] == variant_id)
    }

    render_selected_variant(item){
        return(
            <div>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 0px 5px','border-radius': '13px' }}>
                    {this.render_detail_item('4', {'text':item['variant_description'], 'textsize':'13px', 'font':this.props.app_state.font})}
                    <div style={{height:3}}/>
                    <div style={{padding:'0px 0px 0px 10px'}}>
                        {this.render_detail_item('9', item['image_data']['data'])}
                    </div>
                </div>
            </div>
        )
    }

    render_bid_amounts(items, e5){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3076f']/* 'Set Bid Amounts.' */, 'details':this.props.app_state.loc['2642o']/* The amounts set by the author of the bid. */, 'size':'l'})}
                <div style={{height:10}}/>
                {items.map((item, index) => (
                    <div style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']],})}
                        </div>
                    </div>
                ))}
            </div>
        )
    }













    render_manual_transaction_broadcast_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_manual_transaction_broadcast_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_manual_transaction_broadcast_data()}
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
                        {this.render_manual_transaction_broadcast_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_manual_transaction_broadcast_data(){
        const coins = this.props.app_state.coins
        const item = coins[this.state.data['chain']]
        const raw = this.state.data['hash']
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055dt']/* 'Auto Broadcast Unsuccessful.' */, 'details':this.props.app_state.loc['3055du']/* ''e was unable to broadcast your transaction, probably due to rate limits. However, you can manually post your transaction using the link provided below.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('8', item['label'])}
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055dv']/* 'Transaction Hash.' */, 'details':this.props.app_state.loc['3055dw']/* 'Just copy the hex data shown below, then use the link provided below the button to broadcast the transaction.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('4', {'text':raw, 'textsize':'11px', 'font':this.props.app_state.font})}
                <div style={{height: 10}}/>
                <div onClick={()=> this.copy_hex_to_clipboard(raw)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055dx']/* 'Copy Hex' */, 'action':''},)}
                </div>

                {this.render_detail_item('0')}
                {this.render_detail_item('4', {'text':'https://blockchair.com/broadcast', 'textsize':'11px', 'font':this.props.app_state.font})}

            </div>
        )
    }

    copy_hex_to_clipboard(text){
        navigator.clipboard.writeText(text)
        this.props.notify(this.props.app_state.loc['3055dy']/* 'Hex copied to Clipboard' */, 1600)
    }









    render_confirm_new_wallet_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_confirm_new_wallet_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_confirm_new_wallet_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
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
                        {this.render_confirm_new_wallet_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(2)}
                    </div>
                </div>
                
            )
        }
    }

    render_confirm_new_wallet_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055dz']/* 'Confirm Switch Wallets' */, 'details':this.props.app_state.loc['3055ea']/* 'Are you sure you wish to set this wallet? The transactions you stacked with your previous wallet will be deleted.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <div onClick={()=> this.props.set_new_wallet(this.state.data)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2507j']/* 'Continue' */, 'action':''},)}
                </div>
            </div>
        )
    }









    render_create_edit_moderator_note_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_create_edit_moderator_note_data()}
                    {this.render_detail_item('0')}
                    {this.render_create_edit_moderator_note_data2()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_create_edit_moderator_note_data()}
                        <div style={{height:10}}/>
                        {this.render_empty_views(2)}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_create_edit_moderator_note_data2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_create_edit_moderator_note_data()}
                        <div style={{height:10}}/>
                        {this.render_empty_views(2)}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_create_edit_moderator_note_data2()}
                    </div>
                </div>
            )
        }
    }

    render_create_edit_moderator_note_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1593ia']/* Activation 'Keywords' */, 'details':this.props.app_state.loc['1593ib']/* 'Specify one or more keywords or phrases that should activate the note.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div className="row" style={{width:'100%'}}>
                    <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1593ic']/* 'Keyword or Phrase...' */} when_text_input_field_changed={this.when_note_keyword_input_field_changed.bind(this)} text={this.state.keyword_text} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 10px 0px 0px'}} onClick={()=>this.add_keyword_to_staged_note()}>
                        <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                            <img alt="" className="text-end" src={this.props.theme['add_text']} style={{height:37, width:'auto'}}/>
                        </div>
                    </div>
                </div>
                <div style={{height:10}}/>
                {this.render_staged_keywords()}

                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1593ie']/* Note Message.' */, 'details':this.props.app_state.loc['1593if']/* 'Specify the message to display in posts containing the keywords specified above.' */, 'size':'l'})}
                <div style={{height:10}}/>

                <TextInput font={this.props.app_state.font} height={70} placeholder={this.props.app_state.loc['1593ig']/* 'Message...' */} when_text_input_field_changed={this.when_moderator_note_message_input_field_changed.bind(this)} text={this.state.moderator_note_message} theme={this.props.theme}/>
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']+(this.props.app_state.moderator_note_max_length - this.state.moderator_note_message.length)})}
                



                
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1593il']/* Application Filter' */, 'details':this.props.app_state.loc['1593im']/* 'With all-words, the note will show when all the specified keywords are present, and one-word, at least one keyword should exist in the post.' */, 'size':'l'})}
                
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_keyword_target_type_object} tag_size={'l'} when_tags_updated={this.get_keyword_target_type_object_updated.bind(this)} theme={this.props.theme} app_state={this.props.app_state}/>


                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055ei']/* Attach File.' */, 'details':this.props.app_state.loc['3055ej']/* 'You can also attach one or more files to be shown below the note.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_add_media_ui_buttons_part()}
                <div style={{height:5}}/>
                {this.render_files_part()}
            </div>
        )
    }

    render_create_edit_moderator_note_data2(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055ef']/* Application Time.' */, 'details':this.props.app_state.loc['3055eg']/* 'Set the time after which the note will be no longer visible.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], }, })}>
                    <CssBaseline />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_new_dat_time_value_set(newValue)}/>
                    </LocalizationProvider>
                </ThemeProvider>

                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.get_time_diff(this.state.visibility_end_time - Date.now()/1000), 'details':this.props.app_state.loc['3055eh']/* 'Set Note Expiry Time.' */, 'size':'l'})}

                <div style={{height:10}}/>
                <div onClick={()=>this.set_maximum_time()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1593iz']/* 'Set Maximum Time.' */, 'action': ''})}
                </div>

                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055gj']/* Add Moderator Note.' */, 'details':this.props.app_state.loc['3055gk']/* 'Add the note to your moderator notes.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={() => this.add_moderator_note()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1593ih']/* 'Add Note' */, 'action':''})}
                </div>
            </div>
        )
    }

    when_new_dat_time_value_set(value){
        const selectedDate = value instanceof Date ? value : new Date(value);
        const timeInSeconds = Math.floor(selectedDate.getTime() / 1000);
        this.setState({visibility_end_time: timeInSeconds})
    }

    set_maximum_time(){
        const forever_time = Date.now() + (1000*60*60*24*365*10000)
        this.setState({visibility_end_time: forever_time})
    }

    when_note_keyword_input_field_changed(text){
        this.setState({keyword_text: text})
    }

    add_keyword_to_staged_note(){
        var keyword_text = this.state.keyword_text.trim()

        if(keyword_text == ''){
            this.props.notify(this.props.app_state.loc['1593du']/* 'Type something first.' */, 4000)
        }
        else if(this.state.staged_keywords_for_new_note.includes(keyword_text)){
            this.props.notify(this.props.app_state.loc['1593id']/* 'Youve already staged that keyword or phrase.' */, 4000)
        }
        else if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(keyword_text) /* || /\p{Emoji}/u.test(typed_word) */){
            this.props.notify(this.props.app_state.loc['162m'], 4400)/* You cant use special characters. */
        }
        else{
            var clone = this.state.staged_keywords_for_new_note.slice()
            clone.push(keyword_text)
            this.setState({staged_keywords_for_new_note: clone, keyword_text:'' })
        }
    }

    render_staged_keywords(){
        var items = [].concat(this.state.staged_keywords_for_new_note)
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
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={() => this.remove_staged_keyword(item)}>
                                {this.render_detail_item('4', {'text':item, 'textsize':'13px', 'font':this.props.app_state.font})} 
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    remove_staged_keyword(item){
        var clone = this.state.staged_keywords_for_new_note.slice()
        const index = clone.indexOf(item)
        if(index != -1){
            clone.splice(index, 1)
            this.setState({staged_keywords_for_new_note: clone})
        }
    }

    when_moderator_note_message_input_field_changed(text){
        if(text.length <= this.props.app_state.moderator_note_max_length) this.setState({moderator_note_message: text});
    }

    get_keyword_target_type_object_updated(tag_obj){
        this.setState({get_keyword_target_type_object: tag_obj})
    }

    render_add_media_ui_buttons_part(){
        return(
            <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '7px 5px 10px 10px', width: '99%'}}>
                <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px', 'margin':'0px 10px 0px 0px'}}>
                    <img alt="" src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} onClick={() => this.props.show_pick_file_bottomsheet('image', 'create_image', 10**16)}/>
                </div>

                <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px', 'margin':'0px 10px 0px 0px'}}>
                    <img alt="" src={this.props.app_state.static_assets['pdf_icon']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute', 'border-radius': '50%'}} onClick={() => this.props.show_pick_file_bottomsheet('pdf', 'create_pdf', 10**16)}/>
                </div>

                <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px', 'margin':'0px 10px 0px 0px'}}>
                    <img alt="" src={this.props.app_state.static_assets['music_label']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute', 'border-radius': '50%'}} onClick={() => this.props.show_pick_file_bottomsheet('audio', 'create_audio_pick_audio_file', 10**16)}/>
                </div>

                <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px', 'margin':'0px 10px 0px 0px'}}>
                    <img alt="" src={this.props.app_state.static_assets['video_label']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute', 'border-radius': '50%'}} onClick={() => this.props.show_pick_file_bottomsheet('video', 'create_video_pick_video_file', 10**16)}/>
                </div>

                <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px', 'margin':'0px 10px 0px 0px'}}>
                    <img alt="" src={this.props.app_state.static_assets['zip_file']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute', 'border-radius': '50%'}} onClick={() => this.props.show_pick_file_bottomsheet('zip', 'create_zip', 10**16)}/>
                </div>

            </div>
        )
    }

    when_files_picked = async (files) => {
        var clonedArray = this.state.entered_file_objects == null ? [] : this.state.entered_file_objects.slice();
        var clone = structuredClone(this.state.entered_video_object_dimensions)
        var cloned_ecid_encryption_passwords = this.state.ecid_encryption_passwords == null ? {} : structuredClone(this.state.ecid_encryption_passwords)
        files.forEach(file => {
            if(!clonedArray.includes(file)){
                clonedArray.push(file);

                var ecid_obj = this.get_cid_split(file)
                if(this.props.app_state.uploaded_data[ecid_obj['filetype']] != null){
                    var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
                    if(data['width'] != null && data['height'] != null){
                        clone[file] = {'width': data['width'], 'height': data['height']}
                    }
                }
            }
        });
        for(var f=0; f<files.length; f++){
            const file = files[f]
            cloned_ecid_encryption_passwords[file] = await this.props.get_ecid_file_password_if_any(file)
        }
        this.setState({entered_file_objects: clonedArray, entered_video_object_dimensions: clone, ecid_encryption_passwords: cloned_ecid_encryption_passwords});
    }

    render_files_part(){
        var items = [].concat(this.state.entered_file_objects)
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
        }
        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_uploaded_file_item_clicked(item, index)}>
                            {this.render_uploaded_file(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    when_uploaded_file_item_clicked(item, index){
        var cloned_array = this.state.entered_file_objects.slice()
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }

        this.setState({entered_file_objects: cloned_array})
    }

    render_uploaded_file(item, index){
        var ecid_obj = this.get_cid_split(item)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        const minified = false;
        
        if(data != null){
            if(data['type'] == 'image'){
                var img = data['data']
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */
                var title = data['name']
                var size = 'l'
                if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    size = 's'
                }
                return(
                    <div>
                        {this.render_detail_item('8', {'details':details,'title':title, 'size':size, 'image':img, 'border_radius':'15%'})}
                    </div>
                )
            }
            else if(data['type'] == 'audio'){
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
                var title = data['name']
                var size = 'l'
                var thumbnail = data['thumbnail'] == '' ? this.props.app_state.static_assets['music_label'] : data['thumbnail']
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
            else if(data['type'] == 'video'){
                var video = data['data']
                var font_size = ['15px', '12px', 19];
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */
                var title = data['name']
                var video_height = "50"
                if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    font_size = ['12px', '10px', 16];
                    video_height = "40"
                }

                if(this.props.app_state.video_thumbnails[ecid_obj['full']] != null){
                    var thumbnail = this.props.app_state.video_thumbnails[ecid_obj['full']]
                    return(
                        <div>
                            {this.render_detail_item('8', {'title':title,'details':details, 'size':size, 'image':thumbnail, 'border_radius':'15%', 'image_width':'auto'})}
                        </div>
                    )
                }else{
                    var thumbnail = this.props.app_state.static_assets['video_label']
                    return(
                        <div>
                            {this.render_detail_item('8', {'title':title,'details':details, 'size':size, 'image':thumbnail, 'border_radius':'15%', 'image_width':'auto'})}
                        </div>
                    )
                }
            }
            else if(data['type'] == 'pdf'){
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
            else if(data['type'] == 'zip'){
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
                var title = data['name']
                var size = 'l'
                var thumbnail = this.props.app_state.static_assets['zip_file']
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
            else if(data['type'] == 'lyric'){
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
                var title = data['name']
                var size = 'l'
                var thumbnail = this.props.app_state.static_assets['lyric_icon']
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
            else if(data['type'] == 'subtitle'){
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
                var title = data['name']
                var size = 'l'
                var thumbnail = this.props.app_state.static_assets['subtitle_icon']
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

    add_moderator_note(){
        const moderator_note_message = this.state.moderator_note_message.trim()
        const keywords = this.state.staged_keywords_for_new_note
        const application_type = this.get_selected_item(this.state.get_keyword_target_type_object, 'e') == this.props.app_state.loc['1593ij']/* 'all-words' */ ? 'all': 'one'
        const note_id = this.state.moderator_note_id == '' ? makeid(16) : this.state.moderator_note_id
        const visibility_end_time = this.state.visibility_end_time
        const entered_file_objects = this.state.entered_file_objects
        const entered_video_object_dimensions = this.state.entered_video_object_dimensions
        const ecid_encryption_passwords = this.state.ecid_encryption_passwords

        if(moderator_note_message == ''){
            this.props.notify(this.props.app_state.loc['1593du']/* 'Type something first.' */, 4000)
        }
        else if(keywords.length == 0){
            this.props.notify(this.props.app_state.loc['1593ii']/* 'You need to specify your targeted keywords.' */, 4000)
        }
        else if(visibility_end_time < (Date.now()/1000)+(60*60)){
            this.props.notify(this.props.app_state.loc['1593iy']/* 'You cant set a visibility expiry time thats less than an hour from now.' */, 4000)
        }
        else{
            const creator = this.props.app_state.selected_e5+':'+this.props.app_state.user_account_id[this.props.app_state.selected_e5]
            const note_obj = {
                'message':moderator_note_message,
                'keywords':keywords,
                'type':application_type, 
                'id':note_id,
                'author':creator,
                'visibility_end_time':visibility_end_time,
                'entered_file_objects':entered_file_objects,
                'entered_video_object_dimensions':entered_video_object_dimensions,
                'ecid_encryption_passwords':ecid_encryption_passwords,
            }
            this.props.notify(this.props.app_state.loc['1593in']/* 'The note will be shown after your next run.' */, 5000)
            this.props.add_moderator_note(note_obj)
            this.setState({moderator_note_message: '', staged_keywords_for_new_note:[], moderator_note_id:'', get_keyword_target_type_object:this.get_keyword_target_type_object(), keyword_text:'', entered_file_objects: [], entered_video_object_dimensions: {}, ecid_encryption_passwords:{},})
        }
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }













    render_export_direct_purchases_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_export_direct_purchases_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_export_direct_purchases_data()}
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
                        {this.render_export_direct_purchases_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_export_direct_purchases_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2642v']/* 'Export Direct Purchase Info.' */, 'details':this.props.app_state.loc['2642w']/* 'Export all the direct purchase information from a certain date and time.' */, 'size':'l'})}
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['2642y']/* Filter Time.' */, 'details':this.props.app_state.loc['2642z']/* 'Set the date and time after which a given direct purchase event will be included in the export.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], }, })}>
                    <CssBaseline />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_new_export_date_time_value_set(newValue)}/>
                    </LocalizationProvider>
                </ThemeProvider>

                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.get_time_diff((Date.now()/1000) - this.state.export_start_time), 'details':this.props.app_state.loc['2642ba']/* 'Filter Start Time.' */, 'size':'l'})}

                <div style={{height:10}}/>
                <div onClick={()=> this.when_export_direct_purchases()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2214bd']/* 'Export' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_new_export_date_time_value_set(value){
        const selectedDate = value instanceof Date ? value : new Date(value);
        const timeInSeconds = Math.floor(selectedDate.getTime() / 1000);
        this.setState({export_start_time: timeInSeconds})
    }

    when_export_direct_purchases(){
        const storefront_item = this.state.data['object']
        const export_start_time = this.state.export_start_time

        if(export_start_time > (Date.now()/1000) - (60*5)){
            this.props.notify(this.props.app_state.loc['2642bb']/* You can only filter for before 5 minutes or more. */, 4000)
        }
        else{
            this.props.export_direct_purchases(storefront_item, export_start_time)
        }
    }










    render_access_logs_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_access_logs_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_access_logs_data()}
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
                        {this.render_access_logs_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
            )
        }
    }

    render_access_logs_data(){
        const object = this.state.data['object']
        const telemetry_data = this.props.app_state.nitro_telemetry_data_object[object['e5_id']]
        const logs = telemetry_data['access_info'].split('\n')
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['c2527dq']/* Raw Access Logs' */, 'details':this.props.app_state.loc['c2527dr']/* 'The raw access logs are shown below.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_logs(logs)}
            </div>
        )
    }

    render_logs(items){
        if(items.length == 0){
            items = [0, 1, 2]
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }else{
            return(
                <div>
                    {items.map((item, index) => (
                        <div key={index}>
                            {this.render_log_item(item)} 
                        </div>
                    ))}
                </div>
            )
        }
    }

    render_log_item(item){
        var parts = item.trim().split(/\s+/);
        if (parts.length >= 9) {
            const entry = {
                user: parts[0],
                terminal: parts[1],
                host: parts[2],
                day: parts[3],
                month: parts[4],
                date: parts[5],
                loginTime: parts[6],
                logoutTime_Still_Online: parts[8],
            };
            if(parts.length >= 10){
                entry.duration = parts[9]
            }
            return(
                <div>
                    {this.render_detail_item('3', {'title':entry.user, 'details':this.props.app_state.loc['3055ek']/* 'Accessing User' */, 'size':'l'})}
                    <div style={{height:3}}/>
                    {this.render_detail_item('3', {'title':entry.terminal, 'details':this.props.app_state.loc['3055el']/* 'Access Terminal' */, 'size':'l'})}
                    <div style={{height:3}}/>
                    {this.render_detail_item('3', {'title':entry.host, 'details':this.props.app_state.loc['3055em']/* 'Host IP Address' */, 'size':'l'})}
                    <div style={{height:3}}/>
                    {this.render_detail_item('3', {'title':entry.day+', '+entry.month+' '+entry.date, 'details':this.props.app_state.loc['3055en']/* 'Access Date' */, 'size':'l'})}
                    <div style={{height:3}}/>
                    {this.render_detail_item('3', {'title':entry.loginTime, 'details':this.props.app_state.loc['3055eo']/* 'Log-In Time (UTC)' */, 'size':'l'})}
                    <div style={{height:3}}/>
                    {this.render_still_logged_in_or_logged_out_time(entry)}
                    {this.render_detail_item('0')}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('4', {'text':item, 'textsize':'14px', 'font':this.props.app_state.font})} 
                    <div style={{height:5}}/>
                </div>
            )
        }
    }

    render_still_logged_in_or_logged_out_time(entry){
        if(entry.duration == null){
            //still logged in
            return(
                <div>
                    {this.render_detail_item('3', {'title':entry.logoutTime_Still_Online, 'details':this.props.app_state.loc['3055ep']/* 'Logged-Out Time (UTC)' */, 'size':'l'})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':entry.logoutTime_Still_Online, 'details':this.props.app_state.loc['3055ep']/* 'Logged-Out Time (UTC)' */, 'size':'l'})}
                    <div style={{height:3}}/>
                    {this.render_detail_item('3', {'title':entry.duration, 'details':this.props.app_state.loc['3055eq']/* 'Duration Logged On' */, 'size':'l'})}
                </div>
            )
        }
    }









    render_error_logs_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_error_logs_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_error_logs_data()}
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
                        {this.render_error_logs_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
            )
        }
    }

    render_error_logs_data(){
        const object = this.state.data['object']
        const file = this.state.data['file']
        const time = this.state.data['time']
        const reference_id = object['e5_id'] + file
        const log_data = this.props.app_state.nitro_error_log_data_object[reference_id]
        if(log_data == null){
            return(
                <div>
                    {this.render_detail_item('4', {'text':this.props.app_state.loc['c2527dw']/* 'e is loading the logs for you...' */, 'textsize':'14px', 'font':this.props.app_state.font})}
                    <div style={{height:10}}/>
                    {this.render_empty_views(2)}
                </div>
            )
        }
        return(
            <div>
                {this.render_detail_item('3', {'title':''+new Date(time).toLocaleString(), 'details':this.props.app_state.loc['c2527dv']/* 'The files logs are shown below.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_detail_item('4', {'text':log_data, 'textsize':'14px', 'font':this.props.app_state.font})} 
            </div>
        )
    }









    render_view_link_options_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_view_link_options_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_view_link_options_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
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
                        {this.render_view_link_options_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_view_link_options_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055er']/* 'Open Via Iframe' */, 'details':this.props.app_state.loc['3055es']/* 'Open the link inside e using an iframe.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <div onClick={()=> this.props.open_link(this.state.data['link'], this.props.app_state.loc['1593jl']/* 'iframe' */)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055et']/* 'Open Iframe' */, 'action':''},)}
                </div>

                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055eu']/* 'Open in Browser' */, 'details':this.props.app_state.loc['3055ev']/* 'Open the link in a new tab in your browser.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <div onClick={()=> this.props.open_link(this.state.data['link'], this.props.app_state.loc['1593jm']/* 'browser' */)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055ew']/* 'Open Browser' */, 'action':''},)}
                </div>
            </div>
        )
    }









    render_vote_wait_options_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_vote_wait_options_data()}
                    {this.render_detail_item('0')}
                    {this.render_vote_wait_options_proposals()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_vote_wait_options_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_vote_wait_options_proposals()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_vote_wait_options_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_vote_wait_options_proposals()}
                    </div>
                </div>
                
            )
        }
    }

    render_vote_wait_options_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055fa']/* 'Select Vote' */, 'details':this.props.app_state.loc['3055fb']/* 'Specify the vote that will be applied to all the proposals listed.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <Tags font={this.props.app_state.font} page_tags_object={this.state.new_vote_tags_object} tag_size={'l'} when_tags_updated={this.when_new_vote_tags_object_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055fi']/* 'Include Bounties.' */, 'details':this.props.app_state.loc['3055fj']/* 'Collect End and Spend bounties from the proposal objects.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_collect_bounties_tags_object} tag_size={'l'} when_tags_updated={this.when_get_collect_bounties_tags_object_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055fc']/* 'Bundle Limit' */, 'details':this.props.app_state.loc['3055fd']/* 'Specify the number of proposal vote transactions that will be bundled together as one transaction. The default is set to 10.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['3055fc']/* 'Bundle Limit' */, 'subtitle':'e0', 'barwidth':this.get_number_width(this.state.vote_tx_bundle_size), 'number':`${number_with_commas(this.state.vote_tx_bundle_size)}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['3055fe']/* 'transactions' */, })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={999} when_number_picker_value_changed={this.when_vote_tx_bundle_size.bind(this)} theme={this.props.theme} power_limit={63} decimal_count={0} pick_with_text_area={true}/>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055ff']/* 'Vote In All' */, 'details':this.props.app_state.loc['3055fy']/* 'Vote in all the selected proposals.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <div onClick={()=>this.vote_in_all_proposals()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055ff']/* 'Vote In All' */, 'action':''})}
                </div>

            </div>
        )
    }

    when_vote_tx_bundle_size(number){
        this.setState({vote_tx_bundle_size: number})
    }

    when_new_vote_tags_object_updated(tag_obj){
        this.setState({new_vote_tags_object: tag_obj})
    }

    when_get_collect_bounties_tags_object_updated(tag_obj){
        this.setState({get_collect_bounties_tags_object: tag_obj})
    }

    render_vote_wait_options_proposals(){
        const items = this.state.data['selected_proposals']
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055ey']/* 'Active Proposals.' */, 'details':this.props.app_state.loc['3055ez']/* 'The vote you select will be applied to the proposals listed below. Tap a proposal to ignore it in the final list.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <div style={{maxHeight: '600px', overflow: 'auto'}}>
                    {items.map((item, index) => (
                        <div style={{'padding':'5px'}}>
                            {this.render_proposal_object(item, index)}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    render_proposal_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_proposal_item(object)
        var alpha = this.state.ignore_vote_wait_proposals.includes(object['e5_id']) ? 0.6 : 1.0
        if(this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */){
            return(
                <div style={{'opacity':alpha}} onClick={() => this.when_vote_wait_proposal_item_clicked(index, object)}>
                    {this.render_detail_item('3', item['min'])}
                </div>
            )
        }
        return(
            <div style={{'opacity':alpha, height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_vote_wait_proposal_item_clicked(index, object)}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_vote_wait_proposal_item_clicked(index, object)}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    when_vote_wait_proposal_item_clicked(index, object){
        var clone = this.state.ignore_vote_wait_proposals.slice()
        const pos = clone.indexOf(object['e5_id'])
        if(pos == -1){
            clone.push(object['e5_id'])
        }else{
            clone.splice(pos, 1)
        }
        this.setState({ignore_vote_wait_proposals: clone})
    }

    vote_in_all_proposals(){
        const ignore_vote_wait_proposals = this.state.ignore_vote_wait_proposals
        const unfiltered_items = this.state.data['selected_proposals']
        const items = unfiltered_items.filter(function (object) {
            return (!ignore_vote_wait_proposals.includes(object['e5_id']))
        })
        const vote_tx_bundle_size = this.state.vote_tx_bundle_size
        const new_vote_tags_object = this.state.new_vote_tags_object
        const collect_bounties = this.get_selected_item(this.state.get_collect_bounties_tags_object, 'e') == this.props.app_state.loc['3055fk']/* 'collect' */

        if(vote_tx_bundle_size < 1 || vote_tx_bundle_size > 999){
            this.props.notify(this.props.app_state.loc['3055fh']/* That bundle limit is invalid. */, 2300)
            return;
        }
        else if(items.length == 0){
            this.props.notify(this.props.app_state.loc['3055fq']/* You cant ignore all the proposals. */, 2300)
            return;
        }

        var e5s = this.props.app_state.e5s['data']
        for (let i = 0; i < e5s.length; i++) {
            const e5 = e5s[i]
            const e5_items = items.filter(function (object) {
                return (e5 == object['e5'])
            })
            if(e5_items.length > 0){
                const chunks = this.splitIntoChunks(e5_items, vote_tx_bundle_size)
                chunks.forEach(chunk => {
                    const obj = {
                        selected: 0, id:makeid(8), type:this.props.app_state.loc['3055fg']/* 'vote_all' */, proposal_items:chunk, entered_indexing_tags:[this.props.app_state.loc['796']/* 'vote' */, this.props.app_state.loc['797']/* 'proposal' */],
                        new_vote_tags_object: new_vote_tags_object, collect_bounties, e5
                    }
                    this.props.add_vote_proposals_action_to_stack(obj)
                });
            }
        }

        this.props.finish_add_vote_proposals_action_to_stack()
        this.props.notify(this.props.app_state.loc['18']/* 'transaction added to stack' */, 1700);
    }

    splitIntoChunks(arr, chunkSize) {
        const result = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
        }
        return result;
    }












    render_hide_audiopost_confirmation_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_hide_audiopost_confirmation_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_hide_audiopost_confirmation_data()}
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
                        {this.render_hide_audiopost_confirmation_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_hide_audiopost_confirmation_data(){
        const songs_to_hide = this.state.data['songs_to_hide']
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055fr']/* 'Hide Tracks in Audiopost' */, 'details':this.props.app_state.loc['3055fs']/* 'Select the tracks you wish to hide from your collection.' */, 'size':'l'})}

                {this.render_detail_item('0')}
                {songs_to_hide.map((item, index) => (
                    <div key={index}>
                        {this.render_song(item)} 
                        <div style={{height:5}}/>
                    </div>
                ))}

                <div style={{height: 10}}/>
                <div onClick={()=> this.confirm_hide_audiopost()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055ft']/* 'Confirm' */, 'action':''},)}
                </div>
            </div>
        )
    }

    render_song(item){
        var explicit_selection = item['explicit'] == null ? 0 : this.get_selected_item2(item['explicit'], 'e')
        var explicit_text = explicit_selection == 1 ? '🅴 ' : ''
        var song_title = explicit_text + item['song_title']
        var song_details = item['song_composer']
        var opacity = this.state.songs_to_hide_while_showing.includes(item['song_id']) ? 0.6 : 1.0
        return(
            <div style={{'opacity':opacity}} onClick={() => this.when_song_to_hide_tapped(item)}>
                {this.render_detail_item('3', {'title':song_title, 'details':song_details, 'size':'l'})}
            </div>
        )
    }

    when_song_to_hide_tapped(item){
        var clone = this.state.songs_to_hide_while_showing.slice()
        const index = clone.indexOf(item['song_id'])
        if(index == -1){
            clone.push(item['song_id'])
        }else{
            clone.splice(index, 1)
        }
        this.setState({songs_to_hide_while_showing: clone})
    }

    auto_select_tracks_already_hidden(data){
        const object = data['object']
        const hidden_object_data = this.props.app_state.hidden_audioposts[object['e5_id']]
        if(hidden_object_data != null){
            const hidden_songs = hidden_object_data['song_ids']
            const clone = this.state.songs_to_hide_while_showing.slice()
            hidden_songs.forEach(item => {
                clone.push(item)
            });
            this.setState({songs_to_hide_while_showing: clone})
        }
    }

    confirm_hide_audiopost(){
        const object = this.state.data['object']
        const songs_to_hide = this.state.data['songs_to_hide']
        const songs_to_hide_while_showing = this.state.songs_to_hide_while_showing
        const final_songs_to_hide = songs_to_hide.filter(function (song) {
            return (songs_to_hide_while_showing.includes(song['song_id']))
        })
        this.props.hide_audiopost_tracks(object, final_songs_to_hide, songs_to_hide)
    }











    render_hide_videopost_confirmation_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_hide_videopost_confirmation_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_hide_videopost_confirmation_data()}
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
                        {this.render_hide_videopost_confirmation_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_hide_videopost_confirmation_data(){
        const videos_to_hide = this.state.data['videos_to_hide']
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055fu']/* 'Hide Tracks in Videopost' */, 'details':this.props.app_state.loc['3055fv']/* 'Select the videos you wish to hide from your collection.' */, 'size':'l'})}

                {this.render_detail_item('0')}
                {videos_to_hide.map((item, index) => (
                    <div key={index}>
                        {this.render_video(item)} 
                        <div style={{height:5}}/>
                    </div>
                ))}

                <div style={{height: 10}}/>
                <div onClick={()=> this.confirm_hide_videopost()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055ft']/* 'Confirm' */, 'action':''},)}
                </div>
            </div>
        )
    }

    render_video(item){
        var video_file = item['video']
        var ecid_obj = this.get_cid_split(video_file)
        var opacity = this.state.videos_to_hide_while_showing.includes(item['video_id']) ? 0.6 : 1.0
        if(this.props.app_state.video_thumbnails[ecid_obj['full']] != null){
            var thumbnail = this.props.app_state.video_thumbnails[ecid_obj['full']]
            return(
                <div onClick={() => this.when_video_to_hide_tapped(item)} style={{'opacity':opacity}}>
                    {this.render_detail_item('8', {'details':item['video_composer'],'title':item['video_title'], 'size':'l', 'image':thumbnail, 'border_radius':'9px', 'image_width':'auto'})}
                </div>
            )
        }
        return(
            <div onClick={() => this.when_video_to_hide_tapped(item)} style={{'opacity':opacity}}>
                {this.render_detail_item('3', {'details':item['video_composer'], 'title':item['video_title'], 'size':'l'})}
            </div>
        )
    }

    when_video_to_hide_tapped(item){
        var clone = this.state.videos_to_hide_while_showing.slice()
        const index = clone.indexOf(item['video_id'])
        if(index == -1){
            clone.push(item['video_id'])
        }else{
            clone.splice(index, 1)
        }
        this.setState({videos_to_hide_while_showing: clone})
    }

    auto_select_videos_already_hidden(data){
        const object = data['object']
        const hidden_object_data = this.props.app_state.hidden_videoposts[object['e5_id']]
        if(hidden_object_data != null){
            const hidden_videos = hidden_object_data['video_ids']
            const clone = this.state.videos_to_hide_while_showing.slice()
            hidden_videos.forEach(item => {
                clone.push(item)
            });
            this.setState({videos_to_hide_while_showing: clone})
        }
    }

    confirm_hide_videopost(){
        const object = this.state.data['object']
        const videos_to_hide = this.state.data['videos_to_hide']
        const videos_to_hide_while_showing = this.state.videos_to_hide_while_showing
        const final_videos_to_hide = videos_to_hide.filter(function (video) {
            return (videos_to_hide_while_showing.includes(video['video_id']))
        })
        this.props.hide_videopost_tracks(object, final_videos_to_hide, videos_to_hide)
    }










    render_select_my_locations_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_select_my_locations_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_select_my_locations_data()}
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
                        {this.render_select_my_locations_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_select_my_locations_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055fz']/* 'Select From My Locations.' */, 'details':this.props.app_state.loc['3055ga']/* 'You can select the default delivery pins you set in the stack page.' */, 'size':'l'})}
                {this.render_selected_pins2()}
                {this.render_detail_item('0')}
                <div onClick={()=> this.props.return_selected_pins(this.state.selected_pins)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['535bk']/* Add From Saved */, 'action':''})}
                </div>
            </div>
        )
    }

    render_selected_pins2(){
        var items = [].concat(this.props.app_state.default_location_pins)
        if(items.length == 0){
            items = [1, 2, 3]
            return(
                <div>
                    <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                        <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                            {items.map((item, index) => (
                                <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                    {this.render_empty_horizontal_list_item2()}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }
        return(
            <div>
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_pin_item2(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    render_pin_item2(item){
        const title = item['id']
        const details = item['description'] == '' ? this.props.app_state.loc['284q']/* 'latitude: $, longitude: %' */.replace('$', item['lat']).replace('%', item['lng']) : this.truncate(item['description'], 17)
        const alpha = this.does_pin_exist(item) ? 0.6 : 1.0
        return(
            <div style={{'opacity':alpha}} onClick={() => this.when_pin_item_clicked(item)}>
                {this.render_detail_item('3', {'title':title, 'details':details, 'size':'s'})}
            </div>
        )
    }

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }

    does_pin_exist(focused_pin){
        const index = this.state.selected_pins.findIndex(pin => (pin['lat'] == focused_pin['lat'] && pin['lng'] == focused_pin['lng']));
        return index != -1;
    }

    when_pin_item_clicked(focused_pin){
        const clone = this.state.selected_pins.slice()
        const index = clone.findIndex(pin => (pin['lat'] == focused_pin['lat'] && pin['lng'] == focused_pin['lng']));
        if(index != -1){
            clone.splice(index, 1)
        }
        else{
            clone.push(focused_pin)
        }
        this.setState({selected_pins: clone})
    }












    render_transfer_alias_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_transfer_alias_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_transfer_alias_data()}
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
                        {this.render_transfer_alias_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_transfer_alias_data(){
        const item = this.state.data['item']
        const alias = item['alias']
        const obj2 = this.props.app_state.alias_timestamp[this.props.app_state.selected_e5] || {}
        const alias_age = (obj2[alias] == null ? 0 : obj2[alias])
        const time_to_expiry = alias_age+(72*52*7*24*60*60)
        const difference = time_to_expiry - (Date.now()/1000)
        const time_diff_text = this.get_time_diff(difference)
        const show_renew_button = difference < (52*7*24*60*60) && alias_age != 0

        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055gb']/* 'Transfer Alias.' */, 'details':this.props.app_state.loc['3055gc']/* 'Change ownership of your alias by transferring it to another account.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':''+item['alias'], 'details':this.props.app_state.loc['1593']/* 'Reserved ' */+this.get_time_difference(item['event'].returnValues.p6)+' ago', 'size':'s'})}
                <div style={{height: 5}}/>
                {this.render_detail_item('10', {'text':this.props.app_state.loc['3055gi']/* 'The recipient would be required to re-alias this name to activate it.' */, 'textsize':'10px', 'font':this.props.app_state.font})}
                {this.render_detail_item('0')}

                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3055gd']/* 'Recipient Account ID...' */} when_text_input_field_changed={this.when_typed_recipient_account_id_changed.bind(this)} text={this.state.typed_recipient_account_id} theme={this.props.theme}/>

                <div style={{height: 10}}/>
                <div onClick={()=> this.props.transfer_alias_transaction_to_stack(item, this.state.typed_recipient_account_id)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055ge']/* Transfer Alias */, 'action':''})}
                </div>

                {show_renew_button == true && (
                    <div>
                        {this.render_detail_item('0')}
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['3055jr']/* 'Renew Alias.' */, 'details':this.props.app_state.loc['3055js']/* 'Renew the alias for another 72 years of use.' */, 'size':'l'})}
                        {this.render_detail_item('10', {'text':this.props.app_state.loc['1593kz']/* 'Expires after $' */.replace('$', time_diff_text), 'textsize':'10px', 'font':this.props.app_state.font})}
                        <div style={{height: 10}}/>
                        <div onClick={()=> this.props.add_renew_alias_transaction_to_stack(alias)}>
                            {this.render_detail_item('5', {'text':this.props.app_state.loc['1593la']/* Renew Alias */, 'action':''})}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    when_typed_recipient_account_id_changed(text){
        if(isNaN(text) || text.includes('.')){
            return;
        }
        this.setState({typed_recipient_account_id: text})
    }









    render_confirm_emit_new_object_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_confirm_emit_new_object_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_confirm_emit_new_object_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
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
                        {this.render_confirm_emit_new_object_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_confirm_emit_new_object_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['284y']/* 'Confirm New Object.' */, 'details':this.props.app_state.loc['284z']/* 'Are you sure you want to log the object directly in the indexer? No official reference to it will be on a blockchain.' */, 'size':'l'})}
                {/* <div style={{height: 20}}/>
                {this.render_detail_item('4', {'text':this.props.app_state.loc['284bf']'Show object after broadcast is successful?', 'textsize':'13px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/> */}

                {/* <Tags font={this.props.app_state.font} page_tags_object={this.state.get_show_job_after_broadcasted_object} tag_size={'l'} when_tags_updated={this.when_get_show_job_after_broadcasted_object_updated.bind(this)} theme={this.props.theme}/> */}

                <div style={{height: 10}}/>
                <div onClick={()=> this.when_confirm_tapped()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['284ba']/* 'Confirm and Proceed' */, 'action':''},)}
                </div>
                
            </div>
        )
    }

    when_get_show_job_after_broadcasted_object_updated(tag_obj){
        this.setState({get_show_job_after_broadcasted_object: tag_obj})
    }

    when_confirm_tapped(){
        const show_job_after_broadcast = this.get_selected_item2(this.state.get_show_job_after_broadcasted_object, 'e') == 1

        this.props.emit_new_object_confirmed(this.state.data['state_object'], show_job_after_broadcast)
    }












    render_view_job_application_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_view_job_application_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_view_job_application_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
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
                        {this.render_view_job_application_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_view_job_application_data(){
        const item = this.state.data['item']
        const object = this.state.data['object']
        const items = item['price_data']
        var is_application_accepted = item['is_response_accepted'];
        if(is_application_accepted){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2498']/* 'Expiry time from now: ' */+this.get_expiry_time(item), 'details':''+(new Date(item['application_expiry_time'] * 1000).toLocaleString()), 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':''+(new Date(item['time']*1000).toLocaleString()), 'details':this.get_time_diff((Date.now()/1000) - (parseInt(item['time'])))+this.props.app_state.loc['1698a']/* ' ago' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2499']/* 'Contract ID: ' */+item['picked_contract_id'], 'details':this.props.app_state.loc['2500']/* 'Sender ID: ' */+item['applicant_id']+', '+this.get_senders_name5(item['applicant_id'], object), 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_payment_amounts(items, object)}
                    
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2501']/* 'Accepted' */, 'details':this.props.app_state.loc['2502']/* 'The job owner picked this application' */, 'size':'l'})}
                    {object['author'] == this.props.app_state.user_account_id[object['e5']] && (
                        <div>
                            <div style={{height: 10}}/>
                            <div onClick={() => this.view_contract(item, object)}>
                                {this.render_detail_item('5', {'text':this.props.app_state.loc['3055gl']/* 'View Contract' */, 'action':''},)}
                            </div>
                        </div>
                    )}

                    {this.render_finish_job_and_make_payment(item, object)}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2503']/* 'Expiry time from now: ' */+this.get_expiry_time(item), 'details':''+(new Date(item['application_expiry_time'] * 1000).toLocaleString()), 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':''+(new Date(item['time']*1000).toLocaleString()), 'details':this.get_time_diff((Date.now()/1000) - (parseInt(item['time'])))+this.props.app_state.loc['1698a']/* ' ago' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2504']/* 'Contract ID: ' */+item['picked_contract_id'], 'details':this.props.app_state.loc['2505']/* 'Sender ID: ' */+item['applicant_id']+', '+this.get_senders_name5(item['applicant_id'], object), 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_payment_amounts(items, object)}
                    <div style={{height:10}}/>

                    {object['author'] == this.props.app_state.user_account_id[object['e5']] && (
                        <div>
                            <div style={{height: 10}}/>
                            <div onClick={() => this.view_contract(item, object)}>
                                {this.render_detail_item('5', {'text':this.props.app_state.loc['3055gl']/* 'View Contract' */, 'action':''},)}
                            </div>
                        </div>
                    )}
                </div>
            )
        }
    }

    render_payment_amounts(items, object){
        return(
            <div style={{ 'padding': '0px 0px 0px 0px'}}>
                {items.map((pay_item, index) => (
                    <div style={{'padding': '3px 0px 3px 0px'}}>
                        <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+pay_item['id']], 'number':pay_item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[pay_item['id']]})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+pay_item['id']], 'subtitle':this.format_power_figure(pay_item['amount']), 'barwidth':this.calculate_bar_width(pay_item['amount']), 'number':this.format_account_balance_figure(pay_item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[pay_item['id']], })}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    view_contract(item, object){
        if(object['event'].returnValues.p5 == this.props.app_state.user_account_id[object['e5']]){
            this.props.open_dialog_bottomsheet()
            this.props.view_application_contract(item)
        }
    }

    render_finish_job_and_make_payment(item, object){
        if(this.props.app_state.user_account_id[item['e5']] != item['applicant_id'] && item['is_response_accepted'] == true){
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1632l']/* 'Finalize Transaction.' */, 'details':this.props.app_state.loc['1632m']/* 'Finish up by making the requested payments quoted and recording them on E5.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <div onClick={()=> this.finish_transaction(item, object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['1632n']/* 'Finalize And Finish' */, 'action':''},)}
                    </div>
                </div>
            )
        }
    }

    finish_transaction(item, object){
        if(!this.check_if_sender_has_enough_balance_for_payouts(item['price_data'], object['e5'])){
            this.props.notify(this.props.app_state.loc['3068aa']/* 'One of your token balances is insufficient for the transfer amounts specified.' */, 6900)
        }
        else{
            const obj = {
                id:makeid(8), type: this.props.app_state.loc['1632o']/* 'finish-payment' */,
                entered_indexing_tags:[this.props.app_state.loc['3068ae']/* 'transfer' */, this.props.app_state.loc['3068ac']/* 'iTransfer' */, this.props.app_state.loc['3068ad']/* 'send' */],
                e5: object['e5'], application: item, object: object, price_data: item['price_data'], recipient: item['applicant_id'], identifier: object['e5_id']+item['applicant_id']+item['time']
            }
            this.props.add_finish_job_payment_transaction_to_stack(obj)
            this.props.notify(this.props.app_state.loc['18']/* 'Transaction added to stack' */, 700)
            this.props.open_dialog_bottomsheet()
        }
    }

    check_if_sender_has_enough_balance_for_payouts(price_data, e5){
        var has_enough = true
        for(var i=0; i<price_data.length; i++){
            var bounty_item_exchange = price_data[i]['id']
            var bounty_item_amount = price_data[i]['amount']
            var my_balance = this.props.calculate_actual_balance(e5, bounty_item_exchange)
            my_balance = bigInt(my_balance).minus(this.get_debit_balance_in_stack(bounty_item_exchange, e5))
            if(bigInt(my_balance).lesser(bigInt(bounty_item_amount))){
                has_enough = false
            }
        }
        return has_enough
    }













    render_view_bag_application_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_view_bag_application_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_view_bag_application_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
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
                        {this.render_view_bag_application_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_view_bag_application_data(){
        const item = this.state.data['item']
        const object = this.state.data['object']
        const items = item['price_data']
        var is_application_accepted = item['is_response_accepted'];
        if(is_application_accepted == true){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2054']/* 'Expiry time from now: ' */+this.get_expiry_time(item), 'details':''+(new Date(item['application_expiry_time'] * 1000).toLocaleString()), 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':''+(new Date(item['time']*1000).toLocaleString()), 'details':this.get_time_diff((Date.now()/1000) - (parseInt(item['time'])))+this.props.app_state.loc['1698a']/* ' ago' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2055']/* 'Contract ID: ' */+item['picked_contract_id'], 'details':this.props.app_state.loc['2056']/* 'Sender ID: ' */+item['applicant_id']+', '+this.get_senders_name5(item['applicant_id'], object), 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_payment_amounts(items, object)}
                    {this.render_detail_item('0')}
                
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2057']/* 'Accepted' */, 'details':this.props.app_state.loc['2058']/* 'The bag owner picked this fulfilment application' */, 'size':'l'})}

                    {object['author'] == this.props.app_state.user_account_id[object['e5']] && (
                        <div>
                            <div style={{height: 10}}/>
                            <div onClick={() => this.view_contract2(item, object)}>
                                {this.render_detail_item('5', {'text':this.props.app_state.loc['3055gl']/* 'View Contract' */, 'action':''},)}
                            </div>
                        </div>
                    )}
                    
                    {this.render_finish_job_and_make_payment(item, object)}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2059']/* 'Expiry time from now: ' */+this.get_expiry_time(item), 'details':''+(new Date(item['application_expiry_time'] * 1000).toLocaleString()), 'size':'l'})}
                    <div style={{height:3}}/>

                    {this.render_detail_item('3', {'title':''+(new Date(item['time']*1000).toLocaleString()), 'details':this.get_time_diff((Date.now()/1000) - (parseInt(item['time'])))+this.props.app_state.loc['1698a']/* ' ago' */, 'size':'l'})}
                    <div style={{height:3}}/>
                    
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2060']/* 'Contract ID: ' */+item['picked_contract_id'], 'details':this.props.app_state.loc['2061']/* 'Sender ID: ' */+item['applicant_id']+', '+ this.get_senders_name5(item['applicant_id'], object), 'size':'l'})}

                    {this.render_payment_amounts(items, object)}
                    <div style={{height:10}}/>
                    
                    {object['author'] == this.props.app_state.user_account_id[object['e5']] && (
                        <div>
                            <div style={{height: 10}}/>
                            <div onClick={() => this.view_contract2(item, object)}>
                                {this.render_detail_item('5', {'text':this.props.app_state.loc['3055gl']/* 'View Contract' */, 'action':''},)}
                            </div>
                        </div>
                    )}
                </div>
            )
        }
    }

    get_expiry_time(item){
        var time_diff = item['application_expiry_time'] - Math.round(Date.now()/1000)
        var t = ''
        if(time_diff < 0){
            t = this.get_time_diff(time_diff*-1) +this.props.app_state.loc['1698a']/* ' ago.' */
        }else{
            t = this.props.app_state.loc['1698b']/* 'In ' */+this.get_time_diff(time_diff)
        }

        return t
    }

    get_senders_name5(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['2785']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? '' : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    view_contract2(item, object){
        if(object['event'].returnValues.p3 == this.props.app_state.user_account_id[object['e5']]){
            this.props.open_dialog_bottomsheet()
            this.props.view_bag_application_contract(item)
        }
    }











    render_signature_request_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_view_signature_request_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_view_signature_request_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
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
                        {this.render_view_signature_request_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
            )
        }
    }

    render_view_signature_request_data(){
        const item = this.state.data['item']
        const base_domain = getDomain(item['target_webhook_url']);
        var image = this.props.app_state.e5s[item['sender_account_e5']].e5_img
        return(
            <div>
                {this.render_detail_item('8', {'size':'l', 'title':item['sender_account'], 'image':image, 'details':this.props.app_state.loc['3055gm']/* 'Sender Account.' */ })}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'size':'l', 'title':item['sender_address'], 'details':this.props.app_state.loc['3055gn']/* 'Senders Address.' */ })}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'size':'l', 'title':base_domain, 'details':this.props.app_state.loc['3055gp']/* 'Webhook Url.' */ })}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':''+(new Date(item['time']*1000).toLocaleString()), 'details':this.get_time_diff((Date.now()/1000) - (parseInt(item['time'])))+this.props.app_state.loc['1698a']/* ' ago' */, 'size':'l'})}
                <div style={{height:10}}/>

                <div onClick={() => this.send_signature_reply(item)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055go']/* 'Send Signature Response.' */, 'action':''},)}
                </div>
            </div>
        )
    }

    send_signature_reply(item){
        this.props.send_signature_response(item)
    }







    render_cookies_permission_request_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_view_cookies_permission_request_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_view_cookies_permission_request_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
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
                        {this.render_view_cookies_permission_request_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(2)}
                    </div>
                </div>
            )
        }
    }

    render_view_cookies_permission_request_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055gq']/* 'Enable Cookies and Local Storage?' */, 'details':this.props.app_state.loc['3055gr']/* 'E uses your device\'s storage and cookies to cache some of your data to help make the user experience better. To enable this, tap the button below and if you dont want this setting turned on, just close this page.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 0px 10px'}}>
                        <div onClick={()=> this.accept_cookies()}>
                            {this.render_detail_item('5', {'text':this.props.app_state.loc['3055gs']/* 'Accept Cookies' */, 'action':''},)}
                        </div>
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 0px 10px'}}>
                        <div onClick={()=> this.reject_cookies()}>
                            {this.render_detail_item('5', {'text':this.props.app_state.loc['3055gt']/* 'Reject Cookies.' */, 'action':''},)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    accept_cookies(){
        this.props.accept_cookies()
    }

    reject_cookies(){
        this.props.reject_cookies()
    }












    render_start_voice_call_ui(){
        var size = this.props.size
        if(this.state.new_voice_call_number_id == null) return;
        if(size == 's'){
            return(
                <div>
                    {this.render_start_voice_call_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_start_voice_call_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(4)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_start_voice_call_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(4)}
                    </div>
                </div>
            )
        }
    }

    render_start_voice_call_data(){
        const call_id = this.state.call_password != '' ? 'e'+this.state.new_voice_call_number_id : this.state.new_voice_call_number_id
        
        const formatted_call_id = this.state.call_password != '' ? 'e'+this.format_voice_call_id(this.state.new_voice_call_number_id) : this.format_voice_call_id(this.state.new_voice_call_number_id)

        const button_message = this.props.app_state.stream == null ? this.props.app_state.loc['3055it']/* 'Microphone 🎙️' */ : this.props.app_state.loc['3055ic']/* 'Enter Call.' */
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055hp']/* 'Start An Indexer Call' */, 'details':this.props.app_state.loc['3055hq']/* 'Specify the accounts you wish to start a voice call with. */, 'size':'l'})}
                <div style={{height:10}}/>
                <div className="row" style={{width:'100%'}}>
                    <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3055hr']/* 'Account ID or Alias...' */} when_text_input_field_changed={this.when_call_receiver_account_id_input_field_changed.bind(this)} text={this.state.call_receiver_account_id} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 10px 0px 0px'}} onClick={()=>this.perform_account_search_and_add()}>
                        <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                            <img className="text-end" src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                        </div>
                    </div>
                </div>
                <div style={{height:10}}/>
                {this.render_added_accounts()}
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055hu']/* 'Encrypt Voice Call.' */, 'details':this.props.app_state.loc['3055hv']/* 'You can optionally encrypt your new voice call with a password. */, 'size':'l'})}
                {this.render_detail_item('10', {'text':this.props.app_state.loc['3055hw']/* This encryption feature is only supported in Chromium based browsers (Chrome, Edge and Brave browsers). */, 'textsize':'10px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>

                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.isEncryptionSupported == false ? this.props.app_state.loc['3055ig']/* 'Encryption Disabled ❌' */ : this.props.app_state.loc['3055hx']/* 'Password...' */} when_text_input_field_changed={this.when_call_password_input_field_changed.bind(this)} text={this.state.call_password} theme={this.props.theme}/>
                {this.props.app_state.isEncryptionSupported == true && (
                    <div>
                        {this.render_detail_item('10', {'text':this.props.app_state.loc['3055id']/* Encryption supported on your device ✔ */, 'textsize':'9px', 'font':this.props.app_state.font})}
                    </div>
                )}
                {this.props.app_state.isEncryptionSupported == false && (
                    <div>
                        {this.render_detail_item('10', {'text':this.props.app_state.loc['3055ie']/* Encryption NOT supported on your device ❌ */, 'textsize':'9px', 'font':this.props.app_state.font})}
                    </div>
                )}
                {this.render_detail_item('0')}
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    <div onClick={() => this.copy_call_id_to_clipboard(call_id)}>
                        {this.render_detail_item('10', {'text':formatted_call_id, 'textsize':'25px', 'font':this.props.app_state.font})}
                    </div>
                    <div style={{'padding':'0px 0px 0px 0px'}}>
                        {this.render_detail_item('10', {'text':this.props.app_state.loc['3055ib']/* Call Identifier. */, 'textsize':'12px', 'font':this.props.app_state.font})} 
                    </div>
                </div>

                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3091bl']/* 'Record Call.' */, 'details':this.props.app_state.loc['3091bm']/* 'You can record the call for future reference. */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_record_call_tags_object} tag_size={'l'} when_tags_updated={this.when_get_record_call_tags_object_updated.bind(this)} theme={this.props.theme}/>

                <div style={{height:10}}/>
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 0px 10px'}}>
                        <div onClick={() => this.enter_new_call()}>
                            {this.render_detail_item('5', {'text':button_message, 'action':''},)}
                        </div>
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 0px 10px'}}>
                        <div onClick={()=> this.props.cancel_entering_call()}>
                            {this.render_detail_item('5', {'text':this.props.app_state.loc['3055jp']/* ''cancel ✖' */, 'action':''},)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    when_get_record_call_tags_object_updated(tags_obj){
        this.setState({get_record_call_tags_object: tags_obj})
    }

    format_voice_call_id(str){
        return str.slice(0, 3) + " " + str.slice(3, 7) + " " + str.slice(7, 11)+ " " + str.slice(11);
    }

    copy_call_id_to_clipboard(text){
        navigator.clipboard.writeText(text)
        this.props.notify(this.props.app_state.loc['3055ia']/* 'Call ID copied to clipboard.' */, 1600)
    }

    when_call_receiver_account_id_input_field_changed(text){
        this.setState({call_receiver_account_id: text})
    }

    async perform_account_search_and_add(){
        const recipient = await this.get_typed_alias_id(this.state.call_receiver_account_id.toString().trim())
        const recipient_e5 = this.get_recipient_e5(recipient)
        if(isNaN(recipient) || parseInt(recipient) < 0 || recipient == ''){
            this.props.notify(this.props.app_state.loc['3091bq']/* 'Please put a valid account ID.' */, 1600)
        }
        else if(this.is_recipient_already_included(recipient, recipient_e5) == true){
            this.props.notify(this.props.app_state.loc['3055hs']/* 'Youve already included that account.' */, 3600)
        }
        else if(recipient == this.props.app_state.user_account_id[recipient_e5]){
            this.props.notify(this.props.app_state.loc['3055hy']/* 'Your account will be included automatically.' */, 4600)
        }
        else{
            this.props.get_and_set_account_online_status(recipient, recipient_e5)
            this.props.get_alias_from_account_id(recipient, recipient_e5)
            const clone = this.state.new_call_recepients.slice()
            clone.push({'id':recipient, 'e5':recipient_e5})
            this.setState({new_call_recepients: clone, call_receiver_account_id:''})
        }
    }

    is_recipient_already_included(recipient, recipient_e5){
        var is_included = false;
        this.state.new_call_recepients.forEach(element => {
            if(element['id'] == recipient && element['e5'] == recipient_e5){
                is_included = true
            }
        });
        return is_included
    }

    async get_typed_alias_id(alias){
        if(!isNaN(alias)){
            return alias
        }
        await this.props.get_account_id_from_alias(alias)
        const alias_owners_data = this.get_all_sorted_objects_mappings(this.props.app_state.alias_owners)
        var id = (alias_owners_data[alias] == null ? alias : alias_owners_data[alias])

        return id
    }

    get_recipient_e5(recipient){
        var e5s = this.props.app_state.e5s['data']
        var recipients_e5 = this.props.app_state.selected_e5
        for (let i = 0; i < e5s.length; i++) {
            var e5 = e5s[i]
            if(this.props.app_state.alias_owners[e5] != null){
                var id = this.props.app_state.alias_owners[e5][recipient]
                if(id != null && !isNaN(id)){
                    recipients_e5 = e5
                }
            }
        }
        return recipients_e5
    }

    render_added_accounts(){
        var items = [].concat(this.state.new_call_recepients)
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
                                {this.render_included_account_item(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_included_account_item(item){
        const title = item['id']
        const details = this.get_sender_title_text(item['id'], item['e5']) || this.props.app_state.loc['3055ht']/* Unknown */
        const online_text = this.is_recipient_online(item) ? this.props.app_state.loc['2738bi']/* 'online' */ : null
        return(
            <div onClick={() => this.when_new_call_account_clicked(item)}>
                {this.render_detail_item('3', {'title':title, 'details':details, 'size':'s','footer':online_text})}
            </div>
        )
    }

    get_sender_title_text(account, e5){
        if(account == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            const bucket = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
            var alias = (bucket[account] == null ? null : bucket[account])
            return alias
        }
    }

    is_recipient_online(item){
        const tracked_online_accounts = this.props.app_state.tracked_online_accounts
        var recipients_e5 = item['e5']
        const recipient = item['id']
        const e5_id = recipient+recipients_e5

        if(tracked_online_accounts[e5_id] == null){
            return false
        }
        else{
            return tracked_online_accounts[e5_id]['online']
        }
    }

    when_new_call_account_clicked(item_to_remove){
        const clone = this.state.new_call_recepients.slice()
        const index = clone.findIndex(item => (item['id'] == item_to_remove['id'] && item['e5'] == item_to_remove['e5']));
        if(index != -1){
            clone.splice(index, 1)
            this.setState({new_call_recepients: clone})
        }
    }

    when_call_password_input_field_changed(text){
        if(this.props.app_state.isEncryptionSupported == false) return;
        this.setState({call_password: text})
    }

    enter_new_call(){
        const call_id = this.state.call_password.trim() != '' ? 'e'+this.state.new_voice_call_number_id : this.state.new_voice_call_number_id
        const recipients = this.state.new_call_recepients
        const call_password = this.state.call_password.trim()

        const record_call = this.get_selected_item2(this.state.get_record_call_tags_object, 'e') == 1

        if(recipients.length == 0){
            this.props.notify(this.props.app_state.loc['3055if']/* You need to specify some recipients. */, 3000)
        }
        else{
            if(this.props.app_state.stream == null){
                this.props.initialize_microphone(call_password, call_id)
            }else{
                this.props.enter_new_call(call_id, recipients, call_password, record_call)
            }
        }
    }










    render_enter_voice_call_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_enter_voice_call_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_enter_voice_call_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
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
                        {this.render_enter_voice_call_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
            )
        }
    }

    render_enter_voice_call_data(){
        const call_invite_obj = this.state.data['message']
        const button_message = this.props.app_state.stream == null ? this.props.app_state.loc['3055it']/* 'Microphone 🎙️' */ : this.props.app_state.loc['3055ic']/* 'Enter Call.' */
        if(call_invite_obj == null){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1593kr']/* 'Enter Indexer Voice Calls' */, 'details':this.props.app_state.loc['1593ks']/* 'Enter an online voice call with someone or some people on E5. */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3055im']/* 'Call Identifier...' */} when_text_input_field_changed={this.when_call_identifier_input_field_changed.bind(this)} text={this.state.call_identifier} theme={this.props.theme}/>
                    <div style={{height:10}}/>

                    
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3091bl']/* 'Record Call.' */, 'details':this.props.app_state.loc['3091bm']/* 'You can record the call for future reference. */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.get_record_call_tags_object} tag_size={'l'} when_tags_updated={this.when_get_record_call_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3055in']/* 'Call Password.' */, 'details':this.props.app_state.loc['3055io']/* 'Set the password used if one was set during the creation of the call. */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3055hx']/* 'Password...' */} when_text_input_field_changed={this.when_enter_call_password_input_field_changed.bind(this)} text={this.state.enter_call_password} theme={this.props.theme}/>
                    {this.props.app_state.isEncryptionSupported == false && (
                        <div>
                            {this.render_detail_item('10', {'text':this.props.app_state.loc['3055ie']/* Encryption NOT supported on your device ❌ */, 'textsize':'9px', 'font':this.props.app_state.font})}
                        </div>
                    )}
                    {this.props.app_state.isEncryptionSupported == true && (
                        <div>
                            {this.render_detail_item('10', {'text':this.props.app_state.loc['3055id']/* Encryption supported on your device ✔ */, 'textsize':'9px', 'font':this.props.app_state.font})}
                            <div style={{height:10}}/>
                            <div className="row">
                                <div className="col-6" style={{'padding': '10px 10px 0px 10px'}}>
                                   <div onClick={() => this.enter_existing_call_with_specified_details()}>
                                        {this.render_detail_item('5', {'text':button_message, 'action':''},)}
                                    </div>
                                </div>
                                <div className="col-6" style={{'padding': '10px 10px 0px 10px'}}>
                                    <div onClick={()=> this.props.cancel_entering_call()}>
                                        {this.render_detail_item('5', {'text':this.props.app_state.loc['3055jp']/* ''cancel ✖' */, 'action':''},)}
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    )}
                </div>
            )
        }else{
            const formatted_call_id = (str) => {
                if(str.startsWith('e')){
                    return str.slice(0, 4) + " " + str.slice(4, 8) + " " + str.slice(8, 12)+ " " + str.slice(12);
                }else{
                    return str.slice(0, 3) + " " + str.slice(3, 7) + " " + str.slice(7, 11)+ " " + str.slice(11);
                }
            }
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3055ij']/* 'Call Invite.' */, 'details':this.props.app_state.loc['3055ik']/* 'Youve been invited to join a call. */, 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':call_invite_obj['sender_account']+', '+(this.get_sender_title_text(call_invite_obj['sender_account'], call_invite_obj['sender_account_e5']) || ''), 'details':this.props.app_state.loc['3055il']/* 'Sender Account. */, 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':''+(new Date(call_invite_obj['time']).toLocaleString()), 'details':this.get_time_diff((Date.now()/1000) - (parseInt(call_invite_obj['time']/1000)))+this.props.app_state.loc['1698a']/* ' ago' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3091bl']/* 'Record Call.' */, 'details':this.props.app_state.loc['3091bm']/* 'You can record the call for future reference. */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.get_record_call_tags_object} tag_size={'l'} when_tags_updated={this.when_get_record_call_tags_object_updated.bind(this)} theme={this.props.theme}/>

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        <div onClick={() => this.copy_call_id_to_clipboard(call_invite_obj['call_id'])}>
                            {this.render_detail_item('10', {'text':formatted_call_id(call_invite_obj['call_id']), 'textsize':'25px', 'font':this.props.app_state.font})}
                        </div>
                        <div style={{'padding':'0px 0px 0px 0px'}}>
                            {this.render_detail_item('10', {'text':this.props.app_state.loc['3055ib']/* Call Identifier. */, 'textsize':'12px', 'font':this.props.app_state.font})} 
                        </div>
                    </div>
                    {call_invite_obj['password'] != '' && (
                        <div>
                            {this.props.app_state.isEncryptionSupported == true && (
                                <div>
                                    {this.render_detail_item('10', {'text':this.props.app_state.loc['3055id']/* Encryption supported on your device ✔ */, 'textsize':'9px', 'font':this.props.app_state.font})}
                                </div>
                            )}
                            {this.props.app_state.isEncryptionSupported == false && (
                                <div>
                                    {this.render_detail_item('10', {'text':this.props.app_state.loc['3055ie']/* Encryption NOT supported on your device ❌ */, 'textsize':'9px', 'font':this.props.app_state.font})}
                                </div>
                            )}
                        </div>
                    )}

                    {call_invite_obj['password'] != '' && this.props.app_state.isEncryptionSupported == true && (
                        <div>
                            <div style={{height:10}}/>
                            <div className="row">
                                <div className="col-6" style={{'padding': '10px 10px 0px 10px'}}>
                                   <div onClick={() => this.enter_invited_call()}>
                                        {this.render_detail_item('5', {'text':button_message, 'action':''},)}
                                    </div>
                                </div>
                                <div className="col-6" style={{'padding': '10px 10px 0px 10px'}}>
                                    <div onClick={()=> this.props.cancel_entering_call()}>
                                        {this.render_detail_item('5', {'text':this.props.app_state.loc['3055jp']/* ''cancel ✖' */, 'action':''},)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {call_invite_obj['password'] == '' && (
                        <div>
                            <div style={{height:10}}/>
                            <div className="row">
                                <div className="col-6" style={{'padding': '10px 10px 0px 10px'}}>
                                   <div onClick={() => this.enter_invited_call()}>
                                        {this.render_detail_item('5', {'text':button_message, 'action':''},)}
                                    </div>
                                </div>
                                <div className="col-6" style={{'padding': '10px 10px 0px 10px'}}>
                                    <div onClick={()=> this.props.cancel_entering_call()}>
                                        {this.render_detail_item('5', {'text':this.props.app_state.loc['3055jp']/* ''cancel ✖' */, 'action':''},)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )
        }
    }

    when_call_identifier_input_field_changed(text){
        this.setState({call_identifier: text})
    }

    when_enter_call_password_input_field_changed(text){
        this.setState({enter_call_password: text})
    }

    enter_existing_call_with_specified_details(){
        const call_identifier = this.state.call_identifier.trim()
        const enter_call_password = this.state.enter_call_password.trim()

        if(call_identifier == ''){
            this.props.notify(this.props.app_state.loc['3055ip']/* A call identifier is required. */, 4000)
        }
        else if(call_identifier.length != 10 && call_identifier.length != 11){
            this.props.notify(this.props.app_state.loc['3055iq']/* The length of the identifier is invalid. */, 4000)
        }
        else if((call_identifier.startsWith('e') && isNaN(call_identifier.replace('e', ''))) || isNaN(call_identifier)){
            this.props.notify(this.props.app_state.loc['3055ir']/* That call identifier is invalid. */, 4000)
        }
        else if(call_identifier.startsWith('e') && enter_call_password == ''){
            this.props.notify(this.props.app_state.loc['3055is']/* That call requires a password. */, 4000)
        }
        else{
            if(this.props.app_state.stream == null){
                this.props.initialize_microphone(enter_call_password, call_identifier)
            }else{
                this.props.enter_call_with_specified_details(call_identifier, enter_call_password)
            }
        }
    }

    enter_invited_call(){
        const record_call = this.get_selected_item2(this.state.get_record_call_tags_object, 'e') == 1
        const call_invite_obj = this.state.data['message']
        
        if(this.props.app_state.stream == null){
            this.props.initialize_microphone(call_invite_obj['password'], call_invite_obj['call_id'])
        }else{
            this.props.enter_call_with_specified_details(call_invite_obj['call_id'], call_invite_obj['password'], record_call)
        }
    }
    











    render_confirm_leave_call_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_confirm_leave_call_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_confirm_leave_call_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
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
                        {this.render_confirm_leave_call_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(2)}
                    </div>
                </div>
            )
        }
    }

    render_confirm_leave_call_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055ix']/* 'Confirm Exit.' */, 'details':this.props.app_state.loc['3055iy']/* 'Are you sure you wish to exit the call?' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 0px 10px'}}>
                        <div onClick={()=> this.leave_call_confirmed()}>
                            {this.render_detail_item('5', {'text':this.props.app_state.loc['3055iz']/* 'Exit Call' */, 'action':''},)}
                        </div>
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 0px 10px'}}>
                        <div onClick={()=> this.stay_in_call()}>
                            {this.render_detail_item('5', {'text':this.props.app_state.loc['3055ja']/* 'Stay In Call' */, 'action':''},)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    leave_call_confirmed(){
        this.props.leave_call_confirmed()
    }

    stay_in_call(){
        this.props.stay_in_call()
    }











    render_spend_prepurchase_credits_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_spend_prepurchase_credits_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_spend_prepurchase_credits_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
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
                        {this.render_spend_prepurchase_credits_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
            )
        }
    }

    render_spend_prepurchase_credits_data(){
        const credits_balance = this.props.calculate_credit_balance(this.state.data['contract'])
        return(
            <div>
                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3055je']/* 'Credits Amount.' */, 'details': this.props.app_state.loc['3055jf']/* 'Set the number of credits your spening at the contracts vendor.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['3055jg']/* 'Set Amount.' */, 'subtitle':this.format_power_figure(this.state.credit_spend_amount), 'barwidth':this.get_number_width(this.state.credit_spend_amount), 'number':`${this.format_account_balance_figure(this.state.credit_spend_amount)}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['3092b']/* credits */, })}
                </div>
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['2214q']/* 'Pre-purchase Credits Balance' */, 'subtitle':this.format_power_figure(credits_balance), 'barwidth':this.get_number_width(credits_balance), 'number':`${this.format_account_balance_figure(credits_balance)}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['3092b']/* credits */, })}
                </div>

                <NumberPicker ref={(el) => (this.credits_number_picker = el)} clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_credit_spend_amount_set.bind(this)} theme={this.props.theme} power_limit={54} pick_with_text_area={true} text_area_hint={'1000'}/>
                <div style={{height:10}}/>

                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3055jl']/* 'Transaction Note.' */, 'details': this.props.app_state.loc['3055jm']/* 'You can also attach a note to help identify the transaction.' */, 'size': 'l' })}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={25} placeholder={this.props.app_state.loc['3055jn']/* 'Note...' */} when_text_input_field_changed={this.when_typed_transaction_note_text_input_field_changed.bind(this)} text={this.state.typed_transaction_note} theme={this.props.theme} adjust_height={false}/>
                
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']+(this.props.app_state.transaction_note_length - this.state.typed_transaction_note.length)})}

                <div style={{height:10}}/>
                <div onClick={()=> this.make_pre_purchase()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055jh']/* 'Make Purchase.l' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_credit_spend_amount_set(amount){
        this.setState({credit_spend_amount: amount})
    }

    make_pre_purchase(){
        const amount = this.state.credit_spend_amount
        const transaction_note = this.state.typed_transaction_note.trim();
        const contract = this.state.data['contract']

        if(amount == 0){
            this.props.notify(this.props.app_state.loc['3055ji']/* You need to specify an amount. */, 4000)
        }
        else if(!this.does_account_have_enough_credits_for_transaction(amount, contract)){
            this.props.notify(this.props.app_state.loc['3055jk']/* You dont have enough credits to make that transaction. */, 6000)
        }
        else if(transaction_note.length > this.props.app_state.transaction_note_length){
            this.props.notify(this.props.app_state.loc['3055jo']/* That note is too long. */, 4000)
        }
        else{
            this.props.emit_pre_purchase_transaction(amount, contract, transaction_note)
            this.setState({typed_transaction_note: '', credit_spend_amount:0})
            this.credits_number_picker.reset_number_picker()
        }
    }

    does_account_have_enough_credits_for_transaction(amount, contract_object){
        return this.props.calculate_credit_balance(contract_object) >= amount;
    }

    when_typed_transaction_note_text_input_field_changed(text){
        this.setState({typed_transaction_note: text})
    }












    render_export_prepurchase_transactions_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_export_prepurchase_transactions_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_export_prepurchase_transactions_data()}
                        <div style={{height:20}}/>
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
                        {this.render_export_prepurchase_transactions_data()}
                        <div style={{height:20}}/>
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_export_prepurchase_transactions_data(){
        return(
            <div>
                {this.render_detail_item('3', { 'title': this.props.app_state.loc['2214s']/* 'Export Pre-purchase Transactions.' */, 'details': this.props.app_state.loc['2214t']/* 'Export all the pre-purchase transactions into a local file on your device.' */, 'size': 'l' })}
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['2642y']/* Filter Time.' */, 'details':this.props.app_state.loc['2214v']/* 'Set the date and time after which a given transaction will be included in the pre-purchase' */, 'size':'l'})}
                <div style={{height:10}}/>
                <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], }, })}>
                    <CssBaseline />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_new_prepurchase_export_date_time_value_set(newValue)}/>
                    </LocalizationProvider>
                </ThemeProvider>

                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.get_time_diff((Date.now()/1000) - (this.state.export_start_time/1000)), 'details':this.props.app_state.loc['2642ba']/* 'Filter Start Time.' */, 'size':'l'})}

                <div style={{height:10}}/>
                <div onClick={()=> this.when_export_prepurchase_transactions()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2214bd']/* 'Export' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_new_prepurchase_export_date_time_value_set(value){
        const selectedDate = value instanceof Date ? value : new Date(value);
        const timeInSeconds = selectedDate.getTime();
        this.setState({export_start_time: timeInSeconds})
    }

    when_export_prepurchase_transactions(){
        const contract_item = this.state.data['contract']
        const export_start_time = this.state.export_start_time

        if(export_start_time > (Date.now()) - (1000*60*5)){
            this.props.notify(this.props.app_state.loc['2642bb']/* You can only filter for before 5 minutes or more. */, 4000)
        }
        else{
            this.props.export_prepurchases(contract_item, export_start_time)
        }
    }










    render_view_ordered_variant_details_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_view_ordered_variant_details_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_view_ordered_variant_details_data()}
                        <div style={{height:20}}/>
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
                        {this.render_view_ordered_variant_details_data()}
                        <div style={{height:20}}/>
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_view_ordered_variant_details_data(){
        const object = this.state.data['object']
        const item = this.state.data['item']
        
        var storefront_e5 = item['storefront_item_e5'] == null ? 'E25' : item['storefront_item_e5']
        var storefront = this.get_storefront(item['storefront_item_id'], storefront_e5)
        var variant_in_store = this.get_variant_object_from_storefront(storefront, item['storefront_variant_id'])
        if(variant_in_store == null) return null
        var composition_type = storefront['ipfs'].composition_type == null ? 'items' : this.get_selected_item(storefront['ipfs'].composition_type, 'e')

        return(
            <div>
                {this.render_detail_item('3', {'title':storefront['ipfs'].entered_title_text, 'details':this.props.app_state.loc['2048']/* 'Store ID:' */+storefront['id'] , 'size':'l'})}
                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':item['purchase_unit_count'], 'details':composition_type+this.props.app_state.loc['2049']/* ' ordered.' */ , 'size':'l'})}
                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':variant_in_store['variant_description'], 'details':this.props.app_state.loc['2050']/* 'Variant Description' */, 'size':'l'})}
                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2051']/* 'Pick-up Location' */, 'details':storefront['ipfs'].fulfilment_location, 'size':'l'})}
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1058j']/* 'Custom Specifications.' */, 'details':(item['custom_specifications'] == null ? '...':item['custom_specifications']), 'size':'l'})}
                <div style={{height: 10}}/>
                {this.render_purchase_options_if_any2(item)}
                {this.render_variant_final_prices(variant_in_store, item, object)}
                {this.render_variant_image_if_any(variant_in_store)}
            </div>
        )
    }

    get_storefront(storefront_id, e5){
        // var all_stores = this.get_all_sorted_objects(this.props.app_state.created_stores)
        // var store = this.get_item_in_array_using_id(storefront_id, all_stores)
        // return store
        var item = this.props.app_state.created_store_mappings[e5] == null ? null : this.props.app_state.created_store_mappings[e5][storefront_id]
        return item
    }

    get_variant_object_from_storefront(storefront, id){
        if(storefront == null) return null;
        for(var i=0; i<storefront['ipfs'].variants.length; i++){
            if(storefront['ipfs'].variants[i]['variant_id'] == id){
                return storefront['ipfs'].variants[i]
            }
        }
    }

    render_variant_image_if_any(variant_in_store){
        if(variant_in_store['image_data']['data'] != null && variant_in_store['image_data']['data']['images'] != null && variant_in_store['image_data']['data']['images'].length > 0){
            return(
                <div style={{padding:'0px 0px 0px 0px'}}>
                    {this.render_detail_item('9', variant_in_store['image_data']['data'])}
                </div>
            )
        }
    }

    render_purchase_options_if_any2(item){
        var items = item['options']
        if(items == null || items.length == 0) return;
        var storefront_options = item['storefront_options']
        if(storefront_options == null || storefront_options.length == 0) return;
        return(
            <div>
                {items.map((item, index) => (
                    <div style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_detail_item('3', {'title':storefront_options[index]['title'], 'details':storefront_options[index]['details'], 'size':'l'})}
                        <div style={{height:3}}/>
                        <Tags font={this.props.app_state.font} page_tags_object={item} tag_size={'l'} when_tags_updated={this.when_purchase_option_tag_selected.bind(this)} theme={this.props.theme} locked={true}/>
                        <div style={{height:(index == items.length -1 ? 0 : 3)}}/>
                    </div>
                ))}
                {this.render_detail_item('0')}
            </div>
        )
    }

    when_purchase_option_tag_selected(tag_item){
        //do nothing
    }

    render_variant_final_prices(variant_in_store, item, object){
        var price_items = variant_in_store['price_data']
        var price_obj = {}
        price_items.forEach(price => {
            if(price_obj[price['id']] == null) price_obj[price['id']] = bigInt(0)
            price_obj[price['id']] = bigInt(price_obj[price['id']]).plus(price['amount'])
        });

        if(item['storefront_options'] != null && item['storefront_options'].length > 0){
            var options = item['storefront_options']

            for(var i=0; i<item['options'].length; i++){
                var tag_obj = item['options'][i]
                var selected_items = []
                for(var j=0; j<tag_obj['e'][2].length; j++){
                    var selected_item_pos = tag_obj['e'][2][j]
                    if(selected_item_pos != 0){
                        selected_items.push(selected_item_pos-1)
                    }
                }
                for(var k=0; k<selected_items.length; k++){
                    var selected_pos = selected_items[k]
                    var option_prices = options[i]['options'][selected_pos]['price']
                    option_prices.forEach(price => {
                        if(price_obj[price['id']] == null){
                            price_obj[price['id']] = bigInt(0)
                        }
                        price_obj[price['id']] = bigInt(price_obj[price['id']]).plus(price['amount'])
                    });
                } 
            }
        }

        var price_array = []
        for (const id in price_obj) {
            if (price_obj.hasOwnProperty(id)) {
                price_array.push({'id':id, 'amount':price_obj[id]})
            }
        }

        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['2064o']/* 'Order Price.' */, 'details':this.props.app_state.loc['2064p'] /* 'The price of the ordered item with the specified options.' */})}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {price_array.map((item, index) => (
                        <div style={{'padding': '2px 0px 2px 0px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                        </div>
                    ))}
                </div>
            </div>
        )
    }








    render_received_ether_coin_request_details_ui(){
         var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_received_ether_coin_request_details_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_received_ether_coin_request_details_data()}
                        <div style={{height:20}}/>
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
                        {this.render_received_ether_coin_request_details_data()}
                        <div style={{height:20}}/>
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_received_ether_coin_request_details_data(){
        const ipfs = this.state.data
        const id = ipfs['request_id']
        const time = ipfs['time'] / 1000
        const sender_account = ipfs['sender_account']
        const sender_account_e5 = ipfs['sender_account_e5']
        const e5_image = this.props.app_state.e5s[sender_account_e5].e5_img
        const alias = this.get_senders_alias(sender_account, sender_account_e5)
        const ether_coin_id = ipfs['message_obj']['ether_id']
        const base_unit_amount = ipfs['message_obj']['picked_base_unit_amount']
        const recipient_address = ipfs['message_obj']['recipient_address']
        const memo_text = ipfs['message_obj']['memo_text'] || ''
        const ether_coin_object_data = ipfs['message_obj']['ether_or_coin'] == 'ether' ? this.get_specific_ether_data_if_ether(ether_coin_id) : this.get_specific_ether_data_if_coin(ether_coin_id);
        const decimal_count = ipfs['message_obj']['ether_or_coin'] == 'ether' ? 18 : ether_coin_object_data['decimals']
        const decimal_amount = base_unit_amount / 10**decimal_count

        const render_amount_in_ether_and_wei = () => {
            return(
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px', 'font-family': this.props.app_state.font}} className="fw-bold">{this.props.app_state.loc['3055jx']/* Requested Amount in Ether and Wei */}</p>

                    {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(base_unit_amount), 'number':this.format_account_balance_figure(base_unit_amount), 'barcolor':'#606060', 'relativepower':'wei', })}

                    {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(base_unit_amount/10**18), 'number':(base_unit_amount/10**18), 'barcolor':'#606060', 'relativepower':ether_coin_id, })}
                </div>
            )
        }

        const render_amount_in_coin_and_decimal = () => {
            return(
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px', 'font-family': this.props.app_state.font}} className="fw-bold">{this.props.app_state.loc['3055ka']/* 'Requested Amount in $ and %' */.replace('$', ether_coin_id).replace('%', ether_coin_object_data['base_unit'])}</p>

                    {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(base_unit_amount), 'number':this.format_account_balance_figure(base_unit_amount), 'barcolor':'#606060', 'relativepower':ether_coin_object_data['base_unit'], })}

                    {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(decimal_amount), 'number':(decimal_amount), 'barcolor':'#606060', 'relativepower':ether_coin_id, })}
                </div>
            )
        }
        return(
            <div>
                {this.render_detail_item('8', ether_coin_object_data['label'])}
                <div style={{height: 10}}/>
                
                {this.render_detail_item('3', {'title':id, 'details':this.props.app_state.loc['3055jv']/* 'Request ID' */, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':''+(new Date(time*1000).toLocaleString()), 'details':this.get_time_diff((Date.now()/1000) - (parseInt(time)))+this.props.app_state.loc['1698a']/* ' ago' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':alias, 'details':this.props.app_state.loc['3055jw']/* 'Request Author.' */, 'size':'l', 'title_image': e5_image})}
                <div style={{height: 10}}/>

                {ipfs['message_obj']['ether_or_coin'] == 'ether' ? render_amount_in_ether_and_wei() : render_amount_in_coin_and_decimal()}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':start_and_end(recipient_address), 'details':this.props.app_state.loc['3055kb']/* 'Requested Recipient\'s Address.' */, 'size':'l'})}
                {memo_text != '' && ( <div style={{height: 10}}/> )}

                {memo_text != '' && this.render_detail_item('3', {'title':memo_text, 'details':this.props.app_state.loc['3055kf']/* 'Requested Transaction Memo.' */, 'size':'l'})}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055kc']/* 'Fulfil Request.' */, 'details':this.props.app_state.loc['3055kd']/* 'Open the Send Ether/Coin section and fulfil their requested amount.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <div onClick={() => this.prompt_enter_coin_or_ether_send_sections(ipfs, ether_coin_object_data)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055ke']/* 'Fulfil Request' */, 'action':''})}
                </div>
            </div>
        )
    }

    get_senders_alias(account, e5){
        if(account == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            const bucket = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
            var alias = (bucket[account] == null ? account : bucket[account])
            return alias
        }
    }

    get_specific_ether_data_if_ether(ether_coin_id){
        var state_list = this.props.app_state.ether_data
        var token_data = null;
        state_list.forEach(ether_desc => {
            if(ether_desc['symbol'] == ether_coin_id){
                token_data = this.get_token_data(ether_desc['symbol'], ether_desc['name'], ether_desc['e5'])
            }
        });
        return token_data
    }

    get_token_data(symbol, name, e5){
        return {
            'id':symbol,
            'e5':e5,
            'name': name,
            'sortname':name.toLowerCase(),
            'symbol': symbol,
            'image': this.props.app_state.e5s[e5].ether_image,
            'label':{'title':symbol, 'details':name, 'size':'l', 'image': this.props.app_state.e5s[e5].ether_image},
            'tags':{'active_tags':[name, 'EVM', symbol], 'index_option':'indexed'},
            'number_label':this.get_blockchain_data('s', e5),
            'number_label_large': this.get_blockchain_data('l', e5),
            'banner-icon':{'header':symbol, 'subtitle':name, 'image':this.props.app_state.e5s[e5].ether_image},
        }
    }

    get_blockchain_data(size, e5){
        var number_of_blocks = this.props.app_state.number_of_blocks[e5]
        if(number_of_blocks == null){
            number_of_blocks = 0
        }
        return{
            'style':size,
            'title':'Number of Blocks Mined',
            'subtitle':this.format_power_figure(number_of_blocks),
            'barwidth':this.get_number_width(number_of_blocks),
            'number':`${number_with_commas(number_of_blocks)} blocks`,
            'barcolor':'#606060',
            'relativepower':'ledger size',
        }
    }

    get_specific_ether_data_if_coin(ether_coin_id){
        var coins = this.props.app_state.coins
        for (const coin in coins) {
            if (coins.hasOwnProperty(coin) && ether_coin_id == coin) {
                return coins[coin]
            }
        }
    }

    prompt_enter_coin_or_ether_send_sections(ipfs, ether_coin_object_data){
        if(ipfs['message_obj']['ether_or_coin'] == 'ether'){
            this.props.open_send_ether_section(ipfs, ether_coin_object_data)
        }else{
            this.props.open_send_coin_section(ipfs, ether_coin_object_data)
        }
    }












    render_promopt_spend_prepurchase_credits_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_promopt_spend_prepurchase_credits_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_promopt_spend_prepurchase_credits_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
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
                        {this.render_promopt_spend_prepurchase_credits_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
            )
        }
    }

    render_promopt_spend_prepurchase_credits_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1407s']/* 'Target Account.' */, 'details':this.props.app_state.loc['3055kh']/* 'The account you wish to receive the pre-purchase spend request.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1407r']/* 'Alias or Account ID' */} when_text_input_field_changed={this.when_request_recipient_input_field_changed.bind(this)} text={this.state.prepurchase_request_recipient} theme={this.props.theme}/>
                {this.render_detail_item('0')}

                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3055je']/* 'Credits Amount.' */, 'details': this.props.app_state.loc['3055kg']/* 'Set the amount you wish the target amount should spend.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['3055jg']/* 'Set Amount.' */, 'subtitle':this.format_power_figure(this.state.credit_spend_amount), 'barwidth':this.get_number_width(this.state.credit_spend_amount), 'number':`${this.format_account_balance_figure(this.state.credit_spend_amount)}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['3092b']/* credits */, })}
                </div>
                <div style={{height:10}}/>

                <NumberPicker ref={(el) => (this.credits_number_picker = el)} clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_credit_spend_amount_set.bind(this)} theme={this.props.theme} power_limit={54} pick_with_text_area={true} text_area_hint={'1000'}/>
                {this.render_detail_item('0')}

                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3055jl']/* 'Transaction Note.' */, 'details': this.props.app_state.loc['3055ki']/* 'You can also specify a note required for the pre-purchase transaction.' */, 'size': 'l' })}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={25} placeholder={this.props.app_state.loc['3055jn']/* 'Note...' */} when_text_input_field_changed={this.when_typed_transaction_note_text_input_field_changed.bind(this)} text={this.state.typed_transaction_note} theme={this.props.theme} adjust_height={false}/>
                
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']+(this.props.app_state.transaction_note_length - this.state.typed_transaction_note.length)})}

                <div style={{height:10}}/>
                <div onClick={()=> this.make_pre_purchase_request()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055kj']/* 'Send Request' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_request_recipient_input_field_changed(text){
        this.setState({prepurchase_request_recipient: text})
    }

    async make_pre_purchase_request(){
        const recipient = this.state.prepurchase_request_recipient.trim()
        const request_recipient = await this.get_typed_alias_id(recipient)
        const recipient_e5 = this.get_recipient_e5(recipient)
        const amount = this.state.credit_spend_amount
        const transaction_note = this.state.typed_transaction_note.trim();
        const contract = this.state.data['contract']

        if(amount == 0){
            this.props.notify(this.props.app_state.loc['3055ji']/* You need to specify an amount. */, 4000)
        }
        else if(isNaN(request_recipient) || request_recipient =='' || parseInt(request_recipient)<1001){
            this.props.notify(this.props.app_state.loc['1569']/* 'That ID is not valid' */, 3800)
        }
        else if(transaction_note.length > this.props.app_state.transaction_note_length){
            this.props.notify(this.props.app_state.loc['3055jo']/* That note is too long. */, 4000)
        }
        else{
            this.props.emit_pre_purchase_request_transaction(amount, contract, transaction_note, request_recipient, recipient_e5)
            this.setState({prepurchase_request_recipient: '', credit_spend_amount:0})
            this.credits_number_picker.reset_number_picker()
        }
    }

    async get_typed_alias_id(alias){
        if(!isNaN(alias)){
            return alias
        }
        await this.props.get_account_id_from_alias(alias)
        var id = (this.props.app_state.alias_owners[this.props.app_state.selected_e5][alias] == null ? alias : this.props.app_state.alias_owners[this.props.app_state.selected_e5][alias])

        return id
    }









    render_view_request_spend_prepurchase_credits_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_view_request_spend_prepurchase_credits_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_view_request_spend_prepurchase_credits_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
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
                        {this.render_view_request_spend_prepurchase_credits_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
            )
        }
    }

    render_view_request_spend_prepurchase_credits_data(){
        const ipfs = this.state.data;
        const time = ipfs['time']/1000
        const sender_account = ipfs['sender_account']
        const sender_account_e5 = ipfs['sender_account_e5']
        // const sender_address = ipfs['sender_address']
        const amount = ipfs['amount']
        const contract_id = ipfs['contract_id']
        const contract_e5 = ipfs['contract_e5']
        const note = ipfs['note']
        const id = ipfs['request_id']
        const e5_image = this.props.app_state.e5s[sender_account_e5].e5_img
        const alias = this.get_senders_alias(sender_account, sender_account_e5)
        const mock_contract = this.props.app_state.pre_purchase_prompt_data[ipfs['contract_e5_id']]
        var credits_balance = 0;
        try{
            credits_balance = this.props.calculate_credit_balance(mock_contract)
        }catch(e){
            credits_balance = 0;
        }
        
        return(
            <div>
                {this.render_detail_item('3', {'title':id, 'details':this.props.app_state.loc['3055jv']/* 'Request ID' */, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':''+(new Date(time*1000).toLocaleString()), 'details':this.get_time_diff((Date.now()/1000) - (parseInt(time)))+this.props.app_state.loc['1698a']/* ' ago' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':alias, 'details':this.props.app_state.loc['3055jw']/* 'Request Author.' */, 'size':'l', 'title_image': e5_image})}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['3055jg']/* 'Set Amount.' */, 'subtitle':this.format_power_figure(amount), 'barwidth':this.get_number_width(amount), 'number':`${this.format_account_balance_figure(amount)}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['3092b']/* credits */, })}
                </div>
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':number_with_commas(contract_id), 'details':this.props.app_state.loc['3055kk']/* 'Pre-purchase Contract' */, 'size':'l', 'title_image': this.props.app_state.e5s[contract_e5].e5_img})}
                <div style={{height: 10}}/>

                {note != '' && this.render_detail_item('3', {'title':note, 'details':this.props.app_state.loc['3055km']/* 'Requested Transaction Note' */, 'size':'l'})}

                {credits_balance > 0 && mock_contract != null && (
                    <div>
                        <div style={{height:10}}/>
                        <div onClick={()=> this.fulfil_pre_purchase_request(amount, note, mock_contract)}>
                            {this.render_detail_item('5', {'text':this.props.app_state.loc['3055kn']/* 'Fulfil Request' */, 'action':''},)}
                        </div>
                    </div>
                )}
                {mock_contract == null && (
                    <div>
                        <div style={{height:10}}/>
                        {this.render_small_skeleton_object2()}
                    </div>
                )}
                
            </div>
        )
    }

    fulfil_pre_purchase_request(amount, transaction_note, contract){
        if(!this.does_account_have_enough_credits_for_transaction(amount, contract)){
            this.props.notify(this.props.app_state.loc['3055jk']/* You dont have enough credits to make that transaction. */, 6000)
        }
        else{
            this.props.emit_pre_purchase_transaction(amount, contract, transaction_note)
            this.props.open_dialog_bottomsheet()
        }
    }











    render_new_direct_message_chat_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_new_direct_message_chat_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_new_direct_message_chat_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
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
                        {this.render_new_direct_message_chat_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
            )
        }
    }

    render_new_direct_message_chat_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055kq']/* 'Target Recipient.' */, 'details':this.props.app_state.loc['3055kl']/* 'Specify the account you wish to send a direct message.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1407r']/* 'Alias or Account ID' */} when_text_input_field_changed={this.when_dm_recipient_input_field_changed.bind(this)} text={this.state.dm_recipient} theme={this.props.theme}/>
                {this.load_account_suggestions()}

                <div style={{height:10}}/>
                <div onClick={()=> this.make_new_direct_message_chat()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3055kr']/* 'Start Chat.' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_dm_recipient_input_field_changed(text){
        this.setState({dm_recipient: text})
    }

    load_account_suggestions(){
        var items = [].concat(this.get_suggested_accounts())
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 7px 0px', width: '97%', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 5px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
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
        return this.get_account_suggestions()
    }

    get_account_suggestions(){
        var contacts = this.props.app_state.contacts[this.props.app_state.selected_e5] == null ? [] : this.props.app_state.contacts[this.props.app_state.selected_e5]
        var return_array = []
        contacts.forEach(contact => {
            if(contact['id'].toString().includes(this.state.dm_recipient)){
                return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
            }
        });
        return_array = this.filter_and_add_other_accounts(this.state.dm_recipient, return_array)

        return return_array
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
        // const e5s = Object.keys(this.props.app_state.alias_bucket)
        // e5s.forEach(e5 => {
        //     const accounts = Object.keys(this.props.app_state.alias_bucket[e5])
        //     accounts.forEach(account_id => {
        //         const alias = this.props.app_state.alias_bucket[e5][account_id]
        //         if(!added_aliases.includes(alias) && alias.startsWith(typed_name.toLowerCase())){
        //             aliases.push({'id':account_id,'label':{'title':account_id, 'details':alias, 'size':'s'}})
        //         }
        //     });
        // });
        const e5 = this.props.app_state.selected_e5
        const accounts = Object.keys(this.props.app_state.alias_bucket[e5])
        accounts.forEach(account_id => {
            const alias = this.props.app_state.alias_bucket[e5][account_id]
            if(!added_aliases.includes(alias) && alias.toLowerCase().startsWith(typed_name.toLowerCase())){
                aliases.push({'id':account_id,'label':{'title':account_id, 'details':alias, 'size':'s'}})
            }
        });

        return aliases
    }

    get_contact_alias(contact){
        return (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[contact['id']] == null ? ((contact['address'].toString()).substring(0, 9) + "...") : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[contact['id']])
    }

    when_suggestion_clicked(item){
        this.setState({dm_recipient: item['label']['details']})
    }

    async make_new_direct_message_chat(){
        this.props.notify(this.props.app_state.loc['3055ks']/* 'Loading Chat...' */, 1200)
        const recipient = this.state.dm_recipient.trim()
        const recipient_id = await this.get_typed_alias_id(recipient)
        const recipient_e5 = this.get_recipient_e5(recipient)

        if(isNaN(recipient_id) || recipient_id =='' || parseInt(recipient_id) < 1001){
            this.props.notify(this.props.app_state.loc['1569']/* 'That ID is not valid' */, 3800)
        }
        else{
            this.props.start_new_direct_message_chat(recipient_id, recipient_e5)
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
        if(item_id == '8' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12' || item_id == '14') uploaded_data = this.props.app_state.uploaded_data
        return(
            <div>
                <ViewGroups show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} show_images={this.props.show_images.bind(this)} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
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

    get_number_width(number){
        if(number == null) return '0%'
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
    }


}




export default DialogPage;