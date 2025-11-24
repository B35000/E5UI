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
import LocationViewer from './../components/location_viewer';
// import Letter from './../assets/letter.png'; 
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
                {this.render_content()}
            </div>
        )
    }

    set_transaction(transaction, index){
        this.setState({transaction_object: transaction, transaction_index: index})
    }

    when_view_transactions_page_tags_object_updated(tag_obj){
        this.setState({view_transactions_page_tags_object: tag_obj})
    }



    render_content(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_everything()}
                    {this.render_detail_item('0')}
                    {this.render_transaction_details()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_transaction_details()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_everything()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_transaction_details()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_everything()}
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


    render_transaction_details(){
        var item = this.props.app_state.stack_items[this.state.transaction_index]
        if(item != null){
            return(
                <div>
                    {this.render_detail_item('3',{'title':this.props.app_state.loc['1782']/* 'Stack ID: ' */, 'details':item.id,'size':'l'})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3',{'title':this.props.app_state.loc['1783']/* 'Type:' */, 'details':''+item.type,'size':'l'})}
                    
                    {this.render_detail_item('0')}
                    {this.render_edit_button()}

                    
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['1784']/* 'Delete the transaction completely' */, 'title':this.props.app_state.loc['1785']/* 'Delete' */})}
                    <div style={{height:20}}/>

                    <div onClick={()=> this.open_dialog_ui()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['1785']/* 'Delete' */, 'action':''},)}
                    </div>

                    {this.render_detail_item('0')}
                    {this.render_hide_transaction_button()}

                    {this.render_dialog_ui()}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }


    open_dialog_ui(){
        const e5 = this.props.app_state.stack_items[this.state.transaction_index].e5
        if(this.props.app_state.is_running[e5] == true){
            this.props.notify(this.props.app_state.loc['1593kk']/* Wait for its E5 to finish running. */, 4500)
            return;
        }
        // this.setState({confirm_delete_dialog_box: true})
        this.props.show_dialog_bottomsheet({},'confirm_delete_dialog_box')
    }

    render_dialog_ui(){
        return(
            <Dialog PaperProps={{ sx: { borderRadius: "15px" } }} onClose = {() => this.cancel_dialog_box()} open = {this.state.confirm_delete_dialog_box}>
                <div style={{'padding': '10px', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                    <div style={{width:300}}/>
                    <h5 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color'], 'font-family': this.props.app_state.font}}>{this.props.app_state.loc['1786']/* Confirm Delete Action */}</h5>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1787']/* 'Are you sure?' */, 'details':'You cannot undo this action', 'size':'s'})}
                    <div style={{height:10}}/>
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
        if(
            item != null && 
            item.type != this.props.app_state.loc['1509']/* 'mail-messages' */ && 
            item.type != this.props.app_state.loc['1510']/* 'channel-messages' */ && 
            item.type != this.props.app_state.loc['1511']/* 'post-messages' */ && 
            item.type != this.props.app_state.loc['1514']/* 'job-messages' */ && 
            item.type != this.props.app_state.loc['1515']/* 'proposal-messages' */ && 
            item.type != this.props.app_state.loc['19']/* 'exit-contract' */ && 
            item.type != this.props.app_state.loc['783']/* 'submit' */ && 
            item.type != this.props.app_state.loc['829']/* 'collect-subscription' */ && 
            item.type != this.props.app_state.loc['1513']/* 'accept-job-application' */ && 
            item.type != this.props.app_state.loc['1516']/* 'storefront-bag' */ && 
            item.type != this.props.app_state.loc['1126']/* 'bag-response' */ && 
            item.type != this.props.app_state.loc['1498']/* 'accept-bag-application' */ && 
            item.type != this.props.app_state.loc['1500']/* 'clear-purchase' */ && 
            item.type != this.props.app_state.loc['1505']/* 'job-request-messages' */ && 
            item.type != this.props.app_state.loc['1506']/* 'alias' */ && 
            item.type != this.props.app_state.loc['1507']/* 'unalias' */ && 
            item.type != this.props.app_state.loc['1508']/* 're-alias' */ && 
            item.type != this.props.app_state.loc['1593cc']/* 'audio-messages' */ && 
            item.type != this.props.app_state.loc['1593ct']/* 'video-messages' */ && 
            item.type != this.props.app_state.loc['1593cu']/* 'nitro-messages' */ &&
            item.type != this.props.app_state.loc['3068ac']/* 'iTransfer' */ && 
            item.type != this.props.app_state.loc['3068af']/* 'bill' */ &&
            item.type != this.props.app_state.loc['3071j']/* 'bill-payment' */ &&
            item.type != this.props.app_state.loc['3074bq']/* 'poll-result' */ &&
            item.type != this.props.app_state.loc['3030b']/* 'video-comment-messages' */ &&
            item.type != this.props.app_state.loc['3075w']/* 'stage-creator-payout' */ &&
            item.type != this.props.app_state.loc['2117p']/* 'creator-payout' */ &&
            item.type != this.props.app_state.loc['3055df']/* 'nitro-renewal' */ &&
            item.type != this.props.app_state.loc['3077']/* 'fulfil-bids' */ &&
            item.type != this.props.app_state.loc['3055fg']/* 'vote_all' */ &&
            item.type != this.props.app_state.loc['2642bm']/* 'order-payment' */ &&
            item.type != this.props.app_state.loc['3055gf']/* 'transfer-alias' */
        ){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['1788']/* 'Make some changes to the transaction' */, 'title':this.props.app_state.loc['1789']/* 'Edit' */})}
                    <div style={{height:10}}/>

                    <div onClick={()=> this.open_edit_object_uis()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['1789']/* 'Edit' */, 'action':''},)}
                    </div>
                    {this.render_detail_item('0')}
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
            else if(tx.type == this.props.app_state.loc['a311a']/* audio */){
                return(
                    <div>
                        {this.render_audio_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['b311a']/* video */){
                return(
                    <div>
                        {this.render_video_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['a273a']/* 'nitro' */){
                return(
                    <div>
                        {this.render_nitro_data()}
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
                        {this.render_mail_message_data(this.props.app_state.loc['1979b']/* 'Mail Messages' */)}
                    </div>
                ) 
            }
            else if(tx.type == this.props.app_state.loc['1510']/* 'channel-messages' */){
                return(
                    <div>
                        {this.render_mail_message_data(this.props.app_state.loc['1979c']/* 'Channel Messages' */)}
                    </div>
                )   
            }
            else if(tx.type == this.props.app_state.loc['1511']/* 'post-messages' */){
                return(
                    <div>
                        {this.render_mail_message_data(this.props.app_state.loc['1979d']/* 'Post Messages' */)}
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
                        {this.render_mail_message_data(this.props.app_state.loc['']/* 'Job Messages' */)}
                    </div>
                )    
            }
            else if(tx.type == this.props.app_state.loc['1515']/* 'proposal-messages' */){
                return(
                    <div>
                        {this.render_mail_message_data(this.props.app_state.loc['1979e']/* 'Proposal Messages' */)}
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
                        {this.render_mail_message_data(this.props.app_state.loc['1979f']/* 'Bag Messages' */)}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['1502']/* 'storefront-messages' */){
                return(
                    <div>
                        {this.render_mail_message_data(this.props.app_state.loc['1979g']/* 'Storefront Messages' */)}
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
                        {this.render_mail_message_data(this.props.app_state.loc['1979h']/* 'Job Request Messages' */)}
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
            else if(tx.type == this.props.app_state.loc['2846']/* stage-royalty */){
                return(
                    <div>
                        {this.render_stage_royalty_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['2884']/* 'royalty-payouts' */){
                return(
                    <div>
                        {this.render_royaly_payout_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['2896']/* 'upcoming-subscriptions' */){
                return(
                    <div>
                        {this.render_upcoming_subscription_payment_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['1593cc']/* 'audio-messages' */){
                return(
                    <div>
                        {this.render_mail_message_data(this.props.app_state.loc['1979i']/* 'Audiopost Messages' */)}
                    </div>
                )   
            }
            else if(tx.type == this.props.app_state.loc['2962']/* 'buy-album' */){
                return(
                    <div>
                        {this.render_buy_album_transaction_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['2975']/* 'edit-audio' */){
                return(
                    <div>
                        {this.render_edit_audiopost()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['1593ct']/* 'video-messages' */){
                return(
                    <div>
                        {this.render_mail_message_data(this.props.app_state.loc['1979j']/* 'Videopost Messages' */)}
                    </div>
                )   
            }
            else if(tx.type == this.props.app_state.loc['a2962a']/* 'buy-video' */){
                return(
                    <div>
                        {this.render_buy_video_transaction_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['3023']/* 'edit-video' */){
                return(
                    <div>
                        {this.render_edit_videopost()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['1593cu']/* 'nitro-messages' */){
                return(
                    <div>
                        {this.render_mail_message_data(this.props.app_state.loc['1979k']/* 'Nitropost Messages' */)}
                    </div>
                )   
            }
            else if(tx.type == this.props.app_state.loc['3030']/* 'edit-nitro' */){
                return(
                    <div>
                        {this.render_edit_nitropost()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['3031']/* 'buy-storage' */){
                return(
                    <div>
                        {this.render_buy_storage_transaction_data()}
                    </div>
                ) 
            }
            else if(tx.type == this.props.app_state.loc['3068ac']/* 'iTransfer' */){
                return(
                    <div>
                        {this.render_itransfer_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['3068af']/* 'bill' */){
                return(
                    <div>
                        {this.render_bill_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['3071j']/* 'bill-payment' */){
                return(
                    <div>
                        {this.render_pay_bill_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['c311a']/* 'poll' */){
                return(
                    <div>
                        {this.render_poll_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['3072h']/* 'edit-poll' */){
                return(
                    <div>
                        {this.render_edit_poll()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['3073']/* 'vote-poll' */){
                return(
                    <div>
                        {this.render_vote_poll()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['3074bq']/* 'poll-result' */){
                return(
                    <div>
                        {this.render_poll_result()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['3030b']/* 'video-comment-messages' */){
                return(
                    <div>
                        {this.render_mail_message_data(this.props.app_state.loc['1979l']/* 'Video Comment Messages' */)}
                    </div>
                )   
            }
            else if(tx.type == this.props.app_state.loc['3075w']/* 'stage-creator-payout' */){
                return(
                    <div>
                        {this.render_stage_creator_payout_info()}
                    </div>
                )   
            }
            else if(tx.type == this.props.app_state.loc['2117p']/* 'creator-payout' */){
                return(
                    <div>
                        {this.render_creator_payout_info()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['3055df']/* 'nitro-renewal' */){
                return(
                    <div>
                        {this.render_nitro_renewal_info()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['3076']/* 'auction-bid' */){
                return(
                    <div>
                        {this.render_auction_bid_info()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['3077']/* 'fulfil-bids' */){
                return(
                    <div>
                        {this.render_auction_bid_fulfilment_info()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['3055fg']/* 'vote_all' */){
                return(
                    <div>
                        {this.render_vote_all_proposals_info()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['3055gf']/* 'transfer-alias' */){
                return(
                    <div>
                        {this.render_transfer_alias_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['2642bm']/* 'order-payment' */){
                return(
                    <div>
                        {this.render_order_payment_data()}
                    </div>
                )
            }
            else if(tx.type == this.props.app_state.loc['3092']/* 'purchase-credits' */){
                return(
                    <div>
                        {this.render_purchase_credits_data()}
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
                        <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item], 'number':buy_amounts[index], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                            {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item], 'subtitle':this.format_power_figure(buy_amounts[index]), 'barwidth':this.calculate_bar_width(buy_amounts[index]), 'number':this.format_account_balance_figure(buy_amounts[index]), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
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

            'default_minimum_end_vote_bounty_amount':{'style':'l','title':this.props.app_state.loc['200']/* 'Minimum End Bounty Amount' */, 'subtitle':this.format_power_figure(contract_config[4]), 'barwidth':this.calculate_bar_width(contract_config[4]), 'number':this.format_account_balance_figure(contract_config[4]), 'relativepower':this.props.app_state.loc['483']/* 'tokens' */, 'n':contract_config[4]},

            'default_minimum_spend_vote_bounty_amount':{'style':'l','title':this.props.app_state.loc['80']/* 'Minimum Spend Bounty Amount' */, 'subtitle':this.format_power_figure(contract_config[10]), 'barwidth':this.calculate_bar_width(contract_config[10]), 'number':this.format_account_balance_figure(contract_config[10]), 'relativepower':this.props.app_state.loc['483']/* 'tokens' */, 'n':contract_config[10]},

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

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['buy_limit']['title'], 'number':item['buy_limit']['n'], 'relativepower':item['buy_limit']['relativepower']})}>
                        {this.render_detail_item('2', item['buy_limit'])}
                    </div>
                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['sell_limit']['title'], 'number':item['sell_limit']['n'], 'relativepower':item['sell_limit']['relativepower']})}>
                        {this.render_detail_item('2', item['sell_limit'])}
                    </div>
                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['exchanges_liquidity']['title'], 'number':item['exchanges_liquidity']['n'], 'relativepower':item['exchanges_liquidity']['relativepower']})}>
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

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['ratio_x']['title'], 'number':item['ratio_x']['n'], 'relativepower':item['ratio_x']['relativepower']})}>
                        {this.render_detail_item('2', item['ratio_x'])}
                    </div>
                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['ratio_y']['title'], 'number':item['ratio_y']['number'], 'relativepower':item['ratio_y']['relativepower']})}>
                        {this.render_detail_item('2', item['ratio_y'])}
                    </div>
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', item['combined_exchange_ratio'])}
                    {this.render_detail_item('0')}

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['block_limit']['title'], 'number':item['block_limit']['n'], 'relativepower':item['block_limit']['relativepower']})}>
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
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['maturity_limit']['title'], 'number':item['maturity_limit']['number'], 'relativepower':item['maturity_limit']['relativepower']})}>
                        {this.render_detail_item('2', item['maturity_limit'])}
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
            title = this.props.app_state.loc['3079']/* SPEND */
        }

        var item = selected_object;
        var active_tags = item['ipfs'] == null ? [''+title, ''+type, 'token'] : item['ipfs'].entered_indexing_tags
        var name = item['ipfs'] == null ? ''+title : item['ipfs'].entered_title_text
        var symbol = item['ipfs'] == null ? ''+type : item['ipfs'].entered_symbol_text

        var default_image = type == this.props.app_state.loc['606']/* 'capped' */ ? EndImg: SpendImg
        var image = item['ipfs'].token_image == null ? default_image : this.get_image_from_file(item['ipfs'].token_image)

        // var image = item['ipfs'] == null ? img : item['ipfs'].token_image
        
        return{
            'tags':{'active_tags':active_tags, 'index_option':'indexed', 'when_tapped':''},
            'banner-icon':{'header':name, 'subtitle':symbol, 'image':image},
            'token_id': {'title':'ID: '+selected_object['id'], 'details':this.props.app_state.loc['1813']/* 'Token Identifier' */, 'size':'l'},
            'token_type': {'title':this.props.app_state.loc['1814']/* 'Token Type' */, 'details':type, 'size':'l'},

            'unlocked_supply': {'title':this.props.app_state.loc['1814%']/* 'Unlocked Supply' */, 'details':this.enabled_disabled(selected_obj_root_config[0]), 'size':'l'},
            'unlocked_liquidity': {'title':this.props.app_state.loc['1815']/* 'Unlocked Liquidity' */, 'details':this.enabled_disabled(selected_obj_root_config[1]), 'size':'l'},
            'fully_custom': {'title':this.props.app_state.loc['1816']/* 'Fully Custom' */, 'details':this.enabled_disabled(selected_obj_root_config[2]), 'size':'l'},

            'buy_limit':{'style':'l','title':this.props.app_state.loc['1817']/* 'Mint Limit' */, 'subtitle':this.format_power_figure(selected_obj_config[0]), 'barwidth':this.calculate_bar_width(selected_obj_config[0]), 'number':this.format_account_balance_figure(selected_obj_config[0]), 'relativepower':symbol, 'n':selected_obj_config[0]},
            
            'minimum_transactions_between_swap': {'title':selected_obj_config[2], 'details':this.props.app_state.loc['330']/* 'Minimum Transactions Between Swap' */, 'size':'l'},
            'minimum_blocks_between_swap': {'title':selected_obj_config[3], 'details':this.props.app_state.loc['331']/* 'Minimum Blocks Between Swap' */, 'size':'l'},
            'minimum_time_between_swap': {'title':this.get_time_diff(selected_obj_config[4]), 'details':this.props.app_state.loc['658']/* 'Minimum Time Between Swap' */, 'size':'l'},
            
            'trust_fee_proportion': {'title':this.format_proportion(selected_obj_config[7]), 'details':this.props.app_state.loc['660']/* 'Trust Fee' */, 'size':'l'},
            'exchange_authority': {'title':this.props.app_state.loc['1818']/* 'Authority: ' */+is_auth_main_contract, 'details':this.props.app_state.loc['1819']/* 'Exchange Authority Identifier' */, 'size':'l'},
            'trust_fee_target': {'title':this.props.app_state.loc['1820']/* 'Target: ' */+is_trust_fee_target_main_contract, 'details':this.props.app_state.loc['1821']/* 'Trust Fee Target Identifier' */, 'size':'l'},

            'sell_limit':{'style':'l','title':this.props.app_state.loc['328']/* 'Sell Limit' */, 'subtitle':this.format_power_figure(selected_obj_config[11]), 'barwidth':this.calculate_bar_width(selected_obj_config[11]), 'number':this.format_account_balance_figure(selected_obj_config[11]), 'relativepower':symbol, 'n':selected_obj_config[11]},

            'minimum_entered_contracts_between_swap': {'title':selected_obj_config[13], 'details':this.props.app_state.loc['332']/* 'Minimum Entered Contracts Between Swap' */, 'size':'l'},
            'minimum_transactions_for_first_buy': {'title':selected_obj_config[17], 'details':this.props.app_state.loc['333']/* 'Minimum Transactions For First Buy' */, 'size':'l'},
            'minimum_entered_contracts_for_first_buy': {'title':selected_obj_config[18], 'details':this.props.app_state.loc['334']/* 'Minimum Entered Contracts For First Buy' */, 'size':'l'},

            'ratio_x':{'style':'l','title':this.props.app_state.loc['395']/* 'Exchange Ratio X' */, 'subtitle':this.format_power_figure(selected_obj_ratio_config[0]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[0]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[0]), 'relativepower':'', 'n':selected_obj_ratio_config[0]},
            'ratio_y':{'style':'l','title':this.props.app_state.loc['396']/* 'Exchange Ratio Y' */, 'subtitle':this.format_power_figure(selected_obj_ratio_config[1]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[1]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[1]), 'relativepower':'', 'n':selected_obj_ratio_config[1]},
            'combined_exchange_ratio': {'title':this.format_exchange_ratio(selected_obj_ratio_config[0], selected_obj_ratio_config[1]), 'details':this.props.app_state.loc['712']/* 'Exchange Ratio X:Y' */, 'size':'l'},

            'exchanges_liquidity':{'style':'l','title':this.props.app_state.loc['712']/* 'Circulating Supply' */, 'subtitle':this.format_power_figure(selected_obj_ratio_config[2]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[2]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[2]), 'relativepower':symbol, 'n':selected_obj_ratio_config[2]},
            'mint_burn_button':{'text':this.props.app_state.loc['1822']/* 'Mint/Burn Token' */, 'action':''},

            'block_limit':{'style':'l','title':this.props.app_state.loc['335']/* 'Block Limit' */, 'subtitle':this.format_power_figure(selected_obj_config[1]), 'barwidth':this.calculate_bar_width(selected_obj_config[1]), 'number':this.format_account_balance_figure(selected_obj_config[1]), 'relativepower':symbol, 'n':selected_obj_config[1]},
            'internal_block_halfing_proportion': {'title':this.format_proportion(selected_obj_config[5]), 'details':this.props.app_state.loc['338']/* 'Internal Block Halving Proportion' */, 'size':'l'},
            'block_limit_reduction_proportion': {'title':this.format_proportion(selected_obj_config[6]), 'details':this.props.app_state.loc['339']/* 'Block Limit Reduction Proportion' */, 'size':'l'},
            
            'block_reset_limit': {'title':selected_obj_config[8], 'details':this.props.app_state.loc['340']/* 'Block Reset Limit' */, 'size':'l'},
            'block_limit_sensitivity': {'title':selected_obj_config[12], 'details':this.props.app_state.loc['341']/* 'Block Limit Sensitivity' */, 'size':'l'},
            'default_authority_mint_limit': {'title':this.format_proportion(selected_obj_config[14]), 'details':this.props.app_state.loc['1823']/* 'Authority Mint Limit (percentage of supply)' */, 'size':'l'},
            'block_halfing_type': {'title':halfing_type, 'details':this.props.app_state.loc['336']/* 'Halving Type' */, 'size':'l'},
            'maturity_limit':{'style':'l','title':this.props.app_state.loc['337']/* 'Maturity Limit' */, 'subtitle':this.format_power_figure(selected_obj_config[16]), 'barwidth':this.calculate_bar_width(selected_obj_config[16]), 'number':this.format_account_balance_figure(selected_obj_config[16]), 'relativepower':symbol, 'n':selected_obj_config[16]},

            'current_block_mint_total':{'style':'l','title':this.props.app_state.loc['1824']/* 'Current Block Mint Total' */, 'subtitle':this.format_power_figure(selected_obj_ratio_config[4]), 'barwidth':this.calculate_bar_width(selected_obj_ratio_config[4]), 'number':this.format_account_balance_figure(selected_obj_ratio_config[4]), 'relativepower':symbol, 'n':selected_obj_ratio_config[4]},
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

    get_image_from_file(ecid){
        var ecid_obj = this.get_cid_split(ecid)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        if(data == null) return
return data['data']
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
                    {this.render_detail_item('3', item['target_authority_id'])}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['minimum_buy_amount']['title'], 'number':item['minimum_buy_amount']['n'], 'relativepower':item['minimum_buy_amount']['relativepower']})}>
                        {this.render_detail_item('2', item['minimum_buy_amount'])}
                    </div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['can_cancel_subscription'])}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['maximum_buy_amount']['title'], 'number':item['maximum_buy_amount']['n'], 'relativepower':item['maximum_buy_amount']['relativepower']})}>
                        {this.render_detail_item('2', item['maximum_buy_amount'])}
                    </div>
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['minimum_cancellable_balance_amount']['title'], 'number':item['minimum_cancellable_balance_amount']['n'], 'relativepower':item['minimum_cancellable_balance_amount']['relativepower']})}>
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
            
            'minimum_buy_amount':{ 'style':'l', 'title':this.props.app_state.loc['1831']/* 'Minimum Buy Amount' */, 'subtitle':'??', 'barwidth':this.get_number_width(subscription_config[1]), 'number':`${number_with_commas(subscription_config[1])}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['1832']/* 'time-units' */, 'n':subscription_config[1] },

            'can_cancel_subscription': {'title':can_cancel_subscription, 'details':this.props.app_state.loc['1833']/* 'Subscription Type' */, 'size':'l'},

            'maximum_buy_amount':{ 'style':'l', 'title':this.props.app_state.loc['1834']/* 'Maximum Buy Amount' */, 'subtitle':'??', 'barwidth':this.get_number_width(subscription_config[3]), 'number':`${number_with_commas(subscription_config[3])}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['1835']/* time-units' */,'n':subscription_config[3] },

            'minimum_cancellable_balance_amount':{ 'style':'l', 'title':this.props.app_state.loc['1836']/* 'Minimum Cancellable Amount' */, 'subtitle':'??', 'barwidth':this.get_number_width(subscription_config[4]), 'number':`${number_with_commas(subscription_config[4])}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['1835']/* 'time-units' */, 'n':subscription_config[4] },

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
                    {this.render_pdf_files_if_any()}
                    {this.render_zip_files_if_any()}
                    {this.render_markdown_if_any()}
                    
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
                                            <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
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


    render_pdf_files_if_any(){
        var state = this.props.app_state.stack_items[this.state.transaction_index]
        if(state.entered_pdf_objects != null && state.entered_pdf_objects.length > 0){
            return(
                <div>
                    {this.render_pdfs_part(state.entered_pdf_objects)}
                </div>
            )
        }
    }

    render_pdfs_part(entered_pdf_objects){
        var items = [].concat(entered_pdf_objects)

        if(items.length == 0) return;
        
        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_uploaded_pdf_item_clicked(item)}>
                            {this.render_uploaded_file(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    when_uploaded_pdf_item_clicked(item){
        this.props.when_pdf_file_opened(item)
    }

    render_uploaded_file(item, index){
        var ecid_obj = this.get_cid_split(item)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        //
        var formatted_size = this.format_data_size(data['size'])
        var fs = formatted_size['size']+' '+formatted_size['unit']
        var title = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
        title = fs;
        var details = start_and_end(data['name'])
        var thumbnail = data['thumbnail']

        return(
            <div>
                {this.render_detail_item('8', {'details':title,'title':details, 'size':'s', 'image':thumbnail, 'border_radius':'15%',})}
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

    render_markdown_if_any(){
        var state = this.props.app_state.stack_items[this.state.transaction_index]
        if(state.markdown != null && state.markdown != ''){
            return(
                <div>
                    {this.render_detail_item('13', {'source':state.markdown})}
                </div>
            )
        }
    }






    render_zip_files_if_any(){
        var state = this.props.app_state.stack_items[this.state.transaction_index]
        if(state.entered_zip_objects != null && state.entered_zip_objects.length > 0){
            return(
                <div>
                    {this.render_zips_part(state.entered_zip_objects)}
                </div>
            )
        }
    }

    render_zips_part(entered_zip_objects){
        var items = [].concat(entered_zip_objects)

        if(items.length == 0) return;
        
        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_uploaded_zip_item_clicked(item)}>
                            {this.render_uploaded_zip_file(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_uploaded_zip_file(item, index){
        var ecid_obj = this.get_cid_split(item)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        //
        var formatted_size = this.format_data_size(data['size'])
        var fs = formatted_size['size']+' '+formatted_size['unit']
        var title = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
        title = fs;
        var details = start_and_end(data['name'])
        var thumbnail = this.props.app_state.static_assets['zip_file']

        return(
            <div>
                {this.render_detail_item('8', {'details':title,'title':details, 'size':'s', 'image':thumbnail, 'border_radius':'15%',})}
            </div>
        )
    }

    when_uploaded_zip_item_clicked(item){
        this.props.when_zip_file_opened(item)
    }








    render_video_data(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-150
        var object = this.format_post();
        var item = this.get_video_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects

        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('7', item['banner-icon'])}
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    {this.render_detail_item('0')}



                    {this.render_item_data(items)}
                    {this.render_item_images()}

                    {this.render_pdf_files_if_any()}
                    {this.render_zip_files_if_any()}
                    {this.render_markdown_if_any()}

                    {this.render_video_tabs()}
                    {this.render_contractor_price_amounts()}

                    
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_video_tabs(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var object = this.format_post();
        var items = [].concat(object['ipfs'].videos)

        if(items.length == 0){
            items = [1, 2, 3]
            return(
                <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                <div style={{height:47, width:97, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        return(
            <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_video_tab_item(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_video_tab_item(item, index){
        return(
            <div>
                {this.render_detail_item('3', {'title':item['video_id'], 'details':this.truncate(item['video_title'], 15), 'size':'s', 'padding':'5px 12px 5px 12px'})}
            </div>
        )
    }

    get_video_details_data(object){
        var tags = object['ipfs'] == null ? ['Post'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        var listing_type = this.get_selected_item(object['ipfs'].get_listing_type_tags_option, 'e')
        var image = object['ipfs'].album_art
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'listing_type':{'title':listing_type, 'details':this.props.app_state.loc['a311aw']/* 'Post Type.' */, 'size':'l'},
            'banner-icon':{'header':'me', 'subtitle':this.truncate(title, 15), 'image':image},
        }
    }








    render_nitro_data(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-150
        var object = this.format_post();
        var item = this.get_nitro_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects

        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('7', item['banner-icon'])}
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['node_url'])}
                    {this.render_detail_item('0')}

                    {this.render_item_data(items)}
                    {this.render_item_images()}

                    {this.render_pdf_files_if_any()}
                    {this.render_zip_files_if_any()}
                    {this.render_markdown_if_any()}
                    
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    get_nitro_details_data(object){
        var tags = object['ipfs'] == null ? ['Post'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        var node_url = object['ipfs'] == null ? 'Nitro ID' : object['ipfs'].node_url
        var album_art = object['ipfs'].album_art
        var default_image = EndImg
        var image = album_art == null ? default_image : this.get_image_from_file(album_art)
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'node_url':{'title':node_url, 'details':this.props.app_state.loc['a273n']/* 'Nitro Link.' */, 'size':'l'},
            'banner-icon':{'header':'', 'subtitle':'', 'image':image},
        }
    }






    render_poll_data(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-150
        var object = this.format_post();
        var item = this.get_poll_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects
        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{height: 10}}/>
                    {this.show_consensus_type_message(object)}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['winner_data'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['start_time'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['end_time'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['participants'])}
                    <div style={{height: 10}}/>
                    {this.render_vote_changing_message_if_enabled(object)}
                    {this.render_csv_files_if_any()}
                    {this.render_json_files_if_any()}
                    {this.poll_e5s()}
                    {this.render_detail_item('0')}

                    {this.render_item_data(items)}
                    {this.render_item_images()}

                    {this.render_pdf_files_if_any()}
                    {this.render_zip_files_if_any()}
                    {this.render_markdown_if_any()}
                    
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_vote_changing_message_if_enabled(object){
        const get_changeable_vote_tags_object = this.get_selected_item2(object['ipfs'].get_changeable_vote_tags_object, 'e') == 1
        
        var title = this.props.app_state.loc['3072s']/* 'Change Vote Enabled.' */
        var details = this.props.app_state.loc['3072t']/* 'You can change your vote during the poll period.' */
        if(get_changeable_vote_tags_object == false){
            title = this.props.app_state.loc['3072u']/* 'Change Vote Disabled.' */
            details = this.props.app_state.loc['3072v']/* 'nly your first vote will be counted.' */
        }
        return(
            <div>
                {this.render_detail_item('3', {'title':title, 'details':details, 'size':'l'})}
            </div>
        )
    }

    get_poll_details_data(object){
        var tags = object['ipfs'] == null ? ['Post'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        var winner_count = this.props.app_state.loc['c311bx']/* '$ winners targeted.' */.replace('$', object['ipfs'].winner_count)
        var candidates_count = this.props.app_state.loc['c311by']/* '$ candidates specified.' */.replace('$', object['ipfs'].candidates.length)
        var start_time = object['ipfs'].start_time
        var end_time = object['ipfs'].end_time
        var participants_count = object['ipfs'].participants.length
        object['ipfs'].csv_files.forEach(file => {
            participants_count += file['data'].account_entries;
        });
        object['ipfs'].json_files.forEach(file => {
            participants_count += file['data'].account_entries
        });
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'winner_data':{'title':candidates_count, 'details':winner_count, 'size':'l'},
            'start_time':{'details':this.props.app_state.loc['3072a']/* 'Start Time' */, 'title':''+(new Date(start_time * 1000)), 'size':'l'},
            'end_time':{'details':this.props.app_state.loc['3072b']/* 'End Time.' */, 'title':''+(new Date(end_time * 1000)), 'size':'l'},
            'participants':{'title':number_with_commas(participants_count), 'details':this.props.app_state.loc['c311bz']/* 'targeted participants.' */, 'size':'l'},
        }
    }

    render_csv_files_if_any(){
        var state = this.props.app_state.stack_items[this.state.transaction_index]
        if(state.csv_files != null && state.csv_files.length > 0){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['c311x']/* '$ files selected.*/.replace('$', state.csv_files.length), 'textsize':'11px', 'font':this.props.app_state.font})}
                    {this.render_csv_files(state.csv_files)}
                </div>
            )
        }
    }

    render_csv_files(items){
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_file(item, index, true, 'csv')}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_file(item, index, minified, type){
        var formatted_size = this.format_data_size(item['size'])
        var fs = formatted_size['size']+' '+formatted_size['unit']
        var txt = this.props.app_state.loc['c311w']/* $ accounts */.replace('$', number_with_commas(item['data'].account_entries))
        var details = fs+' • '+txt;
        var title = item['name']
        var size = 'l'
        var thumbnail = type == 'csv' ? this.props.app_state.static_assets['csv_file'] : this.props.app_state.static_assets['json_file']
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

    render_json_files_if_any(){
        var state = this.props.app_state.stack_items[this.state.transaction_index]
        if(state.json_files != null && state.json_files.length > 0){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['c311x']/* '$ files selected.*/.replace('$', state.csv_files.length), 'textsize':'11px', 'font':this.props.app_state.font})}
                    {this.render_json_files(state.json_files)}
                </div>
            )
        }
    }

    render_json_files(items){
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_file(item, index, true, 'json')}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    poll_e5s(){
        var state = this.props.app_state.stack_items[this.state.transaction_index]
        var items = state.poll_e5s
        var items2 = [0, 1]
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_e5_item(item)}
                        </li>
                    ))}
                    {items2.map(() => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_empty_horizontal_list_item()}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_empty_horizontal_list_item(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div>
                <div style={{height:57, width:85, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                    </div>
                </div>
            </div>
        )
    }

    render_e5_item(item){
        var image = this.props.app_state.e5s[item].e5_img
        var details = this.props.app_state.e5s[item].token
        return(
            <div>
                {this.render_detail_item('12', {'title':item, 'image':image, 'details':details, 'size':'s'})}
            </div>
        )
    }

    show_consensus_type_message(object){
        var text = this.props.app_state.loc['3072y']/* Instant-Runoff */
        if(object['ipfs'].winner_count > 1){
            text = this.props.app_state.loc['3072z']/* Proportional-Ranked Choice (Single Transferrable Vote) */
        }
        return(
            <div>
                {this.render_detail_item('3', {'title':text, 'details':this.props.app_state.loc['3072x']/* 'Consensus Type.' */, 'size':'l'})}
            </div>
        )
    }
    










    render_audio_data(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-150
        var object = this.format_post();
        var item = this.get_audio_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects

        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('7', item['banner-icon'])}
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['genre'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['year'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['author'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['copyright'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['comment'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['listing_type'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['purchase_recipient'])}
                    {this.render_detail_item('0')}



                    {this.render_item_data(items)}
                    {this.render_item_images()}

                    {this.render_pdf_files_if_any()}
                    {this.render_zip_files_if_any()}
                    {this.render_markdown_if_any()}

                    {this.render_song_tabs()}
                    {this.render_contractor_price_amounts()}

                    
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_contractor_price_amounts(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var object = this.format_post();
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
                                            <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
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
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_song_tabs(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var object = this.format_post();
        var items = [].concat(object['ipfs'].songs)

        if(items.length == 0){
            items = [1, 2, 3]
            return(
                <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                <div style={{height:47, width:97, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        return(
            <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_tab_item(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_tab_item(item, index){
        return(
            <div>
                {this.render_detail_item('3', {'title':item['song_id'], 'details':this.truncate(item['song_title'], 15), 'size':'s', 'padding':'5px 12px 5px 12px'})}
            </div>
        )
    }

    get_audio_details_data(object){
        var tags = object['ipfs'] == null ? ['Post'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        var genre = object['ipfs'].entered_genre_text
        var year = object['ipfs'].entered_year_recorded_text
        var author = object['ipfs'].entered_author_text
        var copyright = object['ipfs'].entered_copyright_text
        var comment = object['ipfs'].entered_comment_text
        var listing_type = this.get_selected_item(object['ipfs'].get_listing_type_tags_option, 'e')
        var image = object['ipfs'].album_art
        var purchase_recipient = object['ipfs'].purchase_recipient
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'genre':{'title':genre, 'details':this.props.app_state.loc['a311y']/* 'Album Genre.' */, 'size':'l'},
            'year':{'title':year, 'details':this.props.app_state.loc['a311aa']/* 'Year Recorded.' */, 'size':'l'},
            'author':{'title':author, 'details':this.props.app_state.loc['a311ac']/* 'Author' */, 'size':'l'},
            'copyright':{'title':copyright, 'details':this.props.app_state.loc['a311ae']/* 'Copyright' */, 'size':'l'},
            'comment':{'title':comment, 'details':this.props.app_state.loc['a311ag']/* 'Comment' */, 'size':'l'},
            'listing_type':{'title':listing_type, 'details':this.props.app_state.loc['a311aw']/* 'Post Type.' */, 'size':'l'},
            'banner-icon':{'header':author, 'subtitle':this.truncate(title, 15), 'image':image},
            'purchase_recipient':{'title':purchase_recipient, 'details':this.props.app_state.loc['a311bd']/* 'Purchase Recipient' */, 'size':'l'},
        }
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

                    {this.render_pdf_files_if_any()}
                    {this.render_zip_files_if_any()}
                    {this.render_markdown_if_any()}

                    {this.render_detail_item('0')}
                    {this.render_job_location_info()}
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
                                            <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
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






    render_job_location_info(){
        var state = this.props.app_state.stack_items[this.state.transaction_index]
        if(state.pins != null && state.pins.length > 0){
            const pins = state.pins
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2064k']/* 'Included Locations Pins.' */, 'details':this.props.app_state.loc['2064l']/* 'Some locations have been included in the object. */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <div onClick={() => this.props.show_view_map_location_pins(pins)}>
                        <LocationViewer ref={this.locationPickerRef} height={270} theme={this.props.theme['map_theme']} center={this.get_default_center()} pins={pins} size={this.props.size} input_enabled={false}
                        />
                    </div>
                    {this.render_selected_pins(pins)}
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_default_center(){
        const my_city = this.props.app_state.device_city.toLowerCase()
        var all_cities = this.props.app_state.all_cities
        var specific_cities_objects = all_cities.filter(function (el) {
            return (el['city'].startsWith(my_city) || el['city'] == my_city)
        });

        if(specific_cities_objects.length > 0){
            var city_obj = specific_cities_objects[0];
            return { lat: city_obj['lat'], lon: city_obj['lon'] }
        }
        else{
            return { lat: 51.505, lon: -0.09 }
        }
    }

    render_selected_pins(pins){
        var items = [].concat(pins)
        return(
            <div>
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_pin_item(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    render_pin_item(item){
        const title = item['id']
        const details = item['description'] == '' ? this.props.app_state.loc['284q']/* 'latitude: $, longitude: %' */.replace('$', item['lat']).replace('%', item['lng']) : this.truncate(item['description'], 17)
        return(
            <div onClick={() => this.when_pin_item_clicked(item)}>
                {this.render_detail_item('3', {'title':title, 'details':details, 'size':'s'})}
            </div>
        )
    }

    when_pin_item_clicked(item){
        const location_data = { lat: item['lat'], lon: item['lng'] }
        this.locationPickerRef.current?.set_center(location_data);
    }

    constructor(props) {
        super(props);
        this.locationPickerRef = React.createRef();
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

                    {this.render_pdf_files_if_any()}
                    {this.render_zip_files_if_any()}
                    {this.render_markdown_if_any()}

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
                        <div style={{height: 10}}/>
                        {this.render_detail_item('3', item['type'])}

                        {this.render_detail_item('0')}
                        {this.render_job_location_info()}
                        {this.render_item_data(items)}
                        {this.render_item_images()}
                        {this.render_selected_links()}
                        {this.render_buy_options(object)}

                        {this.render_pdf_files_if_any()}
                        {this.render_zip_files_if_any()}
                        {this.render_markdown_if_any()}

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

        var selected_item = this.get_selected_item(object['ipfs'].get_option_storefront_type_object, object['ipfs'].get_option_storefront_type_object['i'].active)

        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'type':{'title':selected_item, 'details':this.props.app_state.loc['535ak']/* Storefront Type */, 'size':'l'},
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
                                        <img src={this.props.app_state.theme['letter']} style={{height:50 ,width:'auto'}} />
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
                    <li style={{'padding': '5px 0px 0px 0px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                        {this.render_detail_item('2', { 'style':'s', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                    </li>
                ))}
            </div>
        )
    }

    render_buy_options(object){
        var background_color = this.props.theme['card_background_color']
        var items = [].concat(object['ipfs'].option_groups)
        if(items.length == 0){
            items = [1, 2, 3]
            return(
                <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                <div style={{height:47, width:97, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        return(
            <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_detail_item('3', {'title':item['id'], 'details':this.truncate(item['title'], 15), 'size':'s', 'padding':'5px 12px 5px 12px'})}
                        </li>
                    ))}
                </ul>
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

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1848']/* Amount */, 'number':item.amount, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.token_item['id']]})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1848']/* Amount */, 'subtitle':this.format_power_figure(item.amount), 'barwidth':this.calculate_bar_width(item.amount), 'number':this.format_account_balance_figure(item.amount), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.token_item['id']], })}
                </div>
                <div style={{height: 10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1849']/* 'Your Balance' */, 'number':this.format_account_balance_figure(item.token_item['balance']), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.token_item['id']]})}>
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
                <div style={{height: 20}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['952']/* 'Your Balance' */, 'number':item.token_item['balance'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.token_item['id']]})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['952']/* 'Your Balance' */, 'subtitle':this.format_power_figure(item.token_item['balance']), 'barwidth':this.calculate_bar_width(item.token_item['balance']), 'number':this.format_account_balance_figure(item.token_item['balance']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item.token_item['id']], })}
                </div>

                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['1855']/* 'Below are the individual transfer actions.' */, 'title':this.props.app_state.loc['1856']/* 'Transfer actions' */})}
                <div style={{height:10}}/>
                {this.render_stack_transactions()}
                <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '0px 20px 10px 20px'}}/>
                
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
                                        <img src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
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

                    {this.render_pdf_files_if_any()}
                    {this.render_zip_files_if_any()}
                    {this.render_markdown_if_any()}

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
                        <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '0px 20px 20px 20px'}}/>
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
        items = [].concat(items)
        if(items.length == 0){
            items = [0, 1]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '10px','padding':'0px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 20px 0px 0px'}}>
                                        <img src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
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
                    <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
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
                                        <img src={this.props.app_state.theme['letter']} style={{height:40 ,width:'auto'}} />
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
                                <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '5px 20px 5px 20px'}}/>
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
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':title, 'number':number, 'relativepower':this.props.app_state.loc['1880']/* 'units' */})}>
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
                                        <img src={this.props.app_state.theme['letter']} style={{height:40 ,width:'auto'}} />
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
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['token']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['token']]})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['token']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['token']], })}
                                </div>
                                <div style={{height:5}}/>
                                {this.render_detail_item('3', {'title':this.props.app_state.loc['1886']/* 'Receiver ID: ' */+item['receiver'], 'details':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['exchange']]+':'+item['exchange'], 'size':'s'})}
                                <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '5px 20px 5px 20px'}}/>
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
                <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '0px 20px 20px 20px'}}/>
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
                                        <img src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
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

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1889']/* 'Time Units' */, 'number':item.time_units, 'relativepower':this.get_time_units_time()})}>
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
                        <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item], 'number':buy_amounts[index], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                            {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item], 'subtitle':this.format_power_figure(this.calculate_final_amount(buy_amounts[index])), 'barwidth':this.calculate_bar_width(this.calculate_final_amount(buy_amounts[index])), 'number':this.format_account_balance_figure(this.calculate_final_amount(buy_amounts[index])), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
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

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1892']/* 'Time Units To Cancel' */, 'number':item.time_units, 'relativepower':this.get_time_units_time()})}>
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
                        <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item], 'number':buy_amounts[index], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                            {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item], 'subtitle':this.format_power_figure(this.calculate_collect_subscription_final_amount(buy_amounts[index])), 'barwidth':this.calculate_bar_width(this.calculate_collect_subscription_final_amount(buy_amounts[index])), 'number':this.format_account_balance_figure(this.calculate_collect_subscription_final_amount(buy_amounts[index])), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
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
                                        <img src={this.props.app_state.theme['letter']} style={{height:40 ,width:'auto'}} />
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
                                <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '5px 20px 5px 20px'}}/>
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
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':title, 'number':number, 'relativepower':this.props.app_state.loc['92']/* 'units' */})}>
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
                                        <img src={this.props.app_state.theme['letter']} style={{height:40 ,width:'auto'}} />
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
                                <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '5px 20px 5px 20px'}}/>
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
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':title, 'number':number, 'relativepower':this.props.app_state.loc['1904']/* 'units' */})}>
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
                                        <img src={this.props.app_state.theme['letter']} style={{height:40 ,width:'auto'}} />
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
                                <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '5px 20px 5px 20px'}}/>
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
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':title, 'number':number, 'relativepower':this.props.app_state.loc['92']/* 'units' */})}>
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
                                        <img src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
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
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['token']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['token']]})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['token']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['token']], })}
                                </div>
                                <div style={{height:5}}/>
                                {this.render_detail_item('3', {'title':this.props.app_state.loc['1910']/* 'Receiver ID: ' */+item['receiver'], 'details':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['exchange']]+':'+item['exchange'], 'size':'s'})}
                                <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '5px 20px 5px 20px'}}/>
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
                                        <img src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
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
                                        <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
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
                                        <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
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
                                        <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
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
                                        <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
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
                                            <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
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
                                            content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
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
        var size = item['size'] == null ? '15px' : item['size'];
        var font = item['font'] == null ? this.props.app_state.font : item['font']
        if(item.type == 'message'){
            return(
                <div style={{'padding': '7px 15px 10px 15px','margin':'0px 0px 0px 0px', 'background-color': this.props.theme['view_group_card_item_background'],'border-radius': '7px'}}>
                    <div className="row" style={{'padding':'0px 0px 0px 0px'}}>
                          <div className="col-9" style={{'padding': '0px 0px 0px 14px', 'height':'20px' }}> 
                            <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} >{this.get_message_name_title(item)}</p>
                          </div>
                          <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                            <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{this.get_time_difference(item['time'])}</p>
                          </div>
                    </div>
                    <p style={{'font-size': size,'color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': font,'text-decoration': 'none', 'white-space': 'pre-line'}}>{this.format_message(item['message'])}</p>
                </div>
            )
        }else{
            return(
                <div>
                    <div style={{'padding': '7px 15px 10px 15px','margin':'0px 0px 0px 0px', 'background-color': this.props.theme['view_group_card_item_background'],'border-radius': '7px'}}>
                        <div className="row" style={{'padding':'0px 0px 0px 0px'}}>
                            <div className="col-9" style={{'padding': '0px 0px 0px 14px', 'height':'20px' }}> 
                                <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} >{item['sender']}</p>
                            </div>
                            <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                                <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{this.get_time_difference(item['time'])}</p>
                            </div>
                        </div>
                        <p style={{'font-size': size,'color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': font,'text-decoration': 'none', 'white-space': 'pre-line'}}>{this.format_message(item['message'])}</p>

                        {this.render_markdown_in_message_if_any(item)}
                        {this.render_rating_if_valid(item)}
                        {this.render_detail_item('9',item['image-data'])}
                    </div>
                    {this.render_pdfs_if_any(item)}
                </div>
            )
        }
    }

    get_message_name_title(item){
        const bucket = this.props.app_state.alias_bucket[item['sender_e5']]
        var alias = (bucket[item['sender']] == null ? '' : `${item['sender']}, ${bucket[item['sender']]}`)
        return alias
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


    render_markdown_in_message_if_any(item){
        if(item['markdown'] != null && item['markdown'] != ''){
            return(
                <div>
                    <div style={{height:5}}/>
                    {this.render_detail_item('13', {'source':item['markdown']})}
                </div>
            )
        }
    }

    render_pdfs_if_any(item){
        if(item.type == 'image' && item['pdf-data'] != null && item['pdf-data'].length > 0){
            return(
                <div>
                    <div style={{height:5}}/>
                    {this.render_files_part(item['pdf-data'])}
                    <div style={{height:5}}/>
                </div>
            )
        }
    }

    render_files_part(items){
        if(items.length == 0) return;
        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_uploaded_comment_file(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_uploaded_comment_file(item, index){
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

    render_rating_if_valid(item){
        if(item['rating'] != null){
            return(
                <div>
                    {this.render_detail_item('15',{'rating': item['rating'], 'rating_total':item['rating_total']})}
                </div>
            )
        }
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
                                        <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
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
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
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

                {this.render_time_between_deliveries_if_enabled()}

                {this.render_bag_value()}
                {this.render_detail_item('0')}

                {this.render_all_items()}
                {/* <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '2px 20px 20px 20px'}}/> */}
            </div>
        )
    }

    render_time_between_deliveries_if_enabled(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        if(transaction_item.frequency_enabled == true){
            var time_in_days = Math.round(transaction_item.delivery_frequency_time / (60*60*24))
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.get_time_diff(transaction_item.delivery_frequency_time), 'details':this.props.app_state.loc['1058u']/* 'Estimated time between deliveries.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':time_in_days+this.props.app_state.loc['32']+(time_in_days > 1 ? 's':''), 'details':this.props.app_state.loc['1058v']/* 'Estimated time in Days.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    render_bag_value(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var items_to_deliver = [].concat(transaction_item.items_to_deliver)
        if(items_to_deliver.length != 0){
            var total_amounts = this.get_total_bag_value(items_to_deliver)

            if(total_amounts != null){
                console.log('view_transaction_page', total_amounts)
                return(
                    <div>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['2064a']/* 'Bag Value.' */, 'details':this.props.app_state.loc['2771']/* 'The value of all the items in your bag in their respective denominations.' */, 'size':'l'})}
                        <div style={{height: 10}}/>
                        {total_amounts.map((units, index) => (
                            <div style={{'padding': '2px 0px 2px 0px'}}>
                                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[transaction_item.e5+units['id']], 'number':units['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[units['id']]})}>
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
            var storefront = item.storefront_item
            var variant_in_store = this.get_variant_object_from_storefront(storefront, item['selected_variant']['variant_id'])
            

            if(variant_in_store == null) return null
            var price_items = variant_in_store['price_data']
            
            for(var i=0; i<price_items.length; i++){
                var units = price_items[i];
                var amount = this.get_amounts_to_be_paid2(units['amount'], item.purchase_unit_count)
                var token_id = units['id']

                if(obj[token_id] == null){
                    obj[token_id] = bigInt(0);
                }
                obj[token_id] = bigInt(obj[token_id]).add(amount)
            }

            if(storefront['ipfs'] != null && storefront['ipfs'].option_groups != null && storefront['ipfs'].option_groups.length > 0){
                var options = storefront['ipfs'].option_groups
                console.log('view_transaction_page', 'obj', item.purchase_option_tags_array)
                for(var i=0; i<item.purchase_option_tags_array.length; i++){
                    var tag_obj = item.purchase_option_tags_array[i]
                    var selected_items = []
                    for(var j=0; j<tag_obj['e'][2].length; j++){
                        var selected_item_pos = tag_obj['e'][2][j]
                        if(selected_item_pos != 0){
                            selected_items.push(selected_item_pos-1)
                        }
                    }
                    for(var k=0; k<selected_items.length; k++){
                        var selected_pos = selected_items[k]
                        var option_prices = options[i]['options'][selected_pos]['price']
                        option_prices.forEach(price => {
                            if(obj[price['id']] == null){
                                obj[price['id']] = bigInt(0)
                            }
                            obj[price['id']] = bigInt(obj[price['id']]).plus(price['amount'])
                        });
                    } 
                }
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
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
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
                <div style={{height: 6}}/>
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
                                    {this.render_detail_item('3', {'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+units['id']], 'details':this.format_account_balance_figure(this.get_amounts_to_be_paid2(units['amount'], item.purchase_unit_count)) +' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[units['id']], 'size':'s'})}
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

    get_amounts_to_be_paid2(amount, count){
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

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1949']/* 'Number of Units ordered in ' */+composition_type, 'number':transaction_item.purchase_unit_count, 'relativepower':composition_type})}>
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
                                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['id']], 'number':this.get_amounts_to_be_paid(item['amount'], transaction_item.purchase_unit_count), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
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
                                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                </div>
                            </li>
                        ))}
                    </ul>
                    
                    <div style={{height:10}}/>
                    {this.render_purchase_option_fees()}
                </div>
            )
        }
    }

    render_purchase_option_fees(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var object = transaction_item.storefront_item
        var e5 = this.props.app_state.selected_e5
        if(object['ipfs'] != null && object['ipfs'].option_groups != null && object['ipfs'].option_groups.length > 0){
            var items = this.get_final_purchase_option_fees(object['ipfs'].option_groups)
            return(
                <div style={{}}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1058m']/* 'Selected Option Fees.' */, 'details':this.props.app_state.loc['1058n']/* 'Below is the extra price for the selected options youve chosen.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px 0px 5px 0px'}}>
                                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item['id']], 'number':this.get_amounts_to_be_paid(item['amount'], transaction_item.purchase_unit_count), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item['id']], 'subtitle':this.format_power_figure(this.get_amounts_to_be_paid(item['amount'], transaction_item.purchase_unit_count)), 'barwidth':this.calculate_bar_width(this.get_amounts_to_be_paid(item['amount'], transaction_item.purchase_unit_count)), 'number':this.format_account_balance_figure(this.get_amounts_to_be_paid(item['amount'], transaction_item.purchase_unit_count)), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    get_final_purchase_option_fees(options){
        var price_obj = {}
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        for(var i=0; i<transaction_item.purchase_option_tags_array.length; i++){
            var tag_obj = transaction_item.purchase_option_tags_array[i]
            var selected_items = []
            for(var j=0; j<tag_obj['e'][2].length; j++){
                var selected_item_pos = tag_obj['e'][2][j]
                if(selected_item_pos != 0){
                    selected_items.push(selected_item_pos-1)
                }
            }
            for(var k=0; k<selected_items.length; k++){
                var selected_pos = selected_items[k]
                var option_prices = options[i]['options'][selected_pos]['price']
                option_prices.forEach(price => {
                    if(price_obj[price['id']] == null){
                        price_obj[price['id']] = bigInt(0)
                    }
                    price_obj[price['id']] = bigInt(price_obj[price['id']]).plus(price['amount'])
                });
            } 
        }

        var return_array = []
        for (const exchange in price_obj) {
            if (price_obj.hasOwnProperty(exchange)) {
                return_array.push({'id':exchange, 'amount':price_obj[exchange]})
            }
        }

        if(return_array.length == 0){
            return_array.push({'id':5, 'amount':bigInt(0)})
        }

        return return_array
    }

    get_amounts_to_be_paid(amount, purchase_unit_count){
        return bigInt(amount).multiply(bigInt(purchase_unit_count))
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
                                            content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
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
                <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px'}}/>
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
                    {this.render_job_location_info()}
                    {this.render_item_data(items)}
                    {this.render_contractor_price_amounts()}
                    {this.render_item_images()}
                    <div style={{height:10}}/>
                    {this.render_pdf_files_if_any()}
                    {this.render_zip_files_if_any()}
                    {this.render_markdown_if_any()}

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
                                            <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
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
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
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
                {this.render_job_location_info()}
                {this.render_image_part()}
                <div style={{height:10}}/>
                {this.render_pdf_files_if_any()}
                {this.render_zip_files_if_any()}
                {this.render_markdown_if_any()}

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
                                        <img src={this.props.app_state.theme['letter']} style={{height:40 ,width:'auto'}} />
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
                                        <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
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
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
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

    render_transfer_alias_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':transaction_item.alias, 'details':this.props.app_state.loc['3055ge']/* 'Tansfer Alias.' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':transaction_item.recipient, 'details':this.props.app_state.loc['3055gh']/* 'Transfer Recipient Account' */, 'size':'l'})}
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

                    {this.render_pdf_files_if_any()}
                    {this.render_zip_files_if_any()}
                    {this.render_markdown_if_any()}

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
                    {this.render_job_location_info()}
                    {this.render_item_data(items)}
                    {this.render_item_images()}
                    {this.render_selected_links()}

                    {this.render_pdf_files_if_any()}
                    {this.render_zip_files_if_any()}
                    {this.render_markdown_if_any()}

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

                    {this.render_pdf_files_if_any()}
                    {this.render_zip_files_if_any()}
                    {this.render_markdown_if_any()}

                    {this.render_detail_item('0')}
                    {this.render_job_location_info()}
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

                    {this.render_pdf_files_if_any()}
                    {this.render_zip_files_if_any()}
                    {this.render_markdown_if_any()}
                    
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
                        <div style={{height: 10}}/>
                        {this.render_detail_item('3', item['type'])}

                        {this.render_detail_item('0')}
                        {this.render_job_location_info()}
                        {this.render_item_data(items)}
                        {this.render_item_images()}
                        {this.render_selected_links()}
                        {this.render_buy_options(object)}

                        {this.render_pdf_files_if_any()}
                        {this.render_zip_files_if_any()}
                        {this.render_markdown_if_any()}

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

                    {this.render_pdf_files_if_any()}
                    {this.render_zip_files_if_any()}
                    {this.render_markdown_if_any()}
                    
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_edit_audiopost(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-150
        var object = this.format_post();
        var item = this.get_audio_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects
        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('7', item['banner-icon'])}
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['genre'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['year'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['author'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['copyright'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['comment'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['listing_type'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['purchase_recipient'])}
                    {this.render_detail_item('0')}



                    {this.render_item_data(items)}
                    {this.render_item_images()}

                    {this.render_pdf_files_if_any()}
                    {this.render_zip_files_if_any()}
                    {this.render_markdown_if_any()}

                    {this.render_song_tabs()}
                    {this.render_contractor_price_amounts()}

                    
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_edit_videopost(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-150
        var object = this.format_post();
        var item = this.get_video_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects
        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('7', item['banner-icon'])}
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    {this.render_detail_item('0')}

                    {this.render_item_data(items)}
                    {this.render_item_images()}

                    {this.render_pdf_files_if_any()}
                    {this.render_zip_files_if_any()}
                    {this.render_markdown_if_any()}

                    {this.render_video_tabs()}
                    {this.render_contractor_price_amounts()}

                    
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_edit_nitropost(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-150
        var object = this.format_post();
        var item = this.get_nitro_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects

        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('7', item['banner-icon'])}
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['node_url'])}
                    {this.render_detail_item('0')}

                    {this.render_item_data(items)}
                    {this.render_item_images()}

                    {this.render_pdf_files_if_any()}
                    {this.render_zip_files_if_any()}
                    {this.render_markdown_if_any()}
                    
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

    render_edit_poll(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-150
        var object = this.format_post();
        var item = this.get_poll_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects
        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 0px 20px 0px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{height: 10}}/>
                    {this.show_consensus_type_message(object)}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['winner_data'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['start_time'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['end_time'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['participants'])}
                    <div style={{height: 10}}/>
                    {this.render_vote_changing_message_if_enabled(object)}
                    {this.render_csv_files_if_any()}
                    {this.render_json_files_if_any()}
                    {this.poll_e5s()}
                    {this.render_detail_item('0')}

                    {this.render_item_data(items)}
                    {this.render_item_images()}

                    {this.render_pdf_files_if_any()}
                    {this.render_zip_files_if_any()}
                    {this.render_markdown_if_any()}
                    
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

                {this.render_detail_item('3', {'title':'x'+multiplier, 'details':this.props.app_state.loc['1974']/* 'Multiplier' */, 'size':'l'})}
                <div style={{height: 10}}/>


                {this.render_detail_item('3', {'title':this.props.app_state.loc['1975']/* 'message:' */, 'details':''+transaction_item.entered_message_text, 'size':'l'})}
                {this.render_detail_item('0')}

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1976']/* 'Total amount of spend' */, 'number':award_amount, 'relativepower':this.props.app_state.loc['3079']/* SPEND */})}>
                    {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['1976']/* 'Total amount of spend' */, 'subtitle':this.format_power_figure(award_amount), 'barwidth':this.calculate_bar_width(award_amount), 'number':this.format_account_balance_figure(award_amount), 'barcolor':'', 'relativepower':this.props.app_state.loc['3079']/* SPEND */, })}
                </div>
                <div style={{height: 10}}/>
                
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1977']/* 'Custom Amounts' */, 'details':this.props.app_state.loc['1978']/* 'Your included custom amounts for the award action' */, 'size':'l'})}
                <div style={{height: 10}}/>
                {this.render_set_prices_list_part2()}
                {this.render_detail_item('0')}
            </div>
        )
    }


    render_set_prices_list_part2(){
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
                                            <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
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
                            <li style={{'padding': '1px 1px 1px 1px'}}>
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
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








    render_stage_royalty_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var exchange_royalty_data = transaction_item.payout_data['exchange_royalty_data']
        var total_number_of_transactions = exchange_royalty_data['balance_data'].length
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'15px', 'text':transaction_item.payout_title})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2861']/* 'The aggregate of the total number of tokens being issued out as payouts.' */, 'title':this.props.app_state.loc['2860']/* 'Total Payout Amount.' */})}
                <div style={{height:10}}/>
                {this.render_payout_tokens()}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.get_time_diff(transaction_item.payout_start_timestamp - Date.now()/1000), 'details':this.props.app_state.loc['2880']/* Starting On:  */+(new Date(transaction_item.payout_start_timestamp*1000)), 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'size':'l', 'title':transaction_item.royalty_payout_account+' : '+this.get_account_alias(transaction_item.royalty_payout_account), 'details':this.props.app_state.loc['2855']/* 'Payout Account.' */})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
        
                    <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['2868']/* 'Total Payout Transactions.' */, 'number':total_number_of_transactions, 'relativepower':this.props.app_state.loc['2867']/* 'transactions.' */})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2868']/* 'Total Payout Transactions.' */, 'subtitle':this.format_power_figure(total_number_of_transactions), 'barwidth':this.calculate_bar_width(total_number_of_transactions), 'number':this.format_account_balance_figure(total_number_of_transactions), 'barcolor':'', 'relativepower':this.props.app_state.loc['2867']/* 'transactions.' */, })}
                    </div>
                    

                    <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['2874']/* 'transactions per batch' */, 'number':transaction_item.batch_size, 'relativepower':this.props.app_state.loc['2867']/* 'transactions' */})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2874']/* 'transactions per batch' */, 'subtitle':this.format_power_figure(transaction_item.batch_size), 'barwidth':this.calculate_bar_width(transaction_item.batch_size), 'number':this.format_account_balance_figure(transaction_item.batch_size), 'barcolor':'', 'relativepower':this.props.app_state.loc['2867']/* 'transactions' */, })}
                    </div>
                    

                    <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['2881']/* 'Total Batches.' */, 'number':this.get_number_of_payout_batches(), 'relativepower':this.props.app_state.loc['2882']/* 'batches' */})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2881']/* 'Total Batches.' */, 'subtitle':this.format_power_figure(this.get_number_of_payout_batches()), 'barwidth':this.calculate_bar_width(this.get_number_of_payout_batches()), 'number':this.format_account_balance_figure(this.get_number_of_payout_batches()), 'barcolor':'', 'relativepower':this.props.app_state.loc['2882']/* 'batches' */, })}
                    </div>

                </div>
            </div>
        )
    }

    render_payout_tokens(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var selected_object = transaction_item.token_item;
        var buy_tokens = [].concat(selected_object['data'][3])
        var buy_amounts = [].concat(selected_object['data'][4])
        return(
            <div>
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                        {buy_tokens.map((item, index) => (
                            <div style={{'padding': '1px'}}>
                                {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[selected_object['e5']+item], 'subtitle':this.format_power_figure(this.calculate_payout_amount(buy_amounts[index])), 'barwidth':this.calculate_bar_width(this.calculate_payout_amount(buy_amounts[index])), 'number':this.format_price(this.calculate_payout_amount(buy_amounts[index])), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    calculate_payout_amount(price){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index]
        return bigInt(price).multiply(transaction_item.payout_amount);
    }

    get_account_alias(account_id){
        return (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[account_id] == null ? (this.props.app_state.loc['2871']/* 'Alias Unknown.' */) : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[account_id])
    }

    get_number_of_payout_batches(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        return transaction_item.payout_data['batches'].length
    }

    format_price(price_value){
        return this.format_account_balance_figure(price_value)
        // if(price_value > 1000){
        //     return this.format_account_balance_figure(price_value)
        // }
        // else{
        //     let roundedNumber = parseFloat(price_value.toFixed(7));
        //     return roundedNumber
        // }
    }
 








    render_royaly_payout_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var staging_data = transaction_item.staging_data
        var total_number_of_transactions = this.get_total_number_of_payout_transactions(transaction_item)
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'15px', 'text':staging_data['payout_title']})}
                <div style={{height:10}}/>

                {this.render_staged_batches()}

                <div style={{height:20}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>

                    <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['2881']/* 'Total Batches.' */, 'number':this.get_number_of_royalty_payout_batches(), 'relativepower':this.props.app_state.loc['2882']/* 'batches' */})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2881']/* 'Total Batches.' */, 'subtitle':this.format_power_figure(this.get_number_of_royalty_payout_batches()), 'barwidth':this.calculate_bar_width(this.get_number_of_royalty_payout_batches()), 'number':this.format_account_balance_figure(this.get_number_of_royalty_payout_batches()), 'barcolor':'', 'relativepower':this.props.app_state.loc['2882']/* 'batches' */, })}
                        </div>

                    <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['2868']/* 'Total Payout Transactions.' */, 'number':total_number_of_transactions, 'relativepower':this.props.app_state.loc['2867']/* 'transactions.' */})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2868']/* 'Total Payout Transactions.' */, 'subtitle':this.format_power_figure(total_number_of_transactions), 'barwidth':this.calculate_bar_width(total_number_of_transactions), 'number':this.format_account_balance_figure(total_number_of_transactions), 'barcolor':'', 'relativepower':this.props.app_state.loc['2867']/* 'transactions.' */, })}
                    </div>

                </div>
            </div>
        )
    }

    render_staged_batches(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var background_color = this.props.theme['card_background_color']
        var staging_data = transaction_item.staging_data
        var batches = staging_data['batches']
        var items = this.get_selected_batch_data(batches, transaction_item)
        if(items.length == 0){
            items = [1, 2, 3]
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden', 'scrollbar-width': 'none'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                <div style={{height:47, width:97, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_detail_item('3', {'details':item['data'].length+this.props.app_state.loc['2872']/* ' transactions.' */, 'title':this.props.app_state.loc['2873']/* 'Batch: ' */+ item['id'], 'size':'s'})}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_selected_batch_data(batches, transaction_item){
        var selected = []
        batches.forEach(batch => {
            if(transaction_item.selected_batches.includes(batch)){
                selected.push(batch)
            }
        });
        return selected;
    }

    get_total_number_of_payout_transactions(transaction_item){
        var number = 0
        var batches = transaction_item.selected_batches
        batches.forEach(batch => {
            number = number + batch['data'].length
        });
        return number
    }

    get_number_of_royalty_payout_batches(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        return transaction_item.selected_batches.length
    }









    render_upcoming_subscription_payment_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var upcoming_subs = this.get_selected_subscriptions(transaction_item.upcoming_subs)
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'13px', 'text':upcoming_subs.length+ this.props.app_state.loc['2903']/* ' targeted subscriptions.' */})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.get_time_diff(transaction_item.time_amount), 'details':this.props.app_state.loc['2900']/* 'Your set time.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_total_payments()}
            </div>
        )
    }

    render_total_payments(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var data = this.get_total_payment_amounts()
        var exchanges_used = [].concat(data.exchanges_used)
        var exchange_amounts = data.exchange_amounts
        var e5 = transaction_item.e5

        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                    {exchanges_used.map((item, index) => (
                        <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'number':exchange_amounts[item], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                            {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'subtitle':this.format_power_figure(exchange_amounts[item]), 'barwidth':this.calculate_bar_width((exchange_amounts[item])), 'number':this.format_account_balance_figure((exchange_amounts[item])), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                        </li>
                    ))}
                </ul>
            </div>  
        )
    }

    get_total_payment_amounts(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var upcoming_subs = this.get_selected_subscriptions(transaction_item.upcoming_subs)
        var exchanges_used = []
        var exchange_amounts = {}
        upcoming_subs.forEach(subscription_obj => {
            var time_units_to_pay = this.get_time_unit(subscription_obj)
            if(time_units_to_pay != 0){
                var exchanges = subscription_obj['data'][2]
                var amounts = subscription_obj['data'][3]
                for(var i=0; i<exchanges.length; i++){
                    var exchange_id = exchanges[i]
                    var amount = bigInt(amounts[i]).multiply(time_units_to_pay)
                    if(exchange_amounts[exchange_id] == null){
                        exchange_amounts[exchange_id] = bigInt(0)
                        exchanges_used.push(exchange_id)
                    }
                    exchange_amounts[exchange_id] = bigInt(exchange_amounts[exchange_id]).plus(amount)
                }
            }
        });

        return {exchanges_used: exchanges_used, exchange_amounts: exchange_amounts}
    }

    get_time_unit(subscription_obj){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var subscription_config = subscription_obj['data'][1]
        var time_unit = subscription_config[5/* time_unit */] == 0 ? 60*53 : subscription_config[5/* time_unit */]
        var time_units_to_pay = bigInt(transaction_item.time_amount).divide(time_unit)
        if(subscription_config[1/* minimum_buy_amount */] != 0){
            if(time_units_to_pay < subscription_config[1/* minimum_buy_amount */]){
                time_units_to_pay = subscription_config[1/* minimum_buy_amount */]
            }
        }
        // if(subscription_config[3/* maximum_buy_amount */] != 0){
        //     if(time_units_to_pay > subscription_config[3/* maximum_buy_amount */]){
        //         time_units_to_pay = subscription_config[3/* maximum_buy_amount */]
        //     }
        // }
        var t =  time_units_to_pay
        return t
    }

    get_selected_subscriptions(upcoming_subs){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var selected_subs = []
        for(var i=0; i<upcoming_subs.length; i++){
            if(!transaction_item.selected_subscriptions.includes(i)){
                selected_subs.push(upcoming_subs[i])
            }
        }
        return selected_subs
    }







    render_buy_album_transaction_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var object = transaction_item.album
        var listing_type = object['ipfs'] == null ? 'Audiopost' :this.get_selected_item(object['ipfs'].get_listing_type_tags_option, 'e')
        var title = object['ipfs'] == null ? 'Audiopost ID' : object['ipfs'].entered_title_text
        var author = object['ipfs'] == null ? 'Audiopost' :object['ipfs'].entered_author_text
        var default_image = this.props.app_state.static_assets['music_label']
        var image = object['ipfs'] == null ? default_image :object['ipfs'].album_art
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'14px', 'text': this.props.app_state.loc['2971']/* 'The following songs will be added to your collection after the purchase.' */})}
                <div style={{height: 10}}/>
                {this.render_detail_item('8', {'title':listing_type+' • '+object['id']+' • '+author, 'details':title, 'size':'l', 'image':image, 'border_radius':'7px'})}
                {this.render_selected_song_tabs()}
                <div style={{height: 10}}/>
                {this.render_total_to_be_paid()}
            </div>
        )
    }

    render_selected_song_tabs(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = [].concat(transaction_item.selected_tracks)

        if(items.length == 0){
            items = [1, 2, 3]
            return(
                <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                <div style={{height:47, width:97, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        return(
            <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_tab_item2(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_tab_item2(item, index){
        return(
            <div>
                {this.render_detail_item('3', {'title':item['song_id'], 'details':this.truncate(item['song_title'], 15), 'size':'s', 'padding':'5px 12px 5px 12px'})}
            </div>
        )
    }

    render_total_to_be_paid(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2967']/* 'Total Purchase amounts.' */, 'details':this.props.app_state.loc['2968']/* 'Here\'s the toal amount of money you\'ll be paying for the tracks.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                {this.render_total_payments2()}
            </div>
        )
    }

    render_total_payments2(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var data = transaction_item.data
        var exchanges_used = [].concat(data.exchanges_used)
        var exchange_amounts = data.exchange_amounts
        var e5 = transaction_item.e5

        if(exchanges_used.length == 0  || transaction_item.ignore_transfers == true){
            return(
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                    {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+5], 'subtitle':this.format_power_figure(0), 'barwidth':this.calculate_bar_width((0)), 'number':this.format_account_balance_figure((0)), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[5]})}
                </div>
            )
        }

        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                    {exchanges_used.map((item, index) => (
                        <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'number':exchange_amounts[item], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                            {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'subtitle':this.format_power_figure(exchange_amounts[item]), 'barwidth':this.calculate_bar_width((exchange_amounts[item])), 'number':this.format_account_balance_figure((exchange_amounts[item])), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                        </li>
                    ))}
                </ul>
            </div>  
        )
    }












    render_buy_video_transaction_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var object = transaction_item.videopost
        var listing_type = object['ipfs'] == null ? 'Videopost' :this.get_selected_item(object['ipfs'].get_listing_type_tags_option, 'e')
        var title = object['ipfs'] == null ? 'Videopost ID' : object['ipfs'].entered_title_text
        var author = object['ipfs'] == null ? 'Videopost' : this.get_senders_name(object['event'].returnValues.p5, object)
        var default_image = this.props.app_state.static_assets['video_label']
        var image = object['ipfs'] == null ? default_image :object['ipfs'].album_art
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'14px', 'text': this.props.app_state.loc['2971']/* 'The following songs will be added to your collection after the purchase.' */})}
                <div style={{height: 10}}/>
                {this.render_detail_item('8', {'title':listing_type+' • '+object['id']+' • '+author, 'details':title, 'size':'l', 'image':image, 'border_radius':'7px'})}
                {this.render_selected_video_tabs()}
                <div style={{height: 10}}/>
                {this.render_total_to_be_paid2()}
            </div>
        )
    }

    get_senders_name(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            if(this.is_post_anonymous(object)) return this.props.app_state.loc['311m']/* 'Hidden' */
            return alias
        }
    }

    is_post_anonymous(object){
        var is_anonymous = false;
        if(object['ipfs'].get_post_anonymously_tags_option != null){
            var option = this.get_selected_item2(object['ipfs'].get_post_anonymously_tags_option, 'e')
            if(option == 1){
                is_anonymous = true
            }
        }
        return is_anonymous
    }

    get_selected_item2(object, option){
        return object[option][2][0]
    }

    render_selected_video_tabs(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = [].concat(transaction_item.selected_videos)

        if(items.length == 0){
            items = [1, 2, 3]
            return(
                <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                <div style={{height:47, width:97, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        return(
            <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_tab_item3(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_tab_item3(item, index){
        return(
            <div>
                {this.render_detail_item('3', {'title':item['video_id'], 'details':this.truncate(item['video_title'], 15), 'size':'s', 'padding':'5px 12px 5px 12px'})}
            </div>
        )
    }

    render_total_to_be_paid2(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2967']/* 'Total Purchase amounts.' */, 'details':this.props.app_state.loc['a2962j']/* 'Here\'s the toal amount of money you\'ll be paying for the videos.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                {this.render_total_payments3()}
            </div>
        )
    }

    render_total_payments3(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var data = transaction_item.data
        var exchanges_used = [].concat(data.exchanges_used)
        var exchange_amounts = data.exchange_amounts
        var e5 = transaction_item.e5

        if(exchanges_used.length == 0 || transaction_item.ignore_transfers == true){
            return(
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                    {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+5], 'subtitle':this.format_power_figure(0), 'barwidth':this.calculate_bar_width((0)), 'number':this.format_account_balance_figure((0)), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[5]})}
                </div>
            )
        }

        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                    {exchanges_used.map((item, index) => (
                        <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'number':exchange_amounts[item], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                            {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'subtitle':this.format_power_figure(exchange_amounts[item]), 'barwidth':this.calculate_bar_width((exchange_amounts[item])), 'number':this.format_account_balance_figure((exchange_amounts[item])), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                        </li>
                    ))}
                </ul>
            </div>  
        )
    }







    render_buy_storage_transaction_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['3035']/* 'Selected Space.' */, 'subtitle':this.format_power_figure(transaction_item.amount), 'barwidth':this.get_number_width(transaction_item.amount), 'number':`${this.format_account_balance_figure(transaction_item.amount)}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['c2527p']/* Mbs */, })}
                </div>
                <div style={{height:20}}/>
                {this.render_payment_amounts()}
            </div>
        )
    }

    render_payment_amounts(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index]
        var object = transaction_item.nitro_object
        var node_details = this.props.app_state.nitro_node_details[object['e5_id']]
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['3037']/* 'Final Fees.' */, 'details':this.props.app_state.loc['3038']/* 'The final price of the storage amounts you wish to purchase is shown.' */})}
                <div style={{height:10}}/>

                {this.render_buy_storage_price_amounts(transaction_item.amounts_to_transfer, node_details['target_account_e5'])}
            </div>
        )
    }

    render_buy_storage_price_amounts(price_data, e5){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        var items = [].concat(price_data)
        return(
            <div style={{}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '3px 0px 3px 0px'}}>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item['exchange']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['exchange']]})}>
                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item['exchange']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['exchange']], })}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }










    render_itransfer_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['3068ai']/* 'iTransfer Identifier' */, 'title':''+transaction_item.identifier, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['3068al']/* 'Recipient Account.' */, 'title':''+transaction_item.recipient+','+this.get_senders_name2(transaction_item.recipient), 'size':'l'})}

                {this.render_detail_item('0')}
                
                
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3068ak']/* 'Amounts' */, 'details':this.props.app_state.loc['3068aj']/* 'All the amounts for the iTransfer action.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                {this.render_set_prices_list_part()}
                {this.render_detail_item('0')}
            </div>
        )
    }

    get_senders_name2(sender){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        var e5 = this.props.app_state.selected_e5
        if(sender == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* You. */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? '' : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    render_bill_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var recurring_enabled = transaction_item.recurring_enabled == true ? this.props.app_state.loc['3068bb']/* 'Recurring' */: this.props.app_state.loc['3068bc']/* 'one-time' */
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['3068ao']/* 'Bill Identifier.' */, 'title':''+transaction_item.identifier, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['3068am']/* 'Request Target.' */, 'title':''+transaction_item.recipient+','+this.get_senders_name2(transaction_item.recipient), 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['3068au']/* 'Payment Target' */, 'title':''+transaction_item.transfer_recipient+','+this.get_senders_name2(transaction_item.transfer_recipient), 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['3068bd']/* 'Bill Type' */, 'title':recurring_enabled, 'size':'l'})}
                

                {this.render_detail_item('0')}
                
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3068ak']/* 'Amounts' */, 'details':this.props.app_state.loc['3068an']/* 'All the amounts for the bill youre sending.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                {this.render_set_prices_list_part()}
                {this.render_detail_item('0')}
            </div>
        )
    }

    render_pay_bill_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['3071m']/* 'Bill Identifier.' */, 'title':''+transaction_item.identifier, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['3068al']/* 'Recipient Account.' */, 'title':''+transaction_item.recipient+','+this.get_senders_name2(transaction_item.recipient), 'size':'l'})}

                {this.render_pdf_files_if_any()}

                {this.render_detail_item('0')}
                
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3068ak']/* 'Amounts' */, 'details':this.props.app_state.loc['3071n']/* 'All the amounts for the bill payment action.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                {this.render_set_prices_list_part()}
                {this.render_detail_item('0')}
            </div>
        )
    }






    render_vote_poll(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>
                {this.render_voting_account()}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3073m']/* 'Vote Order.' */, 'details':this.props.app_state.loc['3073n']/* 'Your preferred ordering of the candidates in the poll.' */, 'size':'l'})}
                {this.render_added_candidates()}
            </div>
        )
    }

    render_voting_account(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var e5 = transaction_item.e5
        var account_id = this.props.app_state.user_account_id[e5]
        var associated_alias = this.get_senders_name3(account_id, e5)
        if(account_id == null || account_id == 1){
            account_id = ('0x00')
        }
        var image = this.props.app_state.e5s[e5].e5_img
        var details = this.props.app_state.loc['3073l']/* 'Voting Account.' */
        var title = account_id
        if(associated_alias != ''){
            title = title+','+associated_alias
        }
        return(
            <div>
                {this.render_detail_item('3', {'title':' • '+title, 'details':details, 'size':'l', 'title_image':image, 'border_radius':'0%'})}
            </div>
        )
    }

    get_senders_name3(sender, e5){
        var obj = this.props.app_state.alias_bucket[e5]
        var alias = (obj[sender] == null ? '' : obj[sender])
        return alias
    }

    render_added_candidates(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index]
        var items = [].concat(transaction_item.candidate_preference)
        return(
            <div style={{}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.reverse().map((item, index) => (
                        <div style={{'padding': '3px'}} >
                            {this.render_candidate_choice(item, index)}
                        </div>
                    ))}
                </ul>
            </div>
        )
    }

    render_candidate_choice(candidate, index){
        return(
            <div>
                {this.render_detail_item('4', {'text':(index+1)+'. '+candidate['name'], 'textsize':'13px', 'font':this.props.app_state.font})}
            </div>
        )
    }







    render_poll_result(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var key = Object.keys(transaction_item.results_object)[0]
        var results_object = transaction_item.results_object[key]
        var time = results_object.time
        var registered_voters = results_object.registered_voters
        var valid_vote_count = results_object.valid_vote_count
        var consensus_snapshots = results_object.consensus_snapshots
        var current_winners = results_object.current_winners
        var tie_breaker = results_object.tie_breaker
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3074t']/* 'Poll Results' */, 'details':this.props.app_state.loc['3074u']/* 'As of $' */.replace('$', (''+(new Date(time)))), 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_voter_count_message(registered_voters)}
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3074x']/* Valid Votes Counted. */, 'subtitle':this.format_power_figure(valid_vote_count), 'barwidth':this.calculate_bar_width(valid_vote_count), 'number':this.format_account_balance_figure(valid_vote_count), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['3074y']/* 'votes' */, })}
                    {this.render_turnout_message(registered_voters, valid_vote_count)}
                </div>
                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3074bb']/* '$ consensus cycles' */.replace('$', consensus_snapshots.length), 'details':this.props.app_state.loc['3074bc']/* '$ runoffs.' */.replace('$', (''+(consensus_snapshots.length - 1))), 'size':'l'})}

                {this.render_final_winners_if_voting_period_over(current_winners, transaction_item.poll_object, time, tie_breaker)}
                <div style={{height:10}}/>
                {this.render_empty_views(2)}
            </div>
        )
    }

    render_voter_count_message(registered_voters){
        if(registered_voters != 0){
            return(
                <div>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3074v']/* Number of Registered Voters. */, 'subtitle':this.format_power_figure(registered_voters), 'barwidth':this.calculate_bar_width(registered_voters), 'number':this.format_account_balance_figure(registered_voters), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['3074w']/* 'voters' */, })}
                    </div>
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    render_turnout_message(registered_voters, vote_count){
        if(registered_voters == 0) return;
        var percentage = vote_count > 0 ? this.round_off((vote_count / registered_voters) * 100) : 0
        if(percentage >= 100){
            percentage = 99.99
        }
        return(
            <div>
                {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3074bf']/* Turnout Proprtion. */, 'subtitle':this.format_power_figure(percentage), 'barwidth':percentage+'%', 'number':percentage+'%', 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1881']/* 'proportion' */, })}
            </div>
        )
    }

    render_final_winners_if_voting_period_over(current_winners, poll_object, time, tie_breaker){
        var now = time
        if(now/1000 < poll_object['ipfs'].end_time){
            return;
        }
        var items = tie_breaker != '' ? [tie_breaker] : current_winners
        var candidate_index = {}
        poll_object['ipfs'].candidates.forEach(candidate => {
            candidate_index[candidate['id']] = candidate['name']
        });
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3074bk']/* 'Current Winners.' */, 'details':this.props.app_state.loc['3074bl']/* 'Below are the current and final winners of the poll.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_detail_item('4', {'text':candidate_index[item], 'textsize':'15px', 'font':this.props.app_state.font})}
                            </li>
                        ))}
                    </ul>
                </div>
                {this.render_tie_breaker_message(tie_breaker)}
            </div>
        )
    }

    render_tie_breaker_message(tie_breaker){
        if(tie_breaker != ''){
            return(
                <div>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['3074bv']/* 'There was a tie, so the randomizer was used to pick the winner.' */, 'textsize':'11px', 'font':this.props.app_state.font})}
                </div>
            )
        }
    }












    render_stage_creator_payout_info(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var subscriptions = transaction_item.channel_obj['ipfs'].selected_creator_group_subscriptions
        const payout_information = transaction_item.payout_information
        const start_time = payout_information.start_time
        const end_time = payout_information.end_time
        const total_data_bytes_streamed = payout_information.total_data_bytes_streamed
        
        const total_payment_data_for_subscriptions = payout_information.total_payment_data_for_subscriptions

        const formatted_size = this.format_data_size(total_data_bytes_streamed)
        const fs = formatted_size['size']+' '+formatted_size['unit']
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1979m']/* 'Creator Payout.' */, 'details':this.props.app_state.loc['1979n']/* 'Below is the details for the stacked creator payout info to be staged.' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_channel_object()}
                <div style={{height:10}}/>

                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'13px', 'text':this.props.app_state.loc['3075g']/* '$ subscriptions used.' */.replace('$', subscriptions.length)})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2874']/* 'transactions per batch' */, 'number':transaction_item.batch_size, 'relativepower':this.props.app_state.loc['2867']/* 'transactions' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2874']/* 'transactions per batch' */, 'subtitle':this.format_power_figure(transaction_item.batch_size), 'barwidth':this.calculate_bar_width(transaction_item.batch_size), 'number':this.format_account_balance_figure(transaction_item.batch_size), 'barcolor':'', 'relativepower':this.props.app_state.loc['2867']/* 'transactions' */, })}
                </div>
                {this.render_detail_item('0')}
                
                {this.render_detail_item('3', {'details':this.props.app_state.loc['3075j']/* 'Starting Time.' */, 'title':''+(new Date(start_time)), 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['3075k']/* 'Ending Time.' */, 'title':''+(new Date(end_time)), 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['3075l']/* 'Total Data Streamed.' */, 'title':fs, 'size':'l'})}
                {this.render_detail_item('0')}

                {this.render_total_payment_data_for_subscriptions_data(total_payment_data_for_subscriptions)}
            </div>
        )
    }

    render_channel_object(){
        var object = this.state.channel_obj
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_channel_item(object)
        return(
            <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
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
        )
    }

    format_channel_item(object){
        var tags = object['ipfs'] == null ? ['Post'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(object['ipfs'].selected_device_city != null && object['ipfs'].selected_device_city != ''){
            tags = [object['ipfs'].selected_device_city].concat(tags)
        }
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        var extra = ''
        if(object['ipfs']['blocked_data'] != null){
            extra = extra+'🗝️'
        }
        
        if(extra != ''){
            extra = extra+' '
        }
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name4(object['event'].returnValues.p5, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id']+sender, 'details':extra+title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },
            'min':{'details':object['e5']+' • '+object['id']+sender, 'title':extra+title, 'size':'l', 'border_radius':'0%'}
        }
    }

    get_senders_name4(sender, object){
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return ' • '+this.props.app_state.loc['1694']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? '' : ' • '+this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }


    render_total_payment_data_for_subscriptions_data(total_payment_data_for_subscriptions){
        return(
            <div>
                {this.render_detail_item('3', {'details':this.props.app_state.loc['3075m']/* 'Subscription Payout Amounts.' */, 'title':this.props.app_state.loc['3075n']/* 'The total amount of tokens collected from each subscription is shown below.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_subscriptions2()}
                <div style={{height:10}}/>
                {this.render_total_subscription_payment_data_for_specific_subscription(total_payment_data_for_subscriptions)}
            </div>
        )
    }

    render_subscriptions2(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var items = transaction_item.channel_obj['ipfs'].selected_creator_group_subscriptions
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_used_subscription_clicked(item)}>
                            {this.render_subscription_item2(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    when_used_subscription_clicked(item){
        if(item == this.state.selected_subscription_item){
            this.setState({selected_subscription_item: null})
        }else{
            this.setState({selected_subscription_item: item})
        }
    }

    render_subscription_item2(item, pos){
        var e5 = 'E'+item.split('E')[1]
        var id = item.split('E')[0]
        var subscription_item = this.props.app_state.created_subscription_object_mapping[e5][id]
        var e5_id = subscription_item['e5_id']
        var details = this.truncate(subscription_item['ipfs'].entered_title_text, 17)
        if(this.state.selected_subscription_item == e5_id || (pos == 0 && this.state.selected_subscription_item == null)){
            return(
                <div>
                    {this.render_detail_item('3', {'title':' • '+id, 'details':details, 'size':'l', 'title_image':this.props.app_state.e5s[e5].e5_img})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }
        return(
            <div>
                {this.render_detail_item('3', {'title':' • '+id, 'details':details, 'size':'l', 'title_image':this.props.app_state.e5s[e5].e5_img})}
            </div>
        )
    }

    render_total_subscription_payment_data_for_specific_subscription(total_payment_data_for_subscriptions){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        const default_subscription = transaction_item.channel_obj['ipfs'].selected_creator_group_subscriptions[0]
        const selected_subscription_e5_id = this.state.selected_subscription_item == null ? default_subscription : this.state.selected_subscription_item
        const specific_subscription_data = total_payment_data_for_subscriptions[selected_subscription_e5_id]
        if(specific_subscription_data == null || Object.keys(specific_subscription_data).length == 0){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }
        const e5 = 'E'+selected_subscription_e5_id.split('E')[1]
        const focused_exchanges = Object.keys(specific_subscription_data)
        return(
            <div>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    {focused_exchanges.map((item, index) => (
                        <div onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'number':specific_subscription_data[item], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'subtitle':this.format_power_figure(specific_subscription_data[item]), 'barwidth':this.calculate_bar_width(specific_subscription_data[item]), 'number':this.format_account_balance_figure(specific_subscription_data[item]), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item], })}
                        </div>
                    ))}
                </div>
            </div>
        )
    }











    render_creator_payout_info(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1979m']/* 'Creator Payout.' */, 'details':this.props.app_state.loc['1979o']/* 'Below are the all the transfers set to be made for the stacked creator payout.' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_total_batch_transfers_and_my_balances(transaction_item.e5, transaction_item.payout_transfers_array, transaction_item.id)}

            </div>
        )
    }

    render_total_batch_transfers_and_my_balances(e5, transfer_data, selected_batch_id){
        if(selected_batch_id != null){
            const total_transfer_obj = {}
            transfer_data.forEach(transfer_object => {
                if(total_transfer_obj[transfer_object['exchange']] == null){
                    total_transfer_obj[transfer_object['exchange']] = bigInt(0)
                }
                total_transfer_obj[transfer_object['exchange']] = bigInt(total_transfer_obj[transfer_object['exchange']]).plus(bigInt(transfer_object['amount']))
            });

            const exchanges_used = Object.keys(total_transfer_obj)
            const my_balances = {}
            exchanges_used.forEach(exchange_id => {
                my_balances[exchange_id] = this.props.calculate_actual_balance(e5, exchange_id)
            });
            if(exchanges_used.length == 0){
                return(
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                        {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+5], 'subtitle':this.format_power_figure(0), 'barwidth':this.calculate_bar_width((0)), 'number':this.format_account_balance_figure((0)), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[5]})}
                    </div>
                )
            }
            return(
                <div>
                    {this.render_detail_item('4', {'text':this.props.app_state.loc['3055ct']/* 'The total amounts to be tranferred.' */, 'textsize':'13px', 'font':this.props.app_state.font})}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                            {exchanges_used.map((item, index) => (
                                <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'number':total_transfer_obj[item], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                                    {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'subtitle':this.format_power_figure(total_transfer_obj[item]), 'barwidth':this.calculate_bar_width((total_transfer_obj[item])), 'number':this.format_account_balance_figure((total_transfer_obj[item])), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                                </li>
                            ))}
                        </ul>
                    </div> 
                    <div style={{height: 10}}/>
                    {this.render_detail_item('4', {'text':this.props.app_state.loc['3055cu']/* 'Your balances for the exchanges used.' */, 'textsize':'13px', 'font':this.props.app_state.font})}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                            {exchanges_used.map((item, index) => (
                                <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'number':my_balances[item], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                                    {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'subtitle':this.format_power_figure(my_balances[item]), 'barwidth':this.calculate_bar_width((my_balances[item])), 'number':this.format_account_balance_figure((my_balances[item])), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                                </li>
                            ))}
                        </ul>
                    </div> 
                    <div style={{height: 10}}/>
                </div> 
            )
        }
    }








    render_nitro_renewal_info(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        const price_data_object = transaction_item.price_data_object;
        const files_to_renew = transaction_item.files_to_renew;
        const ignored_nitros = transaction_item.ignored_nitros;
        const total_payments_with_recepients = transaction_item.total_payments_with_recepients
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['1979q']/* 'Below is the total amount of money youll be paying for renewing your files in your selected nitro nodes.' */, 'title':this.props.app_state.loc['1979p']/* 'File Renewal Payments.' */})}
                <div style={{height:10}}/>

                {this.render_nitro_items(files_to_renew, ignored_nitros, total_payments_with_recepients)}
                <div style={{height:10}}/>

                {this.render_total_payment_amounts_for_all_the_selected_nitros(price_data_object[this.props.app_state.selected_e5])}
            </div>
        )
    }

    render_nitro_items(files_to_be_renewed_data, ignored_nitros, total_payments_with_recepients){
        var unfiltered_items = Object.keys(files_to_be_renewed_data)
        var nitros_for_specific_e5 = Object.keys(total_payments_with_recepients)
        var items = []
        unfiltered_items.forEach(nitro_e5_id => {
            if(!ignored_nitros.includes(nitro_e5_id) && nitros_for_specific_e5.includes(nitro_e5_id)){
                items.push(nitro_e5_id)
            }
        });
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.reverse().map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_nitro_files_item(item, files_to_be_renewed_data[item], items.length)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_nitro_files_item(item, renew_data, nitro_count){
        var nitro_id = item.split('E')[0]
        var nitro_e5 = 'E'+item.split('E')[1]

        var size_count = 0
        renew_data.forEach(file_data => {
            size_count += file_data['binary_size']
            if(file_data['streaming_multiplier'] != null){
                size_count += file_data['streaming_multiplier']
            }
        });

        var object = this.props.app_state.created_nitro_mappings[nitro_e5] == null ? null : this.props.app_state.created_nitro_mappings[nitro_e5][nitro_id]

        if(object != null){
            var default_image = this.props.app_state.static_assets['empty_image']
            var image = object['ipfs'] == null ? default_image : (object['ipfs'].album_art == null ? default_image : object['ipfs'].album_art)
            var formatted_size = this.format_data_size(size_count)
            var fs = formatted_size['size']+' '+formatted_size['unit']
            var title = this.props.app_state.loc['3055da']/* '$ consumed.' */.replace('$', fs)
            var details = this.props.app_state.loc['3055db']/* '$ files.' */.replace('$', number_with_commas(renew_data.length))

            var opacity = this.state.ignored_nitro_files_items.includes(item) ? 0.6 : 1.0
            return(
                <div style={{'opacity': opacity}} onClick={() => this.when_nitro_file_item_clicked(item, nitro_count)}>
                    {this.render_detail_item('14', {'title':title, 'image':image, 'details':details, 'size':'s', 'img_size':30})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_empty_horizontal_list_item2()}
                </div>
            )
        }
    }

    render_total_payment_amounts_for_all_the_selected_nitros(price_data_object){
        const total_price_amounts = price_data_object.total_price_amounts
        const items = Object.keys(total_price_amounts)
        const e5 = this.props.app_state.selected_e5
        return(
            <div style={{}}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style-type': 'none'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '3px 0px 3px 0px'}}>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'number':this.get_amount(total_price_amounts[item]), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'subtitle':this.format_power_figure(this.get_amount(total_price_amounts[item])), 'barwidth':this.calculate_bar_width(this.get_amount(total_price_amounts[item])), 'number':this.format_account_balance_figure(this.get_amount(total_price_amounts[item])), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item], })}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }











    render_auction_bid_info(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var storefront_object = transaction_item.storefront_item
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}

                <div style={{height: 10}}/>
                {this.render_storefront_item(storefront_object)}

                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3076n']/* 'Item Variant.' */, 'details':this.props.app_state.loc['3076m']/* 'The item youre bidding for in this auction.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_selected_variant2(transaction_item.selected_variant)}

                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3076f']/* 'Set Bid Amounts.' */, 'details':this.props.app_state.loc['3076g']/* The amount youve currently set for your next bid in their respective denominations. */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_set_bid_prices_list_part(transaction_item.payment_data)}

                {this.render_entry_fees(storefront_object, transaction_item.has_cast_bid)}
                {this.render_detail_item('0')}
            </div>
        )
    }

    render_entry_fees(storefront_item, has_sender_already_cast_bid){
        const entry_fees = storefront_item['ipfs'].price_data2
        var items = [].concat(entry_fees)
        if(items.length == 0 && !has_sender_already_cast_bid) return;
        const e5 = storefront_item['e5']
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3076h']/* 'Auction Entry Fee' */, 'details':this.props.app_state.loc['3076i']/* The fee set by the auctioneer to participate in the auction. */, 'size':'l'})}
                <div style={{height:10}}/>
                {items.map((item, index) => (
                    <div style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']],})}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    render_selected_variant2(item){
        return(
            <div>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 10px 5px','border-radius': '13px' }}>
                    {this.render_detail_item('4', {'text':item['variant_description'], 'textsize':'13px', 'font':this.props.app_state.font})}
                    <div style={{height:3}}/>
                    <div style={{padding:'0px 0px 0px 10px'}}>
                        {this.render_detail_item('9', item['image_data']['data'])}
                    </div>
                    <div style={{height:5}}/>
                    {this.render_detail_item('3', {'title':this.format_account_balance_figure(item['available_unit_count']), 'details':this.props.app_state.loc['1950']/* 'Number of Units' */, 'size':'l'})}
                </div>
            </div>
        )
    }

    render_storefront_item(object){
        const item = this.format_storefront_item(object)
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']

        return(
            <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
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
        )
    }

    format_storefront_item(object){
        var tags = object['ipfs'] == null ? ['Storefront'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(object['ipfs'].selected_device_city != null && object['ipfs'].selected_device_city != ''){
            tags = [object['ipfs'].selected_device_city].concat(tags)
        }
        var title = object['ipfs'] == null ? 'Storefront ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id']+' • '+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    render_set_bid_prices_list_part(items){
        var e5 = this.props.app_state.stack_items[this.state.transaction_index].e5
        return(
            <div>
                {items.map((item, index) => (
                    <div style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']],})}
                        </div>
                    </div>
                ))}
            </div>
        )
    }







    render_auction_bid_fulfilment_info(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var storefront_object = transaction_item.storefront_item
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}

                <div style={{height: 10}}/>
                {this.render_storefront_item(storefront_object)}

                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1948']/* 'Shipping Details' */, 'details':transaction_item.fulfilment_location, 'size':'l'})}
                

                <div style={{height: 10}}/>
                {this.render_item_variants()}

                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3077d']/* 'Final Payment.' */, 'details':this.props.app_state.loc['3077c']/* 'Below is the total amount you are to pay. The transaction is a direct purchase transaction.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_final_payment_amounts()}
                {this.render_detail_item('0')}
            </div>
        )
    }

    render_item_variants(){
        var items = [].concat(this.get_my_variants())
        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_variant_item_if_selected(item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_my_variants(){
        const transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        const storefront_object = transaction_item.storefront_item
        const variants = storefront_object['ipfs'].variants
        const winning_bids = transaction_item.winning_bids
        const variant_ids = []
        winning_bids.forEach(bid => {
            variant_ids.push(bid['ipfs']['variant'])
        });

        const valid_variants = variants.filter(function (variant) {
            return (variant_ids.includes(variant['variant_id']))
        })

        return valid_variants
    }

    render_variant_item_if_selected(item){
        var composition_type = this.get_composition_type()
        return(
            <div>
                {this.render_item(item, composition_type)}
            </div>
        )
    }

    render_item(variant_in_store, composition_type){
        if(variant_in_store['image_data']['data'] != null && variant_in_store['image_data']['data']['images'] != null && variant_in_store['image_data']['data']['images'].length > 0){
            var image = variant_in_store['image_data']['data']['images'][0]
            return(
                <div>
                    {this.render_detail_item('8',{'title':this.format_account_balance_figure(variant_in_store['available_unit_count'])+' '+composition_type, 'details':this.truncate(variant_in_store['variant_description'], 15),'size':'s', 'image':image, 'border_radius':'4px', 'image_width':'auto'})}
                </div>
            )
        }else{
            var image = this.props.app_state.static_assets['empty_image']
            return(
                <div>
                    {this.render_detail_item('8',{'title':this.format_account_balance_figure(variant_in_store['available_unit_count'])+' '+composition_type, 'details':this.truncate(variant_in_store['variant_description'], 15),'size':'s', 'image':image, 'border_radius':'4px', 'image_width':'auto'})}
                </div>
            )
        }
    }

    render_final_payment_amounts(){
        const items = this.get_total_payment_amounts()
        const e5 = this.props.app_state.stack_items[this.state.transaction_index].e5
        return(
            <div>
                {items.map((item, index) => (
                    <div style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']],})}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    get_total_payment_amounts(){
        const transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        const winning_bids = transaction_item.winning_bids
        const payment_object = {}

        winning_bids.forEach(bid => {
            const bid_payments = bid['ipfs']['bid_data']
            bid_payments.forEach(payment_item => {
                const exchange = payment_item['id']
                const amount = payment_item['amount']
                if(payment_object[exchange] == null){
                    payment_object[exchange] = bigInt(0)
                }
                payment_object[exchange] = bigInt(payment_object[exchange]).plus(bigInt(amount))
            });
        });

        const data = []
        Object.keys(payment_object).forEach(exchange => {
            data.push({'id':exchange, 'amount':payment_object[exchange]})
        });

        return data
    }
    













    render_vote_all_proposals_info(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var collect_bounties = transaction_item.collect_bounties == true ? this.props.app_state.loc['3055fm']/* Enabled */ : this.props.app_state.loc['3055fn']/* Disabled */
        var vote = this.get_selected_item(transaction_item.new_vote_tags_object, 'e')
        const items = transaction_item.proposal_items
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['1979t']/* 'Bundle Size.' */, 'subtitle':'e0', 'barwidth':this.get_number_width(transaction_item.proposal_items.length), 'number':`${number_with_commas(transaction_item.proposal_items.length)}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['3055fe']/* 'transactions' */, })}
                </div>
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':collect_bounties, 'details':this.props.app_state.loc['3055fl']/* 'Collect End and Spend Bounties.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':vote, 'details':this.props.app_state.loc['3055fo']/* 'Your Vote.' */, 'size':'l'})}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055ey']/* 'Active Proposals.' */, 'details':this.props.app_state.loc['3055fp']/* 'Your vote will apply to the following proposals.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                {items.map((item, index) => (
                    <div>
                        {this.render_proposal_object(item, index)}
                    </div>
                ))}
            </div>
        )
    }

    render_proposal_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_my_proposal_item(object)
        if(this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */){
            return(
                <div>
                    {this.render_detail_item('3', item['min'])}
                </div>
            )
        }
        return(
            <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
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
        )
    }

    format_my_proposal_item(object){
        var tags = object['ipfs'] == null ? ['Proposal'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Proposal ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p6
        var time = object['event'] == null ? 0 : object['event'].returnValues.p5
        var sender = this.get_senders_name(object['event'].returnValues.p4, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id']+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },
            'min':{'details':object['e5']+' • '+object['id']+sender, 'title':title, 'size':'l', 'border_radius':'0%'}
        }
    }












    render_order_payment_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1979u']/* 'Order Hash' */, 'details':this.truncate(transaction_item.direct_purchase_item['purchase_identifier'], 53), 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['3068al']/* 'Recipient Account.' */, 'title':''+transaction_item.object['ipfs'].target_receiver+','+this.get_senders_name2(transaction_item.recipient), 'size':'l'})}

                {this.render_detail_item('0')}

                {this.render_set_storefront_prices_list_part2()}
            </div>
        )
    }

    render_set_storefront_prices_list_part2(){
        var middle = this.props.height-200;
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        if(transaction_item.direct_purchase_item != null){
            var items = [].concat(transaction_item.direct_purchase_item['price_data'])
            var shipping_items = [].concat(transaction_item.direct_purchase_item['shipping_price_data'])
            var purchase_unit_count = transaction_item.purchase_unit_count
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1951']/* 'Purchase Amounts' */, 'details':this.props.app_state.loc['1979v']/* 'This is the final amount for the price of the item youve ordered.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px 0px 5px 0px'}}>
                                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['id']], 'number':this.get_amounts_to_be_paid(item['amount'], purchase_unit_count), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['id']], 'subtitle':this.format_power_figure(this.get_amounts_to_be_paid(item['amount'], purchase_unit_count)), 'barwidth':this.calculate_bar_width(this.get_amounts_to_be_paid(item['amount'], purchase_unit_count)), 'number':this.format_account_balance_figure(this.get_amounts_to_be_paid(item['amount'], purchase_unit_count)), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1953']/* 'Shipping Fee' */, 'details':this.props.app_state.loc['1979w']/* 'The charged shipping fee for delivering the items.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {shipping_items.map((item, index) => (
                            <li style={{'padding': '5px 0px 5px 0px'}}>
                                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.stack_items[this.state.transaction_index].e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                </div>
                            </li>
                        ))}
                    </ul>
                    
                    <div style={{height:10}}/>
                    {this.render_purchase_option_fees2()}
                </div>
            )
        }
    }

    render_purchase_option_fees2(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        var object = transaction_item.object
        var e5 = this.props.app_state.selected_e5
        if(transaction_item.direct_purchase_item['option_fees'] != null && transaction_item.direct_purchase_item['option_fees'].length > 0){
            var items = [].concat(transaction_item.direct_purchase_item['option_fees'])
            return(
                <div style={{}}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1058m']/* 'Selected Option Fees.' */, 'details':this.props.app_state.loc['1058n']/* 'Below is the extra price for the selected options youve chosen.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px 0px 5px 0px'}}>
                                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item['id']], 'number':this.get_amounts_to_be_paid(item['amount'], transaction_item.purchase_unit_count), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item['id']], 'subtitle':this.format_power_figure(this.get_amounts_to_be_paid(item['amount'], transaction_item.purchase_unit_count)), 'barwidth':this.calculate_bar_width(this.get_amounts_to_be_paid(item['amount'], transaction_item.purchase_unit_count)), 'number':this.format_account_balance_figure(this.get_amounts_to_be_paid(item['amount'], transaction_item.purchase_unit_count)), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }











    render_purchase_credits_data(){
        var transaction_item = this.props.app_state.stack_items[this.state.transaction_index];
        const buy_amount = transaction_item.amoun
        const e5 = transaction_item.e5
        return(
            <div>
                {this.render_detail_item('1',{'active_tags':transaction_item.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':''})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3092c']/* 'Set Purchase Amount' */, 'details': this.props.app_state.loc['3092m']/* 'The amount of credits you intend to purchase in this transaction.' */, 'size': 'l' })}
                <div style={{ height: 10 }}/>
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['3092c']/* 'Set Purchase Amount' */, 'subtitle':this.format_power_figure(transaction_item.amount), 'barwidth':this.get_number_width(transaction_item.amount), 'number':`${this.format_account_balance_figure(transaction_item.amount)}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['3092b']/* credits */, })}
                </div>
                <div style={{height: 10}}/>

                {this.render_detail_item('3', { 'details': this.props.app_state.loc['3092e']/* 'Purchase Target' */, 'title': transaction_item.recipient, 'size': 'l' })}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3092h']/* 'Total Payment Amount.' */, 'details':this.props.app_state.loc['3092i']/* 'Below is the amount of Spend youll be paying to obtain the credits you want.' */, 'size':'l'})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+5], 'number':buy_amount, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[5]})}>
                    {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+5], 'subtitle':this.format_power_figure(buy_amount), 'barwidth':this.calculate_bar_width(buy_amount), 'number':this.format_account_balance_figure(buy_amount), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[5]})}
                </div>
            </div>
        )
    }













    round_off(float_number){
        return (Math.round(float_number * 100) / 100)
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
        var uploaded_data = {}
        if(item_id == '8' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12') uploaded_data = this.props.app_state.uploaded_data;

        var rating_denomination = this.props.app_state.rating_denomination == this.props.app_state.loc['1593hj']/* percentage */ ? 'percentage' : 'score'
        return(
            <div>
                <ViewGroups show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data}  theme={this.props.theme} width={width} show_images={this.props.show_images.bind(this)} rating_denomination={rating_denomination}
                
                />
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