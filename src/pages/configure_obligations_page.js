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

class ConfigureObligationsPage extends Component {
    
    state = {
        selected: 0, contract: null, id: makeid(8), type: this.props.app_state.loc['3093']/* 'configure-obligations' */, entered_indexing_tags:[this.props.app_state.loc['3093a']/* 'configure' */, this.props.app_state.loc['3093b']/* 'change' */,this.props.app_state.loc['3093c']/* 'obligations' */], 
        get_configure_obligations_title_tags_object:this.get_configure_obligations_title_tags_object(),

        default_job_contractor_income_obligation:0, default_enter_contract_obligation:0, default_spend_contract_obligation:0, default_proposal_bounty_obligation:0, default_storage_purchase_renewal_obligation:0, default_subscription_purchase_obligation:0, default_purchase_contract_credits_obligation:0,
        targeted_work_keyword:'', default_work_keyword_obligation:0, work_keywords:{},

        default_award_payment_obligation:0, default_direct_purchase_obligation:0, default_fulfilled_bags_obligation:0, default_audiopost_purchase_obligation:0, default_videopost_purchase_obligation:0, default_creator_group_payout_obligation:0, targeted_explore_keyword: '', default_explore_keyword_obligation:0, explore_keywords:{}, 

        default_direct_transfer_obligation:0, default_iTransfer_obligation:0, default_bill_payment_obligation:0, default_token_acquisition_obligation:0, default_token_remarket_obligation:0, default_royalty_payout_obligation:0, default_liquidity_deposit_withdraw_obligation:0, /* default_trust_fee_obligation:0, */

        default_keyword_combination:0, deadline_datetime:'1:1',

        reserved_keyword:'', reserved_keywords:[],

        selected_e5: this.props.app_state.selected_e5, typed_contract_account:'', contract_beneficiaries:{}
    };

    get_configure_obligations_title_tags_object(){
        const obj = {
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e','e.'+this.props.app_state.loc['3093e']/* 'work-obligations' */, 'e.'+this.props.app_state.loc['3093f']/* 'explore-obligations' */, this.props.app_state.loc['3093g']/* 'wallet-obligations' *//* , this.props.app_state.loc['3093e'] *//* 'obligation-children ↪️' */, this.props.app_state.loc['3093be']/* 'reserved-keywords ®' *//* , this.props.app_state.loc['3093er'] *//* 'beneficiaries 🔗' */], [0]
            ],
        };

        obj[this.props.app_state.loc['3093e']/* 'work-obligations' */] = [
            ['xor','',0], [this.props.app_state.loc['3093e']/* 'work-obligations' */,this.props.app_state.loc['3093k']/* 'default-settings ℹ️' */, this.props.app_state.loc['3093l']/* 'keyword-targets 🎯' */], [1]
        ]

        obj[this.props.app_state.loc['3093f']/* 'explore-obligations' */] = [
            ['xor','',0], [this.props.app_state.loc['3093f']/* 'explore-obligations' */,this.props.app_state.loc['3093k']/* 'default-settings ℹ️' */, this.props.app_state.loc['3093l']/* 'keyword-targets 🎯' */], [1]
        ]

