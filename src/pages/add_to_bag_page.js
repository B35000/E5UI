import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import TextInput from './../components/text_input';
import NumberPicker from './../components/number_picker';

// import Letter from './../assets/letter.png';
import SwipeableViews from 'react-swipeable-views';

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

class AddToBagPage extends Component {
    
    state = {
        selected: 0, storefront_item:{},  type:this.props.app_state.loc['1043']/* 'add-to-bag' */, id:makeid(8),
        entered_indexing_tags:[this.props.app_state.loc['1044']/* 'add' */, this.props.app_state.loc['1045']/* 'bag' */, this.props.app_state.loc['1046']/* 'storefront-item' */], add_to_bag_tags_object: this.get_add_to_bag_tags_object(),
        purchase_unit_count:1, selected_variant:null, device_city: '', selected_device_city:'',
    };

    get_add_to_bag_tags_object(){
        return{
            'i':{
                active:'e',
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1043']/* 'add-to-bag' */], [1]
            ],
        };
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.add_to_bag_tags_object} tag_size={'l'} when_tags_updated={this.when_add_to_bag_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img alt="" className="text-end" onClick={()=>this.finish_creating_bag_item()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div>
                <div style={{height:10}}/>
                {this.render_everything()}

            </div>
        )
    }

    when_add_to_bag_tags_object_updated(tag_obj){
        this.setState({add_to_bag_tags_object: tag_obj})
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
                                    <img alt="" src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }


