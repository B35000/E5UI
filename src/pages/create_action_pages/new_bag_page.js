// Copyright (c) 2023 - Present, Bry Onyoni
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
import ViewGroups from '../../components/view_groups';
import Tags from '../../components/tags';
import TextInput from '../../components/text_input';
import NumberPicker from '../../components/number_picker';
import DurationPicker from '../../components/duration_picker';
import Slider from '../../components/slider'
import MySwipeableViews from '../../components/my_swipeable_views';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Draggable } from "react-drag-reorder";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import imageCompression from 'browser-image-compression';

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

class NewBagPage extends Component {
    
    state = {
        selected: 0, id: makeid(8), type: this.props.app_state.loc['1516']/* 'storefront-bag' */, entered_indexing_tags:[this.props.app_state.loc['1215']/* 'storefront' */, this.props.app_state.loc['1045']/* 'bag' */, this.props.app_state.loc['2716']/* 'cart' */], items_to_deliver:[], get_new_bag_tags_object:this.get_new_bag_tags_object(),
        
        content_channeling_setting: this.props.app_state.content_channeling, 
        device_language_setting: this.props.app_state.device_language, 
        device_country: this.props.app_state.device_country,
        
        my_country: this.props.app_state.obligation_subscriptions[this.props.app_state.accounts[this.props.app_state.selected_e5].address] != null ? this.props.app_state.obligation_subscriptions[this.props.app_state.accounts[this.props.app_state.selected_e5].address].my_original_country : this.props.app_state.device_country,

        my_city: this.props.app_state.obligation_subscriptions[this.props.app_state.accounts[this.props.app_state.selected_e5].address] != null ? this.props.app_state.obligation_subscriptions[this.props.app_state.accounts[this.props.app_state.selected_e5].address].my_original_city : this.props.app_state.device_city,
        
        bag_name: '', bag_description:'', device_city: '', selected_device_city:'', delivery_location:'', get_frequency_bag_object: this.get_frequency_bag_object(), delivery_frequency_time:0, pins:[], get_delete_after_broadcast_object: this.get_delete_after_broadcast_object()
    };

