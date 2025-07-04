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
                    <JobDetailsSection ref={this.curent_post_section} app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_job_post_item={this.props.selected_job_post_item} work_page_tags_object={this.props.work_page_tags_object} viewed_jobs={this.props.viewed_jobs} show_images={this.props.show_images.bind(this)} open_respond_to_job_ui={this.props.open_respond_to_job_ui.bind(this)} view_application_contract={this.props.view_application_contract.bind(this)} add_job_message_to_stack_object={this.props.add_job_message_to_stack_object.bind(this)} notify={this.props.notify.bind(this)} get_job_items={this.props.get_job_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} get_job_objects_responses={this.props.get_job_objects_responses.bind(this)} get_objects_messages={this.props.get_objects_messages.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} pin_job={this.props.pin_job.bind(this)} open_e5_link={this.props.open_e5_link.bind(this)} view_number={this.props.view_number.bind(this)} delete_message_from_stack={this.props.delete_message_from_stack.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)} block_post={this.props.block_post.bind(this)} when_zip_file_opened={this.props.when_zip_file_opened.bind(this)} follow_unfollow_post_author={this.props.follow_unfollow_post_author.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)}
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
                    viewed_contracts={this.props.viewed_contracts} open_new_proposal_ui={this.props.open_new_proposal_ui.bind(this)} open_modify_contract_ui={this.props.open_modify_contract_ui.bind(this)} open_force_exit_ui={this.props.open_force_exit_ui.bind(this)} open_archive_proposal_ui={this.props.open_archive_proposal_ui.bind(this)} open_moderator_ui={this.props.open_moderator_ui.bind(this)} get_contract_items={this.props.get_contract_items.bind(this)} get_contract_event_data={this.props.get_contract_event_data.bind(this)} get_moderator_event_data={this.props.get_moderator_event_data.bind(this)} pin_contract={this.props.pin_contract.bind(this)} view_number={this.props.view_number.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)}
                    />
                )
            }
            else if(selected_tag == this.props.app_state.loc['1199']/* 'proposals' */ ){
                return(
                    <ProposalDetailsSection app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} show_images={this.props.show_images.bind(this)} selected_proposal_item={this.props.selected_proposal_item} viewed_proposals={this.props.viewed_proposals} work_page_tags_object={this.props.work_page_tags_object} open_vote_proposal_ui={this.props.open_vote_proposal_ui.bind(this)} open_sumbit_proposal_ui={this.props.open_sumbit_proposal_ui.bind(this)} open_archive_proposal_ui={this.props.open_archive_proposal_ui.bind(this)} add_proposal_message_to_stack_object={this.props.add_proposal_message_to_stack_object.bind(this)} notify={this.props.notify.bind(this)} get_proposal_items={this.props.get_proposal_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} get_objects_messages={this.props.get_objects_messages.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} get_proposal_event_data={this.props.get_proposal_event_data.bind(this)} pin_proposal={this.props.pin_proposal.bind(this)} open_e5_link={this.props.open_e5_link.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} view_number={this.props.view_number.bind(this)} delete_message_from_stack={this.props.delete_message_from_stack.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)} when_zip_file_opened={this.props.when_zip_file_opened.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)}
                    
                    />
                )
            }
            else if(selected_tag == this.props.app_state.loc['1200']/* 'subscriptions' */ ){
                return(
                    <SubscriptionDetailsSection ref={this.curent_post_section} app_state={this.props.app_state}  height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} notify={this.props.notify.bind(this)}
                    selected_subscription_item={this.props.selected_subscription_item} work_page_tags_object={this.props.work_page_tags_object} viewed_subscriptions={this.props.viewed_subscriptions} open_pay_subscription_ui={this.props.open_pay_subscription_ui.bind(this)} open_cancel_subscription_ui={this.props.open_cancel_subscription_ui.bind(this)} open_collect_subscription_ui={this.props.open_collect_subscription_ui.bind(this)} open_modify_subscription_ui={this.props.open_modify_subscription_ui.bind(this)} open_moderator_ui={this.props.open_moderator_ui.bind(this)} get_subscription_items={this.props.get_subscription_items.bind(this)} get_subscription_event_data={this.props.get_subscription_event_data.bind(this)} get_moderator_event_data={this.props.get_moderator_event_data.bind(this)} get_accounts_payment_information={this.props.get_accounts_payment_information.bind(this)} pin_subscription={this.props.pin_subscription.bind(this)} view_number={this.props.view_number.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)}
                    />
                )
            }
            else if(selected_tag == this.props.app_state.loc['1264s']/* 'nitro' */){
                return(
                    <NitroDetailsSection ref={this.curent_post_section} app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_nitro_item={this.props.selected_nitro_item} viewed_nitros={this.props.viewed_nitros} work_page_tags_object={this.props.work_page_tags_object} show_images={this.props.show_images.bind(this)} add_nitro_reply_to_stack={this.props.add_nitro_reply_to_stack.bind(this)} notify={this.props.notify.bind(this)} get_nitro_items={this.props.get_nitro_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} get_objects_messages={this.props.get_objects_messages.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} pin_nitro={this.props.pin_nitro.bind(this)} view_number={this.props.view_number.bind(this)} delete_message_from_stack={this.props.delete_message_from_stack.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)} show_buy_nitro_storage_bottomsheet={this.props.show_buy_nitro_storage_bottomsheet.bind(this)} show_configure_nitro_node_bottomsheet={this.props.show_configure_nitro_node_bottomsheet.bind(this)} load_my_account_storage_info={this.props.load_my_account_storage_info.bind(this)} open_pay_subscription_ui={this.props.open_pay_subscription_ui.bind(this)} when_zip_file_opened={this.props.when_zip_file_opened.bind(this)} connect_to_node={this.props.connect_to_node.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)}
                    />
                )
            }
            else if(selected_tag == this.props.app_state.loc['1201']/* 'mail' */){
                return(
                    <MailDetailsSection ref={this.curent_post_section} app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_mail_item={this.props.selected_mail_item} work_page_tags_object={this.props.work_page_tags_object} show_images={this.props.show_images.bind(this)} notify={this.props.notify.bind(this)} add_mail_to_stack_object={this.props.add_mail_to_stack_object.bind(this)} get_mail_items={this.props.get_mail_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} open_e5_link={this.props.open_e5_link.bind(this)} view_number={this.props.view_number.bind(this)} delete_message_from_stack={this.props.delete_message_from_stack.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)} when_zip_file_opened={this.props.when_zip_file_opened.bind(this)} get_mail_messages={this.props.get_mail_messages.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)}
                    
                    />
                )
            }
            else if(selected_tag == this.props.app_state.loc['1198']/* 'contractors' */){
                return(
                    <ContractorDetailsSection ref={this.curent_post_section} app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_contractor_item={this.props.selected_contractor_item} work_page_tags_object={this.props.work_page_tags_object} viewed_contractors={this.props.viewed_contractors} show_images={this.props.show_images.bind(this)}  notify={this.props.notify.bind(this)} open_send_job_request_ui={this.props.open_send_job_request_ui.bind(this)} open_view_job_request_ui={this.props.open_view_job_request_ui} open_view_contract_ui={this.props.open_view_contract_ui.bind(this)} get_contractor_items={this.props.get_contractor_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} get_contractor_applications={this.props.get_contractor_applications.bind(this)} pin_contractor={this.props.pin_contractor.bind(this)} open_e5_link={this.props.open_e5_link.bind(this)} view_number={this.props.view_number.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)} block_post={this.props.block_post.bind(this)} when_zip_file_opened={this.props.when_zip_file_opened.bind(this)}
                    follow_unfollow_post_author={this.props.follow_unfollow_post_author.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)}
                    />
                )
            }
        }
        else if(selected_page == 'e'){
            var selected_tag = this.props.detail_selected_tag
            if(selected_tag == this.props.app_state.loc['1212']/* 'E5s' */ || selected_tag == 'e' || selected_tag == null){
                return(
                    <E5DetailsSection ref={this.curent_post_section} app_state={this.props.app_state}  height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} notify={this.props.notify.bind(this)} selected_e5_item={this.props.selected_e5_item} explore_page_tags_object={this.props.explore_page_tags_object} show_withdraw_ether_bottomsheet={this.props.show_withdraw_ether_bottomsheet.bind(this)} get_e5_data={this.props.get_e5_data.bind(this)} view_number={this.props.view_number.bind(this)} hash_data_with_specific_e5={this.props.hash_data_with_specific_e5.bind(this)}
                    
                    />
                )
            }
            else if(selected_tag == this.props.app_state.loc['1213']/* 'posts' */ ){
                return(
                    <PostsDetailsSection ref={this.curent_post_section} app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_post_item={this.props.selected_post_item} viewed_posts={this.props.viewed_posts} explore_page_tags_object={this.props.explore_page_tags_object} show_images={this.props.show_images.bind(this)} add_post_reply_to_stack={this.props.add_post_reply_to_stack.bind(this)} notify={this.props.notify.bind(this)} get_post_items={this.props.get_post_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} open_award_ui={this.props.open_award_ui.bind(this)} get_objects_messages={this.props.get_objects_messages.bind(this)} get_post_award_data={this.props.get_post_award_data.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} pin_post={this.props.pin_post.bind(this)} open_e5_link={this.props.open_e5_link.bind(this)} view_number={this.props.view_number.bind(this)} delete_message_from_stack={this.props.delete_message_from_stack.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)} block_post={this.props.block_post.bind(this)} when_zip_file_opened={this.props.when_zip_file_opened.bind(this)}
                    follow_unfollow_post_author={this.props.follow_unfollow_post_author.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} repost_post={this.props.repost_post.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)}
                    />
                )
            }
            else if(selected_tag == this.props.app_state.loc['1214']/* 'channels' */ ){
                return(
                    <ChannelDetailsSection ref={this.curent_post_section} app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_channel_item={this.props.selected_channel_item} viewed_channels={this.props.viewed_channels} explore_page_tags_object={this.props.explore_page_tags_object} show_images={this.props.show_images.bind(this)} notify={this.props.notify.bind(this)} add_channel_message_to_stack_object={this.props.add_channel_message_to_stack_object.bind(this)} open_moderator_ui={this.props.open_moderator_ui.bind(this)} get_channel_items={this.props.get_channel_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} get_objects_messages={this.props.get_objects_messages.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} get_moderator_event_data={this.props.get_moderator_event_data.bind(this)} pin_channel={this.props.pin_channel.bind(this)} get_channel_event_data={this.props.get_channel_event_data.bind(this)} open_e5_link={this.props.open_e5_link.bind(this)} view_number={this.props.view_number.bind(this)} delete_message_from_stack={this.props.delete_message_from_stack.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)} when_zip_file_opened={this.props.when_zip_file_opened.bind(this)}
                    follow_unfollow_post_author={this.props.follow_unfollow_post_author.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)} open_stage_creator_ui={this.props.open_stage_creator_ui.bind(this)} show_dialog_bottomsheet={this.props.show_dialog_bottomsheet.bind(this)}
                    />
                )
            }
            else if(selected_tag == this.props.app_state.loc['1215']/* 'storefront' */){
                return(
                    <StorefrontDetailsSection ref={this.curent_post_section} app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_storefront_item={this.props.selected_storefront_item} explore_page_tags_object={this.props.explore_page_tags_object} show_images={this.props.show_images.bind(this)} notify={this.props.notify.bind(this)} viewed_stores={this.props.viewed_stores} open_add_to_bag={this.props.open_add_to_bag.bind(this)} open_fulfil_bag_request={this.props.open_fulfil_bag_request.bind(this)} open_direct_purchase={this.props.open_direct_purchase.bind(this)} open_clear_purchase={this.props.open_clear_purchase.bind(this)} add_storefront_message_to_stack_object={this.props.add_storefront_message_to_stack_object.bind(this)} get_storefront_items={this.props.get_storefront_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} pin_item={this.props.pin_item.bind(this)} open_e5_link={this.props.open_e5_link.bind(this)} view_number={this.props.view_number.bind(this)} delete_message_from_stack={this.props.delete_message_from_stack.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)} block_post={this.props.block_post.bind(this)} when_zip_file_opened={this.props.when_zip_file_opened.bind(this)}
                    follow_unfollow_post_author={this.props.follow_unfollow_post_author.bind(this)} show_dialog_bottomsheet={this.props.show_dialog_bottomsheet.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)} when_catalogue_storefront_item_clicked={this.props.when_catalogue_storefront_item_clicked.bind(this)}
                    />
                )
            }
            else if(selected_tag == this.props.app_state.loc['1216']/* 'bags' */){
                return(
                    <BagDetailsSection ref={this.curent_post_section} app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_bag_item={this.props.selected_bag_item} explore_page_tags_object={this.props.explore_page_tags_object} show_images={this.props.show_images.bind(this)} notify={this.props.notify.bind(this)} viewed_bags={this.props.viewed_bags} open_fulfil_bag_request={this.props.open_fulfil_bag_request.bind(this)} view_bag_application_contract={this.props.view_bag_application_contract.bind(this)} add_bag_message_to_stack_object={this.props.add_bag_message_to_stack_object.bind(this)} get_bag_items={this.props.get_bag_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} get_job_objects_responses={this.props.get_job_objects_responses.bind(this)} get_objects_messages={this.props.get_objects_messages.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} pin_bag={this.props.pin_bag.bind(this)} view_number={this.props.view_number.bind(this)} delete_message_from_stack={this.props.delete_message_from_stack.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)} follow_unfollow_post_author={this.props.follow_unfollow_post_author.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)}
                    
                    />
                )
            }
            else if(selected_tag == this.props.app_state.loc['1264k']/* 'audioport' */ ){
                return(
                    <AudioDetailSection ref={this.curent_post_section} app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_audio_item={this.props.selected_audio_item} viewed_audios={this.props.viewed_audios} explore_page_tags_object={this.props.explore_page_tags_object} show_images={this.props.show_images.bind(this)} add_audio_reply_to_stack={this.props.add_audio_reply_to_stack.bind(this)} notify={this.props.notify.bind(this)} get_audio_items={this.props.get_audio_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} open_award_ui={this.props.open_award_ui.bind(this)} get_objects_messages={this.props.get_objects_messages.bind(this)} get_post_award_data={this.props.get_post_award_data.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} pin_audio={this.props.pin_audio.bind(this)} open_e5_link={this.props.open_e5_link.bind(this)} view_number={this.props.view_number.bind(this)} delete_message_from_stack={this.props.delete_message_from_stack.bind(this)} open_purchase_album_ui={this.props.open_purchase_album_ui.bind(this)} play_song={this.props.play_song.bind(this)} get_page_id={this.props.get_page_id.bind(this)} show_dialog_bottomsheet={this.props.show_dialog_bottomsheet.bind(this)} play_song_in_playlist={this.props.play_song_in_playlist.bind(this)} update_order_of_songs_in_playlist={this.props.update_order_of_songs_in_playlist.bind(this)} download_playlist={this.props.download_playlist.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)} block_post={this.props.block_post.bind(this)} when_discography_audio_item_clicked={this.props.when_discography_audio_item_clicked.bind(this)} when_zip_file_opened={this.props.when_zip_file_opened.bind(this)} follow_unfollow_post_author={this.props.follow_unfollow_post_author.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} repost_audiopost={this.props.repost_audiopost.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)}
                    />
                )
            }
            else if(selected_tag == this.props.app_state.loc['1264p']/* 'videoport' */ ){
                return(
                    <VideoDetailsSection ref={this.curent_post_section} app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_video_item={this.props.selected_video_item} viewed_videos={this.props.viewed_videos} explore_page_tags_object={this.props.explore_page_tags_object} show_images={this.props.show_images.bind(this)} add_video_reply_to_stack={this.props.add_video_reply_to_stack.bind(this)} notify={this.props.notify.bind(this)} get_video_items={this.props.get_video_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} open_award_ui={this.props.open_award_ui.bind(this)} get_objects_messages={this.props.get_objects_messages.bind(this)} get_post_award_data={this.props.get_post_award_data.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)} pin_video={this.props.pin_video.bind(this)} view_number={this.props.view_number.bind(this)} delete_message_from_stack={this.props.delete_message_from_stack.bind(this)} open_purchase_video_ui={this.props.open_purchase_video_ui.bind(this)} play_video={this.props.play_video.bind(this)} get_page_id={this.props.get_page_id.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)} block_post={this.props.block_post.bind(this)} when_discography_video_item_clicked={this.props.when_discography_video_item_clicked.bind(this)} when_zip_file_opened={this.props.when_zip_file_opened.bind(this)} follow_unfollow_post_author={this.props.follow_unfollow_post_author.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} repost_videopost={this.props.repost_videopost.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)}
                    />
                )
            }
            else if(selected_tag == this.props.app_state.loc['1264ao']/* 'polls' */){
                return(
                    <PollDetailsSection ref={this.curent_post_section} app_state={this.props.app_state} width={this.props.width} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_poll_item={this.props.selected_poll_item} viewed_polls={this.props.viewed_polls} explore_page_tags_object={this.props.explore_page_tags_object} show_images={this.props.show_images.bind(this)}  notify={this.props.notify.bind(this)} get_poll_items={this.props.get_poll_items.bind(this)} add_id_to_contacts={this.props.add_id_to_contacts.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} pin_poll={this.props.pin_poll.bind(this)} view_number={this.props.view_number.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)} when_zip_file_opened={this.props.when_zip_file_opened.bind(this)}  when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} open_vote_in_poll_ui={this.props.open_vote_in_poll_ui.bind(this)} show_view_calculate_poll_result_bottomsheet={this.props.show_view_calculate_poll_result_bottomsheet.bind(this)} show_dialog_bottomsheet={this.props.show_dialog_bottomsheet.bind(this)}
                    select_deselect_tag={this.props.select_deselect_tag.bind(this)}
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
                    app_state={this.props.app_state} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_coin_item={this.props.selected_coin_item} notify={this.props.notify.bind(this)} view_number={this.props.view_number.bind(this)} open_wallet_guide_bottomsheet={this.props.open_wallet_guide_bottomsheet.bind(this)} start_send_receive_coin_bottomsheet={this.props.start_send_receive_coin_bottomsheet.bind(this)} update_coin_balances={this.props.update_coin_balances.bind(this)}/>
                )
            }
            else if(selected_option_name == this.props.app_state.loc['1217']/* 'ethers ⚗️' */){
                return(
                    <EthersDetailsSection  app_state={this.props.app_state} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_ether_item={this.props.selected_ether_item} notify={this.props.notify.bind(this)} open_send_receive_ether_bottomsheet={this.props.open_send_receive_ether_bottomsheet.bind(this)} open_wallet_guide_bottomsheet={this.props.open_wallet_guide_bottomsheet.bind(this)} open_rpc_settings={this.props.open_rpc_settings.bind(this)} get_wallet_data_for_specific_e5={this.props.get_wallet_data_for_specific_e5.bind(this)} view_number={this.props.view_number.bind(this)}/>
                )
            }
            else if(selected_option_name == this.props.app_state.loc['1218']/* 'ends ☝️' */ ){
                return(
                    <EndDetailsSection ref={this.curent_post_section} app_state={this.props.app_state} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_end_item={this.props.selected_end_item} open_mint_burn_token_ui={this.props.open_mint_burn_token_ui.bind(this)} open_transfer_ui={this.props.open_transfer_ui.bind(this)} open_modify_token_ui={this.props.open_modify_token_ui.bind(this)} open_exchange_transfers_ui={this.props.open_exchange_transfers_ui.bind(this)} open_freeze_unfreeze_ui={this.props.open_freeze_unfreeze_ui.bind(this)} open_moderator_ui={this.props.open_moderator_ui.bind(this)} get_exchange_tokens={this.props.get_exchange_tokens.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} get_exchange_event_data={this.props.get_exchange_event_data.bind(this)} get_moderator_event_data={this.props.get_moderator_event_data.bind(this)} show_depthmint_bottomsheet={this.props.show_depthmint_bottomsheet.bind(this)} view_number={this.props.view_number.bind(this)} open_royalty_staging_ui={this.props.open_royalty_staging_ui.bind(this)} view_royalty_staging={this.props.view_royalty_staging.bind(this)}
                    
                    load_exchanges_royalty_event_data={this.props.load_exchanges_royalty_event_data.bind(this)}
                    load_exchanges_royalty_payout_event_data={this.props.load_exchanges_royalty_payout_event_data.bind(this)} 
                    />
                )
            }
            else if(selected_option_name == this.props.app_state.loc['1219']/* 'spends 🫰' */ ){
                return(
                    <SpendDetailSection ref={this.curent_post_section} app_state={this.props.app_state} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_spend_item={this.props.selected_spend_item} open_mint_burn_token_ui={this.props.open_mint_burn_token_ui.bind(this)} open_transfer_ui={this.props.open_transfer_ui.bind(this)} open_modify_token_ui={this.props.open_modify_token_ui.bind(this)} open_exchange_transfers_ui={this.props.open_exchange_transfers_ui.bind(this)} open_freeze_unfreeze_ui={this.props.open_freeze_unfreeze_ui.bind(this)} open_authmint_ui={this.props.open_authmint_ui.bind(this)} open_moderator_ui={this.props.open_moderator_ui.bind(this)} get_exchange_tokens={this.props.get_exchange_tokens.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} get_exchange_event_data={this.props.get_exchange_event_data.bind(this)} get_moderator_event_data={this.props.get_moderator_event_data.bind(this)} view_number={this.props.view_number.bind(this)}/>
                )
            }
            else if(selected_option_name == this.props.app_state.loc['1264aj']/* 'bills' */){
                return(
                    <BillDetailsSection
                        app_state={this.props.app_state} height={this.props.height} theme={this.props.theme} screensize={this.props.screensize} selected_bill_item={this.props.selected_bill_item} notify={this.props.notify.bind(this)} view_number={this.props.view_number.bind(this)} pin_bill={this.props.pin_bill.bind(this)} get_bill_items={this.props.get_bill_items.bind(this)} show_dialog_bottomsheet={this.props.show_dialog_bottomsheet.bind(this)} perform_bill_object_payment_search={this.props.perform_bill_object_payment_search.bind(this)} when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)}
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
        this.curent_post_section.current?.reset_tags()
    }

}



export default PostDetailSection;