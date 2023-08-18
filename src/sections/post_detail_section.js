import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';

import Letter from './../assets/letter.png'; 
import EthereumTestnet from './../assets/ethereum_testnet.png';
import EndImg from './../assets/end_token_icon.png';
import SpendImg from './../assets/spend_token_icon.png';
import E35EndImg from './../assets/e35_end_token.png';
import E35SpendImg from './../assets/e35_spend_token.png';
import End35 from './../assets/end35.png';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

var bigInt = require("big-integer");


function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



class PostDetailSection extends Component {
    
    state = {
        selected: 0,
        navigate_view_ethers_list_detail_tags_object: this.get_navigate_view_ethers_list_detail_tags(),
        navigate_view_end_list_detail_tags_object: this.get_navigate_view_end_list_detail_tags(),
        navigate_view_spend_list_detail_tags_object: this.get_navigate_view_spend_list_detail_tags(),
        navigate_view_e5_list_detail_tags_object: this.get_navigate_view_e5_list_detail_tags(),
        navigate_view_jobs_list_detail_tags_object: this.get_navigate_view_jobs_list_detail_tags(),
        navigate_view_contract_list_detail_tags_object: this.get_navigate_view_contract_list_detail_tags(),
        navigate_view_subscriptions_list_detail_tags_object: this.get_navigate_view_subscriptions_list_detail_tags(),
        navigate_view_post_list_detail_tags_object: this.get_navigate_view_post_list_detail_tags_object_tags(),
        navigate_view_channel_list_detail_tags: this.get_navigate_view_channel_list_detail_tags()
    };

