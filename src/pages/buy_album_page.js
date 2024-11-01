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

class BuyAlbumPage extends Component {
    
    state = {
        selected: 0, album:null, id: makeid(8), type:this.props.app_state.loc['2962']/* 'buy-album' */,
        get_buy_album_title_tags_object:this.get_buy_album_title_tags_object(),
        entered_indexing_tags:[this.props.app_state.loc['2963']/* 'buy' */, this.props.app_state.loc['2964']/* 'album' */,this.props.app_state.loc['2965']/* 'track' */],
        selected_tracks:[]
    };

    get_buy_album_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['2962']/* 'buy-album' */], [1]
            ],
        };
    }

    set_data(album){
        this.setState({album: album, e5: album['e5']})
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.get_buy_album_title_tags_object} tag_size={'l'} when_tags_updated={this.when_get_buy_album_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
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
        this.setState({get_buy_album_title_tags_object: tag_obj})
    }

    render_everything(){
        var size = this.props.app_state.size
        if(this.state.album == null) return;
        if(size == 's'){
            return(
                <div>
                    {this.render_title_and_total_to_be_paid()}
                    {this.render_detail_item('0')}
                    {this.render_audio_songs()}
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
                        {this.render_audio_songs()}
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
                        {this.render_audio_songs()}
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
        var object = this.state.album
        var listing_type = object['ipfs'] == null ? 'Audiopost' :this.get_selected_item(object['ipfs'].get_listing_type_tags_option, 'e')
        var title = object['ipfs'] == null ? 'Audiopost ID' : object['ipfs'].entered_title_text
        var author = object['ipfs'] == null ? 'Audiopost' :object['ipfs'].entered_author_text
        var default_image = this.props.app_state.static_assets['music_label']
        var image = object['ipfs'] == null ? default_image :object['ipfs'].album_art
        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'14px', 'text': this.props.app_state.loc['2966']/* 'Purchase access to one track or the entire catalogue.' */})}
                <div style={{height: 10}}/>
                {this.render_detail_item('8', {'title':listing_type+' • '+object['id']+' • '+author, 'details':title, 'size':'l', 'image':image, 'border_radius':'7px'})}
                <div style={{height: 10}}/>
                {this.render_selected_song_tabs()}
                {this.render_detail_item('0')}
                {this.render_total_to_be_paid()}
            </div>
        )
    }


    render_selected_song_tabs(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.selected_tracks)

        if(items.length == 0){
            items = [1, 2, 3]
            return(
                <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                <div style={{height:47, width:97, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img alt="" src={this.props.app_state.static_assets['letter']} style={{height:20 ,width:'auto'}} />
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
                {this.render_detail_item('3', {'title':item['song_id'], 'details':this.truncate(item['song_title'], 15), 'size':'s', 'padding':'5px 12px 5px 12px'})}
            </div>
        )
    }

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }

    when_tab_clicked(item, index){
        var cloned_array = this.state.selected_tracks.slice()
        // const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
            this.setState({selected_tracks: cloned_array})
        }
    }





    render_audio_songs(){
        var all = this.get_available_songs()
        var available_songs = all.available_songs
        var unavailable_tracks = all.unavailable_tracks
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2972a']/* 'Available Tracks.' */, 'details':this.props.app_state.loc['2972b']/* 'Below are the available tracks for purchase.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                {this.render_available_tracks(available_songs, true)}
                {this.render_detail_item('0')}
                {this.render_available_tracks(unavailable_tracks, false)}
                <div style={{height: 20}}/>
            </div>
        )
    }

    render_available_tracks(items, is_available){
        var object = this.state.album
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
                                            <img alt="" src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
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
                            {this.render_song(item, object, is_available)} 
                            <div style={{height:2}}/>
                        </div>
                    ))}
                </div>
            )
        }
    }

    render_song(item, object, is_available){
        var song_title = item['song_title']
        var song_details = item['song_composer']
        var alpha = this.state.selected_tracks.indexOf(item) != -1 ? 0.3 : 1
        return(
            <div style={{opacity: alpha}} onClick={() => this.when_song_item_clicked(item, object, is_available)}>
                {this.render_detail_item('3', {'details':song_details,'title':song_title, 'size':'l'})}
            </div>
        )
    }

    when_song_item_clicked(item, object, is_available){
        if(!is_available){
            this.props.notify(this.props.app_state.loc['2972']/* 'You can\'t re-buy that song' */, 4500)
            return;
        }
        var clone = this.state.selected_tracks.slice()
        var index = clone.indexOf(item)
        if(index != -1){
            clone.splice(index, 1);
        }else{
            clone.push(item)
        }
        this.setState({selected_tracks: clone})
    }

    get_available_songs(){
        var object = this.state.album
        var txs = this.props.app_state.stack_items
        var selected_songs = [].concat(this.props.app_state.my_tracks)
        for(var i=0; i<txs.length; i++){
            var t = txs[i]
            if(t.type == this.props.app_state.loc['2962']/* 'buy-album' */ && t.album['id'] == object['id']){
                var its_selected_songs = t.selected_tracks;
                its_selected_songs.forEach(song => {
                    selected_songs.push(song['song_id'])
                });
            }
        }

        var items = object['ipfs'].songs
        var available_songs = []
        var unavailable_tracks = []
        items.forEach(item => {
            if(!selected_songs.includes(item['song_id'])){
                available_songs.push(item)
            }else{
                unavailable_tracks.push(item)
            }
        });

        return {available_songs:available_songs, unavailable_tracks:unavailable_tracks}
    }





    render_total_to_be_paid(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2967']/* 'Total Purchase amounts.' */, 'details':this.props.app_state.loc['2968']/* 'Here\'s the toal amount of money you\'ll be paying for the tracks.' */, 'size':'l'})}
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
        var selected_tracks = this.state.selected_tracks

        var object = this.state.album
        var all_tracks = object['ipfs'].songs
        if(selected_tracks.length == all_tracks.length && object['ipfs'].price_data.length > 0){
            //if sender has selected all the tracks and there is an album price, use the album price
            var album_price_data = object['ipfs'].price_data
            album_price_data.forEach(price => {
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
            selected_tracks.forEach(track => {
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









    finish(){
        var selected_tracks = this.state.selected_tracks
        var data = this.get_total_payment_amounts()
        var exchanges_used = [].concat(data.exchanges_used)
        var exchange_amounts = data.exchange_amounts

        if(selected_tracks.length == 0){
            this.props.notify(this.props.app_state.loc['2969']/* 'Please pick a track to purchase.' */, 4500)
        }
        else if(!this.check_if_sender_can_afford_payments(data)){
            this.props.notify(this.props.app_state.loc['2970']/* 'You don\'t have enough money to fulfil this purchase.' */, 4500)
        }
        else{
            this.setState({exchanges_used: exchanges_used, exchange_amounts: exchange_amounts, data: data})

            var me = this;
            setTimeout(function() {
                me.props.add_buy_album_transaction_to_stack(me.state)
        
                me.setState({ selected: 0, id: makeid(8), type:me.props.app_state.loc['2962']/* 'buy-album' */, get_buy_album_title_tags_object:me.get_buy_album_title_tags_object(), entered_indexing_tags:[me.props.app_state.loc['2963']/* 'buy' */, me.props.app_state.loc['2964']/* 'album' */,me.props.app_state.loc['2965']/* 'track' */], selected_tracks:[] })
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

            if(token_balance < final_amount){
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




export default BuyAlbumPage;