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

class BuyVideoPage extends Component {
    
    state = {
        selected: 0,  videopost:null, id: makeid(8), type:this.props.app_state.loc['a2962a']/* 'buy-video' */, get_buy_video_title_tags_object:this.get_buy_video_title_tags_object(),
        entered_indexing_tags:[this.props.app_state.loc['2963']/* 'buy' */, this.props.app_state.loc['a2962b']/* 'video' */,this.props.app_state.loc['a2962c']/* 'videopost' */],
        selected_videos:[]
    };

    get_buy_video_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['a2962a']/* 'buy-video' */], [1]
            ],
        };
    }


    set_data(videopost){
        this.setState({videopost: videopost, e5: videopost['e5']})
    }




    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.get_buy_video_title_tags_object} tag_size={'l'} when_tags_updated={this.when_get_buy_album_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img alt="" className="text-end" onClick={()=>this.finish()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div>

                {this.render_everything()}
            </div>
        )
    }


    when_get_buy_album_title_tags_object_updated(tag_obj){
        this.setState({get_buy_video_title_tags_object: tag_obj})
    }



    render_everything(){
        var size = this.props.app_state.size
        if(this.state.videopost == null) return;
        if(size == 's'){
            return(
                <div>
                    {this.render_title_and_total_to_be_paid()}
                    {this.render_detail_item('0')}
                    {this.render_videopost_videos()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_title_and_total_to_be_paid()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_videopost_videos()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_title_and_total_to_be_paid()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_videopost_videos()}
                    </div>
                </div>
                
            )
        }
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }









    render_title_and_total_to_be_paid(){
        var object = this.state.videopost
        var listing_type = object['ipfs'] == null ? 'Videopost' :this.get_selected_item(object['ipfs'].get_listing_type_tags_option, 'e')
        var title = object['ipfs'] == null ? 'Videopost ID' : object['ipfs'].entered_title_text
        var author = object['ipfs'] == null ? 'Videopost' : this.get_senders_name(object['event'].returnValues.p5, object)
        var default_image = this.props.app_state.static_assets['video_label']
        var image = object['ipfs'] == null ? default_image :object['ipfs'].album_art
        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'14px', 'text': this.props.app_state.loc['a2962d']/* 'Purchase access to one video or the entire catalogue.' */})}
                <div style={{height: 10}}/>
                {this.render_detail_item('8', {'title':listing_type+' • '+object['id']+' • '+author, 'details':title, 'size':'l', 'image':image, 'border_radius':'7px'})}
                <div style={{height: 10}}/>
                {this.render_selected_video_tabs()}
                {this.render_detail_item('0')}
                {this.render_total_to_be_paid()}
            </div>
        )
    }

    get_senders_name(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            if(this.is_post_anonymous(object)) return this.props.app_state.loc['311m']/* 'Hidden' */
            return alias
        }
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

    is_post_anonymous(object){
        var is_anonymous = false;
        if(object['ipfs'].get_post_anonymously_tags_option != null){
            var option = this.get_selected_item2(object['ipfs'].get_post_anonymously_tags_option, 'e')
            if(option == 1){
                is_anonymous = true
            }
        }
        return is_anonymous
    }

    get_selected_item2(object, option){
        return object[option][2][0]
    }




    render_selected_video_tabs(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.selected_videos)

        if(items.length == 0){
            items = [1, 2, 3]
            return(
                <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                <div style={{height:47, width:97, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        return(
            <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_tab_clicked(item, index)}>
                            {this.render_tab_item(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_tab_item(item, index){
        return(
            <div>
                {this.render_detail_item('3', {'title':item['video_id'], 'details':this.truncate(item['video_title'], 15), 'size':'s', 'padding':'5px 12px 5px 12px'})}
            </div>
        )
    }

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }

    when_tab_clicked(item, index){
        var cloned_array = this.state.selected_videos.slice()
        // const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
            this.setState({selected_videos: cloned_array})
        }
    }





    render_videopost_videos(){
        var all = this.get_available_videos()
        var available_videos = all.available_videos
        var unavailable_videos = all.unavailable_videos
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a2962e']/* 'Available Videos.' */, 'details':this.props.app_state.loc['a2962f']/* 'Below are the available videos for purchase.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                {this.render_buy_all_if_videos_available(available_videos)}
                {this.render_available_videos(available_videos, true)}
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a2962g']/* 'Unavailable Videos.' */, 'details':this.props.app_state.loc['a2962h']/* 'Below are the videos you\'ve already purchased.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                {this.render_available_videos(unavailable_videos, false)}
                <div style={{height: 20}}/>
            </div>
        )
    }

    render_buy_all_if_videos_available(available_videos){
        if(available_videos.length == 0) return;
        return(
            <div>
                <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_buy_all_clicked(available_videos)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2972e']/* Buy All. */, 'action':''})}
                </div>
                <div style={{height: 10}}/>
            </div>
        )
    }

    when_buy_all_clicked(available_videos){
        this.setState({selected_videos: available_videos})
    }


    render_available_videos(items, is_available){
        var object = this.state.videopost
        if(items.length == 0){
            items = [0, 1]
            return(
                <div>
                    <div style={{}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['view_group_card_item_background'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img alt="" src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    {items.map((item, index) => (
                        <div key={index}>
                            {this.render_video(item, object, is_available)} 
                            <div style={{height:2}}/>
                        </div>
                    ))}
                </div>
            )
        }
    }

    render_video(item, object, is_available){
        var video_title = item['video_title']
        var video_details = item['video_composer']
        var alpha = this.state.selected_videos.indexOf(item) != -1 ? 0.3 : 1
        return(
            <div style={{opacity: alpha}} onClick={() => this.when_video_item_clicked(item, object, is_available)}>
                {this.render_detail_item('3', {'details':video_details,'title':video_title, 'size':'l'})}
            </div>
        )
    }

    when_video_item_clicked(item, object, is_available){
        if(!is_available){
            this.props.notify(this.props.app_state.loc['a2962i']/* 'You can\'t re-buy that video' */, 4500)
            return;
        }
        var clone = this.state.selected_videos.slice()
        var index = clone.indexOf(item)
        if(index != -1){
            clone.splice(index, 1);
        }else{
            clone.push(item)
        }
        this.setState({selected_videos: clone})
    }

    get_available_videos(){
        var object = this.state.videopost
        var txs = this.props.app_state.stack_items
        var selected_videos = [].concat(this.props.app_state.my_videos)
        for(var i=0; i<txs.length; i++){
            var t = txs[i]
            if(t.type == this.props.app_state.loc['a2962a']/* 'buy-video' */ && t.videopost['id'] == object['id']){
                var its_selected_videos = t.selected_videos;
                its_selected_videos.forEach(video => {
                    selected_videos.push(video['video_id'])
                });
            }
        }

        var items = object['ipfs'].videos
        var available_videos = []
        var unavailable_videos = []
        items.forEach(item => {
            if(!selected_videos.includes(item['video_id'])){
                available_videos.push(item)
            }else{
                unavailable_videos.push(item)
            }
        });

        return {available_videos:available_videos, unavailable_videos:unavailable_videos}
    }






    render_total_to_be_paid(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2967']/* 'Total Purchase amounts.' */, 'details':this.props.app_state.loc['a2962j']/* 'Here\'s the toal amount of money you\'ll be paying for the videos.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                {this.render_total_payments()}
            </div>
        )
    }

    render_total_payments(){
        var data = this.get_total_payment_amounts()
        var exchanges_used = [].concat(data.exchanges_used)
        var exchange_amounts = data.exchange_amounts
        var e5 = this.state.e5

        if(exchanges_used.length == 0){
            return(
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                    {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+5], 'subtitle':this.format_power_figure(0), 'barwidth':this.calculate_bar_width((0)), 'number':this.format_account_balance_figure((0)), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[5]})}
                </div>
            )
        }

        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                    {exchanges_used.map((item, index) => (
                        <li style={{'padding': '1px'}} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'number':exchange_amounts[item], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                            {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item], 'subtitle':this.format_power_figure(exchange_amounts[item]), 'barwidth':this.calculate_bar_width((exchange_amounts[item])), 'number':this.format_account_balance_figure((exchange_amounts[item])), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}
                        </li>
                    ))}
                </ul>
            </div>  
        )
    }

    get_total_payment_amounts(){
        var exchanges_used = []
        var exchange_amounts = {}
        var selected_videos = this.state.selected_videos

        var object = this.state.videopost
        var all_videos = object['ipfs'].videos
        if(selected_videos.length == all_videos.length && object['ipfs'].price_data.length > 0){
            //if sender has selected all the videos and there is a videopost price, use the videopost price
            var videopost_price_data = object['ipfs'].price_data
            videopost_price_data.forEach(price => {
                var exchange_id = price['id']
                var amount = price['amount']
                if(!exchanges_used.includes(exchange_id)){
                    exchanges_used.push(exchange_id)
                    exchange_amounts[exchange_id] = bigInt(0)
                }
                exchange_amounts[exchange_id] = bigInt(exchange_amounts[exchange_id]).add(amount)
            });
        }
        else{
            selected_videos.forEach(track => {
                var track_price_data = track['price_data']
                track_price_data.forEach(price => {
                    var exchange_id = price['id']
                    var amount = price['amount']
                    if(!exchanges_used.includes(exchange_id)){
                        exchanges_used.push(exchange_id)
                        exchange_amounts[exchange_id] = bigInt(0)
                    }
                    exchange_amounts[exchange_id] = bigInt(exchange_amounts[exchange_id]).add(amount)
                });
            });
        }

        return {exchanges_used:exchanges_used, exchange_amounts:exchange_amounts}
    }

    







    finish(){
        var selected_videos = this.state.selected_videos
        var data = this.get_total_payment_amounts()
        var exchanges_used = [].concat(data.exchanges_used)
        var exchange_amounts = data.exchange_amounts

        if(selected_videos.length == 0){
            this.props.notify(this.props.app_state.loc['a2962k']/* 'Please pick a video to purchase.' */, 4500)
        }
        else if(!this.check_if_sender_can_afford_payments(data)){
            this.props.notify(this.props.app_state.loc['2970']/* 'You don\'t have enough money to fulfil this purchase.' */, 4500)
        }
        else{
            this.setState({exchanges_used: exchanges_used, exchange_amounts: exchange_amounts, data: data})

            var me = this;
            setTimeout(function() {
                me.props.add_buy_video_transaction_to_stack(me.state)
        
                me.setState({ 
                    selected: 0, id: makeid(8), type:me.props.app_state.loc['a2962a']/* 'buy-video' */, get_buy_video_title_tags_object:me.get_buy_video_title_tags_object(), entered_indexing_tags:[me.props.app_state.loc['2963']/* 'buy' */, me.props.app_state.loc['a2962b']/* 'video' */,me.props.app_state.loc['a2962c']/* 'videopost' */], selected_videos:[]
                })
            }, (1 * 1000));

            this.props.notify(this.props.app_state.loc['18'], 1700);
        }

    }



    check_if_sender_can_afford_payments(data){
        var exchanges_used = [].concat(data.exchanges_used)
        var exchange_amounts = data.exchange_amounts
        var e5 = this.state.e5

        var can_pay = true;
        for(var i=0; i<exchanges_used.length; i++){
            var token_id = exchanges_used[i]
            var token_balance = this.props.calculate_actual_balance(e5, token_id)
            var final_amount = exchange_amounts[token_id]

            if(bigInt(token_balance).lesser(final_amount)){
                can_pay = false
            }
        }
        return can_pay
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

    calculate_bar_width(num){
        if(num == null) return '0%'
        var last_two_digits = num.toString().slice(0, 1)+'0';
        if(num > 10){
            last_two_digits = num.toString().slice(0, 2);
        }
        return last_two_digits+'%'
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




export default BuyVideoPage;