    get_navigate_view_ethers_list_detail_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['or','',0], ['e','details','transactions'],[0]
          ],
        }
    }

    get_navigate_view_end_list_detail_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['or','',0], ['e','details','transactions'],[0]
          ],
        }
    }


    get_navigate_view_spend_list_detail_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['or','',0], ['e','details','transactions'],[0]
          ],
        }
    }

    get_navigate_view_e5_list_detail_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['or','',0], ['e','details','transactions'],[0]
          ],
        }
    }

    get_navigate_view_jobs_list_detail_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['or','',0], ['e','details','responses'],[0]
          ],
        }
    }

    get_navigate_view_contract_list_detail_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e','details','transactions'],[1]
          ],
        }
    }

    get_navigate_view_subscriptions_list_detail_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e','details','transactions'],[1]
          ],
        }
    }

    get_navigate_view_post_list_detail_tags_object_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e','metadata','responses'],[1]
          ],
        }
    }

     get_navigate_view_channel_list_detail_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e','metadata','activity'],[1]
          ],
        }
    }




    render(){
        return(
            <div>
                {this.render_post_detail_object()}
            </div>
        )
    }

    render_post_detail_object(){
        var selected_page = this.props.page;
        if(selected_page == '?'){
            var selected_tag = this.props.work_page_tags_object['i'].active
            if(selected_tag == 'jobs' || selected_tag == 'e'){
                return(
                <div>{this.render_jobs_list_detail()}</div>
                )
            }
            else if(selected_tag == 'contracts' ){
                return(
                <div>{this.render_contracts_list_detail()}</div>
                )
            }
            else if(selected_tag == 'proposals' ){
                return(
                <div>{this.render_proposal_list_detail()}</div>
                )
            }
            else if(selected_tag == 'subscriptions' ){
                return(
                <div>{this.render_subscription_list_detail()}</div>
                )
            }
        }
        else if(selected_page == 'e'){
            var selected_tag = this.props.explore_page_tags_object['i'].active
            if(selected_tag == 'E5s' || selected_tag == 'e'){
                return(
                <div>{this.render_E5s_list_detail()}</div>
                )
            }
            else if(selected_tag == 'posts' ){
                return(
                <div>{this.render_posts_list_detail()}</div>
                )
            }
            else if(selected_tag == 'channels' ){
                return(
                <div>{this.render_channels_list_detail()}</div>
                )
            }
        }
        else if(selected_page == 'w'){
            var selected_tag = this.props.wallet_page_tags_object['i'].active
            var selected_item = this.props.wallet_page_tags_object['e'][2][0];
            var selected_option_name = this.props.wallet_page_tags_object['e'][1][selected_item];
            if(selected_option_name == 'ethers ⚗️' || selected_option_name == 'e'){
                return(
                <div>{this.render_ethers_list_detail()}</div>
                )
            }
            else if(selected_option_name == 'ends ☝️' ){
                return(
                <div>{this.render_ends_list_detail()}</div>
                )
            }
            else if(selected_option_name == 'spends 🫰' ){
                return(
                <div>{this.render_spends_list_detail()}</div>
                )
            }
        }
    }


    render_jobs_list_detail(){
        if(this.props.selected_job_post_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_jobs_details_section()}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 20px 0px', 'max-width':'470px'}}>
                        <Tags page_tags_object={this.state.navigate_view_jobs_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_jobs_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
    }

    when_navigate_view_jobs_list_detail_tags_object_updated(tag_group){
        this.setState({navigate_view_jobs_list_detail_tags_object: tag_group})
    }

    render_jobs_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_jobs_list_detail_tags_object, this.state.navigate_view_jobs_list_detail_tags_object['i'].active)

        if(selected_item == 'details' || selected_item == 'e'){
            return(
                <div>
                    {this.render_job_posts_main_details_section()}
                </div>
            )
        }else if(selected_item == 'responses'){
            return(
                <div>
                    {this.render_job_post_responses()}
                </div>
            )
            
        }
    }

    render_job_posts_main_details_section(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-70
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        var object = this.get_job_items()[this.props.selected_job_post_item];
        var item = this.get_job_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects

        return(
            <div style={{ width:'99%', 'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 20px 10px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    {this.render_detail_item('0')}
                    {items.map((item, index) => (
                        <div key={index}>
                            {this.render_detail_item(item['type'], item['data'])} 
                            <div style={{height:10}}/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }


    get_job_details_data(object){
        var tags = object['ipfs'] == null ? ['Job'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Job ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{'style':'l', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`block ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    get_job_items(){
        var selected_option_name = this.get_selected_item(this.props.work_page_tags_object, this.props.work_page_tags_object['i'].active)

        if(this.props.work_page_tags_object['i'].active != 'jobs'){
            return this.props.app_state.created_jobs 
        }

        if(selected_option_name == 'all'){
            return this.props.app_state.created_jobs
        }
        else if(selected_option_name == 'viewed'){
            var my_viewed_jobs = []
            for(var i=0; i<this.props.viewed_jobs.length; i++){
                my_viewed_jobs.push(this.props.app_state.created_jobs[this.props.viewed_jobs[i]])
            }
            return my_viewed_jobs
        }
        else {
            var my_jobs = []
            var myid = this.props.app_state.user_account_id
            for(var i = 0; i < this.props.app_state.created_jobs.length; i++){
                var post_author = this.props.app_state.created_jobs[i]['event'].returnValues.p5
                if(post_author.toString() == myid.toString()){
                    my_jobs.push(this.props.app_state.created_jobs[i])
                }
            }
            return my_jobs
        }
    }


    render_job_post_responses(){

    }







    render_contracts_list_detail(){
        if(this.props.selected_contract_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_contract_details_section()}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 20px 0px', 'max-width':'470px'}}>
                        <Tags page_tags_object={this.state.navigate_view_contract_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_contract_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
    }

    when_navigate_view_contract_list_detail_tags_object_updated(tag_obj){
        this.setState({navigate_view_contract_list_detail_tags_object: tag_obj})
    }


    render_contract_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_contract_list_detail_tags_object, this.state.navigate_view_contract_list_detail_tags_object['i'].active)

        if(selected_item == 'details'){
            return(
                <div>
                    {this.render_contracts_main_details_section()}
                </div>
            )
        }else if(selected_item == 'transactions'){
            return(
                <div>
                    {this.render_contracts_logs()}
                </div>
            )
            
        }
    }

    render_contracts_main_details_section(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-70
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        var item = this.get_contract_details_data()
        var object = this.get_contract_items()[this.props.selected_contract_item]
        return(
            <div style={{ width:'99%', 'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 20px 10px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['age'])}
                    </div>

                    {this.render_detail_item('3', item['default_vote_bounty_split_proportion'])}

                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['default_minimum_end_vote_bounty_amount'])}
                    </div>

                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
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
                    <div style={{height: 10}}/>
                </div>
            </div>
        )
    }


    get_contract_details_data(){
        var object = this.get_contract_items()[this.props.selected_contract_item]
        var tags = object['ipfs'] == null ? ['Contract'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Contract ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var contract_config = object['data'][1]
        var auto_wait = contract_config[8] == 0 ? 'false' : 'true'
        var can_modify_contract_as_moderator = contract_config[28] == 0 ? 'false' : 'true'
        var can_extend_enter_contract_at_any_time = contract_config[29] == 0 ? 'false' : 'true'
        var bounty_limit_type = contract_config[37] == 0 ? 'relative' : 'absolute'
        var contract_force_exit_enabled = contract_config[38] == 0 ? 'disabled': 'enabled'
        return{
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{ 'style':'l', 'title':'Block ID', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':'block', },

            'default_vote_bounty_split_proportion': {'title':this.format_proportion(contract_config[1]), 'details':'Vote Bounty Split Proportion', 'size':'l'},

            'default_minimum_end_vote_bounty_amount':{'style':'l','title':'Minimum End Bounty Amount', 'subtitle':this.format_power_figure(contract_config[4]), 'barwidth':this.calculate_bar_width(contract_config[4]), 'number':this.format_account_balance_figure(contract_config[4]), 'relativepower':'tokens'},

            'default_minimum_spend_vote_bounty_amount':{'style':'l','title':'Minimum Spend Bounty Amount', 'subtitle':this.format_power_figure(contract_config[10]), 'barwidth':this.calculate_bar_width(contract_config[10]), 'number':this.format_account_balance_figure(contract_config[10]), 'relativepower':'tokens'},

            'default_proposal_expiry_duration_limit': {'title':this.get_time_diff(contract_config[5]), 'details':'Proposal Expiry Duration Limit', 'size':'l'},

            'max_enter_contract_duration': {'title':this.get_time_diff(contract_config[6]), 'details':'Max Enter Contract Duration', 'size':'l'},

            'auto_wait_for_all_proposals_for_all_voters': {'title':auto_wait, 'details':'Auto Wait For All Proposals For All Voters', 'size':'l'},

            'proposal_modify_expiry_duration_limit': {'title':this.get_time_diff(contract_config[27]), 'details':'Proposal Modify Expiry Duration Limit', 'size':'l'},

            'can_modify_contract_as_moderator': {'title':can_modify_contract_as_moderator, 'details':'Can Modify Contract As Moderator', 'size':'l'},

            'can_extend_enter_contract_at_any_time': {'title':can_extend_enter_contract_at_any_time, 'details':'Can Extend Enter Contract At Any Time', 'size':'l'},

            'maximum_proposal_expiry_submit_expiry_time_difference': {'title':this.get_time_diff(contract_config[36]), 'details':'Maximum Proposal Expiry Submit Expiry Time Difference', 'size':'l'},

            'bounty_limit_type': {'title':bounty_limit_type, 'details':'Bounty Limit Type', 'size':'l'},

            'contract_force_exit_enabled': {'title':contract_force_exit_enabled, 'details':'Contract Force Exit', 'size':'l'},

            'entry_fees': {'title':'Entry Fees', 'details':object['data'][2].length+' tokens used', 'size':'l'},
        }
    }


    get_contract_items(){
        var selected_option_name = this.get_selected_item(this.props.work_page_tags_object, this.props.work_page_tags_object['i'].active)

        if(this.props.work_page_tags_object['i'].active != 'contracts'){
            return this.props.app_state.created_contracts.reverse()
        }

        if(selected_option_name == 'all'){
            return this.props.app_state.created_contracts.reverse()
        }
        else if(selected_option_name == 'viewed'){
            var my_viewed_contracts = []
            for(var i=0; i<this.props.viewed_contracts.length; i++){
                my_viewed_contracts.push(this.props.app_state.created_contracts[this.props.viewed_contracts[i]])
            }
            return my_viewed_contracts.reverse()
        }
        else if(selected_option_name == 'received'){
            return this.props.app_state.created_contracts.reverse()
        }
        else {
            var my_contracts = []
            var myid = this.props.app_state.user_account_id
            for(var i = 0; i < this.props.app_state.created_contracts.length; i++){
                var post_author = this.props.app_state.created_contracts[i]['event'].returnValues.p3
                if(post_author.toString() == myid.toString()){
                    my_contracts.push(this.props.app_state.created_contracts[i])
                }else{
                    console.log('sender not post author: author->'+post_author+', sender id->'+myid)
                }
            }
            return my_contracts.reverse()
        }
    }

    render_buy_token_uis(buy_tokens, buy_amounts, buy_depths){
        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                    {buy_tokens.map((item, index) => (
                        <li style={{'padding': '1px'}}>
                            {this.render_detail_item('2', {'style':'l','title':'Token ID: '+item, 'subtitle':'depth: '+buy_depths[index], 'barwidth':this.calculate_bar_width(buy_amounts[index]), 'number':this.format_account_balance_figure(buy_amounts[index]), 'relativepower':'tokens'})}
                        </li>
                    ))}
                </ul>
            </div>
            
        )
    }


    render_contracts_logs(){

    }



    render_proposal_list_detail(){

    }


    render_subscription_list_detail(){
        if(this.props.selected_subscription_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_subscription_details_section()}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 20px 0px', 'max-width':'470px'}}>
                        <Tags page_tags_object={this.state.navigate_view_subscriptions_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_subscriptions_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
    }

    when_navigate_view_subscriptions_list_detail_tags_object_updated(tag_obj){
        this.setState({navigate_view_subscriptions_list_detail_tags_object: tag_obj})
    }

    render_subscription_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_subscriptions_list_detail_tags_object, this.state.navigate_view_subscriptions_list_detail_tags_object['i'].active)

        if(selected_item == 'details'){
            return(
                <div>
                    {this.render_subscription_main_details_section()}
                </div>
            )
        }else if(selected_item == 'transactions'){
            return(
                <div>
                    {this.render_subscription_logs()}
                </div>
            )
            
        }
    }

    render_subscription_main_details_section(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-70
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        var item = this.get_subscription_details_data()
        var object = this.get_subscription_items()[this.props.selected_subscription_item]
        return(
            <div style={{ width:'99%', 'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 20px 10px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['target_authority_id'])}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['minimum_buy_amount'])}
                    </div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['can_cancel_subscription'])}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['maximum_buy_amount'])}
                    </div>
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['minimum_cancellable_balance_amount'])}
                    </div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['time_unit'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['subscription_beneficiary'])}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', item['entry_fees'])}
                    <div style={{height: 10}}/>
                    {this.render_buy_token_uis(object['data'][2], object['data'][3], object['data'][4])}
                    <div style={{height: 10}}/>
                </div>
            </div>
        )
    }

    get_subscription_details_data(){
        var object = this.get_subscription_items()[this.props.selected_subscription_item]
        var tags = object['ipfs'] == null ? ['Subscription'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Subscription ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var subscription_config = object['data'][1]
        var can_cancel_subscription = subscription_config[2] == 0 ? 'non-cancellable': 'cancellable'
        var time_unit = subscription_config[5] == 0 ? 60*53 : subscription_config[5]
        var subscription_beneficiary = subscription_config[6] == 0 ? subscription_config[0] : subscription_config[6]
        return{
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            
            'age':{ 'style':'l', 'title':'Block ID', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':'block', },
            
            'target_authority_id': {'title':subscription_config[0], 'details':'Authority ID', 'size':'l'},
            
            'minimum_buy_amount':{ 'style':'l', 'title':'Minimum Buy Amount', 'subtitle':'??', 'barwidth':this.get_number_width(subscription_config[1]), 'number':`${number_with_commas(subscription_config[1])}`, 'barcolor':'', 'relativepower':'time-units', },

            'can_cancel_subscription': {'title':can_cancel_subscription, 'details':'Subscription Type', 'size':'l'},

            'maximum_buy_amount':{ 'style':'l', 'title':'Maximum Buy Amount', 'subtitle':'??', 'barwidth':this.get_number_width(subscription_config[3]), 'number':`${number_with_commas(subscription_config[3])}`, 'barcolor':'', 'relativepower':'time-units', },

            'minimum_cancellable_balance_amount':{ 'style':'l', 'title':'Maximum Buy Amount', 'subtitle':'??', 'barwidth':this.get_number_width(subscription_config[4]), 'number':`${number_with_commas(subscription_config[4])}`, 'barcolor':'', 'relativepower':'time-units', },

            'time_unit': {'title':this.get_time_diff(time_unit), 'details':'Time Unit', 'size':'l'},

            'subscription_beneficiary': {'title':subscription_beneficiary, 'details':'Subscription Beneficiary', 'size':'l'},

            'entry_fees': {'title':'Entry Fees', 'details':object['data'][2].length+' tokens used', 'size':'l'},
        }
    }

    get_subscription_items(){
        // var items = this.props.app_state.created_subscriptions
        // return items.reverse()

        var selected_option_name = this.get_selected_item(this.props.work_page_tags_object, this.props.work_page_tags_object['i'].active)

        if(this.props.work_page_tags_object['i'].active != 'subscriptions'){
            return this.props.app_state.created_subscriptions.reverse()
        }

        if(selected_option_name == 'all'){
            return this.props.app_state.created_subscriptions.reverse()
        }
        else if(selected_option_name == 'viewed'){
            var my_viewed_subscriptions = []
            for(var i=0; i<this.props.viewed_subscriptions.length; i++){
                my_viewed_subscriptions.push(this.props.app_state.created_subscriptions[this.props.viewed_subscriptions[i]])
            }
            return my_viewed_subscriptions.reverse()
        }
        else if(selected_option_name == 'paid'){
            return this.props.app_state.created_subscriptions.reverse()
        }
        else {
            var my_subscriptions = []
            var myid = this.props.app_state.user_account_id
            for(var i = 0; i < this.props.app_state.created_subscriptions.length; i++){
                var post_author = this.props.app_state.created_subscriptions[i]['event'] == null ? 0 : this.props.app_state.created_subscriptions[i]['event'].returnValues.p3
                if(post_author.toString() == myid.toString()){
                    my_subscriptions.push(this.props.app_state.created_subscriptions[i])
                }else{
                    console.log('sender not post author: author->'+post_author+', sender id->'+myid)
                }
            }
            return my_subscriptions.reverse()
        }
    }

    render_subscription_logs(){

    }


    //#region E5 list data
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
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 20px 0px', 'max-width':'470px'}}>
                        <Tags page_tags_object={this.state.navigate_view_e5_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_e5_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
    }

    when_navigate_view_e5_list_detail_tags_object_updated(tag_group){
        this.setState({navigate_view_e5_list_detail_tags_object: tag_group})
    }

    render_e5_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_e5_list_detail_tags_object, this.state.navigate_view_e5_list_detail_tags_object['i'].active)

        if(selected_item == 'details' || selected_item == 'e'){
            return(
                <div>
                    {this.render_e5_main_details_section()}
                </div>
            )
        }else if(selected_item == 'transactions'){
            return(
                <div>
                    {this.render_e5_block_history_logs()}
                </div>
            )
            
        }
    }

    render_e5_main_details_section(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-70
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        var item = this.get_e5_details_data()
        return(
            <div style={{ width:'99%', 'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 20px 10px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    
                    {this.render_detail_item('7', item['label'])}
                    {this.render_detail_item('1', item['tags'])}
                    {this.render_detail_item('3', item['default_vote_bounty_split_proportion'])}
                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['default_end_minimum_contract_amount'])}
                    </div>

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['default_proposal_expiry_duration_limit'])}

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

                    {this.render_detail_item('5', {'text':'Open Wiki','action':'open_wiki'})}
                </div>
            </div>
        )
    }

    get_e5_data(){
        var data = []
        var contract_data = this.props.app_state.E15_contract_data
        var contract_id_data = this.props.app_state.contract_id_data
        for (let i = 0; i < contract_data.length; i++) {
            data.push({'data':contract_data[i], 'id':contract_id_data[i]})
        }
        return data
    }

    get_e5_details_data(){
        var obj = this.get_e5_data()[this.props.selected_e5_item]
        var img_obj = {'E35':End35}
        var contract_config = obj['data'][1]
        return{
            'label':{'header':obj['id'], 'subtitle':'Main Contract', 'size':'l', 'image': img_obj[obj['id']]},
            'tags':{'active_tags':['E5', 'Main', 'Contract'], 'index_option':'indexed'},
            
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

    render_e5_block_history_logs(){

    }




    render_posts_list_detail(){
        if(this.props.selected_post_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_post_details_section()}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 20px 0px', 'max-width':'470px'}}>
                        <Tags page_tags_object={this.state.navigate_view_post_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_post_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
    }

    when_navigate_view_post_list_detail_tags_object_updated(tag_obj){
        this.setState({navigate_view_post_list_detail_tags_object: tag_obj})
    }

    render_post_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_post_list_detail_tags_object, this.state.navigate_view_post_list_detail_tags_object['i'].active)

        if(selected_item == 'metadata'){
            return(
                <div>
                    {this.render_post_main_details_section()}
                </div>
            )
        }else if(selected_item == 'responses'){
            return(
                <div>
                    {this.render_post_responses()}
                </div>
            )
            
        }
    }

    render_post_main_details_section(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-70
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        var object = this.get_post_items()[this.props.selected_post_item];
        var item = this.get_post_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects
        return(
            <div style={{ width:'99%', 'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 20px 10px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    {this.render_detail_item('0')}
                    {items.map((item, index) => (
                        <div key={index}>
                            {this.render_detail_item(item['type'], item['data'])} 
                            <div style={{height:10}}/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    get_post_items(){
        var selected_option_name = this.get_selected_item(this.props.explore_page_tags_object, this.props.explore_page_tags_object['i'].active)

        if(this.props.explore_page_tags_object['i'].active != 'posts'){
            return this.props.app_state.created_posts 
        }

        if(selected_option_name == 'all'){
            return this.props.app_state.created_posts
        }
        else if(selected_option_name == 'viewed'){
            var my_viewed_posts = []
            for(var i=0; i<this.props.viewed_posts.length; i++){
                my_viewed_posts.push(this.props.app_state.created_posts[this.props.viewed_posts[i]])
            }
            return my_viewed_posts
        }
        else {
            var my_posts = []
            var myid = this.props.app_state.user_account_id
            for(var i = 0; i < this.props.app_state.created_posts.length; i++){
                var post_author = this.props.app_state.created_posts[i]['event'].returnValues.p5
                if(post_author.toString() == myid.toString()){
                    my_posts.push(this.props.app_state.created_posts[i])
                }
            }
            return my_posts
        }
    }

    get_post_details_data(object){
        var tags = object['ipfs'] == null ? ['Post'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{'style':'l', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`block ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    render_post_responses(){

    }

    render_channels_list_detail(){
        if(this.props.selected_channel_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_channel_details_section()}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 20px 0px', 'max-width':'470px'}}>
                        <Tags page_tags_object={this.state.navigate_view_channel_list_detail_tags} tag_size={'l'} when_tags_updated={this.when_navigate_view_channel_list_detail_tags_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
    }

    when_navigate_view_channel_list_detail_tags_updated(tag_obj){
        this.setState({navigate_view_channel_list_detail_tags: tag_obj})
    }

    render_channel_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_channel_list_detail_tags, this.state.navigate_view_channel_list_detail_tags['i'].active)

        if(selected_item == 'metadata'){
            return(
                <div>
                    {this.render_channel_main_details_section()}
                </div>
            )
        }else if(selected_item == 'activity'){
            return(
                <div>
                    {this.render_channel_activity()}
                </div>
            )
            
        }
    }


    render_channel_main_details_section(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-70
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        var object = this.get_channel_items()[this.props.selected_channel_item];
        var item = this.get_channel_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects
        return(
            <div style={{ width:'99%', 'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 20px 10px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    {this.render_detail_item('0')}
                    {items.map((item, index) => (
                        <div key={index}>
                            {this.render_detail_item(item['type'], item['data'])} 
                            <div style={{height:10}}/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    get_channel_items(){
        var selected_option_name = this.get_selected_item(this.props.explore_page_tags_object, this.props.explore_page_tags_object['i'].active)

        if(this.props.explore_page_tags_object['i'].active != 'channels'){
            return this.props.app_state.created_channels 
        }

        if(selected_option_name == 'all'){
            return this.props.app_state.created_channels
        }
        else if(selected_option_name == 'viewed'){
            var my_viewed_channels = []
            for(var i=0; i<this.props.viewed_channels.length; i++){
                my_viewed_channels.push(this.props.app_state.created_channels[this.props.viewed_channels[i]])
            }
            return my_viewed_channels
        }
        else {
            var my_channels = []
            var myid = this.props.app_state.user_account_id
            for(var i = 0; i < this.props.app_state.created_channels.length; i++){
                var channel_author = this.props.app_state.created_channels[i]['event'].returnValues.p5
                if(channel_author.toString() == myid.toString()){
                    my_channels.push(this.props.app_state.created_channels[i])
                }
            }
            return my_channels
        }
    }

    get_channel_details_data(object){
        var tags = object['ipfs'] == null ? ['Post'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{'style':'l', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`block ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    render_channel_activity(){

    }

    //#endregion



    render_ethers_list_detail(){
        if(this.props.selected_ether_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_ether_details_section()}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 20px 0px', 'max-width':'470px'}}>
                        <Tags page_tags_object={this.state.navigate_view_ethers_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_ethers_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
        
    }

    render_ether_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_ethers_list_detail_tags_object, this.state.navigate_view_ethers_list_detail_tags_object['i'].active)

        if(selected_item == 'details' || selected_item == 'e'){
            return(
                <div>
                    {this.render_ethers_main_details_section()}
                </div>
            )
        }else if(selected_item == 'transactions'){
            return(
                <div>
                    {this.render_block_history_logs()}
                </div>
            )
            
        }
        
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }

    render_ethers_main_details_section(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-70
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        var item = this.get_ethers_data()[this.props.selected_ether_item];
        return(
            <div style={{ width:'99%', 'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 20px 10px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    
                    {this.render_detail_item('7', item['banner-icon'])}
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 20}}/>
                    {this.render_detail_item('2', item['number_label_large'])}
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', item['chain_id'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['peer_count'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['network_type'])}
                    {this.render_detail_item('0')}

                    {/* {this.render_detail_item('3', item['gas_used_chart_data_label'])} */}
                    {/* {this.render_detail_item('6', item['gas_used_chart_data'])} */}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['gas_used_chart_data_average'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['highest_gas_consumed'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['lowest_gas_consumed'])}
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', item['transaction_count_chart_data_label'])}
                    {this.render_detail_item('6', item['transaction_count_chart_data'])}
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', item['gas_limit'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['base_fee_per_gas'])}
                    {this.render_detail_item('0')}
                    
                    <div style={{height:10}}/>
                    {this.render_detail_item('5', {'text':'Send Receive Ether', 'action': 'send_receive_ether'})}
                    <div style={{height:10}}/>
                    {/* {this.render_detail_item('5', {'text':'Open Wiki','action':'open_wiki'})} */}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    when_navigate_view_ethers_list_detail_tags_object_updated(tag_group){
        this.setState({navigate_view_ethers_list_detail_tags_object: tag_group})
    }

    get_ethers_data(){
        return [
            {
                'name': 'Ethereum Testnet',
                'symbol': 'ETHT',
                'image': EthereumTestnet,
                'label':{'title':'ETHT', 'details':'Ethereum Testnet', 'size':'l', 'image': EthereumTestnet},
                'tags':{'active_tags':['Ethereum', 'Ether', 'EVM', 'Chain'], 'index_option':'indexed'},
                'number_label':this.get_blockchain_data('s'),
                'number_label_large': this.get_blockchain_data('l'),
                'banner-icon':{'header':'ETHT', 'subtitle':'Ethereum Testnet', 'image':EthereumTestnet},
                'chain_id':{'title':this.props.app_state.chain_id, 'details':'Chain ID', 'size' :'l'},
                'peer_count':{'title':this.props.app_state.number_of_peers, 'details':'Number of Peers', 'size' :'l'},
                'network_type':{'title':this.props.app_state.network_type, 'details':'Network Type', 'size' :'l'},
                
                'gas_used_chart_data_label':{'title':'Gas Used', 'details':'Amount of gas used in the last 100 blocks', 'size' :'l'},
                'gas_used_chart_data':{'chart_color':'#FCFCFC', 'background_color':'#D5D5D5', 'dataPoints':this.get_gas_used_data_points()},
                'gas_used_chart_data_average':{'title':number_with_commas(this.get_gas_used_data_point_average()), 'details':'Average Gas Used', 'size' :'l'},
                'highest_gas_consumed':{'title':number_with_commas(this.get_highest_gas_figure()), 'details':'Highest amount of Gas Consumed for Last 100 Blocks', 'size' :'l'},
                'lowest_gas_consumed':{'title':number_with_commas(this.get_lowest_gas_figure()), 'details':'Lowest amount of Gas Consumed for Last 100 Blocks', 'size' :'l'},

                'transaction_count_chart_data_label':{'title':'Transactions Processed', 'details':'Amount of transactions processed in the last 100 blocks', 'size' :'l'},
                'transaction_count_chart_data':{'chart_color':'#FCFCFC', 'background_color':'#D5D5D5', 'dataPoints':this.get_transaction_count_data_points()},
                

                'gas_limit':{'title':number_with_commas(this.get_latest_block_data().gasLimit), 'details':'Gas Limit per Block', 'size' :'l'},
                'base_fee_per_gas':{'title':number_with_commas(this.get_latest_block_data().baseFeePerGas), 'details':'Base Fee per Gas Unit', 'size' :'l'},
            }
        ]
    }

    render_block_history_logs(){
        var middle = this.props.height-70;
        var size = this.props.screensize;
        if(size == 'm'){
            middle = this.props.height-190;
        }
        var items = this.props.app_state.E15last_blocks
        return ( 
            <div style={{overflow: 'auto',height: middle, 'margin':'0px 0px 20px 0px'}}>
                <ul style={{ 'padding': '10px 0px 0px 20px', 'list-style': 'none'}}>
                    {items.reverse().map((item, index) => (
                        <li style={{'padding': '5px'}}>
                            {this.render_block_history_log_item(item, index)}
                        </li>
                    ))}
                    <div style={{'padding': '5px'}}>
                        {this.render_empty_object()}
                    </div>
                    <div style={{'padding': '5px'}}>
                        {this.render_empty_object()}
                    </div>
                </ul>
            </div>
        );
    }

    render_block_history_log_item(item, index){
        var item_object = this.get_block_history_log_item_object(item)
        var background_color = this.props.theme['card_background_color']
        var shadow_color = this.props.theme['card_shadow_color']
        return ( 
            <div onClick={() => console.log()} style={{height:'auto', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+shadow_color}}>
                <div style={{'padding': '5px 0px 5px 5px'}}>
                    {this.render_detail_item('1', item_object['tags'])}
                    <div style={{'padding': '0px 10px 0px 10px'}}>
                        {this.render_detail_item('3', item_object['number'])}
                    </div>
                    <div style={{height: 5}}/>
                    <div style={{'padding': '0px 10px 0px 10px'}}>
                        {this.render_detail_item('3', item_object['gasUsed'])}
                    </div>
                    <div style={{height: 5}}/>
                    <div style={{'padding': '0px 10px 0px 10px'}}>
                        {this.render_detail_item('3', item_object['miner'])}
                    </div>
                    <div style={{height: 5}}/>
                </div>         
            </div>
        );
    }


    get_block_history_log_item_object(item){
        return{
            'tags':{'active_tags':[this.get_time_difference(item.timestamp)+' ago'], 'indexed_option':'indexed'},
            'number':{'title':item.number,'details':' Block Number', 'size':'s'},
            'gasUsed':{'title':number_with_commas(item.gasUsed),'details':' Gas Used', 'size':'s'},
            'miner':{'details':item.miner,'title':' Transaction Miner', 'size':'s'}
        }
    }









    render_ends_list_detail(){
        if(this.props.selected_end_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_end_details_section()}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 20px 0px', 'max-width':'470px'}}>
                        <Tags page_tags_object={this.state.navigate_view_end_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_end_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
    }

    when_navigate_view_end_list_detail_tags_object_updated(tag_group){
        this.setState({navigate_view_end_list_detail_tags_object: tag_group})
    }

    render_end_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_end_list_detail_tags_object, this.state.navigate_view_end_list_detail_tags_object['i'].active)

        if(selected_item == 'details' || selected_item == 'e'){
            return(
                <div>
                    {this.render_end_main_details_section()}
                </div>
            )
        }else if(selected_item == 'transactions'){
            return(
                <div>
                    {this.render_end_block_history_logs()}
                </div>
            )
            
        }
    }

    render_end_main_details_section(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-70
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        var item = this.get_end_data();
        var selected_item = this.props.selected_end_item
        var selected_object = this.get_exchange_tokens(3)[selected_item]
        return(
            <div style={{ width:'99%', 'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 20px 10px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    
                    {this.render_detail_item('7', item['banner-icon'])}
                    {this.render_detail_item('3', item['token_type'])}
                    <div style={{height:10}}/>
                    
                    {this.render_detail_item('3', item['unlocked_supply'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['unlocked_liquidity'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['fully_custom'])}
                    <div style={{height:10}}/>

                    {this.render_detail_item('0')}

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['buy_limit'])}
                    </div>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['sell_limit'])}
                    </div>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['exchanges_liquidity'])}
                    </div>

                    {this.render_detail_item('0')}
                    
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['minimum_transactions_between_swap'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['minimum_blocks_between_swap'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['minimum_time_between_swap'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['minimum_entered_contracts_between_swap'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['minimum_transactions_for_first_buy'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['minimum_entered_contracts_for_first_buy'])}
                    <div style={{height:10}}/>

                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', item['trust_fee_proportion'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['exchange_authority'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['trust_fee_target'])}
                    <div style={{height:10}}/>

                    {this.render_detail_item('0')}

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['ratio_x'])}
                    </div>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['ratio_y'])}
                    </div>

                    {this.render_detail_item('3', item['combined_exchange_ratio'])}
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'size':'l', 'details':'Buy or Sell the token for a specified account', 'title':'Buy/Sell'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_mint_burn_token_ui()}>
                        {this.render_detail_item('5', item['mint_burn_button'])}
                    </div>
                    {this.render_detail_item('0')}
                    
                    {this.render_detail_item('3', {'size':'l', 'details':'Transfer some tokens to  a specified account', 'title':'Transfer'})}
                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>

                    {this.render_detail_item('2', { 'style':'l', 'title':'Your Balance', 'subtitle':this.format_power_figure(selected_object['balance']), 'barwidth':this.calculate_bar_width(selected_object['balance']), 'number':this.format_account_balance_figure(selected_object['balance']), 'barcolor':'', 'relativepower':'tokens', })}
                    </div>

                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_end_transfer_ui()}>
                        {this.render_detail_item('5', {'text':'Transfer', 'action':''},)}
                    </div>

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    open_mint_burn_token_ui(){
        this.props.open_mint_burn_token_ui(this.get_exchange_tokens(3)[this.props.selected_end_item])
    }

    open_end_transfer_ui(){
        this.props.open_transfer_ui(this.get_exchange_tokens(3)[this.props.selected_end_item])
    }

    get_end_data(){
        var selected_item = this.props.selected_end_item
        var selected_object = this.get_exchange_tokens(3)[selected_item]
        var title = selected_object['id'];
        var img = selected_object['img']
        
        var selected_obj_root_config = selected_object['data'][0];
        var selected_obj_config = selected_object['data'][1];
        var selected_obj_ratio_config = selected_object['data'][2];

        var type = selected_obj_root_config[3] == 3 ? 'Capped' : 'Uncapped'
        var is_auth_main_contract = selected_obj_config[9] == 2 ? '2 (Main Contract)': selected_obj_config[9]
        var is_trust_fee_target_main_contract = selected_obj_config[10] == 2 ? '2 (Main Contract)': (selected_obj_config[10] == 0 ? '0 (Burn Account)': selected_obj_config[10])

        if(title == 3){
            title = 'END'
        }
        
        return{
            'banner-icon':{'header':title, 'subtitle':'Exchange', 'image':img},
            'token_id': {'title':'ID: '+selected_object['id'], 'details':'Token Identifier', 'size':'l'},
            'token_type': {'title':'Token Type', 'details':type, 'size':'l'},

            'unlocked_supply': {'title':'Unlocked Supply', 'details':this.enabled_disabled(selected_obj_root_config[0]), 'size':'l'},
            'unlocked_liquidity': {'title':'Unlocked Liquidity', 'details':this.enabled_disabled(selected_obj_root_config[1]), 'size':'l'},
            'fully_custom': {'title':'Fully Custom', 'details':this.enabled_disabled(selected_obj_root_config[2]), 'size':'l'},

            'buy_limit':{'style':'l','title':'Buy Limit', 'subtitle':this.format_power_figure(selected_obj_config[0]), 'barwidth':this.calculate_bar_width(selected_obj_config[0]), 'number':this.format_account_balance_figure(selected_obj_config[0]), 'relativepower':'tokens'},
            
            'minimum_transactions_between_swap': {'title':selected_obj_config[2], 'details':'Minimum Transactions Between Swap', 'size':'l'},
            'minimum_blocks_between_swap': {'title':selected_obj_config[3], 'details':'Minimum Blocks Between Swap', 'size':'l'},
            'minimum_time_between_swap': {'title':this.get_time_diff(selected_obj_config[4]), 'details':'Minimum Time Between Swap', 'size':'l'},
            
            'trust_fee_proportion': {'title':this.format_proportion(selected_obj_config[7]), 'details':'Trust Fee', 'size':'l'},
            'exchange_authority': {'title':'Authority: '+is_auth_main_contract, 'details':'Exchange Authority Identifier', 'size':'l'},
            'trust_fee_target': {'title':'Target: '+is_trust_fee_target_main_contract, 'details':'Trust Fee Target Identifier', 'size':'l'},

            'sell_limit':{'style':'l','title':'Sell Limit', 'subtitle':this.format_power_figure(selected_obj_config[11]), 'barwidth':this.calculate_bar_width(selected_obj_config[11]), 'number':this.format_account_balance_figure(selected_obj_config[11]), 'relativepower':'tokens'},

            'minimum_entered_contracts_between_swap': {'title':selected_obj_config[13], 'details':'Minimum Entered Contracts Between Swap', 'size':'l'},
            'minimum_transactions_for_first_buy': {'title':selected_obj_config[17], 'details':'Minimum Transactions For First Buy', 'size':'l'},
            'minimum_entered_contracts_for_first_buy': {'title':selected_obj_config[18], 'details':'Minimum Entered Contracts For First Buy', 'size':'l'},

            'ratio_x':{'style':'l','title':'Exchange Ratio X', 'subtitle':this.format_power_figure(selected_obj_ratio_config[0]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[0]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[0]), 'relativepower':'tokens'},
            'ratio_y':{'style':'l','title':'Exchange Ratio Y', 'subtitle':this.format_power_figure(selected_obj_ratio_config[1]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[1]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[1]), 'relativepower':'tokens'},
            'combined_exchange_ratio': {'title':this.format_exchange_ratio(selected_obj_ratio_config[0], selected_obj_ratio_config[1]), 'details':'Exchange Ratio X:Y', 'size':'l'},

            'exchanges_liquidity':{'style':'l','title':'Exchanges Liquidity', 'subtitle':this.format_power_figure(selected_obj_ratio_config[2]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[2]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[2]), 'relativepower':'tokens'},
            'mint_burn_button':{'text':'Buy/Sell Token', 'action':''},
            '':{},
            '':{},
            '':{},
            '':{},
            '':{},

        }
    }

    render_end_block_history_logs(){

    }

    enabled_disabled(value){
        if(value == 1){
            return 'enabled'
        }
        return 'disabled'
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

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
    }

    format_exchange_ratio(ratio_x, ratio_y){
        // Calculate the ratio
        const gcd = this.calculateGCD(ratio_x, ratio_y);
        const ratio = `${ratio_x / gcd}:${ratio_y / gcd}`;
        return ratio;
    }

    calculateGCD(a, b) {
        if (b === 0) {
            return a;
        }
        return this.calculateGCD(b, a % b);
    }

    get_exchange_tokens(exchange_type){
        var token_exchanges = []
        // var exchanges_from_sync = this.props.app_state.E15_exchange_data;
        // var exchange_ids_from_sync = this.props.app_state.E15_exchange_id_data
        var exchanges_from_sync = this.props.app_state.created_tokens
        for (let i = 0; i < exchanges_from_sync.length; i++) {
            var type = exchanges_from_sync[i]['data'][0][3/* <3>token_type */]
            
            var img = type  == 3 ? EndImg: SpendImg
            if(exchanges_from_sync[i]['id'] == 3) img = E35EndImg
            else if(exchanges_from_sync[i]['id'] == 5) img = E35SpendImg
            
            if(type == exchange_type){
                token_exchanges.push({'data': exchanges_from_sync[i]['data'], 'id':exchanges_from_sync[i]['id'], 'E5': 'E15', 'img':img, 'balance':exchanges_from_sync[i]['balance']}, )
            }
        }
        return token_exchanges
    }


    render_end_block_history_logs(){

    }





    render_spends_list_detail(){
        if(this.props.selected_spend_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_spend_details_section()}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 20px 0px', 'max-width':'470px'}}>
                        <Tags page_tags_object={this.state.navigate_view_spend_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_spend_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
    }

    when_navigate_view_spend_list_detail_tags_object_updated(tag_group){
        this.setState({navigate_view_spend_list_detail_tags_object: tag_group})
    }

    render_spend_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_spend_list_detail_tags_object, this.state.navigate_view_spend_list_detail_tags_object['i'].active)

        if(selected_item == 'details' || selected_item == 'e'){
            return(
                <div>
                    {this.render_spend_main_details_section()}
                </div>
            )
        }else if(selected_item == 'transactions'){
            return(
                <div>
                    {this.render_spend_block_history_logs()}
                </div>
            )
            
        }
    }

    render_spend_main_details_section(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-70
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        var item = this.get_spend_data();
        var selected_item = this.props.selected_spend_item
        var selected_object = this.get_exchange_tokens(5)[selected_item]
        return(
            <div style={{ width:'99%', 'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 20px 10px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    
                    {this.render_detail_item('7', item['banner-icon'])}
                    {this.render_detail_item('3', item['token_type'])}
                    <div style={{height:10}}/>
                    
                    {this.render_detail_item('3', item['unlocked_supply'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['unlocked_liquidity'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['fully_custom'])}
                    <div style={{height:10}}/>

                    {this.render_detail_item('0')}

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['buy_limit'])}
                    </div>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['sell_limit'])}
                    </div>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['exchanges_liquidity'])}
                    </div>

                    {this.render_detail_item('0')}
                    
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['minimum_transactions_between_swap'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['minimum_blocks_between_swap'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['minimum_time_between_swap'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['minimum_entered_contracts_between_swap'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['minimum_transactions_for_first_buy'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['minimum_entered_contracts_for_first_buy'])}
                    <div style={{height:10}}/>

                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', item['trust_fee_proportion'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['exchange_authority'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['trust_fee_target'])}
                    <div style={{height:10}}/>

                    {this.render_detail_item('0')}

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['ratio_x'])}
                    </div>
                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['ratio_y'])}
                    </div>
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['combined_exchange_ratio'])}
                    {this.render_detail_item('0')}

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['block_limit'])}
                    </div>
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['internal_block_halfing_proportion'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['block_limit_reduction_proportion'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['block_reset_limit'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['block_limit_sensitivity'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['default_authority_mint_limit'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['block_halfing_type'])}

                    {this.render_detail_item('0')}
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['maturity_limit'])}
                    </div>
                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['current_block_mint_total'])}
                    </div>
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['active_block_limit_reduction_proportion'])}
                    
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'size':'l', 'details':'Mint or Dump the token at a specified account', 'title':'Mint/Dump'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_mint_burn_spend_token_ui()}>
                        {this.render_detail_item('5', item['mint_burn_button'])}
                    </div>

                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'size':'l', 'details':'Make a token transfer to a specified account', 'title':'Send/Transfer'})}

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>

                    {this.render_detail_item('2', { 'style':'l', 'title':'Your Balance', 'subtitle':this.format_power_figure(selected_object['balance']), 'barwidth':this.calculate_bar_width(selected_object['balance']), 'number':this.format_account_balance_figure(selected_object['balance']), 'barcolor':'', 'relativepower':'tokens', })}
                    </div>

                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_transfer_ui()}>
                        {this.render_detail_item('5', {'text':'Transfer', 'action':''},)}
                    </div>
                    
                    

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    open_mint_burn_spend_token_ui(){
        this.props.open_mint_burn_token_ui(this.get_exchange_tokens(5)[this.props.selected_spend_item])
    }

    open_transfer_ui(){
        this.props.open_transfer_ui(this.get_exchange_tokens(5)[this.props.selected_spend_item])
    }

    get_spend_data(){
        var selected_item = this.props.selected_spend_item
        var selected_object = this.get_exchange_tokens(5)[selected_item]
        var title = selected_object['id'];
        var img = selected_object['img']
        
        var selected_obj_root_config = selected_object['data'][0];
        var selected_obj_config = selected_object['data'][1];
        var selected_obj_ratio_config = selected_object['data'][2];

        var type = selected_obj_root_config[3] == 3 ? 'Capped' : 'Uncapped'
        var is_auth_main_contract = selected_obj_config[9] == 2 ? '2 (Main Contract)': selected_obj_config[9]
        var is_trust_fee_target_main_contract = selected_obj_config[10] == 2 ? '2 (Main Contract)': (selected_obj_config[10] == 0 ? '0 (Burn Account)': selected_obj_config[10])
        var halfing_type = selected_obj_config[15] == 0 ? 'Fixed' : 'Spread'

        if(title == 5){
            title = 'SPEND'
        }
        
        return{
            'banner-icon':{'header':title, 'subtitle':'Exchange', 'image':img},
            'token_id': {'title':'ID: '+selected_object['id'], 'details':'Token Identifier', 'size':'l'},
            'token_type': {'title':'Token Type', 'details':type, 'size':'l'},

            'unlocked_supply': {'title':'Unlocked Supply', 'details':this.enabled_disabled(selected_obj_root_config[0]), 'size':'l'},
            'unlocked_liquidity': {'title':'Unlocked Liquidity', 'details':this.enabled_disabled(selected_obj_root_config[1]), 'size':'l'},
            'fully_custom': {'title':'Fully Custom', 'details':this.enabled_disabled(selected_obj_root_config[2]), 'size':'l'},

            'buy_limit':{'style':'l','title':'Mint Limit', 'subtitle':this.format_power_figure(selected_obj_config[0]), 'barwidth':this.calculate_bar_width(selected_obj_config[0]), 'number':this.format_account_balance_figure(selected_obj_config[0]), 'relativepower':'tokens'},
            
            'minimum_transactions_between_swap': {'title':selected_obj_config[2], 'details':'Minimum Transactions Between Swap', 'size':'l'},
            'minimum_blocks_between_swap': {'title':selected_obj_config[3], 'details':'Minimum Blocks Between Swap', 'size':'l'},
            'minimum_time_between_swap': {'title':this.get_time_diff(selected_obj_config[4]), 'details':'Minimum Time Between Swap', 'size':'l'},
            
            'trust_fee_proportion': {'title':this.format_proportion(selected_obj_config[7]), 'details':'Trust Fee', 'size':'l'},
            'exchange_authority': {'title':'Authority: '+is_auth_main_contract, 'details':'Exchange Authority Identifier', 'size':'l'},
            'trust_fee_target': {'title':'Target: '+is_trust_fee_target_main_contract, 'details':'Trust Fee Target Identifier', 'size':'l'},

            'sell_limit':{'style':'l','title':'Sell Limit', 'subtitle':this.format_power_figure(selected_obj_config[11]), 'barwidth':this.calculate_bar_width(selected_obj_config[11]), 'number':this.format_account_balance_figure(selected_obj_config[11]), 'relativepower':'tokens'},

            'minimum_entered_contracts_between_swap': {'title':selected_obj_config[13], 'details':'Minimum Entered Contracts Between Swap', 'size':'l'},
            'minimum_transactions_for_first_buy': {'title':selected_obj_config[17], 'details':'Minimum Transactions For First Buy', 'size':'l'},
            'minimum_entered_contracts_for_first_buy': {'title':selected_obj_config[18], 'details':'Minimum Entered Contracts For First Buy', 'size':'l'},

            'ratio_x':{'style':'l','title':'Exchange Ratio X', 'subtitle':this.format_power_figure(selected_obj_ratio_config[0]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[0]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[0]), 'relativepower':'tokens'},
            'ratio_y':{'style':'l','title':'Exchange Ratio Y', 'subtitle':this.format_power_figure(selected_obj_ratio_config[1]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[1]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[1]), 'relativepower':'tokens'},
            'combined_exchange_ratio': {'title':this.format_exchange_ratio(selected_obj_ratio_config[0], selected_obj_ratio_config[1]), 'details':'Exchange Ratio X:Y', 'size':'l'},

            'exchanges_liquidity':{'style':'l','title':'Circulating Supply', 'subtitle':this.format_power_figure(selected_obj_ratio_config[2]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[2]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[2]), 'relativepower':'tokens'},
            'mint_burn_button':{'text':'Mint/Burn Token', 'action':''},

            'block_limit':{'style':'l','title':'Block Limit', 'subtitle':this.format_power_figure(selected_obj_config[1]), 'barwidth':this.calculate_bar_width(selected_obj_config[1]), 'number':this.format_account_balance_figure(selected_obj_config[1]), 'relativepower':'tokens'},
            'internal_block_halfing_proportion': {'title':this.format_proportion(selected_obj_config[5]), 'details':'Internal Block Halving Proportion', 'size':'l'},
            'block_limit_reduction_proportion': {'title':this.format_proportion(selected_obj_config[6]), 'details':'Block Limit Reduction Proportion', 'size':'l'},
            
            'block_reset_limit': {'title':selected_obj_config[8], 'details':'Block Reset Limit', 'size':'l'},
            'block_limit_sensitivity': {'title':selected_obj_config[12], 'details':'Block Limit Sensitivity', 'size':'l'},
            'default_authority_mint_limit': {'title':this.format_proportion(selected_obj_config[14]), 'details':'Authority Mint Limit (percentage of supply)', 'size':'l'},
            'block_halfing_type': {'title':halfing_type, 'details':'Halving Type', 'size':'l'},
            'maturity_limit':{'style':'l','title':'Maturity Limit', 'subtitle':this.format_power_figure(selected_obj_config[16]), 'barwidth':this.calculate_bar_width(selected_obj_config[16]), 'number':this.format_account_balance_figure(selected_obj_config[16]), 'relativepower':'tokens'},

            'current_block_mint_total':{'style':'l','title':'Current Block Mint Total', 'subtitle':this.format_power_figure(selected_obj_ratio_config[4]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[4]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[4]), 'relativepower':'tokens'},
            'active_block_limit_reduction_proportion': {'title':this.format_proportion(selected_obj_ratio_config[6]), 'details':'Active Block Limit Reduction Proportion', 'size':'l'},
            '':{},
            '':{},
            '':{},
            '':{},
            '':{},
            '':{},
        }
    }

    render_spend_block_history_logs(){

    }





    render_empty_detail_object(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        return(
            <div style={{height:he, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center','margin':'0px 0px 20px 0px'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={Letter} style={{height:70 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                    
                </div>
        );
    }





    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var size = this.props.screensize
        var width = size == 'm' ? this.props.app_state.width/2 : this.props.app_state.width
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data} open_send_receive_ether_bottomsheet={this.props.open_send_receive_ether_bottomsheet.bind(this)} theme={this.props.theme} open_wiki={this.open_wiki.bind(this)} width={width}/>
            </div>
        )

    }

    open_wiki(){
        this.props.open_wiki_bottomsheet()
    }




    get_blockchain_data(size){
        return{
            'style':size,
            'title':'Number of Blocks Mined',
            'subtitle':'e?',
            'barwidth':this.get_number_width(this.props.app_state.E15number_of_blocks),
            'number':`${number_with_commas(this.props.app_state.E15number_of_blocks)} blocks`,
            'barcolor':'#606060',
            'relativepower':'ledger size',
        }
    }

    get_number_width(number){
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
    }

    get_latest_block_data(){
        if(this.props.app_state.E15last_blocks.length  ==  0){
            return []
        }
        return this.props.app_state.E15last_blocks[0];
    }


    get_gas_used_data_points(){
        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = this.props.app_state.E15last_blocks.length;
        var highest_gas_figure = this.get_highest_gas_figure();
        for(var i = noOfDps-1; i >= 0; i--) {
            if(this.props.app_state.E15last_blocks[i] != null){
                var gas_used = this.props.app_state.E15last_blocks[i].gasUsed;
                // var final_val = Math.floor((gas_used/highest_gas_figure)*100)
                var final_val = gas_used;
                if(final_val > (highest_gas_figure*0.8)){
                    yVal = final_val;
                }else{
                    yVal = (highest_gas_figure*0.9999999999999)
                }

                if(i%50 == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+number_with_commas(gas_used)});//
                }else{
                    dps.push({x: xVal,y: yVal});//
                }
                
            }
            
            xVal++;
        }

        return dps;
    }

    get_transaction_count_data_points(){
        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = this.props.app_state.E15last_blocks.length;
        for(var i = noOfDps-1; i >= 0; i--) {
            if(this.props.app_state.E15last_blocks[i] != null){
                var transaction_count = this.props.app_state.E15last_blocks[i].transactions.length;
                yVal = transaction_count;

                if(i%50 == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+transaction_count});//
                }else{
                    dps.push({x: xVal,y: yVal});//
                }
                
            }
            
            xVal++;
        }

        return dps;
    }

    get_highest_gas_figure(){
        var highest = 0
        var noOfDps = this.props.app_state.E15last_blocks.length;
        for(var i = 0; i < noOfDps; i++) {
            if(this.props.app_state.E15last_blocks[i] != null){
                if(highest < this.props.app_state.E15last_blocks[i].gasUsed){
                    highest = this.props.app_state.E15last_blocks[i].gasUsed;
                }
            }
            
        }
        return highest
    }

    get_lowest_gas_figure(){
        var lowest = 3000000000
        var noOfDps = this.props.app_state.E15last_blocks.length;
        for(var i = 0; i < noOfDps; i++) {
            if(this.props.app_state.E15last_blocks[i] != null){
                if(this.props.app_state.E15last_blocks[i].gasUsed < lowest && this.props.app_state.E15last_blocks[i].gasUsed != 0){
                    lowest = this.props.app_state.E15last_blocks[i].gasUsed;
                }
            }
            
        }
        return lowest
    }

    get_gas_used_data_point_average(){
        var noOfDps = this.props.app_state.E15last_blocks.length-1;
        var total = 0
        for(var i = 0; i < noOfDps; i++) {
            if(this.props.app_state.E15last_blocks[i] != null){
                total += this.props.app_state.E15last_blocks[i].gasUsed
            }
            
        }

        if(total == 0) return 0;
        return Math.floor(total / noOfDps)
    }

    render_empty_object(){
        var background_color = this.props.theme['card_background_color']
        return(
                <div style={{height:180, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={Letter} style={{height:70 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                    
                </div>
            );
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

}



export default PostDetailSection;