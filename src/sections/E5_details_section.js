import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';

import End35 from './../assets/end35.png';
import End25 from './../assets/E25.png';
import Letter from './../assets/letter.png'; 

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class E5DetailsSection extends Component {
    
    state = {
        selected: 0, navigate_view_e5_list_detail_tags_object: this.get_navigate_view_e5_list_detail_tags(),
    };

    get_navigate_view_e5_list_detail_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e','details'],[1]
          ],
        }
    }

    render(){
        return(
            <div>
                {this.render_E5s_list_detail()}
            </div>
        )
    }

    render_E5s_list_detail(){
        if(this.props.selected_e5_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_e5_details_section()}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 0px 0px', 'max-width':'470px'}}>
                        <Tags page_tags_object={this.state.navigate_view_e5_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_e5_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
    }

    render_empty_detail_object(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height
        return(
            <div style={{height:this.props.height-45, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center','margin':'0px 0px 20px 0px'}}>
                <div style={{'margin':'10px 20px 0px 0px'}}>
                    <img src={Letter} style={{height:70 ,width:'auto'}} />
                    <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                </div>
            </div>
        );
    }

    when_navigate_view_e5_list_detail_tags_object_updated(tag_group){
        this.setState({navigate_view_e5_list_detail_tags_object: tag_group})
    }

    get_item_in_array(object_array, id){
        var object = object_array.find(x => x['id'] === id);
        return object
    }

    render_e5_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_e5_list_detail_tags_object, this.state.navigate_view_e5_list_detail_tags_object['i'].active)
        var obj = this.get_item_in_array(this.get_e5_data(), this.props.selected_e5_item)

        if(obj == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }

        if(selected_item == 'details' || selected_item == 'e'){
            return(
                <div>
                    {this.render_e5_main_details_section(obj)}
                </div>
            )
        }else if(selected_item == 'transactions'){
            return(
                <div>
                    
                </div>
            )
            
        }
    }

    render_e5_main_details_section(obj){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-55
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        var item = this.get_e5_details_data(obj)
        // var obj = this.get_e5_data()[this.props.selected_e5_item]
        var e5 = obj['id']
        return(
            <div style={{ 'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 5px 10px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    
                    {this.render_detail_item('7', item['label'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['default_vote_bounty_split_proportion'])}
                   <div style={{height:10}}/>
                    {this.render_detail_item('3', item['default_proposal_expiry_duration_limit'])}

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['default_end_minimum_contract_amount'])}
                    </div>

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['default_spend_minimum_contract_amount'])}
                    </div>

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['default_minimum_end_vote_bounty_amount'])}
                    </div>

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['default_minimum_spend_vote_bounty_amount'])}
                    </div>
                    
                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['tx_gas_limit'])}
                    </div>

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['contract_block_invocation_limit'])}

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['contract_time_invocation_limit'])}

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['minimum_entered_contracts'])}

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['tag_indexing_limit'])}

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['minimum_transaction_count'])}

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['gas_anchor_price'])}
                    </div>

                    
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['tx_gas_reduction_proportion'])}

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['tx_gas_anchor_price'])}
                    </div>

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['tx_gas_lower_limit'])}
                    </div>

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['absolute_proposal_expiry_duration_limit'])}
                    

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['invite_only_e5'])}

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['primary_tx_account'])}

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['primary_account_tx_period'])}

                    {this.render_detail_item('0')}

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', {'style':'l','title':'End Balance', 'subtitle':this.format_power_figure(this.props.app_state.end_balance_of_E5[e5]), 'barwidth':this.calculate_bar_width(this.props.app_state.end_balance_of_E5[e5]), 'number':this.format_account_balance_figure(this.props.app_state.end_balance_of_E5[e5]), 'relativepower':'END'})}
                    </div>

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', {'style':'l','title':'Spend Balance', 'subtitle':this.format_power_figure(this.props.app_state.spend_balance_of_E5[e5]), 'barwidth':this.calculate_bar_width(this.props.app_state.spend_balance_of_E5[e5]), 'number':this.format_account_balance_figure(this.props.app_state.spend_balance_of_E5[e5]), 'relativepower':'SPEND'})}
                    </div>
                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', {'style':'l','title':'End Balance of Burn Account', 'subtitle':this.format_power_figure(this.props.app_state.end_balance_of_burn_account[e5]), 'barwidth':this.calculate_bar_width(this.props.app_state.end_balance_of_burn_account[e5]), 'number':this.format_account_balance_figure(this.props.app_state.end_balance_of_burn_account[e5]), 'relativepower':'END'})}
                    </div>

                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', {'style':'l','title':'E5 Ether balance in Ether', 'subtitle':this.format_power_figure(this.props.app_state.E5_balance[e5]/10**18), 'barwidth':this.calculate_bar_width(this.props.app_state.E5_balance[e5]/10**18), 'number':(this.props.app_state.E5_balance[e5]/10**18), 'relativepower':'Ether'})}

                        {this.render_detail_item('2', {'style':'l','title':'E5 Ether balance in Wei', 'subtitle':this.format_power_figure(this.props.app_state.E5_balance[e5]), 'barwidth':this.calculate_bar_width(this.props.app_state.E5_balance[e5]), 'number':this.format_account_balance_figure(this.props.app_state.E5_balance[e5]), 'relativepower':'wei'})}
                    </div>

                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.basic_transaction_data[e5][0], 'details':'Last Transaction Block', 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'title':this.get_time_difference(this.props.app_state.basic_transaction_data[e5][1]), 'details':'Last Transaction age', 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.basic_transaction_data[e5][2], 'details':'Number of entered contracts', 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.basic_transaction_data[e5][3], 'details':'Number of E5 runs', 'size':'l'})}


                    {this.render_detail_item('0')}

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', {'style':'l','title':'Withdraw balance', 'subtitle':this.format_power_figure(this.props.app_state.withdraw_balance[e5]), 'barwidth':this.calculate_bar_width(this.props.app_state.withdraw_balance[e5]), 'number':this.format_account_balance_figure(this.props.app_state.withdraw_balance[e5]), 'relativepower':'wei'})}
                    </div>

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'details':'Withdraw your Ether to a specified address', 'title':'Withdraw Ether'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_withdraw_ether_ui(obj)}>
                        {this.render_detail_item('5', {'text':'Withdraw', 'action':''})}
                    </div>

                    {this.render_detail_item('0')}

                    {this.load_E5_charts(obj)}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }


    open_withdraw_ether_ui(obj){
        // var obj = this.get_e5_data()[this.props.selected_e5_item]
        this.props.show_withdraw_ether_bottomsheet(obj)
    }

    get_e5_data(){
        return this.props.get_e5_data()
    }

    get_e5_details_data(obj){
        // var obj = this.get_e5_data()[this.props.selected_e5_item]
        var img_obj = {'E15':End35, 'E25':End25}
        var contract_config = obj['data'][1]
        return{
            'label':{'header':obj['id'], 'subtitle':'Main Contract', 'size':'l', 'image': img_obj[obj['id']]},
            'tags':{'active_tags':[obj['id'],'E5', 'Main', 'Contract'], 'index_option':'indexed'},
            
            'default_vote_bounty_split_proportion': {'title':this.format_proportion(contract_config[1]), 'details':'Vote Bounty Split Proportion', 'size':'l'},
            
            'default_end_minimum_contract_amount':{'style':'l','title':'Minimum End Contract Amount', 'subtitle':this.format_power_figure(contract_config[3]), 'barwidth':this.calculate_bar_width(contract_config[3]), 'number':this.format_account_balance_figure(contract_config[3]), 'relativepower':'tokens'},

            'default_minimum_end_vote_bounty_amount':{'style':'l','title':'Minimum End Bounty Amount', 'subtitle':this.format_power_figure(contract_config[4]), 'barwidth':this.calculate_bar_width(contract_config[4]), 'number':this.format_account_balance_figure(contract_config[4]), 'relativepower':'tokens'},

            'default_proposal_expiry_duration_limit': {'title':this.get_time_diff(contract_config[5]), 'details':'Proposal Expiry Duration Limit', 'size':'l'},

            'default_spend_minimum_contract_amount':{'style':'l','title':'Minimum Spend Contract Amount', 'subtitle':this.format_power_figure(contract_config[9]), 'barwidth':this.calculate_bar_width(contract_config[9]), 'number':this.format_account_balance_figure(contract_config[9]), 'relativepower':'tokens'},

            'default_minimum_spend_vote_bounty_amount':{'style':'l','title':'Minimum Spend Bounty Amount', 'subtitle':this.format_power_figure(contract_config[10]), 'barwidth':this.calculate_bar_width(contract_config[10]), 'number':this.format_account_balance_figure(contract_config[10]), 'relativepower':'tokens'},

            'tx_gas_limit':{'style':'l','title':'Transaction Gas Limit', 'subtitle':this.format_power_figure(contract_config[11]), 'barwidth':this.calculate_bar_width(contract_config[11]), 'number':this.format_account_balance_figure(contract_config[11]), 'relativepower':'gas'},

            'contract_block_invocation_limit': {'title':contract_config[12], 'details':'E5 block invocation Limit', 'size':'l'},

            'contract_time_invocation_limit': {'title':contract_config[13], 'details':'E5 time invocation Limit', 'size':'l'},

            'minimum_entered_contracts': {'title':contract_config[14], 'details':'Minimum Entered Contracts for Consensus Participation', 'size':'l'},

            'tag_indexing_limit': {'title':contract_config[16], 'details':'Tag Indexing Limit', 'size':'l'},
            'minimum_transaction_count': {'title':contract_config[19], 'details':'Minimum Transaction Count for Consensus Particiation', 'size':'l'},

            'gas_anchor_price':{'style':'l','title':'Gas Anchor Price', 'subtitle':this.format_power_figure(contract_config[23]), 'barwidth':this.calculate_bar_width(contract_config[23]), 'number':this.format_account_balance_figure(contract_config[23]), 'relativepower':'wei'},

            'tx_gas_reduction_proportion': {'title':this.format_proportion(contract_config[24]), 'details':'Transaction Gas Reduction Proportion', 'size':'l'},

            'tx_gas_anchor_price':{'style':'l','title':'Transaction Gas Anchor Price', 'subtitle':this.format_power_figure(contract_config[25]), 'barwidth':this.calculate_bar_width(contract_config[25]), 'number':this.format_account_balance_figure(contract_config[25]), 'relativepower':'wei'},

            'tx_gas_lower_limit':{'style':'l','title':'Transaction Gas Lower Limit', 'subtitle':this.format_power_figure(contract_config[26]), 'barwidth':this.calculate_bar_width(contract_config[26]), 'number':this.format_account_balance_figure(contract_config[26]), 'relativepower':'wei'},

            'absolute_proposal_expiry_duration_limit': {'title':this.get_time_diff(contract_config[30]), 'details':'Absolute Proposal Expiry Duration Limit', 'size':'l'},

            'invite_only_e5': {'title':this.enabled_disabled(contract_config[32]), 'details':'Invite Only E5', 'size':'l'},

            'primary_tx_account': {'title':contract_config[39], 'details':'Primary Transaction Account', 'size':'l'},

            'primary_account_tx_period': {'title':this.get_time_diff(contract_config[40]), 'details':'Primary Account Transaction Period', 'size':'l'},
        }
    }

    
    
    
    
    
    load_E5_charts(obj){
        var e5_chart_data = this.props.app_state.all_data[obj['id']]
        if(e5_chart_data != null){
           return(
               <div>
                    {this.show_subscription_transaction_count_chart(e5_chart_data)}
                    {this.show_contract_transaction_count_chart(e5_chart_data)}
                    {this.show_proposal_transaction_count_chart(e5_chart_data)}
                    {this.show_exchange_transaction_count_chart(e5_chart_data)}
                    {this.show_post_transaction_count_chart(e5_chart_data)}
                    {this.show_channel_transaction_count_chart(e5_chart_data)}
                    {this.show_job_transaction_count_chart(e5_chart_data)}
                    {this.show_stores_transaction_count_chart(e5_chart_data)}
                    {this.show_bag_transaction_count_chart(e5_chart_data)}
                    {this.show_contractor_transaction_count_chart(e5_chart_data)}
                    {this.show_data_transaction_count_chart(e5_chart_data)}
                    {this.show_metadata_transaction_count_chart(e5_chart_data)}
                    {this.show_withdraw_amount_data_chart(e5_chart_data)}
                    {this.show_deposit_amount_data_chart(e5_chart_data)}
                    {this.show_transaction_transaction_count_chart(e5_chart_data)}
               </div>
           ) 
        }
    }


    show_subscription_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['subscription']
        var amount = events.length
        if(events.length != 0){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Subscriptions Created', 'details':`Chart containing the total number of subscriptions made over time.`, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_transaction_count_data_points(events), 'interval':this.get_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Y-Axis: Total Subscriptions Made', 'details':'X-Axis: Time', 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Total Subscriptions', 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': 'subscriptions', })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_transaction_count_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i==0){
                    data.push(1)
                }
                else{
                    data.push(parseInt(data[data.length-1]) + (1))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p4
                    for(var t=0; t<diff; t+=60){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p4 - events[i].returnValues.p4
                    for(var t=0; t<diff; t+=60){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }
        


        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(yVal)});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_transaction_count_interval_figure(events){
        return events.length
    }




    show_contract_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['contract']
        var amount = events.length
        if(events.length != 0){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Contracts Created', 'details':`Chart containing the total number of contracts made over time.`, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_transaction_count_data_points(events), 'interval':this.get_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Y-Axis: Total Contracts Made', 'details':'X-Axis: Time', 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Total Contracts', 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': 'contracts', })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_proposal_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['proposal']
        var amount = events.length
        if(events.length != 0){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Proposals Created', 'details':`Chart containing the total number of proposals made over time.`, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_transaction_count_data_points(events), 'interval':this.get_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Y-Axis: Total Proposals Made', 'details':'X-Axis: Time', 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Total Proposals', 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': 'proposals', })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_exchange_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['exchange']
        var amount = events.length
        if(events.length != 0){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Exchanges Created', 'details':`Chart containing the total number of exchanges made over time.`, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_transaction_count_data_points(events), 'interval':this.get_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Y-Axis: Total Exchanges Made', 'details':'X-Axis: Time', 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Total Exchanges', 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': 'exchanges', })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }




    show_post_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['post']
        var amount = events.length
        if(events.length != 0){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Indexed Posts Created', 'details':`Chart containing the total number of indexed posts made over time.`, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_post_transaction_count_data_points(events), 'interval':this.get_post_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Y-Axis: Total Posts Made', 'details':'X-Axis: Time', 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Total Posts', 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': 'posts', })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_post_transaction_count_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i==0){
                    data.push(1)
                }
                else{
                    data.push(parseInt(data[data.length-1]) + (1))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p6
                    for(var t=0; t<diff; t+=60){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p6 - events[i].returnValues.p6
                    for(var t=0; t<diff; t+=60){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }
        


        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(yVal)});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_post_transaction_count_interval_figure(events){
        return events.length
    }





    show_channel_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['channel']
        var amount = events.length
        if(events.length != 0){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Indexed Channels Created', 'details':`Chart containing the total number of indexed channels made over time.`, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_post_transaction_count_data_points(events), 'interval':this.get_post_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Y-Axis: Total Channels Made', 'details':'X-Axis: Time', 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Total Channels', 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': 'channels', })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }
    
    show_job_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['job']
        var amount = events.length
        if(events.length != 0){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Indexed Jobs Created', 'details':`Chart containing the total number of indexed jobs made over time.`, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_post_transaction_count_data_points(events), 'interval':this.get_post_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Y-Axis: Total Jobs Made', 'details':'X-Axis: Time', 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Total Jobs', 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': 'jobs', })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_stores_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['store']
        var amount = events.length
        if(events.length != 0){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Indexed Storefront Items Created', 'details':`Chart containing the total number of indexed storefront items made over time.`, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_post_transaction_count_data_points(events), 'interval':this.get_post_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Y-Axis: Total Storefront Items Made', 'details':'X-Axis: Time', 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Total Storefront Items', 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': 'items', })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_bag_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['bag']
        var amount = events.length
        if(events.length != 0){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Bags Created', 'details':`Chart containing the total number of bags made over time.`, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_transaction_count_data_points(events), 'interval':this.get_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Y-Axis: Total Bags Made', 'details':'X-Axis: Time', 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Total Bags', 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': 'bags', })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_contractor_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['contractor']
        var amount = events.length
        if(events.length != 0){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Indexed Contractors Created', 'details':`Chart containing the total number of indexed contractors made over time.`, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_post_transaction_count_data_points(events), 'interval':this.get_post_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Y-Axis: Total Contractor Posts', 'details':'X-Axis: Time', 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Total Contractor Posts', 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': 'contractors', })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_data_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['data']
        var amount = events.length
        if(events.length != 0){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Data Throughput', 'details':`Chart containing the data throughput over time.`, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_post_transaction_count_data_points(events), 'interval':this.get_post_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Y-Axis: Total Data Events', 'details':'X-Axis: Time', 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Total Data Events', 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': 'events', })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }




    show_metadata_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['metadata']
        var amount = events.length
        if(events.length != 0){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Metadata Throughput', 'details':`Chart containing the total number of metadata events made over time.`, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_metadata_transaction_count_data_points(events), 'interval':this.get_metadata_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Y-Axis: Total Metadata Events', 'details':'X-Axis: Time', 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Total Metadata Events', 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': 'events', })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_metadata_transaction_count_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i==0){
                    data.push(1)
                }
                else{
                    data.push(parseInt(data[data.length-1]) + (1))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p5
                    for(var t=0; t<diff; t+=60){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p5 - events[i].returnValues.p5
                    for(var t=0; t<diff; t+=60){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }
        


        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(yVal)});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_metadata_transaction_count_interval_figure(events){
        return events.length
    }






    show_withdraw_amount_data_chart(e5_chart_data){
        var events = e5_chart_data['withdraw']
        if(events.length != 0){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Withdrawn Ether', 'details':`The total amount of ether thats been withdrawn from the E5 over time.`, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_withdraw_amount_data_points(events), 'interval':110, 'hide_label': true})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Y-Axis: Total Withdrawn Ether', 'details':'X-Axis: Time', 'size':'s'})}
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_withdraw_amount_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i == 0){
                    data.push(bigInt(events[i].returnValues.p5))
                }else{
                    data.push(bigInt(data[data.length-1]).add(bigInt(events[i].returnValues.p5)))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p6
                    for(var t=0; t<diff; t+=60){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p6 - events[i].returnValues.p6
                    for(var t=0; t<diff; t+=60){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }

        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        var largest_number = this.get_withdraw_amount_interval_figure(events)
        var recorded = false
        for(var i = 0; i < noOfDps; i++) {
            yVal = parseInt(bigInt(data[factor * xVal]).multiply(100).divide(largest_number))
            // yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null && data[factor * xVal] != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0 && !recorded){
                    recorded = true
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(data[factor * xVal])});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_withdraw_amount_interval_figure(events){
        var data = []
        events.forEach(event => {
            data.push(bigInt(event.returnValues.p5))
        });
        var largest = Math.max.apply(Math, data);
        return largest
    }








    show_deposit_amount_data_chart(e5_chart_data){
        var events = e5_chart_data['transaction']
        if(events.length != 0){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Deposited Ether', 'details':`The total amount of ether thats been deposited into the E5 over time.`, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_deposit_amount_data_points(events), 'interval':110, 'hide_label': true})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Y-Axis: Total Deposited Ether', 'details':'X-Axis: Time', 'size':'s'})}
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_deposit_amount_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i == 0){
                    data.push(bigInt(events[i].returnValues.p6))
                }else{
                    data.push(bigInt(data[data.length-1]).add(bigInt(events[i].returnValues.p6)))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p8
                    for(var t=0; t<diff; t+=60){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p8 - events[i].returnValues.p8
                    for(var t=0; t<diff; t+=60){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }


        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        var largest_number = this.get_deposit_amount_interval_figure(events)
        var recorded = false;
        for(var i = 0; i < noOfDps; i++) {
            yVal = parseInt(bigInt(data[factor * xVal]).multiply(100).divide(largest_number))
            // yVal = data[factor * xVal]
            // yVal = data[i]

            
            if(yVal != null && data[factor * xVal] != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0 && !recorded){
                    recorded = true
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(data[factor * xVal])});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
        }

        return dps
    }

    get_deposit_amount_interval_figure(events){
        var data = []
        events.forEach(event => {
            data.push(bigInt(event.returnValues.p6))
        });
        var largest = Math.max.apply(Math, data);
        return largest
    }


    




    show_transaction_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['transaction']
        var amount = events.length
        if(events.length != 0){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Transaction Runs', 'details':`Chart containing the total number of E5 runs made over time.`, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_transaction_transaction_count_data_points(events), 'interval':this.get_transaction_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Y-Axis: Total Runs Made', 'details':'X-Axis: Time', 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Total Runs', 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': 'runs', })}
                    </div>
                    {/* {this.render_detail_item('0')} */}
                </div>
            )
        }
    }

    get_transaction_transaction_count_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i==0){
                    data.push(1)
                }
                else{
                    data.push(parseInt(data[data.length-1]) + (1))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p8
                    for(var t=0; t<diff; t+=60){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p8 - events[i].returnValues.p8
                    for(var t=0; t<diff; t+=60){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }
        


        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(yVal)});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_transaction_transaction_count_interval_figure(events){
        return events.length
    }




















    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }

    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var size = this.props.screensize
        var width = size == 'm' ? this.props.app_state.width/2 : this.props.app_state.width
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data}  theme={this.props.theme} width={width}/>
            </div>
        )

    }


    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
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
            return number_with_commas(num) + ' yr' + s;
        }
    }


    enabled_disabled(value){
        if(value == 1){
            return 'enabled'
        }
        return 'disabled'
    }

}




export default E5DetailsSection;