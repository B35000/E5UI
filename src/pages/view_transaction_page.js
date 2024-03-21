import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import Letter from './../assets/letter.png'; 
import Dialog from "@mui/material/Dialog";

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import EndImg from './../assets/end_token_icon.png';
import SpendImg from './../assets/spend_token_icon.png';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function start_and_end(str) {
  if (str.length > 35) {
    return str.substr(0, 20) + '...' + str.substr(str.length-10, str.length);
  }
  return str;
}

class ViewTransactionPage extends Component {
    
    state = {
        selected: 0, transaction_object:null, transaction_index: -1, view_transactions_page_tags_object: this.get_view_transactions_page_tags_object(), confirm_delete_dialog_box: false
    };

    get_view_transactions_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1781']/* 'view-transaction' */], [1]
            ],
        };
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                
                {this.render_everything()}
                {this.render_transaction_details()}
            </div>
        )
    }

    set_transaction(transaction, index){
        this.setState({transaction_object: transaction, transaction_index: index})
    }

    when_view_transactions_page_tags_object_updated(tag_obj){
        this.setState({view_transactions_page_tags_object: tag_obj})
    }





    render_transaction_details(){
        var item = this.props.app_state.stack_items[this.state.transaction_index]
        if(item != null){
            return(
                <div>
                    {this.render_detail_item('3',{'title':this.props.app_state.loc['1782']/* 'Stack ID: ' */, 'details':item.id,'size':'l'})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3',{'title':this.props.app_state.loc['1783']/* 'Type:' */, 'details':''+item.type,'size':'l'})}
                    {/* {this.render_detail_item('3',{'title':'Estimated Gas: ', 'details':number_with_commas(this.get_estimated_gas(item))+' - '+number_with_commas(Math.floor(this.get_estimated_gas(item)*1.6)),'size':'l'})} */}
                    
                    {this.render_detail_item('0')}
                    {this.render_edit_button()}

                    
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['1784']/* 'Delete the transaction completely' */, 'title':this.props.app_state.loc['1785']/* 'Delete' */})}
                    <div style={{height:20}}/>

                    <div onClick={()=> this.open_dialog_ui()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['1785']/* 'Delete' */, 'action':''},)}
                    </div>

                    <div style={{height:20}}/>
                    {this.render_hide_transaction_button()}

                    {this.render_dialog_ui()}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }


    open_dialog_ui(){
        this.setState({confirm_delete_dialog_box: true})
    }

    render_dialog_ui(){
        return(
            <Dialog PaperProps={{ sx: { borderRadius: "15px" } }} onClose = {() => this.cancel_dialog_box()} open = {this.state.confirm_delete_dialog_box}>
                <div style={{'padding': '10px', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                    <div style={{width:300}}/>

                    <h5 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color'], 'font-family': this.props.app_state.font}}>{this.props.app_state.loc['1786']/* Confirm Delete Action */}</h5>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1787']/* 'Are you sure?' */, 'details':'You cannot undo this action', 'size':'s'})}
                    <div style={{height:20}}/>

                    <div onClick={()=> this.open_delete_action()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['1785']/* 'Delete' */, 'action':''},)}
                    </div>

                </div>
                
            </Dialog>
        )
    }

    cancel_dialog_box(){
        this.setState({confirm_delete_dialog_box: false})
    }

    render_edit_button(){
        var item = this.props.app_state.stack_items[this.state.transaction_index]
        if(item != null && item.type != this.props.app_state.loc['1509']/* 'mail-messages' */ && item.type != this.props.app_state.loc['1510']/* 'channel-messages' */ && item.type != this.props.app_state.loc['1511']/* 'post-messages' */ && item.type != this.props.app_state.loc['1514']/* 'job-messages' */ && item.type != this.props.app_state.loc['1515']/* 'proposal-messages' */ && item.type != this.props.app_state.loc['19']/* 'exit-contract' */ && item.type != this.props.app_state.loc['783']/* 'submit' */ && item.type != this.props.app_state.loc['829']/* 'collect-subscription' */ && item.type != this.props.app_state.loc['1513']/* 'accept-job-application' */ && item.type != this.props.app_state.loc['1516']/* 'storefront-bag' */ && item.type != this.props.app_state.loc['1126']/* 'bag-response' */ && item.type != this.props.app_state.loc['1498']/* 'accept-bag-application' */ && item.type != this.props.app_state.loc['1500']/* 'clear-purchase' */ && item.type != this.props.app_state.loc['1505']/* 'job-request-messages' */ && item.type != this.props.app_state.loc['1506']/* 'alias' */ && item.type != this.props.app_state.loc['1507']/* 'unalias' */ && item.type != this.props.app_state.loc['1508']/* 're-alias' */){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['1788']/* 'Make some changes to the transaction' */, 'title':this.props.app_state.loc['1789']/* 'Edit' */})}
                    <div style={{height:10}}/>

                    <div onClick={()=> this.open_edit_object_uis()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['1789']/* 'Edit' */, 'action':''},)}
                    </div>
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    render_hide_transaction_button(){
        var item = this.props.app_state.stack_items[this.state.transaction_index]

        var op = this.props.app_state.hidden.includes(item) ? this.props.app_state.loc['1790']/* 'If set to shown, the transaction will be included during a run' */ : this.props.app_state.loc['1791']/* 'If set to hidden, the transaction will be ignored when running your transactions' */
        var txt = this.props.app_state.hidden.includes(item) ? this.props.app_state.loc['1792']/* 'Show Transaction' */ : this.props.app_state.loc['1793']/* 'Hide Transaction' */
        var status = this.props.app_state.hidden.includes(item) ? this.props.app_state.loc['1794']/* 'The transaction is Hidden' */ : this.props.app_state.loc['1795']/* 'The transaction is Shown' */
        return(
                <div style={{}}>
                    {this.render_detail_item('3', {'size':'l', 'details':op, 'title':txt})}
                    <div style={{height:10}}/>
 
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['1796']/* 'status' */, 'title':status})}

                    <div style={{height:10}}/>
                    <div onClick={()=> this.hide_transaction()}>
                        {this.render_detail_item('5', {'text':txt, 'action':''},)}
                    </div>
                    
                </div>
            )
    }

    open_edit_object_uis(){
        this.props.open_edit_object_uis(this.props.app_state.stack_items[this.state.transaction_index])
    }

    open_delete_action(){
        this.cancel_dialog_box()
        this.props.delete_transaction(this.props.app_state.stack_items[this.state.transaction_index])
        this.props.notify(this.props.app_state.loc['1797']/* 'item deleted from stack' */,600)
    }

    hide_transaction(){
        var item = this.props.app_state.stack_items[this.state.transaction_index]

        var message = this.props.app_state.hidden.includes(item) ? this.props.app_state.loc['1798']/* 'transaction shown' */ : this.props.app_state.loc['1799']/* 'transaction hidden' */
        this.props.show_hide_stack_item(item)
        this.props.notify(message,600)
    }









    render_everything(){
        var tx = this.props.app_state.stack_items[this.state.transaction_index]
        if(tx != null){
            if(tx.type == this.props.app_state.loc['3']/* 'contract' */){
                return(
                    <div>
                        {this.render_contract_data()}
                    </div>
                )  
            }
            else if(tx.type == this.props.app_state.loc['601']/* 'token' */){
                return(
                    <div>
                        {this.render_token_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['823']/* 'subscription' */){
                return(
                    <div>
                        {this.render_subscription_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['297']/* 'post' */){
                return(
                    <div>
                        {this.render_post_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['760']/* 'job' */){
                return(
                    <div>
                        {this.render_job_post_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['109']/* 'channel' */){
                return(
                    <div>
                        {this.render_channel_post_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['439']/* 'storefront-item' */){
                return(
                    <div>
                        {this.render_storefront_post_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['946']/* 'buy-sell' */){
                return(
                    <div>
                        {this.render_buy_sell_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['1018']/* 'transfer' */){
                return(
                    <div>
                        {this.render_transfer_token_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['1']/* 'enter-contract' */){
                return(
                    <div>
                        {this.render_enter_contract_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['35']/* 'extend-contract' */){
                return(
                    <div>
                        {this.render_extend_contract_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['19']/* 'exit-contract' */){
                return(
                    <div>
                        {this.render_exit_contract_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['312']/* 'proposal' */){
                return(
                    <div>
                        {this.render_proposal_data()}                        
                        {this.render_proposal_actions()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['796']/* 'vote' */){
                return(
                    <div>
                        {this.render_vote_object_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['862']/* 'pay-subscription' */){
                return(
                    <div>
                        {this.render_pay_subscription_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['821']/* 'cancel-subscription' */){
                return(
                    <div>
                        {this.render_cancel_subscription_data()}
                    </div>
                )
            } 
            else if(tx.type == this.props.app_state.loc['829']/* 'collect-subscription' */){
                return(
                    <div>
                        {this.render_collect_subscription_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['840']/* 'modify-subscription' */){
                return(
                    <div>
                        {this.render_modify_subscription_data()}
                    </div>
                )
            }   
            else if(tx.type == this.props.app_state.loc['64']/* 'modify-contract' */){
                return(
                    <div>
                        {this.render_modify_contract_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['997']/* 'modify-token' */){
                return(
                    <div>
                        {this.render_modify_token_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['318']/* 'exchange-transfer' */){
                return(
                    <div>
                        {this.render_exchange_transfer_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['48']/* 'force-exit' */){
                return(
                    <div>
                        {this.render_force_exit_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['768']/* 'archive' */){
                return(
                    <div>
                        {this.render_archive_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['930']/* 'freeze/unfreeze' */){
                return(
                    <div>
                        {this.render_freeze_unfreeze_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['880']/* 'authmint' */){
                return(
                    <div>
                        {this.render_authmint_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['1265']/* 'access-rights-settings' */){
                return(
                    <div>
                        {this.render_access_right_setting_data()}
                    </div>
                )   
            }
            else if(tx.type == this.props.app_state.loc['1201']/* 'mail' */){
                return(
                    <div>
                        {this.render_mail_data()}
                    </div>
                )    
            }
            else if(tx.type == this.props.app_state.loc['1509']/* 'mail-messages' */){
                return(
                    <div>
                        {this.render_mail_message_data('Mail Messages')}
                    </div>
                ) 
            }
            else if(tx.type == this.props.app_state.loc['1510']/* 'channel-messages' */){
                return(
                    <div>
                        {this.render_mail_message_data('Channel Messages')}
                    </div>
                )   
            }
            else if(tx.type == this.props.app_state.loc['1511']/* 'post-messages' */){
                return(
                    <div>
                        {this.render_mail_message_data('Post Messages')}
                    </div>
                )   
            }  
            else if(tx.type == this.props.app_state.loc['1512']/* 'job-response' */){
                return(
                    <div>
                        {this.render_job_response_data()}
                    </div>
                )   
            }
            else if(tx.type == this.props.app_state.loc['1513']/* 'accept-job-application' */){
                return(
                    <div>
                        {this.render_accept_job_application_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['1514']/* 'job-messages' */){
                return(
                    <div>
                        {this.render_mail_message_data('Job Messages')}
                    </div>
                )    
            }
            else if(tx.type == this.props.app_state.loc['1515']/* 'proposal-messages' */){
                return(
                    <div>
                        {this.render_mail_message_data('Proposal Messages')}
                    </div>
                )    
            }
            else if(tx.type == this.props.app_state.loc['1516']/* 'storefront-bag' */){
                return(
                    <div>
                        {this.render_storefront_bag_data()}
                    </div>
                )    
            }
            else if(tx.type == this.props.app_state.loc['1126']/* 'bag-response' */){
                return(
                    <div>
                        {this.render_bag_response_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['1498']/* 'accept-bag-application' */){
                return(
                    <div>
                        {this.render_accept_bag_application_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['1499']/* 'direct-purchase' */){
                return(
                    <div>
                        {this.render_direct_purchase_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['1500']/* 'clear-purchase' */){
                return(
                    <div>
                        {this.render_clear_purchase_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['1501']/* 'bag-messages' */){
                return(
                    <div>
                        {this.render_mail_message_data('Bag Messages')}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['1502']/* 'storefront-messages' */){
                return(
                    <div>
                        {this.render_mail_message_data('Storefront Messages')}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['1503']/* 'contractor' */){
                return(
                    <div>
                        {this.render_contractor_post_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['1363']/* 'job-request' */){
                return(
                    <div>
                        {this.render_job_request_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['1504']/* 'accept-job-request' */){
                return(
                    <div>
                        {this.render_accept_job_request_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['1505']/* 'job-request-messages' */){
                return(
                    <div>
                        {this.render_mail_message_data('Job Request Messages')}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['1506']/* 'alias' */){
                return(
                    <div>
                        {this.render_alias_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['1507']/* 'unalias' */){
                return(
                    <div>
                        {this.render_unalias_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['1508']/* 're-alias' */){
                return(
                    <div>
                        {this.render_realias_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['753']/* 'edit-channel' */){
                return(
                    <div>
                        {this.render_edit_channel()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['763']/* 'edit-contractor' */){
                return(
                    <div>
                        {this.render_edit_contractor()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['764']/* 'edit-job' */){
                return(
                    <div>
                        {this.render_edit_job()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['765']/* 'edit-post' */){
                return(
                    <div>
                        {this.render_edit_post()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['766']/* 'edit-storefront' */){
                return(
                    <div>
                        {this.render_edit_storefront()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['2739']/* edit-proposal */){
                return(
                    <div>
                        {this.render_edit_proposal()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['767']/* 'edit-token' */){
                return(
                    <div>
                        {this.render_edit_token()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['1155']/* 'award' */){
                return(
                    <div>
                        {this.render_award_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['898']/* 'depthmint' */){
                return(
                    <div>
                        {this.render_depthmint_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['783']/* submit */){
                return(
                    <div>
                        {this.render_submit_proposal_data()}
                    </div>
                )
            }

        }
    }


    render_contract_data(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-150
        var item = this.get_contract_details_data()
        var object = this.format_contract()
        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 10px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['1800']/* 'The set access rights setting for your new contract' */, 'title':this.get_selected_item(this.props.app_state.stack_items[this.state.transaction_index].new_contract_type_tags_object, 'e')})}
                    <div style={{height: 10}}/>

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

                    {this.load_moderator_accounts()}
                    {this.load_interactable_accounts()}
                </div>
            </div>
        )
    }

    render_buy_token_uis(buy_tokens, buy_amounts, buy_depths){
        var bt = [].concat(buy_tokens)
        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                    {bt.map((item, index) => (
                        <li style={{'padding': '1px'}}>
                            {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['13']/* 'Token ID: ' */+item, 'subtitle':this.format_power_figure(buy_amounts[index]), 'barwidth':this.calculate_bar_width(buy_amounts[index]), 'number':this.format_account_balance_figure(buy_amounts[index]), 'relativepower':this.props.app_state.loc['483']/* 'tokens' */})}
                        </li>
                    ))}
                </ul>
            </div>
            
        )
    }

    format_contract(){
        return{'ipfs':this.props.app_state.stack_items[this.state.transaction_index], 'data':this.format_contract_object(this.props.app_state.stack_items[this.state.transaction_index])}
    }

    get_contract_details_data(){
        var object = this.format_contract()
        var tags = object['ipfs'] == null ? ['Contract'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Contract ID' : object['ipfs'].entered_title_text
        var contract_config = object['data'][1]
        var auto_wait = contract_config[8] == 0 ? this.props.app_state.loc['540']/* 'false' */ :this.props.app_state.loc['541'] /* 'true' */
        var can_modify_contract_as_moderator = contract_config[28] == 0 ? this.props.app_state.loc['540']/* 'false' */ : this.props.app_state.loc['541']/* 'true' */
        var can_extend_enter_contract_at_any_time = contract_config[29] == 0 ? this.props.app_state.loc['540']/* 'false' */ : this.props.app_state.loc['541']/* 'true' */
        var bounty_limit_type = contract_config[37] == 0 ? this.props.app_state.loc['87']/* 'relative'  */: this.props.app_state.loc['88']/* 'absolute' */
        var contract_force_exit_enabled = contract_config[38] == 0 ? this.props.app_state.loc['90']/* 'disabled' */:this.props.app_state.loc['89'] /* 'enabled' */
        return{
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},

            'default_vote_bounty_split_proportion': {'title':this.format_proportion(contract_config[1]), 'details':this.props.app_state.loc['193']/* 'Vote Bounty Split Proportion' */, 'size':'l'},

            'default_minimum_end_vote_bounty_amount':{'style':'l','title':this.props.app_state.loc['200']/* 'Minimum End Bounty Amount' */, 'subtitle':this.format_power_figure(contract_config[4]), 'barwidth':this.calculate_bar_width(contract_config[4]), 'number':this.format_account_balance_figure(contract_config[4]), 'relativepower':this.props.app_state.loc['483']/* 'tokens' */},

            'default_minimum_spend_vote_bounty_amount':{'style':'l','title':this.props.app_state.loc['80']/* 'Minimum Spend Bounty Amount' */, 'subtitle':this.format_power_figure(contract_config[10]), 'barwidth':this.calculate_bar_width(contract_config[10]), 'number':this.format_account_balance_figure(contract_config[10]), 'relativepower':this.props.app_state.loc['483']/* 'tokens' */},

            'default_proposal_expiry_duration_limit': {'title':this.get_time_diff(contract_config[5]), 'details':this.props.app_state.loc['228']/* 'Proposal Expiry Duration Limit' */, 'size':'l'},

            'max_enter_contract_duration': {'title':this.get_time_diff(contract_config[6]), 'details':this.props.app_state.loc['1615']/* 'Max Enter Contract Duration' */, 'size':'l'},

            'auto_wait_for_all_proposals_for_all_voters': {'title':auto_wait, 'details':this.props.app_state.loc['1616']/* 'Auto Wait For All Proposals For All Voters' */, 'size':'l'},

            'proposal_modify_expiry_duration_limit': {'title':this.get_time_diff(contract_config[27]), 'details':this.props.app_state.loc['1617']/* 'Proposal Modify Expiry Duration Limit' */, 'size':'l'},

            'can_modify_contract_as_moderator': {'title':can_modify_contract_as_moderator, 'details':this.props.app_state.loc['1618']/* 'Can Modify Contract As Moderator' */, 'size':'l'},

            'can_extend_enter_contract_at_any_time': {'title':can_extend_enter_contract_at_any_time, 'details':this.props.app_state.loc['1619']/* 'Can Extend Enter Contract At Any Time' */, 'size':'l'},

            'maximum_proposal_expiry_submit_expiry_time_difference': {'title':this.get_time_diff(contract_config[36]), 'details':this.props.app_state.loc['1620']/* 'Maximum Proposal Expiry Submit Expiry Time Difference' */, 'size':'l'},

            'bounty_limit_type': {'title':bounty_limit_type, 'details':this.props.app_state.loc['1621']/* 'Bounty Limit Type' */, 'size':'l'},

            'contract_force_exit_enabled': {'title':contract_force_exit_enabled, 'details':this.props.app_state.loc['1622']/* 'Contract Force Exit' */, 'size':'l'},

            'entry_fees': {'title':this.props.app_state.loc['1623']/* 'Entry Fees' */, 'details':object['data'][2].length+this.props.app_state.loc['1624']/* ' tokens used' */, 'size':'l'},

        }
    }

    format_contract_object(t){
        var default_vote_bounty_split_proportion = t.default_vote_bounty_split_proportion == 0 ? bgN(1,16) : t.default_vote_bounty_split_proportion.toString().toLocaleString('fullwide', {useGrouping:false})
        var max_extend_enter_contract_limit = t.max_extend_enter_contract_limit == 0 ? 36_000_000 : t.max_extend_enter_contract_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        var default_minimum_end_vote_bounty_amount = t.default_minimum_end_vote_bounty_amount == 0 ? 0 : t.default_minimum_end_vote_bounty_amount.toString().toLocaleString('fullwide', {useGrouping:false})
        var default_proposal_expiry_duration_limit = t.default_proposal_expiry_duration_limit == 0 ? 30_000 : t.default_proposal_expiry_duration_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        var max_enter_contract_duration = t.max_enter_contract_duration == 0 ? bgN(1, 16) : t.max_enter_contract_duration.toString().toLocaleString('fullwide', {useGrouping:false})
        var auto_wait_for_all_proposals_for_all_voters = this.get_selected_item(t.auto_wait_tags_object, t.auto_wait_tags_object['i'].active) == this.props.app_state.loc['802']/* 'no' */ ? 0 : 1
        var default_minimum_spend_vote_bounty_amount = t.default_minimum_spend_vote_bounty_amount == 0 ? 0 : t.default_minimum_spend_vote_bounty_amount.toString().toLocaleString('fullwide', {useGrouping:false})
        var proposal_modify_expiry_duration_limit = t.proposal_modify_expiry_duration_limit == 0 ? 3600 : t.proposal_modify_expiry_duration_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        var can_modify_contract_as_moderator = this.get_selected_item(t.can_modify_contract_as_moderator, t.can_modify_contract_as_moderator['i'].active) == this.props.app_state.loc['83']/* 'modifiable' */ ? 1 : 0
        var can_extend_enter_contract_at_any_time = this.get_selected_item(t.can_extend_enter_contract_at_any_time, t.can_extend_enter_contract_at_any_time['i'].active) == this.props.app_state.loc['89']/* 'enabled' */ ? 1 : 0
        var maximum_proposal_expiry_submit_expiry_time_difference = t.maximum_proposal_expiry_submit_expiry_time_difference == 0 ? bgN(1,16).toString().toLocaleString('fullwide', {useGrouping:false}) : t.maximum_proposal_expiry_submit_expiry_time_difference.toString().toLocaleString('fullwide', {useGrouping:false})
        var bounty_limit_type = this.get_selected_item(t.bounty_limit_type, t.bounty_limit_type['i'].active) == 'relative' ? 0 : 1
        var contract_force_exit_enabled = this.get_selected_item(t.contract_force_exit_enabled, t.contract_force_exit_enabled['i'].active) == this.props.app_state.loc['89']/* 'enabled' */ ? 1 : 0

        var obj = [/* create contract */
        [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 30, 0],
        [30], [23],
        [0, bigInt(default_vote_bounty_split_proportion), bigInt(max_extend_enter_contract_limit)/* 2 */, 0, bigInt(default_minimum_end_vote_bounty_amount), bigInt(default_proposal_expiry_duration_limit), bigInt(max_enter_contract_duration)/* 6 */, 0, bigInt(auto_wait_for_all_proposals_for_all_voters), 0, bigInt(default_minimum_spend_vote_bounty_amount), 0, 0, 0/* 13 */, 0, bgN(1, 63), 0,0,0,0,0/* 20 */,0,0,0,0,0,0,bigInt(proposal_modify_expiry_duration_limit)/* 27 */,bigInt(can_modify_contract_as_moderator),bigInt(can_extend_enter_contract_at_any_time),0,0,0,0,0/* 34 */,0,bigInt(maximum_proposal_expiry_submit_expiry_time_difference),bigInt(bounty_limit_type,contract_force_exit_enabled),0,0], 
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

      var final_obj = [
          [30], obj[3], obj[5], obj[7], obj[9]
      ]
      

      return final_obj
    }




    load_moderator_accounts(){
        var items = this.get_moderator_accounts()
        if(items.length != 0){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1801']/* 'Moderator Accounts' */, 'details':this.props.app_state.loc['1802']/* 'Youve set ' */+items.length+this.props.app_state.loc['1803']/* ' moderators' */, 'size':'l'})}
                    {/* <div style={{height: 10}}/>
                    <div style={{'margin':'0px 0px 0px 5px','padding': '0px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                        <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                            {items.map((item, index) => (
                                <li style={{'display': 'inline-block', 'margin': '0px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => console.log()}>
                                    {this.render_detail_item('3', item['label'])}
                                </li>
                            ))}
                        </ul>
                    </div> */}
                </div>
            )
        }
        
    }

    get_moderator_accounts(){
        var obj = []
        var mods = this.props.app_state.stack_items[this.state.transaction_index].moderators;
        for(var i=0; i<mods.length; i++){
            obj.push({'id':mods[i], 'label':{'title':mods[i], 'details':this.props.app_state.loc['62']/* 'Account' */, 'size':'s'}})
        }
        return obj
    }

    load_interactable_accounts(){
        var items = this.get_interactables_accounts()

        if(items.length != 0){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1804']/* 'Interactable Accounts' */, 'details':this.props.app_state.loc['1802']/* 'Youve set ' */+items.length+this.props.app_state.loc['1805']/* ' accounts' */, 'size':'l'})}
                    {/* <div style={{height: 10}}/>
                    <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                        <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                            {items.map((item, index) => (
                                <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => console.log()}>
                                    {this.render_detail_item('3', item['label'])}
                                </li>
                            ))}
                        </ul>
                    </div> */}
                </div>
            )
        }
        
    }

    get_interactables_accounts(){
        var obj = []
        var interactibles = this.props.app_state.stack_items[this.state.transaction_index].interactibles;
        for(var i=0; i<interactibles.length; i++){
            obj.push({'id':interactibles[i], 'label':{'title':interactibles[i]['id'], 'details':this.props.app_state.loc['1806']/* 'For ' */+this.get_time_difference(interactibles[i]['timestamp']), 'size':'s'}})
        }
        return obj
    }




    
    render_token_data(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-150
        var size = this.props.screensize
        
        var item = this.get_spend_data();
        var selected_object = this.format_token()
        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    
                    {this.render_detail_item('7', item['banner-icon'])}
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['token_id'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['1807']/* 'The set access rights setting for your new token.' */, 'title':this.get_selected_item(this.props.app_state.stack_items[this.state.transaction_index].new_token_access_rights_tags_object, 'e')})}
                    {this.render_detail_item('0')}
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
                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['sell_limit'])}
                    </div>
                    <div style={{height:10}}/>
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
                    {this.render_detail_item('3', item['buy_amounts'])}
                    <div style={{height:10}}/>
                    {this.render_buy_token_uis(selected_object['data'][3], selected_object['data'][4], selected_object['data'][5])}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    get_spend_data(){
        var selected_object = this.format_token()
        var title = selected_object['id'];
        var img = selected_object['img']

        
        
        var selected_obj_root_config = selected_object['data'][0];
        var selected_obj_config = selected_object['data'][1];
        var selected_obj_ratio_config = selected_object['data'][2];

        var type = selected_obj_root_config[3] == 3 ? this.props.app_state.loc['1808']/* 'Capped' */ : this.props.app_state.loc['1809']/* 'Uncapped' */
        var is_auth_main_contract = selected_obj_config[9] == 2 ? this.props.app_state.loc['1810']/* '2 (Main Contract)' */: selected_obj_config[9]
        var is_trust_fee_target_main_contract = selected_obj_config[10] == 2 ? this.props.app_state.loc['1810']/* '2 (Main Contract)' */: (selected_obj_config[10] == 0 ? '0 (Burn Account)': selected_obj_config[10])
        var halfing_type = selected_obj_config[15] == 0 ? this.props.app_state.loc['1811']/* 'Fixed' */ : this.props.app_state.loc['1812']/* 'Spread' */

        if(title == 5){
            title = 'SPEND'
        }

        var item = selected_object;
        var active_tags = item['ipfs'] == null ? [''+title, ''+type, 'token'] : item['ipfs'].entered_indexing_tags
        var name = item['ipfs'] == null ? ''+title : item['ipfs'].entered_title_text
        var symbol = item['ipfs'] == null ? ''+type : item['ipfs'].entered_symbol_text

        var default_image = type == this.props.app_state.loc['606']/* 'capped' */ ? EndImg: SpendImg
        var image = item['ipfs'].token_image == null ? default_image : item['ipfs'].token_image

        // var image = item['ipfs'] == null ? img : item['ipfs'].token_image
        
        return{
            'tags':{'active_tags':active_tags, 'index_option':'indexed', 'when_tapped':''},
            'banner-icon':{'header':name, 'subtitle':symbol, 'image':image},
            'token_id': {'title':'ID: '+selected_object['id'], 'details':this.props.app_state.loc['1813']/* 'Token Identifier' */, 'size':'l'},
            'token_type': {'title':this.props.app_state.loc['1814']/* 'Token Type' */, 'details':type, 'size':'l'},

            'unlocked_supply': {'title':this.props.app_state.loc['1814']/* 'Unlocked Supply' */, 'details':this.enabled_disabled(selected_obj_root_config[0]), 'size':'l'},
            'unlocked_liquidity': {'title':this.props.app_state.loc['1815']/* 'Unlocked Liquidity' */, 'details':this.enabled_disabled(selected_obj_root_config[1]), 'size':'l'},
            'fully_custom': {'title':this.props.app_state.loc['1816']/* 'Fully Custom' */, 'details':this.enabled_disabled(selected_obj_root_config[2]), 'size':'l'},

            'buy_limit':{'style':'l','title':this.props.app_state.loc['1817']/* 'Mint Limit' */, 'subtitle':this.format_power_figure(selected_obj_config[0]), 'barwidth':this.calculate_bar_width(selected_obj_config[0]), 'number':this.format_account_balance_figure(selected_obj_config[0]), 'relativepower':symbol},
            
            'minimum_transactions_between_swap': {'title':selected_obj_config[2], 'details':this.props.app_state.loc['330']/* 'Minimum Transactions Between Swap' */, 'size':'l'},
            'minimum_blocks_between_swap': {'title':selected_obj_config[3], 'details':this.props.app_state.loc['331']/* 'Minimum Blocks Between Swap' */, 'size':'l'},
            'minimum_time_between_swap': {'title':this.get_time_diff(selected_obj_config[4]), 'details':this.props.app_state.loc['658']/* 'Minimum Time Between Swap' */, 'size':'l'},
            
            'trust_fee_proportion': {'title':this.format_proportion(selected_obj_config[7]), 'details':this.props.app_state.loc['660']/* 'Trust Fee' */, 'size':'l'},
            'exchange_authority': {'title':this.props.app_state.loc['1818']/* 'Authority: ' */+is_auth_main_contract, 'details':this.props.app_state.loc['1819']/* 'Exchange Authority Identifier' */, 'size':'l'},
            'trust_fee_target': {'title':this.props.app_state.loc['1820']/* 'Target: ' */+is_trust_fee_target_main_contract, 'details':this.props.app_state.loc['1821']/* 'Trust Fee Target Identifier' */, 'size':'l'},

            'sell_limit':{'style':'l','title':this.props.app_state.loc['328']/* 'Sell Limit' */, 'subtitle':this.format_power_figure(selected_obj_config[11]), 'barwidth':this.calculate_bar_width(selected_obj_config[11]), 'number':this.format_account_balance_figure(selected_obj_config[11]), 'relativepower':symbol},

            'minimum_entered_contracts_between_swap': {'title':selected_obj_config[13], 'details':this.props.app_state.loc['332']/* 'Minimum Entered Contracts Between Swap' */, 'size':'l'},
            'minimum_transactions_for_first_buy': {'title':selected_obj_config[17], 'details':this.props.app_state.loc['333']/* 'Minimum Transactions For First Buy' */, 'size':'l'},
            'minimum_entered_contracts_for_first_buy': {'title':selected_obj_config[18], 'details':this.props.app_state.loc['334']/* 'Minimum Entered Contracts For First Buy' */, 'size':'l'},

            'ratio_x':{'style':'l','title':this.props.app_state.loc['395']/* 'Exchange Ratio X' */, 'subtitle':this.format_power_figure(selected_obj_ratio_config[0]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[0]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[0]), 'relativepower':''},
            'ratio_y':{'style':'l','title':this.props.app_state.loc['396']/* 'Exchange Ratio Y' */, 'subtitle':this.format_power_figure(selected_obj_ratio_config[1]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[1]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[1]), 'relativepower':''},
            'combined_exchange_ratio': {'title':this.format_exchange_ratio(selected_obj_ratio_config[0], selected_obj_ratio_config[1]), 'details':this.props.app_state.loc['712']/* 'Exchange Ratio X:Y' */, 'size':'l'},

            'exchanges_liquidity':{'style':'l','title':this.props.app_state.loc['712']/* 'Circulating Supply' */, 'subtitle':this.format_power_figure(selected_obj_ratio_config[2]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[2]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[2]), 'relativepower':symbol},
            'mint_burn_button':{'text':this.props.app_state.loc['1822']/* 'Mint/Burn Token' */, 'action':''},

            'block_limit':{'style':'l','title':this.props.app_state.loc['335']/* 'Block Limit' */, 'subtitle':this.format_power_figure(selected_obj_config[1]), 'barwidth':this.calculate_bar_width(selected_obj_config[1]), 'number':this.format_account_balance_figure(selected_obj_config[1]), 'relativepower':symbol},
            'internal_block_halfing_proportion': {'title':this.format_proportion(selected_obj_config[5]), 'details':this.props.app_state.loc['338']/* 'Internal Block Halving Proportion' */, 'size':'l'},
            'block_limit_reduction_proportion': {'title':this.format_proportion(selected_obj_config[6]), 'details':this.props.app_state.loc['339']/* 'Block Limit Reduction Proportion' */, 'size':'l'},
            
            'block_reset_limit': {'title':selected_obj_config[8], 'details':this.props.app_state.loc['340']/* 'Block Reset Limit' */, 'size':'l'},
            'block_limit_sensitivity': {'title':selected_obj_config[12], 'details':this.props.app_state.loc['341']/* 'Block Limit Sensitivity' */, 'size':'l'},
            'default_authority_mint_limit': {'title':this.format_proportion(selected_obj_config[14]), 'details':this.props.app_state.loc['1823']/* 'Authority Mint Limit (percentage of supply)' */, 'size':'l'},
            'block_halfing_type': {'title':halfing_type, 'details':this.props.app_state.loc['336']/* 'Halving Type' */, 'size':'l'},
            'maturity_limit':{'style':'l','title':this.props.app_state.loc['337']/* 'Maturity Limit' */, 'subtitle':this.format_power_figure(selected_obj_config[16]), 'barwidth':this.calculate_bar_width(selected_obj_config[16]), 'number':this.format_account_balance_figure(selected_obj_config[16]), 'relativepower':symbol},

            'current_block_mint_total':{'style':'l','title':this.props.app_state.loc['1824']/* 'Current Block Mint Total' */, 'subtitle':this.format_power_figure(selected_obj_ratio_config[4]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[4]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[4]), 'relativepower':symbol},
            'active_block_limit_reduction_proportion': {'title':this.format_proportion(selected_obj_ratio_config[6]), 'details':this.props.app_state.loc['1825']/* 'Active Block Limit Reduction Proportion' */, 'size':'l'},
            'buy_amounts':{'title':this.props.app_state.loc['1623']/* 'Entry Fees' */, 'details':selected_object['data'][3].length+this.props.app_state.loc['1624']/* ' tokens used' */, 'size':'l'},
            '':{},
            '':{},
            '':{},
            '':{},
            '':{},
        }
    }

    enabled_disabled(value){
        if(value == 1){
            return this.props.app_state.loc['85']/* 'enabled' */
        }
        return this.props.app_state.loc['86']/* 'disabled' */
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

    format_token(){
        return{'ipfs':this.props.app_state.stack_items[this.state.transaction_index], 'data':this.format_token_object(this.props.app_state.stack_items[this.state.transaction_index])}
    }

    format_token_object(t){
        var default_depth = t.default_depth
        if(default_depth != 0){
            return this.format_end_token_object(t)
        }
        var type = this.get_selected_item(t.new_token_type_tags_object, t.new_token_type_tags_object['i'].active);
        var new_token_type_tags_object = type == this.props.app_state.loc['606']/* 'capped' */ ? 3 : 5
        var token_exchange_liquidity_total_supply = t.token_exchange_liquidity_total_supply <= 100_000 ? 1_000_000_000 : t.token_exchange_liquidity_total_supply.toString().toLocaleString('fullwide', {useGrouping:false})
        if(type == this.props.app_state.loc['607']/* 'uncapped' */){
            token_exchange_liquidity_total_supply = 0
        }
        var default_exchange_amount_buy_limit = t.default_exchange_amount_buy_limit == 0 ? 100_000_000 : 
        t.default_exchange_amount_buy_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        
        var minimum_transactions_between_swap = t.minimum_transactions_between_swap.toString().toLocaleString('fullwide', {useGrouping:false})
        var minimum_blocks_between_swap = t.minimum_blocks_between_swap.toString().toLocaleString('fullwide', {useGrouping:false})
        var minimum_time_between_swap = t.minimum_time_between_swap.toString().toLocaleString('fullwide', {useGrouping:false})
        var default_exchange_amount_sell_limit = t.default_exchange_amount_sell_limit == 0 ? 100_000_000 : t.default_exchange_amount_sell_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        var minimum_entered_contracts_between_swap = t.minimum_entered_contracts_between_swap.toString().toLocaleString('fullwide', {useGrouping:false})
        var minimum_transactions_for_first_buy = t.minimum_transactions_for_first_buy.toString().toLocaleString('fullwide', {useGrouping:false})
        var trust_fee_proportion = t.trust_fee_proportion == 0 ? bgN(1,16) : t.trust_fee_proportion.toString().toLocaleString('fullwide', {useGrouping:false})
        
        var block_limit = t.block_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        
        var new_token_unlocked_liquidity_tags_object = this.get_selected_item(t.new_token_unlocked_liquidity_tags_object, t.new_token_unlocked_liquidity_tags_object['i'].active) == this.props.app_state.loc['611']/* 'unlocked' */ ? 1 : 0
        var new_token_unlocked_supply_tags_object = this.get_selected_item(t.new_token_unlocked_supply_tags_object, t.new_token_unlocked_supply_tags_object['i'].active) == this.props.app_state.loc['611']/* 'unlocked' */ ? 1 : 0
        var new_token_fully_custom_tags_object = this.get_selected_item(t.new_token_fully_custom_tags_object, t.new_token_fully_custom_tags_object['i'].active) == this.props.app_state.loc['613']/* 'fully-custom' */ ? 1 : 0
        var internal_block_halfing_proportion = t.internal_block_halfing_proportion.toString().toLocaleString('fullwide', {useGrouping:false})
        var block_limit_reduction_proportion = t.block_limit_reduction_proportion.toString().toLocaleString('fullwide', {useGrouping:false})
        var block_reset_limit = t.block_reset_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        
        var new_token_block_limit_sensitivity_tags_object = parseInt(this.get_selected_item(t.new_token_block_limit_sensitivity_tags_object, t.new_token_block_limit_sensitivity_tags_object['i'].active)).toString().toLocaleString('fullwide', {useGrouping:false})
        var default_authority_mint_limit = t.default_authority_mint_limit == 0 ? bgN(1,16).toString().toLocaleString('fullwide', {useGrouping:false}) : t.default_authority_mint_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        
        var new_token_halving_type_tags_object = (this.get_selected_item(t.new_token_halving_type_tags_object, t.new_token_halving_type_tags_object['i'].active) == this.props.app_state.loc['615']/* 'spread' */ ? 1 : 0).toString().toLocaleString('fullwide', {useGrouping:false})
        var maturity_limit = t.maturity_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        
        var minimum_entered_contracts_for_first_buy = t.minimum_entered_contracts_for_first_buy.toString().toLocaleString('fullwide', {useGrouping:false})

        var default_exchange_ratio_value = '1000';
        if(type == this.props.app_state.loc['606']/* 'capped' */){
            default_exchange_ratio_value = token_exchange_liquidity_total_supply;
        }

        var active_block_limit_reduction_proportion = type == this.props.app_state.loc['606']/* 'capped' */ ? 0 : bgN(100,16)
        var token_exchange_ratio_x = t.token_exchange_ratio_x == 0 ? default_exchange_ratio_value: t.token_exchange_ratio_x.toString().toLocaleString('fullwide', {useGrouping:false})

        var token_exchange_ratio_y = t.token_exchange_ratio_y == 0 ? default_exchange_ratio_value : t.token_exchange_ratio_y.toString().toLocaleString('fullwide', {useGrouping:false})

        if(type == this.props.app_state.loc['606']/* 'capped' */ && token_exchange_ratio_x != token_exchange_liquidity_total_supply){
            token_exchange_ratio_x = token_exchange_liquidity_total_supply;
        }
        
        
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
        if(new_token_type_tags_object == 5){
            obj[7].push(0)
            obj[8].push(23)
            obj[9].push(0)
            obj[10].push(23)
            obj[11].push(0)
            obj[12].push(23)
        }else{
            obj[7].push(3)
            obj[8].push(23)
            obj[9].push(1)
            obj[10].push(23)
            obj[11].push(0)
            obj[12].push(23)
        }
        
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

      var final_obj = [
          obj[1], obj[3], obj[5], obj[7], obj[9], obj[11]
      ]

      return final_obj
    }

    format_end_token_object(t){
        var obj = [/* create token */
            [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 31, 0],
            [1/* new_token_unlocked_supply_tags_object */, 0/* new_token_unlocked_liquidity_tags_object */, 0/* new_token_fully_custom_tags_object */, 5/* new_token_type_tags_object */],
            [23, 23, 23, 23],

            [ bigInt('1e6').toString().toLocaleString('fullwide', {useGrouping:false})/* default_exchange_amount_buy_limit */, 0/* block_limit */, 0/* minimum_transactions_between_swap */, 0/* minimum_blocks_between_swap *//* 3 */, 0/* minimum_time_between_swap */, 0/* internal_block_halfing_proportion */, 0/* block_limit_reduction_proportion */, bigInt('3e16').toString().toLocaleString('fullwide', {useGrouping:false})/* trust_fee_proportion *//* 7 */, 0/* block_reset_limit */, 0/* exchange_authority */, 0/* trust_fee_target */, 1/* default_exchange_amount_sell_limit *//* 11 */, 0/* new_token_block_limit_sensitivity_tags_object */, 0/* minimum_entered_contracts_between_swap */, 0/* default_authority_mint_limit */, 0/* new_token_halving_type_tags_object *//* 15 */, 0/* maturity_limit */, 0/* minimum_transactions_for_first_buy */, 0/* minimum_entered_contracts_for_first_buy */],
            [23, 23, 23, 23, 23, 23, 23, 23, 23, 53, 53, 23, 23, 23, 23, 23, 23, 23, 23],

            [bigInt('1e72').toString().toLocaleString('fullwide', {useGrouping:false})/* token_exchange_ratio_x */, bigInt('1e72').toString().toLocaleString('fullwide', {useGrouping:false})/* token_exchange_ratio_y */, 0/* token_exchange_liquidity_total_supply *//* 2 */, 0, 0, 0, bigInt('1e18').toString().toLocaleString('fullwide', {useGrouping:false})/* active_block_limit_reduction_proportion */],
            [23, 23, 23, 23, 23, 23, 23],

            [3], [23],
            [1], [23],
            [0], [23]
        ]

        return obj
    }








    render_subscription_data(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-150
        var size = this.props.screensize
        var item = this.get_subscription_details_data()
        var object = this.format_subscription()

        return(
            <div style={{ 'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['1826']/* 'The set access rights setting for your new contract' */, 'title':this.get_selected_item(this.props.app_state.stack_items[this.state.transaction_index].new_token_access_rights_tags_object, 'e')})}

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

                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', item['entry_fees'])}
                    <div style={{height: 10}}/>
                    {this.render_buy_token_uis(object['data'][2], object['data'][3], object['data'][4])}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    get_subscription_details_data(){
        var object = this.format_subscription()
        var tags = object['ipfs'] == null ? ['Subscription'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Subscription ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var subscription_config = object['data'][1]
        var can_cancel_subscription = subscription_config[2] == 0 ? this.props.app_state.loc['1827']/* 'non-cancellable' */: this.props.app_state.loc['1828']/* 'cancellable' */
        var time_unit = subscription_config[5] == 0 ? 60*53 : subscription_config[5]
        var subscription_beneficiary = subscription_config[6] == 0 ? subscription_config[0] : subscription_config[6]
        return{
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            
            'age':{ 'style':'l', 'title':this.props.app_state.loc['1829']/* 'Block ID' */, 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['27']/* 'block' */, },
            
            'target_authority_id': {'title':subscription_config[0], 'details':this.props.app_state.loc['1830']/* 'Authority ID' */, 'size':'l'},
            
            'minimum_buy_amount':{ 'style':'l', 'title':this.props.app_state.loc['1831']/* 'Minimum Buy Amount' */, 'subtitle':'??', 'barwidth':this.get_number_width(subscription_config[1]), 'number':`${number_with_commas(subscription_config[1])}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['1832']/* 'time-units' */, },

            'can_cancel_subscription': {'title':can_cancel_subscription, 'details':this.props.app_state.loc['1833']/* 'Subscription Type' */, 'size':'l'},

            'maximum_buy_amount':{ 'style':'l', 'title':this.props.app_state.loc['1834']/* 'Maximum Buy Amount' */, 'subtitle':'??', 'barwidth':this.get_number_width(subscription_config[3]), 'number':`${number_with_commas(subscription_config[3])}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['1835']/* time-units' */, },

            'minimum_cancellable_balance_amount':{ 'style':'l', 'title':this.props.app_state.loc['1836']/* 'Minimum Cancellable Amount' */, 'subtitle':'??', 'barwidth':this.get_number_width(subscription_config[4]), 'number':`${number_with_commas(subscription_config[4])}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['1835']/* 'time-units' */, },

            'time_unit': {'title':this.get_time_diff(time_unit), 'details':this.props.app_state.loc['1837']/* 'Time Unit' */, 'size':'l'},

            'payment_amount': {'title':this.get_time_diff(object['payment']), 'details':this.props.app_state.loc['1838']/* 'Remaining Subscription Time' */, 'size':'l'},

            'subscription_beneficiary': {'title':subscription_beneficiary, 'details':this.props.app_state.loc['1839']/* 'Subscription Beneficiary' */, 'size':'l'},

            'entry_fees': {'title':this.props.app_state.loc['1840']/* 'Entry Fees' */, 'details':object['data'][2].length+this.props.app_state.loc['1841']/* ' tokens used' */, 'size':'l'},
        }
    }

    format_subscription(){
        return{'ipfs':this.props.app_state.stack_items[this.state.transaction_index], 'data':this.format_subscription_object(this.props.app_state.stack_items[this.state.transaction_index])}
    }

    format_subscription_object(t){
        var exchange_authority = t.authority_id == '' ? 53 : parseInt(t.authority_id)
        var exchange_authority_type = 23
        if(exchange_authority == 53){
            exchange_authority_type = 53
        }
        var minimum_buy_amount = t.minimum_buy_amount == 0 ? 1 : t.minimum_buy_amount.toString().toLocaleString('fullwide', {useGrouping:false})
        var cancellable_tags_object = this.get_selected_item(t.cancellable_tags_object, t.cancellable_tags_object['i'].active) == this.props.app_state.loc['541']/* 'true' */ ? 1 : 0
        var maximum_buy_amount = t.maximum_buy_amount.toString().toLocaleString('fullwide', {useGrouping:false})
        var minimum_cancellable_balance_amount = t.minimum_cancellable_balance_amount.toString().toLocaleString('fullwide', {useGrouping:false})
        var time_unit = t.time_unit.toString().toLocaleString('fullwide', {useGrouping:false})
        var subscription_beneficiary = t.subscription_beneficiary == '' ? 53 : parseInt(t.subscription_beneficiary).toString().toLocaleString('fullwide', {useGrouping:false})
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

      var final_obj = [
          obj[1], obj[3], obj[5], obj[7], obj[9]
      ]

      return final_obj
    }







    render_post_data(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-150
        var object = this.format_post();
        var item = this.get_post_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects

        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    {this.render_detail_item('0')}

                    {this.render_item_data(items)}
                    {this.render_item_images()}
                    {this.render_selected_links()}
                    
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    format_post(){
        return{'ipfs':this.props.app_state.stack_items[this.state.transaction_index]}
    }

    get_post_details_data(object){
        var tags = object['ipfs'] == null ? ['Post'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
        }
    }

    render_item_data(items){
        var middle = this.props.height-200;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        if(items.length == 0){
            items = [0, 1, 2]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['view_group_card_item_background'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img src={Letter} style={{height:30 ,width:'auto'}} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    {items.map((item, index) => (
                        <div key={index}>
                            {this.render_detail_item(item['type'], item['data'])} 
                            <div style={{height:10}}/>
                        </div>
                    ))}
                </div>
            )
        }
    }

    render_item_images(){
        var object = this.props.app_state.stack_items[this.state.transaction_index]
        var images_to_add = object.entered_image_objects
        if(images_to_add.length == 0) return;
        return(
            <div>
                {this.render_detail_item('9', {'images':images_to_add, 'pos':0})}
            </div>
        )
    }

    render_selected_links(){
        var object = this.props.app_state.stack_items[this.state.transaction_index]
        if(object.added_links == null) return;
        var items = [].concat(object.added_links).reverse()

        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_detail_item('3', {'title':this.get_title(item), 'details':this.truncate(item['title'], 15), 'size':'s', 'padding':'7px 12px 7px 12px'})}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }

    get_title(item){
        var obj = {'contract':'📑', 'job':'💼', 'contractor':'👷🏻‍♀️', 'storefront':'🏪','subscription':'🎫', 'post':'📰','channel':'📡','token':'🪙', 'proposal':'🧎'}
        var item_id = (item['e5'] + 'e' + item['id']).toLowerCase()
        return `${obj[item['type']]} ${item_id}`
    }





    render_job_post_data(){
        var background_color = this.props.theme['card_background_color']
        var object = this.format_job_post();
        var item = this.get_job_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects

        return(
            <div style={{ 'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    {this.render_detail_item('0')}
                    {this.render_item_data(items)}

                    {this.render_item_images()}
                    {this.render_selected_links()}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1842']/* 'Price Amounts' */, 'details':this.props.app_state.loc['1843']/* 'The amounts you are offering for the job.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_price_amounts()}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    format_job_post(){
        return{'ipfs':this.props.app_state.stack_items[this.state.transaction_index]}
    }

    get_job_details_data(object){
        var tags = object['ipfs'] == null ? ['Job'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Job ID' : object['ipfs'].entered_title_text
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
        }
    }

    render_price_amounts(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var object = this.format_job_post();
        var items = [].concat(object['ipfs'].price_data)
        if(items.length == 0){
            items = [0, 1, 2]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['view_group_card_item_background'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img src={Letter} style={{height:30 ,width:'auto'}} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div> 
            )
        }
        return(
            <div style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '2px 0px 2px 0px'}}>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }








    render_channel_post_data(){
        var background_color = this.props.theme['card_background_color']
        var object = this.format_channel_post();
        var item = this.get_channel_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects

        return(
            <div style={{ 'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}

                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['1844']/* 'The set access rights setting for your new channel' */, 'title':this.get_selected_item(this.props.app_state.stack_items[this.state.transaction_index].new_token_access_rights_tags_object, 'e')})}

                    {this.render_detail_item('0')}
                    {this.render_item_data(items)}

                    {this.render_item_images()}
                    {this.render_selected_links()}

                    {this.load_moderator_accounts()}
                    {this.load_interactable_accounts()}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    format_channel_post(){
        return{'ipfs':this.props.app_state.stack_items[this.state.transaction_index]}
    }

    get_channel_details_data(object){
        var tags = object['ipfs'] == null ? ['Post'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
        }
    }










    render_storefront_post_data(){
        var background_color = this.props.theme['card_background_color']
        var object = this.format_storefront_post();
        var item = this.get_storefront_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects

        return(
            <div style={{padding:'0px 0px 10px 0px'}}>
                <div style={{ 'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                    <div style={{ 'overflow-y': 'auto', width:'100%', padding:'0px 10px 0px 10px'}}>
                        {this.render_detail_item('1', item['tags'])}
                        <div style={{height: 10}}/>
                        {this.render_detail_item('3', item['id'])}

                        {this.render_detail_item('0')}
                        {this.render_item_data(items)}
                        {this.render_item_images()}
                        {this.render_selected_links()}

                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                </div>

                {this.render_detail_item('3', {'title':'Item Variants', 'details':this.props.app_state.loc['1845']/* 'The items variant details are shown below' */, 'size':'l'})}
                <div style={{height: 10}}/>
                {this.render_set_storefront_variant_list_part()}
                {this.render_detail_item('0')}
            </div>
            
        )
    }

    format_storefront_post(){
        return{'ipfs':this.props.app_state.stack_items[this.state.transaction_index]}
    }

    get_storefront_details_data(object){
        var tags = object['ipfs'] == null ? ['Post'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
        }
    }

    render_set_storefront_variant_list_part(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var object = this.format_storefront_post();
        var items = [].concat(object['ipfs'].variants)

        if(items.length == 0){
            items = [0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 0px 2px 0px'}} onClick={()=>console.log()}>
                                <div style={{height:110, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 10px 0px'}}>
                                        <img src={Letter} style={{height:50 ,width:'auto'}} />
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
                            <li style={{'padding': '2px 0px 2px 0px'}}>
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 0px 5px','border-radius': '13px' }} onClick={()=> this.remove_variant(item)}>
                                    {this.render_detail_item('4', {'text':item['variant_description'], 'textsize':'13px', 'font':this.props.app_state.font})}
                                    <div style={{height:3}}/>
                                    <div style={{padding:'0px 0px 0px 10px'}}>
                                        {this.render_detail_item('9', item['image_data']['data'])}
                                    </div>
                                    <div style={{height:5}}/>
                                    {this.render_detail_item('3', {'title':this.format_account_balance_figure(item['available_unit_count']), 'details':this.props.app_state.loc['1846']/* 'Number of Units' */, 'size':'l'})}
                                    <div style={{height:15}}/>
                                    {this.render_variant_price_data(item)}

                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        
    }

    render_variant_price_data(variant){
        var items = [].concat(variant['price_data'])
        return(
            <div>
                {items.reverse().map((item, index) => (
                    <li style={{'padding': '5px 0px 0px 0px'}}>
                        {this.render_detail_item('2', { 'style':'s', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                    </li>
                ))}
            </div>
        )
    }








    render_buy_sell_data(){
        var item = this.props.app_state.stack_items[this.state.transaction_index];
        var action = this.get_selected_item(item.new_mint_dump_action_page_tags_object, 'e')
        var recipient = item.recipient_id == '53' ? this.props.app_state.loc['1847']/* 'Your account ID: ' */+this.props.app_state.user_account_id[this.props.app_state.selected_e5] : item.recipient_id
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1848']/* Amount */, 'subtitle':this.format_power_figure(item.amount), 'barwidth':this.calculate_bar_width(item.amount), 'number':this.format_account_balance_figure(item.amount), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.token_item['id']], })}
                </div>
                <div style={{height: 10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1849']/* 'Your Balance' */, 'subtitle':this.format_power_figure(item.token_item['balance']), 'barwidth':this.calculate_bar_width(item.token_item['balance']), 'number':this.format_account_balance_figure(item.token_item['balance']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.token_item['id']], })}
                </div>
                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['1850']/* 'Selected Action' */, 'title':action})}
                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['1851']/* 'Target Recipient Account' */, 'title':''+recipient})}
                {this.render_detail_item('0')}
            </div>
        )
    }

    render_enter_contract_data(){
        var item = this.props.app_state.stack_items[this.state.transaction_index];
        var expiry_time_in_seconds = item.interactible_timestamp
        var time_to_expiry = expiry_time_in_seconds - Math.floor(new Date() / 1000);
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['1852']/* 'Enter Contract Until: ' */+(new Date(expiry_time_in_seconds*1000)), 'title':this.props.app_state.loc['1853']/* 'Entry Exipry Time' */})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'size':'l', 'details':''+(this.get_time_diff(time_to_expiry)), 'title':this.props.app_state.loc['1854']/* 'Time remaining' */})}

                {this.render_detail_item('0')}
            </div>
        )
    }

    render_transfer_token_data(){
        var item = this.props.app_state.stack_items[this.state.transaction_index];
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['952']/* 'Your Balance' */, 'subtitle':this.format_power_figure(item.token_item['balance']), 'barwidth':this.calculate_bar_width(item.token_item['balance']), 'number':this.format_account_balance_figure(item.token_item['balance']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.token_item['id']], })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1022']/* 'Your Balance after Set Transfers' */, 'subtitle':this.format_power_figure(item.token_item['balance'] - item.debit_balance), 'barwidth':this.calculate_bar_width(item.token_item['balance'] - item.debit_balance), 'number':this.format_account_balance_figure(item.token_item['balance'] - item.debit_balance), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.token_item['id']], })}
                </div>

                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['1855']/* 'Below are the individual transfer actions.' */, 'title':this.props.app_state.loc['1856']/* 'Transfer actions' */})}
                <div style={{height:10}}/>
                {this.render_stack_transactions()}
                <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '0px 20px 10px 20px'}}/>
                
            </div>
        )
    }

    render_stack_transactions(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var state_item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = [].concat(state_item.stack_items);

        if(items.length == 0){
            items = [0, 1, 3]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '10px','padding':'0px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:20 ,width:'auto'}} />
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
                            <li style={{'padding': '5px'}}>
                                {this.render_detail_item('3', {'title':''+this.format_account_balance_figure(item['amount'])+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[state_item.token_item['id']], 'details':this.props.app_state.loc['1857']/* 'recipient account: ' */+item['recipient'], 'size':'s'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_extend_contract_data(){
        var item = this.props.app_state.stack_items[this.state.transaction_index];
        var expiry_time_in_seconds = item.interactible_timestamp
        var time_to_expiry = expiry_time_in_seconds - Math.floor(new Date() / 1000);
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['1858']/* 'Extend Stay In Contract Until: ' */+(new Date(expiry_time_in_seconds*1000)), 'title':this.props.app_state.loc['1859']/* 'New Exipry Time' */})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'size':'l', 'title':''+(this.get_time_diff(time_to_expiry)), 'details':this.props.app_state.loc['1860']/* 'Time remaining' */})}

                {this.render_detail_item('0')}
            </div>
        )
    }



    render_exit_contract_data(){
        var item = this.props.app_state.stack_items[this.state.transaction_index];
        var contract_item = this.format_contract_item_for_exit_contract_action()
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 20}}/>

                <div style={{height:'auto', width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+this.props.theme['card_shadow_color']}}>
                    <div style={{'padding': '5px 0px 5px 5px'}}>
                        {this.render_detail_item('1', contract_item['tags'])}
                        <div style={{height: 10}}/>
                        <div style={{'padding': '0px 0px 0px 0px'}}>
                            {this.render_detail_item('3', contract_item['id'])}
                        </div>
                        <div style={{'padding': '20px 0px 0px 0px'}}>
                            {this.render_detail_item('2', contract_item['age'])}
                        </div>
                        
                    </div>         
                </div>

                <div style={{height:10}}/>
                {this.show_entered_contract_data()}
                {this.render_detail_item('0')}
            </div>
        )
    }


    format_contract_item_for_exit_contract_action(){
        var item = this.props.app_state.stack_items[this.state.transaction_index];
        var object = item.contract_item
        var tags = object['ipfs'] == null ? ['Contract'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Contract ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{ 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':'block', }
        }
    }

    show_entered_contract_data(){
        var item = this.props.app_state.stack_items[this.state.transaction_index];
        var expiry_time_in_seconds = item.contract_item['entry_expiry']
        var time_to_expiry =  expiry_time_in_seconds - Math.floor(new Date() / 1000);
        
        if(expiry_time_in_seconds != 0){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':'Until: '+(new Date(expiry_time_in_seconds*1000)), 'title':'Entry Exipry Time'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'size':'l', 'details':''+(this.get_time_diff(time_to_expiry)), 'title':this.props.app_state.loc['1860']/* 'Time remaining' */})}
                </div>
            )
        }
    }







    render_proposal_data(){
        var background_color = this.props.theme['card_background_color']
        var object = this.format_proposal_post()
        var item = this.get_proposal_details_data()
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects
        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', padding:'0px 0px 0px 0px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{height: 10}}/>
                    {this.render_item_data(items)}
                    {this.render_item_images()}
                    {this.render_selected_links()}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', item['consensus_type'])}
                    
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['proposal_expiry_time'])}
                    
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['proposal_expiry_time_from_now'])}

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['consensus_submit_expiry_time'])}

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['proposal_submit_expiry_time_from_now'])}
                    
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['target_contract_authority'])}

                    {this.render_modify_target_if_any(item)}

                    {this.render_item_images()}
                    {this.render_selected_links()}

                    <div style={{height:10}}/>

                </div>
            </div>
        )
    }

    render_modify_target_if_any(item){
        var object = this.format_proposal_post()
        var proposal_config = object['data'][1]

        if(proposal_config[0] == 1){
            return(
                <div>
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['modify_target'])}
                </div>
            )
        }
    }

    format_proposal_post(){
        return{'ipfs':this.props.app_state.stack_items[this.state.transaction_index], 'data':this.format_proposal(this.props.app_state.stack_items[this.state.transaction_index])}
    }

    get_proposal_details_data(){
        var object = this.format_proposal_post()
        var tags = object['ipfs'] == null ? ['Proposal'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Proposal ID' : object['ipfs'].entered_title_text
        var consensus_obj = {0:this.props.app_state.loc['316']/* spend' */,1:this.props.app_state.loc['317']/* 'reconfig' */, 6:this.props.app_state.loc['318']/* 'exchange-transfer' */}
        var proposal_config = object['data'][1]
        var consensus_type = consensus_obj[proposal_config[0]]

        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},

            'consensus_type':{'title':consensus_type, 'details':this.props.app_state.loc['1861']/* 'Consensus Type' */, 'size':'l'},
            'proposal_expiry_time':{'title':this.props.app_state.loc['1862']/* 'Proposal Expiry time' */, 'details':''+(new Date(proposal_config[1]*1000)), 'size':'l'},
            'proposal_expiry_time_from_now':{'title':this.get_time_from_now(proposal_config[1]), 'details':this.props.app_state.loc['1863']/* 'Proposal expiry time from now' */, 'size':'l'},

            'consensus_submit_expiry_time':{'title':this.props.app_state.loc['1864']/* 'Proposal Submit Expiry time' */, 'details':''+(new Date(proposal_config[3]*1000)), 'size':'l'},
            'proposal_submit_expiry_time_from_now':{'title':this.get_time_from_now(proposal_config[3]), 'details':this.props.app_state.loc['1865']/* 'Proposal submit expiry time from now' */, 'size':'l'},

            'target_contract_authority':{'title':proposal_config[5], 'details':this.props.app_state.loc['1874']/* 'Contract Authority ID' */, 'size':'l'},
            'modify_target':{'title':proposal_config[9], 'details':this.props.app_state.loc['1875']/* 'Modify Target' */, 'size':'l'},
        }
    }

    format_proposal(t){
        var consensus_obj = {'spend':0,'reconfig':1, 'exchange-transfer':6}
        consensus_obj[this.props.app_state.loc['316']/* spend */] = 0
        consensus_obj[this.props.app_state.loc['317']/* reconfig */] = 1
        consensus_obj[this.props.app_state.loc['318']/* exchange-transfer */] = 6
        var consensus_type_tag = this.get_selected_item(t.new_proposal_type_tags_object, t.new_proposal_type_tags_object['i'].active)
        var consensus_type = consensus_obj[consensus_type_tag]
        var proposal_expiry_time = t.proposal_expiry_time.toString().toLocaleString('fullwide', {useGrouping:false})
        var consensus_submit_expiry_time = t.proposal_submit_expiry_time.toString().toLocaleString('fullwide', {useGrouping:false})
        var target_contract_authority = t.contract_item['id'].toString().toLocaleString('fullwide', {useGrouping:false})
        var modify_target = t.modify_target_id.toString().toLocaleString('fullwide', {useGrouping:false})
        if(modify_target == ''){
            modify_target = '0'
        }

        var obj = [/* create proposal */
            [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 32, 0],
            [0], [23],
            [consensus_type, proposal_expiry_time, 0/* 2 */, consensus_submit_expiry_time, 0, target_contract_authority, 0/* 6 */, 0, 0, modify_target], 
            [23, 23, 23, 23, 23, 23, 23, 23, 23, 23],
            [], [],
            [], [],/* 8 */
            [], [],/* 4 <exchanges> */
            [], [],
            [], [],/* 14 */
            [], [],
            [], [],/* 18 */
            [], [],
            [], []/* bounty depths */
        ]

        for(var i = 0; i<t.bounty_values.length; i++){
            //set the bounty data
            obj[5].push(t.bounty_values[i]['exchange'].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[6].push(23)

            obj[7].push(t.bounty_values[i]['amount'].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[8].push(23)

            obj[21].push(0)
            obj[22].push(23)
        }

        if(consensus_type_tag == this.props.app_state.loc['316']/* 'spend' */){
            for(var i=0; i<t.spend_actions.length; i++){
                obj[9].push(t.spend_actions[i]['spend_token'].toString().toLocaleString('fullwide', {useGrouping:false}))
                obj[10].push(23)

                obj[11].push(t.spend_actions[i]['amount'].toString().toLocaleString('fullwide', {useGrouping:false}))
                obj[12].push(23)

                var receiver = t.spend_actions[i]['spend_target']
                var receiver_type = 23
                if(receiver == 53){
                    receiver_type = 53
                }

                obj[13].push(receiver.toString().toLocaleString('fullwide', {useGrouping:false}))
                obj[14].push(receiver_type)

                obj[15].push(0)/* depths */
                obj[16].push(23)

                obj[17].push(0)/* depths */
                obj[18].push(23)

                obj[19].push(0)/* depths */
                obj[20].push(23)
            }
        }
        else if(consensus_type_tag == this.props.app_state.loc['317']/* 'reconfig' */){
            for(var i=0; i<t.reconfig_values.length; i++){
                obj[9].push(t.reconfig_values[i]['pos'][0])
                obj[10].push(23)

                obj[11].push(t.reconfig_values[i]['pos'][1])
                obj[12].push(23)

                obj[13].push(t.reconfig_values[i]['value'].toString().toLocaleString('fullwide', {useGrouping:false}))
                obj[14].push(23)

                obj[15].push(0)/* depths */
                obj[16].push(23)

                obj[17].push(0)/* depths */
                obj[18].push(23)

                obj[19].push(0)/* depths */
                obj[20].push(23)

            }
        }
        else if(consensus_type_tag == this.props.app_state.loc['318']/* 'exchange-transfer' */){
            for(var i=0; i<t.exchange_transfer_values.length; i++){
                obj[9].push(t.exchange_transfer_values[i]['exchange'].toString().toLocaleString('fullwide', {useGrouping:false}))
                obj[10].push(23)

                var receiver = t.exchange_transfer_values[i]['receiver']
                var receiver_type = 23
                if(receiver == 53){
                    receiver_type = 53
                }

                obj[11].push(receiver.toString().toLocaleString('fullwide', {useGrouping:false}))
                obj[12].push(receiver_type)

                obj[13].push(t.exchange_transfer_values[i]['amount'].toString().toLocaleString('fullwide', {useGrouping:false}))
                obj[14].push(23)

                obj[15].push(0)/* depths */
                obj[16].push(23)

                obj[17].push(t.exchange_transfer_values[i]['token'].toString().toLocaleString('fullwide', {useGrouping:false}))
                obj[18].push(23)
                
                obj[19].push(0)/* depths */
                obj[20].push(23)
            }
        }


        var final_obj = [
          obj[1], obj[3], obj[5], obj[7], obj[9], obj[11], obj[13], obj[15], obj[17], obj[19], obj[21]
      ]

      return final_obj
    }

    render_proposal_actions(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-70
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        var items = this.get_proposal_action_data()
        var object = this.format_proposal_post()
        var proposal_action = object['data'][1][0]

        if(proposal_action == 0){
           return(
                <div style={{'margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px', 'max-width':'470px'}}>
                    <div style={{ 'overflow-y': 'auto', width:'100%', padding:'0px 0px 0px 0px'}}>
                        {this.render_spend_actions(items)}
                        <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '0px 20px 20px 20px'}}/>
                    </div>
                </div> 
            )
        }
        else if(proposal_action == 1){
            return(
                <div style={{'margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px', 'max-width':'470px'}}>
                    <div style={{ 'overflow-y': 'auto', width:'100%', padding:'0px 0px 0px 0px'}}>
                        {this.load_reconfig_items(items)}
                    </div>
                </div> 
            )
        }
        else if(proposal_action == 6){
            return(
                <div style={{'margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px', 'max-width':'470px'}}>
                    <div style={{ 'overflow-y': 'auto', width:'100%', padding:'0px 0px 0px 0px'}}>
                        {this.load_transfer_actions(items)}
                    </div>
                </div> 
            )
        }

        
    }

    get_proposal_action_data(){
        var object = this.format_proposal_post()
        var proposal_action = object['data'][1][0]

        if(proposal_action == 0){
            var return_items = object['ipfs'].spend_actions
            return return_items
        }
        else if(proposal_action == 1){
            var return_items = object['ipfs'].reconfig_values 
            return return_items
        }
        else if(proposal_action == 6){
            var return_items = object['ipfs'].exchange_transfer_values
            return return_items
        }
    }

    render_spend_actions(items){
        var object = this.format_proposal_post()
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }

        if(items.length == 0){
            items = [0, 1]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '10px','padding':'0px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:20 ,width:'auto'}} />
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
                            <li style={{'padding': '5px'}}>
                                {this.render_detail_item('3', {'title':''+this.format_account_balance_figure(item['amount'])+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['spend_token']], 'details':this.props.app_state.loc['1876']/* 'target: ' */+item['spend_target']+this.props.app_state.loc['1877']/* ', token ID: ' */+item['spend_token'], 'size':'l'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_empty_elements(){
        return(
            <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '7px', 'margin':'0px 5px 5px 5px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                <div style={{'margin':'10px 20px 10px 0px'}}>
                    <img src={Letter} style={{height:30 ,width:'auto'}} />
                </div>
            </div>
        )
    }

    load_reconfig_items(items){
        var object = this.format_proposal_post()
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
                                <div style={{height:140, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '10px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
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
                            <li style={{'padding': '5px'}}>
                                {this.render_detail_item('3', {'title':''+item['title'], 'details':this.props.app_state.loc['1878']/* 'Modify Target' */, 'size':'l'})}
                                <div style={{height:5}}/>
                                {this.render_detail_item('3', {'title':''+item['pos'], 'details':this.props.app_state.loc['1879']/* 'position' */, 'size':'l'})}
                                <div style={{height:5}}/>
                                {this.render_reconfig_value(item)}
                                <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '5px 20px 5px 20px'}}/>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_reconfig_value(item){
        var title = item['title'];
        var ui = item['type']
        var number = item['value']
        if(ui == 'number'){
            return(
                <div>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':title, 'subtitle':this.format_power_figure(number), 'barwidth':this.calculate_bar_width(number), 'number':this.format_account_balance_figure(number), 'barcolor':'', 'relativepower':this.props.app_state.loc['1880']/* 'units' */, })}
                    </div>
                </div>
            )
        }
        else if(ui == 'proportion'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.format_proportion(number), 'details':this.props.app_state.loc['1881']/* 'proportion' */, 'size':'l'})}
                </div>
            )
        }
        else if(ui == 'time'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.get_time_diff(number), 'details':this.props.app_state.loc['1882']/* 'duration' */, 'size':'l'})}

                </div>
            )
        }
        else if(ui == 'tag'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.get_tag_selected_item(title, number), 'details':this.props.app_state.loc['1883']/* 'value: ' */+number, 'size':'l'})}
                </div>
            )
        }
        else if(ui == 'id'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':number, 'details':this.props.app_state.loc['1884']/* 'target ID' */, 'size':'l'})}
                </div>
            )
        }
    }

    get_tag_selected_item(title, number){
        var obj = {'Auto Wait':{0:'no', 1:'yes'}, 'Moderator Modify Privelage':{1:'modifiable', 0:'non-modifiable'}, 'Unlimited Extend Contract Time':{1:'enabled', 0:'disabled'}, 'Bounty Limit Type':{0:'relative', 1:'absolute'}, 'Force Exit Enabled':{1:'enabled', 0:'disabled'}, 'Halving type':{0:'fixed', 1:'spread'}, 'Block Limit Sensitivity':{1:'1', 2:'2', 3:'3', 4:'4', 5:'5'}}

        obj[this.props.app_state.loc['73']]/* 'Auto Wait' */ = {0:'no', 1:'yes'}
        obj[this.props.app_state.loc['75']]/* 'Moderator Modify Privelage' */ = {1:'modifiable', 0:'non-modifiable'} 
        obj[this.props.app_state.loc['76']]/* 'Unlimited Extend Contract Time' */ = {1:'enabled', 0:'disabled'} 
        obj[this.props.app_state.loc['78']]/* 'Bounty Limit Type' */ = {0:'relative', 1:'absolute'}
        obj[this.props.app_state.loc['79']]/* 'Force Exit Enabled' */ = {1:'enabled', 0:'disabled'} 
        obj[this.props.app_state.loc['336']]/* 'Halving type' */ = {0:'fixed', 1:'spread'} 
        obj[this.props.app_state.loc['341']]/* 'Block Limit Sensitivity' */ = {1:'1', 2:'2', 3:'3', 4:'4', 5:'5'}


        return obj[title][number]
    }

    load_transfer_actions(items){
        var object = this.format_proposal_post()
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
                                <div style={{height:140, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '10px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
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
                            <li style={{'padding': '5px'}}>
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':'Token: '+item['token'], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.props.app_state.loc['1885']/* 'tokens' */, })}
                                </div>
                                <div style={{height:5}}/>
                                {this.render_detail_item('3', {'title':this.props.app_state.loc['1886']/* 'Receiver ID: ' */+item['receiver'], 'details':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['exchange']]+':'+item['exchange'], 'size':'s'})}
                                <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '5px 20px 5px 20px'}}/>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }









    render_vote_object_data(){
        var item = this.props.app_state.stack_items[this.state.transaction_index];

        return(
            <div>
                {this.render_detail_item('1',{'active_tags':item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['1887']/* 'Your set vote for the proposal' */, 'title':this.get_selected_item(this.props.app_state.stack_items[this.state.transaction_index].new_vote_tags_object, 'e')})}
                <div style={{height: 10}}/>
                {this.render_bounty_exchanges()}
                <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '0px 20px 20px 20px'}}/>
            </div>
        )
    }

    render_bounty_exchanges(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var stack_item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = stack_item.bounty_exchanges

        if(items.length == 0){
            items = [0, 1]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '10px','padding':'0px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:20 ,width:'auto'}} />
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
                            <li style={{'padding': '5px'}}>
                                {this.render_detail_item('3', {'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['exchange']], 'details':this.props.app_state.loc['1888']/* 'Bounty Exchange ID: ' */+item['exchange'], 'size':'s'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }




    render_pay_subscription_data(){
        var item = this.props.app_state.stack_items[this.state.transaction_index];
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1889']/* 'Time Units' */, 'subtitle':this.format_power_figure(item.time_units), 'barwidth':this.calculate_bar_width(item.time_units), 'number':this.format_account_balance_figure(item.time_units), 'barcolor':'', 'relativepower':this.get_time_units_time(), })}
                </div>
                <div style={{height: 10}}/>
                {this.render_subscription_buy_token_uis(item.subscription_item['data'][2], item.subscription_item['data'][3], item.subscription_item['data'][4])}

                {this.render_detail_item('0')}

            </div>
        )
    }

    get_time_units_time(){
        var item = this.props.app_state.stack_items[this.state.transaction_index];
        var subscription_config = item.subscription_item['data'][1]
        var time_unit = subscription_config[5] == 0 ? 60*53 : subscription_config[5]
        var final_time = bigInt(time_unit).multiply(item.time_units)
        return this.get_time_diff(final_time)
    }

    calculate_final_amount(price){
        var item = this.props.app_state.stack_items[this.state.transaction_index];
        return bigInt(price).multiply(item.time_units)
    }

    render_subscription_buy_token_uis(buy_tokens, buy_amounts, buy_depths){
        var bt = [].concat(buy_tokens)
        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                    {bt.map((item, index) => (
                        <li style={{'padding': '1px'}}>
                            {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['1890']/* 'Token ID: ' */+item, 'subtitle':this.format_power_figure(this.calculate_final_amount(buy_amounts[index])), 'barwidth':this.calculate_bar_width(this.calculate_final_amount(buy_amounts[index])), 'number':this.format_account_balance_figure(this.calculate_final_amount(buy_amounts[index])), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                        </li>
                    ))}
                </ul>
            </div>
            
        )
    }






    render_cancel_subscription_data(){
        var item = this.props.app_state.stack_items[this.state.transaction_index];
        var subscription_config = item.subscription_item['data'][1]
        var time_unit = subscription_config[5] == 0 ? 60*53 : subscription_config[5]
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':this.get_time_diff(time_unit), 'details':this.props.app_state.loc['1891']/* 'Time Unit' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1892']/* 'Time Units To Cancel' */, 'subtitle':this.format_power_figure(item.time_units), 'barwidth':this.calculate_bar_width(item.time_units), 'number':this.format_account_balance_figure(item.time_units), 'barcolor':'', 'relativepower':this.get_time_units_time(), })}
                </div>
                <div style={{height: 10}}/>
                {this.render_subscription_buy_token_uis(item.subscription_item['data'][2], item.subscription_item['data'][3], item.subscription_item['data'][4])}

                {this.render_detail_item('0')}
            </div>
        )
    }




    render_collect_subscription_data(){
        var item = this.props.app_state.stack_items[this.state.transaction_index];
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':''+this.get_time_diff(this.get_total_subscription_collectible_time()), 'details':this.props.app_state.loc['1893']/* 'Total Collectible Time' */, 'size':'s'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':''+this.get_total_subscription_collectible_timeunits(), 'details':this.props.app_state.loc['1894']/* 'Total Collectible Time Units' */, 'size':'s'})}
                <div style={{height: 10}}/>

                {this.render_collect_subscription_buy_token_uis(item.subscription_item['data'][2], item.subscription_item['data'][3], item.subscription_item['data'][4])}

                {this.render_detail_item('0')}
            </div>
        )
    }

    get_total_subscription_collectible_time(){
        var item = this.props.app_state.stack_items[this.state.transaction_index];
        var paid_amount_items = item.subscription_item['paid_amounts']
        var total_time = 0;
        for(var i=0; i<paid_amount_items.length; i++){
            total_time += paid_amount_items[i]
        }
        return total_time;
    }

    get_total_subscription_collectible_timeunits(){
        var item = this.props.app_state.stack_items[this.state.transaction_index];
        var subscription_config = item.subscription_item['data'][1]
        var time_unit = subscription_config[5] == 0 ? 60*53 : subscription_config[5]

        return bigInt(this.get_total_subscription_collectible_time()).divide(bigInt(time_unit))
    }

    render_collect_subscription_buy_token_uis(buy_tokens, buy_amounts, buy_depths){
        var bt = [].concat(buy_tokens)
         return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                    {bt.map((item, index) => (
                        <li style={{'padding': '1px'}}>
                            {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['1895']/* 'Token ID: ' */+item, 'subtitle':this.format_power_figure(this.calculate_collect_subscription_final_amount(buy_amounts[index])), 'barwidth':this.calculate_bar_width(this.calculate_collect_subscription_final_amount(buy_amounts[index])), 'number':this.format_account_balance_figure(this.calculate_collect_subscription_final_amount(buy_amounts[index])), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                        </li>
                    ))}
                </ul>
            </div>
            
        )
    }

    calculate_collect_subscription_final_amount(price){
        return bigInt(price).multiply(this.get_total_subscription_collectible_timeunits())
    }

    get_total_subscription_collectible_timeunits(){
        var item = this.props.app_state.stack_items[this.state.transaction_index];
        var subscription_config = item.subscription_item['data'][1]
        var time_unit = subscription_config[5] == 0 ? 60*53 : subscription_config[5]

        return bigInt(this.get_total_subscription_collectible_time()).divide(bigInt(time_unit))
    }








    render_modify_subscription_data(){
        var item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = item.reconfig_values
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1896']/* 'Modify Subscription Action' */, 'details':items.length+this.props.app_state.loc['1897']/* ' action added' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.load_reconfig_items()}
            </div>
        )
    }

    load_reconfig_items(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var reconfig_item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = [].concat(reconfig_item.reconfig_values)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
                                <div style={{height:140, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '10px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
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
                            <li style={{'padding': '5px'}}>
                                {this.render_detail_item('3', {'title':''+item['title'], 'details':this.props.app_state.loc['1898']/* 'Modify Target' */, 'size':'l'})}
                                <div style={{height:5}}/>
                                {this.render_detail_item('3', {'title':''+item['pos'], 'details':this.props.app_state.loc['1899']/* 'position' */, 'size':'l'})}
                                <div style={{height:5}}/>
                                {this.render_reconfig_value(item)}
                                <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '5px 20px 5px 20px'}}/>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_reconfig_value(item){
        var title = item['title'];
        var ui = item['type']
        var number = item['value']
        if(ui == 'number'){
            return(
                <div>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':title, 'subtitle':this.format_power_figure(number), 'barwidth':this.calculate_bar_width(number), 'number':this.format_account_balance_figure(number), 'barcolor':'', 'relativepower':this.props.app_state.loc['92']/* 'units' */, })}
                    </div>
                </div>
            )
        }
        else if(ui == 'id'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':number, 'details':this.props.app_state.loc['1016']/* 'target ID' */, 'size':'l'})}
                </div>
            )
        }
    }








    render_modify_contract_data(){
        var item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = item.reconfig_values
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1900']/* 'Modify Contract Action' */, 'details':items.length+this.props.app_state.loc['1901']/* ' action(s) added' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.load_contract_reconfig_items()}
            </div>
        )
    }

    load_contract_reconfig_items(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = [].concat(item.reconfig_values)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
                                <div style={{height:140, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '10px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
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
                            <li style={{'padding': '5px'}}>
                                {this.render_detail_item('3', {'title':''+item['title'], 'details':this.props.app_state.loc['1902']/* 'Modify Target' */, 'size':'l'})}
                                <div style={{height:5}}/>
                                {this.render_detail_item('3', {'title':''+item['pos'], 'details':this.props.app_state.loc['1903']/* 'position' */, 'size':'l'})}
                                <div style={{height:5}}/>
                                {this.render_contract_reconfig_value(item)}
                                <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '5px 20px 5px 20px'}}/>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_contract_reconfig_value(item){
        var title = item['title'];
        var ui = item['type']
        var number = item['value']
        if(ui == 'number'){
            return(
                <div>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':title, 'subtitle':this.format_power_figure(number), 'barwidth':this.calculate_bar_width(number), 'number':this.format_account_balance_figure(number), 'barcolor':'', 'relativepower':this.props.app_state.loc['1904']/* 'units' */, })}
                    </div>
                </div>
            )
        }
        else if(ui == 'proportion'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.format_proportion(number), 'details':this.props.app_state.loc['1013']/* 'proportion' */, 'size':'l'})}
                </div>
            )
        }
        else if(ui == 'time'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.get_time_diff(number), 'details':this.props.app_state.loc['1014']/* 'duration' */, 'size':'l'})}

                </div>
            )
        }
        else if(ui == 'tag'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.get_contract_tag_selected_item(title, number), 'details':this.props.app_state.loc['1015']/* 'value: ' */+number, 'size':'l'})}
                </div>
            )
        }
        else if(ui == 'id'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':number, 'details':this.props.app_state.loc['1016']/* 'target ID' */, 'size':'l'})}
                </div>
            )
        }
    }

    get_contract_tag_selected_item(title, number){
        var obj = {'Auto Wait':{0:'no', 1:'yes'}, 'Moderator Modify Privelage':{1:'modifiable', 0:'non-modifiable'}, 'Unlimited Extend Contract Time':{1:'enabled', 0:'disabled'}, 'Bounty Limit Type':{0:'relative', 1:'absolute'}, 'Force Exit Enabled':{1:'enabled', 0:'disabled'}}

        obj[this.props.app_state.loc['73']] = {0:'no', 1:'yes'};
        obj[this.props.app_state.loc['75']] = {1:'modifiable', 0:'non-modifiable'};
        obj[this.props.app_state.loc['76']] = {1:'enabled', 0:'disabled'};
        obj[this.props.app_state.loc['78']] = {0:'relative', 1:'absolute'};
        obj[this.props.app_state.loc['79']] = {1:'enabled', 0:'disabled'};

        return obj[title][number]
    }








    render_modify_token_data(){
        var item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = item.reconfig_values
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1905']/* 'Modify Token Exchange Action' */, 'details':items.length+this.props.app_state.loc['1906']/* ' actions added' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.load_token_reconfig_items()}
            </div>
        )
    }

    load_token_reconfig_items(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = [].concat(item.reconfig_values)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
                                <div style={{height:140, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '10px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
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
                            <li style={{'padding': '5px'}}>
                                {this.render_detail_item('3', {'title':''+item['title'], 'details':this.props.app_state.loc['1907']/* 'Modify Target' */, 'size':'l'})}
                                <div style={{height:5}}/>
                                {this.render_detail_item('3', {'title':''+item['pos'], 'details':this.props.app_state.loc['1908']/* 'position' */, 'size':'l'})}
                                <div style={{height:5}}/>
                                {this.render_token_reconfig_value(item)}
                                <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '5px 20px 5px 20px'}}/>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_token_reconfig_value(item){
        var title = item['title'];
        var ui = item['type']
        var number = item['value']
        if(ui == 'number'){
            return(
                <div>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':title, 'subtitle':this.format_power_figure(number), 'barwidth':this.calculate_bar_width(number), 'number':this.format_account_balance_figure(number), 'barcolor':'', 'relativepower':this.props.app_state.loc['92']/* 'units' */, })}
                    </div>
                </div>
            )
        }
        else if(ui == 'proportion'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.format_proportion(number), 'details':this.props.app_state.loc['1013']/* 'proportion' */, 'size':'l'})}
                </div>
            )
        }
        else if(ui == 'time'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.get_time_diff(number), 'details':this.props.app_state.loc['1014']/* 'duration' */, 'size':'l'})}

                </div>
            )
        }
        else if(ui == 'tag'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.get_token_tag_selected_item(title, number), 'details':this.props.app_state.loc['1015']/* 'value: ' */+number, 'size':'l'})}
                </div>
            )
        }
        else if(ui == 'id'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':number, 'details':this.props.app_state.loc['1016']/* 'target ID' */, 'size':'l'})}
                </div>
            )
        }
    }

    get_token_tag_selected_item(title, number){
        var obj = {'Auto Wait':{0:'no', 1:'yes'}, 'Moderator Modify Privelage':{1:'modifiable', 0:'non-modifiable'}, 'Unlimited Extend Contract Time':{1:'enabled', 0:'disabled'}, 'Bounty Limit Type':{0:'relative', 1:'absolute'}, 'Force Exit Enabled':{1:'enabled', 0:'disabled'}, 'Halving type':{0:'fixed', 1:'spread'}, 'Block Limit Sensitivity':{1:'1', 2:'2', 3:'3', 4:'4', 5:'5'}}

        obj[this.props.app_state.loc['73']]/* 'Auto Wait' */ = {0:'no', 1:'yes'}
        obj[this.props.app_state.loc['75']]/* 'Moderator Modify Privelage' */ = {1:'modifiable', 0:'non-modifiable'} 
        obj[this.props.app_state.loc['76']]/* 'Unlimited Extend Contract Time' */ = {1:'enabled', 0:'disabled'} 
        obj[this.props.app_state.loc['78']]/* 'Bounty Limit Type' */ = {0:'relative', 1:'absolute'}
        obj[this.props.app_state.loc['79']]/* 'Force Exit Enabled' */ = {1:'enabled', 0:'disabled'} 
        obj[this.props.app_state.loc['336']]/* 'Halving type' */ = {0:'fixed', 1:'spread'} 
        obj[this.props.app_state.loc['341']]/* 'Block Limit Sensitivity' */ = {1:'1', 2:'2', 3:'3', 4:'4', 5:'5'}

        return obj[title][number]
    }









    render_exchange_transfer_data(){
        var item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = item.exchange_transfer_values
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1909']/* 'Exchange Transfer Action' */, 'details':items.length+this.props.app_state.loc['1906']/* ' actions added' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.load_transfer_actions()}
            </div>
        )
    }

    load_transfer_actions(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var transfer_item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = [].concat(transfer_item.exchange_transfer_values)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '10px','padding':'0px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:20 ,width:'auto'}} />
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
                            <li style={{'padding': '5px'}}>
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1895']/* Token: ' */+item['token'], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['token']], })}
                                </div>
                                <div style={{height:5}}/>
                                {this.render_detail_item('3', {'title':this.props.app_state.loc['1910']/* 'Receiver ID: ' */+item['receiver'], 'details':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['exchange']]+':'+item['exchange'], 'size':'s'})}
                                <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '5px 20px 5px 20px'}}/>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }





    render_force_exit_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = transaction_item.force_exit_accounts
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1911']/* 'Force Exit Action' */, 'details':items.length+this.props.app_state.loc['1906']/* ' actions added' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.load_force_exit_actions()}
            </div>
        )
    }


    load_force_exit_actions(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = [].concat(transaction_item.force_exit_accounts)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '10px','padding':'0px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:20 ,width:'auto'}} />
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
                            <li style={{'padding': '5px'}}>
                                <div style={{height:5}}/>
                                {this.render_detail_item('3', {'title':this.props.app_state.loc['837']/* 'Account ID: ' */+item, 'details':this.props.app_state.loc['1605']/* 'Contract ID: ' */+transaction_item.contract_item['id'], 'size':'s'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }



    render_archive_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = transaction_item.bounty_exchanges
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1912']/* 'Archive Action' */, 'details':items.length+this.props.app_state.loc['1913']/* ' bounty exchanges included' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_bounty_exchanges()}
            </div>
        )
    }

    render_bounty_exchanges(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = [].concat(transaction_item.bounty_exchanges)

        if(items.length == 0){
            items = [0, 1]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '10px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 10px 0px'}}>
                                        <img src={Letter} style={{height:30 ,width:'auto'}} />
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
                            <li style={{'padding': '5px'}}>
                                {this.render_detail_item('3', {'title':this.props.app_state.loc['1914']/* 'Bounty Exchange ID: ' */+item['exchange'], 'details':this.props.app_state.loc['1915']/* 'Default depth 0' */, 'size':'s'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }






    render_freeze_unfreeze_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = transaction_item.freeze_unfreeze_actions
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1916']/* 'Freeze/Unfreeze Action' */, 'details':items.length+this.props.app_state.loc['1917']/* ' actions included' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_freeze_unfreeze_transactions()}

            </div>
        )
    }

    render_freeze_unfreeze_transactions(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = [].concat(transaction_item.freeze_unfreeze_actions)

        if(items.length == 0){
            items = [0, 1]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 10px 0px'}}>
                                        <img src={Letter} style={{height:30 ,width:'auto'}} />
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
                            <li style={{'padding': '5px'}}>
                                {this.render_detail_item('3', {'title':''+item['action-name']+' '+this.format_account_balance_figure(item['amount'])+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[transaction_item.token_item['id']], 'details':this.props.app_state.loc['1918']/* 'Target Account ID: ' */+item['recipient'], 'size':'s'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }





    render_authmint_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = transaction_item.authmint_actions
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1919']/* 'Authmint Actions' */, 'details':items.length+this.props.app_state.loc['1917']/* ' actions included' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_authmint_transactions()}
            </div>
        )
    }


    render_authmint_transactions(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = [].concat(transaction_item.authmint_actions)

        if(items.length == 0){
            items = [0, 1]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 10px 0px'}}>
                                        <img src={Letter} style={{height:30 ,width:'auto'}} />
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
                            <li style={{'padding': '5px'}}>
                                {this.render_detail_item('3', {'title':this.format_account_balance_figure(item['amount']), 'details':this.props.app_state.loc['1920']/* 'Target Recipient ID: ' */+item['recipient'], 'size':'s'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }



    render_access_right_setting_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = transaction_item.all_actions
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1921']/* 'Access Rights Actions' */, 'details':items.length+this.props.app_state.loc['1922']/* ' actions included' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_access_rights_transactions()}
            </div>
        )
    }

    render_access_rights_transactions(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = [].concat(transaction_item.all_actions)

        if(items.length == 0){
            items = [0, 1]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 10px 0px'}}>
                                        <img src={Letter} style={{height:30 ,width:'auto'}} />
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
                            <li style={{'padding': '5px'}} onClick={()=>this.when_item_clicked(item)}>
                                {this.render_all_action_item(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_all_action_item(item){
        var action = item.type;
        if(action == 'moderator'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':action+' action: '+item['action'], 'details':this.props.app_state.loc['1923']/* 'Target: ' */+item['account'], 'size':'s'})}
                </div>
            )
        }
        else if(action == 'interactable-checkers'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':action+' action.', 'details':this.props.app_state.loc['1923']/* 'Target: ' */+item['setting'], 'size':'s'})}
                </div>
            )
        }
        else if(action == 'author-moderator-privelages'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':action+' action.', 'details':this.props.app_state.loc['1924']/* 'Target: Revoke Privelages' */, 'size':'s'})}
                </div>
            )
        }
        else if(action == 'access-rights'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':action+' action.', 'details':this.props.app_state.loc['1923']/* 'Target: ' */+item['account']+this.props.app_state.loc['1925']/* ', time from now: ' */+this.get_time_from_now(item['time']), 'size':'s'})}
                </div>
            )
        }
        else if(action == 'blocked-access'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':action+' action.', 'details':this.props.app_state.loc['1923']/* 'Target: ' */+item['account']+this.props.app_state.loc['1925']/* ', time from now: ' */+this.get_time_from_now(item['time']), 'size':'s'})}
                </div>
            )
        }
    }






    render_mail_data(){
        var background_color = this.props.theme['card_background_color']
        var object = this.format_mail_post();
        var item = this.get_mail_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects

        return(
            <div style={{ 'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':object['ipfs'].target_recipient, 'details':'Target Recipient', 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('0')}
                    {this.render_item_data(items)}
                    {this.render_item_images()}

                    {this.render_selected_links()}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    format_mail_post(){
        return{'ipfs':this.props.app_state.stack_items[this.state.transaction_index]}
    }

    get_mail_details_data(object){
        var tags = object['ipfs'] == null ? ['Post'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
        }
    }







    render_mail_message_data(title){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var stacked_items = this.get_stacked_items()
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':title, 'details':stacked_items.length+this.props.app_state.loc['1926']/* ' messages included' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_sent_received_messages()}
            </div>
        )
    }

    render_sent_received_messages(){
        var middle = this.props.height-200;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var stacked_items = [].concat(this.get_stacked_items())

        if(stacked_items.length == 0){
            stacked_items = [0,1]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {stacked_items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img src={Letter} style={{height:30 ,width:'auto'}} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }else{
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {stacked_items.map((item, index) => (
                            <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                <div>
                                    <SwipeableList>
                                        <SwipeableListItem
                                            swipeLeft={{
                                            content: <div>Delete</div>,
                                            action: () => this.delete_message_item(item)
                                            }}>
                                            <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>{this.render_stack_message_item(item)}</div>
                                        </SwipeableListItem>
                                    </SwipeableList>
                                    <div style={{height:3}}/>
                                </div>
                            </li>
                        ))}

                        <div ref={this.messagesEnd}/>
                    </ul>
                </div>
            )
        }
    }

    delete_message_item(item){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        this.props.delete_message_item(item, transaction_item)
    }

    render_stack_message_item(item){
        if(item.type == 'message'){
            return(
                <div style={{'padding': '7px 15px 10px 15px','margin':'0px 0px 0px 0px', 'background-color': this.props.theme['view_group_card_item_background'],'border-radius': '7px'}}>
                    <div className="row" style={{'padding':'0px 0px 0px 0px'}}>
                          <div className="col-9" style={{'padding': '0px 0px 0px 14px', 'height':'20px' }}> 
                            <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} >{item['sender']}</p>
                          </div>
                          <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                            <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{this.get_time_difference(item['time'])}</p>
                          </div>
                    </div>
                    <p style={{'font-size': '11px','color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'white-space': 'pre-line'}}>{this.format_message(item['message'])}</p>
                </div>
            )
        }else{
            return(
                <div style={{'padding': '7px 15px 10px 15px','margin':'0px 0px 0px 0px', 'background-color': this.props.theme['view_group_card_item_background'],'border-radius': '7px'}}>
                    
                    <div className="row" style={{'padding':'0px 0px 0px 0px'}}>
                          <div className="col-9" style={{'padding': '0px 0px 0px 14px', 'height':'20px' }}> 
                            <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} >{item['sender']}</p>
                          </div>
                          <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                            <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{this.get_time_difference(item['time'])}</p>
                          </div>
                    </div>
                    <p style={{'font-size': '11px','color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'white-space': 'pre-line'}}>{this.format_message(item['message'])}</p>

                    {this.render_detail_item('9',item['image-data'])}
                </div>
            )
        }
    }

    format_message(message){
        if(message == ''){
            return '...'
        }
        return message
    }

    get_stacked_items(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        return transaction_item.messages_to_deliver
    }




    render_job_response_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1927']/* 'Selected Contract' */, 'details':this.props.app_state.loc['1928']/* 'The contract you picked for the application action' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_contract_item(transaction_item.picked_contract)}
                {this.render_detail_item('0')}
                
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1929']/* 'Selected Expiry Time' */, 'details':this.props.app_state.loc['1930']/* 'The expiry time you picked for the application action' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.get_time_diff(transaction_item.application_expiry_time - (Date.now()/1000)), 'details':''+(new Date(transaction_item.application_expiry_time * 1000)), 'size':'l'})}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1931']/* 'Set Prices' */, 'details':this.props.app_state.loc['1932']/* 'The amounts youre youll be charging for the job' */, 'size':'l'})}
                {this.render_set_prices_list_part()}
            </div>
        )
    }

    render_contract_item(object){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_contract_item(object)

        return(
            <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '5px 0px 5px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                </div>         
            </div>
        )
    }

    format_contract_item(object){
        var tags = object['ipfs'] == null ? ['Contract'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Contract ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{ 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['1348']/* 'block' */, }
        }
    }

    render_set_prices_list_part(){
        var middle = this.props.height-300;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = [].concat(transaction_item.price_data)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 10px 0px'}}>
                                        <img src={Letter} style={{height:30 ,width:'auto'}} />
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
                            <li style={{'padding': '5px'}} onClick={()=>this.when_amount_clicked(item)}>
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        
    }

    when_amount_clicked(){}






    render_accept_job_application_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var item = transaction_item.application_item
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1605']/* 'Contract ID: ' */+item['picked_contract_id'], 'details':this.props.app_state.loc['1606']/* 'Sender ID: ' */+item['applicant_id'], 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1639']/* 'Expiry time from now: ' */+this.get_time_diff(item['application_expiry_time'] - (Date.now()/1000)), 'details':''+(new Date(item['application_expiry_time'] * 1000)), 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('0')}
                
            </div>  
        )
    }






    render_storefront_bag_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':''+transaction_item.items_to_deliver.length+this.props.app_state.loc['1933']/* ' items' */, 'details':this.props.app_state.loc['1934']/* 'in your bag.' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_bag_value()}
                {this.render_detail_item('0')}

                {this.render_all_items()}
                <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '2px 20px 20px 20px'}}/>
            </div>
        )
    }

    render_bag_value(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var items_to_deliver = [].concat(transaction_item.items_to_deliver)
        if(items_to_deliver.length != 0){
            var total_amounts = this.get_total_bag_value(items_to_deliver)

            if(total_amounts != null){
                return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2064a']/* 'Bag Value.' */, 'details':this.props.app_state.loc['2771']/* 'The value of all the items in your bag in their respective denominations.' */, 'size':'l'})}
                    <div style={{height: 10}}/>
                    {total_amounts.map((units, index) => (
                        <div style={{'padding': '2px 0px 2px 0px'}}>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[transaction_item.e5+units['id']], 'subtitle':this.format_power_figure(units['amount']), 'barwidth':this.calculate_bar_width(units['amount']), 'number':this.format_account_balance_figure(units['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[units['id']], })}
                            </div>
                        </div>
                    ))}
                </div>
            )
            }
        }
    }

    get_total_bag_value(items_to_deliver){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var obj = {}
        items_to_deliver.forEach(item => {
            var storefront = this.props.app_state.created_store_mappings[transaction_item.e5][item['storefront_item']['id']]
            var variant_in_store = this.get_variant_object_from_storefront(storefront, item['selected_variant']['variant_id'])
            if(variant_in_store == null) return null
            var price_items = variant_in_store['price_data']
            
            for(var i=0; i<price_items.length; i++){
                var units = price_items[i];
                var amount = this.get_amounts_to_be_paid(units['amount'], item.purchase_unit_count)
                var token_id = units['id']

                if(obj[token_id] == null){
                    obj[token_id] = bigInt(0);
                }
                obj[token_id] = bigInt(obj[token_id]).add(amount)
            }
        });
        
        var arr = []
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                arr.push({'id':key, 'amount':obj[key]})
            }
        }

        return arr
    }

    get_variant_object_from_storefront(storefront, id){
        if(storefront == null) return null;
        for(var i=0; i<storefront['ipfs'].variants.length; i++){
            if(storefront['ipfs'].variants[i]['variant_id'] == id){
                return storefront['ipfs'].variants[i]
            }
        }
    }

    render_all_items(){
        var middle = this.props.height-100;
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var items_to_deliver = [].concat(transaction_item.items_to_deliver)

        return (
            <div style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items_to_deliver.map((item, index) => (
                        <li style={{'padding': '2px 0px 2px 0px'}}>
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <div>Delete</div>,
                                    action: () => this.props.delete_bag_item(item)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>{this.render_picked_variants_for_each(item)}</div>
                                </SwipeableListItem>
                            </SwipeableList>
                            
                        </li>
                    ))}
                </ul>
            </div>
        );
    }


    render_picked_variants_for_each(item){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var selected_variant = item.selected_variant   
        var storefront_item = item.storefront_item
        var composition_type = storefront_item['ipfs'].composition_type == null ? this.props.app_state.loc['1935']/* 'items' */ : this.get_selected_item(storefront_item['ipfs'].composition_type, 'e') 
        var items = selected_variant['price_data']
        return(
            <div> 
                <div onClick={() => this.when_picked_variant_tapped(item)}>
                    {this.render_detail_item('3', {'title':storefront_item['ipfs'].entered_title_text+'; '+selected_variant['variant_description'], 'details':this.format_account_balance_figure(item.purchase_unit_count)+this.props.app_state.loc['1936']/* ' units in ' */+composition_type, 'size':'s'})} 
                </div> 
                {this.render_picked_variant_prices(item, items)}
                
            </div>
        )
    }

    render_picked_variant_prices(item, items){
        if(this.state.picked_variant == item){
            return(
                <div>
                    <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                        <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                            {items.map((units, index) => (
                                <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                    {this.render_detail_item('3', {'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+units['id']], 'details':this.format_account_balance_figure(this.get_amounts_to_be_paid(units['amount'], item.purchase_unit_count)) +' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[units['id']], 'size':'s'})}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }
    }

    when_picked_variant_tapped(item){
        if(this.state.picked_variant == item){
            this.setState({picked_variant: null})
        }else{
            this.setState({picked_variant: item})
        }
    }

    get_storefront_image(object){
        return object['ipfs'].entered_image_objects.length == 0 ? null : object['ipfs'].entered_image_objects[0]
    }

    get_amounts_to_be_paid(amount, count){
        return bigInt(amount).multiply(bigInt(count))
    }

    





    render_bag_response_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1938']/* 'Selected Contract' */, 'details':this.props.app_state.loc['1939']/* 'The contract you picked for the fulfilment action' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_contract_item(transaction_item.picked_contract)}
                {this.render_detail_item('0')}
                
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1940']/* 'Selected Expiry Time' */, 'details':this.props.app_state.loc['1941']/* 'The expiry time you picked for the fulfilment action' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.get_time_diff(transaction_item.application_expiry_time - (Date.now()/1000)), 'details':''+(new Date(transaction_item.application_expiry_time * 1000)), 'size':'l'})}
                
                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.get_time_diff(transaction_item.estimated_delivery_time), 'details':this.props.app_state.loc['1942']/* 'Estimated Delivery time' */, 'size':'l'})}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.get_selected_item(transaction_item.pre_post_paid_option, 'e'), 'details':this.props.app_state.loc['1943']/* 'The payment option you prefer' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':'Set Prices', 'details':this.props.app_state.loc['1944']/* 'The amounts youre youll be charging for the bag fulfilment' */, 'size':'l'})}
                {this.render_set_prices_list_part()}
            </div>
        )
    }


    render_accept_bag_application_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var item = transaction_item.application_item
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1945']/* 'Contract ID: ' */+item['picked_contract_id'], 'details':this.props.app_state.loc['1946']/* 'Sender ID: ' */+item['applicant_id'], 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1947']/* 'Expiry time from now: ' */+this.get_time_diff(item['application_expiry_time'] - (Date.now()/1000)), 'details':''+(new Date(item['application_expiry_time'] * 1000)), 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('0')}
                
            </div>  
        )
    }






    render_direct_purchase_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var storefront_object = transaction_item.storefront_item
        var composition_type = storefront_object['ipfs'].composition_type == null ? 'items' : this.get_selected_item(storefront_object['ipfs'].composition_type, 'e')
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1948']/* 'Shipping Details' */, 'details':transaction_item.fulfilment_location, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_selected_variant(transaction_item.selected_variant)}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1949']/* 'Number of Units ordered in ' */+composition_type, 'subtitle':this.format_power_figure(transaction_item.purchase_unit_count), 'barwidth':this.calculate_bar_width(transaction_item.purchase_unit_count), 'number':this.format_account_balance_figure(transaction_item.purchase_unit_count), 'barcolor':'', 'relativepower':composition_type, })}
                </div>

                <div style={{height: 10}}/>
                {this.render_set_storefront_prices_list_part()}
                {this.render_detail_item('0')}
            </div>
        )
    }


    render_selected_variant(item){
        return(
            <div>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 0px 5px','border-radius': '13px' }}>
                    {this.render_detail_item('4', {'text':item['variant_description'], 'textsize':'13px', 'font':this.props.app_state.font})}
                    <div style={{height:3}}/>
                    <div style={{padding:'0px 0px 0px 10px'}}>
                        {this.render_detail_item('9', item['image_data']['data'])}
                    </div>
                    <div style={{height:5}}/>
                    {this.render_detail_item('3', {'title':this.format_account_balance_figure(item['available_unit_count']), 'details':this.props.app_state.loc['1950']/* 'Number of Units' */, 'size':'l'})}
                    <div style={{height:15}}/>
                    {this.render_variant_price_data(item)}
                </div>
            </div>
        )
    }


    render_set_storefront_prices_list_part(){
        var middle = this.props.height-200;
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        if(transaction_item.selected_variant != null){
            var items = [].concat(transaction_item.selected_variant['price_data'])
            var shipping_items = [].concat(transaction_item.storefront_item['ipfs'].shipping_price_data)
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1951']/* 'Purchase Amounts' */, 'details':this.props.app_state.loc['1952']/* 'This is the final amount for the price of the item your buying' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px 0px 5px 0px'}}>
                                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['id']], 'subtitle':this.format_power_figure(this.get_amounts_to_be_paid(item['amount'], transaction_item.purchase_unit_count)), 'barwidth':this.calculate_bar_width(this.get_amounts_to_be_paid(item['amount'], transaction_item.purchase_unit_count)), 'number':this.format_account_balance_figure(this.get_amounts_to_be_paid(item['amount'], transaction_item.purchase_unit_count)), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1953']/* 'Shipping Fee' */, 'details':this.props.app_state.loc['1954']/* 'The charged shipping fee for buying the items' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {shipping_items.map((item, index) => (
                            <li style={{'padding': '5px 0px 5px 0px'}}>
                                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }




    render_clear_purchase_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'size':'l', 'title':''+transaction_item.items_to_clear.length, 'details':'collected fulfilment signatures' })}
                <div style={{height:10}}/>

                {this.render_all_clear_action_items()}
            </div>
        )
    }

    render_all_clear_action_items(){
        var middle = this.props.height-100;
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = [].concat(transaction_item.items_to_clear)
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1955']/* 'Collected Signatures' */, 'details':this.props.app_state.loc['1956']/* 'Below are the collected signatures from your direct purchases' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '3px 0px 3px 0px'}}>
                                <SwipeableList>
                                        <SwipeableListItem
                                            swipeLeft={{
                                            content: <div>{this.props.app_state.loc['1957']/* Delete */}</div>,
                                            action: () => this.delete_collected_signature(item)
                                            }}>
                                            <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>{this.render_fulfilment_item(item)}</div>
                                        </SwipeableListItem>
                                    </SwipeableList>
                            </li>
                        ))}
                    </ul>
                </div>
            )
    }

    render_fulfilment_item(item){
        var variant_description = this.get_variant_from_id(item.order_data['variant_id'], item)==null?'':this.get_variant_from_id(item.order_data['variant_id'], item)['variant_description']

        return(
            <div>
                {this.render_detail_item('3', {'size':'s', 'title':this.props.app_state.loc['1958']/* 'Variant ID: ' */+item.order_data['variant_id'], 'details':variant_description})}
                <div style={{height:5}}/>
                {this.render_detail_item('3', {'size':'s', 'title':this.props.app_state.loc['1959']/* 'Received Signature' */, 'details':start_and_end(item.received_signature) })}
                <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '10px 20px 10px 20px'}}/>
            </div>
        )
    }

    get_variant_from_id(variant_id, state){
        var object = state.order_storefront
        for(var i=0; i<object['ipfs'].variants.length; i++){
            if(object['ipfs'].variants[i]['variant_id'] == variant_id){
                return object['ipfs'].variants[i]
            }
        }
    }

    delete_collected_signature(item){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        this.props.delete_collected_signature(item, transaction_item)
    }








    render_contractor_post_data(){
        var background_color = this.props.theme['card_background_color']
        var object = this.format_contractor_post();
        var item = this.get_contractor_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects

        return(
            <div style={{ 'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    {this.render_detail_item('0')}
                    {this.render_item_data(items)}
                    {this.render_contractor_price_amounts()}
                    {this.render_item_images()}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    format_contractor_post(){
        return{'ipfs':this.props.app_state.stack_items[this.state.transaction_index]}
    }

    get_contractor_details_data(object){
        var tags = object['ipfs'] == null ? ['Contractor'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Contractor ID' : object['ipfs'].entered_title_text
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
        }
    }

    render_contractor_price_amounts(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var object = this.format_contractor_post();
        var items = [].concat(object['ipfs'].price_data)
        if(items.length == 0){
            items = [0, 1, 2]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['view_group_card_item_background'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img src={Letter} style={{height:30 ,width:'auto'}} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div> 
            )
        }
        return(
            <div style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '2px 0px 2px 0px'}}>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }







    render_job_request_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>
                
                {this.render_detail_item('3', {'title':'Selected Expiry Time', 'details':this.props.app_state.loc['1960']/* 'The expiry time you picked for the application action' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.get_time_diff(transaction_item.application_expiry_time - (Date.now()/1000)), 'details':''+(new Date(transaction_item.application_expiry_time * 1000)), 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1961']/* 'Set Description' */, 'details':transaction_item.entered_title_text, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_image_part()}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1962']/* 'Set Prices' */, 'details':this.props.app_state.loc['1963']/* 'The amounts youll be charging for the job' */, 'size':'l'})}
                {this.render_set_prices_list_part()}
            </div>
        )
    }

    render_image_part(){
        var col = Math.round(this.props.app_state.width / 100)
        var rowHeight = 100;
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = [].concat(transaction_item.entered_image_objects)

        if(items.length == 0){
            var items = ['1','1','1']
            var background_color = this.props.theme['card_background_color']
            return(
                <div>
                    <ImageList sx={{ width: 'auto', height: 'auto' }} cols={col} rowHeight={rowHeight}>
                        {items.map((item, index) => (
                            <ImageListItem key={item.img}>
                                <div style={{height:100, width:100, 'background-color': background_color, 'border-radius': '5px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img src={Letter} style={{height:40 ,width:'auto'}} />
                                    </div>
                                    
                                </div>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            )
        }else{
            var background_color = this.props.theme['card_background_color']
            return(
                <div>
                    <ImageList sx={{ width: 'auto', height: 'auto' }} cols={col} rowHeight={rowHeight}>
                        {items.map((item, index) => (
                            <ImageListItem key={item.img}>
                                <div>
                                    <img src={item} style={{height:100 ,width:100}} />
                                </div> 
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            )
        }
    }








    render_accept_job_request_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1964']/* 'Selected Contract' */, 'details':this.props.app_state.loc['1965']/* 'The contract you picked for the job.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_contract_item(transaction_item.picked_contract)}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1966']/* 'Set Description' */, 'details':transaction_item.request_item['title_description'], 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1967']/* 'Set Prices' */, 'details':this.props.app_state.loc['1968']/* 'The amounts youll be receiving for the job' */, 'size':'l'})}
                {this.render_job_request_set_prices_list_part(transaction_item.request_item)}
            </div>
        )
    }

    render_job_request_set_prices_list_part(item){
        var middle = this.props.height-300;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(item['price_data'])

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 10px 0px'}}>
                                        <img src={Letter} style={{height:30 ,width:'auto'}} />
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
                            <li style={{'padding': '5px'}} onClick={()=>this.when_amount_clicked(item)}>
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        
    }

    
    
    
    
    
    
    
    render_alias_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':transaction_item.alias, 'details':'New Alias.', 'size':'l'})}
                <div style={{height:10}}/>
                
            </div>
        )
    }

    render_unalias_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':transaction_item.alias, 'details':'Unreserve Alias.', 'size':'l'})}
                <div style={{height:10}}/>
                
            </div>
        )
    }

    render_realias_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':transaction_item.alias, 'details':this.props.app_state.loc['1969']/* 'Reset Alias.' */, 'size':'l'})}
                <div style={{height:10}}/>
                
            </div>
        )
    }













    render_edit_channel(){
        var background_color = this.props.theme['card_background_color']
        var object = this.format_channel_post();
        var item = this.get_channel_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects

        return(
            <div style={{ 'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}

                    {this.render_item_data(items)}
                    {this.render_item_images()}
                    {this.render_selected_links()}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_edit_contractor(){
        var background_color = this.props.theme['card_background_color']
        var object = this.format_contractor_post();
        var item = this.get_contractor_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects

        return(
            <div style={{ 'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    {this.render_detail_item('0')}
                    {this.render_item_data(items)}
                    {this.render_item_images()}
                    {this.render_selected_links()}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_edit_job(){
        var background_color = this.props.theme['card_background_color']
        var object = this.format_job_post();
        var item = this.get_job_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects

        return(
            <div style={{ 'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    {this.render_detail_item('0')}
                    {this.render_item_data(items)}
                    {this.render_item_images()}
                    {this.render_selected_links()}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1970']/* 'Price Amounts' */, 'details':this.props.app_state.loc['1971']/* 'The amounts you are offering for the job.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_price_amounts()}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_edit_post(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-150
        var object = this.format_post();
        var item = this.get_post_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects

        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    {this.render_detail_item('0')}
                    {this.render_item_data(items)}
                    {this.render_item_images()}
                    {this.render_selected_links()}
                    
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_edit_storefront(){
        var background_color = this.props.theme['card_background_color']
        var object = this.format_storefront_post();
        var item = this.get_storefront_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects

        return(
            <div style={{padding:'0px 0px 10px 0px'}}>
                <div style={{ 'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                    <div style={{ 'overflow-y': 'auto', width:'100%', padding:'0px 10px 0px 10px'}}>
                        {this.render_detail_item('1', item['tags'])}
                        <div style={{height: 10}}/>
                        {this.render_detail_item('3', item['id'])}

                        {this.render_detail_item('0')}
                        {this.render_item_data(items)}
                        {this.render_item_images()}
                        {this.render_selected_links()}

                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                </div>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1972']/* 'Item Variants' */, 'details':this.props.app_state.loc['1973']/* 'The items variant details are shown below' */, 'size':'l'})}
                <div style={{height: 10}}/>
                {this.render_set_storefront_variant_list_part()}
                {this.render_detail_item('0')}
            </div>
            
        )
    }

    render_edit_token(){
        var background_color = this.props.theme['card_background_color']
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];     
        var item = this.get_spend_data();
        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', padding:'0px 10px 0px 10px'}}>
                    
                    {this.render_detail_item('7', item['banner-icon'])}
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['unlocked_supply'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['unlocked_liquidity'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['fully_custom'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', item['token_type'])}
                    
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_edit_proposal(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-150
        var object = this.format_proposal2();
        var item = this.get_proposal_details_data2(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects

        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    {this.render_detail_item('0')}
                    {this.render_item_data(items)}
                    {this.render_item_images()}
                    {this.render_selected_links()}
                    
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }


    format_proposal2(){
        return{'ipfs':this.props.app_state.stack_items[this.state.transaction_index]}
    }

    get_proposal_details_data2(object){
        var tags = object['ipfs'] == null ? ['Proposal'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Proposal ID' : object['ipfs'].entered_title_text
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
        }
    }








    render_award_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var award_amount = transaction_item.award_amount
        var multiplier = transaction_item.multiplier
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', transaction_item.selected_tier_object['label'])}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':'x'+multiplier, 'details':this.props.app_state.loc['1974']/* 'Multiplier' */, 'size':'l'})}
                <div style={{height: 10}}/>


                {this.render_detail_item('3', {'title':this.props.app_state.loc['1975']/* 'message:' */, 'details':''+transaction_item.entered_message_text, 'size':'l'})}
                {this.render_detail_item('0')}

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['1976']/* 'Total amount of spend' */, 'subtitle':this.format_power_figure(award_amount), 'barwidth':this.calculate_bar_width(award_amount), 'number':this.format_account_balance_figure(award_amount), 'barcolor':'', 'relativepower':'SPEND', })}
                </div>
                <div style={{height: 10}}/>
                
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1977']/* 'Custom Amounts' */, 'details':this.props.app_state.loc['1978']/* 'Your included custom amounts for the award action' */, 'size':'l'})}
                <div style={{height: 10}}/>
                {this.render_set_prices_list_part()}
                {this.render_detail_item('0')}
            </div>
        )
    }


    render_set_prices_list_part(){
        var middle = this.props.height-300;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = [].concat(transaction_item.price_data)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img src={Letter} style={{height:30 ,width:'auto'}} />
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
                            <li style={{'padding': '1px 1px 1px 1px'}} onClick={()=>this.when_amount_clicked(item)}>
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        
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







    render_depthmint_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = transaction_item.authmint_actions
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1979']/* 'Depth-mint Actions' */, 'details':items.length+this.props.app_state.loc['1917']/* ' actions included' */, 'size':'l'})}
                <div style={{height: 10}}/>
                {this.render_authmint_transactions()}
            </div>
        )
    }


    render_submit_proposal_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var object = transaction_item.proposal_item

        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_proposal_item(object)
        var proposal_config = object['data'][1];
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 20}}/>

                <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                    <div style={{'padding': '0px 0px 0px 5px'}}>
                        {this.render_detail_item('1', item['tags'])}
                        <div style={{height: 10}}/>
                        <div style={{'padding': '0px 0px 0px 0px'}}>
                            {this.render_detail_item('3', item['id'])}
                        </div>
                        <div style={{'padding': '20px 0px 0px 0px'}}>
                            {this.render_detail_item('2', item['age'])}
                        </div>
                    </div>         
                </div>

                {this.render_detail_item('0')}
                {this.render_detail_item('3', item['vote_wait'])}

                <div style={{height:10}}/>
                {this.render_detail_item('3', item['vote_yes'])}

                <div style={{height:10}}/>
                {this.render_detail_item('3', item['vote_no'])}

                <div style={{ height: 10 }} />
                {this.render_detail_item('3', item['consensus_majority_target_proportion'])}

                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['790']/* 'Proposal Expiry time' */, 'details':''+(new Date(proposal_config[1]*1000)), 'size':'l'})}
                    
                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.get_time_from_now(proposal_config[1]), 'details':this.props.app_state.loc['791']/* 'Proposal expiry time from now' */, 'size':'l'})}

                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['792']/* 'Proposal Submit Expiry time' */, 'details':''+(new Date(proposal_config[3]*1000)), 'size':'l'})}

                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.get_time_from_now(proposal_config[3]), 'details':this.props.app_state.loc['793']/* 'Proposal submit expiry time from now' */, 'size':'l'})}

                {this.render_detail_item('0')}
            </div>
        )
    }


    format_proposal_item(object){
        var tags = object['ipfs'] == null ? ['Proposal'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Proposal ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p6
        var time = object['event'] == null ? 0 : object['event'].returnValues.p5
        var proposal_config = object['data'][1]
        var consensus_majority = proposal_config[6] == 0 ? bigInt('1e18') : proposal_config[6]
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':object['e5']+' • '+object['id'], 'details':title, 'size':'l'},
            'age':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },

            'vote_wait':{'title':''+this.format_account_balance_figure(object['consensus_data'][0])+this.props.app_state.loc['787']/* ' WAIT votes' */, 'details':this.get_proportion_of_total(object, object['consensus_data'][0])+'%', 'size':'l'},

            'vote_yes':{'title':''+this.format_account_balance_figure(object['consensus_data'][1])+this.props.app_state.loc['788']/* ' YES votes' */, 'details':this.get_proportion_of_total(object, object['consensus_data'][1])+'%', 'size':'l'},

            'vote_no':{'title':''+this.format_account_balance_figure(object['consensus_data'][2])+this.props.app_state.loc['789']/* ' NO votes' */, 'details':this.get_proportion_of_total(object, object['consensus_data'][2])+'%', 'size':'l'},

            'consensus_majority_target_proportion': { 'title': this.format_proportion(consensus_majority), 'details': this.props.app_state.loc['2550']/* 'Consensus Majority Target Proportion' */, 'size': 'l' },
        }
    }


    get_proportion_of_total(object, vote_count){
        var sum = bigInt(object['consensus_data'][0]) + bigInt(object['consensus_data'][1]) + bigInt(object['consensus_data'][2]);

        if(sum == bigInt(0)){
            return 0
        }

        var prop = (bigInt(vote_count).divide(sum)).multiply(100)

        if(isNaN(prop)){
            return 0
        }
        return prop
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
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data}  theme={this.props.theme} width={width} show_images={this.props.show_images.bind(this)}/>
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

        var diff = now > number_date ? now - number_date : number_date - now
        return this.get_time_diff(diff)
    }

    get_time_from_now(time){
        var number_date = Math.round(parseInt(time));
        var now = Math.round(new Date().getTime()/1000);

        var diff = number_date - now;
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




export default ViewTransactionPage;