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
import NumberPicker from './../components/number_picker';
import TextInput from './../components/text_input';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function start_and_end(str) {
    if (str.length > 13) {
      return str.substr(0, 6) + '...' + str.substr(str.length-6, str.length);
    }
    return str;
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
  

class BidInAuctionPage extends Component {
    
    state = {
        selected: 0, storefront_item: null, id:makeid(8), get_bid_in_auction_tags_object: this.get_bid_in_auction_tags_object(), e5:this.props.app_state.selected_e5, selected_variant:null,
        type:this.props.app_state.loc['3076']/* 'auction-bid' */, entered_indexing_tags:[this.props.app_state.loc['3076c']/* 'auction' */, this.props.app_state.loc['3076d']/* 'bid' */, this.props.app_state.loc['1096']/* 'buy' */], amount:0
    };


    get_bid_in_auction_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['3076']/* 'auction-bid' */], [1]
            ],
        };
    }

    set_data(object){
        this.setState({storefront_item: object, e5: object['e5']})
    }





    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px', 'overflow-x':'hidden'}}>
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.get_bid_in_auction_tags_object} tag_size={'l'} when_tags_updated={this.when_get_bid_in_auction_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img alt="" className="text-end" onClick={()=>this.finish_creating_auction_bid_item()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div>

                {this.render_everything()}
                
            </div>
        )
    }

    when_get_bid_in_auction_tags_object_updated(tag_obj){
        this.setState({get_bid_in_auction_tags_object: tag_obj})
    }

    render_everything(){
        var size = this.props.app_state.size
        if(this.state.storefront_item == null) return;

        if(size == 's'){
            return(
                <div>
                    {this.render_content()}
                    {this.render_detail_item('0')}
                    {this.render_content2()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_content()}
                        {this.render_empty_views(3)}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_content2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_content()}
                        {this.render_empty_views(3)}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_content2()}
                    </div>
                </div>
                
            )
        }
    }



    render_content(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1100']/* 'Item Variants' */, 'details':this.props.app_state.loc['1101']/* 'Pick the variant you want to purchase' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_item_variants()}
                {this.render_selected_variant()}
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3076a']/* 'Cast Your Bid' */, 'details':this.props.app_state.loc['3076b']/* 'Set the amount you wish to pay for it.' */, 'size':'l'})}
                <div style={{height:10}}/>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_price_amount.bind(this)} theme={this.props.theme} power_limit={72}/>
                
            </div>
        )
    }

    render_content2(){
        return(
            <div>
                {this.render_variant_price_data()}
                {this.render_entry_fees()}
            </div>
        )
    }

    when_price_amount(amount){
        this.setState({amount: amount})
    }

    render_item_variants(){
        var items = [].concat(this.state.storefront_item['ipfs'].variants)
        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=> this.when_variant_item_clicked(item)}>
                            {this.render_variant_item_if_selected(item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_variant_item_if_selected(item){
        var composition_type = this.get_composition_type()

        if(this.state.selected_variant == item){
            return(
                <div>
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '0px 5px 3px 5px'}}/>
                    {this.render_item(item, composition_type)}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_item(item, composition_type)}
                </div>
            )
        }
    }

    render_item(variant_in_store, composition_type){
        if(variant_in_store['image_data']['data'] != null && variant_in_store['image_data']['data']['images'] != null && variant_in_store['image_data']['data']['images'].length > 0){
            var image = variant_in_store['image_data']['data']['images'][0]
            return(
                <div>
                    {this.render_detail_item('8',{'title':this.format_account_balance_figure(variant_in_store['available_unit_count'])+' '+composition_type, 'details':this.truncate(variant_in_store['variant_description'], 15),'size':'s', 'image':image, 'border_radius':'4px', 'image_width':'auto'})}
                </div>
            )
        }else{
            var image = this.props.app_state.static_assets['empty_image']
            return(
                <div>
                    {this.render_detail_item('8',{'title':this.format_account_balance_figure(variant_in_store['available_unit_count'])+' '+composition_type, 'details':this.truncate(variant_in_store['variant_description'], 15),'size':'s', 'image':image, 'border_radius':'4px', 'image_width':'auto'})}
                </div>
            )
        }
    }

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }

    when_variant_item_clicked(item){
        if(this.selected_variant == item){
            this.setState({selected_variant: null})
        }else{
            this.setState({selected_variant: item, purchase_unit_count: 1})
        }
        
    }

    render_selected_variant(){
        var item = this.state.selected_variant
        if(item != null){
            return(
                <div>
                    <div style={{height:10}}/>
                    {this.render_detail_item('4', {'text':item['variant_description'], 'textsize':'13px', 'font':this.props.app_state.font})}
                    <div style={{height:3}}/>
                    <div style={{padding:'0px 0px 0px 0px'}}>
                        {this.render_detail_item('9', item['image_data']['data'])}
                    </div>
                    <div style={{height:5}}/>
                    {this.render_detail_item('3', {'title':this.format_account_balance_figure(item['available_unit_count']), 'details':this.props.app_state.loc['1107']/* 'Number of Units' */, 'size':'l'})}
                </div>
            )
        }
    }

    render_variant_price_data(){
        var variant = this.state.selected_variant
        if(variant == null) return;
        var items = [].concat(this.calculate_price_data(variant['price_data']))
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3076f']/* 'Set Bid Amounts.' */, 'details':this.props.app_state.loc['3076g']/* The amount youve currently set for your next bid in their respective denominations. */, 'size':'l'})}
                <div style={{height:10}}/>
                {items.map((item, index) => (
                    <div style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']],})}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    render_entry_fees(){
        const entry_fees = this.state.storefront_item['ipfs'].price_data2
        var items = [].concat(entry_fees)
        if(items.length == 0 && !this.has_sender_already_cast_bid()) return;
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3076h']/* 'Auction Entry Fee' */, 'details':this.props.app_state.loc['3076i']/* The fee set by the auctioneer to participate in the auction. */, 'size':'l'})}
                <div style={{height:10}}/>
                {items.map((item, index) => (
                    <div style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']],})}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    calculate_price_data(items){
        const storefront_item = this.state.storefront_item
        const minimum_bidding_proportion = storefront_item['ipfs'].minimum_bidding_proportion
        var price_data = []

        items.forEach(price_data => {
            const amount = price_data['amount']
            const exchange_id = price_data['id']
            const minimum_increment = minimum_bidding_proportion > 0 ? bigInt(amount).multiply(bigInt(minimum_bidding_proportion)).divide(bigInt('1e18')) : 0
            var minimum_amount = bigInt(amount).plus(bigInt(minimum_increment))
            
            if(bigInt(minimum_increment).lesser(1)){
                if(this.state.amount > 0){
                    minimum_amount = bigInt(minimum_amount).plus(bigInt(this.state.amount))
                }
                else{
                    minimum_amount = bigInt(minimum_amount).plus(bigInt(1))
                }
            }
            price_data.push({'id':exchange_id, 'amount':minimum_amount})
        });

        return price_data
    }

    has_sender_already_cast_bid(){
        const object = this.state.storefront_item
        var my_account = this.props.app_state.user_account_id[object['e5']] == null ? 1 : this.props.app_state.user_account_id[object['e5']]

        var includes = this.props.app_state.storefront_auction_bids[object['e5_id']].find(e => e['event'].returnValues.p2/* sender_acc_id */ == my_account)

        const stack_transactions = this.props.app_state.stack_items
        for(var i=0; i<stack_transactions.length; i++){
            if(stack_transactions[i].type == this.props.app_state.loc['3076']/* 'auction-bid' */ && stack_transactions[i].storefront_item['e5_id'] == object['e5_id']){
                return true
            }
        }

        return includes != null
    }






    finish_creating_auction_bid_item(){
        const payment_data_object = this.calculate_total_price_data()
        const payment_data = payment_data_object.final_payment_items
        const entry_fee = payment_data_object.entry_fee_data
        const bidd_data = payment_data_object.bidd_data
        
        if(this.state.selected_variant == null){
            this.props.notify(this.props.app_state.loc['1109']/* 'Pick one variant first.' */, 3500)
        }
        else if(this.state.amount == 0){
            this.props.notify(this.props.app_state.loc['1110']/* 'Please specify an amount of the item your adding.' */, 5200)
        }
        else if(!this.can_afford_purchase(payment_data)){
            this.props.notify(this.props.app_state.loc['3076e']/* 'Your balance is insufficient to fulfil that bid.' */, 5900)
        }
        else{
            this.setState({payment_data: payment_data, entry_fee: entry_fee, bidd_data:bidd_data})
            var me = this
            setTimeout(function() {
                me.props.add_bid_in_auction_transaction_to_stack(me.state)
                me.setState({amount: 0, selected_variant:null})
            }, (1 * 1000));
            
            this.props.notify(this.props.app_state.loc['18']/* 'Transaction added to Stack' */, 1700)
        }
    }

    calculate_total_price_data(){
        const storefront_item = this.state.storefront_item
        const minimum_bidding_proportion = storefront_item['ipfs'].minimum_bidding_proportion
        var variant = this.state.selected_variant
        var items = variant['price_data']

        const price_data = {}
        const entry_fee_data = {}
        const bidd_data_object = {}

        items.forEach(price_data_item => {
            const amount = price_data_item['amount']
            const exchange_id = price_data_item['id']
            const minimum_increment = minimum_bidding_proportion > 0 ? bigInt(amount).multiply(bigInt(minimum_bidding_proportion)).divide(bigInt('1e18')) : 0
            var minimum_amount = bigInt(amount).plus(bigInt(minimum_increment))
            
            if(bigInt(minimum_increment).lesser(1)){
                if(this.state.amount > 0){
                    minimum_amount = bigInt(minimum_amount).plus(bigInt(this.state.amount))
                }
                else{
                    minimum_amount = bigInt(minimum_amount).plus(bigInt(1))
                }
            }
            if(price_data[exchange_id] == null){
                price_data[exchange_id] = bigInt(0)
                bidd_data_object[exchange_id] = bigInt(0)
            }
            price_data[exchange_id] = bigInt(price_data[exchange_id]).plus(minimum_amount)
            bidd_data_object[exchange_id] = bigInt(price_data[exchange_id]).plus(minimum_amount)
        });

        if(!this.has_sender_already_cast_bid()){
            storefront_item['ipfs'].price_data2.forEach(price_data_item => {
                const amount = price_data_item['amount']
                const exchange_id = price_data_item['id']

                if(price_data[exchange_id] == null){
                    price_data[exchange_id] = bigInt(0)
                }
                if(entry_fee_data[exchange_id] == null){
                    entry_fee_data[exchange_id] = bigInt(0)
                }
                price_data[exchange_id] = bigInt(price_data[exchange_id]).plus(amount)
                entry_fee_data[exchange_id] = bigInt(amount)
            });
        }

        const final_payment_items = []
        const exchanges = Object.keys(price_data)
        exchanges.forEach(exchange_id => {
            final_payment_items.push({'id':exchange_id, 'amount':price_data[exchange_id]})
        });

        const bidd_data = []
        const bid_exchanges = Object.keys(bidd_data_object)
        bid_exchanges.forEach(exchange_id => {
            bidd_data.push({'id':exchange_id, 'amount':bidd_data_object[exchange_id]})
        });

        return { final_payment_items, entry_fee_data, bidd_data }
    }

    can_afford_purchase(payment_data){
        var can_afford = true;
        for(var i=0; i<payment_data.length; i++){
            var item = payment_data[i]['id']
            var item_price = payment_data[i]['amount']

            var token_balance = this.props.calculate_actual_balance(this.state.e5, item)
            token_balance = bigInt(token_balance).minus(this.get_debit_balance_in_stack(item, this.state.e5))

            if(bigInt(token_balance).lesser(bigInt(item_price))){
                can_afford = false
            }
        }

        return can_afford
    }






    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
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
                                    <img alt="" src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
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
                <ViewGroups uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
            </div>
        )
    }

    get_all_sorted_objects(object){
        var all_objects = []
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]
            var e5_objects = object[e5]
            if(e5_objects != null){
                all_objects = all_objects.concat(e5_objects)
            }
        }

        return this.sortByAttributeDescending(all_objects, 'timestamp')
    }

    sortByAttributeDescending(array, attribute) {
      return array.sort((a, b) => {
          if (a[attribute] < b[attribute]) {
          return 1;
          }
          if (a[attribute] > b[attribute]) {
          return -1;
          }
          return 0;
      });
    }

    get_all_sorted_objects_mappings(object){
        var all_objects = {}
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]
            var e5_objects = object[e5]
            var all_objects_clone = structuredClone(all_objects)
            all_objects = { ...all_objects_clone, ...e5_objects}
        }

        return all_objects
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

    get_number_width(number){
        if(number == null) return '0%'
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
    }


}




export default BidInAuctionPage;