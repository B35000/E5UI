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
import TextInput from './../components/text_input';
import NumberPicker from './../components/number_picker';

// import Letter from './../assets/letter.png';

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

class DirectPurchasetPage extends Component {
    
    state = {
        selected: 0, storefront_item:{}, id:makeid(8), direct_purchase_tags_object: this.get_direct_purchase_tags_object(),  type:this.props.app_state.loc['1093']/* 'direct-purchase' */, entered_indexing_tags:[this.props.app_state.loc['1094']/* 'direct' */, this.props.app_state.loc['1095']/* 'purchase' */, this.props.app_state.loc['1096']/* 'buy' */], purchase_unit_count:1, selected_variant:null, fulfilment_location:'', e5:this.props.app_state.selected_e5, custom_specifications:'', purchase_option_tags_array:[]
    };

    get_direct_purchase_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1093']/* 'direct-purchase' */], [1]
            ],
        };
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px', 'overflow-x':'hidden'}}>
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.direct_purchase_tags_object} tag_size={'l'} when_tags_updated={this.when_direct_purchase_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img alt="" className="text-end" onClick={()=>this.finish_creating_direct_purchase_item()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div>

                {this.render_everything()}

            </div>
        )
    }


    when_direct_purchase_tags_object_updated(tag_obj){
        this.setState({direct_purchase_tags_object: tag_obj})
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }

    render_everything(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_content()}
                    {this.render_purchase_options()}
                    {this.render_price_content()}
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
                        {this.render_purchase_options()}
                        {this.render_price_content()}
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
                        {this.render_purchase_options()}
                        {this.render_price_content()}
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
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


    render_content(){
        var object = this.state.storefront_item

        if(object['ipfs'] != null){
            var composition_type = object['ipfs'].composition_type == null ? 'items' : this.get_selected_item(object['ipfs'].composition_type, 'e')

            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1097']/* 'Fulfilment Location' */, 'details':this.props.app_state.loc['1098']/* 'Set the delivery location, and be sure to be specific to avoid shipping issues' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <TextInput font={this.props.app_state.font} height={70} placeholder={this.props.app_state.loc['1099']/* 'Shipping Details...' */} when_text_input_field_changed={this.when_fulfilment_location_input_field_changed.bind(this)} text={this.state.fulfilment_location} theme={this.props.theme}/>
                    <div style={{height:10}}/>
                    {this.render_shipping_detail_suggestions()}
                    {this.render_detail_item('0')}



                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1114c']/* 'Custom Specifications.' */, 'details':this.props.app_state.loc['1114d']/* 'You can also include custom requirements for the item variant your ordering such as color, material and such.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <TextInput font={this.props.app_state.font} height={70} placeholder={this.props.app_state.loc['1114e']/* 'Custom Specifications.' */} when_text_input_field_changed={this.when_custom_specifications_input_field_changed.bind(this)} text={this.state.custom_specifications} theme={this.props.theme}/>
                    {this.render_detail_item('0')}



                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1100']/* 'Item Variants' */, 'details':this.props.app_state.loc['1101']/* 'Pick the variant you want to purchase' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_item_variants()}
                    {this.render_selected_variant()}
                    {this.render_detail_item('0')}


                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1102']/* 'Amount in ' */+composition_type, 'number':this.state.purchase_unit_count, 'relativepower':composition_type})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1102']/* 'Amount in ' */+composition_type, 'subtitle':this.format_power_figure(this.state.purchase_unit_count), 'barwidth':this.calculate_bar_width(this.state.purchase_unit_count), 'number':this.format_account_balance_figure(this.state.purchase_unit_count), 'barcolor':'', 'relativepower':composition_type, })}
                    </div>

                    {/* <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_purchase_unit_count.bind(this)} theme={this.props.theme} power_limit={23}/> */}
                    <div style={{height:10}}/>
                    <TextInput height={30} placeholder={this.props.app_state.loc['1058f']/* 'Amount...' */} when_text_input_field_changed={this.when_purchase_unit_count_input_field_changed.bind(this)} text={this.state.purchase_unit_count.toString()} theme={this.props.theme}/>
                </div>
            )
        }
    }

    render_price_content(){
        var object = this.state.storefront_item
        if(object['ipfs'] != null){
            return(
                <div>
                    {this.render_set_storefront_prices_list_part()}
                    {this.render_direct_purchase_shipping_fees()}
                    {this.render_purchase_option_fees()}
                    {this.render_my_balances()}
                    <div style={{height:20}}/>
                </div>
            )
        }
    }

    render_shipping_detail_suggestions(){
        var items = [].concat(this.get_fulfilment_location_from_local_storage())
        if(items.length == 0) return;
        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=> this.when_suggestion_clicked(item, index)}>
                            {this.render_detail_item('3',{'title':this.truncate(item['text'], 15), 'details':this.get_time_difference(item['time']),'size':'s'})}
                        </li>
                    ))}
                </ul>
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

    when_purchase_unit_count_input_field_changed(text){
        if(!isNaN(text)){
            this.setState({purchase_unit_count: bigInt(text)})
        }
    }


    get_variant_supply(){
        if(this.state.selected_variant != null){
            return this.state.selected_variant['available_unit_count']
        }else{
            return bigInt('1e72')
        }
    }


    when_purchase_unit_count(amount){
        this.setState({purchase_unit_count: amount})
    }

    when_fulfilment_location_input_field_changed(text){
        this.setState({fulfilment_location: text})
    }

    when_custom_specifications_input_field_changed(text){
        this.setState({custom_specifications: text})
    }

    render_set_storefront_prices_list_part(){
        var middle = this.props.height-200;
        var size = this.props.size;
        if(this.state.selected_variant != null){
            var items = [].concat(this.state.selected_variant['price_data'])
            return(
                <div style={{}}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1103']/* 'Purchase Amounts' */, 'details':this.props.app_state.loc['1104']/* 'This is the final amount for the price of the items your buying' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px 0px 5px 0px'}}>
                                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'subtitle':this.format_power_figure(this.get_amounts_to_be_paid(item['amount'])), 'barwidth':this.calculate_bar_width(this.get_amounts_to_be_paid(item['amount'])), 'number':this.format_account_balance_figure(this.get_amounts_to_be_paid(item['amount'])), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_direct_purchase_shipping_fees(){
        var object = this.state.storefront_item
        var items = [].concat(object['ipfs'].shipping_price_data)

        return(
                <div style={{}}>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1114a']/* 'Purchase Amounts' */, 'details':this.props.app_state.loc['1114b']/* 'This is the final amount for the shipping fee for the items your buying.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px 0px 5px 0px'}}>
                                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
    }

    render_my_balances(){
        if(this.state.selected_variant != null){
            var items = [].concat(this.state.selected_variant['price_data'])
            var buy_amount_balances = []

            for(var i=0; i<items.length; i++){
                var token_id = items[i]['id']
                // var token_balance = this.props.app_state.created_token_object_mapping[this.state.e5][token_id]
                // token_balance = token_balance == null ? 0 : token_balance['balance']
                var token_balance = this.props.calculate_actual_balance(this.state.e5, token_id)
                buy_amount_balances.push(token_balance)
            }
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1105']/* 'Your balances' */, 'details':this.props.app_state.loc['1106']/* 'This is how much you have available for the direct purchase' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px 0px 5px 0px'}}>
                                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'number':buy_amount_balances[index], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'subtitle':this.format_power_figure(buy_amount_balances[index]), 'barwidth':this.calculate_bar_width(buy_amount_balances[index]), 'number':this.format_account_balance_figure(buy_amount_balances[index]), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
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
        var composition_type = this.get_composition_type()

        if(this.state.selected_variant == item){
            return(
                <div>
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '0px 5px 3px 5px'}}/>
                    {this.render_detail_item('3',{'title':this.format_account_balance_figure(item['available_unit_count'])+' '+composition_type, 'details':this.truncate(item['variant_description'], 15),'size':'s'})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3',{'title':this.format_account_balance_figure(item['available_unit_count'])+' '+composition_type, 'details':this.truncate(item['variant_description'], 15),'size':'s'})}
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
            this.setState({selected_variant: item, purchase_unit_count: 1})
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





    set_up_option_groups(object){
        if(object['ipfs'] != null && object['ipfs'].option_groups != null && object['ipfs'].option_groups.length > 0){
            var items = object['ipfs'].option_groups
            var purchase_option_tags_array = []
            items.forEach(item => {
                purchase_option_tags_array.push(this.get_option_group_tags(item))
            });
            this.setState({purchase_option_tags_array: purchase_option_tags_array})
        }
    }

    render_purchase_options(){
        var object = this.state.storefront_item
        if(object['ipfs'] != null && object['ipfs'].option_groups != null && object['ipfs'].option_groups.length > 0){
            var items = object['ipfs'].option_groups
            return(
                <div>
                    <div style={{height:10}}/>
                    {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'13px','text':this.props.app_state.loc['1058l']/* 'Some purchasing options have been specified. Please set at your discretion.' */})}
                    <div style={{height:10}}/>
                    {items.map((item, index) => (
                        <div style={{'padding': '0px 0px 0px 0px'}}>
                            {this.render_detail_item('3', {'title':item['title'], 'details':item['details'], 'size':'l'})}
                            <div style={{height:10}}/>
                            <Tags font={this.props.app_state.font} page_tags_object={this.state.purchase_option_tags_array[index]} tag_size={'l'} when_tags_updated={(tag_obj) => this.when_group_tags_updated(tag_obj, index)} theme={this.props.theme}/>
                        </div>
                    ))}
                </div>
            )
        }
    }

    when_group_tags_updated(tag_obj, index){
        var clone = this.state.purchase_option_tags_array.slice()
        clone[index] = tag_obj
        this.setState({purchase_option_tags_array: clone})
    }

    get_option_group_tags(item){
        var group_type = item['group_type_tags']
        var selected_type = this.get_selected_item2(group_type, 'e')
        var options = {1: 'xor'/* single-mandatory */, 2: 'or'/* single */, 3:'and'/* multiple */}
        var default_option_array = {1:[1], 2:[0], 3:[0]}

        var tag_items = ['e']
        item['options'].forEach(option => {
            var option_name = option['name']
            tag_items.push(option_name)
        });

        var obj = {
            'i':{
                active:'e', 
            },
            'e':[
                [options[selected_type],'',0], tag_items, default_option_array[selected_type]
            ],
        };

        return obj
    }

    get_selected_item2(object, option){
        return object[option][2][0]
    }


    render_purchase_option_fees(){
        var middle = this.props.height-200;
        var object = this.state.storefront_item
        if(object['ipfs'] != null && object['ipfs'].option_groups != null && object['ipfs'].option_groups.length > 0){
            var items = this.get_final_purchase_option_fees(object['ipfs'].option_groups)
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1058m']/* 'Selected Option Fees.' */, 'details':this.props.app_state.loc['1058n']/* 'Below is the extra price for the selected options youve chosen.' */, 'size':'l'})}
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

    get_final_purchase_option_fees(options){
        var price_obj = {}
        for(var i=0; i<this.state.purchase_option_tags_array.length; i++){
            var tag_obj = this.state.purchase_option_tags_array[i]
            var selected_items = []
            for(var j=0; j<tag_obj['e'][2].length; j++){
                var selected_item_pos = tag_obj['e'][2][j]
                if(selected_item_pos != 0){
                    selected_items.push(selected_item_pos-1)
                }
            }
            for(var k=0; k<selected_items.length; k++){
                var selected_pos = selected_items[k]
                var option_prices = options[i]['options'][selected_pos]['price']
                option_prices.forEach(price => {
                    if(price_obj[price['id']] == null){
                        price_obj[price['id']] = bigInt(0)
                    }
                    price_obj[price['id']] = bigInt(price_obj[price['id']]).plus(price['amount'])
                });
            } 
        }

        var return_array = []
        for (const exchange in price_obj) {
            if (price_obj.hasOwnProperty(exchange)) {
                return_array.push({'id':exchange, 'amount':price_obj[exchange]})
            }
        }

        if(return_array.length == 0){
            return_array.push({'id':5, 'amount':bigInt(0)})
        }

        return return_array
    }











    set_object(item){
        if(this.state.storefront_item['id'] != item['id']){
            this.setState({
                selected: 0, storefront_item:{}, id:makeid(8), direct_purchase_tags_object: this.get_direct_purchase_tags_object(),  type:this.props.app_state.loc['1093']/* 'direct-purchase' */, entered_indexing_tags:[this.props.app_state.loc['1094']/* 'direct' */, this.props.app_state.loc['1095']/* 'purchase' */, this.props.app_state.loc['1096']/* 'buy' */], purchase_unit_count:1, selected_variant:null
            })
        }
        this.setState({storefront_item: item, e5: item['e5']})
        this.set_up_option_groups(item)
    }



    finish_creating_direct_purchase_item(){
        if(this.state.selected_variant == null){
            this.props.notify(this.props.app_state.loc['1109']/* 'Pick one variant first.' */, 3500)
        }
        else if(this.state.purchase_unit_count == 0){
            this.props.notify(this.props.app_state.loc['1110']/* 'Please specify an amount of the item your adding.' */, 5200)
        }
        else if(this.state.purchase_unit_count > this.get_variant_supply()){
            this.props.notify(this.props.app_state.loc['1111']/* 'The most you can add is ' */+this.format_account_balance_figure(this.get_variant_supply())+' '+this.get_composition_type(), 5000)
        }
        else if(this.state.fulfilment_location.trim() == ''){
            this.props.notify(this.props.app_state.loc['1112']/* 'Please specify a shipping adress.' */, 4200)
        }
        else if(!this.can_afford_purchase()){
            this.props.notify(this.props.app_state.loc['1113']/* 'Your balance is insufficient to fulfil that direct purchase.' */, 5900)
        }
        else{
            this.props.add_direct_purchase_to_stack(this.state)
            this.add_fulfilment_location_to_local_storage()
            // this.setState({purchase_unit_count:1, selected_variant:null, fulfilment_location:'', custom_specifications:''})
            this.props.notify(this.props.app_state.loc['18']/* 'Transaction added to Stack' */, 1700)
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

    fulfilment_location_includes(array, item){
        var includes = false
        array.forEach(element => {
            if(element['text'] == item['text']){
                includes = true
            }
        });

        return includes
    }

    get_composition_type(){
        var object = this.state.storefront_item
        var composition_type = object['ipfs'].composition_type == null ? this.props.app_state.loc['1114']/* 'items' */ : this.get_selected_item(object['ipfs'].composition_type, 'e')

        return composition_type
    }


    can_afford_purchase(){
        var object = this.state.storefront_item
        var items = [].concat(this.state.selected_variant['price_data'])
        var items2 = [].concat(object['ipfs'].shipping_price_data)
        var price_data = {}
        var exchanges_to_check = []
        items.forEach(item => {
            if(price_data[item['id']] == null){
               price_data[item['id']] = 0 
            }
            var amount = this.get_amounts_to_be_paid(bigInt(item['amount']))
            price_data[item['id']] = bigInt(price_data[item['id']]).add(amount)
            if(!exchanges_to_check.includes(item['id'])){
                exchanges_to_check.push(item['id'])
            }
        });

        items2.forEach(item => {
            if(price_data[item['id']] == null){
               price_data[item['id']] = 0 
            }
            price_data[item['id']] = bigInt(price_data[item['id']]).add(bigInt(item['amount']))
            if(!exchanges_to_check.includes(item['id'])){
                exchanges_to_check.push(item['id'])
            }
        });

        if(object['ipfs'] != null && object['ipfs'].option_groups != null && object['ipfs'].option_groups.length > 0){
            var items3 = this.get_final_purchase_option_fees(object['ipfs'].option_groups)
            items3.forEach(item => {
                if(price_data[item['id']] == null){
                    price_data[item['id']] = 0 
                }
                price_data[item['id']] = bigInt(price_data[item['id']]).add(bigInt(item['amount']))
                if(!exchanges_to_check.includes(item['id'])){
                    exchanges_to_check.push(item['id'])
                }
            });
        }
        

        var can_afford = true;
        for(var i=0; i<exchanges_to_check.length; i++){
            var item = exchanges_to_check[i]
            var item_price = price_data[item]
            // var token_balance = this.props.app_state.created_token_object_mapping[this.state.e5][item]
            // token_balance = token_balance == null ? 0 : token_balance['balance']
            var token_balance = this.props.calculate_actual_balance(this.state.e5, item)
            token_balance = bigInt(token_balance).minus(this.get_debit_balance_in_stack(item, this.state.e5))

            if(bigInt(token_balance).lesser(bigInt(item_price))){
                can_afford = false
            }
        }

        return can_afford
    }

    get_debit_balance_in_stack(token_id, e5){
        var txs = this.props.app_state.stack_items
        var total_amount = bigInt(0)
        for(var i=0; i<txs.length; i++){
            var t = txs[i]
            if(txs[i].e5 == e5){
                if(txs[i].type == this.props.app_state.loc['946']/* 'buy-sell' */){
                    var amount = bigInt(txs[i].amount)
                    var exchange = t.token_item['id']
                    var action = this.get_action(t)
                    if(token_id == exchange && action == 1){
                        total_amount = bigInt(total_amount).add(amount)
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['1018']/* 'transfer' */){
                    if(txs[i].token_item['id'] == token_id){
                        total_amount = bigInt(total_amount).add(txs[i].debit_balance)
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['1499']/* 'direct-purchase' */){
                    for(var i=0; i<t.selected_variant['price_data'].length; i++){
                        var exchange = t.selected_variant['price_data'][i]['id']
                        var amount = this.get_amounts_to_be_paid2(t.selected_variant['price_data'][i]['amount'], t.purchase_unit_count)
                        if(exchange == token_id){
                            total_amount = bigInt(total_amount).add(amount)
                        }
                    }
                    for(var i=0; i<t.storefront_item['ipfs'].shipping_price_data.length; i++){
                        var exchange = t.storefront_item['ipfs'].shipping_price_data[i]['id']
                        var amount = this.get_amounts_to_be_paid2(t.storefront_item['ipfs'].shipping_price_data[i]['amount'], t.purchase_unit_count)
                        if(exchange == token_id){
                            total_amount = bigInt(total_amount).add(amount)
                        }
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['1155']/* 'award' */){
                    if(token_id == 5){
                        total_amount = bigInt(total_amount).add(t.award_amount)
                    }
                    for(var i=0; i<t.price_data.length; i++){
                        var exchange = t.price_data[i]['id']
                        var amount = t.price_data[i]['amount']
                        if(exchange == token_id){
                            total_amount = bigInt(total_amount).add(amount)
                        }
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['1509']/* 'mail-messages' */ || this.props.app_state.loc['1511']/* 'post-messages' */ || this.props.app_state.loc['1512']/* 'job-response' */ || this.props.app_state.loc['1514']/* 'job-messages' */ || this.props.app_state.loc['1515']/* 'proposal-messages' */ || this.props.app_state.loc['1501']/* 'bag-messages' */ || this.props.app_state.loc['1505']/* 'job-request-messages' */){
                    for(var i=0; i<t.messages_to_deliver.length; i++){
                        if(t.messages_to_deliver[i]['award_amount'] != 0 && t.messages_to_deliver[i]['award_receiver'] != null){
                            total_amount = bigInt(total_amount).add(t.messages_to_deliver[i]['award_amount'])
                        }
                    } 
                }
                // else if(txs[i].type == this.props.app_state.loc['946']/* 'buy-sell' */){
                //     var buy_tokens = t.token_item['data'][3]
                //     var required_amounts = this.calculate_token_prices(t, t.token_item['data'][4])
                //     var action = this.get_action(t)
                //     for(var i=0; i<buy_tokens.length; i++){
                //         var buy_token_id = buy_tokens[i]
                //         if(buy_token_id == token_id && action == 1){
                //             var required_amount = required_amounts[i]
                //             total_amount = bigInt(total_amount).add(required_amount)
                //         }
                //     }
                // }
                // else if(txs[i].type == this.props.app_state.loc['1']/* 'enter-contract' */){
                //     var entry_tokens = t.contract_item['data'][2]
                //     var entry_amounts = t.contract_item['data'][3]
                //     for(var i=0; i<entry_tokens.length; i++){
                //         var entry_token_id = entry_tokens[i]
                //         if(entry_token_id == token_id){
                //             var required_amount = entry_amounts[i]
                //             total_amount = bigInt(total_amount).add(required_amount)
                //         }
                //     }
                // }
                // else if(txs[i].type == this.props.app_state.loc['312']/* 'proposal' */){
                //     for(var i = 0; i<t.bounty_values.length; i++){
                //         if(t.bounty_values[i]['exchange'] == token_id){
                //             var required_amount = t.bounty_values[i]['amount']
                //             total_amount = bigInt(total_amount).add(required_amount)
                //         }
                //     }
                // }
                // else if(txs[i].type == this.props.app_state.loc['862']/* 'pay-subscription' */){
                //     var entry_tokens = this.state.subscription_item['data'][2]
                //     var entry_fees = this.state.subscription_item['data'][3]
                //     for(var i=0; i<entry_tokens.length; i++){
                //         if(token_id == entry_tokens[i]){
                //             var required_amount = this.calculate_final_amount(entry_fees[i], t)
                //             total_amount = bigInt(total_amount).add(required_amount)
                //         }
                //     }
                // }
                // else if(txs[i].type == this.props.app_state.loc['2896']/* 'upcoming-subscriptions' */){
                //     var exchanges_used = t.data.exchanges_used
                //     var exchange_amounts = t.data.exchange_amounts
                //     for(var i=0; i<exchanges_used.length; i++){
                //         if(token_id == exchanges_used[i]){
                //             var required_amount = exchange_amounts[token_id]
                //             total_amount = bigInt(total_amount).add(required_amount)
                //         }
                //     }
                // }
            }
        }
        return total_amount
    }

    get_action(t){
      var action = this.get_selected_item(t.new_mint_dump_action_page_tags_object, 'e')
      var stack_action = 1
      if(action == this.props.app_state.loc['949']/* 'mint-buy' */) stack_action = 0
      return stack_action
    }

    get_amounts_to_be_paid2(amount, count){
        return bigInt(amount).multiply(bigInt(count))
    }






    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var uploaded_data = {}
        if(item_id == '8' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12')uploaded_data = this.props.app_state.uploaded_data
        return(
            <div>
                <ViewGroups uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} show_images={this.props.show_images.bind(this)} />
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




export default DirectPurchasetPage;