    render_everything(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_content()}
                    {this.render_set_storefront_prices_list_part()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_content()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_storefront_prices_list_part()}
                        <div style={{height:10}}/>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_content()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_storefront_prices_list_part()}
                        <div style={{height:10}}/>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_content(){
        var object = this.state.storefront_item

        if(object['ipfs'] != null){
            var composition_type = object['ipfs'].composition_type == null ? this.props.app_state.loc['1047']/* 'items' */ : this.get_selected_item(object['ipfs'].composition_type, 'e')

            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1048']/* 'Item Variants' */, 'details':this.props.app_state.loc['1049']/* 'Pick the variant you want to purchase' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_item_variants()}
                    {this.render_selected_variant()}

                    
                    {this.render_city_settings()}


                    {this.render_detail_item('0')}
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1050']/* 'Amount in ' */+composition_type, 'number':this.state.purchase_unit_count, 'relativepower':composition_type})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1050']/* 'Amount in ' */+composition_type, 'subtitle':this.format_power_figure(this.state.purchase_unit_count), 'barwidth':this.calculate_bar_width(this.state.purchase_unit_count), 'number':this.format_account_balance_figure(this.state.purchase_unit_count), 'barcolor':'', 'relativepower':composition_type, })}
                    </div>

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_purchase_unit_count.bind(this)} theme={this.props.theme} power_limit={23}/>
                    <div style={{height:10}}/>

                </div>
            )
        }
    }

    render_city_settings(){
        if(!this.should_render_city_settings()) return;
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1058a']/* 'Bag City (Optional).' */, 'details':this.props.app_state.loc['1058b']/* 'You may specify your location city for contractors.' */, 'size':'l'})}
                <div style={{height:10}}/>

                <TextInput height={30} placeholder={this.props.app_state.loc['a311bp']/* 'Enter City...' */} when_text_input_field_changed={this.when_device_city_input_field_changed.bind(this)} text={this.state.device_city} theme={this.props.theme}/>
                
                <div style={{height:5}}/>
                {this.render_detail_item('1',{'active_tags':this.get_cities_from_typed_text(), 'indexed_option':'indexed', 'when_tapped':'when_city_selected'})}
                
                <div style={{height:10}}/>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'14px','text':this.state.selected_device_city})}
            </div>
        )
    }

    should_render_city_settings(){
        var stack = this.props.app_state.stack_items.slice() 
        var pos = -1
        var storefront_item_content_channeling = this.state.storefront_item['ipfs'].content_channeling_setting
        for(var i=0; i<stack.length; i++){
            if(stack[i].type == this.props.app_state.loc['1516']/* 'storefront-bag' */ && stack[i].e5 == this.state.e5 && stack[i].content_channeling_setting == storefront_item_content_channeling){
                pos = i
                break;
            }
        }
        if(pos == -1){
            return true
        }

        return false
    }

    when_device_city_input_field_changed(text){
        this.setState({device_city: text.toLowerCase()})
    }

    get_cities_from_typed_text(){
        var selected_cities = []
        var typed_text = this.state.device_city
        var all_cities = this.props.app_state.all_cities
        var specific_cities = []
        var device_country = this.props.app_state.device_country_code

        if(typed_text != ''){
            specific_cities = all_cities.filter(function (el) {
                return (el['city'].startsWith(typed_text) || el['city'] == typed_text) && el['country'].startsWith(device_country)
            });
        }else{
            specific_cities = all_cities.filter(function (el) {
                return el['country'].startsWith(device_country)
            });
        }

        var l = specific_cities.length > 7 ? 7 : specific_cities.length
        for(var i=0; i<l; i++){
            selected_cities.push(specific_cities[i]['city'])
        }
        return selected_cities;
    }

    when_city_selected(tag, pos){
        if(tag != 'e') this.setState({selected_device_city: tag, device_city:''})
    }

    when_purchase_unit_count(amount){
        this.setState({purchase_unit_count: amount})
    }

    get_variant_supply(){
        if(this.state.selected_variant != null){
            return this.state.selected_variant['available_unit_count']
        }else{
            return bigInt('1e72')
        }
    }


    render_set_storefront_prices_list_part(){
        var middle = this.props.height-200;
        var size = this.props.size;
        if(this.state.selected_variant != null){
            var items = [].concat(this.state.selected_variant['price_data'])
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1051']/* 'Purchase Amounts' */, 'details':this.props.app_state.loc['1052']/* 'This is the final amount for the price of the items your buying' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px 0px 5px 0px'}}>
                                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'number':this.get_amounts_to_be_paid(item['amount']), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'subtitle':this.format_power_figure(this.get_amounts_to_be_paid(item['amount'])), 'barwidth':this.calculate_bar_width(this.get_amounts_to_be_paid(item['amount'])), 'number':this.format_account_balance_figure(this.get_amounts_to_be_paid(item['amount'])), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }


    get_amounts_to_be_paid(amount){
        return bigInt(amount).multiply(bigInt(this.state.purchase_unit_count))
    }


    render_item_variants(){
        var items = [].concat(this.state.storefront_item['ipfs'].variants)
        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=> this.when_variant_item_clicked(item)}>
                            {this.render_variant_item_if_selected(item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_variant_item_if_selected(item){
        if(this.state.selected_variant == item){
            return(
                <div>
                    <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '0px 5px 3px 5px'}}/>
                    {this.render_detail_item('3',{'title':this.format_account_balance_figure(item['available_unit_count'])+' Units.', 'details':this.truncate(item['variant_description'], 15),'size':'s'})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3',{'title':this.format_account_balance_figure(item['available_unit_count'])+' Units.', 'details':this.truncate(item['variant_description'], 15),'size':'s'})}
                </div>
            )
        }
    }

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }

    when_variant_item_clicked(item){
        if(this.selected_variant == item){
            this.setState({selected_variant: null})
        }else{
            this.setState({selected_variant: item, purchase_unit_count:0})
        }
        
    }

    render_selected_variant(){
        var item = this.state.selected_variant
        if(item != null){
            return(
                <div>
                    <div style={{height:10}}/>
                    {this.render_detail_item('4', {'text':item['variant_description'], 'textsize':'13px', 'font':this.props.app_state.font})}
                    <div style={{height:3}}/>
                    <div style={{padding:'0px 0px 0px 0px'}}>
                        {this.render_detail_item('9', item['image_data']['data'])}
                    </div>
                    <div style={{height:5}}/>
                    {this.render_detail_item('3', {'title':this.format_account_balance_figure(item['available_unit_count']), 'details':this.props.app_state.loc['1107']/* 'Number of Units' */, 'size':'l'})}
                    <div style={{height:5}}/>
                    {this.render_variant_price_data(item)}
                </div>
            )
        }
    }


    render_variant_price_data(variant){
        var items = [].concat(variant['price_data'])
        return(
            <div>
                {items.map((item, index) => (
                    <div style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']],})}
                        </div>
                    </div>
                ))}
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




    set_transaction(item){
        if(this.state.storefront_item['id'] != item['id']){
            this.setState({
                selected: 0, storefront_item:{},  type:this.props.app_state.loc['1043']/* 'add-to-bag' */, id:makeid(8),
                entered_indexing_tags:[this.props.app_state.loc['1044']/* 'add' */, this.props.app_state.loc['1045']/* 'bag' */, this.props.app_state.loc['1046']/* 'storefront-item' */], add_to_bag_tags_object: this.get_add_to_bag_tags_object(),
                purchase_unit_count:1, selected_variant:null
            })
        }
        this.setState({storefront_item: item, e5: item['e5']})
    }


    finish_creating_bag_item(){
        if(this.state.selected_variant == null){
            this.props.notify(this.props.app_state.loc['1056']/* 'Pick one variant first.' */, 5500)
        }
        else if(this.state.purchase_unit_count == 0){
            this.props.notify(this.props.app_state.loc['1057']/* 'Please specify an amount of the item your adding.' */, 5400)
        }
        else if(this.state.purchase_unit_count > this.get_variant_supply()){
            this.props.notify(this.props.app_state.loc['1055']/* 'The most you can add is ' */+this.format_account_balance_figure(this.get_variant_supply())+' '+this.get_composition_type())
        }
        else if(this.state.selected_device_city == '' && this.should_render_city_settings()){
            this.props.notify(this.props.app_state.loc['1058c']/* 'You need to set your city for contractors.' */, 4400)
        }
        else{
            this.props.add_bag_item_to_bag_in_stack(this.state)
            this.props.notify(this.props.app_state.loc['1058']/* 'Transaction added to Stack' */, 700)
        }
    }

    get_composition_type(){
        var object = this.state.storefront_item
        var composition_type = object['ipfs'].composition_type == null ? this.props.app_state.loc['1047']/* 'items' */ : this.get_selected_item(object['ipfs'].composition_type, 'e')

        return composition_type
    }






    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var uploaded_data = {}
        if(item_id == '8' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12')uploaded_data = this.props.app_state.uploaded_data
        return(
            <div>
                <ViewGroups uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} show_images={this.props.show_images.bind(this)} when_city_selected={this.when_city_selected.bind(this)} />
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

    get_number_width(number){
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
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

}




export default AddToBagPage;