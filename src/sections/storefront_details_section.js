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
        selected: 0, navigate_view_storefront_list_detail_tags_object: this.get_navigate_storefront_list_detail_tags_object_tags(), focused_message:{'tree':{}}
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
                    {this.render_storefront_activity()}
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
        var selected_option_name = this.get_selected_item(this.props.explore_page_tags_object, this.props.explore_page_tags_object['i'].active)

        if(this.props.explore_page_tags_object['i'].active != 'storefront'){
            return this.props.app_state.created_stores 
        }

        if(selected_option_name == 'all'){
            return this.props.app_state.created_stores
        }
        else if(selected_option_name == 'viewed'){
            var my_viewed_stores = []
            for(var i=0; i<this.props.viewed_stores.length; i++){
                my_viewed_stores.push(this.props.app_state.created_stores[this.props.viewed_stores[i]])
            }
            return my_viewed_stores
        }
        else {
            var my_stores = []
            var myid = this.props.app_state.user_account_id
            for(var i = 0; i < this.props.app_state.created_stores.length; i++){
                var post_author = this.props.app_state.created_stores[i]['event'].returnValues.p5
                if(post_author.toString() == myid.toString()){
                    my_stores.push(this.props.app_state.created_stores[i])
                }
            }
            return my_stores
        }
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
        var he = this.props.height-40

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

        if(this.props.app_state.user_account_id != object['event'].returnValues.p5){
            //if user is not owner of storefront
            items = this.filter_for_senders_orders()
        }

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
                                    {this.render_visible_purchase_item(item)}
                                    <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '10px 20px 10px 20px'}}/>
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



    render_visible_purchase_item(item){
        var object = this.get_storefront_items()[this.props.selected_storefront_item]
        return(
            <div onClick={()=> this.props.open_clear_purchase(item, 'storefront_owner', object)}>
                {this.render_detail_item('3', {'size':'s', 'title':'Shipping Details', 'details':item['shipping_detail']})}
                <div style={{height:3}}/>
                {this.render_detail_item('3', {'size':'s', 'title':'Variant ID: '+item['variant_id'], 'details':this.get_variant_from_id(item['variant_id'])['variant_description'] })}
                <div style={{height:3}}/>
                {this.render_detail_item('3', {'size':'s', 'title':'Quantity: '+this.format_account_balance_figure(item['purchase_unit_count']), 'details':'Sender Account ID: '+item['sender_account'] })}
                <div style={{height:3}}/>
                {this.render_fulfilment_signature_if_any(item)}
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
                    <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '10px 20px 10px 20px'}}/>
                </div>
            )
        }
    }












    render_storefront_activity(){

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