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
// import E5EmptyIcon3 from './../assets/e5empty_icon3.png';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ViewPager, Frame, Track, View } from 'react-view-pager'

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

class ContractorDetailsSection extends Component {
    
    state = {
        selected: 0, navigate_view_contractors_list_detail_tags_object: this.get_navigate_view_contracts_list_detail_tags(), entered_text:'', focused_message:{'tree':{}}, 
        get_contractor_availability_tags: this.get_contractor_availability_tags()
    };

    constructor(props) {
        super(props);
        this.locationPickerRef = React.createRef();
    }

    componentDidMount() {
        this.interval = setInterval(() => this.check_for_new_responses_and_messages(), this.props.app_state.details_section_syncy_time);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    check_for_new_responses_and_messages() {
        if(this.props.selected_contractor_item != null){
            var object = this.get_item_in_array(this.get_contractor_items(), this.props.selected_contractor_item);
            if(object == null) return;
            this.perform_fetch_work(object)
        }
    }

    perform_fetch_work(object){
        const active = this.state.navigate_view_contractors_list_detail_tags_object['i'].active
        const selected_item = this.get_selected_item(this.state.navigate_view_contractors_list_detail_tags_object, active)

        if(selected_item == this.props.app_state.loc['2216']/* 'job-requests' */){
            this.props.get_contractor_applications(object['id'], object['e5'])
        }
    }

    get_navigate_view_contracts_list_detail_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e',this.props.app_state.loc['2215']/* 'details' */,this.props.app_state.loc['2216']/* 'job-requests' */],[1]
          ],
        }
    }

    get_contractor_availability_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['or','',0], ['e',this.props.app_state.loc['2231g']/* 'available 🙋‍♂️' */,this.props.app_state.loc['2231h']/* 'unavailable 😵' */],[0]
          ],
        }
    }

    render(){
        return(
        <div>{this.render_contractors_list_detail()}</div>
        )
    }

    render_contractors_list_detail(){
        if(this.props.selected_contractor_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    {this.render_contractors_details_section()}
                    <div style={{'height':'40px', width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 0px 0px', 'max-width':'470px'}}>
                        <Tags ref={c => this.bottom_tags = c} font={this.props.app_state.font} page_tags_object={this.state.navigate_view_contractors_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_contractors_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
    }


    when_navigate_view_contractors_list_detail_tags_object_updated(tag_group){
        this.setState({navigate_view_contractors_list_detail_tags_object: tag_group})
        var me = this;
        setTimeout(function() {
            me.check_for_new_responses_and_messages()
        }, (1 * 300));
    }

    render_empty_detail_object(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height
        return(
            <div>
                <div style={{height:he, 'background-color': 'transparent', 'border-radius': '15px','padding':'10px 5px 5px 10px','display': 'flex', 'align-items':'center','justify-content':'center','margin':'0px 0px 10px 0px'}}>
                    <img src={this.props.app_state.theme['letter']} style={{height:70 ,width:'auto'}} />
                </div>
            </div>
        )
    }


    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }

    get_item_in_array(object_array, id){
        var object = object_array.find(x => x['e5_id'] === id);
        return object
    }


    render_contractors_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_contractors_list_detail_tags_object, this.state.navigate_view_contractors_list_detail_tags_object['i'].active)
        var object = this.get_item_in_array(this.get_contractor_items(), this.props.selected_contractor_item);

        if(object == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }

        if(object != null){
            if(this.props.screensize != 'l'){
                return this.render_post_list_group_if_touch_screen(object)
            }
            if(selected_item == this.props.app_state.loc['2215']/* 'details' */ || selected_item == 'e'){
                return(
                    <div key={selected_item}>
                        {this.render_contractor_posts_main_details_section(object)}
                    </div>
                )
            }
            else if(selected_item == this.props.app_state.loc['2216']/* 'job-requests' */){
                return(
                    <div key={selected_item}>
                        {this.render_contractor_job_responses(object)}
                    </div>
                )
            }
        }
    }

    render_post_list_group_if_touch_screen(object){
        var pos = this.state.navigate_view_contractors_list_detail_tags_object['e'][2][0] - 1
        const handle_change = (value) => {
            const tag_name = this.state.navigate_view_contractors_list_detail_tags_object['e'][1][value+1]
            const current_tag_group = this.state.navigate_view_contractors_list_detail_tags_object['i'].active 
            const first_tag = this.state.navigate_view_contractors_list_detail_tags_object[current_tag_group][1][0]
            
            const clone = structuredClone(this.state.navigate_view_contractors_list_detail_tags_object)
            const tag_object_clone = this.bottom_tags.when_tag_button_clicked(0, first_tag, true, clone)
            const tag_object_clone2 = this.bottom_tags.when_tag_button_clicked(value+1, tag_name, true, tag_object_clone)
            var me = this;
            setTimeout(function() {
                me.setState({navigate_view_contractors_list_detail_tags_object: tag_object_clone2})
            }, (1 * 200));
        }
        return(
            <div>
                <ViewPager tag="main">
                    <Frame className="frame">
                        <Track ref={c => this.track = c} viewsToShow={1} currentView={pos} onViewChange={(e) => handle_change(parseInt(e))} className="track">
                            <View className="view">
                                <div>
                                    {this.render_contractor_posts_main_details_section(object)}
                                </div>
                            </View>
                            <View className="view">
                                <div>
                                    {this.render_contractor_job_responses(object)}
                                </div>
                            </View>
                        </Track>
                    </Frame>
                </ViewPager>
            </div>
        )
        
    }



    render_contractor_posts_main_details_section(object){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-55
        var size = this.props.screensize

        // var object = this.get_contractor_items()[this.props.selected_contractor_item];
        var item = this.get_contractor_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects
        const client_datapoints = this.get_clientel_datapoints(object)

        const online_text = this.is_recipient_online(object) ? this.props.app_state.loc['2738bi']/* 'online' */ : null/* this.props.app_state.loc['2738bj'] *//* 'offline' */
        return(
            <div style={{ 'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 5px 10px', 'padding':'0px 10px 0px 10px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div onClick={() => this.copy_id_to_clipboard(object)}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{height: 10}}/>
                    {this.show_moderator_note_if_any(object)}
                    {this.render_post_state(object)}
                    <div onClick={() => this.add_to_contacts2(object)}>
                        {this.render_detail_item('3',{ 'title': '' + this.get_senders_name(object['event'].returnValues.p5, object), 'details': this.props.app_state.loc['2070']/* 'Author' */, 'size': 'l', 'footer':online_text}, )}
                    </div>

                    {client_datapoints.jobs_received > 0 && (
                        <div>
                            <div style={{height: 10}}/>
                            {this.render_detail_item('4', {'text':this.props.app_state.loc['2231a']/* ' requests received.' */.replace('$', number_with_commas(client_datapoints.jobs_received)), 'textsize':'14px', 'font':'Sans-serif'})}
                            <div style={{height: 5}}/>

                            {this.render_detail_item('4', {'text':this.props.app_state.loc['2231b']/* ' requests processed.' */.replace('$', number_with_commas(client_datapoints.accepted_requests)), 'textsize':'14px', 'font':'Sans-serif'})} 
                            <div style={{height: 5}}/>

                            {this.render_detail_item('4', {'text':this.props.app_state.loc['2231c']/* ' clients handled.' */.replace('$', number_with_commas(client_datapoints.clients_handled)), 'textsize':'14px', 'font':'Sans-serif'})}
                        </div>
                    )}

                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    {this.render_online_switch(object)}
                    {this.render_availability(object)}
                    {this.render_detail_item('0')}

                    {this.render_taken_down_message_if_post_is_down(object)}
                    {this.render_message_if_blocked_by_sender(object)}

                    {this.render_item_data(items, object)}
                    {this.render_item_images(object)}
                    {this.render_pdf_files_if_any(object)}
                    {this.render_zip_files_if_any(object)}
                    {this.render_markdown_if_any(object)}

                    {this.render_detail_item('0')}
                    {this.render_contractor_location_info(object)}
                    {this.fee_per_hour_or_per_job(object)}
                    <div style={{height:10}}/>
                    {this.render_price_amounts(object)}
                    {this.render_object_tag_price_info(object)}
                    
                    {this.render_detail_item('0')}

                    {this.render_edit_object_button(object)}
                    {this.render_send_job_button(object)}

                    {this.render_pin_contractor_button(object)}
                    {this.render_block_post_button(object)}

                    {this.render_follow_unfollow_author_button(object)}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    get_clientel_datapoints(object){
        const jobs_received = (this.props.app_state.contractor_applications[object['id']] || []).concat((this.props.app_state.socket_contractor_applications[object['id']] || []))
        const accepted_requests = []
        const clients_handled = []

        jobs_received.forEach(job_request => {
            if(job_request['is_response_accepted'] == true){
                accepted_requests.push(job_request['request_id'])
                if(!clients_handled.includes(job_request['applicant_id'])){
                    clients_handled.push(job_request['applicant_id'])
                }
            }
        });

        return {jobs_received: jobs_received.length, accepted_requests: accepted_requests.length, clients_handled: clients_handled.length }
    }

    copy_id_to_clipboard(object){
        navigator.clipboard.writeText(object['id'])
        this.props.notify(this.props.app_state.loc['1403']/* Copied to clipboard. */, 800)
    }

    show_moderator_note_if_any(object){
        if(this.props.app_state.moderator_notes_by_my_following.length == 0  || this.props.app_state.user_account_id[object['e5']] == object['author']) return;
        var note_to_apply = []
        for(var n=0; n<this.props.app_state.moderator_notes_by_my_following.length; n++){
            const focused_note = this.props.app_state.moderator_notes_by_my_following[n]
            var hit_count = 0
            for(var k=0; k<focused_note['keywords'].length; k++){
                const keyword_target = focused_note['keywords'][k]
                if(object['ipfs'].entered_title_text.includes(keyword_target)){
                    hit_count ++
                }
                else if(this.get_senders_name(object['author'], object) == keyword_target || object['author'] == keyword_target){
                    hit_count++
                }
                else if(object['ipfs'].entered_indexing_tags.includes(keyword_target)){
                    hit_count ++
                }
                else{
                    const matching_entered_text_objects = object['ipfs'].entered_text_objects.filter(text_object => text_object['text'].includes(keyword_target));
                    
                    if(matching_entered_text_objects.length > 0){
                        hit_count ++
                    }
                    else if(object['ipfs'].markdown != null && object['ipfs'].markdown.includes(keyword_target)){
                        hit_count++
                    }
                    else if(object['ipfs'].entered_genre_text != null && object['ipfs'].entered_genre_text.includes(keyword_target)){
                        hit_count++
                    }
                    else if(object['ipfs'].entered_year_recorded_text != null && object['ipfs'].entered_year_recorded_text.includes(keyword_target)){
                        hit_count++
                    }
                    else if(object['ipfs'].entered_author_text != null && object['ipfs'].entered_author_text.includes(keyword_target)){
                        hit_count++
                    }
                    else if(object['ipfs'].entered_copyright_text != null && object['ipfs'].entered_copyright_text.includes(keyword_target)){
                        hit_count++
                    }
                    else if(object['ipfs'].entered_comment_text != null && object['ipfs'].entered_comment_text.includes(keyword_target)){
                        hit_count++
                    }
                    else{
                        if(object['ipfs'].songs != null){
                            const matching_songs = object['ipfs'].songs.filter(song => (song['song_title'].includes(keyword_target) || song['song_composer'].includes(keyword_target) || song['credits'].includes(keyword_target)));
                            
                            if(matching_songs.length > 0){
                                hit_count ++
                            }
                        }
                        else if(object['ipfs'].videos != null){
                            const matching_videos = object['ipfs'].videos.filter(video => (video['video_title'].includes(keyword_target) || video['video_composer'].includes(keyword_target)));
                            
                            if(matching_videos.length > 0){
                                hit_count ++
                            }
                        }
                    }
                }
            }

            if(((focused_note['type'] == 'all' && hit_count == focused_note['keywords'].length) || (focused_note['type'] == 'one' && hit_count != 0)) && focused_note['visibility_end_time'] >= (Date.now()/1000)){
                note_to_apply.push(focused_note)
            }
        }
        if(note_to_apply.length != 0){
            const identifier = object['e5_id']
            const note_index = this.state.note_index == null || this.state.note_index[identifier] == null ? 0 : this.state.note_index[identifier];
            const note_count_message = `(${note_index+1}/${note_to_apply.length})`
            return(
                <div>
                    <div onClick={() => this.update_note_object_index(note_to_apply, identifier)}>
                        {this.render_detail_item('3', {'size':'s', 'title':this.props.app_state.loc['1593is']/* '⚠️ Moderator Note $' */.replace('$', note_count_message), 'details':note_to_apply[note_index]['message']})}
                        {this.props.render_files_part(note_to_apply[note_index]['entered_file_objects'])}
                    </div>
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    update_note_object_index(note_to_apply, identifier){
        var clone = this.state.note_index == null ? {} : structuredClone(this.state.note_index)
        if(clone[identifier] == null){
            clone[identifier] = 0
        }
        if(clone[identifier] + 1 == note_to_apply.length){
            clone[identifier] = 0
        }
        else{
            clone[identifier] ++
        }
        this.setState({note_index: clone})
    }

    add_to_contacts2(object){
        this.props.add_id_to_contacts(object['author'], object)
    }

    render_post_state(object){
        const country_data = this.props.app_state.country_data
        const object_country = object['ipfs'].device_country
        const country_item_data = country_data.find(e => e.name === object_country)
        if(country_item_data != null){
            var obj = {'g':'🟢', 'r':'🔴', 'b':'🔵', 'y':'🟡', 'o':'🟠', 'p':'🟣'}
            var country_color = obj[country_item_data.color[0]]
            var title = country_item_data.code /* +' '+country_item_data.emoji */
            var details = country_color+' '+country_item_data.call_code
            var channeling_id = object['ipfs'].get_content_channeling_object == null ? 3 : this.get_selected_item2(object['ipfs'].get_content_channeling_object, 'e')
            if(channeling_id == 1){
                return(
                    <div>
                        {this.render_detail_item('3', {'size':'l', 'title':title, 'details':details})}
                        <div style={{height:10}}/>
                    </div>
                )
            }
            else if(channeling_id == 2){
                var text = country_color+' '+object['ipfs'].device_language_setting
                return(
                    <div>
                        {this.render_detail_item('4', {'text':text, 'textsize':'13px', 'font':this.props.app_state.font})}
                        <div style={{height:10}}/>
                    </div>
                )
            }
            else{
                var text = '⚫ '+this.props.app_state.loc['1233']/* 'international' */
                return(
                    <div>
                        {this.render_detail_item('4', {'text':text, 'textsize':'13px', 'font':this.props.app_state.font})}
                        <div style={{height:10}}/>
                    </div>
                )
            }
        }
    }

    render_send_job_button(object){
        var my_account = this.props.app_state.user_account_id[object['e5']]

        if(object['event'].returnValues.p5 != my_account){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2219']/* 'Send Job Request' */, 'details':this.props.app_state.loc['2220']/* 'Send a job request to the contractor to do a job for you' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_send_job_request_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2221']/* 'Send Request' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    render_follow_unfollow_author_button(object){
        var author_id = object['event'].returnValues.p5
        var follow_id = object['e5'] + ':' + author_id
        var followed_accounts = this.props.app_state.followed_accounts

        if(followed_accounts.includes(follow_id)){
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['a2527bp']/* 'Unfollow Post Author' */, 'details':this.props.app_state.loc['a2527bo']/* 'Stop showing posts made by this author in my following feed.' */})}
                    <div style={{height:10}}/>
                    <div onClick={()=> this.props.follow_unfollow_post_author(author_id, object['e5'])}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['a2527bp']/* 'Unfollow Post Author' */, 'action':''},)}
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['a2527bn']/* 'Follow Post Author' */, 'details':this.props.app_state.loc['a2527bo']/* 'Show posts made by this author in my following feed.' */})}
                    <div style={{height:10}}/>
                    <div onClick={()=> this.props.follow_unfollow_post_author(author_id, object['e5']) }>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['a2527bn']/* 'Follow Post Author' */, 'action':''},)}
                    </div>
                </div>
            )
        }
    }

    is_object_blocked_by_me(object){
        return this.props.app_state.posts_blocked_by_me.includes(object['e5_id'])
    }

    render_message_if_blocked_by_sender(object){
        if(!this.is_object_blocked_by_me(object)){
            return;
        }
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['c2527bk']/* '🙅 Post Blocked */, 'details':this.props.app_state.loc['c2527bl']/* 'The post has been blocked for you and your followers. */, 'size':'l'})}
                <div style={{height: 10}}/>
            </div>
        )
    }

    render_block_post_button(object){
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['c2527bh']/* 'Block Post. */, 'details':this.props.app_state.loc['c2527bi']/* 'Block this post from being viewed by your followers.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={()=>this.block_post(object)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['c2527bj']/* 'Block' */, 'action':''})}
                </div>
            </div>
        )
    }

    block_post(object){
        this.props.block_post(object)
    }

    render_markdown_if_any(object){
        var state = object['ipfs']
        if(state.markdown != null && state.markdown != ''){
            return(
                <div>
                    <div style={{height: 10}}/>
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
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null || this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']] == null) return
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

    render_online_switch(object){
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if(object['event'].returnValues.p5 != my_account) return;
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2231e']/* 'Switch Availability Status */, 'details':this.props.app_state.loc['2231f']/* 'You can specify if youre available or not using the tags below.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_contractor_availability_tags} tag_size={'l'} when_tags_updated={this.when_get_contractor_availability_tags_updated.bind(this)} theme={this.props.theme}/>
            </div>
        )
    }

    render_availability(object){
        return(
            <div>
                {this.props.app_state.contractor_availability_info[object['e5_id']] == null && (
                    <div>
                        <div style={{height:10}}/>
                        {this.render_small_skeleton_object2()}
                    </div>
                )}
                {this.props.app_state.contractor_availability_info[object['e5_id']] != null && (
                    <div>
                        <div style={{height:10}}/>
                        {this.render_detail_item('3', {'title':(this.props.app_state.contractor_availability_info[object['e5_id']] == 'available' ? this.props.app_state.loc['2231g']/* available 🙋‍♂️' */: this.props.app_state.loc['2231h']/* 'unavailable 😵' */), 'details':this.props.app_state.loc['2231j']/* 'Availability Status.' */, 'size':'l'})}
                    </div>
                )}
            </div>
        )
    }

    render_small_skeleton_object2(){
        const styles = {
            container: {
                position: 'relative',
                width: '100%',
                height: 60,
                borderRadius: '15px',
                overflow: 'hidden',
            },
            skeletonBox: {
                width: '100%',
                height: '100%',
                borderRadius: '15px',
            },
            centerImage: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'auto',
                height: 30,
                objectFit: 'contain',
                opacity: 0.9,
            },
        };
        return(
            <div>
                <SkeletonTheme baseColor={this.props.theme['view_group_card_item_background']} highlightColor={this.props.theme['loading_highlight_color']}>
                    <div style={styles.container}>
                        <Skeleton style={styles.skeletonBox} />
                        <img src={this.props.app_state.theme['letter']} alt="" style={styles.centerImage} />
                    </div>
                </SkeletonTheme>
            </div>
        )
    }

    when_get_contractor_availability_tags_updated(tags){
        this.setState({get_contractor_availability_tags: tags})
        const selected_item = this.get_selected_item2(tags, 'e')
        const obj = {0:'e', 1:'available', 2:'unavailable'}
        
        const object = this.get_item_in_array(this.get_contractor_items(), this.props.selected_contractor_item);
        if(selected_item != 0){
            this.props.emit_contractor_availability_notification(object, obj[selected_item])
        }
    }

    is_recipient_online(object){
        const tracked_online_accounts = this.props.app_state.tracked_online_accounts
        var recipients_e5 = object['e5']
        const recipient = object['author']
        const e5_id = recipient+recipients_e5

        if(tracked_online_accounts[e5_id] == null){
            return false
        }
        else{
            return tracked_online_accounts[e5_id]['online']
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
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null || this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']] == null) return
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

    fee_per_hour_or_per_job(object){
        var item = object['ipfs'].get_fee_type == null ? 'per-hour' : this.get_selected_item(object['ipfs'].get_fee_type, 'e')
        if(item == 'per-hour'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2217']/* 'Fees Per Hour' */, 'details':this.props.app_state.loc['2218']/* 'The amounts they charge per hour for their work' */, 'size':'l'})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['272e']/* 'Fees Per Job' */, 'details':this.props.app_state.loc['272f']/* 'The amounts they charge per job' */, 'size':'l'})}
                </div>
            )
        }
    }

    render_selected_links(object){
        if(object['ipfs'].added_links == null) return;
        var items = [].concat(object['ipfs'].added_links).reverse()

        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_link_item_clicked(item, object)}>
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
        var item_id = ((item['e5']).toUpperCase()+' • '+item['id'])
        return `${obj[item['type']]} ${item_id}`
    }


    when_link_item_clicked(item, object){
        this.props.open_e5_link(item, object)
    }

    get_senders_name(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
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
                            <div style={{height:2}}/>
                        </div>
                    ))}
                </div>
            )
        }
    }

    render_pin_contractor_button(object){
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2222']/* 'Pin the contractor to your feed' */, 'title':this.props.app_state.loc['2223']/* 'Pin Contractor' */})}
                <div style={{height:10}}/>
                <div onClick={()=> this.when_pin_contractor_clicked(object)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2224']/* 'Pin/Unpin Contractor' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_pin_contractor_clicked(object){
        this.props.pin_contractor(object)
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

    get_contractor_details_data(object){
        var tags = object['ipfs'] == null ? ['Contractor'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Contractor ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6

        const is_socket_job = object['ipfs'].get_chain_or_indexer_job_object != null ? this.get_selected_item2(object['ipfs'].get_chain_or_indexer_job_object, 'e') == 1 : false

        const title_image = is_socket_job == true ? (this.props.app_state.nitro_album_art[object['event']['nitro_e5_id']] == null ? this.props.app_state.static_assets['empty_image'] : this.props.app_state.nitro_album_art[object['event']['nitro_e5_id']]) : this.props.app_state.e5s[object['e5']].e5_img

        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags,'when_tapped':'select_deselect_tag'},
            'id':{'title':'• '+number_with_commas(object['id']), 'details':title, 'size':'l', 'title_image':title_image, 'border_radius':'0%', 'text_image_border_radius':'6px'},
            'age':{'style':'l', 'title':this.props.app_state.loc['1744']/* 'Block Number' */, 'subtitle':this.props.app_state.loc['1748']/* 'age' */, 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)} `+this.props.app_state.loc['2047']/* ago */, }
        }
    }

    get_contractor_items(){
        return this.props.get_contractor_items('')
    }

    open_send_job_request_ui(object){
        // var object = this.get_contractor_items()[this.props.selected_contractor_item];
        this.props.open_send_job_request_ui(object)
    }

    render_edit_object_button(object){
        // var object = this.get_contractor_items()[this.props.selected_contractor_item];
        var my_account = this.props.app_state.user_account_id[object['e5']]

        if(object['event'].returnValues.p5 == my_account){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2225']/* 'Edit Contractor Post' */, 'details':this.props.app_state.loc['2226']/* 'Change the basic details for your Contractor Post' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_edit_contractor_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2227']/* 'Perform Action' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    open_edit_contractor_ui(object){
        // var object = this.get_contractor_items()[this.props.selected_contractor_item];
        this.props.open_edit_object('9', object)
    }

    render_price_amounts(object){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        // var object = this.get_contractor_items()[this.props.selected_contractor_item];
        var items = [].concat(object['ipfs'].price_data)
        if(items == null || items.length == 0){
            items = [0, 1, 2]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['view_group_card_item_background'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'display': 'flex', 'align-items':'center','justify-content':'center'}}>
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
            <div style={{}}>
                <div style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <div style={{'padding': '3px 0px 3px 0px'}}>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
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







    render_contractor_location_info(object){
        if(object['ipfs'].pins != null && object['ipfs'].pins.length > 0){
            const pins = object['ipfs'].pins
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








    render_contractor_job_responses(object){
        var he = this.props.height-50
        return(
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px'}}>
                <div style={{ 'overflow-y': 'auto', height: he, padding:'5px 0px 5px 0px'}}>
                    {this.render_job_post_top_title(object)}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px'}}/>
                    {this.render_job_requests(object)}
                </div>
            </div>
        )
    }

    render_job_post_top_title(object){
        // var object = this.get_contractor_items()[this.props.selected_contractor_item];
        return(
            <div style={{padding:'5px 5px 5px 5px'}}>
                {this.render_detail_item('3', {'title':'In '+object['id'], 'details':this.props.app_state.loc['2228']/* 'Job Requests' */, 'size':'l'})} 
            </div>
        )
    }

    render_job_requests(object){
        var middle = this.props.height-200;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var loaded_items = [].concat(this.get_job_details_responses(object))
        var items = this.append_divider_between_old_messages_and_new_ones(loaded_items)

        if(items.length == 0){
            items = [0,1]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    {this.props.app_state.contractor_applications[object['id']] == null ? this.render_small_skeleton_object() : this.render_small_empty_object()}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }else{
            return(
                <div style={{overflow: 'auto'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 5px 2px 5px'}}>
                                <div key={index}>
                                    {this.render_job_response_item(item, object)}
                                </div>
                            </li> 
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_small_empty_object(){
        return(
            <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'display': 'flex', 'align-items':'center','justify-content':'center'}}>
                <div style={{'margin':'10px 20px 10px 0px'}}>
                    <img alt="" src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                </div>
            </div>
        );
    }

    render_small_skeleton_object(){
        const styles = {
            container: {
                position: 'relative',
                width: '100%',
                height: 60,
                borderRadius: '15px',
                overflow: 'hidden',
            },
            skeletonBox: {
                width: '100%',
                height: '100%',
                borderRadius: '15px',
            },
            centerImage: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'auto',
                height: 30,
                objectFit: 'contain',
                opacity: 0.9,
            },
        };
        return(
            <div>
                <SkeletonTheme baseColor={this.props.theme['loading_base_color']} highlightColor={this.props.theme['loading_highlight_color']}>
                    <div style={styles.container}>
                        <Skeleton style={styles.skeletonBox} />
                        <img src={this.props.app_state.theme['letter']} alt="" style={styles.centerImage} />
                    </div>
                </SkeletonTheme>
            </div>
        )
    }

    append_divider_between_old_messages_and_new_ones(items){
        if(items.length == 0) return [];
        const last_login_time = this.props.app_state.last_login_time
        const newElement = 'e';
        let closestIndex = 0;
        let minDiff = Infinity;
        items.forEach((obj, i) => {
            const diff = Math.abs((obj['application_expiry_time']*1000) - last_login_time);
            if (diff < minDiff) {
                minDiff = diff;
                closestIndex = i;
            }
        });
        if(closestIndex == items.length - 1){
            return items
        }
        const clone = items.slice()
        clone.splice(closestIndex + 1, 0, newElement);
        return clone;
    }

    get_job_details_responses(object){
        if(object['event'].returnValues.p5 == this.props.app_state.user_account_id[object['e5']]){
            const chain_messages = this.props.app_state.contractor_applications[object['id']] == null ? [] : this.props.app_state.contractor_applications[object['id']]
            const socket_messages = this.props.app_state.socket_contractor_applications[object['id']] == null ? [] : this.props.app_state.socket_contractor_applications[object['id']]
            const all_responses = this.sortByAttributeDescending(chain_messages.concat(socket_messages), 'time')
            return all_responses
        }else{
            var filtered_responses = []
            const chain_messages = this.props.app_state.contractor_applications[object['id']] == null ? [] : this.props.app_state.contractor_applications[object['id']]
            const socket_messages = this.props.app_state.socket_contractor_applications[object['id']] == null ? [] : this.props.app_state.socket_contractor_applications[object['id']]
            const all_responses = this.sortByAttributeDescending(chain_messages.concat(socket_messages), 'time')
            for(var i=0; i<all_responses.length; i++){
                if(all_responses[i]['applicant_id'] == this.props.app_state.user_account_id[object['e5']]){
                    filtered_responses.push(all_responses[i])
                }
            }
            return filtered_responses
        }
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


    render_job_response_item(item, object){
        if(item == 'e'){
            return(
                <div>
                    {this.render_detail_item('16', {'message':this.props.app_state.loc['2117w']/* new */})}
                </div>
            )
        }
        
        const accepted_title = item['is_response_accepted'] == true ? '🤝 • ':''
        const sender_id = this.get_senders_name2(item['applicant_id'], object)
        return(
            <div onClick={() => this.view_contract(item, object)}>
                {this.render_detail_item('3', {'title':accepted_title+sender_id+' • '+(new Date(item['application_expiry_time'] * 1000).toLocaleString()), 'details':item['title_description']+' • '+(new Date(item['time']*1000).toLocaleString())+' • '+this.get_time_diff((Date.now()/1000) - (parseInt(item['time'])))+this.props.app_state.loc['1698a']/* ' ago' */, 'size':'l'})}
            </div>
        );

        // var is_application_accepted = item['is_response_accepted'];
        // if(is_application_accepted){
        //     return(
        //         <div>
        //             <div onClick={() => this.view_contract(item, object)}>
        //                 {this.render_detail_item('3', {'title':'Expiry time from now: '+this.get_expiry_time(item), 'details':''+(new Date(item['application_expiry_time'] * 1000)), 'size':'l'})}
        //                 <div style={{height:3}}/>

        //                 {this.render_detail_item('3', {'title':this.props.app_state.loc['2229']/* 'Job Description' */, 'details':item['title_description'], 'size':'l'})}
        //                 <div style={{height:3}}/>

        //                 {this.render_detail_item('3', {'title':''+(new Date(item['time']*1000)), 'details':this.get_time_diff((Date.now()/1000) - (parseInt(item['time'])))+this.props.app_state.loc['1698a']/* ' ago' */, 'size':'l'})}
        //                 <div style={{height:3}}/>

        //                 {this.render_detail_item('3', {'title':this.props.app_state.loc['2230']/* 'Accepted' */, 'details':this.props.app_state.loc['2231d']/* 'The contractor Accepted the job request' */, 'size':'l'})}
        //             </div>
        //             <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px'}}/>
        //         </div>
        //     )
        // }else{
        //     return(
        //         <div onClick={() => this.view_contract(item, object)}>
        //             {this.render_detail_item('3', {'title':this.props.app_state.loc['2231']/* 'Expiry time from now: ' */+this.get_expiry_time(item), 'details':''+(new Date(item['application_expiry_time'] * 1000)), 'size':'l'})}
        //             <div style={{height:3}}/>

        //             {this.render_detail_item('3', {'title':''+(new Date(item['time']*1000)), 'details':this.get_time_diff((Date.now()/1000) - (parseInt(item['time'])))+this.props.app_state.loc['1698a']/* ' ago' */, 'size':'l'})}
        //             <div style={{height:3}}/>

        //             {this.render_detail_item('3', {'title':this.props.app_state.loc['2229']/* 'Job Description' */, 'details':item['title_description'], 'size':'l'})}
        //             <div style={{height:3}}/>
        //             <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px'}}/>
        //         </div>
        //     )
        // }
        
    }

    get_senders_name2(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['2785']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
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

    view_contract(item, object){
        if(!this.props.app_state.has_wallet_been_set){
            this.props.notify(this.props.app_state.loc['2906']/* 'You need to set your wallet first.' */, 5000)
            return;
        }
        this.props.open_view_job_request_ui(item, object)
    }










    render_object_tag_price_info(object){
        const tag_price_data = this.get_available_tag_data(object)
        const available_tags = Object.keys(tag_price_data)
        if(available_tags.length == 0) return;

        const selected_tag_pos = this.get_selected_tag(object)
        const selected_tag = available_tags[selected_tag_pos]

        const price_data = tag_price_data[selected_tag]
        const sorted_price_data = this.sortByAttributeDescending(price_data, 'time').reverse()
        const { used_token_ids, used_token_price_data, used_tokens_max } = this.get_tags_used_tokens_and_price_data(sorted_price_data, object['e5'])

        const selected_token_pos = this.get_selected_token(object)
        const selected_token = used_token_ids[selected_token_pos]

        const new_dps = this.get_transaction_tag_data_points(used_token_price_data, selected_token, used_tokens_max)

        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2507e']/* 'Price Distribution.' */, 'details':this.props.app_state.loc['2507f']/* `A chart containing hits at certain price points for your selected tag.` */, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_used_tokens(used_token_ids, object, selected_token)}
                <div style={{height: 10}}/>

                {this.render_detail_item('6', {'final_data_points':new_dps.new_dps, 'y_axis_units':' '+this.props.app_state.loc['2507i']/* hits */})}
                <div style={{height: 10}}/>

                {this.render_used_tags(available_tags, object, selected_tag)}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['2642cg']/* 'Y-Axis: ' */+this.props.app_state.loc['2507h']/* Transaction Hits */, 'details':this.props.app_state.loc['2507g']/* 'X-Axis: Price' */, 'size':'s'})}
            </div>
        )
    }

    get_selected_tag(object){
        if(this.state.selected_price_tag[object['e5_id']] == null){
            return 0
        }else{
            return this.state.selected_price_tag[object['e5_id']]
        }
    }

    get_selected_token(object){
        if(this.state.selected_token_tag[object['e5_id']] == null){
            return 0
        }else{
            return this.state.selected_token_tag[object['e5_id']]
        }
    }

    get_available_tag_data(object){
        const payment_tags = object['ipfs'].entered_indexing_tags.concat(object['ipfs'].entered_title_text.replace(/[^\w\s]|_/g, '').trim().split(/\s+/).filter(word => word.length >= 3))

        const return_object = {}
        payment_tags.forEach(tag => {
            if(this.props.app_state.tag_price_data[tag] != null && this.props.app_state.tag_price_data[tag].length > 0){
                return_object[tag] = this.props.app_state.tag_price_data[tag]
            }
        });

        return return_object
    }

    get_tags_used_tokens_and_price_data(sorted_price_data, filter_e5){
        const used_token_ids = []
        const used_token_price_data = {}
        const used_tokens_max = {}
        const sorted_price_data_to_use = sorted_price_data.filter(function (data_point) {
            return (data_point['e5'] == filter_e5)
        });
        sorted_price_data_to_use.forEach(data_point => {
            const tag_data = data_point['tag_data']
            const amounts = tag_data['amounts']
            amounts.forEach(item => {
                const exchange_id = item['id']
                const amount = item['amount']
                if(!used_token_ids.includes(exchange_id)){
                    used_token_ids.push(exchange_id) 
                    used_tokens_max[exchange_id] = 0   
                }
                if(used_token_price_data[exchange_id] == null){
                    used_token_price_data[exchange_id] = []
                }
                used_token_price_data[exchange_id].push(amount)
                if(bigInt(used_tokens_max[exchange_id]).lesser(amount)){
                    used_tokens_max[exchange_id] = bigInt(amount)
                }
            });
        });

        return { used_token_ids, used_token_price_data, used_tokens_max }
    }

    get_transaction_tag_data_points(used_token_price_data, selected_token, used_tokens_max){
        const data = []
        const price_datapoints = used_token_price_data[selected_token]
        const used_token_max = used_tokens_max[selected_token]
        const price_datapoint_object = {}
        price_datapoints.forEach(data_item => {
            const step = bigInt(used_token_max).divide(1000).plus(1)
            const final_item = bigInt(data_item).divide(step).multiply(step)
            if(price_datapoint_object[final_item] == null){
                price_datapoint_object[final_item] = 0
            }
            price_datapoint_object[final_item]++
        });
        const price_data = Object.keys(price_datapoint_object)
        const price_datapoint_object_as_list = []
        price_data.forEach(price_target_set => {
            price_datapoint_object_as_list.push({'price': price_target_set, 'count': price_datapoint_object[price_target_set]})
        });

        const sorted_price_datapoint_object_as_list = this.sortByAttributeDescending(price_datapoint_object_as_list, 'price').reverse()

        var diff = 0
        while(diff < sorted_price_datapoint_object_as_list[0]['count']){
            diff += (data[data.length-1] || 0.001)*1.001
            data.push(diff)
        }

        for(var i=0; i<sorted_price_datapoint_object_as_list.length; i++){
            const focused_item = sorted_price_datapoint_object_as_list[i]
            data.push(focused_item)

            if(i==sorted_price_datapoint_object_as_list.length-1){
                var diff = sorted_price_datapoint_object_as_list[i]['count']
                while(diff > 0.0001){
                    diff = data[data.length-1]*0.999
                    data.push(diff)
                }
            }
            else{
                var diff = sorted_price_datapoint_object_as_list[i+1]['count'] - sorted_price_datapoint_object_as_list[i]['count']
                while(diff > 0.0001){
                    diff = data[data.length-1]*0.999
                    data.push(diff)
                }
            }
        }

        const starting_price = bigInt(sorted_price_datapoint_object_as_list[0]['price']).minus(bigInt(sorted_price_datapoint_object_as_list[0]['price']).divide(10000))

        const ending_price = bigInt(sorted_price_datapoint_object_as_list[sorted_price_datapoint_object_as_list.length - 1]['price']).divide(10000).plus(bigInt(sorted_price_datapoint_object_as_list[sorted_price_datapoint_object_as_list.length - 1]['price']))

        var xVal = 1, yVal = 0, original_y_val = 0;
        var dps = [];
        var largest = 0;
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        for(var i = 0; i < noOfDps; i++) {
            if(i < 100 && data.length > 200 && xVal < 100 && (factor * (xVal+1)) < data.length){
                var sum = 0
                var slice = data.slice(factor * xVal, factor * (xVal+1))
                for(var j = 0; j < slice.length; j++) {
                    sum += slice[j]
                }
                var result = sum / (slice.length)
                original_y_val = result;
                // yVal =  parseInt(bigInt(result).multiply(100).divide(largest))
                yVal = result
            }
            else{
                original_y_val = data[factor * xVal]
                // yVal = parseInt(bigInt(data[factor * xVal]).multiply(100).divide(largest))
                yVal = data[factor * xVal]
            }
            if((largest) < (yVal)){
                largest = (yVal)
            }
            var indicator = Math.round(yVal) +' '+ this.props.app_state.loc['2507i']/* 'hits' */
            if(yVal != null && !isNaN(yVal)){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0 && yVal != 0){
                    dps.push({x: xVal,y: yVal, indexLabel:""+indicator});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
        }


        const new_dps = []
        const diff_price = ending_price.minus(starting_price)
        const time_chunk_period = diff_price.divide(dps.length - 1);
        const token_symbol = this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[selected_token]
        dps.forEach((dp, index) => {
            const period_of_x = starting_price.plus(bigInt(dp.x).times(time_chunk_period))
            const final_x = this.format_account_balance_figure_minimized(period_of_x) /* + ' '+token_symbol */
            const new_label = dp['indexLabel'] == null ? null : dp['indexLabel']
            
            if(this.props.app_state.graph_type == 2){
                if(index % 3 == 0 || new_label != null){
                    new_dps.push({x: final_x, y: dp.y, label: new_label})
                }
            }else{
                new_dps.push({x: final_x, y: dp.y, label: new_label})
            }
        });

        return { new_dps }
    }

    render_used_tags(items, object, selected_tag){
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_used_tag_item(item, object, index, selected_tag)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_used_tag_item(item, object, index, selected_tag){
        if(item == selected_tag){
            return(
                <div onClick={() => this.when_used_tag_clicked(item, object, index)}>
                    {this.render_detail_item('4', {'text':item, 'textsize':'13px', 'font':this.props.app_state.font})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }
        return(
            <div onClick={() => this.when_used_tag_clicked(item, object, index)}>
                {this.render_detail_item('4', {'text':item, 'textsize':'13px', 'font':this.props.app_state.font})}
            </div>
        )
    }

    when_used_tag_clicked(item, object, index){
        const clone = structuredClone(this.state.selected_price_tag)
        clone[object['e5_id']] = index
        this.setState({selected_price_tag: clone})
    }

    render_used_tokens(items, object, selected_token){
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_used_token_item(item, object, index, selected_token)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_used_token_item(item, object, index, selected_token){
        const title = this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+item]
        const details = this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]
        const image = this.props.app_state.token_thumbnail_directory[object['e5']][item]
        if(item == selected_token){
            return(
                <div onClick={() => this.when_used_token_clicked(item, object, index)}>
                    {this.render_detail_item('14', {'title':title, 'image':image, 'details':details, 'size':'s', 'img_size':30})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }
        return(
            <div onClick={() => this.when_used_token_clicked(item, object, index)}>
                {this.render_detail_item('14', {'title':title, 'image':image, 'details':details, 'size':'s', 'img_size':30})}
            </div>
        )
    }

    when_used_token_clicked(item, object, index){
        const clone = structuredClone(this.state.selected_token_tag)
        clone[object['e5_id']] = index
        this.setState({selected_token_tag: clone})
    }













    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var size = this.props.screensize
        var width = size == 'm' ? this.props.app_state.width/2 : this.props.app_state.width
        var uploaded_data = {}
        if(item_id == '3' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12')uploaded_data = this.props.app_state.uploaded_data
        return(
            <div>
                <ViewGroups show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme}  width={width} show_images={this.props.show_images.bind(this)} select_deselect_tag={this.props.select_deselect_tag.bind(this)}/>
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

    calculate_bar_width(num){
        if(num == null) return '0%'
        var last_two_digits = num.toString().slice(0, 1)+'0';
        if(num > 10){
            last_two_digits = num.toString().slice(0, 2);
        }
        return last_two_digits+'%'
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

    format_account_balance_figure_minimized(amount){
        if(amount == null){
            amount = 0;
        }
        if(amount < 1_000_000){
            return number_with_commas(amount.toString())
        }else{
            var power = amount.toString().length - 6
            return number_with_commas(amount.toString().substring(0, 6)) +'e'+power
        }
        
    }








}




export default ContractorDetailsSection;