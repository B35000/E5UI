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
import LocationViewer from './../components/location_viewer';

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

class ViewObjectLocations extends Component {
    
    state = {
        selected: 0, pins:[], my_location: null,
    };

    constructor(props) {
        super(props);
        this.locationPickerRef = React.createRef();
    }

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
                    {this.render_set_pins()}
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
                        {this.render_set_long_pins()}
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
                        {this.render_set_long_pins()}
                    </div>
                </div>
            )
        }
    }

    render_map(){
        const pins = this.state.pins
        const minus = this.props.app_state.os == 'iOS' ? 110 : 160;
        const location_height = this.props.size == 's' ? this.props.height - 200 : this.props.height - minus
        return(
            <div>
                <LocationViewer ref={this.locationPickerRef} height={location_height} theme={this.props.theme['map_theme']} center={this.get_default_center()} pins={pins} size={this.props.size} input_enabled={true} my_location={this.state.my_location}
                />
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

    render_set_long_pins(){
        var items = [].concat(this.state.pins)
        return(
            <div>
                <div onClick={() => this.setState({pins: items.slice()})}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3089']/* 'Specified Locations.' */, 'details':this.props.app_state.loc['3090']/* 'Below are the locations that were set.' */, 'size':'l'})}
                </div>
                <div style={{height:10}}/>
                {items.map((item, index) => (
                    <div style={{'margin': '2px 0px 2px 0px'}}>
                        {this.render_pin_item(item)}
                    </div>
                ))}
                <div style={{height:10}}/>
                {this.render_empty_views(2)}
            </div>
        )
    }

    render_set_pins(){
        var items = [].concat(this.state.pins)
        return(
            <div>
                <div onClick={() => this.setState({pins: items.slice()})}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3089']/* 'Specified Locations.' */, 'details':this.props.app_state.loc['3090']/* 'Below are the locations that were set.' */, 'size':'l'})}
                </div>
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
        const details = item['description'] == '' ? this.props.app_state.loc['284q']/* 'latitude: $, longitude: %' */.replace('$', item['lat']).replace('%', item['lng']) : item['description']
        return(
            <div onClick={() => this.when_pin_item_clicked(item)}>
                {this.render_detail_item('3', {'title':title, 'details':details, 'size':'s'})}
            </div>
        )
    }

    when_pin_item_clicked(item){
        const location_data = { lat: item['lat'], lon: item['lng'] }
        this.locationPickerRef.current?.set_center(location_data);
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




export default ViewObjectLocations;