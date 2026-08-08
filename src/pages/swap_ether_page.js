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
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import NumberPicker from './../components/number_picker';
import TextInput from './../components/text_input';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { from } from "@iotexproject/iotex-address-ts";

var bigInt = require("big-integer");
const Web3 = require('web3');
const { toBech32, fromBech32,} = require('@harmony-js/crypto');

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class SwapEtherPage extends Component {
    
    state = {
        selected: 0, get_swap_ether_tags_object: this.get_swap_ether_tags_object(),
        picked_wei_amount: 0, recipient_address:'', cypher_passcode:'', filter_targets_text:'', swap_target: null
    };

    get_swap_ether_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['3110']/* 'lifi-swap' */], [1]
            ],
        };
    }



    set_ether(item){
        this.setState({item: item})
        var me = this;
        setTimeout(() => {
            if(me.number_picker.current != null){
                me.number_picker.current.reset_number_picker()
            }
            me.setState({recipient_address: me.get_account_address()})
        }, (1 * 1000));
    }

    constructor(props) {
        super(props);
        this.number_picker = React.createRef();
    }





    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px', 'overflow-x':'hidden'}}>
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.get_swap_ether_tags_object} tag_size={'l'} when_tags_updated={this.when_get_swap_ether_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            
                        </div>
                    </div>
                </div>

                {this.render_everything()}
                
            </div>
        )
    }

    when_get_swap_ether_tags_object_updated(tag_obj){
        this.setState({get_swap_ether_tags_object: tag_obj})
    }




    render_everything(){
        if(this.state.item == null) return;
        const selected_item = this.get_selected_item(this.state.get_swap_ether_tags_object, 'e')

        if(selected_item == this.props.app_state.loc['3110']/* 'lifi-swap' */){
            return this.render_lifi_swap_data()
        }
    }

    render_lifi_swap_data(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_swap_details()}
                    {this.render_detail_item('0')}
                    {this.render_swap_details2()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_swap_details()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_swap_details2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_swap_details()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_swap_details2()}
                    </div>
                </div>
            )
        }
    }

    render_swap_details(){
        const item = this.state.item;
        const e5 = item['e5']
        const my_balance = this.props.app_state.account_balance[e5]
        const parent_symbol = item['symbol']
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2481bc']/* '💱 Swap Ether' */, 'details':this.props.app_state.loc['3110a']/* 'Convert your $ ether at current market exchange rates to another ether.' */.replace('$', item['name']), 'size':'l'})}
                <div style={{height: 10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px', 'font-family': this.props.app_state.font}} className="fw-bold">{this.props.app_state.loc['3095d']/* 'Balance in $' */.replace('$', parent_symbol)}</p>

                    {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(my_balance), 'number':this.format_account_balance_figure(my_balance), 'barcolor':'#606060', 'relativepower':'wei', })}

                    {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(my_balance/10**18),
                    'number':(my_balance/10**18), 'barcolor':'#606060', 'relativepower':parent_symbol, })}
                </div>
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1372']/* 'Sender Wallet Address' */, 'details':this.get_account_address(), 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1373']/* 'Receiver Wallet Address' */, 'details':this.state.recipient_address, 'size':'l'})}
                <div style={{height: 10}}/>

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['1374']/* 'Set Receiver Address Here' */} when_text_input_field_changed={this.when_text_input_field_changed.bind(this)} text={this.state.recipient_address} theme={this.props.theme}/>

                {this.render_swap_targets_to_select()}

            </div>
        )
    }

    render_swap_details2(){
        const item = this.state.item;
        const e5 = item['e5']
        var gas_price = this.props.app_state.gas_price[e5]
        if(gas_price == null){
            gas_price = this.get_gas_price_from_runs(e5)
        }
        if(gas_price == 0 || gas_price > 10**18) gas_price = 10**10
        var gas_transactions = this.state.picked_wei_amount == 0 ? 0 : Math.floor((this.state.picked_wei_amount/gas_price)/2_300_000)
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3110b']/* 'Amount to Swap.' */, 'details':this.props.app_state.loc['3110c']/* 'Set the amount you wish to swap to the selected target' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px', 'font-family': this.props.app_state.font}} className="fw-bold">{this.props.app_state.loc['1383']/* Picked Amount In Ether and Wei */}</p>

                    {this.render_detail_item('2', this.get_picked_amount_in_wei())}
                    {this.render_detail_item('2', this.get_picked_amount_in_ether())}

                    {this.render_detail_item('2', { 'style':'s', 'title':this.props.app_state.loc['1377']/* 'Transactions (2.3M Gas average)' */, 'subtitle':this.format_power_figure(gas_transactions), 'barwidth':this.calculate_bar_width(gas_transactions), 'number':this.format_account_balance_figure(gas_transactions), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1378']/* 'transactions' */, })}
                </div>
                
                {this.render_amount_number_picker()}

                <div style={{'padding': '5px'}} onClick={()=>this.set_maximum(gas_price, e5)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1384']/* 'Set Maximum' */, 'action':''})}
                </div>

                {this.props.app_state.locked_wallet_hashed_password != '' && (
                    <div>
                        {this.render_detail_item('0')}
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['2954m']/* 'Wallet Password.' */, 'details':this.props.app_state.loc['2954n']/* 'If you locked your wallet, set the password used here.' */, 'size':'l'})}
                        <div style={{height: 10}}/>

                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3055nm']/* 'Passcode...' */} when_text_input_field_changed={this.when_passcode_input_field_changed.bind(this)} text={this.state.cypher_passcode} theme={this.props.theme} adjust_height={false} type={'password'} />
                    </div>
                )}

                <div style={{height: 10}}/>
                {this.props.app_state.checking_if_swap_pair_exists != true &&  this.props.app_state.swapping_tokens_via_lifi != true && (
                    <div onClick={()=>this.finish_lifi_swap()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['3110z']/* 'Proceed.' */, 'action': ''})}
                    </div>
                )}
                {(this.props.app_state.checking_if_swap_pair_exists == true || this.props.app_state.swapping_tokens_via_lifi == true) && this.render_small_skeleton_object()}
            </div>
        )
    }


    when_passcode_input_field_changed(text){
        if(this.props.app_state.locked_wallet_hashed_password != '') this.setState({cypher_passcode: text})
    }

    when_text_input_field_changed(text){
        this.setState({recipient_address: text})
    }

    render_amount_number_picker(){
        return(
            <div>
                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_number_picker_value_changed.bind(this)} theme={this.props.theme} power_limit={23} pick_with_text_area={true} decimal_count={18}/>
            </div>
        )
    }

    when_number_picker_value_changed(amount){
        this.setState({picked_wei_amount: amount})
    }

    set_maximum(g, e5){
        var gas_price = g
        if(this.state.picked_wei_gas_price != 0){
            gas_price = this.state.picked_wei_gas_price
        }
        var tx_ether = gas_price * 35_000
        var my_balance = this.props.app_state.account_balance[e5]
        var maximum = my_balance - tx_ether
        if(maximum < 0) maximum = 0

        this.setState({picked_wei_amount: maximum})
        this.props.notify(this.props.app_state.loc['1389']/* 'Maximum amount set.' */, 1000)
    }

    get_picked_amount_in_wei(){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(this.state.picked_wei_amount),
            'number':this.format_account_balance_figure(this.state.picked_wei_amount),
            'barcolor':'#606060',
            'relativepower':'wei',
        }
    }

    get_picked_amount_in_ether(){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(this.state.picked_wei_amount/10**18),
            'number':(this.state.picked_wei_amount/10**18),
            'barcolor':'#606060',
            'relativepower':'ether',
        }
    }

    get_account_address(){
        var e5 = this.state.item['e5']
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

    get_gas_price_from_runs(e5){
        var last_events = this.props.app_state.all_E5_runs[e5]
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




    render_swap_targets_to_select(){
        const item = this.state.item;
        const e5 = item['e5']
        const state_list = this.props.app_state.ether_data
        const available_swap_targets  = state_list.filter((list_item) => {
            return (
                this.props.app_state.e5s[list_item['e5']].id != null && 
                list_item['e5'] != e5
            )
        })
        .filter((list_item) => {
            const filter_targets_text = this.state.filter_targets_text.trim().toLowerCase();
            return (
                filter_targets_text == '' ||
                list_item['name'].toLowerCase().startsWith(filter_targets_text) ||
                list_item['symbol'].toLowerCase().startsWith(filter_targets_text)
            )
        })

        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3110d']/* 'Swap Target' */, 'details':this.props.app_state.loc['3110e']/* 'Select the targeted ether you wish to swap to.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3110l']/* 'Filter ethers...' */} when_text_input_field_changed={this.when_filter_targets_text_input_field_changed.bind(this)} text={this.state.filter_targets_text} theme={this.props.theme}/>
                <div style={{height: 10}}/>

                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {available_swap_targets.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_swap_target_item(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    when_filter_targets_text_input_field_changed(text){
        this.setState({filter_targets_text: text})
    }

    render_swap_target_item(item){
        const token_image = this.props.app_state.e5s[item['e5']].ether_image
        const title = item['symbol']
        const details = item['name']
        const balance = this.props.app_state.account_balance[item['e5']]
        const footer = (balance / 10**18).toFixed(5)
        return(
            <div onClick={() => this.when_swap_target_selected(item)}>
                {this.render_detail_item('14', {'title':title, 'details':details, 'size':'s', 'image':token_image, 'img_size':30})}
                {this.render_line_if_selected(item)}
            </div>
        )
    }

    render_line_if_selected(item){
        if(this.state.swap_target == item['e5']){
            return(
                <div>
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }
    }

    when_swap_target_selected(item){
        this.setState({swap_target: item['e5']})
    }









    finish_lifi_swap(){
        const e5 = this.state.item['e5']
        const recipient_address = this.state.recipient_address.trim()
        const picked_amount = this.state.picked_wei_amount
        const my_balance = this.props.app_state.account_balance[e5]
        const swap_target = this.state.swap_target

        var gas_price = this.props.app_state.gas_price[e5]
        if(gas_price == null){
            gas_price = this.get_gas_price_from_runs(e5)
        }

        if(!this.isValidAddress(recipient_address)){
            this.props.notify(this.props.app_state.loc['1407']/* 'Please set a valid recipient.' */, 4500)
        }
        else if(picked_amount == 0){
            this.props.notify(this.props.app_state.loc['1406']/* 'Please set a valid amount.' */, 4500)
        }
        else if((picked_amount+gas_price) > my_balance){
            this.props.notify(this.props.app_state.loc['1404']/* 'Your ether balance is insufficient to fulfil that transaction.' */, 7200)
        }
        else if(swap_target == null){
            this.props.notify(this.props.app_state.loc['3110f']/* 'You need to select a target ether for the swap' */, 7200)
        }
        else if(this.props.app_state.locked_wallet_hashed_password != '' && this.state.cypher_passcode.trim() == ''){
            this.props.notify(this.props.app_state.loc['1593mg']/* 'You need to set your password.' */, 4000)
        }
        else if(this.props.app_state.locked_wallet_hashed_password != '' && !this.does_password_match_hash(this.state.cypher_passcode.trim())){
            this.props.notify(this.props.app_state.loc['2954o']/* 'The password you\'ve set is incorrect.' */, 4000)
        }
        else{
            this.props.show_dialog_bottomsheet({'picked_amount':picked_amount, 'item':this.state.item, 'recipient_address':recipient_address, 'gas_price':gas_price, 'my_balance':my_balance, 'sender_address':this.get_account_address(), 'swap_target':swap_target}, 'confirm_swap_ether_dialog')
            this.props.check_if_ether_swap_pair_exists(this.state.item, swap_target, picked_amount, recipient_address, this.get_account_address())
        }
        
    }

    does_password_match_hash(passcode){
        if(this.props.app_state.locked_wallet_hashed_password != ''){
            const provided_hash = this.props.hash_data_with_randomizer(passcode);
            return provided_hash == this.props.app_state.locked_wallet_hashed_password
        }
        else return true
    }

    isValidAddress = (adr) => {
        var e5 = this.state.item['e5']
        try {
            const web3 = new Web3()
            web3.utils.toChecksumAddress(this.format_address(adr, e5))
            return true
        } catch (e) {
            return false
        }
    }













    render_small_skeleton_object(){
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
                <SkeletonTheme baseColor={this.props.theme['loading_base_color']} highlightColor={this.props.theme['loading_highlight_color']}>
                    <div style={styles.container}>
                        <Skeleton style={styles.skeletonBox} />
                        <img src={this.props.app_state.theme['letter']} alt="" style={styles.centerImage} />
                    </div>
                </SkeletonTheme>
            </div>
        )
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
                <ViewGroups token_name_thumbnail_directory={this.props.app_state?.token_name_thumbnail_directory} e5s={this.props.app_state?.e5s} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
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
            var power = amount.toLocaleString('fullwide', {useGrouping:false}).length - 9
            return number_with_commas(amount.toLocaleString('fullwide', {useGrouping:false}).substring(0, 9)) +'e'+power
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
            var power = amount.toLocaleString('fullwide', {useGrouping:false}).length - 9
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




export default SwapEtherPage;