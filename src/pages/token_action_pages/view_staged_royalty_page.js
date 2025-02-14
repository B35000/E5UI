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
import ViewGroups from '../../components/view_groups'
import Tags from '../../components/tags';

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

class ViewStagedRoyaltyPage extends Component {
    
    state = {
        selected: 0,
        id:makeid(8), type: this.props.app_state.loc['2884']/* 'royalty-payouts' */, entered_indexing_tags:[this.props.app_state.loc['2847']/* 'stage' */, this.props.app_state.loc['2848']/* 'royalty' */, this.props.app_state.loc['2849']/* 'payouts' */], token_item: {'balance':1, 'data':[[],[],[],[],[]], 'id':0},

        get_view_staged_royalty_page_tags_object:this.get_view_staged_royalty_page_tags_object(), selected_batches:[],
    };


    set_data(staging_data, token_item){
        if(this.state.token_item['id'] != token_item['id']){
            this.setState({
                selected: 0, id:makeid(8), type: this.props.app_state.loc['2884']/* 'royalty-payouts' */, entered_indexing_tags:[this.props.app_state.loc['2847']/* 'stage' */, this.props.app_state.loc['2848']/* 'royalty' */, this.props.app_state.loc['2849']/* 'payouts' */], token_item: {'balance':1, 'data':[[],[],[],[],[]], 'id':0},

                get_view_staged_royalty_page_tags_object:this.get_view_staged_royalty_page_tags_object(),
                selected_batches:[],
            })
        }

        this.setState({token_item: token_item, e5: token_item['e5'], staging_data: staging_data})
    }


