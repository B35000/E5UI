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

class ViewJobRequestContractPage extends Component {
    
    state = {
        selected: 0, contract_data:{}, type:this.props.app_state.loc['1647']/* 'view-job-request-contract' */, id:makeid(8),
        entered_indexing_tags:[this.props.app_state.loc['1648']/* 'view' */, this.props.app_state.loc['3']/* 'contract' */, this.props.app_state.loc['253']/* 'contractor' */, this.props.app_state.loc['1649']/* 'response' */], view_application_contract_title_tags_object: this.get_view_application_contract_title_tags_object()
    };

    get_view_application_contract_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1650']/* 'view-contract' */], [1]
            ],
        };
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.view_application_contract_title_tags_object} tag_size={'l'} when_tags_updated={this.when_view_application_contract_title_tags_object_updated.bind(this)} theme={this.props.theme}/>

                {this.render_everything()}

            </div>
        )
    }

    when_view_application_contract_title_tags_object_updated(tag_obj){
        this.setState({view_application_contract_title_tags_object: tag_obj})
    }



    render_everything(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_contract_part()}
                    {this.render_entered_contracts_data_part()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_contract_part()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_entered_contracts_data_part()}
                        <div style={{height:10}}/>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_contract_part()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_entered_contracts_data_part()}
                        <div style={{height:10}}/>
                        {this.render_empty_views(3)}
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

    render_contract_part(){
        if(this.state.contract_data['data'] != null){
            var item = this.state.contract_data
            return(
                <div>
                    {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'13px','text':this.props.app_state.loc['1651']/* 'The contractors contract is shown below.' */})}
                    {this.render_contracts_data()}
                </div>
            )
        }
        
    }

    render_entered_contracts_data_part(){
        if(this.state.contract_data['data'] != null){
            var item = this.state.contract_data
            return(
                <div>
                    {this.show_entered_contract_data()}
                    <div style={{height:10}}/>
                    {this.render_enter_contract_button()}
                    <div style={{height:20}}/>
                </div>
            )
        }
    }

    show_entered_contract_data(){
        var object = this.state.contract_data
        var expiry_time_in_seconds = object['entry_expiry']
        var time_to_expiry =  expiry_time_in_seconds - Math.floor(new Date() / 1000);

        if(expiry_time_in_seconds != 0 && time_to_expiry > 0){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':'Until: '+(new Date(expiry_time_in_seconds*1000)), 'title':this.props.app_state.loc['1652']/* 'Entry Exipry Time' */})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'size':'l', 'details':''+(this.get_time_diff(time_to_expiry)), 'title':this.props.app_state.loc['1653']/* 'Time remaining' */})}
                </div>
            )
        }
        else if(expiry_time_in_seconds != 0 && time_to_expiry < 0){
            return(
                <div>
                    {this.render_detail_item('4', {'text':this.props.app_state.loc['1654']/* 'Your time in the contract has exipred.' */, 'textsize':'13px', 'font':this.props.app_state.font})}
                </div>
            )
        }
        else{
            return(
                <div>
                    {this.render_detail_item('4', {'text':this.props.app_state.loc['1663']/* 'Youre not part of the contract' */, 'textsize':'13px', 'font':this.props.app_state.font})}
                </div>
            )
        }
    }


    render_enter_contract_button(){
        return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1664']/* 'Enter Contract' */, 'details':this.props.app_state.loc['1665']/* 'Enter the contract sent from the contractor' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <div onClick={()=> this.enter_contract()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['1666']/* 'Enter Contract' */, 'action':''},)}
                    </div>
                </div>
            )
    }


    enter_contract(){
        this.props.add_job_request_action_to_stack(this.state)
    }


    render_contracts_data(){
        var background_color = this.props.theme['card_background_color']
        var item = this.get_contract_details_data()
        var object = this.state.contract_data

        return(
            <div style={{ 'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px'}}>
                <div style={{ width:'100%', padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'details':'Access Rights', 'title':this.get_access_rights_status(object['access_rights_enabled'])})}
                    <div style={{height: 10}}/>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['default_vote_bounty_split_proportion'])}
                    <div style={{ height: 10 }} />
                    {this.render_detail_item('3', item['default_consensus_majority_limit'])}
                    <div style={{ height: 10 }} />
                    {this.render_detail_item('3', item['default_voter_weight_exchange'])}

                    <div style={{ height: 10 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['voter_weight_balance']['title'], 'number':item['voter_weight_balance']['n'], 'relativepower':item['voter_weight_balance']['relativepower']})}>
                        {this.render_detail_item('2', item['voter_weight_balance'])}
                    </div>

                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['default_minimum_end_vote_bounty_amount']['title'], 'number':item['default_minimum_end_vote_bounty_amount']['n'], 'relativepower':item['default_minimum_end_vote_bounty_amount']['relativepower']})}>
                        {this.render_detail_item('2', item['default_minimum_end_vote_bounty_amount'])}
                    </div>

                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['default_minimum_spend_vote_bounty_amount']['title'], 'number':item['default_minimum_spend_vote_bounty_amount']['n'], 'relativepower':item['default_minimum_spend_vote_bounty_amount']['relativepower']})}>
                        {this.render_detail_item('2', item['default_minimum_spend_vote_bounty_amount'])}
                    </div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['default_proposal_expiry_duration_limit'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['max_enter_contract_duration'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['auto_wait_for_all_proposals_for_all_voters'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['proposal_modify_expiry_duration_limit'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['can_modify_contract_as_moderator'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['can_extend_enter_contract_at_any_time'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['maximum_proposal_expiry_submit_expiry_time_difference'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['bounty_limit_type'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['contract_force_exit_enabled'])}
                    
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', item['entry_fees'])}
                    <div style={{height: 10}}/>
                    {this.render_buy_token_uis(object['data'][2], object['data'][3], object['data'][4])}


                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'details':this.props.app_state.loc['1646c']/* 'Below is the End and Spend balance of the contract.' */, 'title':this.props.app_state.loc['1646b']/* 'Contracts Balance.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['end_balance']['title'], 'number':item['end_balance']['n'], 'relativepower':item['end_balance']['relativepower']})}>
                        {this.render_detail_item('2', item['end_balance'])}
                    </div>

                    <div style={{ height: 10 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['spend_balance']['title'], 'number':item['spend_balance']['n'], 'relativepower':item['spend_balance']['relativepower']})}>
                        {this.render_detail_item('2', item['spend_balance'])}
                    </div>

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                    <div style={{height: 20}}/>
                </div>
            </div>
        )
    }

    get_contract_details_data(){
        var object = this.state.contract_data
        var tags = object['ipfs'] == null ? ['Contract'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Contract ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var contract_config = object['data'][1]
        var auto_wait = contract_config[8] == 0 ? this.props.app_state.loc['540']/* 'false' */ : this.props.app_state.loc['541']/* 'true' */
        var can_modify_contract_as_moderator = contract_config[28] == 0 ? this.props.app_state.loc['540']/* 'false' */ : this.props.app_state.loc['541']/* 'true' */
        var can_extend_enter_contract_at_any_time = contract_config[29] == 0 ? this.props.app_state.loc['540']/* 'false' */ : this.props.app_state.loc['541']/* 'true' */
        var bounty_limit_type = contract_config[37] == 0 ? this.props.app_state.loc['87']/* 'relative' */ : this.props.app_state.loc['88']/* 'absolute' */
        var contract_force_exit_enabled = contract_config[38] == 0 ? this.props.app_state.loc['90']/* 'disabled' */: this.props.app_state.loc['89']/* 'enabled' */
        var consensus_majority = contract_config[7] == 0 ? bigInt('1e18') : contract_config[7]
        var voter_weight_target_name = this.get_exchange_name_from_id(contract_config[33], object)
        var voter_weight_balance = this.get_voter_weight_balance(contract_config[33], object)
        return{
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{ 'style':'l', 'title':this.props.app_state.loc['1612']/* 'Block ID' */, 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['27']/* 'block' */, },

            'default_vote_bounty_split_proportion': {'title':this.format_proportion(contract_config[1]), 'details':this.props.app_state.loc['1613']/* 'Vote Bounty Split Proportion' */, 'size':'l'},

            'default_minimum_end_vote_bounty_amount':{'style':'l','title':this.props.app_state.loc['1614']/* 'Minimum End Bounty Amount' */, 'subtitle':this.format_power_figure(contract_config[4]), 'barwidth':this.calculate_bar_width(contract_config[4]), 'number':this.format_account_balance_figure(contract_config[4]), 'relativepower':this.props.app_state.loc['483']/* 'tokens' */, 'n':contract_config[4]},

            'default_minimum_spend_vote_bounty_amount':{'style':'l','title':this.props.app_state.loc['80']/* 'Minimum Spend Bounty Amount' */, 'subtitle':this.format_power_figure(contract_config[10]), 'barwidth':this.calculate_bar_width(contract_config[10]), 'number':this.format_account_balance_figure(contract_config[10]), 'relativepower':this.props.app_state.loc['483']/* 'tokens' */, 'n':contract_config[10]},

            'default_proposal_expiry_duration_limit': {'title':this.get_time_diff(contract_config[5]), 'details':this.props.app_state.loc['71']/* 'Proposal Expiry Duration Limit' */, 'size':'l'},

            'max_enter_contract_duration': {'title':this.get_time_diff(contract_config[6]), 'details':this.props.app_state.loc['1615']/* 'Max Enter Contract Duration' */, 'size':'l'},

            'auto_wait_for_all_proposals_for_all_voters': {'title':auto_wait, 'details':this.props.app_state.loc['1616']/* 'Auto Wait For All Proposals For All Voters' */, 'size':'l'},

            'proposal_modify_expiry_duration_limit': {'title':this.get_time_diff(contract_config[27]), 'details':this.props.app_state.loc['1617']/* 'Proposal Modify Expiry Duration Limit' */, 'size':'l'},

            'can_modify_contract_as_moderator': {'title':can_modify_contract_as_moderator, 'details':this.props.app_state.loc['1618']/* 'Can Modify Contract As Moderator' */, 'size':'l'},

            'can_extend_enter_contract_at_any_time': {'title':can_extend_enter_contract_at_any_time, 'details':this.props.app_state.loc['1619']/* 'Can Extend Enter Contract At Any Time' */, 'size':'l'},

            'maximum_proposal_expiry_submit_expiry_time_difference': {'title':this.get_time_diff(contract_config[36]), 'details':this.props.app_state.loc['1620']/* 'Maximum Proposal Expiry Submit Expiry Time Difference' */, 'size':'l'},

            'bounty_limit_type': {'title':bounty_limit_type, 'details':this.props.app_state.loc['1621']/* 'Bounty Limit Type' */, 'size':'l'},

            'contract_force_exit_enabled': {'title':contract_force_exit_enabled, 'details':this.props.app_state.loc['1622']/* 'Contract Force Exit' */, 'size':'l'},

            'entry_fees': {'title':this.props.app_state.loc['1623']/* 'Entry Fees' */, 'details':object['data'][2].length+this.props.app_state.loc['1624']/* ' tokens used' */, 'size':'l'},

            'default_consensus_majority_limit': { 'title': this.format_proportion(consensus_majority), 'details':this.props.app_state.loc['1625'] /* 'Consensus Majority Proportion' */, 'size': 'l' },

            'default_voter_weight_exchange': { 'title': voter_weight_target_name, 'details': this.props.app_state.loc['1626']/* 'Voter Weight Exchange' */, 'size': 'l' },

            'voter_weight_balance': { 'style': 'l', 'title': this.props.app_state.loc['1627']/* 'Voter Weight Balance' */, 'subtitle': this.format_power_figure(voter_weight_balance), 'barwidth': this.get_number_width(voter_weight_balance), 'number': ` ${this.format_account_balance_figure(voter_weight_balance)}`, 'barcolor': '', 'relativepower': this.props.app_state.loc['1628']/* `units` */, 'n':voter_weight_balance },

            'end_balance': { 'style': 'l', 'title': this.props.app_state.loc['377'],/* 'End Balance' */ 'subtitle': this.format_power_figure(object['end_balance']), 'barwidth': this.get_number_width(object['end_balance']), 'number': `${this.format_account_balance_figure(object['end_balance'])}`, 'barcolor': '', 'relativepower': `END`, 'n': object['end_balance']},

            'spend_balance': { 'style': 'l', 'title': this.props.app_state.loc['378']/* 'Spend Balance' */, 'subtitle': this.format_power_figure(object['spend_balance']), 'barwidth': this.get_number_width(object['spend_balance']), 'number': ` ${this.format_account_balance_figure(object['spend_balance'])}`, 'barcolor': '', 'relativepower': `SPEND`, 'n':object['spend_balance']},
        }
    }

    get_exchange_name_from_id(id, object){
        if(id == 0) return this.props.app_state.loc['808']/* 'None' */
        return this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+id]
    }

    get_voter_weight_balance(id, object){
        if(id == 0) return this.is_sender_part_of_contract(object) ? 1 : 0
        if(this.props.app_state.created_token_object_mapping[object['e5']] != null){
            var voter_exchange = this.props.app_state.created_token_object_mapping[object['e5']][id]
            if(voter_exchange != null){
                var balance = voter_exchange['balance']
                return balance
            }
        }
        return this.is_sender_part_of_contract(object) ? 1 : 0
    }

    is_sender_part_of_contract(object){
        var expiry_time_in_seconds = object['entry_expiry']
        var time_to_expiry = expiry_time_in_seconds - Math.floor(new Date() / 1000);

        if ((expiry_time_in_seconds != 0 && time_to_expiry > 0) && object['id'] != 2) {
            return true
        }
        return false;
    }

    get_access_rights_status(value){
        if(value == true){
            return this.props.app_state.loc['1629']/* 'Enabled' */
        }else{
            return this.props.app_state.loc['1630']/* 'Disabled' */
        }
    }

    render_buy_token_uis(buy_tokens, buy_amounts, buy_depths){
        var bt = [].concat(buy_tokens)
        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                    {bt.map((item, index) => (
                        <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item], 'number':buy_amounts[index], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                            {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item], 'subtitle':'depth:'+buy_depths[index], 'barwidth':this.calculate_bar_width(buy_amounts[index]), 'number':this.format_account_balance_figure(buy_amounts[index]), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                        </li>
                    ))}
                </ul>
            </div>
            
        )
    }













    set_object(item){
        if(this.state.contract_data['id'] != item['id']){
            this.setState({
                selected: 0, contract_data:{}, type:this.props.app_state.loc['1647']/* 'view-job-request-contract' */, id:makeid(8),
                entered_indexing_tags:[this.props.app_state.loc['1648']/* 'view' */, this.props.app_state.loc['contract']/* 'contract' */, this.props.app_state.loc['253']/* 'contractor' */, this.props.app_state.loc['1649']/* 'response' */], view_application_contract_title_tags_object: this.get_view_application_contract_title_tags_object()
            })
        }
        this.setState({contract_data:item, e5: item['e5']})
    }






    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var size = this.props.screensize
        var width = size == 'm' ? this.props.app_state.width/2 : this.props.app_state.width
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data}  theme={this.props.theme} width={width}/>
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

    get_number_width(number){
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
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

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
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


}




export default ViewJobRequestContractPage;