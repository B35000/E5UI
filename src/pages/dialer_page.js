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

import EndImg from './../assets/end_token_icon.png';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class DialerPage extends Component {
    
    state = {
        selected: 0, data:null,
    };


    set_data(data){
        this.setState({data: data})
    }

    render(){
        if(this.state.data == null) return;
        return(
            <div style={{'padding':'10px 15px 0px 15px'}}>
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

    render_content(){
        var data = this.state.data
        if(data['is_my_call']){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'title':data['alias'], 'details':this.props.app_state.loc['3055']/* 'Call Recipient.' */})}
                    <div style={{height:10}}/>
                    {this.render_callee_line_item(data['item'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'title':data['item']['socket_id'], 'details':this.props.app_state.loc['3055a']/* 'Your recipient\'s socket id.' */})}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'title':data['my_socket_id'], 'details':this.props.app_state.loc['3055h']/* 'Your socket id.' */})}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'title':this.get_call_status(), 'details':this.props.app_state.loc['3055b']/* 'Call status' */})}

                    {this.render_detail_item('0')}
                    {this.render_hold_button()}
                    <div style={{height:10}}/>
                    {this.render_receive_end_call_button()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'title':data['alias'], 'details':this.props.app_state.loc['3055k']/* 'Caller' */})}
                    <div style={{height:10}}/>
                    {this.render_callee_line_item(data['item'])}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'title':data['item']['socket_id'], 'details':this.props.app_state.loc['3055l']/* 'Caller\'s socket id.' */})}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'title':data['my_socket_id'], 'details':this.props.app_state.loc['3055h']/* 'Your socket id.' */})}
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'size':'l', 'title':this.get_call_status(), 'details':this.props.app_state.loc['3055b']/* 'Call status' */})}

                    {this.render_detail_item('0')}
                    {this.render_hold_button()}
                    <div style={{height:10}}/>
                    {this.render_receive_end_call_button()}
                </div>
            )
        }
    }

    render_callee_line_item(item){
        var e5_id = item['e5_id']
        var object = this.get_all_sorted_objects(this.props.app_state.created_nitros).find(x => x['e5_id'] === e5_id);
        var default_image = EndImg
        var image = object['ipfs'] == null ? default_image : (object['ipfs'].album_art == null ? default_image : object['ipfs'].album_art)
        var title = object['e5']+' • '+object['id']
        var details = object['ipfs'] == null ? 'Nitropost ID' : (object['ipfs'].entered_title_text)
        return(
            <div>
                {this.render_detail_item('8', {'size':'l', 'title':title, 'details':details, 'image':image })}
            </div>
        )  
    }

    get_call_status(){
        if(this.props.call_status == 'none'){
            return this.props.app_state.loc['3055c']/* 'N/A' */
        }
        else if(this.props.call_status == 'dialing'){
            return this.props.app_state.loc['3055d']/* 'Connecting...' */
        }
        else if(this.props.call_status == 'active'){
            return this.props.app_state.loc['3055m']/* 'Active' */
        }
    }

    render_receive_end_call_button(){
        if(this.props.call_status == 'dialing' || this.props.call_status == 'active'){
            return(
                <div>
                    <div onClick={()=> this.props.end_current_call()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['3055g']/* 'end call' */, 'action':''},)}
                    </div>
                </div>
            )
        }
        else if(this.props.call_status == 'receiving'){
            var data = this.state.data
            return(
                <div>
                    <div onClick={()=> this.props.initialize_media_for_receive_call(data['data'])}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['3055i']/* 'receive call' */, 'action':''},)}
                    </div>
                </div>
            )
        }
    }

    render_hold_button(){
        if((this.props.call_status == 'active' || this.props.call_status == 'hold') && this.props.is_hold_initiator != false){
            var text = this.props.call_status == 'active' ? this.props.app_state.loc['3055e']/* 'hold' */ : this.props.app_state.loc['3055f']/* 'resume call' */
            return(
                <div>
                    <div onClick={()=> this.props.hold_resume_call()}>
                        {this.render_detail_item('5', {'text':text, 'action':''},)}
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
                                    <img alt="" src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
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
        if(item_id == '8' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12')uploaded_data = this.props.app_state.uploaded_data
        return(
            <div>
                <ViewGroups uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme}/>
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




export default DialerPage;