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

class CouponPaymentPage extends Component {
    
    state = {
        selected: 0,
        id:makeid(8), type: this.props.app_state.loc['3104']/* 'stage-coupon-payments' */, entered_indexing_tags:[this.props.app_state.loc['2847']/* 'stage' */, this.props.app_state.loc['3104a']/* 'coupon' */, this.props.app_state.loc['2849']/* 'payouts' */], token_item: null,new_coupon_payment_title_tags_object: this.new_coupon_payment_title_tags_object(),

        typed_search_id:'', selected_classes:[], payout_title:'', payout_start_timestamp:(new Date().getTime()/1000)+64800, payout_schedule_timestamp: (new Date().getTime()/1000), batch_size:0, coupon_payout_account:'',
    };

    new_coupon_payment_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['3104b']/* 'targeted-classes' */], [0]
            ],
        };
    }

    set_certificate(object){
        this.setState({token_item: object, e5: object['e5'], coupon_payout_account: this.props.app_state.user_account_id[object['e5']].toString()})
    }







    render(){
        return(
            <div style={{'padding':'10px 20px 0px 10px'}}>
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.new_coupon_payment_title_tags_object} tag_size={'l'} when_tags_updated={this.when_new_coupon_payment_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
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

    when_new_coupon_payment_title_tags_object_updated(tag_obj){
        this.setState({new_coupon_payment_title_tags_object: tag_obj})
    }






    render_everything(){
        if(this.state.token_item == null) return;
        const selected_item = this.get_selected_item(this.state.new_coupon_payment_title_tags_object, 'e')
        
        if(selected_item == 'e'){
            return this.render_main_details_section()
        }
        else if(selected_item == this.props.app_state.loc['3104b']/* 'targeted-classes' */){
            return this.render_targeted_classes_section()
        }
    }





    render_main_details_section(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_main_details_data()}
                    {this.render_detail_item('0')}
                    {this.render_main_details_data2()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_main_details_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_main_details_data2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_main_details_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_main_details_data2()}
                    </div>
                </div>
            )
        }
    }

    render_main_details_data(){
        const { all_transfers, mature_depths } = this.get_all_transfers()
        const price_data = this.state.token_item['ipfs'].price_data
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3104e']/* 'Final Coupon Payment Amount.' */, 'details':this.props.app_state.loc['3104f']/* 'The final amount set to be transferred to your bond holders as coupons, and the set principal repayments if any.' */, 'size':'l'})}
                
                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':number_with_commas(Object.keys(all_transfers).length), 'details':this.props.app_state.loc['3104g']/* 'Transfers Counted.' */, 'size':'l'})}

                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':number_with_commas(mature_depths.length), 'details':this.props.app_state.loc['3104h']/* 'Mature Bonds Counted.' */, 'size':'l'})}

                <div style={{height: 10}}/>
                {this.render_multiplied_prices(all_transfers, price_data)}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2863']/* 'Set a short title for your payout staging.' */, 'title':this.props.app_state.loc['2862']/* 'Payout Description.' */})}
                <div style={{height:10}}/>

                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['135']} when_text_input_field_changed={this.when_entered_text_input_field_changed.bind(this)} text={this.state.payout_title} theme={this.props.theme}/>

                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']/* 'remaining character count: ' */+(53 - this.state.payout_title.length)})}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2852']/* 'Set the date and time that the payout will begin' */, 'title':this.props.app_state.loc['2852b']/* 'Schedule Date and Time.' */})}

                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.get_time_diff(this.state.payout_start_timestamp - Date.now()/1000), 'details':this.props.app_state.loc['2853']/* Starting time. */, 'size':'l'})}
                
                <div style={{height:10}}/>
                <div style={{}}>
                    <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], primary: { main: this.props.theme['primary_text_color'] }  }, })}>
                        <CssBaseline />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_new_dat_time_value_set(newValue)}/>
                        </LocalizationProvider>
                    </ThemeProvider>
                </div>
                
            </div>
        )
    }

    render_main_details_data2(){
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2865']/* 'Set the total number of transactions per payout batch.' */, 'title':this.props.app_state.loc['2864']/* 'Transactions Per Batch.' */})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2874']/* 'transactions per batch' */, 'number':this.state.batch_size, 'relativepower':this.props.app_state.loc['2867']/* 'transactions' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2874']/* 'transactions per batch' */, 'subtitle':this.format_power_figure(this.state.batch_size), 'barwidth':this.calculate_bar_width(this.state.batch_size), 'number':this.format_account_balance_figure(this.state.batch_size), 'barcolor':'', 'relativepower':this.props.app_state.loc['2867']/* 'transactions' */, })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={999} when_number_picker_value_changed={this.when_transactions_per_batch_value_picked.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2856']/* 'Set the account that will handle the payout transactions.' */, 'title':this.props.app_state.loc['2855']/* 'Payout Account.' */})}
                <div style={{height:10}}/>
                
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['904']/* 'Account ID' */} when_text_input_field_changed={this.when_coupon_payout_accountt_input_field_changed.bind(this)} text={this.state.coupon_payout_account} theme={this.props.theme}/>
                {this.load_account_suggestions()}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2883e']/* 'Set the date and time after which this staging info will be visible.' */, 'title':this.props.app_state.loc['2883d']/* 'Scheduled Visibility' */})}

                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.get_time_diff(this.state.payout_schedule_timestamp - Date.now()/1000), 'details':this.props.app_state.loc['2883f']/* Scheduled time. */, 'size':'l'})}

                <div style={{height:10}}/>
                <div style={{}}>
                    <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], primary: { main: this.props.theme['primary_text_color'] }  }, })}>
                        <CssBaseline />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_new_dat_time_value_set2(newValue)}/>
                        </LocalizationProvider>
                    </ThemeProvider>
                </div>
            </div>
        )
    }

    when_coupon_payout_accountt_input_field_changed(text){
        this.setState({coupon_payout_account: text})
    }

    when_entered_text_input_field_changed(text){
        this.setState({payout_title: text})
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
    
    when_new_dat_time_value_set2(value){
        const selectedDate = value instanceof Date ? value : new Date(value);
        const timeInSeconds = Math.floor(selectedDate.getTime() / 1000);
        var now = (new Date().getTime()/1000)+1000
        this.setState({payout_schedule_timestamp: timeInSeconds})
    }

    when_transactions_per_batch_value_picked(number){
        this.setState({batch_size: number})
    }

    render_multiplied_prices(all_transfers, price_data){
        const e5 = this.state.e5
        var base_fee_price_multiplier = bigInt(0)
        Object.values(all_transfers).forEach(transfer_item => {
            base_fee_price_multiplier = bigInt(base_fee_price_multiplier).plus(transfer_item)
        });
        
        return(
            <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                {price_data.map((item, index) => (
                    <div style={{'padding': '1px'}} onClick={() => this.props.view_number({'number':bigInt(item['amount']).multiply(base_fee_price_multiplier), 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item['id']], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                        {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item['id']], 'subtitle':this.format_power_figure(bigInt(item['amount']).multiply(base_fee_price_multiplier)), 'barwidth':this.calculate_bar_width(bigInt(item['amount']).multiply(base_fee_price_multiplier)), 'number':this.format_account_balance_figure(bigInt(item['amount']).multiply(base_fee_price_multiplier)), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}
                    </div>
                ))}
            </div>
        )
    }

    get_selected_classes(){
        const object = this.state.token_item;
        const unfiltered_items = [].concat(this.sortByAttributeDescending(Object.values(object['ipfs'].certificate_models), 'time'), this.sortByAttributeDescending(Object.values(object['ipfs'].certificate_model_history), 'time'))
        const filtered_classes = unfiltered_items.filter((item) => {
            return (!this.state.selected_classes.includes(item['id']))
        })
        const depths = []
        const classes = []
        const edit_times = []
        filtered_classes.forEach(class_item => {
            const depth_item = this.construct_depth_item(class_item)
            depths.push(depth_item)
            classes.push(class_item)
            edit_times.push(class_item['time'])
        });

        return { depths, classes, edit_times }
    }

    get_all_transfers(){
        const object = this.state.token_item;
        const { depths, classes, edit_times } = this.get_selected_classes()
        const coupon_data = this.props.app_state.non_fungible_token_balance_distribution[object['e5_id']] || {}
        const coupon_stagings = this.props.app_state.coupon_payout_stagings[object['e5_id']] || []
        var staged_depths = []
        coupon_stagings.forEach(staged_item => {
            staged_depths = staged_depths.concat(staged_item['ipfs']['mature_depths'])
        });

        const acquired_bond_depths = Object.keys(coupon_data)
        const acquired_bond_depth_data = []
        const mature_depths = []
        acquired_bond_depths.forEach(depth => {
            const mint_timestamp = coupon_data[depth]['mint_timestamp'];
            const depth_data = coupon_data[depth]['depth_data'];
            // console.log('get_all_transfers', 'depth_data', depth_data)
            const model = this.get_model_config(depth_data, object, mint_timestamp)
            // console.log('get_all_transfers', 'model', model)
            const model_time = model['time']
            const coupon_frequency = model['coupon_frequency']
            const bond_interest_rate = model['bond_interest_rate']
            const alpha = coupon_frequency / 31_556_952;
            const bond_maturity = model['bond_maturity']
            const index_of_model_time = edit_times.indexOf(model_time)
            const t = (Date.now()/1000) - bond_maturity
            if(index_of_model_time != -1 && !staged_depths.includes(depth) && t < (60*60*24*7*52) ){
                acquired_bond_depth_data.push({
                    'depth':depth,
                    'model': model,
                    'depth_data':depth_data,
                    'maturity_reached': Date.now()/1000 > bond_maturity,
                    'alpha':alpha,
                })
                if(Date.now()/1000 > bond_maturity){
                    mature_depths.push(depth)
                }
            }
        });

        const all_transfers = {}
        acquired_bond_depth_data.forEach(bond_data_item => {
            const multiplier_used = bigInt(bond_data_item['depth_data']['price'])
            const bond_interest_rate = bond_data_item['model']['bond_interest_rate']
            const maturity_reached = bond_data_item['maturity_reached']
            const balances = coupon_data[bond_data_item['depth']]['balances']
            const alpha = bond_data_item['alpha']
            const account_targets = Object.keys(balances)
            // console.log('get_all_transfers', 'bond_data_item', bond_data_item)
            account_targets.forEach(account_item => {
                const balance = balances[account_item]
                if(all_transfers[account_item] == null){
                    all_transfers[account_item] = bigInt(0)
                }
                const account_bal = bigInt(balance) / 10**18;
                const interest = bigInt(bond_interest_rate) / 10**18
                // console.log('get_all_transfers', 'multiplier_used, account_bal, interest, alpha', multiplier_used, account_bal, interest, alpha)
                const share = maturity_reached == true ? 
                (multiplier_used * account_bal) : 
                ((multiplier_used * interest) * account_bal) * alpha;
                //10,000 * (0.053) * 1.0 * 0.2
                all_transfers[account_item] = bigInt(all_transfers[account_item]).plus(Math.round(share))
            });
        });

        return { all_transfers, mature_depths }
    }











    render_targeted_classes_section(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_targeted_classes_data()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_targeted_classes_data()}
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
                        {this.render_targeted_classes_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
            )
        }
    }

    render_targeted_classes_data(){
        const object = this.state.token_item
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3104c']/* 'Filter Out Classes.' */, 'details':this.props.app_state.loc['3104d']/* 'Tap a listed class to filter it out of the selected classes in your next coupon staging.' */, 'size':'l'})}
                <div style={{margin:'5px 10px 0px 10px'}}>
                    <TextInput font={this.props.app_state.font} height={20} placeholder={this.props.app_state.loc['3098v']/* 'Search a class...' */} when_text_input_field_changed={this.when_typed_search_id_text_input_field_changed.bind(this)} text={this.state.typed_search_id} theme={this.props.theme}/>
                </div>
                <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px'}}/>
                {this.render_certificate_class_items(object)}
            </div>
        )
    }

    when_typed_search_id_text_input_field_changed(text){
        this.setState({typed_search_id: text})
    }

    render_certificate_class_items(object){
        var middle = this.props.height-200;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        const unfiltered_items = [].concat(this.sortByAttributeDescending(Object.values(object['ipfs'].certificate_models), 'time'))
        const items = unfiltered_items.filter((item) => {
            return (
                this.state.typed_search_id.trim() == '' || 
                (item.toLowerCase().startsWith(this.state.typed_search_id.trim().toLowerCase())) ||
                (object['ipfs'].certificate_models[item['id']]['class_markdown'].toLowerCase().includes(this.state.typed_search_id.trim().toLowerCase()))
            )
        })

        return(
            <div style={{}}>
                <div style={{ 'padding': '0px 5px 0px 5px'}}>
                    {items.map((item, index) => (
                        <div style={{'padding': '2px 5px 2px 5px'}}>
                            <div key={index}>
                                {this.render_certificate_class_item(item, object)}
                            </div>
                        </div> 
                    ))}
                </div>
            </div>
        )
    }

    render_certificate_class_item(data, object){
        const title = data['class_name']
        const details = this.props.app_state.loc['3098bh']/* '$ Issued' */.replace('$', number_with_commas(data['maximum_supply'])) + ' • ' + this.props.app_state.loc['d311bm']/* 'from $' */.replace('$', (new Date(data['purchase_start_time']*1000).toLocaleString()))
        const class_mint_count = this.get_class_mint_count(object, this.construct_depth_item(data))
        const footer_text = class_mint_count == 0 ? null : this.props.app_state.loc['3098bg']/* '$ Certificates Minted.' */.replace('$', number_with_commas(class_mint_count))
        const alpha = this.state.selected_classes.includes(data['id']) ? 0.5 : 1.0
        return(
            <div style={{opacity: alpha}} onClick={() => this.remove_or_add_class_item(data, object)}>
                {this.render_detail_item('3', {'title':title, 'details':details, 'size':'l', 'footer':footer_text})}
            </div>
        )
    }

    remove_or_add_class_item(data, object){
        const clone = this.state.selected_classes.slice()
        const index = clone.indexOf(data['id'])
        if(index == -1){
            clone.push(data['id'])
        }
        else{
            clone.splice(index, 1)
        }
        this.setState({selected_classes: clone})
    }





    construct_depth_item(data){
        const purchase_start_time = data['purchase_start_time']
        const purchase_end_time = data['purchase_end_time']
        const maximum_supply = data['maximum_supply']
        const base_fee_price_multiplier = data['base_fee_price_multiplier']
        const class_id = data['id']

        const start_time_minutes = Math.floor(purchase_start_time / 60)
        const end_time_minutes = Math.floor(purchase_end_time / 60)
        const price = base_fee_price_multiplier
        const supply = maximum_supply
        const token_class = class_id

        const v3_depths_to_add/* depths_to_add */ = [
            bgN(price, 54)/* exchange_ratio_y */, 
            bgN(end_time_minutes, 45)/* end_time */, 
            bgN(start_time_minutes, 36)/* start_time */, 
            bgN(supply, 27)/* supply */, 
            bgN(token_class, 18)/* class */, 
            0/* identifier */
        ]

        var v4_depth_final/* targeted_depth */ = bigInt(0)
        v3_depths_to_add/* depths_to_add */.forEach(value => {
            v4_depth_final/* targeted_depth */ = bigInt(v4_depth_final/* targeted_depth */).plus(bigInt(value.toString().toLocaleString('fullwide', {useGrouping:false}))).toString().toLocaleString('fullwide', {useGrouping:false})
        });

        return this.deconstruct_depth_data(v4_depth_final)
    }

    get_class_mint_count(object, depth_data){
        const all_depths_used = object['all_depths_used']
        // console.log('get_class_mint_count', 'all_depths_used', all_depths_used, 'depth_data', depth_data)
        if(all_depths_used == null) return 0
        const class_count_data = {}
        const my_general_identifier = depth_data['price'] + depth_data['end_time'] + depth_data['start_time'] + depth_data['supply'] + depth_data['class']

        all_depths_used.forEach(depth => {
            const deconstructed_object = this.deconstruct_depth_data(depth)
            const general_identifier = deconstructed_object['price'] + deconstructed_object['end_time'] + deconstructed_object['start_time'] + deconstructed_object['supply'] + deconstructed_object['class'];
            if(
                depth_data['class'] == deconstructed_object['class'] && 
                depth_data['supply'] == deconstructed_object['supply'] &&
                depth_data['start_time'] == deconstructed_object['start_time'] &&
                depth_data['end_time'] == deconstructed_object['end_time'] &&
                depth_data['price'] == deconstructed_object['price']
            ){
                if(class_count_data[general_identifier] == null){
                    class_count_data[general_identifier] = 0;
                }
                class_count_data[general_identifier] ++;
            }
        });

        // console.log('get_class_mint_count','class_count_data', class_count_data)
        return class_count_data[my_general_identifier] || 0
    }

    deconstruct_depth_data(depth){
        const depth_price_data = this.deconstruct(depth, 54)
        const depth_end_time_data = this.deconstruct(depth_price_data.remainder, 45)
        const depth_start_time_data = this.deconstruct(depth_end_time_data.remainder, 36)
        const depth_supply_data = this.deconstruct(depth_start_time_data.remainder, 27)
        const depth_class_data = this.deconstruct(depth_supply_data.remainder, 18)
        return {
            'class': depth_class_data.value,
            'identifier': depth_class_data.remainder,
            'supply':depth_supply_data.value,
            'start_time': depth_start_time_data.value,
            'end_time':depth_end_time_data.value,
            'price':depth_price_data.value,
            'full':depth
        }
    }
    
    deconstruct(arg, power){
        const value = (bigInt(arg).divide(bgN(1, power))).toString().toLocaleString('fullwide', {useGrouping:false})
        const remainder = (bigInt(arg).mod(bgN(1, power))).toString().toLocaleString('fullwide', {useGrouping:false})
        return { value, remainder }
    }







    get_model_config(depth_data, object, time){
        const certificate_models = object['ipfs'].certificate_models
        var valid_models = []
        Object.keys(certificate_models).forEach(model => {
          if(
            certificate_models[model]['id'] == depth_data['class'] && 
            (certificate_models[model]['base_fee_price_multiplier'] == depth_data['price'] || certificate_models[model]['base_fee_price_multiplier'] == 0) &&
            parseInt(depth_data['start_time']) == Math.floor(parseInt(certificate_models[model]['purchase_start_time']) / 60) &&
            parseInt(depth_data['end_time']) == Math.floor(parseInt(certificate_models[model]['purchase_end_time']) / 60)
        ){
            valid_models.push(certificate_models[model])
          }
        });

        valid_models = valid_models.concat(this.get_model_config_from_archives(depth_data, object))
        return this.filter_valid_models_by_acquired_time(valid_models, time)
    }

    get_model_config_from_archives(depth_data, object){
        const certificate_model_history = object['ipfs'].certificate_model_history
        if(certificate_model_history == null) return []
        const valid_models = []
        Object.values(certificate_model_history).forEach(model_config => {
            if(
                (model_config['base_fee_price_multiplier'] == depth_data['price'] || model_config['base_fee_price_multiplier'] == 0) && 
                model_config['maximum_supply'] == depth_data['supply'] &&
                parseInt(depth_data['start_time']) == Math.floor(parseInt(model_config['purchase_start_time']) / 60) &&
                parseInt(depth_data['end_time']) == Math.floor(parseInt(model_config['purchase_end_time']) / 60)
            ){
                valid_models.push(certificate_model_history[model_config]);
            }
        });
        return valid_models
    }

    filter_valid_models_by_acquired_time(valid_models, time){
        if(valid_models.length == 1) return valid_models[0]
        const sorted_models = this.sortByAttributeDescending(valid_models, 'time');
        const filtered_models = sorted_models.filter((model) => {
        return (model['time']/1000 < time)
        })
        if(filtered_models.length == 0) return null
        return filtered_models[0]
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
            if(contact['id'].toString().includes(this.state.coupon_payout_account)){
                return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
            }
        });
        return_array = this.filter_and_add_other_accounts(this.state.coupon_payout_account, return_array)
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
        this.setState({coupon_payout_account: item['id']})
    }








    async finish(){
        const payout_title = this.state.payout_title.trim()
        const coupon_payout_account = await this.get_typed_alias_id(this.state.coupon_payout_account.toString().trim())
        const payout_start_timestamp = this.state.payout_start_timestamp
        const payout_schedule_timestamp = this.state.payout_schedule_timestamp
        const batch_size = this.state.batch_size

        const { all_transfers, mature_depths } = this.get_all_transfers()
        const final_transfers = this.get_all_final_transfers(all_transfers, batch_size)

        if(payout_title == ''){
            this.props.notify(this.props.app_state.loc['2875']/* You need to set a title for your payout staging. */, 6700)
        }
        else if(isNaN(coupon_payout_account) || parseInt(coupon_payout_account) < 0 || coupon_payout_account == ''){
            this.props.notify(this.props.app_state.loc['1030']/* 'Please put a valid account ID.' */, 1600)
        }
        else if(batch_size == 0){
            this.props.notify(this.props.app_state.loc['2879']/* That batch size is invalid. */, 6700)
        }
        else if(payout_start_timestamp < Date.now()/1000){
            this.props.notify(this.props.app_state.loc['2877']/* that payout date is invalid. */, 6700)
        }
        else if(payout_title.length > 53){
            this.props.notify(this.props.app_state.loc['3104l']/* 'That payout title is too long.' */, 4400)
        }
        else if(payout_schedule_timestamp > payout_start_timestamp){
            this.props.notify(this.props.app_state.loc['2883g']/* The scheduled visibility of your payout cant be after the scheduled starting time. */, 9700)
        }
        else if(Object.keys(all_transfers).length == 0){
            this.props.notify(this.props.app_state.loc['3104i']/* You cant stack no changes. */, 3700)
        }
        else{
            this.setState({all_transfers: all_transfers, final_transfers: final_transfers, mature_depths: mature_depths, coupon_payout_account: coupon_payout_account, payout_id: parseInt(Date.now())})

            var me = this;
            setTimeout(function(){
                me.props.add_coupon_payment_to_stack(me.state)
                me.setState({
                    selected: 0,
                    id:makeid(8),
                    payout_start_timestamp:(new Date().getTime()/1000)+64800,
                    payout_amount:0, payout_title:'', batch_size:0,
                    payout_schedule_timestamp:(new Date().getTime()/1000),
                    coupon_payout_account:''
                })
            }, (1 * 1000));

            this.props.notify(this.props.app_state.loc['18'], 1700);
        }

    }

    get_all_final_transfers(all_transfers, batch_size){
        const price_data = this.state.token_item['ipfs'].price_data
        const final_transfer_data = [];
        Object.keys(all_transfers).forEach(account_id => {
            const base_fee_price_multiplier = all_transfers[account_id]
            price_data.forEach(item => {
                const amount = bigInt(item['amount']).multiply(base_fee_price_multiplier)
                const exchange = item['id']
                final_transfer_data.push({'id': exchange, 'amount':amount, 'receiver':account_id})
            });
        });

        const batches = [{'data':[], 'id':makeid(7)}]
        for(var i=0; i<final_transfer_data.length; i++){
            const pos = batches.length-1;
            if(batches[pos]['data'].length >= batch_size){
                batches.push({'data':[], 'id':makeid(7)})
            }
            batches[batches.length-1]['data'].push(final_transfer_data[i])
        }
        
        return batches
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
                <ViewGroups token_name_thumbnail_directory={this.props.app_state?.token_name_thumbnail_directory} e5s={this.props.app_state?.e5s} uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} show_images={this.props.show_images.bind(this)}
                
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




export default CouponPaymentPage;