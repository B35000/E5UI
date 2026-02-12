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
import ViewGroups from '../components/view_groups'
import Tags from '../components/tags';

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
import CoinsDetailsSection from './coins_details_section'
import AudioDetailSection from './audio_details_section'
import VideoDetailsSection from './video_details_section'
import NitroDetailsSection from './nitro_details_section'
import BillDetailsSection from './bill_details_section'
import PollDetailsSection from './poll_details_section';
import DirectMessageDetailsSection from './direct_message_details_section'

var bigInt = require("big-integer");


function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function start_and_end(str) {
  if (str.length > 30) {
    return str.substr(0, 20) + '...' + str.substr(str.length-10, str.length);
  }
  return str;
}



class PostDetailSection extends Component {
    
    state = {
        selected: 0, animate: false
    };

    componentDidUpdate(prevProps){
        if(
            prevProps.selected_ether_item != this.props.selected_ether_item || 
            prevProps.selected_end_item != this.props.selected_end_item || 
            prevProps.selected_spend_item != this.props.selected_spend_item || 
            prevProps.selected_e5_item != this.props.selected_e5_item || 
            prevProps.selected_job_post_item != this.props.selected_job_post_item || 
            prevProps.selected_contract_item != this.props.selected_contract_item || 
            prevProps.selected_subscription_item != this.props.selected_subscription_item || 
            prevProps.selected_post_item != this.props.selected_post_item || 
            prevProps.selected_channel_item != this.props.selected_channel_item || 
            prevProps.selected_proposal_item != this.props.selected_proposal_item || 
            prevProps.selected_mail_item != this.props.selected_mail_item || 
            prevProps.selected_storefront_item != this.props.selected_storefront_item || 
            prevProps.selected_bag_item != this.props.selected_bag_item || 
            prevProps.selected_contractor_item != this.props.selected_contractor_item || 
            prevProps.selected_coin_item != this.props.selected_coin_item || 
            prevProps.selected_audio_item != this.props.selected_audio_item || 
            prevProps.selected_video_item != this.props.selected_video_item || 
            prevProps.selected_nitro_item != this.props.selected_nitro_item || 
            prevProps.selected_bill_item != this.props.selected_bill_item ||
            prevProps.selected_poll_item != this.props.selected_poll_item
        ){
            if(this.props.screensize != 's' || true){
                this.setState({ animate: true }, () => {
                    setTimeout(() => this.setState({ animate: false }), 500); // match animation duration
                });
            }
        }
    }

    render(){

        return(
            <div style={{}}>
                <style>{`
                    .view-animate {
                        animation: fadeIn 0.5s ease forwards;
                    }
                    @keyframes fadeIn {
                        0%   { opacity: 0; }
                        100% { opacity: 1; }
                    }
                `}</style>
                <div className={this.state.animate ? 'view-animate' : ''}>
                    {this.render_post_detail_object()}
                </div>
                
            </div>
        )
    }
    constructor(props) {
        super(props);
        this.curent_post_section = React.createRef();
    }

