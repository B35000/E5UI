// Copyright (c) 2023 - Present, Bry Onyoni
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
import NumberPicker from './../components/number_picker';
import TextInput from './../components/text_input';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class BulkUpdateOrderStatusPage extends Component {
    
    state = {
        selected: 0, storefront:null, get_configure_order_updates_structures_title_tags_object:this.get_configure_order_updates_structures_title_tags_object(), added_identifiers:''
    };




    get_configure_order_updates_structures_title_tags_object(){
        const obj = {
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', this.props.app_state.loc['3121']/* 'update-orders 📝' */], [1]
            ],
        };

        return obj
    }





    set_data(object){
        this.setState({storefront: object, e5: object['e5']})
    }






    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
               <Tags font={this.props.app_state.font} app_state={this.props.app_state} page_tags_object={this.state.get_configure_order_updates_structures_title_tags_object} tag_size={'l'} when_tags_updated={this.when_get_configure_order_updates_structures_title_tags_object_updated.bind(this)} theme={this.props.theme}/>

               {this.render_everything()}
            </div>
        )
    }

    when_get_configure_order_updates_structures_title_tags_object_updated(tag_obj){
        this.setState({get_configure_order_updates_structures_title_tags_object: tag_obj})
    }







    render_everything(){
        if(this.state.storefront == null) return;
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_entry_selectors()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_entry_selectors()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_entry_selectors()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
            )
        }
    }

    render_entry_selectors(){
        const current_progress = this.props.app_state.bulk_update_progress_data[this.state.storefront['e5_id']]
        const alpha = current_progress != null ? 0.5 : 1.0
        return(
            <div>
                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3121a']/* 'Update Order Statuses.' */, 'details': this.props.app_state.loc['3121b']/* 'Update the status of multiple orders that share the same status update value.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                {this.render_storefront_item(this.state.storefront)}
                <div style={{ height:10 }}/>

                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3121c']/* 'Order Identifiers.' */, 'details': this.props.app_state.loc['3121d']/* 'Just paste the order identifiers you wish to update. Each should be separated by a space or a comma.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>

                <TextInput font={this.props.app_state.font} height={90} placeholder={this.props.app_state.loc['3121e']/* 'Identifiers...' */} when_text_input_field_changed={this.when_added_identifiers_input_field_changed.bind(this)} text={this.state.added_identifiers} theme={this.props.theme}/> 

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['3055gw']/* 'Order Status Settings' */, 'details':this.props.app_state.loc['3121f']/* 'Specify the updated status of all the specified orders.' */})}
                <div style={{height:10}}/>
                {this.render_status_options()}

                {this.state.status_option_selected != null && (
                    <div>
                        {this.render_detail_item('3', {'title':this.state.status_option_selected['title'], 'details':this.state.status_option_selected['details'], 'size':'l'})}
                        <div style={{height:10}}/>
                        <div style={{'padding': '1px', opacity: alpha}} onClick={() => this.set_order_status()}>
                            {this.render_detail_item('5', {'text':this.props.app_state.loc['3055hm']/* 'Set Status' */, 'action':''})}
                        </div>
                        {current_progress != null && (
                            <div>
                                {this.render_detail_item('10', {'text':this.props.app_state.loc['3121j']/* 'Progress $' */.replace('$', (current_progress * 100).toFixed(2)), 'textsize':'11px', 'font':this.props.app_state.font})}
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }

    when_added_identifiers_input_field_changed(text){
        this.setState({added_identifiers: text})
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


    render_status_options(){
        const items = this.get_status_options()
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_status_option_item(item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_status_options(){
        return this.props.app_state.status_options
    }

    render_status_option_item(item){
        const title = item['title']
        const details = this.truncate(item['details'], 25)
        if(this.state.status_option_item == item['id']){
            return(
                <div onClick={() => this.when_status_option_tapped(item)}>
                    {this.render_detail_item('3', {'title':title, 'details':details, 'size':'l'})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }
        return(
            <div onClick={() => this.when_status_option_tapped(item)}>
                {this.render_detail_item('3', {'title':title, 'details':details, 'size':'l'})}
            </div>
        )
    }

    when_status_option_tapped(item){
        if(this.state.status_option_item == item['id']){
            this.setState({status_option_item: null, status_option_selected:null})
        }else{
            this.setState({status_option_item: item['id'], status_option_selected: item})
        }
    }








    set_order_status(){
        const status_option = this.state.status_option_selected['id']
        const added_identifiers = this.state.added_identifiers.trim().split(/[,\s]+/).filter(s => s.length > 10)
        const storefront = this.state.storefront

        const current_progress = this.props.app_state.bulk_update_progress_data[this.state.storefront['e5_id']]
        if(current_progress != null) return;

        if(added_identifiers.length == 0){
            this.props.notify(this.props.app_state.loc['3121g']/* 'You havent set any valid order identifiers.' */, 4900)
        }else{
            this.props.emit_bulk_updates_in_indexers(storefront, added_identifiers, status_option)
        }
    }






    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }

    render_empty_horizontal_list_item(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
        <div>
            <div style={{height:57, width:85, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
            <div style={{'margin':'0px 0px 0px 0px'}}>
                <img src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
            </div>
            </div>
        </div>
        )
    }

    render_empty_object(){
        var background_color = this.props.theme['card_background_color']
        return(
                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={this.props.app_state.theme['letter']} style={{height:60 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                </div>
            );
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

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
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
                                    <img alt="" src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
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
        var uploaded_data = {}
        if(item_id == '8' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12')uploaded_data = this.props.app_state.uploaded_data
        return(
        <div>
            <ViewGroups token_name_thumbnail_directory={this.props.app_state?.token_name_thumbnail_directory} e5s={this.props.app_state?.e5s} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
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
            var power = amount.toLocaleString('fullwide', {useGrouping:false}).length - 9
            return number_with_commas(amount.toLocaleString('fullwide', {useGrouping:false}).substring(0, 9)) +'e'+power
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
            var power = amount.toLocaleString('fullwide', {useGrouping:false}).length - 9
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
            var num = parseInt(diff)
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




export default BulkUpdateOrderStatusPage;