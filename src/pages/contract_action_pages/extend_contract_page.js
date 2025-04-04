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
import Tags from '../../components/tags';
import ViewGroups from '../../components/view_groups'
import TextInput from '../../components/text_input';
import NumberPicker from '../../components/number_picker';


import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

var bigInt = require("big-integer");

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
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

class ExtendContractPage extends Component {
    
    state = {
        selected: 0,id:makeid(8), type:this.props.app_state.loc['35'],
        contract_item: {'data':[[],[0,0,0,0,0,0,0,0,0,0]], 'entry_expiry':0}, extend_contract_title_tags_object:this.get_extend_contract_title_tags_object(),
        interactible_timestamp:0,
        entered_indexing_tags:[this.props.app_state.loc['36'], this.props.app_state.loc['37']]
    };


    get_extend_contract_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['35']], [1]
            ],
        };
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>

                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.extend_contract_title_tags_object} tag_size={'l'} when_tags_updated={this.when_extend_contract_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img className="text-end" onClick={()=>this.finish_extending_contract_ui()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div>

                <div style={{height:10}}/>
                {this.render_everything()}

            </div>
        )
    }


    when_extend_contract_title_tags_object_updated(tag_obj){
        this.setState({extend_contract_title_tags_object:tag_obj})
    }


    render_everything(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_date_picker_part()}
                    {this.render_contract_config_parts()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_date_picker_part()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_contract_config_parts()}
                        <div style={{height:10}}/>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_date_picker_part()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_contract_config_parts()}
                        <div style={{height:10}}/>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_date_picker_part(){
        var contract_config = this.state.contract_item['data'][1]
        var expiry_time_in_seconds = this.state.contract_item['entry_expiry']
        var time_to_expiry =  expiry_time_in_seconds - Math.floor(new Date() / 1000);
        return(
            <div>
                {this.show_entered_contract_data()}
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['38'], 'details':this.props.app_state.loc['39'], 'size':'l'})}

                <div style={{height:10}}/>
                <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], }, })}>
                    <CssBaseline />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_new_dat_time_value_set(newValue)}/>
                    </LocalizationProvider>
                </ThemeProvider>
                <div style={{height:10}}/>

            </div>
        )
    }

    render_contract_config_parts(){
        var contract_config = this.state.contract_item['data'][1]
        var expiry_time_in_seconds = this.state.contract_item['entry_expiry']
        var time_to_expiry =  expiry_time_in_seconds - Math.floor(new Date() / 1000);
        return(
            <div>
                {this.render_detail_item('3', {'title':this.get_time_diff(contract_config[6]), 'details':this.props.app_state.loc['40'], 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.get_time_diff(contract_config[2]), 'details':this.props.app_state.loc['41'], 'size':'l'})}
                <div style={{height:10}}/>
            </div>
        )
    }


    show_entered_contract_data(){
        var expiry_time_in_seconds = this.state.contract_item['entry_expiry']
        var time_to_expiry =  expiry_time_in_seconds - Math.floor(new Date() / 1000);

        if(expiry_time_in_seconds != 0){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':'Until: '+(new Date(expiry_time_in_seconds*1000)), 'title':this.props.app_state.loc['42']})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'size':'l', 'details':''+(this.get_time_diff(time_to_expiry)), 'title':this.props.app_state.loc['43']})}
                </div>
            )
        }
    }

    when_new_dat_time_value_set(value){
        const selectedDate = value instanceof Date ? value : new Date(value);
        const timeInSeconds = Math.floor(selectedDate.getTime() / 1000);
        this.setState({interactible_timestamp: timeInSeconds})
    }


    set_contract(contract){
        if(this.state.contract_item['id'] != contract['id']){
            this.setState({
                selected: 0,id:makeid(8), type:this.props.app_state.loc['35'],
                contract_item: {'data':[[],[0,0,0,0,0,0,0,0,0,0]], 'entry_expiry':0}, extend_contract_title_tags_object:this.get_extend_contract_title_tags_object(),
                interactible_timestamp:0,
                entered_indexing_tags:[this.props.app_state.loc['36'], this.props.app_state.loc['37']]
            })
        }
        this.setState({contract_item: contract, e5: contract['e5']})
    }


    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
            </div>
        )

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
                                    <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
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


    finish_extending_contract_ui(){
        var picked_time = this.state.interactible_timestamp
        var limit = this.state.contract_item['data'][1][2];

        if(this.state.contract_item['entry_expiry'] > picked_time){
            this.props.notify(this.props.app_state.loc['44'], 4500);
        }
        else if(picked_time - this.state.contract_item['entry_expiry'] >limit){
            this.props.notify(this.props.app_state.loc['45'], 4500);
        }
        else if(this.state.contract_item['data'][1][29] == 0 && this.state.contract_item['entry_expiry'] - Date.now()/1000 > limit){
            var waiting_time = (this.state.contract_item['entry_expiry'] - Date.now()/1000) - limit
            this.props.notify(this.props.app_state.loc['46']+(this.get_time_diff(waiting_time))+this.props.app_state.loc['47'], 4500);
        }
        else{
            var clone = structuredClone(this.state)
            // clone.e5 = this.props.app_state.selected_e5

            this.props.extend_contract(clone)
            this.props.notify(this.props.app_state.loc['18'], 700);
        }
        
    }


}




export default ExtendContractPage;