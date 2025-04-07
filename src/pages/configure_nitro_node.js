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

class ConfigureNitroNodePage extends Component {
    
    state = {
        selected: 0, nitro_object:null, get_configure_nitro_node_title_tags_object:this.get_configure_nitro_node_title_tags_object(), should_restore_key_title_tags_object:this.should_restore_key_title_tags_object(), reconfigure_storage_title_tags_object:this.reconfigure_storage_title_tags_object(), basic_storage_enabled_tags_object:this.basic_storage_enabled_tags_object(false), dialer_optional_tags_object:this.dialer_optional_tags_object(false), dialer_enabled_tags_object:this.dialer_enabled_tags_object(false),

        entered_app_key_text:'',entered_backup_text:'', entered_filename_text:'', entered_backup_file_text:'', entered_address_text:'',
        entered_ipfs_provider_text:'', entered_web3_text:'', entered_start_block_text:'', entered_iteration_text:'', 
        max_buyable_capacity:0, exchange_id:'', price_amount:0, price_data:[], recipient_id:'', entered_subscription_text:'', entered_dialer_enpoint_text:''
    };



    get_configure_nitro_node_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['3040']/* 'boot' */,this.props.app_state.loc['3041']/* 'restore' */,this.props.app_state.loc['3042']/* 'backup' */, this.props.app_state.loc['3043']/* 'new-E5' */, this.props.app_state.loc['3044']/* 'delete-E5' */,this.props.app_state.loc['3045']/* 'iteration' */, this.props.app_state.loc['3046']/* 'content-gateway' */, this.props.app_state.loc['3047']/* 'provider' */, this.props.app_state.loc['3048']/* 'boot-storage' */, this.props.app_state.loc['3049']/* 'reconfigure-storage' */], [0]
            ],
        };
    }

    should_restore_key_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e', this.props.app_state.loc['3054p']/* 'replace-key' */], [0]
            ],
        };
    }

    reconfigure_storage_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', this.props.app_state.loc['3054cj']/* 'Max-Buyable-Capacity' */, this.props.app_state.loc['3054ck']/* 'Price' */, this.props.app_state.loc['3054cl']/* 'Recipient' */, this.props.app_state.loc['3054cu']/* 'free-storage' */], [1]
            ],
        };
    }

    basic_storage_enabled_tags_object(enabled){
        var selection = 0
        if(enabled == true){
            selection = 1
        }
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e', this.props.app_state.loc['3054cr']/* 'enabled' */], [selection]
            ],
        };
    }

    dialer_optional_tags_object(enabled){
        var selection = 0
        if(enabled == true){
            selection = 1
        }
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e', this.props.app_state.loc['3054da']/* 'optional' */], [selection]
            ],
        };
    }

    dialer_enabled_tags_object(enabled){
        var selection = 0
        if(enabled == true){
            selection = 1
        }
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e', this.props.app_state.loc['3054cr']/* 'enabled' */], [selection]
            ],
        };
    }







    set_data(object, final_backup_key){
        this.setState({nitro_object: object, e5: object['e5'], selected_e5: object['e5'], final_backup_key: final_backup_key})
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_configure_nitro_node_title_tags_object} tag_size={'l'} when_tags_updated={this.when_get_configure_nitro_node_title_tags_object_updated.bind(this)} theme={this.props.theme}/>

                {this.render_everything()}
            </div>
        )
    }


    when_get_configure_nitro_node_title_tags_object_updated(tag_obj){
        this.setState({get_configure_nitro_node_title_tags_object: tag_obj})
    }




    render_everything(){
        var size = this.props.app_state.size
        if(this.state.nitro_object == null) return;
        if(size == 's'){
            return(
                <div>
                    {this.render_the_views()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_the_views()}
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
                        {this.render_the_views()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_the_views(){
        var selected_item = this.get_selected_item(this.state.get_configure_nitro_node_title_tags_object, this.state.get_configure_nitro_node_title_tags_object['i'].active)

        if(selected_item == 'e'){
            return(
                <div>
                    {this.render_my_nitro_node_details()}
                </div>
            )    
        }
        else if(selected_item == this.props.app_state.loc['3040']/* 'boot' */){
            return(
                <div>
                    {this.render_boot_ui()}
                </div>
            ) 
        }
        else if(selected_item == this.props.app_state.loc['3041']/* 'restore' */){
            return(
                <div>
                    {this.render_restore_nitro_node_ui()}
                </div>
            ) 
        }
        else if(selected_item == this.props.app_state.loc['3042']/* 'backup' */){
            return(
                <div>
                    {this.render_backup_nitro_node_ui()}
                </div>
            ) 
        }
        else if(selected_item == this.props.app_state.loc['3043']/* 'new-E5' */){
            return(
                <div>
                    {this.render_new_e5_in_node_ui()}
                </div>
            ) 
        }
        else if(selected_item == this.props.app_state.loc['3044']/* 'delete-E5' */){
            return(
                <div>
                    {this.render_delete_e5_in_node()}
                </div>
            ) 
        }
        else if(selected_item == this.props.app_state.loc['3045']/* 'iteration' */){
            return(
                <div>
                    {this.render_change_iteration_ui()}
                </div>
            ) 
        }
        else if(selected_item == this.props.app_state.loc['3046']/* 'content-gateway' */){
            return(
                <div>
                    {this.render_change_gateway_ui()}
                </div>
            ) 
        }
        else if(selected_item == this.props.app_state.loc['3047']/* 'provider' */){
            return(
                <div>
                    {this.render_change_provider_ui()}
                </div>
            ) 
        }
        else if(selected_item == this.props.app_state.loc['3048']/* 'boot-storage' */){
            return(
                <div>
                    {this.render_boot_storage()}
                </div>
            ) 
        }
        else if(selected_item == this.props.app_state.loc['3049']/* 'reconfigure-storage' */){
            return(
                <div>
                    {this.reconfigure_storage()}
                </div>
            ) 
        }
    }


    render_my_nitro_node_details(){
        return(
            <div>
                {this.render_nitro_node_details(this.state.nitro_object)}
            </div>
        )
    }

    render_nitro_node_details(object){
        var node_details = this.props.app_state.nitro_node_details[object['e5_id']]
        if(node_details == null){
            return(
                <div>
                    {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['c2527f']/* 'Loading Node Details...' */})}
                </div>
            )
        }
        else if(node_details == 'unavailable'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['c2527g']/* 'Node Unavailable.' */, 'details':this.props.app_state.loc['c2527h']/* 'The node is unavailable or down.' */, 'size':'l'})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['c2527j']/* 'Online.' */, 'details':this.props.app_state.loc['c2527i']/* 'Status' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':node_details['booted'].toString(), 'details':this.props.app_state.loc['c2527k']/* 'Booted' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':''+(new Date(node_details['start_up_time'])), 'details':this.props.app_state.loc['c2527l']/* 'Start Up Time' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_nitro_storage_details_if_set(node_details)}
                </div>
            )
        }
    }

    render_nitro_storage_details_if_set(node_details){
        if(node_details['max_buyable_capacity'] == 0){
            return(
                <div>
                    {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['c2527m']/* 'Node Storage Service Offline.' */})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':number_with_commas(node_details['total_files_stored']), 'details':this.props.app_state.loc['c2527bf']/* 'Total Files Stored' */, 'size':'l'})}
                    {this.render_detail_item('0')}

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['c2527bg']/* 'Total Space Utilized' */, 'subtitle':this.format_power_figure(node_details['total_space_utilized']), 'barwidth':this.get_number_width(node_details['total_space_utilized']), 'number':`${number_with_commas(node_details['total_space_utilized'])}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['c2527p']/* Mbs */, })}
                    </div>
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':number_with_commas(node_details['storage_accounts']), 'details':this.props.app_state.loc['c2527q']/* 'Accounts Served.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':this.get_senders_name2(node_details['target_storage_purchase_recipient_account'], node_details['target_account_e5']), 'details':this.props.app_state.loc['c2527n']/* 'Storage Purchase Recipient' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['c2527o']/* 'Storage Purchase Limit.' */, 'subtitle':this.format_power_figure(node_details['max_buyable_capacity']), 'barwidth':this.get_number_width(node_details['max_buyable_capacity']), 'number':`${number_with_commas(node_details['max_buyable_capacity'])}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['c2527p']/* Mbs */, })}
                    </div>
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':node_details['ipfs_hashes'], 'details':this.props.app_state.loc['c2527r']/* 'Tracked Hashes.' */, 'size':'l'})}
                    {this.render_detail_item('0')}

                    {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['c2527s']/* 'Tracked E5s.' */})}
                    <div style={{height:10}}/>
                    {this.load_preferred_e5_ui(node_details['tracked_E5s'])}

                    <div style={{height:10}}/>
                    {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['c2527t']/* 'Price per Megabyte of Storage.' */})}
                    <div style={{height:10}}/>
                    {this.render_price_amounts(node_details['price_per_megabyte'], node_details['target_account_e5'])}
                </div>
            )
        }
    }

    get_senders_name2(sender, e5){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    load_preferred_e5_ui(items){
        if(items.length == 0){
            var items2 = [1,1,1]
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items2.map(() => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_empty_horizontal_list_item()}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_e5_item(item)}
                        </li>
                    ))}
                </ul>
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

    render_empty_horizontal_list_item(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div style={{'padding':'0px 0px 0px 0px'}}>
                <div style={{height:54, width:85, 'background-color': background_color, 'border-radius': '8px','padding':'10px','margin':'0px 0px 0px 0px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img alt='' src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                    </div>
                </div>
            </div>
        )
    }

    render_price_amounts(price_data, e5){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var prices = []
        price_data.forEach(item => {
            prices.push({'exchange':parseInt(item['exchange']),'amount': bigInt(item['amount']) })
        });
        var items = [].concat(prices)
        if(items.length == 0){
            items = [0, 1, 2]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['view_group_card_item_background'], 'border-radius': '15px','padding':'10px 0px 10px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
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
        }
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







    render_boot_ui(){
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['3051']/* 'Boot the node to begin the syncronization process.' */})}
                <div style={{height:10}}/>
                {/* <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['3052']'App Key...'} when_text_input_field_changed={this.when_app_key_text_input_field_changed.bind(this)} text={this.state.entered_app_key_text} theme={this.props.theme}/> 
                <div style={{height:10}}/> */}

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['3053']/* 'Backup key (Optional)...' */} when_text_input_field_changed={this.when_backup_key_text_input_field_changed.bind(this)} text={this.state.entered_backup_text} theme={this.props.theme}/> 

                <div style={{height:20}}/>
                <div onClick={()=> this.boot_nitro_node()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3054']/* 'Boot Node' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_app_key_text_input_field_changed(text){
        this.setState({entered_app_key_text: text})
    }

    when_backup_key_text_input_field_changed(text){
        this.setState({entered_backup_text: text})
    }

    boot_nitro_node(){
        var entered_app_key_text = this.state.entered_app_key_text
        var entered_backup_text = this.state.entered_backup_text

        // if(entered_app_key_text == ''){
        //     this.props.notify(this.props.app_state.loc['3054i']/* 'An app key is required to boot the node.' */, 4000)
        // }else{
        // }
        this.props.boot_nitro_node('', entered_backup_text, this.state.nitro_object)
    }








    render_restore_nitro_node_ui(){
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['3054l']/* 'Restore the node to a previous back up.' */})}
                <div style={{height:10}}/>

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['3053']/* 'Backup key (Optional)...' */} when_text_input_field_changed={this.when_backup_key_text_input_field_changed.bind(this)} text={this.state.entered_backup_text} theme={this.props.theme}/> 
                <div style={{height:10}}/>

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['3054m']/* 'File Name...' */} when_text_input_field_changed={this.when_filename_text_input_field_changed.bind(this)} text={this.state.entered_filename_text} theme={this.props.theme}/>
                {this.render_my_backup_files()}
                <div style={{height:10}}/>

                {/* <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['3054n']} when_text_input_field_changed={this.when_backup_file_key_text_input_field_changed.bind(this)} text={this.state.entered_backup_file_text} theme={this.props.theme}/>
                
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['3054o']})}
                <div style={{height:10}}/> */}

                {/* {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['3054q'], 'details':this.props.app_state.loc['3054r']})}
                <div style={{height:10}}/>

                <Tags font={this.props.app_state.font} page_tags_object={this.state.should_restore_key_title_tags_object} tag_size={'l'} when_tags_updated={this.when_should_restore_key_title_tags_object_updated.bind(this)} theme={this.props.theme}/> */}

                <div style={{height:20}}/>
                <div onClick={()=> this.when_restore_nitro_node_tapped()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3054s']/* 'Restore Node' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_filename_text_input_field_changed(text){
        this.setState({entered_filename_text: text})
    }

    when_backup_file_key_text_input_field_changed(text){
        this.setState({entered_backup_file_text: text})
    }

    when_should_restore_key_title_tags_object_updated(tag_obj){
        this.setState({should_restore_key_title_tags_object: tag_obj})
    }

    when_restore_nitro_node_tapped(){
        var entered_backup_text = this.state.entered_backup_text
        var entered_filename_text = this.state.entered_filename_text
        var entered_backup_file_text = this.state.entered_backup_file_text
        var should_restore_key_title_tag_selected = this.get_selected_item(this.state.get_configure_nitro_node_title_tags_object, this.state.get_configure_nitro_node_title_tags_object['i'].active) === this.props.app_state.loc['3054p']/* 'replace-key' */

        if(entered_filename_text == ''){
            this.props.notify(this.props.app_state.loc['3054t']/* 'You need to specify a file name first.' */, 4000)
        }else{
            this.props.restore_nitro_node(entered_backup_text, entered_filename_text, entered_backup_file_text, should_restore_key_title_tag_selected, this.state.nitro_object)
        }
    }

    render_my_backup_files(){
        var items = this.decrypt_my_backup_files()
        var items2 = [0, 1, 2]

        if(items.length == 0){
            return(
               <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items2.map(() => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_empty_horizontal_list_item3()}
                            </li>
                        ))}
                    </ul>
                </div> 
            )
        }
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_backup_file_tapped(item)}>
                            {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'9px','text':start_and_end(item)})}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_empty_horizontal_list_item3(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div>
                <div style={{height:37, width:85, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img alt='' src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                    </div>
                </div>
            </div>
        )
    }

    decrypt_my_backup_files(){
        var node_details = this.props.app_state.nitro_node_details[this.state.nitro_object['e5_id']]
        var encrypted_files_obj = node_details['encrypted_files_obj']
        // var backup_key = this.state.final_backup_key
        // var decrypted_files_obj = this.props.decrypt_storage_data_using_key(encrypted_files_obj, backup_key)
        // if(decrypted_files_obj !== encrypted_files_obj){
        //     //if the file object was decrypted successfullly
        //     var obj = JSON.parse(decrypted_files_obj)
        //     return this.filter_backup_files(obj['data'])
        // }else{
        //     return []
        // }
        try{
            var obj = JSON.parse(encrypted_files_obj)
            return this.filter_backup_files(obj['data'])
        }catch(e){
            console.log(e)
            return []
        } 
    }

    filter_backup_files(files){
        var typed_word = this.state.entered_filename_text
        const check_file = (file_name) => {
            return file_name.toLowerCase().includes(typed_word.toLowerCase())
        }
        return files.filter(check_file)
    }

    when_backup_file_tapped(item){
        this.setState({entered_filename_text: item.toString()})
    }





    render_backup_nitro_node_ui(){
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['3054v']/* 'Manually back up the node at this time.' */})}
                <div style={{height:10}}/>

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['3053']/* 'Backup key (Optional)...' */} when_text_input_field_changed={this.when_backup_key_text_input_field_changed.bind(this)} text={this.state.entered_backup_text} theme={this.props.theme}/> 

                <div style={{height:20}}/>
                <div onClick={()=> this.when_backup_node_tapped()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3054w']/* 'Back up node' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_backup_node_tapped(){
        var entered_backup_text = this.state.entered_backup_text
        this.props.back_up_node(entered_backup_text, this.state.nitro_object)
    }








    render_new_e5_in_node_ui(){
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['3054v']/* 'Manually back up the node at this time.' */})}
                <div style={{height:10}}/>

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['3053']/* 'Backup key (Optional)...' */} when_text_input_field_changed={this.when_backup_key_text_input_field_changed.bind(this)} text={this.state.entered_backup_text} theme={this.props.theme}/>
                <div style={{height:10}}/>

                {this.load_preferred_e5_ui2()}
                <div style={{height:10}}/>

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['3054y']/* 'E5 Address..' */} when_text_input_field_changed={this.when_address_input_field_changed.bind(this)} text={this.state.entered_address_text} theme={this.props.theme}/>
                <div style={{height:10}}/>

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['3054z']/* 'Web3 provider...' */} when_text_input_field_changed={this.when_web3_input_field_changed.bind(this)} text={this.state.entered_web3_text} theme={this.props.theme}/>
                <div style={{height:10}}/>


                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['3054ba']/* 'Starting Block Number..' */} when_text_input_field_changed={this.when_start_block_input_field_changed.bind(this)} text={this.state.entered_start_block_text} theme={this.props.theme}/>
                <div style={{height:10}}/>

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['3054bb']/* 'Synchronizing Iteration...' */} when_text_input_field_changed={this.when_iteration_input_field_changed.bind(this)} text={this.state.entered_iteration_text} theme={this.props.theme}/>

                <div style={{height:20}}/>
                <div onClick={()=> this.when_new_e5_tapped()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3054bj']/* 'Boot E5' */, 'action':''},)}
                </div>
            </div>
        )
    }

    load_active_e5s(){
        var active_e5s = []
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]
            if(this.props.app_state.e5s[e5].active == true){
                active_e5s.push(e5)
            }
        }
        return active_e5s
    }

    load_preferred_e5_ui2(){
        var items = this.load_active_e5s()
        var items2 = [0, 1]
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_e5_clicked(item)}>
                            {this.render_e5_item2(item)}
                        </li>
                    ))}
                    {items2.map(() => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_empty_horizontal_list_item2()}
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
                <div style={{height:57, width:85, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                    </div>
                </div>
            </div>
        )
    }

    render_e5_item2(item){
        var image = this.props.app_state.e5s[item].e5_img
        var details = this.props.app_state.e5s[item].token
        if(this.state.selected_e5 == item){
            return(
                <div>
                    {this.render_detail_item('12', {'title':item, 'image':image,'details':details, 'size':'s'})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('12', {'title':item, 'image':image, 'details':details, 'size':'s'})}
                </div>
            )
        }
    }

    when_e5_clicked(item){
        this.setState({selected_e5: item})
    }

    when_address_input_field_changed(text){
        this.setState({entered_address_text: text})
    }

    when_web3_input_field_changed(text){
        this.setState({entered_web3_text: text})
    }

    when_start_block_input_field_changed(text){
        if(!isNaN(text)){
            this.setState({entered_start_block_text: text})
        }
    }

    when_iteration_input_field_changed(text){
        if(!isNaN(text)){
            this.setState({entered_iteration_text: text})
        }
    }

    when_new_e5_tapped(){
        var entered_backup_text = this.state.entered_backup_text
        var selected_e5 = this.state.selected_e5
        var entered_address_text = this.state.entered_address_text
        var entered_web3_text = this.state.entered_web3_text
        var entered_start_block_text = this.state.entered_start_block_text
        var entered_iteration_text = this.state.entered_iteration_text

        if(selected_e5 == null){
            this.props.notify(this.props.app_state.loc['3054bc']/* 'Please select an E5.' */, 4000)
        }
        else if(!this.props.isValidE5Address(entered_address_text)){
            this.props.notify(this.props.app_state.loc['3054bd']/* 'That E5 address is not valid.' */, 4000)
        }
        else if(!this.isValidHttpUrl(entered_web3_text)){
            this.props.notify(this.props.app_state.loc['3054be']/* 'That web3 provider is not valid.' */, 4000)
        }
        else if(entered_start_block_text == ''){
            this.props.notify(this.props.app_state.loc['3054bf']/* 'Please set a starting block to start synching from.' */, 4000)
        }
        else if(entered_iteration_text == ''){
            this.props.notify(this.props.app_state.loc['3054bg']/* 'Please set an iteration value for node\'s the sync process.' */, 4000)
        }
        else{
            this.props.boot_new_e5(entered_backup_text, selected_e5, entered_address_text, entered_web3_text, entered_start_block_text, entered_iteration_text, this.state.nitro_object)
        }
    }

    isValidHttpUrl(string) {
        let url;
        try {
            url = new URL(string);
        } catch (_) {
            return false;  
        }
        return url.protocol === "http:" || url.protocol === "https:" || url.protocol === "wss:";
    }






    render_delete_e5_in_node(){
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['3054bi']/* 'Delete an E5 and its events from the node.' */})}
                <div style={{height:10}}/>

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['3053']/* 'Backup key (Optional)...' */} when_text_input_field_changed={this.when_backup_key_text_input_field_changed.bind(this)} text={this.state.entered_backup_text} theme={this.props.theme}/>
                <div style={{height:10}}/>

                {this.load_preferred_e5_ui2()}

                <div style={{height:20}}/>
                <div onClick={()=> this.when_delete_e5_tapped()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3054bk']/* 'Remove E5' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_delete_e5_tapped(){
        var entered_backup_text = this.state.entered_backup_text
        var selected_e5 = this.state.selected_e5

        if(selected_e5 == null){
            this.props.notify(this.props.app_state.loc['3054bc']/* 'Please select an E5.' */, 4000)
        }else{
            this.props.delete_e5_from_node(entered_backup_text, selected_e5, this.state.nitro_object)
        }
    }








    render_change_iteration_ui(){
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['3054bm']/* 'Change the node\'s block syncronization iteration value.' */})}
                <div style={{height:10}}/>

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['3053']/* 'Backup key (Optional)...' */} when_text_input_field_changed={this.when_backup_key_text_input_field_changed.bind(this)} text={this.state.entered_backup_text} theme={this.props.theme}/>
                <div style={{height:10}}/>

                {this.load_preferred_e5_ui2()}
                <div style={{height:10}}/>

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['3054bb']/* 'Synchronizing Iteration...' */} when_text_input_field_changed={this.when_iteration_input_field_changed.bind(this)} text={this.state.entered_iteration_text} theme={this.props.theme}/>

                <div style={{height:20}}/>
                <div onClick={()=> this.when_change_iteration_tapped()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3054bn']/* 'Change Iteration' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_change_iteration_tapped(){
        var entered_backup_text = this.state.entered_backup_text
        var selected_e5 = this.state.selected_e5
        var entered_iteration_text = this.state.entered_iteration_text

        if(selected_e5 == null){
            this.props.notify(this.props.app_state.loc['3054bc']/* 'Please select an E5.' */, 4000)
        }
        else if(entered_iteration_text == ''){
            this.props.notify(this.props.app_state.loc['3054bg']/* 'Please set an iteration value for node\'s the sync process.' */, 4000)
        }
        else{
            this.props.change_iteration_in_node(entered_backup_text, selected_e5, entered_iteration_text, this.state.nitro_object)
        }
    }









    render_change_gateway_ui(){
        var node_details = this.props.app_state.nitro_node_details[this.state.nitro_object['e5_id']]
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['3054bp']/* 'Change the gateway used to fetch data in ipfs.' */})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['3054bs']/* 'Current Provider' */, 'details':(node_details['custom_gateway'] == '' ? this.props.app_state.loc['3054bt']/* 'Unset' */ : node_details['custom_gateway'])})}
                <div style={{height:10}}/>

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['3053']/* 'Backup key (Optional)...' */} when_text_input_field_changed={this.when_backup_key_text_input_field_changed.bind(this)} text={this.state.entered_backup_text} theme={this.props.theme}/>
                <div style={{height:10}}/>
                
                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['3054bq']/* 'Provider...' */} when_text_input_field_changed={this.when_ipfs_provider_input_field_changed.bind(this)} text={this.state.entered_ipfs_provider_text} theme={this.props.theme}/>
                <div style={{height:10}}/>

                <div style={{height:20}}/>
                <div onClick={()=> this.when_change_gateway_tapped()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3054bu']/* 'Update Provider.' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_ipfs_provider_input_field_changed(text){
        this.setState({entered_ipfs_provider_text: text})
    }

    when_change_gateway_tapped(){
        var entered_backup_text = this.state.entered_backup_text
        var entered_ipfs_provider_text = this.state.entered_ipfs_provider_text

        if(!this.isValidHttpUrl(entered_ipfs_provider_text)){
            this.props.notify(this.props.app_state.loc['3054bv']/* 'That gateway provider is not valid.' */, 4000)
        }else{
            this.props.change_gateway(entered_backup_text, entered_ipfs_provider_text, this.state.nitro_object)
        }
    }
    








    render_change_provider_ui(){
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['3054bx']/* 'Change the Web3 provider url.' */})}
                <div style={{height:10}}/>

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['3053']/* 'Backup key (Optional)...' */} when_text_input_field_changed={this.when_backup_key_text_input_field_changed.bind(this)} text={this.state.entered_backup_text} theme={this.props.theme}/>
                <div style={{height:10}}/>

                {this.load_preferred_e5_ui2()}
                <div style={{height:10}}/>

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['3054z']/* 'Web3 provider...' */} when_text_input_field_changed={this.when_web3_input_field_changed.bind(this)} text={this.state.entered_web3_text} theme={this.props.theme}/>
                <div style={{height:10}}/>

                <div style={{height:20}}/>
                <div onClick={()=> this.when_update_web3_provider_tapped()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3054by']/* 'Update Provider' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_update_web3_provider_tapped(){
        var entered_backup_text = this.state.entered_backup_text
        var selected_e5 = this.state.selected_e5
        var entered_web3_text = this.state.entered_web3_text

        if(selected_e5 == null){
            this.props.notify(this.props.app_state.loc['3054bc']/* 'Please select an E5.' */, 4000)
        }
        else if(!this.isValidHttpUrl(entered_web3_text)){
            this.props.notify(this.props.app_state.loc['3054be']/* 'That web3 provider is not valid.' */, 4000)
        }
        else{
            this.props.update_web3_provider_in_node(entered_backup_text, selected_e5, entered_web3_text, this.state.nitro_object)
        }
    }








    render_boot_storage(){
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['3054ca']/* 'Boot and enable storage capabilities in your node.' */})}
                <div style={{height:10}}/>

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['3053']/* 'Backup key (Optional)...' */} when_text_input_field_changed={this.when_backup_key_text_input_field_changed.bind(this)} text={this.state.entered_backup_text} theme={this.props.theme}/>
                <div style={{height:10}}/>


                {this.load_preferred_e5_ui2()}
                <div style={{height:10}}/>


                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['3054cb']/* 'Max buyable Capapacity' */, 'subtitle':this.format_power_figure(this.state.max_buyable_capacity), 'barwidth':this.get_number_width(this.state.max_buyable_capacity), 'number':`${this.format_account_balance_figure(this.state.max_buyable_capacity)}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['c2527p']/* Mbs */, })}
                </div>
                <div style={{height:10}}/>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={999_999_999} when_number_picker_value_changed={this.when_max_buyable_capacity_set.bind(this)} theme={this.props.theme} power_limit={63}/>
                <div style={{height:10}}/>


                
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1025']/* 'Recipient ID' */} when_text_input_field_changed={this.when_recipient_input_field_changed.bind(this)} text={this.state.recipient_id} theme={this.props.theme}/>
                {this.load_account_suggestions()}
                <div style={{height:10}}/>

                {this.render_set_token_and_amount_part()}



                {this.render_detail_item('3', {'title':this.props.app_state.loc['3054cs']/* 'Free Basic Storage' */, 'details':this.props.app_state.loc['3054ct']/* 'If set to enabled, users will be able to store post metadata in your node for free.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.basic_storage_enabled_tags_object} tag_size={'l'} when_tags_updated={this.when_basic_storage_enabled_tags_object_updated.bind(this)} theme={this.props.theme}/>
                
                

                <div style={{height:20}}/>
                <div onClick={()=> this.when_boot_storage_tapped()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3054ce']/* 'Boot Stroage' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_max_buyable_capacity_set(number){
        this.setState({max_buyable_capacity: number})
    }

    when_recipient_input_field_changed(text){
        if(!isNaN(text)) this.setState({recipient_id: text})
    }

    when_basic_storage_enabled_tags_object_updated(tag_obj){
        this.setState({basic_storage_enabled_tags_object: tag_obj})
    }

    render_set_token_and_amount_part(){
        return(
            <div style={{'overflow-x':'hidden'}}>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3054cc']/* 'Storage Price.' */, 'details':this.props.app_state.loc['3054cd']/* 'Set the price per megabyte of storage for your node in your preferred tokens.' */, 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['237']} when_text_input_field_changed={this.when_exchange_id_input_field_changed.bind(this)} text={this.state.exchange_id} theme={this.props.theme}/>

                {this.load_token_suggestions('exchange_id')}
                <div style={{height: 20}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['241'], 'number':this.state.price_amount, 'relativepower':this.props.app_state.loc['756']})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['241'], 'subtitle':this.format_power_figure(this.state.price_amount), 'barwidth':this.calculate_bar_width(this.state.price_amount), 'number':this.format_account_balance_figure(this.state.price_amount), 'barcolor':'', 'relativepower':this.props.app_state.loc['756'], })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} ref={this.amount_picker} font={this.props.app_state.font} number_limit={bigInt('1e'+(this.get_power_limit_for_exchange(this.state.exchange_id)+9))} when_number_picker_value_changed={this.when_price_amount.bind(this)} theme={this.props.theme} power_limit={this.get_power_limit_for_exchange(this.state.exchange_id)}/>

                <div style={{'padding': '5px'}} onClick={() => this.when_add_price_set()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['284'], 'action':''})}
                </div>

                {this.render_set_prices_list_part()}
            </div>
        )
    }

    constructor(props) {
        super(props);
        this.amount_picker = React.createRef();
    }

    get_power_limit_for_exchange(exchange){
        var exchange_id = this.get_token_id_from_symbol(exchange.trim())

        if(!isNaN(exchange_id) && parseInt(exchange_id) > 0 && exchange_id != '' && this.does_exchange_exist(exchange_id)){
            var target_exchange_data = this.props.app_state.created_token_object_mapping[this.state.selected_e5][exchange_id]
            var default_depth = 0;
            if(target_exchange_data != null){
                target_exchange_data = target_exchange_data['ipfs']
                if(target_exchange_data != null){
                    default_depth = target_exchange_data.default_depth == null ? 0 : target_exchange_data.default_depth
                }
            }

            return (default_depth*72)+63
        }
        else{
            return 63
        }
    }

    when_exchange_id_input_field_changed(text){
        this.setState({exchange_id: text})
        this.reset_the_number_picker()
    }

    reset_the_number_picker(){
        var me = this;
        setTimeout(function() {
            if(me.amount_picker.current != null){
                me.amount_picker.current.reset_number_picker()
            }
        }, (1 * 1000));  
    }

    when_price_amount(amount){
        this.setState({price_amount: amount})
    }

    when_add_price_set(){
        var exchange_id = this.get_token_id_from_symbol(this.state.exchange_id.trim())
        var amount = this.state.price_amount
        if(isNaN(exchange_id) || parseInt(exchange_id) < 0 || exchange_id == '' || !this.does_exchange_exist(exchange_id)){
            this.props.notify(this.props.app_state.loc['264'], 2600)
        }
        else if(amount == 0){
            this.props.notify(265, 2600)
        }
        else if(this.is_exchange_already_added(exchange_id)){
            this.props.notify(this.props.app_state.loc['266'], 3600)
        }
        else{
            var price_data_clone = this.state.price_data.slice()
            price_data_clone.push({'exchange':exchange_id, 'amount':amount})
            this.setState({price_data: price_data_clone});
            this.props.notify(this.props.app_state.loc['267'], 1000)
        }
    }

    is_exchange_already_added(exchange_id){
        if(this.get_item_in_array(exchange_id, this.state.price_data) == null){
            return false
        }
        return true
    }

    get_item_in_array(exchange_id, object_array){
        var object = object_array.find(x => x['exchange'] === exchange_id);
        return object
    }

    get_token_id_from_symbol(typed_search){
        if(!isNaN(typed_search)){
            return typed_search
        }
        var id = this.props.app_state.token_directory[this.state.selected_e5][typed_search.toUpperCase()] == null ? typed_search : this.props.app_state.token_directory[this.state.selected_e5][typed_search.toUpperCase()]

        return id
    }

    does_exchange_exist(exchange_id){
        if(this.props.app_state.created_token_object_mapping[this.state.selected_e5][parseInt(exchange_id)] == null){
            return false
        }
        return true
    }


    render_set_prices_list_part(){
        var items = [].concat(this.state.price_data)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
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
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px','list-style':'none'}}>
                        {items.reverse().map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_amount_clicked(item)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '5px'}}>
                                            <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.selected_e5+item['exchange']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['exchange']]})}>
                                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.selected_e5+item['exchange']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['exchange']], })}
                                            </div>
                                        </li>
                                    </div>
                                </SwipeableListItem>
                            </SwipeableList>
                            
                        ))}
                    </ul>
                </div>
            )
        }
        
    }

    when_amount_clicked(item){
        var cloned_array = this.state.price_data.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({price_data: cloned_array})
    }


    load_token_suggestions(target_type){
        var items = this.get_suggested_tokens()
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 7px 0px', width: '97%', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 5px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                      {items.map((item, index) => (
                          <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_price_suggestion_clicked(item, index, target_type)}>
                              {this.render_detail_item('3', item['label'])}
                          </li>
                      ))}
                  </ul>
                </div>
        )
    }

    get_suggested_tokens(){
        var items = [
            {'id':'3', 'label':{'title':'END', 'details':this.props.app_state.loc['268'], 'size':'s'}},
            {'id':'5', 'label':{'title':'SPEND', 'details':this.props.app_state.loc['269'], 'size':'s'}},
        ];
        var exchanges_from_sync = this.props.app_state.created_tokens[this.state.selected_e5] == null ? [] : this.props.app_state.created_tokens[this.state.selected_e5]
        var sorted_token_exchange_data = []
        // var myid = this.props.app_state.user_account_id
        for (let i = 0; i < exchanges_from_sync.length; i++) {
            var exchange_e5 = exchanges_from_sync[i]['e5']
            var myid = this.props.app_state.user_account_id[exchange_e5] == null ? 1 : this.props.app_state.user_account_id[exchange_e5]
            var author_account = exchanges_from_sync[i]['event'] == null ? '':exchanges_from_sync[i]['event'].returnValues.p3.toString() 
            if(author_account == myid.toString()){
                sorted_token_exchange_data.push(exchanges_from_sync[i])
            }
        }
        sorted_token_exchange_data.reverse()
        for (let i = 0; i < exchanges_from_sync.length; i++) {
            if(!sorted_token_exchange_data.includes(exchanges_from_sync[i]) && exchanges_from_sync[i]['balance'] != 0 && exchanges_from_sync[i]['event'] != null){
                sorted_token_exchange_data.push(exchanges_from_sync[i])
            }
        }

        for (let i = 0; i < sorted_token_exchange_data.length; i++) {
            items.push({'id':sorted_token_exchange_data[i]['id'], 'label':{'title':sorted_token_exchange_data[i]['id'], 'details':sorted_token_exchange_data[i]['ipfs'].entered_title_text, 'size':'s'}})
        }

        return items;
    }

    when_price_suggestion_clicked(item, pos, target_type){
        this.setState({exchange_id: item['id']})
        this.reset_the_number_picker()
    }



    load_account_suggestions(){
        var items = [].concat(this.get_suggested_accounts())
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_suggestion_clicked(item, index)}>
                            {this.render_detail_item('3', item['label'])}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_suggested_accounts(){
        var account = this.props.app_state.user_account_id[this.state.selected_e5]
        return[
            {'id':account, 'label':{'title':this.props.app_state.loc['854']/* 'My Account' */, 'details':this.props.app_state.loc['857']/* 'Account' */, 'size':'s'}},
            {'id':'2', 'label':{'title':this.props.app_state.loc['855']/* 'Main Contract' */, 'details':this.props.app_state.loc['858']/* 'Contract ID 2' */, 'size':'s'}},
        ].concat(this.get_account_suggestions())
    }

    get_account_suggestions(){
        var contacts = this.props.app_state.contacts[this.state.selected_e5]
        if(contacts == null) contacts = [];
        var return_array = []
        contacts.forEach(contact => {
            if(contact['id'].toString().includes(this.state.recipient_id)){
                return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
            }
        });
        return return_array;
    }

    get_contact_alias(contact){
        return (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[contact['id']] == null ? ((contact['address'].toString()).substring(0, 9) + "...") : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[contact['id']])
    }

    when_suggestion_clicked(item, pos){
        this.setState({recipient_id: parseInt(item['id']) })
    }

    when_boot_storage_tapped(){
        var entered_backup_text = this.state.entered_backup_text
        var max_buyable_capacity = this.state.max_buyable_capacity
        var selected_e5 = this.state.selected_e5
        var price_per_megabyte = this.state.price_data
        var target_storage_purchase_recipient_account = this.state.recipient_id
        
        var selected_basic_storage_setting = this.get_selected_item(this.state.basic_storage_enabled_tags_object, this.state.basic_storage_enabled_tags_object['i'].active) === this.props.app_state.loc['3054cr']/* enabled */

        if(max_buyable_capacity == 0){
            this.props.notify(this.props.app_state.loc['3054cf']/* 'You need to specify a maximum amount of storage that can be bought' */, 4000)
        }
        else if(price_per_megabyte.length == 0){
            this.props.notify(this.props.app_state.loc['3054cg']/* 'You need to specify a price for your storage.' */, 4000)
        }
        else if(target_storage_purchase_recipient_account == ''){
            this.props.notify(this.props.app_state.loc['3054ch']/* 'You need to specify a recipient for the storage purchases.' */, 4000)
        }
        else{
            var prices = []
            price_per_megabyte.forEach(item => {
                prices.push({'exchange':item['exchange'].toString().toLocaleString('fullwide', {useGrouping:false}),'amount': item['amount'].toString().toLocaleString('fullwide', {useGrouping:false}) })
            });

            this.props.boot_storage(entered_backup_text, max_buyable_capacity, selected_e5, prices, target_storage_purchase_recipient_account, selected_basic_storage_setting, this.state.nitro_object)
        }
    }








    reconfigure_storage(){
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['3054cm']/* 'Change the current setting for the storage service in the node.' */})}
                <div style={{height:10}}/>

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['3053']/* 'Backup key (Optional)...' */} when_text_input_field_changed={this.when_backup_key_text_input_field_changed.bind(this)} text={this.state.entered_backup_text} theme={this.props.theme}/>
                <div style={{height:10}}/>

                {this.load_preferred_e5_ui2()}
                <div style={{height:10}}/>

                <Tags font={this.props.app_state.font} page_tags_object={this.state.reconfigure_storage_title_tags_object} tag_size={'l'} when_tags_updated={this.when_reconfigure_storage_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>

                {this.render_reconfigure_storage_elements()}
            </div>
        )
    }

    when_reconfigure_storage_title_tags_object_updated(tag_obj){
        this.setState({reconfigure_storage_title_tags_object: tag_obj})

        var selected_item = this.get_selected_item(tag_obj, tag_obj['i'].active)
        if(selected_item == this.props.app_state.loc['3054ck']/* 'Price' */){
            var node_details = this.props.app_state.nitro_node_details[this.state.nitro_object['e5_id']]
            var prices = []
            node_details['price_per_megabyte'].forEach(item => {
                prices.push({'exchange':parseInt(item['exchange']),'amount': bigInt(item['amount']) })
            });

            this.setState({price_data: prices})
        }
        else if(selected_item == this.props.app_state.loc['3054cu']/* 'free-storage' */){
            var node_details = this.props.app_state.nitro_node_details[this.state.nitro_object['e5_id']]
            var unlimited_basic_storage = node_details['unlimited_basic_storage']

            this.setState({basic_storage_enabled_tags_object:this.basic_storage_enabled_tags_object(unlimited_basic_storage)})
        }
    }


    render_reconfigure_storage_elements(){
        var selected_item = this.get_selected_item(this.state.reconfigure_storage_title_tags_object, this.state.reconfigure_storage_title_tags_object['i'].active)

        if(selected_item == this.props.app_state.loc['3054cj']/* 'Max-Buyable-Capacity' */){
            return(
                <div>
                    {this.render_max_buyable_capacity_picker()}
                </div>
            )    
        }
        else if(selected_item == this.props.app_state.loc['3054ck']/* 'Price' */){
            return(
                <div>
                    {this.render_price_picker()}
                </div>
            ) 
        }
        else if(selected_item == this.props.app_state.loc['3054cl']/* 'Recipient' */){
            return(
                <div>
                    {this.render_recipient_ui()}
                </div>
            ) 
        }
        else if(selected_item == this.props.app_state.loc['3054cu']/* 'free-storage' */){
            return(
                <div>
                    {this.render_free_storage_ui()}
                </div>
            )
        }
    }


    render_max_buyable_capacity_picker(){
        return(
            <div>
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['3054cb']/* 'Max buyable Capapacity' */, 'subtitle':this.format_power_figure(this.state.max_buyable_capacity), 'barwidth':this.get_number_width(this.state.max_buyable_capacity), 'number':`${this.format_account_balance_figure(this.state.max_buyable_capacity)}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['c2527p']/* Mbs */, })}
                </div>
                <div style={{height:10}}/>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={999_999_999} when_number_picker_value_changed={this.when_max_buyable_capacity_set.bind(this)} theme={this.props.theme} power_limit={63}/>
                
                <div style={{height:20}}/>
                <div onClick={()=> this.when_update_max_buyable_capacity_tapped()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3054cn']/* 'Update Capacity' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_update_max_buyable_capacity_tapped(){
        var entered_backup_text = this.state.entered_backup_text
        var max_buyable_capacity = this.state.max_buyable_capacity
        var selected_e5 = this.state.selected_e5

        if(max_buyable_capacity == 0){
            this.props.notify(this.props.app_state.loc['3054cf']/* 'You need to specify a maximum amount of storage that can be bought' */, 4000)
        }
        else{
            this.props.update_storage_config(entered_backup_text, 'max_buyable_capacity', parseInt(max_buyable_capacity), selected_e5, this.state.nitro_object)
        }
    }


    render_price_picker(){
        return(
            <div>
                {this.render_set_token_and_amount_part()}

                <div style={{height:20}}/>
                <div onClick={()=> this.when_change_storage_prices_tapped()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3054cp']/* 'Update Prices' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_change_storage_prices_tapped(){
        var entered_backup_text = this.state.entered_backup_text
        var selected_e5 = this.state.selected_e5
        var price_per_megabyte = this.state.price_data

        if(price_per_megabyte.length == 0){
            this.props.notify(this.props.app_state.loc['3054cg']/* 'You need to specify a price for your storage.' */, 4000)
        }else{
            var prices = []
            price_per_megabyte.forEach(item => {
                prices.push({'exchange':item['exchange'].toString().toLocaleString('fullwide', {useGrouping:false}),'amount': item['amount'].toString().toLocaleString('fullwide', {useGrouping:false}) })
            });

            this.props.update_storage_config(entered_backup_text, 'price_per_megabyte', price_per_megabyte, selected_e5, this.state.nitro_object)
        }
    }


    render_recipient_ui(){
        return(
            <div>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1025']/* 'Recipient ID' */} when_text_input_field_changed={this.when_recipient_input_field_changed.bind(this)} text={this.state.recipient_id} theme={this.props.theme}/>
                {this.load_account_suggestions()}

                <div style={{height:20}}/>
                <div onClick={()=> this.when_change_recipient_of_storage_purchases_tapped()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3054cq']/* 'Update Recipient' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_change_recipient_of_storage_purchases_tapped(){
        var entered_backup_text = this.state.entered_backup_text
        var selected_e5 = this.state.selected_e5
        var target_storage_purchase_recipient_account = this.state.recipient_id

        if(target_storage_purchase_recipient_account == ''){
            this.props.notify(this.props.app_state.loc['3054ch']/* 'You need to specify a recipient for the storage purchases.' */, 4000)
        }
        else{
            this.props.update_storage_config(entered_backup_text, 'target_storage_purchase_recipient_account', target_storage_purchase_recipient_account, selected_e5, this.state.nitro_object)
        }
    }


    render_free_storage_ui(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3054cs']/* 'Free Basic Storage' */, 'details':this.props.app_state.loc['3054ct']/* 'If set to enabled, users will be able to store post metadata in your node for free.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.basic_storage_enabled_tags_object} tag_size={'l'} when_tags_updated={this.when_basic_storage_enabled_tags_object_updated.bind(this)} theme={this.props.theme}/>

                <div style={{height:20}}/>
                <div onClick={()=> this.when_change_free_basic_storage_tapped()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3054cv']/* 'update selection' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_change_free_basic_storage_tapped(){
        var entered_backup_text = this.state.entered_backup_text
        var selected_e5 = this.state.selected_e5
        var selected_basic_storage_setting = this.get_selected_item(this.state.basic_storage_enabled_tags_object, this.state.basic_storage_enabled_tags_object['i'].active) === this.props.app_state.loc['3054cr']/* enabled */

        this.props.update_storage_config(entered_backup_text, 'unlimited_basic_storage', selected_basic_storage_setting, selected_e5, this.state.nitro_object)
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
                <ViewGroups uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
            </div>
        )

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
}




export default ConfigureNitroNodePage;