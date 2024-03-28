import React, { Component } from 'react';
import Slider from './slider'
import ViewGroups from './view_groups'
// import E5EmptyIcon3 from './../assets/e5empty_icon.png';
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
    };

    get_create_number_data(){
      return{
        'number': this.get_number_from_power_limit(),
        'power':0,
        'editpos':0,
        'powerlimit':this.get_power_limit(),
        'picked_powers':[]
      }
    }

    get_power_limit(){
      return this.props.power_limit 
    }

    get_number_from_power_limit(){
      var power_limit = this.get_power_limit()
      if(power_limit == 63){
        return bgN(1,72).toString().substring(1,72)
      }
      else{
        return bgN(1,1000).toString().substring(1,1000)
      }
    }

    render(){
        return(
            <div>
                <div  style={{'margin':'25px 0px 0px 5px','padding': '0px 0px 5px 0px'}}>
                    {this.render_number_label_group()}
                    {this.render_number_picker_sliders()}
                    <div style={{height: 10}}/>
                    <div className="row">
                        <div className="col-9" style={{'padding': '0px 0px 0px 10px'}}>
                            {this.render_detail_item('1', this.get_number_power_data())}
                        </div>
                        <div className="col-2" style={{'padding': '3px 0px 0px 0px'}}>
                            <div className="text-end" style={{'padding': '5px'}} onClick={()=>this.reset_number_picker2()}>
                              <img src={'https://nftstorage.link/ipfs/bafkreib7qp2bgl3xnlgflwmqh7lsb7cwgevlr4s2n5ti4v4wi4mcfzv424'} style={{height:35 ,width:35}} />
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }

    reset_number_picker(){
      this.setState({create_number_data: this.get_create_number_data()})
      // this.props.when_number_picker_value_changed(bigInt('0'))
    }

    reset_number_picker2(){
      this.setState({create_number_data: this.get_create_number_data()})
      this.props.when_number_picker_value_changed(bigInt('0'))
    }

    get_number_power_data(){
        return{
            'active_tags':this.format_powers(this.state.create_number_data['picked_powers']),
            'index_option':'indexed',
            'when_tapped': 'when_number_picker_power_tapped'
        }
    }

    format_powers(picked_powers){
        var new_array = []
        picked_powers.forEach(element => {
            new_array.push('e'+element)
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
          <div  style={{'display': 'flex','flex-direction': 'row'}}>
            {this.render_number_label_item(label_background_color,label_shadow_color,0, this.format_digit_number_with_zeros(this.get_label_number_tripple_digit(0)), 65)}
          </div>
        );
      }else{
        return(
          <div  style={{'display': 'flex','flex-direction': 'row'}}>
            {this.render_number_label_item(label_background_color,label_shadow_color,2, this.format_digit_number_with_zeros(this.get_label_number_tripple_digit(2)), 65)}
            <div style={{width:10}}/>
            {this.render_number_label_item(label_background_color,label_shadow_color,1, this.format_digit_number_with_zeros(this.get_label_number_tripple_digit(1)), 65)}
            <div style={{width:10}}/>
            {this.render_number_label_item(label_background_color,label_shadow_color,0, this.format_digit_number_with_zeros(this.get_label_number_tripple_digit(0)), 65)}
            <div style={{width:20}}/>
            {this.render_number_label_item(number_picker_power_color,number_picker_power_shadow_color,3,this.state.create_number_data['power'], 60)}
          </div>
        );
      }
    }

    render_number_label_item(background_color, shadow_color, pos, number, width){
      return(
        <button style={{ height: 40, width: width, 'background-color': background_color, 'border-radius': '10px', 'box-shadow': ('0px 0px 1px 1px '+shadow_color),'margin': '0px 0px 0px 0px', 'border': 'none','text-decoration': 'none' , 'padding':' 0px 5px 5px 5px' }} onClick={()=>this.when_number_label_item_clicked(pos)}>
            <p style={{'color': this.get_text_color(pos), 'font-size': '26px', 'padding-top':' 0px', 'font-family': this.props.font}} >{number}</p>
        </button>
      );
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
      
      if(bigInt(new_number) <= this.props.number_limit){
        if(!clone['picked_powers'].includes(this.state.create_number_data['power'])){
          clone['picked_powers'].push(this.state.create_number_data['power']);
        }
        this.setState({create_number_data: clone})
        this.props.when_number_picker_value_changed(bigInt(new_number))
      }
      
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
        return this.props.theme['number_picker_power_color'];
      }
      else{
          return this.props.theme['number_picker_label_text_color'];
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
        clone['power'] = parseInt(power)
        this.setState({create_number_data: clone})
    }


}




export default NumberPicker;