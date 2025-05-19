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
import Slider from './slider'
import ViewGroups from './view_groups'
import TextInput from './text_input';
import e5_empty_icon from './../assets/e5empty_icon.png'
import e5_empty_icon3 from './../assets/e5empty_icon3.png'
var bigInt = require("big-integer");


function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}


String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}


class NumberPicker extends Component {
    
    state = {
        selected: 0,
        create_number_data: this.get_create_number_data(),
        is_picking_with_text_area: this.props.pick_with_text_area == null ? false : this.props.pick_with_text_area,
        entered_number:'', hint: this.props.text_area_hint == null ? '5.32' : this.props.text_area_hint
    };

    get_create_number_data(){
      return{
        'number': this.get_number_from_power_limit(),
        // 'power':0,
        'editpos':0,
        'powerlimit':this.get_power_limit(),
        'picked_powers':[],

        'power_editpos':0,
        'multi_digit_power': this.get_power_number(),
        'multi_digit_powers_power':0
      }
    }

    get_power_limit(){
      return this.props.power_limit 
    }

    get_number_from_power_limit(){
      var power_limit = this.get_power_limit()
      var num = power_limit+9
      return bgN(1,num).toString().substring(1,num)
    }

    get_power_number(){
      return bgN(1,1000).toString().substring(1,1000)
    }

