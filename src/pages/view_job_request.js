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
import TextInput from './../components/text_input';
import NumberPicker from './../components/number_picker';

// import Letter from './../assets/letter.png'; 
// import E5EmptyIcon3 from './../assets/e5empty_icon3.png';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import Linkify from "linkify-react";

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

function start_and_end(str) {
  if (str.length > 13) {
    return str.substr(0, 6) + '...' + str.substr(str.length-6, str.length);
  }
  return str;
}

function TreeNode(data) {
  this.data     = data;
  this.parent   = null;
  this.children = [];
}

TreeNode.comparer = function (a, b) { 
  return a.data.sort < b.data.sort ? 0 : 1; 
};

TreeNode.prototype.sortRecursive = function () {
  this.children.sort(TreeNode.comparer);
  for (var i=0, l=this.children.length; i<l; i++) {
    this.children[i].sortRecursive();
  }
  return this;
};

function toTree(data) {
  var nodeById = {}, i = 0, l = data.length, node;

  nodeById[0] = new TreeNode(); // that's the root node

  for (i=0; i<l; i++) {  // make TreeNode objects for each item
    nodeById[ data[i].index ] = new TreeNode(data[i]);
  }
  for (i=0; i<l; i++) {  // link all TreeNode objects
    node = nodeById[ data[i].index ];
    node.parent = nodeById[node.data.parent];
    node.parent.children.push(node);
  }
  return nodeById[0].sortRecursive();
}

class ViewJobRequestPage extends Component {
    
    state = {
        selected:0, picked_contract: null, request_item:{'job_request_id':0}, type:this.props.app_state.loc['1667']/* 'accept-job-request' */, id:makeid(8), entered_indexing_tags:[this.props.app_state.loc['1668']/* 'accept' */, this.props.app_state.loc['1669']/* 'job' */, this.props.app_state.loc['1670']/* 'request' */], accept_job_request_title_tags_object: this.get_accept_job_request_title_tags_object(), contractor_object:null, entered_text:'', focused_message:{'tree':{}}, e5: this.props.app_state.selected_e5, comment_structure_tags: this.get_comment_structure_tags(), hidden_message_children_array:[]
    };

    get_comment_structure_tags(){
        return{
            'i':{
                active:'e',
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1671']/* 'channel-structure' */, this.props.app_state.loc['1672']/* 'comment-structure' */], [1]
            ],
        };
    }