    get_new_bag_tags_object(){
        return{
            'i':{
                active:'e',
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['3114']/* 'new-bag' */], [1]
            ],
        };
    }

    get_frequency_bag_object(){
        return{
            'i':{
                active:'e',
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['1058o']/* 'enabled' */], [0]
            ],
        };
    }

    get_delete_after_broadcast_object(){
        return{
            'i':{
                active:'e',
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['1058o']/* 'enabled' */], [0]
            ],
        };
    }



    set_data(object){
        this.setState({e5: object['e5']})
    }

    componentDidMount(){
        this.get_fulfilment_location_from_local_storage()
    }

    get_fulfilment_location_from_local_storage = async () => {
        var location_data = await this.props.get_local_storage_data_if_enabled("delivery");
        if(location_data != null) this.setState({default_location_data: location_data})
    }



    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.get_new_bag_tags_object} tag_size={'l'} when_tags_updated={this.when_get_new_bag_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img alt="" className="text-end" onClick={()=>this.finish_creating_bag_item()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div>
                {this.render_everything()}
            </div>
        )
    }

    when_get_new_bag_tags_object_updated(tag_obj){
        this.setState({get_new_bag_tags_object: tag_obj})
    }






    render_everything(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_create_new_bag_dialog_data()}
                    {this.render_detail_item('0')}
                    {this.render_create_new_bag_dialog_data2()}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_create_new_bag_dialog_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_create_new_bag_dialog_data2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_create_new_bag_dialog_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_create_new_bag_dialog_data2()}
                    </div>
                </div>
            )
        }
    }



    render_create_new_bag_dialog_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055th']/* New Bag. */, 'details':this.props.app_state.loc['3055ti']/* 'Create a new Bag with the required details below.' */, 'size':'l',})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3055tj']/* 'Bag Name.' */, 'details':this.props.app_state.loc['3055tk']/* 'A short name for your new bag for internal reference.' */, 'size':'l'})}
                
                <div style={{height:10}}/>
                <TextInput height={30} placeholder={this.props.app_state.loc['3055tl']/* 'Name...' */} when_text_input_field_changed={this.when_bag_name_input_field_changed.bind(this)} text={this.state.bag_name} theme={this.props.theme}/>
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']+(this.props.app_state.bag_name_max_length - this.state.bag_name.length)})}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3114i']/* 'Bag Name.' */, 'details':this.props.app_state.loc['3114j']/* 'A description for your bag and what it is for.' */, 'size':'l'})}
                <div style={{height:10}}/>

                <TextInput height={30} placeholder={this.props.app_state.loc['3055tl']/* 'Name...' */} when_text_input_field_changed={this.when_bag_description_input_field_changed.bind(this)} text={this.state.bag_description} theme={this.props.theme}/>
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']+(this.props.app_state.title_size - this.state.bag_description.length)})}



                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1058a']/* 'Bag City.' */, 'details':this.props.app_state.loc['1058b']/* 'You may specify your location city for contractors.' */, 'size':'l'})}
                <div style={{height:10}}/>

                <TextInput height={30} placeholder={this.props.app_state.loc['a311bp']/* 'Enter City...' */} when_text_input_field_changed={this.when_device_city_input_field_changed.bind(this)} text={this.state.device_city} theme={this.props.theme}/>
                
                <div style={{height:5}}/>
                {this.render_detail_item('1',{'active_tags':this.get_cities_from_typed_text(), 'indexed_option':'indexed', 'when_tapped':'when_city_selected'})}
                
                <div style={{height:10}}/>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'14px','text':this.state.selected_device_city})}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1058d']/* 'Delivery Location' */, 'details':this.props.app_state.loc['1058e']/* 'You\'ll need to specify a delivery location for your bag.' */, 'size':'l'})}
                <div style={{height:10}}/>

                <TextInput height={60} placeholder={this.props.app_state.loc['1058d']/* 'Delivery Location' */} when_text_input_field_changed={this.when_delivery_location_input_field_changed.bind(this)} text={this.state.delivery_location} theme={this.props.theme}/>
                
                {this.render_button_if_location_exists()}

                <div style={{height:20}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1058d']/* 'Specify On Map' */, 'details':this.props.app_state.loc['1058z']/* 'You can also specify a delivery address using a map or from you saved pins.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        <div onClick={()=> this.props.show_set_map_location(this.state.pins)}>
                            {this.render_detail_item('5', {'text':this.props.app_state.loc['284c']/* Add Location. */, 'action':''})}
                        </div>
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        <div onClick={()=> this.props.show_dialog_bottomsheet({'pins':this.state.pins}, 'pick_from_my_locations')}>
                            {this.render_detail_item('5', {'text':this.props.app_state.loc['535bk']/* Add From Saved */, 'action':''})}
                        </div>
                    </div>
                </div>
                <div style={{height:10}}/>
                {this.render_selected_pins()}
            </div>
        )
    }

    render_create_new_bag_dialog_data2(){
        const is_bag_frequency_enabled = this.get_selected_item(this.state.get_frequency_bag_object, 'e') == this.props.app_state.loc['1058o']/* 'enabled' */
        const opacity = is_bag_frequency_enabled == true ? 1.0 : 0.5
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1058p']/* 'Frequency Bag.' */, 'details':this.props.app_state.loc['1058q']/* 'If set to enabled, you will be requiring the contractor to deliver the items in your new bag cyclically.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_frequency_bag_object} tag_size={'l'} when_tags_updated={this.when_get_frequency_bag_object_updated.bind(this)} theme={this.props.theme}/>
                
                {this.render_detail_item('0')}

                <div style={{opacity: opacity}}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1058r']/* 'Delivery Frequency Duration.' */, 'details':this.props.app_state.loc['1058s']/* 'If frequency bag is enabled, you are required to set the frequency period for the delivery of your bag items.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    
                    {this.render_detail_item('3', {'title':this.get_time_diff(this.state.delivery_frequency_time), 'details':this.props.app_state.loc['1058u']/* 'Estimated time between deliveries.' */, 'size':'l'})}

                    <DurationPicker font={this.props.app_state.font} when_number_picker_value_changed={this.when_delivery_frequency_time_set.bind(this)} theme={this.props.theme} loc={this.props.app_state.loc}/>
                </div>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3114b']/* 'Delete After Broadcast.' */, 'details':this.props.app_state.loc['3114c']/* 'If enabled, the bag will be deleted after its broadcasting on the blockchain or the indexers.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_delete_after_broadcast_object} tag_size={'l'} when_tags_updated={this.when_get_delete_after_broadcast_object_updated.bind(this)} theme={this.props.theme}/>
            </div>
        )
    }

    when_bag_description_input_field_changed(text){
        this.setState({bag_description: text})
    }

    when_get_delete_after_broadcast_object_updated(tag_obj){
        this.setState({get_delete_after_broadcast_object: tag_obj})
    }

    when_bag_name_input_field_changed(text){
        this.setState({bag_name: text})
    }

    render_selected_pins(){
        var items = [].concat(this.state.pins)
        if(items.length == 0){
            items = [1, 2, 3]
            return(
                <div>
                    <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                        <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                            {items.map((item, index) => (
                                <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                    {this.render_empty_horizontal_list_item2()}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }
        return(
            <div>
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_pin_item(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    render_pin_item(item){
        const title = item['id']
        const details = item['description'] == '' ? this.props.app_state.loc['284q']/* 'latitude: $, longitude: %' */.replace('$', item['lat']).replace('%', item['lng']) : this.truncate(item['description'], 17)
        return(
            <div>
                {this.render_detail_item('3', {'title':title, 'details':details, 'size':'s'})}
            </div>
        )
    }

    set_pins(pins){
        this.setState({pins: pins})
    }

    when_get_frequency_bag_object_updated(tag_obj){
        this.setState({get_frequency_bag_object: tag_obj})
    }

    when_delivery_frequency_time_set(time){
        this.setState({delivery_frequency_time: time})
    }

    when_device_city_input_field_changed(text){
        this.setState({device_city: text.toLowerCase()})
    }

    when_delivery_location_input_field_changed(text){
        this.setState({delivery_location: text})
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

    render_button_if_location_exists(){
        var location = this.state.default_location_data
        if(location != null){
            location = location.replaceAll('"','')
            return(
                <div>
                    <div style={{height:10}}/>
                    {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'14px','text':location})}
                    <div style={{height:10}}/>

                    <div onClick={()=> this.setState({delivery_location: location})}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['1058h']/* 'Set Previous Location.' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }







    finish_creating_bag_item(){
        if(this.state.bag_name == ''){
            this.props.notify(this.props.app_state.loc['3114f']/* 'Your bag needs a name.' */, 4400)
        }
        else if(this.state.bag_description == ''){
            this.props.notify(this.props.app_state.loc['3114k']/* 'Your bag needs a public display decription.' */, 4400)
        }
        else if(this.state.bag_description.length > this.props.app_state.title_size){
            this.props.notify(this.props.app_state.loc['3114l']/* 'That bag description is too long.' */, 6400)
        }
        else if(this.does_bag_with_name_exist() == true){
            this.props.notify(this.props.app_state.loc['3114h']/* 'You cant use the same bag name twice.' */, 4400)
        }
        else if(this.state.bag_name.length > this.props.app_state.bag_name_max_length){
            this.props.notify(this.props.app_state.loc['3114g']/* 'That bag name is too long.' */, 6400)
        }
        else if(this.state.selected_device_city == ''){
            this.props.notify(this.props.app_state.loc['1058c']/* 'You need to set your city for contractors.' */, 6400)
        }
        else if(this.state.delivery_location == ''){
            this.props.notify(this.props.app_state.loc['1058g']/* 'You need to specify a pick up location for your new bag.' */, 6400)
        }
        else if(this.get_selected_item(this.state.get_frequency_bag_object, 'e') == this.props.app_state.loc['1058o']/* 'enabled' */ && this.state.delivery_frequency_time == 0){
            this.props.notify(this.props.app_state.loc['1058t']/* 'You need to specify a valid time frequency if frequency bag is enabled.' */, 6400)
        }
        else{
            if(this.state.delivery_location != ''){
                try{
                    this.add_fulfilment_location_to_local_storage(this.state.delivery_location)
                }catch(e){
                    console.log(e)
                }
            }
            this.props.create_new_bag_in_stack(this.state)
            this.props.notify(this.props.app_state.loc['3114a']/* 'Bag Created In Stack.' */, 700)
        }
    }

    add_fulfilment_location_to_local_storage(location){
        this.props.set_local_storage_data_if_enabled("delivery", JSON.stringify(location));
    }

    does_bag_with_name_exist(){
        const stack = this.props.app_state.stack_items;
        const existing = stack.find((tx) => {
            return (tx.type == this.props.app_state.loc['1516']/* 'storefront-bag' */ && tx['bag_name'] == this.state.bag_name)
        })
        return existing != null
    }








    render_empty_horizontal_list_item2(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div>
                <div style={{height:43, width:90, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                    </div>
                </div>
            </div>
        )
    }

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }

    render_empty_object(){
        var background_color = this.props.theme['card_background_color']
        return(
                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={this.props.app_state.theme['letter']} style={{height:60 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                </div>
            );
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
        if(item_id == '3' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12' || item_id == '13' || item_id == '14') uploaded_data = this.props.app_state.uploaded_data
        return(
            <div>
                <ViewGroups token_name_thumbnail_directory={this.props.app_state?.token_name_thumbnail_directory} e5s={this.props.app_state?.e5s} uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} when_city_selected={this.when_city_selected.bind(this)}
                />
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
            var power = amount.toLocaleString('fullwide', {useGrouping:false}).length - 9
            return number_with_commas(amount.toLocaleString('fullwide', {useGrouping:false}).substring(0, 9)) +'e'+power
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
            var power = amount.toLocaleString('fullwide', {useGrouping:false}).length - 9
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
            var num = parseInt(diff)
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

    get_number_width(number){
        if(number == null) return '0%'
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
    }

}




export default NewBagPage;