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
import TextInput from './../components/text_input';

// import Letter from './../assets/letter.png';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class ConfirmRunPage extends Component {
    
    state = {
        selected: 0, run_data:null, get_confirm_run_tags_object:this.get_confirm_run_tags_object(), cypher_passcode:'',
    };


    get_confirm_run_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1092a']/* 'confirm-run' */, this.props.app_state.loc['1092b']/* 'transactions' */], [1]
            ],
        };
    }

    render(){
        return(
            <div style={{'margin':'10px 10px 0px 10px'}}>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_confirm_run_tags_object} tag_size={'l'} when_tags_updated={this.when_get_confirm_run_tags_object_updated.bind(this)} theme={this.props.theme}/>

                {this.render_everything()}
            </div>
        )
    }

    when_get_confirm_run_tags_object_updated(tag_obj){
        this.setState({get_confirm_run_tags_object: tag_obj})
    }

    set_data(run_data){
        this.setState({run_data:run_data})
    }


    render_everything(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_small_screen_pickers()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_confirm_run()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_stacked_transactions()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_confirm_run()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_stacked_transactions()}
                    </div>
                </div>
                
            )
        }
    }

    render_small_screen_pickers(){
        var selected_page = this.get_selected_item(this.state.get_confirm_run_tags_object, 'e')

        if(selected_page == this.props.app_state.loc['1092a']/* 'confirm-run' */){
            return(
                <div>
                    {this.render_confirm_run()}
                </div>
            )
        }
        else if(selected_page == this.props.app_state.loc['1092b']/* 'transactions' */){
            return(
                <div>
                    {this.render_stacked_transactions()}
                </div>
            )
        }
    }
    


    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }


    render_confirm_run(){
        if(this.state.run_data != null){
            var txs = this.props.app_state.stack_items
            var gas_limit = this.state.run_data['run_gas_limit']
            var estimated_gas_to_be_consumed = this.props.app_state.calculated_gas_figures[this.props.app_state.selected_e5] == null ? 0 : this.props.app_state.calculated_gas_figures[this.props.app_state.selected_e5]
            var gas_price = this.state.run_data['run_gas_price']
            var run_expiry_duration = this.state.run_data['run_expiry_duration']

            return(
                <div>
                    {this.render_detail_item('3',{'title':this.props.app_state.loc['1079']/* 'Transaction Confirmation' */, 'details':this.props.app_state.loc['1080']/* 'Are you sure you want to make this run?' */,'size':'l'})}

                    {this.render_detail_item('0')}

                    {this.render_detail_item('3',{'title':txs.length, 'details':this.props.app_state.loc['1083']/* 'Transaction Stack Size' */,'size':'l'})}
                    <div style={{height: 10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1084']/* 'Gas Limit' */, 'number':gas_limit, 'relativepower':this.props.app_state.loc['1085']/* 'gas' */})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1084']/* 'Gas Limit' */, 'subtitle':this.format_power_figure(gas_limit), 'barwidth':this.calculate_bar_width(gas_limit), 'number':this.format_account_balance_figure(gas_limit), 'barcolor':'', 'relativepower':this.props.app_state.loc['1085']/* 'gas' */, })}
                    </div>
                    <div style={{height: 10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1086']/* 'Estimated Gas to be Consumed' */, 'number':estimated_gas_to_be_consumed, 'relativepower':this.props.app_state.loc['1085']/* 'gas' */})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1086']/* 'Estimated Gas to be Consumed' */, 'subtitle':this.format_power_figure(estimated_gas_to_be_consumed), 'barwidth':this.calculate_bar_width(estimated_gas_to_be_consumed), 'number':this.format_account_balance_figure(estimated_gas_to_be_consumed), 'barcolor':'', 'relativepower':this.props.app_state.loc['1085']/* 'gas' */, })}
                    </div>
                    <div style={{height: 10}}/>


                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1088']/* 'Gas Price in wei' */, 'number':gas_price, 'relativepower':'wei'})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1087']/* 'Gas Price in Gwei' */, 'subtitle':this.format_power_figure(gas_price/10**9), 'barwidth':this.calculate_bar_width(gas_price/10**9), 'number':(gas_price/10**9), 'barcolor':'', 'relativepower':'gwei', })}

                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1088']/* 'Gas Price in wei' */, 'subtitle':this.format_power_figure(gas_price), 'barwidth':this.calculate_bar_width(gas_price), 'number':this.format_account_balance_figure(gas_price), 'barcolor':'', 'relativepower':'wei', })}
                    </div>

                    <div style={{height: 10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={()=> this.fetch_gas_figures()}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1089']/* 'Wallet Impact' */, 'subtitle':this.format_power_figure(this.calculate_wallet_impact_figure()), 'barwidth':this.calculate_bar_width(this.calculate_wallet_impact_figure()), 'number':this.calculate_wallet_impact_figure()+'%', 'barcolor':'', 'relativepower':this.props.app_state.loc['1090']/* 'proportion' */, })}
                    </div>

                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.get_time_diff(run_expiry_duration), 'details':this.props.app_state.loc['1091']/* 'Run Expiry Duration' */, 'size':'l'})}


                    {this.should_ask_for_password() == true && (
                        <div>
                            <div style={{height: 10}}/>
                            {this.render_detail_item('3', {'title':this.props.app_state.loc['2954m']/* 'Wallet Password.' */, 'details':this.props.app_state.loc['2954n']/* 'You locked your wallet. Please set the lock password used here.' */, 'size':'l'})}
                            <div style={{height: 10}}/>
    
                            <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3055nm']/* 'Passcode...' */} when_text_input_field_changed={this.when_passcode_input_field_changed.bind(this)} text={this.state.cypher_passcode} theme={this.props.theme} adjust_height={false} type={'password'} />
                            <div style={{height: 10}}/>
                        </div>
                    )}
                    
                    <div style={{height: 10}}/>
                    <div style={{'padding': '5px'}} onClick={()=> this.start_run()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['1092']/* 'Run Transactions' */, 'action':''})}
                    </div>

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    when_passcode_input_field_changed(text){
        if(this.props.app_state.locked_wallet_hashed_password != '') this.setState({cypher_passcode: text})
    }

    start_run(){
        if(this.state.cypher_passcode.trim() == ''){
            this.props.notify(this.props.app_state.loc['1593mg']/* 'You need to set your password.' */, 4000)
        }
        else if(!this.does_password_match_hash(this.state.cypher_passcode.trim())){
            this.props.notify(this.props.app_state.loc['2954o']/* 'The password you\'ve set is incorrect.' */, 4000)
        }
        else{
            this.props.start_run()
        }
    }

    does_password_match_hash(passcode){
        if(this.props.app_state.locked_wallet_hashed_password != ''){
            const provided_hash = this.props.hash_data_with_randomizer(passcode);
            return provided_hash == this.props.app_state.locked_wallet_hashed_password
        }
        else return true
    }

    should_ask_for_password(){
        if(this.props.app_state.locked_wallet_hashed_password != ''){
            const txs = this.props.app_state.stack_items
            const e5 = this.props.app_state.selected_e5
            var should_include = false;
            for(var i=0; i<txs.length; i++){
                if(!this.props.app_state.hidden.includes(txs[i]) && txs[i].e5 == e5){
                    if(
                        txs[i].type == this.props.app_state.loc['1311']/* 'contract' */ ||
                        txs[i].type == this.props.app_state.loc['946']/* 'buy-sell' */ ||
                        txs[i].type == this.props.app_state.loc['1018']/* 'transfer' */ ||
                        txs[i].type == this.props.app_state.loc['1']/* 'enter-contract' */||
                        txs[i].type == this.props.app_state.loc['312']/* 'proposal' */ ||
                        txs[i].type == this.props.app_state.loc['796']/* 'vote' */ ||
                        txs[i].type == this.props.app_state.loc['862']/* 'pay-subscription' */ ||
                        txs[i].type == this.props.app_state.loc['821']/* 'cancel-subscription' */ ||
                        txs[i].type == this.props.app_state.loc['907']/* 'exchange-transfer' */ ||
                        txs[i].type == this.props.app_state.loc['930']/* 'freeze/unfreeze' */ ||
                        txs[i].type == this.props.app_state.loc['880']/* 'authmint' */ ||
                        txs[i].type == this.props.app_state.loc['1509']/* 'mail-messages' */ ||
                        txs[i].type == this.props.app_state.loc['285']/* 'mail' */ ||
                        this.does_message_contain_transfers_if_message(txs[i]) ||
                        txs[i].type == this.props.app_state.loc['1499']/* 'direct-purchase' */ ||
                        txs[i].type == this.props.app_state.loc['1155']/* 'award' */ ||
                        txs[i].type == this.props.app_state.loc['898']/* 'depthmint' */ ||
                        txs[i].type == this.props.app_state.loc['2884']/* 'royalty-payouts' */ ||
                        txs[i].type == this.props.app_state.loc['2896']/* 'upcoming-subscriptions' */ ||
                        txs[i].type == this.props.app_state.loc['2962']/* 'buy-album' */ ||
                        txs[i].type == this.props.app_state.loc['a2962a']/* 'buy-video' */ ||
                        txs[i].type == this.props.app_state.loc['3031']/* 'buy-storage' */ ||
                        txs[i].type == this.props.app_state.loc['3068ac']/* 'iTransfer' */ ||
                        txs[i].type == this.props.app_state.loc['3071j']/* 'bill-payment' */ ||
                        txs[i].type == this.props.app_state.loc['3073']/* 'vote-poll' */ ||
                        txs[i].type == this.props.app_state.loc['753']/* 'edit-channel' */ || 
                        txs[i].type == this.props.app_state.loc['763']/* 'edit-contractor' */ || 
                        txs[i].type == this.props.app_state.loc['764']/* 'edit-job' */ || 
                        txs[i].type == this.props.app_state.loc['765']/* 'edit-post' */ || 
                        txs[i].type == this.props.app_state.loc['766']/* 'edit-storefront' */ || 
                        txs[i].type == this.props.app_state.loc['767']/* 'edit-token' */ || 
                        txs[i].type == this.props.app_state.loc['2739']/* 'edit-proposal' */ || 
                        txs[i].type == this.props.app_state.loc['2975']/* 'edit-audio' */ || 
                        txs[i].type == this.props.app_state.loc['3023']/* 'edit-video' */|| 
                        txs[i].type == this.props.app_state.loc['3030']/* 'edit-nitro' */ ||
                        txs[i].type == this.props.app_state.loc['3072h']/* 'edit-poll' */ ||
                        txs[i].type == this.props.app_state.loc['2117p']/* 'creator-payout' */ ||
                        txs[i].type == this.props.app_state.loc['3055df']/* 'nitro-renewal' */ ||
                        txs[i].type == this.props.app_state.loc['3076']/* 'auction-bid' */ ||
                        txs[i].type == this.props.app_state.loc['3077']/* 'fulfil-bids' */ ||
                        txs[i].type == this.props.app_state.loc['3055fg']/* 'vote_all' */ ||
                        txs[i].type == this.props.app_state.loc['3055gf']/* 'transfer-alias' */ ||
                        txs[i].type == this.props.app_state.loc['2642bm']/* 'order-payment' */ ||
                        txs[i].type == this.props.app_state.loc['3092']/* 'purchase-credits' */ ||
                        txs[i].type == this.props.app_state.loc['1632o']/* 'finish-payment' */ ||
                        txs[i].type == this.props.app_state.loc['3093']/* 'configure-obligations' */ ||
                        txs[i].type == this.props.app_state.loc['3094']/* 'exchange-deposit' */ ||
                        txs[i].type == this.props.app_state.loc['1593lq']/* 'fulfil-obligations' */ ||
                        txs[i].type == this.props.app_state.loc['b311a']/* video */ ||
                        txs[i].type == this.props.app_state.loc['a311a']/* audio */ ||
                        txs[i].type == this.props.app_state.loc['a273a']/* 'nitro' */ ||
                        txs[i].type == this.props.app_state.loc['19']/* 'exit-contract' */ ||
                        txs[i].type == this.props.app_state.loc['297']/* 'post' */ ||
                        txs[i].type == this.props.app_state.loc['760']/* 'job' */
                    ){
                        should_include = true
                    }
                }
            }
            return should_include
        }
        else{
            return false
        }
    }

    does_message_contain_transfers_if_message(tx){
        if(
            tx.type == this.props.app_state.loc['1510']/* 'channel-messages' */ ||
            tx.type == this.props.app_state.loc['1511']/* 'post-messages' */ ||
            tx.type == this.props.app_state.loc['1514']/* 'job-messages' */ ||
            tx.type == this.props.app_state.loc['1515']/* 'proposal-messages' */ ||
            tx.type == this.props.app_state.loc['1501']/* 'bag-messages' */ ||
            tx.type == this.props.app_state.loc['1502']/* 'storefront-messages' */ ||
            tx.type == this.props.app_state.loc['1505']/* 'job-request-messages' */ ||
            tx.type == this.props.app_state.loc['1593cc']/* 'audio-messages' */ || 
            tx.type == this.props.app_state.loc['1593ct']/* 'video-messages' */ || 
            tx.type == this.props.app_state.loc['1593cu']/* 'nitro-messages' */ ||
            tx.type == this.props.app_state.loc['3030b']/* 'video-comment-messages' */ ||
            tx.type == this.props.app_state.loc['3097e']/* 'purchase-request-messages' */
        ){
            for(var m=0; m<tx.messages_to_deliver.length; m++){
                if(tx.messages_to_deliver[m]['award_amount'] != 0){
                    return true;
                }
            }
            return false;
        }
        else{
            return false
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



    render_stacked_transactions(){
        var items = [].concat(this.get_stacked_transactions())
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height-130;
        var size = this.props.app_state.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={this.props.app_state.theme['letter']} style={{height:60 ,width:'auto'}} />
                                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }else{
            return(
                <div>
                    <div style={{}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 2px 2px 2px'}}>
                                    {this.render_stack_item(item, index)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                
            )
        }

    }

    get_stacked_transactions(){
        var items = [].concat(this.props.app_state.stack_items)
        var return_items = []

        items.forEach(tx => {
            if(!this.props.app_state.hidden.includes(tx) && tx.e5 == this.props.app_state.selected_e5){
                return_items.push(tx)
            }
        });

        return return_items
    }

    render_stack_item(item, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var op = this.props.app_state.hidden.includes(item) ? 0.5 : 1.0
        var txt = this.props.app_state.hidden.includes(item) ? 'show' : 'hide'
        // return(
        //     <div style={{height:'auto', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color, 'margin':'0px 0px 10px 0px', opacity: op}}>
        //         <div style={{'padding': '5px 0px 5px 5px'}}>
        //             {this.render_detail_item('1',{'active_tags':[item.e5].concat(item.entered_indexing_tags), 'indexed_option':'indexed', 'when_tapped':''})}
        //             <div style={{height: 10}}/>

        //             {this.render_detail_item('3',{'details':this.props.app_state.loc['1446']/* 'Stack ID ' */, 'title':item.id,'size':'s'})}
        //             <div style={{height: 10}}/>
        //             {this.render_detail_item('3',{'title':item.type, 'details':this.props.app_state.loc['1447']/* 'Type' */,'size':'s'})}
        //         </div>         
        //     </div>
        // )
        return(
            <div style={{'margin': '2px 0px 2px 0px', opacity: op}}>
                {this.render_detail_item('3',{'title':item.e5+' • '+item.type, 'details':this.props.app_state.loc['1446']/* 'Stack ID: ' */+item.id,'size':'l'})}
            </div>
        )
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
            var num = parseInt(diff)
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




export default ConfirmRunPage;