    get_accept_job_request_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e', this.props.app_state.loc['1673']/* 'contract' */, this.props.app_state.loc['1674']/* 'activity' */], [0]
            ],
        };
    }

    get_accepted_job_request_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e', this.props.app_state.loc['1675']/* 'activity' */], [0]
            ],
        };
    }

    render(){
        if(this.state.request_item['title_description'] == null) return;
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                {this.render_accept_button()}
                {this.render_everything()}
            </div>
        )
    }

    when_accept_job_request_title_tags_object_updated(tag_obj){
        this.setState({accept_job_request_title_tags_object: tag_obj})
    }


    render_accept_button(){
        if(this.state.request_item['job_request_id'] != 0){
            var object = this.state.contractor_object
            if(!this.state.request_item['is_response_accepted'] && object['event'].returnValues.p5 == this.props.app_state.user_account_id[object['e5']]){
                return(
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.accept_job_request_title_tags_object} tag_size={'l'} when_tags_updated={this.when_accept_job_request_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img className="text-end" onClick={()=>this.finish_creating_response()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div>
                )
            }else{
                return(
                    <div className="row">
                        <div className="col-12" style={{'padding': '5px 0px 0px 10px'}}>
                            <Tags font={this.props.app_state.font} page_tags_object={this.state.accept_job_request_title_tags_object} tag_size={'l'} when_tags_updated={this.when_accept_job_request_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                        </div>
                    </div>
                )
            }
        }
    }



    render_everything(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_small_screen_selectors()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div>
                    {this.render_medium_screen_selectors()}
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-4" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_title_details_part()}
                    </div>
                    <div className="col-4" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_select_contract_parts()}
                    </div>
                    <div className="col-4" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_messages_parts()}
                    </div>
                </div>
                
            )
        }
    }



    render_small_screen_selectors(){
        var selected_item = this.get_selected_item(this.state.accept_job_request_title_tags_object, this.state.accept_job_request_title_tags_object['i'].active)

        if(selected_item == 'e'){
            return(
                <div>
                    {this.render_title_details_part()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1676']/* 'contract' */){
            return(
                <div>
                    {this.render_select_contract_parts()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1677']/* 'activity' */){
            return(
                <div>
                    {this.render_messages_parts()}
                </div>
            )
        }
    }


    render_medium_screen_selectors(){
        var selected_item = this.get_selected_item(this.state.accept_job_request_title_tags_object, this.state.accept_job_request_title_tags_object['i'].active)

        if(selected_item == 'e' || selected_item == this.props.app_state.loc['1676']/* 'contract' */){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_title_details_part()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_select_contract_parts()}
                    </div>
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1677']/* 'activity' */){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_title_details_part()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_messages_parts()}
                    </div>
                </div>
            )
        }
    }



    render_title_details_part(){
        if(this.state.request_item['job_request_id'] != 0){
            return(
                <div ref={this.pick_images_view_width}>
                    {this.render_job_response_item(this.state.request_item)}
                </div>
            )
        }
    }


    render_job_response_item(item){
        var is_application_accepted = item['is_response_accepted'];
        if(is_application_accepted == true){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1678']/* 'Expiry time from now: ' */+this.get_expiry_time(item), 'details':''+(new Date(item['application_expiry_time'] * 1000)), 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':''+(new Date(item['time']*1000)), 'details':this.get_time_diff((Date.now()/1000) - (parseInt(item['time'])))+this.props.app_state.loc['1698a']/* ' ago' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1679']/* 'Payment Option' */, 'details':this.get_selected_item(item['pre_post_paid_option'], 'e'), 'size':'l'})}
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'details':this.get_senders_name_or_you(item['applicant_id'], this.state.contractor_object['e5']), 'title':item['applicant_id'], 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_part_of_contract_message(item)}
                    
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1680']/* 'Job Description' */, 'details':item['title_description'], 'size':'l'})}
                    <div style={{height:10}}/>
                    
                    {this.render_pdf_files_if_any(item)}
                    <div style={{height:10}}/>
                    {this.render_image_part([].concat(item['entered_images']))}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1682']/* 'Accepted' */, 'details':this.props.app_state.loc['1698']/* 'The contractor Accepted the job request.' */, 'size':'l'})}
                    {this.render_view_contract_button(item)}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1683']/* 'Set Pay' */, 'details':this.props.app_state.loc['1684']/* 'The requested pay for the job' */, 'size':'l'})}
                    {this.render_set_prices_list_part(item)}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1678']/* 'Expiry time from now: ' */+this.get_expiry_time(item), 'details':''+(new Date(item['application_expiry_time'] * 1000)), 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':''+(new Date(item['time']*1000)), 'details':this.get_time_diff((Date.now()/1000) - (parseInt(item['time'])))+this.props.app_state.loc['1698a']/* ' ago' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1686']/* 'Payment Option' */, 'details':this.get_selected_item(item['pre_post_paid_option'], 'e'), 'size':'l'})}
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'details':this.get_senders_name_or_you(item['applicant_id'], this.state.contractor_object['e5']), 'title':item['applicant_id'], 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_part_of_contract_message(item)}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1688']/* 'Job Description' */, 'details':item['title_description'], 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_pdf_files_if_any(item)}
                    <div style={{height:10}}/>
                    {this.render_image_part([].concat(item['entered_images']))}


                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1689']/* 'Set Pay' */, 'details':this.props.app_state.loc['1690']/* 'The amounts youll be receiving for the job.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_set_prices_list_part(item)}
                </div>
            )
        }
        
    }

    get_senders_name_or_you(sender, e5){
        if(sender == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* You. */
        }
        var bucket = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
        var alias = (bucket[sender] == null ? this.props.app_state.loc['1681']/* 'Sender ID' */  : bucket[sender])
        return alias
    }

    get_senders_name_or_you2(sender, e5){
        if(sender == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* You. */
        }
        var bucket = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
        var alias = (bucket[sender] == null? sender : bucket[sender])
        return alias
    }
    
    render_part_of_contract_message(item){
        if(item['contract'] == null) return;
        var contract_and_proposals = this.props.app_state.loaded_contract_and_proposal_data[item['contract']]
        if(contract_and_proposals == null) return;

        var account_id = item['applicant_id']
        var object = this.state.contractor_object
        var alias = this.get_senders_name_or_you2(account_id, object['e5'])
        if(object['event'].returnValues.p5 == this.props.app_state.user_account_id[object['e5']]){
            //if its my contractor post
            var contract = contract_and_proposals['contract']
            if(contract['participant_times'][account_id] > (Date.now()/1000)){
                var title = this.props.app_state.loc['1698d']/* '$ is part of your selected contract' */.replace('$', alias)
                return(
                    <div>
                        {this.render_detail_item('3', {'title':title, 'details':this.props.app_state.loc['1698e']/* 'Expiry: ' */+this.get_expiry_time(item), 'size':'l'})}
                        <div style={{height:10}}/>
                    </div>
                )
            }else{
                var title = this.props.app_state.loc['1698f']/* '$ is not part of your selected contract' */.replace('$', alias)
                return(
                    <div>
                        {this.render_detail_item('3', {'title':title, 'details':'...', 'size':'l'})}
                        <div style={{height:10}}/>
                    </div>
                )
            }
        }
    }

    render_view_contract_button(item){
        if(item['contract'] == null) return;
        var contract_and_proposals = this.props.app_state.loaded_contract_and_proposal_data[item['contract']]
        if(contract_and_proposals == null) return;
        var contract = contract_and_proposals['contract']
        var proposals = contract_and_proposals['proposals']
        return(
            <div>
                <div style={{height:10}}/>
                <div onClick={()=>this.open_contract(contract, proposals)}>
                    {this.render_detail_item('5', {'text':'View Contract', 'action':''})}
                </div>
            </div>
        )
    }

    open_contract(contract, proposals){
        this.props.open_view_contract_ui(contract, proposals)
    }

    render_pdf_files_if_any(item){
        if(item['entered_pdfs'] != null && item['entered_pdfs'].length > 0){
            return(
                <div>
                    {this.render_pdfs_part(item['entered_pdfs'])}
                </div>
            )
        }
    }

    render_pdfs_part(entered_pdf_objects){
        var items = [].concat(entered_pdf_objects)

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
        if(size > 1_000_000_000){
            return {'size':Math.round(size/1_000_000_000), 'unit':'GBs'}
        }
        else if(size > 1_000_000){
            return {'size':Math.round(size/1_000_000), 'unit':'MBs'}
        }
        else if(size > 1_000){
            return {'size':Math.round(size/1_000), 'unit':'KBs'}
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

    get_expiry_time(item){
        var time_diff = item['application_expiry_time'] - Math.round(Date.now()/1000)
        var t = ''
        if(time_diff < 0){
            t = this.get_time_diff(time_diff*-1) +this.props.app_state.loc['1698a']/* ' ago.' */
        }else{
            t = this.props.app_state.loc['1698b']/* 'In ' */+this.get_time_diff(time_diff)
        }

        return t
    }

    render_image_part(item_images){
        var items = [].concat(item_images)
        var col = Math.round(this.props.app_state.width / 100)
        var rowHeight = 100;

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
            return(
                <div>
                    <ImageList sx={{ width: 'auto', height: 'auto' }} cols={col} rowHeight={rowHeight}>
                        {items.map((item, index) => (
                            <ImageListItem key={item.img} onClick={() => this.props.show_images(items, index)}>
                                <div>
                                    <img alt="" src={item} style={{height:100 ,width:100, 'border-radius': '12px'}} />
                                </div> 
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            )
        }
    }

    render_set_prices_list_part(item){
        var middle = this.props.height-300;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(item['price_data'])

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{}}>
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
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '2px 0px 2px 0px'}}>
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
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


    set_object(request_item, contractor_object){
        if(this.state.request_item['job_request_id'] != request_item['job_request_id']){
            this.setState({
                selected: 0, picked_contract: null, request_item:{'job_request_id':0}, type:this.props.app_state.loc['1667']/* 'accept-job-request' */, id:makeid(8), contractor_object: null,
                entered_indexing_tags:[this.props.app_state.loc['1668']/* 'accept' */, this.props.app_state.loc['1669']/* 'job' */, this.props.app_state.loc['1670']/* 'request' */], accept_job_request_title_tags_object: this.get_accept_job_request_title_tags_object()
            })
        }
        this.setState({request_item: request_item, contractor_object: contractor_object, e5: request_item['e5']})
        this.props.load_job_request_messages(contractor_object['id'], request_item['job_request_id'], request_item['e5'], request_item['key_data'])

        if(request_item['is_response_accepted']){
            this.setState({accept_job_request_title_tags_object: this.get_accepted_job_request_title_tags_object()})
        }
        if (this.messagesEnd.current){
            this.messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }


    componentDidMount() {
        this.interval = setInterval(() => this.check_for_new_responses_and_messages(), this.props.app_state.details_section_syncy_time);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    check_for_new_responses_and_messages() {
        if(this.state.request_item['job_request_id'] != 0){
            this.props.load_job_request_messages(this.state.contractor_object['id'], this.state.request_item['job_request_id'], this.state.request_item['e5'], this.state.request_item['key_data'])
        }
    }








    render_select_contract_parts(){
        var background_color = this.props.theme['card_background_color']
        var object = this.state.contractor_object
        var request_item = this.state.request_item
        if(object == null || request_item == null) return;

        if(object['event'].returnValues.p5 != this.props.app_state.user_account_id[object['e5']] || request_item['is_response_accepted'] == true){
            //if its the client or the job has been accepted, show nothing.
            var items = ['0','1'];
            return (
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={this.props.app_state.theme['letter']} style={{height:60 ,width:'auto'}} />
                                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'13px','text':this.props.app_state.loc['1691']/* 'Select the contract youll be using. If you have no contracts, first create one then youll see it here.' */})}
                <div style={{height:10}}/>

                {this.render_my_contracts()}
            </div>
        )
    }

    render_my_contracts(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height-203;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = [].concat(this.get_contract_items())

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={this.props.app_state.theme['letter']} style={{height:60 ,width:'auto'}} />
                                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }else{
            var background_color = this.props.theme['card_background_color']
            var card_shadow_color = this.props.theme['card_shadow_color']
            return ( 
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px 2px 5px 2px'}}>
                                {this.render_contract_item(item, index)}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        
    }

    get_contract_items(){
        var my_contracts = []
        var myid = this.props.app_state.user_account_id[this.state.e5]
        var created_contracts = this.props.app_state.created_contracts[this.state.e5]
        
        for(var i = 0; i < created_contracts.length; i++){
            var post_author = created_contracts[i]['event'] == null ? 0 : created_contracts[i]['event'].returnValues.p3
            if(post_author.toString() == myid.toString()){
                // if(this.props.app_state.my_contract_applications[this.props.app_state.created_contracts[i]['id']] == null){
                //     my_contracts.push(this.props.app_state.created_contracts[i])
                // }else{
                //     if(this.props.app_state.my_contract_applications[this.props.app_state.created_contracts[i]['id']] < Date.now()/1000){
                //     }
                // }
                my_contracts.push(created_contracts[i])
            }
        }
        return my_contracts
    }

    render_contract_item(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_contract_item(object)

        if(this.is_object_picked_contract(object)){
            return(
                <div onClick={() => this.when_contract_item_clicked(object)} style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                    <div style={{'padding': '5px 0px 5px 5px'}}>
                        {this.render_detail_item('1', item['tags'])}
                        <div style={{height: 10}}/>
                        <div style={{'padding': '0px 0px 0px 0px'}}>
                            {this.render_detail_item('3', item['id'])}
                        </div>
                        <div style={{'padding': '20px 0px 0px 0px'}}>
                            {this.render_detail_item('2', item['age'])}
                        </div>
                        <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '0px 10px 15px 10px'}}/>
                        <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '0px 10px 15px 10px'}}/>
                    </div>         
                </div>
            )
        }else{
            return(
                <div onClick={() => this.when_contract_item_clicked(object)} style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
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

        
    }

    format_contract_item(object){
        var tags = object['ipfs'] == null ? ['Contract'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Contract ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{ 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['27']/* 'block' */, }
        }
    }

    when_contract_item_clicked(object){
        if(this.is_object_picked_contract(object)){
            this.setState({picked_contract: null})
        }else{
            this.setState({picked_contract: object})
        }
        
    }

    is_object_picked_contract(object){
        if(this.state.picked_contract == null) return false
        if(object['e5_id'] == this.state.picked_contract['e5_id']) return true
        return false
    }


    finish_creating_response(){
        var selected_contract = this.state.picked_contract
        var item = this.state.request_item
        var time_diff = item['application_expiry_time'] - Math.round(Date.now()/1000)

        if(selected_contract == null){
            this.props.notify(this.props.app_state.loc['1153']/* 'You need to pick a contract first' */, 1600)
        }
        else if(time_diff < 0){
            this.props.notify(this.props.app_state.loc['1698c']/* 'The job request has already expired.' */, 1600)
        }
        else{
            this.props.add_response_action_to_stack(this.state)
            this.setState({
                selected: 0, picked_contract: null, type:this.props.app_state.loc['1667']/* 'accept-job-request' */, id:makeid(8),
                entered_indexing_tags:[this.props.app_state.loc['1668']/* 'accept' */,this.props.app_state.loc['1669']/* 'job' */, this.props.app_state.loc['1670']/* 'request' */], accept_job_request_title_tags_object: this.get_accept_job_request_title_tags_object()
            })
            this.props.notify(this.props.app_state.loc['18']/* 'transaction added to stack' */, 1600)
        }
    }










    render_messages_parts(){
        var he = this.props.height-180
        if(this.get_focused_message() != null) he = this.props.height-250
        var size = this.props.screensize
        var ww = '80%'
        if(size == 'l') ww = '90%'
        if(this.props.app_state.width > 1100){
            ww = '80%'
        }
        return(
            <div>
                <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px', 'max-width':'470px'}}>
                    <div onScroll={event => this.handleScroll(event)} style={{ 'overflow-y': 'auto', height: he, padding:'0px 0px 5px 0px'}}>
                        {/* <Tags font={this.props.app_state.font} page_tags_object={this.state.comment_structure_tags} tag_size={'l'} when_tags_updated={this.when_comment_structure_tags_updated.bind(this)} theme={this.props.theme}/> */}
                        {this.render_top_title()}
                        {/* {this.render_focus_list()} */}
                        {/* <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px'}}/> */}
                        {this.render_sent_received_messages()}
                    </div>
                </div>
                <div style={{height:5}}/>
                {this.render_focused_message()}
                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 5px 0px', width: '99%'}}>
                    <div style={{'margin':'1px 10px 0px 0px'}}>
                        {/* {this.render_image_picker()} */}
                        <div>
                            <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}} onClick={()=> this.when_circle_clicked()}>
                                <img alt="" src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}}/>
                            </div>
                        </div>
                    </div>
                    <div style={{width:10}}/>
                    <div className="row" style={{width:ww}}>
                        <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                            <TextInput font={this.props.app_state.font} height={20} placeholder={this.props.app_state.loc['1039']/* 'Enter Message...' */} when_text_input_field_changed={this.when_entered_text_input_field_changed.bind(this)} text={this.state.entered_text} theme={this.props.theme}/>
                        </div>
                        <div className="col-1" style={{'padding': '0px 10px 0px 0px'}}>
                            <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                                <img alt="" className="text-end" onClick={()=>this.add_message_to_stack()} src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }

    when_circle_clicked = () => {
        let me = this;
        if(Date.now() - this.last_all_click_time2 < 200){
            clearTimeout(this.all_timeout);
            //double tap
            me.scroll_to_bottom()
        }else{
            this.all_timeout = setTimeout(function() {
                clearTimeout(this.all_timeout);
                // single tap
                me.show_add_comment_bottomsheet()
            }, 200);
        }
        this.last_all_click_time2 = Date.now();
    }

    scroll_to_bottom(){
        this.messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
    }

    handleScroll = (event) => {
        var object = this.state.request_item;      
        this.has_user_scrolled[object['job_request_id']] = true
    };

    render_focused_message(){
        var item = this.get_focused_message();
        if(item != null){
            return(
                <div style={{'padding': '7px 15px 10px 15px','margin':'0px 70px 5px 50px', 'background-color': this.props.theme['messsage_reply_background'],'border-radius': '10px 10px 10px 10px'}} onClick={()=>this.unfocus_message()}> 
                    <div className="row" style={{'padding':'0px 0px 0px 0px'}}>
                        <div className="col-9" style={{'padding': '0px 0px 0px 14px', 'height':'20px' }}> 
                            <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} >{this.get_sender_title_text(item)}</p>
                        </div>
                        <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                            <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{this.get_time_difference(item['time'])}</p>
                        </div>
                    </div>
                    <p style={{'font-size': '11px','color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'white-space': 'pre-line'}}>{this.truncate(item['message'], 41)}</p>
                </div>
            )
        }
    }

    when_comment_structure_tags_updated(tag_obj){
        this.setState({comment_structure_tags: tag_obj})
    }

    show_add_comment_bottomsheet(){
        var object = this.state.request_item;
        var focused_message_id = this.get_focused_message() != null ? this.get_focused_message() : 0
        this.props.show_add_comment_bottomsheet(object, focused_message_id, 'request', this.state.contractor_object['id'], this.state.entered_text)
    }
  

    render_top_title(){
        var object = this.state.request_item;
        var contractor_post = this.state.contractor_object
        return(
            <div style={{padding:'0px 5px 5px 5px'}}>
                {this.render_detail_item('3', {'title':this.truncate(contractor_post['ipfs'].entered_title_text, 40), 'details':this.truncate(object['title_description'], 40), 'size':'l'})} 
            </div>
        )
    }

    constructor(props) {
        super(props);
        this.messagesEnd = React.createRef();
        this.pick_images_view_width = React.createRef();
        this.has_user_scrolled = {}
    }

    componentDidUpdate(){
        var object = this.state.request_item;
        var has_scrolled = this.has_user_scrolled[object['job_request_id']]
        if(has_scrolled == null){
            this.scroll_to_bottom()
        }
    }

    render_sent_received_messages(){
        // var middle = this.props.height-240;
        // if(this.get_focused_message() != null) middle = this.props.height-290
        // var size = this.props.size;
        // if(size == 'm'){
        //     middle = this.props.height-100;
        // }
        var items = [].concat(this.get_convo_messages())
        var stacked_items = [].concat(this.get_stacked_items()).reverse()
        var final_items = stacked_items.concat(items)

        if(items.length == 0 && stacked_items.length == 0){
            items = [0,1]
            return(
                <div>
                    <div style={{}}>
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
                </div>
            )
        }
        else{
            var selected_view_option = this.get_selected_item(this.state.comment_structure_tags, 'e')
            if(selected_view_option == this.props.app_state.loc['1671']/* 'channel-structure' */){
                return(
                <div /* onScroll={event => this.handleScroll(event)} */ style={{ 'display': 'flex', 'flex-direction': 'column-reverse', /* overflow: 'scroll', maxHeight: middle */}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.render_messages(final_items)}
                        <div ref={this.messagesEnd}/>
                    </ul>
                </div>
            )
            }else{
                return(
                    <div /* onScroll={event => this.handleScroll(event)} */ style={{ 'display': 'flex', 'flex-direction': 'column-reverse', /* overflow: 'scroll', maxHeight: middle */}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            <div ref={this.messagesEnd}/>
                            {this.render_all_comments()}
                        </ul>
                    </div>
                )
            }
        }
    }

    render_messages(items){
        var middle = this.props.height-200;        
        if(items.length == 0){
            var items = [0,1]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img alt="" src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
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
                        <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                            <div >
                                {this.render_message_as_focused_if_so(item)}
                                <div style={{height:3}}/>
                            </div>
                        </li>
                    ))}    
                </div>
            )
        }
        
    }

    focus_message(item){
        var clone = JSON.parse(JSON.stringify(this.state.focused_message))
        var object = this.state.request_item;

        if(this.state.focused_message[object['id']] != item){
            clone[object['job_request_id']] = item
            if(clone['tree'][object['job_request_id']] == null) {
                clone['tree'][object['job_request_id']] = []
            }
            // if(!this.includes_function(clone['tree'][object['job_request_id']], item)){
            //     console.log('pushing item')
            // }
            clone['tree'][object['job_request_id']].push(item)
        }
        this.setState({focused_message: clone})
    }

    // includes_function(array, item){
    //     var return_value = false;
    //     array.forEach(element => {
    //         if(element['id'] == item['id']){
    //             console.log('found clone: '+item['id'])
    //             return_value = true
    //         }
    //     });
    //     return return_value
    // }

    unfocus_message(){
        var clone = JSON.parse(JSON.stringify(this.state.focused_message))
        var object = this.state.request_item;
        if(clone['tree'][object['job_request_id']] != null){
            var index = this.get_index_of_item()
            if(index != -1){
                clone['tree'][object['job_request_id']].splice(index, 1)
            }
        }

        var latest_message = clone['tree'][object['job_request_id']].length > 0 ? clone['tree'][object['job_request_id']][clone['tree'][object['job_request_id']].length -1] : null
        clone[object['job_request_id']] = latest_message
        this.setState({focused_message: clone})
    }

    get_index_of_item(){
        var object = this.state.request_item;
        var focused_item = this.state.focused_message[object['job_request_id']]
        var focused_items = this.state.focused_message['tree'][object['job_request_id']]
        var pos = -1
        for(var i=0; i<focused_items.length; i++){
            if(focused_items[i]['message_id'] == focused_item['message_id']){
                pos = i
                break
            }
        }
        return pos
    }


    render_message_as_focused_if_so(item){
        return(
            <div>
                <SwipeableList>
                        <SwipeableListItem
                            swipeLeft={{
                            content: <div>{this.props.app_state.loc['2507a']/* Reply */}</div>,
                            action: () => this.focus_message(item)
                            }}
                            swipeRight={{
                            content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2908']/* Delete. */}</p>,
                            action: () => this.props.delete_message_from_stack(item, this.props.app_state.loc['1505']/* 'job-request-messages' */)
                            }}
                            >
                            <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>{this.render_stack_message_item(item)}</div>
                        </SwipeableListItem>
                    </SwipeableList>
            </div>
        )
        // var focused_message = this.get_focused_message()
        // if(item == focused_message){
        //     return(
        //         <div>
        //             <SwipeableList>
        //                 <SwipeableListItem
        //                     swipeLeft={{
        //                     content: <div>Focus</div>,
        //                     action: () => console.log()
        //                     }}
        //                     swipeRight={{
        //                     content: <div>Unfocus</div>,
        //                     action: () => this.unfocus_message()
        //                     }}>
        //                     <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>{this.render_stack_message_item(item)}</div>
        //                 </SwipeableListItem>
        //             </SwipeableList>
        //             {/* <div onClick={(e) => this.when_message_clicked(e, item, 'focused_message')}>
        //                 {this.render_stack_message_item(item)}
        //             </div> */}
        //             <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '5px 20px 5px 20px'}}/>
        //         </div>
        //     )
        // }else{
        //     return(
        //         <div>
        //             <SwipeableList>
        //                 <SwipeableListItem
        //                     swipeLeft={{
        //                     content: <div>Focus</div>,
        //                     action: () => this.focus_message(item)
        //                     }}
        //                     swipeRight={{
        //                     content: <div>Unfocus</div>,
        //                     action: () => this.unfocus_message()
        //                     }}>
        //                     <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>{this.render_stack_message_item(item)}</div>
        //                 </SwipeableListItem>
        //             </SwipeableList>

        //             {/* <div onClick={(e) => this.when_message_clicked(e, item)}>
        //                 {this.render_stack_message_item(item)}
        //             </div> */}
        //         </div>
        //     )
        // }
    }

    when_message_clicked = (event, item, focused_message) => {
        let me = this;
        if(Date.now() - this.last_all_click_time < 200){
            //double tap
            me.when_message_double_tapped(item)
            clearTimeout(this.all_timeout);
        }else{
            this.all_timeout = setTimeout(function() {
                clearTimeout(this.all_timeout);
                // single tap
                
            }, 200);
        }
        this.last_all_click_time = Date.now();
    }


    when_message_double_tapped(item){
        var message = item['message'];
        this.copy_to_clipboard(message)
    }

    copy_to_clipboard(signature_data){
        navigator.clipboard.writeText(signature_data)
        this.props.notify(this.props.app_state.loc['1692']/* 'Copied message to clipboard.' */, 1600)
    }


    render_stack_message_item(item){
        if(this.is_sender_in_blocked_accounts(item)){
            return(
                <div>
                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                        <div style={{'margin':'10px 20px 10px 0px'}}>
                            <img alt="" src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                        </div>
                    </div>
                </div>
            )
        }
        var size = item['size'] == null ? '11px' : item['size'];
        var font = item['font'] == null ? this.props.app_state.font : item['font']
        var word_wrap_value = this.longest_word_length(item['message']) > 53 ? 'break-all' : 'normal'
        var e5 = item['sender_e5'] == null ? item['e5'] : item['sender_e5']
        var line_color = item['sender'] == this.props.app_state.user_account_id[e5] ? this.props.theme['secondary_text_color'] : this.props.theme['send_receive_ether_background_color']
        var text = this.format_message(item['message'])
        // const parts = text.split(/(\d+)/g);
        const parts = this.split_text(text);
        return(
            <div>
                <div style={{'background-color': line_color,'margin': '0px 0px 0px 0px','border-radius': '0px 0px 0px 0px'}}>
                    <div style={{'background-color': this.props.theme['send_receive_ether_background_color'],'margin': '0px 0px 0px 1px','border-radius': '0px 0px 0px 0px'}}>
                        <div style={{'padding': '7px 15px 10px 15px','margin':'0px 0px 0px 0px', 'background-color': this.props.theme['view_group_card_item_background'],'border-radius': '7px'}}>
                            <div className="row" style={{'padding':'0px 0px 0px 0px'}}>
                                <div className="col-9" style={{'padding': '0px 0px 0px 14px', 'height':'20px' }}> 
                                <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} > {this.get_sender_title_text(item)}</p>
                                </div>
                                <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                                <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{this.get_time_difference(item['time'])}</p>
                                </div>
                            </div>
                            <p style={{'font-size': size,'color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': font,'text-decoration': 'none', 'white-space': 'pre-line', 'word-break': word_wrap_value}} onClick={(e) => this.when_message_clicked(e, item)}><Linkify options={{target: '_blank'}}>{
                                parts.map((part, index) => {
                                    const num = parseInt(part, 10);
                                    const isId = !isNaN(num) && num > 1000;
                                    if (isId) {
                                        return (
                                            <span
                                                key={index}
                                                style={{ textDecoration: "underline", cursor: "pointer", color: this.props.theme['secondary_text_color'] }}
                                                onClick={() => this.when_e5_link_tapped(num)}>
                                                    {part}
                                            </span>
                                        );
                                    }
                                    return <span key={index}>{part}</span>;
                                })
                            }</Linkify></p>
                            {this.render_markdown_in_message_if_any(item)}
                            {this.render_images_if_any(item)}
                            {this.get_then_render_my_awards(item)}
                            {/* <p style={{'font-size': '8px','color': this.props.theme['primary_text_color'],'margin': '1px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'white-space': 'pre-line'}} className="fw-bold">{this.get_message_replies(item).length} {this.props.app_state.loc['1693']} </p> */}
                        </div>
                    </div>
                </div>
                    
                {this.render_pdfs_if_any(item)}
                {this.render_response_if_any(item)}
            </div>
        )
    }

    split_text(text){
        if(text == null) return []
        var split = text.split(' ')
        var final_string = []
        split.forEach((word, index) => {
            final_string.push(word)
            if(split.length-1 != index){
                final_string.push(' ')
            }
        });
        return final_string
    }

    when_e5_link_tapped(id){
        this.props.when_e5_link_tapped(id)
    }

    longest_word_length(text) {
        return text
            .split(/\s+/) // Split by whitespace (handles multiple spaces & newlines)
            .reduce((maxLength, word) => Math.max(maxLength, word.length), 0);
    }

    render_response_if_any(_item){
        if(_item['focused_message_id'] == 0) return;
        // if(this.get_focused_message(object) != null) return;
        var message_items = this.get_convo_messages().concat(this.get_stacked_items())
        var item = this.get_item_in_message_array(_item['focused_message_id'], message_items)
        if(item == null) return;
        var selected_view_option = this.get_selected_item(this.state.comment_structure_tags, 'e')
        if(selected_view_option == this.props.app_state.loc['1672']/* 'comment-structure' */) return
        var size = item['size'] == null ? '11px' : item['size'];
        var font = item['font'] == null ? this.props.app_state.font : item['font']
        return(
            <div style={{'padding': '7px 15px 10px 15px','margin':'2px 5px 0px 20px', 'background-color': this.props.theme['messsage_reply_background'],'border-radius': '0px 0px 10px 10px'}}> 
                <div className="row" style={{'padding':'0px 0px 0px 10px'}}>
                    <div className="col-9" style={{'padding': '0px 0px 0px 0px', 'height':'20px' }}> 
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}}>{this.get_sender_title_text(item)}</p>
                    </div>
                    <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                        <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{this.get_time_difference(item['time'])}</p>
                    </div>
                </div>
                <p style={{'font-size': size,'color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': font,'text-decoration': 'none', 'white-space': 'pre-line'}}>{this.truncate(item['message'], 53)}</p>

                {/* {this.render_award_object_if_any(_item)} */}
                {this.get_then_render_my_awards(item)}
            </div>
        )
    }

    render_award_object_if_any(item){
        if(item['award_tier'] != null && item['award_tier'] != ''){
            return(
                <div style={{'font-size': '8px'}}>
                    <p>{item['award_tier']['label']['title']}</p>
                </div>
            )
        }
    }

    get_then_render_my_awards(item){
        var message_items = this.get_convo_messages().concat(this.get_stacked_items())
        var award_obj = {}
        message_items.forEach(message => {
            if(message['focused_message_id'] == item['message_id']){
                if(message['award_tier'] != null && message['award_tier'] != ''){
                    if(award_obj[message['award_tier']['label']['title']] == null){
                       award_obj[message['award_tier']['label']['title']] = 0
                    }
                    award_obj[message['award_tier']['label']['title']]++
                }
            }
        });
        if(Object.keys(award_obj).length > 0){
            var text = ''
            for(const award in award_obj){
                if(award_obj.hasOwnProperty(award)){
                    if(text != ''){
                        text = text + ' '
                    }
                    if(award_obj[award] > 1){
                        text = `${text}${award}x${award_obj[award]}`
                    }else{
                        text = `${text}${award}`
                    }
                }
            }
            var font = item['font'] == null ? this.props.app_state.font : item['font']
            return(
                <div>
                    <p style={{'color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': font,'text-decoration': 'none', 'white-space': 'pre-line', 'font-size': '8px'}}>{text}</p>
                </div>
            )
        }
    }

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }

    get_item_in_message_array(message_id, object_array){
        var object = object_array.find(x => x['message_id'] === message_id);
        return object
    }

    is_sender_in_blocked_accounts(item){
        var blocked_account_obj = this.get_all_sorted_objects(this.props.app_state.blocked_accounts)
        var blocked_accounts = []
        blocked_account_obj.forEach(account => {
            if(!blocked_accounts.includes(account['id'])){
                blocked_accounts.push(account['id'])
            }
        });

        if(blocked_accounts.includes(item['sender'])){
            return true
        }
        return false
    }

    render_images_if_any(item){
        if(item.type == 'image'){
            return(
                <div>
                    {this.render_detail_item('9',item['image-data'])}
                </div>
            )
        }
    }

    render_pdfs_if_any(item){
        if(item.type == 'image' && item['pdf-data'] != null && item['pdf-data'].length > 0){
            return(
                <div>
                    <div style={{height:5}}/>
                    {this.render_pdfs_part(item['pdf-data'])}
                    <div style={{height:5}}/>
                </div>
            )
        }
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

    get_sender_title_text(item){
        var e5 = item['sender_e5'] == null ? item['e5'] : item['sender_e5']
        if(item['sender'] == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var obj = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
            var sender = item['sender']
            var alias = obj[sender] == null ? sender.toString() : obj[sender]
            return alias
        }
    }

    format_message(message){
        if(message == ''){
            return '...'
        }
        return message
    }

    get_convo_messages(){
        var object = this.state.request_item;
        if(this.props.app_state.object_messages[object['job_request_id']] == null) return [];
        return this.filter_messages_for_blocked_accounts(this.props.app_state.object_messages[object['job_request_id']])
    }

    filter_messages_for_blocked_accounts(objects){
        var blocked_account_obj = this.get_all_sorted_objects(this.props.app_state.blocked_accounts)
        var blocked_accounts = []
        blocked_account_obj.forEach(account => {
            if(!blocked_accounts.includes(account['id'])){
                blocked_accounts.push(account['id'])
            }
        });
        var filtered_objects = [];
        objects.forEach(object => {
            if(!blocked_accounts.includes(object['sender'])){
                filtered_objects.push(object)
            }
        })

        if(this.props.app_state.masked_content == 'hide'){
            return filtered_objects
        }
        return objects;
    }

    get_stacked_items(){
        var object = this.state.request_item;
        var convo_id = object['job_request_id']

        var stack = this.props.app_state.stack_items
        var stacked_items = []
        for(var i=0; i<stack.length; i++){
            if(stack[i].type == this.props.app_state.loc['1505']/* 'job-request-messages' */){
                for(var e=0; e<stack[i].messages_to_deliver.length; e++){
                    var message_obj = stack[i].messages_to_deliver[e]
                    if(message_obj['id'] == convo_id){
                        stacked_items.push(message_obj)
                    }
                }
            }
        }
        return stacked_items
    }

    get_focused_message_replies(){
        var focused_message = this.get_focused_message()
        var all_messages = this.get_convo_messages().concat(this.get_stacked_items())
        var replies = []
        for(var i=0; i<all_messages.length; i++){
            if(all_messages[i]['focused_message_id'] != null && focused_message['message_id'] != null &&  all_messages[i]['focused_message_id'] == focused_message['message_id']){
                replies.push(all_messages[i])
            }
        }
        return replies
    }

    get_message_replies(item){
        var all_messages = this.get_convo_messages().concat(this.get_stacked_items())
        var replies = []
        for(var i=0; i<all_messages.length; i++){
            if(all_messages[i]['focused_message_id'] != null && item['message_id'] != null &&  all_messages[i]['focused_message_id'] == item['message_id']){
                replies.push(all_messages[i])
            }
        }
        return replies
    }

    get_focused_message(){
        var object = this.state.request_item;
        return this.state.focused_message[object['job_request_id']]
    }





    render_image_picker(){
        return(
            <div>
                <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                    <img src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                    <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept ="image/*" onChange ={this.when_image_gif_picked.bind(this)} />
                </div>
            </div>
        )
    }

    /* called when images have been picked from picker */
    when_image_gif_picked = (e) => {
        if(e.target.files && e.target.files[0]){
            for(var i = 0; i < e.target.files.length; i++){ 
                let reader = new FileReader();
                reader.onload = function(ev){
                    var image = ev.target.result
                    this.add_image_to_stack(image)
                }.bind(this);
                reader.readAsDataURL(e.target.files[i]);
            }
            // var image = e.target.files.length == 1 ? 'image has' : 'images have';
            // this.props.notify('Your selected '+e.target.files.length+image+' been staged.',500);
        }
    }

    when_entered_text_input_field_changed(text){
        if(text.length > this.props.app_state.max_input_text_length){
            this.show_add_comment_bottomsheet()
        }else{
            this.setState({entered_text: text})
        }
    }

    add_message_to_stack(){
        var message = this.state.entered_text.trim()
        var object = this.state.request_item;
        var message_id = Date.now()
        var focused_message_id = this.get_focused_message() != null ? this.get_focused_message()['message_id'] : 0
        if(message == ''){
            this.props.notify(this.props.app_state.loc['1695']/* 'Type something first.' */, 1600)
        }
        else if(this.props.app_state.user_account_id[this.state.e5] == 1){
            this.props.notify(this.props.app_state.loc['1696']/* 'You need to make at least 1 transaction to participate.' */, 1200)
        }
        else{
            var tx = {'id':object['job_request_id'], type:'message', entered_indexing_tags:['send', 'message'], 'message':message, 'sender':this.props.app_state.user_account_id[this.state.e5], 'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id, 'contractor_id':this.state.contractor_object['id'], 'e5':this.state.e5, 'key_data':this.state.request_item['key_data'], 'sender_e5':this.props.app_state.selected_e5}

            this.props.add_job_request_message_to_stack_object(tx)

            this.setState({entered_text:''})
            this.props.notify(this.props.app_state.loc['1697']/* 'Message added to stack.' */, 1600)
            
            if (this.messagesEnd.current){
                this.messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }

    add_image_to_stack(image){
        if(this.props.app_state.user_account_id[this.state.e5] == 1){
            this.props.notify('you need to make at least 1 transaction to participate', 1200)
            return
        }
        var message_id = Date.now()
        var focused_message_id = this.get_focused_message() != null ? this.get_focused_message()['message_id'] : 0
        var message = this.state.entered_text.trim()
        var object = this.state.request_item;
        var tx = {'id':object['job_request_id'], type:'image', 'message': message, entered_indexing_tags:['send', 'image'], 'image-data':{'images':[image],'pos':0}, 'sender':this.props.app_state.user_account_id[this.state.e5],'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id, 'contractor_id':this.state.contractor_object['id'], 'e5':this.state.e5}

        this.props.add_job_request_message_to_stack_object(tx)

        this.setState({entered_text:''})
        this.props.notify('message added to stack', 600)

        if (this.messagesEnd.current){
            this.messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }


    render_focus_list(){
        var object = this.state.request_item;
        var items = this.state.focused_message['tree'][object['job_request_id']]

        if(items != null && items.length > 0){
            return(
                <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_focus_chain_item_clicked(item, index)}>
                                {this.render_detail_item('3', {'title':this.get_sender_title_text(item), 'details':this.shorten_message_item(this.format_message(item['message'])), 'size':'s'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }


    shorten_message_item(message){
        var return_val = message
        if(message.length > 10){
            return_val = message.substring(0, 10).concat('...');
        }
        return return_val
    }


    when_focus_chain_item_clicked(item, pos){
        var clone = JSON.parse(JSON.stringify(this.state.focused_message))
        var object = this.state.request_item;

        var new_array = []
        for(var i=0; i<=pos; i++){
            new_array.push(clone['tree'][object['job_request_id']][i])
        }
        clone[object['job_request_id']] = item
        clone['tree'][object['job_request_id']] = new_array
        
        this.setState({focused_message: clone})
    }





    render_all_comments(){
        var sorted_messages_in_tree = this.get_message_replies_in_sorted_object()
        return(
            <div>
                {sorted_messages_in_tree.children.map((item, index) => (
                    <li style={{'padding': '1px 5px 0px 5px'}} onClick={()=>console.log()}>
                        <div >
                            {this.render_main_comment(item, 0)}
                            <div style={{height:3}}/>
                        </div>
                    </li>
                ))}    
            </div>
        )
    }

    render_main_comment(comment, depth){
        return(
            <div>
                <div style={{'padding': '1px 0px 0px 0px'}} onClick={()=> this.when_message_item_clicked(comment.data.message)}>
                    {this.render_message_as_focused_if_so(comment.data.message)}
                </div>

                {this.render_message_children(comment, depth)}
            </div>
        )
    }

    render_message_children(comment, depth){
        var padding = depth > 4 ? '0px 0px 0px 5px' : '0px 0px 0px 20px'
        if(!this.state.hidden_message_children_array.includes(comment.data.message['message_id'])){
            return(
                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px'}}>
                    <div style={{width:'100%'}}>
                        <ul style={{ 'padding': padding, 'listStyle':'none'}}>
                            {comment.children.map((item, index) => (
                                <li style={{'padding': '4px 0px 0px 0px'}}>
                                    <div>
                                        {this.render_main_comment(item, depth+1)}
                                        <div style={{height:3}}/>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }
    }

    when_message_item_clicked(message){
        var clone = this.state.hidden_message_children_array.slice();
        
        if(clone.includes(message['message_id'])){
            var index = clone.indexOf(message['message_id']);
            if(index > -1){
                clone.splice(index, 1);
            }
        }else{
            clone.push(message['message_id'])
        }

        this.setState({hidden_message_children_array:clone})
    }

    get_message_replies_in_sorted_object(){
        var messages = this.get_convo_messages().concat(this.get_stacked_items())
        var data = []
        messages.forEach(message => {
            data.push({ index : message['message_id'], sort : message['time'], parent : message['focused_message_id'], message: message })
        });
        var tree = toTree(data);
        return tree;
    }
















    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }


    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var uploaded_data = {}
        if(item_id == '8' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12')uploaded_data = this.props.app_state.uploaded_data
        return(
            <div>
                <ViewGroups uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} show_images={this.props.show_images.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} />
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

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
    }



}




export default ViewJobRequestPage;