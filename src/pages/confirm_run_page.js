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

class template extends Component {
    
    state = {
        selected: 0, run_data:null
    };

    render(){
        return(
            <div style={{'margin':'10px 10px 0px 10px'}}>
                {this.render_detail_item('3',{'title':'Transaction Confirmation', 'details':'Are you sure you want to make this run?','size':'l'})}

                {this.render_detail_item('0')}
                {this.render_everything()}
            </div>
        )
    }

    set_data(run_data){
        this.setState({run_data:run_data})
    }


    render_everything(){
        if(this.state.run_data != null){
            var txs = this.props.app_state.stack_items
            var gas_limit = this.state.run_data['run_gas_limit']
            var estimated_gas_to_be_consumed = this.props.app_state.calculated_gas_figures[this.props.app_state.selected_e5] == null ? 0 : this.props.app_state.calculated_gas_figures[this.props.app_state.selected_e5]
            var gas_price = this.state.run_data['run_gas_price']
            var run_expiry_duration = this.state.run_data['run_expiry_duration']

            return(
                <div>
                    {this.render_detail_item('3',{'title':txs.length, 'details':'Transaction Stack Size','size':'l'})}
                    <div style={{height: 10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':'Gas Limit', 'subtitle':this.format_power_figure(gas_limit), 'barwidth':this.calculate_bar_width(gas_limit), 'number':this.format_account_balance_figure(gas_limit), 'barcolor':'', 'relativepower':'gas', })}
                    </div>
                    <div style={{height: 10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':'Estimated Gas to be Consumed', 'subtitle':this.format_power_figure(estimated_gas_to_be_consumed), 'barwidth':this.calculate_bar_width(estimated_gas_to_be_consumed), 'number':this.format_account_balance_figure(estimated_gas_to_be_consumed), 'barcolor':'', 'relativepower':'gas', })}
                    </div>
                    <div style={{height: 10}}/>


                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':'Gas Price in Gwei', 'subtitle':this.format_power_figure(gas_price/10**9), 'barwidth':this.calculate_bar_width(gas_price/10**9), 'number':this.format_account_balance_figure(gas_price/10**9), 'barcolor':'', 'relativepower':'gwei', })}

                        {this.render_detail_item('2', { 'style':'l', 'title':'Gas Price in wei', 'subtitle':this.format_power_figure(gas_price), 'barwidth':this.calculate_bar_width(gas_price), 'number':this.format_account_balance_figure(gas_price), 'barcolor':'', 'relativepower':'gwei', })}
                    </div>

                    <div style={{height: 10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={()=> this.fetch_gas_figures()}>
                        {this.render_detail_item('2', { 'style':'l', 'title':'Wallet Impact', 'subtitle':this.format_power_figure(this.calculate_wallet_impact_figure()), 'barwidth':this.calculate_bar_width(this.calculate_wallet_impact_figure()), 'number':this.calculate_wallet_impact_figure()+'%', 'barcolor':'', 'relativepower':'proportion', })}
                    </div>

                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.get_time_diff(run_expiry_duration), 'details':'Run Expiry Duration', 'size':'l'})}
                    
                    <div style={{height: 10}}/>

                    <div style={{'padding': '5px'}} onClick={()=> this.props.start_run()}>
                        {this.render_detail_item('5', {'text':'Run Transactions', 'action':''})}
                    </div>

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    calculate_wallet_impact_figure(){
        var estimated_gas_to_be_consumed = this.props.app_state.calculated_gas_figures[this.props.app_state.selected_e5] == null ? 0 : this.props.app_state.calculated_gas_figures[this.props.app_state.selected_e5]
        
        var gas_price = this.state.run_data['run_gas_price']
        var total_ether_to_be_spent = estimated_gas_to_be_consumed * gas_price
        var my_balance = this.props.app_state.account_balance[this.props.app_state.selected_e5]

        if(my_balance == 0) return 0

        var x = (total_ether_to_be_spent / my_balance) * 100
        return Math.round(x * 1000) / 1000
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




export default template;