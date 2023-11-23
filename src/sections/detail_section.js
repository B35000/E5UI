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
import MailDetailsSection from './mail_details_section'
import StorefrontDetailsSection from './storefront_details_section'
import BagDetailsSection from './bag_details_section'
import ContractorDetailsSection from './contractor_detail_section'

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
            <div style={{}}>
                {this.render_post_detail_object()}
            </div>
        )
    }

    render_post_detail_object(){
        var selected_page = this.props.detail_page;
        if(selected_page == '?'){
            var selected_tag = this.props.detail_selected_tag
            if(selected_tag == 'jobs' || selected_tag == 'e'){
                return(
                    <JobDetailsSection app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_job_post_item={this.props.selected_job_post_item} work_page_tags_object={this.props.work_page_tags_object} viewed_jobs={this.props.viewed_jobs} show_images={this.props.show_images.bind(this)} open_respond_to_job_ui={this.props.open_respond_to_job_ui.bind(this)} view_application_contract={this.props.view_application_contract.bind(this)} add_job_message_to_stack_object={this.props.add_job_message_to_stack_object.bind(this)} notify={this.props.notify.bind(this)} get_job_items={this.props.get_job_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} get_job_objects_responses={this.props.get_job_objects_responses.bind(this)} get_objects_messages={this.props.get_objects_messages.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} pin_job={this.props.pin_job.bind(this)} open_e5_link={this.props.open_e5_link.bind(this)}/>
                )
            }
            else if(selected_tag == 'contracts' ){
                return(
                    <ContractsDetailsSection app_state={this.props.app_state} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_contract_item={this.props.selected_contract_item} 
                    open_enter_contract_ui={this.open_enter_contract_ui.bind(this)} 
                    open_extend_contract_ui={this.open_extend_contract_ui.bind(this)} 
                    open_exit_contract_ui={this.open_exit_contract_ui.bind(this)} 
                    work_page_tags_object={this.props.work_page_tags_object} 
                    viewed_contracts={this.props.viewed_contracts} open_new_proposal_ui={this.props.open_new_proposal_ui.bind(this)} open_modify_contract_ui={this.props.open_modify_contract_ui.bind(this)} open_force_exit_ui={this.props.open_force_exit_ui.bind(this)} open_archive_proposal_ui={this.props.open_archive_proposal_ui.bind(this)} open_moderator_ui={this.props.open_moderator_ui.bind(this)} get_contract_items={this.props.get_contract_items.bind(this)} get_contract_event_data={this.props.get_contract_event_data.bind(this)} get_moderator_event_data={this.props.get_moderator_event_data.bind(this)} pin_contract={this.props.pin_contract.bind(this)} />
                )
            }
            else if(selected_tag == 'proposals' ){
                return(
                    <ProposalDetailsSection app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_proposal_item={this.props.selected_proposal_item} viewed_proposals={this.props.viewed_proposals} work_page_tags_object={this.props.work_page_tags_object} open_vote_proposal_ui={this.props.open_vote_proposal_ui.bind(this)} open_sumbit_proposal_ui={this.props.open_sumbit_proposal_ui.bind(this)} open_archive_proposal_ui={this.props.open_archive_proposal_ui.bind(this)} add_proposal_message_to_stack_object={this.props.add_proposal_message_to_stack_object.bind(this)} notify={this.props.notify.bind(this)} get_proposal_items={this.props.get_proposal_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} get_objects_messages={this.props.get_objects_messages.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} get_proposal_event_data={this.props.get_proposal_event_data.bind(this)} pin_proposal={this.props.pin_proposal.bind(this)}/>
                )
            }
            else if(selected_tag == 'subscriptions' ){
                return(
                    <SubscriptionDetailsSection app_state={this.props.app_state}  height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} notify={this.props.notify.bind(this)}
                    selected_subscription_item={this.props.selected_subscription_item} work_page_tags_object={this.props.work_page_tags_object} viewed_subscriptions={this.props.viewed_subscriptions} open_pay_subscription_ui={this.props.open_pay_subscription_ui.bind(this)} open_cancel_subscription_ui={this.props.open_cancel_subscription_ui.bind(this)} open_collect_subscription_ui={this.props.open_collect_subscription_ui.bind(this)} open_modify_subscription_ui={this.props.open_modify_subscription_ui.bind(this)} open_moderator_ui={this.props.open_moderator_ui.bind(this)} get_subscription_items={this.props.get_subscription_items.bind(this)} get_subscription_event_data={this.props.get_subscription_event_data.bind(this)} get_moderator_event_data={this.props.get_moderator_event_data.bind(this)} get_accounts_payment_information={this.props.get_accounts_payment_information.bind(this)} pin_subscription={this.props.pin_subscription.bind(this)}
                    />
                )
            }
            else if(selected_tag == 'mail'){
                return(
                    <MailDetailsSection app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_mail_item={this.props.selected_mail_item} work_page_tags_object={this.props.work_page_tags_object} show_images={this.props.show_images.bind(this)} notify={this.props.notify.bind(this)} add_mail_to_stack_object={this.props.add_mail_to_stack_object.bind(this)} get_mail_items={this.props.get_mail_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} open_e5_link={this.props.open_e5_link.bind(this)}/>
                )
            }
            if(selected_tag == 'contractors'){
                return(
                    <ContractorDetailsSection app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_contractor_item={this.props.selected_contractor_item} work_page_tags_object={this.props.work_page_tags_object} viewed_contractors={this.props.viewed_contractors} show_images={this.props.show_images.bind(this)}  notify={this.props.notify.bind(this)} open_send_job_request_ui={this.props.open_send_job_request_ui.bind(this)} open_view_job_request_ui={this.props.open_view_job_request_ui} open_view_contract_ui={this.props.open_view_contract_ui.bind(this)} get_contractor_items={this.props.get_contractor_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} get_contractor_applications={this.props.get_contractor_applications.bind(this)} pin_contractor={this.props.pin_contractor.bind(this)} open_e5_link={this.props.open_e5_link.bind(this)}/>
                )
            }
        }
        else if(selected_page == 'e'){
            var selected_tag = this.props.detail_selected_tag
            if(selected_tag == 'E5s' || selected_tag == 'e'){
                return(
                    <E5DetailsSection app_state={this.props.app_state}  height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_e5_item={this.props.selected_e5_item} explore_page_tags_object={this.props.explore_page_tags_object} show_withdraw_ether_bottomsheet={this.props.show_withdraw_ether_bottomsheet.bind(this)} get_e5_data={this.props.get_e5_data.bind(this)}/>
                )
            }
            else if(selected_tag == 'posts' ){
                return(
                    <PostsDetailsSection app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_post_item={this.props.selected_post_item} viewed_posts={this.props.viewed_posts} explore_page_tags_object={this.props.explore_page_tags_object} show_images={this.props.show_images.bind(this)} add_post_reply_to_stack={this.props.add_post_reply_to_stack.bind(this)} notify={this.props.notify.bind(this)} get_post_items={this.props.get_post_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} open_award_ui={this.props.open_award_ui.bind(this)} get_objects_messages={this.props.get_objects_messages.bind(this)} get_post_award_data={this.props.get_post_award_data.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} pin_post={this.props.pin_post.bind(this)} open_e5_link={this.props.open_e5_link.bind(this)}/>
                )
            }
            else if(selected_tag == 'channels' ){
                return(
                    <ChannelDetailsSection app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_channel_item={this.props.selected_channel_item} viewed_channels={this.props.viewed_channels} explore_page_tags_object={this.props.explore_page_tags_object} show_images={this.props.show_images.bind(this)} notify={this.props.notify.bind(this)} add_channel_message_to_stack_object={this.props.add_channel_message_to_stack_object.bind(this)} open_moderator_ui={this.props.open_moderator_ui.bind(this)} get_channel_items={this.props.get_channel_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} get_objects_messages={this.props.get_objects_messages.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} get_moderator_event_data={this.props.get_moderator_event_data.bind(this)} pin_channel={this.props.pin_channel.bind(this)} get_channel_event_data={this.props.get_channel_event_data.bind(this)} open_e5_link={this.props.open_e5_link.bind(this)}/>
                )
            }
            else if(selected_tag == 'storefront'){
                return(
                    <StorefrontDetailsSection app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_storefront_item={this.props.selected_storefront_item} explore_page_tags_object={this.props.explore_page_tags_object} show_images={this.props.show_images.bind(this)} notify={this.props.notify.bind(this)} viewed_stores={this.props.viewed_stores} open_add_to_bag={this.props.open_add_to_bag.bind(this)} open_fulfil_bag_request={this.props.open_fulfil_bag_request.bind(this)} open_direct_purchase={this.props.open_direct_purchase.bind(this)} open_clear_purchase={this.props.open_clear_purchase.bind(this)} add_storefront_message_to_stack_object={this.props.add_storefront_message_to_stack_object.bind(this)} get_storefront_items={this.props.get_storefront_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} pin_item={this.props.pin_item.bind(this)} open_e5_link={this.props.open_e5_link.bind(this)}/>
                )
            }
            else if(selected_tag == 'bags'){
                return(
                    <BagDetailsSection app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_bag_item={this.props.selected_bag_item} explore_page_tags_object={this.props.explore_page_tags_object} show_images={this.props.show_images.bind(this)} notify={this.props.notify.bind(this)} viewed_bags={this.props.viewed_bags} open_fulfil_bag_request={this.props.open_fulfil_bag_request.bind(this)} view_bag_application_contract={this.props.view_bag_application_contract.bind(this)} add_bag_message_to_stack_object={this.props.add_bag_message_to_stack_object.bind(this)} get_bag_items={this.props.get_bag_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} get_job_objects_responses={this.props.get_job_objects_responses.bind(this)} get_objects_messages={this.props.get_objects_messages.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} pin_bag={this.props.pin_bag.bind(this)}/>
                )
            }
        }
        else if(selected_page == 'w'){
            // var selected_tag = this.props.wallet_page_tags_object['i'].active
            // var selected_item = this.props.wallet_page_tags_object['e'][2][0];
            // var selected_option_name = this.props.wallet_page_tags_object['e'][1][selected_item];
            var selected_option_name = this.props.detail_selected_tag
            if(selected_option_name == 'ethers ⚗️' || selected_option_name == 'e'){
                return(
                    <EthersDetailsSection app_state={this.props.app_state} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_ether_item={this.props.selected_ether_item} notify={this.props.notify.bind(this)} open_send_receive_ether_bottomsheet={this.props.open_send_receive_ether_bottomsheet.bind(this)} open_wallet_guide_bottomsheet={this.props.open_wallet_guide_bottomsheet.bind(this)}/>
                )
            }
            else if(selected_option_name == 'ends ☝️' ){
                return(
                    <EndDetailsSection app_state={this.props.app_state} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_end_item={this.props.selected_end_item} open_mint_burn_token_ui={this.props.open_mint_burn_token_ui.bind(this)} open_transfer_ui={this.props.open_transfer_ui.bind(this)} open_modify_token_ui={this.props.open_modify_token_ui.bind(this)} open_exchange_transfers_ui={this.props.open_exchange_transfers_ui.bind(this)} open_freeze_unfreeze_ui={this.props.open_freeze_unfreeze_ui.bind(this)} open_moderator_ui={this.props.open_moderator_ui.bind(this)} get_exchange_tokens={this.props.get_exchange_tokens.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} get_exchange_event_data={this.props.get_exchange_event_data.bind(this)} get_moderator_event_data={this.props.get_moderator_event_data.bind(this)} show_depthmint_bottomsheet={this.props.show_depthmint_bottomsheet.bind(this)}/>
                )
            }
            else if(selected_option_name == 'spends 🫰' ){
                return(
                    <SpendDetailSection app_state={this.props.app_state} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_spend_item={this.props.selected_spend_item} open_mint_burn_token_ui={this.props.open_mint_burn_token_ui.bind(this)} open_transfer_ui={this.props.open_transfer_ui.bind(this)} open_modify_token_ui={this.props.open_modify_token_ui.bind(this)} open_exchange_transfers_ui={this.props.open_exchange_transfers_ui.bind(this)} open_freeze_unfreeze_ui={this.props.open_freeze_unfreeze_ui.bind(this)} open_authmint_ui={this.props.open_authmint_ui.bind(this)} open_moderator_ui={this.props.open_moderator_ui.bind(this)} get_exchange_tokens={this.props.get_exchange_tokens.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} get_exchange_event_data={this.props.get_exchange_event_data.bind(this)} get_moderator_event_data={this.props.get_moderator_event_data.bind(this)}/>
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