import React, { Component } from 'react';
import Slider from './slider'
var bigInt = require("big-integer");


function bgN(number, power) {
  return bigInt((number+"e"+power)).toString().substring(1, power);
}


String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}


class NumberPicker extends Component {
    
    state = {
        selected: 0,
        create_number_data: this.get_create_number_data(),
    };

    get_create_number_data(){
      return{
        'number':  bgN(1,72).toString().substring(1,72),
        'power':0,
        'editpos':0,
        'powerlimit':63
      }
    }

    render(){
        return(
            <div>
                <div  style={{'margin':'30px 0px 0px 5px','padding': '0px 0px 5px 0px'}}>
                    {this.render_number_label_group()}
                    {this.render_number_picker_sliders()}
                </div>
            </div>
        )
    }

    render_number_label_group(){
        return(
          <div  style={{'display': 'flex','flex-direction': 'row'}}>
            {this.render_number_label_item('#3C3C3C','#868686',2, this.format_digit_number_with_zeros(this.get_label_number_tripple_digit(2)), 65)}
            <div style={{width:10}}/>
            {this.render_number_label_item('#3C3C3C','#868686',1, this.format_digit_number_with_zeros(this.get_label_number_tripple_digit(1)), 65)}
            <div style={{width:10}}/>
            {this.render_number_label_item('#3C3C3C','#868686',0, this.format_digit_number_with_zeros(this.get_label_number_tripple_digit(0)), 65)}
            <div style={{width:20}}/>
            {this.render_number_label_item('white','#CECDCD',3,this.state.create_number_data['power'], 60)}
          </div>
        );
    }

    render_number_label_item(background_color, shadow_color, pos, number, width){
      return(
        <button style={{ height: 40, width: width, 'background-color': background_color, 'border-radius': '10px', 'box-shadow': ('0px 0px 1px 1px '+shadow_color),'margin': '0px 0px 0px 0px', 'border': 'none','text-decoration': 'none' }} onClick={()=>this.when_number_label_item_clicked(pos)}>
            <p style={{'color': this.get_text_color(pos), 'font-size': '26px', height: "100%", 'padding-top':' 0px'}} className="text-center">{number}</p>
        </button>
      );
    }

    render_number_picker_sliders(){
      return(
        <div style={{'margin':'20px 0px 0px 0px'}}>
          <div style={{height:'100%', width:'94%', 'margin':'7px 0px 0px 0px'}}>
              <Slider value={this.get_number_value()}  whenNumberChanged={(e)=>this.when_number_input_slider_changed(e)} unitIncrease={()=>this.when_number_slider_button_tapped()} unitDecrease={()=>this.when_number_slider_button_double_tapped()}/>
          </div>
          <div style={{height:'100%', width:'94%', 'margin':'10px 0px 0px 0px'}}>
              <Slider value={this.get_power_value()}  whenNumberChanged={(e)=>this.when_power_input_slider_changed(e)} unitIncrease={()=>this.when_power_slider_button_tapped()} unitDecrease={()=>this.when_power_slider_button_double_tapped()}/>
          </div>
        </div>
      )
    }

    when_number_input_slider_changed(number){
      var pos = ((this.state.create_number_data['number'].length) - this.state.create_number_data['power']) - (this.state.create_number_data['editpos'] * 3) - 3;
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
      this.setState({create_number_data: clone})
    }

    when_power_input_slider_changed(number){
      var new_power = (parseInt(number.target.value)/1000) * this.state.create_number_data['powerlimit'];
      
      var clone = {};
      var page_data = this.state.create_number_data;
      for (var key in page_data) {/* clone the existing created object data object */
          if (page_data.hasOwnProperty(key)) {
            clone[key] = page_data[key];
          }
      }
      clone['power'] = Math.round(new_power);
      this.setState({create_number_data: clone})
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
      var clone = {};
      var page_data = this.state.create_number_data;
      for (var key in page_data) {/* clone the existing created object data object */
          if (page_data.hasOwnProperty(key)) {
            clone[key] = page_data[key];
          }
      }
      clone['power']++;
      if(clone['power'] <= clone['powerlimit']){
        this.setState({create_number_data: clone})
      }
    }

    when_power_slider_button_double_tapped(){
      var clone = {};
      var page_data = this.state.create_number_data;
      for (var key in page_data) {/* clone the existing created object data object */
          if (page_data.hasOwnProperty(key)) {
            clone[key] = page_data[key];
          }
      }
      clone['power']--;
      if(clone['power'] >= 0){
        this.setState({create_number_data: clone})
      }
    }


    get_number_value(){
      return this.get_label_number_tripple_digit(this.state.create_number_data['editpos']);
    }

    get_power_value(){
      return ((this.state.create_number_data['power']*1000)/this.state.create_number_data['powerlimit']);
    }



    
    get_text_color(pos){
	    if(pos == this.state.create_number_data['editpos']){
          return 'white';
        }
        else{
            return '#878787';
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

    get_label_number_tripple_digit(pos){
      var number = this.state.create_number_data['number'];
      var power = this.state.create_number_data['power'];
      var start_pos =  (number.length) - (parseInt(power)+(pos * 3));
      var end_pos = start_pos-3;
      return parseInt(number.substring(start_pos, end_pos));
    }


}




export default NumberPicker;