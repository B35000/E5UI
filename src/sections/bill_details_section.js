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
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function start_and_end(str) {
    if (str.length > 13) {
        return str.substr(0, 6) + '...' + str.substr(str.length-6, str.length);
    }
    return str;
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class BillDetailsSection extends Component {
    
    state = {
        selected: 0, 
        get_navigate_view_bills_list_detail_tags: this.get_navigate_view_bills_list_detail_tags(),
    };

    get_navigate_view_bills_list_detail_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e',this.props.app_state.loc['2232']/* 'details' */, this.props.app_state.loc['3071o']/* 'payments' */],[1]
          ],
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.check_for_new_payments(), this.props.app_state.details_section_syncy_time);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    check_for_new_payments(){
        if(this.props.selected_bill_item != null){
            var object = this.get_item_in_array(this.get_bills_data(), this.props.selected_bill_item);
            if(object == null) return;
            this.props.perform_bill_object_payment_search(object)
        }
    }




    render(){
        return(
            <div>
                {this.render_bills_list_detail()}
            </div>
        )
    }

    render_bills_list_detail(){
        if(this.props.selected_bill_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_bills_details_section()}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 0px 0px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.get_navigate_view_bills_list_detail_tags} tag_size={'l'} when_tags_updated={this.when_navigate_view_bills_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
        
    }

    when_navigate_view_bills_list_detail_tags_object_updated(tag_obj){
        this.setState({get_navigate_view_bills_list_detail_tags: tag_obj})
    }

    get_item_in_array(object_array, id){
        var object = object_array.find(x => x['e5_id'] === id);
        return object
    }

    render_bills_details_section(){
        var selected_item = this.get_selected_item(this.state.get_navigate_view_bills_list_detail_tags, this.state.get_navigate_view_bills_list_detail_tags['i'].active)
        var item = this.get_item_in_array(this.get_bills_data(), this.props.selected_bill_item)
        // console.log('bills_details_section', item, this.props.selected_bill_item)

        if(item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }

        if(selected_item == this.props.app_state.loc['2232']/* 'details' */){
            return(
                <div>
                    {this.render_bills_main_details_section(item)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['3071o']/* 'payments' */){
            return(
                <div>
                    {this.render_bill_payments_responses(item)}
                </div>
            )
        }
        
    }

    get_bills_data(){
        return this.props.get_bill_items('')
    }


    render_bills_main_details_section(object){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-55
        const item = this.format_bill_object(object)
        var recurring_enabled = object['ipfs'].recurring_enabled == true ? this.props.app_state.loc['3068bb']/* 'recurring-bill' */: this.props.app_state.loc['3068bc']/* 'one-time' */
        return(
            <div style={{ 'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 5px 10px', 'padding':'0px 10px 0px 10px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 0px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    
                    <div onClick={() => this.copy_identifier_to_clipboard(object['ipfs'].identifier)}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{height: 10}}/>
                    {this.show_moderator_note_if_any(object)}

                    <div onClick={() => this.add_to_contacts2(object)}>
                        {this.render_detail_item('3', {'title':''+this.get_senders_name(object['event'].returnValues.p2, object), 'details':this.props.app_state.loc['2070']/* 'Author' */, 'size':'l'})}
                    </div>
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':''+(this.get_senders_name(object['event'].returnValues.p1, object)), 'details':this.props.app_state.loc['888']/* 'Recipient' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':''+(this.get_senders_name(object['ipfs'].transfer_recipient, object)), 'details':this.props.app_state.loc['3068au']/* 'Payment Target' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'details':this.props.app_state.loc['3068bd']/* 'Bill Type' */, 'title':recurring_enabled, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_total_payments_data(object)}

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['age'])}
                    </div>

                    {this.render_last_payment_time_data(object)}

                    {this.render_pdf_files_if_any(object)}

                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3069']/* 'Requested Amounts.' */, 'details':this.props.app_state.loc['3070']/* 'Below are the amounts requested in the bill.' */, 'size':'l'})}
                    <div style={{height: 10}}/>
                    {this.render_set_prices_list_part(object)}

                    {this.render_pay_button_if_recipient(object)}

                    {this.render_pin_post_button(object)}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    show_moderator_note_if_any(object){
        if(this.props.app_state.moderator_notes_by_my_following.length == 0  || this.props.app_state.user_account_id[object['e5']] == object['author']) return;
        var note_to_apply = []
        for(var n=0; n<this.props.app_state.moderator_notes_by_my_following.length; n++){
            const focused_note = this.props.app_state.moderator_notes_by_my_following[n]
            var hit_count = 0
            for(var k=0; k<focused_note['keywords'].length; k++){
                const keyword_target = focused_note['keywords'][k]
                if(this.get_senders_name(object['author'], object) == keyword_target || object['author'] == keyword_target){
                    hit_count++
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
                {this.render_detail_item('8', {'details':title,'title':details, 'size':'s', 'image':thumbnail, 'border_radius':'15%'})}
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



    get_senders_name(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    format_bill_object(object){
        var tags = []
        var exchanges = object['ipfs'].price_data
        var obj = this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)
        exchanges.forEach(exchange_transfer => {
            var exchange = exchange_transfer['id']
            var exchange_name = obj[object['e5']+exchange]
            tags.push(exchange_name)
        });
        var details = object['ipfs'] == null ? 'Identifier' : object['ipfs'].identifier
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var myid = this.props.app_state.user_account_id[object['e5']]
        if(myid == null) myid = 1;
        var sender = object['event'].returnValues.p2
        var recipient = object['event'].returnValues.p1
        var title = this.props.app_state.loc['2738ab']/* 'From $' */
        title = title.replace('$', this.get_sender_title_text(sender, object))
        if(myid == sender){
            title = this.props.app_state.loc['2738ac']/* 'To $' */
            title = title.replace('$',this.get_sender_title_text(recipient, object))
        }
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':[], 'when_tapped':''},
            'id':{'title':object['e5']+' • '+title, 'details':details, 'size':'l', 'border_radius':'0%'},
            'age':{'style':'l', 'title':this.props.app_state.loc['1744']/* 'Block Number' */, 'subtitle':'age', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)} ago`, },
            'min':{'details':object['e5']+' • '+details, 'title':title, 'size':'l', 'border_radius':'0%'}
        }
    }

    get_sender_title_text(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    render_set_prices_list_part(object){
        var items = [].concat(object['ipfs'].price_data)
        var e5 = object['e5']
        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto'}}>
                        <div style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <div style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img alt="" src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
            )
        }else{
            return(
                <div style={{overflow: 'auto'}}>
                    <div style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <div style={{'padding': '1px 1px 1px 1px'}}>
                                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['view_group_card_item_background'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
        
    }

    copy_identifier_to_clipboard(text){
        navigator.clipboard.writeText(text)
        this.props.notify(this.props.app_state.loc['3071']/* 'Identifier copied to clipboard.' */, 2000)
    }



    render_pay_button_if_recipient(object){
        var target = object['target']
        var myid = this.props.app_state.user_account_id[object['e5']]
        if(myid == null) myid = 1
        if(target.toString() != myid.toString()){
            return
        }
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['3071a']/* 'Pay Bill.' */ , 'details':this.props.app_state.loc['3071b'] /* 'Make all the payments requested in the bill.' */ })}
                <div style={{height:10}}/>
                <div onClick={()=> this.pay_bill(object)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3071a']/* 'Pay Bill.' */, 'action':''},)}
                </div>
            </div>
        )
    }

    pay_bill(object){
        this.props.show_dialog_bottomsheet({'objects':[object] }, 'confirm_pay_bill')
    }

    render_pin_post_button(object){
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3071d']/* 'Pin the Bill to  your feed.' */, 'title':this.props.app_state.loc['3071c']/* 'Pin Bill' */})}
                <div style={{height:10}}/>
                <div onClick={()=> this.when_pin_post_clicked(object)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3071c']/* 'Pin/Unpin Bill' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_pin_post_clicked(object){
        this.props.pin_bill(object)
    }

    render_last_payment_time_data(object){
        var results_items = this.load_itransfer_result_items(object)
        var last_payment_time = results_items.length > 0 ? results_items[0]['time'] : 0
        if(last_payment_time != 0){
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3071q']/* 'Last Payment Time.' */, 'details':this.props.app_state.loc['3071r']/* 'The last time the bill was paid.' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':''+(new Date(last_payment_time*1000)), 'details':this.get_time_diff((Date.now()/1000) - (parseInt(last_payment_time)))+this.props.app_state.loc['1698a']/* ' ago' */, 'size':'l'})}
                    <div style={{height: 10}}/>
                </div>
            )
        }
    }

    render_total_payments_data(object){
        var results_items = this.load_itransfer_result_items(object)
        var total_payments = results_items.length

        if(object['ipfs'].recurring_enabled == true){
            var text = total_payments > 0 ? number_with_commas(total_payments) : '000'
            return(
                <div>
                    {this.render_detail_item('3', {'details':this.props.app_state.loc['3071p']/* 'Total Number of Payments Made.' */, 'title':text, 'size':'l'})}
                    <div style={{height: 10}}/>
                </div>
            )
        }
    }











    render_bill_payments_responses(object){
        var he = this.props.height-50
        return(
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px'}}>
                <div style={{ 'overflow-y': 'auto', height: he, padding:'5px 0px 5px 0px'}}>
                    {this.render_bill_payment_title(object)}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px'}}/>
                    {this.render_bill_payment_items(object)}
                </div>
            </div>
        )
    }

    render_bill_payment_title(object){
        const item = this.format_bill_object(object)
        return(
            <div style={{padding:'5px 5px 5px 5px'}}>
                {this.render_detail_item('3', item['min'])} 
            </div>
        )
    }

    render_bill_payment_items(object){
        var middle = this.props.height-200;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.load_itransfer_result_items(object))
        
        if(items.length == 0){
            items = [0,1]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    {this.props.app_state.bill_payment_results[object['e5_id']] == null ? this.render_small_skeleton_object() : this.render_small_empty_object()}
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
                                    {this.render_itransfer_item(item)}
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

    load_itransfer_result_items(bill_object){
        var object = this.get_bill_payment_responses(bill_object)
        if(object == null || object.length == 0) return []
        
        var blocks = Object.keys(object)
        var object_array = []
        blocks.forEach(block => {
            var sender_accounts = Object.keys(object[block])
            sender_accounts.forEach(account => {
                var transfers = this.process_transfers(object[block][account])
                var time = object[block][account][0].returnValues.p5/* timestamp */
                object_array.push({'account':account, 'block':block, 'transfers':transfers, 'time':time, 'e5':bill_object['e5']})
            });
        });

        return this.sortByAttributeDescending(object_array, 'time')
    }

    get_bill_payment_responses(object){
        var payments = this.props.app_state.bill_payment_results[object['e5_id']]
        // console.log('payments', payments)
        if(payments == null) return []
        return payments
    }

    process_transfers(transfers){
        var obj = {}
        transfers.forEach(transfer => {
            var exchange = transfer.returnValues.p1
            var amount = transfer.returnValues.p4/* amount */
            var depth = transfer.returnValues.p7/* depth */
            if(obj[exchange] == null){
                obj[exchange] = bigInt('0')
            }
            var actual_amount = this.get_actual_number(amount, depth)
            obj[exchange] = bigInt(obj[exchange]).plus(bigInt(actual_amount))
        });

        var exchange_transfers = Object.keys(obj)
        var final_transfers = []
        exchange_transfers.forEach(key => {
            final_transfers.push({'amount':obj[key], 'exchange':key})
        });

        return final_transfers
    }

    get_actual_number(number, depth){
        var p = (bigInt(depth).times(72)).toString().toLocaleString('fullwide', {useGrouping:false})
        var depth_vaule = bigInt(('1e'+p))
        return (bigInt(number).times(depth_vaule)).toString().toLocaleString('fullwide', {useGrouping:false})
    }

    render_itransfer_item(item){
        var alias = this.get_senders_name_or_you2(item['account'], item['e5'])
        return(
            <div>
                {/* {this.render_detail_item('3', {'title':alias, 'details':item['account'], 'size':'l', 'border_radius':'0%'},)}
                <div style={{height: 3}}/> */}

                {/* {this.render_detail_item('3', {'title':number_with_commas(item['block']), 'details':this.props.app_state.loc['3068x'] Block Number, 'size':'l', 'border_radius':'0%'},)}
                <div style={{height: 3}}/> */}

                {this.render_detail_item('3', {'title':''+(new Date(item['time']*1000)), 'details':this.get_time_diff((Date.now()/1000) - (parseInt(item['time'])))+this.props.app_state.loc['1698a']/* ' ago' */, 'size':'l'})}
                <div style={{height: 3}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['view_group_card_item_background'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    <div style={{'margin':'0px 0px 0px 5px'}}>
                        {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'12px','text':this.props.app_state.loc['3068y']/* All Transfers */})}
                    </div>
                    
                    {item['transfers'].map((transfer, index) => (
                        <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['1182']/* 'Amount' */, 'number':transfer['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[transfer['exchange']]})}>
                            {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(transfer['amount']), 'number':this.format_account_balance_figure(transfer['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[transfer['exchange']], })}
                        </div>
                    ))}
                </div>
                {this.render_detail_item('0')}
            </div>
        )
    }

    get_senders_name_or_you2(sender, e5){
        if(sender == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* You. */
        }
        var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? this.props.app_state.loc['1591']/* Unknown */ : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
        return alias
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
                <ViewGroups show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme}  width={width}/>
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

}




export default BillDetailsSection;