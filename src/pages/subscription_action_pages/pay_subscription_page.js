import React, { Component } from 'react';
import ViewGroups from '../../components/view_groups'
import Tags from '../../components/tags';
import NumberPicker from '../../components/number_picker';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

class PaySubscriptionPage extends Component {
    
    state = {
        selected: 0,id:makeid(8), type:'pay-subscription', entered_indexing_tags:['pay', 'subscription'],
        subscription_item:{'data':[[],[0,0,0,0,0,0,0], [],[],[]]}, pay_subscription_title_tags_object:this.get_pay_subscription_title_tags_object(), time_units:0
    };

    get_pay_subscription_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','pay-subscription'], [1]
            ],
        };
    }

    render(){
        return(
            <div style={{'padding':'10px 20px 0px 10px'}}>

                <div className="row">
                    <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                        <Tags page_tags_object={this.state.pay_subscription_title_tags_object} tag_size={'l'} when_tags_updated={this.when_pay_subscription_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'padding': '5px'}} onClick={()=>this.finish()}>
                            {this.render_detail_item('5', {'text':'Finish', 'action':''})}
                        </div>
                    </div>
                </div>

                {this.render_everything()}

            </div>
        )
    }

    when_pay_subscription_title_tags_object_updated(tag_obj){
        this.setState({pay_subscription_title_tags_object: tag_obj})
    }




    render_everything(){
        var subscription_config = this.state.subscription_item['data'][1]
        var time_unit = subscription_config[5] == 0 ? 60*53 : subscription_config[5]
        return(
            <div>
                {this.render_detail_item('4', {'font':'Sans-serif', 'textsize':'13px', 'text':'Pay for the subscription ID: '+this.state.subscription_item['id']})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.get_time_diff(time_unit), 'details':'Time Unit', 'size':'s'})}

                <div style={{height:20}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Time Units', 'subtitle':this.format_power_figure(this.state.time_units), 'barwidth':this.calculate_bar_width(this.state.time_units), 'number':this.format_account_balance_figure(this.state.time_units), 'barcolor':'', 'relativepower':this.get_time_units_time(), })}
                </div>

                <NumberPicker number_limit={bigInt('1e36')} when_number_picker_value_changed={this.when_time_units_set.bind(this)} theme={this.props.theme} power_limit={27}/>

                {this.render_buy_token_uis(this.state.subscription_item['data'][2], this.state.subscription_item['data'][3], this.state.subscription_item['data'][4])}

                {this.render_detail_item('0')}
                {this.render_detail_item('0')}
            </div>
        )
    }

    get_time_units_time(){
        var subscription_config = this.state.subscription_item['data'][1]
        var time_unit = subscription_config[5] == 0 ? 60*53 : subscription_config[5]
        var final_time = bigInt(time_unit).multiply(this.state.time_units)
        return this.get_time_diff(final_time)
    }

    when_time_units_set(number){
        this.setState({time_units: number})
    }


    render_buy_token_uis(buy_tokens, buy_amounts, buy_depths){
        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                    {buy_tokens.map((item, index) => (
                        <li style={{'padding': '1px'}}>
                            {this.render_detail_item('2', {'style':'l','title':'Token ID: '+item, 'subtitle':'depth:'+buy_depths[index], 'barwidth':this.calculate_bar_width(this.calculate_final_amount(buy_amounts[index])), 'number':this.format_account_balance_figure(this.calculate_final_amount(buy_amounts[index])), 'relativepower':this.props.app_state.token_directory[item]})}
                        </li>
                    ))}
                </ul>
            </div>
            
        )
    }

    calculate_final_amount(price){
        return bigInt(price).multiply(this.state.time_units)
    }



    set_subscription(subscription_item){
        if(this.state.subscription_item['id'] != subscription_item['id']){
            this.setState({
                selected: 0,id:makeid(8), type:'pay-subscription', entered_indexing_tags:['pay', 'subscription'],
                subscription_item:{'data':[[],[0,0,0,0,0,0,0], [],[],[]]}, pay_subscription_title_tags_object:this.get_pay_subscription_title_tags_object(), time_units:0
            })
        }
        this.setState({subscription_item: subscription_item})
    }

    finish(){
        var time_units_picked = this.state.time_units
        if(time_units_picked == 0){
            this.props.notify('set a valid time unit amount!', 700)
        }else{
            this.props.add_pay_subscription_to_stack(this.state)
            this.props.notify('transaction added to stack', 700);
        }
    }







    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
            </div>
        )

    }

    format_power_figure(amount){
        var power = 'e72'
        if(amount < bigInt('1e9')){
            power = 'e9'
        }
        else if(amount < bigInt('1e18')){
            power = 'e18'
        }
        else if(amount < bigInt('1e36')){
            power = 'e36'
        }
        else{
            power = 'e72'
        }
        return power
    }

    calculate_bar_width(amount){
        var figure = ''
        if(amount == null){
            amount = 0
        }
        if(amount < bigInt('1e9')){
            figure = Math.round((amount.toString().length * 100) / bigInt('1e9').toString().length)
        }
        else if(amount < bigInt('1e18')){
            figure = Math.round((amount.toString().length * 100) / bigInt('1e18').toString().length)
        }
        else if(amount < bigInt('1e36')){
            figure = Math.round((amount.toString().length * 100) / bigInt('1e36').toString().length)
        }
        else{
            figure = Math.round((amount.toString().length * 100) / bigInt('1e72').toString().length)
        }

        return figure+'%'
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




export default PaySubscriptionPage;