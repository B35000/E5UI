import React, { Component } from 'react';
import ViewGroups from '../../components/view_groups';
import Tags from '../../components/tags';
import TextInput from '../../components/text_input';
import NumberPicker from '../../components/number_picker';

import Letter from '../../assets/letter.png';
import E5EmptyIcon from '../../assets/e5empty_icon.png';
import E5EmptyIcon3 from '../../assets/e5empty_icon3.png';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Draggable } from "react-drag-reorder";

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import imageCompression from 'browser-image-compression';

var bigInt = require("big-integer");

function number_with_commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
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

class NewStorefrontItemPage extends Component {
    
    state = {
        id: makeid(8), type:this.props.app_state.loc['766']/* 'edit-storefront-item' */,
        get_new_job_page_tags_object: this.get_new_job_page_tags_object(),
        entered_tag_text: '', entered_title_text:'', entered_text:'', fulfilment_location:'',
        entered_indexing_tags:[], entered_text_objects:[], entered_image_objects:[],
        entered_objects:[], exchange_id:'', price_amount:0, price_data:[],
        purchase_option_tags_object:this.get_purchase_option_tags_object(), available_unit_count:0, composition_type:this.get_composition_tags_object(), composition:'', variants:[], variant_images:[], variant_description:'', target_receiver:'', shipping_price_amount:0, shipping_exchange_id: '', shipping_price_data:[], visibility_tags_object: this.get_visibility_tags_object(), fulfilment_accounts:[], fulfilment_account:'', e5: this.props.app_state.selected_e5, chatroom_enabled_tags_object:this.get_chatroom_enabled_tags_object(), get_storefront_item_listing_option:this.get_storefront_item_listing_option(), get_storefront_item_in_stock_option:this.get_storefront_item_in_stock_option(), 
        
        typed_link_text:'', link_search_results:[], added_links:[],
        edit_text_item_pos:-1, edit_variant_item_pos:-1,

        get_sort_links_tags_object:this.get_sort_links_tags_object(),
    };

    get_new_job_page_tags_object(){
        var obj = {
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e', this.props.app_state.loc['440']/* 'configuration' */,this.props.app_state.loc['110']/* 'e.text' *//* ,this.props.app_state.loc['111'] *//* 'links' */, this.props.app_state.loc['112']/* 'images' */, this.props.app_state.loc['441']/* 'variants' */], [0]
            ],
            'text':[
                ['or','',0], [this.props.app_state.loc['115']/* 'text' */,this.props.app_state.loc['120']/* 'e.font' */, this.props.app_state.loc['121']/* 'e.size' */], [0]
            ],
            'font':[
                ['xor','e',1], [this.props.app_state.loc['116']/* 'font' */,'Sans-serif','Courier New','Times New Roman','ComicSans','papyrus'], [1],[1]
            ],
            'size':[
                ['xor','e',1], [this.props.app_state.loc['117']/* 'size' */,'15px','11px','25px','40px'], [1],[1]
            ],
        };

        obj[this.props.app_state.loc['115']] = [
                ['or','',0], [this.props.app_state.loc['115']/* 'text' */,this.props.app_state.loc['120']/* 'e.font' */, this.props.app_state.loc['121']/* 'e.size' */], [0]
            ];
        obj[this.props.app_state.loc['116']] = [
                ['or','',0], [this.props.app_state.loc['115']/* 'text' */,this.props.app_state.loc['120']/* 'e.font' */, this.props.app_state.loc['121']/* 'e.size' */], [0]
            ];
        obj[this.props.app_state.loc['117']] = [
                ['xor','e',1], [this.props.app_state.loc['117']/* 'size' */,'15px','11px','25px','40px'], [1],[1]
            ];

