import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
// import Letter from './../assets/letter.png'; 
import TextInput from './../components/text_input';
// import E5EmptyIcon from './../assets/e5empty_icon.png';
// import E5EmptyIcon3 from './../assets/e5empty_icon3.png';

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
  if (str.length > 35) {
    return str.substr(0, 20) + '...' + str.substr(str.length-10, str.length);
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

class StorefrontDetailsSection extends Component {
    
    state = {
        selected: 0, navigate_view_storefront_list_detail_tags_object: this.get_navigate_storefront_list_detail_tags_object_tags(), entered_text:'', focused_message:{'tree':{}}, comment_structure_tags: this.get_comment_structure_tags(), hidden_message_children_array:[]
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

    get_navigate_storefront_list_detail_tags_object_tags(){
        var obj = {
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e',this.props.app_state.loc['2028']/* 'metadata' */,this.props.app_state.loc['2030']/* 'activity' */, 'e.'+this.props.app_state.loc['2603']/* 'e.direct-purchases' */],[1]
          ],
          'direct-purchases':[
              ['xor','e',1], [this.props.app_state.loc['2603']/* 'direct-purchases' */,this.props.app_state.loc['1426']/* 'all' */,this.props.app_state.loc['2604']/* 'unfulfilled' */,this.props.app_state.loc['2605']/* 'fulfilled' */], [1],[1]
          ],
        }

        obj[this.props.app_state.loc['2603']] = [
              ['xor','e',1], [this.props.app_state.loc['2603']/* 'direct-purchases' */,this.props.app_state.loc['1426']/* 'all' */,this.props.app_state.loc['2604']/* 'unfulfilled' */,this.props.app_state.loc['2605']/* 'fulfilled' */], [1],[1]
          ]

        return obj
    }

    render(){
        return(
            <div>{this.render_storefront_list_detail()}</div>
        )
    }


    render_storefront_list_detail(){
        if(this.props.selected_storefront_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_storefront_details_section()}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 0px 0px', 'max-width':'470px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.navigate_view_storefront_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_storefront_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
    }

    render_empty_detail_object(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height
        return(
            <div>
                <div style={{height:this.props.height-70, 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 5px 5px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center','margin':'10px 10px 10px 10px'}}>
                    <img src={this.props.app_state.static_assets['letter']} style={{height:70 ,width:'auto'}} />
                </div>
            </div>
        )
    }

    when_navigate_view_storefront_list_detail_tags_object_updated(tag_obj){
        this.setState({navigate_view_storefront_list_detail_tags_object: tag_obj})
    }

    get_item_in_array(object_array, id){
        var object = object_array.find(x => x['e5_id'] === id);
        return object
    }

    render_storefront_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_storefront_list_detail_tags_object, this.state.navigate_view_storefront_list_detail_tags_object['i'].active)
        var object = this.get_item_in_array(this.get_storefront_items(),this.props.selected_storefront_item);

        if(object == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }
        
        if(selected_item == this.props.app_state.loc['2028']/* 'metadata' */){
            return(
                <div>
                    {this.render_storefront_main_details_section(object)}
                </div>
            )
        }else if(selected_item == this.props.app_state.loc['2030']/* 'activity' */){
            return(
                <div>
                    {this.render_storefront_message_activity(object)}
                </div>
            ) 
        }
        else if(selected_item == this.props.app_state.loc['1426']/* 'all' */ || selected_item == this.props.app_state.loc['2604']/* 'unfulfilled' */ || selected_item == this.props.app_state.loc['2605']/* 'fulfilled' */){
            return(
                <div>
                    {this.render_direct_purchases(object)}
                </div>
            )
        }
    }

    render_storefront_main_details_section(object){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-70
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        // var object = this.get_storefront_items()[this.props.selected_storefront_item];
        var item = this.get_storefront_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects
        var composition_type = object['ipfs'].composition_type == null ? 'items' : this.get_selected_item(object['ipfs'].composition_type, 'e')
        var variants = object['ipfs'].variants == null ? [] : object['ipfs'].variants
        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 20px 10px', 'padding':'0px 10px 0px 10px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{height: 10}}/>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':composition_type, 'details':this.props.app_state.loc['2606']/* 'Set Denomination' */, 'size':'l'})}
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':''+this.get_senders_name(object['event'].returnValues.p5, object), 'details':this.props.app_state.loc['2607']/* 'Author Seller' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':''+this.get_senders_name(object['ipfs'].target_receiver, object), 'details':this.props.app_state.loc['2608']/* Target Payment Recipient' */, 'size':'l'})}

                    {this.render_fulfilment_accounts_if_any(object)}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2611']/* 'Fulfilment Location' */, 'details':object['ipfs'].fulfilment_location, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('0')}
                    {this.render_item_data(items)} 
                    {this.render_item_images(object)}
                    {this.render_selected_links(object)}
                    
                    {this.render_detail_item('3', {'title':variants.length+this.props.app_state.loc['2612']/* ' variants' */, 'details':this.props.app_state.loc['2613']/* 'To choose from.' */, 'size':'l'})} 
                    <div style={{height: 5}}/>
                    {this.render_item_variants(object, composition_type)}  
                    
                    <div style={{height: 20}}/>
                    {this.render_out_of_stock_message_if_any(object)}                

                    {this.render_add_to_bag_button(object)}
                    {this.render_direct_purchase_button(object)}

                    {this.render_edit_object_button(object)}

                    {this.render_detail_item('0')}
                    {this.render_chatroom_enabled_message(object)}
                    {this.render_pin_storefront_button(object)}
                    
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_item_variants(object, composition_type){
        var items = [].concat(object['ipfs'].variants)
         
        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=> this.when_variant_item_clicked(item)}>
                            {this.render_detail_item('3',{'title':this.format_account_balance_figure(item['available_unit_count'])+' '+composition_type, 'details':this.truncate(item['variant_description'], 15),'size':'s'})}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_fulfilment_accounts_if_any(object){
        if(object['ipfs'].fulfilment_accounts.length == 0) return;
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2609']/* 'Fulfilment Accounts' */, 'details':this.props.app_state.loc['2610']/* 'The accounts involved with shipping and fulfilling direct purchase orders from clients.' */, 'size':'l'})}
                <div style={{height: 2}}/>
                {this.render_fulfilment_accounts(object)}
            </div>
        )
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

    render_fulfilment_accounts(object){
        var items = [].concat(object['ipfs'].fulfilment_accounts)
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style':'none'}}>
                            {this.render_detail_item('3', {'title':this.get_senders_name(item, object), 'details':'Account', 'size':'s'})}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_senders_name(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return 'You'
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    render_pin_storefront_button(object){
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2614']/* 'Pin the storefront item to your feed.' */, 'title':this.props.app_state.loc['2615']/* 'Pin Item' */})}
                <div style={{height:10}}/>
                <div onClick={()=> this.when_pin_item_clicked(object)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2616']/* 'Pin/Unpin Item' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_pin_item_clicked(object){
        this.props.pin_item(object)
    }

    render_chatroom_enabled_message(object){
        var setting = this.get_selected_item(object['ipfs'].chatroom_enabled_tags_object, 'e')
        if(setting == 'enabled'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2617']/* Activity Section Enabled' */, 'details':this.props.app_state.loc['2618']/* 'You can leave a product review message in the activity section' */, 'size':'l'})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2619']/* 'Activity Section Disabled' */, 'details':this.props.app_state.loc['2620']/* 'The activity section has been disabled by the storefront owner' */, 'size':'l'})}
                </div>
            )
        }
    }

    render_out_of_stock_message_if_any(object){
        var item_in_stock = object['ipfs'].get_storefront_item_in_stock_option == null ? 1 : this.get_selected_item2(object['ipfs'].get_storefront_item_in_stock_option, 'e')

        if(item_in_stock == 1){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2621']/* 'In Stock' */, 'details':this.props.app_state.loc['2622']/* 'The item is available for purchasing.' */, 'size':'l'})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2623']/* 'Out of Stock' */, 'details':this.props.app_state.loc['2624']/* 'The item is not available for purchasing.' */, 'size':'l'})}
                </div>
            )
        }
    }

    render_add_to_bag_button(object){
        var item_in_stock = object['ipfs'].get_storefront_item_in_stock_option == null ? 1/* 'in-stock' */ : this.get_selected_item2(object['ipfs'].get_storefront_item_in_stock_option, 'e')
        
        if(item_in_stock == 1/* 'in-stock' */){
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2625']/* 'Add the item to your shopping bag.' */, 'title':this.props.app_state.loc['2626']/* 'Add to Bag' */})}
                    <div style={{height:10}}/>
                    <div onClick={()=> this.open_add_to_bag(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2626']/* 'Add to Bag' */, 'action':''},)}
                    </div>
                </div>
            )
        }
    }

    render_direct_purchase_button(object){
        // var object = this.get_storefront_items()[this.props.selected_storefront_item];
        var direct_purchase_option = object['ipfs'].purchase_option_tags_object == null ? 2/* 'disabled' */ : this.get_selected_item2(object['ipfs'].purchase_option_tags_object, 'e')

        var item_in_stock = object['ipfs'].get_storefront_item_in_stock_option == null ? 1/* 'in-stock' */ : this.get_selected_item2(object['ipfs'].get_storefront_item_in_stock_option, 'e')

        if(direct_purchase_option == 1/* 'enabled' */ && item_in_stock == 1/* 'in-stock' */){
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2627']/* 'Purchase the item directly from the seller.' */, 'title':this.props.app_state.loc['2628']/* 'Direct Purchase' */})}
                    <div style={{height:10}}/>
                    <div onClick={()=> this.open_direct_purchase(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2629']/* 'Purchase' */, 'action':''},)}
                    </div>
                </div>
            )
        }
        
    }

    render_edit_object_button(object){
        // var object = this.get_storefront_items()[this.props.selected_storefront_item];
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if(object['event'].returnValues.p5 == my_account.toString()){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2630']/* 'Edit Storefront Post' */, 'details':this.props.app_state.loc['2631']/* 'Change the basic details for your Storefront Post' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_basic_edit_object_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2632']/* 'Edit Item' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }


    open_basic_edit_object_ui(object){
        // var object = this.get_storefront_items()[this.props.selected_storefront_item];
        this.props.open_edit_object('4', object)
    }

    open_add_to_bag(object){
        // var object = this.get_storefront_items()[this.props.selected_storefront_item]
        this.props.open_add_to_bag(object)
    }

    open_direct_purchase(object){
        // var object = this.get_storefront_items()[this.props.selected_storefront_item]
        this.props.open_direct_purchase(object)
    }

    render_set_storefront_prices_list_part(object){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        // var object = this.get_storefront_items()[this.props.selected_storefront_item];
        var items = [].concat(object['ipfs'].price_data)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 10px 0px'}}>
                                        <img src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
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
                            <li style={{'padding': '5px 0px 5px 0px'}}>
                                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        
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

    get_storefront_items(){
       return this.props.get_storefront_items()
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
                                            <img src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
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

    get_storefront_details_data(object){
        var tags = object['ipfs'] == null ? ['Store'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Store ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['e5']+' • '+object['id'], 'details':title, 'size':'l'},
            'age':{'style':'l', 'title':this.props.app_state.loc['2633']/* 'Block Number' */, 'subtitle':'age', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)} `+this.props.app_state.loc['2495']/* ago */, }
        }
    }






    render_direct_purchases(object){
        var he = this.props.height-45

        return(
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', height: he, padding:'5px 0px 5px 0px'}}>
                    {this.render_purchases_top_title(object)}
                    <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '10px 20px 10px 20px'}}/>
                    {this.render_purchases(object)}
                </div>
            </div>
        )
    }


    render_purchases_top_title(object){
        // var object = this.get_storefront_items()[this.props.selected_storefront_item]
        return(
            <div style={{padding:'5px 5px 5px 5px'}}>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2496']/* 'In ' */+object['id'], 'details':this.props.app_state.loc['2634']/* 'Direct Purchases' */, 'size':'l'})} 
            </div>
        )
    }


    render_purchases(object){
        var middle = this.props.height-200;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = this.get_purchases(object)

        var sender_type = 'storefront_owner'
        var fulfilment_accounts = object['ipfs'].fulfilment_accounts==null?[]:object['ipfs'].fulfilment_accounts
        if(this.props.app_state.user_account_id[object['e5']] != object['event'].returnValues.p5 && !fulfilment_accounts.includes(this.props.app_state.user_account_id[object['e5']])){
            //if user is not owner of storefront and wasnt included in the fulfilment account array
            items = this.filter_for_senders_orders(object)
            sender_type = 'storefront_client'
        }
        // sender_type = 'storefront_owner'
        if(items == null) items = [];
        if(items.length == 0){
            items = [0,1]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
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
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 5px 2px 5px'}}>
                                <div key={index}>
                                    {this.render_full_or_compressed_object(item, sender_type, index, object)}
                                </div>
                            </li> 
                        ))}
                    </ul>
                </div>
            )
        }
    }


    get_purchases(object){
        // var object = this.get_storefront_items()[this.props.selected_storefront_item]
        return this.filter_using_bottom_tags(this.props.app_state.direct_purchases[object['id']], object)
    }

    filter_for_senders_orders(object){
        // var object = this.get_storefront_items()[this.props.selected_storefront_item]
        var purchases = this.props.app_state.direct_purchases[object['id']] == null ? [] : this.props.app_state.direct_purchases[object['id']]
        var filtered_purchases = []
        for(var i=0; i<purchases.length; i++){
            if(purchases[i]['sender_account'] == this.props.app_state.user_account_id[object['e5']]){
                filtered_purchases.push(purchases[i])
            }
        }
        return this.filter_using_bottom_tags(filtered_purchases, object)
    }


    filter_using_bottom_tags(filtered_purchases, object){
        var selected_item = this.get_selected_item(this.state.navigate_view_storefront_list_detail_tags_object, this.props.app_state.loc['2603']/* 'direct-purchases' */)
        // var object = this.get_storefront_items()[this.props.selected_storefront_item]
        if(filtered_purchases == null) return []

        if(selected_item == this.props.app_state.loc['1426']/* 'all' */){
            return filtered_purchases
        }
        else if(selected_item == this.props.app_state.loc['2604']/* 'unfulfilled' */){
            var unfulfilled_items = []
            filtered_purchases.forEach(item => {
                var signature = this.props.app_state.direct_purchase_fulfilments[object['id']][item['signature_data']]
                if(signature == null){
                    //item is unfulfilled
                    unfulfilled_items.push(item)
                }
            });
            return unfulfilled_items
        }
        else if(selected_item == this.props.app_state.loc['2605']/* 'fulfilled' */){
            var fulfilled_items = []
            filtered_purchases.forEach(item => {
                var signature = this.props.app_state.direct_purchase_fulfilments[object['id']][item['signature_data']]
                if(signature != null){
                    //item is unfulfilled
                    fulfilled_items.push(item)
                }
            });
            return fulfilled_items
        }
    }



    render_full_or_compressed_object(item, sender_type, index, object){
        if(this.state.selected_purchase_item == index){
            return this.render_visible_purchase_item(item, sender_type, index, object)
        }else{
            return this.render_compressed_purchase_item(item, sender_type, index, object)
        }
    }

    render_compressed_purchase_item(item, sender_type, index, object){
        // var object = this.get_storefront_items()[this.props.selected_storefront_item]
        // console.log('-----------------------render_compressed_purchase_item-----------------------------')
        // console.log(object['id'])
        // console.log(this.props.app_state.direct_purchase_fulfilments)
        var signature = this.props.app_state.direct_purchase_fulfilments[object['id']]
        if(signature != null && signature[item['signature_data']] != null){
            signature = signature[item['signature_data']]
            return(
                <div onClick={()=> this.when_item_clicked(index)}>
                    {this.render_detail_item('3', {'size':'s', 'title':this.props.app_state.loc['1070']/* 'Variant ID: ' */+item['variant_id']+this.props.app_state.loc['2635']/* ', Sender Account ID: ' */+item['sender_account'], 'details':this.props.app_state.loc['2636']/* 'Fulfilent Signature: ' */+start_and_end(signature['signature']) })}
                </div>
            )
        }else{
            return(
                <div onClick={()=> this.when_item_clicked(index)}>
                    {this.render_detail_item('3', {'size':'s', 'title':this.props.app_state.loc['1070']/* 'Variant ID: ' */+item['variant_id']+this.props.app_state.loc['2637']/* ' , Client ID: ' */+item['sender_account'], 'details':item['shipping_detail'] })}
                </div>
            )
        }
    }

    when_item_clicked(index){
        if(this.state.selected_purchase_item == index){
            this.setState({selected_purchase_item: -1})
        }else{
            this.setState({selected_purchase_item: index})
        }
    }


    render_visible_purchase_item(item, sender_type, index, object){
        // var object = this.get_storefront_items()[this.props.selected_storefront_item]
        return(
            <div>
                <div onClick={()=> this.when_item_clicked(index)}>
                    {this.render_detail_item('3', {'size':'s', 'title':this.props.app_state.loc['1948']/* 'Shipping Details' */, 'details':item['shipping_detail']})}
                    <div style={{height:3}}/>
                    {this.render_detail_item('3', {'size':'s', 'title':this.props.app_state.loc['1958']/* 'Variant ID: ' */+item['variant_id'], 'details':this.get_variant_from_id(item['variant_id'], object)['variant_description'] })}
                    <div style={{height:3}}/>
                    {this.render_detail_item('3', {'size':'s', 'title':this.props.app_state.loc['1114c']/* 'custom_specifications ' */, 'details':item['custom_specifications']})}
                    <div style={{height:3}}/>
                    {this.render_detail_item('3', {'size':'s', 'title':this.props.app_state.loc['1063']/* 'Quantity: ' */+this.format_account_balance_figure(item['purchase_unit_count']), 'details':this.props.app_state.loc['1064']/* 'Sender Account ID: ' */+item['sender_account'] })}
                    <div style={{height:3}}/>
                    {this.render_fulfilment_signature_if_any(item, object)}
                    <div style={{height:5}}/>
                </div>
                {this.render_clear_purchase_button(item, object, sender_type)}
                
                <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '10px 20px 10px 20px'}}/>
            </div>
        )
        
    }

    render_clear_purchase_button(item, object, sender_type){
        var signature = this.props.app_state.direct_purchase_fulfilments[object['id']]
        if(signature == null || signature[item['signature_data']] == null){
            return(
                <div>
                    <div style={{'padding': '1px'}} onClick={() => this.props.open_clear_purchase(item, sender_type, object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2638']/* 'Clear Purchase' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    get_variant_from_id(variant_id, object){
        // var object = this.get_storefront_items()[this.props.selected_storefront_item]

        for(var i=0; i<object['ipfs'].variants.length; i++){
            if(object['ipfs'].variants[i]['variant_id'] == variant_id){
                return object['ipfs'].variants[i]
            }
        }
    }

    open_clear_purchase(item, client_type, storefront){
        this.props.open_clear_purchase(item, client_type, storefront)
    }


    render_fulfilment_signature_if_any(item, object){
        // var object = this.get_storefront_items()[this.props.selected_storefront_item]
        var signature = this.props.app_state.direct_purchase_fulfilments[object['id']]
        if(signature != null && signature[item['signature_data']] != null){
            signature = signature[item['signature_data']]
            return(
                <div>
                    {this.render_detail_item('3', {'size':'s', 'title':this.props.app_state.loc['2639']/* 'Fulfilment Signature: ' */, 'details':start_and_end(signature['signature']) })}
                    <div style={{height:3}}/>
                    {this.render_detail_item('3', {'size':'s', 'title':this.props.app_state.loc['2640']/* 'Signature Data: ' */, 'details':start_and_end(signature['signature_data']) })}
                    <div style={{height:3}}/>
                    {this.render_detail_item('3', {'size':'s', 'title':this.props.app_state.loc['2641']/* 'Signature Address: ' */, 'details':start_and_end(signature['sender_address']) })}
                </div>
            )
        }
    }












    render_storefront_message_activity(object){
        var he = this.props.height-100
        if(this.get_focused_message(object) != null) he = this.props.height-175
        var size = this.props.screensize
        return(
            <div>
                <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px', 'max-width':'470px'}}>
                    <div onScroll={event => this.handleScroll(event, object)} style={{ 'overflow-y': 'scroll', height: he, padding:'5px 0px 5px 0px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.comment_structure_tags} tag_size={'l'} when_tags_updated={this.when_comment_structure_tags_updated.bind(this)} theme={this.props.theme}/>
                        {this.render_top_title(object)}
                        {/* {this.render_focus_list(object)} */}
                        <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '10px 20px 10px 20px'}}/>
                        {this.render_sent_received_messages(object)}
                    </div>
                </div>
                {this.render_focused_message(object)}
                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 5px 5px', width: '99%'}}>
                    <div style={{'margin':'1px 0px 0px 0px'}}>
                        {/* {this.render_image_picker()} */}
                        <div>
                            <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}} onClick={()=> this.when_circle_clicked(object)}>
                                <img src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}}/>
                            </div>
                        </div>
                    </div>
                    <div style={{'margin': '0px 0px 0px 0px', width:this.props.width}}>
                        <TextInput font={this.props.app_state.font} height={20} placeholder={this.props.app_state.loc['1039']/* 'Enter Message...' */} when_text_input_field_changed={this.when_entered_text_input_field_changed.bind(this)} text={this.state.entered_text} theme={this.props.theme}/>
                    </div>

                    <div style={{'padding': '2px 5px 0px 5px', 'width':100}} onClick={()=>this.add_message_to_stack(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2151']/* 'Send' */, 'action':'-'})}
                    </div>
                </div>
            </div> 
        )
    }

    when_circle_clicked = (object) => {
        let me = this;
        if(Date.now() - this.last_all_click_time2 < 200){
            clearTimeout(this.all_timeout);
            //double tap
            me.scroll_to_bottom()
        }else{
            this.all_timeout = setTimeout(function() {
                clearTimeout(this.all_timeout);
                // single tap
                me.show_add_comment_bottomsheet(object)
            }, 200);
        }
        this.last_all_click_time2 = Date.now();
    }

    scroll_to_bottom(){
        this.messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
    }

    handleScroll = (event, object) => {
        console.log('scrolled')      
        this.has_user_scrolled[object['e5_id']] = true
    };

    render_focused_message(object){
        var item = this.get_focused_message(object);
        if(item != null){
            return(
                <div style={{'padding': '7px 15px 10px 15px','margin':'0px 70px 5px 50px', 'background-color': this.props.theme['messsage_reply_background'],'border-radius': '10px 10px 10px 10px'}} onClick={()=>this.unfocus_message(object)}> 
                    <div className="row" style={{'padding':'0px 0px 0px 0px'}}>
                        <div className="col-9" style={{'padding': '0px 0px 0px 14px', 'height':'20px' }}> 
                            <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} >{this.get_sender_title_text(item, object)}</p>
                        </div>
                        <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                            <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{this.get_time_difference(item['time'], object)}</p>
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

    show_add_comment_bottomsheet(object){
        // var object = this.get_storefront_items()[this.props.selected_storefront_item]
        var focused_message_id = this.get_focused_message(object) != null ? this.get_focused_message(object)['message_id'] : 0
        var setting = this.get_selected_item2(object['ipfs'].chatroom_enabled_tags_object, 'e')

        if(setting == 2/* 'disabled' */){
            this.props.notify(this.props.app_state.loc['2642']/* 'The activity section has been disabled.' */, 4200)
            return;
        }
        this.props.show_add_comment_bottomsheet(object, focused_message_id, 'storefront')
    }
  

    render_top_title(object){
        // var object = this.get_storefront_items()[this.props.selected_storefront_item]
        return(
            <div style={{padding:'5px 5px 5px 5px'}}>
                {this.render_detail_item('3', {'title':'In '+object['id'], 'details':object['ipfs'].entered_title_text, 'size':'l'})} 
            </div>
        )
    }

    constructor(props) {
        super(props);
        this.messagesEnd = React.createRef();
        this.has_user_scrolled = {}
    }

    componentDidUpdate(){
        var has_scrolled = this.has_user_scrolled[this.props.selected_storefront_item]
        if(has_scrolled == null){
            this.scroll_to_bottom()
        }
    }

    render_sent_received_messages(object){
        var middle = this.props.height-250;
        if(this.get_focused_message(object) != null) middle = this.props.height-300
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.get_convo_messages(object))
        var stacked_items = [].concat(this.get_stacked_items(object))

        if(items.length == 0 && stacked_items.length == 0){
            items = [0,1]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }
        // else if(this.get_focused_message(object) != null){
        //     var focused_message_replies = this.get_focused_message_replies(object)
        //     return(
        //         <div>
        //             <div style={{'padding': '2px 5px 2px 5px'}}>
        //                 {this.render_message_as_focused_if_so(this.get_focused_message(object), object)}
        //             </div>
        //             <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 5px 5px'}}>
        //                 <div style={{overflow: 'auto', 'width':'100%', maxHeight: middle}}>
        //                     <ul style={{ 'padding': '0px 0px 0px 20px', 'listStyle':'none'}}>
        //                         {this.render_messages(focused_message_replies, object)}
        //                         <div ref={this.messagesEnd}/>
        //                     </ul>
        //                 </div>
        //             </div>
        //         </div>
        //     )
        // }
        else{
            var selected_view_option = this.get_selected_item(this.state.comment_structure_tags, 'e')
            if(selected_view_option == this.props.app_state.loc['1671']/* 'channel-structure' */){
                return(
                <div style={{'overflow-y': 'scroll', 'display': 'flex', 'flex-direction': 'column-reverse'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.render_messages(items.concat(stacked_items), object)}
                        <div ref={this.messagesEnd}/>
                    </ul>
                </div>
            )
            }else{
                return(
                    <div style={{'overflow-y': 'scroll', 'display': 'flex', 'flex-direction': 'column-reverse'}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {this.render_all_comments(object)}
                            <div ref={this.messagesEnd}/>
                        </ul>
                    </div>
                )
            }
        }
    }

    render_messages(items, object){
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
                                            <img src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
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
                                {this.render_message_as_focused_if_so(item, object)}
                                <div style={{height:3}}/>
                            </div>
                        </li>
                    ))}    
                </div>
            )
        }
        
    }

    focus_message(item, object){
        var clone = JSON.parse(JSON.stringify(this.state.focused_message))
        // var object = this.get_storefront_items()[this.props.selected_storefront_item]

        if(this.state.focused_message[object['id']] != item){
            clone[object['id']] = item
            if(clone['tree'][object['id']] == null) {
                clone['tree'][object['id']] = []
            }
            // if(!this.includes_function(clone['tree'][object['id']], item)){
            // }
            clone['tree'][object['id']].push(item)
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

    unfocus_message(object){
        var clone = JSON.parse(JSON.stringify(this.state.focused_message))
        // var object = this.get_storefront_items()[this.props.selected_storefront_item]
        if(clone['tree'][object['id']] != null){
            var index = this.get_index_of_item(object)
            if(index != -1){
                clone['tree'][object['id']].splice(index, 1)
            }
        }

        var latest_message = clone['tree'][object['id']].length > 0 ? clone['tree'][object['id']][clone['tree'][object['id']].length -1] : null
        clone[object['id']] = latest_message
        this.setState({focused_message: clone})
    }

    get_index_of_item(object){
        // var object = this.get_storefront_items()[this.props.selected_storefront_item]
        var focused_item = this.state.focused_message[object['id']]
        var focused_items = this.state.focused_message['tree'][object['id']]
        var pos = -1
        for(var i=0; i<focused_items.length; i++){
            if(focused_items[i]['message_id'] == focused_item['message_id']){
                pos = i
                break
            }
        }
        return pos
    }


    render_message_as_focused_if_so(item, object){
        return(
            <div>
                <SwipeableList>
                        <SwipeableListItem
                            swipeLeft={{
                            content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2507a']/* Reply */}</p>,
                            action: () => this.focus_message(item, object)
                            }}>
                            <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>{this.render_stack_message_item(item, object)}</div>
                        </SwipeableListItem>
                    </SwipeableList>
            </div>
        )
        var focused_message = this.get_focused_message(object)

        if(item == focused_message){
            return(
                <div>
                    <SwipeableList>
                        <SwipeableListItem
                            swipeLeft={{
                            content: <div>Focus</div>,
                            action: () => console.log()
                            }}
                            swipeRight={{
                            content: <div>Unfocus</div>,
                            action: () => this.unfocus_message(object)
                            }}>
                            <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>{this.render_stack_message_item(item, object)}</div>
                        </SwipeableListItem>
                    </SwipeableList>
                    {/* <div onClick={(e) => this.when_message_clicked(e, item, 'focused_message')}>
                        {this.render_stack_message_item(item)}
                    </div> */}
                    <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '5px 20px 5px 20px'}}/>
                </div>
            )
        }else{
            return(
                <div>
                    <SwipeableList>
                        <SwipeableListItem
                            swipeLeft={{
                            content: <div>Focus</div>,
                            action: () => this.focus_message(item, object)
                            }}
                            swipeRight={{
                            content: <div>Unfocus</div>,
                            action: () => this.unfocus_message(object)
                            }}>
                            <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>{this.render_stack_message_item(item, object)}</div>
                        </SwipeableListItem>
                    </SwipeableList>

                    {/* <div onClick={(e) => this.when_message_clicked(e, item)}>
                        {this.render_stack_message_item(item)}
                    </div> */}
                </div>
            )
        }
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




    render_stack_message_item(item, object){
        if(this.is_sender_in_blocked_accounts(item)){
            return(
                <div>
                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                        <div style={{'margin':'10px 20px 10px 0px'}}>
                            <img src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
                        </div>
                    </div>
                </div>
            )
        }
        return(
            <div>
                <div style={{'padding': '7px 15px 10px 15px','margin':'0px 0px 0px 0px', 'background-color': this.props.theme['view_group_card_item_background'],'border-radius': '7px'}}>
                    <div className="row" style={{'padding':'0px 0px 0px 0px'}}>
                        <div className="col-9" style={{'padding': '0px 0px 0px 14px', 'height':'20px' }}> 
                            <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} onClick={()=>this.props.add_id_to_contacts(item['sender'], item, object)} >{this.get_sender_title_text(item, object)}</p>
                        </div>
                        <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                            <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{this.get_time_difference(item['time'], object)}</p>
                        </div>
                    </div>
                    <p style={{'font-size': '11px','color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'white-space': 'pre-line'}} onClick={(e) => this.when_message_clicked(e, item)}><Linkify options={{target: '_blank'}}>{this.format_message(item['message'], object)}</Linkify></p>

                    {this.render_images_if_any(item)}
                    <p style={{'font-size': '8px','color': this.props.theme['primary_text_color'],'margin': '1px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'white-space': 'pre-line'}} className="fw-bold">{this.get_message_replies(item, object).length} {this.props.app_state.loc['1693']}</p>
                </div>
                {this.render_response_if_any(item, object)}
            </div>
        )
        
    }

    render_response_if_any(_item, object){
        if(_item['focused_message_id'] == 0) return;
        // if(this.get_focused_message(object) != null) return;
        var message_items = this.get_convo_messages(object).concat(this.get_stacked_items(object))
        var item = this.get_item_in_message_array(_item['focused_message_id'], message_items)
        if(item == null) return;
        var selected_view_option = this.get_selected_item(this.state.comment_structure_tags, 'e')
        if(selected_view_option == this.props.app_state.loc['1672']/* 'comment-structure' */) return
        return(
            <div style={{'padding': '7px 15px 10px 15px','margin':'2px 5px 0px 20px', 'background-color': this.props.theme['messsage_reply_background'],'border-radius': '0px 0px 10px 10px'}}> 
                <div className="row" style={{'padding':'0px 0px 0px 10px'}}>
                    <div className="col-9" style={{'padding': '0px 0px 0px 0px', 'height':'20px' }}> 
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} onClick={()=>this.props.add_id_to_contacts(item['sender'], item, object)} >{this.get_sender_title_text(item, object)}</p>
                    </div>
                    <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                        <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{this.get_time_difference(item['time'], object)}</p>
                    </div>
                </div>
                <p style={{'font-size': '11px','color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'white-space': 'pre-line'}}>{this.truncate(item['message'], 53)}</p>
            </div>
        )
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

    get_sender_title_text(item, object){
        // var object = this.get_storefront_items()[this.props.selected_storefront_item]
        if(item['sender'] == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            return item['sender']
        }
    }

    format_message(message){
        if(message == ''){
            return '...'
        }
        return message
    }

    get_convo_messages(object){
        // var object = this.get_storefront_items()[this.props.selected_storefront_item]
        var messages = this.props.app_state.object_messages[object['id']]==null?[]:this.props.app_state.object_messages[object['id']]
        return this.filter_messages_for_blocked_accounts(messages)
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

    get_stacked_items(object){
        // var object = this.get_storefront_items()[this.props.selected_storefront_item]
        var convo_id = object['id']

        var stack = this.props.app_state.stack_items
        var stacked_items = []
        for(var i=0; i<stack.length; i++){
            if(stack[i].type == this.props.app_state.loc['1502']/* 'storefront-messages' */){
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

    get_focused_message_replies(object){
        var focused_message = this.get_focused_message(object)
        var all_messages = this.get_convo_messages(object).concat(this.get_stacked_items(object))
        var replies = []
        for(var i=0; i<all_messages.length; i++){
            if(all_messages[i]['focused_message_id'] != null && focused_message['message_id'] != null &&  all_messages[i]['focused_message_id'] == focused_message['message_id']){
                replies.push(all_messages[i])
            }
        }
        return replies
    }

    get_message_replies(item, object){
        var all_messages = this.get_convo_messages(object).concat(this.get_stacked_items(object))
        var replies = []
        for(var i=0; i<all_messages.length; i++){
            if(all_messages[i]['focused_message_id'] != null && item['message_id'] != null &&  all_messages[i]['focused_message_id'] == item['message_id']){
                replies.push(all_messages[i])
            }
        }
        return replies
    }

    get_focused_message(object){
        // var object = this.get_storefront_items()[this.props.selected_storefront_item]
        return this.state.focused_message[object['id']]
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
        this.setState({entered_text: text})
    }

    add_message_to_stack(object){
        var message = this.state.entered_text.trim()
        // var object = this.get_storefront_items()[this.props.selected_storefront_item]
        var message_id = Date.now()
        var focused_message_id = this.get_focused_message(object) != null ? this.get_focused_message(object)['message_id'] : 0

        var setting = this.get_selected_item2(object['ipfs'].chatroom_enabled_tags_object, 'e')


        if(message == ''){
            this.props.notify(this.props.app_state.loc['1695']/* 'Type something first.' */, 1600)
        }
        else if(this.props.app_state.user_account_id[object['e5']] == 1){
            this.props.notify(this.props.app_state.loc['1696']/* 'You need to make at least 1 transaction to participate.' */, 4200)
        }
        else if(setting == 2/* 'disabled' */){
            this.props.notify(this.props.app_state.loc['2642']/* 'The activity section has been disabled.' */, 5200)
        }
        else{
            var tx = {'id':object['id'], type:'message', entered_indexing_tags:['send', 'message'], 'message':message, 'sender':this.props.app_state.user_account_id[object['e5']], 'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id, 'e5':object['e5']}

            this.props.add_storefront_message_to_stack_object(tx)

            this.setState({entered_text:''})
            this.props.notify(this.props.app_state.loc['1697']/* 'Message added to stack' */, 1600)
            
            if (this.messagesEnd.current){
                this.messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }

    add_image_to_stack(image){
        var object = this.get_storefront_items()[this.props.selected_storefront_item]
        if(this.props.app_state.user_account_id[object['e5']] == 1){
            this.props.notify('you need to make at least 1 transaction to participate', 1200)
            return
        }
        var message_id = Date.now()
        var focused_message_id = this.get_focused_message() != null ? this.get_focused_message()['message_id'] : 0
        var message = this.state.entered_text.trim()
        var tx = {'id':object['id'], type:'image', 'message': message, entered_indexing_tags:['send', 'image'], 'image-data':{'images':[image],'pos':0}, 'sender':this.props.app_state.user_account_id[object['e5']],'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id, 'e5':object['e5']}

        this.props.add_storefront_message_to_stack_object(tx)

        this.setState({entered_text:''})
        this.props.notify('message added to stack', 600)

        if (this.messagesEnd.current){
            this.messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }


    render_focus_list(object){
        // var object = this.get_storefront_items()[this.props.selected_storefront_item]
        var items = this.state.focused_message['tree'][object['id']]

        if(items != null && items.length > 0){
            return(
                <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_focus_chain_item_clicked(item, index, object)}>
                                {this.render_detail_item('3', {'title':this.get_sender_title_text(item, object), 'details':this.shorten_message_item(this.format_message(item['message'], object), object), 'size':'s'})}
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


    when_focus_chain_item_clicked(item, pos, object){
        var clone = JSON.parse(JSON.stringify(this.state.focused_message))
        // var object = this.get_storefront_items()[this.props.selected_storefront_item]

        var new_array = []
        for(var i=0; i<=pos; i++){
            new_array.push(clone['tree'][object['id']][i])
        }
        clone[object['id']] = item
        clone['tree'][object['id']] = new_array
        
        this.setState({focused_message: clone})
    }





    render_all_comments(object){
        var sorted_messages_in_tree = (this.get_message_replies_in_sorted_object(object))
        return(
            <div>
                {sorted_messages_in_tree.children.map((item, index) => (
                    <li style={{'padding': '1px 5px 0px 5px'}} onClick={()=>console.log()}>
                        <div >
                            {this.render_main_comment(item, 0, object)}
                            <div style={{height:3}}/>
                        </div>
                    </li>
                ))}    
            </div>
        )
    }

    render_main_comment(comment, depth, object){
        return(
            <div>
                <div style={{'padding': '1px 0px 0px 0px'}} onClick={()=> this.when_message_item_clicked(comment.data.message, object)}>
                    {this.render_message_as_focused_if_so(comment.data.message, object)}
                </div>

                {this.render_message_children(comment, depth, object)}
            </div>
        )
    }

    render_message_children(comment, depth, object){
        var padding = depth > 4 ? '0px 0px 0px 5px' : '0px 0px 0px 20px'
        if(this.state.hidden_message_children_array.includes(comment.data.message['message_id'])){
            return(
                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px'}}>
                    <div style={{width:'100%'}}>
                        <ul style={{ 'padding': padding, 'listStyle':'none'}}>
                            {comment.children.map((item, index) => (
                                <li style={{'padding': '4px 0px 0px 0px'}}>
                                    <div>
                                        {this.render_main_comment(item, depth+1, object)}
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

    get_message_replies_in_sorted_object(object){
        var messages = this.get_convo_messages(object).concat(this.get_stacked_items(object))
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

    get_selected_item2(object, option){
        return object[option][2][0]
    }

    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var size = this.props.screensize
        var width = size == 'm' ? this.props.app_state.width/2 : this.props.app_state.width
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={width} show_images={this.props.show_images.bind(this)}/>
            </div>
        )

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

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
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




export default StorefrontDetailsSection;