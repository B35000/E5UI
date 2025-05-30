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

function start_and_end(str) {
    if (str.length > 13) {
      return str.substr(0, 6) + '...' + str.substr(str.length-6, str.length);
    }
    return str;
  }

class PollDetailsSection extends Component {
    
    state = {
        selected: 0, navigate_view_post_list_detail_tags_object: this.get_navigate_view_post_list_detail_tags_object_tags(),
    };

    reset_tags(){
        this.setState({navigate_view_post_list_detail_tags_object: this.get_navigate_view_post_list_detail_tags_object_tags()})
    }

    get_navigate_view_post_list_detail_tags_object_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e',this.props.app_state.loc['2028']/* 'metadata' */,this.props.app_state.loc['3072']/* 'results' */],[1]
          ],
        }
    }

    render(){
        return(
            <div>
                {this.render_posts_list_detail()}
            </div>
        )
    }

    render_posts_list_detail(){
        var object = this.get_item_in_array(this.get_poll_items(), this.props.selected_poll_item);
        if(object == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }
        else{
            return(
                <div>
                    {this.render_post_details_section(object)}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 0px 0px', 'max-width':'470px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.navigate_view_post_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_post_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
    }

    when_navigate_view_post_list_detail_tags_object_updated(tag_obj){
        this.setState({navigate_view_post_list_detail_tags_object: tag_obj})
    }

    render_empty_detail_object(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height
        return(
            <div>
                <div style={{height:he, 'background-color': 'transparent', 'border-radius': '15px','padding':'10px 5px 5px 10px','display': 'flex', 'align-items':'center','justify-content':'center','margin':'0px 0px 10px 0px'}}>
                    <img alt="" src={this.props.app_state.theme['letter']} style={{height:70 ,width:'auto'}} />
                </div>
            </div>
        )
    }

    get_item_in_array(object_array, id){
        var object = object_array.find(x => x['e5_id'] === id);
        return object
    }

    render_post_details_section(object){
        var selected_item = this.get_selected_item(this.state.navigate_view_post_list_detail_tags_object, this.state.navigate_view_post_list_detail_tags_object['i'].active)
        
        if(object == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }

        if(selected_item == this.props.app_state.loc['2028']/*  'metadata' */){
            return(
                <div>
                    {this.render_post_main_details_section(object)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['3072']/* 'results' */){
            return(
                <div>
                    {this.render_poll_results_section(object)}
                </div>
            )  
        }
    }


    render_post_main_details_section(object){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-50
        var item = this.get_poll_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects
        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 2px 10px', 'padding':'0px 10px 0px 10px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':''+this.get_senders_name(object['event'].returnValues.p5, object), 'details':this.props.app_state.loc['a2527g']/* 'Poster' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_taken_down_message_if_post_is_down(object)}
                    
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    <div style={{height: 10}}/>
                    {this.show_consensus_type_message(object)}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['winner_data'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['start_time'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['end_time'])}
                    {this.render_targeted_participants(item, object)}
                    <div style={{height: 10}}/>
                    {this.render_vote_changing_message_if_enabled(object)}
                    <div style={{height: 10}}/>
                    {this.render_randomizer_value(object)}
                    <div style={{height: 10}}/>
                    {this.render_closed_poll_message(object)}

                    {this.render_csv_files_if_any(object)}
                    {this.render_json_files_if_any(object)}
                    {this.poll_e5s(object)}

                    {this.render_detail_item('0')}
                    {this.render_item_data(items, object)}
                    {this.render_item_images(object)}
                    {this.render_pdf_files_if_any(object)}
                    {this.render_zip_files_if_any(object)}
                    
                    <div style={{height: 10}}/>
                    {this.render_markdown_if_any(object)}

                    {this.render_edit_object_button(object)}

                    {this.render_vote_object_button(object)}

                    

                    {this.render_pin_post_button(object)}

                    {this.render_messgae_if_voted_in_poll(object)}

                    {this.post_consensus_status(object)}
                    
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_closed_poll_message(object){
        var end_time = object['ipfs'].end_time
        var now = Date.now()/1000
        if(now > end_time){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3072bd']/* 'The voting period for the poll is officiall over.' */, 'title':this.props.app_state.loc['3072bc']/* '⛔ Poll Closed' */})}
                </div>
            )
        }
    }

    render_targeted_participants(item, object){
        var participants_count = object['ipfs'].participants.length
        object['ipfs'].csv_files.forEach(file => {
            participants_count += file['data'].account_entries;
        });
        object['ipfs'].json_files.forEach(file => {
            participants_count += file['data'].account_entries
        });

        if(participants_count > 0){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['participants'])}
                </div>
            )
        }
    }

    render_taken_down_message_if_post_is_down(object){
        if(this.is_post_taken_down_for_sender(object)){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2526b']/* The object has been taken down.' */, 'title':this.props.app_state.loc['2526a']/* '🔒 Taken Down' */})}
                    <div style={{height: 10}}/>
                </div>
            )
        }
    }

    is_post_taken_down_for_sender(object){
        if(object['ipfs'].get_take_down_option == null) return false
        var selected_take_down_option = this.get_selected_item2(object['ipfs'].get_take_down_option, 'e')
        if(selected_take_down_option == 1) return true
    }

    get_selected_item2(object, option){
        return object[option][2][0]
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

    render_randomizer_value(object){
        return(
            <div>
                {this.render_detail_item('3', {'title':object['ipfs'].randomizer.toString(), 'details':this.props.app_state.loc['3072w']/* 'randomizer' */, 'size':'l'})}
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
                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':title, 'details':details, 'size':'l'})}
            </div>
        )
    }


    get_senders_name(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var obj = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
            var alias = (obj[sender] == null ? sender : obj[sender])
            return alias
        }
    }

    render_messgae_if_voted_in_poll(object){
        var id = object['id']
        var vote_array = this.props.app_state.object_votes[id] == null ? [] : this.props.app_state.object_votes[id]
        if(vote_array.length > 0 && (this.props.app_state.has_wallet_been_set || this.props.app_state.accounts[this.props.app_state.selected_e5] != null)){
            var time = vote_array[0]['time']
            var account_id = vote_array[0]['event'].returnValues.p2
            var e5 = vote_array[0]['event']['e5']
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['c311ck']/* Participated. */, 'details':this.props.app_state.loc['c311cl']/* 'You have a vote record in this poll.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'title':''+(this.props.app_state.loc['3072p']/* 'As $' */.replace('$', account_id)), 'details':this.get_senders_name2(account_id, e5), 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'title':''+(new Date(time * 1000)), 'details':this.props.app_state.loc['3072o']/* 'Vote Timestamp' */, 'size':'l'})}
                </div>
            )
        }
    }

    get_senders_name2(sender, e5){
        var obj = this.props.app_state.alias_bucket[e5]
        var alias = (obj[sender] == null ? sender : obj[sender])
        return alias
    }



    render_csv_files_if_any(object){
        var state = object['ipfs']
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

    render_json_files_if_any(object){
        var state = object['ipfs']
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




    poll_e5s(object){
        var state = object['ipfs']
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
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'winner_data':{'title':candidates_count, 'details':winner_count, 'size':'l'},
            'start_time':{'details':this.props.app_state.loc['3072a']/* 'Start Time' */, 'title':''+(new Date(start_time * 1000)), 'size':'l'},
            'end_time':{'details':this.props.app_state.loc['3072b']/* 'End Time.' */, 'title':''+(new Date(end_time * 1000)), 'size':'l'},
            'participants':{'title':number_with_commas(participants_count), 'details':this.props.app_state.loc['c311bz']/* 'targeted participants.' */, 'size':'l'},
            'age':{'style':'l', 'title':this.props.app_state.loc['1744']/* 'Block Number' */, 'subtitle':this.props.app_state.loc['2494']/* 'age' */, 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)} `+this.props.app_state.loc['2495']/* ago */, },
        }
    }

    render_markdown_if_any(object){
        var state = object['ipfs']
        if(state.markdown != null && state.markdown != ''){
            return(
                <div>
                    {this.render_detail_item('13', {'source':state.markdown})}
                </div>
            )
        }
    }

    render_pdf_files_if_any(object){
        var state = object['ipfs']
        if(state.entered_pdf_objects != null && state.entered_pdf_objects.length > 0){
            return(
                <div>
                    {this.render_pdfs_part(state.entered_pdf_objects)}
                </div>
            )
        }
    }

    render_zip_files_if_any(object){
        var state = object['ipfs']
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
                {this.render_detail_item('8', {'details':title,'title':details, 'size':'s', 'image':thumbnail, 'border_radius':'15%'})}
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



    render_pin_post_button(object){
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3072c']/* 'Pin the Poll to  your feed.' */, 'title':this.props.app_state.loc['3072d']/* 'Pin Poll' */})}
                <div style={{height:10}}/>
                <div onClick={()=> this.when_pin_post_clicked(object)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3072e']/* 'Pin/Unpin Poll' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_pin_post_clicked(object){
        this.props.pin_poll(object)
    }



    render_item_data(items, object){
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
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['view_group_card_item_background'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'display': 'flex', 'align-items':'center','justify-content':'center'}}>
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
                        <div key={index}>
                            {this.render_detail_item(item['type'], item['data'])} 
                            <div style={{height:2}}/>
                        </div>
                    ))}
                </div>
            )
        }
    }

    render_item_images(object){
        var images_to_add = object['ipfs'].entered_image_objects
        if(images_to_add.length == 0) return;
        return(
            <div>
                {this.render_detail_item('9', {'images':images_to_add, 'pos':0})}
            </div>
        )
    }


    get_poll_items(){
        return this.props.get_poll_items('')
    }


    render_edit_object_button(object){
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if(object['event'].returnValues.p5 == my_account){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3072f']/* Edit Indexed Poll' */, 'details':this.props.app_state.loc['3072g']/* 'Change the basic details for your Indexed Poll' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_basic_edit_object_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2520']/* 'Perform Action' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    open_basic_edit_object_ui(object){
        this.props.open_edit_object('13', object)
    }

    render_vote_object_button(object){
        var start_time = object['ipfs'].start_time
        var end_time = object['ipfs'].end_time
        var now = Date.now()/1000
        var id = object['id']
        var vote_array = this.props.app_state.object_votes[id] == null ? [] : this.props.app_state.object_votes[id]
        const vote_changeable = this.get_selected_item2(object['ipfs'].get_changeable_vote_tags_object, 'e') == 1
        if(start_time < now && now < end_time && (vote_array.length == 0 || vote_changeable == true)){
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3072i']/* Participate in Poll. */, 'details':this.props.app_state.loc['3072j']/* 'Participate in this poll and vote.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_vote_in_poll_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['3072k']/* 'Participate' */, 'action':''})}
                    </div>
                    {this.show_message_if_private(object)}
                </div>
            )
        }
    }

    show_message_if_private(object){
        var participants_count = object['ipfs'].participants.length
        object['ipfs'].csv_files.forEach(file => {
            participants_count += file['data'].account_entries;
        });
        object['ipfs'].json_files.forEach(file => {
            participants_count += file['data'].account_entries
        });
        if(participants_count != 0){
            return(
                <div>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['3072l']/* 'If you werent registered for this poll, your vote will be discarded during counting. Be advised.' */, 'textsize':'11px', 'font':this.props.app_state.font})}
                </div>
            )
        }
    }

    open_vote_in_poll_ui(object){
        if(!this.props.app_state.has_wallet_been_set && this.props.app_state.accounts[this.props.app_state.selected_e5] == null){
            this.props.notify(this.props.app_state.loc['3072n']/* Set your wallet first. */, 1500)
            return;
        }
        this.props.open_vote_in_poll_ui(object)
    }

    post_consensus_status(object){
        var start_time = object['ipfs'].start_time
        var now = Date.now()/1000
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if(object['event'].returnValues.p5 == my_account && start_time < now){
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3072q']/* Tally Vote.' */, 'details':this.props.app_state.loc['3072r']/* 'Count all the valid votes that have been posted and post the status of the poll.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_post_consensus_status_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2520']/* 'Perform Action' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    open_post_consensus_status_ui(object){
        this.props.show_view_calculate_poll_result_bottomsheet(object)
    }















    render_poll_results_section(object){
        var he = this.props.height-47
        return(
            <div>
                <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px'}}>
                    <div style={{ 'overflow-y': 'auto', height: he, padding:'5px 0px 5px 0px'}}>
                        <div style={{padding:'5px 5px 5px 5px'}}>
                            {this.render_detail_item('3', {'title':this.props.app_state.loc['3072ba']/* 'Poll Results.' */, 'details':this.props.app_state.loc['3072bb']/* 'All the results of the poll are listed below. */, 'size':'l'})} 
                        </div>
                        <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px'}}/>
                        <div style={{padding:'5px 10px 5px 10px'}}>
                            {this.render_poll_result_items(object)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render_poll_result_items(object){
        var middle = this.props.height-200;
        var items = [].concat(this.get_results(object))

        if(items.length == 0){
            items = [0,1]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'display': 'flex', 'align-items':'center','justify-content':'center'}}>
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
                <div style={{overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        <div>
                            {items.reverse().map((item, index) => (
                                <li style={{}} onClick={() => this.when_poll_result_item_clicked(item, object)}>
                                    <div>
                                        {this.render_poll_result_item(item)}
                                        <div style={{height: 4}}/>
                                    </div>
                                </li>
                            ))}    
                        </div>
                    </ul>
                </div>
            )
        }
    }

    get_results(object){
        var results_obj = this.props.app_state.poll_results[object['e5_id']]
        if(results_obj == null) return [];
        return results_obj
    }

    render_poll_result_item(item){
        var time = item['event'].returnValues.p6/* timestamp */
        return(
            <div>
                {this.render_detail_item('3', {'details':this.get_time_difference(time), 'title':''+(new Date(time * 1000)), 'size':'l'})}
            </div>
        )
    }

    when_poll_result_item_clicked(item, object){
        this.props.show_dialog_bottomsheet({'item':item, 'object':object}, 'poll_results')
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
        if(item_id == '8' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12') uploaded_data = this.props.app_state.uploaded_data

        var censor_list = this.props.app_state.censored_keyword_phrases.concat(this.props.app_state.censored_keywords_by_my_following)
        return(
            <div>
                <ViewGroups uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={width} show_images={this.props.show_images.bind(this)} when_e5_link_tapped={this.props.when_e5_link_tapped.bind(this)} censored_keyword_phrases={censor_list}/>
            </div>
        )

    }

    get_number_width(number){
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
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

    calculate_bar_width(num){
        if(num == null) return '0%'
        var last_two_digits = num.toString().slice(0, 1)+'0';
        if(num > 10){
            last_two_digits = num.toString().slice(0, 2);
        }
        return last_two_digits+'%'
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




export default PollDetailsSection;