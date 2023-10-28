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
        id: makeid(8), type:'storefront-item', e5:this.props.app_state.selected_e5,
        get_new_job_page_tags_object: this.get_new_job_page_tags_object(),
        // get_new_job_text_tags_object: this.get_new_job_text_tags_object(),
        entered_tag_text: '', entered_title_text:'', entered_text:'', fulfilment_location:'',
        entered_indexing_tags:[], entered_text_objects:[], entered_image_objects:[],
        entered_objects:[], exchange_id:'', price_amount:0, price_data:[],
        purchase_option_tags_object:this.get_purchase_option_tags_object(), available_unit_count:0, composition_type:this.get_composition_tags_object(), composition:'', variants:[], variant_images:[], variant_description:'', target_receiver:'', shipping_price_amount:0, shipping_exchange_id: '', shipping_price_data:[], visibility_tags_object: this.get_visibility_tags_object(), fulfilment_accounts:[], fulfilment_account:'', e5: this.props.app_state.selected_e5, chatroom_enabled_tags_object:this.get_chatroom_enabled_tags_object()
    };

    get_new_job_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e', 'configuration','e.text', 'images', 'variants'], [0]
            ],
            'text':[
                ['or','',0], ['text','e.font', 'e.size'], [0]
            ],
            'font':[
                ['xor','e',1], ['font','Sans-serif','Courier New','Times New Roman','Papyrus'], [1],[1]
            ],
            'size':[
                ['xor','e',1], ['size','15px','11px','25px','40px'], [1],[1]
            ],
        };
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
                ['xor','e',1], ['font','Sans-serif','Courier New','Times New Roman','Papyrus'], [1],[1]
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
                ['xor','',0], ['e','enabled', 'disabled'], [1]
            ],
        };
    }


    get_visibility_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','invisible', 'masked', 'unmasked'], [1]
            ],
        };
    }


    get_chatroom_enabled_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', 'enabled', 'disabled'], [1]
            ],
        };
    }


    get_composition_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', 'items','grams','kilos','ounces','pounds', 'centimeters','meters','inches','feet', 'mililiters','liters','gallons'], [1]
            ]
        };
    }


    




    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>

                <div className="row">
                    <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                        <Tags page_tags_object={this.state.get_new_job_page_tags_object} tag_size={'l'} when_tags_updated={this.when_new_job_page_tags_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'padding': '5px'}} onClick={()=>this.finish_creating_object()}>
                            {this.render_detail_item('5', {'text':'Finish', 'action':'finish_creating_object'})}
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
        if(selected_item == 'configuration'){
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
        else if(selected_item == 'images'){
            return(
                <div>
                    {this.render_enter_image_part()}
                </div>
            ) 
        }
        else if(selected_item == 'variants'){
            return(
                <div>
                    {this.render_variants_picker_part()}
                </div>
            )
        }
    }

    is_text_selected_item(selected_item){
        var obj = ['text','font','size','Sans-serif','Courier New','Times New Roman','Papyrus', '15px','11px','25px','40px']
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
                {this.render_detail_item('3', {'title':'Unit Denomination', 'details':'Specify the denomination of the item from the tag picker below', 'size':'l'})}
                <div style={{height:10}}/>

                <Tags page_tags_object={this.state.composition_type} tag_size={'l'} when_tags_updated={this.when_composition_type_updated.bind(this)} theme={this.props.theme}/>

                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'13px','text':'Set denomination: '+selected_composition})}

                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':'Target Recipient', 'details':'Set the account thats set to receive the purchase payments for your new item', 'size':'l'})}
                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Enter Account ID'} when_text_input_field_changed={this.when_target_receiver_input_field_changed.bind(this)} text={this.state.target_receiver} theme={this.props.theme}/>
                <div style={{height:10}}/>



                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':'Fulfilment Location', 'details':'Set location of the pick up station for your item when its ordered using a bag and contractors', 'size':'l'})}
                <div style={{height:10}}/>
                <TextInput height={70} placeholder={'Location Details...'} when_text_input_field_changed={this.when_fulfilment_location_input_field_changed.bind(this)} text={this.state.fulfilment_location} theme={this.props.theme}/>
                <div style={{height:10}}/>


                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':'Direct Purchase Option', 'details':'If set to enabled, youll handle the shipping for the item when purchased directly by your clients', 'size':'l'})}
                <div style={{height:10}}/>
                <Tags page_tags_object={this.state.purchase_option_tags_object} tag_size={'l'} when_tags_updated={this.when_purchase_option_tags_object_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>


                
                {/* {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':'Sales Visibility', 'details':'If set to masked, all your direct purchase sales will be invisible to outsiders', 'size':'l'})}
                <div style={{height:10}}/>
                <Tags page_tags_object={this.state.visibility_tags_object} tag_size={'l'} when_tags_updated={this.when_visibility_tags_object_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/> */}


                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':'Product Chatroom', 'details':'If set to disabled, senders cannot send messsages to the new storefront items product chatroom in the activity section', 'size':'l'})}
                <div style={{height:10}}/>
                <Tags page_tags_object={this.state.chatroom_enabled_tags_object} tag_size={'l'} when_tags_updated={this.when_chatroom_enabled_tags_object_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>





                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':'Fulfilment Accounts', 'details':'Set the accounts involved with shipping and fulfilling direct purchase orders from clients', 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Account ID'} when_text_input_field_changed={this.when_fulfilment_account_input_field_changed.bind(this)} text={this.state.fulfilment_account} theme={this.props.theme}/>

                <div style={{height:10}}/>
                <div style={{'padding': '5px'}} onClick={() => this.when_add_shipping_account_set()}>
                    {this.render_detail_item('5', {'text':'Add Account', 'action':''})}
                </div>
                <div style={{height:10}}/>
                {this.render_fulfilment_accounts()}




            
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':'Direct Purchase Shipping Fee', 'details':'The shipping fee you charge for shipping your item when directly purchased by your clients', 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Exchange ID'} when_text_input_field_changed={this.when_shipping_exchange_id_input_field_changed.bind(this)} text={this.state.shipping_exchange_id} theme={this.props.theme}/>
                {this.load_token_suggestions('shipping_exchange_id')}

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Price', 'subtitle':this.format_power_figure(this.state.shipping_price_amount), 'barwidth':this.calculate_bar_width(this.state.shipping_price_amount), 'number':this.format_account_balance_figure(this.state.shipping_price_amount), 'barcolor':'', 'relativepower':'tokens', })}
                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_shipping_price_amount.bind(this)} theme={this.props.theme} power_limit={63}/>

                <div style={{'padding': '5px'}} onClick={() => this.when_add_shipping_price_set()}>
                    {this.render_detail_item('5', {'text':'Add Price', 'action':''})}
                </div>
                {this.render_shipping_set_prices_list_part()}
            </div>
        )
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


    when_add_shipping_price_set(){
        var exchange_id = this.state.shipping_exchange_id.trim()
        var amount = this.state.shipping_price_amount
        if(isNaN(exchange_id) || parseInt(exchange_id) < 0 || exchange_id == ''){
            this.props.notify('please put a valid exchange id', 600)
        }
        else if(amount == 0){
            this.props.notify('please put a valid amount', 600)
        }
        else{
            var price_data_clone = this.state.shipping_price_data.slice()
            price_data_clone.push({'id':exchange_id, 'amount':amount})
            this.setState({shipping_price_data: price_data_clone, shipping_price_amount:0, shipping_exchange_id:''});
            this.props.notify('added shipping price!', 400)
        }
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
                <div style={{overflow: 'auto', maxHeight: middle}}>
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
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>this.when_shipping_amount_clicked(item)}>
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':'Exchange ID: '+item['id'], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
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
        var account = this.state.fulfilment_account
        if(isNaN(account) || account == '' || parseInt(account) < 1000){
            this.props.notify('please put a valid account id', 600)
        }else{
            var clone = this.state.fulfilment_accounts.slice()
            clone.push(account)
            this.setState({fulfilment_accounts: clone, fulfilment_account:''})
            this.props.notify('added account', 400)
        }
    }


    render_fulfilment_accounts(){
        var items = [].concat(this.state.fulfilment_accounts)
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 7px 0px', width: '97%', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 5px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_price_suggestion_clicked(item)}>
                            {this.render_detail_item('3', {'title':item, 'details':'Account', 'size':'s'})}
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
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':'Set a title for your new Storefront Item'})}
                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Enter Title...'} when_text_input_field_changed={this.when_title_text_input_field_changed.bind(this)} text={this.state.entered_title_text} theme={this.props.theme}/>

                <div style={{height: 10}}/>
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':this.state.entered_title_text})}
                {this.render_detail_item('10',{'font':'Sans-serif', 'textsize':'10px','text':'remaining character count: '+(this.props.app_state.title_size - this.state.entered_title_text.length)})}

                {this.render_detail_item('0')}
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':'Set tags for indexing your new Storefront Item'})}
                <div style={{height:10}}/>

                <div className="row">
                    <div className="col-9" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput height={30} placeholder={'Enter Tag...'} when_text_input_field_changed={this.when_index_text_input_field_changed.bind(this)} text={this.state.entered_tag_text} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 5px 0px 0px'}}>
                        {this.render_detail_item('5', {'text':'Add', 'action':'add_indexing_tag'})}
                    </div>
                </div>
                {this.render_detail_item('10',{'font':'Sans-serif', 'textsize':'10px','text':'remaining character count: '+(this.props.app_state.tag_size - this.state.entered_tag_text.length)})}
                
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
        var typed_word = this.state.entered_tag_text.trim();

        if(typed_word == ''){
            this.props.notify('type something!', 400)
        }
        else if(this.hasWhiteSpace(typed_word)){
            this.props.notify('enter one word!', 400)
        }
        else if(typed_word.length > this.props.app_state.tag_size){
            this.props.notify('That tag is too long', 400)
        }
        else if(typed_word.length < 3){
            this.props.notify('That tag is too short', 400)
        }
        else if(this.state.entered_indexing_tags.includes(typed_word)){
            this.props.notify('you cant enter the same word twice', 400)
        }
        else{
            var cloned_seed_array = this.state.entered_indexing_tags.slice()
            cloned_seed_array.push(typed_word)
            this.setState({entered_indexing_tags: cloned_seed_array, entered_tag_text:''})
            this.props.notify('tag added!', 200)
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
        this.props.notify('tag removed', 200)
    }

   



    
    render_new_job_object(){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var items = [].concat(this.state.entered_objects);
        return ( 
            <div onClick={() => console.log()} style={{height:'auto', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color, 'margin':'0px 10px 10px 10px'}}>
                <div style={{'padding': '5px 0px 5px 0px'}}>
                    {this.render_detail_item('1',{'active_tags':this.state.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':'delete_entered_tag_word'})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':this.state.entered_title_text})}
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
                    {this.render_detail_item('0')}
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
        return(
            <div style={{'margin':'10px 0px 0px 10px'}}>
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':'Enter your preferred text then tap add to add it'})}
                {this.render_detail_item('0')}
                {this.render_detail_item('4',this.get_edited_text_object())}
                <div style={{height:10}}/>
                {/* <Tags page_tags_object={this.state.get_new_job_text_tags_object} tag_size={'l'} when_tags_updated={this.when_new_job_font_style_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/> */}

                <TextInput height={60} placeholder={'Type Something...'} when_text_input_field_changed={this.when_entered_text_input_field_changed.bind(this)} text={this.state.entered_text} theme={this.props.theme}/>
                <div style={{height:10}}/>
                {this.render_detail_item('5', {'text':'Add Text', 'action':'when_add_text_button_tapped'})}
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
            this.props.notify('type something!', 400)
        }else{
            var entered_text = this.get_edited_text_object()
            var cloned_entered_text_array = this.state.entered_text_objects.slice()
            cloned_entered_text_array.push(entered_text);
            this.setState({entered_text_objects: cloned_entered_text_array, entered_text:''})

            var cloned_array = this.state.entered_objects.slice()
            cloned_array.push({'data':entered_text, 'type':'4' })
            this.setState({entered_objects: cloned_array})
        }
    }

    render_entered_texts(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.entered_text_objects)
        return ( 
            <div style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.reverse().map((item, index) => (
                        <li style={{'padding': '5px'}} onClick={()=>this.when_text_clicked(item)}>
                            {this.render_detail_item('4',item)}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    when_text_clicked(item){
        var cloned_array = this.state.entered_text_objects.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_text_objects: cloned_array})

        var entered_objects_pos = -1;
        for(var i=0; i<this.state.entered_objects.length; i++){
            if(this.state.entered_objects[i]['data'] == item){
                entered_objects_pos = i;
            }
        }

        var cloned_array = this.state.entered_objects.slice()
        if (entered_objects_pos > -1) { // only splice array when item is found
            cloned_array.splice(entered_objects_pos, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_objects: cloned_array})

        this.props.notify('item removed!', 600)
    }






    render_enter_image_part(){
        var size = this.props.size

        return(
            <div style={{'padding': '10px 10px 0px 0px'}}>
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'13px','text':'Black stages gif, grey stages image. Then tap to remove one and click add images to add them to the object.'})}
                {this.render_detail_item('10',{'font':'Sans-serif', 'textsize':'10px','text':'Images larger than 500Kb will be ignored.'})}
                {this.render_create_image_ui_buttons_part()}
                {this.render_image_part()}
                {this.render_detail_item('0')}
                {this.render_all_images_part()}
                
            </div>
        )
    }

    /* renders the buttons for pick images, set images and clear images */
    render_create_image_ui_buttons_part(){
      return(
        <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '7px 5px 10px 10px', width: '99%'}}>
            <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                <img src={E5EmptyIcon} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".gif" onChange ={this.when_image_gif_picked.bind(this)} multiple/>
            </div>

            <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                <img src={E5EmptyIcon3} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept ="image/*" onChange ={this.when_image_gif_picked.bind(this)} multiple/>
            </div>

            <div style={{'padding': '5px', width:205}} onClick={()=>this.add_images_to_object()}>
                {this.render_detail_item('5', {'text':'Add Images', 'action':'-'})}
            </div>

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
                reader.readAsDataURL(e.target.files[i]);
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
            <div>
                {this.render_detail_item('3', {'title':'Price per unit', 'details':'Specify the price for one unit of your new items variant', 'size':'l'})}
                <div style={{height:10}}/>

                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Exchange ID'} when_text_input_field_changed={this.when_exchange_id_input_field_changed.bind(this)} text={this.state.exchange_id} theme={this.props.theme}/>

                {this.load_token_suggestions('exchange_id')}
 

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Price', 'subtitle':this.format_power_figure(this.state.price_amount), 'barwidth':this.calculate_bar_width(this.state.price_amount), 'number':this.format_account_balance_figure(this.state.price_amount), 'barcolor':'', 'relativepower':'tokens', })}
                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_price_amount.bind(this)} theme={this.props.theme} power_limit={63}/>

                <div style={{'padding': '5px'}} onClick={() => this.when_add_price_set()}>
                    {this.render_detail_item('5', {'text':'Add Price', 'action':''})}
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
        var exchange_id = this.state.exchange_id.trim()
        var amount = this.state.price_amount
        if(isNaN(exchange_id) || parseInt(exchange_id) < 0 || exchange_id == ''){
            this.props.notify('please put a valid exchange id', 600)
        }
        else if(amount == 0){
            this.props.notify('please put a valid amount', 600)
        }
        else{
            var price_data_clone = this.state.price_data.slice()
            price_data_clone.push({'id':exchange_id, 'amount':amount})
            this.setState({price_data: price_data_clone, price_amount:0, exchange_id:''});
            this.props.notify('added price!', 400)
        }
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
                <div style={{overflow: 'auto', maxHeight: middle}}>
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
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>this.when_amount_clicked(item)}>
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':'Exchange ID: '+item['id'], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
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
            <div>
                {this.render_detail_item('3', {'title':'Variant Title', 'details':'Set a basic description of the variant of the item your selling like a color or size option', 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Variant Title'} when_text_input_field_changed={this.when_variant_description_input_field_changed.bind(this)} text={this.state.variant_description} theme={this.props.theme}/>
                
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':'Variant Images', 'details':'You can set some images for your variant(for visual context)', 'size':'l'})}
                {this.render_detail_item('10',{'font':'Sans-serif', 'textsize':'10px','text':'Images larger than 500Kb will be ignored.'})}
                <div style={{height:10}}/>
                {this.render_variant_image_picker_ui()}
                <div style={{height:10}}/>
                {this.render_variant_images()}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':'Number of Units in '+selected_composition, 'details':'You can specify the number of units of the variant that are available for sale', 'size':'l'})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Number of '+selected_composition, 'subtitle':this.format_power_figure(this.state.available_unit_count), 'barwidth':this.calculate_bar_width(this.state.available_unit_count), 'number':this.format_account_balance_figure(this.state.available_unit_count), 'barcolor':'', 'relativepower':'units', })}
                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_available_unit_count.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}
                {this.render_enter_item_price_part()}

                {this.render_detail_item('0')}

                <div style={{'padding': '5px'}} onClick={() => this.when_add_variant_tapped()}>
                    {this.render_detail_item('5', {'text':'Add Variant', 'action':''})}
                </div>


                {this.render_variants()}

            </div>
        )
    }

    render_variant_image_picker_ui(){
        return(
            <div>
                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '7px 5px 10px 10px', width: '99%'}}>
                    <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img src={E5EmptyIcon} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                        <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".gif" onChange ={this.when_image_variant_gif_picked.bind(this)} multiple/>
                    </div>

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
                reader.readAsDataURL(e.target.files[i]);
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
            this.props.notify('that variant description isnt valid', 800)
        }
        else if(price_data.length == 0){
            this.props.notify('set a price for your variant first', 900)
        }
        else if(available_unit_count == 0){
            this.props.notify('You need to specify how many units are available first', 900)
        }else{
            var variant = {'variant_id':makeid(8),'image_data':image_data, 'variant_description':variant_description, 'price_data':price_data, 'available_unit_count':available_unit_count}

            var clone = this.state.variants.slice()
            clone.push(variant)
            this.setState({variants:clone, variant_images:[], variant_description:'', price_data:[], available_unit_count:0})
            this.props.notify('added the variant to the item', 600)
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
                <div style={{overflow: 'auto', maxHeight: middle}}>
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
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 0px 5px','border-radius': '13px' }} onClick={()=> this.remove_variant(item)}>
                                    {this.render_detail_item('4', {'text':item['variant_description'], 'textsize':'13px', 'font':'Sans-serif'})}
                                    <div style={{height:3}}/>
                                    <div style={{padding:'0px 0px 0px 10px'}}>
                                        {this.render_detail_item('9', item['image_data']['data'])}
                                    </div>
                                    <div style={{height:5}}/>
                                    {this.render_detail_item('3', {'title':this.format_account_balance_figure(item['available_unit_count']), 'details':'Number of Units', 'size':'l'})}
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
                        {this.render_detail_item('2', { 'style':'s', 'title':'Exchange ID: '+item['id'], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
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
        this.props.notify('variant removed!',600)
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
            {'id':'3', 'label':{'title':'END', 'details':'Account 3', 'size':'s'}},
            {'id':'5', 'label':{'title':'SPEND', 'details':'Account 5', 'size':'s'}},
        ];
        var exchanges_from_sync = this.props.app_state.created_tokens[this.state.e5]
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
                <ViewGroups item_id={item_id} object_data={object_data} theme={this.props.theme} add_indexing_tag_for_new_job={this.add_indexing_tag_for_new_job.bind(this)} delete_entered_tag={this.delete_entered_tag_word.bind(this)} when_add_text_button_tapped={this.when_add_text_button_tapped.bind(this)} width={this.props.app_state.width} show_images={this.show_images.bind(this)}/>
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

    calculate_bar_width(amount){
        var figure = ''
        if(amount == null){
            amount = 0
        }
        if(amount < bigInt('1e9')){
            figure = Math.round((amount.toString().length * 100) / bigInt('1e9').toString().length)
        }
        else if(amount < bigInt('1e18')){
            figure = Math.round((amount.toString().length * 100) / bigInt('1e18').toString().length)
        }
        else if(amount < bigInt('1e36')){
            figure = Math.round((amount.toString().length * 100) / bigInt('1e36').toString().length)
        }
        else{
            figure = Math.round((amount.toString().length * 100) / bigInt('1e72').toString().length)
        }

        return figure+'%'
    }

    format_power_figure(amount){
        var power = 'e72'
        if(amount < bigInt('1e9')){
            power = 'e9'
        }
        else if(amount < bigInt('1e18')){
            power = 'e18'
        }
        else if(amount < bigInt('1e36')){
            power = 'e36'
        }
        else{
            power = 'e72'
        }
        return power
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
            return num+ ' sec'
        }
        else if(diff < 60*60){//less than 1 hour
            var num = Math.floor(diff/(60));
            var s = num > 1 ? 's': '';
            return num + ' min' 
        }
        else if(diff < 60*60*24){//less than 24 hours
            var num = Math.floor(diff/(60*60));
            var s = num > 1 ? 's': '';
            return num + ' hr' + s;
        }
        else if(diff < 60*60*24*7){//less than 7 days
            var num = Math.floor(diff/(60*60*24));
            var s = num > 1 ? 's': '';
            return num + ' dy' + s;
        }
        else if(diff < 60*60*24*7*53){//less than 1 year
            var num = Math.floor(diff/(60*60*24*7));
            var s = num > 1 ? 's': '';
            return num + ' wk' + s;
        }
        else {//more than a year
            var num = Math.floor(diff/(60*60*24*7*53));
            var s = num > 1 ? 's': '';
            return num + ' yr' + s;
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

        if(index_tags.length == 0){
            this.props.notify('add some tags first!', 700)
        }
        else if(title == ''){
            this.props.notify('add a title for your Item', 700)
        }
        else if(title.length > this.props.app_state.title_size){
            this.props.notify('that title is too long', 700)
        }
        else if(variants.length == 0){
            this.props.notify('you should set some variants for your item', 700)
        }
        else if(isNaN(target_receiver) || parseInt(target_receiver) < 0 || target_receiver==''){
            this.props.notify('set a valid receiver target', 700)
        }
        else if(fulfilment_location==''){
            this.props.notify('set a valid fulfilment location for your storefront items', 900)
        }
        else if(this.state.fulfilment_accounts.length == 0){
            this.props.notify('you should set some fulfilment accounts for your item', 700)
        }
        else{
            
            var data = this.state;
            this.props.when_add_new_object_to_stack(data)

            this.setState({
                id: makeid(8), type:'storefront-item',
                get_new_job_page_tags_object: this.get_new_job_page_tags_object(),
                get_new_job_text_tags_object: this.get_new_job_text_tags_object(),
                entered_tag_text: '', entered_title_text:'', entered_text:'', fulfilment_location:'',
                entered_indexing_tags:[], entered_text_objects:[], entered_image_objects:[],
                entered_objects:[], exchange_id:'', price_amount:0, price_data:[],
                purchase_option_tags_object:this.get_purchase_option_tags_object(), available_unit_count:0, composition_type:this.get_composition_tags_object(), composition:'', variants:[], variant_images:[], variant_description:'', fulfilment_accounts:[], fulfilment_account:''
            })
            this.props.notify('Transaction added to Stack', 600)

        }
    }


    set_fileds_for_edit_action(obj){
        this.setState(obj)
    }


}




export default NewStorefrontItemPage;