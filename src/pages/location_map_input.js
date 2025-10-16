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
import LocationPicker from './../components/location_picker';

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

class LocationMapInput extends Component {
    
    state = {
        selected: 0, page:null,
        device_city:'', pin_description:'',
        pins:[], my_location: null, /* {lat: -1.281166, lon: 36.815252 }, */
    };

    set_data(current_pins){
        this.setState({pins: current_pins})
        var me = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const location_data = { lat: latitude, lon: longitude }
                    console.log('position found: ', location_data)
                    setTimeout(function() {
                        me.locationPickerRef.current?.set_center(location_data);
                    }, (2 * 1000));
                    this.setState({my_location: location_data})
                },
                (error) => {
                    console.error('Error getting location:', error);
                    console.log('location_map_input','Unable to get your location. Please check permissions.');
                }
            );
        } else {
            console.log('location_map_input','Geolocation is not supported by your browser.');
        }
    }

    render(){
        return(
            <div>
                {this.render_everything()}
            </div>
        )
    }



    render_everything(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div style={{'width':'99%', 'padding': '20px 20px 0px 20px'}}>
                    {this.render_map()}
                    <div style={{height:15}}/>
                    {this.render_cities()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'width':'99%'}}>
                    <div className="col-6" style={{'padding': '20px 10px 0px 30px'}}>
                        {this.render_map()}
                    </div>
                    <div className="col-6" style={{'padding': '20px 10px 0px 20px'}}>
                        {this.render_cities()}
                    </div>
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row" style={{'width':'99%'}}>
                    <div className="col-7" style={{'padding': '20px 10px 0px 30px'}}>
                        {this.render_map()}
                    </div>
                    <div className="col-5" style={{'padding': '20px 10px 0px 20px'}}>
                        {this.render_cities()}
                    </div>
                </div>
            )
        }
    }

    render_cities(){
        return(
            <div style={{'padding':'0px 0px 0px 0px'}}>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['284d']/* 'Seek City.' */, 'details':this.props.app_state.loc['284e']/* 'You can quickly pan the map to the location of your searched and selected city.' */, 'size':'l'})}
                <div style={{height:10}}/>

                <TextInput height={30} placeholder={this.props.app_state.loc['a311bp']/* 'Enter City...' */} when_text_input_field_changed={this.when_device_city_input_field_changed.bind(this)} text={this.state.device_city} theme={this.props.theme}/>
                
                <div style={{height:5}}/>
                {this.render_detail_item('1',{'active_tags':this.get_cities_from_typed_text(), 'indexed_option':'indexed', 'when_tapped':'when_city_selected'})}


                {this.render_detail_item('0')}

                
                {this.render_detail_item('3', {'title':this.props.app_state.loc['284f']/* 'Pin Description.' */, 'details':this.props.app_state.loc['284g']/* 'You can specify a description for your pin.' */, 'size':'l'})}
                <div style={{height:10}}/>

                <TextInput height={60} placeholder={this.props.app_state.loc['284h']/* 'Enter Description...' */} when_text_input_field_changed={this.when_pin_description_input_field_changed.bind(this)} text={this.state.pin_description} theme={this.props.theme}/>
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']+(this.props.app_state.pin_description_size - this.state.pin_description.length)})}

                <div style={{height:10}}/>
                <div onClick={()=> this.add_pin()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['284k']/* Add Pin */, 'action':''})}
                </div>

                <div style={{height:10}}/>
                {this.render_set_pins()}


                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['284m']/* 'Set Pins.' */, 'details':this.props.app_state.loc['284n']/* 'Set the specified pins and descriptions in your specified object.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div onClick={()=> this.return_pins()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['284m']/* Set Pins. */, 'action':''})}
                </div>
            </div>
        )
    }

    when_device_city_input_field_changed(text){
        this.setState({device_city: text.toLowerCase()})
    }

    when_pin_description_input_field_changed(text){
        this.setState({pin_description: text})
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
        if(tag != 'e'){
            const my_city = tag
            var all_cities = this.props.app_state.all_cities
            var specific_cities_objects = all_cities.filter(function (el) {
                return (el['city'].startsWith(my_city) || el['city'] == my_city)
            });

            let location_data;
            if(specific_cities_objects.length > 0){
                var city_obj = specific_cities_objects[0];
                location_data = { lat: city_obj['lat'], lon: city_obj['lon'] }
            }
            else{
                location_data = { lat: 51.505, lon: -0.09 }
            }
            
            this.locationPickerRef.current?.set_center(location_data);
        } 
    }

    add_pin(){
        const pin_description = this.state.pin_description.trim()
        const center = this.locationPickerRef.current?.get_center();

        if(pin_description.length > this.props.app_state.pin_description_size){
            this.props.notify(this.props.app_state.loc['284i']/* 'That description is too long.' */, 4000)
        }
        else if(this.does_pin_exist(center)){
            this.props.notify(this.props.app_state.loc['284j']/* 'You already have a pin there.' */, 3000)
        }
        else if(this.does_pin_description_exist(pin_description)){
            this.props.notify(this.props.app_state.loc['284l']/* 'You already have a pin with that description.' */, 5000)
        }
        else{
            const pins_clone = this.state.pins.slice()
            pins_clone.push({lat:center.lat, lng: center.lng, description: pin_description, id: makeid(3)})
            this.setState({pins: pins_clone, pin_description: ''})
        }
    }

    does_pin_exist(center){
        var exists = false;
        this.state.pins.forEach(pin => {
            if(pin['lat'] == center.lat && pin['lng'] == center.lng){
                exists = true
            }
        });
        return exists
    }

    does_pin_description_exist(description){
        var exists = false;
        this.state.pins.forEach(pin => {
            if(description == pin['description']){
                exists = true
            }
        });
        return exists
    }


    render_set_pins(){
        var items = [].concat(this.state.pins)
        if(items == 0){
            items = [1, 2, 3]
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_empty_horizontal_list_item2()}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.reverse().map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_pin_item(item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
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

    render_pin_item(item){
        const title = item['id']
        const details = this.truncate(item['description'], 17)
        return(
            <div onClick={() => this.when_pin_tapped(item)}>
                {this.render_detail_item('3', {'title':title, 'details':details, 'size':'s'})}
            </div>
        )
    }

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }
    
    when_pin_tapped(item){
        const pins_clone = this.state.pins.slice()
        const index = pins_clone.indexOf(item)
        if(index != -1){
            pins_clone.splice(index, 1)
            this.setState({pins: pins_clone})
        }
    }

    return_pins(){
        const pins = this.state.pins

        if(pins.length == 0){
            this.props.notify(this.props.app_state.loc['284o']/* 'You need to pin some locations first.' */, 2300)
        }
        else{
            this.props.return_pins(pins, this.state.page)
        }
    }






    constructor(props) {
        super(props);
        this.locationPickerRef = React.createRef();
    }

    render_map(){
        const minus = this.props.app_state.os == 'iOS' ? 110 : 160;
        const location_height = this.props.size == 's' ? this.props.height * 0.37 : this.props.height - minus
        return(
            <div>
                <div style={{}}>
                    <LocationPicker ref={this.locationPickerRef} height={location_height} theme={this.props.theme['map_theme']} center={this.get_default_center()} pins={this.state.pins} size={this.props.size} my_location={this.state.my_location}
                    />
                </div>
            </div>
        )
    }

    get_default_center(){
        const my_city = this.props.app_state.device_city.toLowerCase()
        var all_cities = this.props.app_state.all_cities
        var specific_cities_objects = all_cities.filter(function (el) {
            return (el['city'].startsWith(my_city) || el['city'] == my_city)
        });

        if(specific_cities_objects.length > 0){
            var city_obj = specific_cities_objects[0];
            return { lat: city_obj['lat'], lon: city_obj['lon'] }
        }
        else{
            return { lat: 51.505, lon: -0.09 }
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

    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} when_city_selected={this.when_city_selected.bind(this)}
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

}




export default LocationMapInput;