    render_post_detail_object(){
        var selected_page = this.props.detail_page;
        if(selected_page == '?'){
            var selected_tag = this.props.detail_selected_tag
            if(selected_tag == this.props.app_state.loc['1196']/* 'jobs' */ || selected_tag == 'e' || selected_tag == null){
                return(
                    <JobDetailsSection ref={this.curent_post_section} app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_job_post_item={this.props.selected_job_post_item} work_page_tags_object={this.props.work_page_tags_object} viewed_jobs={this.props.viewed_jobs} show_images={this.props.show_images.bind(this)} open_respond_to_job_ui={this.props.open_respond_to_job_ui.bind(this)} view_application_contract={this.props.view_application_contract.bind(this)} add_job_message_to_stack_object={this.props.add_job_message_to_stack_object.bind(this)} notify={this.props.notify.bind(this)} get_job_items={this.props.get_job_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} get_job_objects_responses={this.props.get_job_objects_responses.bind(this)} get_objects_messages={this.props.get_objects_messages.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} pin_job={this.props.pin_job.bind(this)} open_e5_link={this.props.open_e5_link.bind(this)} view_number={this.props.view_number.bind(this)} delete_message_from_stack={this.props.delete_message_from_stack.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)} block_post={this.props.block_post.bind(this)} when_zip_file_opened={this.props.when_zip_file_opened.bind(this)} follow_unfollow_post_author={this.props.follow_unfollow_post_author.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)} render_files_part={this.render_files_part.bind(this)} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} show_view_map_location_pins={this.props.show_view_map_location_pins.bind(this)} get_account_id_from_alias={this.props.get_account_id_from_alias.bind(this)} show_dialog_bottomsheet={this.props.show_dialog_bottomsheet.bind(this)} get_stop_words={this.get_stop_words.bind(this)}
                    />
                )
            }
            else if(selected_tag == this.props.app_state.loc['1197']/* 'contracts' */ ){
                return(
                    <ContractsDetailsSection ref={this.curent_post_section} app_state={this.props.app_state} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_contract_item={this.props.selected_contract_item} 
                    open_enter_contract_ui={this.open_enter_contract_ui.bind(this)} 
                    open_extend_contract_ui={this.open_extend_contract_ui.bind(this)} 
                    open_exit_contract_ui={this.open_exit_contract_ui.bind(this)} 
                    work_page_tags_object={this.props.work_page_tags_object} 
                    viewed_contracts={this.props.viewed_contracts} open_new_proposal_ui={this.props.open_new_proposal_ui.bind(this)} open_modify_contract_ui={this.props.open_modify_contract_ui.bind(this)} open_force_exit_ui={this.props.open_force_exit_ui.bind(this)} open_archive_proposal_ui={this.props.open_archive_proposal_ui.bind(this)} open_moderator_ui={this.props.open_moderator_ui.bind(this)} get_contract_items={this.props.get_contract_items.bind(this)} get_contract_event_data={this.props.get_contract_event_data.bind(this)} get_moderator_event_data={this.props.get_moderator_event_data.bind(this)} pin_contract={this.props.pin_contract.bind(this)} view_number={this.props.view_number.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} render_files_part={this.render_files_part.bind(this)} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} get_account_id_from_alias={this.props.get_account_id_from_alias.bind(this)} show_view_purchase_credits={this.props.show_view_purchase_credits.bind(this)} show_dialog_bottomsheet={this.props.show_dialog_bottomsheet.bind(this)} get_recipient_address={this.props.get_recipient_address.bind(this)} calculate_credit_balance={this.props.calculate_credit_balance.bind(this)} notify={this.props.notify.bind(this)} get_objects_from_socket_and_set_in_state={this.props.get_objects_from_socket_and_set_in_state.bind(this)} load_prepurchase_balance_for_prompt={this.props.load_prepurchase_balance_for_prompt.bind(this)}
                    />
                )
            }
            else if(selected_tag == this.props.app_state.loc['1199']/* 'proposals' */ ){
                return(
                    <ProposalDetailsSection app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} show_images={this.props.show_images.bind(this)} selected_proposal_item={this.props.selected_proposal_item} viewed_proposals={this.props.viewed_proposals} work_page_tags_object={this.props.work_page_tags_object} open_vote_proposal_ui={this.props.open_vote_proposal_ui.bind(this)} open_sumbit_proposal_ui={this.props.open_sumbit_proposal_ui.bind(this)} open_archive_proposal_ui={this.props.open_archive_proposal_ui.bind(this)} add_proposal_message_to_stack_object={this.props.add_proposal_message_to_stack_object.bind(this)} notify={this.props.notify.bind(this)} get_proposal_items={this.props.get_proposal_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} get_objects_messages={this.props.get_objects_messages.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} get_proposal_event_data={this.props.get_proposal_event_data.bind(this)} pin_proposal={this.props.pin_proposal.bind(this)} open_e5_link={this.props.open_e5_link.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} view_number={this.props.view_number.bind(this)} delete_message_from_stack={this.props.delete_message_from_stack.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)} when_zip_file_opened={this.props.when_zip_file_opened.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)} render_files_part={this.render_files_part.bind(this)} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)}
                    get_account_id_from_alias={this.props.get_account_id_from_alias.bind(this)}
                    />
                )
            }
            else if(selected_tag == this.props.app_state.loc['1200']/* 'subscriptions' */ ){
                return(
                    <SubscriptionDetailsSection ref={this.curent_post_section} app_state={this.props.app_state}  height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} notify={this.props.notify.bind(this)}
                    selected_subscription_item={this.props.selected_subscription_item} work_page_tags_object={this.props.work_page_tags_object} viewed_subscriptions={this.props.viewed_subscriptions} open_pay_subscription_ui={this.props.open_pay_subscription_ui.bind(this)} open_cancel_subscription_ui={this.props.open_cancel_subscription_ui.bind(this)} open_collect_subscription_ui={this.props.open_collect_subscription_ui.bind(this)} open_modify_subscription_ui={this.props.open_modify_subscription_ui.bind(this)} open_moderator_ui={this.props.open_moderator_ui.bind(this)} get_subscription_items={this.props.get_subscription_items.bind(this)} get_subscription_event_data={this.props.get_subscription_event_data.bind(this)} get_moderator_event_data={this.props.get_moderator_event_data.bind(this)} get_accounts_payment_information={this.props.get_accounts_payment_information.bind(this)} pin_subscription={this.props.pin_subscription.bind(this)} view_number={this.props.view_number.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} render_files_part={this.render_files_part.bind(this)} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)}
                    get_account_id_from_alias={this.props.get_account_id_from_alias.bind(this)}
                    />
                )
            }
            else if(selected_tag == this.props.app_state.loc['1264s']/* 'nitro' */){
                return(
                    <NitroDetailsSection ref={this.curent_post_section} app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_nitro_item={this.props.selected_nitro_item} viewed_nitros={this.props.viewed_nitros} work_page_tags_object={this.props.work_page_tags_object} show_images={this.props.show_images.bind(this)} add_nitro_reply_to_stack={this.props.add_nitro_reply_to_stack.bind(this)} notify={this.props.notify.bind(this)} get_nitro_items={this.props.get_nitro_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} get_objects_messages={this.props.get_objects_messages.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} pin_nitro={this.props.pin_nitro.bind(this)} view_number={this.props.view_number.bind(this)} delete_message_from_stack={this.props.delete_message_from_stack.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)} show_buy_nitro_storage_bottomsheet={this.props.show_buy_nitro_storage_bottomsheet.bind(this)} show_configure_nitro_node_bottomsheet={this.props.show_configure_nitro_node_bottomsheet.bind(this)} load_my_account_storage_info={this.props.load_my_account_storage_info.bind(this)} open_pay_subscription_ui={this.props.open_pay_subscription_ui.bind(this)} when_zip_file_opened={this.props.when_zip_file_opened.bind(this)} connect_to_node={this.props.connect_to_node.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)} get_nitro_purchases={this.props.get_nitro_purchases.bind(this)} render_files_part={this.render_files_part.bind(this)} show_dialog_bottomsheet={this.props.show_dialog_bottomsheet.bind(this)} get_nitro_log_stream_data={this.props.get_nitro_log_stream_data.bind(this)} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} get_account_id_from_alias={this.props.get_account_id_from_alias.bind(this)}
                    />
                )
            }
            else if(selected_tag == this.props.app_state.loc['1264bo']/* 'direct-message 💬' */){
                return(
                    <DirectMessageDetailsSection ref={this.curent_post_section} app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_direct_message_item={this.props.selected_direct_message_item} work_page_tags_object={this.props.work_page_tags_object} show_images={this.props.show_images.bind(this)} notify={this.props.notify.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} open_e5_link={this.props.open_e5_link.bind(this)} view_number={this.props.view_number.bind(this)} delete_message_from_stack={this.props.delete_message_from_stack.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)} when_zip_file_opened={this.props.when_zip_file_opened.bind(this)} get_mail_messages={this.props.get_mail_messages.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)} play_individual_track={this.props.play_individual_track.bind(this)} play_individual_video={this.props.play_individual_video.bind(this)} render_files_part={this.render_files_part.bind(this)} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} get_account_id_from_alias={this.props.get_account_id_from_alias.bind(this)} emit_new_chat_typing_notification={this.props.emit_new_chat_typing_notification.bind(this)} send_direct_message={this.props.send_direct_message.bind(this)}
                    />
                )
            }
            else if(selected_tag == this.props.app_state.loc['1201']/* 'mail' */){
                return(
                    <MailDetailsSection ref={this.curent_post_section} app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_mail_item={this.props.selected_mail_item} work_page_tags_object={this.props.work_page_tags_object} show_images={this.props.show_images.bind(this)} notify={this.props.notify.bind(this)} add_mail_to_stack_object={this.props.add_mail_to_stack_object.bind(this)} get_mail_items={this.props.get_mail_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} open_e5_link={this.props.open_e5_link.bind(this)} view_number={this.props.view_number.bind(this)} delete_message_from_stack={this.props.delete_message_from_stack.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)} when_zip_file_opened={this.props.when_zip_file_opened.bind(this)} get_mail_messages={this.props.get_mail_messages.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)} play_individual_track={this.props.play_individual_track.bind(this)} play_individual_video={this.props.play_individual_video.bind(this)} render_files_part={this.render_files_part.bind(this)} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} get_account_id_from_alias={this.props.get_account_id_from_alias.bind(this)} emit_new_chat_typing_notification={this.props.emit_new_chat_typing_notification.bind(this)}
                    
                    />
                )
            }
            else if(selected_tag == this.props.app_state.loc['1198']/* 'contractors' */){
                return(
                    <ContractorDetailsSection ref={this.curent_post_section} app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_contractor_item={this.props.selected_contractor_item} work_page_tags_object={this.props.work_page_tags_object} viewed_contractors={this.props.viewed_contractors} show_images={this.props.show_images.bind(this)}  notify={this.props.notify.bind(this)} open_send_job_request_ui={this.props.open_send_job_request_ui.bind(this)} open_view_job_request_ui={this.props.open_view_job_request_ui} open_view_contract_ui={this.props.open_view_contract_ui.bind(this)} get_contractor_items={this.props.get_contractor_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} get_contractor_applications={this.props.get_contractor_applications.bind(this)} pin_contractor={this.props.pin_contractor.bind(this)} open_e5_link={this.props.open_e5_link.bind(this)} view_number={this.props.view_number.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)} block_post={this.props.block_post.bind(this)} when_zip_file_opened={this.props.when_zip_file_opened.bind(this)}
                    follow_unfollow_post_author={this.props.follow_unfollow_post_author.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)} render_files_part={this.render_files_part.bind(this)} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} show_view_map_location_pins={this.props.show_view_map_location_pins.bind(this)} get_account_id_from_alias={this.props.get_account_id_from_alias.bind(this)} emit_contractor_availability_notification={this.props.emit_contractor_availability_notification.bind(this)} get_stop_words={this.get_stop_words.bind(this)}
                    />
                )
            }
        }
        else if(selected_page == 'e'){
            var selected_tag = this.props.detail_selected_tag
            if(selected_tag == this.props.app_state.loc['1212']/* 'E5s' */ || selected_tag == 'e' || selected_tag == null){
                return(
                    <E5DetailsSection ref={this.curent_post_section} app_state={this.props.app_state}  height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} notify={this.props.notify.bind(this)} selected_e5_item={this.props.selected_e5_item} explore_page_tags_object={this.props.explore_page_tags_object} show_withdraw_ether_bottomsheet={this.props.show_withdraw_ether_bottomsheet.bind(this)} get_e5_data={this.props.get_e5_data.bind(this)} view_number={this.props.view_number.bind(this)} hash_data_with_specific_e5={this.props.hash_data_with_specific_e5.bind(this)}
                    render_files_part={this.render_files_part.bind(this)} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} get_account_id_from_alias={this.props.get_account_id_from_alias.bind(this)}
                    />
                )
            }
            else if(selected_tag == this.props.app_state.loc['1213']/* 'posts' */ ){
                return(
                    <PostsDetailsSection ref={this.curent_post_section} app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_post_item={this.props.selected_post_item} viewed_posts={this.props.viewed_posts} explore_page_tags_object={this.props.explore_page_tags_object} show_images={this.props.show_images.bind(this)} add_post_reply_to_stack={this.props.add_post_reply_to_stack.bind(this)} notify={this.props.notify.bind(this)} get_post_items={this.props.get_post_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} open_award_ui={this.props.open_award_ui.bind(this)} get_objects_messages={this.props.get_objects_messages.bind(this)} get_post_award_data={this.props.get_post_award_data.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} pin_post={this.props.pin_post.bind(this)} open_e5_link={this.props.open_e5_link.bind(this)} view_number={this.props.view_number.bind(this)} delete_message_from_stack={this.props.delete_message_from_stack.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)} block_post={this.props.block_post.bind(this)} when_zip_file_opened={this.props.when_zip_file_opened.bind(this)}
                    follow_unfollow_post_author={this.props.follow_unfollow_post_author.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} repost_post={this.props.repost_post.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)} play_individual_track={this.props.play_individual_track.bind(this)} play_individual_video={this.props.play_individual_video.bind(this)} render_files_part={this.render_files_part.bind(this)} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} get_account_id_from_alias={this.props.get_account_id_from_alias.bind(this)}
                    />
                )
            }
            else if(selected_tag == this.props.app_state.loc['1214']/* 'channels' */ ){
                return(
                    <ChannelDetailsSection ref={this.curent_post_section} app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_channel_item={this.props.selected_channel_item} viewed_channels={this.props.viewed_channels} explore_page_tags_object={this.props.explore_page_tags_object} show_images={this.props.show_images.bind(this)} notify={this.props.notify.bind(this)} add_channel_message_to_stack_object={this.props.add_channel_message_to_stack_object.bind(this)} open_moderator_ui={this.props.open_moderator_ui.bind(this)} get_channel_items={this.props.get_channel_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} get_objects_messages={this.props.get_objects_messages.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} get_moderator_event_data={this.props.get_moderator_event_data.bind(this)} pin_channel={this.props.pin_channel.bind(this)} get_channel_event_data={this.props.get_channel_event_data.bind(this)} open_e5_link={this.props.open_e5_link.bind(this)} view_number={this.props.view_number.bind(this)} delete_message_from_stack={this.props.delete_message_from_stack.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)} when_zip_file_opened={this.props.when_zip_file_opened.bind(this)}
                    follow_unfollow_post_author={this.props.follow_unfollow_post_author.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)} open_stage_creator_ui={this.props.open_stage_creator_ui.bind(this)} show_dialog_bottomsheet={this.props.show_dialog_bottomsheet.bind(this)} get_current_channel_creator_payout_info_if_possible={this.props.get_current_channel_creator_payout_info_if_possible.bind(this)} play_individual_track={this.props.play_individual_track.bind(this)} play_individual_video={this.props.play_individual_video.bind(this)} render_files_part={this.render_files_part.bind(this)} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} get_account_id_from_alias={this.props.get_account_id_from_alias.bind(this)}
                    />
                )
            }
            else if(selected_tag == this.props.app_state.loc['1215']/* 'storefront' */){
                return(
                    <StorefrontDetailsSection ref={this.curent_post_section} app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_storefront_item={this.props.selected_storefront_item} explore_page_tags_object={this.props.explore_page_tags_object} show_images={this.props.show_images.bind(this)} notify={this.props.notify.bind(this)} viewed_stores={this.props.viewed_stores} open_add_to_bag={this.props.open_add_to_bag.bind(this)} open_fulfil_bag_request={this.props.open_fulfil_bag_request.bind(this)} open_direct_purchase={this.props.open_direct_purchase.bind(this)} open_clear_purchase={this.props.open_clear_purchase.bind(this)} add_storefront_message_to_stack_object={this.props.add_storefront_message_to_stack_object.bind(this)} get_storefront_items={this.props.get_storefront_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} pin_item={this.props.pin_item.bind(this)} open_e5_link={this.props.open_e5_link.bind(this)} view_number={this.props.view_number.bind(this)} delete_message_from_stack={this.props.delete_message_from_stack.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)} block_post={this.props.block_post.bind(this)} when_zip_file_opened={this.props.when_zip_file_opened.bind(this)}
                    follow_unfollow_post_author={this.props.follow_unfollow_post_author.bind(this)} show_dialog_bottomsheet={this.props.show_dialog_bottomsheet.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)} when_catalogue_storefront_item_clicked={this.props.when_catalogue_storefront_item_clicked.bind(this)} 
                    open_participate_in_auction={this.props.open_participate_in_auction.bind(this)}
                    get_direct_purchase_events={this.props.get_direct_purchase_events.bind(this)}
                    get_storefront_auction_bids={this.props.get_storefront_auction_bids.bind(this)}
                    get_objects_messages={this.props.get_objects_messages.bind(this)} render_files_part={this.render_files_part.bind(this)} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} show_view_map_location_pins={this.props.show_view_map_location_pins.bind(this)} similar_posts={this.props.similar_posts} get_account_id_from_alias={this.props.get_account_id_from_alias.bind(this)} get_direct_purchase_orders={this.props.get_direct_purchase_orders.bind(this)} get_direct_purchase_files={this.props.get_direct_purchase_files.bind(this)} get_storefront_order_status={this.props.get_storefront_order_status.bind(this)} get_stop_words={this.get_stop_words.bind(this)}
                    />
                )
            }
            else if(selected_tag == this.props.app_state.loc['1216']/* 'bags' */){
                return(
                    <BagDetailsSection ref={this.curent_post_section} app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_bag_item={this.props.selected_bag_item} explore_page_tags_object={this.props.explore_page_tags_object} show_images={this.props.show_images.bind(this)} notify={this.props.notify.bind(this)} viewed_bags={this.props.viewed_bags} open_fulfil_bag_request={this.props.open_fulfil_bag_request.bind(this)} view_bag_application_contract={this.props.view_bag_application_contract.bind(this)} add_bag_message_to_stack_object={this.props.add_bag_message_to_stack_object.bind(this)} get_bag_items={this.props.get_bag_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} get_job_objects_responses={this.props.get_job_objects_responses.bind(this)} get_objects_messages={this.props.get_objects_messages.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} pin_bag={this.props.pin_bag.bind(this)} view_number={this.props.view_number.bind(this)} delete_message_from_stack={this.props.delete_message_from_stack.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)} follow_unfollow_post_author={this.props.follow_unfollow_post_author.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)} render_files_part={this.render_files_part.bind(this)} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} show_view_map_location_pins={this.props.show_view_map_location_pins.bind(this)}
                    get_account_id_from_alias={this.props.get_account_id_from_alias.bind(this)} show_dialog_bottomsheet={this.props.show_dialog_bottomsheet.bind(this)} get_stop_words={this.get_stop_words.bind(this)} export_order={this.props.export_order.bind(this)}
                    />
                )
            }
            else if(selected_tag == this.props.app_state.loc['1264k']/* 'audioport' */ ){
                return(
                    <AudioDetailSection ref={this.curent_post_section} app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_audio_item={this.props.selected_audio_item} viewed_audios={this.props.viewed_audios} explore_page_tags_object={this.props.explore_page_tags_object} show_images={this.props.show_images.bind(this)} add_audio_reply_to_stack={this.props.add_audio_reply_to_stack.bind(this)} notify={this.props.notify.bind(this)} get_audio_items={this.props.get_audio_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} open_award_ui={this.props.open_award_ui.bind(this)} get_objects_messages={this.props.get_objects_messages.bind(this)} get_post_award_data={this.props.get_post_award_data.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} pin_audio={this.props.pin_audio.bind(this)} open_e5_link={this.props.open_e5_link.bind(this)} view_number={this.props.view_number.bind(this)} delete_message_from_stack={this.props.delete_message_from_stack.bind(this)} open_purchase_album_ui={this.props.open_purchase_album_ui.bind(this)} play_song={this.props.play_song.bind(this)} 
                    get_page_id={this.props.get_page_id.bind(this)} show_dialog_bottomsheet={this.props.show_dialog_bottomsheet.bind(this)} play_song_in_playlist={this.props.play_song_in_playlist.bind(this)} update_order_of_songs_in_playlist={this.props.update_order_of_songs_in_playlist.bind(this)} download_playlist={this.props.download_playlist.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)} block_post={this.props.block_post.bind(this)} when_discography_audio_item_clicked={this.props.when_discography_audio_item_clicked.bind(this)} when_zip_file_opened={this.props.when_zip_file_opened.bind(this)} follow_unfollow_post_author={this.props.follow_unfollow_post_author.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} repost_audiopost={this.props.repost_audiopost.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)} render_files_part={this.render_files_part.bind(this)} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} similar_posts={this.props.similar_posts} get_account_id_from_alias={this.props.get_account_id_from_alias.bind(this)} 
                    start_object_file_viewcount_fetch={this.props.start_object_file_viewcount_fetch.bind(this)}
                    />
                )
            }
            else if(selected_tag == this.props.app_state.loc['1264p']/* 'videoport' */ ){
                return(
                    <VideoDetailsSection ref={this.curent_post_section} app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_video_item={this.props.selected_video_item} viewed_videos={this.props.viewed_videos} explore_page_tags_object={this.props.explore_page_tags_object} show_images={this.props.show_images.bind(this)} add_video_reply_to_stack={this.props.add_video_reply_to_stack.bind(this)} notify={this.props.notify.bind(this)} get_video_items={this.props.get_video_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} open_award_ui={this.props.open_award_ui.bind(this)} get_objects_messages={this.props.get_objects_messages.bind(this)} get_post_award_data={this.props.get_post_award_data.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} pin_video={this.props.pin_video.bind(this)} view_number={this.props.view_number.bind(this)} delete_message_from_stack={this.props.delete_message_from_stack.bind(this)} open_purchase_video_ui={this.props.open_purchase_video_ui.bind(this)} play_video={this.props.play_video.bind(this)} get_page_id={this.props.get_page_id.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)} 
                    block_post={this.props.block_post.bind(this)} when_discography_video_item_clicked={this.props.when_discography_video_item_clicked.bind(this)} when_zip_file_opened={this.props.when_zip_file_opened.bind(this)} follow_unfollow_post_author={this.props.follow_unfollow_post_author.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} repost_videopost={this.props.repost_videopost.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)} render_files_part={this.render_files_part.bind(this)} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} similar_posts={this.props.similar_posts} get_account_id_from_alias={this.props.get_account_id_from_alias.bind(this)} 
                    start_object_file_viewcount_fetch={this.props.start_object_file_viewcount_fetch.bind(this)}
                    />
                )
            }
            else if(selected_tag == this.props.app_state.loc['1264ao']/* 'polls' */){
                return(
                    <PollDetailsSection ref={this.curent_post_section} app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_poll_item={this.props.selected_poll_item} viewed_polls={this.props.viewed_polls} explore_page_tags_object={this.props.explore_page_tags_object} show_images={this.props.show_images.bind(this)}  notify={this.props.notify.bind(this)} get_poll_items={this.props.get_poll_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} pin_poll={this.props.pin_poll.bind(this)} view_number={this.props.view_number.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)} when_zip_file_opened={this.props.when_zip_file_opened.bind(this)}  when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} open_vote_in_poll_ui={this.props.open_vote_in_poll_ui.bind(this)} show_view_calculate_poll_result_bottomsheet={this.props.show_view_calculate_poll_result_bottomsheet.bind(this)} show_dialog_bottomsheet={this.props.show_dialog_bottomsheet.bind(this)}
                    select_deselect_tag={this.props.select_deselect_tag.bind(this)} render_files_part={this.render_files_part.bind(this)} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} get_account_id_from_alias={this.props.get_account_id_from_alias.bind(this)}
                    />
                )
            }
        }
        else if(selected_page == 'w'){
            // var selected_tag = this.props.wallet_page_tags_object['i'].active
            // var selected_item = this.props.wallet_page_tags_object['e'][2][0];
            // var selected_option_name = this.props.wallet_page_tags_object['e'][1][selected_item];
            var selected_option_name = this.props.detail_selected_tag
            // console.log('bills_details_section', 'selected_option_name', selected_option_name)
            if(selected_option_name == this.props.app_state.loc['1264j']/* 'coins 🪙' */ || selected_option_name == 'e'){
                return(
                    <CoinsDetailsSection
                    app_state={this.props.app_state} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_coin_item={this.props.selected_coin_item} notify={this.props.notify.bind(this)} view_number={this.props.view_number.bind(this)} open_wallet_guide_bottomsheet={this.props.open_wallet_guide_bottomsheet.bind(this)} start_send_receive_coin_bottomsheet={this.props.start_send_receive_coin_bottomsheet.bind(this)} update_coin_balances={this.props.update_coin_balances.bind(this)} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} show_dialog_bottomsheet={this.props.show_dialog_bottomsheet.bind(this)} show_successful_send_bottomsheet={this.props.show_successful_send_bottomsheet.bind(this)}
                    />
                )
            }
            else if(selected_option_name == this.props.app_state.loc['1217']/* 'ethers ⚗️' */){
                return(
                    <EthersDetailsSection  app_state={this.props.app_state} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_ether_item={this.props.selected_ether_item} notify={this.props.notify.bind(this)} open_send_receive_ether_bottomsheet={this.props.open_send_receive_ether_bottomsheet.bind(this)} open_wallet_guide_bottomsheet={this.props.open_wallet_guide_bottomsheet.bind(this)} open_rpc_settings={this.props.open_rpc_settings.bind(this)} get_wallet_data_for_specific_e5={this.props.get_wallet_data_for_specific_e5.bind(this)} view_number={this.props.view_number.bind(this)} render_files_part={this.render_files_part.bind(this)} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} show_dialog_bottomsheet={this.props.show_dialog_bottomsheet.bind(this)} show_successful_send_bottomsheet={this.props.show_successful_send_bottomsheet.bind(this)}
                    />
                )
            }
            else if(selected_option_name == this.props.app_state.loc['1218']/* 'ends' */ ){
                return(
                    <EndDetailsSection ref={this.curent_post_section} app_state={this.props.app_state} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_end_item={this.props.selected_end_item} open_mint_burn_token_ui={this.props.open_mint_burn_token_ui.bind(this)} open_transfer_ui={this.props.open_transfer_ui.bind(this)} open_modify_token_ui={this.props.open_modify_token_ui.bind(this)} open_exchange_transfers_ui={this.props.open_exchange_transfers_ui.bind(this)} open_freeze_unfreeze_ui={this.props.open_freeze_unfreeze_ui.bind(this)} open_moderator_ui={this.props.open_moderator_ui.bind(this)} get_exchange_tokens={this.props.get_exchange_tokens.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} get_exchange_event_data={this.props.get_exchange_event_data.bind(this)} get_moderator_event_data={this.props.get_moderator_event_data.bind(this)} show_depthmint_bottomsheet={this.props.show_depthmint_bottomsheet.bind(this)} view_number={this.props.view_number.bind(this)} open_royalty_staging_ui={this.props.open_royalty_staging_ui.bind(this)} view_royalty_staging={this.props.view_royalty_staging.bind(this)}
                    load_exchanges_royalty_event_data={this.props.load_exchanges_royalty_event_data.bind(this)}
                    load_exchanges_royalty_payout_event_data={this.props.load_exchanges_royalty_payout_event_data.bind(this)} pin_token={this.props.pin_token.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} render_files_part={this.render_files_part.bind(this)} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} get_account_id_from_alias={this.props.get_account_id_from_alias.bind(this)} notify={this.props.notify.bind(this)} 
                    />
                )
            }
            else if(selected_option_name == this.props.app_state.loc['1219']/* 'spends' */ ){
                return(
                    <SpendDetailSection ref={this.curent_post_section} app_state={this.props.app_state} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_spend_item={this.props.selected_spend_item} open_mint_burn_token_ui={this.props.open_mint_burn_token_ui.bind(this)} open_transfer_ui={this.props.open_transfer_ui.bind(this)} open_modify_token_ui={this.props.open_modify_token_ui.bind(this)} open_exchange_transfers_ui={this.props.open_exchange_transfers_ui.bind(this)} open_freeze_unfreeze_ui={this.props.open_freeze_unfreeze_ui.bind(this)} open_authmint_ui={this.props.open_authmint_ui.bind(this)} open_moderator_ui={this.props.open_moderator_ui.bind(this)} get_exchange_tokens={this.props.get_exchange_tokens.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} get_exchange_event_data={this.props.get_exchange_event_data.bind(this)} get_moderator_event_data={this.props.get_moderator_event_data.bind(this)} view_number={this.props.view_number.bind(this)}
                    pin_token={this.props.pin_token.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} render_files_part={this.render_files_part.bind(this)} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} get_account_id_from_alias={this.props.get_account_id_from_alias.bind(this)} notify={this.props.notify.bind(this)} 

                    />
                )
            }
            else if(selected_option_name == this.props.app_state.loc['1264aj']/* 'bills' */){
                return(
                    <BillDetailsSection
                        app_state={this.props.app_state} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_bill_item={this.props.selected_bill_item} notify={this.props.notify.bind(this)} view_number={this.props.view_number.bind(this)} pin_bill={this.props.pin_bill.bind(this)} get_bill_items={this.props.get_bill_items.bind(this)} show_dialog_bottomsheet={this.props.show_dialog_bottomsheet.bind(this)} perform_bill_object_payment_search={this.props.perform_bill_object_payment_search.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} render_files_part={this.render_files_part.bind(this)} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} get_account_id_from_alias={this.props.get_account_id_from_alias.bind(this)}
                    />
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

    reset_detail_section_tags(){
        try{
            this.curent_post_section.current?.reset_tags()
        }catch(e){
            console.log('detaul_section', e)
        }
        
    }





    render_files_part(entered_file_objects){
        var items = [].concat(entered_file_objects)
        if(items.length == 0) return;
        return(
            <div style={{'margin':'7px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_uploaded_file_item_clicked(item, index)}>
                            {this.render_uploaded_file(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    when_uploaded_file_item_clicked(item, index){
        this.props.when_file_link_tapped(item)
    }

    render_uploaded_file(item, index){
        var ecid_obj = this.get_cid_split(item)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        const minified = false;
        
        if(data != null){
            if(data['type'] == 'image'){
                var img = data['data']
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */
                var title = data['name']
                var size = 'l'
                if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    size = 's'
                }
                return(
                    <div>
                        {this.render_detail_item('8', {'details':details,'title':title, 'size':size, 'image':img, 'border_radius':'15%'})}
                    </div>
                )
            }
            else if(data['type'] == 'audio'){
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
                var title = data['name']
                var size = 'l'
                var thumbnail = data['thumbnail'] == '' ? this.props.app_state.static_assets['music_label'] : data['thumbnail']
                 if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    size = 's'
                }
                return(
                    <div>
                        {this.render_detail_item('8', {'details':details,'title':title, 'size':size, 'image':thumbnail, 'border_radius':'15%'})}
                    </div>
                )
            }
            else if(data['type'] == 'video'){
                var video = data['data']
                var font_size = ['15px', '12px', 19];
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */
                var title = data['name']
                var video_height = "50"
                if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    font_size = ['12px', '10px', 16];
                    video_height = "40"
                }

                if(this.props.app_state.video_thumbnails[ecid_obj['full']] != null){
                    var thumbnail = this.props.app_state.video_thumbnails[ecid_obj['full']]
                    return(
                        <div>
                            {this.render_detail_item('8', {'title':title,'details':details, 'size':size, 'image':thumbnail, 'border_radius':'15%', 'image_width':'auto'})}
                        </div>
                    )
                }else{
                    var thumbnail = this.props.app_state.static_assets['video_label']
                    return(
                        <div>
                            {this.render_detail_item('8', {'title':title,'details':details, 'size':size, 'image':thumbnail, 'border_radius':'15%', 'image_width':'auto'})}
                        </div>
                    )
                }
            }
            else if(data['type'] == 'pdf'){
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
                var title = data['name']
                var size = 'l'
                var thumbnail = data['thumbnail']
                 if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    size = 's'
                }
                return(
                    <div>
                        {this.render_detail_item('8', {'details':details,'title':title, 'size':size, 'image':thumbnail, 'border_radius':'15%'})}
                    </div>
                )
            }
            else if(data['type'] == 'zip'){
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
                var title = data['name']
                var size = 'l'
                var thumbnail = this.props.app_state.static_assets['zip_file']
                if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    size = 's'
                }
                return(
                    <div>
                        {this.render_detail_item('8', {'details':details,'title':title, 'size':size, 'image':thumbnail, 'border_radius':'15%'})}
                    </div>
                )
            }
            else if(data['type'] == 'lyric'){
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
                var title = data['name']
                var size = 'l'
                var thumbnail = this.props.app_state.static_assets['lyric_icon']
                if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    size = 's'
                }
                return(
                    <div>
                        {this.render_detail_item('8', {'details':details,'title':title, 'size':size, 'image':thumbnail, 'border_radius':'15%'})}
                    </div>
                )
            }
            else if(data['type'] == 'subtitle'){
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
                var title = data['name']
                var size = 'l'
                var thumbnail = this.props.app_state.static_assets['subtitle_icon']
                if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    size = 's'
                }
                return(
                    <div>
                        {this.render_detail_item('8', {'details':details,'title':title, 'size':size, 'image':thumbnail, 'border_radius':'15%'})}
                    </div>
                )
            }
        }
    }

    get_stop_words(){
        const filter_words = [
            "a", "an", "the",

            "and", "but", "or", "nor", "so", "yet", "for",

            "after", "although", "as", "because", "before", "even", "even though",
            "if", "since", "though", "unless", "until", "when", "where", "while",
            "once", "that", "whether", "wherever", "whenever",

            "above", "about", "across", "after", "against", "along", "among",
            "around", "at", "before", "behind", "below", "beneath", "beside",
            "between", "beyond", "by", "despite", "down", "during", "except",
            "for", "from", "in", "inside", "into", "near", "of", "off", "on",
            "onto", "out", "outside", "over", "past", "since", "through",
            "throughout", "to", "toward", "under", "underneath", "until", "up",
            "upon", "with", "within", "without",

            "i", "you", "he", "she", "it", "we", "they",
            "me", "him", "her", "us", "them",
            "my", "your", "his", "her", "its", "our", "their",
            "mine", "yours", "his", "hers", "ours", "theirs",
            "myself", "yourself", "himself", "herself", "itself",
            "ourselves", "yourselves", "themselves",

            "this", "that", "these", "those",
            "who", "whom", "whose", "which", "what",
            "whoever", "whomever", "whichever", "whatever",

            "any", "anyone", "anything", "every", "everyone", "everything",
            "some", "someone", "something", "none", "no one", "nothing",
            "each", "either", "neither", "few", "many", "several", "all",
            "most", "much", "both",

            "am", "is", "are", "was", "were", "be", "being", "been",
            "do", "does", "did",
            "have", "has", "had",

            "can", "could", "may", "might", "must",
            "shall", "should", "will", "would",

            "there", "here", "then", "thus", "hence", "however", "therefore",
            "moreover", "otherwise", "nevertheless",

            "not", "no", "yes", "yet", "just", "only", "very",

            "0o", "0s", "3a", "3b", "3d", "6b", "6o", "a", "a1", "a2", "a3", "a4", "ab", "able", "about", "above", "abst", "ac", "accordance", "according", "accordingly", "across", "act", "actually", "ad", "added", "adj", "ae", "af", "affected", "affecting", "affects", "after", "afterwards", "ag", "again", "against", "ah", "ain", "ain't", "aj", "al", "all", "allow", "allows", "almost", "alone", "along", "already", "also", "although", "always", "am", "among", "amongst", "amoungst", "amount", "an", "and", "announce", "another", "any", "anybody", "anyhow", "anymore", "anyone", "anything", "anyway", "anyways", "anywhere", "ao", "ap", "apart", "apparently", "appear", "appreciate", "appropriate", "approximately", "ar", "are", "aren", "arent", "aren't", "arise", "around", "as", "a's", "aside", "ask", "asking", "associated", "at", "au", "auth", "av", 
            "available", "aw", "away", "awfully", "ax", "ay", "az", "b", "b1", "b2", "b3", "ba", "back", "bc", "bd", "be", "became", "because", "become", "becomes", "becoming", "been", "before", "beforehand", "begin", "beginning", "beginnings", "begins", "behind", "being", "believe", "below", "beside", "besides", "best", "better", "between", "beyond", "bi", "bill", "biol", "bj", "bk", "bl", "bn", "both", "bottom", "bp", "br", "brief", "briefly", "bs", "bt", "bu", "but", "bx", "by", "c", "c1", "c2", "c3", "ca", "call", "came", "can", "cannot", "cant", "can't", "cause", "causes", "cc", "cd", "ce", "certain", "certainly", "cf", "cg", "ch", "changes", "ci", "cit", "cj", "cl", "clearly", "cm", "c'mon", "cn", "co", "com", "come", "comes", "con", 
            "concerning", "consequently", "consider", "considering", "contain", "containing", "contains", "corresponding", "could", "couldn", "couldnt", "couldn't", "course", "cp", "cq", "cr", "cry", "cs", "c's", "ct", "cu", "currently", "cv", "cx", "cy", "cz", "d", "d2", "da", "date", "dc", "dd", "de", "definitely", "describe", "described", "despite", "detail", "df", "di", "did", "didn", "didn't", "different", "dj", "dk", "dl", "do", "does", "doesn", "doesn't", "doing", "don", "done", "don't", "down", "downwards", "dp", "dr", "ds", "dt", "du", "due", "during", "dx", "dy", "e", "e2", "e3", "ea", "each", "ec", "ed", "edu", "ee", "ef", "effect", "eg", "ei", "eight", "eighty", "either", "ej", "el", "eleven", "else", "elsewhere", "em", "empty", "en", "end", "ending", "enough", "entirely", "eo", "ep", "eq", "er", "es", "especially", "est", "et", 
            "et-al", "etc", "eu", "ev", "even", "ever", "every", "everybody", "everyone", "everything", "everywhere", "ex", "exactly", "example", "except", "ey", "f", "f2", "fa", "far", "fc", "few", "ff", "fi", "fifteen", "fifth", "fify", "fill", "find", "fire", "first", "five", "fix", "fj", "fl", "fn", "fo", "followed", "following", "follows", "for", "former", "formerly", "forth", "forty", "found", "four", "fr", "from", "front", "fs", "ft", "fu", "full", "further", "furthermore", "fy", "g", "ga", "gave", "ge", "get", "gets", "getting", "gi", "give", "given", "gives", "giving", "gj", "gl", "go", "goes", "going", "gone", "got", "gotten", "gr", "greetings", "gs", "gy", "h", "h2", "h3", "had", "hadn", "hadn't", "happens", "hardly", "has", "hasn", 
            "hasnt", "hasn't", "have", "haven", "haven't", "having", "he", "hed", "he'd", "he'll", "hello", "help", "hence", "her", "here", "hereafter", "hereby", "herein", "heres", "here's", "hereupon", "hers", "herself", "hes", "he's", "hh", "hi", "hid", "him", "himself", "his", "hither", "hj", "ho", "home", "hopefully", "how", "howbeit", "however", "how's", "hr", "hs", "http", "hu", "hundred", "hy", "i", "i2", "i3", "i4", "i6", "i7", "i8", "ia", "ib", "ibid", "ic", "id", "i'd", "ie", "if", "ig", "ignored", "ih", "ii", "ij", "il", "i'll", "im", "i'm", "immediate", "immediately", "importance", "important", "in", "inasmuch", "inc", "indeed", "index", "indicate", "indicated", "indicates", "information", "inner", "insofar", "instead", "interest", "into", 
            "invention", "inward", "io", "ip", "iq", "ir", "is", "isn", "isn't", "it", "itd", "it'd", "it'll", "its", "it's", "itself", "iv", "i've", "ix", "iy", "iz", "j", "jj", "jr", "js", "jt", "ju", "just", "k", "ke", "keep", "keeps", "kept", "kg", "kj", "km", "know", "known", "knows", "ko", "l", "l2", "la", "largely", "last", "lately", "later", "latter", "latterly", "lb", "lc", "le", "least", "les", "less", "lest", "let", "lets", "let's", "lf", "like", "liked", "likely", "line", "little", "lj", "ll", "ll", "ln", "lo", "look", "looking", "looks", "los", "lr", "ls", "lt", "ltd", "m", "m2", "ma", "made", "mainly", "make", "makes", "many", "may", "maybe", "me", "mean", "means", "meantime", "meanwhile", "merely", "mg", "might", "mightn", "mightn't", "mill", 
            "million", "mine", "miss", "ml", "mn", "mo", "more", "moreover", "most", "mostly", "move", "mr", "mrs", "ms", "mt", "mu", "much", "mug", "must", "mustn", "mustn't", "my", "myself", "n", "n2", "na", "name", "namely", "nay", "nc", "nd", "ne", "near", "nearly", "necessarily", "necessary", "need", "needn", "needn't", "needs", "neither", "never", "nevertheless", "new", "next", "ng", "ni", "nine", "ninety", "nj", "nl", "nn", "no", "nobody", "non", "none", "nonetheless", "noone", "nor", "normally", "nos", "not", "noted", "nothing", "novel", "now", "nowhere", "nr", "ns", "nt", "ny", "o", "oa", "ob", "obtain", "obtained", "obviously", "oc", "od", "of", "off", "often", "og", "oh", "oi", "oj", "ok", "okay", "ol", "old", "om", "omitted", "on", "once", "one", "ones", "only", "onto", "oo", "op", "oq", "or", "ord", "os", "ot", "other", "others", "otherwise", "ou",
            "ought", "our", "ours", "ourselves", "out", "outside", "over", "overall", "ow", "owing", "own", "ox", "oz", "p", "p1", "p2", "p3", "page", "pagecount", "pages", "par", "part", "particular", "particularly", "pas", "past", "pc", "pd", "pe", "per", "perhaps", "pf", "ph", "pi", "pj", "pk", "pl", "placed", "please", "plus", "pm", "pn", "po", "poorly", "possible", "possibly", "potentially", "pp", "pq", "pr", "predominantly", "present", "presumably", "previously", "primarily", "probably", "promptly", "proud", "provides", "ps", "pt", "pu", "put", "py", "q", "qj", "qu", "que", "quickly", "quite", "qv", "r", "r2", "ra", "ran", "rather", "rc", "rd", "re",
            "readily", "really", "reasonably", "recent", "recently", "ref", "refs", "regarding", "regardless", "regards", "related", "relatively", "research", "research-articl", "respectively", "resulted", "resulting", "results", "rf", "rh", "ri", "right", "rj", "rl", "rm", "rn", "ro", "rq", "rr", "rs", "rt", "ru", "run", "rv", "ry", "s", "s2", "sa", "said", "same", "saw", "say", "saying", "says", "sc", "sd", "se", "sec", "second", "secondly", "section", "see", "seeing", "seem", "seemed", "seeming", "seems", "seen", "self", "selves", "sensible", "sent", "serious", "seriously", "seven", "several", "sf", "shall", "shan", "shan't", "she", "shed", "she'd", "she'll", "shes", "she's", "should", "shouldn", "shouldn't", "should've", "show", "showed", "shown", "showns", "shows", "si", "side", "significant", "significantly", "similar", "similarly", "since", "sincere", "six", "sixty", "sj", "sl", "slightly", "sm", "sn", "so", "some", "somebody", "somehow", "someone", "somethan", "something", "sometime", "sometimes", "somewhat", "somewhere", "soon", "sorry", "sp", 
            "specifically", "specified", "specify", "specifying", "sq", "sr", "ss", "st", "still", "stop", "strongly", "sub", "substantially", "successfully", "such", "sufficiently", "suggest", "sup", "sure", "sy", "system", "sz", "t", "t1", "t2", "t3", "take", "taken", "taking", "tb", "tc", "td", "te", "tell", "ten", "tends", "tf", "th", "than", "thank", "thanks", "thanx", "that", "that'll", "thats", "that's", "that've", "the", "their", "theirs", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "thered", "therefore", "therein", "there'll", "thereof", "therere", "theres", "there's", "thereto", "thereupon", "there've", "these", "they", "theyd", "they'd", "they'll", "theyre", "they're", "they've", "thickv", "thin", "think", "third", "this", "thorough", "thoroughly", "those", "thou", "though", 
            "thoughh", "thousand", "three", "throug", "through", "throughout", "thru", "thus", "ti", "til", "tip", "tj", "tl", "tm", "tn", "to", "together", "too", "took", "top", "toward", "towards", "tp", "tq", "tr", "tried", "tries", "truly", "try", "trying", "ts", "t's", "tt", "tv", "twelve", "twenty", "twice", "two", "tx", "u", "u201d", "ue", "ui", "uj", "uk", "um", "un", "under", "unfortunately", "unless", "unlike", "unlikely", "until", "unto", "uo", "up", "upon", "ups", "ur", "us", "use", "used", "useful", "usefully", "usefulness", "uses", "using", "usually", "ut", "v", "va", "value", "various", "vd", "ve", "ve", "very", "via", "viz", "vj", "vo", "vol", "vols", "volumtype", "vq", "vs", "vt", "vu", "w", "wa", "want", "wants", "was", "wasn", "wasnt", "wasn't", "way", "we", "wed", "we'd", "welcome", "well", "we'll", "well-b", "went", "were", "we're", "weren", "werent", "weren't", "we've", "what", "whatever", "what'll", "whats", "what's", "when", "whence", "whenever", "when's", "where", "whereafter", "whereas", "whereby", "wherein", "wheres", "where's", "whereupon", "wherever", "whether", "which", "while", "whim", "whither", "who", "whod", "whoever", "whole", "who'll", "whom", "whomever", "whos", "who's", "whose", "why", "why's", "wi", "widely", "will", "willing", "wish", "with", "within", "without", "wo", "won", "wonder", "wont", "won't", "words", "world", "would", "wouldn", "wouldnt", "wouldn't", "www", "x", "x1", "x2", "x3", "xf", "xi", "xj", "xk", "xl", "xn", "xo", "xs", "xt", "xv", "xx", "y", "y2", "yes", "yet", "yj", "yl", "you", "youd", "you'd", "you'll", "your", "youre", "you're", "yours", "yourself", "yourselves", "you've", "yr", "ys", "yt", "z", "zero", "zi", "zz",
        ];
        return filter_words
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

    format_data_size(size){
        if(bigInt(size).greater(bigInt(1024).pow(8))){
            var mod = bigInt(size).mod(bigInt(1024).pow(8)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(8)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'YBs'}
        }
        else if(bigInt(size).greater(bigInt(1024).pow(7))){
            var mod = bigInt(size).mod(bigInt(1024).pow(7)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(7)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'ZBs'}
        }
        else if(bigInt(size).greater(bigInt(1024).pow(6))){
            var mod = bigInt(size).mod(bigInt(1024).pow(6)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(6)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'EBs'}
        }
        else if(bigInt(size).greater(bigInt(1024).pow(5))){
            var mod = bigInt(size).mod(bigInt(1024).pow(5)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(5)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'PBs'}
        }
        else if(size > (1024*1024*1024*1024)){
            return {'size':parseFloat(size/(1024*1024*1024*1024)).toFixed(3), 'unit':'TBs'}
        }
        else if(size > (1024*1024*1024)){
            return {'size':parseFloat(size/(1024*1024*1024)).toFixed(3), 'unit':'GBs'}
        }
        else if(size > (1024*1024)){
            return {'size':parseFloat(size/(1024*1024)).toFixed(3), 'unit':'MBs'}
        }
        else if(size > 1024){
            return {'size':parseFloat(size/1024).toFixed(3), 'unit':'KBs'}
        }
        else{
            return {'size':size, 'unit':'bytes'}
        }
    }

    get_cid_split(ecid){
        var split_cid_array = ecid.split('_');
        var filetype = split_cid_array[0]
        var cid_with_storage = split_cid_array[1]
        var cid = cid_with_storage
        var storage = 'ch'
        if(cid_with_storage.includes('.')){
            var split_cid_array2 = cid_with_storage.split('.')
            cid = split_cid_array2[0]
            storage = split_cid_array2[1]
        }

        return{'filetype':filetype, 'cid':cid, 'storage':storage, 'full':ecid}
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



export default PostDetailSection;