    render(){
        return(
            <div>
                <div  style={{'margin':'25px 0px 0px 5px','padding': '0px 0px 5px 0px'}}>
                    {this.render_number_label_group()}
                    {this.render_sliders_or_textarea()}
                    <div style={{height: 10}}/>
                    <div className="row">
                        <div className="col-9" style={{'padding': '0px 0px 0px 10px'}}>
                          {this.render_detail_item('1', this.get_number_power_data())}
                        </div>
                        <div className="col-2" style={{'padding': '7px 0px 0px 0px'}}>
                          <div className="text-end" style={{'display': 'flex','flex-direction': 'row'}}>
                            <img alt="" src={e5_empty_icon/* 'https://nftstorage.link/ipfs/bafkreib7p2e5m437q3pi6necii3bssqc3eh2zcd2fcxnms7iwfdiyevh2e' */} style={{height:35 ,width:35}} onClick={()=>this.switch_pickers()}/>
                            
                            <div style={{width: 15}}/>

                            <img alt="" src={e5_empty_icon3/* 'https://nftstorage.link/ipfs/bafkreib7qp2bgl3xnlgflwmqh7lsb7cwgevlr4s2n5ti4v4wi4mcfzv424' */} style={{height:35 ,width:35}} onClick={()=>this.reset_number_picker2()} />
                          </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }

    reset_number_picker(){
      this.setState({create_number_data: this.get_create_number_data(), entered_number:''})
    }

    reset_number_picker2(){
      this.setState({create_number_data: this.get_create_number_data(), entered_number:''})
      this.props.when_number_picker_value_changed(bigInt('0'))
    }

    get_number_power_data(){
        return{ 'active_tags':this.format_powers(this.state.create_number_data['picked_powers']), 'index_option':'indexed', 'when_tapped': 'when_number_picker_power_tapped' }
    }

    format_powers(picked_powers){
        var new_array = []
        picked_powers.forEach(element => {
            new_array.push('e'+bigInt(element).toString())
        });
        return new_array
    }

    render_number_label_group(){
      var label_background_color = this.props.theme['number_picker_label_color']
      var label_shadow_color = this.props.theme['number_picker_label_shadow']
      var number_picker_power_color = this.props.theme['number_picker_power_color']
      var number_picker_power_shadow_color = this.props.theme['number_picker_power_shadow_color']
      
      if(this.props.number_limit < 1000){
        return(
          <div style={{'display': 'flex','flex-direction': 'row'}}>
            {this.render_number_label_item(label_background_color,label_shadow_color,0, this.format_digit_number_with_zeros(this.get_label_number_tripple_digit(0)), 65, this.get_text_color(0))}
          </div>
        );
      }else{
        return(
          <div style={{'display': 'flex','flex-direction': 'row'}}>
            {this.render_number_label_item(label_background_color,label_shadow_color,2, this.format_digit_number_with_zeros(this.get_label_number_tripple_digit(2)), 65, this.get_text_color(2))}
            <div style={{width:10}}/>
            {this.render_number_label_item(label_background_color,label_shadow_color,1, this.format_digit_number_with_zeros(this.get_label_number_tripple_digit(1)), 65, this.get_text_color(1))}
            <div style={{width:10}}/>
            {this.render_number_label_item(label_background_color,label_shadow_color,0, this.format_digit_number_with_zeros(this.get_label_number_tripple_digit(0)), 65, this.get_text_color(0))}
            <div style={{width:20}}/>
            
            {this.get_power_label_parts()}
          </div>
        );
      }
    }

    get_power_label_parts(){
      var label_background_color = this.props.theme['number_picker_label_color']
      var label_shadow_color = this.props.theme['number_picker_label_shadow']
      var number_picker_power_color = this.props.theme['number_picker_power_color']
      var number_picker_power_shadow_color = this.props.theme['number_picker_power_shadow_color']

      var power_limit = this.get_power_limit()
      if(bigInt(power_limit).lesser(1000)){
        return(
          <div>
            {this.render_power_label_item(number_picker_power_color,number_picker_power_shadow_color,0,(this.get_power_label_tripple_digits(0)), 60, this.get_power_text_color(0))}
          </div>
        )
      }else{
        return(
          <div style={{'display': 'flex','flex-direction': 'row'}}>
            {this.render_power_label_item(number_picker_power_color,number_picker_power_shadow_color,1,this.format_digit_number_with_zeros(this.get_power_label_tripple_digits(1)), 60, this.get_power_text_color(1))}
            <div style={{width:10}}/>

            {this.render_power_label_item(number_picker_power_color,number_picker_power_shadow_color,0,this.format_digit_number_with_zeros(this.get_power_label_tripple_digits(0)), 60, this.get_power_text_color(0))}
          </div>
        )
      }
    }

    render_number_label_item(background_color, shadow_color, pos, number, width, text_color){
      return(
        <button style={{ height: 40, width: width, 'background-color': background_color, 'border-radius': '10px', 'box-shadow': ('0px 0px 1px 1px '+shadow_color),'margin': '0px 0px 0px 0px', 'border': 'none','text-decoration': 'none' , 'padding':' 1px 5px 5px 5px' }} onClick={()=>this.when_number_label_item_tapped(pos)}>
            <p style={{'color': text_color, 'font-size': '26px', 'padding-top':' 0px', 'font-family': this.props.font}} >{number}</p>
        </button>
      );
    }

    render_power_label_item(background_color, shadow_color, pos, number, width, text_color){
      return(
        <button style={{ height: 40, width: width, 'background-color': background_color, 'border-radius': '10px', 'box-shadow': ('0px 0px 1px 1px '+shadow_color),'margin': '0px 0px 0px 0px', 'border': 'none','text-decoration': 'none' , 'padding':' 1px 5px 5px 5px' }} onClick={()=>this.when_power_label_item_tapped(pos)}>
            <p style={{'color': text_color, 'font-size': '26px', 'padding-top':' 0px', 'font-family': this.props.font}} >{number}</p>
        </button>
      );
    }





    render_sliders_or_textarea(){
      if(this.state.is_picking_with_text_area){
        return(
          <div>
            <div style={{height: 20}}/>
            <TextInput font={this.props.font} height={20} placeholder={this.state.hint} when_text_input_field_changed={this.when_text_input_field_changed.bind(this)} text={this.state.entered_number} theme={this.props.theme}/>
          </div>
        )
      }else{
        return(
          <div>
            {this.render_number_picker_sliders()}
          </div>
        )
      }
    }

    when_text_input_field_changed(text){
      var number_string = this.process_text_input(text)
      if(!isNaN(number_string)){
        if(this.props.number_limit != null && bigInt(number_string).greater(bigInt(this.props.number_limit))){

        }else{
          var new_obj = this.get_create_number_data()
          new_obj['number'] = this.get_power_number() + (bigInt(0).add(bigInt(number_string))).toString().toLocaleString('fullwide', {useGrouping:false});
          this.setState({create_number_data: new_obj, entered_number: text})
          this.props.when_number_picker_value_changed(bigInt(new_obj['number']))
        }
      }
    }

    process_text_input(text){
      if(/^-?\d+$/.test(text) == true){
        //its a number
        console.log('number_picker', 'its a number')
        var number = parseInt(text)
        if(number < 0){
          return '0'
        }
        return number.toString().toLocaleString('fullwide', {useGrouping:false})
      }
      else if(/^-?\d+(\.\d+)?$/.test(text) == true){
        //its a float
        console.log('number_picker', 'its a float', this.props.decimal_count)
        var number = parseFloat(text)
        if(number < 0){
          return '0'
        }
        var decimal_places = this.countDecimalPlaces(number)
        var default_decimal_count = this.props.decimal_count == null ? 0 : this.props.decimal_count
        var difference = default_decimal_count - decimal_places
        var number_string = number.toString().replace('.','')
        if(difference > 0){
          //decimals specified are less than default, so fill in extra places
          for(var i=0; i<difference; i++){
            number_string = number_string + '0'
          }
          return number_string
        }else{
          //decimals specified are less than default, so remove extra places
          return number_string.slice(0, difference)
        }
      }
      else if(text.endsWith('.') && text.split('.').length === 2){
        console.log('number_picker', 'its an incomplete float')
        return text.replace('.','')
      }
      else{
        console.log('number_picker', 'its not a number or float')
        return '0'
      }
    }

    countDecimalPlaces(num) {
      if (!isFinite(num)) return 0;
      const str = num.toString();
      if (str.includes(".")) {
        return str.split(".")[1].length;
      }
      return 0;
    }

    render_number_picker_sliders(){
      if(this.props.number_limit < 1000){
        return(
          <div style={{'margin':'20px 0px 0px 0px'}}>
            <div style={{height:'100%', width:'94%', 'margin':'7px 0px 0px 0px'}}>
                <Slider value={this.get_number_value()}  whenNumberChanged={(e)=>this.when_number_input_slider_changed(e)} unitIncrease={()=>this.when_number_slider_button_tapped()} unitDecrease={()=>this.when_number_slider_button_double_tapped()} theme={this.props.theme}/>
            </div>
          </div>
        )
      }else{
        return(
          <div style={{'margin':'20px 0px 0px 0px'}}>
            <div style={{height:'100%', width:'94%', 'margin':'7px 0px 0px 0px'}}>
                <Slider value={this.get_number_value()}  whenNumberChanged={(e)=>this.when_number_input_slider_changed(e)} unitIncrease={()=>this.when_number_slider_button_tapped()} unitDecrease={()=>this.when_number_slider_button_double_tapped()} theme={this.props.theme}/>
            </div>
            <div style={{height:'100%', width:'94%', 'margin':'10px 0px 0px 0px'}}>
                <Slider value={this.get_power_value()}  whenNumberChanged={(e)=>this.when_power_input_slider_changed(e)} unitIncrease={()=>this.when_power_slider_button_tapped()} unitDecrease={()=>this.when_power_slider_button_double_tapped()} theme={this.props.theme}/>
            </div>
          </div>
        )
      }
    }

    when_number_input_slider_changed(number){
      var pos = ((this.state.create_number_data['number'].length) - this.get_power()) - (this.state.create_number_data['editpos'] * 3) - 3;
      var current_number = this.state.create_number_data['number']+'';
      var new_number_digits = this.format_digit_number_with_zeros(number.target.value);

      var new_number = current_number.replaceAt(pos, new_number_digits);
      
      var clone = {};
      var page_data = this.state.create_number_data;
      for (var key in page_data) {/* clone the existing created object data object */
          if (page_data.hasOwnProperty(key)) {
              clone[key] = page_data[key];
          }
      }
      clone['number'] = new_number;
      
      if(bigInt(new_number).lesserOrEquals(this.props.number_limit)){
        if(!clone['picked_powers'].includes(this.state.create_number_data['multi_digit_power'])){
          clone['picked_powers'].push(this.state.create_number_data['multi_digit_power']);
        }
        this.setState({create_number_data: clone})
        this.props.when_number_picker_value_changed(bigInt(new_number))
      }
      
    }

    when_power_input_slider_changed(number){
      var clone = {};
      var page_data = this.state.create_number_data;
      for (var key in page_data) {/* clone the existing created object data object */
          if (page_data.hasOwnProperty(key)) {
            clone[key] = page_data[key];
          }
      }
      if(this.state.create_number_data['powerlimit'] < 1000){
        var new_number = Math.round(((number.target.value)*(this.state.create_number_data['powerlimit']))/(1000))
        clone['multi_digit_power'] = new_number.toString();

        if(bigInt(new_number).lesserOrEquals(this.get_power_limit())){
          this.setState({create_number_data: clone})
        }
      }else{
        var pos = (this.state.create_number_data['multi_digit_power'].length - this.state.create_number_data['multi_digit_powers_power']) - (this.state.create_number_data['power_editpos'] * 3) - 3;
        var current_number = this.state.create_number_data['multi_digit_power']+'';
        var new_number_value = number.target.value
        
        if(this.state.create_number_data['power_editpos'] == 1){
          var power_limit = this.state.create_number_data['powerlimit']
          var d = (power_limit/1000)
          new_number_value = Math.round((parseInt(new_number_value) * (d))/(1000))
        }
        var new_number_digits = this.format_digit_number_with_zeros(new_number_value);
        var new_number = current_number.replaceAt(pos, new_number_digits);
        clone['multi_digit_power'] = new_number;

        if(bigInt(new_number).lesserOrEquals(this.get_power_limit())){
          this.setState({create_number_data: clone})
        }
      }
      

      
      
    }




    when_number_slider_button_tapped(){
      var input_number = parseInt(this.get_number_value());
      var new_amount = input_number +1;
      if(new_amount<999){
        var obj = {target:{value:new_amount}}
        this.when_number_input_slider_changed(obj);
      }
    }

    when_number_slider_button_double_tapped(){
      var input_number = parseInt(this.get_number_value());
      var new_amount =  input_number -1;
      if(new_amount>=0){
        var obj = {target:{value:new_amount}}
        this.when_number_input_slider_changed(obj);
      }
    }




    when_power_slider_button_tapped(){
      var input_number = parseInt(this.get_power_value());
      var new_amount = input_number +1
      if(new_amount<999){
        var obj = {target: {value: new_amount}}
        this.when_power_input_slider_changed(obj);
      }
    }

    when_power_slider_button_double_tapped(){
      var input_number = parseInt(this.get_power_value());
      var new_amount =  input_number -1;
      if(new_amount>=0){
        var obj = {target:{value:new_amount}}
        this.when_power_input_slider_changed(obj);
      }
    }


    get_number_value(){
      return this.get_label_number_tripple_digit(this.state.create_number_data['editpos']);
    }

    get_power_value(){
      // return ((this.state.create_number_data['power']*1000)/this.state.create_number_data['powerlimit']);

      if(this.state.create_number_data['powerlimit'] < 1000){
        var power = this.get_power()
        return (power.times(1000).divide(this.state.create_number_data['powerlimit']))
      }else{
        var label = this.get_power_label_tripple_digits(this.state.create_number_data['power_editpos']);
        if(this.state.create_number_data['power_editpos'] == 1){
          var power_limit = this.state.create_number_data['powerlimit']
          var d = Math.floor(power_limit/1000)
          return bigInt(label).times(1000).divide(d)
        }else{
          return label
        }
      }
      
      // return this.get_power_label_tripple_digits(this.state.create_number_data['power_editpos']);
    }

    get_power(){
      return bigInt(this.state.create_number_data['multi_digit_power'])
    }



    
    get_text_color(pos){
	    if(pos == this.state.create_number_data['editpos']){
        return this.props.theme['number_picker_picked_label_text_color'];
      }
      else{
          return this.props.theme['number_picker_label_text_color'];
      }
    };

    get_power_text_color(pos){
	    if(pos == this.state.create_number_data['power_editpos']){
        return this.props.theme['number_picker_picked_power_label_text_color'];
      }
      else{
        return this.props.theme['number_picker_power_label_text_color'];
      }
    };


    format_digit_number_with_zeros(number){
        if(number < 10){
            return ("00"+number);
        }
        else if(number < 100){
            return ("0"+number);
        }
       return (""+number);
    }





    when_number_label_item_tapped(pos){
      let me = this;
      if(Date.now() - this.last_all_click_time < 200){
          //double tap
          me.read_and_set_data_from_clipboard()
          clearTimeout(this.all_timeout);
      }else{
          this.all_timeout = setTimeout(function() {
              clearTimeout(this.all_timeout);
              // single tap
              me.when_number_label_item_clicked(pos)
          }, 200);
      }
      this.last_all_click_time = Date.now();
    }

    read_and_set_data_from_clipboard(){
      const text = this.props.clip_number;
      if(text != null){
          var new_obj = this.get_create_number_data()
          new_obj['number'] = this.get_power_number() + (bigInt(0).add(bigInt(text))).toString().toLocaleString('fullwide', {useGrouping:false});
          this.setState({create_number_data: new_obj})
          this.props.when_number_picker_value_changed(bigInt(new_obj['number']))
      }
    }

    when_number_label_item_clicked(pos){
      var clone = {};
      var page_data = this.state.create_number_data;
      for (var key in page_data) {/* clone the existing created object data object */
          if (page_data.hasOwnProperty(key)) {
              clone[key] = page_data[key];
          }
      }
      clone['editpos'] = pos;
      if(pos != 3){
        this.setState({create_number_data: clone});
      }
    }



    when_power_label_item_tapped(pos){
      let me = this;
      if(Date.now() - this.last_all_click_time2 < 200){
          //double tap
          me.switch_pickers()
          clearTimeout(this.all_timeout2);
      }else{
          this.all_timeout2 = setTimeout(function() {
              clearTimeout(this.all_timeout2);
              // single tap
              me.when_power_label_item_clicked(pos)
          }, 200);
      }
      this.last_all_click_time2 = Date.now();
    }

    switch_pickers(){
      this.setState({is_picking_with_text_area: !this.state.is_picking_with_text_area})
    }

    when_power_label_item_clicked(pos){
      var clone = {};
      var page_data = this.state.create_number_data;
      for (var key in page_data) {/* clone the existing created object data object */
          if (page_data.hasOwnProperty(key)) {
              clone[key] = page_data[key];
          }
      }
      clone['power_editpos'] = pos;
      this.setState({create_number_data: clone});
    }

    get_label_number_tripple_digit(pos){
      var number = this.state.create_number_data['number'];
      var power = this.get_power();
      var start_pos =  (number.length) - (parseInt(power)+(pos * 3));
      var end_pos = start_pos-3;
      return parseInt(number.substring(start_pos, end_pos));
    }

    get_power_label_tripple_digits(pos){
      var number = this.state.create_number_data['multi_digit_power'];
      var power = this.state.create_number_data['multi_digit_powers_power'];
      var start_pos =  (number.length) - (parseInt(power)+(pos * 3));
      var end_pos = start_pos-3;
      return parseInt(number.substring(start_pos, end_pos));
    }



    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups font={this.props.font} item_id={item_id} object_data={object_data} when_number_picker_power_tapped={this.when_number_picker_power_tapped.bind(this)} theme={this.props.theme}/>
            </div>
        )

    }

     when_number_picker_power_tapped(tag, pos){
        var power = this.state.create_number_data['picked_powers'][pos];
        var clone = {};
        var page_data = this.state.create_number_data;
        for (var key in page_data) {/* clone the existing created object data object */
          if (page_data.hasOwnProperty(key)) {
            clone[key] = page_data[key];
          }
        }
        clone['multi_digit_power'] = bgN(1,1000).toString().substring(1,1000)+(power)
        this.setState({create_number_data: clone})
    }


}




export default NumberPicker;