        return obj
    }


    set_data(object){
        this.setState({contract: object, e5: object['e5']})
    }






    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} app_state={this.props.app_state} page_tags_object={this.state.get_configure_obligations_title_tags_object} tag_size={'l'} when_tags_updated={this.when_get_configure_obligations_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img alt="" className="text-end" onClick={()=>this.finish()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div>

                {this.render_everything()}
            </div>
        )
    }

    when_get_configure_obligations_title_tags_object_updated(tag_obj){
        this.setState({get_configure_obligations_title_tags_object: tag_obj})
    }

    render_everything(){
        if(this.state.contract == null) return;
        
        const active = this.state.get_configure_obligations_title_tags_object['i'].active
        const selected_item = this.get_selected_item(this.state.get_configure_obligations_title_tags_object, active)

        if(selected_item == 'e' && active == 'e'){
            return(
                <div>
                    {this.render_default_general_info()}
                </div>
            )
        }
        else if(active == this.props.app_state.loc['3093e']/* 'work-obligations 💼' */){
            if(selected_item == this.props.app_state.loc['3093k']/* 'default-settings ℹ️' */){
                return(
                    <div>
                        {this.render_work_default_settings_obligations_ui()}
                    </div>
                )
            }
            else if(selected_item == this.props.app_state.loc['3093l']/* 'keyword-targets 🎯' */){
                return(
                    <div>
                        {this.render_work_keyword_target_settings_obligations_ui()}
                    </div>
                )
            }
        }
        else if(active == this.props.app_state.loc['3093f']/* 'explore-obligations 🧭' */){
            if(selected_item == this.props.app_state.loc['3093k']/* 'default-settings ℹ️' */){
                return(
                    <div>
                        {this.render_explore_default_settings_obligations_ui()}
                    </div>
                )
            }
            else if(selected_item == this.props.app_state.loc['3093l']/* 'keyword-targets 🎯' */){
                return(
                    <div>
                        {this.render_explore_keyword_target_settings_obligations_ui()}
                    </div>
                )
            }
        }
        else if(active == 'e' && selected_item == this.props.app_state.loc['3093g']/* 'wallet-obligations 👛' */){
            return(
                <div>
                    {this.render_wallet_default_settings_obligations_ui()}
                </div>
            )
        }
        // else if(active == 'e' && selected_item == this.props.app_state.loc['3093e']/* 'obligation-children ↪️' */){
        //     return(
        //         <div>
                    
        //         </div>
        //     )
        // }
        else if(active == 'e' && selected_item == this.props.app_state.loc['3093be']/* 'reserved-keywords ®' */){
            return(
                <div>
                    {this.render_reserved_keywords_ui()}
                </div>
            )
        }
        else if(active == 'e' && selected_item == this.props.app_state.loc['3093er']/* 'beneficiaries 🔗' */){
            return(
                <div>
                    {this.render_contract_beneficiaries_ui()}
                </div>
            )
        }
    }

    render_default_general_info(){
        var size = this.props.app_state.size
        if(size == 's'){
            return(
                <div>
                    {this.render_default_general_data()}
                    {this.render_detail_item('0')}
                    {this.render_set_values()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_default_general_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_values()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_default_general_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_values()}
                    </div>
                </div>
            )
        }
    }

    render_default_general_data(){
        const date_object = this.get_deadline_date_object(this.state.deadline_datetime)
        const locale = navigator.language || navigator.userLanguage || 'en-US'
        return(
            <div>
                {this.render_contract(this.state.contract)}
                
                <div style={{ height:15 }}/>
                {this.render_restore_from_previous_data()}

                {this.render_detail_item('0')}
                
                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093du']/* 'Keyword Combinations.' */, 'details': this.props.app_state.loc['3093dv']/* 'Multiple targeted obligation keywords might be found in a given object. Set the maximum number that can be combined in such an instance.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                {this.render_detail_item('3', {'title':number_with_commas(this.state.default_keyword_combination), 'details':this.props.app_state.loc['3093dx']/* 'Keyword Combinations.' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={999} when_number_picker_value_changed={this.when_default_keyword_combination.bind(this)} theme={this.props.theme} power_limit={63} pick_with_text_area={true} text_area_hint={'3'}/>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093dy']/* 'Obligation Fulfilment Deadline.' */, 'details': this.props.app_state.loc['3093dz']/* 'The date after which obligation fulfilments will be rendered invalid in a given year.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                {this.render_detail_item('3', {'title':''+(date_object.toLocaleDateString(locale, { month: 'long', day: 'numeric' })), 'details':this.props.app_state.loc['3093eg']/* 'Deadline Date.' */, 'size':'l'})}
                <div style={{ height:10 }}/>

                <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], } })}>
                    <CssBaseline />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker 
                            orientation="portrait" 
                            onChange={(newValue) => this.when_new_date_value_set(newValue)}
                            views={['month', 'day']} // This restricts to month and day selection
                        />
                    </LocalizationProvider>
                </ThemeProvider>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093fg']/* 'Set Recommended Proportions.' */, 'details': this.props.app_state.loc['3093fh']/* 'Set the recommended 1.35% value for all default obligation items.' */, 'size': 'l' })}
                <div style={{ height: 10 }} />
                <div onClick={() => this.set_default_proportion()}>
                    {this.render_detail_item('5', { 'text': this.props.app_state.loc['3093fi']/* 'Set Default' */, 'action': '' })}
                </div>
            </div>
        )
    }

    set_default_proportion(){
        const default_proportion = bigInt('135e14')
        this.setState({
            default_job_contractor_income_obligation:default_proportion, default_enter_contract_obligation:default_proportion, default_spend_contract_obligation:default_proportion, default_proposal_bounty_obligation:default_proportion, default_storage_purchase_renewal_obligation:default_proportion, default_subscription_purchase_obligation:default_proportion, default_purchase_contract_credits_obligation:default_proportion,

            default_award_payment_obligation:default_proportion, default_direct_purchase_obligation:default_proportion, default_fulfilled_bags_obligation:default_proportion, default_audiopost_purchase_obligation:default_proportion, default_videopost_purchase_obligation:default_proportion, default_creator_group_payout_obligation:default_proportion, 

            default_direct_transfer_obligation:default_proportion, default_iTransfer_obligation:default_proportion, default_bill_payment_obligation:default_proportion, default_token_acquisition_obligation:default_proportion, default_token_remarket_obligation:default_proportion, default_royalty_payout_obligation:default_proportion, default_liquidity_deposit_withdraw_obligation:default_proportion,
        })
    }

    get_deadline_date_object(deadline_datetime){
        const day = deadline_datetime.split(':')[0]
        const month = deadline_datetime.split(':')[1]
        const year = new Date().getFullYear()
        
        return new Date(`${year}-${month<10 ? '0'+month : month}-${day<10 ? '0'+day : day}`)  
    }

    when_new_date_value_set(value){
        const selectedDate = value instanceof Date ? value : new Date(value);
        const day = selectedDate.getDate()
        const month = selectedDate.getMonth() + 1;
        const deadline_datetime = day+':'+month
        this.setState({deadline_datetime: deadline_datetime})
    }

    when_default_keyword_combination(number){
        this.setState({default_keyword_combination: number})
    }

    render_contract(object){
        const item = this.format_contract_item(object)
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']

        return(
                <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                    <div style={{'padding': '0px 0px 0px 5px'}}>
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

    format_contract_item(object){
        var main_contract_tags = ['Contract', 'main', object['e5'] ]
        var tags = object['ipfs'] == null ? (object['id'] == 2 ? main_contract_tags : ['Contract']) : [object['e5']].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Contract ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var time = object['event'] == null ? 0 : object['event'].returnValues.p4
        var object_id = number_with_commas(object['id'])
        var id_text = '• '+object_id
        var sender = ' • '+this.get_senders_name_or_you(object['event'].returnValues.p3, object['e5'])
        if(object['id'] == 2){
            id_text = '• '+'Main Contract'
            sender = ''
        } 
        var number = number_with_commas(age)
        var barwidth = this.get_number_width(age)
        var relativepower = this.get_time_difference(time)
        
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':id_text+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{ 'style':'s', 'title':'', 'subtitle':'', 'barwidth':barwidth, 'number':`${number}`, 'barcolor':'', 'relativepower':relativepower, }
        }
    }

    get_senders_name_or_you(sender, e5){
        if(sender == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* You. */
        }
        var bucket = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
        var alias = (bucket[sender] == null ? sender : bucket[sender])
            return alias
    }

    render_set_values(){
        const work_keyword_count = Object.keys(this.state.work_keywords).length
        const explore_keyword_count = Object.keys(this.state.explore_keywords).length
        return(
            <div>
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['3093ea']/* 'Targeted Work Keywords' */, 'subtitle':this.format_power_figure(work_keyword_count), 'barwidth':this.get_number_width(work_keyword_count), 'number':`${this.format_account_balance_figure(work_keyword_count)}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['3093ec']/* words */, })}
                </div>
                <div style={{height:10}}/>


                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['3093eb']/* 'Targeted Explore Keywords' */, 'subtitle':this.format_power_figure(explore_keyword_count), 'barwidth':this.get_number_width(explore_keyword_count), 'number':`${this.format_account_balance_figure(explore_keyword_count)}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['3093ec']/* words */, })}
                </div>
                <div style={{height:10}}/>


                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_job_contractor_income_obligation), 'details':this.props.app_state.loc['3093p']/* 'Default Job Contractor Income Obligation' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_enter_contract_obligation), 'details':this.props.app_state.loc['3093s']/* 'Enter Contract Obligation' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_purchase_contract_credits_obligation), 'details':this.props.app_state.loc['3093fe']/* 'Purchase Contract Credits Obligation.' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_spend_contract_obligation), 'details':this.props.app_state.loc['3093v']/* 'Spend Contract Obligation.' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_proposal_bounty_obligation), 'details':this.props.app_state.loc['3093y']/* 'Proposal Bounty Obligation' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_storage_purchase_renewal_obligation), 'details':this.props.app_state.loc['3093bb']/* 'Storage Purchase and Renewal Obligation' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_subscription_purchase_obligation), 'details':this.props.app_state.loc['3093bf']/* 'Subscription Purchase Obligation' */, 'size':'l'})}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_award_payment_obligation), 'details':this.props.app_state.loc['3093cb']/* 'Default Award Payment Obligation' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_direct_purchase_obligation), 'details':this.props.app_state.loc['3093ce']/* 'Direct Purchase Obligation.' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_fulfilled_bags_obligation), 'details':this.props.app_state.loc['3093ch']/* 'Fulfilled Bags Obligation' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_audiopost_purchase_obligation), 'details':this.props.app_state.loc['3093ck']/* 'Audiopost Purchase Obligation.' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_videopost_purchase_obligation), 'details':this.props.app_state.loc['3093cn']/* 'Videopost Purchase Obligation.' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_creator_group_payout_obligation), 'details':this.props.app_state.loc['3093cq']/* 'Creator Group Payout Obligation.' */, 'size':'l'})}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_direct_transfer_obligation), 'details':this.props.app_state.loc['3093cz']/* 'Direct Transfer Obligation.' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_iTransfer_obligation), 'details':this.props.app_state.loc['3093dc']/* 'iTransfer Obligation' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_bill_payment_obligation), 'details':this.props.app_state.loc['3093df']/* 'Bill Fulfilment Obligation.' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_token_acquisition_obligation), 'details':this.props.app_state.loc['3093di']/* 'Token Acquisition Obligation.' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_token_remarket_obligation), 'details':this.props.app_state.loc['3093ed']/* 'Token Remarket Obligation.' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_royalty_payout_obligation), 'details':this.props.app_state.loc['3093dn']/* 'Royalty Payout Obligation.' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_liquidity_deposit_withdraw_obligation), 'details':this.props.app_state.loc['3093dq']/* 'Liquidity Deposit Withdraw Obligation.' */, 'size':'l'})}
                <div style={{height:10}}/>

                {/* {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_trust_fee_obligation), 'details':this.props.app_state.loc['3093dt'] 'Trust Fee Obligation.', 'size':'l'})}
                <div style={{height:10}}/> */}
                
            </div>
        )
    }

    render_restore_from_previous_data(){
        const contract = this.state.contract
        const items = [].concat(this.sortByAttributeDescending(contract['obligation_configurations'], 'time'))
        const items2 = [0, 1]
        return(
            <div>
                
                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093eh']/* 'Restore Previous Setting' */, 'details': this.props.app_state.loc['3093ei']/* 'You may optionally restore a previous configuration from your history.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_obligation_configuration_item(item)}
                            </li>
                        ))}
                        {items2.map(() => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_empty_horizontal_list_item()}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    render_empty_horizontal_list_item(){
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

    render_obligation_configuration_item(item){
        const time = item['time']
        const details = (new Date(time*1000).toLocaleString())
        const title = this.props.app_state.loc['2214bp']/* 'As of $' */.replace('$', this.get_time_diff((Date.now()/1000) - (parseInt(time))))
        return(
            <div onClick={() => this.when_obligation_configuration_item_clicked(item)}>
                {this.render_detail_item('3', {'title':title, 'details':''+details, 'size':'l'})}
            </div>
        )
    }

    when_obligation_configuration_item_clicked(item){
        const contract = this.state.contract;
        const new_state = {}
        Object.assign(new_state, item['ipfs'])
        new_state.contract = contract;
        this.setState(new_state)
        this.props.notify(this.props.app_state.loc['3093ej']/* 'Configuration set from history item.' */, 6000)
    }





    render_work_default_settings_obligations_ui(){
        var size = this.props.app_state.size
        if(size == 's'){
            return(
                <div>
                    {this.render_work_obligations_data()}
                    {this.render_detail_item('0')}
                    {this.render_work_obligations_data2()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_work_obligations_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_work_obligations_data2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_work_obligations_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_work_obligations_data2()}
                    </div>
                </div>
            )
        }
    }

    render_work_obligations_data(){
        return(
            <div>
                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093i']/* 'Default Work Obligation Settings.' */, 'details': this.props.app_state.loc['3093j']/* 'Configure all your obligations targeted at the work section of e.' */, 'size': 'l' })}
                {this.render_detail_item('0')}

                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093m']/* 'Default Job and Contractor Payments' */, 'details': this.props.app_state.loc['3093n']/* 'Set a default proportion for payments made to contractors for work done.' */, 'size': 'l' })}

                {this.render_detail_item('10', {'text':this.props.app_state.loc['3093o']/* 'This is the default figure used when no keyword target applies to a given job.' */, 'textsize':'10px', 'font':this.props.app_state.font})}
                <div style={{ height:10 }}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_job_contractor_income_obligation), 'details':this.props.app_state.loc['3093p']/* 'Default Job Contractor Income Obligation' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_default_job_contractor_income_obligation_proportion.bind(this)} theme={this.props.theme} power_limit={9} decimal_count={16} pick_with_text_area={true} text_area_hint={'1.35%'}/>
                {this.render_detail_item('0')}



                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093q']/* 'Enter Contract.' */, 'details': this.props.app_state.loc['3093r']/* 'The default obligataion for all actions involving entering contracts.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_enter_contract_obligation), 'details':this.props.app_state.loc['3093s']/* 'Enter Contract Obligation' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_default_enter_contract_obligation_proportion.bind(this)} theme={this.props.theme} power_limit={9} decimal_count={16} pick_with_text_area={true} text_area_hint={'1.35%'}/>
                {this.render_detail_item('0')}



                
                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093fc']/* 'Purchase Contract Credits.' */, 'details': this.props.app_state.loc['3093fd']/* 'The default obligation for all actions involving purchase of contract credits.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_purchase_contract_credits_obligation), 'details':this.props.app_state.loc['3093fe']/* 'Purchase Contract Credits Obligation.' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_default_purchase_contract_credits_obligation_proportion.bind(this)} theme={this.props.theme} power_limit={9} decimal_count={16} pick_with_text_area={true} text_area_hint={'1.35%'}/>
                {this.render_detail_item('0')}



                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093t']/* 'Spend Contract.' */, 'details': this.props.app_state.loc['3093u']/* 'The default obligation for all actions involving spending contracts.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_spend_contract_obligation), 'details':this.props.app_state.loc['3093v']/* 'Spend Contract Obligation.' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_default_spend_contract_obligation_proportion.bind(this)} theme={this.props.theme} power_limit={9} decimal_count={16} pick_with_text_area={true} text_area_hint={'1.35%'}/>
                
            </div>
        )
    }

    render_work_obligations_data2(){
        return(
            <div>
                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093w']/* 'Proposal Bounties.' */, 'details': this.props.app_state.loc['3093x']/* ''The default obligation for issuing bounty for proposals sent to contracts.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_proposal_bounty_obligation), 'details':this.props.app_state.loc['3093y']/* 'Proposal Bounty Obligation' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_default_proposal_bounty_obligation_proportion.bind(this)} theme={this.props.theme} power_limit={9} decimal_count={16} pick_with_text_area={true} text_area_hint={'1.35%'}/>
                {this.render_detail_item('0')}



                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093z']/* 'Indexer Storage Purchases and Renewals' */, 'details': this.props.app_state.loc['3093ba']/* 'The default obligation for purchasing and renewing storage on indexers.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_storage_purchase_renewal_obligation), 'details':this.props.app_state.loc['3093bb']/* 'Storage Purchase and Renewal Obligation' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_default_storage_purchase_renewal_obligation_proportion.bind(this)} theme={this.props.theme} power_limit={9} decimal_count={16} pick_with_text_area={true} text_area_hint={'1.35%'}/>
                {this.render_detail_item('0')}




                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093bc']/* 'Subscription Purchase' */, 'details': this.props.app_state.loc['3093bd']/* 'The default obligation for purchasing subscriptions.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_subscription_purchase_obligation), 'details':this.props.app_state.loc['3093bf']/* 'Subscription Purchase Obligation' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_default_subscription_purchase_obligation_proportion.bind(this)} theme={this.props.theme} power_limit={9} decimal_count={16} pick_with_text_area={true} text_area_hint={'1.35%'}/>
            </div>
        )
    }

    when_default_job_contractor_income_obligation_proportion(number){
        this.setState({default_job_contractor_income_obligation: number})
    }

    when_default_enter_contract_obligation_proportion(number){
        this.setState({default_enter_contract_obligation: number})
    }

    when_default_spend_contract_obligation_proportion(number){
        this.setState({default_spend_contract_obligation: number})
    }

    when_default_proposal_bounty_obligation_proportion(number){
        this.setState({default_proposal_bounty_obligation: number})
    }

    when_default_storage_purchase_renewal_obligation_proportion(number){
        this.setState({default_storage_purchase_renewal_obligation: number})
    }

    when_default_subscription_purchase_obligation_proportion(number){
        this.setState({default_subscription_purchase_obligation: number})
    }

    when_default_purchase_contract_credits_obligation_proportion(number){
        this.setState({default_purchase_contract_credits_obligation: number})
    }








    render_work_keyword_target_settings_obligations_ui(){
        var size = this.props.app_state.size
        if(size == 's'){
            return(
                <div>
                    {this.render_work_keyword_target_obligations_data()}
                    {this.render_detail_item('0')}
                    {this.render_set_work_keywords()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_work_keyword_target_obligations_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_work_keywords()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_work_keyword_target_obligations_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_work_keywords()}
                    </div>
                </div>
            )
        }
    }

    render_work_keyword_target_obligations_data(){
        return(
            <div>
                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093bg']/* 'Keyword Target Obligation Settings.' */, 'details': this.props.app_state.loc['3093bh']/* 'Configure the keywords you wish to target in the work section.' */, 'size': 'l' })}

                {this.render_detail_item('10', {'text':this.props.app_state.loc['3093bi']/* 'These keyword targets will be applied in the job and contractor sections exclusively.' */, 'textsize':'10px', 'font':this.props.app_state.font})}
                {this.render_detail_item('0')}


                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093bj']/* 'New Targeted Keyword' */, 'details': this.props.app_state.loc['3093bk']/* 'Type a keyword you wish to target with a specified obligation.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3093bl']/* 'Keyword...' */} when_text_input_field_changed={this.when_targeted_work_keyword_input_field_changed.bind(this)} text={this.state.targeted_work_keyword} theme={this.props.theme}/>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093bm']/* 'The Keyword\'s Obligation.' */, 'details': this.props.app_state.loc['3093bn']/* 'Set the obligation for the specified keyword.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_work_keyword_obligation), 'details':this.props.app_state.loc['3093y']/* 'Proposal Bounty Obligation' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_default_work_keyword_obligation_proportion.bind(this)} theme={this.props.theme} power_limit={9} decimal_count={16} pick_with_text_area={true} text_area_hint={'1.35%'}/>

                <div style={{ height: 10 }} />
                <div onClick={() => this.add_work_keyword_obligation()}>
                    {this.render_detail_item('5', { 'text': this.props.app_state.loc['3093bo']/* 'Add Keyword' */, 'action': '' })}
                </div>
            </div>
        )
    }

    when_targeted_work_keyword_input_field_changed(text){
        this.setState({targeted_work_keyword: text})
    }

    when_default_work_keyword_obligation_proportion(number){
        this.setState({default_work_keyword_obligation: number})
    }

    add_work_keyword_obligation(){
        const keyword = this.state.targeted_work_keyword.trim().toLowerCase()
        const proportion = this.state.default_work_keyword_obligation

        if(keyword == ''){
            this.props.notify(this.props.app_state.loc['128']/* 'type something!' */, 1400)
        }
        // else if(this.hasWhiteSpace(keyword)){
        //     this.props.notify(this.props.app_state.loc['129']/* 'enter one word!' */, 1400)
        // }
        else if(keyword.length > this.props.app_state.tag_size){
            this.props.notify(this.props.app_state.loc['3093bp']/* 'That word is too long.' */, 2400)
        }
        else if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(keyword)){
            this.props.notify(this.props.app_state.loc['162m'], 4400)/* You cant use special characters. */
        }
        else if(proportion > bigInt('51e16')){
            this.props.notify(this.props.app_state.loc['3093br'], 6400)/* 'You cant set a target higher than 51%' */
        }
        else if(proportion == 0){
            this.props.notify(this.props.app_state.loc['3093bs'], 6400)/* 'You cant set a target of 0%' */
        }
        else{
            const clone = structuredClone(this.state.work_keywords)
            clone[keyword] = {'proportion': proportion}
            this.setState({work_keywords: clone, targeted_work_keyword: ''})
        }
    }

    hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
    }

    render_set_work_keywords(){
        const items = [].concat(Object.keys(this.state.work_keywords))

        if(items.length == 0){
            return(
                <div>
                    {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093bu']/* 'Added Keywords' */, 'details': this.props.app_state.loc['3093bv']/* 'When you add an obligation, it will show here.' */, 'size': 'l' })}
                    <div style={{ height:10 }}/>
                    {this.render_empty_views(3)}
                </div>
            )
        }

        return(
            <div style={{}}>
                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093bu']/* 'Added Keywords' */, 'details': this.props.app_state.loc['3093bw']/* 'All the keywords targeted for work obligations.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>
                <ul style={{ 'padding': '0px 5px 0px 5px'}}>
                    <SwipeableList>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 5px 2px 5px'}}>
                                <div key={index}>
                                    <SwipeableListItem
                                        swipeLeft={{
                                        content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['3093bt']/* Edit */}</p>,
                                        action: () =>this.when_work_keyword_target_clicked(item)
                                        }}>
                                        <div style={{width:'100%', /* 'background-color':this.props.theme['send_receive_ether_background_color'] */}}>
                                            {this.render_target_item(item)}
                                        </div>
                                    </SwipeableListItem>
                                </div>
                            </li> 
                        ))}
                    </SwipeableList>
                    
                </ul>
            </div>
        )
    }

    render_target_item(item){
        const object = this.state.work_keywords[item]
        const proportion = object['proportion']
        return(
            <div>
                {this.render_detail_item('3', {'title':this.format_proportion(proportion), 'details':item, 'size':'l'})}
            </div>
        )
    }

    when_work_keyword_target_clicked(item){
        const clone = structuredClone(this.state.work_keywords)
        const object = clone[item]
        const proportion = object['proportion']
        this.setState({targeted_work_keyword: item, default_work_keyword_obligation: proportion})
        delete clone[item];
        this.setState({work_keywords: clone})
    }








    render_explore_default_settings_obligations_ui(){
        var size = this.props.app_state.size
        if(size == 's'){
            return(
                <div>
                    {this.render_explore_obligations_data()}
                    {this.render_detail_item('0')}
                    {this.render_explore_obligations_data2()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_explore_obligations_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_explore_obligations_data2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_explore_obligations_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_explore_obligations_data2()}
                    </div>
                </div>
            )
        }
    }

    render_explore_obligations_data(){
        return(
            <div>
                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093bx']/* 'Default Explore Obligation Settings.' */, 'details': this.props.app_state.loc['3093by']/* 'Configure all your obligations targeted at the explore section of e.' */, 'size': 'l' })}
                {this.render_detail_item('0')}


                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093bz']/* 'Award Payments.' */, 'details': this.props.app_state.loc['3093ca']/* 'Set the default proportion for awards issued in posts and comments.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_award_payment_obligation), 'details':this.props.app_state.loc['3093cb']/* 'Default Award Payment Obligation' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_default_award_payment_obligation_proportion.bind(this)} theme={this.props.theme} power_limit={9} decimal_count={16} pick_with_text_area={true} text_area_hint={'1.35%'}/>
                {this.render_detail_item('0')}




                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093cc']/* 'Direct Purchase' */, 'details': this.props.app_state.loc['3093cd']/* 'Set the default proportion used in direct purchases.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_direct_purchase_obligation), 'details':this.props.app_state.loc['3093ce']/* 'Direct Purchase Obligation.' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_default_direct_purchase_obligation_proportion.bind(this)} theme={this.props.theme} power_limit={9} decimal_count={16} pick_with_text_area={true} text_area_hint={'1.35%'}/>
                {this.render_detail_item('0')}



                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093cf']/* 'Fulfilled Bag Payment.' */, 'details': this.props.app_state.loc['3093cg']/* 'Set the default proportion used in payments made after bags are fulfilled.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_fulfilled_bags_obligation), 'details':this.props.app_state.loc['3093ch']/* 'Fulfilled Bags Obligation' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_default_fulfilled_bags_obligation_proportion.bind(this)} theme={this.props.theme} power_limit={9} decimal_count={16} pick_with_text_area={true} text_area_hint={'1.35%'}/>
            </div>
        )
    }

    render_explore_obligations_data2(){
        return(
            <div>
                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093ci']/* 'Audiopost Purchase.' */, 'details': this.props.app_state.loc['3093cj']/* 'Set the default proportion used in purchases for audio media.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_audiopost_purchase_obligation), 'details':this.props.app_state.loc['3093ck']/* 'Audiopost Purchase Obligation.' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_default_audiopost_purchase_obligation_proportion.bind(this)} theme={this.props.theme} power_limit={9} decimal_count={16} pick_with_text_area={true} text_area_hint={'1.35%'}/>
                {this.render_detail_item('0')}




                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093cl']/* 'Videopost Purchase.' */, 'details': this.props.app_state.loc['3093cm']/* 'Set the default proportion used in purchases for video media.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_videopost_purchase_obligation), 'details':this.props.app_state.loc['3093cn']/* 'Videopost Purchase Obligation.' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_default_videopost_purchase_obligation_proportion.bind(this)} theme={this.props.theme} power_limit={9} decimal_count={16} pick_with_text_area={true} text_area_hint={'1.35%'}/>
                {this.render_detail_item('0')}



                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093co']/* 'Creator Group Payout.' */, 'details': this.props.app_state.loc['3093cp']/* 'Set the default proportion used in creator group payouts.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_creator_group_payout_obligation), 'details':this.props.app_state.loc['3093cq']/* 'Creator Group Payout Obligation.' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_default_creator_group_payout_obligation_proportion.bind(this)} theme={this.props.theme} power_limit={9} decimal_count={16} pick_with_text_area={true} text_area_hint={'1.35%'}/>
            </div>
        )
    }

    when_default_award_payment_obligation_proportion(number){
        this.setState({default_award_payment_obligation: number})
    }

    when_default_direct_purchase_obligation_proportion(number){
        this.setState({default_direct_purchase_obligation: number})
    }

    when_default_fulfilled_bags_obligation_proportion(number){
        this.setState({default_fulfilled_bags_obligation: number})
    }

    when_default_audiopost_purchase_obligation_proportion(number){
        this.setState({default_audiopost_purchase_obligation: number})
    }

    when_default_videopost_purchase_obligation_proportion(number){
        this.setState({default_videopost_purchase_obligation: number})
    }

    when_default_creator_group_payout_obligation_proportion(number){
        this.setState({default_creator_group_payout_obligation: number})
    }









    render_explore_keyword_target_settings_obligations_ui(){
        var size = this.props.app_state.size
        if(size == 's'){
            return(
                <div>
                    {this.render_explore_keyword_target_obligations_data()}
                    {this.render_detail_item('0')}
                    {this.render_set_explore_keywords()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_explore_keyword_target_obligations_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_explore_keywords()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_explore_keyword_target_obligations_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_explore_keywords()}
                    </div>
                </div>
            )
        }
    }

    render_explore_keyword_target_obligations_data(){
        return(
            <div>
                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093bg']/* 'Keyword Target Obligation Settings.' */, 'details': this.props.app_state.loc['3093cr']/* 'Configure the keywords you wish to target in the explore section.' */, 'size': 'l' })}

                {this.render_detail_item('10', {'text':this.props.app_state.loc['3093cs']/* 'These keyword targets will be applied in the storefront and bag sections exclusively.' */, 'textsize':'10px', 'font':this.props.app_state.font})}
                {this.render_detail_item('0')}


                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093bj']/* 'New Targeted Keyword' */, 'details': this.props.app_state.loc['3093bk']/* 'Type a keyword you wish to target with a specified obligation.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3093bl']/* 'Keyword...' */} when_text_input_field_changed={this.when_targeted_explore_keyword_input_field_changed.bind(this)} text={this.state.targeted_explore_keyword} theme={this.props.theme}/>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093bm']/* 'The Keyword\'s Obligation.' */, 'details': this.props.app_state.loc['3093bn']/* 'Set the obligation for the specified keyword.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_explore_keyword_obligation), 'details':this.props.app_state.loc['3093y']/* 'Proposal Bounty Obligation' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_default_explore_keyword_obligation_proportion.bind(this)} theme={this.props.theme} power_limit={9} decimal_count={16} pick_with_text_area={true} text_area_hint={'1.35%'}/>

                <div style={{ height: 10 }} />
                <div onClick={() => this.add_explore_keyword_obligation()}>
                    {this.render_detail_item('5', { 'text': this.props.app_state.loc['3093bo']/* 'Add Keyword' */, 'action': '' })}
                </div>
            </div>
        )
    }

    when_targeted_explore_keyword_input_field_changed(text){
        this.setState({targeted_explore_keyword: text})
    }

    when_default_explore_keyword_obligation_proportion(number){
        this.setState({default_explore_keyword_obligation: number})
    }

    add_explore_keyword_obligation(){
        const keyword = this.state.targeted_explore_keyword.trim().toLowerCase()
        const proportion = this.state.default_explore_keyword_obligation

        if(keyword == ''){
            this.props.notify(this.props.app_state.loc['128']/* 'type something!' */, 1400)
        }
        // else if(this.hasWhiteSpace(keyword)){
        //     this.props.notify(this.props.app_state.loc['129']/* 'enter one word!' */, 1400)
        // }
        else if(keyword.length > this.props.app_state.tag_size){
            this.props.notify(this.props.app_state.loc['3093bp']/* 'That word is too long.' */, 2400)
        }
        else if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(keyword)){
            this.props.notify(this.props.app_state.loc['162m'], 4400)/* You cant use special characters. */
        }
        else if(proportion > bigInt('51e16')){
            this.props.notify(this.props.app_state.loc['3093br'], 6400)/* 'You cant set a target higher than 51%' */
        }
        else if(proportion == 0){
            this.props.notify(this.props.app_state.loc['3093bs'], 6400)/* 'You cant set a target of 0%' */
        }
        else{
            const clone = structuredClone(this.state.explore_keywords)
            clone[keyword] = {'proportion': proportion}
            this.setState({explore_keywords: clone, targeted_explore_keyword: ''})
        }
    }

    render_set_explore_keywords(){
        const items = [].concat(Object.keys(this.state.explore_keywords))

        if(items.length == 0){
            return(
                <div>
                    {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093bu']/* 'Added Keywords' */, 'details': this.props.app_state.loc['3093bv']/* 'When you add an obligation, it will show here.' */, 'size': 'l' })}
                    <div style={{ height:10 }}/>
                    {this.render_empty_views(3)}
                </div>
            )
        }

        return(
            <div style={{}}>
                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093bu']/* 'Added Keywords' */, 'details': this.props.app_state.loc['3093ct']/* 'All the keywords targeted for explore obligations.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>
                <ul style={{ 'padding': '0px 5px 0px 5px'}}>
                    <SwipeableList>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 5px 2px 5px'}}>
                                <div key={index}>
                                    <SwipeableListItem
                                        swipeLeft={{
                                        content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['3093bt']/* Edit */}</p>,
                                        action: () =>this.when_explore_keyword_target_clicked(item)
                                        }}>
                                        <div style={{width:'100%', /* 'background-color':this.props.theme['send_receive_ether_background_color'] */}}>
                                            {this.render_target_item2(item)}
                                        </div>
                                    </SwipeableListItem>
                                </div>
                            </li> 
                        ))}
                    </SwipeableList>
                    
                </ul>
            </div>
        )
    }

    render_target_item2(item){
        const object = this.state.explore_keywords[item]
        const proportion = object['proportion']
        return(
            <div>
                {this.render_detail_item('3', {'title':this.format_proportion(proportion), 'details':item, 'size':'l'})}
            </div>
        )
    }

    when_explore_keyword_target_clicked(item){
        const clone = structuredClone(this.state.explore_keywords)
        const object = clone[item]
        const proportion = object['proportion']
        this.setState({targeted_explore_keyword: item, default_explore_keyword_obligation: proportion})
        delete clone[item];
        this.setState({explore_keywords: clone})
    }







    render_wallet_default_settings_obligations_ui(){
        var size = this.props.app_state.size
        if(size == 's'){
            return(
                <div>
                    {this.render_wallet_obligations_data()}
                    {this.render_detail_item('0')}
                    {this.render_wallet_obligations_data2()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_wallet_obligations_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_wallet_obligations_data2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_wallet_obligations_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_wallet_obligations_data2()}
                    </div>
                </div>
            )
        }
    }

    render_wallet_obligations_data(){
        return(
            <div>
                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093cu']/* 'Default Wallet Obligation Settings.' */, 'details': this.props.app_state.loc['3093cv']/* 'Configure all your obligations targeted at the wallet section of e.' */, 'size': 'l' })}

                {this.render_detail_item('10', {'text':this.props.app_state.loc['3093cw']/* 'These settings only apply to E5 assets and not Coins and Ethers.' */, 'textsize':'10px', 'font':this.props.app_state.font})}
                {this.render_detail_item('0')}


                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093cx']/* 'Direct Transfer.' */, 'details': this.props.app_state.loc['3093cy']/* 'Set the default proportion for direct transfer actions.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_direct_transfer_obligation), 'details':this.props.app_state.loc['3093cz']/* 'Direct Transfer Obligation.' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_default_direct_transfer_obligation_proportion.bind(this)} theme={this.props.theme} power_limit={9} decimal_count={16} pick_with_text_area={true} text_area_hint={'1.35%'}/>
                {this.render_detail_item('0')}



                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093da']/* 'Contextual Transfer(iTransfer)' */, 'details': this.props.app_state.loc['3093db']/* 'Set the default proportion for contextual transfers in the iTransfer section.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_iTransfer_obligation), 'details':this.props.app_state.loc['3093dc']/* 'iTransfer Obligation' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_default_iTransfer_obligation_proportion.bind(this)} theme={this.props.theme} power_limit={9} decimal_count={16} pick_with_text_area={true} text_area_hint={'1.35%'}/>
                {this.render_detail_item('0')}




                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093dd']/* 'Bill Fulfilment' */, 'details': this.props.app_state.loc['3093de']/* 'Set the default proportion for payments made to fulfil received bills.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_bill_payment_obligation), 'details':this.props.app_state.loc['3093df']/* 'Bill Fulfilment Obligation.' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_default_bill_payment_obligation_proportion.bind(this)} theme={this.props.theme} power_limit={9} decimal_count={16} pick_with_text_area={true} text_area_hint={'1.35%'}/>
                {this.render_detail_item('0')}




                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093dg']/* 'Token Acquisition.' */, 'details': this.props.app_state.loc['3093dh']/* 'Set the default proportion for payments made to acquire tokens.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_token_acquisition_obligation), 'details':this.props.app_state.loc['3093di']/* 'Token Acquisition Obligation.' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_default_token_acquisition_obligation_proportion.bind(this)} theme={this.props.theme} power_limit={9} decimal_count={16} pick_with_text_area={true} text_area_hint={'1.35%'}/>
            </div>
        )
    }

    render_wallet_obligations_data2(){
        return(
            <div>
                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093dj']/* 'Token Remarket' */, 'details': this.props.app_state.loc['3093dk']/* 'Set the default proportion for actions involving token dumping or selling.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_token_remarket_obligation), 'details':this.props.app_state.loc['3093ed']/* 'Token Remarket Obligation.' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_default_token_remarket_obligation_proportion.bind(this)} theme={this.props.theme} power_limit={9} decimal_count={16} pick_with_text_area={true} text_area_hint={'1.35%'}/>
                {this.render_detail_item('0')}



                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093dl']/* 'Royalty Payout.' */, 'details': this.props.app_state.loc['3093dm']/* 'Set the default proportion for actions involving royalty payouts from exchanges.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_royalty_payout_obligation), 'details':this.props.app_state.loc['3093dn']/* 'Royalty Payout Obligation.' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_default_royalty_payout_obligation_proportion.bind(this)} theme={this.props.theme} power_limit={9} decimal_count={16} pick_with_text_area={true} text_area_hint={'1.35%'}/>
                {this.render_detail_item('0')}



                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093do']/* 'Exchange Liquidity Deposit and Withdrawal.' */, 'details': this.props.app_state.loc['3093dp']/* 'Set the default proportion for actions involving depositing or withdrawing liquidity from a given exchange.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_liquidity_deposit_withdraw_obligation), 'details':this.props.app_state.loc['3093dq']/* 'Liquidity Deposit Withdraw Obligation.' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_default_liquidity_deposit_withdraw_obligation_proportion.bind(this)} theme={this.props.theme} power_limit={9} decimal_count={16} pick_with_text_area={true} text_area_hint={'1.35%'}/>
                {this.render_detail_item('0')}



                {/* {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093dr'] 'Trust Fee Reception.', 'details': this.props.app_state.loc['3093ds'] 'Set the default proportion for actions involving trust fee payments when tokens are spent from a given contract.', 'size': 'l' })}
                <div style={{ height:10 }}/>

                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_trust_fee_obligation), 'details':this.props.app_state.loc['3093dt']'Trust Fee Obligation.', 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_default_trust_fee_obligation_proportion.bind(this)} theme={this.props.theme} power_limit={9} decimal_count={16} pick_with_text_area={true} text_area_hint={'1.35%'}/> */}
            </div>
        )
    }

    when_default_direct_transfer_obligation_proportion(number){
        this.setState({default_direct_transfer_obligation: number})
    }

    when_default_iTransfer_obligation_proportion(number){
        this.setState({default_iTransfer_obligation: number})
    }

    when_default_bill_payment_obligation_proportion(number){
        this.setState({default_bill_payment_obligation: number})
    }

    when_default_token_acquisition_obligation_proportion(number){
        this.setState({default_token_acquisition_obligation: number})
    }

    when_default_token_remarket_obligation_proportion(number){
        this.setState({default_token_remarket_obligation: number})
    }

    when_default_royalty_payout_obligation_proportion(number){
        this.setState({default_royalty_payout_obligation: number})
    }

    when_default_liquidity_deposit_withdraw_obligation_proportion(number){
        this.setState({default_liquidity_deposit_withdraw_obligation: number})
    }

    when_default_trust_fee_obligation_proportion(number){
        this.setState({default_trust_fee_obligation: number})
    }









    render_reserved_keywords_ui(){
        var size = this.props.app_state.size
        if(size == 's'){
            return(
                <div>
                    {this.render_reserved_keywords_data()}
                    {this.render_detail_item('0')}
                    {this.render_set_reserved_keywords()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_reserved_keywords_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_reserved_keywords()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_reserved_keywords_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_reserved_keywords()}
                    </div>
                </div>
            )
        }
    }

    render_reserved_keywords_data(){
        return(
            <div>
                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093ek']/* 'Reserve Keywords.' */, 'details': this.props.app_state.loc['3093el']/* 'Reserve keywords from being used in the work and explore sections.' */, 'size': 'l' })}

                {this.render_detail_item('10', {'text':this.props.app_state.loc['3093em']/* 'These reservations will only be applied in the jobs, contractors and storefront section.' */, 'textsize':'10px', 'font':this.props.app_state.font})}
                <div style={{ height:10 }}/>

                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3093bl']/* 'Keyword...' */} when_text_input_field_changed={this.when_reserved_keyword_input_field_changed.bind(this)} text={this.state.reserved_keyword} theme={this.props.theme}/>

                <div style={{ height: 10 }} />
                <div onClick={() => this.add_reserved_keyword_obligation()}>
                    {this.render_detail_item('5', { 'text': this.props.app_state.loc['3093bo']/* 'Add Keyword' */, 'action': '' })}
                </div>
            </div>
        )
    }

    when_reserved_keyword_input_field_changed(text){
        this.setState({reserved_keyword: text})
    }

    add_reserved_keyword_obligation(){
        const keyword = this.state.reserved_keyword.trim().toLowerCase()

        if(keyword == ''){
            this.props.notify(this.props.app_state.loc['128']/* 'type something!' */, 1400)
        }
        // else if(this.hasWhiteSpace(keyword)){
        //     this.props.notify(this.props.app_state.loc['129']/* 'enter one word!' */, 1400)
        // }
        else if(keyword.length > this.props.app_state.tag_size){
            this.props.notify(this.props.app_state.loc['3093bp']/* 'That word is too long.' */, 2400)
        }
        else if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(keyword)){
            this.props.notify(this.props.app_state.loc['162m'], 4400)/* You cant use special characters. */
        }
        else if(this.state.reserved_keywords.includes(keyword)){
            this.props.notify(this.props.app_state.loc['3093en']/* 'Youve already reserved that keyword' */, 5400)
        }
        else{
            const clone = this.state.reserved_keywords.slice()
            clone.push(keyword)
            this.setState({reserved_keywords: clone, reserved_keyword: ''})
        }
    }

    render_set_reserved_keywords(){
        const all_items = [].concat(this.state.reserved_keywords)
        const items = all_items.filter((keyword) => {
            return (keyword.startsWith(this.state.reserved_keyword.toLowerCase()) || this.state.reserved_keyword == '')
        }).slice(0, 15)

        if(items.length == 0){
            return(
                <div>
                    {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093bu']/* 'Added Keywords' */, 'details': this.props.app_state.loc['3093eo']/* 'When you reserve a keyword, it will show here.' */, 'size': 'l' })}
                    <div style={{ height:10 }}/>
                    {this.render_empty_views(3)}
                </div>
            )
        }

        return(
            <div style={{}}>
                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093bu']/* 'Added Keywords' */, 'details': this.props.app_state.loc['3093ep']/* 'All the keywords reserved for the two sections.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>
                <ul style={{ 'padding': '0px 5px 0px 5px'}}>
                    <SwipeableList>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 5px 2px 5px'}}>
                                <div key={index}>
                                    <SwipeableListItem
                                        swipeLeft={{
                                        content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['3093eq']/* Delete */}</p>,
                                        action: () =>this.when_reserved_keyword_target_clicked(item)
                                        }}>
                                        <div style={{width:'100%', /* 'background-color':this.props.theme['send_receive_ether_background_color'] */}}>
                                            {this.render_detail_item('4', {'text':item, 'textsize':'12px', 'font':this.props.app_state.font})}
                                        </div>
                                    </SwipeableListItem>
                                </div>
                            </li> 
                        ))}
                    </SwipeableList>
                    
                </ul>
            </div>
        )
    }

    when_reserved_keyword_target_clicked(item){
        const clone = this.state.reserved_keywords.slice()
        const index = clone.indexOf(item)
        if(index != -1){
            clone.splice(index, 1)
        }
        this.setState({reserved_keywords: clone})
    }







    render_contract_beneficiaries_ui(){
        var size = this.props.app_state.size
        if(size == 's'){
            return(
                <div>
                    {this.render_contract_beneficiaries_data()}
                    {this.render_detail_item('0')}
                    {this.render_set_beneficiaries()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_contract_beneficiaries_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_beneficiaries()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_contract_beneficiaries_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_beneficiaries()}
                    </div>
                </div>
            )
        }
    }

    render_contract_beneficiaries_data(){
        return(
            <div>
                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093ff']/* 'Contract Beneficiaries.' */, 'details': this.props.app_state.loc['3093es']/* 'Specify obligation fulfilments for payments made in the other E5s.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                {this.load_e5_selector_ui()}
                <div style={{ height:10 }}/>

                <div className="row">
                    <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput height={30} placeholder={this.props.app_state.loc['3093et']/* 'Contract Account...' */} when_text_input_field_changed={this.when_typed_contract_account_input_field_changed.bind(this)} text={this.state.typed_contract_account} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}} onClick={()=> this.search_contract_id()}>
                        <div className="text-end" style={{'padding': '5px 10px 0px 0px'}} >
                            <img alt="" className="text-end" src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                        </div>
                    </div>
                </div>
                <div style={{height:10}}/>

                {this.render_searched_contract()}
            </div>
        )
    }

    when_typed_contract_account_input_field_changed(text){
        this.setState({typed_contract_account: text})
    }

    load_e5_selector_ui(){
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
                            {this.render_empty_horizontal_list_item()}
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

    render_e5_item(item){
        var image = this.props.app_state.e5s[item].e5_img
        var details = this.props.app_state.e5s[item].token
        const opacity = this.state.contract_beneficiaries[item] == null ? 1.0 : 0.5
        if(this.state.selected_e5 == item){
            return(
                <div style={{opacity: opacity}}>
                    {this.render_detail_item('12', {'title':item, 'image':image,'details':details, 'size':'s'})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }else{
            return(
                <div style={{opacity: opacity}}>
                    {this.render_detail_item('12', {'title':item, 'image':image, 'details':details, 'size':'s'})}
                </div>
            )
        }
    }

    when_e5_clicked(item){
        this.setState({selected_e5: item})
    }

    async search_contract_id(){
        const typed_contract_account = this.state.typed_contract_account.trim()
        const selected_e5 = this.state.selected_e5
        const typed_contract_e5_id = typed_contract_account+selected_e5

        if(isNaN(typed_contract_account) || parseInt(typed_contract_account) < 1001){
            this.props.notify(this.props.app_state.loc['3093eu']/* 'That ID is not valid.' */)
        }
        else if(typed_contract_e5_id == this.state.contract['e5_id']){
            this.props.notify(this.props.app_state.loc['3093ev']/* 'That account is the default.' */)
        }
        else{
            this.props.notify(this.props.app_state.loc['3093ew']/* 'Searching...' */)
            const type = await this.props.load_obligation_contract(typed_contract_account, selected_e5)
            this.setState({searched_contract_e5_id: typed_contract_e5_id})
            
            if(type != 30/* contract_object */){
                this.props.notify(this.props.app_state.loc['3093eu']/* 'That ID is not valid.' */)
            }
        }
    }

    render_searched_contract(){
        const all_contracts = this.get_all_sorted_objects(this.props.app_state.created_contracts)
        const searched_contract_e5_id = this.state.searched_contract_e5_id;
        const matching_contract = all_contracts.filter((object) => {
            return (object['e5_id'] == searched_contract_e5_id)
        })
        if(matching_contract.length == 0){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }else{
            return(
                <div onClick={() => this.when_searched_contract_clicked(matching_contract[0])}>
                    {this.render_contract(matching_contract[0])}
                </div>
            )
        }
    }

    when_searched_contract_clicked(object){
        const contract_type = object['ipfs'].contract_type || 'custom'
        if(object['e5_id'] == this.state.contract['e5_id']){
            this.props.notify(this.props.app_state.loc['3093ex']/* 'You cant set that contract.' */, 4400);
        }
        else if(contract_type != 'public'){
            this.props.notify(this.props.app_state.loc['3093ey']/* 'only public contracts are allowed.' */, 4400);
        }
        else{
            const clone = structuredClone(this.state.contract_beneficiaries)
            clone[object['e5']] = object['e5_id']
            this.setState({contract_beneficiaries: clone})
        }
        
    }

    render_set_beneficiaries(){
        const items = Object.keys(this.state.contract_beneficiaries)
        if(items.length == 0){
            return(
                <div>
                    {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093ez']/* 'Added Beneficiaries.' */, 'details': this.props.app_state.loc['3093fa']/* 'When you set a contract beneficiary, it will show here.' */, 'size': 'l' })}
                    <div style={{ height:10 }}/>
                    {this.render_empty_object()}
                </div>
            )
        }
        return(
            <div style={{}}>
                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093ez']/* 'Added Beneficiaries' */, 'details': this.props.app_state.loc['3093fb']/* 'All the contract beneficiaries set for the obligations fulfilments on other E5s.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>
                <ul style={{ 'padding': '0px 5px 0px 5px'}}>
                    <SwipeableList>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 5px 2px 5px'}}>
                                <div key={index}>
                                    <SwipeableListItem
                                        swipeLeft={{
                                        content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['3093eq']/* Delete */}</p>,
                                        action: () =>this.when_beneficiary_item_clicked(item)
                                        }}>
                                        <div style={{width:'100%', /* 'background-color':this.props.theme['send_receive_ether_background_color'] */}}>
                                            {this.render_contract(this.get_contract_object(this.state.contract_beneficiaries[item], item))}
                                        </div>
                                    </SwipeableListItem>
                                </div>
                            </li> 
                        ))}
                    </SwipeableList>
                    
                </ul>
            </div>
        )
    }

    get_contract_object(item, e5){
        const all_contracts = this.props.app_state.created_contracts[e5] || []
        const matching_contract = all_contracts.filter((object) => {
            return (object['e5_id'] == item)
        })
        return matching_contract[0]
    }

    when_beneficiary_item_clicked(item){
        const clone = structuredClone(this.state.contract_beneficiaries)
        delete clone[item]
        this.setState({contract_beneficiaries: clone})
    }







    finish(){
        if(
            this.state.default_job_contractor_income_obligation > bigInt('51e16') ||
            this.state.default_enter_contract_obligation > bigInt('51e16') ||
            this.state.default_purchase_contract_credits_obligation > bigInt('51e16') ||
            this.state.default_spend_contract_obligation > bigInt('51e16') ||
            this.state.default_proposal_bounty_obligation > bigInt('51e16') ||
            this.state.default_storage_purchase_renewal_obligation > bigInt('51e16') ||
            this.state.default_subscription_purchase_obligation > bigInt('51e16') ||

            this.state.default_award_payment_obligation > bigInt('51e16') ||
            this.state.default_direct_purchase_obligation > bigInt('51e16') ||
            this.state.default_fulfilled_bags_obligation > bigInt('51e16') ||
            this.state.default_audiopost_purchase_obligation > bigInt('51e16') ||
            this.state.default_videopost_purchase_obligation > bigInt('51e16') ||
            this.state.default_creator_group_payout_obligation > bigInt('51e16') ||

            this.state.default_direct_transfer_obligation > bigInt('51e16') ||
            this.state.default_iTransfer_obligation > bigInt('51e16') ||
            this.state.default_bill_payment_obligation > bigInt('51e16') ||
            this.state.default_token_acquisition_obligation > bigInt('51e16') ||
            this.state.default_token_remarket_obligation > bigInt('51e16') ||
            this.state.default_royalty_payout_obligation > bigInt('51e16') ||
            this.state.default_liquidity_deposit_withdraw_obligation > bigInt('51e16')
            // this.state.default_trust_fee_obligation > bigInt('51e16')
        ){
            this.props.notify(this.props.app_state.loc['3093br'], 6400)/* 'You cant set a target higher than 51%' */
        }
        else if(
            this.state.default_job_contractor_income_obligation == 0 ||
            this.state.default_enter_contract_obligation == 0 ||
            this.state.default_purchase_contract_credits_obligation == 0 ||
            this.state.default_spend_contract_obligation == 0 ||
            this.state.default_proposal_bounty_obligation == 0 ||
            this.state.default_storage_purchase_renewal_obligation == 0 ||
            this.state.default_subscription_purchase_obligation == 0 ||

            this.state.default_award_payment_obligation == 0 ||
            this.state.default_direct_purchase_obligation == 0 ||
            this.state.default_fulfilled_bags_obligation == 0 ||
            this.state.default_audiopost_purchase_obligation == 0 ||
            this.state.default_videopost_purchase_obligation == 0 ||
            this.state.default_creator_group_payout_obligation == 0 ||

            this.state.default_direct_transfer_obligation == 0 ||
            this.state.default_iTransfer_obligation == 0 ||
            this.state.default_bill_payment_obligation == 0 ||
            this.state.default_token_acquisition_obligation == 0 ||
            this.state.default_token_remarket_obligation == 0 ||
            this.state.default_royalty_payout_obligation == 0 ||
            this.state.default_liquidity_deposit_withdraw_obligation == 0
            // this.state.default_trust_fee_obligation == 0
        ){
            this.props.notify(this.props.app_state.loc['3093bs'], 6400)/* 'You cant set a target of 0%' */
        }
        else if(this.state.default_keyword_combination == 0 || this.state.default_keyword_combination > 5){
            this.props.notify(this.props.app_state.loc['3093ee'], 9400)/* 'You cant set a keyword combination of 0 or more than 5.' */
        }
        else if(this.check_if_configure_obligations_already_exists()){
            this.props.notify(this.props.app_state.loc['3093ef']/* 'You cant configure obligations for a given contract twice in one run.' */, 9500)
        }
        else{
            this.props.add_configure_obligations_transaction_to_stack(this.state)
            this.props.notify(this.props.app_state.loc['18'], 1700);
            this.setState({default_keyword_combination: 0})
        }
    }

    check_if_configure_obligations_already_exists(){
        const stack_transactions = this.props.app_state.stack_items
        for(var i=0; i<stack_transactions.length; i++){
            if(stack_transactions[i].type == this.props.app_state.loc['3093']/* 'configure-obligations' */ && stack_transactions[i].contract['e5_id'] == this.state.contract['e5_id'] && stack_transactions[i].id != this.state.id){
                return true
            }
        }
        return false
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
                <ViewGroups show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
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

    get_number_width(number){
        if(number == null) return '0%'
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
    }
}




export default ConfigureObligationsPage;