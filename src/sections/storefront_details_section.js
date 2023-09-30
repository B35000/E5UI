import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import Letter from './../assets/letter.png'; 
import TextInput from './../components/text_input';
import E5EmptyIcon from './../assets/e5empty_icon.png';
import E5EmptyIcon3 from './../assets/e5empty_icon3.png';

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

function start_and_end(str) {
  if (str.length > 35) {
    return str.substr(0, 20) + '...' + str.substr(str.length-10, str.length);
  }
  return str;
}

class StorefrontDetailsSection extends Component {
    
    state = {
        selected: 0, navigate_view_storefront_list_detail_tags_object: this.get_navigate_storefront_list_detail_tags_object_tags(), entered_text:'', focused_message:{'tree':{}}
    };

    get_navigate_storefront_list_detail_tags_object_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e','metadata','activity', 'e.direct-purchases'],[1]
          ],
          'direct-purchases':[
              ['xor','e',1], ['direct-purchases','all','unfulfilled','fulfilled'], [1],[1]
          ],
        }
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
                        <Tags page_tags_object={this.state.navigate_view_storefront_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_storefront_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
    }

     render_empty_detail_object(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        return(
            <div style={{height:he, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center','margin':'0px 0px 20px 0px'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={Letter} style={{height:70 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                    
                </div>
        );
    }

    when_navigate_view_storefront_list_detail_tags_object_updated(tag_obj){
        this.setState({navigate_view_storefront_list_detail_tags_object: tag_obj})
    }

    render_storefront_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_storefront_list_detail_tags_object, this.state.navigate_view_storefront_list_detail_tags_object['i'].active)

        if(selected_item == 'metadata'){
            return(
                <div>
                    {this.render_storefront_main_details_section()}
                </div>
            )
        }else if(selected_item == 'activity'){
            return(
                <div>
                    {this.render_storefront_message_activity()}
                </div>
            ) 
        }
        else if(selected_item == 'all' || selected_item == 'unfulfilled' || selected_item == 'fulfilled'){
            return(
                <div>
                    {this.render_direct_purchases()}
                </div>
            )
        }
    }

    render_storefront_main_details_section(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-70
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        var object = this.get_storefront_items()[this.props.selected_storefront_item];
        var item = this.get_storefront_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects
        var composition_type = object['ipfs'].composition_type == null ? 'items' : this.get_selected_item(object['ipfs'].composition_type, 'e')
        var variants = object['ipfs'].variants == null ? [] : object['ipfs'].variants
        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 20px 10px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':''+object['event'].returnValues.p5, 'details':'Author Seller', 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':composition_type, 'details':'Set Denomination', 'size':'l'})}
                    <div style={{height: 10}}/>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    {this.render_detail_item('0')}
                    {this.render_item_data(items)} 

                    {this.render_detail_item('3', {'title':variants.length+' variants', 'details':'To choose from.', 'size':'l'})}                   

                    {this.render_add_to_bag_button()}
                    {this.render_direct_purchase_button()}

                    {this.render_edit_object_button()}
                    
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_add_to_bag_button(){
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'details':'Add the item to your shopping bag', 'title':'Add to Bag'})}
                <div style={{height:10}}/>
                <div onClick={()=> this.open_add_to_bag()}>
                    {this.render_detail_item('5', {'text':'Add to Bag', 'action':''},)}
                </div>
            </div>
        )
    }

    render_direct_purchase_button(){
        var object = this.get_storefront_items()[this.props.selected_storefront_item];
        var direct_purchase_option = object['ipfs'].purchase_option_tags_object == null ? 'disabled' : this.get_selected_item(object['ipfs'].purchase_option_tags_object, 'e')

        if(direct_purchase_option == 'enabled'){
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'size':'l', 'details':'Purchase the item directly from the seller', 'title':'Direct Purchase'})}
                    <div style={{height:10}}/>
                    <div onClick={()=> this.open_direct_purchase()}>
                        {this.render_detail_item('5', {'text':'Purchase', 'action':''},)}
                    </div>
                </div>
            )
        }
        
    }

    render_edit_object_button(){
        var object = this.get_storefront_items()[this.props.selected_storefront_item];
        var my_account = this.props.app_state.user_account_id
        if(object['event'].returnValues.p5 == my_account.toString()){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':'Edit Storefront Post', 'details':'Change the basic details for your Storefront Post', 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_basic_edit_object_ui()}>
                        {this.render_detail_item('5', {'text':'Edit Item', 'action':''})}
                    </div>
                </div>
            )
        }
    }


    open_basic_edit_object_ui(){
        var object = this.get_storefront_items()[this.props.selected_storefront_item];
        this.props.open_edit_object('4', object)
    }

    open_add_to_bag(){
        var object = this.get_storefront_items()[this.props.selected_storefront_item]
        this.props.open_add_to_bag(object)
    }

    open_direct_purchase(){
        var object = this.get_storefront_items()[this.props.selected_storefront_item]
        this.props.open_direct_purchase(object)
    }

    render_set_storefront_prices_list_part(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var object = this.get_storefront_items()[this.props.selected_storefront_item];
        var items = object['ipfs'].price_data

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
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
                            <li style={{'padding': '5px 0px 5px 0px'}}>
                                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':'Exchange ID: '+item['id'], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.props.app_state.token_directory[item['id']], })}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        
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
                                            <img src={Letter} style={{height:30 ,width:'auto'}} />
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
                            <div style={{height:10}}/>
                        </div>
                    ))}
                </div>
            )
        }
    }

    get_storefront_details_data(object){
        var tags = object['ipfs'] == null ? ['Store'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Store ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{'style':'l', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`block ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }






    render_direct_purchases(){
        var he = this.props.height-45

        return(
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', height: he, padding:'5px 0px 5px 0px'}}>
                    {this.render_purchases_top_title()}
                    <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '10px 20px 10px 20px'}}/>
                    {this.render_purchases()}
                </div>
            </div>
        )
    }


    render_purchases_top_title(){
        var object = this.get_storefront_items()[this.props.selected_storefront_item]
        return(
            <div style={{padding:'5px 5px 5px 5px'}}>
                {this.render_detail_item('3', {'title':'In '+object['id'], 'details':'Direct Purchases', 'size':'l'})} 
            </div>
        )
    }


    render_purchases(){
        var middle = this.props.height-200;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = this.get_purchases()
        var object = this.get_storefront_items()[this.props.selected_storefront_item]
        var sender_type = 'storefront_owner'
        var fulfilment_accounts = object['ipfs'].fulfilment_accounts==null?[]:object['ipfs'].fulfilment_accounts
        if(this.props.app_state.user_account_id != object['event'].returnValues.p5 && !fulfilment_accounts.includes(this.props.app_state.user_account_id)){
            //if user is not owner of storefront and wasnt included in the fulfilment account array
            items = this.filter_for_senders_orders()
            sender_type = 'storefront_client'
        }
        // sender_type = 'storefront_owner'

        if(items.length == 0){
            items = [0,1,2]
            return(
                <div>
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
                </div>
            )
        }else{
            return(
                <div style={{overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 5px 2px 5px'}}>
                                <div key={index}>
                                    {this.render_full_or_compressed_object(item, sender_type, index)}
                                </div>
                            </li> 
                        ))}
                    </ul>
                </div>
            )
        }
    }


    get_purchases(){
        var object = this.get_storefront_items()[this.props.selected_storefront_item]
        return this.filter_using_bottom_tags(this.props.app_state.direct_purchases[object['id']])
    }

    filter_for_senders_orders(){
        var object = this.get_storefront_items()[this.props.selected_storefront_item]
        var purchases = this.props.app_state.direct_purchases[object['id']]
        var filtered_purchases = []
        for(var i=0; i<purchases.length; i++){
            if(purchases[i]['sender_account'] == this.props.app_state.user_account_id){
                filtered_purchases.push(purchases[i])
            }
        }
        return this.filter_using_bottom_tags(filtered_purchases)
    }


    filter_using_bottom_tags(filtered_purchases){
        var selected_item = this.get_selected_item(this.state.navigate_view_storefront_list_detail_tags_object, 'direct-purchases')
        var object = this.get_storefront_items()[this.props.selected_storefront_item]

        if(selected_item == 'all'){
            return filtered_purchases
        }
        else if(selected_item == 'unfulfilled'){
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
        else if(selected_item == 'fulfilled'){
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



    render_full_or_compressed_object(item, sender_type, index){
        if(this.state.selected_purchase_item == index){
            return this.render_visible_purchase_item(item, sender_type, index)
        }else{
            return this.render_compressed_purchase_item(item, sender_type, index)
        }
    }


    render_compressed_purchase_item(item, sender_type, index){
        var object = this.get_storefront_items()[this.props.selected_storefront_item]
        var signature = this.props.app_state.direct_purchase_fulfilments[object['id']][item['signature_data']]
        if(signature != null){
            return(
                <div onClick={()=> this.when_item_clicked(index)}>
                    {this.render_detail_item('3', {'size':'s', 'title':'Variant ID: '+item['variant_id']+', Sender Account ID: '+item['sender_account'], 'details':'Fulfilent Signature: '+start_and_end(signature['signature']) })}
                </div>
            )
        }else{
            return(
                <div onClick={()=> this.when_item_clicked(index)}>
                    {this.render_detail_item('3', {'size':'s', 'title':'Variant ID: '+item['variant_id']+' , Client ID: '+item['sender_account'], 'details':item['shipping_detail'] })}
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


    render_visible_purchase_item(item, sender_type, index){
        var object = this.get_storefront_items()[this.props.selected_storefront_item]
        return(
            <div>
                <div onClick={()=> this.when_item_clicked(index)}>
                    {this.render_detail_item('3', {'size':'s', 'title':'Shipping Details', 'details':item['shipping_detail']})}
                    <div style={{height:3}}/>
                    {this.render_detail_item('3', {'size':'s', 'title':'Variant ID: '+item['variant_id'], 'details':this.get_variant_from_id(item['variant_id'])['variant_description'] })}
                    <div style={{height:3}}/>
                    {this.render_detail_item('3', {'size':'s', 'title':'Quantity: '+this.format_account_balance_figure(item['purchase_unit_count']), 'details':'Sender Account ID: '+item['sender_account'] })}
                    <div style={{height:3}}/>
                    {this.render_fulfilment_signature_if_any(item)}
                    <div style={{height:5}}/>
                </div>
                
                <div style={{'padding': '1px'}} onClick={() => this.props.open_clear_purchase(item, sender_type, object)}>
                    {this.render_detail_item('5', {'text':'Clear Purchase', 'action':''})}
                </div>
                <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '10px 20px 10px 20px'}}/>
            </div>
        )
        
    }

    get_variant_from_id(variant_id){
        var object = this.get_storefront_items()[this.props.selected_storefront_item]

        for(var i=0; i<object['ipfs'].variants.length; i++){
            if(object['ipfs'].variants[i]['variant_id'] == variant_id){
                return object['ipfs'].variants[i]
            }
        }
    }

    open_clear_purchase(item, client_type, storefront){
        this.props.open_clear_purchase(item, client_type, storefront)
    }


    render_fulfilment_signature_if_any(item){
        var object = this.get_storefront_items()[this.props.selected_storefront_item]
        var signature = this.props.app_state.direct_purchase_fulfilments[object['id']][item['signature_data']]
        if(signature != null){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'s', 'title':'Fulfilment Signature: ', 'details':start_and_end(signature['signature']) })}
                    <div style={{height:3}}/>
                    {this.render_detail_item('3', {'size':'s', 'title':'Signature Data: ', 'details':start_and_end(signature['signature_data']) })}
                    <div style={{height:3}}/>
                    {this.render_detail_item('3', {'size':'s', 'title':'Signature Address: ', 'details':start_and_end(signature['sender_address']) })}
                </div>
            )
        }
    }












    render_storefront_message_activity(){
        var he = this.props.height-110
        var size = this.props.screensize
        return(
            <div>
                <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px', 'max-width':'470px'}}>
                    <div style={{ 'overflow-y': 'auto', height: he, padding:'5px 0px 5px 0px'}}>
                        {this.render_top_title()}
                        {this.render_focus_list()}
                        <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '10px 20px 10px 20px'}}/>
                        {this.render_sent_received_messages()}
                    </div>
                </div>

                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 5px 5px', width: '99%'}}>
                    <div style={{'margin':'15px 0px 0px 0px'}}>
                        {this.render_image_picker()}
                    </div>
                    <div style={{'margin': '0px 0px 0px 0px', width:this.props.width}}>
                        <TextInput height={50} placeholder={'Enter Message...'} when_text_input_field_changed={this.when_entered_text_input_field_changed.bind(this)} text={this.state.entered_text} theme={this.props.theme}/>
                    </div>

                    <div style={{'padding': '20px 5px 0px 5px', 'width':100}} onClick={()=>this.add_message_to_stack()}>
                        {this.render_detail_item('5', {'text':'Send', 'action':'-'})}
                    </div>
                </div>
            </div> 
        )
    }
  

    render_top_title(){
        var object = this.get_storefront_items()[this.props.selected_storefront_item]
        return(
            <div style={{padding:'5px 5px 5px 5px'}}>
                {this.render_detail_item('3', {'title':'In '+object['id'], 'details':object['ipfs'].entered_title_text, 'size':'l'})} 
            </div>
        )
    }

    constructor(props) {
        super(props);
        this.messagesEnd = React.createRef();
    }

    render_sent_received_messages(){
        var middle = this.props.height-200;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = this.get_convo_messages()
        var stacked_items = this.get_stacked_items()

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
                                            <img src={Letter} style={{height:30 ,width:'auto'}} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }
        else if(this.get_focused_message() != null){
            var focused_message_replies = this.get_focused_message_replies()
            return(
                <div>
                    <div style={{'padding': '2px 5px 2px 5px'}}>
                        {this.render_message_as_focused_if_so(this.get_focused_message())}
                    </div>
                    <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 5px 5px'}}>
                        <div style={{overflow: 'auto', 'width':'100%', maxHeight: middle}}>
                            <ul style={{ 'padding': '0px 0px 0px 20px', 'listStyle':'none'}}>
                                {this.render_messages(focused_message_replies)}
                                <div ref={this.messagesEnd}/>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div style={{overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.render_messages(items)}
                        {this.render_messages(stacked_items)}
                        <div ref={this.messagesEnd}/>
                    </ul>
                </div>
            )
        }
    }

    render_messages(items){
        var middle = this.props.height-200;        
        if(items.length == 0 && this.get_focused_message() != null){
            var items = [0,1]
            return(
                <div>
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
        var object = this.get_storefront_items()[this.props.selected_storefront_item]

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

    unfocus_message(){
        var clone = JSON.parse(JSON.stringify(this.state.focused_message))
        var object = this.get_storefront_items()[this.props.selected_storefront_item]
        if(clone['tree'][object['id']] != null){
            var index = this.get_index_of_item()
            if(index != -1){
                clone['tree'][object['id']].splice(index, 1)
            }
        }

        var latest_message = clone['tree'][object['id']].length > 0 ? clone['tree'][object['id']][clone['tree'][object['id']].length -1] : null
        clone[object['id']] = latest_message
        this.setState({focused_message: clone})
    }

    get_index_of_item(){
        var object = this.get_storefront_items()[this.props.selected_storefront_item]
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


    render_message_as_focused_if_so(item){
        var focused_message = this.get_focused_message()

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
                            action: () => this.unfocus_message()
                            }}>
                            <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>{this.render_stack_message_item(item)}</div>
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
                            action: () => this.focus_message(item)
                            }}
                            swipeRight={{
                            content: <div>Unfocus</div>,
                            action: () => this.unfocus_message()
                            }}>
                            <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>{this.render_stack_message_item(item)}</div>
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
            me.unfocus_message()
            clearTimeout(this.all_timeout);
        }else{
            this.all_timeout = setTimeout(function() {
                clearTimeout(this.all_timeout);
                // single tap
                if(focused_message == null){
                    me.focus_message(item)
                }
            }, 200);
        }
        this.last_all_click_time = Date.now();
    }




    render_stack_message_item(item){
        if(item.type == 'message'){
            return(
                <div style={{'padding': '7px 15px 10px 15px','margin':'0px 0px 0px 0px', 'background-color': this.props.theme['view_group_card_item_background'],'border-radius': '7px'}}>
                    
                    <div className="row" style={{'padding':'0px 0px 0px 0px'}}>
                          <div className="col-9" style={{'padding': '0px 0px 0px 14px', 'height':'20px' }}> 
                            <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} onClick={()=>this.props.add_id_to_contacts(item['sender'])} >{this.get_sender_title_text(item)}</p>
                          </div>
                          <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                            <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{this.get_time_difference(item['time'])}</p>
                          </div>
                    </div>
                    <p style={{'font-size': '11px','color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none', 'white-space': 'pre-line'}}>{this.format_message(item['message'])}</p>

                    <p style={{'font-size': '8px','color': this.props.theme['primary_text_color'],'margin': '1px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none', 'white-space': 'pre-line'}} className="fw-bold">{this.get_message_replies(item).length} response(s)</p>
                    
                </div>
            )
        }else{
            return(
                <div style={{'padding': '7px 15px 10px 15px','margin':'0px 0px 0px 0px', 'background-color': this.props.theme['view_group_card_item_background'],'border-radius': '7px'}}>
                    
                    <div className="row" style={{'padding':'0px 0px 0px 0px'}}>
                          <div className="col-9" style={{'padding': '0px 0px 0px 14px', 'height':'20px' }}> 
                            <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} onClick={()=>this.props.add_id_to_contacts(item['sender'])} >{this.get_sender_title_text(item)}</p>
                          </div>
                          <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                            <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{this.get_time_difference(item['time'])}</p>
                          </div>
                    </div>
                    <p style={{'font-size': '11px','color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none', 'white-space': 'pre-line'}}>{this.format_message(item['message'])}</p>

                    {this.render_detail_item('9',item['image-data'])}
                    <p style={{'font-size': '8px','color': this.props.theme['primary_text_color'],'margin': '1px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none', 'white-space': 'pre-line'}} className="fw-bold">{this.get_message_replies(item).length} response(s)</p>
                </div>
            )
        }
    }

    get_sender_title_text(item){
        if(item['sender'] == this.props.app_state.user_account_id){
            return 'You'
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

    get_convo_messages(){
        var object = this.get_storefront_items()[this.props.selected_storefront_item]
        var messages = this.props.app_state.object_messages[object['id']]==null?[]:this.props.app_state.object_messages[object['id']]
        return messages
    }

    get_stacked_items(){
        var object = this.get_storefront_items()[this.props.selected_storefront_item]
        var convo_id = object['id']

        var stack = this.props.app_state.stack_items
        var stacked_items = []
        for(var i=0; i<stack.length; i++){
            if(stack[i].type == 'storefront-messages'){
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
        var object = this.get_storefront_items()[this.props.selected_storefront_item]
        return this.state.focused_message[object['id']]
    }





    render_image_picker(){
        return(
            <div>
                <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                    <img src={E5EmptyIcon3} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
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

    add_message_to_stack(){
        var message = this.state.entered_text.trim()
        var object = this.get_storefront_items()[this.props.selected_storefront_item]
        var message_id = Date.now()
        var focused_message_id = this.get_focused_message() != null ? this.get_focused_message()['message_id'] : 0
        if(message == ''){
            this.props.notify('type something first', 600)
        }
        else if(this.props.app_state.user_account_id == 1){
            this.props.notify('you need to make at least 1 transaction to participate', 1200)
        }
        else{
            var tx = {'id':object['id'], type:'message', entered_indexing_tags:['send', 'message'], 'message':message, 'sender':this.props.app_state.user_account_id, 'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id}

            this.props.add_storefront_message_to_stack_object(tx)

            this.setState({entered_text:''})
            this.props.notify('message added to stack', 600)
            
            if (this.messagesEnd.current){
                this.messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }

    add_image_to_stack(image){
        if(this.props.app_state.user_account_id == 1){
            this.props.notify('you need to make at least 1 transaction to participate', 1200)
            return
        }
        var message_id = Date.now()
        var focused_message_id = this.get_focused_message() != null ? this.get_focused_message()['message_id'] : 0
        var message = this.state.entered_text.trim()
        var object = this.get_storefront_items()[this.props.selected_storefront_item]
        var tx = {'id':object['id'], type:'image', 'message': message, entered_indexing_tags:['send', 'image'], 'image-data':{'images':[image],'pos':0}, 'sender':this.props.app_state.user_account_id,'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id}

        this.props.add_storefront_message_to_stack_object(tx)

        this.setState({entered_text:''})
        this.props.notify('message added to stack', 600)

        if (this.messagesEnd.current){
            this.messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }


    render_focus_list(){
        var object = this.get_storefront_items()[this.props.selected_storefront_item]
        var items = this.state.focused_message['tree'][object['id']]

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
        var object = this.get_storefront_items()[this.props.selected_storefront_item]

        var new_array = []
        for(var i=0; i<=pos; i++){
            new_array.push(clone['tree'][object['id']][i])
        }
        clone[object['id']] = item
        clone['tree'][object['id']] = new_array
        
        this.setState({focused_message: clone})
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
                <ViewGroups item_id={item_id} object_data={object_data} theme={this.props.theme} width={width} show_images={this.props.show_images.bind(this)}/>
            </div>
        )

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
            return number_with_commas(num) + ' yr' + s;
        }
    }







}




export default StorefrontDetailsSection;