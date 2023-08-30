import React, { Component } from 'react';
import ViewGroups from '../components/view_groups'
import Tags from '../components/tags';

import Letter from './../assets/letter.png'; 
import EndImg from './../assets/end_token_icon.png';
import SpendImg from './../assets/spend_token_icon.png';
import E35EndImg from './../assets/e35_end_token.png';
import E35SpendImg from './../assets/e35_spend_token.png';


import JobDetailsSection from './job_details_section'
import ContractsDetailsSection from './contract_details_section'
import ProposalDetailsSection from './proposal_details_section'
import SubscriptionDetailsSection from './subscription_details_section'
import E5DetailsSection from './E5_details_section'
import PostsDetailsSection from './posts_detail_section'
import ChannelDetailsSection from './channel_details_section'
import EthersDetailsSection from './ethers_details_section'
import EndDetailsSection from './end_detail_section'
import SpendDetailSection from './spend_details_section'

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
    };

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
                    <JobDetailsSection app_state={this.props.app_state} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_job_post_item={this.props.selected_job_post_item} work_page_tags_object={this.props.work_page_tags_object} viewed_jobs={this.props.viewed_jobs}/>
                )
            }
            else if(selected_tag == 'contracts' ){
                return(
                    <ContractsDetailsSection app_state={this.props.app_state} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_contract_item={this.props.selected_contract_item} 
                    open_enter_contract_ui={this.open_enter_contract_ui.bind(this)} 
                    open_extend_contract_ui={this.open_extend_contract_ui.bind(this)} 
                    open_exit_contract_ui={this.open_exit_contract_ui.bind(this)} 
                    work_page_tags_object={this.props.work_page_tags_object} 
                    viewed_contracts={this.props.viewed_contracts} open_new_proposal_ui={this.props.open_new_proposal_ui.bind(this)} open_modify_contract_ui={this.props.open_modify_contract_ui.bind(this)} open_force_exit_ui={this.props.open_force_exit_ui.bind(this)} open_archive_proposal_ui={this.props.open_archive_proposal_ui.bind(this)} open_moderator_ui={this.props.open_moderator_ui.bind(this)}/>
                )
            }
            else if(selected_tag == 'proposals' ){
                return(
                    <ProposalDetailsSection app_state={this.props.app_state} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_proposal_item={this.props.selected_proposal_item} viewed_proposals={this.props.viewed_proposals} work_page_tags_object={this.props.work_page_tags_object} open_vote_proposal_ui={this.props.open_vote_proposal_ui.bind(this)} open_sumbit_proposal_ui={this.props.open_sumbit_proposal_ui.bind(this)} open_archive_proposal_ui={this.props.open_archive_proposal_ui.bind(this)}/>
                )
            }
            else if(selected_tag == 'subscriptions' ){
                return(
                    <SubscriptionDetailsSection app_state={this.props.app_state}  height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} 
                    selected_subscription_item={this.props.selected_subscription_item} work_page_tags_object={this.props.work_page_tags_object} viewed_subscriptions={this.props.viewed_subscriptions} open_pay_subscription_ui={this.props.open_pay_subscription_ui.bind(this)} open_cancel_subscription_ui={this.props.open_cancel_subscription_ui.bind(this)} open_collect_subscription_ui={this.props.open_collect_subscription_ui.bind(this)} open_modify_subscription_ui={this.props.open_modify_subscription_ui.bind(this)} open_moderator_ui={this.props.open_moderator_ui.bind(this)}
                    />
                )
            }
        }
        else if(selected_page == 'e'){
            var selected_tag = this.props.explore_page_tags_object['i'].active
            if(selected_tag == 'E5s' || selected_tag == 'e'){
                return(
                    <E5DetailsSection app_state={this.props.app_state}  height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_e5_item={this.props.selected_e5_item} explore_page_tags_object={this.props.explore_page_tags_object}/>
                )
            }
            else if(selected_tag == 'posts' ){
                return(
                    <PostsDetailsSection app_state={this.props.app_state}  height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_post_item={this.props.selected_post_item} viewed_posts={this.props.viewed_posts} explore_page_tags_object={this.props.explore_page_tags_object}/>
                )
            }
            else if(selected_tag == 'channels' ){
                return(
                    <ChannelDetailsSection app_state={this.props.app_state} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_channel_item={this.props.selected_channel_item} viewed_channels={this.props.viewed_channels} explore_page_tags_object={this.props.explore_page_tags_object}/>
                )
            }
        }
        else if(selected_page == 'w'){
            var selected_tag = this.props.wallet_page_tags_object['i'].active
            var selected_item = this.props.wallet_page_tags_object['e'][2][0];
            var selected_option_name = this.props.wallet_page_tags_object['e'][1][selected_item];
            if(selected_option_name == 'ethers ⚗️' || selected_option_name == 'e'){
                return(
                    <EthersDetailsSection app_state={this.props.app_state} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_ether_item={this.props.selected_ether_item} open_send_receive_ether_bottomsheet={this.props.open_send_receive_ether_bottomsheet.bind(this)}/>
                )
            }
            else if(selected_option_name == 'ends ☝️' ){
                return(
                    <EndDetailsSection app_state={this.props.app_state} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_end_item={this.props.selected_end_item} open_mint_burn_token_ui={this.props.open_mint_burn_token_ui.bind(this)} open_transfer_ui={this.props.open_transfer_ui.bind(this)} open_modify_token_ui={this.props.open_modify_token_ui.bind(this)} open_exchange_transfers_ui={this.props.open_exchange_transfers_ui.bind(this)} open_freeze_unfreeze_ui={this.props.open_freeze_unfreeze_ui.bind(this)} open_moderator_ui={this.props.open_moderator_ui.bind(this)}/>
                )
            }
            else if(selected_option_name == 'spends 🫰' ){
                return(
                    <SpendDetailSection app_state={this.props.app_state} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_spend_item={this.props.selected_spend_item} open_mint_burn_token_ui={this.props.open_mint_burn_token_ui.bind(this)} open_transfer_ui={this.props.open_transfer_ui.bind(this)} open_modify_token_ui={this.props.open_modify_token_ui.bind(this)} open_exchange_transfers_ui={this.props.open_exchange_transfers_ui.bind(this)} open_freeze_unfreeze_ui={this.props.open_freeze_unfreeze_ui.bind(this)} open_authmint_ui={this.props.open_authmint_ui.bind(this)} open_moderator_ui={this.props.open_moderator_ui.bind(this)}/>
                )
            }
        }
    }

    open_enter_contract_ui(object){
        this.props.open_enter_contract_ui(object)
    }

    open_extend_contract_ui(object){
        this.props.open_extend_contract_ui(object)
    }

    open_exit_contract_ui(object){
        this.props.open_exit_contract_ui(object)
    }

}



export default PostDetailSection;