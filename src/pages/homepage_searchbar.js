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
import TextInput from './../components/text_input';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class template extends Component {
    
    state = {
        selected: 0, page_search_data:{}
    };

    render(){
        return(
            <div>
                {this.render_search_tags_views()}
            </div>
        )
    }


    render_search_tags_views(){
        return(
            <div>
                <div style={{'background-color': 'transparent', 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 10px 5px 10px','border-radius': '15px' }}>
                    <div className="row" style={{width:'100%'}}>
                        <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                            <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1264ad']/* 'Search by ID or Title..' */} when_text_input_field_changed={this.when_tag_input_field_changed.bind(this)} text={this.get_typed_text()} adjust_height={false} theme={this.props.theme}/>
                        </div>
                        <div className="col-1" style={{'padding': '0px 10px 0px 0px'}} onClick={()=> this.search_string()}>
                            <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                                <img alt="" className="text-end" src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{height: 5}}/>
            </div>
        )
    }

    get_typed_text(){
        var id = this.props.get_page_id()
        var searched_data = this.state.page_search_data[id]
        if(searched_data == null){
            return ''
        }
        return searched_data
    }

    when_tag_input_field_changed = (text) => {
        const id = this.props.get_page_id()//postsall ♾️
        const searched_data_clone = structuredClone(this.state.page_search_data)
        searched_data_clone[id] = text
        this.setState({page_search_data: searched_data_clone})
        console.log('homepage', 'set typed tag:', searched_data_clone)
        
        if(text == ''){
            this.props.reset_current_objects(searched_data_clone)
            this.props.when_search_button_tapped('')
        }else{
            var me = this;
            setTimeout(function() {
                const typed_word = me.get_typed_text();
                if(typed_word == text){
                    console.log('homepage', 'searching:', text)
                    me.props.search_current_objects(id, text, searched_data_clone)
                }
            }, (1 * 800));
            
        }
    }

    search_string(){
        const typed_word = this.get_typed_text().trim();
        this.props.search_string(typed_word)
    }











    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }

    get_selected_item2(object, option){
        return object[option][2][0]
    }

    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} transactions_text={this.props.app_state.loc['2867']/* 'transactions' */}/>
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




export default template;