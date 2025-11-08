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

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

/* numberWithCommas */
function number_with_commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getOS() {
    // return 'iOS'
    if(iOS()) return 'iOS'
    const userAgent = window.navigator.userAgent,
        platform = window.navigator?.userAgentData?.platform || window.navigator.platform,
        macosPlatforms = ['macOS', 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    let os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (/Linux/.test(platform)) {
        os = 'Linux';
    }

    return os;
}

function iOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

class template extends Component {
    
    state = {
        selected: 0,
        get_selected_chart_item_tags_object:this.get_selected_chart_item_tags_object(),
        get_selected_contract_chart_item_tags_object:this.get_selected_contract_chart_item_tags_object(),
    };

    render(){
        return(
            <div>
                {this.render_metrics_section(this.props.h)}
            </div>
        )
    }

    render_metrics_section(h){
        return(
            <div>
                <div style={{'padding':'10px 10px 10px 10px', 'margin':'0px 0px 0px 5px', 'background-color':this.props.theme['card_background_color'],'border-radius': '15px', height:h, 'overflow-y': 'auto',}}>

                    {this.render_now_playing_media_if_any()}

                    {this.render_detail_item('3',{'title':this.props.app_state.loc['2817']/* 'Available E5s.' */, 'details':this.props.app_state.loc['2818']/* 'The E5s that are currently in use.' */, 'size':'l'})}
                    {this.load_preferred_e5_ui()}
                    {this.render_detail_item('0')} 

                    {this.render_notifications_if_any()}

                    {this.render_detail_item('3',{'title':this.props.app_state.loc['2819']/* 'Active Wallets.' */, 'details':this.props.app_state.loc['2820']/* 'Your wallet ethers and coins that have balances.' */, 'size':'l'})}
                    {this.render_my_balances()}
                    {this.render_detail_item('0')} 


                    {this.render_detail_item('3',{'title':this.props.app_state.loc['1264ab']/* 'Wallet Value' */, 'details':this.props.app_state.loc['1264ac']/* 'The total worth of all your wallet contents.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_total_wallet_value()}
                    {this.render_detail_item('0')} 


                    {this.render_detail_item('3',{'title':this.props.app_state.loc['2821']/* 'Estimated Gas.' */, 'details':this.props.app_state.loc['2822']/* 'The estimated gas set to be consumed in your next run.' */, 'size':'l'})}
                    <div style={{height: 5}}/>
                    {this.render_stack_gas_figure()}
                    
                    {this.render_stack_run_space_utilization_if_non_zero()}
                    


                    {this.render_detail_item('0')}
                    {this.render_detail_item('3',{'title':this.props.app_state.loc['2844']/* 'Acitve E5 Info.' */, 'details':this.props.app_state.loc['2845']/* 'Telemetries for your selected E5' */, 'size':'l'})}
                    <div style={{height: 5}}/>
                    {this.load_E5_charts()}




                    {this.render_detail_item('0')} 
                    {this.render_detail_item('3',{'title':this.props.app_state.loc['2823']/* 'Stats and Telemetries.' */, 'details':this.props.app_state.loc['2824']/* 'Some info about E5 in its entirety.' */, 'size':'l'})}
                    <div style={{height: 5}}/>
                    {this.render_transaction_data()}


                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_notifications_if_any(){
        if(!this.props.app_state.has_wallet_been_set && !this.props.app_state.has_account_been_loaded_from_storage){
            return;
        }
        var work_notifications = this.get_all_work_notification_items([]).length
        var explore_notifications = this.get_all_explore_notification_items([]).length
        var wallet_notifications = this.get_all_wallet_notification_items([]).length

        return(
            <div>
                {this.render_detail_item('3',{'title':this.props.app_state.loc['1264au']/* 'Notifications 🔔' */, 'details':this.props.app_state.loc['1264av']/* 'Notifications for activity under your account should show here.' */, 'size':'l'})}
                <div style={{height: 5}}/>
                <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=> this.show_notifications('?')}>
                            {this.render_detail_item('3', {'details':this.props.app_state.loc['1264aw']/* '???? 💼' */, 'title':this.format_number(work_notifications), 'size':'l'})}
                            <div style={{width: 10}}/>
                        </li>
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=> this.show_notifications('e')}>
                            {this.render_detail_item('3', {'details':this.props.app_state.loc['1264ax']/* 'Explore 🧭' */, 'title':this.format_number(explore_notifications), 'size':'l'})}
                            <div style={{width: 10}}/>
                        </li>
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=> this.show_notifications('w')}>
                            {this.render_detail_item('3', {'details':this.props.app_state.loc['1264ay']/* 'Wallet 🏦'' */, 'title':this.format_number(wallet_notifications), 'size':'l'})}
                            <div style={{width: 10}}/>
                        </li>
                    </ul>
                </div>
                {this.render_detail_item('0')} 
            </div>
        )
    }

    show_notifications(item){
        this.props.show_view_notification_log_bottomsheet(item)
    }

    format_number(number){
        if(number == 0){
            return '000'
        }
        return number_with_commas(number)
    }

    get_all_work_notification_items(types){
        const notification_object = this.props.app_state.notification_object
        const mail = notification_object['mail'] == null ? [] : notification_object['mail']
        const message = notification_object['message'] == null ? [] : notification_object['message']
        const proposal = notification_object['proposal'] == null ? [] : notification_object['proposal']
        const job_application = notification_object['job_application'] == null ? [] : notification_object['job_application']
        const job_request = notification_object['job_request'] == null ? [] : notification_object['job_request']
        const job_application_response = notification_object['job_application_response'] == null ? [] : notification_object['job_application_response']
        const job_request_response = notification_object['job_request_response'] == null ? [] : notification_object['job_request_response']
        const contract = notification_object['contract'] == null ? [] : notification_object['contract']
        const comment = notification_object['comment'] == null ? [] : notification_object['comment']
        
        const all_events = mail.concat(message, proposal, job_application, job_request, job_application, job_application_response, job_request_response, contract, comment)

        const filtered_events = all_events.filter(function (event) {
            return (types.includes(event['event_type'])  || types.length == 0)
        });

        return this.sortByAttributeDescending(filtered_events, 'time')
    }

    get_all_explore_notification_items(types){
        const notification_object = this.props.app_state.notification_object
        const bag = notification_object['bag'] == null ? [] : notification_object['bag']
        const bag_application_response = notification_object['bag_application_response'] == null ? [] : notification_object['bag_application_response']
        const storefront = notification_object['storefront'] == null ? [] : notification_object['storefront']
        const comment = notification_object['comment'] == null ? [] : notification_object['comment']
        const auctionbids = notification_object['auctionbids'] == null ? [] : notification_object['auctionbids']
        
        const all_events = bag.concat(bag_application_response, storefront, auctionbids, comment)

        const filtered_events = all_events.filter(function (event) {
            return (types.includes(event['event_type'])  || types.length == 0)
        });

        return this.sortByAttributeDescending(filtered_events, 'time')
    }

    get_all_wallet_notification_items(types){
        const notification_object = this.props.app_state.notification_object
        const token = notification_object['token'] == null ? [] : notification_object['token']
        const bill_request = notification_object['bill_request'] == null ? [] : notification_object['bill_request']
        const signature = notification_object['signature'] == null ? [] : notification_object['signature']
        
        
        const all_events = token.concat(bill_request, signature)

        const filtered_events = all_events.filter(function (event) {
            return (types.includes(event['event_type'])  || types.length == 0)
        });

        return this.sortByAttributeDescending(filtered_events, 'time')
    }







    load_active_e5s(){
        var active_e5s = []
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]
            if(this.props.app_state.e5s[e5].active == true){
                active_e5s.push(e5)
            }
        }
        return active_e5s
    }

    load_preferred_e5_ui(){
        var items = this.load_active_e5s()
        var items2 = [0, 1]
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_e5_clicked(item)}>
                            {this.render_e5_item(item)}
                        </li>
                    ))}
                    {items2.map(() => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_empty_horizontal_list_item()}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_empty_horizontal_list_item(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div style={{'padding':'0px 0px 0px 0px'}}>
                <div style={{height:54, width:85, 'background-color': background_color, 'border-radius': '8px','padding':'10px','margin':'0px 0px 0px 0px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                    </div>
                </div>
            </div>
        )
    }

    render_e5_item(item){
        var image = this.props.app_state.e5s[item].e5_img
        var details = this.props.app_state.e5s[item].token
        if(this.props.app_state.selected_e5 == item){
            return(
                <div>
                    {this.render_detail_item('12', {'title':item, 'image':image,'details':details, 'size':'s'})}
                    {/* <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/> */}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('12', {'title':item, 'image':image, 'details':details, 'size':'s'})}
                </div>
            )
        }
    }

    when_e5_clicked(item){
        if(this.props.app_state.can_switch_e5s == false){
            this.render_top_notification(this.props.app_state.loc['1593gr']/* Wait a bit.' */, 1200)
            return;
        }
        this.props.when_selected_e5_changed(item)
    }







    render_now_playing_media_if_any(){
        if(this.props.app_state.is_audio_pip_showing == true && this.props.app_state.queue.length > 0){
            var item = this.props.app_state.queue[this.props.app_state.pos]
            return(
                <div>
                    <SwipeableList>
                        <SwipeableListItem
                            swipeLeft={{
                            content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['1593dz']/* Stop */}</p>,
                            action: () => this.props.close_audio_pip()
                            }}>
                            <div style={{width:'100%', 'background-color':this.props.theme['card_background_color']}}>
                                {this.render_song_item(item)}
                            </div>
                        </SwipeableListItem>
                    </SwipeableList>
                    {this.render_detail_item('0')} 
                </div>
            )
        }
    }

    render_song_item(item){
        var object = item['object']
        var default_image = this.props.app_state.static_assets['music_label']
        var image = object['ipfs'] == null ? default_image :object['ipfs'].album_art

        var border_radius = '7px';
        var text_align = 'left'
        var padding = '10px 15px 10px 15px'
        var font_size = ['15px', '12px', 19, 50];
        var song_title = item['song_title']
        var song_details = item['song_composer']
        return(
            <div>
                <div style={{'display': 'flex','flex-direction': 'row','padding': padding,'margin':'0px 0px 0px 0px', 'background-color': this.props.theme['view_group_card_item_background'],'border-radius': border_radius}}>
                    <img onClick={()=>this.props.open_full_screen_viewer()} src={this.get_image_from_file(image)} alt="" style={{height:43 ,width:43, 'border-radius': '10px'}}/>
                    <div style={{width:10}}/>
                    <div style={{width:'80%'}}>
                        <div style={{'padding':'3px 0px 0px 0px'}}>
                            <p style={{'font-size': font_size[0],'color': this.props.theme['primary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none', height:'auto', 'word-wrap': 'break-word', 'overflow-wrap':'break-word', 'word-break': 'break-all', 'text-align':text_align}}>{song_title}</p>

                            <p style={{'font-size': font_size[1],'color': this.props.theme['secondary_text_color'],'margin': '-5px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none', 'white-space': 'pre-line', 'overflow-wrap':'break-word', 'text-align':text_align}} >{song_details}</p>
                        </div>
                    </div>
                    <div style={{width:10}}/>
                    <div style={{padding:'9px 0px 0px 0px'}}>
                        {this.render_pause_button()}
                    </div>
                </div>
            </div>
        )
    }

    get_image_from_file(ecid){
        if(!ecid.startsWith('image')) return ecid
        var ecid_obj = this.get_cid_split(ecid)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return this.props.app_state.static_assets['music_label'];
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]

        if(data == null) return this.props.app_state.static_assets['music_label'];
        return data['data']
    }

    render_pause_button(){
        var image = this.props.app_state.play_pause_state == 1/* playing */ ? this.props.theme['pause']: this.props.theme['play']     
        return(
            <img onClick={()=>this.play_pause_from_here()} alt="" src={image} style={{height:25 ,width:'auto', 'text-align':'center'}}/>
        )
    }

    play_pause_from_here(){
        this.props.play_pause_from_stack()
    }





    render_total_wallet_value(){
        if(this.props.app_state.asset_price_data['BTC'] == null) return;
        var total_wallet_value_in_usd = this.round_off(this.get_total_wallet_value_in_usd())
        var bitcoin_price = this.props.app_state.asset_price_data['BTC']['price']
        var number_of_btc_for_one_usd = 1 / bitcoin_price
        var balance_value_in_btc = number_of_btc_for_one_usd * total_wallet_value_in_usd
        var balance_value_in_sat = parseInt(balance_value_in_btc * this.props.app_state.coins['BTC']['conversion'])
        return(
            <div>
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1593eh']/* 'Wallet Value in USD.' */, 'subtitle':this.format_power_figure(total_wallet_value_in_usd), 'barwidth':this.calculate_bar_width(total_wallet_value_in_usd), 'number':this.format_account_balance_figure(total_wallet_value_in_usd), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1593ef']/* 'USD' */, })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1593ei']/* 'Wallet Value in SATs' */, 'subtitle':this.format_power_figure(balance_value_in_sat), 'barwidth':this.calculate_bar_width(balance_value_in_sat), 'number':this.format_account_balance_figure(balance_value_in_sat), 'barcolor':'#606060', 'relativepower':'SATs', })}
                </div>
            </div>
        )
    }

    round_off(float_number){
        return (Math.round(float_number * 100) / 100)
    }

    get_total_wallet_value_in_usd(){
        var total_value = 0.0
        this.props.app_state.e5s['data'].forEach(e5 => {
            if(e5 != 'E35'){
                var symbol = this.props.app_state.e5s[e5].token
                var ether_price = this.props.app_state.asset_price_data[symbol] == null ? 0 : this.props.app_state.asset_price_data[symbol]['price']
                var ether_balance = this.props.app_state.account_balance[e5] == null ? 0 : (this.props.app_state.account_balance[e5] / 10**18)
                if(ether_price != null){
                    total_value += (ether_balance * ether_price)
                }
            }
        });
        var coins = this.props.app_state.coins
        for (const coin in coins) {
            if (coins.hasOwnProperty(coin)) {
                var coin_price = this.props.app_state.asset_price_data[coin] == null ? 0 : this.props.app_state.asset_price_data[coin]['price']
                var coin_data = coins[coin]
                var coin_balance = this.get_balance_in_decimal(coin_data) == null ? 0 : this.get_balance_in_decimal(coin_data)
                if(coin_price != null){
                    total_value += (coin_balance * coin_price)
                }
            }
        }
        
        return total_value
    }

    get_balance_in_decimal(item){
        var data = this.props.app_state.coin_data[item['symbol']]
        if(data != null){
            var balance = data['balance']
            if(balance == 0){
                return 0
            }else{
                return parseFloat(balance) / item['conversion']
            }
        }else{
            return 0
        }
    }





    get_my_balances(){
        var e5s = this.props.app_state.e5s['data']
        var selected_e5s = []
        for(var i=0; i<e5s.length; i++){
            var focused_e5 = e5s[i]
            var balance = this.props.app_state.account_balance[focused_e5]
            if(balance > 0){
                if(focused_e5 == 'E35' && selected_e5s.includes('E25')){

                }else{
                    selected_e5s.push(focused_e5)
                }
            }
        }
        return selected_e5s
    }

    render_my_balances(){
        var items = this.get_my_balances()
        var coin_items = this.get_my_coin_balances()
        if(items.length == 0 && coin_items.length == 0){
            items = [1, 2, 3]
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_empty_horizontal_list_item2()}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }else{
            var items2 = [0, 1]
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_ether_balance_item(item)}
                            </li>
                        ))}
                        {coin_items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                <div onClick={() => this.props.view_number({'title':item['title'], 'number':item['balance'], 'relativepower':item['base_unit']})}>
                                    {this.render_coin_item({'title':item['title'], 'image':item['image'], 'details':this.format_account_balance_figure(item['balance']) + ' '+item['base_unit'], 'size':'s', 'img_size':30})}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }


    render_ether_balance_item(item){
        var image = this.props.app_state.e5s[item].ether_image
        var token_name = this.props.app_state.e5s[item].token
        var details = this.format_account_balance_figure(this.props.app_state.account_balance[item]) + ' wei'
        return(
            <div onClick={() => this.props.view_number({'title':this.props.app_state.e5s[item].token, 'number':this.props.app_state.account_balance[item], 'relativepower':'wei'})}>
                {this.render_coin_item({'title':token_name, 'image':image, 'details':details, 'size':'s', 'img_size':30})}
            </div>
        )
    }

    render_empty_horizontal_list_item2(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div>
                <div style={{height:43, width:127, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                    </div>
                </div>
            </div>
        )
    }

    render_coin_item(object_data){
        var background_color = this.props.theme['view_group_card_item_background'];
        var border_radius = '7px';
        var E5EmptyIcon = 'https://nftstorage.link/ipfs/bafkreib7qp2bgl3xnlgflwmqh7lsb7cwgevlr4s2n5ti4v4wi4mcfzv424'
        var title = 'Author';
        var details = 'e25885';
        var size = 'l';
        var img_size = 45
        if(object_data != null){
            title = object_data['title']
            details = object_data['details']
            size = object_data['size']
        }
        var font_size = ['12px', '10px', 16];
        if(size == 'l'){
            font_size = ['17px', '13px', 19];
        }
        if(title == ''){
            title = '...'
        }
        if(details == ''){
            details = '...'
        }
        var img = E5EmptyIcon;
        if(object_data != null){
            img = object_data['image'];
        }
        if(object_data != null && object_data['img_size'] != null){
            img_size = object_data['img_size']
        }
        return (
            <div style={{'display': 'flex','flex-direction': 'row','padding': '5px 15px 5px 0px','margin':'0px 0px 0px 0px', 'background-color': background_color,'border-radius': border_radius}}>
                <div style={{'display': 'flex','flex-direction': 'row','padding': '0px 0px 0px 5px'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img src={img} style={{height:img_size ,width:img_size}} />
                    </div>
                    <div style={{'margin':'0px 0px 0px 5px'}}>
                        <p style={{'font-size': font_size[0],'color': this.props.theme['primary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none', height:'auto', 'word-wrap': 'break-word'}}>{title}</p> 
                        
                        <p style={{'font-size': font_size[1],'color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none', 'white-space': 'pre-line', 'word-wrap': 'break-word' }}>{details}</p>
                    </div>
                </div>
            </div>
        ); 
    }

    get_my_coin_balances(){
        var selected_coins = []
        var coins = this.props.app_state.coin_data
        for (const coin in coins) {
            if (coins.hasOwnProperty(coin) && coins[coin] != null) {
                var balance = coins[coin]['balance'];
                if(balance != 0){
                    selected_coins.push({'title':coin, 'balance':balance , 'base_unit':this.get_coin_data(coin)['base_unit'], 'image':this.get_coin_data(coin)['label']['image']})
                }
            }
        }
        return selected_coins
    }

    get_coin_data(symbol){
        return this.props.app_state.coins[symbol]
    }




    render_stack_run_space_utilization_if_non_zero(){
        if(this.props.app_state.stack_size_in_bytes > 100){
            var stack_size_in_bytes_formatted_data_size = this.format_data_size(this.props.app_state.stack_size_in_bytes)
            
            var percentage = this.round_off((this.props.app_state.stack_size_in_bytes / this.props.app_state.upload_object_size_limit) * 100)
            if(percentage >= 100){
                percentage = 99.99
            }
            return(
                <div>
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1593go']/* 'Stack Run Storage Utilization' */, 'subtitle':this.format_power_figure(stack_size_in_bytes_formatted_data_size['size']), 'barwidth':this.calculate_bar_width(stack_size_in_bytes_formatted_data_size['size']), 'number':this.format_account_balance_figure(stack_size_in_bytes_formatted_data_size['size']), 'barcolor':'#606060', 'relativepower':stack_size_in_bytes_formatted_data_size['unit'], })}

                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1593gp']/* 'Run Storage Utilization Proportion' */, 'subtitle':this.format_power_figure(percentage), 'barwidth':Math.floor(percentage)+'%', 'number':percentage+'%', 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1881']/* 'proportion' */, })}
                    </div>
                </div>
            )
        }
        else if(this.props.app_state.stack_size_in_bytes == -1){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('4', {'text':this.props.app_state.loc['1593gq']/* 'Calculating Stack Run Storage Utilization...' */, 'textsize':'13px', 'font':this.props.app_state.font})}
                </div>
            )
        }
        
    }

    format_data_size(size){
        if(bigInt(size).greater(bigInt(1024).pow(8))){
            var mod = bigInt(size).mod(bigInt(1024).pow(8)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(8)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'YBs'}
        }
        else if(bigInt(size).greater(bigInt(1024).pow(7))){
            var mod = bigInt(size).mod(bigInt(1024).pow(7)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(7)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'ZBs'}
        }
        else if(bigInt(size).greater(bigInt(1024).pow(6))){
            var mod = bigInt(size).mod(bigInt(1024).pow(6)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(6)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'EBs'}
        }
        else if(bigInt(size).greater(bigInt(1024).pow(5))){
            var mod = bigInt(size).mod(bigInt(1024).pow(5)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(5)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'PBs'}
        }
        else if(size > (1024*1024*1024*1024)){
            return {'size':parseFloat(size/(1024*1024*1024*1024)).toFixed(3), 'unit':'TBs'}
        }
        else if(size > (1024*1024*1024)){
            return {'size':parseFloat(size/(1024*1024*1024)).toFixed(3), 'unit':'GBs'}
        }
        else if(size > (1024*1024)){
            return {'size':parseFloat(size/(1024*1024)).toFixed(3), 'unit':'MBs'}
        }
        else if(size > 1024){
            return {'size':parseFloat(size/1024).toFixed(3), 'unit':'KBs'}
        }
        else{
            return {'size':size, 'unit':'bytes'}
        }
    }




    render_stack_gas_figure(){
        var estimated_gas_consumption_proportion = ((this.estimated_gas_consumed() / this.get_e5_run_limit(this.props.app_state.selected_e5)) * 100);
        estimated_gas_consumption_proportion = estimated_gas_consumption_proportion > 100 ? 100 : estimated_gas_consumption_proportion;
        
        return(
            <div>
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1452']/* 'Estimated Gas To Be Consumed' */, 'subtitle':this.format_power_figure(this.estimated_gas_consumed()), 'barwidth':this.calculate_bar_width(this.estimated_gas_consumed()), 'number':this.format_account_balance_figure(this.estimated_gas_consumed()), 'barcolor':'', 'relativepower':'gas', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1593ht']/* 'Gas Consumption as Proportion of Limit.' */, 'subtitle':'e0', 'barwidth':estimated_gas_consumption_proportion+'%', 'number':estimated_gas_consumption_proportion+'%', 'barcolor':'', 'relativepower':this.props.app_state.loc['1881']/* proportion */, })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1453']/* 'Wallet Impact' */, 'subtitle':this.format_power_figure(this.calculate_wallet_impact_figure()), 'barwidth':this.calculate_bar_width(this.calculate_wallet_impact_figure()), 'number':this.calculate_wallet_impact_figure()+'%', 'barcolor':'', 'relativepower':this.props.app_state.loc['1881']/* proportion */, })}
                </div>
                {this.render_arweave_network_fee_if_selected()}
            </div>
        )
    }

    get_e5_run_limit(e5){
        if(this.props.app_state.created_contract_mapping[e5] == null || this.props.app_state.created_contract_mapping[e5][2] == null || this.props.app_state.created_contract_mapping[e5][2]['data'] == null){
            return 5_300_000;
        }
        var contract_data = this.props.app_state.created_contract_mapping[e5][2]['data'];
        var contract_config = contract_data[1]
        var e5_gas_limit = contract_config[11]
        var block_gas_limit = this.get_gas_limit(e5)
        if(bigInt(block_gas_limit).lesser(e5_gas_limit)){
            return block_gas_limit
        }
        return e5_gas_limit
    }

    get_latest_block_data(e5){
        if(this.props.app_state.last_blocks[e5] == null || this.props.app_state.last_blocks[e5].length  ==  0){
            return {}
        }
        return this.props.app_state.last_blocks[e5][0];
    }

    get_gas_limit(e5){
        try{
            return this.get_latest_block_data(e5).gasLimit || 2_300_000
        }catch(e){
            // console.log(e)
            return 0
        }
    }

    calculate_wallet_impact_figure(){
        var estimated_gas_to_be_consumed = this.estimated_gas_consumed()
        var gas_price = this.props.app_state.gas_price[this.props.app_state.selected_e5]
        if(gas_price == null){
            gas_price = this.get_gas_price_from_runs()
        }
        if(this.props.app_state.run_gas_price != 0){
            gas_price = this.props.app_state.run_gas_price
        }
        var total_ether_to_be_spent = estimated_gas_to_be_consumed * gas_price
        var my_balance = this.props.app_state.account_balance[this.props.app_state.selected_e5]

        if(my_balance == 0) return 0

        var x = (total_ether_to_be_spent / my_balance) * 100
        return Math.round(x * 1000) / 1000
    }

    estimated_gas_consumed(){
        var gas_figure = this.props.app_state.calculated_gas_figures[this.props.app_state.selected_e5]
        if(gas_figure == null) return 0
        return gas_figure
    }

    get_gas_price_from_transactions(){
        var last_blocks = this.props.app_state.last_blocks[this.props.app_state.selected_e5]
        var sum = 0
        if(last_blocks != null){
            for(var i=0; i<last_blocks.length; i++){
                sum += last_blocks[i].baseFeePerGas
            }
            sum = sum/last_blocks.length;
        }
        return sum
    }

    get_gas_price_from_runs(){
        var last_events = this.props.app_state.all_E5_runs[this.props.app_state.selected_e5]
        var sum = 0
        if(last_events != null){
            var last_check = last_events.length < 50 ? last_events.length : 50
            for(var i=0; i<last_check; i++){
                sum += last_events[i].returnValues.p7
            }
            sum = sum/last_check;
        }
        return sum
    }

    render_arweave_network_fee_if_selected(){
        var set_storage_option = this.props.app_state.storage_option
        var my_preferred_nitro = this.props.app_state.my_preferred_nitro
        if(my_preferred_nitro == '' && set_storage_option == 'arweave'){
            var fees = this.props.app_state.calculated_arewave_storage_fees_figures[this.props.app_state.selected_e5]
            if(fees == null) fees = 0;
            var wallet_data = this.props.app_state.coin_data['AR']
            var my_balance = wallet_data != null ? wallet_data['balance'] : 0
            var proportion = 0
            if(fees != 0 && my_balance != 0 && my_balance >= fees){
                proportion = (fees * 100) / my_balance 
            }
            return(
                <div>
                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '15px 10px 5px 10px','border-radius': '8px' }}>
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">{this.props.app_state.loc['1593ep']/* 'Arweave Storage Fee' */}</p>

                        {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(fees/10**12), 'number':(fees/10**12), 'barcolor':'#606060', 'relativepower':'AR', })}
                       
                        {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(fees), 'number':this.format_account_balance_figure(fees), 'barcolor':'#606060', 'relativepower':'winston', })}

                        {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':proportion+'%', 'number':proportion+'%', 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1593eq']/* 'proportion' */, })}
                    </div>
                </div>
            )
        }
    }





    render_transaction_data(){
        const e5 = this.props.app_state.selected_e5
        var nitro_graphs_data =  (this.props.app_state.saved_pre_launch_events[e5] != null && this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data'] != null) ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data'] : {}

        var transaction_events = nitro_graphs_data['show_transaction_transaction_count_chart'] != null ? this.count_events_in_all_e5s('show_transaction_transaction_count_chart') : this.load_all_event_data('transaction').length
        var transfer_events = nitro_graphs_data['show_transfer_events_chart'] != null ? this.count_events_in_all_e5s('show_transfer_events_chart'): this.load_all_event_data('transfer').length

        var traffic_proportion_events = null;
        if(this.props.app_state.saved_pre_launch_events[e5] != null){
            traffic_proportion_events = this.load_traffic_proportion_data_from_nitro()
        }else{
            traffic_proportion_events = this.load_traffic_proportion_data()
        }


        var subscription_events = nitro_graphs_data['show_subscription_transaction_count_chart'] != null ? this.count_events_in_all_e5s('show_subscription_transaction_count_chart') : this.load_all_event_data('subscription').length
        var contract_events = nitro_graphs_data['show_contract_transaction_count_chart'] != null ? this.count_events_in_all_e5s('show_contract_transaction_count_chart') : this.load_all_event_data('contract').length
        var proposal_events = nitro_graphs_data['show_proposal_transaction_count_chart'] != null ? this.count_events_in_all_e5s('show_proposal_transaction_count_chart') : this.load_all_event_data('proposal').length
        var exchange_events = nitro_graphs_data['show_exchange_transaction_count_chart'] != null ? this.count_events_in_all_e5s('show_exchange_transaction_count_chart') : this.load_all_event_data('exchange').length
        var post_events = nitro_graphs_data['show_post_transaction_count_chart'] != null ? this.count_events_in_all_e5s('show_post_transaction_count_chart') : this.load_all_event_data('post').length
        var channel_events = nitro_graphs_data['show_channel_transaction_count_chart'] != null ? this.count_events_in_all_e5s('show_channel_transaction_count_chart') : this.load_all_event_data('channel').length
        var job_events = nitro_graphs_data['show_job_transaction_count_chart'] != null ? this.count_events_in_all_e5s('show_job_transaction_count_chart') : this.load_all_event_data('job').length
        var store_events = nitro_graphs_data['show_stores_transaction_count_chart'] != null ? this.count_events_in_all_e5s('show_stores_transaction_count_chart') : this.load_all_event_data('store').length
        var bag_events = nitro_graphs_data['show_bag_transaction_count_chart'] != null ? this.count_events_in_all_e5s('show_bag_transaction_count_chart') : this.load_all_event_data('bag').length
        var contractor_events = nitro_graphs_data['show_contractor_transaction_count_chart'] != null ? this.count_events_in_all_e5s('show_contractor_transaction_count_chart') : this.load_all_event_data('contractor').length
        var audio_events = nitro_graphs_data['show_audio_transaction_count_chart'] != null ? this.count_events_in_all_e5s('show_audio_transaction_count_chart') : this.load_all_event_data('audio').length
        var video_events = nitro_graphs_data['show_video_transaction_count_chart'] != null ? this.count_events_in_all_e5s('show_video_transaction_count_chart') : this.load_all_event_data('video').length
        var nitro_events = nitro_graphs_data['show_nitro_transaction_count_chart'] != null ? this.count_events_in_all_e5s('show_nitro_transaction_count_chart') : this.load_all_event_data('nitro').length
        var poll_events = nitro_graphs_data['show_poll_transaction_count_chart'] != null ? this.count_events_in_all_e5s('show_poll_transaction_count_chart') : this.load_all_event_data('poll').length

        return(
            <div>
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2836']/* 'Total E5 Runs.' */, 'subtitle':this.format_power_figure(transaction_events), 'barwidth':this.calculate_bar_width(transaction_events), 'number':this.format_account_balance_figure(transaction_events), 'barcolor':'', 'relativepower':this.props.app_state.loc['2837']/* 'Runs.' */, })}
                </div>

                <div style={{height: 10}}/>
                {this.render_object_count_elements(
                    [
                        {'title':number_with_commas(subscription_events), 'details':this.props.app_state.loc['2826']/* subscriptions */}, 
                        {'title':number_with_commas(contract_events), 'details':this.props.app_state.loc['2827']/* contracts */}, 
                        {'title':number_with_commas(proposal_events), 'details':this.props.app_state.loc['2828']/* proposals */},
                        {'title':number_with_commas(exchange_events), 'details':this.props.app_state.loc['2829']/* exchanges */}, 
                        {'title':number_with_commas(post_events), 'details':this.props.app_state.loc['2830']/* posts */}, 
                        {'title':number_with_commas(channel_events), 'details':this.props.app_state.loc['2831']/* channels */},
                        {'title':number_with_commas(store_events), 'details':this.props.app_state.loc['2833']/* storefront-items */}, 
                        {'title':number_with_commas(bag_events), 'details':this.props.app_state.loc['2834']/* bags */}, 
                        {'title':number_with_commas(contractor_events), 'details':this.props.app_state.loc['2835']/* contractors */},
                        {'title':number_with_commas(audio_events), 'details':this.props.app_state.loc['1264x']/* audiopost-items */}, 
                        {'title':number_with_commas(video_events), 'details':this.props.app_state.loc['1264y']/* videopost-items */}, 
                        {'title':number_with_commas(nitro_events), 'details':this.props.app_state.loc['1264z']/* nitro-items */},
                        {'title':number_with_commas(job_events), 'details':this.props.app_state.loc['2832']/* jobs */}, 
                        {'title':number_with_commas(poll_events), 'details':this.props.app_state.loc['2843b']/* polls */}
                    ]
                )}

                <div style={{height: 10}}/>
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2838']/* 'Total E5 Transfers.' */, 'subtitle':this.format_power_figure(transfer_events), 'barwidth':this.calculate_bar_width(transfer_events), 'number':this.format_account_balance_figure(transfer_events), 'barcolor':'', 'relativepower':this.props.app_state.loc['2839']/* 'transfers' */, })}
                </div>
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 10px 5px 10px','border-radius': '8px' }}>
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px', 'font-family': this.props.app_state.font}} className="fw-bold">{this.props.app_state.loc['2840']/* E5 Traffic Distribution. */}</p>
                    
                    {traffic_proportion_events.map((item, index) => (
                        <div>
                            {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':(item['percentage']+'%'), 'number':item['e5'], 'relativepower':item['percentage']+'%', })}
                        </div>
                    ))}  
                </div>

            </div>
        )
    }

    count_events_in_all_e5s(identifier){
        var count = 0
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]
            if(this.props.app_state.e5s[e5].active == true){
                var nitro_graphs_data =  (this.props.app_state.saved_pre_launch_events[e5] != null && this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data'] != null) ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data'] : {}
                count += (nitro_graphs_data[identifier] != null ? nitro_graphs_data[identifier]['event_count'] : 0)
            }
        }
        return count
    }

    render_object_count_elements(items){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1264bk']/* Total Objects Created. */, 'details':this.props.app_state.loc['1264bl']/* In all the E5s indexed. */, 'size':'l'})}
                <div style={{height: 7}}/>
                <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_detail_item('3', {'details':this.get_detail_item_with_emoji(item['details']), 'title':item['title'], 'size':'l'})}
                                <div style={{width: 10}}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    get_detail_item_with_emoji(detail){
        const obj = {}
        obj[this.props.app_state.loc['1197']/* contracts */] = '📑'
        obj[this.props.app_state.loc['1196']/* jobs */] = '💼'
        obj[this.props.app_state.loc['1198']/* contractors */] = '👷🏻‍♀️'
        obj[this.props.app_state.loc['2833']/* storefront-items */] = '🏪'
        obj[this.props.app_state.loc['1200']/* subscriptions */] = '🎫'
        obj[this.props.app_state.loc['1213']/* posts */] = '📰'
        obj[this.props.app_state.loc['1214']/* channels */] = '📡'
        obj[this.props.app_state.loc['1199']/* proposals */] = '🧎'
        obj[this.props.app_state.loc['1216']/* bags */] = '🛍'
        obj[this.props.app_state.loc['2829']/* exchanges */] = '🏦'
        obj[this.props.app_state.loc['1264x']/* audiopost-items */] = '🎧'
        obj[this.props.app_state.loc['1264y']/* videopost-items */] = '📺'
        obj[this.props.app_state.loc['1264z']/* nitro-items */] = '🛰️'
        obj[this.props.app_state.loc['1264ao']/* 'polls' */] = '📊'

        if(obj[detail] == null) return detail;
        return detail+' '+obj[detail]
    }

    load_all_event_data(chart_id){
        var all_objects = []
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]

            var e5_chart_data = this.props.app_state.all_data[e5]
            if(e5_chart_data != null){
                var e5s_events = e5_chart_data[chart_id]
                all_objects = all_objects.concat(e5s_events)
            }
        }

        return all_objects
    }

    load_traffic_proportion_data_from_nitro(){
        var return_data = []
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]
            if(this.props.app_state.saved_pre_launch_events[e5] != null){
                return_data.push({'e5':e5, 'percentage':this.props.app_state.saved_pre_launch_events[e5]['load_traffic_proportion_data']['percentage']})
            }
        }
        return this.sortByAttributeDescending(return_data, 'percentage')
    }

    load_traffic_proportion_data(){
        var all_data = this.load_all_event_data('data').length
        var return_data = []
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]

            var e5_chart_data = this.props.app_state.all_data[e5]
            if(e5_chart_data != null){
                var e5s_events = e5_chart_data['data'].length
                var x = ((e5s_events * 100) / all_data)
                var rounded_proportion = Math.round(x * 1000) / 1000
                return_data.push({'e5':e5, 'percentage':rounded_proportion})
            }
        }

        return this.sortByAttributeDescending(return_data, 'percentage')
    }

    render_small_number(number, name){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(number),
            'number':this.format_account_balance_figure(number),
            'relativepower':name,
        }
    }




    get_selected_chart_item_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1196']/* 'e.jobs' */,this.props.app_state.loc['1197']/* 'e.contracts' */,this.props.app_state.loc['1198']/* 'e.contractors' */, this.props.app_state.loc['1199']/* 'e.proposals' */, this.props.app_state.loc['1200']/* 'e.subscriptions' */, this.props.app_state.loc['1213']/* 'e.posts' */,this.props.app_state.loc['1214']/* 'e.channels' */,this.props.app_state.loc['1264ao']/* 'polls' */,this.props.app_state.loc['1215']/* 'e.storefront' */, this.props.app_state.loc['1216']/* 'e.bags' */, this.props.app_state.loc['1264k']/* 'e.audioport' */, this.props.app_state.loc['1264p']/* 'videoport' */, this.props.app_state.loc['1264bj']/* 'exchanges' */], [1]
            ],
        };
    }

    get_selected_contract_chart_item_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','E5', 'E52', 'F5', 'G5', 'G52', 'H5', 'H52'], [1]
            ],
        };
    }

    load_E5_charts(){
        var e5_chart_data = this.props.app_state.all_data[this.props.app_state.selected_e5]
        if(e5_chart_data != null || (this.props.app_state.saved_pre_launch_events[this.props.app_state.selected_e5] != null && this.props.app_state.saved_pre_launch_events[this.props.app_state.selected_e5]['e5_charts_data'] != null)){
            if(e5_chart_data == null) e5_chart_data = {};
           return(
               <div>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.get_selected_chart_item_tags_object} tag_size={'l'} when_tags_updated={this.when_get_selected_chart_item_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    
                    {this.render_selected_chart_item(e5_chart_data)}


                    <Tags font={this.props.app_state.font} page_tags_object={this.state.get_selected_contract_chart_item_tags_object} tag_size={'l'} when_tags_updated={this.when_get_selected_contract_chart_item_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    {this.render_selected_contract_chart_item(this.props.app_state.selected_e5)}

                    
                    {this.show_data_transaction_count_chart(e5_chart_data, this.props.app_state.selected_e5)}
                    {this.show_metadata_transaction_count_chart(e5_chart_data, this.props.app_state.selected_e5)}
                    {/* {this.show_withdraw_amount_data_chart(e5_chart_data, this.props.app_state.selected_e5)} */}
                    {this.show_deposit_amount_data_chart(e5_chart_data, this.props.app_state.selected_e5)}
                    {this.show_transfer_events_chart(e5_chart_data, this.props.app_state.selected_e5)}
                    {this.show_transaction_transaction_count_chart(e5_chart_data, this.props.app_state.selected_e5)}
               </div>
           )
        }
    }

    when_get_selected_contract_chart_item_tags_object_updated(tag_obj){
        this.setState({get_selected_contract_chart_item_tags_object: tag_obj})
    }

    when_get_selected_chart_item_tags_object_updated(tag_obj){
        this.setState({get_selected_chart_item_tags_object: tag_obj})
    }

    render_selected_chart_item(e5_chart_data){
        var selected_item = this.get_selected_item(this.state.get_selected_chart_item_tags_object, 'e')
        
        if(selected_item == this.props.app_state.loc['1196']/* 'e.jobs' */){
            return(
                <div>
                    {this.show_job_transaction_count_chart(e5_chart_data, this.props.app_state.selected_e5)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1197']/* 'e.contracts' */){
            return(
                <div>
                    {this.show_contract_transaction_count_chart(e5_chart_data, this.props.app_state.selected_e5)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1198']/* 'e.contractors' */){
            return(
                <div>
                    {this.show_contractor_transaction_count_chart(e5_chart_data, this.props.app_state.selected_e5)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1199']/* 'e.proposals' */){
            return(
                <div>
                    {this.show_proposal_transaction_count_chart(e5_chart_data, this.props.app_state.selected_e5)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1200']/* 'e.subscriptions' */){
            return(
                <div>
                    {this.show_subscription_transaction_count_chart(e5_chart_data, this.props.app_state.selected_e5)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1213']/* 'e.posts' */){
            return(
                <div>
                    {this.show_post_transaction_count_chart(e5_chart_data, this.props.app_state.selected_e5)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1214']/* 'e.channels' */){
            return(
                <div>
                    {this.show_channel_transaction_count_chart(e5_chart_data, this.props.app_state.selected_e5)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1264ao']/* 'polls' */){
            return(
                <div>
                    {this.show_poll_transaction_count_chart(e5_chart_data, this.props.app_state.selected_e5)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1215']/* 'e.storefront' */){
            return(
                <div>
                    {this.show_stores_transaction_count_chart(e5_chart_data, this.props.app_state.selected_e5)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1216']/* 'e.bags' */){
            return(
                <div>
                    {this.show_bag_transaction_count_chart(e5_chart_data, this.props.app_state.selected_e5)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1264k']/* 'e.audioport' */){
            return(
                <div>
                    {this.show_audio_transaction_count_chart(e5_chart_data, this.props.app_state.selected_e5)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1264p']/* 'videoport' */){
            return(
                <div>
                    {this.show_video_transaction_count_chart(e5_chart_data, this.props.app_state.selected_e5)}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1264bj']/* 'exchanges' */){
            return(
                <div>
                    {this.show_exchange_transaction_count_chart(e5_chart_data, this.props.app_state.selected_e5)}
                </div>
            )
        }
    }

    render_selected_contract_chart_item(e5){
        var selected_item = this.get_selected_item(this.state.get_selected_contract_chart_item_tags_object, 'e')
        var nitro_graphs_data = this.props.app_state.saved_pre_launch_events[e5] != null && this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data'] != null ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['get_all_contracts_data_points'] : {}

        if(nitro_graphs_data[selected_item] == null) return;

        var graph_data = nitro_graphs_data[selected_item]        
        const dataPoints1 = graph_data['total']['dps']
        const start_time1 = graph_data['total']['chart_starting_time']

        const dataPoints2 = graph_data['average']['dps']
        const start_time2 = graph_data['average']['chart_starting_time']
        const amount = graph_data['event_count']

        const detailer_obj = {
            'E5':this.props.app_state.loc['2336bm']/* Primary Data Contract */, 
            'E52':this.props.app_state.loc['2336bn']/* Secondary Data Contract */, 
            'F5':this.props.app_state.loc['2336bo']/* Subscription Data Contract */, 
            'G5':this.props.app_state.loc['2336bp']/* Primary Contract & Proposal Contract */, 
            'G52':this.props.app_state.loc['2336bq']/* Secondary Contract & Proposal Contract */, 
            'H5':this.props.app_state.loc['2336br']/* Primary Exchange Contract */, 
            'H52':this.props.app_state.loc['2336bs']/* Secondary Exchange Contract */
        }
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2336bh']/* Logged Events.' */.replace('$', detailer_obj[selected_item]), 'details':this.props.app_state.loc['2336bi']/* `Chart containing the total number of logged events in the selected contract $ over time.` */.replace('$', selected_item), 'size':'l'})}
                
                {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                <div style={{height: 10}}/>

                {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['2336bj']/* 'Y-Axis: Total Logged Events.' */, 'details':this.props.app_state.loc['2269']/* 'X-Axis: Time' */, 'size':'s'})}
                <div style={{height: 10}}/>

                <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2336bk']/* 'Total Logged Events.' */, 'number':amount, 'relativepower':this.props.app_state.loc['2336bl']/* 'events' */})}>
                    {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2336bk']/* 'Total Logged Events.' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2336bl']/* 'events' */, })}
                </div>
                {this.render_detail_item('0')}
            </div>
        )
    }

    show_subscription_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['subscription']
        var amount = events.length
        var nitro_graphs_data =  (this.props.app_state.saved_pre_launch_events[e5] != null && this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data'] != null) ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_subscription_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p4')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2262']/* Subscriptions Created' */, 'details':this.props.app_state.loc['2263']/* `Chart containing the total number of subscriptions made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2269e']/* 'Y-Axis: Total Subscriptions Made' */, 'details':this.props.app_state.loc['2269']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2270']/* 'Total Subscriptions' */, 'number':amount, 'relativepower':this.props.app_state.loc['2271']/* 'subscriptions' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2270']/* 'Total Subscriptions' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2271']/* 'subscriptions' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_transaction_count_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i==0){
                    data.push(1)
                }
                else{
                    data.push(parseInt(data[data.length-1]) + (1))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p4
                    for(var t=0; t<diff; t+=(61*265100)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p4 - events[i].returnValues.p4
                    for(var t=0; t<diff; t+=(61*265100)){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }
        
        data = data.slice(Math.floor(data.length * this.props.app_state.graph_slice_proportion))

        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(yVal)});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_transaction_count_interval_figure(events){
        return events.length
    }



    show_contract_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['contract']
        var amount = events.length
        var nitro_graphs_data =  (this.props.app_state.saved_pre_launch_events[e5] != null && this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data'] != null) ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_contract_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p4')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2272']/* 'Contracts Created' */, 'details':this.props.app_state.loc['2273']/* `Chart containing the total number of contracts made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2274']/* 'Y-Axis: Total Contracts Made' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2276']/* 'Total Contracts' */, 'number':amount, 'relativepower':this.props.app_state.loc['2277']/* 'contracts' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2276']/* 'Total Contracts' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2277']/* 'contracts' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_proposal_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['proposal']
        var amount = events.length
        var nitro_graphs_data =  (this.props.app_state.saved_pre_launch_events[e5] != null && this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data'] != null) ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_proposal_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p4')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : events.length

            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2278']/* 'Proposals Created' */, 'details':this.props.app_state.loc['2279']/* `Chart containing the total number of proposals made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2280']/* 'Y-Axis: Total Proposals Made' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2281']/* 'Total Proposals' */, 'number':amount, 'relativepower':this.props.app_state.loc['2282']/* 'proposals' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2281']/* 'Total Proposals' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2282']/* 'proposals' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_exchange_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['exchange']
        var amount = events.length
        var nitro_graphs_data =  (this.props.app_state.saved_pre_launch_events[e5] != null && this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data'] != null) ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_exchange_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p4')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length

            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2283']/* 'Exchanges Created' */, 'details':this.props.app_state.loc['2284']/* `Chart containing the total number of exchanges made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2285']/* 'Y-Axis: Total Exchanges Made' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2286']/* 'Total Exchanges' */, 'number':amount, 'relativepower':this.props.app_state.loc['2287']/* 'exchanges' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2286']/* 'Total Exchanges' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2287']/* 'exchanges' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }



    show_post_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['post']
        var amount = events.length
        var nitro_graphs_data =  (this.props.app_state.saved_pre_launch_events[e5] != null && this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data'] != null) ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_post_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_post_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p6')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2288']/* 'Indexed Posts Created' */, 'details':this.props.app_state.loc['2289']/* `Chart containing the total number of indexed posts made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2290']/* 'Y-Axis: Total Posts Made' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2291']/* 'Total Posts' */, 'number':amount, 'relativepower':this.props.app_state.loc['2292']/* 'posts' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2291']/* 'Total Posts' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2292']/* 'posts' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_post_transaction_count_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i==0){
                    data.push(1)
                }
                else{
                    data.push(parseInt(data[data.length-1]) + (1))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p6
                    for(var t=0; t<diff; t+=(60*60*3)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p6 - events[i].returnValues.p6
                    for(var t=0; t<diff; t+=(60*60*3)){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }
        
        data = data.slice(Math.floor(data.length * this.props.app_state.graph_slice_proportion))

        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(yVal)});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_post_transaction_count_interval_figure(events){
        return events.length
    }



    show_channel_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['channel']
        var amount = events.length
        var nitro_graphs_data =  (this.props.app_state.saved_pre_launch_events[e5] != null && this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data'] != null) ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_channel_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_post_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p6')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2293']/* 'Indexed Channels Created' */, 'details':this.props.app_state.loc['2294']/* `Chart containing the total number of indexed channels made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2295']/* 'Y-Axis: Total Channels Made' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2296']/* 'Total Channels' */, 'number':amount, 'relativepower':this.props.app_state.loc['2297']/* 'channels' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2296']/* 'Total Channels' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2297']/* 'channels' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }
    
    show_job_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['job']
        var amount = events.length
        var nitro_graphs_data =  (this.props.app_state.saved_pre_launch_events[e5] != null && this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data'] != null) ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_job_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_post_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p6')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length

            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2298']/* 'Indexed Jobs Created' */, 'details':this.props.app_state.loc['2299']/* `Chart containing the total number of indexed jobs made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2300']/* 'Y-Axis: Total Jobs Made' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2301']/* 'Total Jobs' */, 'number':amount, 'relativepower':this.props.app_state.loc['2302']/* 'jobs' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2301']/* 'Total Jobs' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2302']/* 'jobs' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_stores_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['store']
        var amount = events.length
        var nitro_graphs_data =  (this.props.app_state.saved_pre_launch_events[e5] != null && this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data'] != null) ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_stores_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_post_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p6')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2303']/* 'Indexed Storefront Items Created' */, 'details':this.props.app_state.loc['2304']/* `Chart containing the total number of indexed storefront items made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2305']/* 'Y-Axis: Total Storefront Items Made' */, 'details':this.props.app_state.loc['2269']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2306']/* 'Total Storefront Items' */, 'number':amount, 'relativepower':this.props.app_state.loc['445']/* 'items' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2306']/* 'Total Storefront Items' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['445']/* 'items' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_bag_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['bag']
        var amount = events.length
        var nitro_graphs_data =  (this.props.app_state.saved_pre_launch_events[e5] != null && this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data'] != null) ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_bag_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p4')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2308']/* 'Bags Created' */, 'details':this.props.app_state.loc['2309']/* `Chart containing the total number of bags made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2310']/* 'Y-Axis: Total Bags Made' */, 'details':this.props.app_state.loc['1461']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2311']/* 'Total Bags' */, 'number':amount, 'relativepower':this.props.app_state.loc['2312']/* 'bags' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2311']/* 'Total Bags' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2312']/* 'bags' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_contractor_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['contractor']
        var amount = events.length
        var nitro_graphs_data =  (this.props.app_state.saved_pre_launch_events[e5] != null && this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data'] != null) ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_contractor_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_post_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p6')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2313']/* 'Indexed Contractors Created' */, 'details':this.props.app_state.loc['2314']/* `Chart containing the total number of indexed contractors made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2315']/* 'Y-Axis: Total Contractor Posts' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2316']/* 'Total Contractor Posts' */, 'number':amount, 'relativepower':this.props.app_state.loc['1198']/* 'contractors' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2316']/* 'Total Contractor Posts' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['1198']/* 'contractors' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_audio_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['audio']
        var amount = events.length
        var nitro_graphs_data =  (this.props.app_state.saved_pre_launch_events[e5] != null && this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data'] != null) ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_audio_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_post_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p6')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2336s']/* 'Indexed Audioposts Created' */, 'details':this.props.app_state.loc['2336t']/* `Chart containing the total number of indexed audioposts made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2336u']/* 'Y-Axis: Total Audio Posts' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2336v']/* 'Total Audio Posts' */, 'number':amount, 'relativepower':this.props.app_state.loc['2336w']/* 'audioposts' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2336v']/* 'Total Audio Posts' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2336w']/* 'audioposts' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_video_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['video']
        var amount = events.length
        var nitro_graphs_data =  (this.props.app_state.saved_pre_launch_events[e5] != null && this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data'] != null) ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_video_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_post_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p6')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2336x']/* 'Indexed Videoposts Created' */, 'details':this.props.app_state.loc['2336y']/* `Chart containing the total number of indexed videoposts made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2336z']/* 'Y-Axis: Total Video Posts' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2336ba']/* 'Total Video Posts' */, 'number':amount, 'relativepower':this.props.app_state.loc['2336bb']/* 'videoposts' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2336ba']/* 'Total Video Posts' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2336bb']/* 'videoposts' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_poll_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['poll']
        var amount = events.length
        var nitro_graphs_data =  (this.props.app_state.saved_pre_launch_events[e5] != null && this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data'] != null) ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_poll_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_post_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p6')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2336bc']/* 'Indexed Polls Created' */, 'details':this.props.app_state.loc['2336bd']/* `Chart containing the total number of indexed polls made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2336be']/* 'Y-Axis: Total Polls' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2336bf']/* 'Total Polls' */, 'number':amount, 'relativepower':this.props.app_state.loc['2336bg']/* 'polls' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2336bf']/* 'Total Polls' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2336bg']/* 'polls' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_data_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['data']
        var amount = events.length
        var nitro_graphs_data =  (this.props.app_state.saved_pre_launch_events[e5] != null && this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data'] != null) ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_bag_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_post_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p6')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2317']/* 'Data Throughput' */, 'details':this.props.app_state.loc['2318']/* `Chart containing the data throughput over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2319']/* 'Y-Axis: Total Data Events' */, 'details':this.props.app_state.loc['1461']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2320']/* 'Total Data Events' */, 'number':amount, 'relativepower':this.props.app_state.loc['1263']/* 'events' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2320']/* 'Total Data Events' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['1263']/* 'events' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_transaction_data_points_as_average(events, time_p){
        const return_data_object = {}

        events.forEach(event_item => {
            const event_time = event_item.returnValues[time_p]
            const pos = (Math.floor(event_time/(60*60*3)))*(60*60*3)
            if(return_data_object[pos] == null){
                return_data_object[pos] = []
            }
            return_data_object[pos].push(event_item)
        });

        return this.get_steaming_stats_data_points(return_data_object)
    }

    get_steaming_stats_data_points(memory_stats_data){
        var data = []
        var timestamp_datapoints = Object.keys(memory_stats_data)
        for(var i=0; i<timestamp_datapoints.length; i++){
            const focused_item = memory_stats_data[timestamp_datapoints[i]].length
            data.push(focused_item)

            if(i==timestamp_datapoints.length-1){
                var diff = Date.now()/1000 - timestamp_datapoints[i]
                for(var t=0; t<diff; t+=60*60*3){
                    if(data[data.length-1] == 0){
                        data.push(0)
                    }else{
                        data.push(data[data.length-1]*0.999)    
                    }
                }
            }
            else{
                var diff = timestamp_datapoints[i+1] - timestamp_datapoints[i]
                for(var t=0; t<diff; t+=60*60*3){
                    if(data[data.length-1] == 0){
                        data.push(0)
                    }else{
                        data.push(data[data.length-1]*0.999)    
                    }
                }
            }
        }

        const starting_time = timestamp_datapoints.length == 0 ? (1000*60*60*24) : timestamp_datapoints[0]*1000

        var xVal = 1, yVal = 0, original_y_val = 0;
        var dps = [];
        var largest = 0;
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        for(var i = 0; i < noOfDps; i++) {
            if(i < 100 && data.length > 200 && xVal < 100 && (factor * (xVal+1)) < data.length){
                var sum = 0
                var slice = data.slice(factor * xVal, factor * (xVal+1))
                for(var j = 0; j < slice.length; j++) {
                    sum += slice[j]
                }
                var result = sum / (slice.length)
                original_y_val = result;
                // yVal =  parseInt(bigInt(result).multiply(100).divide(largest))
                yVal = result
            }
            else{
                original_y_val = data[factor * xVal]
                // yVal = parseInt(bigInt(data[factor * xVal]).multiply(100).divide(largest))
                yVal = data[factor * xVal]
            }
            if((largest) < (yVal)){
                largest = (yVal)
            }
            var indicator = Math.round(yVal) +' '+ this.props.app_state.loc['665']/* 'transactions' */
            if(yVal != null && !isNaN(yVal)){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0 && yVal != 0){
                    dps.push({x: xVal,y: yVal, indexLabel:""+indicator});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
        }

        // for(var e=0; e<dps.length; e++){
        //     dps[e].y = (dps[e].y) * (100) / (largest)
        //     if(e>97 && dps[e].y == 0){
        //         dps[e].y = dps[e-1].y
        //     }
        // }

        return { dps, starting_time }
    }



    show_metadata_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['metadata']
        var amount = events.length
        var nitro_graphs_data =  (this.props.app_state.saved_pre_launch_events[e5] != null && this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data'] != null) ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_metadata_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_metadata_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p5')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2321']/* 'Metadata Throughput' */, 'details':this.props.app_state.loc['2322']/* `Chart containing the total number of metadata events made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2323']/* 'Y-Axis: Total Metadata Events' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2324']/* 'Total Metadata Events' */, 'number':amount, 'relativepower':this.props.app_state.loc['2325']/* 'events' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2324']/* 'Total Metadata Events' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2325']/* 'events' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_metadata_transaction_count_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i==0){
                    data.push(1)
                }
                else{
                    data.push(parseInt(data[data.length-1]) + (1))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p5
                    for(var t=0; t<diff; t+=(60*60*3)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p5 - events[i].returnValues.p5
                    for(var t=0; t<diff; t+=(60*60*3)){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }
        
        data = data.slice(Math.floor(data.length * this.props.app_state.graph_slice_proportion))

        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(yVal)});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_metadata_transaction_count_interval_figure(events){
        return events.length
    }



    show_withdraw_amount_data_chart(e5_chart_data){
        var events = e5_chart_data['withdraw']
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2326']/* 'Withdrawn Ether' */, 'details':this.props.app_state.loc['2327']/* `The total amount of ether thats been withdrawn from the E5 over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_withdraw_amount_data_points(events), 'interval':110, 'hide_label': true})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2328']/* 'Y-Axis: Total Withdrawn Ether' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_withdraw_amount_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i == 0){
                    data.push(bigInt(events[i].returnValues.p5))
                }else{
                    data.push(bigInt(data[data.length-1]).add(bigInt(events[i].returnValues.p5)))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p6
                    for(var t=0; t<diff; t+=(61*265100)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p6 - events[i].returnValues.p6
                    for(var t=0; t<diff; t+=(61*265100)){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }

        data = data.slice(Math.floor(data.length * this.props.app_state.graph_slice_proportion))

        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        var largest_number = this.get_withdraw_amount_interval_figure(events)
        var recorded = false
        for(var i = 0; i < noOfDps; i++) {
            yVal = parseInt(bigInt(data[factor * xVal]).multiply(100).divide(largest_number))
            // yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null && data[factor * xVal] != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0 && !recorded){
                    recorded = true
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(data[factor * xVal])});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_withdraw_amount_interval_figure(events){
        var data = []
        events.forEach(event => {
            data.push(bigInt(event.returnValues.p5))
        });
        var largest = Math.max.apply(Math, data);
        return largest
    }





    show_deposit_amount_data_chart(e5_chart_data, e5){
        var events = e5_chart_data['transaction']
        var withdraw_events = e5_chart_data['withdraw']
        var nitro_graphs_data =  (this.props.app_state.saved_pre_launch_events[e5] != null && this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data'] != null) ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_deposit_amount_data_chart'] : {}
        var data = nitro_graphs_data['event_count'] != 0 ? [] : this.format_deposit_witdraw_ether_events(events, withdraw_events)
        if(data.length > 3 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_deposit_amount_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null
            const scale = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['scale'] : null
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2329']/* 'Deposited Ether' */, 'details':this.props.app_state.loc['2330']/* `The total amount of ether thats been deposited into the E5 over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1, 'hide_label': scale == null,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1, 'scale':scale})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2331']/* 'Y-Axis: Total Deposited Ether' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_deposit_amount_data_points(events){
        var data = []
        var largest_number = bigInt(0)
        try{
            for(var i=0; i<events.length; i++){
                if(i == 0){
                    if(events[i]['type'] == 'deposit'){
                        var amount = bigInt(events[i]['event'].returnValues.p6)
                        data.push(amount)
                        if(largest_number.lesser(amount)) largest_number = amount
                    }else{
                        data.push(0)
                    }
                }else{
                    if(events[i]['type'] == 'deposit'){
                        var amount = bigInt(data[data.length-1]).add(bigInt(events[i]['event'].returnValues.p6))
                        data.push(amount)
                        if(largest_number.lesser(amount)) largest_number = amount
                    }else{
                        var amount = bigInt(data[data.length-1]).minus(bigInt(events[i]['event'].returnValues.p5))
                        data.push(amount)
                        if(largest_number.lesser(amount)) largest_number = amount
                    }
                    
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i]['timestamp']
                    for(var t=0; t<diff; t+=(61*26510)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1]['timestamp'] - events[i]['timestamp']
                    for(var t=0; t<diff; t+=(61*26510)){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }

        data = data.slice(Math.floor(data.length * this.props.app_state.graph_slice_proportion))

        // console.log('deposit_amount_data', 'largest_number', largest_number)
        // console.log('deposit_amount_data', 'data', data)

        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        // var largest_number = this.get_deposit_amount_interval_figure(events)
        var recorded = false;
        for(var i = 0; i < noOfDps; i++) {
            if(largest_number == 0) yVal = 0
            else yVal = parseInt(bigInt(data[factor * xVal]).multiply(100).divide(largest_number))
            // yVal = data[factor * xVal]
            // yVal = data[i]

            
            if(yVal != null && data[factor * xVal] != null){
                if(i%(Math.round(noOfDps/10)) == 0 && i != 0 && !recorded){
                    recorded = true
                    var label = ""+this.format_account_balance_figure(data[factor * xVal])
                    dps.push({x: xVal,y: yVal, indexLabel: label});
                }else{
                    dps.push({x: xVal, y: yVal});
                }
                xVal++;
            }
        }

        return dps
    }

    get_deposit_amount_interval_figure(events){
        var data = []
        events.forEach(event => {
            data.push(bigInt(event.returnValues.p6))
        });
        var largest = Math.max.apply(Math, data);
        return largest
    }

    format_deposit_witdraw_ether_events(deposit_events, withdraw_events){
        var all_events = []
        deposit_events.forEach(event => {
            if(!bigInt(event.returnValues.p6/* msg_value */).equals(0)){
                all_events.push({'type':'deposit', 'event':event, 'timestamp':parseInt(event.returnValues.p8/* timestamp */)})
            }
        });

        withdraw_events.forEach(event => {
            all_events.push({'type':'withdraw', 'event':event, 'timestamp':parseInt(event.returnValues.p6/* timestamp */)})
        });

        var sorted_events = this.sortByAttributeDescending(all_events, 'timestamp')
        return sorted_events.reverse()
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






    show_transaction_transaction_count_chart(e5_chart_data, e5){
        var events = e5_chart_data['transaction']
        var amount = events.length
        var nitro_graphs_data =  (this.props.app_state.saved_pre_launch_events[e5] != null && this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data'] != null) ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_transaction_transaction_count_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_transaction_transaction_count_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p8')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2332']/* 'Transaction Runs' */, 'details':this.props.app_state.loc['2333']/* `Chart containing the total number of E5 runs made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2334']/* 'Y-Axis: Total Runs Made' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2335']/* 'Total Runs' */, 'number':amount, 'relativepower':this.props.app_state.loc['2336']/* 'runs' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2335']/* 'Total Runs' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2336']/* 'runs' */, })}
                    </div>
                    {/* {this.render_detail_item('0')} */}
                </div>
            )
        }
    }

    get_transaction_transaction_count_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i==0){
                    data.push(1)
                }
                else{
                    data.push(parseInt(data[data.length-1]) + (1))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p8
                    for(var t=0; t<diff; t+=(60*60*3)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p8 - events[i].returnValues.p8
                    for(var t=0; t<diff; t+=(60*60*3)){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }
        
        data = data.slice(Math.floor(data.length * this.props.app_state.graph_slice_proportion))

        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(yVal)});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_transaction_transaction_count_interval_figure(events){
        return events.length
    }



    show_transfer_events_chart(e5_chart_data, e5){
        var events = e5_chart_data['transfer']
        var amount = events.length
        var nitro_graphs_data =  (this.props.app_state.saved_pre_launch_events[e5] != null && this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data'] != null) ? this.props.app_state.saved_pre_launch_events[e5]['e5_charts_data']['show_transfer_events_chart'] : {}
        if(events.length >= 23 || nitro_graphs_data['total'] != null){
            const dataPoints1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['dps'] : this.get_transfers_data_points(events)
            const start_time1 = nitro_graphs_data['total'] != null ? nitro_graphs_data['total']['chart_starting_time'] : null

            const dataPoints2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['dps'] : this.get_transaction_data_points_as_average(events, 'p5')
            const start_time2 = nitro_graphs_data['average'] != null ? nitro_graphs_data['average']['chart_starting_time'] : null
            amount = nitro_graphs_data['event_count'] != null ? nitro_graphs_data['event_count'] : 
            events.length
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2336a']/* 'Transfers' */, 'details':this.props.app_state.loc['2336b']/* `Chart containing the total number of transfers made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':dataPoints1,/*  'interval':this.get_transaction_count_interval_figure(events) */ 'start_time':start_time1})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('6', {'dataPoints':dataPoints2, 'interval':110, 'start_time':start_time2})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2336c']/* 'Y-Axis: Total Transfers Made' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2336d']/* 'Total Transfers' */, 'number':amount, 'relativepower':this.props.app_state.loc['2336e']/* 'transfers' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2336d']/* 'Total Transfers' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2336e']/* 'transfers' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_transfers_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i==0){
                    data.push(1)
                }
                else{
                    data.push(parseInt(data[data.length-1]) + (1))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p5
                    for(var t=0; t<diff; t+=(60*60*3)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p5 - events[i].returnValues.p5
                    for(var t=0; t<diff; t+=(60*60*3)){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }
        
        data = data.slice(Math.floor(data.length * this.props.app_state.graph_slice_proportion))

        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(yVal)});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_transfers_interval_figure(events){
        return events.length
    }










    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }

    get_selected_item2(object, option){
        return object[option][2][0]
    }

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }

    get_cid_split(ecid){
        var split_cid_array = ecid.split('_');
        var filetype = split_cid_array[0]
        var cid_with_storage = split_cid_array[1]
        var cid = cid_with_storage
        var storage = 'ch'
        if(cid_with_storage.includes('.')){
            var split_cid_array2 = cid_with_storage.split('.')
            cid = split_cid_array2[0]
            storage = split_cid_array2[1]
        }

        return{'filetype':filetype, 'cid':cid, 'storage':storage, 'full':ecid}
    }

    has_file_loaded(file){
        var ecid_obj = this.get_cid_split(file)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return false;
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        if(data == null || data['data'] == null) return false
        return true
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