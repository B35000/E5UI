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
        return(
            <div style={{'margin':'10px 10px 0px 10px'}}>
                {this.render_log_item_data()}
            </div>
        )
    }


    render_log_item_data(){
        var item = this.state.log_item
        if(item != null){
            return(
                <div>
                    
                    {this.render_detail_item('3',{'title':''+item.returnValues.p3, 'details':'Transaction ID ','size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3',{'title':'Timestamp', 'details':''+new Date(item.returnValues.p8*1000),'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3',{'title':''+this.get_time_difference(item.returnValues.p8), 'details':'Transaction Age ','size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3',{'title':''+item.returnValues.p9, 'details':'Transaction Block ','size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3',{'title':item.returnValues.p4, 'details':'Transaction Stack Size','size':'l'})}
                    <div style={{height: 10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':'Gas Consumed', 'subtitle':this.format_power_figure(item.returnValues.p5), 'barwidth':this.calculate_bar_width(item.returnValues.p5), 'number':this.format_account_balance_figure(item.returnValues.p5), 'barcolor':'', 'relativepower':'gas', })}
                    </div>
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3',{'details':item.returnValues.p1, 'title':'Sender Account ID','size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3',{'details':item.returnValues.p2, 'title':'Sender Account Address','size':'l'})}
                    <div style={{height: 10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':'Included Value in Ether', 'subtitle':this.format_power_figure(parseInt(item.returnValues.p6)/10**18), 'barwidth':this.calculate_bar_width(parseInt(item.returnValues.p6)/10**18), 'number':(parseInt(item.returnValues.p6)/10**18), 'barcolor':'', 'relativepower':'ether', })}

                        {this.render_detail_item('2', { 'style':'l', 'title':'Included Value in Wei', 'subtitle':this.format_power_figure(item.returnValues.p6), 'barwidth':this.calculate_bar_width(item.returnValues.p6), 'number':this.format_account_balance_figure(item.returnValues.p6), 'barcolor':'', 'relativepower':'wei', })}
                    </div>


                    {this.render_detail_item('0')}

                    {this.render_detail_item('3',{'details':start_and_end(item.returnValues.p10), 'title':'Coinbase Address','size':'l'})}
                    <div style={{height: 10}}/>

                    {/* {this.render_detail_item('3',{'details':start_and_end(item.returnValues.p11), 'title':'Block Difficulty','size':'l'})} */}
                    <div style={{height: 10}}/>
                </div>
            )
        }
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
                <ViewGroups item_id={item_id} object_data={object_data}  theme={this.props.theme} width={width}/>
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
            return num+ ' sec'
        }
        else if(diff < 60*60){//less than 1 hour
            var num = Math.floor(diff/(60));
            var s = num > 1 ? 's': '';
            return num + ' min' 
        }
        else if(diff < 60*60*24){//less than 24 hours
            var num = Math.floor(diff/(60*60));
            var s = num > 1 ? 's': '';
            return num + ' hr' + s;
        }
        else if(diff < 60*60*24*7){//less than 7 days
            var num = Math.floor(diff/(60*60*24));
            var s = num > 1 ? 's': '';
            return num + ' dy' + s;
        }
        else if(diff < 60*60*24*7*53){//less than 1 year
            var num = Math.floor(diff/(60*60*24*7));
            var s = num > 1 ? 's': '';
            return num + ' wk' + s;
        }
        else {//more than a year
            var num = Math.floor(diff/(60*60*24*7*53));
            var s = num > 1 ? 's': '';
            return number_with_commas(num) + ' yr' + s;
        }
    }


}




export default ViewTransactionLogPage;