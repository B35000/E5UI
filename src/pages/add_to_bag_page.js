import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import TextInput from './../components/text_input';
import NumberPicker from './../components/number_picker';

import Letter from './../assets/letter.png';
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
        purchase_unit_count:1, selected_variant:null
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
                    <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                        <Tags page_tags_object={this.state.add_to_bag_tags_object} tag_size={'l'} when_tags_updated={this.when_add_to_bag_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'padding': '5px'}} onClick={()=>this.finish_creating_bag_item()}>
                            {this.render_detail_item('5', {'text':this.props.app_state.loc['4']/* 'Finish' */, 'action':''})}
                        </div>
                        
                    </div>
                </div>

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


    render_everything(){
        var object = this.state.storefront_item

        if(object['ipfs'] != null){
            var composition_type = object['ipfs'].composition_type == null ? this.props.app_state.loc['1047']/* 'items' */ : this.get_selected_item(object['ipfs'].composition_type, 'e')

            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1048']/* 'Item Variants' */, 'details':this.props.app_state.loc['1049']/* 'Pick the variant you want to purchase' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_item_variants()}

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1050']/* 'Amount in ' */+composition_type, 'subtitle':this.format_power_figure(this.state.purchase_unit_count), 'barwidth':this.calculate_bar_width(this.state.purchase_unit_count), 'number':this.format_account_balance_figure(this.state.purchase_unit_count), 'barcolor':'', 'relativepower':composition_type, })}
                    </div>

                    <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_purchase_unit_count.bind(this)} theme={this.props.theme} power_limit={23}/>
                    <div style={{height:10}}/>

                    {this.render_set_storefront_prices_list_part()}
                    <div style={{height:20}}/>
                </div>
            )
        }
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
                                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
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
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 7px 0px', width: '97%', 'background-color': 'transparent'}}>
                {/* <SwipeableViews index={0}>
                    {items.map((item, index) => (
                        <div style={{'margin': '5px 5px 5px 5px'}} onClick={()=> this.when_variant_item_clicked(item)} >
                            {this.render_variant_item_if_selected(item)}
                        </div>
                    ))}
                </SwipeableViews> */}

                <ul style={{'list-style': 'none', 'padding': '0px 0px 5px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none', width: '90%'}} onClick={()=> this.when_variant_item_clicked(item)} >
                                {this.render_variant_item_if_selected(item)}
                            </li>
                        ))}
                    </ul>
            </div>
        )
    }

    when_variant_item_clicked(item){
        if(this.selected_variant == item){
            this.setState({selected_variant: null})
        }else{
            this.setState({selected_variant: item, purchase_unit_count:0})
        }
        
    }

    render_variant_item_if_selected(item){
        if(this.state.selected_variant == item){
            return(
                <div>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 0px 5px','border-radius': '13px' }}>
                        {this.render_detail_item('4', {'text':item['variant_description'], 'textsize':'13px', 'font':'Sans-serif'})}
                        <div style={{height:3}}/>
                        <div style={{padding:'0px 0px 0px 10px'}}>
                            {this.render_detail_item('9', item['image_data']['data'])}
                        </div>
                        <div style={{height:5}}/>
                        {this.render_detail_item('3', {'title':this.format_account_balance_figure(item['available_unit_count']), 'details':this.props.app_state.loc['1053']/* 'Number of Units' */, 'size':'l'})}
                        <div style={{height:15}}/>
                        {this.render_variant_price_data(item)}

                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                        <div style={{height:1}}/>
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 0px 5px','border-radius': '13px' }}>
                        {this.render_detail_item('4', {'text':item['variant_description'], 'textsize':'13px', 'font':'Sans-serif'})}
                        <div style={{height:3}}/>
                        <div style={{padding:'0px 0px 0px 10px'}}>
                            {this.render_detail_item('9', item['image_data']['data'])}
                        </div>
                        <div style={{height:5}}/>
                        {this.render_detail_item('3', {'title':this.format_account_balance_figure(item['available_unit_count']), 'details':this.props.app_state.loc['1053']/* 'Number of Units' */, 'size':'l'})}
                        <div style={{height:15}}/>
                        {this.render_variant_price_data(item)}
                    </div>
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
                        {this.render_detail_item('2', { 'style':'s', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                    </li>
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
            this.props.notify(this.props.app_state.loc['1056']/* 'Pick one variant first.' */, 1500)
        }
        else if(this.state.purchase_unit_count == 0){
            this.props.notify(this.props.app_state.loc['1057']/* 'Please specify an amount of the item your adding.' */, 2400)
        }
        else if(this.state.purchase_unit_count > this.get_variant_supply()){
            this.props.notify(this.props.app_state.loc['1055']/* 'The most you can add is ' */+this.format_account_balance_figure(this.get_variant_supply())+' '+this.get_composition_type())
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
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} show_images={this.props.show_images.bind(this)} />
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