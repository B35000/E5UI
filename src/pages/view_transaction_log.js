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

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function start_and_end(str) {
  if (str.length > 35) {
    return str.substr(0, 20) + '...' + str.substr(str.length-10, str.length);
  }
  return str;
}

class ViewTransactionLogPage extends Component {
    
    state = {
        selected: 0, log_item: null
    };

    render(){
        if(this.state.log_item == null) return;
        return(
            <div style={{'margin':'10px 10px 0px 10px'}}>
                {this.render_everything()}
            </div>
        )
    }


    render_everything(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_log_item_data()}
                    {this.render_log_item_data2()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_log_item_data()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_log_item_data2()}
                        <div style={{height: 10}}/>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_log_item_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_log_item_data2()}
                        <div style={{height: 10}}/>
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
                                    <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_log_item_data(){
        var item = this.state.log_item
        return(
            <div> 
                {this.render_detail_item('3',{'title':''+item.returnValues.p3, 'details':this.props.app_state.loc['1750']/* 'Transaction ID' */,'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3',{'title':this.props.app_state.loc['1771']/* 'Timestamp' */, 'details':''+new Date(item.returnValues.p8*1000),'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3',{'title':''+this.get_time_difference(item.returnValues.p8), 'details':this.props.app_state.loc['1772']/* 'Transaction Age ' */,'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3',{'title':''+item.returnValues.p9, 'details':this.props.app_state.loc['1773']/* 'Transaction Block' */,'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3',{'title':item.returnValues.p4, 'details':this.props.app_state.loc['1774']/* 'Transaction Stack Size' */,'size':'l'})}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1775']/* 'Gas Consumed' */, 'number':item.returnValues.p5, 'relativepower':'gas'})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1775']/* 'Gas Consumed' */, 'subtitle':this.format_power_figure(item.returnValues.p5), 'barwidth':this.calculate_bar_width(item.returnValues.p5), 'number':this.format_account_balance_figure(item.returnValues.p5), 'barcolor':'', 'relativepower':'gas', })}
                </div>
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1088']/* 'Gas Price in wei' */, 'number':item.returnValues.p7, 'relativepower':'wei'})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1087']/* 'Gas Price in Gwei' */, 'subtitle':this.format_power_figure(item.returnValues.p7/10**9), 'barwidth':this.calculate_bar_width(item.returnValues.p7/10**9), 'number':this.format_account_balance_figure(item.returnValues.p7/10**9), 'barcolor':'', 'relativepower':'gwei', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1088']/* 'Gas Price in wei' */, 'subtitle':this.format_power_figure(item.returnValues.p7), 'barwidth':this.calculate_bar_width(item.returnValues.p7), 'number':this.format_account_balance_figure(item.returnValues.p7), 'barcolor':'', 'relativepower':'wei', })}
                </div>
                <div style={{height: 10}}/>

            </div>
            )
    }


    render_log_item_data2(){
        var item = this.state.log_item
        return(
            <div>
                {this.render_detail_item('3',{'details':item.returnValues.p1, 'title':this.props.app_state.loc['1776']/* 'Sender Account ID' */,'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3',{'details':item.returnValues.p2, 'title':this.props.app_state.loc['1777']/* 'Sender Account Address' */,'size':'l'})}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1779']/* 'Included Value in Wei' */, 'number':item.returnValues.p6, 'relativepower':'wei'})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1778']/* 'Included Value in Ether' */, 'subtitle':this.format_power_figure(parseInt(item.returnValues.p6)/10**18), 'barwidth':this.calculate_bar_width(parseInt(item.returnValues.p6)/10**18), 'number':(parseInt(item.returnValues.p6)/10**18), 'barcolor':'', 'relativepower':'ether', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1779']/* 'Included Value in Wei' */, 'subtitle':this.format_power_figure(item.returnValues.p6), 'barwidth':this.calculate_bar_width(item.returnValues.p6), 'number':this.format_account_balance_figure(item.returnValues.p6), 'barcolor':'', 'relativepower':'wei', })}
                </div>
                
                <div style={{height: 10}}/>
                {this.render_detail_item('3',{'details':start_and_end(item.returnValues.p10), 'title':this.props.app_state.loc['1780']/* 'Coinbase Address' */,'size':'l'})}
            </div>
        )
    }


    set_transaction(transaction){
        this.setState({log_item: transaction})
    }







     /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var size = this.props.screensize
        var width = size == 'm' ? this.props.app_state.width/2 : this.props.app_state.width
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data}  theme={this.props.theme} width={width}/>
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

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
    }

    /* gets a formatted time diffrence from now to a given time */
    get_time_difference(time){
        var number_date = Math.round(parseInt(time));
        var now = Math.round(new Date().getTime()/1000);

        var diff = now > number_date ? now - number_date : number_date - now
        return this.get_time_diff(diff)
    }

    get_time_from_now(time){
        var number_date = Math.round(parseInt(time));
        var now = Math.round(new Date().getTime()/1000);

        var diff = number_date - now;
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


}




export default ViewTransactionLogPage;