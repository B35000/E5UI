import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import Letter from './../assets/letter.png'; 
import TextInput from './../components/text_input';
import E5EmptyIcon from './../assets/e5empty_icon.png';
import E5EmptyIcon3 from './../assets/e5empty_icon3.png';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class BagDetailsSection extends Component {
    
    state = {
        selected: 0, navigate_view_bag_list_detail_tags_object: this.get_navigate_bag_list_detail_tags_object_tags(), focused_message:{'tree':{}}
    };

    get_navigate_bag_list_detail_tags_object_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e','metadata','responses','activity'],[1]
          ],
        }
    }

    render(){
        return(
            <div>{this.render_bag_list_detail()}</div>
        )
    }

    render_bag_list_detail(){
        if(this.props.selected_bag_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_bag_details_section()}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 0px 0px', 'max-width':'470px'}}>
                        <Tags page_tags_object={this.state.navigate_view_bag_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_bag_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
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

    when_navigate_view_bag_list_detail_tags_object_updated(tag_obj){
        this.setState({navigate_view_bag_list_detail_tags_object: tag_obj})
    }

    render_bag_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_bag_list_detail_tags_object, this.state.navigate_view_bag_list_detail_tags_object['i'].active)

        if(selected_item == 'metadata'){
            return(
                <div>
                    {this.render_bag_main_details_section()}
                </div>
            )
        }
        else if(selected_item == 'responses'){
            return(
                <div>
                    {this.render_bag_post_responses()}
                </div>
            )
            
        }
        else if(selected_item == 'activity'){
            return(
                <div>
                    {this.render_bag_activity()}
                </div>
            ) 
        }
    }


    render_bag_main_details_section(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-45
        var object = this.get_bag_items()[this.props.selected_bag_item];
        var item = this.get_bag_details_data(object)
        
        return(
            <div style={{'border-radius': '15px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 0px 0px 0px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    {this.render_detail_item('0')}

                    {this.render_all_variants(object)}

                    {this.render_fulfil_order_button()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }


    render_fulfil_order_button(){
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'details':'Fulfil the delivery request for the sender account', 'title':'Fulfil Bag'})}
                <div style={{height:10}}/>
                <div onClick={()=> this.open_fulfil_bag_request()}>
                    {this.render_detail_item('5', {'text':'Fulfil Bag', 'action':''},)}
                </div>
            </div>
        )
    }

    open_fulfil_bag_request(){
        var object = this.get_bag_items()[this.props.selected_bag_item];
        this.props.open_fulfil_bag_request(object)
    }

    get_bag_items(){
        var selected_option_name = this.get_selected_item(this.props.explore_page_tags_object, this.props.explore_page_tags_object['i'].active)

        if(this.props.explore_page_tags_object['i'].active != 'bags'){
            return this.props.app_state.created_stores 
        }

        if(selected_option_name == 'all'){
            return this.props.app_state.created_bags
        }
        else if(selected_option_name == 'viewed'){
            var my_viewed_bags = []
            for(var i=0; i<this.props.viewed_bags.length; i++){
                my_viewed_bags.push(this.props.app_state.created_bags[this.props.viewed_bags[i]])
            }
            return my_viewed_bags
        }
        else {
            var my_bags = []
            var myid = this.props.app_state.user_account_id
            for(var i = 0; i < this.props.app_state.created_bags.length; i++){
                var post_author = this.props.app_state.created_bags[i]['event'].returnValues.p3
                if(post_author.toString() == myid.toString()){
                    my_bags.push(this.props.app_state.created_bags[i])
                }
            }
            return my_bags
        }
    }


    get_bag_details_data(object){
        var tags = [object['event'].returnValues.p3]
        var title = object['ipfs'] == null ? '' : object['ipfs']['bag_orders'].length+' item(s) ordered'
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var time = object['event'] == null ? 0 : object['event'].returnValues.p4
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':'Bag ID: '+object['id'], 'details':title, 'size':'l'},
            'age':{'style':'l', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`block ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }


    render_all_variants(object){
        var middle = this.props.height-200;
        var items_to_deliver = object['ipfs']['bag_orders']
        return (
            <div style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items_to_deliver.map((item, index) => (
                        <li style={{'padding': '2px 0px 2px 0px'}}>
                            {this.render_variant_details(item)}
                            <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '2px 20px 10px 20px'}}/>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }


    render_variant_details(item){
        var storefront = this.props.app_state.created_store_mappings[item['storefront_item_id']]
        var variant_in_store = this.get_variant_object_from_storefront(storefront, item['storefront_variant_id'])
        var items = variant_in_store['price_data']
        var composition_type = storefront['ipfs'].composition_type == null ? 'items' : this.get_selected_item(storefront['ipfs'].composition_type, 'e')
        return(
            <div>
                {this.render_detail_item('3', {'title':storefront['ipfs'].entered_title_text, 'details':'Store ID:'+storefront['id'] , 'size':'s'})}
                <div style={{height: 3}}/>
                {this.render_detail_item('3', {'title':item['purchase_unit_count'], 'details':composition_type+' ordered.' , 'size':'s'})}
                <div style={{height: 3}}/>
                {this.render_detail_item('3', {'title':variant_in_store['variant_description'], 'details':'Variant Description', 'size':'s'})}
                <div style={{height: 3}}/>
                {this.render_detail_item('3', {'title':'Fulfilment Location', 'details':storefront['ipfs'].fulfilment_location, 'size':'s'})}
                <div style={{padding:'0px 0px 0px 10px'}}>
                    {this.render_detail_item('9', variant_in_store['image_data']['data'])}
                </div>
                <div style={{height: 10}}/>
                {items.map((units, index) => (
                    <li style={{'padding': '2px 0px 2px 0px'}}>
                        {this.render_detail_item('2', { 'style':'s', 'title':'Exchange ID: '+units['id'], 'subtitle':this.format_power_figure(this.get_amounts_to_be_paid(units['amount'], item.purchase_unit_count)), 'barwidth':this.calculate_bar_width(this.get_amounts_to_be_paid(units['amount'], item.purchase_unit_count)), 'number':this.format_account_balance_figure(this.get_amounts_to_be_paid(units['amount'], item.purchase_unit_count)), 'barcolor':'', 'relativepower':this.props.app_state.token_directory[units['id']], })}
                    </li>
                ))}
            </div>
        )
    }

    get_amounts_to_be_paid(amount, count){
        return bigInt(amount).multiply(bigInt(count))
    }


    get_variant_object_from_storefront(storefront, id){
        for(var i=0; i<storefront['ipfs'].variants.length; i++){
            if(storefront['ipfs'].variants[i]['variant_id'] == id){
                return storefront['ipfs'].variants[i]
            }
        }
    }






    render_bag_post_responses(){
        var he = this.props.height-40

        return(
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', height: he, padding:'5px 0px 5px 0px'}}>
                    {this.render_bag_post_top_title()}
                    <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '10px 20px 10px 20px'}}/>
                    {this.render_bag_post_sent_received_messages()}
                </div>
            </div>
        )
    }

    render_bag_post_top_title(){
        var object = this.get_bag_items()[this.props.selected_bag_item];
        return(
            <div style={{padding:'5px 5px 5px 5px'}}>
                {this.render_detail_item('3', {'title':'In '+object['id'], 'details':'Bag Responses', 'size':'l'})} 
            </div>
        )
    }

    render_bag_post_sent_received_messages(){
        var middle = this.props.height-200;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = this.get_bag_details_responses()

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
                                    {this.render_bag_response_item(item)}
                                </div>
                            </li> 
                        ))}
                    </ul>
                </div>
            )
        }
    }

    get_bag_details_responses(){
        var object = this.get_bag_items()[this.props.selected_bag_item];
        if(object['event'].returnValues.p3 == this.props.app_state.user_account_id){
            return this.props.app_state.job_responses[object['id']]
        }else{
            var filtered_responses = []
            var all_responses = this.props.app_state.job_responses[object['id']]
            for(var i=0; i<all_responses.length; i++){
                if(all_responses[i]['applicant_id'] == this.props.app_state.user_account_id){
                    filtered_responses.push(all_responses[i])
                }
            }
            return filtered_responses
        }
    }

    render_bag_response_item(item){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var is_application_accepted = item['is_response_accepted'];

        if(is_application_accepted){
            return(
                <div onClick={() => this.view_contract(item)}>
                    {this.render_detail_item('3', {'title':'Expiry time from now: '+this.get_time_diff(item['application_expiry_time'] - (Date.now()/1000)), 'details':''+(new Date(item['application_expiry_time'] * 1000)), 'size':'s'})}
                    <div style={{height:3}}/>
                    
                    {this.render_detail_item('3', {'title':'Contract ID: '+item['picked_contract_id'], 'details':'Sender ID: '+item['applicant_id'], 'size':'s'})}
                    <div style={{height:3}}/>

                    {this.render_detail_item('3', {'title':'Accepted', 'details':'The bag owner picked this fulfilment application', 'size':'s'})}
                    <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '10px 20px 10px 20px'}}/>
                    <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '10px 20px 10px 20px'}}/>
                </div>
            )
        }else{
            return(
                <div onClick={() => this.view_contract(item)}>
                    {this.render_detail_item('3', {'title':'Expiry time from now: '+this.get_time_diff(item['application_expiry_time'] - (Date.now()/1000)), 'details':''+(new Date(item['application_expiry_time'] * 1000)), 'size':'s'})}
                    <div style={{height:3}}/>
                    
                    {this.render_detail_item('3', {'title':'Contract ID: '+item['picked_contract_id'], 'details':'Sender ID: '+item['applicant_id'], 'size':'s'})}
                    <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '10px 20px 10px 20px'}}/>
                </div>
            )
        }
        
    }

    view_contract(item){
        var object = this.get_bag_items()[this.props.selected_bag_item];
        if(object['event'].returnValues.p3 == this.props.app_state.user_account_id){
            this.props.view_bag_application_contract(item)
        }
    }









    render_bag_activity(){

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




export default BagDetailsSection;