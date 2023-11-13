import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import Letter from './../assets/letter.png'; 
import Dialog from "@mui/material/Dialog";

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

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
                ['xor','',0], ['e','view-transaction'], [1]
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
                    {this.render_detail_item('3',{'title':'Stack ID: ', 'details':item.id,'size':'l'})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3',{'title':'Type:', 'details':''+item.type,'size':'l'})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3',{'title':'Estimated Gas: ', 'details':number_with_commas(this.get_estimated_gas(item))+' - '+number_with_commas(Math.floor(this.get_estimated_gas(item)*1.6)),'size':'l'})}
                    
                    {this.render_detail_item('0')}
                    {this.render_edit_button()}

                    <div style={{height:20}}/>
                    {this.render_detail_item('3', {'size':'l', 'details':'Delete the transaction completely', 'title':'Delete'})}
                    <div style={{height:20}}/>

                    <div onClick={()=> this.open_dialog_ui()}>
                        {this.render_detail_item('5', {'text':'Delete', 'action':''},)}
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
            <Dialog onClose = {() => this.cancel_dialog_box()} open = {this.state.confirm_delete_dialog_box}>
                <div style={{'padding': '10px', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                    
                    <h5 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>Confirm Delete Action</h5>

                    {this.render_detail_item('3', {'title':'Are you sure?', 'details':'You cannot undo this action', 'size':'s'})}
                    <div style={{height:20}}/>

                    <div onClick={()=> this.open_delete_action()}>
                        {this.render_detail_item('5', {'text':'Delete', 'action':''},)}
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
        if(item != null && item.type != 'mail-messages' && item.type != 'channel-messages' && item.type != 'post-messages' && item.type != 'job-messages' && item.type != 'proposal-messages' && item.type != 'exit-contract' && item.type != 'submit' && item.type != 'collect-subscription' && item.type != 'accept-job-application' && item.type != 'storefront-bag' && item.type != 'bag-response' && item.type != 'accept-bag-application' && item.type != 'clear-purchase' && item.type != 'job-request-messages' && item.type != 'alias' && item.type != 'unalias' && item.type != 're-alias'){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':'Make some changes to the transaction', 'title':'Edit'})}
                    <div style={{height:10}}/>

                    <div onClick={()=> this.open_edit_object_uis()}>
                        {this.render_detail_item('5', {'text':'Edit', 'action':''},)}
                    </div>
                </div>
            )
        }
    }

    render_hide_transaction_button(){
        var item = this.props.app_state.stack_items[this.state.transaction_index]

        var op = this.props.app_state.hidden.includes(item) ? 'If set to shown, the transaction will be included during a run' : 'If set to hidden, the transaction will be ignored when running your transactions'
        var txt = this.props.app_state.hidden.includes(item) ? 'Show Transaction' : 'Hide Transaction'
        var status = this.props.app_state.hidden.includes(item) ? 'The transaction is Hidden' : 'The transaction is Shown'
        return(
                <div style={{}}>
                    {this.render_detail_item('3', {'size':'l', 'details':op, 'title':txt})}
                    <div style={{height:10}}/>

                    
                    {this.render_detail_item('3', {'size':'s', 'details':'status', 'title':status})}

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
        this.props.notify('item deleted from stack',600)
    }

    hide_transaction(){
        var item = this.props.app_state.stack_items[this.state.transaction_index]

        var message = this.props.app_state.hidden.includes(item) ? 'transaction shown' : 'transaction hidden'
        this.props.show_hide_stack_item(item)
        this.props.notify(message,600)
    }

    get_estimated_gas(t){
        if(t.type == 'channel' || t.type == 'job' || t.type == 'post' || t.type == 'contractor'){
            return 344622
        }
        else if(t.type == 'mail'){
            return 279695
        }
        else if(t.type == 'contract'){
            return 964043 + (60_000 * t.price_data.length)
        }
        else if(t.type == 'storefront-item'){
            return 261200 
        }
        else if(t.type == 'subscription'){
            return 630605 + (60_000 * t.price_data.length)
        }
        else if(t.type == 'token'){
            return 976263 + (50_000 * t.price_data.length)
        }
        else if(t.type == 'buy-sell'){
            return 793469
        }
        else if(t.type == 'transfer'){
            return 100_132 +(32_000 * t.stack_items.length)
        }
        else if(t.type == 'enter-contract'){
            return 563061
        }
        else if(t.type == 'extend-contract'){
            return 426227
        }
        else if(t.type == 'exit-contract'){
            return 481612
        }
        else if(t.type == 'proposal'){
            return 809949 + (98_818 * t.bounty_values.length)
        }
        else if(t.type == 'vote'){
            return 485179
        }
        else if(t.type == 'submit'){
            return 562392
        }
        else if(t.type == 'pay-subscription'){
            return 351891
        }
        else if(t.type == 'cancel-subscription'){
            return 276496
        }
        else if(t.type == 'collect-subscription'){
            return 273441
        }
        else if(t.type == 'modify-subscription'){
            return 234392
        }
        else if(t.type == 'modify-contract'){
            return 630599
        }
        else if(t.type == 'modify-token'){
            return 376037
        }
        else if(t.type == 'exchange-transfer'){
            return 240068
        }
        else if(t.type == 'force-exit'){
            return 438394
        }
        else if(t.type == 'archive'){
            return 1037673
        }
        else if(t.type == 'freeze/unfreeze'){
            return 405717
        }
        else if(t.type == 'authmint'){
            return 493989
        }
        else if(t.type == 'access-rights-settings'){
            return 170897
        }
        else if(t.type == 'mail-messages' || t.type == 'channel-messages' || t.type == 'post-messages' || t.type == 'job-messages' || t.type == 'proposal-messages' || t.type == 'bag-messages' || t.type == 'storefront-messages' || t.type == 'job-request-messages'){
            return 279695 +(18000 * t.messages_to_deliver.length)
        }
        else if(t.type == 'job-response'){
            return 279695
        }
        else if(t.type == 'accept-job-application'){
            return 279695
        }
        else if(t.type == 'storefront-bag'){
            return 300622
        }
        else if(t.type == 'bag-response'){
            return 279695
        }
        else if(t.type == 'accept-bag-application'){
            return 279695
        }
        else if(t.type == 'direct-purchase'){
            return 279695
        }
        else if(t.type == 'clear-purchase'){
            return 279695
        }
        else if(t.type == 'job-request'){
            return 279695
        }
        else if(t.type == 'accept-job-request'){
            return 279695
        }
        else if(t.type == 'alias' || t.type == 'unalias' || t.type == 're-alias'){
            return 279695
        }
        else if(t.type == 'edit-channel' || t.type == 'edit-contractor' || t.type == 'edit-job' || t.type == 'edit-post' || t.type == 'edit-storefront' || t.type == 'edit-token'){
            return 276073
        }
        else if(t.type == 'depthmint'){
            return 623115
        }

    }









    render_everything(){
        var tx = this.props.app_state.stack_items[this.state.transaction_index]
        if(tx != null){
            if(tx.type == 'contract'){
                return(
                    <div>
                        {this.render_contract_data()}
                    </div>
                )  
            }
            else if(tx.type == 'token'){
                return(
                    <div>
                        {this.render_token_data()}
                    </div>
                )
            }
            else if(tx.type == 'subscription'){
                return(
                    <div>
                        {this.render_subscription_data()}
                    </div>
                )
            }
            else if(tx.type == 'post'){
                return(
                    <div>
                        {this.render_post_data()}
                    </div>
                )
            }
            else if(tx.type == 'job'){
                return(
                    <div>
                        {this.render_job_post_data()}
                    </div>
                )
            }
            else if(tx.type == 'channel'){
                return(
                    <div>
                        {this.render_channel_post_data()}
                    </div>
                )
            }
            else if(tx.type == 'storefront-item'){
                return(
                    <div>
                        {this.render_storefront_post_data()}
                    </div>
                )
            }
            else if(tx.type == 'buy-sell'){
                return(
                    <div>
                        {this.render_buy_sell_data()}
                    </div>
                )
            }
            else if(tx.type == 'transfer'){
                return(
                    <div>
                        {this.render_transfer_token_data()}
                    </div>
                )
            }
            else if(tx.type == 'enter-contract'){
                return(
                    <div>
                        {this.render_enter_contract_data()}
                    </div>
                )
            }
            else if(tx.type == 'extend-contract'){
                return(
                    <div>
                        {this.render_extend_contract_data()}
                    </div>
                )
            }
            else if(tx.type == 'exit-contract'){
                return(
                    <div>
                        {this.render_exit_contract_data()}
                    </div>
                )
            }
            else if(tx.type == 'proposal'){
                return(
                    <div>
                        {this.render_proposal_data()}                        
                        {this.render_proposal_actions()}
                    </div>
                )
            }
            else if(tx.type == 'vote'){
                return(
                    <div>
                        {this.render_vote_object_data()}
                    </div>
                )
            }
            else if(tx.type == 'pay-subscription'){
                return(
                    <div>
                        {this.render_pay_subscription_data()}
                    </div>
                )
            }
            else if(tx.type == 'cancel-subscription'){
                return(
                    <div>
                        {this.render_cancel_subscription_data()}
                    </div>
                )
            } 
            else if(tx.type == 'collect-subscription'){
                return(
                    <div>
                        {this.render_collect_subscription_data()}
                    </div>
                )
            }
            else if(tx.type == 'modify-subscription'){
                return(
                    <div>
                        {this.render_modify_subscription_data()}
                    </div>
                )
            }   
            else if(tx.type == 'modify-contract'){
                return(
                    <div>
                        {this.render_modify_contract_data()}
                    </div>
                )
            }
            else if(tx.type == 'modify-token'){
                return(
                    <div>
                        {this.render_modify_token_data()}
                    </div>
                )
            }
            else if(tx.type == 'exchange-transfer'){
                return(
                    <div>
                        {this.render_exchange_transfer_data()}
                    </div>
                )
            }
            else if(tx.type == 'force-exit'){
                return(
                    <div>
                        {this.render_force_exit_data()}
                    </div>
                )
            }
            else if(tx.type == 'archive'){
                return(
                    <div>
                        {this.render_archive_data()}
                    </div>
                )
            }
            else if(tx.type == 'freeze/unfreeze'){
                return(
                    <div>
                        {this.render_freeze_unfreeze_data()}
                    </div>
                )
            }
            else if(tx.type == 'authmint'){
                return(
                    <div>
                        {this.render_authmint_data()}
                    </div>
                )
            }
            else if(tx.type == 'access-rights-settings'){
                return(
                    <div>
                        {this.render_access_right_setting_data()}
                    </div>
                )   
            }
            else if(tx.type == 'mail'){
                return(
                    <div>
                        {this.render_mail_data()}
                    </div>
                )    
            }
            else if(tx.type == 'mail-messages'){
                return(
                    <div>
                        {this.render_mail_message_data('Mail Messages')}
                    </div>
                ) 
            }
            else if(tx.type == 'channel-messages'){
                return(
                    <div>
                        {this.render_mail_message_data('Channel Messages')}
                    </div>
                )   
            }
            else if(tx.type == 'post-messages'){
                return(
                    <div>
                        {this.render_mail_message_data('Post Messages')}
                    </div>
                )   
            }  
            else if(tx.type == 'job-response'){
                return(
                    <div>
                        {this.render_job_response_data()}
                    </div>
                )   
            }
            else if(tx.type == 'accept-job-application'){
                return(
                    <div>
                        {this.render_accept_job_application_data()}
                    </div>
                )
            }
            else if(tx.type == 'job-messages'){
                return(
                    <div>
                        {this.render_mail_message_data('Job Messages')}
                    </div>
                )    
            }
            else if(tx.type == 'proposal-messages'){
                return(
                    <div>
                        {this.render_mail_message_data('Proposal Messages')}
                    </div>
                )    
            }
            else if(tx.type == 'storefront-bag'){
                return(
                    <div>
                        {this.render_storefront_bag_data()}
                    </div>
                )    
            }
            else if(tx.type == 'bag-response'){
                return(
                    <div>
                        {this.render_bag_response_data()}
                    </div>
                )
            }
            else if(tx.type == 'accept-bag-application'){
                return(
                    <div>
                        {this.render_accept_bag_application_data()}
                    </div>
                )
            }
            else if(tx.type == 'direct-purchase'){
                return(
                    <div>
                        {this.render_direct_purchase_data()}
                    </div>
                )
            }
            else if(tx.type == 'clear-purchase'){
                return(
                    <div>
                        {this.render_clear_purchase_data()}
                    </div>
                )
            }
            else if(tx.type == 'bag-messages'){
                return(
                    <div>
                        {this.render_mail_message_data('Bag Messages')}
                    </div>
                )
            }
            else if(tx.type == 'storefront-messages'){
                return(
                    <div>
                        {this.render_mail_message_data('Storefront Messages')}
                    </div>
                )
            }
            else if(tx.type == 'contractor'){
                return(
                    <div>
                        {this.render_contractor_post_data()}
                    </div>
                )
            }
            else if(tx.type == 'job-request'){
                return(
                    <div>
                        {this.render_job_request_data()}
                    </div>
                )
            }
            else if(tx.type == 'accept-job-request'){
                return(
                    <div>
                        {this.render_accept_job_request_data()}
                    </div>
                )
            }
            else if(tx.type == 'job-request-messages'){
                return(
                    <div>
                        {this.render_mail_message_data('Job Request Messages')}
                    </div>
                )
            }
            else if(tx.type == 'alias'){
                return(
                    <div>
                        {this.render_alias_data()}
                    </div>
                )
            }
            else if(tx.type == 'unalias'){
                return(
                    <div>
                        {this.render_unalias_data()}
                    </div>
                )
            }
            else if(tx.type == 're-alias'){
                return(
                    <div>
                        {this.render_realias_data()}
                    </div>
                )
            }
            else if(tx.type == 'edit-channel'){
                return(
                    <div>
                        {this.render_edit_channel()}
                    </div>
                )
            }
            else if(tx.type == 'edit-contractor'){
                return(
                    <div>
                        {this.render_edit_contractor()}
                    </div>
                )
            }
            else if(tx.type == 'edit-job'){
                return(
                    <div>
                        {this.render_edit_job()}
                    </div>
                )
            }
            else if(tx.type == 'edit-post'){
                return(
                    <div>
                        {this.render_edit_post()}
                    </div>
                )
            }
            else if(tx.type == 'edit-storefront'){
                return(
                    <div>
                        {this.render_edit_storefront()}
                    </div>
                )
            }
            else if(tx.type == 'edit-token'){
                return(
                    <div>
                        {this.render_edit_token()}
                    </div>
                )
            }
            else if(tx.type == 'award'){
                return(
                    <div>
                        {this.render_award_data()}
                    </div>
                )
            }
            else if(tx.type == 'depthmint'){
                return(
                    <div>
                        {this.render_depthmint_data()}
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
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'details':'The set access rights setting for your new contract', 'title':this.get_selected_item(this.props.app_state.stack_items[this.state.transaction_index].new_contract_type_tags_object, 'e')})}
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
                            {this.render_detail_item('2', {'style':'l','title':'Token ID: '+item, 'subtitle':'depth:'+buy_depths[index], 'barwidth':this.calculate_bar_width(buy_amounts[index]), 'number':this.format_account_balance_figure(buy_amounts[index]), 'relativepower':'tokens'})}
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
        var auto_wait = contract_config[8] == 0 ? 'false' : 'true'
        var can_modify_contract_as_moderator = contract_config[28] == 0 ? 'false' : 'true'
        var can_extend_enter_contract_at_any_time = contract_config[29] == 0 ? 'false' : 'true'
        var bounty_limit_type = contract_config[37] == 0 ? 'relative' : 'absolute'
        var contract_force_exit_enabled = contract_config[38] == 0 ? 'disabled': 'enabled'
        return{
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},

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

    format_contract_object(t){
        var default_vote_bounty_split_proportion = t.default_vote_bounty_split_proportion == 0 ? bgN(1,16) : t.default_vote_bounty_split_proportion.toString().toLocaleString('fullwide', {useGrouping:false})
        var max_extend_enter_contract_limit = t.max_extend_enter_contract_limit == 0 ? 36_000_000 : t.max_extend_enter_contract_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        var default_minimum_end_vote_bounty_amount = t.default_minimum_end_vote_bounty_amount == 0 ? 0 : t.default_minimum_end_vote_bounty_amount.toString().toLocaleString('fullwide', {useGrouping:false})
        var default_proposal_expiry_duration_limit = t.default_proposal_expiry_duration_limit == 0 ? 30_000 : t.default_proposal_expiry_duration_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        var max_enter_contract_duration = t.max_enter_contract_duration == 0 ? bgN(1, 16) : t.max_enter_contract_duration.toString().toLocaleString('fullwide', {useGrouping:false})
        var auto_wait_for_all_proposals_for_all_voters = this.get_selected_item(t.auto_wait_tags_object, t.auto_wait_tags_object['i'].active) == 'no' ? 0 : 1
        var default_minimum_spend_vote_bounty_amount = t.default_minimum_spend_vote_bounty_amount == 0 ? 0 : t.default_minimum_spend_vote_bounty_amount.toString().toLocaleString('fullwide', {useGrouping:false})
        var proposal_modify_expiry_duration_limit = t.proposal_modify_expiry_duration_limit == 0 ? 3600 : t.proposal_modify_expiry_duration_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        var can_modify_contract_as_moderator = this.get_selected_item(t.can_modify_contract_as_moderator, t.can_modify_contract_as_moderator['i'].active) == 'modifiable' ? 1 : 0
        var can_extend_enter_contract_at_any_time = this.get_selected_item(t.can_extend_enter_contract_at_any_time, t.can_extend_enter_contract_at_any_time['i'].active) == 'enabled' ? 1 : 0
        var maximum_proposal_expiry_submit_expiry_time_difference = t.maximum_proposal_expiry_submit_expiry_time_difference == 0 ? bgN(1,16).toString().toLocaleString('fullwide', {useGrouping:false}) : t.maximum_proposal_expiry_submit_expiry_time_difference.toString().toLocaleString('fullwide', {useGrouping:false})
        var bounty_limit_type = this.get_selected_item(t.bounty_limit_type, t.bounty_limit_type['i'].active) == 'relative' ? 0 : 1
        var contract_force_exit_enabled = this.get_selected_item(t.contract_force_exit_enabled, t.contract_force_exit_enabled['i'].active) == 'enabled' ? 1 : 0

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
                    {this.render_detail_item('3', {'title':'Moderator Accounts', 'details':'Youve set '+items.length+' moderator(s)', 'size':'l'})}
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
            obj.push({'id':mods[i], 'label':{'title':mods[i], 'details':'Account', 'size':'s'}})
        }
        return obj
    }

    load_interactable_accounts(){
        var items = this.get_interactables_accounts()

        if(items.length != 0){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Interactable Accounts', 'details':'Youve set '+items.length+' accounts(s)', 'size':'l'})}
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
            obj.push({'id':interactibles[i], 'label':{'title':interactibles[i]['id'], 'details':'For '+this.get_time_difference(interactibles[i]['timestamp']), 'size':'s'}})
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
                    {this.render_detail_item('3', {'size':'l', 'details':'The set access rights setting for your new token', 'title':this.get_selected_item(this.props.app_state.stack_items[this.state.transaction_index].new_token_access_rights_tags_object, 'e')})}
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

        var type = selected_obj_root_config[3] == 3 ? 'Capped' : 'Uncapped'
        var is_auth_main_contract = selected_obj_config[9] == 2 ? '2 (Main Contract)': selected_obj_config[9]
        var is_trust_fee_target_main_contract = selected_obj_config[10] == 2 ? '2 (Main Contract)': (selected_obj_config[10] == 0 ? '0 (Burn Account)': selected_obj_config[10])
        var halfing_type = selected_obj_config[15] == 0 ? 'Fixed' : 'Spread'

        if(title == 5){
            title = 'SPEND'
        }

        var item = selected_object;
        var active_tags = item['ipfs'] == null ? [''+title, ''+type, 'token'] : item['ipfs'].entered_indexing_tags
        var name = item['ipfs'] == null ? ''+title : item['ipfs'].entered_title_text
        var symbol = item['ipfs'] == null ? ''+type : item['ipfs'].entered_symbol_text
        var image = item['ipfs'] == null ? img : item['ipfs'].token_image
        
        return{
            'tags':{'active_tags':active_tags, 'index_option':'indexed', 'when_tapped':''},
            'banner-icon':{'header':name, 'subtitle':symbol, 'image':image},
            'token_id': {'title':'ID: '+selected_object['id'], 'details':'Token Identifier', 'size':'l'},
            'token_type': {'title':'Token Type', 'details':type, 'size':'l'},

            'unlocked_supply': {'title':'Unlocked Supply', 'details':this.enabled_disabled(selected_obj_root_config[0]), 'size':'l'},
            'unlocked_liquidity': {'title':'Unlocked Liquidity', 'details':this.enabled_disabled(selected_obj_root_config[1]), 'size':'l'},
            'fully_custom': {'title':'Fully Custom', 'details':this.enabled_disabled(selected_obj_root_config[2]), 'size':'l'},

            'buy_limit':{'style':'l','title':'Mint Limit', 'subtitle':this.format_power_figure(selected_obj_config[0]), 'barwidth':this.calculate_bar_width(selected_obj_config[0]), 'number':this.format_account_balance_figure(selected_obj_config[0]), 'relativepower':symbol},
            
            'minimum_transactions_between_swap': {'title':selected_obj_config[2], 'details':'Minimum Transactions Between Swap', 'size':'l'},
            'minimum_blocks_between_swap': {'title':selected_obj_config[3], 'details':'Minimum Blocks Between Swap', 'size':'l'},
            'minimum_time_between_swap': {'title':this.get_time_diff(selected_obj_config[4]), 'details':'Minimum Time Between Swap', 'size':'l'},
            
            'trust_fee_proportion': {'title':this.format_proportion(selected_obj_config[7]), 'details':'Trust Fee', 'size':'l'},
            'exchange_authority': {'title':'Authority: '+is_auth_main_contract, 'details':'Exchange Authority Identifier', 'size':'l'},
            'trust_fee_target': {'title':'Target: '+is_trust_fee_target_main_contract, 'details':'Trust Fee Target Identifier', 'size':'l'},

            'sell_limit':{'style':'l','title':'Sell Limit', 'subtitle':this.format_power_figure(selected_obj_config[11]), 'barwidth':this.calculate_bar_width(selected_obj_config[11]), 'number':this.format_account_balance_figure(selected_obj_config[11]), 'relativepower':symbol},

            'minimum_entered_contracts_between_swap': {'title':selected_obj_config[13], 'details':'Minimum Entered Contracts Between Swap', 'size':'l'},
            'minimum_transactions_for_first_buy': {'title':selected_obj_config[17], 'details':'Minimum Transactions For First Buy', 'size':'l'},
            'minimum_entered_contracts_for_first_buy': {'title':selected_obj_config[18], 'details':'Minimum Entered Contracts For First Buy', 'size':'l'},

            'ratio_x':{'style':'l','title':'Exchange Ratio X', 'subtitle':this.format_power_figure(selected_obj_ratio_config[0]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[0]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[0]), 'relativepower':''},
            'ratio_y':{'style':'l','title':'Exchange Ratio Y', 'subtitle':this.format_power_figure(selected_obj_ratio_config[1]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[1]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[1]), 'relativepower':''},
            'combined_exchange_ratio': {'title':this.format_exchange_ratio(selected_obj_ratio_config[0], selected_obj_ratio_config[1]), 'details':'Exchange Ratio X:Y', 'size':'l'},

            'exchanges_liquidity':{'style':'l','title':'Circulating Supply', 'subtitle':this.format_power_figure(selected_obj_ratio_config[2]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[2]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[2]), 'relativepower':symbol},
            'mint_burn_button':{'text':'Mint/Burn Token', 'action':''},

            'block_limit':{'style':'l','title':'Block Limit', 'subtitle':this.format_power_figure(selected_obj_config[1]), 'barwidth':this.calculate_bar_width(selected_obj_config[1]), 'number':this.format_account_balance_figure(selected_obj_config[1]), 'relativepower':symbol},
            'internal_block_halfing_proportion': {'title':this.format_proportion(selected_obj_config[5]), 'details':'Internal Block Halving Proportion', 'size':'l'},
            'block_limit_reduction_proportion': {'title':this.format_proportion(selected_obj_config[6]), 'details':'Block Limit Reduction Proportion', 'size':'l'},
            
            'block_reset_limit': {'title':selected_obj_config[8], 'details':'Block Reset Limit', 'size':'l'},
            'block_limit_sensitivity': {'title':selected_obj_config[12], 'details':'Block Limit Sensitivity', 'size':'l'},
            'default_authority_mint_limit': {'title':this.format_proportion(selected_obj_config[14]), 'details':'Authority Mint Limit (percentage of supply)', 'size':'l'},
            'block_halfing_type': {'title':halfing_type, 'details':'Halving Type', 'size':'l'},
            'maturity_limit':{'style':'l','title':'Maturity Limit', 'subtitle':this.format_power_figure(selected_obj_config[16]), 'barwidth':this.calculate_bar_width(selected_obj_config[16]), 'number':this.format_account_balance_figure(selected_obj_config[16]), 'relativepower':symbol},

            'current_block_mint_total':{'style':'l','title':'Current Block Mint Total', 'subtitle':this.format_power_figure(selected_obj_ratio_config[4]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[4]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[4]), 'relativepower':symbol},
            'active_block_limit_reduction_proportion': {'title':this.format_proportion(selected_obj_ratio_config[6]), 'details':'Active Block Limit Reduction Proportion', 'size':'l'},
            'buy_amounts':{'title':'Entry Fees', 'details':selected_object['data'][3].length+' tokens used', 'size':'l'},
            '':{},
            '':{},
            '':{},
            '':{},
            '':{},
        }
    }

    enabled_disabled(value){
        if(value == 1){
            return 'enabled'
        }
        return 'disabled'
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
        //.toString().toLocaleString('fullwide', {useGrouping:false})
        var type = this.get_selected_item(t.new_token_type_tags_object, t.new_token_type_tags_object['i'].active);
        var new_token_type_tags_object = type == 'capped' ? 3 : 5
        var token_exchange_liquidity_total_supply = t.token_exchange_liquidity_total_supply <= 100_000 ? 1_000_000_000 : t.token_exchange_liquidity_total_supply.toString().toLocaleString('fullwide', {useGrouping:false})
        if(type == 'uncapped'){
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
        
        var new_token_unlocked_liquidity_tags_object = this.get_selected_item(t.new_token_unlocked_liquidity_tags_object, t.new_token_unlocked_liquidity_tags_object['i'].active) == 'unlocked' ? 1 : 0
        var new_token_unlocked_supply_tags_object = this.get_selected_item(t.new_token_unlocked_supply_tags_object, t.new_token_unlocked_supply_tags_object['i'].active) == 'unlocked' ? 1 : 0
        var new_token_fully_custom_tags_object = this.get_selected_item(t.new_token_fully_custom_tags_object, t.new_token_fully_custom_tags_object['i'].active) == 'fully-custom' ? 1 : 0
        var internal_block_halfing_proportion = t.internal_block_halfing_proportion.toString().toLocaleString('fullwide', {useGrouping:false})
        var block_limit_reduction_proportion = t.block_limit_reduction_proportion.toString().toLocaleString('fullwide', {useGrouping:false})
        var block_reset_limit = t.block_reset_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        
        var new_token_block_limit_sensitivity_tags_object = parseInt(this.get_selected_item(t.new_token_block_limit_sensitivity_tags_object, t.new_token_block_limit_sensitivity_tags_object['i'].active)).toString().toLocaleString('fullwide', {useGrouping:false})
        var default_authority_mint_limit = t.default_authority_mint_limit == 0 ? bgN(1,16).toString().toLocaleString('fullwide', {useGrouping:false}) : t.default_authority_mint_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        
        var new_token_halving_type_tags_object = (this.get_selected_item(t.new_token_halving_type_tags_object, t.new_token_halving_type_tags_object['i'].active) == 'spread' ? 1 : 0).toString().toLocaleString('fullwide', {useGrouping:false})
        var maturity_limit = t.maturity_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        
        var minimum_entered_contracts_for_first_buy = t.minimum_entered_contracts_for_first_buy.toString().toLocaleString('fullwide', {useGrouping:false})

        var default_exchange_ratio_value = '1000';
        if(type == 'capped'){
            default_exchange_ratio_value = token_exchange_liquidity_total_supply;
        }

        var active_block_limit_reduction_proportion = type == 'capped' ? 0 : bgN(100,16)
        var token_exchange_ratio_x = t.token_exchange_ratio_x == 0 ? default_exchange_ratio_value: t.token_exchange_ratio_x.toString().toLocaleString('fullwide', {useGrouping:false})

        var token_exchange_ratio_y = t.token_exchange_ratio_y == 0 ? default_exchange_ratio_value : t.token_exchange_ratio_y.toString().toLocaleString('fullwide', {useGrouping:false})

        if(type == 'capped' && token_exchange_ratio_x != token_exchange_liquidity_total_supply){
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
                    {this.render_detail_item('3', {'size':'l', 'details':'The set access rights setting for your new contract', 'title':this.get_selected_item(this.props.app_state.stack_items[this.state.transaction_index].new_token_access_rights_tags_object, 'e')})}

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

            'minimum_cancellable_balance_amount':{ 'style':'l', 'title':'Minimum Cancellable Amount', 'subtitle':'??', 'barwidth':this.get_number_width(subscription_config[4]), 'number':`${number_with_commas(subscription_config[4])}`, 'barcolor':'', 'relativepower':'time-units', },

            'time_unit': {'title':this.get_time_diff(time_unit), 'details':'Time Unit', 'size':'l'},

            'payment_amount': {'title':this.get_time_diff(object['payment']), 'details':'Remaining Subscription Time', 'size':'l'},

            'subscription_beneficiary': {'title':subscription_beneficiary, 'details':'Subscription Beneficiary', 'size':'l'},

            'entry_fees': {'title':'Entry Fees', 'details':object['data'][2].length+' tokens used', 'size':'l'},
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
        var cancellable_tags_object = this.get_selected_item(t.cancellable_tags_object, t.cancellable_tags_object['i'].active) == 'true' ? 1 : 0
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

                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':'Price Amounts', 'details':'The amounts you are offering for the job.', 'size':'l'})}
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
                                {this.render_detail_item('2', { 'style':'l', 'title':'Exchange ID: '+item['id'], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
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
                    {this.render_detail_item('3', {'size':'l', 'details':'The set access rights setting for your new channel', 'title':this.get_selected_item(this.props.app_state.stack_items[this.state.transaction_index].new_token_access_rights_tags_object, 'e')})}

                    {this.render_detail_item('0')}
                    {this.render_item_data(items)}

                    {this.render_item_images()}

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

                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                </div>

                {this.render_detail_item('3', {'title':'Item Variants', 'details':'The items variant details are shown below', 'size':'l'})}
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
                                    {this.render_detail_item('4', {'text':item['variant_description'], 'textsize':'13px', 'font':'Sans-serif'})}
                                    <div style={{height:3}}/>
                                    <div style={{padding:'0px 0px 0px 10px'}}>
                                        {this.render_detail_item('9', item['image_data']['data'])}
                                    </div>
                                    <div style={{height:5}}/>
                                    {this.render_detail_item('3', {'title':this.format_account_balance_figure(item['available_unit_count']), 'details':'Number of Units', 'size':'l'})}
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
                        {this.render_detail_item('2', { 'style':'s', 'title':'Exchange ID: '+item['id'], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                    </li>
                ))}
            </div>
        )
    }








    render_buy_sell_data(){
        var item = this.props.app_state.stack_items[this.state.transaction_index];
        var action = this.get_selected_item(item.new_mint_dump_action_page_tags_object, 'e')
        var recipient = item.recipient_id == '53' ? 'Your account ID: '+this.props.app_state.user_account_id[this.props.app_state.selected_e5] : item.recipient_id
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Amount', 'subtitle':this.format_power_figure(item.amount), 'barwidth':this.calculate_bar_width(item.amount), 'number':this.format_account_balance_figure(item.amount), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.token_item['id']], })}
                </div>
                <div style={{height: 10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Your Balance', 'subtitle':this.format_power_figure(item.token_item['balance']), 'barwidth':this.calculate_bar_width(item.token_item['balance']), 'number':this.format_account_balance_figure(item.token_item['balance']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.token_item['id']], })}
                </div>
                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'size':'l', 'details':'Selected Action', 'title':action})}
                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'size':'l', 'details':'Target Recipient Account', 'title':''+recipient})}
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

                {this.render_detail_item('3', {'size':'l', 'details':'Enter Contract Until: '+(new Date(expiry_time_in_seconds*1000)), 'title':'Entry Exipry Time'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'size':'l', 'details':''+(this.get_time_diff(time_to_expiry)), 'title':'Time remaining'})}

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
                    {this.render_detail_item('2', { 'style':'l', 'title':'Your Balance', 'subtitle':this.format_power_figure(item.token_item['balance']), 'barwidth':this.calculate_bar_width(item.token_item['balance']), 'number':this.format_account_balance_figure(item.token_item['balance']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.token_item['id']], })}

                    {this.render_detail_item('2', { 'style':'l', 'title':'Your Balance after Set Transfers', 'subtitle':this.format_power_figure(item.token_item['balance'] - item.debit_balance), 'barwidth':this.calculate_bar_width(item.token_item['balance'] - item.debit_balance), 'number':this.format_account_balance_figure(item.token_item['balance'] - item.debit_balance), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.token_item['id']], })}
                </div>

                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'details':'Below are the individual transfer actions.', 'title':'Transfer actions'})}
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
                                {this.render_detail_item('3', {'title':''+this.format_account_balance_figure(item['amount'])+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[state_item.token_item['id']], 'details':'recipient account: '+item['recipient'], 'size':'s'})}
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

                {this.render_detail_item('3', {'size':'l', 'details':'Extend Stay In Contract Until: '+(new Date(expiry_time_in_seconds*1000)), 'title':'New Exipry Time'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'size':'l', 'title':''+(this.get_time_diff(time_to_expiry)), 'details':'Time remaining'})}

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

                    {this.render_detail_item('3', {'size':'l', 'details':''+(this.get_time_diff(time_to_expiry)), 'title':'Time remaining'})}
                </div>
            )
        }
    }







    render_proposal_data(){
        var background_color = this.props.theme['card_background_color']
        var item = this.get_proposal_details_data()
        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', padding:'0px 0px 0px 0px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_detail_item('3', item['id'])}
                    </div>

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
        var consensus_obj = {0:'spend',1:'reconfig', 6:'exchange-transfer'}
        var proposal_config = object['data'][1]
        var consensus_type = consensus_obj[proposal_config[0]]

        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},

            'consensus_type':{'title':consensus_type, 'details':'Consensus Type', 'size':'l'},
            'proposal_expiry_time':{'title':'Proposal Expiry time', 'details':''+(new Date(proposal_config[1]*1000)), 'size':'l'},
            'proposal_expiry_time_from_now':{'title':this.get_time_from_now(proposal_config[1]), 'details':'Proposal expiry time from now', 'size':'l'},

            'consensus_submit_expiry_time':{'title':'Proposal Submit Expiry time', 'details':''+(new Date(proposal_config[3]*1000)), 'size':'l'},
            'proposal_submit_expiry_time_from_now':{'title':this.get_time_from_now(proposal_config[3]), 'details':'Proposal submit expiry time from now', 'size':'l'},

            'target_contract_authority':{'title':proposal_config[5], 'details':'Contract Authority ID', 'size':'l'},
            'modify_target':{'title':proposal_config[9], 'details':'Modify Target', 'size':'l'},
        }
    }

    format_proposal(t){
        var consensus_obj = {'spend':0,'reconfig':1, 'exchange-transfer':6}
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

        if(consensus_type_tag == 'spend'){
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
        else if(consensus_type_tag == 'reconfig'){
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
        else if(consensus_type_tag == 'exchange-transfer'){
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
                                {this.render_detail_item('3', {'title':''+this.format_account_balance_figure(item['amount'])+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['spend_token']], 'details':'target: '+item['spend_target']+', token ID: '+item['spend_token'], 'size':'l'})}
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
                                {this.render_detail_item('3', {'title':''+item['title'], 'details':'Modify Target', 'size':'l'})}
                                <div style={{height:5}}/>
                                {this.render_detail_item('3', {'title':''+item['pos'], 'details':'position', 'size':'l'})}
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
                        {this.render_detail_item('2', { 'style':'l', 'title':title, 'subtitle':this.format_power_figure(number), 'barwidth':this.calculate_bar_width(number), 'number':this.format_account_balance_figure(number), 'barcolor':'', 'relativepower':'units', })}
                    </div>
                </div>
            )
        }
        else if(ui == 'proportion'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.format_proportion(number), 'details':'proportion', 'size':'l'})}
                </div>
            )
        }
        else if(ui == 'time'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.get_time_diff(number), 'details':'duration', 'size':'l'})}

                </div>
            )
        }
        else if(ui == 'tag'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.get_tag_selected_item(title, number), 'details':'value: '+number, 'size':'l'})}
                </div>
            )
        }
        else if(ui == 'id'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':number, 'details':'target ID', 'size':'l'})}
                </div>
            )
        }
    }

    get_tag_selected_item(title, number){
        var obj = {'Auto Wait':{0:'no', 1:'yes'}, 'Moderator Modify Privelage':{1:'modifiable', 0:'non-modifiable'}, 'Unlimited Extend Contract Time':{1:'enabled', 0:'disabled'}, 'Bounty Limit Type':{0:'relative', 1:'absolute'}, 'Force Exit Enabled':{1:'enabled', 0:'disabled'}, 'Halving type':{0:'fixed', 1:'spread'}, 'Block Limit Sensitivity':{1:'1', 2:'2', 3:'3', 4:'4', 5:'5'}}

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
                                    {this.render_detail_item('2', { 'style':'l', 'title':'Token: '+item['token'], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':'tokens', })}
                                </div>
                                <div style={{height:5}}/>
                                {this.render_detail_item('3', {'title':'Receiver ID: '+item['receiver'], 'details':'Exchange ID:'+item['exchange'], 'size':'s'})}
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

                {this.render_detail_item('3', {'size':'l', 'details':'Your set vote for the proposal', 'title':this.get_selected_item(this.props.app_state.stack_items[this.state.transaction_index].new_vote_tags_object, 'e')})}
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
                                {this.render_detail_item('3', {'title':'Bounty Exchange ID: '+item['exchange'], 'details':'Default depth 0', 'size':'s'})}
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
                    {this.render_detail_item('2', { 'style':'l', 'title':'Time Units', 'subtitle':this.format_power_figure(item.time_units), 'barwidth':this.calculate_bar_width(item.time_units), 'number':this.format_account_balance_figure(item.time_units), 'barcolor':'', 'relativepower':this.get_time_units_time(), })}
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
                            {this.render_detail_item('2', {'style':'l','title':'Token ID: '+item, 'subtitle':'depth:'+buy_depths[index], 'barwidth':this.calculate_bar_width(this.calculate_final_amount(buy_amounts[index])), 'number':this.format_account_balance_figure(this.calculate_final_amount(buy_amounts[index])), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
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
                {this.render_detail_item('3', {'title':this.get_time_diff(time_unit), 'details':'Time Unit', 'size':'l'})}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Time Units To Cancel', 'subtitle':this.format_power_figure(item.time_units), 'barwidth':this.calculate_bar_width(item.time_units), 'number':this.format_account_balance_figure(item.time_units), 'barcolor':'', 'relativepower':this.get_time_units_time(), })}
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

                {this.render_detail_item('3', {'title':''+this.get_time_diff(this.get_total_subscription_collectible_time()), 'details':'Total Collectible Time', 'size':'s'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':''+this.get_total_subscription_collectible_timeunits(), 'details':'Total Collectible Time Units', 'size':'s'})}
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
                            {this.render_detail_item('2', {'style':'l','title':'Token ID: '+item, 'subtitle':'depth:'+buy_depths[index], 'barwidth':this.calculate_bar_width(this.calculate_collect_subscription_final_amount(buy_amounts[index])), 'number':this.format_account_balance_figure(this.calculate_collect_subscription_final_amount(buy_amounts[index])), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
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

                {this.render_detail_item('3', {'title':'Modify Subscription Action', 'details':items.length+' action(s) added', 'size':'l'})}
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
                                {this.render_detail_item('3', {'title':''+item['title'], 'details':'Modify Target', 'size':'l'})}
                                <div style={{height:5}}/>
                                {this.render_detail_item('3', {'title':''+item['pos'], 'details':'position', 'size':'l'})}
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
                        {this.render_detail_item('2', { 'style':'l', 'title':title, 'subtitle':this.format_power_figure(number), 'barwidth':this.calculate_bar_width(number), 'number':this.format_account_balance_figure(number), 'barcolor':'', 'relativepower':'units', })}
                    </div>
                </div>
            )
        }
        else if(ui == 'id'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':number, 'details':'target ID', 'size':'l'})}
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

                {this.render_detail_item('3', {'title':'Modify Contract Action', 'details':items.length+' action(s) added', 'size':'l'})}
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
                                {this.render_detail_item('3', {'title':''+item['title'], 'details':'Modify Target', 'size':'l'})}
                                <div style={{height:5}}/>
                                {this.render_detail_item('3', {'title':''+item['pos'], 'details':'position', 'size':'l'})}
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
                        {this.render_detail_item('2', { 'style':'l', 'title':title, 'subtitle':this.format_power_figure(number), 'barwidth':this.calculate_bar_width(number), 'number':this.format_account_balance_figure(number), 'barcolor':'', 'relativepower':'units', })}
                    </div>
                </div>
            )
        }
        else if(ui == 'proportion'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.format_proportion(number), 'details':'proportion', 'size':'l'})}
                </div>
            )
        }
        else if(ui == 'time'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.get_time_diff(number), 'details':'duration', 'size':'l'})}

                </div>
            )
        }
        else if(ui == 'tag'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.get_contract_tag_selected_item(title, number), 'details':'value: '+number, 'size':'l'})}
                </div>
            )
        }
        else if(ui == 'id'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':number, 'details':'target ID', 'size':'l'})}
                </div>
            )
        }
    }

    get_contract_tag_selected_item(title, number){
        var obj = {'Auto Wait':{0:'no', 1:'yes'}, 'Moderator Modify Privelage':{1:'modifiable', 0:'non-modifiable'}, 'Unlimited Extend Contract Time':{1:'enabled', 0:'disabled'}, 'Bounty Limit Type':{0:'relative', 1:'absolute'}, 'Force Exit Enabled':{1:'enabled', 0:'disabled'}}

        return obj[title][number]
    }








    render_modify_token_data(){
        var item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = item.reconfig_values
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':'Modify Token Exchange Action', 'details':items.length+' action(s) added', 'size':'l'})}
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
                                {this.render_detail_item('3', {'title':''+item['title'], 'details':'Modify Target', 'size':'l'})}
                                <div style={{height:5}}/>
                                {this.render_detail_item('3', {'title':''+item['pos'], 'details':'position', 'size':'l'})}
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
                        {this.render_detail_item('2', { 'style':'l', 'title':title, 'subtitle':this.format_power_figure(number), 'barwidth':this.calculate_bar_width(number), 'number':this.format_account_balance_figure(number), 'barcolor':'', 'relativepower':'units', })}
                    </div>
                </div>
            )
        }
        else if(ui == 'proportion'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.format_proportion(number), 'details':'proportion', 'size':'l'})}
                </div>
            )
        }
        else if(ui == 'time'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.get_time_diff(number), 'details':'duration', 'size':'l'})}

                </div>
            )
        }
        else if(ui == 'tag'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.get_token_tag_selected_item(title, number), 'details':'value: '+number, 'size':'l'})}
                </div>
            )
        }
        else if(ui == 'id'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':number, 'details':'target ID', 'size':'l'})}
                </div>
            )
        }
    }

    get_token_tag_selected_item(title, number){
        var obj = {'Auto Wait':{0:'no', 1:'yes'}, 'Moderator Modify Privelage':{1:'modifiable', 0:'non-modifiable'}, 'Unlimited Extend Contract Time':{1:'enabled', 0:'disabled'}, 'Bounty Limit Type':{0:'relative', 1:'absolute'}, 'Force Exit Enabled':{1:'enabled', 0:'disabled'}, 'Halving type':{0:'fixed', 1:'spread'}, 'Block Limit Sensitivity':{1:'1', 2:'2', 3:'3', 4:'4', 5:'5'}}

        return obj[title][number]
    }









    render_exchange_transfer_data(){
        var item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = item.exchange_transfer_values
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':'Exchange Transfer Action', 'details':items.length+' action(s) added', 'size':'l'})}
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
                                    {this.render_detail_item('2', { 'style':'l', 'title':'Token: '+item['token'], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['token']], })}
                                </div>
                                <div style={{height:5}}/>
                                {this.render_detail_item('3', {'title':'Receiver ID: '+item['receiver'], 'details':'Exchange ID:'+item['exchange'], 'size':'s'})}
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

                {this.render_detail_item('3', {'title':'Force Exit Action', 'details':items.length+' action(s) added', 'size':'l'})}
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
                                {this.render_detail_item('3', {'title':'Account ID: '+item, 'details':'Contract ID: '+transaction_item.contract_item['id'], 'size':'s'})}
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

                {this.render_detail_item('3', {'title':'Archive Action', 'details':items.length+' bounty exchange(s) included', 'size':'l'})}
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
                                {this.render_detail_item('3', {'title':'Bounty Exchange ID: '+item['exchange'], 'details':'Default depth 0', 'size':'s'})}
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

                {this.render_detail_item('3', {'title':'Freeze/Unfreeze Action', 'details':items.length+' action(s) included', 'size':'l'})}
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
                                {this.render_detail_item('3', {'title':''+item['action-name']+' '+this.format_account_balance_figure(item['amount'])+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[transaction_item.token_item['id']], 'details':'Target Account ID: '+item['recipient'], 'size':'s'})}
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

                {this.render_detail_item('3', {'title':'Authmint Actions', 'details':items.length+' action(s) included', 'size':'l'})}
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
                                {this.render_detail_item('3', {'title':this.format_account_balance_figure(item['amount']), 'details':'Target Recipient ID: '+item['recipient'], 'size':'s'})}
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

                {this.render_detail_item('3', {'title':'Access Rights Actions', 'details':items.length+' action(s) included', 'size':'l'})}
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
                    {this.render_detail_item('3', {'title':action+' action: '+item['action'], 'details':'Target: '+item['account'], 'size':'s'})}
                </div>
            )
        }
        else if(action == 'interactable-checkers'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':action+' action.', 'details':'Target: '+item['setting'], 'size':'s'})}
                </div>
            )
        }
        else if(action == 'author-moderator-privelages'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':action+' action.', 'details':'Target: Revoke Privelages', 'size':'s'})}
                </div>
            )
        }
        else if(action == 'access-rights'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':action+' action.', 'details':'Target: '+item['account']+', time from now: '+this.get_time_from_now(item['time']), 'size':'s'})}
                </div>
            )
        }
        else if(action == 'blocked-access'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':action+' action.', 'details':'Target: '+item['account']+', time from now: '+this.get_time_from_now(item['time']), 'size':'s'})}
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

                {this.render_detail_item('3', {'title':title, 'details':stacked_items.length+' message(s) included', 'size':'l'})}
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
                    <p style={{'font-size': '11px','color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none', 'white-space': 'pre-line'}}>{this.format_message(item['message'])}</p>
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
                    <p style={{'font-size': '11px','color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none', 'white-space': 'pre-line'}}>{this.format_message(item['message'])}</p>

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

                {this.render_detail_item('3', {'title':'Selected Contract', 'details':'The contract you picked for the application action', 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_contract_item(transaction_item.picked_contract)}
                {this.render_detail_item('0')}
                
                {this.render_detail_item('3', {'title':'Selected Expiry Time', 'details':'The expiry time you picked for the application action', 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.get_time_diff(transaction_item.application_expiry_time - (Date.now()/1000)), 'details':''+(new Date(transaction_item.application_expiry_time * 1000)), 'size':'l'})}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':'Set Prices', 'details':'The amounts youre youll be charging for the job', 'size':'l'})}
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
            'age':{ 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':'block', }
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
                                    {this.render_detail_item('2', { 'style':'l', 'title':'Exchange ID: '+item['id'], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        
    }






    render_accept_job_application_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var item = transaction_item.application_item
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':'Contract ID: '+item['picked_contract_id'], 'details':'Sender ID: '+item['applicant_id'], 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':'Expiry time from now: '+this.get_time_diff(item['application_expiry_time'] - (Date.now()/1000)), 'details':''+(new Date(item['application_expiry_time'] * 1000)), 'size':'l'})}
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

                {this.render_detail_item('3', {'title':''+transaction_item.items_to_deliver.length+' item(s)', 'details':'in your bag.', 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_all_items()}
                <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '2px 20px 20px 20px'}}/>
            </div>
        )
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
        var composition_type = storefront_item['ipfs'].composition_type == null ? 'items' : this.get_selected_item(storefront_item['ipfs'].composition_type, 'e') 
        var items = selected_variant['price_data']
        return(
            <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                
                {this.render_detail_item('3', {'title':storefront_item['ipfs'].entered_title_text+'; '+selected_variant['variant_description'], 'details':this.format_account_balance_figure(item.purchase_unit_count)+' units in '+composition_type, 'size':'s'})} 
                <div style={{height:10}}/>
                
                {items.map((units, index) => (
                    <li style={{'padding': '2px 0px 2px 0px'}}>
                        {this.render_detail_item('2', { 'style':'s', 'title':'Exchange ID: '+units['id'], 'subtitle':this.format_power_figure(this.get_amounts_to_be_paid(units['amount'], item.purchase_unit_count)), 'barwidth':this.calculate_bar_width(this.get_amounts_to_be_paid(units['amount'], item.purchase_unit_count)), 'number':this.format_account_balance_figure(this.get_amounts_to_be_paid(units['amount'], item.purchase_unit_count)), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[units['id']], })}
                    </li>
                ))}

                <div style={{'margin':'0px 10px 0px 10px'}} onClick={()=> this.props.when_edit_bag_item_tapped(item)}>
                    {this.render_detail_item('5', {'text':'Edit', 'action':''},)}
                </div>
                <div style={{height:10}}/>
            </div>
        )
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

                {this.render_detail_item('3', {'title':'Selected Contract', 'details':'The contract you picked for the fulfilment action', 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_contract_item(transaction_item.picked_contract)}
                {this.render_detail_item('0')}
                
                {this.render_detail_item('3', {'title':'Selected Expiry Time', 'details':'The expiry time you picked for the fulfilment action', 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.get_time_diff(transaction_item.application_expiry_time - (Date.now()/1000)), 'details':''+(new Date(transaction_item.application_expiry_time * 1000)), 'size':'l'})}
                
                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.get_time_diff(transaction_item.estimated_delivery_time), 'details':'Estimated Delivery time', 'size':'l'})}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.get_selected_item(transaction_item.pre_post_paid_option, 'e'), 'details':'The payment option you prefer', 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':'Set Prices', 'details':'The amounts youre youll be charging for the bag fulfilment', 'size':'l'})}
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

                {this.render_detail_item('3', {'title':'Contract ID: '+item['picked_contract_id'], 'details':'Sender ID: '+item['applicant_id'], 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':'Expiry time from now: '+this.get_time_diff(item['application_expiry_time'] - (Date.now()/1000)), 'details':''+(new Date(item['application_expiry_time'] * 1000)), 'size':'l'})}
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

                {this.render_detail_item('3', {'title':'Shipping Details', 'details':transaction_item.fulfilment_location, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_selected_variant(transaction_item.selected_variant)}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Number of Units ordered in '+composition_type, 'subtitle':this.format_power_figure(transaction_item.purchase_unit_count), 'barwidth':this.calculate_bar_width(transaction_item.purchase_unit_count), 'number':this.format_account_balance_figure(transaction_item.purchase_unit_count), 'barcolor':'', 'relativepower':composition_type, })}
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
                    {this.render_detail_item('4', {'text':item['variant_description'], 'textsize':'13px', 'font':'Sans-serif'})}
                    <div style={{height:3}}/>
                    <div style={{padding:'0px 0px 0px 10px'}}>
                        {this.render_detail_item('9', item['image_data']['data'])}
                    </div>
                    <div style={{height:5}}/>
                    {this.render_detail_item('3', {'title':this.format_account_balance_figure(item['available_unit_count']), 'details':'Number of Units', 'size':'l'})}
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
                    {this.render_detail_item('3', {'title':'Purchase Amounts', 'details':'This is the final amount for the price of the item your buying', 'size':'l'})}
                    <div style={{height:10}}/>

                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px 0px 5px 0px'}}>
                                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':'Exchange ID: '+item['id'], 'subtitle':this.format_power_figure(this.get_amounts_to_be_paid(item['amount'], transaction_item.purchase_unit_count)), 'barwidth':this.calculate_bar_width(this.get_amounts_to_be_paid(item['amount'], transaction_item.purchase_unit_count)), 'number':this.format_account_balance_figure(this.get_amounts_to_be_paid(item['amount'], transaction_item.purchase_unit_count)), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'title':'Shipping Fee', 'details':'The charged shipping fee for buying the items', 'size':'l'})}
                    <div style={{height:10}}/>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {shipping_items.map((item, index) => (
                            <li style={{'padding': '5px 0px 5px 0px'}}>
                                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':'Exchange ID: '+item['id'], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
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
                    {this.render_detail_item('3', {'title':'Collected Signatures', 'details':'Below are the collected signatures from your direct purchases', 'size':'l'})}
                    <div style={{height:10}}/>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '3px 0px 3px 0px'}}>
                                <SwipeableList>
                                        <SwipeableListItem
                                            swipeLeft={{
                                            content: <div>Delete</div>,
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
                {this.render_detail_item('3', {'size':'s', 'title':'Variant ID: '+item.order_data['variant_id'], 'details':variant_description})}
                <div style={{height:5}}/>
                {this.render_detail_item('3', {'size':'s', 'title':'Received Signature', 'details':start_and_end(item.received_signature) })}
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
                                {this.render_detail_item('2', { 'style':'l', 'title':'Exchange ID: '+item['id'], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
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
                
                {this.render_detail_item('3', {'title':'Selected Expiry Time', 'details':'The expiry time you picked for the application action', 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.get_time_diff(transaction_item.application_expiry_time - (Date.now()/1000)), 'details':''+(new Date(transaction_item.application_expiry_time * 1000)), 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':'Set Description', 'details':transaction_item.entered_title_text, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_image_part()}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':'Set Prices', 'details':'The amounts youll be charging for the job', 'size':'l'})}
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

                {this.render_detail_item('3', {'title':'Selected Contract', 'details':'The contract you picked for the job.', 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_contract_item(transaction_item.picked_contract)}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':'Set Description', 'details':transaction_item.request_item['title_description'], 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':'Set Prices', 'details':'The amounts youll be receiving for the job', 'size':'l'})}
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
                                    {this.render_detail_item('2', { 'style':'l', 'title':'Exchange ID: '+item['id'], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
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

                {this.render_detail_item('3', {'title':transaction_item.alias, 'details':'Reset Alias.', 'size':'l'})}
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

                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':'Price Amounts', 'details':'The amounts you are offering for the job.', 'size':'l'})}
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

                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                </div>

                {this.render_detail_item('3', {'title':'Item Variants', 'details':'The items variant details are shown below', 'size':'l'})}
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

                {this.render_detail_item('3', {'title':'x'+multiplier, 'details':'Multiplier', 'size':'l'})}
                <div style={{height: 10}}/>


                {this.render_detail_item('3', {'title':'message:', 'details':''+transaction_item.entered_message_text, 'size':'l'})}
                {this.render_detail_item('0')}

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l', 'title':'Total amount of SPEND', 'subtitle':this.format_power_figure(award_amount), 'barwidth':this.calculate_bar_width(award_amount), 'number':this.format_account_balance_figure(award_amount), 'barcolor':'', 'relativepower':'spend', })}
                </div>
                <div style={{height: 10}}/>
                
                {this.render_detail_item('3', {'title':'Custom Amounts', 'details':'Your included custom amounts for the award action', 'size':'l'})}
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
                                    {this.render_detail_item('2', { 'style':'l', 'title':'Exchange ID: '+item['id'], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
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

                {this.render_detail_item('3', {'title':'Depth-mint Actions', 'details':items.length+' action(s) included', 'size':'l'})}
                <div style={{height: 10}}/>
                {this.render_authmint_transactions()}
            </div>
        )
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
                <ViewGroups item_id={item_id} object_data={object_data}  theme={this.props.theme} width={width} show_images={this.props.show_images.bind(this)}/>
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




export default ViewTransactionPage;