    get_view_staged_royalty_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['2885']/* 'stage-details' */,this.props.app_state.loc['2882']/* 'batches' */,this.props.app_state.loc['2886']/* 'completed' */], [1]
            ],
        };
    }


    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.get_view_staged_royalty_page_tags_object} tag_size={'l'} when_tags_updated={this.when_get_view_staged_royalty_page_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_finish_button()}
                    </div>
                </div>

                
                {this.render_everything()}

            </div>
        )
    }

    when_get_view_staged_royalty_page_tags_object_updated(tag_obj){
        this.setState({get_view_staged_royalty_page_tags_object: tag_obj})
    }

    render_finish_button(){
        if(this.state.staging_data == null) return;
        var staging_data_sender = this.state.staging_data['royalty_payout_account']
        var my_id = this.props.app_state.user_account_id[this.state.e5]
        if(my_id == null) return;
        if(parseInt(staging_data_sender) == parseInt(my_id)){
            return(
                <div>
                    <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                        <img className="text-end" onClick={()=>this.finish()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                    </div>
                </div>
            )
        }
    }





    render_everything(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_staged_royalty_tag_data_under_tags()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_main_staged_royalties_page_part()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_staged_royalty_tag_data_under_tags2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_main_staged_royalties_page_part()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_staged_royalty_tag_data_under_tags2()}
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


    render_staged_royalty_tag_data_under_tags(){
        var selected_item = this.get_selected_item(this.state.get_view_staged_royalty_page_tags_object, this.state.get_view_staged_royalty_page_tags_object['i'].active)

        if(selected_item == this.props.app_state.loc['2885']/* 'stage-details' */){
            return(
                <div>
                    {this.render_main_staged_royalties_page_part()}
                </div>
            )    
        }
        else if(selected_item == this.props.app_state.loc['2882']/* 'batches' */){
            return(
                <div>
                    {this.render_batches_part()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2886']/* 'completed' */){
            return(
                <div>
                    {this.render_completed_part()}
                </div>
            )
        }
    }

    render_staged_royalty_tag_data_under_tags2(){
        var selected_item = this.get_selected_item(this.state.get_view_staged_royalty_page_tags_object, this.state.get_view_staged_royalty_page_tags_object['i'].active)

        if(selected_item == this.props.app_state.loc['2885']/* 'stage-details' */ || selected_item == this.props.app_state.loc['2882']/* 'batches' */){
            return(
                <div>
                    {this.render_batches_part()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2886']/* 'completed' */){
            return(
                <div>
                    {this.render_completed_part()}
                </div>
            )
        }
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }




    render_main_staged_royalties_page_part(){
        var staging_data = this.state.staging_data
        if(staging_data == null) return;
        var exchange_royalty_data = staging_data['exchange_royalty_data']
        var total_number_of_transactions = exchange_royalty_data['balance_data'].length
        if(staging_data != null){
            return(
                <div>

                    {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'15px', 'text':staging_data['payout_title']})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2861']/* 'The aggregate of the total number of tokens being issued out as payouts.' */, 'title':this.props.app_state.loc['2860']/* 'Total Payout Amount.' */})}
                    <div style={{height:10}}/>
                    {this.render_payout_tokens()}
                    <div style={{height:10}}/>

                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.get_time_diff(staging_data['payout_start_timestamp'] - Date.now()/1000), 'details':this.props.app_state.loc['2880']/* Starting On:  */+(new Date(staging_data['payout_start_timestamp']*1000)), 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'size':'l', 'title':staging_data['royalty_payout_account']+' : '+this.get_account_alias(staging_data['royalty_payout_account']), 'details':this.props.app_state.loc['2855']/* 'Payout Account.' */})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('0')}

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>

                        <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['2868']/* 'Total Payout Transactions.' */, 'number':total_number_of_transactions, 'relativepower':this.props.app_state.loc['2867']/* 'transactions.' */})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2868']/* 'Total Payout Transactions.' */, 'subtitle':this.format_power_figure(total_number_of_transactions), 'barwidth':this.calculate_bar_width(total_number_of_transactions), 'number':this.format_account_balance_figure(total_number_of_transactions), 'barcolor':'', 'relativepower':this.props.app_state.loc['2867']/* 'transactions.' */, })}
                        </div>
                        

                        <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['2874']/* 'transactions per batch' */, 'number':staging_data['batch_size'], 'relativepower':this.props.app_state.loc['2867']/* 'transactions' */})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2874']/* 'transactions per batch' */, 'subtitle':this.format_power_figure(staging_data['batch_size']), 'barwidth':this.calculate_bar_width(staging_data['batch_size']), 'number':this.format_account_balance_figure(staging_data['batch_size']), 'barcolor':'', 'relativepower':this.props.app_state.loc['2867']/* 'transactions' */, })}
                        </div>
                        

                        <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['2881']/* 'Total Batches.' */, 'number':this.get_number_of_payout_batches(), 'relativepower':this.props.app_state.loc['2882']/* 'batches' */})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2881']/* 'Total Batches.' */, 'subtitle':this.format_power_figure(this.get_number_of_payout_batches()), 'barwidth':this.calculate_bar_width(this.get_number_of_payout_batches()), 'number':this.format_account_balance_figure(this.get_number_of_payout_batches()), 'barcolor':'', 'relativepower':this.props.app_state.loc['2882']/* 'batches' */, })}
                        </div>

                    </div>

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }
        
    }

    render_payout_tokens(){
        var selected_object = this.state.token_item;
        var buy_tokens = [].concat(selected_object['data'][3])
        var buy_amounts = [].concat(selected_object['data'][4])
        return(
            <div>
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                        {buy_tokens.map((item, index) => (
                            <div style={{'padding': '1px'}}>
                                {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[selected_object['e5']+item], 'subtitle':this.format_power_figure(this.calculate_payout_amount(buy_amounts[index])), 'barwidth':this.calculate_bar_width(this.calculate_payout_amount(buy_amounts[index])), 'number':this.format_price(this.calculate_payout_amount(buy_amounts[index])), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    calculate_payout_amount(price){
        var staging_data = this.state.staging_data
        return bigInt(price).multiply(staging_data['payout_amount']);
    }

    format_price(price_value){
        return this.format_account_balance_figure(price_value)
        // if(price_value > 1000){
        //     return this.format_account_balance_figure(price_value)
        // }
        // else{
        //     let roundedNumber = parseFloat(price_value.toFixed(7));
        //     return roundedNumber
        // }
    }

    get_account_alias(account_id){
        return (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[account_id] == null ? (this.props.app_state.loc['2871']/* 'Alias Unknown.' */) : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[account_id])
    }

    get_number_of_payout_batches(){
        var staging_data = this.state.staging_data
        return staging_data['batches'].length
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





    render_batches_part(){
        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'15px', 'text':this.props.app_state.loc['2888']/* 'The royalty payout batches are listed below. Tap a batch to stage it and tap a staged batch to remove.' */})}
                <div style={{height:10}}/>

                {this.render_staged_batches_and_others_conditionally()}
            </div>
        )
    }

    render_staged_batches_and_others_conditionally(){
        if(this.state.staging_data == null) return;
        var staging_data_sender = this.state.staging_data['royalty_payout_account']
        var my_id = this.props.app_state.user_account_id[this.state.e5]

        if(parseInt(staging_data_sender) == parseInt(my_id)){
            return(
                <div>
                    {this.render_staged_batches()}
                    <div style={{height:10}}/>
                    {this.render_transaction_batches_to_royalties()}
                </div>
            )
        }else{
            var staging_data = this.state.staging_data
            var batches = this.remove_already_fulfiled_batches(staging_data['batches'])
            if(batches.length == 0){
                return(
                    <div>
                        {this.render_empty_views(3)}
                    </div>
                )
            }
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {batches.map((item, index) => (
                            <li style={{'padding': '5px 0px 5px 0px'}}>
                                {this.render_detail_item('3', {'details':item['data'].length+this.props.app_state.loc['2872']/* ' transactions.' */, 'title':this.props.app_state.loc['2873']/* 'Batch: ' */+ item['id'], 'size':'s'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_staged_batches(){
        var background_color = this.props.theme['card_background_color']
        var staging_data = this.state.staging_data
        var batches = staging_data['batches']
        var items = this.get_selected_batch_data(batches)
        if(items.length == 0){
            items = [1, 2, 3]
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden', 'scrollbar-width': 'none'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                <div style={{height:47, width:97, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={() => this.delete_batch_item_from_stage(item)}>
                            {this.render_detail_item('3', {'details':item['data'].length+this.props.app_state.loc['2872']/* ' transactions.' */, 'title':this.props.app_state.loc['2873']/* 'Batch: ' */+ item['id'], 'size':'s'})}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_selected_batch_data(batches){
        var selected = []
        batches.forEach(batch => {
            if(this.state.selected_batches.includes(batch)){
                selected.push(batch)
            }
        });
        return selected;
    }

    delete_batch_item_from_stage(item){
        var cloned_array = this.state.selected_batches.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({selected_batches: cloned_array})
    }



    render_transaction_batches_to_royalties(){
        var staging_data = this.state.staging_data
        if(staging_data == null) return
        var items = staging_data['batches']
        var batches = this.remove_already_fulfiled_batches(this.get_unselected_batch_data(items))
        if(batches.length == 0){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {batches.map((item, index) => (
                            <li style={{'padding': '5px 0px 5px 0px'}}  onClick={() => this.add_batch_item_from_stage(item)}>
                                {this.render_detail_item('3', {'details':item['data'].length+this.props.app_state.loc['2872']/* ' transactions.' */, 'title':this.props.app_state.loc['2873']/* 'Batch: ' */+ item['id'], 'size':'s'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    get_unselected_batch_data(batches){
        var unselected = []
        batches.forEach(batch => {
            if(!this.state.selected_batches.includes(batch)){
                unselected.push(batch)
            }
        });
        return unselected;
    }

    add_batch_item_from_stage(item){
        var clone = this.state.selected_batches.slice()
        clone.push(item)
        this.setState({selected_batches: clone})
    }

    remove_already_fulfiled_batches(batches){
        var fulfiled_batch_ids = []
        var staged_royalty_transfered_items_data = this.props.app_state.token_royalty_payout_data[this.state.token_item['id']]
        if(staged_royalty_transfered_items_data == null){
            return batches;
        }
        staged_royalty_transfered_items_data.forEach(item => {
            if(item['payout_id'] == this.state.staging_data['payout_id']){
                item['transacted_batches'].forEach(batch_id => {
                    fulfiled_batch_ids.push(batch_id)
                });
            }
        });

        var batches_to_show = []
        batches.forEach(batch => {
            if(!fulfiled_batch_ids.includes(batch['id'])){
                batches_to_show.push(batch)
            }
        });

        return batches_to_show;
    }





    render_completed_part(){
        var staging_data = this.state.staging_data
        if(staging_data == null) return
        var batches = this.show_already_fulfilled_batches(staging_data['batches'])
        if(batches.length == 0){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {batches.map((item, index) => (
                            <li style={{'padding': '5px 0px 5px 0px'}}>
                                {this.render_detail_item('3', {'details':item['data'].length+this.props.app_state.loc['2872']/* ' transactions.' */, 'title':this.props.app_state.loc['2873']/* 'Batch: ' */+ item['id'], 'size':'s'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    show_already_fulfilled_batches(batches){
        var fulfiled_batch_ids = []
        var staged_royalty_transfered_items_data = this.props.app_state.token_royalty_payout_data[this.state.token_item['id']]
        if(staged_royalty_transfered_items_data == null){
            return batches;
        }
        staged_royalty_transfered_items_data.forEach(item => {
            if(item['payout_id'] == this.state.staging_data['payout_id']){
                item['transacted_batches'].forEach(batch_id => {
                    fulfiled_batch_ids.push(batch_id)
                });
            }
        });

        var batches_to_show = []
        batches.forEach(batch => {
            if(fulfiled_batch_ids.includes(batch['id'])){
                batches_to_show.push(batch)
            }
        });

        return batches_to_show;
    }




    finish(){
        var staged_transactions = this.state.selected_batches

        if(staged_transactions.length == 0){
            this.props.notify(this.props.app_state.loc['2883']/* You cant stage no transactions. */, 6700)
        }
        else if(!this.can_make_royalty_payment_from_exchange()){
            this.props.notify(this.props.app_state.loc['2889']/* You cant stack royalty payouts in the same exchange twice */, 6700)
        }
        else{
            this.props.add_royalty_batch_payment_to_stack(this.state)
            this.setState({
                selected: 0, id:makeid(8), type: this.props.app_state.loc['2884']/* 'royalty-payouts' */, entered_indexing_tags:[this.props.app_state.loc['2847']/* 'stage' */, this.props.app_state.loc['2848']/* 'royalty' */, this.props.app_state.loc['2849']/* 'payouts' */],

                get_view_staged_royalty_page_tags_object:this.get_view_staged_royalty_page_tags_object(),
                selected_batches:[],
            })
            this.props.notify(this.props.app_state.loc['18'], 1700);
        }
    }

    can_make_royalty_payment_from_exchange(){
        var stack_transactions = this.props.app_state.stack_items
        for(var i=0; i<stack_transactions.length; i++){
            if(stack_transactions[i].type == this.props.app_state.loc['2884']/* 'royalty-payouts' */ &&         
                stack_transactions[i].token_item['id'] == this.state.token_item['id'] && 
                stack_transactions[i].id != this.state.id && 
                stack_transactions[i].e5 == this.props.app_state.selected_e5)
            {
                return false
            }
        }
        return true
    }








    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
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




export default ViewStagedRoyaltyPage;