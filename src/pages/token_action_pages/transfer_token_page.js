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
import TextInput from '../../components/text_input';
import NumberPicker from '../../components/number_picker';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { motion, AnimatePresence } from "framer-motion";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

// import Letter from '../../assets/letter.png';

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

class TransferTokenPage extends Component {
    
    state = {
        selected: 0,id:makeid(8), type: this.props.app_state.loc['1018']/* 'transfer' */,
        new_transfer_action_page_tags_object: this.get_new_transfer_action_page_tags_object(),
        recipient_id:'', amount:0, token_item: null, stack_items:[], debit_balance:0,
        entered_indexing_tags:[this.props.app_state.loc['1018']/* 'transfer' */, this.props.app_state.loc['1019']/* 'send' */, this.props.app_state.loc['999']/* 'token' */],

        power_lim:0
    };

    get_new_transfer_action_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1018']/* 'transfer' */], [1]
            ],
        };
    }

    render(){
        if(this.state.token_item == null) return
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>

                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.new_transfer_action_page_tags_object} tag_size={'l'} when_tags_updated={this.when_new_transfer_action_page_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img className="text-end" onClick={()=>this.add_transactions_to_stack()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div>
                
                <div style={{'margin':'0px 0px 0px 0px'}}>
                    {this.render_everything()}
                </div>
                
            </div>
        )
    }

    when_new_transfer_action_page_tags_object_updated(tag_obj){
        this.setState({new_transfer_action_page_tags_object: tag_obj})
    }

    calculate_balance_after_set_transfers(){
        var balance = this.props.calculate_actual_balance(this.state.token_item['e5'], this.state.token_item['id'])
        return bigInt(balance).minus(this.state.debit_balance)
    }


    render_everything(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_data_picker_ui()}
                    {this.render_detail_item('0')}
                    {this.render_amount_picker()}
                    {this.render_stack_transactions()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_data_picker_ui()}
                        {this.render_empty_views(2)}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_amount_picker()}
                        {this.render_stack_transactions()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_data_picker_ui()}
                        {this.render_empty_views(2)}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_amount_picker()}
                        {this.render_stack_transactions()}
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

    render_data_picker_ui(){
        return(
            <div> 
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'15px', 'text':this.props.app_state.loc['1020']/* 'Transfer the specified token' */})}

                <div style={{height:10}}/> 

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['1021']/* 'Your Balance' */, 'number':this.state.token_item['balance'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']]})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1021']/* 'Your Balance' */, 'subtitle':this.format_power_figure(this.state.token_item['balance']), 'barwidth':this.calculate_bar_width(this.state.token_item['balance']), 'number':this.format_account_balance_figure(this.state.token_item['balance']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']], })}
                    </div>

                    <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['1022']/* 'Your Balance after Set Transfers' */, 'number':this.calculate_balance_after_set_transfers(), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']]})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1022']/* 'Your Balance after Set Transfers' */, 'subtitle':this.format_power_figure(this.calculate_balance_after_set_transfers()), 'barwidth':this.calculate_bar_width(this.calculate_balance_after_set_transfers()), 'number':this.format_account_balance_figure(this.calculate_balance_after_set_transfers()), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']], })}
                    </div>
                </div>

                {this.render_detail_item('0')}
                
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['1023']/* 'Set the recipient of the transfer action' */, 'title':this.props.app_state.loc['1024']/* 'Recipient of action' */})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1025']/* 'Recipient ID' */} when_text_input_field_changed={this.when_recipient_input_field_changed.bind(this)} text={this.state.recipient_id} theme={this.props.theme}/>
                {this.load_account_suggestions()}
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['1037c']/* 'Set multitransfer details from a csv or json file.' */, 'title':this.props.app_state.loc['1037b']/* 'Set From File.' */})}
                {this.state.is_preparing_file == true && (
                    <div><div style={{height:10}}/>
                        {this.render_line_loader_if_loading()}
                    </div>
                )}
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        <div onClick={()=> this.call_input_function('csv')}>
                            {this.render_detail_item('5', {'text':this.props.app_state.loc['c311q']/* 'Select CSV File' */, 'action':''})}
                        </div>
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        <div onClick={()=> this.call_input_function('json')}>
                            {this.render_detail_item('5', {'text':this.props.app_state.loc['c311r']/* 'Select JSON File.' */, 'action':''})}
                        </div>
                    </div>
                </div>
                {this.render_detail_item('10', {'text':this.props.app_state.loc['1037d']/* 'If you\'re picking a csv file, make sure each value in the file is separated by a comma \',\' character in [Account]:[Amount] fashion. \n eg ---> 1002:100000, 1003:200000, 1003:300000, 1004:400000,...*/, 'textsize':'11px', 'font':this.props.app_state.font})}
                {this.render_open_options_picker_upload_button()}
                
                <div style={{height:10}}/>
                <div onClick={() => this.props.show_dialog_bottomsheet({'type':'transfer'}, 'view_json_example')}>
                    {this.render_detail_item('4', {'text':this.props.app_state.loc['1037e']/* 'If you wish to use a JSON file, tap this to view the required JSON format example.' */, 'textsize':'13px', 'font':this.props.app_state.font})}
                </div>
                <div style={{height:20}}/>
                
            </div>
        )
    }

    render_line_loader_if_loading(){
        const styles = {
             skeletonBox: {
                display: 'block',
                width: '100%',
                height: '6px',
                borderRadius: '3px',
                lineHeight: '0',
                margin: 0,
            },
        };
        return(
            <AnimatePresence initial={true}>
                <motion.div key={'line_loader'} initial={{ opacity: 0, scale:0.95 }} animate={{ opacity: 1, scale:1 }} exit={{ opacity: 0, scale:0.95 }} transition={{ duration: 0.3 }}
                style={{height:'6px', 'margin':'0px 15px 3px 15px', overflow: 'hidden', borderRadius: '3px',}}>
                    <SkeletonTheme borderRadius={'3px'} baseColor={this.props.theme['loading_base_color']} highlightColor={this.props.theme['loading_highlight_color']}>
                        <Skeleton style={styles.skeletonBox}/>
                    </SkeletonTheme>
                </motion.div>
            </AnimatePresence>
        )
    }

    render_amount_picker(){
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['1026']/* 'Amount to transfer to the speicified target account' */, 'title':this.props.app_state.loc['1027']/* 'Amount for Transfer' */})}

                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1037']/* 'Transfer Amount' */, 'number':this.state.amount, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']]})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1037']/* 'Transfer Amount' */, 'subtitle':this.format_power_figure(this.state.amount), 'barwidth':this.calculate_bar_width(this.state.amount), 'number':this.format_account_balance_figure(this.state.amount), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']], })}
                </div>

                <div style={{height:10}}/>
                <div style={{'padding': '5px'}} onClick={()=>this.set_maximum()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1028']/* 'Set Maximum' */, 'action':''})}
                </div>

                <div style={{height:10}}/>
                <NumberPicker clip_number={this.props.app_state.clip_number} ref={this.amount_picker} font={this.props.app_state.font} number_limit={bigInt('1e'+(this.get_power_limit_for_exchange(this.state.token_item)+9))} when_number_picker_value_changed={this.when_amount_set.bind(this)} theme={this.props.theme} power_limit={this.get_power_limit_for_exchange(this.state.token_item)} pick_with_text_area={this.state.token_item['balance'] < 1_000_000_000} text_area_hint={'1000'}/>

                <div style={{'padding': '5px'}} onClick={()=>this.add_transaction()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1029']/* 'Add Transaction' */, 'action':''})}
                </div>
            </div>
        )
    }

    render_open_options_picker_upload_button(){
        return(
            <div>
                <input ref={this.json_input} style={{display: 'none'}} id="upload" type="file" accept =".json" onChange ={this.when_json_file_picked.bind(this)}/>
                
                <input ref={this.csv_input} style={{display: 'none'}} id="upload" type="file" accept =".csv" onChange ={this.when_csv_file_picked.bind(this)}/>
            </div>
        )
    }

    call_input_function(type){
        if(this.is_preparing == true){
            this.props.notify(this.props.app_state.loc['3074g']/* Please wait for e to finish loading your selected files. */, 1200);
            return;
        }
        if(type == 'json'){
            this.json_input.current?.click()
        }
        else if(type == 'csv'){
            this.csv_input.current?.click()
        }
    }

    constructor(props) {
        super(props);
        this.amount_picker = React.createRef();
        this.json_input = React.createRef();
        this.csv_input = React.createRef();
    }

    when_json_file_picked = async (e) => {
        this.props.notify(this.props.app_state.loc['1037h']/* Preparing the file... */, 1200);
        this.is_preparing = true;
        this.setState({is_preparing_file: true})
        await new Promise(resolve => setTimeout(resolve, 1400))
        if(e.target.files && e.target.files[0]){
            for(var i = 0; i < e.target.files.length; i++){
                this.is_loading_file = true
                let reader = new FileReader();
                reader.onload = async function(ev){
                    var data = ev.target.result
                    try{
                        const transfers_data = JSON.parse(data)
                        const target_users = Object.keys(transfers_data)
                        const clone = this.state.stack_items.slice()
                        var active_debit_balance = this.state.debit_balance
                        var added_entries = 0
                        for(var t=0; t<target_users.length; t++){
                            const recipient = await this.get_typed_alias_id(target_users[t].toString().trim());
                            const amount = transfers_data[target_users[t]].toString()
                            
                            if(!isNaN(recipient) && parseInt(recipient) > 1000 && !isNaN(amount) && !amount.includes('.') && this.check_if_sender_has_balance2(amount, active_debit_balance)){
                                const tx = {id:makeid(8), type:'transfer', 'amount':amount.toLocaleString('fullwide', {useGrouping:false}), 'recipient':recipient, 'exchange':this.state.token_item, entered_indexing_tags:['transfer', 'send', 'token']}
                                clone.push(tx)
                                active_debit_balance = bigInt(active_debit_balance).add(amount)
                                added_entries++;
                            }
                        }
                        this.setState({stack_items: clone, debit_balance: active_debit_balance})
                        this.props.notify(this.props.app_state.loc['1037f']/* '$ entries out of % added.' */.replace('$', number_with_commas(added_entries)).replace('%', number_with_commas(target_users.length)), 5600)
                    }catch(ex){
                        console.log('new_poll', ex)
                        this.props.notify(this.props.app_state.loc['1037g']/* 'Something went wrong.' */, 4400)
                    }
                    this.is_loading_file = false
                    if(this.current_pos == e.target.files.length -1){
                        //its the last one
                        this.is_preparing = false;
                        this.setState({is_preparing_file: false})
                    }
                }.bind(this);
                var jsonFile = e.target.files[i];
                this.current_file = jsonFile['name']
                this.current_pos = i;
                const includes = this.state.json_files.find(e => e['name'] === this.current_file)
                if(includes == null){
                    reader.readAsText(jsonFile);
                }else{
                    this.is_loading_file = false
                }

                while (this.is_loading_file == true) {
                    if (this.is_loading_file == false) break
                    console.log('poll_data','Waiting for file to be loaded')
                    await new Promise(resolve => setTimeout(resolve, 1000))
                }
            }
        }
    }

    when_csv_file_picked = async(e) => {
        this.props.notify(this.props.app_state.loc['1037h']/* Preparing the file... */, 1200);
        this.is_preparing = true;
        this.setState({is_preparing_file: true})
        await new Promise(resolve => setTimeout(resolve, 1400))
        if(e.target.files && e.target.files[0]){
            for(var i = 0; i < e.target.files.length; i++){ 
                this.is_loading_file = true
                let reader = new FileReader();
                reader.onload = async function(ev){
                    var data = ev.target.result
                    var entry_data = data.toString()
                    try{
                        const entries = entry_data.replace(' ','').split(',');
                        const clone = this.state.stack_items.slice()
                        var active_debit_balance = this.state.debit_balance
                        var added_entries = 0
                        for(var t=0; t<entries.length; t++){
                            const user_object = entries[t].split(':')
                            const recipient = await this.get_typed_alias_id(user_object[0].toString().trim());
                            const amount = user_object[1].toString()

                            if(!isNaN(recipient) && parseInt(recipient) > 1000 && !isNaN(amount) && !amount.includes('.') && this.check_if_sender_has_balance2(amount, active_debit_balance)){
                                const tx = {id:makeid(8), type:'transfer', 'amount':amount.toLocaleString('fullwide', {useGrouping:false}), 'recipient':recipient, 'exchange':this.state.token_item, entered_indexing_tags:['transfer', 'send', 'token']}
                                clone.push(tx)
                                active_debit_balance = bigInt(active_debit_balance).add(amount)
                                added_entries++;
                            }
                        }
                        this.setState({stack_items: clone, debit_balance: active_debit_balance})
                        this.props.notify(this.props.app_state.loc['1037f']/* '$ entries out of % added.' */.replace('$', number_with_commas(added_entries)).replace('%', number_with_commas(entries.length)), 5600)
                    }
                    catch(e){
                        console.error(e)
                        this.props.notify(this.props.app_state.loc['1037g']/* 'Something went wrong.' */, 4400)
                    }

                    this.is_loading_file = false
                    if(this.current_pos == e.target.files.length -1){
                        //its the last one
                        this.is_preparing = false;
                        this.setState({is_preparing_file: false})
                    }
                }.bind(this);
                var csvFile = e.target.files[i];
                this.current_pos = i;
                this.current_file = csvFile['name']
                const includes = this.state.csv_files.find(e => e['name'] === this.current_file)
                if(includes == null){
                    reader.readAsText(csvFile);
                }else{
                    this.is_loading_file = false
                }

                while (this.is_loading_file == true) {
                    if (this.is_loading_file == false) break
                    console.log('poll_data','Waiting for file to be loaded')
                    await new Promise(resolve => setTimeout(resolve, 1000))
                }
            }
        }
    }

    check_if_sender_has_balance2(picked_amount, debit_balance){
        var limit = this.get_number_limit2(debit_balance)

        if(bigInt(picked_amount).greater(limit)){
            return false
        }
        return true
    }

    get_power_limit_for_exchange(exchange){
        var default_depth = 0;
        if(exchange['ipfs'] != null){
            var depth = exchange['ipfs'].default_depth
            if(depth != null){
                default_depth = depth
            }
        }

        return (default_depth*72)+63
    }

    set_maximum(){
        // var max = this.state.token_item['balance']
        var max = this.props.calculate_actual_balance(this.state.token_item['e5'], this.state.token_item['id'])
        this.setState({amount: max})
    }

    get_number_limit(){
        if(this.state.token_item['balance'] != null){
            // var balance =  this.state.token_item['balance']
            var balance = this.props.calculate_actual_balance(this.state.token_item['e5'], this.state.token_item['id'])
            var balance_after_transfers = bigInt(balance).minus(this.state.debit_balance)
            return balance_after_transfers;
        }
        else return bigInt('1e72')
    }

    get_number_limit2(debit_balance){
        if(this.state.token_item['balance'] != null){
            // var balance =  this.state.token_item['balance']
            var balance = this.props.calculate_actual_balance(this.state.token_item['e5'], this.state.token_item['id'])
            var balance_after_transfers = bigInt(balance).minus(debit_balance)
            return balance_after_transfers;
        }
        else return bigInt('1e72')
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
                else if(
                    txs[i].type == this.props.app_state.loc['1509']/* 'mail-messages' */ || 
                    txs[i].type == this.props.app_state.loc['1511']/* 'post-messages' */ || 
                    txs[i].type == this.props.app_state.loc['1512']/* 'job-response' */ || 
                    txs[i].type == this.props.app_state.loc['1514']/* 'job-messages' */ || 
                    txs[i].type == this.props.app_state.loc['1515']/* 'proposal-messages' */ || 
                    txs[i].type == this.props.app_state.loc['1501']/* 'bag-messages' */ || 
                    txs[i].type == this.props.app_state.loc['1505']/* 'job-request-messages' */){
                    for(var j=0; j<t.messages_to_deliver.length; j++){
                        if(t.messages_to_deliver[j]['award_amount'] != 0 && t.messages_to_deliver[j]['award_receiver'] != null){
                            total_amount = bigInt(total_amount).add(t.messages_to_deliver[j]['award_amount'])
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

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }

    get_amounts_to_be_paid(amount, count){
        return bigInt(amount).multiply(bigInt(count))
    }

    when_recipient_input_field_changed(text){
        this.setState({recipient_id: text})
        this.reset_the_number_picker()
    }

    reset_the_number_picker(){
        var me = this;
        setTimeout(function() {
            if(me.amount_picker.current != null){
                me.amount_picker.current.reset_number_picker()
            }
        }, (1 * 1000));  
    }

    when_amount_set(amount){
        this.setState({amount: amount})
    }


    async add_transaction(){
        var clone = this.state.stack_items.slice()
        var amount = this.state.amount
        var recipient = await this.get_typed_alias_id(this.state.recipient_id.toString().trim())

        if(isNaN(recipient) || parseInt(recipient) < 0 || recipient == ''){
            this.props.notify(this.props.app_state.loc['1030']/* 'Please put a valid account ID.' */, 1600)
        }
        else if(amount == 0){
            this.props.notify(this.props.app_state.loc['1031']/* 'Please put a valid amount.' */, 1600)
        }
        else if(!this.check_if_sender_has_balance()){
            this.props.notify(this.props.app_state.loc['1032']/* 'You dont have enough tokens to add that transaction.' */, 4200)
        }
        else{
            var tx = {id:makeid(8), type:'transfer', 'amount':amount.toLocaleString('fullwide', {useGrouping:false}), 'recipient':recipient, 'exchange':this.state.token_item, entered_indexing_tags:['transfer', 'send', 'token']}

            clone.push(tx)
            this.setState({stack_items: clone, debit_balance: bigInt(this.state.debit_balance).add(amount), recipient_id:'', amount:0})
            this.props.notify(this.props.app_state.loc['1034']/* 'Transaction added.' */, 1600)
        }
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

    check_if_sender_has_balance(picked_amount){
        var picked_amount = this.state.amount
        var limit = this.get_number_limit()

        if(bigInt(picked_amount).greater(limit)){
            return false
        }
        return true
    }

    render_stack_transactions(){
        var items = [].concat(this.state.stack_items)

        if(items.length == 0){
            items = [0, 1]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
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
        }else{
            var items = [].concat(this.state.stack_items)
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.reverse().map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_stack_item_clicked(item)
                                    }}>
                                    <div style={{width:'100%', /* 'background-color':this.props.theme['send_receive_ether_background_color'] */}}>
                                        <li style={{'padding': '5px'}}>
                                            {this.render_detail_item('3', {'title':''+this.format_account_balance_figure(item['amount'])+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[this.state.token_item['id']], 'details':this.props.app_state.loc['1035']/* 'recipient account: ' */+this.format_recipient_account(item['recipient']), 'size':'l'})}
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

    format_recipient_account(recipient){
        if(recipient == '53'){
            return this.props.app_state.loc['2785']/* 'You' */
        }
        return recipient
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


    when_stack_item_clicked(item){
        var cloned_array = this.state.stack_items.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) {
            cloned_array.splice(index, 1);
        }
        this.setState({stack_items: cloned_array, debit_balance: bigInt(this.state.debit_balance).minus(bigInt(item.amount))})
        this.props.notify(this.props.app_state.loc['1036']/* 'Transaction removed.' */, 600)
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
            if(contact['id'].toString().includes(this.state.recipient_id)){
                return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
            }
        });
        return_array = this.filter_and_add_other_accounts(this.state.recipient_id, return_array)
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
        this.setState({recipient_id: item['id']})
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



    set_token(item){
        var current_token_id = this.state.token_item == null ? 1 : this.state.token_item['id']
        if(current_token_id != item['id']){
            this.setState({
                selected: 0,id:makeid(8), type: this.props.app_state.loc['1018']/* 'transfer' */,
                new_transfer_action_page_tags_object: this.get_new_transfer_action_page_tags_object(),
                recipient_id:'', amount:0, token_item: {'balance':1, 'id':0}, stack_items:[], debit_balance:0,
                entered_indexing_tags:[this.props.app_state.loc['1018']/* 'transfer' */, this.props.app_state.loc['1019']/* 'send' */, this.props.app_state.loc['999']/* 'token' */]
            })
        }
        this.setState({
            token_item: item, 
            e5: item['e5'], 
            debit_balance: this.get_debit_balance_in_stack(item['id'], item['e5'])
        })
    }


    add_transactions_to_stack(){
        if(this.state.stack_items.length == 0){
            this.props.notify(this.props.app_state.loc['2810']/* 'add a transaction first' */, 3700)
            return;
        }
        this.add_recipients_to_memory(this.state.stack_items)
        this.props.add_transfer_transactions_to_stack(this.state)
        this.props.notify(this.props.app_state.loc['18']/* 'transactions added to stack!' */, 1600)
        this.setState({recipient_id:'', stack_items:[]})
    }


    add_recipients_to_memory(stack_items){
        var recipient_acc_ids = this.get_recipients_from_memory()
        stack_items.forEach(item => {
            var recipient = item['recipient']
            if(!recipient_acc_ids.includes(recipient)) recipient_acc_ids.push(recipient);
        });

        var trimmed = recipient_acc_ids.slice(-7)
        var obj = {'data':trimmed}
        this.props.set_local_storage_data_if_enabled("transfer_data", JSON.stringify(obj));
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


}




export default TransferTokenPage;