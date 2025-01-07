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
import Tags from './tags';
import Slider from './slider'
import ViewGroups from './view_groups'
// import E5EmptyIcon3 from './../assets/e5empty_icon.png';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class DurationPicker extends Component {
    
    state = {
        edit_pos: 0,
        years:0,
        days:0,
        hours:0,
        minutes:0,
    };

    render(){
        return(
            <div style={{'margin':'25px 0px 0px 5px','padding': '0px 0px 5px 0px'}}>
                {this.render_number_label_group()}
                {this.render_number_picker_sliders()}
            </div>
        )
    }


    render_number_label_group(){
      var label_background_color = this.props.theme['number_picker_label_color']
      var label_shadow_color = this.props.theme['number_picker_label_shadow']

      return(
          <div  style={{'display': 'flex','flex-direction': 'row'}}>
            <div>
                {this.render_number_label_item(label_background_color,label_shadow_color,0, this.format_digit_number_with_zeros(this.state.years), 65)}
                {this.render_detail_item('10', {'text':this.props.loc['2745']/* years */, 'textsize':'10px', 'font':this.props.font})}
            </div>
            <div style={{width:10}}/>

            <div>
                {this.render_number_label_item(label_background_color,label_shadow_color,1, this.format_digit_number_with_zeros(this.state.days), 65)}
                {this.render_detail_item('10', {'text':this.props.loc['2746']/* days */, 'textsize':'10px', 'font':this.props.font})}
            </div>
            <div style={{width:10}}/>

            <div>
                {this.render_number_label_item(label_background_color,label_shadow_color,2, this.format_digit_number_with_zeros(this.state.hours), 65)}
                {this.render_detail_item('10', {'text':this.props.loc['2747']/* hours */, 'textsize':'10px', 'font':this.props.font})}
            </div>
            <div style={{width:10}}/>

            <div>   
                {this.render_number_label_item(label_background_color,label_shadow_color,3, this.format_digit_number_with_zeros(this.state.minutes), 65)}
                {this.render_detail_item('10', {'text':this.props.loc['2748']/* minutes */, 'textsize':'10px', 'font':this.props.font})}
            </div>
          </div>
        );
    }

    render_number_label_item(background_color, shadow_color, pos, number, width){
      return(
        <button style={{ height: 40, width: width, 'background-color': background_color, 'border-radius': '10px', 'box-shadow': ('0px 0px 1px 1px '+shadow_color),'margin': '0px 0px 0px 0px', 'border': 'none','text-decoration': 'none' , 'padding':' 1px 5px 5px 5px' }} onClick={()=>this.when_number_label_item_clicked(pos)}>
            <p style={{'color': this.get_text_color(pos), 'font-size': '26px', 'padding-top':' 0px', 'font-family': this.props.font}} >{number}</p>
        </button>
      );
    }

    get_text_color(pos){
      if(pos == this.state.edit_pos){
        return this.props.theme['number_picker_picked_label_text_color'];
      }
      else{
          return this.props.theme['number_picker_label_text_color'];
      }
    }

    when_number_label_item_clicked(pos){
      this.setState({edit_pos: pos});
    }

    render_number_picker_sliders(){
        return(
          <div style={{'margin':'15px 0px 0px 0px'}}>
            <div style={{width:'94%', 'margin':'0px 0px 0px 0px'}}>
                <Slider value={this.get_number_value()}  whenNumberChanged={(e)=>this.when_number_input_slider_changed(e)} unitIncrease={()=>this.when_number_slider_button_tapped()} unitDecrease={()=>this.when_number_slider_button_double_tapped()} theme={this.props.theme}/>
            </div>
          </div>
        )
    }

    reset_number_picker2(){
        this.setState({ edit_pos: 0, years:0, days:0, hours:0, minutes:0, })
    }

    reset_number_picker(){
        this.setState({ edit_pos: 0, years:0, days:0, hours:0, minutes:0, })
        var me = this;
        setTimeout(function() {
            me.props.when_number_picker_value_changed(me.get_duration())
        }, (1 * 100));
    }

    when_number_input_slider_changed(number){
        var new_number = parseInt(number.target.value)
        if(this.state.edit_pos == 0){
            this.setState({years: new_number})
        }
        else if(this.state.edit_pos == 1){
            new_number = Math.round((new_number / 999) * 365)
            this.setState({days: new_number})
        }
        else if(this.state.edit_pos == 2){
            new_number = Math.round((new_number / 999) * 24)
            this.setState({hours: new_number})
        }
        else if(this.state.edit_pos == 3){
            new_number = Math.round((new_number / 999) * 60)
            this.setState({minutes: new_number})
        }
        var me = this;
        setTimeout(function() {
            me.props.when_number_picker_value_changed(me.get_duration())
        }, (1 * 100));
    }

    when_number_slider_button_tapped(){
        if(this.state.edit_pos == 0){
            var new_number = this.state.years +1
            if(new_number < 999){
                this.setState({years: new_number})
            }
        }
        else if(this.state.edit_pos == 1){
            var new_number = this.state.days +1
            if(new_number < 365){
                this.setState({days: new_number})
            }
        }
        else if(this.state.edit_pos == 2){
            var new_number = this.state.hours +1
            if(new_number < 24){
                this.setState({hours: new_number})
            }
        }
        else if(this.state.edit_pos == 3){
            var new_number = this.state.minutes +1
            if(new_number < 60){
                this.setState({minutes: new_number})
            }
        }
        var me = this;
        setTimeout(function() {
            me.props.when_number_picker_value_changed(me.get_duration())
        }, (1 * 100));
    }

    when_number_slider_button_double_tapped(){
        if(this.state.edit_pos == 0){
            var new_number = this.state.years -1
            if(new_number >= 0){
                this.setState({years: new_number})
            }
        }
        else if(this.state.edit_pos == 1){
            var new_number = this.state.days -1
            if(new_number >= 0){
                this.setState({days: new_number})
            }
        }
        else if(this.state.edit_pos == 2){
            var new_number = this.state.hours -1
            if(new_number >= 0){
                this.setState({hours: new_number})
            }
        }
        else if(this.state.edit_pos == 3){
            var new_number = this.state.minutes -1
            if(new_number >= 0){
                this.setState({minutes: new_number})
            }
        }
        var me = this;
        setTimeout(function() {
            me.props.when_number_picker_value_changed(me.get_duration())
        }, (1 * 100));
    }

    get_duration(){
        var duration_in_seconds = (this.state.years * (60*60*24*7*53)) + (this.state.days * (60*60*24)) + (this.state.hours *3600) + (this.state.minutes * 60)

        return bigInt(duration_in_seconds)
    }

    format_digit_number_with_zeros(number){
        if(number < 10){
            return ("00"+number);
        }
        else if(number < 100){
            return ("0"+number);
        }
       return (""+number);
    }


    get_number_value(){
        if(this.state.edit_pos == 0){
            return this.state.years
        }
        else if(this.state.edit_pos == 1){
            return ((this.state.days / 365) * 999)
        }
        else if(this.state.edit_pos == 2){
            return ((this.state.hours / 24) * 999)
        }
        else if(this.state.edit_pos == 3){
            return ((this.state.minutes / 60) * 999)
        }
    }


    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups font={this.props.font} item_id={item_id} object_data={object_data} theme={this.props.theme}/>
            </div>
        )

    }

}




export default DurationPicker;