        return obj;
    }

    get_new_job_text_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e','e.font', 'e.size'], [0]
            ],
            'font':[
                ['xor','e',1], ['font','Sans-serif','Courier New','Times New Roman','ComicSans','papyrus'], [1],[1]
            ],
            'size':[
                ['xor','e',1], ['size','15px','11px','25px','40px'], [1],[1]
            ],
        };
    }


    get_purchase_option_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['89']/* 'enabled' */, this.props.app_state.loc['90']/* 'disabled' */], [1]
            ],
        };
    }


    get_visibility_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['442']/* 'invisible' */, this.props.app_state.loc['443']/* 'masked' */, this.props.app_state.loc['444']/* 'unmasked' */], [1]
            ],
        };
    }


    get_chatroom_enabled_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', this.props.app_state.loc['89']/* 'enabled' */, this.props.app_state.loc['90']/* 'disabled' */], [1]
            ],
        };
    }


    get_composition_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', this.props.app_state.loc['445']/* 'items' */,this.props.app_state.loc['446']/* 'grams' */,this.props.app_state.loc['447']/* 'kilos' */,this.props.app_state.loc['448']/* 'ounces' */,this.props.app_state.loc['449']/* 'pounds' */,this.props.app_state.loc['450'] /* 'centimeters' */,this.props.app_state.loc['451']/* 'meters' */,this.props.app_state.loc['452']/* 'inches' */,this.props.app_state.loc['453']/* 'feet' */,this.props.app_state.loc['454'] /* 'mililiters' */,this.props.app_state.loc['455']/* 'liters' */,this.props.app_state.loc['456']/* 'gallons' */], [1]
            ]
        };
    }



    get_storefront_item_listing_option(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', this.props.app_state.loc['457']/* 'listed' */, this.props.app_state.loc['458'] /* 'delisted' */], [1]
            ],
        };
    }
    

    get_storefront_item_in_stock_option(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', this.props.app_state.loc['459']/* 'in-stock' */, this.props.app_state.loc['460']/* 'out-of-stock' */], [1]
            ],
        };
    }

    get_sort_links_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['162a']/* '📑 contract' */, this.props.app_state.loc['162b']/* '💼 job' */, this.props.app_state.loc['162c']/* '👷🏻‍♀️ contractor' */, this.props.app_state.loc['162d']/* '🏪 storefront' */, this.props.app_state.loc['162e']/* '🎫 subscription' */,this.props.app_state.loc['162f']/* '📰 post' */,this.props.app_state.loc['162g'] /* '📡 channel' */, this.props.app_state.loc['162h']/* '🪙 token' */, this.props.app_state.loc['162i']/* '🧎 proposal' */], [0]
            ],
        };
    }


    
    set(){
        this.setState({get_new_job_page_tags_object: this.get_new_job_page_tags_object(), get_storefront_item_listing_option:this.get_storefront_item_listing_option(), get_storefront_item_in_stock_option:this.get_storefront_item_in_stock_option(), edit_text_item_pos:-1,get_sort_links_tags_object:this.get_sort_links_tags_object()})
    }



    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>

                <div className="row">
                    <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.get_new_job_page_tags_object} tag_size={'l'} when_tags_updated={this.when_new_job_page_tags_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'padding': '5px'}} onClick={()=>this.finish_creating_object()}>
                            {this.render_detail_item('5', {'text':this.props.app_state.loc['4']/* finish */, 'action':'finish_creating_object'})}
                        </div>
                        
                    </div>
                </div>
                
                <div style={{'margin':'0px 0px 0px 0px'}}>
                    {this.render_everything()}   
                </div>
                
            </div>
        )
    }

    when_new_job_page_tags_updated(tag_group){
        this.setState({get_new_job_page_tags_object: tag_group})
    }


    render_everything(){
        var selected_item = this.get_selected_item(this.state.get_new_job_page_tags_object, this.state.get_new_job_page_tags_object['i'].active)

        if(selected_item == 'e'){
            return(
                <div>
                    {this.render_enter_tags_part()}
                </div>
            )    
        }
        if(selected_item == this.props.app_state.loc['440']/* 'configuration' */){
            return(
                <div>
                    {this.render_subscription_configuration_part()}
                </div>
            )    
        }
        else if(this.is_text_selected_item(selected_item)){
            return(
                <div>
                    {this.render_enter_text_part()}
                </div>
            ) 
        }
        else if(selected_item == this.props.app_state.loc['111']/* 'links' */){
            return(
                <div>
                    {this.render_enter_links_part()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['112']/* 'images' */){
            return(
                <div>
                    {this.render_enter_image_part()}
                </div>
            ) 
        }
        else if(selected_item == this.props.app_state.loc['441']/* 'variants' */){
            return(
                <div>
                    {this.render_variants_picker_part()}
                </div>
            )
        }
    }

    is_text_selected_item(selected_item){
        var obj = [this.props.app_state.loc['115']/* 'text' */,this.props.app_state.loc['116']/* 'font' */,this.props.app_state.loc['117']/* 'size' */,'Sans-serif','Courier New','Times New Roman','ComicSans','papyrus', '15px','11px','25px','40px']
        if(obj.includes(selected_item)){
            return true
        }
        return false
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }



    render_subscription_configuration_part(){
        var selected_composition = this.get_selected_item(this.state.composition_type, 'e')
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['463']/* 'Unit Denomination' */, 'details':this.props.app_state.loc['464']/* 'Specify the denomination of the item from the tag picker below' */, 'size':'l'})}
                <div style={{height:10}}/>

                <Tags font={this.props.app_state.font} page_tags_object={this.state.composition_type} tag_size={'l'} when_tags_updated={this.when_composition_type_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>

                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'13px','text':this.props.app_state.loc['465']/* 'Set denomination: ' */+selected_composition})}

                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['466']/* 'Target Payment Recipient' */, 'details':this.props.app_state.loc['467']/* 'Set the account ID thats set to receive the purchase payments for your new item' */, 'size':'l'})}
                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['535b']/* 'Enter Account ID' */} when_text_input_field_changed={this.when_target_receiver_input_field_changed.bind(this)} text={this.state.target_receiver} theme={this.props.theme}/>
                {this.load_account_suggestions('target_receiver')}



                {this.render_detail_item('3', {'title':this.props.app_state.loc['468']/* 'Fulfilment Location' */, 'details':this.props.app_state.loc['469']/* 'Set location of the pick up station for your item when its ordered using a bag and contractors' */, 'size':'l'})}
                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={70} placeholder={this.props.app_state.loc['470']/* 'Location Details...' */} when_text_input_field_changed={this.when_fulfilment_location_input_field_changed.bind(this)} text={this.state.fulfilment_location} theme={this.props.theme}/>
                {this.render_shipping_detail_suggestions()}
                <div style={{height:10}}/>


                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['471']/* 'Direct Purchase Option' */, 'details':this.props.app_state.loc['472']/* 'If set to enabled, youll handle the shipping for the item when purchased directly by your clients' */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.purchase_option_tags_object} tag_size={'l'} when_tags_updated={this.when_purchase_option_tags_object_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>


                
                {/* {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':'Sales Visibility', 'details':'If set to masked, all your direct purchase sales will be invisible to outsiders', 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.visibility_tags_object} tag_size={'l'} when_tags_updated={this.when_visibility_tags_object_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/> */}


                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['473']/* 'Product Chatroom' */, 'details':this.props.app_state.loc['474']/* 'If set to disabled, senders cannot send messsages to the new storefront items product chatroom in the activity section' */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.chatroom_enabled_tags_object} tag_size={'l'} when_tags_updated={this.when_chatroom_enabled_tags_object_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>




                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['475']/* 'Product Listing' */, 'details':this.props.app_state.loc['476']/* 'If set to delisted, the item will not be visible for purchasing' */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_storefront_item_listing_option} tag_size={'l'} when_tags_updated={this.when_get_storefront_item_listing_option_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>





                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['477']/* 'Product Stock' */, 'details':this.props.app_state.loc['478']/* 'If set to out-of-stock, users will not be able to direct purchase or add to their bags.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_storefront_item_in_stock_option} tag_size={'l'} when_tags_updated={this.when_get_storefront_item_in_stock_option_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>
                

                {this.render_direct_shipping_fee_view_if_enabled()}
            </div>
        )
    }

    get_fulfilment_location_from_local_storage(){
        var fulfilment_locations = localStorage.getItem("fulfilment");
        if(fulfilment_locations != null && fulfilment_locations != ""){
            fulfilment_locations = JSON.parse(fulfilment_locations)
        }else{
            return []
        }

        return fulfilment_locations['data']
    }

    when_suggestion_clicked = (item, pos) => {
        let me = this;
        if(Date.now() - this.last_all_click_time2 < 200){
            clearTimeout(this.all_timeout);
            //double tap
            me.when_location_suggestion_double_tapped(item, pos)
        }else{
            this.all_timeout = setTimeout(function() {
                clearTimeout(this.all_timeout);
                // single tap
                me.when_location_suggestion_tapped(item, pos)
            }, 200);
        }
        this.last_all_click_time2 = Date.now();
    }

    when_location_suggestion_tapped(item, pos){
        this.setState({fulfilment_location: item['text']})
    }

    when_location_suggestion_double_tapped(item, pos){
        this.remove_fulfilment_location_from_local_storage(pos)
    }

    render_direct_shipping_fee_view_if_enabled(){
        var selected_item = this.get_selected_item(this.state.purchase_option_tags_object, this.state.purchase_option_tags_object['i'].active)

        if(selected_item == this.props.app_state.loc['89']/* 'enabled' */){
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['479']/* 'Fulfilment Accounts' */, 'details':this.props.app_state.loc['480']/* 'Set the accounts involved with shipping and fulfilling direct purchase orders from clients' */, 'size':'l'})}

                    <div className="row" style={{width: '103%'}}>
                        <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                            <TextInput font={this.props.app_state.font} height={25} placeholder={this.props.app_state.loc['153']} when_text_input_field_changed={this.when_fulfilment_account_input_field_changed.bind(this)} text={this.state.fulfilment_account} theme={this.props.theme}/>
                        </div>
                        <div className="col-3" style={{'padding': '2px 0px 0px 0px'}}>
                            <div style={{'padding': '5px'}} onClick={() => this.when_add_shipping_account_set()}>
                                {this.render_detail_item('5', {'text':this.props.app_state.loc['169']/* 'Add' */, 'action':'', 'prevent_default':true})}
                            </div>
                        </div>
                    </div>
                    {/* {this.load_account_suggestions('fulfilment_account')} */}
                    {this.render_fulfilment_accounts()}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['481']/* 'Direct Purchase Shipping Fee' */, 'details':this.props.app_state.loc['482']/* 'The shipping fee you charge for shipping your item when directly purchased by your clients' */, 'size':'l'})}

                    <div style={{height:10}}/>
                    <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['535a']/* 'Exchange ID' */} when_text_input_field_changed={this.when_shipping_exchange_id_input_field_changed.bind(this)} text={this.state.shipping_exchange_id} theme={this.props.theme}/>
                    {this.load_token_suggestions('shipping_exchange_id')}

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['484']/* 'Price' */, 'subtitle':this.format_power_figure(this.state.shipping_price_amount), 'barwidth':this.calculate_bar_width(this.state.shipping_price_amount), 'number':this.format_account_balance_figure(this.state.shipping_price_amount), 'barcolor':'', 'relativepower':this.props.app_state.loc['483']/* 'tokens' */, })}
                    </div>

                    <NumberPicker font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_shipping_price_amount.bind(this)} theme={this.props.theme} power_limit={63}/>

                    <div style={{'padding': '5px'}} onClick={() => this.when_add_shipping_price_set()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['485']/* 'Add Price' */, 'action':''})}
                    </div>
                    {this.render_shipping_set_prices_list_part()}
                </div>
            )
        }
    }


    when_shipping_exchange_id_input_field_changed(exchange_id){
        this.setState({shipping_exchange_id: exchange_id})
    }

    when_shipping_price_amount(amount){
        this.setState({shipping_price_amount: amount})
    }

    when_visibility_tags_object_updated(tag_obj){
        this.setState({visibility_tags_object: tag_obj})
    }

    when_fulfilment_account_input_field_changed(text){
        this.setState({fulfilment_account: text})
    }

    when_chatroom_enabled_tags_object_updated(tag_obj){
        this.setState({chatroom_enabled_tags_object: tag_obj})
    }

    when_get_storefront_item_listing_option_updated(tag_obj){
        this.setState({get_storefront_item_listing_option: tag_obj})
    }

    when_get_storefront_item_in_stock_option_updated(tag_obj){
        this.setState({get_storefront_item_in_stock_option: tag_obj})
    }


    when_add_shipping_price_set(){
        var exchange_id = this.get_token_id_from_symbol(this.state.shipping_exchange_id.trim())
        var amount = this.state.shipping_price_amount
        if(isNaN(exchange_id) || parseInt(exchange_id) < 0 || exchange_id == '' || !this.does_exchange_exist(exchange_id)){
            this.props.notify(this.props.app_state.loc['486']/* 'please put a valid exchange id' */, 1600)
        }
        else if(amount == 0){
            this.props.notify(this.props.app_state.loc['487']/* 'please put a valid amount' */, 1600)
        }
        else if(this.is_exchange_already_added(exchange_id, this.state.shipping_price_data)){
            this.props.notify(this.props.app_state.loc['488']/* 'You cant use the same exchange twice' */, 3600)
        }
        else{
            var price_data_clone = this.state.shipping_price_data.slice()
            price_data_clone.push({'id':exchange_id, 'amount':amount})
            this.setState({shipping_price_data: price_data_clone, shipping_price_amount:0, shipping_exchange_id:''});
            this.props.notify(this.props.app_state.loc['489']/* 'added shipping price!' */, 1400)
        }
    }

    does_exchange_exist(exchange_id){
        if(this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][parseInt(exchange_id)] == null){
            return false
        }
        return true
    }

    get_token_id_from_symbol(typed_search){
        if(!isNaN(typed_search)){
            return typed_search
        }
        var id = this.props.app_state.token_directory[this.props.app_state.selected_e5][typed_search.toUpperCase()] == null ? typed_search : this.props.app_state.token_directory[this.props.app_state.selected_e5][typed_search.toUpperCase()]

        return id
    }

    render_shipping_set_prices_list_part(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.shipping_price_data)

        if(items.length == 0){
            items = [0, 1]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 0px 2px 0px'}} onClick={()=>console.log()}>
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
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>this.when_shipping_amount_clicked(item)}>
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.selected_e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
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

    when_shipping_amount_clicked(item){
        var cloned_array = this.state.shipping_price_data.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({shipping_price_data: cloned_array})
    }



    when_add_shipping_account_set(){
        var account = this.get_typed_alias_id(this.state.fulfilment_account)
        if(isNaN(account) || account == '' || parseInt(account) < 1000){
            this.props.notify(this.props.app_state.loc['490']/* 'please put a valid account id' */, 2600)
        }else{
            var clone = this.state.fulfilment_accounts.slice()
            clone.push(account)
            this.setState({fulfilment_accounts: clone, fulfilment_account:''})
            this.props.notify(this.props.app_state.loc['491']/* 'added account' */, 1400)
        }
    }

    get_typed_alias_id(alias){
        if(!isNaN(alias)){
            return alias
        }
        var id = (this.props.app_state.alias_owners[this.props.app_state.selected_e5][alias] == null ? 
            alias : this.props.app_state.alias_owners[this.props.app_state.selected_e5][alias])

        return id
    }


    render_fulfilment_accounts(){
        var items = [].concat(this.state.fulfilment_accounts)
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 7px 0px', width: '97%', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 5px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_fulfilment_account_clicked(item)}>
                            {this.render_detail_item('3', {'title':item, 'details':this.props.app_state.loc['492']/* 'Account' */, 'size':'s'})}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }


    when_fulfilment_account_clicked(item){
        var cloned_array = this.state.fulfilment_accounts.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({fulfilment_accounts: cloned_array})
    }





    load_account_suggestions(target_type){
        var items = [].concat(this.get_suggested_accounts(target_type))
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 7px 0px', width: '97%', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 5px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                      {items.map((item, index) => (
                          <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_suggestion_clicked(item, index, target_type)}>
                              {this.render_detail_item('3', item['label'])}
                          </li>
                      ))}
                  </ul>
                </div>
        )
    }

    get_suggested_accounts(target_type){
        var myid = this.props.app_state.user_account_id[this.props.app_state.selected_e5]
        if(myid == null) myid = 1
        if(myid == 1){
            return this.get_account_suggestions(target_type)
        }
        return[
            {'id':''+myid, 'label':{'title':this.props.app_state.loc['493']/* 'My Account' */, 'details':this.props.app_state.loc['492']/* 'Account' */, 'size':'s'}},
        ].concat(this.get_account_suggestions(target_type))
    }

    get_account_suggestions(target_type){
        var contacts = this.props.app_state.contacts[this.props.app_state.selected_e5]
        var return_array = []

        if(target_type == 'target_receiver'){
            contacts.forEach(contact => {
                if(contact['id'].toString().includes(this.state.target_receiver)){
                    return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
                }
            });
        }
        else if(target_type == 'fulfilment_account'){
            contacts.forEach(contact => {
                if(contact['id'].toString().includes(this.state.fulfilment_account)){
                    return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
                }
            });
        }
        
        return return_array;
    }

    get_contact_alias(contact){
        return (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[contact['id']] == null ? ((contact['address'].toString()).substring(0, 9) + "...") : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[contact['id']])
    }


    when_suggestion_clicked(item, pos, target_type){
        if(target_type == 'target_receiver'){
            this.setState({target_receiver: item['id']})
        }
        else if(target_type == 'fulfilment_account'){
            this.setState({fulfilment_account: item['id']})
        }
    }


















    render_enter_tags_part(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div>
                    {this.render_title_tags_part()}
                    {this.render_new_job_object()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 0px 0px 0px'}}>
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_title_tags_part()}
                    </div>
                    <div className="col-6">
                        {this.render_new_job_object()}
                    </div>
                </div>
                
            )
        }
    }

    render_title_tags_part(){
        return(
            <div style={{'padding':'0px 10px 0px 10px'}}>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['494']/* 'Set a title for your new Storefront Item' */})}
                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['495']/* 'Enter Title...' */} when_text_input_field_changed={this.when_title_text_input_field_changed.bind(this)} text={this.state.entered_title_text} theme={this.props.theme}/>

                <div style={{height: 10}}/>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.state.entered_title_text})}
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']/* 'remaining character count: ' */+(this.props.app_state.title_size - this.state.entered_title_text.length)})}

                {this.render_detail_item('0')}
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['496']/* 'Set tags for indexing your new Storefront Item' */})}
                <div style={{height:10}}/>

                <div className="row">
                    <div className="col-9" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['126']/* 'Enter Tag...' */} when_text_input_field_changed={this.when_index_text_input_field_changed.bind(this)} text={this.state.entered_tag_text} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 5px 0px 0px'}}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['127']/* 'Add' */, 'action':'add_indexing_tag', 'prevent_default':true})}
                    </div>
                </div>
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']/* 'remaining character count: ' */+(this.props.app_state.tag_size - this.state.entered_tag_text.length)})}
                
                {this.render_detail_item('1',{'active_tags':this.state.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':'delete_entered_tag_word'})}

                {this.render_detail_item('0')}
                {this.render_detail_item('0')}
            </div>
        )
    }

    when_title_text_input_field_changed(text){
        this.setState({entered_title_text: text})
    }

    when_index_text_input_field_changed(text){
        this.setState({entered_tag_text: text})
    }

    when_purchase_option_tags_object_updated(tag_obj){
        this.setState({purchase_option_tags_object: tag_obj})
    }

    when_available_unit_count(number){
        this.setState({available_unit_count: number})
    }

    when_composition_type_updated(tag_obj){
        this.setState({composition_type: tag_obj})
    }

    when_target_receiver_input_field_changed(text){
        this.setState({target_receiver: text})
    }

    when_fulfilment_location_input_field_changed(text){
        this.setState({fulfilment_location:text})
    }



    add_indexing_tag_for_new_job(){
        var typed_word = this.state.entered_tag_text.trim().toLowerCase();

        if(typed_word == ''){
            this.props.notify(this.props.app_state.loc['128']/* 'type something!' */, 400)
        }
        else if(this.hasWhiteSpace(typed_word)){
            this.props.notify(this.props.app_state.loc['129']/* 'enter one word!' */, 1400)
        }
        else if(typed_word.length > this.props.app_state.tag_size){
            this.props.notify(this.props.app_state.loc['130']/* 'That tag is too long' */, 1400)
        }
        else if(typed_word.length < 3){
            this.props.notify(this.props.app_state.loc['131']/* 'That tag is too short' */, 1400)
        }
        else if(this.state.entered_indexing_tags.includes(typed_word)){
            this.props.notify(this.props.app_state.loc['132']/* 'you cant enter the same word twice' */, 1400)
        }
        else if(this.state.entered_indexing_tags.length == this.props.app_state.max_tags_count){
            this.props.notify(this.props.app_state.loc['162l']/* The maximum number of tags you can use is 7. */, 5400)
        }
        else if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(typed_word)){
            this.props.notify(this.props.app_state.loc['162m'], 4400)/* You cant use special characters. */
        }
        else{
            var cloned_seed_array = this.state.entered_indexing_tags.slice()
            cloned_seed_array.push(typed_word)
            this.setState({entered_indexing_tags: cloned_seed_array, entered_tag_text:''})
            // this.props.notify('tag added!', 200)
        }
    }

    hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
    }

    delete_entered_tag_word(word, pos){
        var cloned_seed_array = this.state.entered_indexing_tags.slice()
        const index = cloned_seed_array.indexOf(word);
        if (index > -1) { // only splice array when item is found
            cloned_seed_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_indexing_tags: cloned_seed_array})
        // this.props.notify('tag removed', 200)
    }

   



    
    render_new_job_object(){
        return;
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var items = [].concat(this.state.entered_objects);
        return ( 
            <div onClick={() => console.log()} style={{height:'auto', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color, 'margin':'0px 10px 10px 10px'}}>
                <div style={{'padding': '5px 0px 5px 0px'}}>
                    {this.render_detail_item('1',{'active_tags':this.state.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':'delete_entered_tag_word'})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.state.entered_title_text})}
                    {this.render_detail_item('0')}

                    <Draggable>
                        {items.map((item, index) => (
                            <div key={index}>
                                {this.render_detail_item(item['type'], item['data'])} 
                                <div style={{height:10}}/>
                            </div>
                        ))}
                    </Draggable>
                </div>         
            </div>
        );
    }






    render_enter_text_part(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div style={{'padding': '0px 10px 0px 0px'}}>
                    {this.render_text_part()}
                    {this.render_entered_texts()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 0px 0px 0px'}}>
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_text_part()}
                    </div>
                    <div className="col-6">
                        {this.render_entered_texts()}
                    </div>
                </div>
                
            )
        }
    }

    render_text_part(){
        var add_text_button = this.state.edit_text_item_pos == -1 ? this.props.app_state.loc['136']/* 'Add Text' */ : this.props.app_state.loc['137']/* 'Edit Text' */
        return(
            <div style={{'margin':'10px 0px 0px 10px'}}>
                {/* {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['497']})} */}
                
                {/* <Tags font={this.props.app_state.font} page_tags_object={this.state.get_new_job_text_tags_object} tag_size={'l'} when_tags_updated={this.when_new_job_font_style_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/> */}

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['135']/* 'Type Something...' */} when_text_input_field_changed={this.when_entered_text_input_field_changed.bind(this)} text={this.state.entered_text} theme={this.props.theme}/>
                <div style={{height:10}}/>
                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '7px 5px 10px 10px', width: '99%'}}>
                    {/* <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img src={E5EmptyIcon} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                        <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".gif" onChange ={this.when_banner_image_picked.bind(this)} />
                    </div> */}

                    <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img src={E5EmptyIcon3} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                        <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept ="image/*" onChange ={this.when_banner_image_picked.bind(this)} />
                    </div>

                    <div style={{'padding': '5px', width:205}}>
                        {this.render_detail_item('5', {'text':add_text_button, 'action':'when_add_text_button_tapped', 'prevent_default':true})}
                    </div>
                </div>

                <div style={{height:10}}/>
                {this.render_detail_item('4',this.get_edited_text_object())}
                {this.render_detail_item('0')}
            </div>
        )
    }

    when_entered_text_input_field_changed(text){
        this.setState({entered_text: text})
    }

    when_new_job_font_style_updated(tag_group){
        this.setState({get_new_job_text_tags_object: tag_group})
    }

    get_edited_text_object(){
        var font = this.get_selected_item(this.state.get_new_job_page_tags_object, 'font')
        var size = this.get_selected_item(this.state.get_new_job_page_tags_object, 'size')
        return{
            'font':font, 'textsize':size,'text':this.state.entered_text
        }
    }

    when_add_text_button_tapped(){
        var typed_word = this.state.entered_text.trim();

        if(typed_word == ''){
            this.props.notify(this.props.app_state.loc['128']/* 'type something!' */, 1400)
        }else{
            var entered_text = this.get_edited_text_object()
            if(this.state.edit_text_item_pos != -1){
                this.finish_editing_text_item(entered_text)
            }else{
                var cloned_entered_text_array = this.state.entered_text_objects.slice()
                cloned_entered_text_array.push(entered_text);
                this.setState({entered_text_objects: cloned_entered_text_array, entered_text:''})

                var cloned_array = this.state.entered_objects.slice()
                cloned_array.push({'data':entered_text, 'type':'4' })
                this.setState({entered_objects: cloned_array})
            }
            
        }
    }

    render_entered_texts(){
        var middle = this.props.height-420;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.entered_objects)
        return ( 
            <div style={{}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <SwipeableList>
                            <SwipeableListItem
                                swipeLeft={{
                                content: <div>Delete</div>,
                                action: () => this.delete_text_item(item)
                                }}
                                swipeRight={{
                                content: <div></div>,
                                action: () => console.log() }}>
                                <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}><li style={{'padding': '5px'}} onClick={()=>this.edit_text_item(item)}>
                                    {this.render_text_or_banner_if_any(item, index)}
                                </li></div>
                            </SwipeableListItem>
                        </SwipeableList>
                        
                    ))}
                </ul>
            </div>
        );
    }

    render_text_or_banner_if_any(item, index){
        if(item['type'] == '11'){
            return(
                <div>
                    <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '7px 5px 10px 10px', width: '99%'}}>
                        <div>
                            {/* <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                                <img src={E5EmptyIcon} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                                <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".gif" onChange ={(e) => this.when_banner_image_updated(e, index)} />
                            </div> */}

                            <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                                <img src={E5EmptyIcon3} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                                <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept ="image/*" onChange ={(e) => this.when_banner_image_updated(e, index)} />
                            </div>
                        </div>
                        <div style={{width:2}}/>
                        {this.render_detail_item('11',item['data'])}
                    </div>
                </div>
            )
        }
        else if(item['type'] == '4'){
            var object = structuredClone(item['data'])
            if(this.state.edit_text_item_pos == index) object['text'] = ''
            return(
                <div>
                    {this.render_detail_item('4', object)}
                </div>
            )
        }
    }

    delete_text_item(item){
        var cloned_array = this.state.entered_text_objects.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_text_objects: cloned_array})

        var entered_objects_pos = -1;
        for(var i=0; i<this.state.entered_objects.length; i++){
            if(this.state.entered_objects[i]['data'] == item['data']){
                entered_objects_pos = i;
            }
        }

        var cloned_array = this.state.entered_objects.slice()
        if (entered_objects_pos > -1) { // only splice array when item is found
            cloned_array.splice(entered_objects_pos, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_objects: cloned_array})

        // this.props.notify('item removed!', 600)
    }

    when_banner_image_picked = (e) => {
        if(e.target.files && e.target.files[0]){
            for(var i = 0; i < e.target.files.length; i++){ 
                let reader = new FileReader();
                reader.onload = function(ev){
                    if(ev.total < this.props.app_state.image_size_limit){
                        this.add_banner_to_object(ev.target.result)
                        // this.setState({selected_banner_image: ev.target.result});
                    }
                }.bind(this);
                var imageFile = e.target.files[i];
                imageCompression(imageFile, { maxSizeMB: 0.35, maxWidthOrHeight: 1920, useWebWorker: true }).then(function (compressedFile) {
                    reader.readAsDataURL(compressedFile);
                })
                .catch(function (error) {
                    console.log(error.message);
                });
            }
            var image = e.target.files.length == 1 ? 'image has' : 'images have';
            // this.props.notify('Your selected '+e.target.files.length+image+' been staged.',500);
        }
    }

    when_banner_image_updated = (e, index) => {
        if(e.target.files && e.target.files[0]){
            for(var i = 0; i < e.target.files.length; i++){ 
                let reader = new FileReader();
                reader.onload = function(ev){
                    if(ev.total < this.props.app_state.image_size_limit){
                        this.update_banner_in_object(ev.target.result, index)
                        // this.setState({selected_banner_image: ev.target.result});
                    }
                }.bind(this);
                var imageFile = e.target.files[i];
                imageCompression(imageFile, { maxSizeMB: 0.35, maxWidthOrHeight: 1920, useWebWorker: true }).then(function (compressedFile) {
                    reader.readAsDataURL(compressedFile);
                })
                .catch(function (error) {
                    console.log(error.message);
                });
            }
            var image = e.target.files.length == 1 ? 'image has' : 'images have';
            // this.props.notify('Your selected '+e.target.files.length+image+' been staged.',500);
        }
    }

    add_banner_to_object(image){
        var entered_text = this.get_edited_text_object()
        entered_text['textsize'] = '10px'
        var obj = {'image':image, 'caption':entered_text}
        var cloned_array = this.state.entered_objects.slice()
        cloned_array.push({'data':obj, 'type':'11' }) 
        this.setState({entered_objects: cloned_array, entered_text:''})
    }


    update_banner_in_object(image, index){
        var entered_text = this.get_edited_text_object()
        entered_text['textsize'] = '10px'
        var obj = {'image':image, 'caption':entered_text}
        var cloned_array = this.state.entered_objects.slice()
        var pos = index
        cloned_array[pos] = {'data':obj, 'type':'11' }
        this.setState({entered_objects: cloned_array, entered_text:''})
    }


    edit_text_item(item){
        var entered_objects_pos = -1;
        for(var i=0; i<this.state.entered_objects.length; i++){
            if(this.state.entered_objects[i]['data'] == item['data']){
                entered_objects_pos = i;
            }
        }
        if(item['type'] == '11'){
            return;
        }else{
            var text = item['data']['text']
            this.setState({edit_text_item_pos: entered_objects_pos, entered_text:text})
        }
        // this.props.notify('editing item', 600)
    }


    finish_editing_text_item(item){
        var cloned_array = this.state.entered_objects.slice()
        var pos = this.state.edit_text_item_pos
        cloned_array[pos] = {'data':item, 'type':'4' }
        console.log(cloned_array)
        this.setState({entered_objects: cloned_array, entered_text:'', edit_text_item_pos: -1})
    }











    render_enter_links_part(){
        return(
            <div style={{'margin':'10px 0px 0px 0px'}}>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['498']/* 'Search an object by its title or id, then tap it to add it to the new channel' */})}
                <div style={{height:10}}/>
                <div className="row" style={{width:'103%'}}>
                    <div className="col-9" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput font={this.props.app_state.font} height={30} placeholder={'Enter Object ID...'} when_text_input_field_changed={this.when_typed_link_text_changed.bind(this)} text={this.state.typed_link_text} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 10px 0px 0px'}} onClick={()=> this.search_object()} >
                        {this.render_detail_item('5',{'text':this.props.app_state.loc['499']/* 'Search' */,'action':'', 'prevent_default':true})}
                    </div>
                </div>
                <div style={{height:10}}/>
                {this.render_selected_links()}

                {this.render_detail_item('0')}
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_sort_links_tags_object} tag_size={'l'} when_tags_updated={this.when_get_sort_links_tags_object_updated.bind(this)} theme={this.props.theme}/>

                <div style={{height:10}}/>
                {this.render_searched_link_results()}

            </div>
        )
    }

    when_get_sort_links_tags_object_updated(tag_obj){
        this.setState({get_sort_links_tags_object: tag_obj})
    }

    when_typed_link_text_changed(text){
        this.setState({typed_link_text: text})
    }


    search_object(){
        var typed_text = this.state.typed_link_text

        if(typed_text == ''){
            this.props.notify(this.props.app_state.loc['128']/* 'Type something' */, 1800)
        }else{
            this.props.notify(this.props.app_state.loc['141']/* 'Searching...' */, 600)
            var return_data = this.search_for_object(typed_text)
            this.setState({link_search_results: return_data})
        }
    }


    search_for_object(typed_text){
        var contracts = this.get_all_sorted_objects(this.props.app_state.created_contracts)
        var channels = this.get_all_sorted_objects(this.props.app_state.created_channels)
        var contractors = this.get_all_sorted_objects(this.props.app_state.created_contractors)
        var jobs = this.get_all_sorted_objects(this.props.app_state.created_jobs)
        var posts = this.get_all_sorted_objects(this.props.app_state.created_posts)
        var proposals = this.get_all_sorted_objects(this.props.app_state.my_proposals)
        var storefronts = this.get_all_sorted_objects(this.props.app_state.created_stores)
        var subscriptions = this.get_all_sorted_objects(this.props.app_state.created_subscriptions)
        var tokens = this.get_all_sorted_objects(this.props.app_state.created_tokens)
    

        var return_objects = []
        var my_objects = []
        contracts.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            console.log(object['id'])
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'contract'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'contract'})
            }
        });

        channels.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'channel'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'channel'})
            }
        });

        contractors.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'contractor'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'contractor'})
            }
        });

        jobs.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'job'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'job'})
            }
        });


        posts.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'post'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'post'})
            }
        });


        proposals.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'proposal'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'proposal'})
            }
        });

        storefronts.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'storefront'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'storefront'})
            }
        });


        subscriptions.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'subscription'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'subscription'})
            }
        });

        tokens.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'token'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'token'})
            }
        });

        if(return_objects.length == 0 || typed_text == '') return my_objects;
        return return_objects
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


    render_selected_links(){
        var items = [].concat(this.state.added_links).reverse()
        var background_color = this.props.theme['card_background_color']

        if(items.length == 0){
            items = [1, 2, 3]
            return(
                <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                <div style={{height:47, width:97, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img src={Letter} style={{height:20 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_link_item_clicked(item)}>
                            {this.render_detail_item('3', {'title':this.get_title(item), 'details':this.truncate(item['title'], 15), 'size':'s', 'padding':'5px 12px 5px 12px'})}
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


    when_link_item_clicked(item){
        var clone = this.state.added_links.slice()
        var pos = clone.indexOf(item)
        if(pos > -1){
            clone.splice(pos, 1)
        }
        this.setState({added_links: clone})
        // this.props.notify('Link removed from object', 700)
    }


    render_searched_link_results(){
        var middle = this.props.height-400;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.link_search_results)

        if(items.length == 0){
            items = this.search_for_object('')
        }

        items = this.sort_searched_link_results(items)

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
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 0px 2px 0px'}} onClick={()=>this.when_searched_link_tapped(item)}>
                                {this.render_detail_item('3', {'title':''+this.get_title(item), 'details':item['title'], 'size':'s'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    sort_searched_link_results(items){
        var selected_item = this.get_selected_item2(this.state.get_sort_links_tags_object, 'e')
        var results = []
        if(selected_item == 0/* e */){
            return items
        }
        else if(selected_item == 1/* 📑 contract */){
            items.forEach(item => {
                if(item['type'] == 'contract'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 2/* 💼 job */){
            items.forEach(item => {
                if(item['type'] == 'job'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 3/* 👷🏻‍♀️ contractor */){
            items.forEach(item => {
                if(item['type'] == 'contractor'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 4/* 🏪 storefront */){
            items.forEach(item => {
                if(item['type'] == 'storefront'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 5/* 🎫 subscription */){
            items.forEach(item => {
                if(item['type'] == 'subscription'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 6/* 📰 post */){
            items.forEach(item => {
                if(item['type'] == 'post'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 7/* 📡 channel */){
            items.forEach(item => {
                if(item['type'] == 'channel'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 8/* 🪙 token */){
            items.forEach(item => {
                if(item['type'] == 'token'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 9/* 🧎 proposal */){
            items.forEach(item => {
                if(item['type'] == 'proposal'){
                    results.push(item)
                }
            });
        }

        return results;
    }

    get_selected_item2(object, option){
        return object[option][2][0]
    }

    when_searched_link_tapped(item){
        var clone = this.state.added_links.slice()
        var pos = this.position_of(item, clone)

        if(pos > -1){
            this.props.notify(this.props.app_state.loc['143'], 1700)
        }else{
            clone.push(item)
            this.setState({added_links: clone})
            this.props.notify(this.props.app_state.loc['144'], 1400)
        }
    }

    position_of(item, added_links){
        var pos = -1
        added_links.forEach(element => {
            if(element['id'] == item['id'] && element['e5'] == item['e5']){
                pos = added_links.indexOf(element)
            }
        });
        return pos
    }






    






    render_enter_image_part(){
        var size = this.props.size

        return(
            <div style={{'padding': '10px 10px 0px 0px'}}>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'13px','text':this.props.app_state.loc['145']/* 'Black stages gif, grey stages image. Then tap to remove.' */})}
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['146']/* 'Images larger than 500Kb will be ignored.' */})}
                {this.render_create_image_ui_buttons_part()}
                {this.render_image_part()}
                {this.render_detail_item('0')}
                {/* {this.render_all_images_part()} */}
                
            </div>
        )
    }

    /* renders the buttons for pick images, set images and clear images */
    render_create_image_ui_buttons_part(){
      return(
        <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '7px 5px 10px 10px', width: '99%'}}>
            {/* <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                <img src={E5EmptyIcon} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".gif" onChange ={this.when_image_gif_picked.bind(this)} multiple/>
            </div> */}

            <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                <img src={E5EmptyIcon3} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept ="image/*" onChange ={this.when_image_gif_picked.bind(this)} multiple/>
            </div>

            {/* <div style={{'padding': '5px', width:205}} onClick={()=>this.add_images_to_object()}>
                {this.render_detail_item('5', {'text':'Add Images', 'action':'-'})}
            </div> */}

        </div>
      )
    }

    add_images_to_object(){
        var images_to_add = this.state.entered_image_objects
        var id = Math.round(new Date().getTime()/1000);
        if(images_to_add.length == 0){
            this.props.notify('add some images or gifs first!', 800)
        }else{
            var cloned_array = this.state.entered_objects.slice()
            cloned_array.push({'data':{'images':images_to_add}, 'type':'9', 'id':id})
            this.setState({entered_objects: cloned_array, entered_image_objects:[]})
            this.props.notify('images added!', 800)
        }
    }

    /* called when images have been picked from picker */
    when_image_gif_picked = (e) => {
        if(e.target.files && e.target.files[0]){
            for(var i = 0; i < e.target.files.length; i++){ 
                let reader = new FileReader();
                reader.onload = function(ev){
                    const clonedArray = this.state.entered_image_objects == null ? [] : this.state.entered_image_objects.slice();
                    if(ev.total < this.props.app_state.image_size_limit){
                        clonedArray.push(ev.target.result);
                        this.setState({entered_image_objects: clonedArray});
                    }
                }.bind(this);
                var imageFile = e.target.files[i];
                imageCompression(imageFile, { maxSizeMB: 0.35, maxWidthOrHeight: 1920, useWebWorker: true }).then(function (compressedFile) {
                    reader.readAsDataURL(compressedFile);
                })
                .catch(function (error) {
                    console.log(error.message);
                });
            }
            var image = e.target.files.length == 1 ? 'image has' : 'images have';
            // this.props.notify('Your selected '+e.target.files.length+image+' been staged.',500);
        }
    }

    render_all_images_part(){
        var items = this.get_image_objects()

        return(
            <div>
                {items.map((item, index) => (
                    <div onClick={()=>this.remove_image_group(item)}>
                        {this.render_detail_item('9', item['data'])} 
                    </div>
                ))}
            </div>
        )
    }

    get_image_objects(){
        var all_objs = this.state.entered_objects
        var image_objs = []
        for(var i = 0; i < all_objs.length; i++){
            var obj_in_focus = all_objs[i]
            if(obj_in_focus['type'] == '9'){
                image_objs.push(obj_in_focus)
            }
        }
        return image_objs
    }

    remove_image_group(item){
        var cloned_array = this.state.entered_objects.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_objects: cloned_array})
        this.props.notify('items removed!',600)
    }

    render_image_part(){
        var col = Math.round(this.props.app_state.width / 100)
        var rowHeight = 100;

        if(this.state.entered_image_objects.length == 0){
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
            var items = [].concat(this.state.entered_image_objects)
            var background_color = this.props.theme['card_background_color']
            return(
                <div>
                    <ImageList sx={{ width: 'auto', height: 'auto' }} cols={col} rowHeight={rowHeight}>
                        {items.map((item, index) => (
                            <ImageListItem key={item.img}>
                                <div onClick={() => this.when_image_clicked(index)}>
                                    <img src={item} style={{height:100 ,width:100}} />
                                </div> 
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            )
        }
    }

    when_image_clicked(index){
        var cloned_array = this.state.entered_image_objects.slice()
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_image_objects: cloned_array})
    }








    render_enter_item_price_part(){
        var size = this.props.size
        var height = this.props.height-150

        if(size == 's'){
            return(
                <div style={{}}>
                    {this.render_set_token_and_amount_part()}
                    <div style={{height: 20}}/>
                    {this.render_set_prices_list_part()}
                </div>
            )
        }
    }


    render_set_token_and_amount_part(){
        return(
            <div style={{'overflow-x':'hidden'}}>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['502']/* 'Price per unit' */, 'details':this.props.app_state.loc['503']/* 'Specify the price for one unit of your new items variant' */, 'size':'l'})}
                <div style={{height:10}}/>

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['504']/* 'Exchange ID' */} when_text_input_field_changed={this.when_exchange_id_input_field_changed.bind(this)} text={this.state.exchange_id} theme={this.props.theme}/>

                {this.load_token_suggestions('exchange_id')}
 

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['505']/* 'Price' */, 'subtitle':this.format_power_figure(this.state.price_amount), 'barwidth':this.calculate_bar_width(this.state.price_amount), 'number':this.format_account_balance_figure(this.state.price_amount), 'barcolor':'', 'relativepower':this.props.app_state.loc['506']/* 'tokens' */, })}
                </div>

                <NumberPicker font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_price_amount.bind(this)} theme={this.props.theme} power_limit={63}/>

                <div style={{'padding': '5px'}} onClick={() => this.when_add_price_set()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['507']/* 'Add Price' */, 'action':''})}
                </div>
            </div>
        )
    }

    when_exchange_id_input_field_changed(text){
        this.setState({exchange_id: text})
    }

    when_price_amount(amount){
        this.setState({price_amount: amount})
    }

    when_add_price_set(){
        var exchange_id = this.get_token_id_from_symbol(this.state.exchange_id.trim())
        var amount = this.state.price_amount
        if(isNaN(exchange_id) || parseInt(exchange_id) < 0 || exchange_id == '' || !this.does_exchange_exist(exchange_id)){
            this.props.notify(this.props.app_state.loc['508']/* 'please put a valid exchange id' */, 1600)
        }
        else if(amount == 0){
            this.props.notify(this.props.app_state.loc['509']/* 'please put a valid amount' */, 1600)
        }
        else if(this.is_exchange_already_added(exchange_id, this.state.price_data)){
            this.props.notify(this.props.app_state.loc['510']/* 'You cant use the same exchange twice' */, 3600)
        }
        else{
            var price_data_clone = this.state.price_data.slice()
            price_data_clone.push({'id':exchange_id, 'amount':amount})
            this.setState({price_data: price_data_clone, price_amount:0, exchange_id:''});
            this.props.notify(this.props.app_state.loc['511']/* 'added price!' */, 1000)
        }
    }

    is_exchange_already_added(exchange_id, price_data){
        if(this.get_item_in_array(exchange_id, price_data) == null){
            return false
        }
        return true
    }

    get_item_in_array(exchange_id, object_array){
        var object = object_array.find(x => x['id'] === exchange_id);
        return object
    }

    render_set_prices_list_part(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.price_data)

        if(items.length == 0){
            items = [0, 1]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 0px 2px 0px'}} onClick={()=>console.log()}>
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
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>this.when_amount_clicked(item)}>
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.selected_e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                </div>
                            </li>
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





    render_variants_picker_part(){
        var selected_composition = this.get_selected_item(this.state.composition_type, 'e')
        return(
            <div style={{'overflow-x':'hidden'}}>
                <div style={{height:10}}/>
                {this.render_detail_item('4', {'text':this.props.app_state.loc['535c']/* Set the details for a variant of your new storefront item, then tap the black circle to add it. */, 'textsize':'13px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                <div className="row">
                    <div className="col-10" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_variant_tabs()}
                    </div>
                    <div className="col-2" style={{'padding': '5px 0px 0px 5px'}}>
                        <div style={{'padding': '0px'}} onClick={()=>this.when_add_variant_tapped()}>
                            <img src={E5EmptyIcon} style={{height:45, width:'auto'}} />
                        </div> 
                    </div>
                </div>
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['512']/* 'Variant Title' */, 'details':this.props.app_state.loc['513']/* 'Set a basic description of the variant of the item your selling like a color or size option' */, 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['512']/* 'Variant Title' */} when_text_input_field_changed={this.when_variant_description_input_field_changed.bind(this)} text={this.state.variant_description} theme={this.props.theme}/>
                
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['514']/* 'Variant Images' */, 'details':this.props.app_state.loc['515']/* 'You can set some images for your variant' */, 'size':'l'})}
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['146']/* 'Images larger than 500Kb will be ignored.' */})}
                <div style={{height:10}}/>
                {this.render_variant_image_picker_ui()}
                <div style={{height:10}}/>
                {this.render_variant_images()}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['516']/* 'Number of Units in ' */+selected_composition, 'details':this.props.app_state.loc['517']/* 'You can specify the number of units of the variant that are available for sale' */, 'size':'l'})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['518']/* 'Number of ' */+selected_composition, 'subtitle':this.format_power_figure(this.state.available_unit_count), 'barwidth':this.calculate_bar_width(this.state.available_unit_count), 'number':this.format_account_balance_figure(this.state.available_unit_count), 'barcolor':'', 'relativepower':this.props.app_state.loc['391']/* 'units' */, })}
                </div>

                <NumberPicker font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_available_unit_count.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_enter_item_price_part()}

                {this.render_detail_item('0')}
                {this.render_detail_item('0')}

            </div>
        )
    }

    render_variant_image_picker_ui(){
        return(
            <div>
                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '7px 5px 10px 10px', width: '99%'}}>
                    {/* <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img src={E5EmptyIcon} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                        <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".gif" onChange ={this.when_image_variant_gif_picked.bind(this)} multiple/>
                    </div> */}

                    <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img src={E5EmptyIcon3} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                        <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept ="image/*" onChange ={this.when_image_variant_gif_picked.bind(this)} multiple/>
                    </div>
                </div>
                
            </div>
        )
    }

    when_variant_description_input_field_changed(text){
        this.setState({variant_description: text})
    }


    when_image_variant_gif_picked = (e) => {
        if(e.target.files && e.target.files[0]){
            for(var i = 0; i < e.target.files.length; i++){ 
                let reader = new FileReader();
                reader.onload = function(ev){
                    const clonedArray = this.state.variant_images == null ? [] : this.state.variant_images.slice();
                    if(ev.total < this.props.app_state.image_size_limit){
                        clonedArray.push(ev.target.result);
                        this.setState({variant_images: clonedArray});
                    }
                }.bind(this);
                var imageFile = e.target.files[i];
                imageCompression(imageFile, { maxSizeMB: 0.35, maxWidthOrHeight: 1920, useWebWorker: true }).then(function (compressedFile) {
                    reader.readAsDataURL(compressedFile);
                })
                .catch(function (error) {
                    console.log(error.message);
                });
            }
            var image = e.target.files.length == 1 ? 'image has' : 'images have';
            // this.props.notify('Your selected '+e.target.files.length+image+' been staged.',500);
        }
    }


    render_variant_images(){
        var col = Math.round(this.props.app_state.width / 100)
        var rowHeight = 100;

        if(this.state.variant_images.length == 0){
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
            var items = [].concat(this.state.variant_images)
            var background_color = this.props.theme['card_background_color']
            return(
                <div>
                    <ImageList sx={{ width: 'auto', height: 'auto' }} cols={col} rowHeight={rowHeight}>
                        {items.map((item, index) => (
                            <ImageListItem key={item.img}>
                                <div onClick={() => this.when_variant_image_clicked(index)}>
                                    <img src={item} style={{height:100 ,width:100}} />
                                </div> 
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            )
        }
    }


    when_variant_image_clicked(index){
        var cloned_array = this.state.variant_images.slice()
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({variant_images: cloned_array})
    }


    when_add_variant_tapped(){
        var images_to_add = this.state.variant_images
        var id = Math.round(new Date().getTime()/1000);
        
        var image_data = {'data':{'images':images_to_add}, 'type':'9', 'id':id}
        var variant_description = this.state.variant_description.trim()
        var price_data = this.state.price_data
        var available_unit_count = this.state.available_unit_count

        if(variant_description == ''){
            this.props.notify(this.props.app_state.loc['521']/* 'that variant description isnt valid' */, 800)
        }
        else if(price_data.length == 0){
            this.props.notify(this.props.app_state.loc['522']/* 'set a price for your variant first' */, 900)
        }
        else if(available_unit_count == 0){
            this.props.notify(this.props.app_state.loc['523']/* 'You need to specify how many units are available first' */, 900)
        }else{
            var variant = {'variant_id':makeid(8),'image_data':image_data, 'variant_description':variant_description, 'price_data':price_data, 'available_unit_count':available_unit_count}

            var clone = this.state.variants.slice()
            if(this.state.edit_variant_item_pos != -1){
                clone[this.state.edit_variant_item_pos] = variant
            }else{
                clone.push(variant)
            }
            this.setState({variants:clone, variant_images:[], variant_description:'', price_data:[], available_unit_count:0, edit_variant_item_pos: -1})
            this.props.notify(this.props.app_state.loc['524']/* 'added the variant to the item' */, 600)
        }
    }


    render_variants(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = this.state.variants

        if(items.length == 0){
            items = [0]
            return(
                <div style={{}}>
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
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 0px 5px','border-radius': '13px' }} onClick={()=> this.remove_variant(item)}>
                                    {this.render_detail_item('4', {'text':item['variant_description'], 'textsize':'13px', 'font':this.props.app_state.font})}
                                    <div style={{height:3}}/>
                                    <div style={{padding:'0px 0px 0px 10px'}}>
                                        {this.render_detail_item('9', item['image_data']['data'])}
                                    </div>
                                    <div style={{height:5}}/>
                                    {this.render_detail_item('3', {'title':this.format_account_balance_figure(item['available_unit_count']), 'details':this.props.app_state.loc['525']/* 'Number of Units' */, 'size':'l'})}
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
                        {this.render_detail_item('2', { 'style':'s', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.selected_e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                    </li>
                ))}
            </div>
        )
    }


    remove_variant(item){
        var cloned_array = this.state.variants.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({variants: cloned_array})
        this.props.notify(this.props.app_state.loc['526']/* 'variant removed!' */,600)
    }





    render_variant_tabs(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.variants)

        if(items.length == 0){
            items = [1, 2, 3]
            return(
                <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                <div style={{height:47, width:97, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img src={Letter} style={{height:20 ,width:'auto'}} />
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
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_tab_clicked(item, index)}>
                            {this.render_tab_item(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }


    render_tab_item(item, index){
        if(this.is_tab_active(index)){
            return(
                <div>
                    {this.render_detail_item('3', {'title':item['variant_id'], 'details':'', 'size':'s', 'padding':'5px 12px 5px 12px'})}
                    <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '0px 5px 3px 5px'}}/>
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':item['variant_id'], 'details':this.truncate(item['variant_description'], 15), 'size':'s', 'padding':'5px 12px 5px 12px'})}
                </div>
            )
        }
    }


    is_tab_active(index){
        return this.state.edit_variant_item_pos == index
    }

    when_tab_clicked(item, index){
        let me = this;
        if(Date.now() - this.last_all_click_time < 200){
            //double tap
            me.remove_tab_item(index)
            clearTimeout(this.all_timeout);
        }else{
            this.all_timeout = setTimeout(function() {
                clearTimeout(this.all_timeout);
                // single tap
                me.focus_tab(index)
            }, 200);
        }
        this.last_all_click_time = Date.now();
    }

    remove_tab_item(index){
        var cloned_array = this.state.variants.slice()
        // const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only

            var prev_index = index -1;
            if(this.is_tab_active(index) && prev_index > -1){
                this.focus_tab(prev_index)
            }
            this.setState({variants: cloned_array})
        }
    }

    focus_tab(item_pos){
        if(this.is_tab_active(item_pos)){
            this.setState({edit_variant_item_pos: -1, variant_images:[], variant_description:'', price_data:[], available_unit_count:0})
        }else{
            this.props.notify(this.props.app_state.loc['535d']/* 'Editing that variant' */, 2000)
            this.set_focused_variant_data(item_pos)
        }
        
    }

    set_focused_variant_data(item_pos){
        var variant = this.state.variants[item_pos]
        this.setState({variant_images: variant['image_data']['data']['images'], variant_description: variant['variant_description'], price_data: variant['price_data'], available_unit_count: variant['available_unit_count'], edit_variant_item_pos: item_pos});
    }









    load_token_suggestions(target_type){
        var items = [].concat(this.get_suggested_tokens())
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
            {'id':'3', 'label':{'title':'END', 'details':this.props.app_state.loc['527']/* 'Account 3' */, 'size':'s'}},
            {'id':'5', 'label':{'title':'SPEND', 'details':this.props.app_state.loc['528']/* 'Account 5' */, 'size':'s'}},
        ];
        var exchanges_from_sync = this.props.app_state.created_tokens[this.props.app_state.selected_e5]
        var sorted_token_exchange_data = []
        // var myid = this.props.app_state.user_account_id
        for (let i = 0; i < exchanges_from_sync.length; i++) {
            var exchange_e5 = exchanges_from_sync[i]['e5']
            var myid = this.props.app_state.user_account_id[exchange_e5]
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
        if(target_type=='exchange_id'){
            this.setState({exchange_id: item['id']})
        }
        else if(target_type == 'shipping_exchange_id'){
            this.setState({shipping_exchange_id: item['id']})
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














    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} add_indexing_tag_for_new_job={this.add_indexing_tag_for_new_job.bind(this)} delete_entered_tag={this.delete_entered_tag_word.bind(this)} when_add_text_button_tapped={this.when_add_text_button_tapped.bind(this)} width={this.props.app_state.width} show_images={this.show_images.bind(this)}/>
            </div>
        )

    }

    show_images(){

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



    finish_creating_object(){
        var index_tags = this.state.entered_indexing_tags
        var title = this.state.entered_title_text.trim()
        var variants = this.state.variants
        var target_receiver = this.state.target_receiver.trim()
        var fulfilment_location = this.state.fulfilment_location.trim()

        var selected_item = this.get_selected_item(this.state.purchase_option_tags_object, this.state.purchase_option_tags_object['i'].active)

        if(index_tags.length == 0){
            this.props.notify(this.props.app_state.loc['529']/* 'add some tags first!' */, 2700)
        }
        else if(title == ''){
            this.props.notify(this.props.app_state.loc['530']/* 'add a title for your Item' */, 2700)
        }
        else if(title.length > this.props.app_state.title_size){
            this.props.notify(this.props.app_state.loc['531']/* 'that title is too long' */, 2700)
        }
        else if(variants.length == 0){
            this.props.notify(this.props.app_state.loc['532']/* 'you should set some variants for your item' */, 3700)
        }
        else if(isNaN(target_receiver) || parseInt(target_receiver) < 1000 || target_receiver==''){
            this.props.notify(this.props.app_state.loc['533']/* 'set a valid receiver target' */, 3700)
        }
        else if(fulfilment_location==''){
            this.props.notify(this.props.app_state.loc['534']/* 'set a valid fulfilment location for your storefront items' */, 4900)
        }
        else if(selected_item == this.props.app_state.loc['89']/* 'enabled' */ && this.state.fulfilment_accounts.length == 0){
            this.props.notify(this.props.app_state.loc['535']/* 'you should set some fulfilment accounts for your item' */, 4700)
        }
        else{
            
            var data = this.state;
            this.add_fulfilment_location_to_local_storage()
            this.props.when_add_edit_object_to_stack(data)

            // this.setState({
            //     id: makeid(8), type:'storefront-item',
            //     get_new_job_page_tags_object: this.get_new_job_page_tags_object(),
            //     get_new_job_text_tags_object: this.get_new_job_text_tags_object(),
            //     entered_tag_text: '', entered_title_text:'', entered_text:'', fulfilment_location:'',
            //     entered_indexing_tags:[], entered_text_objects:[], entered_image_objects:[],
            //     entered_objects:[], exchange_id:'', price_amount:0, price_data:[],
            //     purchase_option_tags_object:this.get_purchase_option_tags_object(), available_unit_count:0, composition_type:this.get_composition_tags_object(), composition:'', variants:[], variant_images:[], variant_description:'', fulfilment_accounts:[], fulfilment_account:''
            // })
            this.props.notify(this.props.app_state.loc['18']/* 'Transaction added to Stack' */, 600)

        }
    }

    add_fulfilment_location_to_local_storage(){
        var fulfilment_locations = localStorage.getItem("fulfilment");
        if(fulfilment_locations != null && fulfilment_locations != ""){
            fulfilment_locations = JSON.parse(fulfilment_locations)
        }else{
            fulfilment_locations = {'data':[]}
        }
        var set_fulfilment_location = this.state.fulfilment_location
        var obj = {'text':set_fulfilment_location, 'time':((new Date()).getTime()/1000)}

        if(!this.fulfilment_location_includes(fulfilment_locations['data'], obj)){
            fulfilment_locations['data'].push(obj)
        }

        localStorage.setItem("fulfilment", JSON.stringify(fulfilment_locations));
    }

    remove_fulfilment_location_from_local_storage(pos){
        var fulfilment_locations = localStorage.getItem("fulfilment");
        if(fulfilment_locations != null && fulfilment_locations != ""){
            fulfilment_locations = JSON.parse(fulfilment_locations)
        }else{
            fulfilment_locations = {'data':[]}
        }
        fulfilment_locations['data'].splice(pos, 1);

        localStorage.setItem("fulfilment", JSON.stringify(fulfilment_locations));
    }


    set_fileds_for_edit_action(obj){
        this.setState(obj)
    }


}




export default NewStorefrontItemPage;