import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import Slider from './../components/slider'

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class ViewNumber extends Component {
    //onClick={() => this.props.view_number({'title':, 'number':, 'relativepower':})}
    state = {
        data: 0,
        number: bgN(1,1000).toString().substring(1,1000),
        power:0,
        power_limit:0,
        edit_pos:0,
        picked_powers:[],
    };

    set_data(data){
        var number = data['number']
        this.setState({data:data, number: this.get_number_from_data(number), power_limit: this.get_power_limit_from_data(number), power: this.get_power_limit_from_data(number)})
    }

    get_number_from_data(number){
        return bigInt(number).toString().toLocaleString('fullwide', {useGrouping:false})
    }

    get_power_limit_from_data(number){
        var number_length = this.get_number_from_data(number).length
        if(number_length > 9){
            return number_length - 9
        }
        return 0
    }

    render(){
        
        return(
            <div style={{'padding':'20px 20px 0px 20px'}}>
                {this.render_everything()}
            </div>
        )
    }

    render_everything(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_content()}
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
                                    <img src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }


    render_content(){
        if(this.state.data == null) return;
        var number = this.state.data['number']
        var relativepower = this.state.data['relativepower']
        var title = this.state.data['title']
        return(
            <div>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':title, 'subtitle':this.format_power_figure(number), 'barwidth':this.calculate_bar_width(number), 'number':this.format_account_balance_figure(number), 'barcolor':'#606060', 'relativepower':relativepower, })}
                </div>
                <div style={{height:20}}/>
                {this.render_number_label_group()}
                {this.render_number_picker_sliders()}
            </div>
        )
    }


    render_number_label_group(){
      var label_background_color = this.props.theme['number_picker_label_color']
      var label_shadow_color = this.props.theme['number_picker_label_shadow']
      var number_picker_power_color = this.props.theme['number_picker_power_color']
      var number_picker_power_shadow_color = this.props.theme['number_picker_power_shadow_color']

      return(
          <div  style={{'display': 'flex','flex-direction': 'row'}}>
            {this.render_number_label_item(label_background_color,label_shadow_color,2, this.format_digit_number_with_zeros(this.get_label_number_tripple_digit(2)), 65)}
            <div style={{width:10}}/>
            {this.render_number_label_item(label_background_color,label_shadow_color,1, this.format_digit_number_with_zeros(this.get_label_number_tripple_digit(1)), 65)}
            <div style={{width:10}}/>
            {this.render_number_label_item(label_background_color,label_shadow_color,0, this.format_digit_number_with_zeros(this.get_label_number_tripple_digit(0)), 65)}
            <div style={{width:20}}/>
            
            {this.render_number_label_item(number_picker_power_color,number_picker_power_shadow_color,3,this.state.power, 60)}
          </div>
        );
    }


    render_number_label_item(background_color, shadow_color, pos, number, width){
      return(
        <button style={{ height: 40, width: width, 'background-color': background_color, 'border-radius': '10px', 'box-shadow': ('0px 0px 1px 1px '+shadow_color),'margin': '0px 0px 0px 0px', 'border': 'none','text-decoration': 'none' , 'padding':' 0px 5px 5px 5px' }} onClick={()=>this.when_number_label_item_clicked(pos)}>
            <p style={{'color': this.get_text_color(pos), 'font-size': '26px', 'padding-top':' 0px', 'font-family': this.props.font}} >{number}</p>
        </button>
      );
    }

    render_number_picker_sliders(){
        return(
          <div style={{'margin':'20px 0px 0px 0px'}}>
            <div style={{height:'100%', width:'94%', 'margin':'10px 0px 0px 0px'}}>
                <Slider value={this.get_power_value()}  whenNumberChanged={(e)=>this.when_power_input_slider_changed(e)} unitIncrease={()=>this.when_power_slider_button_tapped()} unitDecrease={()=>this.when_power_slider_button_double_tapped()} theme={this.props.theme}/>
            </div>
          </div>
        )
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


    when_power_input_slider_changed(number){
      var new_power = Math.round((parseInt(number.target.value)/1000) * this.state.power_limit)
      this.setState({power: new_power})
    }

    when_power_slider_button_tapped(){
      var clone = this.state.power
      clone++;
      if(clone <= this.state.power_limit){
        this.setState({power: clone})
      }
    }

    when_power_slider_button_double_tapped(){
      var clone = this.state.power
      clone--;
      if(clone >= 0){
        this.setState({power: clone})
      }
    }


    get_power_value(){
      return ((this.state.power*1000)/this.state.power_limit);
    }

    get_text_color(pos){
	    if(pos != 3){
            return this.props.theme['number_picker_power_color'];
        }
        else{
            return this.props.theme['number_picker_label_text_color'];
        }
    };


    when_number_label_item_clicked(pos){
      if(pos != 3){
        this.setState({edit_pos: pos});
      }
    }


    get_label_number_tripple_digit(pos){
      var number = this.state.number;
      var power = this.state.power;
      var start_pos =  (number.length) - (parseInt(power)+(pos * 3));
      var end_pos = start_pos-3;
      var res = parseInt(number.substring(start_pos, end_pos));
      return res
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
        var picked_power = this.state.picked_powers[pos];
        this.setState({power: parseInt(picked_power)})
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

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
    }

}




export default ViewNumber;