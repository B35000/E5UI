import React, { Component } from 'react';
import Tags from './../components/tags';
import ViewGroups from './../components/view_groups'
import TextInput from './../components/text_input';
import NumberPicker from './../components/number_picker';

import Letter from './../assets/letter.png';
import Dialog from "@mui/material/Dialog";

var bigInt = require("big-integer");

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

class StackPage extends Component {
    
    state = {
        selected: 0,
        get_stack_page_tags_object: this.get_stack_page_tags_object(),
        get_themes_tags_object: this.get_theme_tags_object(),
        get_orientation_tags_object: this.get_orientation_tags_object(),
        get_wallet_thyme_tags_object:this.get_wallet_thyme_tags_object(),
        typed_word:'',added_tags:[],set_salt: 0,
        run_gas_limit:0, run_gas_price:0, hidden:[], invalid_ether_amount_dialog_box: false
    };

    get_stack_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e','run-settings','settings', 'wallet'], [0]
            ],
        };
        
    }

    get_theme_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e','light','dark'], [1]
            ],
        };
        
    }

    get_orientation_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e','right','left'], [1]
            ],
        };
        
    }

    get_wallet_thyme_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e','a','i','o','u','?','$','%','#','!'], [1]
            ],
        };
    }





    render(){
        return(
            <div style={{'margin':'10px 0px 0px 10px'}}>
                <Tags page_tags_object={this.state.get_stack_page_tags_object} tag_size={'l'} when_tags_updated={this.when_stack_tags_updated.bind(this)} theme={this.props.theme}/>
                
                <div style={{'margin':'20px 0px 0px 0px'}}>
                    {this.render_everything()}   
                </div>
                
            </div>
        )
    }

    when_stack_tags_updated(tag_group){
        this.setState({get_stack_page_tags_object: tag_group})
    }


    render_everything(){
        var selected_item = this.get_selected_item(this.state.get_stack_page_tags_object, this.state.get_stack_page_tags_object['i'].active)

        if(selected_item == 'e'){
            return(
                <div>
                    {this.render_stack_run_section()}
                </div>
            )    
        }else 
        if(selected_item == 'run-settings'){
            return(
                <div>
                    {this.render_stack_run_settings_section()}
                </div>
            )    
        }
        else if(selected_item == 'settings'){
            return(
                <div>
                    {this.render_settings_section()}
                </div>
            ) 
        }
        else if(selected_item == 'wallet'){
            return(
                <div>
                    {this.render_wallet_settings_section()}
                </div>
            ) 
        }
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }


    render_stack_run_settings_section(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div style={{'padding': '0px 20px 0px 10px'}}>
                    {this.render_stack_run_settings_part()}
                    {this.render_run_history_items()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 10px 0px 10px'}}>
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_stack_run_settings_part()}
                    </div>
                    <div className="col-6">
                        {this.render_run_history_items()}
                    </div>
                </div>
                
            )
        }
    }

    render_stack_run_settings_part(){
        var height = this.props.height-150

        return(
            <div style={{overflow: 'auto', maxHeight: height}}>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Transaction Gas Limit', 'subtitle':this.format_power_figure(this.state.run_gas_limit), 'barwidth':this.calculate_bar_width(this.state.run_gas_limit), 'number':this.format_account_balance_figure(this.state.run_gas_limit), 'barcolor':'', 'relativepower':'units', })}
                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_run_gas_limit.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}

            </div>
        )
    }

    when_run_gas_limit(number){
        this.setState({run_gas_limit: number})
    }

    when_run_gas_price(number){
        this.setState({run_gas_price: number})
    }

    render_run_history_items(){
         var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var middle = this.props.height-300;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = this.props.app_state.E15_runs

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
                                <div style={{height:140, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:40 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }else{
            
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
                                <div onClick={() => console.log()} style={{height:'auto', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color, 'margin':'0px 10px 10px 10px'}}>
                                    <div style={{'padding': '5px 0px 5px 5px'}}>
                                        {this.render_detail_item('3',{'title':item.returnValues.p3, 'details':'Transaction ID','size':'l'})}
                                        <div style={{height: 10}}/>
                                        {this.render_detail_item('3',{'title':item.returnValues.p4, 'details':'Transaction Stack Size','size':'l'})}
                                        <div style={{height: 10}}/>
                                        {this.render_detail_item('3',{'title':this.get_time_difference(item.returnValues.p8), 'details':'Timestamp','size':'l'})}
                                        <div style={{height: 10}}/>
                                        {this.render_detail_item('2', { 'style':'l', 'title':'Gas Consumed', 'subtitle':this.format_power_figure(item.returnValues.p5), 'barwidth':this.calculate_bar_width(item.returnValues.p5), 'number':this.format_account_balance_figure(item.returnValues.p5), 'barcolor':'', 'relativepower':'gas', })}
                                        
                                    </div>         
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }




    render_stack_run_section(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div style={{'padding': '0px 10px 0px 0px'}}>
                    {this.render_stack_gas_part()}
                    {this.render_detail_item('0')}
                    {this.render_stack_transactions_part()}
                    {this.render_dialog_ui()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 15px 0px 15px'}}>
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_stack_gas_part()}
                    </div>
                    <div className="col-6">
                        {this.render_stack_transactions_part()}
                    </div>
                    {this.render_dialog_ui()}
                </div>
                
            )
        }
    }


    render_stack_transactions_part(){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var middle = this.props.height-300;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = this.props.app_state.stack_items

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
                                <div style={{height:140, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:40 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }else{
            
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
                                {this.render_stack_item(item, index)}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_stack_item(item, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        // var op = this.state.hidden.includes(index) ? 0.5 : 1.0
        // var txt = this.state.hidden.includes(index) ? 'show' : 'hide'
        return(
            <div onClick={() => console.log()} style={{height:'auto', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color, 'margin':'0px 10px 10px 10px'}}>
                <div style={{'padding': '5px 0px 5px 5px'}}>
                    {this.render_detail_item('1',{'active_tags':item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':'delete_entered_tag_word'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3',{'title':'Stack ID - '+index, 'details':item.id,'size':'l'})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3',{'title':'Type: '+item.type, 'details':'Gas: '+number_with_commas(this.get_estimated_gas(item)),'size':'l'})}
                    <div style={{height: 10}}/>

                </div>         
            </div>
        )
    }

    show_hide_stack_item(item){
        var clone_array = this.state.hidden.slice()
        const index = clone_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            clone_array.splice(index, 1); // 2nd parameter means remove one item only
        }else{
            clone_array.push(item)
        }
        this.setState({hidden: clone_array})
    }

    render_stack_gas_part(){
        return(
            <div>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Balance in Ether', 'subtitle':this.format_power_figure(this.props.app_state.account_balance), 'barwidth':this.calculate_bar_width(this.props.app_state.account_balance), 'number':this.format_account_balance_figure(this.props.app_state.account_balance), 'barcolor':'#606060', 'relativepower':'wei', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':'Balance in Ether', 'subtitle':this.format_power_figure(this.props.app_state.account_balance/10**18), 'barwidth':this.calculate_bar_width(this.props.app_state.account_balance/10**18), 'number':this.format_account_balance_figure(this.props.app_state.account_balance/10**18), 'barcolor':'#606060', 'relativepower':'ether', })}
                </div>
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Number of Transactions', 'subtitle':this.format_power_figure(this.props.app_state.stack_items.length), 'barwidth':this.calculate_bar_width(this.props.app_state.stack_items.length), 'number':this.format_account_balance_figure(this.props.app_state.stack_items.length), 'barcolor':'', 'relativepower':'units', })}
                </div>
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Estimated Gas Consumed', 'subtitle':this.format_power_figure(this.estimated_gas_consumed()), 'barwidth':this.calculate_bar_width(this.estimated_gas_consumed()), 'number':this.format_account_balance_figure(this.estimated_gas_consumed()), 'barcolor':'', 'relativepower':'units', })}
                </div>
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Gas Price', 'subtitle':this.format_power_figure(this.props.app_state.gas_price), 'barwidth':this.calculate_bar_width(this.props.app_state.gas_price), 'number':this.format_account_balance_figure(this.props.app_state.gas_price), 'barcolor':'#606060', 'relativepower':'wei', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':'Gas Price in Gwei', 'subtitle':this.format_power_figure(this.props.app_state.gas_price/10**9), 'barwidth':this.calculate_bar_width(this.props.app_state.gas_price/10**9), 'number':this.format_account_balance_figure(this.props.app_state.gas_price/10**9), 'barcolor':'#606060', 'relativepower':'gwei', })}
                </div>
                

                <div style={{height:10}}/>
                <div style={{'padding': '5px'}} onClick={()=>this.run_transactions()}>
                    {this.render_detail_item('5', {'text':'Run Transactions', 'action':''})}
                </div>
            </div>
        )
    }

    estimated_gas_consumed(){
        var txs = this.props.app_state.stack_items
        var gas = 0;

        for(var i=0; i<txs.length; i++){
            var g = this.get_estimated_gas(txs[i])
            gas += g
        }

        return gas
    }

    get_estimated_gas(t){
        if(t.type == 'channel' || t.type == 'job' || t.type == 'post'){
            return 61315
        }
        else if(t.type == 'contract'){
            return 664043 + (60_000 * t.price_data.length)
        }
        else if(t.type == 'storefront'){
            return 61315 + (61_315 * t.store_items.length)
        }
        else if(t.type == 'subscription'){
            return 330605 + (60_000 * t.price_data.length)
        }
        else if(t.type == 'token'){
            return 676263 + (50_000 * t.price_data.length)
        }
    }


    run_transactions = async () => {
        var txs = this.props.app_state.stack_items
        var strs = []
        var ints = []
        var adds = []

        for(var i=0; i<txs.length; i++){
            if(!this.state.hidden.includes(i)){
                if(txs[i].type == 'contract'){
                    var contract_obj = this.format_contract_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(contract_obj)
                }
                else if(txs[i].type == 'token'){
                    var token_obj = this.format_token_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(token_obj)
                }
                else if(txs[i].type == 'subscription'){
                    var subscription_obj = this.format_subscription_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(subscription_obj)
                }
                else if(txs[i].type == 'post'){
                    var post_obj = this.format_post_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(post_obj)
                }
                else if(txs[i].type == 'job'){
                    var job_obj = this.format_job_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(job_obj)
                }
                else if(txs[i].type == 'channel'){
                    var channel_obj = this.format_channel_object(txs[i])
                    strs.push([['']])
                    adds.push([])
                    ints.push(channel_obj)
                }
                else if(txs[i].type == 'storefront'){
                    var storefront_data = this.format_storefront_object(txs[i], ints)
                    for(var i=0; i<storefront_data.objs; i++){
                        ints.push(storefront_data.objs[i])
                    }
                    ints.push(storefront_data.metadata_action)
                    strs.push([storefront_data.metadata_action_strings])
                    adds.push([])
                }

            }
            
        }

        var metadata_action = [ /* set metadata */
            [20000, 1, 0],
            [], [],/* target objects */
            []/* contexts */, 
            []/* int_data */
        ]
        var metadata_strings = [ [] ]

        for(var i=0; i<txs.length; i++){
            if(!this.state.hidden.includes(i)){
                if(txs[i].type == 'contract' || txs[i].type == 'token' || txs[i].type == 'subscription' || txs[i].type == 'post' || txs[i].type == 'job' || txs[i].type == 'channel' || txs[i].type == 'storefront'){
                    metadata_action[1].push(i)
                    metadata_action[2].push(35)
                    metadata_action[3].push(0)
                    metadata_action[4].push(0)
                    var ipfs_obj = await this.get_object_ipfs_index(txs[i]);
                    metadata_strings[0].push(ipfs_obj.toString())
                }
            }
        }
        ints.push(metadata_action)
        strs.push(metadata_strings)
        adds.push([])


        var index_data_in_tags = [ /* index data in tags */
            [20000, 12, 0],
            [], []/* target objects */
        ]

        var index_data_strings = [ [], [] ]

        for(var i=0; i<txs.length; i++){
            if(!this.state.hidden.includes(i)){
                if(txs[i].type == 'contract' || txs[i].type == 'token' || txs[i].type == 'subscription' || txs[i].type == 'post' || txs[i].type == 'job' || txs[i].type == 'channel' || txs[i].type == 'storefront'){
                    var tx_tags = txs[i].entered_indexing_tags
                    index_data_in_tags[1].push(i)
                    index_data_in_tags[2].push(35)
                    index_data_strings[0].push('en')
                    index_data_strings[1].push('')
                    for(var t=0; t<tx_tags.length; t++){
                        index_data_in_tags[1].push(i)
                        index_data_in_tags[2].push(35)
                        index_data_strings[0].push(tx_tags[t])
                        index_data_strings[1].push('')
                    }
                }
            }
        }

        ints.push(index_data_in_tags)
        strs.push(index_data_strings)
        adds.push([])

        var account_balance = this.props.app_state.account_balance
        var run_gas_limit = this.state.run_gas_limit == 0 ? 5_300_000 : this.state.run_gas_limit
        var run_gas_price = this.props.app_state.gas_price

        if(ints.length > 0){
            if(account_balance < (run_gas_limit * run_gas_price)){
                this.setState({invalid_ether_amount_dialog_box: true})
            }else{   
                this.props.run_transaction_with_e(strs, ints, adds, run_gas_limit)
            }
        }else{
            this.props.notify('add some transactions first!',600)
        }
        
    }

    get_object_ipfs_index(tx){
        var object_as_string = JSON.stringify(tx)
        var obj_cid = this.props.store_data_in_infura(object_as_string)
        return obj_cid
    }

    render_dialog_ui(){
        return(
            <Dialog onClose = {() => this.cancel_dialog_box()} open = {this.state.invalid_ether_amount_dialog_box}>
                <div style={{'padding': '10px', 'background-color':this.props.theme['card_background_color']}}>
                    
                    <h4 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>Issue With Run</h4>

                    {this.render_detail_item('3', {'title':'Invalid Balance', 'details':'You need ether to run your transactions', 'size':'s'})}

                </div>
                
            </Dialog>
        )
    }

    cancel_dialog_box(){
        this.setState({invalid_ether_amount_dialog_box: false})
    }

    format_contract_object(t){
        var default_vote_bounty_split_proportion = t.default_vote_bounty_split_proportion == 0 ? bgN(1,16) : t.default_vote_bounty_split_proportion
        var max_extend_enter_contract_limit = t.max_extend_enter_contract_limit == 0 ? 36_000_000 : t.max_extend_enter_contract_limit
        var default_minimum_end_vote_bounty_amount = t.default_minimum_end_vote_bounty_amount == 0 ? 5000 : t.default_minimum_end_vote_bounty_amount
        var default_proposal_expiry_duration_limit = t.default_proposal_expiry_duration_limit == 0 ? 30_000 : t.default_proposal_expiry_duration_limit
        var max_enter_contract_duration = t.max_enter_contract_duration == 0 ? bgN(1, 16) : t.max_enter_contract_duration
        var auto_wait_for_all_proposals_for_all_voters = this.get_selected_item(t.auto_wait_tags_object, t.auto_wait_tags_object['i'].active) == 'no' ? 0 : 1
        var default_minimum_spend_vote_bounty_amount = t.default_minimum_spend_vote_bounty_amount == 0 ? 5000 : t.default_minimum_spend_vote_bounty_amount
        var proposal_modify_expiry_duration_limit = t.proposal_modify_expiry_duration_limit == 0 ? 3600 : t.proposal_modify_expiry_duration_limit
        var can_modify_contract_as_moderator = this.get_selected_item(t.can_modify_contract_as_moderator, t.can_modify_contract_as_moderator['i'].active) == 'modifiable' ? 1 : 0
        var can_extend_enter_contract_at_any_time = this.get_selected_item(t.can_extend_enter_contract_at_any_time, t.can_extend_enter_contract_at_any_time['i'].active) == 'enabled' ? 1 : 0
        var maximum_proposal_expiry_submit_expiry_time_difference = t.maximum_proposal_expiry_submit_expiry_time_difference == 0 ? bgN(1,16) : t.maximum_proposal_expiry_submit_expiry_time_difference
        var bounty_limit_type = this.get_selected_item(t.bounty_limit_type, t.bounty_limit_type['i'].active) == 'relative' ? 0 : 1
        var contract_force_exit_enabled = this.get_selected_item(t.contract_force_exit_enabled, t.contract_force_exit_enabled['i'].active) == 'enabled' ? 1 : 0

        var obj = [/* create contract */
        [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 30, 0],
        [30], [23],
        [0, default_vote_bounty_split_proportion, max_extend_enter_contract_limit/* 2 */, 0, default_minimum_end_vote_bounty_amount, default_proposal_expiry_duration_limit, max_enter_contract_duration/* 6 */, 0, auto_wait_for_all_proposals_for_all_voters, 0, default_minimum_spend_vote_bounty_amount, 0, 0, 0/* 13 */, 0, bgN(1, 63), 0,0,0,0,0/* 20 */,0,0,0,0,0,0,proposal_modify_expiry_duration_limit/* 27 */,can_modify_contract_as_moderator,can_extend_enter_contract_at_any_time,0,0,0,0,0/* 34 */,0,maximum_proposal_expiry_submit_expiry_time_difference,bounty_limit_type,contract_force_exit_enabled,0,0], 
        [23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23],
        [], [],
        [], [],
        [], [],
        [0], [23],
        [0], [23],
        [0], [23],
        [0], [23],
        [0], [23]
      ]

      if(t.price_data.length == 0){
        obj[5].push(3)
        obj[6].push(23)
        obj[7].push(10_000)
        obj[8].push(23)
        obj[9].push(0)
        obj[10].push(23)
      }else{
        for(var i=0; i<t.price_data.length; i++){
            obj[5].push(parseInt(t.price_data[i]['id']))
            obj[6].push(23)
            obj[7].push(parseInt(t.price_data[i]['amount']))
            obj[8].push(23)
            obj[9].push(0)
            obj[10].push(23)
        }
      }

      return obj
    }

    format_token_object(t){
        var type = this.get_selected_item(t.new_token_type_tags_object, t.new_token_type_tags_object['i'].active);
        var new_token_type_tags_object = type == 'capped' ? 3 : 5
        var token_exchange_liquidity_total_supply = t.token_exchange_liquidity_total_supply <= 100_000 ? 1_000_000_000 : t.token_exchange_liquidity_total_supply.toString()
        if(type == 'uncapped'){
            token_exchange_liquidity_total_supply = 0
        }
        var default_exchange_amount_buy_limit = t.default_exchange_amount_buy_limit == 0 ? 100_000_000 : t.default_exchange_amount_buy_limit.toString()
        var minimum_transactions_between_swap = t.minimum_transactions_between_swap
        var minimum_blocks_between_swap = t.minimum_blocks_between_swap
        var minimum_time_between_swap = t.minimum_time_between_swap
        var default_exchange_amount_sell_limit = t.default_exchange_amount_sell_limit == 0 ? 100_000_000 : t.default_exchange_amount_sell_limit.toString()
        // var default_exchange_amount_sell_limit = 100_000_000
        var minimum_entered_contracts_between_swap = t.minimum_entered_contracts_between_swap
        var minimum_transactions_for_first_buy = t.minimum_transactions_for_first_buy
        var trust_fee_proportion = t.trust_fee_proportion == 0 ? bgN(1,16) : t.trust_fee_proportion.toString()
        // var trust_fee_proportion = bgN(1,16)
        var block_limit = t.block_limit
        var new_token_unlocked_liquidity_tags_object = this.get_selected_item(t.new_token_unlocked_liquidity_tags_object, t.new_token_unlocked_liquidity_tags_object['i'].active) == 'unlocked' ? 1 : 0
        var new_token_unlocked_supply_tags_object = this.get_selected_item(t.new_token_unlocked_supply_tags_object, t.new_token_unlocked_supply_tags_object['i'].active) == 'unlocked' ? 1 : 0
        var new_token_fully_custom_tags_object = this.get_selected_item(t.new_token_fully_custom_tags_object, t.new_token_fully_custom_tags_object['i'].active) == 'fully-custom' ? 1 : 0
        var internal_block_halfing_proportion = t.internal_block_halfing_proportion
        var block_limit_reduction_proportion = t.block_limit_reduction_proportion
        var block_reset_limit = t.block_reset_limit
        var new_token_block_limit_sensitivity_tags_object = parseInt(this.get_selected_item(t.new_token_block_limit_sensitivity_tags_object, t.new_token_block_limit_sensitivity_tags_object['i'].active))
        var default_authority_mint_limit = t.default_authority_mint_limit == 0 ? bgN(1,16) : t.default_authority_mint_limit
        var new_token_halving_type_tags_object = this.get_selected_item(t.new_token_halving_type_tags_object, t.new_token_halving_type_tags_object['i'].active) == 'spread' ? 1 : 0
        var maturity_limit = t.maturity_limit
        var minimum_entered_contracts_for_first_buy = t.minimum_entered_contracts_for_first_buy
        var active_block_limit_reduction_proportion = type == 'capped' ? 0 : bgN(100,16)
        var token_exchange_ratio_x = t.token_exchange_ratio_x == 0 ? token_exchange_liquidity_total_supply: t.token_exchange_ratio_x
        if(token_exchange_ratio_x != token_exchange_liquidity_total_supply){
            token_exchange_ratio_x = token_exchange_liquidity_total_supply
        }
        var token_exchange_ratio_y = t.token_exchange_ratio_y == 0 ? 1 : t.token_exchange_ratio_y
        var exchange_authority = t.exchange_authority == '' ? 53 : parseInt(t.exchange_authority)
        var exchange_authority_type = 23
        if(exchange_authority == 53){
            exchange_authority_type = 53
        }
        var trust_fee_target = t.trust_fee_target == '' ? 53 : parseInt(t.trust_fee_target)
        var trust_fee_target_type = 23
        if(trust_fee_target == 53){
            trust_fee_target_type = 53
        }

        var obj = [/* create token */
            [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 31, 0],
            [new_token_unlocked_supply_tags_object, new_token_unlocked_liquidity_tags_object, new_token_fully_custom_tags_object, new_token_type_tags_object],
            [23, 23, 23, 23],

            [ default_exchange_amount_buy_limit, block_limit, minimum_transactions_between_swap, minimum_blocks_between_swap/* 3 */, minimum_time_between_swap, internal_block_halfing_proportion, block_limit_reduction_proportion, trust_fee_proportion/* 7 */, block_reset_limit, exchange_authority, trust_fee_target, default_exchange_amount_sell_limit/* 11 */, new_token_block_limit_sensitivity_tags_object, minimum_entered_contracts_between_swap, default_authority_mint_limit, new_token_halving_type_tags_object/* 15 */, maturity_limit, minimum_transactions_for_first_buy, minimum_entered_contracts_for_first_buy],
            [23, 23, 23, 23, 23, 23, 23, 23, 23, exchange_authority_type, trust_fee_target_type, 23, 23, 23, 23, 23, 23, 23, 23],

            [token_exchange_ratio_x, token_exchange_ratio_y, token_exchange_liquidity_total_supply/* 2 */, 0, 0, 0, active_block_limit_reduction_proportion],
            [23, 23, 23, 23, 23, 23, 23],

            [], [],
            [], [],
            [], []
        ]

      if(t.price_data.length == 0){
        obj[7].push(3)
        obj[8].push(23)
        obj[9].push(1)
        obj[10].push(23)
        obj[11].push(0)
        obj[12].push(23)
      }else{
        for(var i=0; i<t.price_data.length; i++){
            obj[7].push(parseInt(t.price_data[i]['id']))
            obj[8].push(23)
            obj[9].push(parseInt(t.price_data[i]['amount']))
            obj[10].push(23)
            obj[11].push(0)
            obj[12].push(23)
        }
      }

      return obj
    }

    format_subscription_object(t){
        var exchange_authority = t.authority_id == '' ? 53 : parseInt(t.authority_id)
        var exchange_authority_type = 23
        if(exchange_authority == 53){
            exchange_authority_type = 53
        }
        var minimum_buy_amount = t.minimum_buy_amount == 0 ? 1 : t.minimum_buy_amount
        var cancellable_tags_object = this.get_selected_item(t.cancellable_tags_object, t.cancellable_tags_object['i'].active) == 'true' ? 1 : 0
        var maximum_buy_amount = t.maximum_buy_amount
        var minimum_cancellable_balance_amount = t.minimum_cancellable_balance_amount
        var time_unit = t.time_unit
        var subscription_beneficiary = t.subscription_beneficiary == '' ? 53 : parseInt(t.subscription_beneficiary)
        var subscription_beneficiary_type = 23
        if(subscription_beneficiary == 53){
            subscription_beneficiary_type = 53
        }

        var obj = [/* create subscription */
            [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 33, 0],
            [0], [23],
            [exchange_authority, minimum_buy_amount, cancellable_tags_object, maximum_buy_amount, minimum_cancellable_balance_amount/* 4 */, time_unit, subscription_beneficiary], [exchange_authority_type, 23, 23, 23, 23, 23, subscription_beneficiary_type],
            [], [],
            [], [],
            [], []
        ]

      if(t.price_data.length == 0){
        obj[5].push(3)
        obj[6].push(23)
        obj[7].push(10_000)
        obj[8].push(23)
        obj[9].push(0)
        obj[10].push(23)
      }else{
        for(var i=0; i<t.price_data.length; i++){
            obj[5].push(parseInt(t.price_data[i]['id']))
            obj[6].push(23)
            obj[7].push(parseInt(t.price_data[i]['amount']))
            obj[8].push(23)
            obj[9].push(0)
            obj[10].push(23)
        }
      }

      return obj
    }

    format_post_object(t){
        var obj = [/* custom object */
            [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 18, 0]
        ]
        return obj
    }

    format_job_object(t){
        var obj = [/* custom object */
            [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 17, 0]
        ]
        return obj
    }

    format_channel_object(t){
        var obj = [/* custom object */
            [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 36, 0]
        ]
        return obj
    }

    format_storefront_object(t, ints){
        var objs = []
        var metadata_action_strings = []
        var obj = [/* storefront object */ [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 28, 0] ]
        objs.push(obj)
        var storefront_stack_id = ints.length
        var metadata_action = [ /* set metadata */
            [20000, 1, 0],
            [], [],/* target objects */
            []/* contexts */, 
            []/* int_data */
        ]
        for(var i=0; i<t.store_items; i++){
            objs.push([/* storefront item object */ [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 27, 0] ])
            metadata_action[1].push(storefront_stack_id)
            metadata_action[2].push(35)
            metadata_action[3].push(storefront_stack_id+i+1)
            metadata_action[4].push(0)
            metadata_action_strings.push('')
        }
        return {objs: objs, metadata_action: metadata_action, metadata_action_strings: metadata_action_strings}
    }







    render_settings_section(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div>
                    {this.render_settings_details()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 0px 0px 0px'}}>
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_settings_details()}
                    </div>
                    <div className="col-6">
                        
                    </div>
                </div>
                
            )
        }
        
    }

    render_settings_details(){
        return(
            <div>
                <div style={{height: 10}}/>
                <div style={{'padding': '0px 0px 0px 10px'}}>

                    {this.render_detail_item('3',{'title':'App Theme', 'details':'Set the look and feel of E5.', 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags page_tags_object={this.state.get_themes_tags_object} tag_size={'l'} when_tags_updated={this.when_theme_tags_updated.bind(this)} theme={this.props.theme}/>

                    {this.render_detail_item('0')}


                    {this.render_detail_item('3',{'title':'Orientation (for larger screens)', 'details':'Set the orientation for viewing a posts details', 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags page_tags_object={this.state.get_orientation_tags_object} tag_size={'l'} when_tags_updated={this.when_details_orientation_changed.bind(this)} theme={this.props.theme}/>

                    {this.render_detail_item('0')}

                </div>
            </div>
        )
    }

    when_theme_tags_updated(tag_group){
        this.setState({get_themes_tags_object: tag_group})

        var selected_item = this.get_selected_item(this.state.get_themes_tags_object, this.state.get_themes_tags_object['i'].active)

        if(selected_item == 'e'){
            selected_item = 'light'
        }

        this.props.when_device_theme_changed(selected_item)
    }


    when_details_orientation_changed(tag_group){
        
        this.setState({get_orientation_tags_object: tag_group})
        var selected_item = this.get_selected_item(this.state.get_orientation_tags_object, this.state.get_orientation_tags_object['i'].active)

        if(selected_item == 'e'){
            selected_item = 'right'
        }

        this.props.when_details_orientation_changed(selected_item)
    }






    render_wallet_settings_section(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div style={{'padding': '0px 30px 0px 0px', 'margin':'0px 0px 0px 0px'}}>
                    {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px', 'text':'Set the seed and salt for your preferred wallet', 'color':'dark-grey'})}
                    <div style={{height: 20}}/>

                    {this.render_set_wallet_data()}
                    {this.render_detail_item('0')}

                    {this.render_wallet_settings_part()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 10px 0px 0px'}}>
                    {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px', 'text':'Set the seed and salt for your preferred wallet', 'color':'dark-grey'})}
                    <div style={{height: 20}}/>

                    <div className="col-6" style={{'padding': '0px 0px 0px 20px'}}>
                        {this.render_wallet_settings_part()}
                    </div>
                    <div className="col-6">
                        {this.render_set_wallet_data()}
                    </div>
                </div>
                
            )
        }
    }


    render_wallet_settings_part(){
        return(
            <div>
                {this.render_detail_item('3',{'title':'Wallet Seed', 'details':'Set your preferred seed. Type a word then click add to add a word, or tap the word to remove', 'size':'l'})}
                <div style={{height: 10}}/>
                
                <div className="row">
                    <div className="col-9" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput height={30} placeholder={'Enter word...'} when_text_input_field_changed={this.when_text_input_field_changed.bind(this)} text={this.state.typed_word} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 10px 0px 0px'}}>
                        {this.render_detail_item('5',{'text':'Add','action':'when_add_word_button_tapped'})}
                    </div>
                </div>

                {this.render_detail_item('1',{'active_tags':this.state.added_tags, 'indexed_option':'indexed', 'when_tapped':'delete_entered_seed_word'})}
                

                {this.render_detail_item('0')}

                {this.render_detail_item('3',{'title':'Wallet Salt', 'details':'Set the preferred salt for your wallet', 'size':'l'})}
                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_new_salt_figure_set.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}

                {this.render_detail_item('3',{'title':'Wallet Thyme', 'details':'Set the preferred thyme for your wallet', 'size':'l'})}
                <Tags page_tags_object={this.state.get_wallet_thyme_tags_object} tag_size={'l'} when_tags_updated={this.when_thyme_tags_updated.bind(this)} theme={this.props.theme}/>
                {this.render_detail_item('0')}

                {this.render_detail_item('5',{'text':'Set Wallet','action':'when_set_wallet_button_tapped'})}
                {this.render_detail_item('0')}
                {this.render_detail_item('0')}
            </div>
        )
    }

    when_thyme_tags_updated(tag_group){
        this.setState({get_wallet_thyme_tags_object: tag_group})
    }

    when_new_salt_figure_set(number){
        this.setState({set_salt: number})
    }

    when_set_wallet_button_tapped(){
        var selected_item = this.get_selected_item(this.state.get_wallet_thyme_tags_object, this.state.get_wallet_thyme_tags_object['i'].active)

        if(selected_item == 'e'){
            selected_item = 'a'
        }

        if(this.state.added_tags.length == 0){
            this.props.notify('set your wallets seed', 600)
        }
        else if(this.state.set_salt == 0){
            this.props.notify('set a salt', 200)
        }
        else{
            this.props.when_wallet_data_updated(this.state.added_tags, this.state.set_salt, selected_item)
            this.props.notify('wallet set!', 200)
        }
        
    }


    when_text_input_field_changed(text){
        this.setState({typed_word: text})
    }

    when_add_word_button_tapped(){
        var typed_word = this.state.typed_word.trim();

        if(typed_word == ''){
            this.props.notify('type something!', 400)
        }
        else if(this.hasWhiteSpace(typed_word)){
            this.props.notify('enter one word!', 400)
        }
        else{
            var cloned_seed_array = this.state.added_tags.slice()
            cloned_seed_array.push(typed_word)
            this.setState({added_tags: cloned_seed_array, typed_word:''})
            this.props.notify('word added!', 200)
        }
    }

    delete_entered_seed_word(word, pos){
        var cloned_seed_array = this.state.added_tags.slice()
        const index = cloned_seed_array.indexOf(word);
        if (index > -1) { // only splice array when item is found
            cloned_seed_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({added_tags: cloned_seed_array})
        this.props.notify('word removed', 200)
    }

    hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
    }


    render_set_wallet_data(){
        return(
            <div>
                
                {this.render_detail_item('3', {'title':'Wallet Address', 'details':this.get_account_address(), 'size':'s'})}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 20px'}} className="fw-bold">Wallet Balance in Ether and Wei</p>
                        {this.render_detail_item('2', this.get_balance_amount_in_wei())}
                        {this.render_detail_item('2', this.get_balance_amount_in_ether())}
                </div>
                
                
            </div>
        )
    }

    get_account_address(){
        if(this.props.app_state.account != null){
            return this.props.app_state.account.address;
        }
    }

    get_balance_amount_in_wei(){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(this.props.app_state.account_balance),
            'number':this.format_account_balance_figure(this.props.app_state.account_balance),
            'barcolor':'#606060',
            'relativepower':'wei',
        }
    }


    get_balance_amount_in_ether(){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(this.props.app_state.account_balance/10**18),
            'number':this.format_account_balance_figure(this.props.app_state.account_balance/10**18),
            'barcolor':'#606060',
            'relativepower':'ether',
        }
    }



    




    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data} theme={this.props.theme} when_add_word_button_tapped={this.when_add_word_button_tapped.bind(this)} delete_entered_seed_word={this.delete_entered_seed_word.bind(this)} when_set_wallet_button_tapped={this.when_set_wallet_button_tapped.bind(this)}/>
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

    calculate_bar_width(amount){
        var figure = ''
        if(amount == null){
            amount = 0
        }
        if(amount < bigInt('1e9')){
            figure = Math.round((amount.toString().length * 100) / bigInt('1e9').toString().length)
        }
        else if(amount < bigInt('1e18')){
            figure = Math.round((amount.toString().length * 100) / bigInt('1e18').toString().length)
        }
        else if(amount < bigInt('1e36')){
            figure = Math.round((amount.toString().length * 100) / bigInt('1e36').toString().length)
        }
        else{
            figure = Math.round((amount.toString().length * 100) / bigInt('1e72').toString().length)
        }

        return figure+'%'
    }

    format_power_figure(amount){
        var power = 'e72'
        if(amount < bigInt('1e9')){
            power = 'e9'
        }
        else if(amount < bigInt('1e18')){
            power = 'e18'
        }
        else if(amount < bigInt('1e36')){
            power = 'e36'
        }
        else{
            power = 'e72'
        }
        return power
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
            return num+ ' sec'
        }
        else if(diff < 60*60){//less than 1 hour
            var num = Math.floor(diff/(60));
            var s = num > 1 ? 's': '';
            return num + ' min' 
        }
        else if(diff < 60*60*24){//less than 24 hours
            var num = Math.floor(diff/(60*60));
            var s = num > 1 ? 's': '';
            return num + ' hr' + s;
        }
        else if(diff < 60*60*24*7){//less than 7 days
            var num = Math.floor(diff/(60*60*24));
            var s = num > 1 ? 's': '';
            return num + ' dy' + s;
        }
        else if(diff < 60*60*24*7*53){//less than 1 year
            var num = Math.floor(diff/(60*60*24*7));
            var s = num > 1 ? 's': '';
            return num + ' wk' + s;
        }
        else {//more than a year
            var num = Math.floor(diff/(60*60*24*7*53));
            var s = num > 1 ? 's': '';
            return num + ' yr' + s;
        }
    }

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
    }



}




export default StackPage;