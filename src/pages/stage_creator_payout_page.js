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

class StageCreatorPayoutPage extends Component {
    
    state = {
        selected: 0, id:makeid(8), channel_obj:null, get_new_creator_payout_action_page_tags_object:this.get_new_creator_payout_action_page_tags_object(), batch_size:23, searched_user:'',
    };

    set_data(channel_obj){
        this.setState({channel_obj: channel_obj})
    }

    get_new_creator_payout_action_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['3075']/* 'stage-payouts' */], [1]
            ],
        };
    }








    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_new_creator_payout_action_page_tags_object} tag_size={'l'} when_tags_updated={this.when_get_new_creator_payout_action_page_tags_object_updated.bind(this)} theme={this.props.theme}/>
                
                {this.render_everything()}
            </div>
        )
    }

    when_get_new_creator_payout_action_page_tags_object_updated(tag_obj){
        this.setState({get_new_creator_payout_action_page_tags_object: tag_obj})   
    }


    render_everything(){
        var size = this.props.app_state.size
        if(this.state.channel_obj == null) return;

        if(size == 's'){
            return(
                <div>
                    {this.render_stage_creator_payout_data()}
                    {this.render_detail_item('0')}
                    {this.render_payout_information()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_stage_creator_payout_data()}
                        <div style={{height:10}}/>
                        {this.render_empty_views(3)}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_payout_information()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_stage_creator_payout_data()}
                        <div style={{height:10}}/>
                        {this.render_empty_views(3)}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_payout_information()}
                    </div>
                </div>
            )
        }
    }


    render_stage_creator_payout_data(){
        var files = this.get_logged_files()
        var logged_files = files.length
        var load_proportion = this.get_loaded_proportion(files) * 100
        var subscriptions = this.state.channel_obj['ipfs'].selected_creator_group_subscriptions
        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'15px', 'text':this.props.app_state.loc['3075a']/* 'Stage royalty payouts for the creators in your creator group for the months preceding this month.' */})}
                <div style={{height:10}}/>

                {this.render_channel_object()}
                <div style={{height:10}}/>

                {this.render_creators()}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3075d']/* 'Proportion Loaded.' */, 'subtitle':this.format_power_figure(logged_files), 'barwidth':this.calculate_bar_width(logged_files), 'number':this.format_account_balance_figure(logged_files), 'barcolor':'', 'relativepower':this.props.app_state.loc['3075c']/* 'files' */, })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3075b']/* 'Currently Tracked Files.' */, 'subtitle':this.format_power_figure(load_proportion), 'barwidth':(Math.floor(load_proportion)+'%'), 'number':(load_proportion+'%'), 'barcolor':'', 'relativepower':this.props.app_state.loc['1881']/* 'proportion' */, })}
                </div>
                <div style={{height:10}}/>

                {this.render_subscriptions()}
                <div style={{height:10}}/>

                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'13px', 'text':this.props.app_state.loc['3075g']/* '$ subscriptions used.' */.replace('$', subscriptions.length)})}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2865']/* 'Set the total number of transactions per payout batch.' */, 'title':this.props.app_state.loc['2864']/* 'Transactions Per Batch.' */})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2874']/* 'transactions per batch' */, 'number':this.state.batch_size, 'relativepower':this.props.app_state.loc['2867']/* 'transactions' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2874']/* 'transactions per batch' */, 'subtitle':this.format_power_figure(this.state.batch_size), 'barwidth':this.calculate_bar_width(this.state.batch_size), 'number':this.format_account_balance_figure(this.state.batch_size), 'barcolor':'', 'relativepower':this.props.app_state.loc['2867']/* 'transactions' */, })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={999} when_number_picker_value_changed={this.when_transactions_per_batch_value_picked.bind(this)} theme={this.props.theme} power_limit={63}/>
                
                {this.render_calculate_payout_button_if_ready(load_proportion)}

            </div>
        )
    }

    when_transactions_per_batch_value_picked(number){
        this.setState({batch_size: number})
    }

    render_calculate_payout_button_if_ready(proportion){
        const existing_stagings = this.props.app_state.channel_payout_stagings[this.state.channel_obj['e5_id']]
        if(proportion == 100 && this.has_all_subscriptions_loaded() && existing_stagings != null){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3075f']/* 'Calculate the required payout amounts to each creator.' */, 'title':this.props.app_state.loc['3075e']/* 'Calculate Payouts' */})}
                    <div style={{height:10}}/>

                    <div onClick={()=>this.start_payout_calculation_process()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2081']/* 'Perform Action' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    

    start_payout_calculation_process(){
        var files = this.get_logged_files()
        var file_view_data = []

        files.forEach(file => {
            var view_data = this.get_file_view_data(file['file'])
            if(view_data != null && this.is_file_nitro_valid(file['file'])){
                var obj = structuredClone(file)
                obj['view_data'] = view_data
                file_view_data.push(obj)
            }
        });

        const existing_stagings = this.props.app_state.channel_payout_stagings[this.state.channel_obj['e5_id']]
        const now = new Date();
        const firstOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const last_month_date = new Date(firstOfThisMonth.getTime() - 1);

        var filter_value = 60*60*24*31
        if(existing_stagings != null && existing_stagings.length > 0){
            const record_end_time = existing_stagings[0]['ipfs'].payout_information.end_time
            const difference = last_month_date.getTime() - record_end_time
            filter_value = Math.floor(difference/1000);

            if(filter_value < (60*60*24*31)){
                this.props.notify(this.props.app_state.loc['3075ab']/* 'Youve already staged a payout within the last month.' */, 9300);
                return;
            }
        }else{
            const channel_creation_time = this.state.channel_obj['event'].returnValues.p6/* timestamp */
            filter_value = Math.floor(last_month_date.getTime()/1000) - channel_creation_time

            if(filter_value < (60*60*24*31)){
                this.props.notify(this.props.app_state.loc['3075ad']/* 'You need to wait at least a month after the creation of the channel first.' */, 9300);
                return;
            }
        }

        this.props.notify(this.props.app_state.loc['3075h']/* 'Sending payout data request...' */, 2300);
        this.props.calcualte_creator_payouts(this.state.channel_obj, file_view_data, filter_value)
    }
    
    get_file_view_data(file_link){
        var ecid_obj = this.get_cid_split(file_link)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return false
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        var file = data['hash']
        var stream_data = this.props.app_state.file_streaming_data[file]
        if(stream_data != null){
            return stream_data
        }
    }

    is_file_nitro_valid(file_link){
        var ecid_obj = this.get_cid_split(file_link)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return false
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        var nitro_id = data['nitro']
        var selected_creator_group_nitros = this.state.channel_obj['ipfs'].selected_creator_group_nitros
        if(selected_creator_group_nitros != null && selected_creator_group_nitros.length > 0){
            if(!selected_creator_group_nitros.includes(nitro_id)){
                return false
            }
        }
        return true
    }

    has_all_subscriptions_loaded(){
        var has_all_subscriptions_loaded = true;
        var items = this.state.channel_obj['ipfs'].selected_creator_group_subscriptions
        items.forEach(item => {
            var e5 = 'E'+item.split('E')[1]
            var id = item.split('E')[0]
            var subscription_item = this.props.app_state.created_subscription_object_mapping[e5][id]
            if(subscription_item == null){
                has_all_subscriptions_loaded = false;
            }
        });
        return has_all_subscriptions_loaded
    }

    render_subscriptions(){
        var items = this.state.channel_obj['ipfs'].selected_creator_group_subscriptions
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.reverse().map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_subscription_item(item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_subscription_item(item){
        var e5 = 'E'+item.split('E')[1]
        var id = item.split('E')[0]
        var subscription_item = this.props.app_state.created_subscription_object_mapping[e5][id]
        var opacity = 0.7
        var details = '????';
        if(subscription_item != null){
            opacity = 1.0
            details = this.truncate(subscription_item['ipfs'].entered_title_text, 17)
        }
        return(
            <div style={{'opacity':opacity}}>
                {this.render_detail_item('3', {'title':' • '+id, 'details':details, 'size':'l', 'title_image':this.props.app_state.e5s[e5].e5_img})}
            </div>
        )
    }
    
    truncate(source, size) {
        var firstLine = source.includes("\n") ? source.split("\n")[0] : source;
        return firstLine.length > size ? firstLine.slice(0, size - 1) + "…" : firstLine;
    }

    render_creators(){
        var items = this.state.channel_obj['ipfs'].creators
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.reverse().map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_creator_item(item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_creator_item(item){
        return(
            <div>
                {this.render_detail_item('3', {'title':' • '+this.get_data(item).id, 'details':this.get_senders_name(item), 'size':'l', 'title_image':this.props.app_state.e5s[this.get_data(item).e5].e5_img})}
            </div>
        )
    }

    get_data(item){
        var obj = item.split(':')
        return { e5: obj[0], id: obj[1]}
    }

    get_senders_name(item){
        var data_item = this.get_data(item)
        var sender = data_item.id
        var e5 = data_item.e5
        if(sender == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var obj = this.props.app_state.alias_bucket[e5]
            var alias = (obj[sender] == null ? this.props.app_state.loc['c311m']/* 'Account' */ : obj[sender])
            return alias
        }
    }

    round_off(float_number){
        return (Math.round(float_number * 100) / 100)
    }

    get_logged_files(){
        var object = this.state.channel_obj
        var uploaded_files = this.props.app_state.object_creator_files[object['e5_id']]
        
        if(uploaded_files == null){
            return []
        }
        return uploaded_files
    }

    get_loaded_proportion(files){
        var total_files = files.length
        var loaded_files = 0

        files.forEach(file => {
            if(this.has_file_loaded(file['file'])){
                loaded_files++
            }
        });

        if(loaded_files == 0){
            return 0
        }
        return this.round_off(loaded_files / total_files)
    }

    has_file_loaded(file){
        var ecid_obj = this.get_cid_split(file)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return false
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        if(data == null) return false
        if(data['data'] == null) return false
        var file = data['hash']
        var nitro_id = data['nitro']
        if(nitro_id != null){
            var stream_data = this.props.app_state.file_streaming_data[file]
            if(stream_data == null){
                return false
            }
        }
        return true
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
        var sender = this.get_senders_name2(object['event'].returnValues.p5, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id']+sender, 'details':extra+title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },
            'min':{'details':object['e5']+' • '+object['id']+sender, 'title':extra+title, 'size':'l', 'border_radius':'0%'}
        }
    }

    get_senders_name2(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return ' • '+this.props.app_state.loc['1694']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? '' : ' • '+this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }






    render_payout_information(){
        const object = this.state.channel_obj
        const payout_information = this.props.app_state.stage_creator_payout_results[object['e5_id']]
        if(payout_information == null){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }

        const final_payment_info = payout_information.final_payment_info
        const total_payment_data_for_subscriptions = 
        payout_information.total_payment_data_for_subscriptions
        const start_time = payout_information.start_time
        const end_time = payout_information.end_time
        const total_data_bytes_streamed = payout_information.total_data_bytes_streamed
        const valid_user_stream_data = payout_information.valid_user_stream_data

        const formatted_size = this.format_data_size(total_data_bytes_streamed)
        const fs = formatted_size['size']+' '+formatted_size['unit']

        return(
            <div>
                {this.render_detail_item('3', {'details':this.props.app_state.loc['3075j']/* 'Starting Time.' */, 'title':''+(new Date(start_time)), 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['3075k']/* 'Ending Time.' */, 'title':''+(new Date(end_time)), 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['3075l']/* 'Total Data Streamed.' */, 'title':fs, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('0')}
                {this.render_total_payment_data_for_subscriptions_data(total_payment_data_for_subscriptions)}
                
                {this.render_detail_item('0')}
                {this.render_final_payment_info(final_payment_info, valid_user_stream_data, total_data_bytes_streamed)}

                {this.render_detail_item('0')}
                {this.render_finish_button()}
            </div>
        )
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
        var items = this.state.channel_obj['ipfs'].selected_creator_group_subscriptions
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
        const default_subscription = this.state.channel_obj['ipfs'].selected_creator_group_subscriptions[0]
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




    render_final_payment_info(final_payment_info, valid_user_stream_data, total_data_bytes_streamed){
        var user_id_keys = this.filter_user_id_keys_by_searched_text(Object.keys(final_payment_info))
        return(
            <div>
                {this.render_detail_item('3', {'details':this.props.app_state.loc['3075o']/* 'Creator Payout Info' */, 'title':this.props.app_state.loc['3075p']/* 'Below is the payout information for each creator.' */, 'size':'l'})}
                <div style={{height:10}}/>

                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['904']/* 'Account ID' */} when_text_input_field_changed={this.when_searched_user_input_changed.bind(this)} text={this.state.searched_user} theme={this.props.theme}/>
                <div style={{height:10}}/>
                {this.render_creators2(user_id_keys)}
                <div style={{height:10}}/>
                {this.render_selected_creator_payout_information(final_payment_info, valid_user_stream_data, total_data_bytes_streamed)}
            </div>
        )
    }

    filter_user_id_keys_by_searched_text(user_id_keys){
        var selected_keys = []
        var searched_text = this.state.searched_user
        user_id_keys.forEach(user_id => {
            if(searched_text == ''){
                selected_keys.push(user_id)
            }else{
                var user_name = this.get_senders_name(user_id)
                var account_id = this.get_data(user_id).id
                if(user_name.toLowerCase().startsWith(searched_text.toLowerCase())){
                    selected_keys.push(user_id)
                }
                else if(account_id.startsWith(searched_text)){
                    selected_keys.push(user_id)
                }
            }
        });

        return selected_keys
    }

    when_searched_user_input_changed(text){
        this.setState({searched_user: text})
    }

    render_creators2(items){
        if(items.length == 0){
            items = [1, 2, 3]
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_empty_horizontal_list_item2()}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.reverse().map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_creator_item_clicked(item)}>
                            {this.render_creator_item2(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_empty_horizontal_list_item2(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div>
                <div style={{height:43, width:90, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                    </div>
                </div>
            </div>
        )
    }

    render_creator_item2(item, pos){
        if(this.state.selected_creator_item == item || (pos == 0 && this.state.selected_creator_item == null)){
            return(
                <div>
                    {this.render_detail_item('3', {'title':' • '+this.get_data(item).id, 'details':this.get_senders_name(item), 'size':'l', 'title_image':this.props.app_state.e5s[this.get_data(item).e5].e5_img})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }
        return(
            <div>
                {this.render_detail_item('3', {'title':' • '+this.get_data(item).id, 'details':this.get_senders_name(item), 'size':'l', 'title_image':this.props.app_state.e5s[this.get_data(item).e5].e5_img})}
            </div>
        )
    }

    when_creator_item_clicked(item){
        if(item == this.state.selected_creator_item){
            this.setState({selected_creator_item: null})
        }else{
            this.setState({selected_creator_item: item})
        }
    }

    render_selected_creator_payout_information(final_payment_info, valid_user_stream_data, total_data_bytes_streamed){
        const all_creators = Object.keys(final_payment_info)
        if(all_creators.length == 0){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }
        const selected_creator_item = this.state.selected_creator_item == null ? all_creators[0] : this.state.selected_creator_item
        const selected_creator_payout_data = final_payment_info[selected_creator_item]
        const selected_creator_payout_exchanges = Object.keys(selected_creator_payout_data)
        const selected_creator_streaming_total = valid_user_stream_data[selected_creator_item]
        var proportion = bigInt(selected_creator_streaming_total).multiply(100).divide(total_data_bytes_streamed)
        if(bigInt(selected_creator_streaming_total).lesser(bigInt('1e14')) && bigInt(total_data_bytes_streamed).lesser(bigInt('1e14'))){
            proportion = ((selected_creator_streaming_total * 100) / total_data_bytes_streamed).toFixed(2)
        }
        if(proportion >= 100){
            proportion = 99.99
        }
        const formatted_size = this.format_data_size(selected_creator_streaming_total)
        const fs = formatted_size['size']+' '+formatted_size['unit']

        var transfer_data = []
        selected_creator_payout_exchanges.forEach(exchange_e5_id => {
            var item_data = this.get_data(exchange_e5_id)
            var transfer_amount = selected_creator_payout_data[exchange_e5_id]
            transfer_data.push({'exchange':item_data.id, 'e5':item_data.e5, 'amount':transfer_amount})
        });

        return(
            <div>
                {this.render_detail_item('3', {'details':this.props.app_state.loc['3075r']/* 'Total Data Sreamed for Creators Files.' */, 'title':fs, 'size':'l'})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3075q']/* 'Streaming proportion' */, 'subtitle':this.format_power_figure(proportion), 'barwidth':Math.floor(proportion)+'%', 'number':proportion+'%', 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1881']/* 'proportion' */,})}
                </div>
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    {transfer_data.map((item, index) => (
                        <div onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[item['e5']+item['exchange']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['exchange']]})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[item['e5']+item['exchange']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['exchange']], })}
                        </div>
                    ))}
                </div>
            </div>
        )
    }



    render_finish_button(){
        return (
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3075s']/* 'Stage Payout Data.' */, 'details':this.props.app_state.loc['3075t']/* 'Post this payout data in your channel for the creators to see.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <div style={{'padding': '5px'}} onClick={() => this.when_record_payout_tapped()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3075u']/* Stage Payout */, 'action':''})}
                </div>
            </div>
        )
    }

    when_record_payout_tapped(){
        const batch_size = this.state.batch_size
        if(batch_size == 0){
            this.props.notify(this.props.app_state.loc['3075v']/* 'You cant use a batch size of 0.' */, 4700)
            return;
        }
        else if(!this.can_sender_make_creator_payout_with_this_channel()){
            this.props.notify(this.props.app_state.loc['3075aa']/* 'You cant stage a creator payout with the same channel twice in one run.' */, 7700)
            return;
        }

        const object = this.state.channel_obj
        const payout_information = this.props.app_state.stage_creator_payout_results[object['e5_id']]
        const final_payment_info = payout_information.final_payment_info
        const user_account_data = payout_information.user_account_data
        const all_creators = Object.keys(final_payment_info)
        const creator_groups = this.split_array(all_creators, batch_size)

        const payout_info = {}
        for(var i=0; i<creator_groups.length; i++){
            const focused_creator_group = creator_groups[i]
            const focused_creator_group_id = makeid(7)
            
            for(var j=0; j<focused_creator_group.length; j++){
                const creator_e5_id = all_creators[i]
                const creator_info = user_account_data[creator_e5_id]
                const selected_creator_payout_data = final_payment_info[creator_e5_id]
                const selected_creator_payout_exchanges = Object.keys(selected_creator_payout_data)

                selected_creator_payout_exchanges.forEach(exchange_e5_id => {
                    var item_data = this.get_data(exchange_e5_id)
                    var transfer_amount = selected_creator_payout_data[exchange_e5_id]
                    if(payout_info[item_data.e5] == null){
                        payout_info[item_data.e5] = {}
                    }
                    if(payout_info[item_data.e5][focused_creator_group_id] == null){
                        payout_info[item_data.e5][focused_creator_group_id] = []
                    }
                    const creator_account_id = creator_info['accounts'][item_data.e5]
                    const creator_account_address = creator_info['address']
                    
                    payout_info[item_data.e5][focused_creator_group_id].push({'exchange':item_data.id, 'e5':item_data.e5, 'amount':transfer_amount, 'recipient_account':creator_account_id, 'recipient_address':creator_account_address})
                });
            }
        }
        
        const obj = {
            id:this.state.id, type: this.props.app_state.loc['3075w']/* 'stage-creator-payout' */,
            entered_indexing_tags:[
                this.props.app_state.loc['3075x']/* 'stage' */, 
                this.props.app_state.loc['3075z']/* 'creator' */,
                this.props.app_state.loc['3075y']/* 'payout' */,
                this.props.app_state.loc['3074bs']/* 'result' */, 
            ],
            e5: this.state.channel_obj['e5'], 
            payout_information: payout_information, 
            channel_obj: this.state.channel_obj,
            payout_transaction_data: payout_info,
        }

        this.props.add_staging_result_transaction_to_stack(obj)
        this.props.notify(this.props.app_state.loc['18']/* 'Transaction added to stack' */, 700)
    }

    split_array(arr, chunkSize) {
        const chunks = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
          chunks.push(arr.slice(i, i + chunkSize));
        }
        return chunks;
    }

    can_sender_make_creator_payout_with_this_channel(){
        var stack_transactions = this.props.app_state.stack_items
        const object = this.state.channel_obj
        for(var i=0; i<stack_transactions.length; i++){
            if(stack_transactions[i].type == this.props.app_state.loc['3075w']/* 'stage-creator-payout' */ && stack_transactions[i].channel_obj['e5_id'] == object['e5_id']){
                return false
            }
        }
        return true
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
        else if(size > (1024^4)){
            return {'size':parseFloat(size/(1024^4)).toFixed(3), 'unit':'TBs'}
        }
        else if(size > (1024^3)){
            return {'size':parseFloat(size/(1024^3)).toFixed(3), 'unit':'GBs'}
        }
        else if(size > (1024^2)){
            return {'size':parseFloat(size/(1024^2)).toFixed(3), 'unit':'MBs'}
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

    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
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

    get_number_width(number){
        if(number == null) return '0%'
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
    }

}




export default StageCreatorPayoutPage;